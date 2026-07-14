<<<<<<< HEAD
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

=======
// app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const bookingRoutes = require("./routes/bookingRoutes");
const callRequestRoutes = require("./routes/callRequestRoutes");
const { registerTelegramCallbacks } = require("./config/telegramCallbacks");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
  }),
);
app.use(express.json());

// Клієнтський статичний сайт (client/) — за бажанням можна віддавати
// той самий Express-сервер, або залишити фронтенд на окремому хостингу.
>>>>>>> 6bdad9ca38addac2808754fbe95de3ad93aaedfc
app.use(express.static(path.join(__dirname, "..")));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "medlike-server", time: new Date().toISOString() });
});

app.use("/api/booking", bookingRoutes);
app.use("/api/call-request", callRequestRoutes);

<<<<<<< HEAD
=======
// Обробка невідомих /api/* маршрутів
>>>>>>> 6bdad9ca38addac2808754fbe95de3ad93aaedfc
app.use("/api", (req, res) => {
  res.status(404).json({ ok: false, message: "Маршрут не знайдено." });
});

<<<<<<< HEAD
=======
// Загальний обробник помилок
>>>>>>> 6bdad9ca38addac2808754fbe95de3ad93aaedfc
app.use((err, req, res, next) => {
  console.error("[app] Unhandled error:", err);
  res.status(500).json({ ok: false, message: "Внутрішня помилка сервера." });
});

<<<<<<< HEAD
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
=======
registerTelegramCallbacks();

app.listen(PORT, () => {
  console.log(`✅ MedLike API запущено на порту ${PORT}`);
});
>>>>>>> 6bdad9ca38addac2808754fbe95de3ad93aaedfc
