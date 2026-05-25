import { chromium } from '@playwright/test';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = __dirname;
const URL = 'http://localhost:3040/test/phase-2';

const VIEWPORTS = [
  { label: 'mobile', width: 390, height: 844 },
  { label: 'tablet', width: 768, height: 1024 },
  { label: 'desktop', width: 1440, height: 900 },
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  for (const { label, width, height } of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width, height } });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(800);

    // hero-visible (top) screenshot
    await page.screenshot({ path: path.join(OUT, `phase-2-${label}-top.png`), clip: { x: 0, y: 0, width, height } });
    console.log(`SCREENSHOT: phase-2-${label}-top.png (${width}x${height})`);

    // scroll past hero to capture sticky toc + sections
    await page.evaluate(() => window.scrollTo(0, window.innerHeight + 200));
    await page.waitForTimeout(2200); // wait for KeyStatsStrip counter animation 1800ms to finish
    await page.screenshot({ path: path.join(OUT, `phase-2-${label}-scrolled.png`), clip: { x: 0, y: 0, width, height } });
    console.log(`SCREENSHOT: phase-2-${label}-scrolled.png`);

    if (errs.length) console.log(`  errors: ${errs.join(' | ')}`);
    await ctx.close();
  }
  await browser.close();
  console.log('Done.');
}
main().catch(e => { console.error(e); process.exit(1); });
