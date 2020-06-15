const router = require("express").Router();
const User = require("../models/User");
const jwtAuth = require("../config/jwtAuth");
const cookProfile = require("../models/CookProfile");

router.post("/", jwtAuth, async (req, res) => {
  const updateAll = await User.updateMany(
    { _id: req.user._id },
    {
      $set: {
        user_address: req.body.address,
        username: req.body.username,
        password: req.body.password,
        mobile_number: req.body.mobileNumber,
      },
    }
  );
  res.json(updateAll);
});

module.exports = router;
