/**
 * aura-qa: reports-pdp-v2 full QA pass
 * Run: npx ts-node qa-run.ts (or npx playwright test qa-run.ts)
 */
import { chromium, Page, Browser } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as path from 'path';
import * as fs from 'fs';

const BASE_URL = 'http://localhost:3002';
const PRIMARY_URL = `${BASE_URL}/reports/australia-cold-chain-market-2022-2027`;
const SECONDARY_URL = `${BASE_URL}/reports/gcc-pharmaceutical-market-outlook-2026`;
const SCREENSHOT_DIR = path.join(__dirname, 'qa-screenshots/v2a-final');

async function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}

async function fullScroll(page: Page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(500);
}

async function runAxe(page: Page, label: string) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();

  const critical = results.violations.filter(v => v.impact === 'critical');
  const serious = results.violations.filter(v => v.impact === 'serious');
  const moderate = results.violations.filter(v => v.impact === 'moderate');
  const minor = results.violations.filter(v => v.impact === 'minor');

  console.log(`\n=== AXE RESULTS [${label}] ===`);
  console.log(`Critical: ${critical.length} | Serious: ${serious.length} | Moderate: ${moderate.length} | Minor: ${minor.length}`);

  [...critical, ...serious].forEach(v => {
    console.log(`  [${v.impact?.toUpperCase()}] ${v.id}: ${v.description}`);
    v.nodes.slice(0, 2).forEach(n => {
      console.log(`    → ${n.target[0]} | ${n.failureSummary?.split('\n')[0]}`);
    });
  });

  return { critical, serious, moderate, minor, all: results.violations };
}

async function checkComputedFontSizes(page: Page) {
  console.log('\n=== COMPUTED FONT SIZES ===');

  const sizes = await page.evaluate(() => {
    const results: Record<string, string> = {};

    // Hero h1
    const h1 = document.querySelector('h1');
    if (h1) results['h1 (Hero)'] = getComputedStyle(h1).fontSize;

    // Big stats numbers
    const bigNum = document.querySelector('[data-testid="key-stat-value"], .text-5xl, .text-6xl, .text-7xl');
    if (bigNum) results['KeyStats number'] = getComputedStyle(bigNum).fontSize;

    // Body text
    const para = document.querySelector('p');
    if (para) results['body paragraph'] = getComputedStyle(para).fontSize;

    // Section headings
    const h2 = document.querySelector('h2');
    if (h2) results['h2'] = getComputedStyle(h2).fontSize;

    const h3 = document.querySelector('h3');
    if (h3) results['h3'] = getComputedStyle(h3).fontSize;

    // Nav links
    const navLink = document.querySelector('nav a, nav button');
    if (navLink) results['nav link'] = getComputedStyle(navLink).fontSize;

    // CTA button
    const btn = document.querySelector('button[class*="btn"], button[class*="cta"], a[class*="btn"]');
    if (btn) results['CTA button'] = getComputedStyle(btn).fontSize;

    return results;
  });

  Object.entries(sizes).forEach(([el, size]) => {
    const px = parseFloat(size);
    const flag = el === 'body paragraph' && px < 16 ? ' ⚠️ BELOW 16px' :
                 el.includes('h1') && px < 32 ? ' ⚠️ BELOW 32px' : '';
    console.log(`  ${el}: ${size}${flag}`);
  });

  return sizes;
}

async function checkBgAlternation(page: Page) {
  console.log('\n=== BG ALTERNATION ===');

  const sections = await page.evaluate(() => {
    const sectionEls = document.querySelectorAll('section, [data-section], main > div > div[class*="section"], main > div > section');
    const results: Array<{tag: string, class: string, bg: string, id: string}> = [];

    sectionEls.forEach((el: Element) => {
      const style = getComputedStyle(el);
      results.push({
        tag: el.tagName,
        class: el.className.slice(0, 60),
        bg: style.backgroundColor,
        id: el.id || ''
      });
    });
    return results.slice(0, 20);
  });

  sections.forEach((s, i) => {
    console.log(`  [${i}] ${s.tag} id="${s.id}" | bg: ${s.bg} | class: ${s.class}`);
  });

  // Check for adjacent same-bg
  let adjacentSameCount = 0;
  for (let i = 1; i < sections.length; i++) {
    if (sections[i].bg === sections[i-1].bg && sections[i].bg !== 'rgba(0, 0, 0, 0)') {
      console.log(`  ⚠️ ADJACENT SAME BG at [${i-1}] and [${i}]: ${sections[i].bg}`);
      adjacentSameCount++;
    }
  }
  if (adjacentSameCount === 0) console.log('  No adjacent same-bg pairs detected');

  return { sections, adjacentSameCount };
}

async function checkReducedMotion(page: Page) {
  console.log('\n=== REDUCED MOTION ===');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload({ waitUntil: 'networkidle' });
  await sleep(1000);

  const motionResults = await page.evaluate(() => {
    const results: Record<string, string> = {};

    // Check animations on key elements
    const counters = document.querySelectorAll('[data-testid="key-stat-value"], [class*="counter"], [class*="count-up"]');
    results['counter elements found'] = counters.length.toString();

    // Check CSS animation computed style on animated elements
    const animated = document.querySelectorAll('[class*="animate-"], [class*="motion-"], [class*="transition-"]');
    results['animated class elements'] = animated.length.toString();

    // Check if any animations are still running (animation-duration not 0s)
    let runningAnimations = 0;
    animated.forEach(el => {
      const style = getComputedStyle(el);
      if (style.animationDuration !== '0s' && style.animationDuration !== '0ms') {
        runningAnimations++;
      }
    });
    results['running animations (should be 0)'] = runningAnimations.toString();

    // Check for framer motion elements
    const framerEls = document.querySelectorAll('[style*="transform"], [style*="opacity"]');
    results['framer transform elements'] = framerEls.length.toString();

    return results;
  });

  Object.entries(motionResults).forEach(([k, v]) => console.log(`  ${k}: ${v}`));

  // Restore normal motion
  await page.emulateMedia({ reducedMotion: 'no-preference' });

  return motionResults;
}

async function checkAnalyticsEvents(page: Page) {
  console.log('\n=== ANALYTICS / DATALAYER ===');

  // Inject listener before page load
  await page.addInitScript(() => {
    (window as any)._qa_dl_events = [];
    const orig = Object.getOwnPropertyDescriptor(window, 'dataLayer');
    Object.defineProperty(window, 'dataLayer', {
      get() { return this._qa_dl_raw || []; },
      set(val) { this._qa_dl_raw = val; }
    });
  });

  await page.reload({ waitUntil: 'networkidle' });
  await sleep(2000);

  const dlEvents = await page.evaluate(() => {
    const dl = (window as any).dataLayer || [];
    return dl.slice(0, 30);
  });

  console.log(`  dataLayer entries: ${dlEvents.length}`);
  const eventNames = dlEvents.map((e: any) => e.event || e.type || 'unnamed');
  eventNames.forEach((n: string) => console.log(`  - ${n}`));

  const hasProductView = eventNames.some((n: string) => n?.includes('product_page_view') || n?.includes('page_view'));
  console.log(`  product_page_view: ${hasProductView ? 'FOUND' : 'NOT FOUND'}`);

  return { dlEvents, hasProductView, eventNames };
}

async function checkSEO(page: Page) {
  console.log('\n=== SEO + JSON-LD ===');

  // Get raw HTML to check server-rendered meta
  const html = await page.content();

  const title = html.match(/<title[^>]*>([^<]+)<\/title>/)?.[1] ?? 'MISSING';
  const desc = html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/)?.[1] ?? 'MISSING';
  const ogTitle = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/)?.[1] ?? 'MISSING';
  const ogDesc = html.match(/<meta[^>]*property="og:description"[^>]*content="([^"]+)"/)?.[1] ?? 'MISSING';
  const ogUrl = html.match(/<meta[^>]*property="og:url"[^>]*content="([^"]+)"/)?.[1] ?? 'MISSING';
  const twitterCard = html.match(/<meta[^>]*name="twitter:card"[^>]*content="([^"]+)"/)?.[1] ?? 'MISSING';

  // Count JSON-LD blocks
  const ldBlocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  const ldCount = ldBlocks.length;
  const ldTypes: string[] = [];
  ldBlocks.forEach((block, i) => {
    try {
      const parsed = JSON.parse(block[1]);
      ldTypes.push(parsed['@type'] || 'unknown');
    } catch(e) {
      ldTypes.push(`PARSE_ERROR at block ${i}`);
    }
  });

  console.log(`  title: ${title.slice(0, 80)}`);
  console.log(`  description: ${desc ? desc.slice(0, 80) + '...' : 'MISSING'}`);
  console.log(`  og:title: ${ogTitle ? 'PRESENT' : 'MISSING'}`);
  console.log(`  og:description: ${ogDesc ? 'PRESENT' : 'MISSING'}`);
  console.log(`  og:url: ${ogUrl ? 'PRESENT' : 'MISSING'}`);
  console.log(`  twitter:card: ${twitterCard}`);
  console.log(`  JSON-LD blocks: ${ldCount} (expected 9)`);
  ldTypes.forEach((t, i) => console.log(`    [${i}] ${t}`));

  return { title, desc, ogTitle, ogDesc, ogUrl, twitterCard, ldCount, ldTypes };
}

async function checkFocusVisibility(page: Page) {
  console.log('\n=== FOCUS VISIBILITY (spot check) ===');

  // Tab through first 15 focusable elements
  const results: Array<{element: string, hasFocusRing: boolean, outline: string}> = [];

  await page.keyboard.press('Tab');

  for (let i = 0; i < 15; i++) {
    const focusInfo = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      if (!el || el === document.body) return null;
      const style = getComputedStyle(el);
      const pseudoStyle = getComputedStyle(el, ':focus-visible');
      return {
        tag: el.tagName,
        role: el.getAttribute('role') || '',
        ariaLabel: el.getAttribute('aria-label') || el.textContent?.slice(0, 30) || '',
        outline: style.outline,
        outlineWidth: style.outlineWidth,
        boxShadow: style.boxShadow,
        outlineColor: style.outlineColor,
      };
    });

    if (focusInfo) {
      const hasVisibleFocus =
        (focusInfo.outlineWidth !== '0px' && focusInfo.outline !== 'none' && focusInfo.outlineColor !== 'rgba(0, 0, 0, 0)') ||
        (focusInfo.boxShadow !== 'none' && focusInfo.boxShadow !== '');

      results.push({
        element: `${focusInfo.tag}[${focusInfo.role}] "${focusInfo.ariaLabel}"`,
        hasFocusRing: hasVisibleFocus,
        outline: focusInfo.outline
      });

      const status = hasVisibleFocus ? 'OK' : 'NO FOCUS RING';
      console.log(`  [${i}] ${status} - ${focusInfo.tag}[${focusInfo.role}] "${focusInfo.ariaLabel.slice(0, 30)}"`);
    }

    await page.keyboard.press('Tab');
  }

  const missing = results.filter(r => !r.hasFocusRing);
  console.log(`  Missing focus rings: ${missing.length} / ${results.length} checked`);

  return { results, missing };
}

async function checkChartRendering(page: Page) {
  console.log('\n=== CHART RENDERING ===');

  const chartInfo = await page.evaluate(() => {
    // Highcharts
    const hcContainers = document.querySelectorAll('.highcharts-root, [class*="highcharts"]');
    const hcSVGs = document.querySelectorAll('.highcharts-root svg, svg.highcharts-root');

    // Recharts / SVG charts
    const rechartsEls = document.querySelectorAll('.recharts-wrapper, .recharts-surface');

    // Any SVG visible
    const svgs = document.querySelectorAll('svg');

    // Chart containers with -1 dimensions (the known bug)
    const badDims: string[] = [];
    svgs.forEach(svg => {
      const rect = svg.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        badDims.push(`SVG ${svg.className} w=${rect.width} h=${rect.height}`);
      }
    });

    // Canvas elements (Highcharts boost mode)
    const canvases = document.querySelectorAll('canvas');

    return {
      hcContainerCount: hcContainers.length,
      hcSVGCount: hcSVGs.length,
      rechartsCount: rechartsEls.length,
      svgCount: svgs.length,
      canvasCount: canvases.length,
      badDimensions: badDims,
    };
  });

  console.log(`  Highcharts containers: ${chartInfo.hcContainerCount}`);
  console.log(`  Highcharts SVGs: ${chartInfo.hcSVGCount}`);
  console.log(`  Recharts wrappers: ${chartInfo.rechartsCount}`);
  console.log(`  Total SVGs: ${chartInfo.svgCount}`);
  console.log(`  Canvas elements: ${chartInfo.canvasCount}`);

  if (chartInfo.badDimensions.length > 0) {
    console.log(`  BAD DIMENSIONS (known bug):`);
    chartInfo.badDimensions.forEach(b => console.log(`    ${b}`));
  } else {
    console.log(`  No -1/-1 dimension bug found`);
  }

  // Check console for Highcharts errors
  return chartInfo;
}

async function captureScreenshots(page: Page, prefix: string) {
  const viewports = [
    { name: 'mobile-375', width: 375, height: 812 },
    { name: 'desktop-1440', width: 1440, height: 900 },
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.reload({ waitUntil: 'networkidle' });
    await fullScroll(page);

    const screenshotPath = path.join(SCREENSHOT_DIR, `${prefix}-${vp.name}.png`);
    await page.screenshot({ fullPage: true, path: screenshotPath });
    console.log(`  Saved: ${screenshotPath}`);
  }
}

async function checkH1Count(page: Page) {
  const count = await page.evaluate(() => document.querySelectorAll('h1').length);
  console.log(`\n=== H1 COUNT: ${count} (expected: 1) ===`);
  if (count > 1) {
    const h1s = await page.evaluate(() =>
      Array.from(document.querySelectorAll('h1')).map(h => h.textContent?.slice(0, 60))
    );
    h1s.forEach(t => console.log(`  h1: "${t}"`));
  }
  return count;
}

async function checkTabPattern(page: Page) {
  console.log('\n=== TAB KEYBOARD PATTERN ===');

  const tabInfo = await page.evaluate(() => {
    const tabs = document.querySelectorAll('[role="tab"]');
    const results: Array<{text: string, ariaSelected: string, tabIndex: string, ariaControls: string}> = [];

    tabs.forEach(tab => {
      results.push({
        text: tab.textContent?.slice(0, 30) || '',
        ariaSelected: tab.getAttribute('aria-selected') || 'missing',
        tabIndex: (tab as HTMLElement).tabIndex?.toString() || 'missing',
        ariaControls: tab.getAttribute('aria-controls') || 'missing',
      });
    });

    return results;
  });

  if (tabInfo.length === 0) {
    console.log('  No role="tab" elements found — Hero Cockpit tabs may use different pattern');

    // Check for button tabs without role
    const btnTabs = await page.evaluate(() => {
      const btns = document.querySelectorAll('[data-tab], [data-panel], button[aria-selected]');
      return btns.length;
    });
    console.log(`  Buttons with aria-selected or data-tab: ${btnTabs}`);
  } else {
    console.log(`  Found ${tabInfo.length} tabs:`);
    tabInfo.forEach((t, i) => {
      const issues = [];
      if (t.ariaSelected === 'missing') issues.push('NO aria-selected');
      if (t.ariaControls === 'missing') issues.push('NO aria-controls');
      const status = issues.length > 0 ? `ISSUES: ${issues.join(', ')}` : 'OK';
      console.log(`  [${i}] "${t.text}" | selected=${t.ariaSelected} | tabIndex=${t.tabIndex} | controls=${t.ariaControls} | ${status}`);
    });
  }

  return tabInfo;
}

async function checkFormA11y(page: Page) {
  console.log('\n=== FORM A11Y (static scan — modals) ===');

  // Check forms visible on page
  const formInfo = await page.evaluate(() => {
    const forms = document.querySelectorAll('form');
    const results: Array<{inputs: number, labelled: number, required: number, ariaRequired: number}> = [];

    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, select, textarea');
      let labelled = 0;
      let required = 0;
      let ariaRequired = 0;

      inputs.forEach(inp => {
        const id = inp.getAttribute('id');
        if (id && form.querySelector(`label[for="${id}"]`)) labelled++;
        if (inp.getAttribute('required') !== null) required++;
        if (inp.getAttribute('aria-required') === 'true') ariaRequired++;
      });

      results.push({ inputs: inputs.length, labelled, required, ariaRequired });
    });

    return results;
  });

  if (formInfo.length === 0) {
    console.log('  No forms visible on page (forms likely in modals — scan limited to static DOM)');
  } else {
    formInfo.forEach((f, i) => {
      const missing = f.inputs - f.labelled;
      const status = missing > 0 ? `⚠️ ${missing} UNLABELLED inputs` : 'OK';
      console.log(`  form[${i}]: ${f.inputs} inputs | ${f.labelled} labelled | ${f.required} required | ${f.ariaRequired} aria-required | ${status}`);
    });
  }

  // Check LeadFormModalProvider in DOM
  const modalPresent = await page.evaluate(() => {
    return !!document.querySelector('[role="dialog"], [aria-modal="true"]');
  });
  console.log(`  Modal (dialog role) in DOM: ${modalPresent}`);

  return formInfo;
}

async function main() {
  console.log('=== aura-qa: reports-pdp-v2 FULL QA PASS ===\n');
  console.log(`Primary URL: ${PRIMARY_URL}`);
  console.log(`Secondary URL: ${SECONDARY_URL}`);

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });

  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });

    // Capture console errors
    const consoleErrors: string[] = [];

    const page = await context.newPage();
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', err => consoleErrors.push(`PAGE ERROR: ${err.message}`));

    // === PRIMARY URL ===
    console.log('\n--- Loading primary URL ---');
    await page.goto(PRIMARY_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(2000);

    // Trigger scroll to fully render
    await fullScroll(page);

    // CHECK 1: H1 count
    const h1Count = await checkH1Count(page);

    // CHECK 1: AXE a11y
    const axeResults = await runAxe(page, 'primary-desktop-1440');

    // CHECK 4: Visible focus rings
    const focusResults = await checkFocusVisibility(page);

    // CHECK 5: Computed font sizes
    const fontSizes = await checkComputedFontSizes(page);

    // CHECK: Tab keyboard pattern
    const tabPattern = await checkTabPattern(page);

    // CHECK 6: Forms a11y
    const formResults = await checkFormA11y(page);

    // CHECK 9: Chart rendering
    const chartResults = await checkChartRendering(page);

    // CHECK 10: SEO + JSON-LD
    const seoResults = await checkSEO(page);

    // CHECK 11: BG alternation
    const bgResults = await checkBgAlternation(page);

    // CHECK 7: Analytics
    const analyticsResults = await checkAnalyticsEvents(page);

    // CHECK 3: Reduced motion
    await page.goto(PRIMARY_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(1000);
    const motionResults = await checkReducedMotion(page);

    // CHECK 8: Screenshots
    console.log('\n=== SCREENSHOTS ===');
    await page.goto(PRIMARY_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(1000);
    await captureScreenshots(page, 'primary-australia-cold-chain');

    // === SECONDARY URL ===
    console.log('\n--- Loading secondary URL (crash check) ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(SECONDARY_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(2000);
    await captureScreenshots(page, 'secondary-gcc-pharma');

    // Mobile axe pass
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(PRIMARY_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(2000);
    const axeMobile = await runAxe(page, 'primary-mobile-375');

    // Console errors summary
    console.log('\n=== CONSOLE ERRORS ===');
    if (consoleErrors.length === 0) {
      console.log('  None');
    } else {
      consoleErrors.slice(0, 10).forEach(e => console.log(`  ERROR: ${e}`));
    }

    // === SUMMARY ===
    console.log('\n\n===========================================');
    console.log('SUMMARY');
    console.log('===========================================');
    console.log(`H1 count: ${h1Count} ${h1Count === 1 ? '✓' : '✗ MULTIPLE H1'}`);
    console.log(`Axe desktop - Critical: ${axeResults.critical.length} | Serious: ${axeResults.serious.length} | Moderate: ${axeResults.moderate.length} | Minor: ${axeResults.minor.length}`);
    console.log(`Axe mobile  - Critical: ${axeMobile.critical.length} | Serious: ${axeMobile.serious.length}`);
    console.log(`Focus rings - Missing: ${focusResults.missing.length} / ${focusResults.results.length}`);
    console.log(`JSON-LD blocks: ${seoResults.ldCount} / 9 expected`);
    console.log(`JSON-LD types: ${seoResults.ldTypes.join(', ')}`);
    console.log(`Title: ${seoResults.title ? 'PRESENT' : 'MISSING'}`);
    console.log(`twitter:card: ${seoResults.twitterCard}`);
    console.log(`Adjacent same-bg sections: ${bgResults.adjacentSameCount}`);
    console.log(`Chart containers: ${chartResults.hcContainerCount} HC | ${chartResults.rechartsCount} Recharts`);
    console.log(`Chart bad dims: ${chartResults.badDimensions.length}`);
    console.log(`Analytics dataLayer entries: ${analyticsResults.dlEvents.length}`);
    console.log(`product_page_view fired: ${analyticsResults.hasProductView}`);
    console.log(`Console errors: ${consoleErrors.length}`);

  } finally {
    await browser.close();
  }
}

main().catch(console.error);
