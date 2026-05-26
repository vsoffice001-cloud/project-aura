/**
 * Sprint D.1 Tables QA Capture v3
 * Properly navigates to PropertyTable and RankingTable sections.
 * Key insight: sidebar nav clicks anchor the main scroller. After click,
 * scroll main content to top to see the section heading.
 */

import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = __dirname;
const BASE_URL = 'http://localhost:3070';

async function shot(page, filename, clip) {
  const opts = { path: join(OUT, filename), fullPage: false };
  if (clip) opts.clip = clip;
  await page.screenshot(opts);
  console.log(`  ✓ ${filename}`);
}

// Scroll main content area to top
async function scrollMainTop(page) {
  await page.evaluate(() => {
    const main = document.querySelector('main');
    if (main) main.scrollTop = 0;
    // Also try the first overflow container
    const overflows = document.querySelectorAll('.overflow-y-auto, [class*="overflow-y-auto"]');
    overflows.forEach(el => { el.scrollTop = 0; });
  });
  await page.waitForTimeout(150);
}

// Click sidebar nav item
async function navTo(page, label) {
  // Try sidebar links/buttons
  const sidebar = page.locator('nav, aside').first();
  const link = sidebar.locator(`a, button`).filter({ hasText: new RegExp(`^${label}$`) }).first();
  if (await link.count() > 0) {
    await link.click();
    await page.waitForTimeout(700);
    return true;
  }
  return false;
}

// Click a control button by exact text — prefer buttons in the ACTIVE SECTION
// (below the visible heading, excluding section above)
async function clickControl(page, text) {
  // Get all visible buttons
  const buttons = await page.locator('button').all();
  for (const btn of buttons) {
    if (!await btn.isVisible().catch(() => false)) continue;
    const txt = (await btn.textContent().catch(() => '')).trim();
    if (txt.toLowerCase() === text.toLowerCase()) {
      await btn.click();
      await page.waitForTimeout(350);
      return true;
    }
  }
  return false;
}

// DOM probe for visible tables
async function probeVisibleTable(page, label) {
  return await page.evaluate((label) => {
    // Find first visible table
    let targetTable = null;
    for (const t of document.querySelectorAll('table')) {
      const rect = t.getBoundingClientRect();
      if (rect.width > 100 && rect.height > 20) {
        targetTable = t;
        break;
      }
    }
    if (!targetTable) return { label, error: 'no visible table' };

    const thead = targetTable.querySelector('thead');
    const th = thead ? thead.querySelector('th') : null;
    const tbody = targetTable.querySelector('tbody');
    const firstTr = tbody ? tbody.querySelector('tr') : null;
    const firstTd = firstTr ? firstTr.querySelector('td') : null;
    const allTds = tbody ? tbody.querySelectorAll('td') : [];
    const lastTd = allTds.length > 0 ? allTds[allTds.length - 1] : null;

    function cs(el, prop) {
      if (!el) return 'null';
      return window.getComputedStyle(el).getPropertyValue(prop).trim();
    }

    // Find scroll parent
    let scrollParent = targetTable.parentElement;
    for (let i = 0; i < 8 && scrollParent; i++) {
      const ov = window.getComputedStyle(scrollParent);
      if ((ov.overflowY === 'auto' || ov.overflowY === 'scroll') &&
          scrollParent.scrollHeight > scrollParent.clientHeight + 5) {
        break;
      }
      scrollParent = scrollParent.parentElement;
    }

    return {
      label,
      thBg: cs(th, 'background-color'),
      thColor: cs(th, 'color'),
      thPosition: cs(th, 'position'),
      thTop: cs(th, 'top'),
      thBorderBottom: cs(th, 'border-bottom'),
      thRectTop: th ? th.getBoundingClientRect().top : null,
      thRectHeight: th ? th.getBoundingClientRect().height : null,
      firstTdPadding: cs(firstTd, 'padding'),
      firstTdPaddingTop: cs(firstTd, 'padding-top'),
      firstTdPaddingLeft: cs(firstTd, 'padding-left'),
      firstTdFontSize: cs(firstTd, 'font-size'),
      firstTrHeight: firstTr ? firstTr.getBoundingClientRect().height : null,
      lastTdBorderBottom: cs(lastTd, 'border-bottom'),
      scrollParentMaxHeight: scrollParent ? cs(scrollParent, 'max-height') : 'no-scroll-parent',
      scrollParentOverflowY: scrollParent ? cs(scrollParent, 'overflow-y') : 'no-scroll-parent',
      scrollParentScrollH: scrollParent ? scrollParent.scrollHeight : 0,
      scrollParentClientH: scrollParent ? scrollParent.clientHeight : 0,
      scrollParentCurrentTop: scrollParent ? scrollParent.scrollTop : 0,
    };
  }, label);
}

// Scroll the table's internal scroll container by scrollTop
async function scrollTableContainer(page, scrollTop) {
  return await page.evaluate((scrollTop) => {
    const tables = document.querySelectorAll('table');
    for (const table of tables) {
      const rect = table.getBoundingClientRect();
      if (rect.width < 100) continue;
      // Walk up to find scroll container with actual overflow
      let parent = table.parentElement;
      for (let i = 0; i < 8 && parent; i++) {
        const cs = window.getComputedStyle(parent);
        if ((cs.overflowY === 'auto' || cs.overflowY === 'scroll' || cs.overflow === 'auto') &&
            parent.scrollHeight > parent.clientHeight + 5) {
          parent.scrollTop = scrollTop;
          return { scrolled: true, maxH: cs.maxHeight, scrollH: parent.scrollHeight, clientH: parent.clientHeight };
        }
        parent = parent.parentElement;
      }
    }
    return { scrolled: false };
  }, scrollTop);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // ══════════════════════════════════════════════════
  // PROPERTY TABLE
  // ══════════════════════════════════════════════════
  console.log('\n═══ PropertyTable ═══');

  await navTo(page, 'PropertyTable');
  // After nav, scroll main to top to see section heading
  await scrollMainTop(page);
  await page.waitForTimeout(300);
  await shot(page, 'pt-nav-check.png');

  // Probe initial (default state)
  const ptInitial = await probeVisibleTable(page, 'PT-initial');
  console.log(`  initial → thBg:${ptInitial.thBg} pad:${ptInitial.firstTdPadding} font:${ptInitial.firstTdFontSize}`);

  // ── VARIANTS (all 5) ──
  const variants = [
    { key: '01', name: 'card-wash',        btn: 'Card · Wash header' },
    { key: '02', name: 'card-transparent', btn: 'Card · Transparent header' },
    { key: '03', name: 'card-inverted',    btn: 'Card · Inverted header' },
    { key: '04', name: 'open-transparent', btn: 'Open · Transparent' },
    { key: '05', name: 'card-sticky',      btn: 'Card · Sticky header' },
  ];

  for (const v of variants) {
    await clickControl(page, v.btn);
    await scrollMainTop(page);
    await shot(page, `propertytable-variant-${v.key}-${v.name}.png`);
    const probe = await probeVisibleTable(page, `PT-${v.name}`);
    console.log(`  ${v.name} → thBg:${probe.thBg} thColor:${probe.thColor} thPos:${probe.thPosition}`);
  }

  // ── DENSITIES (all 4) ──
  await clickControl(page, 'Card · Wash header'); // reset variant

  const densities = [
    { name: 'compact',     btn: 'Compact' },
    { name: 'standard',    btn: 'Standard' },
    { name: 'comfortable', btn: 'Comfortable' },
    { name: 'spacious',    btn: 'Spacious' },
  ];

  const ptDensityProbes = {};
  for (const d of densities) {
    await clickControl(page, d.btn);
    await scrollMainTop(page);
    await shot(page, `propertytable-density-${d.name}.png`);
    const probe = await probeVisibleTable(page, `PT-density-${d.name}`);
    ptDensityProbes[d.name] = probe;
    console.log(`  density ${d.name} → pad:${probe.firstTdPadding} font:${probe.firstTdFontSize} rowH:${probe.firstTrHeight}`);
  }

  // ── STICKY ──
  await clickControl(page, 'Card · Sticky header');
  await scrollMainTop(page);
  await page.waitForTimeout(400);
  await shot(page, 'propertytable-sticky-idle.png');
  const ptStickyIdle = await probeVisibleTable(page, 'PT-sticky-idle');
  console.log(`  sticky idle → thPos:${ptStickyIdle.thPosition} thTop:${ptStickyIdle.thTop} scrollable:${ptStickyIdle.scrollParentScrollH > ptStickyIdle.scrollParentClientH}`);

  // Scroll the table container
  const scrollResult = await scrollTableContainer(page, 200);
  console.log(`  scroll container result:`, JSON.stringify(scrollResult));
  await page.waitForTimeout(500);
  // Don't scroll main top — keep table scrolled to show sticky behavior
  await shot(page, 'propertytable-sticky-scrolled.png');
  const ptStickyScrolled = await probeVisibleTable(page, 'PT-sticky-scrolled');
  console.log(`  sticky scrolled → thPos:${ptStickyScrolled.thPosition} thRectTop:${ptStickyScrolled.thRectTop}`);

  // Reset scroll
  await scrollTableContainer(page, 0);
  await scrollMainTop(page);

  // ── STATES ──
  await clickControl(page, 'Normal');
  await page.waitForTimeout(200);
  // Empty
  await clickControl(page, 'Empty');
  await scrollMainTop(page);
  await page.waitForTimeout(300);
  await shot(page, 'propertytable-state-empty.png');
  // Error
  await clickControl(page, 'Normal');
  await page.waitForTimeout(200);
  await clickControl(page, 'Error');
  await scrollMainTop(page);
  await page.waitForTimeout(300);
  await shot(page, 'propertytable-state-error.png');

  // Reset to normal
  await clickControl(page, 'Normal');

  // Full probe with card-wash + standard
  await clickControl(page, 'Card · Wash header');
  await clickControl(page, 'Standard');
  await page.waitForTimeout(300);
  const ptFinal = await probeVisibleTable(page, 'PT-cardwash-standard-final');

  // ══════════════════════════════════════════════════
  // RANKING TABLE
  // ══════════════════════════════════════════════════
  console.log('\n═══ RankingTable ═══');

  await navTo(page, 'RankingTable');
  await scrollMainTop(page);
  await page.waitForTimeout(300);
  await shot(page, 'rt-nav-check.png');

  const rtInitial = await probeVisibleTable(page, 'RT-initial');
  console.log(`  initial → thBg:${rtInitial.thBg} pad:${rtInitial.firstTdPadding} font:${rtInitial.firstTdFontSize}`);

  // ── RT VARIANTS ──
  for (const v of variants) {
    await clickControl(page, v.btn);
    await scrollMainTop(page);
    await shot(page, `rankingtable-variant-${v.key}-${v.name}.png`);
    const probe = await probeVisibleTable(page, `RT-${v.name}`);
    console.log(`  ${v.name} → thBg:${probe.thBg} thColor:${probe.thColor}`);
  }

  // ── RT DENSITIES ──
  await clickControl(page, 'Card · Wash header');

  const rtDensityProbes = {};
  for (const d of densities) {
    await clickControl(page, d.btn);
    await scrollMainTop(page);
    await shot(page, `rankingtable-density-${d.name}.png`);
    const probe = await probeVisibleTable(page, `RT-density-${d.name}`);
    rtDensityProbes[d.name] = probe;
    console.log(`  density ${d.name} → pad:${probe.firstTdPadding} font:${probe.firstTdFontSize} rowH:${probe.firstTrHeight}`);
  }

  // ── RT STICKY ──
  await clickControl(page, 'Card · Sticky header');
  await scrollMainTop(page);
  await page.waitForTimeout(400);
  await shot(page, 'rankingtable-sticky-idle.png');
  const rtStickyIdle = await probeVisibleTable(page, 'RT-sticky-idle');
  console.log(`  sticky idle → thPos:${rtStickyIdle.thPosition} thTop:${rtStickyIdle.thTop}`);

  const rtScrollResult = await scrollTableContainer(page, 200);
  console.log(`  RT scroll container:`, JSON.stringify(rtScrollResult));
  await page.waitForTimeout(500);
  await shot(page, 'rankingtable-sticky-scrolled.png');
  const rtStickyScrolled = await probeVisibleTable(page, 'RT-sticky-scrolled');
  console.log(`  sticky scrolled → thPos:${rtStickyScrolled.thPosition} thRectTop:${rtStickyScrolled.thRectTop}`);

  await scrollTableContainer(page, 0);
  await scrollMainTop(page);

  // ── RT STATES ──
  await clickControl(page, 'Normal');
  await page.waitForTimeout(200);
  await clickControl(page, 'Empty');
  await scrollMainTop(page);
  await page.waitForTimeout(300);
  await shot(page, 'rankingtable-state-empty.png');
  await clickControl(page, 'Normal');
  await page.waitForTimeout(200);
  await clickControl(page, 'Error');
  await scrollMainTop(page);
  await page.waitForTimeout(300);
  await shot(page, 'rankingtable-state-error.png');
  await clickControl(page, 'Normal');

  // RT final probe
  await clickControl(page, 'Card · Wash header');
  await clickControl(page, 'Standard');
  await page.waitForTimeout(300);
  const rtFinal = await probeVisibleTable(page, 'RT-cardwash-standard-final');

  // ══════════════════════════════════════════════════
  // POLISH CLOSE-UPS (back on PT)
  // ══════════════════════════════════════════════════
  console.log('\n═══ Polish close-ups ═══');
  await navTo(page, 'PropertyTable');
  await scrollMainTop(page);
  await page.waitForTimeout(300);

  // wash header
  await clickControl(page, 'Card · Wash header');
  await page.waitForTimeout(300);
  const thead = page.locator('thead').first();
  if (await thead.count() > 0 && await thead.isVisible()) {
    const box = await thead.boundingBox();
    if (box) {
      await page.screenshot({
        path: join(OUT, 'polish-header-wash.png'),
        clip: { x: Math.max(0, box.x - 10), y: Math.max(0, box.y - 4), width: Math.min(box.width + 20, 1440), height: box.height + 8 }
      });
      console.log('  ✓ polish-header-wash.png');
    }
  }

  // inverted header
  await clickControl(page, 'Card · Inverted header');
  await page.waitForTimeout(300);
  const thead2 = page.locator('thead').first();
  if (await thead2.count() > 0 && await thead2.isVisible()) {
    const box = await thead2.boundingBox();
    if (box) {
      await page.screenshot({
        path: join(OUT, 'polish-header-inverted.png'),
        clip: { x: Math.max(0, box.x - 10), y: Math.max(0, box.y - 4), width: Math.min(box.width + 20, 1440), height: box.height + 8 }
      });
      console.log('  ✓ polish-header-inverted.png');
    }
  }

  // comfortable rows
  await clickControl(page, 'Card · Wash header');
  await clickControl(page, 'Comfortable');
  await page.waitForTimeout(300);
  const rows = await page.locator('tbody tr').all();
  if (rows.length > 0) {
    const firstRow = rows[0];
    if (await firstRow.isVisible()) {
      const box = await firstRow.boundingBox();
      if (box) {
        await page.screenshot({
          path: join(OUT, 'polish-cell-padding-comfortable.png'),
          clip: { x: Math.max(0, box.x - 10), y: Math.max(0, box.y - 4), width: Math.min(box.width + 20, 1440), height: Math.min(box.height * 4, 300) }
        });
        console.log('  ✓ polish-cell-padding-comfortable.png');
      }
    }
  }

  // compact rows
  await clickControl(page, 'Compact');
  await page.waitForTimeout(300);
  const rows2 = await page.locator('tbody tr').all();
  if (rows2.length > 0 && await rows2[0].isVisible()) {
    const box = await rows2[0].boundingBox();
    if (box) {
      await page.screenshot({
        path: join(OUT, 'polish-cell-padding-compact.png'),
        clip: { x: Math.max(0, box.x - 10), y: Math.max(0, box.y - 4), width: Math.min(box.width + 20, 1440), height: Math.min(box.height * 4, 200) }
      });
      console.log('  ✓ polish-cell-padding-compact.png');
    }
  }

  // ══════════════════════════════════════════════════
  // SAVE PROBE JSON
  // ══════════════════════════════════════════════════
  const probeOut = {
    timestamp: new Date().toISOString(),
    consoleErrors,
    PropertyTable: {
      initial: ptInitial,
      cardwash_standard: ptFinal,
      sticky_idle: ptStickyIdle,
      sticky_scrolled: ptStickyScrolled,
      densities: ptDensityProbes,
    },
    RankingTable: {
      initial: rtInitial,
      cardwash_standard: rtFinal,
      sticky_idle: rtStickyIdle,
      sticky_scrolled: rtStickyScrolled,
      densities: rtDensityProbes,
    },
  };

  writeFileSync(join(OUT, 'tables-postfix-probe.json'), JSON.stringify(probeOut, null, 2));
  console.log('\n  ✓ tables-postfix-probe.json saved');

  // ══════════════════════════════════════════════════
  // SUMMARY
  // ══════════════════════════════════════════════════
  console.log('\n══ BUG VERIFICATION MATRIX ══');
  const ptCW = ptFinal;
  const rtCW = rtFinal;

  // Bug 1: Cell padding 0
  const ptPad = ptCW.firstTdPadding || 'unknown';
  const rtPad = rtCW.firstTdPadding || 'unknown';
  console.log(`  Bug 1 (cell padding): PT=${ptPad} RT=${rtPad}`);
  console.log(`    FIXED: ${ptPad !== '0px' && !ptPad.includes('0px 0px') ? 'YES' : 'NO'}`);

  // Bug 2: Sticky
  const ptStickyPos = ptStickyIdle.thPosition;
  const rtStickyPos = rtStickyIdle.thPosition;
  const ptStickyScrollH = ptStickyIdle.scrollParentScrollH;
  const ptStickyClientH = ptStickyIdle.scrollParentClientH;
  console.log(`  Bug 2 (sticky): PT thPos=${ptStickyPos} scrollH=${ptStickyScrollH} clientH=${ptStickyClientH}`);
  console.log(`    FIXED: ${ptStickyPos === 'sticky' ? 'YES (position:sticky applied)' : 'NO (still static)'}`);

  // Bug 3: Inverted header
  // Find inverted probe from variants
  console.log(`  Bug 3 (inverted header): needs variant probe check`);

  // Bug 4: Header wash
  const ptWashBg = ptCW.thBg;
  console.log(`  Bug 4 (header wash): PT thBg=${ptWashBg}`);
  console.log(`    FIXED: ${ptWashBg === 'rgb(248, 247, 254)' ? 'YES' : 'STILL - got ' + ptWashBg}`);

  // Bug 5: 16px font
  const ptFont = ptCW.firstTdFontSize;
  console.log(`  Bug 5 (16px font leak): PT font=${ptFont}`);
  console.log(`    FIXED: ${ptFont !== '16px' ? 'YES (' + ptFont + ')' : 'NO'}`);

  console.log(`\n  Console errors: ${consoleErrors.length}`);
  if (consoleErrors.length) consoleErrors.forEach(e => console.log(`    ${e}`));

  await browser.close();
  console.log('\n═══ DONE ═══');
}

main().catch(e => {
  console.error('FATAL:', e);
  process.exit(1);
});
