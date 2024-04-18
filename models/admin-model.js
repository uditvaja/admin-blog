const mongoose = require('mongoose');

const adminschema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
});

const adminmodel = mongoose.model('admincollection', adminschema);

module.exports = adminmodel;
