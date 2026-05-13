// TODO: replace w/ real API schema — sync with GET /api/reports/:slug response
// Schema version: 2.0 (2026-05-06) — PRD-locked discriminated union
// Supersedes: SCHEMA-v1-archive.md (v1.0)

// ─────────────────────────────────────────────────────────────────────────────
// 1. ACCESS CONTROL (PRD §22)
// ─────────────────────────────────────────────────────────────────────────────

export type AccessLevel =
  | 'public'       // always visible
  | 'metered'      // 2 free interactions/session
  | 'lead-gated'   // form submission required
  | 'login-gated'  // auth required
  | 'paid'         // purchase required
  | 'hidden';      // not rendered

export interface AccessControl {
  level: AccessLevel;
  meterKey?: string;
  publicPreview?: {
    rows?: number;
    blurAfter?: number;
    summaryText?: string;
  };
  // Canonical: matches LeadFormType + HeroCta.trigger. 'analyst-call' (NOT 'analyst').
  ctaTrigger: 'sample' | 'analyst-call' | 'dataset-unlock' | 'customization' | 'login' | 'purchase';
  paywallSelector?: string;        // CSS class for schema.org marker
  schemaIsAccessibleForFree: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. PEOPLE
// ─────────────────────────────────────────────────────────────────────────────

export interface Author {
  id: string;
  name: string;
  role: string;
  bio?: string;
  portraitUrl?: string;
  linkedInUrl?: string;
  priorReports?: { id: string; title: string; slug: string }[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. HERO COCKPIT (PRD §9)
// ─────────────────────────────────────────────────────────────────────────────

export interface BreadcrumbCrumb {
  label: string;
  href: string;
}

export type LeadFormType = 'sample' | 'dataset-unlock' | 'analyst-call' | 'customization';

export interface HeroCta {
  label: string;                    // exact CTA label — recipe-locked
  variant: 'brand' | 'secondary' | 'ghost';
  trigger: LeadFormType | 'navigate' | 'unlock-meter';
  href?: string;
  formContext?: string;
}

export interface TrustStrip {
  authorId: string;
  lastUpdatedDisplay: string;
  shareTargets: ('linkedin' | 'twitter' | 'email' | 'copy-link')[];
}

export interface HeroMetadata {
  pages: number;
  productCode: string;
  baseYear: number;
  historicalPeriod: string;
  forecastPeriod: string;
  format: string;
  deliveryType: string;
}

export interface CompetitorPreviewPayload {
  logos: { name: string; logoUrl: string }[];
  miniMarketShare: ChartSeries;
  positioningTeaserUrl?: string;
  unlockCtaTrigger: LeadFormType;
}

export interface HeroTab<P> {
  label: string;
  payload: P;
  access: AccessControl;
  meterAfterInteraction?: number;
}

export interface HeroCockpit {
  breadcrumb: BreadcrumbCrumb[];
  badges: { label: string; theme: 'industry' | 'region' | 'report-type' | 'date' }[];
  h1: string;
  promise: string;
  proofBullets: string[];
  ctas: { primary: HeroCta; secondary: HeroCta };
  trustStrip: TrustStrip;
  metadata: HeroMetadata;
  heroImageUrl?: string;
  tabs: {
    marketSize: HeroTab<ChartModule>;
    forecast: HeroTab<ChartModule>;
    segmentation: HeroTab<ChartModule>;
    competitors: HeroTab<CompetitorPreviewPayload>;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. INTELLIGENCE SNAPSHOT (PRD §10)
// ─────────────────────────────────────────────────────────────────────────────

export type BuyerUseCase =
  | 'market-entry'
  | 'competitive-benchmarking'
  | 'investment-screening'
  | 'expansion-planning'
  | 'supply-chain-strategy'
  | 'procurement-planning'
  | 'product-strategy'
  | 'growth-decisions';

export interface ReportSnapshot {
  marketSize: { value: number; unit: string; year: number; sourceNote: string };
  forecast: { value: number; unit: string; year: number; cagr: number; period: string };
  segments: { primary: string[]; dominant?: string };
  majorCompanies: { logos: { name: string; logoUrl: string }[]; lockedFullCount?: number };
  buyerUseCases: BuyerUseCase[];
  availableOutputs: ('pdf' | 'charts' | 'tables' | 'sample' | 'analyst-call' | 'customization' | 'excel')[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. KEY STATS (PRD §12)
// ─────────────────────────────────────────────────────────────────────────────

export interface KeyStat {
  id: string;
  value: string;
  label: string;
  yearOrPeriod: string;
  tooltipDefinition: string;
  sourceNote: string;
  access: AccessControl;
  expandRelatedChartId?: string;
  unlockTrigger?: LeadFormType;
  trend?: 'up' | 'down' | 'flat';
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. EXECUTIVE SUMMARY (PRD §13)
// ─────────────────────────────────────────────────────────────────────────────

export interface TakeawayCard {
  id: string;
  icon: string;
  title: string;
  body: string;
  category: 'demand' | 'forecast' | 'segments' | 'competition' | 'methodology';
}

export interface ExecutiveSummary {
  insightLine: string;
  paragraphs: {
    marketOverview: string;
    growthDrivers: string;
    decisionUtility: string;
  };
  takeawayCards: TakeawayCard[];
  buyerUseCaseChips: BuyerUseCase[];
  ctaTrigger: 'sample' | 'analyst-call';
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. REPORT SCOPE (PRD §14)
// ─────────────────────────────────────────────────────────────────────────────

export interface ScopeItem {
  label: string;
  description?: string;
  badge?: 'included' | 'excluded' | 'optional';
}

export interface ReportScope {
  marketCoverage: ScopeItem[];
  geographyCoverage: ScopeItem[];
  segmentCoverage: ScopeItem[];
  competitorCoverage: ScopeItem[];
  timeCoverage: { baseYear: number; historical: string; forecast: string };
  methodologyCoverage: ScopeItem[];
  deliverables: ScopeItem[];
  customizationOptions: ScopeItem[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. MODULE BASE + UNION (PRD §8)
// ─────────────────────────────────────────────────────────────────────────────

interface ModuleBase {
  id: string;
  type: string;
  tier: 1 | 2 | 3;
  priority: number;
  groupKey?: string;
  label?: string;
  heading?: string;
  subheading?: string;
  source?: string;
  background?: 'white' | 'warm-300' | 'black';
  access: AccessControl;              // CHANGED from v1 — was `gated?: boolean`
  analyticsId?: string;
}

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
  | MarketOverviewModule;             // NEW (PRD §15)

// ─────────────────────────────────────────────────────────────────────────────
// 9. CHART MODULE (PRD §20-21) — 8-zone + dataset preview
// ─────────────────────────────────────────────────────────────────────────────

export interface ChartControl {
  id: string;
  type: 'toggle' | 'tab' | 'select' | 'date-range';
  label: string;
  options?: { label: string; value: string }[];
  defaultValue?: string;
  accessControl?: AccessControl;
}

export interface AxisSpec {
  label?: string;
  unit?: string;
  format?: 'number' | 'currency' | 'percent' | 'year' | 'category';
  values?: (string | number)[];
  ticks?: number[];
}

export interface ChartSeries {
  id: string;
  name: string;
  data: { x: string | number; y: number; label?: string }[];
  type?: 'bar' | 'line' | 'area';
  color?: 'primary' | 'accent' | 'neutral' | 'positive' | 'warning';
  isProjected?: boolean;
  dashed?: boolean;
}

export interface DatasetColumn {
  id: string;
  label: string;
  format: 'text' | 'number' | 'percent' | 'currency' | 'year';
  align?: 'left' | 'center' | 'right';
}

export interface DatasetRow {
  id: string;
  cells: { columnId: string; value: string | number }[];
  accessTier?: AccessLevel;
}

export interface DatasetPreview {
  publicRows: number;
  leadRows: number;
  fullRowCount: number;
  columns: DatasetColumn[];
  rows: DatasetRow[];
  exportEnabled: { sample: boolean; full: boolean };
  lastUpdated: string;
  sourceNote: string;
  methodologyNote?: string;
}

export interface ChartModule extends ModuleBase {
  type: 'chart';
  chartType:
    | 'area' | 'line' | 'bar' | 'column' | 'pie' | 'donut'
    | 'stacked-bar' | 'multi-series-line' | 'multi-axis-line'
    | 'historical-projected-area' | 'horizontal-bar'
    | 'bubble' | 'heatmap' | 'map' | 'scatter'
    | 'combo'                         // retained for v1 chart compat
    | 'gauge';                        // radial bar approximation
  zones: {
    eyebrow?: string;
    title: string;
    insightLine?: string;
    controls?: ChartControl[];
    sourceNote: string;
    accessState: AccessControl;
    cta?: { label: string; trigger: LeadFormType };
  };
  series: ChartSeries[];
  xAxis?: AxisSpec;
  yAxis?: AxisSpec;
  unit?: string;
  yearRange?: [number, number];
  highlight?: { value: string; description: string };
  datasetPreview: DatasetPreview;
  layout?: 'default' | 'wide' | 'compact';
  staticImageFallback?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. MARKET OVERVIEW (PRD §15) — NEW
// ─────────────────────────────────────────────────────────────────────────────

interface KeyStatRef { kind: 'key-stat'; statId: string }
interface InfographicRef { kind: 'infographic'; imageUrl: string; alt: string; caption: string }

export interface MarketOverviewModule extends ModuleBase {
  type: 'marketOverview';
  insightLine: string;
  narrativeSections: { h3: string; body: string }[];
  visualAnchor: ChartModule | KeyStatRef | InfographicRef;
  analystNote?: string;
  ctaTrigger: 'sample' | 'analyst-call';
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. OTHER MODULES (extended from v1)
// ─────────────────────────────────────────────────────────────────────────────

export interface DefinitionsModule extends ModuleBase {
  type: 'definitions';
  group: 'key' | 'fundamental';
  terms: {
    term: string;
    body: string;
    icon?: string;
    inScope?: string[];
    excludedScope?: string[];
  }[];
}

export interface TaxonomyNode {
  label: string;
  children?: TaxonomyNode[];
}

export interface TaxonomyModule extends ModuleBase {
  type: 'taxonomy';
  root: string;
  branches: TaxonomyNode[];
  desktopLayout?: 'left-rail-tree';
  mobileLayout?: 'accordion-tree';
}

export interface EcosystemTier {
  label: string;
  count: number;
  threshold?: string;
  logos: { name: string; logoUrl: string; href?: string }[];
  badge?: string;
}

export interface EcosystemModule extends ModuleBase {
  type: 'ecosystem';
  scope: 'overall' | 'sub-market';
  subMarketLabel?: string;
  tiers: EcosystemTier[];
  tabVariant?: 'cold-chain' | 'cold-storage' | 'cold-transport' | 'associations' | 'certifications';
}

export interface MatrixColumn {
  id: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  format?: 'text' | 'number' | 'percent' | 'currency' | 'badge' | 'logo' | 'rating';
  width?: 'auto' | 'fixed';
}

export interface MatrixRow {
  id: string;
  cells: { columnId: string; value: string | number; badge?: string; tooltip?: string }[];
  emphasis?: boolean;
}

export interface MatrixModule extends ModuleBase {
  type: 'matrix';
  variant: 'comparison' | 'end-user' | 'sector-x-attribute';
  columns: MatrixColumn[];
  rows: MatrixRow[];
  stickyFirstColumn?: boolean;
  paginate?: { rowsPerPage: number };
}

export interface SWOTQuadrant {
  type: 'strength' | 'weakness' | 'opportunity' | 'threat';
  bullets: string[];
  analystNote?: string;
}

export interface PositioningPoint {
  label: string;
  x: number;
  y: number;
  logoUrl?: string;
  emphasis?: boolean;
}

export interface QuadrantModule extends ModuleBase {
  type: 'quadrant';
  variant: 'swot' | 'positioning';
  axes?: { x: string; y: string };
  quadrants?: SWOTQuadrant[];
  points?: PositioningPoint[];
  opportunityZone?: { label: string; xRange: [number, number]; yRange: [number, number] };
  topNVisible?: number;
  expandable?: boolean;
}

export interface GridCard {
  id: string;
  icon?: string;
  title: string;
  body: string;
  accent?: 'purple' | 'periwinkle' | 'perano' | 'coral' | 'neutral';
  impactLevel?: 'high' | 'medium' | 'low';
  relatedSegment?: string;
  supportingData?: string;
  compliance?: {
    authority: string;
    governs: string;
    impacted: string;
    relevance: string;
    buyerImplication: string;
  };
}

export interface CardGridModule extends ModuleBase {
  type: 'cardGrid';
  variant: 'drivers' | 'trends' | 'regulatory' | 'generic';
  cols: 2 | 3 | 4;
  cards: GridCard[];
}

export interface FlowStep {
  id: string;
  label: string;
  body?: string;
  icon?: string;
  metric?: { label: string; value: string };
}

export interface FlowAnnotation {
  betweenStepIds: [string, string];
  text: string;
}

export interface FlowModule extends ModuleBase {
  type: 'flow';
  variant: 'value-chain' | 'methodology';
  orientation: 'horizontal' | 'vertical';
  steps: FlowStep[];
  annotations?: FlowAnnotation[];
  marginCallouts?: { stepId: string; text: string }[];
}

export interface IssueRow {
  id: string;
  problem: string;
  solution: string;
  severity?: 'low' | 'medium' | 'high';
  icon?: string;
  whyItMatters?: string;
  impact?: string;
  urgency?: 'low' | 'medium' | 'high';
  relatedSegment?: string;
}

export interface IssueTableModule extends ModuleBase {
  type: 'issueTable';
  rows: IssueRow[];
}

export interface TimelineEntity {
  id: string;
  name: string;
  logoUrl?: string;
  events: { year: number; label: string; emphasis?: boolean }[];
}

export interface TimelineModule extends ModuleBase {
  type: 'timeline';
  variant: 'company-history' | 'event-sequence';
  range: [number, number];
  entities: TimelineEntity[];
}

export interface NodeItem {
  id: string;
  label: string;
  body?: string;
  icon?: string;
  exampleCompanies?: string[];
  adoptionStage?: 'emerging' | 'growing' | 'mature';
}

export interface NodesModule extends ModuleBase {
  type: 'nodes';
  variant: 'hub-spoke' | 'constellation';
  centerLabel?: string;
  nodes: NodeItem[];
}

export type MacroSubPanel =
  | { kind: 'chart'; chart: ChartModule }
  | { kind: 'kpi'; label: string; value: string; sublabel?: string; trend?: 'up' | 'down' | 'flat'; buyerRelevanceLine?: string }
  | { kind: 'map'; mapType: 'country' | 'region'; markers: { name: string; lat: number; lng: number; label?: string }[] };

export interface MacroPanelModule extends ModuleBase {
  type: 'macroPanel';
  panels: MacroSubPanel[];
}

// InlineCTA — 8 variants (PRD §45 — recipe-locked labels, NOT data-driven)
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

// CTA label map (recipe-locked — read-only reference, not runtime data):
// sample-analyst        → "Download Sample Report" / "Talk to Analyst"
// sample-customization  → "Download Sample Report" / "Get Customized Report"
// analyst-customization → "Talk to Analyst" / "Get Customized Report"
// unlock-dataset        → "Unlock Full Dataset" / "Talk to Analyst"
// unlock-forecast       → "Unlock Forecast Data" / "Talk to Analyst"
// preview-toc           → "Preview Full TOC" / "Download Sample Report"
// get-report-access     → "Get Report Access" / "Talk to Analyst"
// buy-now               → "Buy Now" / "Get Customized Report"
// NO price language anywhere.

// ─────────────────────────────────────────────────────────────────────────────
// 12. LEAD FORMS (PRD §46)
// ─────────────────────────────────────────────────────────────────────────────

export interface LeadFormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'date' | 'datetime';
  required: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  helpText?: string;
}

export interface HiddenContextField {
  name: string;
  source: 'report' | 'cta-location' | 'utm' | 'session' | 'meter';
  resolverKey: string;
}

export interface LeadFormDefinition {
  type: LeadFormType;
  visibleFields: LeadFormField[];
  hiddenContext: HiddenContextField[];
  submitEndpoint: string;
  successMessage: string;
  successCta?: { label: string; href: string };
  validationSchema: 'sample' | 'dataset' | 'analyst' | 'customization';
}

export type LeadFormContextMap = Record<LeadFormType, LeadFormDefinition>;

// ─────────────────────────────────────────────────────────────────────────────
// 13. ANALYTICS (PRD §47)
// ─────────────────────────────────────────────────────────────────────────────

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
  | 'scroll_depth'
  | 'section_view'
  | 'use_case_filter';

export interface AnalyticsContext {
  reportTitle: string;
  productCode: string;
  industry: string;
  region: string;
  reportType: string;
  variant: string;
  reportSlug: string;
  reportId: string;
  accessTier: 0 | 1 | 2 | 3 | 4;
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

// ─────────────────────────────────────────────────────────────────────────────
// 14. GEO/AI EXTRACTION (PRD §43)
// ─────────────────────────────────────────────────────────────────────────────

export interface ReportFacts {
  market: string;
  marketSize: string;
  forecast: string;
  cagr: string;
  segments: string[];
  reportType: string;
}

export interface AnswerBlocks {
  marketSize: string;
  forecastValue: string;
  cagr: string;
  segmentsCovered: string;
  companiesCovered: string;
  growthDrivers: string;
  keyChallenges: string;
  reportIncludes: string;
  methodologyUsed: string;
  whoShouldBuy: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 15. SCHEMA.ORG JSON-LD (PRD §44)
// ─────────────────────────────────────────────────────────────────────────────

export interface OrganizationSchema {
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}

export interface WebSiteSchema {
  '@type': 'WebSite';
  name: string;
  url: string;
}

export interface WebPageSchema {
  '@type': 'WebPage';
  url: string;
  name: string;
  description: string;
  inLanguage: string;
  isPartOf?: { '@type': 'WebSite'; url: string };
}

export interface BreadcrumbListSchema {
  '@type': 'BreadcrumbList';
  itemListElement: {
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }[];
}

export interface ProductSchema {
  '@type': 'Product';
  name: string;
  sku: string;
  brand: { '@type': 'Brand'; name: string };
  description: string;
  category: string;
  // NO offers.price — Ken policy: never expose product price in schema
}

export interface CreativeWorkSchema {
  '@type': 'CreativeWork' | 'Report';
  name: string;
  headline: string;
  description: string;
  author: { '@type': 'Person'; name: string }[];
  publisher: { '@type': 'Organization'; name: string };
  datePublished: string;
  inLanguage: string;
  keywords?: string[];
}

export interface DatasetSchema {
  '@type': 'Dataset';
  name: string;
  description: string;
  creator: { '@type': 'Organization'; name: string };
  temporalCoverage: string;
  spatialCoverage: string;
  variableMeasured: string;
  measurementTechnique?: string;
}

export interface FAQPageSchema {
  '@type': 'FAQPage';
  mainEntity: {
    '@type': 'Question';
    name: string;
    acceptedAnswer: { '@type': 'Answer'; text: string };
  }[];
}

export interface PaywalledElement {
  cssSelector: string;
  isAccessibleForFree: false;
}

export interface SchemaMeta {
  organization: OrganizationSchema;
  webPage: WebPageSchema;
  breadcrumbList: BreadcrumbListSchema;
  product: ProductSchema;
  creativeWork: CreativeWorkSchema;
  dataset?: DatasetSchema;
  faqPage: FAQPageSchema;
  paywalledElements: PaywalledElement[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 16. TOC (PRD §35)
// ─────────────────────────────────────────────────────────────────────────────

export interface TocEntry {
  id: string;
  chapterNumber: number;
  title: string;
  subItems?: { id: string; title: string }[];
  pageRef?: number;
  access: AccessLevel;
  showInNavigation: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// 17. METHODOLOGY (PRD §34)
// ─────────────────────────────────────────────────────────────────────────────

export interface Methodology {
  approach: string;
  steps: (
    | 'secondary-research'
    | 'primary-research'
    | 'triangulation'
    | 'sanity-checking'
    | 'forecast-modeling'
    | 'analyst-validation'
  )[];
  sampleSize?: number;
  geographies: string[];
  dataCollectionPeriod: string;
  sources: { type: 'primary' | 'secondary'; description: string }[];
  limitations: string[];
  respondentBreakdown?: { label: string; pct: number }[];
  forecastModelType?: string;
  modelAssumptionsAccess: AccessLevel;
  sampleSizeAccess: AccessLevel;
}

// ─────────────────────────────────────────────────────────────────────────────
// 18. FAQ (PRD §36)
// ─────────────────────────────────────────────────────────────────────────────

export interface FAQEntry {
  id: string;
  question: string;
  answer: string;
  category:
    | 'market-size'
    | 'forecast'
    | 'cagr'
    | 'segments'
    | 'competitors'
    | 'coverage'
    | 'methodology'
    | 'customization'
    | 'delivery'
    | 'purchase';
  schemaEnabled: boolean;
  displayOrder: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// 19. RELATED REPORTS (PRD §37)
// ─────────────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────
// 20. RENDERER META
// ─────────────────────────────────────────────────────────────────────────────

export interface ReportMeta {
  variant: 'editorial-A' | 'editorial-B' | 'cinematic-dark';
  tier: 'standard' | 'premium' | 'enterprise';
  authRequired: boolean;
  schemaVersion: '2.0';
  meterDefaults: { perSession: 2 };
}

// ─────────────────────────────────────────────────────────────────────────────
// 21. TOP-LEVEL (PRD §39)
// ─────────────────────────────────────────────────────────────────────────────

export interface ReportDetailV2 {
  // Core metadata
  id: string;
  product_code: string;
  slug: string;
  title: string;
  short_title?: string;
  market_name: string;
  industry: string;
  sub_industry?: string;
  region: string;
  country?: string;
  report_type: 'market-intelligence' | 'sector-deep-dive' | 'survey' | 'custom';
  pages: number;
  chart_count: number;
  segment_count: number;
  ecosystem_map_count?: number;
  published_date: string;
  base_year: number;
  historical_period: string;
  forecast_period: string;
  currency: string;
  unit: string;
  format: 'pdf' | 'pdf+excel' | 'html-interactive';
  delivery_type: 'instant' | 'lead-confirmed' | 'analyst-delivered';
  status: 'draft' | 'review' | 'approved' | 'published' | 'archived';
  refresh_date?: string;
  last_updated?: string;

  // People
  authors: Author[];

  // Hero cockpit (PRD §9)
  heroCockpit: HeroCockpit;

  // Premium product card (PRD §10)
  intelligenceSnapshot: ReportSnapshot;

  // Stat tiles (PRD §12)
  keyStats: KeyStat[];

  // Executive summary (PRD §13)
  executiveSummary: ExecutiveSummary;

  // Report scope (PRD §14)
  reportScope: ReportScope;

  // TOC (PRD §35)
  toc: TocEntry[];

  // Modules (PRD §8 ordered)
  modules: ModuleNode[];

  // FAQ (PRD §36)
  faq: FAQEntry[];

  // Related reports (PRD §37)
  related: RelatedReport[];

  // Methodology (PRD §34)
  methodology: Methodology;

  // GEO/AI extraction (PRD §43)
  reportFacts: ReportFacts;
  answerBlocks: AnswerBlocks;

  // Schema.org JSON-LD (PRD §44)
  schemaMeta: SchemaMeta;

  // Lead form context payload (PRD §46)
  leadFormContexts: LeadFormContextMap;

  // Analytics context (PRD §47)
  analyticsContext: AnalyticsContext;

  // Renderer meta
  meta: ReportMeta;
}

// ─────────────────────────────────────────────────────────────────────────────
// LEGACY COMPAT — keep v1 name for any import not yet updated
// ─────────────────────────────────────────────────────────────────────────────
/** @deprecated — use ReportDetailV2. Kept for gradual migration. */
export type ReportDetailHeavy = ReportDetailV2;
