require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;
console.log("🤖 Тест бота...");
console.log("📝 Токен:", token ? token.substring(0, 15) + "..." : "Немає");

const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  console.log(`📩 Отримано: ${msg.text} від ${msg.from.username}`);
  bot.sendMessage(msg.chat.id, "✅ Бот працює! Вітаю!");
});

bot.on("polling_error", (error) => {
  console.error("❌ Помилка:", error.message);
});

console.log("✅ Бот запущено! Напиши йому /start у Telegram.");