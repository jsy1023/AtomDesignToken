import { test, expect } from '@playwright/test';

test.describe('설계 원칙(/principles) 및 주요 페이지 EN/JA 다국어 실시간 전환 E2E 검증', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(45000);
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.localStorage.setItem('atom_locale', 'ko');
    });
  });

  test('1. KO -> EN 전환 시 원칙 페이지 H1, 카테고리 탭, 9대 원칙 카드 본문이 영어로 실시간 전환됨', async ({ page }) => {
    await page.goto('/principles', { waitUntil: 'domcontentloaded' });

    // 초기 한국어 H1 검증
    const h1 = page.locator('h1');
    await expect(h1).toHaveText(/디자인 시스템 설계 원칙/);
    await expect(page.getByRole('button', { name: '전체 원칙' })).toBeVisible();

    // 상단 EN 버튼 클릭
    const enBtn = page.getByRole('button', { name: 'EN' });
    await enBtn.click();

    // H1이 영어로 전환 확인
    await expect(h1).toHaveText(/Design System Principles/);

    // 카테고리 탭 전환 확인
    await expect(page.getByRole('button', { name: 'All Principles' })).toBeVisible();
    await expect(page.getByRole('button', { name: '🤖 AI Governance' })).toBeVisible();

    // 01번 원칙 카드 제목 및 DO/DONT 뱃지 영어 전환 확인
    await expect(page.getByRole('heading', { name: /Single Source of Truth/i })).toBeVisible();
    await expect(page.getByText('RECOMMENDED (DO)').first()).toBeVisible();
    await expect(page.getByText("ANTI-PATTERNS (DON'T)").first()).toBeVisible();
  });

  test('2. KO -> JA 전환 시 원칙 페이지 H1, 카테고리 탭, 원칙 카드 본문이 일본어로 실시간 전환됨', async ({ page }) => {
    await page.goto('/principles', { waitUntil: 'domcontentloaded' });

    // 상단 JA 버튼 클릭
    const jaBtn = page.getByRole('button', { name: 'JA' });
    await jaBtn.click();

    // H1이 일본어로 전환 확인
    const h1 = page.locator('h1');
    await expect(h1).toHaveText(/デザインシステム設計原則/);

    // 카테고리 탭 전환 확인
    await expect(page.getByRole('button', { name: '全原則' })).toBeVisible();
    await expect(page.getByRole('button', { name: '🤖 AI運用原則' })).toBeVisible();

    // 01번 원칙 카드 제목 및 DO/DONT 뱃지 일본어 전환 확인
    await expect(page.getByRole('heading', { name: /単一真実源/i })).toBeVisible();
    await expect(page.getByText('推奨指針 (DO)').first()).toBeVisible();
    await expect(page.getByText("アンチパターン (DON'T)").first()).toBeVisible();
  });
});
