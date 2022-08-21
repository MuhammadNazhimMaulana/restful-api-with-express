const mongoose = require('mongoose');

// Skema User
const postSchema = new mongoose.Schema({ 
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    published: {
        type: Boolean
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post