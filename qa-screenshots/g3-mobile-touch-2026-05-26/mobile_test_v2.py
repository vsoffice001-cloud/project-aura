"""
Sprint G.3 Mobile/Touch QA v2
- Screenshots at 390x844 viewport
- DOM probes for mobile implementations
- Navigate via URL params/hash since sidebar hidden at mobile
"""
import os
import json
import glob
from playwright.sync_api import sync_playwright

OUTPUT_DIR = "/Users/vishalchauchan/Downloads/Anti-folder01/qa-screenshots/g3-mobile-touch-2026-05-26"
BASE_URL = "http://localhost:3070"

results = {}

def screenshot_chart(page, demo_id, filename, probe_fn=None):
    """Navigate to demo by clicking nav or scrolling, screenshot and optionally probe DOM."""
    page.goto(f"{BASE_URL}")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(1000)
    # Use hash anchor to scroll to demo
    page.evaluate(f"""() => {{
        const el = document.getElementById('{demo_id}');
        if (el) el.scrollIntoView({{ behavior: 'instant' }});
    }}""")
    page.wait_for_timeout(800)
    page.screenshot(path=f"{OUTPUT_DIR}/{filename}", full_page=False)
    probe_result = None
    if probe_fn:
        probe_result = page.evaluate(probe_fn)
    return probe_result

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(
        viewport={"width": 390, "height": 844},
        device_scale_factor=2,
        is_mobile=True,
        has_touch=True,
        user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15"
    )
    page = context.new_page()

    # ── 1. Initial load ──────────────────────────────────────────────────────
    print("1. Initial showcase load at 390px...")
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01-showcase-home-mobile.png")
    print("   ✓")

    # ── 2. Column chart — verify x-axis rotation ─────────────────────────────
    print("2. KenColumnChart — x-axis rotation at 390px...")
    xaxis_rotation = screenshot_chart(
        page, "chart-column", "02-column-chart-390.png",
        """() => {
            const labels = document.querySelectorAll('.highcharts-xaxis-labels text');
            if (!labels.length) return { found: false };
            const transforms = Array.from(labels).slice(0, 3).map(el => ({
                transform: el.getAttribute('transform') || 'none',
                text: el.textContent?.trim()
            }));
            return { found: true, count: labels.length, transforms };
        }"""
    )
    print(f"   x-axis rotation: {xaxis_rotation}")
    results["column_xaxis_rotation_390"] = xaxis_rotation

    # Verify -45 is present
    if xaxis_rotation and xaxis_rotation.get("transforms"):
        has_rotation = any("rotate(-45" in str(t.get("transform","")) for t in xaxis_rotation["transforms"])
        results["column_rotation_verified"] = has_rotation
        print(f"   -45deg rotation: {'✓ YES' if has_rotation else '✗ NO'}")

    # ── 3. Donut chart — dataLabels hidden at mobile ──────────────────────────
    print("3. KenDonutChart — dataLabels suppressed at 390px...")
    donut_probe = screenshot_chart(
        page, "chart-donut", "03-donut-390.png",
        """() => {
            const labels = document.querySelectorAll('.highcharts-data-label');
            const visible = Array.from(labels).filter(el => {
                const v = el.getAttribute('visibility');
                const s = window.getComputedStyle(el);
                return v !== 'hidden' && s.visibility !== 'hidden' && s.display !== 'none';
            });
            // Also check SVG visibility attr
            const hiddenByAttr = Array.from(labels).filter(el => el.getAttribute('visibility') === 'hidden').length;
            return {
                total: labels.length,
                visible: visible.length,
                hiddenByAttr,
                sample: labels[0] ? labels[0].getAttribute('visibility') : 'no-labels'
            };
        }"""
    )
    print(f"   Donut labels: {donut_probe}")
    results["donut_labels_390"] = donut_probe

    # ── 4. Heatmap — overflow-x + overscroll-behavior ────────────────────────
    print("4. KenHeatmap — scroll wrapper at 390px...")
    heatmap_probe = screenshot_chart(
        page, "chart-heatmap", "04-heatmap-390.png",
        """() => {
            const wrappers = document.querySelectorAll('[class*="overflow-x"]');
            const results = [];
            wrappers.forEach(el => {
                const s = window.getComputedStyle(el);
                if (s.overflowX === 'auto' || s.overflowX === 'scroll') {
                    results.push({
                        overflowX: s.overflowX,
                        overscrollBehaviorX: s.overscrollBehaviorX || 'not-set',
                        className: el.className?.toString().substring(0, 50)
                    });
                }
            });
            return { found: results.length > 0, wrappers: results };
        }"""
    )
    print(f"   Heatmap overflow: {heatmap_probe}")
    results["heatmap_scroll_390"] = heatmap_probe

    # ── 5. Gantt Timeline — scroll wrapper ───────────────────────────────────
    print("5. KenGanttTimeline — scroll wrapper at 390px...")
    gantt_probe = screenshot_chart(
        page, "chart-gantt", "05-gantt-390.png",
        """() => {
            const overflowWrappers = document.querySelectorAll('[class*="overflow-x"]');
            const results = [];
            overflowWrappers.forEach(el => {
                const s = window.getComputedStyle(el);
                if (s.overflowX === 'auto' || s.overflowX === 'scroll') {
                    results.push({
                        overflowX: s.overflowX,
                        overscrollBehaviorX: s.overscrollBehaviorX || 'not-set',
                        hasRoleTable: !!el.querySelector('[role="table"]'),
                        minWidth: el.querySelector('[role="table"]')
                            ? window.getComputedStyle(el.querySelector('[role="table"]')).minWidth
                            : 'no-table'
                    });
                }
            });
            return { found: results.length > 0, wrappers: results.slice(0, 3) };
        }"""
    )
    print(f"   Gantt scroll: {gantt_probe}")
    results["gantt_scroll_390"] = gantt_probe

    # ── 6. TableShell — overscroll-behavior-x contain ────────────────────────
    print("6. TableShell — overscroll-behavior-x contain...")
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(1000)
    # TableShell is in PropertyTable and RankingTable demos
    page.evaluate("""() => {
        const el = document.getElementById('chart-property-table') ||
                   document.getElementById('table-property') ||
                   document.querySelector('[data-tableshell-id]')?.closest('section');
        if (el) el.scrollIntoView({ behavior: 'instant' });
    }""")
    page.wait_for_timeout(800)
    page.screenshot(path=f"{OUTPUT_DIR}/06-tableshell-390.png", full_page=False)

    tableshell_probe = page.evaluate("""() => {
        const shells = document.querySelectorAll('[data-tableshell-id]');
        const results = [];
        shells.forEach(el => {
            const s = window.getComputedStyle(el);
            results.push({
                overflowX: s.overflowX,
                overscrollBehaviorX: s.overscrollBehaviorX || 'not-set',
                id: el.getAttribute('data-tableshell-id')?.substring(0, 10)
            });
        });
        return { found: shells.length > 0, count: shells.length, samples: results.slice(0, 3) };
    }""")
    print(f"   TableShell probe: {tableshell_probe}")
    results["tableshell_390"] = tableshell_probe

    # ── 7. DualColumn chart — 600px min-width scroll ─────────────────────────
    print("7. KenDualColumnChart — 600px scroll wrapper...")
    dual_probe = screenshot_chart(
        page, "chart-dual-column", "07-dual-column-390.png",
        """() => {
            // Find div with minWidth 600px
            const divs = document.querySelectorAll('div');
            for (const el of divs) {
                const s = window.getComputedStyle(el);
                if (s.minWidth === '600px') {
                    const wrapper = el.parentElement;
                    const ws = wrapper ? window.getComputedStyle(wrapper) : null;
                    return {
                        found: true,
                        minWidth: s.minWidth,
                        wrapperOverflowX: ws?.overflowX || 'no-parent',
                        wrapperOverscroll: ws?.overscrollBehaviorX || 'not-set'
                    };
                }
            }
            return { found: false, note: 'No div with minWidth=600px found' };
        }"""
    )
    print(f"   DualColumn scroll: {dual_probe}")
    results["dual_column_scroll_390"] = dual_probe

    # ── 8. MultiLine chart — 700px min-width scroll ───────────────────────────
    print("8. KenMultiLineChart — 700px scroll wrapper...")
    multi_probe = screenshot_chart(
        page, "chart-multiline", "08-multiline-390.png",
        """() => {
            const divs = document.querySelectorAll('div');
            for (const el of divs) {
                const s = window.getComputedStyle(el);
                if (s.minWidth === '700px') {
                    const wrapper = el.parentElement;
                    const ws = wrapper ? window.getComputedStyle(wrapper) : null;
                    return {
                        found: true,
                        minWidth: s.minWidth,
                        wrapperOverflowX: ws?.overflowX || 'no-parent'
                    };
                }
            }
            return { found: false, note: 'No div with minWidth=700px found' };
        }"""
    )
    print(f"   MultiLine scroll: {multi_probe}")
    results["multiline_scroll_390"] = multi_probe

    # ── 9. Bubble chart — smaller bubbles at mobile ────────────────────────────
    print("9. KenBubbleChart — simplified at 390px...")
    bubble_probe = screenshot_chart(
        page, "chart-bubble", "09-bubble-390.png",
        """() => {
            const bubbles = document.querySelectorAll('.highcharts-bubble-series circle');
            const labels = document.querySelectorAll('.highcharts-bubble-series .highcharts-data-label');
            const visibleLabels = Array.from(labels).filter(el => {
                return el.getAttribute('visibility') !== 'hidden';
            });
            return {
                bubbles: bubbles.length,
                totalLabels: labels.length,
                visibleLabels: visibleLabels.length
            };
        }"""
    )
    print(f"   Bubble probe: {bubble_probe}")
    results["bubble_390"] = bubble_probe

    # ── 10. ScenarioFanChart at mobile ───────────────────────────────────────
    print("10. KenScenarioFanChart — simplified at 390px...")
    fan_probe = screenshot_chart(
        page, "chart-scenario-fan", "10-scenario-fan-390.png",
        """() => {
            const xLabels = document.querySelectorAll('.highcharts-xaxis-labels text');
            const plotLineLabels = document.querySelectorAll('.highcharts-plot-line-label');
            // Check rotation on x labels
            const rotated = Array.from(xLabels).filter(el => {
                const t = el.getAttribute('transform') || '';
                return t.includes('rotate(-45');
            });
            return {
                xLabelCount: xLabels.length,
                rotatedCount: rotated.length,
                plotLineLabels: plotLineLabels.length,
                firstPlotLabelVisible: plotLineLabels[0]
                    ? plotLineLabels[0].getAttribute('visibility') || 'visible'
                    : 'none'
            };
        }"""
    )
    print(f"   ScenarioFan probe: {fan_probe}")
    results["scenario_fan_390"] = fan_probe

    # ── 11. CellTooltip — touch handler verification ──────────────────────────
    print("11. CellTooltip — touch event handlers present...")
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(1000)
    cell_probe = page.evaluate("""() => {
        // display:contents spans = CellTooltip trigger wrappers
        const spans = Array.from(document.querySelectorAll('span')).filter(el => {
            const s = window.getComputedStyle(el);
            return s.display === 'contents';
        });
        return {
            count: spans.length,
            sampleStyle: spans[0]?.getAttribute('style')?.substring(0, 60) || 'none'
        };
    }""")
    print(f"   CellTooltip wrappers: {cell_probe}")
    results["cell_tooltip_390"] = cell_probe

    # ── Save results ──────────────────────────────────────────────────────────
    with open(f"{OUTPUT_DIR}/probe-results.json", "w") as f:
        json.dump(results, f, indent=2)

    screenshots = sorted(glob.glob(f"{OUTPUT_DIR}/*.png"))
    print(f"\n── SUMMARY ─────────────────────────────────────────────────────")
    print(f"Screenshots: {len(screenshots)}")
    for s in screenshots:
        size_kb = os.path.getsize(s) // 1024
        print(f"  {os.path.basename(s)} ({size_kb}KB)")

    print(f"\nColumn x-axis -45° rotation: {'✓ PASS' if results.get('column_rotation_verified') else '✗ CHECK'}")
    print(f"Heatmap overflow-x auto: {'✓ PASS' if results.get('heatmap_scroll_390', {}).get('found') else '✗ CHECK'}")
    print(f"Gantt scroll wrapper: {'✓ PASS' if results.get('gantt_scroll_390', {}).get('found') else '✗ CHECK'}")
    print(f"DualColumn 600px min-width: {'✓ PASS' if results.get('dual_column_scroll_390', {}).get('found') else '✗ CHECK'}")
    print(f"MultiLine 700px min-width: {'✓ PASS' if results.get('multiline_scroll_390', {}).get('found') else '✗ CHECK'}")
    print(f"TableShell found: {'✓ PASS' if results.get('tableshell_390', {}).get('found') else '✗ CHECK'}")
    print(f"CellTooltip wrappers: {results.get('cell_tooltip_390', {}).get('count', 0)} found")

    browser.close()

print("\nSprint G.3 mobile QA complete.")
