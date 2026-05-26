"""
Tables Diagnose Capture Script · 2026-05-26
Captures all PropertyTable / RankingTable / TableShell / TableSkeleton variants
at 1440px viewport for aura-qa analysis.
"""

import json
import time
from pathlib import Path
from playwright.sync_api import sync_playwright, Page

OUT_DIR = Path("/Users/vishalchauchan/Downloads/Anti-folder01/projects/charts-showcase/qa-screenshots/tables-diagnose-2026-05-26")
OUT_DIR.mkdir(parents=True, exist_ok=True)

BASE_URL = "http://localhost:3070"

console_errors = []

def capture(page: Page, name: str, full_page: bool = False):
    path = str(OUT_DIR / f"{name}.png")
    page.screenshot(path=path, full_page=full_page)
    print(f"  SAVED: {name}.png")
    return path


def scroll_to_section(page: Page, section_id: str, extra_wait: int = 800):
    """Scroll section into view and wait for animations."""
    page.evaluate(f"""
        const el = document.getElementById('{section_id}');
        if (el) el.scrollIntoView({{behavior: 'instant', block: 'start'}});
    """)
    page.wait_for_timeout(extra_wait)


def click_variant_tabs(page: Page, section_id: str) -> list[str]:
    """Find and return all variant/density/state tab labels in a section."""
    labels = page.evaluate(f"""
        (() => {{
            const section = document.getElementById('{section_id}');
            if (!section) return [];
            const buttons = section.querySelectorAll('button[role="tab"], [data-variant], button');
            return Array.from(buttons).map(b => b.textContent?.trim()).filter(Boolean).slice(0, 20);
        }})()
    """)
    return labels


def probe_dom(page: Page) -> dict:
    """Run the canonical DOM probe script against all table sections."""
    result = page.evaluate("""
    () => {
      const result = { tables: [], timestamp: Date.now() };
      const selectors = [
        'section[id^="table-"]',
        'section[id^="primitive-tableshell"]',
        'section[id="primitive-tableshell"]',
        '#table-property',
        '#table-ranking',
      ];
      const seen = new Set();
      const sections = [];
      selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
          if (!seen.has(el)) { seen.add(el); sections.push(el); }
        });
      });

      sections.forEach(section => {
        const t = section.querySelector('table');
        const wrapper = section.querySelector(
          '[class*="tableshell"], [data-component*="TableShell"], ' +
          '[class*="TableShell"], [class*="table-wrapper"], [class*="tableWrapper"], ' +
          'div > table'
        );
        const actualWrapper = wrapper || (t ? t.parentElement : null);
        const firstTh = t?.querySelector('thead th');
        const firstTr = t?.querySelector('tbody tr');
        const firstTd = t?.querySelector('tbody td');
        const lastTd = t?.querySelector('tbody tr:last-child td:last-child');

        const cs = (el) => el ? getComputedStyle(el) : null;
        const bbox = (el) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
        };

        const wcs = cs(actualWrapper);
        const thcs = cs(firstTh);
        const tdcs = cs(firstTd);
        const lastTdcs = cs(lastTd);

        result.tables.push({
          sectionId: section.id,
          h3: section.querySelector('h3, h2')?.textContent?.trim(),
          hasThead: !!t?.querySelector('thead'),
          hasTable: !!t,
          tableBbox: bbox(t),
          wrapperClass: actualWrapper?.className?.toString()?.slice(0, 120),
          wrapperTag: actualWrapper?.tagName,

          wrapperBorder: wcs?.border || 'no-wrap',
          wrapperBorderRadius: wcs?.borderRadius || 'no-wrap',
          wrapperOverflowX: wcs?.overflowX || 'no-wrap',
          wrapperBoxShadow: wcs?.boxShadow || 'no-wrap',
          wrapperBackground: wcs?.backgroundColor || 'no-wrap',
          wrapperPadding: wcs?.padding || 'no-wrap',

          firstThBg: thcs?.backgroundColor || 'no-th',
          firstThColor: thcs?.color || 'no-th',
          firstThPosition: thcs?.position || 'no-th',
          firstThBorderBottom: thcs?.borderBottom || 'no-th',
          firstThPadding: thcs?.padding || 'no-th',
          firstThFontSize: thcs?.fontSize || 'no-th',
          firstThHeight: bbox(firstTh)?.h || 0,
          thBorderRadius: thcs?.borderRadius || 'no-th',

          rowHeight: bbox(firstTr)?.h || 0,
          firstTdBorderBottom: tdcs?.borderBottom || 'no-td',
          firstTdPadding: tdcs?.padding || 'no-td',
          firstTdFontSize: tdcs?.fontSize || 'no-td',
          tdBorderRadius: tdcs?.borderRadius || 'no-td',

          lastTdBorderBottom: lastTdcs?.borderBottom || 'no-last-td',
          lastTdBorderRadius: lastTdcs?.borderRadius || 'no-last-td',

          colCount: t?.querySelectorAll('thead th').length || 0,
          rowCount: t?.querySelectorAll('tbody tr').length || 0,
          thSampleTexts: Array.from(t?.querySelectorAll('thead th') || []).slice(0, 6).map(th => ({
            text: th.textContent?.trim().slice(0, 25),
            bbox: { w: Math.round(th.getBoundingClientRect().width), h: Math.round(th.getBoundingClientRect().height) },
            textWraps: th.scrollHeight > th.clientHeight + 2,
          })),
        });
      });
      return result;
    }
    """)
    return result


def get_tab_buttons(page: Page, section_id: str, label_filter: str = None) -> list:
    """Get all button elements in a section, optionally filtered by label."""
    buttons = page.query_selector_all(f"#{section_id} button")
    result = []
    for btn in buttons:
        text = btn.text_content().strip() if btn.text_content() else ""
        if label_filter is None or label_filter.lower() in text.lower():
            result.append((btn, text))
    return result


def find_demo_controls(page: Page, section_id: str) -> dict:
    """Discover what controls exist in a section (variant/density/state/header toggles)."""
    info = page.evaluate(f"""
    (() => {{
        const section = document.getElementById('{section_id}');
        if (!section) return {{ found: false }};
        const buttons = Array.from(section.querySelectorAll('button, [role="tab"]'));
        const labels = buttons.map(b => b.textContent?.trim()).filter(Boolean);
        const selects = Array.from(section.querySelectorAll('select')).map(s => {{
            return {{ options: Array.from(s.options).map(o => o.text) }};
        }});
        return {{ found: true, buttonLabels: labels, selects }};
    }})()
    """)
    return info


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()

    # Capture console errors
    page.on("console", lambda msg: console_errors.append({
        "type": msg.type,
        "text": msg.text[:200]
    }) if msg.type in ("error", "warning") else None)

    print("=== Loading page ===")
    page.goto(BASE_URL, wait_until="networkidle", timeout=30000)
    page.wait_for_timeout(2000)

    # --- Full page overview ---
    print("\n=== Full page overview ===")
    capture(page, "00-full-page-overview", full_page=True)

    # =========================================================
    # PROPERTY TABLE SECTION
    # =========================================================
    print("\n=== PropertyTable ===")
    scroll_to_section(page, "table-property", 1500)
    capture(page, "propertytable-default")

    # Discover controls
    pt_controls = find_demo_controls(page, "table-property")
    print(f"  Controls found: {json.dumps(pt_controls, indent=2)}")

    # Cycle through variant/density/state/headerStyle buttons
    # First screenshot at idle
    pt_buttons_raw = get_tab_buttons(page, "table-property")
    print(f"  Buttons: {[t for _, t in pt_buttons_raw]}")

    # Group by category keywords
    density_keywords = ["compact", "standard", "comfortable", "spacious"]
    variant_keywords = ["card", "open"]
    header_keywords = ["wash", "transparent", "inverted"]
    state_keywords = ["loading", "empty", "error", "skeleton"]

    def click_and_capture(btn, label, prefix):
        try:
            btn.scroll_into_view_if_needed()
            btn.click()
            page.wait_for_timeout(600)
            safe_label = label.lower().replace(" ", "-").replace("/", "-")
            capture(page, f"{prefix}-{safe_label}")
            return True
        except Exception as e:
            print(f"  ERROR clicking '{label}': {e}")
            return False

    # Click density buttons
    print("  --- Density variants ---")
    for btn, label in pt_buttons_raw:
        if any(k in label.lower() for k in density_keywords):
            scroll_to_section(page, "table-property", 300)
            click_and_capture(btn, label, "propertytable-density")

    # Click variant buttons (card / open)
    print("  --- Variant (card/open) ---")
    for btn, label in pt_buttons_raw:
        if any(k in label.lower() for k in variant_keywords):
            scroll_to_section(page, "table-property", 300)
            click_and_capture(btn, label, "propertytable-variant")

    # Click header style buttons
    print("  --- Header styles ---")
    for btn, label in pt_buttons_raw:
        if any(k in label.lower() for k in header_keywords):
            scroll_to_section(page, "table-property", 300)
            click_and_capture(btn, label, "propertytable-header")

    # Click state buttons
    print("  --- States ---")
    for btn, label in pt_buttons_raw:
        if any(k in label.lower() for k in state_keywords):
            scroll_to_section(page, "table-property", 300)
            click_and_capture(btn, label, "propertytable-state")

    # Screenshot ALL numbered variants (Variant 1, Variant 2, etc.)
    print("  --- All variant buttons ---")
    for i, (btn, label) in enumerate(pt_buttons_raw):
        scroll_to_section(page, "table-property", 300)
        click_and_capture(btn, label, f"propertytable-variant-{i}")

    # Sticky header test — scroll table container 200px
    print("  --- Sticky header test ---")
    scroll_to_section(page, "table-property", 500)
    page.evaluate("""
        const section = document.getElementById('table-property');
        if (section) {
            // Scroll page to mid-section, then capture
            const rect = section.getBoundingClientRect();
            window.scrollBy(0, rect.height * 0.4);
        }
    """)
    page.wait_for_timeout(800)
    capture(page, "propertytable-scrolled-mid")

    # =========================================================
    # RANKING TABLE SECTION
    # =========================================================
    print("\n=== RankingTable ===")
    scroll_to_section(page, "table-ranking", 1500)
    capture(page, "rankingtable-default")

    rt_controls = find_demo_controls(page, "table-ranking")
    print(f"  Controls: {json.dumps(rt_controls, indent=2)}")

    rt_buttons_raw = get_tab_buttons(page, "table-ranking")
    print(f"  Buttons: {[t for _, t in rt_buttons_raw]}")

    print("  --- RankingTable density ---")
    for btn, label in rt_buttons_raw:
        if any(k in label.lower() for k in density_keywords):
            scroll_to_section(page, "table-ranking", 300)
            click_and_capture(btn, label, "rankingtable-density")

    print("  --- RankingTable variants ---")
    for btn, label in rt_buttons_raw:
        if any(k in label.lower() for k in variant_keywords):
            scroll_to_section(page, "table-ranking", 300)
            click_and_capture(btn, label, "rankingtable-variant")

    print("  --- RankingTable header styles ---")
    for btn, label in rt_buttons_raw:
        if any(k in label.lower() for k in header_keywords):
            scroll_to_section(page, "table-ranking", 300)
            click_and_capture(btn, label, "rankingtable-header")

    print("  --- RankingTable states ---")
    for btn, label in rt_buttons_raw:
        if any(k in label.lower() for k in state_keywords):
            scroll_to_section(page, "table-ranking", 300)
            click_and_capture(btn, label, "rankingtable-state")

    print("  --- All RankingTable buttons ---")
    for i, (btn, label) in enumerate(rt_buttons_raw):
        scroll_to_section(page, "table-ranking", 300)
        click_and_capture(btn, label, f"rankingtable-variant-{i}")

    # Sticky test
    scroll_to_section(page, "table-ranking", 500)
    page.evaluate("""
        const s = document.getElementById('table-ranking');
        if (s) window.scrollBy(0, s.getBoundingClientRect().height * 0.4);
    """)
    page.wait_for_timeout(800)
    capture(page, "rankingtable-scrolled-mid")

    # =========================================================
    # PRIMITIVE — TABLESHELL
    # =========================================================
    print("\n=== TableShell primitive ===")
    scroll_to_section(page, "primitive-tableshell", 1500)
    capture(page, "tableshell-primitive")

    ts_controls = find_demo_controls(page, "primitive-tableshell")
    print(f"  Controls: {json.dumps(ts_controls, indent=2)}")

    ts_buttons = get_tab_buttons(page, "primitive-tableshell")
    print(f"  Buttons: {[t for _, t in ts_buttons]}")

    for i, (btn, label) in enumerate(ts_buttons):
        scroll_to_section(page, "primitive-tableshell", 300)
        click_and_capture(btn, label, f"tableshell-variant-{i}")

    # =========================================================
    # STATE — TABLE SKELETON
    # =========================================================
    print("\n=== TableSkeleton state ===")
    scroll_to_section(page, "state-tableskeleton", 1500)
    capture(page, "tableskeleton-state")

    tsk_controls = find_demo_controls(page, "state-tableskeleton")
    print(f"  TableSkeleton controls: {json.dumps(tsk_controls, indent=2)}")

    tsk_buttons = get_tab_buttons(page, "state-tableskeleton")
    for i, (btn, label) in enumerate(tsk_buttons):
        scroll_to_section(page, "state-tableskeleton", 300)
        click_and_capture(btn, label, f"tableskeleton-variant-{i}")

    # =========================================================
    # STATE — EMPTY / ERROR / LOADING
    # =========================================================
    print("\n=== State demos ===")
    for state_id in ["state-emptystate", "state-errorstate", "state-async-fetch"]:
        try:
            scroll_to_section(page, state_id, 1000)
            safe_id = state_id.replace("state-", "")
            capture(page, f"propertytable-state-{safe_id}")
        except Exception as e:
            print(f"  ERROR on {state_id}: {e}")

    # =========================================================
    # DOM PROBE — scroll back to top and run full probe
    # =========================================================
    print("\n=== Running DOM probe ===")
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(500)

    # First probe at top — sections may not be rendered until visible
    # Scroll to each table section to force render, then probe
    for sec_id in ["table-property", "table-ranking", "primitive-tableshell", "state-tableskeleton"]:
        scroll_to_section(page, sec_id, 600)

    # Final probe after all sections visited
    dom_data = probe_dom(page)
    dom_data["consoleErrors"] = console_errors
    dom_data["captureNote"] = "Probe run after cycling all sections. 1440px viewport."

    probe_path = OUT_DIR / "tables-dom-probe.json"
    probe_path.write_text(json.dumps(dom_data, indent=2, default=str))
    print(f"  DOM probe saved: {probe_path}")
    print(f"  Tables probed: {len(dom_data.get('tables', []))}")

    # Console error summary
    errors_only = [e for e in console_errors if e["type"] == "error"]
    warnings_only = [e for e in console_errors if e["type"] == "warning"]
    print(f"\n  Console errors: {len(errors_only)}")
    print(f"  Console warnings: {len(warnings_only)}")
    for e in errors_only[:10]:
        print(f"    ERR: {e['text'][:100]}")

    browser.close()
    print("\n=== Done ===")
    print(f"Screenshots → {OUT_DIR}")
    files = list(OUT_DIR.glob("*.png"))
    print(f"Total screenshots: {len(files)}")
    for f in sorted(files):
        print(f"  {f.name}")
