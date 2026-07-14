# ✅ ЧЕКЛІСТ УСТАНОВКИ І ЗАПУСКУ MedLike

## 🎯 ЭТАП 1: ПІДГОТОВКА (До встановлення)

### Telegram
- [ ] Напишіть @BotFather в Telegram
- [ ] Команда `/newbot`
- [ ] Вкажіть ім'я бота (напр., MedLike_Clinic)
- [ ] Вкажіть username (напр., medlike_clinic_bot)
- [ ] **Скопіюйте і збережіть токен** — потім знадобиться
  
### Telegram Chat ID
- [ ] Напишіть @userinfobot в Telegram
- [ ] Команда `/start`
- [ ] **Скопіюйте і збережіть ваш ID** — потім знадобиться

### Програмне забезпечення
- [ ] Node.js встановлено? (`node -v` має показати версію)
  - Якщо ні: https://nodejs.org (версія 14+)
- [ ] npm встановлено? (`npm -v` має показати версію)
  - Встановлюється з Node.js автоматично
- [ ] MySQL встановлено? (`mysql --version` має показати версію)
  - Якщо ні: https://www.mysql.com/downloads/

---

## 🔧 ЕТАП 2: НАЛАШТУВАННЯ ПРОЄКТУ

### Копіювання файлів
- [ ] Завантажте всі файли з виходу (outputs)
- [ ] Розташуйте їх у проєкт MedLike за структурою:

```
MedLike/
├── server/
│   ├── app.js                    ← замініть на новий
│   ├── package.json              ← замініть на новий
│   ├── .env                      ← НОВИЙ (див. нижче)
│   ├── .env.example              ← НОВИЙ
│   ├── .gitignore                ← НОВИЙ
│   ├── config/
│   │   ├── schema.sql            ← замініть на новий
│   │   ├── telegram.js           ← замініть на новий
│   │   └── telegramCallbacks.js  ← замініть на новий
│   ├── controllers/
│   │   ├── callRequestController.js  ← замініть на новий
│   │   ├── doctorController.js       ← НОВИЙ
│   │   └── serviceController.js      ← НОВИЙ
│   ├── models/
│   │   ├── callRequestModel.js       ← замініть на новий
│   │   ├── appointmentModel.js       ← НОВИЙ
│   │   ├── doctorModel.js            ← НОВИЙ
│   │   └── serviceModel.js           ← НОВИЙ
│   ├── routes/
│   │   ├── callRequestRoutes.js      ← замініть на новий
│   │   ├── doctorRoutes.js           ← НОВИЙ
│   │   └── serviceRoutes.js          ← НОВИЙ
│   ├── middleware/
│   │   └── validate.js               ← замініть на новий
│   └── scripts/
│       └── seedDatabase.js           ← НОВИЙ
├── script/
│   └── api.js                    ← замініть на новий
└── (інші файли залишаються незмінними)
```

### Встановлення залежностей
```bash
# Перейдіть в папку сервера
cd server

# Встановіть npm пакети
npm install

# Перевірка (має показати версії)
npm -v
node -v
```

- [ ] `npm install` виконано без помилок

### Налаштування .env
```bash
# Скопіюйте файл
cp .env.example .env

# Відредагуйте .env (відкрийте текстовим редактором)
nano .env
# або
code .env
# або
notepad server\.env
```

Заповніть значення:
```
# Мінімальні параметри:
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=ВАШ_ПАРОЛЬ_MYSQL
DB_NAME=medlike

PORT=3000
CLIENT_ORIGIN=http://localhost:3000

# Telegram (скопіюйте те що отримали вище)
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
TELEGRAM_ADMIN_CHAT_ID=123456789

NODE_ENV=development
```

- [ ] `.env` файл заповнений коректно

---

## 💾 ЕТАП 3: БАЗА ДАНИХ

### Запуск MySQL
```bash
# macOS (якщо встановлено через Homebrew)
brew services start mysql

# Linux (Ubuntu/Debian)
sudo systemctl start mysql
sudo systemctl status mysql

# Windows
# MySQL повинна запуститися автоматично після перезавантаження
# Перевіряємо: mysql -u root -p
```

- [ ] MySQL запущена і доступна

### Імпорт схеми БД
```bash
# Спосіб 1 (простіше)
mysql -u root -p < server/config/schema.sql
# Вводимо пароль від MySQL

# Спосіб 2 (в MySQL CLI)
mysql -u root -p
# Вводимо пароль
mysql> source /path/to/server/config/schema.sql;
# або просто скопіюємо весь вміст schema.sql в консоль
```

- [ ] Файл schema.sql імпортований без помилок

### Перевірка БД
```bash
mysql -u root -p
# Вводимо пароль

mysql> USE medlike;
mysql> SHOW TABLES;
```

Повинні вийти таблиці:
- [ ] `users`
- [ ] `doctors`
- [ ] `services`
- [ ] `schedules`
- [ ] `appointments`
- [ ] `bookings`
- [ ] `call_requests`

```bash
mysql> EXIT;
```

---

## 📝 ЕТАП 4: ЗАВАНТАЖЕННЯ ТЕСТОВИХ ДАНИХ

```bash
# Перейдіть в папку сервера
cd server

# Запустіть скрипт завантаження
node scripts/seedDatabase.js
```

Видить:
```
🌱 Початок завантаження тестових даних...
👨‍⚕️ Додаю лікарів...
✅ Додано 3 лікарів
🏥 Додаю послуги...
✅ Додано 5 послуг
...
🎉 Тестові дані успішно завантажено!
```

- [ ] Тестові дані завантажені

---

## 🚀 ЕТАП 5: ЗАПУСК СЕРВЕРА

### Запуск бекенду
```bash
# В папці server/ запустіть:
npm start

# Видить:
# ✅ MedLike API запущено на порту 3000
# 🌍 URL: http://localhost:3000
```

- [ ] Бекенд запущено на порту 3000
- [ ] Немає помилок в консолі

### Запуск фронтенду (в НОВОМУ терміналі)
```bash
# Перейдіть в корінь проєкту
cd /path/to/MedLike

# Запустіть веб-сервер
python -m http.server 8000

# або (якщо є Node.js)
npx http-server -p 8000

# Видить:
# Serving HTTP on port 8000
# http://localhost:8000
```

- [ ] Фронтенд запущено на порту 8000
- [ ] Відкривається http://localhost:8000 у браузері

---

## ✅ ЕТАП 6: ТЕСТУВАННЯ

### Тест 1: API Здоров'я
```bash
curl http://localhost:3000/api/health
```

Очікуємо:
```json
{"ok":true,"service":"medlike-server","time":"2024-07-10T14:30:00Z"}
```

- [ ] Тест 1 успішний

### Тест 2: Послуги
```bash
curl http://localhost:3000/api/services
```

Очікуємо масив з послугами:
```json
{"ok":true,"data":[{"id":1,"name":"Консультація",...}]}
```

- [ ] Тест 2 успішний

### Тест 3: Лікарі
```bash
curl http://localhost:3000/api/doctors
```

Очікуємо масив з лікарями:
```json
{"ok":true,"data":[{"id":1,"name":"Доктор Іван",...}]}
```

- [ ] Тест 3 успішний

### Тест 4: Запис на прийом
```bash
curl -X POST http://localhost:3000/api/booking \
  -H "Content-Type: application/json" \
  -d '{"name":"Тест Користувач","phone":"+380501234567","service":"Консультація","note":"Тестовий запис"}'
```

Очікуємо:
```json
{"ok":true,"id":1}
```

- [ ] Тест 4 успішний

### Тест 5: Telegram сповіщення
- [ ] Перевірте Telegram — повинно прийти сповіщення про новий запис
- [ ] Натисніть кнопку "✅ Підтвердити"
- [ ] Перевірте БД:

```bash
mysql -u root -p
mysql> USE medlike;
mysql> SELECT * FROM bookings WHERE id=1;
# Статус повинен бути "confirmed"
```

- [ ] Тест 5 успішний

### Тест 6: Дзвінок
```bash
curl -X POST http://localhost:3000/api/call-request \
  -H "Content-Type: application/json" \
  -d '{"phone":"+380501234567","waitMinutes":15}'
```

- [ ] Сповіщення прийшло в Telegram
- [ ] Дані записалися в БД

---

## 🌐 ЕТАП 7: ФРОНТЕНД ІНТЕГРАЦІЯ

### Перевірка формі
- [ ] Відкрийте http://localhost:8000 в браузері
- [ ] Знайдіть форму "Запис на прийом"
- [ ] Заповніть форму:
  - ім'я: Тест
  - телефон: +380501234567
  - послуга: будь-яка
  - побажання: тест
- [ ] Натисніть "Надіслати"
- [ ] Видить повідомлення про успіх
- [ ] Перевірте БД — нова заявка там
- [ ] Перевірте Telegram — сповіщення прийшло

- [ ] Форма запису працює
- [ ] Форма дзвінку працює

---

## 📊 ЕТАП 8: ФІНАЛЬНА ПЕРЕВІРКА

### DevTools (F12 в браузері)

#### Вкладка Console (повинна бути чистою)
- [ ] Немає червоних помилок
- [ ] Видить: `[api] submitBooking: {...}`

#### Вкладка Network
- [ ] Запит `POST /api/booking` має статус 201
- [ ] Запит `POST /api/call-request` має статус 201

### Terminal (вікно бекенду)
- [ ] Видить лог: `[bookingController] createBooking failed...` ← НЕ ПОВИННА бути помилка
- [ ] Видить лог: `[telegram] ✅ Сповіщення відправлено`

### MySQL
```bash
mysql -u root -p
mysql> USE medlike;
mysql> SELECT COUNT(*) FROM bookings;
mysql> SELECT COUNT(*) FROM call_requests;
```

- [ ] Кількість записів збільшується кожного разу

### Telegram
- [ ] Прийшли сповіщення про записи
- [ ] Прийшли сповіщення про дзвінки
- [ ] Кнопки "Підтвердити/Скасувати" працюють

---

## 🎉 ВСЕ ГОТОВО!

Якщо все пройшло:

- ✅ Сервер запущено на localhost:3000
- ✅ Фронтенд доступний на localhost:8000
- ✅ Форми надсилають дані
- ✅ Дані зберігаються в MySQL
- ✅ Telegram надходять сповіщення
- ✅ Кнопки змінюють статус

---

## ❌ ЯКЩО ЩОС ПІШЛО НЕ ТАК

### Помилка: "Cannot find module 'express'"
```bash
cd server
npm install
```

### Помилка: "ECONNREFUSED 127.0.0.1:3306"
```bash
# MySQL не запущена
mysql.server start  # macOS
# або
sudo systemctl start mysql  # Linux
```

### Помилка: "Database 'medlike' doesn't exist"
```bash
mysql -u root -p < server/config/schema.sql
```

### Помилка: "TELEGRAM_BOT_TOKEN не налаштовано"
1. Відкрийте `server/.env`
2. Перевірте, чи скопіювали токен від @BotFather правильно
3. Перезавантажте сервер: `npm start`

### Форми не відправляються
1. DevTools (F12) → Console
2. Дивіться помилки
3. Перевірте:
   - Бекенд запущено? (`npm start`)
   - Правильна URL? (http://localhost:3000)
   - .env налаштований?

### Telegram не отримує сповіщення
1. Перевірте TELEGRAM_BOT_TOKEN в .env
2. Перевірте TELEGRAM_ADMIN_CHAT_ID в .env
3. Перезавантажте бекенд
4. Дивіться логи: `[telegram]`

---

## 📚 НАСТУПНІ КРОКИ

Після успішного запуску:

1. 📖 **Читайте:**
   - `SETUP_GUIDE_UA.md` — детальна інструкція
   - `API_QUICK_REFERENCE.md` — всі API методи
   - `README_BACKEND.md` — про структуру

2. 🔨 **Розробка:**
   - Додавайте нові функції
   - Розширюйте БД
   - Створіть адмін-панель

3. 🚀 **Деплой:**
   - Читайте `DEPLOYMENT_GUIDE.md`
   - Виберіть хостинг
   - Розгорніть на production

---

## ✨ УСПІХІВ! 🎉

Проєкт MedLike готовий до використання!

**Якщо потрібна допомога:**
- Перевірте логи
- Читайте документацію
- Тестуйте curl запити
- Перевіряйте DevTools

**Контакт:** Документація у файлах README_*.md

---

**P.S.** Зберегти цей чек-лист - він стане вам в пригоді! ✅
