import { test, expect } from '@playwright/test';

test('Sort products by name A to Z', async ({ page }) => {
  // Open the shop homepage
  await page.goto('https://practicesoftwaretesting.com/');

  // Locate the Sort dropdown and select Name (A - Z)
  await page.getByRole('combobox').selectOption({ label: 'Name (A - Z)' });

  // Locate all product title elements
  const productTitles = page.locator('.card-title');

  // Verify that nine product titles are displayed
  await expect(productTitles).toHaveCount(9);

  // Verify that the first product title contains Adjustable Wrench
  await expect(productTitles.first()).toContainText('Adjustable Wrench');

  // Verify that the first product title has the card-title CSS class
  await expect(productTitles.first()).toHaveClass('card-title');
});