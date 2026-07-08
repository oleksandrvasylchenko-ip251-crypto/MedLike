const { test, expect } = require('@playwright/test');

test('smoke: page load, menu scroll, booking CTA', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/МЕДЛАЙК/i);

  await page.getByRole('link', { name: 'Послуги' }).click();
  await expect(page.locator('#about')).toBeInViewport();

  await page.locator('.nav .cta-btn').first().click();
  await expect(page.locator('#booking')).toBeInViewport();
});

test('booking form: empty submit keeps required fields invalid', async ({ page }) => {
  await page.goto('/');
  await page.locator('.nav .cta-btn').first().click();

  const submitButton = page.getByRole('button', { name: 'Надіслати' });
  await submitButton.click();

  const requiredInputs = page.locator('.booking-form input[required]');
  await expect(requiredInputs).toHaveCount(2);

  const invalidStates = await requiredInputs.evaluateAll((inputs) =>
    inputs.map((input) => input.matches(':invalid')),
  );
  expect(invalidStates).toEqual([true, true]);
});

test('booking form: invalid phone shows validation alert', async ({ page }) => {
  await page.goto('/');

  await page.locator('.booking-form input[placeholder="Ім\'я та Прізвище"]').fill('Тест Користувач');
  await page.locator('.booking-form input[type="tel"]').fill('12345');
  await page.locator('.booking-form select').selectOption('surgery');

  const dialogs = [];
  page.on('dialog', async (dialog) => {
    dialogs.push(dialog.message());
    await dialog.accept();
  });

  await page.getByRole('button', { name: 'Надіслати' }).click({ noWaitAfter: true });
  await expect.poll(() => dialogs.length).toBe(1);
  expect(dialogs[0]).toContain('коректний номер телефону');
});

test('booking form: valid submit shows success and resets form', async ({ page }) => {
  await page.goto('/');

  const nameInput = page.locator('.booking-form input[placeholder="Ім\'я та Прізвище"]');
  const phoneInput = page.locator('.booking-form input[type="tel"]');
  const serviceSelect = page.locator('.booking-form select');
  const wishesInput = page.locator('.booking-form .form-row').nth(1).locator('input[type="text"]');

  await nameInput.fill('Олена Коваль');
  await phoneInput.fill('0671234567');
  await serviceSelect.selectOption('consultation');
  await wishesInput.fill('Після 18:00');

  const dialogs = [];
  page.on('dialog', async (dialog) => {
    dialogs.push(dialog.message());
    await dialog.accept();
  });

  await page.getByRole('button', { name: 'Надіслати' }).click({ noWaitAfter: true });
  await expect.poll(() => dialogs.length).toBe(1);
  expect(dialogs[0]).toContain('Дякуємо, Олена Коваль');

  await expect(nameInput).toHaveValue('');
  await expect(phoneInput).toHaveValue('');
  await expect(serviceSelect).toHaveValue('');
  await expect(wishesInput).toHaveValue('');
});

for (const viewport of [
  { width: 480, height: 800, expectedSlides: 1, hamburgerVisible: true, label: 'mobile-480' },
  { width: 768, height: 1024, expectedSlides: 1, hamburgerVisible: true, label: 'tablet-768' },
  { width: 1024, height: 900, expectedSlides: 2, hamburgerVisible: false, label: 'desktop-1024' },
  { width: 1280, height: 900, expectedSlides: 3, hamburgerVisible: false, label: 'desktop-1280' },
]) {
  test(`responsive: ${viewport.label}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/');

    const hamburger = page.locator('.hamburger-menu');
    if (viewport.hamburgerVisible) {
      await expect(hamburger).toBeVisible();
    } else {
      await expect(hamburger).toHaveCount(0);
    }

    const visibleSlides = await page.locator('.carousel-item').evaluateAll((items) =>
      items.filter((item) => {
        const styles = window.getComputedStyle(item);
        return styles.display !== 'none' && styles.visibility !== 'hidden';
      }).length,
    );

    expect(visibleSlides).toBe(viewport.expectedSlides);
  });
}
