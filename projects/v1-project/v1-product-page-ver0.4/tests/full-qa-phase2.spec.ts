/**
 * Full QA pass — /test/phase-2 — all 24 sections
 * aura-qa · 2026-05-22
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGE = '/test/phase-2';
const BASE = 'http://localhost:3040';

// All 24 section IDs
const SECTION_IDS = [
  'section-01', 'section-02', 'section-03', 'section-04',
  'section-05', 'section-06', 'section-07', 'section-08',
  'section-09', 'section-10', 'section-11', 'section-12',
  'section-13', 'section-14', 'section-15', 'section-16',
  'section-17', 'section-18', 'section-19', 'section-20',
  'section-21', 'section-22', 'section-23', 'section-24',
];

// Gated sections per brief
const GATED_SECTION_IDS = ['section-08', 'section-11', 'section-14', 'section-17', 'section-22'];

test.describe('Phase-2 Full QA', () => {

  test('01 · page loads · no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.message));

    await page.goto(PAGE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Log all console errors for reporting
    console.log('CONSOLE_ERRORS:', JSON.stringify(errors));
    // Don't hard-fail — we want to see everything
  });

  test('02 · all 24 sections present in DOM', async ({ page }) => {
    await page.goto(PAGE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const missing: string[] = [];
    for (const id of SECTION_IDS) {
      const el = page.locator(`#${id}`);
      const count = await el.count();
      if (count === 0) missing.push(id);
    }
    console.log('MISSING_SECTIONS:', JSON.stringify(missing));
    expect(missing, `Missing sections: ${missing.join(', ')}`).toHaveLength(0);
  });

  test('03 · axe a11y scan', async ({ page }) => {
    await page.goto(PAGE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    console.log('AXE_VIOLATIONS_COUNT:', results.violations.length);
    console.log('AXE_VIOLATIONS:', JSON.stringify(
      results.violations.map(v => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        nodes: v.nodes.length,
        targets: v.nodes.slice(0, 2).map(n => n.target.join(' ')),
      })),
      null, 2
    ));
  });

  test('04 · gated sections have PremiumLockCard', async ({ page }) => {
    await page.goto(PAGE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    // Scroll to bottom to ensure all sections rendered
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1500);
    await page.evaluate(() => window.scrollTo(0, 0));

    const results: Record<string, boolean> = {};
    for (const id of GATED_SECTION_IDS) {
      const section = page.locator(`#${id}`);
      // Look for blur overlay or lock card indicators
      const lockCard = section.locator('[class*="blur"], [class*="lock"], [data-lock], button').first();
      const hasLock = await lockCard.count() > 0;
      results[id] = hasLock;
    }
    console.log('GATING_RESULTS:', JSON.stringify(results));
  });

  test('05 · mobile 375px · no horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(PAGE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    console.log('MOBILE_OVERFLOW:', overflow);

    // Also check body width
    const bodyWidth = await page.evaluate(() => ({
      bodyScrollWidth: document.body.scrollWidth,
      windowWidth: window.innerWidth,
    }));
    console.log('MOBILE_WIDTHS:', JSON.stringify(bodyWidth));
  });

  test('06 · page progress bar present', async ({ page }) => {
    await page.goto(PAGE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Look for progress bar by role or common patterns
    const progressBar = page.locator('[role="progressbar"], [class*="progress"], [class*="Progress"]').first();
    const exists = await progressBar.count() > 0;
    console.log('PROGRESS_BAR_EXISTS:', exists);

    if (exists) {
      const initialVal = await progressBar.getAttribute('aria-valuenow') ||
        await progressBar.evaluate((el: Element) => (el as HTMLElement).style.width);
      console.log('PROGRESS_BAR_INITIAL:', initialVal);
    }
  });

  test('07 · scroll to bottom · progress advances', async ({ page }) => {
    await page.goto(PAGE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const progressBar = page.locator('[role="progressbar"], [class*="progress"], [class*="Progress"]').first();
    if (await progressBar.count() > 0) {
      const val = await progressBar.getAttribute('style') ||
        await progressBar.evaluate((el: Element) => (el as HTMLElement).style.width);
      console.log('PROGRESS_BAR_AT_BOTTOM:', val);
    }
  });

  test('08 · reduced motion media query respected', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(PAGE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Check if animations are disabled via computed style
    const hasMotionReduction = await page.evaluate(() => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      return mq.matches;
    });
    console.log('REDUCED_MOTION_MQ_MATCHES:', hasMotionReduction);

    // Check for framer-motion elements with animation
    const animatedEls = await page.evaluate(() => {
      const els = document.querySelectorAll('[style*="transform"], [style*="opacity"]');
      return els.length;
    });
    console.log('ANIMATED_ELEMENTS_WITH_REDUCED_MOTION:', animatedEls);
  });

  test('09 · keyboard nav · interactive elements focusable', async ({ page }) => {
    await page.goto(PAGE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Tab through first 10 interactive elements
    const focusableSelectors = 'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableCount = await page.evaluate((sel) => {
      return document.querySelectorAll(sel).length;
    }, focusableSelectors);
    console.log('FOCUSABLE_ELEMENT_COUNT:', focusableCount);

    // Check first interactive element gets focus on Tab
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? `${el.tagName}#${el.id}.${el.className.split(' ')[0]}` : 'none';
    });
    console.log('FIRST_FOCUSED_ELEMENT:', focused);
  });

  test('10 · section scroll-spy · TOC active state', async ({ page }) => {
    await page.goto(PAGE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Check TOC exists
    const toc = page.locator('[class*="toc"], [class*="TOC"], [class*="SideTOC"], nav[aria-label*="Table"]').first();
    const tocExists = await toc.count() > 0;
    console.log('SIDETOC_EXISTS:', tocExists);

    // Scroll to section-10 and check active
    const section10 = page.locator('#section-10');
    if (await section10.count() > 0) {
      await section10.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);

      const activeItem = await page.evaluate(() => {
        const actives = document.querySelectorAll('[class*="active"], [aria-current="true"], [data-active="true"]');
        return Array.from(actives).map(el => el.textContent?.trim().substring(0, 40)).join(' | ');
      });
      console.log('TOC_ACTIVE_AT_SECTION10:', activeItem);
    }
  });

  test('11 · charts rendered · no blank chart areas', async ({ page }) => {
    await page.goto(PAGE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Scroll through page to trigger lazy-loaded charts
    await page.evaluate(async () => {
      const height = document.body.scrollHeight;
      for (let y = 0; y < height; y += 400) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 100));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(2000);

    // Check highcharts containers
    const highchartsCount = await page.evaluate(() => {
      return document.querySelectorAll('[class*="highcharts"], .highcharts-container, .highcharts-root').length;
    });
    console.log('HIGHCHARTS_CONTAINERS:', highchartsCount);

    // Check for SVG presence inside chart containers
    const svgCount = await page.evaluate(() => {
      return document.querySelectorAll('.highcharts-container svg, [class*="chart"] svg').length;
    });
    console.log('CHART_SVGS:', svgCount);

    // Check for any "loading" states stuck
    const loadingCount = await page.evaluate(() => {
      return document.querySelectorAll('[class*="loading"], [class*="spinner"]').length;
    });
    console.log('LOADING_SPINNERS_STUCK:', loadingCount);
  });

  test('12 · TOC jump links scroll correctly', async ({ page }) => {
    await page.goto(PAGE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Find TOC links that have href="#section-XX"
    const tocLinks = await page.evaluate(() => {
      const links = document.querySelectorAll('a[href^="#section-"]');
      return Array.from(links).slice(0, 5).map(a => ({
        href: a.getAttribute('href'),
        text: a.textContent?.trim().substring(0, 30),
      }));
    });
    console.log('TOC_LINKS_FOUND:', JSON.stringify(tocLinks));

    // Test clicking first TOC link
    if (tocLinks.length > 0) {
      const firstHref = tocLinks[0].href!;
      const targetId = firstHref.replace('#', '');
      await page.locator(`a[href="${firstHref}"]`).first().click();
      await page.waitForTimeout(700);

      const targetVisible = await page.locator(`#${targetId}`).isVisible();
      console.log(`TOC_JUMP_TO_${targetId}_VISIBLE:`, targetVisible);
    }
  });

  test('13 · screenshots cross-device', async ({ page }) => {
    const viewports = [
      { name: 'mobile-375', width: 375, height: 812 },
      { name: 'tablet-768', width: 768, height: 1024 },
      { name: 'desktop-1440', width: 1440, height: 900 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(PAGE, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1500);

      await page.screenshot({
        path: `qa-screenshots/phase2-${vp.name}.png`,
        fullPage: false,
      });

      // Also scroll to bottom and screenshot
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: `qa-screenshots/phase2-${vp.name}-bottom.png`,
        fullPage: false,
      });
      console.log(`SCREENSHOT_${vp.name}: captured`);
    }
  });

  test('14 · touch target sizes 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(PAGE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const smallTargets = await page.evaluate(() => {
      const interactive = document.querySelectorAll('button, a, [role="button"]');
      const small: Array<{ tag: string; text: string; w: number; h: number }> = [];
      interactive.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
          small.push({
            tag: el.tagName,
            text: (el.textContent || '').trim().substring(0, 30),
            w: Math.round(rect.width),
            h: Math.round(rect.height),
          });
        }
      });
      return small.slice(0, 20);
    });
    console.log('SMALL_TOUCH_TARGETS:', JSON.stringify(smallTargets));
  });
});
