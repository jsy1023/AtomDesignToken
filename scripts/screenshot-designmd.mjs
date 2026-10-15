import { chromium } from 'playwright';
import path from 'path';

async function runDesignMdScreenshot() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Open drawer
  await page.click('button[aria-label="디자인 시스템 스타일 에디터 열기"]');
  await page.waitForTimeout(400);

  // Switch to DESIGN.md tab
  await page.click('button:has-text("DESIGN.md (84)")');
  await page.waitForTimeout(500);

  const screenshotDir = path.resolve('test-results', 'screenshots');
  const screenshotPath = path.resolve(screenshotDir, 'theme-editor-designmd-tab.png');
  await page.screenshot({ path: screenshotPath });
  console.log(`📸 DESIGN.md tab screenshot saved to ${screenshotPath}`);

  await browser.close();
}

runDesignMdScreenshot();
