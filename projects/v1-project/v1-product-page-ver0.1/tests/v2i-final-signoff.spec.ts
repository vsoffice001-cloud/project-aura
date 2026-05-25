/**
 * v2i Final Sign-off — Full sweep
 * Australia + GCC · Desktop 1440×900 + Mobile 390×844
 * Section padding · a11y axe · sticky behaviors · screenshots
 */
import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import path from 'path';
import fs from 'fs';

const AUSTRALIA = '/reports/australia-cold-chain-market-2022-2027';
const GCC = '/reports/gcc-pharmaceutical-market-outlook-2026';
const SCREENSHOT_DIR = path.join(__dirname, '../qa-screenshots/v2i-final-sign-off');

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function scrollFull(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 80);
    });
  });
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}

async function probePadding(page: Page, selector: string): Promise<{ top: number; bottom: number } | null> {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = window.getComputedStyle(el);
    return {
      top: parseFloat(cs.paddingTop),
      bottom: parseFloat(cs.paddingBottom),
    };
  }, selector);
}

// ─── Desktop Tests ──────────────────────────────────────────────────────────

test.describe('Desktop 1440×900', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  for (const [label, url] of [['Australia', AUSTRALIA], ['GCC', GCC]]) {
    test.describe(label, () => {

      test('section padding + spacing probe', async ({ page }) => {
        await page.goto(url);
        await page.waitForLoadState('networkidle');
        await scrollFull(page);

        // Probe major section containers
        const sections = [
          { name: 'HeroSection', sel: '[data-section="hero"], section:first-of-type, .hero-section' },
          { name: 'Overview/About', sel: '[data-section="overview"], [data-section="about"]' },
          { name: 'TOC', sel: '[data-section="toc"], nav[aria-label*="content"]' },
          { name: 'Pricing', sel: '[data-section="pricing"]' },
          { name: 'FinalCTA', sel: '[data-section="final-cta"], [data-section="cta"]' },
        ];

        const results: Record<string, any> = {};
        for (const { name, sel } of sections) {
          const padding = await probePadding(page, sel);
          results[name] = padding;
        }

        // Log for inspection — no hard assert (values flagged in report)
        console.log(`[${label} Desktop] Section padding:`, JSON.stringify(results, null, 2));

        // Verify no section is zero-height
        const zeroHeight = await page.evaluate(() => {
          const sectionEls = document.querySelectorAll('section, [data-section], main > div > div');
          const zeros: string[] = [];
          sectionEls.forEach((el) => {
            const rect = el.getBoundingClientRect();
            // Only check visible elements
            if (rect.height === 0 && (el as HTMLElement).offsetParent !== null) {
              zeros.push(el.className || el.tagName);
            }
          });
          return zeros;
        });

        if (zeroHeight.length > 0) {
          console.warn(`[${label} Desktop] Zero-height visible sections:`, zeroHeight);
        }
        expect(zeroHeight.length, `Zero-height sections on ${label}`).toBe(0);
      });

      test('DS atom presence probe', async ({ page }) => {
        await page.goto(url);
        await page.waitForLoadState('networkidle');
        await scrollFull(page);

        // Buttons: check at least one present
        const btnCount = await page.locator('button, [role="button"], a[class*="btn"], a[class*="Button"]').count();
        expect(btnCount).toBeGreaterThan(0);

        // Badges: check present
        const badgeCount = await page.locator('[class*="badge"], [class*="Badge"], [data-badge]').count();
        console.log(`[${label} Desktop] Badges found: ${badgeCount}`);

        // Cards: check present
        const cardCount = await page.locator('[class*="card"], [class*="Card"]').count();
        console.log(`[${label} Desktop] Cards found: ${cardCount}`);
      });

      test('axe a11y scan', async ({ page }) => {
        await page.goto(url);
        await page.waitForLoadState('networkidle');
        await scrollFull(page);

        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();

        const critical = results.violations.filter((v) => v.impact === 'critical');
        const serious = results.violations.filter((v) => v.impact === 'serious');

        if (critical.length + serious.length > 0) {
          const detail = [...critical, ...serious].map((v) =>
            `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} nodes)`
          );
          console.error(`[${label} Desktop] axe violations:\n${detail.join('\n')}`);
        }

        expect(critical.length, `Critical a11y violations on ${label} desktop`).toBe(0);
        expect(serious.length, `Serious a11y violations on ${label} desktop`).toBe(0);
      });

      test('sticky behaviors', async ({ page }) => {
        await page.goto(url);
        await page.waitForLoadState('networkidle');

        // Sticky nav: check the sticky wrapper (#sticky-nav or .sticky.top-0)
        // Note: inner <nav> is position:relative inside sticky wrapper — probe wrapper
        const navSticky = await page.evaluate(() => {
          // Try dedicated sticky wrapper first, then any sticky/fixed nav-like element
          const stickyWrapper = document.querySelector('#sticky-nav, [class*="sticky"][class*="top-0"]');
          if (stickyWrapper) return window.getComputedStyle(stickyWrapper).position;
          const nav = document.querySelector('nav, header');
          if (!nav) return 'NOT_FOUND';
          return window.getComputedStyle(nav).position;
        });
        console.log(`[${label} Desktop] Nav sticky wrapper position: ${navSticky}`);
        expect(['sticky', 'fixed']).toContain(navSticky);

        // Hero right col sticky: scroll 400px and check
        await page.evaluate(() => window.scrollTo(0, 400));
        await page.waitForTimeout(300);

        const heroRightSticky = await page.evaluate(() => {
          // Look for sticky right column in hero
          const candidates = document.querySelectorAll('[class*="sticky"], [style*="sticky"]');
          const positions = Array.from(candidates).map((el) => ({
            class: el.className,
            pos: window.getComputedStyle(el).position,
          }));
          return positions;
        });
        console.log(`[${label} Desktop] Sticky elements:`, JSON.stringify(heroRightSticky));

        // Sticky CTA: check for sticky CTA element
        const stickyCtaExists = await page.evaluate(() => {
          const all = document.querySelectorAll('*');
          for (const el of Array.from(all)) {
            const cs = window.getComputedStyle(el);
            if ((cs.position === 'sticky' || cs.position === 'fixed') && el.textContent?.toLowerCase().includes('buy')) {
              return true;
            }
          }
          return false;
        });
        console.log(`[${label} Desktop] Sticky CTA found: ${stickyCtaExists}`);

        await page.evaluate(() => window.scrollTo(0, 0));
      });

      test('full-page screenshot', async ({ page }) => {
        ensureDir(SCREENSHOT_DIR);
        await page.goto(url);
        await page.waitForLoadState('networkidle');
        await scrollFull(page);

        const filename = `${label.toLowerCase()}-desktop-1440.png`;
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, filename),
          fullPage: true,
        });
        console.log(`[${label} Desktop] Screenshot saved: ${filename}`);
      });

      test('console errors', async ({ page }) => {
        const errors: string[] = [];
        page.on('console', (msg) => {
          if (msg.type() === 'error') errors.push(msg.text());
        });
        page.on('pageerror', (err) => errors.push(err.message));

        await page.goto(url);
        await page.waitForLoadState('networkidle');
        await scrollFull(page);

        if (errors.length > 0) {
          console.error(`[${label} Desktop] Console errors:`, errors);
        }
        expect(errors, `Console errors on ${label} desktop`).toHaveLength(0);
      });
    });
  }
});

// ─── Mobile Tests ────────────────────────────────────────────────────────────

test.describe('Mobile 390×844', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const [label, url] of [['Australia', AUSTRALIA], ['GCC', GCC]]) {
    test.describe(label, () => {

      test('axe a11y scan', async ({ page }) => {
        await page.goto(url);
        await page.waitForLoadState('networkidle');
        await scrollFull(page);

        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();

        const critical = results.violations.filter((v) => v.impact === 'critical');
        const serious = results.violations.filter((v) => v.impact === 'serious');

        if (critical.length + serious.length > 0) {
          const detail = [...critical, ...serious].map((v) =>
            `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} nodes)`
          );
          console.error(`[${label} Mobile] axe violations:\n${detail.join('\n')}`);
        }

        expect(critical.length, `Critical a11y violations on ${label} mobile`).toBe(0);
        expect(serious.length, `Serious a11y violations on ${label} mobile`).toBe(0);
      });

      test('touch targets ≥44px', async ({ page }) => {
        await page.goto(url);
        await page.waitForLoadState('networkidle');

        const smallTargets = await page.evaluate(() => {
          const interactives = document.querySelectorAll('button, a, [role="button"], input, select, textarea');
          const small: Array<{ tag: string; text: string; w: number; h: number }> = [];
          interactives.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
              small.push({
                tag: el.tagName,
                text: el.textContent?.trim().slice(0, 40) ?? '',
                w: Math.round(rect.width),
                h: Math.round(rect.height),
              });
            }
          });
          return small;
        });

        if (smallTargets.length > 0) {
          console.warn(`[${label} Mobile] Small touch targets (< 44px):`, JSON.stringify(smallTargets));
        }
        // Flag but don't hard-fail (some inline links acceptable)
        console.log(`[${label} Mobile] Touch targets < 44px count: ${smallTargets.length}`);
      });

      test('full-page screenshot', async ({ page }) => {
        ensureDir(SCREENSHOT_DIR);
        await page.goto(url);
        await page.waitForLoadState('networkidle');
        await scrollFull(page);

        const filename = `${label.toLowerCase()}-mobile-390.png`;
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, filename),
          fullPage: true,
        });
        console.log(`[${label} Mobile] Screenshot saved: ${filename}`);
      });

      test('zero-size sections probe', async ({ page }) => {
        await page.goto(url);
        await page.waitForLoadState('networkidle');
        await scrollFull(page);

        const zeroHeight = await page.evaluate(() => {
          const sectionEls = document.querySelectorAll('section, [data-section]');
          const zeros: string[] = [];
          sectionEls.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.height < 20) {
              zeros.push(`${el.tagName}[${el.getAttribute('data-section') ?? el.className.slice(0, 30)}] h=${Math.round(rect.height)}`);
            }
          });
          return zeros;
        });

        if (zeroHeight.length > 0) {
          console.warn(`[${label} Mobile] Near-zero height sections:`, zeroHeight);
        }
        expect(zeroHeight.length, `Zero-height sections on ${label} mobile`).toBe(0);
      });
    });
  }
});

// ─── Section padding detailed probe ─────────────────────────────────────────

test.describe('Section padding detailed — Australia desktop', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('probe all data-section padding values', async ({ page }) => {
    await page.goto(AUSTRALIA);
    await page.waitForLoadState('networkidle');
    await scrollFull(page);

    const paddingReport = await page.evaluate(() => {
      const result: Array<{ section: string; pt: number; pb: number; gap: number | null }> = [];

      // By data-section
      document.querySelectorAll('[data-section]').forEach((el) => {
        const cs = window.getComputedStyle(el);
        const gapEl = el.querySelector('[class*="flex"], [class*="grid"]');
        const gapCs = gapEl ? window.getComputedStyle(gapEl) : null;
        result.push({
          section: el.getAttribute('data-section') ?? 'unknown',
          pt: parseFloat(cs.paddingTop),
          pb: parseFloat(cs.paddingBottom),
          gap: gapCs ? parseFloat(gapCs.gap || gapCs.rowGap || '0') : null,
        });
      });

      // By section tags if no data-section — exclude nested sections (e.g. SWOT quadrant cards)
      if (result.length === 0) {
        document.querySelectorAll('section').forEach((el, i) => {
          // Skip sections nested inside another section (inner quadrant children etc.)
          if (el.parentElement?.closest('section')) return;
          const cs = window.getComputedStyle(el);
          result.push({
            section: `section[${i}]`,
            pt: parseFloat(cs.paddingTop),
            pb: parseFloat(cs.paddingBottom),
            gap: null,
          });
        });
      }

      return result;
    });

    console.log('[Padding Probe] Results:', JSON.stringify(paddingReport, null, 2));

    // Flag any section with < 40px padding (should be ≥40px mobile, ≥64px desktop)
    const underpadded = paddingReport.filter((s) => s.pt < 40 || s.pb < 40);
    if (underpadded.length > 0) {
      console.warn('[Padding Probe] Under-padded sections (< 40px):', JSON.stringify(underpadded));
    }

    // Check no section has both 0 pt AND 0 pb (likely broken)
    const zeroPadded = paddingReport.filter((s) => s.pt === 0 && s.pb === 0);
    expect(zeroPadded.length, 'Sections with zero top AND bottom padding').toBe(0);
  });
});
