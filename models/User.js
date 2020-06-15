const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  googleId: String,
  facebookId: String,
  mobile_number: {
    type: String,
    required: true,
  },
  user_address: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", UserSchema);
