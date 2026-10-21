import { test, expect } from '@playwright/test';

test('Inspect Combination Pliers and add two items to cart', async ({ page }) => {
  // Open the shop homepage
  await page.goto('https://practicesoftwaretesting.com/');

  // Locate the Combination Pliers product
  const product = page.getByText('Combination Pliers', { exact: true }).first();

  // Open the product page
  await product.click();

  // Verify that the product heading is visible
  await expect(
    page.getByRole('heading', { name: 'Combination Pliers', level: 1 })
  ).toBeVisible();

  // Locate the quantity spin button
  const quantity = page.getByRole('spinbutton', { name: 'Quantity' });

  // Verify the initial quantity
  await expect(quantity).toHaveValue('1');

  // Increase the quantity once
  await page.getByRole('button', { name: 'Increase quantity' }).click();

  // Verify the updated quantity
  await expect(quantity).toHaveValue('2');

  // Add the selected quantity to the cart
  await page.getByRole('button', { name: 'Add to cart' }).click();

  // Verify the success alert
  await expect(page.getByRole('alert')).toContainText(
    'Product added to shopping cart'
  );

  // Verify that the cart link displays the quantity 2
  const cartLink = page.getByRole('link', { name: /cart/i });
  await expect(cartLink).toBeVisible();
  await expect(cartLink).toContainText('2');
});