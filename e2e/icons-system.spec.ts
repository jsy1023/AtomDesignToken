import { test, expect } from '@playwright/test';

test.describe('시스템 아이콘(/icons) 페이지 및 테마 에디터 연동 E2E 검증', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(45000);
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.localStorage.setItem('atom_locale', 'ko');
    });
  });

  test('1. 아이콘 카탈로그 페이지(/icons) 렌더링 및 3,800+ 아이콘 검색/카테고리 필터링', async ({ page }) => {
    await page.goto('/icons', { waitUntil: 'domcontentloaded' });

    // H1 검증
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/시스템 아이콘/i);

    // 상단 메타 태그
    await expect(page.getByText(/3,875\+ Free Open-Source Icons/i)).toBeVisible();

    // 카테고리 탭 검증
    await expect(page.getByRole('button', { name: '화살표 & 내비게이션' })).toBeVisible();
    await expect(page.getByRole('button', { name: '코드 & 엔지니어링' })).toBeVisible();

    // 검색창 인터랙션: 'heart' 검색
    const searchInput = page.getByPlaceholder(/3,800\+ 아이콘 영문명 검색/i);
    await expect(searchInput).toBeVisible();
    await searchInput.fill('heart');

    // 검색 결과 그리드 내 Heart 관련 아이콘 노출 확인
    await expect(page.locator('span', { hasText: 'Heart' }).first()).toBeVisible();

    // 검색어 초기화
    await searchInput.fill('');
  });

  test('2. 아이콘 선택 시 상단 활성 아이콘 및 React Import 스니펫 실시간 연동', async ({ page }) => {
    await page.goto('/icons', { waitUntil: 'domcontentloaded' });

    // 'Search' 아이콘 찾아서 클릭
    const searchInput = page.getByPlaceholder(/3,800\+ 아이콘 영문명 검색/i);
    await searchInput.fill('Search');

    const searchIconCard = page.locator('.group').filter({ hasText: 'Search' }).first();
    await expect(searchIconCard).toBeVisible();
    await searchIconCard.click();

    // 상단 배너에 'Search'가 현재 선택된 아이콘으로 반영되었는지 확인
    const bannerTitle = page.locator('div.text-lg.font-bold.font-mono');
    await expect(bannerTitle).toHaveText('Search');

    // React Import 스니펫에 import { Search } from 'lucide-react' 확인
    await expect(page.getByText("import { Search } from 'lucide-react'")).toBeVisible();
  });

  test('3. 테마 에디터 드로어 열기 및 아이콘 탭 인터랙션 검증', async ({ page }) => {
    await page.goto('/icons', { waitUntil: 'domcontentloaded' });

    // '테마 에디터에서 선택' 버튼 클릭
    const openEditorBtn = page.getByRole('button', { name: '테마 에디터에서 선택' });
    await openEditorBtn.click();

    // 테마 에디터 드로어 노출 확인
    await expect(page.getByText('테마 커스터마이저')).toBeVisible();

    // 아이콘 탭 활성화 확인
    await expect(page.getByRole('button', { name: '아이콘' })).toBeVisible();
    await expect(page.getByText('시스템 활성 아이콘')).toBeVisible();
  });
});
