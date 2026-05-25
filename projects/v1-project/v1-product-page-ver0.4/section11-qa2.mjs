import { chromium } from '@playwright/test';
import { writeFileSync } from 'fs';

const URL = 'http://localhost:3040/test/phase-2';
const OUT = '/tmp/section11-viz-upgrade';
const results = {};

(async () => {
  const browser = await chromium.launch({ headless: true });

  for (const vp of [{ name: 'desktop-1440', w: 1440, h: 900 }, { name: 'tablet-768', w: 768, h: 1024 }]) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: vp.w, height: vp.h });
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Scroll section 11 into view
    await page.evaluate(() => {
      const h2s = Array.from(document.querySelectorAll('h2'));
      const h = h2s.find(h => h.textContent.includes('forces shaping'));
      if (h) h.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await page.waitForTimeout(1000);

    // Use tab group 5 (SWOT/Drivers/Challenges/Trends & Tech) = locator by nth tablist
    // tab text indexing: Drivers=idx17, Challenges=idx18, Trends=idx19
    const driversBtn = page.locator('[role="tab"]').nth(17);
    const challengesBtn = page.locator('[role="tab"]').nth(18);
    const trendsBtn = page.locator('[role="tab"]').nth(19);

    const vr = {};

    // ─── DRIVERS ────────────────────────────────────────────────────────────
    await driversBtn.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${OUT}/${vp.name}-drivers.png` });

    const driversPanel = await page.evaluate(() => {
      const ap = document.querySelector('[data-state="active"][role="tabpanel"]');
      if (!ap) return null;
      const hcPaths = ap.querySelectorAll('.highcharts-series rect, .highcharts-series path');
      const allPaths = ap.querySelectorAll('path');
      const svgs = ap.querySelectorAll('svg');
      const charts = ap.querySelectorAll('[data-highcharts-chart]');
      const eyebrow = ap.querySelector('[class*="eyebrow"], [class*="label"]');
      const figcaption = ap.querySelector('figcaption');
      const cards = ap.querySelectorAll('[class*="card"], article');
      return {
        hcPaths: hcPaths.length,
        allPaths: allPaths.length,
        svgs: svgs.length,
        charts: charts.length,
        eyebrowText: eyebrow?.textContent?.trim().substring(0,50) || '',
        hasFigcaption: !!figcaption,
        cards: cards.length,
        hasChartFigure: ap.innerHTML.includes('Market drivers') || ap.innerHTML.includes('impact-ranked'),
        panelText: ap.textContent?.substring(0,200)
      };
    });
    console.log(`[${vp.name}] DRIVERS:`, JSON.stringify(driversPanel));
    vr.drivers = driversPanel;

    // ─── CHALLENGES ─────────────────────────────────────────────────────────
    await challengesBtn.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${OUT}/${vp.name}-challenges.png` });

    const challengesPanel = await page.evaluate(() => {
      const ap = document.querySelector('[data-state="active"][role="tabpanel"]');
      if (!ap) return null;
      const buttons = ap.querySelectorAll('button');
      const gridDivs = ap.querySelectorAll('div[class*="grid-cols-3"]');
      const cells = ap.querySelectorAll('div[class*="col-span"], [class*="hm-cell"]');
      const svgs = ap.querySelectorAll('svg');
      const hasYAxis = ap.textContent.includes('↑ Impact') || ap.textContent.includes('Impact');
      const hasXAxis = ap.textContent.includes('Likelihood');
      const hasCritical = ap.textContent.includes('CRITICAL') || ap.textContent.includes('Critical');
      return {
        buttons: buttons.length,
        buttonTexts: Array.from(buttons).slice(0,8).map(b => b.textContent.trim().substring(0,30)),
        gridDivs: gridDivs.length,
        cells: cells.length,
        svgs: svgs.length,
        hasYAxis,
        hasXAxis,
        hasCritical,
        panelText: ap.textContent?.substring(0,300)
      };
    });
    console.log(`[${vp.name}] CHALLENGES:`, JSON.stringify(challengesPanel));
    vr.challenges = challengesPanel;

    // Expand click test
    if (challengesPanel && challengesPanel.buttons > 0) {
      const firstBtn = page.locator('[data-state="active"][role="tabpanel"] button').first();
      await firstBtn.click();
      await page.waitForTimeout(900);
      await page.screenshot({ path: `${OUT}/${vp.name}-challenges-expanded.png` });
      const expandCheck = await page.evaluate(() => {
        const ap = document.querySelector('[data-state="active"][role="tabpanel"]');
        // Look for expanded content — more text or changed class
        const detail = ap?.querySelector('[class*="expand"], [class*="detail"], [class*="selected"], [aria-expanded="true"]');
        return { detailVisible: !!detail, textLength: ap?.textContent?.length || 0 };
      });
      vr.challengeExpand = expandCheck;
      // Collapse
      await firstBtn.click();
      await page.waitForTimeout(500);
    }

    // ─── TRENDS ─────────────────────────────────────────────────────────────
    await trendsBtn.click();
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `${OUT}/${vp.name}-trends.png` });

    const trendsPanel = await page.evaluate(() => {
      const ap = document.querySelector('[data-state="active"][role="tabpanel"]');
      if (!ap) return null;
      const hcPaths = ap.querySelectorAll('.highcharts-series path, .highcharts-bubble-series path');
      const allPaths = ap.querySelectorAll('path');
      const svgs = ap.querySelectorAll('svg');
      const charts = ap.querySelectorAll('[data-highcharts-chart]');
      const hasBubble = ap.querySelector('[class*="bubble"]') !== null || ap.innerHTML.includes('bubble');
      return {
        hcPaths: hcPaths.length,
        allPaths: allPaths.length,
        svgs: svgs.length,
        charts: charts.length,
        hasBubble,
        hasChartFigure: ap.innerHTML.includes('Time-to-mainstream') || ap.innerHTML.includes('trend'),
        panelText: ap.textContent?.substring(0,200)
      };
    });
    console.log(`[${vp.name}] TRENDS:`, JSON.stringify(trendsPanel));
    vr.trends = trendsPanel;

    results[vp.name] = vr;
    await page.close();
  }

  await browser.close();
  writeFileSync(`${OUT}/results.json`, JSON.stringify(results, null, 2));
  console.log('\n=== FINAL ===\n', JSON.stringify(results, null, 2));
})();
