const mongoose = require('mongoose');
const capture = require('../models/capture');
const fs = require('fs');
require('dotenv').config();

// MongoDB Config
let mongoUser = process.env.MONGO_USER;
let mongoPass = process.env.MONGO_PASS;
let authUrl = `mongodb://${mongoUser}:${mongoPass}@localhost:27017/watcher?authSource=admin`;
mongoose.connect(authUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, function(err) {
    if(err) throw err;
});


let cutoffTime = new Date();
cutoffTime.setHours(cutoffTime.getHours() - 2);

capture.find({taken_at: {$lt: new Date(cutoffTime)}}, (err, data) => {
    if(err) {
        console.log(err);
    } else if(data) {
        if(!data.length) {
            console.log("no captures have expired yet");
            shutdown();
        }

        data.forEach((capture, i) => {
            capture.deleteOne({_id: capture._id}, err => {
                if(err) {
                    console.log(err);
                    return;
                }

                console.log('removing: ' + capture.filename);
                fs.unlinkSync(capture.path);
            });

            if(i >= (data.length - 1)) {
                setTimeout(shutdown, 1500);
            }
        });
    }
});

const shutdown = () => {
    console.log('closing connection');
    mongoose.disconnect();
};