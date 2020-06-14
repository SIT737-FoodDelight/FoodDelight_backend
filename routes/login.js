const express = require("express");
const router = express.Router();
const { forwardAuthenticated } = require("../config/auth");
const passport = require("passport");

router.post("/", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
  })(req, res, next);
});

// router.post("/", (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   User.findOne({ username: username }, (err, foundUser) => {
//     if (err) {
//       console.log(err);
//     } else {
//       if (foundUser) {
//         bcrypt.compare(password, foundUser.password, function (err, result) {
//           if (result === true) {
//             res.send("secrets");
//           } else {
//             res.send("password incorrect");
//           }
//         });
//       } else {
//         res.send("no user found");
//       }
//     }
//   });
// });

module.exports = router;
