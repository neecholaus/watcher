const mongoose = require('mongoose');

const captureSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    path: {type: String, unique: true},
    filename: {type: String, unique: true},
    taken_at: {type: Date, required: true},
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Capture', captureSchema);