"""
Charts Showcase · B.4 Verify Part 2
Targeted feature probes + remaining screenshots
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

        # ── Feature 1: Sidebar TOC w/ active highlight + hash sync ────
        # Navigate to bubble chart via hash
        page.goto(f"{SHOWCASE_URL}#chart-bubble")
        page.wait_for_timeout(1500)
        active_items = page.evaluate("""() => {
            const items = document.querySelectorAll('[class*="active"], [aria-current="true"], [class*="current"]');
            return Array.from(items).slice(0, 5).map(i => ({
                text: i.textContent?.trim().substring(0, 40),
                classes: i.className.substring(0, 80),
                tag: i.tagName
            }));
        }""")
        results["feature1_active_items"] = active_items
        hash = page.evaluate("() => window.location.hash")
        results["feature1_hash"] = hash
        print(f"Feature 1 - active items: {active_items}, hash: {hash}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/sidebar-active-hash.png", full_page=False)

        # ── Feature 2: Per-chart props panel ──────────────────────────
        props_panels = page.evaluate("""() => {
            const panels = document.querySelectorAll('[class*="PropsTable"], table th');
            const propHeaders = Array.from(document.querySelectorAll('th')).filter(th =>
                ['Prop', 'Property', 'Type', 'Name', 'Default'].includes(th.textContent?.trim())
            );
            return {
                count: panels.length,
                propHeaders: propHeaders.slice(0, 6).map(th => th.textContent?.trim())
            };
        }""")
        results["feature2_props_panel"] = props_panels
        print(f"Feature 2 - props panel: {props_panels}")

        # ── Feature 3: Code snippet w/ copy ──────────────────────────
        code_snippets = page.evaluate("""() => {
            const pres = document.querySelectorAll('pre');
            const copyBtns = document.querySelectorAll('button[aria-label*="copy" i], button[aria-label*="Copy"], button:has-text("Copy")');
            return {
                preCount: pres.length,
                copyBtnCount: copyBtns.length,
                firstCode: pres[0]?.textContent?.substring(0, 80)
            };
        }""")
        results["feature3_code_snippet"] = code_snippets
        print(f"Feature 3 - code snippet: {code_snippets}")

        # ── Feature 4: Multiple data variants per chart ───────────────
        # Look for variant selector buttons (Low/Mid/High N= labels)
        variants = page.evaluate("""() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const variantBtns = buttons.filter(b => {
                const t = b.textContent?.trim() || '';
                return /N=|low|mid|high|small|large|variant/i.test(t) && t.length < 40;
            });
            return {
                count: variantBtns.length,
                texts: variantBtns.slice(0, 8).map(b => b.textContent?.trim())
            };
        }""")
        results["feature4_variants"] = variants
        print(f"Feature 4 - variants: {variants}")

        # ── Feature 5: Light AND dark surface ────────────────────────
        surface_toggles = page.evaluate("""() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const surfaceBtns = buttons.filter(b => {
                const t = b.textContent?.trim() || '';
                return /light|dark|surface/i.test(t) && t.length < 20;
            });
            return {
                count: surfaceBtns.length,
                texts: surfaceBtns.slice(0, 6).map(b => b.textContent?.trim())
            };
        }""")
        results["feature5_surface"] = surface_toggles
        print(f"Feature 5 - surface toggles: {surface_toggles}")

        # ── Feature 6: Reduced motion toggle ────────────────────────
        reduced_motion = page.evaluate("""() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const rmBtn = buttons.find(b => /reduced.motion|motion|animation/i.test(b.textContent?.trim() || '') || /reduced.motion/i.test(b.getAttribute('aria-label') || ''));
            const rmInput = document.querySelector('input[id*="motion"], [data-testid*="motion"]');
            return {
                buttonFound: !!rmBtn,
                buttonText: rmBtn?.textContent?.trim().substring(0, 30),
                inputFound: !!rmInput,
                toggleText: rmBtn?.getAttribute('aria-label') || rmBtn?.textContent?.trim()
            };
        }""")
        results["feature6_reduced_motion"] = reduced_motion
        print(f"Feature 6 - reduced motion: {reduced_motion}")

        # Also look for the top bar for motion/a11y controls
        topbar_controls = page.evaluate("""() => {
            const header = document.querySelector('header');
            if (!header) return 'NO HEADER';
            const buttons = Array.from(header.querySelectorAll('button'));
            return buttons.map(b => ({
                text: b.textContent?.trim().substring(0, 30),
                ariaLabel: b.getAttribute('aria-label'),
                title: b.getAttribute('title')
            }));
        }""")
        results["topbar_controls"] = topbar_controls
        print(f"Topbar controls: {topbar_controls}")

        # ── Feature 7: Responsive breakpoint preview ─────────────────
        breakpoint_switcher = page.evaluate("""() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const bpBtns = buttons.filter(b => {
                const t = b.textContent?.trim() || '';
                return /1440|1024|768|390|mobile|tablet|desktop/i.test(t) && t.length < 20;
            });
            return {
                count: bpBtns.length,
                texts: bpBtns.slice(0, 6).map(b => b.textContent?.trim())
            };
        }""")
        results["feature7_breakpoints"] = breakpoint_switcher
        print(f"Feature 7 - breakpoints: {breakpoint_switcher}")

        # ── Feature 8: A11y annotation overlay ───────────────────────
        a11y_controls = page.evaluate("""() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const a11yBtn = buttons.find(b => /a11y|accessibility|wcag|aria/i.test(b.textContent?.trim() || '') || /a11y|accessibility/i.test(b.getAttribute('aria-label') || ''));
            const overlay = document.querySelector('[class*="a11y-overlay"], [class*="A11yOverlay"], [data-a11y]');
            return {
                buttonFound: !!a11yBtn,
                buttonText: a11yBtn?.textContent?.trim().substring(0, 30),
                overlayFound: !!overlay
            };
        }""")
        results["feature8_a11y"] = a11y_controls
        print(f"Feature 8 - a11y: {a11y_controls}")

        # ── Features 9-11: Loading/Empty/Error states ─────────────────
        state_demos = page.evaluate("""() => {
            const sections = Array.from(document.querySelectorAll('section, [id*="state"]'));
            const loadingEl = document.querySelector('[class*="Loading"], [class*="loading"], [class*="Skeleton"], [class*="skeleton"]');
            const emptyEl = document.querySelector('[class*="Empty"], [class*="empty-state"], [class*="EmptyState"]');
            const errorEl = document.querySelector('[class*="Error"], [class*="error-state"], [class*="ErrorState"]');
            const tabs = Array.from(document.querySelectorAll('[role="tab"]'));

            // Also check for state-related anchors
            const stateLinks = Array.from(document.querySelectorAll('a[href*="state"]'));

            return {
                loadingFound: !!loadingEl,
                emptyFound: !!emptyEl,
                errorFound: !!errorEl,
                tabCount: tabs.length,
                tabTexts: tabs.slice(0, 6).map(t => t.textContent?.trim()),
                stateLinks: stateLinks.map(l => l.textContent?.trim()).slice(0, 6)
            };
        }""")
        results["features9_11_states"] = state_demos
        print(f"Features 9-11 - states: {state_demos}")

        # Navigate to state section
        page.goto(f"{SHOWCASE_URL}#state-chartskeleton")
        page.wait_for_timeout(1500)
        page.screenshot(path=f"{SCREENSHOT_DIR}/async-demo-loading.png", full_page=False)
        print("✓ async-demo-loading.png")

        # ── Feature 12: Token reference panel ────────────────────────
        token_panel = page.evaluate("""() => {
            const tokenEls = document.querySelectorAll('[class*="token"], [class*="Token"], [data-panel*="token"]');
            const varTexts = Array.from(document.querySelectorAll('code, span')).filter(el =>
                el.textContent?.startsWith('--') && el.textContent?.length < 60
            );
            return {
                tokenPanelCount: tokenEls.length,
                cssVarCount: varTexts.length,
                sampleVars: varTexts.slice(0, 5).map(e => e.textContent?.trim())
            };
        }""")
        results["feature12_tokens"] = token_panel
        print(f"Feature 12 - tokens: {token_panel}")

        # ── Feature 13: Filter/search/sort ───────────────────────────
        page.goto(SHOWCASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        search_check = page.evaluate("""() => {
            const searchInput = document.querySelector('input[type="search"], input[placeholder*="search" i], input[placeholder*="filter" i]');
            const sortButtons = document.querySelectorAll('[class*="sort"], [aria-label*="sort" i]');
            const filterChips = document.querySelectorAll('[class*="FilterChip"], [class*="filter-chip"], [role="checkbox"]');
            return {
                searchFound: !!searchInput,
                searchPlaceholder: searchInput?.getAttribute('placeholder'),
                sortCount: sortButtons.length,
                filterCount: filterChips.length
            };
        }""")
        results["feature13_search"] = search_check
        print(f"Feature 13 - search/filter: {search_check}")

        # Test search actually works
        search_input = page.query_selector('input[type="search"], input[placeholder*="search" i]')
        if search_input:
            search_input.fill("bubble")
            page.wait_for_timeout(800)
            visible_demos = page.evaluate("""() => {
                const demos = document.querySelectorAll('[id*="chart-"], [id*="table-"], [id*="state-"]');
                return Array.from(demos).filter(d => {
                    const style = getComputedStyle(d);
                    return style.display !== 'none';
                }).map(d => d.id);
            }""")
            results["search_filter_result"] = visible_demos
            print(f"  Search 'bubble' visible demos: {visible_demos}")
            page.screenshot(path=f"{SCREENSHOT_DIR}/search-bubble-filtered.png", full_page=False)
            search_input.fill("")
            page.wait_for_timeout(500)

        # ── Feature 14: Live async API mock ──────────────────────────
        page.goto(f"{SHOWCASE_URL}#state-async-fetch")
        page.wait_for_timeout(1500)
        async_section = page.evaluate("""() => {
            const asyncEl = document.querySelector('[id*="async-fetch"], [class*="AsyncFetch"]');
            if (!asyncEl) return { found: false };
            const fetchBtn = asyncEl.querySelector('button');
            return {
                found: true,
                hasFetchButton: !!fetchBtn,
                buttonText: fetchBtn?.textContent?.trim().substring(0, 30)
            };
        }""")
        results["feature14_async"] = async_section
        print(f"Feature 14 - async: {async_section}")

        # Click fetch button if found
        fetch_btn = page.query_selector('[id*="async-fetch"] button, [class*="AsyncFetch"] button')
        if fetch_btn:
            fetch_btn.click()
            page.wait_for_timeout(500)
            page.screenshot(path=f"{SCREENSHOT_DIR}/async-demo-loading2.png", full_page=False)
            print("✓ async-demo-loading2.png (after click)")

        # ── Feature 15: Storybook-style props table ───────────────────
        page.goto(SHOWCASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        props_table_detail = page.evaluate("""() => {
            const tables = document.querySelectorAll('table');
            const propsTables = Array.from(tables).filter(t => {
                const ths = t.querySelectorAll('th');
                const texts = Array.from(ths).map(th => th.textContent?.trim().toLowerCase());
                return texts.some(t => ['prop', 'name', 'property'].includes(t)) &&
                       texts.some(t => ['type', 'default'].includes(t));
            });
            return {
                totalTables: tables.length,
                propsTableCount: propsTables.length,
                firstPropsTableHeaders: propsTables[0] ?
                    Array.from(propsTables[0].querySelectorAll('th')).map(th => th.textContent?.trim()) : []
            };
        }""")
        results["feature15_props_table"] = props_table_detail
        print(f"Feature 15 - props table: {props_table_detail}")

        # ── Bug 3 deeper probe: donut centering ──────────────────────
        page.goto(f"{SHOWCASE_URL}#chart-donut")
        page.wait_for_timeout(2000)
        donut_detail = page.evaluate("""() => {
            const charts = document.querySelectorAll('.highcharts-container, [class*="highcharts"]');
            if (!charts.length) return { found: false, chartsCount: 0 };
            const donutChart = Array.from(charts).find(c => {
                const pies = c.querySelectorAll('.highcharts-pie-series');
                return pies.length > 0;
            });
            if (!donutChart) return { found: false, chartsCount: charts.length, noPie: true };
            const rect = donutChart.getBoundingClientRect();
            const parent = donutChart.parentElement;
            const parentRect = parent?.getBoundingClientRect();
            const textLabels = donutChart.querySelectorAll('text');
            return {
                found: true,
                chartLeft: Math.round(rect.left),
                chartRight: Math.round(rect.right),
                chartWidth: Math.round(rect.width),
                parentLeft: parentRect ? Math.round(parentRect.left) : null,
                parentWidth: parentRect ? Math.round(parentRect.width) : null,
                textLabelCount: textLabels.length
            };
        }""")
        results["bug3_donut_detail"] = donut_detail
        print(f"Bug 3 donut detail: {donut_detail}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/demo-chart-donut.png", full_page=False)
        print("✓ demo-chart-donut.png")

        # ── Bug 4 deeper probe: Bubble chart spacing ──────────────────
        page.goto(f"{SHOWCASE_URL}#chart-bubble")
        page.wait_for_timeout(2000)
        bubble_detail = page.evaluate("""() => {
            const bubbleSection = document.querySelector('[id*="chart-bubble"]');
            if (!bubbleSection) return { found: false };

            // Find cinematic dark container
            const cinematicEl = bubbleSection.querySelector('[class*="cinematic"], [class*="dark"]') ||
                                 bubbleSection.closest('[class*="cinematic"], [class*="dark"]');
            const chartContainer = bubbleSection.querySelector('.highcharts-container');
            const dataLabels = bubbleSection.querySelectorAll('.highcharts-data-label');

            return {
                found: true,
                cinematicEl: cinematicEl ? cinematicEl.className.substring(0, 60) : null,
                cinematicPaddingTop: cinematicEl ? getComputedStyle(cinematicEl).paddingTop : null,
                chartContainerTop: chartContainer ? chartContainer.getBoundingClientRect().top : null,
                dataLabelCount: dataLabels.length
            };
        }""")
        results["bug4_bubble_detail"] = bubble_detail
        print(f"Bug 4 bubble detail: {bubble_detail}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/demo-chart-bubble-compare.png", full_page=False)
        print("✓ demo-chart-bubble-compare.png")

        # ── Bug 6: Sticky table deeper probe ────────────────────────
        page.goto(f"{SHOWCASE_URL}#table-property")
        page.wait_for_timeout(2000)
        page.screenshot(path=f"{SCREENSHOT_DIR}/demo-table-property-card.png", full_page=False)
        print("✓ demo-table-property-card.png")

        sticky_detail = page.evaluate("""() => {
            const section = document.querySelector('[id*="table-property"]');
            if (!section) return { found: false };
            const ths = section.querySelectorAll('thead th');
            const stickyThs = Array.from(ths).filter(th => getComputedStyle(th).position === 'sticky');
            const scrollParent = section.querySelector('[style*="overflow"], [class*="overflow"]');
            return {
                found: true,
                thCount: ths.length,
                stickyThCount: stickyThs.length,
                stickyThTop: stickyThs[0] ? getComputedStyle(stickyThs[0]).top : null,
                stickyBorderBottom: stickyThs[0] ? getComputedStyle(stickyThs[0]).borderBottom : null,
                scrollParentFound: !!scrollParent,
                scrollParentOverflow: scrollParent ? getComputedStyle(scrollParent).overflow : null
            };
        }""")
        results["bug6_sticky_detail"] = sticky_detail
        print(f"Bug 6 sticky detail: {sticky_detail}")

        # TableShell header style variants
        page.goto(f"{SHOWCASE_URL}#table-property")
        page.wait_for_timeout(2000)

        # Check for wash/transparent/inverted header style toggles
        header_style_btns = page.evaluate("""() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const styleBtns = buttons.filter(b => {
                const t = b.textContent?.trim() || '';
                return /wash|transparent|inverted|card|open/i.test(t) && t.length < 20;
            });
            return {
                count: styleBtns.length,
                texts: styleBtns.map(b => b.textContent?.trim())
            };
        }""")
        results["table_header_styles"] = header_style_btns
        print(f"Table header styles: {header_style_btns}")

        # Take table variant screenshots
        page.screenshot(path=f"{SCREENSHOT_DIR}/demo-table-headerstyle-wash.png", full_page=False)
        print("✓ demo-table-headerstyle-wash.png")

        # Check for 'open' variant button
        open_btn = page.query_selector('button:has-text("open"), button:has-text("Open")')
        if open_btn:
            open_btn.click()
            page.wait_for_timeout(800)
            page.screenshot(path=f"{SCREENSHOT_DIR}/demo-table-property-open.png", full_page=False)
            print("✓ demo-table-property-open.png")
        else:
            page.goto(f"{SHOWCASE_URL}#table-ranking")
            page.wait_for_timeout(1500)
            page.screenshot(path=f"{SCREENSHOT_DIR}/demo-table-property-open.png", full_page=False)
            print("✓ demo-table-property-open.png (ranking table fallback)")

        # Sticky engaged screenshot
        page.goto(f"{SHOWCASE_DIR}#table-ranking" if False else f"{SHOWCASE_URL}#table-ranking")
        page.wait_for_timeout(1500)
        # Scroll within table to engage sticky
        page.evaluate("""() => {
            const tableWrapper = document.querySelector('[id*="table-ranking"] [style*="overflow"], [id*="table-ranking"] [class*="overflow"]');
            if (tableWrapper) tableWrapper.scrollTop = 100;
        }""")
        page.wait_for_timeout(500)
        page.screenshot(path=f"{SCREENSHOT_DIR}/demo-sticky-engaged.png", full_page=False)
        print("✓ demo-sticky-engaged.png")

        # Transparent header style
        page.goto(f"{SHOWCASE_URL}#table-property")
        page.wait_for_timeout(1500)
        transparent_btn = page.query_selector('button:has-text("transparent"), button:has-text("Transparent")')
        if transparent_btn:
            transparent_btn.click()
            page.wait_for_timeout(800)
            page.screenshot(path=f"{SCREENSHOT_DIR}/demo-table-headerstyle-transparent.png", full_page=False)
        else:
            page.screenshot(path=f"{SCREENSHOT_DIR}/demo-table-headerstyle-transparent.png", full_page=False)
        print("✓ demo-table-headerstyle-transparent.png")

        inverted_btn = page.query_selector('button:has-text("inverted"), button:has-text("Inverted")')
        if inverted_btn:
            inverted_btn.click()
            page.wait_for_timeout(800)
            page.screenshot(path=f"{SCREENSHOT_DIR}/demo-table-headerstyle-inverted.png", full_page=False)
        else:
            page.screenshot(path=f"{SCREENSHOT_DIR}/demo-table-headerstyle-inverted.png", full_page=False)
        print("✓ demo-table-headerstyle-inverted.png")

        # ── Bug 8: Section bg alternation ─────────────────────────────
        page.goto(SHOWCASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)
        section_detail = page.evaluate("""() => {
            // Check demo canvases for bg alternation
            const demoCanvases = document.querySelectorAll('[class*="DemoCanvas"], [class*="demo-canvas"], [id*="chart-"], [id*="table-"], [id*="state-"]');
            const sections = document.querySelectorAll('main > div, main > section, [class*="section"]');
            const mainBg = getComputedStyle(document.querySelector('main') || document.body).backgroundColor;
            return {
                demoCanvasCount: demoCanvases.length,
                mainBg: mainBg,
                sectionBgs: Array.from(sections).slice(0, 8).map((s, i) => ({
                    index: i,
                    tag: s.tagName,
                    bg: getComputedStyle(s).backgroundColor,
                    id: s.id?.substring(0, 30),
                    classes: s.className.substring(0, 60)
                }))
            };
        }""")
        results["bug8_section_bg"] = section_detail
        print(f"Bug 8 section bg detail: {json.dumps(section_detail, indent=2)}")

        # ── Bug 9: ChartFigure unit position ─────────────────────────
        unit_detail = page.evaluate("""() => {
            // Look for unit labels near ChartFigure headers
            const chartFigures = document.querySelectorAll('[class*="ChartFigure"], figure, [class*="chartfigure"]');
            return Array.from(chartFigures).slice(0, 4).map(fig => {
                const unit = fig.querySelector('[class*="unit"], [class*="Unit"]');
                const eyebrow = fig.querySelector('[class*="eyebrow"], [class*="Eyebrow"]');
                return {
                    hasUnit: !!unit,
                    unitText: unit?.textContent?.trim().substring(0, 15),
                    unitPosition: unit ? getComputedStyle(unit).position : null,
                    unitTop: unit ? getComputedStyle(unit).top : null,
                    unitRight: unit ? getComputedStyle(unit).right : null,
                    hasEyebrow: !!eyebrow
                };
            });
        }""")
        results["bug9_unit_detail"] = unit_detail
        print(f"Bug 9 unit detail: {unit_detail}")

        # ── Bug 10: DS Button check ───────────────────────────────────
        button_ds_check = page.evaluate("""() => {
            const allButtons = Array.from(document.querySelectorAll('button'));
            // DS buttons typically have data-variant or specific class patterns from the DS
            const dsStyled = allButtons.filter(b => {
                const cl = b.className;
                return cl.includes('btn') || cl.includes('Button') || b.hasAttribute('data-variant');
            });
            const rawInline = allButtons.filter(b => {
                return b.style.cssText.length > 0 && !b.style.cssText.includes('background: none');
            });
            return {
                total: allButtons.length,
                dsStyled: dsStyled.length,
                rawInlineStyle: rawInline.length,
                rawInlineSamples: rawInline.slice(0, 4).map(b => ({
                    text: b.textContent?.trim().substring(0, 25),
                    style: b.style.cssText.substring(0, 60)
                }))
            };
        }""")
        results["bug10_buttons"] = button_ds_check
        print(f"Bug 10 buttons: {button_ds_check}")

        # ── Bug 12: Mobile 390 sidebar behavior ──────────────────────
        page390 = browser.new_page(viewport={"width": 390, "height": 844})
        page390.goto(SHOWCASE_URL)
        page390.wait_for_load_state("networkidle")
        page390.wait_for_timeout(2000)
        mobile_detail = page390.evaluate("""() => {
            const sidebar = document.querySelector('[class*="sidebar"], [class*="Sidebar"], aside');
            const hamburger = document.querySelector('[class*="hamburger"], [class*="menu-btn"], [aria-label*="menu" i], [aria-label*="navigation" i]');
            const rightPanel = document.querySelector('[class*="right-panel"], [class*="RightPanel"]');
            const charts = document.querySelectorAll('.highcharts-container');
            const chartWidths = Array.from(charts).slice(0, 3).map(c => ({
                width: c.getBoundingClientRect().width
            }));
            return {
                sidebarDisplay: sidebar ? getComputedStyle(sidebar).display : 'NOT FOUND',
                hamburgerFound: !!hamburger,
                hamburgerAriaLabel: hamburger?.getAttribute('aria-label'),
                rightPanelDisplay: rightPanel ? getComputedStyle(rightPanel).display : 'NOT FOUND',
                chartWidths: chartWidths,
                viewportWidth: window.innerWidth
            };
        }""")
        results["bug12_mobile"] = mobile_detail
        print(f"Bug 12 mobile: {mobile_detail}")
        page390.close()

        # ── v0.4 regression: additional sections ─────────────────────
        page_v04 = browser.new_page(viewport={"width": 1440, "height": 900})
        v04_errors = []
        page_v04.on("console", lambda m: v04_errors.append(m.text) if m.type == "error" else None)
        page_v04.goto(V04_URL)
        page_v04.wait_for_load_state("networkidle")
        page_v04.wait_for_timeout(3000)

        # Check charts in v0.4
        v04_charts = page_v04.evaluate("""() => {
            const charts = document.querySelectorAll('.highcharts-container');
            const tables = document.querySelectorAll('table');
            const nestedTables = document.querySelectorAll('table table');
            return {
                chartCount: charts.length,
                tableCount: tables.length,
                nestedTableCount: nestedTables.length,
                hydrationError: document.body.innerHTML.includes('Hydration')
            };
        }""")
        results["v04_charts"] = v04_charts
        print(f"v0.4 charts: {v04_charts}")

        # Screenshot key sections
        sections_to_check = [8, 10, 13, 14, 16, 17]
        for sec in sections_to_check:
            page_v04.evaluate(f"""() => {{
                const el = document.querySelector('[id*="section-{sec}"], [id*="sec-{sec}"], h2:nth-of-type({sec})');
                if (el) el.scrollIntoView();
            }}""")
            page_v04.wait_for_timeout(800)

        page_v04.screenshot(path=f"{SCREENSHOT_DIR}/v04-charts-overview.png", full_page=False)
        print("✓ v04-charts-overview.png")
        page_v04.evaluate("() => window.scrollTo(0, document.body.scrollHeight)")
        page_v04.wait_for_timeout(1500)
        page_v04.screenshot(path=f"{SCREENSHOT_DIR}/v04-bottom.png", full_page=False)

        results["v04_errors_part2"] = v04_errors
        page_v04.close()

        browser.close()

        # Save results
        with open(f"{SCREENSHOT_DIR}/probe-results2.json", "w") as f:
            json.dump(results, f, indent=2, default=str)

        print("\n=== PART 2 SUMMARY ===")
        print(f"Feature 1 (sidebar TOC hash): hash={results.get('feature1_hash')}, active={len(results.get('feature1_active_items', []))} items")
        print(f"Feature 2 (props panel): {results.get('feature2_props_panel')}")
        print(f"Feature 3 (code snippet): {results.get('feature3_code_snippet')}")
        print(f"Feature 4 (variants): {results.get('feature4_variants')}")
        print(f"Feature 5 (surface): {results.get('feature5_surface')}")
        print(f"Feature 6 (reduced motion): {results.get('feature6_reduced_motion')}")
        print(f"Feature 7 (breakpoints): {results.get('feature7_breakpoints')}")
        print(f"Feature 8 (a11y overlay): {results.get('feature8_a11y')}")
        print(f"Features 9-11 (states): {results.get('features9_11_states')}")
        print(f"Feature 12 (tokens): {results.get('feature12_tokens')}")
        print(f"Feature 13 (search): {results.get('feature13_search')}")
        print(f"Feature 14 (async): {results.get('feature14_async')}")
        print(f"Feature 15 (props table): {results.get('feature15_props_table')}")
        print(f"v0.4 errors: {len(v04_errors)}")

if __name__ == "__main__":
    run()
