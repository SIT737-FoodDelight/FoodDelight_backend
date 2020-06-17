const jwtAuth = require("../config/jwtAuth");

const route = require("express").Router();
const orders = require("../models/Order");

route.post("/", jwtAuth, async (req, res) => {
  orders.find({ order_status: { $ne: true } }, (err, orders) => {
    if (err) return res.json("error retrieving orders");

    res.json(orders);
  });
});

module.exports = route;
