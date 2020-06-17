const express = require("express");
const router = express.Router();
const jwtauth = require("../config/jwtAuth");
const User = require("../models/User");

router.post("/", jwtauth, async (req, res) => {
  const user = await User.findById({ _id: req.user._id });
  res.json(user);
});

module.exports = router;
