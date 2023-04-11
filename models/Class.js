const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    semester : {
        type : Number,
        required : true
    },
    year : {
        type : Number,
        required : true
    }
});

const Class = new mongoose.model('Class',classSchema);
module.exports = Class;