/**
 * REF TABLES DEEP MINE · 2026-05-25
 * Captures: outer boundaries · corners · sticky · scroll · spacing · compact vs comfortable
 * CONFIDENTIAL · internal only · not for external distribution
 */
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = __dirname;

const REFS = [
  { key: 'ref1', url: 'https://rainbow-pothos-3943b2.netlify.app/' },
  { key: 'ref2', url: 'https://merged-report.vercel.app/' },
];

// ── PROBE A · outer wrappers per table ──────────────────────────────────────
const PROBE_A = () => {
  const tables = [];
  document.querySelectorAll('table').forEach((t, i) => {
    const wrappers = [];
    let cur = t.parentElement;
    let depth = 0;
    while (cur && depth < 5) {
      const cs = getComputedStyle(cur);
      wrappers.push({
        depth,
        tag: cur.tagName,
        classes: (cur.className || '').toString().slice(0, 100),
        overflowX: cs.overflowX,
        overflowY: cs.overflowY,
        border: cs.border,
        borderTop: cs.borderTop,
        borderRadius: cs.borderRadius,
        boxShadow: cs.boxShadow,
        backgroundColor: cs.backgroundColor,
        padding: cs.padding,
        marginTop: cs.marginTop,
        marginBottom: cs.marginBottom,
        width: cs.width,
      });
      cur = cur.parentElement;
      depth++;
    }

    const cs = getComputedStyle(t);
    const rows = t.querySelectorAll('tr');
    const firstRow = rows[0];
    const firstRowHeight = firstRow ? firstRow.getBoundingClientRect().height : null;
    const theadRows = t.querySelectorAll('thead tr');
    const tbodyRows = t.querySelectorAll('tbody tr');
    const colCount = Math.max(
      t.querySelectorAll('thead th').length,
      t.querySelector('tbody tr') ? t.querySelector('tbody tr').querySelectorAll('td').length : 0
    );

    // measure header cell padding
    const firstTh = t.querySelector('thead th');
    const firstTd = t.querySelector('tbody td');
    const lastTd = t.querySelector('tbody tr:last-child td:last-child');

    tables.push({
      idx: i,
      sectionId: t.closest('[id]')?.id || 'unknown',
      sectionClass: t.closest('[class]')?.className?.toString().slice(0, 80) || '',
      rowCount: rows.length,
      theadRows: theadRows.length,
      tbodyRows: tbodyRows.length,
      colCount,
      firstRowHeightPx: firstRowHeight,
      tableBorder: cs.border,
      tableBorderCollapse: cs.borderCollapse,
      tableBorderRadius: cs.borderRadius,
      tableBoxShadow: cs.boxShadow,
      tableBackgroundColor: cs.backgroundColor,
      tableWidth: cs.width,
      headerThPadding: firstTh ? getComputedStyle(firstTh).padding : null,
      headerThBg: firstTh ? getComputedStyle(firstTh).backgroundColor : null,
      headerThFontSize: firstTh ? getComputedStyle(firstTh).fontSize : null,
      headerThFontWeight: firstTh ? getComputedStyle(firstTh).fontWeight : null,
      headerThColor: firstTh ? getComputedStyle(firstTh).color : null,
      headerThPosition: firstTh ? getComputedStyle(firstTh).position : null,
      headerThTop: firstTh ? getComputedStyle(firstTh).top : null,
      headerThZIndex: firstTh ? getComputedStyle(firstTh).zIndex : null,
      firstTdPadding: firstTd ? getComputedStyle(firstTd).padding : null,
      firstTdFontSize: firstTd ? getComputedStyle(firstTd).fontSize : null,
      firstTdBorderTop: firstTd ? getComputedStyle(firstTd).borderTop : null,
      firstTdBorderBottom: firstTd ? getComputedStyle(firstTd).borderBottom : null,
      lastTdBorderRadius: lastTd ? getComputedStyle(lastTd).borderRadius : null,
      lastTdBorderBottom: lastTd ? getComputedStyle(lastTd).borderBottom : null,
      wrappers,
    });
  });
  return tables;
};

// ── PROBE B · corner treatment ───────────────────────────────────────────────
const PROBE_B = () => {
  const corners = [];
  document.querySelectorAll('table').forEach((t, i) => {
    const headerCells = Array.from(t.querySelectorAll('thead th'));
    const tbodyRows = Array.from(t.querySelectorAll('tbody tr'));
    const headFirst = headerCells[0];
    const headLast = headerCells[headerCells.length - 1];
    const firstBodyRow = tbodyRows[0];
    const lastBodyRow = tbodyRows[tbodyRows.length - 1];

    const probe = (el) => {
      if (!el) return null;
      const cs = getComputedStyle(el);
      return {
        borderRadius: cs.borderRadius,
        borderTop: cs.borderTop,
        borderBottom: cs.borderBottom,
        borderLeft: cs.borderLeft,
        borderRight: cs.borderRight,
        bg: cs.backgroundColor,
        padding: cs.padding,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        verticalAlign: cs.verticalAlign,
        lineHeight: cs.lineHeight,
        height: el.getBoundingClientRect().height + 'px',
      };
    };

    corners.push({
      idx: i,
      headerFirst: probe(headFirst),
      headerLast: probe(headLast),
      firstBodyRowFirstTd: probe(firstBodyRow?.querySelector('td')),
      firstBodyRowLastTd: probe(firstBodyRow?.querySelector('td:last-child')),
      lastBodyRowFirstTd: probe(lastBodyRow?.querySelector('td')),
      lastBodyRowLastTd: probe(lastBodyRow?.querySelector('td:last-child')),
    });
  });
  return corners;
};

// ── PROBE C · spacing context (elements around table) ───────────────────────
const PROBE_C = () => {
  const spacing = [];
  document.querySelectorAll('table').forEach((t, i) => {
    const container = t.closest('div, section, article') || t.parentElement;
    // find previous sibling element
    const prevEl = t.previousElementSibling;
    const nextEl = t.nextElementSibling;
    // walk up to find section
    let section = t.parentElement;
    let sectionDepth = 0;
    while (section && section.tagName !== 'SECTION' && sectionDepth < 5) {
      section = section.parentElement;
      sectionDepth++;
    }
    const sectionPadding = section ? getComputedStyle(section).padding : null;
    const sectionBg = section ? getComputedStyle(section).backgroundColor : null;

    const probeEl = (el) => {
      if (!el) return null;
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        classes: (el.className || '').toString().slice(0, 60),
        text: el.textContent?.slice(0, 60),
        marginBottom: cs.marginBottom,
        marginTop: cs.marginTop,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        fontStyle: cs.fontStyle,
        color: cs.color,
        height: rect.height + 'px',
      };
    };

    spacing.push({
      idx: i,
      prevSibling: probeEl(prevEl),
      nextSibling: probeEl(nextEl),
      containerPadding: container ? getComputedStyle(container).padding : null,
      containerMaxWidth: container ? getComputedStyle(container).maxWidth : null,
      containerWidth: container ? getComputedStyle(container).width : null,
      sectionPadding,
      sectionBg,
      tableMarginTop: getComputedStyle(t).marginTop,
      tableMarginBottom: getComputedStyle(t).marginBottom,
    });
  });
  return spacing;
};

// ── PROBE D · scrollbar + overflow container analysis ───────────────────────
const PROBE_D = () => {
  const scroll = [];
  document.querySelectorAll('table').forEach((t, i) => {
    // Walk up to find overflow:auto/scroll container
    let cur = t.parentElement;
    let depth = 0;
    let scrollContainers = [];
    while (cur && depth < 6) {
      const cs = getComputedStyle(cur);
      if (cs.overflowX === 'auto' || cs.overflowX === 'scroll' ||
          cs.overflowY === 'auto' || cs.overflowY === 'scroll') {
        const rect = cur.getBoundingClientRect();
        scrollContainers.push({
          depth,
          tag: cur.tagName,
          classes: (cur.className || '').toString().slice(0, 80),
          overflowX: cs.overflowX,
          overflowY: cs.overflowY,
          scrollWidth: cur.scrollWidth,
          clientWidth: cur.clientWidth,
          isHScrollable: cur.scrollWidth > cur.clientWidth,
          height: rect.height,
          width: rect.width,
          // Check for scrollbar styling
          maskImage: cs.maskImage || cs.webkitMaskImage,
        });
      }
      cur = cur.parentElement;
      depth++;
    }
    scroll.push({ idx: i, scrollContainers });
  });
  return scroll;
};

// ── PROBE E · compact row height sampling ────────────────────────────────────
const PROBE_E = () => {
  const rowData = [];
  document.querySelectorAll('table').forEach((t, i) => {
    const rows = Array.from(t.querySelectorAll('tbody tr'));
    const sample = rows.slice(0, 5).map((r, ri) => {
      const cells = Array.from(r.querySelectorAll('td'));
      const firstCell = cells[0];
      const cs = firstCell ? getComputedStyle(firstCell) : null;
      return {
        rowIdx: ri,
        rowHeightPx: r.getBoundingClientRect().height,
        cellPadding: cs?.padding,
        cellPaddingTop: cs?.paddingTop,
        cellPaddingBottom: cs?.paddingBottom,
        cellPaddingLeft: cs?.paddingLeft,
        cellPaddingRight: cs?.paddingRight,
        cellFontSize: cs?.fontSize,
        cellLineHeight: cs?.lineHeight,
        cellVerticalAlign: cs?.verticalAlign,
        cellFontStyle: cs?.fontStyle,
        firstCellText: firstCell?.textContent?.slice(0, 40),
        // check for pill/badge in cell
        hasPill: !!r.querySelector('.pill, .badge, .tag, .chip, [class*="pill"], [class*="badge"], [class*="tag"], [class*="chip"]'),
        hasStars: !!r.querySelector('[class*="star"], [class*="rating"]'),
        hasBar: !!r.querySelector('[class*="bar"], progress'),
      };
    });
    rowData.push({ idx: i, rowSample: sample });
  });
  return rowData;
};

async function runProbes(page) {
  const [probeA, probeB, probeC, probeD, probeE] = await Promise.all([
    page.evaluate(PROBE_A),
    page.evaluate(PROBE_B),
    page.evaluate(PROBE_C),
    page.evaluate(PROBE_D),
    page.evaluate(PROBE_E),
  ]);
  return { probeA, probeB, probeC, probeD, probeE };
}

async function scrollFullPage(page) {
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let total = document.body.scrollHeight;
      let current = 0;
      const step = 800;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        current += step;
        if (current >= total) {
          clearInterval(timer);
          resolve();
        }
      }, 80);
    });
  });
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
}

async function captureTableScreenshots(page, refKey) {
  const screenshots = [];
  const tables = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('table')).map((t, i) => {
      const rect = t.getBoundingClientRect();
      const scrollTop = window.scrollY;
      return {
        idx: i,
        top: rect.top + scrollTop,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        rowCount: t.querySelectorAll('tr').length,
      };
    });
  });

  console.log(`  Found ${tables.length} tables in ${refKey}`);

  for (const tbl of tables) {
    // scroll table into view with margin
    await page.evaluate((top) => window.scrollTo(0, Math.max(0, top - 150)), tbl.top);
    await page.waitForTimeout(600);

    // context shot: table in section (~1100px tall)
    const contextFile = path.join(OUT, `${refKey}-table-${String(tbl.idx).padStart(2,'0')}-context.png`);
    await page.screenshot({
      path: contextFile,
      clip: {
        x: 0,
        y: Math.max(0, tbl.top - 100 - (tbl.top > 100 ? 0 : 0)),
        width: 1440,
        height: Math.min(1100, tbl.height + 200),
      },
    });
    screenshots.push(contextFile);

    // detail shot: table only + 24px margin
    const detailFile = path.join(OUT, `${refKey}-table-${String(tbl.idx).padStart(2,'0')}-detail.png`);
    const viewportTop = await page.evaluate((top) => top - window.scrollY, tbl.top);
    await page.screenshot({
      path: detailFile,
      clip: {
        x: Math.max(0, tbl.left - 24),
        y: Math.max(0, viewportTop - 24),
        width: Math.min(1440 - Math.max(0, tbl.left - 24), tbl.width + 48),
        height: Math.min(900, tbl.height + 48),
      },
    });
    screenshots.push(detailFile);
  }

  return { tables, screenshots };
}

async function captureSticky(page, refKey) {
  // Find table with sticky header (most likely the large one)
  const stickyTable = await page.evaluate(() => {
    const tables = Array.from(document.querySelectorAll('table'));
    for (let i = 0; i < tables.length; i++) {
      const ths = tables[i].querySelectorAll('thead th');
      for (const th of ths) {
        if (getComputedStyle(th).position === 'sticky') {
          const rect = tables[i].getBoundingClientRect();
          const scrollTop = window.scrollY;
          return {
            idx: i,
            top: rect.top + scrollTop,
            height: rect.height,
            rowCount: tables[i].querySelectorAll('tr').length,
          };
        }
      }
    }
    return null;
  });

  if (!stickyTable) {
    console.log(`  No sticky table found in ${refKey}`);
    return null;
  }

  console.log(`  Sticky table found in ${refKey}: idx=${stickyTable.idx} rows=${stickyTable.rowCount}`);

  // Screenshot at IDLE (scroll to just above table)
  await page.evaluate((top) => window.scrollTo(0, Math.max(0, top - 200)), stickyTable.top);
  await page.waitForTimeout(600);
  const idleFile = path.join(OUT, `${refKey}-sticky-table-idle.png`);
  await page.screenshot({ path: idleFile });

  // Probe idle th styles
  const idleStyles = await page.evaluate((idx) => {
    const t = document.querySelectorAll('table')[idx];
    const th = t?.querySelector('thead th');
    if (!th) return null;
    const cs = getComputedStyle(th);
    return {
      position: cs.position,
      top: cs.top,
      zIndex: cs.zIndex,
      backgroundColor: cs.backgroundColor,
      boxShadow: cs.boxShadow,
      borderBottom: cs.borderBottom,
    };
  }, stickyTable.idx);

  // Scroll PAST the table header (200px into table body)
  await page.evaluate((top) => window.scrollTo(0, top + 200), stickyTable.top);
  await page.waitForTimeout(800);
  const activeFile = path.join(OUT, `${refKey}-sticky-table-active.png`);
  await page.screenshot({ path: activeFile });

  // Probe active (sticky engaged) th styles
  const activeStyles = await page.evaluate((idx) => {
    const t = document.querySelectorAll('table')[idx];
    const th = t?.querySelector('thead th');
    if (!th) return null;
    const cs = getComputedStyle(th);
    const rect = th.getBoundingClientRect();
    return {
      position: cs.position,
      top: cs.top,
      zIndex: cs.zIndex,
      backgroundColor: cs.backgroundColor,
      boxShadow: cs.boxShadow,
      borderBottom: cs.borderBottom,
      // check if actually stuck at top of viewport
      thTop: rect.top,
    };
  }, stickyTable.idx);

  return { stickyTable, idleStyles, activeStyles, idleFile, activeFile };
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const allResults = {};

  for (const { key, url } of REFS) {
    console.log(`\n=== ${key} ===`);
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36',
    });
    const page = await ctx.newPage();

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(2000);

      // Full-page scroll to trigger lazy loads
      await scrollFullPage(page);

      // Run all probes
      console.log('  Running probes A-E...');
      const probes = await runProbes(page);

      // Capture table screenshots
      console.log('  Capturing table screenshots...');
      const { tables, screenshots } = await captureTableScreenshots(page, key);

      // Capture sticky header behavior
      console.log('  Checking sticky headers...');
      const stickyResult = await captureSticky(page, key);

      // Mobile screenshots for 3 largest tables
      const topTables = tables.sort((a, b) => b.rowCount - a.rowCount).slice(0, 3);
      const mobileShots = [];
      for (const tbl of topTables) {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.evaluate((top) => window.scrollTo(0, Math.max(0, top - 100)), tbl.top);
        await page.waitForTimeout(500);
        const mobileFile = path.join(OUT, `${key}-table-${String(tbl.idx).padStart(2,'0')}-mobile-390.png`);
        await page.screenshot({ path: mobileFile, clip: { x: 0, y: 0, width: 390, height: 844 } });
        mobileShots.push(mobileFile);
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.waitForTimeout(300);
      }

      allResults[key] = {
        url,
        tableCount: tables.length,
        probes,
        tables,
        screenshots,
        mobileShots,
        stickyResult,
      };

    } catch (e) {
      console.error(`  ERROR: ${e.message}`);
      allResults[key] = { error: e.message };
    }

    await ctx.close();
  }

  // Save JSON
  const jsonPath = path.join(OUT, 'dom-probe-tables.json');
  fs.writeFileSync(jsonPath, JSON.stringify(allResults, null, 2));
  console.log(`\nSaved: ${jsonPath}`);

  await browser.close();
  return allResults;
}

main().then(results => {
  // Print summary
  for (const [key, data] of Object.entries(results)) {
    if (data.error) {
      console.log(`${key}: ERROR ${data.error}`);
      continue;
    }
    console.log(`${key}: ${data.tableCount} tables · ${data.screenshots.length} screenshots · sticky: ${data.stickyResult ? 'FOUND' : 'none'}`);
  }
}).catch(e => {
  console.error('Fatal:', e);
  process.exit(1);
});
