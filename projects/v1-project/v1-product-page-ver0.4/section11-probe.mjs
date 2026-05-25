import { chromium } from '@playwright/test';

const URL = 'http://localhost:3040/test/phase-2#industry';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);

  await page.evaluate(() => {
    const el = document.querySelector('#industry');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(800);

  // Click Challenges
  const challengesTab = page.locator('button, [role="tab"]').filter({ hasText: /^Challenges/i }).first();
  await challengesTab.click();
  await page.waitForTimeout(1500);

  // Probe DOM inside industry section
  const challengesDOM = await page.evaluate(() => {
    const section = document.querySelector('#industry') || document.querySelector('[class*="industry"]');
    if (!section) return 'no industry section';
    const inner = section.innerHTML.substring(0, 3000);
    return inner;
  });
  console.log('=== CHALLENGES DOM (first 3000 chars) ===\n', challengesDOM);

  // Look for heatmap specifically
  const heatmapClasses = await page.evaluate(() => {
    const els = document.querySelectorAll('[class*="heatmap"], [class*="Heatmap"], [class*="grid"], [class*="matrix"]');
    return Array.from(els).slice(0, 10).map(el => ({ tag: el.tagName, classes: el.className, childCount: el.children.length }));
  });
  console.log('=== HEATMAP ELEMENTS ===\n', JSON.stringify(heatmapClasses, null, 2));

  // Click Trends
  const trendsTab = page.locator('button, [role="tab"]').filter({ hasText: /^Trends/i }).first();
  await trendsTab.click();
  await page.waitForTimeout(1500);

  const trendsDOM = await page.evaluate(() => {
    const section = document.querySelector('#industry') || document.querySelector('[class*="industry"]');
    if (!section) return 'no industry section';
    // Find highcharts
    const svgs = section.querySelectorAll('svg');
    const paths = section.querySelectorAll('path');
    return { svgCount: svgs.length, pathCount: paths.length, 
      classes: Array.from(section.querySelectorAll('[class*="highcharts"]')).slice(0,5).map(e => e.className) };
  });
  console.log('=== TRENDS DOM ===\n', JSON.stringify(trendsDOM, null, 2));

  // All highcharts paths with class
  const hcPaths = await page.evaluate(() => {
    const paths = document.querySelectorAll('path');
    return Array.from(paths).slice(0, 20).map(p => p.className?.baseVal || p.className);
  });
  console.log('=== ALL PATHS (first 20 classes) ===\n', JSON.stringify(hcPaths, null, 2));

  await browser.close();
})();
