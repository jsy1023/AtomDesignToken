import { test, expect } from '@playwright/test';

test.describe('AtomDesignToken 라이브러리 문서 & 쇼케이스 E2E 테스트', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(90000);
  });

  test('랜딩 페이지 정상 로드 및 MIB 오염 없는 순수 라이브러리 헤더 검증', async ({ page, isMobile }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // 1. 헤더 브랜드 확인
    const headerBrand = page.locator('header').getByText('AtomDesignToken');
    await expect(headerBrand).toBeVisible();

    // 2. 데스크톱 환경일 때 핵심 라이브러리 메뉴 확인
    if (!isMobile) {
      const headerNav = page.locator('header nav');
      await expect(headerNav.getByRole('link', { name: '디자인 토큰' })).toBeVisible();
      await expect(headerNav.getByRole('link', { name: 'UX 패턴', exact: true })).toBeVisible();
      await expect(headerNav.getByRole('link', { name: '컴포넌트 갤러리' })).toBeVisible();
    }

    // 3. MIB 메뉴가 라이브러리 헤더에 존재하지 않음을 확인 (독립 분리 검증)
    await expect(page.getByRole('link', { name: 'MIB 탐색기' })).toHaveCount(0);
  });

  test('디자인 토큰 카탈로그 (/tokens) 정상 렌더링 확인', async ({ page }) => {
    await page.goto('/tokens', { waitUntil: 'domcontentloaded' });

    // 토큰 카탈로그 첫 번째 제목 노출 확인
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('UX 패턴 쇼케이스 (/patterns) 정상 렌더링 확인', async ({ page }) => {
    await page.goto('/patterns', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('h1').first()).toBeVisible();
  });
});
