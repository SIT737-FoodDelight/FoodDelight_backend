const passport = require("passport");

module.exports = {
  ensureAuthenticated: function (req, res, next) {
    console.log(req.user);
    if (req.isAuthenticated()) {
      console.log("authenticated");
      return next();
    }
    console.log("not authenticated");
    res.redirect("/login");
  },
  forwardAuthenticated: function (req, res, next) {
    console.log(req.user);
    if (req.isAuthenticated()) {
      console.log("authenticated");
      return next();
    } else {
      console.log("not authenticated");
      res.redirect("/login");
    }
  },
};
