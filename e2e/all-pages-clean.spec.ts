import { test, expect } from '@playwright/test';

test.describe('전체 페이지 담백한 미니멀 디자인 및 렌더링 안정성 E2E 검증', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(45000);
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
  });

  test('1. 메인 랜딩 페이지(/) 담백한 히어로 및 핵심 네비게이션 렌더링', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(page.getByText('npx atomsystem init').first()).toBeVisible();
    await expect(page.getByRole('link', { name: /시작하기/i })).toBeVisible();
  });

  test('2. 디자인 토큰 페이지(/tokens) 정갈한 명세 렌더링', async ({ page }) => {
    await page.goto('/tokens', { waitUntil: 'domcontentloaded' });
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/디자인 토큰/i);
    await expect(page.getByRole('button', { name: /색상/i })).toBeVisible();
  });

  test('3. 컴포넌트 갤러리(/components) 카탈로그 렌더링', async ({ page }) => {
    await page.goto('/components', { waitUntil: 'domcontentloaded' });
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/컴포넌트 갤러리/i);
  });

  test('4. UX 패턴 문서(/patterns) Docs 트리 및 탭 렌더링', async ({ page }) => {
    await page.goto('/patterns', { waitUntil: 'domcontentloaded' });
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(page.getByRole('button', { name: /인터랙티브 데모/i })).toBeVisible();
  });

  test('5. 프롬프트 빌더 스튜디오(/studio) 위저드 렌더링', async ({ page }) => {
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/AI 프롬프트 빌더 스튜디오/i);
  });

  test('6. 라이브러리 가이드(/guide) 기술 문서 렌더링', async ({ page }) => {
    await page.goto('/guide', { waitUntil: 'domcontentloaded' });
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/라이브러리 활용 및 통합 가이드/i);
  });
});
