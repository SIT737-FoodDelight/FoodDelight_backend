const express = require("express");
const router = express.Router();
const jwtauth = require("../config/jwtAuth");
const twilio = require("twilio");

router.post("/", jwtauth, async (req, res) => {
	var twiml = new twilio.twiml.MessagingResponse();
	twiml.message("I want to accept the order. Let's talk");
	res.json("Message Sent");
	res.end(twiml.toString());
});

module.exports = router;
