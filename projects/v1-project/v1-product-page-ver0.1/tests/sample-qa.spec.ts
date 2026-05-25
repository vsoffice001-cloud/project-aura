import { test, expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const SAMPLE_URL = 'http://localhost:3000/sample';

async function fullScroll(page: Page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}

test('sample-axe-desktop', async ({ page }) => {
  await page.goto(SAMPLE_URL, { waitUntil: 'networkidle' });
  await fullScroll(page);
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  console.log(`AXE DESKTOP: ${results.violations.length} violations`);
  results.violations.forEach(v => {
    console.log(`  [${v.impact}] ${v.id}: ${v.description}`);
    v.nodes.slice(0, 2).forEach(n => {
      console.log(`    target: ${n.target[0]}`);
      console.log(`    fix: ${n.failureSummary?.split('\n')[0]}`);
    });
  });
});

test('sample-axe-mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(SAMPLE_URL, { waitUntil: 'networkidle' });
  await fullScroll(page);
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  console.log(`AXE MOBILE 390px: ${results.violations.length} violations`);
  results.violations.forEach(v => {
    console.log(`  [${v.impact}] ${v.id}: ${v.description}`);
  });
});

test('sample-reduced-motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(SAMPLE_URL, { waitUntil: 'networkidle' });
  // Verify page loads without JS errors
  const errors: string[] = [];
  page.on('pageerror', err => errors.push(err.message));
  await fullScroll(page);
  console.log(`reduced-motion errors: ${errors.length}`);
  errors.forEach(e => console.log(`  ERROR: ${e}`));
  await expect(page.locator('h1').first()).toBeVisible();
});

test('sample-keyboard-tab', async ({ page }) => {
  await page.goto(SAMPLE_URL, { waitUntil: 'networkidle' });
  // Tab through first 20 interactive elements
  let focusedElements = 0;
  let withVisibleRing = 0;
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const style = getComputedStyle(el);
      const outline = style.outline;
      const boxShadow = style.boxShadow;
      return {
        tag: el.tagName,
        hasOutline: outline !== 'none' && outline !== '' && !outline.includes('0px'),
        hasBoxShadow: boxShadow !== 'none' && boxShadow !== '',
        focusVisible: el.matches(':focus-visible'),
      };
    });
    if (focused) {
      focusedElements++;
      if (focused.hasOutline || focused.hasBoxShadow) withVisibleRing++;
      if (!focused.hasOutline && !focused.hasBoxShadow) {
        console.log(`  NO RING: <${focused.tag}> (tab #${i+1}) focusVisible=${focused.focusVisible}`);
      }
    }
  }
  console.log(`Keyboard: ${focusedElements} elements tabbed, ${withVisibleRing} with visible ring`);
});

test('sample-viewport-screenshots', async ({ page }) => {
  const viewports = [
    { width: 1440, height: 900, name: 'desktop-1440' },
    { width: 768, height: 1024, name: 'tablet-768' },
    { width: 390, height: 844, name: 'mobile-390' },
  ];
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(SAMPLE_URL, { waitUntil: 'networkidle' });
    await fullScroll(page);
    const title = await page.title();
    const h1 = await page.locator('h1').first().textContent().catch(() => 'NOT FOUND');
    const sectionCount = await page.locator('section').count();
    console.log(`${vp.name}: title="${title}" h1="${h1?.substring(0,40)}" sections=${sectionCount}`);
    await page.screenshot({ path: `/tmp/sample-${vp.name}.png`, fullPage: false });
    console.log(`  screenshot: /tmp/sample-${vp.name}.png`);
  }
});
