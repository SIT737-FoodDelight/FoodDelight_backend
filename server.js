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

const passport = require("passport");
const cors = require("cors");

app.use(cors());

app.set("layout", "layouts/layout");
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

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get("/auth/facebook", passport.authenticate("facebook"));

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/dashboard", dashboardRouter);
app.use("/cookfood", cookRouter);
app.use("/profile", profileRouter);
app.use("/orders", orderRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started...");
});
