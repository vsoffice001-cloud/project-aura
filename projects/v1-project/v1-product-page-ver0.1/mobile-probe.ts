import { chromium } from '@playwright/test';
const outDir = '/Users/vishalchauchan/Downloads/Anti-folder01/qa-screenshots/v2p-round4-deep';
async function run() {
  const browser = await chromium.launch();
  
  // Mobile 390 probes
  const ctxM = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const pageM = await ctxM.newPage();
  await pageM.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027', { waitUntil: 'networkidle', timeout: 30000 });
  await pageM.waitForTimeout(2000);
  
  // Check touch targets
  const touchTargets = await pageM.evaluate(() => {
    const interactive = document.querySelectorAll('button, a[href], input, select, [role="button"]');
    const small: any[] = [];
    Array.from(interactive).forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
        small.push({ tag: el.tagName, text: el.textContent?.trim().slice(0,20), w: Math.round(rect.width), h: Math.round(rect.height) });
      }
    });
    return small.slice(0, 10);
  });
  console.log('MOBILE SMALL TOUCH TARGETS:', JSON.stringify(touchTargets));
  
  // Check sticky CTA on mobile
  const stickyMobile = await pageM.evaluate(() => {
    const sticky = Array.from(document.querySelectorAll('[class*="sticky"], [style*="sticky"]'));
    return sticky.map(el => {
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return { cls: el.className?.toString().slice(0,60), position: cs.position, bottom: cs.bottom, top: cs.top, w: Math.round(rect.width), h: Math.round(rect.height) };
    });
  });
  console.log('MOBILE STICKY:', JSON.stringify(stickyMobile));

  // Scroll down to show sticky CTA
  await pageM.evaluate(() => window.scrollTo(0, 1000));
  await pageM.waitForTimeout(500);
  await pageM.screenshot({ path: `${outDir}/new-mobile-scroll1000.png` });
  
  await ctxM.close();

  // Legacy mobile 390
  const ctxLM = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const pageLM = await ctxLM.newPage();
  await pageLM.goto('http://localhost:3020/', { waitUntil: 'networkidle', timeout: 30000 });
  await pageLM.waitForTimeout(2000);
  
  const legTouchTargets = await pageLM.evaluate(() => {
    const interactive = document.querySelectorAll('button, a[href], input, [role="button"]');
    const small: any[] = [];
    Array.from(interactive).forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
        small.push({ tag: el.tagName, text: el.textContent?.trim().slice(0,20), w: Math.round(rect.width), h: Math.round(rect.height) });
      }
    });
    return small.slice(0, 10);
  });
  console.log('LEGACY MOBILE SMALL TOUCH TARGETS:', JSON.stringify(legTouchTargets));
  
  await pageLM.evaluate(() => window.scrollTo(0, 1000));
  await pageLM.waitForTimeout(500);
  await pageLM.screenshot({ path: `${outDir}/legacy-mobile-scroll1000.png` });
  
  await ctxLM.close();
  await browser.close();
  console.log('DONE');
}
run().catch(console.error);
