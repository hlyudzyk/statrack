import { test, expect } from '@playwright/test';

test('Register new user', async ({ page }) => {
  await page.goto('/');

  const addUserButton = page.getByTestId('add-user-button');
  await expect(addUserButton).toBeVisible();
  await addUserButton.click();

  const modalHeader = page.getByTestId('modal-header');
  await expect(modalHeader).toBeVisible();
  await expect(modalHeader).toContainText('Register user');

  await page.getByTestId('input-firstname').fill('John');
  await page.getByTestId('input-lastname').fill('Doe');
  await page.getByTestId('input-email').fill('john.doe@example.com');

  const roleSelect = page.getByTestId('select-role');
  await roleSelect.click();
  await page.getByRole('option', { name: 'Teacher' }).click();

  const birthday = page.getByTestId('datepicker-birthday');
  await birthday.click();
  await page.keyboard.type('2000-01-01');

  await page.getByTestId('submit-user-button').click();
  await expect(modalHeader).toBeHidden();


});
