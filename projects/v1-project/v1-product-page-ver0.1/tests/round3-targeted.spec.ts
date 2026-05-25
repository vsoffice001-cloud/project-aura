import { test } from '@playwright/test';
import * as fs from 'fs';

const OUT = '/Users/vishalchauchan/Downloads/Anti-folder01/qa-screenshots/v2n-round3-deep';
const NEW_URL = 'http://localhost:3000/reports/australia-cold-chain-market-2022-2027';
const LEGACY_URL = 'http://localhost:3020/';

test('targeted — hover states + bg alternation + table rows + form inputs', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(NEW_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Section bg alternation
  const bgAlternation = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section, [class*="Section"]'));
    return sections.slice(0,10).map(s => ({
      bg: getComputedStyle(s).backgroundColor,
      class: s.className.substring(0,70)
    }));
  });
  fs.writeFileSync(`${OUT}/new-bg-alternation.json`, JSON.stringify(bgAlternation, null, 2));

  // Hover state probe — simulate hover on primary CTA button
  const ctaBtn = page.locator('button, a[href]').filter({ hasText: /buy|purchase|get report|download|access|price/i }).first();
  const ctaExists = await ctaBtn.count();
  let hoverData: any = { found: false };
  if (ctaExists > 0) {
    const before = await ctaBtn.evaluate(el => ({
      bg: getComputedStyle(el).backgroundColor,
      color: getComputedStyle(el).color,
      transform: getComputedStyle(el).transform,
      boxShadow: getComputedStyle(el).boxShadow
    }));
    await ctaBtn.hover();
    await page.waitForTimeout(300);
    const after = await ctaBtn.evaluate(el => ({
      bg: getComputedStyle(el).backgroundColor,
      color: getComputedStyle(el).color,
      transform: getComputedStyle(el).transform,
      boxShadow: getComputedStyle(el).boxShadow
    }));
    hoverData = { found: true, before, after };
  }

  // Also probe card hover — find first card
  const card = page.locator('[class*="card"], [class*="Card"]').first();
  const cardExists = await card.count();
  let cardHoverData: any = { found: false };
  if (cardExists > 0) {
    const before = await card.evaluate(el => ({
      bg: getComputedStyle(el).backgroundColor,
      boxShadow: getComputedStyle(el).boxShadow,
      transform: getComputedStyle(el).transform,
      border: getComputedStyle(el).border
    }));
    await card.hover();
    await page.waitForTimeout(300);
    const after = await card.evaluate(el => ({
      bg: getComputedStyle(el).backgroundColor,
      boxShadow: getComputedStyle(el).boxShadow,
      transform: getComputedStyle(el).transform,
      border: getComputedStyle(el).border
    }));
    cardHoverData = { found: true, before, after };
  }

  // Table row zebra — detailed
  const tableData = await page.evaluate(() => {
    const tables = Array.from(document.querySelectorAll('table'));
    return tables.map(t => {
      const rows = Array.from(t.querySelectorAll('tr'));
      const header = t.querySelector('th, thead tr');
      return {
        class: t.className.substring(0,60),
        headerBg: header ? getComputedStyle(header).backgroundColor : 'none',
        headerColor: header ? getComputedStyle(header).color : 'none',
        headerFontWeight: header ? getComputedStyle(header).fontWeight : 'none',
        rows: rows.slice(0,5).map((r, i) => ({
          i,
          bg: getComputedStyle(r).backgroundColor,
          height: getComputedStyle(r).height,
          borderBottom: getComputedStyle(r).borderBottom
        }))
      };
    });
  });

  // Search/form input probe
  const searchInput = page.locator('input[type="text"], input[type="search"], input[placeholder]').first();
  const searchExists = await searchInput.count();
  let formData: any = { found: false };
  if (searchExists > 0) {
    const before = await searchInput.evaluate(el => ({
      height: getComputedStyle(el).height,
      border: getComputedStyle(el).border,
      borderRadius: getComputedStyle(el).borderRadius,
      padding: getComputedStyle(el).padding,
      bg: getComputedStyle(el).backgroundColor,
      fontSize: getComputedStyle(el).fontSize
    }));
    await searchInput.click();
    await page.waitForTimeout(200);
    const after = await searchInput.evaluate(el => ({
      outline: getComputedStyle(el).outline,
      boxShadow: getComputedStyle(el).boxShadow,
      border: getComputedStyle(el).border
    }));
    formData = { found: true, before, focused: after };
  }

  // Navigation chip states
  const navChips = await page.evaluate(() => {
    const chips = Array.from(document.querySelectorAll('[class*="sticky"] a, [class*="Sticky"] a, [class*="tab"] a, [class*="Tab"] a'));
    return chips.slice(0,6).map(c => ({
      padding: getComputedStyle(c).padding,
      bg: getComputedStyle(c).backgroundColor,
      fontSize: getComputedStyle(c).fontSize,
      border: getComputedStyle(c).border,
      color: getComputedStyle(c).color,
      text: c.textContent?.trim()?.substring(0,30)
    }));
  });

  fs.writeFileSync(`${OUT}/new-targeted.json`, JSON.stringify({
    hoverData, cardHoverData, tableData, formData, navChips
  }, null, 2));

  // Take section-level screenshots
  await page.screenshot({ path: `${OUT}/new-1440-hero-zone.png`, clip: { x: 0, y: 0, width: 1440, height: 700 } });
  await page.evaluate(() => window.scrollTo(0, 700));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/new-1440-keystats-zone.png`, clip: { x: 0, y: 0, width: 1440, height: 700 } });
  await page.evaluate(() => window.scrollTo(0, 1400));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/new-1440-toc-zone.png`, clip: { x: 0, y: 0, width: 1440, height: 700 } });
});

test('targeted — legacy hover + bg + form', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(LEGACY_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  const bgAlternation = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section, [class*="Section"]'));
    return sections.slice(0,10).map(s => ({
      bg: getComputedStyle(s).backgroundColor,
      class: s.className.substring(0,70)
    }));
  });
  fs.writeFileSync(`${OUT}/legacy-bg-alternation.json`, JSON.stringify(bgAlternation, null, 2));

  const ctaBtn = page.locator('button, a[href]').filter({ hasText: /buy|purchase|get report|download|access|price/i }).first();
  const ctaExists = await ctaBtn.count();
  let hoverData: any = { found: false };
  if (ctaExists > 0) {
    const before = await ctaBtn.evaluate(el => ({
      bg: getComputedStyle(el).backgroundColor,
      color: getComputedStyle(el).color,
      transform: getComputedStyle(el).transform,
      boxShadow: getComputedStyle(el).boxShadow
    }));
    await ctaBtn.hover();
    await page.waitForTimeout(300);
    const after = await ctaBtn.evaluate(el => ({
      bg: getComputedStyle(el).backgroundColor,
      color: getComputedStyle(el).color,
      transform: getComputedStyle(el).transform,
      boxShadow: getComputedStyle(el).boxShadow
    }));
    hoverData = { found: true, before, after };
  }

  const searchInput = page.locator('input[type="text"], input[type="search"], input[placeholder]').first();
  const searchExists = await searchInput.count();
  let formData: any = { found: false };
  if (searchExists > 0) {
    const before = await searchInput.evaluate(el => ({
      height: getComputedStyle(el).height,
      border: getComputedStyle(el).border,
      borderRadius: getComputedStyle(el).borderRadius,
      padding: getComputedStyle(el).padding,
      bg: getComputedStyle(el).backgroundColor,
      fontSize: getComputedStyle(el).fontSize
    }));
    await searchInput.click();
    await page.waitForTimeout(200);
    const after = await searchInput.evaluate(el => ({
      outline: getComputedStyle(el).outline,
      boxShadow: getComputedStyle(el).boxShadow,
      border: getComputedStyle(el).border
    }));
    formData = { found: true, before, focused: after };
  }

  const navChips = await page.evaluate(() => {
    const chips = Array.from(document.querySelectorAll('[class*="sticky"] a, [class*="Sticky"] a, [class*="tab"] a, [class*="Tab"] a'));
    return chips.slice(0,6).map(c => ({
      padding: getComputedStyle(c).padding,
      bg: getComputedStyle(c).backgroundColor,
      fontSize: getComputedStyle(c).fontSize,
      border: getComputedStyle(c).border,
      color: getComputedStyle(c).color,
      text: c.textContent?.trim()?.substring(0,30)
    }));
  });

  fs.writeFileSync(`${OUT}/legacy-targeted.json`, JSON.stringify({
    hoverData, formData, navChips
  }, null, 2));

  await page.screenshot({ path: `${OUT}/legacy-1440-hero-zone.png`, clip: { x: 0, y: 0, width: 1440, height: 700 } });
  await page.evaluate(() => window.scrollTo(0, 700));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/legacy-1440-keystats-zone.png`, clip: { x: 0, y: 0, width: 1440, height: 700 } });
  await page.evaluate(() => window.scrollTo(0, 1400));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/legacy-1440-toc-zone.png`, clip: { x: 0, y: 0, width: 1440, height: 700 } });
});
