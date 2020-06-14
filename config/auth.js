module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please log in to view that resource");
    res.redirect("/users/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      console.log("authenticated");
      return next();
    } else {
      console.log("not authenticated");
      res.redirect("/login");
    }
  },
};
