"""
Sprint G.3 Mobile/Touch QA
- Screenshots at 390x844 viewport
- DOM probes for mobile implementations
"""
import os
import json
from playwright.sync_api import sync_playwright

OUTPUT_DIR = "/Users/vishalchauchan/Downloads/Anti-folder01/qa-screenshots/g3-mobile-touch-2026-05-26"
BASE_URL = "http://localhost:3070"

results = {}

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    # Mobile viewport: iPhone 14 Pro size
    context = browser.new_context(
        viewport={"width": 390, "height": 844},
        device_scale_factor=2,
        is_mobile=True,
        has_touch=True,
        user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
    )
    page = context.new_page()

    # 1. Initial page load screenshot
    print("Loading showcase at 390px...")
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01-showcase-mobile-390.png", full_page=False)
    print("  ✓ Initial load screenshot")

    # 2. Find all demo sections in the nav
    nav_links = page.locator("nav a, aside a, [role='navigation'] a").all()
    link_texts = [l.inner_text().strip() for l in nav_links if l.inner_text().strip()]
    print(f"  Nav links found: {link_texts[:10]}")
    results["nav_links"] = link_texts[:10]

    # 3. KenColumnChart at mobile
    print("\nNavigating to ColumnChart...")
    # Try to find column chart section
    col_link = page.locator("text=Column, text=ColumnChart, [href*='column'], [href*='Column']").first
    if col_link.count() > 0:
        col_link.click()
        page.wait_for_timeout(1500)
    else:
        # Try scrolling to find it
        page.evaluate("window.scrollTo(0, 0)")

    page.screenshot(path=f"{OUTPUT_DIR}/02-column-chart-mobile.png", full_page=True)
    print("  ✓ Column chart screenshot")

    # DOM probe: check x-axis labels rotation on any Highcharts chart
    xaxis_rotation = page.evaluate("""() => {
        const svgs = document.querySelectorAll('.highcharts-xaxis-labels text');
        if (svgs.length === 0) return { found: false, count: 0 };
        const transforms = [];
        svgs.forEach(el => {
            const transform = el.getAttribute('transform') || el.style.transform || 'none';
            transforms.push(transform);
        });
        return { found: true, count: svgs.length, transforms: transforms.slice(0, 5) };
    }""")
    print(f"  x-axis labels: {xaxis_rotation}")
    results["column_xaxis_rotation"] = xaxis_rotation

    # 4. Navigate to Heatmap
    print("\nNavigating to Heatmap...")
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(1000)

    # Try to click heatmap demo
    heatmap_link = page.locator("text=/[Hh]eatmap/").first
    if heatmap_link.count() > 0:
        heatmap_link.click()
        page.wait_for_timeout(1500)

    page.screenshot(path=f"{OUTPUT_DIR}/03-heatmap-mobile.png", full_page=True)
    print("  ✓ Heatmap screenshot")

    # DOM probe: check heatmap overflow-x
    heatmap_probe = page.evaluate("""() => {
        // Look for heatmap wrapper with overflow-x
        const allDivs = document.querySelectorAll('div[class*="overflow"]');
        const results = [];
        allDivs.forEach(el => {
            const styles = window.getComputedStyle(el);
            if (styles.overflowX === 'auto' || styles.overflowX === 'scroll') {
                results.push({
                    overflowX: styles.overflowX,
                    overscrollBehaviorX: styles.overscrollBehaviorX || 'not-set',
                    className: el.className.substring(0, 60)
                });
            }
        });
        return results.slice(0, 5);
    }""")
    print(f"  Heatmap overflow probe: {heatmap_probe}")
    results["heatmap_overflow"] = heatmap_probe

    # 5. Navigate to Gantt Timeline
    print("\nNavigating to Gantt Timeline...")
    gantt_link = page.locator("text=/[Gg]antt/").first
    if gantt_link.count() > 0:
        gantt_link.click()
        page.wait_for_timeout(1500)

    page.screenshot(path=f"{OUTPUT_DIR}/04-gantt-timeline-mobile.png", full_page=True)
    print("  ✓ Gantt timeline screenshot")

    # DOM probe: Gantt overflow-x
    gantt_probe = page.evaluate("""() => {
        const role_table = document.querySelector('[role="table"]');
        if (!role_table) return { found: false };
        const wrapper = role_table.parentElement;
        if (!wrapper) return { found: true, noWrapper: true };
        const styles = window.getComputedStyle(wrapper);
        return {
            found: true,
            overflowX: styles.overflowX,
            overscrollBehaviorX: styles.overscrollBehaviorX || 'not-set',
            WebkitOverflowScrolling: styles.WebkitOverflowScrolling || styles['-webkit-overflow-scrolling'] || 'not-set'
        };
    }""")
    print(f"  Gantt overflow probe: {gantt_probe}")
    results["gantt_overflow"] = gantt_probe

    # 6. Full page scroll to find all charts + screenshot each section
    print("\nCapturing all visible charts at mobile...")
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)

    # Get page height
    page_height = page.evaluate("document.body.scrollHeight")
    print(f"  Page height: {page_height}px")

    # Screenshot at different scroll positions to capture all charts
    scroll_positions = [0, 800, 1600, 2400, 3200, 4000]
    for i, pos in enumerate(scroll_positions):
        if pos < page_height:
            page.evaluate(f"window.scrollTo(0, {pos})")
            page.wait_for_timeout(500)
            page.screenshot(path=f"{OUTPUT_DIR}/05-scroll-pos-{i}-y{pos}.png")
    print("  ✓ Scroll position screenshots taken")

    # 7. TableShell overscroll probe
    print("\nProbing TableShell overscroll-behavior...")
    tableshell_probe = page.evaluate("""() => {
        // Find tableshell wrappers
        const tableshells = document.querySelectorAll('.tableshell, [data-tableshell-id]');
        if (tableshells.length === 0) return { found: false };
        const results = [];
        tableshells.forEach(el => {
            const styles = window.getComputedStyle(el);
            results.push({
                overflowX: styles.overflowX,
                overscrollBehaviorX: styles.overscrollBehaviorX || 'not-set',
                WebkitOverflowScrolling: styles['-webkit-overflow-scrolling'] || styles.WebkitOverflowScrolling || 'not-set'
            });
        });
        return { found: true, count: tableshells.length, samples: results.slice(0, 3) };
    }""")
    print(f"  TableShell probe: {tableshell_probe}")
    results["tableshell_overscroll"] = tableshell_probe

    # 8. Donut chart at mobile
    print("\nNavigating to Donut chart...")
    donut_link = page.locator("text=/[Dd]onut/").first
    if donut_link.count() > 0:
        donut_link.click()
        page.wait_for_timeout(1500)
        page.screenshot(path=f"{OUTPUT_DIR}/06-donut-mobile.png", full_page=True)
        print("  ✓ Donut chart screenshot")

        # DOM probe: check if dataLabels are hidden at mobile
        donut_probe = page.evaluate("""() => {
            const labels = document.querySelectorAll('.highcharts-data-label');
            const visibleLabels = Array.from(labels).filter(el => {
                const style = window.getComputedStyle(el);
                return style.visibility !== 'hidden' && style.display !== 'none' && style.opacity !== '0';
            });
            return {
                total: labels.length,
                visible: visibleLabels.length,
                // Check first label visibility attribute
                firstLabelAttr: labels[0]?.getAttribute('visibility') || 'no-attr'
            };
        }""")
        print(f"  Donut labels probe: {donut_probe}")
        results["donut_labels_mobile"] = donut_probe

    # 9. CellTooltip touch behavior verification
    print("\nVerifying CellTooltip touch handlers...")
    cell_tooltip_probe = page.evaluate("""() => {
        // Check for elements with CellTooltip wrappers (span[style*="display: contents"])
        const contents_spans = document.querySelectorAll('span[style*="contents"]');
        return {
            count: contents_spans.length,
            // Verify onTouchEnd handler exists (stored as event listener — we can only check DOM)
            sample: contents_spans[0]?.getAttribute('style')?.substring(0, 80) || 'none'
        };
    }""")
    print(f"  CellTooltip wrappers: {cell_tooltip_probe}")
    results["cell_tooltip_wrappers"] = cell_tooltip_probe

    # 10. Bubble chart at mobile
    print("\nNavigating to Bubble chart...")
    bubble_link = page.locator("text=/[Bb]ubble/").first
    if bubble_link.count() > 0:
        bubble_link.click()
        page.wait_for_timeout(1500)
        page.screenshot(path=f"{OUTPUT_DIR}/07-bubble-mobile.png", full_page=True)
        print("  ✓ Bubble chart screenshot")

    # 11. DualColumn chart at mobile
    print("\nNavigating to DualColumn chart...")
    dual_link = page.locator("text=/[Dd]ual/").first
    if dual_link.count() > 0:
        dual_link.click()
        page.wait_for_timeout(1500)
        page.screenshot(path=f"{OUTPUT_DIR}/08-dual-column-mobile.png", full_page=True)

        # Verify scroll wrapper
        dual_probe = page.evaluate("""() => {
            // Find div with minWidth=600 (our scroll wrapper)
            const allDivs = document.querySelectorAll('div');
            for (const el of allDivs) {
                const styles = window.getComputedStyle(el);
                if (styles.minWidth === '600px') {
                    const wrapper = el.parentElement;
                    return {
                        found: true,
                        minWidth: styles.minWidth,
                        wrapperOverflowX: wrapper ? window.getComputedStyle(wrapper).overflowX : 'no-parent',
                        wrapperOverscroll: wrapper ? (window.getComputedStyle(wrapper).overscrollBehaviorX || 'not-set') : 'no-parent'
                    };
                }
            }
            return { found: false };
        }""")
        print(f"  DualColumn scroll wrapper: {dual_probe}")
        results["dual_column_scroll"] = dual_probe

    # 12. MultiLine chart at mobile
    print("\nNavigating to MultiLine chart...")
    multi_link = page.locator("text=/[Mm]ulti[Ll]ine|[Mm]ulti-[Ll]ine/").first
    if multi_link.count() > 0:
        multi_link.click()
        page.wait_for_timeout(1500)
        page.screenshot(path=f"{OUTPUT_DIR}/09-multiline-mobile.png", full_page=True)

        # Verify 700px min-width scroll wrapper
        multi_probe = page.evaluate("""() => {
            const allDivs = document.querySelectorAll('div');
            for (const el of allDivs) {
                const styles = window.getComputedStyle(el);
                if (styles.minWidth === '700px') {
                    const wrapper = el.parentElement;
                    return {
                        found: true,
                        minWidth: styles.minWidth,
                        wrapperOverflowX: wrapper ? window.getComputedStyle(wrapper).overflowX : 'no-parent'
                    };
                }
            }
            return { found: false };
        }""")
        print(f"  MultiLine scroll wrapper: {multi_probe}")
        results["multiline_scroll"] = multi_probe

    # Save results to JSON
    with open(f"{OUTPUT_DIR}/probe-results.json", "w") as f:
        json.dump(results, f, indent=2)
    print(f"\n✓ All probes saved to {OUTPUT_DIR}/probe-results.json")

    # List screenshots taken
    import glob
    screenshots = sorted(glob.glob(f"{OUTPUT_DIR}/*.png"))
    print(f"\n✓ Screenshots taken: {len(screenshots)}")
    for s in screenshots:
        print(f"  {os.path.basename(s)}")

    browser.close()

print("\nSprint G.3 QA complete.")
