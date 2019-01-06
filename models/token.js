const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    token: {type: String, unique: true},
    created_at: {type: Date, default: Date.now},
    expired_at: {type: Date, default: new Date((new Date).getTime() + 10 * 60000)}
});

module.exports = mongoose.model('Token', tokenSchema);