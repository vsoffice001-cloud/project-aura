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
  
  // Find close button by looking for X/close icons in the drawer
  const closeBtns = await page.evaluate(() => {
    const allBtns = Array.from(document.querySelectorAll('button, [role="button"]'));
    return allBtns.map(btn => {
      const rect = btn.getBoundingClientRect();
      const cs = window.getComputedStyle(btn);
      const svg = btn.querySelector('svg');
      return {
        aria: btn.getAttribute('aria-label'),
        text: btn.textContent?.trim().slice(0, 15),
        w: Math.round(rect.width), h: Math.round(rect.height),
        top: Math.round(rect.top), right: Math.round(1440 - rect.right),
        hasSvg: !!svg,
      };
    });
  });
  console.log('ALL BUTTONS when drawer open:', JSON.stringify(closeBtns.slice(0, 15)));
  
  // Get the drawer panel dimensions and styling
  const drawerPanel = await page.evaluate(() => {
    // The 480px wide panel at right
    const panelEl = Array.from(document.querySelectorAll('*')).find(el => {
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return cs.position === 'fixed' && cs.zIndex === '50' && Math.round(rect.width) === 480;
    }) as HTMLElement;
    if (!panelEl) return null;
    const cs = window.getComputedStyle(panelEl);
    return {
      width: cs.width,
      height: cs.height,
      bg: cs.backgroundColor,
      borderRadius: cs.borderRadius,
      padding: cs.padding,
      borderLeft: cs.borderLeftColor + ' ' + cs.borderLeftWidth + ' ' + cs.borderLeftStyle,
      boxShadow: cs.boxShadow.slice(0, 80),
    };
  });
  console.log('DRAWER PANEL STYLES:', JSON.stringify(drawerPanel));
  
  // Screenshot the open state
  await page.screenshot({ path: `${outDir}/new-drawer-open-full.png` });
  console.log('Screenshot taken');
  
  await ctx.close();
  await browser.close();
}
run().catch(console.error);
