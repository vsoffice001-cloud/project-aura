# SCHEMA — reports-pdp-v1

**Date:** 2026-05-06
**Status:** Locked for V1 design phase (subject to tech-team review for backend integration).
**Pairs with:** [`design-system/recipes/report-detail-heavy.md`](../../design-system/recipes/report-detail-heavy.md)

Module-typed payload contract. Every Reports PDP renders from a `ReportDetailHeavy` object. The `modules[]` array is a discriminated union — renderer dispatches on `module.type`.

---

## Top-level

```ts
export interface ReportDetailHeavy {
  id: string;
  slug: string;
  title: string;
  industry: string;
  subIndustry?: string;
  region: string;
  pages: number;
  chartCount: number;
  segmentCount: number;
  ecosystemMapCount?: number;
  publishedDate: string;       // ISO date or "Q1 2026"
  refreshDate?: string;
  forecastHorizon: string;     // e.g. "2022-2027"
  authors: Author[];
  oneLiner: string;
  marketHighlights: string[];  // 3-5 bullets
  snapshotChart: ChartPayload;
  modules: ModuleNode[];       // ordered, type-driven
  faq: { q: string; a: string }[];
  related: RelatedReport[];
  toc: TocEntry[];
  methodology: Methodology;
  meta: ReportMeta;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  bio?: string;
  portraitUrl?: string;
  linkedInUrl?: string;
  priorReports?: { id: string; title: string; slug: string }[];
}

export interface RelatedReport {
  id: string;
  title: string;
  industry: string;
  region: string;
  pages: number;
  publishedDate: string;
  slug: string;
  thumbnailUrl?: string;
}

export interface TocEntry {
  id: string;          // anchor target
  title: string;
  subItems?: { id: string; title: string }[];
  pageRef?: number;    // PDF page reference (display only)
  gated?: boolean;     // teaser if Tier-3
}

export interface Methodology {
  approach: string;
  sampleSize?: number;
  geographies: string[];
  dataCollectionPeriod: string;
  sources: { type: 'primary' | 'secondary'; description: string }[];
  limitations: string[];
  respondentBreakdown?: { label: string; pct: number }[];
}

export interface ReportMeta {
  variant: 'editorial-A' | 'editorial-B' | 'cinematic-dark'; // renderer choice
  tier: 'standard' | 'premium';
  authRequired: boolean;        // gate Tier-3 modules
  schemaVersion: string;        // "1.0"
}
```

---

## Module discriminated union

```ts
export type ModuleNode =
  | DefinitionsModule
  | TaxonomyModule
  | EcosystemModule
  | ChartModule
  | MatrixModule
  | QuadrantModule
  | CardGridModule
  | FlowModule
  | IssueTableModule
  | TimelineModule
  | NodesModule
  | MacroPanelModule
  | InlineCTAModule;

interface ModuleBase {
  id: string;             // unique
  type: string;
  tier: 1 | 2 | 3;        // priority + gating
  priority: number;       // 0-100, higher = render first within tier
  groupKey?: string;      // optional cluster id (e.g. "competition")
  heading?: string;
  subheading?: string;
  source?: string;        // citation / data source line
  background?: 'white' | 'warm-300' | 'black';  // override default alternation
  gated?: boolean;        // Tier-3 only — render locked teaser pre-auth
}
```

### `mod.definitions`

```ts
export interface DefinitionsModule extends ModuleBase {
  type: 'definitions';
  group: 'key' | 'fundamental';   // recipe distinguishes 2 sub-types
  terms: { term: string; body: string; icon?: string }[];
}
```

### `mod.taxonomy`

```ts
export interface TaxonomyModule extends ModuleBase {
  type: 'taxonomy';
  root: string;
  branches: TaxonomyNode[];
}

interface TaxonomyNode {
  label: string;
  children?: TaxonomyNode[];
}
```

### `mod.ecosystem`

```ts
export interface EcosystemModule extends ModuleBase {
  type: 'ecosystem';
  scope: 'overall' | 'sub-market';
  subMarketLabel?: string;        // e.g. "Cold Storage", "Cold Transport"
  tiers: EcosystemTier[];
}

interface EcosystemTier {
  label: string;                  // e.g. ">200,000 Pallet Position"
  count: number;                  // "3-4 Players"
  threshold?: string;             // raw threshold descriptor
  logos: { name: string; logoUrl: string; href?: string }[];
  badge?: string;                 // optional rank badge
}
```

### `mod.chart`

Single normalized contract for all chart types. 16+ blocks render via this.

```ts
export interface ChartModule extends ModuleBase {
  type: 'chart';
  chartType: 'line' | 'bar' | 'stacked-bar' | 'combo' | 'pie' | 'donut' | 'area' | 'gauge' | 'scatter' | 'map';
  series: ChartSeries[];
  xAxis?: { label?: string; format?: 'year' | 'number' | 'category'; values?: (string | number)[] };
  yAxis?: { label?: string; unit?: string; format?: 'number' | 'currency' | 'percent' };
  unit?: string;                  // "AUD Mn" / "%" / "Pallets ('000)"
  yearRange?: [number, number];
  highlight?: { value: string; description: string };  // pull-quote stat
  layout?: 'default' | 'wide' | 'compact';
}

export interface ChartSeries {
  id: string;
  name: string;
  data: { x: string | number; y: number; label?: string }[];
  type?: 'bar' | 'line';          // for combo charts
  color?: 'primary' | 'accent' | 'neutral' | 'positive' | 'warning';
}

// Shared by hero snapshot + chart modules
export type ChartPayload = ChartSeries[] | ChartModule;
```

### `mod.matrix`

```ts
export interface MatrixModule extends ModuleBase {
  type: 'matrix';
  variant: 'comparison' | 'end-user' | 'sector-x-attribute';
  columns: MatrixColumn[];
  rows: MatrixRow[];
  stickyFirstColumn?: boolean;
  paginate?: { rowsPerPage: number };  // default 10 if heavy
}

interface MatrixColumn {
  id: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  format?: 'text' | 'number' | 'percent' | 'currency' | 'badge' | 'logo' | 'rating';
  width?: 'auto' | 'fixed';
}

interface MatrixRow {
  id: string;
  cells: { columnId: string; value: string | number; badge?: string; tooltip?: string }[];
  emphasis?: boolean;             // bold / highlight row (e.g. featured player)
}
```

### `mod.quadrant`

```ts
export interface QuadrantModule extends ModuleBase {
  type: 'quadrant';
  variant: 'swot' | 'positioning';
  axes?: { x: string; y: string };   // for positioning
  quadrants?: SWOTQuadrant[];        // for swot
  points?: PositioningPoint[];       // for positioning
  opportunityZone?: { label: string; xRange: [number, number]; yRange: [number, number] };
}

interface SWOTQuadrant {
  type: 'strength' | 'weakness' | 'opportunity' | 'threat';
  bullets: string[];
}

interface PositioningPoint {
  label: string;
  x: number;
  y: number;
  logoUrl?: string;
  emphasis?: boolean;
}
```

### `mod.cardGrid`

```ts
export interface CardGridModule extends ModuleBase {
  type: 'cardGrid';
  variant: 'drivers' | 'trends' | 'regulatory' | 'generic';
  cols: 2 | 3 | 4;
  cards: GridCard[];
}

interface GridCard {
  id: string;
  icon?: string;          // lucide icon name
  title: string;
  body: string;
  accent?: 'purple' | 'periwinkle' | 'perano' | 'coral' | 'neutral';
}
```

### `mod.flow`

```ts
export interface FlowModule extends ModuleBase {
  type: 'flow';
  variant: 'value-chain' | 'methodology';
  orientation: 'horizontal' | 'vertical';
  steps: FlowStep[];
  annotations?: FlowAnnotation[];
}

interface FlowStep {
  id: string;
  label: string;
  body?: string;
  icon?: string;
  metric?: { label: string; value: string };  // e.g. "Gross Margin: 5-15%"
}

interface FlowAnnotation {
  betweenStepIds: [string, string];
  text: string;                              // e.g. "Loading via reefer trucks"
}
```

### `mod.issueTable`

```ts
export interface IssueTableModule extends ModuleBase {
  type: 'issueTable';
  rows: IssueRow[];
}

interface IssueRow {
  id: string;
  problem: string;
  solution: string;
  severity?: 'low' | 'medium' | 'high';
  icon?: string;
}
```

### `mod.timeline`

```ts
export interface TimelineModule extends ModuleBase {
  type: 'timeline';
  variant: 'company-history' | 'event-sequence';
  range: [number, number];
  entities: TimelineEntity[];
}

interface TimelineEntity {
  id: string;
  name: string;
  logoUrl?: string;
  events: { year: number; label: string; emphasis?: boolean }[];
}
```

### `mod.nodes`

```ts
export interface NodesModule extends ModuleBase {
  type: 'nodes';
  variant: 'hub-spoke' | 'constellation';
  centerLabel?: string;
  nodes: NodeItem[];
}

interface NodeItem {
  id: string;
  label: string;
  body?: string;
  icon?: string;
  exampleCompanies?: string[];
}
```

### `mod.macroPanel`

```ts
export interface MacroPanelModule extends ModuleBase {
  type: 'macroPanel';
  panels: MacroSubPanel[];
}

type MacroSubPanel =
  | { kind: 'chart'; chart: ChartModule }
  | { kind: 'kpi'; label: string; value: string; sublabel?: string; trend?: 'up' | 'down' | 'flat' }
  | { kind: 'map'; mapType: 'country' | 'region'; markers: { name: string; lat: number; lng: number; label?: string }[] };
```

### `mod.inlineCTA`

```ts
export interface InlineCTAModule extends ModuleBase {
  type: 'inlineCTA';
  variant: 'sample-analyst' | 'sample-custom' | 'analyst-custom';
  headline?: string;
  body?: string;
}
```

CTA labels are NOT data-driven (locked by recipe). The variant decides the label set:

| variant | primary | secondary |
|---|---|---|
| `sample-analyst` | "Download Sample" | "Talk to Analyst" |
| `sample-custom` | "Download Sample" | "Custom This Report" |
| `analyst-custom` | "Talk to Analyst" | "Custom This Report" |

**No price language anywhere.**

---

## Renderer dispatcher

```tsx
// src/renderer/PDPModuleRenderer.tsx (sketch)
export function PDPModuleRenderer({ module }: { module: ModuleNode }) {
  if (module.gated) return <GatedTeaser module={module} />;

  switch (module.type) {
    case 'definitions':  return <MarketDefinitionsBlock {...module} />;
    case 'taxonomy':     return <TaxonomyTree {...module} />;
    case 'ecosystem':    return <EcosystemTierGrid {...module} />;
    case 'chart':        return <ChartCard {...module} />;
    case 'matrix':       return <MatrixTable {...module} />;
    case 'quadrant':     return module.variant === 'swot'
                           ? <SWOTQuadrant {...module} />
                           : <MarketPositioningQuadrant {...module} />;
    case 'cardGrid':     return <CardGridSection {...module} />;
    case 'flow':         return <ValueChainStepper {...module} />;
    case 'issueTable':   return <ChallengesSolutionsTable {...module} />;
    case 'timeline':     return <CompetitorTimeline {...module} />;
    case 'nodes':        return <EmergingTechNodes {...module} />;
    case 'macroPanel':   return <MacroIndicatorPanel {...module} />;
    case 'inlineCTA':    return <InlineCTASection {...module} />;
  }
}
```

---

## Data flow

1. Backend / CMS provides `ReportDetailHeavy` JSON keyed by `slug`.
2. Next.js dynamic route `app/reports/[slug]/page.tsx` fetches.
3. Variant selection logic (`meta.variant`) picks renderer template (`<EditorialALayout />`, `<EditorialBLayout />`, `<CinematicDarkLayout />`).
4. Layout passes `modules[]` to `<PDPModuleRenderer>` in order.
5. Renderer is type-driven; new content shapes (patent landscapes, M&A) added by adding new module types + new render branch.

---

## Open contract questions

1. **Auth gating mechanism:** `gated: true` Tier-3 modules — does FE check session, or backend pre-strips heavy children & emits teaser-only payload? Recommend: **backend pre-strips** to avoid leaking gated content in network responses. Tech-team decision.
2. **Chart palette tokens per series:** schema uses semantic names (`'primary' | 'accent' | …`) not hex. Token mapping happens in `ChartCard` via `tokens.css`. Locked.
3. **Map tile provider:** `mod.macroPanel` map markers — leaflet vs custom SVG? V1 design uses static SVG silhouette w/ markers (no tile lib dependency).
4. **Image hosting:** logos in `EcosystemTierGrid` — CDN or local `public/`? V1 uses local placeholders; tech-team migrates.
5. **i18n / RTL:** schema is currency/locale-naive. V1 = English LTR only. Flag for V2.

---

## Schema versioning

Current: `1.0` (2026-05-06).

Migration policy: additive changes (new `type`, new optional fields) = same major version. Breaking changes = `2.0`. Renderer must handle unknown `type` by skipping (warn in dev, no-op in prod).
