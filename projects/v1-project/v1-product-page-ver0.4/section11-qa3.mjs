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
    await page.waitForTimeout(800);

    // Get section 11's tablist container ID so we can target its panels
    const sec11Info = await page.evaluate(() => {
      const h2s = Array.from(document.querySelectorAll('h2'));
      const h = h2s.find(h => h.textContent.includes('forces shaping'));
      if (!h) return null;
      let container = h.parentElement;
      for (let i = 0; i < 8; i++) {
        const tl = container.querySelector('[role="tablist"]');
        if (tl) {
          const tabs = tl.querySelectorAll('[role="tab"]');
          const texts = Array.from(tabs).map(t => t.textContent.trim());
          if (texts.includes('Drivers')) {
            const tabsData = Array.from(tabs).map(t => ({
              text: t.textContent.trim(),
              id: t.id,
              controls: t.getAttribute('aria-controls')
            }));
            return { found: true, tabsData, containerTag: container.tagName, containerId: container.id };
          }
        }
        container = container.parentElement;
      }
      return { found: false };
    });
    console.log('SEC11 INFO:', JSON.stringify(sec11Info, null, 2));

    const vr = {};

    // Click each tab using its id/controls mapping
    for (const tabName of ['Drivers', 'Challenges', 'Trends & Tech']) {
      const tabData = sec11Info?.tabsData?.find(t => t.text === tabName);
      if (!tabData) {
        vr[tabName] = { error: 'tab not found in sec11' };
        continue;
      }

      // Click the tab by its id
      await page.locator(`#${tabData.id}`).click();
      await page.waitForTimeout(2500);

      // Get its panel by aria-controls id
      const panelId = tabData.controls;
      const panelData = await page.evaluate((pid) => {
        const panel = document.getElementById(pid);
        if (!panel) return { found: false, pid };
        
        const hcPaths = panel.querySelectorAll('.highcharts-series rect, .highcharts-series path, path[class*="highcharts"]');
        const allPaths = panel.querySelectorAll('path');
        const svgs = panel.querySelectorAll('svg');
        const charts = panel.querySelectorAll('[data-highcharts-chart]');
        const buttons = panel.querySelectorAll('button');
        const gridCols3 = panel.querySelectorAll('[class*="grid-cols-3"]');
        
        return {
          found: true,
          pid,
          hcPaths: hcPaths.length,
          allPaths: allPaths.length,
          svgs: svgs.length,
          charts: charts.length,
          buttons: buttons.length,
          buttonTexts: Array.from(buttons).slice(0,8).map(b => b.textContent.trim().substring(0,35)),
          gridCols3: gridCols3.length,
          hasMarketDrivers: panel.textContent.includes('Market drivers') || panel.textContent.includes('impact-ranked'),
          hasImpact: panel.textContent.includes('Impact') || panel.textContent.includes('↑'),
          hasLikelihood: panel.textContent.includes('Likelihood'),
          hasBubble: panel.innerHTML.includes('bubble') || panel.innerHTML.includes('KenBubble'),
          textPreview: panel.textContent.substring(0, 250)
        };
      }, panelId);

      console.log(`\n[${vp.name}] ${tabName}:`, JSON.stringify(panelData, null, 2));
      vr[tabName] = panelData;

      // Screenshots
      const fname = tabName.toLowerCase().replace(/[^a-z]/g,'-');
      await page.screenshot({ path: `${OUT}/${vp.name}-${fname}.png` });

      // Expand test for Challenges
      if (tabName === 'Challenges' && panelData.buttons > 0) {
        const firstBtn = page.locator(`#${panelId} button`).first();
        if (await firstBtn.isVisible().catch(() => false)) {
          await firstBtn.click();
          await page.waitForTimeout(900);
          await page.screenshot({ path: `${OUT}/${vp.name}-challenges-expanded.png` });
          const postClick = await page.evaluate((pid) => {
            const panel = document.getElementById(pid);
            const expanded = panel?.querySelector('[aria-expanded="true"], [class*="expanded"], [class*="detail"]');
            return { expandedEl: !!expanded, textLen: panel?.textContent?.length || 0 };
          }, panelId);
          vr['challengeExpand'] = postClick;
          // collapse
          await firstBtn.click();
          await page.waitForTimeout(500);
        }
      }
    }

    results[vp.name] = vr;
    await page.close();
  }

  await browser.close();
  writeFileSync(`${OUT}/results.json`, JSON.stringify(results, null, 2));
})();
