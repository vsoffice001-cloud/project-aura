# SCHEMA — reports-pdp-v2

**Date:** 2026-05-06
**Status:** PRD-locked.
**Pairs with:** [`design-system/recipes/report-detail-prd.md`](../../design-system/recipes/report-detail-prd.md) · [PRD §39 CMS Data Model]
**Supersedes:** `SCHEMA-v1-archive.md`

Module-typed payload contract for V2 Reports PDP. Discriminated union; renderer dispatches on `module.type`. Adds 5-tier access system, hero cockpit, snapshot, key stats, executive summary, report scope, answer blocks, report facts, schema meta, lead form contexts, dataset preview, analytics context.

---

## Top-level

```ts
export interface ReportDetailV2 {
  // === Core metadata (PRD §39 Report Core) ===
  id: string;
  product_code: string;        // Ken's internal SKU
  slug: string;
  title: string;               // full title, exact
  short_title?: string;
  market_name: string;         // "Australia Cold Chain"
  industry: string;
  sub_industry?: string;
  region: string;
  country?: string;
  report_type: 'market-intelligence' | 'sector-deep-dive' | 'survey' | 'custom';
  pages: number;
  chart_count: number;
  segment_count: number;
  ecosystem_map_count?: number;
  published_date: string;      // ISO or "Q1 2026"
  base_year: number;           // 2022
  historical_period: string;   // "2017-2022"
  forecast_period: string;     // "2022-2027"
  currency: string;            // "AUD"
  unit: string;                // "Mn"
  format: 'pdf' | 'pdf+excel' | 'html-interactive';
  delivery_type: 'instant' | 'lead-confirmed' | 'analyst-delivered';
  status: 'draft' | 'review' | 'approved' | 'published' | 'archived';
  refresh_date?: string;
  last_updated?: string;

  // === Authors / People ===
  authors: Author[];

  // === Hero cockpit (PRD §9) ===
  heroCockpit: HeroCockpit;

  // === Premium product card (PRD §10) ===
  intelligenceSnapshot: ReportSnapshot;

  // === Stat tiles (PRD §12) ===
  keyStats: KeyStat[];

  // === Executive summary (PRD §13) ===
  executiveSummary: ExecutiveSummary;

  // === Report scope (PRD §14) ===
  reportScope: ReportScope;

  // === TOC (PRD §35) ===
  toc: TocEntry[];

  // === Modules (PRD §8 ordered) ===
  modules: ModuleNode[];

  // === FAQ (PRD §36) ===
  faq: FAQEntry[];

  // === Related reports (PRD §37) ===
  related: RelatedReport[];

  // === Methodology (PRD §34) ===
  methodology: Methodology;

  // === GEO/AI extraction (PRD §43) ===
  reportFacts: ReportFacts;
  answerBlocks: AnswerBlocks;

  // === Schema.org JSON-LD (PRD §44) ===
  schemaMeta: SchemaMeta;

  // === Lead form context payload (PRD §46) ===
  leadFormContexts: LeadFormContextMap;

  // === Analytics context (PRD §47) ===
  analyticsContext: AnalyticsContext;

  // === Renderer meta ===
  meta: ReportMeta;
}
```

---

## Access levels (PRD §22) — 5 tiers

```ts
export type AccessLevel =
  | 'public'         // always visible
  | 'metered'        // 2 free interactions/session
  | 'lead-gated'     // form submission required
  | 'login-gated'    // auth required
  | 'paid'           // purchase required
  | 'hidden';        // not rendered

export interface AccessControl {
  level: AccessLevel;
  meterKey?: string;               // increment counter on interaction
  publicPreview?: {                // what shows pre-unlock
    rows?: number;
    blurAfter?: number;
    summaryText?: string;
  };
  ctaTrigger: 'sample' | 'analyst' | 'customization' | 'login' | 'purchase';
  paywallSelector?: string;        // CSS class for schema.org marker
  schemaIsAccessibleForFree: boolean;
}
```

Every `ModuleBase` has `access: AccessControl`. Default `level: 'public'`.

---

## Hero cockpit (PRD §9)

```ts
export interface HeroCockpit {
  breadcrumb: BreadcrumbCrumb[];
  badges: { label: string; theme: 'industry' | 'region' | 'report-type' | 'date' }[];
  h1: string;                      // full report title
  promise: string;                 // 1-line subtitle
  proofBullets: string[];          // 3 bullets w/ figures
  ctas: { primary: HeroCta; secondary: HeroCta };
  trustStrip: TrustStrip;
  metadata: HeroMetadata;
  tabs: {
    marketSize: HeroTab<ChartModule>;
    forecast: HeroTab<ChartModule>;
    segmentation: HeroTab<ChartModule>;
    competitors: HeroTab<CompetitorPreviewPayload>;
  };
}

interface HeroTab<P> {
  label: string;
  payload: P;
  access: AccessControl;
  meterAfterInteraction?: number;  // default 2
}

interface HeroCta {
  label: string;                   // exact CTA label
  variant: 'brand' | 'secondary' | 'ghost';
  trigger: LeadFormType | 'navigate' | 'unlock-meter';
  href?: string;
  formContext?: string;            // key in leadFormContexts
}

interface TrustStrip {
  authorId: string;                // resolves via authors[]
  lastUpdatedDisplay: string;      // "Last updated Q1 2026"
  shareTargets: ('linkedin' | 'twitter' | 'email' | 'copy-link')[];
}

interface HeroMetadata {
  pages: number;
  productCode: string;
  baseYear: number;
  historicalPeriod: string;
  forecastPeriod: string;
  format: string;
  deliveryType: string;
}

interface CompetitorPreviewPayload {
  logos: { name: string; logoUrl: string }[];
  miniMarketShare: ChartSeries;
  positioningTeaserUrl?: string;   // locked teaser image
  unlockCtaTrigger: LeadFormType;
}
```

---

## Report Intelligence Snapshot (PRD §10)

```ts
export interface ReportSnapshot {
  marketSize: { value: number; unit: string; year: number; sourceNote: string };
  forecast: { value: number; unit: string; year: number; cagr: number; period: string };
  segments: { primary: string[]; dominant?: string };
  majorCompanies: { logos: { name: string; logoUrl: string }[]; lockedFullCount?: number };
  buyerUseCases: BuyerUseCase[];
  availableOutputs: ('pdf' | 'charts' | 'tables' | 'sample' | 'analyst-call' | 'customization' | 'excel')[];
}

export type BuyerUseCase =
  | 'market-entry'
  | 'competitive-benchmarking'
  | 'investment-screening'
  | 'expansion-planning'
  | 'supply-chain-strategy'
  | 'procurement-planning'
  | 'product-strategy'
  | 'growth-decisions';
```

---

## Key Stats Strip (PRD §12)

```ts
export interface KeyStat {
  id: string;
  value: string;                   // "AUD 6,547.8 Mn"
  label: string;                   // "Australia Cold Chain Market Size"
  yearOrPeriod: string;            // "2022"
  tooltipDefinition: string;
  sourceNote: string;
  access: AccessControl;
  expandRelatedChartId?: string;   // click → scroll to chart
  unlockTrigger?: LeadFormType;
  trend?: 'up' | 'down' | 'flat';
}
```

5-7 tiles per page. Lock indicator on premium ones.

---

## Executive Summary (PRD §13)

```ts
export interface ExecutiveSummary {
  insightLine: string;             // 1-line top conclusion
  paragraphs: {
    marketOverview: string;        // why market matters + size
    growthDrivers: string;         // demand + tech + macro
    decisionUtility: string;       // what report helps decide
  };
  takeawayCards: TakeawayCard[];   // 3-5
  buyerUseCaseChips: BuyerUseCase[];
  ctaTrigger: 'sample' | 'analyst';
}

interface TakeawayCard {
  id: string;
  icon: string;
  title: string;
  body: string;
  category: 'demand' | 'forecast' | 'segments' | 'competition' | 'methodology';
}
```

---

## Report Scope (PRD §14)

```ts
export interface ReportScope {
  marketCoverage: ScopeItem[];          // "Cold storage", "Cold transport", ...
  geographyCoverage: ScopeItem[];
  segmentCoverage: ScopeItem[];
  competitorCoverage: ScopeItem[];
  timeCoverage: { baseYear: number; historical: string; forecast: string };
  methodologyCoverage: ScopeItem[];
  deliverables: ScopeItem[];
  customizationOptions: ScopeItem[];
}

interface ScopeItem {
  label: string;
  description?: string;
  badge?: 'included' | 'excluded' | 'optional';
}
```

---

## Module discriminated union (extends v1)

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
  | InlineCTAModule
  | MarketOverviewModule;          // NEW (PRD §15)

interface ModuleBase {
  id: string;
  type: string;
  tier: 1 | 2 | 3;
  priority: number;
  groupKey?: string;
  heading?: string;
  subheading?: string;
  source?: string;
  background?: 'white' | 'warm-300' | 'black';
  access: AccessControl;            // CHANGED — was `gated: boolean`
  label?: string;                   // eyebrow
  analyticsId?: string;             // override default section_name
}
```

### `mod.chart` w/ 8-zone + dataset preview (PRD §20-21)

```ts
export interface ChartModule extends ModuleBase {
  type: 'chart';
  chartType:
    | 'area' | 'line' | 'bar' | 'column' | 'pie' | 'donut'
    | 'stacked-bar' | 'multi-series-line' | 'multi-axis-line'
    | 'historical-projected-area' | 'horizontal-bar'
    | 'bubble' | 'heatmap' | 'map' | 'scatter';
  zones: {                          // PRD §20 — 8 zones
    eyebrow?: string;
    title: string;
    insightLine?: string;            // analyst takeaway
    controls?: ChartControl[];
    sourceNote: string;
    accessState: AccessControl;      // mirrors module.access for granularity
    cta?: { label: string; trigger: LeadFormType };
  };
  series: ChartSeries[];
  xAxis?: AxisSpec;
  yAxis?: AxisSpec;
  unit?: string;
  yearRange?: [number, number];
  highlight?: { value: string; description: string };
  datasetPreview: DatasetPreview;   // PRD §21
  layout?: 'default' | 'wide' | 'compact';
  staticImageFallback?: string;     // if dataset missing
}

interface ChartControl {
  id: string;
  type: 'toggle' | 'tab' | 'select' | 'date-range';
  label: string;
  options?: { label: string; value: string }[];
  defaultValue?: string;
  accessControl?: AccessControl;
}

interface AxisSpec {
  label?: string;
  unit?: string;
  format?: 'number' | 'currency' | 'percent' | 'year' | 'category';
  values?: (string | number)[];
  ticks?: number[];
}

interface ChartSeries {
  id: string;
  name: string;
  data: { x: string | number; y: number; label?: string }[];
  type?: 'bar' | 'line' | 'area';   // for combos
  color?: 'primary' | 'accent' | 'neutral' | 'positive' | 'warning';
  isProjected?: boolean;            // dotted line treatment
  dashed?: boolean;
}

export interface DatasetPreview {
  publicRows: number;               // 3
  leadRows: number;                 // 8-10
  fullRowCount: number;             // total
  columns: DatasetColumn[];
  rows: DatasetRow[];
  exportEnabled: { sample: boolean; full: boolean };
  lastUpdated: string;
  sourceNote: string;
  methodologyNote?: string;
}

interface DatasetColumn {
  id: string;
  label: string;
  format: 'text' | 'number' | 'percent' | 'currency' | 'year';
  align?: 'left' | 'center' | 'right';
}

interface DatasetRow {
  id: string;
  cells: { columnId: string; value: string | number }[];
  accessTier?: AccessLevel;         // override per-row if needed
}
```

### `mod.marketOverview` (NEW — PRD §15)

```ts
export interface MarketOverviewModule extends ModuleBase {
  type: 'marketOverview';
  insightLine: string;
  narrativeSections: { h3: string; body: string }[];   // short paragraphs
  visualAnchor: ChartModule | KeyStatRef | InfographicRef;
  analystNote?: string;
  ctaTrigger: 'sample' | 'analyst';
}

interface KeyStatRef { kind: 'key-stat'; statId: string; }
interface InfographicRef { kind: 'infographic'; imageUrl: string; alt: string; caption: string; }
```

---

## Other modules (extended from v1)

`DefinitionsModule` adds `inScope?: string[] · excludedScope?: string[]` per term (PRD §16).
`TaxonomyModule` adds `desktopLayout: 'left-rail-tree' · mobileLayout: 'accordion-tree'` (PRD §17).
`EcosystemModule` adds tabs `'cold-chain' | 'cold-storage' | 'cold-transport' | 'associations' | 'certifications'` (PRD §18).
`MatrixModule` (player comparison) adds per-row competitor card fields per PRD §29.
`QuadrantModule` (SWOT) adds `topNVisible: 3 · expandable: true` (PRD §25).
`CardGridModule` (drivers) adds `impactLevel: 'high' | 'medium' | 'low'` per card (PRD §26).
`FlowModule` (value chain) adds `marginCallouts · participantMapping (locked)` (PRD §27).
`IssueTableModule` adds `solutionField` mandatory (PRD §28).
`TimelineModule` (competitor) — KEEP V1 spec.
`NodesModule` (emerging tech) adds `adoptionStage` field (PRD §30).
`CardGridModule` (regulatory) variant adds `compliance` fields per PRD §31.
`MacroPanelModule` adds `buyerRelevanceLine` per indicator (PRD §33 writing rule).

### `mod.inlineCTA` (extends v1)

```ts
export interface InlineCTAModule extends ModuleBase {
  type: 'inlineCTA';
  variant:
    | 'sample-analyst'
    | 'sample-customization'
    | 'analyst-customization'
    | 'unlock-dataset'
    | 'unlock-forecast'
    | 'preview-toc'
    | 'get-report-access'
    | 'buy-now';
  headline?: string;
  body?: string;
  primaryCtaTrigger: LeadFormType;
  secondaryCtaTrigger?: LeadFormType;
}
```

CTA labels (PRD §45) — recipe-locked, not data-driven:

| variant | primary | secondary |
|---|---|---|
| `sample-analyst` | Download Sample Report | Talk to Analyst |
| `sample-customization` | Download Sample Report | Get Customized Report |
| `analyst-customization` | Talk to Analyst | Get Customized Report |
| `unlock-dataset` | Unlock Full Dataset | Talk to Analyst |
| `unlock-forecast` | Unlock Forecast Data | Talk to Analyst |
| `preview-toc` | Preview Full TOC | Download Sample Report |
| `get-report-access` | Get Report Access | Talk to Analyst |
| `buy-now` | Buy Now | Get Customized Report |

---

## Lead Forms (PRD §46)

```ts
export type LeadFormType = 'sample' | 'dataset-unlock' | 'analyst-call' | 'customization';

export interface LeadFormDefinition {
  type: LeadFormType;
  visibleFields: LeadFormField[];
  hiddenContext: HiddenContextField[];
  submitEndpoint: string;
  successMessage: string;
  successCta?: { label: string; href: string };
  validationSchema: 'sample' | 'dataset' | 'analyst' | 'customization';   // zod schema name
}

interface LeadFormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'date' | 'datetime';
  required: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  helpText?: string;
}

interface HiddenContextField {
  name: string;
  source: 'report' | 'cta-location' | 'utm' | 'session' | 'meter';
  resolverKey: string;             // e.g. `report.product_code`, `utm.utm_source`
}

export type LeadFormContextMap = Record<LeadFormType, LeadFormDefinition>;
```

---

## Analytics (PRD §47)

```ts
export type AnalyticsEventType =
  | 'product_page_view'
  | 'hero_chart_interaction'
  | 'stat_card_click'
  | 'chart_filter_change'
  | 'dataset_preview_click'
  | 'dataset_unlock_click'
  | 'info_wall_triggered'
  | 'lead_wall_triggered'
  | 'paywall_triggered'
  | 'sample_cta_click'
  | 'analyst_cta_click'
  | 'customization_cta_click'
  | 'form_start'
  | 'form_submit'
  | 'toc_expand'
  | 'faq_expand'
  | 'section_nav_click'
  | 'related_report_click'
  | 'scroll_depth';

export interface AnalyticsContext {
  reportTitle: string;
  productCode: string;
  industry: string;
  region: string;
  reportType: string;
  variant: string;                 // 'editorial-A' etc.
  defaultProps: Record<string, string | number>;
}

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  props: {
    section_name?: string;
    chart_id?: string;
    cta_location?: string;
    access_level?: AccessLevel;
    user_status?: 'anonymous' | 'lead' | 'logged-in' | 'paid';
    interaction_count?: number;
    scroll_pct?: number;
    [key: string]: unknown;
  };
}
```

---

## GEO/AI extraction (PRD §43)

```ts
export interface ReportFacts {
  market: string;                  // "Australia Cold Chain Market"
  marketSize: string;              // "AUD 6,547.8 Mn, 2022"
  forecast: string;                // "AUD 10,705.0 Mn, 2027"
  cagr: string;                    // "10.03%, 2022-2027"
  segments: string[];              // top 5 names
  reportType: string;              // "Market Intelligence Report"
}

export interface AnswerBlocks {
  marketSize: string;              // direct sentence answer
  forecastValue: string;
  cagr: string;
  segmentsCovered: string;
  companiesCovered: string;
  growthDrivers: string;
  keyChallenges: string;
  reportIncludes: string;
  methodologyUsed: string;
  whoShouldBuy: string;            // PRD bonus
}
```

Both render as visible HTML (NOT only meta/head). Crawlable + AI-extractable.

---

## Schema.org JSON-LD (PRD §44)

```ts
export interface SchemaMeta {
  organization: OrganizationSchema;     // Ken Research entity
  webPage: WebPageSchema;
  breadcrumbList: BreadcrumbListSchema;
  product: ProductSchema;               // report as product (no price)
  creativeWork: CreativeWorkSchema;     // CreativeWork or Report
  dataset?: DatasetSchema;              // primary dataset (market size)
  faqPage: FAQPageSchema;
  paywalledElements: PaywalledElement[];   // CSS selectors
}

interface PaywalledElement {
  cssSelector: string;             // e.g. ".kr-paywall-chart"
  isAccessibleForFree: false;
}
```

`SchemaInjector` component renders all 8 as `<script type="application/ld+json">` server-side.

---

## TOC (PRD §35)

```ts
export interface TocEntry {
  id: string;                      // anchor target
  chapterNumber: number;
  title: string;
  subItems?: { id: string; title: string }[];
  pageRef?: number;
  access: AccessLevel;             // 'public' shows; 'lead-gated' blurs subsections
  showInNavigation: boolean;
}
```

TOC layers (PRD §35):
- Public: major chapters, limited subsections
- Lead-gated: full TOC after form
- Paid: full report access

---

## Methodology (PRD §34)

```ts
export interface Methodology {
  approach: string;
  steps: ('secondary-research' | 'primary-research' | 'triangulation' | 'sanity-checking' | 'forecast-modeling' | 'analyst-validation')[];
  sampleSize?: number;
  geographies: string[];
  dataCollectionPeriod: string;
  sources: { type: 'primary' | 'secondary'; description: string }[];
  limitations: string[];
  respondentBreakdown?: { label: string; pct: number }[];
  forecastModelType?: string;
  modelAssumptionsAccess: AccessLevel;     // typically 'paid'
  sampleSizeAccess: AccessLevel;           // typically 'lead-gated'
}
```

---

## FAQ (PRD §36)

```ts
export interface FAQEntry {
  id: string;
  question: string;
  answer: string;
  category: 'market-size' | 'forecast' | 'cagr' | 'segments' | 'competitors' | 'coverage' | 'methodology' | 'customization' | 'delivery' | 'purchase';
  schemaEnabled: boolean;          // include in FAQPage schema
  displayOrder: number;
}
```

---

## Related Reports (PRD §37)

```ts
export interface RelatedReport {
  id: string;
  title: string;
  industry: string;
  region: string;
  pages: number;
  publishedDate: string;
  shortSummary: string;
  slug: string;
  matchStrategy:
    | 'same-market-adjacent-geo'
    | 'same-geo-adjacent-market'
    | 'same-industry'
    | 'same-buyer-use-case'
    | 'recently-published'
    | 'custom-research-alternative';
  thumbnailUrl?: string;
}
```

---

## Renderer dispatcher

```tsx
export function PDPModuleRenderer({ module }: { module: ModuleNode }) {
  return (
    <AccessLevelGate access={module.access} module={module}>
      {(() => {
        switch (module.type) {
          case 'definitions':       return <MarketDefinitionsBlock {...module} />;
          case 'taxonomy':          return <TaxonomyTree {...module} />;
          case 'ecosystem':         return <EcosystemTierGrid {...module} />;
          case 'chart':             return <ChartCard {...module} />;
          case 'matrix':            return <MatrixTable {...module} />;
          case 'quadrant':          return module.variant === 'swot'
                                      ? <SWOTQuadrant {...module} />
                                      : <MarketPositioningQuadrant {...module} />;
          case 'cardGrid':          return <CardGridSection {...module} />;
          case 'flow':              return <ValueChainStepper {...module} />;
          case 'issueTable':        return <ChallengesSolutionsTable {...module} />;
          case 'timeline':          return <CompetitorTimeline {...module} />;
          case 'nodes':             return <EmergingTechNodes {...module} />;
          case 'macroPanel':        return <MacroIndicatorPanel {...module} />;
          case 'marketOverview':    return <MarketOverviewModule {...module} />;
          case 'inlineCTA':         return <InlineCTASection {...module} />;
        }
      })()}
    </AccessLevelGate>
  );
}
```

---

## Renderer meta

```ts
export interface ReportMeta {
  variant: 'editorial-A' | 'editorial-B' | 'cinematic-dark';
  tier: 'standard' | 'premium' | 'enterprise';
  authRequired: boolean;
  schemaVersion: '2.0';
  meterDefaults: { perSession: 2 };
}
```

---

## Open contracts for tech-team

1. **Auth gating mechanism**: backend strips Tier-3 children pre-emit OR frontend checks session. Recommend backend strip + `access.level` flag in payload.
2. **Meter state**: client cookie + server sync on login. Counter key per `analyticsContext.productCode`.
3. **Form submit endpoint**: `/api/leads/{form-type}` — payload = visible fields + hidden context + form schema name.
4. **Analytics dispatch**: `dataLayer.push(event)` — Tag Manager handles GA4 + Mixpanel + Hubspot fanout.
5. **Schema injection**: server-rendered only. NEVER client-hydrate JSON-LD.
6. **`@ken-research/charts`** v0.1.5: install npm. License = Highcharts non-commercial fine for design/internal; verify commercial license needed for production.
7. **i18n / RTL**: V2 = English LTR only. Defer V3.
8. **CMS integration**: payload shape matches PRD §39 collections (Report Core / SEO / Section / Chart / Dataset / Competitor / FAQ / TOC). Backend reads CMS, transforms to `ReportDetailV2`.

---

## Schema versioning

Current: `2.0` (2026-05-06). Major bump from `1.0` (V1 schema).

Migration v1 → v2:
- `module.gated: true` → `module.access: { level: 'lead-gated', ... }`
- `marketHighlights: string[]` → split into `keyStats[]` (structured) + retained as `executiveSummary.paragraphs.marketOverview` (prose)
- `snapshotChart: ChartPayload` → `heroCockpit.tabs.marketSize.payload`
- Add: `intelligenceSnapshot · executiveSummary · reportScope · answerBlocks · reportFacts · schemaMeta · leadFormContexts · analyticsContext`
