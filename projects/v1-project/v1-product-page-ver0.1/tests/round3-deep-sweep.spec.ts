import { test, expect } from '@playwright/test';
import * as fs from 'fs';

const OUT = '/Users/vishalchauchan/Downloads/Anti-folder01/qa-screenshots/v2n-round3-deep';
fs.mkdirSync(OUT, { recursive: true });

const NEW_URL = 'http://localhost:3000/reports/australia-cold-chain-market-2022-2027';
const LEGACY_URL = 'http://localhost:3020/';

test('round3 deep sweep — new 1440', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(NEW_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT}/new-1440-full.png`, fullPage: true });

  const data = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section, [class*="section"], [class*="Section"]'));
    const sectionGaps: any[] = [];
    for (let i = 0; i < Math.min(sections.length - 1, 8); i++) {
      const a = sections[i].getBoundingClientRect();
      const b = sections[i+1].getBoundingClientRect();
      sectionGaps.push({ gap: Math.round(b.top - a.bottom), aClass: sections[i].className.substring(0,70) });
    }
    const cards = Array.from(document.querySelectorAll('[class*="card"], [class*="Card"], article'));
    const cardStyles = cards.slice(0,6).map(c => ({
      bg: getComputedStyle(c).backgroundColor,
      border: getComputedStyle(c).border,
      borderColor: getComputedStyle(c).borderColor,
      padding: getComputedStyle(c).padding,
      borderRadius: getComputedStyle(c).borderRadius,
      boxShadow: getComputedStyle(c).boxShadow,
      class: c.className.substring(0,80)
    }));
    const icons = Array.from(document.querySelectorAll('svg'));
    const iconSizes = icons.slice(0,10).map(i => ({
      w: i.getAttribute('width') || getComputedStyle(i).width,
      h: i.getAttribute('height') || getComputedStyle(i).height,
      parent: i.parentElement?.className?.substring(0,60)
    }));
    const h2s = Array.from(document.querySelectorAll('h2'));
    const h2gaps = h2s.slice(0,5).map(h => {
      const next = h.nextElementSibling;
      if (!next) return { h2: h.textContent?.substring(0,30), gap: 'no-sibling' };
      const hRect = h.getBoundingClientRect();
      const nRect = next.getBoundingClientRect();
      return { h2: h.textContent?.substring(0,30), gap: Math.round(nRect.top - hRect.bottom) };
    });
    const btns = Array.from(document.querySelectorAll('button, a[href]'));
    const btnStyles = btns.slice(0,10).map(b => ({
      padding: getComputedStyle(b).padding,
      margin: getComputedStyle(b).margin,
      bg: getComputedStyle(b).backgroundColor,
      transition: getComputedStyle(b).transition,
      cursor: getComputedStyle(b).cursor,
      text: b.textContent?.trim()?.substring(0,30)
    }));
    const tables = Array.from(document.querySelectorAll('table'));
    const tableStyles = tables.slice(0,3).map(t => {
      const rows = Array.from(t.querySelectorAll('tr'));
      return {
        border: getComputedStyle(t).border,
        borderCollapse: getComputedStyle(t).borderCollapse,
        headerBg: rows[0] ? getComputedStyle(rows[0]).backgroundColor : 'none',
        row1Bg: rows[1] ? getComputedStyle(rows[1]).backgroundColor : 'none',
        row2Bg: rows[2] ? getComputedStyle(rows[2]).backgroundColor : 'none',
        rowHeight: rows[0] ? getComputedStyle(rows[0]).height : 'none',
        class: t.className?.substring(0,60)
      };
    });
    const inputs = Array.from(document.querySelectorAll('input, textarea, select'));
    const inputStyles = inputs.slice(0,4).map(i => ({
      height: getComputedStyle(i).height,
      border: getComputedStyle(i).border,
      borderRadius: getComputedStyle(i).borderRadius,
      padding: getComputedStyle(i).padding,
      bg: getComputedStyle(i).backgroundColor,
      outlineOnFocus: 'N/A — need focus event',
      type: (i as HTMLInputElement).type
    }));
    const animated = Array.from(document.querySelectorAll('[style*="transform"], [style*="opacity"]'));
    const hero = document.querySelector('[class*="Hero"], [class*="hero"]');
    const heroStyle = hero ? {
      minHeight: getComputedStyle(hero).minHeight,
      padding: getComputedStyle(hero).padding,
      bg: getComputedStyle(hero).backgroundColor
    } : null;
    const sectionPaddings = sections.slice(0,8).map(s => ({
      paddingTop: getComputedStyle(s).paddingTop,
      paddingBottom: getComputedStyle(s).paddingBottom,
      class: s.className.substring(0,70)
    }));
    // Carousels
    const carousels = Array.from(document.querySelectorAll('[class*="carousel"], [class*="Carousel"], [class*="slider"], [class*="Slider"], [class*="swiper"]'));
    const carouselInfo = carousels.slice(0,3).map(c => ({
      overflow: getComputedStyle(c).overflow,
      display: getComputedStyle(c).display,
      class: c.className.substring(0,80)
    }));
    // Hover transitions on interactive elements
    const interactiveTransitions = Array.from(document.querySelectorAll('button, [role="button"], a[class], [class*="cta"], [class*="CTA"]')).slice(0,8).map(el => ({
      transition: getComputedStyle(el).transition,
      transform: getComputedStyle(el).transform,
      text: el.textContent?.trim()?.substring(0,25)
    }));
    return {
      sectionGaps, cardStyles, iconSizes, h2gaps, btnStyles, tableStyles,
      inputStyles, animCount: animated.length, heroStyle, sectionPaddings,
      carouselInfo, interactiveTransitions, totalSections: sections.length,
      totalCards: cards.length, totalIcons: icons.length, totalTables: tables.length
    };
  });
  fs.writeFileSync(`${OUT}/computed-new-1440.json`, JSON.stringify(data, null, 2));

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/new-1440-after-scroll.png`, fullPage: true });
});

test('round3 deep sweep — new 390', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(NEW_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT}/new-390-full.png`, fullPage: true });
  const mob = await page.evaluate(() => {
    const nav = document.querySelector('nav, header');
    const navH = nav ? getComputedStyle(nav).height : 'none';
    const hero = document.querySelector('[class*="Hero"], [class*="hero"]');
    const heroH = hero ? getComputedStyle(hero).minHeight : 'none';
    const sections = Array.from(document.querySelectorAll('section, [class*="Section"]'));
    const secPads = sections.slice(0,6).map(s => ({
      px: getComputedStyle(s).paddingLeft,
      py: getComputedStyle(s).paddingTop,
      class: s.className.substring(0,60)
    }));
    const btns = Array.from(document.querySelectorAll('button, a[href]'));
    const ctaInfo = btns.slice(0,8).map(b => ({
      width: getComputedStyle(b).width,
      display: getComputedStyle(b).display,
      text: b.textContent?.trim()?.substring(0,25)
    }));
    // Touch targets
    const interactive = Array.from(document.querySelectorAll('button, a, [role="button"]'));
    const smallTargets = interactive.filter(el => {
      const r = el.getBoundingClientRect();
      return r.height < 44 || r.width < 44;
    }).map(el => ({
      w: Math.round(el.getBoundingClientRect().width),
      h: Math.round(el.getBoundingClientRect().height),
      text: el.textContent?.trim()?.substring(0,25)
    }));
    return { navH, heroH, secPads, ctaInfo, smallTargets: smallTargets.slice(0,10) };
  });
  fs.writeFileSync(`${OUT}/computed-new-390.json`, JSON.stringify(mob, null, 2));
});

test('round3 deep sweep — legacy 1440', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(LEGACY_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT}/legacy-1440-full.png`, fullPage: true });

  const data = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section, [class*="section"], [class*="Section"]'));
    const sectionGaps: any[] = [];
    for (let i = 0; i < Math.min(sections.length - 1, 8); i++) {
      const a = sections[i].getBoundingClientRect();
      const b = sections[i+1].getBoundingClientRect();
      sectionGaps.push({ gap: Math.round(b.top - a.bottom), aClass: sections[i].className.substring(0,70) });
    }
    const cards = Array.from(document.querySelectorAll('[class*="card"], [class*="Card"], article'));
    const cardStyles = cards.slice(0,6).map(c => ({
      bg: getComputedStyle(c).backgroundColor,
      border: getComputedStyle(c).border,
      borderColor: getComputedStyle(c).borderColor,
      padding: getComputedStyle(c).padding,
      borderRadius: getComputedStyle(c).borderRadius,
      boxShadow: getComputedStyle(c).boxShadow,
      class: c.className.substring(0,80)
    }));
    const icons = Array.from(document.querySelectorAll('svg'));
    const iconSizes = icons.slice(0,10).map(i => ({
      w: i.getAttribute('width') || getComputedStyle(i).width,
      h: i.getAttribute('height') || getComputedStyle(i).height,
      parent: i.parentElement?.className?.substring(0,60)
    }));
    const h2s = Array.from(document.querySelectorAll('h2'));
    const h2gaps = h2s.slice(0,5).map(h => {
      const next = h.nextElementSibling;
      if (!next) return { h2: h.textContent?.substring(0,30), gap: 'no-sibling' };
      const hRect = h.getBoundingClientRect();
      const nRect = next.getBoundingClientRect();
      return { h2: h.textContent?.substring(0,30), gap: Math.round(nRect.top - hRect.bottom) };
    });
    const btns = Array.from(document.querySelectorAll('button, a[href]'));
    const btnStyles = btns.slice(0,10).map(b => ({
      padding: getComputedStyle(b).padding,
      bg: getComputedStyle(b).backgroundColor,
      transition: getComputedStyle(b).transition,
      cursor: getComputedStyle(b).cursor,
      text: b.textContent?.trim()?.substring(0,30)
    }));
    const tables = Array.from(document.querySelectorAll('table'));
    const tableStyles = tables.slice(0,3).map(t => {
      const rows = Array.from(t.querySelectorAll('tr'));
      return {
        border: getComputedStyle(t).border,
        borderCollapse: getComputedStyle(t).borderCollapse,
        headerBg: rows[0] ? getComputedStyle(rows[0]).backgroundColor : 'none',
        row1Bg: rows[1] ? getComputedStyle(rows[1]).backgroundColor : 'none',
        row2Bg: rows[2] ? getComputedStyle(rows[2]).backgroundColor : 'none',
        rowHeight: rows[0] ? getComputedStyle(rows[0]).height : 'none',
        class: t.className?.substring(0,60)
      };
    });
    const inputs = Array.from(document.querySelectorAll('input, textarea, select'));
    const inputStyles = inputs.slice(0,4).map(i => ({
      height: getComputedStyle(i).height,
      border: getComputedStyle(i).border,
      borderRadius: getComputedStyle(i).borderRadius,
      padding: getComputedStyle(i).padding,
      bg: getComputedStyle(i).backgroundColor,
      type: (i as HTMLInputElement).type
    }));
    const animated = Array.from(document.querySelectorAll('[style*="transform"], [style*="opacity"]'));
    const hero = document.querySelector('[class*="Hero"], [class*="hero"]');
    const heroStyle = hero ? {
      minHeight: getComputedStyle(hero).minHeight,
      padding: getComputedStyle(hero).padding,
      bg: getComputedStyle(hero).backgroundColor
    } : null;
    const sectionPaddings = sections.slice(0,8).map(s => ({
      paddingTop: getComputedStyle(s).paddingTop,
      paddingBottom: getComputedStyle(s).paddingBottom,
      class: s.className.substring(0,70)
    }));
    const carousels = Array.from(document.querySelectorAll('[class*="carousel"], [class*="Carousel"], [class*="slider"], [class*="Slider"], [class*="swiper"]'));
    const carouselInfo = carousels.slice(0,3).map(c => ({
      overflow: getComputedStyle(c).overflow,
      display: getComputedStyle(c).display,
      class: c.className.substring(0,80)
    }));
    const interactiveTransitions = Array.from(document.querySelectorAll('button, [role="button"], a[class]')).slice(0,8).map(el => ({
      transition: getComputedStyle(el).transition,
      text: el.textContent?.trim()?.substring(0,25)
    }));
    return {
      sectionGaps, cardStyles, iconSizes, h2gaps, btnStyles, tableStyles,
      inputStyles, animCount: animated.length, heroStyle, sectionPaddings,
      carouselInfo, interactiveTransitions, totalSections: sections.length,
      totalCards: cards.length, totalIcons: icons.length, totalTables: tables.length
    };
  });
  fs.writeFileSync(`${OUT}/computed-legacy-1440.json`, JSON.stringify(data, null, 2));
});

test('round3 deep sweep — legacy 390', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(LEGACY_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT}/legacy-390-full.png`, fullPage: true });
  const mob = await page.evaluate(() => {
    const nav = document.querySelector('nav, header');
    const navH = nav ? getComputedStyle(nav).height : 'none';
    const hero = document.querySelector('[class*="Hero"], [class*="hero"]');
    const heroH = hero ? getComputedStyle(hero).minHeight : 'none';
    const sections = Array.from(document.querySelectorAll('section, [class*="Section"]'));
    const secPads = sections.slice(0,6).map(s => ({
      px: getComputedStyle(s).paddingLeft,
      py: getComputedStyle(s).paddingTop,
      class: s.className.substring(0,60)
    }));
    const btns = Array.from(document.querySelectorAll('button, a[href]'));
    const ctaInfo = btns.slice(0,8).map(b => ({
      width: getComputedStyle(b).width,
      display: getComputedStyle(b).display,
      text: b.textContent?.trim()?.substring(0,25)
    }));
    const interactive = Array.from(document.querySelectorAll('button, a, [role="button"]'));
    const smallTargets = interactive.filter(el => {
      const r = el.getBoundingClientRect();
      return r.height > 0 && (r.height < 44 || r.width < 44);
    }).map(el => ({
      w: Math.round(el.getBoundingClientRect().width),
      h: Math.round(el.getBoundingClientRect().height),
      text: el.textContent?.trim()?.substring(0,25)
    }));
    return { navH, heroH, secPads, ctaInfo, smallTargets: smallTargets.slice(0,10) };
  });
  fs.writeFileSync(`${OUT}/computed-legacy-390.json`, JSON.stringify(mob, null, 2));
});
