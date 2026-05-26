"""
Deep probe: measure actual row heights + cell padding per density toggle,
and verify sticky header behavior for both PropertyTable + RankingTable.
"""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT_DIR = Path("/Users/vishalchauchan/Downloads/Anti-folder01/projects/charts-showcase/qa-screenshots/tables-diagnose-2026-05-26")
BASE_URL = "http://localhost:3070"


def measure_density(page, section_id: str, density: str, btn_label: str) -> dict:
    """Click a density button and measure row height + cell padding."""
    # click the density button
    btns = page.query_selector_all(f"#{section_id} button")
    for btn in btns:
        text = btn.text_content().strip() if btn.text_content() else ""
        if btn_label.lower() in text.lower():
            btn.scroll_into_view_if_needed()
            btn.click()
            page.wait_for_timeout(500)
            break

    data = page.evaluate(f"""
    (() => {{
        const section = document.getElementById('{section_id}');
        const table = section?.querySelector('table');
        if (!table) return {{ error: 'no table' }};
        const th = table.querySelector('thead th');
        const td = table.querySelector('tbody td');
        const tr = table.querySelector('tbody tr');
        const lastTd = table.querySelector('tbody tr:last-child td');
        const cs = el => el ? getComputedStyle(el) : null;
        const h = el => el ? Math.round(el.getBoundingClientRect().height) : 0;
        return {{
            density: '{density}',
            thPadding: cs(th)?.padding,
            thHeight: h(th),
            thFontSize: cs(th)?.fontSize,
            thBg: cs(th)?.backgroundColor,
            thPosition: cs(th)?.position,
            thTop: cs(th)?.top,
            tdPadding: cs(td)?.padding,
            tdHeight: h(td),
            tdFontSize: cs(td)?.fontSize,
            rowHeight: h(tr),
            lastTdBorderBottom: cs(lastTd)?.borderBottom,
            colCount: table.querySelectorAll('thead th').length,
            rowCount: table.querySelectorAll('tbody tr').length,
        }};
    }})()
    """)
    return data


def test_sticky(page, section_id: str) -> dict:
    """Test sticky header: scroll the table container and observe th position."""
    page.evaluate(f"""
        const s = document.getElementById('{section_id}');
        if (s) s.scrollIntoView({{ behavior: 'instant', block: 'start' }});
    """)
    page.wait_for_timeout(600)

    # Get initial th rect
    initial = page.evaluate(f"""
    (() => {{
        const s = document.getElementById('{section_id}');
        const th = s?.querySelector('thead th');
        if (!th) return null;
        const cs = getComputedStyle(th);
        return {{
            position: cs.position,
            top: cs.top,
            zIndex: cs.zIndex,
            rectTop: Math.round(th.getBoundingClientRect().top),
            bg: cs.backgroundColor,
        }};
    }})()
    """)

    # Scroll down 400px within the page (not the table container)
    page.evaluate("window.scrollBy(0, 400)")
    page.wait_for_timeout(400)

    after_scroll = page.evaluate(f"""
    (() => {{
        const s = document.getElementById('{section_id}');
        const th = s?.querySelector('thead th');
        if (!th) return null;
        return {{
            rectTop: Math.round(th.getBoundingClientRect().top),
            position: getComputedStyle(th).position,
        }};
    }})()
    """)

    return {"sectionId": section_id, "before": initial, "after": after_scroll}


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()

    page.goto(BASE_URL, wait_until="networkidle", timeout=30000)
    page.wait_for_timeout(2000)

    results = {"density_measurements": {}, "sticky_tests": {}}

    # ---- PropertyTable density cycle ----
    print("=== PropertyTable density cycle ===")
    pt_densities = [
        ("comfortable", "Comfortable"),
        ("standard", "Standard"),
        ("compact", "Compact"),
        ("spacious", "Spacious"),
    ]
    pt_data = []
    for density, label in pt_densities:
        page.evaluate("document.getElementById('table-property')?.scrollIntoView({behavior:'instant',block:'start'})")
        page.wait_for_timeout(400)
        d = measure_density(page, "table-property", density, label)
        pt_data.append(d)
        print(f"  {density}: rowH={d.get('rowHeight')} thPad={d.get('thPadding')} tdPad={d.get('tdPadding')} fontSize={d.get('tdFontSize')}")

    results["density_measurements"]["PropertyTable"] = pt_data

    # ---- RankingTable density cycle ----
    print("=== RankingTable density cycle ===")
    rt_densities = [
        ("standard", "Standard"),
        ("compact", "Compact"),
    ]
    rt_data = []
    for density, label in rt_densities:
        page.evaluate("document.getElementById('table-ranking')?.scrollIntoView({behavior:'instant',block:'start'})")
        page.wait_for_timeout(400)
        d = measure_density(page, "table-ranking", density, label)
        rt_data.append(d)
        print(f"  {density}: rowH={d.get('rowHeight')} thPad={d.get('thPadding')} tdPad={d.get('tdPadding')} thH={d.get('thHeight')} fontSize={d.get('tdFontSize')}")

    results["density_measurements"]["RankingTable"] = rt_data

    # ---- TableShell header style DOM check ----
    print("=== TableShell header styles ===")
    ts_headers = []
    for label in ["Card · Wash header", "Card · Inverted header", "Open · Transparent header"]:
        page.evaluate("document.getElementById('primitive-tableshell')?.scrollIntoView({behavior:'instant',block:'start'})")
        page.wait_for_timeout(300)
        btns = page.query_selector_all("#primitive-tableshell button")
        for btn in btns:
            text = btn.text_content().strip() if btn.text_content() else ""
            if label.lower()[:10] in text.lower():
                btn.scroll_into_view_if_needed()
                btn.click()
                page.wait_for_timeout(500)
                break
        data = page.evaluate("""
        (() => {
            const s = document.getElementById('primitive-tableshell');
            const th = s?.querySelector('thead th');
            const wrapper = s?.querySelector('.tableshell');
            const cs = el => el ? getComputedStyle(el) : null;
            return {
                thBg: cs(th)?.backgroundColor,
                thColor: cs(th)?.color,
                thPosition: cs(th)?.position,
                thPadding: cs(th)?.padding,
                thFontSize: cs(th)?.fontSize,
                thBorderBottom: cs(th)?.borderBottom,
                wrapperBorder: cs(wrapper)?.border,
                wrapperRadius: cs(wrapper)?.borderRadius,
                wrapperOverflow: cs(wrapper)?.overflow,
            };
        })()
        """)
        data["label"] = label
        ts_headers.append(data)
        print(f"  {label[:20]}: thBg={data.get('thBg')} thColor={data.get('thColor')} wBorder={data.get('wrapperBorder')[:40] if data.get('wrapperBorder') else 'n/a'}")

    results["tableshell_headers"] = ts_headers

    # ---- Sticky header test ----
    print("=== Sticky header tests ===")
    for sec_id in ["table-property", "table-ranking"]:
        page.goto(BASE_URL, wait_until="networkidle", timeout=15000)
        page.wait_for_timeout(1000)
        sticky = test_sticky(page, sec_id)
        results["sticky_tests"][sec_id] = sticky
        print(f"  {sec_id}: before_pos={sticky['before']['position'] if sticky['before'] else 'N/A'} before_top={sticky['before']['rectTop'] if sticky['before'] else 'N/A'} after_top={sticky['after']['rectTop'] if sticky['after'] else 'N/A'}")

    # Save
    out_path = OUT_DIR / "tables-density-sticky-probe.json"
    out_path.write_text(json.dumps(results, indent=2, default=str))
    print(f"\nProbe saved: {out_path}")

    browser.close()
