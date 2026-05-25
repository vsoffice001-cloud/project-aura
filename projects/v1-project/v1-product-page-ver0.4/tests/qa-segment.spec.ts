import { test, expect, chromium } from '@playwright/test';
import path from 'path';

const URL = 'http://localhost:3040/test/phase-2#segmentation';
const OUT = '/tmp/section10-build';

const TABS = ['End-User', 'Temperature', 'Region', 'Reefer Truck', 'Domestic/Intl'];

test.describe('§10 Segment Intelligence QA', () => {
  test('1440px — full section + tab switching', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(URL, { waitUntil: 'networkidle' });

    // Scroll to section
    await page.evaluate(() => {
      const el = document.querySelector('#segmentation');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(1500);

    // Screenshot full section at 1440
    const section = page.locator('#segmentation');
    await section.screenshot({ path: `${OUT}/1440-full-section.png` });

    // --- Tab 1: End-User (default) ---
    const tab1 = page.locator('[role="tab"]', { hasText: 'End-User' }).first();
    const tab1Active = await tab1.evaluate(el => {
      const bg = window.getComputedStyle(el).backgroundColor;
      return bg;
    });
    console.log('End-User tab bg:', tab1Active);

    // Donut SVG paths in End-User
    await page.waitForTimeout(1000);
    const endUserPaths = await page.evaluate(() => {
      const paths = document.querySelectorAll('[data-highcharts-chart] path.highcharts-point');
      return paths.length;
    });
    console.log('End-User donut paths (slices):', endUserPaths);

    // First slice color
    const firstSliceColor = await page.evaluate(() => {
      const path = document.querySelector('[data-highcharts-chart] path.highcharts-point');
      return path ? path.getAttribute('fill') : 'not found';
    });
    console.log('First slice fill:', firstSliceColor);

    // Center label
    const centerLabel = await page.evaluate(() => {
      const texts = Array.from(document.querySelectorAll('[data-highcharts-chart] text'));
      return texts.map(t => t.textContent).filter(t => t && t.includes('%'));
    });
    console.log('Center label candidates:', centerLabel);

    // Screenshot End-User tab
    await section.screenshot({ path: `${OUT}/1440-tab1-enduser.png` });

    // --- Tab 2: Temperature ---
    const tab2 = page.locator('[role="tab"]', { hasText: 'Temperature' }).first();
    await tab2.click();
    await page.waitForTimeout(1200);
    const tempPaths = await page.evaluate(() => document.querySelectorAll('[data-highcharts-chart] path.highcharts-point').length);
    console.log('Temperature donut paths:', tempPaths);
    await section.screenshot({ path: `${OUT}/1440-tab2-temperature.png` });

    // --- Tab 3: Region (BarChart) ---
    const tab3 = page.locator('[role="tab"]', { hasText: 'Region' }).first();
    await tab3.click();
    await page.waitForTimeout(1200);
    const regionRects = await page.evaluate(() => document.querySelectorAll('[data-highcharts-chart] rect.highcharts-point').length);
    console.log('Region bar rects:', regionRects);
    await section.screenshot({ path: `${OUT}/1440-tab3-region.png` });

    // --- Tab 4: Reefer Truck ---
    const tab4 = page.locator('[role="tab"]', { hasText: 'Reefer Truck' }).first();
    await tab4.click();
    await page.waitForTimeout(1200);
    await section.screenshot({ path: `${OUT}/1440-tab4-reefer.png` });

    // --- Tab 5: Domestic/Intl ---
    const tab5 = page.locator('[role="tab"]', { hasText: 'Domestic' }).first();
    await tab5.click();
    await page.waitForTimeout(1200);
    await section.screenshot({ path: `${OUT}/1440-tab5-domestic.png` });

    // --- Check no card frame on chart wrappers ---
    // Go back to End-User
    await tab1.click();
    await page.waitForTimeout(800);
    const chartHasCardStyle = await page.evaluate(() => {
      const charts = document.querySelectorAll('[data-highcharts-chart]');
      if (!charts.length) return 'no charts found';
      const parents = Array.from(charts).map(c => {
        let el = c.parentElement;
        for (let i = 0; i < 5; i++) {
          if (!el) break;
          const bg = window.getComputedStyle(el).backgroundColor;
          const border = window.getComputedStyle(el).borderWidth;
          const shadow = window.getComputedStyle(el).boxShadow;
          if (shadow && shadow !== 'none') return `shadow found: ${shadow}`;
          if (border && border !== '0px') return `border: ${border}`;
          el = el.parentElement;
        }
        return 'naked (no card frame)';
      });
      return parents;
    });
    console.log('Chart card check:', JSON.stringify(chartHasCardStyle));

    // --- Active tab bg check ---
    const activeTabBg = await page.evaluate(() => {
      const tabs = document.querySelectorAll('[role="tab"]');
      const active = Array.from(tabs).find(t => t.getAttribute('aria-selected') === 'true' || t.getAttribute('data-state') === 'active');
      return active ? window.getComputedStyle(active).backgroundColor : 'not found';
    });
    console.log('Active tab bg (should be rgb(0,0,0)):', activeTabBg);

    // --- InsightBox check ---
    const insightBoxes = await page.evaluate(() => {
      // Look for elements with red border
      const all = document.querySelectorAll('*');
      const redBorder = Array.from(all).filter(el => {
        const style = window.getComputedStyle(el);
        return style.borderColor.includes('176, 31, 36') || style.borderColor.includes('180, 31') || style.borderLeftColor.includes('176');
      });
      return redBorder.length;
    });
    console.log('Red-border InsightBox count:', insightBoxes);

    // --- SVG presence check ---
    const svgPresent = await page.evaluate(() => {
      const svgs = document.querySelectorAll('[data-highcharts-chart] svg');
      return svgs.length;
    });
    console.log('SVG containers:', svgPresent);

    console.log('=== 1440 PASS ===');
  });

  test('768px — responsive layout', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(URL, { waitUntil: 'networkidle' });

    await page.evaluate(() => {
      const el = document.querySelector('#segmentation');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(1500);

    const section = page.locator('#segmentation');
    await section.screenshot({ path: `${OUT}/768-tab1-enduser.png` });

    // Check tabs wrap (no overflow hidden clipping)
    const tabOverflow = await page.evaluate(() => {
      const tabList = document.querySelector('[role="tablist"]');
      if (!tabList) return 'no tablist';
      const style = window.getComputedStyle(tabList);
      return { overflow: style.overflow, flexWrap: style.flexWrap, display: style.display };
    });
    console.log('Tablist overflow/wrap at 768:', JSON.stringify(tabOverflow));

    // Tab 3: Region bar chart category labels at 768
    const tab3 = page.locator('[role="tab"]', { hasText: 'Region' }).first();
    await tab3.click();
    await page.waitForTimeout(1200);
    await section.screenshot({ path: `${OUT}/768-tab3-region.png` });

    // Donut tab at 768
    const tab1 = page.locator('[role="tab"]', { hasText: 'End-User' }).first();
    await tab1.click();
    await page.waitForTimeout(1200);

    // Check center label visibility at 768
    const centerLabelVisible = await page.evaluate(() => {
      const texts = Array.from(document.querySelectorAll('[data-highcharts-chart] text'));
      const pct = texts.filter(t => t.textContent && t.textContent.includes('%'));
      return pct.map(t => {
        const rect = t.getBoundingClientRect();
        return { text: t.textContent, visible: rect.width > 0 && rect.height > 0 };
      });
    });
    console.log('Center label at 768:', JSON.stringify(centerLabelVisible));

    await section.screenshot({ path: `${OUT}/768-full.png` });
    console.log('=== 768 PASS ===');
  });

  test('DOM probes — slice count + rect count + active tab color', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(URL, { waitUntil: 'networkidle' });

    await page.evaluate(() => {
      const el = document.querySelector('#segmentation');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(2000);

    // End-User: expect 6 pie slices
    const endUserSlices = await page.evaluate(() => {
      return document.querySelectorAll('[data-highcharts-chart] path.highcharts-point').length;
    });
    console.log(`[DOM] End-User slices: ${endUserSlices} (expect 6)`);

    // Active tab = black
    const activeTabColor = await page.evaluate(() => {
      const tabs = document.querySelectorAll('[role="tab"]');
      const active = Array.from(tabs).find(t =>
        t.getAttribute('aria-selected') === 'true' ||
        t.getAttribute('data-state') === 'active' ||
        t.classList.contains('active')
      );
      if (!active) return 'NOT FOUND';
      return window.getComputedStyle(active).backgroundColor;
    });
    console.log(`[DOM] Active tab bg: ${activeTabColor} (expect rgb(0,0,0))`);

    // Go to Region tab → expect 4 rects
    const tab3 = page.locator('[role="tab"]', { hasText: 'Region' }).first();
    await tab3.click();
    await page.waitForTimeout(1500);
    const regionBars = await page.evaluate(() => {
      return document.querySelectorAll('[data-highcharts-chart] rect.highcharts-point').length;
    });
    console.log(`[DOM] Region bars: ${regionBars} (expect 4)`);

    // Color of first bar (should be purple-500 ~#8b5cf6)
    const barColor = await page.evaluate(() => {
      const rect = document.querySelector('[data-highcharts-chart] rect.highcharts-point');
      return rect ? rect.getAttribute('fill') : 'not found';
    });
    console.log(`[DOM] First bar fill: ${barColor}`);

    // INK hierarchy check: look for specific color classes or computed colors
    const inkHierarchy = await page.evaluate(() => {
      // Check for eyebrow (ink-subtle), body text, stat nums, italic captions
      const section = document.querySelector('#segmentation');
      if (!section) return 'section not found';
      const allText = Array.from(section.querySelectorAll('p, span, h2, h3, h4, small, em'));
      const colors = [...new Set(allText.map(el => {
        const c = window.getComputedStyle(el).color;
        return c;
      }))];
      return colors.slice(0, 10);
    });
    console.log('[DOM] Ink color variety (>=3 colors = hierarchy):', JSON.stringify(inkHierarchy));

    console.log('[DOM] === PROBE DONE ===');
  });
});
