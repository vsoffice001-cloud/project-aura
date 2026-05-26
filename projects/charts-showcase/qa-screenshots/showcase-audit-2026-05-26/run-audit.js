/**
 * charts-showcase · UI/UX Audit Script · 2026-05-26
 * Captures screenshots + DOM probe for all surface areas.
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3070';
const OUT_DIR = path.resolve(__dirname);

async function run() {
  const browser = await chromium.launch({ headless: true });
  const consoleMessages = [];

  // ─── 1440 full page ───────────────────────────────────────────────────────
  const ctx1440 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx1440.newPage();

  page.on('console', msg => consoleMessages.push({ type: msg.type(), text: msg.text() }));
  page.on('pageerror', err => consoleMessages.push({ type: 'pageerror', text: err.message }));

  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Full page 1440
  await page.screenshot({ path: path.join(OUT_DIR, 'full-1440.png'), fullPage: true });

  // Top bar close-up
  const topBar = await page.$('header');
  if (topBar) await topBar.screenshot({ path: path.join(OUT_DIR, 'top-bar.png') });

  // Sidebar close-up
  const sidebar = await page.$('#showcase-sidebar-desktop, [id*="sidebar"], aside nav, nav[aria-label*="demo"]');
  if (sidebar) await sidebar.screenshot({ path: path.join(OUT_DIR, 'sidebar-categories.png') });
  else {
    // fallback — grab left panel
    const leftPanel = await page.$('aside:first-of-type, [class*="sidebar"]');
    if (leftPanel) await leftPanel.screenshot({ path: path.join(OUT_DIR, 'sidebar-categories.png') });
  }

  // Right panel
  const rightPanel = await page.$('aside[aria-label], [class*="right-panel"], [class*="RightPanel"], [class*="inspector"]');
  if (rightPanel) await rightPanel.screenshot({ path: path.join(OUT_DIR, 'right-panel-active.png') });

  // Variant toggle row
  const variantRow = await page.$('[class*="variant"], [class*="VariantToggle"], [aria-label*="variant"]');
  if (variantRow) await variantRow.screenshot({ path: path.join(OUT_DIR, 'variant-toggle-row.png') });

  // Surface toggle
  const surfaceToggle = await page.$('[aria-label*="surface"], [aria-label*="Surface"], [class*="surface"]');
  if (surfaceToggle) await surfaceToggle.screenshot({ path: path.join(OUT_DIR, 'surface-toggle.png') });

  // ─── DOM probe ────────────────────────────────────────────────────────────
  const domProbe = await page.evaluate(() => {
    const result = {
      viewport: { w: innerWidth, h: innerHeight, scrollH: document.body.scrollHeight },
      bodyBG: getComputedStyle(document.body).backgroundColor,
      htmlBG: getComputedStyle(document.documentElement).backgroundColor,
      topBar: null,
      sidebar: null,
      rightPanel: null,
      contentPane: null,
      demoCards: [],
      spacing: { categoryGaps: [], cardGaps: [] },
      fontStack: { display: '', body: '' },
      issues: [],
      allButtons: [],
      allLinks: [],
      ariaLabels: [],
      focusableCount: 0,
    };

    // Top bar
    const topBarEl = document.querySelector('header');
    if (topBarEl) {
      result.topBar = {
        bbox: topBarEl.getBoundingClientRect(),
        bg: getComputedStyle(topBarEl).backgroundColor,
        backdropFilter: getComputedStyle(topBarEl).backdropFilter,
        borderBottom: getComputedStyle(topBarEl).borderBottom,
        position: getComputedStyle(topBarEl).position,
        buttonCount: topBarEl.querySelectorAll('button, a').length,
        inputCount: topBarEl.querySelectorAll('input').length,
        buttons: Array.from(topBarEl.querySelectorAll('button')).map(b => ({
          text: b.textContent?.trim().slice(0, 30),
          ariaLabel: b.getAttribute('aria-label'),
          hasIcon: b.querySelector('svg') !== null,
          rect: { w: b.getBoundingClientRect().width, h: b.getBoundingClientRect().height },
        })),
      };
    }

    // Sidebar
    const sidebarEl = document.querySelector('#showcase-sidebar-desktop') ||
      document.querySelector('aside nav') ||
      document.querySelector('[class*="sidebar"]');
    if (sidebarEl) {
      result.sidebar = {
        bbox: sidebarEl.getBoundingClientRect(),
        bg: getComputedStyle(sidebarEl).backgroundColor,
        width: getComputedStyle(sidebarEl).width,
        position: getComputedStyle(sidebarEl).position,
        borderRight: getComputedStyle(sidebarEl).borderRight,
        linkCount: sidebarEl.querySelectorAll('a, button').length,
        activeLink: sidebarEl.querySelector('[aria-current]')?.textContent?.trim() || 'none',
        allCategories: Array.from(sidebarEl.querySelectorAll('h2, h3, [class*="category"], [class*="Category"]')).map(el => el.textContent?.trim().slice(0, 40)),
        allLinks: Array.from(sidebarEl.querySelectorAll('a, button')).map(el => ({
          text: el.textContent?.trim().slice(0, 40),
          ariaLabel: el.getAttribute('aria-label'),
          ariaCurrent: el.getAttribute('aria-current'),
          rect: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
        })),
      };
    }

    // Right panel
    const rpEl = document.querySelector('aside[aria-label]') ||
      document.querySelector('[class*="RightPanel"]') ||
      document.querySelector('[class*="right-panel"]');
    if (rpEl) {
      result.rightPanel = {
        bbox: rpEl.getBoundingClientRect(),
        bg: getComputedStyle(rpEl).backgroundColor,
        width: getComputedStyle(rpEl).width,
        position: getComputedStyle(rpEl).position,
        sections: rpEl.querySelectorAll('h3, [role="heading"]').length,
        tabCount: rpEl.querySelectorAll('[role="tab"]').length,
        tabLabels: Array.from(rpEl.querySelectorAll('[role="tab"]')).map(t => t.textContent?.trim()),
      };
    }

    // Main content pane
    const mainEl = document.querySelector('main');
    if (mainEl) {
      result.contentPane = {
        bbox: mainEl.getBoundingClientRect(),
        width: getComputedStyle(mainEl).width,
        padding: getComputedStyle(mainEl).padding,
        maxWidth: getComputedStyle(mainEl).maxWidth,
        overflowY: getComputedStyle(mainEl).overflowY,
      };
    }

    // Demo cards — try multiple selectors
    const cards = document.querySelectorAll('article, section[id], [class*="DemoCanvas"], [class*="demo-canvas"]');
    Array.from(cards).slice(0, 26).forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      result.demoCards.push({
        idx: i,
        id: card.id || 'no-id',
        tag: card.tagName,
        h1: card.querySelector('h1')?.textContent?.trim().slice(0, 40),
        h2: card.querySelector('h2')?.textContent?.trim().slice(0, 40),
        h3: card.querySelector('h3')?.textContent?.trim().slice(0, 40),
        bbox: { x: rect.x, y: rect.y, h: rect.height, w: rect.width },
        bg: getComputedStyle(card).backgroundColor,
        borderRadius: getComputedStyle(card).borderRadius,
        border: getComputedStyle(card).border,
        padding: getComputedStyle(card).padding,
        marginBottom: getComputedStyle(card).marginBottom,
      });
    });

    // Font stack
    result.fontStack.display = getComputedStyle(document.body).getPropertyValue('--font-display').trim();
    result.fontStack.body = getComputedStyle(document.body).getPropertyValue('--font-body').trim();
    result.fontStack.actualBodyFont = getComputedStyle(document.body).fontFamily;

    // All buttons — check touch target size
    document.querySelectorAll('button, [role="button"]').forEach(b => {
      const rect = b.getBoundingClientRect();
      const tooSmall = rect.width > 0 && (rect.width < 44 || rect.height < 44);
      result.allButtons.push({
        text: b.textContent?.trim().slice(0, 30),
        ariaLabel: b.getAttribute('aria-label'),
        rect: { w: Math.round(rect.width), h: Math.round(rect.height) },
        tooSmall,
      });
    });

    // Check for missing aria-labels on icon buttons
    document.querySelectorAll('button').forEach(b => {
      const hasText = b.textContent?.trim().length > 0;
      const hasLabel = b.getAttribute('aria-label') || b.getAttribute('aria-labelledby');
      const hasOnlyIcon = b.querySelector('svg') && !hasText;
      if (hasOnlyIcon && !hasLabel) {
        result.issues.push(`button w/ only icon, no aria-label: "${b.outerHTML.slice(0, 100)}"`);
      }
    });

    // Heading hierarchy
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).slice(0, 30);
    result.headingHierarchy = headings.map(h => ({
      level: h.tagName,
      text: h.textContent?.trim().slice(0, 50),
      fontSize: getComputedStyle(h).fontSize,
      fontWeight: getComputedStyle(h).fontWeight,
      color: getComputedStyle(h).color,
    }));

    // Check color contrast (rough — compare text color vs bg)
    result.colorSamples = [];
    ['h1', 'h2', 'h3', 'p', 'label', 'span'].forEach(sel => {
      const el = document.querySelector(sel);
      if (el) {
        result.colorSamples.push({
          sel,
          color: getComputedStyle(el).color,
          bg: getComputedStyle(el).backgroundColor,
          fontSize: getComputedStyle(el).fontSize,
        });
      }
    });

    // Focusable elements count
    result.focusableCount = document.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ).length;

    // CSS custom properties sampling
    const root = document.documentElement;
    const cs = getComputedStyle(root);
    result.cssVars = {
      bgDeep: cs.getPropertyValue('--color-bg-deep').trim(),
      bgSurface: cs.getPropertyValue('--color-bg-surface').trim(),
      bgCard: cs.getPropertyValue('--color-bg-card').trim(),
      inkStrong: cs.getPropertyValue('--color-ink-strong').trim(),
      inkSubtle: cs.getPropertyValue('--color-ink-subtle').trim(),
      brandRed: cs.getPropertyValue('--color-brand-red').trim() || cs.getPropertyValue('--ken-red').trim(),
      periwinkle: cs.getPropertyValue('--color-chart-primary').trim() || cs.getPropertyValue('--ken-chart-primary').trim(),
    };

    // Check images — missing alt text
    result.imagesWithoutAlt = Array.from(document.querySelectorAll('img')).filter(img => !img.alt).map(img => img.src.slice(0, 80));

    // Overflow check
    result.overflowIssues = [];
    document.querySelectorAll('*').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width > window.innerWidth + 5 && rect.width < 5000) {
        result.overflowIssues.push({ tag: el.tagName, class: el.className?.slice?.(0, 60), w: rect.width });
      }
    });
    // cap overflow list
    result.overflowIssues = result.overflowIssues.slice(0, 10);

    return result;
  });

  fs.writeFileSync(path.join(OUT_DIR, 'showcase-dom-probe.json'), JSON.stringify(domProbe, null, 2));

  // ─── Screenshot all demo cards by clicking sidebar links ──────────────────
  // Get all sidebar navigation links
  const sidebarLinks = await page.$$('aside button, aside a, nav button, nav a');
  console.log(`Found ${sidebarLinks.length} sidebar/nav elements`);

  // Try to get the actual demo list from the page's nav
  const demoNavItems = await page.evaluate(() => {
    const items = [];
    // Try sidebar buttons/links
    document.querySelectorAll('[class*="sidebar"] button, [class*="sidebar"] a, aside button, aside a').forEach((el, i) => {
      if (i < 30) items.push({ text: el.textContent?.trim().slice(0, 40), idx: i });
    });
    return items;
  });
  console.log('Demo nav items:', JSON.stringify(demoNavItems.slice(0, 25)));

  // Scroll through all demo sections and screenshot them
  const demoSections = await page.evaluate(() => {
    const sections = document.querySelectorAll('section[id], article[id]');
    return Array.from(sections).map(s => ({ id: s.id, tag: s.tagName })).slice(0, 30);
  });
  console.log('Demo sections:', JSON.stringify(demoSections));

  // ─── Take screenshots of distinct areas ──────────────────────────────────
  // Props table
  const propsTab = await page.$('[role="tab"]:has-text("Props"), button:has-text("Props"), [data-tab="props"]');
  if (propsTab) {
    await propsTab.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(OUT_DIR, 'props-table-detail.png') });
  }

  // Code tab
  const codeTab = await page.$('[role="tab"]:has-text("Code"), button:has-text("Code")');
  if (codeTab) {
    await codeTab.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(OUT_DIR, 'code-snippet-detail.png') });
  }

  // Tokens tab
  const tokensTab = await page.$('[role="tab"]:has-text("Token"), button:has-text("Token")');
  if (tokensTab) {
    await tokensTab.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(OUT_DIR, 'token-panel-detail.png') });
  }

  // State demos strip
  const stateSection = await page.$('[id*="state"], [id*="loading"], [id*="error"]');
  if (stateSection) await stateSection.screenshot({ path: path.join(OUT_DIR, 'state-demos-strip.png') });

  // ─── Now capture individual demos by clicking sidebar ─────────────────────
  // Get clickable demo buttons/links
  const clickableNavItems = await page.evaluate(() => {
    const items = [];
    const selectors = [
      'aside button', 'aside a[href]', 'aside [role="button"]',
      'nav button', 'nav a[href]'
    ];
    const seen = new Set();
    for (const sel of selectors) {
      document.querySelectorAll(sel).forEach(el => {
        const text = el.textContent?.trim();
        if (text && !seen.has(text) && text.length > 2 && text.length < 60) {
          seen.add(text);
          items.push({
            text,
            sel,
            dataId: el.getAttribute('data-id') || el.getAttribute('data-demo') || el.getAttribute('href') || '',
          });
        }
      });
    }
    return items.slice(0, 30);
  });
  console.log('Clickable nav:', JSON.stringify(clickableNavItems));

  // Click each nav item and screenshot
  let demoIdx = 0;
  for (const item of clickableNavItems.slice(0, 25)) {
    try {
      // Find and click
      const el = await page.$(`aside button:has-text("${item.text.replace(/"/g, '\\"')}"), aside a:has-text("${item.text.replace(/"/g, '\\"')}")`);
      if (el) {
        await el.click();
        await page.waitForTimeout(600);
        const sanitized = item.text.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase().slice(0, 30);
        await page.screenshot({ path: path.join(OUT_DIR, `demo-${demoIdx}-${sanitized}.png`) });
        demoIdx++;
      }
    } catch (e) {
      console.log(`Skip nav item "${item.text}": ${e.message}`);
    }
  }

  // ─── 1024 full page ───────────────────────────────────────────────────────
  await ctx1440.close();
  const ctx1024 = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page1024 = await ctx1024.newPage();
  await page1024.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page1024.waitForTimeout(1500);
  await page1024.screenshot({ path: path.join(OUT_DIR, 'full-1024.png'), fullPage: true });
  await ctx1024.close();

  // ─── 390 mobile ──────────────────────────────────────────────────────────
  const ctx390 = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page390 = await ctx390.newPage();
  await page390.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page390.waitForTimeout(1500);
  await page390.screenshot({ path: path.join(OUT_DIR, 'full-390.png'), fullPage: true });
  await ctx390.close();

  // ─── Console output ───────────────────────────────────────────────────────
  fs.writeFileSync(
    path.join(OUT_DIR, 'console-output.txt'),
    consoleMessages.map(m => `[${m.type.toUpperCase()}] ${m.text}`).join('\n')
  );

  console.log('\n=== AUDIT COMPLETE ===');
  console.log(`Screenshots: ${fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.png')).length}`);
  console.log(`Console messages: ${consoleMessages.length}`);
  console.log(`Demo cards found: ${domProbe.demoCards.length}`);
  console.log(`Focusable elements: ${domProbe.focusableCount}`);
  console.log(`Overflow issues: ${domProbe.overflowIssues.length}`);
  console.log(`A11y issues (icon-only buttons): ${domProbe.issues.length}`);

  await browser.close();
}

run().catch(e => {
  console.error('AUDIT FAILED:', e.message);
  process.exit(1);
});
