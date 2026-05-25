import { chromium } from '@playwright/test';
const outDir = '/Users/vishalchauchan/Downloads/Anti-folder01/qa-screenshots/v2p-round4-deep';
async function run() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('h2,h3,h4'));
    const ms = els.find(e => e.textContent?.toLowerCase().includes('market siz'));
    ms?.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(500);
  
  const viewDataBtn = page.locator('button:has-text("View Dataset"), button:has-text("Dataset")').first();
  await viewDataBtn.click();
  await page.waitForTimeout(600);
  
  // Get the actual drawer panel (not the backdrop)
  const allFixed = await page.evaluate(() => {
    const fixed = Array.from(document.querySelectorAll('*')).filter(el => {
      const cs = window.getComputedStyle(el);
      return cs.position === 'fixed' && cs.zIndex >= '40' && (el as HTMLElement).offsetHeight > 50;
    });
    return fixed.map(el => {
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        cls: el.className?.toString().slice(0, 80),
        bg: cs.backgroundColor,
        borderRadius: cs.borderRadius,
        w: Math.round(rect.width),
        h: Math.round(rect.height),
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        zIndex: cs.zIndex,
        padding: cs.padding,
      };
    });
  });
  console.log('ALL FIXED ELEMENTS when drawer open:', JSON.stringify(allFixed));
  
  // Check close button position
  const closeBtn = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button')).filter(btn => {
      const aria = btn.getAttribute('aria-label') || '';
      const text = btn.textContent?.trim() || '';
      return aria.includes('close') || aria.includes('Close') || text === '×' || text === 'Close';
    });
    return btns.map(btn => {
      const rect = btn.getBoundingClientRect();
      return { aria: btn.getAttribute('aria-label'), text: btn.textContent?.trim().slice(0,10), w: Math.round(rect.width), h: Math.round(rect.height), top: Math.round(rect.top), right: Math.round(1440 - rect.right) };
    });
  });
  console.log('CLOSE BUTTONS:', JSON.stringify(closeBtn));
  
  await page.screenshot({ path: `${outDir}/new-drawer-open-full.png` });
  
  await ctx.close();
  await browser.close();
  console.log('DONE');
}
run().catch(console.error);
