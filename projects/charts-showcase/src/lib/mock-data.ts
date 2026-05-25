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
