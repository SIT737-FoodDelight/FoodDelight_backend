if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();

//Routes
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const dashboardRouter = require("./routes/dashboard");
const profileRouter = require("./routes/profile");
const cookRouter = require("./routes/cookfood");
const orderRouter = require("./routes/showorders");
const checklicenseRouter = require("./routes/checklicense");
const acceptOrderRouter = require("./routes/acceptorder");
const myordersRouter = require("./routes/myorders");
const twilioRouter = require("./routes/twilio");

const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const jwt = require("jsonwebtoken");

app.use(cors());

app.set("layout", "layouts/layout");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to mongoose"));
mongoose.set("useCreateIndex", true);

const User = require("./models/User");
const jwtAuth = require("./config/jwtAuth");
passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL:
        "https://sit737-frontend.us-south.cf.appdomain.cloud/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
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
      callbackURL:
        "https://sit737-frontend.us-south.cf.appdomain.cloud/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  async (req, res) => {
    console.log(req);
    res.redirect("/");
  }
);

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/dashboard", dashboardRouter);
app.use("/cookfood", cookRouter);
app.use("/profile", profileRouter);
app.use("/orders", orderRouter);
app.use("/checklicense", checklicenseRouter);
app.use("/accept", acceptOrderRouter);
app.use("/myorders", myordersRouter);
app.use("/sms", twilioRouter);

app.get(
  "/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    console.log(req.session.passport.user);
    const user = await User.findOne({ _id: req.session.passport.user });
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.json({ message: "login_Success", authToken: token });
  }
);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started...");
});
