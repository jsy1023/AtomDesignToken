import { test, expect } from '@playwright/test';

test.describe('복잡한 엔터프라이즈 환경설정 폼 패턴 E2E 검증', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
  });

  test('/patterns에서 복잡한 엔터프라이즈 폼 유효성 검사 및 탭 전환이 동작한다', async ({ page }) => {
    await page.goto('/ko/patterns', { waitUntil: 'domcontentloaded' });

    const patternItem = page.getByRole('button', { name: /복잡한 엔터프라이즈 환경설정/i }).first();
    await expect(patternItem).toBeVisible();
    await patternItem.click();

    await expect(page.getByRole('heading', { name: /복잡한 엔터프라이즈 환경설정/i })).toBeVisible();
    await expect(page.getByText(/엔터프라이즈 프로젝트 환경설정/i)).toBeVisible();

    const domainInput = page.getByPlaceholder(/api\.yourcompany\.com/i);
    await expect(domainInput).toBeVisible();
    await domainInput.fill('invalid-domain');

    await expect(page.getByText(/유효한 도메인 주소/i)).toBeVisible();
    await expect(page.getByText(/수정된 변경사항이 있습니다/i)).toBeVisible();

    await domainInput.fill('api.my-acme-service.com');

    const webhooksTab = page.getByRole('button', { name: /웹훅 & 이벤트/i });
    await webhooksTab.click();
    await expect(page.locator('input[value*="https://api.acme.com"]')).toBeVisible();
  });
});
