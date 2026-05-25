const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = '/Users/vishalchauchan/Downloads/Anti-folder01/qa-screenshots/v2n-round3-deep';
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });

  for (const [label, url] of [['new-1440', 'http://localhost:3000/reports/australia-cold-chain-market-2022-2027'], ['new-390', 'http://localhost:3000/reports/australia-cold-chain-market-2022-2027']]) {
    const width = label.includes('390') ? 390 : 1440;
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Full page screenshot
    await page.screenshot({ path: `${OUT}/${label}-full.png`, fullPage: true });

    if (width === 1440) {
      // Probe computed styles — spacing, cards, icons, hover context
      const data = await page.evaluate(() => {
        const get = (sel, prop) => {
          const el = document.querySelector(sel);
          if (!el) return `NOT_FOUND: ${sel}`;
          return getComputedStyle(el)[prop];
        };
        const getAll = (sel, prop) => {
          const els = document.querySelectorAll(sel);
          return Array.from(els).slice(0,4).map(el => getComputedStyle(el)[prop]);
        };
        const rect = (sel) => {
          const el = document.querySelector(sel);
          if (!el) return null;
          return el.getBoundingClientRect();
        };

        // Section gaps — measure distance between section tops
        const sections = document.querySelectorAll('section, [class*="section"], [class*="Section"]');
        const sectionGaps = [];
        for (let i = 0; i < Math.min(sections.length - 1, 6); i++) {
          const a = sections[i].getBoundingClientRect();
          const b = sections[i+1].getBoundingClientRect();
          sectionGaps.push({ gap: Math.round(b.top - a.bottom), tag: sections[i].tagName + '.' + sections[i].className.split(' ')[0] });
        }

        // Card backgrounds and borders
        const cards = document.querySelectorAll('[class*="card"], [class*="Card"], article');
        const cardStyles = Array.from(cards).slice(0,5).map(c => ({
          bg: getComputedStyle(c).backgroundColor,
          border: getComputedStyle(c).border,
          padding: getComputedStyle(c).padding,
          borderRadius: getComputedStyle(c).borderRadius,
          boxShadow: getComputedStyle(c).boxShadow,
          class: c.className.substring(0,80)
        }));

        // Icon sizes
        const icons = document.querySelectorAll('svg');
        const iconSizes = Array.from(icons).slice(0,8).map(i => ({
          w: i.getAttribute('width') || getComputedStyle(i).width,
          h: i.getAttribute('height') || getComputedStyle(i).height,
          parent: i.parentElement?.className?.substring(0,50)
        }));

        // H2 to first-p gap
        const h2s = document.querySelectorAll('h2');
        const h2gaps = Array.from(h2s).slice(0,4).map(h => {
          const next = h.nextElementSibling;
          if (!next) return { h2: h.textContent?.substring(0,30), gap: 'no-sibling' };
          const hRect = h.getBoundingClientRect();
          const nRect = next.getBoundingClientRect();
          return { h2: h.textContent?.substring(0,30), gap: Math.round(nRect.top - hRect.bottom) };
        });

        // CTA button margins
        const btns = document.querySelectorAll('button, a[class*="btn"], a[class*="cta"], [class*="Button"]');
        const btnStyles = Array.from(btns).slice(0,6).map(b => ({
          margin: getComputedStyle(b).margin,
          padding: getComputedStyle(b).padding,
          bg: getComputedStyle(b).backgroundColor,
          text: b.textContent?.trim()?.substring(0,30)
        }));

        // Hero bottom to next section
        const hero = document.querySelector('[class*="hero"], [class*="Hero"]');
        const heroBottom = hero ? hero.getBoundingClientRect().bottom : null;
        const mainContent = document.querySelector('main > *:nth-child(2), [class*="KeyStats"], [class*="key-stats"]');
        const mainTop = mainContent ? mainContent.getBoundingClientRect().top : null;

        // Table styles
        const tables = document.querySelectorAll('table, [class*="table"], [class*="Table"]');
        const tableStyles = Array.from(tables).slice(0,3).map(t => ({
          border: getComputedStyle(t).border,
          bg: getComputedStyle(t).backgroundColor,
          class: t.className?.substring(0,60)
        }));

        // Form inputs
        const inputs = document.querySelectorAll('input, textarea, select');
        const inputStyles = Array.from(inputs).slice(0,4).map(i => ({
          height: getComputedStyle(i).height,
          border: getComputedStyle(i).border,
          padding: getComputedStyle(i).padding,
          bg: getComputedStyle(i).backgroundColor
        }));

        // Nav chips/tabs
        const chips = document.querySelectorAll('[class*="chip"], [class*="Chip"], [class*="tab"], [class*="Tab"], [class*="pill"], nav a');
        const chipStyles = Array.from(chips).slice(0,6).map(c => ({
          padding: getComputedStyle(c).padding,
          bg: getComputedStyle(c).backgroundColor,
          border: getComputedStyle(c).border,
          text: c.textContent?.trim()?.substring(0,20)
        }));

        // Animation/transition detection
        const animated = document.querySelectorAll('[class*="motion"], [style*="transform"], [style*="opacity"]');
        const animCount = animated.length;

        // Whitespace: body padding, main padding
        const bodyPad = getComputedStyle(document.body).padding;
        const main = document.querySelector('main');
        const mainPad = main ? getComputedStyle(main).padding : 'no-main';

        return {
          sectionGaps, cardStyles, iconSizes, h2gaps, btnStyles,
          heroToNextGap: mainTop && heroBottom ? Math.round(mainTop - heroBottom) : 'N/A',
          tableStyles, inputStyles, chipStyles, animCount, bodyPad, mainPad,
          totalSections: sections.length,
          totalCards: cards.length,
          totalIcons: icons.length
        };
      });

      fs.writeFileSync(`${OUT}/computed-new-1440.json`, JSON.stringify(data, null, 2));
      console.log('NEW 1440 data written');

      // Scroll full page to trigger scroll animations, then screenshot sections
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1500);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      await page.screenshot({ path: `${OUT}/${label}-after-scroll.png`, fullPage: true });
    }

    await page.close();
  }

  // Also capture legacy 1440 for comparison
  const legacyPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await legacyPage.goto('http://localhost:3020/', { waitUntil: 'networkidle', timeout: 30000 });
  await legacyPage.waitForTimeout(2000);
  await legacyPage.screenshot({ path: `${OUT}/legacy-1440-full.png`, fullPage: true });

  const legacyData = await legacyPage.evaluate(() => {
    const sections = document.querySelectorAll('section, [class*="section"], [class*="Section"]');
    const sectionGaps = [];
    for (let i = 0; i < Math.min(sections.length - 1, 6); i++) {
      const a = sections[i].getBoundingClientRect();
      const b = sections[i+1].getBoundingClientRect();
      sectionGaps.push({ gap: Math.round(b.top - a.bottom), tag: sections[i].tagName + '.' + sections[i].className.split(' ')[0] });
    }

    const cards = document.querySelectorAll('[class*="card"], [class*="Card"], article');
    const cardStyles = Array.from(cards).slice(0,5).map(c => ({
      bg: getComputedStyle(c).backgroundColor,
      border: getComputedStyle(c).border,
      padding: getComputedStyle(c).padding,
      borderRadius: getComputedStyle(c).borderRadius,
      boxShadow: getComputedStyle(c).boxShadow,
      class: c.className.substring(0,80)
    }));

    const icons = document.querySelectorAll('svg');
    const iconSizes = Array.from(icons).slice(0,8).map(i => ({
      w: i.getAttribute('width') || getComputedStyle(i).width,
      h: i.getAttribute('height') || getComputedStyle(i).height,
      parent: i.parentElement?.className?.substring(0,50)
    }));

    const h2s = document.querySelectorAll('h2');
    const h2gaps = Array.from(h2s).slice(0,4).map(h => {
      const next = h.nextElementSibling;
      if (!next) return { h2: h.textContent?.substring(0,30), gap: 'no-sibling' };
      const hRect = h.getBoundingClientRect();
      const nRect = next.getBoundingClientRect();
      return { h2: h.textContent?.substring(0,30), gap: Math.round(nRect.top - hRect.bottom) };
    });

    const btns = document.querySelectorAll('button, a[class*="btn"], a[class*="cta"], [class*="Button"]');
    const btnStyles = Array.from(btns).slice(0,6).map(b => ({
      margin: getComputedStyle(b).margin,
      padding: getComputedStyle(b).padding,
      bg: getComputedStyle(b).backgroundColor,
      text: b.textContent?.trim()?.substring(0,30)
    }));

    const hero = document.querySelector('[class*="hero"], [class*="Hero"]');
    const heroBottom = hero ? hero.getBoundingClientRect().bottom : null;
    const mainContent = document.querySelector('main > *:nth-child(2)');
    const mainTop = mainContent ? mainContent.getBoundingClientRect().top : null;

    const tables = document.querySelectorAll('table, [class*="table"], [class*="Table"]');
    const tableStyles = Array.from(tables).slice(0,3).map(t => ({
      border: getComputedStyle(t).border,
      bg: getComputedStyle(t).backgroundColor,
      class: t.className?.substring(0,60)
    }));

    const inputs = document.querySelectorAll('input, textarea, select');
    const inputStyles = Array.from(inputs).slice(0,4).map(i => ({
      height: getComputedStyle(i).height,
      border: getComputedStyle(i).border,
      padding: getComputedStyle(i).padding,
      bg: getComputedStyle(i).backgroundColor
    }));

    const chips = document.querySelectorAll('[class*="chip"], [class*="Chip"], [class*="tab"], [class*="Tab"], [class*="pill"], nav a');
    const chipStyles = Array.from(chips).slice(0,6).map(c => ({
      padding: getComputedStyle(c).padding,
      bg: getComputedStyle(c).backgroundColor,
      border: getComputedStyle(c).border,
      text: c.textContent?.trim()?.substring(0,20)
    }));

    const animated = document.querySelectorAll('[class*="motion"], [style*="transform"], [style*="opacity"]');

    return {
      sectionGaps, cardStyles, iconSizes, h2gaps, btnStyles,
      heroToNextGap: mainTop && heroBottom ? Math.round(mainTop - heroBottom) : 'N/A',
      tableStyles, inputStyles, chipStyles, animCount: animated.length,
      totalSections: sections.length, totalCards: cards.length, totalIcons: icons.length
    };
  });

  fs.writeFileSync(`${OUT}/computed-legacy-1440.json`, JSON.stringify(legacyData, null, 2));
  console.log('LEGACY 1440 data written');
  await legacyPage.close();

  // Mobile 390 legacy
  const legacyMob = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await legacyMob.goto('http://localhost:3020/', { waitUntil: 'networkidle', timeout: 30000 });
  await legacyMob.waitForTimeout(2000);
  await legacyMob.screenshot({ path: `${OUT}/legacy-390-full.png`, fullPage: true });
  await legacyMob.close();

  await browser.close();
  console.log('DONE');
})();
