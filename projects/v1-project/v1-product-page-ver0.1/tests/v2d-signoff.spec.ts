/**
 * v2d sign-off QA — axe both routes + screenshots + console scan
 * Run: pnpm exec playwright test v2d-signoff
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as path from 'path';
import * as fs from 'fs';

const PRIMARY = '/reports/australia-cold-chain-market-2022-2027';
const SECONDARY = '/reports/gcc-pharmaceutical-market-outlook-2026';
const OUT_DIR = path.join(process.cwd(), 'qa-screenshots/v2d-verified');

function ensureDir(p: string) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

async function fullScroll(page: any) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}

// ---- AXE: Australia desktop 1440 ----
test('axe-australia-desktop', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', (msg: any) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', (err: Error) => consoleErrors.push(`PAGEERROR: ${err.message}`));

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(PRIMARY, { waitUntil: 'networkidle' });
  await fullScroll(page);
  // Extra wait for Framer entrance animations + CSS variables to settle
  await page.waitForTimeout(2000);

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();

  const critical = results.violations.filter((v: any) => v.impact === 'critical');
  const serious  = results.violations.filter((v: any) => v.impact === 'serious');

  console.log(`[AXE AUSTRALIA DESKTOP] critical=${critical.length} serious=${serious.length} total=${results.violations.length}`);
  results.violations.forEach((v: any) => {
    console.log(`  [${v.impact}] ${v.id}: ${v.description}`);
    v.nodes.slice(0, 2).forEach((n: any) => console.log(`    target: ${n.target[0]}`));
  });
  console.log(`[CONSOLE ERRORS AUSTRALIA DESKTOP] ${consoleErrors.length}`);
  consoleErrors.forEach(e => console.log(`  ${e}`));

  expect(critical.length, `Critical: ${critical.map((v: any) => v.id).join(', ')}`).toBe(0);
  expect(serious.length,  `Serious:  ${serious.map((v: any) => v.id).join(', ')}`).toBe(0);
});

// ---- AXE: Australia mobile 390 ----
test('axe-australia-mobile', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', (msg: any) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', (err: Error) => consoleErrors.push(`PAGEERROR: ${err.message}`));

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(PRIMARY, { waitUntil: 'networkidle' });
  await fullScroll(page);
  // Extra wait for Framer entrance animations to complete + CSS variables to settle
  await page.waitForTimeout(2000);

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();

  const critical = results.violations.filter((v: any) => v.impact === 'critical');
  const serious  = results.violations.filter((v: any) => v.impact === 'serious');

  console.log(`[AXE AUSTRALIA MOBILE] critical=${critical.length} serious=${serious.length} total=${results.violations.length}`);
  results.violations.forEach((v: any) => {
    console.log(`  [${v.impact}] ${v.id}: ${v.description}`);
    v.nodes.slice(0, 1).forEach((n: any) => console.log(`    target: ${n.target[0]}`));
  });
  console.log(`[CONSOLE ERRORS AUSTRALIA MOBILE] ${consoleErrors.length}`);
  consoleErrors.forEach(e => console.log(`  ${e}`));

  expect(critical.length, `Critical: ${critical.map((v: any) => v.id).join(', ')}`).toBe(0);
  expect(serious.length,  `Serious:  ${serious.map((v: any) => v.id).join(', ')}`).toBe(0);
});

// ---- AXE: GCC desktop 1440 ----
test('axe-gcc-desktop', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', (msg: any) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', (err: Error) => consoleErrors.push(`PAGEERROR: ${err.message}`));

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(SECONDARY, { waitUntil: 'networkidle' });
  await fullScroll(page);
  await page.waitForTimeout(2000);

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();

  const critical = results.violations.filter((v: any) => v.impact === 'critical');
  const serious  = results.violations.filter((v: any) => v.impact === 'serious');

  console.log(`[AXE GCC DESKTOP] critical=${critical.length} serious=${serious.length} total=${results.violations.length}`);
  results.violations.forEach((v: any) => {
    console.log(`  [${v.impact}] ${v.id}: ${v.description}`);
    v.nodes.slice(0, 2).forEach((n: any) => console.log(`    target: ${n.target[0]}`));
  });
  console.log(`[CONSOLE ERRORS GCC DESKTOP] ${consoleErrors.length}`);
  consoleErrors.forEach(e => console.log(`  ${e}`));

  expect(critical.length, `Critical: ${critical.map((v: any) => v.id).join(', ')}`).toBe(0);
  expect(serious.length,  `Serious:  ${serious.map((v: any) => v.id).join(', ')}`).toBe(0);
});

// ---- AXE: GCC mobile 390 ----
test('axe-gcc-mobile', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', (msg: any) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', (err: Error) => consoleErrors.push(`PAGEERROR: ${err.message}`));

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(SECONDARY, { waitUntil: 'networkidle' });
  await fullScroll(page);
  await page.waitForTimeout(2000);

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();

  const critical = results.violations.filter((v: any) => v.impact === 'critical');
  const serious  = results.violations.filter((v: any) => v.impact === 'serious');

  console.log(`[AXE GCC MOBILE] critical=${critical.length} serious=${serious.length} total=${results.violations.length}`);
  results.violations.forEach((v: any) => {
    console.log(`  [${v.impact}] ${v.id}: ${v.description}`);
    v.nodes.slice(0, 1).forEach((n: any) => console.log(`    target: ${n.target[0]}`));
  });
  console.log(`[CONSOLE ERRORS GCC MOBILE] ${consoleErrors.length}`);
  consoleErrors.forEach(e => console.log(`  ${e}`));

  expect(critical.length, `Critical: ${critical.map((v: any) => v.id).join(', ')}`).toBe(0);
  expect(serious.length,  `Serious:  ${serious.map((v: any) => v.id).join(', ')}`).toBe(0);
});

// ---- SCREENSHOTS both routes both viewports ----
test('screenshots-both-routes', async ({ page }) => {
  ensureDir(OUT_DIR);

  // Australia desktop 1440
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(PRIMARY, { waitUntil: 'networkidle' });
  await fullScroll(page);
  await page.screenshot({ fullPage: true, path: path.join(OUT_DIR, 'primary-australia-cold-chain-desktop-1440.png') });
  console.log('Saved: primary-australia-cold-chain-desktop-1440.png');

  // Australia mobile 390
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(PRIMARY, { waitUntil: 'networkidle' });
  await fullScroll(page);
  await page.screenshot({ fullPage: true, path: path.join(OUT_DIR, 'primary-australia-cold-chain-mobile-390.png') });
  console.log('Saved: primary-australia-cold-chain-mobile-390.png');

  // GCC desktop 1440
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(SECONDARY, { waitUntil: 'networkidle' });
  await fullScroll(page);
  await page.screenshot({ fullPage: true, path: path.join(OUT_DIR, 'secondary-gcc-pharma-desktop-1440.png') });
  console.log('Saved: secondary-gcc-pharma-desktop-1440.png');

  // GCC mobile 390
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(SECONDARY, { waitUntil: 'networkidle' });
  await fullScroll(page);
  await page.screenshot({ fullPage: true, path: path.join(OUT_DIR, 'secondary-gcc-pharma-mobile-390.png') });
  console.log('Saved: secondary-gcc-pharma-mobile-390.png');
});

// ---- GCC defect scan — data-driven layout failures ----
test('gcc-defect-scan', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', (msg: any) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', (err: Error) => consoleErrors.push(`PAGEERROR: ${err.message}`));

  await page.setViewportSize({ width: 1440, height: 900 });
  const resp = await page.goto(SECONDARY, { waitUntil: 'networkidle' });
  expect(resp?.status()).toBe(200);

  await fullScroll(page);

  const layout = await page.evaluate(() => {
    const issues: string[] = [];

    // H1 count
    const h1s = document.querySelectorAll('h1');
    if (h1s.length !== 1) issues.push(`h1 count=${h1s.length} (expected 1)`);

    // Overflow check (horizontal scroll)
    const bodyWidth = document.body.scrollWidth;
    const viewWidth = window.innerWidth;
    if (bodyWidth > viewWidth + 5) issues.push(`horizontal overflow: body=${bodyWidth}px > viewport=${viewWidth}px`);

    // Empty sections (sections with < 10 chars of text)
    const sections = document.querySelectorAll('main section, main > div > section');
    sections.forEach((sec, i) => {
      const text = (sec.textContent || '').trim();
      if (text.length < 10) issues.push(`section[${i}] suspiciously empty: "${text.slice(0, 30)}"`);
    });

    // Key stat / number overflow — numbers that are just "0" or blank
    const statNums = document.querySelectorAll('[class*="stat"], [class*="metric"], [class*="kpi"]');
    statNums.forEach((el, i) => {
      const txt = (el.textContent || '').trim();
      if (txt === '0' || txt === '') issues.push(`stat[${i}] shows "${txt}" — may be uninitialized`);
    });

    // Broken images
    const imgs = Array.from(document.querySelectorAll('img')) as HTMLImageElement[];
    imgs.forEach((img, i) => {
      if (!img.complete || img.naturalWidth === 0) {
        issues.push(`img[${i}] broken: src="${img.src?.slice(0, 60)}"`);
      }
    });

    return {
      issues,
      h1Text: Array.from(h1s).map(h => (h.textContent || '').slice(0, 80)),
      sectionCount: sections.length,
    };
  });

  console.log(`[GCC DEFECT SCAN] h1="${layout.h1Text[0]}" sections=${layout.sectionCount}`);
  layout.issues.forEach(iss => console.log(`  DEFECT: ${iss}`));
  console.log(`[GCC CONSOLE ERRORS] ${consoleErrors.length}`);
  consoleErrors.forEach(e => console.log(`  ${e}`));

  // Report all — test passes if 0 P0 issues (crash / h1 multi / horizontal overflow)
  const p0 = layout.issues.filter(i =>
    i.includes('h1 count') || i.includes('horizontal overflow') || i.includes('PAGEERROR')
  );
  expect(p0.length, `P0 defects on GCC: ${p0.join('; ')}`).toBe(0);
});
