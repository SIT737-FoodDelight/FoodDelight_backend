const express = require("express");
const router = express.Router();
const { forwardAuthenticated } = require("../config/auth");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// router.post("/", (req, res, next) => {
//   passport.authenticate("local", {
//     successRedirect: "/loginSuccess",
//     failureRedirect: "/loginFailure",
//   })(req, res, next);
// });

router.post("/", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body);
  const user = await User.findOne({ username: username });

  if (!user) return res.status(400).send("Email or password incorrect");

  const pwdCheck = await bcrypt.compare(password, user.password);
  if (!pwdCheck) return res.status(400).send("Invalid Password");

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("authToken", token).send("login_Success");
});

module.exports = router;
