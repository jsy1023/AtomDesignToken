import { test, expect } from '@playwright/test';

test.describe('메인 홈페이지(/) KO/EN/JA 다국어 실시간 전환 E2E 검증', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(45000);
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.localStorage.setItem('atom_locale', 'ko');
    });
  });

  test('1. 메인 홈페이지에서 JA(일본어) 전환 시 Hero 제목, 설명, 8대 기능 카드가 모두 일본어로 표시됨', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // 초기 한국어 확인
    const h1 = page.locator('h1');
    await expect(h1).toHaveText(/플랫폼에 독립적인/);
    await expect(page.getByText('시작하기')).toBeVisible();

    // 상단 JA 버튼 클릭
    await page.getByTestId('lang-btn-ja').click();

    // 1. Hero 섹션 일본어 전환 확인
    await expect(h1).toHaveText(/プラットフォーム非依存のデザイントークン/);
    await expect(page.getByText(/AtomDesignTokenはFigmaおよびMarkdown基盤/)).toBeVisible();
    await expect(page.getByText('はじめる')).toBeVisible();

    // 2. 8대 카드 일본어 제목 및 링크 확인
    await expect(page.getByText('設計原則 (Principles)')).toBeVisible();
    await expect(page.getByText('デザイントークン仕様 (Tokens)')).toBeVisible();
    await expect(page.getByText('モーション & トランジション (Motion)')).toBeVisible();
    await expect(page.getByText('コンポーネント仕様 (Components)')).toBeVisible();
    await expect(page.getByText('デザインブロック (Blocks)')).toBeVisible();
    await expect(page.getByText('UXパターン (Patterns)')).toBeVisible();
    await expect(page.getByText('依存関係マトリックス (Dependencies)')).toBeVisible();
    await expect(page.getByText('ライブラリ活用ガイド (Guide)')).toBeVisible();
  });

  test('2. 메인 홈페이지에서 EN(영어) 전환 시 Hero 제목, 설명, 8대 기능 카드가 모두 영어로 표시됨', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // 상단 EN 버튼 클릭
    await page.getByTestId('lang-btn-en').click();

    // 1. Hero 섹션 영어 전환 확인
    const h1 = page.locator('h1');
    await expect(h1).toHaveText(/Platform-Agnostic Design Tokens/);
    await expect(page.getByText(/AtomDesignToken manages Figma and Markdown-based/)).toBeVisible();
    await expect(page.getByText('Get Started')).toBeVisible();

    // 2. 8대 카드 영어 제목 확인
    await expect(page.getByText('Design Principles')).toBeVisible();
    await expect(page.getByText('Design Tokens Specification')).toBeVisible();
    await expect(page.getByText('Motion & Transitions')).toBeVisible();
    await expect(page.getByText('Components Guide & Specs')).toBeVisible();
    await expect(page.getByText('Design Content Blocks')).toBeVisible();
    await expect(page.getByText('UX Interaction Patterns')).toBeVisible();
    await expect(page.getByText('Dependency Matrix')).toBeVisible();
    await expect(page.getByText('Library Usage Guide')).toBeVisible();
  });
});
