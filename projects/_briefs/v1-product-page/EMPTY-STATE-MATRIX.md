# EMPTY-STATE-MATRIX · V1 Product Page v0.2

> **Scenario · D (No-data-per-section edge cases).** Per-section render rules — when data is present, missing, partial, or invalid. Implements PRD V2 §41 Dynamic Rendering Logic. Source of truth for `src/lib/render-rules.ts` plus per-organism `shouldRender()` guards. Pair w/ `AUSTRALIA-COLDCHAIN-DATA.md` (max-data), `MOCK-DATA-MEDIUM.md` (mid-data), `MOCK-DATA-LOW.md` (low-data).

---

## 1 · PRD §41 governing rules (verbatim from PRD V2)

| Rule | Requirement |
|---|---|
| Section rendering | Render only if `section_status = published` AND section has content/chart/dataset/image/table AND `access_level` is not hidden. |
| Navigation rendering | Render nav item only if `show_in_navigation = true` AND section is published AND section has visible public or preview content. |
| Empty states | Never show empty cards, empty titles, empty chart areas, broken images, missing logo placeholders, empty tabs or placeholder text. |
| Chart fallback | If chart dataset is missing, use static infographic. If image is missing, use text + stat card. |
| Competitor fallback | If logo is missing, show company initials or text-only card. |
| FAQ fallback | If FAQ is missing, hide FAQ section. |
| Forecast fallback | If forecast is missing, hide forecast tab and navigation item. |

---

## 2 · Universal render guard

```ts
function shouldRenderSection(section: Section): boolean {
  return (
    section.status === "published" &&
    hasContent(section) &&
    section.accessLevel !== "hidden"
  );
}

function hasContent(s: Section): boolean {
  return Boolean(
    s.dataset?.length ||
    s.chart?.data?.length ||
    s.text?.trim() ||
    s.tableRows?.length ||
    s.imageUrl ||
    s.items?.length
  );
}
```

Every organism imports this guard; renders `null` when false. Parent layout collapses gap (CSS Grid `grid-auto-rows: min-content` + `gap`) — no empty whitespace gaps.

---

## 3 · Per-section render matrix

### 3.1 · Hero

| State | Render | Fallback |
|---|---|---|
| All 3 metrics present (size · forecast · CAGR) | Full 3-stat hero | — |
| Forecast missing | 2-stat hero (size · historical CAGR) | Hide forecast pill; reframe promise to "current state" narrative |
| Both forecast + CAGR missing | 1-stat hero (current size only) | Promise reframes to "snapshot" narrative; secondary CTA "Talk to Analyst" elevated |
| historicalWindow null (outlook-only) | Forecast-only hero | Hide historical-size pill; timeframe toggle simplifies to "Forecast only" |
| Hero h1 missing | Section HIDDEN entirely | — (catastrophic missing data; never render headless hero) |
| Segment tags missing | Render hero w/o tag row | Tag row collapses; no empty placeholder pills |
| Tertiary CTA missing | Render w/ 2 CTAs only | Empty CTA slot collapses; flex container re-balances |

### 3.2 · Key stats strip

| State | Render | Fallback |
|---|---|---|
| 6 stats | 6-card grid (3×2 mobile / 6×1 desktop) | — |
| 3-5 stats | Auto-balance: 3 = 3-col centered; 4 = 2×2 or 4×1; 5 = 5×1 or 3+2 | Cards stretch to fill row; no empty card slots |
| 0-2 stats | Section HIDDEN (below minimum-viable threshold) | — |
| Stat value missing on one card | Hide that card | Re-balance row |
| Trend object missing | Card renders w/o trend chip | No empty trend area |

### 3.3 · Market size · forecast charts

| State | Render | Fallback |
|---|---|---|
| Dataset present (3+ points) | Line chart w/ axes, legend, annotations | — |
| Dataset present (1-2 points) | Stat-block fallback (NOT chart) | Render headline stat + narrative; chart canvas hidden |
| Dataset null | Stat-block fallback per PRD §41 | Headline stat + narrative; if narrative also missing → hide entire section |
| Source attribution missing | Render chart w/o source footnote | No empty source line |
| historicalWindow null | Hide chart 1 (historical) | Forecast chart renders alone if data present |
| forecastWindow null | Hide chart 2 (forecast) AND hide forecast nav item per PRD §41 forecast-fallback rule | — |

### 3.4 · Segmentation tabs

| State | Render | Fallback |
|---|---|---|
| 4-8 tabs | Full horizontal tab strip · scrollable on mobile | — |
| 2-3 tabs | Inline tab toggles (not scrollable strip) | — |
| 1 tab | Render content directly · NO tab strip | Tab strip collapses; section header still renders |
| 0 tabs | Section HIDDEN entirely | — |
| Tab has no chart data | Tab renders w/ table-only or narrative-only | Chart area not shown; no empty chart canvas |
| Tab has no table either | Hide that tab | Re-balance tab strip |
| Note text missing on tab | Tab renders w/o note callout | No empty note slot |

### 3.5 · Competitor module

| State | Render | Fallback |
|---|---|---|
| Full data (timeline + share + matrix + table) | 4-tab competitor module | — |
| Some sub-modules missing | Render only tabs w/ data | Empty tabs removed; tab strip re-balances |
| Single competitor only | Card-list mode (NOT comparison table) | One large profile card; no table grid |
| Competitor logo missing | Initials avatar OR text-only card per PRD §41 | NEVER broken `<img>` placeholder |
| Competitor name missing | Skip that competitor entirely | — (name is required field) |
| Revenue / capacity / metrics missing on row | Render row w/ "—" placeholder in that cell only | Don't hide whole row |
| 0 competitors | Section HIDDEN | — |

### 3.6 · Positioning matrix (bubble chart)

| State | Render | Fallback |
|---|---|---|
| 4+ players with x/y/size data | Full bubble chart | — |
| 2-3 players | Render bubble chart w/ smaller density | — |
| 0-1 players | Section HIDDEN (insufficient data for matrix) | — |
| Axis labels missing | Hide section entirely (matrix incomprehensible w/o axes) | — |

### 3.7 · FAQ

| State | Render | Fallback |
|---|---|---|
| 3+ entries | Full FAQ accordion | — |
| 1-2 entries | Section HIDDEN (below minimum threshold) | Move single Q to inline "Quick answer" callout near hero if relevant |
| 0 entries | Section HIDDEN per PRD §41 FAQ-fallback rule | — |
| Question missing | Skip that entry | — |
| Answer missing | Skip that entry | — (Q without A is broken) |

### 3.8 · TOC (chapter navigation)

| State | Render | Fallback |
|---|---|---|
| 5+ chapters | Full TOC w/ chapter links | — |
| 2-4 chapters | Compact TOC inline | — |
| 0-1 chapters | Section HIDDEN | — |
| Chapter has 0 sections | Hide that chapter | — |
| Sticky chapter-nav rail (right rail) | Auto-derived from rendered sections; chapters w/ all-hidden sections drop from rail | — |

### 3.9 · Methodology

| State | Render | Fallback |
|---|---|---|
| 4 stages present | Full 4-stage horizontal step cards | — |
| 2-3 stages | Render 2-3 step cards · flex justify-center | — |
| 1 stage | Single card centered | — |
| mode === "summary" | Single text-block w/ duration + confidence callout (NOT staged cards) | — |
| 0 stages + no summary | Section HIDDEN | — |
| Stage `inputs[]` missing | Render stage card w/o inputs list | No empty bullets |
| Icon missing | Default icon by stage number | Never empty icon slot |

### 3.10 · Macroeconomic indicators

| State | Render | Fallback |
|---|---|---|
| Full GDP + inflation + population + imports | Dual-axis chart + stat strip | — |
| GDP only | Single-axis chart (GDP line) | Inflation line hidden |
| Indicator w/o relevance text | Hide that indicator card per task spec | Don't render bare number w/o context |
| 0 indicators | Section HIDDEN | — |

### 3.11 · Ecosystem

| State | Render | Fallback |
|---|---|---|
| 4 tabs (players · associations · entrants · map) | Full tab strip | — |
| 1-3 tabs w/ data | Subset tab strip | Empty tabs removed |
| 1 tab only | Single tab → render content directly w/o tab strip | — |
| Player has no logo | Initials avatar | — |
| 0 players AND 0 associations | Section HIDDEN | — |

### 3.12 · CTA blocks (inline + final)

| State | Render | Fallback |
|---|---|---|
| All 3 CTAs (download · customize · talk) | Full 3-CTA block | — |
| 1-2 CTAs | Render available CTAs · flex justify-center | Empty CTA slot collapses |
| 0 CTAs | Section HIDDEN | — (no page should ship w/o CTAs; flag as data error) |

### 3.13 · Report-facts block (GEO / AI answer block)

| State | Render | Fallback |
|---|---|---|
| All 6 facts (market · size · forecast · CAGR · segments · type) | Full facts block | — |
| Partial facts | Render present facts only | Skip missing fact rows · no "N/A" placeholders |
| 0 facts | Section HIDDEN | — |

---

## 4 · Cross-scenario verification

| Scenario | Source file | Sections rendered | Sections hidden | Passes §41? |
|---|---|---|---|---|
| MAX (Australia Cold Chain) | `AUSTRALIA-COLDCHAIN-DATA.md` | All 11 modules + 8 seg tabs + 7 charts + 9 ecosystem players | None | YES |
| MEDIUM (India Confectionery) | `MOCK-DATA-MEDIUM.md` | Hero · 6 stats · 2 charts · 3 seg tabs · ecosystem (1 tab) · competitor (table) · methodology (2 stages) · FAQ (4) | Country/infra · taxonomy · positioning · trends · regulatory · macro · 5 charts · 5 seg tabs | YES — graceful hiding · no empty cards |
| LOW (Vietnam EV Charging) | `MOCK-DATA-LOW.md` | Hero · 3 stats · stat-block fallback · 2 seg tabs · single-competitor card · methodology summary · FAQ (3) | 10+ sections hidden per scenario doc §9 | YES — stat-block fallback works, single-competitor mode works, summary methodology mode works |
| EDGE (per-section nulls) | This file §3 | Per cell per row | Per cell per row | YES — every state defined |

---

## 5 · Implementation pattern

```ts
// src/lib/render-rules.ts
export function deriveVisibleSections(report: Report): VisibleSection[] {
  return report.sections
    .filter(shouldRenderSection)
    .map(applyFallbacks);
}

// src/lib/applyFallbacks.ts
export function applyFallbacks(s: Section): Section {
  if (s.type === "chart" && !s.dataset?.length) {
    return { ...s, renderMode: "stat-fallback" };
  }
  if (s.type === "competitor" && !s.logo) {
    return { ...s, renderMode: "initials" };
  }
  if (s.type === "methodology" && !s.stages?.length && s.summary) {
    return { ...s, renderMode: "summary" };
  }
  return s;
}
```

Every organism imports `deriveVisibleSections()` upstream; never reads `report.sections` directly. Layout component uses CSS Grid w/ `gap` so hidden sections collapse cleanly.

---

## 6 · Anti-patterns (NEVER ship)

- "Data unavailable" placeholder text in an otherwise rendered card
- Empty `<img>` tag w/ broken-image icon
- Empty chart canvas w/ "No data" axis labels
- "Coming soon" or "TBD" copy
- Greyed-out tab labels for empty tabs
- Empty accordion rows in FAQ
- Skeleton loaders left in production for missing (not loading) data
- Empty `<dl>` definition list
- Lorem ipsum or any placeholder copy
- Stub competitor cards w/ "Company A · Company B"
- Decorative `border-dashed` empty-state cards w/ "Add data here"

---

## 7 · QA checklist (per report instance)

- [ ] Run `deriveVisibleSections(report)` and snapshot visible-sections array
- [ ] Verify nav rail count matches visible-sections count
- [ ] Visual inspect: no whitespace gaps > 2 × section gap
- [ ] Visual inspect: no card w/ empty subtitle/value/icon
- [ ] Lighthouse: no broken images
- [ ] axe: no `aria-label` w/o accessible name
- [ ] Test w/ each of 3 mock fixtures: MAX · MEDIUM · LOW

---

## 8 · Coverage acceptance

This matrix + the 3 mock data files cover:

- **Max** (Australia Cold Chain · 90 pages · all modules)
- **Medium** (India Confectionery · 62 pages · ~50% modules)
- **Low** (Vietnam EV Charging · 28 pages · ~25% modules)
- **No-data-per-section** (this file · every section has explicit miss state defined)

All 4 fidelity scenarios passable through the same component tree w/o code branching — only data-derived render-mode flags.

---

**File word count target: ~1,600.**
