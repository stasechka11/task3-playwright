const { test, expect } = require("@playwright/test");
const { email, password, id } = require("../user");

test("Success login", async ({ page }) => {
  // Go to https://netology.ru/
  await page.goto("https://netology.ru/");

  // Click text=Войти
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://netology.ru/?modal=sign_in' }*/),
    page.click("text=Войти"),
  ]);

  // Fill [placeholder="Email"]
  await page.fill('[placeholder="Email"]', email);

  // Fill [placeholder="Пароль"]
  await page.fill('[placeholder="Пароль"]', password);

  // Click [data-testid="login-submit-btn"]
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://netology.ru/profile/8933209' }*/),
    page.click('[data-testid="login-submit-btn"]'),
  ]);

  await expect(page).toHaveURL(`https://netology.ru/profile/${id}`);

  await expect(page.getByRole('heading', { name: 'Моё обучение' })).toBeVisible({ timeout: 20000 });

});
