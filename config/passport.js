const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");
const google = require("../models/googleuser");
const findOrCreate = require("mongoose-findorcreate");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL:
          "https://project-frontend-app-silly-hippopotamus-zv.mybluemix.net/dashboard",
      },
      function (accessToken, refreshToken, profile, cb) {
        google.findOrCreate({ googleId: profile.id }, function (err, user) {
          console.log(profile);
          return cb(err, user);
        });
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    google.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
