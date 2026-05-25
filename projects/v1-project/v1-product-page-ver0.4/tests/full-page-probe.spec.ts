import { test, chromium } from '@playwright/test';
import fs from 'fs';

test('full-page-insight-hunt', async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3040/test/phase-2', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Scroll to bottom to trigger all lazy components
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  const r = await page.evaluate(() => {
    const gc = (el: Element | null): string => el ? window.getComputedStyle(el).color : 'NOT_FOUND';

    // Find WHAT THIS MEANS anywhere on page
    const whatEls = [...document.querySelectorAll('*')]
      .filter(el =>
        (el.textContent ?? '').trim().includes('WHAT THIS MEANS') &&
        el.children.length < 5 &&
        !['SCRIPT','STYLE','HTML','BODY'].includes(el.tagName)
      )
      .map(el => ({ tag: el.tagName, cls: el.className?.toString().slice(0,80), t: el.textContent?.trim().slice(0,50), c: gc(el) }));

    // Insight elements
    const insightEls = [...document.querySelectorAll('[class*="insight"], [class*="Insight"]')]
      .map(el => ({
        tag: el.tagName,
        cls: el.className?.toString().slice(0,80),
        ps: [...el.querySelectorAll('p')].map(p => ({ t: p.textContent?.trim().slice(0,50), c: gc(p) })),
      }));

    // Figcaptions (all)
    const figcaps = [...document.querySelectorAll('figcaption')]
      .map(f => ({ t: f.textContent?.trim().slice(0,60), c: gc(f) }));

    return { whatEls, insightEls, figcaps };
  });

  console.log('\n=== FULL PAGE INSIGHT HUNT ===');
  console.log(JSON.stringify(r, null, 2));

  // Now scroll to market-size and grab 3 screenshots
  await page.evaluate(() => {
    document.querySelector('#market-size')?.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' as ScrollLogicalPosition });
  });
  await page.waitForTimeout(600);

  const outDir = '/tmp/ink-hierarchy-restored';
  fs.mkdirSync(outDir, { recursive: true });

  await page.screenshot({ path: `${outDir}/s08-top-1440.png` });
  await page.evaluate(() => window.scrollBy(0, 400));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${outDir}/s08-mid-1440.png` });
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${outDir}/s08-bot-1440.png` });

  console.log('Screenshots done');
  await browser.close();
});
