/**
 * Screenshot-only pass · uses safe clip math
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

// Which tables to capture (by index) — pick representative ones
// ref1: 24 tables · capture indices: 0,1,3,6,7,11,16,17,19,23
// ref2: 9 tables · capture indices: 0,1,6,7,8
const CAPTURE_PLAN = {
  ref1: [0, 1, 3, 6, 7, 11, 16, 17, 19, 23],
  ref2: [0, 1, 6, 7, 8],
};

async function scrollFull(page) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 1200) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(80);
  }
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}

async function getTablePositions(page) {
  return page.evaluate(() => {
    return Array.from(document.querySelectorAll('table')).map((t, i) => {
      const rect = t.getBoundingClientRect();
      const scrollTop = window.scrollY;
      return {
        idx: i,
        absoluteTop: rect.top + scrollTop,
        absoluteLeft: rect.left,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        rowCount: t.querySelectorAll('tr').length,
      };
    });
  });
}

async function safeClip(x, y, w, h, vpW, vpH) {
  // Clamp to viewport
  const cx = Math.max(0, Math.min(x, vpW - 1));
  const cy = Math.max(0, Math.min(y, vpH - 1));
  const cw = Math.min(w, vpW - cx);
  const ch = Math.min(h, vpH - cy);
  return { x: cx, y: cy, width: Math.max(1, cw), height: Math.max(1, ch) };
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const VW = 1440, VH = 900;
  const allShots = {};

  for (const { key, url } of REFS) {
    console.log(`\n=== ${key} ===`);
    const ctx = await browser.newContext({
      viewport: { width: VW, height: VH },
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36',
    });
    const page = await ctx.newPage();
    allShots[key] = [];

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(3000);
      await scrollFull(page);

      const tables = await getTablePositions(page);
      const toCapture = CAPTURE_PLAN[key] || [];

      for (const idx of toCapture) {
        const tbl = tables.find(t => t.idx === idx);
        if (!tbl) { console.log(`  table ${idx}: not found`); continue; }

        // Scroll table into view with padding
        const scrollTo = Math.max(0, tbl.absoluteTop - 120);
        await page.evaluate((y) => window.scrollTo(0, y), scrollTo);
        await page.waitForTimeout(700);

        // Get current viewport position of table
        const viewportY = await page.evaluate((absTop) => absTop - window.scrollY, tbl.absoluteTop);

        // CONTEXT shot: full viewport after scroll
        const contextFile = path.join(OUT, `${key}-table-${String(idx).padStart(2,'0')}-context.png`);
        await page.screenshot({ path: contextFile });
        allShots[key].push(contextFile);
        console.log(`  [${idx}] context: rows=${tbl.rowCount} viewportY=${Math.round(viewportY)}`);

        // DETAIL shot: table only + 20px margin, clamped to viewport
        const detailClip = await safeClip(
          Math.max(0, tbl.absoluteLeft - 20),
          Math.max(0, viewportY - 20),
          Math.min(tbl.width + 40, VW),
          Math.min(tbl.height + 40, VH),
          VW, VH
        );
        if (detailClip.width > 10 && detailClip.height > 10) {
          const detailFile = path.join(OUT, `${key}-table-${String(idx).padStart(2,'0')}-detail.png`);
          await page.screenshot({ path: detailFile, clip: detailClip });
          allShots[key].push(detailFile);
          console.log(`  [${idx}] detail: clip=${JSON.stringify(detailClip)}`);
        }
      }

      // STICKY test for ref2 table 8 (201 rows)
      if (key === 'ref2') {
        const stickyTbl = tables.find(t => t.idx === 8);
        if (stickyTbl) {
          // Idle state: just above table
          await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 100)), stickyTbl.absoluteTop);
          await page.waitForTimeout(800);
          const idleFile = path.join(OUT, `${key}-sticky-table-idle.png`);
          await page.screenshot({ path: idleFile });
          allShots[key].push(idleFile);
          console.log(`  [8] sticky idle`);

          // Active: scroll 300px into table body
          await page.evaluate((y) => window.scrollTo(0, y + 300), stickyTbl.absoluteTop);
          await page.waitForTimeout(800);
          const activeFile = path.join(OUT, `${key}-sticky-table-active.png`);
          await page.screenshot({ path: activeFile });
          allShots[key].push(activeFile);
          console.log(`  [8] sticky active`);

          // Probe th at sticky position
          const stickyStyles = await page.evaluate(() => {
            const t = document.querySelectorAll('table')[8];
            const th = t?.querySelector('thead th');
            if (!th) return null;
            const rect = th.getBoundingClientRect();
            const cs = getComputedStyle(th);
            return {
              position: cs.position,
              top: cs.top,
              zIndex: cs.zIndex,
              bg: cs.backgroundColor,
              boxShadow: cs.boxShadow,
              borderBottom: cs.borderBottom,
              thRectTop: Math.round(rect.top),
              thRectLeft: Math.round(rect.left),
            };
          });
          console.log(`  [8] sticky styles at active:`, JSON.stringify(stickyStyles));

          // Save sticky styles to JSON
          const stickyPath = path.join(OUT, 'sticky-probe.json');
          fs.writeFileSync(stickyPath, JSON.stringify(stickyStyles, null, 2));
        }
      }

      // Mobile shots for 3 representative tables
      const mobileTargets = CAPTURE_PLAN[key].slice(0, 3);
      await page.setViewportSize({ width: 390, height: 844 });
      for (const idx of mobileTargets) {
        const tbl = tables.find(t => t.idx === idx);
        if (!tbl) continue;
        await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 60)), tbl.absoluteTop);
        await page.waitForTimeout(600);
        const mFile = path.join(OUT, `${key}-table-${String(idx).padStart(2,'0')}-mobile-390.png`);
        await page.screenshot({ path: mFile });
        allShots[key].push(mFile);
        console.log(`  [${idx}] mobile-390`);
      }

    } catch (e) {
      console.error(`  ERROR: ${e.message}`);
    }

    await ctx.close();
  }

  const shotsJson = path.join(OUT, 'screenshots-manifest.json');
  fs.writeFileSync(shotsJson, JSON.stringify(allShots, null, 2));
  console.log(`\nManifest: ${shotsJson}`);
  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
