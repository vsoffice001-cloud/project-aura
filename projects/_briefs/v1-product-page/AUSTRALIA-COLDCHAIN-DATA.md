# AUSTRALIA COLD CHAIN · Mock-Data Source-of-Truth

> Structured content extracted from PRD V2.1 master-example section 6. This file is the source-of-truth for `src/lib/mock-data.ts` in the build. Every section maps to a PDP module. Numerical anchors locked from PRD; segmentation breakdowns marked `[PRD verbatim]` where extracted directly, `[derived placeholder]` where realistic dummy filled pending verbatim paste.

---

## 1 · Report identity

```ts
report = {
  id: "au-cold-chain-2022-2027",
  title: "Australia Cold Chain Market (2022-2027)",
  geography: "Australia",
  geographyIso: "AU",
  sector: "Logistics · Cold Chain",
  subSectors: ["Pharma cold chain", "F&B cold chain", "Cold storage", "Cold transport"],
  historicalWindow: { from: 2017, to: 2022 },
  forecastWindow: { from: 2022, to: 2027 },
  analyst: { name: "Geetanshi Chugh", title: "Analyst — Logistics & Supply Chain" },
  publishedAt: "2025-11-01",
  pages: 90,
  productCode: "KR-AU-CC-2025-11",
  currency: "AUD",
  unit: "Mn"
}
```

---

## 2 · Hero data

```ts
hero = {
  h1: "Australia Cold Chain Market 2022–2027",
  promise: "Capacity, temperature mix, end-user demand, and the AUD 10.7 Bn forecast — decoded.",
  primaryMetric: {
    label: "Market size · 2022",
    value: 6547.8,
    unit: "AUD Mn",
    formatted: "AUD 6,547.8 Mn"
  },
  forecastMetric: {
    label: "Forecast · 2027",
    value: 10705.0,
    unit: "AUD Mn",
    formatted: "AUD 10,705.0 Mn"
  },
  cagr: {
    label: "CAGR · 2022-2027",
    value: 10.03,
    formatted: "10.03 %"
  },
  segmentTags: [
    "Cold Storage", "Cold Transport", "Pharma", "F&B",
    "Chilled", "Frozen", "3PL", "Road · Rail · Sea · Air"
  ],
  cockpitToggles: {
    geography: ["Australia"],          // only one for this report
    timeframe: ["2017-2022 historical", "2022-2027 forecast", "Full 2017-2027"],
    variant: ["editorial-light", "cinematic-dark"]  // demo toggle
  },
  ctas: {
    primary: { label: "Download Sample Report", action: "download-sample" },
    secondary: { label: "Get Customized Report", action: "customize-request" },
    tertiary: { label: "Talk to Analyst", action: "talk-analyst" }
  }
}
```

---

## 3 · Key stats strip (6 cards)

```ts
keyStats = [
  {
    id: "ks-1",
    label: "Market size 2022",
    value: "AUD 6,547.8 Mn",
    trend: { direction: "up", pct: 54.7, base: "vs 2017" },
    access: "free",
    treatment: "primary-emphasis"
  },
  {
    id: "ks-2",
    label: "Forecast 2027",
    value: "AUD 10,705.0 Mn",
    trend: { direction: "up", pct: 63.5, base: "vs 2022" },
    access: "free",
    treatment: "primary-emphasis"
  },
  {
    id: "ks-3",
    label: "CAGR 2022-2027",
    value: "10.03 %",
    trend: { direction: "up", pct: null, base: "5-yr forecast" },
    access: "free",
    treatment: "primary-emphasis"
  },
  {
    id: "ks-4",
    label: "Cold Storage share",
    value: "~62 %",           // [derived placeholder]
    trend: { direction: "neutral", pct: null, base: "of 2022 market" },
    access: "gated-sample",
    treatment: "secondary"
  },
  {
    id: "ks-5",
    label: "Pharma end-user growth",
    value: "12.4 % CAGR",     // [derived placeholder]
    trend: { direction: "up", pct: null, base: "2022-2027" },
    access: "gated",
    treatment: "secondary"
  },
  {
    id: "ks-6",
    label: "Top-5 player share",
    value: "~58 %",           // [derived placeholder]
    trend: { direction: "neutral", pct: null, base: "of 2022 market" },
    access: "gated",
    treatment: "secondary"
  }
]
```

---

## 4 · Chart modules (×7)

### Chart 1 · Historical market size

```ts
chart1 = {
  id: "chart-historical-size",
  title: "Australia Cold Chain Market Size · 2017-2022",
  type: "line",                       // @ken-research/charts type
  source: "Ken Research · Nov 2025",
  unit: "AUD Mn",
  access: "free",
  data: [
    { year: 2017, value: 4231.1 },    // [PRD verbatim]
    { year: 2018, value: 4612.5 },    // [derived placeholder]
    { year: 2019, value: 5034.8 },    // [derived placeholder]
    { year: 2020, value: 5298.2 },    // [derived placeholder · post-COVID dip mod]
    { year: 2021, value: 5891.4 },    // [derived placeholder]
    { year: 2022, value: 6547.8 }     // [PRD verbatim]
  ],
  previewRules: { showLastN: 6, showAxisLabels: true, showLegend: true }
}
```

### Chart 2 · Forecast market size

```ts
chart2 = {
  id: "chart-forecast-size",
  title: "Future Market Size of Australia Cold Chain Market · 2022-2027",
  type: "line",
  source: "Ken Research forecasting model · Nov 2025",
  unit: "AUD Mn",
  access: "free",
  data: [
    { year: 2022, value: 6547.8 },    // [PRD verbatim · anchor]
    { year: 2023, value: 7203.6 },    // [derived placeholder · CAGR-implied]
    { year: 2024, value: 7926.7 },
    { year: 2025, value: 8721.2 },
    { year: 2026, value: 9594.0 },
    { year: 2027, value: 10705.0 }    // [PRD verbatim]
  ],
  annotations: [
    { year: 2027, label: "CAGR 10.03%", anchor: "right" }
  ],
  previewRules: { showLastN: 6, showAxisLabels: true, showLegend: true, showAnnotations: true }
}
```

### Chart 3 · Segmentation by service type

```ts
chart3 = {
  id: "chart-seg-service",
  title: "Cold Chain Market by Service Type · 2022",
  type: "donut",
  source: "Ken Research · Nov 2025",
  unit: "share %",
  access: "gated-sample",
  data: [                                // [derived placeholder]
    { segment: "Cold Storage", share: 62 },
    { segment: "Cold Transport", share: 31 },
    { segment: "Value-added Services", share: 7 }
  ],
  previewRules: { showLabels: true, showLegend: true, showSourceFootnote: true }
}
```

### Chart 4 · Stacked segmentation · service × temperature

```ts
chart4 = {
  id: "chart-seg-stacked",
  title: "Cold Chain by Service × Temperature Range · 2022",
  type: "stacked-bar",
  source: "Ken Research · Nov 2025",
  unit: "AUD Mn",
  access: "gated",
  data: [                                // [derived placeholder]
    { service: "Cold Storage", chilled: 1820, frozen: 1612, deepFrozen: 510, controlledAmbient: 118 },
    { service: "Cold Transport", chilled: 1010, frozen: 740, deepFrozen: 240, controlledAmbient: 40 },
    { service: "Value-added", chilled: 230, frozen: 145, deepFrozen: 60, controlledAmbient: 22 }
  ]
}
```

### Chart 5 · Competitor share

```ts
chart5 = {
  id: "chart-competitor-share",
  title: "Top Players · Market Share 2022",
  type: "donut",
  source: "Ken Research analyst interviews · Nov 2025",
  unit: "share %",
  access: "gated",
  data: [                                // [derived placeholder]
    { player: "Americold", share: 18 },
    { player: "Newcold", share: 14 },
    { player: "Lineage Logistics", share: 11 },
    { player: "Linfox Cold", share: 9 },
    { player: "Swire Cold Storage", share: 6 },
    { player: "Others (long tail)", share: 42 }
  ]
}
```

### Chart 6 · Macroeconomic context

```ts
chart6 = {
  id: "chart-macro",
  title: "GDP & Inflation · Australia · 2017-2022",
  type: "dual-axis-line",
  source: "ABS · RBA · Ken Research compile · Nov 2025",
  unit: "% YoY",
  access: "free",
  data: [                                // [derived placeholder]
    { year: 2017, gdp: 2.4, inflation: 1.9 },
    { year: 2018, gdp: 2.8, inflation: 1.9 },
    { year: 2019, gdp: 1.9, inflation: 1.6 },
    { year: 2020, gdp: -0.3, inflation: 0.9 },
    { year: 2021, gdp: 5.2, inflation: 2.9 },
    { year: 2022, gdp: 3.6, inflation: 6.6 }
  ]
}
```

### Chart 7 · Positioning matrix

```ts
chart7 = {
  id: "chart-positioning",
  title: "Competitor Positioning · Service Breadth × Geographic Footprint",
  type: "bubble",
  source: "Ken Research analyst interviews · Nov 2025",
  unit: "subjective score 1-10",
  access: "gated",
  axes: { x: "Service Breadth", y: "Geographic Footprint", size: "Revenue 2022" },
  data: [                                // [derived placeholder]
    { player: "Americold", x: 8, y: 9, size: 1180 },
    { player: "Newcold", x: 7, y: 7, size: 916 },
    { player: "Lineage", x: 9, y: 8, size: 720 },
    { player: "Linfox Cold", x: 6, y: 8, size: 589 },
    { player: "Swire Cold", x: 5, y: 6, size: 393 }
  ]
}
```

---

## 5 · Segmentation tabs (8 dimensions)

```ts
segmentation = [
  {
    id: "seg-1-service",
    label: "By Service Type",
    dimensions: ["Cold Storage", "Cold Transport", "Value-added Services"],
    uiModule: "donut + table",
    access: "gated-sample",
    note: "Cold Storage dominant ~62%"
  },
  {
    id: "seg-2-temperature",
    label: "By Temperature Range",
    dimensions: ["Chilled (0-15°C)", "Frozen (-18°C)", "Deep-frozen (-25°C)", "Controlled-ambient (15-25°C)"],
    uiModule: "horizontal-bar + table",
    access: "gated"
  },
  {
    id: "seg-3-enduser",
    label: "By End-User",
    dimensions: ["F&B", "Pharma", "Chemicals", "Other"],
    uiModule: "donut + growth-table",
    access: "gated-sample",
    note: "Pharma fastest-growing end-user · 12.4% CAGR forecast"
  },
  {
    id: "seg-4-application",
    label: "By Application",
    dimensions: ["Dairy", "Meat & seafood", "Fresh produce", "Vaccines", "Specialty pharma", "Confectionery", "Beverages", "Bakery"],
    uiModule: "stacked-bar + table",
    access: "gated"
  },
  {
    id: "seg-5-transport",
    label: "By Mode of Transport",
    dimensions: ["Road", "Rail", "Sea", "Air"],
    uiModule: "donut",
    access: "gated",
    note: "Road dominant · Sea growing on import-led perishables"
  },
  {
    id: "seg-6-packaging",
    label: "By Packaging / Container",
    dimensions: ["Pallets", "Bulk", "Reefer containers", "Insulated boxes"],
    uiModule: "horizontal-bar",
    access: "gated"
  },
  {
    id: "seg-7-region",
    label: "By Region · intra-Australia",
    dimensions: ["NSW", "Victoria", "Queensland", "Western Australia", "South Australia", "Tasmania", "Northern Territory", "ACT"],
    uiModule: "choropleth + table",
    access: "gated"
  },
  {
    id: "seg-8-ownership",
    label: "By Ownership / Contract",
    dimensions: ["3PL outsourced", "In-house captive", "Hybrid"],
    uiModule: "donut",
    access: "gated"
  }
]
```

---

## 6 · Ecosystem

```ts
ecosystem = {
  players: [
    { name: "Americold",            type: "global · 3PL",    established: 1903 },
    { name: "Newcold",              type: "global · 3PL",    established: 2012 },
    { name: "Lineage Logistics",    type: "global · 3PL",    established: 2008 },
    { name: "Linfox Cold",          type: "AU · 3PL",        established: 1956 },
    { name: "Swire Cold Storage",   type: "AU · 3PL",        established: 1947 },
    { name: "Australian Cold Stores", type: "AU · 3PL",      established: 1925 },
    { name: "Polar Fresh",          type: "AU · specialist", established: 1996 },
    { name: "Oxford Cold Storage",  type: "AU · specialist", established: 1968 },
    { name: "NewCold AU",           type: "AU · subsidiary", established: 2016 }
  ],
  associations: [
    { name: "Refrigerated Warehouse & Transport Association of Australia (RWTA)", role: "industry body" },
    { name: "Australian Logistics Council (ALC)",                                   role: "industry body" },
    { name: "FSANZ",                                                                role: "regulator · food safety" },
    { name: "ABS",                                                                  role: "data · statistics" },
    { name: "APVMA",                                                                role: "regulator · agri-chem residue" },
    { name: "DAFF",                                                                 role: "regulator · biosecurity · imports" }
  ],
  tabs: ["Top players", "Associations & regulators", "New entrants", "Ecosystem map"],
  access: { players: "free", associations: "free", newEntrants: "gated", ecosystemMap: "gated-sample" }
}
```

---

## 7 · Competitor

```ts
competitor = {
  timeline: [                            // [derived placeholder · year of AU entry / major capacity event]
    { year: 1925, player: "Australian Cold Stores", event: "Founded · NSW" },
    { year: 1947, player: "Swire Cold Storage",     event: "AU operations start" },
    { year: 1956, player: "Linfox Cold",            event: "Founded · VIC" },
    { year: 1968, player: "Oxford Cold Storage",    event: "VIC operations" },
    { year: 1996, player: "Polar Fresh",            event: "Specialty cold start" },
    { year: 2010, player: "Americold",              event: "AU acquisition" },
    { year: 2016, player: "NewCold AU",             event: "Melbourne facility build" },
    { year: 2019, player: "Lineage Logistics",      event: "AU expansion · acquisition" }
  ],
  marketShare2022: {                     // [derived placeholder · matches chart5]
    top5: 58,
    longTail: 42,
    leaders: ["Americold 18%", "Newcold 14%", "Lineage 11%", "Linfox 9%", "Swire 6%"]
  },
  positioningMatrix: {                   // [derived placeholder · matches chart7]
    axes: { x: "Service Breadth", y: "Geographic Footprint" },
    leaders: ["Americold", "Lineage"],
    challengers: ["Newcold", "Linfox Cold"],
    specialists: ["Polar Fresh", "Oxford Cold Storage"]
  },
  comparisonTable: {                     // [derived placeholder]
    columns: ["Player", "Capacity (m³)", "Temp ranges", "Geographic coverage", "Key clients"],
    rows: [
      { player: "Americold",       capacity: 1200000, temps: "Chilled · Frozen · Deep-frozen", coverage: "National · 12 facilities", clients: "Coles · Woolworths · McCain" },
      { player: "Newcold",         capacity:  900000, temps: "Frozen · Deep-frozen",            coverage: "VIC · NSW · 4 facilities", clients: "Simplot · Patties · McCain" },
      { player: "Lineage",         capacity:  750000, temps: "Chilled · Frozen",                coverage: "National · 8 facilities",  clients: "Cargill · JBS · Inghams" },
      { player: "Linfox Cold",     capacity:  620000, temps: "Chilled · Frozen",                coverage: "National · 6 facilities",  clients: "Coles · Lion · Bega" },
      { player: "Swire Cold",      capacity:  410000, temps: "Chilled · Frozen",                coverage: "QLD · NSW · 3 facilities", clients: "JBS · Teys · Costa" }
    ]
  },
  access: { timeline: "gated-sample", marketShare: "gated", positioning: "gated", comparisonTable: "gated" }
}
```

---

## 8 · Methodology (4 stages)

```ts
methodology = [
  {
    stage: 1,
    label: "Desk Research",
    description: "Government & regulator data · trade association reports · listed-company filings · published industry surveys.",
    inputs: ["ABS freight & storage stats", "APVMA registrations", "PBS pharmaceutical cold-chain", "DAFF biosecurity imports", "RWTA industry surveys", "Listed-co annual reports (Lineage, Americold etc.)"],
    duration: "3 weeks",
    icon: "library"
  },
  {
    stage: 2,
    label: "Primary Research",
    description: "Analyst interviews with senior cold-chain leadership across operators, shippers, and regulators.",
    inputs: [
      "20+ interviews with cold-chain leads (Americold, Newcold, Lineage, Linfox, NewCold AU, smaller 3PLs)",
      "Shipper-side interviews (Coles · Woolworths · pharma majors)",
      "Regulator briefings (FSANZ · DAFF)"
    ],
    duration: "4 weeks",
    icon: "interview"
  },
  {
    stage: 3,
    label: "Modelling",
    description: "Bottom-up sizing (capacity × utilisation × rate-card) cross-validated against top-down (GDP-linked + import/export elasticity).",
    inputs: [
      "Capacity m³ per facility (from primary)",
      "Utilisation % by temp range & region",
      "Rate-card per m³ per month per temp range",
      "Top-down: GDP elasticity · perishable-import elasticity"
    ],
    duration: "3 weeks",
    icon: "model"
  },
  {
    stage: 4,
    label: "Quality & Validation",
    description: "Sanity checks against ABS freight data plus 3 rounds of expert review with named industry advisors.",
    inputs: [
      "ABS freight movement cross-check",
      "3-round expert review panel",
      "Variance analysis vs prior-year Ken model",
      "Confidence-band derivation for forecast"
    ],
    duration: "2 weeks",
    icon: "check"
  }
]
```

---

## 9 · Macroeconomic anchors (free preview content)

```ts
macro = {
  gdpGrowth: [                          // [derived placeholder]
    { year: 2017, pct: 2.4 }, { year: 2018, pct: 2.8 }, { year: 2019, pct: 1.9 },
    { year: 2020, pct: -0.3 }, { year: 2021, pct: 5.2 }, { year: 2022, pct: 3.6 }
  ],
  inflation: [
    { year: 2017, pct: 1.9 }, { year: 2018, pct: 1.9 }, { year: 2019, pct: 1.6 },
    { year: 2020, pct: 0.9 }, { year: 2021, pct: 2.9 }, { year: 2022, pct: 6.6 }
  ],
  population2022: 25978900,             // [derived placeholder · ABS estimate]
  importsRelevant: {
    perishables2022_AUD_Bn: 18.4,       // [derived placeholder]
    pharma2022_AUD_Bn: 14.7
  }
}
```

---

## 10 · Access-rule legend

| Tag | Meaning | UI treatment |
|---|---|---|
| `free` | Always visible · no gate | No badge · full render |
| `gated-sample` | Visible in sample · download to see full | "Sample" badge · partial render w/ blurred extension OR truncated table |
| `gated` | Hidden behind purchase · teaser only | Lock badge · placeholder chart · "Unlock with full report" CTA |

---

## 11 · Verbatim provenance flags

- Items marked `[PRD verbatim]` are extracted directly from the PRD V2.1 master-example text in the task brief and are LOCKED.
- Items marked `[derived placeholder]` are realistic dummy data filled to support design composition. Replace with verbatim PRD V2.1 body when paste is provided. Every such marker must be flagged in the build with a `// TODO: replace w/ verbatim PRD data` comment.

---

**Locked anchors (DO NOT EDIT without PRD update):**
- 2017 size: AUD 4,231.1 Mn
- 2022 size: AUD 6,547.8 Mn
- 2027 forecast: AUD 10,705.0 Mn
- CAGR 2022-2027: 10.03 %
- Analyst: Geetanshi Chugh
- Published: Nov 2025
- Pages: 90
