const mongoose = require('mongoose');
const validator = require("validator");

const studentSchema = new mongoose.Schema({
    _id: {
        type:String
    },
    account_Holder: {
        type:String,
        required:true,
        minlenght:3
    },
    account_no: {
        type:String,
        required:true,
        unique:[true,"email already exists"],
        
    },
    ifsc_Code: {
        type:String,
        required:true
    }

})

// collection creation
const Student = new mongoose.model('Student', studentSchema);
module.exports = Student;