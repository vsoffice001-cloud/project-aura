import { test, expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as path from 'path';
import * as fs from 'fs';

const PRIMARY_URL = '/reports/australia-cold-chain-market-2022-2027';
const SECONDARY_URL = '/reports/gcc-pharmaceutical-market-outlook-2026';
const SCREENSHOT_DIR = path.join(process.cwd(), 'qa-screenshots/v2a-final');

async function fullScroll(page: Page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}

// ========== CHECK 1: AXE ==========
test('01-axe: desktop 1440px', async ({ page }) => {
  await page.goto(PRIMARY_URL, { waitUntil: 'networkidle' });
  await fullScroll(page);

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();

  const critical = results.violations.filter(v => v.impact === 'critical');
  const serious = results.violations.filter(v => v.impact === 'serious');

  console.log(`AXE DESKTOP: ${critical.length} critical, ${serious.length} serious, ${results.violations.length} total`);
  results.violations.forEach(v => {
    console.log(`  [${v.impact}] ${v.id}: ${v.description}`);
    v.nodes.slice(0, 2).forEach(n => {
      console.log(`    target: ${n.target[0]}`);
      console.log(`    fix: ${n.failureSummary?.split('\n')[0]}`);
    });
  });

  expect(critical, `Critical violations:\n${critical.map(v => `${v.id}: ${v.description}`).join('\n')}`).toHaveLength(0);
  expect(serious, `Serious violations:\n${serious.map(v => `${v.id}: ${v.description}`).join('\n')}`).toHaveLength(0);
});

test('01-axe: mobile 375px', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(PRIMARY_URL, { waitUntil: 'networkidle' });
  await fullScroll(page);

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();

  const critical = results.violations.filter(v => v.impact === 'critical');
  const serious = results.violations.filter(v => v.impact === 'serious');

  console.log(`AXE MOBILE: ${critical.length} critical, ${serious.length} serious`);
  results.violations.forEach(v => {
    console.log(`  [${v.impact}] ${v.id}: ${v.description}`);
    v.nodes.slice(0, 1).forEach(n => {
      console.log(`    target: ${n.target[0]}`);
    });
  });
});

// ========== CHECK 2: H1 COUNT ==========
test('02-h1-single', async ({ page }) => {
  await page.goto(PRIMARY_URL, { waitUntil: 'networkidle' });
  const h1s = await page.locator('h1').all();
  console.log(`H1 count: ${h1s.length}`);
  for (const h1 of h1s) {
    console.log(`  h1 text: "${(await h1.textContent())?.slice(0, 80)}"`);
  }
  expect(h1s.length, 'Should have exactly 1 h1').toBe(1);
});

// ========== CHECK 3: TAB PATTERN ==========
test('03-tab-aria-pattern', async ({ page }) => {
  await page.goto(PRIMARY_URL, { waitUntil: 'networkidle' });

  const tabs = await page.evaluate(() => {
    const tabEls = document.querySelectorAll('[role="tab"]');
    return Array.from(tabEls).map(t => ({
      text: t.textContent?.slice(0, 30),
      ariaSelected: t.getAttribute('aria-selected'),
      tabIndex: (t as HTMLElement).tabIndex,
      ariaControls: t.getAttribute('aria-controls'),
    }));
  });

  console.log(`Tab elements found: ${tabs.length}`);
  tabs.forEach((t, i) => {
    console.log(`  [${i}] "${t.text}" selected=${t.ariaSelected} tabIndex=${t.tabIndex} controls=${t.ariaControls}`);
  });

  // Check tablist exists
  const tablist = await page.locator('[role="tablist"]').count();
  console.log(`Tablist elements: ${tablist}`);

  // Check tabpanels
  const tabpanels = await page.locator('[role="tabpanel"]').count();
  console.log(`Tabpanel elements: ${tabpanels}`);

  if (tabs.length > 0) {
    tabs.forEach(t => {
      expect(t.ariaSelected, `Tab "${t.text}" missing aria-selected`).not.toBeNull();
      expect(t.ariaControls, `Tab "${t.text}" missing aria-controls`).not.toBeNull();
    });

    // Verify roving tabIndex: one tab should be 0, others -1
    const tab0 = tabs.filter(t => t.tabIndex === 0);
    const tabMinus1 = tabs.filter(t => t.tabIndex === -1);
    console.log(`  tabIndex=0: ${tab0.length} | tabIndex=-1: ${tabMinus1.length}`);
    expect(tab0.length, 'Exactly one tab should have tabIndex=0 (roving)').toBe(1);
  }
});

// ========== CHECK 4: VISIBLE FOCUS RINGS ==========
test('04-focus-visibility', async ({ page }) => {
  await page.goto(PRIMARY_URL, { waitUntil: 'networkidle' });

  const missingFocusRings: string[] = [];

  // Tab through 20 elements
  await page.keyboard.press('Tab');

  for (let i = 0; i < 20; i++) {
    const focusInfo = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      if (!el || el === document.body || el.tagName === 'BODY') return null;
      const style = getComputedStyle(el);
      return {
        tag: el.tagName,
        role: el.getAttribute('role') || '',
        text: el.textContent?.slice(0, 30) || el.getAttribute('aria-label') || '',
        outlineWidth: style.outlineWidth,
        outlineColor: style.outlineColor,
        outlineStyle: style.outlineStyle,
        boxShadow: style.boxShadow,
        outline: style.outline,
      };
    });

    if (focusInfo) {
      const hasOutline = focusInfo.outlineWidth !== '0px' && focusInfo.outlineStyle !== 'none';
      const hasBoxShadow = focusInfo.boxShadow !== 'none' && focusInfo.boxShadow !== '';
      const hasFocus = hasOutline || hasBoxShadow;

      if (!hasFocus) {
        missingFocusRings.push(`${focusInfo.tag}[${focusInfo.role}] "${focusInfo.text}"`);
        console.log(`  NO RING: ${focusInfo.tag}[${focusInfo.role}] "${focusInfo.text}" outline="${focusInfo.outline}" shadow="${focusInfo.boxShadow}"`);
      } else {
        console.log(`  RING OK: ${focusInfo.tag}[${focusInfo.role}] "${focusInfo.text.slice(0, 20)}"`);
      }
    }

    await page.keyboard.press('Tab');
  }

  console.log(`Missing focus rings: ${missingFocusRings.length} / 20`);
  if (missingFocusRings.length > 0) {
    console.log('  Missing on:', missingFocusRings.join('; '));
  }
});

// ========== CHECK 5: COMPUTED FONT SIZES ==========
test('05-computed-font-sizes', async ({ page }) => {
  await page.goto(PRIMARY_URL, { waitUntil: 'networkidle' });

  const fontData = await page.evaluate(() => {
    const getSize = (sel: string) => {
      const el = document.querySelector(sel);
      return el ? { found: true, size: getComputedStyle(el).fontSize } : { found: false, size: '0px' };
    };

    return {
      h1: getSize('h1'),
      h2: getSize('h2'),
      h3: getSize('h3'),
      bodyP: getSize('p'),
      keyStatBig: getSize('.text-5xl, .text-6xl, .text-7xl, [class*="text-5"], [class*="text-6"]'),
      navBtn: getSize('nav button, nav a'),
    };
  });

  console.log('Computed font sizes:');
  Object.entries(fontData).forEach(([key, val]) => {
    const px = parseFloat(val.size);
    const warnings = [];
    if (key === 'bodyP' && val.found && px < 16) warnings.push('BELOW 16px!');
    if (key === 'h1' && val.found && px < 32) warnings.push('BELOW 32px!');
    console.log(`  ${key}: ${val.found ? val.size : 'ELEMENT NOT FOUND'} ${warnings.join(' ')}`);
  });

  if (fontData.bodyP.found) {
    expect(parseFloat(fontData.bodyP.size), 'Body text should be >= 16px').toBeGreaterThanOrEqual(16);
  }

  if (fontData.h1.found) {
    expect(parseFloat(fontData.h1.size), 'H1 should be >= 32px').toBeGreaterThanOrEqual(32);
  }
});

// ========== CHECK 6: FORMS A11Y ==========
test('06-forms-a11y-static', async ({ page }) => {
  await page.goto(PRIMARY_URL, { waitUntil: 'networkidle' });

  // Check forms in DOM
  const formData = await page.evaluate(() => {
    const forms = Array.from(document.querySelectorAll('form'));
    return forms.map(form => {
      const inputs = Array.from(form.querySelectorAll('input, select, textarea'));
      const issues: string[] = [];

      inputs.forEach(inp => {
        const id = inp.getAttribute('id');
        const name = inp.getAttribute('name') || inp.getAttribute('type') || 'unnamed';
        const hasLabel = id ? !!form.querySelector(`label[for="${id}"]`) : false;
        const hasAriaLabel = !!inp.getAttribute('aria-label') || !!inp.getAttribute('aria-labelledby');

        if (!hasLabel && !hasAriaLabel) {
          issues.push(`unlabelled input: ${name}`);
        }
      });

      return {
        action: form.getAttribute('action') || 'no-action',
        inputs: inputs.length,
        issues,
      };
    });
  });

  console.log(`Forms in DOM: ${formData.length}`);
  formData.forEach((f, i) => {
    console.log(`  form[${i}]: ${f.inputs} inputs, ${f.issues.length} issues`);
    f.issues.forEach(issue => console.log(`    ⚠️ ${issue}`));
  });

  // Check if modals are in DOM (closed state)
  const modalInfo = await page.evaluate(() => {
    const dialogs = document.querySelectorAll('[role="dialog"]');
    const ariaModal = document.querySelectorAll('[aria-modal="true"]');
    return {
      dialogCount: dialogs.length,
      ariaModalCount: ariaModal.length,
    };
  });
  console.log(`  Dialog roles in DOM: ${modalInfo.dialogCount}`);
  console.log(`  aria-modal=true in DOM: ${modalInfo.ariaModalCount}`);
});

// ========== CHECK 7: ANALYTICS ==========
test('07-analytics-datalayer', async ({ page }) => {
  // Intercept dataLayer before page loads
  await page.addInitScript(() => {
    (window as any).dataLayer = (window as any).dataLayer || [];
  });

  await page.goto(PRIMARY_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const dlState = await page.evaluate(() => {
    const dl = (window as any).dataLayer || [];
    return {
      length: dl.length,
      events: dl.slice(0, 30).map((e: any) => ({
        event: e.event,
        type: typeof e,
      })),
    };
  });

  console.log(`dataLayer entries: ${dlState.length}`);
  const eventNames = dlState.events.map((e: any) => e.event).filter(Boolean);
  console.log(`Events: ${eventNames.join(', ')}`);

  const hasProductView = eventNames.some((n: string) =>
    n?.toLowerCase().includes('page_view') || n?.toLowerCase().includes('product_page')
  );
  console.log(`product_page_view / page_view: ${hasProductView ? 'FIRED' : 'NOT FOUND'}`);

  // Scroll depth test
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.3));
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.6));
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  const dlAfterScroll = await page.evaluate(() => {
    const dl = (window as any).dataLayer || [];
    return dl.slice(0, 50).map((e: any) => e.event).filter(Boolean);
  });
  console.log(`Events after scroll: ${dlAfterScroll.join(', ')}`);
  const hasScrollDepth = dlAfterScroll.some((n: string) => n?.toLowerCase().includes('scroll'));
  console.log(`scroll_depth events: ${hasScrollDepth ? 'FOUND' : 'NOT FOUND'}`);
});

// ========== CHECK 8: VISUAL SCREENSHOTS ==========
test('08-screenshots', async ({ page }) => {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  // Desktop 1440px
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(PRIMARY_URL, { waitUntil: 'networkidle' });
  await fullScroll(page);
  await page.screenshot({
    fullPage: true,
    path: path.join(SCREENSHOT_DIR, 'primary-australia-cold-chain-desktop-1440.png')
  });
  console.log('Saved desktop-1440 screenshot');

  // Mobile 375px
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(PRIMARY_URL, { waitUntil: 'networkidle' });
  await fullScroll(page);
  await page.screenshot({
    fullPage: true,
    path: path.join(SCREENSHOT_DIR, 'primary-australia-cold-chain-mobile-375.png')
  });
  console.log('Saved mobile-375 screenshot');

  // Secondary URL - desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(SECONDARY_URL, { waitUntil: 'networkidle' });
  await fullScroll(page);
  await page.screenshot({
    fullPage: true,
    path: path.join(SCREENSHOT_DIR, 'secondary-gcc-pharma-desktop-1440.png')
  });
  console.log('Saved secondary desktop screenshot');

  // Secondary URL - mobile
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(SECONDARY_URL, { waitUntil: 'networkidle' });
  await page.screenshot({
    fullPage: true,
    path: path.join(SCREENSHOT_DIR, 'secondary-gcc-pharma-mobile-375.png')
  });
  console.log('Saved secondary mobile screenshot');
});

// ========== CHECK 9: CHART RENDERING ==========
test('09-chart-rendering', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await page.goto(PRIMARY_URL, { waitUntil: 'networkidle' });
  await fullScroll(page);

  const chartData = await page.evaluate(() => {
    const hcContainers = document.querySelectorAll('.highcharts-root, [class*="highcharts-container"]');
    const rechartsEls = document.querySelectorAll('.recharts-wrapper');
    const svgs = document.querySelectorAll('svg');
    const canvases = document.querySelectorAll('canvas');

    const badDims: string[] = [];
    svgs.forEach((svg, i) => {
      const rect = svg.getBoundingClientRect();
      if (rect.width <= 1 || rect.height <= 1) {
        badDims.push(`svg[${i}] classname="${svg.className}" w=${rect.width} h=${rect.height}`);
      }
    });

    // Check chart placeholders
    const placeholders = document.querySelectorAll('[data-chart-placeholder], [class*="chart-placeholder"]');

    return {
      hcContainerCount: hcContainers.length,
      rechartsCount: rechartsEls.length,
      svgCount: svgs.length,
      canvasCount: canvases.length,
      badDimensionCount: badDims.length,
      badDimensions: badDims.slice(0, 5),
      placeholderCount: placeholders.length,
    };
  });

  console.log(`Chart data: HC=${chartData.hcContainerCount} Recharts=${chartData.rechartsCount} SVGs=${chartData.svgCount} Canvas=${chartData.canvasCount}`);
  console.log(`Placeholders: ${chartData.placeholderCount}`);
  console.log(`Bad dimensions: ${chartData.badDimensionCount}`);
  chartData.badDimensions.forEach(b => console.log(`  BAD: ${b}`));

  const hcErrors = consoleErrors.filter(e => e.toLowerCase().includes('highcharts'));
  if (hcErrors.length > 0) {
    console.log('Highcharts errors:');
    hcErrors.forEach(e => console.log(`  ${e}`));
  } else {
    console.log('No Highcharts console errors');
  }
});

// ========== CHECK 10: SEO + JSON-LD ==========
test('10-seo-jsonld', async ({ page }) => {
  await page.goto(PRIMARY_URL, { waitUntil: 'networkidle' });
  const html = await page.content();

  const title = (html.match(/<title[^>]*>([^<]+)<\/title>/) || [])[1] || 'MISSING';
  const desc = (html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/) || [])[1] || 'MISSING';
  const ogTitle = (html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/) || [])[1] || 'MISSING';
  const ogDesc = (html.match(/<meta[^>]*property="og:description"[^>]*content="([^"]+)"/) || [])[1] || 'MISSING';
  const ogUrl = (html.match(/<meta[^>]*property="og:url"[^>]*content="([^"]+)"/) || [])[1] || 'MISSING';
  const twitterCard = (html.match(/<meta[^>]*name="twitter:card"[^>]*content="([^"]+)"/) || [])[1] || 'MISSING';

  const ldMatches = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  const ldCount = ldMatches.length;
  const ldTypes: string[] = [];
  const parseErrors: number[] = [];

  ldMatches.forEach((match, i) => {
    try {
      const parsed = JSON.parse(match[1]);
      ldTypes.push(parsed['@type'] || 'unknown');
    } catch {
      ldTypes.push(`PARSE_ERROR`);
      parseErrors.push(i);
    }
  });

  console.log(`title: "${title.slice(0, 100)}"`);
  console.log(`description: ${desc !== 'MISSING' ? `"${desc.slice(0, 80)}..."` : 'MISSING'}`);
  console.log(`og:title: ${ogTitle !== 'MISSING' ? 'PRESENT' : 'MISSING'}`);
  console.log(`og:description: ${ogDesc !== 'MISSING' ? 'PRESENT' : 'MISSING'}`);
  console.log(`og:url: ${ogUrl !== 'MISSING' ? 'PRESENT' : 'MISSING'}`);
  console.log(`twitter:card: ${twitterCard}`);
  console.log(`JSON-LD count: ${ldCount} (expected 9)`);
  console.log(`JSON-LD types: ${ldTypes.join(', ')}`);
  if (parseErrors.length > 0) {
    console.log(`JSON-LD parse errors at blocks: ${parseErrors.join(', ')}`);
  }

  expect(title, 'title tag should be present').not.toBe('MISSING');
  expect(desc, 'meta description should be present').not.toBe('MISSING');
  expect(ogTitle, 'og:title should be present').not.toBe('MISSING');
  expect(twitterCard, 'twitter:card should be summary_large_image').toBe('summary_large_image');
  expect(parseErrors.length, 'JSON-LD blocks should all parse as valid JSON').toBe(0);
});

// ========== CHECK 11: BG ALTERNATION ==========
test('11-bg-alternation', async ({ page }) => {
  await page.goto(PRIMARY_URL, { waitUntil: 'networkidle' });
  await fullScroll(page);

  const sections = await page.evaluate(() => {
    // Try various selectors to find main content sections
    const selectors = [
      'main section',
      'main > div > section',
      'main > section',
      '[data-section]',
      'article section',
    ];

    let sectionEls: NodeListOf<Element> | null = null;
    for (const sel of selectors) {
      const els = document.querySelectorAll(sel);
      if (els.length > 2) {
        sectionEls = els;
        break;
      }
    }

    if (!sectionEls || sectionEls.length === 0) {
      // Fallback: any direct children of main
      sectionEls = document.querySelectorAll('main > *');
    }

    return Array.from(sectionEls).slice(0, 20).map((el, i) => ({
      index: i,
      tag: el.tagName,
      id: el.id || '',
      className: el.className.slice(0, 80),
      bg: getComputedStyle(el).backgroundColor,
      dataSection: el.getAttribute('data-section') || '',
    }));
  });

  console.log(`Found ${sections.length} sections:`);
  sections.forEach(s => {
    console.log(`  [${s.index}] ${s.tag}#${s.id || s.dataSection} | bg: ${s.bg} | class: ...${s.className.slice(-40)}`);
  });

  // Detect adjacent same-bg
  let adjacentSame = 0;
  const transparent = ['rgba(0, 0, 0, 0)', 'transparent', ''];

  for (let i = 1; i < sections.length; i++) {
    const prevBg = sections[i-1].bg;
    const currBg = sections[i].bg;
    if (!transparent.includes(prevBg) && !transparent.includes(currBg) && prevBg === currBg) {
      console.log(`  ⚠️ ADJACENT SAME BG [${i-1}] and [${i}]: ${currBg}`);
      adjacentSame++;
    }
  }

  if (adjacentSame === 0) {
    console.log('  No adjacent same-bg violations found');
  }
});

// ========== CHECK 3: REDUCED MOTION ==========
test('03-reduced-motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(PRIMARY_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const motionData = await page.evaluate(() => {
    // Check animations still running
    const all = document.querySelectorAll('*');
    let runningAnimations = 0;
    const runningEls: string[] = [];

    all.forEach((el: Element) => {
      const style = getComputedStyle(el);
      const dur = style.animationDuration;
      const transDur = style.transitionDuration;

      if (dur && dur !== '0s' && dur !== '0ms') {
        runningAnimations++;
        if (runningEls.length < 5) {
          runningEls.push(`${el.tagName}.${el.className.slice(0, 30)}: anim=${dur}`);
        }
      }
    });

    // Check if CSS reduced motion media query is respected
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Count Framer Motion elements
    const framerEls = document.querySelectorAll('[style*="transform"], [style*="will-change"]');

    return {
      prefersReducedMotion,
      runningAnimations,
      runningEls,
      framerElCount: framerEls.length,
    };
  });

  console.log(`prefers-reduced-motion active: ${motionData.prefersReducedMotion}`);
  console.log(`CSS animations still running: ${motionData.runningAnimations}`);
  console.log(`Framer transform elements: ${motionData.framerElCount}`);

  if (motionData.runningEls.length > 0) {
    console.log('  Running animations:');
    motionData.runningEls.forEach(e => console.log(`    ${e}`));
  }

  expect(motionData.prefersReducedMotion, 'prefers-reduced-motion should be active').toBe(true);
});

// ========== SECONDARY URL CRASH CHECK ==========
test('secondary-url-no-crash', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', err => errors.push(err.message));

  const response = await page.goto(SECONDARY_URL, { waitUntil: 'networkidle' });

  console.log(`Secondary URL status: ${response?.status()}`);
  expect(response?.status()).toBe(200);

  if (errors.length > 0) {
    console.log('Page errors on secondary:');
    errors.forEach(e => console.log(`  ${e}`));
  }

  expect(errors.length, `No JS page errors: ${errors.join('; ')}`).toBe(0);
});
