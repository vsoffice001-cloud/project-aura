/**
 * QA probe · breaks-diagnose-2026-05-26-eve
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT_DIR = '/Users/vishalchauchan/Downloads/Anti-folder01/projects/charts-showcase/qa-screenshots/breaks-diagnose-2026-05-26-eve';

function safeBbox(raw, vpW, vpH) {
  if (!raw) return null;
  const x = Math.max(0, Math.floor(raw.x ?? 0));
  const y = Math.max(0, Math.floor(raw.y ?? 0));
  const w = Math.min(Math.ceil(raw.width ?? 0), vpW - x);
  const h = Math.min(Math.ceil(raw.height ?? 0), vpH - y);
  if (w <= 0 || h <= 0 || x >= vpW || y >= vpH) return null;
  return { x, y, width: w, height: h };
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  await page.goto('http://localhost:3070', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(800);

  // Click the RankingTable sidebar link to navigate to that demo
  const rankingLink = await page.$('a:has-text("RankingTable")');
  if (rankingLink) {
    await rankingLink.click();
    await page.waitForTimeout(1200);
    console.log('Navigated to RankingTable via sidebar');
  } else {
    // Try direct URL
    await page.goto('http://localhost:3070/table-ranking', { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(800);
    console.log('Direct nav attempt');
  }

  // Get current URL
  const url = page.url();
  console.log('Current URL:', url);

  // Scroll full page to trigger lazy
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  const VPW = 1440, VPH = 900;

  // Screenshot 1: full page
  await page.screenshot({ path: path.join(OUT_DIR, 'ranking-default-state.png') });
  console.log('SS1 done');

  // Get table bbox
  const tableBbox = await page.evaluate(() => {
    const t = document.querySelector('table');
    if (!t) return null;
    t.scrollIntoView({ behavior: 'instant', block: 'center' });
    const b = t.getBoundingClientRect();
    return { x: b.x, y: b.y, w: b.width, h: b.height };
  });
  await page.waitForTimeout(300);
  console.log('Table bbox after scroll:', tableBbox);

  if (tableBbox) {
    // Row detail
    const rowClip = safeBbox({ x: tableBbox.x, y: tableBbox.y + 44, width: tableBbox.w, height: Math.min(180, tableBbox.h - 44) }, VPW, VPH);
    if (rowClip) await page.screenshot({ path: path.join(OUT_DIR, 'ranking-row-detail.png'), clip: rowClip });
    else await page.screenshot({ path: path.join(OUT_DIR, 'ranking-row-detail.png') });
    console.log('SS2 done');

    // Header detail
    const hdrClip = safeBbox({ x: tableBbox.x, y: tableBbox.y, width: tableBbox.w, height: Math.min(100, tableBbox.h) }, VPW, VPH);
    if (hdrClip) await page.screenshot({ path: path.join(OUT_DIR, 'ranking-header-detail.png'), clip: hdrClip });
    else await page.screenshot({ path: path.join(OUT_DIR, 'ranking-header-detail.png') });
    console.log('SS3 done');
  } else {
    await page.screenshot({ path: path.join(OUT_DIR, 'ranking-row-detail.png') });
    await page.screenshot({ path: path.join(OUT_DIR, 'ranking-header-detail.png') });
    console.log('SS2/3 done (fallback)');
  }

  // Rank circle
  const circleBbox = await page.evaluate(() => {
    const span = document.querySelector('tbody td span');
    if (!span) return null;
    const b = span.getBoundingClientRect();
    return { x: b.x, y: b.y, w: b.width, h: b.height };
  });
  if (circleBbox) {
    const clip = safeBbox({ x: circleBbox.x - 15, y: circleBbox.y - 10, width: 90, height: 60 }, VPW, VPH);
    if (clip) await page.screenshot({ path: path.join(OUT_DIR, 'ranking-rank-circle.png'), clip });
    else await page.screenshot({ path: path.join(OUT_DIR, 'ranking-rank-circle.png') });
  } else {
    await page.screenshot({ path: path.join(OUT_DIR, 'ranking-rank-circle.png') });
  }
  console.log('SS4 done');

  // Variant toggle
  const toggleBbox = await page.evaluate(() => {
    const g = document.querySelector('[role="group"]') || document.querySelector('[role="tablist"]');
    if (g) { const b = g.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height, found: 'role-group' }; }
    const btns = Array.from(document.querySelectorAll('button')).filter(b => /comfortable|compact|standard|inverted/i.test(b.textContent));
    if (btns.length) {
      const rects = btns.map(b => b.getBoundingClientRect());
      const minX = Math.min(...rects.map(r => r.x));
      const minY = Math.min(...rects.map(r => r.y));
      const maxX = Math.max(...rects.map(r => r.x + r.width));
      const maxY = Math.max(...rects.map(r => r.y + r.height));
      return { x: minX, y: minY, w: maxX-minX, h: maxY-minY, found: 'buttons-scan' };
    }
    return null;
  });
  console.log('Toggle bbox:', toggleBbox);

  if (toggleBbox) {
    const clip = safeBbox({ x: toggleBbox.x - 10, y: toggleBbox.y - 10, width: toggleBbox.w + 20, height: toggleBbox.h + 20 }, VPW, VPH);
    if (clip) await page.screenshot({ path: path.join(OUT_DIR, 'variant-toggle-detail.png'), clip });
    else await page.screenshot({ path: path.join(OUT_DIR, 'variant-toggle-detail.png') });
  } else {
    await page.screenshot({ path: path.join(OUT_DIR, 'variant-toggle-detail.png') });
  }
  console.log('SS5 done');

  // Click Comfortable
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => /comfortable/i.test(b.textContent));
    if (btn) btn.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(200);
  await page.click('button:has-text("Comfortable")').catch(e => console.log('No Comfortable btn:', e.message));
  await page.waitForTimeout(500);

  const comfBtnBbox = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => /comfortable/i.test(b.textContent));
    if (!btn) return null;
    const b = btn.getBoundingClientRect();
    return { x: b.x, y: b.y, w: b.width, h: b.height };
  });
  if (comfBtnBbox) {
    const clip = safeBbox({ x: comfBtnBbox.x - 130, y: comfBtnBbox.y - 15, width: 700, height: comfBtnBbox.h + 30 }, VPW, VPH);
    if (clip) await page.screenshot({ path: path.join(OUT_DIR, 'variant-toggle-comfortable.png'), clip });
    else await page.screenshot({ path: path.join(OUT_DIR, 'variant-toggle-comfortable.png') });
  } else {
    await page.screenshot({ path: path.join(OUT_DIR, 'variant-toggle-comfortable.png') });
  }
  console.log('SS6 done');

  // Inverted header
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => /inverted/i.test(b.textContent));
    if (btn) btn.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(200);
  await page.click('button:has-text("Inverted")').catch(e => console.log('No Inverted btn:', e.message));
  await page.waitForTimeout(600);

  const tableBbox2 = await page.evaluate(() => {
    const t = document.querySelector('table');
    if (!t) return null;
    t.scrollIntoView({ behavior: 'instant', block: 'center' });
    const b = t.getBoundingClientRect();
    return { x: b.x, y: b.y, w: b.width, h: b.height };
  });
  await page.waitForTimeout(200);
  if (tableBbox2) {
    const clip = safeBbox({ x: tableBbox2.x, y: tableBbox2.y, width: tableBbox2.w, height: Math.min(90, tableBbox2.h) }, VPW, VPH);
    if (clip) await page.screenshot({ path: path.join(OUT_DIR, 'inverted-header-variant.png'), clip });
    else await page.screenshot({ path: path.join(OUT_DIR, 'inverted-header-variant.png') });
  } else {
    await page.screenshot({ path: path.join(OUT_DIR, 'inverted-header-variant.png') });
  }
  console.log('SS7 done');

  // Reset to default/wash
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => /^default$/i.test(b.textContent?.trim()) || /^wash$/i.test(b.textContent?.trim()) || /card.*default/i.test(b.textContent));
    if (btn) { btn.scrollIntoView({ behavior: 'instant', block: 'center' }); btn.click(); }
  });
  await page.waitForTimeout(400);

  // Card right edge
  const wrapperBbox = await page.evaluate(() => {
    const w = document.querySelector('.tableshell');
    if (!w) return null;
    w.scrollIntoView({ behavior: 'instant', block: 'center' });
    const b = w.getBoundingClientRect();
    return { x: b.x, y: b.y, w: b.width, h: b.height };
  });
  await page.waitForTimeout(200);
  if (wrapperBbox && wrapperBbox.w > 60) {
    const clip = safeBbox({ x: wrapperBbox.x + wrapperBbox.w - 60, y: wrapperBbox.y, width: 65, height: wrapperBbox.h }, VPW, VPH);
    if (clip) await page.screenshot({ path: path.join(OUT_DIR, 'card-right-edge.png'), clip });
    else await page.screenshot({ path: path.join(OUT_DIR, 'card-right-edge.png') });
  } else {
    await page.screenshot({ path: path.join(OUT_DIR, 'card-right-edge.png') });
  }
  console.log('SS8 done');

  // DOM probe — reset to default first
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => /^default$/i.test(b.textContent?.trim()) || /^wash$/i.test(b.textContent?.trim()));
    if (btn) btn.click();
  });
  await page.waitForTimeout(300);

  const probe = await page.evaluate(() => {
    const result = { url: window.location.href, rankingTable: null, variantToggle: null, blackBorderElements: [] };

    // Ranking section: try id-based, then class, then just grab the main content
    const rankingSection = document.querySelector('[id*="ranking"]') ||
      document.querySelector('[id*="table-ranking"]') ||
      document.querySelector('main') ||
      document.body;

    const wrapper = rankingSection.querySelector('.tableshell') ||
                    document.querySelector('.tableshell');
    const table = rankingSection.querySelector('table') ||
                  document.querySelector('table');
    const firstBodyTr = table?.querySelector('tbody tr');
    const firstTd = firstBodyTr?.querySelector('td');
    const lastTd = table?.querySelector('tbody tr:last-child td:last-child');
    const headerTr = table?.querySelector('thead tr');
    const headerTh = headerTr?.querySelector('th');
    const rankCircle = table?.querySelector('tbody td span');

    const allBorders = [];
    [headerTr, headerTh, firstBodyTr, firstTd, lastTd, wrapper, table].forEach((el, i) => {
      if (!el) { allBorders.push({ idx: i, missing: true }); return; }
      const cs = getComputedStyle(el);
      allBorders.push({
        idx: i,
        tag: el.tagName,
        class: el.className?.toString().slice(0, 80),
        borderTop: cs.borderTop,
        borderRight: cs.borderRight,
        borderBottom: cs.borderBottom,
        borderLeft: cs.borderLeft,
        bg: cs.backgroundColor,
        bbox: { y: Math.round(el.getBoundingClientRect().y), h: Math.round(el.getBoundingClientRect().height), w: Math.round(el.getBoundingClientRect().width) },
      });
    });

    const scoreBars = Array.from(document.querySelectorAll('[role="img"]'));

    result.rankingTable = {
      sectionTag: rankingSection.tagName,
      sectionId: rankingSection.id,
      wrapperClass: wrapper?.className?.toString().slice(0,80) ?? 'no-wrapper',
      wrapperBorder: wrapper ? {
        border: getComputedStyle(wrapper).border,
        borderRadius: getComputedStyle(wrapper).borderRadius,
        bg: getComputedStyle(wrapper).backgroundColor,
        overflow: getComputedStyle(wrapper).overflow,
      } : 'no-wrapper',
      header: {
        thBg: headerTh ? getComputedStyle(headerTh).backgroundColor : 'no-th',
        thBorderBottom: headerTh ? getComputedStyle(headerTh).borderBottom : 'no-th',
        thColor: headerTh ? getComputedStyle(headerTh).color : 'no-th',
        trBorderBottom: headerTr ? getComputedStyle(headerTr).borderBottom : 'no-tr',
      },
      firstBodyRow: {
        trBorderBottom: firstBodyTr ? getComputedStyle(firstBodyTr).borderBottom : 'no-tr',
        tdBorderBottom: firstTd ? getComputedStyle(firstTd).borderBottom : 'no-td',
        bg: firstBodyTr ? getComputedStyle(firstBodyTr).backgroundColor : '',
        height: firstBodyTr ? Math.round(firstBodyTr.getBoundingClientRect().height) : 0,
      },
      lastBodyCell: { tdBorderBottom: lastTd ? getComputedStyle(lastTd).borderBottom : 'no-td' },
      rankCircle: rankCircle ? {
        bg: getComputedStyle(rankCircle).backgroundColor,
        color: getComputedStyle(rankCircle).color,
        width: getComputedStyle(rankCircle).width,
        height: getComputedStyle(rankCircle).height,
        display: getComputedStyle(rankCircle).display,
      } : 'no-rank-circle',
      allBordersMatrix: allBorders,
      scoreBarCount: scoreBars.length,
      scoreBarSample: scoreBars[0] ? {
        ariaLabel: scoreBars[0].getAttribute('aria-label'),
        outerHTML: scoreBars[0].outerHTML?.slice(0, 350),
        bg: getComputedStyle(scoreBars[0]).backgroundColor,
        width: getComputedStyle(scoreBars[0]).width,
        height: getComputedStyle(scoreBars[0]).height,
        childCount: scoreBars[0].children.length,
        firstChildBg: scoreBars[0].children[0] ? getComputedStyle(scoreBars[0].children[0]).background : 'no-child',
        firstChildWidth: scoreBars[0].children[0] ? getComputedStyle(scoreBars[0].children[0]).width : 'no-child',
      } : 'no-score-bar-found',
    };

    // Variant toggle
    const vt = document.querySelector('[role="group"]') || document.querySelector('[role="tablist"]');
    if (vt) {
      const btns = Array.from(vt.querySelectorAll('button'));
      result.variantToggle = {
        groupRole: vt.getAttribute('role'),
        buttonCount: btns.length,
        buttons: btns.map(b => ({
          text: b.textContent?.trim().slice(0,30),
          bg: getComputedStyle(b).backgroundColor,
          color: getComputedStyle(b).color,
          border: getComputedStyle(b).border,
          ariaPressed: b.getAttribute('aria-pressed'),
        })),
      };
    } else {
      const allBtns = Array.from(document.querySelectorAll('button'));
      result.variantToggle = {
        fallback: true,
        matchingButtons: allBtns.filter(b => /comfortable|compact|standard|inverted|density/i.test(b.textContent)).map(b => ({
          text: b.textContent?.trim().slice(0,30),
          bg: getComputedStyle(b).backgroundColor,
          color: getComputedStyle(b).color,
          border: getComputedStyle(b).border,
          ariaPressed: b.getAttribute('aria-pressed'),
        })),
      };
    }

    // Black border hunt
    result.blackBorderElements = Array.from(document.querySelectorAll('*')).slice(0, 1000).filter(el => {
      const cs = getComputedStyle(el);
      return ['borderTop','borderBottom','borderLeft','borderRight'].some(prop => {
        const val = cs[prop];
        return val && (val.includes('rgb(0, 0, 0)') || val.includes('rgba(0, 0, 0, 1)')) && !val.startsWith('0px');
      });
    }).slice(0,8).map(el => ({
      tag: el.tagName,
      class: el.className?.toString().slice(0, 80),
      id: el.id,
      borderBottom: getComputedStyle(el).borderBottom,
      borderTop: getComputedStyle(el).borderTop,
      borderLeft: getComputedStyle(el).borderLeft,
      borderRight: getComputedStyle(el).borderRight,
    }));

    return result;
  });

  fs.writeFileSync(path.join(OUT_DIR, 'breaks-dom-probe.json'), JSON.stringify(probe, null, 2));
  console.log('Probe saved. URL was:', probe.url);

  await browser.close();
  console.log('Done.');
})().catch(err => { console.error('FATAL:', err.message, err.stack); process.exit(1); });
