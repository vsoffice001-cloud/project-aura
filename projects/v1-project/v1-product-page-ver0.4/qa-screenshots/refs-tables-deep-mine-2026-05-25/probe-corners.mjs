/**
 * Corner + border radius probe for selected tables
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

const PROBE_CORNERS = () => {
  const data = [];
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
        borderTopLeftRadius: cs.borderTopLeftRadius,
        borderTopRightRadius: cs.borderTopRightRadius,
        borderBottomLeftRadius: cs.borderBottomLeftRadius,
        borderBottomRightRadius: cs.borderBottomRightRadius,
        borderTop: cs.borderTop,
        borderBottom: cs.borderBottom,
        borderLeft: cs.borderLeft,
        borderRight: cs.borderRight,
        bg: cs.backgroundColor,
        padding: cs.padding,
        verticalAlign: cs.verticalAlign,
        height: Math.round(el.getBoundingClientRect().height) + 'px',
      };
    };

    // also probe the WRAPPER corner radius
    const wrap = t.parentElement;
    const wrapCs = wrap ? getComputedStyle(wrap) : null;

    data.push({
      idx: i,
      wrapBorderRadius: wrapCs?.borderRadius || null,
      wrapBorderTopLeftRadius: wrapCs?.borderTopLeftRadius || null,
      wrapBorderTopRightRadius: wrapCs?.borderTopRightRadius || null,
      wrapBorderBottomLeftRadius: wrapCs?.borderBottomLeftRadius || null,
      wrapBorderBottomRightRadius: wrapCs?.borderBottomRightRadius || null,
      wrapBorder: wrapCs?.border || null,
      wrapBoxShadow: wrapCs?.boxShadow || null,
      wrapOverflow: wrapCs?.overflow || null,
      headerFirst: probe(headFirst),
      headerLast: probe(headLast),
      firstBodyFirstTd: probe(firstBodyRow?.querySelector('td')),
      firstBodyLastTd: probe(firstBodyRow?.querySelector('td:last-child')),
      lastBodyFirstTd: probe(lastBodyRow?.querySelector('td')),
      lastBodyLastTd: probe(lastBodyRow?.querySelector('td:last-child')),
    });
  });
  return data;
};

async function scrollFull(page) {
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 1200) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(80);
  }
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const results = {};

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

      const corners = await page.evaluate(PROBE_CORNERS);
      results[key] = corners;

      for (const c of corners) {
        console.log(`Table ${c.idx}:`);
        console.log(`  wrap radius=${c.wrapBorderRadius} border=${(c.wrapBorder||'').slice(0,40)} shadow=${c.wrapBoxShadow} overflow=${c.wrapOverflow}`);
        if (c.headerFirst) {
          console.log(`  th-first: radius=${c.headerFirst.borderRadius} tl=${c.headerFirst.borderTopLeftRadius} tr=${c.headerFirst.borderTopRightRadius} bg=${c.headerFirst.bg}`);
        }
        if (c.lastBodyLastTd) {
          console.log(`  td-lastBodyLast: radius=${c.lastBodyLastTd.borderRadius} bl=${c.lastBodyLastTd.borderBottomLeftRadius} br=${c.lastBodyLastTd.borderBottomRightRadius} borderBottom=${c.lastBodyLastTd.borderBottom.slice(0,30)}`);
        }
      }

    } catch (e) {
      console.error(`ERROR: ${e.message}`);
      results[key] = { error: e.message };
    }

    await ctx.close();
  }

  const out = path.join(OUT, 'corner-probe.json');
  fs.writeFileSync(out, JSON.stringify(results, null, 2));
  console.log(`\nSaved: ${out}`);
  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
