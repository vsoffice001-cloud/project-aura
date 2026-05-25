import { chromium } from '@playwright/test';
const outDir = '/Users/vishalchauchan/Downloads/Anti-folder01/qa-screenshots/v2p-round4-deep';
async function run() {
  const browser = await chromium.launch();
  
  // LEGACY hover states capture
  const ctxLeg = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageLeg = await ctxLeg.newPage();
  await pageLeg.goto('http://localhost:3020/', { waitUntil: 'networkidle', timeout: 30000 });
  await pageLeg.waitForTimeout(1000);
  
  // Hover over primary CTA
  try {
    const ctaBtn = pageLeg.locator('button:has-text("Download"), button:has-text("Sample")').first();
    await ctaBtn.scrollIntoViewIfNeeded();
    await pageLeg.screenshot({ path: `${outDir}/legacy-cta-before-hover.png` });
    await ctaBtn.hover();
    await pageLeg.waitForTimeout(300);
    const ctaBg = await ctaBtn.evaluate(el => window.getComputedStyle(el).backgroundColor);
    console.log('LEGACY CTA hover bg:', ctaBg);
    await pageLeg.screenshot({ path: `${outDir}/legacy-cta-hover.png` });
  } catch(e: any) { console.log('Legacy CTA hover fail:', e.message); }

  // Hover over nav item
  try {
    const navBtn = pageLeg.locator('button:has-text("Company")').first();
    await navBtn.hover();
    await pageLeg.waitForTimeout(300);
    const navBg = await navBtn.evaluate(el => window.getComputedStyle(el).backgroundColor);
    console.log('LEGACY nav btn hover bg:', navBg);
  } catch(e: any) { console.log('Legacy nav hover fail:', e.message); }

  // Hover a chapter card  
  const legCardHover = await pageLeg.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('[class*="chapter"], [class*="Chapter"]'));
    if (!cards.length) return null;
    const el = cards[0] as HTMLElement;
    const cs = window.getComputedStyle(el);
    return { bg: cs.backgroundColor, transform: cs.transform, boxShadow: cs.boxShadow.slice(0, 80) };
  });
  console.log('LEGACY card default state:', JSON.stringify(legCardHover));
  
  await ctxLeg.close();

  // NEW hover states capture  
  const ctxNew = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageNew = await ctxNew.newPage();
  await pageNew.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027', { waitUntil: 'networkidle', timeout: 30000 });
  await pageNew.waitForTimeout(1000);
  
  // Hover over primary CTA button
  try {
    const ctaBtn = pageNew.locator('button:has-text("Download")').first();
    await ctaBtn.scrollIntoViewIfNeeded();
    await ctaBtn.hover();
    await pageNew.waitForTimeout(300);
    const ctaBg = await ctaBtn.evaluate(el => window.getComputedStyle(el).backgroundColor);
    const ctaOpacity = await ctaBtn.evaluate(el => window.getComputedStyle(el).opacity);
    console.log('NEW CTA hover bg:', ctaBg, 'opacity:', ctaOpacity);
    await pageNew.screenshot({ path: `${outDir}/new-cta-hover.png` });
  } catch(e: any) { console.log('New CTA hover fail:', e.message); }

  // Check focus-visible ring on new — tab through page
  await pageNew.keyboard.press('Tab');
  await pageNew.waitForTimeout(100);
  await pageNew.keyboard.press('Tab');
  await pageNew.waitForTimeout(100);
  await pageNew.keyboard.press('Tab');
  await pageNew.waitForTimeout(100);
  const focusedEl = await pageNew.evaluate(() => {
    const el = document.activeElement as HTMLElement;
    const cs = window.getComputedStyle(el);
    return {
      tag: el.tagName,
      text: el.textContent?.trim().slice(0, 30),
      outlineStyle: cs.outlineStyle,
      outlineWidth: cs.outlineWidth,
      outlineColor: cs.outlineColor,
      boxShadow: cs.boxShadow.slice(0, 100),
    };
  });
  console.log('NEW focused element (3 tabs):', JSON.stringify(focusedEl));
  await pageNew.screenshot({ path: `${outDir}/new-focus-ring.png` });

  // Legacy focus via tab
  const ctxLegF = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageLegF = await ctxLegF.newPage();
  await pageLegF.goto('http://localhost:3020/', { waitUntil: 'networkidle', timeout: 30000 });
  await pageLegF.waitForTimeout(1000);
  await pageLegF.keyboard.press('Tab');
  await pageLegF.waitForTimeout(100);
  await pageLegF.keyboard.press('Tab');
  await pageLegF.waitForTimeout(100);
  await pageLegF.keyboard.press('Tab');
  await pageLegF.waitForTimeout(100);
  const legFocused = await pageLegF.evaluate(() => {
    const el = document.activeElement as HTMLElement;
    const cs = window.getComputedStyle(el);
    return {
      tag: el.tagName,
      text: el.textContent?.trim().slice(0, 30),
      outlineStyle: cs.outlineStyle,
      outlineWidth: cs.outlineWidth,
      outlineColor: cs.outlineColor,
      boxShadow: cs.boxShadow.slice(0, 100),
    };
  });
  console.log('LEGACY focused element (3 tabs):', JSON.stringify(legFocused));
  await pageLegF.screenshot({ path: `${outDir}/legacy-focus-ring.png` });
  
  await ctxNew.close();
  await ctxLegF.close();
  await browser.close();
  console.log('DONE');
}
run().catch(console.error);
