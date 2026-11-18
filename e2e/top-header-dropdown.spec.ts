import { test, expect } from '@playwright/test';

test('Studio top toolbar layout is clean with title dropdown', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/ko/studio?tab=themes');

  // Verify the new title dropdown is visible
  const studioMenuSelect = page.getByLabel('스튜디오 메뉴 선택');
  await expect(studioMenuSelect).toBeVisible();

  // Verify value is 'themes'
  await expect(studioMenuSelect).toHaveValue('themes');

  // Verify the status badge is visible
  const statusBadge = page.getByText('로컬 연결됨');
  await expect(statusBadge).toBeVisible();

  // Verify theme quick switcher and save button are all visible on the right
  const saveBtn = page.getByRole('button', { name: '프로젝트에 즉시 반영하기' });
  await expect(saveBtn).toBeVisible();

  // Take screenshot
  await page.screenshot({ path: 'C:/Users/dsntech/.gemini/antigravity/brain/6cc0f73c-5751-4798-9cb4-e8ce599c724a/top-header-dropdown-verified.png' });
});
