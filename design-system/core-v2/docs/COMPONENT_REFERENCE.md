# @kenresearch/design-system v2 · Component Reference

**Purpose:** Single AI lookup doc. Intent → component → import → key props → when-not-to-use.
**Status:** 2026-05-13 · 100% OG `Design_system_vs_26` coverage · ~168 components.
**Pair with:** [DESIGN.md](../../DESIGN.md) (brand vocab) · [ANTI_PATTERNS.md](../../ANTI_PATTERNS.md) (16 cats) · inline JSDoc 4WH in each `.tsx`.

## How to use this doc

1. **Find your intent** in section below (atoms/molecules/organisms/hooks/types).
2. **Read the "Use when" row** — confirms component fits.
3. **Copy import path** from "Import" column.
4. **Apply props** per "Key props" column.
5. **If unsure**, drill into source — JSDoc 4WH header has full WHY/WHAT/WHEN/WHEN-NOT/HOW.
6. **NEVER invent a component name not in this doc.** If gap exists, escalate.

---

## Decision tree · "What component do I need?"

```
Need a CTA?
├─ Primary conversion action (form submit · "Get Started") → Button variant="brand"
├─ Exploratory nav ("Learn more →") → CTALink
├─ Body-copy hyperlink (paragraph link) → InlineLink
├─ Nav/footer/breadcrumb link → TextLink
└─ Filter/category chip → FilterChip

Need a content surface?
├─ Bordered content block → Card
├─ Section wrapper w/ spacing + bg → SectionWrapper
├─ Section heading w/ eyebrow → SectionHeading
├─ Page-width constraint → Container
└─ Image w/ fallback → ImageWithFallback

Need a label/tag?
├─ Section eyebrow ("CASE STUDY") → SectionLabel (Badge wrapper)
├─ Status/category badge → Badge w/ theme
├─ Icon w/ background → IconBadge
└─ Active-filter chip → FilterChip

Need a layout section?
├─ Hero cinematic-dark (case-study) → HeroSection
├─ Hero pillar-page (Report Store/Surveys) → ProductHero
├─ Hero report PDP (4-tab cockpit) → (consumer organism · NOT DS)
├─ Stats grid → StatsRow
├─ Featured carousel → FeaturedCarousel
├─ Browse grid w/ ViewToggle → BrowseGrid
├─ Filterable listing → CardListing + FiltersPanel + ListingToolbar
├─ Final CTA → CTABanner OR FinalCTASection
├─ Methodology steps → MethodologySection
├─ Challenges narrative → ChallengesSection
├─ Impact metrics → ImpactSection
├─ Testimonial → TestimonialSection
├─ Value pillars → ValuePillarsSection
├─ Resources/downloads → ResourcesSection
└─ Engagement objectives → EngagementObjectivesSection

Need a card?
├─ Report card (grid OR list layout) → ReportCard
├─ Stat card → StatCard
├─ Data highlight → DataHighlightCard
├─ Analyst pick → AnalystPickCardB
├─ Industry sector tile → CategoryListCard
├─ Survey card → SurveyCard
├─ Resource download → ResourceCard
├─ Skeleton loading → SkeletonCard
└─ Empty state → EmptyState

Need a filter UI?
├─ Sidebar filters → FiltersPanel + IndustrySidebar
├─ Mobile filter drawer → MobileFilterSheet
├─ Filter accordion → FilterAccordion
├─ Filter checkbox + label → FilterCheckboxItem
├─ Filter search input → FilterSearchInput
└─ Active filter chip bar → ActiveFilterChip

Need a navbar?
├─ Pillar/product page → TopNavigation (composes PrimaryNav + SecondaryBar)
├─ Case-study (scroll-spy + auto-hide) → CaseStudyNavbar
└─ Mobile sheet → MobileControls

Need motion?
├─ Scroll-into-view fade → useScrollAnimation OR FadeInSection
├─ Active section tracker (anchor scroll-spy) → useActiveSection
├─ Scroll direction (up/down/idle) → useScrollDirection
├─ Hero visibility → useHeroVisibility
├─ Section progress 0-100 → useSectionProgress
├─ Total reading progress → useReadingProgress
├─ Counter animation → useAnimatedCounter OR useCounter
├─ Magnetic CTA → useMagneticEffect
├─ Crossfade content → useCrossfade
├─ Mount/unmount transition → useMountTransition
├─ Progressive load sentinel → useProgressiveLoad
└─ Reduced motion guard → Framer useReducedMotion (no DS hook · use directly)

Need a UI primitive (shadcn)?
├─ Modal/dialog → Dialog (or AlertDialog for destructive)
├─ Dropdown → DropdownMenu
├─ Popover → Popover (or HoverCard for hover-only)
├─ Tabs → Tabs
├─ Toast → Sonner
├─ Form → Form (react-hook-form + zod integration)
├─ Date picker → Calendar
├─ Side sheet → Sheet
├─ Drawer (bottom) → Drawer
└─ etc. (46 primitives total) → @kenresearch/design-system/ui
```

---

## Atoms (42 · `@kenresearch/design-system/atoms`)

### Interactive

| Component | Use when | Key props | When NOT |
|---|---|---|---|
| `Button` | Primary CTAs · form submit · conversion actions | `variant: 'primary'\|'brand'\|'secondary'\|'ghost'` · `size: 'xs'\|'sm'\|'md'\|'lg'\|'xl'` · `animatedArrow?` · `loading?` | Inline links · exploratory nav · decorative red |
| `CTALink` | Standalone "View All" · "Explore" · "See More" · text + animated arrow · **NO underline** · arrow is the affordance | `href?` (optional · falls back to button) · `variant: 'default'\|'brand'` · `onDark?` · `size: 'sm'\|'md'\|'lg'` | Paragraph cross-refs (use InlineLink) · primary CTAs (use Button) |
| `InlineLink` | Body-copy hyperlinks · inside `<p>...</p>` · **ALWAYS underlined** · discoverable inside text | `href?` · `onDark?` · `onClick?` | Standalone CTAs (use CTALink) · nav links · headings |
| `TextLink` | Nav/footer/breadcrumb links | `href` OR `onClick` · `size: 'sm'\|'md'` | Body-copy refs · primary CTAs |
| `FilterChip` | Active/category filter chip | `label` · `onRemove?` | Generic chips (use Badge) |

### Content surfaces

| Component | Use when | Key props |
|---|---|---|
| `Card` | Bordered content block | `variant: 'white'\|'warm'\|'outlined'` · `padding: 'none'\|'sm'\|'md'\|'lg'` · `onClick?` · `as: 'div'\|'article'\|'section'` |
| `SectionWrapper` | Section w/ spacing + bg alternation | `background: 'white'\|'warm'\|'black'\|'mesh'` · `spacing: 'sm'\|'md'\|'lg'\|'xl'\|'2xl'` · `maxWidth: 'page'\|'content'\|'narrow'\|'prose'\|'compact'` · `id?` |
| `SectionHeading` | h1/h2/h3 w/ eyebrow + subtitle | `level: 1\|2\|3` · `label?` · `title?` (or children) · `subtitle?` · `action?` · `labelPulse?` |
| `Container` | Width constraint wrapper | `maxWidth: 'page'\|'content'\|'narrow'\|'prose'\|'compact'` |
| `Tooltip` | Hover hint on icons/dense data | `content` · `side?` |
| `ImageWithFallback` | Image w/ fallback on error | `src` · `alt` · `fallbackSrc?` |
| `FadeInSection` | Section scroll-reveal | `direction: 'up'\|'none'` · `delay?` |

### Labels & badges

| Component | Use when | Key props |
|---|---|---|
| `Badge` | Status · category · step indicator | `theme: 11-themes` · `size: 'xs'\|'sm'\|'md'\|'lg'` · `variant: 'minimal'\|'rounded'\|'pill'` · `mode: 'light'\|'dark'` |
| `SectionLabel` | Section eyebrow ALL CAPS | (Badge wrapper) |
| `IconBadge` | Icon container w/ tint bg | `icon: LucideIcon` · `size: 'xs'\|'sm'\|'md'\|'lg'` |
| `Label` | Form labels | `htmlFor` · `required?` · `helperText?` |
| `StatusDot` | Online/offline indicator | `status` · `position?` |

### Filter atoms

| Component | Use when | Key props |
|---|---|---|
| `FilterCheckbox` | Standalone filter checkbox | standard checkbox + `label` |
| `FilterCheckboxItem` | Checkbox row w/ count | `label` · `count?` · `checked` · `onChange` |
| `FilterIndustryItem` | Industry-specific filter row | (specialized) |
| `FilterSearchInput` | Search input inside filter sidebar | `value` · `onChange` · `placeholder?` |
| `FilterSectionHeader` | Collapsible filter section header | `icon` · `label` · `activeCount?` · `isOpen` · `onToggle` |
| `CategoryListItem` | Industry/category row | `label` · `count` · `onClick?` |

### Motion atoms

| Component | Use when | Key props |
|---|---|---|
| `AnimatedArrow` | Bare animated arrow (NOT in Button) | `size?` · `color: 'white'\|'black'\|'brand'` · `isHovered?` |
| `AnimatedArrowQuickRef` | Doc-page only | — |
| `ScrollProgress` | Top progress bar | (auto) |
| `ScrollToTop` | Floating back-to-top | (auto) |

### Layout/utility atoms

| Component | Use when | Key props |
|---|---|---|
| `CollapsibleSection` | Collapsible content w/ chevron | `title` · `defaultOpen?` |
| `Divider` | Horizontal rule | `orientation?` · `variant?` |
| `ViewToggle` | Grid/list view toggle | `viewMode: 'grid'\|'list'` · `onViewModeChange` |
| `SubtleVariantSwitcher` | DS variant switcher (dev tool) | `variants` · `currentVariant` · `onVariantChange` |
| `NextSectionCTA` | "Continue reading →" inter-section CTA | `targetId` · `label?` |
| `ContactModal` | Contact form overlay | `isOpen` · `onClose` |
| `ResourceCard` | Resource download card · 7 layout styles | `variant: 'flat'\|'article'\|'minimal'\|...` |
| `SkipLink` | A11y skip-to-main link | `targetId?` · `label?` |

### Topnav atoms (sub-parts of TopNavigation organism · usually NOT consumed directly)

`Avatar` · `DropdownChevron` · `HamburgerIcon` · `LogoButton` · `MenuItem`

### Utility tables

| Export | Use when |
|---|---|
| `iconColors` | `{ content: '#806ce0', utility: '#737373' }` — use for Lucide icon `color` prop |
| `industryIconMap` · `getIndustryIcon(label)` | Industry label → LucideIcon · safe getter w/ Cpu fallback |
| `SpacingScaleVisualization` · `MarginPaddingGuide` etc. | Doc-page visualizers only |

---

## Molecules (26 · `@kenresearch/design-system/molecules`)

| Component | Use when | Key props |
|---|---|---|
| `ReportCard` | Report tile in grid/list | `id` · `image` · `title` · `industry` · `subcat` · `projection` · `region` · `date` · `layout: 'grid'\|'list'` · `description?` |
| `ReportGridCard` | Grid-only variant (deprecated · use ReportCard layout="grid") | — |
| `StatCard` | Single stat tile | `category` · `value` · `label` · `description?` · `growth?` · `icon?` |
| `DataHighlightCard` | Daily data point tile | `value` · `title` · `source` · `growth` · `time` |
| `AnalystPickCardB` | Analyst-picked report card w/ quote | `id` · `image` · `title` · `industry` · `region` · `date` · `quote` · `analystName` · `analystRole` · `analystInitials` |
| `CategoryListCard` | Industry category tile | (specialized) |
| `ResponseChart` | Survey response visualization | (specialized) |
| `SurveyCard` · `SurveySkeleton` · `QuestionPreview` | Survey-pillar molecules | (specialized) |
| `IndustryBadge` | Industry label pill | `industry` · `count?` |
| `CardMetaRow` · `CardFooterRow` | Report card sub-rows | (composition) |
| `CardReveal` · `RevealImage` | Image reveal on scroll | `src` · `alt` |
| `CompletionBadge` | "Completed" indicator | (status display) |
| `EmptyState` | "No results" placeholder | `title` · `description?` · `action?` |
| `SkeletonCard` | Loading skeleton | `variant: 'grid'\|'list'` |
| `BackToTop` | Floating back-to-top button | (auto) |
| `HorizontalScroll` · `ScrollFade` | Horizontal scroll containers | `children` |
| `ActiveFilterChip` · `FilterAccordion` · `MobileFilterSheet` · `SidebarPanel` | Filter UI building blocks | (specialized) |
| `LoadMoreSentinel` | IntersectionObserver sentinel for infinite scroll | (auto) |

---

## Organisms (43 · `@kenresearch/design-system/organisms`)

### Cross-pillar (6)

| Component | Use when | Key props |
|---|---|---|
| `ProductHero` | Pillar landing hero | `label` · `title` · `subtitle` · `searchPlaceholder?` · `badges?` |
| `FeaturedCarousel` | Featured items row | `label` · `title` · `subtitle?` · `ctaText?` · `children` |
| `StatsRow` | Stats grid | `stats: StatData[]` · `columns: 2\|3\|4` · `label` · `title` · `subtitle?` |
| `BrowseGrid<T>` | Generic browse w/ ViewToggle | `items: T[]` · `renderCard` · `viewMode` · `onViewModeChange` · `loading` |
| `CTABanner` | Bottom conversion CTA | `label` · `title` · `subtitle?` · `primaryText` · `primaryShowArrow?` · `secondaryText?` |
| `ProductPageTemplate` | Declarative full-page assembly | `config` |

### Case-study sections (13 · promoted Phase 2)

| Component | Use when | Key props |
|---|---|---|
| `HeroSection` | Case-study cinematic-dark hero | (no props · self-contained content) |
| `ChallengesSection` | Horizontal-scroll challenges | `challenges: Challenge[]` |
| `ClientContextSection` | Client + scope context | (static · self-contained) |
| `EngagementObjectivesSection` | Engagement objectives display | (static) |
| `MethodologySection` | Vertical timeline of steps | `steps: MethodologyStep[]` |
| `ImpactSection` | Impact metrics + outcomes | (static or props) |
| `TestimonialSection` | Client quote w/ stars | (static or props) |
| `ValuePillarsSection` | Value pillars grid | (static) |
| `ResourcesSection` | Masonry grid of resource cards | `enableVariantSwitcher?` · `cardStyle?` · `onCtaClick?` · `ctaLabel?` |
| `FinalCTASection` | Final CTA w/ magnetic interaction | (uses ContactModal) |
| `CaseStudyNavbar` | Case-study scroll-spy navbar | (uses useActiveSection w/ standard IDs) |
| `ReadingProgressBar` | Top reading-progress segmented bar | (uses useSectionProgress) |
| `StickyCTA` | Sticky-CTA on scroll past hero | (uses useHeroVisibility) |

### Report Store organisms (15 · adapter-pattern Phase 3)

All take data via PROPS · consumer owns mock data.

| Component | Use when | Required prop | Key optional props |
|---|---|---|---|
| `ReportStoreHero` | Top hero | (none) | `label?` · `title?` · `subtitle?` · `searchPlaceholder?` · `badges?` |
| `FeaturedResearch` | Section 2 carousel | `reports: ReportItem[]` | `label?` · `title?` · `subtitle?` · `ctaText?` |
| `KeyMarketIndicators` | Section 3 stats | `stats: StatData[]` | `label?` · `title?` · `subtitle?` · `columns?` |
| `RecommendedForYou` | Section 4 browse grid | `reports: ReportItem[]` | `label?` · `title?` · `subtitle?` |
| `DailyDataHighlights` | Section 5 data tiles | `highlights: DataHighlight[]` | `label?` · `title?` · `subtitle?` · `seeAllHref?` |
| `AnalystPicks` | Section 6 analyst cards | `picks: AnalystPick[]` | `label?` · `title?` · `subtitle?` |
| `IndustrySectorsGrid` | Section 8 industry tiles | `industries: IndustryData[]` | `label?` · `title?` · `subtitle?` · `onSectorClick?` |
| `IndustrySpotlight` | Industry deep-dive | `report: ReportItem` | `label?` · `title?` · `subtitle?` · `stats?` · `reportDescription?` |
| `CustomResearchCTA` | Custom research CTA | (none) | `label?` · `title?` · `subtitle?` · `primaryText?` · `secondaryText?` · `onPrimaryClick?` |
| `CardListing` | Listing main grid | `items` · `paginated` · `viewMode` · `loading` · `currentPage` · `totalPages` · `onPageChange` | `pageSize?` · `onClearFilters?` |
| `ListingToolbar` | Listing toolbar | `resultCount` · `viewMode` · `onViewModeChange` · `sortBy` · `onSortChange` | `sortOptions?` · `activeFilterCount?` · `onOpenMobileFilters?` · `onBack?` · `selectedIndustry?` |
| `FiltersPanel` | Sidebar filters body | `filters: ReportFilters` · `regions: RegionData[]` · `publishYears: string[]` | — |
| `IndustrySidebar` | Full sidebar w/ filters | `filters: ReportFilters` · `regions: RegionData[]` · `publishYears: string[]` · `catalogTotal: number` | — |
| `ReportPreview` | Report detail preview | `report: ReportItem` | `toc?` |
| `RecentlyViewed` | Recently viewed strip | `reports: ReportItem[]` | `label?` · `title?` · `subtitle?` · `historyHref?` |

### Listing/discovery (9)

| Component | Use when |
|---|---|
| `IndustryFocusBanner` | Industry spotlight banner |
| `NewsletterSignup` | Email capture organism |
| `ComparisonTable` | Multi-report comparison |
| `ResearchMethodology` | Methodology disclosure block |
| `TestimonialsRS` | Report Store testimonial row |
| `QuickAccessBar` | Quick-access shortcut bar |
| `TopDownloads` · `TrendingTopics` · `UpcomingReports` | Listing/discovery organisms |

### Navbar composition (8)

| Component | Use when |
|---|---|
| `TopNavigation` | Top-level product/pillar navbar (composes below) |
| `PrimaryNav` · `SecondaryBar` · `DesktopNavItems` · `MobileControls` · `TabletControls` · `AuthPopover` | Sub-parts of TopNavigation |

---

## Hooks (23 · `@kenresearch/design-system/hooks`)

### Scroll & visibility

| Hook | Returns | Use when |
|---|---|---|
| `useActiveSection(sectionIds?)` | active section ID string | Scroll-spy nav · anchor highlight |
| `useScrollDirection()` | `'up'\|'down'\|'idle'` | Auto-hide nav · sticky reveal |
| `useHeroVisibility(selector?)` | boolean | Sticky CTA reveal post-hero |
| `useSectionProgress(startId, endId)` | 0-100 | Per-section progress bar |
| `useReadingProgress()` | 0-100 | Total-doc reading bar |
| `useScrollAnimation<T>(opts?)` | `{ ref, isVisible }` | IntersectionObserver scroll trigger |
| `useResponsiveGutter()` | 24 (mobile) or 32 (desktop) | Masonry/grid pixel gutter |

### Motion

| Hook | Returns | Use when |
|---|---|---|
| `useAnimatedCounter` | Framer motion value | Animated number counter (Framer-based) |
| `useCounter({end, duration?, startOnView?})` | `{ count, startCounting }` | rAF-driven counter w/ easing |
| `useMagneticEffect({strength?, disabled?})` | `{ ref, position }` | Cursor-magnetic CTA |
| `useCrossfade(halfDuration?)` | `{ opacity, isFading, triggerCrossfade }` | View-mode crossfade |
| `useMountTransition(isOpen, duration?)` | `{ shouldRender, isTransitioning }` | Overlay mount/unmount |
| `useShimmer()` | shimmer state | Hover shimmer effect |

### Loading / data

| Hook | Returns | Use when |
|---|---|---|
| `useProgressiveLoad(totalItems, batchSize?, rootMargin?)` | `{ sentinelRef, visibleCount, hasMore, reset }` | Infinite scroll sentinel |
| `useDebounce(value, delay)` | debounced value | Search input · resize handlers |

### UI primitives

| Hook | Returns | Use when |
|---|---|---|
| `useFocusTrap(ref, isActive)` | (void) | Modal · drawer focus trap |
| `useKeyboardNavigation(opts)` | (void) | Arrow-key nav in lists |
| `useNavDropdown` · `useMobileMenu` · `useAuthPopover` | popover state | TopNavigation sub-state |
| `useVariant()` | `{ variant, setVariant }` | Editorial/cinematic variant management |

---

## Types (13 · `@kenresearch/design-system/types`)

```ts
import type {
  ReportItem,          // Report data shape
  IndustryData,        // Industry { label, count, subs }
  RegionData,          // Region { label, count }
  SectorItem,          // Sector { name, count }
  StatData,            // Stat { category, value, label, description, growth, metric }
  DataHighlight,       // { value, title, source, growth, time }
  AnalystPick,         // Analyst pick (extends ReportItem + quote/analyst fields)
  SortKey,             // 'date' | 'title' | 'industry'
  SortOption,          // { label, value: SortKey }
  ActiveChip,          // { label, category?, onRemove }
  ReportFilters,       // Full filter state shape (consumer owns hook · DS owns shape)
  CTAConfig,           // CTA banner config
  HeroConfig,          // Hero config
} from '@kenresearch/design-system/types';
```

---

## Adapter pattern (Phase 3 organisms · 2026-05-13)

Data-coupled organisms take data via PROPS. Consumer owns mock data. DS owns rendering + types.

```tsx
// Consumer-side wiring:
import { AnalystPicks, FiltersPanel, IndustrySidebar } from '@kenresearch/design-system/organisms';
import { ANALYST_PICKS, FULL_REGIONS, PUBLISH_YEARS, TOTAL_REPORTS } from '@/app/components/data';
import { useReportFilters } from '@/app/hooks/useReportFilters';

const filters = useReportFilters();

<AnalystPicks picks={ANALYST_PICKS} />
<FiltersPanel filters={filters} regions={FULL_REGIONS} publishYears={PUBLISH_YEARS} />
<IndustrySidebar
  filters={filters}
  regions={FULL_REGIONS}
  publishYears={PUBLISH_YEARS}
  catalogTotal={TOTAL_REPORTS}
/>
```

**Why:** Data shape stays in consumer · DS components remain pure renderers · types are the contract.

---

## Patterns (4 · `@kenresearch/design-system/patterns`)

| Component | Use when |
|---|---|
| `DarkGradientMesh` | Cinematic-dark hero/resources gradient overlay |
| `SectionBg` | Section background w/ variant + pattern |
| `CarouselFadeMask` | Carousel edge fade mask |
| `NavbarGlassHover` | Navbar item glass hover state |

---

## Charts (1 theme + 5 presets · `@kenresearch/design-system/charts`)

```tsx
import { kenHighchartsTheme, areaPreset, linePreset, piePreset, barPreset, columnPreset } from '@kenresearch/design-system/charts';
```

---

## Shadcn UI primitives (46 · `@kenresearch/design-system/ui`)

Standard shadcn/ui · imported as-is. Common ones:

```tsx
import { Dialog, DialogContent, DialogTitle } from '@kenresearch/design-system/ui';
import { Popover, PopoverContent, PopoverTrigger } from '@kenresearch/design-system/ui';
import { Sheet, SheetContent } from '@kenresearch/design-system/ui';
import { Drawer, DrawerContent } from '@kenresearch/design-system/ui';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@kenresearch/design-system/ui';
// ...etc · 46 total
```

Full list: `accordion · alert · alert-dialog · aspect-ratio · avatar · badge · breadcrumb · button · calendar · card · carousel · chart · checkbox · collapsible · command · context-menu · dialog · drawer · dropdown-menu · form · hover-card · input · input-otp · label · menubar · navigation-menu · pagination · popover · progress · radio-group · resizable · scroll-area · select · separator · sheet · sidebar · skeleton · slider · sonner · switch · table · tabs · textarea · toggle · toggle-group · tooltip`.

---

## Anti-patterns (cross-reference)

Always check before shipping:
- [ANTI_PATTERNS.md](../../ANTI_PATTERNS.md) — 14 categories of "never do this"
- aura-craft hard-bans 1-16 — 5 base + 7 craft + 4 a11y (in [skills/aura-craft/SKILL.md](../../../skills/aura-craft/SKILL.md))

---

## Decision tables (Sprint 1 P0-8 · 2026-05-14)

### Badge theme selection

Pick `theme` prop by content semantics · NOT by aesthetic.

| Context | theme | Why |
|---|---|---|
| Section eyebrow (above SectionHeading) | `neutral` | warm-100 bg · subtle · doesn't compete w/ headline |
| Category tag (Logistics · Cold Chain) | `neutral` or `warm` | neutral default · warm if multiple chips need differentiation |
| Step indicator (Phase Alpha · Phase Beta) | `warm` + bordered | warm-50 bg w/ warm-500 border · process signal |
| Status: Open / Active / Live | `success` | green tint · semantic |
| Status: Pending / Waiting | `warning` | amber tint · semantic |
| Status: Closed / Failed / Error | `error` | semantic-red (NOT brand-red) · WCAG-AA on white |
| Status: Info / Note | `info` | blue tint · semantic |
| Premium tier / VIP marker | `purple` | purple-50 bg · accent · sparingly |
| Region tag (Australia · GCC) | `info` | blue-tinted geographic context |
| Date / Quarter (Q1 2026) | `muted` | black-50 bg · low-emphasis meta |
| Brand CTA-tier alert (max 1-2 per screen) | `brand` | red bg · CTA-only color · WCAG passes white text |
| Coral accent (rare design moment) | `coral` | warm orange · use 1× per page max |
| Periwinkle accent (rare design moment) | `periwinkle` | purple-blue · use 1× per page max |

❌ NEVER: `theme="brand"` for >2 badges per screen (overloads CTA color) · `theme="error"` w/ brand-red (semantic-red is `#dc2626` not `#b01f24`) · `theme="purple"` for primary nav (purple = data signal not nav).

### Button size selection

Pick `size` by context AND touch-target requirement.

| Context | size | Height | WHY |
|---|---|---|---|
| Card footer action (View · More) | `xs` | 28px | Compact context · external touch area available · WCAG 2.5.5 exempt for inline card actions |
| Navbar CTA · compact density | `sm` | 40px | Nav vertical budget tight · meets WCAG 2.5.5 floor (44px ideal · 40 acceptable for nav) |
| **DEFAULT** · most CTAs | `md` | 48px | Hero · inline · form submit · standout · meets WCAG comfortable target |
| Hero standalone · pricing tier CTA | `lg` | 56px | Visual weight · earns the size by importance |
| Landing hero · editorial display | `xl` | 64px | Maximum impact · use 1-2× per landing · NEVER inside dense layouts |

❌ NEVER: `size="xs"` outside card footer · inline-tabular · table-row action contexts (touch-target violation) · `size="xl"` more than 1-2 per screen (decision fatigue).

### Card density · padding rule

Pick `padding` by content density · NOT by aesthetic preference.

| Content density | padding | Why |
|---|---|---|
| 4+ cards per row · grid layouts | `sm` (16px) + `text-base` body | Visual breathing room from grid · don't double-pad |
| 2-3 cards per row · feature grids | `md` (24px) + `text-lg` body | DEFAULT · most common · earns interior real estate |
| Single feature card · spotlight | `lg` (32px) + `text-xl` body | Landing · pricing · standout · matches scale of element |
| Nested in another card / tight cluster | `none` | Avoid double-padding · parent owns padding |

❌ NEVER: `padding="lg"` for grid cards (looks bloated · breaks rhythm) · `padding="sm"` for spotlight cards (looks anemic).

### Section bg alternation (page-level)

Editorial-light variant default alternation pattern:

| Section position | bg | Why |
|---|---|---|
| Hero | `bg-warm` (`#f5f2f1`) | Warm welcome · earns special treatment |
| §1 (after hero) | `bg-white` | Clean break · content-first |
| §2 | `bg-warm` | Visual rhythm |
| §3 | `bg-white` | Continue alternation |
| §4 | `bg-warm` | |
| §5 | `bg-white` | |
| ... | alternate strictly | NO exceptions in middle of page |
| FinalCTA | `bg-black` cinematic | End-of-page reversal · earns cinematic |
| Footer | `bg-grey-800` (#141016) | Footer always dark · 100% pages |

❌ NEVER: 2 consecutive `bg-warm` or `bg-white` sections (breaks rhythm) · `bg-black` middle-of-page (only FinalCTA earns it) · custom bg colors mid-page.

### When to compose vs when to add new atom

| Need | Action |
|---|---|
| Existing atom + minor variant of existing prop | Use atom · pass prop |
| Existing atom + new visual treatment | Compose atom + atom (e.g. Badge w/ icon prop) |
| Existing atom + completely new behavior | Build NEW MOLECULE composing atoms · don't bloat atom |
| 3+ consumer sections repeat same composition | Promote composition to MOLECULE in DS |
| 5+ consumer pages repeat same section | Promote section to ORGANISM in DS |
| 2+ pages use same recipe | Promote recipe to TEMPLATE doc (not code) |

❌ NEVER: re-implement existing atom inline (`<button>` raw) · add 5th variant to atom when behavior differs (build new molecule) · skip molecule layer and put everything in organism.

### When `prefers-reduced-motion` MUST be honored

| Element | Action |
|---|---|
| Hover · click · focus ring | Always · animation must collapse to instant state change |
| Entrance scroll-into-view | Always · use `useReducedMotion()` Framer hook · render at end state |
| Card hover lift | Always · skip lift · keep static shadow |
| Button shimmer | Always · disable shimmer · solid bg |
| Modal open / drawer slide | Always · use fade-only (no transform) |
| Background gradient animation | Always · use static gradient |
| Auto-rotating carousel | Always · pause auto-rotate · require user input |

❌ NEVER: ignore `prefers-reduced-motion` · assume motion is always desired · animate on first paint w/o user trigger.

---

## Cross-references

- Brand vocab + craft principles: [DESIGN.md](../../DESIGN.md)
- Anti-patterns: [ANTI_PATTERNS.md](../../ANTI_PATTERNS.md)
- **Pre-flight checklist: [CORE.md](./CORE.md)** ← read first
- **Copy-paste playbook: [QUICK_START.md](./QUICK_START.md)** ← paste into any AI session
- Adapter pattern memory: `~/.claude/.../memory/feedback_ds_port_workflow.md`
- A11y patterns memory: `~/.claude/.../memory/feedback_a11y_patterns.md`
- AURA master rules: `~/.claude/.../memory/feedback_aura_master_rules.md`
- Port workflow: [skills/aura-craft/reference/DS_PORT_WORKFLOW.md](../../../skills/aura-craft/reference/DS_PORT_WORKFLOW.md)
