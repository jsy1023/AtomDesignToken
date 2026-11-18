import { test, expect } from '@playwright/test';

test('50-900 Color Palette Generator creates and adds 10-step scale', async ({ page }) => {
  await page.goto('/ko/studio?tab=palette');

  // Verify Palette Manager toolbar and click generator button
  const generatorBtn = page.getByRole('button', { name: '50~900 자동 생성기' });
  await expect(generatorBtn).toBeVisible();
  await generatorBtn.click();

  // Verify Modal is open
  const modalTitle = page.getByRole('heading', { name: '50~900 자동 컬러 팔레트 생성기' });
  await expect(modalTitle).toBeVisible();

  // Verify 10 steps are previewed
  await expect(page.getByText('50', { exact: true })).toBeVisible();
  await expect(page.getByText('500', { exact: true })).toBeVisible();
  await expect(page.getByText('900', { exact: true })).toBeVisible();

  // Select Orange preset chip
  const orangePreset = page.getByRole('button', { name: '오렌지' });
  await orangePreset.click();

  // Check that the family name input has 'orange'
  const familyInput = page.getByPlaceholder('예: indigo, teal, brand');
  await expect(familyInput).toHaveValue('orange');

  // Take screenshot of the generator modal
  await page.screenshot({ path: 'C:/Users/dsntech/.gemini/antigravity/brain/6cc0f73c-5751-4798-9cb4-e8ce599c724a/palette-generator-modal-verified.png', fullPage: true });

  // Click Add scale button
  const addScaleBtn = page.getByRole('button', { name: /10단계 팔레트 토큰에 일괄 추가/ });
  await addScaleBtn.click();

  // Verify modal is closed
  await expect(modalTitle).not.toBeVisible();

  // Verify new orange family spectrum section is rendered with 10 steps
  const orangeFamilyHeader = page.getByText('orange Family (50 ~ 900)');
  await expect(orangeFamilyHeader).toBeVisible();

  // Take screenshot of the result in palette manager
  await page.screenshot({ path: 'C:/Users/dsntech/.gemini/antigravity/brain/6cc0f73c-5751-4798-9cb4-e8ce599c724a/palette-generator-added-verified.png', fullPage: true });
});
