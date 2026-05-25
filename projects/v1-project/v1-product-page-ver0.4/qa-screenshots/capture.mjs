import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = __dirname;

const URLS = [
  { key: 'root', url: 'http://localhost:3040/' },
  { key: 'phase-0', url: 'http://localhost:3040/test/phase-0' },
];

const VIEWPORTS = [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'mobile', width: 390, height: 844 },
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const consoleErrors = {};

  for (const { key, url } of URLS) {
    for (const { label, width, height } of VIEWPORTS) {
      const ctx = await browser.newContext({ viewport: { width, height } });
      const page = await ctx.newPage();

      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      page.on('pageerror', err => errors.push(err.message));

      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

      // scroll to bottom then back to capture lazy-loaded content
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1500);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      const filename = path.join(OUT, `${key}-${label}.png`);
      await page.screenshot({ path: filename, fullPage: true });
      console.log(`SCREENSHOT: ${filename}`);

      if (errors.length) {
        consoleErrors[`${key}-${label}`] = errors;
      }

      await ctx.close();
    }
  }

  // axe scan on phase-0 desktop only
  console.log('\n--- AXE SCAN: phase-0 ---');
  const axeCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const axePage = await axeCtx.newPage();
  await axePage.goto('http://localhost:3040/test/phase-0', { waitUntil: 'networkidle', timeout: 30000 });
  await axePage.waitForTimeout(1000);

  const axeResults = await new AxeBuilder({ page: axePage })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();

  const serious = axeResults.violations.filter(v => v.impact === 'serious' || v.impact === 'critical');
  console.log(`TOTAL violations: ${axeResults.violations.length}`);
  console.log(`SERIOUS/CRITICAL: ${serious.length}`);

  for (const v of serious) {
    console.log(`\n  [${v.impact.toUpperCase()}] ${v.id}: ${v.description}`);
    for (const node of v.nodes.slice(0, 2)) {
      console.log(`    Target: ${node.target.join(' ')}`);
      console.log(`    HTML: ${node.html.substring(0, 120)}`);
    }
  }

  // Print all violation IDs + impacts for reference
  if (axeResults.violations.length > 0) {
    console.log('\n--- ALL VIOLATIONS ---');
    for (const v of axeResults.violations) {
      console.log(`  [${v.impact}] ${v.id} (${v.nodes.length} nodes): ${v.description}`);
    }
  }

  await axeCtx.close();

  // Console errors summary
  console.log('\n--- CONSOLE ERRORS ---');
  if (Object.keys(consoleErrors).length === 0) {
    console.log('  None');
  } else {
    for (const [page, errs] of Object.entries(consoleErrors)) {
      console.log(`  ${page}:`);
      for (const e of errs) console.log(`    ${e}`);
    }
  }

  await browser.close();
  console.log('\nDone.');
}

main().catch(err => { console.error(err); process.exit(1); });
