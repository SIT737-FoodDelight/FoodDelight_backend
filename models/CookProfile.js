const mongoose = require("mongoose");

const cookSchema = new mongoose.Schema({});

module.exports = mongoose.model("CookProfile", cookSchema);
