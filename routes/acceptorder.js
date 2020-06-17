const express = require("express");
const router = express.Router();
const jwtauth = require("../config/jwtAuth");
const { json } = require("body-parser");
const Orders = require("../models/Order");
const User = require("../models/User");

router.post("/", jwtauth, async (req, res) => {
  console.log(req.user._id);
  console.log(req.body.order_id);

  const acceptedUser = await User.findById({ _id: req.user._id });
  const order = await Orders.updateMany(
    { _id: req.body.order_id },
    {
      $set: {
        order_status: true,
        accepted_cook: acceptedUser.username,
      },
    }
  );

  if (order) return res.json("order accepted");
});

module.exports = router;
