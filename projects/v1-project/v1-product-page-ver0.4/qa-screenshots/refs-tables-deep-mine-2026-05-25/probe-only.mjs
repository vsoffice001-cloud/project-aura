/**
 * PROBE-ONLY pass · saves JSON · no screenshots
 * CONFIDENTIAL
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
        borderBottom: cs.borderBottom,
        borderLeft: cs.borderLeft,
        borderRight: cs.borderRight,
        borderRadius: cs.borderRadius,
        boxShadow: cs.boxShadow,
        backgroundColor: cs.backgroundColor,
        padding: cs.padding,
        marginTop: cs.marginTop,
        marginBottom: cs.marginBottom,
        width: cs.width,
        maxWidth: cs.maxWidth,
      });
      cur = cur.parentElement;
      depth++;
    }

    const cs = getComputedStyle(t);
    const rows = t.querySelectorAll('tr');
    const firstTh = t.querySelector('thead th');
    const firstTd = t.querySelector('tbody td');
    const lastTbodyRow = t.querySelector('tbody tr:last-child');
    const lastTd = lastTbodyRow ? lastTbodyRow.querySelector('td:last-child') : null;

    // Measure row heights for first 5 tbody rows
    const tbodyRows = Array.from(t.querySelectorAll('tbody tr'));
    const rowHeights = tbodyRows.slice(0, 5).map(r => Math.round(r.getBoundingClientRect().height));
    const headerRowHeight = t.querySelector('thead tr') ? Math.round(t.querySelector('thead tr').getBoundingClientRect().height) : null;

    // col count
    const colCount = Math.max(
      t.querySelectorAll('thead th').length,
      (t.querySelector('tbody tr') || { querySelectorAll: () => [] }).querySelectorAll('td').length
    );

    const probeEl = (el) => {
      if (!el) return null;
      const s = getComputedStyle(el);
      return {
        borderRadius: s.borderRadius,
        borderTop: s.borderTop,
        borderBottom: s.borderBottom,
        borderLeft: s.borderLeft,
        borderRight: s.borderRight,
        bg: s.backgroundColor,
        padding: s.padding,
        paddingTop: s.paddingTop,
        paddingBottom: s.paddingBottom,
        paddingLeft: s.paddingLeft,
        paddingRight: s.paddingRight,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        fontStyle: s.fontStyle,
        color: s.color,
        lineHeight: s.lineHeight,
        verticalAlign: s.verticalAlign,
        position: s.position,
        top: s.top,
        zIndex: s.zIndex,
        boxShadow: s.boxShadow,
        height: Math.round(el.getBoundingClientRect().height) + 'px',
      };
    };

    tables.push({
      idx: i,
      sectionId: t.closest('[id]')?.id || 'unknown',
      sectionClass: (t.closest('[class]')?.className || '').toString().slice(0, 80),
      rowCount: rows.length,
      colCount,
      theadRows: t.querySelectorAll('thead tr').length,
      tbodyRows: tbodyRows.length,
      tbodyRowHeights: rowHeights,
      headerRowHeightPx: headerRowHeight,
      tableBorderCollapse: cs.borderCollapse,
      tableBorder: cs.border,
      tableBorderTop: cs.borderTop,
      tableBoxShadow: cs.boxShadow,
      tableBackgroundColor: cs.backgroundColor,
      tableWidth: cs.width,
      tableMaxWidth: cs.maxWidth,
      tableBorderRadius: cs.borderRadius,
      tableMarginTop: cs.marginTop,
      tableMarginBottom: cs.marginBottom,
      firstTh: probeEl(firstTh),
      firstTd: probeEl(firstTd),
      lastTd: probeEl(lastTd),
      wrappers,
    });
  });
  return tables;
};

const PROBE_CONTEXT = () => {
  const context = [];
  document.querySelectorAll('table').forEach((t, i) => {
    const prevEl = t.previousElementSibling;
    const nextEl = t.nextElementSibling;
    // find wrapping section
    let sec = t.parentElement;
    let secDepth = 0;
    while (sec && !['SECTION','ARTICLE','MAIN'].includes(sec.tagName) && secDepth < 8) {
      sec = sec.parentElement;
      secDepth++;
    }

    const probeEl = (el) => {
      if (!el) return null;
      const s = getComputedStyle(el);
      return {
        tag: el.tagName,
        classes: (el.className || '').toString().slice(0, 60),
        text: el.textContent?.trim().slice(0, 80),
        marginBottom: s.marginBottom,
        marginTop: s.marginTop,
        paddingBottom: s.paddingBottom,
        paddingTop: s.paddingTop,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        fontStyle: s.fontStyle,
        color: s.color,
        height: Math.round(el.getBoundingClientRect().height) + 'px',
      };
    };

    // walk up to find nearest text container
    let textCont = t.parentElement;
    const textContStyle = textCont ? getComputedStyle(textCont) : null;

    context.push({
      idx: i,
      prevSibling: probeEl(prevEl),
      nextSibling: probeEl(nextEl),
      sectionTag: sec?.tagName || null,
      sectionId: sec?.id || null,
      sectionPadding: sec ? getComputedStyle(sec).padding : null,
      sectionBg: sec ? getComputedStyle(sec).backgroundColor : null,
      containerPadding: textContStyle?.padding || null,
      containerMaxWidth: textContStyle?.maxWidth || null,
      tableOffsetTop: t.getBoundingClientRect().top + window.scrollY,
    });
  });
  return context;
};

const PROBE_SCROLL = () => {
  const scroll = [];
  document.querySelectorAll('table').forEach((t, i) => {
    let cur = t.parentElement;
    let depth = 0;
    const containers = [];
    while (cur && depth < 6) {
      const s = getComputedStyle(cur);
      const ox = s.overflowX;
      const oy = s.overflowY;
      if (ox === 'auto' || ox === 'scroll' || oy === 'auto' || oy === 'scroll') {
        containers.push({
          depth,
          tag: cur.tagName,
          classes: (cur.className || '').toString().slice(0, 80),
          overflowX: ox,
          overflowY: oy,
          scrollWidth: cur.scrollWidth,
          clientWidth: cur.clientWidth,
          isHScrollable: cur.scrollWidth > cur.clientWidth,
          maskImage: s.webkitMaskImage || s.maskImage || 'none',
          scrollSnapTypeX: s.scrollSnapType,
        });
      }
      cur = cur.parentElement;
      depth++;
    }
    scroll.push({ idx: i, scrollContainers: containers });
  });
  return scroll;
};

async function scrollFull(page) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  const step = 1000;
  for (let y = 0; y < height; y += step) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const allData = {};

  for (const { key, url } of REFS) {
    console.log(`\n=== ${key} ===`);
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36',
    });
    const page = await ctx.newPage();

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(3000);
      await scrollFull(page);

      const [probeA, probeContext, probeScroll] = await Promise.all([
        page.evaluate(PROBE_A),
        page.evaluate(PROBE_CONTEXT),
        page.evaluate(PROBE_SCROLL),
      ]);

      console.log(`  Tables: ${probeA.length}`);
      for (const t of probeA) {
        console.log(`  [${t.idx}] rows=${t.rowCount} cols=${t.colCount} heights=${t.tbodyRowHeights.join('/')}px sectionId=${t.sectionId.slice(0,30)}`);
        console.log(`       headerPos=${t.firstTh?.position} headerBG=${t.firstTh?.bg} thPad=${t.firstTh?.padding}`);
        console.log(`       wrap0 overflowX=${t.wrappers[0]?.overflowX} border=${t.wrappers[0]?.border?.slice(0,30)} bg=${t.wrappers[0]?.backgroundColor}`);
      }

      allData[key] = { url, probeA, probeContext, probeScroll };

    } catch (e) {
      console.error(`ERROR: ${e.message}`);
      allData[key] = { url, error: e.message };
    }

    await ctx.close();
  }

  const jsonPath = path.join(OUT, 'dom-probe-tables.json');
  fs.writeFileSync(jsonPath, JSON.stringify(allData, null, 2));
  console.log(`\nJSON saved: ${jsonPath}`);
  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
