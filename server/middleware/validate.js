// middleware/validate.js
// Проста серверна валідація вхідних даних (не покладаємось лише на клієнтську).

function isNonEmptyString(value, maxLen = 500) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLen;
}

function isValidPhone(phone) {
  return typeof phone === "string" && phone.replace(/[^0-9]/g, "").length >= 10;
}

function validateBooking(req, res, next) {
  const { name, phone, service, note } = req.body || {};

  if (!isNonEmptyString(name, 150)) {
    return res.status(400).json({ ok: false, message: "Некоректне ім'я." });
  }
  if (!isValidPhone(phone)) {
    return res.status(400).json({ ok: false, message: "Некоректний номер телефону." });
  }
  if (!isNonEmptyString(service, 100)) {
    return res.status(400).json({ ok: false, message: "Оберіть послугу." });
  }
  if (note !== undefined && note !== null && (typeof note !== "string" || note.length > 500)) {
    return res.status(400).json({ ok: false, message: "Побажання занадто довге." });
  }

  next();
}

function validateCallRequest(req, res, next) {
  const { phone, waitMinutes } = req.body || {};

  if (!isValidPhone(phone)) {
    return res.status(400).json({ ok: false, message: "Некоректний номер телефону." });
  }
  if (waitMinutes !== undefined && (!Number.isFinite(waitMinutes) || waitMinutes < 1 || waitMinutes > 120)) {
    return res.status(400).json({ ok: false, message: "Некоректний час очікування (1-120 хв)." });
  }

  next();
}

module.exports = { validateBooking, validateCallRequest };
