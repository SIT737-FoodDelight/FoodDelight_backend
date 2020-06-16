const router = require("express").Router();
const User = require("../models/User");
const jwtAuth = require("../config/jwtAuth");
const bcrypt = require("bcryptjs");

router.post("/", jwtAuth, async (req, res) => {
  bcrypt.hash(req.body.password, 10, async function (err, hash) {
    const updateAll = await User.updateMany(
      { _id: req.user._id },
      {
        $set: {
          user_address: req.body.address,
          password: hash,
          mobile_number: req.body.mobileNumber,
        },
      }
    );
    if (updateAll) return res.json("account details saved");
  });
});

module.exports = router;
