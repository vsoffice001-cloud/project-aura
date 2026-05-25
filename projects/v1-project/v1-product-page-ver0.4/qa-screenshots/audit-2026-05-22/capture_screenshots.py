"""
Screenshot capture script for v0.4 PDP UX/UI Audit 2026-05-22
Captures desktop (1280x800) and mobile (390x844) screenshots for §01–§24 + Hero
"""

from playwright.sync_api import sync_playwright
import time
import os

BASE_URL = "http://localhost:3040/test/phase-2"
OUTPUT_DIR = "/Users/vishalchauchan/Downloads/Anti-folder01/projects/v1-project/v1-product-page-ver0.4/qa-screenshots/audit-2026-05-22"

SECTION_IDS = [
    ("executive-summary", "§01"),
    ("scope", "§02"),
    ("country-infra", "§03"),
    ("market-overview", "§04"),
    ("definitions", "§05"),
    ("taxonomy", "§06"),
    ("ecosystem", "§07"),
    ("market-size", "§08"),
    ("submarkets", "§09"),
    ("segmentation", "§10"),
    ("industry", "§11"),
    ("end-user", "§12"),
    ("ds-gap", "§13"),
    ("competitor", "§14"),
    ("regulatory", "§15"),
    ("future-outlook", "§16"),
    ("opportunities", "§17"),
    ("macro", "§18"),
    ("methodology", "§19"),
    ("toc", "§20"),
    ("faq", "§21"),
]

MOBILE_SECTIONS = [
    ("hero", None),
    ("executive-summary", "§01"),
    ("market-size", "§08"),
    ("competitor", "§14"),
]

def scroll_to_section(page, section_id):
    """Scroll to a section by ID with offset for sticky header."""
    page.evaluate(f"""
        const el = document.getElementById('{section_id}');
        if (el) {{
            const y = el.getBoundingClientRect().top + window.scrollY - 120;
            window.scrollTo({{ top: y, behavior: 'instant' }});
        }}
    """)
    page.wait_for_timeout(800)

def capture_viewport_screenshot(page, path):
    """Take a viewport screenshot (not full page)."""
    page.screenshot(path=path)
    print(f"  Saved: {os.path.basename(path)}")

def run_desktop_pass(playwright):
    print("\n=== DESKTOP PASS (1280x800) ===")
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 800})

    print(f"Loading {BASE_URL}...")
    page.goto(BASE_URL, wait_until="networkidle", timeout=30000)
    page.wait_for_timeout(2000)

    # Trigger lazy content by scrolling to bottom then back
    print("Triggering lazy content...")
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(2000)
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(1000)

    # Hero screenshot (top of page)
    print("Capturing Hero...")
    capture_viewport_screenshot(page, f"{OUTPUT_DIR}/hero.png")

    # Each body section
    for section_id, label in SECTION_IDS:
        print(f"Capturing {label} (#{section_id})...")
        scroll_to_section(page, section_id)
        capture_viewport_screenshot(page, f"{OUTPUT_DIR}/{label}.png")

    # §22/23/24 zone - full-width sections below SideTOC body
    print("Capturing §22-24 zone (scroll to bottom)...")
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(1000)
    capture_viewport_screenshot(page, f"{OUTPUT_DIR}/§22-24-zone.png")

    # Also scroll to just before §22 (ReportPreviewSlideshow)
    print("Capturing §22 (ReportPreviewSlideshow)...")
    page.evaluate("""
        const sections = document.querySelectorAll('section');
        // Find the slideshow section by data-component attribute
        const slideshow = document.querySelector('[data-component="ReportPreviewSlideshow"]');
        if (slideshow) {
            slideshow.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
    """)
    page.wait_for_timeout(800)
    capture_viewport_screenshot(page, f"{OUTPUT_DIR}/§22.png")

    browser.close()
    print("Desktop pass complete.")

def run_mobile_pass(playwright):
    print("\n=== MOBILE PASS (390x844 — iPhone 14) ===")
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 390, "height": 844})

    print(f"Loading {BASE_URL}...")
    page.goto(BASE_URL, wait_until="networkidle", timeout=30000)
    page.wait_for_timeout(2000)

    # Trigger lazy content
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(2000)
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(1000)

    # Hero mobile
    print("Capturing hero-mobile...")
    capture_viewport_screenshot(page, f"{OUTPUT_DIR}/hero-mobile.png")

    # Mobile sections
    for section_id, label in MOBILE_SECTIONS[1:]:
        print(f"Capturing {label}-mobile (#{section_id})...")
        scroll_to_section(page, section_id)
        capture_viewport_screenshot(page, f"{OUTPUT_DIR}/{label}-mobile.png")

    # §22 zone mobile
    print("Capturing §22-mobile (scroll to bottom)...")
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(1000)
    capture_viewport_screenshot(page, f"{OUTPUT_DIR}/§22-mobile.png")

    browser.close()
    print("Mobile pass complete.")

with sync_playwright() as p:
    run_desktop_pass(p)
    run_mobile_pass(p)
    print(f"\nAll screenshots saved to:\n{OUTPUT_DIR}")
