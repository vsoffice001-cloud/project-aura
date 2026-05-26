/**
 * Sprint D.1 — polish close-up shots only (fix: scope thead to PT section)
 * Also re-captures state demos with scroll to show the state UI.
 */

import { chromium } from 'playwright';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = __dirname;
const BASE_URL = 'http://localhost:3070';

async function navTo(page, label) {
  const sidebar = page.locator('nav, aside').first();
  const link = sidebar.locator('a, button').filter({ hasText: new RegExp(`^${label}$`) }).first();
  if (await link.count() > 0) { await link.click(); await page.waitForTimeout(700); return true; }
  return false;
}

async function scrollMainToSection(page, sectionLabel) {
  const y = await page.evaluate((label) => {
    for (const h of document.querySelectorAll('h1,h2,h3,h4')) {
      if (h.textContent?.trim().toLowerCase().includes(label.toLowerCase())) {
        const main = document.querySelector('main');
        if (main) {
          const mainRect = main.getBoundingClientRect();
          const hRect = h.getBoundingClientRect();
          return main.scrollTop + (hRect.top - mainRect.top) - 10;
        }
      }
    }
    return null;
  }, sectionLabel);
  if (y !== null) {
    await page.evaluate((scrollY) => {
      const main = document.querySelector('main');
      if (main) main.scrollTop = Math.max(0, scrollY);
    }, y);
    await page.waitForTimeout(300);
  }
}

async function clickSectionBtn(page, sectionLabel, btnText) {
  return await page.evaluate(({ sectionLabel, btnText }) => {
    let sectionEl = null;
    for (const h of document.querySelectorAll('h1,h2,h3,h4')) {
      if (h.textContent?.trim().toLowerCase().includes(sectionLabel.toLowerCase())) {
        sectionEl = h; break;
      }
    }
    if (!sectionEl) return { clicked: false };
    const sectionBottom = sectionEl.getBoundingClientRect().bottom;
    for (const btn of document.querySelectorAll('button')) {
      const r = btn.getBoundingClientRect();
      const txt = btn.textContent?.trim() || '';
      if (r.top > sectionBottom && txt.toLowerCase() === btnText.toLowerCase()) {
        btn.click();
        return { clicked: true };
      }
    }
    return { clicked: false };
  }, { sectionLabel, btnText });
}

// Get bounding box of the thead inside the FIRST table after section heading
async function getTheadBoxAfterSection(page, sectionLabel) {
  return await page.evaluate((sectionLabel) => {
    let sectionEl = null;
    for (const h of document.querySelectorAll('h1,h2,h3,h4')) {
      if (h.textContent?.trim().toLowerCase().includes(sectionLabel.toLowerCase())) {
        sectionEl = h; break;
      }
    }
    if (!sectionEl) return null;
    const afterY = sectionEl.getBoundingClientRect().bottom;
    for (const t of document.querySelectorAll('table')) {
      const r = t.getBoundingClientRect();
      if (r.top > afterY && r.width > 100) {
        const thead = t.querySelector('thead');
        if (thead) {
          const tr = thead.getBoundingClientRect();
          return { x: tr.x, y: tr.y, width: tr.width, height: tr.height };
        }
      }
    }
    return null;
  }, sectionLabel);
}

// Get bounding box of first tbody row in table after section heading
async function getFirstRowBoxAfterSection(page, sectionLabel) {
  return await page.evaluate((sectionLabel) => {
    let sectionEl = null;
    for (const h of document.querySelectorAll('h1,h2,h3,h4')) {
      if (h.textContent?.trim().toLowerCase().includes(sectionLabel.toLowerCase())) {
        sectionEl = h; break;
      }
    }
    if (!sectionEl) return null;
    const afterY = sectionEl.getBoundingClientRect().bottom;
    for (const t of document.querySelectorAll('table')) {
      const r = t.getBoundingClientRect();
      if (r.top > afterY && r.width > 100) {
        const tbody = t.querySelector('tbody');
        const firstTr = tbody?.querySelector('tr');
        if (firstTr) {
          const tr = firstTr.getBoundingClientRect();
          return { x: tr.x, y: tr.y, width: tr.width, height: tr.height };
        }
      }
    }
    return null;
  }, sectionLabel);
}

// Get bounding box of the state demo area after section heading
async function getStateDemoBox(page, sectionLabel) {
  return await page.evaluate((sectionLabel) => {
    let sectionEl = null;
    for (const h of document.querySelectorAll('h1,h2,h3,h4')) {
      if (h.textContent?.trim().toLowerCase().includes(sectionLabel.toLowerCase())) {
        sectionEl = h; break;
      }
    }
    if (!sectionEl) return null;
    const afterY = sectionEl.getBoundingClientRect().bottom;
    // Look for state-related containers
    for (const el of document.querySelectorAll('[class*="state"], [class*="empty"], [class*="error"], [data-state]')) {
      const r = el.getBoundingClientRect();
      if (r.top > afterY && r.width > 100) {
        return { x: r.x, y: r.y, width: r.width, height: r.height };
      }
    }
    // Fallback: table area
    for (const t of document.querySelectorAll('table')) {
      const r = t.getBoundingClientRect();
      if (r.top > afterY && r.width > 100) {
        return { x: r.x - 10, y: r.y - 10, width: r.width + 20, height: r.height + 20 };
      }
    }
    return null;
  }, sectionLabel);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();

  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const PT = 'PropertyTable';
  const RT = 'RankingTable';

  // ── Navigate to PropertyTable ──
  await navTo(page, PT);
  await page.waitForTimeout(400);
  await scrollMainToSection(page, PT);
  await page.waitForTimeout(300);

  // ── Header wash close-up ──
  await clickSectionBtn(page, PT, 'Card · Wash header');
  await clickSectionBtn(page, PT, 'Standard');
  await page.waitForTimeout(350);
  await scrollMainToSection(page, PT);
  await page.waitForTimeout(300);

  const washBox = await getTheadBoxAfterSection(page, PT);
  console.log('wash thead box:', JSON.stringify(washBox));
  if (washBox) {
    await page.screenshot({
      path: join(OUT, 'polish-header-wash.png'),
      clip: { x: Math.max(0, washBox.x - 10), y: Math.max(0, washBox.y - 6), width: Math.min(washBox.width + 20, 1440), height: washBox.height + 10 }
    });
    console.log('  ✓ polish-header-wash.png');
  } else {
    // Full section screenshot as fallback
    await page.screenshot({ path: join(OUT, 'polish-header-wash.png') });
    console.log('  ✓ polish-header-wash.png (fallback full)');
  }

  // ── Header inverted close-up ──
  await clickSectionBtn(page, PT, 'Card · Inverted header');
  await page.waitForTimeout(350);
  await scrollMainToSection(page, PT);
  await page.waitForTimeout(300);

  const invBox = await getTheadBoxAfterSection(page, PT);
  console.log('inverted thead box:', JSON.stringify(invBox));
  if (invBox) {
    await page.screenshot({
      path: join(OUT, 'polish-header-inverted.png'),
      clip: { x: Math.max(0, invBox.x - 10), y: Math.max(0, invBox.y - 6), width: Math.min(invBox.width + 20, 1440), height: invBox.height + 10 }
    });
    console.log('  ✓ polish-header-inverted.png');
  } else {
    await page.screenshot({ path: join(OUT, 'polish-header-inverted.png') });
    console.log('  ✓ polish-header-inverted.png (fallback)');
  }

  // ── Comfortable row close-up ──
  await clickSectionBtn(page, PT, 'Card · Wash header');
  await clickSectionBtn(page, PT, 'Comfortable');
  await page.waitForTimeout(350);
  await scrollMainToSection(page, PT);
  await page.waitForTimeout(300);

  const comfBox = await getFirstRowBoxAfterSection(page, PT);
  console.log('comfortable row box:', JSON.stringify(comfBox));
  if (comfBox) {
    await page.screenshot({
      path: join(OUT, 'polish-cell-padding-comfortable.png'),
      clip: { x: Math.max(0, comfBox.x - 10), y: Math.max(0, comfBox.y - 4), width: Math.min(comfBox.width + 20, 1440), height: Math.min(comfBox.height * 4, 320) }
    });
    console.log('  ✓ polish-cell-padding-comfortable.png');
  }

  // ── Compact row close-up ──
  await clickSectionBtn(page, PT, 'Compact');
  await page.waitForTimeout(350);
  await scrollMainToSection(page, PT);
  await page.waitForTimeout(300);

  const compBox = await getFirstRowBoxAfterSection(page, PT);
  console.log('compact row box:', JSON.stringify(compBox));
  if (compBox) {
    await page.screenshot({
      path: join(OUT, 'polish-cell-padding-compact.png'),
      clip: { x: Math.max(0, compBox.x - 10), y: Math.max(0, compBox.y - 4), width: Math.min(compBox.width + 20, 1440), height: Math.min(compBox.height * 4, 220) }
    });
    console.log('  ✓ polish-cell-padding-compact.png');
  }

  // ── State demos — PT ──
  // Scroll down past variant buttons to see state buttons
  await clickSectionBtn(page, PT, 'Card · Wash header');
  await clickSectionBtn(page, PT, 'Normal');
  await page.waitForTimeout(200);

  // Click Empty and then scroll to show the state inside the table container
  await clickSectionBtn(page, PT, 'Empty');
  await page.waitForTimeout(400);
  // Scroll main so that the table area is visible (not just heading)
  await page.evaluate((sectionLabel) => {
    let sectionEl = null;
    for (const h of document.querySelectorAll('h1,h2,h3,h4')) {
      if (h.textContent?.trim().toLowerCase().includes(sectionLabel.toLowerCase())) {
        sectionEl = h; break;
      }
    }
    if (!sectionEl) return;
    const main = document.querySelector('main');
    if (!main) return;
    const mainRect = main.getBoundingClientRect();
    const hRect = sectionEl.getBoundingClientRect();
    // Scroll so section heading is 80px from top (showing heading + table)
    main.scrollTop = main.scrollTop + (hRect.top - mainRect.top) - 80;
  }, PT);
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(OUT, 'propertytable-state-empty.png') });
  console.log('  ✓ propertytable-state-empty.png');

  await clickSectionBtn(page, PT, 'Normal');
  await page.waitForTimeout(200);
  await clickSectionBtn(page, PT, 'Error');
  await page.waitForTimeout(400);
  await page.evaluate((sectionLabel) => {
    let sectionEl = null;
    for (const h of document.querySelectorAll('h1,h2,h3,h4')) {
      if (h.textContent?.trim().toLowerCase().includes(sectionLabel.toLowerCase())) {
        sectionEl = h; break;
      }
    }
    if (!sectionEl) return;
    const main = document.querySelector('main');
    if (!main) return;
    const mainRect = main.getBoundingClientRect();
    const hRect = sectionEl.getBoundingClientRect();
    main.scrollTop = main.scrollTop + (hRect.top - mainRect.top) - 80;
  }, PT);
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(OUT, 'propertytable-state-error.png') });
  console.log('  ✓ propertytable-state-error.png');
  await clickSectionBtn(page, PT, 'Normal');

  // ── RT state demos ──
  await navTo(page, RT);
  await page.waitForTimeout(400);
  await scrollMainToSection(page, RT);
  await page.waitForTimeout(300);

  await clickSectionBtn(page, RT, 'Normal');
  await page.waitForTimeout(200);
  await clickSectionBtn(page, RT, 'Empty');
  await page.waitForTimeout(400);
  await page.evaluate((sectionLabel) => {
    let sectionEl = null;
    for (const h of document.querySelectorAll('h1,h2,h3,h4')) {
      if (h.textContent?.trim().toLowerCase().includes(sectionLabel.toLowerCase())) {
        sectionEl = h; break;
      }
    }
    if (!sectionEl) return;
    const main = document.querySelector('main');
    if (!main) return;
    const mainRect = main.getBoundingClientRect();
    const hRect = sectionEl.getBoundingClientRect();
    main.scrollTop = main.scrollTop + (hRect.top - mainRect.top) - 80;
  }, RT);
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(OUT, 'rankingtable-state-empty.png') });
  console.log('  ✓ rankingtable-state-empty.png');

  await clickSectionBtn(page, RT, 'Normal');
  await page.waitForTimeout(200);
  await clickSectionBtn(page, RT, 'Error');
  await page.waitForTimeout(400);
  await page.evaluate((sectionLabel) => {
    let sectionEl = null;
    for (const h of document.querySelectorAll('h1,h2,h3,h4')) {
      if (h.textContent?.trim().toLowerCase().includes(sectionLabel.toLowerCase())) {
        sectionEl = h; break;
      }
    }
    if (!sectionEl) return;
    const main = document.querySelector('main');
    if (!main) return;
    const mainRect = main.getBoundingClientRect();
    const hRect = sectionEl.getBoundingClientRect();
    main.scrollTop = main.scrollTop + (hRect.top - mainRect.top) - 80;
  }, RT);
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(OUT, 'rankingtable-state-error.png') });
  console.log('  ✓ rankingtable-state-error.png');
  await clickSectionBtn(page, RT, 'Normal');

  await browser.close();
  console.log('\n═══ DONE ═══');
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
