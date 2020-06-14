const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  item_name: {
    type: String,
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  item_price: {
    type: String,
    required: true,
  },
  item_description: {
    type: String,
    required: true,
  },
  order_status: {
    type: Boolean,
    default: false,
  },
  completion_status: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
