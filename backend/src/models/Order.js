const mongoose = require("mongoose");
const validator = require("validator");

const OrderSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  order_ref_no: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  package_Qty: {
    type: String,
    required: true,
  },
  grand_Total: {
    type: String,
    required: true,
  },
  payment_Status: {
    type: String,
    required: true,
  }

});

const Order = new mongoose.model("Order", OrderSchema);
module.exports = Order;
