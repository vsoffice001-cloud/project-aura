import { chromium } from '@playwright/test';
import { writeFileSync } from 'fs';

const OUT = '/tmp/section11-viz-upgrade';
const URL = 'http://localhost:3040/test/phase-2#industry';

const vps = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'tablet-768', width: 768, height: 1024 },
];

const results = {};

(async () => {
  const browser = await chromium.launch({ headless: true });

  for (const vp of vps) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500);

    // Scroll to industry section
    await page.evaluate(() => {
      const el = document.querySelector('#industry') || document.querySelector('[data-section="industry"]');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(1000);

    const vr = {};
    const tabResults = {};

    // ─── DRIVERS TAB ────────────────────────────────────────────────────────
    const driversTab = page.locator('button, [role="tab"]').filter({ hasText: /^Drivers/i }).first();
    const driversVisible = await driversTab.isVisible().catch(() => false);
    if (driversVisible) {
      await driversTab.click();
      await page.waitForTimeout(1500);
      const dr = { clicked: true };
      // Highcharts bar rectangles
      dr.barPaths = await page.locator('.highcharts-series rect, .highcharts-bar-series rect, path.highcharts-point').count();
      // ChartFigure eyebrow text
      dr.chartFigureEyebrow = await page.locator('text=/Market drivers/i').first().isVisible().catch(() => false);
      // SourceCluster
      dr.sourceCluster = await page.locator('[class*="source"]').first().isVisible().catch(() => false);
      await page.screenshot({ path: `${OUT}/${vp.name}-drivers.png` });
      tabResults['Drivers'] = dr;
    } else {
      tabResults['Drivers'] = { clicked: false, error: 'tab not found' };
    }

    // ─── CHALLENGES TAB ─────────────────────────────────────────────────────
    const challengesTab = page.locator('button, [role="tab"]').filter({ hasText: /^Challenges/i }).first();
    const challengesVisible = await challengesTab.isVisible().catch(() => false);
    if (challengesVisible) {
      await challengesTab.click();
      await page.waitForTimeout(1500);
      const cr = { clicked: true };
      // Grid cells — try various selectors
      cr.gridCells = await page.locator('[class*="cell"]').count();
      cr.challengeButtons = await page.locator('[class*="heatmap"] button, [class*="challenge"] button').count();
      cr.yAxisLabel = await page.locator('text=/↑ Impact/').first().isVisible().catch(() => false);
      cr.xAxisLabel = await page.locator('text=/Likelihood →/').first().isVisible().catch(() => false);
      await page.screenshot({ path: `${OUT}/${vp.name}-challenges.png` });

      // Expand test
      const firstBtn = page.locator('[class*="heatmap"] button, [class*="challenge-btn"]').first();
      if (await firstBtn.isVisible().catch(() => false)) {
        await firstBtn.click();
        await page.waitForTimeout(900);
        cr.expandVisible = await page.locator('[class*="expand"], [class*="detail"], [class*="selected"]').first().isVisible().catch(() => false);
        await page.screenshot({ path: `${OUT}/${vp.name}-challenges-expanded.png` });
        await firstBtn.click();
        await page.waitForTimeout(600);
      }
      tabResults['Challenges'] = cr;
    } else {
      tabResults['Challenges'] = { clicked: false, error: 'tab not found' };
    }

    // ─── TRENDS TAB ─────────────────────────────────────────────────────────
    const trendsTab = page.locator('button, [role="tab"]').filter({ hasText: /^Trends/i }).first();
    const trendsVisible = await trendsTab.isVisible().catch(() => false);
    if (trendsVisible) {
      await trendsTab.click();
      await page.waitForTimeout(1500);
      const tr = { clicked: true };
      tr.bubblePaths = await page.locator('.highcharts-bubble-series path, .highcharts-scatter-series path, path.highcharts-point').count();
      tr.chartFigureVisible = await page.locator('text=/[Tt]rend/').first().isVisible().catch(() => false);
      await page.screenshot({ path: `${OUT}/${vp.name}-trends.png` });
      tabResults['Trends'] = tr;
    } else {
      tabResults['Trends'] = { clicked: false, error: 'tab not found' };
    }

    // Full section shot
    await page.screenshot({ path: `${OUT}/${vp.name}-full.png` });
    vr.tabs = tabResults;
    results[vp.name] = vr;
    await page.close();
  }

  await browser.close();
  writeFileSync(`${OUT}/results.json`, JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
})();
