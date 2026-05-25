import { chromium } from '@playwright/test';
import * as fs from 'fs';

const OUT = '/Users/vishalchauchan/Downloads/Anti-folder01/qa-screenshots/v2n-round3-deep';
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });

  // NEW PDP 1440
  const page1440 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page1440.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027', { waitUntil: 'networkidle', timeout: 30000 });
  await page1440.waitForTimeout(2000);
  await page1440.screenshot({ path: `${OUT}/new-1440-full.png`, fullPage: true });

  const newData = await page1440.evaluate(() => {
    const sections = document.querySelectorAll('section, [class*="section"], [class*="Section"]');
    const sectionGaps: any[] = [];
    for (let i = 0; i < Math.min(sections.length - 1, 8); i++) {
      const a = sections[i].getBoundingClientRect();
      const b = sections[i+1].getBoundingClientRect();
      sectionGaps.push({ gap: Math.round(b.top - a.bottom), aClass: (sections[i] as Element).className.substring(0,60) });
    }
    const cards = document.querySelectorAll('[class*="card"], [class*="Card"], article');
    const cardStyles = Array.from(cards).slice(0,6).map(c => ({
      bg: getComputedStyle(c).backgroundColor,
      border: getComputedStyle(c).border,
      borderColor: getComputedStyle(c).borderColor,
      padding: getComputedStyle(c).padding,
      borderRadius: getComputedStyle(c).borderRadius,
      boxShadow: getComputedStyle(c).boxShadow,
      class: c.className.substring(0,80)
    }));
    const icons = document.querySelectorAll('svg');
    const iconSizes = Array.from(icons).slice(0,10).map(i => ({
      w: (i as SVGElement).getAttribute('width') || getComputedStyle(i).width,
      h: (i as SVGElement).getAttribute('height') || getComputedStyle(i).height,
      parent: i.parentElement?.className?.substring(0,60)
    }));
    const h2s = document.querySelectorAll('h2');
    const h2gaps = Array.from(h2s).slice(0,5).map(h => {
      const next = h.nextElementSibling;
      if (!next) return { h2: h.textContent?.substring(0,30), gap: 'no-sibling' };
      const hRect = h.getBoundingClientRect();
      const nRect = next.getBoundingClientRect();
      return { h2: h.textContent?.substring(0,30), gap: Math.round(nRect.top - hRect.bottom) };
    });
    const btns = document.querySelectorAll('button, a[href]');
    const btnStyles = Array.from(btns).slice(0,8).map(b => ({
      padding: getComputedStyle(b).padding,
      margin: getComputedStyle(b).margin,
      bg: getComputedStyle(b).backgroundColor,
      transition: getComputedStyle(b).transition,
      text: b.textContent?.trim()?.substring(0,30)
    }));
    const tables = document.querySelectorAll('table');
    const tableStyles = Array.from(tables).slice(0,3).map(t => {
      const rows = t.querySelectorAll('tr');
      const firstRow = rows[0];
      const secondRow = rows[1];
      return {
        border: getComputedStyle(t).border,
        headerBg: firstRow ? getComputedStyle(firstRow).backgroundColor : 'none',
        row2Bg: secondRow ? getComputedStyle(secondRow).backgroundColor : 'none',
        class: t.className?.substring(0,60)
      };
    });
    const inputs = document.querySelectorAll('input, textarea, select');
    const inputStyles = Array.from(inputs).slice(0,4).map(i => ({
      height: getComputedStyle(i).height,
      border: getComputedStyle(i).border,
      padding: getComputedStyle(i).padding,
      bg: getComputedStyle(i).backgroundColor,
      type: i.getAttribute('type')
    }));
    const animated = document.querySelectorAll('[style*="transform"], [style*="opacity"], [data-framer]');
    const hero = document.querySelector('[class*="Hero"], [class*="hero"]');
    const heroStyle = hero ? {
      minHeight: getComputedStyle(hero).minHeight,
      padding: getComputedStyle(hero).padding,
      bg: getComputedStyle(hero).backgroundColor
    } : null;
    // Section padding
    const sectionPaddings = Array.from(sections).slice(0,6).map(s => ({
      paddingTop: getComputedStyle(s).paddingTop,
      paddingBottom: getComputedStyle(s).paddingBottom,
      class: (s as Element).className.substring(0,60)
    }));
    return { sectionGaps, cardStyles, iconSizes, h2gaps, btnStyles, tableStyles, inputStyles, animCount: animated.length, heroStyle, sectionPaddings, totalSections: sections.length };
  });
  fs.writeFileSync(`${OUT}/computed-new-1440.json`, JSON.stringify(newData, null, 2));

  // Scroll and re-screenshot
  await page1440.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page1440.waitForTimeout(1500);
  await page1440.evaluate(() => window.scrollTo(0, 0));
  await page1440.waitForTimeout(500);
  await page1440.screenshot({ path: `${OUT}/new-1440-after-scroll.png`, fullPage: true });
  await page1440.close();

  // NEW 390
  const page390 = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page390.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027', { waitUntil: 'networkidle', timeout: 30000 });
  await page390.waitForTimeout(2000);
  await page390.screenshot({ path: `${OUT}/new-390-full.png`, fullPage: true });
  const mob390 = await page390.evaluate(() => {
    const nav = document.querySelector('nav, header');
    const navH = nav ? getComputedStyle(nav).height : 'none';
    const hero = document.querySelector('[class*="Hero"], [class*="hero"]');
    const heroH = hero ? getComputedStyle(hero).minHeight : 'none';
    const btns = document.querySelectorAll('button, a[href]');
    const ctaWidths = Array.from(btns).slice(0,6).map(b => ({
      width: getComputedStyle(b).width,
      display: getComputedStyle(b).display,
      text: b.textContent?.trim()?.substring(0,25)
    }));
    const sections = document.querySelectorAll('section, [class*="Section"]');
    const secPads = Array.from(sections).slice(0,4).map(s => ({
      px: getComputedStyle(s).paddingLeft,
      py: getComputedStyle(s).paddingTop,
      class: (s as Element).className.substring(0,50)
    }));
    return { navH, heroH, ctaWidths, secPads };
  });
  fs.writeFileSync(`${OUT}/computed-new-390.json`, JSON.stringify(mob390, null, 2));
  await page390.close();

  // LEGACY 1440
  const legPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await legPage.goto('http://localhost:3020/', { waitUntil: 'networkidle', timeout: 30000 });
  await legPage.waitForTimeout(2000);
  await legPage.screenshot({ path: `${OUT}/legacy-1440-full.png`, fullPage: true });
  const legData = await legPage.evaluate(() => {
    const sections = document.querySelectorAll('section, [class*="section"], [class*="Section"]');
    const sectionGaps: any[] = [];
    for (let i = 0; i < Math.min(sections.length - 1, 8); i++) {
      const a = sections[i].getBoundingClientRect();
      const b = sections[i+1].getBoundingClientRect();
      sectionGaps.push({ gap: Math.round(b.top - a.bottom), aClass: (sections[i] as Element).className.substring(0,60) });
    }
    const cards = document.querySelectorAll('[class*="card"], [class*="Card"], article');
    const cardStyles = Array.from(cards).slice(0,6).map(c => ({
      bg: getComputedStyle(c).backgroundColor,
      border: getComputedStyle(c).border,
      borderColor: getComputedStyle(c).borderColor,
      padding: getComputedStyle(c).padding,
      borderRadius: getComputedStyle(c).borderRadius,
      boxShadow: getComputedStyle(c).boxShadow,
      class: c.className.substring(0,80)
    }));
    const icons = document.querySelectorAll('svg');
    const iconSizes = Array.from(icons).slice(0,10).map(i => ({
      w: (i as SVGElement).getAttribute('width') || getComputedStyle(i).width,
      h: (i as SVGElement).getAttribute('height') || getComputedStyle(i).height,
      parent: i.parentElement?.className?.substring(0,60)
    }));
    const h2s = document.querySelectorAll('h2');
    const h2gaps = Array.from(h2s).slice(0,5).map(h => {
      const next = h.nextElementSibling;
      if (!next) return { h2: h.textContent?.substring(0,30), gap: 'no-sibling' };
      const hRect = h.getBoundingClientRect();
      const nRect = next.getBoundingClientRect();
      return { h2: h.textContent?.substring(0,30), gap: Math.round(nRect.top - hRect.bottom) };
    });
    const btns = document.querySelectorAll('button, a[href]');
    const btnStyles = Array.from(btns).slice(0,8).map(b => ({
      padding: getComputedStyle(b).padding,
      bg: getComputedStyle(b).backgroundColor,
      transition: getComputedStyle(b).transition,
      text: b.textContent?.trim()?.substring(0,30)
    }));
    const tables = document.querySelectorAll('table');
    const tableStyles = Array.from(tables).slice(0,3).map(t => {
      const rows = t.querySelectorAll('tr');
      const firstRow = rows[0];
      const secondRow = rows[1];
      return {
        border: getComputedStyle(t).border,
        headerBg: firstRow ? getComputedStyle(firstRow).backgroundColor : 'none',
        row2Bg: secondRow ? getComputedStyle(secondRow).backgroundColor : 'none',
        class: t.className?.substring(0,60)
      };
    });
    const inputs = document.querySelectorAll('input, textarea, select');
    const inputStyles = Array.from(inputs).slice(0,4).map(i => ({
      height: getComputedStyle(i).height,
      border: getComputedStyle(i).border,
      padding: getComputedStyle(i).padding,
      bg: getComputedStyle(i).backgroundColor,
      type: i.getAttribute('type')
    }));
    const animated = document.querySelectorAll('[style*="transform"], [style*="opacity"]');
    const hero = document.querySelector('[class*="Hero"], [class*="hero"]');
    const heroStyle = hero ? {
      minHeight: getComputedStyle(hero).minHeight,
      padding: getComputedStyle(hero).padding,
      bg: getComputedStyle(hero).backgroundColor
    } : null;
    const sectionPaddings = Array.from(sections).slice(0,6).map(s => ({
      paddingTop: getComputedStyle(s).paddingTop,
      paddingBottom: getComputedStyle(s).paddingBottom,
      class: (s as Element).className.substring(0,60)
    }));
    return { sectionGaps, cardStyles, iconSizes, h2gaps, btnStyles, tableStyles, inputStyles, animCount: animated.length, heroStyle, sectionPaddings, totalSections: sections.length };
  });
  fs.writeFileSync(`${OUT}/computed-legacy-1440.json`, JSON.stringify(legData, null, 2));
  await legPage.close();

  // LEGACY 390
  const legMob = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await legMob.goto('http://localhost:3020/', { waitUntil: 'networkidle', timeout: 30000 });
  await legMob.waitForTimeout(2000);
  await legMob.screenshot({ path: `${OUT}/legacy-390-full.png`, fullPage: true });
  await legMob.close();

  await browser.close();
  console.log('ALL DONE');
})();
