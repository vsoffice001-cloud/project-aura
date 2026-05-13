# Design System File Map & Checklist

**Version:** 3.0 | **Updated:** 2026-03-18  
**Project:** Project K / Vishal  
**Repository:** vsoffice001-cloud/Design-System-vs-26

---

## File Groups (11 groups, 140+ files)

### Group 1: Design Tokens (5 files)

| File | Purpose | Status |
|------|---------|--------|
| `src/styles/theme.css` | ALL CSS custom properties | ✅ |
| `src/styles/fonts.css` | Google Fonts imports (DM Sans, Noto Serif) | ✅ |
| `src/styles/report-store-additions.css` | RS CSS classes, focus-visible, scrollbar-hide, skeleton | ✅ |
| `src/styles/index.css` | CSS entry point + Tailwind directives | ✅ |
| `src/styles/tailwind.css` | Tailwind base layer | ✅ |

### Group 2: Atoms — Core DS Components (24 files)

| File | Purpose | Status |
|------|---------|--------|
| `Button.tsx` | 4 variants, 5 sizes, shimmer, arrow, two-state secondary | ✅ |
| `Badge.tsx` | 11 themes, 4 sizes, 3 variants, CSS custom property driven | ✅ |
| `Label.tsx` | Form field labels | ✅ |
| `CTALink.tsx` | Text + animated arrow CTA link | ✅ |
| `InlineLink.tsx` | Inline paragraph link | ✅ |
| `AnimatedArrow.tsx` | Arrow icon with hover animation | ✅ |
| `Card.tsx` | v4.0 — 3 variants, ref-based hover, as prop, onClick | ✅ |
| `SectionHeading.tsx` | v4.0 — prop-based heading (title, label, subtitle, slots) | ✅ |
| `SectionWrapper.tsx` | Section layout wrapper (background, spacing, maxWidth) | ✅ |
| `Container.tsx` | Layout width wrapper (5 presets) | ✅ |
| `Tooltip.tsx` | Portal-based tooltip (top/bottom, scroll-reposition) | ✅ |
| `ViewToggle.tsx` | List/grid view toggle | ✅ |
| `FadeInSection.tsx` | IO scroll-triggered fade-in | ✅ |
| `ScrollProgress.tsx` | Page scroll progress bar | ✅ |
| `ScrollToTop.tsx` | Floating scroll-to-top button | ✅ |
| `IconBadge.tsx` | Icon container with tinted bg (4 sizes) | ✅ |
| `CategoryListItem.tsx` | Category row (icon, label, count, chevron) | ✅ |
| `FilterCheckbox.tsx` | Single filter option (label + count) | ✅ |
| `FilterChip.tsx` | Dismissible active filter pill | ✅ |
| `FilterSearchInput.tsx` | Search input with clear button | ✅ |
| `FilterSectionHeader.tsx` | Collapsible section header | ✅ |
| `FilterCheckboxItem.tsx` | Custom checkbox + label + count | ✅ |
| `FilterIndustryItem.tsx` | Expandable industry row with sub-items | ✅ |
| `iconColors.ts` | Semantic icon color constants | ✅ |

### Group 3: Molecules (26 files in `molecules/`)

| File | Purpose | Status |
|------|---------|--------|
| `index.ts` | Barrel exports | ✅ |
| `ReportCard.tsx` | Canonical report card (grid + list) | ✅ |
| `ReportGridCard.tsx` | @deprecated → ReportCard layout="grid" | ✅ |
| `StatCard.tsx` | Market stat card with growth | ✅ |
| `DataHighlightCard.tsx` | Data point card with value + trend | ✅ |
| `AnalystPickCardB.tsx` | Expert recommendation card | ✅ |
| `IndustryBadge.tsx` | Industry subcategory label | ✅ |
| `CardMetaRow.tsx` | Card metadata row (A/B variants) | ✅ |
| `CardFooterRow.tsx` | Card footer with date | ✅ |
| `CardReveal.tsx` | IO staggered card entrance | ✅ |
| `RevealImage.tsx` | Progressive image reveal | ✅ |
| `SkeletonCard.tsx` | Loading skeleton (grid + list) | ✅ |
| `EmptyState.tsx` | Zero results fallback | ✅ |
| `BackToTop.tsx` | Floating scroll-to-top | ✅ |
| `HorizontalScroll.tsx` | Transform-based card carousel | ✅ |
| `ScrollFade.tsx` | Pill/tab overflow with fade edges | ✅ |
| `CategoryListCard.tsx` | Vertical list card | ✅ |
| `LoadMoreSentinel.tsx` | IO infinite scroll trigger | ✅ |
| `SurveyCard.tsx` | Survey card (grid + list) | ✅ |
| `CompletionBadge.tsx` | Survey lifecycle state badge | ✅ |
| `ResponseChart.tsx` | CSS-only bar/donut chart | ✅ |
| `QuestionPreview.tsx` | Survey question type preview | ✅ |
| `SurveySkeleton.tsx` | Survey loading skeleton | ✅ |
| `FilterAccordion.tsx` | Collapsible filter group | ✅ |
| `SidebarPanel.tsx` | Sidebar container shell | ✅ |
| `ActiveFilterChip.tsx` | Active filter chip bar + "Clear all" | ✅ |
| `MobileFilterSheet.tsx` | Full-screen mobile filter overlay | ✅ |

### Group 4: Organisms — Cross-Pillar (7 files in `organisms/`)

| File | Purpose | Status |
|------|---------|--------|
| `index.ts` | Barrel exports | ✅ |
| `ProductHero.tsx` | Cross-pillar hero section | ✅ |
| `FeaturedCarousel.tsx` | Cross-pillar featured carousel | ✅ |
| `StatsRow.tsx` | Cross-pillar stat cards row | ✅ |
| `BrowseGrid.tsx` | Cross-pillar card grid + ViewToggle | ✅ |
| `CTABanner.tsx` | Cross-pillar CTA banner | ✅ |
| `ProductPageTemplate.tsx` | Declarative page template | ✅ |

### Group 5: Organisms — Report Store (24 files in `organisms/`)

| File | Purpose | Status |
|------|---------|--------|
| `ReportStoreHero.tsx` | RS hero (search, categories) | ✅ |
| `FeaturedResearch.tsx` | RS featured carousel | ✅ |
| `ListingToolbar.tsx` | Sort, search, ViewToggle | ✅ |
| `CardListing.tsx` | Paginated card grid | ✅ |
| `FiltersPanel.tsx` | Filter accordion sidebar | ✅ |
| `IndustrySidebar.tsx` | Industry filter sidebar | ✅ |
| `IndustryFocusBanner.tsx` | Industry context header | ✅ |
| `DailyDataHighlights.tsx` | 4 DataHighlightCards | ✅ |
| `AnalystPicks.tsx` | 3 AnalystPickCardBs | ✅ |
| `IndustrySectorsGrid.tsx` | 14 industries (7+7) | ✅ |
| `KeyMarketIndicators.tsx` | StatsRow wrapper | ✅ |
| `RecommendedForYou.tsx` | BrowseGrid wrapper | ✅ |
| `CustomResearchCTA.tsx` | CTABanner wrapper | ✅ |
| `TrendingTopics.tsx` | Trending topic pills | ✅ |
| `TopDownloads.tsx` | Ranked download list | ✅ |
| `RecentlyViewed.tsx` | Recently viewed carousel | ✅ |
| `UpcomingReports.tsx` | Upcoming report pipeline | ✅ |
| `ResearchMethodology.tsx` | 5-step methodology | ✅ |
| `NewsletterSignup.tsx` | Email subscription | ✅ |
| `IndustrySpotlight.tsx` | Featured industry deep-dive | ✅ |
| `ComparisonTable.tsx` | Format comparison table | ✅ |
| `ReportPreview.tsx` | Report detail view | ✅ |
| `TestimonialsRS.tsx` | Testimonial quotes | ✅ |
| `QuickAccessBar.tsx` | Horizontal action bar | ✅ |

### Group 6: Organisms — Case Study (11 files in root `components/`)

| File | Background | Status |
|------|-----------|--------|
| `HeroSection.tsx` | BLACK | ✅ |
| `ClientContextSection.tsx` | WHITE | ✅ |
| `ChallengesSection.tsx` | WARM | ✅ |
| `EngagementObjectivesSection.tsx` | WHITE | ✅ |
| `MethodologySection.tsx` | WARM | ✅ |
| `ImpactSection.tsx` | WHITE | ✅ |
| `ValuePillarsSection.tsx` | WHITE | ✅ |
| `TestimonialSection.tsx` | WHITE | ✅ |
| `ResourcesSection.tsx` | BLACK | ✅ |
| `FinalCTASection.tsx` | WHITE | ✅ |
| `NextSectionCTA.tsx` | — | ✅ |

### Group 7: Page Shell & Navigation (8 files)

| File | Purpose | Status |
|------|---------|--------|
| `Navbar.tsx` | Responsive two-state navbar | ✅ |
| `ContactModal.tsx` | Contact form modal | ✅ |
| `StickyCTA.tsx` | Floating context-aware CTA | ✅ |
| `ReadingProgressBar.tsx` | Case study reading progress | ✅ |
| `TableOfContents.tsx` | Sidebar TOC with active tracking | ✅ |
| `CodeBlockWithCopy.tsx` | Code block with copy button | ✅ |
| `CollapsibleSection.tsx` | Expandable content section | ✅ |
| `VariantSwitcher.tsx` | Component variant toggle | ✅ |

### Group 8: Resource System (3 files)

| File | Purpose | Status |
|------|---------|--------|
| `ResourceCard.tsx` | 7-variant content card | ✅ |
| `SubtleVariantSwitcher.tsx` | Designer card style toggle | ✅ |
| `SpacingHelpers.tsx` | Spacing utility components | ✅ |

### Group 9: Hooks (15 files in `hooks/`)

| File | Purpose | Status |
|------|---------|--------|
| `index.ts` | Barrel exports | ✅ |
| `useShimmer.ts` | Shimmer CSS generation (DO NOT DELETE) | ✅ |
| `useScrollDirection.ts` | Scroll up/down detection | ✅ |
| `useHeroVisibility.ts` | Hero section visibility | ✅ |
| `useActiveSection.ts` | Active section tracking | ✅ |
| `useCounter.ts` | Animated number counting | ✅ |
| `useScrollAnimation.ts` | Scroll-triggered animations | ✅ |
| `useResponsiveGutter.ts` | Responsive gutter (24/32px) | ✅ |
| `useReadingProgress.ts` | Page reading progress | ✅ |
| `useSectionProgress.ts` | Section-range progress | ✅ |
| `useMagneticEffect.ts` | Magnetic hover effect | ✅ |
| `useReportFilters.ts` | RS filter state machine | ✅ |
| `useProgressiveLoad.ts` | IO infinite scroll | ✅ |
| `useCrossfade.ts` | Crossfade transition | ✅ |
| `useMountTransition.ts` | Mount/unmount transitions | ✅ |

### Group 10: Dashboard & Documentation Components (28+ files)

| File | Purpose | Status |
|------|---------|--------|
| `DesignSystemDashboard.tsx` | Main dashboard shell | ✅ |
| `DesignSystemSidebar.tsx` | Dashboard navigation | ✅ |
| `FoundationsContent.tsx` | Re-export hub (~1KB) | ✅ |
| `foundations/FoundationsHelpers.tsx` | Shared DocSection | ✅ |
| `foundations/ColorsContent.tsx` | Color palette docs | ✅ |
| `foundations/TypographyContent.tsx` | Typography docs | ✅ |
| `foundations/SpacingContent.tsx` | Spacing docs | ✅ |
| `foundations/LayoutGridContent.tsx` | Layout docs | ✅ |
| `foundations/ElevationBorderRadius.tsx` | Shadow + radius docs | ✅ |
| `ComponentsContent.tsx` | Components tab | ✅ |
| `PatternsContent.tsx` | Patterns tab | ✅ |
| `MotionContent.tsx` | Motion tab | ✅ |
| `GuidelinesContent.tsx` | Guidelines tab | ✅ |
| `ResourcesContent.tsx` | Resources tab | ✅ |
| `AllColorsPaletteContent.tsx` | Full color palette | ✅ |
| `AllTypographyTokensContent.tsx` | All type tokens | ✅ |
| `AllSpacingTokensContent.tsx` | All spacing tokens | ✅ |
| `AllLayoutGridTokensContent.tsx` | All layout tokens | ✅ |
| `AllElevationTokensContent.tsx` | All elevation tokens | ✅ |
| `AllBorderRadiusTokensContent.tsx` | All radius tokens | ✅ |
| `ButtonDocumentation.tsx` | Button docs | ✅ |
| `LinksDocumentation.tsx` | Link system docs | ✅ |
| `NavigationDocumentation.tsx` | Navigation docs (uses ScrollFade) | ✅ |
| `BadgeLabelsDocumentation.tsx` | Badge docs | ✅ |
| `BadgeShowcase.tsx` | Badge gallery | ✅ |
| `LinkSystemDemo.tsx` | Link demo | ✅ |
| `ShimmerDemo.tsx` | Shimmer demo | ✅ |
| `AnimatedArrowDemo.tsx` | Arrow demo | ✅ |
| `AnimatedArrowQuickRef.tsx` | Arrow quick ref | ✅ |
| `ButtonControlsGuide.tsx` | Button controls | ✅ |
| `FigmaButtonComparison.tsx` | Figma vs code | ✅ |
| `FiltersDocumentation.tsx` | Filter system docs | ✅ |
| `ReportStoreOrganismsShowcase.tsx` | RS organisms gallery | ✅ |
| `SurveysDemoContent.tsx` | Surveys home demo | ✅ |
| `SurveysListingDemoContent.tsx` | Surveys listing demo | ✅ |
| `TemplateDemoContent.tsx` | Template demo | ✅ |
| `ReportStorePage.tsx` | RS template | ✅ |

### Group 11: Data & Barrel Exports (5 files)

| File | Purpose | Status |
|------|---------|--------|
| `components/index.ts` | Component barrel exports | ✅ |
| `data.ts` | Centralized mock data | ✅ |
| `industryIconMap.ts` | Industry → Lucide icon mapping | ✅ |
| `badges/index.ts` | Badge re-exports (backward compat) | ✅ |
| `links/README.md` | Link system overview | ✅ |

---

## Barrel Export Checklist

When adding a new component, ensure it's exported from the correct barrel:

| Component Type | Barrel File |
|---------------|-------------|
| Atom (root) | `components/index.ts` |
| Molecule | `molecules/index.ts` + `components/index.ts` |
| Organism | `organisms/index.ts` + `components/index.ts` |
| Hook | `hooks/index.ts` |

---

## Summary

| Group | Count | Location |
|-------|-------|----------|
| Tokens | 5 | `src/styles/` |
| Atoms | 24 | `src/app/components/` |
| Molecules | 26 | `src/app/components/molecules/` |
| Cross-Pillar Organisms | 7 | `src/app/components/organisms/` |
| RS Organisms | 24 | `src/app/components/organisms/` |
| CS Organisms | 11 | `src/app/components/` |
| Shell/Nav | 8 | `src/app/components/` |
| Resources | 3 | `src/app/components/` |
| Hooks | 15 | `src/app/hooks/` |
| Dashboard/Docs | 37 | `src/app/components/` + `foundations/` |
| Data/Barrels | 5 | `src/app/components/` |
| **Total** | **~165** | |

---

*v3.0 | March 18, 2026 | Complete file inventory across all 11 groups*
