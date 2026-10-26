import { test, expect } from '@playwright/test';

test.describe('UX 패턴 문서(Docs) 스타일 개편 E2E 인터랙션 검증', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    // 드로어가 열려있는 잔여 상태 방지를 위해 localStorage 초기화
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
  });

  test('깔끔한 2단 Docs 레이아웃, 사이드바 트리 탐색, 탭 전환 및 체크리스트 동작 검증', async ({ page }) => {
    // 1. /patterns 페이지 진입
    await page.goto('/patterns', { waitUntil: 'domcontentloaded' });

    // 2. 브레드크럼 및 아티클 헤더 확인
    const breadcrumb = page.locator('nav').filter({ hasText: /UX 패턴 가이드/i });
    await expect(breadcrumb).toBeVisible();

    // 3. 좌측 Docs 사이드바 확인 (검색창, 플랫폼 필터, 카테고리 트리)
    const searchInput = page.getByPlaceholder(/패턴 검색/i);
    await expect(searchInput).toBeVisible();

    const webPill = page.getByRole('button', { name: 'WEB', exact: true });
    await expect(webPill).toBeVisible();

    // 4. Docs 탭 3개 노출 확인
    const previewTab = page.getByRole('button', { name: /인터랙티브 데모/i });
    const guideTab = page.getByRole('button', { name: /구현 가이드 & 체크리스트/i });
    const specTab = page.getByRole('button', { name: /AI 마크다운 사양/i });

    await expect(previewTab).toBeVisible();
    await expect(guideTab).toBeVisible();
    await expect(specTab).toBeVisible();

    // 5. 기본 데모 탭에서 디바이스 목업 가이드 텍스트 확인
    const mockupInstruction = page.getByText(/실시간 반응형 뷰포트 전환/i);
    await expect(mockupInstruction).toBeVisible();

    // 6. [구현 가이드 & 체크리스트] 탭 클릭 및 체크박스 인터랙션 검증
    await guideTab.click();
    const checklistHeader = page.getByText(/필수 구현 체크리스트/i);
    await expect(checklistHeader).toBeVisible();

    const firstCheckbox = page.locator('input[type="checkbox"]').first();
    await expect(firstCheckbox).toBeVisible();
    const isCheckedBefore = await firstCheckbox.isChecked();
    await firstCheckbox.click();
    expect(await firstCheckbox.isChecked()).toBe(!isCheckedBefore);

    // 안티패턴 박스 확인
    const antiPatternHeader = page.getByText(/주의해야 할 안티패턴/i);
    await expect(antiPatternHeader).toBeVisible();

    // 7. [AI 마크다운 사양] 탭 클릭 및 복사 버튼 확인
    await specTab.click();
    const copyBtn = page.getByRole('button', { name: /전체 복사/i });
    await expect(copyBtn).toBeVisible();
    const codePre = page.locator('pre');
    await expect(codePre).toBeVisible();

    // 8. 사이드바에서 다른 패턴 클릭 시 URL 및 본문 변경 검증
    const patternButtons = page.locator('aside button').filter({ hasText: /WEB|APP/ });
    const secondButton = patternButtons.nth(1);
    const targetTitle = (await secondButton.locator('span').first().textContent())?.trim();

    await secondButton.click();

    // 본문 H1이 클릭한 패턴의 제목으로 갱신되었는지 검증
    if (targetTitle) {
      const heading = page.locator('h1');
      await expect(heading).toContainText(targetTitle);
    }

    // 9. 하단 '다음 패턴' 페이지네이션 클릭 검증
    const nextBtn = page.getByRole('button', { name: /다음 패턴/i });
    if (await nextBtn.isVisible()) {
      await nextBtn.scrollIntoViewIfNeeded();
      await nextBtn.click({ force: true });
      await expect(page.locator('h1')).toBeVisible();
    }
  });
});
