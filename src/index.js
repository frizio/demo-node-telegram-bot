const dotnev = require("dotenv");
const { Telegraf } = require("telegraf");
const os = require("os");

dotnev.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  const hostname = os.hostname();
  const msg = `Welcome from ${hostname}. Demo Node Telegram Bot with Telegraf.`;
  ctx.reply(msg);
});

bot.launch();
