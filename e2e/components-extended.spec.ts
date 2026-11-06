import { test, expect } from '@playwright/test';

test.describe('신규 확장 컴포넌트(라디오, 캘린더, 아바타 등 24종) 갤러리 및 상세 페이지 검증', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(45000);
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
  });

  test('1. 컴포넌트 갤러리(/components)에서 라디오, 슬라이더, 아바타, 캘린더 카드 노출 확인', async ({ page }) => {
    await page.goto('/components', { waitUntil: 'domcontentloaded' });
    
    // 라디오 그룹 헤딩 확인
    await expect(page.getByRole('heading', { name: /라디오 그룹/i })).toBeVisible();
    
    // 슬라이더 헤딩 확인
    await expect(page.getByRole('heading', { name: /슬라이더/i })).toBeVisible();
    
    // 아바타 헤딩 확인
    await expect(page.getByRole('heading', { name: /아바타/i })).toBeVisible();

    // 캘린더 헤딩 확인
    await expect(page.getByRole('heading', { name: /캘린더 & 날짜 선택기/i })).toBeVisible();
  });

  test('2. 라디오 상세 페이지(/components/radio) 라우팅 및 렌더링 검증', async ({ page }) => {
    await page.goto('/components/radio', { waitUntil: 'domcontentloaded' });
    
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/라디오 그룹/i);
    await expect(page.getByText('신용카드, 카카오페이, 토스페이, 무통장입금')).toBeVisible();
  });

  test('3. 아바타 상세 페이지(/components/avatar) 라우팅 및 렌더링 검증', async ({ page }) => {
    await page.goto('/components/avatar', { waitUntil: 'domcontentloaded' });
    
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/아바타/i);
  });
});
