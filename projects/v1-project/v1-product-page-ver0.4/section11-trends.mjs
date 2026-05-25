import { chromium } from '@playwright/test';
import { writeFileSync } from 'fs';

const URL = 'http://localhost:3040/test/phase-2';
const OUT = '/tmp/section11-viz-upgrade';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Scroll to section 11
  await page.evaluate(() => {
    const h2s = Array.from(document.querySelectorAll('h2'));
    const h = h2s.find(h => h.textContent.includes('forces shaping'));
    if (h) h.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(800);

  // Click Trends & Tech tab by ID
  await page.locator('#radix-_R_12teatpesnelb_-trigger-trends').click();
  await page.waitForTimeout(3000);

  // Screenshot
  await page.screenshot({ path: `${OUT}/desktop-1440-trends.png` });

  // Check if panel exists NOW (after click, Radix mounts it)
  const trendsProbe = await page.evaluate(() => {
    const panel = document.getElementById('radix-_R_12teatpesnelb_-content-trends');
    if (!panel) return { found: false, reason: 'panel not in DOM' };

    const hcPaths = panel.querySelectorAll('path');
    const svgs = panel.querySelectorAll('svg');
    const charts = panel.querySelectorAll('[data-highcharts-chart]');
    const hcSeries = panel.querySelectorAll('[class*="highcharts"]');
    const bubbleEls = panel.querySelectorAll('[class*="bubble"]');
    const allText = panel.textContent.substring(0, 400);
    const hasTimeToMain = panel.textContent.includes('Time-to-mainstream') || panel.textContent.includes('time-to-mainstream');
    const hasBubbleWord = panel.textContent.includes('bubble') || panel.innerHTML.includes('bubble');

    return {
      found: true,
      paths: hcPaths.length,
      svgs: svgs.length,
      charts: charts.length,
      hcSeries: hcSeries.length,
      bubbleEls: bubbleEls.length,
      hasTimeToMain,
      hasBubbleWord,
      textPreview: allText
    };
  });
  console.log('TRENDS PROBE:', JSON.stringify(trendsProbe, null, 2));

  // Check if highcharts rendered after chart animation settles
  await page.waitForTimeout(2000);
  const trendsAfterSettle = await page.evaluate(() => {
    const panel = document.getElementById('radix-_R_12teatpesnelb_-content-trends');
    if (!panel) return { found: false };
    const hcPaths = panel.querySelectorAll('.highcharts-series path, .highcharts-series rect');
    const allPaths = panel.querySelectorAll('path');
    return { 
      found: true, 
      hcPaths: hcPaths.length, 
      allPaths: allPaths.length,
      hcPathClasses: Array.from(hcPaths).slice(0,5).map(p => p.className?.baseVal?.substring(0,50) || '')
    };
  });
  console.log('TRENDS AFTER SETTLE:', JSON.stringify(trendsAfterSettle, null, 2));

  // Also capture challenges expand
  await page.locator('#radix-_R_12teatpesnelb_-trigger-challenges').click();
  await page.waitForTimeout(1500);

  // Click first challenge button
  const challengePanel = page.locator('#radix-_R_12teatpesnelb_-content-challenges');
  const firstChallengeBtn = challengePanel.locator('button').first();
  await firstChallengeBtn.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${OUT}/desktop-1440-challenges-expanded.png` });

  const expandProbe = await page.evaluate(() => {
    const panel = document.getElementById('radix-_R_12teatpesnelb_-content-challenges');
    if (!panel) return { found: false };
    const allText = panel.textContent;
    const hasExpandedContent = allText.includes('Impact:') || allText.includes('Likelihood:') || allText.includes('High') || allText.includes('expanded');
    const detailEls = panel.querySelectorAll('[class*="detail"], [class*="expand"], [class*="narrative"]');
    return { 
      found: true, 
      hasExpandedContent,
      detailEls: detailEls.length,
      textLen: allText.length,
      excerpt: allText.substring(300, 600)
    };
  });
  console.log('CHALLENGE EXPAND:', JSON.stringify(expandProbe, null, 2));

  // Collapse by clicking same button
  await firstChallengeBtn.click();
  await page.waitForTimeout(600);
  const collapseProbe = await page.evaluate(() => {
    const panel = document.getElementById('radix-_R_12teatpesnelb_-content-challenges');
    const textLen = panel?.textContent?.length || 0;
    return { textLen };
  });
  console.log('COLLAPSE CHECK:', collapseProbe);

  await browser.close();
})();
