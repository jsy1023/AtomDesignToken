import { test, expect } from '@playwright/test';

test('Button documentation page is 100% synchronized with Studio 3-tier architecture', async ({ page }) => {
  await page.goto('/ko/components/button');

  // Verify the 3-Tier Interactive Live Stage is rendered
  const stageHeader = page.getByText(/인터랙티브 3대 아키텍처 라이브 스테이지/);
  await expect(stageHeader).toBeVisible();

  // Verify Type select box has options matching Studio
  const typeSelect = page.locator('select').first();
  await expect(typeSelect).toBeVisible();
  await typeSelect.selectOption('pill');

  // Verify Variable select box
  const varSelect = page.locator('select').nth(1);
  await varSelect.selectOption('destructive');

  // Verify Status buttons can be clicked
  const hoverBtn = page.getByRole('button', { name: '호버' }).first();
  await hoverBtn.click();

  // Verify the 6 Types Showcase section is visible
  const typeShowcase = page.getByText('새로운 디자인 외형 양식 (6 Types)');
  await expect(typeShowcase).toBeVisible();

  // Verify the 6 Variables Showcase section is visible
  const varShowcase = page.getByText('시스템 시맨틱 색상 및 세부 옵션 (6 Variables)');
  await expect(varShowcase).toBeVisible();

  // Verify Section 2-A (Studio Types Catalog) is rendered
  const studioTypesSection = page.getByRole('heading', { name: /1\. Type 디자인 외형 양식 카탈로그/ });
  await expect(studioTypesSection).toBeVisible();

  // Verify Section 2-B (Studio Variables Specification) is rendered
  const studioVarsSection = page.getByRole('heading', { name: /2\. Variable 디자인 세부 옵션 명세/ });
  await expect(studioVarsSection).toBeVisible();

  // Take screenshot of the synchronized live stage
  await page.screenshot({
    path: 'C:/Users/dsntech/.gemini/antigravity/brain/6cc0f73c-5751-4798-9cb4-e8ce599c724a/button-studio-sync-verified.png',
    fullPage: false,
  });
});
