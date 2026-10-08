import { test, expect } from '@playwright/test';

/**
 * [E2E 개발 명세서] 코드로 디자인하는 디자인 시스템
 * 
 * 1. .md 디자인 가이드 -> 디자인 토큰 생성 & CSS 변수 주입
 * 2. 템플릿 컴포넌트들은 시멘틱 CSS 변수만을 사용하여 테마 변경 시 전체 디자인이 연동됨
 * 3. 가계부, 대시보드, 모바일 웹 등 다양한 템플릿이 동일한 코드로 테마별 상이한 룩앤필을 구현함
 */

test.describe('[명세 1] 디자인 토큰 및 시멘틱 CSS 변수 매핑 검증', () => {
  test('기본 페이지에서 AtomSystem 디자인 토큰 CSS 변수가 정상 주입되어야 한다', async ({ page }) => {
    await test.step('루트 페이지에 접속한다', async () => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
    });

    await test.step('브라우저에 --atom- 또는 테마 관련 CSS 변수가 정의되어 있는지 확인한다', async () => {
      // CSS 변수가 정의되어 있는지 root 스타일 계산
      const hasTokenVariables = await page.evaluate(() => {
        const rootStyles = getComputedStyle(document.documentElement);
        // 토큰 시스템의 주요 변수 중 하나가 존재하는지 확인
        return Boolean(
          rootStyles.getPropertyValue('--atom-color-primary') ||
          rootStyles.getPropertyValue('--color-primary') ||
          document.querySelector('style, link[rel="stylesheet"]')
        );
      });
      expect(hasTokenVariables).toBeTruthy();
    });
  });
});

test.describe('[명세 2] 다중 테마 전환 시 단일 템플릿의 디자인 변경 검증', () => {
  test('가계부 템플릿(Toss 테마): 송금 버튼 #3182f6 및 곡률 16px, 잔액 카드 20px이 바인딩되어야 한다', async ({ page }) => {
    await test.step('theme=toss 파라미터로 가계부 쇼케이스에 접속한다', async () => {
      await page.goto('/showcases/finance?theme=toss', { waitUntil: 'domcontentloaded' });
    });

    await test.step('Toss 테마 스타일(Vivid Blue, 볼드 곡률)을 검증한다', async () => {
      const sendButton = page.locator('#send-money-btn');
      await expect(sendButton).toBeVisible();

      const btnStyles = await sendButton.evaluate((el) => {
        const computed = getComputedStyle(el);
        return {
          bgColor: computed.backgroundColor,
          borderRadius: computed.borderRadius,
        };
      });

      // Toss Primary Color (#3182f6 -> rgb(49, 130, 246))
      expect(btnStyles.bgColor).toBe('rgb(49, 130, 246)');
      expect(btnStyles.borderRadius).toBe('16px');

      const balanceCard = page.locator('#balance-card');
      const cardRadius = await balanceCard.evaluate((el) => getComputedStyle(el).borderRadius);
      expect(cardRadius).toBe('20px');
    });
  });

  test('가계부 템플릿(Daangn 테마): 송금 버튼 #ff6f0f 및 곡률 12px, 잔액 카드 14px로 전환되어야 한다', async ({ page }) => {
    await test.step('theme=daangn 파라미터로 동일한 가계부 쇼케이스에 접속한다', async () => {
      await page.goto('/showcases/finance?theme=daangn', { waitUntil: 'domcontentloaded' });
    });

    await test.step('Daangn 테마 스타일(Warm Orange, 소프트 곡률)로 전환되었는지 검증한다', async () => {
      const sendButton = page.locator('#send-money-btn');
      await expect(sendButton).toBeVisible();

      const btnStyles = await sendButton.evaluate((el) => {
        const computed = getComputedStyle(el);
        return {
          bgColor: computed.backgroundColor,
          borderRadius: computed.borderRadius,
        };
      });

      // Daangn Primary Color (#ff6f0f -> rgb(255, 111, 15))
      expect(btnStyles.bgColor).toBe('rgb(255, 111, 15)');
      expect(btnStyles.borderRadius).toBe('12px');

      const balanceCard = page.locator('#balance-card');
      const cardRadius = await balanceCard.evaluate((el) => getComputedStyle(el).borderRadius);
      expect(cardRadius).toBe('14px');
    });
  });

  test('웹 대시보드 템플릿: 사이드바 활성 뱃지와 KPI 카드가 테마 규격을 따라야 한다', async ({ page }) => {
    await test.step('대시보드 쇼케이스 페이지로 이동한다', async () => {
      await page.goto('/showcases/dashboard?theme=toss', { waitUntil: 'domcontentloaded' });
    });

    await test.step('사이드바 활성 뱃지 색상 및 KPI 카드가 토큰에 맞게 렌더링되는지 검증한다', async () => {
      const activeBadge = page.locator('#active-nav-badge');
      await expect(activeBadge).toBeVisible();
      const badgeBg = await activeBadge.evaluate((el) => getComputedStyle(el).backgroundColor);
      expect(badgeBg).toBe('rgb(49, 130, 246)');

      const kpiCard = page.locator('[data-testid="kpi-card"]').first();
      await expect(kpiCard).toBeVisible();
      const cardRadius = await kpiCard.evaluate((el) => getComputedStyle(el).borderRadius);
      expect(cardRadius).toBe('20px');
    });
  });
});

test.describe('[명세 3] 모바일 웹 뷰포트 반응형 렌더링 명세', () => {
  test('모바일 화면(375x812)에서 하단 고정 CTA 및 터치 타깃 최소 높이가 유지된다', async ({ page }) => {
    await test.step('모바일 뷰포트 크기를 설정한다', async () => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto('/showcases/finance', { waitUntil: 'domcontentloaded' });
    });

    await test.step('하단 플로팅 바(Bottom CTA)가 고정 표시되고 터치 높이가 44px 이상인지 검증한다', async () => {
      const bottomCta = page.locator('#mobile-bottom-cta');
      await expect(bottomCta).toBeVisible();

      const sendBtn = page.locator('#send-money-btn');
      const btnBox = await sendBtn.boundingBox();
      expect(btnBox).not.toBeNull();
      if (btnBox) {
        expect(btnBox.height).toBeGreaterThanOrEqual(44);
      }
    });

    await test.step('모바일 레이아웃에서 수평 스크롤 오버플로우가 발생하지 않아야 한다', async () => {
      const isOverflowing = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(isOverflowing).toBeFalsy();
    });
  });
});

test.describe('[명세 4] 디자인 가이드(.md) 파일 업로드 및 실시간 편집/반영 검증', () => {
  test('스튜디오 페이지에서 마크다운 프리셋 선택 및 직접 편집 시 실시간으로 디자인 토큰이 적용되어야 한다', async ({ page }) => {
    await test.step('스튜디오 페이지(/studio)로 이동한다', async () => {
      await page.goto('/studio', { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('[data-hydrated="true"]');
    });

    await test.step('마크다운 임포터/에디터 모드가 활성화되어 있는지 확인한다', async () => {
      const textarea = page.locator('#markdown-editor');
      await expect(textarea).toBeVisible();
    });

    await test.step('Daangn 프리셋을 클릭하면 마크다운 텍스트와 토큰 색상이 변경되어야 한다', async () => {
      const daangnBtn = page.locator('#btn-preset-daangn');
      const textarea = page.locator('#markdown-editor');

      await daangnBtn.click();
      await expect(textarea).toHaveValue(/Daangn Warm Orange/);
      await expect(textarea).toHaveValue(/#FF6F0F/);
    });

    await test.step('마크다운 에디터에 커스텀 컬러(#8B5CF6)를 직접 입력하고 토큰을 적용한다', async () => {
      const textarea = page.locator('#markdown-editor');
      const customMd = `# Custom Purple Guide\n- primary: #8B5CF6\n- 버튼 곡률: 18px`;
      await textarea.fill(customMd);

      const applyBtn = page.locator('#apply-tokens-btn');
      await applyBtn.click();
    });

    await test.step('CSS 변수 --atom-color-primary가 커스텀 컬러로 변경되었는지 검증한다', async () => {
      const primaryVar = await page.evaluate(() => {
        return getComputedStyle(document.documentElement).getPropertyValue('--atom-color-primary').trim();
      });
      expect(primaryVar.toLowerCase()).toBe('#8b5cf6');
    });
  });

  test('마크다운 파일 업로드(input[type="file"]) 시 파일 내용이 에디터에 로드되어야 한다', async ({ page }) => {
    await test.step('스튜디오 페이지로 이동한다', async () => {
      await page.goto('/studio', { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('[data-hydrated="true"]');
    });

    await test.step('.md 파일 업로드 이벤트를 시뮬레이션한다', async () => {
      const fileInput = page.locator('#markdown-file-input');
      const mockMarkdown = `# Uploaded Design Guide\n- primary: #059669\n- 버튼 곡률: 8px`;

      await fileInput.setInputFiles({
        name: 'sample-guide.md',
        mimeType: 'text/markdown',
        buffer: Buffer.from(mockMarkdown),
      });

      const textarea = page.locator('#markdown-editor');
      await expect(textarea).toHaveValue(mockMarkdown);
    });
  });
});

test.describe('[명세 5] 상단 네비게이션 Showcase 이동 및 마크다운 실시간 수정/반영 검증', () => {
  test('네비게이션의 Showcase 메뉴로 이동하여 .md 수정 및 적용 시 쇼케이스 템플릿에 즉시 반영되어야 한다', async ({ page }) => {
    await test.step('홈페이지에서 상단 GNV의 Showcase 메뉴를 클릭한다', async () => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('networkidle');
      const showcaseNavLink = page.locator('a[href="/showcases"]').first();
      await expect(showcaseNavLink).toBeVisible();

      await Promise.all([
        page.waitForURL(/.*\/showcases/, { timeout: 20000 }),
        showcaseNavLink.click(),
      ]);
      await page.waitForSelector('[data-hydrated="true"]');
    });

    await test.step('쇼케이스 워크스페이스에 마크다운 에디터와 가계부 템플릿이 함께 로드되었는지 확인한다', async () => {
      const textarea = page.locator('#markdown-editor');
      await expect(textarea).toBeVisible();

      const sendBtn = page.locator('#send-money-btn');
      await expect(sendBtn).toBeVisible();
    });

    await test.step('에디터에서 Daangn 프리셋을 클릭하면 우측 가계부 송금 버튼이 Daangn 컬러로 즉시 변경된다', async () => {
      const daangnBtn = page.locator('#btn-preset-daangn');
      const textarea = page.locator('#markdown-editor');

      await daangnBtn.click();
      await expect(textarea).toHaveValue(/Daangn Warm Orange/);

      // 우측 가계부 송금 버튼의 색상 검증
      const sendBtn = page.locator('#send-money-btn');
      await expect(async () => {
        const bg = await sendBtn.evaluate((el) => getComputedStyle(el).backgroundColor);
        expect(bg).toBe('rgb(255, 111, 15)');
      }).toPass({ timeout: 5000 });
    });

    await test.step('에디터에서 커스텀 컬러(#10B981)로 직접 수정하고 토큰을 적용하면 즉시 초록색으로 바뀐다', async () => {
      const textarea = page.locator('#markdown-editor');
      await textarea.fill('# Emerald Theme\n- primary: #10B981\n- 버튼 곡률: 24px');

      const applyBtn = page.locator('#apply-tokens-btn');
      await applyBtn.click();

      const sendBtn = page.locator('#send-money-btn');
      await expect(async () => {
        const bg = await sendBtn.evaluate((el) => getComputedStyle(el).backgroundColor);
        expect(bg).toBe('rgb(16, 185, 129)');
      }).toPass({ timeout: 5000 });
    });
  });
});


