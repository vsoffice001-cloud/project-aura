import { test, chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const SCREENSHOT_DIR = path.join(__dirname, '../qa-screenshots/v2c-diagnose');

const URLS = [
  {
    label: 'home',
    url: 'http://localhost:3000/',
  },
  {
    label: 'pdp-australia',
    url: 'http://localhost:3000/reports/australia-cold-chain-market-2022-2027',
  },
  {
    label: 'pdp-gcc',
    url: 'http://localhost:3000/reports/gcc-pharmaceutical-market-2024-2030',
  },
];

const VIEWPORTS = [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'mobile', width: 390, height: 844 },
];

const CONSOLE_ERRORS: Record<string, string[]> = {};
const NETWORK_FAILURES: Record<string, string[]> = {};

test.describe.configure({ mode: 'serial' });

test('visual diagnose — all URLs × all viewports', async () => {
  const browser = await chromium.launch({ headless: true });

  for (const { label, url } of URLS) {
    CONSOLE_ERRORS[label] = [];
    NETWORK_FAILURES[label] = [];

    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });
      const page = await context.newPage();

      // Capture console errors/warnings
      page.on('console', (msg) => {
        const type = msg.type();
        if (type === 'error' || type === 'warning') {
          CONSOLE_ERRORS[label].push(`[${type}] ${msg.text()}`);
        }
      });

      // Capture page errors (uncaught exceptions)
      page.on('pageerror', (err) => {
        CONSOLE_ERRORS[label].push(`[pageerror] ${err.message}`);
      });

      // Capture failed network requests
      page.on('requestfailed', (req) => {
        NETWORK_FAILURES[label].push(`FAIL ${req.method()} ${req.url()} — ${req.failure()?.errorText}`);
      });

      // Capture non-200 responses (4xx/5xx)
      page.on('response', (resp) => {
        const status = resp.status();
        if (status >= 400) {
          NETWORK_FAILURES[label].push(`HTTP ${status} ${resp.url()}`);
        }
      });

      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1500);

      // Above-fold screenshot
      const aboveFoldPath = path.join(SCREENSHOT_DIR, `${label}-${vp.label}-above-fold.png`);
      await page.screenshot({ path: aboveFoldPath, fullPage: false });

      // Scroll full page to trigger lazy-loads / animations
      await page.evaluate(async () => {
        await new Promise<void>((resolve) => {
          let scrollY = 0;
          const step = 300;
          const timer = setInterval(() => {
            window.scrollBy(0, step);
            scrollY += step;
            if (scrollY >= document.body.scrollHeight) {
              clearInterval(timer);
              resolve();
            }
          }, 80);
        });
      });
      await page.waitForTimeout(2000);

      // Full-page screenshot (after scroll triggers)
      const fullPagePath = path.join(SCREENSHOT_DIR, `${label}-${vp.label}-full.png`);
      await page.screenshot({ path: fullPagePath, fullPage: true });

      // Scroll back to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      // Probe for CSS var() not resolving — look for elements with color:var(-- in computed style
      const unresolved = await page.evaluate(() => {
        const results: string[] = [];
        document.querySelectorAll('*').forEach((el) => {
          const style = window.getComputedStyle(el as HTMLElement);
          // Check if backgroundColor/color is empty/transparent where unexpected
          const bg = style.backgroundColor;
          const color = style.color;
          const tagName = (el as HTMLElement).tagName;
          const className = (el as HTMLElement).className?.toString()?.slice(0, 60) ?? '';

          // getComputedStyle always resolves vars — instead check inline styles for unresolved var()
          const inlineStyle = (el as HTMLElement).getAttribute('style') ?? '';
          if (inlineStyle.includes('var(--') && !inlineStyle.match(/var\(--[^)]+\)\s*$/)) {
            // has var refs — check if they resolved
          }

          // Check for truly transparent backgrounds on major containers (div/section/main/header/footer)
          const majorTags = ['SECTION', 'MAIN', 'HEADER', 'FOOTER', 'NAV', 'ARTICLE'];
          if (majorTags.includes(tagName) && bg === 'rgba(0, 0, 0, 0)') {
            results.push(`transparent bg on <${tagName} class="${className}">`);
          }
        });
        return results.slice(0, 20); // cap at 20
      });

      // Probe text content for literal "var(--" strings rendered in DOM
      const literalVarText = await page.evaluate(() => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const found: string[] = [];
        let node;
        while ((node = walker.nextNode())) {
          const text = node.textContent ?? '';
          if (text.includes('var(--')) {
            found.push(text.trim().slice(0, 120));
          }
        }
        return found;
      });

      // Probe for oversized images (naturalWidth === 0 → broken)
      const brokenImages = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs
          .filter((img) => !img.complete || img.naturalWidth === 0)
          .map((img) => `<img src="${img.src?.slice(0, 100)}" alt="${img.alt}">`);
      });

      // Save diagnostics per URL + viewport
      const diagPath = path.join(SCREENSHOT_DIR, `${label}-${vp.label}-diag.json`);
      fs.writeFileSync(diagPath, JSON.stringify({
        url,
        viewport: vp,
        transparentContainers: unresolved,
        literalVarText,
        brokenImages,
        consoleErrors: CONSOLE_ERRORS[label],
        networkFailures: NETWORK_FAILURES[label],
      }, null, 2));

      console.log(`\n=== ${label} @ ${vp.label} ===`);
      console.log('Console errors:', CONSOLE_ERRORS[label].length);
      console.log('Network failures:', NETWORK_FAILURES[label].length);
      console.log('Broken images:', brokenImages.length);
      console.log('Transparent containers:', unresolved.length);
      console.log('Literal var() in DOM text:', literalVarText.length);

      await context.close();
    }
  }

  await browser.close();

  // Print summary
  console.log('\n\n=== SUMMARY ===');
  for (const { label } of URLS) {
    console.log(`\n${label}:`);
    console.log('  console errors/warns:', CONSOLE_ERRORS[label].length);
    if (CONSOLE_ERRORS[label].length) {
      CONSOLE_ERRORS[label].forEach((e) => console.log('   ', e));
    }
    console.log('  network failures:', NETWORK_FAILURES[label].length);
    if (NETWORK_FAILURES[label].length) {
      NETWORK_FAILURES[label].forEach((e) => console.log('   ', e));
    }
  }
});
