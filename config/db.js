const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1/movie').then(() => {
    console.log("connected db..");
}).catch((err) => {
    console.log("err");
})

module.exports = mongoose;