/**
 * GCC route — axe + screenshots post-fix
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import path from 'path';
import fs from 'fs';

const GCC = '/reports/gcc-pharmaceutical-market-outlook-2026';
const SCREENSHOT_DIR = path.join(__dirname, '../qa-screenshots/v2i-final-sign-off');

async function scrollFull(page: any) {
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
}

test('GCC desktop axe post-fix', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(GCC);
  await page.waitForLoadState('networkidle');
  await scrollFull(page);

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  const critical = results.violations.filter(v => v.impact === 'critical');
  const serious = results.violations.filter(v => v.impact === 'serious');
  console.log(`GCC desktop C: ${critical.length} · S: ${serious.length}`);
  if (serious.length > 0) {
    console.log(serious.map(v => `${v.id}: ${v.description}`));
  }
  expect(critical.length).toBe(0);
  expect(serious.length).toBe(0);
});

test('GCC mobile axe post-fix', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(GCC);
  await page.waitForLoadState('networkidle');
  await scrollFull(page);

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  const critical = results.violations.filter(v => v.impact === 'critical');
  const serious = results.violations.filter(v => v.impact === 'serious');
  console.log(`GCC mobile C: ${critical.length} · S: ${serious.length}`);
  expect(critical.length).toBe(0);
  expect(serious.length).toBe(0);
});

test('GCC screenshots desktop + mobile', async ({ page }) => {
  if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

  // Desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(GCC);
  await page.waitForLoadState('networkidle');
  await scrollFull(page);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'gcc-desktop-1440.png'), fullPage: true });

  // Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(GCC);
  await page.waitForLoadState('networkidle');
  await scrollFull(page);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'gcc-mobile-390.png'), fullPage: true });

  console.log('GCC screenshots saved');
});
