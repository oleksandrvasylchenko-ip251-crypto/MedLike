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
app.use(express.static(path.join(__dirname, "..")));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "medlike-server", time: new Date().toISOString() });
});

app.use("/api/booking", bookingRoutes);
app.use("/api/call-request", callRequestRoutes);

// Обробка невідомих /api/* маршрутів
app.use("/api", (req, res) => {
  res.status(404).json({ ok: false, message: "Маршрут не знайдено." });
});

// Загальний обробник помилок
app.use((err, req, res, next) => {
  console.error("[app] Unhandled error:", err);
  res.status(500).json({ ok: false, message: "Внутрішня помилка сервера." });
});

registerTelegramCallbacks();

app.listen(PORT, () => {
  console.log(`✅ MedLike API запущено на порту ${PORT}`);
});
