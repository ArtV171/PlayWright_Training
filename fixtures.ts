
import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
// Import LoginPage from the pages folder in the project root
import { LoginPage } from './pages/LoginPage';

// Define the custom fixture type
type Fixtures = {
  loggedInPage: Page;
};

// Create a test with an authenticated page fixture
export const test = base.extend<Fixtures>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    // Open the login page and sign in
    await loginPage.goto();
    await loginPage.login(
      'customer3@practicesoftwaretesting.com',
      'pass123'
    );

    // Give the authenticated page to the test
    await use(page);

    // Place cleanup code here if needed
  },
});

export { expect };
