import { chromium } from '@playwright/test';

const URL = 'http://localhost:3040/test/phase-2';
const OUT = '/tmp/section11-viz-upgrade';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Full scroll first to load lazy content
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  await page.evaluate(() => {
    const h2s = Array.from(document.querySelectorAll('h2'));
    const h = h2s.find(h => h.textContent.includes('forces shaping'));
    if (h) h.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(1000);

  const trendsTab = page.locator('#radix-_R_12teatpesnelb_-trigger-trends');
  await trendsTab.scrollIntoViewIfNeeded();
  await trendsTab.click();
  await page.waitForTimeout(3000);

  const tabState = await page.evaluate(() => {
    const t = document.getElementById('radix-_R_12teatpesnelb_-trigger-trends');
    return { state: t && t.dataset.state, ariaSelected: t && t.getAttribute('aria-selected') };
  });
  console.log('TRENDS TAB STATE:', JSON.stringify(tabState));

  const trendsElements = await page.evaluate(() => {
    const all = document.querySelectorAll('[id*="trends"]');
    return Array.from(all).map(function(e) { return { tag: e.tagName, id: e.id, state: e.dataset && e.dataset.state, text: e.textContent && e.textContent.substring(0,80) }; });
  });
  console.log('ELEMENTS WITH trends IN ID:', JSON.stringify(trendsElements, null, 2));

  const tabpanels = await page.evaluate(() => {
    const all = document.querySelectorAll('[role="tabpanel"]');
    return Array.from(all).map(function(p) { return { id: p.id, state: p.dataset && p.dataset.state, text: p.textContent && p.textContent.substring(0,80) }; });
  });
  console.log('ALL TABPANELS:', JSON.stringify(tabpanels, null, 2));

  await page.screenshot({ path: `${OUT}/debug-trends-state.png` });

  const activePanel = await page.evaluate(() => {
    const active = document.querySelector('[role="tabpanel"][data-state="active"]');
    return active ? { id: active.id, text: active.textContent && active.textContent.substring(0, 200) } : null;
  });
  console.log('ACTIVE PANEL:', JSON.stringify(activePanel));

  // Check for KenBubbleChart container
  const bubbleCheck = await page.evaluate(() => {
    const allDivs = document.querySelectorAll('div');
    const bubbleDivs = Array.from(allDivs).filter(function(d) { return d.className && d.className.includes && d.className.includes('highcharts'); });
    return { count: bubbleDivs.length, classes: bubbleDivs.slice(0,3).map(function(d) { return d.className.substring(0,50); }) };
  });
  console.log('HIGHCHARTS DIVS:', JSON.stringify(bubbleCheck));

  await browser.close();
})();
