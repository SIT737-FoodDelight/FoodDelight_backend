const express = require(express);
const router = express.Router();
const Order = require("../models/Order");

router.post("/", (req, res) => {
  const newOrder = new Order({
    user_id: db.users.find({ userName: "And" })[0]._id,
    item_name: req.body.itemName,
    due_date: req.body.dueDate,
    item_price: req.body.itemPrice,
    item_description: req.body.itemDescription,
  });
});
