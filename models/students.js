const mongoose = require('mongoose');
const{ Schema} = mongoose;

const studentSchema = new Schema({
    name : String,
    crn : String,
    DOB : Date,
    faculty : String,
    address : String, 
    contactinfo : Number,
    guardians_name : String,

}, {timestamps: true});

const Student = mongoose.model('Student', studentSchema);

module.exports = {Student};