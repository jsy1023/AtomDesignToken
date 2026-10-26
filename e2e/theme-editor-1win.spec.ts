import { test, expect } from '@playwright/test';

test.describe('1win Analysis 테마 적용 및 카드 다크 스타일 검증 E2E', () => {
  test.beforeEach(async () => {
    test.setTimeout(60000);
  });

  test('1win Analysis 테마 적용 시 html 다크 모드 활성화 및 카드 다크 서피스 색상 반영', async ({ page }) => {
    await page.goto('/tokens', { waitUntil: 'domcontentloaded' });

    // 1. 테마 플로팅 버튼 클릭하여 에디터 드로어 열기
    const floatingBtn = page.getByRole('button', { name: /스타일 에디터 열기/i });
    await expect(floatingBtn).toBeVisible();
    await floatingBtn.click();

    // 2. DESIGN.md 탭 선택
    const designMdTab = page.getByRole('button', { name: /DESIGN\.md/i });
    await expect(designMdTab).toBeVisible();
    await designMdTab.click();

    // 3. 1win 검색
    const searchInput = page.getByPlaceholder(/브랜드 검색/i);
    await searchInput.fill('1win');

    // 4. 1win Analysis 테마 카드 찾기 및 스타일 적용하기 버튼 클릭
    const applyBtn = page.getByRole('button', { name: /스타일 적용하기/i }).first();
    await expect(applyBtn).toBeVisible();
    await applyBtn.click();

    // 5. 적용 중 상태로 변경되었는지 확인
    await expect(page.getByRole('button', { name: /적용 중/i }).first()).toBeVisible();

    // 6. html 태그에 dark 클래스가 자동으로 추가되었는지 확인
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
    await expect(html).toHaveAttribute('data-theme', 'dark');

    // 7. 미리보기 탭으로 이동하여 카드가 흰색(#ffffff)이 아닌 다크 서피스(#2e3035)로 렌더링되는지 확인
    const previewTab = page.getByRole('button', { name: /미리보기/i });
    await previewTab.click();

    // 통합 컴포넌트 렌더링 카드 확인
    const cardTitle = page.getByText('즉시 송금 보안 인증 컴포넌트');
    await expect(cardTitle).toBeVisible();

    // 카드의 배경색이 흰색(rgb(255, 255, 255) / #f8f9fa)이 아닌 #2e3035 (rgb(46, 48, 53))인지 확인
    const cardContainer = page.locator('div.border.shadow-xs.space-y-4').first();
    const cardBgColor = await cardContainer.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(cardBgColor).toBe('rgb(46, 48, 53)');

    // 8. 에디터 드로어 닫기
    const closeBtn = page.getByRole('button', { name: '닫기', exact: true });
    await closeBtn.click();

    // 9. /tokens 페이지의 카테고리 탭 메뉴(색상, 타이포그래피, 곡률 등) 확인
    const tokensTabContainer = page.locator('div.inline-flex.p-1\\.5.rounded-2xl').first();
    await expect(tokensTabContainer).toBeVisible();
    const tabContainerBg = await tokensTabContainer.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    
    // 탭 메뉴 컨테이너가 흰색이 아닌 #2e3035 (rgb(46, 48, 53))인지 검증
    expect(tabContainerBg).toBe('rgb(46, 48, 53)');

    // 활성 탭 버튼(색상)의 배경이 1win canvas(#141415 = rgb(20, 20, 21))이고 흰색이 아님을 검증
    const activeColorTab = page.getByRole('button', { name: /색상 \(Colors\)/i });
    const activeTabBg = await activeColorTab.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(activeTabBg).toBe('rgb(20, 20, 21)');
  });
});
