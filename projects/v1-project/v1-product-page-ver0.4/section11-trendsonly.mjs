import { chromium } from '@playwright/test';

const URL = 'http://localhost:3040/test/phase-2';
const OUT = '/tmp/section11-viz-upgrade';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  const consoleErrors = [];
  page.on('console', function(msg) {
    if (msg.type() === 'error' || msg.type() === 'warn') {
      consoleErrors.push({ type: msg.type(), text: msg.text().substring(0,200) });
    }
  });
  page.on('pageerror', function(err) {
    consoleErrors.push({ type: 'pageerror', text: err.message.substring(0,200) });
  });

  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Full scroll
  await page.evaluate(function() { window.scrollTo(0, document.body.scrollHeight); });
  await page.waitForTimeout(2000);

  // Scroll to section 11
  await page.evaluate(function() {
    const h2s = Array.from(document.querySelectorAll('h2'));
    const h = h2s.find(function(h) { return h.textContent.includes('forces shaping'); });
    if (h) h.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(800);

  // Find Trends tab fresh
  const trendsTabId = await page.evaluate(function() {
    const tls = document.querySelectorAll('[role="tablist"]');
    for (const tl of tls) {
      const tabs = Array.from(tl.querySelectorAll('[role="tab"]'));
      const trend = tabs.find(function(t) { return t.textContent.includes('Trends'); });
      if (trend) return { id: trend.id, controls: trend.getAttribute('aria-controls') };
    }
    return null;
  });
  console.log('Trends tab:', JSON.stringify(trendsTabId));

  if (!trendsTabId) {
    console.log('NO TRENDS TAB FOUND');
    await browser.close();
    return;
  }

  // Make sure the tab is in viewport then click
  await page.locator(`#${trendsTabId.id}`).scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  
  const beforeClick = await page.evaluate(function(tid) {
    const t = document.getElementById(tid);
    return t ? { state: t.dataset.state, rect: JSON.stringify(t.getBoundingClientRect()) } : null;
  }, trendsTabId.id);
  console.log('BEFORE CLICK:', JSON.stringify(beforeClick));

  await page.locator(`#${trendsTabId.id}`).click({ force: true });
  await page.waitForTimeout(4000);

  const afterClick = await page.evaluate(function(tid) {
    const t = document.getElementById(tid);
    return t ? { state: t.dataset.state, ariaSelected: t.getAttribute('aria-selected') } : null;
  }, trendsTabId.id);
  console.log('AFTER CLICK:', JSON.stringify(afterClick));

  const panelCheck = await page.evaluate(function(controls) {
    const panel = document.getElementById(controls);
    if (!panel) {
      // check all active panels
      const active = Array.from(document.querySelectorAll('[role="tabpanel"]'));
      return { panelById: false, allPanels: active.map(function(p) { return { id: p.id, state: p.dataset.state, text: p.textContent && p.textContent.substring(0,60) }; }) };
    }
    return { panelById: true, state: panel.dataset.state, text: panel.textContent && panel.textContent.substring(0,200) };
  }, trendsTabId.controls);
  console.log('PANEL CHECK:', JSON.stringify(panelCheck, null, 2));

  await page.screenshot({ path: `${OUT}/trends-only-debug.png` });

  console.log('\nCONSOLE ERRORS:', JSON.stringify(consoleErrors.slice(0,10), null, 2));

  await browser.close();
})();
