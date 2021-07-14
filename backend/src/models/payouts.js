const mongoose = require('mongoose');
const validator = require("validator");

const payoutSchema = new mongoose.Schema({
    direct_payout: {
        type:String,
        required:true,
        minlenght:3
    },
    matching_payout: {
        type:String,
        required:true,
        unique:[true,"email already exists"],
        
    },
    closing_payout: {
        type:String,
        required:true
    }

})

const payout = new mongoose.model('Payout', payoutSchema);
module.exports = payout;