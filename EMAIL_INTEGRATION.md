# 📧 ІНТЕГРАЦІЯ EMAIL ФОРМ - МЕДЛАЙК

## Проблема
На даний момент форма запису на прийом просто показує повідомлення. Щоб отримувати реальні листи від пацієнтів, потрібно налаштувати обробку форм.

## Рішення 1: Formspree (НАЙПРОСТІШЕ) ⭐

### Кроки:
1. Перейдіть на https://formspree.io/
2. Реєструйтеся (безкоштовно)
3. Створіть новий форм, вкажіть свій email
4. Скопіюйте action URL, наприклад: `https://formspree.io/f/xyzabc123`
5. Відкрийте `index.html` та знайдіть форму booking-form
6. Змініть на:

```html
<form class="booking-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <div class="form-row">
        <input type="text" name="name" placeholder="Ім'я та Прізвище" required>
        <input type="tel" name="phone" placeholder="Телефон" required>
    </div>
    <div class="form-row">
        <select name="service" required>
            <option value="">Виберіть послугу</option>
            <option value="ophthalmology">Офтальмологія</option>
            <option value="surgery">Хірургія</option>
            <option value="aesthetic">Естетична медицина</option>
            <option value="vaccination">Вакцинація</option>
            <option value="consultation">Консультація</option>
        </select>
        <input type="text" name="wishes" placeholder="Побажання (необов'язково)">
    </div>
    <input type="hidden" name="_next" value="https://yourdomain.com/thanks.html">
    <button type="submit" class="cta-btn">Надіслати</button>
</form>
```

**Переваги:**
✅ Безкоштовно
✅ Без кодування
✅ Миттєво працює
✅ Листи приходять на email

---

## Рішення 2: EmailJS (БІЛЬШ ПОТУЖНЕ)

### Кроки:
1. Перейдіть на https://www.emailjs.com/
2. Реєструйтеся
3. Підключіть email сервіс (Gmail, Outlook і т.д.)
4. Скопіюйте Service ID, Template ID, Public Key
5. Додайте в `<head>` HTML:

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>
<script type="text/javascript">
    emailjs.init("YOUR_PUBLIC_KEY");
</script>
```

6. Замініть JavaScript:

```javascript
function handleBooking(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const service = form.querySelector('select').value;
    
    const templateParams = {
        to_email: 'medlayk.if@gmail.com',
        from_name: name,
        phone: phone,
        service: service,
        message: `Новий запис від ${name}\nТелефон: ${phone}\nПослуга: ${service}`
    };
    
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(() => {
            alert(`✅ Спасибо, ${name}! Лист відправлений.`);
            form.reset();
        })
        .catch(error => {
            alert('Помилка при відправці. Спробуйте ще раз.');
            console.error(error);
        });
}
```

**Переваги:**
✅ Більше контролю
✅ Профіль клієнта
✅ Аналітика
✅ Безпечно

---

## Рішення 3: Netlify Forms (НАЙКРАЩИЙ ДЛЯ NETLIFY)

Якщо розгортаєте на **Netlify**:

1. Додайте атрибут до форми:
```html
<form class="booking-form" name="booking" method="POST" netlify>
    <!-- форма тут -->
</form>
```

2. Netlify автоматично оброблятиме форми!

3. Листи будуть видні в панелі Netlify Admin

**Переваги:**
✅ Вбудовано в Netlify
✅ Без налаштування
✅ Захист від спаму

---

## Рішення 4: PHP Script (ДЛЯ ВЛАСНОГО СЕРВЕРУ)

Якщо маєте свій хостинг з PHP:

1. Створіть файл `send-email.php`:

```php
<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = sanitize_text_field($_POST['name']);
    $phone = sanitize_text_field($_POST['phone']);
    $service = sanitize_text_field($_POST['service']);
    $wishes = sanitize_text_field($_POST['wishes']);
    
    $to = 'medlayk.if@gmail.com';
    $subject = "Новий запис від $name";
    $message = "Ім'я: $name\nТелефон: $phone\nПослуга: $service\nПобажання: $wishes";
    $headers = "From: noreply@medlayk.center";
    
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}

function sanitize_text_field($text) {
    return htmlspecialchars(strip_tags($text));
}
?>
```

2. Змініть JavaScript:

```javascript
function handleBooking(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    fetch('send-email.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('✅ Лист відправлений!');
            event.target.reset();
        }
    })
    .catch(error => console.error('Error:', error));
}
```

---

## 🏆 РЕКОМЕНДАЦІЯ

Для швидкого старту: **Formspree** (бесплатно, 2 хв)
Для повного контролю: **EmailJS** (більше можливостей)
Якщо на Netlify: **Netlify Forms** (найпростіше)
Якщо свій сервер: **PHP Script**

---

## ✅ ПЕРЕВІРКА

Після налаштування:
1. Заповніть форму
2. Натисніть "Надіслати"
3. Перевірте email (включно спам-папку)
4. Лист повинен прийти!

---

## 📞 УСУНЕННЯ НЕПОЛАДОК

**Листи не приходять:**
- Перевірте адресу email
- Перевірте спам-папку
- Перевірте консоль браузера (F12) на помилки

**Formspree каже "403 Forbidden":**
- Перейдіть за посиланням підтвердження в email від Formspree
- Підтвердіть адресу

**EmailJS не працює:**
- Перевірте Service ID, Template ID, Public Key
- Перевірте консоль браузера
- Переконайтеся що сервіс email підключен

---

**Будь якої питання - звертайтеся до підтримки сервісів!**
