const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Initialize ENV
dotenv.config();

// User model
const User = require('../models/user.js');

// MongoDB Config
let mongoUser = process.env.MONGO_USER;
let mongoPass = process.env.MONGO_PASS;
let adminUserPass = process.env.MONGO_ADMIN_USER_PASS;

let authUrl = `mongodb://${mongoUser}:${mongoPass}@localhost:27017/watcher?authSource=admin`;

mongoose.connect(authUrl, {useNewUrlParser: true}, function(err) {
    if(err) throw err;
});

// Array of seeded users
let users = [
    {
        _id: new mongoose.Types.ObjectId(),
        admin: true,
        name: 'Nick Neuman',
        email: 'thisisnickadam@gmail.com',
        password: bcrypt.hashSync(adminUserPass, 8)
    }
];

// Create each user
for(let i = 0; i < users.length; i++) {
    new User(users[i])
        .save()
        .then((result) => {
            console.log(result.name + ' has been created.');
        })
        .catch((err) => console.log(err));

    // Close connection when all done
    if(i == users.length - 1) {
        setTimeout(() => {
            console.log('Closing connection...');
            mongoose.connection.close();
        }, 3000);
    }
}
