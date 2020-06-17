const express = require("express");
const router = express.Router();
const jwtauth = require("../config/jwtAuth");
const User = require("../models/User");
const Order = require("../models/Order");

router.post("/", jwtauth, async (req, res) => {
  const myOrders = await Order.find({
    user_id: req.user._id,
    order_status: true,
  });
  if (myOrders.length == 0) return res.json("your orders are not accepted");
  res.json(myOrders);
});

module.exports = router;
