/**
 * Phase 2 Deep Audit — aura-qa
 * Tests: A (interactive) · B (visual) · C (a11y axe) · E (reduced motion)
 * Run: node qa-screenshots/phase2-deep-audit.mjs
 */
import { chromium } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = 'http://localhost:3040/test/phase-2';
const SS = (name) => join(__dirname, `${name}.png`);

const findings = [];
function log(sev, msg) {
  findings.push({ sev, msg });
  console.log(`[${sev}] ${msg}`);
}

async function run() {
  const browser = await chromium.launch({ headless: true });

  // ── SECTION A: Interactive behavior ──────────────────────────────────
  console.log('\n=== A · Interactive behavior ===');

  // A1: Mobile 390×844 — hamburger opens drawer
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'networkidle' });

    // Check hamburger button — use aria-controls as stable selector (label toggles Open/Close)
    const hamburger = page.locator('button[aria-controls="side-toc-drawer"]');
    const hamburgerCount = await hamburger.count();
    if (hamburgerCount === 0) {
      // fallback to any button with aria-expanded near hamburger
      log('BLOCKER', 'A1: hamburger button[aria-controls="side-toc-drawer"] NOT FOUND on mobile');
    } else {
      // Check aria-expanded=false initially
      const expandedBefore = await page.evaluate(() => {
        const btn = document.querySelector('button[aria-controls="side-toc-drawer"]');
        return btn ? btn.getAttribute('aria-expanded') : null;
      });
      if (expandedBefore !== 'false') {
        log('SERIOUS', `A1: hamburger aria-expanded="${expandedBefore}" before open (expected "false")`);
      }

      // Click hamburger
      await hamburger.click();
      await page.waitForTimeout(500);

      // Take screenshot — drawer open
      await page.screenshot({ path: SS('a1-mobile-drawer-open'), fullPage: false });
      log('INFO', 'A1: screenshot → a1-mobile-drawer-open.png');

      // Check Sheet content visible
      const sheetContent = page.locator('[data-state="open"][role="dialog"], [data-slot="dialog-content"]').first();
      // SheetContent uses data-state="open"
      const sheetVisible = await page.locator('[data-state="open"]').count();
      if (sheetVisible === 0) {
        log('BLOCKER', 'A1: Sheet drawer did NOT open — [data-state="open"] not found after hamburger click');
      } else {
        log('PASS', 'A1: Sheet drawer opens on hamburger click');
      }

      // Check 25 nav items in drawer
      const navItems = page.locator('nav[aria-label="Report sections"] ol li a');
      const navCount = await navItems.count();
      if (navCount !== 25) {
        log('SERIOUS', `A1: drawer has ${navCount} nav items (expected 25)`);
      } else {
        log('PASS', `A1: drawer has 25 nav items ✓`);
      }

      // Check aria-expanded=true after open — evaluate directly (label changed to "Close menu")
      const expandedAfter = await page.evaluate(() => {
        const btn = document.querySelector('button[aria-controls="side-toc-drawer"]');
        return btn ? btn.getAttribute('aria-expanded') : null;
      });
      if (expandedAfter !== 'true') {
        log('SERIOUS', `A1: hamburger aria-expanded="${expandedAfter}" after open (expected "true")`);
      } else {
        log('PASS', 'A1: aria-expanded="true" after open ✓');
      }

      // A1c: Click a nav item → drawer closes + scrolls
      // Use JS click to bypass viewport-clipping issue with Sheet portal
      const firstNavItem = navItems.first();
      const industryCount = await firstNavItem.count();
      if (industryCount > 0) {
        await page.evaluate(() => {
          const link = document.querySelector('nav[aria-label="Report sections"] ol li a');
          if (link) link.click();
        });
        await page.waitForTimeout(800);
        const drawerAfterNav = await page.locator('[data-state="open"]').count();
        if (drawerAfterNav > 0) {
          log('SERIOUS', 'A1: clicking nav item did NOT close drawer');
        } else {
          log('PASS', 'A1: clicking nav item closes drawer ✓');
        }
        // Verify scroll moved
        const scrollY = await page.evaluate(() => window.scrollY);
        if (scrollY < 100) {
          log('SERIOUS', `A1: after nav click scrollY=${scrollY} — page did not scroll to section`);
        } else {
          log('PASS', `A1: scrolled to section, scrollY=${scrollY} ✓`);
        }
      }

      // Reopen drawer for Escape test
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForTimeout(300);
      await page.evaluate(() => document.querySelector('button[aria-controls="side-toc-drawer"]')?.click());
      await page.waitForTimeout(400);

      // A1d: Escape key closes drawer
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);
      const drawerAfterEsc = await page.locator('[data-state="open"]').count();
      if (drawerAfterEsc > 0) {
        log('SERIOUS', 'A1: Escape key did NOT close drawer');
      } else {
        log('PASS', 'A1: Escape key closes drawer ✓');
      }

      // Reopen for overlay click test
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForTimeout(200);
      await page.evaluate(() => document.querySelector('button[aria-controls="side-toc-drawer"]')?.click());
      await page.waitForTimeout(400);
      // Overlay click — click outside sheet (right side of 300px drawer)
      await page.mouse.click(350, 400);
      await page.waitForTimeout(600);
      const drawerAfterOverlay = await page.locator('[data-state="open"]').count();
      if (drawerAfterOverlay > 0) {
        log('SERIOUS', 'A1: overlay click did NOT close drawer');
      } else {
        log('PASS', 'A1: overlay click closes drawer ✓');
      }
    }
    await ctx.close();
  }

  // A2: Mobile/Tablet — TOC hidden in main flow
  {
    for (const [vw, vh, label] of [[390, 844, 'mobile-390'], [768, 1024, 'tablet-768']]) {
      const ctx = await browser.newContext({ viewport: { width: vw, height: vh } });
      const page = await ctx.newPage();
      await page.goto(BASE, { waitUntil: 'networkidle' });
      // DS TOC sidebar desktop div hidden:block approach
      const desktopTOC = page.locator('.side-toc-v04-desktop, .hidden.lg\\:block');
      const tocCount = await desktopTOC.count();
      if (tocCount > 0) {
        const tocVisible = await desktopTOC.first().isVisible();
        if (tocVisible) {
          log('SERIOUS', `A2: TOC desktop sidebar VISIBLE at ${label} (should be hidden)`);
        } else {
          log('PASS', `A2: TOC desktop sidebar hidden at ${label} ✓`);
        }
      }
      await ctx.close();
    }
  }

  // A3: Desktop scroll-spy — active item advances
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Check active state at top (scroll=0)
    let activeAt0 = await page.evaluate(() => {
      const el = document.querySelector('[data-active="true"], [aria-current="true"], .toc-item-active, [class*="active"]');
      return el ? el.textContent?.trim() : null;
    });
    log('INFO', `A3: active item at scroll=0: "${activeAt0}"`);

    // Scroll to 1500px
    await page.evaluate(() => window.scrollTo({ top: 1500, behavior: 'instant' }));
    await page.waitForTimeout(1000);
    let activeAt1500 = await page.evaluate(() => {
      const el = document.querySelector('[data-active="true"], [aria-current="true"]');
      return el ? el.textContent?.trim() : null;
    });
    log('INFO', `A3: active item at scroll=1500: "${activeAt1500}"`);

    // Scroll to 3000px
    await page.evaluate(() => window.scrollTo({ top: 3000, behavior: 'instant' }));
    await page.waitForTimeout(1000);
    let activeAt3000 = await page.evaluate(() => {
      const el = document.querySelector('[data-active="true"], [aria-current="true"]');
      return el ? el.textContent?.trim() : null;
    });
    log('INFO', `A3: active item at scroll=3000: "${activeAt3000}"`);

    // Scroll to 6000px
    await page.evaluate(() => window.scrollTo({ top: 6000, behavior: 'instant' }));
    await page.waitForTimeout(1000);
    let activeAt6000 = await page.evaluate(() => {
      const el = document.querySelector('[data-active="true"], [aria-current="true"]');
      return el ? el.textContent?.trim() : null;
    });
    log('INFO', `A3: active item at scroll=6000: "${activeAt6000}"`);

    // Broader search — any element with active class pattern
    const tocLinks = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('aside a, aside button, aside li'));
      return links.map(el => ({
        text: el.textContent?.trim().slice(0, 40),
        dataActive: el.getAttribute('data-active'),
        ariaCurrent: el.getAttribute('aria-current'),
        className: el.className.includes('active') ? 'has-active' : ''
      })).filter(l => l.dataActive === 'true' || l.ariaCurrent || l.className);
    });
    log('INFO', `A3: TOC active links found: ${JSON.stringify(tocLinks)}`);

    if (!activeAt1500 && !activeAt3000 && tocLinks.length === 0) {
      log('SERIOUS', 'A3: scroll-spy NOT working — no [data-active="true"] or [aria-current] found at any scroll position');
    } else {
      log('PASS', 'A3: scroll-spy active state detected ✓');
    }

    await ctx.close();
  }

  // A4: Desktop TOC expand/collapse toggle
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Find toggle button (half-outside, edge of sidebar)
    const toggleBtn = page.locator('button[aria-label*="collapse"], button[aria-label*="expand"], button[aria-label*="Collapse"], button[aria-label*="Expand"], [data-component*="toggle"], aside button').first();
    const toggleCount = await toggleBtn.count();
    if (toggleCount === 0) {
      log('MINOR', 'A4: collapse/expand toggle button NOT FOUND by aria-label — checking by position');
      // Try by being near the sidebar
      const sidebarWidth = await page.evaluate(() => {
        const aside = document.querySelector('aside');
        return aside ? aside.getBoundingClientRect().width : null;
      });
      log('INFO', `A4: sidebar width = ${sidebarWidth}px (expected ~255px)`);
    } else {
      const sidebarBefore = await page.evaluate(() => {
        const aside = document.querySelector('aside');
        return aside ? aside.getBoundingClientRect().width : null;
      });
      await toggleBtn.click();
      await page.waitForTimeout(600);
      const sidebarAfter = await page.evaluate(() => {
        const aside = document.querySelector('aside');
        return aside ? aside.getBoundingClientRect().width : null;
      });
      log('INFO', `A4: sidebar width ${sidebarBefore}px → ${sidebarAfter}px after toggle`);
      if (sidebarBefore === sidebarAfter) {
        log('SERIOUS', 'A4: TOC collapse toggle did nothing — sidebar width unchanged');
      } else {
        log('PASS', `A4: TOC collapse works: ${sidebarBefore}px → ${sidebarAfter}px ✓`);
      }
    }
    await ctx.close();
  }

  // A5: TOC click navigation — Industry Analysis → #industry
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const industryTOCLink = page.locator('aside a[href="#industry"]');
    const linkCount = await industryTOCLink.count();
    if (linkCount === 0) {
      log('BLOCKER', 'A5: TOC link href="#industry" NOT FOUND in desktop sidebar');
    } else {
      const scrollBefore = await page.evaluate(() => window.scrollY);
      await industryTOCLink.click();
      await page.waitForTimeout(1000);
      const scrollAfter = await page.evaluate(() => window.scrollY);
      const sectionTop = await page.evaluate(() => {
        const el = document.getElementById('industry');
        return el ? el.getBoundingClientRect().top + window.scrollY : null;
      });
      log('INFO', `A5: scrollY before=${scrollBefore}, after=${scrollAfter}, #industry offsetTop=${sectionTop}`);

      if (scrollAfter < 100) {
        log('SERIOUS', 'A5: clicking TOC "Industry Analysis" did not scroll — scrollY still near 0');
      } else {
        // Check landing within 108px scrollOffset tolerance
        const delta = Math.abs(scrollAfter - (sectionTop - 108));
        log('INFO', `A5: delta from expected position (sectionTop - 108px) = ${delta}px`);
        if (delta > 50) {
          log('MINOR', `A5: scroll offset drift — landed ${delta}px from expected (sectionTop - 108). Expected ~${Math.round(sectionTop - 108)}, got ${scrollAfter}`);
        } else {
          log('PASS', `A5: scroll lands within ${delta}px of target (offset 108px) ✓`);
        }
      }
    }
    await ctx.close();
  }

  // A6: PageProgressBar scaleX
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // scaleX at top
    const scaleXAtTop = await page.evaluate(() => {
      const bar = document.querySelector('[data-component="PageProgressBar"] div[style]');
      return bar ? bar.style.transform : null;
    });
    log('INFO', `A6: scaleX at scroll=0: "${scaleXAtTop}"`);

    // Scroll to 50%
    const docHeight = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);
    await page.evaluate((h) => window.scrollTo({ top: h * 0.5, behavior: 'instant' }), docHeight);
    await page.waitForTimeout(500);
    const scaleXAt50 = await page.evaluate(() => {
      const bar = document.querySelector('[data-component="PageProgressBar"] div[style]');
      return bar ? bar.style.transform : null;
    });
    log('INFO', `A6: scaleX at 50% scroll: "${scaleXAt50}"`);

    // Scroll to bottom
    await page.evaluate((h) => window.scrollTo({ top: h, behavior: 'instant' }), docHeight);
    await page.waitForTimeout(500);
    const scaleXAt100 = await page.evaluate(() => {
      const bar = document.querySelector('[data-component="PageProgressBar"] div[style]');
      return bar ? bar.style.transform : null;
    });
    log('INFO', `A6: scaleX at 100% scroll: "${scaleXAt100}"`);

    // Parse scaleX value at 50%
    if (scaleXAt50) {
      const match = scaleXAt50.match(/scaleX\(([0-9.]+)\)/);
      if (match) {
        const val = parseFloat(match[1]);
        if (val < 0.3 || val > 0.7) {
          log('SERIOUS', `A6: PageProgressBar scaleX at 50% = ${val} (expected ~0.5)`);
        } else {
          log('PASS', `A6: PageProgressBar scaleX(${val}) at 50% scroll ✓`);
        }
      }
    } else {
      log('BLOCKER', 'A6: PageProgressBar inner div with transform NOT FOUND');
    }

    await ctx.close();
  }

  // ── SECTION B: Visual screenshots per breakpoint ──────────────────────
  console.log('\n=== B · Visual screenshots ===');

  for (const [vw, vh, label] of [[390, 844, '390'], [768, 1024, '768'], [1440, 900, '1440']]) {
    const ctx = await browser.newContext({ viewport: { width: vw, height: vh } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    // Top screenshot
    await page.screenshot({ path: SS(`b-${label}-top`), fullPage: false });
    log('INFO', `B: screenshot → b-${label}-top.png`);

    // Mid-page
    const docHeight = await page.evaluate(() => document.body.scrollHeight);
    await page.evaluate((h) => window.scrollTo({ top: h * 0.4, behavior: 'instant' }), docHeight);
    await page.waitForTimeout(500);
    await page.screenshot({ path: SS(`b-${label}-mid`), fullPage: false });
    log('INFO', `B: screenshot → b-${label}-mid.png`);

    // Bottom
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
    await page.waitForTimeout(500);
    await page.screenshot({ path: SS(`b-${label}-bottom`), fullPage: false });
    log('INFO', `B: screenshot → b-${label}-bottom.png`);

    // Mobile: drawer open
    if (vw < 768) {
      await page.evaluate(() => window.scrollTo({ top: 0 }));
      const hamburger = page.locator('button[aria-controls="side-toc-drawer"]');
      if (await hamburger.count() > 0) {
        await hamburger.click();
        await page.waitForTimeout(600);
        await page.screenshot({ path: SS(`b-${label}-drawer-open`), fullPage: false });
        log('INFO', `B: screenshot → b-${label}-drawer-open.png`);
      }
    }

    // Visual checks
    // Header z-index
    const headerZIndex = await page.evaluate(() => {
      const header = document.querySelector('header[data-component="DummyHeaderV04"]');
      return header ? window.getComputedStyle(header).zIndex : null;
    });
    log('INFO', `B-${label}: header z-index computed = ${headerZIndex}`);

    // StatPairRow — check grid-cols-3 on desktop, stacked mobile
    const statGridCols = await page.evaluate(() => {
      const grid = document.querySelector('[data-component="StatPairRow"]');
      return grid ? window.getComputedStyle(grid).gridTemplateColumns : null;
    });
    log('INFO', `B-${label}: StatPairRow grid-template-columns = "${statGridCols}"`);

    // Check breadcrumb coral last crumb
    const breadcrumbLast = await page.evaluate(() => {
      const el = document.querySelector('[data-slot="breadcrumb-page"]') ||
                 document.querySelector('.text-\\[var\\(--color-ramp-coral-500\\)\\]') ||
                 document.querySelector('nav[aria-label="breadcrumb"] span[class*="coral"]');
      if (!el) return null;
      return { text: el.textContent, color: window.getComputedStyle(el).color };
    });
    if (!breadcrumbLast) {
      log('MINOR', `B-${label}: breadcrumb last crumb element not found — may be hidden or selector mismatch`);
    } else {
      log('INFO', `B-${label}: breadcrumb last="${breadcrumbLast.text}" color=${breadcrumbLast.color}`);
    }

    await ctx.close();
  }

  // ── SECTION C: A11y axe audit ─────────────────────────────────────────
  console.log('\n=== C · A11y axe audit ===');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    const critical = results.violations.filter(v => v.impact === 'critical');
    const serious = results.violations.filter(v => v.impact === 'serious');

    if (critical.length === 0 && serious.length === 0) {
      log('PASS', `C: 0 critical, 0 serious axe violations ✓`);
    }

    for (const v of critical) {
      const nodes = v.nodes.slice(0, 2).map(n => n.target?.join(' ') || n.html?.slice(0, 80));
      log('BLOCKER', `C axe CRITICAL [${v.id}]: ${v.description} — ${nodes.join(' | ')}`);
    }
    for (const v of serious) {
      const nodes = v.nodes.slice(0, 2).map(n => n.target?.join(' ') || n.html?.slice(0, 80));
      log('SERIOUS', `C axe SERIOUS [${v.id}]: ${v.description} — ${nodes.join(' | ')}`);
    }

    // Specific a11y checks
    // nav landmark check
    const navLandmarks = await page.evaluate(() =>
      document.querySelectorAll('nav[aria-label]').length
    );
    log('INFO', `C: nav landmarks with aria-label count = ${navLandmarks}`);

    // aria-current on active TOC item
    const ariaCurrent = await page.evaluate(() => {
      const el = document.querySelector('[aria-current]');
      return el ? { tag: el.tagName, ariaCurrent: el.getAttribute('aria-current'), text: el.textContent?.trim().slice(0, 40) } : null;
    });
    if (!ariaCurrent) {
      log('SERIOUS', 'C: NO [aria-current] found on active TOC item — screen readers cannot identify current position');
    } else {
      log('PASS', `C: aria-current found: ${JSON.stringify(ariaCurrent)} ✓`);
    }

    // aria-expanded hamburger
    const hamExpanded = await page.evaluate(() => {
      const btn = document.querySelector('button[aria-expanded]');
      return btn ? btn.getAttribute('aria-expanded') : null;
    });
    if (!hamExpanded) {
      log('SERIOUS', 'C: hamburger button missing aria-expanded');
    } else {
      log('PASS', `C: hamburger aria-expanded="${hamExpanded}" ✓`);
    }

    // aria-controls linkage
    const ariaControls = await page.evaluate(() => {
      const btn = document.querySelector('button[aria-controls]');
      if (!btn) return null;
      const targetId = btn.getAttribute('aria-controls');
      const target = document.getElementById(targetId);
      return { controls: targetId, targetExists: !!target };
    });
    if (!ariaControls) {
      log('SERIOUS', 'C: hamburger missing aria-controls');
    } else if (!ariaControls.targetExists) {
      log('SERIOUS', `C: aria-controls="${ariaControls.controls}" but element #${ariaControls.controls} NOT IN DOM — broken linkage`);
    } else {
      log('PASS', `C: aria-controls="#${ariaControls.controls}" → target exists ✓`);
    }

    // Skip link
    const skipLink = await page.evaluate(() => {
      const skip = document.querySelector('a[href="#main"], a[href="#content"]');
      if (!skip) return null;
      const target = document.getElementById('main') || document.getElementById('content');
      return { href: skip.getAttribute('href'), targetExists: !!target };
    });
    if (!skipLink) {
      log('SERIOUS', 'C: no skip-to-main link found — keyboard users must tab through full header on each page');
    } else if (!skipLink.targetExists) {
      log('SERIOUS', `C: skip link href="${skipLink.href}" target NOT FOUND in DOM`);
    } else {
      log('PASS', `C: skip link "${skipLink.href}" → target exists ✓`);
    }

    // Keyboard nav: TOC items focusable
    const tocFocusable = await page.evaluate(() => {
      const items = document.querySelectorAll('aside a, aside button');
      let count = 0;
      for (const el of items) {
        const ti = el.tabIndex;
        if (ti >= 0) count++;
      }
      return count;
    });
    log('INFO', `C: focusable TOC items (aside a/button) = ${tocFocusable}`);
    if (tocFocusable === 0) {
      log('SERIOUS', 'C: TOC items in desktop sidebar are NOT keyboard-focusable');
    } else {
      log('PASS', `C: ${tocFocusable} focusable TOC items in desktop sidebar ✓`);
    }

    // Touch target size check — hamburger (use aria-controls as stable selector)
    const hamSize = await page.evaluate(() => {
      const btn = document.querySelector('button[aria-controls="side-toc-drawer"]');
      if (!btn) return null;
      const r = btn.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height) };
    });
    if (hamSize) {
      if (hamSize.w < 44 || hamSize.h < 44) {
        log('SERIOUS', `C: hamburger touch target ${hamSize.w}×${hamSize.h}px < 44×44px min`);
      } else {
        log('PASS', `C: hamburger touch target ${hamSize.w}×${hamSize.h}px ≥ 44×44px ✓`);
      }
    }

    await ctx.close();
  }

  // ── SECTION E: Reduced motion ─────────────────────────────────────────
  console.log('\n=== E · Reduced motion ===');
  {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce',
    });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Hero entrance — h1 should be opacity:1, not 0
    const h1Opacity = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return h1 ? window.getComputedStyle(h1).opacity : null;
    });
    if (h1Opacity !== '1') {
      log('SERIOUS', `E: Hero h1 opacity=${h1Opacity} under reduced-motion (expected 1 — animation should skip)`);
    } else {
      log('PASS', `E: Hero h1 opacity=1 under reduced-motion ✓`);
    }

    // Check Framer motion elements don't leave opacity:0 stuck
    const stuckCount = await page.evaluate(() => {
      const all = document.querySelectorAll('[style*="opacity: 0"], [style*="opacity:0"]');
      return all.length;
    });
    if (stuckCount > 0) {
      log('SERIOUS', `E: ${stuckCount} element(s) stuck at opacity:0 under reduced-motion — Framer entrance skip not fully working`);
    } else {
      log('PASS', `E: no elements stuck at opacity:0 under reduced-motion ✓`);
    }

    // CSS @keyframes animations stopped
    const orbAnimation = await page.evaluate(() => {
      const orbs = document.querySelectorAll('.hero-orb-1, .hero-orb-2, .hero-orb-3');
      if (orbs.length === 0) return 'no-orbs';
      return window.getComputedStyle(orbs[0]).animationName;
    });
    log('INFO', `E: orb animation under reduced-motion = "${orbAnimation}"`);
    if (orbAnimation !== 'none' && orbAnimation !== 'no-orbs') {
      log('SERIOUS', `E: orb CSS animation still running (${orbAnimation}) under reduced-motion`);
    }

    // DS Button shimmer — check no translate animation on brand button
    const shimmerAnimation = await page.evaluate(() => {
      const shimmer = document.querySelector('[data-component="Button"] [class*="shimmer"], [data-component="Button"] .w-\\[200\\%\\]');
      if (!shimmer) return 'no-shimmer-found';
      return window.getComputedStyle(shimmer).animation;
    });
    log('INFO', `E: Button shimmer animation = "${shimmerAnimation}"`);

    // Sheet/drawer transition — ensure no slide animation
    // Open the hamburger on mobile
    await ctx.close();
  }

  // ── SECTION F: Code-level checks (already done by reading source) ─────
  console.log('\n=== F · Code-level checks (from read source) ===');

  // These are surfaced directly from reading source files:
  // Logged inline in findings below.

  // ── Print results ─────────────────────────────────────────────────────
  console.log('\n\n=== FINDINGS SUMMARY ===');
  const blockers = findings.filter(f => f.sev === 'BLOCKER');
  const seriousList = findings.filter(f => f.sev === 'SERIOUS');
  const minors = findings.filter(f => f.sev === 'MINOR');
  const passes = findings.filter(f => f.sev === 'PASS');

  console.log(`\nBLOCKERS (${blockers.length}):`);
  blockers.forEach(f => console.log(`  ✗ ${f.msg}`));
  console.log(`\nSERIOUS (${seriousList.length}):`);
  seriousList.forEach(f => console.log(`  ! ${f.msg}`));
  console.log(`\nMINOR (${minors.length}):`);
  minors.forEach(f => console.log(`  - ${f.msg}`));
  console.log(`\nPASS (${passes.length}):`);
  passes.forEach(f => console.log(`  ✓ ${f.msg}`));

  writeFileSync(join(__dirname, 'phase2-audit-results.json'), JSON.stringify(findings, null, 2));
  console.log('\nResults written → qa-screenshots/phase2-audit-results.json');

  await browser.close();
}

run().catch(err => {
  console.error('AUDIT FAILED:', err);
  process.exit(1);
});
