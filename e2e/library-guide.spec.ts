import { test, expect } from '@playwright/test';

test.describe('AtomSystem 라이브러리 활용 가이드 (/guide) E2E 테스트', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(90000);
  });

  test('가이드 페이지 정상 로드 및 핵심 히어로 섹션 검증', async ({ page, isMobile }) => {
    await page.goto('/guide', { waitUntil: 'domcontentloaded' });

    // 1. 헤더 브랜드 및 가이드 메뉴 확인 (데스크톱 전용)
    const header = page.locator('header');
    await expect(header.getByText('AtomDesignToken')).toBeVisible();
    if (!isMobile) {
      await expect(header.getByRole('link', { name: '사용 가이드' })).toBeVisible();
    }

    // 2. 메인 헤드라인 텍스트 확인
    const headline = page.locator('h1');
    await expect(headline).toContainText('수레바퀴를 다시 만들지 마세요');
    await expect(headline).toContainText('Atomsystem');

    // 3. CLI 명령어 복사 요소 렌더링 확인 (메인 컨텐츠 내부 타겟팅)
    await expect(page.locator('main').getByText('npm i atomsystem').first()).toBeVisible();
    await expect(page.locator('main').getByText('npx atomsystem init').first()).toBeVisible();
  });

  test('두 번째 섹션: AI 라이브러리 참조 원리(4단계 파이프라인) 노출 및 스텝 전환 검증', async ({ page }) => {
    await page.goto('/guide', { waitUntil: 'domcontentloaded' });

    // 1. 두 번째 섹션 헤딩 존재 확인
    await expect(page.getByText('AI Agent 동작 메커니즘')).toBeVisible();
    await expect(page.getByText('AI는 이 라이브러리를 어떻게 참조할까요?')).toBeVisible();

    // 2. 4단계 스텝 카드 노출 확인 (first 사용)
    await expect(page.getByText('디자인 가이드 마크다운 및 개발 규칙 주입').first()).toBeVisible();
    await expect(page.getByText('W3C DTCG 토큰 & 시멘틱 CSS 클래스 매핑').first()).toBeVisible();
    await expect(page.getByText('프레임워크 무관 고접근성 시멘틱 컴포넌트 생성').first()).toBeVisible();
    await expect(page.getByText('Playwright E2E 테스트 자동 작성 및 실행 검증').first()).toBeVisible();

    // 3. 2단계 스텝(토큰 매핑) 클릭 시 상세 분석 패널 전환 확인
    const step2Btn = page.getByRole('button', { name: /02/ });
    await step2Btn.scrollIntoViewIfNeeded();
    await step2Btn.click();

    // css/atom-ui.css 참조 파일 노출 확인 (exact match)
    await expect(page.getByText('css/atom-ui.css', { exact: true })).toBeVisible();
    await expect(page.getByText('.atom-btn-primary').first()).toBeVisible();
  });

  test('4대 핵심 원칙 카드 및 대조 정보 노출 검증', async ({ page }) => {
    await page.goto('/guide', { waitUntil: 'domcontentloaded' });

    // 4가지 핵심 원칙 헤딩 존재 확인
    await expect(page.getByText('라이브러리를 제대로 쓰는 4가지 황금률')).toBeVisible();
    await expect(page.getByText('바닥부터 다시 만들지 않기')).toBeVisible();
    await expect(page.getByText('프레임워크 종속 탈피')).toBeVisible();
    await expect(page.getByText('단일 진실 공급원')).toBeVisible();
    await expect(page.getByText('AI 에이전트와 페어링')).toBeVisible();
  });

  test('프레임워크별 탭 전환 및 코드 스니펫 변경 검증', async ({ page }) => {
    await page.goto('/guide', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1')).toBeVisible();

    // 기본 선택은 React / Next.js
    await expect(page.getByText('app/components/PaymentCard.tsx')).toBeVisible();

    // Vue 3 탭 클릭
    const vueTab = page.getByRole('button', { name: 'Vue 3 / Nuxt' });
    await vueTab.scrollIntoViewIfNeeded();
    await vueTab.click();
    await expect(page.getByText('src/components/UserProfile.vue')).toBeVisible();

    // Pure HTML 탭 클릭
    const htmlTab = page.getByRole('button', { name: 'Pure HTML & jQuery' });
    await htmlTab.click();
    await expect(page.getByText('index.html')).toBeVisible();

    // AI Agent 탭 클릭
    const aiTab = page.getByRole('button', { name: 'AI Agent 연동' });
    await aiTab.click();
    await expect(page.getByText('AGENT_PROMPT.md')).toBeVisible();
  });

  test('인터랙티브 플레이그라운드 버튼 및 폼 인터랙션 검증', async ({ page }) => {
    await page.goto('/guide', { waitUntil: 'domcontentloaded' });

    // Primary 버튼 인터랙션
    const primaryBtn = page.getByRole('button', { name: /Primary 버튼 클릭해보기/ });
    await primaryBtn.scrollIntoViewIfNeeded();
    await expect(primaryBtn).toBeVisible();
    await primaryBtn.click();

    // 성공 상태로 전환 확인
    await expect(page.getByRole('button', { name: /작동 성공!|처리 중/ })).toBeVisible();

    // 인풋 폼 타이핑 인터랙션
    const input = page.getByPlaceholder('예: Toss Payments 클론');
    await input.fill('NextGen Dashboard');
    await expect(page.getByText('NextGen Dashboard')).toBeVisible();
  });

  test('헤더 네비게이션을 통한 가이드 페이지 이동 검증', async ({ page, isMobile }) => {
    test.skip(isMobile, '모바일 환경에서는 헤더 네비게이션 메뉴가 숨겨집니다.');

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    // 하이드레이션 완료 대기
    await expect(page.locator('h1')).toBeVisible();

    const guideNav = page.locator('header nav').getByRole('link', { name: '사용 가이드' });
    await expect(guideNav).toBeVisible();
    await guideNav.click();

    await expect(page.locator('h1')).toContainText('수레바퀴를 다시 만들지 마세요');
  });
});
