import { test, chromium } from '@playwright/test';

test('insight-figcap-probe', async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3040/test/phase-2#market-size', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Scroll through full section
  await page.evaluate(() => {
    document.querySelector('#market-size')?.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
  });
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollBy(0, 800));
  await page.waitForTimeout(600);

  const r = await page.evaluate(() => {
    const gc = (el: Element | null): string => el ? window.getComputedStyle(el).color : 'NOT_FOUND';

    // dump all elements that contain "WHAT" - widen net
    const whatEls = [...document.querySelectorAll('*')]
      .filter(el => (el.textContent ?? '').trim().startsWith('WHAT') && el.children.length < 5 && !['SCRIPT','STYLE'].includes(el.tagName))
      .map(el => ({ tag: el.tagName, cls: el.className?.toString().slice(0,60), t: el.textContent?.trim().slice(0,40), c: gc(el) }));

    // figcaption - check actual content + color
    const figs = [...document.querySelectorAll('figcaption')];
    const figData = figs.map(f => ({ t: f.textContent?.trim().slice(0,60), c: gc(f) }));

    // any element with class containing "insight" - broad
    const insightEls = [...document.querySelectorAll('[class*="insight"], [class*="Insight"], [class*="InsightBox"]')];
    const insightData = insightEls.map(el => ({
      tag: el.tagName,
      cls: el.className?.toString().slice(0,80),
      innerText: el.textContent?.trim().slice(0,80),
    }));

    // fallback: look for "MEANS" anywhere
    const meansEls = [...document.querySelectorAll('*')]
      .filter(el => (el.textContent ?? '').includes('MEANS') && el.children.length < 4 && !['SCRIPT','STYLE','HTML','BODY','DIV'].includes(el.tagName))
      .map(el => ({ tag: el.tagName, cls: el.className?.toString().slice(0,50), t: el.textContent?.trim().slice(0,50), c: gc(el) }));

    return { whatEls, figData, insightData, meansEls };
  });

  console.log('\n=== INSIGHT + FIG PROBE ===');
  console.log(JSON.stringify(r, null, 2));
  await browser.close();
});
