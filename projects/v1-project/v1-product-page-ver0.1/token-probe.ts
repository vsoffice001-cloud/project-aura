import { chromium } from '@playwright/test';
async function run() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027', { waitUntil: 'networkidle', timeout: 30000 });
  const brandColor = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--color-brand').trim());
  const brandRed = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--color-brand-red').trim());
  // Probe focus ring on focused button
  const focusedRing = await page.evaluate(() => {
    const btn = document.querySelector('button:not([disabled])') as HTMLElement;
    btn?.focus();
    const cs = window.getComputedStyle(btn);
    return { outline: cs.outline, outlineStyle: cs.outlineStyle, outlineWidth: cs.outlineWidth, outlineColor: cs.outlineColor, boxShadow: cs.boxShadow.slice(0, 100) };
  });
  console.log('--color-brand:', brandColor || '(empty)');
  console.log('--color-brand-red:', brandRed);
  console.log('focus ring on focused button:', JSON.stringify(focusedRing));
  
  // Probe legacy focus ring
  const ctx2 = await browser.newContext();
  const page2 = await ctx2.newPage();
  await page2.goto('http://localhost:3020/', { waitUntil: 'networkidle', timeout: 30000 });
  const legFocused = await page2.evaluate(() => {
    const btn = document.querySelector('button:not([disabled])') as HTMLElement;
    btn?.focus();
    const cs = window.getComputedStyle(btn);
    return { outline: cs.outline, outlineStyle: cs.outlineStyle, outlineWidth: cs.outlineWidth, outlineColor: cs.outlineColor, boxShadow: cs.boxShadow.slice(0, 100) };
  });
  console.log('LEGACY focus ring on focused button:', JSON.stringify(legFocused));
  
  // Check if legacy has custom focus visible CSS
  const legFocusCSS = await page2.evaluate(() => {
    // Find all stylesheets and look for :focus-visible rules
    const sheets = Array.from(document.styleSheets);
    const rules: string[] = [];
    sheets.forEach(sheet => {
      try {
        Array.from(sheet.cssRules || []).forEach(rule => {
          if (rule.cssText?.includes(':focus')) rules.push(rule.cssText.slice(0, 100));
        });
      } catch(e) {}
    });
    return rules.slice(0, 10);
  });
  console.log('LEGACY focus CSS rules:', JSON.stringify(legFocusCSS));

  await ctx.close();
  await ctx2.close();
  await browser.close();
}
run().catch(console.error);
