import { test, expect } from '@playwright/test';

test('Search products by name', async ({ page }) => {
  // Open the shop homepage
  await page.goto('https://practicesoftwaretesting.com/');

  // Locate the search textbox
  const searchBox = page.getByRole('textbox', { name: 'Search' });

  // Double-click the field and enter the search query
  await searchBox.dblclick();
  await searchBox.fill('Pliers');

  // Verify the search field value
  await expect(searchBox).toHaveValue('Pliers');

  // Click the Search button
  await page.getByRole('button', { name: 'Search' }).click();

  // Locate all product title elements
  const productTitles = page.locator('.card-title');

  // Verify that exactly four product titles are found
  await expect(productTitles).toHaveCount(4);
});