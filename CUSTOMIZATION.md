# 🎨 КАСТОМІЗАЦІЯ САЙТУ МЕДЛАЙК

Цей файл описує ВСІ можливі зміни, які ви можете зробити на сайті.

---

## 1️⃣ ЗМІНИТИ НАЗВУ КЛІНІКИ

### Крок 1: Відредагуйте HTML
Файл: `index.html`

Знайдіть рядок 4 та змініть:
```html
<!-- ЗІ -->
<title>МЕДЛАЙК - Медичний центр</title>
<!-- НА -->
<title>ВАШАКЛІНІКА - Медичний центр</title>
```

Знайдіть героу секцію і змініть:
```html
<!-- ЗІ -->
<h1>МЕДИЧНИЙ ЦЕНТР</h1>
<h2>МЕДЛАЙК</h2>
<!-- НА -->
<h1>МЕДИЧНИЙ ЦЕНТР</h1>
<h2>ВАШАКЛІНІКА</h2>
```

Знайдіть footer та змініть назву в усіх місцях.

### Крок 2: Оновіть контакти
```html
<!-- ЗІ -->
<a href="tel:+380989321986">+38(098)932-19-86</a>
<!-- НА -->
<a href="tel:+38XXXXXXXXXX">+38(0XX)XXX-XX-XX</a>
```

### Крок 3: Оновіть адресу
```html
<!-- ЗІ -->
<p>м.Івано-Франківськ, вул. Володимира Великого 12Б</p>
<!-- НА -->
<p>ВАШ_ГОРОД, вул. ВАШАУЛИЦЯ 123</p>
```

---

## 2️⃣ ЗМІНИТИ ЛОГОТИП

### Варіант A: Використовувати текстовий логотип
Логотип на даний момент це SVG. Це добре!

Щоб змінити текст, відредагуйте SVG у файлі `index.html`:
```html
<div class="logo">
    <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
        <!-- ... -->
        <text x="15" y="35" font-family="Arial" font-size="14" font-weight="bold" fill="#09B9AA">ВАШ</text>
        <text x="55" y="35" font-family="Arial" font-size="14" font-weight="bold" fill="#09B9AA">ЛОГОТИП</text>
    </svg>
</div>
```

### Варіант B: Замінити на графічний логотип
1. Поміщайте зображення логотипу в папку `images/` (наприклад `logo.png`)
2. Замініть SVG на:
```html
<div class="logo">
    <img src="images/logo.png" alt="ВАШАКЛІНІКА" style="height: 60px; width: auto;">
</div>
```

---

## 3️⃣ ЗМІНИТИ ПОСЛУГИ

### Знайдіть секцію "Про нас"
Файл: `index.html` → Пошук `.services-grid`

Кожна послуга це `service-card`. Змініть:
```html
<!-- ЗІ -->
<div class="service-card">
    <div class="service-icon">👁️</div>
    <h3>Офтальмологія</h3>
    <p>Лазерна хірургія катаракти...</p>
</div>

<!-- НА -->
<div class="service-card">
    <div class="service-icon">🦷</div>
    <h3>Стоматологія</h3>
    <p>Ваш опис послуги тут...</p>
</div>
```

**Популярні емодзі для іконок:**
- 👨‍⚕️ Лікар
- 🦷 Зуби/Стоматологія
- 🫀 Кардіологія
- 🧠 Неврологія
- 💪 Фізіотерапія
- 🩺 Загальна медицина
- 👶 Педіатрія
- 🚑 Швидка допомога

---

## 4️⃣ ДОДАТИ/ЗАМІНИТИ ЛІКАРІВ

### Структура врача
```html
<div class="doctor-card">
    <div class="doctor-photo">
        <img src="images/doctor-photo.webp" alt="Ім'я Лікаря">
    </div>
    <h3>Ім'я Патронім</h3>
    <p class="doctor-spec">Спеціальність, Категорія</p>
</div>
```

### Кроки:
1. Додайте нове фото в папку `images/` (наприклад `my-doctor.webp`)
2. Додайте новий div у секцію `doctors-grid`:
```html
<div class="doctor-card">
    <div class="doctor-photo">
        <img src="images/my-doctor.webp" alt="Василь Петрович">
    </div>
    <h3>Василь Петрович Сидоренко</h3>
    <p class="doctor-spec">Кардіолог, І категорія</p>
</div>
```

3. Оновіть сітку якщо більше/менше ніж 8 лікарів:
   - Файл: `styles/styles.css`
   - Знайдіть: `.doctors-grid`
   - Змініть: `grid-template-columns: repeat(4, 1fr);`
   - На наприклад: `repeat(3, 1fr)` для 3 лікарів в ряду

---

## 5️⃣ ДОДАТИ ФОТО У ГАЛЕРЕЮ

### Кроки:
1. Поміщайте фото в папку `images/`
2. Додайте рядок в галерею:
```html
<img src="images/your-photo.webp" alt="Опис фото">
```

**Рекомендації:**
- Розмір: макс 1200px ширина
- Формат: WebP (оптимальне) або PNG/JPG
- Якість: 80-85% (гарна якість, малий розмір)

---

## 6️⃣ ЗМІНИТИ КОЛЬОРОВУ ПАЛІТРУ

### Файл: `styles/styles.css`

Знайдіть на початку:
```css
:root {
    --primary: #09B9AA;      /* Бірюзовий - ЗМІНІТЬ ТУТ */
    --dark: #081726;         /* Темний - ЗМІНІТЬ ТУТ */
    --light-bg: #f9fafb;
    --white: #ffffff;
}
```

**Популярні кольори для медичних сайтів:**
- Блакитний: #0066CC, #003366
- Зелений: #00AA66, #007744
- Фіолетовий: #6600CC, #9933FF
- Рожевий: #FF0066, #DD0055

**Генератор палітр:** https://coolors.co

Змініть `--primary` та `--dark`, все інше оновиться автоматично.

---

## 7️⃣ ЗМІНИТИ ЧАС РОБОТИ

Файл: `index.html`

Знайдіть у header-info та footer:
```html
<!-- ЗІ -->
<p>Пн-Пт: 9:00 - 20:00</p>
<p>Сб: 9:00 - 17:00 | Нд: Вихідний</p>

<!-- НА -->
<p>Пн-Пт: 8:00 - 18:00</p>
<p>Сб: 10:00 - 14:00 | Нд: За записом</p>
```

---

## 8️⃣ ДОДАТИ СОЦІАЛЬНІ МЕРЕЖІ

Файл: `index.html` → Footer

```html
<div class="social-links">
    <a href="https://www.instagram.com/your-profile/" target="_blank">Instagram</a>
    <a href="https://www.facebook.com/your-profile/" target="_blank">Facebook</a>
    <a href="https://www.viber.com/your-profile/" target="_blank">Viber</a>
    <a href="https://www.youtube.com/your-channel/" target="_blank">YouTube</a>
</div>
```

---

## 9️⃣ ЗМІНИТИ СЛАЙДЕР (CAROUSEL)

Файл: `index.html` → Секція "Наші послуги"

Кожен слайд це `.carousel-item`:
```html
<div class="carousel-item">
    <img src="images/YOUR_PHOTO.webp" alt="Назва послуги">
    <h3>Назва послуги</h3>
    <p>Опис послуги</p>
</div>
```

Змініть фото, заголовки та описи.

**Кількість слайдів:** Не обмежено! Додавайте скільки хочете.

---

## 🔟 ДОДАТИ НОВУ СЕКЦІЮ

### Шаблон:
```html
<section id="new-section" class="new-section">
    <div class="container">
        <h2>Заголовок секції</h2>
        <p>Ваш контент тут</p>
    </div>
</section>
```

### Додайте CSS в `styles/styles.css`:
```css
.new-section {
    padding: 80px 20px;
    background: var(--light-bg);
}

.new-section h2 {
    text-align: center;
    font-size: 40px;
    margin-bottom: 50px;
    color: var(--dark);
}
```

### Додайте посилання у навігацію:
```html
<a href="#new-section">Нова секція</a>
```

---

## 1️⃣1️⃣ ЗМІНИТИ EMAIL ДЛЯ ФОРМ

Файл: `EMAIL_INTEGRATION.md`

Див. розділ про інтеграцію email - замініть адресу скрізь.

---

## 1️⃣2️⃣ ОПТИМІЗУВАТИ ФОТО

**Зменшити розмір:**
1. Перейдіть на https://tinypng.com
2. Завантажте фото
3. Завантажте стиснуте зображення
4. Замініть у папці `images/`

**Конвертувати в WebP:**
1. Перейдіть на https://cloudconvert.com
2. Завантажте JPG/PNG
3. Конвертуйте в WebP
4. Завантажте
5. Замініть у папці `images/`

---

## 1️⃣3️⃣ ДОДАТИ GOOGLE ANALYTICS

Файл: `index.html`

Додайте перед закривають `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'YOUR_GA_ID');
</script>
```

Замініть `YOUR_GA_ID` на ваш ID з Google Analytics.

---

## 1️⃣4️⃣ ЗМІНИТИ ШРИФТИ

Файл: `styles/styles.css`

Знайдіть:
```css
body {
    font-family: 'Arial', 'Helvetica', sans-serif;
}
```

Змініть на:
```css
body {
    font-family: 'Segoe UI', 'Tahoma', sans-serif;
}
```

**Гарні шрифти:**
- Segoe UI
- Roboto
- Open Sans
- Lato
- Poppins

---

## 1️⃣5️⃣ ДОДАТИ ВІДЕО

Якщо хочете додати відео (YouTube, Vimeo):

```html
<section class="video">
    <div class="container">
        <h2>Про нас</h2>
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
            <iframe 
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                src="https://www.youtube.com/embed/VIDEO_ID"
                frameborder="0"
                allowfullscreen>
            </iframe>
        </div>
    </div>
</section>
```

---

## ✅ ЧЕКЛИСТ ПІСЛЯ РЕДАГУВАННЯ

- [ ] Змінена назва клініки
- [ ] Оновлені контакти (телефон, email, адреса)
- [ ] Оновлений логотип
- [ ] Змінені послуги (якщо потрібно)
- [ ] Додані лікарі
- [ ] Оновлена галерея
- [ ] Змінена кольорова палітра (якщо потрібно)
- [ ] Оновлений час роботи
- [ ] Додані соціальні мережи
- [ ] Налаштована інтеграція email форм
- [ ] Розгорнуто на хостинг

---

**ГОТОВО! Ваш сайт готовий до роботи!** 🎉
