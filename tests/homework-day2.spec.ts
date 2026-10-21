import { test, expect } from '@playwright/test';

test('Task 1: Search products by name', async ({ page }) => {
  // Open the shop homepage
  await page.goto('https://practicesoftwaretesting.com/');

  // Locate the search textbox
  const searchBox = page.getByRole('textbox', { name: 'Search' });

  // Enter the search query and verify its value
  await searchBox.dblclick();
  await searchBox.fill('Pliers');
  await expect(searchBox).toHaveValue('Pliers');

  // Execute the search
  await page.getByRole('button', { name: 'Search' }).click();

  // Locate product titles and verify their count
  const productTitles = page.locator('.card-title');
  await expect(productTitles).toHaveCount(4);
});

test('Task 2: Filter catalog by hammers', async ({ page }) => {
  // Open the shop homepage
  await page.goto('https://practicesoftwaretesting.com/');

  // Locate and select the Hammer category
  const hammerCheckbox = page.getByRole('checkbox', { name: 'Hammer' });
  await hammerCheckbox.check();

  // Verify that the category is selected
  await expect(hammerCheckbox).toBeChecked();

  // Verify the number of displayed products
  const productTitles = page.locator('.card-title');
  await expect(productTitles).toHaveCount(7);

  // Clear the category filter and verify its state
  await hammerCheckbox.uncheck();
  await expect(hammerCheckbox).not.toBeChecked();
});

test('Task 3: Sort products by name A to Z', async ({ page }) => {
  // Open the shop homepage
  await page.goto('https://practicesoftwaretesting.com/');

  // Select alphabetical sorting
  await page.getByRole('combobox').selectOption({ label: 'Name (A - Z)' });

  // Locate product titles and verify their count
  const productTitles = page.locator('.card-title');
  await expect(productTitles).toHaveCount(9);

  // Verify the first product title
  await expect(productTitles.first()).toContainText('Adjustable Wrench');

  // Verify the CSS class of the first product title
  await expect(productTitles.first()).toHaveClass('card-title');
});

test('Task 4: Inspect Combination Pliers and add two items to cart', async ({ page }) => {
  // Open the shop homepage
  await page.goto('https://practicesoftwaretesting.com/');

  // Locate and open Combination Pliers
  const product = page.getByText('Combination Pliers', { exact: true }).first();
  await product.click();

  // Verify the product heading
  await expect(
    page.getByRole('heading', { name: 'Combination Pliers', level: 1 })
  ).toBeVisible();

  // Locate the quantity field and verify its initial value
  const quantity = page.getByRole('spinbutton', { name: 'Quantity' });
  await expect(quantity).toHaveValue('1');

  // Increase the quantity and verify the new value
  await page.getByRole('button', { name: 'Increase quantity' }).click();
  await expect(quantity).toHaveValue('2');

  // Add the products to the cart
  await page.getByRole('button', { name: 'Add to cart' }).click();

  // Verify the success notification
  await expect(page.getByRole('alert')).toContainText(
    'Product added to shopping cart'
  );

  // Verify the cart link and its displayed quantity
  const cartLink = page.getByRole('link', { name: /cart/i });
  await expect(cartLink).toBeVisible();
  await expect(cartLink).toContainText('2');
});