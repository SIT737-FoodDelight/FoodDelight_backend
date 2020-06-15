if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const dashboardRouter = require("./routes/dashboard");
const profileRouter = require("./routes/profile");

const passport = require("passport");
const session = require("express-session");
const ejs = require("ejs");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { forwardAuthenticated } = require("./config/auth");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cors());

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./config/passport")(passport);

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to mongoose"));
app.use(cookieParser("asdf33g4w4hghjkuil8saef123"));
app.use(
  session({
    secret: "asdf33g4w4hghjkuil8saef123",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("index");
});
app.get("/users/login", (req, res) => {
  res.send("failure");
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get("/auth/facebook", passport.authenticate("facebook"));
app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/dashboard", dashboardRouter);
app.use("/profile", profileRouter);
app.get("/loginSuccess", (req, res) => {
  req.session.save();
  console.log(req.user);
  res.json("login_Success");
});
app.get("/loginFailure", (req, res) => {
  res.json("login_failed");
});
app.listen(process.env.PORT || 5000, () => {
  console.log("Server started...");
});
