const accountSid = "AC1347e02d05be49580b7cba9f1b3e79dd";
const authToken = "864f821b33fc3651d5091794c84d0a89";
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    body: "Hi Monica, I'm workin on twilio messages",
    from: "+12058903214",
    to: "+61481831824",
  })
  .then((message) => console.log(message.sid));
