const express = require("express");
const router = express.Router();
const jwtauth = require("../config/jwtAuth");
const twilio = require("twilio");

router.post("/", jwtauth, async (req, res) => {
  var twiml = new twilio.twiml.MessagingResponse();
  twiml.message("I want to accept the order. Let's talk");
  res.writeHead(200, { "Content-Type": "text/xml" });
  res.json("message sent");
});

module.exports = router;
