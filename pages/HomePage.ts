import { expect, type Page, type Locator } from '@playwright/test';

// Describe actions and elements of the shop homepage
export class HomePage {
  // readonly properties store reusable page objects and locators
  readonly page: Page;
  readonly cartLink: Locator;
  readonly cartQuantity: Locator;
  readonly sortDropdown: Locator;
  readonly productLinks: Locator;
  readonly visiblePrices: Locator;

  // Receive the browser page and initialize the locators
  constructor(page: Page) {
    // this refers to the current HomePage object
    this.page = page;

    // Locate the cart link using its dedicated test attribute
    this.cartLink = page.locator('[data-test="nav-cart"]');

    // Locate the cart item count
    this.cartQuantity = this.page.locator('[data-test="cart-quantity"]');

    // Locate the product sorting dropdown
    this.sortDropdown = page.getByRole('combobox');

    // Locate product links and visible prices
    this.productLinks = page.locator('.card a');
    this.visiblePrices = page.locator('.card .price');
  }

  // async allows us to wait for browser actions with await
  async goto() {
    // Open the shop homepage
    await this.page.goto('https://practicesoftwaretesting.com/');
  }

  // Accept a product name and add that product to the cart
  async addItemToCart(productName: string) {
    // Open the selected product's page
    // Find the product card containing the requested product name
    // Find the product title by its dedicated test attribute
    const productTitle = this.page.locator('[data-test="product-name"]')
  .getByText(productName, { exact: true });

// Click the link that contains the product title
    await productTitle.locator('xpath=ancestor::a[contains(@class, "card")]').click();

    // Add one unit of the product to the cart
    await this.page.getByRole('button', { name: 'Add to cart' }).click();

    // Wait for the confirmation notification
    await this.page.getByRole('alert').waitFor({ state: 'visible' });


    // Return to the homepage to select another product
    await this.goto();

  }

  // Accept a product name and remove that product from the cart
  async removeItemFromCart(productName: string) {
    // Open the shopping cart
    await this.cartLink.click();

    // Locate the requested product in the cart
    // Locate the exact product row in the cart
    const productRow = this.page
  .locator('tr')
  .filter({
    has: this.page.getByText(productName, { exact: true })
  });

    // Remove the product from the cart
    await productRow.locator('a.btn-danger').click();
  }
}