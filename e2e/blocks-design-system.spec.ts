import { test, expect } from '@playwright/test';

test.describe('디자인 블록(Design Blocks) 아키텍처 E2E 인터랙션 검증', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(45000);
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.localStorage.setItem('atom_locale', 'ko');
    });
  });

  test('1. 디자인 블록 메인 페이지(/blocks) 카탈로그 허브 및 검색/필터링', async ({ page }) => {
    await page.goto('/blocks', { waitUntil: 'networkidle' });

    // Hero Title
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/디자인 블록/i);

    // Categories Toolbar
    await expect(page.getByRole('button', { name: '전체 블록' })).toBeVisible();
    await expect(page.getByRole('button', { name: '실시간 차트' })).toBeVisible();
    await expect(page.getByRole('button', { name: '채팅 & 메신저' })).toBeVisible();

    // 카탈로그 블록 카드 렌더링 확인
    await expect(page.getByRole('heading', { name: '실시간 시계열 메트릭 & 틱 차트' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '인터랙티브 AI 챗 & 메신저 피드' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '반응형 필터 카드 그리드 & 리스트' })).toBeVisible();

    // 검색창 인터랙션 테스트: 고유 ID로 검색
    const searchInput = page.getByPlaceholder(/블록 명칭, 키워드, ID로 검색/i);
    await expect(searchInput).toBeVisible();
    await searchInput.fill('interactive-chat');
    await expect(page.getByRole('heading', { name: '인터랙티브 AI 챗 & 메신저 피드' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '실시간 시계열 메트릭 & 틱 차트' })).not.toBeVisible();

    // 검색어 초기화
    await searchInput.fill('');
    await expect(page.getByRole('heading', { name: '실시간 시계열 메트릭 & 틱 차트' })).toBeVisible();
  });

  test('2. 실시간 차트 블록 상세 페이지(/blocks/realtime-chart): 레고 구조 & 차트 인터랙션', async ({ page }) => {
    await page.goto('/blocks/realtime-chart', { waitUntil: 'networkidle' });

    // H1 검증
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/실시간 시계열/i);

    // 레고 조립 구조 패널(Token -> Component -> Block -> Template) 확인
    await expect(page.getByRole('heading', { name: /레고 조립 구조/i })).toBeVisible();
    await expect(page.getByText('주입된 토큰 (Tokens)')).toBeVisible();
    await expect(page.getByText('조합된 컴포넌트 (Components)')).toBeVisible();
    await expect(page.getByText('결합 템플릿 (Template)')).toBeVisible();

    // 실시간 차트 내부 인터랙션 검증 (정확한 텍스트 매칭)
    await expect(page.getByText('KRW-ATOM', { exact: true })).toBeVisible();

    // 라인 to 캔들 차트 모드 전환
    const candleBtn = page.getByRole('button', { name: 'Candle' });
    await expect(candleBtn).toBeVisible();
    await candleBtn.click();

    // 일시정지 토글 (Pause stream -> Resume stream)
    const pauseBtn = page.getByRole('button', { name: 'Pause stream' });
    await expect(pauseBtn).toBeVisible();
    await pauseBtn.click();
    await expect(page.getByRole('button', { name: 'Resume stream' })).toBeVisible();

    // 뷰포트 리사이저 테스트 (Tablet, Mobile, Desktop)
    const tabletBtn = page.getByRole('button', { name: 'Tablet 768px' });
    await tabletBtn.click();
    const mobileBtn = page.getByRole('button', { name: 'Mobile 390px' });
    await mobileBtn.click();
    const desktopBtn = page.getByRole('button', { name: 'Desktop 100%' });
    await desktopBtn.click();

    // 코드 탭 전환 테스트
    const htmlTab = page.getByRole('button', { name: 'HTML & CSS' });
    await htmlTab.click();
    await expect(page.locator('pre code')).toBeVisible();

    const reactTab = page.getByRole('button', { name: 'React / Next.js' });
    await reactTab.click();
    await expect(page.locator('pre code')).toBeVisible();
  });

  test('3. AI 챗 블록 상세 페이지(/blocks/interactive-chat): 메시지 전송 인터랙션', async ({ page }) => {
    await page.goto('/blocks/interactive-chat', { waitUntil: 'networkidle' });

    // H1 검증
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/AI 챗/i);

    // Chat block input & send
    const input = page.getByPlaceholder(/디자인 시스템이나 토큰 규칙에 관해 질문하세요/i);
    await input.scrollIntoViewIfNeeded();
    await input.fill('토큰 디자인 시스템 테스트');

    // 전송 버튼 클릭
    const sendBtn = page.getByRole('button', { name: '전송' });
    await sendBtn.click();

    // 보낸 메시지 버블 확인
    await expect(page.getByText('토큰 디자인 시스템 테스트')).toBeVisible();

    // 빠른 질문 칩 클릭
    const suggestionChip = page.getByRole('button', { name: '디자인 토큰 어떻게 설정하나요?' });
    await suggestionChip.click();

    // 버블 영역 내에 해당 질문 메시지 확인
    const userBubbles = page.locator('.atom-chat-bubble, div').filter({ hasText: '디자인 토큰 어떻게 설정하나요?' });
    await expect(userBubbles.first()).toBeVisible();
  });

  test('4. 가격 정책 블록 상세 페이지(/blocks/pricing-table): 결제 주기 토글', async ({ page }) => {
    await page.goto('/blocks/pricing-table', { waitUntil: 'networkidle' });

    // H1 검증
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/플랜 비교 & 가격 정책/i);

    // 기본 연간 요금(₩22,000 /월) 노출 및 하이드레이션 완료 대기
    const annualPrice = page.getByText(/22,000/).first();
    await expect(annualPrice).toBeVisible();

    // 월간 결제로 전환
    const monthlyBtn = page.getByRole('button', { name: '월간 결제' }).first();
    await monthlyBtn.scrollIntoViewIfNeeded();
    await monthlyBtn.click();

    // 월간 요금(₩29,000) 동적 갱신 확인
    await expect(page.getByText(/29,000/).first()).toBeVisible();
  });
});
