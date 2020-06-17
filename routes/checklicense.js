const express = require("express");
const router = express.Router();
const jwtauth = require("../config/jwtAuth");
const cookProfile = require("../models/CookProfile");

router.post("/", jwtauth, async (req, res) => {
  const findProfile = await cookProfile.findOne({ user_id: req.user._id });
  if (findProfile) {
    if (findProfile.accepted === true) return res.json("cook profile exists");
  }
});

module.exports = router;
