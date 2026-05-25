import { test } from '@playwright/test';

const URL = 'http://localhost:3040/test/phase-2#segmentation';
const OUT = '/tmp/section10-build';

test('deep probe', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(URL, { waitUntil: 'networkidle' });

  await page.evaluate(() => {
    const el = document.querySelector('#segmentation');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(2000);

  // How many highcharts instances total?
  const chartCount = await page.evaluate(() => {
    return document.querySelectorAll('[data-highcharts-chart]').length;
  });
  console.log('Total Highcharts instances:', chartCount);

  // All path classes in first chart
  const pathDetails = await page.evaluate(() => {
    const charts = document.querySelectorAll('[data-highcharts-chart]');
    return Array.from(charts).map((c, i) => {
      const paths = c.querySelectorAll('path');
      const classes = [...new Set(Array.from(paths).map(p => p.className.baseVal))];
      return { chart: i, pathClasses: classes, pathCount: paths.length };
    });
  });
  console.log('Path classes per chart:', JSON.stringify(pathDetails, null, 2));

  // Check if bar chart uses <rect> with different classes or attr
  const allRects = await page.evaluate(() => {
    const charts = document.querySelectorAll('[data-highcharts-chart]');
    return Array.from(charts).map((c, i) => {
      const rects = c.querySelectorAll('rect');
      const classes = [...new Set(Array.from(rects).map(r => r.className.baseVal))];
      return { chart: i, rectClasses: classes, rectCount: rects.length };
    });
  });
  console.log('Rect classes per chart:', JSON.stringify(allRects, null, 2));

  // Check center label - all text in donut chart
  const allTextInCharts = await page.evaluate(() => {
    const charts = document.querySelectorAll('[data-highcharts-chart]');
    return Array.from(charts).slice(0, 2).map((c, i) => {
      const texts = Array.from(c.querySelectorAll('text, tspan'));
      return { chart: i, texts: texts.map(t => t.textContent?.trim()).filter(Boolean).slice(0, 20) };
    });
  });
  console.log('Text in charts:', JSON.stringify(allTextInCharts, null, 2));

  // Navigate to Region, check bar chart DOM
  const tab3 = page.locator('[role="tab"]', { hasText: 'Region' }).first();
  await tab3.click();
  await page.waitForTimeout(2000);

  const regionChartDetails = await page.evaluate(() => {
    const charts = document.querySelectorAll('[data-highcharts-chart]');
    return Array.from(charts).map((c, i) => {
      const allEls = {
        paths: c.querySelectorAll('path').length,
        rects: c.querySelectorAll('rect').length,
        pointPaths: c.querySelectorAll('path.highcharts-point').length,
        pointRects: c.querySelectorAll('rect.highcharts-point').length,
        allPathFills: Array.from(c.querySelectorAll('path')).map(p => p.getAttribute('fill')).filter(Boolean).slice(0, 5),
        allRectFills: Array.from(c.querySelectorAll('rect')).map(r => r.getAttribute('fill')).filter(Boolean).slice(0, 5),
      };
      return { chart: i, ...allEls };
    });
  });
  console.log('Region chart details:', JSON.stringify(regionChartDetails, null, 2));

  // Screenshot Region at 1440
  const section = page.locator('#segmentation');
  await section.screenshot({ path: `${OUT}/1440-tab3-region-probe.png` });

  // Screenshot Reefer at 1440
  const tab4 = page.locator('[role="tab"]', { hasText: 'Reefer Truck' }).first();
  await tab4.click();
  await page.waitForTimeout(1500);
  await section.screenshot({ path: `${OUT}/1440-tab4-reefer-probe.png` });

  // Screenshot Domestic at 1440
  const tab5 = page.locator('[role="tab"]', { hasText: 'Domestic' }).first();
  await tab5.click();
  await page.waitForTimeout(1500);
  await section.screenshot({ path: `${OUT}/1440-tab5-domestic-probe.png` });

  // Back to End-User, check center label element
  const tab1 = page.locator('[role="tab"]', { hasText: 'End-User' }).first();
  await tab1.click();
  await page.waitForTimeout(1500);
  await section.screenshot({ path: `${OUT}/1440-tab1-enduser-probe.png` });

  // Check for center overlay element (non-SVG center label)
  const centerOverlay = await page.evaluate(() => {
    const section = document.querySelector('#segmentation');
    if (!section) return 'no section';
    // Look for absolute positioned elements that might be center label
    const allEls = Array.from(section.querySelectorAll('*'));
    const absolute = allEls.filter(el => {
      const pos = window.getComputedStyle(el).position;
      return pos === 'absolute';
    });
    return absolute.map(el => ({
      tag: el.tagName,
      text: el.textContent?.trim()?.slice(0, 50),
      className: el.className?.toString()?.slice(0, 80),
    })).slice(0, 20);
  });
  console.log('Absolute positioned (center label candidates):', JSON.stringify(centerOverlay, null, 2));

  // InsightBox border color details
  const insightDetail = await page.evaluate(() => {
    const section = document.querySelector('#segmentation');
    if (!section) return [];
    const all = Array.from(section.querySelectorAll('*'));
    return all.filter(el => {
      const bc = window.getComputedStyle(el).borderLeftColor;
      return bc && bc.includes('176');
    }).map(el => ({
      tag: el.tagName,
      text: el.textContent?.trim()?.slice(0, 60),
      borderLeft: window.getComputedStyle(el).borderLeftColor,
      borderWidth: window.getComputedStyle(el).borderLeftWidth,
    })).slice(0, 5);
  });
  console.log('InsightBox border details:', JSON.stringify(insightDetail, null, 2));
});
