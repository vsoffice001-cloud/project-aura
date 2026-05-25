import { chromium } from '@playwright/test';
const outDir = '/Users/vishalchauchan/Downloads/Anti-folder01/qa-screenshots/v2p-round4-deep';
async function run() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  
  // Wait for dev server to pick up changes
  await page.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  // Scroll to 50% to trigger progress bar
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await page.waitForTimeout(800);
  
  // 1. Verify progress bar fill color
  const progressFill = await page.evaluate(() => {
    const bars = document.querySelectorAll('[role="progressbar"]');
    return Array.from(bars).map(el => {
      const child = el.firstElementChild;
      const childCs = child ? window.getComputedStyle(child) : null;
      return {
        fillBg: childCs?.backgroundColor,
        brandRedToken: getComputedStyle(document.documentElement).getPropertyValue('--color-brand-red').trim(),
      };
    });
  });
  console.log('PROGRESS BAR FILL (after fix):', JSON.stringify(progressFill));
  
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  
  // 2. Verify text-2xs font size
  const text2xs = await page.evaluate(() => {
    const el = document.querySelector('.text-2xs') as HTMLElement;
    if (!el) return null;
    const cs = window.getComputedStyle(el);
    return { fontSize: cs.fontSize, lineHeight: cs.lineHeight };
  });
  console.log('text-2xs FONT SIZE (after fix):', JSON.stringify(text2xs));
  
  // 3. Verify drawer close button aria-label
  await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('h2,h3,h4'));
    const ms = els.find(e => e.textContent?.toLowerCase().includes('market siz'));
    ms?.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(300);
  await page.locator('button:has-text("View Dataset")').first().click();
  await page.waitForTimeout(600);
  
  const closeBtn = await page.evaluate(() => {
    const btn = document.querySelector('[aria-label="Close dataset drawer"]') as HTMLElement;
    if (!btn) return null;
    const rect = btn.getBoundingClientRect();
    return { found: true, w: Math.round(rect.width), h: Math.round(rect.height) };
  });
  console.log('DRAWER CLOSE BUTTON (after fix):', JSON.stringify(closeBtn));
  
  await page.screenshot({ path: `${outDir}/verify-drawer-close.png` });
  
  await ctx.close();
  await browser.close();
  console.log('DONE');
}
run().catch(console.error);
