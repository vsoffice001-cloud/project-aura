# V0.4 V1 PRODUCT PAGE · MASTER PLAN (section-by-section)

**Date:** 2026-05-20 · **Owner:** Aura · **Status:** awaiting user approval per-section before build
**Supersedes:** SECTION-CANON-V03.md (still valid reference · this layers v0.4 decisions on top)
**Drives:** v0.4 project build (new folder `projects/v1-project/v1-product-page-ver0.4/` · v0.3 frozen read-only)

---

## §0 · How to use this doc

Section-by-section execution protocol per user 2026-05-20 directive:

1. **Per section** → I show this doc's row for that section
2. **User confirms or edits** the layout/content/UX decisions
3. **I build** that section only · push to localhost · screenshot
4. **User confirms UI** matches expectation
5. **Move to next section** only after sign-off
6. **No batching · no autonomous multi-section sweeps**

This protocol fixes the v0.3 regression root cause documented in `feedback_canonical_workflow_reset.md`: AI invents flat substitutes when DS organism missing, then ships 5 unapproved sections at once.

---

## §1 · Problem-statement synthesis · audit + PRD

### 1.1 · Live-page painpoints (P1-P10 · already canonical in SECTION-CANON-V03 §1)

| # | Painpoint | Live evidence | v0.4 hard-fix |
|---|---|---|---|
| **P1** | Text walls — multi-paragraph blocks · no visual breaks | All 3 pages | LongFormReader DS · 280-char body cap before break · sidekick chart slot · "View more" disclosure |
| **P2** | Empty sections — heading-only, no payload | India Kitchen §Challenges | `shouldRenderSection()` + DS EmptyState · auto-hide if `visibilityStatus !== published` |
| **P3** | Charts referenced not rendered — "see chart X" w/o adjacent chart | India Kitchen · KSA | ChartCard mandatory · Ken Charts everywhere · static fallback only via `<img>` w/ alt + dataset table |
| **P4** | Redundant tab nav — top tab strip duplicates body anchors | All 3 pages | StickyPDPNav = scroll-spy ONLY (jump-link via IntersectionObserver) · no duplicate content |
| **P5** | Data inconsistency — FAQ contradicts body | India $10.35Bn vs $6.08Bn · KSA 9.7% vs 11.9% | Single source of truth · mock-data.ts canonical · all sections read same payload · publish-gate validates parity |
| **P6** | Weak CTA hierarchy — 2 primary same color · 5+ CTAs/page | All 3 pages | 3-tier strict · max 2 CTAs/viewport · primary=brand-red filled / secondary=outline / tertiary=ghost |
| **P7** | Sparse competitors — KSA 4 players no share viz | KSA | Tier-grouped grid · ALWAYS show market-share %, even if N=3 · empty tiers collapse not stub |
| **P8** | Whitespace inconsistency | All 3 pages | `--space-16` between sections · `--space-10` within · `--space-6` card pad · enforced via SectionWrapper |
| **P9** | TOC dump — 50+ items expanded · users scroll past | India Kitchen | Collapsed-default · "Expand all" toggle · chapter count badge · subsection count per chapter |
| **P10** | Density mismatch — LOW pages look broken · MAX overwhelms | KSA=LOW · Australia=MAX same template | **3 density variants** · MAX (full) · MID (most reports) · LOW (sparse). Visibility per section via `shouldRenderSection()` + `accessLevel` + content presence |

### 1.2 · PRD V2.1 requirements (mandatory per page)

- **30 sections per master architecture** (PRD §5) · plug-in/plug-out logic so light reports render w/o broken empty sections (PRD §15.1)
- **Card containers** per major block w/ heading + insight + body + embedded component (PRD §4)
- **Interactive charts** via @ken-research/charts · 8-element ChartCard anatomy (eyebrow · title · insight · controls · body · dataset · source · CTA) (PRD §9.1)
- **6 access levels** · public / metered / lead-gated / login-gated / paid / hidden (PRD §10)
- **Contextual CTAs** tied to chart/section IDs · 9 CTA locations w/ primary+secondary pair · 14 hidden CRM fields (PRD §13)
- **AI answer blocks** on every page · 10 mandatory questions (market size · forecast · CAGR · segments · companies · drivers · challenges · includes · methodology · buyer-fit) (PRD §12.2)
- **Schema markup** · Organization · WebPage · BreadcrumbList · Product · CreativeWork/Report · Dataset · FAQPage · Paywalled markup (PRD §12.3)
- **Core Web Vitals** · LCP <2.5s · CLS <0.1 · INP <200ms · mobile PageSpeed 80+ · desktop 90+ (PRD §14)

### 1.3 · User's v0.4 hard requirements (2026-05-20 directive)

Lifted verbatim from user message:

1. **Section-by-section build** · user confirms each before next
2. **Hero** · image bg · left content+info over overlay-masked bg · right side empty · breadcrumb ON hero (not separate strip)
3. **Side TOC** · left · sticky · height = `calc(vh - 120px)` · content scrollable · always-visible bottom CTA+text · active title visible on right hand on scroll · truncated short titles · tooltip on hover for truncated only · tooltip = report-store-page pattern
4. **Right side** · section-by-section content like v0_lite + v0.2
5. **Sample-preview section** · like v0_lite report
6. **CTA banner** · "beautiful, new design — not what I created in all designs before" · reference v0_lite pattern
7. **Footer** · NOT what I created before · new design referencing v0_lite
8. **Reuse DS** · everything in DS + components from v0_lite + v0.2 that should be same
9. **Verify UX laws per section** · safe for all devices · max data shown w/o ugly compromise
10. **Modular template** · handles MAX (Australia full) + MID (medium content) + LOW (sparse / no charts) scenarios
11. **Section names DO NOT change** · users recognize section names → expected content
12. **Backend will populate** per section/tab when CMS ready

---

## §2 · Page architecture · v0.4

### 2.1 · Chrome layers (always visible regardless of section)

| Layer | Component | DS source | Notes |
|---|---|---|---|
| **L1** | DummyHeader | `organisms/DummyHeader.tsx` | per `project_dummy_header_footer_sources.md` · sticky top:0 · z-50 · 64px |
| **L2** | Hero (full-width, NOT card-wrapped) | NEW `ReportHeroV04` (variant of `ReportHeroSection`) | image bg · left content w/ overlay mask · breadcrumb above H1 INSIDE hero · right side intentionally negative space |
| **L3** | StickyPDPNav (chip strip) | NEW (extends `useScrollSpy` hook) | 8-12 section chips · sticky top:64px · z-40 · scroll-spy active state · horizontal scroll on mobile |
| **L4** | 2-col body (TOC + content) | NEW `PDPLayoutV04` template | TOC col 240px · content col flex-1 max-880px |
| **L5** | SamplePreview section | DS `SampleReportPreview` organism (already shipped) | full-width below 2-col body |
| **L6** | CTA Banner | NEW `CTABannerV04` (NOT existing `FinalCTASection` · NOT existing `CTABanner` · NOT existing `ReportFinalCTASection`) | reference v0_lite pattern · brief calls for "new design" |
| **L7** | DummyFooter | `organisms/DummyFooter.tsx` | per memory · NEW variant per user brief |
| **L8** | BottomCTABar | `organisms/StickyCTA.tsx` | appears trailing 30% scroll · hides when L6 CTA Banner visible (IntersectionObserver) |
| **L9** | ReadingProgressBar | `organisms/ReadingProgressBar.tsx` | top 2px brand-red · tracks page scroll % |
| **L10** | ScrollToTop | atom (TBD · check `core-v2/src/atoms/`) | floating bottom-right · appears below 40% scroll |

### 2.2 · 2-col body grid (L4)

```
┌─────────────────────────────────────────────────────────────────┐
│  L2 HERO (full-width)                                            │
├─────────────────────────────────────────────────────────────────┤
│  L3 STICKY PDP NAV (full-width · sticky)                         │
├──────────────┬──────────────────────────────────────────────────┤
│              │                                                  │
│  L4a         │  L4b · Section content                           │
│  Side TOC    │  (flex-1 · max 880px · centered if rail hidden)  │
│  (240px)     │                                                  │
│              │  Each section · SectionWrapper · padding-y       │
│  - sticky    │  In-section Tabs (Radix) for dense modules       │
│  - top:120   │  Bg alternation warm/white within col            │
│  - max-h:    │                                                  │
│    calc(vh - │                                                  │
│    120px)    │                                                  │
│  - overflow: │                                                  │
│    auto      │                                                  │
│  - bottom    │                                                  │
│    pinned    │                                                  │
│    CTA card  │                                                  │
│              │                                                  │
└──────────────┴──────────────────────────────────────────────────┘
│  L5 SAMPLE PREVIEW (full-width)                                  │
│  L6 CTA BANNER (full-width)                                      │
│  L7 FOOTER (full-width)                                          │
```

- **Container max** · 1240px (TOC 240 + gap 40 + content 880 + gutter 80)
- **TOC collapses below 1024px** · hidden behind hamburger · scroll-spy still active via PDP nav chip strip
- **Content col centers** when TOC hidden

### 2.3 · Side-TOC spec (user-requested detail)

| Concern | Spec |
|---|---|
| Width | 240px fixed desktop · hidden <1024px |
| Position | sticky top:120px (under header 64px + sticky-nav 56px) |
| Height | `max-height: calc(100vh - 120px - 24px-bottom-pad)` |
| Overflow | `overflow-y: auto` · custom scrollbar (DS `--scrollbar-*` tokens) |
| Active state | scroll-spy via `useScrollSpy` (DS hook · already shipped) · brand-red left-border 2px · `--text-strong` color |
| Inactive state | `--text-subtle` color · no border |
| Title truncation | `max-width: 200px · text-overflow: ellipsis · white-space: nowrap` |
| Tooltip behavior | shown ONLY when title truncated · 250ms delay · placement="right" · pattern = report-store-page Tooltip molecule (check `molecules/Tooltip.tsx` or similar) |
| Bottom pinned area | always visible · sticky bottom · contains 1 micro-CTA card · text ("Need full report?") + Button variant="primary-sm" ("Download Sample") |
| Mobile | TOC swaps to off-canvas drawer triggered by hamburger in StickyPDPNav |
| Scroll-into-view on active change | when scroll-spy advances active section · auto-scroll TOC list so active item visible in TOC viewport · uses `scrollIntoView({block: 'nearest', behavior: 'smooth'})` |

**DS reuse:** existing v0.3 `SideTOC.tsx` project-local (not DS) is starting point · extend w/ bottom-pinned CTA card · wire to `useScrollSpy` · use DS `Tooltip` molecule for truncation hover.

---

## §3 · Section-by-section plan (25 sections · MAX variant)

### Reading guide for each row
- **§ DOM id** · CMS section_type
- **Painpoints addressed** · P1-P10 from §1.1
- **PRD ref** · which PRD module(s)
- **Layout** · how content arranged
- **DS components to reuse** · explicit
- **NEW components needed** · explicit
- **3-tier density** · MAX / MID / LOW behavior
- **UX laws applied**
- **PRD gaps flagged** · what PRD doesn't tell us

---

### §3.1 · Hero · `#hero`

| Concern | Decision |
|---|---|
| **Painpoints** | P6 weak CTA · P8 whitespace |
| **PRD ref** | §5 item 2 · §8.1 · §6.1 example |
| **Layout** | Full-width · image bg (cold-chain warehouse photo) · gradient overlay left→right (dark→transparent) · LEFT 60% content stack (breadcrumb · eyebrow · H1 · promise · 4 metric chips · 2 CTAs) · RIGHT 40% intentional negative space (image breathes) |
| **Content (Australia example)** | Breadcrumb `Home > Reports > Logistics > Cold Chain > Australia Cold Chain Market` · Eyebrow `LOGISTICS · AUSTRALIA · 2022–2027` · H1 `Australia Cold Chain Market Outlook 2022-2027` · Promise `Market size, segmentation, competitor landscape, growth drivers, and forecast outlook for Australia's cold chain industry.` · Chips: `AUD 6,547.8 Mn (2022)` · `AUD 10,705.0 Mn by 2027` · `10.03% CAGR` · `90 pages · Nov 2025` · CTAs: primary `Download Sample` + secondary `Talk to Analyst` |
| **DS reuse** | `MegaBreadcrumb` (place INSIDE hero · not separate strip) · `Badge` × 4 (metric chips) · `Button` primary + secondary · `OverheadText` atom (eyebrow) · `DisplaySerifLead` (promise) |
| **NEW component** | `ReportHeroV04` · variant of existing `ReportHeroSection` w/ image-bg + overlay-mask + breadcrumb-inside slot · ~120 LOC · sidecar .md |
| **Hero cockpit toggle** | PRD §6.1 demands 5 toggles (Market Size · Forecast · Segmentation · Competitors · Methodology). **DEFER to phase 2** — first ship static hero, add cockpit toggle as enhancement once base ships. Flag in PRD gaps §5. |
| **3-tier density** | MAX shows 4 metric chips · MID shows 3 · LOW shows 2 (just market-size + CAGR) |
| **UX laws** | Fitts' Law (CTA size ≥44px tap target) · Hick's Law (2 CTAs max in hero) · Visual hierarchy (H1 5× scale vs body) · Aesthetic-Usability (image quality matters) · Von Restorff (red CTA isolates) |
| **A11y** | H1 single per page · breadcrumb `nav aria-label="Breadcrumb"` · image `aria-hidden + role="presentation"` (decorative) · overlay text contrast ≥7:1 via dark gradient · CTAs `aria-label` w/ report title |
| **Mobile** | Stack: breadcrumb · eyebrow · H1 · promise · 4 chips (2×2 grid) · CTAs stacked full-width · image height 220px clamp · overlay full-cover |

---

### §3.2 · Report Snapshot (embedded in Hero) · `#snapshot`

| Concern | Decision |
|---|---|
| **Painpoints** | P8 whitespace |
| **PRD ref** | §5 item 3 · §8.2 |
| **Layout** | Below hero CTAs · single horizontal strip · 5 metadata pills: `Report Code KRR71` · `Published Nov 2025` · `90 Pages` · `Base Year 2024` · `Forecast 2022–2027` |
| **DS reuse** | `CardMetaRow` molecule (check exists in molecules/) or `MetadataStrip` |
| **NEW** | none if existing molecule fits |
| **3-tier** | identical all tiers · always render |
| **UX laws** | Law of Proximity (group related metadata) |

---

### §3.3 · Sticky PDP Nav · `#sticky-nav`

| Concern | Decision |
|---|---|
| **Painpoints** | P4 redundant nav |
| **PRD ref** | §5 item 4 |
| **Layout** | Full-width · sticky top:64px · z-40 · horizontal chip strip · 8-12 chips · primary section names (Overview · Market Size · Segments · Competitors · Forecast · Methodology · TOC · FAQ) · mobile-scroll horizontal w/ shadow-fade edges |
| **DS reuse** | `Chip` atom · `useScrollSpy` hook · `useScrollDirection` hook (auto-hide on scroll-down) |
| **NEW** | `StickyPDPNavV04` molecule · ~80 LOC |
| **3-tier** | chip list filtered by visible sections (`shouldRenderSection()` results) |
| **UX laws** | Doherty Threshold (transition <400ms) · Jakob's Law (chip strip pattern recognized) |
| **A11y** | `nav aria-label="Section navigation"` · chips `<button aria-current="true">` for active · keyboard arrows nav |
| **Mobile** | horizontal-scroll · momentum scroll · 56px tap targets |

---

### §3.4 · Key Stats Strip · `#key-stats`

| Concern | Decision |
|---|---|
| **Painpoints** | P1 text walls · P8 whitespace (stats buried in paragraphs on live pages) |
| **PRD ref** | §5 item 5 · §8.2 · §6.2 (Australia 6 cards example) |
| **Layout** | 6-card responsive grid · desktop 6-col · tablet 3×2 · mobile 2×3 · each card: label / value (large serif metric) / unit-period / access-state icon |
| **Content (Australia)** | `Market Size 2022` `AUD 6,547.8 Mn` public · `Forecast 2027` `AUD 10,705 Mn` public · `CAGR 2022-27` `10.03%` public · `Cold Storage 2022` `AUD 2,647.8 Mn` metered · `Cold Transport 2022` `AUD 3,900 Mn` metered · `Players` `200-250` public |
| **DS reuse** | `KeyStatsStrip` organism (already shipped · `organisms/KeyStatsStrip.tsx`) · `StatCard` molecule · `Lock` icon for metered |
| **NEW** | none if existing organism supports access-state icon · ELSE extend |
| **3-tier** | MAX 6 cards · MID 4 cards · LOW 4 cards (drop submarket cards) |
| **UX laws** | Law of Common Region (cards group stats) · Aesthetic-Usability (serif metric = premium feel) |
| **A11y** | semantic `<dl>` · `<dt>` label · `<dd>` value (per a11y rule in memory) · `aria-label` on each card w/ full label+value |

---

### §3.5 · Executive Summary · `#executive-summary`

| Concern | Decision |
|---|---|
| **Painpoints** | P1 text walls |
| **PRD ref** | §5 item 6 · §8.3 |
| **Layout** | 2-col within content col · LEFT 60% prose (Why this matters · boardroom summary 200 words max · top 3-5 takeaways as bullets) · RIGHT 40% sidekick (`AnswerBlock` w/ 4 use-case chips: Market entry / Benchmarking / Investment screening / Expansion planning) |
| **DS reuse** | `LongFormReader` organism · `AnswerBlock` atom (or check `core-v2/src/atoms/`) · `FilterChip` × 4 · `Card` |
| **NEW** | `AnswerBlock` atom if missing — per SECTION-CANON-V03 §5 it's "missing from v0.2 entirely" · BUILD if absent |
| **3-tier** | MAX 5 takeaways · MID 3 · LOW 2 (collapse use-case chips into single line) |
| **UX laws** | Pyramid Principle (boardroom summary = top-down) · Cognitive Load (200 words capped) |

---

### §3.6 · Report Scope & Coverage · `#scope`

| Concern | Decision |
|---|---|
| **Painpoints** | P8 whitespace |
| **PRD ref** | §5 item 7 · §8.4 |
| **Layout** | Card · 4-col grid of chip arrays: `Segments Covered` · `Geography` · `Period` · `Deliverables` · `Customization` |
| **Content (Australia)** | Segments: Cold Storage · Cold Transport · By End-User · By Temp · By Region · By Truck Type · By Mode · By Domestic/Intl ; Geography: Australia (Sydney · Melbourne · Brisbane · Others); Period: 2017-2022 historical + 2022-2027 forecast; Deliverables: 90-page PDF · Excel datasets · Analyst call · 30-day support; Customization: Available |
| **DS reuse** | `Card` · `FilterChip` array · `Badge` |
| **NEW** | none |
| **3-tier** | identical all tiers · always render |

---

### §3.7 · Country & Infrastructure Context · `#country-infra`

| Concern | Decision |
|---|---|
| **Painpoints** | P3 charts referenced not rendered |
| **PRD ref** | §5 item 8 · §8.5 |
| **Layout** | In-section Tabs · 2 tabs: `Country` · `Infrastructure`. Country tab: 3 mini stat cards (Population · GDP · Trade Volume) + 200-word context w/ "Why this matters for cold chain" callout. Infrastructure tab: 4 mini cards (Road · Sea · Air · Rail) each w/ key fact + relevance line |
| **DS reuse** | `Tabs` (Radix) · `DataHighlightCard` · `Card` · `Badge` (relevance) |
| **NEW** | none |
| **3-tier** | MAX both tabs · MID Country tab only · LOW hide section |
| **PRD gap** | PRD §8.5 demands mini charts + maps · charts deferred to ChartCard system · maps deferred to MapChart organism (already shipped). Confirm both available before this section. |

---

### §3.8 · Market Overview & Genesis · `#market-overview`

| Concern | Decision |
|---|---|
| **Painpoints** | P1 text walls · P8 whitespace |
| **PRD ref** | §5 item 9 · §8.6 |
| **Layout** | In-section Tabs · 4 tabs: `Overview` · `Genesis` · `Business Cycle` · `Seasonality`. Overview = `LongFormReader` prose + sidekick `Market Size 2017-22` mini chart. Genesis = `GenesisTimeline` (preserve from v0.3). Business Cycle = stepper visual. Seasonality = `SeasonalityCalendar` (preserve from v0.3) |
| **DS reuse** | `Tabs` · `LongFormReader` · `Card` |
| **PRESERVE from v0.3** | `GenesisTimeline` organism · `SeasonalityCalendar` molecule — both already refactored per audit report (v0.3 GenesisTimeline went from 15 inline-style blocks → Tailwind already) |
| **3-tier** | MAX 4 tabs · MID 2 (Overview + Genesis) · LOW Overview only |

---

### §3.9 · Definitions Glossary · `#definitions`

| Concern | Decision |
|---|---|
| **Painpoints** | P1 text walls |
| **PRD ref** | §5 item 10 · §8.7 |
| **Layout** | Accordion · 3 expanded default · terms · inclusion/exclusion scope · assumptions · abbreviations |
| **Content (Australia)** | 7 terms · Ambient · Frozen · Chiller · Captive · Non-Captive · Cold Transport · Cold Chain Market |
| **DS reuse** | `Accordion` (Radix · check `core-v2/src/ui/accordion.tsx`) · `Card` |
| **NEW** | none |
| **3-tier** | MAX all 7 · MID 4 · LOW 3 |

---

### §3.10 · Taxonomy Tree · `#taxonomy`

| Concern | Decision |
|---|---|
| **Painpoints** | P3 charts referenced not rendered |
| **PRD ref** | §5 item 11 · §8.7 |
| **Layout** | Interactive parent/child tree visualization · indent levels · expand/collapse · SEO-readable (`<details>`/`<summary>` semantic) |
| **DS reuse** | `TaxonomyTree` organism (already shipped) |
| **NEW** | none |
| **3-tier** | MAX all nodes · MID 2 levels deep · LOW flat list |

---

### §3.11 · Market Ecosystem · `#ecosystem`

| Concern | Decision |
|---|---|
| **Painpoints** | P3 charts referenced not rendered |
| **PRD ref** | §5 item 12 · §6.5 · §8.8 |
| **Layout** | In-section Tabs · 4 tabs (PRD §6.5): `Cold Chain` · `Cold Storage` · `Cold Transport` · `Associations & Certifications`. Each tab: 200-word context + LogoTierGrid (3 tiers per pallet capacity) + AssociationStrip on tab 4 |
| **DS reuse** | `Tabs` · `AssociationStrip` organism (already shipped) · `Card` |
| **NEW** | `LogoTierGrid` molecule · ~80 LOC · tier label + logo grid 4-col · empty tier collapses (P7) |
| **3-tier** | MAX 4 tabs · MID 2 (Cold Chain + Associations) · LOW LogoStrip only flat |

---

### §3.12 · Market Size & Growth · `#market-size`

| Concern | Decision |
|---|---|
| **Painpoints** | P3 charts referenced · P5 data consistency |
| **PRD ref** | §5 item 13 · §6.3 · §8.9 |
| **Layout** | In-section Tabs · 2 tabs: `Historical (2017-2022)` · `Forecast (2022-2027)`. Each tab = `ChartCard` w/ 8-element anatomy (eyebrow · title · insight · controls · chart body · dataset preview · source · CTA) |
| **DS reuse** | `Tabs` · NEW `ChartCard` molecule (see §3.0 note) · `@ken-research/charts` `DualAxisBarLine` · `AnswerBlock` |
| **NEW** | `ChartCard` molecule · MUST IMPLEMENT FIRST · ~180 LOC · 8 slots: eyebrow / title / insight / controls / body / dataset / source / cta · accessLevel prop drives lock-state UI · sidecar .md |
| **3-tier** | MAX both tabs w/ full chart · MID Historical tab only · LOW static `<img>` fallback w/ `<figcaption>` data summary + dataset table |
| **PRD gap** | PRD §10 metered/lead-gated UX behavior NOT spec'd in detail. Assume: metered = first 2 chart-expand clicks free · 3rd triggers email form · cookie tracks `interactionCount`. |

---

### §3.13 · Submarket Intelligence · `#submarkets`

| Concern | Decision |
|---|---|
| **Painpoints** | P3 charts referenced |
| **PRD ref** | §5 item 14 · §6.3 · §8.9 |
| **Layout** | In-section Tabs · 2 tabs: `Cold Storage` · `Cold Transport`. Each tab: revenue chart + 4 stat cards (pallets · price/pallet · occupancy · player count) + 200-word insight |
| **DS reuse** | `Tabs` · `ChartCard` · `StatCard` · `LongFormReader` |
| **NEW** | none beyond ChartCard |
| **3-tier** | MAX both tabs · MID Cold Storage only · LOW hide section |
| **PRD gap** | "Other report-specific submarkets" (PRD §5 item 14) — how to know per-report which submarkets exist? Assume CMS-driven repeater. Spec deferred. |

---

### §3.14 · Segment Intelligence Tabs · `#segmentation`

| Concern | Decision |
|---|---|
| **Painpoints** | P3 charts · P7 sparse competitors |
| **PRD ref** | §5 item 15 · §6.4 · §8.10 |
| **Layout** | In-section Tabs · 7 tabs (PRD §6.4): `End-User` · `Market Type` · `Temperature` · `Region` · `Reefer Truck` · `Transport Mode` · `Domestic/Intl`. Each tab: chart + dataset table + dominant-segment badge + analyst note + per-segment unlock CTA. Hide missing tabs auto. |
| **DS reuse** | `Tabs` · `ChartCard` · `SegmentationSection` organism (already shipped · check capability) · `Badge` for dominant-segment |
| **NEW** | none beyond ChartCard · maybe `DominantSegmentBadge` atom |
| **3-tier** | MAX 7 tabs · MID 4 (End-User · Type · Region · Mode) · LOW 2 (End-User · Type) |
| **UX law** | Hick's Law (7 tabs is upper bound · auto-hide missing keeps real count visible ≤7) |

---

### §3.15 · Industry Analysis · `#industry`

| Concern | Decision |
|---|---|
| **Painpoints** | P1 text walls · P3 charts referenced |
| **PRD ref** | §5 item 16 · §8.13 |
| **Layout** | In-section Tabs · 4 tabs: `SWOT` (2×2 grid) · `Drivers` (card grid w/ impact badges) · `Challenges` (challenge-solution paired cards) · `Trends & Tech` (cards for IoT/digitization/e-com/sustainability) |
| **DS reuse** | `Tabs` · `GrowthDriversChallenges` organism (already shipped · USE for drivers + challenges tabs · per audit P3.3d learning) · `Card` · `IconBox` (no brand variant per anti-pattern rule 19) · `Badge` |
| **NEW** | `SWOT2x2Grid` molecule · ~100 LOC · 4 quadrants Strengths/Weaknesses/Opportunities/Threats w/ expand-on-click |
| **3-tier** | MAX 4 tabs · MID 2 (SWOT + Drivers) · LOW Drivers only |

---

### §3.16 · End-User Deep Dives · `#end-user`

| Concern | Decision |
|---|---|
| **Painpoints** | P10 density (sparse on lighter reports) |
| **PRD ref** | §5 item 17 · §8.11 |
| **Layout** | In-section Tabs · 3 tabs: `Sectors` (Meat/Seafood · Pharma · RTE Meals · Dairy cards) · `Shelf Life Matrix` (table: product · temp · shelf-life · tech requirement) · `Players & 3PL` (3PL vs owned split card chart) |
| **DS reuse** | `Tabs` · `Card` · `MarketDataTable` organism (already shipped · use for shelf-life table) |
| **NEW** | none |
| **3-tier** | MAX 3 tabs · MID Sectors only · LOW hide section |

---

### §3.17 · Demand-Supply Gap · `#ds-gap`

| Concern | Decision |
|---|---|
| **Painpoints** | P3 charts referenced |
| **PRD ref** | §5 item 18 · §7 |
| **Layout** | No tabs · single ChartCard (DualBar demand+supply per year) + `DataHighlightCard` for headline gap + 2 `Card` regional callouts |
| **DS reuse** | `ChartCard` · `DataHighlightCard` (atom) · `Card` |
| **NEW** | none beyond ChartCard |
| **3-tier** | MAX render · MID render w/ chart only · LOW hide |
| **PRD gap** | PRD §7 lists "Demand-supply gaps" as ADDED module · no UI spec given. Spec inferred. |

---

### §3.18 · Competitor Landscape · `#competitor`

| Concern | Decision |
|---|---|
| **Painpoints** | P3 charts · P7 sparse competitors |
| **PRD ref** | §5 item 19 · §6.5 · §8.12 |
| **Layout** | In-section Tabs · 4 tabs (PRD §6.5): `Companies` (logo grid · 5+ profile cards) · `Timeline` (major-player history) · `Market Share` (horizontal bar chart) · `Positioning Matrix` (bubble/scatter pallets vs occupancy) |
| **DS reuse** | `Tabs` · `CompetitiveLandscape` organism (already shipped · check capability) · `Card` · `ComparisonTable` organism (full benchmark · lead-gated) · `@ken-research/charts` HorizontalBar + BubbleChart |
| **NEW** | `CompetitorTimeline` molecule · ~120 LOC (horizontal timeline w/ company logos along axis) |
| **3-tier** | MAX 4 tabs · MID 2 (Companies + Market Share) · LOW Companies only flat |
| **Cross-comparison table** | full table lead-gated · mobile converts to company cards (PRD §8.12) |

---

### §3.19 · Regulatory Landscape · `#regulatory`

| Concern | Decision |
|---|---|
| **Painpoints** | P10 density (some reports won't have regs) |
| **PRD ref** | §5 item 21 · §8.13 |
| **Layout** | No tabs · regulation cards grid · each card: authority logo · name · summary · impact-on-market badge (High/Med/Low) |
| **Content (Australia)** | HACCP · Food Standards Australia/NZ · Biosecurity Act · Chain of Responsibility (COR) |
| **DS reuse** | `Card` · `Badge` · `IconBox` |
| **NEW** | none |
| **3-tier** | MAX all regs · MID 3 cards · LOW hide |

---

### §3.20 · Future Outlook & Forecast · `#future-outlook`

| Concern | Decision |
|---|---|
| **Painpoints** | P3 charts · P5 data consistency |
| **PRD ref** | §5 item 22 · §8.9 |
| **Layout** | In-section Tabs · 3 tabs: `Overall` · `Cold Storage` · `Cold Transport`. Each tab: forecast ChartCard + assumption cards (drivers/risks affecting forecast) |
| **DS reuse** | `Tabs` · `ChartCard` · `Card` |
| **NEW** | none |
| **3-tier** | MAX 3 tabs · MID Overall only · LOW hide |

---

### §3.21 · Opportunities & Analyst Recommendations · `#opportunities`

| Concern | Decision |
|---|---|
| **Painpoints** | P10 density |
| **PRD ref** | §5 item 23 · §8.14 |
| **Layout** | In-section Tabs · 4 tabs by buyer type (PRD §8.14): `Investors / New Entrants` · `Government` · `Existing Companies` · `Cold Storage Operators`. Each tab: recommendation cards · lead-gated `Badge` on premium recs |
| **DS reuse** | `Tabs` · `Card` · `Badge` lead-gated state |
| **NEW** | none |
| **3-tier** | MAX 4 tabs · MID 2 (Investors + Existing) · LOW hide |

---

### §3.22 · Macroeconomic Indicators · `#macro`

| Concern | Decision |
|---|---|
| **Painpoints** | P3 charts · P10 density |
| **PRD ref** | §5 item 24 · §8.5 |
| **Layout** | In-section Tabs · 4 tabs: `GDP` · `Trade` · `Population` · `Infrastructure`. Each tab: ChartCard + `DataHighlightCard` headline · "Relevance to cold chain" callout per PRD §8.5 |
| **DS reuse** | `Tabs` · `ChartCard` · `DataHighlightCard` · `KeyMarketIndicators` organism (already shipped) |
| **NEW** | none |
| **3-tier** | MAX 4 tabs · MID GDP+Trade only · LOW hide |

---

### §3.23 · Research Methodology · `#methodology`

| Concern | Decision |
|---|---|
| **Painpoints** | P10 density · methodology UNIVERSALLY ABSENT on live pages — single biggest trust win |
| **PRD ref** | §5 item 25 · §6.6 · §8.15 |
| **Layout** | In-section Tabs · 4 tabs (PRD §6.6): `Secondary Research` · `Primary Research` · `Sanity Checking` · `Modeling & Limitations`. Each tab: numbered stepper card + content. Sample-size inclusion (50-60 cold storage · 20-30 food/restaurant · 15-20 industry experts · C-Level 24% / Director 8% / KAM 60% / Other 8%) shown in Primary tab |
| **DS reuse** | `Tabs` · `ResearchMethodology` organism (already shipped) OR `MethodologySection` (already shipped · pick newer per audit decision) · `Card` · stepper component (check `core-v2/src/molecules/`) |
| **NEW** | none if DS organisms support 4-tab pattern · ELSE wrap |
| **3-tier** | MAX 4 tabs · MID Secondary+Primary · LOW Secondary stepper only |
| **Acceptance** | sample-size + limitations + future-conclusion (regression+moving-avg+SPSS-rejection note) all rendered |

---

### §3.24 · Table of Contents · `#toc`

| Concern | Decision |
|---|---|
| **Painpoints** | P9 TOC dump |
| **PRD ref** | §5 item 26 · §8.16 |
| **Layout** | No tabs · Accordion · COLLAPSED default · "Expand all" toggle · chapter count badge per chapter · subsection count per chapter · per-section access state (public preview vs lead-gated) |
| **Content (Australia)** | 17 chapters from live page · each w/ 3-8 subsections |
| **DS reuse** | `TableOfContentsSidebar` organism (already shipped · for SIDE TOC) · for in-section TOC: `Accordion` + custom rendering |
| **NEW** | `TOCAccordion` molecule · ~120 LOC · uses DS `Accordion` w/ chapter badges + access-state indicators |
| **3-tier** | MAX 17 chapters · MID 12 · LOW 8 |
| **A11y** | each chapter `<button aria-expanded>` · subsection `<ul>` proper list semantics |

---

### §3.25 · FAQs · `#faq`

| Concern | Decision |
|---|---|
| **Painpoints** | P5 data inconsistency (KSA + India have FAQ-vs-body conflicts) |
| **PRD ref** | §5 item 27 · §8.16 · §12.3 FAQPage schema |
| **Layout** | No tabs · Accordion · 3 expanded default · JSON-LD FAQPage schema · stats inside FAQ answers must equal canonical stat-strip values (publish-gate validation) |
| **Content (per PRD §12.2)** | 10 mandatory questions: Market size? · Forecast value? · CAGR? · Segments covered? · Companies covered? · Growth drivers? · Key challenges? · What's included? · Methodology? · Who should buy? |
| **DS reuse** | `FAQSection` organism (already shipped · DROP-WRAPPER) |
| **NEW** | none |
| **3-tier** | MAX 10 Qs · MID 6 · LOW 4 |
| **A11y** | each Q `<button aria-expanded>` · A `<div role="region">` |

---

### §3.26 · Sample Report Preview · `#sample-preview`

| Concern | Decision |
|---|---|
| **User brief** | Explicit request · "section of sample preview of report like we did in v0_lite report" |
| **PRD ref** | not in PRD's 30-section list but implicit via PRD §8.4 deliverables · §13 sample-CTA |
| **Layout** | Full-width below 2-col body · NOT inside content col · pattern: heading + carousel of 4-6 page thumbnails + 1 "Download Sample" CTA. v0_lite pattern = 3D-perspective card stack w/ blur overlay on locked pages |
| **DS reuse** | `SampleReportPreview` organism (already shipped) · check capability vs v0_lite reference |
| **NEW** | maybe `SamplePreviewV04` if existing organism doesn't match v0_lite pattern · TBD after read |
| **3-tier** | identical all tiers · always render |
| **A11y** | thumbnails `alt` w/ page summary · "Download Sample" CTA `aria-label` |

---

### §3.27 · CTA Banner · `#cta-banner`

| Concern | Decision |
|---|---|
| **User brief** | EXPLICIT · "beautiful, new design — NOT what I created in all designs before" · "create a new design like v0_lite page" |
| **PRD ref** | §5 item 29 · §13 contextual CTA system |
| **Layout** | NEW design · reference v0_lite pattern · brand-red gradient bg · 60/40 split · LEFT: big serif H2 + supporting line + 2 CTAs (primary Download Sample · secondary Talk to Analyst) · RIGHT: small icon stack or illustrative motif (NOT a product image) |
| **DS reuse** | `Button` × 2 · brand-red gradient utility · DS typography tokens |
| **NEW** | `CTABannerV04` organism · ~140 LOC · DO NOT extend `FinalCTASection` / `CTABanner` / `ReportFinalCTASection` — user explicit "NOT what I created before" |
| **3-tier** | identical all tiers · always render |
| **Reference check** | MUST read v0_lite report CTA implementation before building |

---

### §3.28 · Related Reports · `#related-reports` (inside body 2-col)

| Concern | Decision |
|---|---|
| **Painpoints** | live evidence · same 2 unrelated cards on all 3 pages (Israel Logistics + Al-Dawaa KSA Pharmacy) |
| **PRD ref** | §5 item 28 |
| **Layout** | 3-4 card carousel · industry-relevance scoring (same parent industry + same geo + same period preferred) · NOT random |
| **DS reuse** | `RelatedReports` organism (already shipped) · `ReportCard` molecule |
| **NEW** | none |
| **3-tier** | MAX 4 cards · MID 3 · LOW 2 |
| **Mock data** | for v0.4 build 3 fake-but-relevant cards (e.g. India Cold Chain · Asia Pacific Cold Chain · Australia Logistics) — flag in mock-data.ts w/ TODO |

---

### §3.29 · Footer · `#footer`

| Concern | Decision |
|---|---|
| **User brief** | EXPLICIT · "Footer NOT what I created before · create new design like v0_lite page" |
| **PRD ref** | §5 item 30 |
| **Layout** | NEW design referencing v0_lite · 4-col desktop · primary brand block + 3 link columns + newsletter signup row + legal-bottom-bar |
| **DS reuse** | tokens · `Button` · `NewsletterSignup` organism (already shipped) |
| **NEW** | `DummyFooterV04` organism · UPDATE from existing `DummyFooter` per user "NOT what I created before". Risk: existing DummyFooter at `organisms/DummyFooter.tsx` already canonical per memory `project_dummy_header_footer_sources.md`. Need user confirmation: rebuild DummyFooter or fork to v04? |
| **Reference check** | MUST read v0_lite footer implementation before building |

---

### §3.30 · BottomCTABar (sticky) · global · always-on

| Concern | Decision |
|---|---|
| **PRD ref** | §5 item 4 ("mobile bottom CTA") · global pattern |
| **Layout** | Fixed bottom · appears trailing 30% scroll (IntersectionObserver on hero exit) · hides when CTA Banner §3.27 visible (IntersectionObserver) · primary CTA Download Sample + close (×) button |
| **DS reuse** | `StickyCTA` organism (already shipped) |
| **NEW** | none |
| **3-tier** | identical all tiers |

---

## §4 · NEW components needed (consolidated)

| # | Component | Tier | LOC est | Notes |
|---|---|---|---|---|
| 1 | `ReportHeroV04` organism | Tier 1 (foundation) | ~120 | image-bg + overlay-mask + breadcrumb-inside slot |
| 2 | `PDPLayoutV04` template | Tier 1 | ~80 | 2-col layout (TOC + content) + chrome layers |
| 3 | `StickyPDPNavV04` molecule | Tier 1 | ~80 | chip strip scroll-spy |
| 4 | `ChartCard` molecule | Tier 1 (CRITICAL · blocks 8+ sections) | ~180 | 8-element anatomy · access-state aware · static fallback |
| 5 | `AnswerBlock` atom | Tier 1 | ~40 | per SECTION-CANON-V03 §5 missing from v0.2 |
| 6 | `LogoTierGrid` molecule | Tier 2 | ~80 | tier label + 4-col logo grid · empty tier collapses |
| 7 | `SWOT2x2Grid` molecule | Tier 2 | ~100 | 2×2 grid · expand-on-click |
| 8 | `CompetitorTimeline` molecule | Tier 2 | ~120 | horizontal timeline w/ company logos |
| 9 | `TOCAccordion` molecule | Tier 2 | ~120 | DS Accordion + chapter badges + access state |
| 10 | `CTABannerV04` organism | Tier 3 | ~140 | NEW design · NOT existing CTA variants |
| 11 | `DummyFooterV04` organism (or update existing) | Tier 3 | ~140 | NEW design referencing v0_lite |
| 12 | `SamplePreviewV04` organism (only if existing SampleReportPreview doesn't match v0_lite) | Tier 3 | ~140 | TBD after reading v0_lite |

**Total NEW: 12 components · ~1340 LOC est · ~3-4 days work**

---

## §5 · PRD V2.1 GAP ANALYSIS · what PRD doesn't tell us (flagged)

These are decisions Aura made because PRD is silent. User should confirm or correct.

| # | Gap | Decision made | Confidence |
|---|---|---|---|
| **G1** | Hero cockpit (5 toggles · §6.1) — interaction unspec'd. Does each toggle swap hero RIGHT side content? Animate? Persist via URL hash? | **DEFER to phase 2** · ship static hero w/ 4 metric chips first | Medium |
| **G2** | Metered access (§10) — interaction count cookie/localStorage spec missing detail. Server-side fallback after login? | Cookie+localStorage · 2 free chart-expand · 3rd triggers email-form modal | Low |
| **G3** | Submarket intelligence "other report-specific submarkets" (§5 item 14) — how CMS knows per-report which submarkets exist? | CMS-driven repeater · `submarkets[]` array on Report core object · auto-render N tabs | Medium |
| **G4** | Demand-Supply Gap (§7) — listed as ADDED module · zero UI spec | Single ChartCard DualBar + DataHighlightCard headline + 2 regional Card callouts | Medium |
| **G5** | Access-state lock-icon design — PRD §10 mentions paywalled selector mapping for schema, NOT visual lock UI | Padlock icon + "Unlock" CTA + 60% blur overlay on locked content (PaywallOverlay pattern from V0.2 port) | High |
| **G6** | Chart card "access state" element (§9.1 anatomy slot 8) — what does it LOOK like? | `Badge` w/ color: green=Public · yellow=Metered (N free) · red=Lead-gated · purple=Paid | Medium |
| **G7** | "Insight line" (§9.1 anatomy slot 3) — what's the content rule? | 1-sentence analyst insight max 120 chars · italic body text · `--text-subtle` color | High |
| **G8** | Sticky nav chip strip vs Side TOC overlap — both navigate. Which is primary on mobile? | Mobile: ONLY chip strip (Side TOC hidden behind hamburger drawer · opens on tap of "All Chapters" chip) | High |
| **G9** | Sample size disclosure (§6.6) — should it be a Card, a Table, a Stepper? | Numbered stepper card w/ inline data viz (donut for respondent mix · table for sample-size by stakeholder) | Medium |
| **G10** | Density variants — PRD doesn't formalize. SECTION-CANON-V03 §4 has 4 (EMPTY/LOW/MID/MAX) | **v0.4 commits to 3 variants** · LOW / MID / MAX. EMPTY dropped as edge case — handle via `shouldRenderSection()` returning all-false. | High |
| **G11** | Tooltip pattern for truncated TOC titles — user says "report-store-page pattern" — need to read it | Will read report-store-v07 Tooltip before building | High |
| **G12** | v0_lite reference paths — user keeps referencing but hasn't given path. Likely `projects/v1-project/V0_lite_report/` or similar | Will Bash-search for V0_lite + read CTA + Footer + SamplePreview before §3.26-3.29 build | High |
| **G13** | CTA Banner "new design" — user says "NOT what I created before" — but DS has 3 existing CTA orgs (FinalCTASection · CTABanner · ReportFinalCTASection). Which is "before"? | Assume ALL 3 existing are "before" · BUILD truly NEW `CTABannerV04` w/ different layout/treatment | Low — needs user confirmation |
| **G14** | Footer same question — DummyFooter is "canonical per memory" but user says "NOT what I created before" — does user mean different from previous v0_lite/v0.2 footers OR including DummyFooter? | Will ask before building footer | Low |
| **G15** | Schema markup — PRD §12.3 lists 9 schema types · doesn't say where to inject | All as JSON-LD in `<head>` via Next.js metadata or per-page `<Script type="application/ld+json">` · scope rule: AURA scope NO SEO/marketing per `feedback_aura_scope_no_seo_marketing.md` — DEFER to tech team handover | High |
| **G16** | Mobile bottom CTA vs StickyCTA — same thing? | Yes · same · single org · §3.30 covers it | High |

---

## §6 · 3-tier density rules (consolidated per-section)

| § | Section | MAX | MID | LOW |
|---|---|---|---|---|
| 3.1 | Hero | 4 chips | 3 chips | 2 chips |
| 3.2 | Snapshot | always | always | always |
| 3.3 | Sticky Nav | all chips | filtered | filtered |
| 3.4 | KeyStats | 6 cards | 4 | 4 |
| 3.5 | ExecSummary | 5 takeaways | 3 | 2 |
| 3.6 | Scope | always | always | always |
| 3.7 | Country/Infra | 2 tabs | 1 tab | hide |
| 3.8 | Overview/Genesis | 4 tabs | 2 | 1 |
| 3.9 | Definitions | 7 terms | 4 | 3 |
| 3.10 | Taxonomy | full tree | 2 levels | flat |
| 3.11 | Ecosystem | 4 tabs | 2 | logos only |
| 3.12 | Market Size | 2 tabs | Hist only | static img |
| 3.13 | Submarkets | 2 tabs | 1 | hide |
| 3.14 | Segments | 7 tabs | 4 | 2 |
| 3.15 | Industry | 4 tabs | 2 | 1 |
| 3.16 | End-User | 3 tabs | 1 | hide |
| 3.17 | DS Gap | full | chart only | hide |
| 3.18 | Competitor | 4 tabs | 2 | 1 |
| 3.19 | Regulatory | full | 3 cards | hide |
| 3.20 | Future Outlook | 3 tabs | 1 | hide |
| 3.21 | Opportunities | 4 tabs | 2 | hide |
| 3.22 | Macro | 4 tabs | 2 | hide |
| 3.23 | Methodology | 4 tabs | 2 | 1 |
| 3.24 | TOC | 17 chapters | 12 | 8 |
| 3.25 | FAQ | 10 Qs | 6 | 4 |
| 3.26 | Sample Preview | always | always | always |
| 3.27 | CTA Banner | always | always | always |
| 3.28 | Related Reports | 4 cards | 3 | 2 |
| 3.29 | Footer | always | always | always |
| 3.30 | BottomCTABar | always | always | always |

**Section counts:** MAX = 25 visible · MID = 19 visible · LOW = 12 visible

---

## §7 · UX laws applied (cross-section)

| Law | Application |
|---|---|
| Fitts' Law | All CTAs ≥44px tap target · primary CTA size ≥48px |
| Hick's Law | Max 7 tabs per section · max 2 CTAs per viewport · max 6 stat cards |
| Jakob's Law | Patterns match Statista/IMARC conventions where they're well-formed |
| Doherty Threshold | Tab switch <400ms · scroll-spy debounce 100ms |
| Pyramid Principle | Boardroom summary top-down · insight-first chart cards |
| Law of Proximity | Card containers group related content |
| Law of Common Region | Stats strip cards inside common bg |
| Aesthetic-Usability | Serif metric type · premium feel reinforces trust |
| Von Restorff | Brand-red isolation for primary CTA only |
| Cognitive Load | 200-word boardroom summary · 280-char body cap · 8-section primary nav |
| Miller's Law | Stat strip 6 items (not 7 · within 5±2 range) |
| Peak-End Rule | CTA Banner = peak · Footer = end · both polished |

---

## §8 · Build order (revised · section-by-section per user directive)

### Phase 0 · Foundation (NEW components blocking all sections)
Build IN ORDER · each must be approved before next:

1. `PDPLayoutV04` template (2-col grid + chrome slots)
2. `ChartCard` molecule (8-element anatomy)
3. `AnswerBlock` atom

User confirms Phase 0 at this gate before any section build.

### Phase 1 · Chrome (always-visible layers)

4. `ReportHeroV04` organism + place breadcrumb inside · place in v0.4 project
5. `StickyPDPNavV04` molecule
6. SideTOC (extended w/ bottom-pinned CTA + tooltip on truncated titles)
7. `BottomCTABar` (StickyCTA wire-up)
8. `ReadingProgressBar` wire-up

User confirms Phase 1 chrome before any body section.

### Phase 2 · Body sections (in PRD master architecture order · §5 list)

Per-section delivery: build → push localhost → screenshot → user confirms → next.

9. §3.2 Snapshot (in hero)
10. §3.4 KeyStats
11. §3.5 ExecSummary
12. §3.6 Scope
13. §3.7 Country/Infra
14. §3.8 Overview/Genesis
15. §3.9 Definitions
16. §3.10 Taxonomy
17. §3.11 Ecosystem
18. §3.12 Market Size
19. §3.13 Submarkets
20. §3.14 Segmentation
21. §3.15 Industry
22. §3.16 End-User
23. §3.17 DS Gap
24. §3.18 Competitor
25. §3.19 Regulatory
26. §3.20 Future Outlook
27. §3.21 Opportunities
28. §3.22 Macro
29. §3.23 Methodology
30. §3.24 TOC
31. §3.25 FAQ

### Phase 3 · Below-body sections

32. §3.26 Sample Preview (after reading v0_lite reference)
33. §3.27 CTA Banner (after reading v0_lite reference + user confirms NEW vs reuse)
34. §3.28 Related Reports
35. §3.29 Footer (after user confirms NEW vs DummyFooter)

### Phase 4 · QA

36. 3 density variants tested (MAX Australia · MID synthetic · LOW synthetic)
37. axe a11y green
38. Lighthouse perf desktop ≥90 · mobile ≥80
39. Visual diff vs PRD §6 Australia example
40. Cross-device mobile/tablet/desktop responsive

---

## §9 · Acceptance criteria (v0.4 ships when)

- [ ] All 25 body sections rendered for Australia MAX variant w/ live PRD §6 content
- [ ] 3 density variants (MAX/MID/LOW) handle MAX=Australia · MID=KSA · LOW=India correctly w/o broken sections
- [ ] Side TOC sticky · scroll-spy · truncated titles w/ tooltip-on-hover (truncated only) · bottom-pinned CTA always visible · scrolls to active item
- [ ] StickyPDPNav scroll-spy active · mobile horizontal-scroll
- [ ] Hero w/ image bg + overlay mask + breadcrumb-INSIDE + 4 chips + 2 CTAs · NO right-side content
- [ ] 11 sections w/ in-section Radix Tabs · keyboard nav · ARIA correct
- [ ] All charts via ChartCard w/ 8-element anatomy · static `<img>` fallback w/ caption + dataset table
- [ ] All FAQ values match canonical stat-strip (publish-gate validation)
- [ ] Sample Preview · CTA Banner · Footer all match v0_lite reference patterns (NEW)
- [ ] BottomCTABar trailing 30% · hides when CTA Banner visible
- [ ] Single source of truth · `mock-data.ts` typed schema · all sections subscribe
- [ ] TSC green · prod build green · 0 console errors
- [ ] axe 0 serious violations · keyboard nav all interactive · 44px tap targets
- [ ] Lighthouse desktop ≥90 · mobile ≥80
- [ ] WCAG AA contrast across all variants
- [ ] 3-tier CTA hierarchy strict · max 2 CTAs/viewport · primary brand-red filled only
- [ ] Reduced-motion respected (Framer `useReducedMotion`)

---

## §10 · Out of scope for v0.4

- Real @ken-research/charts integration BEYOND placeholder import (defer if package not yet published · fallback to inline SVG)
- Real `/api/lead-capture` wiring (console.log stub fine)
- SSR optimizations beyond Next 16 default
- i18n
- Analytics (Leadfeeder · Contentsquare)
- SEO meta enrichment beyond JSON-LD FAQPage already in FAQSection
- A/B test variants
- Dark mode
- Hero cockpit 5-toggle interactive switching (deferred per G1)
- Backend access-control real wiring (mock cookie+localStorage only)

Tech team handles after handover.

---

## §11 · Trace markers

- → Route: F (audit) → A (page-build) hybrid · scenario F finishing · scenario A starting w/ Phase 0
- → Scan: memory MEMORY.md + feedback_canonical_workflow_reset.md + project_v1_product_page_brief.md (no re-read)
- → Read: PRD-V2.1 L1-627 · SECTION-AUDIT-LIVE-2026-05-20 L1-522 · SECTION-CANON-V03 L1-281 · DS v2 organisms L1 listing
- → Step 4/6 in todo · master plan written
- → Log: this doc written to projects/_briefs/v1-product-page/V04-MASTER-PLAN-2026-05-20.md
- → Check: 16 gaps flagged in §5 for user confirmation
- → Exit: handover to user for §3 section-by-section approval gate
