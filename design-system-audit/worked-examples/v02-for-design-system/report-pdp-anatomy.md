# Report PDP Anatomy · `projects/V0.2 -for design system/`

**WHAT** — Section-by-section breakdown of the canonical Qatar Fresh Herbs report PDP mounted at `http://localhost:3030/`. Composition lives in `src/app/App.tsx:174-187` (14 sections in exact order · padding `px-[84.375px] lg:px-[112.5px]` + `py-24 lg:py-32`).

**WHY this PDP is the best example** — Every visual choice has an explicit `## WHY` doc · tri-modal card-hover language maps content type → interaction · 3-element chapter intro repeats 13× as a discipline rhythm · sticky TOC + inline mid-page TOC + reading-time stack is workspace's only premium wayfinding system · brand RED vs data PURPLE color-semantic is most disciplined in workspace.

**WHEN to reference this anatomy ✅**
- Building any Ken report PDP (consumer-side)
- Establishing section ordering recipes for new report types
- Picking card-hover language per content type
- Composing 3-element chapter intros
- Building wayfinding (sticky TOC + scroll-spy)

**WHEN NOT to reference ❌**
- For LISTING / store pages → use `report-store-legacy/` instead
- For NAV / header → use `topnav-v32/` instead
- For STRUCTURAL DS code patterns → see `coding-differences-from-og.md` (V0.2 deviates from production target)

**WHERE applied in V0.2** — `App.tsx:174-187` ordered list · references each section component file in `src/app/components/`.

**HOW the page is composed (canonical section order)**

```tsx
// App.tsx:174-187 — the recipe
<Header />
<HeroSection />
<TableOfContentsSidebar />     // sticky shell · scroll-spy
<MarketOverview />              // §1 stats + outlook + timeline
<ScopeOfReport />               // §2 d3 mind-map
<MarketAnalysis />              // §3 charts (PURPLE shadow)
<MarketDataTable />             // §4
<SegmentationSection />         // §5 mixed 2/3/2 grid
<RegionalComparison />          // §6
<GrowthDriversChallenges />     // §7 SWOT (green/red/amber)
<CompetitiveLandscape />        // §8
<TableOfContentsSection />      // §9 inline mid-page TOC
<TargetAudience />              // §10 8 stakeholders
<ResearchMethodology />         // §11 4 numbered steps
<FAQSection />                  // §12 Radix accordion
<RelatedReports />              // §13
<FinalCTA />                    // §14 red gradient banner
<Footer />
<FloatingCTA />                 // overlay
<PlayerVariantSwitcher />       // debug-only · strip on port
```

---

## Section-by-section anatomy

### §1 — MarketOverview (`MarketOverview.tsx`)
**WHAT** — Lead stats + market outlook narrative + horizontal timeline (5 milestones)
**WHY** — Opens the report w/ scannable numbers (stats) before narrative · stops bounce-rate
**HOW** — `StatCardGroup` (4 StatCards) + `BodyText` paragraph + horizontal `Timeline` w/ 5 nodes
**Color** — PURPLE shadow on StatCards (data signal) · timeline dots brand-red
**Hover** — StatCards lift w/ purple shadow `0px 8px 24px rgba(127,95,227,0.15)` · 300ms
**A11y** — StatCards announce as `<dl>` · timeline as `<ol>` w/ aria-labels per milestone

### §2 — ScopeOfReport (`ScopeOfReport.tsx`)
**WHAT** — d3-driven radial mind-map · scope center · 6 main branches · sub-leaves
**WHY** — Visual taxonomy beats bulleted list for scope · users see WHAT report covers in 1 glance
**HOW** — `MindMap` organism (d3 force layout) + `MindMapModal` for fullscreen
**Color** — Center node brand red · branches grey-700 stroke · leaves grey-400
**Interaction** — Click branch = expand · click leaf = open MindMapModal w/ deep-dive
**A11y** — `<button>` per node · keyboard-navigable · screen reader fallback `<ul>`

### §3 — MarketAnalysis (`MarketAnalysis.tsx`)
**WHAT** — 3-column chart panel · Highcharts + Recharts + tabular comparison
**WHY** — Data is the product · charts must dominate visual hierarchy here
**Color** — PURPLE shadow on all chart cards · purple highlight on chart legends · DATA SIGNAL
**Hover** — Card lifts · chart axis tooltips on hover
**A11y** — Chart fallback `<table>` · axis labels with units · keyboard zoom

### §4 — MarketDataTable (`MarketDataTable.tsx`)
**WHAT** — Detailed market size table · sortable · region × year matrix
**WHY** — Researchers need raw numbers · table is the format
**Color** — Header row grey-50 bg · alternating row-stripes (white / grey-25)
**Hover** — Row darken to grey-100 · cursor pointer if drill-down enabled
**A11y** — `<th scope="col">` · sticky header on scroll · arrow-key navigation

### §5 — SegmentationSection (`SegmentationSection.tsx`)
**WHAT** — 7 segmentation cuts (By Type · By End-Use · By Region · etc.) · mixed grid `2/3/2` rhythm
**WHY** — Mixed grid breaks card-grid monotony · creates editorial cadence
**HOW** — `SegmentationCard` × 7 in `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:[&>*:nth-child(3)]:col-span-1 lg:[&>*:nth-child(5)]:col-span-1`
**Color** — PURPLE shadow (data signal) · indexed segmentation-icons from registry
**Hover** — Card lifts + shadow intensifies + icon scales 1.05×

### §6 — RegionalComparison (`RegionalComparison.tsx`)
**WHAT** — Country-by-country comparison table or grid · price · volume · CAGR
**WHY** — Buyer wants to compare their region vs others · highlights opportunity
**Color** — Subtle row tints by region grouping · text neutral
**Hover** — Border darken (ComparisonParameterCard pattern)

### §7 — GrowthDriversChallenges (`GrowthDriversChallenges.tsx`)
**WHAT** — SWOT-style 4-quadrant grid · Drivers / Challenges / Opportunities / Threats
**WHY** — Strategic-decision framework · standard buyer mental model
**Color** — SEMANTIC red `#dc2626` (NOT brand red `#b01f24`) for challenges/threats · green `#16a34a` for opportunities · amber `#f59e0b` for warnings · ← CRITICAL distinction
**Hover** — Subtle bg-tint on quadrant · cards static (TimelineCard pattern · no hover)
**A11y** — `<h3>` per quadrant · semantic color must pair w/ icon (color-alone fails WCAG)

### §8 — CompetitiveLandscape (`CompetitiveLandscape.tsx`)
**WHAT** — Top 5-10 competitors w/ logos · market share % · brief description
**WHY** — Buyer needs to know who's in the market before buying
**Color** — Neutral logos · subtle border per card · no brand color noise
**Hover** — Border darken to grey-300 · logo scales 1.02×
**A11y** — Logo `<img>` w/ company name alt · share % announced via `<dl>`

### §9 — TableOfContentsSection (`TableOfContentsSection.tsx`)
**WHAT** — INLINE mid-page TOC · separate from sticky sidebar TOC
**WHY** — Mirrors real research-doc convention · gives mid-page wayfinding for users who've scrolled past hero
**HOW** — Same scroll-spy data source as sidebar · different visual treatment (horizontal cards instead of vertical list)
**Color** — Each TOC item card has subtle purple-shadow when current section
**A11y** — `<nav aria-label="Table of contents">` · anchors w/ aria-current="location" when in view

### §10 — TargetAudience (`TargetAudience.tsx`)
**WHAT** — 8 stakeholder cards · who-should-buy framework · indexed icons
**WHY** — Conversion-led · "this report is for YOU" · increases pitch resonance
**HOW** — `StakeholderCard` × 8 in 4×2 grid · `stakeholder-icons.tsx` registry maps index → Phosphor icon
**Color** — Grey-50 card bg · NO hover (TimelineCard static pattern) · neutral content tier
**A11y** — `<ul>` of `<li>` cards · icon decorative `aria-hidden` · text carries semantic load

### §11 — ResearchMethodology (`ResearchMethodology.tsx`)
**WHAT** — 4-step numbered methodology · numbered circles + step name + description
**WHY** — Trust signal · shows analyst rigor before buy decision
**HOW** — Horizontal flex of 4 `MethodologyCard` w/ connecting lines · numbered badges 1-4
**Color** — Number circles brand-red bg (CTA-tier color · primary visual anchor) · text neutral
**Hover** — None (factual content · no interaction needed)
**A11y** — `<ol>` semantic · steps in order · each step has `<h3>` step name

### §12 — FAQSection (`FAQSection.tsx`)
**WHAT** — 8 real Q&As · Radix Accordion
**WHY** — Pre-empts sales conversation · last-mile conversion · SEO-friendly
**HOW** — `<Accordion type="single" collapsible>` · chevron rotates on open · smooth height transition
**Color** — White accordion · grey-200 divider · chevron grey-500 → grey-700 on hover
**A11y** — Radix handles ARIA · keyboard expand/collapse · screen-reader role announcements

### §13 — RelatedReports (`RelatedReports.tsx`)
**WHAT** — 3-4 related report cards · cross-sell
**WHY** — Increases AOV · keeps user in funnel after this report
**HOW** — `ReportCard` × 3-4 in horizontal grid
**Color** — Neutral cards · price highlighted brand-red · "View Report" CTA red gradient
**Hover** — Card lifts w/ shadow + title color shifts to brand-red

### §14 — FinalCTA (`FinalCTA.tsx`)
**WHAT** — Red gradient full-width banner · "Get Full Report Access" CTA + secondary "Talk to Analyst"
**WHY** — End-of-page conversion moment · inverted color (white button on red bg) signals "this is THE action"
**HOW** — Section bg `bg-gradient-to-br from-[#b01f24] via-[#8a191d] to-[#5e1014]` · h2 white serif · CTA `bg-white text-brand-red` · secondary CTA `border-white/40 text-white bg-transparent`
**Color** — INVERTED (white CTA on red bg) · only place in page where this happens · earns the inversion
**Hover** — Primary CTA scale-105 + shadow-2xl · secondary CTA bg-white/10
**A11y** — `<section role="region" aria-label="Final call to action">` · CTAs are real `<button>` · keyboard reachable

---

## Page shell (overlays + sticky)

### Header (`Header.tsx`)
**WHAT** — Sticky top nav · Ken logo · 5 mega-menu triggers · search · auth CTA
**WHY** — Persistent wayfinding · brand presence · global navigation
**WHERE referenced** — see `topnav-v32/` audit for canonical Header anatomy (V0.2 Header is simpler · topnav-v32 is the canonical source)

### TableOfContentsSidebar (`TableOfContentsSidebar.tsx`)
**WHAT** — Left-side sticky 255px (desktop) / 80px (collapsed) sidebar · scroll-spy active state · reading-time estimate per section · 3-state model (completed/active/upcoming)
**WHY** — Premium wayfinding for long-form research · users always know WHERE they are
**HOW** — `useScrollSpy.tsx` hook tracks scroll position bottom-up · returns activeIdx · sidebar maps idx to state {completed if idx<active · active if idx===active · upcoming if idx>active}
**Color** — Completed = grey-400 text + checkmark icon · active = brand-red bg + white text · upcoming = grey-700 text
**Reading-time** — `readingMinutes` per section · uses 200 words/min heuristic
**Progress bar** — `(activeIdx + 1) / total * 100` % horizontal at sidebar top
**Smooth scroll** — Click TOC item · `window.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' })` · 120 offset clears sticky header
**A11y** — `<nav aria-label="Table of contents">` · current item `aria-current="location"` · expand/collapse `aria-expanded`
**See also** — `TOC_DOCUMENTATION.md` at V0.2 root (16.8KB deep dive)

### FloatingCTA (`FloatingCTA.tsx`)
**WHAT** — Bottom-right floating "Talk to Analyst" button · appears after 800px scroll
**WHY** — Catches users mid-page who don't want to scroll to bottom for CTA
**HOW** — `position: fixed` bottom-right · `transform: translateY(N)` based on scroll · 200ms ease-out
**Color** — Brand-red bg · white icon · purple shadow ring on hover

### PlayerVariantSwitcher (`PlayerVariantSwitcher.tsx`)
**WHAT** — Debug widget for swapping `AudioPlayer` variants
**WHY** — Only dev-time aid · not production
**Strip on port** — Remove before any Aura production build

---

## Cross-section systems

### Background alternation
- Odd sections (1, 3, 5, 7, 9, 11, 13): `bg-white`
- Even sections (2, 4, 6, 8, 10, 12, 14): `bg-grey-50` (`#fafafa`)
- FinalCTA breaks pattern: red gradient (intentional end-of-page signal)

### 3-element chapter intro (used 13×)
```tsx
<OverheadText>CHAPTER X · CATEGORY</OverheadText>
<SectionHeader>Section Title</SectionHeader>
<BodyText>Description paragraph explaining what this section covers.</BodyText>
```
Padding rhythm: `mb-2` between Overhead+Header · `mb-6` between Header+BodyText · `mb-12` between BodyText+content.

### Padding system
- Container padding: `px-[84.375px] lg:px-[112.5px]` ← magic numbers (no token)
- Section py: `py-24 lg:py-32` (96px / 128px desktop · 96px mobile)
- Tokens needed on port: `--section-px-base = 84.375px` · `--section-px-lg = 112.5px`

### Card-hover language (tri-modal)
| Card type | Hover behavior | Use for |
|---|---|---|
| Purple shadow | `shadow-purple-md` + lift | Data cards (Stat · Icon · Segmentation · Text · TextCard) |
| Static grey | No hover | Static content (Timeline · Stakeholder) |
| Border darken | `border-grey-300` on hover | Comparison parameters · table-like |
| Red gradient | Bg gradient shift + scale | FinalCTA only |

### Section header pattern
Every section: `<section className="px-[84.375px] lg:px-[112.5px] py-24 lg:py-32 [bg-white | bg-grey-50]"><div className="max-w-[1440px] mx-auto">{chapter intro}{content}</div></section>`

---

## Reasons + Decisions log

- **WHY 14 sections in this order?** Mimics buyer research flow: overview → scope → analysis → segmentation → competition → trust signals (TOC + audience + methodology) → objection handling (FAQ) → cross-sell → conversion
- **WHY tri-modal hover?** User feedback showed all-cards-hover was visually noisy · static cards for factual content + interactive cards for clickable data = clearer mental model
- **WHY inline mid-page TOC AND sticky sidebar TOC?** Mirrors real research-doc convention · readers want both global (sidebar) + local (inline) wayfinding · only Ken project that does both
- **WHY `84.375px` / `112.5px` magic numbers?** Derived from 12-col grid math at 1200px container (84.375 = 1200/14.22 · 112.5 = 1200/10.67) · undocumented · codify on port as `--section-px-base` / `--section-px-lg`
- **WHY semantic red distinct from brand red?** SWOT needs error semantic (`#dc2626` darker · WCAG-AA-passing on white) vs CTA brand red (`#b01f24` darker red brand color · CTA-only)
- **WHY no Framer Motion for HeroSection orbs?** Uses raw `requestAnimationFrame` (HeroSection.tsx:22-43) · small + deps-free · BUT loses `useReducedMotion()` compliance · replace on port

---

## REUSABILITY SCORE

⭐⭐⭐⭐⭐ — As a **composition reference** · this PDP is the gold standard for Ken report pages. Section order · 3-element intro · tri-modal hover · sticky TOC · FinalCTA inversion = canonical patterns. Code-level reusability lower (2/5) due to inline hex · magic-number padding · Vite-SPA architecture · no tests. Port the patterns · rewrite the code.

## Linked concepts
- `00_overview.md` — project identity
- `footer-anatomy.md` — Footer canonical structure
- `documentation-method.md` — WWWWH framework extracted from 98 MDs
- `coding-differences-from-og.md` — what NOT to copy code-wise
- `pattern-lessons.md` — REPLICATE / REJECT / MODIFY summary
- `topnav-v32/` — canonical Header (V0.2 Header is simpler subset)
- `og-audit/recipes/page-recipes.md` — sister doc on OG page recipes
