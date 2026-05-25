# MOCK-DATA-MEDIUM · India Confectionery Market 2024-2029

> **Scenario · B (Medium-data fidelity).** Realistic mid-tier Ken Research report. Partial section coverage — proves that PDP sections hide gracefully when CMS data is missing. All numbers are INVENTED placeholders for design composition (NOT real Ken Research data). Schema mirrors `AUSTRALIA-COLDCHAIN-DATA.md` so the same `mock-data.ts` shape can plug in this report and re-render the page.

---

## 1 · Report identity

```ts
report = {
  id: "in-confectionery-2024-2029",
  title: "India Confectionery Market (2024-2029)",
  geography: "India",
  geographyIso: "IN",
  sector: "Food & Beverages · Confectionery",
  subSectors: ["Chocolate", "Sugar confectionery", "Gum"],
  historicalWindow: { from: 2019, to: 2024 },
  forecastWindow: { from: 2024, to: 2029 },
  analyst: { name: "Rahul Mehta", title: "Senior Analyst — F&B" },
  publishedAt: "2026-02-14",
  pages: 62,
  productCode: "KR-IN-CONF-2026-02",
  currency: "INR",
  unit: "Cr"   // Crore
}
```

---

## 2 · Hero data

```ts
hero = {
  h1: "India Confectionery Market 2024–2029",
  promise: "Chocolate boom, sugar-confectionery resilience, premiumisation and the INR 52,840 Cr forecast — unpacked.",
  primaryMetric: {
    label: "Market size · 2024",
    value: 34210.0,
    unit: "INR Cr",
    formatted: "INR 34,210 Cr"
  },
  forecastMetric: {
    label: "Forecast · 2029",
    value: 52840.0,
    unit: "INR Cr",
    formatted: "INR 52,840 Cr"
  },
  cagr: {
    label: "CAGR · 2024-2029",
    value: 9.10,
    formatted: "9.10 %"
  },
  segmentTags: [
    "Chocolate", "Sugar confectionery", "Gum", "Premium", "Mass market", "Modern trade", "GT"
  ],
  cockpitToggles: {
    geography: ["India"],
    timeframe: ["2019-2024 historical", "2024-2029 forecast"],
    variant: ["editorial-light", "cinematic-dark"]
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
  { id: "ks-1", label: "Market size 2024", value: "INR 34,210 Cr",
    trend: { direction: "up", pct: 42.6, base: "vs 2019" }, access: "free", treatment: "primary-emphasis" },
  { id: "ks-2", label: "Forecast 2029",    value: "INR 52,840 Cr",
    trend: { direction: "up", pct: 54.5, base: "vs 2024" }, access: "free", treatment: "primary-emphasis" },
  { id: "ks-3", label: "CAGR 2024-2029",   value: "9.10 %",
    trend: { direction: "up", pct: null, base: "5-yr forecast" }, access: "free", treatment: "primary-emphasis" },
  { id: "ks-4", label: "Chocolate share",  value: "~58 %",
    trend: { direction: "neutral", pct: null, base: "of 2024 market" }, access: "gated-sample", treatment: "secondary" },
  { id: "ks-5", label: "Premium-tier growth", value: "13.4 % CAGR",
    trend: { direction: "up", pct: null, base: "2024-2029" }, access: "gated", treatment: "secondary" },
  { id: "ks-6", label: "Top-5 player share", value: "~71 %",
    trend: { direction: "neutral", pct: null, base: "of 2024 market" }, access: "gated", treatment: "secondary" }
]
```

---

## 4 · Chart modules (×2 ONLY · vs 7 in MAX scenario)

### Chart 1 · Historical market size

```ts
chart1 = {
  id: "chart-historical-size",
  title: "India Confectionery Market Size · 2019-2024",
  type: "line",
  source: "Ken Research · Feb 2026",
  unit: "INR Cr",
  access: "free",
  data: [
    { year: 2019, value: 23990.0 },
    { year: 2020, value: 22150.0 },   // COVID dip
    { year: 2021, value: 25840.0 },
    { year: 2022, value: 28960.0 },
    { year: 2023, value: 31420.0 },
    { year: 2024, value: 34210.0 }
  ],
  previewRules: { showLastN: 6, showAxisLabels: true, showLegend: true }
}
```

### Chart 2 · Forecast market size

```ts
chart2 = {
  id: "chart-forecast-size",
  title: "Future Market Size of India Confectionery Market · 2024-2029",
  type: "line",
  source: "Ken Research forecasting model · Feb 2026",
  unit: "INR Cr",
  access: "free",
  data: [
    { year: 2024, value: 34210.0 },
    { year: 2025, value: 37320.0 },
    { year: 2026, value: 40720.0 },
    { year: 2027, value: 44430.0 },
    { year: 2028, value: 48460.0 },
    { year: 2029, value: 52840.0 }
  ],
  annotations: [
    { year: 2029, label: "CAGR 9.10%", anchor: "right" }
  ],
  previewRules: { showLastN: 6, showAxisLabels: true, showLegend: true, showAnnotations: true }
}
```

**NOT INCLUDED in medium scenario:** Chart 3 (service-type donut · N/A for confectionery), Chart 4 (stacked seg · gated and skipped), Chart 5 (competitor share donut · only top-5 table provided instead), Chart 6 (macro dual-axis · NOT covered in this report scope), Chart 7 (positioning matrix · NOT in scope).

---

## 5 · Segmentation tabs (3 dimensions · vs 8 in MAX scenario)

```ts
segmentation = [
  {
    id: "seg-1-product-type",
    label: "By Product Type",
    dimensions: ["Chocolate", "Sugar confectionery", "Gum"],
    uiModule: "donut + table",
    access: "gated-sample",
    note: "Chocolate dominant ~58%"
  },
  {
    id: "seg-2-price-tier",
    label: "By Price Tier",
    dimensions: ["Mass market", "Mid-tier", "Premium", "Luxury imports"],
    uiModule: "horizontal-bar + table",
    access: "gated",
    note: "Premium-tier fastest-growing · 13.4% CAGR forecast"
  },
  {
    id: "seg-3-channel",
    label: "By Distribution Channel",
    dimensions: ["General trade", "Modern trade", "E-commerce", "Direct-to-consumer"],
    uiModule: "donut",
    access: "gated"
  }
]
```

**NOT INCLUDED:** By Application, By Packaging, By Region (intra-India · skipped to limit scope), By Ingredient Source, By Consumer Demographic.

---

## 6 · Ecosystem (PARTIAL · players only · associations NOT included)

```ts
ecosystem = {
  players: [
    { name: "Cadbury India (Mondelez)", type: "MNC · mass + premium",  established: 1948 },
    { name: "Nestlé India",             type: "MNC · mass + premium",  established: 1959 },
    { name: "Ferrero India",            type: "MNC · premium · imports", established: 2007 },
    { name: "ITC Foods",                type: "domestic · mass",        established: 2003 },
    { name: "Parle Products",           type: "domestic · mass",        established: 1929 }
  ],
  associations: null,        // NOT covered in this report
  tabs: ["Top players"],     // only one tab · "Associations & regulators", "New entrants", "Ecosystem map" hidden
  access: { players: "free" }
}
```

**NOT INCLUDED:** associations & regulators · new entrants · ecosystem map · regulatory bodies (FSSAI etc.). Section renders w/ single tab only.

---

## 7 · Competitor (LIGHT · top-5 comparison table only · NO positioning matrix · NO timeline)

```ts
competitor = {
  timeline: null,                  // NOT covered
  marketShare2024: {
    top5: 71,
    longTail: 29,
    leaders: ["Cadbury (Mondelez) 28%", "Nestlé 19%", "Ferrero 11%", "ITC 8%", "Parle 5%"]
  },
  positioningMatrix: null,         // NOT covered
  comparisonTable: {
    columns: ["Player", "Revenue 2024 (INR Cr)", "Key brands", "Geographic coverage", "Channel mix"],
    rows: [
      { player: "Cadbury India",  revenue: 9580, brands: "Dairy Milk · 5 Star · Bournville · Gems", coverage: "Pan-India · 1.5M outlets",  channels: "GT 62 · MT 22 · E-com 16" },
      { player: "Nestlé India",   revenue: 6500, brands: "KitKat · Munch · Milkybar · Polo",        coverage: "Pan-India · 1.4M outlets",  channels: "GT 65 · MT 21 · E-com 14" },
      { player: "Ferrero India",  revenue: 3760, brands: "Ferrero Rocher · Kinder Joy · Tic Tac",   coverage: "Tier 1-3 · 480k outlets",   channels: "GT 48 · MT 32 · E-com 20" },
      { player: "ITC Foods",      revenue: 2740, brands: "Fabelle · Candyman · Mint-o",             coverage: "Pan-India · 1.1M outlets",  channels: "GT 71 · MT 18 · E-com 11" },
      { player: "Parle Products", revenue: 1710, brands: "Melody · Mango Bite · Kismi · Poppins",   coverage: "Pan-India · 1.6M outlets",  channels: "GT 84 · MT 12 · E-com 4" }
    ]
  },
  access: { marketShare: "gated", comparisonTable: "gated" }
}
```

---

## 8 · Methodology (summary form · 2 stages described · vs 4 stages full in MAX)

```ts
methodology = [
  {
    stage: 1,
    label: "Desk + Primary Research",
    description: "FSSAI registrations · listed-company filings (Mondelez · Nestlé · ITC) · Euromonitor cross-check · 12 analyst interviews with brand and channel leadership.",
    inputs: ["FSSAI database", "Listed-co annual reports", "Channel-partner interviews", "Modern-trade scan data"],
    duration: "5 weeks",
    icon: "library"
  },
  {
    stage: 2,
    label: "Modelling & Validation",
    description: "Top-down GDP-elasticity + bottom-up by SKU sales × ASP, validated against listed-co revenue and brand-share Nielsen panel.",
    inputs: ["GDP elasticity model", "SKU × ASP roll-up", "Nielsen Retail Audit triangulation"],
    duration: "3 weeks",
    icon: "model"
  }
]
```

**NOT INCLUDED:** Stage-by-stage 4-step breakdown (collapsed to 2-stage summary). No expert-panel review documented.

---

## 9 · FAQ (4 entries · vs 8-10 in MAX scenario)

```ts
faq = [
  { q: "What is the size of the India confectionery market in 2024?", a: "INR 34,210 Cr in 2024, growing at 9.10% CAGR to INR 52,840 Cr by 2029." },
  { q: "Which segment leads the market?", a: "Chocolate dominates with ~58% of the 2024 market, driven by premiumisation and gifting." },
  { q: "Who are the top players?", a: "Cadbury (Mondelez), Nestlé India, Ferrero India, ITC Foods, and Parle Products collectively hold ~71% share." },
  { q: "What is driving growth?", o: "Premiumisation, e-commerce expansion, gifting culture, and rising disposable income in Tier-2/3 cities." }
]
```

---

## 10 · Sections NOT INCLUDED in this report

| Section | Reason | UI behaviour |
|---|---|---|
| Country / infrastructure context | Not in report scope | Section hidden · nav item hidden |
| Taxonomy / industry map | Not authored | Section hidden |
| Positioning matrix | No analyst scoring | Tab removed from competitor module |
| Trends section | Embedded in exec summary instead of own section | Section hidden |
| Regulatory framework | Not in report scope (FSSAI mentioned in passing only) | Section hidden |
| Macroeconomic indicators (chart 6) | Not in scope | Section hidden |
| Stacked-segmentation chart (chart 4) | Not modelled | Chart hidden |
| Competitor positioning bubble (chart 7) | Not modelled | Chart hidden |
| Service-type donut (chart 3) | N/A for product-market | Chart hidden |
| Intra-country region segmentation | Not in scope | Tab removed |
| Packaging segmentation | Not in scope | Tab removed |
| Ownership / contract segmentation | N/A for product-market | Tab removed |
| Mode-of-transport segmentation | N/A | Tab removed |
| Ecosystem associations · new entrants · ecosystem map | Not authored | Tabs removed |
| Methodology stages 3-4 | Collapsed into stage 2 | Steps hidden |

---

## 11 · Access mix summary

- Free: Hero · 3 key stats · charts 1-2 · top-5 player list · methodology summary · FAQ · exec summary
- Gated-sample: Product-type segmentation · chocolate share stat
- Gated: Price-tier segmentation · channel segmentation · competitor comparison table · market-share leaderboard · premium-tier growth stat · top-5 share stat

---

## 12 · What this scenario proves

1. **Charts**: from 7 → 2. Sections without data hide entirely. No empty chart cards.
2. **Segmentation**: from 8 → 3 tabs. Tab strip renders w/ fewer pills, no empty tabs.
3. **Competitor**: timeline + positioning matrix missing — section degrades to comparison table only.
4. **Ecosystem**: only 1 tab of 4 — single-tab mode (no tab strip rendered or auto-promote to header).
5. **Methodology**: 4 stages → 2. Stage cards render in shorter horizontal flow.
6. **FAQ**: 4 entries vs 8+ — section still renders (above 3-entry minimum).
7. **Modular composition** holds — page renders coherently w/o broken empty modules.

---

**File word count target: ~1,800.**
