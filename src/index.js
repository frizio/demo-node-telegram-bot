console.log("Demo Node Telegram Bot with WebHooks");

const dotenv = require("dotenv");

const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const morgan = require("morgan");

dotenv.config();

const PORT = process.env.PORT || 3001;
const { BOT_TOKEN, SERVER_URL } = process.env;

const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

const URI = `/webhook/${BOT_TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;

const app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/api", (req, res) => {
  res.json("hola");
});

app.post(URI, async (req, res) => {
  
  console.log('Receive message from Telegram bot');
  console.log(req.body);
  const chatId = req.body.message.chat.id;
  let text = req.body.message.text;
  
  console.log('Process text message');
  if (text.startsWith("/")) {
    text = 'This is a command.';
  } else {
    text = text.toUpperCase();
  }

  console.log('Send processed message text to Telegram bot');
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text: text,
  });
  
  return res.send();

});

const init = async () => {
  const url = `${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`;
  const res = await axios.get(url);
  console.log(url);
  console.log(res.data);
};


app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  console.log(TELEGRAM_API);
  console.log(WEBHOOK_URL);
  await init();
});
