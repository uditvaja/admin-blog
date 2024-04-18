const mongoose=require('mongoose');

const studentschema = new mongoose.Schema({
    fname:String,
    lname:String,
    number:Number,
    email:String,
 

})

const studentmodel=mongoose.model('studentcollection',studentschema);

module.exports=studentmodel;