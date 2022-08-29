const mongoose = require('mongoose');

// Skema Post
const userSchema = new mongoose.Schema({ 
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User