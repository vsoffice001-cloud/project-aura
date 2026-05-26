const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3070', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(800);

  const links = await page.$$('a');
  for (const a of links) {
    const txt = await a.textContent().catch(() => '');
    if (/RankingTable/i.test(txt)) { await a.click(); break; }
  }
  await page.waitForTimeout(1200);

  // Scroll to the Comfortable button
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const comf = btns.find(b => b.textContent.trim() === 'Comfortable' && b.closest('[id*="ranking"]'));
    if (comf) comf.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(400);

  // Probe the RankingTable variant toggles specifically
  const result = await page.evaluate(() => {
    const section = document.getElementById('table-ranking');
    if (!section) return { error: 'no section' };

    // Find all [role=group] or [role=tablist] inside the ranking section
    const groups = Array.from(section.querySelectorAll('[role="group"], [role="tablist"]'));

    const groupData = groups.map((g, gi) => {
      const btns = Array.from(g.querySelectorAll('button'));
      return {
        groupIdx: gi,
        role: g.getAttribute('role'),
        ariaLabel: g.getAttribute('aria-label'),
        parentId: g.closest('[id]') ? g.closest('[id]').id : '',
        buttons: btns.map(b => {
          const cs = getComputedStyle(b);
          // Check for brand-red in text color
          const isRed = cs.color.includes('176, 31, 36') || cs.color.includes('b01f24');
          return {
            text: b.textContent ? b.textContent.trim().slice(0,40) : '',
            bg: cs.backgroundColor,
            backgroundImage: cs.backgroundImage,
            color: cs.color,
            isRedText: isRed,
            border: cs.border,
            ariaPressed: b.getAttribute('aria-pressed'),
            ariaSelected: b.getAttribute('aria-selected'),
            classList: b.className ? b.className.slice(0,120) : '',
          };
        }),
      };
    });

    // Also check all buttons in section with their full computed styles
    const sectionBtns = Array.from(section.querySelectorAll('button'));
    const redTextBtns = sectionBtns.filter(b => {
      const color = getComputedStyle(b).color;
      return color.includes('176, 31, 36') || color.includes('b01f24');
    });

    // PropertyTable black border source
    const primSection = document.getElementById('primitive-tableshell');
    const primTable = primSection ? primSection.querySelector('table') : null;
    const primFirstTr = primTable ? primTable.querySelector('tbody tr') : null;

    return {
      sectionId: section.id,
      groupCount: groups.length,
      groups: groupData,
      redTextButtonsCount: redTextBtns.length,
      redTextButtonSamples: redTextBtns.slice(0,3).map(b => ({
        text: b.textContent ? b.textContent.trim().slice(0,30) : '',
        color: getComputedStyle(b).color,
        bg: getComputedStyle(b).backgroundColor,
        ariaPressed: b.getAttribute('aria-pressed'),
      })),
      // primitive-tableshell source of pure black borders
      primitiveTrBorder: primFirstTr ? getComputedStyle(primFirstTr).borderBottom : 'no-tr',
      primitiveTableClass: primTable ? primTable.className.slice(0,120) : 'no-table',
    };
  });

  fs.writeFileSync('/Users/vishalchauchan/Downloads/Anti-folder01/projects/charts-showcase/qa-screenshots/breaks-diagnose-2026-05-26-eve/ranking-variant-probe.json', JSON.stringify(result, null, 2));
  console.log('Done');
  await browser.close();
})().catch(e => { console.error(e.message); process.exit(1); });
