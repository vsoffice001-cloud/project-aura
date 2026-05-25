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
    const headings = Array.from(document.querySelectorAll('h2'));
    const h = headings.find(h => h.textContent.includes('forces shaping'));
    if (h) h.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(1000);

  // List ALL tab groups on the page
  const allTabGroups = await page.evaluate(() => {
    const tl = document.querySelectorAll('[role="tablist"]');
    return Array.from(tl).map((tl, i) => {
      const tabs = tl.querySelectorAll('[role="tab"]');
      return {
        index: i,
        tabTexts: Array.from(tabs).map(t => t.textContent.trim()),
        parentClass: tl.parentElement?.className?.substring(0, 80)
      };
    });
  });
  console.log('=== ALL TAB GROUPS ===\n', JSON.stringify(allTabGroups, null, 2));

  // Find the tabgroup that contains Drivers/Challenges/Trends
  const targetTabGroup = await page.evaluate(() => {
    const tl = document.querySelectorAll('[role="tablist"]');
    for (const tablist of tl) {
      const tabs = tablist.querySelectorAll('[role="tab"]');
      const texts = Array.from(tabs).map(t => t.textContent.trim());
      if (texts.some(t => t.includes('Drivers') || t.includes('Driver'))) {
        return { found: true, texts };
      }
    }
    return { found: false };
  });
  console.log('=== TARGET TABGROUP ===', JSON.stringify(targetTabGroup));

  // Click Drivers (correct tab in correct group)
  const allTabs = page.locator('[role="tab"]');
  const count = await allTabs.count();
  console.log('Total tabs found:', count);
  const tabTexts = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('[role="tab"]')).map((t, i) => ({ i, text: t.textContent.trim() }));
  });
  console.log('All tabs:', JSON.stringify(tabTexts));

  // Find industry tab container more precisely - look for section 11 area
  const sec11Tabs = await page.evaluate(() => {
    // Find the heading
    const h2s = Array.from(document.querySelectorAll('h2'));
    const sec11h2 = h2s.find(h => h.textContent.includes('forces shaping'));
    if (!sec11h2) return { found: false };
    
    // Walk up to section container
    let container = sec11h2.parentElement;
    for (let i = 0; i < 6; i++) {
      const tablist = container.querySelector('[role="tablist"]');
      if (tablist) {
        const tabs = tablist.querySelectorAll('[role="tab"]');
        return { 
          found: true, 
          depth: i,
          tabs: Array.from(tabs).map((t, idx) => ({ idx, text: t.textContent.trim(), state: t.dataset.state }))
        };
      }
      container = container.parentElement;
    }
    return { found: false, reason: 'no tablist in ancestors' };
  });
  console.log('=== SECTION 11 TABS ===', JSON.stringify(sec11Tabs, null, 2));

  await browser.close();
})();
