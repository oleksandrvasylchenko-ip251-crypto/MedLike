# 📑 ІНДЕКС ФАЙЛІВ MedLike — Повна Документація

## 🚀 СТАРТ ЗВІДСИ

1. **ПЕРШИЙ РАЗ?** → Читайте [`SUMMARY.md`](#summary) (огляд всього)
2. **ГОТОВІ ЗАПУСТИТИ?** → [`CHECKLIST.md`](#checklist) (крок за кроком)
3. **ДЕТАЛІ ПО УСТАНОВЦІ?** → [`SETUP_GUIDE_UA.md`](#setup)

---

## 📚 ДОКУМЕНТАЦІЯ

### <a name="summary"></a>📋 SUMMARY.md
**Що це:** Огляд всього проекту, що було зроблено, що передати для розробки

**Читайте якщо:**
- Перший раз дивитесь на проект
- Хочете зрозуміти, що вже готово

**Розділи:**
- ✅ Що було зроблено
- 📁 Список всіх файлів
- 🎯 Наступні кроки
- 📊 Статистика готовності

---

### <a name="checklist"></a>✅ CHECKLIST.md
**Що це:** Крок за кроком інструкція установки і запуску

**Читайте якщо:**
- Запускаєте вперше
- Хочете правильно налаштувати все

**Що в розділах:**
1. 🎯 Підготовка (Telegram, ПО)
2. 🔧 Налаштування проєкту (.env)
3. 💾 База даних (MySQL)
4. 📝 Тестові дані
5. 🚀 Запуск сервера
6. ✅ Тестування (6 тестів)
7. 🌐 Інтеграція фронтенду
8. ❌ Вирішення проблем

**Час:** ~45 хвилин

---

### <a name="setup"></a>📖 SETUP_GUIDE_UA.md
**Що це:** Детальна інструкція з пояснениями на кожному кроці

**Читайте якщо:**
- Потрібні деталі кожного кроку
- Робите щось вперше
- Виникли проблеми

**Розділи:**
- 🔧 Крок 1: Telegram Bot
- 💾 Крок 2: MySQL
- 📁 Крок 3: Налаштування проєкту
- 🚀 Крок 4: Запуск бекенду
- 🌐 Крок 5: Запуск фронтенду
- ✅ Крок 6: Тестування
- 🐛 Вирішення проблем

**Час:** ~1 година з деталями

---

### 🏗️ README_BACKEND.md
**Що це:** Описання архітектури бекенду, як він влаштований

**Читайте якщо:**
- Розробляєте новий функціонал
- Розумієте структуру проекту
- Розширюєте бекенд

**Розділи:**
- 📁 Структура папок
- 🔌 API маршрути
- 🗄️ База даних
- 🤖 Telegram Bot
- 🛠️ Розробка (додати новий маршрут)
- 🐛 Вирішення проблем

---

### 🔗 API_QUICK_REFERENCE.md
**Що це:** Швидка довідка всіх API методів

**Читайте якщо:**
- Розробляєте фронтенд
- Тестуєте API
- Пишете код для звернення до бекенду

**Розділи:**
- 📋 Список всіх методів
- 🧪 curl приклади
- 📱 JavaScript приклади
- ⚠️ Коди помилок
- 🔐 Автентифікація

---

### 🚀 DEPLOYMENT_GUIDE.md
**Що це:** Как розгорнути на production (Heroku, DigitalOcean, AWS)

**Читайте якщо:**
- Готуєте до запуску
- Вибираєте хостинг
- Розгортаєте на production

**Платформи:**
1. Localhost (розробка)
2. **Heroku** (рекомендується для новачків)
3. DigitalOcean App Platform
4. DigitalOcean Droplet
5. AWS Elastic Beanstalk
6. Vercel (фронтенд)
7. Своя інфраструктура

---

## 💻 КОД-ФАЙЛИ (Бекенд)

### Config (Налаштування)
- `.env.example` — Шаблон змінних оточення
- `.gitignore` — Щоб не закомітити паролі
- `package.json` — Залежності Node.js
- `schema.sql` — Схема MySQL БД

### Controllers (Логіка)
- `doctorController.js` — Логіка для лікарів
- `serviceController.js` — Логіка для послуг
- `callRequestController.js` — Логіка для дзвінків
- `bookingController.js` — Логіка для записів (існуючий)

### Models (Запити до БД)
- `doctorModel.js` — Запити про лікарів
- `serviceModel.js` — Запити про послуги
- `appointmentModel.js` — Запити про прийоми
- `callRequestModel.js` — Запити про дзвінки
- `bookingModel.js` — Запити про записи (існуючий)

### Routes (Маршрути)
- `doctorRoutes.js` → GET /api/doctors, POST /api/doctors
- `serviceRoutes.js` → GET /api/services, POST /api/services
- `callRequestRoutes.js` → POST /api/call-request, PATCH /api/call-request/:id/status
- `bookingRoutes.js` → POST /api/booking (існуючий)

### Middleware (Обробники)
- `validate.js` — Валідація + XSS санітизація

### Config (Інтеграції)
- `telegram.js` — Telegram Bot конфіг
- `telegramCallbacks.js` — Обробка кнопок Telegram
- `db.js` — MySQL підключення (існуючий)

### Main
- `app.js` — Основний файл Express (оновлено)

### Scripts (Утіліти)
- `seedDatabase.js` — Завантаження тестових даних

---

## 📱 КОД-ФАЙЛИ (Фронтенд)

- `api.js` — Клієнтський API (активовано fetch запити)

**Розташування:** Замініть `script/api.js` на новий файл

---

## 🗂️ СТРУКТУРА НАВІГАЦІЇ

```
ДОКУМЕНТАЦІЯ
├── SUMMARY.md (👈 ПОЧНІТЬ ЗВІДСИ)
├── CHECKLIST.md (🚀 ЗАПУСК ЗА 45 ХВИЛИН)
├── SETUP_GUIDE_UA.md (📖 ДЕТАЛЬНА ІНСТРУКЦІЯ)
├── README_BACKEND.md (🏗️ АРХІТЕКТУРА)
├── API_QUICK_REFERENCE.md (🔗 ВСІ МЕТОДИ)
└── DEPLOYMENT_GUIDE.md (🚀 PRODUCTION)

КОД-ФАЙЛИ
├── Конфіг
│   ├── .env.example
│   ├── .gitignore
│   ├── schema.sql
│   ├── package.json
│   ├── telegram.js
│   └── telegramCallbacks.js
├── Controllers (Логіка)
│   ├── doctorController.js
│   ├── serviceController.js
│   └── callRequestController.js
├── Models (БД)
│   ├── doctorModel.js
│   ├── serviceModel.js
│   ├── appointmentModel.js
│   └── callRequestModel.js
├── Routes (Маршрути)
│   ├── doctorRoutes.js
│   ├── serviceRoutes.js
│   └── callRequestRoutes.js
├── Middleware
│   └── validate.js
├── Main
│   └── app.js
├── Scripts
│   └── seedDatabase.js
└── Фронтенд
    └── api.js
```

---

## 🎯 СЦЕНАРІЇ КОРИСТУВАННЯ

### Сценарій 1: "Я з нуля, де почати?"
1. Читайте **SUMMARY.md** (5 хв)
2. Виконайте **CHECKLIST.md** (45 хв)
3. Тестуйте за інструкцією
4. Читайте **README_BACKEND.md** для деталей

---

### Сценарій 2: "Запускаю, щось не спрацює"
1. Перейдіть на розділ **❌ Вирішення проблем** у **SETUP_GUIDE_UA.md**
2. Або розділ **🐛 Вирішення Проблем** у **README_BACKEND.md**
3. Якщо не допоміг → перевірте логи (F12, terminal)

---

### Сценарій 3: "Розробляю новий функціонал"
1. Читайте **README_BACKEND.md** → "🛠️ Розробка"
2. Читайте **API_QUICK_REFERENCE.md** для контексту
3. Дивіться існуючі моделі/контролери як приклад

---

### Сценарій 4: "Розгортаю на production"
1. Читайте **DEPLOYMENT_GUIDE.md**
2. Виберіть платформу (Heroku, DigitalOcean, AWS)
3. Виконайте інструкцію для вашої платформи

---

### Сценарій 5: "Тестую API"
1. Читайте **API_QUICK_REFERENCE.md**
2. Використовуйте curl приклади
3. Або запуск у JavaScript / Postman

---

## 📊 МАТРИЦЯ ФАЙЛІВ

| Файл | Тип | Пріоритет | Для кого |
|------|-----|-----------|----------|
| SUMMARY.md | 📖 Доки | 🔴 ПЕРШИМ | Всі |
| CHECKLIST.md | 📋 Інструкція | 🔴 ДРУГИМ | Всі |
| SETUP_GUIDE_UA.md | 📖 Доки | 🟠 Важливо | Новачків |
| README_BACKEND.md | 📖 Доки | 🟠 Важливо | Розробників |
| API_QUICK_REFERENCE.md | 📖 Довідка | 🟡 Корисно | Фронтенду |
| DEPLOYMENT_GUIDE.md | 📖 Доки | 🟡 Корисно | DevOps |
| Code files | 💻 Код | 🔴 ОБОВ'ЯЗКОВО | Всім |

---

## 🔍 ПОШУК ПО ТЕМАХ

### "Як запустити?"
→ **CHECKLIST.md** або **SETUP_GUIDE_UA.md**

### "Як розгорнути на Heroku?"
→ **DEPLOYMENT_GUIDE.md** → Heroku розділ

### "Що робить /api/booking?"
→ **API_QUICK_REFERENCE.md**

### "Як додати новий API маршрут?"
→ **README_BACKEND.md** → 🛠️ Розробка

### "Я отримую помилку..."
→ Розділ "❌ Вирішення Проблем" в документації

### "Як переносити Telegram Bot?"
→ **SETUP_GUIDE_UA.md** → Крок 1

### "Як копіювати файли в проект?"
→ **SUMMARY.md** → Структура файлів

### "Як налаштувати .env?"
→ **SETUP_GUIDE_UA.md** → Крок 3

### "Як тестувати API?"
→ **API_QUICK_REFERENCE.md** → ТЕСТУВАННЯ З curl

### "Як заповнити БД тестовими даними?"
→ **CHECKLIST.md** → ЕТАП 4

---

## ⏱️ ЧАС НА ЧИТАННЯ

| Документ | Час |
|----------|-----|
| SUMMARY.md | 5 хв |
| CHECKLIST.md | 45 хв (виконання) |
| SETUP_GUIDE_UA.md | 60 хв (з деталями) |
| README_BACKEND.md | 20 хв |
| API_QUICK_REFERENCE.md | 10 хв |
| DEPLOYMENT_GUIDE.md | 30 хв |
| **ВСЬОГО** | **~180 хв** (3 години) |

---

## 📞 НЕМА ВІДПОВІДІ НА ПИТАННЯ?

1. Скористайтесь **пошуком** (Ctrl+F / Cmd+F) по ключовому слову
2. Перевірте розділ **"Вирішення проблем"** в документації
3. Дивіться **логи** (F12 у браузері або terminal)
4. Тестуйте **curl запити** для перевірки API

---

## ✅ ЧЕКЛІСТ ПЕРЕД ЗАКІНЧЕННЯМ

- [ ] Прочитав SUMMARY.md
- [ ] Виконав CHECKLIST.md
- [ ] Запустив бекенд (npm start)
- [ ] Запустив фронтенд (python -m http.server)
- [ ] Перевірив 6 тестів з CHECKLIST.md
- [ ] Форми відправляють дані
- [ ] Telegram отримує сповіщення
- [ ] БД записує дані
- [ ] Прочитав README_BACKEND.md для розумення архітектури

---

## 📚 ЦІЛИЙ ПРОЕКТ У СКОРОЧЕННІ

```
1️⃣ ЗАПУСК (45 ХВИЛИН)
   └─ CHECKLIST.md

2️⃣ РОЗРОБКА (ПОТОЧНА)
   └─ README_BACKEND.md + API_QUICK_REFERENCE.md

3️⃣ PRODUCTION (КОЛИ ГОТОВО)
   └─ DEPLOYMENT_GUIDE.md

4️⃣ ПРОБЛЕМИ (ЯКЩО ЩОС ПІШЛО НЕ ТАК)
   └─ Розділи "❌ Вирішення" у документах
```

---

## 🎉 ВИ ВСЕ ГОТОВІ!

Всі файли, документація і код на місці.

**Наступний крок:** Відкрийте [`SUMMARY.md`](#summary) або [`CHECKLIST.md`](#checklist)

**Успіхів! 🚀**

---

*Останнє оновлення: Липень 2026*
*Версія: 1.0 —完成*
