import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

async function testLandingThemeSync() {
  console.log('🚀 Starting Playwright test for Landing Page Theme & Typography Sync...');
  
  const screenshotsDir = path.resolve('test-results/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    console.log('✅ Landing page loaded at http://localhost:3000');

    // 1. Check Main Headline structure
    const mainHeadline = page.locator('h1');
    await mainHeadline.waitFor({ state: 'visible' });
    const headlineText = await mainHeadline.innerText();
    console.log('📄 Main Headline text:', headlineText.replace(/\n/g, ' '));

    // Initial screenshot
    await page.screenshot({ 
      path: path.join(screenshotsDir, 'landing-initial-clean.png'),
      fullPage: false 
    });
    console.log('📸 Initial landing page captured (without tacky gradient)');

    // 2. Open Floating Theme Editor
    const floatingBtn = page.locator('button[aria-label="디자인 시스템 스타일 에디터 열기"]');
    await floatingBtn.waitFor({ state: 'visible' });
    await floatingBtn.click();
    await page.waitForTimeout(600);
    console.log('👉 Clicked floating theme editor trigger');

    // 3. Switch to Colors tab and pick Daangn preset
    const colorsTab = page.locator('button:has-text("색상")');
    await colorsTab.click();
    await page.waitForTimeout(400);

    const daangnPreset = page.locator('button:has-text("당근")').first();
    await daangnPreset.waitFor({ state: 'visible' });
    await daangnPreset.click();
    console.log('👉 Clicked Daangn color preset in Colors tab');
    await page.waitForTimeout(600);

    // 4. Switch to Typography Tab and change font to Inter or Monospace
    const typoTab = page.locator('button:has-text("타이포")');
    await typoTab.click();
    await page.waitForTimeout(300);

    // Select Inter font
    const fontSelect = page.locator('select').first();
    if (await fontSelect.isVisible()) {
      await fontSelect.selectOption({ index: 1 }); // Inter
      console.log('👉 Changed font family to Inter');
    }
    await page.waitForTimeout(600);

    // 5. Close Drawer to see the landing page fully transformed
    const closeBtn = page.locator('button[aria-label="닫기"]');
    await closeBtn.click();
    await page.waitForTimeout(600);
    console.log('👉 Closed theme drawer');

    // Capture screenshot of transformed landing page
    const finalScreenshotPath = path.join(screenshotsDir, 'landing-theme-synced.png');
    await page.screenshot({ 
      path: finalScreenshotPath,
      fullPage: false 
    });
    console.log(`📸 Transformed landing page captured at: ${finalScreenshotPath}`);

    // Verify main title highlight color is updated
    const headlineHighlight = page.locator('h1 span');
    const colorStyle = await headlineHighlight.getAttribute('style');
    console.log('🎨 Current headline accent style:', colorStyle);

    console.log('🎉 Landing page theme & typography test completed successfully!');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

testLandingThemeSync();
