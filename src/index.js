const dotnev = require("dotenv");
const { Telegraf } = require("telegraf");
const os = require("os");

dotnev.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  console.log(ctx.from);
  const hostname = os.hostname();
  const msg = `Welcome from ${hostname}. Demo Node Telegram Bot with Telegraf.`;
  ctx.reply(msg);
});


bot.launch({
  webhook: {
    domain: process.env.SERVER_URL,
    port: process.env.PORT,
  },
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
