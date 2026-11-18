import { test, expect } from '@playwright/test';

test('DocsSidebar search input has correct padding and does not overlap with search icon', async ({ page }) => {
  await page.goto('/ko/components/button');

  const searchInput = page.getByPlaceholder(/컴포넌트 검색/);
  await expect(searchInput).toBeVisible();

  // Check padding-left computed style on the input
  const paddingLeft = await searchInput.evaluate((el) => window.getComputedStyle(el).paddingLeft);
  // It should be 36px (2.25rem)
  expect(parseFloat(paddingLeft)).toBeGreaterThanOrEqual(30);

  // Take screenshot of the sidebar and search input
  await page.screenshot({
    path: 'C:/Users/dsntech/.gemini/antigravity/brain/6cc0f73c-5751-4798-9cb4-e8ce599c724a/docs-sidebar-search-verified.png',
    fullPage: false,
  });
});
