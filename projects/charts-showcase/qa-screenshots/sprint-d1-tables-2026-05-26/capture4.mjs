/**
 * Sprint D.1 Tables QA Capture v4
 * Finds PropertyTable and RankingTable section headings by data-id or text,
 * then scopes all button interactions to ONLY buttons after the section heading.
 * Screenshots the viewport after scrolling section heading to top of main.
 */

import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = __dirname;
const BASE_URL = 'http://localhost:3070';

// ── helpers ────────────────────────────────────────────────
async function shot(page, filename, clip) {
  const opts = { path: join(OUT, filename), fullPage: false };
  if (clip) opts.clip = clip;
  await page.screenshot(opts);
  console.log(`  ✓ ${filename}`);
}

async function navTo(page, label) {
  const sidebar = page.locator('nav, aside').first();
  const link = sidebar.locator('a, button').filter({ hasText: new RegExp(`^${label}$`) }).first();
  if (await link.count() > 0) {
    await link.click();
    await page.waitForTimeout(800);
    return true;
  }
  return false;
}

// Get the Y-offset (in main scroll coords) of the section heading
async function getSectionAnchorY(page, sectionLabel) {
  return await page.evaluate((label) => {
    // Find section headings — h1/h2/h3 with the label text
    const headings = document.querySelectorAll('h1, h2, h3, h4, [data-section-id]');
    for (const h of headings) {
      if (h.textContent && h.textContent.trim().toLowerCase().includes(label.toLowerCase())) {
        // Get position relative to main scroll container
        const main = document.querySelector('main');
        if (main) {
          const mainRect = main.getBoundingClientRect();
          const hRect = h.getBoundingClientRect();
          return main.scrollTop + (hRect.top - mainRect.top) - 10;
        }
        const rect = h.getBoundingClientRect();
        return window.scrollY + rect.top - 10;
      }
    }
    return null;
  }, sectionLabel);
}

// Scroll main to show section heading at top
async function scrollMainToSection(page, sectionLabel) {
  const y = await getSectionAnchorY(page, sectionLabel);
  if (y !== null) {
    await page.evaluate((scrollY) => {
      const main = document.querySelector('main');
      if (main) main.scrollTop = Math.max(0, scrollY);
      else window.scrollTo(0, Math.max(0, scrollY));
    }, y);
    await page.waitForTimeout(300);
    return true;
  }
  return false;
}

// Click a button that appears AFTER the section heading (by DOM order)
async function clickSectionBtn(page, sectionLabel, btnText) {
  return await page.evaluate(({ sectionLabel, btnText }) => {
    // Find section heading
    let sectionEl = null;
    for (const h of document.querySelectorAll('h1, h2, h3, h4')) {
      if (h.textContent && h.textContent.trim().toLowerCase().includes(sectionLabel.toLowerCase())) {
        sectionEl = h;
        break;
      }
    }
    if (!sectionEl) return { clicked: false, reason: 'section not found' };

    // Walk from section heading forward in DOM to find next section boundary
    // Collect all buttons between this heading and the next same-level heading
    const allButtons = document.querySelectorAll('button');
    const sectionRect = sectionEl.getBoundingClientRect();
    const sectionBottom = sectionRect.bottom;

    // Find the next sibling section heading after sectionEl
    let nextSectionTop = Infinity;
    const headings = document.querySelectorAll('h1, h2, h3, h4');
    for (const h of headings) {
      if (h === sectionEl) continue;
      const r = h.getBoundingClientRect();
      if (r.top > sectionBottom && r.top < nextSectionTop) {
        nextSectionTop = r.top;
      }
    }

    // Find buttons after sectionEl and before nextSection
    const candidates = [];
    for (const btn of allButtons) {
      const r = btn.getBoundingClientRect();
      const txt = btn.textContent?.trim() || '';
      if (r.top > sectionBottom && r.top < nextSectionTop + 500) {
        if (txt.toLowerCase() === btnText.toLowerCase()) {
          candidates.push(btn);
        }
      }
    }

    if (candidates.length === 0) {
      // Fallback: find any button BELOW section heading on page
      for (const btn of allButtons) {
        const r = btn.getBoundingClientRect();
        const txt = btn.textContent?.trim() || '';
        if (r.top > sectionBottom && txt.toLowerCase() === btnText.toLowerCase()) {
          btn.click();
          return { clicked: true, reason: 'fallback-below-section' };
        }
      }
      return { clicked: false, reason: `no button "${btnText}" after section "${sectionLabel}"` };
    }
    candidates[0].click();
    return { clicked: true, reason: 'exact-match' };
  }, { sectionLabel, btnText });
}

// Probe first VISIBLE table after section heading
async function probeAfterSection(page, sectionLabel) {
  return await page.evaluate((sectionLabel) => {
    // Find heading
    let sectionEl = null;
    for (const h of document.querySelectorAll('h1, h2, h3, h4')) {
      if (h.textContent?.trim().toLowerCase().includes(sectionLabel.toLowerCase())) {
        sectionEl = h;
        break;
      }
    }
    if (!sectionEl) return { error: 'section not found' };

    const sectionRect = sectionEl.getBoundingClientRect();
    const afterY = sectionRect.bottom;

    // Find first table whose rect.top > afterY
    let targetTable = null;
    for (const t of document.querySelectorAll('table')) {
      const r = t.getBoundingClientRect();
      if (r.top > afterY && r.width > 50) {
        targetTable = t;
        break;
      }
    }
    if (!targetTable) return { error: 'no table found after section heading' };

    function cs(el, prop) {
      if (!el) return 'null';
      return window.getComputedStyle(el).getPropertyValue(prop).trim();
    }

    const thead = targetTable.querySelector('thead');
    const th = thead?.querySelector('th');
    const tbody = targetTable.querySelector('tbody');
    const firstTr = tbody?.querySelector('tr');
    const firstTd = firstTr?.querySelector('td');
    const tds = tbody ? Array.from(tbody.querySelectorAll('td')) : [];
    const lastTd = tds[tds.length - 1] || null;

    // Find scroll container
    let scrollParent = targetTable.parentElement;
    for (let i = 0; i < 8 && scrollParent; i++) {
      const cs2 = window.getComputedStyle(scrollParent);
      if ((cs2.overflowY === 'auto' || cs2.overflowY === 'scroll' || cs2.overflow === 'auto') &&
          scrollParent.scrollHeight > scrollParent.clientHeight + 5) {
        break;
      }
      scrollParent = scrollParent.parentElement;
    }

    return {
      thBg: cs(th, 'background-color'),
      thColor: cs(th, 'color'),
      thPosition: cs(th, 'position'),
      thTop: cs(th, 'top'),
      thBorderBottom: cs(th, 'border-bottom'),
      thRectTop: th?.getBoundingClientRect().top ?? null,
      thRectHeight: th?.getBoundingClientRect().height ?? null,
      firstTdPadding: cs(firstTd, 'padding'),
      firstTdFontSize: cs(firstTd, 'font-size'),
      firstTrHeight: firstTr?.getBoundingClientRect().height ?? null,
      lastTdBorderBottom: cs(lastTd, 'border-bottom'),
      scrollParentMaxH: scrollParent ? cs(scrollParent, 'max-height') : 'none',
      scrollParentOverflowY: scrollParent ? cs(scrollParent, 'overflow-y') : 'none',
      scrollParentScrollH: scrollParent?.scrollHeight ?? 0,
      scrollParentClientH: scrollParent?.clientHeight ?? 0,
    };
  }, sectionLabel);
}

// Scroll the table's internal container
async function scrollTableInSection(page, sectionLabel, scrollTop) {
  return await page.evaluate(({ sectionLabel, scrollTop }) => {
    let sectionEl = null;
    for (const h of document.querySelectorAll('h1, h2, h3, h4')) {
      if (h.textContent?.trim().toLowerCase().includes(sectionLabel.toLowerCase())) {
        sectionEl = h;
        break;
      }
    }
    if (!sectionEl) return { scrolled: false, reason: 'section not found' };

    const afterY = sectionEl.getBoundingClientRect().bottom;
    for (const t of document.querySelectorAll('table')) {
      const r = t.getBoundingClientRect();
      if (r.top > afterY && r.width > 50) {
        let parent = t.parentElement;
        for (let i = 0; i < 8 && parent; i++) {
          const cs = window.getComputedStyle(parent);
          if ((cs.overflowY === 'auto' || cs.overflowY === 'scroll' || cs.overflow === 'auto') &&
              parent.scrollHeight > parent.clientHeight + 5) {
            parent.scrollTop = scrollTop;
            return {
              scrolled: true,
              maxH: cs.maxHeight,
              scrollH: parent.scrollHeight,
              clientH: parent.clientHeight,
            };
          }
          parent = parent.parentElement;
        }
        return { scrolled: false, reason: 'no overflow parent with scroll' };
      }
    }
    return { scrolled: false, reason: 'no table found' };
  }, { sectionLabel, scrollTop });
}

// ── main ───────────────────────────────────────────────────
async function main() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text().slice(0, 100));
  });

  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // ════════════════════════════════════════
  // PROPERTY TABLE
  // ════════════════════════════════════════
  const PT = 'PropertyTable';
  console.log(`\n═══ ${PT} ═══`);

  await navTo(page, PT);
  await page.waitForTimeout(400);
  await scrollMainToSection(page, PT);
  await page.waitForTimeout(300);
  await shot(page, 'pt-nav-check.png');

  const ptInit = await probeAfterSection(page, PT);
  console.log(`  init → thBg:${ptInit.thBg} pad:${ptInit.firstTdPadding} font:${ptInit.firstTdFontSize}`);

  const variants = [
    { key: '01', name: 'card-wash',        btn: 'Card · Wash header' },
    { key: '02', name: 'card-transparent', btn: 'Card · Transparent header' },
    { key: '03', name: 'card-inverted',    btn: 'Card · Inverted header' },
    { key: '04', name: 'open-transparent', btn: 'Open · Transparent' },
    { key: '05', name: 'card-sticky',      btn: 'Card · Sticky header' },
  ];

  const ptVariantProbes = {};
  for (const v of variants) {
    const r = await clickSectionBtn(page, PT, v.btn);
    await page.waitForTimeout(350);
    await scrollMainToSection(page, PT);
    await page.waitForTimeout(200);
    await shot(page, `propertytable-variant-${v.key}-${v.name}.png`);
    const probe = await probeAfterSection(page, PT);
    ptVariantProbes[v.name] = probe;
    console.log(`  ${v.name} → thBg:${probe.thBg} thColor:${probe.thColor} thPos:${probe.thPosition} click:${r.clicked}`);
  }

  // Densities — reset to card-wash first
  await clickSectionBtn(page, PT, 'Card · Wash header');
  await page.waitForTimeout(200);

  const densities = ['Compact', 'Standard', 'Comfortable', 'Spacious'];
  const ptDensityProbes = {};
  for (const d of densities) {
    await clickSectionBtn(page, PT, d);
    await page.waitForTimeout(300);
    await scrollMainToSection(page, PT);
    await page.waitForTimeout(200);
    await shot(page, `propertytable-density-${d.toLowerCase()}.png`);
    const probe = await probeAfterSection(page, PT);
    ptDensityProbes[d.toLowerCase()] = probe;
    console.log(`  density ${d} → pad:${probe.firstTdPadding} font:${probe.firstTdFontSize} rowH:${probe.firstTrHeight}`);
  }

  // Sticky
  await clickSectionBtn(page, PT, 'Card · Wash header');
  await clickSectionBtn(page, PT, 'Card · Sticky header');
  await page.waitForTimeout(300);
  await scrollMainToSection(page, PT);
  await page.waitForTimeout(300);
  await shot(page, 'propertytable-sticky-idle.png');
  const ptStickyIdle = await probeAfterSection(page, PT);
  console.log(`  sticky idle → thPos:${ptStickyIdle.thPosition} scrollH:${ptStickyIdle.scrollParentScrollH} clientH:${ptStickyIdle.scrollParentClientH}`);

  const ptScrolled = await scrollTableInSection(page, PT, 200);
  console.log(`  scroll container:`, JSON.stringify(ptScrolled));
  await page.waitForTimeout(500);
  // scroll section heading back to top of main
  await scrollMainToSection(page, PT);
  await page.waitForTimeout(200);
  await shot(page, 'propertytable-sticky-scrolled.png');
  const ptStickyAfterScroll = await probeAfterSection(page, PT);
  console.log(`  sticky scrolled → thPos:${ptStickyAfterScroll.thPosition} thRectTop:${ptStickyAfterScroll.thRectTop?.toFixed(1)}`);

  // Reset scroll
  await scrollTableInSection(page, PT, 0);

  // States
  await clickSectionBtn(page, PT, 'Normal');
  await page.waitForTimeout(200);
  await clickSectionBtn(page, PT, 'Empty');
  await page.waitForTimeout(300);
  await scrollMainToSection(page, PT);
  await page.waitForTimeout(200);
  await shot(page, 'propertytable-state-empty.png');
  await clickSectionBtn(page, PT, 'Normal');
  await page.waitForTimeout(200);
  await clickSectionBtn(page, PT, 'Error');
  await page.waitForTimeout(300);
  await scrollMainToSection(page, PT);
  await page.waitForTimeout(200);
  await shot(page, 'propertytable-state-error.png');
  await clickSectionBtn(page, PT, 'Normal');

  // Final probe
  await clickSectionBtn(page, PT, 'Card · Wash header');
  await clickSectionBtn(page, PT, 'Standard');
  await page.waitForTimeout(300);
  const ptFinal = await probeAfterSection(page, PT);

  // ════════════════════════════════════════
  // RANKING TABLE
  // ════════════════════════════════════════
  const RT = 'RankingTable';
  console.log(`\n═══ ${RT} ═══`);

  await navTo(page, RT);
  await page.waitForTimeout(400);
  await scrollMainToSection(page, RT);
  await page.waitForTimeout(300);
  await shot(page, 'rt-nav-check.png');

  const rtInit = await probeAfterSection(page, RT);
  console.log(`  init → thBg:${rtInit.thBg} pad:${rtInit.firstTdPadding} font:${rtInit.firstTdFontSize}`);

  const rtVariantProbes = {};
  for (const v of variants) {
    await clickSectionBtn(page, RT, v.btn);
    await page.waitForTimeout(350);
    await scrollMainToSection(page, RT);
    await page.waitForTimeout(200);
    await shot(page, `rankingtable-variant-${v.key}-${v.name}.png`);
    const probe = await probeAfterSection(page, RT);
    rtVariantProbes[v.name] = probe;
    console.log(`  ${v.name} → thBg:${probe.thBg} thColor:${probe.thColor}`);
  }

  await clickSectionBtn(page, RT, 'Card · Wash header');
  await page.waitForTimeout(200);

  const rtDensityProbes = {};
  for (const d of densities) {
    await clickSectionBtn(page, RT, d);
    await page.waitForTimeout(300);
    await scrollMainToSection(page, RT);
    await page.waitForTimeout(200);
    await shot(page, `rankingtable-density-${d.toLowerCase()}.png`);
    const probe = await probeAfterSection(page, RT);
    rtDensityProbes[d.toLowerCase()] = probe;
    console.log(`  density ${d} → pad:${probe.firstTdPadding} font:${probe.firstTdFontSize} rowH:${probe.firstTrHeight}`);
  }

  // RT Sticky
  await clickSectionBtn(page, RT, 'Card · Sticky header');
  await page.waitForTimeout(300);
  await scrollMainToSection(page, RT);
  await page.waitForTimeout(300);
  await shot(page, 'rankingtable-sticky-idle.png');
  const rtStickyIdle = await probeAfterSection(page, RT);
  console.log(`  sticky idle → thPos:${rtStickyIdle.thPosition} scrollH:${rtStickyIdle.scrollParentScrollH} clientH:${rtStickyIdle.scrollParentClientH}`);

  const rtScrolled = await scrollTableInSection(page, RT, 200);
  console.log(`  RT scroll container:`, JSON.stringify(rtScrolled));
  await page.waitForTimeout(500);
  await scrollMainToSection(page, RT);
  await page.waitForTimeout(200);
  await shot(page, 'rankingtable-sticky-scrolled.png');
  const rtStickyAfterScroll = await probeAfterSection(page, RT);
  console.log(`  sticky scrolled → thPos:${rtStickyAfterScroll.thPosition} thRectTop:${rtStickyAfterScroll.thRectTop?.toFixed(1)}`);

  await scrollTableInSection(page, RT, 0);

  // RT States
  await clickSectionBtn(page, RT, 'Normal');
  await page.waitForTimeout(200);
  await clickSectionBtn(page, RT, 'Empty');
  await page.waitForTimeout(300);
  await scrollMainToSection(page, RT);
  await page.waitForTimeout(200);
  await shot(page, 'rankingtable-state-empty.png');
  await clickSectionBtn(page, RT, 'Normal');
  await page.waitForTimeout(200);
  await clickSectionBtn(page, RT, 'Error');
  await page.waitForTimeout(300);
  await scrollMainToSection(page, RT);
  await page.waitForTimeout(200);
  await shot(page, 'rankingtable-state-error.png');
  await clickSectionBtn(page, RT, 'Normal');

  // RT final probe
  await clickSectionBtn(page, RT, 'Card · Wash header');
  await clickSectionBtn(page, RT, 'Standard');
  await page.waitForTimeout(300);
  const rtFinal = await probeAfterSection(page, RT);

  // ════════════════════════════════════════
  // POLISH CLOSE-UPS
  // ════════════════════════════════════════
  console.log('\n═══ Polish close-ups ═══');
  await navTo(page, PT);
  await page.waitForTimeout(400);
  await scrollMainToSection(page, PT);
  await page.waitForTimeout(300);

  // Wash header
  await clickSectionBtn(page, PT, 'Card · Wash header');
  await page.waitForTimeout(300);
  const thead = page.locator('thead').first();
  if (await thead.count() > 0 && await thead.isVisible()) {
    const box = await thead.boundingBox();
    if (box) {
      await page.screenshot({ path: join(OUT, 'polish-header-wash.png'), clip: { x: Math.max(0,box.x-10), y: Math.max(0,box.y-4), width: Math.min(box.width+20, 1440), height: box.height+8 } });
      console.log('  ✓ polish-header-wash.png');
    }
  }

  // Inverted header
  await clickSectionBtn(page, PT, 'Card · Inverted header');
  await page.waitForTimeout(300);
  const thead2 = page.locator('thead').first();
  if (await thead2.count() > 0 && await thead2.isVisible()) {
    const box = await thead2.boundingBox();
    if (box) {
      await page.screenshot({ path: join(OUT, 'polish-header-inverted.png'), clip: { x: Math.max(0,box.x-10), y: Math.max(0,box.y-4), width: Math.min(box.width+20, 1440), height: box.height+8 } });
      console.log('  ✓ polish-header-inverted.png');
    }
  }

  // Comfortable rows
  await clickSectionBtn(page, PT, 'Card · Wash header');
  await clickSectionBtn(page, PT, 'Comfortable');
  await page.waitForTimeout(300);
  const comfRow = page.locator('tbody tr').first();
  if (await comfRow.count() > 0 && await comfRow.isVisible()) {
    const box = await comfRow.boundingBox();
    if (box) {
      await page.screenshot({ path: join(OUT, 'polish-cell-padding-comfortable.png'), clip: { x: Math.max(0,box.x-10), y: Math.max(0,box.y-4), width: Math.min(box.width+20,1440), height: Math.min(box.height*4,300) } });
      console.log('  ✓ polish-cell-padding-comfortable.png');
    }
  }

  // Compact rows
  await clickSectionBtn(page, PT, 'Compact');
  await page.waitForTimeout(300);
  const compRow = page.locator('tbody tr').first();
  if (await compRow.count() > 0 && await compRow.isVisible()) {
    const box = await compRow.boundingBox();
    if (box) {
      await page.screenshot({ path: join(OUT, 'polish-cell-padding-compact.png'), clip: { x: Math.max(0,box.x-10), y: Math.max(0,box.y-4), width: Math.min(box.width+20,1440), height: Math.min(box.height*4,200) } });
      console.log('  ✓ polish-cell-padding-compact.png');
    }
  }

  // ════════════════════════════════════════
  // SAVE PROBE JSON
  // ════════════════════════════════════════
  const probe = {
    timestamp: new Date().toISOString(),
    consoleErrors,
    PropertyTable: {
      initial: ptInit,
      cardwash_standard: ptFinal,
      sticky_idle: ptStickyIdle,
      sticky_after_scroll: ptStickyAfterScroll,
      variants: ptVariantProbes,
      densities: ptDensityProbes,
    },
    RankingTable: {
      initial: rtInit,
      cardwash_standard: rtFinal,
      sticky_idle: rtStickyIdle,
      sticky_after_scroll: rtStickyAfterScroll,
      variants: rtVariantProbes,
      densities: rtDensityProbes,
    },
  };
  writeFileSync(join(OUT, 'tables-postfix-probe.json'), JSON.stringify(probe, null, 2));
  console.log('\n  ✓ tables-postfix-probe.json saved');

  // ════════════════════════════════════════
  // BUG MATRIX SUMMARY
  // ════════════════════════════════════════
  console.log('\n══ BUG VERIFICATION ══');
  const ptCW = ptFinal;
  const rtCW = rtFinal;

  // Bug 1: cell padding
  console.log(`  Bug 1 (cell padding 0):  PT=${ptCW.firstTdPadding}  RT=${rtCW.firstTdPadding}`);
  console.log(`    → ${ptCW.firstTdPadding && ptCW.firstTdPadding !== '0px' ? 'FIXED' : 'STILL BROKEN'}`);

  // Bug 2: sticky
  const ptStickyTopAfter = ptStickyAfterScroll.thRectTop;
  const ptStickyScrollH = ptStickyIdle.scrollParentScrollH;
  const ptStickyClientH = ptStickyIdle.scrollParentClientH;
  const hasStickyContainer = ptStickyScrollH > ptStickyClientH + 5;
  const headerPinnedAtTop = ptStickyTopAfter !== null && ptStickyTopAfter >= 0 && ptStickyTopAfter < 100;
  console.log(`  Bug 2 (sticky broken):   thPos=${ptStickyIdle.thPosition}  scrollable=${hasStickyContainer}  thRectTopAfterScroll=${ptStickyTopAfter?.toFixed(1)}`);
  console.log(`    → ${ptStickyIdle.thPosition === 'sticky' && headerPinnedAtTop ? 'FIXED' : ptStickyIdle.thPosition === 'sticky' ? 'PARTIAL (position:sticky set but header may not clamp)' : 'STILL BROKEN (position:static)'}`);

  // Bug 3: inverted header
  const ptInv = ptVariantProbes['card-inverted'];
  const rtInv = rtVariantProbes['card-inverted'];
  console.log(`  Bug 3 (inverted header): PT thBg=${ptInv?.thBg}  thColor=${ptInv?.thColor}`);
  console.log(`    → ${ptInv?.thBg === 'rgb(91, 79, 207)' && ptInv?.thColor === 'rgb(255, 255, 255)' ? 'FIXED' : 'STILL BROKEN'}`);

  // Bug 4: header wash
  const ptWash = ptVariantProbes['card-wash'];
  console.log(`  Bug 4 (header wash):     PT thBg=${ptWash?.thBg}`);
  console.log(`    → ${ptWash?.thBg === 'rgb(248, 247, 254)' ? 'FIXED' : 'STILL BROKEN - got ' + ptWash?.thBg}`);

  // Bug 5: 16px font
  console.log(`  Bug 5 (16px font leak):  PT font=${ptCW.firstTdFontSize}`);
  console.log(`    → ${ptCW.firstTdFontSize && ptCW.firstTdFontSize !== '16px' ? 'FIXED (' + ptCW.firstTdFontSize + ')' : 'STILL BROKEN'}`);

  // Density delta
  console.log('\n  Density delta (compact vs spacious):');
  const cpPad = ptDensityProbes['compact']?.firstTdPadding;
  const spPad = ptDensityProbes['spacious']?.firstTdPadding;
  const cpH = ptDensityProbes['compact']?.firstTrHeight;
  const spH = ptDensityProbes['spacious']?.firstTrHeight;
  console.log(`    compact:  pad=${cpPad}  rowH=${cpH?.toFixed(1)}`);
  console.log(`    standard: pad=${ptDensityProbes['standard']?.firstTdPadding}  rowH=${ptDensityProbes['standard']?.firstTrHeight?.toFixed(1)}`);
  console.log(`    comfortable: pad=${ptDensityProbes['comfortable']?.firstTdPadding}  rowH=${ptDensityProbes['comfortable']?.firstTrHeight?.toFixed(1)}`);
  console.log(`    spacious: pad=${spPad}  rowH=${spH?.toFixed(1)}`);
  console.log(`    Clear visual delta: ${cpH !== spH ? 'YES (' + cpH?.toFixed(1) + ' vs ' + spH?.toFixed(1) + ')' : 'NO (same height)'}`);

  console.log(`\n  Console errors (unique): ${[...new Set(consoleErrors)].length}`);

  await browser.close();
  console.log('\n═══ DONE ═══');
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
