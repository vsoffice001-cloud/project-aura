"""
QA capture script — charts-showcase localhost:3070
Captures screenshots + DOM probe for visual break diagnosis.
READ-ONLY. No code changes.
"""
import json
import time
from playwright.sync_api import sync_playwright

OUT = "/Users/vishalchauchan/Downloads/Anti-folder01/projects/charts-showcase/qa-screenshots/break-diagnose-2026-05-26"
BASE = "http://localhost:3070"

DOM_PROBE = """
() => {
  const result = {
    viewport: { w: innerWidth, h: innerHeight },
    bodyBG: getComputedStyle(document.body).backgroundColor,
    rankingTable: null,
    propertyTable: null,
    variantToggles: [],
    rightPanel: null,
    contentPane: null,
  };

  // Find RankingTable demo — try multiple selectors
  const ranking = document.querySelector('[id="table-ranking"], [id*="ranking"], [data-component*="ranking"], section:has(table)')
    || Array.from(document.querySelectorAll('section,article,[data-demo]')).find(el =>
        el.textContent?.includes('Ranking') || el.textContent?.includes('pharma') || el.textContent?.includes('Pharma'));
  if (ranking) {
    const table = ranking.querySelector('table');
    const wrapper = ranking.querySelector('[class*="tableshell"], [class*="TableShell"], [class*="table-shell"], [data-component*="TableShell"], [class*="overflow"]');
    result.rankingTable = {
      sectionId: ranking.id || ranking.className?.toString().slice(0,60),
      sectionBbox: ranking.getBoundingClientRect(),
      tableBbox: table?.getBoundingClientRect(),
      wrapperBbox: wrapper?.getBoundingClientRect(),
      tableLayout: table ? getComputedStyle(table).tableLayout : 'no-table',
      tableWidth: table ? getComputedStyle(table).width : 'no-table',
      overflowX: wrapper ? getComputedStyle(wrapper).overflowX : 'no-wrap',
      colWidths: Array.from(table?.querySelectorAll('thead th') || []).map(th => ({
        text: th.textContent?.trim().slice(0, 30),
        bboxW: th.getBoundingClientRect().width,
        whiteSpace: getComputedStyle(th).whiteSpace,
        padding: getComputedStyle(th).padding,
      })),
      sampleRowCells: Array.from(ranking.querySelectorAll('tbody tr:first-child td') || []).map(td => ({
        text: td.textContent?.trim().slice(0, 30),
        bboxW: td.getBoundingClientRect().width,
        whiteSpace: getComputedStyle(td).whiteSpace,
      })),
    };
  }

  // PropertyTable demo
  const prop = document.querySelector('[id="table-property"], [id*="property"]')
    || Array.from(document.querySelectorAll('section,article')).find(el =>
        el.textContent?.includes('PropertyTable') || el.textContent?.includes('Property Table'));
  if (prop) {
    const table = prop.querySelector('table');
    result.propertyTable = {
      sectionId: prop.id || prop.className?.toString().slice(0,60),
      tableBbox: table?.getBoundingClientRect(),
      colCount: table?.querySelectorAll('thead th').length,
      colWidths: Array.from(table?.querySelectorAll('thead th') || []).slice(0, 6).map(th => ({
        text: th.textContent?.trim().slice(0, 20),
        bboxW: th.getBoundingClientRect().width,
      })),
    };
  }

  // Variant toggles
  document.querySelectorAll('[role="group"], [class*="VariantToggle"], [class*="varianttoggle"], [class*="toggle-group"], [data-component*="Toggle"]').forEach((g, i) => {
    const buttons = g.querySelectorAll('button');
    if (buttons.length > 0 && buttons.length < 10) {
      result.variantToggles.push({
        idx: i,
        groupClass: g.className?.toString().slice(0, 80),
        role: g.getAttribute('role'),
        bbox: g.getBoundingClientRect(),
        flexDirection: getComputedStyle(g).flexDirection,
        display: getComputedStyle(g).display,
        buttonCount: buttons.length,
        buttonBboxes: Array.from(buttons).map(b => ({
          text: b.textContent?.trim().slice(0, 20),
          bboxX: b.getBoundingClientRect().x,
          bboxY: b.getBoundingClientRect().y,
          bboxW: b.getBoundingClientRect().width,
          bboxH: b.getBoundingClientRect().height,
          bg: getComputedStyle(b).backgroundColor,
        })),
      });
    }
  });

  // Right panel — try multiple selectors
  const rp = document.querySelector('[aria-label*="Right panel"], [class*="rightpanel"], [class*="right-panel"], [class*="RightPanel"], aside')
    || document.querySelector('[class*="props"], [class*="Props"]');
  if (rp) {
    result.rightPanel = {
      tagName: rp.tagName,
      classes: rp.className?.toString().slice(0,80),
      bbox: rp.getBoundingClientRect(),
      width: getComputedStyle(rp).width,
      minWidth: getComputedStyle(rp).minWidth,
      position: getComputedStyle(rp).position,
      overflowY: getComputedStyle(rp).overflowY,
    };
  }

  // Sidebar
  const sidebar = document.querySelector('nav, [class*="sidebar"], [class*="Sidebar"]');
  if (sidebar) {
    const activeItem = sidebar.querySelector('[aria-current], [class*="active"], [class*="selected"]');
    result.sidebar = {
      width: getComputedStyle(sidebar).width,
      activeItemText: activeItem?.textContent?.trim().slice(0,40),
      activeItemHref: activeItem?.closest('a')?.getAttribute('href') || activeItem?.getAttribute('href'),
    };
  }

  // Content pane
  const cp = document.querySelector('main');
  if (cp) {
    result.contentPane = {
      bbox: cp.getBoundingClientRect(),
      width: getComputedStyle(cp).width,
      maxWidth: getComputedStyle(cp).maxWidth,
      padding: getComputedStyle(cp).padding,
      // Which demo section is visible in viewport?
      visibleSection: Array.from(cp.querySelectorAll('section,[data-demo],[id]')).filter(el => {
        const r = el.getBoundingClientRect();
        return r.top < innerHeight && r.bottom > 0 && r.width > 0;
      }).slice(0,3).map(el => ({
        id: el.id,
        tag: el.tagName,
        topText: el.textContent?.trim().slice(0,40),
      })),
    };
  }

  return result;
}
"""

console_errors = []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    # ── 1440 viewport ──
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.on("console", lambda msg: console_errors.append({
        "type": msg.type, "text": msg.text[:200]
    }) if msg.type in ("error", "warning") else None)
    page.on("pageerror", lambda err: console_errors.append({"type": "pageerror", "text": str(err)[:200]}))

    page.goto(BASE, wait_until="networkidle")
    page.wait_for_timeout(2000)

    # Full page 1440
    page.screenshot(path=f"{OUT}/full-1440.png", full_page=True)
    print("SAVED: full-1440.png")

    # Top bar
    page.screenshot(path=f"{OUT}/top-bar-detail.png", clip={"x": 0, "y": 0, "width": 1440, "height": 80})
    print("SAVED: top-bar-detail.png")

    # Sidebar — assume left ~240px
    page.screenshot(path=f"{OUT}/sidebar-detail.png", clip={"x": 0, "y": 60, "width": 280, "height": 840})
    print("SAVED: sidebar-detail.png")

    # Right panel — assume rightmost ~320px
    page.screenshot(path=f"{OUT}/right-panel-props.png", clip={"x": 1120, "y": 60, "width": 320, "height": 840})
    print("SAVED: right-panel-props.png")

    # Navigate to RankingTable
    # Try clicking sidebar link first
    try:
        ranking_link = page.locator('a[href*="ranking"], a:text-matches("Ranking", "i"), [class*="sidebar"] >> text=Ranking').first
        ranking_link.click()
        page.wait_for_timeout(1500)
        print("Clicked RankingTable sidebar link")
    except Exception as e:
        print(f"Could not click ranking link: {e} — scrolling to section instead")
        try:
            page.evaluate("() => { const el = document.querySelector('[id*=\"ranking\"]'); if(el) el.scrollIntoView({behavior:'instant'}); }")
            page.wait_for_timeout(1000)
        except Exception as e2:
            print(f"Scroll also failed: {e2}")

    page.screenshot(path=f"{OUT}/ranking-table-detail.png", full_page=False)
    print("SAVED: ranking-table-detail.png")

    # Scroll to full RankingTable section
    page.evaluate("() => window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(500)
    page.evaluate("() => window.scrollTo(0, 0)")
    page.wait_for_timeout(500)

    # DOM probe at 1440 after navigating to ranking section
    try:
        dom_result = page.evaluate(DOM_PROBE)
        dom_result["capturedAt"] = "1440_ranking_active"
    except Exception as e:
        dom_result = {"error": str(e)}
        print(f"DOM probe error: {e}")

    # Navigate to PropertyTable
    try:
        prop_link = page.locator('a[href*="property"], a:text-matches("Property", "i"), [class*="sidebar"] >> text=Property').first
        prop_link.click()
        page.wait_for_timeout(1500)
        print("Clicked PropertyTable sidebar link")
    except Exception as e:
        print(f"Could not click property link: {e}")

    prop_screenshot_path = f"{OUT}/property-table-active-sidebar.png"
    page.screenshot(path=prop_screenshot_path, full_page=False)
    print("SAVED: property-table-active-sidebar.png")

    # Variant toggle close-up — find it on page
    # Scroll through page to find toggles
    try:
        toggle_el = page.locator('[role="group"]:has(button)').first
        toggle_el.scroll_into_view_if_needed()
        page.wait_for_timeout(500)
        box = toggle_el.bounding_box()
        if box:
            # Clip with padding
            clip = {
                "x": max(0, box["x"] - 20),
                "y": max(0, box["y"] - 20),
                "width": min(1440, box["width"] + 40),
                "height": min(900, box["height"] + 40),
            }
            page.screenshot(path=f"{OUT}/variant-toggle-detail.png", clip=clip)
            print("SAVED: variant-toggle-detail.png (clipped to toggle)")
        else:
            page.screenshot(path=f"{OUT}/variant-toggle-detail.png")
            print("SAVED: variant-toggle-detail.png (full page — no bbox)")
    except Exception as e:
        print(f"Toggle screenshot failed: {e}")
        page.screenshot(path=f"{OUT}/variant-toggle-detail.png")

    # ── 1024 viewport ──
    page1024 = browser.new_page(viewport={"width": 1024, "height": 768})
    page1024.goto(BASE, wait_until="networkidle")
    page1024.wait_for_timeout(1500)
    try:
        rl = page1024.locator('a[href*="ranking"], a:text-matches("Ranking", "i")').first
        rl.click()
        page1024.wait_for_timeout(1200)
    except Exception:
        pass
    page1024.screenshot(path=f"{OUT}/ranking-table-1024.png", full_page=False)
    print("SAVED: ranking-table-1024.png")

    # ── 390 viewport (mobile) ──
    page390 = browser.new_page(viewport={"width": 390, "height": 844})
    page390.goto(BASE, wait_until="networkidle")
    page390.wait_for_timeout(1500)
    try:
        rl = page390.locator('a[href*="ranking"], a:text-matches("Ranking", "i")').first
        rl.click()
        page390.wait_for_timeout(1200)
    except Exception:
        pass
    page390.screenshot(path=f"{OUT}/ranking-table-390.png", full_page=False)
    print("SAVED: ranking-table-390.png")

    # ── Sidebar/main mismatch check ──
    # Navigate back to 1440 page, click each sidebar item, check what renders in main
    mismatch_probe = """
    () => {
      const sidebar = document.querySelector('nav, [class*="sidebar"], [class*="Sidebar"]');
      const main = document.querySelector('main');
      const activeLink = sidebar?.querySelector('[aria-current="page"], [class*="active"]');
      const h1s = Array.from(main?.querySelectorAll('h1,h2') || []).slice(0,3).map(h => h.textContent?.trim().slice(0,50));
      const sections = Array.from(main?.querySelectorAll('section,[data-demo]') || []).slice(0,5).map(s => ({
        id: s.id, firstText: s.textContent?.trim().slice(0,40)
      }));
      return {
        activeLinkText: activeLink?.textContent?.trim(),
        activeLinkHref: activeLink?.getAttribute('href') || activeLink?.closest('a')?.getAttribute('href'),
        mainHeadings: h1s,
        mainSections: sections,
        url: location.href,
        hash: location.hash,
      };
    }
    """
    try:
        mismatch_data = page.evaluate(mismatch_probe)
        dom_result["mismatchProbe"] = mismatch_data
    except Exception as e:
        dom_result["mismatchProbe"] = {"error": str(e)}

    browser.close()

# Save DOM probe
dom_result["consoleErrors"] = console_errors
dom_result["consoleErrorCount"] = len(console_errors)

with open(f"{OUT}/dom-probe-breaks.json", "w") as f:
    json.dump(dom_result, f, indent=2, default=str)
print("SAVED: dom-probe-breaks.json")

# Save console output
with open(f"{OUT}/console-output.txt", "w") as f:
    f.write(f"Console errors/warnings captured: {len(console_errors)}\n\n")
    for e in console_errors:
        f.write(f"[{e['type'].upper()}] {e['text']}\n")
print("SAVED: console-output.txt")
print("\nALL DONE.")
