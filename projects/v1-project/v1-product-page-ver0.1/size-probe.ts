import { chromium } from '@playwright/test';
async function run() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);
  
  // text-2xs should be ~10-11px. Check what CSS class it resolves to
  const textSizes = await page.evaluate(() => {
    const el = document.querySelector('.text-2xs') as HTMLElement;
    if (!el) return null;
    const cs = window.getComputedStyle(el);
    return { fontSize: cs.fontSize, lineHeight: cs.lineHeight };
  });
  console.log('text-2xs resolved:', JSON.stringify(textSizes));
  
  // Check if there's a custom text-2xs in Tailwind config
  const sizeTokens = await page.evaluate(() => {
    const tokens = ['--text-2xs', '--text-xs', '--text-sm', '--text-base', '--text-lg', '--text-xl', '--font-size-2xs'];
    const result: Record<string, string> = {};
    tokens.forEach(t => {
      result[t] = getComputedStyle(document.documentElement).getPropertyValue(t).trim() || '(not defined)';
    });
    return result;
  });
  console.log('SIZE TOKENS:', JSON.stringify(sizeTokens));
  
  // Legacy "Source:" text — no source texts found. Legacy might not have source attribution
  // Check what legacy uses instead of source
  const legAtt = await page.evaluate(() => null); // already closed — skip
  
  // Check the "Source: Ken Research" text in the legacy sidebar
  const ctxLeg = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageLeg = await ctxLeg.newPage();
  await pageLeg.goto('http://localhost:3020/', { waitUntil: 'networkidle', timeout: 30000 });
  await pageLeg.waitForTimeout(1000);
  const legSourceArea = await pageLeg.evaluate(() => {
    // Look for any "Source Research" or attribution text
    const allText = Array.from(document.querySelectorAll('p, span, div')).filter(el => {
      const t = el.textContent?.trim() || '';
      return t.includes('Research') && t.length < 50 && el.children.length <= 1;
    });
    return allText.slice(0,5).map(el => {
      const cs = window.getComputedStyle(el);
      return { tag: el.tagName, fs: cs.fontSize, color: cs.color, text: el.textContent?.trim().slice(0,40) };
    });
  });
  console.log('LEGACY RESEARCH/SOURCE:', JSON.stringify(legSourceArea));
  
  await ctx.close();
  await ctxLeg.close();
  await browser.close();
}
run().catch(console.error);
