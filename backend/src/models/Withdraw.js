const mongoose = require("mongoose");
const validator = require("validator");

const WithdrawSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  account_No: {
    type: String,
    required: true,
  },
  ifsc_Code: {
    type: String,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
  net_payable: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  }

});

const Withdraw = new mongoose.model("Withdraw", WithdrawSchema);
module.exports = Withdraw;
