/**
 * Contrast re-check after Badge theme fix
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('axe contrast recheck after Badge fix — Australia desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027');
  await page.waitForLoadState('networkidle');

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

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  const critical = results.violations.filter(v => v.impact === 'critical');
  const serious = results.violations.filter(v => v.impact === 'serious');

  const allDetail = results.violations.map(v => ({
    id: v.id,
    impact: v.impact,
    desc: v.description,
    nodeCount: v.nodes.length,
    sample: v.nodes[0]?.html?.slice(0, 80),
  }));
  console.log('ALL_AXE_VIOLATIONS:', JSON.stringify(allDetail, null, 2));
  console.log(`Critical: ${critical.length} · Serious: ${serious.length}`);

  expect(critical.length, 'Critical violations').toBe(0);
  expect(serious.length, 'Serious violations').toBe(0);
});

test('axe contrast recheck — Australia mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027');
  await page.waitForLoadState('networkidle');

  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let total = 0;
      const t = setInterval(() => {
        window.scrollBy(0, 300);
        total += 300;
        if (total >= document.body.scrollHeight) { clearInterval(t); resolve(); }
      }, 80);
    });
  });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  const critical = results.violations.filter(v => v.impact === 'critical');
  const serious = results.violations.filter(v => v.impact === 'serious');

  console.log(`Mobile C: ${critical.length} · S: ${serious.length}`);

  expect(critical.length, 'Mobile critical violations').toBe(0);
  expect(serious.length, 'Mobile serious violations').toBe(0);
});
