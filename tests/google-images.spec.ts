import { test, expect } from '@playwright/test';

test('Поиск картинок попугаев в Google', async ({ page }) => {
  // Увеличиваем время выполнения ЭТОГО теста до 2 минут
  test.setTimeout(120000);

  // 1. Открываем Google
  await page.goto('https://google.com');

  // [Дополнение]: Клик по плашке куки, если она есть
  const acceptCookiesBtn = page.locator('button:has-text("Принять все"), button:has-text("Accept all")');
  if (await acceptCookiesBtn.isVisible()) {
    await acceptCookiesBtn.click();
  }

  // 2. Находим поисковую строку
  const searchInput = page.locator('[name="q"]');
  await searchInput.click();
  
  // Имитируем человека: вводим буквы с задержкой в 150 миллисекунд
  await searchInput.pressSequentially('попугаи', { delay: 150 });

  // 3. Нажимаем Enter
  await searchInput.press('Enter');

  // 4. Кликаем на вкладку "Картинки"
  const imagesTab = page.locator('a:has-text("Картинки"), a:has-text("Images")');
  await imagesTab.first().click();

  // 5. Держим браузер открытым 5 секунд
  await page.waitForTimeout(5000);
});