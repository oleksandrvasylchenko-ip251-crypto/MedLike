// config/telegramCallbacks.js
const { bot } = require("./telegram");
const bookingModel = require("../models/bookingModel");

function registerTelegramCallbacks() {
  console.log("[telegramCallbacks] Реєстрація callback'ів...");
  
  if (!bot) {
    console.warn("[telegramCallbacks] ❌ Бот не створено");
    return;
  }

  console.log("[telegramCallbacks] ✅ Бот готовий до роботи");

  bot.on("callback_query", async (query) => {
    const data = query.data || "";
    console.log("[telegramCallbacks] 📩 Отримано callback:", data);
    
    const match = data.match(/^(confirm|cancel)_booking_(\d+)$/);
    if (!match) {
      console.log("[telegramCallbacks] ⚠️ Невідомий callback:", data);
      return;
    }

    const [, action, idStr] = match;
    const bookingId = parseInt(idStr, 10);
    const newStatus = action === "confirm" ? "confirmed" : "cancelled";

    try {
      await bookingModel.updateStatus(bookingId, newStatus);
      const booking = await bookingModel.getById(bookingId);

      await bot.answerCallbackQuery(query.id, {
        text: action === "confirm" ? "Запис підтверджено ✅" : "Запис скасовано ❌",
      });

      if (booking) {
        await bot.sendMessage(
          query.message.chat.id,
          `Статус заявки #${bookingId} (${booking.name}) оновлено: *${newStatus}*`,
          { parse_mode: "Markdown" }
        );
      }
    } catch (error) {
      console.error("[telegramCallbacks] ❌ Помилка:", error);
      await bot.answerCallbackQuery(query.id, { text: "Помилка оновлення статусу." });
    }
  });
}

module.exports = { registerTelegramCallbacks };