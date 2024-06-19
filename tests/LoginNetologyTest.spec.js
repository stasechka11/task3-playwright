const { test, expect } = require("@playwright/test");
const {
  email,
  password,
  id,
  invalidEmail,
  invalidPassword,
} = require("../user");

test("Success login", async ({ page }) => {
  // Go to https://netology.ru/
  await page.goto("https://netology.ru/");

  await page.screenshot({
    path: "tests/screenshots/"  + Date.now() + "netologyMainPage.png",
    fullPage: true,
  });

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
  await page.getByTestId("login-submit-btn").click();

  await expect(page).toHaveURL(`https://netology.ru/profile/${id}`);

  await expect(page.getByRole("heading", { name: "Моё обучение" })).toBeVisible(
    { timeout: 20000 }
  );
});

test("Login with invalid credentials", async ({ page }) => {
  // Go to https://netology.ru/
  await page.goto("https://netology.ru/");

  // Click text=Войти
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://netology.ru/?modal=sign_in' }*/),
    page.click("text=Войти"),
  ]);

  await page.screenshot({
    path: "tests/screenshots/"  + Date.now() + "netologyLoginPage.png"
  });

  // Fill [placeholder="Email"]
  await page.fill('[placeholder="Email"]', invalidEmail);

  // Fill [placeholder="Пароль"]
  await page.fill('[placeholder="Пароль"]', invalidPassword);

  // Click [data-testid="login-submit-btn"]
  await page.getByTestId("login-submit-btn").click();

  await page.screenshot({
    path: "tests/screenshots/"  + Date.now() + "netologyFailedLogin.png"
  });

  await expect(page.getByTestId("login-error-hint")).toBeVisible();

  await expect(page.getByTestId("login-error-hint")).toContainText(
    "Вы ввели неправильно логин или пароль"
  );
});
