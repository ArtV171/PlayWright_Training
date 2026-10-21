import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('Add two products to the cart', async ({ page }) => {
  // Open the homepage
  const homePage = new HomePage(page);
  await homePage.goto();

  // Add two products
  await homePage.addItemToCart('Combination Pliers');
  await homePage.addItemToCart('Bolt Cutters');
  

  // Verify that the cart contains two items
  await expect(homePage.cartQuantity).toHaveText('2');
});

test('Remove one product from the cart', async ({ page }) => {
  // Open the homepage
  const homePage = new HomePage(page);
  await homePage.goto();

  // Add two products
  await homePage.addItemToCart('Combination Pliers');
  await homePage.addItemToCart('Pliers');

  // Verify that the cart contains two items
  await expect(homePage.cartQuantity).toHaveText('2');

  // Remove one product
  await homePage.removeItemFromCart('Pliers');

  // Verify that one item remains
  await expect(homePage.cartQuantity).toHaveText('1');
});