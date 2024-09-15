const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,  // Removes any whitespace around the username
        unique: true  // Ensures the username is unique in the database
    },
    password: {
        type: String,
        required: true,
        minlength: 6  // Optional: Ensures a minimum length for security
    },
    role: {
        type: String,
        enum: ['admin', 'teacher'],
        required: true
    },
    institutionId: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('User', userSchema);


