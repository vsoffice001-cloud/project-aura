# Design System File Checklist v2.1

**Purpose:** The single reading-order guide for any AI or team member building a new report/product page.  
**Rule:** Read top-to-bottom. Each group builds on the previous one.  
**Repo:** `vsoffice001-cloud/Design-System-vs-26` (`main` branch)  
**Last verified:** 2026-03-06 | DS version: 3.4

---

## How to Use This File

1. **New page?** Read Groups 1-2 first (rules + tokens). Then import from Groups 3-7 as needed.
2. **Fixing a component?** Jump to the relevant group, check the 4W+H in `COMPONENT_GUIDELINES_4WH.md`.
3. **Pushing to GitHub?** Read Group 10 (barrel exports) + `GITHUB_PUSH_GUIDE.md` before every push.

**Companion docs (read in this order):**

| Priority | File | What | Why Read It |
|----------|------|------|-------------|
| 1st | `DESIGN_SYSTEM_AI_CONTEXT.md` | Source of truth | 92-5-3 rules, Page Assembly, Token Cross-Reference, typography scale |
| 2nd | `COMPONENT_GUIDELINES_4WH.md` | 4W+H for every component | Decision flowcharts, common mistakes, production checklist |
| 3rd | `GITHUB_PUSH_GUIDE.md` | Push safety | Never-push list, pre-push checklist, merge rules |
| 4th | `QUICK_START_PROMPT.md` | Copy-paste prompt | Shortened rules for fast Figma Make sessions |

---

## Group 1 — Token Values (Import, Never Duplicate)

**WHY:** Every component pulls raw values from these 3 files. Hardcoding `#b01f24` or `48.8px` anywhere else creates drift.

| File | What You Get | When to Use |
|------|-------------|-------------|
| `src/design-system/tokens.ts` | All raw JS values — colors, shadows (sm/md/lg/brand/accent), border-radius (2.5/5/10px), opacity scale, spacing scale, z-index, easing, duration | When you need a token value in TypeScript/JSX (e.g., `colors.brand.red600`) |
| `src/styles/theme.css` | CSS custom properties — `--text-*` typography scale, `--container-*` widths, `--button-*` sizing, `--brand-red`, `--rc-*` ResourceCard tokens, responsive padding | When you need a token value in CSS or inline `style={{ fontSize: 'var(--text-sm)' }}` |
| `src/styles/fonts.css` | Font imports (DM Sans + Noto Serif) | Already loaded globally — you never import this manually in components |

**HOW to decide JS tokens vs CSS variables:**
- Layout/typography in JSX `style={}` props? Use CSS variables: `var(--text-2xl)`
- Logic/conditions in TypeScript? Use JS tokens: `colors.brand.red600`
- Never mix — don't hardcode `#b01f24` when `var(--brand-red)` exists

---

## Group 2 — Layout Primitives (Every Section Uses These)

**WHY:** These 4 components enforce consistent spacing, width, background alternation, and heading hierarchy across every page. Without them, every section is hand-coded differently.

| File | What It Builds | Props Summary |
|------|---------------|---------------|
| `src/app/components/SectionWrapper.tsx` | Every `<section>` — background color, vertical padding, max-width, anchor `id` | `background`: white / warm / black / periwinkle / coral | `spacing`: sm / md / lg / xl | `maxWidth`: content (1000px) / wide (1200px) / full |
| `src/app/components/SectionHeading.tsx` | Every heading — semantic h1/h2/h3, optional eyebrow label, alignment | `level`: 1 (hero only) / 2 (sections) / 3 (subsections) | `eyebrow`: string | `align`: left / center / right |
| `src/app/components/Container.tsx` | Content width wrapper — 5 semantic presets with responsive padding | `width`: page (1200px) / content (1000px) / narrow (900px) / prose (700px) / compact (600px) |
| `src/app/components/Card.tsx` | Content containers — cards in grids, features, FAQs, metrics | `variant`: white / warm / outlined | `padding`: sm / md / lg | `shadow`: none / sm / md / lg | `hover`: boolean |

**WHEN NOT:**
- Don't nest `Container` inside `Container`
- Don't use `SectionHeading level={1}` more than once per page
- Don't use `Card` for full-width sections (use `SectionWrapper`)
- Don't skip background alternation: white -> warm -> white -> warm -> black (CTA)

---

## Group 3 — Interactive Components (CTAs, Buttons, Links)

**WHY:** The link/CTA system has 4 components with strict usage rules. Using the wrong one breaks visual hierarchy and user expectations.

| File | What It Builds | When to Use |
|------|---------------|-------------|
| `src/app/components/Button.tsx` | All button CTAs — 4 variants, 4 sizes, shimmer (always active), optional animated arrow | Primary actions: form submits, main CTAs, navigation. Use `brand` for conversion (max 1-2 per screen). |
| `src/app/components/CTALink.tsx` | Text + arrow link — exploratory navigation | "Learn More ->", "Explore Features ->". NOT for inline paragraph text. |
| `src/app/components/InlineLink.tsx` | Inline paragraph link — red underline, warm hover | Within `<p>` text. NOT for standalone CTAs. |
| `src/app/components/AnimatedArrow.tsx` | Arrow animation — internal dependency | Don't use directly. Used by `Button.tsx` (via `showArrow`) and `CTALink.tsx` internally. |

### Button Variant Reference (v3.3 — updated 2026-03-01)

| Variant | Resting State | Hover State | When |
|---------|--------------|-------------|------|
| `brand` | Red gradient, white text, red shadow | Shimmer sweep, deeper shadow | Conversion moments (max 1-2 per screen) |
| `primary` | Black gradient, white text | Shimmer sweep, deeper shadow | Standard primary actions |
| `secondary` (light) | White bg, neutral border `rgba(0,0,0,0.12)`, text `rgba(0,0,0,0.7)`, white shimmer, subtle shadow | Brand-red border `#b01f24`, brand-red text, red-tinted shimmer, red-tinted shadow | Supporting actions alongside primary/brand |
| `secondary` (dark) | `bg-white/10`, white text, white border | Brighter border, brighter bg | Dark background contexts |
| `ghost` | Transparent, subtle border | Darker border, subtle bg | Least emphasis actions |

### Button Size Decision

| Context | Size | Height |
|---------|------|--------|
| Navbar CTA | `sm` | 36px |
| 90% of buttons | `md` | 42px |
| Homepage hero only | `lg` | 48px |

**Decision flowchart — "Which link component?"**
```
Is it a primary action (form submit, main CTA)?
 -> YES: <Button>
 -> NO: Is it text + arrow CTA ("Learn More ->")?
         -> YES: <CTALink>
         -> NO: Is it within paragraph text?
                -> YES: <InlineLink>
                -> NO: <CTALink> or <Button>
```

---

## Group 4 — Badge & Label System

**WHY:** Badges provide categorical context (section labels, step numbers, status indicators). Without a unified system, every label is styled ad-hoc.

| File | What It Builds | Key Exports |
|------|---------------|-------------|
| `src/app/components/Badge.tsx` | Labels, pills, section headers — 11 themes, 3 variants, convenience wrappers | `Badge`, `SectionLabel`, `StepPill`, `ObjectivePill`, `CategoryBadge`, `StatusBadge`, `InfoBadge`, `MutedBadge`, `ClickableBadge` |

### Quick Patterns

```tsx
// Section label above headings
<SectionLabel theme="brand">KEY INSIGHTS</SectionLabel>

// Step pill in methodology
<StepPill>STEP 1</StepPill>

// Status indicator
<StatusBadge theme="success">COMPLETE</StatusBadge>

// Chapter label
<Badge variant="minimal" size="sm" theme="brand" fontWeight={600}>CHAPTER 1</Badge>
```

**Migration note:** Badge.tsx currently uses hardcoded JS tokens (`SIZE_TOKENS`, `THEME_COLORS`). Migration to CSS custom properties (`--badge-*` in theme.css) is planned but not yet started. No components on GitHub currently import Badge/SectionLabel externally — they're used inline within section components.

---

## Group 5 — Icon Color System

**WHY:** Without classification, the same icon appears in different colors across sections. Two constants enforce one rule: "Is this icon CONTENT or a UI CONTROL?"

| File | What It Provides |
|------|-----------------|
| `src/app/components/iconColors.ts` | `iconColors.content` (#806ce0 periwinkle) for feature/data icons; `iconColors.utility` (#737373 gray) for navigation/control icons |

### Rules

| Icon Type | Color | Examples |
|-----------|-------|----------|
| Content / feature | `iconColors.content` (#806ce0) | Sparkles, TrendingUp, Target, BarChart3 |
| Utility / control | `iconColors.utility` (#737373) | ChevronDown, X, Search, Filter |
| ChevronRight as decorative bullet | `iconColors.content` | List item pointers |

**NEVER:** Use brand red for icons (reserved for CTAs only). Use arbitrary hex colors for icons.

---

## Group 6 — Page-Level Components (Wire Once at Page Root)

**WHY:** These components are placed once at the top-level page layout. They handle global UX patterns (navigation, scroll progress, floating actions).

| File | What It Builds | When to Use | When NOT |
|------|---------------|-------------|----------|
| `src/app/components/Navbar.tsx` | Fixed top navbar — 2 states (expanded at top, compact on scroll), brand logo, section nav pills, mobile hamburger, search | Every page | Never omit — users need consistent wayfinding |
| `src/app/components/ScrollProgress.tsx` | Generic 3px brand-red bar at viewport top, fills by total document scroll, z-9999 | Any long page (generic scroll tracking) | Short pages, dashboards |
| `src/app/components/ReadingProgressBar.tsx` | Case-study-specific progress bar — uses `useSectionProgress` + `useHeroVisibility`, hides during hero | Case study / report pages with defined section IDs | Generic pages without section anchors |
| `src/app/components/ScrollToTop.tsx` | Floating button (bottom-right), appears after 400px scroll, Motion animations | Any page exceeding ~2 viewport heights | Short pages, pages with sticky sidebar nav |
| `src/app/components/StickyCTA.tsx` | Context-aware floating CTA (bottom-right) — changes text/icon based on active section, expandable on hover, brand-red gradient | Report/case-study pages with multiple sections | Pages without section-based navigation |
| `src/app/components/ContactModal.tsx` | Contact form modal — name/email/company/message, Escape to close, body scroll lock, success state | Any page with a "Contact Us" / "Get in Touch" CTA | Pages without contact functionality |
| `src/app/components/NextSectionCTA.tsx` | Animated "scroll to next section" button with label + bouncing chevron | Between sections to guide reading flow | Sections that don't need directional guidance |
| `src/app/components/TableOfContents.tsx` | Sidebar TOC with active-section highlighting | Pages with 5+ sections | Short pages (< 5 sections), mobile (use hamburger) |

**IMPORTANT — ScrollProgress vs ReadingProgressBar:**
- `ScrollProgress` = generic, any page, based on total document scroll
- `ReadingProgressBar` = case-study specific, based on section IDs (`client-context` to `final-cta`), hides during hero
- **Pick one per page. Never use both.**

### Page Shell Template

```tsx
import { Navbar } from '@/app/components/Navbar';
import { ReadingProgressBar } from '@/app/components/ReadingProgressBar';
import { ScrollToTop } from '@/app/components/ScrollToTop';
import { StickyCTA } from '@/app/components/StickyCTA';
import { ContactModal } from '@/app/components/ContactModal';

export default function ReportPage() {
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <ReadingProgressBar />
      <Navbar />
      <main id="main-content">
        {/* Sections here */}
      </main>
      <ScrollToTop />
      <StickyCTA />
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
    </>
  );
}
```

---

## Group 7 — Resource / Blog Grid

**WHY:** Content grids need visual variety. A single card style creates monotony. ResourceCard provides 7 layout variants with consistent design tokens.

| File | What It Builds | When to Use |
|------|---------------|-------------|
| `src/app/components/ResourceCard.tsx` | Content cards — 7 variants (standard, full-featured, minimal, category-featured, clean, featured-focus, latest), 2 card styles (default/bordered), 2 color modes (light/dark), 53 `--rc-*` CSS tokens | Blog grids, article listings, case study collections, Masonry layouts |
| `src/app/components/SubtleVariantSwitcher.tsx` | Dev-only floating pill for toggling card styles during design review | Design review sessions with stakeholders. **Never in production.** |

**Rules:**
- Mix 3-4 variant types per grid for visual rhythm
- Max 1 `full-featured` card per grid (it's the hero card)
- Don't mix more than 4 variant types (creates chaos)

---

## Group 8 — Custom Hooks

**WHY:** Hooks encapsulate reusable interaction patterns. Import from the barrel (`@/app/hooks`) — never duplicate logic.

| File | What It Does | When to Use | Depends On |
|------|-------------|-------------|-----------|
| `src/app/hooks/useShimmer.ts` | Shimmer CSS generation | Used internally by CTALink + InlineLink. **Do not delete.** | — |
| `src/app/hooks/useScrollDirection.ts` | Detects scroll up/down | Navbar compact/expanded state | — |
| `src/app/hooks/useHeroVisibility.ts` | Detects when hero scrolls out of view | Navbar style change, ReadingProgressBar show/hide | — |
| `src/app/hooks/useActiveSection.ts` | Tracks which section is in viewport | TOC highlighting, StickyCTA context switching, Navbar section pills | Section `id` attributes |
| `src/app/hooks/useCounter.ts` | Animated number counting (0 -> target) | Impact/metrics sections with big numbers | IntersectionObserver |
| `src/app/hooks/useScrollAnimation.ts` | Scroll-triggered fade/slide animations | Any element that should animate on scroll-into-view | IntersectionObserver |
| `src/app/hooks/useResponsiveGutter.ts` | Returns pixel gutter (24px mobile, 32px desktop) | Masonry grids, JS-driven layouts needing pixel values | window.matchMedia |
| `src/app/hooks/useReadingProgress.ts` | Generic reading progress (0-100%) | Simple progress tracking | — |
| `src/app/hooks/useSectionProgress.ts` | Section-range progress (e.g., from `#client-context` to `#final-cta`) | ReadingProgressBar, section-specific progress | Section `id` attributes |
| `src/app/hooks/useMagneticEffect.ts` | Magnetic hover effect (element follows cursor slightly) | Interactive cards, buttons with playful hover | — |

**WHEN NOT to use hooks:**
- `useResponsiveGutter` — Don't use when Tailwind classes work (`gap-6 md:gap-8`)
- `useMagneticEffect` — Don't use on mobile (no hover), don't use on form inputs
- `useCounter` — Don't use for non-numeric content

---

## Group 9 — Reference Sections (Existing Page Examples)

**WHY:** When building a new report page, these existing sections show proven patterns. Study them, don't reinvent.

| File | Pattern It Demonstrates | Key Techniques |
|------|------------------------|----------------|
| `src/app/components/HeroSection.tsx` | Full-width hero with black bg | `SectionWrapper background="black"`, `SectionHeading level={1}`, dual CTAs (brand + ghost) |
| `src/app/components/ClientContextSection.tsx` | Context/background narrative | Left-aligned prose, `Container width="prose"`, warm background |
| `src/app/components/ChallengesSection.tsx` | Card grid pattern | JS-calculated card widths (intentional exception), warm bg, 3-column grid |
| `src/app/components/EngagementObjectivesSection.tsx` | Numbered objectives | `StepPill` badges, ordered content, white bg |
| `src/app/components/MethodologySection.tsx` | Timeline / step pattern | Sequential steps with connecting lines, methodology flow |
| `src/app/components/ImpactSection.tsx` | Metrics + animated numbers | `useCounter` hook, big display numbers, stat cards |
| `src/app/components/ValuePillarsSection.tsx` | Value proposition grid | Feature cards with icons, warm bg |
| `src/app/components/TestimonialSection.tsx` | Social proof / quote | Serif font for quotes, attribution, warm bg |
| `src/app/components/ResourcesSection.tsx` | Masonry + ResourceCard + dark mode | `useResponsiveGutter`, react-responsive-masonry, `ResourceCard` variants, `SubtleVariantSwitcher` |
| `src/app/components/FinalCTASection.tsx` | Closing CTA section | Black bg, brand button, urgency language |

### Section Background Sequence (standard report page)

```
Hero          -> black
ClientContext -> warm
Challenges    -> white
Objectives    -> warm
Methodology   -> white
Impact        -> warm
ValuePillars  -> white
Testimonial   -> warm
Resources     -> black
FinalCTA      -> black
```

---

## Group 10 — Barrel Exports (Check Before Every Push)

**WHY:** If you create a new component or hook but don't register it in the barrel, other files can't import it via `@/app/components` or `@/app/hooks`. This breaks the import convention and creates inconsistency.

### Components: `src/app/components/index.ts`

**HOW to register a new component:**
```tsx
// 1. Use named export in your component file:
export function MyNewSection() { ... }

// 2. Add to index.ts (in the correct category section):
export { MyNewSection } from './MyNewSection';

// 3. Other files can now import:
import { MyNewSection } from '@/app/components';
```

### Hooks: `src/app/hooks/index.ts`

**HOW to register a new hook:**
```tsx
// 1. Use named export in your hook file:
export function useMyHook() { ... }

// 2. Add to index.ts:
export { useMyHook } from './useMyHook';

// 3. Other files can now import:
import { useMyHook } from '@/app/hooks';
```

**Pre-push barrel check:**
- [ ] Every new `.tsx` component file has a corresponding `export` line in `src/app/components/index.ts`
- [ ] Every new hook file has a corresponding `export` line in `src/app/hooks/index.ts`
- [ ] No default exports — always use named exports
- [ ] Import paths use `'./FileName'` (relative, no extension)

---

## Group 11 — Dashboard Documentation System (Reference Only)

**WHY:** The Design System Dashboard (`DesignSystemDashboard.tsx`) is the visual reference for all design tokens, components, and patterns. Understanding its modular file structure prevents confusion when editing documentation content.

### Dashboard Shell

| File | What It Does |
|------|-------------|
| `src/app/components/DesignSystemDashboard.tsx` | Main dashboard — 7 tabs (Foundations, Components, Patterns, Motion, Guidelines, Resources, Changelog) |
| `src/app/components/DesignSystemSidebar.tsx` | Left navigation sidebar with tab/sub-tab routing |

### Foundations Tab — Modular Sub-files (v3.4 refactor)

The former 110KB `FoundationsContent.tsx` monolith was split into 6 modular files under `foundations/`. The original file is now a **~1KB re-export hub** — all imports via `@/app/components/FoundationsContent` still work unchanged.

| File | What It Documents | Size | GitHub SHA |
|------|------------------|------|------------|
| `src/app/components/FoundationsContent.tsx` | **Re-export hub** — transparently forwards all 6 sub-files + 6 "All*" token viewers | ~1KB | b29d618 |
| `src/app/components/foundations/FoundationsHelpers.tsx` | Shared `DocSection` component used by all sub-files | ~2KB | b29d618 |
| `src/app/components/foundations/ColorsContent.tsx` | Color palette docs, Element-Color Classification table, Purple Boundaries, canonical 10-section background sequence | ~35KB | 0e524fb |
| `src/app/components/foundations/TypographyContent.tsx` | Typography scale, font pairing, weight system, custom sizes | ~23KB | 92077b4 |
| `src/app/components/foundations/SpacingContent.tsx` | Spacing scale, responsive padding, section spacing patterns | ~8KB | b29d618 |
| `src/app/components/foundations/LayoutGridContent.tsx` | Container widths, grid system, responsive breakpoints, Border Radius Decision Table | ~25KB | 63561f4 |
| `src/app/components/foundations/ElevationBorderRadius.tsx` | Shadow scale, border-radius tokens (exports `ElevationContent` + `BorderRadiusContent`) | ~17KB | f24eb5d |

**Import rule:** Always import via the re-export hub path:
```tsx
// ✅ Correct — goes through re-export hub
import { ColorsContent, TypographyContent } from '@/app/components/FoundationsContent';

// ❌ Wrong — bypasses hub, creates coupling to internal structure
import { ColorsContent } from '@/app/components/foundations/ColorsContent';
```

### Other Dashboard Content Tabs

| File | Tab | What It Documents |
|------|-----|------------------|
| `src/app/components/ComponentsContent.tsx` | Components | Button, Links, Badge, Form, Card, Nav, Feedback, Icons |
| `src/app/components/PatternsContent.tsx` | Patterns | Page Layouts, Content Patterns, Backgrounds |
| `src/app/components/MotionContent.tsx` | Motion | Motion principles, Duration, Transitions, Micro-interactions |
| `src/app/components/GuidelinesContent.tsx` | Guidelines | Accessibility, Responsive, Best Practices |
| `src/app/components/ResourcesContent.tsx` | Resources | Downloads, Code Snippets, Design Tokens |

### "All Tokens" Expanded Views (opened from Foundations sub-tabs)

| File | What It Shows |
|------|-------------|
| `src/app/components/AllColorsPaletteContent.tsx` | Full 50-900 swatches for all 10 color families |
| `src/app/components/AllTypographyTokensContent.tsx` | Every `--text-*` token with live preview |
| `src/app/components/AllSpacingTokensContent.tsx` | Complete spacing scale visualization |
| `src/app/components/AllLayoutGridTokensContent.tsx` | Container width + grid demos |
| `src/app/components/AllElevationTokensContent.tsx` | Shadow scale visual reference |
| `src/app/components/AllBorderRadiusTokensContent.tsx` | Border-radius token showcase |

### Component Showcase Files (opened from Components tab)

| File | What It Shows |
|------|-------------|
| `src/app/components/ButtonDocumentation.tsx` | Button component interactive showcase |
| `src/app/components/LinksDocumentation.tsx` | Link system showcase (CTALink, InlineLink) |
| `src/app/components/BadgeLabelsDocumentation.tsx` | Badge + Label system showcase |
| `src/app/components/BadgeShowcase.tsx` | Badge visual gallery |
| `src/app/components/LinkSystemDemo.tsx` | Interactive link demo |
| `src/app/components/ShimmerDemo.tsx` | Shimmer effect demo |
| `src/app/components/AnimatedArrowDemo.tsx` | Arrow animation demo |
| `src/app/components/AnimatedArrowQuickRef.tsx` | Arrow quick reference |
| `src/app/components/ButtonControlsGuide.tsx` | Button control patterns |
| `src/app/components/FigmaButtonComparison.tsx` | Figma vs code comparison |

---

## Quick Reference — File Count by Group

| Group | Files | What |
|-------|-------|------|
| 1. Token Values | 3 | tokens.ts, theme.css, fonts.css |
| 2. Layout Primitives | 4 | SectionWrapper, SectionHeading, Container, Card |
| 3. Interactive (CTAs) | 4 | Button, CTALink, InlineLink, AnimatedArrow |
| 4. Badges | 1 | Badge (with 9+ convenience exports) |
| 5. Icon Colors | 1 | iconColors.ts |
| 6. Page-Level | 8 | Navbar, ScrollProgress, ReadingProgressBar, ScrollToTop, StickyCTA, ContactModal, NextSectionCTA, TableOfContents |
| 7. Resource Grid | 2 | ResourceCard, SubtleVariantSwitcher |
| 8. Hooks | 10 | useShimmer, useScrollDirection, useHeroVisibility, useActiveSection, useCounter, useScrollAnimation, useResponsiveGutter, useReadingProgress, useSectionProgress, useMagneticEffect |
| 9. Reference Sections | 10 | Hero, ClientContext, Challenges, Objectives, Methodology, Impact, ValuePillars, Testimonial, Resources, FinalCTA |
| 10. Barrel Exports | 2 | components/index.ts, hooks/index.ts |
| 11. Dashboard Docs | 26 | Dashboard shell (2) + Foundations hub + sub-files (7) + Helpers (1) + Content tabs (5) + AllTokens viewers (6) + Showcases (10) |
| **Total** | **~76** | |

---

## Known Exceptions (Don't "Fix" These)

These are intentional patterns that look like bugs but aren't:

| File | Exception | Why |
|------|-----------|-----|
| `AllTypographyTokensContent` | Hardcoded font-size values | Demo/showcase component displaying raw token values |
| `ChallengesSection.tsx` | JS-calculated card widths | Dynamic layout that can't use static Tailwind classes |
| `ContactModal.tsx` | Hardcoded modal width (500px) | Modal width is independent of container system |
| `Badge.tsx` | Uses JS object tokens, not CSS variables | Migration to `--badge-*` tokens planned, not started |
| `Navbar.tsx` | Imports SVG from `@/imports/svg-fodxwe3cpi` | Figma-imported brand logo — don't recreate |

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| v2.1 | 2026-03-06 | Added Group 11 (Dashboard Documentation System) documenting the FoundationsContent.tsx modular split into 6 sub-files under `foundations/`, dashboard shell, content tabs, AllTokens viewers, and component showcases. Updated DS version to 3.4. Updated file count from ~45 to ~76. |
| v2.0 | 2026-03-01 | Complete rewrite: proper markdown tables, 4W+H structure, added 8 missing files (Navbar, ContactModal, StickyCTA, NextSectionCTA, ReadingProgressBar, TableOfContents, 4 reference sections), added 3 missing hooks, clarified ScrollProgress vs ReadingProgressBar, added barrel export instructions, documented known exceptions, added Button secondary variant update |
| v1.0 | 2026-02-28 | Initial checklist (9 groups, ~30 files) |