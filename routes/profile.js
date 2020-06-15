const router = require("express").Router();
const User = require("../models/User");
const jwtAuth = require("../config/jwtAuth");

router.post("/", jwtAuth, async (req, res) => {
  const updateUser = await User.updateOne(
    { _id: req.user._id },
    { $set: { user_address: req.body.address } }
  );
  res.json(updateUser);
  const updateAll = await User.updateMany({ _id: req.user._id });
});

module.exports = router;
