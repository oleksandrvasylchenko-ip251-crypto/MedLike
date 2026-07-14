// controllers/bookingController.js
const bookingModel = require("../models/bookingModel");
const { notifyAdminNewBooking } = require("../config/telegram");

async function createBooking(req, res) {
  try {
    console.log("[bookingController] 📥 Отримано запит на запис");
    const { name, phone, service, note } = req.body;
    console.log("[bookingController] 📝 Дані:", { name, phone, service, note });

    // Створюємо запис в БД
    const booking = await bookingModel.createBooking({ name, phone, service, note });
    console.log("[bookingController] ✅ Запис створено в БД, ID:", booking.id);

    // Спробуємо надіслати в Telegram (але не блокуємо відповідь користувачеві)
    (async () => {
      try {
        console.log("[bookingController] 📤 Спроба надіслати сповіщення в Telegram...");
        const messageId = await notifyAdminNewBooking(booking);
        
        if (messageId) {
          console.log("[bookingController] ✅ Сповіщення відправлено! ID повідомлення:", messageId);
          
          // Зберігаємо ID повідомлення в БД
          try {
            await bookingModel.setTelegramMessageId(booking.id, messageId);
            console.log("[bookingController] ✅ ID Telegram повідомлення збережено в БД");
          } catch (dbErr) {
            console.error("[bookingController] ⚠️ Не вдалось зберегти ID Telegram повідомлення:", dbErr.message);
          }
        } else {
          console.log("[bookingController] ⚠️ Сповіщення в Telegram не надіслано (messageId = null)");
        }
      } catch (telegramError) {
        console.error("[bookingController] ❌ Помилка при надсиланні в Telegram:", telegramError.message);
      }
    })();

    // Повертаємо успішну відповідь користувачеві (незалежно від Telegram)
    return res.status(201).json({ 
      ok: true, 
      id: booking.id,
      message: "✅ Ваша заявка прийнята! Адміністратор розглянет її найближчим часом."
    });
  } catch (error) {
    console.error("[bookingController] ❌ createBooking failed:", error);
    return res.status(500).json({ 
      ok: false, 
      message: "❌ Помилка: " + error.message 
    });
  }
}

module.exports = { createBooking };
