# Charts · Tables · Visualization Patterns Guide · v0.4 PDP

> **Chart re-build status (2026-05-21):** Ken Charts library defaults use blue/emerald/amber series + dark slate tooltip · NOT Ken DS palette. Stakeholder feedback: chart bg with blue tone is wrong · want neutral/white. Solution: override via `Highcharts.setOptions()` global theme · file at `src/lib/kenChartsTheme.ts` · imported in RootLayout. See §11 below.

**Source authority:** ref-pattern study (rainbow-pothos + merged-report · CONFIDENTIAL) + stakeholder decision 2026-05-21
**Owner (design):** Aura · `design@kenresearch.com`
**Related:** `REF-PATTERNS-ADOPTION.md` · `COLOR-USAGE-GUIDE.md` · `FONT-PAIRING-GUIDE.md`

---

## 1 · Privacy warning

Reference URLs are **CONFIDENTIAL Ken Research deliverables**. Patterns extracted are reusable · sources are internal-only. NEVER expose these URLs in public-facing surfaces. Treat as design-team learning material.

---

## 2 · Visualization decision tree

For every "we need a chart/table" moment · ask in order:

1. **Is this categorical or continuous?**
2. **How many data points?**
3. **Is the story comparison · trend · composition · or relationship?**
4. **Public · lead-gated · or paid-only?**

| Story | <5 points | 5-30 points | 30+ points |
|---|---|---|---|
| **Comparison** | StatCallout strip OR small bar | ColumnChart / BarChart | Heatmap (N×M grid) |
| **Trend over time** | MilestoneRow (3 anchors + CAGR) | ColumnChart OR HistoricalProjectedAreaChart | LineChart OR MultiSeriesLineChart |
| **Composition** | SegmentSplitBar (1-2 segments) | StackedBarChart OR PieChart (donut) | TreeMap OR StackedBarChart over time |
| **Relationship** | n/a · need 2 dimensions | Bubble chart (X × Y · size) | Bubble chart OR scatter |
| **Hierarchy** | InsightBox + InlineBoldStat | MindMap OR TreeMap | TreeMap |
| **Timeline / pipeline** | n/a | PipelineTimeline (Gantt-style) | PipelineTimeline w/ phase color coding |

---

## 3 · Chart-type playbook (ref-mined)

### 3.1 ColumnChart · vertical bars

**When:**
- Historical or forecast trajectory of single metric
- 5-15 data points across years OR categories
- Discrete time intervals (annual · quarterly)

**Style:**
- Bare · NO card frame · NO shadow
- Border-bottom hairline only (`var(--black-100)`) for grounding
- 360-380px height standard · 280px mobile
- Color: single hue from data viz palette (purple-500 default · periwinkle-500 secondary)
- Forecast/projected bars: dashed border OR translucent fill (NOT separate color)
- Y-axis labels: DM Sans 11px uppercase tracked
- X-axis labels: DM Sans 12px regular tabular-nums
- No gridlines (refs use none) · or hairline horizontal only

**Use cases (v0.4):**
- §08 Market Size (historical+forecast combined w/ projectionStartIndex)
- §09 Submarkets (per-segment annual revenue)
- §11 Industry Analysis (top-N industries by share)
- §18 Macro Indicators (single-metric trajectory)

### 3.2 HistoricalProjectedAreaChart · continuous area

**When:**
- Continuous trajectory · need to emphasize cumulative shape
- Historical + projected in single frame
- 6-12 years span

**Style:**
- Same bare frame as ColumnChart
- Solid fill for historical · dashed/translucent for projected
- `projectionStartIndex` from `@ken-research/charts`
- Legend below (uppercase tracked · 11px)
- Optional vertical "Forecast begins" dashed rule at split year

**Use cases:**
- §08 Market Size · Forecast tab (used previously · now combined view)
- §16 Future Outlook · scenario fan

### 3.3 MultiAxisLineChart · dual-axis combo

**When:**
- Two metrics on different scales need to be compared (revenue + growth-rate · price + occupancy)
- 5-15 data points

**Style:**
- Left axis = primary metric (purple-500 line OR bars)
- Right axis = secondary metric (periwinkle-500 line)
- Axis titles in DM Sans 11px uppercase tracked
- Legend below w/ tier-colored dots
- 320-360px height

**Use cases:**
- §09 Submarkets (revenue + YoY% combo)
- §18 Macro Indicators (CPI + GDP combo)
- §13 Demand-Supply Gap (capacity + utilization combo)

### 3.4 StackedBarChart · composition over time

**When:**
- N segments × M time periods
- Each bar = 100% (proportional) OR absolute (additive)

**Style:**
- Up to 3 hues from data viz palette (purple primary · periwinkle secondary · perano tertiary)
- Horizontal OR vertical (use horizontal for >7 categories)
- Legend below · category labels in DM Sans 12px

**Use cases:**
- §10 Segment Intelligence (segment mix across end-users)
- §11 Industry Analysis (industry mix over years)

### 3.5 Bubble chart · relationship scatter (RAINBOW-POTHOS PATTERN)

**When:**
- 2 dimensions (X · Y) + 1 magnitude (bubble size)
- 5-15 entities to position
- Story: "where does each entity sit on these 2 axes?"

**Style:**
- Bubble = data viz palette (purple-500 default · or tier-coded)
- Size = continuous magnitude (room count · pallet count · revenue)
- Labels INSIDE or ADJACENT to bubbles (DM Sans 11px medium)
- No axis gridlines
- Axis titles + tick labels DM Sans 11px uppercase tracked
- 1-2 sentence caption below italic

**Use cases (NEW):**
- §07 Ecosystem (player pallet count vs market share %)
- §14 Competitor Landscape (revenue × growth × bubble-size = capacity)
- §13 D-S Gap (capacity × demand · bubble = segment)

**Build:** custom React/D3 OR `@ken-research/charts` if shipped (currently NO bubble in package · GAP per KEN-CHARTS-PLAN.md · request from Saurabh).

### 3.6 Heatmap · N×M grid w/ tier color + star rating (RAINBOW-POTHOS PATTERN)

**When:**
- Categorical × categorical comparison (asset class × micro-market · segment × end-user)
- 12-30 cells
- Story: "which combinations are high-priority?"

**Style:**
- Grid: equal-width cells · 1-2px gap OR hairline borders
- Cell colors: 3-tier (purple-500 high · periwinkle-500 mid · perano-500 low)
- Cell content: star rating (★★★/★★/★) + short text label
- Optional cell hover: tooltip w/ full rationale
- Legend below w/ 3 swatches
- Numeric score appended (e.g. "1.00-6.00") for methodological detail

**Use cases (NEW):**
- §07 Ecosystem (player capability × market segment heatmap)
- §10 Segment Intelligence (segment × end-user heatmap)
- §13 D-S Gap (segment × year gap heatmap)
- §17 Opportunities (rank × dimension matrix)

**Build:** custom HTML/CSS grid component · `<OpportunityHeatmap>` molecule (planned).

### 3.7 PipelineTimeline · Gantt-style FY grid (RAINBOW-POTHOS PATTERN)

**When:**
- Multi-row entities × time period (FY25-FY32)
- Story: "what's launching when?"

**Style:**
- Rows = entities (4 asset classes · or operator names)
- Columns = fiscal years
- Cell content: project name + capacity + opening year range
- Phase color encoding: confirmed (solid) · delayed (dashed) · indicative (translucent) · TBA (empty)
- Cumulative trend line OR narrative summary below

**Use cases:**
- §15 Regulatory (regulatory milestones FY18-FY27)
- §16 Future Outlook (capacity additions pipeline)
- §07 Ecosystem (per-player expansion roadmap · paid-tier)

### 3.8 TreeMap · hierarchical proportional

**When:**
- Hierarchy (parent · children) where size matters
- 10-30 nodes
- Story: "see proportions instantly · drill down"

**Style:**
- Tile colors: tier-coded (3-hue from palette)
- Hairline borders between tiles
- Tile labels: DM Sans 12-14px medium
- Tooltip on hover for full detail

**Use cases (already shipped):**
- §07 Cold Storage Players (Lineage dominance visible at glance · current implementation)
- §10 Segment Intelligence (alternative to heatmap)

### 3.9 PieChart / Donut · composition snapshot

**When:**
- 2-5 segments · single point in time
- Story: "of total · what's the split?"

**Style:**
- Donut (NOT solid pie · refs use donut · negative space in center for label)
- 2-3 hues from palette
- Center label: total OR primary metric
- Legend below

**Use cases:**
- §07 Ecosystem (top-4 vs long-tail share)
- §08 SegmentSplitBar uses horizontal stack instead (cleaner for 2-segment case)

**Caveat:** PieChart often overused · prefer SegmentSplitBar OR StatCallouts for <4 categories.

### 3.10 Scenario fan chart · bull/base/bear bands

**When:**
- Forecast w/ uncertainty bands (50% CI · 95% CI)
- 5-10 future years

**Style:**
- Center line = base forecast (purple-500)
- Translucent bands = bull/bear ranges (periwinkle-300 alpha)
- Vertical "Forecast begins" rule at start
- CI label ("50% confidence interval") on chart

**Use cases:**
- §16 Future Outlook scenario forecast

**Build:** custom · NO equivalent in `@ken-research/charts` · DEFERRED until specced.

---

## 4 · Table patterns

### 4.1 PropertyTable · canonical data table (RAINBOW-POTHOS PATTERN)

**Anatomy:**
- Header: DM Sans 600 11px uppercase tracked +0.08em · bg `--color-foundation-white` · `border-b: 1px var(--black-200)`
- Row: DM Sans 400 13px · 40-48px tall · `border-b: 1px var(--black-100)` per cell
- Cell padding: 12-16px horizontal · 10-14px vertical
- NO alternating row backgrounds
- NO vertical grid lines
- Hover: `bg-[var(--black-50)]` row tint · 200ms transition
- Numeric columns: right-aligned · tabular-nums
- Text columns: left-aligned
- Categorical (status pill): center-aligned w/ inline pill
- Sticky header: `border-separate borderSpacing:0` + bg on every `<th>` (per QA fix)

**Columns example (§07 Player Table):**
| Player | Tier | Status | Pallets | Share | Source |
|---|---|---|---|---|---|
| Lineage | T1 | Operational | 590,000 | 12.5% | Lineage IR 2024 |
| Americold | T2 | Operational | 226,000 | 4.8% | 10-K 2023 |

**Use cases:**
- §07 Ecosystem (operator table)
- §09 Submarkets (per-segment operator table)
- §14 Competitor Landscape (full benchmark)
- §22 Sample Preview (preview table)

### 4.2 OpportunityRankingTable · ranked + categorical (MERGED-REPORT PATTERN)

**Anatomy:**
- Header: rank · subject · opportunity signal · gap type · fit
- Row 1-N: numbered ranking · subject name · signal phrase · gap type tag · fit emoji/star

**Style:**
- Same as PropertyTable
- Ranking column: bold display number (DM Sans 600 16px · tabular)
- Fit column: ★★★/★★/★ inline

**Use cases:**
- §13 D-S Gap ranking
- §17 Opportunities priority list

### 4.3 Dataset preview table (in modal · refs match)

**Anatomy:**
- Sticky thead w/ bg + border-b on every `<th>` (per QA · `border-separate`)
- 11 rows max in v0.4 modal · scroll vertically inside DialogContent
- Phase column uses status pills (color-encoded but text-labeled)
- Source column: italic 11px muted

**Already shipped:** §08 DatasetModal pattern.

---

## 5 · Public vs Premium · data hiding patterns

**Stakeholder rule:** some charts/tables show public partial · premium data blurred + behind paywall.

### 5.1 Decision matrix per chart

| Chart content | Public tier | Lead-gated | Paid-only |
|---|---|---|---|
| Headline metric (3-year anchor) | YES · always visible | — | — |
| Annual interpolated series | YES · visible | — | — |
| Per-segment annual breakdown | partial (1 anchor) | YES · full | — |
| Per-operator capacity figures | top-tier (1-4) visible | mid-tier visible | full tail |
| Pricing · margins · occupancy | NO · blurred | YES · disclosed | — |
| Forecast scenarios (bull/base/bear) | base only | base + ranges | full model + assumptions |
| Methodology · sample sizes · CATI count | summary only | partial | full transcripts |
| Raw transcripts · CSV export | NO | NO (preview) | YES |

### 5.2 Render strategy per gating tier

**Public:**
- Chart fully visible · all data legible
- 1 SourceCluster collapsed below
- Dataset modal trigger visible · modal partially populated

**Lead-gated (specific blocks):**
- Wrap data block in `<GatedBlock>` w/ `<PremiumLockCard>` variant=`compact` OR `minimal`
- Blur applied via CSS · server-side redaction REQUIRED in production (CSS blur = decoy)
- Lock card: brand-red CTA → external sales/expert page
- Decoy data shapes visible (blurred bars · pixelated chart) · signal "data exists behind this"

**Paid-only (entire visualization):**
- Wrap in `<GatedBlock>` w/ `<PremiumLockCard>` variant=`default` (full · 3 specifics + 2 CTAs)
- Skeleton placeholder OR fully blurred placeholder chart
- Lock card lists 3 specific data points teased (e.g. "Per-pallet AUD price by operator")

### 5.3 Anti-leak rules

- **NEVER** hardcode premium data values in TSX (even behind CSS blur · view-source reveals)
- **ALWAYS** use placeholder text (`AUD ████ Mn`) OR empty arrays for premium series
- **BACKEND** must redact server-side BEFORE rendering · CSS blur is decoy only
- **NEVER** expose ref URLs in public surfaces (rainbow-pothos · merged-report = internal only)

### 5.4 Premium chart pattern (canonical)

**Pattern A · Mostly-public w/ premium row hidden:**
- Main chart visible
- Below: 1-2 row "premium add-on" gated (blurred mini-chart + lock card)

**Pattern B · Fully-locked premium chart:**
- Entire chart wrapped in GatedBlock
- Decoy placeholder shapes only · NO real data in DOM
- Lock card centered · headline names what's behind

**Pattern C · Public chart + premium dataset modal:**
- Chart fully visible
- Dataset modal trigger labeled "View dataset · 11 rows" visible
- Modal opens · 3 rows visible · rows 4-N blurred w/ lock card mid-table
- "Download CSV" disabled w/ lock pill

**Pattern D · Public chart + premium ANNOTATIONS:**
- Chart visible
- 2-3 annotation cards visible
- 1 annotation card (the premium driver) gated · blurred body · minimal lock pill
- Already implemented in §08 AnnotationCards

---

## 6 · Chart annotation strategies

**Lesson from §08 v2:** absolute-positioned HTML overlays over Highcharts charts DRIFT at different widths · DO NOT use.

**Use instead (3 options):**

| Option | When | How |
|---|---|---|
| **A · Adjacent narrative cards** | Default · most flexible | 3-card grid BELOW chart · each card cites year + label + body · 1 card can be gated |
| **B · Phase strip below chart** | When timeline has distinct phases | 11-col CSS grid below chart · year-aligned · color-coded phase pills |
| **C · Inline bold stats in prose ABOVE chart** | When 2-3 key inflection points need to lead the chart | Lede paragraph w/ inline `<strong>` callouts · chart is confirmation |

**NEVER use:** absolute HTML overlays · chart-native annotations (Highcharts annotation API not exposed via `@ken-research/charts`).

---

## 7 · Source attribution per chart (mandatory)

Every chart MUST have SourceCluster below it · per `SOURCE-PROVENANCE.md`.

**Pattern:**
```tsx
<Chart ... />
<PhaseStrip /> {/* optional context strip */}
<div className="flex justify-between gap-4 mt-5 flex-wrap">
  <SourceCluster citations={getSources([...])} methodologyHref="#methodology" />
  <DatasetModalTrigger /> {/* opens modal w/ full dataset */}
</div>
```

Refs cite sources inline parenthetical italic (e.g. `(Hotelivate, JLL · 2024)`). We use SourceCluster for richer typed provenance · collapsed by default (compact) · matches refs' density.

---

## 8 · Caption pattern (italic · interpretation)

Every chart/visualization needs a 1-2 line italic caption that INTERPRETS · not describes.

**Bad:** "Bar chart showing AUD Mn by year from 2017 to 2022."

**Good:** "_Solid bars are historical · dashed are forecast. COVID step in 2020 driven by pharma cold-chain demand._"

**Pattern:**
```tsx
<figcaption className="font-body italic text-[var(--semantic-ink-body)] max-w-[68ch] mt-3"
            style={{ fontSize: '13px', lineHeight: 1.55 }}>
  {interpretation}
</figcaption>
```

---

## 9 · Section-by-section chart plan (v0.4)

| § | Section | Chart(s) | Tier |
|---|---|---|---|
| 01 | Exec Summary | MetricStrip (4-5 borderless stat callouts) | Public |
| 02 | Scope | None · chip groups | Public |
| 03 | Country Infra | MultiAxisLineChart (4 macro indicators) | Public |
| 04 | Market Overview | None · prose · italic timeline | Public |
| 05 | Definitions | None | Public |
| 06 | Taxonomy | MindMap (existing) | Public |
| **07** | **Ecosystem** | **TreeMap (shipped) + Bubble (NEW) + OpportunityHeatmap (NEW)** | **Public + Lead** |
| **08** | **Market Size** | **ColumnChart + PhaseStrip + SegmentSplitBar (shipped)** | **Public + Lead (annotation + 2027F)** |
| 09 | Submarkets | MultiAxisLineChart per tab + PropertyTable | Public + Lead |
| 10 | Segment Intel | OpportunityHeatmap (5×8) + StackedBarChart | Lead + Paid |
| 11 | Industry Analysis | StackedBarChart + MetricStrip | Public + Lead |
| 12 | End-User | QuotedVoice atoms · prose-heavy · no charts | Lead (NDA quotes) |
| 13 | D-S Gap | Heatmap + OpportunityRankingTable | Lead + Paid |
| 14 | Competitor | Bubble chart + PropertyTable + RatingStars | Lead + Paid |
| 15 | Regulatory | PipelineTimeline (regulatory milestones) | Public |
| 16 | Future Outlook | HistoricalProjectedAreaChart + ScenarioFanChart (deferred) | Lead + Paid |
| 17 | Opportunities | RatingStars + OpportunityRankingTable | Paid |
| 18 | Macro Indicators | MultiAxisLineChart (4 series) + MetricStrip | Public + Lead |
| 19 | Methodology | None · prose + numeric weights table | Public summary · Lead detail |
| 20 | TOC | None · sticky nav | Public |
| 21 | FAQs | None · AnswerBlock atoms | Public |
| 22 | Sample Preview | Static preview · 3-page image | Public · sample tier |
| 23 | Related Reports | ReportCard grid · no charts | Public |
| 24 | CTA Banner | None · CTAs only | Public |

---

## 10 · NEW components needed (per visualization plan)

| Component | Tier | Used in §§ |
|---|---|---|
| `MetricStrip` | atom (project-local) | 01 · 03 · 11 · 18 |
| `InsightBox` | atom | every section closer |
| `OpportunityHeatmap` | molecule | 07 · 10 · 13 · 17 |
| `RatingStars` | atom | 10 · 13 · 14 · 17 |
| `PropertyTable` | molecule | 07 · 09 · 14 · 22 |
| `BubbleChart` | molecule (or chart pkg extension) | 07 · 13 · 14 |
| `PipelineTimeline` | molecule | 15 · 16 |
| `QuotedVoice` | atom | 12 |
| `ConvergenceCallout` | molecule | 01 · 16 |
| `OpportunityRankingTable` | molecule | 13 · 17 |
| `ScenarioFanChart` | deferred (Ken Charts gap) | 16 |

**Build order:** Phase A §08 polish · Phase B §07 (introduces 4 new atoms) · Phase C §09 (canonical template) · Phase D §10-24.

---

## 11 · Audit checklist (every new chart/table)

- [ ] Bare frame (no card · no shadow)
- [ ] Border-bottom hairline only (if any frame)
- [ ] Data viz palette colors (periwinkle/perano/purple) · NOT brand-red
- [ ] Max 3 colors in chart
- [ ] Y/X axis labels DM Sans 11px uppercase tracked
- [ ] No gridlines OR horizontal hairline only
- [ ] Tabular-nums on all numeric ticks
- [ ] Italic figcaption interpretation (1-2 lines)
- [ ] SourceCluster below w/ correct citations
- [ ] Dataset modal trigger if data exists for premium tier
- [ ] Premium content gated via GatedBlock + correct PremiumLockCard variant
- [ ] No real premium data in DOM (placeholder shapes only when locked)
- [ ] Mobile responsive (clamp() height · stacked legend)
- [ ] Reduced-motion respected
- [ ] AA color contrast on all text
- [ ] No emoji in chart (already disciplined)

---

---

## 11 · Chart re-build · neutralize Ken Charts default theme

### 11.1 Problem
Ken Charts library (`@ken-research/charts` 0.1.5) ships w/ Highcharts 11.4.6 + a default theme that conflicts w/ Ken DS palette:

| Element | Library default | Should be |
|---|---|---|
| Chart bg | `transparent` | `transparent` ✓ |
| Plot bg | `#ffffff` | `transparent` (let section bg show) |
| Title | `#0f172a` (slate-900) | `var(--semantic-ink-strong)` |
| Subtitle | `#475569` (slate-600) | `var(--semantic-ink-body)` |
| Axis labels | `#64748b` (slate-500) | `var(--semantic-ink-muted)` |
| Gridlines | `#e2e8f0` (slate-200) | `var(--black-100)` |
| Tooltip bg | `#1e293b` (slate-800 DARK) | `var(--color-foundation-white)` w/ subtle border |
| Tooltip text | white | `var(--semantic-ink-strong)` |
| Primary series colors | `["#1e40af","#059669","#d97706","#7c3aed","#dc2626","#0891b2"...]` blue/emerald/amber/violet/red/cyan | periwinkle/perano/purple ramp |

### 11.2 Solution · Highcharts.setOptions() override

Library exposes no instance-level theme prop. Override at the Highcharts singleton instance level · runs once at app boot · cascades to every Ken chart instance.

**File:** `src/lib/kenChartsTheme.ts`

```ts
'use client';

import Highcharts from 'highcharts';

let applied = false;

export function applyKenChartsTheme() {
  if (applied || typeof window === 'undefined') return;
  applied = true;

  Highcharts.setOptions({
    chart: {
      backgroundColor: 'transparent',
      plotBackgroundColor: 'transparent',
      style: {
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      },
    },
    title: {
      style: {
        color: 'rgba(0, 0, 0, 0.9)',
        fontFamily: "'Noto Serif', Georgia, serif",
        fontWeight: '300',
      },
    },
    subtitle: {
      style: { color: 'rgba(0, 0, 0, 0.6)', fontFamily: "'DM Sans', sans-serif" },
    },
    xAxis: {
      lineColor: '#e5e5e5',
      tickColor: '#e5e5e5',
      labels: {
        style: {
          color: 'rgba(0, 0, 0, 0.6)',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
        },
      },
      title: {
        style: {
          color: 'rgba(0, 0, 0, 0.6)',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        },
      },
    },
    yAxis: {
      gridLineColor: '#f5f5f5',
      lineColor: '#e5e5e5',
      tickColor: '#e5e5e5',
      labels: {
        style: {
          color: 'rgba(0, 0, 0, 0.6)',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
        },
      },
      title: {
        style: {
          color: 'rgba(0, 0, 0, 0.6)',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        },
      },
    },
    tooltip: {
      backgroundColor: '#ffffff',
      borderColor: '#d4d4d4',
      borderRadius: 6,
      borderWidth: 1,
      shadow: false,
      style: {
        color: 'rgba(0, 0, 0, 0.9)',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '12px',
      },
    },
    legend: {
      itemStyle: {
        color: 'rgba(0, 0, 0, 0.8)',
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: '500',
        fontSize: '11px',
        textTransform: 'uppercase',
      },
    },
    // Ken DS data-viz palette · periwinkle / perano / purple ramp
    colors: [
      '#9488ec', // purple-500 (primary)
      '#c3c6f9', // periwinkle-500 (secondary)
      '#86b3e5', // perano-800 (tertiary · stronger for legibility)
      '#7075c8', // periwinkle-800 (quaternary)
      '#dfeafa', // perano-500 (pale fill)
    ],
    plotOptions: {
      column: {
        borderRadius: 2,
        borderWidth: 0,
      },
      bar: {
        borderRadius: 2,
        borderWidth: 0,
      },
      series: {
        animation: { duration: 400 }, // Doherty threshold respected
      },
    },
  });
}
```

### 11.3 Wiring in RootLayout

```tsx
// src/app/layout.tsx (or _app.tsx · client component wrapper)
'use client';
import { useEffect } from 'react';
import { applyKenChartsTheme } from '@/lib/kenChartsTheme';

export default function RootLayout({ children }) {
  useEffect(() => { applyKenChartsTheme(); }, []);
  return <>{children}</>;
}
```

OR via dedicated ClientThemeProvider component if RootLayout is server-only:

```tsx
// src/components/chrome/ClientThemeProvider.tsx
'use client';
import { useEffect } from 'react';
import { applyKenChartsTheme } from '@/lib/kenChartsTheme';

export function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => { applyKenChartsTheme(); }, []);
  return <>{children}</>;
}
```

Then mount in RootLayout. Test page imports also work · theme applies once per page load.

### 11.4 Install Highcharts as direct dep

```bash
pnpm add highcharts@11.4.6
```

Add to `package.json` of v1-product-page-ver0.4. Library declares peer dep · so resolution via root hoist works · but direct install is safer.

### 11.5 Reduced-motion

Theme respects `prefers-reduced-motion` via `series.animation.duration` · 400ms default · can be conditionally 0 via:

```ts
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
animation: reduced ? false : { duration: 400 }
```

Audit at build time.

### 11.6 Per-chart override (override the override)

For one-off charts that need different colors (e.g. heatmap-style ColumnChart), pass `colors` array via Highcharts options when wrapping · OR call `setOptions()` scoped to a single chart instance (advanced · rarely needed).

### 11.7 Charts to re-build w/ new theme

After theme override lands · existing charts auto-inherit:

| Section | Chart | Re-build needed |
|---|---|---|
| §08 | ColumnChart (Market Size) | Auto-inherit · just verify bg neutralized |
| §08 modal | (no chart in modal · table only) | n/a |
| §07 future | Bubble · TreeMap currently uses D3 not Ken Charts | TreeMap unchanged (D3 + manual colors) · Bubble TBD |

### 11.8 New charts patterned on refs

**Build w/ Ken Charts (theme-applied):**
- ColumnChart, BarChart, LineChart, AreaChart, StackedBarChart, MultiAxisLineChart, HistoricalProjectedAreaChart, PieChart, MultiSeriesLineChart

**Build custom (Ken Charts gap):**
- BubbleChart (rainbow-pothos pattern) · use Highcharts directly OR D3
- OpportunityHeatmap (rainbow-pothos pattern) · pure HTML/CSS grid · no chart lib
- PipelineTimeline (rainbow-pothos Gantt) · pure HTML/CSS grid · no chart lib
- ScenarioFanChart · custom · deferred

### 11.9 Per-chart caption · NEW canonical pattern

Every chart figure follows this anatomy:

```tsx
<figure>
  {/* Ken Charts (theme-applied · neutralized bg) */}
  <Chart ... />

  {/* Italic interpretation · DM Sans 13px · max 2 lines */}
  <figcaption className="mt-3 font-body italic text-[var(--semantic-ink-body)]"
              style={{ fontSize: '13px', lineHeight: 1.55 }}>
    Solid bars are historical · dashed are forecast.
  </figcaption>

  {/* SourceCluster collapsed below */}
  <SourceCluster citations={getSources([...])} methodologyHref="#methodology" />
</figure>
```

### 11.10 Audit checklist (verify chart re-build)

- [ ] Chart bg = transparent (not blue · not dark)
- [ ] Plot bg = transparent
- [ ] Series colors = periwinkle/perano/purple (not library default blue/emerald)
- [ ] Tooltip bg = white · text dark
- [ ] Axis labels DM Sans 11px uppercase tracked
- [ ] Gridlines `#f5f5f5` hairline only (or none)
- [ ] Column bars `borderRadius: 2` · no border stroke
- [ ] Animation 400ms · reduced-motion respected
- [ ] Title (when used) = Noto Serif 300

---

## Related

- `docs/REF-PATTERNS-ADOPTION.md`
- `docs/COLOR-USAGE-GUIDE.md`
- `docs/FONT-PAIRING-GUIDE.md`
- `docs/SOURCE-PROVENANCE.md`
- `docs/TABS-SWITCHERS-INFO-COMPOSITION.md`
- `projects/_briefs/v1-product-page/KEN-CHARTS-PLAN.md` — chart package gap analysis
