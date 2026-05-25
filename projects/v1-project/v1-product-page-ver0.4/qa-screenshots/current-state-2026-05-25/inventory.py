"""
Exhaustive chart + table inventory for v0.4 PDP
Target: http://localhost:3040/test/phase-2
Viewport: 1440x900 desktop + 390x844 mobile spot-checks
"""

import json
import os
import time
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT_DIR = Path("/Users/vishalchauchan/Downloads/Anti-folder01/projects/v1-project/v1-product-page-ver0.4/qa-screenshots/current-state-2026-05-25")
OUT_DIR.mkdir(parents=True, exist_ok=True)

URL = "http://localhost:3040/test/phase-2"

# ── Probe JS (injected after full scroll) ─────────────────────────────────────
PROBE_JS = """
() => {
  const items = [];

  // Highcharts containers
  document.querySelectorAll('.highcharts-container').forEach((c, idx) => {
    const section = c.closest('section');
    const bbox = c.getBoundingClientRect();
    items.push({
      type: 'highcharts',
      index: idx,
      sectionId: section ? section.id : 'unknown',
      sectionHeading: (section && section.querySelector('h2,h3')) ? section.querySelector('h2,h3').textContent.trim().slice(0,80) : 'none',
      bboxTop: Math.round(bbox.top + window.scrollY),
      bboxLeft: Math.round(bbox.left),
      bboxWidth: Math.round(bbox.width),
      bboxHeight: Math.round(bbox.height),
      seriesClasses: Array.from(c.querySelectorAll('[class*="highcharts-series"]')).slice(0,6).map(e => (e.className && e.className.baseVal) ? e.className.baseVal : String(e.className)).join(' | '),
      pointColors: Array.from(c.querySelectorAll('.highcharts-point')).slice(0,10).map(p => p.getAttribute('fill') || window.getComputedStyle(p).fill),
      hasDataLabels: !!c.querySelector('.highcharts-data-label'),
      dataLabelSamples: Array.from(c.querySelectorAll('.highcharts-data-label text')).slice(0,6).map(t => t.textContent),
      tooltipBG: c.querySelector('.highcharts-tooltip-box') ? window.getComputedStyle(c.querySelector('.highcharts-tooltip-box')).backgroundColor : 'no-tooltip-rendered',
      axisLabelColor: c.querySelector('.highcharts-axis-labels text') ? window.getComputedStyle(c.querySelector('.highcharts-axis-labels text')).color : 'no-axis',
      gridLineStroke: c.querySelector('.highcharts-grid-line') ? (c.querySelector('.highcharts-grid-line').getAttribute('stroke') || 'no-attr') : 'no-gridline',
      legendItemText: Array.from(c.querySelectorAll('.highcharts-legend-item text')).slice(0,6).map(t => t.textContent),
      legendItemColor: c.querySelector('.highcharts-legend-item text') ? window.getComputedStyle(c.querySelector('.highcharts-legend-item text')).fill : 'no-legend',
      xAxisText: Array.from(c.querySelectorAll('.highcharts-xaxis-labels text')).slice(0,6).map(t => t.textContent),
      yAxisText: Array.from(c.querySelectorAll('.highcharts-yaxis-labels text')).slice(0,6).map(t => t.textContent),
    });
  });

  // Native tables and [data-component*="Table"]
  document.querySelectorAll('table, [data-component*="Table"]').forEach((t, idx) => {
    const section = t.closest('section');
    const bbox = t.getBoundingClientRect();
    const firstTr = t.querySelector('tr');
    items.push({
      type: 'table',
      index: idx,
      sectionId: section ? section.id : 'unknown',
      sectionHeading: (section && section.querySelector('h2,h3')) ? section.querySelector('h2,h3').textContent.trim().slice(0,80) : 'none',
      component: t.getAttribute('data-component') || 'native-table',
      bboxTop: Math.round(bbox.top + window.scrollY),
      bboxWidth: Math.round(bbox.width),
      bboxHeight: Math.round(bbox.height),
      rowCount: t.querySelectorAll('tr').length,
      colCount: t.querySelectorAll('thead th, thead td').length || t.querySelectorAll('tbody tr:first-child td').length,
      headerBG: t.querySelector('th') ? window.getComputedStyle(t.querySelector('th')).backgroundColor : 'no-th',
      headerColor: t.querySelector('th') ? window.getComputedStyle(t.querySelector('th')).color : 'no-th',
      headerFontWeight: t.querySelector('th') ? window.getComputedStyle(t.querySelector('th')).fontWeight : 'no-th',
      headerSticky: t.querySelector('th') ? window.getComputedStyle(t.querySelector('th')).position : 'no-th',
      rowHeight: firstTr ? Math.round(firstTr.getBoundingClientRect().height) : 0,
      borderCollapse: window.getComputedStyle(t).borderCollapse,
      hasAltRow: !!t.querySelector('tr:nth-child(even)'),
      verticalGridWidth: t.querySelector('td') ? window.getComputedStyle(t.querySelector('td')).borderRightWidth : 'no-td',
      sampleCellBG: t.querySelector('td') ? window.getComputedStyle(t.querySelector('td')).backgroundColor : 'no-td',
      firstRowText: firstTr ? Array.from(firstTr.querySelectorAll('th,td')).slice(0,5).map(c => c.textContent.trim().slice(0,30)) : [],
    });
  });

  // Custom grids, treemaps, heatmaps
  document.querySelectorAll('[role="grid"],[data-component*="Treemap"],[data-component*="treemap"],[data-component*="Heatmap"],[data-component*="heatmap"],[data-chart-type]').forEach((g, idx) => {
    const section = g.closest('section');
    const bbox = g.getBoundingClientRect();
    items.push({
      type: 'custom-grid',
      index: idx,
      sectionId: section ? section.id : 'unknown',
      component: g.getAttribute('data-component') || g.getAttribute('data-chart-type') || g.getAttribute('role'),
      childCount: g.children.length,
      bboxTop: Math.round(bbox.top + window.scrollY),
      bboxWidth: Math.round(bbox.width),
      bboxHeight: Math.round(bbox.height),
      colors: Array.from(g.children).slice(0,8).map(c => window.getComputedStyle(c).backgroundColor),
    });
  });

  return items;
}
"""

SECTION_PROBE_JS = """
() => {
  const sections = [];
  document.querySelectorAll('section, [data-section]').forEach(s => {
    const h = s.querySelector('h2,h3,h1');
    const bbox = s.getBoundingClientRect();
    sections.push({
      id: s.id || 'no-id',
      dataSection: s.getAttribute('data-section') || '',
      heading: h ? h.textContent.trim().slice(0,80) : 'no-heading',
      tag: s.tagName,
      bboxTop: Math.round(bbox.top + window.scrollY),
      bboxHeight: Math.round(bbox.height),
      hasHighcharts: !!s.querySelector('.highcharts-container'),
      hasTable: !!s.querySelector('table, [data-component*="Table"]'),
      hasCanvas: !!s.querySelector('canvas'),
      hasCustomGrid: !!s.querySelector('[role="grid"],[data-component*="Treemap"],[data-component*="Heatmap"]'),
    });
  });
  return sections;
}
"""


def scroll_and_screenshot(page, out_dir, prefix="desktop"):
    """Scroll in steps, screenshot each newly-visible chart/table."""
    page_height = page.evaluate("() => document.body.scrollHeight")
    print(f"  Page height: {page_height}px")

    seen_containers = set()
    screenshots = []
    step = 500
    y = 0

    while y <= page_height + step:
        page.evaluate(f"window.scrollTo(0, {y})")
        page.wait_for_timeout(300)

        # Find all highcharts containers visible in this scroll position
        containers = page.locator('.highcharts-container').all()
        for i, container in enumerate(containers):
            try:
                if not container.is_visible():
                    continue
                bbox = container.bounding_box()
                if not bbox:
                    continue
                key = f"hc-{round(bbox['x'])}-{round(bbox['y'] + y)}"
                abs_y = round(bbox['y'] + y)
                key = f"hc-{round(bbox['x'])}-{abs_y}"
                if key not in seen_containers:
                    seen_containers.add(key)
                    # Scroll so chart is in view
                    page.evaluate(f"window.scrollTo(0, {max(0, abs_y - 200)})")
                    page.wait_for_timeout(500)
                    name = f"{prefix}-chart-{len(seen_containers):02d}-idle.png"
                    path = out_dir / name
                    page.screenshot(path=str(path), clip={
                        'x': max(0, bbox['x'] - 20),
                        'y': max(0, bbox['y'] - 20),
                        'width': min(bbox['width'] + 40, 1440),
                        'height': min(bbox['height'] + 40, 900)
                    })
                    screenshots.append({'file': name, 'type': 'highcharts', 'abs_y': abs_y})
                    print(f"  Screenshot: {name} at abs_y={abs_y}")

                    # Try hover on center of chart
                    try:
                        cx = bbox['x'] + bbox['width'] / 2
                        cy = bbox['y'] + bbox['height'] / 2
                        page.mouse.move(cx, cy)
                        page.wait_for_timeout(400)
                        hover_name = f"{prefix}-chart-{len(seen_containers):02d}-hover.png"
                        hover_path = out_dir / hover_name
                        page.screenshot(path=str(hover_path), clip={
                            'x': max(0, bbox['x'] - 20),
                            'y': max(0, bbox['y'] - 20),
                            'width': min(bbox['width'] + 40, 1440),
                            'height': min(bbox['height'] + 40, 900)
                        })
                        screenshots[-1]['hover_file'] = hover_name
                        print(f"  Hover shot: {hover_name}")
                    except Exception as e:
                        print(f"  Hover failed: {e}")
            except Exception as e:
                print(f"  Container error: {e}")

        # Tables
        tables = page.locator('table, [data-component*="Table"]').all()
        for i, table in enumerate(tables):
            try:
                if not table.is_visible():
                    continue
                bbox = table.bounding_box()
                if not bbox:
                    continue
                abs_y = round(bbox['y'] + y)
                key = f"tbl-{round(bbox['x'])}-{abs_y}"
                if key not in seen_containers:
                    seen_containers.add(key)
                    page.evaluate(f"window.scrollTo(0, {max(0, abs_y - 200)})")
                    page.wait_for_timeout(400)
                    name = f"{prefix}-table-{len(seen_containers):02d}-idle.png"
                    path = out_dir / name
                    page.screenshot(path=str(path), clip={
                        'x': max(0, bbox['x'] - 20),
                        'y': max(0, bbox['y'] - 20),
                        'width': min(bbox['width'] + 40, 1440),
                        'height': min(bbox['height'] + 40, 900)
                    })
                    screenshots.append({'file': name, 'type': 'table', 'abs_y': abs_y})
                    print(f"  Table shot: {name} at abs_y={abs_y}")
            except Exception as e:
                print(f"  Table error: {e}")

        y += step

    return page_height, screenshots


def main():
    with sync_playwright() as p:
        # ── Desktop run ────────────────────────────────────────────────────────
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        print("Loading page...")
        page.goto(URL, wait_until="domcontentloaded")
        page.wait_for_timeout(3000)

        # Wait for Highcharts to boot (up to 15s)
        try:
            page.wait_for_selector('.highcharts-container', timeout=15000)
            print("Highcharts detected.")
        except:
            print("WARNING: No .highcharts-container found on initial load.")

        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)

        # Full-page desktop screenshot first
        full_page_path = OUT_DIR / "desktop-full-page.png"
        page.screenshot(path=str(full_page_path), full_page=True)
        print(f"Full-page desktop screenshot saved.")

        # Section inventory
        print("\n--- Section probe ---")
        sections = page.evaluate(SECTION_PROBE_JS)
        print(f"Found {len(sections)} sections")
        for s in sections:
            viz_flags = []
            if s['hasHighcharts']: viz_flags.append('HC')
            if s['hasTable']: viz_flags.append('TBL')
            if s['hasCanvas']: viz_flags.append('CANVAS')
            if s['hasCustomGrid']: viz_flags.append('GRID')
            flag_str = f" [{', '.join(viz_flags)}]" if viz_flags else " [prose]"
            print(f"  id={s['id']!r:30s} top={s['bboxTop']:6d}px  h={s['bboxHeight']:5d}px  heading={s['heading']!r:.50s}{flag_str}")

        # Scroll + screenshot charts/tables
        print("\n--- Scroll + screenshot (desktop) ---")
        page_height, desktop_shots = scroll_and_screenshot(page, OUT_DIR, "desktop")

        # Scroll back to top, then run full DOM probe
        print("\n--- Full DOM probe ---")
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(1000)
        # Scroll to bottom once more to ensure all lazy-loaded charts are rendered
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(2000)
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(500)

        probe_results = page.evaluate(PROBE_JS)
        print(f"Probe returned {len(probe_results)} items")
        for item in probe_results:
            print(f"\n  [{item['type'].upper()}] idx={item['index']} sectionId={item.get('sectionId','?')!r}")
            if item['type'] == 'highcharts':
                print(f"    heading: {item.get('sectionHeading','')!r}")
                print(f"    bbox: top={item.get('bboxTop')} w={item.get('bboxWidth')} h={item.get('bboxHeight')}")
                print(f"    seriesClasses: {item.get('seriesClasses','')[:120]}")
                print(f"    pointColors: {item.get('pointColors',[])}")
                print(f"    hasDataLabels: {item.get('hasDataLabels')}")
                print(f"    dataLabelSamples: {item.get('dataLabelSamples',[])}")
                print(f"    tooltipBG: {item.get('tooltipBG')}")
                print(f"    axisLabelColor: {item.get('axisLabelColor')}")
                print(f"    gridLineStroke: {item.get('gridLineStroke')}")
                print(f"    legendItems: {item.get('legendItemText',[])}")
                print(f"    xAxisText: {item.get('xAxisText',[])}")
                print(f"    yAxisText: {item.get('yAxisText',[])}")
            elif item['type'] == 'table':
                print(f"    heading: {item.get('sectionHeading','')!r}")
                print(f"    component: {item.get('component')}")
                print(f"    bbox: top={item.get('bboxTop')} w={item.get('bboxWidth')} h={item.get('bboxHeight')}")
                print(f"    rows: {item.get('rowCount')} cols: {item.get('colCount')}")
                print(f"    headerBG: {item.get('headerBG')}  headerColor: {item.get('headerColor')}  fontWeight: {item.get('headerFontWeight')}")
                print(f"    headerSticky: {item.get('headerSticky')}")
                print(f"    rowHeight: {item.get('rowHeight')}px")
                print(f"    borderCollapse: {item.get('borderCollapse')}")
                print(f"    hasAltRow: {item.get('hasAltRow')}")
                print(f"    verticalGrid: {item.get('verticalGridWidth')}")
                print(f"    sampleCellBG: {item.get('sampleCellBG')}")
                print(f"    firstRowText: {item.get('firstRowText',[])}")
            elif item['type'] == 'custom-grid':
                print(f"    component: {item.get('component')}")
                print(f"    bbox: top={item.get('bboxTop')} w={item.get('bboxWidth')} h={item.get('bboxHeight')}")
                print(f"    childCount: {item.get('childCount')}")
                print(f"    colors: {item.get('colors',[])}")

        # Save probe JSON
        probe_json_path = OUT_DIR / "probe-results.json"
        with open(probe_json_path, 'w') as f:
            json.dump({
                'sections': sections,
                'probe_items': probe_results,
                'desktop_screenshots': desktop_shots,
                'page_height': page_height,
            }, f, indent=2)
        print(f"\nProbe JSON saved: {probe_json_path}")

        browser.close()

        # ── Mobile spot-checks ─────────────────────────────────────────────────
        print("\n--- Mobile spot-check (390x844) ---")
        browser = p.chromium.launch(headless=True)
        mob_context = browser.new_context(viewport={"width": 390, "height": 844})
        mob_page = mob_context.new_page()
        mob_page.goto(URL, wait_until="domcontentloaded")
        mob_page.wait_for_timeout(3000)
        try:
            mob_page.wait_for_selector('.highcharts-container', timeout=10000)
        except:
            print("  WARNING: No Highcharts on mobile viewport")
        mob_page.wait_for_load_state("networkidle")
        mob_page.wait_for_timeout(2000)

        # Full-page mobile
        mob_full_path = OUT_DIR / "mobile-full-page.png"
        mob_page.screenshot(path=str(mob_full_path), full_page=True)
        print("Full-page mobile screenshot saved.")

        # Mobile chart/table shots
        mob_page_height, mobile_shots = scroll_and_screenshot(mob_page, OUT_DIR, "mobile")
        browser.close()

        # ── Summary ────────────────────────────────────────────────────────────
        hc_items = [x for x in probe_results if x['type'] == 'highcharts']
        tbl_items = [x for x in probe_results if x['type'] == 'table']
        grid_items = [x for x in probe_results if x['type'] == 'custom-grid']
        sections_with_viz = [s for s in sections if s['hasHighcharts'] or s['hasTable'] or s['hasCanvas'] or s['hasCustomGrid']]
        sections_prose = [s for s in sections if not (s['hasHighcharts'] or s['hasTable'] or s['hasCanvas'] or s['hasCustomGrid'])]
        all_shots = desktop_shots + mobile_shots

        print(f"\n{'='*60}")
        print(f"SUMMARY")
        print(f"{'='*60}")
        print(f"  Page height:          {page_height}px")
        print(f"  Total sections:       {len(sections)}")
        print(f"  Sections with viz:    {len(sections_with_viz)}")
        print(f"  Sections prose-only:  {len(sections_prose)}")
        print(f"  Highcharts charts:    {len(hc_items)}")
        print(f"  Tables:               {len(tbl_items)}")
        print(f"  Custom grids:         {len(grid_items)}")
        print(f"  Desktop screenshots:  {len(desktop_shots)}")
        print(f"  Mobile screenshots:   {len(mobile_shots)}")
        print(f"  Total screenshots:    {len(all_shots) + 2}  (+ 2 full-page)")
        print(f"  Output dir:           {OUT_DIR}")

        # List prose-only sections
        if sections_prose:
            print(f"\nProse-only sections (no chart/table):")
            for s in sections_prose:
                print(f"  id={s['id']!r}  heading={s['heading']!r}")

        print(f"\nDone.")


if __name__ == "__main__":
    main()
