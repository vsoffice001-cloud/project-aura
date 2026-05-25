import { chromium } from '@playwright/test';
import * as path from 'path';

const outDir = '/Users/vishalchauchan/Downloads/Anti-folder01/qa-screenshots/v2p-round4-deep';

async function run() {
  const browser = await chromium.launch();
  
  // ---- NEW PDP deep probes ----
  const ctxNew = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageNew = await ctxNew.newPage();
  await pageNew.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027', { waitUntil: 'networkidle', timeout: 30000 });
  await pageNew.waitForTimeout(2000);

  // Probe A: Focus ring — force :focus state and capture computed style
  const focusStyle = await pageNew.evaluate(() => {
    const btn = document.querySelector('button') as HTMLElement;
    if (!btn) return null;
    btn.focus();
    const cs = window.getComputedStyle(btn);
    return { outline: cs.outline, outlineColor: cs.outlineColor, outlineStyle: cs.outlineStyle, outlineWidth: cs.outlineWidth, boxShadow: cs.boxShadow };
  });
  console.log('NEW FOCUS STATE (button):', JSON.stringify(focusStyle));

  // Probe B: Active state on CTA button
  const activeStyle = await pageNew.evaluate(() => {
    const ctaBtns = Array.from(document.querySelectorAll('button, a')).filter(el => 
      el.textContent?.toLowerCase().includes('sample') || el.textContent?.toLowerCase().includes('download')
    );
    if (!ctaBtns.length) return null;
    const el = ctaBtns[0] as HTMLElement;
    const cs = window.getComputedStyle(el);
    return { tag: el.tagName, text: el.textContent?.trim().slice(0,30), bg: cs.backgroundColor, color: cs.color, cursor: cs.cursor };
  });
  console.log('NEW CTA BASE STATE:', JSON.stringify(activeStyle));

  // Probe C: Cursor on interactive elements
  const cursors = await pageNew.evaluate(() => {
    const els = document.querySelectorAll('button, a, [role="button"]');
    return Array.from(els).slice(0, 6).map(el => ({
      tag: el.tagName,
      text: el.textContent?.trim().slice(0, 25),
      cursor: window.getComputedStyle(el).cursor,
    }));
  });
  console.log('NEW CURSORS:', JSON.stringify(cursors));

  // Probe D: Scroll progress bar track vs fill colors
  const progressDetails = await pageNew.evaluate(() => {
    const bars = document.querySelectorAll('[class*="progress"], [class*="Progress"], [role="progressbar"]');
    return Array.from(bars).map(el => {
      const cs = window.getComputedStyle(el);
      const child = el.firstElementChild;
      const childCs = child ? window.getComputedStyle(child) : null;
      return {
        trackBg: cs.backgroundColor,
        trackH: cs.height,
        fillBg: childCs?.backgroundColor,
        fillW: childCs?.width,
        position: cs.position,
        top: cs.top,
        zIndex: cs.zIndex,
      };
    });
  });
  console.log('NEW PROGRESS BAR DETAILS:', JSON.stringify(progressDetails));

  // Probe E: Back-to-top — does it exist in new?
  const bttNew = await pageNew.evaluate(() => {
    // Search for any element that could be back-to-top
    const all = Array.from(document.querySelectorAll('*'));
    const matches = all.filter(el => {
      const cls = el.className?.toString() || '';
      const aria = el.getAttribute('aria-label') || '';
      const text = el.textContent?.toLowerCase() || '';
      return cls.includes('back') || cls.includes('scroll-top') || aria.toLowerCase().includes('top') || text.includes('back to top');
    });
    return matches.slice(0, 3).map(el => ({
      tag: el.tagName,
      cls: el.className?.toString().slice(0, 60),
      aria: el.getAttribute('aria-label'),
      text: el.textContent?.trim().slice(0, 30),
    }));
  });
  console.log('NEW BACK-TO-TOP:', JSON.stringify(bttNew));

  // Probe F: Accent lines / color bars on cards — look for border-left, border-top, or colored pseudo elements
  const accentLines = await pageNew.evaluate(() => {
    const cards = document.querySelectorAll('[class*="card"], [class*="Card"], [class*="stat"], [class*="feature"]');
    return Array.from(cards).slice(0, 6).map(el => {
      const cs = window.getComputedStyle(el);
      return {
        cls: el.className?.toString().slice(0, 50),
        borderLeft: cs.borderLeftColor + ' ' + cs.borderLeftWidth + ' ' + cs.borderLeftStyle,
        borderTop: cs.borderTopColor + ' ' + cs.borderTopWidth + ' ' + cs.borderTopStyle,
        borderRadius: cs.borderRadius,
        boxShadow: cs.boxShadow.slice(0, 80),
      };
    });
  });
  console.log('NEW ACCENT LINES:', JSON.stringify(accentLines));

  // Probe G: Transition timing consistency
  const timingConsistency = await pageNew.evaluate(() => {
    const els = document.querySelectorAll('button, a, [class*="card"]');
    const durations = new Set<string>();
    const easings = new Set<string>();
    Array.from(els).forEach(el => {
      const t = window.getComputedStyle(el).transition;
      const dur = t.match(/\d+\.?\d*s/g);
      const ease = t.match(/cubic-bezier\([^)]+\)/g);
      dur?.forEach(d => durations.add(d));
      ease?.forEach(e => easings.add(e));
    });
    return { durations: [...durations], easings: [...easings] };
  });
  console.log('NEW TIMING CONSISTENCY:', JSON.stringify(timingConsistency));

  // Probe H: Stat labels / pull-quote typography
  const statLabels = await pageNew.evaluate(() => {
    const statContainers = Array.from(document.querySelectorAll('[class*="stat"], [class*="Stat"], [class*="metric"], [class*="kpi"]'));
    return statContainers.slice(0, 4).map(el => {
      const label = el.querySelector('[class*="label"], [class*="Label"], p, span');
      const value = el.querySelector('[class*="value"], [class*="Value"], h2, h3, strong');
      return {
        cls: el.className?.toString().slice(0, 40),
        labelFS: label ? window.getComputedStyle(label).fontSize : null,
        labelColor: label ? window.getComputedStyle(label).color : null,
        labelWeight: label ? window.getComputedStyle(label).fontWeight : null,
        valueFS: value ? window.getComputedStyle(value).fontSize : null,
        valueColor: value ? window.getComputedStyle(value).color : null,
      };
    });
  });
  console.log('NEW STAT LABELS:', JSON.stringify(statLabels));

  await ctxNew.close();

  // ---- LEGACY probes for comparison ----
  const ctxLeg = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageLeg = await ctxLeg.newPage();
  await pageLeg.goto('http://localhost:3020/', { waitUntil: 'networkidle', timeout: 30000 });
  await pageLeg.waitForTimeout(2000);

  // Legacy focus ring
  const legFocus = await pageLeg.evaluate(() => {
    const btn = document.querySelector('button') as HTMLElement;
    if (!btn) return null;
    btn.focus();
    const cs = window.getComputedStyle(btn);
    return { outline: cs.outline, outlineColor: cs.outlineColor, outlineStyle: cs.outlineStyle, outlineWidth: cs.outlineWidth, boxShadow: cs.boxShadow };
  });
  console.log('\nLEGACY FOCUS STATE (button):', JSON.stringify(legFocus));

  // Legacy progress bar
  const legProgress = await pageLeg.evaluate(() => {
    const bars = document.querySelectorAll('[class*="progress"], [class*="Progress"], [role="progressbar"]');
    return Array.from(bars).map(el => {
      const cs = window.getComputedStyle(el);
      const child = el.firstElementChild;
      const childCs = child ? window.getComputedStyle(child) : null;
      return {
        trackBg: cs.backgroundColor,
        trackH: cs.height,
        fillBg: childCs?.backgroundColor,
        fillW: childCs?.width,
        position: cs.position,
        top: cs.top,
        zIndex: cs.zIndex,
      };
    });
  });
  console.log('LEGACY PROGRESS BAR:', JSON.stringify(legProgress));

  // Legacy back-to-top
  const legBtt = await pageLeg.evaluate(() => {
    const all = Array.from(document.querySelectorAll('*'));
    const matches = all.filter(el => {
      const cls = el.className?.toString() || '';
      const aria = el.getAttribute('aria-label') || '';
      const text = el.textContent?.toLowerCase() || '';
      return cls.includes('back') || cls.includes('scroll-top') || aria.toLowerCase().includes('top') || text.includes('back to top');
    });
    return matches.slice(0, 3).map(el => ({
      tag: el.tagName,
      cls: el.className?.toString().slice(0, 60),
      aria: el.getAttribute('aria-label'),
      text: el.textContent?.trim().slice(0, 30),
    }));
  });
  console.log('LEGACY BACK-TO-TOP:', JSON.stringify(legBtt));

  // Legacy accent lines on cards
  const legAccents = await pageLeg.evaluate(() => {
    const cards = document.querySelectorAll('[class*="card"], [class*="Card"], [class*="stat"], [class*="feature"], [class*="chapter"]');
    return Array.from(cards).slice(0, 6).map(el => {
      const cs = window.getComputedStyle(el);
      return {
        cls: el.className?.toString().slice(0, 50),
        borderLeft: cs.borderLeftColor + ' ' + cs.borderLeftWidth + ' ' + cs.borderLeftStyle,
        borderTop: cs.borderTopColor + ' ' + cs.borderTopWidth + ' ' + cs.borderTopStyle,
        borderRadius: cs.borderRadius,
        boxShadow: cs.boxShadow.slice(0, 80),
      };
    });
  });
  console.log('LEGACY ACCENT LINES:', JSON.stringify(legAccents));

  // Legacy animations/transitions
  const legTiming = await pageLeg.evaluate(() => {
    const els = document.querySelectorAll('button, a, [class*="card"]');
    const durations = new Set<string>();
    const easings = new Set<string>();
    Array.from(els).forEach(el => {
      const t = window.getComputedStyle(el).transition;
      const dur = t.match(/\d+\.?\d*s/g);
      const ease = t.match(/cubic-bezier\([^)]+\)/g);
      dur?.forEach(d => durations.add(d));
      ease?.forEach(e => easings.add(e));
    });
    return { durations: [...durations], easings: [...easings] };
  });
  console.log('LEGACY TIMING:', JSON.stringify(legTiming));

  // Legacy cursors
  const legCursors = await pageLeg.evaluate(() => {
    const els = document.querySelectorAll('button, a, [role="button"]');
    return Array.from(els).slice(0, 6).map(el => ({
      tag: el.tagName,
      text: el.textContent?.trim().slice(0, 25),
      cursor: window.getComputedStyle(el).cursor,
    }));
  });
  console.log('LEGACY CURSORS:', JSON.stringify(legCursors));

  // Legacy tooltips
  const legTooltips = await pageLeg.evaluate(() => {
    const candidates = Array.from(document.querySelectorAll('[role="tooltip"], [class*="tooltip"], [class*="Tooltip"], [title]'));
    return candidates.slice(0,5).map(el => {
      const cs = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        cls: el.className?.toString().slice(0, 40),
        bg: cs.backgroundColor,
        borderRadius: cs.borderRadius,
        fontSize: cs.fontSize,
        title: el.getAttribute('title'),
      };
    });
  });
  console.log('LEGACY TOOLTIPS:', JSON.stringify(legTooltips));

  // Legacy modals
  const legModals = await pageLeg.evaluate(() => {
    return Array.from(document.querySelectorAll('[role="dialog"], [class*="modal"], [class*="Modal"]')).map(el => ({
      tag: el.tagName, cls: el.className?.toString().slice(0,50), display: window.getComputedStyle(el).display
    }));
  });
  console.log('LEGACY MODALS:', JSON.stringify(legModals));

  // Legacy image treatment
  const legImages = await pageLeg.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).slice(0, 8).map(img => {
      const cs = window.getComputedStyle(img);
      return {
        src: img.src.slice(0, 60),
        naturalW: img.naturalWidth, naturalH: img.naturalHeight,
        displayW: Math.round(img.getBoundingClientRect().width),
        displayH: Math.round(img.getBoundingClientRect().height),
        objectFit: cs.objectFit, loading: img.loading, bgColor: cs.backgroundColor,
      };
    });
  });
  console.log('LEGACY IMAGES:', JSON.stringify(legImages));

  await ctxLeg.close();
  
  // Hover state screenshots — scroll to first CTA button on legacy + new
  const ctxNewHover = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageHover = await ctxNewHover.newPage();
  await pageHover.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027', { waitUntil: 'networkidle', timeout: 30000 });
  await pageHover.waitForTimeout(1000);
  
  // Hover over primary CTA
  const ctaSelector = 'button:has-text("Sample"), a:has-text("Sample"), button:has-text("Download")';
  try {
    await pageHover.hover(ctaSelector, { timeout: 5000 });
    await pageHover.waitForTimeout(300);
    await pageHover.screenshot({ path: `${outDir}/new-hover-cta.png` });
    console.log('NEW hover CTA captured');
  } catch(e) { console.log('NEW hover CTA fail:', e); }
  
  await ctxNewHover.close();

  await browser.close();
  console.log('DONE');
}

run().catch(console.error);
