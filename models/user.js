const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    admin: {type: Boolean, default: false},
    name: String,
    email: {type: String, unique: true},
    password: String,
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);