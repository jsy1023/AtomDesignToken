import { chromium } from 'playwright';
import path from 'path';

async function runTest() {
  console.log('🚀 Starting Playwright test for Theme Editor...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    console.log('🌐 Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('✅ Page loaded successfully');

    // 1. Check Floating Button
    const floatingBtn = page.locator('button[aria-label="디자인 시스템 스타일 에디터 열기"]');
    await floatingBtn.waitFor({ state: 'visible', timeout: 10000 });
    console.log('✅ Floating Button is visible on page');

    // 2. Click Floating Button to Open Drawer
    await floatingBtn.click();
    console.log('👉 Clicked Floating Button');

    // 3. Check Drawer is visible
    const drawer = page.locator('aside[aria-label="디자인 시스템 스타일 에디터"]');
    await drawer.waitFor({ state: 'visible', timeout: 5000 });
    console.log('✅ Theme Editor Drawer opened');

    // 4. Verify DESIGN.md Tab is active and list themes
    const designMdTabBtn = page.locator('button:has-text("DESIGN.md (84)")');
    await designMdTabBtn.waitFor({ state: 'visible' });
    await designMdTabBtn.click();
    console.log('✅ Clicked DESIGN.md (84) tab button');
    await page.waitForTimeout(500);

    // Search for "Apple"
    const searchInput = page.locator('input[placeholder*="브랜드 검색"]');
    await searchInput.fill('Apple');
    await page.waitForTimeout(500);

    const appleCard = page.locator('div:has-text("Apple") >> button:has-text("스타일 적용하기")').first();
    await appleCard.waitFor({ state: 'visible', timeout: 5000 });
    console.log('✅ Found Apple theme card in DESIGN.md tab');

    // Click "스타일 적용하기"
    await appleCard.click();
    console.log('👉 Applied Apple theme');
    await page.waitForTimeout(1000);

    // 5. Test Typography tab
    const typoTab = page.locator('button:has-text("타이포")');
    await typoTab.click();
    console.log('👉 Switched to Typography tab');
    await page.waitForTimeout(500);

    const h1Control = page.locator('text=Heading 1 (H1) 스타일 설정');
    await h1Control.waitFor({ state: 'visible', timeout: 5000 });
    console.log('✅ Typography H1 controls verified');

    // 6. Test Live Preview tab
    const previewTab = page.locator('button:has-text("미리보기")');
    await previewTab.click();
    console.log('👉 Switched to Live Preview tab');
    await page.waitForTimeout(500);

    // Take screenshot
    const screenshotPath = path.resolve('public', 'theme-editor-test.png');
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`📸 Screenshot saved to ${screenshotPath}`);

    console.log('🎉 All Playwright Theme Editor tests passed perfectly!');
  } catch (error) {
    console.error('❌ Test failed with error:', error);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

runTest();
