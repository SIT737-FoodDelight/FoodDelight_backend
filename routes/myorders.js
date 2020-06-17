const express = require("express");
const router = express.Router();
const jwtauth = require("../config/jwtAuth");
const User = require("../models/User");
const Order = require("../models/Order");

router.post("/", jwtauth, async (req, res) => {
  const user = await User.findById({ _id: req.user._id });
  const myOrders = await Order.find({
    $or: [
      {
        user_id: req.user._id,
        order_status: true,
      },
      { accepted_cook: user.username },
    ],
  });
  if (myOrders.length == 0) return res.json("your orders are not accepted");
  res.json(myOrders);
});

module.exports = router;
