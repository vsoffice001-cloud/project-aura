import { test } from '@playwright/test';
import * as fs from 'fs';

const OUT = '/Users/vishalchauchan/Downloads/Anti-folder01/qa-screenshots/v2n-round3-deep';

test('detail probe — new PDP', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/reports/australia-cold-chain-market-2022-2027', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    const stickyNav = document.querySelector('[style*="position: sticky"], [style*="position:sticky"]') ||
      document.querySelector('nav[class*="sticky"], [class*="StickyNav"]');
    const chips = stickyNav ? Array.from(stickyNav.querySelectorAll('a, button')) : [];
    const chipData = chips.slice(0,8).map(c => ({
      padding: getComputedStyle(c).padding,
      height: getComputedStyle(c).height,
      fontSize: getComputedStyle(c).fontSize,
      color: getComputedStyle(c).color,
      bg: getComputedStyle(c).backgroundColor,
      text: c.textContent?.trim()?.substring(0,25)
    }));

    const h2s = Array.from(document.querySelectorAll('h2'));
    const h2spacing = h2s.slice(0,6).map(h => {
      const next = h.nextElementSibling;
      const h2mb = getComputedStyle(h).marginBottom;
      const nextMt = next ? getComputedStyle(next).marginTop : 'none';
      const hr = h.getBoundingClientRect();
      const nr = next ? next.getBoundingClientRect() : null;
      return {
        h2text: h.textContent?.substring(0,35),
        h2mb,
        nextMt,
        totalGap: nr ? Math.round(nr.top - hr.bottom) : 'no-sibling'
      };
    });

    const primaryCTA = Array.from(document.querySelectorAll('button, a[href]')).filter(el => {
      const bg = getComputedStyle(el).backgroundColor;
      return bg && !bg.includes('0, 0, 0, 0') && !bg.includes('255, 255, 255') && el.textContent?.trim();
    });
    const ctaData = primaryCTA.slice(0,6).map(c => ({
      bg: getComputedStyle(c).backgroundColor,
      color: getComputedStyle(c).color,
      padding: getComputedStyle(c).padding,
      height: getComputedStyle(c).height,
      borderRadius: getComputedStyle(c).borderRadius,
      transition: getComputedStyle(c).transition,
      text: c.textContent?.trim()?.substring(0,30),
      class: c.className.substring(0,80)
    }));

    const iconWrappers = Array.from(document.querySelectorAll('div, span')).filter(el => {
      return el.querySelector(':scope > svg') && el.textContent?.trim().length > 1;
    }).slice(0,8).map(el => ({
      gap: getComputedStyle(el).gap,
      alignItems: getComputedStyle(el).alignItems,
      class: el.className.substring(0,70),
      text: el.textContent?.trim()?.substring(0,30)
    }));

    // KeyStats / stat cards
    const statEls = Array.from(document.querySelectorAll('[class*="stat"], [class*="Stat"], [class*="kpi"], [class*="KPI"], [class*="metric"]'));
    const statData = statEls.slice(0,4).map(c => ({
      padding: getComputedStyle(c).padding,
      bg: getComputedStyle(c).backgroundColor,
      border: getComputedStyle(c).border,
      borderRadius: getComputedStyle(c).borderRadius,
      class: c.className.substring(0,80)
    }));

    // Section-to-section visual gap — measure between contiguous sections
    const sections = Array.from(document.querySelectorAll('section'));
    const secGaps = sections.slice(0,8).map((s, i) => {
      const next = sections[i+1];
      if (!next) return null;
      const sr = s.getBoundingClientRect();
      const nr = next.getBoundingClientRect();
      const myPb = parseInt(getComputedStyle(s).paddingBottom);
      const nextPt = parseInt(getComputedStyle(next).paddingTop);
      return {
        sectionClass: s.className.substring(0,60),
        sBg: getComputedStyle(s).backgroundColor,
        nBg: getComputedStyle(next).backgroundColor,
        gap: Math.round(nr.top - sr.bottom),
        myPaddingBottom: myPb,
        nextPaddingTop: nextPt
      };
    }).filter(Boolean);

    return { chipData, h2spacing, ctaData, iconWrappers, statData, secGaps };
  });
  fs.writeFileSync(`${OUT}/new-detailed.json`, JSON.stringify(data, null, 2));

  // Screenshots at key scroll depths
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/new-1440-top.png`, clip: { x: 0, y: 0, width: 1440, height: 800 } });
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/new-1440-section2.png`, clip: { x: 0, y: 0, width: 1440, height: 800 } });
  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/new-1440-section3.png`, clip: { x: 0, y: 0, width: 1440, height: 800 } });
});

test('detail probe — legacy', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3020/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    const stickyNav = document.querySelector('[style*="position: sticky"], [style*="position:sticky"]') ||
      document.querySelector('nav[class*="sticky"]');
    const chips = stickyNav ? Array.from(stickyNav.querySelectorAll('a, button')) : [];
    const chipData = chips.slice(0,8).map(c => ({
      padding: getComputedStyle(c).padding,
      height: getComputedStyle(c).height,
      fontSize: getComputedStyle(c).fontSize,
      color: getComputedStyle(c).color,
      bg: getComputedStyle(c).backgroundColor,
      text: c.textContent?.trim()?.substring(0,25)
    }));

    const h2s = Array.from(document.querySelectorAll('h2'));
    const h2spacing = h2s.slice(0,6).map(h => {
      const next = h.nextElementSibling;
      const h2mb = getComputedStyle(h).marginBottom;
      const nextMt = next ? getComputedStyle(next).marginTop : 'none';
      const hr = h.getBoundingClientRect();
      const nr = next ? next.getBoundingClientRect() : null;
      return {
        h2text: h.textContent?.substring(0,35),
        h2mb,
        nextMt,
        totalGap: nr ? Math.round(nr.top - hr.bottom) : 'no-sibling'
      };
    });

    const primaryCTA = Array.from(document.querySelectorAll('button, a[href]')).filter(el => {
      const bg = getComputedStyle(el).backgroundColor;
      return bg && !bg.includes('0, 0, 0, 0') && !bg.includes('255, 255, 255') && el.textContent?.trim();
    });
    const ctaData = primaryCTA.slice(0,6).map(c => ({
      bg: getComputedStyle(c).backgroundColor,
      color: getComputedStyle(c).color,
      padding: getComputedStyle(c).padding,
      height: getComputedStyle(c).height,
      borderRadius: getComputedStyle(c).borderRadius,
      text: c.textContent?.trim()?.substring(0,30),
      class: c.className.substring(0,80)
    }));

    const iconWrappers = Array.from(document.querySelectorAll('div, span')).filter(el => {
      return el.querySelector(':scope > svg') && el.textContent?.trim().length > 1;
    }).slice(0,8).map(el => ({
      gap: getComputedStyle(el).gap,
      class: el.className.substring(0,70),
      text: el.textContent?.trim()?.substring(0,30)
    }));

    const sections = Array.from(document.querySelectorAll('section'));
    const secGaps = sections.slice(0,8).map((s, i) => {
      const next = sections[i+1];
      if (!next) return null;
      const sr = s.getBoundingClientRect();
      const nr = next.getBoundingClientRect();
      return {
        sectionClass: s.className.substring(0,60),
        sBg: getComputedStyle(s).backgroundColor,
        nBg: getComputedStyle(next).backgroundColor,
        gap: Math.round(nr.top - sr.bottom),
        myPaddingBottom: parseInt(getComputedStyle(s).paddingBottom),
        nextPaddingTop: parseInt(getComputedStyle(next).paddingTop)
      };
    }).filter(Boolean);

    return { chipData, h2spacing, ctaData, iconWrappers, secGaps };
  });
  fs.writeFileSync(`${OUT}/legacy-detailed.json`, JSON.stringify(data, null, 2));

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/legacy-1440-top.png`, clip: { x: 0, y: 0, width: 1440, height: 800 } });
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/legacy-1440-section2.png`, clip: { x: 0, y: 0, width: 1440, height: 800 } });
  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/legacy-1440-section3.png`, clip: { x: 0, y: 0, width: 1440, height: 800 } });
});
