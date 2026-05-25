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
  
  // Get the content inside the 480px panel
  const panelContent = await page.evaluate(() => {
    // Find the panel - fixed right-rail
    const allFixed = Array.from(document.querySelectorAll('*')).filter(el => {
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return cs.position === 'fixed' && cs.zIndex === '50' && Math.round(rect.width) === 480 && Math.round(rect.height) === 900;
    });
    if (!allFixed.length) return 'no 480px panel found';
    const panel = allFixed[0];
    return {
      outerHTMLStart: panel.innerHTML.slice(0, 500),
      childCount: panel.children.length,
      buttons: Array.from(panel.querySelectorAll('button')).map(b => ({ aria: b.getAttribute('aria-label'), text: b.textContent?.trim().slice(0,20), w: Math.round(b.getBoundingClientRect().width), h: Math.round(b.getBoundingClientRect().height) }))
    };
  });
  console.log('PANEL CONTENT:', JSON.stringify(panelContent));
  
  await ctx.close();
  await browser.close();
}
run().catch(console.error);
