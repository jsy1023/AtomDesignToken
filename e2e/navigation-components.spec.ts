import { test, expect } from '@playwright/test';

test.describe('네비게이션 신규 컴포넌트(Navbar, Sidebar) 및 스튜디오 변수 연동 E2E 검증', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(45000);
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
  });

  test('1. 글로벌 네비게이션(/components/navbar) 라이브 데모 및 스튜디오 변수 명세 검증', async ({ page }) => {
    await page.goto('/ko/components/navbar', { waitUntil: 'networkidle' });

    // 헤딩 확인
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/(Global Navigation|글로벌 네비게이션|Navbar)/i);

    // Navbar 컴포넌트 렌더링 확인
    const navbar = page.locator('.atom-navbar');
    await expect(navbar).toBeVisible();
    await expect(navbar.getByText('AtomSystem')).toBeVisible();

    // 플로팅 변형 전환 토글 확인
    const floatingBtn = page.getByRole('button', { name: /플로팅 필|Floating Pill/i });
    if (await floatingBtn.isVisible()) {
      await floatingBtn.click();
      await expect(page.locator('.atom-navbar--floating')).toBeVisible({ timeout: 5000 });
    }

    // 스튜디오 변수 명세 섹션 확인
    await expect(page.locator('#studio-variables')).toBeVisible();
    await expect(page.getByRole('link', { name: /스튜디오에서 변수 커스텀하기/i })).toBeVisible();
  });

  test('2. 사이드 네비게이션(/components/sidebar) 확장/접기 인터랙션 및 변형 검증', async ({ page }) => {
    await page.goto('/ko/components/sidebar', { waitUntil: 'networkidle' });

    // 헤딩 확인
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/(Side Navigation|사이드 네비게이션|Sidebar)/i);

    // Sidebar 렌더링 확인
    const sidebar = page.locator('.atom-sidebar');
    await expect(sidebar).toBeVisible();
    await expect(sidebar.getByText('Atom Console')).toBeVisible();

    // 메뉴 아이템 클릭 및 활성 상태 확인
    const itemBtn = sidebar.getByRole('button', { name: /컴포넌트 라이브러리/i });
    await expect(itemBtn).toBeVisible();
    await itemBtn.click();
    await expect(itemBtn).toHaveAttribute('aria-current', 'page');

    // 축소 토글 버튼 클릭 확인
    const collapseToggle = sidebar.getByRole('button', { name: /사이드바 축소|사이드바 펼치기/i });
    if (await collapseToggle.isVisible()) {
      await collapseToggle.click();
      await expect(sidebar).toHaveAttribute('data-collapsed', 'true');
      await collapseToggle.click();
      await expect(sidebar).toHaveAttribute('data-collapsed', 'false');
    }
  });

  test('3. 버튼 상세 페이지(/components/button) 스튜디오 디자인 변수 명세 검증', async ({ page }) => {
    await page.goto('/ko/components/button', { waitUntil: 'domcontentloaded' });

    // 스튜디오 변수 섹션 및 태그 검증
    await expect(page.locator('#studio-variables')).toBeVisible();
    await expect(page.getByText('.button--pill-cta')).toBeVisible();
    await expect(page.getByText('.button--destructive')).toBeVisible();
    await expect(page.getByText('.button--ghost')).toBeVisible();
  });
});

