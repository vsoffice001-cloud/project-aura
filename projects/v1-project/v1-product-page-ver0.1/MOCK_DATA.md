# MOCK_DATA — reports-pdp-v2

**Date:** 2026-05-06
**Pairs with:** [`SCHEMA.md`](SCHEMA.md) · [`VARIANTS.md`](VARIANTS.md) · `recipes/report-detail-prd.md`

Two sample reports validate the schema:

1. **Australia Cold Chain Market 2022-2027** — heavy report, 30+ modules, full PRD payload. Source: attached PDF + PRD §10-37.
2. **GCC Pharma Outlook 2026** — light report, 12 modules. Validates light-render scalability.

In implementation, these live at `src/lib/mock-data.ts` w/ `// TODO: replace w/ real API — GET /api/reports/:slug` markers.

---

## V2 deltas vs V1 (builder must add)

V1 payload (below) is starting point. Builder MUST add these top-level fields per `SCHEMA.md`:

```ts
heroCockpit: {
  breadcrumb: [...],
  badges: [...],
  h1: "...",
  promise: "...",
  proofBullets: [...],
  ctas: { primary: { label: 'Download Sample Report', ... }, secondary: { label: 'Talk to Analyst', ... } },
  trustStrip: { authorId: 'a-geetanshi', lastUpdatedDisplay: 'Last updated Q1 2026', shareTargets: [...] },
  metadata: { pages, productCode, baseYear, historicalPeriod, forecastPeriod, format, deliveryType },
  tabs: {
    marketSize:    { label: 'Market Size', payload: <ChartModule combo>, access: { level: 'metered' }, meterAfterInteraction: 2 },
    forecast:      { label: 'Forecast', payload: <ChartModule area + dotted future>, access: { level: 'metered' } },
    segmentation:  { label: 'Segmentation', payload: <ChartModule donut + toggle>, access: { level: 'metered' } },
    competitors:   { label: 'Competitors', payload: { logos, miniMarketShare, positioningTeaserUrl, unlockCtaTrigger: 'analyst-call' }, access: { level: 'metered' } },
  },
}

intelligenceSnapshot: {
  marketSize: { value: 6547.8, unit: 'AUD Mn', year: 2022, sourceNote: 'Ken Research analysis' },
  forecast: { value: 10705.0, unit: 'AUD Mn', year: 2027, cagr: 10.03, period: '2022-2027' },
  segments: { primary: ['Cold Storage', 'Cold Transport', 'Meat & Seafood', 'Fruits & Vegetables', 'Pharmaceuticals'], dominant: 'Meat & Seafood' },
  majorCompanies: { logos: [...top 5...], lockedFullCount: 200 },
  buyerUseCases: ['market-entry', 'competitive-benchmarking', 'investment-screening', 'expansion-planning', 'supply-chain-strategy', 'procurement-planning'],
  availableOutputs: ['pdf', 'charts', 'tables', 'sample', 'analyst-call', 'customization'],
}

keyStats: [
  { id: 's1', value: 'AUD 6,547.8 Mn', label: 'Cold Chain Market Size', yearOrPeriod: '2022', tooltipDefinition: '...', sourceNote: '...', access: { level: 'public' } },
  { id: 's2', value: 'AUD 10,705.0 Mn', label: 'Forecast', yearOrPeriod: '2027', ..., access: { level: 'public' } },
  { id: 's3', value: '10.03%', label: 'CAGR', yearOrPeriod: '2022-2027', ..., access: { level: 'public' } },
  { id: 's4', value: 'AUD 2,647.8 Mn', label: 'Cold Storage Market', yearOrPeriod: '2022', ..., access: { level: 'lead-gated', unlockTrigger: 'sample' } },
  { id: 's5', value: 'AUD 3,900.0 Mn', label: 'Cold Transport Market', yearOrPeriod: '2022', ..., access: { level: 'lead-gated', unlockTrigger: 'sample' } },
],

executiveSummary: {
  insightLine: 'Australia cold chain crosses AUD 10.7Bn by 2027 — driven by perishable demand, e-commerce, and tech adoption.',
  paragraphs: {
    marketOverview: '...',  // 2-3 sentences re: AUD 6,547.8 Mn baseline + why market matters
    growthDrivers: '...',   // 2-3 sentences re: 4 PRD §26 drivers
    decisionUtility: '...', // 2-3 sentences re: what report helps decide
  },
  takeawayCards: [
    { id: 't1', icon: 'TrendingUp', title: 'Demand growth', body: 'Perishable goods volume + cold chain logistics scale at 10%+ CAGR through 2027.', category: 'demand' },
    { id: 't2', icon: 'BarChart3', title: 'Forecast horizon', body: 'AUD 10,705 Mn by 2027 — cold storage 9.7% historic, cold transport 8.8%.', category: 'forecast' },
    { id: 't3', icon: 'PieChart', title: 'Segment depth', body: 'Meat & seafood (44%), fruits & vegetables (23%), pharma (17%).', category: 'segments' },
    { id: 't4', icon: 'Users', title: 'Competitive shape', body: '200-250 players. Lineage + Americold lead w/ 17% combined pallet share.', category: 'competition' },
    { id: 't5', icon: 'BookOpen', title: 'Methodology', body: 'CATI w/ 30+ companies, Sydney/Melbourne/Brisbane focus, NMIS validation.', category: 'methodology' },
  ],
  buyerUseCaseChips: ['market-entry', 'competitive-benchmarking', 'investment-screening', 'expansion-planning', 'supply-chain-strategy', 'procurement-planning'],
  ctaTrigger: 'sample',
}

reportScope: {
  marketCoverage: [{ label: 'Cold Storage', badge: 'included' }, { label: 'Cold Transport', badge: 'included' }, { label: 'Cold Warehousing', badge: 'included' }, { label: 'Temperature-Sensitive Products', badge: 'included' }],
  geographyCoverage: [{ label: 'Australia (Country)' }, { label: 'Sydney · Melbourne · Brisbane (Cities)' }, { label: 'NSW · Victoria · Queensland (States)' }, { label: 'Major Ports', description: 'Brisbane · Fremantle · Sydney · Melbourne · Adelaide' }],
  segmentCoverage: [{ label: 'End Users (Meat, F&V, Pharma, Confectionery, Others)' }, { label: 'Mode of Transport (Land/Sea/Air)' }, { label: 'Temperature Range (Frozen/Chiller/Ambient)' }, { label: 'Region', description: 'City + state revenue/share' }, { label: 'Truck Type (1-10t / 10-20t / 20+t)' }],
  competitorCoverage: [{ label: 'Top 12 by Pallet Share' }, { label: 'Logos · Market Shares · Positioning · Comparison Table' }],
  timeCoverage: { baseYear: 2022, historical: '2017-2022', forecast: '2022-2027' },
  methodologyCoverage: [{ label: 'Secondary Research' }, { label: 'Primary Research (CATI w/ 30+)' }, { label: 'Triangulation' }, { label: 'Sanity Checking' }, { label: 'Limitations Disclosure' }],
  deliverables: [{ label: 'PDF Report' }, { label: 'Interactive Charts' }, { label: 'Data Tables' }, { label: 'Sample Report (free)' }, { label: 'Analyst Call' }, { label: 'Customization Available' }],
  customizationOptions: [{ label: 'Additional Segments' }, { label: 'Additional Geographies' }, { label: 'Additional Competitors' }, { label: 'Forecast Period Extension' }, { label: 'Analyst Support' }],
}

answerBlocks: {
  marketSize: 'The Australia Cold Chain Market reached AUD 6,547.8 million in 2022.',
  forecastValue: 'The market is expected to reach AUD 10,705.0 million by 2027.',
  cagr: 'The market is forecast to grow at 10.03% CAGR during 2022-2027.',
  segmentsCovered: 'The report covers cold storage, cold transport, end users (meat & seafood, fruits & vegetables, pharmaceuticals, confectionery), temperature ranges, regions, transport modes, truck types, and domestic vs international.',
  companiesCovered: 'Major players include Lineage, Americold, NewCold Advanced, Oxford Cold Storage, Linfox, Laverton, Karras, Auscold, Swire, P. Pullar, Freezex, Austco Polar, and Altona.',
  growthDrivers: 'Increasing demand for perishable goods, e-commerce and home delivery growth, globalization of food supply chains, and technological advancements (IoT, real-time tracking, data analytics).',
  keyChallenges: 'Cost efficiency with technology adoption, last-mile product integrity, regulatory compliance (HACCP, SQF, COR), and infrastructure across Australia\'s vast geography.',
  reportIncludes: 'Market sizing, segmentation across 7 axes, competitive landscape with 12+ players, SWOT, growth drivers, value chain, regulatory landscape, future outlook to 2027, macroeconomic indicators, and research methodology.',
  methodologyUsed: 'Bottom-up market sizing combined with primary CATI interviews of 30+ cold chain companies and NMIS warehouse-count validation.',
  whoShouldBuy: 'Buyers in market entry, competitive benchmarking, investment screening, expansion planning, supply chain strategy, or procurement planning across logistics, food/pharma, and supply chain industries.',
}

reportFacts: {
  market: 'Australia Cold Chain Market',
  marketSize: 'AUD 6,547.8 Mn, 2022',
  forecast: 'AUD 10,705.0 Mn, 2027',
  cagr: '10.03%, 2022-2027',
  segments: ['Cold Storage', 'Cold Transport', 'Meat & Seafood', 'Fruits & Vegetables', 'Pharmaceuticals'],
  reportType: 'Market Intelligence Report',
}

schemaMeta: {
  organization: { /* Ken Research entity */ },
  webPage: { /* canonical URL, lang, etc. */ },
  breadcrumbList: { /* Industry → Logistics → Report */ },
  product: { /* product name, SKU=product_code, brand=Ken Research, NO offer/price */ },
  creativeWork: { /* CreativeWork or Report w/ author, datePublished, headline */ },
  dataset: { /* primary market-size dataset descriptor */ },
  faqPage: { /* generated from faq[] entries where schemaEnabled: true */ },
  paywalledElements: [
    { cssSelector: '.kr-paywall-chart', isAccessibleForFree: false },
    { cssSelector: '.kr-paywall-dataset', isAccessibleForFree: false },
    { cssSelector: '.kr-paywall-forecast', isAccessibleForFree: false },
    { cssSelector: '.kr-paywall-competitor-table', isAccessibleForFree: false },
  ],
}

leadFormContexts: {
  sample: {
    type: 'sample',
    visibleFields: [
      { name: 'fullName', label: 'Full name', type: 'text', required: true },
      { name: 'email', label: 'Business email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: true },
      { name: 'company', label: 'Company', type: 'text', required: true },
      { name: 'designation', label: 'Designation', type: 'text', required: true },
      { name: 'country', label: 'Country', type: 'select', required: true, options: [/* country list */] },
      { name: 'requirementNote', label: 'Briefly describe your requirement', type: 'textarea', required: false },
    ],
    hiddenContext: [
      { name: 'report_title', source: 'report', resolverKey: 'title' },
      { name: 'product_code', source: 'report', resolverKey: 'product_code' },
      { name: 'page_url', source: 'session', resolverKey: 'window.location.href' },
      { name: 'cta_location', source: 'cta-location', resolverKey: 'currentSection' },
      { name: 'utm_source', source: 'utm', resolverKey: 'utm_source' },
      // ... full list per SCHEMA.md HiddenContextField
    ],
    submitEndpoint: '/api/leads/sample',
    successMessage: 'Sample sent. Check your inbox.',
    successCta: { label: 'Talk to Analyst', href: '#analyst' },
    validationSchema: 'sample',
  },
  // 'dataset-unlock' · 'analyst-call' · 'customization' — same shape, fields per PRD §46
}

analyticsContext: {
  reportTitle: 'Australia Cold Chain Market 2022-2027',
  productCode: 'KR-AU-CC-2027',
  industry: 'Logistics',
  region: 'Australia',
  reportType: 'market-intelligence',
  variant: 'editorial-A',
  defaultProps: { schema_version: '2.0' },
}
```

**Per-module changes:** every existing module gains `access: AccessControl` (replacing `gated: boolean`):

```ts
// V1: { id: 'm-macro', gated: true, ... }
// V2:
{
  id: 'm-macro',
  type: 'macroPanel',
  access: { level: 'lead-gated', ctaTrigger: 'sample', paywallSelector: '.kr-paywall-macro', schemaIsAccessibleForFree: false },
  // ...
}
```

**Per-chart additions:** every `ChartModule` gains `zones: { eyebrow, title, insightLine, controls?, sourceNote, accessState, cta? }` and `datasetPreview: { publicRows: 3, leadRows: 8, fullRowCount: N, columns, rows, exportEnabled, lastUpdated, sourceNote }`.

**Builder workflow:**
1. Read existing `src/lib/mock-data.ts` AU Cold Chain payload (~1660 LOC, ~70% reusable)
2. Migrate per migration map in SCHEMA.md "Schema versioning" section
3. Add the V2 top-level fields above
4. Update GCC_PHARMA the same way (lighter)
5. Verify TS compiles against new `src/types/schema.ts`

---

## (Below: V1 reference payload — preserved for migration source. Builder reads, migrates, doesn't duplicate.)

---

## Sample 1: Australia Cold Chain (HEAVY)

```ts
import type { ReportDetailHeavy } from '@/types/schema';

export const AU_COLD_CHAIN: ReportDetailHeavy = {
  id: 'r-au-coldchain-2027',
  slug: 'australia-cold-chain-market-2022-2027',
  title: 'Australia Cold Chain Market 2022-2027 — Size, Trends, Segmentation, Competitors, Forecasts',
  industry: 'Logistics',
  subIndustry: 'Cold Chain',
  region: 'Australia',
  pages: 57,
  chartCount: 16,
  segmentCount: 8,
  ecosystemMapCount: 5,
  publishedDate: 'Q1 2026',
  forecastHorizon: '2022-2027',
  authors: [
    {
      id: 'a-geetanshi',
      name: 'Geetanshi Chugh',
      role: 'Senior Analyst, Logistics & Supply Chain',
      bio: 'Six years covering APAC cold chain markets. Prior reports across India, Indonesia, Vietnam.',
      portraitUrl: '/authors/geetanshi.jpg',
      priorReports: [
        { id: 'r-in-coldchain', title: 'India Cold Chain Market 2024', slug: 'india-cold-chain-market-2024' },
      ],
    },
  ],
  oneLiner:
    'Cold storage and cold transport across meat & seafood, fruit & vegetables, pharmaceuticals, and confectionery. Sizing, ecosystem map, competitor positioning, and 2027 forecast across the Australian market.',
  marketHighlights: [
    'AUD 6,547.8 Mn revenue in 2022, growing at 8.0%.',
    'Forecast AUD 10,705.0 Mn by 2027 — 10.03% CAGR (2022-2027).',
    'Cold storage AUD 2,647.8 Mn (CAGR 9.7% historic 2017-2022).',
    'Cold transport AUD 3,900.0 Mn (CAGR 8.8% historic 2017-2022).',
    '200-250 cold transportation & storage players; market highly fragmented.',
  ],
  snapshotChart: {
    id: 'hero-snapshot',
    type: 'chart',
    tier: 1,
    priority: 100,
    chartType: 'combo',
    series: [
      {
        id: 'historic',
        name: 'Historic (AUD Mn)',
        type: 'bar',
        color: 'primary',
        data: [
          { x: 2017, y: 4231.1 },
          { x: 2018, y: 4640.7 },
          { x: 2019, y: 5123.7 },
          { x: 2020, y: 5596.1 },
          { x: 2021, y: 6063.3 },
          { x: 2022, y: 6547.8 },
        ],
      },
      {
        id: 'forecast',
        name: 'Forecast (AUD Mn)',
        type: 'line',
        color: 'accent',
        data: [
          { x: 2022, y: 6547.8 },
          { x: 2023, y: 7162.43 },
          { x: 2024, y: 7867.3 },
          { x: 2025, y: 8685.2 },
          { x: 2026, y: 9633.6 },
          { x: 2027, y: 10705.0 },
        ],
      },
    ],
    yAxis: { label: 'Revenue', unit: 'AUD Mn', format: 'currency' },
    yearRange: [2017, 2027],
    highlight: { value: '10.03% CAGR', description: '2022-2027 forecast' },
  },

  toc: [
    { id: 'sec-overview', title: 'Executive Summary' },
    { id: 'sec-definitions', title: 'Market Definitions' },
    { id: 'sec-taxonomy', title: 'Taxonomy & Scope' },
    { id: 'sec-ecosystem', title: 'Market Ecosystem' },
    { id: 'sec-sizing', title: 'Market Size & Forecast' },
    { id: 'sec-segmentation', title: 'Segmentation Analysis' },
    { id: 'sec-dynamics', title: 'SWOT, Drivers & Value Chain' },
    { id: 'sec-challenges', title: 'Challenges & Solutions' },
    { id: 'sec-competition', title: 'Competitive Landscape' },
    { id: 'sec-trends', title: 'Trends & Emerging Tech' },
    { id: 'sec-regulatory', title: 'Regulatory Landscape' },
    { id: 'sec-future', title: 'Future Outlook 2022-2027' },
    { id: 'sec-macro', title: 'Macroeconomic Indicators', gated: true },
    { id: 'sec-methodology', title: 'Research Methodology' },
    { id: 'sec-faq', title: 'Frequently Asked Questions' },
  ],

  modules: [
    {
      id: 'm-definitions-key',
      type: 'definitions',
      tier: 2,
      priority: 90,
      groupKey: 'overview',
      heading: 'Key Market Definitions',
      group: 'key',
      terms: [
        { term: 'Australia Cold Chain Market', body: 'Sum of revenues earned by accredited non-captive domestic cold chain service providers for cold storage and transport services. Includes meat & seafood, vaccines & pharmaceuticals, fruits & vegetables, bakery & confectionery, dairy, and others. Temperature range +10°C to -18°C. Excludes captive storage and transport.' },
        { term: 'Cold Storage Market', body: 'Revenue from non-captive cold storage logistics companies offering +10°C to -18°C in accredited warehouses. Includes leasing, packaging, labeling, loading/unloading, temperature monitoring, and support services.' },
        { term: 'Cold Transport Market', body: 'Revenue from non-captive cold transport companies offering +10°C to -18°C across meat & seafood, fruits & vegetables, vaccines & pharmaceuticals, dairy, bakery & confectionery via land, sea, and air. Includes freight forwarding, loading/unloading, distribution, last-mile delivery.' },
      ],
    },
    {
      id: 'm-definitions-fundamental',
      type: 'definitions',
      tier: 2,
      priority: 80,
      groupKey: 'overview',
      heading: 'Fundamental Definitions',
      group: 'fundamental',
      terms: [
        { term: 'Ambient Storage', body: 'Cold storage facilities offering temperature range above +10°C.' },
        { term: 'Frozen Storage', body: 'Cold storage facilities offering -18°C or colder. Includes chillers convertible to freezers.' },
        { term: 'Chiller Storage', body: 'Cold storage offering 1°C to -10°C only, non-convertible. Not prevalent in Australia.' },
        { term: 'Captive / Owned Warehouses', body: 'Cold storage owned and controlled by individual companies for own use. Excluded from market sizing.' },
        { term: 'Non-Captive Warehouses', body: 'Cold storage owned by logistics companies and rented to customers requiring cold storage solutions. Included in market sizing.' },
      ],
    },
    {
      id: 'm-taxonomy',
      type: 'taxonomy',
      tier: 2,
      priority: 70,
      groupKey: 'overview',
      heading: 'Market Taxonomy',
      root: 'Australia Cold Chain Market',
      branches: [
        { label: 'Cold Storage', children: [
          { label: 'Refrigerated Warehouses' },
          { label: 'Cold Rooms' },
          { label: 'Blast Freezers' },
          { label: 'Refrigerated Containers' },
        ]},
        { label: 'Cold Transportation', children: [
          { label: 'Refrigerated Trucks' },
          { label: 'Reefer Containers (Sea & Air)' },
          { label: 'Refrigerated Rail Transport' },
        ]},
        { label: 'Cold Warehousing', children: [
          { label: 'Temperature-Controlled Distribution Centers' },
          { label: 'Cross-Docking Facilities' },
        ]},
        { label: 'End-User Products', children: [
          { label: 'Food & Beverages', children: [
            { label: 'Fresh Produce' },
            { label: 'Dairy Products' },
            { label: 'Meat & Seafood' },
            { label: 'Processed Foods' },
          ]},
          { label: 'Pharmaceuticals & Biotechnology', children: [
            { label: 'Vaccines' },
            { label: 'Biologics' },
            { label: 'Medications' },
          ]},
          { label: 'Chemicals (Hazmat Temp-Controlled)' },
        ]},
      ],
    },
    {
      id: 'm-ecosystem-overall',
      type: 'ecosystem',
      tier: 2,
      priority: 65,
      groupKey: 'overview',
      heading: 'Cold Chain Market Ecosystem',
      subheading: '200-250 active players. Highly fragmented.',
      scope: 'overall',
      tiers: [
        {
          label: 'Cold Transport',
          count: 120,
          threshold: '110-130 players',
          logos: [
            { name: 'Hines Refrigerated', logoUrl: '/logos/hines.svg' },
            { name: 'Sands Fridge Lines', logoUrl: '/logos/sands.svg' },
            { name: 'The Midfield Group', logoUrl: '/logos/midfield.svg' },
            { name: 'Thermofreeze', logoUrl: '/logos/thermofreeze.svg' },
            { name: 'DP World', logoUrl: '/logos/dpworld.svg' },
            { name: 'Pakval', logoUrl: '/logos/pakval.svg' },
            { name: 'NewCold Advanced', logoUrl: '/logos/newcold.svg' },
            { name: 'ChillFreeze', logoUrl: '/logos/chillfreeze.svg' },
          ],
        },
        {
          label: 'Cold Storage',
          count: 105,
          threshold: '90-120 players',
          logos: [
            { name: 'Lineage', logoUrl: '/logos/lineage.svg' },
            { name: 'Americold', logoUrl: '/logos/americold.svg' },
            { name: 'Iceland Cold Storage', logoUrl: '/logos/iceland.svg' },
            { name: 'Laverton', logoUrl: '/logos/laverton.svg' },
            { name: 'Karras Cold Logistics', logoUrl: '/logos/karras.svg' },
            { name: 'NewCold', logoUrl: '/logos/newcold.svg' },
            { name: 'APF Cold Storage', logoUrl: '/logos/apf.svg' },
            { name: 'Coldrex', logoUrl: '/logos/coldrex.svg' },
          ],
        },
      ],
    },
    {
      id: 'm-ecosystem-storage',
      type: 'ecosystem',
      tier: 2,
      priority: 64,
      groupKey: 'overview',
      heading: 'Cold Storage Player Tiers',
      subheading: 'Tiered by pallet position capacity.',
      scope: 'sub-market',
      subMarketLabel: 'Cold Storage',
      tiers: [
        {
          label: '> 200,000 Pallet Positions',
          count: 4,
          threshold: '3-4 Players',
          logos: [
            { name: 'Lineage', logoUrl: '/logos/lineage.svg' },
            { name: 'Linfox', logoUrl: '/logos/linfox.svg' },
            { name: 'Americold', logoUrl: '/logos/americold.svg' },
            { name: 'NewCold Advanced', logoUrl: '/logos/newcold.svg' },
            { name: 'Oxford Cold Storage', logoUrl: '/logos/oxford.svg' },
          ],
        },
        {
          label: '> 15,000 Pallet Positions',
          count: 10,
          threshold: '~10 Players',
          logos: [
            { name: 'Laverton', logoUrl: '/logos/laverton.svg' },
            { name: 'Auscold Logistics', logoUrl: '/logos/auscold.svg' },
            { name: 'Global Cold Chain Solutions', logoUrl: '/logos/gccs.svg' },
            { name: 'Swire Cold Storage', logoUrl: '/logos/swire.svg' },
            { name: 'Karras', logoUrl: '/logos/karras.svg' },
            { name: 'Pullar', logoUrl: '/logos/pullar.svg' },
            { name: 'FreezeX', logoUrl: '/logos/freezex.svg' },
            { name: 'Altona Cold Storage', logoUrl: '/logos/altona.svg' },
          ],
        },
        {
          label: '< 15,000 Pallet Positions',
          count: 100,
          threshold: '~100 Players',
          logos: [
            { name: 'Centurion', logoUrl: '/logos/centurion.svg' },
            { name: 'Fernhurst', logoUrl: '/logos/fernhurst.svg' },
            { name: 'FCC', logoUrl: '/logos/fcc.svg' },
            { name: 'Cold Logistics', logoUrl: '/logos/coldlogistics.svg' },
            { name: 'Blenners Transport', logoUrl: '/logos/blenners.svg' },
            { name: 'MFRH Cool Logistics', logoUrl: '/logos/mfrh.svg' },
            { name: 'Lindsay Australia', logoUrl: '/logos/lindsay.svg' },
            { name: 'Acit', logoUrl: '/logos/acit.svg' },
          ],
        },
      ],
    },
    {
      id: 'm-chart-historic',
      type: 'chart',
      tier: 1,
      priority: 95,
      groupKey: 'sizing',
      heading: 'Australia Cold Chain Market — Historic',
      subheading: 'CAGR 9.1% (2017-2022)',
      chartType: 'combo',
      series: [
        {
          id: 'mkt',
          name: 'Market Size',
          type: 'bar',
          color: 'primary',
          data: [
            { x: 2017, y: 4231.1 },
            { x: 2018, y: 4640.7 },
            { x: 2019, y: 5123.7 },
            { x: 2020, y: 5596.1 },
            { x: 2021, y: 6063.3 },
            { x: 2022, y: 6547.8 },
          ],
        },
        {
          id: 'growth',
          name: 'Growth Rate %',
          type: 'line',
          color: 'accent',
          data: [
            { x: 2018, y: 9.7 },
            { x: 2019, y: 10.4 },
            { x: 2020, y: 9.2 },
            { x: 2021, y: 8.3 },
            { x: 2022, y: 8.0 },
          ],
        },
      ],
      yAxis: { label: 'Revenue', unit: 'AUD Mn', format: 'currency' },
      source: 'Ken Research analysis',
    },
    // ... additional chart modules: cold storage size, cold transport size, pallets growth, price/pallet/week, occupancy rate, segmentation pies, cold storage by region, etc.
    // (For brevity in this doc, additional modules condensed below — full payload mirrors PDF blocks 8-43.)
    {
      id: 'm-inline-cta-1',
      type: 'inlineCTA',
      tier: 1,
      priority: 50,
      groupKey: 'sizing',
      variant: 'sample-analyst',
      headline: 'Want the full sizing breakdown?',
      body: 'Sample includes regional split, pallet pricing, and 2027 forecast model.',
    },
    {
      id: 'm-swot',
      type: 'quadrant',
      tier: 2,
      priority: 60,
      groupKey: 'dynamics',
      heading: 'SWOT Analysis',
      variant: 'swot',
      quadrants: [
        {
          type: 'strength',
          bullets: [
            'Robust agricultural sector — fruits, vegetables, dairy, meat — provides perishable-goods foundation.',
            'Strong export tradition; market expected to scale to USD 40.1B by 2028.',
          ],
        },
        {
          type: 'weakness',
          bullets: [
            'Dispersed population: remote/regional areas have limited cold storage access, higher transport costs.',
            'Seasonal harvest fluctuations strain capacity and resource allocation.',
          ],
        },
        {
          type: 'opportunity',
          bullets: [
            'IoT sensors, real-time monitoring, data analytics improve efficiency and supply-chain visibility.',
            'E-commerce + online grocery growth drives home-delivery cold chain demand.',
          ],
        },
        {
          type: 'threat',
          bullets: [
            'Stringent regulations — non-compliance penalties, reputational, and legal risk.',
            'Intense competition pressures price; demands continuous innovation.',
          ],
        },
      ],
    },
    {
      id: 'm-drivers',
      type: 'cardGrid',
      tier: 1,
      priority: 70,
      groupKey: 'dynamics',
      heading: 'Growth Drivers',
      variant: 'drivers',
      cols: 2,
      cards: [
        { id: 'd1', icon: 'TrendingUp', title: 'Demand for Perishable Goods', body: 'Population growth, urbanization, dietary shift toward fresh/frozen drives volume across produce, dairy, meat, seafood, processed foods.', accent: 'purple' },
        { id: 'd2', icon: 'ShoppingCart', title: 'E-commerce & Consumer Behavior', body: 'Online grocery + home delivery demand robust temperature-controlled supply chains for last-mile integrity.', accent: 'periwinkle' },
        { id: 'd3', icon: 'Globe', title: 'Globalization of Food Supply Chains', body: 'Australia\'s export-oriented agriculture + favorable trade geography expands cross-border cold chain demand.', accent: 'perano' },
        { id: 'd4', icon: 'Cpu', title: 'Technological Advancements', body: 'IoT temperature monitoring, real-time tracking, and analytics improve visibility, traceability, and waste reduction.', accent: 'coral' },
      ],
    },
    {
      id: 'm-value-chain',
      type: 'flow',
      tier: 2,
      priority: 60,
      groupKey: 'dynamics',
      heading: 'Cold Chain Value Chain',
      subheading: 'Procurement → Distribution to End Users',
      variant: 'value-chain',
      orientation: 'horizontal',
      steps: [
        { id: 's1', label: 'Shipper', icon: 'Package', body: 'Origin: manufacturers, importers, farms.' },
        { id: 's2', label: 'Procurement Hubs', icon: 'Warehouse', body: 'Pre-cooling systems. Aggregation point.', metric: { label: 'Gross Margin (Transport)', value: '2-10%' } },
        { id: 's3', label: 'Cold Storages', icon: 'Snowflake', body: 'Freezers, chillers, ambient, blast freezers. Sydney, Melbourne, Brisbane.', metric: { label: 'Gross Margin (Storage)', value: '5-15%' } },
        { id: 's4', label: 'Distribution', icon: 'Truck', body: 'Reefer vans (4/6/8 wheelers) to hypermarkets, supermarkets, exclusive retailers.', metric: { label: 'Gross Margin (Transport)', value: '5-20%' } },
      ],
      annotations: [
        { betweenStepIds: ['s2', 's3'], text: 'Loading via large reefer trucks, 20-40 ft cargo containers' },
        { betweenStepIds: ['s3', 's4'], text: 'Last-mile via small reefer vans' },
      ],
    },
    {
      id: 'm-challenges',
      type: 'issueTable',
      tier: 2,
      priority: 55,
      groupKey: 'dynamics',
      heading: 'Major Challenges & Solutions',
      rows: [
        {
          id: 'c1',
          icon: 'Zap',
          problem: 'Cost efficiency with technology adoption — AI, robotics, automation carry high upfront cost and integration complexity.',
          solution: 'Phased pilot rollouts. Partner w/ tech providers and industry experts to validate ROI before scale.',
          severity: 'medium',
        },
        {
          id: 'c2',
          icon: 'MapPin',
          problem: 'Product integrity in last-mile delivery — temperature control, delays, handling risk concentrated in final segment.',
          solution: 'Real-time tracking + comms systems. Monitor delivery progress; address deviations promptly.',
          severity: 'high',
        },
        {
          id: 'c3',
          icon: 'FileCheck',
          problem: 'Compliance with strict regulations on food safety, quality, and integrity. Complex and time-consuming.',
          solution: 'Documentation discipline. HACCP / SQF QMS implementation. Regular audit cycles.',
          severity: 'high',
        },
        {
          id: 'c4',
          icon: 'Truck',
          problem: 'Infrastructure & transport — vast geography, dispersed population, remote-area cold chain gaps.',
          solution: 'Industry-government collaboration. Robust infrastructure investment. Multi-modal logistics.',
          severity: 'medium',
        },
      ],
    },
    {
      id: 'm-inline-cta-2',
      type: 'inlineCTA',
      tier: 1,
      priority: 48,
      groupKey: 'dynamics',
      variant: 'sample-custom',
      headline: 'Need this analysis tailored to your operation?',
      body: 'Custom this report with your geography, product mix, or regulatory scope.',
    },
    {
      id: 'm-end-user-matrix',
      type: 'matrix',
      tier: 1,
      priority: 65,
      groupKey: 'segmentation',
      heading: 'End-User Sectors — Cold Chain Demand',
      variant: 'end-user',
      stickyFirstColumn: true,
      columns: [
        { id: 'sector', label: 'Sector', format: 'text' },
        { id: 'revenue', label: 'Market Revenue (AUD Bn, 2022)', format: 'currency', align: 'right' },
        { id: 'cagr', label: 'CAGR', format: 'percent', align: 'right' },
        { id: 'players', label: 'Top Players', format: 'badge' },
        { id: 'temp', label: 'Temperature', format: 'text', align: 'center' },
        { id: 'tech', label: 'Technology', format: 'text' },
        { id: 'model', label: 'Owned / 3PL', format: 'badge', align: 'center' },
      ],
      rows: [
        {
          id: 'r-meat',
          cells: [
            { columnId: 'sector', value: 'Meat & Seafood' },
            { columnId: 'revenue', value: '34.6' },
            { columnId: 'cagr', value: '2.5' },
            { columnId: 'players', value: 'JBS · Teys · Ingham\'s' },
            { columnId: 'temp', value: '-18°C to -20°C' },
            { columnId: 'tech', value: 'Refrigerated trucks, blast freezers' },
            { columnId: 'model', value: '3PL', badge: '3PL' },
          ],
        },
        {
          id: 'r-fruits',
          cells: [
            { columnId: 'sector', value: 'Fruits & Vegetables' },
            { columnId: 'revenue', value: '15.5' },
            { columnId: 'cagr', value: '2.2' },
            { columnId: 'players', value: 'Costa · Simplot · Fresh Produce Group' },
            { columnId: 'temp', value: '0°C to 4°C' },
            { columnId: 'tech', value: 'Controlled atmosphere storage' },
            { columnId: 'model', value: '3PL', badge: '3PL' },
          ],
        },
        {
          id: 'r-pharma',
          cells: [
            { columnId: 'sector', value: 'Pharmaceuticals' },
            { columnId: 'revenue', value: '43.7' },
            { columnId: 'cagr', value: '3.2' },
            { columnId: 'players', value: 'Pfizer · Sanofi · AstraZeneca' },
            { columnId: 'temp', value: '2°C to 8°C' },
            { columnId: 'tech', value: 'Temperature-controlled packaging' },
            { columnId: 'model', value: 'Owned/3PL', badge: 'Hybrid' },
          ],
        },
        {
          id: 'r-conf',
          cells: [
            { columnId: 'sector', value: 'Confectionery' },
            { columnId: 'revenue', value: '5.5' },
            { columnId: 'cagr', value: '1.8' },
            { columnId: 'players', value: 'Cadbury · Nestlé · Mars' },
            { columnId: 'temp', value: '15°C to 20°C' },
            { columnId: 'tech', value: 'Ambient-temperature storage' },
            { columnId: 'model', value: 'Owned', badge: 'Owned' },
          ],
        },
      ],
    },
    {
      id: 'm-competitor-timeline',
      type: 'timeline',
      tier: 2,
      priority: 60,
      groupKey: 'competition',
      heading: 'Major Players — Establishment Timeline',
      variant: 'company-history',
      range: [1968, 2020],
      entities: [
        { id: 'e1', name: 'Americold', logoUrl: '/logos/americold.svg', events: [{ year: 1968, label: 'Established', emphasis: true }] },
        { id: 'e2', name: 'NewCold', logoUrl: '/logos/newcold.svg', events: [{ year: 1986, label: 'Established' }] },
        { id: 'e3', name: 'Karras Cold Logistics', logoUrl: '/logos/karras.svg', events: [{ year: 1989, label: 'Established' }] },
        { id: 'e4', name: 'Auscold', logoUrl: '/logos/auscold.svg', events: [{ year: 1994, label: 'Established' }] },
        { id: 'e5', name: 'ChillFreeze', logoUrl: '/logos/chillfreeze.svg', events: [{ year: 1997, label: 'Established' }] },
      ],
    },
    {
      id: 'm-market-share',
      type: 'chart',
      tier: 1,
      priority: 70,
      groupKey: 'competition',
      heading: 'Market Share by Pallets, 2022',
      chartType: 'bar',
      series: [{
        id: 'share',
        name: 'Pallet Share',
        color: 'primary',
        data: [
          { x: 'Lineage', y: 12.5, label: '590,000' },
          { x: 'Americold', y: 4.8, label: '226,000' },
          { x: 'NewCold Advanced', y: 4.8, label: '225,000' },
          { x: 'Oxford Cold Storage', y: 3.5, label: '165,000' },
          { x: 'Linfox', y: 0.8, label: '36,000' },
          { x: 'Laverton', y: 0.6, label: '29,000' },
          { x: 'Karras', y: 0.5, label: '25,350' },
          { x: 'Auscold', y: 0.5, label: '25,000' },
          { x: 'Swire', y: 0.5, label: '24,845' },
          { x: 'P. Pullar', y: 0.5, label: '23,000' },
          { x: 'FreezeX', y: 0.4, label: '20,000' },
          { x: 'Austco Polar', y: 0.4, label: '18,000' },
          { x: 'Altona', y: 0.4, label: '15,500' },
          { x: 'Others', y: 66.9, label: '3,373,805' },
        ],
      }],
      yAxis: { label: 'Share', unit: '%', format: 'percent' },
    },
    {
      id: 'm-player-comparison',
      type: 'matrix',
      tier: 1,
      priority: 75,
      groupKey: 'competition',
      heading: 'Top Cold Chain Players — Comparison',
      variant: 'comparison',
      stickyFirstColumn: true,
      paginate: { rowsPerPage: 10 },
      columns: [
        { id: 'name', label: 'Company', format: 'logo' },
        { id: 'est', label: 'Established', format: 'number', align: 'center' },
        { id: 'services', label: 'Services', format: 'text' },
        { id: 'pallets', label: 'Pallets (2022)', format: 'number', align: 'right' },
        { id: 'occupancy', label: 'Occupancy', format: 'percent', align: 'right' },
        { id: 'warehouses', label: 'Warehouses', format: 'number', align: 'right' },
        { id: 'tech', label: 'Technology', format: 'text' },
      ],
      rows: [
        { id: 'p1', emphasis: true, cells: [
          { columnId: 'name', value: 'Lineage' },
          { columnId: 'est', value: 2019 },
          { columnId: 'services', value: 'Cold storage + Cold Transport (3PL)' },
          { columnId: 'pallets', value: 590000 },
          { columnId: 'occupancy', value: 92 },
          { columnId: 'warehouses', value: 30 },
          { columnId: 'tech', value: 'WMS, automated material handling, temperature monitoring, data analytics' },
        ]},
        { id: 'p2', cells: [
          { columnId: 'name', value: 'Americold' },
          { columnId: 'est', value: 1968 },
          { columnId: 'services', value: 'Retail expertise, supply chain optimization, cold storage' },
          { columnId: 'pallets', value: 226000 },
          { columnId: 'occupancy', value: 87 },
          { columnId: 'warehouses', value: 179 },
          { columnId: 'tech', value: 'WMS, EDI, i-3PL Technology' },
        ]},
        { id: 'p3', cells: [
          { columnId: 'name', value: 'NewCold Advanced' },
          { columnId: 'est', value: 2017 },
          { columnId: 'services', value: 'Cold storage service provider' },
          { columnId: 'pallets', value: 225000 },
          { columnId: 'occupancy', value: 87 },
          { columnId: 'warehouses', value: 2 },
          { columnId: 'tech', value: 'EDI connections, software-driven processes, automated warehouses' },
        ]},
        { id: 'p4', cells: [
          { columnId: 'name', value: 'Oxford Cold Storage' },
          { columnId: 'est', value: 1975 },
          { columnId: 'services', value: 'Cold storage service provider' },
          { columnId: 'pallets', value: 165000 },
          { columnId: 'occupancy', value: 87 },
          { columnId: 'warehouses', value: 4 },
          { columnId: 'tech', value: 'WMS, product scanning, data analysis' },
        ]},
        { id: 'p5', cells: [
          { columnId: 'name', value: 'Linfox' },
          { columnId: 'est', value: 1956 },
          { columnId: 'services', value: 'Cold storage + cold transport' },
          { columnId: 'pallets', value: 36000 },
          { columnId: 'occupancy', value: 85 },
          { columnId: 'warehouses', value: 200 },
          { columnId: 'tech', value: 'GPS, WMS, real-time tracking, temperature-controlled transport' },
        ]},
        { id: 'p6', cells: [
          { columnId: 'name', value: 'Laverton Cold Storage' },
          { columnId: 'est', value: 1975 },
          { columnId: 'services', value: 'Cold storage, freezer, blast freezing, dry storage, logistics' },
          { columnId: 'pallets', value: 29000 },
          { columnId: 'occupancy', value: 80 },
          { columnId: 'warehouses', value: 1 },
          { columnId: 'tech', value: 'WMS, product scanning' },
        ]},
      ],
    },
    {
      id: 'm-positioning',
      type: 'quadrant',
      tier: 2,
      priority: 60,
      groupKey: 'competition',
      heading: 'Market Positioning — Total Pallet Positions × Occupancy Rate',
      variant: 'positioning',
      axes: { x: 'Total Pallet Positions, 2022', y: 'Occupancy Rate (%)' },
      points: [
        { label: 'Lineage', x: 590000, y: 92, logoUrl: '/logos/lineage.svg', emphasis: true },
        { label: 'NewCold', x: 225000, y: 87, logoUrl: '/logos/newcold.svg' },
        { label: 'Americold', x: 226000, y: 87, logoUrl: '/logos/americold.svg' },
        { label: 'Laverton', x: 29000, y: 80, logoUrl: '/logos/laverton.svg' },
        { label: 'Linfox', x: 36000, y: 85, logoUrl: '/logos/linfox.svg' },
      ],
      opportunityZone: { label: 'Opportunity Area', xRange: [200000, 700000], yRange: [85, 100] },
    },
    {
      id: 'm-trends',
      type: 'cardGrid',
      tier: 2,
      priority: 50,
      groupKey: 'forward',
      heading: 'Recent Trends',
      variant: 'trends',
      cols: 2,
      cards: [
        { id: 't1', icon: 'Leaf', title: 'Sustainable Cold Chain Practices', body: 'Energy-efficient refrigeration, renewables, food-waste reduction via inventory management, eco-friendly packaging.', accent: 'purple' },
        { id: 't2', icon: 'Package', title: 'E-commerce & Home Delivery Expansion', body: 'COVID-accelerated; cold chain providers optimize last-mile, contactless delivery, real-time tracking + temp monitoring.', accent: 'periwinkle' },
        { id: 't3', icon: 'Database', title: 'Digitalization & Data Analytics', body: 'Cloud platforms, advanced analytics for visibility, operational optimization, data-driven decisions.', accent: 'perano' },
        { id: 't4', icon: 'Eye', title: 'Visibility & Traceability Focus', body: 'Blockchain, RFID, advanced tracking enable end-to-end supply chain visibility and product traceability.', accent: 'coral' },
      ],
    },
    {
      id: 'm-emerging-tech',
      type: 'nodes',
      tier: 2,
      priority: 48,
      groupKey: 'forward',
      heading: 'Emerging Technological Advancements',
      variant: 'constellation',
      nodes: [
        { id: 'n1', icon: 'Bot', label: 'Robotic Process Automation (RPA)', body: 'Software bots automate repetitive admin, data entry, documentation, compliance management.', exampleCompanies: ['Swire Cold Storage'] },
        { id: 'n2', icon: 'Wifi', label: 'IoT & Sensor Technology', body: 'Connected temperature/humidity sensors + location trackers enable real-time data, remote monitoring, automated alerts.', exampleCompanies: ['Cold Chain Technologies Australia'] },
        { id: 'n3', icon: 'Link', label: 'Blockchain Technology', body: 'Immutable, decentralized ledger ensures traceability, transparency, and authenticity across supply chain transactions.', exampleCompanies: ['Fresh Supply Co'] },
        { id: 'n4', icon: 'TrendingUp', label: 'Advanced Data Analytics & Predictive Modeling', body: 'Demand forecasting, inventory optimization, energy management, predictive equipment maintenance.' },
      ],
    },
    {
      id: 'm-regulatory',
      type: 'cardGrid',
      tier: 2,
      priority: 45,
      groupKey: 'forward',
      heading: 'Regulatory Landscape',
      variant: 'regulatory',
      cols: 2,
      cards: [
        { id: 'reg1', icon: 'Shield', title: 'Food Safety Standards (FSANZ)', body: 'Food Standards Australia New Zealand sets food handling, storage, transportation, and hygiene standards. Includes temperature control across cold chain.' },
        { id: 'reg2', icon: 'Snowflake', title: 'Cold Storage & Transport Regulations', body: 'State and territory rules govern construction, operation, maintenance of cold facilities and refrigerated vehicles. Covers temp control, equipment maintenance, record-keeping, hygiene.' },
        { id: 'reg3', icon: 'CheckCircle', title: 'Hazard Analysis Critical Control Points (HACCP)', body: 'Widely adopted food safety management framework. Identifies and manages critical control points where hazards can occur.' },
        { id: 'reg4', icon: 'AlertTriangle', title: 'Biosecurity Laws', body: 'Department of Agriculture, Water and the Environment oversees biosecurity. Import/export inspections, treatment protocols, certification protect cold chain integrity.' },
        { id: 'reg5', icon: 'Users', title: 'Chain of Responsibility (COR)', body: 'Transport operators, consignors, loaders, receivers share responsibility for safe, compliant transport — including temp-controlled products.' },
      ],
    },
    {
      id: 'm-future-chain',
      type: 'chart',
      tier: 1,
      priority: 70,
      groupKey: 'forward',
      heading: 'Future Outlook — Cold Chain Market 2022-2027F',
      subheading: 'Forecast CAGR 10.3%',
      chartType: 'combo',
      series: [
        { id: 'mkt', name: 'Market Size', type: 'bar', color: 'primary', data: [
          { x: 2022, y: 6547.8 }, { x: 2023, y: 7162.43 }, { x: 2024, y: 7867.3 },
          { x: 2025, y: 8685.2 }, { x: 2026, y: 9633.6 }, { x: 2027, y: 10705.0 },
        ]},
        { id: 'gr', name: 'Growth %', type: 'line', color: 'accent', data: [
          { x: 2022, y: 8.0 }, { x: 2023, y: 9.4 }, { x: 2024, y: 9.8 },
          { x: 2025, y: 10.4 }, { x: 2026, y: 10.9 }, { x: 2027, y: 11.1 },
        ]},
      ],
      yAxis: { label: 'Revenue', unit: 'AUD Mn', format: 'currency' },
    },
    {
      id: 'm-macro',
      type: 'macroPanel',
      tier: 3,
      priority: 30,
      groupKey: 'macro',
      heading: 'Macroeconomic Indicators',
      gated: true,
      panels: [
        { kind: 'kpi', label: 'GDP 2022', value: 'USD 1,450.0 Bn', sublabel: 'CAGR 0.3% (FY18-FY22)' },
        { kind: 'kpi', label: 'Population 2022', value: '25.9 Mn', sublabel: 'Area: 7.69M km²' },
        { kind: 'kpi', label: 'Imports 2022', value: 'AUD 513.2 Bn', sublabel: 'CAGR 5.8% (2018-22)' },
        { kind: 'kpi', label: 'Exports 2022', value: 'AUD 513.2 Bn', sublabel: 'CAGR 10.4% (2018-22)' },
        { kind: 'map', mapType: 'country', markers: [
          { name: 'Brisbane', lat: -27.5, lng: 153.0, label: 'Largest QLD seaport — fastest growing' },
          { name: 'Fremantle', lat: -32.06, lng: 115.74, label: 'Busiest WA — 35M tons/yr' },
          { name: 'Sydney', lat: -33.87, lng: 151.21 },
          { name: 'Melbourne', lat: -37.81, lng: 144.96 },
          { name: 'Adelaide', lat: -34.93, lng: 138.6 },
          { name: 'Newcastle', lat: -32.93, lng: 151.78 },
          { name: 'Darwin', lat: -12.46, lng: 130.84 },
          { name: 'Hedland', lat: -20.31, lng: 118.6 },
          { name: 'Dampier', lat: -20.66, lng: 116.71 },
          { name: 'Hay Point', lat: -21.27, lng: 149.3 },
        ]},
      ],
    },
    {
      id: 'm-methodology',
      type: 'flow',
      tier: 1,
      priority: 40,
      groupKey: 'methodology',
      heading: 'Research Methodology',
      variant: 'methodology',
      orientation: 'horizontal',
      steps: [
        { id: 'm1', icon: 'BookOpen', label: 'Secondary Research', body: 'Company reports, magazines, journals, articles, online resources, Department of Agriculture, IMF, World Bank, NMIS.' },
        { id: 'm2', icon: 'Phone', label: 'Primary Research', body: 'CATI interviews with 30+ companies — Lineage, Americold, NewCold, Linfox, Laverton, Karras, Auscold, P. Pullar, Oxford, Freezex.' },
        { id: 'm3', icon: 'Search', label: 'Sanity Checking', body: 'Desk research validates pallet/warehouse counts, financial parameters across captive and non-captive companies.' },
      ],
    },
    {
      id: 'm-inline-cta-3',
      type: 'inlineCTA',
      tier: 1,
      priority: 25,
      groupKey: 'methodology',
      variant: 'analyst-custom',
      headline: 'Have a question on the methodology?',
      body: 'Talk to the analyst directly, or commission a custom report scoped to your needs.',
    },
  ],

  faq: [
    { q: 'How big is the Australia cold chain market?', a: 'AUD 6,547.8 Mn in 2022.' },
    { q: 'How big is the Australia cold storage market?', a: 'AUD 2,647.8 Mn in 2022.' },
    { q: 'How big is the Australia cold transport market?', a: 'AUD 3,900.0 Mn in 2022.' },
    { q: 'Who are the major players in the Australia cold chain market?', a: 'Lineage, Americold, NewCold Advanced, Oxford Cold Storage are among the major players.' },
    { q: 'What drives the Australia cold storage market?', a: 'Demand for perishable goods, evolving consumer behavior + e-commerce, globalization of food supply chains, and technological advancements.' },
    { q: 'Which segment has the highest market share in the Australia cold chain market?', a: 'Cold transport — AUD 3,900.0 Mn in 2022.' },
    { q: 'What is the future of the Australia cold chain market?', a: 'Forecast AUD 10,705.0 Mn by 2027 at 10.03% CAGR (2022-2027).' },
  ],

  related: [
    { id: 'r-in-coldchain', title: 'India Cold Chain Market 2024', industry: 'Logistics', region: 'India', pages: 92, publishedDate: 'Q3 2024', slug: 'india-cold-chain-market-2024' },
    { id: 'r-vn-coldchain', title: 'Vietnam Cold Chain Logistics 2025', industry: 'Logistics', region: 'Vietnam', pages: 78, publishedDate: 'Q2 2025', slug: 'vietnam-cold-chain-logistics-2025' },
    { id: 'r-id-coldchain', title: 'Indonesia Cold Chain Market 2025', industry: 'Logistics', region: 'Indonesia', pages: 84, publishedDate: 'Q1 2025', slug: 'indonesia-cold-chain-market-2025' },
    { id: 'r-au-logistics', title: 'Australia E-commerce Logistics 2026', industry: 'Logistics', region: 'Australia', pages: 110, publishedDate: 'Q4 2025', slug: 'australia-ecommerce-logistics-2026' },
  ],

  methodology: {
    approach: 'Bottom-up market sizing combined with primary CATI interviews of 30+ cold chain companies. Aggregated pallet counts, occupancy rates, and per-pallet pricing across non-captive providers. NMIS warehouse counts cross-checked.',
    sampleSize: 100,
    geographies: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
    dataCollectionPeriod: 'October 2025 – February 2026',
    sources: [
      { type: 'primary', description: 'CATI with C-Level executives, directors, business development heads at 30+ cold chain operators' },
      { type: 'secondary', description: 'Department of Agriculture (Australia), IMF, World Bank, NMIS, company annual reports' },
    ],
    limitations: [
      'Market size estimated via modeling. Pallet counts and occupancy rates aggregated from multi-location interviews. NMIS warehouse data cross-validated.',
      'Major-player revenues confidential; not all companies shared individual figures.',
      'Segmentation totals may not sum precisely due to rounding.',
    ],
    respondentBreakdown: [
      { label: 'C-Level Executives', pct: 24 },
      { label: 'Director / VP', pct: 8 },
      { label: 'Key Account / BizDev Managers', pct: 60 },
      { label: 'Operational / Sales Heads', pct: 8 },
    ],
  },

  meta: {
    variant: 'editorial-A',
    tier: 'standard',
    authRequired: true,
    schemaVersion: '1.0',
  },
};
```

**Note:** above payload condensed for readability. Full implementation includes additional `mod.chart` modules for: cold storage market size, cold transport market size, pallets growth, price/pallet/week, occupancy rate, end-user revenue % (pie), end-user revenue AUD (bar), storage vs transport split (stacked), temperature range (pie), end-users in storage (donut), regional breakdown w/ map, reefer truck types (gauges), mode of transport (pie), domestic vs international (pie), future cold storage chart, future cold transport chart. Each mirrors PDF blocks 8-43.

---

## Sample 2: GCC Pharma Outlook (LIGHT — scalability validation)

```ts
export const GCC_PHARMA: ReportDetailHeavy = {
  id: 'r-gcc-pharma-2026',
  slug: 'gcc-pharmaceutical-market-outlook-2026',
  title: 'GCC Pharmaceutical Market Outlook 2026',
  industry: 'Healthcare',
  subIndustry: 'Pharmaceuticals',
  region: 'GCC',
  pages: 32,
  chartCount: 6,
  segmentCount: 4,
  publishedDate: 'Q4 2025',
  forecastHorizon: '2024-2029',
  authors: [
    { id: 'a-priya', name: 'Priya Mehta', role: 'Lead Analyst, Healthcare', portraitUrl: '/authors/priya.jpg' },
  ],
  oneLiner: 'Pharmaceutical market sizing and forecast across GCC — UAE, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain.',
  marketHighlights: [
    'GCC pharma USD 28.4 Bn in 2024.',
    'Forecast USD 41.2 Bn by 2029 — 7.7% CAGR.',
    'UAE leads with 32% regional share.',
  ],
  snapshotChart: {
    id: 'gcc-snap', type: 'chart', tier: 1, priority: 100, chartType: 'area',
    series: [{ id: 's1', name: 'Market', color: 'primary', data: [
      { x: 2024, y: 28.4 }, { x: 2025, y: 30.6 }, { x: 2026, y: 33.0 },
      { x: 2027, y: 35.5 }, { x: 2028, y: 38.3 }, { x: 2029, y: 41.2 },
    ]}],
    yAxis: { label: 'Market Size', unit: 'USD Bn', format: 'currency' },
  },
  toc: [
    { id: 'sec-overview', title: 'Executive Summary' },
    { id: 'sec-sizing', title: 'Market Sizing & Forecast' },
    { id: 'sec-segmentation', title: 'Segmentation by Country' },
    { id: 'sec-competition', title: 'Top Players' },
    { id: 'sec-methodology', title: 'Methodology' },
    { id: 'sec-faq', title: 'FAQs' },
  ],
  modules: [
    { id: 'm-defs', type: 'definitions', tier: 2, priority: 80, group: 'key', heading: 'Market Definitions',
      terms: [
        { term: 'GCC Pharma Market', body: 'Branded + generic pharmaceutical revenues across Gulf Cooperation Council member states.' },
        { term: 'OTC vs Rx', body: 'Over-the-counter drugs vs prescription-only pharmaceuticals.' },
      ]},
    { id: 'm-size', type: 'chart', tier: 1, priority: 90, heading: 'GCC Pharma Market Size 2024-2029',
      chartType: 'combo',
      series: [
        { id: 'mkt', name: 'Market', type: 'bar', color: 'primary',
          data: [{x:2024,y:28.4},{x:2025,y:30.6},{x:2026,y:33.0},{x:2027,y:35.5},{x:2028,y:38.3},{x:2029,y:41.2}] },
        { id: 'gr', name: 'Growth %', type: 'line', color: 'accent',
          data: [{x:2025,y:7.7},{x:2026,y:7.8},{x:2027,y:7.6},{x:2028,y:7.9},{x:2029,y:7.6}] },
      ],
      yAxis: { label: 'USD Bn', format: 'currency' },
    },
    { id: 'm-cta1', type: 'inlineCTA', tier: 1, priority: 50, variant: 'sample-analyst', headline: 'See the full segmentation', body: 'Sample includes UAE, KSA, Qatar, Kuwait, Oman, Bahrain breakdowns.' },
    { id: 'm-segment-country', type: 'chart', tier: 1, priority: 70, heading: 'Country-Level Segmentation 2024',
      chartType: 'pie',
      series: [{ id: 'split', name: 'Share', color: 'primary', data: [
        { x: 'UAE', y: 32 }, { x: 'Saudi Arabia', y: 28 }, { x: 'Qatar', y: 14 },
        { x: 'Kuwait', y: 12 }, { x: 'Oman', y: 9 }, { x: 'Bahrain', y: 5 },
      ]}],
    },
    { id: 'm-drivers', type: 'cardGrid', tier: 1, priority: 60, heading: 'Growth Drivers', variant: 'drivers', cols: 2,
      cards: [
        { id: 'd1', icon: 'Heart', title: 'Aging Population', body: 'GCC over-60 cohort growing 4%+ annually.', accent: 'purple' },
        { id: 'd2', icon: 'Building', title: 'Healthcare Infrastructure', body: 'Hospital and clinic counts up 18% (2019-2024).', accent: 'periwinkle' },
        { id: 'd3', icon: 'Globe', title: 'Medical Tourism', body: 'Inbound patient volume +22% in UAE alone.', accent: 'perano' },
        { id: 'd4', icon: 'FileCheck', title: 'Regulatory Reforms', body: 'Streamlined drug approval cycles across GCC.', accent: 'coral' },
      ],
    },
    { id: 'm-players', type: 'matrix', tier: 1, priority: 60, heading: 'Top Players', variant: 'comparison', stickyFirstColumn: true,
      columns: [
        { id: 'name', label: 'Company', format: 'logo' },
        { id: 'rev', label: 'GCC Revenue 2024 (USD Bn)', format: 'currency', align: 'right' },
        { id: 'share', label: 'Share', format: 'percent', align: 'right' },
      ],
      rows: [
        { id: 'p1', emphasis: true, cells: [
          { columnId: 'name', value: 'Pfizer GCC' },
          { columnId: 'rev', value: 4.8 },
          { columnId: 'share', value: 16.9 },
        ]},
        { id: 'p2', cells: [
          { columnId: 'name', value: 'Sanofi MENA' },
          { columnId: 'rev', value: 3.6 },
          { columnId: 'share', value: 12.7 },
        ]},
        { id: 'p3', cells: [
          { columnId: 'name', value: 'Julphar' },
          { columnId: 'rev', value: 2.4 },
          { columnId: 'share', value: 8.5 },
        ]},
      ],
    },
    { id: 'm-cta2', type: 'inlineCTA', tier: 1, priority: 40, variant: 'sample-custom', headline: 'Custom this report', body: 'Scope to a specific GCC country or therapeutic area.' },
    { id: 'm-methodology', type: 'flow', tier: 1, priority: 30, heading: 'Methodology', variant: 'methodology', orientation: 'horizontal',
      steps: [
        { id: 's1', icon: 'BookOpen', label: 'Secondary Research', body: 'GCC-Stat, IQVIA, country MoH publications.' },
        { id: 's2', icon: 'Phone', label: 'Primary Research', body: '24 industry interviews — manufacturers, distributors, regulators.' },
        { id: 's3', icon: 'Search', label: 'Validation', body: 'Cross-checked country revenue against trade data.' },
      ],
    },
    { id: 'm-cta3', type: 'inlineCTA', tier: 1, priority: 20, variant: 'analyst-custom', headline: 'Talk to the analyst', body: 'Get custom scoping or country-level deep-dives.' },
  ],
  faq: [
    { q: 'How big is the GCC pharma market?', a: 'USD 28.4 Bn in 2024.' },
    { q: 'Which country leads GCC pharma?', a: 'UAE — 32% regional share.' },
    { q: 'What is the GCC pharma forecast?', a: 'USD 41.2 Bn by 2029 at 7.7% CAGR.' },
  ],
  related: [
    { id: 'r-in-pharma', title: 'India Pharmaceutical Market Outlook 2026', industry: 'Healthcare', region: 'India', pages: 180, publishedDate: 'Q1 2026', slug: 'india-pharma-outlook-2026' },
  ],
  methodology: {
    approach: 'Bottom-up sizing across GCC member states; primary interviews with 24 industry stakeholders.',
    sampleSize: 24,
    geographies: ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Oman', 'Bahrain'],
    dataCollectionPeriod: 'July – September 2025',
    sources: [
      { type: 'primary', description: '24 interviews — manufacturers, distributors, regulators' },
      { type: 'secondary', description: 'GCC-Stat, IQVIA, country Ministry of Health publications' },
    ],
    limitations: [
      'Bahrain data sparse; estimated via comparator analysis with Oman.',
    ],
  },
  meta: { variant: 'editorial-A', tier: 'standard', authRequired: false, schemaVersion: '1.0' },
};
```

---

## Test cases this validates

1. **Heavy report renders without exhausting layout** — 30 modules, 6 clusters, all 3 variants must hold.
2. **Light report ≠ empty** — 12 modules trigger "expanded" hero treatment, side-by-side definitions, enlarged related-reports.
3. **Tier-3 gating** — `mod.macroPanel` (heavy) gated, `mod.macroPanel` absent in light report — both render correctly.
4. **No price language anywhere** — search payload: zero hits on `price`, `cost`, `$`, `quote`, `range`, `starting`. Only "Talk to Analyst" and "Custom This Report" surface money-talk.
5. **Schema parity across variants** — same `AU_COLD_CHAIN` payload renders in V1A, V1B, V1C with only `meta.variant` change.
