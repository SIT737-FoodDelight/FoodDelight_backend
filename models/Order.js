const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("User", UserSchema);
