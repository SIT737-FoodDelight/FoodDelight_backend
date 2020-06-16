const mongoose = require("mongoose");

const cookSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  TFN_number: {
    type: String,
    required: true,
  },
  ABN_number: {
    type: String,
    required: true,
  },
  cooking_license: {
    type: String,
    required: true,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("CookProfile", cookSchema);
