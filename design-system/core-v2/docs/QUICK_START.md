# Ken Research Design System · core-v2 · QUICK START

**Version:** 1.0 (port of OG `QUICK_START_PROMPT.md` v4.3 · 2026-03-18) · **Updated:** 2026-05-14
**Package:** `@kenresearch/design-system` (core-v2)
**Stack:** Next.js 14/15 (App Router · RSC) · React 18 · Tailwind v4 · shadcn/ui · Framer Motion
**Status:** 100% OG `Design_system_vs_26` coverage · ~168 components

> **Paste this whole doc into any new AI / agent / dev session to give it full Ken DS context.**
> **Single paste = full playbook.** No need to scatter across 30 docs.
> Pair with [ANTI_PATTERNS.md](./ANTI_PATTERNS.md), [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md), [PATTERNS.md](./PATTERNS.md), [RECIPES.md](./RECIPES.md), and [tokens.css](../../tokens/build/tokens.css) when you need depth.

---

## 0 · Reading order (15-min onboarding)

1. **This doc (QUICK_START.md)** — playbook · tokens · patterns · 10 commandments
2. **[ANTI_PATTERNS.md](./ANTI_PATTERNS.md)** — 16 categories of "never do this" (read before you write)
3. **[COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md)** — intent→component decision tree + import paths
4. **[../../tokens/build/tokens.css](../../tokens/build/tokens.css)** — canonical token values (DTCG · Style Dictionary v4)
5. **[PATTERNS.md](./PATTERNS.md)** + **[RECIPES.md](./RECIPES.md)** — composition patterns + page-build recipes

If you only have 5 minutes: read sections 1 (Stack rules), 6 (Patterns), and 9 (Anti-pattern hot-list) below.

---

## 1 · Stack rules · The 10 Commandments (core-v2 adapted)

> Sourced verbatim from V0.2 `MASTER_COMPONENT_INDEX.md:287-338` (`worked-examples/v02-for-design-system/documentation-method.md` L114-125) · stack-adjusted for core-v2 (Next.js · Tailwind v4 · tokens.css).

### 1. **Consistent Padding** — codified tokens · NOT magic numbers

```tsx
// ✅ DO — use codified tokens
<section className="px-[var(--section-px-base)] lg:px-[var(--section-px-lg)] py-[var(--section-py-mobile)] sm:py-[var(--section-py-tablet)] md:py-[var(--section-py-desktop)]">

// ❌ DON'T — V0.2 used magic numbers (84.375px · 112.5px · 24/32 py)
<section className="px-[84.375px] lg:px-[112.5px] py-24 lg:py-32">
```

OG V0.2 derivation (`report-pdp-anatomy.md:200-203`): *"Container padding: `px-[84.375px] lg:px-[112.5px]` ← magic numbers (no token) · Section py: `py-24 lg:py-32` (96px / 128px desktop · 96px mobile) · Tokens needed on port: `--section-px-base = 84.375px` · `--section-px-lg = 112.5px`"*

**PREFERRED:** Use `<SectionWrapper>` atom which handles all padding internally:
```tsx
<SectionWrapper background="white" spacing="lg" maxWidth="content">
  {/* content — no px/py needed */}
</SectionWrapper>
```

### 2. **Color Semantics** — RED = brand / action · PURPLE = data · GREY = content

- **RED `var(--color-brand-red)`** (= `#b01f24`) — CTAs ONLY (≤5% of any view · 92-5-3 rule)
- **PURPLE `var(--color-accent-purple-600)`** (= `#806ce0`) — data signal · stat cards · chart shadows · content icons
- **GREY (foundation black tints)** — content / structure / 92% of surfaces
- **SEMANTIC `green/amber/rose`** — success / warning / error · NEVER substitute for brand red
- **DARK `#141016`** — footer-only near-black (one notch lighter than pure `#000` so "Ken" wordmark doesn't crush · `footer-anatomy.md:27`)

> OG verbatim (`colors.md:55-58 · COLORS.md:13`): *"The single most important color rule: 92% foundation, 5% brand, 3% accent."*

### 3. **Font Usage** — Noto Serif h1-h6 only · DM Sans body · NO italic on display

```tsx
// ✅ Editorial headings — Noto Serif inline
<h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', fontWeight: 300 }}>
  Section title
</h2>

// ✅ Body — DM Sans inherited via html root
<p style={{ fontSize: 'var(--text-sm)' }}>Body copy</p>

// ❌ NEVER
<h2 className="text-3xl italic font-bold">Section title</h2>
// — bypasses scale · italic on display = academic feel (not editorial)
```

Pairing law (`typography.md:73-80`): *"Serif headings + Sans body = Maximum contrast, editorial feel. All UI chrome (buttons, badges, nav, forms) = ALWAYS Sans. NEVER use Serif for body text, buttons, labels, or navigation. NEVER mix more than 2 custom typefaces."*

Implementation discipline (`theme.css:31-38`): *"html root is set to DM Sans — everything inherits sans by default. There is NO CSS rule that makes headings serif automatically. Components must SET serif inline: `fontFamily: 'var(--font-serif)'`."*

### 4. **Alternating Backgrounds** — white / warm · strict recipe per page

- **Editorial light (DEFAULT)** — `#ffffff` ↔ warm `var(--color-ramp-warm-300)` (= `#f5f2f1`)
- **Cinematic dark** — `#0a0a0c` / `#000000` (hero · resources sections only)
- **Strict alternation per recipe** — see section 6 below + `og-audit/recipes/page-recipes.md`
- **3 back-to-back whites?** Add `border-t border-black/10` between (BorderTopSeparator pattern)

OG inline (`theme.css:308`): *"BASE - Current section backgrounds"* → warm-300 is the editorial signature alt-bg.

### 5. **Icon Library** — Lucide-only (`lucide-react`) · NO Phosphor · NO MUI

```tsx
// ✅ DO
import { ArrowUpRight, ChevronDown, Search, Mail } from 'lucide-react';

// ❌ NEVER
import { ArrowUpRight } from '@phosphor-icons/react';  // V0.2's drift
import ArrowUpward from '@mui/icons-material/ArrowUpward'; // alien stack
```

Use `iconColors.content` (`#806ce0` purple) for data/content icons · `iconColors.utility` (`#737373` grey) for UI chrome. Never per-icon custom hex.

> V0.2 ran dual libraries (Phosphor + Lucide) — flagged as gap in `coding-differences-from-og.md`. core-v2 standardizes on Lucide.

### 6. **Shadow Hierarchy** — `sm` factual · `md` interactive · `card-hover` lift

```tsx
// Token reference (Card.tsx:44-46 core-v2)
boxShadow: 'var(--shadow-sm)'     // factual content · no hover
boxShadow: 'var(--shadow-md)'     // interactive cards · default state
boxShadow: 'var(--shadow-card-hover)' // hover lift · purple-tinted for data cards

// Accent purple shadow for data signal (StatCard · MarketAnalysis cards)
boxShadow: '0px 8px 24px rgba(127, 95, 227, 0.15)'  // → wrap in token
```

OG hierarchy: 5-tier neutral (`--shadow-none → -2xl`) + purple-accent (`--shadow-accent-*`) for premium data cards. core-v2 currently surfaces 3 tiers — escalate if you need `-xl/-2xl` for modal/drawer overlays.

### 7. **Hover States** — 300ms default · `cubic-bezier(0.4, 0, 0.2, 1)` (Material ease-in-out)

```tsx
// ✅ DO — Tailwind utility (core-v2 standard)
<div className="transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">

// ✅ DO — token reference (preferred when available)
<div style={{ transition: `all var(--motion-duration-fast) var(--motion-easing-smooth)` }}>

// ❌ NEVER — off-scale duration
<div className="duration-[450ms]">
```

Tri-modal hover language by content type (`report-pdp-anatomy.md:206-211`):

| Content type | Hover behavior | Use for |
|---|---|---|
| **Purple shadow** | `shadow-purple-md` + `translateY(-2px)` | Data cards (Stat · Icon · Segmentation · Text) |
| **Static grey** | No hover | Static content (Timeline · Stakeholder · Methodology) |
| **Border darken** | `border-grey-300` on hover | Comparison parameters · table-like |
| **Red gradient** | Bg gradient shift + scale-105 | FinalCTA only |

**`prefers-reduced-motion` is MANDATORY** — wire via `useReducedMotion()` (Framer) or `motion-reduce:transition-none` (Tailwind). WCAG 2.3.3 hard requirement (`motion.md:200-228`).

### 8. **Grid Responsive** — 1col mobile · 2col tablet · 2-4col desktop

```tsx
// Canonical responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// 4-col when dense (Challenges · Stakeholder grid)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

// Breakpoints: < 640 mobile (1col) · 640-1023 tablet (2col) · ≥ 1024 desktop (2-4col)
```

Mobile-first laws (`theme.css:71-76`): *"Fitts's Law: Touch targets min 44px · Miller's Law: Reduce visible options on small screens · Hick's Law: Simpler choices on mobile · Proximity: Tighter grouping on mobile · Content stacking: 1-column below 640px, 2-col at 768px, multi-col at 1024px+."*

### 9. **Component Composition** — DRY · use DS atoms · NEVER re-implement

```tsx
// ✅ DO
import { Button, Card, Badge } from '@kenresearch/design-system/atoms';
<Button variant="brand" size="md">Book a call</Button>

// ❌ NEVER
<button className="bg-[#b01f24] text-white px-6 py-3 rounded">Book a call</button>
// — loses shimmer · loses brand · loses a11y · loses reduced-motion · loses focus ring
```

This is anti-pattern Cat 13.8 (`ANTI_PATTERNS.md`). Compose from DS atoms. Never re-implement atoms inline. Legacy `core/` v1 is **read-only** — port to `core-v2/` if you need to extend.

### 10. **Accessibility** — semantic HTML · ariaLabel on icon-only · WCAG AA · 44px touch · respect `prefers-reduced-motion`

```tsx
// Icon-only button — ariaLabel MANDATORY
<Button variant="ghost" iconOnly ariaLabel="Close modal" size="sm">
  <X />
</Button>

// Touch-target floor — 44px (xs button exempt · card-footer context only)
// WCAG 2.5.5 baseline · checkable via inspect → min-height ≥ 44px

// Skip link — every page top
<SkipLink href="#main-content">Skip to main content</SkipLink>

// Live region — for dynamic announcements
<div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
  {announcement}
</div>
```

WCAG mapping (`motion.md:200-228`): 2.3.3 Animation from Interactions (Level AAA) · 2.5.5 Target Size (Level AAA) · 1.4.3 Contrast Minimum (Level AA).

---

## 2 · Token quick-reference (copy-paste)

> Full canonical values in `design-system/tokens/build/tokens.css`. Excerpted here for paste-friendly playbook use. core-v2 names = OG names with `--color-*`, `--typography-*`, `--spacing-N` prefixes (3-tier industry-standard).

### 2.1 Colors

```css
/* Foundation neutrals (92%) */
--color-foundation-black: #000000;
--color-foundation-white: #ffffff;
--color-ramp-warm-300:    #f5f2f1;  /* BASE editorial section bg */
--color-ramp-warm-200:    #f9f7f6;  /* soft card bg */
--color-ramp-warm-500:    #eae5e3;  /* borders */
--color-grey-800:         #141016;  /* footer-only near-black */
--color-grey-900:         #0a0a0a;  /* cinematic dark */

/* Black tint scale */
--color-foundation-black-50:  #fafafa;
--color-foundation-black-100: #f5f5f5;
--color-foundation-black-200: #e5e5e5;
--color-foundation-black-300: #d4d4d4;
--color-foundation-black-400: #a3a3a3;  /* placeholder */
--color-foundation-black-500: #737373;  /* utility icons · secondary text */
--color-foundation-black-700: #404040;
--color-foundation-black-900: #171717;

/* Brand red (5%) — CTAs ONLY */
--color-brand-red:        #b01f24;  /* PRIMARY */
--color-brand-red-hover:  #8f181d;  /* :hover (-10% L*) */
--color-brand-red-active: #771419;  /* :active (-15% L*) */

/* Accent purple — data signal · 3% */
--color-accent-purple-600: #806ce0;  /* BASE · content icons · data shadows */
--color-accent-purple-300: #c4bef7;  /* badges */
--color-accent-purple-100: #efedfd;  /* hover bg */

/* Accent siblings (one per section · never mix >2) */
--color-accent-periwinkle-500: #c3c6f9;  /* trust */
--color-accent-coral-600:      #ea7a5f;  /* warmth */
--color-accent-perano-500:     #dfeafa;  /* calm / data */

/* Semantic state — NEVER substitute for brand red */
--color-semantic-success-500: #10b981;  /* green */
--color-semantic-success-600: #059669;
--color-semantic-warning-500: #f59e0b;  /* amber */
--color-semantic-error-500:   #f43f5e;  /* rose · NOT brand red */
--color-semantic-error-600:   #e11d48;

/* SWOT semantic red (different from brand red) */
/* Use #dc2626 for SWOT challenges/threats (WCAG-AA on white) */

/* Label opacity tokens — auto-adapt to any surface */
--label-on-black: rgba(255, 255, 255, 0.40);
--label-on-white: rgba(0, 0, 0, 0.40);
--text-primary:   #000000;
--text-secondary: rgba(0, 0, 0, 0.60);
```

### 2.2 Typography — Major Third (1.25×) scale

```css
/* Font families */
--font-sans:  'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-serif: 'Noto Serif', Georgia, 'Times New Roman', serif;
--font-mono:  'SF Mono', 'Fira Code', 'Roboto Mono', monospace;

/* Major Third scale (1.25×) anchored at 16px */
--typography-size-xs:   0.8rem;    /* 12.8px · labels · metadata */
--typography-size-sm:   1rem;      /* 16px · BASE body (90% of all text) */
--typography-size-base: 1.25rem;   /* 20px · large body · card titles (4+ cards) */
--typography-size-lg:   1.563rem;  /* 25px · card titles (2-3 cards) */
--typography-size-xl:   1.953rem;  /* 31.25px · subsection h3 */
--typography-size-2xl:  2.441rem;  /* 39px · SECTION h2 (NEW STANDARD) */
--typography-size-3xl:  3.052rem;  /* 48.8px · HERO h1 only */
--typography-size-4xl:  3.815rem;  /* 61px · rare display */
--typography-size-5xl:  4.768rem;  /* 76.3px · reserved */

/* Outside-scale exceptions */
--typography-size-compact:    0.875rem;  /* 14px · dense 4+ card body */
--typography-size-nav:        0.875rem;  /* 14px · nav labels · TOC · eyebrows */
--typography-size-card-micro: 0.625rem;  /* 10px · counts · NEW badges · avatar initials */

/* Weights */
--font-weight-light:    300;  /* hero/section headings (Noto Serif) */
--font-weight-normal:   400;  /* body */
--font-weight-medium:   500;
--font-weight-semibold: 600;  /* labels · buttons · nav */
--font-weight-bold:     700;  /* button label · footer column heading */

/* Line heights (inverse to size · tighter for big · looser for small) */
/* 5xl/4xl: 1.1 · 3xl: 1.2 · 2xl: 1.3 · xl: 1.4 · lg: 1.5 · base/sm: 1.6 · xs: 1.5 */
```

### 2.3 Spacing — 4px base · t-shirt + numeric aliases

```css
--spacing-base-unit: 4px;

/* T-shirt scale (semantic) */
--space-2xs: 0.25rem;  /* 4px  · tightest inline */
--space-xs:  0.5rem;   /* 8px  · icon padding */
--space-sm:  0.75rem;  /* 12px · between badges */
--space-md:  1rem;     /* 16px · DEFAULT element spacing */
--space-lg:  1.5rem;   /* 24px · between cards */
--space-xl:  2rem;     /* 32px · between blocks */
--space-2xl: 3rem;     /* 48px · section spacing mobile */
--space-3xl: 4rem;     /* 64px · sections tablet */
--space-4xl: 6rem;     /* 96px · XL sections */
--space-5xl: 8rem;     /* 128px · max */

/* Numeric aliases (Tailwind-aligned · 4 = 1rem = 16px) */
--spacing-4:  var(--space-md);    /* 16px */
--spacing-6:  var(--space-lg);    /* 24px */
--spacing-12: var(--space-2xl);   /* 48px */

/* Containers (Baymard readability: 50-75 chars/line @ 16px) */
--container-page:    75rem;     /* 1200px · outer shell · navbar · full-bleed */
--container-content: 62.5rem;   /* 1000px · sections · card grids */
--container-narrow:  56.25rem;  /* 900px · CTAs · testimonials */
--container-prose:   43.75rem;  /* 700px · paragraphs · ~65-70 chars IDEAL */
--container-compact: 37.5rem;   /* 600px · descriptions · methodology blurbs */

/* Responsive horizontal padding */
--padding-mobile:  1rem;     /* 16px */
--padding-tablet:  1.5rem;   /* 24px */
--padding-desktop: 2rem;     /* 32px */

/* Section vertical padding (mobile-first) */
--section-py-mobile:  3rem;   /* 48px = py-12 */
--section-py-tablet:  4rem;   /* 64px = sm:py-16 */
--section-py-desktop: 5rem;   /* 80px = md:py-20 */

/* V0.2-derived section horizontal padding (for PDP-style reports) */
--section-px-base: 84.375px;  /* lg breakpoint base */
--section-px-lg:   112.5px;   /* desktop */

/* Composition pairs */
--pair-label-heading:        0.75rem;  /* 12px gap eyebrow→title */
--pair-heading-description:  1rem;     /* 16px gap title→body */
--section-header-mb:         3rem;     /* 48px gap after header block */
--text-measure:              43.75rem; /* 700px max prose width */
```

### 2.4 Shadows — 5-tier neutral + button + card-hover

```css
--shadow-none:        none;
--shadow-sm:          0 1px 2px rgba(0,0,0,0.05);   /* factual content */
--shadow-md:          0 4px 6px rgba(0,0,0,0.07);   /* interactive default */
--shadow-lg:          0 10px 15px rgba(0,0,0,0.10); /* hover lift */
--shadow-xl:          0 20px 25px rgba(0,0,0,0.10); /* modal */
--shadow-2xl:         0 25px 50px rgba(0,0,0,0.25); /* overlay */

/* Card hover (purple-tinted for data cards · brand signature) */
--shadow-card-hover:  0 8px 24px rgba(127, 95, 227, 0.15);

/* Accent purple glow (premium data cards) */
--shadow-accent-purple-sm: 0 2px 8px rgba(128, 108, 224, 0.08);
--shadow-accent-purple-md: 0 4px 16px rgba(128, 108, 224, 0.12);
--shadow-accent-purple-lg: 0 8px 24px rgba(128, 108, 224, 0.18);

/* Button shadows (brand-red gradient) */
--shadow-button-default: 0 2px 8px rgba(176, 31, 36, 0.25);
--shadow-button-hover:   0 4px 16px rgba(176, 31, 36, 0.35);
```

### 2.5 Radius

```css
--radius-sm:     5px;    /* small cards · badges · inputs */
--radius-button: 5px;    /* buttons (`--radius-element` alias) */
--radius-card:   10px;   /* large cards · modals */
--radius-image:  2.5px;  /* image corners */
--radius-pill:   99px;   /* badges · search bar · chips */
--radius-full:   9999px; /* avatars · circular icons */
```

### 2.6 Motion — 4 durations · 4 easings · named patterns

```css
/* Durations */
--motion-duration-instant: 150ms;  /* state changes · input border */
--motion-duration-fast:    300ms;  /* hover · button press · card transition (DEFAULT) */
--motion-duration-normal:  600ms;  /* modal entrance · panel slide · scroll-into-view */
--motion-duration-slow:    900ms;  /* hero unfolds · max 1/page */

/* Easings */
--motion-easing-smooth: cubic-bezier(0.22, 1, 0.36, 1);    /* default UI · "premium settled" */
--motion-easing-out:    cubic-bezier(0, 0, 0.2, 1);        /* entrance · hover · most common */
--motion-easing-sharp:  cubic-bezier(0.4, 0, 0.2, 1);      /* modal · drawer · "transport" */
--motion-easing-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* delight · success · max 1-2/page */

/* Named patterns */
--motion-shimmer-duration: 700ms;       /* button/badge shimmer · brand signature */
--motion-stagger-step:     80ms;        /* card stagger delay */
--motion-entrance-y:       16px;        /* fade-up entrance translate */
```

**MANDATORY reduced-motion guard:**
```tsx
const reduced = useReducedMotion();
<motion.div animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }} />
```

### 2.7 Button sizing (OG-aligned · NOT the type scale)

| Size | Height | Padding-x | Font | Use for |
|---|---|---|---|---|
| `xs` | 28px | 10px | `--typography-size-xs` (12.8px) | Card footer · table actions ONLY (touch-target exempt) |
| `sm` | 40px | 20px | `--typography-size-compact` (14px) | Navbar · compact density |
| `md` | 48px | 28px | `--typography-size-sm` (16px) | **DEFAULT** · most CTAs |
| `lg` | 56px | 32px | 17px | Hero · pricing standout |
| `xl` | 64px | 40px | 18px | Editorial hero · landing only |

> **OG aligned** (`spacing.md:208-226`). Min-widths: sm 80px · md 112px · lg 144px (WCAG 2.5.5).

---

## 3 · Component import quick-reference

```tsx
// Atoms (~41 components)
import {
  Button, Card, Badge, SectionHeading, SectionWrapper, SectionLabel,
  Container, IconBadge, AnimatedArrow, CTALink, InlineLink, TextLink,
  FilterChip, FilterCheckbox, FilterSearchInput, ReadingProgressBar,
  ScrollProgress, ScrollToTop, SkipLink, Avatar, Tooltip, Divider,
  DropdownChevron, HamburgerIcon, ImageWithFallback, LogoButton,
  MenuItem, ResourceCard, StatusDot, ViewToggle, ContactModal,
} from '@kenresearch/design-system/atoms';

// Molecules (~15 components)
import {
  ReportCard, StatCard, DataHighlightCard, AnalystPickCardB,
  CategoryListCard, SurveyCard, SkeletonCard, EmptyState,
  ScrollFade, HorizontalScroll, CardReveal, CardListing,
  MobileFilterSheet, FilterAccordion, ActiveFilterChip,
} from '@kenresearch/design-system/molecules';

// Organisms (~14 components)
import {
  TopNavigation, PrimaryNav, SecondaryBar, CaseStudyNavbar,
  ProductHero, HeroSection, FinalCTASection, CTABanner,
  StatsRow, FeaturedCarousel, BrowseGrid, FiltersPanel, ListingToolbar,
  MethodologySection, ChallengesSection, ImpactSection,
  TestimonialSection, ValuePillarsSection, ResourcesSection,
  EngagementObjectivesSection, Footer, StickyCTA, FloatingCTA,
} from '@kenresearch/design-system/organisms';

// Hooks (23 hooks)
import {
  useReducedMotion, useScrollSpy, useActiveSection, useNavDropdown,
  useMobileMenu, useResponsiveGutter, useShimmer, useRipple,
} from '@kenresearch/design-system/hooks';

// Tokens (TS API)
import { colors, typography, spacing, duration, easing } from '@kenresearch/design-system/tokens';
```

**Path discipline:** Never import from internal paths (`/atoms/Button.tsx` directly). Always go through the package barrel. Internal paths break on package boundary changes.

---

## 4 · Page-build playbook (10 steps · canonical Aura flow)

> Aligns with workspace's **9-step page-build process** (`CLAUDE.md` + `feedback_page_build_process.md`). 10 steps below = those 9 + a "hand off" exit gate.

### Step 1 — INTAKE (read first · always)

Read:
- **This doc** (QUICK_START.md) — playbook + tokens
- **[ANTI_PATTERNS.md](./ANTI_PATTERNS.md)** — 16 categories of bans
- **Relevant recipe** in `og-audit/recipes/page-recipes.md` (case-study · PDP · listing · landing)
- **Surface doc** in `skills/aura-design/surfaces/` if exists for the page type

### Step 2 — RESEARCH · pick recipe

Identify page type → choose recipe:

| Page type | Recipe | Source |
|---|---|---|
| Case study | Recipe 1 · 10 sections · BLACK→WHITE→WARM | `page-recipes.md:17-118` |
| Report PDP (14-section) | V0.2 PDP anatomy · 14 sections | `report-pdp-anatomy.md` |
| Report Store home (PDP-style) | Recipe 2 · 10 sections · NEUTRAL50 quick-access | `page-recipes.md:122-211` |
| Listing (search/filter) | Recipe 3 · sidebar + listing · single bg | `page-recipes.md:215-282` |
| Standalone landing | Recipe 4 (synthesized) · 4-5 sections | `page-recipes.md:286-344` |

### Step 3 — PROPOSE + BLOCK (HARD GATE 1)

Write a 1-paragraph page proposal:
- Page type · recipe chosen · section order
- Bg alternation
- Variant (editorial-light DEFAULT · cinematic-dark explicit only)
- Special components (sticky TOC · scroll-spy · sticky CTA · floating CTA)

**Block on user OK before composing.** No exception.

### Step 4 — COMPOSE

Build the page using DS atoms · molecules · organisms. Order:

1. Add **`<TopNavigation>`** at top (always · pixel-match `topnav-v32/`)
2. Add **`<Footer>`** at bottom (always · pixel-match V0.2 footer)
3. Compose sections in recipe order
4. Each section: 3-element intro (`<SectionLabel>` + `<SectionHeading>` + body)
5. Apply bg alternation per recipe
6. Apply tri-modal hover language per content type (purple shadow · static · border darken)
7. Wire reduced-motion via `useReducedMotion()` on every animated component

### Step 4.5 — CRAFT-PASS (NEW · 2026-05-12 · `aura-craft` skill)

**Mandatory between COMPOSE and SHOW FIRST CUT.** Synthesizes ui-ux-pro-max + interface-design + awesome-claude-design references. Proves per-section design decisions vs DS-default drift. Cannot skip · 6 craft principles + 7 hard-bans applied (`feedback_craft_skills.md`).

### Step 5 — SHOW FIRST CUT (HARD GATE 2)

Show user the first cut · take feedback · iterate. Cannot skip to QA before user sign-off on visual.

### Step 6 — PROPOSE QA

Define QA scope: lint · types · Playwright · axe · Lighthouse · visual regression.

### Step 7 — EXECUTE QA (`webapp-testing` skill via `aura-qa` agent)

Run:
```bash
pnpm lint
pnpm test           # Playwright + axe
pnpm build          # Next.js production build
pnpm test:lighthouse  # if configured
```

13-point pre-handover gate (`HANDOVER_TRACKER.md`): lint pass · type pass · build pass · a11y pass · perf pass · mock data isolated · `STATUS.md` written · `HANDOVER.md` written · `README.md` written · no inline hex · no Tailwind arbitrary classes when token exists · reduced-motion wired · 44px touch floor.

### Step 8 — Exit checklist

Log to `docs/LEARNINGS.md`:
- Corrections (what got fixed mid-build · root cause)
- Validations (what worked first-try · why)
- Fork decisions (where you deviated from default · why)
- Infra changes → `docs/CHANGELOG.md` mandatory entry

### Step 9 — Hand off to `aura-qa` for sign-off

Aura-QA verifies 13-point gate. State changes from `cleanup` → `ready-for-tech` in `HANDOVER_TRACKER.md`. Tech owns from this point · NEVER edit a `handed-over` folder · copy to `<name>-v(n+1)/` for new iteration.

---

## 5 · The 14-section Report PDP recipe (V0.2 canonical)

Source: `worked-examples/v02-for-design-system/report-pdp-anatomy.md` (full anatomy).

Use when building a Ken report Product Detail Page. Section order mimics buyer research flow: overview → scope → analysis → segmentation → competition → trust signals → objection handling → cross-sell → conversion.

| # | Section | DS organism | Bg | Color signal | Hover | 3-elem intro |
|---|---|---|---|---|---|---|
| 1 | MarketOverview | `StatCardGroup` + `Timeline` | white | PURPLE shadow on StatCards | Card lift + purple shadow | ✅ |
| 2 | ScopeOfReport | `MindMap` (d3) + Modal | grey-50 | Center node brand-red · branches grey | Click expand | ✅ |
| 3 | MarketAnalysis | Chart panel (Highcharts/Recharts) | white | PURPLE shadow on cards · purple legends | Card lift · axis tooltips | ✅ |
| 4 | MarketDataTable | sortable table | grey-50 | Header grey-50 bg · alt-row stripes | Row darken grey-100 | ✅ |
| 5 | SegmentationSection | `SegmentationCard` × 7 (mixed 2/3/2 grid) | white | PURPLE shadow | Lift + shadow + icon scale 1.05 | ✅ |
| 6 | RegionalComparison | grid or table | grey-50 | Subtle row tints | Border darken | ✅ |
| 7 | GrowthDriversChallenges | SWOT 4-quadrant | white | **SEMANTIC** red `#dc2626` (NOT brand) · green `#16a34a` · amber `#f59e0b` | Subtle bg tint · static cards | ✅ |
| 8 | CompetitiveLandscape | Logos + share % | grey-50 | Neutral logos · subtle border | Border darken · logo scale 1.02 | ✅ |
| 9 | TableOfContentsSection | inline mid-page TOC | white | Purple shadow on current | Hover anchor | ✅ |
| 10 | TargetAudience | `StakeholderCard` × 8 (4×2) | grey-50 | Grey-50 bg · neutral | **No hover** (static · TimelineCard pattern) | ✅ |
| 11 | ResearchMethodology | numbered steps × 4 | white | Number circles brand-red bg · text neutral | **No hover** (factual) | ✅ |
| 12 | FAQSection | Radix Accordion | grey-50 | Grey-200 divider · chevron grey | Chevron rotate · smooth height | ✅ |
| 13 | RelatedReports | `ReportCard` × 3-4 | white | Price brand-red · CTA red gradient | Card lift + title color shift | ✅ |
| 14 | FinalCTA | red gradient banner | red gradient | **INVERTED** (white CTA on red bg) | Primary CTA scale-105 + shadow-2xl | — (banner only) |

**Page chrome (overlay layer):**
- `<TopNavigation>` (sticky · 60px primary + 40px secondary)
- `<TableOfContentsSidebar>` (left · 255px sticky · scroll-spy + reading-time + 3-state model)
- `<FloatingCTA>` (bottom-right · appears after 800px scroll)
- `<Footer>` (cinematic-dark · 4-col nav + 4-col offices + wordmark + newsletter + legal strip)

**Bg alternation rule (this recipe):**
- Odd sections (1,3,5,7,9,11,13): `bg-white`
- Even sections (2,4,6,8,10,12): `bg-grey-50` (`#fafafa`)
- §14 breaks pattern: red gradient (intentional end-of-page conversion signal)

**3-element chapter intro (used 13×):**
```tsx
<SectionLabel>CHAPTER X · CATEGORY</SectionLabel>
<SectionHeading level={2} title="Section Title" />
<p className="text-[var(--typography-size-sm)] text-black/70">
  Description paragraph explaining what this section covers.
</p>
```
Spacing: `mb-2` between Label+Heading · `mb-6` between Heading+body · `mb-12` between body+content.

---

## 6 · Common patterns library (copy-paste TSX)

### 6.1 Hero with split layout (left=text · right=stat panel sticky)

```tsx
<SectionWrapper background="dark" spacing="xl" maxWidth="page">
  <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12">
    {/* Left — narrative */}
    <div>
      <SectionLabel theme="purple">REPORT · QATAR FRESH HERBS</SectionLabel>
      <h1 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'var(--typography-size-3xl)',
        fontWeight: 300,
        lineHeight: 1.1,
      }}>
        Qatar Fresh Herbs Market · Outlook to 2030
      </h1>
      <p className="mt-6 text-[var(--typography-size-sm)] text-white/70 max-w-[var(--container-prose)]">
        Comprehensive market analysis covering production · demand · pricing · top competitors.
      </p>
      <div className="mt-8 flex gap-4">
        <Button variant="brand" size="lg" showArrow>Get Full Access</Button>
        <Button variant="ghost" background="dark" size="lg">Download Sample</Button>
      </div>
    </div>
    {/* Right — sticky stat panel */}
    <div className="lg:sticky lg:top-24 self-start">
      <Card padding="lg" shadow="md">
        <StatsRow stats={[
          { value: '$2.4B', label: 'Market size 2024' },
          { value: '7.8%', label: 'CAGR 2024-2030' },
          { value: '12', label: 'Top suppliers tracked' },
          { value: '180+', label: 'Pages of analysis' },
        ]} />
      </Card>
    </div>
  </div>
</SectionWrapper>
```

### 6.2 Stats strip (4 stats · DM Sans 600 · tabular-nums)

```tsx
<SectionWrapper background="warm" spacing="lg">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
    {stats.map(s => (
      <div key={s.label}>
        <div style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',  // sanctioned clamp
          fontWeight: 600,
          fontVariantNumeric: 'tabular-nums',
          color: 'var(--color-foundation-black)',
        }}>
          {s.value}
        </div>
        <div className="mt-2 text-[var(--typography-size-xs)] uppercase tracking-[3px] text-black/50">
          {s.label}
        </div>
      </div>
    ))}
  </div>
</SectionWrapper>
```

### 6.3 Card grid (3-col desktop · hover lift · purple shadow)

```tsx
<SectionWrapper background="white" spacing="lg" maxWidth="content">
  <SectionHeading
    level={2}
    label="SEGMENTATION"
    title="Market cuts by 7 dimensions"
    subtitle="Type · End-use · Region · Channel · Pack-size · Customer-segment · Price-tier"
  />
  <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {segments.map((seg, i) => (
      <CardReveal key={seg.id} delay={i * 0.08}>
        <Card
          padding="lg"
          shadow="md"
          interactive
          onClick={() => openSegment(seg.id)}
          style={{ '--card-hover-shadow': 'var(--shadow-accent-purple-md)' } as any}
        >
          <IconBadge icon={seg.icon} theme="purple" />
          <h3 className="mt-4 text-[var(--typography-size-lg)] font-medium">{seg.title}</h3>
          <p className="mt-2 text-[var(--typography-size-sm)] text-black/70">{seg.description}</p>
        </Card>
      </CardReveal>
    ))}
  </div>
</SectionWrapper>
```

### 6.4 SWOT quadrant (semantic colors NOT brand red)

```tsx
<SectionWrapper background="white" spacing="lg">
  <SectionHeading level={2} label="STRATEGIC ANALYSIS" title="Growth drivers & challenges" />
  <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      { label: 'DRIVERS', icon: TrendingUp, color: 'var(--color-semantic-success-600)', items: drivers },
      { label: 'CHALLENGES', icon: AlertCircle, color: '#dc2626' /* semantic NOT brand */, items: challenges },
      { label: 'OPPORTUNITIES', icon: Sparkles, color: 'var(--color-semantic-success-500)', items: opportunities },
      { label: 'THREATS', icon: ShieldAlert, color: 'var(--color-semantic-warning-500)', items: threats },
    ].map(q => (
      <div key={q.label} style={{ borderTop: `3px solid ${q.color}` }} className="p-6 bg-warm-50 rounded-[var(--radius-card)]">
        <div className="flex items-center gap-2">
          <q.icon size={20} aria-hidden style={{ color: q.color }} />
          <h3 className="text-[var(--typography-size-xs)] uppercase tracking-[3px]" style={{ color: q.color }}>
            {q.label}
          </h3>
        </div>
        <ul className="mt-4 space-y-2">{q.items.map(i => <li key={i}>{i}</li>)}</ul>
      </div>
    ))}
  </div>
</SectionWrapper>
```

> **CRITICAL:** SWOT challenges use SEMANTIC red `#dc2626` NOT brand red `#b01f24`. Pair color w/ icon · color-alone fails WCAG 1.4.1.

### 6.5 Sticky TOC sidebar (scroll-spy + reading-time)

```tsx
// Use DS organism `TableOfContentsSidebar` — wired with scroll-spy + 3-state model
import { TableOfContentsSidebar } from '@kenresearch/design-system/organisms';

<div className="grid grid-cols-1 lg:grid-cols-[255px_1fr] gap-12">
  <aside className="hidden lg:block lg:sticky lg:top-[100px] self-start">
    <TableOfContentsSidebar
      sections={[
        { id: 'overview', label: 'Market Overview', readingMinutes: 4 },
        { id: 'scope',    label: 'Scope of Report',  readingMinutes: 2 },
        // ... 14 sections
      ]}
      offsetTop={120}  /* clear sticky header */
    />
  </aside>
  <main>
    {/* 14 sections */}
  </main>
</div>
```

3-state model: completed (grey-400 + checkmark) · active (brand-red bg + white) · upcoming (grey-700). Progress bar = `(activeIdx+1) / total * 100`. See `report-pdp-anatomy.md:161-170` for full architecture.

### 6.6 Final CTA (red gradient bg · inverted white CTA)

```tsx
<section
  role="region"
  aria-label="Final call to action"
  className="py-20 md:py-24 px-4 md:px-8"
  style={{
    background: 'linear-gradient(135deg, #b01f24 0%, #8a191d 50%, #5e1014 100%)',
  }}
>
  <div className="max-w-[var(--container-narrow)] mx-auto text-center">
    <h2 style={{
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--typography-size-3xl)',
      fontWeight: 300,
      color: 'white',
      lineHeight: 1.15,
    }}>
      Ready to unlock the full report?
    </h2>
    <p className="mt-6 text-[var(--typography-size-base)] text-white/85 max-w-[var(--container-prose)] mx-auto">
      Get instant access to 180+ pages of analysis · interactive data tables · analyst briefings.
    </p>
    <div className="mt-10 flex flex-wrap justify-center gap-4">
      {/* Inverted — white CTA on red bg · earns the inversion */}
      <Button
        size="lg"
        showArrow
        style={{ background: 'white', color: 'var(--color-brand-red)' }}
      >
        Get Full Access
      </Button>
      <Button variant="ghost" background="dark" size="lg">
        Talk to Analyst
      </Button>
    </div>
  </div>
</section>
```

> **Color inversion** is intentional and **earns its place** — only one CTA on the entire page should invert. Signals "this is THE action."

### 6.7 FAQ accordion (Radix · chevron rotate · smooth height)

```tsx
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

<SectionWrapper background="warm" spacing="lg" maxWidth="narrow">
  <SectionHeading level={2} label="QUESTIONS" title="Frequently asked questions" />
  <Accordion.Root type="single" collapsible className="mt-12 divide-y divide-black/10">
    {faqs.map(faq => (
      <Accordion.Item key={faq.id} value={faq.id} className="py-2">
        <Accordion.Header>
          <Accordion.Trigger className="group flex w-full items-center justify-between py-4 text-left">
            <span style={{ fontSize: 'var(--typography-size-base)', fontWeight: 500 }}>
              {faq.q}
            </span>
            <ChevronDown
              size={20}
              className="transition-transform duration-300 group-data-[state=open]:rotate-180 text-black/50 group-hover:text-black"
              aria-hidden
            />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
          <p className="pb-4 text-[var(--typography-size-sm)] text-black/70">{faq.a}</p>
        </Accordion.Content>
      </Accordion.Item>
    ))}
  </Accordion.Root>
</SectionWrapper>
```

### 6.8 Header (TopNavigation · pixel-match `topnav-v32/`)

```tsx
// Pixel-match topnav-v32 canonical Header (see header-anatomy.md)
import { TopNavigation } from '@kenresearch/design-system/organisms';
import { Button } from '@kenresearch/design-system/atoms';
import KenLogo from '@/components/KenLogo';

<TopNavigation
  logo={<KenLogo />}
  navItems={[
    { id: 'reports',     label: 'Reports',     megaMenu: <ReportsMegaMenu /> },
    { id: 'industries',  label: 'Industries',  megaMenu: <IndustriesMegaMenu /> },
    { id: 'surveys',     label: 'Surveys',     megaMenu: <SurveysMegaMenu /> },
    { id: 'consulting',  label: 'Consulting',  megaMenu: <ConsultingMegaMenu /> },
    { id: 'insights',    label: 'Insights',    megaMenu: <InsightsMegaMenu /> },
  ]}
  ctaButton={<Button variant="brand" size="sm">Book discovery call</Button>}
  isAuthenticated={user != null}
  user={user}
/>
```

Anatomy summary (`header-anatomy.md`):
- **60px sticky primary nav** (`bg-white` · `backdrop-blur-[4px]` · purple-tinted bottom shadow `0px 8px 12px -4px rgba(128,108,224,0.15)`)
- **40px secondary bar above** (not sticky — scrolls away · carries desktop auth + utility links)
- **3 breakpoint-scoped right clusters** — desktop ≥1024 (5 triggers + search + CTA) · tablet 768-1023 (search + CTA + avatar + hamburger) · mobile <768 (avatar + hamburger only)
- **Signature hover** — black→grey→red gradient underline on triggers (`scale-x-0 group-hover:scale-x-100`)
- **Search bar** — 120×35 pill · purple beam-orbit animation (6s linear infinite)
- **Backdrop blur** — 0.02 black + 2px blur when mega menu open · z-45 under nav z-50

### 6.9 Footer (cinematic-dark · pixel-match V0.2)

```tsx
import { Footer } from '@kenresearch/design-system/organisms';

<Footer
  navigationSections={[
    { title: 'About Ken Research', links: [...] },        // 7 links
    { title: 'Resources',          links: [...] },        // 8 links
    { title: 'Expertise & Services', links: [...] },      // 11 links
    { title: 'How We Are Different?', links: [...] },     // 9 competitor comparisons
  ]}
  offices={[
    { title: 'India',     address: '...', mapUrl: '...' },
    { title: 'UAE',       address: '...', mapUrl: '...' },
    { title: 'Indonesia', address: '...', mapUrl: '...' },
    { title: 'Qatar',     address: '...', mapUrl: null },  // null → renders <p> not <a>
  ]}
  onSubscribe={async (email) => { /* wire to backend */ }}
  copyrightYear={new Date().getFullYear()}  /* NOT hardcoded 2026 — fix from V0.2 */
/>
```

Anatomy summary (`footer-anatomy.md`):
- **Bg:** `#141016` (workspace footer-only near-black · slightly warm so wordmark doesn't crush)
- **5 regions:** 4-col nav · 4-col offices · oversized "Ken" wordmark (356px desktop · 124px mobile) · newsletter capture (red Subscribe button = only red element in footer) · 2px white divider + legal strip
- **Hover signature:** `opacity-40 → opacity-100` on link rows (quiet but distinct)
- **100px gap before divider** = signature footer coda
- **Tracking quirk:** recurring `tracking-[0.62px]` on nav links + newsletter copy ties the footer typographically

---

## 7 · Decision trees

### 7.1 Color decision tree

```
Is it a CTA / conversion action?
├─ Yes → RED (--color-brand-red #b01f24) · ≤5% of view · CTAs only

Is it data / analysis / insight?
├─ Yes → PURPLE (--color-accent-purple-600 #806ce0) · shadow + icon + badge

Is it content / structure / body?
├─ Yes → GREY (foundation black tints · 92% of surfaces)

Is it semantic state (success/warning/error)?
├─ Yes → green / amber / rose (--color-semantic-*)
│   ⚠ NEVER substitute --color-semantic-error-* for --color-brand-red
│   ⚠ SWOT challenges use semantic #dc2626 NOT brand #b01f24

Is it editorial alt-bg?
├─ Yes → warm-300 (#f5f2f1) · cinematic-dark sections only use #0a0a0c / #000

Is it accent decoration (badge · subtle highlight)?
├─ Yes → ONE accent family per section (purple OR periwinkle OR coral OR perano)
│   ⚠ NEVER mix >2 accent families per view = "rainbow drift" anti-pattern
```

### 7.2 Component decision tree

```
Card with a number? → StatCard (PURPLE shadow · data signal)
Card with icon + 2-line description? → IconCard
Card representing a person/role? → StakeholderCard (no hover · static)
Card representing a timeline event? → TimelineCard (no hover · static)
Card for compare/contrast? → ComparisonParameterCard (border-darken hover)
Card with d3 visualization? → MindMap (expensive · ScopeOfReport only)
Card for report listing? → ReportCard (layout="grid" or layout="list")
Card for resource download? → ResourceCard
Card for empty/zero results? → EmptyState
Card for loading state? → SkeletonCard
```

### 7.3 Layout decision tree (card density)

```
4+ cards per row?
├─ Yes → use --typography-size-compact (14px) body + padding="md" (16px)

2-3 cards per row?
├─ Yes → use --typography-size-base (20px) body + padding="lg" (24px)

1 card per row (hero/featured)?
├─ Yes → use --typography-size-lg (25px) body + padding="lg" (24px)
```

### 7.4 Container width decision tree

```
Full-bleed hero / navbar / page shell? → --container-page (1200px)
Standard sections / card grids? → --container-content (1000px · DEFAULT)
CTAs / testimonials / focused closing? → --container-narrow (900px)
Long-form prose paragraphs (~65-70 chars)? → --container-prose (700px · BAYMARD IDEAL)
Tight descriptions / methodology blurbs? → --container-compact (600px)
```

Rule: use the **narrowest container that fits the content**. Never `max-w-6xl` (Tailwind generic · bypasses tokens).

---

## 8 · Composition pattern · 3-element section intro

Every section in editorial Ken pages uses this 3-element rhythm (used 13× in the V0.2 PDP):

```tsx
{/* 1. Eyebrow label · uppercase · tracking · purple or grey theme */}
<SectionLabel theme="purple">CHAPTER 3 · MARKET ANALYSIS</SectionLabel>

{/* 2. Section title · Noto Serif · weight 300 · --typography-size-2xl (39px) */}
<SectionHeading
  level={2}
  title="Top 5 competitors by revenue"
  subtitle="Comparative analysis across 8 dimensions"
/>

{/* 3. Body intro paragraph · DM Sans · --typography-size-sm (16px) · text-black/70 */}
<p className="mt-6 max-w-[var(--container-prose)] text-[var(--typography-size-sm)] text-black/70">
  Description paragraph explaining what this section covers, in 1-3 sentences.
</p>

{/* Then: 48px gap, then content */}
<div className="mt-12">
  {/* Section content */}
</div>
```

Spacing rhythm (`report-pdp-anatomy.md:198`):
- `mb-2` (8px) between SectionLabel and SectionHeading
- `mb-6` (24px) between SectionHeading and body
- `mb-12` (48px) between body and content

---

## 9 · Anti-pattern hot-list · "if you see these · STOP"

Quick scan before shipping. Full list in [ANTI_PATTERNS.md](./ANTI_PATTERNS.md) (16 categories).

1. **Raw `<button>` HTML** — kills shimmer · brand · sizing · a11y. Always `<Button>`.
2. **Inline hex `bg-[#abc123]`** — bypasses 92-5-3 + token discipline. Use `var(--color-*)`.
3. **`tracking-[5px]` magic numbers** — use sanctioned tracking values per typography table.
4. **Dual icon libraries** (Phosphor + Lucide) — Lucide only. Phosphor banned.
5. **Missing `ariaLabel` on icon-only Button** — WCAG 4.1.2 violation.
6. **`@layer tokens` token overrides** — single source-of-truth = `tokens.css`. Never shadow.
7. **Skip-link target missing** — `<SkipLink>` requires `id="main-content"` on `<main>`. Lighthouse fails.
8. **Touch-target < 44px outside card-footer** — WCAG 2.5.5 hard floor.
9. **Secondary button on light bg** — known contrast trap (1.13:1 against white). Block any page build w/ secondary until fixed (`prioritized-actions.md` P0).
10. **`<div aria-label="...">` w/o role** — `aria-prohibited-attr` axe violation. Use semantic tag or add role.
11. **`aria-controls` without target ID rendered** — `aria-valid-attr-value` axe violation.
12. **`<dl>` with sibling badges (not `<dd>` children)** — `definition-list` axe violation.
13. **`--text-3xl` for section h2** — reserved for hero h1 only. Section h2 = `--text-2xl`.
14. **Serif font on body/buttons/labels/nav** — sans-only for UI chrome (`typography.md:73-80`).
15. **`max-w-6xl` Tailwind** — bypasses container tokens. Use `max-w-[var(--container-content)]`.
16. **Hardcoded `2026` copyright** — use `new Date().getFullYear()` (V0.2 footer carry-over fix).
17. **Page-load intro animations** — `MotionContent.tsx:197` forbids. Content appears instantly.
18. **Missing `useReducedMotion()` on non-trivial animation** — WCAG 2.3.3 violation.
19. **`<rose-*>` for brand CTA** — rose = error · brand = conversion · same hue family · separate roles (`COLORS.md:204`).
20. **`SWOT challenges` using brand red** — use semantic `#dc2626` instead (`report-pdp-anatomy.md:97`).
21. **Re-implementing atoms inline** — Cat 13.8. Compose · never re-implement.
22. **Editing `core/` v1** — frozen read-only. Use `core-v2/`. New iteration = copy folder to `<name>-v(n+1)/`.

---

## 10 · Quality target & exit gates

**Quality bar:** 9.5/10 Premium Cinematic Finish (Stripe / Material Design / Linear level).

**13-point pre-handover gate** (per `HANDOVER_TRACKER.md`):

```
[ ] 1.  Lint pass        (pnpm lint)
[ ] 2.  Type pass        (tsc --noEmit)
[ ] 3.  Build pass       (pnpm build · Next.js production)
[ ] 4.  A11y pass        (axe · 0 violations · WCAG AA)
[ ] 5.  Perf pass        (Lighthouse ≥ 90 / 90 / 95 / 95)
[ ] 6.  Visual pass      (Playwright snapshots · diff < threshold)
[ ] 7.  Mock data        (centralized in src/lib/mock-data.ts · TODO markers)
[ ] 8.  STATUS.md        (filled · per templates/)
[ ] 9.  HANDOVER.md      (filled · per templates/)
[ ] 10. README.md        (filled · per templates/)
[ ] 11. No inline hex    (grep src/ for #[0-9a-fA-F]{3,6} · 0 hits)
[ ] 12. No tw arbitrary  (grep src/ for `\[var\(` is OK · `\[[0-9]+px\]` is not for tokenizable)
[ ] 13. Reduced-motion   (useReducedMotion on every motion.* · 0 unguarded)
```

State machine (`HANDOVER_TRACKER.md`):
```
exploring → cleanup → ready-for-tech → handed-over
                ↑           ↑
            aura-builder  aura-qa sign-off
```

After `handed-over` → folder is **read-only for design** · new iteration = copy to `<name>-v(n+1)/` · NEVER edit handed folder.

---

## 11 · Tech stack reminders (build only L1 · design as-if for L2/L3)

| Layer | Tech | Build? |
|---|---|---|
| **L1 Web** | Next.js 14/15 (App Router · RSC) · React 18 · Tailwind v4 · shadcn/ui · NextAuth · Leadfeeder + Contentsquare | **YES** |
| **L2 Backend** | Django + DRF + Channels · Postgres + Mongo + Redis · Celery | NO (mock APIs · MSW) |
| **L3 AI/RAG** | FastAPI + vector DB + LLMs over 1M+ reports · n8n | NO (design as-if) |

**Build rules for L1:**
- **Package manager:** `pnpm` only (never `npm install` — breaks lockfile · `packageManager: pnpm@10.33.0` · `engines.node: >=20`)
- **Alias:** `@/*` → `src/*`
- **shadcn:** `npx shadcn@latest add <name>` → `src/components/ui/`
- **Animation:** Framer Motion ONLY (state · scroll · parallax · entrance · timeline)
  - Scroll-driven: `useScroll({ target, offset })` + `useTransform`
  - Entrance: `useInView` for scroll-triggered fades
  - Reduced-motion: `useReducedMotion()` MANDATORY
- **Smooth scroll:** native CSS `html { scroll-behavior: smooth }` in DS `core-v2/styles/base.css`
- **GSAP + Lenis:** REMOVED 2026-05-08 (dev-team parity)

**Run commands:**
```bash
./run.sh tokens     # Build tokens (Style Dictionary v4 → tokens.css)
./run.sh design     # Design system core (Vite · port 5173)
./run.sh frontend   # Next.js consumer
./run.sh backend    # Django (port 8000 · local venv)
pnpm dev            # in any projects/<name>/
pnpm lint && pnpm test && pnpm build && pnpm verify
```

---

## 12 · Single-paste agent prompt (for new sessions)

> **For pasting into Figma Make / new AI sessions when you don't have time to share the full doc.** Condensed 30-line version covering 80% of cases.

```
Follow @kenresearch/design-system v2 (core-v2):

TYPOGRAPHY (Major Third 1.25×):
- Body 16px (--typography-size-sm) · 90% of text
- Section h2 39px (--typography-size-2xl)
- Hero h1 48.8px (--typography-size-3xl) · reserved
- Labels 12.8px (--typography-size-xs) UPPERCASE tracking-[3px]
- Micro 10px (--typography-size-card-micro) · counts only

COLORS (92-5-3 rule):
- Foundation 92% — black/white/warm-300 (#f5f2f1)
- Brand 5% — red #b01f24 (--color-brand-red) CTAs ONLY
- Accent 3% — purple #806ce0 (data/icons/shadows)
- Footer-only — #141016 dark
- Cinematic dark — #0a0a0c
- SWOT semantic red — #dc2626 (NOT brand red)
- Mix max 2 accent families per view

LAYOUT:
- SectionWrapper handles bg + spacing + maxWidth
- Containers: page 1200 · content 1000 · narrow 900 · prose 700
- Section py: 48/64/80 mobile/tablet/desktop
- Card padding: sm 12 / md 16 / lg 24

COMPONENTS (atoms · molecules · organisms):
- Buttons: <Button variant="brand|primary|secondary|ghost" size="xs|sm|md|lg|xl">
- DEFAULT size md (48px) · navbar sm (40px) · card-footer xs (28px) · hero lg (56px)
- Shimmer always-on (brand signature) · ArrowUpRight diagonal for urgent CTAs
- <Card> NOT raw <button> · <SectionHeading> NOT raw <h2>
- Lucide-react ONLY (no Phosphor · no MUI icons)

MOTION:
- 150/300/600/900 durations · 4 easings (smooth/out/sharp/bounce)
- Card hover 300ms · cubic-bezier(0.22,1,0.36,1)
- useReducedMotion() MANDATORY on every motion.*
- prefers-reduced-motion CSS at DS layer

ACCESSIBILITY:
- ariaLabel on icon-only Button
- 44px touch-target floor (xs exempt · card-footer only)
- WCAG AA contrast verified
- SkipLink + role="status" aria-live region

QUALITY: 9.5/10 Premium Cinematic Finish (Stripe/Material level)

Imports from '@kenresearch/design-system/{atoms,molecules,organisms,hooks,tokens}'
NEVER edit core/ v1 (read-only) · use core-v2/
NEVER inline hex · NEVER raw <button> · NEVER --text-3xl for section h2
Quality target: 9.5/10
```

---

**End of QUICK_START.md** — paste-friendly playbook for Ken Research DS v2 (core-v2).
**Last updated:** 2026-05-14 · v1.0 (port of OG v4.3).
**Maintainer:** Aura (design@kenresearch.com).
**Source-of-truth pointers:**
- Tokens · `design-system/tokens/build/tokens.css`
- Components · `design-system/core-v2/src/{atoms,molecules,organisms,hooks}/`
- Page recipes · `design-system-audit/og-audit/recipes/page-recipes.md`
- V0.2 PDP anatomy · `design-system-audit/worked-examples/v02-for-design-system/report-pdp-anatomy.md`
- Header canonical · `design-system-audit/worked-examples/topnav-v32/header-anatomy.md`
- Footer canonical · `design-system-audit/worked-examples/v02-for-design-system/footer-anatomy.md`
- Gap analysis · `design-system-audit/gap-analysis/og-vs-core-v2.md`
- Anti-patterns · `design-system/core-v2/docs/ANTI_PATTERNS.md` (16 categories)
- Component reference · `design-system/core-v2/docs/COMPONENT_REFERENCE.md` (intent → import)
