
import { test, expect } from '../fixtures';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { LoginPage } from '../pages/LoginPage';

test('Account page is open after login', async ({ loggedInPage }) => {
  // Verify that the account page is open
  await expect(loggedInPage).toHaveURL(/\/account/);
});


test.describe('catalog hooks', () => {
  // Store the suite start time
  let suiteStartTime: Date;

  test.beforeAll(() => {
    suiteStartTime = new Date();
    console.log('Catalog hooks suite started:', suiteStartTime);
  });

  test.beforeEach(async ({ page }) => {
    // Open the catalog homepage before each test
    // CHANGE THIS URL if the test site changes
    await page.goto('https://practicesoftwaretesting.com/');
  });

  test.afterEach(async ({ page }, testInfo) => {
    // Attach a screenshot only if the test failed
    if (testInfo.status === 'failed') {
      await testInfo.attach('failure-screenshot', {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png',
      });
    }
  });

  test.afterAll(() => {
    console.log('Catalog hooks suite finished.');
    console.log('Suite started at:', suiteStartTime);
  });

  test('Catalog page is loaded', async ({ page }) => {
    // Verify the homepage URL
    await expect(page).toHaveURL(
      'https://practicesoftwaretesting.com/'
    );

    // Verify that at least one product card is visible
    await expect(page.locator('.card').first()).toBeVisible();
  });
});


type LoginCase = {
  name: string;
  email: string;
  password: string;
  expectedResult: 'success' | 'failure';
};

// Read the CSV file from the project root
// CHANGE THIS PATH if you move the test-data folder
const csvPath = resolve(process.cwd(), 'test-data/login-cases.csv');
const csvContent = readFileSync(csvPath, 'utf-8');

// Split the CSV into lines and extract the column names
const [headerLine, ...dataLines] = csvContent
  .trim()
  .split(/\r?\n/);

const headers = headerLine.split(',');

// Convert each data row into an object
const loginCases: LoginCase[] = dataLines.map((line) => {
  const values = line.split(',');

  return {
    name: values[0],
    email: values[1],
    password: values[2],
    expectedResult: values[3] as LoginCase['expectedResult'],
  };
});

// Create one test for each CSV record
for (const loginCase of loginCases) {
  test(`Login: ${loginCase.name}`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Open the login page
    await loginPage.goto();

    // Submit the credentials from this CSV row
    await loginPage.login(loginCase.email, loginCase.password);

    if (loginCase.expectedResult === 'success') {
      // Successful login should open the account page
      await expect(page).toHaveURL(/\/account/);
    } else {
      // Failed login should display an error message
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(
        'Invalid email or password'
      );
    }
  });
}
