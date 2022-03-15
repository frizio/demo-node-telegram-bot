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

bot.help((ctx) => {
  ctx.reply("TODO Help");
});

bot.settings((ctx) => {
  ctx.reply("TODO Settings");
});

bot.command(["hola", "Hola", "ciao", "Ciao"], (ctx) => {
  ctx.reply("Saluto custom command reply.");
});

bot.hears("pc", (ctx) => {
  ctx.reply("You've digit the work 'pc' in lower case");
});

bot.on("sticker", (ctx) => {
  ctx.reply("You send a sticker. 👍");
  //ctx.reply('👍')
});

bot.launch();
