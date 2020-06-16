const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../config/jwtAuth");
const User = require("../models/User");

router.post("/", auth, (req, res) => {
  console.log(req.header("authToken"));

  const user = User.findOne({ _id: req.user._id });
  if (user.user_address.length === 0)
    return res.json(
      "Please add address in manage account before placing order"
    );

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
      res.json("saved order items");
    }
  });
});

module.exports = router;
