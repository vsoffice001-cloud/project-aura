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
  await page.waitForTimeout(300);
  await page.locator('button:has-text("View Dataset")').first().click();
  await page.waitForTimeout(800);
  
  // Get ALL buttons in the DOM after drawer opens
  const allBtns = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).map(btn => {
      const rect = btn.getBoundingClientRect();
      return {
        aria: btn.getAttribute('aria-label'),
        text: btn.textContent?.trim().slice(0, 30),
        w: Math.round(rect.width), h: Math.round(rect.height),
        top: Math.round(rect.top),
        visible: rect.width > 0 && rect.height > 0,
      };
    }).filter(b => b.visible);
  });
  console.log('ALL VISIBLE BUTTONS IN DRAWER STATE:', JSON.stringify(allBtns));
  
  // Screenshot with the open drawer
  await page.screenshot({ path: `${outDir}/drawer-state-screenshot.png` });
  
  await ctx.close();
  await browser.close();
}
run().catch(console.error);
