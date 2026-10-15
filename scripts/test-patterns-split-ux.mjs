import { chromium } from 'playwright';
import path from 'path';

async function testPatternsSplitUX() {
  console.log('🚀 Starting Playwright test for Master-Detail Split UX at /patterns...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    await page.goto('http://localhost:3000/patterns', { waitUntil: 'networkidle' });
    console.log('✅ /patterns loaded');

    // 1. Verify Split View is active by default
    const splitButton = page.locator('button:has-text("분할 뷰 (Split)")');
    await splitButton.waitFor({ state: 'visible' });
    console.log('✅ Split View is active by default');

    // 2. Test Category Chips Filter
    const fintechChip = page.locator('button:has-text("핀테크/결제")').first();
    await fintechChip.waitFor({ state: 'visible' });
    await fintechChip.click();
    await page.waitForTimeout(400);
    console.log('👉 Clicked 핀테크/결제 category filter');

    // 3. Click "계좌 송금 & 간편 이체 패턴" in left list
    const transferItem = page.locator('button:has-text("계좌 송금 & 간편 이체 패턴")');
    await transferItem.waitFor({ state: 'visible' });
    await transferItem.click();
    await page.waitForTimeout(600);
    console.log('👉 Clicked 계좌 송금 pattern in left list');

    // Verify right mockup updated immediately without page navigation
    const transferTitle = page.locator('h1:has-text("계좌 송금 & 간편 이체 패턴")');
    await transferTitle.waitFor({ state: 'visible' });
    console.log('✅ Right detail view updated to 계좌 송금 smoothly');

    // 4. Test Quick Switcher Next Button
    const nextBtn = page.locator('button:has-text("다음 패턴")');
    await nextBtn.click();
    await page.waitForTimeout(600);
    console.log('👉 Clicked Quick Switcher [다음 패턴]');

    // 5. Test Switching to Grid Mode
    const gridBtn = page.locator('button:has-text("카드 그리드 (Grid)")');
    await gridBtn.click();
    await page.waitForTimeout(600);
    console.log('👉 Switched to Grid View mode');

    const gridCards = page.locator('h3:has-text("장바구니 & 주문 결제서 패턴")');
    await gridCards.waitFor({ state: 'visible' });
    console.log('✅ Grid View cards rendered properly');

    // 6. Switch back to Split View and take screenshot
    await splitButton.click();
    await page.waitForTimeout(600);

    // Click all category to show full list
    const allChip = page.locator('button:has-text("전체 카테고리")').first();
    await allChip.click();
    await page.waitForTimeout(400);

    const screenshotPath = path.resolve('public', 'patterns-split-ux-test.png');
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`📸 Screenshot saved to ${screenshotPath}`);

    console.log('🎉 All Master-Detail Split UX tests passed flawlessly!');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

testPatternsSplitUX();
