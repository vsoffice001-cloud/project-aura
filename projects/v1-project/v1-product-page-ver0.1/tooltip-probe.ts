import { chromium } from '@playwright/test';
const outDir = '/Users/vishalchauchan/Downloads/Anti-folder01/qa-screenshots/v2p-round4-deep';
async function run() {
  const browser = await chromium.launch();
  
  // Legacy tooltip probe
  const ctxLeg = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageLeg = await ctxLeg.newPage();
  await pageLeg.goto('http://localhost:3020/', { waitUntil: 'networkidle', timeout: 30000 });
  await pageLeg.waitForTimeout(1000);
  const legTooltipCandidates = await pageLeg.evaluate(() => {
    const all = Array.from(document.querySelectorAll('[title], [data-tooltip], [role="tooltip"]'));
    return all.slice(0, 8).map(el => ({
      tag: el.tagName, cls: el.className?.toString().slice(0,50),
      title: el.getAttribute('title'), text: el.textContent?.trim().slice(0,20)
    }));
  });
  console.log('LEGACY TOOLTIP CANDIDATES:', JSON.stringify(legTooltipCandidates));
  
  // Check if legacy has custom styled tooltip (radix/shadcn)
  const legShadcnTooltip = await pageLeg.evaluate(() => {
    const els = document.querySelectorAll('[data-radix-popper-content-wrapper], [data-state="instant-open"], [data-state="delayed-open"]');
    return Array.from(els).length;
  });
  console.log('LEGACY radix tooltip count:', legShadcnTooltip);
  
  // NEW: Check if competitor initials use title= only (no styled tooltip)
  const newTooltipType = await ctxLeg.newPage();
  // Actually use new context
  const ctxNew = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageNew = await ctxNew.newPage();
  await pageNew.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027', { waitUntil: 'networkidle', timeout: 30000 });
  await pageNew.waitForTimeout(1000);
  // Scroll to competitor section
  await pageNew.evaluate(() => {
    const els = Array.from(document.querySelectorAll('h2,h3'));
    const comp = els.find(e => e.textContent?.toLowerCase().includes('compet'));
    comp?.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await pageNew.waitForTimeout(500);
  await pageNew.screenshot({ path: `${outDir}/new-competitor-section.png` });
  
  // Hover a competitor circle
  const circleEl = pageNew.locator('[title="Hines Refrigerated"]').first();
  try {
    await circleEl.hover();
    await pageNew.waitForTimeout(600);
    // Check for tooltip overlay
    const tooltip = await pageNew.evaluate(() => {
      const tt = document.querySelector('[role="tooltip"], [data-radix-popper-content-wrapper], [data-state*="open"]');
      if (!tt) return null;
      const cs = window.getComputedStyle(tt);
      return { tag: tt.tagName, cls: tt.className?.toString().slice(0,60), bg: cs.backgroundColor, display: cs.display, text: tt.textContent?.trim().slice(0,30) };
    });
    console.log('NEW tooltip after hover:', JSON.stringify(tooltip));
    await pageNew.screenshot({ path: `${outDir}/new-tooltip-hover.png` });
  } catch(e: any) { console.log('Tooltip hover fail:', e.message); }
  
  // Check focus ring color - new has rgba(152,27,31) which looks like brand red
  // Legacy has oklab gray
  console.log('\n=== FOCUS RING ANALYSIS ===');
  console.log('NEW: box-shadow ring w/ brand-red color (152,27,31) + white 2px offset - custom ring');
  console.log('LEGACY: browser default 1px auto gray outline - NO custom ring');
  
  // Check active state styling on CTA
  const ctaActive = await pageNew.evaluate(() => {
    const ctaSheet = Array.from(document.styleSheets);
    const activeRules: string[] = [];
    ctaSheet.forEach(sheet => {
      try {
        Array.from(sheet.cssRules || []).forEach(rule => {
          if (rule.cssText?.includes(':active') || rule.cssText?.includes('active:')) {
            activeRules.push(rule.cssText.slice(0, 100));
          }
        });
      } catch(e) {}
    });
    return activeRules.slice(0, 8);
  });
  console.log('NEW active state CSS:', JSON.stringify(ctaActive));
  
  await ctxLeg.close();
  await ctxNew.close();
  await browser.close();
  console.log('DONE');
}
run().catch(console.error);
