# GITHUB PUSH GUIDE
**How to Push Files Correctly to the `main` Branch**
**Version:** 2.0
**Date:** 2026-03-18
**For:** Team members, AI assistants, and contributors

---

## PURPOSE

This guide ensures that every file pushed to GitHub is:
1. Properly classified by Atomic Design level
2. Free of Figma Make-only dependencies
3. Registered in all required documentation and barrel exports
4. Accompanied by correct commit messages

**Read this BEFORE pushing anything.**

---

## TABLE OF CONTENTS

1. [The Golden Rule: What NOT to Push](#the-golden-rule-what-not-to-push)
2. [Pre-Push Checklist (Universal)](#pre-push-checklist-universal)
3. [Atomic Design Classification](#atomic-design-classification)
4. [Push Procedures by Level](#push-procedures-by-level)
5. [Documentation Update Matrix](#documentation-update-matrix)
6. [The figma:asset Problem](#the-figmaasset-problem)
7. [Barrel Export Registration](#barrel-export-registration)
8. [CSS Variable Registration](#css-variable-registration)
9. [Commit Message Format](#commit-message-format)
10. [Known Divergences Between Figma Make and GitHub](#known-divergences)
11. [Complete File Registry](#complete-file-registry)

---

## THE GOLDEN RULE: WHAT NOT TO PUSH

### NEVER push these to GitHub:

| File/Directory | Why |
|---|---|
| `src/app/App.tsx` (Figma Make version) | GitHub's App.tsx uses `react-router-dom` with route-based navigation. Figma Make's version renders `DesignSystemDashboard` directly. They are intentionally different. |
| `src/imports/*.tsx` (16 Figma frame files) | These are Figma Make environment imports (1stBg.tsx, BrandCta.tsx, Container.tsx in imports/, etc.). They don't resolve outside Figma Make. |
| `src/app/components/ui/*.tsx` (48 shadcn files) | These are local shadcn/ui primitives. They're used in Figma Make but not tracked on GitHub. |
| `src/app/components/figma/ImageWithFallback.tsx` | Protected Figma Make system file. |
| `pnpm-lock.yaml` | Protected system file. |
| Any file with unresolved `figma:asset/` imports | See [The figma:asset Problem](#the-figmaasset-problem). |

### ALWAYS push these (when changed):

| File | Why |
|---|---|
| `src/styles/theme.css` | Design tokens are the foundation of everything |
| `src/styles/fonts.css` | Font imports |
| `src/app/components/index.ts` | Barrel exports for components |
| `src/app/hooks/index.ts` | Barrel exports for hooks |
| Documentation `.md` files | Team and AI reference |

---

## PRE-PUSH CHECKLIST (UNIVERSAL)

Before pushing **any** file, verify ALL of the following:

### Step 1: Dependency Audit
- [ ] Does the file import from `figma:asset/`? If yes, STOP. See [The figma:asset Problem](#the-figmaasset-problem).
- [ ] Does the file import from `src/imports/`? If yes, those SVG/image files must ALSO be pushed (or replaced with alternatives).
- [ ] Does the file import from `src/app/components/ui/`? If yes, that shadcn component must ALSO exist on GitHub (most don't).
- [ ] Does the file import other custom components? If yes, verify those components already exist on GitHub.
- [ ] Does the file use CSS variables (e.g., `var(--something)`)? If yes, verify they exist in `theme.css` on GitHub.

### Step 2: Import Path Verification
- [ ] All imports use `@/app/components/` or `@/app/hooks/` aliases (NOT relative `./` or `../` from outside the components directory).
- [ ] No imports reference `react-router-dom` (use `react-router` instead — though GitHub's App.tsx is an intentional exception).
- [ ] All lucide-react icons are available (check the package exists on GitHub's package.json).

### Step 3: Classification
- [ ] You know which Atomic Design level this file belongs to (see next section).
- [ ] You know which documentation files need updating (see [Documentation Update Matrix](#documentation-update-matrix)).

### Step 4: Registration
- [ ] Component is exported from `src/app/components/index.ts` (if it's a component).
- [ ] Hook is exported from `src/app/hooks/index.ts` (if it's a hook).

### Step 5: Documentation
- [ ] `COMPONENT_GUIDELINES_4WH.md` has a 4W+H entry for this file (if it's a component).
- [ ] `DESIGN_SYSTEM_AI_CONTEXT.md` references it (if it's a design system component).
- [ ] `PROJECT_STRUCTURE.md` lists it in the file tree.
- [ ] `GITHUB_REPO_MANIFEST.md` (on GitHub) includes it.

---

## ATOMIC DESIGN CLASSIFICATION

### How to Classify Your File

```
Ask yourself these questions IN ORDER:

Q1: Is this a CSS variable, font, color value, or spacing token?
    YES -> DESIGN TOKEN (in theme.css)

Q2: Is this a single-purpose UI component with a simple prop API?
    (Button, Badge, Label, AnimatedArrow, CTALink, InlineLink, Card,
     SectionHeading, SectionWrapper, Container, Tooltip, ViewToggle,
     FadeInSection, IconBadge, FilterCheckbox, FilterChip, etc.)
    YES -> ATOM (Level 1)

Q3: Does this combine 2-3 atoms into a reusable pattern?
    Lives in /components/molecules/ directory.
    (ReportCard, StatCard, ScrollFade, HorizontalScroll, SkeletonCard,
     EmptyState, CardReveal, SurveyCard, FilterAccordion, SidebarPanel, etc.)
    YES -> MOLECULE (Level 2)

Q4: Does this combine molecules + atoms into a complete page section?
    Lives in /components/organisms/ or /components/ (case study).
    (ProductHero, BrowseGrid, FeaturedCarousel, StatsRow, CTABanner,
     ReportStoreHero, FeaturedResearch, CardListing, FiltersPanel,
     HeroSection, ChallengesSection, ResourcesSection, Navbar, etc.)
    YES -> ORGANISM (Level 3)

Q5: Is this a page skeleton that defines section order and backgrounds?
    (ProductPageTemplate, ReportStorePage, CaseStudyTemplate)
    YES -> TEMPLATE (Level 4)

Q6: Is this a final page with real content wired in?
    (App.tsx on GitHub)
    YES -> PAGE (Level 5)

ALSO: Is this a React hook?
    YES -> UTILITY (cross-cutting, supports any level)

ALSO: Is this a documentation/showcase component?
    (ButtonDocumentation, LinksDocumentation, NavigationDocumentation,
     FiltersDocumentation, BadgeShowcase, ReportStoreOrganismsShowcase)
    YES -> DOCUMENTATION (not part of the atomic hierarchy)
```

### Current File Classification

#### LEVEL 1: ATOMS (Design Tokens + Simple Components)

| File | What It Contains | Push Notes |
|---|---|---|
| `src/styles/theme.css` | ALL CSS variables: colors, typography scale, spacing, radii, shadows, layout widths, animation keyframes | Always push when variables change. |
| `src/styles/fonts.css` | Google Fonts imports (DM Sans, Noto Serif) | Push only when adding/changing fonts. |
| `src/styles/report-store-additions.css` | RS CSS classes: focus-visible ring, scrollbar-hide, card-reveal, skeleton-shimmer, etc. | Push when RS styles change. |
| `src/styles/index.css` | Tailwind directives + global resets | Rarely changes. |
| `Button.tsx` | 4 variants, 5 sizes, shimmer, arrow, secondary two-state, iconOnly, brand gradient | Core atom. Test all dependents. |
| `Badge.tsx` | 11 themes, 4 sizes, 3 variants, CSS custom property driven + 10 convenience wrappers | Unified component. |
| `Label.tsx` | Form field labels | Form-only. NOT for section headers. |
| `CTALink.tsx` | Text + animated arrow CTA link | Uses useShimmer hook. |
| `InlineLink.tsx` | Inline paragraph link | Uses useShimmer hook. |
| `AnimatedArrow.tsx` | Arrow icon with hover animation | Used by Button and CTALink. |
| `Card.tsx` | v4.0 — 3 variants, ref-based hover, as prop, onClick, typed shadow/border maps | Base container for all cards. |
| `SectionHeading.tsx` | v4.0 — prop-based heading (title, label, subtitle, action, endSlot, labelPulse) | Replaces old children-based API. |
| `SectionWrapper.tsx` | Section layout wrapper (background, spacing, maxWidth) | Handles responsive padding automatically. |
| `Container.tsx` | Layout width wrapper (5 presets) | DRY wrapper for max-width + padding. |
| `Tooltip.tsx` | Portal-based tooltip (top/bottom, scroll-reposition) | Never clipped by overflow:hidden. |
| `ViewToggle.tsx` | List/grid view toggle with warm pill, Tooltip labels | 44px mobile touch targets. |
| `FadeInSection.tsx` | IO wrapper for scroll-triggered fade-in (stagger, direction, prefers-reduced-motion) | Wrap page sections. |
| `IconBadge.tsx` | Icon container with tinted bg (4 sizes) | Used in category/stat displays. |
| `CategoryListItem.tsx` | Category row (icon, label, count, chevron) | Used in IndustrySectorsGrid. |
| `FilterCheckbox.tsx` | Single filter option (label + count) | Pure monochromatic black/opacity. |
| `FilterChip.tsx` | Dismissible active filter pill | bg-black/[0.06], text-black/70. |
| `FilterSearchInput.tsx` | Search input with clear button | Uses --text-xs. |
| `FilterSectionHeader.tsx` | Collapsible section header with count badge | ChevronRight toggle. |
| `FilterCheckboxItem.tsx` | Custom checkbox UI + label + count row | Selected: border-l-[3px] border-black. |
| `FilterIndustryItem.tsx` | Expandable industry row with sub-items | Hierarchical filter. |

#### LEVEL 2: MOLECULES (in `/components/molecules/`)

| File | Purpose | Key Dependencies | Push Notes |
|---|---|---|---|
| `ReportCard.tsx` | Canonical report card (grid + list) | Card, Button, ImageWithFallback, IndustryBadge, CardMetaRow, CardFooterRow | Replaces deprecated ReportGridCard. |
| `StatCard.tsx` | Market stat card with growth | Card, Badge, Button, Tooltip, iconColors | Used by StatsRow organism. |
| `DataHighlightCard.tsx` | Daily data point card | Card, Tooltip, iconColors | Used by DailyDataHighlights. |
| `AnalystPickCardB.tsx` | Expert recommendation card | Card, Badge, Button, ImageWithFallback | Used by AnalystPicks. |
| `ScrollFade.tsx` | Pill/tab overflow with fade masks + optional chevrons | lucide-react ChevronLeft/Right | For pills/tabs, NOT cards. |
| `HorizontalScroll.tsx` | Transform-based card carousel | lucide-react ChevronLeft/Right | For cards with drag/momentum. |
| `SkeletonCard.tsx` | Loading placeholder (grid + list) | Standalone | Mirror card layouts. |
| `EmptyState.tsx` | Zero results fallback | Standalone | Icon, message, optional action. |
| `CardReveal.tsx` | IO-based staggered entrance animation | Standalone | Do NOT nest inside FadeInSection. |
| `RevealImage.tsx` | Progressive blur-to-sharp image reveal | Standalone | Inside cards with images. |
| `BackToTop.tsx` | Floating scroll-to-top button | Standalone | Do NOT use with ScrollToTop. |
| `CategoryListCard.tsx` | Vertical list card with header | Card | Category browse sections. |
| `LoadMoreSentinel.tsx` | IO infinite scroll trigger | Standalone | Used with useProgressiveLoad. |
| `IndustryBadge.tsx` | Industry subcategory label | Standalone | Text-only eyebrow. |
| `CardMetaRow.tsx` | Inline meta row (A/B variants) | Standalone | Projection+region or region+date. |
| `CardFooterRow.tsx` | Date footer with Calendar icon | lucide-react Calendar | Bottom of cards. |
| `SurveyCard.tsx` | Survey card (grid + list) | Card, CompletionBadge | Like ReportCard pattern. |
| `CompletionBadge.tsx` | Survey lifecycle state badge | Badge | active/completed/upcoming. |
| `ResponseChart.tsx` | CSS-only bar/donut chart | Standalone | Survey response data. |
| `QuestionPreview.tsx` | Survey question type preview | Standalone | Multiple choice, rating, etc. |
| `SurveySkeleton.tsx` | Survey loading skeleton | Standalone | Survey-specific skeleton. |
| `FilterAccordion.tsx` | Collapsible filter group | FilterCheckbox, ChevronDown | Titled filter section. |
| `SidebarPanel.tsx` | Sidebar container shell | Standalone | Reusable sidebar wrapper. |
| `ActiveFilterChip.tsx` | Active filter chip bar + "Clear all" | FilterChip | Active filter display. |
| `MobileFilterSheet.tsx` | Full-screen mobile filter overlay | Standalone | Mobile filter UI. |

#### LEVEL 3: ORGANISMS

**Cross-Pillar (in `/components/organisms/`):**

| File | Purpose | Key Dependencies |
|---|---|---|
| `ProductHero.tsx` | Cross-pillar hero section (black bg) | SectionWrapper, SectionHeading |
| `FeaturedCarousel.tsx` | Featured content carousel | SectionWrapper, SectionHeading, HorizontalScroll |
| `StatsRow.tsx` | Row of stat cards | SectionWrapper, SectionHeading, StatCard |
| `BrowseGrid.tsx` | Card grid with ViewToggle | SectionWrapper, SectionHeading, ViewToggle |
| `CTABanner.tsx` | Conversion CTA section | SectionWrapper, Button |
| `ProductPageTemplate.tsx` | Declarative page template | All 5 above |

**Report Store (in `/components/organisms/`):**

| File | Purpose |
|---|---|
| `ReportStoreHero.tsx` | RS hero (search, categories) |
| `FeaturedResearch.tsx` | RS featured carousel |
| `ListingToolbar.tsx` | Sort, search, ViewToggle |
| `CardListing.tsx` | Paginated card grid |
| `FiltersPanel.tsx` | Filter accordion sidebar |
| `IndustrySidebar.tsx` | Industry filter sidebar |
| `IndustryFocusBanner.tsx` | Industry context header |
| `DailyDataHighlights.tsx` | 4 DataHighlightCards |
| `AnalystPicks.tsx` | 3 AnalystPickCardBs |
| `IndustrySectorsGrid.tsx` | 14 industries (7+7) |
| `KeyMarketIndicators.tsx` | StatsRow wrapper |
| `RecommendedForYou.tsx` | BrowseGrid wrapper |
| `CustomResearchCTA.tsx` | CTABanner wrapper |
| `TrendingTopics.tsx` | Trending topic pills |
| `TopDownloads.tsx` | Ranked download list |
| `RecentlyViewed.tsx` | Recently viewed carousel |
| `UpcomingReports.tsx` | Upcoming report pipeline |
| `ResearchMethodology.tsx` | 5-step methodology |
| `NewsletterSignup.tsx` | Email subscription |
| `IndustrySpotlight.tsx` | Featured industry deep-dive |
| `ComparisonTable.tsx` | Format comparison table |
| `ReportPreview.tsx` | Report detail view |
| `TestimonialsRS.tsx` | Testimonial quotes |
| `QuickAccessBar.tsx` | Horizontal action bar |

**Case Study (in root `/components/`):**
Same 10 organisms as before (HeroSection through FinalCTASection).

#### LEVEL 4: TEMPLATES

Currently NO template file exists on GitHub. The section ordering lives directly in App.tsx. Creating `CaseStudyTemplate.tsx` is a future improvement.

#### LEVEL 5: PAGES

| File | What | Push Notes |
|---|---|---|
| `App.tsx` (GitHub version) | Full case study page with react-router-dom | NEVER overwrite from Figma Make. Only edit on GitHub directly or via careful merge. |

#### UTILITIES (Hooks)

| File | Purpose | Used By | Push Notes |
|---|---|---|---|
| `useShimmer.ts` | Shimmer animation CSS generation | CTALink, InlineLink | NEVER DELETE. Actively used. |
| `useScrollAnimation.ts` | IntersectionObserver wrapper | ChallengesSection | Returns {ref, isVisible}. |
| `useScrollDirection.ts` | Detect scroll up/down | Navbar | Returns 'up' or 'down'. |
| `useActiveSection.ts` | Track which section is in view | TableOfContents | Returns active section ID. |
| `useReadingProgress.ts` | Page scroll percentage | ReadingProgressBar | Returns 0-100 number. |
| `useSectionProgress.ts` | Section-level scroll progress | (available) | Returns progress within a section. |
| `useHeroVisibility.ts` | Is hero section visible? | Navbar | Boolean for navbar state switching. |
| `useCounter.ts` | Animated number counting | ImpactSection metrics | Counts from 0 to target value. |
| `useMagneticEffect.ts` | Mouse-follow magnetic pull | (available) | For interactive hover effects. |
| `useResponsiveGutter.ts` | Pixel-based responsive spacing | ResourcesSection (Masonry) | Returns 24px (mobile) or 32px (desktop). |

#### DOCUMENTATION COMPONENTS (Not in Atomic hierarchy)

| File | What It Documents |
|---|---|
| `DesignSystemDashboard.tsx` | Main dashboard shell (7 tabs) |
| `DesignSystemSidebar.tsx` | Dashboard navigation sidebar |
| `FoundationsContent.tsx` | **Re-export hub** (~1KB) — forwards to 6 modular sub-files in `foundations/` |
| `foundations/FoundationsHelpers.tsx` | Shared `DocSection` component for all foundations sub-files |
| `foundations/ColorsContent.tsx` | Color palette docs, Element-Color Classification, Purple Boundaries, 10-section bg sequence (~35KB) |
| `foundations/TypographyContent.tsx` | Typography scale, font pairing, weight system, custom sizes (~23KB) |
| `foundations/SpacingContent.tsx` | Spacing scale, responsive padding, section spacing patterns (~8KB) |
| `foundations/LayoutGridContent.tsx` | Container widths, grid system, responsive breakpoints, Border Radius Decision Table (~25KB) |
| `foundations/ElevationBorderRadius.tsx` | Shadow scale, border-radius tokens (exports ElevationContent + BorderRadiusContent) (~17KB) |
| `ComponentsContent.tsx` | Button, Links, Badge, Form, Card, Nav, Feedback, Icons docs |
| `PatternsContent.tsx` | Page Layouts, Content Patterns, Backgrounds docs |
| `MotionContent.tsx` | Motion principles, Duration, Transitions, Micro-interactions |
| `GuidelinesContent.tsx` | Accessibility, Responsive, Best Practices |
| `ResourcesContent.tsx` | Downloads, Code Snippets, Design Tokens |
| `ButtonDocumentation.tsx` | Button component showcase |
| `LinksDocumentation.tsx` | Link system showcase |
| `BadgeLabelsDocumentation.tsx` | Badge system showcase |
| `BadgeShowcase.tsx` | Badge visual gallery |
| `LinkSystemDemo.tsx` | Interactive link demo |
| `ShimmerDemo.tsx` | Shimmer effect demo |
| `AnimatedArrowDemo.tsx` | Arrow animation demo |
| `AnimatedArrowQuickRef.tsx` | Arrow quick reference |
| `ButtonControlsGuide.tsx` | Button control patterns |
| `FigmaButtonComparison.tsx` | Figma vs code comparison |

---

## PUSH PROCEDURES BY LEVEL

### Pushing an ATOM (CSS Variable / Token)

**When:** You've added, changed, or removed a CSS variable in `theme.css`.

```
1. Edit src/styles/theme.css
2. Search ALL components for references to the new/changed variable name
3. Verify no component references an undefined variable
4. Update DESIGN_SYSTEM_AI_CONTEXT.md (Typography/Color/Spacing section)
5. Push theme.css + updated docs
6. Commit: "tokens: add --variable-name for [purpose]"
```

**Example:**
```
Added: --text-compact: 0.875rem
Used by: ChallengesSection (adaptive typography for 4+ cards)
Updated: DESIGN_SYSTEM_AI_CONTEXT.md -> Typography System section
Commit: "tokens: add --text-compact for dense card layouts"
```

### Pushing a MOLECULE (Simple Component)

**When:** You've created or updated a single-purpose component.

```
1. Verify the file has NO figma:asset imports
2. Verify all imported dependencies exist on GitHub
3. Verify all CSS variables used are defined in theme.css on GitHub
4. Add export to src/app/components/index.ts
5. Add 4W+H entry to COMPONENT_GUIDELINES_4WH.md
6. Update PROJECT_STRUCTURE.md file tree
7. Update GITHUB_REPO_MANIFEST.md
8. Push: component file + index.ts + updated docs
9. Commit: "feat(molecule): add ComponentName - [one-line purpose]"
```

### Pushing an ORGANISM (Complex Section)

**When:** You've created or updated a multi-molecule section component.

```
1. LIST all dependencies (molecules, hooks, CSS vars, images, SVGs)
2. For EACH dependency, verify it exists on GitHub
3. If any dependency uses figma:asset, resolve it first
4. If the organism introduces new CSS variables, push theme.css first
5. If the organism uses a new hook, push the hook first
6. Add export to src/app/components/index.ts
7. Add 4W+H entry to COMPONENT_GUIDELINES_4WH.md
8. Update PROJECT_STRUCTURE.md
9. Update GITHUB_REPO_MANIFEST.md
10. Push: ALL new files together (organism + its new dependencies)
11. Commit: "feat(organism): add SectionName - [one-line purpose]"
```

**Critical: Dependency Tree Example (ResourcesSection):**
```
ResourcesSection.tsx
  ├── ResourceCard.tsx          <- Must push
  ├── Container.tsx             <- Must push
  ├── SubtleVariantSwitcher.tsx <- Must push
  ├── useResponsiveGutter.ts   <- Must push
  ├── react-responsive-masonry  <- Must be in package.json
  ├── 8x figma:asset images    <- Must REPLACE with real URLs
  ├── --section-py-standard    <- Must be in theme.css
  ├── --section-header-mb      <- Must be in theme.css
  ├── --pair-label-heading     <- Must be in theme.css
  ├── --pair-heading-description <- Must be in theme.css
  ├── --text-measure           <- Must be in theme.css
  ├── --label-on-black         <- Must be in theme.css
  ├── --label-on-white         <- Must be in theme.css
  └── --bg-composition-warm-editorial <- Must be in theme.css
```

### Pushing a HOOK (Utility)

**When:** You've created or updated a custom React hook.

```
1. Verify the hook has no Figma Make-specific dependencies
2. Add export to src/app/hooks/index.ts
3. Update DESIGN_SYSTEM_AI_CONTEXT.md (if it's a core design system hook)
4. Update PROJECT_STRUCTURE.md
5. Push: hook file + hooks/index.ts
6. Commit: "feat(hook): add useHookName - [one-line purpose]"
```

### Pushing DOCUMENTATION (Showcase/Demo Components)

**When:** You've created or updated a documentation component.

```
1. These are lower priority but still need barrel exports
2. Add export to src/app/components/index.ts
3. Verify all example code in the docs references correct prop names
4. Push: doc component + index.ts
5. Commit: "docs: add ComponentNameDocumentation"
```

### Pushing a MARKDOWN Documentation File

**When:** You've created or updated an .md file.

```
1. Verify it doesn't contain Figma Make-specific paths
2. Verify all code examples use correct, current prop names
3. If it's a new .md file, add it to DESIGN_SYSTEM_MASTER_INDEX.md
4. Push the .md file
5. Commit: "docs: add/update FILE_NAME.md - [what changed]"
```

---

## DOCUMENTATION UPDATE MATRIX

When you push a file, which docs need updating?

| What You're Pushing | index.ts | hooks/index.ts | theme.css | COMPONENT_GUIDELINES_4WH.md | ai-context/COMPONENTS.md | PROJECT_STRUCTURE.md | GITHUB_REPO_MANIFEST.md |
|---|---|---|---|---|---|---|---|
| CSS Variable | - | - | EDIT | - | UPDATE if core token | UPDATE tree | UPDATE |
| Atom | ADD export | - | verify vars exist | ADD 4W+H entry | UPDATE atom list | UPDATE tree | UPDATE |
| Molecule | ADD to molecules/index.ts + components/index.ts | - | verify vars exist | ADD 4W+H entry (or RS/Filter 4WH) | UPDATE molecule list | UPDATE tree | UPDATE |
| Organism | ADD to organisms/index.ts + components/index.ts | - | verify/add vars | ADD 4W+H entry (or RS 4WH) | UPDATE organism list | UPDATE tree | UPDATE |
| Hook | - | ADD export | - | - | UPDATE if core hook | UPDATE tree | UPDATE |
| Doc Component | ADD export | - | - | - | - | UPDATE tree | UPDATE |
| Markdown Doc | - | - | - | - | - | - | UPDATE |

**Additional docs to update when relevant:**
- `REPORT_STORE_COMPONENTS_4WH.md` — for RS atoms/molecules/organisms
- `FILTER_SEARCH_SYSTEM_4WH.md` — for filter system components
- `DESIGN_SYSTEM_UPDATES.md` — changelog entry for significant changes

---

## THE figma:asset PROBLEM

### What Is It?

`figma:asset/` is a **virtual module scheme** that only works inside Figma Make. It resolves to raster images (PNG, JPG) that were imported from Figma frames. Example:

```tsx
// This ONLY works in Figma Make:
import img from "figma:asset/52dc2d242efb6fec4b3045208719c859f0824631.png";

// This will FAIL on GitHub because figma:asset/ is not a real file path.
```

### Which Files Currently Have This Problem?

| File | figma:asset Imports | Status |
|---|---|---|
| `ClientContextSection.tsx` | 1 (client logo) | Must replace before pushing |
| `ResourcesSection.tsx` | 8 (resource card images) | Must replace ALL before pushing |

### How to Fix Before Pushing

**Option A: Replace with Unsplash URLs (Recommended for placeholder images)**
```tsx
// BEFORE (Figma Make only):
import heroImg from "figma:asset/abc123.png";
<img src={heroImg} />

// AFTER (GitHub-safe):
const heroImg = "https://images.unsplash.com/photo-xxxx?w=800";
<img src={heroImg} />
```

**Option B: Replace with local files (Recommended for brand assets like logos)**
```tsx
// BEFORE (Figma Make only):
import logo from "figma:asset/abc123.png";

// AFTER (GitHub-safe):
// 1. Save the image to /public/images/client-logo.png
// 2. Reference it:
const logo = "/images/client-logo.png";
```

**Option C: Make images prop-driven (Best for reusable components)**
```tsx
// BEFORE: hardcoded figma:asset
import img from "figma:asset/abc123.png";

// AFTER: accept image as prop
interface ResourceCardProps {
  image?: string;  // URL or path
}
```

### SVG Imports (Different from figma:asset)

SVG path data files (`src/imports/svg-*.ts`) ARE real files and CAN be pushed — but you must push the SVG file alongside any component that imports it.

```tsx
// This IS pushable (it's a real file):
import svgPaths from "@/imports/svg-oz6ytj1r6m";

// But the svg-oz6ytj1r6m.ts file must ALSO be pushed to GitHub.
```

---

## BARREL EXPORT REGISTRATION

### Components: `src/app/components/index.ts`

When adding a new component, add its export in the correct section:

```tsx
// For a new Molecule:
// Add under the appropriate category comment
export { NewComponent } from './NewComponent';
export type { NewComponentProps } from './NewComponent';  // if types are exported

// For a new Organism (case study section):
// Add a new section:
// Case Study Section Components
export { HeroSection } from './HeroSection';
export { ClientContextSection } from './ClientContextSection';
// ... etc

// For a new Utility component:
// Add under "Utility Components"
export { NewUtility } from './NewUtility';
```

### Hooks: `src/app/hooks/index.ts`

```tsx
// Add under the appropriate category:
// Scroll & Navigation Hooks
export { useNewHook } from './useNewHook';

// OR under Utility Hooks
export { useNewUtility } from './useNewUtility';
```

### Currently Missing from Barrel Exports (To Be Added)

**Components index.ts — missing:**
```tsx
// Layout Components (add to existing section)
export { Container } from './Container';

// Resource System
export { ResourceCard } from './ResourceCard';
export { SubtleVariantSwitcher } from './SubtleVariantSwitcher';

// Case Study Section Components (NEW SECTION — add before "Utility Components")
export { HeroSection } from './HeroSection';
export { ClientContextSection } from './ClientContextSection';
export { ChallengesSection } from './ChallengesSection';
export { EngagementObjectivesSection } from './EngagementObjectivesSection';
export { MethodologySection } from './MethodologySection';
export { ImpactSection } from './ImpactSection';
export { ValuePillarsSection } from './ValuePillarsSection';
export { TestimonialSection } from './TestimonialSection';
export { ResourcesSection } from './ResourcesSection';
export { FinalCTASection } from './FinalCTASection';
export { NextSectionCTA } from './NextSectionCTA';
```

**Hooks index.ts — missing:**
```tsx
export { useResponsiveGutter } from './useResponsiveGutter';
```

---

## CSS VARIABLE REGISTRATION

### Where Variables Are Defined

ALL CSS variables live in `src/styles/theme.css` under `:root { }`.

### How to Add a New Variable

```css
/* 1. Find the correct section in theme.css */
/* Sections: Colors, Typography, Spacing, Layout, Elevation, Radius, Animation */

/* 2. Add with a comment explaining purpose */
--new-variable: value; /* Purpose: used by ComponentName for reason */

/* 3. Follow naming conventions: */
--text-*        /* Typography sizes */
--font-*        /* Font families */
--space-*       /* Spacing values */
--radius-*      /* Border radii */
--shadow-*      /* Box shadows */
--bg-*          /* Background colors/gradients */
--container-*   /* Layout max-widths */
--button-*      /* Button-specific tokens */
--section-*     /* Section-level layout tokens */
--pair-*        /* Spacing between paired elements (label+heading, heading+description) */
--label-on-*    /* Label colors on different backgrounds */
```

### Currently Defined Variables That Were Recently Added

These 8 variables were added to support ResourcesSection and need to be pushed:

```css
--section-py-standard: 5rem;           /* Section vertical padding (desktop only - needs responsive fix) */
--section-header-mb: 3rem;             /* Section header margin-bottom */
--pair-label-heading: 1.5rem;          /* Space between label and heading */
--pair-heading-description: 1rem;      /* Space between heading and description */
--text-measure: 65ch;                  /* Max line length for readability */
--label-on-black: rgba(255,255,255,0.4); /* Label text color on dark backgrounds */
--label-on-white: rgba(0,0,0,0.4);    /* Label text color on light backgrounds */
--bg-composition-warm-editorial: linear-gradient(...); /* Multi-layer warm gradient */
```

### Known Bug: Missing Variables

These variables are REFERENCED in code but NOT DEFINED in theme.css:

| Variable | Referenced In | Fix |
|---|---|---|
| `--text-primary` | ResourcesSection.tsx (line 315) | FIXED - Defined as `#000000` |
| `--text-secondary` | ResourcesSection.tsx (line 326) | FIXED - Defined as `rgba(0, 0, 0, 0.60)` |

---

## COMMIT MESSAGE FORMAT

### Structure
```
type(scope): short description

[optional body with details]
[optional footer with references]
```

### Types
```
feat     - New component, hook, or feature
fix      - Bug fix
tokens   - Design token changes (theme.css)
docs     - Documentation only
refactor - Code change that doesn't add features or fix bugs
chore    - Maintenance (cleanup, unused file removal)
style    - Visual-only changes (no logic change)
```

### Scopes (Atomic Design levels)
```
atom      - CSS variables, tokens
molecule  - Simple components (Button, Badge, etc.)
organism  - Complex sections (HeroSection, ResourcesSection, etc.)
template  - Page layouts
page      - Final pages
hook      - Custom hooks
barrel    - index.ts export changes
```

### Examples
```
feat(molecule): add Container layout wrapper with 5 width presets
feat(organism): add ResourcesSection with Masonry grid and 7 card variants
feat(hook): add useResponsiveGutter for pixel-based responsive spacing
tokens(atom): add --text-compact, --section-py-standard, 6 layout variables
fix(organism): ResourcesSection animatedArrow -> showArrow to match Button API
docs: update COMPONENT_GUIDELINES_4WH.md with ResourceCard 4W+H
chore(barrel): add case study sections to components/index.ts
chore: remove unused ButtonAnimationTest.tsx
```

### Multi-File Push Commit
When pushing multiple related files together:
```
feat(organism): add ResourcesSection system (5 files)

New files:
- ResourceCard.tsx (7-variant content card molecule)
- Container.tsx (semantic layout wrapper molecule)
- SubtleVariantSwitcher.tsx (designer tool molecule)
- useResponsiveGutter.ts (responsive spacing hook)
- ResourcesSection.tsx (Masonry-based content grid organism)

Updated files:
- theme.css (8 new CSS variables)
- components/index.ts (barrel exports)
- hooks/index.ts (barrel exports)
```

---

## KNOWN DIVERGENCES BETWEEN FIGMA MAKE AND GITHUB

### Intentional Divergences (Do Not "Fix")

| Area | Figma Make | GitHub | Why |
|---|---|---|---|
| `App.tsx` | Renders `<DesignSystemDashboard />` directly | Uses `react-router-dom` with route-based navigation (case study page as one route) | Different rendering contexts. Figma Make is for component development; GitHub is the production site. |
| `src/imports/` | 16 Figma frame `.tsx` files + SVG files | Only SVG path files that are actively imported by components | Figma frames are design-time artifacts. |
| `src/app/components/ui/` | 48 shadcn/ui primitive files | Not tracked | shadcn components are local-only in Figma Make. |
| Router package | `react-router` | `react-router-dom` | Figma Make environment constraint. |

### Intentional Code Exceptions (Documented, Not Bugs)

| File | Exception | Why It's Intentional |
|---|---|---|
| `AllTypographyTokensContent.tsx` | Hardcoded font-size values in demo code | Demo is SHOWING the token values, not using them |
| `ChallengesSection.tsx` | JS-based card width calc (`lg:w-[calc((1000px-72px)/4)]`) | CSS variables can't be used in Tailwind arbitrary value calculations at this complexity level |
| `ContactModal.tsx` | Fixed modal width instead of container token | Modal overlays are independent of page container system |
| `PatternsContent.tsx` | Demo code strings with hardcoded values | Showing example code, not executing design system rules |

### Bugs to Fix Before Next Push

| Bug | File | Severity | Status |
|---|---|---|---|
| `--text-primary` undefined | ResourcesSection.tsx:315 | HIGH | FIXED - Defined as `#000000` in theme.css |
| `--text-secondary` undefined | ResourcesSection.tsx:326 | HIGH | FIXED - Defined as `rgba(0, 0, 0, 0.60)` in theme.css |
| `--section-py-standard` not responsive | ResourcesSection.tsx | MEDIUM | FIXED - Mobile-first 3rem with @media breakpoints (4rem at 640px, 5rem at 768px) |
| Barrel exports missing | index.ts, hooks/index.ts | MEDIUM | FIXED - All case study sections, Container, ResourceCard, SubtleVariantSwitcher, useResponsiveGutter added |
| 8x `figma:asset/` imports | ResourcesSection.tsx | BLOCKER - prevents GitHub push | FIXED - Replaced with 8 Unsplash URLs |
| 1x `figma:asset/` import | ClientContextSection.tsx | BLOCKER - prevents GitHub push | FIXED - Logo made prop-driven with text fallback |
| SubtleVariantSwitcher inline SVG | SubtleVariantSwitcher.tsx | LOW | FIXED - Replaced with lucide-react Settings icon |
| 4W+H entries missing | COMPONENT_GUIDELINES_4WH.md | MEDIUM | FIXED - Added entries for Container, ResourceCard, SubtleVariantSwitcher, useResponsiveGutter |

---

## COMPLETE FILE REGISTRY

### Files That SHOULD Be on GitHub (Verified)

**Core Design System (Molecules):**
- [x] Button.tsx
- [x] Badge.tsx
- [x] Label.tsx
- [x] CTALink.tsx
- [x] InlineLink.tsx
- [x] AnimatedArrow.tsx

**Layout & Utility (Molecules):**
- [x] Container.tsx
- [x] Navbar.tsx
- [x] ContactModal.tsx
- [x] StickyCTA.tsx
- [x] ReadingProgressBar.tsx
- [x] TableOfContents.tsx
- [x] CodeBlockWithCopy.tsx
- [x] CollapsibleSection.tsx
- [x] VariantSwitcher.tsx
- [x] SpacingHelpers.tsx

**Resource System (Molecules):**
- [x] ResourceCard.tsx
- [x] SubtleVariantSwitcher.tsx

**Case Study Sections (Organisms):**
- [x] HeroSection.tsx
- [x] ClientContextSection.tsx
- [x] ChallengesSection.tsx
- [x] EngagementObjectivesSection.tsx
- [x] MethodologySection.tsx
- [x] ImpactSection.tsx
- [x] ValuePillarsSection.tsx
- [x] TestimonialSection.tsx
- [x] ResourcesSection.tsx
- [x] FinalCTASection.tsx
- [x] NextSectionCTA.tsx

**Dashboard System (Documentation):**
- [x] DesignSystemDashboard.tsx
- [x] DesignSystemSidebar.tsx
- [x] FoundationsContent.tsx (re-export hub, ~1KB)
- [x] foundations/FoundationsHelpers.tsx (SHA: b29d618)
- [x] foundations/ColorsContent.tsx (SHA: 0e524fb)
- [x] foundations/TypographyContent.tsx (SHA: 92077b4)
- [x] foundations/SpacingContent.tsx (SHA: b29d618)
- [x] foundations/LayoutGridContent.tsx (SHA: 63561f4)
- [x] foundations/ElevationBorderRadius.tsx (SHA: f24eb5d)
- [x] ComponentsContent.tsx
- [x] PatternsContent.tsx
- [x] MotionContent.tsx
- [x] GuidelinesContent.tsx
- [x] ResourcesContent.tsx
- [x] All 6 "All*Content.tsx" files
- [x] ButtonDocumentation.tsx
- [x] LinksDocumentation.tsx
- [x] BadgeLabelsDocumentation.tsx
- [x] BadgeShowcase.tsx
- [x] LinkSystemDemo.tsx
- [x] ShimmerDemo.tsx
- [x] AnimatedArrowDemo.tsx
- [x] AnimatedArrowQuickRef.tsx
- [x] ButtonControlsGuide.tsx
- [x] FigmaButtonComparison.tsx

**Hooks (Utilities):**
- [x] useShimmer.ts
- [x] useScrollAnimation.ts
- [x] useScrollDirection.ts
- [x] useActiveSection.ts
- [x] useReadingProgress.ts
- [x] useSectionProgress.ts
- [x] useHeroVisibility.ts
- [x] useCounter.ts
- [x] useMagneticEffect.ts
- [x] useResponsiveGutter.ts

**Barrel Exports:**
- [x] components/index.ts
- [x] hooks/index.ts

**Tokens:**
- [x] theme.css
- [x] fonts.css

**Can Be Cleaned Up (Optional):**
- [ ] ButtonAnimationTest.tsx *(unused, can delete)*
- [ ] ArrowAnimationTest.tsx *(test file, can delete after confirming arrow works)*
- [ ] test-link-system.tsx *(test file)*

---

## QUICK REFERENCE: PUSH DECISION FLOWCHART

```
START: I want to push a file to GitHub

Q1: Does it import from figma:asset/?
    YES -> STOP. Replace figma:asset imports first. See "The figma:asset Problem".
    NO  -> Continue

Q2: Does it import from src/imports/?
    YES -> Will you also push those import files?
           YES -> Continue
           NO  -> STOP. Push the import files first.
    NO  -> Continue

Q3: Does it import from src/app/components/ui/?
    YES -> Does that ui/ file exist on GitHub?
           YES -> Continue
           NO  -> STOP. Either push the ui/ file or remove the dependency.
    NO  -> Continue

Q4: Does it use CSS variables not yet in GitHub's theme.css?
    YES -> Push theme.css first with the new variables.
    NO  -> Continue

Q5: Does it import custom components/hooks not yet on GitHub?
    YES -> Push those dependencies first.
    NO  -> Continue

Q6: Have you added it to the barrel export (index.ts)?
    NO  -> Add it now.
    YES -> Continue

Q7: Have you updated documentation?
    NO  -> Update: COMPONENT_GUIDELINES_4WH.md, PROJECT_STRUCTURE.md, GITHUB_REPO_MANIFEST.md
    YES -> Continue

READY TO PUSH. Write your commit message and push.
```

---

## APPENDIX: DOCUMENTATION FILE PURPOSES

| File | What It's For | When to Update |
|---|---|---|
| `ai-context/CORE.md` | Primary AI reference — overview, checklist, common mistakes | When changing DS rules or adding components |
| `ai-context/COMPONENTS.md` | Button, Badge, Link, Filter, Molecules, Organisms docs | When adding/changing interactive components |
| `ai-context/LAYOUT.md` | Spacing, containers, SectionWrapper, page assembly | When changing layout patterns |
| `ai-context/TYPOGRAPHY.md` | Font scale, pairing, weights, custom sizes | When changing typography tokens |
| `ai-context/COLORS.md` | 92-5-3 hierarchy, color families, section recipes | When changing color tokens |
| `ai-context/PROMPTS.md` | Copy-paste AI prompts (12 prompts) | When adding new page types or patterns |
| `COMPONENT_GUIDELINES_4WH.md` | 4W+H for Case Study DS components | When adding case study components |
| `REPORT_STORE_COMPONENTS_4WH.md` | 4W+H for RS atoms/molecules/organisms | When adding RS components |
| `FILTER_SEARCH_SYSTEM_4WH.md` | 4W+H for filter system components | When adding filter components |
| `PROJECT_STRUCTURE.md` | File tree inventory | When adding any new file |
| `GITHUB_REPO_MANIFEST.md` | GitHub-specific file list with push status | Every push |
| `QUICK_START_PROMPT.md` | Shortened copy-paste prompt for fast sessions | When changing DS quick reference |
| `DESIGN_SYSTEM_UPDATES.md` | Changelog (v3.2 → v4.3) | Every significant push |

---

*Last updated: 2026-03-18 by AI Assistant*
*v2.0 — Updated atomic classification (Atom/Molecule/Organism), added molecules/ and organisms/ file registry, updated documentation matrix with ai-context/ modules and RS/Filter 4WH docs*