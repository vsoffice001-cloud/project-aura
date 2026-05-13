# 🧩 COMPONENT GUIDELINES - 4W+H Framework
**Complete Reference for All Design System Components**

---

## 📌 PURPOSE
This document provides the 4W+H (Why, What, When, When Not, How) framework for EVERY component in the design system. Use this as a reference when building new pages.

---

## 🔘 BUTTON COMPONENT

### WHY
Buttons are the primary interaction mechanism for user actions. Consistent button design ensures users immediately recognize clickable actions and understand their hierarchy.

### WHAT
A versatile button component with 4 variants (primary, brand, secondary, ghost), 4 sizes (sm, md, lg, xl), and signature shimmer animation that's always active.

### WHEN
✅ Use for primary actions (submit forms, CTAs, navigation)
✅ Use `brand` variant for conversion moments (max 1-2 per screen)
✅ Use `md` size for 90% of buttons (default)
✅ Use `sm` size for navbar CTAs and TOC buttons
✅ Use `lg` size ONLY for homepage heroes

### WHEN NOT
❌ Don't use `lg` size by default (dilutes impact)
❌ Don't disable shimmer animation (brand signature)
❌ Don't use multiple brand buttons in same section
❌ Don't use for inline text links (use InlineLink instead)

### HOW
```tsx
// Standard CTA (most common)
<Button variant="brand" size="md">
  Get Started
</Button>

// With arrow (forms/urgent CTAs)
<Button variant="brand" size="md" showArrow>
  Schedule Demo
</Button>

// Navbar button
<Button variant="brand" size="sm">
  Sign Up
</Button>

// Secondary action
<Button variant="secondary" size="md">
  Learn More
</Button>
```

**Props:**
- `variant`: 'primary' | 'brand' | 'secondary' | 'ghost'
- `size`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `showArrow`: boolean (use for urgent CTAs)
- `icon`: ReactNode (lucide-react icons)
- `loading`: boolean
- `disabled`: boolean

---

## 🔗 CTALINK COMPONENT

### WHY
Text-based CTAs with arrows need unified hover behavior. This component ensures the text and arrow darken together, creating a cohesive interactive experience.

### WHAT
A text + animated arrow link component specifically for call-to-action links. Features unified hover state where both text and arrow transition together.

### WHEN
✅ Use for text-based CTAs (e.g., "Schedule a Demo →")
✅ Use in hero sections for secondary CTAs
✅ Use in content sections for "Learn More" links
✅ Use when you need text + arrow combination

### WHEN NOT
❌ Don't use for paragraph inline links (use InlineLink)
❌ Don't use for primary buttons (use Button)
❌ Don't use in navigation menus (use InlineLink)

### HOW
```tsx
// Hero section CTA
<CTALink href="/demo" className="text-white">
  Schedule a Demo
</CTALink>

// Content section CTA
<CTALink href="/features">
  Explore All Features
</CTALink>

// With custom styling
<CTALink 
  href="/pricing" 
  className="text-brand-red font-semibold"
>
  View Pricing Plans
</CTALink>
```

**Props:**
- `href`: string (required)
- `children`: ReactNode (the link text)
- `className`: string (optional styling)

---

## 🔗 INLINELINK COMPONENT

### WHY
Paragraph links need distinct visual treatment to stand out from surrounding text while maintaining readability. The red underline + warm hover creates a polished, editorial feel.

### WHAT
An inline text link component for use within paragraphs. Features red underline and warm background hover effect (#fef2f2).

### WHEN
✅ Use within paragraph text
✅ Use for "Learn more" references
✅ Use for cross-references between sections
✅ Use in table of contents items

### WHEN NOT
❌ Don't use for standalone CTAs (use CTALink or Button)
❌ Don't use for primary navigation (use nav links)
❌ Don't use when you need an arrow (use CTALink)

### HOW
```tsx
// Within paragraph
<p className="text-sm">
  Our methodology is based on industry best practices.{' '}
  <InlineLink href="/methodology">Learn more about our approach</InlineLink>
  {' '}in our comprehensive guide.
</p>

// In list items
<li className="text-sm">
  <InlineLink href="/resources">Download resources</InlineLink>
</li>

// Table of contents
<InlineLink href="#section-2">
  Client Context & Background
</InlineLink>
```

**Props:**
- `href`: string (required)
- `children`: ReactNode (the link text)

---

## ➡️ ANIMATEDARROW COMPONENT

### WHY
Arrow animations provide visual feedback for directional navigation and urgent CTAs. The subtle slide animation guides users toward important actions.

### WHAT
An animated arrow icon that slides right on hover. Used exclusively with CTAs that redirect to forms or urgent pages.

### WHEN
✅ Use with CTALink component
✅ Use with Button when `showArrow` is true
✅ Use for form submissions ("Submit →")
✅ Use for urgent CTAs ("Schedule Demo →")

### WHEN NOT
❌ Don't use for simple navigation links
❌ Don't use within paragraph text
❌ Don't use without a corresponding CTA

### HOW
```tsx
// Standalone (rare - usually via CTALink)
<AnimatedArrow className="text-brand-red" />

// With CTALink (automatic)
<CTALink href="/demo">
  Schedule Demo {/* Arrow auto-included */}
</CTALink>

// With Button
<Button variant="brand" showArrow>
  Get Started {/* Arrow auto-included */}
</Button>
```

**Props:**
- `className`: string (for color/size customization)

---

## 📊 SECTION COMPONENTS

### HERO SECTION

#### WHY
The hero section is the first impression - it must immediately communicate value and guide users to primary actions.

#### WHAT
Full-width section with large heading (--text-3xl), subheading, and primary CTA. Always uses black background with white text.

#### WHEN
✅ Use as the first section of any page
✅ Use --text-3xl for h1 (ONLY place to use this size)
✅ Use brand button for primary CTA

#### WHEN NOT
❌ Don't use --text-3xl anywhere else
❌ Don't use warm background (always black)
❌ Don't include more than 2 CTAs

#### HOW
```tsx
<section className="bg-black text-white py-24 md:py-32">
  <div className="container mx-auto px-4 md:px-6 max-w-7xl">
    <h1 className="text-3xl font-normal mb-6">
      Transform Your Business
    </h1>
    <p className="text-sm text-white/80 mb-8 max-w-2xl">
      Comprehensive case study analysis
    </p>
    <div className="flex gap-4">
      <Button variant="brand" size="md">
        Get Started
      </Button>
      <CTALink href="/demo" className="text-white">
        Watch Demo
      </CTALink>
    </div>
  </div>
</section>
```

---

### CONTENT SECTION

#### WHY
Content sections provide structured information with clear hierarchy and alternating backgrounds for visual rhythm.

#### WHAT
Standard section with h2 heading (--text-2xl), body text (--text-sm), and optional card grid. Alternates between white and warm-300 backgrounds.

#### WHEN
✅ Use --text-2xl for h2 section headings
✅ Use --text-sm for body paragraphs
✅ Alternate backgrounds: white → warm-300 → white

#### WHEN NOT
❌ Don't use --text-3xl for section headings
❌ Don't use arbitrary font sizes
❌ Don't skip background alternation

#### HOW
```tsx
<section className="py-16 md:py-24 bg-warm-300">
  <div className="container mx-auto px-4 md:px-6 max-w-7xl">
    <h2 className="text-2xl font-normal mb-6">
      Section Heading
    </h2>
    <p className="text-sm text-black/70 mb-8">
      Section description
    </p>
    {/* Content grid/cards */}
  </div>
</section>
```

---

### CARD COMPONENT

#### WHY
Cards group related information and provide visual containers for modular content.

#### WHAT
White background container with border, rounded corners, and consistent padding. Used for challenges, features, testimonials.

#### WHEN
✅ Use for grouped information (3-4 items)
✅ Use --text-base (20px) for card titles when 4+ cards
✅ Use --text-lg (25px) for card titles when 2-3 cards
✅ Use --text-compact (14px) for card body when 4+ cards

#### WHEN NOT
❌ Don't use for single items (use section instead)
❌ Don't mix card title sizes within same section
❌ Don't exceed 6 cards per row without grid adjustment

#### HOW
```tsx
{/* 4+ Cards - Compact sizing */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {cards.map(card => (
    <div key={card.id} className="bg-white border border-black/8 rounded-lg p-6">
      <h3 className="text-base font-semibold mb-3">
        {card.title}
      </h3>
      <p className="text-compact text-black/70">
        {card.description}
      </p>
    </div>
  ))}
</div>

{/* 2-3 Cards - Larger sizing */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {cards.map(card => (
    <div key={card.id} className="bg-white border border-black/8 rounded-lg p-8">
      <h3 className="text-lg font-semibold mb-4">
        {card.title}
      </h3>
      <p className="text-sm text-black/70">
        {card.description}
      </p>
    </div>
  ))}
</div>
```

---

## 📱 NAVBAR COMPONENT

### WHY
Navigation provides consistent site-wide wayfinding. The two-state system (scrolled/top) creates visual hierarchy and saves space.

### WHAT
Fixed top navbar with two states: expanded (at top) and compact (scrolled). Uses black background with white text.

### WHEN
✅ Use on every page for consistency
✅ Use --text-xs (12.8px) for nav links
✅ Use Button size="sm" for navbar CTA
✅ Show expanded state at page top
✅ Collapse to compact when user scrolls down

### WHEN NOT
❌ Don't use transparent background
❌ Don't use large buttons in navbar
❌ Don't exceed 5-6 nav links

### HOW
```tsx
<nav className={`fixed top-0 w-full z-50 transition-all ${
  isScrolled ? 'h-16' : 'h-20'
} bg-black text-white`}>
  <div className="container mx-auto px-4 h-full flex items-center justify-between">
    <div className="font-bold">Logo</div>
    <div className="flex items-center gap-6">
      <a href="#features" className="text-xs hover:text-white/80">
        Features
      </a>
      <a href="#pricing" className="text-xs hover:text-white/80">
        Pricing
      </a>
      <Button variant="brand" size="sm">
        Get Started
      </Button>
    </div>
  </div>
</nav>
```

---

## 📋 TABLE OF CONTENTS

### WHY
Long-form content needs navigation. TOC provides quick access to sections and shows reading progress.

### WHAT
Sticky sidebar navigation with numbered items, active state highlighting, and compact "Unlock" CTA.

### WHEN
✅ Use for pages with 5+ sections
✅ Use --text-nav (14px) for TOC item titles
✅ Use Button size="sm" for "Unlock" CTA
✅ Highlight active section as user scrolls

### WHEN NOT
❌ Don't use on short pages (< 5 sections)
❌ Don't use large font sizes
❌ Don't show on mobile (use hamburger menu)

### HOW
```tsx
<div className="sticky top-24 hidden lg:block">
  <div className="border border-black/10 rounded-lg p-6">
    <h3 className="text-xs uppercase tracking-wide mb-4">
      Table of Contents
    </h3>
    {sections.map((section, idx) => (
      <InlineLink 
        key={section.id}
        href={`#${section.id}`}
        className={activeSection === section.id ? 'font-semibold' : ''}
      >
        <span className="text-nav">
          {String(idx + 1).padStart(2, '0')}. {section.title}
        </span>
      </InlineLink>
    ))}
    <div className="mt-6 pt-6 border-t border-black/10">
      <p className="text-nav mb-3">
        165+ pages of comprehensive analysis
      </p>
      <Button variant="brand" size="sm" fullWidth>
        Unlock Full Report
      </Button>
    </div>
  </div>
</div>
```

---

## 🎨 LAYOUT PATTERNS

### CONTAINER COMPONENT

#### WHY
Repeated `max-w-[var(--container-content)] mx-auto px-4 sm:px-6 md:px-8` patterns across every section violate DRY and create inconsistency risks. A single wrapper component provides one source of truth for content width and padding.

#### WHAT
A semantic layout wrapper with 5 width presets mapping to CSS variables:
- `page` (1200px) — Full page shell, hero backgrounds, navbar
- `content` (1000px, default) — Standard sections, card grids
- `narrow` (900px) — CTAs, testimonials, focused content
- `prose` (700px) — Long-form text, paragraph measure
- `compact` (600px) — Descriptions, methodology text

#### WHEN
- Use as the outermost content wrapper in every section
- Use when you need consistent responsive padding (px-4 / px-6 / px-8)
- Use to enforce max-width constraints

#### WHEN NOT
- Don't use for elements that need full-bleed (backgrounds, hero images)
- Don't nest Containers inside Containers
- Don't use for modal/overlay content (modals have their own width system)

#### HOW
```tsx
import { Container } from './Container';

// Default (1000px content width)
<Container>
  <h2>Section Heading</h2>
  <p>Content here...</p>
</Container>

// Narrow for focused CTAs
<Container width="narrow">
  <CTABlock />
</Container>

// Custom HTML element
<Container as="article" width="prose" className="py-20">
  <p>Long-form content...</p>
</Container>
```

---

### RESOURCECARD COMPONENT

#### WHY
A resources/blog grid needs visual variety — a single card style creates monotony in a Masonry layout. Different content types (featured articles, quick reads, category highlights) need distinct visual emphasis while maintaining design system consistency.

#### WHAT
A versatile content card with 7 layout variants, 2 card styles, and 2 color modes:

**Variants:** `standard`, `full-featured`, `minimal`, `category-featured`, `clean`, `featured-focus`, `latest`
**Card Styles:** `default` (no border), `bordered` (frosted glass border)
**Color Modes:** `light`, `dark`

#### WHEN
- Use in ResourcesSection Masonry grid
- Use for blog listings, article grids, case study collections
- Mix 3-4 variant types within a grid for visual rhythm
- Use `full-featured` for the primary/hero card (max 1 per grid)
- Use `clean` for text-heavy content that doesn't need an image

#### WHEN NOT
- Don't use for product/e-commerce cards (different purpose)
- Don't use all cards as `full-featured` — creates visual overload
- Don't mix more than 4 variant types in one grid (creates chaos)
- Don't use outside of a grid context (cards need siblings for visual rhythm)

#### HOW
```tsx
import { ResourceCard } from './ResourceCard';

// Standard card
<ResourceCard
  image="https://..."
  category="TECHNOLOGY"
  date="Jan 15, 2024"
  title="Article Title"
  description="Brief description..."
  variant="standard"
  cardStyle="bordered"
  mode="dark"
/>

// Featured card with type badge
<ResourceCard
  image="https://..."
  category="INSIGHTS"
  date="Jan 18, 2024"
  title="Featured Article"
  description="..."
  type="article"
  isFeatured={true}
  variant="full-featured"
  mode="dark"
/>
```

---

### SUBTLEVARIANTSWITCHER COMPONENT

#### WHY
During design review, stakeholders and developers need to quickly compare visual variants of a section without editing code. This tool provides a non-intrusive toggle that doesn't disrupt page layout.

#### WHAT
A small floating pill positioned at the corner of a section. Shows the current variant label, expands on hover to reveal all options with descriptions. Uses lucide-react `Settings` icon.

#### WHEN
- Use in sections with multiple visual modes (e.g., card styles in ResourcesSection)
- Use during design review sessions to compare variants
- Enable via `enableVariantSwitcher` prop on parent sections

#### WHEN NOT
- Don't use in production end-user builds
- Don't use when there's only one variant (nothing to switch)
- Don't use inside scroll-locked containers
- Don't use for functionality that end-users should access (this is a designer tool)

#### HOW
```tsx
import { SubtleVariantSwitcher } from './SubtleVariantSwitcher';

<div className="relative"> {/* Parent must be position: relative */}
  <SubtleVariantSwitcher
    sectionName="Resources"
    currentVariant={cardStyle}
    variants={[
      { id: 'default', label: 'Default', description: 'No border, transparent' },
      { id: 'bordered', label: 'Bordered', description: 'Light border with frost' },
    ]}
    onVariantChange={(id) => setCardStyle(id)}
    position="top-right"
    theme="dark"
  />
</div>
```

---

### useResponsiveGutter HOOK

#### WHY
Masonry libraries (react-responsive-masonry) require pixel-based gutter values, not CSS classes. A hook encapsulates the responsive logic (24px mobile, 32px desktop) so the gutter matches the design system's spacing scale.

#### WHAT
A custom React hook that returns a number (pixels) for the current breakpoint:
- Mobile (< 768px): returns `24` (matches `--space-6`)
- Desktop (>= 768px): returns `32` (matches `--space-8`)

Uses `window.matchMedia` with resize listener for real-time updates.

#### WHEN
- Use when a library requires pixel-based spacing values (not CSS classes)
- Use with Masonry grids, carousel gaps, or any JS-driven layout
- Use when responsive spacing needs to be calculated in JavaScript

#### WHEN NOT
- Don't use when Tailwind responsive classes work (e.g., `gap-6 md:gap-8`)
- Don't use for simple CSS-based layouts
- Don't use for spacing that CSS variables can handle

#### HOW
```tsx
import { useResponsiveGutter } from '@/app/hooks/useResponsiveGutter';

function MyMasonryGrid() {
  const gutter = useResponsiveGutter(); // 24 or 32

  return (
    <Masonry gutter={`${gutter}px`}>
      {items.map(item => <Card key={item.id} {...item} />)}
    </Masonry>
  );
}
```

---

**Last Updated:** 2026-03-18  
**Design System Version:** 4.3  
**Repository:** vsoffice001-cloud/Design-System-vs-26  
**Use:** Reference this guide when building new components/pages

---

## 🔍 FILTER SYSTEM (v4.2 — Extracted Components)

> **Origin:** Extracted from monolithic IndustrySidebar + MobileFilterSheet (1,400+ lines)
> into 3 atoms + 3 molecules during Session 32 Phase 1. Serves both Research and Surveys pillars.

### Composition Tree

```
ReportStoreListingDemoContent.tsx (or SurveysListingDemoContent.tsx)
│
├── Header Toolbar
│   ├── FilterSearchInput (atom)          ← search bar
│   ├── Sort select (bespoke)             ← inline, not extracted
│   ├── Filters toggle button (bespoke)   ← show/hide sidebar
│   └── ViewToggle (atom)                 ← grid/list switch
│
├── ActiveFilterChipBar (molecule)        ← dismissible filter pills
│   └── FilterChip (atom) × N            ← one per active filter
│
└── Main Content
    ├── SidebarPanel (molecule)           ← sticky sidebar container
    │   ├── FilterAccordion (molecule) × 3 ← Industry, Format, Region
    │   │   └── FilterCheckbox (atom) × N  ← one per option
    │   └── Catalog Stats (bespoke)        ← inline stats block
    │
    └── Card Grid                          ← ReportCard / SurveyCard
```

### Filter Component Decision Flowchart

```
Is it a CONTAINER (sidebar shell)?
 → YES: SidebarPanel

Is it a FILTER GROUP (heading + list of options)?
 → YES: FilterAccordion
        ├── variant="static" → always open (desktop sidebar)
        └── variant="collapsible" → toggle open/closed (mobile sheet)

Is it a SINGLE FILTER OPTION (label + count)?
 → YES: FilterCheckbox

Is it a SEARCH INPUT (text + clear)?
 → YES: FilterSearchInput

Is it a DISMISSIBLE PILL showing an active filter?
 → YES: FilterChip

Is it a BAR OF ACTIVE FILTERS with "Clear all"?
 → YES: ActiveFilterChipBar
```

### Interaction State Matrix (6 components × 6 states)

```
┌─────────────────────┬─────────────────┬─────────────────┬─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ Component           │ Default         │ Hover           │ Selected/Active │ Focus-Visible   │ Disabled        │ Pressed         │
├─────────────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ FilterCheckbox      │ text-black/50   │ text-black/[.85]│ text-black/90   │ brand-red ring  │ opacity-40      │ scale-[0.98]    │
│                     │ transparent bg  │ bg-black/[0.02] │ bg-black/[0.04] │ (global CSS)    │ cursor-not-     │                 │
│                     │                 │                 │ border-l 3px #k │                 │ allowed         │                 │
├─────────────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ FilterChip          │ bg-black/[.06]  │ X: black/50     │ N/A (always     │ brand-red ring  │ N/A (read-only  │ X: scale-[0.9]  │
│                     │ text-black/70   │                 │ "active")       │ (global CSS)    │ = no X button)  │                 │
├─────────────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ FilterSearchInput   │ border-black/10 │ border-black/25 │ N/A             │ brand-red ring  │ opacity-40      │ clear:          │
│                     │                 │                 │                 │ (global CSS)    │ cursor-not-     │ scale-[0.9]     │
│                     │                 │                 │                 │                 │ allowed         │                 │
├─────────────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ FilterAccordion     │ text-black/50   │ trigger:        │ open: chevron   │ brand-red ring  │ opacity-40      │ trigger:        │
│ (collapsible)       │                 │ text-black/[.7] │ rotate-180      │ (global CSS)    │ locked state    │ scale-[0.98]    │
├─────────────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ SidebarPanel        │ border-r        │ N/A (container) │ N/A (container) │ N/A (container) │ visible=false   │ N/A (container) │
│                     │                 │                 │                 │                 │ → null          │                 │
├─────────────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ ActiveFilterChipBar │ border-t /[.06] │ clear:          │ N/A (composed)  │ brand-red ring  │ empty filters   │ clear:          │
│                     │ label black/40  │ text-black/[.8] │                 │ (global CSS)    │ → null          │ scale-[0.95]    │
└─────────────────────┴─────────────────┴─────────────────┴─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

> **Color system note:** ALL filter components use pure monochromatic black/opacity values
> derived from the IndustrySidebar source. No colour hue (no purple, no brand-red) on filter
> controls. This follows the DS 92-5-3 hierarchy: 92% neutral (black/white/warm), 5% accent, 3% brand.

---

### ☑️ FILTERCHECKBOX (Atom)

#### WHY
Individual filter options (e.g., "Technology (5)") were duplicated as inline `<button>` elements in both IndustrySidebar and MobileFilterSheet. Extracting to an atom ensures consistent styling, interaction states, and accessibility across all filter contexts.

#### WHAT
A full-width button with label text (left) and optional count badge (right). Selected state uses monochromatic black indicator (left-border + darkened text). Supports disabled state for locked filter options.

#### WHEN
✅ Inside FilterAccordion groups for Industry, Format, Region, Topic, Status
✅ Any single-select radio-style filter list
✅ When each option needs a visible count

#### WHEN NOT
❌ Don't use for multi-select checkboxes (future: add `multi` prop)
❌ Don't use for toggle switches (use Switch component)
❌ Don't use outside filter contexts (use Badge for labels)

#### HOW
```tsx
import { FilterCheckbox } from '@/app/components/FilterCheckbox';

// Standard usage
<FilterCheckbox
  label="Technology"
  count={5}
  selected={selectedIndustry === 'Technology'}
  onClick={() => setSelectedIndustry('Technology')}
/>

// Disabled option
<FilterCheckbox
  label="Aerospace"
  count={0}
  disabled
/>
```

**Props:**
- `label`: string (required) — Display text
- `count`: number (optional) — Count badge in monospace
- `selected`: boolean (default: false) — Periwinkle highlight
- `disabled`: boolean (default: false) — Grayed out, no interaction
- `onClick`: () => void (optional) — Click handler

**Font tokens:** Label = `--text-xs` (12.8px), Count = `--text-card-micro` (10px)
**Color system:** Pure monochromatic black/opacity — selected uses `bg-black/[0.04]` + `border-l-[3px] border-black` + `text-black/90`

---

### 🏷️ FILTERCHIP (Atom)

#### WHY
Active filter pills (e.g., "Technology ✕") were duplicated as inline `<span>` elements. Extracting ensures consistent dismissal UX, spacing, and accessibility (aria-label on remove button).

#### WHAT
A compact monochromatic pill with label text and optional X dismiss button. Read-only mode (no `onRemove`) renders without the X button.

#### WHEN
✅ Inside ActiveFilterChipBar to show active filters
✅ Any context needing a dismissible tag/pill
✅ As read-only labels when `onRemove` is omitted

#### WHEN NOT
❌ Don't use for category labels (use IndustryBadge or Badge)
❌ Don't use for status indicators (use StatusBadge)
❌ Don't use for navigation tags (use Badge with `interactive`)

#### HOW
```tsx
import { FilterChip } from '@/app/components/FilterChip';

// Dismissible (standard)
<FilterChip label="Technology" onRemove={() => clearIndustry()} />

// Read-only
<FilterChip label="Active" />

// With quoted search term
<FilterChip label={`"${searchQuery}"`} onRemove={() => clearSearch()} />
```

**Props:**
- `label`: string (required) — Chip display text
- `onRemove`: () => void (optional) — Renders X button when provided

**Font token:** `--text-card-micro` (10px)
**Color system:** `bg-black/[0.06]`, `text-black/70` — monochromatic, no colour hue

---

### 🔎 FILTERSEARCHINPUT (Atom)

#### WHY
The search input pattern (Search icon + input + conditional clear X) was duplicated in both listing pages. Extracting it ensures consistent border states, icon sizing, and clear-button behavior.

#### WHAT
A bordered input container with magnifying glass icon, placeholder text, and auto-appearing clear button when the input has a value. Supports disabled state.

#### WHEN
✅ Listing page toolbars (Report Store, Surveys)
✅ Any search-within-page-content context
✅ When you need an inline search with clear functionality

#### WHEN NOT
❌ Don't use for global site search (needs autocomplete, results dropdown)
❌ Don't use for form fields (use standard input with Label component)
❌ Don't use inside SidebarPanel (too wide — consider a compact variant if needed)

#### HOW
```tsx
import { FilterSearchInput } from '@/app/components/FilterSearchInput';

// Standard usage
<FilterSearchInput
  value={searchQuery}
  onChange={(val) => setSearchQuery(val)}
  placeholder="Search reports..."
/>

// Custom width
<FilterSearchInput
  value={query}
  onChange={setQuery}
  placeholder="Find surveys..."
  minWidth="280px"
/>

// Disabled state
<FilterSearchInput
  value=""
  onChange={() => {}}
  disabled
/>
```

**Props:**
- `value`: string (required) — Controlled input value
- `onChange`: (value: string) => void (required) — Value change handler
- `placeholder`: string (default: 'Search...') — Placeholder text
- `minWidth`: string (default: '220px') — CSS min-width
- `disabled`: boolean (default: false) — Disables input and hides clear button

**Font token:** Input text = `--text-xs` (12.8px) — sidebar context
**Icon sizes:** Search = 14px, Clear X = 12px (hardcoded icon sizes, not font tokens)
**Color system:** Borders `rgba(0,0,0,0.06)` default → `rgba(0,0,0,0.12)` hover — monochromatic

---

### 📂 FILTERACCORDION (Molecule)

#### WHY
Two separate FilterSection implementations existed — one for desktop sidebar (always open) and one for mobile sheet (collapsible). Unifying them with a `variant` prop eliminates duplication and ensures heading style, spacing, and animation consistency.

#### WHAT
A titled filter section that renders a heading + list of FilterCheckbox atoms. Two variants: `static` (always open, no toggle) and `collapsible` (chevron trigger, animated expand/collapse).

#### WHEN
✅ Inside SidebarPanel for desktop filter groups (variant="static")
✅ Inside MobileFilterSheet for collapsible groups (variant="collapsible")
✅ When a filter group needs a heading + option list pattern

#### WHEN NOT
❌ Don't use for non-filter content (use CollapsibleSection)
❌ Don't nest FilterAccordion inside FilterAccordion
❌ Don't use for toggle/switch groups (different interaction pattern)

#### HOW
```tsx
import { FilterAccordion } from '@/app/components/molecules';

// Static (desktop sidebar — default)
<FilterAccordion
  title="Industry"
  options={[
    { label: 'All Industries', count: 18 },
    { label: 'Technology', count: 5 },
    { label: 'Healthcare', count: 3 },
  ]}
  selectedValue={selectedIndustry}
  onSelect={setSelectedIndustry}
/>

// Collapsible (mobile sheet)
<FilterAccordion
  title="Region"
  variant="collapsible"
  defaultOpen={false}
  options={regions}
  selectedValue={selectedRegion}
  onSelect={setSelectedRegion}
/>

// Disabled group
<FilterAccordion
  title="Format"
  options={formats}
  selectedValue="All"
  onSelect={() => {}}
  disabled
/>

// Individual disabled options
<FilterAccordion
  title="Status"
  options={[
    { label: 'Active', count: 12 },
    { label: 'Archived', count: 0, disabled: true },
  ]}
  selectedValue={selectedStatus}
  onSelect={setSelectedStatus}
/>
```

**Props:**
- `title`: string (required) — Section heading text (rendered uppercase + tracking-wider)
- `options`: FilterOption[] (required) — Array of `{ label, count?, disabled? }`
- `selectedValue`: string (required) — Currently selected option label
- `onSelect`: (value: string) => void (required) — Selection handler
- `variant`: 'static' | 'collapsible' (default: 'static') — Expand/collapse behavior
- `defaultOpen`: boolean (default: true) — Initial open state for collapsible
- `disabled`: boolean (default: false) — Disables entire group

**Font token:** Heading = `--text-card-micro` (10px) + uppercase + tracking-[0.1em] + font-weight-heading
**Composes:** FilterCheckbox (atom)

---

### 📋 SIDEBARPANEL (Molecule)

#### WHY
The filter sidebar container pattern (fixed width, border-right, scrollable body, optional header/footer zones) was hardcoded inline. Extracting it means any future sidebar — filter panel, TOC, settings, side nav — gets identical placement and spacing by importing one component.

#### WHAT
A flex-column `<aside>` container with configurable width, optional header/footer zones, and a scrollable body area. Controlled visibility via `visible` prop (returns null when hidden — no hidden DOM).

#### WHEN
✅ Desktop filter sidebars on listing pages
✅ Table of Contents sidebar
✅ Settings/preferences panels
✅ Any page that needs a consistent left rail

#### WHEN NOT
❌ Don't use for full-page sidebars (use the Dashboard sidebar pattern)
❌ Don't use for mobile (use sheet/drawer instead)
❌ Don't use for right-side panels (CSS is left-rail biased — border-r)

#### HOW
```tsx
import { SidebarPanel } from '@/app/components/molecules';

// Basic filter sidebar
<SidebarPanel visible={showFilters}>
  <FilterAccordion ... />
  <FilterAccordion ... />
</SidebarPanel>

// With header and footer
<SidebarPanel
  width="18rem"
  header={<h2 className="text-sm font-medium">Settings</h2>}
  footer={<Button variant="secondary" size="sm" fullWidth>Apply</Button>}
>
  <FilterAccordion ... />
</SidebarPanel>

// Hidden
<SidebarPanel visible={false}>
  {/* Not rendered at all */}
</SidebarPanel>
```

**Props:**
- `children`: ReactNode (required) — Scrollable body content
- `header`: ReactNode (optional) — Fixed header zone with border-b
- `footer`: ReactNode (optional) — Fixed footer zone with border-t
- `width`: string (default: '14rem') — CSS width value
- `className`: string (optional) — Additional CSS classes
- `visible`: boolean (default: true) — Show/hide control

**Layout tokens:** Width = 14rem (224px), borders `rgba(0,0,0,0.06)`
**No font tokens** — this is a pure layout container

---

### 🧹 ACTIVEFILTERCHIPBAR (Molecule)

#### WHY
The active-filter-pills bar (label + N chips + clear-all link) was duplicated inline in both listing pages. Extracting it into a molecule ensures consistent spacing, separator styling, and clear-all behavior.

#### WHAT
A horizontal bar that renders only when filters are active (returns null otherwise). Shows a "Filters:" label, one FilterChip per active filter, and an optional "Clear all" underline link.

#### WHEN
✅ Between listing header toolbar and card grid
✅ Any page with dismissible filter feedback
✅ When users need to see and remove active filters at a glance

#### WHEN NOT
❌ Don't use for static tag displays (use Badge or IndustryBadge)
❌ Don't use inside the sidebar (filters are already visible there)
❌ Don't use when there are no active filters (component self-hides)

#### HOW
```tsx
import { ActiveFilterChipBar } from '@/app/components/molecules';

// Standard usage
<ActiveFilterChipBar
  filters={[
    { label: 'Technology', onRemove: () => clearIndustry() },
    { label: 'Full Report', onRemove: () => clearFormat() },
    { label: '"AI chips"', onRemove: () => clearSearch() },
  ]}
  onClearAll={() => clearAllFilters()}
/>

// Without clear-all (rare)
<ActiveFilterChipBar
  filters={activeFilters}
/>

// Empty = renders nothing
<ActiveFilterChipBar filters={[]} />  // → null
```

**Props:**
- `filters`: ActiveFilter[] (required) — Array of `{ label: string, onRemove: () => void }`
- `onClearAll`: () => void (optional) — "Clear all" click handler

**Font tokens:** "Filters:" label = `--text-card-micro` (10px) + uppercase + tracking-[0.1em], "Clear all" = `--text-card-micro` (10px)
**Color system:** Label `text-black/40`, clear button `text-black/40` → hover `text-black/[0.8]`, separator `rgba(0,0,0,0.06)` — matches IndustrySidebar source
**Composes:** FilterChip (atom)

---

## 📝 UNIFIED INPUT SYSTEM (v4.2 — Session 38)

> **Origin:** Audit of 51 input instances across 14 files found 7+ inconsistent styling patterns
> (4 different border colors, 6 different border radii, 4 conflicting focus patterns).
> Session 38 unified ALL inputs to a single 6-state monochromatic system grounded in
> UX laws (Weber's JND, Fitts's Law, Gestalt Similarity, Jakob's Law).

### UX Laws Applied

| Law | Application |
|---|---|
| **Weber's Law (JND)** | State transitions cross the ~30% perceptual threshold: Default→Hover = 150% increase (10%→25%), Hover→Focus = 260% (25%→90%) |
| **Fitts's Law** | Standard inputs use `px-4 py-3` for minimum 44px touch targets |
| **Gestalt Similarity** | ALL inputs share identical default styling so the brain groups them as one "type" |
| **Jakob's Law** | Matches the Apple/Google/Stripe mental model: subtle border → darken on hover → near-black on focus |
| **Hick's Law** | Exactly 6 states (Default, Hover, Focus, Filled, Error, Disabled) — no more, no less |

### Canonical 6-State Table

| State | Border | Text | Placeholder | Background | Notes |
|---|---|---|---|---|---|
| **Default** | `black/10` | `black/90` | `black/30` | `white` | — |
| **Hover** | `black/25` | `black/90` | `black/30` | `white` | Weber: 150% increase |
| **Focus** | `black/90` | `black` | `black/30` | `white` | Border only, no ring |
| **Filled** | `black/15` | `black/90` | — | `white` | "has content" signal |
| **Error** | `--brand-red` 2px | `black/90` | `black/30` | `white` | Error text in `--brand-red` |
| **Disabled** | `black/6` | `black/35` | `black/20` | `black/[0.03]` | `cursor-not-allowed` |

### Token Bindings

- **Border radius:** `rounded-[5px]` = `var(--radius-element)` = `var(--radius-xs)`
- **Checkbox radius:** `rounded-[2.5px]` = `var(--radius-inner)` = `var(--radius-2xs)`
- **Standard padding:** `px-4 py-3` (meets Fitts 44px touch target)
- **Compact padding:** `px-3 py-2` (sidebar/toolbar context)
- **Standard font:** `var(--text-sm)` (16px)
- **Compact font:** `var(--text-xs)` (12.8px)
- **Transition:** `transition-colors duration-150`

### Focus Strategy (Key Design Decision)

**Inputs/textareas/selects:** Border-color change only (no outline ring)
**Buttons/links:** Keep the global brand-red outline ring from `:focus-visible`

**Why:** Inputs already have a visible border frame. Adding a ring creates a double-frame artifact. Every major DS (Apple HIG, Material Design, Carbon, Ant Design) uses border-color change for input focus, not an additional ring.

**CSS safety net:** `report-store-additions.css` contains:
```css
input:focus-visible, textarea:focus-visible, select:focus-visible {
  outline: none;
}
```

### 📄 TEXT INPUT (Atom — inline pattern)

#### WHY
Text inputs are the most common form element. Without a unified standard, developers pick arbitrary border colors, radii, and focus styles — creating visual inconsistency that violates Gestalt Similarity.

#### WHAT
A canonical Tailwind class string applied to all `<input type="text|email|password|search|tel|url">` elements. NOT a wrapper component — just a standardized class pattern.

#### WHEN
✅ All form text inputs (ContactModal, settings, checkout)
✅ Search bars (dashboard sidebar, listing headers)
✅ Filter inputs (FilterSearchInput container pattern)
✅ Demo/documentation input instances

#### WHEN NOT
❌ Don't use for checkbox/radio (separate pattern below)
❌ Don't use for select dropdowns (use the `<select>` pattern or shadcn Select)
❌ Don't add `focus:ring-*` classes — the border-color change IS the focus indicator

#### HOW
```tsx
// Standard form input (44px touch target)
<input
  type="text"
  placeholder="Enter text..."
  className="w-full px-4 py-3 border border-black/10 rounded-[5px]
    bg-white text-black/90 placeholder:text-black/30
    hover:border-black/25
    focus:border-black/90 focus:outline-none
    disabled:border-black/6 disabled:text-black/35
    disabled:bg-black/[0.03] disabled:cursor-not-allowed
    transition-colors duration-150"
  style={{ fontSize: 'var(--text-sm)' }}
/>

// Compact/sidebar input
<input
  type="text"
  className="w-full px-3 py-2 border border-black/10 rounded-[5px]
    bg-white text-black/90 placeholder:text-black/30
    hover:border-black/25
    focus:border-black/90 focus:outline-none
    transition-colors duration-150"
  style={{ fontSize: 'var(--text-xs)' }}
/>

// Error state
<input
  className="w-full px-4 py-3 border-2 rounded-[5px]
    bg-white text-black/90 placeholder:text-black/30
    focus:outline-none transition-colors duration-150"
  style={{ borderColor: 'var(--brand-red)' }}
/>
<p className="text-xs mt-1" style={{ color: 'var(--brand-red)' }}>
  This field is required
</p>

// Or use the shadcn base (already aligned):
import { Input } from '@/app/components/ui/input';
<Input placeholder="Enter text..." />
```

---

### 📝 TEXTAREA (Atom — inline pattern)

#### WHEN
✅ Multi-line text: messages, bios, descriptions, comments

#### HOW
Same class string as text input, plus `resize-y` or `resize-none`.

```tsx
<textarea
  rows={4}
  className="w-full px-4 py-3 border border-black/10 rounded-[5px]
    bg-white text-black/90 placeholder:text-black/30
    hover:border-black/25
    focus:border-black/90 focus:outline-none
    resize-y transition-colors duration-150"
/>
```

---

### ☑️ CHECKBOX / RADIO (Atom — inline pattern)

#### WHEN
✅ Checkboxes in filter panels, settings, forms
✅ Radio groups for single-select options

#### HOW
```tsx
// Checkbox
<input
  type="checkbox"
  className="w-5 h-5 border-2 border-black/25 rounded-[2.5px]
    checked:bg-black checked:border-black
    accent-black cursor-pointer transition-colors duration-150"
/>

// Radio
<input
  type="radio"
  className="w-5 h-5 border-2 border-black/25
    accent-black cursor-pointer transition-colors duration-150"
/>
```

---

### 🔍 FILTERSEARCHINPUT (Atom — container pattern)

#### WHY
Search inputs inside filter sidebars need a container-level focus pattern (outer `<div>` shows focus state, inner `<input>` is visually suppressed) to avoid double-border artifacts and red ring leaks.

#### WHEN
✅ Filter sidebar search bars
✅ Any toolbar search with icon + clear button

#### WHEN NOT
❌ Don't use for standalone search bars (use standard input pattern with icon)

#### HOW
```tsx
import { FilterSearchInput } from '@/app/components/FilterSearchInput';

<FilterSearchInput
  value={searchValue}
  onChange={setSearchValue}
  placeholder="Search filters..."
/>
```

**Container states:** `border-black/10` → `hover:border-black/25` → `focus-within:border-black/90`
**Radius:** `rounded-[5px]`
**Font:** `var(--text-xs)` (12.8px, compact context)

---

### Files Modified in Session 38

| File | Changes |
|---|---|
| `report-store-additions.css` | Added `input/textarea/select:focus-visible { outline: none }` safety net |
| `ui/input.tsx` | Aligned shadcn Input to DS 6-state system |
| `ui/textarea.tsx` | Aligned shadcn Textarea to DS 6-state system |
| `FilterSearchInput.tsx` | Unified border tokens, removed `data-filter-search-input` dependency |
| `ContactModal.tsx` | All 3 inputs + textarea → unified classes |
| `DesignSystemDashboard.tsx` | Sidebar search → unified classes |
| `ComponentsContent.tsx` | All 14 inputs + 2 textareas + checkbox + radio → unified |
| `SpacingHelpers.tsx` | 3 inputs → unified |
| `AllSpacingTokensContent.tsx` | 2 inputs → unified |
| `AllElevationTokensContent.tsx` | 1 input → unified |
| `AllBorderRadiusTokensContent.tsx` | 3 inputs → unified |
| `ButtonDocumentation.tsx` | 2 checkboxes + 1 text input + 2 form inputs → unified |
| `ButtonControlsGuide.tsx` | 2 form inputs → unified |
| `MotionContent.tsx` | 1 input → unified |
| `ResourcesContent.tsx` | 1 input + error text color → unified |
| `theme.css` | Added UNIFIED INPUT SYSTEM documentation block |

---

## 📐 SECTIONHEADING COMPONENT (v4.0 — Prop-Based API)

### WHY
Hand-coded section headings (h2 + label + subtitle combos) were inconsistent across 20+ sections — different spacing, different label styles, and no unified CTA pattern. A prop-based component ensures every section header follows the same editorial pattern.

### WHAT
A configurable section header with Serif title, optional eyebrow label, subtitle, action CTA, and auxiliary slots. Supports heading levels 1-3.

### WHEN
✅ Every page section that needs a heading — RS organisms, case study sections, dashboard panels
✅ When you need label + heading + subtitle + action in a consistent layout
✅ When you want endSlot for ViewToggle, Badge, or other widgets next to the heading
✅ labelPulse for "live" or "new" indicators

### WHEN NOT
❌ Don't use for hero h1 in case study pages (those have custom animated layouts)
❌ Don't use the OLD children-based API (`<SectionHeading>Title</SectionHeading>`)
❌ Don't use level={1} outside of page heroes
❌ Don't nest inside another SectionHeading

### HOW
```tsx
import { SectionHeading } from '@/app/components/SectionHeading';

// Standard section heading (most common)
<SectionHeading
  level={2}
  title="Market Analysis"
  label="RESEARCH"
  subtitle="Deep dive into industry trends and growth projections"
/>

// With action CTA
<SectionHeading
  level={2}
  title="Featured Reports"
  label="FEATURED"
  action={{ text: "View All", href: "/reports" }}
/>

// With endSlot (e.g., ViewToggle)
<SectionHeading
  level={2}
  title="All Reports"
  label="BROWSE"
  endSlot={<ViewToggle view={view} onChange={setView} />}
/>

// Compact spacing (inside organisms with tight layout)
<SectionHeading
  level={3}
  title="Related Topics"
  spacing="compact"
/>

// With label pulse (live indicator)
<SectionHeading
  level={2}
  title="Daily Data Highlights"
  label="LIVE"
  labelPulse
/>

// Centered (rare — testimonials, CTAs)
<SectionHeading
  level={2}
  title="What Clients Say"
  align="center"
  maxWidth="lg"
/>
```

**Props:**
- `title`: string (required) — Rendered as Serif heading (h1/h2/h3)
- `subtitle`: string (optional) — Body text below heading
- `label`: string (optional) — Eyebrow SectionLabel above heading
- `action`: `{ text: string, href?: string, onClick?: () => void }` (optional) — CTALink
- `level`: 1 | 2 | 3 (default: 2) — Heading semantic level
- `spacing`: 'default' | 'compact' (default: 'default') — Bottom margin
- `align`: 'left' | 'center' (default: 'left')
- `maxWidth`: 'xl' | 'lg' | 'none' (default: 'none') — Subtitle width constraint
- `endSlot`: ReactNode (optional) — Right-aligned widget
- `labelEndSlot`: ReactNode (optional) — Widget next to label
- `labelPulse`: boolean (optional) — Pulse dot on label

**CRITICAL — OLD vs NEW API:**
```tsx
// OLD (v3.4) — DO NOT USE:
<SectionHeading level={2} eyebrow="X">Title</SectionHeading>

// NEW (v4.0) — ALWAYS USE:
<SectionHeading level={2} label="X" title="Title" />
```

---

## 🃏 CARD COMPONENT (v4.0 — Base Container)

### WHY
Cards were manually styled with inconsistent border, shadow, radius, and hover patterns. A unified Card atom provides typed variants, ref-based hover (no JS re-renders for hover state), and semantic `as` prop for accessibility.

### WHAT
A base content container with 3 variants (white, warm, outlined), 4 padding tiers, 4 shadow depths, hover lift + shadow intensify, and semantic element override.

### WHEN
✅ Any content container — wraps molecule cards, info blocks, stat displays
✅ When you need consistent hover lift animation
✅ When you need a clickable card (onClick + cursor pointer)
✅ As the base for molecule cards (ReportCard, StatCard compose Card internally)

### WHEN NOT
❌ Don't use for full-width sections (use SectionWrapper)
❌ Don't use for inline text blocks (just use a div)
❌ Don't add your own hover shadow logic (Card handles it via ref)
❌ Don't override border-radius (Card uses --radius-card = 10px)

### HOW
```tsx
import { Card } from '@/app/components/Card';

// Standard info card
<Card variant="white" padding="md" shadow="md">
  <h3>Card Title</h3>
  <p>Description</p>
</Card>

// Clickable card with article semantics
<Card as="article" onClick={(e) => handleClick(id)} hover>
  <img src={image} alt="" />
  <h3>{title}</h3>
</Card>

// Warm background card (on white sections)
<Card variant="warm" padding="lg" shadow="sm">
  <p>Highlighted content</p>
</Card>

// No hover, no shadow (flat)
<Card hover={false} shadow="none" padding="sm">
  <p>Static content</p>
</Card>
```

**Props:**
- `variant`: 'white' | 'warm' | 'outlined' (default: 'white')
- `padding`: 'none' | 'sm' | 'md' | 'lg' (default: 'md')
- `shadow`: 'none' | 'sm' | 'md' | 'lg' (default: 'md')
- `hover`: boolean (default: true) — Enable lift + shadow on hover
- `as`: 'div' | 'article' | 'section' (default: 'div')
- `onClick`: (e: MouseEvent) => void (optional) — Adds cursor pointer
- `className`: string, `style`: CSSProperties

**DS compliance:**
- Border radius: `var(--radius-card)` = 10px
- Shadow rest: `0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)`
- Shadow hover: `0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)`
- Border: `1px solid rgba(0,0,0,0.06)` → `rgba(0,0,0,0.10)` on hover
- Lift: `translateY(-2px)` on hover
- Transition: `0.4s cubic-bezier(0.16, 1, 0.3, 1)`

---

## 🔄 SCROLLFADE MOLECULE

### WHY
Horizontal overflow of pills, tabs, and chips needed a consistent pattern with fade edge indicators. Previously, each section wrote its own inline scroll-fade helper — the NavigationDocumentation refactor (commit `4d7d3ba`) unified all organisms to use this molecule.

### WHAT
A native `overflow-x: auto` scroll container with gradient fade masks on left/right edges that appear/disappear based on scroll position. Optional chevron navigation buttons.

### WHEN
✅ Category pill bars (ReportStoreHero, NavigationDocumentation)
✅ Sub-navigation tabs that overflow on mobile
✅ Filter chip rows
✅ Badge/tag collections that exceed container width
✅ Any inline items that overflow horizontally

### WHEN NOT
❌ Don't use for card carousels (use HorizontalScroll — it has momentum/drag)
❌ Don't use for content that should wrap (use grid layout)
❌ Don't write inline scroll-fade helpers (use this molecule)
❌ Don't nest CardReveal inside ScrollFade

### HOW
```tsx
import { ScrollFade } from '@/app/components/molecules';

// Basic pill row
<ScrollFade fadeBg="white">
  <div className="flex gap-2">
    {categories.map(c => <Badge key={c}>{c}</Badge>)}
  </div>
</ScrollFade>

// With chevron buttons (for longer lists)
<ScrollFade fadeBg="white" showButtons>
  <div className="flex gap-3">
    {tabs.map(t => <button key={t}>{t}</button>)}
  </div>
</ScrollFade>

// On dark background
<ScrollFade fadeBg="black" fadeWidth={48}>
  <div className="flex gap-2">
    {items.map(i => <Badge key={i} mode="dark">{i}</Badge>)}
  </div>
</ScrollFade>
```

**Props:**
- `children`: ReactNode (required) — Inline items to scroll
- `fadeBg`: string (default: 'white') — Background color for fade gradient
- `fadeWidth`: number (default: 32) — Fade edge width in pixels
- `showButtons`: boolean (default: false) — Show chevron nav buttons
- `className`: string — Outer wrapper class
- `style`: CSSProperties
- `innerClassName`: string — Inner scrollable div class

**Composes:** lucide-react ChevronLeft/ChevronRight (when showButtons=true)
**Uses:** ResizeObserver for dynamic scroll state detection

---

## ↔️ HORIZONTALSCROLL MOLECULE

### WHY
Card carousels need transform-based animation (not native scroll) for smooth momentum, mouse drag support, and precise positioning. Native scroll creates janky card animations and lacks drag/momentum physics.

### WHAT
A transform-based horizontal card carousel with button navigation, mouse wheel horizontal scroll, touch drag, mouse drag (grab cursor), and momentum physics. Uses `translateX()` instead of native scroll.

### WHEN
✅ Card carousels (FeaturedResearch, RecentlyViewed, UpcomingReports)
✅ Collections of full-sized cards wider than viewport
✅ When you need drag/momentum interaction
✅ FeaturedCarousel organism uses this internally

### WHEN NOT
❌ Don't use for pills/tabs/chips (use ScrollFade — much lighter)
❌ Don't use for content that fits within viewport (no need for carousel)
❌ Don't nest inside another HorizontalScroll
❌ Don't add your own transform/animation logic (this handles it)

### HOW
```tsx
import { HorizontalScroll } from '@/app/components/molecules';

// Standard card carousel
<HorizontalScroll fadeBg="white" gap="gap-4">
  {reports.map(r => (
    <div key={r.id} className="w-[300px] flex-shrink-0">
      <ReportCard layout="grid" {...r} />
    </div>
  ))}
</HorizontalScroll>

// Warm background
<HorizontalScroll fadeBg="#f5f2f1" gap="gap-6">
  {items.map(i => <StatCard key={i.id} {...i} />)}
</HorizontalScroll>
```

**Props:**
- `children`: ReactNode (required) — Cards/items to display
- `fadeBg`: string (default: 'white') — Background for fade edges
- `gap`: string (default: 'gap-4') — Tailwind gap class for items
- `className`: string — Outer wrapper class

**Features:**
- Transform-based animation (cubic-bezier(0.16, 1, 0.3, 1))
- Button navigation (ChevronLeft/Right) with dynamic visibility
- Mouse wheel → horizontal scroll (shift not required)
- Touch drag with momentum
- Mouse drag (grab cursor) with momentum
- ResizeObserver for dynamic width detection

**Composes:** lucide-react ChevronLeft/ChevronRight

---

## 📐 SECTIONWRAPPER COMPONENT (v4.0)

### WHY
Every section manually applied background, padding, and max-width with inconsistent Tailwind classes. SectionWrapper encodes the approved section pattern in one component, eliminating copy-paste errors.

### WHAT
A `<section>` element that handles background color, responsive vertical padding, responsive horizontal padding, and max-width constraint automatically.

### WHEN
✅ Every page section with a background color
✅ Every organism that needs consistent spacing
✅ RS organisms use this internally (ProductHero, StatsRow, etc.)

### WHEN NOT
❌ Full-bleed heroes with custom backgrounds/animations
❌ Inside an organism that already uses SectionWrapper (double-padding bug)
❌ Don't add `px-4 sm:px-6 md:px-8` to children — SectionWrapper handles it

### HOW
```tsx
import { SectionWrapper } from '@/app/components/SectionWrapper';

// Standard white section
<SectionWrapper background="white" spacing="lg">
  <SectionHeading level={2} title="Features" label="PRODUCT" />
  <div className="grid grid-cols-3 gap-6">{/* cards */}</div>
</SectionWrapper>

// Warm alternating section
<SectionWrapper background="warm" spacing="lg" id="methodology">
  <SectionHeading level={2} title="Methodology" label="PROCESS" />
  {/* content */}
</SectionWrapper>

// Black hero section
<SectionWrapper background="black" spacing="xl">
  <SectionHeading level={1} title="Research Hub" label="REPORT STORE" />
  {/* hero content */}
</SectionWrapper>

// Edge-to-edge override for sidebar layouts
<SectionWrapper background="white" className="!py-0">
  <div className="flex">
    <SidebarPanel /><CardListing />
  </div>
</SectionWrapper>
```

**Props:**
- `background`: 'white' | 'warm' | 'black' | 'neutral50'
- `spacing`: 'sm' | 'md' | 'lg' | 'xl' (default: 'lg')
- `maxWidth`: 'content' | 'wide' | 'full' (default: 'wide' = 1200px)
- `className`: string — Additional classes on `<section>`
- `id`: string — HTML id for anchor linking
- `children`: ReactNode

**Spacing tiers:**
| Tier | Mobile | Desktop |
|------|--------|---------|
| sm | 32px | 48px |
| md | 40px | 64px |
| lg | 48px | 80px |
| xl | 64px | 96px |