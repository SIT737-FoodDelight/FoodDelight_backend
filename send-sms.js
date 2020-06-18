if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    body: "Hi Monica, I'm workin on twilio messages",
    from: "+12058903214",
    to: "+61481831824",
  })
  .then((message) => console.log(message.sid));
