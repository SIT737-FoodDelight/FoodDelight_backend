const express = require("express");
const router = express.Router();
const jwtauth = require("../config/jwtAuth");
const { json } = require("body-parser");
const Orders = require("../models/Order");

router.post("/", jwtauth, async (req, res) => {
  console.log(req.body.order_id);
  const order = await Orders.updateOne(
    { _id: req.body.order_id },
    {
      $set: {
        order_status: true,
      },
    }
  );
  if (order) return res.json("order accepted");
});

module.exports = router;
