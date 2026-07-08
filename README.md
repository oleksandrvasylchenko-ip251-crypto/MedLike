# MedLike

## Локальний запуск через HTTP сервер

```bash
cd /home/runner/work/MedLike/MedLike
python3 -m http.server 4173
```

Відкрити: `http://127.0.0.1:4173`

## Автотести сайту (Playwright)

```bash
cd /home/runner/work/MedLike/MedLike
npm install
npx playwright install --with-deps
npm test
```

Що покривають тести:
- smoke: завантаження сторінки, меню/скрол, кнопка «Записатися»;
- форма запису: порожні поля, некоректний телефон, коректна відправка та очищення;
- адаптивність на брейкпоінтах 480/768/1024/1280;
- кросбраузерно: Chromium, Firefox, WebKit.

## Lighthouse перевірка

Після запуску локального сервера:

```bash
cd /home/runner/work/MedLike/MedLike
npm run lighthouse
```

Звіт збережеться в `lighthouse-report.json`.
