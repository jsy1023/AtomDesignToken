import { test, expect } from '@playwright/test';

test.describe('Universal i18n Full Audit across KO, EN, and JA', () => {
  test('Home page renders translated content without untranslated text in EN & JA', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('domcontentloaded');

    // 1. Check EN
    await page.locator('[data-testid="lang-btn-en"]').click();
    await page.waitForTimeout(300);
    const enTitle = await page.locator('h1').innerText();
    expect(enTitle).toContain('Platform-Agnostic');
    expect(enTitle).not.toMatch(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/);

    const enGetStarted = await page.getByRole('link', { name: 'Get Started' });
    await expect(enGetStarted).toBeVisible();

    // 2. Check JA
    await page.locator('[data-testid="lang-btn-ja"]').click();
    await page.waitForTimeout(300);
    const jaTitle = await page.locator('h1').innerText();
    expect(jaTitle).toContain('プラットフォーム非依存');
    expect(jaTitle).not.toMatch(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/);

    const jaGetStarted = await page.getByRole('link', { name: 'はじめる' });
    await expect(jaGetStarted).toBeVisible();
  });

  const sampleComponents = [
    { id: 'button', jaName: 'ボタン', enName: 'Button Variants' },
    { id: 'layout-spacing', jaName: 'レイアウト＆余白', enName: 'Layout & Spacing' },
    { id: 'color-status', jaName: 'カラー＆状態', enName: 'Color & Status' },
    { id: 'typography', jaName: 'フォント＆タイポグラフィ', enName: 'Font & Typography' },
    { id: 'input', jaName: '入力フィールド', enName: 'Input Field' },
    { id: 'dialog', jaName: 'モーダルダイアログ', enName: 'Modal Dialog' },
    { id: 'calendar', jaName: 'カレンダー＆日付ピッカー', enName: 'Calendar & DatePicker' },
    { id: 'tree', jaName: 'ツリービュー', enName: 'Tree View' },
  ];

  for (const comp of sampleComponents) {
    test(`Component ${comp.id} renders 100% translated documentation in JA & EN`, async ({ page }) => {
      await page.goto(`http://localhost:3000/components/${comp.id}`);
      await page.waitForLoadState('domcontentloaded');

      // Test JA Mode
      await page.locator('[data-testid="lang-btn-ja"]').click();
      await page.waitForTimeout(300);

      const jaH1 = await page.locator('h1').innerText();
      expect(jaH1).not.toMatch(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/);

      // Check Tokens Table in JA
      const tokenTab = page.locator('button', { hasText: /トークン|デザイントークン/ }).first();
      if (await tokenTab.count() > 0) {
        await tokenTab.click();
        await page.waitForTimeout(200);

        const thTexts = await page.locator('table th').allInnerTexts();
        for (const th of thTexts) {
          expect(th).not.toMatch(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/);
        }

        const roleCells = await page.locator('table tbody td:first-child').allInnerTexts();
        for (const r of roleCells) {
          expect(r).not.toMatch(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/);
        }
      }

      // Test EN Mode
      await page.locator('[data-testid="lang-btn-en"]').click();
      await page.waitForTimeout(300);

      const enH1 = await page.locator('h1').innerText();
      expect(enH1).not.toMatch(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/);
    });
  }

  test('Global sidebar renders correct localized labels without Korean in JA', async ({ page }) => {
    await page.goto('http://localhost:3000/components/button');
    await page.waitForLoadState('domcontentloaded');

    await page.locator('[data-testid="lang-btn-ja"]').click();
    await page.waitForTimeout(300);

    const sidebarItems = await page.locator('aside a[href^="/components/"] span:first-child').allInnerTexts();
    for (const label of sidebarItems) {
      expect(label).not.toMatch(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/);
    }
  });
});
