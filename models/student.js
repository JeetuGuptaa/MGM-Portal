const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    email :{
        type : String,
        required : true,
        unique : true
    },
    Name :{
        type : String,
        required : true
    },
    Branch : {
        type : String,
        required : true
    },
    Semester : {
        type : Number,
        required : true
    },
    RollNumber : {
        type : Number,
        required : true
    },
    Password :{
        type : String,
        required : true
    }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;