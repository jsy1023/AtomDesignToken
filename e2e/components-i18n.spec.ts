import { test, expect } from '@playwright/test';

test.describe('컴포넌트 상세 페이지(/components/button) 및 주요 페이지 전수 EN/JA 다국어 전환 E2E 검증', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(45000);
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.localStorage.setItem('atom_locale', 'ko');
    });
  });

  test('1. /components/button 페이지에서 JA(일본어) 전환 시 타이틀, 배지, 프리뷰 탭, 토큰 테이블, 사용 케이스가 모두 일본어로 표시됨', async ({ page }) => {
    await page.goto('/components/button', { waitUntil: 'domcontentloaded' });

    // 초기 KO 상태 확인
    const h1 = page.locator('h1');
    await expect(h1).toHaveText(/버튼/);

    // 상단 JA 버튼 클릭
    const jaBtn = page.getByRole('button', { name: 'JA' });
    await jaBtn.click();

    // 1. 헤더: 버튼 제목 및 설명 일본어 번역 확인
    await expect(h1).toHaveText(/ボタン/);
    await expect(page.getByText('W3Cデザイントークン8個連動 ↓')).toBeVisible();
    await expect(page.getByText('コンポーネントコードをコピー')).toBeVisible();

    // 2. 프리뷰 탭 및 버튼 프리뷰 일본어 확인
    await expect(page.getByRole('button', { name: /ライブビュー/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /デザイントークン/ })).toBeVisible();
    await expect(page.getByText('Primary (第1階層 主行動)')).toBeVisible();
    await expect(page.getByText('Secondary (第2階層 補助)')).toBeVisible();
    await expect(page.getByText('成功 (Success/Green)')).toBeVisible();
    await expect(page.getByText('危険 (Destructive/Red)')).toBeVisible();

    // 3. 토큰 테이블 헤더 및 내용 일본어 확인
    await expect(page.getByText('トークンの役割 (Role)')).toBeVisible();
    await expect(page.getByText('デフォルト値と機能マッピング')).toBeVisible();
    await expect(page.getByText('Primary背景色 (Brand CTA)')).toBeVisible();
    await expect(page.getByText('🛠️ テーマエディタで編集 (/studio)')).toBeVisible();

    // 4. 실무 사용 케이스 일본어 확인
    await expect(page.getByRole('heading', { name: /実務での主な活用ユースケース/ })).toBeVisible();
    await expect(page.getByText(/画面の最も重要な単一コンバージョン行動/)).toBeVisible();

    // 5. Do's & Don'ts 라벨 확인
    await expect(page.getByText('推奨 (DO)').first()).toBeVisible();
    await expect(page.getByText("非推奨 (DON'T)").first()).toBeVisible();
  });

  test('2. /components/button 페이지에서 EN(영어) 전환 시 타이틀, 배지, 프리뷰 탭, 토큰 테이블, 사용 케이스가 모두 영어로 표시됨', async ({ page }) => {
    await page.goto('/components/button', { waitUntil: 'domcontentloaded' });

    // 상단 EN 버튼 클릭
    const enBtn = page.getByRole('button', { name: 'EN' });
    await enBtn.click();

    // 1. 헤더: 버튼 제목 및 배지 영어 확인
    const h1 = page.locator('h1');
    await expect(h1).toHaveText(/Button/);
    await expect(page.getByText(/Bound to 8 W3C Design Tokens/)).toBeVisible();
    await expect(page.getByText('Copy Component Code')).toBeVisible();

    // 2. 프리뷰 탭 및 버튼 프리뷰 영어 확인
    await expect(page.getByRole('button', { name: /Live View/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Inspect Design Tokens/ })).toBeVisible();
    await expect(page.getByText('Primary (Tier 1 Action)')).toBeVisible();
    await expect(page.getByText('Secondary (Tier 2 Action)')).toBeVisible();
    await expect(page.getByText('Success (Green)')).toBeVisible();
    await expect(page.getByText('Destructive (Red)')).toBeVisible();

    // 3. 토큰 테이블 헤더 및 내용 영어 확인
    await expect(page.getByText('Token Role')).toBeVisible();
    await expect(page.getByText('Default Value & Role Mapping')).toBeVisible();
    await expect(page.getByText('Primary Background (Brand CTA)')).toBeVisible();
    await expect(page.getByText(/Edit in Theme Editor/)).toBeVisible();

    // 4. 실무 사용 케이스 영어 확인
    await expect(page.getByRole('heading', { name: /Production Use Cases/ })).toBeVisible();
    await expect(page.getByText(/Core single conversion action on page/)).toBeVisible();

    // 5. Do's & Don'ts 라벨 확인
    await expect(page.getByText('RECOMMENDED (DO)').first()).toBeVisible();
    await expect(page.getByText("ANTI-PATTERNS (DON'T)").first()).toBeVisible();
  });
});
