"""
B2 Rebuild QA Screenshot Script
Captures screenshots at 1440 and 390, console errors, and section shots.
"""

from playwright.sync_api import sync_playwright
import os

OUT = "/Users/vishalchauchan/Downloads/Anti-folder01/projects/charts-showcase/qa-screenshots/b2-rebuild-2026-05-25"
URL = "http://localhost:3070"

console_errors = []
console_warnings = []

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # ── 1440 full-page ──────────────────────────────────────────
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.on("console", lambda msg: (
            console_errors.append(f"[{msg.type}] {msg.text}") if msg.type == "error" else
            console_warnings.append(f"[warn] {msg.text}") if msg.type == "warning" else None
        ))
        page.goto(URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)

        # Check body background
        body_bg = page.evaluate("() => getComputedStyle(document.body).backgroundColor")
        print(f"Body BG: {body_bg}")

        # Check grid layout at 1440
        grid_cols = page.evaluate("""() => {
            const grid = document.querySelector('.showcase-grid');
            if (!grid) return 'no .showcase-grid found';
            return getComputedStyle(grid).gridTemplateColumns;
        }""")
        print(f"Grid columns at 1440: {grid_cols}")

        # Check sidebar visibility
        sidebar_display = page.evaluate("""() => {
            const sb = document.getElementById('showcase-sidebar-desktop');
            if (!sb) return 'sidebar not found';
            return getComputedStyle(sb).display;
        }""")
        print(f"Sidebar display: {sidebar_display}")

        # Full page screenshot at 1440
        page.screenshot(path=f"{OUT}/full-1440.png", full_page=True)
        print("Saved full-1440.png")

        # Viewport (above fold)
        page.screenshot(path=f"{OUT}/above-fold-1440.png", full_page=False)
        print("Saved above-fold-1440.png")

        # Scroll to charts section
        charts_el = page.query_selector("#chart-column")
        if charts_el:
            charts_el.scroll_into_view_if_needed()
            page.wait_for_timeout(800)
            page.screenshot(path=f"{OUT}/section-charts.png", full_page=False)
            print("Saved section-charts.png")
        else:
            print("WARNING: #chart-column not found")

        # Scroll to tables section
        tables_el = page.query_selector("#table-property")
        if tables_el:
            tables_el.scroll_into_view_if_needed()
            page.wait_for_timeout(800)
            page.screenshot(path=f"{OUT}/section-tables.png", full_page=False)
            print("Saved section-tables.png")
        else:
            print("WARNING: #table-property not found")

        # Scroll to states section
        states_el = page.query_selector("#state-chartskeleton")
        if states_el:
            states_el.scroll_into_view_if_needed()
            page.wait_for_timeout(800)
            page.screenshot(path=f"{OUT}/section-states.png", full_page=False)
            print("Saved section-states.png")
        else:
            print("WARNING: #state-chartskeleton not found")

        # Check right panel visible at 1440
        right_panel_display = page.evaluate("""() => {
            const rp = document.querySelector('aside[aria-label="Component inspector"]');
            if (!rp) return 'right panel not found';
            return getComputedStyle(rp).display;
        }""")
        print(f"Right panel display at 1440: {right_panel_display}")

        # Get page H1
        h1 = page.query_selector("h1")
        if h1:
            print(f"H1 text: {h1.inner_text()}")

        # Check how many demo sections rendered
        demo_sections = page.query_selector_all("section[id]")
        print(f"Demo sections with IDs: {len(demo_sections)}")
        for s in demo_sections[:5]:
            print(f"  - #{s.get_attribute('id')}")

        page.close()

        # ── 390 mobile ──────────────────────────────────────────────
        page_mobile = browser.new_page(viewport={"width": 390, "height": 844})
        page_mobile.on("console", lambda msg: (
            console_errors.append(f"[MOBILE][{msg.type}] {msg.text}") if msg.type == "error" else None
        ))
        page_mobile.goto(URL)
        page_mobile.wait_for_load_state("networkidle")
        page_mobile.wait_for_timeout(1500)

        mobile_body_bg = page_mobile.evaluate("() => getComputedStyle(document.body).backgroundColor")
        print(f"Mobile body BG: {mobile_body_bg}")

        mobile_grid = page_mobile.evaluate("""() => {
            const grid = document.querySelector('.showcase-grid');
            if (!grid) return 'no grid';
            return getComputedStyle(grid).gridTemplateColumns;
        }""")
        print(f"Mobile grid columns: {mobile_grid}")

        page_mobile.screenshot(path=f"{OUT}/mobile-390.png", full_page=True)
        print("Saved mobile-390.png")
        page_mobile.close()

        browser.close()

    # ── Report ──────────────────────────────────────────────────────
    print("\n" + "="*60)
    print("CONSOLE ERRORS:")
    if console_errors:
        for e in console_errors:
            print(f"  {e}")
    else:
        print("  0 errors")

    print("\nCONSOLE WARNINGS (first 5):")
    for w in console_warnings[:5]:
        print(f"  {w}")

    print(f"\nTotal errors: {len(console_errors)}")
    print(f"Total warnings: {len(console_warnings)}")

if __name__ == "__main__":
    run()
