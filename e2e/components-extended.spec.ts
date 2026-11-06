import { test, expect } from '@playwright/test';

test.describe('신규 확장 컴포넌트(캘린더, 셀렉트, 아코디언 등) 갤러리 및 상세 페이지 검증', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(45000);
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
  });

  test('1. 컴포넌트 갤러리(/components)에서 캘린더, 셀렉트, 아코디언 카드 노출 확인', async ({ page }) => {
    await page.goto('/components', { waitUntil: 'domcontentloaded' });
    
    // 캘린더 헤딩 확인
    await expect(page.getByRole('heading', { name: /캘린더 & 날짜 선택기/i })).toBeVisible();
    
    // 셀렉트 헤딩 확인
    await expect(page.getByRole('heading', { name: /커스텀 셀렉트/i })).toBeVisible();
    
    // 아코디언 헤딩 확인
    await expect(page.getByRole('heading', { name: /아코디언/i })).toBeVisible();
  });

  test('2. 캘린더 상세 페이지(/components/calendar) 라우팅 및 렌더링 검증', async ({ page }) => {
    await page.goto('/components/calendar', { waitUntil: 'domcontentloaded' });
    
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/캘린더/i);
    await expect(page.getByText('W3C 접근성 준수 캘린더')).toBeVisible();
  });

  test('3. 셀렉트 상세 페이지(/components/select) 라우팅 및 렌더링 검증', async ({ page }) => {
    await page.goto('/components/select', { waitUntil: 'domcontentloaded' });
    
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/커스텀 셀렉트/i);
  });
});
