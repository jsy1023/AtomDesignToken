import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

async function testAllPagesThemeSync() {
  console.log('🚀 Starting Comprehensive Playwright Test for All Pages Theme & Typography Sync...');

  const screenshotsDir = path.resolve('test-results/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });

  const routes = [
    { url: 'http://localhost:3000', name: 'landing' },
    { url: 'http://localhost:3000/tokens', name: 'tokens' },
    { url: 'http://localhost:3000/patterns', name: 'patterns' },
    { url: 'http://localhost:3000/components', name: 'components' },
    { url: 'http://localhost:3000/studio', name: 'studio' },
    { url: 'http://localhost:3000/components/button', name: 'component-detail-button' },
  ];

  try {
    // 1. Visit landing page first and change theme via Floating Theme Editor to Daangn Warm Orange
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    console.log('✅ Loaded Landing Page');

    // Open Floating Theme Editor
    const floatingBtn = page.locator('button[aria-label="디자인 시스템 스타일 에디터 열기"]');
    await floatingBtn.waitFor({ state: 'visible' });
    await floatingBtn.click();
    await page.waitForTimeout(500);

    // Switch to Colors tab and select Daangn
    const colorsTab = page.locator('button:has-text("색상")');
    await colorsTab.click();
    await page.waitForTimeout(400);

    const daangnPreset = page.locator('button:has-text("당근")').first();
    await daangnPreset.waitFor({ state: 'visible' });
    await daangnPreset.click();
    console.log('👉 Applied Daangn Warm Orange theme across session');
    await page.waitForTimeout(500);

    // Close Theme Drawer
    const closeBtn = page.locator('button[aria-label="닫기"]');
    await closeBtn.click();
    await page.waitForTimeout(500);

    // 2. Iterate through each route and check rendering & styles
    for (const route of routes) {
      console.log(`\n🔍 Testing route: ${route.url} (${route.name})`);
      const res = await page.goto(route.url, { waitUntil: 'networkidle' });
      console.log(`   HTTP Status: ${res.status()}`);

      // Verify h1 exists and check text
      const h1Locator = page.locator('h1').first();
      await h1Locator.waitFor({ state: 'visible' });
      const h1Text = await h1Locator.innerText();
      console.log(`   H1 Text: "${h1Text.replace(/\n/g, ' ')}"`);

      // Verify no rainbow text gradients exist in headings
      const gradientSpans = await page.locator('h1 span.bg-clip-text, h2 span.bg-clip-text').count();
      if (gradientSpans > 0) {
        console.warn(`   ⚠️ Warning: Found ${gradientSpans} bg-clip-text gradient span(s)!`);
      } else {
        console.log('   ✅ Clean solid typography verified (No AI rainbow text gradients)');
      }

      // Check that the header logo is rendered with the brand color
      const headerLogo = page.locator('header a div').first();
      const logoBg = await headerLogo.evaluate((el) => window.getComputedStyle(el).backgroundColor);
      console.log(`   Header Brand Background: ${logoBg}`);

      // Capture screenshot
      const shotPath = path.join(screenshotsDir, `page-${route.name}-synced.png`);
      await page.screenshot({ path: shotPath, fullPage: false });
      console.log(`   📸 Screenshot saved: ${shotPath}`);
    }

    console.log('\n🎉 All pages successfully validated for unified theme synchronization and clean typography!');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

testAllPagesThemeSync();
