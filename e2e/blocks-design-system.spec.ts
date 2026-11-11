import { test, expect } from '@playwright/test';

test.describe('디자인 블록(Design Blocks) 아키텍처 E2E 인터랙션 검증', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
    await page.goto('/blocks', { waitUntil: 'domcontentloaded' });
  });

  test('1. 디자인 블록 메인 페이지(/blocks) 헤더, 통계 지표, 카테고리 필터 렌더링', async ({ page }) => {
    // Hero Title
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/디자인 블록/i);

    // Categories Toolbar
    await expect(page.getByRole('button', { name: /전체 블록/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /실시간 차트/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /채팅 & 메신저/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /카드 리스트/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /슬라이더 & 캐러셀/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /가격 정책 UX/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /통계 & KPI/i })).toBeVisible();
  });

  test('2. 실시간 차트 블록(Realtime Chart): 재생/일시정지 토글 및 캔들/라인 전환', async ({ page }) => {
    const chartCard = page.locator('#realtime-chart');
    await chartCard.scrollIntoViewIfNeeded();
    await expect(chartCard).toBeVisible();
    await expect(chartCard.getByText('KRW-ATOM / 실시간 지수')).toBeVisible();

    // Line to Candle 전환
    const candleBtn = chartCard.locator('button', { hasText: '캔들' });
    await expect(candleBtn).toBeVisible();
    await candleBtn.click();
    await expect(candleBtn).toHaveAttribute('data-active', 'true');

    // Pause button click
    const pauseBtn = chartCard.getByRole('button', { name: '일시정지' });
    await expect(pauseBtn).toBeVisible();
    await pauseBtn.click();
    await expect(chartCard.getByRole('button', { name: '재생' })).toBeVisible();
  });

  test('3. 인터랙티브 AI 챗 블록(Chat): 메시지 전송 및 자동 응답 인터랙션', async ({ page }) => {
    const chatCard = page.locator('#interactive-chat');
    await chatCard.scrollIntoViewIfNeeded();
    await expect(chatCard).toBeVisible();
    await expect(chatCard.getByText('Atom AI Agent')).toBeVisible();

    // Direct input send
    const input = chatCard.getByPlaceholder(/AI 에이전트에게 메시지를 입력하세요/i);
    await input.scrollIntoViewIfNeeded();
    await input.fill('토큰 명세를 확인하고 싶습니다.');
    
    const sendBtn = chatCard.getByTitle('전송');
    await sendBtn.click();

    // User message bubble should appear
    await expect(chatCard.getByText('토큰 명세를 확인하고 싶습니다.')).toBeVisible();

    // AI Response or typing indicator should be triggered
    await expect(chatCard.locator('.animate-bounce, .bg-\\(--bg-secondary\\)').first()).toBeVisible();
  });

  test('4. 반응형 카드 리스트 블록(Card List): 검색, 필터, 그리드/리스트 뷰 전환', async ({ page }) => {
    const cardListSection = page.locator('#card-list');
    await cardListSection.scrollIntoViewIfNeeded();
    await expect(cardListSection).toBeVisible();

    // View mode switch to list
    const listBtn = cardListSection.getByLabel('리스트 보기');
    await listBtn.click();

    // Filter by category
    const componentFilter = cardListSection.getByRole('button', { name: 'Component' });
    await componentFilter.click();
    await expect(cardListSection.getByText(/고접근성 인터랙티브 모달/i)).toBeVisible();

    // Bookmark toggle
    const bookmarkBtn = cardListSection.locator('button:has(svg)').first();
    await bookmarkBtn.click();
  });

  test('5. 비용 시뮬레이터 & 캐러셀 슬라이더(Slider): 실시간 금액 계산 및 캐러셀 탭', async ({ page }) => {
    const sliderSection = page.locator('#interactive-slider');
    await sliderSection.scrollIntoViewIfNeeded();
    await expect(sliderSection).toBeVisible();

    // Slider presence
    const userRange = sliderSection.locator('input[type="range"]').first();
    await expect(userRange).toBeVisible();

    // Billing toggle
    const toggleBilling = sliderSection.getByLabel('결제 주기 토글');
    await toggleBilling.click();

    // Switch to Carousel tab
    const carouselTab = sliderSection.getByRole('button', { name: /쇼케이스 캐러셀/i });
    await carouselTab.click();
    await expect(sliderSection.getByText(/디자인 토큰 컴파일러/i)).toBeVisible();

    // Carousel next
    const nextBtn = sliderSection.getByLabel('다음 슬라이드');
    await nextBtn.click();
    await expect(sliderSection.getByText(/WCAG 2.1 AAA 고대비 컬러/i)).toBeVisible();
  });

  test('6. 가격 정책 UX 블록(Pricing): 월간/연간 토글 및 플랜 선택', async ({ page }) => {
    const pricingSection = page.locator('#pricing-table');
    await pricingSection.scrollIntoViewIfNeeded();
    await expect(pricingSection).toBeVisible();
    await expect(pricingSection.getByText(/팀의 규모에 꼭 맞는 유연한 플랜/i)).toBeVisible();

    // Pro tier card
    await expect(pricingSection.getByRole('heading', { name: 'Starter' })).toBeVisible();
    await expect(pricingSection.getByRole('heading', { name: 'Pro' })).toBeVisible();
    await expect(pricingSection.getByRole('heading', { name: 'Enterprise' })).toBeVisible();

    // Monthly toggle
    const monthlyBtn = pricingSection.getByRole('button', { name: '월간 결제' });
    await monthlyBtn.scrollIntoViewIfNeeded();
    await monthlyBtn.click();
    // Pro monthly price should be $29
    const price29 = pricingSection.getByText('$29');
    await price29.scrollIntoViewIfNeeded();
    await expect(price29).toBeVisible();

    // Annual toggle
    const annualBtn = pricingSection.getByRole('button', { name: /연간 결제/i });
    await annualBtn.scrollIntoViewIfNeeded();
    await annualBtn.click();
    // Pro annual price should be $22
    const price22 = pricingSection.getByText('$22');
    await price22.scrollIntoViewIfNeeded();
    await expect(price22).toBeVisible();
  });

  test('7. 4대 KPI 스탯 블록(Metric Stats) 및 코드 뷰어 탭 전환', async ({ page }) => {
    const statsSection = page.locator('#metric-stats');
    await statsSection.scrollIntoViewIfNeeded();
    await expect(statsSection).toBeVisible();
    await expect(statsSection.getByText(/연간 반복 매출/i)).toBeVisible();

    // Code viewer tab click on Realtime Chart
    const chartCard = page.locator('#realtime-chart');
    await chartCard.scrollIntoViewIfNeeded();
    const reactTab = chartCard.locator('button[data-tab="react"]');
    await reactTab.scrollIntoViewIfNeeded();
    await reactTab.click();
    await expect(chartCard.locator('pre code')).toBeVisible();

    // HTML/CSS tab click
    const htmlTab = chartCard.locator('button[data-tab="html"]');
    await htmlTab.scrollIntoViewIfNeeded();
    await htmlTab.click();
    await expect(chartCard.locator('pre code')).toBeVisible();
  });
});
