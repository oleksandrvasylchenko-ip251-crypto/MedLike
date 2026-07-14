// models/callRequestModel.js
const pool = require("../config/db");

async function createCallRequest({ phone, waitMinutes }) {
  const [result] = await pool.execute(
    "INSERT INTO call_requests (phone, wait_minutes) VALUES (?, ?)",
    [phone, waitMinutes || 10],
  );
  return { id: result.insertId, phone, wait_minutes: waitMinutes || 10, status: "pending" };
}

async function setTelegramMessageId(callRequestId, messageId) {
  await pool.execute("UPDATE call_requests SET telegram_message_id = ? WHERE id = ?", [
    messageId,
    callRequestId,
  ]);
}

async function updateStatus(callRequestId, status) {
  await pool.execute("UPDATE call_requests SET status = ? WHERE id = ?", [status, callRequestId]);
}

module.exports = { createCallRequest, setTelegramMessageId, updateStatus };
