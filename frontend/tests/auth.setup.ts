import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByPlaceholder('Your e-mail address').fill('admin@example.com');
  await page.getByPlaceholder('Your password').fill('password');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForURL('http://localhost:3000/');
  await expect(page.getByTestId("users-header")).toBeVisible()

  await page.context().storageState({ path: authFile });
});