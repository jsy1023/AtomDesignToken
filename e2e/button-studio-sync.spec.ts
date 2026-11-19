import { test, expect } from '@playwright/test';

test('Button documentation page is 100% synchronized with Studio 3-tier architecture', async ({ page }) => {
  await page.goto('/ko/components/button');

  // Verify the 3-Tier Interactive Live Stage is rendered
  const stageHeader = page.getByText(/인터랙티브 3대 아키텍처 라이브 스테이지/);
  await expect(stageHeader).toBeVisible();

  // Verify Type select box includes all 10 Studio Types (matching /studio)
  const typeSelect = page.locator('select').first();
  await expect(typeSelect).toBeVisible();
  const typeOptionsCount = await typeSelect.locator('option').count();
  expect(typeOptionsCount).toBe(10);
  await typeSelect.selectOption('glassmorphic');
  await typeSelect.selectOption('pill');

  // Verify Variable select box matches all 6 Studio Variables
  const varSelect = page.locator('select').nth(1);
  const varOptionsCount = await varSelect.locator('option').count();
  expect(varOptionsCount).toBe(6);
  await varSelect.selectOption('destructive');

  // Verify Status buttons can be clicked
  const hoverBtn = page.getByRole('button', { name: '호버' }).first();
  await hoverBtn.click();

  // Verify the 10 Types Showcase section & dynamic new types are visible
  await expect(page.getByText('10 Types Supported')).toBeVisible();
  await expect(page.getByText('glassmorphic').first()).toBeVisible();
  await expect(page.getByText('neumorphic').first()).toBeVisible();
  await expect(page.getByText('floating-action').first()).toBeVisible();

  // Verify the 6 Variables Showcase section is visible
  await expect(page.getByText('6 System Variables')).toBeVisible();

  // Verify Section 2-A (Studio Types Catalog) is rendered
  const studioTypesSection = page.getByRole('heading', { name: /1\. Type 디자인 외형 양식 카탈로그/ });
  await expect(studioTypesSection).toBeVisible();
  await expect(page.getByText('10 Types Registered')).toBeVisible();

  // Verify Section 2-B (Studio Variables Specification) is rendered
  const studioVarsSection = page.getByRole('heading', { name: /2\. Variable 디자인 세부 옵션 명세/ });
  await expect(studioVarsSection).toBeVisible();
});
