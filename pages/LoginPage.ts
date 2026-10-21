import { type Page, type Locator } from '@playwright/test';

// Describe the elements and actions of the login page
export class LoginPage {
  // readonly prevents these properties from being reassigned
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  // The constructor receives the browser page and initializes the locators
  constructor(page: Page) {
    // this refers to the current LoginPage object
    this.page = page;

    // Store reusable locators for the login form
    this.emailInput = page.getByLabel('Email address');
    // Locate the password field using its unique data-test attribute
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.getByRole('button', { name: 'Login' });

    // Locate an accessible alert that may display a login error
    // Locate the login error message using its test attribute
    this.errorMessage = page.locator('[data-test="login-error"]');
  }

  // async allows this method to use await for asynchronous actions
  async goto() {
    // Open the login page
    await this.page.goto(
      'https://practicesoftwaretesting.com/auth/login'
    );
  }

  // Accept the email and password as string arguments
  async login(email: string, password: string) {
    // Fill in the credentials and submit the form
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}