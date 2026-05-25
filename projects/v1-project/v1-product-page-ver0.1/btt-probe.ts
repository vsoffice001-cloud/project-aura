import { chromium } from '@playwright/test';
const outDir = '/Users/vishalchauchan/Downloads/Anti-folder01/qa-screenshots/v2p-round4-deep';
async function run() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3020/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);
  // Scroll 2000px then screenshot
  await page.evaluate(() => window.scrollTo(0, 2000));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${outDir}/legacy-scroll-2000.png` });
  // Find back-to-top element
  const btt = await page.evaluate(() => {
    const el = document.querySelector('[aria-label="Go to top"]');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const cs = window.getComputedStyle(el);
    return { rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height }, position: cs.position, bottom: cs.bottom, right: cs.right, opacity: cs.opacity, zIndex: cs.zIndex };
  });
  console.log('Legacy BTT at scroll 2000:', JSON.stringify(btt));
  await ctx.close();
  await browser.close();
}
run().catch(console.error);
