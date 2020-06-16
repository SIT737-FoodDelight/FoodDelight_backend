const express = require("express");
const router = express.Router();
const jwtauth = require("../config/jwtAuth");
const cookProfile = require("../models/CookProfile");

router.post("/", jwtauth, async (req, res, next) => {
  const findProfile = await cookProfile.findOne({ user_id: req.user._id });
  if (findProfile) {
    if (findProfile.accepted === true) return res.json("cook profile exists");
  }
  const cooking = new cookProfile({
    user_id: req.user._id,
    TFN_number: req.body.tfn,
    ABN_number: req.body.abn,
    cooking_license: req.body.licenseNum,
  });
  try {
    const saveCook = await cooking.save();
    return res.json("cook profile saved");
  } catch (err) {
    res.json({ message: "error saving details" });
  }
});

module.exports = router;
