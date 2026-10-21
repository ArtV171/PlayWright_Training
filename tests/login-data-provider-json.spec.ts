
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { LoginPage } from '../pages/LoginPage';

// Read login test data from the JSON file
const loginData = JSON.parse(
  readFileSync(join(process.cwd(), 'test-data', 'login.json'), 'utf-8')
);

test('Login with valid credentials from JSON', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(loginData.email, loginData.password);

  // Verify that a successful login opens the account page
  await expect(page).toHaveURL(/account/);
});
