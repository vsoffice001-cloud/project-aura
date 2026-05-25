# SECTION-CANON-V03 · V1 Product Page (v0.3 · tabs-in-section approach)

> **v0.3 = redesign.** Side-TOC + scroll content right column. In-section tabs for dense modules. DS v2 native. Live Australia Cold Chain actual content. Painpoint-driven UX upgrades from analysis of 3 live Ken PDPs.
>
> Forked 2026-05-18 from v0.2 stacked-rejected version. v0.2 preserved at `v1-product-page-ver0.2/` (read-only ref).
>
> **Source inputs** ·
> - PRD V2.1 Expanded · canonical 30-section taxonomy + module registry
> - 3 live PDPs analyzed · Australia Cold Chain · KSA Fitness Services · India Kitchen Brands
> - DS v2 inventory · 48 atoms · 27 molecules · 50+ organisms · Radix Tabs primitive at `core-v2/src/ui/tabs.tsx`
> - SECTION-CANON.md (v0.2 reconciliation · still valid for naming/intent canon)

---

## §1 · Painpoints observed across 3 live PDPs

Drives every design decision below.

| # | Painpoint | Live evidence | v0.3 fix |
|---|---|---|---|
| P1 | **Heavy text walls** (Market Overview · Industry Analysis · Drivers) | All 3 pages · multi-paragraph blocks · no visual breaks | LongFormReader DS organism · 2-col text + sidekick chart · max 280 chars body before break · "View more" disclosure |
| P2 | **Empty sections** (India Kitchen "Market Challenges" header only · no content) | India Kitchen §7 | DS EmptyState molecule when payload missing · skeleton when loading · auto-hide if `visibilityStatus !== 'published'` |
| P3 | **Charts referenced but NOT rendered** (India Kitchen Market Size · Distribution chart references in text · no SVG visible) | India Kitchen §5, §10 · KSA §11 | Mandatory ChartCard rendering — no "see chart X" prose without actual chart adjacent · fallback image OR DS skeleton |
| P4 | **Redundant tab navigation** ("Market Overview" tab repeats body content · clickable but goes to same page anchor) | All 3 pages · top tab strip | v0.3 sticky tab strip = scroll-spy (not duplicate content) · clicking jumps + tracks via IntersectionObserver |
| P5 | **Inconsistent data (FAQ contradicts body)** USD 10.35 Bn vs 6.08 Bn | India Kitchen §15 | Single source of truth · mock-data.ts as canonical · all sections read from same payload · static type check |
| P6 | **Weak CTA hierarchy** (2 primary CTAs same color · 5+ CTAs page-wide) | All 3 pages | 3-tier hierarchy enforced · primary (Download Sample · brand red filled) · secondary (Customize · outline) · tertiary (Talk to Analyst · ghost). Max 2 visible CTAs per viewport |
| P7 | **Sparse competitors** (KSA only 4 · no share comparison) | KSA §18 | Tier-grouped grid · ALWAYS show market share % visualization · empty tiers collapse not show stub |
| P8 | **Whitespace inconsistency** | All 3 pages | Section vertical rhythm locked · `--space-16` between sections · `--space-10` within section · `--space-6` card pad |
| P9 | **TOC dump** (live page shows 50+ items expanded · users scroll past) | India Kitchen §14 | Collapsed-default · "Expand all" toggle · chapter count badge · per-chapter subsection count visible |
| P10 | **Heavy-when-rich · empty-when-sparse** mismatch (LOW variant pages look broken · MAX variant looks overwhelming) | KSA = LOW · Australia = MAX · same template | **DENSITY VARIANTS** · MAX shows all · MID hides 4-5 sections · LOW shows 8-10 essential · EMPTY shows hero+key stats+CTA only. Section visibility driven by `shouldRenderSection()` + `accessLevel` + content presence |

---

## §2 · v0.3 layout architecture

### 2.1 Page chrome (always visible)
- **DummyHeader** (DS canonical · top 64px · sticky · z-50)
- **MegaBreadcrumb** (DS · home > industry > region > report)
- **HeroSection** (v0.3 redesign · 60/40 split · NOT tabbed · KeyStats card in right slot)
- **StickyPDPNav** (8-12 chips · scroll-spy · sticky top:64px · z-40)
- ↓ **scroll into 2-col body** ↓
- **FinalCTABlock** (DS FinalCTASection · brand red gradient · full-width below 2-col)
- **DummyFooter** (DS canonical)
- **BottomCTABar** (DS StickyCTA · fixed bottom · appears trailing 30% scroll)
- **ReadingProgressBar** (DS atom · 2px top · brand-red · tracks page scroll %)
- **ScrollToTop** (DS atom · floating below 40% scroll)

### 2.2 Body 2-col grid
```
┌─────────────────────────────────────────────────────────────────┐
│  HERO + STICKY NAV (full-width above)                           │
├──────────────┬──────────────────────────────────────────────────┤
│              │                                                  │
│  Side TOC    │  Section content                                 │
│  (240px)     │  (flex-1 · max 880px content width)              │
│              │                                                  │
│  - sticky    │  Each section · SectionWrapper inside col        │
│  - top: 120  │  Section can have in-section Tabs                │
│  - max-h:    │  Bg alternation warm/white within col            │
│    calc(vh - │                                                  │
│    120px)    │                                                  │
│  - overflow: │                                                  │
│    auto      │                                                  │
│              │                                                  │
└──────────────┴──────────────────────────────────────────────────┘
```

- **Side-TOC col** · 240px fixed · scroll-spy active state · collapsed below 1024px → hidden behind hamburger
- **Content col** · flex-1 · max-width 880px (reading-prose-comfortable) · centered if rail hidden
- **Container max** · 1240px (TOC 240 + gap 40 + content 880 + gutter 80)

### 2.3 Section pattern (canonical)
Every section uses this skeleton:

```tsx
<SectionWrapper id={id} background={bg} spacing="lg">
  {/* Eyebrow + H2 trio · R3.7 */}
  <SectionLabel variant="accent">{eyebrow}</SectionLabel>
  <SectionHeading level={2}>{title}</SectionHeading>
  {summary && <DisplaySerifLead>{summary}</DisplaySerifLead>}

  {/* IF section has tabs · render Tabs primitive */}
  {hasTabs ? (
    <Tabs defaultValue={firstTab} aria-label={title}>
      <TabsList>
        {tabs.map(t => <TabsTrigger value={t.id}>{t.label}</TabsTrigger>)}
      </TabsList>
      {tabs.map(t => (
        <TabsContent value={t.id}>
          <TabContent />
        </TabsContent>
      ))}
    </Tabs>
  ) : (
    <ContentBlock />
  )}

  {/* OPTIONAL inline CTA at section end */}
  {sectionCta && <SectionCta />}
</SectionWrapper>
```

---

## §3 · Section-by-section · tab structure + content + DS components

Tab-led where dense · scroll-stacked where simple.

| # | Section · DOM id | In-section tabs | DS components | Live data source |
|---|---|---|---|---|
| 1 | Hero · `#hero` | none — keep KeyStats right slot for fast scan | DS `ProductHero` (evaluate) · `DataHighlightCard` for headline metric · `StatCard` strip | Title · 6,547.8 · 10,705 · 10.03% · Geetanshi · 90pp |
| 2 | Snapshot · embedded in Hero | none | `CardMetaRow` molecule | KRR71 · Nov 2025 · Base 2024 · Forecast 2022-2027 |
| 3 | KeyStats · `#key-stats` | none — 6 cards horizontal | `StatCard` × 6 · `DataHighlightCard` | 6,547.8 (2022) · 10,705 (2027) · 10.03% CAGR · 2,647.8 storage · 3,900 transport · 200-250 players |
| 4 | Executive Summary · `#executive-summary` | none — 3 takeaway cards + 2 prose paras + use-case chips | `Card` · `Badge` · `FilterChip` for use-cases · `AnswerBlock` (SEO crawlable) | live overview prose · 3-5 takeaways · "market entry / benchmarking / investment screening" chips |
| 5 | Scope & Coverage · `#scope` | none — chip array | `Card` · `FilterChip` array | segments covered · period 2022-2027 · geo Australia · deliverables · customization |
| 6 | Country & Infrastructure · `#country-infra` | **2 tabs · Country / Infrastructure** | `Tabs` · `DataHighlightCard` · `Card` w/ relevance line | Country Overview prose · roads · sea · air · rail w/ market relevance |
| 7 | Market Overview & Genesis · `#market-overview` | **4 tabs · Overview / Genesis / Business Cycle / Seasonality** — RETAIN GenesisTimeline + SeasonalityCalendar inside their tabs | `Tabs` · `LongFormReader` · existing `GenesisTimeline` + `SeasonalityCalendar` | overview prose · 9.1% CAGR 2017-22 · peak 2019 10.4% · seasonality narrative |
| 8 | Definitions · `#definitions` | none — accordion · 3 expanded default | `Accordion` (DS) · `CollapsibleSection` atom | 7 live terms · Ambient · Frozen · Chiller · Captive · Non-Captive · Cold Transport · Cold Chain Market |
| 9 | Taxonomy · `#taxonomy` | none — interactive parent/child grid | existing `TaxonomySection` pattern · `CategoryListItem` atom | 10 actual parent nodes from live page |
| 10 | Market Ecosystem · `#ecosystem` | **4 tabs · Cold Chain / Cold Storage / Cold Transport / Associations & Certifications** (PRD §6.5) | `Tabs` · `LogoTierGrid` · `AssociationStrip` · `Card` | 200-250 players insight card · tier groups per pallet capacity |
| 11 | Market Size & Growth · `#market-size` | **2 tabs · Historical / Forecast** | `Tabs` · `ChartCard` · Ken Charts AreaChart / DualAxisBarLine | 4,231.1 → 6,547.8 (2017-22) · 9.1% CAGR · peak 2019 10.4% · forecast 10,705 by 2027 |
| 12 | Submarket Intelligence · `#submarkets` | **2 tabs · Cold Storage / Cold Transport** | `Tabs` · `ChartCard` · `StatCard` | Storage 1,668→2,647.8 @ 9.7% · Transport 2,563.1→3,900 @ 8.8% |
| 13 | Segment Intelligence · `#segmentation` | **7 tabs · By End-User / By Market Type / By Temperature / By Region / By Reefer Truck / By Transport Mode / By Domestic-Intl** (PRD §6.4) | `Tabs` · `ChartCard` · DonutChart + dataset table | Meat 43.8% AUD 2,867.1 · Fruit/Veg 23% AUD 1,506.7 · Pharma 17% AUD 1,112.4 · Confectionary 9.85% AUD 641.5 · Frozen 45% / Chiller 40% / Ambient 15% · Sydney 35 / Melbourne 27.5 / Brisbane 15.5 / Others 22 · Truck 1-10t 59.6% / 10-20t 14.5% / 20+t 25.9% · Land 57% / Sea 37% / Air 6% · Domestic 56.9% / Intl 43.1% |
| 14 | Industry Analysis · `#industry` | **4 tabs · SWOT / Drivers / Challenges / Trends & Tech** | `Tabs` · 2x2 SWOT grid · `Card` array · `IconBadge` | live SWOT 4 quadrants · 4 drivers · 4 challenges · trend cards (IoT · digitization · e-com · sustainability) |
| 15 | End-User Analysis · `#end-user` | **3 tabs · Sectors / Shelf Life / Players & 3PL** | `Tabs` · `Card` array · shelf-life table · player grid | Meat/Seafood · Pharma · RTE meals · Dairy sector cards · shelf-life matrix · 3PL/owned split |
| 16 | Demand-Supply Gap · `#ds-gap` | none — chart + 2 callouts | `ChartCard` (DS) + Ken Charts DualBar · `DataHighlightCard` for headline gap · `Card` callouts | demand vs supply 2022-2027 series · shortfall headline · regional callouts |
| 17 | Competitor Landscape · `#competitor` | **4 tabs · Companies / Timeline / Market Share / Positioning Matrix** (PRD §6.5) | `Tabs` · `Card` profiles · timeline component · horizontal bar chart · bubble chart · `ComparisonTable` (DS) | 5 actual companies (Americold 1968 · Newcold 1986 · Karras 1989 · Auscold 1994 · ChillFreeze 1997) |
| 18 | Regulatory Landscape · `#regulatory` | none — regulation cards w/ impact badges | `Card` · `Badge` · `IconBadge` | live regulation list w/ authority + impact |
| 19 | Future Outlook · `#future-outlook` | **3 tabs · Overall / Cold Storage / Cold Transport** | `Tabs` · `ChartCard` · forecast chart · assumption cards | overall 10,705 @ 10.03% · storage submarket forecast · transport submarket forecast 6,099.9 @ 9.4% |
| 20 | Opportunities & Recommendations · `#opportunities` | **4 tabs · Investors / Government / Existing Companies / Operators** (PRD §8.14) | `Tabs` · `Card` recs · `Badge` lead-gated | per-buyer-type recommendations |
| 21 | Macroeconomic Indicators · `#macro` | **4 tabs · GDP / Trade / Population / Infrastructure** | `Tabs` · `ChartCard` · `DataHighlightCard` · `KeyMarketIndicators` (DS) | GDP 1,428.5→1,450 · pop 25.9M · imports 387→513.2 · top China 19.4% · iron ore 29% |
| 22 | Methodology · `#methodology` | **4 tabs · Secondary / Primary / Sanity Checking / Modelling** (PRD §6.6) | `Tabs` · stepper number circles · `Card` · `CompletionBadge` for confidence | 4 stage actual research methodology from PRD §6.6 |
| 23 | TOC · `#toc` | none — accordion w/ expand-all | DS `TableOfContents` atom · `CollapsibleSection` | 17 actual chapter names from live page |
| 24 | FAQ · `#faq` | none — accordion · 3 expanded default · JSON-LD | DS `FAQSection` organism (DROP-WRAPPER) | PRD-required Q&A blocks |
| 25 | Related Reports · `#related` | none — 3-4 card carousel | DS `ReportCard` molecule × 3-4 | sibling reports (faked for v1) |

**Total** · 25 sections · 11 use in-section tabs · 14 scroll-stacked w/ DS components.

---

## §4 · Density variant rules (P10 fix)

Per `mock-reports/{empty,low,mid,max}.ts` already in v0.2. Tighten rules:

| Variant | Sections shown | When to use |
|---|---|---|
| **EMPTY** | Hero · KeyStats (4 cards) · ExecSummary insight only · FinalCTA · Footer | metadata-only test |
| **LOW** | Hero · KeyStats · ExecSummary · Scope · MarketSize · Competitor cards · FAQ · TOC · FinalCTA | sparse PDP like KSA Fitness (limited segmentation) |
| **MID** | + CountryInfra · MarketOverview · Submarkets · Segments (2 tabs) · Industry SWOT · Methodology | most reports |
| **MAX** | full 25 sections · all tabs · all charts | Australia Cold Chain master example |

Section component must check `data.variant` from useReport context · render appropriate slice. Empty sections hide via `shouldRenderSection()` — never render header w/ empty body (P2 fix).

---

## §5 · DS reuse · concrete drop-wrappers (v0.3 immediate adoption)

Replace local files w/ DS v2 originals:

| Current local file | Replace w/ DS v2 organism | Notes |
|---|---|---|
| `ReportNavbar.tsx` | DS `DummyHeader` | per memory `project_dummy_header_footer_sources.md` |
| `ReportFooter.tsx` | DS `DummyFooter` | per memory |
| `HeroSection.tsx` | DS `ProductHero` | evaluate compatibility · keep cockpit if DS lacks |
| `KeyStatsStrip.tsx` | DS `StatsRow` | evaluate |
| `MethodologySection.tsx` | DS `MethodologySection` or `ResearchMethodology` | pick newer · DROP-WRAPPER |
| `FAQSection.tsx` | DS `FAQSection` | DROP-WRAPPER |
| `FinalCTABlock.tsx` | DS `FinalCTASection` or `CTABanner` | DROP-WRAPPER |
| `BottomCTABar.tsx` | DS `StickyCTA` | DROP-WRAPPER |
| `ReportBreadcrumb.tsx` | DS `MegaBreadcrumb` | DROP-WRAPPER |
| (custom Tabs in many sections) | DS `Tabs` + `TabsList` + `TabsTrigger` + `TabsContent` | canonical Radix-based |
| (custom accordion in Definitions/TOC) | DS `Accordion` | check core-v2/ui |
| (custom comparison table) | DS `ComparisonTable` | for Competitor benchmark |
| (custom LongFormReader prose) | DS `LongFormReader` | for MarketOverview narrative |
| (custom progress bar) | DS `ReadingProgressBar` | top-of-page scroll % |
| (custom scroll-to-top) | DS `ScrollToTop` | atom |
| (custom SideTOC) | use v0.2 `SideTOC.tsx` (project-local) + DS `TableOfContents` atom inside | not in DS as organism |

**Inline AnswerBlock injection** · per PRD §12.2 · Hero + ExecSummary + MarketSize + Methodology need AI-crawlable answer blocks. DS atom exists at `core-v2/src/atoms/AnswerBlock.tsx` — currently MISSING from v0.2 entirely.

---

## §6 · Charts standard · per PRD §9

Use `@ken-research/charts` package. ChartCard DS molecule wraps every chart w/ insight-line header + controls + dataset preview + source note + access state.

| Chart need | Ken Charts type | Section |
|---|---|---|
| Historical market trend | DualAxisBarLine | MarketSize (Historical tab) |
| Forecast trend | DualAxisBarLine OR AreaChart | MarketSize (Forecast tab) · FutureOutlook |
| Segment share by end-user | DonutChart | Segments (End-User tab) |
| Region share | DonutChart OR MapChart | Segments (Region tab) |
| Temperature range | DonutChart | Segments (Temp tab) |
| Mode of transport | DonutChart | Segments (Mode tab) |
| Truck type | HorizontalBarChart | Segments (Truck tab) |
| Submarket comparison over time | StackedBarChart | Submarkets |
| Demand-supply gap | DualBar (demand + supply per year) | DSGap |
| Competitor market share | HorizontalBarChart | Competitor (Share tab) |
| Competitor positioning | BubbleChart | Competitor (Positioning tab) |
| Player timeline | Timeline component | Competitor (Timeline tab) |
| GDP/inflation trend | LineChart | Macro (GDP tab) |
| Imports/exports | StackedBarChart | Macro (Trade tab) |

If Ken Charts component not yet shipped · fallback to inline SVG (current DSGap pattern) · mark as `// TODO replace w/ Ken Charts when shipped`.

---

## §7 · Painpoint→Fix matrix (closes loop)

| Painpoint | Fix in v0.3 |
|---|---|
| P1 text walls | LongFormReader DS · sidekick chart · 280-char body cap · "View more" disclosure |
| P2 empty sections | DS EmptyState + auto-hide via `shouldRenderSection()` |
| P3 missing charts | ChartCard mandatory · Ken Charts everywhere · inline SVG fallback |
| P4 redundant nav | StickyPDPNav = scroll-spy only (no duplicate content) · SideTOC = jump-link only |
| P5 data inconsistency | single source of truth · mock-data.ts typed schema · all sections subscribe to same payload |
| P6 weak CTA hierarchy | 3-tier strict · max 2 CTAs / viewport · primary brand-red filled only |
| P7 sparse competitors | always show share % bar even if N=3 · tier-group · empty tier collapsed not stubbed |
| P8 whitespace inconsistency | `--space-16` between sections · `--space-10` within · `--space-6` card pad · enforced via SectionWrapper |
| P9 TOC dump | collapsed default · "Expand all" toggle · chapter count · subsection count per chapter |
| P10 density mismatch | 4 variants (EMPTY/LOW/MID/MAX) · per-section visibility rules · `shouldRenderSection()` enforces |

---

## §8 · Build order · v0.3

| P | Sprint | Tasks | Effort |
|---|---|---|---|
| **P0** | v0.3-A · Foundation | Restore SideTOC + 2-col layout · wire 3-tier CTA · install Tabs everywhere · ReadingProgressBar | M |
| **P0** | v0.3-B · Content swap | All 25 sections to live Australia Cold Chain content · `mock-reports/max.ts` rewrite | L |
| **P0** | v0.3-C · In-section tabs | Implement Tabs in 11 sections per §3 table | L |
| **P0** | v0.3-D · EmptyState · density variants | LOW + MID + MAX shouldRenderSection rules · DS EmptyState on missing payloads | M |
| **P1** | v0.3-E · New sections | TrendsTech (inside Industry tab) · Regulatory · FutureOutlook · Opportunities · RelatedReports | M |
| **P1** | v0.3-F · DS drop-wrapper sweep | 9 local → DS v2 organisms per §5 | M |
| **P2** | v0.3-G · Polish | AnswerBlock inline · final motion + a11y · screenshot QA across all 4 variants | M |

---

## §9 · Acceptance criteria

v0.3 ships when:
- All 25 sections present w/ live content · zero invented data
- Side TOC visible · scroll-spy active state · clicks jump · sticky w/ overflow-y
- Right column max 880px · sections stacked w/ correct bg alternation
- 11 sections use Radix Tabs primitive from DS
- Genesis Timeline + Seasonal Demand Pattern preserved inside MarketOverview tabs
- All 4 variants (EMPTY/LOW/MID/MAX) render w/o broken sections
- TS green · prod build green · 0 console errors
- a11y · 0 axe violations · all tabs keyboard nav · all accordions ARIA disclosure
- 3-tier CTA hierarchy · max 2 CTAs visible per viewport
- BottomCTABar appears only trailing 30% · hides when FinalCTABlock visible
- ReadingProgressBar · ScrollToTop · SkipLink · all wired
- AnswerBlock present in Hero + ExecSummary + MarketSize + Methodology
- Lighthouse PDP score ≥ 90 desktop · ≥ 80 mobile

---

## §10 · Out of scope for v0.3

- Real Ken Charts integration beyond placeholder fallback (defer when @ken-research/charts published)
- Real /api/lead-capture wiring (`console.log` stub fine)
- SSR optimizations beyond what Next.js 16 gives free
- Multi-language i18n
- Analytics (Leadfeeder · Contentsquare) wiring per Aura scope rule
- SEO meta enrichment beyond JSON-LD FAQPage already in FAQ
- A/B test variants
- Dark mode

Tech team handles after handover.

---

## §11 · References

- `SECTION-CANON.md` (v0.2 reconciliation · still valid for naming/intent)
- `SECTION-UX-BRIEF.md` (v0.2 brief · density rules carry over)
- `PRD-V2.1-australia-coldchain.md`
- `RESEARCH.md` (top 10 cross-cutting learnings)
- 3 live PDPs · Australia Cold Chain · KSA Fitness Services · India Kitchen Brands
- DS v2 inventory · `design-system/core-v2/src/`
