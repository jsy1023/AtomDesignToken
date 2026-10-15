import { chromium } from 'playwright';
import path from 'path';

async function testComplexFormPattern() {
  console.log('🚀 Starting Playwright test for Complex Form Pattern at /patterns...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    await page.goto('http://localhost:3000/patterns', { waitUntil: 'networkidle' });
    console.log('✅ /patterns page loaded');

    // Find the complex form settings card
    const card = page.locator('h3:has-text("복잡한 엔터프라이즈 환경설정")').first();
    await card.waitFor({ state: 'visible', timeout: 10000 });
    console.log('✅ Found Complex Form Pattern card');

    // Click card to open detail view
    await card.click();
    await page.waitForTimeout(1000);

    // Verify Pattern Title in Detail
    const detailTitle = page.locator('h1:has-text("복잡한 엔터프라이즈 환경설정")');
    await detailTitle.waitFor({ state: 'visible' });
    console.log('✅ Detail view opened');

    // Scroll into interactive screen mockup
    const interactiveArea = page.locator('text=엔터프라이즈 프로젝트 환경설정');
    await interactiveArea.waitFor({ state: 'visible' });
    console.log('✅ Interactive Form Screen loaded');

    // Type in custom domain with an invalid string to trigger real-time validation
    const domainInput = page.locator('input[placeholder*="api.yourcompany.com"]');
    await domainInput.fill('invalid-domain');
    await page.waitForTimeout(500);

    const inlineError = page.locator('text=유효한 도메인 주소');
    await inlineError.waitFor({ state: 'visible' });
    console.log('✅ Real-time inline error verified');

    // Verify Sticky Unsaved Changes bar
    const unsavedBar = page.locator('text=수정된 변경사항이 있습니다');
    await unsavedBar.waitFor({ state: 'visible' });
    console.log('✅ Sticky Unsaved Changes bar appeared');

    // Fix domain
    await domainInput.fill('api.my-acme-service.com');
    await page.waitForTimeout(500);

    // Switch to Webhooks tab (Progressive Disclosure)
    const webhooksTab = page.locator('button:has-text("웹훅 & 이벤트")');
    await webhooksTab.click();
    await page.waitForTimeout(500);
    console.log('👉 Switched to Webhooks & Events tab');

    const webhookUrlInput = page.locator('input[value*="https://api.acme.com"]');
    await webhookUrlInput.waitFor({ state: 'visible' });
    console.log('✅ Progressive Disclosure dependent fields visible');

    // Take screenshot
    const screenshotPath = path.resolve('public', 'complex-form-pattern-test.png');
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`📸 Screenshot saved to ${screenshotPath}`);

    console.log('🎉 Complex Form Best UX Pattern verified successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

testComplexFormPattern();
