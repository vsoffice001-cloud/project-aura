# Design System — Component Systems

**Module:** `ai-context/COMPONENTS.md`  
**Version:** 4.3  
**Date:** 2026-03-18  
**Source of truth:** `/src/app/components/`  
**Detailed 4W+H:** `COMPONENT_GUIDELINES_4WH.md`, `REPORT_STORE_COMPONENTS_4WH.md`

---

## Button System

### Variants

```tsx
variant="primary"   // Black - Main actions
variant="brand"     // Red (#b01f24) - CTAs ONLY
variant="secondary" // Two-state (neutral rest → brand-red hover)
variant="ghost"     // Transparent - Tertiary on dark backgrounds
```

### Sizes

| Size | Height | Font | Use For |
|------|--------|------|---------|
| `xs` | 28px | 12px | Card footer CTAs only |
| `sm` | 36px | 14px | Navbar CTA |
| `md` | 42px | 16px | **DEFAULT** — 90% of buttons |
| `lg` | 48px | 18px | Homepage hero only |
| `xl` | 56px | 20px | Rare, maximum impact |

### Secondary Button Two-State (v3.3)

| Property | Resting | Hover |
|----------|---------|-------|
| Border | `rgba(0,0,0,0.12)` neutral | `#b01f24` brand red |
| Text | `rgba(0,0,0,0.7)` neutral | `#b01f24` brand red |
| Shimmer | White sweep `rgba(255,255,255,0.8)` | Red-tinted `rgba(176,31,36,0.08)` |
| Shadow | `0 2px 8px rgba(0,0,0,0.04)` | `0 4px 16px rgba(176,31,36,0.12)` |
| Arrow | `rgba(0,0,0,0.7)` | `var(--brand-red)` |
| Transition | — | `300ms ease-out` |

**Dark mode secondary:** Unchanged — `bg-white/10`, white text, white border.

### Additional Props (v4.0)

```tsx
iconOnly={boolean}   // Square button with icon only (needs ariaLabel)
background="brand"   // Brand gradient background
```

### Usage

```tsx
import { Button } from '@/app/components/Button';

// Standard CTA (most common)
<Button variant="brand">Get Started</Button>

// Urgency CTA with animated arrow
<Button variant="brand" showArrow>Schedule Demo</Button>

// Hero CTA (big pages only)
<Button variant="brand" size="lg" showArrow>Transform Business</Button>

// Navbar (compact)
<Button variant="brand" size="sm">Sign Up</Button>

// Secondary (two-state: neutral at rest, brand-red on hover)
<Button variant="secondary">Learn More</Button>
<Button variant="secondary" showArrow>Explore Features</Button>

// Card footer CTA (compact)
<Button variant="secondary" size="xs">View Report</Button>
```

---

## Link System

Three components for different contexts:

| Component | When | Example |
|-----------|------|---------|
| `Button` | Primary actions, form submits, conversions | `<Button variant="brand">Sign Up</Button>` |
| `CTALink` | Text + arrow, exploratory navigation | `<CTALink href="#method">See How</CTALink>` |
| `InlineLink` | Within paragraph text | `our <InlineLink href="#study">case study</InlineLink>` |

### Decision Flowchart

```
Is it a primary action (form submit, main CTA)?
 → YES: <Button>
 → NO: Is it text + arrow CTA ("Learn More ->")?
        → YES: <CTALink>
        → NO: Is it within paragraph text?
               → YES: <InlineLink>
               → NO: <CTALink> or <Button>
```

### WHEN NOT
- Don't use `Button` for exploratory links (use `CTALink`)
- Don't use `CTALink` for primary conversions (use `Button`)
- Don't use `InlineLink` standalone (use `CTALink`)

---

## Animation System

### Shimmer Animation
**What:** Always-active sweep on ALL buttons. 700ms duration, gradient left-to-right.  
**Rule:** NEVER disable shimmer — it's core brand identity.

### Arrow Animation
**What:** `showArrow={true}` adds animated ArrowUpRight (45 degree diagonal).  
**Rule:** ONLY for buttons redirecting to forms/pages with urgency.  
**Examples:** "Unlock Full Report", "Schedule Demo", "Get Started"  
**NEVER:** "Learn More", "View Details", "Cancel", "Back"  
**NEVER:** Use ArrowRight or ChevronRight — always ArrowUpRight.

---

## Badge System (v3.3.2 — CSS Custom Property Driven)

### Architecture

```
Badge.tsx (JS)                    theme.css (CSS)
──────────────────────────────    ──────────────────────────────
THEME_COLORS[theme][mode]         .badge { color: var(--badge-text) }
  ↓ sets inline CSS vars           .badge:hover {
style={{                            background: var(--badge-hover-bg)
  '--badge-text': ...,            }
  '--badge-bg': ...,              .badge-shimmer { uses --badge-shimmer }
  '--badge-border': ...,
}}
```

JS selects theme colors → sets as CSS custom properties → CSS rules consume them.

### Props

```tsx
<Badge
  variant="minimal | rounded | pill"     // Shape (default: minimal)
  size="xs | sm | md | lg"               // Size (default: sm)
  theme="neutral | warm | brand | coral | purple | periwinkle |
         success | warning | error | info | muted"  // 11 themes
  mode="light | dark"                    // Background context
  bordered={boolean}                     // Show border
  shimmer={boolean}                      // Shimmer animation
  interactive={boolean}                  // Hover states
  fontWeight={400 | 500 | 600}           // Weight override
  uppercase={boolean}                    // Force uppercase (default: true)
>
  BADGE TEXT
</Badge>
```

### Convenience Wrappers (10)

```tsx
import {
  Badge, SectionLabel, StepPill, ObjectivePill, ObjectivePillInteractive,
  InfoCardLabel, CategoryBadge, StatusBadge, InfoBadge, MutedBadge, ClickableBadge,
} from '@/app/components/Badge';

// Section label above headings
<SectionLabel theme="brand" fontWeight={600}>KEY INSIGHTS</SectionLabel>

// Step pill in methodology
<StepPill stepNumber={1} />

// Status indicator
<StatusBadge status="success">COMPLETE</StatusBadge>

// Chapter label
<Badge variant="minimal" size="sm" theme="brand" fontWeight={600}>CHAPTER 1</Badge>

// Clickable badge
<ClickableBadge onClick={fn} theme="purple">Filter</ClickableBadge>
```

### Badge Theme Selection

| Context | Theme | Example |
|---------|-------|---------|
| Section headers | `neutral` or `brand` | `<SectionLabel>CHALLENGES</SectionLabel>` |
| Methodology steps | `warm` | `<StepPill stepNumber={1} />` |
| Success state | `success` | `<StatusBadge status="success">Done</StatusBadge>` |
| Warning state | `warning` | `<StatusBadge status="warning">Pending</StatusBadge>` |
| Premium features | `purple` | `<CategoryBadge theme="purple">Pro</CategoryBadge>` |
| Trust indicators | `periwinkle` | `<CategoryBadge theme="periwinkle">Verified</CategoryBadge>` |
| Energy/warmth | `coral` | `<CategoryBadge theme="coral">Hot</CategoryBadge>` |
| De-emphasized | `muted` | `<MutedBadge>Deprecated</MutedBadge>` |

**Full docs:** `BADGES_DOCUMENTATION.md` (v3.0)

---

## Form Labels

```tsx
import { Label } from '@/app/components/Label';

// Semantic <label> for forms (NOT for section headers)
<Label htmlFor="email" required>Email Address</Label>
<input id="email" type="email" />

// Variants: default | secondary | required
// Props: htmlFor, variant, required, helperText, className
```

---

## Layout Atoms (v4.0)

### SectionHeading (v4.0 — Prop-Based API)

```tsx
import { SectionHeading } from '@/app/components/SectionHeading';

<SectionHeading
  level={2}                           // 1 = h1 (hero only), 2 = h2 (default), 3 = h3
  title="Market Analysis"            // Required — rendered as Serif heading
  subtitle="Deep dive into trends"   // Optional — body text below heading
  label="RESEARCH"                   // Optional — eyebrow SectionLabel above heading
  action={{ text: "View All", href: "/reports" }}  // Optional — CTALink at right
  spacing="default | compact"        // default = mb-10, compact = mb-8
  align="left | center"              // default = left
  maxWidth="xl | lg | none"          // subtitle width constraint
  endSlot={<ViewToggle />}           // Optional — right-aligned slot (e.g., ViewToggle)
  labelEndSlot={<Badge>NEW</Badge>}  // Optional — slot next to label
  labelPulse={boolean}               // Optional — pulse dot on label
/>
```

**WHEN:** Every page section that has a heading. Replaces hand-coded h2 + label combos.  
**WHEN NOT:** Hero h1 in case study pages (those are custom layouts).

**CRITICAL — OLD vs NEW API:**
```tsx
// OLD (v3.4) — DO NOT USE:
<SectionHeading level={2} eyebrow="X">Title</SectionHeading>

// NEW (v4.0) — ALWAYS USE:
<SectionHeading level={2} label="X" title="Title" />
```

### SectionWrapper

```tsx
import { SectionWrapper } from '@/app/components/SectionWrapper';

<SectionWrapper
  background="white | warm | black | neutral50"  // Section background
  spacing="sm | md | lg | xl"                     // Vertical padding tier (default: lg)
  maxWidth="content | wide | full"                // Width constraint (default: wide = 1200px)
  className=""                                    // Additional classes on <section>
  id="highlights"                                 // Anchor linking
>
  {/* Content gets responsive px-4 sm:px-6 md:px-8 automatically */}
</SectionWrapper>
```

**WHEN:** Every organism section — provides background, padding, max-width.  
**WHEN NOT:** Full-bleed heroes (use raw `<section>` with custom layout).

### Card (v4.0)

```tsx
import { Card } from '@/app/components/Card';

<Card
  variant="white | warm | outlined"  // Background (default: white)
  padding="none | sm | md | lg"      // Padding tier (default: md)
  shadow="none | sm | md | lg"       // Shadow depth (default: md)
  hover={boolean}                    // Enable lift + shadow on hover (default: true)
  as="div | article | section"      // Semantic element (default: div)
  onClick={(e) => {}}               // Click handler (adds cursor pointer)
  className=""
  style={{}}
>
  {/* Card content */}
</Card>
```

**WHEN:** Any content container — wraps molecule cards, info blocks, stat displays.  
**WHEN NOT:** Full-width sections (use SectionWrapper), inline text blocks.

---

## Filter System (v4.3)

Extracted from monolithic IndustrySidebar + MobileFilterSheet. 6 atoms + 4 molecules serving both Research and Surveys pillars.

### Component Inventory

| Component | Level | File | Purpose |
|-----------|-------|------|---------|
| `FilterCheckbox` | Atom | `FilterCheckbox.tsx` | Single filter option (label + count) |
| `FilterChip` | Atom | `FilterChip.tsx` | Dismissible active filter pill |
| `FilterSearchInput` | Atom | `FilterSearchInput.tsx` | Search input with clear button |
| `FilterSectionHeader` | Atom | `FilterSectionHeader.tsx` | Collapsible section header with count badge |
| `FilterCheckboxItem` | Atom | `FilterCheckboxItem.tsx` | Checkbox + label + count row (custom checkbox UI) |
| `FilterIndustryItem` | Atom | `FilterIndustryItem.tsx` | Expandable industry row with sub-items |
| `FilterAccordion` | Molecule | `molecules/FilterAccordion.tsx` | Titled filter group (static or collapsible) |
| `SidebarPanel` | Molecule | `molecules/SidebarPanel.tsx` | Reusable sidebar container |
| `ActiveFilterChipBar` | Molecule | `molecules/ActiveFilterChip.tsx` | Bar of active chips + "Clear all" |
| `MobileFilterSheet` | Molecule | `molecules/MobileFilterSheet.tsx` | Full-screen mobile filter overlay |

### Usage

```tsx
import { FilterSearchInput } from '@/app/components/FilterSearchInput';
import { FilterCheckbox } from '@/app/components/FilterCheckbox';
import { FilterChip } from '@/app/components/FilterChip';
import {
  FilterAccordion,
  SidebarPanel,
  ActiveFilterChipBar,
} from '@/app/components/molecules';
```

### Decision Flowchart

```
Need a sidebar shell?              → SidebarPanel
Need a filter group with heading?  → FilterAccordion (static or collapsible)
Need a single filter option?       → FilterCheckbox
Need a search bar with clear?      → FilterSearchInput
Need a dismissible filter pill?    → FilterChip
Need a bar of active filter pills? → ActiveFilterChipBar
Need full-screen mobile filters?   → MobileFilterSheet
```

### Token Bindings

| Component | Font Token | Color |
|-----------|-----------|-------|
| FilterCheckbox label | `--text-xs` (12.8px) | black/50 default, black/[0.85] hover, black/90 selected |
| FilterCheckbox count | `--text-card-micro` (10px) | black/[0.18] default, black/[0.45] selected |
| FilterChip | `--text-card-micro` (10px) | bg-black/[0.06], text-black/70 |
| FilterSearchInput | `--text-xs` (12.8px) | border rgba(0,0,0,0.06), text-black/70 |
| FilterAccordion heading | `--text-card-micro` (10px) | text-black/50, tracking-[0.1em] |
| ActiveFilterChipBar label | `--text-card-micro` (10px) | text-black/40 |

**Color system:** ALL filter components use pure monochromatic black/opacity. No colour hue. Selected state = `border-l-[3px] border-black` + `bg-black/[0.04]` + `text-black/90`. This follows the DS 92-5-3 hierarchy.

**Full docs:** `FILTER_SEARCH_SYSTEM_4WH.md`

---

## Molecule Components (v4.1-4.3)

Molecules live in `/src/app/components/molecules/`. Import via barrel:

```tsx
import {
  ScrollFade, HorizontalScroll, ReportCard, StatCard,
  DataHighlightCard, AnalystPickCardB, SkeletonCard, EmptyState,
  CardReveal, RevealImage, BackToTop, CategoryListCard,
  SurveyCard, CompletionBadge, ResponseChart, QuestionPreview,
} from '@/app/components/molecules';
```

### ScrollFade vs HorizontalScroll — Decision Flowchart

```
Is the content pills, tabs, chips, or small inline items?
 → YES: ScrollFade (native overflow-x scroll with fade masks)
 → NO: Is it full cards that need carousel-style navigation?
       → YES: HorizontalScroll (transform-based, momentum, drag)
       → NO: Use a regular grid layout
```

**CRITICAL: Never mix these two. They solve different problems.**

### ScrollFade

```tsx
import { ScrollFade } from '@/app/components/molecules';

<ScrollFade
  fadeBg="white"        // Background color for fade gradient (default: "white")
  fadeWidth={32}         // Fade edge width in px (default: 32)
  showButtons={false}    // Show chevron nav buttons (default: false)
  className=""           // Outer wrapper class
  innerClassName=""      // Inner scrollable div class
>
  {/* Inline items: pills, tabs, chips, badges */}
</ScrollFade>
```

**WHEN:** Pill/tab/chip rows that overflow on mobile. Category filters, sub-navigation tabs.  
**WHEN NOT:** Card carousels (use HorizontalScroll). Content that should wrap (use grid).  
**ALWAYS:** Use this instead of writing inline scroll-fade helpers. The NavigationDocumentation refactor (commit `4d7d3ba`) unified all organisms to use this molecule.

### HorizontalScroll

```tsx
import { HorizontalScroll } from '@/app/components/molecules';

<HorizontalScroll
  fadeBg="white"    // Background for fade edges (default: "white")
  gap="gap-4"       // Tailwind gap class for items (default: "gap-4")
  className=""       // Outer wrapper class
>
  {/* Full cards: ReportCard, StatCard, etc. */}
</HorizontalScroll>
```

**WHEN:** Card carousels (FeaturedResearch, RecentlyViewed). Content wider than viewport.  
**WHEN NOT:** Small pills/tabs (use ScrollFade). Content that fits in viewport.  
**Features:** Transform-based animation (no native scroll), button/wheel/touch/mouse drag, momentum physics.

### ReportCard (Canonical — replaces ReportGridCard)

```tsx
import { ReportCard } from '@/app/components/molecules';

// Grid layout (default — vertical stack)
<ReportCard
  layout="grid"
  id="1" title="Market Report" image="/img.jpg"
  industry="Technology" subcategory="AI"
  region="North America" date="March 2026"
  growth={12.5}
/>

// List layout (horizontal — thumbnail + content + CTA)
<ReportCard
  layout="list"
  id="2" title="Industry Analysis" image="/img.jpg"
  description="Detailed overview of market trends..."
  industry="Healthcare" region="Global" date="Feb 2026"
  ctaLabel="View Report"
/>
```

**WHEN:** Any report/research card display.  
**WHEN NOT:** Survey cards (use SurveyCard), general content (use Card + custom layout).  
**NOTE:** `ReportGridCard` is deprecated — always use `ReportCard layout="grid"`.

### StatCard

```tsx
import { StatCard } from '@/app/components/molecules';

<StatCard
  title="Market Size" value="$4.2B" growth={8.3}
  category="Technology" description="Global market valuation"
  icon={TrendingUp}
/>
```

**WHEN:** Market indicators, KPIs, numeric highlights.  
**Composed in:** `KeyMarketIndicators` organism (via `StatsRow`).

### Other Key Molecules

| Molecule | Purpose | When |
|----------|---------|------|
| `DataHighlightCard` | Daily data point (time, value, trend, source) | DailyDataHighlights organism |
| `AnalystPickCardB` | Expert recommendation (analyst header, blockquote, report) | AnalystPicks organism |
| `SkeletonCard` | Loading placeholder (grid + list variants) | Any card loading state |
| `EmptyState` | Zero results (icon, message, optional action) | Any filtered view with no matches |
| `CardReveal` | Staggered entrance animation for card grids | Wrap card grids for scroll-triggered reveal |
| `RevealImage` | Progressive blur-to-sharp image reveal | Inside cards with images |
| `BackToTop` | Floating scroll-to-top button | Long listing pages |
| `CategoryListCard` | Vertical list card with header | Category browse sections |
| `LoadMoreSentinel` | IntersectionObserver infinite scroll trigger | Paginated card listings |

### Survey Molecules (v4.2)

```tsx
import {
  SurveyCard, CompletionBadge, ResponseChart,
  QuestionPreview, SurveySkeleton,
} from '@/app/components/molecules';
```

| Molecule | Purpose |
|----------|---------|
| `SurveyCard` | Survey card (grid + list layouts, like ReportCard pattern) |
| `CompletionBadge` | Survey lifecycle state badge (active/completed/upcoming) |
| `ResponseChart` | CSS-only bar/donut chart for response data |
| `QuestionPreview` | Survey question type preview (multiple choice, rating, etc.) |
| `SurveySkeleton` | Survey-specific loading skeleton |

---

## Organism Components (v4.3)

Organisms live in `/src/app/components/organisms/`. Import via barrel:

```tsx
import {
  ProductHero, FeaturedCarousel, StatsRow, BrowseGrid,
  CTABanner, ProductPageTemplate,
  ReportStoreHero, FeaturedResearch, CardListing, FiltersPanel,
  // ... etc
} from '@/app/components/organisms';
```

### Cross-Pillar Organisms (6 — reusable across Report Store, Surveys, future pillars)

| Organism | Purpose | Composes |
|----------|---------|----------|
| `ProductHero` | Black hero with search, category links | SectionWrapper, SectionHeading |
| `FeaturedCarousel` | Featured content carousel | SectionWrapper, SectionHeading, HorizontalScroll |
| `StatsRow` | Row of stat cards | SectionWrapper, SectionHeading, StatCard |
| `BrowseGrid` | Card grid with ViewToggle | SectionWrapper, SectionHeading, ViewToggle, ReportCard/SurveyCard |
| `CTABanner` | Conversion CTA section | SectionWrapper, Button |
| `ProductPageTemplate` | **Declarative page template** — full page from config objects | All of the above |

### ProductPageTemplate (Declarative Page Assembly)

```tsx
import { ProductPageTemplate } from '@/app/components/organisms';

<ProductPageTemplate
  hero={{ label: 'Report Store', title: 'Research Hub', ... }}
  featured={{ label: 'Featured', title: 'Editor Picks', children: ... }}
  stats={{ label: 'Indicators', title: 'Key Metrics', stats: [...] }}
  browse={{ label: 'Browse', title: 'All Reports', items: [...], renderCard: ... }}
  cta={{ label: 'Custom', title: 'Need More?', primaryText: 'Contact Us' }}
  afterStats={<CustomSection />}    // Inject bespoke sections
  afterBrowse={<AnotherSection />}
/>
```

**WHEN:** Building a new product pillar page (e.g., Surveys home, new product landing).  
**WHEN NOT:** Case study pages (use hand-coded section order). Highly custom layouts.

### Report Store Organisms (24)

These compose molecules + atoms into self-contained page sections. Each is used by `ReportStorePage.tsx`.

**Home mode organisms:**

| Organism | Background | Composes |
|----------|-----------|----------|
| `ReportStoreHero` | BLACK | Search bar, category ScrollFade |
| `QuickAccessBar` | NEUTRAL50 | Horizontal action bar |
| `FeaturedResearch` | WHITE | HorizontalScroll + ReportCard |
| `KeyMarketIndicators` | WARM | StatsRow + StatCard |
| `RecommendedForYou` | WHITE | BrowseGrid + ReportCard |
| `DailyDataHighlights` | WHITE | 4x DataHighlightCard |
| `AnalystPicks` | WARM | 3x AnalystPickCardB |
| `IndustrySectorsGrid` | WHITE | 14 industries (7+7 split) |
| `ResearchMethodology` | WARM | 5-step process |
| `CustomResearchCTA` | BLACK | CTABanner wrapper |

**Listing mode organisms:**

| Organism | Purpose |
|----------|---------|
| `IndustryFocusBanner` | Industry context header |
| `ListingToolbar` | Sort, search, ViewToggle |
| `FiltersPanel` | Filter accordion sidebar |
| `CardListing` | Paginated card grid with SkeletonCard/EmptyState |
| `IndustrySidebar` | Industry filter sidebar |

**Supporting organisms:**

| Organism | Purpose |
|----------|---------|
| `TrendingTopics` | Trending topic pills |
| `TopDownloads` | Ranked download list |
| `RecentlyViewed` | Recently viewed carousel |
| `UpcomingReports` | Pipeline of upcoming reports |
| `NewsletterSignup` | Email subscription |
| `IndustrySpotlight` | Featured industry deep-dive |
| `ComparisonTable` | Format comparison table |
| `ReportPreview` | Report detail view |
| `TestimonialsRS` | Testimonial quotes |

### Case Study Organisms (10 — in root `/components/`)

These are NOT in the `organisms/` directory — they live flat in `/src/app/components/`:

```tsx
import { HeroSection } from '@/app/components/HeroSection';
import { ChallengesSection } from '@/app/components/ChallengesSection';
// etc.
```

| Organism | Background | Layout |
|----------|-----------|--------|
| `HeroSection` | BLACK | Centered, animated title |
| `ClientContextSection` | WHITE | 2-column sidebar |
| `ChallengesSection` | WARM | H-scroll/grid cards |
| `EngagementObjectivesSection` | WHITE | Sticky sidebar grid |
| `MethodologySection` | WARM | Scroll timeline |
| `ImpactSection` | WHITE | 4 metric variants |
| `ValuePillarsSection` | WHITE | 3-column grid |
| `TestimonialSection` | WHITE | Centered quote |
| `ResourcesSection` | BLACK | Masonry grid |
| `FinalCTASection` | WHITE | Conversion CTA |

---

## Organism Decision Flowchart

```
Building a new product page (Report Store, Surveys, etc.)?
 → Use ProductPageTemplate for quick assembly
 → OR compose individual organisms (ProductHero + FeaturedCarousel + ...)

Building a case study / editorial page?
 → Use the 10 case study organisms in section order
 → Follow BLACK → WHITE → WARM alternation

Need a listing page with filters?
 → ListingToolbar + FiltersPanel + CardListing
 → Add IndustryFocusBanner if industry-scoped

Need a card grid with view toggle?
 → BrowseGrid (handles ViewToggle + card rendering)

Need stat/KPI display?
 → StatsRow + StatCard

Need a carousel of cards?
 → FeaturedCarousel (organism) or HorizontalScroll (molecule)

Need a CTA section?
 → CTABanner (cross-pillar) or CustomResearchCTA (RS-specific)
```

---

## Component Quick Reference

```tsx
// === ATOMS ===
import { Button } from '@/app/components/Button';
import { CTALink } from '@/app/components/CTALink';
import { InlineLink } from '@/app/components/InlineLink';
import { Badge, SectionLabel, StepPill, StatusBadge } from '@/app/components/Badge';
import { Label } from '@/app/components/Label';
import { Card } from '@/app/components/Card';
import { SectionHeading } from '@/app/components/SectionHeading';
import { SectionWrapper } from '@/app/components/SectionWrapper';
import { Container } from '@/app/components/Container';
import { Tooltip } from '@/app/components/Tooltip';
import { ViewToggle } from '@/app/components/ViewToggle';
import { FadeInSection } from '@/app/components/FadeInSection';
import { IconBadge } from '@/app/components/IconBadge';

// === MOLECULES ===
import {
  ScrollFade, HorizontalScroll, ReportCard, StatCard,
  DataHighlightCard, AnalystPickCardB, SkeletonCard, EmptyState,
  CardReveal, RevealImage, BackToTop, CategoryListCard,
  SurveyCard, CompletionBadge, ResponseChart, QuestionPreview,
  FilterAccordion, SidebarPanel, ActiveFilterChipBar, MobileFilterSheet,
} from '@/app/components/molecules';

// === ORGANISMS (cross-pillar) ===
import {
  ProductHero, FeaturedCarousel, StatsRow, BrowseGrid,
  CTABanner, ProductPageTemplate,
} from '@/app/components/organisms';

// === ORGANISMS (Report Store) ===
import {
  ReportStoreHero, FeaturedResearch, ListingToolbar, CardListing,
  FiltersPanel, IndustrySidebar, DailyDataHighlights, AnalystPicks,
  IndustrySectorsGrid, KeyMarketIndicators, RecommendedForYou,
  CustomResearchCTA, QuickAccessBar,
  // + TrendingTopics, TopDownloads, RecentlyViewed, UpcomingReports,
  // + ResearchMethodology, NewsletterSignup, IndustrySpotlight,
  // + ComparisonTable, ReportPreview, TestimonialsRS,
} from '@/app/components/organisms';

// === DATA & UTILITIES ===
import { FEATURED_REPORTS, ALL_REPORTS, STAT_DATA } from '@/app/components/data';
import { industryIconMap } from '@/app/components/industryIconMap';
import { iconColors } from '@/app/components/iconColors';

// === HOOKS ===
import {
  useShimmer, useScrollDirection, useHeroVisibility, useCounter,
  useScrollAnimation, useReadingProgress, useResponsiveGutter,
  useReportFilters, useProgressiveLoad, useCrossfade, useMountTransition,
} from '@/app/hooks';
```

---

**v4.3 | March 18, 2026 | Part of [ai-context/](.) module system**
