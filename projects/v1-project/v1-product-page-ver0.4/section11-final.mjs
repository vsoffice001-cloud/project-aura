import { chromium } from '@playwright/test';
import { writeFileSync } from 'fs';

const URL = 'http://localhost:3040/test/phase-2';
const OUT = '/tmp/section11-viz-upgrade';

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
    await page.waitForTimeout(800);

    // ─── DRIVERS ────────────────────────────────────────────────────────────
    await page.locator('#radix-_R_12teatpesnelb_-trigger-drivers').click();
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `${OUT}/${vp.name}-01-drivers.png` });

    const driversResult = await page.evaluate(() => {
      const panel = document.getElementById('radix-_R_12teatpesnelb_-content-drivers');
      if (!panel) return { ok: false };
      const paths = panel.querySelectorAll('path');
      const rects = panel.querySelectorAll('rect.highcharts-point, .highcharts-series rect');
      const svgs = panel.querySelectorAll('svg');
      const hasEyebrow = panel.textContent.includes('Market drivers');
      const hasFigcaption = !!panel.querySelector('figcaption');
      const articles = panel.querySelectorAll('article');
      const insightBox = panel.textContent.includes('capex planning');
      const sourceCluster = panel.querySelector('[class*="source"]');
      return { ok: true, paths: paths.length, rects: rects.length, svgs: svgs.length, hasEyebrow, hasFigcaption, articles: articles.length, insightBox, hasSourceCluster: !!sourceCluster };
    });
    console.log(`[${vp.name}] DRIVERS:`, JSON.stringify(driversResult));

    // ─── CHALLENGES ─────────────────────────────────────────────────────────
    await page.locator('#radix-_R_12teatpesnelb_-trigger-challenges').click();
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `${OUT}/${vp.name}-02-challenges.png` });

    const challengesResult = await page.evaluate(() => {
      const panel = document.getElementById('radix-_R_12teatpesnelb_-content-challenges');
      if (!panel) return { ok: false };
      const svgs = panel.querySelectorAll('svg');
      // Heatmap has grid cells - look for g elements or the grid
      const allButtons = panel.querySelectorAll('button');
      const gridDivs = Array.from(panel.querySelectorAll('div')).filter(d => d.className.includes('grid'));
      const hasYAxis = panel.textContent.includes('Impact');
      const hasXAxis = panel.textContent.includes('Likelihood');
      // Count button texts (exclude Sources button)
      const challengeBtns = Array.from(allButtons).filter(b => !b.textContent.includes('Sources'));
      return { 
        ok: true, 
        svgs: svgs.length, 
        allButtons: allButtons.length, 
        challengeButtons: challengeBtns.length,
        challengeButtonTexts: challengeBtns.map(b => b.textContent.trim().substring(0,30)),
        gridDivs: gridDivs.length,
        hasYAxis, 
        hasXAxis,
        hasEyebrow: panel.textContent.includes('Challenge prioritization')
      };
    });
    console.log(`[${vp.name}] CHALLENGES:`, JSON.stringify(challengesResult));

    // Click first challenge button (expand)
    const challengePanel = page.locator('#radix-_R_12teatpesnelb_-content-challenges');
    const firstChallengeBtn = challengePanel.locator('button').first();
    const isBtnVisible = await firstChallengeBtn.isVisible().catch(() => false);
    let expandResult = { tested: false };
    if (isBtnVisible) {
      await firstChallengeBtn.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: `${OUT}/${vp.name}-03-challenges-expanded.png` });
      const textAfterClick = await page.evaluate(() => {
        const panel = document.getElementById('radix-_R_12teatpesnelb_-content-challenges');
        return panel?.textContent?.length || 0;
      });
      // Collapse
      await firstChallengeBtn.click();
      await page.waitForTimeout(600);
      const textAfterCollapse = await page.evaluate(() => {
        const panel = document.getElementById('radix-_R_12teatpesnelb_-content-challenges');
        return panel?.textContent?.length || 0;
      });
      expandResult = { tested: true, textAfterClick, textAfterCollapse, expandedMore: textAfterClick > textAfterCollapse };
    }
    console.log(`[${vp.name}] EXPAND:`, JSON.stringify(expandResult));

    // ─── TRENDS ─────────────────────────────────────────────────────────────
    await page.locator('#radix-_R_12teatpesnelb_-trigger-trends').click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `${OUT}/${vp.name}-04-trends.png` });

    // Trends panel uses value="trends" - check if it's accessible after click
    const trendsResult = await page.evaluate(() => {
      // Radix mounts the panel on first activation
      const allPanels = document.querySelectorAll('[role="tabpanel"]');
      let trendsPanel = null;
      for (const p of allPanels) {
        if (p.textContent.includes('Time-to-mainstream') || p.textContent.includes('KenBubble') || p.textContent.includes('IoT + telematics')) {
          trendsPanel = p;
          break;
        }
      }
      if (!trendsPanel) {
        // Try by data-state active
        const active = document.querySelector('[role="tabpanel"][data-state="active"]');
        return { ok: false, reason: 'panel not found by text', activePanelText: active?.textContent?.substring(0,100) };
      }
      const paths = trendsPanel.querySelectorAll('path');
      const svgs = trendsPanel.querySelectorAll('svg');
      const articles = trendsPanel.querySelectorAll('article');
      return { 
        ok: true, 
        paths: paths.length, 
        svgs: svgs.length, 
        articles: articles.length,
        hasEyebrow: trendsPanel.textContent.includes('Trends · Impact'),
        hasBubbleChart: trendsPanel.textContent.includes('Time-to-mainstream') || trendsPanel.textContent.includes('Years to mainstream'),
        textPreview: trendsPanel.textContent.substring(0, 200)
      };
    });
    console.log(`[${vp.name}] TRENDS:`, JSON.stringify(trendsResult));

    await page.close();
  }

  await browser.close();
})();
