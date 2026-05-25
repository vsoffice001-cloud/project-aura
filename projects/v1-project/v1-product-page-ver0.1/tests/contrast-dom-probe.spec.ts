/**
 * DOM probe — find the exact elements with contrast-failing classes/styles
 */
import { test } from '@playwright/test';

test('find contrast-failing elements', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027');
  await page.waitForLoadState('networkidle');

  // Full scroll
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let total = 0;
      const t = setInterval(() => {
        window.scrollBy(0, 400);
        total += 400;
        if (total >= document.body.scrollHeight) { clearInterval(t); resolve(); }
      }, 80);
    });
  });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  // Find all elements that compute to colors matching the failures
  const failingEls = await page.evaluate(() => {
    const results: Array<{ text: string; color: string; bg: string; class: string; parent: string; fontSize: string }> = [];

    document.querySelectorAll('*').forEach(el => {
      const cs = window.getComputedStyle(el);
      const color = cs.color;
      const bg = cs.backgroundColor;

      // Only leaf-ish text nodes
      if (el.children.length <= 2 && el.textContent && el.textContent.trim().length < 50) {
        // Check for the failing colors (approximately)
        // #a3a3a3 = rgb(163, 163, 163)
        // #806ce0 = rgb(128, 108, 224)
        // #a6968e = rgb(166, 150, 142)
        if (
          color.includes('163, 163') ||
          color.includes('128, 108') ||
          color.includes('166, 150')
        ) {
          results.push({
            text: el.textContent.trim().slice(0, 40),
            color,
            bg,
            class: el.className.slice(0, 80),
            parent: el.parentElement?.className?.slice(0, 60) ?? '',
            fontSize: cs.fontSize,
          });
        }
      }
    });
    return results.slice(0, 20);
  });

  console.log('FAILING_CONTRAST_ELEMENTS:', JSON.stringify(failingEls, null, 2));

  // Also find the badge/pill pattern with purple bg
  const purplePills = await page.evaluate(() => {
    const results: Array<{ text: string; color: string; bg: string; class: string; fontSize: string }> = [];
    document.querySelectorAll('*').forEach(el => {
      const cs = window.getComputedStyle(el);
      const bg = cs.backgroundColor;
      // #f7f6fe = rgb(247, 246, 254) — purple tinted
      if (bg.includes('247, 246') || bg.includes('246, 246')) {
        results.push({
          text: el.textContent?.trim().slice(0, 40) ?? '',
          color: cs.color,
          bg,
          class: el.className.slice(0, 80),
          fontSize: cs.fontSize,
        });
      }
    });
    return results.slice(0, 15);
  });

  console.log('PURPLE_BG_ELEMENTS:', JSON.stringify(purplePills, null, 2));
});
