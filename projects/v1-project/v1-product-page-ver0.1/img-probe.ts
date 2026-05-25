import { chromium } from '@playwright/test';
const outDir = '/Users/vishalchauchan/Downloads/Anti-folder01/qa-screenshots/v2p-round4-deep';
async function run() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  // Scroll full page to trigger lazy loading
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  
  const images = await page.evaluate(() => {
    const imgs = document.querySelectorAll('img');
    return Array.from(imgs).map(img => {
      const cs = window.getComputedStyle(img);
      return {
        src: img.src.slice(-40),
        naturalW: img.naturalWidth, naturalH: img.naturalHeight,
        displayW: Math.round(img.getBoundingClientRect().width),
        displayH: Math.round(img.getBoundingClientRect().height),
        objectFit: cs.objectFit, loading: img.loading,
        complete: img.complete
      };
    });
  });
  console.log('NEW IMAGES after scroll:', JSON.stringify(images));
  
  // Check for chart/visualization elements that replace images
  const charts = await page.evaluate(() => {
    const svgs = document.querySelectorAll('svg');
    const canvases = document.querySelectorAll('canvas');
    return {
      svgCount: svgs.length,
      canvasCount: canvases.length,
      svgSizes: Array.from(svgs).slice(0,5).map(s => ({
        w: Math.round(s.getBoundingClientRect().width),
        h: Math.round(s.getBoundingClientRect().height)
      }))
    };
  });
  console.log('NEW CHARTS/SVG:', JSON.stringify(charts));

  // Check the hero section for any preview image
  const heroSection = await page.evaluate(() => {
    const hero = document.querySelector('[data-section="report-hero"]');
    if (!hero) return null;
    const imgs = hero.querySelectorAll('img');
    const divs = Array.from(hero.querySelectorAll('[class*="preview"], [class*="cover"], [class*="thumb"]'));
    return {
      imgCount: imgs.length,
      previewDivCount: divs.length,
      previewDivs: divs.map(d => ({ cls: d.className?.toString().slice(0,60), bg: window.getComputedStyle(d).backgroundColor }))
    };
  });
  console.log('HERO SECTION:', JSON.stringify(heroSection));

  // Tooltip hover probe - try hovering badge/chip elements
  const badgeEls = await page.evaluate(() => {
    const badges = Array.from(document.querySelectorAll('[title], [data-tooltip], [class*="badge"], [class*="Badge"]'));
    return badges.slice(0, 5).map(el => ({
      tag: el.tagName,
      cls: el.className?.toString().slice(0, 50),
      title: el.getAttribute('title'),
      dataTooltip: el.getAttribute('data-tooltip'),
      text: el.textContent?.trim().slice(0, 30),
    }));
  });
  console.log('NEW TOOLTIP CANDIDATES:', JSON.stringify(badgeEls));

  // Scroll-snap behavior on mobile cards
  const scrollSnap = await page.evaluate(() => {
    const snappable = Array.from(document.querySelectorAll('[class*="scroll-snap"], [style*="scroll-snap"]'));
    const overflowX = Array.from(document.querySelectorAll('*')).filter(el => {
      const cs = window.getComputedStyle(el);
      return cs.overflowX === 'auto' || cs.overflowX === 'scroll';
    });
    return {
      snappableCount: snappable.length,
      overflowXCount: overflowX.length,
      scrollSnapContainers: snappable.slice(0,3).map(el => ({ cls: el.className?.toString().slice(0,50) })),
    };
  });
  console.log('SCROLL SNAP:', JSON.stringify(scrollSnap));
  
  await ctx.close();
  await browser.close();
}
run().catch(console.error);
