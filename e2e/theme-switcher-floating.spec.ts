import { test, expect } from '@playwright/test';

test.describe('플로팅 ThemeSwitcher E2E 검증', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
  });

  test('/ko/studio에서 플로팅 메뉴의 4개 탭과 실시간 테마 전환이 동작한다', async ({ page }) => {
    await page.goto('/ko/studio', { waitUntil: 'domcontentloaded' });

    const switcher = page.locator('[data-component="theme-switcher"][data-variable="floating"]');
    await expect(switcher).toBeVisible({ timeout: 15000 });

    // 플로팅 트리거 클릭
    const trigger = switcher.locator('> button').last();
    await trigger.click({ force: true });

    const panel = switcher.locator('[data-component="card"]');
    await expect(panel).toBeVisible();

    // 4개 탭(테마, 간격, 글씨, 아이콘) 노출 확인
    await expect(panel.getByRole('button', { name: '테마', exact: true })).toBeVisible();
    await expect(panel.getByRole('button', { name: '간격', exact: true })).toBeVisible();
    await expect(panel.getByRole('button', { name: '글씨', exact: true })).toBeVisible();
    await expect(panel.getByRole('button', { name: '아이콘', exact: true })).toBeVisible();

    // 오션 블루 선택 후 사이버 다크 테마 선택 시 data-atom-theme 속성 즉시 반영 확인
    await panel.getByRole('button', { name: /오션 블루/i }).click({ force: true });
    await expect(page.locator('html')).toHaveAttribute('data-atom-theme', 'ocean-blue');
    await panel.getByRole('button', { name: /사이버 다크/i }).click({ force: true });
    await expect(page.locator('html')).toHaveAttribute('data-atom-theme', 'dark-cyber');

    // 간격 / 글씨 / 아이콘 탭 전환 확인
    await panel.getByRole('button', { name: '간격', exact: true }).click({ force: true });
    await expect(panel.getByText(/모서리 곡률/i)).toBeVisible();

    await panel.getByRole('button', { name: '글씨', exact: true }).click({ force: true });
    await expect(panel.getByText(/폰트 패밀리/i)).toBeVisible();

    await panel.getByRole('button', { name: '아이콘', exact: true }).click({ force: true });
    await expect(panel.getByText(/아이콘 크기/i)).toBeVisible();
  });
});
