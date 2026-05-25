import { chromium } from '@playwright/test';

const URL = 'http://localhost:3040/test/phase-2';
const OUT = '/tmp/section11-viz-upgrade';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  page.on('console', msg => console.log('BROWSER:', msg.text()));

  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Check what's on the page
  const pageInfo = await page.evaluate(() => {
    const h2s = Array.from(document.querySelectorAll('h2')).map(h => h.textContent.trim().substring(0,60));
    const sections = Array.from(document.querySelectorAll('section')).map(s => ({ id: s.id, class: s.className.substring(0,40) }));
    const tls = document.querySelectorAll('[role="tablist"]');
    return {
      title: document.title,
      h2Count: h2s.length,
      h2s: h2s.slice(0, 20),
      sectionCount: sections.length,
      sections: sections.slice(0, 15),
      tablistCount: tls.length
    };
  });
  console.log('PAGE INFO:', JSON.stringify(pageInfo, null, 2));

  await page.screenshot({ path: `${OUT}/debug-page-load.png` });

  // Full scroll to load lazy sections
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  
  const afterScroll = await page.evaluate(() => {
    const tls = document.querySelectorAll('[role="tablist"]');
    const indTl = Array.from(tls).find(tl => {
      const tabs = tl.querySelectorAll('[role="tab"]');
      return Array.from(tabs).some(t => t.textContent.includes('Drivers'));
    });
    if (!indTl) return { found: false, tlCount: tls.length };
    const tabs = indTl.querySelectorAll('[role="tab"]');
    return { 
      found: true, 
      tabTexts: Array.from(tabs).map(t => ({ text: t.textContent.trim(), id: t.id })),
      tlCount: tls.length
    };
  });
  console.log('AFTER FULL SCROLL:', JSON.stringify(afterScroll, null, 2));

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // Scroll to section 11
  await page.evaluate(() => {
    const h2s = Array.from(document.querySelectorAll('h2'));
    const h = h2s.find(h => h.textContent.includes('forces shaping'));
    if (h) h.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(1000);

  const afterSec11Scroll = await page.evaluate(() => {
    const tls = document.querySelectorAll('[role="tablist"]');
    const indTl = Array.from(tls).find(tl => {
      const tabs = tl.querySelectorAll('[role="tab"]');
      return Array.from(tabs).some(t => t.textContent.includes('Drivers'));
    });
    if (!indTl) return { found: false };
    const tabs = indTl.querySelectorAll('[role="tab"]');
    const trendsTab = Array.from(tabs).find(t => t.textContent.includes('Trends'));
    if (!trendsTab) return { found: true, noTrendsTab: true };
    return { found: true, trendsTabId: trendsTab.id, trendsTabControls: trendsTab.getAttribute('aria-controls') };
  });
  console.log('AFTER SEC11 SCROLL:', JSON.stringify(afterSec11Scroll));

  // Click trends tab
  if (afterSec11Scroll.found && afterSec11Scroll.trendsTabId) {
    await page.locator(`#${afterSec11Scroll.trendsTabId}`).click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `${OUT}/debug-trends-after-click.png` });
    
    const postClick = await page.evaluate((panelId) => {
      const panel = document.getElementById(panelId);
      if (!panel) return { panelFound: false };
      const allPanels = document.querySelectorAll('[role="tabpanel"]');
      return {
        panelFound: true,
        panelState: panel.dataset.state,
        paths: panel.querySelectorAll('path').length,
        svgs: panel.querySelectorAll('svg').length,
        textPreview: panel.textContent.substring(0,200),
        allPanelsCount: allPanels.length
      };
    }, afterSec11Scroll.trendsTabControls);
    console.log('POST TRENDS CLICK:', JSON.stringify(postClick, null, 2));
  }

  await browser.close();
})();
