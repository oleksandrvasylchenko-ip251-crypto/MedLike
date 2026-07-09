// controllers/bookingController.js
const bookingModel = require("../models/bookingModel");
const { notifyAdminNewBooking } = require("../config/telegram");

async function createBooking(req, res) {
  try {
    const { name, phone, service, note } = req.body;
    const booking = await bookingModel.createBooking({ name, phone, service, note });

    try {
      const messageId = await notifyAdminNewBooking(booking);
      if (messageId) {
        await bookingModel.setTelegramMessageId(booking.id, messageId);
      }
    } catch (telegramError) {
      // Заявка вже збережена в БД навіть якщо Telegram недоступний —
      // не валимо запит користувача через збій сповіщення.
      console.error("[bookingController] Telegram notify failed:", telegramError.message);
    }

    return res.status(201).json({ ok: true, id: booking.id });
  } catch (error) {
    console.error("[bookingController] createBooking failed:", error);
    return res.status(500).json({ ok: false, message: "Внутрішня помилка сервера." });
  }
}

module.exports = { createBooking };
