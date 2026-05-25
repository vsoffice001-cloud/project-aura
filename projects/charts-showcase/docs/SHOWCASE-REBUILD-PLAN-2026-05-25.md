# Charts Showcase · Professional Rebuild Plan · 2026-05-25 (Opus)

> Companion to `SHOWCASE-AUDIT-2026-05-25.md` (12 bugs · 15 missing features).
> Plan A (patch current 720 LOC) rejected · too many architectural changes needed.
> Plan B (full rebuild w/ professional pattern) · adopted.

---

## Architecture · 3-pane professional showcase

```
┌───────────────────────────────────────────────────────────────────┐
│  Top bar · Ken Research Chart Library v0.1.0 · search · breakpoint │
├──────────┬──────────────────────────────────────┬─────────────────┤
│  Sidebar │  Content Pane (chart + controls)     │  Right Panel    │
│  TOC     │  ┌────────────────────────────────┐  │  Props table    │
│          │  │  Chart canvas (live preview)   │  │  Live editor    │
│  ▶ Prims │  │                                │  │  Code snippet   │
│   ChartReveal │  ChartFigure wrapper           │  │  Token ref     │
│   TableShell  │                                │  │  A11y annot    │
│   ChartFigure │  Mock data w/ variant toggle   │  │                 │
│          │  └────────────────────────────────┘  │  Breakpoint     │
│  ▶ Charts │  Variant: low · mid · high           │  preview switch │
│   Column │  Surface: light · dark               │                 │
│   Bar    │  Density: compact · standard ...     │  Loading state  │
│   Bubble │  Reduced motion: on · off            │  Empty state    │
│   ...    │                                       │  Error state    │
│          │                                       │                 │
│  ▶ Tables│  ┌────────────────────────────────┐  │                 │
│   Property│ │  Code snippet · copy button    │  │                 │
│   Ranking│  │  import { ... }                │  │                 │
│          │  └────────────────────────────────┘  │                 │
└──────────┴──────────────────────────────────────┴─────────────────┘
```

**Layout:**
- Top bar 56px fixed
- Sidebar 240px fixed left (collapses on mobile to drawer)
- Content pane fluid center
- Right panel 320px fixed right (collapses on mobile to bottom sheet)

**Hash routing:** `/#chart-bubble` · `/#table-property` · scroll + persist + share

---

## Component build list

### 1. Layout primitives (showcase-local · NOT promoted to DS)

| Component | What | File |
|---|---|---|
| `ShowcaseLayout` | 3-pane shell · top bar + sidebar + content + right panel | `src/components/ShowcaseLayout.tsx` |
| `ShowcaseSidebar` | TOC w/ active highlight on scroll · hash sync | `src/components/ShowcaseSidebar.tsx` |
| `ShowcaseTopBar` | Library name · version · search · breakpoint switcher | `src/components/ShowcaseTopBar.tsx` |
| `ShowcaseRightPanel` | Props table · code snippet · controls | `src/components/ShowcaseRightPanel.tsx` |
| `DemoCanvas` | Center area · chart in card · controls below · variants · surface toggle | `src/components/DemoCanvas.tsx` |
| `CodeSnippet` | Syntax-highlighted block w/ copy button · shiki or highlight.js | `src/components/CodeSnippet.tsx` |
| `PropsTable` | Auto-derived from TS interface · name · type · default · description | `src/components/PropsTable.tsx` |
| `VariantToggle` | Reusable variant switcher · uses DS Button atoms | `src/components/VariantToggle.tsx` |
| `StateDemo` | Loading · empty · error tab strip · shows each state side-by-side | `src/components/StateDemo.tsx` |

### 2. Demo registry (data-driven · NOT hardcoded JSX)

`src/lib/demo-registry.ts` exports `DEMOS: Demo[]` where each demo is:

```ts
interface Demo {
  id: string;                          // 'chart-bubble' · hash anchor
  category: 'primitive' | 'chart' | 'table';
  name: string;                        // 'KenBubbleChart'
  description: string;                 // 1-line what it does
  component: React.ComponentType<any>; // the DS export
  variants: Array<{                    // data scenarios
    id: string;
    label: string;                     // 'low · 5 entities'
    props: Record<string, unknown>;
  }>;
  surfaces?: Array<'light' | 'dark'>;
  importSnippet: string;               // copy-paste-ready
  propsTable: Array<{ name: string; type: string; default?: string; description: string }>;
  a11y?: string;                       // notes
  knownIssues?: string;                // honest about gaps
}
```

Page.tsx becomes a renderer over registry · NOT 720 lines of duplicated JSX.

### 3. Showcase page · slim

```tsx
'use client';
import { DEMOS } from '@/lib/demo-registry';
import { ShowcaseLayout } from '@/components/ShowcaseLayout';
import { DemoCanvas } from '@/components/DemoCanvas';

export default function ShowcasePage() {
  return (
    <ShowcaseLayout demos={DEMOS}>
      {DEMOS.map(demo => <DemoCanvas key={demo.id} demo={demo} />)}
    </ShowcaseLayout>
  );
}
```

~30 LOC vs current 720 LOC.

---

## Bug fixes DURING rebuild (P0 from audit)

| Bug | Fix |
|---|---|
| 1 · Double legend collision | EACH chart wrapper sets `legend.enabled: false` at instance level · ChartFigure owns legend exclusively |
| 2 · Scenario fan label collision | Same as #1 |
| 3 · Donut right-shifted | `plotOptions.pie.center: ['50%', '50%']` in KenDonutChart wrapper instance · NOT relying on default |
| 4 · Bubble labels clip section | Cinematic section padding 64px top + bottom · BubbleChart `dataLabels.padding: 4` |
| 5 · Nested table hydration | Refactor TableShell to render `<div role="table">` w/ children OR enforce no outer `<table>` in children · update PropertyTable/RankingTable signatures |
| 6 · Sticky header not working | Verify Tailwind classes generated · ensure scroll parent w/ fixed height · doc that consumer needs scroll container |
| 7 · Body BG pure white | `globals.css` body { bg: var(--semantic-bg-page) } |
| 8 · No section alternation | Use DS `SectionWrapper` (existing atom) · NOT raw `<section>` |
| 9 · Unit position drift | ChartFigure standardize · unit always top-right pill · same baseline as eyebrow |
| 10 · Custom toggle buttons | Use DS Button (size="sm" variant="secondary") · OR FilterChip |
| 11 · Redundant dynamic imports | Page-level `'use client'` · direct named imports · skip dynamic |
| 12 · Mobile broken | Container max-w 100% on <md · chart height 220px on <sm · tables horizontal-scroll w/ visible scrollbar |

---

## Library improvements (DS-side · NOT showcase-side)

### Chart wrappers need NEW props

```ts
interface ChartCommonProps {
  height?: number;
  ariaLabel?: string;
  unit?: string;
  disableReveal?: boolean;
  // NEW:
  surface?: 'light' | 'dark';         // affects tooltip · grid · ink colors
  loading?: boolean;                  // render skeleton
  empty?: boolean;                    // render empty state
  error?: string;                     // render error state w/ message
  variant?: 'default' | 'compact';    // affects internal padding · label density
}
```

### ChartFigure needs unified slot system

```ts
interface ChartFigureProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;                  // NEW
  unit?: string;
  unitPosition?: 'top-right' | 'inline-eyebrow';  // NEW · default top-right
  insight?: string;
  legend?: LegendItem[];              // ChartFigure-owned ONLY · chart wrapper MUST disable internal
  figcaption?: string;
  source?: SourceInfo;                // NEW · cite primary source
  className?: string;
  children: React.ReactNode;
}
```

### TableShell · breaking change · canonical from refs

```ts
// BEFORE (broken · nested table):
<TableShell><table>...</table></TableShell>

// AFTER (clean):
<TableShell>
  <thead>...</thead>
  <tbody>...</tbody>
</TableShell>
```

TableShell renders the `<table>` itself · children are `<thead>` + `<tbody>` only.

### Table layer canonical (per `REF-TABLES-DEEP-MINE-2026-05-25.md` · 33 tables analyzed)

**NEW props in TableShell:**
```ts
type TableVariant = 'card' | 'open';
type TableHeaderStyle = 'wash' | 'transparent' | 'inverted';

interface TableShellProps {
  // existing:
  density?: TableDensity;
  stickyHeader?: boolean;
  alternateRows?: boolean;
  // NEW from table-deep-mine:
  variant?: TableVariant;            // 'card' (Ref 1 · default) | 'open' (Ref 2 · editorial)
  headerStyle?: TableHeaderStyle;    // 'wash' (default) | 'transparent' (open variant) | 'inverted' (matrix/featured)
  scrollX?: boolean;                 // overflow:auto on wrapper for h-scroll · default true for card variant
  // a11y unchanged
}
```

**Card variant (default · Ref 1 canonical):**
```css
.tableshell--card {
  border: 1px solid rgb(208, 203, 232);   /* periwinkle-tinted */
  border-radius: 10px;
  overflow: auto;                         /* clips table corners · radius lives here */
  background: transparent;
  padding: 0;
  margin: 28px 0;
  box-shadow: none;
}
```

**Open variant (Ref 2 editorial):**
```css
.tableshell--open {
  border: none;
  border-radius: 0;
  overflow: visible;                      /* OR overflow-x:auto · keep page scroll */
  background: transparent;
  padding: 0;
  margin: 28px 0;
}
.tableshell--open tbody tr:last-child td {
  border-bottom: 1px solid rgb(228, 226, 240);  /* explicit close · no wrapper */
}
```

**Header styles:**
- `wash` · `rgb(248, 247, 254)` periwinkle wash · default · standard data
- `transparent` · no bg + 1px border-bottom only · editorial/qualitative
- `inverted` · `rgb(91, 79, 207)` solid periwinkle + WHITE text · opportunity matrix · report tabs

**Cell corner rule (UNIVERSAL):**
- `<th>`, `<td>`: `border-radius: 0` always
- Wrapper border-radius + overflow clip = rounded appearance
- Card variant: last `<td>` border-bottom: `0` (wrapper closes)
- Open variant: last `<td>` border-bottom: `1px solid rgb(228,226,240)` (explicit close)

**Sticky mechanics (pure CSS · NO JS):**
```css
.tableshell[data-sticky-header="true"] thead th {
  position: sticky;
  top: 0;
  z-index: 1;
  background: var(--header-bg);            /* prefilled · NOT toggled */
  border-bottom: 2px solid currentColor;   /* THE signal · was 1px non-sticky */
}
```
- NO shadow added on engage
- NO transition (sticky CSS works frame-perfect)
- 2px border vs 1px non-sticky = the only visual differentiator
- Requires `overflow: auto` parent (provided by card variant by default)

**Spacing chain (Ref 1 canonical):**
- Title → table: `28px` margin-top
- Table → footnote/source: `12px` margin-top
- Footnote → next section: `40px` margin-bottom (combined w/ section gap)

Document migration in JSDoc + COMPONENT_REFERENCE.md.

### New primitives needed

- `ChartSkeleton` (in DS · current showcase has local one)
- `TableSkeleton` (in DS)
- `EmptyState` (in DS · with optional CTA)
- `ErrorState` (in DS · with retry CTA)

---

## Sprint sequencing

### Sprint B.1 · Library fixes (Bugs 1-6 · 9 · plus new props) · ~3 hr
- All 7 chart wrappers: `legend.enabled: false` enforce
- KenDonutChart: center fix
- KenBubbleChart: dataLabels padding
- TableShell: refactor to render `<table>` self · update PropertyTable + RankingTable consumers
- Sticky header verify · scroll parent contract
- ChartFigure: unit position standardize
- Add common props: surface · loading · empty · error · variant
- Build: ChartSkeleton · TableSkeleton · EmptyState · ErrorState atoms
- Verify v0.4 still typechecks after breaking TableShell signature

### Sprint B.2 · Showcase rebuild (Bugs 7-8, 10-12 · pro features 1-5) · ~5 hr
- Build 9 showcase-local components (layout · sidebar · top bar · right panel · DemoCanvas · CodeSnippet · PropsTable · VariantToggle · StateDemo)
- Build demo registry (`src/lib/demo-registry.ts`) · all 9 charts/tables + 3 primitives with variants · code snippets · props tables
- Slim page.tsx · registry-driven render
- Fix body bg · section alternation · use DS SectionWrapper
- DS Button for toggles
- Drop redundant dynamic imports
- Mobile responsive · drawer sidebar · bottom-sheet right panel

### Sprint B.3 · Pro features 6-15 + polish · ~3 hr
- Reduced-motion toggle (CSS override + chart prop)
- Responsive breakpoint preview (iframe-style switcher)
- A11y annotation overlay (toggle reveals aria-label · focus order)
- Loading · empty · error state demos (use new DS atoms)
- Token reference panel (sidebar right · scrollable)
- Filter · search · sort on sidebar
- Live async API mock (setTimeout · ChartSkeleton replaces)
- Storybook-style props table (auto-derived from TS · use ts-morph or hand-typed in registry)

### Sprint B.4 · Verify · screenshots · close · ~1 hr
- Playwright screenshot per demo (light + dark surfaces)
- Lighthouse perf 90+
- Axe a11y clean
- Confirm all 12 bugs resolved
- Confirm 15 pro features present

**Total: ~12 hr · 4 sub-sprints**

---

## NEW charts/tables to ADD (Phase 3 deferred per prior plan)

Per `CHART-LIBRARY-PLAN-2026-05-25.md` §Phase 3 (deferred from prior sprint):

| Component | Library | Build effort | Showcase variant count |
|---|---|---|---|
| `KenTreemap` | Highcharts treemap module | M | 3 variants (small · large · tiered) |
| `KenHeatmap` | CSS grid (custom) | M | 3 variants (3x3 · 5x7 · w/ stars) |
| `KenKeywordScatter` | Custom force-layout | L | 2 variants (small · cloud) |
| `KenGanttTimeline` | CSS grid or Highcharts gantt | M | 2 variants (project pipeline · roadmap) |
| `ChartSkeleton` | Static + animated | S | 4 variants per chart type |
| `TableSkeleton` | Static + animated | S | 2 variants (density compact · standard) |
| `EmptyState` | Static atom | S | 3 variants w/ CTA |
| `ErrorState` | Static atom + retry | S | 3 variants |
| `StatSkeleton` | For MetricStrip | S | 2 variants |

These build into DS · then add demos to showcase registry.

**Sprint C scope (post-B):** Phase 3 viz · ~10 hr.

---

## DECISION POINTS · need user input before B.1 spawn

### D1 · TableShell breaking change
Refactoring TableShell to render `<table>` itself · breaks current PropertyTable + RankingTable signatures
- (a) Do it now · 1 migration sprint · clean long-term
- (b) Keep current · accept nested-table console errors · add wrapper around children
- **Aura recommends (a)** · we control all consumers · refactor safe

### D2 · Showcase scope
- (a) Full rebuild Sprint B (12hr total · 4 sub-sprints) · professional grade
- (b) Patch current 720 LOC (3-4hr · less drastic · stops short of pro grade)
- **Aura recommends (a)** · current is dev-grade · matches your direct feedback

### D3 · Sidebar tech
- (a) Use DS `SideTOCV04` (already exists in v0.4) · adapt for showcase
- (b) Build new `ShowcaseSidebar` · purpose-built · could promote to DS later
- **Aura recommends (b)** · ShowcaseSidebar has different scan pattern (component categories not section numbers) · promote to DS once stable

### D4 · Code snippet renderer
- (a) `shiki` · Anthropic-quality syntax highlighting · ~80KB
- (b) `highlight.js` · faster · uglier · ~50KB
- (c) Inline pre/code · no highlighting · 0KB · ugly
- **Aura recommends (a)** · pro showcase needs pro code · ship cost

### D5 · Props table source-of-truth
- (a) Hand-typed in demo registry · simple · maintenance burden
- (b) Auto-derived from TS via `ts-morph` build step · accurate · complex
- **Aura recommends (a) for B.2** · can upgrade to (b) in Sprint C if needed

### D6 · NEW chart builds in Sprint B or defer to C?
- (a) Sprint B includes Treemap + Heatmap (most-needed) · 2 hr added · ~14hr total
- (b) Defer ALL new charts to Sprint C · keep B focused on fixes + showcase rebuild · 12hr B + 10hr C
- **Aura recommends (b)** · don't bundle library expansion w/ infrastructure rebuild · fail-mode different

---

## My answers (locked w/o further confirmation if user says "execute"):

- **D1** → (a) refactor TableShell · we own all consumers
- **D2** → (a) full rebuild · professional grade
- **D3** → (b) purpose-built ShowcaseSidebar
- **D4** → (a) shiki (already common in Next 15 toolchain via `bright` or `shiki/react`)
- **D5** → (a) hand-typed in registry
- **D6** → (b) defer new charts to Sprint C

---

## Total time estimate

- Sprint B.1 (library fixes) · 3 hr · Sonnet aura-builder
- Sprint B.2 (showcase rebuild) · 5 hr · Sonnet aura-builder
- Sprint B.3 (pro features) · 3 hr · Sonnet aura-builder
- Sprint B.4 (verify) · 1 hr · Sonnet aura-qa
- **Total Sprint B: 12 hr**

- Sprint C (new charts · Phase 3 from prior plan) · 10 hr
- **Grand total · charts excellence: 22 hr**

---

## Confirmation needed before spawn

Tell me one of:
1. **"execute"** · spawn B.1 immediately w/ my locked decisions D1-D6
2. **"override D<n>"** · change my decision before spawn
3. **"pause"** · refine plan more before spawn
