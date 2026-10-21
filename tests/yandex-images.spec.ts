import { test } from '@playwright/test';

test('Поиск попугаев на фотостоке Unsplash', async ({ page }) => {
  // 1. Открываем сайт с красивыми бесплатными фото напрямую
  await page.goto('https://unsplash.com');

  // 2. Находим поисковую строку по её атрибуту placeholder
  // На сайте написано "Search high-resolution images"
  const searchInput = page.getByPlaceholder('Search high-resolution images');
  
  // Кликаем и вводим «parrot» (попугай на английском, так как сайт англоязычный)
  await searchInput.click();
  await searchInput.fill('parrot');

  // 3. Нажимаем Enter на клавиатуре
  await searchInput.press('Enter');

  // 4. Ждем 5 секунд, чтобы страница успела загрузить сетку с попугаями
  await page.waitForTimeout(5000);
});