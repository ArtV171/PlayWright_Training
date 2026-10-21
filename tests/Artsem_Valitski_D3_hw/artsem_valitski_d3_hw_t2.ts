import { test, expect } from '@playwright/test';

test('Filter catalog by hammers', async ({ page }) => {
  // Open the shop homepage
  await page.goto('https://practicesoftwaretesting.com/');

  // Locate the Hammer category checkbox
  const hammerCheckbox = page.getByRole('checkbox', { name: 'Hammer' });

  // Select the Hammer category
  await hammerCheckbox.check();

  // Verify that the checkbox is checked
  await expect(hammerCheckbox).toBeChecked();

  // Locate all product title elements
  const productTitles = page.locator('.card-title');

  // Verify that exactly seven products are displayed
  await expect(productTitles).toHaveCount(7);

  // Clear the Hammer category filter
  await hammerCheckbox.uncheck();

  // Verify that the checkbox is no longer checked
  await expect(hammerCheckbox).not.toBeChecked();
});