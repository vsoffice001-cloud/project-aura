import { chromium } from '@playwright/test';
import * as path from 'path';

const outDir = '/Users/vishalchauchan/Downloads/Anti-folder01/qa-screenshots/v2p-round4-deep';

async function run() {
  const browser = await chromium.launch();

  // ---- LEGACY: capture "Inside the Report" section with chapter cards + images ----
  const ctxLeg = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageLeg = await ctxLeg.newPage();
  await pageLeg.goto('http://localhost:3020/', { waitUntil: 'networkidle', timeout: 30000 });
  await pageLeg.waitForTimeout(2000);

  // Find chapter card images specifically
  const legChapterImages = await pageLeg.evaluate(() => {
    // Look for chapter/inside-report section images
    const allImgs = Array.from(document.querySelectorAll('img'));
    return allImgs.map(img => {
      const cs = window.getComputedStyle(img);
      const parent = img.closest('[class*="chapter"], [class*="Chapter"], [class*="card"], [class*="Card"], [class*="inside"], [class*="Inside"]');
      return {
        src: img.src.slice(-30),
        naturalW: img.naturalWidth, naturalH: img.naturalHeight,
        displayW: Math.round(img.getBoundingClientRect().width),
        displayH: Math.round(img.getBoundingClientRect().height),
        objectFit: cs.objectFit,
        aspectRatio: cs.aspectRatio,
        loading: img.loading,
        parentCls: parent?.className?.toString().slice(0, 50) || 'none',
      };
    });
  });
  console.log('LEGACY CHAPTER IMAGES:', JSON.stringify(legChapterImages));

  // Scroll to "Inside the Report" section and screenshot
  await pageLeg.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2, h3'));
    const inside = headings.find(h => h.textContent?.toLowerCase().includes('inside') || h.textContent?.toLowerCase().includes('chapter'));
    inside?.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await pageLeg.waitForTimeout(500);
  await pageLeg.screenshot({ path: `${outDir}/legacy-chapter-section.png` });
  console.log('Legacy chapter section screenshot captured');

  // Legacy back-to-top button detailed
  const legBttDetails = await pageLeg.evaluate(() => {
    const btt = document.querySelector('[aria-label="Go to top"]') as HTMLElement;
    if (!btt) return null;
    const cs = window.getComputedStyle(btt);
    const rect = btt.getBoundingClientRect();
    return {
      display: cs.display,
      position: cs.position,
      bottom: cs.bottom,
      right: cs.right,
      width: cs.width,
      height: cs.height,
      bg: cs.backgroundColor,
      border: cs.border,
      borderRadius: cs.borderRadius,
      zIndex: cs.zIndex,
      opacity: cs.opacity,
      visible: btt.offsetParent !== null,
    };
  });
  console.log('LEGACY BACK-TO-TOP DETAILS:', JSON.stringify(legBttDetails));

  // Scroll to bottom and check back-to-top visibility
  await pageLeg.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await pageLeg.waitForTimeout(500);
  const legBttAfterScroll = await pageLeg.evaluate(() => {
    const btt = document.querySelector('[aria-label="Go to top"]') as HTMLElement;
    if (!btt) return null;
    const cs = window.getComputedStyle(btt);
    return { opacity: cs.opacity, display: cs.display, visibility: cs.visibility };
  });
  console.log('LEGACY BACK-TO-TOP (after scroll):', JSON.stringify(legBttAfterScroll));
  await pageLeg.screenshot({ path: `${outDir}/legacy-after-scroll.png` });

  await ctxLeg.close();

  // ---- NEW: same probes ----
  const ctxNew = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageNew = await ctxNew.newPage();
  await pageNew.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027', { waitUntil: 'networkidle', timeout: 30000 });
  await pageNew.waitForTimeout(2000);

  // Scroll to bottom and check back-to-top
  await pageNew.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await pageNew.waitForTimeout(800);
  const newBttAfterScroll = await pageNew.evaluate(() => {
    const all = Array.from(document.querySelectorAll('button'));
    const btt = all.find(el => {
      const cls = el.className?.toString() || '';
      const aria = el.getAttribute('aria-label') || '';
      return cls.includes('top') || aria.includes('top') || cls.includes('scroll');
    });
    if (!btt) return { found: false };
    const cs = window.getComputedStyle(btt);
    return { found: true, opacity: cs.opacity, display: cs.display, bottom: cs.bottom, right: cs.right };
  });
  console.log('NEW BACK-TO-TOP (after scroll):', JSON.stringify(newBttAfterScroll));
  await pageNew.screenshot({ path: `${outDir}/new-after-scroll.png` });

  // Progress bar fill — scroll to 50% and check
  await pageNew.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await pageNew.waitForTimeout(500);
  const progressFill = await pageNew.evaluate(() => {
    const bars = document.querySelectorAll('[class*="progress"], [class*="Progress"]');
    return Array.from(bars).map(el => {
      const child = el.firstElementChild;
      const childCs = child ? window.getComputedStyle(child) : null;
      return {
        fillBg: childCs?.backgroundColor,
        fillW: childCs?.width,
        fillH: childCs?.height,
        parentW: window.getComputedStyle(el).width,
      };
    });
  });
  console.log('NEW PROGRESS BAR at 50% scroll:', JSON.stringify(progressFill));

  // New: Check if "Company" button cursor = default (should be pointer — potential bug)
  const cursorBug = await pageNew.evaluate(() => {
    const companyBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.trim() === 'Company');
    return companyBtn ? { cursor: window.getComputedStyle(companyBtn).cursor } : null;
  });
  console.log('NEW Company button cursor:', JSON.stringify(cursorBug));

  // Legacy Company button cursor
  const legCursorBug = await pageLeg.evaluate(() => null).catch(() => null);
  // Re-check legacy
  const ctxLegC = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageLegC = await ctxLegC.newPage();
  await pageLegC.goto('http://localhost:3020/', { waitUntil: 'networkidle', timeout: 30000 });
  await pageLegC.waitForTimeout(1000);
  const legCompanyCursor = await pageLegC.evaluate(() => {
    const companyBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.trim() === 'Company');
    return companyBtn ? { cursor: window.getComputedStyle(companyBtn).cursor } : null;
  });
  console.log('LEGACY Company button cursor:', JSON.stringify(legCompanyCursor));

  // Check the progress bar fill implementation
  const progressFillImpl = await pageNew.evaluate(() => {
    const trackEl = document.querySelector('[class*="progress"]:not([role]),[class*="Progress"]:not([role])') as HTMLElement;
    if (!trackEl) return null;
    return { 
      outerHTML: trackEl.outerHTML.slice(0, 300),
      children: Array.from(trackEl.children).map(c => ({
        tag: c.tagName, cls: c.className?.toString().slice(0, 60), 
        bg: window.getComputedStyle(c).backgroundColor,
        w: window.getComputedStyle(c).width
      }))
    };
  });
  console.log('NEW PROGRESS BAR DOM:', JSON.stringify(progressFillImpl));

  await ctxNew.close();
  await ctxLegC.close();
  await browser.close();
  console.log('DONE');
}

run().catch(console.error);
