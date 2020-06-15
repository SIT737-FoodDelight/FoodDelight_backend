const express = require("express");
const router = express.Router();
const jwtauth = require("../config/jwtAuth");
const cookProfile = require("../models/CookProfile");

router.post("/", jwtauth, async (req, res, next) => {
  const cooking = new cookProfile({
    user_id: req.user._id,
    TFN_number: req.body.tfn,
    ABN_number: req.body.abn,
    cooking_license: req.body.licenseNum,
  });
  try {
    const saveCook = await cooking.save();
    if (saveCook) return res.json("cooking details saved");
  } catch (err) {
    res.json({ message: "error saving details" });
  }
});

module.exports = router;
