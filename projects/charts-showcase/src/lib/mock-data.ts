/**
 * charts-showcase · Mock data
 *
 * WHY  · Centralised demo data for all chart + table showcase variants.
 *        Sane educational values — not production-realistic.
 *
 * HOW  · Direct exports. Each showcase demo imports named constants here.
 *        No external data file or API calls.
 */

// ─── KenColumnChart ───────────────────────────────────────────────

/** 12 months of revenue · low/mid/high variants */
export const COLUMN_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const COLUMN_DATA_MID = [420, 390, 445, 510, 480, 560, 530, 580, 610, 575, 640, 720];
export const COLUMN_DATA_LOW = [200, 185, 210, 230, 215, 250, 240, 265, 280, 260, 295, 330];
export const COLUMN_DATA_HIGH = [840, 780, 890, 1020, 960, 1120, 1060, 1160, 1220, 1150, 1280, 1440];

/** With projection marker at index 6 */
export const COLUMN_LABELS_DECADE = ['2017', '2018', '2019', '2020', '2021', '2022', '2023F', '2024F', '2025F', '2026F', '2027F'];
export const COLUMN_DATA_DECADE = [1684, 1846, 2024, 2219, 2431, 2648, 2939, 3262, 3621, 4019, 4461];
export const COLUMN_PROJECTION_START = 6;

// ─── KenBarChart ──────────────────────────────────────────────────

/** 6 regions · horizontal bar */
export const BAR_LABELS = ['Sydney Metro', 'Melbourne CBD', 'Brisbane', 'Perth', 'Adelaide', 'Darwin'];
export const BAR_DATA = [35.0, 27.5, 15.5, 11.0, 7.5, 3.5];
export const BAR_UNIT = '%';

// ─── KenDualColumnChart ───────────────────────────────────────────

export const DUAL_LABELS = ['2019', '2020', '2021', '2022', '2023', '2024F', '2025F'];
export const DUAL_SERIES_A = { name: 'Cold Storage', data: [1680, 1842, 2022, 2648, 2939, 3262, 3621] };
export const DUAL_SERIES_B = { name: 'Cold Transport', data: [2540, 2780, 3040, 3900, 4267, 4668, 5107] };

// ─── KenBubbleChart ───────────────────────────────────────────────

/** 8 entities · x = revenue AUD Mn · y = growth % · z = capacity 000s pallets */
export const BUBBLE_DATA = [
  { name: 'Alpha 3PL',      x: 850,  y: 8.2,  z: 280 },
  { name: 'Beta Logistics',  x: 720,  y: 6.8,  z: 210 },
  { name: 'Gamma Cold',     x: 480,  y: 11.4, z: 180 },
  { name: 'Delta Reefer',   x: 210,  y: 18.2, z: 95  },
  { name: 'Epsilon Post',   x: 380,  y: 5.1,  z: 140 },
  { name: 'Zeta Ocean',     x: 160,  y: 7.4,  z: 58  },
  { name: 'Eta Supply',     x: 140,  y: 4.8,  z: 52  },
  { name: 'Theta DTC',      x: 120,  y: 9.1,  z: 44  },
];

// ─── KenDonutChart ────────────────────────────────────────────────

export const DONUT_DATA = [
  { name: 'Meat & Seafood', value: 32 },
  { name: 'Dairy',          value: 24 },
  { name: 'Pharma',         value: 18 },
  { name: 'Retail / QSR',  value: 15 },
  { name: 'Other',          value: 11 },
];

// ─── KenMultiLineChart ────────────────────────────────────────────

export const LINE_LABELS = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025F', '2026F', '2027F', '2028F', '2029F'];

export const LINE_SERIES = [
  { name: 'GDP Growth %',          data: [2.8, 1.9, -3.7, 4.8, 3.7, 2.0, 2.8, 2.6, 2.9, 3.1, 3.0, 3.2] },
  { name: 'Cold-chain demand %',   data: [9.1, 9.1, 9.1, 9.1, 9.1, 10.3, 10.3, 10.3, 10.3, 10.3, 10.5, 10.7] },
  { name: 'CPI Inflation %',       data: [1.9, 1.6, 0.9, 3.5, 7.8, 5.4, 3.4, 2.8, 2.5, 2.4, 2.3, 2.2] },
  { name: 'Disposable income %',   data: [1.2, 1.5, -2.1, 3.2, 2.4, 1.8, 2.1, 2.6, 2.9, 3.0, 3.1, 3.2] },
  { name: 'Export growth %',       data: [4.2, 3.8, -5.1, 7.2, 5.3, 4.1, 5.0, 5.5, 5.8, 6.1, 6.2, 6.4] },
  { name: 'FX AUD/USD × 10',      data: [7.8, 7.1, 6.8, 7.5, 7.0, 6.7, 6.6, 6.5, 6.5, 6.6, 6.7, 6.8] },
];

// ─── KenScenarioFanChart ──────────────────────────────────────────

export const SCENARIO_LABELS = ['2022', '2023', '2024', '2025', '2026F', '2027F'];
export const SCENARIO_BASE   = [6548, 7223, 7965, 8786, 9690, 10705];
export const SCENARIO_BEAR   = [6548, 7013, 7511, 8044, 8611, 9218];
export const SCENARIO_BULL   = [6548, 7451, 8479, 9649, 10981, 12497];

// ─── PropertyTable ────────────────────────────────────────────────

import type { PlayerProperty, PlayerColumn } from '@kenresearch/design-system/charts';

export const PROPERTY_PROPS: PlayerProperty[] = [
  { property: 'HQ',               sublabel: 'Primary base' },
  { property: 'Founded' },
  { property: 'Fleet size',       sublabel: 'Reefer units est.' },
  { property: 'Temp range' },
  { property: 'Pan-AU coverage' },
  { property: 'Tech stack',       sublabel: 'Key platform' },
  { property: 'Revenue band',     sublabel: 'AUD FY24 est.' },
  { property: 'Specialisation' },
];

export const PROPERTY_PLAYERS: PlayerColumn[] = [
  {
    name: 'Alpha 3PL',
    descriptor: 'Private · Tier 1',
    values: ['Melbourne, VIC', '1956', '~1,800 units', '-25°C to +18°C', 'All states', 'SAP TM', 'AUD 700–950 Mn', 'Full-spectrum'],
  },
  {
    name: 'Beta Cold',
    descriptor: 'ASX listed',
    values: ['Sydney, NSW', '1978', '~1,200 units', '-20°C to +15°C', 'NSW · VIC · QLD', 'Proprietary WMS', 'AUD 550–720 Mn', 'Food & Beverage'],
  },
  {
    name: 'Gamma Reefer',
    descriptor: 'NYSE:GAM',
    values: ['Brisbane, QLD', '1903', '~900 units', '-30°C to +10°C', 'QLD · NSW · VIC', 'Automated OS', 'AUD 420–530 Mn', 'Frozen + chilled'],
  },
  {
    name: 'Delta Pharma',
    descriptor: 'Private · EU-HQ',
    gated: true,
    values: ['Perth, WA', '2012', '~600 units', '-25°C to +4°C', 'WA · SA (expanding)', 'IoT-native platform', 'AUD 160–220 Mn', 'Pharma GDP'],
  },
  {
    name: 'Epsilon DTC',
    descriptor: 'Govt enterprise',
    gated: true,
    values: ['Melbourne, VIC', '1809', '~750 units', '+2°C to +8°C', 'All states', 'StarTrack Cold', 'AUD 310–390 Mn', 'Parcel pharma'],
  },
];

// ─── KenTreemap ───────────────────────────────────────────────────

// TreemapNode is still exported as alias from DS · TreemapCellData is the canonical new name
import type { TreemapCellData } from '@kenresearch/design-system/charts';

/** Cold-chain operator estimated capacity · pallets · 2024 estimates */
// TODO: replace w/ real API: GET /api/v1/market/ecosystem/capacity
export const TREEMAP_DATA: TreemapCellData[] = [
  { id: 'lineage',    name: 'Lineage',          value: 590000, tier: 1, subText: '590,000 pallets', metaText: '12.5% share' },
  { id: 'americold',  name: 'Americold',         value: 226000, tier: 1, subText: '226,000 pallets', metaText: '4.8% share' },
  { id: 'lineage_au', name: 'Lineage AU',        value: 145000, tier: 2, subText: '145,000 pallets', metaText: '3.1% share' },
  { id: 'swisslog',   name: 'Swisslog',          value: 98000,  tier: 2, subText: '98,000 pallets',  metaText: '2.1% share' },
  { id: 'linfox',     name: 'Linfox',            value: 82000,  tier: 2, subText: '82,000 pallets',  metaText: '1.7% share' },
  { id: 'cooltrans',  name: 'Cooltrans',         value: 61000,  tier: 2, subText: '61,000 pallets',  metaText: '1.3% share' },
  { id: 'metcash',    name: 'Metcash Cold',      value: 44000,  tier: 3, subText: '44,000 pallets',  metaText: '0.9% share' },
  { id: 'sigma',      name: 'Sigma Pharma',      value: 38000,  tier: 3, subText: '38,000 pallets',  metaText: '0.8% share' },
  { id: 'nz_cold',    name: 'NZ Cold Storage',   value: 29000,  tier: 3, subText: '29,000 pallets',  metaText: '0.6% share' },
  { id: 'other',      name: 'Other',             value: 22000,  tier: 3, subText: '22,000 pallets',  metaText: '0.5% share' },
];

// ─── KenHeatmap ───────────────────────────────────────────────────

import type { HeatmapCell } from '@kenresearch/design-system/charts';

export const HEATMAP_ROWS = ['Pharma', 'Food & Bev', 'Floral', 'Dairy', 'Meat & Seafood'];
export const HEATMAP_COLS = ['Storage', 'Transport', 'Last-mile', 'Cross-border'];

export const HEATMAP_CELLS: HeatmapCell[] = [
  { rowKey: 'Pharma',        colKey: 'Storage',      value: 9.2, starRating: 5 },
  { rowKey: 'Pharma',        colKey: 'Transport',    value: 8.8, starRating: 5 },
  { rowKey: 'Pharma',        colKey: 'Last-mile',    value: 7.1, starRating: 4 },
  { rowKey: 'Pharma',        colKey: 'Cross-border', value: 8.5, starRating: 5 },
  { rowKey: 'Food & Bev',    colKey: 'Storage',      value: 7.5, starRating: 4 },
  { rowKey: 'Food & Bev',    colKey: 'Transport',    value: 8.2, starRating: 4 },
  { rowKey: 'Food & Bev',    colKey: 'Last-mile',    value: 8.9, starRating: 5 },
  { rowKey: 'Food & Bev',    colKey: 'Cross-border', value: 6.4, starRating: 3 },
  { rowKey: 'Floral',        colKey: 'Storage',      value: 5.1, starRating: 3 },
  { rowKey: 'Floral',        colKey: 'Transport',    value: 4.8, starRating: 2 },
  { rowKey: 'Floral',        colKey: 'Last-mile',    value: 3.9, starRating: 2 },
  { rowKey: 'Dairy',         colKey: 'Storage',      value: 8.1, starRating: 4 },
  { rowKey: 'Dairy',         colKey: 'Transport',    value: 7.7, starRating: 4 },
  { rowKey: 'Dairy',         colKey: 'Last-mile',    value: 6.8, starRating: 3 },
  { rowKey: 'Dairy',         colKey: 'Cross-border', value: 5.5, starRating: 3 },
  { rowKey: 'Meat & Seafood', colKey: 'Storage',     value: 8.7, starRating: 5 },
  { rowKey: 'Meat & Seafood', colKey: 'Transport',   value: 7.9, starRating: 4 },
  { rowKey: 'Meat & Seafood', colKey: 'Cross-border', value: 7.3, starRating: 4 },
  // G.5 null semantics demo: null = no data (dashed cell) · 0 = zero value (faint tier)
  { rowKey: 'Floral',        colKey: 'Cross-border', value: null },  // null → dashed "—"
  { rowKey: 'Meat & Seafood', colKey: 'Last-mile',   value: 0 },    // 0 → faint tier (data exists)
];

// ─── KenKeywordScatter ────────────────────────────────────────────

import type { KeywordItem } from '@kenresearch/design-system/charts';

export const KEYWORD_DATA: KeywordItem[] = [
  { id: 'k1',  text: 'AI-Vision QC',      weight: 1.00 },
  { id: 'k2',  text: 'Reefer-EV Fleet',   weight: 0.88 },
  { id: 'k3',  text: 'Blockchain Track',  weight: 0.75 },
  { id: 'k4',  text: 'IoT Monitoring',    weight: 0.82 },
  { id: 'k5',  text: 'Pharma GDP',        weight: 0.90 },
  { id: 'k6',  text: 'Last-mile Cold',    weight: 0.70 },
  { id: 'k7',  text: 'Automation',        weight: 0.68 },
  { id: 'k8',  text: 'Dark Stores',       weight: 0.63 },
  { id: 'k9',  text: 'Micro-fulfilment',  weight: 0.58 },
  { id: 'k10', text: 'Carbon Credits',    weight: 0.50 },
  { id: 'k11', text: 'Cross-border',      weight: 0.55 },
  { id: 'k12', text: 'Drone Delivery',    weight: 0.45 },
  { id: 'k13', text: 'Gene Therapy',      weight: 0.42 },
  { id: 'k14', text: 'Solar Reefer',      weight: 0.48 },
  { id: 'k15', text: 'RFID Tags',         weight: 0.38 },
  { id: 'k16', text: 'NDC Build-out',     weight: 0.72 },
  { id: 'k17', text: 'Biosimilars',       weight: 0.35 },
  { id: 'k18', text: 'AgriFood Tech',     weight: 0.40 },
  { id: 'k19', text: 'mRNA Logistics',    weight: 0.80 },
  { id: 'k20', text: 'ESG Reporting',     weight: 0.30 },
  { id: 'k21', text: 'Pallet Pooling',    weight: 0.28 },
  { id: 'k22', text: 'Hydrogen Trucks',   weight: 0.52 },
  { id: 'k23', text: 'Smart Packaging',   weight: 0.34 },
  { id: 'k24', text: 'Digital Twin',      weight: 0.60 },
  { id: 'k25', text: 'Predictive Maint',  weight: 0.44 },
];

// ─── KenGanttTimeline ─────────────────────────────────────────────

import type { GanttEntry } from '@kenresearch/design-system/charts';

export const GANTT_PERIODS = ['FY25', 'FY26', 'FY27', 'FY28', 'FY29', 'FY30'] as const;

export const GANTT_ENTRIES: GanttEntry[] = [
  {
    id: 'lin-syd',
    entityName: 'Lineage Sydney NDC',
    phases: [
      { period: 'FY25', phase: 'planning' },
      { period: 'FY26', phase: 'build' },
      { period: 'FY27', phase: 'commissioning' },
      { period: 'FY28', phase: 'live' },
    ],
  },
  {
    id: 'amer-mel',
    entityName: 'Americold Melbourne',
    phases: [
      { period: 'FY25', phase: 'build' },
      { period: 'FY26', phase: 'commissioning' },
      { period: 'FY27', phase: 'live' },
      { period: 'FY28', phase: 'live' },
    ],
  },
  {
    id: 'linfox-bris',
    entityName: 'Linfox Brisbane Hub',
    phases: [
      { period: 'FY25', phase: 'planning' },
      { period: 'FY26', phase: 'planning' },
      { period: 'FY27', phase: 'build' },
      { period: 'FY28', phase: 'commissioning' },
      { period: 'FY29', phase: 'live' },
    ],
  },
  {
    id: 'cool-perth',
    entityName: 'Cooltrans Perth WA',
    phases: [
      { period: 'FY26', phase: 'planning' },
      { period: 'FY27', phase: 'build' },
      { period: 'FY28', phase: 'live' },
    ],
  },
  {
    id: 'sigma-darwin',
    entityName: 'Sigma Pharma Darwin',
    phases: [
      { period: 'FY27', phase: 'planning' },
      { period: 'FY28', phase: 'build' },
      { period: 'FY29', phase: 'commissioning' },
      { period: 'FY30', phase: 'live' },
    ],
  },
  {
    id: 'metcash-adl',
    entityName: 'Metcash Adelaide',
    phases: [
      { period: 'FY25', phase: 'completed' },
      { period: 'FY26', phase: 'live' },
      { period: 'FY27', phase: 'live' },
    ],
  },
  {
    id: 'new-entrant',
    entityName: 'New Entrant (TBD)',
    phases: [
      { period: 'FY28', phase: 'planning' },
      { period: 'FY29', phase: 'build' },
      { period: 'FY30', phase: 'commissioning' },
    ],
  },
];

// ─── KenWaterfallChart ────────────────────────────────────────────

/** Revenue bridge 2024 → 2025 · cold-chain AU market */
export const WATERFALL_REVENUE_BRIDGE = [
  { name: '2024 Revenue', value: 6548, isTotal: true },
  { name: 'New customers', value: 480 },
  { name: 'Volume growth', value: 320 },
  { name: 'Price increase', value: 220 },
  { name: 'Churn', value: -180 },
  { name: 'FX impact', value: -90 },
  { name: '2025 Revenue', value: 0, isTotal: true },
];

/** Cost breakdown variance FY23 → FY24 */
export const WATERFALL_COST_BREAKDOWN = [
  { name: 'FY23 OpEx', value: 4120, isTotal: true },
  { name: 'Labour +6%', value: 248 },
  { name: 'Fuel +11%', value: 185 },
  { name: 'Maintenance', value: 92 },
  { name: 'Tech savings', value: -140 },
  { name: 'Volume rebate', value: -75 },
  { name: 'FY24 OpEx', value: 0, isTotal: true },
];

/** Profit walk · contribution by division */
export const WATERFALL_PROFIT_WALK = [
  { name: 'FY24 EBIT', value: 312, isTotal: true },
  { name: 'Cold Storage', value: 145 },
  { name: 'Transport', value: 88 },
  { name: 'Last-mile', value: 62 },
  { name: 'Pharma', value: 34 },
  { name: 'Corporate overhead', value: -118 },
  { name: 'FY25 EBIT', value: 0, isTotal: true },
];

// ─── KenStackedBarChart ───────────────────────────────────────────

/** Cold-chain segment composition by state (% share) */
export const STACKED_BAR_LABELS = ['NSW', 'VIC', 'QLD', 'WA', 'SA'];

export const STACKED_BAR_SERIES_PCT = [
  { name: 'Storage',       data: [38, 41, 35, 32, 44] },
  { name: 'Transport',     data: [29, 27, 33, 31, 26] },
  { name: 'Last-mile',     data: [22, 21, 20, 24, 19] },
  { name: 'Cross-border',  data: [11, 11, 12, 13, 11] },
];

/** Absolute AUD Mn by segment */
export const STACKED_BAR_SERIES_ABS = [
  { name: 'Storage',       data: [820, 760, 540, 310, 195] },
  { name: 'Transport',     data: [625, 500, 510, 300, 115] },
  { name: 'Last-mile',     data: [475, 390, 310, 232, 84] },
  { name: 'Cross-border',  data: [237, 204, 185, 126, 49] },
];

// ─── KenSparklineChart ────────────────────────────────────────────

/** KPI sparkline grid · 4 metrics */
export const SPARKLINE_STORAGE_REVENUE = [4.2, 4.6, 4.9, 5.0, 5.4, 5.9];
export const SPARKLINE_TRANSPORT_REVENUE = [3.1, 3.0, 3.2, 3.5, 3.3, 3.4];
export const SPARKLINE_UTILISATION = [72, 74, 73, 78, 81, 84];
export const SPARKLINE_NPS = [42, 38, 45, 48, 51, 49];

// ─── KenRadarChart ────────────────────────────────────────────────

/** Competitor capability scoring · 6 axes · 3 operators */
export const RADAR_AXES = ['Capacity', 'Coverage', 'Technology', 'Service', 'Price', 'Sustainability'];

export const RADAR_SERIES = [
  { name: 'Lineage',    data: [88, 82, 74, 86, 62, 58] },
  { name: 'Americold',  data: [76, 90, 68, 78, 70, 52] },
  { name: 'Linfox',     data: [64, 72, 56, 82, 84, 74] },
];

/** Market readiness scoring · AU regions */
export const RADAR_AXES_MARKET = ['Market Size', 'Growth Rate', 'Infrastructure', 'Regulation', 'Competition', 'ESG Demand'];

export const RADAR_SERIES_MARKET = [
  { name: 'NSW / ACT', data: [92, 78, 85, 72, 68, 80] },
  { name: 'VIC',       data: [84, 82, 80, 75, 72, 76] },
  { name: 'QLD',       data: [68, 88, 64, 70, 58, 70] },
];

// ─── KenMatrixComparisonTable ────────────────────────────────────

import type { MatrixRow } from '@kenresearch/design-system/charts';

/** Provider feature matrix · 5 operators × 5 capabilities */
export const MATRIX_COLUMNS = [
  { label: 'Temp control',     subtitle: 'Multi-zone' },
  { label: 'GPS tracking',     subtitle: 'Real-time' },
  { label: 'Blockchain',       subtitle: 'Provenance' },
  { label: 'IoT sensors',      subtitle: 'In-transit' },
  { label: 'Carbon reporting', subtitle: 'Scope 1–3' },
];

export const MATRIX_ROWS: MatrixRow[] = [
  {
    rowLabel: 'Lineage Logistics',
    rowSubtitle: 'Pan-AU · 38 facilities',
    cells: [
      { accent: 'positive' },
      { accent: 'positive' },
      { accent: 'positive' },
      { accent: 'positive' },
      { value: 'Scope 1–2', accent: 'highlight' },
    ],
  },
  {
    rowLabel: 'Americold',
    rowSubtitle: 'AU/NZ operations',
    cells: [
      { accent: 'positive' },
      { accent: 'positive' },
      { accent: 'neutral' },
      { accent: 'positive' },
      { accent: 'negative' },
    ],
  },
  {
    rowLabel: 'Linfox Logistics',
    rowSubtitle: 'Transport-led',
    cells: [
      { accent: 'positive' },
      { accent: 'positive' },
      { accent: 'negative' },
      { value: 'Partial', accent: 'highlight' },
      { value: 'Scope 1', accent: 'highlight' },
    ],
  },
  {
    rowLabel: 'NewCold',
    rowSubtitle: 'Automated WA hub',
    cells: [
      { accent: 'positive' },
      { accent: 'positive' },
      { accent: 'positive' },
      { accent: 'positive' },
      { accent: 'positive' },
    ],
  },
  {
    rowLabel: 'Emergent Cold',
    rowSubtitle: 'Regional entrant',
    cells: [
      { value: 'Single-zone', accent: 'highlight' },
      { accent: 'neutral' },
      { accent: 'negative' },
      { accent: 'negative' },
      { accent: 'negative' },
    ],
  },
];

// ─── KenTimeSeriesTable ───────────────────────────────────────────

import type { TimeSeriesRow } from '@kenresearch/design-system/charts';

/** Regional revenue trends FY20–FY24 · AUD Mn */
export const TIME_SERIES_PERIODS = ['FY20', 'FY21', 'FY22', 'FY23', 'FY24'];

export const TIME_SERIES_ROWS: TimeSeriesRow[] = [
  { label: 'NSW / ACT',  sublabel: 'Cold Storage + Transport', values: [842, 921, 1038, 1164, 1296] },
  { label: 'Victoria',   sublabel: 'Cold Storage + Transport', values: [720, 789, 892, 1002, 1122] },
  { label: 'Queensland', sublabel: 'Cold Storage + Transport', values: [524, 578, 648, 724, 816] },
  { label: 'W. Australia', sublabel: 'Cold Storage + Transport', values: [398, 432, 484, 538, 606] },
  { label: 'S. Australia', sublabel: 'Cold Storage + Transport', values: [186, 202, 228, 256, 288] },
];

// ─── KenScorecardTable ────────────────────────────────────────────

import type { ScorecardRow } from '@kenresearch/design-system/charts';

/** Operator KPI scorecard · 5 operators × 4 KPIs */
export const SCORECARD_COLUMNS = [
  { label: 'Capacity util.', subtitle: '% of total' },
  { label: 'On-time %',      subtitle: 'FY24 avg' },
  { label: 'Cost / pallet',  subtitle: 'AUD · lower = better (inverted)' },
  { label: 'Customer NPS',   subtitle: '0–100 scale' },
];

export const SCORECARD_ROWS: ScorecardRow[] = [
  {
    rowLabel: 'Lineage Logistics',
    rowSubtitle: 'Pan-AU leader',
    scores: [{ value: 88 }, { value: 94 }, { value: 62 }, { value: 78 }],
  },
  {
    rowLabel: 'Americold',
    rowSubtitle: 'AU/NZ',
    scores: [{ value: 82 }, { value: 91 }, { value: 68 }, { value: 71 }],
  },
  {
    rowLabel: 'NewCold WA',
    rowSubtitle: 'Automated hub',
    scores: [{ value: 95 }, { value: 97 }, { value: 45 }, { value: 85 }],
  },
  {
    rowLabel: 'Linfox Logistics',
    rowSubtitle: 'Transport-led',
    scores: [{ value: 74 }, { value: 88 }, { value: 58 }, { value: 64 }],
  },
  {
    rowLabel: 'Emergent Cold',
    rowSubtitle: 'Regional entrant',
    scores: [{ value: 52 }, { value: 76 }, { value: 42 }, { value: 48 }],
  },
];

// ─── KenHierarchyTable ────────────────────────────────────────────

import type { HierarchyNode } from '@kenresearch/design-system/charts';

/** Cold-chain category breakdown · Revenue AUD Mn · YoY % · Margin % */
export const HIERARCHY_COLUMNS = [
  { label: 'Revenue AUD Mn', align: 'right' as const },
  { label: 'YoY %',          align: 'right' as const },
  { label: 'Margin %',       align: 'right' as const },
];

export const HIERARCHY_ROWS: HierarchyNode[] = [
  {
    id: 'storage',
    label: 'Cold Storage',
    sublabel: 'Warehousing & blast-freeze',
    values: ['3,621', '+10.8%', '18.2%'],
    defaultExpanded: true,
    children: [
      { id: 'storage-blast',   label: 'Blast-freeze',  values: ['1,210', '+13.2%', '22.4%'] },
      { id: 'storage-ambient', label: 'Controlled ambient', values: ['1,580', '+9.4%', '16.8%'] },
      { id: 'storage-pharma',  label: 'Pharma grade',  values: ['831',   '+10.1%', '19.6%'] },
    ],
  },
  {
    id: 'transport',
    label: 'Cold Transport',
    sublabel: 'Primary & secondary distribution',
    values: ['5,107', '+9.4%', '11.6%'],
    children: [
      { id: 'transport-primary',   label: 'Primary haul',     values: ['2,840', '+8.8%', '10.4%'] },
      { id: 'transport-secondary', label: 'Secondary distribution', values: ['1,620', '+10.2%', '12.8%'] },
      { id: 'transport-intermodal',label: 'Intermodal / rail', values: ['647',   '+11.5%', '13.2%'] },
    ],
  },
  {
    id: 'lastmile',
    label: 'Last-mile Delivery',
    sublabel: 'Urban & e-grocery',
    values: ['1,181', '+18.4%', '8.2%'],
    children: [
      { id: 'lastmile-grocery', label: 'E-grocery',    values: ['642', '+24.0%', '7.8%'] },
      { id: 'lastmile-pharma',  label: 'Pharma DTC',   values: ['330', '+14.2%', '9.6%'] },
      { id: 'lastmile-qsr',     label: 'QSR / foodservice', values: ['209', '+10.8%', '7.2%'] },
    ],
  },
  {
    id: 'crossborder',
    label: 'Cross-border',
    sublabel: 'AU exports + NZ intra-Trans-Tasman',
    values: ['601', '+7.2%', '14.8%'],
    children: [
      { id: 'cross-export',   label: 'AU ag exports', values: ['420', '+6.8%', '15.6%'] },
      { id: 'cross-nz',       label: 'NZ Trans-Tasman', values: ['181', '+8.4%', '13.2%'] },
    ],
  },
];

// ─── RankingTable ─────────────────────────────────────────────────

import type { RankingRow, RankingTableColumns } from '@kenresearch/design-system/charts';

export const RANKING_COLUMNS: RankingTableColumns = {
  primaryMetric: 'TAM (AUD Mn)',
  score1: 'Impact (1–10)',
  score2: 'Feasibility (1–10)',
  chip: 'Time-to-monetize',
  weightedScore: 'Score',
};

export const RANKING_ROWS: RankingRow[] = [
  { rank: 1, name: 'Pharma cold-chain 3PL',      detail: 'TGA GDP-compliant · biologics',       primaryMetric: 820, primaryMetricPrefix: 'AUD', primaryMetricUnit: 'Mn', score1: 9.2, score2: 7.8, chipLabel: '18mo', chipUrgency: 'medium',  weightedScore: 8.7 },
  { rank: 2, name: 'IoT temp-monitoring SaaS',   detail: 'Real-time sensor + analytics',        primaryMetric: 560, primaryMetricPrefix: 'AUD', primaryMetricUnit: 'Mn', score1: 8.4, score2: 8.6, chipLabel: '12mo', chipUrgency: 'fast',    weightedScore: 8.5 },
  { rank: 3, name: 'Last-mile reefer delivery',  detail: 'Urban e-grocery + pharma DTC',        primaryMetric: 420, primaryMetricPrefix: 'AUD', primaryMetricUnit: 'Mn', score1: 7.9, score2: 7.5, chipLabel: '14mo', chipUrgency: 'medium',  weightedScore: 7.7 },
  { rank: 4, name: 'Regional hub (Perth/Darwin)', detail: 'Greenfield WA/NT anchor contracts',  primaryMetric: 310, primaryMetricPrefix: 'AUD', primaryMetricUnit: 'Mn', score1: 7.4, score2: 6.2, chipLabel: '30mo', chipUrgency: 'slow',    weightedScore: 6.9 },
  { rank: 5, name: 'Frozen ready-meal logistics', detail: 'QSR + meal-prep supply chains',      primaryMetric: 230, primaryMetricPrefix: 'AUD', primaryMetricUnit: 'Mn', score1: 6.8, score2: 7.1, chipLabel: '9mo',  chipUrgency: 'fast',    weightedScore: 6.8 },
  { rank: 6, name: 'Cross-dock pallet pooling',  detail: 'Shared pallet network · regional',    primaryMetric: 185, primaryMetricPrefix: 'AUD', primaryMetricUnit: 'Mn', score1: 6.2, score2: 7.4, chipLabel: '8mo',  chipUrgency: 'fast',    weightedScore: 6.7 },
  { rank: 7, name: 'Renewable-energy reefer',    detail: 'Solar / EV fleet · ESG positioning',  primaryMetric: 210, primaryMetricPrefix: 'AUD', primaryMetricUnit: 'Mn', score1: 6.5, score2: 5.8, chipLabel: '24mo', chipUrgency: 'slow',    weightedScore: 6.2 },
];
