// capture.js — capture-only, no analysis, no fixes
// aura-qa Sonnet · 2026-05-25

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.dirname(__filename);
const BASE_URL = 'http://localhost:3070';
const TIMEOUT = 60000;

const consoleMessages = [];

async function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function scrollFullPage(page) {
  // Scroll to bottom then back to top to trigger lazy loading
  await page.evaluate(async () => {
    const totalHeight = document.body.scrollHeight;
    const step = 400;
    for (let y = 0; y < totalHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await wait(2000);
}

async function captureSection(page, section, idx) {
  const slug = (section.id || section.ariaLabel || `section-${idx}`)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .slice(0, 40);
  const fname = `section-${String(idx).padStart(2,'0')}-${slug}.png`;

  // Scroll section into view
  await page.evaluate((sIdx) => {
    const sections = document.querySelectorAll('section');
    if (sections[sIdx]) {
      sections[sIdx].scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }, idx);
  await wait(800);

  await page.screenshot({
    path: path.join(OUT_DIR, fname),
    fullPage: false,
    clip: undefined,
  });
  return fname;
}

async function captureChart(page, chartIdx, viewport) {
  if (viewport !== 1440) return null;

  const idleFile = `chart-${chartIdx}-idle.png`;
  const hoverFile = `chart-${chartIdx}-hover.png`;

  // Scroll chart into view
  await page.evaluate((cIdx) => {
    const charts = document.querySelectorAll('.highcharts-container');
    if (charts[cIdx]) {
      charts[cIdx].scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  }, chartIdx);
  await wait(800);

  await page.screenshot({ path: path.join(OUT_DIR, idleFile), fullPage: false });

  // Hover center of chart
  try {
    const bbox = await page.evaluate((cIdx) => {
      const chart = document.querySelectorAll('.highcharts-container')[cIdx];
      if (!chart) return null;
      const r = chart.getBoundingClientRect();
      return { x: r.x, y: r.y, w: r.width, h: r.height };
    }, chartIdx);

    if (bbox) {
      await page.mouse.move(bbox.x + bbox.w / 2, bbox.y + bbox.h / 2);
      await wait(600);
      await page.screenshot({ path: path.join(OUT_DIR, hoverFile), fullPage: false });
    }
  } catch (e) {
    // non-fatal
  }

  return { idleFile, hoverFile };
}

async function captureTable(page, tableIdx, viewport) {
  if (viewport !== 1440) return null;

  const idleFile = `table-${tableIdx}-idle.png`;

  await page.evaluate((tIdx) => {
    const tables = document.querySelectorAll('table');
    if (tables[tIdx]) {
      tables[tIdx].scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  }, tableIdx);
  await wait(800);

  await page.screenshot({ path: path.join(OUT_DIR, idleFile), fullPage: false });

  // Hover first row
  try {
    const hoverFile = `table-${tableIdx}-hover.png`;
    const bbox = await page.evaluate((tIdx) => {
      const row = document.querySelectorAll('table')[tIdx]?.querySelector('tbody tr');
      if (!row) return null;
      const r = row.getBoundingClientRect();
      return { x: r.x, y: r.y, w: r.width, h: r.height };
    }, tableIdx);
    if (bbox) {
      await page.mouse.move(bbox.x + bbox.w / 2, bbox.y + bbox.h / 2);
      await wait(400);
      await page.screenshot({ path: path.join(OUT_DIR, hoverFile), fullPage: false });
    }
  } catch (e) {}

  return idleFile;
}

async function runCapture() {
  const startTime = Date.now();
  const browser = await chromium.launch({ headless: true });
  const results = {
    viewports: {},
    sections: [],
    charts: [],
    tables: [],
    consoleErrors: [],
  };

  // ── 1440×900 full capture ──────────────────────────────────────────────────
  console.log('→ Launching 1440×900 viewport...');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();

    page.on('console', msg => {
      const type = msg.type();
      if (type === 'error' || type === 'warning') {
        consoleMessages.push({ type, text: msg.text(), url: page.url() });
      }
    });
    page.on('pageerror', err => {
      consoleMessages.push({ type: 'pageerror', text: err.message });
    });

    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: TIMEOUT });
    await wait(2000);
    await scrollFullPage(page);

    // Full page screenshot 1440
    await page.screenshot({ path: path.join(OUT_DIR, 'full-page-1440.png'), fullPage: true });
    console.log('  saved full-page-1440.png');

    // DOM probe
    console.log('→ Running DOM probe...');
    const domProbe = await page.evaluate(() => {
      const result = {
        page: {
          title: document.title,
          totalHeight: document.body.scrollHeight,
          viewport: { w: innerWidth, h: innerHeight },
          bodyBG: getComputedStyle(document.body).backgroundColor,
        },
        sections: [],
        charts: [],
        tables: [],
        headings: [],
        overflowIssues: [],
      };

      document.querySelectorAll('section').forEach((s, i) => {
        result.sections.push({
          idx: i,
          id: s.id,
          ariaLabel: s.getAttribute('aria-label'),
          bbox: { x: Math.round(s.getBoundingClientRect().x), y: Math.round(s.getBoundingClientRect().y), w: Math.round(s.getBoundingClientRect().width), h: Math.round(s.getBoundingClientRect().height) },
          bg: getComputedStyle(s).backgroundColor,
          padding: getComputedStyle(s).padding,
          hasH2: !!s.querySelector('h2'),
          h2Text: s.querySelector('h2')?.textContent?.slice(0, 60),
        });
      });

      document.querySelectorAll('.highcharts-container').forEach((c, i) => {
        const parent = c.closest('[aria-labelledby], section, article, div[class]');
        result.charts.push({
          idx: i,
          bbox: { x: Math.round(c.getBoundingClientRect().x), y: Math.round(c.getBoundingClientRect().y), w: Math.round(c.getBoundingClientRect().width), h: Math.round(c.getBoundingClientRect().height) },
          parentClass: parent?.className?.toString().slice(0, 100),
          seriesType: c.querySelector('.highcharts-series')?.className?.baseVal,
          pointCount: c.querySelectorAll('.highcharts-point').length,
          hasOverflow: c.scrollWidth > c.clientWidth || c.scrollHeight > c.clientHeight,
          dataLabels: Array.from(c.querySelectorAll('.highcharts-data-label')).slice(0, 4).map(l => ({
            text: l.textContent?.trim().slice(0, 30),
            bbox: { x: Math.round(l.getBoundingClientRect().x), y: Math.round(l.getBoundingClientRect().y), w: Math.round(l.getBoundingClientRect().width), h: Math.round(l.getBoundingClientRect().height) },
            opacity: getComputedStyle(l).opacity,
          })),
          colors: Array.from(c.querySelectorAll('.highcharts-point')).slice(0, 6).map(p => p.getAttribute('fill') || ''),
        });
      });

      document.querySelectorAll('table').forEach((t, i) => {
        const firstTh = t.querySelector('th');
        const firstTd = t.querySelector('td');
        const firstTr = t.querySelector('tbody tr') || t.querySelector('tr');
        result.tables.push({
          idx: i,
          bbox: { x: Math.round(t.getBoundingClientRect().x), y: Math.round(t.getBoundingClientRect().y), w: Math.round(t.getBoundingClientRect().width), h: Math.round(t.getBoundingClientRect().height) },
          rowCount: t.querySelectorAll('tr').length,
          colCount: t.querySelectorAll('thead th, tbody tr:first-child td').length,
          headerBG: firstTh ? getComputedStyle(firstTh).backgroundColor : 'no-th',
          headerSticky: firstTh ? getComputedStyle(firstTh).position : 'no-th',
          headerColor: firstTh ? getComputedStyle(firstTh).color : '',
          rowHeight: firstTr ? Math.round(firstTr.getBoundingClientRect().height) : 0,
          borderCollapse: getComputedStyle(t).borderCollapse,
          hasAltRow: !!t.querySelector('tr:nth-child(even)'),
          parentBG: getComputedStyle(t.parentElement || t).backgroundColor,
        });
      });

      document.querySelectorAll('h1, h2, h3, h4').forEach(h => {
        result.headings.push({
          tag: h.tagName,
          text: h.textContent?.trim().slice(0, 80),
          fontSize: getComputedStyle(h).fontSize,
          fontFamily: getComputedStyle(h).fontFamily.split(',')[0].trim(),
          fontWeight: getComputedStyle(h).fontWeight,
          color: getComputedStyle(h).color,
          bbox: { y: Math.round(h.getBoundingClientRect().y), h: Math.round(h.getBoundingClientRect().height) },
        });
      });

      document.querySelectorAll('*').forEach(el => {
        const bbox = el.getBoundingClientRect();
        if (bbox.x + bbox.width > document.documentElement.scrollWidth + 1) {
          result.overflowIssues.push({
            tag: el.tagName,
            class: el.className?.toString().slice(0, 60),
            bbox: { x: Math.round(bbox.x), w: Math.round(bbox.width), overflow: Math.round(bbox.x + bbox.width - document.documentElement.scrollWidth) },
            text: el.textContent?.slice(0, 40),
          });
        }
      });

      return result;
    });

    fs.writeFileSync(path.join(OUT_DIR, 'dom-probe.json'), JSON.stringify(domProbe, null, 2));
    console.log('  saved dom-probe.json');
    console.log(`  sections: ${domProbe.sections.length} · charts: ${domProbe.charts.length} · tables: ${domProbe.tables.length} · headings: ${domProbe.headings.length}`);

    results.domProbe = domProbe;

    // Per-section screenshots
    console.log('→ Capturing per-section screenshots...');
    for (let i = 0; i < domProbe.sections.length; i++) {
      const fname = await captureSection(page, domProbe.sections[i], i);
      console.log(`  ${fname}`);
      results.sections.push(fname);
    }

    // Per-chart screenshots
    console.log('→ Capturing per-chart screenshots (idle+hover)...');
    for (let i = 0; i < domProbe.charts.length; i++) {
      const files = await captureChart(page, i, 1440);
      if (files) {
        console.log(`  ${files.idleFile} + ${files.hoverFile}`);
        results.charts.push(files);
      }
    }

    // Per-table screenshots
    console.log('→ Capturing per-table screenshots...');
    for (let i = 0; i < domProbe.tables.length; i++) {
      const f = await captureTable(page, i, 1440);
      if (f) {
        console.log(`  ${f}`);
        results.tables.push(f);
      }
    }

    // Bug crops: overflow issues
    if (domProbe.overflowIssues && domProbe.overflowIssues.length > 0) {
      console.log(`→ ${domProbe.overflowIssues.length} overflow issues detected — capturing...`);
      for (let i = 0; i < Math.min(domProbe.overflowIssues.length, 5); i++) {
        const issue = domProbe.overflowIssues[i];
        const fname = `bug-${i}-overflow-${issue.tag.toLowerCase()}.png`;
        await page.screenshot({ path: path.join(OUT_DIR, fname), fullPage: false });
        console.log(`  ${fname}`);
      }
    }

    await ctx.close();
  }

  // ── 1280×800 full page ──────────────────────────────────────────────────────
  console.log('→ Launching 1280×800 viewport...');
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: TIMEOUT });
    await wait(1500);
    await scrollFullPage(page);
    await page.screenshot({ path: path.join(OUT_DIR, 'full-page-1280.png'), fullPage: true });
    console.log('  saved full-page-1280.png');
    await ctx.close();
  }

  // ── 390×844 mobile ─────────────────────────────────────────────────────────
  console.log('→ Launching 390×844 mobile viewport...');
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: TIMEOUT });
    await wait(1500);
    await scrollFullPage(page);
    await page.screenshot({ path: path.join(OUT_DIR, 'full-page-mobile-390.png'), fullPage: true });
    console.log('  saved full-page-mobile-390.png');
    await ctx.close();
  }

  await browser.close();

  // Save console errors
  const consoleErrors = [...consoleMessages];
  if (consoleErrors.length > 0) {
    const errText = consoleErrors.map(e => `[${e.type}] ${e.text}`).join('\n');
    fs.writeFileSync(path.join(OUT_DIR, 'console-errors.txt'), errText);
    console.log(`→ ${consoleErrors.length} console messages saved`);
  } else {
    console.log('→ No console errors');
  }

  const elapsed = Math.round((Date.now() - startTime) / 1000);

  // Build naming map
  const domProbe = results.domProbe;
  const chartNames = domProbe.charts.map((c, i) => {
    const series = c.seriesType || '';
    return `chart-${i} = series-type:${series.slice(0,40)} · points:${c.pointCount}`;
  });
  const tableNames = domProbe.tables.map((t, i) => {
    return `table-${i} = ${t.rowCount} rows × ${t.colCount} cols`;
  });
  const sectionNames = domProbe.sections.map((s, i) => {
    const label = s.h2Text || s.ariaLabel || s.id || `unlabeled`;
    return `section-${String(i).padStart(2,'0')} = ${label.slice(0,60)}`;
  });

  const files = fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.png') || f.endsWith('.json') || f.endsWith('.txt'));
  const pngCount = files.filter(f => f.endsWith('.png')).length;
  const sectionPngs = files.filter(f => f.startsWith('section-'));
  const chartPngs = files.filter(f => f.startsWith('chart-'));
  const tablePngs = files.filter(f => f.startsWith('table-'));
  const bugPngs = files.filter(f => f.startsWith('bug-'));

  // Visible issues during capture (raw observations)
  const visibleIssues = [];
  if (domProbe.overflowIssues && domProbe.overflowIssues.length > 0) {
    domProbe.overflowIssues.slice(0, 5).forEach((o, i) => {
      visibleIssues.push(`- overflow-${i}: ${o.tag} [${o.class.slice(0,40)}] overflows by ${o.bbox.overflow}px`);
    });
  }
  if (domProbe.charts.length > 0) {
    domProbe.charts.forEach((c, i) => {
      if (c.hasOverflow) visibleIssues.push(`- chart-${i}: hasOverflow=true (scrollWidth > clientWidth)`);
    });
  }

  const captureNotes = `# Showcase Capture · 2026-05-25

## Page stats
- Total height: ${domProbe.page.totalHeight}px
- Viewport tested: 1440 · 1280 · 390
- Sections: ${domProbe.sections.length}
- Charts: ${domProbe.charts.length}
- Tables: ${domProbe.tables.length}
- Headings: ${domProbe.headings.length}
- Console errors: ${consoleErrors.length}
- Overflow issues detected: ${domProbe.overflowIssues.length}

## Files in this dir
- full-page-*.png · 3 files
- section-*.png · ${sectionPngs.length} files
- chart-*.png · ${chartPngs.length} files (idle+hover pairs)
- table-*.png · ${tablePngs.length} files
- bug-*.png · ${bugPngs.length} files (suspected issues)
- dom-probe.json · raw DOM measurements
${consoleErrors.length > 0 ? '- console-errors.txt · runtime errors' : '- console-errors.txt · (none)'}

## Visible issues spotted during capture (raw observation · NO fix recommendation)
${visibleIssues.length > 0 ? visibleIssues.join('\n') : '- None observed at capture time — see dom-probe.json for overflow data'}

## Section naming map
${sectionNames.map(s => `- ${s}`).join('\n')}

## Chart naming map (DOM order)
${chartNames.map(c => `- ${c}`).join('\n')}

## Table naming map
${tableNames.map(t => `- ${t}`).join('\n')}

## Heading structure
${domProbe.headings.slice(0, 30).map(h => `- ${h.tag} | "${h.text.slice(0,60)}" | ${h.fontSize} | ${h.fontWeight}`).join('\n')}

## Time used: ${elapsed}s
## Model: aura-qa Sonnet
`;

  fs.writeFileSync(path.join(OUT_DIR, 'CAPTURE-NOTES.md'), captureNotes);
  console.log('\n→ CAPTURE-NOTES.md saved');
  console.log(`→ Total PNGs: ${pngCount}`);
  console.log(`→ Time: ${elapsed}s`);
}

runCapture().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
