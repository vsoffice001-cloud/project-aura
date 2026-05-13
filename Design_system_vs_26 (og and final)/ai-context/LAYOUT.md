# Design System — Layout & Page Assembly

**Module:** `ai-context/LAYOUT.md`  
**Version:** 4.3  
**Date:** 2026-03-18  
**Source of truth:** `/src/styles/theme.css`, `/src/app/components/Container.tsx`

---

## Spacing System (Base-10 Scale)

### WHY
Predictable 4px increments create rhythm, make design decisions faster, ensure visual harmony.

### WHAT
```css
--space-1: 0.25rem;  /* 4px - Tight spacing */
--space-2: 0.5rem;   /* 8px - Compact */
--space-3: 0.75rem;  /* 12px - Small gaps */
--space-4: 1rem;     /* 16px - Default */
--space-6: 1.5rem;   /* 24px - Medium */
--space-8: 2rem;     /* 32px - Large */
--space-12: 3rem;    /* 48px - Section spacing */
--space-16: 4rem;    /* 64px - Large sections */
--space-20: 5rem;    /* 80px - Very large */
--space-24: 6rem;    /* 96px - Maximum */
```

### WHEN
- `--space-12` (48px) for spacing between sections
- `--space-6` (24px) for spacing within sections
- `--space-4` (16px) for element spacing

### WHEN NOT
- Don't use arbitrary values (stick to scale)
- Don't use Tailwind spacing classes that break scale

---

## Container Width System

### WHY
Consistent width constraints ensure optimal readability. Based on Baymard Institute: 50-75 characters per line is optimal.

### WHAT
```css
--container-page: 75rem;       /* 1200px - Page shell, hero, navbar */
--container-content: 62.5rem;  /* 1000px - Standard sections, card grids */
--container-narrow: 56.25rem;  /* 900px  - CTAs, testimonials, focused */
--container-prose: 43.75rem;   /* 700px  - Paragraph text (~65-70 chars) */
--container-compact: 37.5rem;  /* 600px  - Short descriptions */
```

### Decision Table

| Token | Use Case |
|-------|----------|
| `--container-page` | Outer page shell, full-width heroes, navigation |
| `--container-content` | Standard section content, card grids |
| `--container-narrow` | Focused CTAs, testimonials, forms |
| `--container-prose` | Long-form paragraphs (~65-70 chars at 16px) |
| `--container-compact` | Short descriptions (~55-60 chars at 20px) |

### WHEN NOT
- Don't use `--container-page` for body text (too wide)
- Don't use `--container-compact` for card grids (too narrow)
- Don't hardcode `max-w-[1200px]` — use `max-w-[var(--container-page)]`
- Don't use `max-w-6xl` — use container tokens instead

### HOW
```tsx
// Standard section layout (manual)
<section className="py-12 sm:py-16 md:py-20 bg-white">
  <div className="mx-auto px-4 sm:px-6 md:px-8 max-w-[var(--container-content)]">
    {/* Section content */}
  </div>
</section>

// Or use Container component:
import { Container } from '@/app/components/Container';
<Container width="content">{/* content */}</Container>

// Or use SectionWrapper (PREFERRED for organisms):
import { SectionWrapper } from '@/app/components/SectionWrapper';
<SectionWrapper background="white" spacing="lg" maxWidth="wide">
  {/* Content — padding + max-width handled automatically */}
</SectionWrapper>
```

---

## SectionWrapper (v4.0 — Preferred Section Container)

### WHY
Eliminates repetitive section boilerplate. Encodes background + padding + max-width in one component.

### WHAT
```tsx
import { SectionWrapper } from '@/app/components/SectionWrapper';

<SectionWrapper
  background="white | warm | black | neutral50"
  spacing="sm | md | lg | xl"    // default: lg
  maxWidth="content | wide | full"  // default: wide (1200px)
  className=""
  id="section-anchor"
>
  {/* Content */}
</SectionWrapper>
```

### Spacing Tiers

| Tier | Mobile | Desktop |
|------|--------|---------|
| `sm` | 32px | 48px |
| `md` | 40px | 64px |
| `lg` | 48px | 80px (default) |
| `xl` | 64px | 96px |

### WHEN
- Every page section that has a background color
- Every organism that needs consistent vertical/horizontal spacing

### WHEN NOT
- Full-bleed heroes with custom layouts (use raw `<section>`)
- Inside an organism that already wraps itself in SectionWrapper (double-padding bug)
- Override with `className="!py-0"` for sidebar sections that need edge-to-edge

**CRITICAL:** Do NOT add `px-4 sm:px-6 md:px-8` inside SectionWrapper children — it already handles responsive padding.

---

## Responsive Padding (Mobile-First)

### WHAT
```css
/* Horizontal Padding */
--padding-mobile: 1rem;    /* 16px - Mobile (0-639px) */
--padding-tablet: 1.5rem;  /* 24px - Tablet (640-1023px) */
--padding-desktop: 2rem;   /* 32px - Desktop (1024px+) */

/* Section Vertical Spacing */
--section-py-mobile: 3rem;   /* 48px - py-12 */
--section-py-tablet: 4rem;   /* 64px - sm:py-16 */
--section-py-desktop: 5rem;  /* 80px - md:py-20 */
```

### Standard Pattern
```tsx
<section className="py-12 sm:py-16 md:py-20">
  <div className="px-4 sm:px-6 md:px-8 mx-auto max-w-[var(--container-content)]">
    {/* Content */}
  </div>
</section>
```

### Mobile-First UX Laws
- **Fitts's Law**: Touch targets min 44px, generous tap spacing
- **Miller's Law**: Reduce visible options on small screens
- **Content stacking**: 1-col below 640px, 2-col at 768px, 3-col at 1024px+

---

## Section Pattern (Background Alternation)

### Case Study Sequence

```
 1. HeroSection              → BLACK
 2. ClientContextSection     → WHITE
 3. ChallengesSection        → WARM (#f5f2f1)
 4. EngagementObjectives     → WHITE
 5. MethodologySection       → WARM
 6. ImpactSection            → WHITE
 7. ValuePillarsSection      → WHITE (border-t separator)
 8. TestimonialSection       → WHITE (border-t separator)
 9. ResourcesSection         → BLACK (dark gradient mesh)
10. FinalCTASection          → WHITE (border-t separator)
```

### Report Store Home Sequence

```
 1. ReportStoreHero          → BLACK
 2. QuickAccessBar           → NEUTRAL50 (#fafafa)
 3. FeaturedResearch         → WHITE
 4. KeyMarketIndicators      → WARM
 5. RecommendedForYou        → WHITE
 6. DailyDataHighlights      → WHITE (border)
 7. AnalystPicks             → WARM
 8. IndustrySectorsGrid      → WHITE
 9. ResearchMethodology      → WARM
10. CustomResearchCTA        → BLACK
```

### Report Store Listing Sequence

```
IndustryFocusBanner → ListingToolbar → FiltersPanel + CardListing (sidebar layout)
```

### Section Templates

```tsx
// Black section (hero moments)
<SectionWrapper background="black" spacing="xl">
  {/* Hero, Final CTA */}
</SectionWrapper>

// White section (standard content)
<SectionWrapper background="white" spacing="lg">
  <SectionHeading level={2} title="Title" label="CATEGORY" />
  {/* Objectives, Impact */}
</SectionWrapper>

// Warm section (highlighted content)
<SectionWrapper background="warm" spacing="lg">
  <SectionHeading level={2} title="Title" label="CATEGORY" />
  {/* Challenges, Methodology */}
</SectionWrapper>
```

---

## Page Assembly Guide (v4.3)

### Case Study Page Shell

```tsx
import { Navbar } from '@/app/components/Navbar';
import { ReadingProgressBar } from '@/app/components/ReadingProgressBar';
import { ScrollToTop } from '@/app/components/ScrollToTop';
import { StickyCTA } from '@/app/components/StickyCTA';
import { ContactModal } from '@/app/components/ContactModal';

export default function CaseStudyPage() {
  const [showContact, setShowContact] = useState(false);
  return (
    <>
      <ReadingProgressBar />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <ClientContextSection />
        <ChallengesSection />
        {/* ... remaining sections in order */}
      </main>
      <ScrollToTop />
      <StickyCTA />
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
    </>
  );
}
```

### Report Store Page (Declarative)

```tsx
import { ProductPageTemplate } from '@/app/components/organisms';
import { FEATURED_REPORTS, STAT_DATA, ALL_REPORTS } from '@/app/components/data';

<ProductPageTemplate
  hero={{ label: 'Report Store', title: 'Research Hub', ... }}
  featured={{ label: 'Featured', title: 'Editor Picks', children: ... }}
  stats={{ label: 'Indicators', title: 'Key Metrics', stats: STAT_DATA }}
  browse={{ label: 'Browse', title: 'All Reports', items: ALL_REPORTS, renderCard: ... }}
  cta={{ label: 'Custom', title: 'Need Custom Research?', primaryText: 'Contact Us' }}
  afterStats={<DailyDataHighlights />}
  afterBrowse={<AnalystPicks />}
/>
```

### Report Store Page (Manual Organism Composition)

```tsx
import {
  ReportStoreHero, QuickAccessBar, FeaturedResearch,
  KeyMarketIndicators, RecommendedForYou, DailyDataHighlights,
  AnalystPicks, IndustrySectorsGrid, ResearchMethodology,
  CustomResearchCTA,
} from '@/app/components/organisms';

// Each organism self-contains its SectionWrapper — just stack them:
<ReportStoreHero />
<QuickAccessBar />
<FeaturedResearch />
<KeyMarketIndicators />
<RecommendedForYou />
<DailyDataHighlights />
<AnalystPicks />
<IndustrySectorsGrid />
<ResearchMethodology />
<CustomResearchCTA />
```

### Section Type Recipes

| Type | Components | Background |
|------|-----------|------------|
| **Hero** | `ProductHero` or `SectionHeading level={1}`, dual CTAs | Black |
| **Content + Cards** | `SectionHeading`, `Card` in grid or `BrowseGrid` organism | White or Warm |
| **Methodology** | `StepPill` badges, sequential steps, connecting lines | Warm |
| **Metrics** | `StatsRow` organism or `StatCard` molecules | White or Warm |
| **Testimonial** | Serif quote, attribution, `Container width="narrow"` | White (border-t) |
| **Resources** | `ResourceCard` (7 variants), Masonry grid, `useResponsiveGutter` | Black (gradient) |
| **Final CTA** | `CTABanner` organism or Brand button, `Container width="narrow"` | White or Black |
| **Listing** | `ListingToolbar` + `FiltersPanel` + `CardListing` | White |
| **Carousel** | `FeaturedCarousel` organism or `HorizontalScroll` molecule | White |

### Component Selection Table

| Need | Component | Import |
|------|-----------|--------|
| Section wrapper | `SectionWrapper` | `@/app/components/SectionWrapper` |
| Heading with eyebrow | `SectionHeading` (v4.0 prop-based) | `@/app/components/SectionHeading` |
| Width constraint | `Container` | `@/app/components/Container` |
| Content card | `Card` | `@/app/components/Card` |
| Report card | `ReportCard` | `@/app/components/molecules` |
| Survey card | `SurveyCard` | `@/app/components/molecules` |
| Stat card | `StatCard` | `@/app/components/molecules` |
| Resource card | `ResourceCard` | `@/app/components/ResourceCard` |
| CTA button | `Button` | `@/app/components/Button` |
| Exploratory link | `CTALink` | `@/app/components/CTALink` |
| Inline link | `InlineLink` | `@/app/components/InlineLink` |
| Section label | `SectionLabel` | `@/app/components/Badge` |
| Pill/tab overflow | `ScrollFade` | `@/app/components/molecules` |
| Card carousel | `HorizontalScroll` | `@/app/components/molecules` |
| Loading state | `SkeletonCard` | `@/app/components/molecules` |
| No results | `EmptyState` | `@/app/components/molecules` |
| Card entrance | `CardReveal` | `@/app/components/molecules` |
| Scroll fade-in | `FadeInSection` | `@/app/components/FadeInSection` |

### Typography Token Quick Reference

| Element | Token | Size |
|---------|-------|------|
| Hero h1 | `--text-3xl` | 48.8px |
| Section h2 | `--text-2xl` | 39px |
| Subsection h3 | `--text-xl` | 31.25px |
| Body text | `--text-sm` | 16px |
| Labels/eyebrows | `--text-xs` | 12.8px |
| Navigation | `--text-nav` | 14px |
| Micro-labels | `--text-card-micro` | 10px |

---

## Border Radius Decision Table

| Element | Radius | Token |
|---------|--------|-------|
| Images | 2.5px | `--radius-image` |
| Buttons, small cards, badges | 5px | `--radius-button` |
| Large cards, modals | 10px | `--radius-card` |

---

**v4.3 | March 18, 2026 | Part of [ai-context/](.) module system**
