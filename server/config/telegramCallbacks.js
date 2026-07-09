// config/telegramCallbacks.js
// Обробка натискань на inline-кнопки "Підтвердити/Скасувати" в Telegram.
// Оновлює статус запису в MySQL та повідомляє адміністратора про результат.
const { bot } = require("./telegram");
const bookingModel = require("../models/bookingModel");

function registerTelegramCallbacks() {
  if (!bot) return;

  bot.on("callback_query", async (query) => {
    const data = query.data || "";
    const match = data.match(/^(confirm|cancel)_booking_(\d+)$/);
    if (!match) return;

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
          { parse_mode: "Markdown" },
        );
      }
    } catch (error) {
      console.error("[telegramCallbacks] failed to update booking status:", error);
      await bot.answerCallbackQuery(query.id, { text: "Помилка оновлення статусу." });
    }
  });
}

module.exports = { registerTelegramCallbacks };
