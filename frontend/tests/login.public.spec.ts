import {expect, test as base} from '@playwright/test';

const test = base.extend({
  storageState: undefined
});

test('unauthorized user gets redirected to login', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('/login');
  await expect(page.locator('h2')).toContainText('Log in to your account');
});
