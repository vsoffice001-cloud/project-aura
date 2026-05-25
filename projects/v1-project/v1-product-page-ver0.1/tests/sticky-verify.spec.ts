/**
 * Sticky behavior verification — corrected selectors
 */
import { test, expect } from '@playwright/test';

const AUSTRALIA = '/reports/australia-cold-chain-market-2022-2027';

test.use({ viewport: { width: 1440, height: 900 } });

test('sticky behaviors — corrected probe', async ({ page }) => {
  await page.goto(AUSTRALIA);
  await page.waitForLoadState('networkidle');

  // 1. Top nav wrapper — should be sticky
  const topNavSticky = await page.evaluate(() => {
    const el = document.querySelector('[id="sticky-nav"], .sticky.top-0.z-\\[50\\], .sticky.top-0.z-50');
    // Also try finding the sticky nav by its z-index / position
    const sticky50 = document.querySelector('[class*="sticky"][class*="z-[50]"]') ??
                     document.querySelector('[class*="sticky"][class*="z-50"]');
    const sticky40 = document.querySelector('[class*="sticky"][class*="z-40"]');
    return {
      topNavEl: el?.className?.slice(0, 80) ?? 'NOT FOUND',
      topNavPos: el ? window.getComputedStyle(el).position : 'N/A',
      sticky50Class: sticky50?.className?.slice(0, 80) ?? 'NOT FOUND',
      sticky50Pos: sticky50 ? window.getComputedStyle(sticky50).position : 'N/A',
      sticky40Class: sticky40?.className?.slice(0, 80) ?? 'NOT FOUND',
      sticky40Pos: sticky40 ? window.getComputedStyle(sticky40).position : 'N/A',
    };
  });
  console.log('TOP_NAV_STICKY:', JSON.stringify(topNavSticky, null, 2));

  // Verify main site nav (z-50) is sticky
  expect(['sticky', 'fixed']).toContain(topNavSticky.sticky50Pos);

  // 2. Section sticky-nav (z-40) is sticky
  expect(topNavSticky.sticky40Pos).toBe('sticky');

  // 3. Scroll 600px — verify sticky elements remain in viewport
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(300);

  const stickyAtScroll = await page.evaluate(() => {
    const allSticky = document.querySelectorAll('*');
    const results: Array<{ pos: string; top: string; class: string }> = [];
    allSticky.forEach(el => {
      const cs = window.getComputedStyle(el);
      if (cs.position === 'sticky' || cs.position === 'fixed') {
        const rect = el.getBoundingClientRect();
        // Sticky elements anchored near viewport top
        if (rect.top >= 0 && rect.top < 200) {
          results.push({
            pos: cs.position,
            top: `${Math.round(rect.top)}px`,
            class: el.className.slice(0, 60),
          });
        }
      }
    });
    return results;
  });
  console.log('STICKY_AT_600PX_SCROLL:', JSON.stringify(stickyAtScroll, null, 2));
  expect(stickyAtScroll.length).toBeGreaterThan(0);

  // 4. Hero right col sticky
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(300);
  const heroRightSticky = await page.evaluate(() => {
    const el = document.querySelector('[class*="lg:sticky"]');
    if (!el) return { found: false };
    return {
      found: true,
      pos: window.getComputedStyle(el).position,
      class: el.className.slice(0, 80),
    };
  });
  console.log('HERO_RIGHT_STICKY:', JSON.stringify(heroRightSticky, null, 2));
  expect(heroRightSticky.found).toBe(true);
  expect(heroRightSticky.pos).toBe('sticky');

  // 5. Sticky CTA — should be fixed on desktop (visible)
  const stickyCtaFixed = await page.evaluate(() => {
    const el = document.querySelector('.hidden.lg\\:flex[class*="fixed"], [class*="fixed"][class*="hidden lg:flex"]');
    // Try broader
    const allFixed = Array.from(document.querySelectorAll('*')).filter(e => {
      const cs = window.getComputedStyle(e);
      return cs.position === 'fixed' && e.textContent?.toLowerCase().includes('report');
    });
    return {
      count: allFixed.length,
      first: allFixed[0]?.className?.slice(0, 80) ?? 'none',
      firstText: allFixed[0]?.textContent?.trim().slice(0, 40) ?? 'none',
    };
  });
  console.log('STICKY_CTA:', JSON.stringify(stickyCtaFixed, null, 2));
  expect(stickyCtaFixed.count).toBeGreaterThan(0);

  await page.evaluate(() => window.scrollTo(0, 0));
});
