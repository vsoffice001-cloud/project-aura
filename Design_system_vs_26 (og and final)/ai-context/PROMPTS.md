# Design System — AI Implementation Prompts

**Module:** `ai-context/PROMPTS.md`  
**Version:** 4.3  
**Date:** 2026-03-18  
**For:** Copy-paste into AI tools when building pages

---

## Prompt 1: New Case Study Page Build

```
I need to build a new case study page following our design system. Please:

1. Read ai-context/ modules (CORE, TYPOGRAPHY, COLORS, COMPONENTS, LAYOUT)
2. Use typography tokens from theme.css:
   - --text-sm (16px) for body text
   - --text-2xl (39px) for section headings (h2)
   - --text-3xl (48.8px) ONLY for hero h1
3. Use color tokens:
   - --brand-red (#b01f24) ONLY for CTAs
   - --black for hero sections
   - --warm-300 for highlighted sections
4. Use Button component:
   - variant="brand" ONLY for conversion CTAs
   - size="md" as default (42px height)
   - showArrow={true} ONLY for urgency/forms
5. Use CTALink for exploratory navigation
6. Follow section pattern (black → white → warm alternating)
7. Use SectionHeading v4.0 (prop-based: title, label, subtitle — NOT children)
8. Wrap each section in SectionWrapper (background, spacing, maxWidth)

Reference files:
- /src/app/components/Button.tsx
- /src/app/components/SectionHeading.tsx
- /src/app/components/SectionWrapper.tsx
- /src/styles/theme.css
```

---

## Prompt 2: Adding a CTA Button

```
Add a CTA button following our design system:

Use Button component from /src/app/components/Button.tsx
Use variant="brand" (Ken Bold Red #b01f24)
Use size="md" (42px height) - DO NOT use lg unless homepage hero
Use size="xs" (28px) for card footer CTAs only
Add showArrow={true} ONLY if redirecting to form/urgency page
Shimmer animation is automatic (always active)

Example for conversion:
<Button variant="brand" showArrow>Get Started Free</Button>

Example for exploration:
<CTALink href="#learn-more">Learn More</CTALink>

DO NOT use red for non-CTA purposes.
```

---

## Prompt 3: Creating a Section

```
Create a new section following our design system pattern:

1. Use SectionWrapper for layout:
   <SectionWrapper background="white | warm | black" spacing="lg" maxWidth="wide">
     <SectionHeading level={2} title="Title" label="CATEGORY" subtitle="Description" />
     {/* Content */}
   </SectionWrapper>

2. SectionHeading API (v4.0 — prop-based):
   <SectionHeading
     level={2}
     title="Section Title"       // Required — Serif heading
     label="CATEGORY"            // Optional — eyebrow
     subtitle="Description"      // Optional — body text
     action={{ text: "View All", href: "/all" }}  // Optional — CTALink
     endSlot={<ViewToggle />}    // Optional — right-aligned widget
   />

3. Background alternation:
   - bg-black text-white: Hero moments
   - bg-white: Standard content
   - bg-warm: Highlighted/alternating sections

4. Spacing: SectionWrapper handles py-12 sm:py-16 md:py-20 automatically
5. Width: SectionWrapper handles px-4 sm:px-6 md:px-8 + max-width automatically
6. DO NOT duplicate padding inside SectionWrapper children
```

---

## Prompt 4: Typography Sizing

```
Apply correct typography sizing from our design system:

DO USE (Most Common):
- var(--text-sm) 16px: ALL body text, paragraphs, descriptions
- var(--text-2xl) 39px: ALL section headings (h2)
- var(--text-xs) 12.8px: Labels, metadata, section eyebrows

SPECIAL CASES:
- var(--text-3xl) 48.8px: ONLY hero h1 and final CTA heading
- var(--text-nav) 14px: TOC items, navigation menus
- var(--text-compact) 14px: Compact cards with 4+ items
- var(--text-card-micro) 10px: Side numbers, counts, micro-labels ONLY

DO NOT USE:
- Hardcoded pixel values (unless spatial constraint)
- text-3xl for regular section headings (reserved for heroes)
- --text-card-micro for main text items (ONLY for counts/numbers)
- Random font sizes not in scale

FONT FAMILIES:
- Serif (Noto Serif): Headings h1-h3, hero titles, testimonial quotes
- Sans (DM Sans): Body, buttons, badges, labels, navigation
- NEVER use Serif for body/buttons. NEVER use Sans for headings.
```

---

## Prompt 5: Color Usage

```
Apply colors following our strict 92-5-3 design system rules:

Ken Bold Red (#b01f24) — 5% of page:
- ONLY for CTA buttons (variant="brand")
- ONLY for primary conversion actions
- Example: "Get Started", "Unlock Report", "Schedule Demo"

Black (#000000) + White (#ffffff) + Warm (#f5f2f1) — 92% of page:
- Black for hero backgrounds, primary buttons, body text
- White for standard section backgrounds
- Warm for alternating highlighted sections

Accent colors — 3% of page:
- Purple (#806ce0) for content icons and badge themes
- Periwinkle, Coral for badge/data variety
- Green/Amber/Rose for semantic status only

NEVER:
- Red for decorative purposes
- Red for borders, icons, or general accents
- Gray (use black tints: black/70, black/50, black/8)
- Accent colors for section backgrounds
- Hex colors in inline styles — use rgba() or var()
```

---

## Prompt 6: Button vs CTALink Decision

```
Choose the correct link component:

Use <Button variant="brand" showArrow>:
- Form submissions, signup, report downloads (urgency)
- Schedule meetings, primary conversions
Example: <Button variant="brand" showArrow>Get Started Free</Button>

Use <Button variant="secondary">:
- Supporting actions alongside primary/brand buttons
- Two-state: neutral at rest, brand-red on hover
Example: <Button variant="secondary">Learn More</Button>

Use <CTALink>:
- Exploratory navigation, "Learn more" style
- Section jumping, non-urgent discovery
Example: <CTALink href="#methodology">See How We Did It</CTALink>

Use <InlineLink>:
- Links WITHIN paragraphs, interlinking content
Example: Read our <InlineLink href="#study">case study</InlineLink>
```

---

## Prompt 7: Complete Case Study Page Build Checklist

```
Build a complete case study page with our design system. Follow this checklist:

STRUCTURE:
- Import components from /src/app/components/
- Import Foundations via @/app/components/FoundationsContent (re-export hub), never directly from foundations/
- Follow section alternating pattern (black → white → warm)
- Use semantic HTML (section, h1, h2, h3, p)
- Wire page-level components (Navbar, ScrollToTop, StickyCTA)

SECTION ASSEMBLY:
- Use SectionWrapper for every section (background, spacing, maxWidth)
- Use SectionHeading v4.0 (prop-based: title, label, subtitle)
- Use Container for additional width constraints within sections

TYPOGRAPHY:
- var(--text-3xl) for hero h1 ONLY
- var(--text-2xl) for ALL section h2
- var(--text-sm) for ALL body text
- Font weight 600 for headings, 400 for body
- Serif for headings, Sans for body/UI

COLORS:
- --brand-red ONLY for CTA buttons
- --black for hero backgrounds
- --warm-300 for alternating sections
- 92-5-3 hierarchy: 92% foundation, 5% brand, 3% accent

COMPONENTS:
- <Button variant="brand"> for conversion CTAs
- <Button variant="secondary"> for supporting actions (two-state)
- <CTALink> for exploratory navigation
- <InlineLink> for in-paragraph links
- <SectionLabel> for eyebrow text above headings

ANIMATIONS:
- Shimmer on all buttons (automatic)
- showArrow={true} ONLY for urgency/forms
- FadeInSection to wrap each page section for scroll reveals
```

---

## Prompt 8: Building a Report Store / Catalog Page

```
Build a Report Store page using our organism architecture:

QUICK ASSEMBLY (declarative):
<ProductPageTemplate
  hero={{ label: 'Report Store', title: '...', ... }}
  featured={{ label: 'Featured', title: '...', children: ... }}
  stats={{ label: 'Indicators', title: '...', stats: [...] }}
  browse={{ label: 'Browse', title: '...', items: [...], renderCard: ... }}
  cta={{ label: 'Custom', title: '...', primaryText: '...' }}
/>

MANUAL ASSEMBLY (custom control):
1. Import organisms from '@/app/components/organisms'
2. Import data from '@/app/components/data'
3. Compose in order:
   <ReportStoreHero />               → BLACK
   <QuickAccessBar />                → NEUTRAL50
   <FeaturedResearch />              → WHITE
   <KeyMarketIndicators />           → WARM
   <RecommendedForYou />             → WHITE
   <DailyDataHighlights />           → WHITE
   <AnalystPicks />                  → WARM
   <IndustrySectorsGrid />           → WHITE
   <ResearchMethodology />           → WARM
   <CustomResearchCTA />             → BLACK

LISTING MODE (filtered view):
   <IndustryFocusBanner />
   <ListingToolbar />
   <div className="flex gap-6">
     <FiltersPanel />
     <CardListing />
   </div>

MOLECULES TO USE:
- ScrollFade for pill/tab overflow (NOT HorizontalScroll)
- HorizontalScroll for card carousels (NOT ScrollFade)
- ReportCard layout="grid" or layout="list"
- SkeletonCard for loading, EmptyState for zero results
- CardReveal for staggered card entrance animation

HOOKS:
- useReportFilters for filter state management
- useProgressiveLoad for infinite scroll
- useCrossfade for content swap transitions
```

---

## Prompt 9: Using ScrollFade & HorizontalScroll Correctly

```
These are two DIFFERENT molecules. Never confuse them:

ScrollFade — for pills, tabs, chips, small inline items:
import { ScrollFade } from '@/app/components/molecules';
<ScrollFade fadeBg="white" showButtons={false}>
  <div className="flex gap-2">
    {categories.map(c => <Badge key={c}>{c}</Badge>)}
  </div>
</ScrollFade>
Uses: Native overflow-x scroll. Fade gradient masks on edges.
When: Category pill bars, sub-navigation tabs, filter chips.

HorizontalScroll — for full cards, carousel-style:
import { HorizontalScroll } from '@/app/components/molecules';
<HorizontalScroll fadeBg="white" gap="gap-4">
  {reports.map(r => <ReportCard key={r.id} layout="grid" {...r} />)}
</HorizontalScroll>
Uses: Transform-based animation, button/wheel/touch/drag, momentum.
When: Featured report carousel, recently viewed, card collections.

NEVER:
- Use HorizontalScroll for pills/tabs (too heavy)
- Use ScrollFade for card carousels (no momentum/drag)
- Write inline scroll-fade helpers (use the ScrollFade molecule)
- Nest CardReveal inside FadeInSection (double animation)
```

---

## Prompt 10: Composing with Organisms

```
Build a page section using our organism architecture:

STEP 1: Choose the right organism
- Need a hero? → ProductHero (cross-pillar) or ReportStoreHero (RS-specific)
- Need a card grid? → BrowseGrid (with ViewToggle) or CardListing (with pagination)
- Need stats? → StatsRow (composes StatCard)
- Need a carousel? → FeaturedCarousel (composes HorizontalScroll)
- Need a CTA? → CTABanner (cross-pillar) or CustomResearchCTA (RS)
- Need filters? → FiltersPanel + ListingToolbar

STEP 2: Each organism self-contains its layout
- Organisms include their own SectionWrapper (background, padding)
- Organisms include their own SectionHeading (title, label)
- DO NOT wrap organisms in additional SectionWrapper (double padding)
- DO pass configuration via props

STEP 3: Import from barrel
import { ProductHero, BrowseGrid, StatsRow } from '@/app/components/organisms';

STEP 4: Data
import { ALL_REPORTS, STAT_DATA } from '@/app/components/data';
import { industryIconMap } from '@/app/components/industryIconMap';
```

---

## Prompt 11: Full Atomic Hierarchy Page Build

```
Build a complete page using the full atom → molecule → organism → template hierarchy:

ATOMS (from /src/app/components/):
Button, Badge, SectionLabel, Card, SectionHeading, SectionWrapper,
Container, Tooltip, ViewToggle, FadeInSection, IconBadge

MOLECULES (from /src/app/components/molecules/):
ScrollFade, HorizontalScroll, ReportCard, StatCard, DataHighlightCard,
AnalystPickCardB, SkeletonCard, EmptyState, CardReveal, BackToTop

ORGANISMS (from /src/app/components/organisms/):
ProductHero, FeaturedCarousel, StatsRow, BrowseGrid, CTABanner,
ProductPageTemplate, ReportStoreHero, FeaturedResearch, etc.

TEMPLATES:
ProductPageTemplate — declarative cross-pillar template
ReportStorePage — RS template (home + listing mode)

COMPOSITION RULES:
1. Atoms compose into Molecules (Card + Badge + Button → ReportCard)
2. Molecules compose into Organisms (ReportCard + HorizontalScroll → FeaturedResearch)
3. Organisms compose into Templates (FeaturedResearch + StatsRow + ... → ProductPageTemplate)
4. Never skip levels (don't use atoms directly inside templates)
5. Each level handles its own styling — don't override child styles from parent
6. Import from the correct barrel (molecules/, organisms/, or root components/)
```

---

## Prompt 12: Building a Surveys / Listing Page

```
Build a Surveys page reusing our cross-pillar organisms + survey-specific molecules:

SURVEY MOLECULES (from '@/app/components/molecules'):
- SurveyCard — survey card (grid + list layouts, like ReportCard pattern)
- CompletionBadge — lifecycle state (active/completed/upcoming)
- ResponseChart — CSS-only bar/donut chart
- QuestionPreview — question type preview
- SurveySkeleton — loading skeleton

REUSABLE ORGANISMS:
- ProductHero → Survey hero (change config props)
- StatsRow → Survey statistics
- BrowseGrid → Survey listing grid (renderCard={SurveyCard})
- CTABanner → Survey CTA
- ListingToolbar → Sort/search/view toggle
- FiltersPanel → Filter sidebar
- CardListing → Paginated cards

PATTERN:
<ProductPageTemplate
  hero={{ label: 'Surveys', title: 'Survey Hub', ... }}
  featured={{ ... children using SurveyCard ... }}
  browse={{ ... renderCard: (item) => <SurveyCard {...item} /> ... }}
  cta={{ ... }}
/>

Or use SurveysDemoContent / SurveysListingDemoContent as references.
```

---

**v4.3 | March 18, 2026 | Part of [ai-context/](.) module system**
