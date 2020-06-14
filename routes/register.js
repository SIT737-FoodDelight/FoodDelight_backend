const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

router.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        res.send("user already exists");
      } else {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
          const newUser = new User({
            username: req.body.username,
            password: hash,
          });
          newUser.save((err) => {
            if (err) {
              console.log(err);
            } else {
              res.send("secrets");
            }
          });
        });
      }
    }
  });
});

module.exports = router;
