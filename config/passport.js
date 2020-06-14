const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ username: "username" }, (username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          console.log(err);
        } else {
          if (!user) {
            return done(null, false, { message: "Password incorrect" });
          } else {
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: "Password incorrect" });
              }
            });
          }
        }
      });
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/secrets",
      },
      function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
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
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
