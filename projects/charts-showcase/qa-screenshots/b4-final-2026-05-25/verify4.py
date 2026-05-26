"""
B.4 Verify Part 4 — Targeted probes for remaining ambiguous bugs
"""
import json
from playwright.sync_api import sync_playwright

SCREENSHOT_DIR = "/Users/vishalchauchan/Downloads/Anti-folder01/projects/charts-showcase/qa-screenshots/b4-final-2026-05-25"
SHOWCASE_URL = "http://localhost:3070/"

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        results = {}

        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto(SHOWCASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(3000)

        # ── Bug 6: Sticky at RankingTable (stickyHeader=true) ────────
        page.goto(f"{SHOWCASE_URL}#table-ranking")
        page.wait_for_timeout(2500)

        sticky_ranking = page.evaluate("""() => {
            const section = document.getElementById('table-ranking');
            if (!section) return { found: false, reason: 'no #table-ranking' };

            const ths = section.querySelectorAll('thead th');
            const stickyThs = Array.from(ths).filter(th => getComputedStyle(th).position === 'sticky');

            // Find scroll parent
            const wrappers = Array.from(section.querySelectorAll('*')).filter(el => {
                const s = getComputedStyle(el);
                const overflow = s.overflow + s.overflowX + s.overflowY;
                return overflow.includes('auto') || overflow.includes('scroll');
            });

            // Check if thead th classes include sticky
            const firstTh = ths[0];
            const thClasses = firstTh ? firstTh.className : 'N/A';

            return {
                found: true,
                thCount: ths.length,
                stickyThCount: stickyThs.length,
                firstThClass: thClasses.substring(0, 120),
                firstThPosition: firstTh ? getComputedStyle(firstTh).position : null,
                scrollParentCount: wrappers.length,
                scrollParents: wrappers.slice(0, 3).map(w => ({
                    tag: w.tagName,
                    class: w.className.substring(0, 60),
                    overflowY: getComputedStyle(w).overflowY,
                    height: getComputedStyle(w).height,
                    maxHeight: getComputedStyle(w).maxHeight
                }))
            };
        }""")
        results["bug6_ranking_sticky"] = sticky_ranking
        print(f"Bug 6 RankingTable sticky: {json.dumps(sticky_ranking, indent=2)}")

        # ── Bug 4: Bubble chart dark surface padding ──────────────────
        page.goto(f"{SHOWCASE_URL}#chart-bubble")
        page.wait_for_timeout(2500)
        bubble_dark = page.evaluate("""() => {
            const section = document.getElementById('chart-bubble');
            if (!section) return { found: false };

            // Find the dark surface container (data-variant-section="cinematic")
            const cinematicSection = section.querySelector('[data-variant-section="cinematic"]') ||
                                     document.querySelector('[data-variant-section="cinematic"]');
            const chart = section.querySelector('.highcharts-container');
            const sectionEl = section;

            // Check data-variant-section on all elements in bubble section
            const variantSections = section.querySelectorAll('[data-variant-section]');

            // Check the surface toggle state
            const surfaceBtns = Array.from(section.querySelectorAll('button')).filter(b =>
                /^(light|dark)$/i.test((b.textContent || '').trim())
            );
            const activeSurfaceBtn = surfaceBtns.find(b => b.getAttribute('aria-pressed') === 'true' ||
                b.getAttribute('data-active') === 'true');

            return {
                found: true,
                cinematicSectionFound: !!cinematicSection,
                variantSectionCount: variantSections.length,
                variantSections: Array.from(variantSections).slice(0, 3).map(s => ({
                    tag: s.tagName,
                    paddingTop: getComputedStyle(s).paddingTop,
                    paddingBottom: getComputedStyle(s).paddingBottom,
                    bg: getComputedStyle(s).backgroundColor
                })),
                surfaceBtnTexts: surfaceBtns.map(b => (b.textContent || '').trim()),
                activeSurface: activeSurfaceBtn ? (activeSurfaceBtn.textContent || '').trim() : 'none',
                sectionPaddingTop: getComputedStyle(sectionEl).paddingTop,
                chartTop: chart ? Math.round(chart.getBoundingClientRect().top) : null
            };
        }""")
        results["bug4_bubble_dark"] = bubble_dark
        print(f"Bug 4 bubble dark: {json.dumps(bubble_dark, indent=2)}")

        # Click dark button to trigger dark mode and re-probe
        dark_btn = page.get_by_role("button", name="dark").first
        if dark_btn and dark_btn.count() > 0:
            dark_btn.click()
            page.wait_for_timeout(1500)
            bubble_dark_after = page.evaluate("""() => {
                const section = document.getElementById('chart-bubble');
                const cinematicEls = document.querySelectorAll('[data-variant-section="cinematic"]');
                return {
                    cinematicCount: cinematicEls.length,
                    cinematics: Array.from(cinematicEls).slice(0, 2).map(el => ({
                        paddingTop: getComputedStyle(el).paddingTop,
                        paddingBottom: getComputedStyle(el).paddingBottom,
                        bg: getComputedStyle(el).backgroundColor,
                        classes: el.className.substring(0, 80)
                    }))
                };
            }""")
            results["bug4_bubble_dark_after_click"] = bubble_dark_after
            print(f"Bug 4 after dark click: {json.dumps(bubble_dark_after, indent=2)}")
            page.screenshot(path=f"{SCREENSHOT_DIR}/demo-chart-bubble-dark.png", full_page=False)
            print("✓ demo-chart-bubble-dark.png (updated)")

        # ── Token panel probe (right panel with active demo) ──────────
        page.goto(SHOWCASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)

        # Click on ChartFigure primitive to get right panel tokens
        page.goto(f"{SHOWCASE_URL}#primitive-chartfigure")
        page.wait_for_timeout(1500)
        token_probe = page.evaluate("""() => {
            // Look in right panel
            const rightPanel = document.querySelector('[class*="RightPanel"], [class*="right-panel"]');
            if (!rightPanel) {
                // Try to find it by position (rightmost panel)
                const allDivs = Array.from(document.querySelectorAll('div'));
                const rightmost = allDivs.find(d => {
                    const rect = d.getBoundingClientRect();
                    return rect.left > 1100 && rect.width > 250 && rect.height > 400;
                });
                if (rightmost) {
                    const tokenSection = rightmost.querySelector('[class*="token"], [class*="Token"]');
                    return { rightPanelFound: false, fallback: !!tokenSection };
                }
                return { rightPanelFound: false };
            }
            const tokenSection = rightPanel.querySelector('[class*="Token"], [class*="token"]');
            const varEntries = Array.from(rightPanel.querySelectorAll('code, span, p')).filter(el => {
                return (el.textContent || '').includes('--');
            });
            return {
                rightPanelFound: true,
                tokenSectionFound: !!tokenSection,
                varEntryCount: varEntries.length,
                sampleVars: varEntries.slice(0, 4).map(e => (e.textContent || '').trim().substring(0, 40))
            };
        }""")
        results["feature12_token_detail"] = token_probe
        print(f"Feature 12 token probe: {json.dumps(token_probe, indent=2)}")

        # Look for right panel by structure
        right_panel_probe = page.evaluate("""() => {
            // Right panel is the 320px panel on the right
            const allFixed = Array.from(document.querySelectorAll('*')).filter(el => {
                const r = el.getBoundingClientRect();
                const s = getComputedStyle(el);
                return s.position === 'sticky' && r.left > 900 && r.width > 200;
            });
            return allFixed.slice(0, 3).map(el => ({
                tag: el.tagName,
                class: el.className.substring(0, 60),
                id: el.id?.substring(0, 30),
                left: Math.round(el.getBoundingClientRect().left),
                width: Math.round(el.getBoundingClientRect().width),
                innerHTML_snippet: el.innerHTML.substring(0, 200)
            }));
        }""")
        results["right_panel_dom"] = right_panel_probe
        print(f"Right panel DOM: {json.dumps(right_panel_probe, indent=2)}")

        page.screenshot(path=f"{SCREENSHOT_DIR}/right-panel-detail.png", full_page=False)
        print("✓ right-panel-detail.png (updated)")

        # ── Feature 1: Sidebar active state with hash ─────────────────
        page.goto(f"{SHOWCASE_URL}#chart-bubble")
        page.wait_for_timeout(2000)
        sidebar_active = page.evaluate("""() => {
            const sidebar = document.querySelector('aside');
            if (!sidebar) return { found: false };
            const allLinks = sidebar.querySelectorAll('a');
            const activeLinks = Array.from(allLinks).filter(a => {
                const aria = a.getAttribute('aria-current');
                const classes = a.className;
                return aria === 'page' || aria === 'true' || classes.includes('active') || classes.includes('current');
            });
            const bubbleLink = Array.from(allLinks).find(a => a.getAttribute('href') === '#chart-bubble');
            return {
                found: true,
                totalLinks: allLinks.length,
                activeCount: activeLinks.length,
                activeTexts: activeLinks.map(a => (a.textContent || '').trim().substring(0, 30)),
                bubbleLinkFound: !!bubbleLink,
                bubbleLinkAriaCurrent: bubbleLink ? bubbleLink.getAttribute('aria-current') : null,
                bubbleLinkClass: bubbleLink ? bubbleLink.className.substring(0, 80) : null
            };
        }""")
        results["feature1_sidebar_active"] = sidebar_active
        print(f"Feature 1 sidebar active: {json.dumps(sidebar_active, indent=2)}")

        # ── Feature 6: Reduced motion — check topbar button state ────
        page.goto(SHOWCASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)

        # Find "System" button (motion toggle)
        motion_btn = page.get_by_title("Motion: system")
        if motion_btn.count() > 0:
            print(f"  Motion button found: 'System' (aria = Toggle reduced motion)")
            results["feature6_motion_btn"] = "FOUND - title='Motion: system' aria='Toggle reduced motion'"
        else:
            motion_btn2 = page.get_by_role("button", name="System")
            results["feature6_motion_btn"] = "FOUND via role" if motion_btn2.count() > 0 else "NOT FOUND"
        print(f"Feature 6 motion: {results['feature6_motion_btn']}")

        # ── Feature 8: A11y overlay — click and probe ─────────────────
        a11y_btn = page.get_by_role("button", name="A11y")
        if a11y_btn.count() > 0:
            a11y_btn.click()
            page.wait_for_timeout(1500)
            overlay_probe = page.evaluate("""() => {
                const overlays = document.querySelectorAll('[class*="a11y"], [class*="A11y"]');
                const ariaLabels = document.querySelectorAll('[data-a11y-label]');
                const focusRings = document.querySelectorAll('[data-focus-order]');
                return {
                    overlayCount: overlays.length,
                    ariaLabelCount: ariaLabels.length,
                    focusOrderCount: focusRings.length,
                    overlayClasses: Array.from(overlays).slice(0, 3).map(el => el.className.substring(0, 60))
                };
            }""")
            results["feature8_overlay_probe"] = overlay_probe
            print(f"Feature 8 overlay after click: {json.dumps(overlay_probe, indent=2)}")
            page.screenshot(path=f"{SCREENSHOT_DIR}/a11y-overlay-on.png", full_page=False)
            print("✓ a11y-overlay-on.png (updated)")
        else:
            print("  A11y button not found via role=button name=A11y")

        # ── Full screenshot ───────────────────────────────────────────
        page.goto(SHOWCASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        page.screenshot(path=f"{SCREENSHOT_DIR}/full-1440.png", full_page=True)
        print("✓ full-1440.png (final)")

        browser.close()

        with open(f"{SCREENSHOT_DIR}/probe-results4.json", "w") as f:
            json.dump(results, f, indent=2, default=str)

        print("\n=== PART 4 SUMMARY ===")
        print(f"Bug 4 bubble dark: variant={results.get('bug4_bubble_dark', {}).get('cinematicSectionFound')}")
        print(f"Bug 6 ranking sticky: {results.get('bug6_ranking_sticky', {}).get('stickyThCount', 'N/A')} sticky ths")
        print(f"Feature 1 sidebar active: {results.get('feature1_sidebar_active', {}).get('activeCount', 'N/A')} active links")
        print(f"Feature 6 motion: {results.get('feature6_motion_btn')}")
        print(f"Feature 8 overlay: {results.get('feature8_overlay_probe', {})}")
        print(f"Feature 12 tokens: {results.get('feature12_token_detail')}")


if __name__ == "__main__":
    run()
