const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3070', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(800);

  // Click RankingTable sidebar link
  const links = await page.$$('a');
  for (const a of links) {
    const txt = await a.textContent().catch(() => '');
    if (/RankingTable/i.test(txt)) { await a.click(); break; }
  }
  await page.waitForTimeout(1200);

  const result = await page.evaluate(() => {
    const section = document.getElementById('table-ranking');
    if (!section) return { error: 'no #table-ranking', allIds: Array.from(document.querySelectorAll('[id]')).map(e=>e.id).filter(Boolean).slice(0,30) };

    const table = section.querySelector('table');

    // Score bars WITHIN ranking table only (non-figure [role=img])
    const roleImgInTable = Array.from(table ? table.querySelectorAll('[role="img"]') : []);
    const nonFigureRoleImg = roleImgInTable.filter(el => el.tagName !== 'FIGURE');

    // Rank circle actual
    const rankCircle = table ? table.querySelector('tbody tr:first-child td:first-child span') : null;

    // Get all buttons (density + header style toggles)
    const allButtons = Array.from(document.querySelectorAll('button')).map(b => ({
      text: b.textContent ? b.textContent.trim().slice(0,40) : '',
      bg: getComputedStyle(b).backgroundColor,
      color: getComputedStyle(b).color,
      ariaPressed: b.getAttribute('aria-pressed'),
    }));
    const densityButtons = allButtons.filter(b => /compact|standard|comfortable|spacious/i.test(b.text));
    const headerButtons = allButtons.filter(b => /wash|inverted|transparent|open|card/i.test(b.text));

    // Black border TRs — which table
    const allTrs = Array.from(document.querySelectorAll('tr'));
    const blackBorderTrs = allTrs.filter(tr => {
      const cs = getComputedStyle(tr);
      return cs.borderBottom.includes('rgb(0, 0, 0)') && !cs.borderBottom.startsWith('0px');
    });
    const blackBorderInfo = blackBorderTrs.slice(0,5).map(tr => {
      return {
        trClass: tr.className ? tr.className.slice(0,80) : '',
        tdCount: tr.querySelectorAll('td,th').length,
        parentId: tr.closest('[id]') ? tr.closest('[id]').id : 'no-id',
        border: getComputedStyle(tr).borderBottom,
        firstTdText: tr.querySelector('td') ? tr.querySelector('td').textContent.trim().slice(0,30) : '',
      };
    });

    return {
      sectionFound: true,
      tableFound: !!table,
      rankCircleInFirstTd: rankCircle ? {
        bg: getComputedStyle(rankCircle).backgroundColor,
        color: getComputedStyle(rankCircle).color,
        computedWidth: getComputedStyle(rankCircle).width,
        computedHeight: getComputedStyle(rankCircle).height,
        display: getComputedStyle(rankCircle).display,
        classList: rankCircle.className,
        bbox: { x: Math.round(rankCircle.getBoundingClientRect().x), y: Math.round(rankCircle.getBoundingClientRect().y), w: Math.round(rankCircle.getBoundingClientRect().width), h: Math.round(rankCircle.getBoundingClientRect().height) },
      } : 'not-found',
      roleImgInsideTable: roleImgInTable.length,
      nonFigureRoleImgCount: nonFigureRoleImg.length,
      nonFigureRoleImgSample: nonFigureRoleImg[0] ? {
        tag: nonFigureRoleImg[0].tagName,
        ariaLabel: nonFigureRoleImg[0].getAttribute('aria-label'),
        classList: nonFigureRoleImg[0].className,
        styleAttr: nonFigureRoleImg[0].getAttribute('style'),
        bg: getComputedStyle(nonFigureRoleImg[0]).backgroundColor,
        width: getComputedStyle(nonFigureRoleImg[0]).width,
        height: getComputedStyle(nonFigureRoleImg[0]).height,
        childCount: nonFigureRoleImg[0].children.length,
        firstChildStyle: nonFigureRoleImg[0].children[0] ? nonFigureRoleImg[0].children[0].getAttribute('style') : 'no-child',
        firstChildBg: nonFigureRoleImg[0].children[0] ? getComputedStyle(nonFigureRoleImg[0].children[0]).backgroundColor : 'no-child',
        firstChildBgFull: nonFigureRoleImg[0].children[0] ? getComputedStyle(nonFigureRoleImg[0].children[0]).background : 'no-child',
        firstChildWidth: nonFigureRoleImg[0].children[0] ? getComputedStyle(nonFigureRoleImg[0].children[0]).width : 'no-child',
        firstChildHeight: nonFigureRoleImg[0].children[0] ? getComputedStyle(nonFigureRoleImg[0].children[0]).height : 'no-child',
        outerHTML: nonFigureRoleImg[0].outerHTML ? nonFigureRoleImg[0].outerHTML.slice(0,400) : '',
      } : 'none',
      densityButtons: densityButtons,
      headerButtons: headerButtons,
      allButtonTexts: allButtons.map(b => b.text).filter(t => t.length > 0),
      blackBorderInfo: blackBorderInfo,
    };
  });

  fs.writeFileSync('/Users/vishalchauchan/Downloads/Anti-folder01/projects/charts-showcase/qa-screenshots/breaks-diagnose-2026-05-26-eve/focused-probe.json', JSON.stringify(result, null, 2));
  console.log('Focused probe saved');
  await browser.close();
})().catch(e => { console.error(e.message); process.exit(1); });
