import { chromium } from '@playwright/test';

async function run() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  
  await page.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Probe 1: Section visibility — which sections render content vs empty
  const sections = await page.evaluate(() => {
    const all = document.querySelectorAll('section, [class*="section"], [class*="Section"]');
    return Array.from(all).map(el => {
      const rect = el.getBoundingClientRect();
      const children = el.children.length;
      const text = el.textContent?.trim().slice(0, 80) || '';
      return {
        tag: el.tagName,
        cls: el.className.toString().slice(0, 60),
        height: Math.round(rect.height),
        children,
        text: text.slice(0, 80)
      };
    });
  });
  console.log('=== SECTIONS ===');
  sections.forEach(s => console.log(JSON.stringify(s)));

  // Probe 2: Focus ring styles on interactive elements
  const focusRings = await page.evaluate(() => {
    const btns = document.querySelectorAll('button, a, input, [tabindex]');
    const results: any[] = [];
    Array.from(btns).slice(0, 8).forEach(el => {
      const cs = window.getComputedStyle(el);
      results.push({
        tag: el.tagName,
        text: el.textContent?.trim().slice(0, 30),
        outline: cs.outline,
        outlineOffset: cs.outlineOffset,
        boxShadow: cs.boxShadow.slice(0, 60),
      });
    });
    return results;
  });
  console.log('\n=== FOCUS RINGS (default state) ===');
  focusRings.forEach(f => console.log(JSON.stringify(f)));

  // Probe 3: Image treatment — aspect ratios, object-fit, bg
  const images = await page.evaluate(() => {
    const imgs = document.querySelectorAll('img');
    return Array.from(imgs).slice(0, 10).map(img => {
      const cs = window.getComputedStyle(img);
      return {
        src: img.src.slice(0, 60),
        naturalW: img.naturalWidth,
        naturalH: img.naturalHeight,
        displayW: Math.round(img.getBoundingClientRect().width),
        displayH: Math.round(img.getBoundingClientRect().height),
        objectFit: cs.objectFit,
        loading: img.loading,
        bgColor: cs.backgroundColor,
      };
    });
  });
  console.log('\n=== IMAGES ===');
  images.forEach(i => console.log(JSON.stringify(i)));

  // Probe 4: Back-to-top button
  const backToTop = await page.evaluate(() => {
    const candidates = Array.from(document.querySelectorAll('button, a')).filter(el => 
      el.textContent?.toLowerCase().includes('top') || 
      el.getAttribute('aria-label')?.toLowerCase().includes('top') ||
      el.className.includes('top')
    );
    return candidates.map(el => ({
      tag: el.tagName,
      text: el.textContent?.trim().slice(0, 30),
      cls: el.className.toString().slice(0, 60),
      visible: (el as HTMLElement).offsetParent !== null
    }));
  });
  console.log('\n=== BACK TO TOP ===');
  console.log(JSON.stringify(backToTop));

  // Probe 5: Scroll progress bar
  const progressBar = await page.evaluate(() => {
    const candidates = Array.from(document.querySelectorAll('[class*="progress"], [class*="Progress"], [role="progressbar"]'));
    return candidates.map(el => {
      const cs = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        cls: el.className.toString().slice(0, 60),
        height: cs.height,
        bg: cs.backgroundColor,
        position: cs.position,
        zIndex: cs.zIndex,
      };
    });
  });
  console.log('\n=== PROGRESS BAR ===');
  console.log(JSON.stringify(progressBar));

  // Probe 6: Sticky sidebar offset
  const sticky = await page.evaluate(() => {
    const candidates = Array.from(document.querySelectorAll('[class*="sticky"], [style*="sticky"]'));
    return candidates.slice(0, 5).map(el => {
      const cs = window.getComputedStyle(el);
      return {
        cls: el.className.toString().slice(0, 60),
        position: cs.position,
        top: cs.top,
      };
    });
  });
  console.log('\n=== STICKY ELEMENTS ===');
  console.log(JSON.stringify(sticky));

  // Probe 7: Modal/drawer presence
  const modals = await page.evaluate(() => {
    const candidates = Array.from(document.querySelectorAll('[role="dialog"], [class*="modal"], [class*="Modal"], [class*="drawer"], [class*="Drawer"]'));
    return candidates.map(el => {
      const cs = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        role: el.getAttribute('role'),
        cls: el.className.toString().slice(0, 60),
        display: cs.display,
        opacity: cs.opacity,
      };
    });
  });
  console.log('\n=== MODALS/DRAWERS ===');
  console.log(JSON.stringify(modals));

  // Probe 8: Tooltip presence
  const tooltips = await page.evaluate(() => {
    const candidates = Array.from(document.querySelectorAll('[role="tooltip"], [class*="tooltip"], [class*="Tooltip"]'));
    return candidates.map(el => {
      const cs = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        cls: el.className.toString().slice(0, 60),
        bg: cs.backgroundColor,
        borderRadius: cs.borderRadius,
        padding: cs.padding,
        fontSize: cs.fontSize,
      };
    });
  });
  console.log('\n=== TOOLTIPS ===');
  console.log(JSON.stringify(tooltips));

  // Probe 9: Animation/transition styles on key elements
  const animations = await page.evaluate(() => {
    const elements = document.querySelectorAll('[class*="animate"], [class*="motion"], button, a.btn, [class*="card"], [class*="Card"]');
    return Array.from(elements).slice(0, 10).map(el => {
      const cs = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        cls: el.className.toString().slice(0, 40),
        transition: cs.transition.slice(0, 80),
        animation: cs.animation.slice(0, 60),
        transform: cs.transform.slice(0, 40),
      };
    });
  });
  console.log('\n=== ANIMATIONS ===');
  animations.forEach(a => console.log(JSON.stringify(a)));

  // Probe 10: Console errors
  const errors: string[] = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  
  // Tab order check — first 8 focusable elements
  const tabOrder = await page.evaluate(() => {
    const focusable = Array.from(document.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ));
    return focusable.slice(0, 8).map(el => ({
      tag: el.tagName,
      text: el.textContent?.trim().slice(0, 30),
      href: (el as HTMLAnchorElement).href?.slice(0, 50),
      tabindex: el.getAttribute('tabindex'),
      visible: (el as HTMLElement).offsetWidth > 0
    }));
  });
  console.log('\n=== TAB ORDER (first 8) ===');
  tabOrder.forEach(t => console.log(JSON.stringify(t)));

  await ctx.close();
  await browser.close();
}

run().catch(console.error);
