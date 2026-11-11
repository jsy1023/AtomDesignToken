import { test, expect } from '@playwright/test';

test.describe('신규 확장 컴포넌트(라디오, 캘린더, 아바타 등 24종) 갤러리 및 상세 페이지 검증', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(45000);
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
  });

  test('1. 컴포넌트 갤러리(/components)에서 코어 컴포넌트 및 사이드바 내비게이션 노출 확인', async ({ page }) => {
    await page.goto('/components', { waitUntil: 'domcontentloaded' });
    
    // 갤러리 메인 헤딩 확인
    await expect(page.getByRole('heading', { name: /컴포넌트 갤러리/i })).toBeVisible();

    // 갤러리 코어 컴포넌트 카드 헤딩 확인
    await expect(page.getByRole('heading', { name: /버튼/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /인풋 필드/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /모달 다이얼로그/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /데이터 테이블/i })).toBeVisible();

    // 사이드바에서 확장 컴포넌트 링크(라디오, 슬라이더, 아바타, 캘린더) 노출 확인
    await expect(page.getByRole('link', { name: /라디오 그룹/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /슬라이더/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /아바타/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /캘린더/i })).toBeVisible();
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

  test('4. 트리 뷰(/components/tree) 갤러리 카드 노출 및 상세 페이지 인터랙션 검증', async ({ page }) => {
    // 트리 상세 페이지 이동
    await page.goto('/components/tree', { waitUntil: 'domcontentloaded' });
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/트리 뷰/i);

    // 인터랙티브 트리 뷰 렌더링 확인 (EXPLORER 영역)
    const explorerHeader = page.getByText('EXPLORER');
    await explorerHeader.scrollIntoViewIfNeeded();
    await expect(explorerHeader).toBeVisible();

    // 초기 렌더링 상태 확인 (React 하이드레이션 완료 대기)
    const currentSelected = page.locator('strong.text-blue-500');
    await expect(currentSelected).toHaveText('Button.tsx');

    // 노드 선택 인터랙션 검증 (마우스 클릭 또는 키보드 엔터 지원)
    const packageItem = page.locator('.atom-tree-node').filter({ hasText: 'package.json' });
    await packageItem.scrollIntoViewIfNeeded();
    await packageItem.click();

    // 선택 결과 텍스트 확인
    await expect(currentSelected).toHaveText('package.json');
  });
});
