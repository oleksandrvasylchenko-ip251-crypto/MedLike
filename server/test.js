console.log("1. Початок...");

require("dotenv").config();
console.log("2. Dotenv завантажено");

const express = require("express");
console.log("3. Express завантажено");

const app = express();
console.log("4. App створено");

const PORT = process.env.PORT || 3000;
console.log("5. Порт:", PORT);

app.get("/test", (req, res) => {
  res.json({ ok: true, message: "Тест працює!" });
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущено на порту ${PORT}`);
});