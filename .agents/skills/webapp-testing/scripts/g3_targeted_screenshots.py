"""
Sprint G.3 — Targeted chart screenshots at 390px viewport.
Navigate to each anchor, scroll chart into view, screenshot viewport only (not full page).
"""
from playwright.sync_api import sync_playwright
import os

SCREENSHOT_DIR = "/Users/vishalchauchan/Downloads/Anti-folder01/qa-screenshots/g3-mobile-touch-2026-05-27"
BASE_URL = "http://localhost:3070"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

def save(page, filename):
    path = os.path.join(SCREENSHOT_DIR, filename)
    page.screenshot(path=path, full_page=False)
    print(f"Saved: {filename}")

def goto_and_scroll_to_chart(page, anchor, selector_hint=None):
    """Go to page, navigate to anchor, scroll chart into view."""
    page.goto(f"{BASE_URL}/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(600)
    # Navigate anchor by evaluating JS scroll
    page.evaluate(f"""() => {{
        const el = document.querySelector('{anchor}');
        if (el) el.scrollIntoView({{ behavior: 'instant', block: 'start' }});
    }}""")
    page.wait_for_timeout(1800)  # Highcharts render + ChartReveal animation

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 390, "height": 844})
    page = ctx.new_page()

    # ── Column chart: check x-axis rotation at mobile ──────────────────────────
    goto_and_scroll_to_chart(page, '#chart-column')
    save(page, 'T01-column-mobile-xaxis.png')

    # ── Donut chart: check no dataLabels at mobile ──────────────────────────────
    goto_and_scroll_to_chart(page, '#chart-donut')
    save(page, 'T02-donut-mobile-nolabels.png')

    # ── Bubble chart: top-3 labels only at mobile ───────────────────────────────
    goto_and_scroll_to_chart(page, '#chart-bubble')
    save(page, 'T03-bubble-mobile-top3.png')

    # ── Heatmap: h-scroll visible at mobile ─────────────────────────────────────
    goto_and_scroll_to_chart(page, '#chart-heatmap')
    save(page, 'T04-heatmap-mobile-scroll.png')

    # ── Gantt: h-scroll at mobile ────────────────────────────────────────────────
    goto_and_scroll_to_chart(page, '#chart-gantt-timeline')
    save(page, 'T05-gantt-mobile-scroll.png')

    # ── MultiLine: h-scroll (min-width 700) ─────────────────────────────────────
    goto_and_scroll_to_chart(page, '#chart-multiline')
    save(page, 'T06-multiline-mobile-scroll.png')

    # ── DualColumn: h-scroll (min-width 600) ────────────────────────────────────
    goto_and_scroll_to_chart(page, '#chart-dual-column')
    save(page, 'T07-dualcolumn-mobile-scroll.png')

    # ── Treemap: responsive height ───────────────────────────────────────────────
    goto_and_scroll_to_chart(page, '#chart-treemap')
    save(page, 'T08-treemap-mobile.png')

    # ── Scenario Fan: x-axis rotation at mobile ──────────────────────────────────
    goto_and_scroll_to_chart(page, '#chart-scenario-fan')
    save(page, 'T09-scenario-fan-mobile.png')

    # ── PropertyTable: h-scroll ──────────────────────────────────────────────────
    goto_and_scroll_to_chart(page, '#table-property')
    save(page, 'T10-property-table-mobile.png')

    ctx.close()
    browser.close()

print(f"\nTargeted screenshots saved to: {SCREENSHOT_DIR}")
