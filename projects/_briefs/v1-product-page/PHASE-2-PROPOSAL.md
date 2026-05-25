# PHASE-2-PROPOSAL.md · v0.2 PROPOSE+BLOCK gate

**Date:** 2026-05-18
**Status:** Awaiting user approval BEFORE Phase 3 COMPOSE
**Source agent:** Plan agent · read 13 reference files

This proposal locks the v0.2 build plan. No code written until user approves.

---

## Deliverable 1 · Section grid (30 sections)

Variant key: **LC** = light cinematic (default) · **DC** = dark cinematic · **either** = LC default w/ DC opt-in.
Access: **P** = public · **M** = metered · **L** = lead-gated · **$** = paid · **H** = hidden.

| # | Section | Variant | DS atoms | DS molecules | DS organisms | Ken Charts | NEW components | MAX/MID/LOW/EMPTY render | Access | PRD ref |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Global Header | LC | LogoButton · MenuItem · Button · SkipLink | navbar/ molecules | DummyHeader (fork) | — | ReportNavbar | always render | P | V2 §11 |
| 2 | Breadcrumb | LC | InlineLink · Divider | CardMetaRow | MegaBreadcrumb (reuse) | — | — | always | P | V2.1 §5.1 |
| 3 | Interactive Hero | LC default + DC opt | SectionLabel · SectionHeading lvl=1 · Button brand+ghost · Badge · HeroBackground · FadeInSection · Avatar | StatCard · CardReveal | ProductHero (forks) | HistoricalProjectedAreaChart (right-rail mini) | HeroCockpit · HeroRightRail · TrustStrip · ChartCardMini | MAX full+cockpit / MID 2-stat / LOW 1-stat / EMPTY hero-only | P + cockpit M | V2 §8.1 · V2 §9 |
| 4 | Report Snapshot | LC | SectionLabel · Card · Badge · IconBadge | StatCard · CardMetaRow | — | — | ReportSnapshotPanel | MAX 6 / MID 4 / LOW 3 / EMPTY hide | P | V2 §10 |
| 5 | Sticky Navigation | LC | MenuItem · Container · ScrollProgress | — | custom | — | StickyPDPNav · ScrollSpyController | derived from rendered sections only | P | V2 §11 |
| 6 | Key Stats Strip | LC | SectionLabel · Tooltip | StatCard · DataHighlightCard | StatsRow (reuse) | — | KeyStatsStrip (wraps StatsRow) | MAX 6 / MID 4 / LOW 3 / EMPTY hide | P (M for deep) | V2 §12 · V2.1 §6.2 |
| 7 | Executive Summary | LC | SectionHeading · SectionLabel · Card · FilterChip | StatCard | LongFormReader (fork) | — | TakeawayCardGrid · UseCaseChipRow | MAX 5+6 / LOW prose / EMPTY hide | P | V2 §13 |
| 8 | Report Scope | LC | SectionHeading · Badge · Card | CardMetaRow | — | — | ScopeBucketsGrid (8 buckets) | always render w/ collapse | P | V2 §14 |
| 9 | Country & Infra | LC | SectionHeading · IconBadge · Card | StatCard | KeyMarketIndicators (reuse) | LineChart (mini) | CountryInfraGrid | MAX full / MID partial / LOW hide / EMPTY hide | P | V2.1 §8.5 |
| 10 | Market Overview & Genesis | LC | SectionHeading · CollapsibleSection · Card | — | LongFormReader | — | GenesisTimeline · SeasonalityCalendar | MAX full / MID overview / LOW prose / EMPTY hide | P | V2 §15 |
| 11 | Definitions & Assumptions | LC | SectionLabel · Card · CollapsibleSection | — | — | — | GlossaryCardGrid | MAX 8+ / MID 4-6 / LOW 2-3 / EMPTY hide | P | V2 §16 |
| 12 | Taxonomy | LC | SectionHeading · CategoryListItem · Divider | — | IndustrySidebar (pattern) | — | TaxonomyTree · TaxonomyAccordionMobile | MAX tree / LOW flat / EMPTY hide | P (deeper L) | V2 §17 |
| 13 | Market Ecosystem | LC | SectionLabel · Badge · ViewToggle | — | — | — | EcosystemTabs · LogoTierGrid · AssociationStrip | MAX 4 tabs / MID 1-2 / LOW 1 inline / EMPTY hide | P + L | V2 §18 · V2.1 §6.5 |
| 14 | Market Size & Growth | either | SectionHeading · Button brand | StatCard | — | HistoricalProjectedAreaChart · MultiAxisLineChart | ChartCard (core-v2) · DatasetPreviewTable · AccessGate | MAX 2 charts+dataset / MID 1 chart / LOW stat-fallback / EMPTY hide | P headline · M dataset · L full | V2 §19 · V2.1 §6.3 |
| 15 | Submarket Intelligence | LC | SectionLabel · ViewToggle | — | — | MultiAxisLineChart · LineChart | SubmarketTabs · ChartCard | MAX 2 / MID 1 / LOW hide / EMPTY hide | M | V2.1 §8.9 |
| 16 | Segment Intelligence (7-tab) | LC | SectionLabel · Badge "dominant" · ViewToggle | — | — | PieChart · BarChart h · StackedBarChart · **GAP: Map (region)** | SegmentTabs · ChartCard · DominantSegmentBadge · MapFallback | MAX 7 tabs / MID 3 / LOW 2 / EMPTY hide | P headline · L full rows | V2 §23 · V2.1 §6.4 |
| 17 | Industry Analysis | LC | SectionLabel · Card · Badge · IconBadge | StatCard | ChallengesSection (fork) | — | SWOTGrid · DriverCardGrid · ValueChainStepper · ChallengeSolutionGrid | MAX 4 sub / MID drivers+challenges / LOW SWOT only / EMPTY hide | P preview · L full | V2 §24-28 |
| 18 | End-User Deep Dive | LC | SectionLabel · Card · Tooltip | — | — | — | EndUserSectorGrid · ShelfLifeMatrix | MAX / MID partial / LOW hide / EMPTY hide | L | V2.1 §8.11 |
| 19 | Demand-Supply Gap | LC | SectionLabel · Card | StatCard | — | BarChart | GapAnalysisCard | MAX / LOW hide / EMPTY hide | L | V2.1 §7 |
| 20 | Competitor Landscape | LC (DC optional) | SectionLabel · Avatar · Badge · Card · ViewToggle | StatCard | ComparisonTable (fork) | BarChart h share · **GAP: Bubble · Timeline** | CompetitorTimeline · CompetitorMatrixBubble · CompetitorCardGrid · CompanyComparisonTable | MAX 4 sub-tabs / MID 2 / LOW single-card / EMPTY hide | P top · L full | V2 §29 · V2.1 §6.5 |
| 21 | Trends & Emerging Tech | LC | SectionLabel · Card · Badge | — | — | — | TrendCardGrid (tabbed) | MAX 8+ / MID 4 / LOW hide / EMPTY hide | P preview · L full | V2 §30 |
| 22 | Regulatory Landscape | LC | SectionLabel · Card · Badge | — | — | — | RegulationCardGrid | MAX 5+ / MID 2-3 / LOW hide / EMPTY hide | P themes · L details | V2 §31 |
| 23 | Future Outlook / Forecast | either | SectionLabel · Button brand | StatCard | — | HistoricalProjectedAreaChart | ChartCard · ForecastAssumptionsLockedCard | MAX chart+scenarios / MID chart only / LOW hide nav / EMPTY hide | P headline · L dataset · $ assumptions | V2 §32 |
| 24 | Market Opportunities & Recommendations | LC | SectionLabel · Card · Badge · FilterChip | — | — | — | OpportunityCardGrid · RecommendationTabsByBuyerType | MAX / MID partial / LOW hide / EMPTY hide | L | V2.1 §8.14 |
| 25 | Macroeconomic Indicators | LC | SectionLabel · Card | StatCard · DataHighlightCard | KeyMarketIndicators (reuse) | MultiAxisLineChart · LineChart | MacroIndicatorGrid | MAX 4-6 / MID 2 / LOW hide / EMPTY hide | P (deep L) | V2 §33 |
| 26 | Research Methodology | LC | SectionLabel · Card · IconBadge · StepPill | StatCard | ResearchMethodology (reuse · fork) | — | MethodologyStepper · SampleSizeBreakdown · LimitationsCollapsible | MAX 6 stages / MID 4 / LOW summary / EMPTY hide | P summary · L details · $ model | V2 §34 |
| 27 | Table of Contents | LC | SectionLabel · CollapsibleSection · Button | — | — | — | TOCAccordion · TOCAccessTier | MAX full / MID partial / LOW 3 chapters / EMPTY hide | P top · L full · $ unlock | V2 §35 |
| 28 | FAQ | LC | SectionLabel · CollapsibleSection · Card | — | FAQSection (reuse + AnswerBlock) | — | AnswerBlock (atom · core-v2) · FAQSchemaInjector | MAX 10 / MID 6 / LOW 3 / EMPTY hide | P | V2 §36 · §43 |
| 29 | Related Reports | LC | SectionLabel · Card | ReportCard (reuse) | RecommendedForYou · RecentlyViewed | — | — | MAX 6 / MID 4 / LOW 3 / EMPTY hide | P | V2 §37 |
| 30 | Final CTA + Footer | **DC** | SectionLabel · SectionHeading lvl=2 · Button brand+ghost · CTABackground | — | FinalCTASection (reuse) · DummyFooter (DC variant) | — | FinalCTABlock (PDP-specific) | always render | P | V2.1 §5.29-30 |

---

## Deliverable 2 · DS gap analysis

### 2a · EXISTING + REUSE AS-IS

`Button` · `SectionHeading` · `SectionLabel` · `SectionWrapper` · `Container` · `Card` · `Badge` · `IconBadge` · `CollapsibleSection` · `Tooltip` · `HeroBackground` · `CTABackground` · `FadeInSection` · `ScrollProgress` · `SkipLink` · `ContactModal` · `StatCard` · `DataHighlightCard` · `ReportCard` · `CardMetaRow` · `EmptyState` (inline-only) · `KeyMarketIndicators` · `ComparisonTable` · `FAQSection` · `FinalCTASection` · `DummyFooter` · `MegaBreadcrumb` · `RecommendedForYou` · `ResearchMethodology` · `SubtleVariantSwitcher` (pattern)

### 2b · EXISTING but NEEDS UPDATE

| Component | What changes | Why |
|---|---|---|
| ProductHero | Add right-rail 4-level fallback + cockpit slot + LC/DC variant prop | Current doesn't support D2 dual-variant |
| StatsRow | Add `accessLevel` per-card + lock-pill + 3-8 auto-balance | No access gating today |
| ComparisonTable | Mobile breakpoint → company cards · access blur | Desktop-only today |
| FAQSection | Inject AnswerBlock + schema emission | No schema today |
| LongFormReader | applyFallbacks-aware + section-grammar support | Generic today |
| ChallengesSection | Generalize to Challenge-Solution pairing | Case-study tone only |
| DummyHeader | Fork to ReportNavbar (report-specific industry+region) | Generic site nav |

### 2c · NEW components needed

**core-v2 day 1 (per D1):**
- `ChartCard` molecule · standard chart anatomy frame (L effort)
- `AnswerBlock` atom · AI-extractable Q&A markup (S effort · semantic + reused for GEO)

**Promotion candidates (on 2nd consumer use):**
- `GenesisTimeline` · `SWOTGrid` · `ChallengeSolutionGrid` · `MethodologyStepper`

**Project-local (40+ components):**
- AccessGate · DatasetPreviewTable · KeyStatsStrip · HeroCockpit · HeroRightRail · TrustStrip · ReportSnapshotPanel · StickyPDPNav · TakeawayCardGrid · UseCaseChipRow · ScopeBucketsGrid · CountryInfraGrid · SeasonalityCalendar · GlossaryCardGrid · TaxonomyTree · EcosystemTabs · LogoTierGrid · SubmarketTabs · SegmentTabs · DriverCardGrid · ValueChainStepper · EndUserSectorGrid · ShelfLifeMatrix · GapAnalysisCard · CompetitorTimeline (local SVG) · CompetitorMatrixBubble (local Recharts) · CompetitorCardGrid · CompanyComparisonTable · TrendCardGrid · RegulationCardGrid · ForecastAssumptionsLockedCard · OpportunityCardGrid · RecommendationTabsByBuyerType · MacroIndicatorGrid · SampleSizeBreakdown · TOCAccordion · FAQSchemaInjector · VariantSwitcher (dev tool) · ChartCardMini

**Hooks:** `useAccessControl` · `useScrollSpy`

**Utilities:** `JsonLdInjector`

---

## Deliverable 3 · Hero cinematic design brief (LC + DC)

### Shared structure

**Left rail order (60% width):**
1. Breadcrumb
2. SectionLabel "CHAPTER 1 — REPORT" w/ brand-red dot (variant=accent)
3. IndustryBadge + RegionBadge + TypeBadge row
4. SectionHeading lvl=1 (serif 300 light · `--text-3xl` clamp · tracking `--tracking-tighter`)
5. Promise paragraph (DM Sans 400 · `--text-base` · `--leading-relaxed`)
6. 3 trust-bullet rows w/ IconBadge check
7. CTA row: `Button variant=brand size=lg showArrow` ("Download Sample") + `Button variant=ghost size=lg` ("Talk to Analyst")
8. TrustStrip (logos · stats · "Trusted by")

**Right rail (40% width) · 4-level fallback hierarchy:**
- L1: Report cover image (real or composed)
- L2: ChartCardMini w/ HistoricalProjectedAreaChart market-size preview
- L3: 3-card stat stack (Market Size · Forecast · CAGR) using StatCard
- L4: Composed "Inside" peek mockup w/ RevealImage

**Spacing rhythm:**
- Eyebrow→H1: 12px (`--pair-label-heading` · mb-3)
- H1→Promise: 12px (`--pair-heading-description` · mt-3)
- Promise→Bullets: 24px (`space-y-6`)
- Bullets→CTAs: 32px (`--space-xl`)
- CTAs→TrustStrip: 48px (`--space-2xl`)
- Section py: `py-12 sm:py-20 md:py-24`

**Motion (Framer):** entrance opacity 0→1 + y 16→0 · `--duration-slower` (800ms) · `--ease-out-expo` · stagger 80ms · scroll parallax right-rail · `useReducedMotion()` gate.

### LC vs DC swap

| Spec | LC (DEFAULT) | DC (opt-in) |
|---|---|---|
| Base bg | `--bg-pure-white` | `--variant-cinematic-bg-deep` (#0a0a0c) |
| Blob composition | 3 blobs: perano-500 TL 600px blur 160px @ 0.18 · periwinkle-500 TR 500px blur 140px @ 0.14 · coral-400 BC 700px blur 180px @ 0.08 · noise 0.02 mix-blend-overlay · 1px top hairline | 4 blobs: purple-600 TL 600px blur 160px @ 0.22 · coral-500 TR 500px blur 140px @ 0.18 · brand-red BR 600px blur 180px @ 0.06 ghost · periwinkle-500 center 700px blur 200px @ 0.10 · noise 0.04 · edge vignette |
| H1 ink | `--semantic-ink-strong` | `--semantic-ink-on-dark-strong` |
| Promise ink | `--semantic-ink-body` | `--semantic-ink-on-dark-body` |
| Secondary CTA | `Button variant=ghost` | `Button variant=ghost background=dark` |
| Hero chart bg (right rail) | Native white card | Light card inset on dark (Linear pattern) preserves chart legibility |

### LC vs DC decision rule

LC default. Use DC when:
1. Report is flagship/launch tier
2. Has strong cover photography
3. Final CTA + Footer (always DC per recipe)

CMS toggle: `report.heroVariant: 'light' | 'dark'`.

### Mobile

<768px: stack single column. Order: breadcrumb → eyebrow → chips → H1 → top metric pill → promise → CTAs (full-width stack) → trust strip → 3-stat stack → bullets/cover hidden behind "More" expander. Right-rail cover image hides · chart-mini moves below trust strip.

### A11y

H1 = sole `<h1>`. CTAs 48px (R7.3.1). Logo alt-text. `<main id="main-content">` after SkipLink. `<section aria-labelledby="hero-h1">`. Reduced-motion respected. Ink AA-compliant by construction. Verify chart tooltip contrast on DC.

---

## Deliverable 4 · VariantSwitcher spec

- **Location:** `v1-product-page-ver0.2/src/components/dev/VariantSwitcher.tsx` · NOT promoted to DS (dev tool only)
- **TS interface:**
  ```ts
  type DataVariant = "max" | "mid" | "low" | "empty";
  interface VariantSwitcherProps {
    variants: { id: DataVariant; label: string; reportName: string }[];
    current: DataVariant;
    onChange: (v: DataVariant) => void;
  }
  ```
- **UI:** floating pill bottom-right · `position:fixed; bottom:24px; right:24px; z-index:var(--z-fab)` · `Button variant=secondary size=sm` shows "Variant: MAX ▾" · dropdown opens w/ 4 options (Card · radius-sm · shadow-lg · backdrop-blur)
- **URL param:** Next 15 `useSearchParams()` · reads `?variant=` on mount · default `max` · setter does `router.replace('?variant=' + v, {scroll:false})`
- **Dev-mode gate:** `process.env.NEXT_PUBLIC_PDP_VARIANT_SWITCHER === 'true'` AND `process.env.NODE_ENV !== 'production'`
- **Consumption:** React Context (`ReportDataContext`) provider at page-level · `useReport()` hook · no prop drilling
- **Mock data:** `src/data/mock-reports/{max,mid,low,empty}.ts`
- **Persistence:** URL param source of truth · localStorage backup `pdp.variant` for refresh

---

## Deliverable 5 · Token-only audit

**Result: 7 of 8 flagged gaps covered by existing core-v2 tokens. 1 real gap.**

| Gap | Coverage | Action |
|---|---|---|
| editorial-light surface | `--bg-pure-white` + `--warm-300` | Use existing |
| cinematic-dark surface | `--variant-cinematic-bg-deep` | Use existing |
| dark CTA gradient | `--composition-gradient-cinematic-base` + `--composition-gradient-brand-red-cta` | Use existing |
| editorial card shadow | `--shadow-md` rest → `--shadow-lg` hover | Use existing |
| **brand-red CTA glow** | Partial — only purple-accent shadows exist | **LOG as TOKEN GAP** |
| on-dark muted text | `--semantic-ink-on-dark-muted` | Use existing |
| on-dark subtle border | `--semantic-hairline-on-dark-soft` + `--border-on-dark-card` | Use existing |
| dark elevated surface | `--semantic-surface-cinematic-1` + `--variant-cinematic-bg-surface` | Use existing |

**TOKEN-GAPS.md proposed:**
```
G1 · --shadow-cta-brand-red-glow · Final CTA DC variant wants brand-red glow ring on hover
Proposed: 0 8px 24px rgba(176,31,36,0.22), 0 2px 8px rgba(0,0,0,0.18)
Status: defer to post-v0.2 DS PR
Workaround in v0.2: use --shadow-lg (neutral) · brand button shimmer conveys conversion intent
```

---

## Deliverable 6 · 11-sprint build plan (60-75 days)

| Sprint | Phase | Scope | Effort | Gate |
|---|---|---|---|---|
| 1 | 3a Foundation | Install @ken-research/charts · ChartCard core-v2 · useAccessControl · VariantSwitcher · 4 mock-data files · AccessGate | L (5-7d) | ChartCard smoke test · VariantSwitcher cycles 4 fixtures |
| 2 | 3b Hero+Snapshot | Sections 1-4 · LC+DC HeroBackground · HeroCockpit · HeroRightRail · TrustStrip · ReportSnapshotPanel | L (6-8d) | Hero renders 4 variants · cockpit works · reduced-motion verified |
| 3 | 3c Nav+Stats+Summary | Sections 5-7 · useScrollSpy · KeyStatsStrip auto-balance · TakeawayCardGrid · UseCaseChipRow · StickyPDPNav | M (4-5d) | Scroll-spy works · 3/4/6/8 stat balance · summary renders |
| 4 | 3d Scope+Definitions+Taxonomy+Ecosystem | Sections 8-13 · GenesisTimeline · SeasonalityCalendar · GlossaryCardGrid · TaxonomyTree · EcosystemTabs · LogoTierGrid | L (7-9d) | All 6 sections 4 variants · empty hides correctly |
| 5 | 3e Market Size+Submarkets+Segmentation | Sections 14-16 · multiple ChartCards · DatasetPreviewTable · 7-segment-tab · paywall overlay | L (8-10d) | All 3 sections 4 variants · paywall on 3rd interaction · row counts match access |
| 6 | 3f Industry+End-User+DSGap+Competitor | Sections 17-20 · SWOTGrid · DriverCardGrid · ValueChainStepper · ChallengeSolutionGrid · EndUserSectorGrid · GapAnalysisCard · CompetitorTimeline (SVG) · CompetitorMatrixBubble (Recharts fallback) · CompanyComparisonTable mobile-cards | L (8-10d) | Competitor 4-sub-tab MAX → single-card LOW |
| 7 | 3g Trends+Regulatory+Forecast+Opportunities+Macro | Sections 21-25 · TrendCardGrid tabbed · RegulationCardGrid · Forecast ChartCard + ForecastAssumptionsLockedCard · OpportunityCardGrid · RecommendationTabsByBuyerType · MacroIndicatorGrid | M (5-7d) | Forecast nav auto-hides when missing |
| 8 | 3h Methodology+TOC+FAQ+Related+CTA+Footer | Sections 26-30 · MethodologyStepper + sub-modules · TOCAccordion 3-tier · FAQ 10 AnswerBlocks · Related (reuse) · FinalCTABlock DC · DummyFooter DC | M (5-7d) | All 30 sections shippable · MAX renders all · LOW hides 10+ |
| 9 | 4 SEO/GEO/GXO+Schema+Analytics | AnswerBlock atom finalized · JsonLdInjector (8 schema types) · 24 analytics events · UTM hidden fields | M (4-6d) | Lighthouse SEO 95+ · schema validates · events fire |
| 10 | 5 QA+A11y+Perf | aura-qa Playwright · axe · Lighthouse · per PRD §50 · 4-variant snapshots · reduced-motion tests | M (5-7d) | LCP <2.5s · CLS <0.1 · INP <200ms · axe 0 violations |
| 11 | 6 Handover | STATUS · HANDOVER · README · tracker flip · promotion proposals | S (2d) | Tracker green · docs in place |

**Critical path:** Sprint 1 → 2 → 5 (ChartCard chain).

---

## Deliverable 7 · 10 open questions (BLOCK gate)

| # | Decision | Default recommendation | Confirm? |
|---|---|---|---|
| Q1 | VariantSwitcher mount location | Page-level (`app/[slug]/page.tsx` w/ ReportDataContext.Provider · switcher at layout root) | ☐ |
| Q2 | Hero right-rail priority when both cover image + mini chart available | L1 cover image wins · override-prop `forceFallback="chart"` for chart-forward demo | ☐ |
| Q3 | ChartCard meter-pill visibility | Always-show when `access.tier !== 'paid'` (continuous "3/10 unlocks used") | ☐ |
| Q4 | Mobile <768px right-rail | Move below left content · cover hides · chart-mini below trust strip | ☐ |
| Q5 | ContactModal | Reuse core-v2 · wire PDP-specific hidden fields | ☐ |
| Q6 | Bubble · Timeline · Map · ValueChain GAP from Ken Charts | Request from Saurabh BEFORE Sprint 6 · build local Recharts fallback if not delivered by Sprint 5 exit · tag `// TODO: migrate` | ☐ |
| Q7 | Industry Analysis grouping | Single H2 "Industry Analysis" w/ 4 sub-modules · sticky nav shows "Industry" once | ☐ |
| Q8 | Dark cinematic hero · chart approach | Light card inset on dark hero (Linear/Cursor pattern) · preserves chart legibility | ☐ |
| Q9 | ChartCard CTA hierarchy | Primary "Download Sample Report" · secondary "Talk to Analyst" · tertiary "Unlock" (paid only) | ☐ |
| Q10 | EMPTY variant render | Fully empty · Hero+Footer only · forces section guards to be honest | ☐ |

---

## Approval gate

User approves all 7 deliverables (or amends) BEFORE Phase 3 COMPOSE starts.
