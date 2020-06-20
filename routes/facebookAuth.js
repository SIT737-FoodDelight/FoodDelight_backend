const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

router.post("/", async (req, res) => {
	const accessToken = req.header("accessToken");
	const userDetails = await fetch(
		`https://graph.facebook.com/me?fields=email&access_token=${accessToken}`
    );
    console.log(userDetails)
	if (userDetails.email) {
		const user = await User.findOne({ username: userDetails.email });
		if (!user) {
			const newUser = new User({
				username: userDetails.email,
				password: uuidv4(),
			});
			newUser.save(async (err, savedUser) => {
				if (err) {
					console.log(err);
				} else {
					const token = jwt.sign(
						{ _id: savedUser._id },
						process.env.TOKEN_SECRET
					);
					return res.json({ message: "login_Success", authToken: token, username: userDetails.email });
				}
			});
		} else {
			const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
			return res.json({ message: "login_Success", authToken: token, username: userDetails.email });
		}
	} else return res.status(400).send("Email or password incorrect");
});

module.exports = router;
