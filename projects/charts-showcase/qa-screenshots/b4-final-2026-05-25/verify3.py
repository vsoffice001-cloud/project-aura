"""
Charts Showcase · B.4 Verify Part 3
Targeted feature probes (simplified selectors)
"""
import json
import os
from playwright.sync_api import sync_playwright

SCREENSHOT_DIR = "/Users/vishalchauchan/Downloads/Anti-folder01/projects/charts-showcase/qa-screenshots/b4-final-2026-05-25"
SHOWCASE_URL = "http://localhost:3070/"
V04_URL = "http://localhost:3040/test/phase-2"


def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        results = {}

        page = browser.new_page(viewport={"width": 1440, "height": 900})
        console_errors = []
        page.on("console", lambda m: console_errors.append(m.text) if m.type == "error" else None)
        page.goto(SHOWCASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(3000)

        # ── Feature 3: Code snippet w/ copy ──────────────────────────
        code_snippets = page.evaluate("""() => {
            const pres = document.querySelectorAll('pre');
            const copyBtns = Array.from(document.querySelectorAll('button')).filter(b => {
                const label = (b.getAttribute('aria-label') || '').toLowerCase();
                const text = (b.textContent || '').trim().toLowerCase();
                return label.includes('copy') || text === 'copy';
            });
            return {
                preCount: pres.length,
                copyBtnCount: copyBtns.length,
                firstCode: pres[0] ? pres[0].textContent.substring(0, 80) : null
            };
        }""")
        results["feature3_code_snippet"] = code_snippets
        print(f"Feature 3 - code snippet: {code_snippets}")

        # ── Feature 4: Multiple data variants per chart ───────────────
        variants = page.evaluate("""() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const variantBtns = buttons.filter(b => {
                const t = (b.textContent || '').trim();
                return /N=|low|mid|high|small|large|variant/i.test(t) && t.length < 40;
            });
            return {
                count: variantBtns.length,
                texts: variantBtns.slice(0, 8).map(b => (b.textContent || '').trim())
            };
        }""")
        results["feature4_variants"] = variants
        print(f"Feature 4 - variants: {variants}")

        # ── Feature 5: Light AND dark surface ────────────────────────
        surface_toggles = page.evaluate("""() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const surfaceBtns = buttons.filter(b => {
                const t = (b.textContent || '').trim();
                return /^(light|dark|surface)$/i.test(t);
            });
            return {
                count: surfaceBtns.length,
                texts: surfaceBtns.slice(0, 6).map(b => (b.textContent || '').trim())
            };
        }""")
        results["feature5_surface"] = surface_toggles
        print(f"Feature 5 - surface toggles: {surface_toggles}")

        # ── Feature 6: Reduced motion toggle ─────────────────────────
        topbar_controls = page.evaluate("""() => {
            const header = document.querySelector('header');
            if (!header) return { error: 'NO HEADER' };
            const buttons = Array.from(header.querySelectorAll('button'));
            const svgs = Array.from(header.querySelectorAll('svg'));
            return {
                buttonCount: buttons.length,
                buttonDetails: buttons.map(b => ({
                    text: (b.textContent || '').trim().substring(0, 30),
                    ariaLabel: b.getAttribute('aria-label'),
                    title: b.getAttribute('title'),
                    className: b.className.substring(0, 60)
                })),
                svgCount: svgs.length
            };
        }""")
        results["topbar_controls"] = topbar_controls
        print(f"Topbar controls: {json.dumps(topbar_controls, indent=2)}")

        # ── Feature 7: Responsive breakpoint preview ──────────────────
        breakpoint_switcher = page.evaluate("""() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const bpBtns = buttons.filter(b => {
                const t = (b.textContent || '').trim();
                return /^(1440|1024|768|390|Mobile|Tablet|Desktop)$/.test(t);
            });
            return {
                count: bpBtns.length,
                texts: bpBtns.slice(0, 6).map(b => (b.textContent || '').trim())
            };
        }""")
        results["feature7_breakpoints"] = breakpoint_switcher
        print(f"Feature 7 - breakpoints: {breakpoint_switcher}")

        # ── Feature 8: A11y annotation overlay ───────────────────────
        a11y_detail = page.evaluate("""() => {
            const header = document.querySelector('header');
            const buttons = Array.from((header || document).querySelectorAll('button'));
            const a11yBtns = buttons.filter(b => {
                const label = (b.getAttribute('aria-label') || '').toLowerCase();
                const text = (b.textContent || '').trim().toLowerCase();
                const title = (b.getAttribute('title') || '').toLowerCase();
                return label.includes('a11y') || label.includes('accessibility') ||
                       text.includes('a11y') || title.includes('a11y');
            });
            const overlays = document.querySelectorAll('[class*="a11y-overlay"], [class*="A11y"]');
            return {
                buttonCount: a11yBtns.length,
                buttonTexts: a11yBtns.map(b => (b.textContent || '').trim().substring(0, 30)),
                overlayCount: overlays.length
            };
        }""")
        results["feature8_a11y"] = a11y_detail
        print(f"Feature 8 - a11y: {a11y_detail}")

        # ── Features 9-11: Loading/Empty/Error states ─────────────────
        state_demos = page.evaluate("""() => {
            const stateSection = document.querySelector('[id*="state-chartskeleton"]') ||
                                  document.querySelector('[id*="state"]');
            const skeletons = document.querySelectorAll('[class*="Skeleton"], [class*="skeleton"]');
            const emptyStates = document.querySelectorAll('[class*="EmptyState"], [class*="empty-state"]');
            const errorStates = document.querySelectorAll('[class*="ErrorState"], [class*="error-state"]');
            const tabs = document.querySelectorAll('[role="tab"]');
            const sidebarStates = Array.from(document.querySelectorAll('a')).filter(a => {
                const href = a.getAttribute('href') || '';
                return href.includes('state-') || href.includes('skeleton') || href.includes('empty') || href.includes('error') || href.includes('async');
            });
            return {
                skeletonCount: skeletons.length,
                emptyStateCount: emptyStates.length,
                errorStateCount: errorStates.length,
                tabCount: tabs.length,
                tabTexts: Array.from(tabs).slice(0, 6).map(t => (t.textContent || '').trim()),
                stateLinks: sidebarStates.map(l => ({
                    text: (l.textContent || '').trim().substring(0, 30),
                    href: l.getAttribute('href')
                }))
            };
        }""")
        results["features9_11_states"] = state_demos
        print(f"Features 9-11 - states: {json.dumps(state_demos, indent=2)}")

        # Navigate to skeleton state section
        page.goto(f"{SHOWCASE_URL}#state-chartskeleton")
        page.wait_for_timeout(2000)
        page.screenshot(path=f"{SCREENSHOT_DIR}/state-demo-strip.png", full_page=False)
        print("✓ state-demo-strip.png")

        # Navigate to async section
        page.goto(f"{SHOWCASE_URL}#state-async-fetch")
        page.wait_for_timeout(2000)
        async_detail = page.evaluate("""() => {
            const asyncEl = document.querySelector('[id*="async-fetch"]');
            if (!asyncEl) return { found: false };
            const buttons = Array.from(asyncEl.querySelectorAll('button'));
            return {
                found: true,
                hasButton: buttons.length > 0,
                buttonTexts: buttons.map(b => (b.textContent || '').trim().substring(0, 30))
            };
        }""")
        results["feature14_async"] = async_detail
        print(f"Feature 14 - async: {async_detail}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/async-demo-loading.png", full_page=False)
        print("✓ async-demo-loading.png")

        # ── Feature 12: Token reference panel ────────────────────────
        page.goto(SHOWCASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        token_detail = page.evaluate("""() => {
            const codeEls = Array.from(document.querySelectorAll('code, span'));
            const cssVars = codeEls.filter(el => {
                const t = (el.textContent || '').trim();
                return t.startsWith('--') && t.length < 60;
            });
            const tokenPanels = document.querySelectorAll('[class*="Token"], [class*="token-ref"]');
            return {
                cssVarCount: cssVars.length,
                tokenPanelCount: tokenPanels.length,
                sampleVars: cssVars.slice(0, 5).map(e => (e.textContent || '').trim())
            };
        }""")
        results["feature12_tokens"] = token_detail
        print(f"Feature 12 - tokens: {token_detail}")

        # ── Feature 13: Filter/search ─────────────────────────────────
        search_check = page.evaluate("""() => {
            const inputs = document.querySelectorAll('input');
            const searchInput = Array.from(inputs).find(i => {
                const ph = (i.getAttribute('placeholder') || '').toLowerCase();
                const type = i.getAttribute('type') || '';
                return ph.includes('search') || ph.includes('filter') || type === 'search';
            });
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            return {
                searchFound: !!searchInput,
                searchType: searchInput ? searchInput.getAttribute('type') : null,
                searchPlaceholder: searchInput ? searchInput.getAttribute('placeholder') : null,
                checkboxCount: checkboxes.length
            };
        }""")
        results["feature13_search"] = search_check
        print(f"Feature 13 - search: {search_check}")

        # ── Feature 15: Props table ───────────────────────────────────
        props_table_detail = page.evaluate("""() => {
            const tables = document.querySelectorAll('table');
            let propsTables = [];
            tables.forEach(t => {
                const ths = Array.from(t.querySelectorAll('th')).map(th => (th.textContent || '').trim().toLowerCase());
                if ((ths.includes('prop') || ths.includes('name') || ths.includes('property')) &&
                    (ths.includes('type') || ths.includes('default'))) {
                    propsTables.push(ths);
                }
            });
            return {
                totalTables: tables.length,
                propsTableCount: propsTables.length,
                firstHeaders: propsTables[0] || []
            };
        }""")
        results["feature15_props_table"] = props_table_detail
        print(f"Feature 15 - props table: {props_table_detail}")

        # ── Bug 3: Donut chart centering ─────────────────────────────
        page.goto(f"{SHOWCASE_URL}#chart-donut")
        page.wait_for_timeout(2500)
        donut_detail = page.evaluate("""() => {
            const highContainers = document.querySelectorAll('.highcharts-container');
            const pieContainers = Array.from(highContainers).filter(c => c.querySelector('.highcharts-pie-series'));
            if (!pieContainers.length) return { found: false, totalCharts: highContainers.length };
            const dc = pieContainers[0];
            const rect = dc.getBoundingClientRect();
            const parent = dc.parentElement;
            const pr = parent ? parent.getBoundingClientRect() : null;
            const leftMargin = pr ? (rect.left - pr.left) : null;
            const rightMargin = pr ? (pr.right - rect.right) : null;
            return {
                found: true,
                chartWidth: Math.round(rect.width),
                parentWidth: pr ? Math.round(pr.width) : null,
                leftMargin: leftMargin ? Math.round(leftMargin) : null,
                rightMargin: rightMargin ? Math.round(rightMargin) : null,
                centered: leftMargin !== null && rightMargin !== null ?
                    Math.abs(leftMargin - rightMargin) < 30 : null
            };
        }""")
        results["bug3_donut_detail"] = donut_detail
        print(f"Bug 3 - donut centering: {donut_detail}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/demo-chart-donut.png", full_page=False)
        print("✓ demo-chart-donut.png")

        # ── Bug 4: Bubble chart top spacing ──────────────────────────
        page.goto(f"{SHOWCASE_URL}#chart-bubble")
        page.wait_for_timeout(2500)
        bubble_detail = page.evaluate("""() => {
            const section = document.querySelector('[id="chart-bubble"]');
            if (!section) return { found: false };
            const darkSurface = section.querySelector('[class*="dark"], [class*="cinematic"]');
            const chartContainer = section.querySelector('.highcharts-container');
            return {
                found: true,
                darkSurfaceFound: !!darkSurface,
                darkSurfacePaddingTop: darkSurface ? getComputedStyle(darkSurface).paddingTop : null,
                darkSurfaceClasses: darkSurface ? darkSurface.className.substring(0, 80) : null,
                chartTop: chartContainer ? Math.round(chartContainer.getBoundingClientRect().top) : null
            };
        }""")
        results["bug4_bubble_detail"] = bubble_detail
        print(f"Bug 4 - bubble spacing: {bubble_detail}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/demo-chart-bubble-compare.png", full_page=False)
        print("✓ demo-chart-bubble-compare.png")

        # Dark surface screenshot
        dark_btn = page.query_selector('button[aria-label="Dark"], button[aria-label="dark"]')
        if not dark_btn:
            dark_btn_list = page.evaluate("""() => {
                return Array.from(document.querySelectorAll('button')).filter(b =>
                    (b.textContent || '').trim().toLowerCase() === 'dark'
                ).map(b => b.textContent?.trim());
            }""")
            print(f"  Dark buttons found: {dark_btn_list}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/demo-chart-bubble-dark.png", full_page=False)
        print("✓ demo-chart-bubble-dark.png")

        # ── Bug 6: Sticky table header probe ─────────────────────────
        page.goto(f"{SHOWCASE_URL}#table-property")
        page.wait_for_timeout(2500)
        page.screenshot(path=f"{SCREENSHOT_DIR}/demo-table-property-card.png", full_page=False)
        print("✓ demo-table-property-card.png")

        sticky_detail = page.evaluate("""() => {
            const section = document.querySelector('[id="table-property"]');
            if (!section) return { found: false };
            const ths = section.querySelectorAll('thead th');
            const stickyThs = Array.from(ths).filter(th => getComputedStyle(th).position === 'sticky');
            const scrollEls = Array.from(section.querySelectorAll('*')).filter(el => {
                const s = getComputedStyle(el);
                return s.overflow === 'auto' || s.overflow === 'scroll' ||
                       s.overflowY === 'auto' || s.overflowY === 'scroll' ||
                       s.overflowX === 'auto' || s.overflowX === 'scroll';
            });
            return {
                found: true,
                totalThs: ths.length,
                stickyThCount: stickyThs.length,
                stickyTop: stickyThs[0] ? getComputedStyle(stickyThs[0]).top : null,
                stickyBorderBottom: stickyThs[0] ? getComputedStyle(stickyThs[0]).borderBottom : null,
                stickyZIndex: stickyThs[0] ? getComputedStyle(stickyThs[0]).zIndex : null,
                scrollParentCount: scrollEls.length
            };
        }""")
        results["bug6_sticky"] = sticky_detail
        print(f"Bug 6 - sticky table: {sticky_detail}")

        # Table header style screenshots
        page.screenshot(path=f"{SCREENSHOT_DIR}/demo-table-headerstyle-wash.png", full_page=False)
        print("✓ demo-table-headerstyle-wash.png")

        # Check for header style toggle buttons
        header_styles = page.evaluate("""() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const styleBtns = buttons.filter(b => {
                const t = (b.textContent || '').trim().toLowerCase();
                return ['wash', 'transparent', 'inverted', 'card', 'open'].includes(t);
            });
            return {
                count: styleBtns.length,
                texts: styleBtns.map(b => (b.textContent || '').trim())
            };
        }""")
        results["table_header_styles"] = header_styles
        print(f"Table header style buttons: {header_styles}")

        # Transparent
        tr_btn = page.get_by_role("button", name="transparent").first if page.get_by_role("button", name="transparent").count() > 0 else None
        if tr_btn:
            tr_btn.click()
            page.wait_for_timeout(600)
        page.screenshot(path=f"{SCREENSHOT_DIR}/demo-table-headerstyle-transparent.png", full_page=False)
        print("✓ demo-table-headerstyle-transparent.png")

        # Inverted
        inv_btn = page.get_by_role("button", name="inverted").first if page.get_by_role("button", name="inverted").count() > 0 else None
        if inv_btn:
            inv_btn.click()
            page.wait_for_timeout(600)
        page.screenshot(path=f"{SCREENSHOT_DIR}/demo-table-headerstyle-inverted.png", full_page=False)
        print("✓ demo-table-headerstyle-inverted.png")

        # Table open variant
        page.goto(f"{SHOWCASE_URL}#table-ranking")
        page.wait_for_timeout(2000)
        page.screenshot(path=f"{SCREENSHOT_DIR}/demo-table-property-open.png", full_page=False)
        print("✓ demo-table-property-open.png (ranking)")

        # Sticky engaged
        page.evaluate("""() => {
            const wrapper = document.querySelector('[id="table-ranking"] [style*="max-height"], [id="table-ranking"] [class*="scroll"]');
            if (wrapper) { wrapper.scrollTop = 200; }
        }""")
        page.wait_for_timeout(500)
        page.screenshot(path=f"{SCREENSHOT_DIR}/demo-sticky-engaged.png", full_page=False)
        print("✓ demo-sticky-engaged.png")

        # ── Bug 8: Section bg alternation (demo canvases) ─────────────
        page.goto(SHOWCASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        demo_bg = page.evaluate("""() => {
            const demoIds = ['chart-column', 'chart-bar', 'chart-dual-column', 'chart-bubble', 'chart-donut'];
            return demoIds.map(id => {
                const el = document.getElementById(id);
                if (!el) return { id, found: false };
                const canvasEl = el.querySelector('[class*="canvas"], [class*="Canvas"]') || el;
                return {
                    id,
                    found: true,
                    sectionBg: getComputedStyle(el).backgroundColor,
                    canvasBg: getComputedStyle(canvasEl).backgroundColor,
                    classes: el.className.substring(0, 60)
                };
            });
        }""")
        results["bug8_demo_bgs"] = demo_bg
        print(f"Bug 8 - demo BGs: {json.dumps(demo_bg, indent=2)}")

        # ── Bug 9: ChartFigure unit position ─────────────────────────
        page.goto(f"{SHOWCASE_URL}#chart-column")
        page.wait_for_timeout(2000)
        unit_detail = page.evaluate("""() => {
            const figures = document.querySelectorAll('figure, [class*="chart-figure"], [class*="ChartFigure"]');
            return Array.from(figures).slice(0, 3).map(fig => {
                const unitEl = fig.querySelector('[class*="unit"], [class*="Unit"]');
                const eyebrowEl = fig.querySelector('[class*="eyebrow"], [class*="Eyebrow"]');
                const titleEl = fig.querySelector('h3, h4, [class*="title"]');
                return {
                    hasUnit: !!unitEl,
                    unitText: unitEl ? (unitEl.textContent || '').trim().substring(0, 15) : null,
                    unitTop: unitEl ? getComputedStyle(unitEl).top : null,
                    unitRight: unitEl ? getComputedStyle(unitEl).right : null,
                    unitPosition: unitEl ? getComputedStyle(unitEl).position : null,
                    hasEyebrow: !!eyebrowEl,
                    hasTitle: !!titleEl
                };
            });
        }""")
        results["bug9_unit"] = unit_detail
        print(f"Bug 9 - unit positions: {unit_detail}")

        # ── Bug 10: Buttons check ─────────────────────────────────────
        page.goto(SHOWCASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        btn_detail = page.evaluate("""() => {
            const allBtns = Array.from(document.querySelectorAll('button'));
            const inlineStyled = allBtns.filter(b => {
                const s = b.style.cssText;
                // exclude buttons with only background: none (reset buttons)
                return s.length > 0 && !(s === 'background: none;' || s.includes('background: none') && s.split(';').length <= 3);
            });
            const hasClasses = allBtns.filter(b => b.className.length > 5);
            return {
                total: allBtns.length,
                withMeaningfulInlineStyle: inlineStyled.length,
                withClasses: hasClasses.length,
                inlineSamples: inlineStyled.slice(0, 5).map(b => ({
                    text: (b.textContent || '').trim().substring(0, 25),
                    style: b.style.cssText.substring(0, 80),
                    classes: b.className.substring(0, 60)
                }))
            };
        }""")
        results["bug10_btn_detail"] = btn_detail
        print(f"Bug 10 - button detail: {json.dumps(btn_detail, indent=2)}")

        # ── Bug 12: Mobile sidebar collapse ──────────────────────────
        page390 = browser.new_page(viewport={"width": 390, "height": 844})
        page390.goto(SHOWCASE_URL)
        page390.wait_for_load_state("networkidle")
        page390.wait_for_timeout(2000)
        mobile_sidebar = page390.evaluate("""() => {
            const sidebar = document.querySelector('aside, [class*="sidebar"]');
            const hamburger = Array.from(document.querySelectorAll('button')).find(b => {
                const aria = (b.getAttribute('aria-label') || '').toLowerCase();
                const classes = b.className.toLowerCase();
                return aria.includes('menu') || aria.includes('navigation') || aria.includes('sidebar') || classes.includes('hamburger') || classes.includes('menu');
            });
            const charts = Array.from(document.querySelectorAll('.highcharts-container'));
            return {
                sidebarDisplay: sidebar ? getComputedStyle(sidebar).display : 'NOT FOUND',
                sidebarPosition: sidebar ? getComputedStyle(sidebar).position : null,
                hamburgerFound: !!hamburger,
                hamburgerLabel: hamburger ? hamburger.getAttribute('aria-label') : null,
                chartWidths: charts.slice(0, 3).map(c => Math.round(c.getBoundingClientRect().width)),
                viewportWidth: window.innerWidth
            };
        }""")
        results["bug12_mobile"] = mobile_sidebar
        print(f"Bug 12 - mobile sidebar: {mobile_sidebar}")
        page390.screenshot(path=f"{SCREENSHOT_DIR}/viewport-mode-mobile.png", full_page=False)
        print("✓ viewport-mode-mobile.png")
        page390.close()

        # ── v0.4 regression check ─────────────────────────────────────
        page_v04 = browser.new_page(viewport={"width": 1440, "height": 900})
        v04_errors = []
        page_v04.on("console", lambda m: v04_errors.append(m.text) if m.type == "error" else None)
        page_v04.goto(V04_URL)
        page_v04.wait_for_load_state("networkidle")
        page_v04.wait_for_timeout(3000)

        v04_probes = page_v04.evaluate("""() => {
            const charts = document.querySelectorAll('.highcharts-container');
            const tables = document.querySelectorAll('table');
            const nestedTables = document.querySelectorAll('table table');
            const propTables = Array.from(document.querySelectorAll('table')).filter(t => {
                const ths = Array.from(t.querySelectorAll('th')).map(th => (th.textContent || '').trim().toLowerCase());
                return ths.some(h => ['location', 'value', 'property', 'segment'].includes(h));
            });
            return {
                chartCount: charts.length,
                tableCount: tables.length,
                nestedTableCount: nestedTables.length,
                propTableCount: propTables.length
            };
        }""")
        results["v04_probes"] = v04_probes
        results["v04_errors"] = v04_errors
        print(f"v0.4 probes: {v04_probes}")
        print(f"v0.4 errors: {len(v04_errors)} - {v04_errors[:3]}")

        page_v04.screenshot(path=f"{SCREENSHOT_DIR}/v04-phase2-full.png", full_page=True)
        print("✓ v04-phase2-full.png")
        page_v04.close()

        browser.close()

        # Save
        with open(f"{SCREENSHOT_DIR}/probe-results3.json", "w") as f:
            json.dump(results, f, indent=2, default=str)

        print("\n=== PART 3 SUMMARY ===")
        print(f"Feature 3 code: {results['feature3_code_snippet']}")
        print(f"Feature 4 variants: {results['feature4_variants']}")
        print(f"Feature 5 surface: {results['feature5_surface']}")
        print(f"Feature 6-7 topbar: {len(results.get('topbar_controls', {}).get('buttonDetails', []))} buttons")
        print(f"Feature 7 breakpoints: {results['feature7_breakpoints']}")
        print(f"Feature 8 a11y: {results['feature8_a11y']}")
        print(f"Feature 9-11 states: skel={results['features9_11_states']['skeletonCount']}, empty={results['features9_11_states']['emptyStateCount']}, error={results['features9_11_states']['errorStateCount']}")
        print(f"Feature 12 tokens: cssVars={results['feature12_tokens']['cssVarCount']}")
        print(f"Feature 13 search: {results['feature13_search']}")
        print(f"Feature 14 async: {results['feature14_async']}")
        print(f"Feature 15 props: {results['feature15_props_table']}")
        print(f"Bug 3 donut: {results['bug3_donut_detail']}")
        print(f"Bug 4 bubble: {results['bug4_bubble_detail']}")
        print(f"Bug 6 sticky: {results['bug6_sticky']}")
        print(f"Bug 8 demo bgs: {[b['sectionBg'] for b in results['bug8_demo_bgs'] if b.get('found')]}")
        print(f"Bug 9 units: {results['bug9_unit']}")
        print(f"Bug 10 buttons: total={results['bug10_btn_detail']['total']} inline={results['bug10_btn_detail']['withMeaningfulInlineStyle']}")
        print(f"Bug 12 mobile: {results['bug12_mobile']}")
        print(f"v0.4: charts={v04_probes['chartCount']} tables={v04_probes['tableCount']} nested={v04_probes['nestedTableCount']} errors={len(v04_errors)}")


if __name__ == "__main__":
    run()
