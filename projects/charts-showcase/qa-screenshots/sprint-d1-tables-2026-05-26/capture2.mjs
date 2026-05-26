/**
 * Sprint D.1 Tables QA Capture v2
 * Uses sidebar nav to navigate directly to PropertyTable and RankingTable sections.
 * Captures all variant × density × state × sticky screenshots + DOM probe.
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

// Navigate to a sidebar item by exact text
async function navTo(page, label) {
  const link = page.locator(`nav a, nav button, aside a, aside button, [role="navigation"] button`).filter({ hasText: label }).first();
  if (await link.count() > 0) {
    await link.click();
    await page.waitForTimeout(600);
    return true;
  }
  // Try sidebar list items
  const li = page.locator(`li`).filter({ hasText: new RegExp(`^${label}$`) }).first();
  if (await li.count() > 0) {
    await li.click();
    await page.waitForTimeout(600);
    return true;
  }
  return false;
}

// Find and click a button by exact or near-exact text within the main content area
async function clickBtn(page, text) {
  // Prefer buttons in the main content (not sidebar)
  const main = page.locator('main, [role="main"], .main-content, #main').first();
  const container = (await main.count() > 0) ? main : page;

  const btn = container.locator('button').filter({ hasText: new RegExp(`^${text}$`, 'i') }).first();
  if (await btn.count() > 0 && await btn.isVisible()) {
    await btn.click();
    await page.waitForTimeout(350);
    return true;
  }
  // partial match fallback
  const btn2 = container.locator('button').filter({ hasText: text }).first();
  if (await btn2.count() > 0 && await btn2.isVisible()) {
    await btn2.click();
    await page.waitForTimeout(350);
    return true;
  }
  return false;
}

// Get bounding box of first visible <table> in main content
async function getTableBox(page) {
  const main = page.locator('main, [role="main"], .overflow-auto').first();
  const tables = await page.locator('table').all();
  for (const t of tables) {
    if (await t.isVisible()) {
      return await t.boundingBox();
    }
  }
  return null;
}

// Screenshot the current page viewport (centered around active section)
async function sectionShot(page, filename) {
  // Scroll the main content area to top so section heading is visible
  await page.evaluate(() => {
    const main = document.querySelector('main, [role="main"], .flex-1, .overflow-auto');
    if (main) main.scrollTop = 0;
  });
  await page.waitForTimeout(200);
  await shot(page, filename);
}

// Probe DOM values for current table
async function probeTable(page, label) {
  return await page.evaluate((label) => {
    const tables = document.querySelectorAll('table');
    const result = { label, tables: [] };

    for (let i = 0; i < tables.length; i++) {
      const table = tables[i];
      if (!table.offsetParent && table.getBoundingClientRect().width === 0) continue; // hidden

      const thead = table.querySelector('thead');
      const th = thead ? thead.querySelector('th') : null;
      const tbody = table.querySelector('tbody');
      const firstTr = tbody ? tbody.querySelector('tr') : null;
      const firstTd = firstTr ? firstTr.querySelector('td') : null;
      const allTds = tbody ? tbody.querySelectorAll('td') : [];
      const lastTd = allTds.length > 0 ? allTds[allTds.length - 1] : null;

      function cs(el, prop) {
        if (!el) return 'null';
        return window.getComputedStyle(el).getPropertyValue(prop).trim();
      }

      const thRect = th ? th.getBoundingClientRect() : null;

      // Find scroll container
      let scrollParent = table.parentElement;
      while (scrollParent && scrollParent !== document.body) {
        const overflow = window.getComputedStyle(scrollParent).overflow;
        const overflowY = window.getComputedStyle(scrollParent).overflowY;
        const maxH = window.getComputedStyle(scrollParent).maxHeight;
        if (overflow.includes('auto') || overflow.includes('scroll') ||
            overflowY.includes('auto') || overflowY.includes('scroll')) {
          break;
        }
        scrollParent = scrollParent.parentElement;
      }

      result.tables.push({
        index: i,
        thBg: cs(th, 'background-color'),
        thColor: cs(th, 'color'),
        thPosition: cs(th, 'position'),
        thTop: cs(th, 'top'),
        thBorderBottom: cs(th, 'border-bottom'),
        thRectTop: thRect ? thRect.top : null,
        thRectHeight: thRect ? thRect.height : null,
        firstTdPadding: cs(firstTd, 'padding'),
        firstTdPaddingTop: cs(firstTd, 'padding-top'),
        firstTdPaddingLeft: cs(firstTd, 'padding-left'),
        firstTdFontSize: cs(firstTd, 'font-size'),
        firstTrHeight: firstTr ? firstTr.getBoundingClientRect().height : null,
        lastTdBorderBottom: cs(lastTd, 'border-bottom'),
        scrollParentMaxHeight: scrollParent ? cs(scrollParent, 'max-height') : 'none',
        scrollParentOverflow: scrollParent ? cs(scrollParent, 'overflow') : 'none',
        scrollParentScrollHeight: scrollParent ? scrollParent.scrollHeight : 0,
        scrollParentClientHeight: scrollParent ? scrollParent.clientHeight : 0,
      });
    }
    return result;
  }, label);
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

  console.log('Navigating to localhost:3070...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // ─── discover sidebar ───
  const sidebarText = await page.locator('nav, aside, [role="navigation"]').first().textContent().catch(() => '');
  console.log('Sidebar excerpt:', sidebarText.slice(0, 200));

  // Click PropertyTable in sidebar
  console.log('\n═══ PropertyTable ═══');
  const ptClicked = await navTo(page, 'PropertyTable');
  console.log(`  Sidebar nav: ${ptClicked ? 'clicked' : 'MISSED — trying scroll'}`);

  if (!ptClicked) {
    // Try scrolling to it
    const heading = page.locator('h1, h2, h3').filter({ hasText: /PropertyTable/i }).first();
    if (await heading.count() > 0) {
      await heading.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
    }
  }

  // Scroll main content to top
  await page.evaluate(() => {
    const els = document.querySelectorAll('main, [role="main"], .overflow-y-auto, .overflow-auto');
    els.forEach(el => { el.scrollTop = 0; });
  });
  await page.waitForTimeout(300);

  // Screenshot to see what we have
  await shot(page, 'pt-nav-check.png');

  // Probe current state
  const ptProbeInitial = await probeTable(page, 'PropertyTable-initial');
  console.log('  Initial tables found:', ptProbeInitial.tables.length);
  if (ptProbeInitial.tables.length > 0) {
    const t = ptProbeInitial.tables[0];
    console.log(`  thBg: ${t.thBg}`);
    console.log(`  firstTdPadding: ${t.firstTdPadding}`);
    console.log(`  firstTdFontSize: ${t.firstTdFontSize}`);
  }

  // ── PT VARIANTS ──
  // Discover what variant buttons exist
  const visibleBtns = await page.locator('button').all();
  const btnLabels = [];
  for (const b of visibleBtns) {
    const txt = (await b.textContent().catch(() => '')).trim();
    const vis = await b.isVisible().catch(() => false);
    if (vis && txt) btnLabels.push(txt);
  }
  console.log('  Visible buttons:', btnLabels.join(' | '));

  const variantMap = [
    { key: '01', name: 'card-wash',         labels: ['Card · Wash header', 'card-wash', 'Card Wash', 'wash'] },
    { key: '02', name: 'card-transparent',  labels: ['Card · Transparent header', 'card-transparent', 'transparent'] },
    { key: '03', name: 'card-inverted',     labels: ['Card · Inverted header', 'card-inverted', 'inverted'] },
    { key: '04', name: 'open-transparent',  labels: ['Open · Transparent', 'Open · Transparent header', 'open-transparent', 'open transparent'] },
    { key: '05', name: 'card-sticky',       labels: ['Card · Sticky header', 'card-sticky', 'sticky'] },
  ];

  for (const v of variantMap) {
    let clicked = false;
    for (const label of v.labels) {
      if (await clickBtn(page, label)) { clicked = true; break; }
    }
    await page.evaluate(() => {
      const els = document.querySelectorAll('main, [role="main"], .overflow-y-auto, .overflow-auto');
      els.forEach(el => { el.scrollTop = 0; });
    });
    await page.waitForTimeout(200);
    await shot(page, `propertytable-variant-${v.key}-${v.name}.png`);
    console.log(`  variant ${v.name}: clicked=${clicked}`);
  }

  // ── PT DENSITIES ──
  const densities = [
    { name: 'compact',      labels: ['Compact', 'compact'] },
    { name: 'standard',     labels: ['Standard', 'standard'] },
    { name: 'comfortable',  labels: ['Comfortable', 'comfortable'] },
    { name: 'spacious',     labels: ['Spacious', 'spacious'] },
  ];

  // Reset to card-wash first
  for (const label of ['Card · Wash header', 'card-wash', 'wash']) {
    if (await clickBtn(page, label)) break;
  }

  for (const d of densities) {
    let clicked = false;
    for (const label of d.labels) {
      if (await clickBtn(page, label)) { clicked = true; break; }
    }
    await page.evaluate(() => {
      const els = document.querySelectorAll('main, [role="main"], .overflow-y-auto, .overflow-auto');
      els.forEach(el => { el.scrollTop = 0; });
    });
    await page.waitForTimeout(200);
    await shot(page, `propertytable-density-${d.name}.png`);
    console.log(`  density ${d.name}: clicked=${clicked}`);
  }

  // ── PT STICKY ──
  // Select sticky variant
  for (const label of ['Card · Sticky header', 'card-sticky', 'sticky']) {
    if (await clickBtn(page, label)) break;
  }
  await page.evaluate(() => {
    const els = document.querySelectorAll('main, [role="main"], .overflow-y-auto, .overflow-auto');
    els.forEach(el => { el.scrollTop = 0; });
  });
  await page.waitForTimeout(400);
  await shot(page, 'propertytable-sticky-idle.png');

  // Scroll the table's overflow container
  await page.evaluate(() => {
    // Try all potential scroll containers within main
    const candidates = document.querySelectorAll(
      '[style*="max-height"], [class*="max-h-"], [class*="overflow"], .table-scroll-container, [data-scroll]'
    );
    for (const c of candidates) {
      if (c.scrollHeight > c.clientHeight + 10) {
        c.scrollTop = 200;
        console.log('scrolled container:', c.className, c.scrollHeight, c.clientHeight);
      }
    }
    // Also try parent of tables
    const tables = document.querySelectorAll('table');
    tables.forEach(t => {
      let parent = t.parentElement;
      for (let i = 0; i < 5; i++) {
        if (!parent) break;
        const cs = window.getComputedStyle(parent);
        if ((cs.overflowY === 'auto' || cs.overflowY === 'scroll') && parent.scrollHeight > parent.clientHeight + 10) {
          parent.scrollTop = 200;
          break;
        }
        parent = parent.parentElement;
      }
    });
  });
  await page.waitForTimeout(600);
  await page.evaluate(() => {
    const els = document.querySelectorAll('main, [role="main"], .overflow-y-auto, .overflow-auto');
    els.forEach(el => { el.scrollTop = 0; });
  });
  await page.waitForTimeout(200);
  await shot(page, 'propertytable-sticky-scrolled.png');

  // Probe sticky state
  const ptStickyProbe = await probeTable(page, 'PropertyTable-sticky');

  // ── PT STATES ──
  // Reset to normal first
  for (const label of ['Normal', 'normal']) {
    if (await clickBtn(page, label)) break;
  }
  await page.evaluate(() => { document.querySelectorAll('main').forEach(el => el.scrollTop = 0); });
  await page.waitForTimeout(200);

  for (const state of ['Empty', 'Error']) {
    if (await clickBtn(page, state)) {
      await page.evaluate(() => { document.querySelectorAll('main').forEach(el => el.scrollTop = 0); });
      await page.waitForTimeout(300);
      await shot(page, `propertytable-state-${state.toLowerCase()}.png`);
      // reset
      await clickBtn(page, 'Normal');
      await page.waitForTimeout(200);
    } else {
      await shot(page, `propertytable-state-${state.toLowerCase()}.png`);
    }
    console.log(`  state ${state} captured`);
  }

  // Full DOM probe for PropertyTable (card-wash, standard density)
  for (const label of ['Card · Wash header', 'wash']) { if (await clickBtn(page, label)) break; }
  for (const label of ['Standard', 'standard']) { if (await clickBtn(page, label)) break; }
  await page.waitForTimeout(300);
  const ptProbe = await probeTable(page, 'PropertyTable-cardwash-standard');

  // ═══════════════════════════════════════════════════════
  // RANKING TABLE
  // ═══════════════════════════════════════════════════════
  console.log('\n═══ RankingTable ═══');
  const rtClicked = await navTo(page, 'RankingTable');
  console.log(`  Sidebar nav: ${rtClicked ? 'clicked' : 'MISSED'}`);

  await page.evaluate(() => {
    document.querySelectorAll('main, [role="main"], .overflow-y-auto').forEach(el => { el.scrollTop = 0; });
  });
  await page.waitForTimeout(400);

  await shot(page, 'rt-nav-check.png');

  // Probe initial
  const rtProbeInitial = await probeTable(page, 'RankingTable-initial');
  console.log('  Initial tables found:', rtProbeInitial.tables.length);
  if (rtProbeInitial.tables.length > 0) {
    const t = rtProbeInitial.tables[0];
    console.log(`  thBg: ${t.thBg}`);
    console.log(`  firstTdPadding: ${t.firstTdPadding}`);
    console.log(`  firstTdFontSize: ${t.firstTdFontSize}`);
  }

  // Visible buttons in RT section
  const rtBtnLabels = [];
  for (const b of await page.locator('button').all()) {
    const txt = (await b.textContent().catch(() => '')).trim();
    const vis = await b.isVisible().catch(() => false);
    if (vis && txt) rtBtnLabels.push(txt);
  }
  console.log('  RT Visible buttons:', rtBtnLabels.join(' | '));

  // RT Variants
  for (const v of variantMap) {
    let clicked = false;
    for (const label of v.labels) {
      if (await clickBtn(page, label)) { clicked = true; break; }
    }
    await page.evaluate(() => {
      document.querySelectorAll('main, [role="main"], .overflow-y-auto').forEach(el => { el.scrollTop = 0; });
    });
    await page.waitForTimeout(200);
    await shot(page, `rankingtable-variant-${v.key}-${v.name}.png`);
    console.log(`  variant ${v.name}: clicked=${clicked}`);
  }

  // RT Densities
  for (const label of ['Card · Wash header', 'wash']) { if (await clickBtn(page, label)) break; }
  for (const d of densities) {
    let clicked = false;
    for (const label of d.labels) {
      if (await clickBtn(page, label)) { clicked = true; break; }
    }
    await page.evaluate(() => {
      document.querySelectorAll('main, [role="main"], .overflow-y-auto').forEach(el => { el.scrollTop = 0; });
    });
    await page.waitForTimeout(200);
    await shot(page, `rankingtable-density-${d.name}.png`);
    console.log(`  density ${d.name}: clicked=${clicked}`);
  }

  // RT Sticky
  for (const label of ['Card · Sticky header', 'card-sticky', 'sticky']) {
    if (await clickBtn(page, label)) break;
  }
  await page.evaluate(() => { document.querySelectorAll('main').forEach(el => el.scrollTop = 0); });
  await page.waitForTimeout(400);
  await shot(page, 'rankingtable-sticky-idle.png');

  await page.evaluate(() => {
    document.querySelectorAll('table').forEach(t => {
      let parent = t.parentElement;
      for (let i = 0; i < 6; i++) {
        if (!parent) break;
        const cs = window.getComputedStyle(parent);
        if ((cs.overflowY === 'auto' || cs.overflowY === 'scroll') && parent.scrollHeight > parent.clientHeight + 10) {
          parent.scrollTop = 200;
          break;
        }
        parent = parent.parentElement;
      }
    });
  });
  await page.waitForTimeout(600);
  await page.evaluate(() => { document.querySelectorAll('main').forEach(el => el.scrollTop = 0); });
  await page.waitForTimeout(200);
  await shot(page, 'rankingtable-sticky-scrolled.png');

  // RT probe (sticky)
  const rtStickyProbe = await probeTable(page, 'RankingTable-sticky');

  // RT States
  for (const label of ['Normal', 'normal']) { if (await clickBtn(page, label)) break; }
  for (const state of ['Empty', 'Error']) {
    if (await clickBtn(page, state)) {
      await page.evaluate(() => { document.querySelectorAll('main').forEach(el => el.scrollTop = 0); });
      await page.waitForTimeout(300);
      await shot(page, `rankingtable-state-${state.toLowerCase()}.png`);
      await clickBtn(page, 'Normal');
      await page.waitForTimeout(200);
    } else {
      await shot(page, `rankingtable-state-${state.toLowerCase()}.png`);
    }
    console.log(`  state ${state} captured`);
  }

  // RT probe (card-wash standard)
  for (const label of ['Card · Wash header', 'wash']) { if (await clickBtn(page, label)) break; }
  for (const label of ['Standard', 'standard']) { if (await clickBtn(page, label)) break; }
  await page.waitForTimeout(300);
  const rtProbe = await probeTable(page, 'RankingTable-cardwash-standard');

  // ═══════════════════════════════════════════════════════
  // POLISH CLOSE-UPS (back to PropertyTable)
  // ═══════════════════════════════════════════════════════
  console.log('\n═══ Polish close-ups ═══');
  await navTo(page, 'PropertyTable');
  await page.evaluate(() => { document.querySelectorAll('main').forEach(el => el.scrollTop = 0); });
  await page.waitForTimeout(400);

  // wash header close-up
  for (const label of ['Card · Wash header', 'wash']) { if (await clickBtn(page, label)) break; }
  await page.waitForTimeout(300);
  const thead1 = page.locator('thead').first();
  if (await thead1.count() > 0) {
    await thead1.scrollIntoViewIfNeeded();
    const box = await thead1.boundingBox();
    if (box) {
      await page.screenshot({
        path: join(OUT, 'polish-header-wash.png'),
        clip: { x: Math.max(0, box.x - 10), y: Math.max(0, box.y - 6), width: Math.min(box.width + 20, 1440), height: box.height + 12 }
      });
      console.log('  ✓ polish-header-wash.png');
    }
  }

  // inverted header close-up
  for (const label of ['Card · Inverted header', 'inverted']) { if (await clickBtn(page, label)) break; }
  await page.waitForTimeout(300);
  const thead2 = page.locator('thead').first();
  if (await thead2.count() > 0) {
    await thead2.scrollIntoViewIfNeeded();
    const box = await thead2.boundingBox();
    if (box) {
      await page.screenshot({
        path: join(OUT, 'polish-header-inverted.png'),
        clip: { x: Math.max(0, box.x - 10), y: Math.max(0, box.y - 6), width: Math.min(box.width + 20, 1440), height: box.height + 12 }
      });
      console.log('  ✓ polish-header-inverted.png');
    }
  }

  // comfortable row close-up
  for (const label of ['Card · Wash header', 'wash']) { if (await clickBtn(page, label)) break; }
  for (const label of ['Comfortable', 'comfortable']) { if (await clickBtn(page, label)) break; }
  await page.waitForTimeout(300);
  const firstRow1 = page.locator('tbody tr').first();
  if (await firstRow1.count() > 0) {
    await firstRow1.scrollIntoViewIfNeeded();
    const box = await firstRow1.boundingBox();
    if (box) {
      await page.screenshot({
        path: join(OUT, 'polish-cell-padding-comfortable.png'),
        clip: { x: Math.max(0, box.x - 10), y: Math.max(0, box.y - 4), width: Math.min(box.width + 20, 1440), height: Math.min(box.height * 4, 300) }
      });
      console.log('  ✓ polish-cell-padding-comfortable.png');
    }
  }

  // compact row close-up
  for (const label of ['Compact', 'compact']) { if (await clickBtn(page, label)) break; }
  await page.waitForTimeout(300);
  const firstRow2 = page.locator('tbody tr').first();
  if (await firstRow2.count() > 0) {
    await firstRow2.scrollIntoViewIfNeeded();
    const box = await firstRow2.boundingBox();
    if (box) {
      await page.screenshot({
        path: join(OUT, 'polish-cell-padding-compact.png'),
        clip: { x: Math.max(0, box.x - 10), y: Math.max(0, box.y - 4), width: Math.min(box.width + 20, 1440), height: Math.min(box.height * 4, 200) }
      });
      console.log('  ✓ polish-cell-padding-compact.png');
    }
  }

  // ═══════════════════════════════════════════════════════
  // SAVE PROBE JSON
  // ═══════════════════════════════════════════════════════
  const probeData = {
    timestamp: new Date().toISOString(),
    consoleErrors,
    PropertyTable: {
      initial: ptProbeInitial,
      cardwash_standard: ptProbe,
      sticky: ptStickyProbe,
    },
    RankingTable: {
      initial: rtProbeInitial,
      cardwash_standard: rtProbe,
      sticky: rtStickyProbe,
    },
  };

  writeFileSync(join(OUT, 'tables-postfix-probe.json'), JSON.stringify(probeData, null, 2));
  console.log('\n  ✓ tables-postfix-probe.json saved');

  // Summary
  console.log('\n═══ PROBE SUMMARY ═══');
  function summarize(label, data) {
    if (!data || !data.tables || data.tables.length === 0) {
      console.log(`  ${label}: NO TABLES FOUND`);
      return;
    }
    const t = data.tables[0];
    console.log(`  ${label}:`);
    console.log(`    thBg:           ${t.thBg}`);
    console.log(`    thColor:        ${t.thColor}`);
    console.log(`    thPosition:     ${t.thPosition}`);
    console.log(`    thBorderBottom: ${t.thBorderBottom}`);
    console.log(`    firstTdPadding: ${t.firstTdPadding}`);
    console.log(`    firstTdFontSize:${t.firstTdFontSize}`);
    console.log(`    firstTrHeight:  ${t.firstTrHeight}`);
    console.log(`    lastTdBorderBot:${t.lastTdBorderBottom}`);
    console.log(`    scrollMaxH:     ${t.scrollParentMaxHeight}`);
  }

  summarize('PT cardwash/standard', ptProbe.tables?.length ? ptProbe : ptProbeInitial);
  summarize('PT sticky', ptStickyProbe);
  summarize('RT cardwash/standard', rtProbe.tables?.length ? rtProbe : rtProbeInitial);
  summarize('RT sticky', rtStickyProbe);

  console.log(`\n  Console errors: ${consoleErrors.length}`);

  await browser.close();
  console.log('\n═══ DONE ═══');
}

main().catch(e => {
  console.error('FATAL:', e);
  process.exit(1);
});
