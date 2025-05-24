import {test, expect, Locator} from '@playwright/test';


test('authenticated user should access account page', async ({ page }) => {
  const cookies = await page.context().cookies();
  const sessionCookie = cookies.find(c => c.name === 'session_userid');

  if (!sessionCookie) {
    throw new Error('Cookie "session_userid" not found - test cannot proceed');
  }

  const value = sessionCookie.value;
  await page.goto(`/account/${value}`);

  await expect(page).toHaveURL(new RegExp(`/account/${value}`));
  const actionLabel: Locator = page.getByTestId('allowed-action-label')
  await expect(actionLabel).toBeVisible()
  await expect(actionLabel).toContainText("Describe yourself")
});