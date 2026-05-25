import { chromium } from '@playwright/test';
async function run() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  // Find "Source:" text
  const sourceTexts = await page.evaluate(() => {
    const allEls = Array.from(document.querySelectorAll('*'));
    const sources = allEls.filter(el => el.children.length === 0 && el.textContent?.includes('Source:'));
    return sources.slice(0, 5).map(el => {
      const cs = window.getComputedStyle(el);
      return { tag: el.tagName, cls: el.className?.toString().slice(0,50), fs: cs.fontSize, color: cs.color, opacity: cs.opacity, text: el.textContent?.trim().slice(0,50) };
    });
  });
  console.log('NEW SOURCE TEXTS:', JSON.stringify(sourceTexts));
  
  // Legacy source texts
  const ctxLeg = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageLeg = await ctxLeg.newPage();
  await pageLeg.goto('http://localhost:3020/', { waitUntil: 'networkidle', timeout: 30000 });
  await pageLeg.waitForTimeout(1000);
  const legSources = await pageLeg.evaluate(() => {
    const allEls = Array.from(document.querySelectorAll('*'));
    const sources = allEls.filter(el => el.children.length === 0 && el.textContent?.includes('Source:'));
    return sources.slice(0, 5).map(el => {
      const cs = window.getComputedStyle(el);
      return { tag: el.tagName, cls: el.className?.toString().slice(0,50), fs: cs.fontSize, color: cs.color, opacity: cs.opacity, text: el.textContent?.trim().slice(0,50) };
    });
  });
  console.log('LEGACY SOURCE TEXTS:', JSON.stringify(legSources));
  
  // Check pull-quote / blockquote styling
  const newPullQuotes = await page.evaluate(() => {
    const bqs = document.querySelectorAll('blockquote, [class*="quote"], [class*="Quote"], [class*="pull"]');
    return Array.from(bqs).slice(0,4).map(el => {
      const cs = window.getComputedStyle(el);
      return { tag: el.tagName, cls: el.className?.toString().slice(0,50), fs: cs.fontSize, color: cs.color, borderLeft: cs.borderLeftColor + ' ' + cs.borderLeftWidth, fontStyle: cs.fontStyle, text: el.textContent?.trim().slice(0,40) };
    });
  });
  console.log('NEW PULL QUOTES:', JSON.stringify(newPullQuotes));
  
  const legPullQuotes = await pageLeg.evaluate(() => {
    const bqs = document.querySelectorAll('blockquote, [class*="quote"], [class*="Quote"], [class*="pull"]');
    return Array.from(bqs).slice(0,4).map(el => {
      const cs = window.getComputedStyle(el);
      return { tag: el.tagName, cls: el.className?.toString().slice(0,50), fs: cs.fontSize, color: cs.color, borderLeft: cs.borderLeftColor + ' ' + cs.borderLeftWidth, fontStyle: cs.fontStyle, text: el.textContent?.trim().slice(0,40) };
    });
  });
  console.log('LEGACY PULL QUOTES:', JSON.stringify(legPullQuotes));
  
  // Check heading/chapter number treatment in legacy
  const legHeadingNumbers = await pageLeg.evaluate(() => {
    const els = Array.from(document.querySelectorAll('[class*="chapter"], [class*="number"], [class*="phase"]'));
    return els.slice(0,6).map(el => {
      const cs = window.getComputedStyle(el);
      return { cls: el.className?.toString().slice(0,50), fs: cs.fontSize, color: cs.color, fontWeight: cs.fontWeight, text: el.textContent?.trim().slice(0,20) };
    });
  });
  console.log('LEGACY CHAPTER NUMBERS:', JSON.stringify(legHeadingNumbers));

  await ctx.close();
  await ctxLeg.close();
  await browser.close();
}
run().catch(console.error);
