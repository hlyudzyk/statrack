import { test, expect } from '@playwright/test';


test('authenticated user should access dashboard', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByTestId("dashboard-header")).toBeVisible();
  await expect(page.getByTestId("welcome-text")).toBeVisible();
});
