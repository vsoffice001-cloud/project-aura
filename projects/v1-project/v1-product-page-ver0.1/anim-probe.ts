import { chromium } from '@playwright/test';
const outDir = '/Users/vishalchauchan/Downloads/Anti-folder01/qa-screenshots/v2p-round4-deep';
async function run() {
  const browser = await chromium.launch();
  
  // Check entrance animations on new PDP (Framer motion)
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  // Check for Framer Motion data attributes (motion elements)
  const motionEls = await page.evaluate(() => {
    const framerEls = document.querySelectorAll('[data-framer-motion-id], [style*="transform"], [style*="opacity"]');
    const results: any[] = [];
    Array.from(framerEls).slice(0, 10).forEach(el => {
      const cs = window.getComputedStyle(el);
      results.push({
        tag: el.tagName,
        cls: el.className?.toString().slice(0,40),
        transform: cs.transform.slice(0,50),
        opacity: cs.opacity,
        transition: cs.transition.slice(0,60),
      });
    });
    return results;
  });
  console.log('FRAMER MOTION ELEMENTS:', JSON.stringify(motionEls));
  
  // Check the stat boxes that should have entrance animations
  // Scroll down partway and take screenshot at various scroll depths  
  const depths = [0, 500, 1500, 3000];
  for (const d of depths) {
    await page.evaluate((depth) => window.scrollTo(0, depth), d);
    await page.waitForTimeout(400);
  }
  // Final screenshot at mid-page
  await page.screenshot({ path: `${outDir}/new-mid-page.png` });
  
  // Check waved/staggered sections
  const staggeredEls = await page.evaluate(() => {
    // Find elements that might be mid-animation or have stagger
    const cards = Array.from(document.querySelectorAll('[class*="grid"] > *, [class*="flex"] > *')).slice(0, 12);
    return cards.map(el => {
      const cs = window.getComputedStyle(el);
      return { tag: el.tagName, cls: el.className?.toString().slice(0,40), opacity: cs.opacity, transform: cs.transform.slice(0,30) };
    }).filter(e => e.opacity !== '1' || e.transform !== 'none');
  });
  console.log('STAGGERED/ANIMATING ELEMENTS:', JSON.stringify(staggeredEls));
  
  // Legacy animation check
  const ctxLeg = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageLeg = await ctxLeg.newPage();
  await pageLeg.goto('http://localhost:3020/', { waitUntil: 'networkidle', timeout: 30000 });
  await pageLeg.waitForTimeout(2000);
  
  const legMotionEls = await pageLeg.evaluate(() => {
    const framerEls = document.querySelectorAll('[data-framer-motion-id], [style*="transform"], [style*="opacity"]');
    return Array.from(framerEls).slice(0, 8).map(el => {
      const cs = window.getComputedStyle(el);
      return {
        cls: el.className?.toString().slice(0,40),
        transform: cs.transform.slice(0,50),
        opacity: cs.opacity,
      };
    });
  });
  console.log('LEGACY FRAMER ELEMENTS:', JSON.stringify(legMotionEls));
  
  // Check disclaimer / footnote text styling
  const legDisclaimer = await pageLeg.evaluate(() => {
    const candidates = Array.from(document.querySelectorAll('small, [class*="disclaimer"], [class*="footnote"], [class*="caption"]'));
    return candidates.slice(0,4).map(el => {
      const cs = window.getComputedStyle(el);
      return { tag: el.tagName, cls: el.className?.toString().slice(0,40), fs: cs.fontSize, color: cs.color, text: el.textContent?.trim().slice(0,30) };
    });
  });
  console.log('LEGACY DISCLAIMER/FOOTNOTE:', JSON.stringify(legDisclaimer));
  
  const newDisclaimer = await page.evaluate(() => {
    const candidates = Array.from(document.querySelectorAll('small, [class*="disclaimer"], [class*="footnote"], [class*="caption"], [class*="source"]'));
    return candidates.slice(0,4).map(el => {
      const cs = window.getComputedStyle(el);
      return { tag: el.tagName, cls: el.className?.toString().slice(0,40), fs: cs.fontSize, color: cs.color, text: el.textContent?.trim().slice(0,30) };
    });
  });
  console.log('NEW DISCLAIMER/FOOTNOTE:', JSON.stringify(newDisclaimer));
  
  await ctx.close();
  await ctxLeg.close();
  await browser.close();
  console.log('DONE');
}
run().catch(console.error);
