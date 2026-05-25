import { chromium } from '@playwright/test';
import { writeFileSync } from 'fs';

const URL = 'http://localhost:3040/test/phase-2';
const OUT = '/tmp/section11-viz-upgrade';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  // Capture console
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('CONSOLE ERR:', msg.text());
  });

  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Find section 11 by heading text
  const sec11 = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2'));
    const h = headings.find(h => h.textContent.includes('forces shaping') || h.textContent.includes('Industry'));
    if (!h) return { found: false, allH2: headings.slice(0,10).map(h => h.textContent.trim()) };
    h.scrollIntoView({ behavior: 'instant' });
    return { found: true, text: h.textContent };
  });
  console.log('=== Section 11 heading ===', JSON.stringify(sec11));

  await page.waitForTimeout(1000);

  // Full page scroll to trigger lazy loads
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // Navigate to section via hash
  await page.evaluate(() => {
    window.location.hash = '#industry';
  });
  await page.waitForTimeout(1000);

  // Click Drivers
  const driversTab = page.locator('button[role="tab"]').filter({ hasText: /^Drivers/i }).first();
  console.log('Drivers tab found:', await driversTab.isVisible().catch(() => false));
  await driversTab.click();
  await page.waitForTimeout(2000);

  // Count ALL highcharts paths globally
  const hcGlobal = await page.evaluate(() => {
    const paths = document.querySelectorAll('.highcharts-series path, .highcharts-series rect');
    const allPaths = document.querySelectorAll('path');
    const svgs = document.querySelectorAll('svg');
    const hcContainers = document.querySelectorAll('[data-highcharts-chart]');
    return {
      hcPaths: paths.length,
      allPaths: allPaths.length,
      svgs: svgs.length,
      hcContainers: hcContainers.length,
      hcContainerIds: Array.from(hcContainers).map(e => e.id || e.className.substring(0,40))
    };
  });
  console.log('=== HIGHCHARTS GLOBAL (Drivers) ===', JSON.stringify(hcGlobal));
  await page.screenshot({ path: `${OUT}/probe-drivers-1440.png` });

  // Click Challenges
  const challengesTab = page.locator('button[role="tab"]').filter({ hasText: /^Challenges/i }).first();
  await challengesTab.click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT}/probe-challenges-1440.png` });

  // Heatmap DOM probe
  const heatmapProbe = await page.evaluate(() => {
    // Find the active tab content
    const activePanel = document.querySelector('[data-state="active"][role="tabpanel"]');
    if (!activePanel) return { found: false };
    
    const buttons = activePanel.querySelectorAll('button');
    const divs = activePanel.querySelectorAll('div[class*="grid"]');
    const svgs = activePanel.querySelectorAll('svg');
    
    return {
      found: true,
      panelClass: activePanel.className.substring(0,60),
      buttons: buttons.length,
      buttonTexts: Array.from(buttons).slice(0,8).map(b => b.textContent.trim().substring(0,40)),
      gridDivs: divs.length,
      gridClasses: Array.from(divs).slice(0,5).map(d => d.className.substring(0,60)),
      svgs: svgs.length,
      innerHTML_excerpt: activePanel.innerHTML.substring(0,2000)
    };
  });
  console.log('=== CHALLENGES PANEL ===', JSON.stringify(heatmapProbe, null, 2));

  // Click Trends
  const trendsTab = page.locator('button[role="tab"]').filter({ hasText: /^Trends/i }).first();
  await trendsTab.click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT}/probe-trends-1440.png` });

  const trendsProbe = await page.evaluate(() => {
    const activePanel = document.querySelector('[data-state="active"][role="tabpanel"]');
    if (!activePanel) return { found: false };
    const paths = activePanel.querySelectorAll('path');
    const svgs = activePanel.querySelectorAll('svg');
    const hcSeries = activePanel.querySelectorAll('[class*="highcharts-series"]');
    const hcBubble = activePanel.querySelectorAll('[class*="bubble"]');
    return {
      found: true,
      paths: paths.length,
      svgs: svgs.length,
      hcSeries: hcSeries.length,
      hcBubble: hcBubble.length,
      firstPathClass: paths.length > 0 ? (paths[0].className?.baseVal || '') : 'none',
      panelExcerpt: activePanel.innerHTML.substring(0, 1500)
    };
  });
  console.log('=== TRENDS PANEL ===', JSON.stringify(trendsProbe, null, 2));

  await browser.close();
})();
