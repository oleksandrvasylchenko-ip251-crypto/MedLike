console.log("🚀 Початок завантаження сервера...");

require("dotenv").config();
console.log("✅ .env завантажено");

const express = require("express");
console.log("✅ Express завантажено");

const cors = require("cors");
console.log("✅ CORS завантажено");

const path = require("path");
console.log("✅ Path завантажено");

const bookingRoutes = require("./routes/bookingRoutes");
console.log("✅ bookingRoutes завантажено");

const callRequestRoutes = require("./routes/callRequestRoutes");
console.log("✅ callRequestRoutes завантажено");

const { registerTelegramCallbacks } = require("./config/telegramCallbacks");
console.log("✅ telegramCallbacks завантажено");

console.log("🚀 Створення Express додатку...");
const app = express();
console.log("✅ Express додаток створено");

const PORT = process.env.PORT || 3002;
console.log(`📡 Порт: ${PORT}`);

// === НАЛАШТУВАННЯ СЕРВЕРА ===
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
  })
);
app.use(express.json());

app.use(express.static(path.join(__dirname, "..")));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "medlike-server", time: new Date().toISOString() });
});

app.use("/api/booking", bookingRoutes);
app.use("/api/call-request", callRequestRoutes);

app.use("/api", (req, res) => {
  res.status(404).json({ ok: false, message: "Маршрут не знайдено." });
});

app.use((err, req, res, next) => {
  console.error("[app] Unhandled error:", err);
  res.status(500).json({ ok: false, message: "Внутрішня помилка сервера." });
});

// ========== ДОДАНО ПЕРЕВІРКУ ==========
console.log("🔍 Перевірка змінних .env:");
console.log("   TELEGRAM_BOT_TOKEN:", process.env.TELEGRAM_BOT_TOKEN ? "✅ Є" : "❌ Немає");
console.log("   TELEGRAM_ADMIN_CHAT_ID:", process.env.TELEGRAM_ADMIN_CHAT_ID ? "✅ Є" : "❌ Немає");
// =====================================

registerTelegramCallbacks();

// === ЗАПУСК СЕРВЕРА ===
app.listen(PORT, () => {
  console.log(`✅ MedLike API запущено на порту ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}/api/health`);
});