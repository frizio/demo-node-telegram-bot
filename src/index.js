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

bot.mention("frizioo", (ctx) => {
  ctx.reply("You mention/tag a user.");
});

bot.phone("3331234567", (ctx) => {
  ctx.reply("You've digit a phone number.");
});

bot.hashtag("sea", (ctx) => {
  ctx.reply("Hashtag sea!!!");
});

bot.hears(["animals", "Animals"], (ctx) => {
  let animalMessage = `Great, here are pictures of animals you would love`;
  ctx.deleteMessage();
  bot.telegram.sendMessage(ctx.chat.id, animalMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Dog",
            callback_data: "dog",
          },
          {
            text: "Cat",
            callback_data: "cat",
          },
        ],
      ],
    },
  });
});

bot.action("dog", (ctx) => {
  ctx.reply("DOG!");
  /*
  bot.telegram.sendPhoto(ctx.chat.id, {
      source: "res/dog.jpeg"
  })
  */
});

bot.action("cat", (ctx) => {
  ctx.reply("CAT!");
  /*
  bot.telegram.sendPhoto(ctx.chat.id, {
      source: "res/cat.jpeg"
  })
  */
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
