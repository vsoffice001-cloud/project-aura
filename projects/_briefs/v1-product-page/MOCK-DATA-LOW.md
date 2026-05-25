# MOCK-DATA-LOW · Vietnam EV Charging Outlook 2024-2027

> **Scenario · C (Low-data fidelity).** Niche early-stage Ken Research outlook report. Thin coverage — proves that extreme thin-data still renders professionally without empty cards, broken sections, or placeholder padding. All numbers are INVENTED placeholders for design composition (NOT real Ken Research data). Schema mirrors `AUSTRALIA-COLDCHAIN-DATA.md` so the same `mock-data.ts` shape can plug in this report and re-render.

---

## 1 · Report identity

```ts
report = {
  id: "vn-ev-charging-2024-2027",
  title: "Vietnam EV Charging Outlook (2024-2027)",
  geography: "Vietnam",
  geographyIso: "VN",
  sector: "Energy · EV Infrastructure",
  subSectors: ["AC charging", "DC fast charging"],
  historicalWindow: null,                              // no historical window — outlook report only
  forecastWindow: { from: 2024, to: 2027 },
  analyst: { name: "Tran Quoc Anh", title: "Analyst — Energy & Mobility" },
  publishedAt: "2026-01-20",
  pages: 28,
  productCode: "KR-VN-EVC-2026-01",
  currency: "USD",
  unit: "Mn"
}
```

**Note:** `historicalWindow: null` — hero historical-size pill should hide, hero promise reframes to forecast-only narrative.

---

## 2 · Hero data (thin · forecast-only)

```ts
hero = {
  h1: "Vietnam EV Charging Outlook 2024–2027",
  promise: "Public charging build-out, VinFast tailwind, and the USD 280 Mn 2027 outlook — early signals.",
  primaryMetric: {
    label: "Market size · 2024",
    value: 84.0,
    unit: "USD Mn",
    formatted: "USD 84 Mn"
  },
  forecastMetric: {
    label: "Forecast · 2027",
    value: 280.0,
    unit: "USD Mn",
    formatted: "USD 280 Mn"
  },
  cagr: {
    label: "CAGR · 2024-2027",
    value: 49.30,
    formatted: "49.30 %"
  },
  segmentTags: [
    "AC charging", "DC fast", "Public", "Captive"
  ],
  cockpitToggles: {
    geography: ["Vietnam"],
    timeframe: ["2024-2027 forecast"],
    variant: ["editorial-light", "cinematic-dark"]
  },
  ctas: {
    primary: { label: "Download Sample Report", action: "download-sample" },
    secondary: { label: "Talk to Analyst", action: "talk-analyst" }
    // tertiary intentionally OMITTED · only 2 CTAs in hero
  }
}
```

---

## 3 · Key stats strip (3 cards · vs 6 in MAX scenario)

```ts
keyStats = [
  { id: "ks-1", label: "Market size 2024", value: "USD 84 Mn",
    trend: { direction: "up", pct: null, base: "outlook baseline" }, access: "free", treatment: "primary-emphasis" },
  { id: "ks-2", label: "Forecast 2027",    value: "USD 280 Mn",
    trend: { direction: "up", pct: 233.3, base: "vs 2024" }, access: "free", treatment: "primary-emphasis" },
  { id: "ks-3", label: "CAGR 2024-2027",   value: "49.30 %",
    trend: { direction: "up", pct: null, base: "3-yr forecast" }, access: "free", treatment: "primary-emphasis" }
]
```

**Render rule:** strip should auto-balance to 3-card layout (vs 6-card MAX layout). Cards stretch to fill row OR center-align with reduced max-width container — no empty card slots.

---

## 4 · Market-size headline (NO chart · stat-block fallback)

```ts
marketSize = {
  mode: "stat-fallback",         // NOT "chart"
  dataset: null,                  // no time-series dataset
  primaryStat: {
    label: "Market expected to reach",
    value: "USD 280 Mn",
    year: 2027,
    cagr: "49.30%"
  },
  narrative: "Vietnam EV charging infrastructure expands from USD 84 Mn in 2024 to USD 280 Mn by 2027, driven by VinFast OEM rollout, government Decision 876 mandates, and public-private CPO partnerships. Three-year CAGR of 49.30% reflects greenfield infrastructure build, not mature-market dynamics."
}
```

**Render rule:** when `dataset === null`, the chart module should render as a **stat-block + narrative** card, NOT an empty chart canvas or "data unavailable" message.

---

## 5 · Segmentation (2 tabs · vs 8 in MAX scenario)

```ts
segmentation = [
  {
    id: "seg-1-charger-type",
    label: "By Charger Type",
    dimensions: ["AC (Level 1 + 2)", "DC fast charging"],
    uiModule: "donut",
    access: "gated-sample",
    note: "AC dominant on volume (~78%); DC dominant on revenue (~62%)"
  },
  {
    id: "seg-2-deployment",
    label: "By Deployment",
    dimensions: ["Public", "Captive (commercial / fleet)", "Home"],
    uiModule: "horizontal-bar",
    access: "gated"
  }
]
```

**Render rule:** 2-tab strip — render as inline tab toggles, NOT empty tab placeholders. If only 1 tab present, render content directly w/o tab strip.

---

## 6 · Competitor (1 player · text-only · NO logos)

```ts
competitor = {
  timeline: null,
  marketShare2024: null,
  positioningMatrix: null,
  comparisonTable: null,
  players: [
    {
      name: "VinFast (V-Green)",
      type: "OEM-captive CPO",
      logo: null,
      description: "VinFast V-Green subsidiary operates 150,000+ charging ports across 63 provinces (Q4 2024 snapshot). Exclusive to VinFast EVs through 2027 (per company commitment); third-party interoperability planned 2027+.",
      revenue: null,
      established: 2023
    }
  ],
  access: { players: "free" }
}
```

**Render rule:** single-competitor card · `logo: null` triggers text-only card (initials avatar "VF" OR full-text branding · NO empty image box). All other competitor sub-modules (timeline, market-share, positioning, comparison) hidden.

---

## 7 · Methodology (summary form · 1 paragraph · vs 4-stage in MAX)

```ts
methodology = {
  mode: "summary",                  // NOT "staged"
  stages: null,
  summary: "Outlook based on Decision 876/QD-TTg infrastructure targets, VinFast/V-Green disclosed deployment plans, 8 analyst interviews with CPO and OEM leadership, and Ken Research's standard top-down GDP × EV-penetration × charger-density model. As a 28-page outlook report (not a full market study), confidence band is wider than typical Ken Research reports; published numbers represent central scenario.",
  duration: "4 weeks total",
  confidence: "Medium"
}
```

**Render rule:** when `mode === "summary"`, render single text-block w/ duration + confidence callout, NOT 4-stage horizontal step-card layout.

---

## 8 · FAQ (3 entries · minimum threshold)

```ts
faq = [
  { q: "How large is Vietnam's EV charging market?", a: "USD 84 Mn in 2024, forecast to reach USD 280 Mn by 2027 at 49.30% CAGR." },
  { q: "Who is the largest charging operator?", a: "VinFast subsidiary V-Green operates 150,000+ public ports — effectively the only at-scale CPO through 2026." },
  { q: "What is driving growth?", a: "VinFast OEM EV rollout, Decision 876/QD-TTg national EV targets, and rising urban 2-wheeler EV penetration." }
]
```

**Render rule:** 3-entry FAQ is the **minimum render threshold** per PRD §41. Below 3 entries → hide FAQ section entirely.

---

## 9 · Sections NOT INCLUDED in this report

| Section | Reason | UI behaviour |
|---|---|---|
| Historical market size chart | No historical window (outlook-only report) | Chart hidden · timeframe toggle simplified to "Forecast only" |
| Forecast chart (line) | Dataset unavailable; only stat + narrative | Replaced w/ stat-block fallback |
| Stacked segmentation chart | Not modelled | Section hidden |
| Competitor share donut | Effectively single-player market — chart not meaningful | Section hidden |
| Positioning matrix bubble | Insufficient comparable players | Section hidden |
| Macroeconomic dual-axis chart | Not in scope | Section hidden |
| Service-type donut | N/A | Section hidden |
| Country / infrastructure context | Not authored | Section hidden |
| Taxonomy section | Not authored | Section hidden |
| Trends section | Embedded in narrative | Section hidden |
| Regulatory section | Mentioned in methodology summary only | Section hidden |
| Ecosystem associations | Not covered (nascent market) | Section hidden |
| Ecosystem map | Not covered | Section hidden |
| Competitor timeline | Single-player market — N/A | Section hidden |
| Competitor comparison table | Single player — N/A | Section hidden |
| Methodology 4-stage breakdown | Collapsed to summary paragraph | Stage cards hidden |
| Region (intra-Vietnam) segmentation | Not modelled | Tab removed |
| Application / end-use segmentation | Not modelled | Tab removed |
| Mode-of-transport / packaging / ownership segmentation | N/A | Tabs removed |

---

## 10 · Access mix summary

- Free: Hero (all 3 stats) · market-size stat fallback · single-competitor card · methodology summary · FAQ · narrative blocks
- Gated-sample: Charger-type segmentation
- Gated: Deployment segmentation
- No `gated-sample` for stats (all 3 free) because there are no secondary stats

---

## 11 · What this scenario proves

1. **Hero**: Works w/ 3 stats (vs 6). No empty card slots — layout adapts.
2. **Historical window null**: Chart 1 hidden, toggle simplified — no broken empty chart.
3. **Chart dataset null**: stat-block fallback renders w/ narrative — NOT an empty chart canvas.
4. **Segmentation 2 tabs**: inline tabs render; below 2 → render content directly, no tab strip.
5. **Single competitor + no logo**: text-only card renders w/ initials avatar; no broken `<img>` placeholder.
6. **Methodology summary mode**: single text block w/ confidence callout — no empty stage cards.
7. **FAQ at 3-entry floor**: renders. Below 3 → hidden per PRD §41.
8. **CTAs**: 2 of 3 hero CTAs — tertiary slot collapses, no empty button shell.
9. **Forecast-only outlook report**: page narrative coherent w/o historical-comparison framing.
10. **28-page niche report renders w/ same visual quality bar as 90-page master template.**

---

## 12 · Hidden navigation items

Page nav (sticky chapter ToC) should auto-hide these chapter items because their sections are hidden:

- ~~Historical Trends~~ (hidden)
- ~~Country Context~~ (hidden)
- ~~Taxonomy~~ (hidden)
- ~~Macroeconomic Indicators~~ (hidden)
- ~~Trends~~ (hidden)
- ~~Regulatory Framework~~ (hidden)
- ~~Ecosystem~~ (hidden)
- ~~Positioning Matrix~~ (hidden)
- ~~Competitor Timeline~~ (hidden)
- ~~Comparison Table~~ (hidden)

Visible chapter ToC:
1. Overview
2. Market Size & Forecast
3. Segmentation
4. Competitor Landscape
5. Methodology
6. FAQ

---

**File word count target: ~1,700.**
