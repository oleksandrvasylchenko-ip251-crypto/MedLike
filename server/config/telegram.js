// config/telegram.js
require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;
const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

console.log("🤖 [telegram] Початок налаштування...");
console.log("🤖 [telegram] Токен:", token ? "✅ Є (довжина: " + token.length + ")" : "❌ Немає");
console.log("🤖 [telegram] Admin Chat ID:", adminChatId ? "✅ Є (" + adminChatId + ")" : "❌ Немає");

if (!token || token === "your_bot_token_here") {
  console.error("❌ ПОМИЛКА: TELEGRAM_BOT_TOKEN не налаштовано в .env!");
}

if (!adminChatId) {
  console.error("❌ ПОМИЛКА: TELEGRAM_ADMIN_CHAT_ID не налаштовано в .env!");
}

let bot = null;

try {
  bot = new TelegramBot(token, { polling: true });
  console.log("✅ [telegram] TelegramBot об'єкт створено");

  // Перевіримо, що бот дійсно працює
  bot.getMe()
    .then((botInfo) => {
      console.log(`🎉 [telegram] Бот активний: @${botInfo.username} (ID: ${botInfo.id})`);
    })
    .catch((err) => {
      console.error("❌ [telegram] Помилка підключення до Telegram API:", err.message);
      console.error("    Перевірте:");
      console.error("    1. Чи правильний токен в .env?");
      console.error("    2. Чи має бот доступ до інтернету?");
      console.error("    3. Чи не заблокований Telegram у вашій мережі?");
    });

  // Обробка помилок polling
  bot.on("polling_error", (error) => {
    console.error("❌ [telegram] Помилка polling:", error.message);
    if (error.message.includes("ETIMEOUT")) {
      console.error("   (Timeout - можлива проблема з інтернетом)");
    }
  });

  // Обробка помилок загалом
  bot.on("error", (error) => {
    console.error("❌ [telegram] Помилка бота:", error.message);
  });
} catch (error) {
  console.error("❌ [telegram] Критична помилка при створенні бота:", error.message);
  bot = null;
}

// ==================================================
// ФУНКЦІЇ СПОВІЩЕННЯ
// ==================================================

async function notifyAdminNewBooking(booking) {
  if (!bot) {
    console.error("❌ [telegram] Бот не був ініціалізований");
    return null;
  }

  if (!adminChatId) {
    console.error("❌ [telegram] Admin Chat ID не налаштовано");
    return null;
  }

  const text =
    `🩺 *Новий запис на прийом*\n\n` +
    `Ім'я: ${booking.name}\n` +
    `Телефон: ${booking.phone}\n` +
    `Послуга: ${booking.service}\n` +
    (booking.note ? `Побажання: ${booking.note}\n` : "") +
    `\nID заявки: ${booking.id}`;

  try {
    console.log("[telegram] 📤 Надсилання сповіщення адміну...");
    console.log("[telegram] Адреса чату:", adminChatId);
    
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

    console.log("✅ [telegram] Сповіщення надіслано адміну! Повідомлення ID:", message.message_id);
    return message.message_id;
  } catch (error) {
    console.error("❌ [telegram] Помилка надсилання сповіщення адміну:", error.message);
    console.error("   Деталі помилки:", error.response ? error.response.body : error);
    console.error("   Перевірте:");
    console.error("   1. Чи правильний TELEGRAM_ADMIN_CHAT_ID?");
    console.error("   2. Чи бот додан до цього чату?");
    console.error("   3. Чи немає обмежень повідомлень?");
    return null;
  }
}

async function notifyAdminCallRequest(callRequest) {
  if (!bot) {
    console.error("❌ [telegram] Бот не був ініціалізований");
    return null;
  }

  if (!adminChatId) {
    console.error("❌ [telegram] Admin Chat ID не налаштовано");
    return null;
  }

  const text =
    `📞 *Заявка на зворотній дзвінок*\n\n` +
    `Телефон: ${callRequest.phone}\n` +
    `Бажаний час очікування: ${callRequest.wait_minutes} хв\n` +
    `\nID заявки: ${callRequest.id}`;

  try {
    console.log("[telegram] 📤 Надсилання сповіщення про дзвінок...");
    
    const message = await bot.sendMessage(adminChatId, text, { parse_mode: "Markdown" });

    console.log("✅ [telegram] Сповіщення про дзвінок надіслано! Повідомлення ID:", message.message_id);
    return message.message_id;
  } catch (error) {
    console.error("❌ [telegram] Помилка надсилання сповіщення про дзвінок:", error.message);
    return null;
  }
}

module.exports = { bot, notifyAdminNewBooking, notifyAdminCallRequest };
