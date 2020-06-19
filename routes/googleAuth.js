const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');


router.post("/", async (req, res) => {
	const tokenId = req.header("tokenId");
	const verifiedDetails = await fetch(
		`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`
	);
	const userDetails = await verifiedDetails.json();
    console.log(userDetails.email);
    const username = userDetails.email;
	if (verifiedDetails.status === 200) {
		const user = await User.findOne({ username: username });
		if (!user) {
			const newUser = new User({
				username: username,
				password: uuidv4(),
			});
			newUser.save(async (err, savedUser) => {
				if (err) {
					console.log(err);
				} else {
					const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);
					return res.json({ message: "login_Success", authToken: token });
				}
			});
        }
        else {
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
            return res.json({ message: "login_Success", authToken: token });
        }
	} else return res.status(400).send("Email or password incorrect");
});

module.exports = router;
