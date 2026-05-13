# Recipe — Report Detail (PRD)

**Pillar:** research
**Variant:** editorial-light (default) · cinematic-dark (premium tier)
**Voice:** [voice/research.md](../voice/research.md)
**Motion:** [motion/MOTION_SPEC.md](../motion/MOTION_SPEC.md) — Framer Motion only (GSAP + Lenis removed per workspace 2026-05-08)
**Anti-patterns:** Categories 1, 2, 3, 4, 5, 7, 11 from [ANTI_PATTERNS.md](../ANTI_PATTERNS.md)
**Source of truth:** `Ken_Research_V1_Product_Page_Rebuild_PRD.pdf` (54 sections, 19 pages, 6 May 2026)
**Supersedes:** [report-detail.md](report-detail.md) (light), [report-detail-heavy.md](report-detail-heavy.md) (V1 spec)

---

## Intent

Premium research intelligence interface for individual market research reports. Per PRD §4: "Should not feel like a CMS-generated report page. It should feel like a live preview of Ken Research's intelligence engine." Text-heavy by design (research depth = product), but powered by sharper hierarchy, interactive charts, datasets, infographics, info-wall/paywall logic, and AI-search-ready formatting.

5-page-type hybrid (PRD §6): Research report product page · Market intelligence landing page · Interactive data preview page · Lead-generation page · Controlled-access content page.

**Master sample:** Australia Cold Chain Market 2022-2027.

---

## When to use

- Any individual report PDP across Ken Research catalog (1M+ reports)
- Heavy market reports (40+ content blocks) AND lighter reports (15-20 blocks) — same template
- Replaces existing `kenresearch.com/<market>-markets` URL pattern

## When NOT to use

- Listing / browse → `report-store-listing.md`
- Sector landing → `sector-landing.md`
- Survey reports → `survey-detail.md`
- Case studies → `case-study.md`

---

## Master page architecture (PRD §8) — 30 sections

| # | Organism | Purpose | Access Default | Background | Spacing | Motion |
|---|---|---|---|---|---|---|
| 1 | `Navbar` | Global header w/ industry mega-menu + search | public | white | — | CSS scroll transition |
| 2 | `Breadcrumb` | Industry → SubIndustry → Report trail | public | white | sm | static |
| 3 | `ReportPDPHero` | **Interactive cockpit** — 4 tabs (Market Size / Forecast / Segmentation / Competitors), L/R split, primary CTAs | public | warm-300 | xl | Framer fade-up + tab transitions |
| 4 | `ReportIntelligenceSnapshot` | Premium product-card summary: market size · forecast · segments · companies · use cases · outputs | public | white | lg | Framer `whileInView` fade-up |
| 5 | `StickyNavBar` | Sticky top nav (after hero) — 11 sections, active highlight, CTA cluster right | n/a | n/a (sticky) | — | CSS sticky + Framer active-section transition |
| 6 | `KeyStatsStrip` | 5-7 stat tiles (market size, forecast, CAGR, segment splits) — locked indicator on premium | public + lock indicator | warm-300 | md | Framer stagger 60ms |
| 7 | `ExecutiveSummaryModule` | Boardroom-style brief — opening / drivers / what report decides / 3-5 takeaway cards / CTA | public | white | lg | Framer fade-up |
| 8 | `ReportScopeModule` | 8-bucket coverage: Market · Geography · Segment · Competitor · Time · Methodology · Deliverables · Customization | public | warm-300 | lg | Framer fade-up |
| 9 | `MarketOverviewModule` | Research narrative + visual anchor (chart/stat/infographic) per PRD §15 rule | public | white | lg | Framer fade-up |
| 10 | `MarketDefinitionsBlock` | Glossary cards w/ Term · Definition · In Scope · Excluded · Related Segments | public | warm-300 | lg | Framer fade-up |
| 11 | `TaxonomyTree` | Interactive tree desktop / accordion mobile. Public layer + lead-gated deep nodes | metered | white | lg | Framer expand transitions |
| 12 | `EcosystemTierGrid` | Tabs: Cold Chain · Cold Storage · Cold Transport · Associations · Certifications. Public summary + locked map | public preview / lead-gated full | warm-300 | lg | Framer stagger 60ms |
| 13 | `MarketSizeChart` | Primary chart card. Dual-axis bar+line. Public preview + locked dataset | public preview / lead-gated dataset | white | lg | recharts/highcharts entrance — disabled under reduced-motion |
| 14 | `InlineCTA1` | Sample + Analyst CTA pair after first major content | n/a | warm-300 | sm | Framer fade-up |
| 15 | `SegmentIntelligenceModule` | Tabs: End User · Market Type · Temp Range · Region · Mode · Truck Type · Domestic/International. Per-tab chart + dominant-segment badge | metered chart-interaction | white | lg | tab transitions |
| 16 | `IndustryAnalysisModule` | Parent wrapper — groups SWOT + drivers + value chain + challenges + trends + tech + regulatory | mixed (per child) | warm-300 | lg | Framer fade-up |
| 17 | `SWOTQuadrant` | 2×2 grid, top 3 bullets per quadrant + expand. Analyst note bottom | public preview / lead-gated full | white | lg | Framer stagger 80ms |
| 18 | `GrowthDriversCardGrid` | Driver cards: title · explanation · impact tag · related segment · supporting data | public | warm-300 | lg | `CardReveal` stagger 80ms |
| 19 | `ValueChainStepper` | Horizontal flow desktop / vertical stepper mobile. Public stages + locked margin/opportunity analysis | public preview / lead-gated full | white | lg | Framer reveal nodes left-to-right |
| 20 | `ChallengesSolutionsTable` | Pair each challenge w/ solution. Fields: title · why it matters · solution · impact · urgency · related segment | public | warm-300 | lg | Framer stagger 60ms |
| 21 | `InlineCTA2` | Sample + Customization CTA pair | n/a | white | sm | Framer fade-up |
| 22 | `CompetitorLandscapeModule` | Overview + logo strip + market-share chart + positioning matrix + company cards + comparison table | public preview / lead-gated comparison | warm-300 | lg | Framer fade-up |
| 23 | `RecentTrendsCardGrid` | Trend cards: name · description · impact · time horizon · affected segment · buyer implication | public | white | lg | `CardReveal` stagger 80ms |
| 24 | `EmergingTechNodes` | Hub-spoke OR 4-tile constellation (RPA · IoT · Blockchain · Predictive) | public | warm-300 | lg | Framer node stagger |
| 25 | `RegulatoryCardStack` | 5 callouts: Authority · What it governs · Impacted participants · Compliance relevance · Buyer implication | public preview / lead-gated detail | white | lg | Framer stagger 60ms |
| 26 | `FutureOutlookModule` | Forecast summary + chart + drivers + assumptions preview + locked dataset + CTA | public preview / paid full dataset | warm-300 | lg | Framer chart fade-up |
| 27 | `MacroIndicatorPanel` | GDP · Inflation · Population · Imports/Exports · Infrastructure · Ports. Each w/ buyer-relevance line | public preview / paid full | white | lg | Framer fade-up |
| 28 | `MethodologyFlow` | 6 steps: Secondary · Primary · Triangulation · Sanity Check · Forecast Modeling · Analyst Validation | public summary / lead-gated sample size / paid model | warm-300 | lg | Framer fade-up |
| 29 | `TableOfContentsModule` | Public chapters / lead-gated full TOC / paid full report | public preview / lead-gated full | white | lg | Framer accordion |
| 30 | `ReportFAQ` | 10 FAQ types (size · forecast · CAGR · segments · competitors · coverage · methodology · customization · delivery · purchase) | public | warm-300 | lg | Framer accordion |
| 31 | `RelatedReportsModule` | 6 strategies: same market adj geo / same geo adj market / same industry / same use case / recent / custom alt | public | white | lg | `HorizontalScroll` drag |
| 32 | `ReportFactsBlock` | **GEO/AI extraction** — 9 answer blocks for AI search engines | public | warm-300 | md | static |
| 33 | `FinalCTABlock` | Get Report Access conversion section | n/a | black | xl | Framer fade-up |
| 34 | `Footer` | Site footer | n/a | black | — | static |

**Sticky CTA:** `StickyCTA` always-on bottom (mobile) / right rail (desktop). Section-aware label swap via `useActiveSection`.

**Reading progress:** `ReadingProgressBar` top of viewport, hidden over hero.

**Background alternation:** strict warm-300 → white pattern except black sections (33, 34).

---

## Hero cockpit (PRD §9) — `ReportPDPHero`

Two-column desktop, stacked mobile.

### Left column
- Breadcrumb chips (industry · region · report-type · date)
- H1 — full report title (Noto Serif, ~3xl-display scale)
- One-line product promise (DM Sans, lg, 0.7 opacity)
- 3 research proof bullets w/ tabular-num figures
- Primary CTA: `Download Sample Report`
- Secondary CTA: `Talk to Analyst`
- Trust strip: analyst portrait · name · role · last updated · share icons

### Right column — interactive cockpit (4 tabs)
1. **Market Size** — Dual-axis bar+line (historic + forecast), highlight stat callout, 1 dataset-unlock CTA
2. **Forecast** — Area chart w/ dotted future line, forecast CAGR badge, locked assumptions teaser
3. **Segmentation** — Donut or horizontal bar (top segments), segment toggle (by-end-user / by-region / by-mode)
4. **Competitors** — Logo strip + mini market-share bar + locked positioning matrix teaser

**Tab interactions:**
- Toggle, hover tooltip, mini dataset preview
- Lock overlay after 2 metered interactions
- Sample CTA + Analyst CTA per tab
- Mobile: horizontal scroll chips for tab switching

**Hero metadata block** (below cockpit row):
Report title · market name · region · industry · report type · author · published date · pages · product code · base year · historical period · forecast period · format · delivery type

---

## Access tier system (PRD §22)

5 levels. Backed by schema.org `isAccessibleForFree: false` + CSS selector classes per locked module.

| Level | When | What renders | CSS class |
|---|---|---|---|
| `public` | Always | Full content visible | none |
| `metered` | First 2 premium interactions/session | Full content; counter increments | `.kr-meter-{module}` |
| `lead-gated` | Form submission required | Lock teaser overlay → form → unlock | `.kr-paywall-{module}` |
| `login-gated` | Auth required | Login prompt | `.kr-auth-gate` |
| `paid` | Purchase / approval required | Locked w/ purchase CTA | `.kr-paywall-{module}` |

**Public minimum** (PRD §21 hard rule): main market size, forecast size, CAGR, primary segment share, major players, scope, methodology summary. **Never gate these**.

**Gated targets** (default): full year-wise dataset, forecast assumptions, market model, competitor benchmark detail, full TOC, downloadable Excel, deep methodology.

**Schema markup** (PRD §44):
```json
{
  "@type": "WebPageElement",
  "isAccessibleForFree": false,
  "cssSelector": ".kr-paywall-chart"
}
```

---

## Chart Card 8-zone standard (PRD §20)

Every chart sits inside `<ChartCard>` with these 8 zones in order:

```
┌─────────────────────────────────────────┐
│ 1. HEADER     eyebrow label · methodology badge │
│ 2. TITLE      H3 chart title                    │
│ 3. INSIGHT    1-line analyst takeaway           │
│ 4. CONTROLS   toggles · timeframe · view modes  │
│ 5. VIZ        chart body (Highcharts/recharts)  │
│ 6. DATASET    Preview rows (3 / 8-10 / full)    │
│ 7. SOURCE     Source · Last updated             │
│ 8. ACCESS+CTA Lock state · CTA pair             │
└─────────────────────────────────────────┘
```

Wrapper accepts `module: ChartModule` w/ all 8 zones derived from schema. Source: `ChartCard.tsx` (V1A had 3 zones — refactor to 8).

---

## Dataset Preview System (PRD §21)

Every chart card exposes "View Dataset" → `<DatasetPreviewDrawer>` modal.

| State | Visible Rows | Export | CTA |
|---|---|---|---|
| Public Preview | 3 rows + column names · locked rows blurred | none | `Unlock Full Dataset` |
| Lead-Unlocked | 8-10 rows + sample export | sample CSV | `Request Full Report` |
| Paid Access | Full dataset + methodology + chart download | CSV / Excel | `Download / Export` |

Dataset table fields: year · segment · value · unit · growth rate · source note · methodology note · last updated date · access level.

---

## Lead Forms (PRD §46)

4 form types. Each has hidden context fields auto-populated.

| Form | Visible Fields | Trigger CTAs |
|---|---|---|
| Sample Download | name · biz email · phone · company · designation · country · requirement note | Download Sample Report |
| Dataset Unlock | name · biz email · company · use case · dataset needed | Unlock Full Dataset |
| Analyst Call | name · biz email · phone · company · business question · preferred call time | Talk to Analyst |
| Customization | geography · segment · competitors · forecast period · deadline · budget range (optional) · business objective | Get Customized Report · Request Customization |

**Hidden context** (always passed): `report_title · product_code · page_url · cta_location · chart_id · section_name · access_trigger · utm_source · utm_medium · utm_campaign · referrer · device · session_id · interaction_count`.

Stack: `react-hook-form` + `zod` validation. Submit dispatches `form_submit` analytics event.

---

## CTAs (PRD §45) — contextual placement

| Location | CTA |
|---|---|
| Hero | `Download Sample Report` / `Talk to Analyst` |
| Stats Strip | `Unlock Full Dataset` |
| Market Size | `Download Sample Report` |
| Segmentation | `Request Customization` |
| Competitor | `Talk to Analyst` |
| Forecast | `Unlock Forecast Data` |
| Methodology | `Download Sample Report` |
| TOC | `Preview Full TOC` |
| Final Block | `Get Report Access` |

**Hierarchy:** Download Sample → Talk to Analyst → Get Customized Report → Buy Now.

---

## SEO + GEO/AI (PRD §42-44)

**Title patterns:**
- Market Outlook: `{Country/Region} {Market Name} Outlook {Base Year}-{Forecast Year} | Ken Research`
- Market Size: `{Country/Region} {Market Name} Size, Share & Forecast {Forecast Year} | Ken Research`
- Report-Led: `{Report Title}: Size, Trends, Segmentation, Competitors & Forecast`
- Segment-Led: `{Country/Region} {Market Name} by {Top Segments}, Forecast {Forecast Year}`

**H1:** `{Country/Region} {Market Name} Market Outlook ({Base Year}-{Forecast Year})`

**URL slug:** `/{country}-{market-name}-market` — preserve existing rankings via 301 redirects.

**ReportFactsBlock** (always visible HTML, AI-extractable):
```
Market: {market name}
Market Size: {value · unit · year}
Forecast: {value · unit · year}
CAGR: {pct · period}
Segments: {top 5}
Report Type: {type}
```

**9 answer blocks** (PRD §43, AI extraction):
1. What is the market size?
2. What is the forecast value?
3. What is the CAGR?
4. Which segments are covered?
5. Which companies are covered?
6. What are the growth drivers?
7. What are the key challenges?
8. What does the report include?
9. What methodology was used?

Plus: `Who should buy this report?`

**Schema.org JSON-LD types** (PRD §44):
- Organization · WebSite · WebPage · BreadcrumbList · Product · CreativeWork/Report · Dataset · FAQPage · WebPageElement (paywall markers)

---

## Analytics (PRD §47)

19 events tracked. Dispatch via `useAnalyticsEvent` hook. dataLayer push.

`product_page_view · hero_chart_interaction · stat_card_click · chart_filter_change · dataset_preview_click · dataset_unlock_click · info_wall_triggered · lead_wall_triggered · paywall_triggered · sample_cta_click · analyst_cta_click · customization_cta_click · form_start · form_submit · toc_expand · faq_expand · section_nav_click · related_report_click · scroll_depth`

Common props: `report_title · product_code · industry · region · section_name · chart_id · cta_location · access_level · user_status · interaction_count · utm_* · device_type`.

---

## Performance (PRD §48)

| Metric | Target |
|---|---|
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |
| Mobile PageSpeed | ≥ 80 |
| Desktop PageSpeed | ≥ 90 |

- Lazy-load below-fold charts (Intersection Observer)
- Static chart fallback before hydration
- Tree-shake `@ken-research/charts` per chart type
- AVIF/WebP images via `next/image`
- Server-render SEO-critical text + schema (NEVER client-only)

---

## A11y (PRD §49)

- Charts: title · description · `<table>` data fallback · keyboard controls · contrast · screen-reader summary
- Forms: visible labels · error messages · focus states · consent · keyboard nav
- Headings: 1 H1 · semantic H2/H3 hierarchy
- Tables: responsive · header rows · mobile card fallback
- Locked content: accessible lock message + clear CTA (NOT only visual blur)
- Skip-link · landmarks · 44px touch targets · `prefers-reduced-motion` honored

---

## Mock data shape

Full payload contract → [`projects/reports-pdp-v2/SCHEMA.md`](../../projects/reports-pdp-v2/SCHEMA.md).
Sample data → [`projects/reports-pdp-v2/MOCK_DATA.md`](../../projects/reports-pdp-v2/MOCK_DATA.md) — Australia Cold Chain (heavy, full PRD payload).

Top-level adds vs v1:
- `intelligenceSnapshot` (§4)
- `keyStats[]` (§6)
- `executiveSummary` structured (§7)
- `reportScope` (§8)
- `heroCockpit { tabs: [marketSize, forecast, segmentation, competitors] }` (§9)
- `answerBlocks[9]` (§43)
- `reportFacts` atomic (§43)
- `schemaMeta` (8 JSON-LD payloads, §44)
- `leadFormContexts` (§46)
- `analyticsContext` (§47)
- Per-module `access: AccessLevel` (replaces binary `gated: true`)
- Per-chart `datasetPreview { publicRows, leadRows, fullRowCount }` (§21)

---

## Variant overrides

Same schema. 3 variants (defer V1B/V1C until V2A done).

### V2A — Editorial Light A: long-scroll publication (DEFAULT)
- All organisms render inline, sticky nav strip top
- Hero cockpit 60/40 split desktop
- Editorial-light tokens, warm-300/white alternation
- `@ken-research/charts` with editorial palette (purple primary)

### V2B — Editorial Light B: sectioned dashboard
- Clusters → tabbed panels (Overview / Sizing / Dynamics / Competition / Forward / Macro)
- Hero 50/50 split, full ComboChart right
- StickyNavBar drives tab state

### V2C — Cinematic Dark: chapter navigator
- `#0a0a0c` solid bg w/ subtle gradient dividers
- Each cluster = chapter w/ intro card + numbered eyebrow
- Left-rail chapter navigator, glow active dots
- `@ken-research/charts` dark theme (teal accent)

---

## Component composition (skeleton)

```tsx
<SchemaInjector report={report} />          {/* JSON-LD ×8 */}
<AnalyticsProvider context={report.analyticsContext}>
  <Navbar />
  <Breadcrumb crumbs={...} />

  <main id="pdp-main" className="xl:pl-72">
    <ReportPDPHero cockpit={report.heroCockpit} ctas={...} />
    <ReportIntelligenceSnapshot snapshot={report.intelligenceSnapshot} />
    <StickyNavBar sections={report.toc} />
    <KeyStatsStrip stats={report.keyStats} />
    <ExecutiveSummaryModule summary={report.executiveSummary} />
    <ReportScopeModule scope={report.reportScope} />

    {report.modules.map((m) => (
      <AccessLevelGate key={m.id} access={m.access} module={m}>
        <PDPModuleRenderer module={m} />
      </AccessLevelGate>
    ))}

    <ReportFactsBlock facts={report.reportFacts} answers={report.answerBlocks} />
    <RelatedReportsModule reports={report.related} />
    <FinalCTABlock />
  </main>

  <Footer />
  <StickyCTA />
  <ReadingProgressBar />
</AnalyticsProvider>
```

---

## Project mapping

This recipe is implemented in:
- [`projects/reports-pdp-v2/`](../../projects/reports-pdp-v2/) — V2 Next.js 16 implementation
- Schema: [`projects/reports-pdp-v2/SCHEMA.md`](../../projects/reports-pdp-v2/SCHEMA.md)
- Variant briefs: [`projects/reports-pdp-v2/VARIANTS.md`](../../projects/reports-pdp-v2/VARIANTS.md)
- Mock data: [`projects/reports-pdp-v2/MOCK_DATA.md`](../../projects/reports-pdp-v2/MOCK_DATA.md)
- v1 archive (do not edit): `projects/reports-pdp-v1/`

---

## A11y gates

Same as `report-detail-heavy.md` plus:
- Locked content: `aria-label="Locked — sign in to unlock"` + visible CTA
- Tab cockpit: `role="tablist"` / `role="tab"` / `role="tabpanel"` + `aria-selected`
- Form errors: `aria-invalid` + `aria-describedby` for hints
- Schema injection: rendered server-side only (no client hydration)

## Perf gates

Same as `report-detail-heavy.md` plus PRD §48 specifics:
- Hero cockpit: charts 1+2 hydrate eager (above fold), 3+4 lazy
- Schema JSON-LD: server-rendered, gzipped, < 8KB total
- Lead form chunks: dynamic import only when CTA clicked
- Analytics: queue events until `dataLayer` ready, batch flush

## Visual baseline

Desktop 1440 / Tablet 768 / Mobile 390 / 5 scroll positions per variant. Compare against `qa-screenshots/v2a-final/` baseline.
