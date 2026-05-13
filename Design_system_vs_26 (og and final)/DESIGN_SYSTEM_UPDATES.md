# Design System Updates — Changelog

**Project:** Project K / Vishal  
**Repository:** vsoffice001-cloud/Design-System-vs-26  
**Last Updated:** 2026-03-18

---

## v4.3 — Report Store Architecture + Navigation Extraction (2026-03-18)

### New Components
- **ReportStorePage.tsx** — RS template (home + listing mode with route-like state)
- **ProductPageTemplate.tsx** — Cross-pillar declarative page template
- **6 cross-pillar organisms** — ProductHero, FeaturedCarousel, StatsRow, BrowseGrid, CTABanner, ProductPageTemplate
- **24 Report Store organisms** — Full RS organism architecture (ReportStoreHero through QuickAccessBar)
- **NavigationDocumentation.tsx** — Extracted from ComponentsContent, uses ScrollFade molecule
- **FiltersDocumentation.tsx** — Filter system interactive documentation
- **ReportStoreOrganismsShowcase.tsx** — RS organisms interactive gallery
- **CategoryListCard.tsx** — Vertical list card molecule
- **LoadMoreSentinel.tsx** — IO infinite scroll trigger molecule
- **IconBadge.tsx** — Icon container atom (4 sizes)
- **CategoryListItem.tsx** — Category row atom

### Architecture Changes
- **Molecule/Organism barrel exports** — `molecules/index.ts` and `organisms/index.ts`
- **Data module** — `data.ts` centralizes mock data (reports, industries, regions, stats)
- **Industry icon map** — `industryIconMap.ts` for Lucide icon mapping
- **ScrollFade refactor** — NavigationDocumentation replaced inline ScrollFadeRow with ScrollFade molecule (commit `4d7d3ba`)

### Documentation
- **ai-context/ modules updated to v4.3** — COMPONENTS.md adds molecules/organisms, PROMPTS.md adds 5 new prompts, LAYOUT.md adds RS page assembly
- **GITHUB_PUSH_GUIDE.md v2.0** — Updated atomic classification, molecules/organisms file registry
- **QUICK_START_PROMPT.md v4.3** — Rewritten with molecules/organisms quick reference
- **COMPONENT_GUIDELINES_4WH.md v4.3** — Added SectionHeading v4.0, Card v4.0, ScrollFade, HorizontalScroll, SectionWrapper
- **DESIGN_SYSTEM_AI_CONTEXT.md** — Converted from 50KB monolith to 3KB lightweight index pointing to ai-context/ modules
- **design-system-checklist.md v3.0** — Expanded from 52 files to 165 files across 11 groups
- **14PX_DESIGN_SYSTEM_INTEGRATION.md** — Archived with pointer to ai-context/TYPOGRAPHY.md

### Branding
- **"Yash/Design System" → "Project K / Vishal"** — Complete rebrand across dashboard and documentation

---

## v4.2 — Surveys Pillar + Filter Extraction (2026-03)

### New Components
- **5 Survey molecules** — SurveyCard, CompletionBadge, ResponseChart, QuestionPreview, SurveySkeleton
- **6 Filter atoms** — FilterCheckbox, FilterChip, FilterSearchInput, FilterSectionHeader, FilterCheckboxItem, FilterIndustryItem
- **4 Filter molecules** — FilterAccordion, SidebarPanel, ActiveFilterChipBar, MobileFilterSheet
- **SurveysDemoContent.tsx** — Surveys home page demo
- **SurveysListingDemoContent.tsx** — Surveys listing page demo

### Architecture Changes
- **Filter extraction** — Monolithic IndustrySidebar (1,400+ lines) refactored into 6 atoms + 4 molecules
- **Unified Input System** — 51 input instances across 14 files unified to 6-state monochromatic system

### Documentation
- **FILTER_SEARCH_SYSTEM_4WH.md** — Comprehensive 4W+H for all filter components
- **ai-context/COMPONENTS.md** — Added Filter System section

---

## v4.1 — Molecule Push + Report Store Core (2026-03)

### New Components
- **ReportCard.tsx** — Canonical report card (grid + list layouts), replaces ReportGridCard
- **StatCard.tsx** — Market stat card with growth indicator
- **DataHighlightCard.tsx** — Data point card with value + trend
- **AnalystPickCardB.tsx** — Expert recommendation card
- **HorizontalScroll.tsx** — Transform-based card carousel with drag/momentum
- **ScrollFade.tsx** — Pill/tab overflow with fade edges
- **SkeletonCard.tsx** — Loading skeleton (grid + list)
- **EmptyState.tsx** — Zero results fallback
- **CardReveal.tsx** — IO-based staggered card entrance
- **RevealImage.tsx** — Progressive blur-to-sharp image reveal
- **BackToTop.tsx** — Floating scroll-to-top button

### New Hooks
- **useReportFilters.ts** — RS filter state machine (7 dimensions)
- **useProgressiveLoad.ts** — IO infinite scroll
- **useCrossfade.ts** — Crossfade transition between content swaps
- **useMountTransition.ts** — Mount/unmount with CSS transitions

---

## v4.0 — Layout Atoms + SectionHeading API (2026-02-03)

### New Components
- **SectionHeading.tsx** — v4.0 prop-based API (title, label, subtitle, action, endSlot)
- **SectionWrapper.tsx** — Section layout wrapper (background, spacing, maxWidth)
- **Card.tsx** — v4.0 base card (3 variants, ref-based hover, as prop, onClick)
- **Tooltip.tsx** — Portal-based tooltip
- **ViewToggle.tsx** — Grid/list view toggle
- **FadeInSection.tsx** — IO scroll-triggered fade-in
- **ScrollProgress.tsx** — Page scroll progress
- **ScrollToTop.tsx** — Scroll-to-top button

### Architecture Changes
- **Inline style rules** — All interactive components use inline styles for DS compliance
- **Container tokens** — var(--container-*) replaces Tailwind max-w-* classes

---

## v3.4 — Foundations Modular Split (2026-02)

### Architecture Changes
- **FoundationsContent.tsx** split into 6 modular sub-files under `foundations/`
- **ColorsContent.tsx** (~35KB) — Color palette docs
- **TypographyContent.tsx** (~23KB) — Typography scale docs
- **SpacingContent.tsx** (~8KB) — Spacing system docs
- **LayoutGridContent.tsx** (~25KB) — Layout & grid docs
- **ElevationBorderRadius.tsx** (~17KB) — Shadow + radius docs
- **FoundationsHelpers.tsx** — Shared DocSection component
- **FoundationsContent.tsx** (~1KB) — Re-export hub

---

## v3.3.2 — Badge Unification (2026-02)

### Changes
- **Badge.tsx** unified — 11 themes, 4 sizes, 3 variants, CSS custom property driven
- **10 convenience wrappers** — SectionLabel, StepPill, ObjectivePill, StatusBadge, etc.
- **BADGE_TOKENS** constant for theme colors

---

## v3.3 — Secondary Button Two-State + Link System (2026-02)

### Changes
- **Secondary button** — Two-state system (neutral rest → brand-red hover)
- **CTALink.tsx** — Text + animated arrow CTA link
- **InlineLink.tsx** — Inline paragraph link with red underline
- **AnimatedArrow.tsx** — Arrow icon with slide animation
- **Shimmer** — Always-active sweep on all buttons (brand signature)

---

## v3.2 — ResourcesSection + Case Study Organisms (2026-01)

### New Components
- **10 Case study organisms** — HeroSection through FinalCTASection
- **ResourceCard.tsx** — 7-variant content card for Masonry grid
- **ResourcesSection.tsx** — Dark gradient mesh section with Masonry grid
- **Container.tsx** — 5-preset layout width wrapper
- **SubtleVariantSwitcher.tsx** — Designer-facing card style toggle

### New Hooks
- **useResponsiveGutter.ts** — Pixel-based responsive spacing for Masonry

---

*End of changelog*