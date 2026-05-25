import { chromium } from '@playwright/test';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = __dirname;
const URL = 'http://localhost:3040/test/phase-1';

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
    const filename = path.join(OUT, `phase-1-${label}.png`);
    await page.screenshot({ path: filename, fullPage: true });
    console.log(`SCREENSHOT: ${filename} (${width}x${height})`);
    if (errs.length) console.log(`  errors: ${errs.join(' | ')}`);
    await ctx.close();
  }
  await browser.close();
  console.log('Done.');
}
main().catch(e => { console.error(e); process.exit(1); });
