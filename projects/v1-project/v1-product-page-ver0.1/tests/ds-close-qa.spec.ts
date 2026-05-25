import { test, expect, chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import path from 'path';
import fs from 'fs';

const BASE = 'http://localhost:3001';
const OUT = '/tmp/ds-close-qa';
fs.mkdirSync(OUT, { recursive: true });

const PAGES = [
  { name: 'sample', path: '/sample' },
  { name: 'case-study', path: '/case-study' },
  { name: 'report-store-listing', path: '/report-store-listing' },
];

const VIEWPORTS = [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'mobile', width: 390, height: 844 },
];

for (const pg of PAGES) {
  for (const vp of VIEWPORTS) {
    test(`screenshot · ${pg.name} · ${vp.label}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${BASE}${pg.path}`, { waitUntil: 'networkidle' });
      // scroll to bottom to trigger lazy loads
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1500);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      const file = path.join(OUT, `${pg.name}-${vp.label}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log(`SCREENSHOT: ${file}`);
    });
  }
}

for (const pg of PAGES) {
  test(`axe · ${pg.name}`, async ({ page }) => {
    await page.goto(`${BASE}${pg.path}`, { waitUntil: 'networkidle' });
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    const violations = results.violations;
    const out = path.join(OUT, `axe-${pg.name}.json`);
    fs.writeFileSync(out, JSON.stringify(violations, null, 2));
    console.log(`AXE · ${pg.name} · violations: ${violations.length}`);
    for (const v of violations) {
      console.log(`  [${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} nodes)`);
      for (const n of v.nodes.slice(0, 2)) {
        console.log(`    target: ${JSON.stringify(n.target)}`);
        console.log(`    html: ${n.html.substring(0, 120)}`);
      }
    }
  });
}

for (const pg of PAGES) {
  test(`visual-check · ${pg.name}`, async ({ page }) => {
    await page.goto(`${BASE}${pg.path}`, { waitUntil: 'networkidle' });

    // H1 font check
    const h1FontFamily = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      if (!h1) return 'MISSING_H1';
      return window.getComputedStyle(h1).fontFamily;
    });
    console.log(`FONT · ${pg.name} · h1: ${h1FontFamily}`);

    // body font check
    const bodyFont = await page.evaluate(() => {
      const p = document.querySelector('p, .body-text, main p');
      if (!p) return 'MISSING_P';
      return window.getComputedStyle(p).fontFamily;
    });
    console.log(`FONT · ${pg.name} · body: ${bodyFont}`);

    // eyebrow tracking
    const eyebrowTracking = await page.evaluate(() => {
      const el = document.querySelector('[class*="eyebrow"], [class*="label"], .eyebrow');
      if (!el) return 'NO_EYEBROW_FOUND';
      const st = window.getComputedStyle(el);
      return `ls=${st.letterSpacing} fw=${st.fontWeight} tt=${st.textTransform}`;
    });
    console.log(`EYEBROW · ${pg.name}: ${eyebrowTracking}`);

    // bg sequence - first 8 sections
    const bgSeq = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section, [data-section]'));
      return sections.slice(0, 12).map((s, i) => {
        const bg = window.getComputedStyle(s).backgroundColor;
        return `§${i+1}: ${bg}`;
      });
    });
    console.log(`BG-SEQ · ${pg.name}:\n  ${bgSeq.join('\n  ')}`);

    // heading order check
    const headings = await page.evaluate(() => {
      const hs = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6'));
      return hs.slice(0, 15).map(h => `${h.tagName}: "${h.textContent?.trim().substring(0,50)}"`);
    });
    console.log(`HEADINGS · ${pg.name}:\n  ${headings.join('\n  ')}`);
  });
}
