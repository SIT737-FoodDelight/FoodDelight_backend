const express = require("express");
const router = express.Router();
const { forwardAuthenticated } = require("../config/auth");
const Order = require("../models/Order");
const User = require("../models/User");

router.post("/", forwardAuthenticated, (req, res) => {
  console.log(req.user);
  const newOrder = new Order({
    user_id: req.user._id,
    item_name: req.body.itemName,
    due_date: req.body.dueDate,
    item_price: req.body.itemPrice,
    item_description: req.body.itemDescription,
  });
  newOrder.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.json("saved items");
    }
  });
});

module.exports = router;
