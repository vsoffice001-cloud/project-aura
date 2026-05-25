# V04 MASTER PLAN · ADDENDUM (user clarifications · 2026-05-20)

Supersedes §5 gap decisions in V04-MASTER-PLAN-2026-05-20.md w/ user answers + adds new constraints.

---

## §A · Gap resolutions (user-confirmed)

### G1 · Hero cockpit · CONFIRMED user wants exact spec he described
**Resolution:** NO 5-toggle deferral. Hero exactly as briefed:
- Image bg full-bleed
- Left side · content + info over overlay mask (dark gradient L→R)
- Right side · intentional empty space · image breathes through
- Breadcrumb INSIDE hero (not separate strip)
- 4 metric chips + 2 CTAs left-aligned
- NO cockpit toggle row (PRD §6.1 deferred indefinitely · ship clean hero as user briefed)

### G10 · Density variants · CONFIRMED 3 variants only
**Resolution:** Drop EMPTY entirely. If no content → page does NOT render. Show skeleton during loading. Variants: LOW · MID · MAX.
- Skeleton uses DS skeleton atoms (check `core-v2/src/atoms/Skeleton*` · or build)
- Skeleton mirrors PDPLayoutV04 chrome + section placeholders

### G11 · Tooltip pattern · CONFIRMED report-store-v07 path
**Resolution:** Will read `projects/report-store-v07/` Tooltip pattern before SideTOC build · port to DS molecule if not already there.

### G12 · v0_lite reference paths · CONFIRMED
**Resolution:** `projects/V0_lite_report-legacy/` is the canonical legacy ref. Files identified:
- `src/app/components/CTASection.tsx` (CTA · centered · bg composition)
- `src/app/components/Footer.tsx` (4-col white · convert to BLACK for v0.4)
- `src/app/components/SampleReportPreview.tsx` (orchestrator + sidebar TOC + phase chapters)
- `src/app/components/sample-report/ChapterExtendedTOC.tsx` (extended TOC w/ phases · 365 LOC)
- `src/app/components/sample-report/PhaseCard.tsx` (phase visual component)

### G13 · CTA Banner · CRITICAL CORRECTION
**Resolution:**
- v1 project v0.1, v0.2, v0.3 CTAs = ALL WRONG. Do not reference.
- v0_lite CTA = best reference. Use its bg composition + content structure but **LEFT-ALIGN content** (v0_lite is center-aligned).
- Bg composition logic = OG DS pattern · multi-layer (gradient + 4 blob orbs + grain + vignette + hairline glow)
- **CORRECTION TO PRIOR ANALYSIS:** This bg system IS already in core-v2 — `atoms/CTABackground.tsx` (ported 2026-05-15 per JSDoc · variant prop: `dark` | `light`)
- **Same bg system used in Hero** when no image OR no right-side content. Atom `atoms/HeroBackground.tsx` also exists.
- v0.4 CTA Banner build:
  - Reuse `CTABackground` atom · variant probably `dark`
  - Left-aligned content (NOT centered like v0_lite)
  - SectionLabel + serif H2 + supporting text + primary CTA + secondary CTA · all left-stack
  - Right side empty · bg composition breathes through
- Naming · build as `ReportCTABannerV04` organism in v0.4 project · MAY promote to DS post-approval

### G14 · Footer + TopNav · CONFIRMED both dummy
**Resolution:**
- Footer = NEW dummy · BLACK bg (not v0_lite white) · same 4-col + brand + socials + bottom legal bar structure but dark theme · "should look beautiful"
- TopNav = NEW dummy · reference `localhost:3005` (topnav-v32 project) · should look beautiful · matching that nav pattern
- Both build as v0.4-project-local components first · NOT update existing DS DummyHeader/DummyFooter (those stay canonical per memory)
- Memory `project_dummy_header_footer_sources.md` says: "Header from topnav-v32 · Footer from V0.2-for-design-system" — that's the CANONICAL source mapping but v0.4 needs NEW look for both. New v0.4 builds layer on top.

---

## §B · NEW constraints from user

### B1 · Extended TOC pattern (MAJOR · was missing from §3 plan)
Extended TOC = v0_lite `ChapterExtendedTOC.tsx` + `PhaseCard.tsx` pattern · phases mentioned.

**Implication for §3.24 (TOC section):** drop generic Accordion plan. Replace with phase-grouped extended TOC matching v0_lite exact layout.

**Action:** Read `ChapterExtendedTOC.tsx` (365 LOC) + `PhaseCard.tsx` before building §3.24 Sample Preview Extended TOC. Build matching pattern · NEW color may apply but phase structure preserved.

### B2 · Think-first protocol (process change · CRITICAL)
User-stated rule:
> "There is some layout and design logics that is different than what we have build already... you need to think again before implementing the section design and tell what you think of designing when we reaches the section and its components and i need to confirm or give you direction accordingly."

**Process:** For every section in §3.1-§3.30:
1. Before writing code · post Aura's thinking on layout + composition + DS reuse
2. Wait for user confirm OR direction
3. Only then build
4. Show on localhost
5. User confirms UI OR corrects
6. Move to next

This is stricter than original "approve → build → show → confirm" — adds explicit pre-build design discussion step.

### B3 · Screenshot reference (Genesis Timeline + Seasonal Demand · attached)
User attached screenshot showing:
- "MARKET GENESIS TIMELINE" eyebrow
- 8 year-anchored cards: 1925 · 1947 · 1960 · 1985 · 2010 · 2016 · 2020 · 2023
- Each card: red year heading + bold event title + 2-3 line description
- Connecting horizontal dotted-line w/ filled dot under active year
- Bottom "SEASONAL DEMAND PATTERN" eyebrow
- 12 month pills: JAN-DEC · 3-state · red=Peak · white=Normal · grey=Low season
- Legend below w/ 3 swatches

**Resolution:**
- Pattern LIKED · reuse in v0.4 with possible color variation
- These already exist in v0.3 at `projects/v1-project/v1-product-page-ver0.3/src/components/sections/`:
  - `GenesisTimeline.tsx` ✅
  - `SeasonalityCalendar.tsx` ✅
- Both already Tailwind-refactored per earlier audit (was 15 inline-style blocks → cleaned)
- v0.4 reuse: port these 2 components AS-IS · maybe color polish · they live inside §3.8 Market Overview tab "Genesis" + "Seasonality"
- NOT in DS yet · promote to DS organisms after user OKs final color

### B4 · All other v1 v0.1/v0.2/v0.3 UI = REJECTED
**Resolution:** Do not look at v0.1, v0.2, v0.3 v1-product-page UI for ANY design reference (except the 2 components in B3). Build NEW UI per master plan §3 specs.

Sources of truth:
- ✅ V0_lite_report-legacy (CTA · Footer · SamplePreview · ExtendedTOC · PhaseCard)
- ✅ topnav-v32 (nav pattern)
- ✅ DS v2 (all organisms · atoms · molecules)
- ✅ GenesisTimeline + SeasonalityCalendar from v0.3 (B3 only)
- ❌ v0.1 / v0.2 / v0.3 v1-product-page everything else

---

## §C · Affected §3 sections (updates)

### §3.1 · Hero · REVISED
**Bg system clarification:** When report has hero image → use image bg + overlay mask. When report has NO hero image → use `HeroBackground` atom (OG bg composition) + content left-align + right empty.

**Aura think-step before build:** Will post layout breakdown + bg variant decision + chip layout + breadcrumb placement BEFORE coding. User OKs · then build.

### §3.8 · Market Overview & Genesis · REVISED
- 4 tabs preserved (Overview · Genesis · Business Cycle · Seasonality)
- Genesis tab = port `GenesisTimeline.tsx` from v0.3 AS-IS
- Seasonality tab = port `SeasonalityCalendar.tsx` from v0.3 AS-IS
- Both candidate for color polish · user direction needed

### §3.24 · TOC · REVISED
- Drop generic accordion plan
- Build as v0_lite extended TOC w/ phases (`ChapterExtendedTOC` + `PhaseCard` pattern)
- New v0.4 organism = `ExtendedTOCSection` · ports both files
- Phase grouping per Australia Cold Chain · 17 chapters group into 4-5 phases (e.g. "Market Foundation" ch 1-4 · "Market Dynamics" ch 5-8 · etc.)

### §3.26 · Sample Report Preview · REVISED
- Drop generic carousel plan
- Build as v0_lite SamplePreview pattern · 4-chapter preview · sidebar TOC w/ 3-state cycle (open / compressed / minimal) · IntersectionObserver scroll-tracking
- Reuse: SidebarTOC · ChapterExecutiveSummary · ChapterMarketOverview · ChapterExtendedTOC · ChapterMethodology · MobileTOC pattern
- Port AS-IS to v0.4 · adjust content to Australia Cold Chain

### §3.27 · CTA Banner · REVISED
- Use `CTABackground` atom (already in core-v2)
- Left-align content (different from v0_lite center-align)
- New v0.4 organism `ReportCTABannerV04`
- SectionLabel · serif H2 · supporting text · primary CTA · secondary CTA · left stack
- Right side empty · bg breathes

### §3.29 · Footer · REVISED
- NEW dummy · BLACK bg · 4-col layout matching v0_lite structure
- Build as v0.4-project-local `DummyFooterDark` organism
- Brand block + 3 link cols + bottom legal bar
- Socials as black-on-white icon buttons
- Reuse: lucide-react icons + Tailwind

### NEW §3.0 · TopNav · ADDED
**Was implicit in chrome (§2.1 L1 DummyHeader · using DS canonical).** Now overridden:
- NEW dummy · reference topnav-v32 (localhost:3005)
- Build as v0.4-project-local `DummyHeaderV04` organism
- Beautiful · matches topnav-v32 design
- Wait — must inspect topnav-v32 live before building

---

## §D · NEW components (revised count)

| # | Component | Tier | LOC | Notes |
|---|---|---|---|---|
| 1 | `PDPLayoutV04` template | T1 | 80 | unchanged |
| 2 | `ChartCard` molecule | T1 | 180 | unchanged |
| 3 | `AnswerBlock` atom | T1 | 40 | unchanged |
| 4 | `ReportHeroV04` organism | T1 | 140 | use HeroBackground atom · supports both image-bg + no-image-bg modes |
| 5 | `StickyPDPNavV04` molecule | T1 | 80 | unchanged |
| 6 | `LogoTierGrid` molecule | T2 | 80 | unchanged |
| 7 | `SWOT2x2Grid` molecule | T2 | 100 | unchanged |
| 8 | `CompetitorTimeline` molecule | T2 | 120 | unchanged |
| 9 | `ReportCTABannerV04` organism | T3 | 140 | uses CTABackground atom · left-align |
| 10 | `DummyHeaderV04` organism (v0.4-local) | T1 | 200 | new · matches topnav-v32 pattern |
| 11 | `DummyFooterDark` organism (v0.4-local) | T3 | 180 | new · 4-col black version of v0_lite footer |
| 12 | `ExtendedTOCSection` organism | T2 | 200 | port `ChapterExtendedTOC` + `PhaseCard` |
| 13 | `SamplePreviewV04` organism | T3 | 280 | port full V0_lite SamplePreview chain (5 chapters + sidebar + mobile) |
| 14 | `GenesisTimeline` (port from v0.3) | T2 | 150 | reuse · maybe color polish |
| 15 | `SeasonalityCalendar` (port from v0.3) | T2 | 100 | reuse · maybe color polish |
| 16 | `Skeleton*` atoms (for loading state) | T1 | 60 | if not already in DS |

**Total: 16 components · ~2050 LOC · ~5 days work**

---

## §E · Revised build order

### Phase 0 · Foundation
1. PDPLayoutV04 template
2. ChartCard molecule
3. AnswerBlock atom
4. Skeleton atoms (if missing)

**GATE 0:** user OK before Phase 1.

### Phase 1 · Chrome
5. DummyHeaderV04 (after inspecting topnav-v32 live)
6. ReportHeroV04 (after Aura posts bg-composition think)
7. StickyPDPNavV04
8. SideTOC (extended w/ bottom CTA + tooltip · uses report-store-v07 Tooltip pattern)
9. BottomCTABar (wire DS StickyCTA)
10. ReadingProgressBar (wire DS organism)

**GATE 1:** user OK before Phase 2.

### Phase 2 · Body sections (one at a time · think-first protocol)
For EACH section §3.2 → §3.25:
1. Aura posts think (layout · DS reuse · content shape · UX laws)
2. User confirms or directs
3. Build
4. Push to localhost
5. Screenshot
6. User confirms UI
7. Next section

### Phase 3 · Below-body
26. SamplePreviewV04 (after reading 6 v0_lite sub-files)
27. ReportCTABannerV04 (using CTABackground atom)
28. RelatedReports (DS organism wire-up)
29. DummyFooterDark

### Phase 4 · QA
3 variants · a11y · perf · responsive

---

## §F · Open items needing user direction (next message)

1. **Skeleton component** — confirm DS has skeleton atoms OR I check first OR build new
2. **Phase grouping for Extended TOC** — Australia 17 chapters → how many phases · what names. Aura will propose · user OKs.
3. **Color polish for GenesisTimeline + SeasonalityCalendar** — keep current red OR new color · user direction
4. **Topnav-v32 live inspect timing** — do I screenshot localhost:3005 myself OR user provides ref images
5. **Phase 0 start** — confirm I can begin building PDPLayoutV04 + ChartCard + AnswerBlock + Skeleton without waiting for Phase 0 think · OR think-first applies to Phase 0 too

---

## §G · Trace markers

- → Route: scenario A (page-build) Phase 0 prep
- → Step: addendum written
- → Log: V04-MASTER-PLAN-ADDENDUM-2026-05-20.md written
- → Check: 5 open items in §F awaiting user direction
- → Exit: await user direction
