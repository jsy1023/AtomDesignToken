import { test, expect } from '@playwright/test';

test('Theme editor modal closes on Escape key', async ({ page }) => {
  await page.goto('/ko/studio?tab=themes');

  // Click edit button on the first theme card
  const editBtn = page.getByRole('button', { name: '토큰 수정' }).first();
  await editBtn.click();

  // Verify modal is open
  const modalHeader = page.getByText('테마 토큰 수정 & 저장');
  await expect(modalHeader).toBeVisible();

  // Press Escape key
  await page.keyboard.press('Escape');

  // Verify modal is closed
  await expect(modalHeader).not.toBeVisible();
});
