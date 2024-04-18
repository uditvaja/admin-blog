const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    blog: { type: String },
    title: {
        type: String
    },
    avatar: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admincollection'
    },
    type: {
        type: String
    }
});

const blogModel = mongoose.model('blogcollection', blogSchema);

module.exports = blogModel;