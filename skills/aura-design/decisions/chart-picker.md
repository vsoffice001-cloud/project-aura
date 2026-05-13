# Chart Picker — decision tree

**When to load:** picking chart type for a report viewer (surface 03), dashboard tile (surface 04), discovery hero data-still (surface 01), or report-detail sample band (surface 02).

**Output:** Highcharts preset name from `core-v2/charts/presets/` + chart-config decisions.

---

## Step 1 — What's the data shape?

| Data shape | Chart family |
|---|---|
| 1 number over time (single metric trend) | **Line** OR **Area** (filled line) |
| 2-5 numbers over time (compare metrics) | **Multi-line** OR **Stacked area** |
| Composition / parts of a whole · ≤5 categories | **Pie** (only if 2-5 slices) OR **Stacked bar** (preferred for ≥6) |
| Composition over time | **Stacked area** OR **Stacked column** (categorical x) |
| Comparison across categories (ranking) | **Bar** (horizontal) — Mode pattern |
| Distribution (frequency) | **Histogram** OR **Box plot** |
| Correlation / relationship 2 vars | **Scatter** w/ optional trendline |
| Geographic | **Choropleth** OR **Bubble map** (NOT plot dots — area encodes value) |
| Time-series w/ context bands | **Line + range band** (forecast confidence interval) |
| Hierarchical breakdown | **Treemap** (NOT sunburst — readability) |
| Single big number w/ context | **Stat card** (not Highcharts — DS `<StatCard>` molecule) |

---

## Step 2 — Which Highcharts preset?

From `core-v2/charts/presets/`:

| Preset | Family | Use case |
|---|---|---|
| `area` | Area / stacked area | Trend + composition over time |
| `line` | Line / multi-line | Metric trend · 1-5 series |
| `column` | Vertical bar | Time-series categorical · period comparison |
| `bar` | Horizontal bar | Ranking · ≤15 categories |
| `pie` | Pie | 2-5 slices ONLY · NEVER 6+ |

**Missing presets (Phase 2.x DS additions):** scatter · histogram · box · treemap · choropleth · bubble-map. Build via `mergePreset()` ad-hoc until promoted.

---

## Step 3 — Data integrity checks (BEFORE building chart)

1. **Sample size disclosed?** No source-citation footer = REJECT chart, ask analyst
2. **Date range explicit?** "Last 12 months" must specify which 12
3. **Methodology surfaceable?** 1-line subtitle ("Sample n=2,847 · primary survey · Q1 2026")
4. **CSV exportable?** Every chart MUST have raw-data CSV download
5. **Cite-this generates correctly?** APA/Harvard auto-format from chart metadata

If any 1-5 fails = REJECT until fixed. Per "verified > vibes" wedge.

---

## Step 4 — Banned chart types (any surface)

| Banned | Why | Use instead |
|---|---|---|
| 3D bar/pie/area | Distorts perception · style-over-substance | Flat 2D · same data |
| Pie >5 slices | Unreadable · tiny slices indistinguishable | Stacked bar OR treemap |
| Donut for >5 categories | Same as pie · plus center-hole reduces visual surface | Stacked bar |
| Dual y-axis (2 metrics, 2 scales) | Misleading — different scales create false correlation | 2 stacked panels w/ shared x-axis |
| Word cloud | Decorative · zero analytic value | Bar chart of frequency |
| Radar / spider | Comparison illusion · unreadable beyond 4 points | Side-by-side bar |
| Stacked bar for time-series w/ negative values | Visual confusion · hard to read | Diverging bar OR multi-line |
| Animated chart (auto-rotating, scrolling) | Working surfaces · cognitive load | Static · let user explore |
| Charts w/o axes labels | Unsourced · style-over-substance | Always label axes + units |

---

## Step 5 — Color rules

**ALWAYS use `chart.palette.{1..8}` from tokens.** 8-color CB-safe palette (tested w/ Color Oracle deuteranopia/protanopia/tritanopia).

NEVER:
- Improvise series colors w/ raw hex
- Use brand-red `#b01f24` as a series color (semantic-pollution — brand-red = CTA/alert only)
- Use sector-association color codes ("healthcare = green") that vary per chart

ALWAYS:
- Position-by-color order: `palette.1` highest series · `palette.2` next · etc
- For diverging data (positive/negative): use `chart.palette.diverging.{neg,zero,pos}` (Phase 2.x token addition)
- For sequential data (low→high): use `chart.palette.sequential.{1..8}`

---

## Step 6 — Tooltip + interaction rules

- **Hover tooltip:** exact value · tabular-nums · 100ms fade
- **Click on series:** drill-down right rail (dashboards) OR scroll-anchor link (reports)
- **Legend toggle:** click series in legend = hide/show that series
- **Crosshair:** vertical line on hover for time-series w/ multi-series — sync across stacked panels
- **Range selector:** time-series ≥6 months gets 1M / 3M / 1Y / All buttons (Highcharts native)

NEVER:
- Open modal on click (drill-down = right rail or anchor only)
- Show tooltip on click instead of hover (mobile = tap, desktop = hover)
- Animate tooltip (instant fade only)

---

## Cross-surface citations

- Surface 03 (Viewer) — every chart uses presets · 3 affordances visible (cite/CSV/embed)
- Surface 04 (Dashboard) — same presets · drill-down right rail
- Surface 01 (Discovery hero) — chart-still as hero visual (NOT live chart · static export for marketing)
- Surface 02 (Store detail sample band) — 5 charts using presets · gives shopper preview
