// models/bookingModel.js
const pool = require("../config/db");

async function createBooking({ name, phone, service, note }) {
  const [result] = await pool.execute(
    "INSERT INTO bookings (name, phone, service, note) VALUES (?, ?, ?, ?)",
    [name, phone, service, note || null],
  );
  return { id: result.insertId, name, phone, service, note, status: "new" };
}

async function setTelegramMessageId(bookingId, messageId) {
  await pool.execute("UPDATE bookings SET telegram_message_id = ? WHERE id = ?", [
    messageId,
    bookingId,
  ]);
}

async function updateStatus(bookingId, status) {
  await pool.execute("UPDATE bookings SET status = ? WHERE id = ?", [status, bookingId]);
}

async function getById(bookingId) {
  const [rows] = await pool.execute("SELECT * FROM bookings WHERE id = ?", [bookingId]);
  return rows[0] || null;
}

module.exports = { createBooking, setTelegramMessageId, updateStatus, getById };
