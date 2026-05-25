import { chromium } from '@playwright/test';
const outDir = '/Users/vishalchauchan/Downloads/Anti-folder01/qa-screenshots/v2p-round4-deep';
async function run() {
  const browser = await chromium.launch();
  
  // Final screenshot captures for visual record
  const configs = [
    { name: 'new-focus-tab4', url: 'http://localhost:3000/reports/australia-cold-chain-market-2022-2027', tabs: 4 },
  ];
  
  // Mobile scroll snap check
  const ctxM = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const pageM = await ctxM.newPage();
  await pageM.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027', { waitUntil: 'networkidle', timeout: 30000 });
  await pageM.waitForTimeout(2000);
  
  // Scroll to related reports section
  await pageM.evaluate(() => {
    const els = Array.from(document.querySelectorAll('h2,h3'));
    const rel = els.find(e => e.textContent?.toLowerCase().includes('related'));
    rel?.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await pageM.waitForTimeout(500);
  await pageM.screenshot({ path: `${outDir}/new-mobile-related-reports.png` });
  
  // Check scroll-snap on the related reports carousel
  const snapDetails = await pageM.evaluate(() => {
    const containers = Array.from(document.querySelectorAll('*')).filter(el => {
      const cs = window.getComputedStyle(el);
      return cs.overflowX === 'auto' || cs.overflowX === 'scroll';
    });
    return containers.slice(0,5).map(el => {
      const cs = window.getComputedStyle(el);
      return {
        cls: el.className?.toString().slice(0,60),
        scrollSnapType: cs.scrollSnapType,
        children: el.children.length,
        childSnapAlign: el.firstElementChild ? window.getComputedStyle(el.firstElementChild).scrollSnapAlign : null,
      };
    });
  });
  console.log('MOBILE SCROLL SNAP DETAILS:', JSON.stringify(snapDetails));
  
  await ctxM.close();
  
  // Final check: legacy has chapter images in "Inside the Report" section
  // New has no images. Verify this is structural difference, not a bug
  const ctxLeg = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageLeg = await ctxLeg.newPage();
  await pageLeg.goto('http://localhost:3020/', { waitUntil: 'networkidle', timeout: 30000 });
  await pageLeg.waitForTimeout(2000);
  await pageLeg.evaluate(() => {
    const els = Array.from(document.querySelectorAll('h2,h3'));
    const inside = els.find(e => e.textContent?.toLowerCase().includes('inside'));
    inside?.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await pageLeg.waitForTimeout(500);
  await pageLeg.screenshot({ path: `${outDir}/legacy-inside-report.png` });
  
  // Screenshot legacy at different depths for visual record
  await pageLeg.evaluate(() => window.scrollTo(0, 5000));
  await pageLeg.waitForTimeout(500);
  await pageLeg.screenshot({ path: `${outDir}/legacy-depth-5000.png` });
  
  // Get legacy chapter card details
  const legChapterCards = await pageLeg.evaluate(() => {
    // Find elements containing chapter thumbnails
    const samplePrev = document.querySelector('[class*="sample"], [class*="Sample"], [class*="chapter-preview"]');
    if (!samplePrev) {
      // Look for image containers
      const imgContainers = Array.from(document.querySelectorAll('img')).slice(0, 4).map(img => {
        const parent = img.parentElement as HTMLElement;
        const cs = window.getComputedStyle(parent);
        const imgCs = window.getComputedStyle(img);
        return { parentCls: parent.className?.toString().slice(0,60), parentBg: cs.backgroundColor, imgW: Math.round(img.getBoundingClientRect().width), imgH: Math.round(img.getBoundingClientRect().height), objectFit: imgCs.objectFit };
      });
      return imgContainers;
    }
    return [{ cls: samplePrev.className?.toString().slice(0,60) }];
  });
  console.log('LEGACY CHAPTER CARDS/IMAGES:', JSON.stringify(legChapterCards));
  
  await ctxLeg.close();
  await browser.close();
  console.log('DONE');
}
run().catch(console.error);
