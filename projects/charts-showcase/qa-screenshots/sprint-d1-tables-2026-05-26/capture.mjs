/**
 * Sprint D.1 Tables QA Capture
 * Captures all variant × density × state screenshots for PropertyTable + RankingTable
 * DOM probe saved to tables-postfix-probe.json
 */

import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = __dirname;
const BASE_URL = 'http://localhost:3070';

async function shot(page, filename) {
  await page.screenshot({
    path: join(OUT, filename),
    fullPage: false,
  });
  console.log(`  ✓ ${filename}`);
}

async function fullShot(page, filename) {
  await page.screenshot({
    path: join(OUT, filename),
    fullPage: true,
  });
  console.log(`  ✓ ${filename}`);
}

// Click a variant toggle button by label text
async function selectVariant(page, tableSection, variantLabel) {
  // Look for toggle buttons within the section
  const btn = tableSection.locator(`button:has-text("${variantLabel}")`).first();
  if (await btn.count() > 0) {
    await btn.click();
    await page.waitForTimeout(300);
    return true;
  }
  // Try data attributes
  const btnData = tableSection.locator(`[data-variant="${variantLabel}"]`).first();
  if (await btnData.count() > 0) {
    await btnData.click();
    await page.waitForTimeout(300);
    return true;
  }
  return false;
}

// Click a density toggle button by label text
async function selectDensity(page, tableSection, densityLabel) {
  const btn = tableSection.locator(`button:has-text("${densityLabel}")`).first();
  if (await btn.count() > 0) {
    await btn.click();
    await page.waitForTimeout(300);
    return true;
  }
  return false;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  // Collect console errors
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  console.log('Navigating to localhost:3070...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // ─────────────────────────────────────────────
  // FIND PROPERTY TABLE SECTION
  // ─────────────────────────────────────────────
  console.log('\n── PropertyTable ──');

  // Scroll to PropertyTable section — look for heading
  const ptHeading = page.locator('text=PropertyTable').first();
  await ptHeading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // Get the section container
  const ptSection = page.locator('section').filter({ hasText: 'PropertyTable' }).first();
  if (await ptSection.count() === 0) {
    console.log('  WARNING: PropertyTable section not found via <section>. Trying div...');
  }

  // Capture full view of property table area
  await ptHeading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: join(OUT, 'propertytable-overview.png'), fullPage: false });
  console.log('  ✓ propertytable-overview.png');

  // ── VARIANTS ──
  const ptVariants = [
    { key: '01', name: 'card-wash', labels: ['card-wash', 'Card Wash', 'cardWash', 'wash'] },
    { key: '02', name: 'card-transparent', labels: ['card-transparent', 'Card Transparent', 'transparent'] },
    { key: '03', name: 'card-inverted', labels: ['card-inverted', 'Card Inverted', 'inverted'] },
    { key: '04', name: 'open-transparent', labels: ['open-transparent', 'Open Transparent', 'open transparent'] },
    { key: '05', name: 'card-sticky', labels: ['card-sticky', 'Card Sticky', 'sticky'] },
  ];

  for (const v of ptVariants) {
    let clicked = false;
    for (const label of v.labels) {
      const btn = page.locator(`button`).filter({ hasText: new RegExp(`^${label}$`, 'i') }).first();
      if (await btn.count() > 0) {
        await btn.scrollIntoViewIfNeeded();
        await btn.click();
        await page.waitForTimeout(400);
        clicked = true;
        break;
      }
      // Try partial match
      const btnPartial = page.locator(`button`).filter({ hasText: label }).first();
      if (await btnPartial.count() > 0) {
        await btnPartial.scrollIntoViewIfNeeded();
        await btnPartial.click();
        await page.waitForTimeout(400);
        clicked = true;
        break;
      }
    }

    // Scroll to PropertyTable heading to get it in frame
    await ptHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: join(OUT, `propertytable-variant-${v.key}-${v.name}.png`),
      fullPage: false
    });
    console.log(`  ✓ propertytable-variant-${v.key}-${v.name}.png ${clicked ? '' : '(click may have missed)'}`);
  }

  // ── DENSITIES ──
  const ptDensities = ['compact', 'standard', 'comfortable', 'spacious'];
  for (const d of ptDensities) {
    const btn = page.locator(`button`).filter({ hasText: new RegExp(d, 'i') }).first();
    if (await btn.count() > 0) {
      await btn.scrollIntoViewIfNeeded();
      await btn.click();
      await page.waitForTimeout(400);
    }
    await ptHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: join(OUT, `propertytable-density-${d}.png`),
      fullPage: false
    });
    console.log(`  ✓ propertytable-density-${d}.png`);
  }

  // ── STICKY VERIFICATION ──
  // Select sticky variant
  for (const label of ['card-sticky', 'sticky', 'Card Sticky']) {
    const btn = page.locator(`button`).filter({ hasText: label }).first();
    if (await btn.count() > 0) {
      await btn.scrollIntoViewIfNeeded();
      await btn.click();
      await page.waitForTimeout(500);
      break;
    }
  }
  await ptHeading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: join(OUT, 'propertytable-sticky-idle.png'), fullPage: false });
  console.log('  ✓ propertytable-sticky-idle.png');

  // Find the scrollable table container and scroll it
  const ptScrollable = page.locator('table').first();
  const ptContainer = page.locator('.overflow-auto, [style*="overflow"], [class*="scroll"]').first();

  // Try scrolling the table container
  await page.evaluate(() => {
    // Find table wrappers with overflow
    const containers = document.querySelectorAll('[class*="overflow"], [style*="overflow-y"]');
    for (const c of containers) {
      const rect = c.getBoundingClientRect();
      if (rect.height < 500 && c.scrollHeight > c.clientHeight) {
        c.scrollTop = 200;
      }
    }
    // Also try scrolling any element with max-height
    const maxHeightEls = document.querySelectorAll('[style*="max-height"], [class*="max-h-"]');
    for (const el of maxHeightEls) {
      if (el.scrollHeight > el.clientHeight) {
        el.scrollTop = 200;
      }
    }
  });
  await page.waitForTimeout(500);
  await ptHeading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(OUT, 'propertytable-sticky-scrolled.png'), fullPage: false });
  console.log('  ✓ propertytable-sticky-scrolled.png');

  // ── STATES ──
  // Look for empty/error state toggles near PropertyTable
  for (const state of ['empty', 'error']) {
    const stateBtn = page.locator(`button`).filter({ hasText: new RegExp(state, 'i') }).first();
    if (await stateBtn.count() > 0) {
      await stateBtn.scrollIntoViewIfNeeded();
      await stateBtn.click();
      await page.waitForTimeout(400);
      await ptHeading.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await page.screenshot({
        path: join(OUT, `propertytable-state-${state}.png`),
        fullPage: false
      });
      console.log(`  ✓ propertytable-state-${state}.png`);
      // Reset — click the state button again to toggle off, or look for a reset/normal button
      await stateBtn.click();
      await page.waitForTimeout(300);
    } else {
      // Take screenshot of area anyway to show current state
      await ptHeading.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await page.screenshot({
        path: join(OUT, `propertytable-state-${state}.png`),
        fullPage: false
      });
      console.log(`  ✓ propertytable-state-${state}.png (no toggle found, captured current)`);
    }
  }

  // ─────────────────────────────────────────────
  // FIND RANKING TABLE SECTION
  // ─────────────────────────────────────────────
  console.log('\n── RankingTable ──');

  const rtHeading = page.locator('text=RankingTable').first();
  if (await rtHeading.count() === 0) {
    // Try alternate heading
    const rtHeading2 = page.locator('text=Ranking Table').first();
    if (await rtHeading2.count() > 0) {
      await rtHeading2.scrollIntoViewIfNeeded();
    }
  } else {
    await rtHeading.scrollIntoViewIfNeeded();
  }
  await page.waitForTimeout(500);

  const rtAnchor = page.locator('text=RankingTable, text=Ranking Table').first();

  // Overview
  await page.screenshot({ path: join(OUT, 'rankingtable-overview.png'), fullPage: false });
  console.log('  ✓ rankingtable-overview.png');

  // Get all buttons visible now (in RankingTable area)
  // We need to find buttons that belong to the ranking table section
  // Strategy: scroll to RankingTable heading, then look at nearby buttons

  const rtVariants = [
    { key: '01', name: 'card-wash', labels: ['card-wash', 'Card Wash', 'wash'] },
    { key: '02', name: 'card-transparent', labels: ['card-transparent', 'Card Transparent', 'transparent'] },
    { key: '03', name: 'card-inverted', labels: ['card-inverted', 'Card Inverted', 'inverted'] },
    { key: '04', name: 'open-transparent', labels: ['open-transparent', 'Open Transparent', 'open transparent'] },
    { key: '05', name: 'card-sticky', labels: ['card-sticky', 'Card Sticky', 'sticky'] },
  ];

  for (const v of rtVariants) {
    let clicked = false;
    // Scroll to RT heading area first
    const rtH = page.locator('h2, h3').filter({ hasText: /ranking/i }).last();
    if (await rtH.count() > 0) {
      await rtH.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
    }

    for (const label of v.labels) {
      // Get all visible buttons and find one near the ranking table
      const allBtns = await page.locator('button').all();
      for (const btn of allBtns) {
        const text = await btn.textContent().catch(() => '');
        if (text && text.trim().toLowerCase().includes(label.toLowerCase())) {
          const isVisible = await btn.isVisible().catch(() => false);
          if (isVisible) {
            const box = await btn.boundingBox().catch(() => null);
            if (box) {
              // Check if button is in lower half of page (RT section)
              const vpHeight = 900;
              const scrollY = await page.evaluate(() => window.scrollY);
              const absoluteY = box.y + scrollY;
              // Just click the last matching button (should be in RT section)
              await btn.scrollIntoViewIfNeeded();
              await btn.click();
              await page.waitForTimeout(400);
              clicked = true;
              break;
            }
          }
        }
      }
      if (clicked) break;
    }

    const rtH2 = page.locator('h2, h3').filter({ hasText: /ranking/i }).last();
    if (await rtH2.count() > 0) {
      await rtH2.scrollIntoViewIfNeeded();
    }
    await page.waitForTimeout(300);
    await page.screenshot({
      path: join(OUT, `rankingtable-variant-${v.key}-${v.name}.png`),
      fullPage: false
    });
    console.log(`  ✓ rankingtable-variant-${v.key}-${v.name}.png ${clicked ? '' : '(click may have missed)'}`);
  }

  // RT Densities
  for (const d of ['compact', 'standard', 'comfortable', 'spacious']) {
    const rtH2 = page.locator('h2, h3').filter({ hasText: /ranking/i }).last();
    if (await rtH2.count() > 0) {
      await rtH2.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
    }
    // Find density button in visible area
    const allBtns = await page.locator('button').all();
    for (const btn of allBtns) {
      const text = await btn.textContent().catch(() => '');
      if (text && text.trim().toLowerCase() === d) {
        const isVisible = await btn.isVisible().catch(() => false);
        if (isVisible) {
          await btn.click();
          await page.waitForTimeout(400);
          break;
        }
      }
    }
    const rtH3 = page.locator('h2, h3').filter({ hasText: /ranking/i }).last();
    if (await rtH3.count() > 0) {
      await rtH3.scrollIntoViewIfNeeded();
    }
    await page.waitForTimeout(300);
    await page.screenshot({
      path: join(OUT, `rankingtable-density-${d}.png`),
      fullPage: false
    });
    console.log(`  ✓ rankingtable-density-${d}.png`);
  }

  // RT Sticky
  const rtH4 = page.locator('h2, h3').filter({ hasText: /ranking/i }).last();
  if (await rtH4.count() > 0) {
    await rtH4.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
  }
  // Click sticky variant for RT
  const allBtns2 = await page.locator('button').all();
  for (const btn of allBtns2) {
    const text = await btn.textContent().catch(() => '');
    if (text && (text.trim().toLowerCase().includes('sticky') || text.trim().toLowerCase() === 'card-sticky')) {
      const isVisible = await btn.isVisible().catch(() => false);
      if (isVisible) {
        await btn.click();
        await page.waitForTimeout(400);
        break;
      }
    }
  }
  const rtH5 = page.locator('h2, h3').filter({ hasText: /ranking/i }).last();
  if (await rtH5.count() > 0) await rtH5.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(OUT, 'rankingtable-sticky-idle.png'), fullPage: false });
  console.log('  ✓ rankingtable-sticky-idle.png');

  await page.evaluate(() => {
    const containers = document.querySelectorAll('[class*="overflow"], [style*="overflow-y"]');
    for (const c of containers) {
      if (c.scrollHeight > c.clientHeight + 50) {
        c.scrollTop = 200;
      }
    }
    const maxHeightEls = document.querySelectorAll('[style*="max-height"]');
    for (const el of maxHeightEls) {
      if (el.scrollHeight > el.clientHeight + 50) {
        el.scrollTop = 200;
      }
    }
  });
  await page.waitForTimeout(500);
  if (await rtH5.count() > 0) await rtH5.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(OUT, 'rankingtable-sticky-scrolled.png'), fullPage: false });
  console.log('  ✓ rankingtable-sticky-scrolled.png');

  // RT States
  for (const state of ['empty', 'error']) {
    const rtH6 = page.locator('h2, h3').filter({ hasText: /ranking/i }).last();
    if (await rtH6.count() > 0) {
      await rtH6.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
    }
    const stateBtn = page.locator(`button`).filter({ hasText: new RegExp(state, 'i') }).first();
    if (await stateBtn.count() > 0) {
      const isVisible = await stateBtn.isVisible().catch(() => false);
      if (isVisible) {
        await stateBtn.click();
        await page.waitForTimeout(400);
      }
    }
    if (await rtH6.count() > 0) await rtH6.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: join(OUT, `rankingtable-state-${state}.png`),
      fullPage: false
    });
    console.log(`  ✓ rankingtable-state-${state}.png`);
  }

  // ─────────────────────────────────────────────
  // POLISH CLOSE-UPS
  // ─────────────────────────────────────────────
  console.log('\n── Polish close-ups ──');

  // Reset to card-wash for polish shots
  await ptHeading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  for (const label of ['card-wash', 'wash', 'Card Wash']) {
    const btn = page.locator(`button`).filter({ hasText: label }).first();
    if (await btn.count() > 0 && await btn.isVisible()) {
      await btn.click();
      await page.waitForTimeout(400);
      break;
    }
  }

  // Header wash close-up — crop to just thead
  const th = page.locator('thead').first();
  if (await th.count() > 0) {
    await th.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const thBox = await th.boundingBox();
    if (thBox) {
      await page.screenshot({
        path: join(OUT, 'polish-header-wash.png'),
        clip: {
          x: Math.max(0, thBox.x - 20),
          y: Math.max(0, thBox.y - 10),
          width: Math.min(thBox.width + 40, 1440),
          height: thBox.height + 20,
        }
      });
      console.log('  ✓ polish-header-wash.png');
    }
  } else {
    await ptHeading.scrollIntoViewIfNeeded();
    await page.screenshot({ path: join(OUT, 'polish-header-wash.png'), fullPage: false });
    console.log('  ✓ polish-header-wash.png (full viewport fallback)');
  }

  // Switch to inverted for header inverted shot
  for (const label of ['card-inverted', 'inverted', 'Card Inverted']) {
    const btn = page.locator(`button`).filter({ hasText: label }).first();
    if (await btn.count() > 0 && await btn.isVisible()) {
      await btn.click();
      await page.waitForTimeout(400);
      break;
    }
  }
  const thInv = page.locator('thead').first();
  if (await thInv.count() > 0) {
    await thInv.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const thBox = await thInv.boundingBox();
    if (thBox) {
      await page.screenshot({
        path: join(OUT, 'polish-header-inverted.png'),
        clip: {
          x: Math.max(0, thBox.x - 20),
          y: Math.max(0, thBox.y - 10),
          width: Math.min(thBox.width + 40, 1440),
          height: thBox.height + 20,
        }
      });
      console.log('  ✓ polish-header-inverted.png');
    }
  } else {
    await page.screenshot({ path: join(OUT, 'polish-header-inverted.png'), fullPage: false });
    console.log('  ✓ polish-header-inverted.png (full viewport fallback)');
  }

  // Comfortable density row close-up
  for (const label of ['comfortable', 'Comfortable']) {
    const btn = page.locator(`button`).filter({ hasText: new RegExp(`^${label}$`, 'i') }).first();
    if (await btn.count() > 0 && await btn.isVisible()) {
      await btn.click();
      await page.waitForTimeout(400);
      break;
    }
  }
  const comfRow = page.locator('tbody tr').first();
  if (await comfRow.count() > 0) {
    await comfRow.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const rowBox = await comfRow.boundingBox();
    if (rowBox) {
      await page.screenshot({
        path: join(OUT, 'polish-cell-padding-comfortable.png'),
        clip: {
          x: Math.max(0, rowBox.x - 10),
          y: Math.max(0, rowBox.y - 5),
          width: Math.min(rowBox.width + 20, 1440),
          height: Math.min(rowBox.height * 3, 300),
        }
      });
      console.log('  ✓ polish-cell-padding-comfortable.png');
    }
  } else {
    await page.screenshot({ path: join(OUT, 'polish-cell-padding-comfortable.png'), fullPage: false });
    console.log('  ✓ polish-cell-padding-comfortable.png (fallback)');
  }

  // Compact density row close-up
  for (const label of ['compact', 'Compact']) {
    const btn = page.locator(`button`).filter({ hasText: new RegExp(`^${label}$`, 'i') }).first();
    if (await btn.count() > 0 && await btn.isVisible()) {
      await btn.click();
      await page.waitForTimeout(400);
      break;
    }
  }
  const compRow = page.locator('tbody tr').first();
  if (await compRow.count() > 0) {
    await compRow.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const rowBox = await compRow.boundingBox();
    if (rowBox) {
      await page.screenshot({
        path: join(OUT, 'polish-cell-padding-compact.png'),
        clip: {
          x: Math.max(0, rowBox.x - 10),
          y: Math.max(0, rowBox.y - 5),
          width: Math.min(rowBox.width + 20, 1440),
          height: Math.min(rowBox.height * 3, 200),
        }
      });
      console.log('  ✓ polish-cell-padding-compact.png');
    }
  } else {
    await page.screenshot({ path: join(OUT, 'polish-cell-padding-compact.png'), fullPage: false });
    console.log('  ✓ polish-cell-padding-compact.png (fallback)');
  }

  // ─────────────────────────────────────────────
  // DOM PROBE
  // ─────────────────────────────────────────────
  console.log('\n── DOM Probe ──');

  // For the probe, we need to check each variant's DOM values
  // Reset to card-wash first
  await ptHeading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  for (const label of ['card-wash', 'Card Wash']) {
    const btn = page.locator(`button`).filter({ hasText: label }).first();
    if (await btn.count() > 0 && await btn.isVisible()) {
      await btn.click();
      await page.waitForTimeout(400);
      break;
    }
  }

  const probe = await page.evaluate(() => {
    const results = {};

    // Helper to get computed style safely
    function cs(el, prop) {
      if (!el) return 'null';
      return window.getComputedStyle(el).getPropertyValue(prop).trim();
    }

    // PropertyTable probe
    const ptTables = document.querySelectorAll('table');
    const ptProbes = [];
    for (let i = 0; i < Math.min(ptTables.length, 2); i++) {
      const table = ptTables[i];
      const thead = table.querySelector('thead');
      const th = thead ? thead.querySelector('th') : null;
      const tbody = table.querySelector('tbody');
      const firstTr = tbody ? tbody.querySelector('tr') : null;
      const firstTd = firstTr ? firstTr.querySelector('td') : null;
      const allTds = tbody ? tbody.querySelectorAll('td') : [];
      const lastTd = allTds.length > 0 ? allTds[allTds.length - 1] : null;

      // Get rect for sticky check
      let thTop = null;
      if (th) {
        const rect = th.getBoundingClientRect();
        thTop = rect.top;
      }

      ptProbes.push({
        tableIndex: i,
        thBg: th ? cs(th, 'background-color') : 'no th',
        thColor: th ? cs(th, 'color') : 'no th',
        thPosition: th ? cs(th, 'position') : 'no th',
        thBorderBottom: th ? cs(th, 'border-bottom') : 'no th',
        thRectTop: thTop,
        firstTdPadding: firstTd ? cs(firstTd, 'padding') : 'no td',
        firstTdPaddingTop: firstTd ? cs(firstTd, 'padding-top') : 'no td',
        firstTdPaddingLeft: firstTd ? cs(firstTd, 'padding-left') : 'no td',
        firstTdFontSize: firstTd ? cs(firstTd, 'font-size') : 'no td',
        firstTrHeight: firstTr ? cs(firstTr, 'height') : 'no tr',
        lastTdBorderBottom: lastTd ? cs(lastTd, 'border-bottom') : 'no td',
        tableScrollHeight: table.scrollHeight,
        tableClientHeight: table.clientHeight,
        // Check parent for overflow/max-height
        parentOverflow: table.parentElement ? cs(table.parentElement, 'overflow-y') : 'no parent',
        parentMaxHeight: table.parentElement ? cs(table.parentElement, 'max-height') : 'no parent',
      });
    }
    results.tables = ptProbes;

    // Count total tables
    results.totalTables = ptTables.length;

    // Check for empty state elements
    results.emptyStateFound = document.querySelectorAll('[class*="empty"], [data-state="empty"]').length > 0;
    results.errorStateFound = document.querySelectorAll('[class*="error"], [data-state="error"]').length > 0;

    // Check for toggle buttons
    const allButtons = document.querySelectorAll('button');
    const buttonTexts = Array.from(allButtons).map(b => b.textContent?.trim()).filter(Boolean);
    results.buttonTexts = buttonTexts;

    return results;
  });

  // Save probe JSON
  writeFileSync(
    join(OUT, 'tables-postfix-probe.json'),
    JSON.stringify({ timestamp: new Date().toISOString(), probe, consoleErrors }, null, 2)
  );
  console.log('  ✓ tables-postfix-probe.json saved');
  console.log(`  Button texts found: ${probe.buttonTexts?.slice(0, 20).join(' | ')}`);
  console.log(`  Total tables: ${probe.totalTables}`);
  if (probe.tables?.length > 0) {
    const t0 = probe.tables[0];
    console.log(`  Table[0] thBg: ${t0.thBg}`);
    console.log(`  Table[0] firstTdPadding: ${t0.firstTdPadding}`);
    console.log(`  Table[0] firstTdFontSize: ${t0.firstTdFontSize}`);
    console.log(`  Table[0] thPosition: ${t0.thPosition}`);
  }

  // ─────────────────────────────────────────────
  // FULL PAGE SCROLL THEN OVERVIEW
  // ─────────────────────────────────────────────
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  console.log(`\n── Console errors: ${consoleErrors.length} ──`);
  if (consoleErrors.length > 0) {
    consoleErrors.slice(0, 5).forEach(e => console.log(`  ERROR: ${e}`));
  }

  await browser.close();
  console.log('\n── DONE ──');
}

main().catch(e => {
  console.error('FATAL:', e);
  process.exit(1);
});
