import {test, expect, Locator} from '@playwright/test';


test('authenticated user should access events page', async ({ page }) => {
  await page.goto('/events');
  await expect(page).toHaveURL(/events/);
  await expect(page.getByTestId("events-header")).toBeVisible();
  await expect(page.getByTestId("create-event-button")).toBeHidden();
});


test('create event section', async ({ page }) => {
  const expandButton: Locator = page.getByTestId("expand-button");
  const createButton: Locator = page.getByTestId("create-event-button");
  const headerInput: Locator = page.getByTestId("header-input");

  await page.goto('/events');
  await expect(page).toHaveURL(/events/);

  await expect(createButton).toBeHidden();
  await expandButton.click();
  await expect(createButton).toBeVisible();
  await expect(createButton).toBeDisabled();

  await headerInput.fill("New event");
  await expect(createButton).toBeEnabled();
});