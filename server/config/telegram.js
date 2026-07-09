// config/telegram.js
// Telegram Bot API — надсилання сповіщень адміністратору та
// обробка підтвердження/скасування запису прямо в чаті.
require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;
const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

if (!token || token === "your_bot_token_here") {
  console.warn(
    "[telegram] TELEGRAM_BOT_TOKEN не налаштовано в .env — сповіщення в Telegram працювати не будуть.",
  );
}

// polling: true — бот сам опитує Telegram на нові команди (підтвердити/скасувати).
// Для продакшену можна перейти на webhook (bot.setWebHook), якщо є HTTPS-домен.
const bot = token ? new TelegramBot(token, { polling: true }) : null;

async function notifyAdminNewBooking(booking) {
  if (!bot || !adminChatId) return null;

  const text =
    `🩺 *Новий запис на прийом*\n\n` +
    `Ім'я: ${booking.name}\n` +
    `Телефон: ${booking.phone}\n` +
    `Послуга: ${booking.service}\n` +
    (booking.note ? `Побажання: ${booking.note}\n` : "") +
    `\nID заявки: ${booking.id}`;

  const message = await bot.sendMessage(adminChatId, text, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "✅ Підтвердити", callback_data: `confirm_booking_${booking.id}` },
          { text: "❌ Скасувати", callback_data: `cancel_booking_${booking.id}` },
        ],
      ],
    },
  });

  return message.message_id;
}

async function notifyAdminCallRequest(callRequest) {
  if (!bot || !adminChatId) return null;

  const text =
    `📞 *Заявка на зворотній дзвінок*\n\n` +
    `Телефон: ${callRequest.phone}\n` +
    `Бажаний час очікування: ${callRequest.wait_minutes} хв\n` +
    `\nID заявки: ${callRequest.id}`;

  const message = await bot.sendMessage(adminChatId, text, { parse_mode: "Markdown" });
  return message.message_id;
}

module.exports = { bot, notifyAdminNewBooking, notifyAdminCallRequest };
