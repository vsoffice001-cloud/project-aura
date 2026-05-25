# Ken Charts · Integration Plan for V1 Product Page v0.2

Research date: 2026-05-15 · Sources: npm registry · Storybook index · unpkg `dist/index.d.ts`.

---

## A · Package status

| Field | Value |
|---|---|
| Name | **`@ken-research/charts`** |
| Latest | **0.1.5** (pub 2026-02-24) |
| Install | `pnpm add @ken-research/charts` (peers: `react>=18`, `react-dom>=18`) |
| Stack | **Highcharts 11.4.6** + `highcharts-react-official@3.2.1` |
| License | UNLICENSED (private) — verify access w/ Saurabh (`saurabh.dewli@kenresearch.com`) before adding |
| Repo | `github.com/ken-research/charts` (private · 404 anon) |
| Storybook | https://ken-charts.netlify.app |
| Entry | ESM `dist/index.mjs` · CJS `dist/index.js` · types `dist/index.d.ts` · single export `.` |
| SSR | Author claim: "SSR-ready" (Highcharts requires client guard — wrap w/ `'use client'` in Next 15 RSC) |

**Public availability:** yes on npm registry · GitHub repo private · install requires either public npm pull (likely works) or registry auth. **Test `pnpm view @ken-research/charts versions` first before assuming pull works in CI.**

---

## B · Chart inventory (9 shipped · 13 PRD-required)

Source: Storybook index + `dist/index.d.ts`.

| PRD §20 type | Ken Charts component | Props (key) | Status |
|---|---|---|---|
| Area | `AreaChart` | `labels[]`, `data[]`, `yAxisTitle?`, `valueAxisTicks?` | shipped |
| Line | `LineChart` | same as Area | shipped (+ `With Subtitle` story) |
| Bar (horizontal) | `BarChart` | same as Area | shipped |
| Column (vertical bar) | `ColumnChart` | same as Area | shipped |
| Stacked Bar | `StackedBarChart` | `labels[]`, `series[]`, `horizontal?` | shipped (h/v toggle via prop) |
| Donut | `PieChart` w/ `donut: true` | `data: {name,value}[]`, `donut?` | shipped |
| Dual-axis | `MultiAxisLineChart` | `leftSeries[]`, `rightSeries[]`, `leftAxisTitle?`, `rightAxisTitle?` | shipped |
| Multi-series Line | `MultiSeriesLineChart` | `labels[]`, `series[]` | shipped |
| Historical+Projected Area | `HistoricalProjectedAreaChart` | `series[]` w/ `isProjected`, `projectionStartIndex`, `legendItems[]` | shipped (Aus cold-chain market-size fit) |
| **Bubble** | — | — | **GAP** |
| **Heatmap** | — | — | **GAP** |
| **Map (geo)** | — | — | **GAP** (Highcharts Maps available · ask Saurabh to add) |
| **Timeline** | — | — | **GAP** |
| **Value Chain** | — | — | **GAP** (custom React/SVG · not charts lib) |
| **Data Table** | — | — | **GAP** (not Ken Charts scope · use shadcn Table) |

**Shared BaseChartProps:** `title? · subtitle? · height? · currency? · figure?`. No `onClick`/event props exposed in `.d.ts` (interaction events would need fork or wrapper-level handler via ref). **No data-cell click handlers** = paywall interactions live at wrapper layer, not chart layer.

**Colors export:** library ships a structured `colors` object (glass effects · shadows · purple/red/green/black palettes · brand · borders). Maps roughly to DS purple/perano/coral/brand-red — **token-bridge module needed** (see D).

---

## C · ChartCard wrapper spec

Wrapper owns layout · access state · skeleton · paywall · CTA. Chart is the body slot only.

```ts
// v1-product-page-ver0.2/src/components/charts/ChartCard.tsx
type AccessState =
  | { tier: 'public'; rowsVisible: 3 }
  | { tier: 'lead'; rowsVisible: 8; meter?: { used: number; cap: number } }
  | { tier: 'paid'; rowsVisible: 'all' };

interface ChartCardProps {
  // Frame
  eyebrow: string;              // SectionLabel · uppercase tracked
  title: string;                // H3 serif (Noto Serif · DESIGN.md scale)
  insight: string;              // one-line analyst note · italic body-sm

  // Body (slot pattern · NOT prop — supports any Ken Charts comp)
  children: React.ReactNode;    // <AreaChart .../> etc.

  // Optional interactive header
  controls?: React.ReactNode;   // toggle/filter/timeRange/viewMode (composed at call site)

  // Dataset preview (collapsible)
  preview?: {
    columns: string[];
    rows: Array<Record<string, unknown>>;  // wrapper slices to rowsVisible
    defaultOpen?: boolean;
  };

  // Provenance
  source: { label: string; methodologyHref?: string };

  // Access + paywall
  access: AccessState;
  onUnlock?: () => void;        // primary CTA · brand-red
  onTalkToAnalyst?: () => void; // secondary
  onDownloadSample?: () => void;// tertiary

  // States
  loading?: boolean;            // skeleton in body slot
  fallback?: React.ReactNode;   // static img/svg if data missing
}
```

**Composition rule:** **slots > props.** Caller passes `<AreaChart>` or any other Ken comp as `children`. Wrapper never imports Ken Charts directly — keeps wrapper portable + lets fallback work when package unavailable.

**Access-state visual treatment:**
- `public` → full chart · 3 preview rows · lock badge on rows 4+ in preview
- `lead` → full chart · 8 preview rows · meter pill (`3/10 unlocks used`) in card footer
- `paid` → full chart · all rows · no lock UI
- **Paywall overlay** (when preview-only chart): chart blurred at 8px · centered lock card w/ brand-red Unlock CTA · z-overlay above chart · respects reduced-motion (no fade on overlay)

**Mobile behavior (<768px):**
- Eyebrow + title + insight stack full-width
- Controls collapse to bottom-sheet trigger (`Filters · 3` pill)
- Chart `height` prop drops to 280px (vs 380px desktop)
- Preview table → horizontal scroll w/ shadow edge mask
- Source + access footer stacks vertically · CTAs full-width

---

## D · Integration plan

**Phase 1 · install + smoke-test (v0.2 sprint open)**
1. `pnpm add @ken-research/charts` in `v1-product-page-ver0.2/`
2. If 403/404 — escalate to Saurabh for npm access OR Verdaccio mirror
3. Add `'use client'` boundary at every Ken chart import (Next 15 RSC + Highcharts DOM dep)
4. Smoke story: drop `<AreaChart labels={['2020',...]} data={[1,2,3]} />` into a page · confirm SSR no-crash

**Phase 2 · wrapper + token bridge**
- Wrapper location: **project-local** `v1-product-page-ver0.2/src/components/charts/ChartCard.tsx` (NOT DS core-v2 yet — promote only after 2nd consumer needs it · per anti-bloat rule)
- Token bridge: `src/components/charts/kenChartsTheme.ts` maps DS tokens → Ken Charts `colors` shape:
  ```ts
  // pseudo
  import { colors as kenColors } from '@ken-research/charts';
  export const productPageTheme = {
    ...kenColors,
    series: [
      'var(--color-purple-500)',
      'var(--color-perano-500)',
      'var(--color-coral-500)',
      'var(--color-brand-red)',
    ],
  };
  ```
  Verify Ken Charts accepts color override (check Storybook story args · if not, fork or PR upstream).

**Phase 3 · gap-fill (chart types missing from package)**
- Bubble · Heatmap · Map · Timeline → **request from Saurabh first** (one shared lib > local re-implementation)
- If declined or out-of-sprint: local Recharts/Highcharts wrappers in `src/components/charts/_fallback/` w/ same wrapper API · clearly tagged `// TODO: migrate to @ken-research/charts when shipped`
- Value Chain → custom SVG (never a "chart")
- Data Table → shadcn `Table` + TanStack Table (not Ken Charts scope)

**DS strategy:** **keep ChartCard project-local for v0.2.** Promote to `design-system/core-v2/molecules/ChartCard/` only when (a) v0.2 ships + (b) 2nd consumer (case-study or report-store) needs it. Anti-bloat: 1 consumer = no DS atom.

---

## E · Customization patterns

From `.d.ts` + Highcharts model:
- **Theming:** override via Highcharts global `setOptions()` once at app boot · OR pass theme to wrapper that mutates per-instance Highcharts opts (cleaner)
- **New variants:** Ken Charts is closed-source per repo · contribute via PR to `github.com/ken-research/charts` (get access from Saurabh)
- **Color override per instance:** **uncertain** from `.d.ts` alone — `BaseChartProps` exposes no `colors` prop. Probable path: Ken Charts internally reads from exported `colors` object · we either monkey-patch via `setOptions` or fork
- **Currency/figure formatting:** `currency?: string` + `figure?: string` on BaseChartProps — likely tooltip/axis formatting helpers
- **Subtitle:** native (`LineChart · With Subtitle` story confirms)
- **Reduced-motion:** Highcharts has `chart.animation: false` global · wrapper should pipe `useReducedMotion()` → `setOptions({ chart: { animation: !reduced } })`

---

## F · Open questions

1. **npm access** — is `@ken-research/charts` pullable w/o auth? Test `pnpm view` from CI account before sprint commits.
2. **Color override API** — does Ken Charts honor a per-instance theme prop, or only the exported `colors` constant? Need source access or Saurabh confirm.
3. **Event hooks** — `.d.ts` shows no `onClick`/`onPointClick`. PRD §20 implies "interactive controls" — clarify if interaction = chart-level drilldown or wrapper-level filters only.
4. **Map · Bubble · Heatmap · Timeline** — request roadmap from Saurabh. Blocks 4 of 13 PRD chart slots.
5. **SSR guard pattern** — confirm Highcharts works under Next 15 RSC w/ `'use client'` alone, or need `dynamic(() => import, {ssr:false})` wrapper.
6. **Paywall on chart body** — blur overlay vs replace-with-static-img · pick per UX-perf trade-off (blur = heavier DOM · img = lighter but loses interactivity teaser).
7. **DS promotion threshold** — when to lift ChartCard from project to `core-v2`? Propose: 2nd consumer.

---

**Bottom line:** package real · Highcharts-based · 9/13 PRD types covered · install gated on registry access · wrapper stays project-local until 2nd consumer · 4 chart-type gaps need Saurabh conversation before v0.2 sprint commits.
