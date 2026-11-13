import { test, expect } from '@playwright/test';

test.describe('Components Layout & Sidebar Scroll Preservation', () => {
  test('persists sidebar scroll position when navigating between component pages', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Sidebar is hidden on mobile screens');

    // 1. Visit /components/button
    await page.goto('/components/button');
    await page.waitForLoadState('load');

    // 2. Locate the sidebar container
    const sidebar = page.locator('aside.overflow-y-auto').first();
    await expect(sidebar).toBeVisible();

    // 3. Scroll the sidebar down to 400px
    await sidebar.evaluate((el) => {
      el.scrollTop = 400;
    });

    const scrollBefore = await sidebar.evaluate((el) => el.scrollTop);
    expect(scrollBefore).toBeGreaterThanOrEqual(380);

    // 4. Click a component link
    const targetLink = sidebar.locator('a[href="/components/table"]').first();
    await expect(targetLink).toBeVisible();
    await targetLink.evaluate((el) => (el as HTMLElement).click());

    // 5. Verify URL has changed to /components/table
    await page.waitForURL('**/components/table');
    await page.waitForLoadState('load');

    // 6. Verify sidebar scroll position is preserved (NOT reset to 0)
    const scrollAfter = await sidebar.evaluate((el) => el.scrollTop);
    expect(scrollAfter).toBeGreaterThanOrEqual(380);
    expect(Math.abs(scrollAfter - scrollBefore)).toBeLessThan(20);

    // 7. Verify active state updated to table
    await expect(page.locator('h1').first()).toContainText(/Table|테이블/i);
  });
});
