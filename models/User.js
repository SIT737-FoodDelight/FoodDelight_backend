const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  googleId: String,
  facebookId: String,
  mobile_number: {
    type: String,
    default: "",
  },
  user_address: {
    type: String,
    default: "",
  },
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);
module.exports = mongoose.model("User", UserSchema);
