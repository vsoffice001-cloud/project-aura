"""
Charts Showcase · Sprint B.4 Final Verification Script
Runs DOM probes, screenshots, and console capture
"""
import json
import os
from playwright.sync_api import sync_playwright

SCREENSHOT_DIR = "/Users/vishalchauchan/Downloads/Anti-folder01/projects/charts-showcase/qa-screenshots/b4-final-2026-05-25"
SHOWCASE_URL = "http://localhost:3070/"
V04_URL = "http://localhost:3040/test/phase-2"

console_messages = []
console_errors = []

def capture_console(page):
    def on_console(msg):
        text = msg.text
        console_messages.append({"type": msg.type, "text": text})
        if msg.type == "error":
            console_errors.append(text)
    page.on("console", on_console)

def run_showcase_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        results = {}

        # ── 1440 viewport ──────────────────────────────────────────────
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        capture_console(page)
        page.goto(SHOWCASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)

        # Full page screenshot 1440
        page.screenshot(path=f"{SCREENSHOT_DIR}/full-1440.png", full_page=True)
        print("✓ full-1440.png")

        # DOM Probe 1: body bg
        body_bg = page.evaluate("() => getComputedStyle(document.body).backgroundColor")
        results["body_bg"] = body_bg
        print(f"  body bg: {body_bg}")

        # DOM Probe 2: top bar position
        topbar_pos = page.evaluate("""() => {
            const el = document.querySelector('[data-testid="top-bar"], header, nav, .top-bar, [class*="topbar"], [class*="TopBar"], [class*="top-bar"]');
            if (!el) return 'NOT FOUND';
            return {
                position: getComputedStyle(el).position,
                top: getComputedStyle(el).top,
                zIndex: getComputedStyle(el).zIndex,
                tag: el.tagName,
                classes: el.className.substring(0, 100)
            };
        }""")
        results["topbar_position"] = topbar_pos
        print(f"  topbar: {topbar_pos}")

        # DOM Probe 3: sidebar position
        sidebar_pos = page.evaluate("""() => {
            const el = document.querySelector('[data-testid="sidebar"], aside, [class*="sidebar"], [class*="Sidebar"]');
            if (!el) return 'NOT FOUND';
            const style = getComputedStyle(el);
            return {
                position: style.position,
                top: style.top,
                tag: el.tagName,
                classes: el.className.substring(0, 100),
                hasActiveHighlight: !!el.querySelector('[class*="active"], [aria-current]')
            };
        }""")
        results["sidebar_position"] = sidebar_pos
        print(f"  sidebar: {sidebar_pos}")

        # DOM Probe 4: section bg alternation
        section_bgs = page.evaluate("""() => {
            const sections = Array.from(document.querySelectorAll('section, [class*="section"], [class*="Section"]')).slice(0, 6);
            return sections.map((s, i) => ({
                index: i,
                bg: getComputedStyle(s).backgroundColor,
                classes: s.className.substring(0, 80)
            }));
        }""")
        results["section_bgs"] = section_bgs
        print(f"  section bgs: {json.dumps(section_bgs, indent=2)}")

        # DOM Probe 5: nested table check
        nested_tables = page.evaluate("""() => {
            const tables = document.querySelectorAll('table table');
            return { count: tables.length, found: tables.length > 0 };
        }""")
        results["nested_tables"] = nested_tables
        print(f"  nested tables: {nested_tables}")

        # DOM Probe 6: Highcharts internal legend disabled check
        legend_check = page.evaluate("""() => {
            const legends = document.querySelectorAll('.highcharts-legend');
            const visibleLegends = Array.from(legends).filter(l => {
                const style = getComputedStyle(l);
                return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
            });
            return {
                total: legends.length,
                visible: visibleLegends.length,
                samples: Array.from(legends).slice(0, 3).map(l => ({
                    display: getComputedStyle(l).display,
                    visibility: getComputedStyle(l).visibility,
                    opacity: getComputedStyle(l).opacity
                }))
            };
        }""")
        results["highcharts_legend"] = legend_check
        print(f"  highcharts legend: {legend_check}")

        # DOM Probe 7: Donut chart centering
        donut_check = page.evaluate("""() => {
            const donut = document.querySelector('[id*="donut"], [class*="donut"], [class*="Donut"]');
            if (!donut) return { found: false };
            const rect = donut.getBoundingClientRect();
            const parent = donut.parentElement;
            const parentRect = parent ? parent.getBoundingClientRect() : null;
            return {
                found: true,
                donutLeft: rect.left,
                donutRight: rect.right,
                donutWidth: rect.width,
                parentLeft: parentRect?.left,
                parentRight: parentRect?.right,
                parentWidth: parentRect?.width,
                centered: parentRect ? Math.abs((rect.left - parentRect.left) - (parentRect.right - rect.right)) < 20 : null
            };
        }""")
        results["donut_centering"] = donut_check
        print(f"  donut centering: {donut_check}")

        # DOM Probe 8: DS Button for toggles (not raw <button> with inline style)
        button_check = page.evaluate("""() => {
            const buttons = document.querySelectorAll('button');
            const inlineStyled = Array.from(buttons).filter(b => b.style.cssText.length > 0);
            const dsButtons = document.querySelectorAll('[class*="btn"], [class*="Button"], [data-variant]');
            return {
                totalButtons: buttons.length,
                inlineStyled: inlineStyled.length,
                inlineStyleSamples: inlineStyled.slice(0, 3).map(b => ({
                    text: b.textContent?.trim().substring(0, 30),
                    style: b.style.cssText.substring(0, 80)
                })),
                dsButtonCount: dsButtons.length
            };
        }""")
        results["button_check"] = button_check
        print(f"  buttons: {button_check}")

        # DOM Probe 9: Sticky table header
        sticky_table = page.evaluate("""() => {
            const ths = document.querySelectorAll('thead th');
            const stickyThs = Array.from(ths).filter(th => getComputedStyle(th).position === 'sticky');
            return {
                totalThs: ths.length,
                stickyThs: stickyThs.length,
                sample: stickyThs.slice(0, 2).map(th => ({
                    position: getComputedStyle(th).position,
                    top: getComputedStyle(th).top,
                    borderBottom: getComputedStyle(th).borderBottom
                }))
            };
        }""")
        results["sticky_table"] = sticky_table
        print(f"  sticky table: {sticky_table}")

        # Top bar detail screenshot
        topbar_el = page.query_selector('[data-testid="top-bar"], header, [class*="topbar"], [class*="TopBar"], [class*="top-bar"]')
        if topbar_el:
            topbar_el.screenshot(path=f"{SCREENSHOT_DIR}/top-bar-detail.png")
            print("✓ top-bar-detail.png")
        else:
            # Clip top bar area
            page.screenshot(path=f"{SCREENSHOT_DIR}/top-bar-detail.png", clip={"x": 0, "y": 0, "width": 1440, "height": 80})
            print("✓ top-bar-detail.png (clipped fallback)")

        # Sidebar detail screenshot
        sidebar_el = page.query_selector('[data-testid="sidebar"], aside, [class*="sidebar"], [class*="Sidebar"]')
        if sidebar_el:
            sidebar_el.screenshot(path=f"{SCREENSHOT_DIR}/sidebar-detail.png")
            print("✓ sidebar-detail.png")
        else:
            page.screenshot(path=f"{SCREENSHOT_DIR}/sidebar-detail.png", clip={"x": 0, "y": 56, "width": 260, "height": 800})
            print("✓ sidebar-detail.png (clipped fallback)")

        # Right panel detail
        right_panel_el = page.query_selector('[data-testid="right-panel"], [class*="right-panel"], [class*="RightPanel"], [class*="rightPanel"]')
        if right_panel_el:
            right_panel_el.screenshot(path=f"{SCREENSHOT_DIR}/right-panel-detail.png")
            print("✓ right-panel-detail.png")
        else:
            page.screenshot(path=f"{SCREENSHOT_DIR}/right-panel-detail.png", clip={"x": 1100, "y": 56, "width": 340, "height": 800})
            print("✓ right-panel-detail.png (clipped fallback)")

        # Scroll to bottom and back
        page.evaluate("() => window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(2000)
        page.evaluate("() => window.scrollTo(0, 0)")
        page.wait_for_timeout(1000)

        # ── 1024 viewport ──────────────────────────────────────────────
        page1024 = browser.new_page(viewport={"width": 1024, "height": 768})
        capture_console(page1024)
        page1024.goto(SHOWCASE_URL)
        page1024.wait_for_load_state("networkidle")
        page1024.wait_for_timeout(2000)
        page1024.screenshot(path=f"{SCREENSHOT_DIR}/full-1024.png", full_page=True)
        print("✓ full-1024.png")
        page1024.close()

        # ── 390 mobile viewport ────────────────────────────────────────
        page390 = browser.new_page(viewport={"width": 390, "height": 844})
        capture_console(page390)
        page390.goto(SHOWCASE_URL)
        page390.wait_for_load_state("networkidle")
        page390.wait_for_timeout(2000)
        page390.screenshot(path=f"{SCREENSHOT_DIR}/full-390.png", full_page=True)
        print("✓ full-390.png")

        # Mobile viewport mode probe
        mobile_sidebar = page390.evaluate("""() => {
            const sidebar = document.querySelector('[data-testid="sidebar"], aside, [class*="sidebar"], [class*="Sidebar"]');
            if (!sidebar) return { found: false };
            const style = getComputedStyle(sidebar);
            return {
                found: true,
                display: style.display,
                position: style.position,
                transform: style.transform,
                width: style.width,
                left: style.left
            };
        }""")
        results["mobile_sidebar"] = mobile_sidebar
        print(f"  mobile sidebar (390): {mobile_sidebar}")
        page390.screenshot(path=f"{SCREENSHOT_DIR}/viewport-mode-mobile.png", full_page=False)
        page390.close()

        # ── Chart-specific screenshots (back to 1440) ──────────────────
        page_charts = browser.new_page(viewport={"width": 1440, "height": 900})
        capture_console(page_charts)
        page_charts.goto(SHOWCASE_URL)
        page_charts.wait_for_load_state("networkidle")
        page_charts.wait_for_timeout(3000)

        # Get list of sidebar items to navigate to specific demos
        sidebar_links = page_charts.evaluate("""() => {
            const links = document.querySelectorAll('a[href*="#"], [data-demo-id], [class*="sidebar"] a, [class*="Sidebar"] a, nav a');
            return Array.from(links).slice(0, 20).map(l => ({
                text: l.textContent?.trim().substring(0, 40),
                href: l.getAttribute('href'),
                dataId: l.getAttribute('data-demo-id')
            }));
        }""")
        results["sidebar_links"] = sidebar_links
        print(f"  sidebar links: {json.dumps(sidebar_links, indent=2)}")

        # Screenshot the page for bubble chart section
        page_charts.evaluate("() => { const el = document.querySelector('[id*=\"bubble\"], [data-demo-id*=\"bubble\"]'); if(el) el.scrollIntoView(); }")
        page_charts.wait_for_timeout(1500)
        page_charts.screenshot(path=f"{SCREENSHOT_DIR}/demo-chart-bubble-light.png", full_page=False)
        print("✓ demo-chart-bubble-light.png")

        # Check for dark surface toggle
        dark_toggle = page_charts.query_selector('[data-surface="dark"], button:has-text("Dark"), [class*="dark"]:has-text("Dark")')
        if dark_toggle:
            dark_toggle.click()
            page_charts.wait_for_timeout(1000)
            page_charts.screenshot(path=f"{SCREENSHOT_DIR}/demo-chart-bubble-dark.png", full_page=False)
            print("✓ demo-chart-bubble-dark.png")
        else:
            page_charts.screenshot(path=f"{SCREENSHOT_DIR}/demo-chart-bubble-dark.png", full_page=False)
            print("✓ demo-chart-bubble-dark.png (no toggle found)")

        # State demo strip
        state_demo = page_charts.query_selector('[data-testid="state-demo"], [class*="StateDemo"], [class*="state-demo"]')
        if state_demo:
            state_demo.screenshot(path=f"{SCREENSHOT_DIR}/state-demo-strip.png")
            print("✓ state-demo-strip.png")
        else:
            page_charts.screenshot(path=f"{SCREENSHOT_DIR}/state-demo-strip.png", full_page=False)
            print("✓ state-demo-strip.png (fallback)")

        # A11y overlay check
        a11y_toggle = page_charts.query_selector('[data-testid="a11y-toggle"], button:has-text("A11y"), button:has-text("Accessibility"), [class*="a11y"]')
        results["a11y_toggle_found"] = a11y_toggle is not None
        if a11y_toggle:
            a11y_toggle.click()
            page_charts.wait_for_timeout(1000)
            page_charts.screenshot(path=f"{SCREENSHOT_DIR}/a11y-overlay-on.png", full_page=False)
            print("✓ a11y-overlay-on.png")
        else:
            page_charts.screenshot(path=f"{SCREENSHOT_DIR}/a11y-overlay-on.png", full_page=False)
            print("✓ a11y-overlay-on.png (no toggle found)")

        # Reduced motion toggle
        rm_toggle = page_charts.query_selector('[data-testid="reduced-motion"], button:has-text("Reduced Motion"), button:has-text("Motion")')
        results["reduced_motion_toggle"] = rm_toggle is not None
        print(f"  reduced motion toggle: {rm_toggle is not None}")

        # Search / filter check
        search_input = page_charts.query_selector('input[type="search"], input[placeholder*="search"], input[placeholder*="Search"], input[placeholder*="filter"]')
        results["search_found"] = search_input is not None
        print(f"  search input: {search_input is not None}")

        # Code snippet check
        code_snippet = page_charts.query_selector('pre code, [class*="CodeSnippet"], [class*="code-snippet"]')
        results["code_snippet_found"] = code_snippet is not None
        print(f"  code snippet: {code_snippet is not None}")

        # Props table check
        props_table = page_charts.query_selector('[class*="PropsTable"], [class*="props-table"], table:has(th:has-text("Type")), table:has(th:has-text("Prop"))')
        results["props_table_found"] = props_table is not None
        print(f"  props table: {props_table is not None}")

        # Token reference panel
        token_panel = page_charts.query_selector('[class*="token"], [data-panel="tokens"], [class*="Token"]')
        results["token_panel_found"] = token_panel is not None
        print(f"  token panel: {token_panel is not None}")

        # Async / loading demo
        async_demo = page_charts.query_selector('[class*="AsyncFetch"], [class*="async-fetch"], button:has-text("Fetch")')
        results["async_demo_found"] = async_demo is not None
        print(f"  async demo: {async_demo is not None}")

        # Variant data toggles
        variant_toggles = page_charts.evaluate("""() => {
            const toggles = document.querySelectorAll('[data-variant], [class*="VariantToggle"], [class*="variant-toggle"]');
            return {
                count: toggles.length,
                texts: Array.from(toggles).slice(0, 5).map(t => t.textContent?.trim().substring(0, 30))
            };
        }""")
        results["variant_toggles"] = variant_toggles
        print(f"  variant toggles: {variant_toggles}")

        # Bubble chart top spacing in dark section
        bubble_spacing = page_charts.evaluate("""() => {
            const bubble = document.querySelector('[class*="bubble"], [class*="Bubble"]');
            if (!bubble) return { found: false };
            const parent = bubble.closest('[class*="cinematic"], [class*="dark"], [style*="background"]');
            if (!parent) return { found: true, noParent: true };
            return {
                found: true,
                paddingTop: getComputedStyle(parent).paddingTop
            };
        }""")
        results["bubble_spacing"] = bubble_spacing
        print(f"  bubble spacing: {bubble_spacing}")

        # ChartFigure unit position
        unit_positions = page_charts.evaluate("""() => {
            const units = document.querySelectorAll('[class*="unit"], [class*="Unit"]');
            return Array.from(units).slice(0, 5).map(u => ({
                text: u.textContent?.trim().substring(0, 10),
                position: getComputedStyle(u).position,
                top: getComputedStyle(u).top,
                right: getComputedStyle(u).right
            }));
        }""")
        results["unit_positions"] = unit_positions
        print(f"  unit positions: {unit_positions}")

        # PropertyTable demos check
        prop_table_card = page_charts.query_selector('[data-demo-id*="property"], [id*="table-property"], [class*="PropertyTable"]')
        results["property_table_demo"] = prop_table_card is not None
        print(f"  property table demo: {prop_table_card is not None}")

        # Count of chart items in sidebar
        chart_count = page_charts.evaluate("""() => {
            const chartItems = document.querySelectorAll('[data-category="chart"], [class*="sidebar"] [data-demo-id]');
            return chartItems.length;
        }""")
        results["sidebar_chart_count"] = chart_count

        # Get full page text for analysis
        h1s = page_charts.evaluate("""() => {
            return Array.from(document.querySelectorAll('h1, h2')).slice(0, 10).map(h => ({
                tag: h.tagName,
                text: h.textContent?.trim().substring(0, 60)
            }));
        }""")
        results["headings"] = h1s
        print(f"  headings: {json.dumps(h1s, indent=2)}")

        page_charts.close()

        # ── v0.4 regression check ──────────────────────────────────────
        page_v04 = browser.new_page(viewport={"width": 1440, "height": 900})
        v04_console_errors = []
        def on_v04_console(msg):
            if msg.type == "error":
                v04_console_errors.append(msg.text)
        page_v04.on("console", on_v04_console)

        page_v04.goto(V04_URL)
        page_v04.wait_for_load_state("networkidle")
        page_v04.wait_for_timeout(3000)
        page_v04.screenshot(path=f"{SCREENSHOT_DIR}/v04-phase2-full.png", full_page=True)
        print("✓ v04-phase2-full.png")

        # Scroll to property table section
        page_v04.evaluate("() => { const el = document.querySelector('[id*=\"14\"], [class*=\"PropertyTable\"], h2'); if(el) el.scrollIntoView(); }")
        page_v04.wait_for_timeout(1000)
        page_v04.screenshot(path=f"{SCREENSHOT_DIR}/v04-section14.png", full_page=False)
        print("✓ v04-section14.png")

        results["v04_console_errors"] = v04_console_errors
        results["v04_error_count"] = len(v04_console_errors)
        print(f"  v0.4 console errors: {len(v04_console_errors)}")
        if v04_console_errors:
            for e in v04_console_errors:
                print(f"    ERROR: {e}")
        page_v04.close()

        browser.close()

        # ── Compile results ────────────────────────────────────────────
        results["console_errors"] = console_errors
        results["console_error_count"] = len(console_errors)
        results["console_all_count"] = len(console_messages)
        results["console_warnings"] = [m for m in console_messages if m["type"] == "warning"]

        # Save console output
        with open(f"{SCREENSHOT_DIR}/console-output.txt", "w") as f:
            f.write(f"=== SHOWCASE CONSOLE OUTPUT ===\n")
            f.write(f"Total messages: {len(console_messages)}\n")
            f.write(f"Errors: {len(console_errors)}\n")
            f.write(f"Warnings: {len([m for m in console_messages if m['type'] == 'warning'])}\n\n")
            for m in console_messages:
                f.write(f"[{m['type'].upper()}] {m['text']}\n")

        # Save full results JSON
        with open(f"{SCREENSHOT_DIR}/probe-results.json", "w") as f:
            json.dump(results, f, indent=2, default=str)

        print("\n=== SUMMARY ===")
        print(f"Body BG: {results.get('body_bg')} (expected rgb(245, 242, 241))")
        print(f"Nested tables: {results.get('nested_tables')}")
        print(f"Console errors: {len(console_errors)}")
        print(f"v0.4 console errors: {len(v04_console_errors)}")
        print(f"Highcharts visible legends: {results.get('highcharts_legend', {}).get('visible', 'N/A')}")
        print(f"Search found: {results.get('search_found')}")
        print(f"Code snippet found: {results.get('code_snippet_found')}")
        print(f"Props table found: {results.get('props_table_found')}")
        print(f"A11y toggle found: {results.get('a11y_toggle_found')}")
        print(f"Reduced motion toggle: {results.get('reduced_motion_toggle')}")
        print(f"Async demo found: {results.get('async_demo_found')}")
        print(f"Token panel found: {results.get('token_panel_found')}")
        print(f"Variant toggles: {results.get('variant_toggles')}")

        return results

if __name__ == "__main__":
    run_showcase_verification()
