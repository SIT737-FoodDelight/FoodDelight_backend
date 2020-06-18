const express = require("express");
const router = express.Router();
const jwtauth = require("../config/jwtAuth");
const twilio = require("twilio");

router.post("/", jwtauth, async (req, res) => {
  var twiml = new twilio.twiml.MessagingResponse();
  twiml.message(req.body.message);
  res.json("Message Sent");
  res.end(twiml.toString());
});

module.exports = router;
