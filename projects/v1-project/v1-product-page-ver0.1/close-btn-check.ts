import { chromium } from '@playwright/test';
async function run() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  // Open drawer
  await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('h2,h3,h4'));
    const ms = els.find(e => e.textContent?.toLowerCase().includes('market siz'));
    ms?.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(300);
  await page.locator('button:has-text("View Dataset")').first().click();
  await page.waitForTimeout(500);
  
  // Now find close button by aria
  const closeBtn = await page.evaluate(() => {
    const allBtns = Array.from(document.querySelectorAll('button, [role="button"]'));
    return allBtns.filter(btn => {
      const aria = btn.getAttribute('aria-label') || '';
      return aria.toLowerCase().includes('close');
    }).map(btn => {
      const rect = btn.getBoundingClientRect();
      const cs = window.getComputedStyle(btn);
      return { aria: btn.getAttribute('aria-label'), w: Math.round(rect.width), h: Math.round(rect.height), top: Math.round(rect.top), right: Math.round(1440 - rect.right), visible: (btn as HTMLElement).offsetParent !== null };
    });
  });
  console.log('CLOSE BUTTON (aria search):', JSON.stringify(closeBtn));
  
  // Check the Button component renders with correct dimensions
  const btnDim = await page.evaluate(() => {
    const btn = document.querySelector('[aria-label="Close dataset drawer"]') as HTMLElement;
    if (!btn) return null;
    const rect = btn.getBoundingClientRect();
    const cs = window.getComputedStyle(btn);
    return { w: Math.round(rect.width), h: Math.round(rect.height), top: Math.round(rect.top), right: Math.round(1440 - rect.right), bg: cs.backgroundColor, color: cs.color };
  });
  console.log('CLOSE BTN DIMENSIONS:', JSON.stringify(btnDim));
  
  await ctx.close();
  await browser.close();
}
run().catch(console.error);
