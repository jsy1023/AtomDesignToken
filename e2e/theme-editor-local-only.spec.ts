import { test, expect } from '@playwright/test';

test.describe('테마 에디터 로컬 전용 렌더링(Local-Only) 보안 검증', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(45000);
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.localStorage.setItem('atom_locale', 'ko');
    });
  });

  test('1. 로컬 환경(localhost)에서는 우측 하단 테마 에디터 버튼이 정상 노출되고 클릭 시 열림', async ({ page }) => {
    await page.goto('/components/button', { waitUntil: 'domcontentloaded' });

    // 테마 에디터 플로팅 버튼 노출 확인
    const editorBtn = page.getByRole('button', { name: /테마 에디터/i });
    await expect(editorBtn).toBeVisible();

    // 버튼 클릭 시 드로어 열림 확인
    await editorBtn.click();
    await expect(page.getByText('테마 커스터마이저')).toBeVisible();

    // 닫기
    await page.keyboard.press('Escape');
    await expect(page.getByText('테마 커스터마이저')).not.toBeVisible();
  });

  test('2. 프로덕션 외부 도메인 환경에서는 테마 에디터 버튼 및 드로어가 원천 차단됨', async ({ page }) => {
    // 외부 도메인 시뮬레이션: hostname을 system.atomground.com으로 모킹
    await page.addInitScript(() => {
      Object.defineProperty(window.location, 'hostname', {
        writable: true,
        value: 'system.atomground.com',
      });
    });

    await page.goto('/components/button', { waitUntil: 'domcontentloaded' });

    // 테마 에디터 플로팅 버튼이 화면에 절대 노출되지 않음
    const editorBtn = page.getByRole('button', { name: /테마 에디터/i });
    await expect(editorBtn).not.toBeVisible();
  });

  test('3. 프로덕션 외부 도메인이라도 ?dev_editor=true 쿼리스트링 전달 시에는 관리자용으로 활성화됨', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window.location, 'hostname', {
        writable: true,
        value: 'system.atomground.com',
      });
    });

    await page.goto('/components/button?dev_editor=true', { waitUntil: 'domcontentloaded' });

    // ?dev_editor=true 쿼리가 있을 경우 정상 노출 확인
    const editorBtn = page.getByRole('button', { name: /테마 에디터/i });
    await expect(editorBtn).toBeVisible();
  });
});
