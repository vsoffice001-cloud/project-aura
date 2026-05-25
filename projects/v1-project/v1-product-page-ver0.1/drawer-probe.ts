import { chromium } from '@playwright/test';
const outDir = '/Users/vishalchauchan/Downloads/Anti-folder01/qa-screenshots/v2p-round4-deep';
async function run() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  // Scroll to market size chart section
  await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('h2,h3,h4'));
    const ms = els.find(e => e.textContent?.toLowerCase().includes('market siz'));
    ms?.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${outDir}/new-market-size.png` });
  
  // Find "View Dataset" button
  const viewDataBtn = page.locator('button:has-text("View Dataset"), button:has-text("Dataset"), button:has-text("View")');
  const count = await viewDataBtn.count();
  console.log('View Dataset buttons found:', count);
  
  if (count > 0) {
    await viewDataBtn.first().scrollIntoViewIfNeeded();
    await viewDataBtn.first().click();
    await page.waitForTimeout(500);
    
    // Capture drawer open
    await page.screenshot({ path: `${outDir}/new-drawer-open.png` });
    
    // Check drawer styles
    const drawerStyles = await page.evaluate(() => {
      const panel = document.querySelector('[class*="fixed bottom-0"], [class*="fixed inset"]') as HTMLElement;
      if (!panel) return null;
      const cs = window.getComputedStyle(panel);
      return {
        tag: panel.tagName,
        cls: panel.className?.toString().slice(0, 100),
        bg: cs.backgroundColor,
        borderRadius: cs.borderRadius,
        width: cs.width,
        height: cs.height,
        padding: cs.padding,
        zIndex: cs.zIndex,
      };
    });
    console.log('DRAWER STYLES:', JSON.stringify(drawerStyles));
    
    // Check backdrop
    const backdropStyles = await page.evaluate(() => {
      const backdrop = document.querySelector('[class*="backdrop"], [class*="fixed inset-0"]') as HTMLElement;
      if (!backdrop) return null;
      const cs = window.getComputedStyle(backdrop);
      return { bg: cs.backgroundColor, opacity: cs.opacity, backdropFilter: cs.backdropFilter };
    });
    console.log('BACKDROP STYLES:', JSON.stringify(backdropStyles));
    
    // Legacy comparison — does legacy have a drawer?
    console.log('\nLEGACY: no drawer found in DOM (confirmed by earlier probe)');
  }
  
  await ctx.close();
  await browser.close();
  console.log('DONE');
}
run().catch(console.error);
