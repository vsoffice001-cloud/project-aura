# VS Design System — Strategic Development Plan v1

**Created:** March 11, 2026  
**Status:** APPROVED — Decisions finalized  
**Scope:** Post-sync roadmap for three-pillar DS evolution  

---

### Decisions Log (March 11, 2026)

| # | Decision | Resolution |
|---|----------|------------|
| 1 | Hero organism per pillar? | **NO** — Build `HeroTemplate` pattern with slots. Each pillar configures via props/children. Existing 10 Case Study organisms = Consulting's implementation. |
| 2 | Surveys + Consulting now? | **DEFER pages** — Populate dashboard sections with foundational info only (shared atoms, molecules, likely patterns). Build actual pages later. |
| 3 | React Router? | **DEFER to Phase 6** — Dashboard stays state-driven. Add router only for full-page demo routes (`/demo/rs-home`, `/demo/rs-list`). |
| 4 | GitHub push strategy? | **BATCHED at milestones** — Push 1: after Phase 1-3 (dashboard complete). Push 2: after Phase 4-5 (organisms). Push 3: after Phase 6 (templates). |
| 5 | Component Triad demo? | **YES** — Interactive demo with mock data, toggle switches grid↔list, skeletons match layout. |

---

## 1. Situation Analysis

### 1.1 What We Have

| Asset | Status | Coverage |
|-------|--------|----------|
| **DS Dashboard** (7 tabs, Stripe-style) | v3.3.2 — functional | Case Study ONLY |
| **Case Study Organisms** (10 sections) | Complete, production-ready | Consulting pillar 100% |
| **Report Store Molecules** (15 in `/molecules/`) | Synced, untested in FM | Research pillar ~40% |
| **Report Store Atoms** (Tooltip, ViewToggle, FadeInSection) | Synced | Shared infrastructure |
| **Layout Components** (SectionHeading, SectionWrapper, Card, Scroll*) | Synced | Product pages ready |
| **Foundations** (Colors, Typography, Spacing, Layout, Elevation, Radius) | 6 modular files, documented | Universal — all pillars |
| **`ai-context/`** (6 docs) | Synced to FM | v4.0 but Case Study–weighted |
| **`GITHUB_REPO_MANIFEST.md`** | Synced | Accurate inventory |
| **Report Store Organisms** | **ZERO** — conceptual only (in 4WH doc) | Research pillar 0% |
| **Surveys Pillar** | **Nothing** | 0% |

### 1.2 Three-Pillar Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    VS DESIGN SYSTEM (Unified)                       │
│                                                                     │
│  Foundations: Colors, Typography, Spacing, Layout, Motion, A11y     │
│  Shared Atoms: Button, Badge, CTALink, InlineLink, Label, Container│
│  Shared Hooks: useShimmer, useScrollDirection, useCounter, etc.     │
│                                                                     │
├───────────────────┬──────────────────────┬──────────────────────────┤
│   CONSULTING      │    RESEARCH          │    SURVEYS               │
│   (Case Study)    │    (Report Store)    │    (TBD)                 │
│                   │                      │                          │
│  Page Type:       │  Page Type:          │  Page Type:              │
│  DISPLAY          │  PRODUCT             │  PRODUCT                 │
│  (editorial)      │  (systematic)        │  (systematic)            │
│                   │                      │                          │
│  Headings:        │  Headings:           │  Headings:               │
│  Bespoke inline   │  SectionHeading      │  SectionHeading          │
│                   │  (prop-driven)       │  (prop-driven)           │
│                   │                      │                          │
│  Section Pattern: │  Section Pattern:    │  Section Pattern:        │
│  10-section       │  Dual-mode           │  TBD                    │
│  B → W → Warm     │  (home/listing)      │  (likely similar        │
│                   │  B → W → Neutral50   │   to Research)          │
│                   │                      │                          │
│  Status:          │  Status:             │  Status:                 │
│  ✅ COMPLETE      │  🟡 MOLECULES DONE   │  ⬜ NOT STARTED          │
│                   │  ⬜ ORGANISMS TODO    │                          │
│                   │  ⬜ TEMPLATES TODO    │                          │
└───────────────────┴──────────────────────┴──────────────────────────┘
```

### 1.3 Key Insight: Display vs Product Pages

This is the architectural distinction that governs EVERYTHING:

| Dimension | Display Pages (Consulting) | Product Pages (Research, Surveys) |
|-----------|---------------------------|----------------------------------|
| **Purpose** | Showcase, storytelling, persuasion | Discovery, filtering, data consumption |
| **Content** | Hand-authored, editorial | Data-driven, repeatable |
| **Heading style** | Bespoke per-section | `SectionHeading` component |
| **Card system** | `ResourceCard` (7 variants) | `ReportCard` (grid+list), `StatCard`, `DataHighlightCard`, `AnalystPickCardB` |
| **Section pattern** | Fixed 10-section sequence | Flexible dual-mode (home/listing) |
| **Interactivity** | Scroll-driven, reading progress | Filters, search, view toggle, pagination |
| **Loading states** | None (static) | `SkeletonCard`, `EmptyState` |
| **Scroll paradigm** | Vertical story flow | Cards in grid/list + carousel sections |
| **Page shell** | Navbar + StickyCTA + ReadingProgressBar | Header (glass) + Footer + BackToTop |

---

## 2. Strategic Decisions Required

### Decision 1: Dashboard-First or Organisms-First?

**Option A: Dashboard-First** (Document before building)
- Pros: Forces design thinking, catches gaps early, visible progress in FM
- Cons: Documenting components we haven't rendered as organisms yet
- Verdict: ✅ **RECOMMENDED** — The dashboard IS the product in Figma Make

**Option B: Organisms-First** (Build then document)
- Pros: Can see real rendered organisms, find composition bugs
- Cons: Building without documented patterns leads to inconsistency
- Verdict: ❌ Risk of building then re-documenting

**Recommendation: Dashboard-First, then Organisms**

### Decision 2: What New Content Does the Dashboard Need?

Current dashboard has 7 tabs with ~25 sub-pages, all Case Study–centric.

**Gap Analysis:**

| Dashboard Area | Current State | Gap | Priority |
|---------------|---------------|-----|----------|
| **Overview → Welcome** | References "Project K case study project" only | Needs three-pillar framing | P0 |
| **Overview → What's New** | Stops at v3.3.2 | Missing v4.0, v4.1 entries | P0 |
| **Overview → Stats** | "50+ Components" — inaccurate | ~70+ components, 15 molecules | P0 |
| **Overview → Version** | "3.3.2" in footer + badge | Should be 4.1 | P0 |
| **Overview → Architecture** | Doesn't exist | Three-pillar map, page type comparison | P1 |
| **Components → Cards** | Only original Card system | Missing ReportCard, StatCard, DataHighlightCard, AnalystPickCardB | P1 |
| **Components → Data Display** | Doesn't exist | Tooltip, ViewToggle, Icon Colors | P1 |
| **Components → Layout** | Doesn't exist | SectionHeading, SectionWrapper | P1 |
| **Components → Loading States** | Doesn't exist | SkeletonCard, EmptyState | P1 |
| **Components → Scroll** | Doesn't exist | HorizontalScroll, ScrollFade | P2 |
| **Components → Animation** | Doesn't exist | CardReveal, RevealImage, FadeInSection | P2 |
| **Patterns → Page Layouts** | Case Study only | Needs Report Store dual-mode pattern | P1 |
| **Patterns → Component Triad** | Doesn't exist | ViewToggle ↔ ReportCard ↔ SkeletonCard | P1 |
| **Patterns → Page Assembly** | Case Study only | Needs per-pillar assembly guides | P2 |
| **Design Principles** | 7 principles, Case Study–only | Principle 05 needs dual-pattern | P1 |

### Decision 3: What Information Should Each New Section Contain?

**Reasoning:** The dashboard serves two audiences — AI assistants (need API specs, decision rules) and human devs (need visual examples, copy-paste code). Every section should include:

1. **WHY** — When to use this component/pattern (decision context)
2. **WHAT** — Visual preview with live rendered component
3. **API** — Props table with types and defaults
4. **Code** — Copy-paste usage example
5. **Pillar Context** — Which pillar(s) use this, any pillar-specific variations

---

## 3. Development Phases

### Phase 1: Dashboard Evolution — Overview Updates (P0)
**Effort:** ~1 session  
**Files:** `DesignSystemDashboard.tsx`

Tasks:
- [ ] 1.1 — Update version to 4.1 (footer, hero badge)
- [ ] 1.2 — Update stats (component count, molecule count)
- [ ] 1.3 — Rewrite Welcome to reference three pillars (not just "case study")
- [ ] 1.4 — Add v4.0 changelog (Report Store molecules, atoms, CSS)
- [ ] 1.5 — Add v4.1 changelog (ReportCard grid+list, Component Triad)
- [ ] 1.6 — Update Principle 05 to show BOTH section patterns (Case Study + Report Store)
- [ ] 1.7 — Add "Architecture" sub-tab with three-pillar diagram + page type comparison

### Phase 2: Dashboard Evolution — Components Expansion (P1)
**Effort:** ~2-3 sessions  
**Files:** `ComponentsContent.tsx` (expand), possibly new content files

Tasks:
- [ ] 2.1 — Expand "Cards" section with ReportCard (grid+list showcase), StatCard, DataHighlightCard, AnalystPickCardB
- [ ] 2.2 — Add "Data Display" section: Tooltip, ViewToggle + ViewMode, iconColors system
- [ ] 2.3 — Add "Layout Components" section: SectionHeading API, SectionWrapper, Container (enhanced)
- [ ] 2.4 — Add "Loading States" section: SkeletonCard (grid+list variants), EmptyState
- [ ] 2.5 — Add "Scroll Components" section: HorizontalScroll, ScrollFade, ScrollToTop, ScrollProgress
- [ ] 2.6 — Add "Animation Components" section: CardReveal, RevealImage, FadeInSection

### Phase 3: Dashboard Evolution — Patterns Expansion (P1)
**Effort:** ~1 session  
**Files:** `PatternsContent.tsx` (expand)

Tasks:
- [ ] 3.1 — Add Report Store section pattern (dual-mode home/listing) alongside Case Study pattern
- [ ] 3.2 — Add Component Triad pattern documentation (ViewToggle ↔ ReportCard ↔ SkeletonCard)
- [ ] 3.3 — Add page type comparison (Display vs Product) with decision flowchart

### Phase 4: Report Store Organisms — Home Mode (P1)
**Effort:** ~3-4 sessions  
**Files:** New organism files in `/src/app/components/`

These are the actual page-level sections that compose molecules:

| Organism | Molecules Used | Complexity |
|----------|---------------|------------|
| `RSHeader.tsx` | Button, Container | Medium (glass-header, search, nav) |
| `RSHeroSection.tsx` | SectionHeading, Button, Container | Medium (globe, search bar) |
| `RSFeaturedResearch.tsx` | SectionHeading, ReportCard, HorizontalScroll, CardReveal | High |
| `RSIndustrySectorsGrid.tsx` | SectionHeading, Card, FadeInSection | Medium |
| `RSRecommendedForYou.tsx` | SectionHeading, ReportCard, ViewToggle, SkeletonCard | High (Triad) |
| `RSAnalystPicksSection.tsx` | SectionHeading, AnalystPickCardB, HorizontalScroll | Medium |
| `RSTrendingStatistics.tsx` | SectionHeading, StatCard, HorizontalScroll | Medium |
| `RSDailyDataHighlights.tsx` | SectionHeading, DataHighlightCard, ScrollFade | Medium |
| `RSCustomResearchCTA.tsx` | SectionHeading, Button, Container | Low |
| `RSFooter.tsx` | Container, InlineLink | Low |

**Naming prefix `RS` (Report Store)** prevents collision with existing Case Study organisms (e.g., `HeroSection`).

### Phase 5: Report Store Organisms — Listing Mode (P2)
**Effort:** ~2 sessions  
**Files:** New organism files

| Organism | Molecules Used | Complexity |
|----------|---------------|------------|
| `RSListingContextBanner.tsx` | Badge, SectionHeading | Low |
| `RSFiltersPanel.tsx` | ViewToggle, Badge, Button | High (sidebar, multi-select) |
| `RSCardGrid.tsx` | ReportCard, SkeletonCard, EmptyState, CardReveal | High (Triad + pagination) |
| `RSMobileFilterBar.tsx` | Badge, Button, ViewToggle | Medium |

### Phase 6: Report Store Page Templates (P2)
**Effort:** ~1-2 sessions  
**Files:** Template/demo components or routes

- [ ] 6.1 — Home mode template (composes all home organisms)
- [ ] 6.2 — Listing mode template (composes listing organisms)
- [ ] 6.3 — Dual-mode switching logic (home ↔ listing)

### Phase 7: Surveys Pillar Planning (P3)
**Effort:** ~1 session planning  
**Files:** Documentation

- [ ] 7.1 — Define Surveys page types and section patterns
- [ ] 7.2 — Identify shared vs unique components
- [ ] 7.3 — Plan any Survey-specific molecules/organisms

### Phase 8: GitHub Push (P2, can happen incrementally)
**Effort:** ~1 session per batch  

- [ ] 8.1 — Push dashboard updates
- [ ] 8.2 — Push organism files (batched by size)
- [ ] 8.3 — Push updated manifest and docs

---

## 4. Dashboard Content Strategy

### What Each New Section Should Show — Reasoning

#### 4.1 Cards Section Expansion

**Why expand:** The current "Cards" section only covers the original `Card` component and `ResourceCard`. With v4.0/v4.1, we now have 5 distinct card types serving different purposes. Engineers need to know WHICH card to use WHERE.

**What to show:**
```
Card Types Decision Flowchart:
├── Is it a container for other content? → Card (base)
├── Is it a case study resource? → ResourceCard (7 variants)
├── Is it a research report listing? → ReportCard (grid | list)
├── Is it a market statistic? → StatCard
├── Is it a daily data point? → DataHighlightCard
└── Is it an analyst recommendation? → AnalystPickCardB
```

Each card type gets:
- Live rendered preview (grid + list for ReportCard)
- Props table
- Pillar context label ("Research" / "Consulting" / "Shared")
- Code example

#### 4.2 Component Triad Documentation

**Why document:** The Triad is the most architecturally novel pattern in v4.1. Three components share a single `viewMode` state — if someone breaks one, the other two break. This MUST be documented together.

**What to show:**
- Diagram: ViewToggle ↔ ReportCard ↔ SkeletonCard
- Live interactive demo: toggle switches layout, skeleton matches
- State management pattern (single `useState<ViewMode>`)
- Common mistake: using `ReportGridCard` instead of `ReportCard layout="grid"`

#### 4.3 Data Display Section

**Why add:** Tooltip and ViewToggle are shared atoms that appear across multiple organisms. They have specific API requirements (Tooltip uses portal, ViewToggle needs 44px touch targets).

**What to show:**
- Tooltip positioning (top/bottom auto-detection)
- ViewToggle with warm pill container
- iconColors system (content: #806ce0, utility: #737373)
- Usage examples in context (ViewToggle inside a section header)

#### 4.4 Loading States Section

**Why add:** SkeletonCard and EmptyState are CRITICAL for production UX but invisible in static demos. They need dedicated documentation to show what loading and zero-result states look like.

**What to show:**
- SkeletonCard grid variant (shimmer animation)
- SkeletonCard list variant
- EmptyState with icon, message, and action button
- When to use skeleton vs spinner vs empty state (decision guide)

#### 4.5 Architecture Sub-Tab (Overview)

**Why add:** This is the MOST IMPORTANT new addition. Without it, every new AI session starts with zero context about the three-pillar structure. This tab is the "read this first" for anyone building a new page.

**What to show:**
- Three-pillar diagram (visual)
- Display vs Product page comparison table
- "Which components go where" decision matrix
- Per-pillar section pattern (side-by-side)
- Import path conventions

---

## 5. Session Execution Plan

Recommended session order for maximum incremental value:

| Session | Phase | Deliverable | Dependencies |
|---------|-------|-------------|--------------|
| **7** | Phase 1 | Dashboard overview updates (version, stats, welcome, changelog, architecture tab) | None |
| **8** | Phase 2a | Cards section expansion (ReportCard, StatCard, DataHighlightCard, AnalystPickCardB) | Session 7 |
| **9** | Phase 2b | Data Display + Layout + Loading States sections | Session 7 |
| **10** | Phase 2c + 3 | Scroll + Animation sections, Patterns expansion | Session 9 |
| **11** | Phase 4a | RS organisms batch 1 (Header, Hero, Footer, CustomResearchCTA — low/medium) | Session 7 |
| **12** | Phase 4b | RS organisms batch 2 (FeaturedResearch, IndustrySectors, RecommendedForYou) | Session 11 |
| **13** | Phase 4c | RS organisms batch 3 (AnalystPicks, TrendingStats, DailyHighlights) | Session 12 |
| **14** | Phase 5 | Listing mode organisms (Filters, CardGrid, ContextBanner, MobileFilter) | Session 12 |
| **15** | Phase 6 | Page templates (home + listing composed) | Session 13-14 |
| **16** | Phase 8 | GitHub push (batched) | Anytime after session 10 |

**Total estimated: 10 sessions (7-16)**

---

## 6. Open Questions for Review

1. **RS organism naming:** Use `RS` prefix (e.g., `RSHeroSection`) or namespace via directory (e.g., `report-store/HeroSection`)? Recommendation: `RS` prefix keeps flat architecture consistent with existing pattern.

2. **Surveys pillar:** Should we plan Survey-specific components now, or defer until Requirements are defined? Recommendation: Defer — focus on Research, let patterns emerge.

3. **Dashboard route:** Currently FM renders `<DesignSystemDashboard />` directly. Should we add React Router for demo pages (e.g., `/report-store-demo`)? Recommendation: Yes, but only when we have organisms to show.

4. **GitHub push timing:** Push incrementally (after each session) or batch (after Phase 3)? Recommendation: Batch after Phase 1+2+3 (dashboard complete), then after Phase 4+5+6.

5. **Component Triad live demo:** Should the dashboard have a WORKING Triad demo with mock data? Recommendation: Yes — it's the signature v4.1 feature.

---

## 7. Success Criteria

### Phase 1-3 Complete (Dashboard Evolution):
- [ ] Dashboard version reads 4.1
- [ ] Welcome page references all three pillars
- [ ] All 15+ new components documented with previews
- [ ] Component Triad has interactive demo
- [ ] Both section patterns (Case Study + Report Store) visible side-by-side
- [ ] Architecture tab explains page types with decision flowchart

### Phase 4-6 Complete (Report Store):
- [ ] 10 home-mode organisms render with mock data
- [ ] 4 listing-mode organisms render with mock data
- [ ] Home template composes all home organisms
- [ ] Listing template composes all listing organisms
- [ ] Dual-mode switching works

### Full Plan Complete:
- [ ] All files synced to GitHub
- [ ] Manifest updated
- [ ] ai-context/ docs updated for v4.2

---

**END OF PLAN — Review and approve to begin Session 7**