// controllers/callRequestController.js
const callRequestModel = require("../models/callRequestModel");
const { notifyAdminCallRequest } = require("../config/telegram");

async function createCallRequest(req, res) {
  try {
    const { phone, waitMinutes } = req.body;
    const callRequest = await callRequestModel.createCallRequest({ phone, waitMinutes });

    try {
      const messageId = await notifyAdminCallRequest(callRequest);
      if (messageId) {
        await callRequestModel.setTelegramMessageId(callRequest.id, messageId);
      }
    } catch (telegramError) {
      console.error("[callRequestController] Telegram notify failed:", telegramError.message);
    }

    return res.status(201).json({ ok: true, id: callRequest.id });
  } catch (error) {
    console.error("[callRequestController] createCallRequest failed:", error);
    return res.status(500).json({ ok: false, message: "Внутрішня помилка сервера." });
  }
}

module.exports = { createCallRequest };
