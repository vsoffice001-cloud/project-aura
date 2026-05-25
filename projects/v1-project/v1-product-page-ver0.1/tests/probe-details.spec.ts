/**
 * Detail probe — nav position, zero-padding sections, color-contrast nodes
 */
import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('nav + padding + contrast detail', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027');
  await page.waitForLoadState('networkidle');

  // Full scroll to trigger lazy sections
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const timer = setInterval(() => {
        window.scrollBy(0, 400);
        totalHeight += 400;
        if (totalHeight >= document.body.scrollHeight) { clearInterval(timer); resolve(); }
      }, 80);
    });
  });
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  // ── Nav
  const navInfo = await page.evaluate(() => {
    const selectors = ['nav', 'header', '[role="navigation"]'];
    return selectors.map(sel => {
      const el = document.querySelector(sel);
      if (!el) return { sel, found: false };
      const cs = window.getComputedStyle(el);
      return {
        sel,
        pos: cs.position,
        top: cs.top,
        zIndex: cs.zIndex,
        classSnippet: el.className.slice(0, 80),
      };
    });
  });
  console.log('NAV_DETAIL:', JSON.stringify(navInfo, null, 2));

  // ── Sticky elements on page
  const stickyEls = await page.evaluate(() => {
    const results: Array<{ tag: string; pos: string; class: string; text: string }> = [];
    document.querySelectorAll('*').forEach(el => {
      const cs = window.getComputedStyle(el);
      if (cs.position === 'sticky' || cs.position === 'fixed') {
        results.push({
          tag: el.tagName,
          pos: cs.position,
          class: el.className.slice(0, 60),
          text: el.textContent?.trim().slice(0, 40) ?? '',
        });
      }
    });
    return results;
  });
  console.log('ALL_STICKY_FIXED:', JSON.stringify(stickyEls, null, 2));

  // ── Zero-padding data-section elements
  const zeroPad = await page.evaluate(() => {
    const results: Array<{ section: string; tag: string; class: string; childCount: number; height: number }> = [];
    document.querySelectorAll('[data-section]').forEach(el => {
      const cs = window.getComputedStyle(el);
      const pt = parseFloat(cs.paddingTop);
      const pb = parseFloat(cs.paddingBottom);
      const rect = el.getBoundingClientRect();
      results.push({
        section: el.getAttribute('data-section') ?? 'unknown',
        tag: el.tagName,
        class: el.className.slice(0, 80),
        childCount: el.children.length,
        height: Math.round(rect.height),
        // also show actual padding for non-zero
        // @ts-ignore
        pt, pb,
      });
    });
    return results;
  });
  console.log('ALL_DATA_SECTIONS:', JSON.stringify(zeroPad, null, 2));

  // ── Color contrast nodes
  const axeResults = await new AxeBuilder({ page })
    .withTags(['wcag2aa'])
    .analyze();
  const cc = axeResults.violations.find(v => v.id === 'color-contrast');
  if (cc) {
    const nodes = cc.nodes.map(n => ({
      html: n.html.slice(0, 120),
      failureSummary: n.failureSummary,
    }));
    console.log('COLOR_CONTRAST_NODES:', JSON.stringify(nodes, null, 2));
  } else {
    console.log('COLOR_CONTRAST: PASS');
  }

  // ── Badge selector check
  const badgeInfo = await page.evaluate(() => {
    const byClass = document.querySelectorAll('[class*="badge"]');
    const byDataBadge = document.querySelectorAll('[data-badge]');
    const bySpan = document.querySelectorAll('span[class*="Badge"]');
    return {
      byClass: byClass.length,
      byDataBadge: byDataBadge.length,
      bySpanBadge: bySpan.length,
      sampleHtml: byClass.length > 0 ? byClass[0].outerHTML.slice(0, 100) : 'none',
    };
  });
  console.log('BADGE_INFO:', JSON.stringify(badgeInfo, null, 2));
});
