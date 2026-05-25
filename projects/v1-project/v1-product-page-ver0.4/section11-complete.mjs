import { chromium } from '@playwright/test';
import { writeFileSync } from 'fs';

const URL = 'http://localhost:3040/test/phase-2';
const OUT = '/tmp/section11-viz-upgrade';

function findIndustryTablist(doc) {
  const tls = doc.querySelectorAll('[role="tablist"]');
  for (const tl of tls) {
    const tabs = tl.querySelectorAll('[role="tab"]');
    if (Array.from(tabs).some(function(t) { return t.textContent.includes('Drivers'); })) {
      return { tl, tabs: Array.from(tabs) };
    }
  }
  return null;
}

async function getIndustryTabIds(page) {
  return await page.evaluate(function() {
    const tls = document.querySelectorAll('[role="tablist"]');
    for (const tl of tls) {
      const tabs = tl.querySelectorAll('[role="tab"]');
      const tabArr = Array.from(tabs);
      if (tabArr.some(function(t) { return t.textContent.includes('Drivers'); })) {
        return tabArr.map(function(t) {
          return { text: t.textContent.trim(), id: t.id, controls: t.getAttribute('aria-controls') };
        });
      }
    }
    return null;
  });
}

async function probePanel(page, panelId) {
  return await page.evaluate(function(pid) {
    const panel = document.getElementById(pid);
    if (!panel) {
      // Panel might not have its ID yet — find by checking all tabpanels
      const all = document.querySelectorAll('[role="tabpanel"][data-state="active"]');
      if (all.length === 0) return { found: false, reason: 'no active panel' };
      // Return all active panels info
      return { 
        found: false, 
        reason: 'id not found',
        activePanels: Array.from(all).map(function(p) { 
          return { id: p.id, text: p.textContent && p.textContent.substring(0,80) }; 
        })
      };
    }
    const paths = panel.querySelectorAll('path');
    const svgs = panel.querySelectorAll('svg');
    const articles = panel.querySelectorAll('article');
    const hcContainers = panel.querySelectorAll('[data-highcharts-chart]');
    const buttons = panel.querySelectorAll('button');
    return {
      found: true,
      paths: paths.length,
      svgs: svgs.length,
      articles: articles.length,
      hcContainers: hcContainers.length,
      buttons: buttons.length,
      buttonTexts: Array.from(buttons).slice(0,8).map(function(b) { return b.textContent.trim().substring(0,35); }),
      hasMarketDrivers: panel.textContent.includes('Market drivers'),
      hasImpact: panel.textContent.includes('Impact'),
      hasLikelihood: panel.textContent.includes('Likelihood'),
      hasTrends: panel.textContent.includes('Time-to-mainstream') || panel.textContent.includes('IoT + telematics'),
      hasEyebrow: panel.textContent.includes('impact-ranked') || panel.textContent.includes('Challenge prioritization') || panel.textContent.includes('Impact × Time'),
      textPreview: panel.textContent.substring(0, 150)
    };
  }, panelId);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = {};

  for (const vp of [{ name: 'desktop-1440', w: 1440, h: 900 }, { name: 'tablet-768', w: 768, h: 1024 }]) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: vp.w, height: vp.h });
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Scroll full page to trigger lazy sections
    await page.evaluate(function() { window.scrollTo(0, document.body.scrollHeight); });
    await page.waitForTimeout(2000);
    await page.evaluate(function() { window.scrollTo(0, 0); });
    await page.waitForTimeout(500);

    // Scroll to section 11
    await page.evaluate(function() {
      const h2s = Array.from(document.querySelectorAll('h2'));
      const h = h2s.find(function(h) { return h.textContent.includes('forces shaping'); });
      if (h) h.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await page.waitForTimeout(1000);

    // Get fresh tab IDs
    const tabs = await getIndustryTabIds(page);
    console.log(`[${vp.name}] TABS:`, JSON.stringify(tabs));

    if (!tabs) {
      results[vp.name] = { error: 'tab group not found' };
      await page.close();
      continue;
    }

    const driversTab = tabs.find(function(t) { return t.text === 'Drivers'; });
    const challengesTab = tabs.find(function(t) { return t.text === 'Challenges'; });
    const trendsTab = tabs.find(function(t) { return t.text.includes('Trends'); });

    const vr = {};

    // ─── DRIVERS ────────────────────────────────────────────────────────────
    await page.locator(`#${driversTab.id}`).click();
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `${OUT}/${vp.name}-01-drivers.png` });
    vr.drivers = await probePanel(page, driversTab.controls);
    console.log(`[${vp.name}] DRIVERS:`, JSON.stringify(vr.drivers));

    // ─── CHALLENGES ─────────────────────────────────────────────────────────
    await page.locator(`#${challengesTab.id}`).click();
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `${OUT}/${vp.name}-02-challenges.png` });
    vr.challenges = await probePanel(page, challengesTab.controls);
    console.log(`[${vp.name}] CHALLENGES:`, JSON.stringify(vr.challenges));

    // Expand test
    if (vr.challenges && vr.challenges.found && vr.challenges.buttons > 0) {
      const firstBtn = page.locator(`#${challengesTab.controls} button`).first();
      if (await firstBtn.isVisible().catch(function() { return false; })) {
        const textBefore = await page.evaluate(function(pid) {
          return document.getElementById(pid) && document.getElementById(pid).textContent.length;
        }, challengesTab.controls);
        await firstBtn.click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: `${OUT}/${vp.name}-03-challenges-expanded.png` });
        const textAfter = await page.evaluate(function(pid) {
          return document.getElementById(pid) && document.getElementById(pid).textContent.length;
        }, challengesTab.controls);
        vr.challengeExpand = { before: textBefore, after: textAfter, expanded: textAfter > textBefore };
        // Collapse
        await firstBtn.click();
        await page.waitForTimeout(600);
        const textCollapsed = await page.evaluate(function(pid) {
          return document.getElementById(pid) && document.getElementById(pid).textContent.length;
        }, challengesTab.controls);
        vr.challengeCollapse = { collapsed: textCollapsed < textAfter };
      }
    }
    console.log(`[${vp.name}] EXPAND:`, JSON.stringify(vr.challengeExpand), 'COLLAPSE:', JSON.stringify(vr.challengeCollapse));

    // ─── TRENDS ─────────────────────────────────────────────────────────────
    await page.locator(`#${trendsTab.id}`).scrollIntoViewIfNeeded();
    await page.locator(`#${trendsTab.id}`).click();
    await page.waitForTimeout(3500);
    await page.screenshot({ path: `${OUT}/${vp.name}-04-trends.png` });
    vr.trends = await probePanel(page, trendsTab.controls);
    console.log(`[${vp.name}] TRENDS:`, JSON.stringify(vr.trends));

    results[vp.name] = vr;
    await page.close();
  }

  await browser.close();
  writeFileSync(`${OUT}/results.json`, JSON.stringify(results, null, 2));
  console.log('\n=== DONE ===');
})();
