"""
Sprint G.3 Mobile/Touch QA Screenshots - v2
Uses direct anchor URL navigation instead of clicking hidden sidebar links.
"""
from playwright.sync_api import sync_playwright
import os

SCREENSHOT_DIR = "/Users/vishalchauchan/Downloads/Anti-folder01/qa-screenshots/g3-mobile-touch-2026-05-27"
BASE_URL = "http://localhost:3070"

os.makedirs(SCREENSHOT_DIR, exist_ok=True)

DEMOS = [
    ("02-column-chart-390.png",   "#chart-column"),
    ("03-donut-chart-390.png",    "#chart-donut"),
    ("04-bubble-chart-390.png",   "#chart-bubble"),
    ("05-heatmap-390.png",        "#chart-heatmap"),
    ("06-gantt-390.png",          "#chart-gantt-timeline"),
    ("07-multiline-390.png",      "#chart-multiline"),
    ("09-treemap-390.png",        "#chart-treemap"),
    ("10-scenario-fan-390.png",   "#chart-scenario-fan"),
]

def save(page, filename, full_page=True):
    path = os.path.join(SCREENSHOT_DIR, filename)
    page.screenshot(path=path, full_page=full_page)
    print(f"Saved: {filename}")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    # ─── Mobile 390×844 ──────────────────────────────────────────────────────────
    ctx = browser.new_context(viewport={"width": 390, "height": 844})
    page = ctx.new_page()

    # 1. Showcase homepage idle
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(1000)
    save(page, "01-showcase-390-idle.png")

    # Each chart demo via direct anchor
    for filename, anchor in DEMOS:
        page.goto(f"{BASE_URL}/{anchor}")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(1500)  # Allow Highcharts + animations to settle
        save(page, filename)

    ctx.close()

    # ─── Desktop 1280×800 ────────────────────────────────────────────────────────
    ctx_d = browser.new_context(viewport={"width": 1280, "height": 800})
    page_d = ctx_d.new_page()
    page_d.goto(BASE_URL)
    page_d.wait_for_load_state("networkidle")
    page_d.wait_for_timeout(1200)
    save(page_d, "08-showcase-desktop.png")
    ctx_d.close()

    browser.close()

print(f"\nAll screenshots saved to: {SCREENSHOT_DIR}")
