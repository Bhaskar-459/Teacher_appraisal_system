const mongoose = require('mongoose');

// Schema for storing Collaborate-related data
const collaborateSchema = new mongoose.Schema({
    teacherId1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teacherId2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    topic: { type: String, required: true },
    status : { type: String,enum : ['pending' , 'approved'], default: 'pending' },
});

module.exports = mongoose.model('Collaborate', collaborateSchema);