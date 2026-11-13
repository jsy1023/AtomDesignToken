import { test, expect } from '@playwright/test';

test.describe('Button Spacing Token Verification', () => {
  test('Button padding is controlled by CSS tokens --atom-btn-py and --atom-btn-px', async ({ page }) => {
    await page.goto('http://localhost:3000/components/button');
    await page.waitForLoadState('domcontentloaded');

    // 1. Check default button computed padding in the live preview
    const button = page.locator('.atom-btn-primary').first();
    await expect(button).toBeVisible();

    const initialPadding = await button.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        pt: Math.round(parseFloat(computed.paddingTop)),
        pb: Math.round(parseFloat(computed.paddingBottom)),
        pl: Math.round(parseFloat(computed.paddingLeft)),
        pr: Math.round(parseFloat(computed.paddingRight)),
      };
    });

    // Default spacing token values: py=8px, px=16px
    expect(initialPadding.pt).toBe(8);
    expect(initialPadding.pb).toBe(8);
    expect(initialPadding.pl).toBe(16);
    expect(initialPadding.pr).toBe(16);

    // 2. Change the CSS token dynamically in DOM and verify live update
    await page.evaluate(() => {
      document.documentElement.style.setProperty('--atom-btn-py', '20px');
      document.documentElement.style.setProperty('--atom-btn-px', '32px');
    });

    const updatedPadding = await button.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        pt: Math.round(parseFloat(computed.paddingTop)),
        pb: Math.round(parseFloat(computed.paddingBottom)),
        pl: Math.round(parseFloat(computed.paddingLeft)),
        pr: Math.round(parseFloat(computed.paddingRight)),
      };
    });

    expect(updatedPadding.pt).toBe(20);
    expect(updatedPadding.pb).toBe(20);
    expect(updatedPadding.pl).toBe(32);
    expect(updatedPadding.pr).toBe(32);
  });

  test('Button component token mapping includes vertical and horizontal spacing tokens', async ({ page }) => {
    await page.goto('http://localhost:3000/components/button');
    await page.waitForLoadState('domcontentloaded');

    // Click Tokens inspection tab
    const tokenTab = page.locator('button', { hasText: /디자인 토큰값 조회|デザイントークン|Inspect Tokens/i }).first();
    await tokenTab.click();
    await page.waitForTimeout(300);

    // Verify presence of --atom-btn-py and --atom-btn-px in the first table
    const tableText = await page.locator('table').first().innerText();
    expect(tableText).toContain('--atom-btn-py');
    expect(tableText).toContain('--atom-btn-px');
    expect(tableText).toContain('component.button.padding-y');
    expect(tableText).toContain('component.button.padding-x');
  });
});
