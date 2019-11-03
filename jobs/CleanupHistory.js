const mongoose = require('mongoose');
const capture = require('../models/capture');
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
        data.forEach(capture => {
            console.log(capture._id, capture.filename);
        });
    }

    mongoose.disconnect();
});