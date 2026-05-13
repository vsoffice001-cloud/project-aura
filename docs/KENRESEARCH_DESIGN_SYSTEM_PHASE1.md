# Ken Research Design System — Phase 1 Knowledge Doc

**Status:** Phase 1 · Active / In Evolution  
**Projects:** `design-system-v26/` (canonical GitHub source) · `design-system-dashboard/` (Figma Make preview + documentation surface)  
**Maintained by:** design@kenresearch.com  
**Created:** 2026-04-30

---

## What Is This

Ken Research's own design system — created specifically for kenresearch.com and its product surfaces. It is not off-the-shelf Bootstrap or MUI; it is opinionated, research-company-specific, and partially industry-aligned.

Phase 1 shipped with functional component coverage but known gaps in a11y documentation, token pipeline completeness, and Storybook. Phase 1 is deliberately "good enough to build products" — not "good enough to open-source."

**Phase 1 is NOT finished. It needs correction and evolution.** These docs exist so Aura + tech team understand what exists, what was intentional, and what still needs work.

---

## Why It Exists

**Ken Research is a B2B research intelligence company.** Products include:
- Report Store (search + filter 1M+ reports)
- Case Studies (premium editorial storytelling)
- Surveys (lifecycle tracking)
- Eventually: RAG AI interfaces, analytics dashboards

A generic design system (Carbon, Ant, MUI defaults) would produce a generic B2B SaaS look. Ken Research competes on editorial quality and data credibility. The design system encodes that competitive positioning.

**The 4W+H:**
- **Why:** Competitive differentiation, editorial premium, consistent brand trust signal
- **What:** Component + token system for all Ken Research digital surfaces
- **When:** Any time a new surface, page, or component is built for kenresearch.com
- **When Not:** External client deliverables, third-party embeds, experimental prototypes with no path to production
- **How:** Figma → DS-v26/Dashboard (design) → ken-v1 / report-store / surveys (production)

---

## Identity

**Name:** Ken Research Design System — Editorial (internal shorthand: DS-v26)  
**Version:** v4.3 (codename: Premium Editorial)  
**Variant:** Editorial Light — warm off-white surfaces, dark text  
**Counterpart:** Cinematic Dark — `ken-v1` uses the dark variant (`#0a0a0c` bg, `#FAFAFA` text)

Both variants share the same brand fundamentals. They are not separate design systems — they are two surface palettes of one system.

---

## Brand Fundamentals (shared across ALL surfaces)

### 92-5-3 Color Hierarchy

| Tier | % | Colors | Rule |
|---|---|---|---|
| Foundation | 92% | `#000000`, `#ffffff`, `#f5f2f1` (warm white) | Dominant — structure, backgrounds, text |
| Brand | 5% | `#b01f24` (Ken Red) | CTAs ONLY — never decorative |
| Accent | 3% | `#806ce0` (purple), periwinkle, coral, perano | Badges, data viz, icons only |

**Hard rule:** Ken Red is for CTAs only. Never use it for decorative borders, icons, section dividers, or hover states on non-CTA elements.

### Typography Scale — Major Third (1.25×)

| Token | Size | Usage |
|---|---|---|
| `--text-3xl` | 48.8px | Hero h1 ONLY — one per page |
| `--text-2xl` | 39px | All section h2 |
| `--text-xl` | 31.25px | Subsection h3 |
| `--text-lg` | 25px | Large emphasis, pull quotes |
| `--text-md` | 20px | Sub-emphasis |
| `--text-sm` | 16px | **All body text — 90% of content** |
| `--text-xs` | 12.8px | Labels, eyebrows, filter items (main) |
| `--text-nav` | 14px | Navigation, TOC, compact CTAs (semantic — off-scale) |
| `--text-compact` | 14px | Dense card grids (4+ items) |
| `--button-font-sm` | 14px | Small buttons |
| `--text-card-micro` | 10px | Counts, side numbers ONLY — never for main text |

**Three 14px tokens serve different semantic purposes.** They are technically equal but not interchangeable. Using wrong one creates semantic drift for future maintainers.

**Font stack:**
- Display/Headings: **Noto Serif** — editorial authority
- Body: **DM Sans** — modern, legible, neutral

### Spacing

Base-10 scale. `--space-1` = 4px through `--space-24` = 96px. Never arbitrary pixel values.

### Container Widths

| Token | Width | Use |
|---|---|---|
| `--container-page` | 1200px | Full-width sections |
| `--container-content` | 1000px | Standard content |
| `--container-narrow` | 900px | Focused reading |
| `--container-prose` | 700px | Long-form body text |
| `--container-compact` | 600px | Short forms, modals |

### Border Radius

| Token | Value | Use |
|---|---|---|
| `--radius-image` | 2.5px | Images, media — barely-there rounding |
| `--radius-button` | 5px | All buttons |
| `--radius-card` | 10px | Cards, containers |

---

## Two Projects, One System

### `design-system-v26/`

- **Stack:** Vite 6 + React 18 + Radix UI + MUI 7 + Emotion + `framer-motion` v11
- **Role:** Canonical GitHub source for DS component library
- **Tokens:** `src/styles/theme.css` (470+ CSS custom properties) + `src/design-system/tokens.ts` (TS mirror)
- **Run:** `pnpm dev` on port 5173

### `design-system-dashboard/`

- **Stack:** Vite 6 + React 18 + Radix UI + MUI 7 + Emotion + `motion` v12 (rebranded framer-motion — imported as `motion/react`, NOT `framer-motion`)
- **Role:** Figma Make export — live documentation + browsable preview surface. 7 tabs: Overview, Foundations, Components, Patterns, Motion, Guidelines, Resources. Full Report Store + Surveys + Case Study demos embedded.
- **Tokens:** `src/styles/theme.css` (same editorial light palette — same token set)
- **Origin:** Figma Make, not green-field. Has intentional divergences from GitHub (see below).
- **Run:** `pnpm dev` (starts on available port, typically 5174)

**Critical: Figma Make vs GitHub divergences (intentional, not bugs):**

| Area | Figma Make version | GitHub version |
|---|---|---|
| `App.tsx` | Renders `DesignSystemDashboard` directly | Uses react-router-dom routes |
| `src/imports/*.tsx` | 16 Figma frame files | SVG path files only |
| `src/app/components/ui/` | 48 shadcn/ui primitives | Not tracked in GitHub |
| `motion/react` | v12 package | — |
| `figma:asset/` URL scheme | Active in vite.config.ts | Must be removed before prod |

Do NOT push `App.tsx`, `src/imports/`, `src/app/components/ui/`, `figma/ImageWithFallback.tsx`, or `pnpm-lock.yaml` from Figma Make to GitHub. See `GITHUB_PUSH_GUIDE.md` v2.0 in the project.

---

## Component Inventory

### Atomic Layer

**35 atoms** across two groups:

**Core atoms:**
Button (4 variants × 5 sizes, always-active shimmer brand signature), CTALink, InlineLink, AnimatedArrow, Badge (11 themes × 4 sizes × 3 variants), Label, Card (v4.0, 3 variants, ref-based hover, `as` prop), IconBadge, Tooltip, ViewToggle, FadeInSection, FilterCheckbox, FilterChip, FilterSearchInput, FilterSectionHeader, FilterCheckboxItem, FilterIndustryItem, CategoryListItem

Badge convenience wrappers: SectionLabel, StepPill, ObjectivePill, ObjectivePillInteractive, InfoCardLabel, CategoryBadge, StatusBadge, InfoBadge, MutedBadge, ClickableBadge

**Layout & utility atoms:**
Container, SectionHeading (v4.0, prop-based API), SectionWrapper, Navbar, CodeBlockWithCopy, CollapsibleSection, ReadingProgressBar, ScrollProgress, ScrollToTop, SpacingHelpers, VariantSwitcher, SubtleVariantSwitcher, TableOfContents, NextSectionCTA, ContactModal, StickyCTA

### Molecular Layer (26 molecules)

IndustryBadge, CardMetaRow, CardFooterRow, **ReportCard** (canonical — grid + list layouts), ReportGridCard (**DEPRECATED** → use `ReportCard layout="grid"`), HorizontalScroll (transform carousel with momentum/drag), ScrollFade (native overflow-x with fade masks), AnalystPickCardB, StatCard, DataHighlightCard, EmptyState, BackToTop, SkeletonCard, CardReveal, RevealImage, CompletionBadge, SurveyCard, ResponseChart, QuestionPreview, SurveySkeleton, FilterAccordion, SidebarPanel, ActiveFilterChipBar, MobileFilterSheet, CategoryListCard, LoadMoreSentinel

ResourceCard (7 variants: flat / article / minimal / dark-overlay / image-top / image-top-new / compact)

### Organism Layer (40 organisms)

**Cross-pillar (6):**
ProductHero, FeaturedCarousel, StatsRow, BrowseGrid, CTABanner, ProductPageTemplate

**Report Store (24):**
ReportStoreHero, FeaturedResearch, ListingToolbar, CardListing, FiltersPanel, IndustrySidebar, IndustryFocusBanner, DailyDataHighlights, AnalystPicks, IndustrySectorsGrid, KeyMarketIndicators, RecommendedForYou, CustomResearchCTA, TrendingTopics, TopDownloads, RecentlyViewed, UpcomingReports, ResearchMethodology, NewsletterSignup, IndustrySpotlight, ComparisonTable, ReportPreview, TestimonialsRS, QuickAccessBar

**Case Study (10, live flat in `src/app/components/` — NOT in organisms/ directory):**
HeroSection, ClientContextSection, ChallengesSection, EngagementObjectivesSection, MethodologySection, ImpactSection (4 variants), ValuePillarsSection, TestimonialSection, ResourcesSection, FinalCTASection

### Template Layer

Full-page assembly via `ProductPageTemplate` (declarative config object approach). Surfaces: Case Study, Report Store, Surveys.

---

## Token Architecture

**Primitive layer:** `src/design-system/tokens.ts` — TypeScript constants for all raw values  
**Semantic layer (partial):** `src/styles/theme.css` — 470+ CSS custom properties. Semantic intent expressed but naming not fully W3C DTCG compliant  
**Component layer:** Per-component scoped variables (`--rc-*` for ResourceCard, `--badge-*` for Badge)

**What's missing from industry-standard token pipelines:**
- No `tokens.json` (W3C Design Token Community Group format)
- No Style Dictionary or Token Pipeline build process
- No multi-theme output (dark/light as compile outputs) — variants handled in separate files
- No automated token validation CI check

---

## Hooks

14 custom hooks in `src/app/hooks/`:

`useShimmer` **(DO NOT DELETE — brand-defining animation)**, `useScrollDirection`, `useHeroVisibility`, `useActiveSection`, `useCounter`, `useScrollAnimation`, `useResponsiveGutter`, `useReadingProgress`, `useSectionProgress`, `useMagneticEffect`, `useReportFilters` (7-dimension filter state machine), `useProgressiveLoad` (IntersectionObserver infinite scroll), `useCrossfade`, `useMountTransition`

---

## Non-Obvious Rules (must preserve)

These constraints are not evident from code alone. Violating them breaks behavior or brand identity silently.

**1. `useShimmer` — DO NOT DELETE.**  
Always-active shimmer on Button is core brand identity. Deleting the hook breaks it silently. The hook is annotated `[DO NOT DELETE]` in `PROJECT_STRUCTURE.md`.

**2. Arrow direction = ArrowUpRight always.**  
`showArrow` prop on CTAs always renders `ArrowUpRight` (45° diagonal). Never `ArrowRight` or `ChevronRight`. This is enforced in docs.

**3. Organisms self-contain SectionWrapper — never double-wrap.**  
Every RS organism includes its own `SectionWrapper` (background + padding + max-width). Wrapping an organism in another SectionWrapper creates double-padding. Known as the "double-padding bug."

**4. Case study organisms are in `src/app/components/`, not `organisms/`.**  
Importing via the organisms barrel index will fail.

**5. Section background alternation is a canon sequence.**  
Not "alternate light/dark" at will — it follows a documented sequence. Read the Guidelines tab in the dashboard.

**6. Filter components are monochromatic black-opacity only.**  
No color hue in filters. Selected state = `border-l-[3px] border-black` + `bg-black/[0.04]` + `text-black/90`. Follows 92-5-3 strictly.

**7. Icon colors via `iconColors.ts` always.**  
`iconColors.content = #806ce0` (purple), `iconColors.utility = #737373` (grey). Never Ken Red for icons.

**8. Secondary button is two-state.**  
Neutral at rest (black border + black text). Brand-red on hover only. Never full-time red.

**9. Inline styles must use `rgba()` or `var()` — never hex strings.**  
No CSS shorthand for `border`/`background` in inline styles.

**10. Card shadow is purple-tinted, not red.**  
`0 4px 16px rgba(128, 108, 224, 0.08)` — never brand red for shadow.

**11. `FoundationsContent` via re-export hub only.**  
Always import via `@/app/components/FoundationsContent`. Never import directly from `foundations/ColorsContent` etc.

**12. `motion/react` in dashboard, `framer-motion` in DS-v26.**  
These are different import paths even though v12 Motion rebranded Framer Motion. Copy-paste of animation code between projects will fail at import.

**13. `ReportGridCard` is deprecated.**  
Use `ReportCard layout="grid"` instead.

**14. `--text-card-micro` (10px) for counts/side numbers ONLY.**  
Never for main text labels. Use `--text-xs` (12.8px) for those.

**15. SectionWrapper handles horizontal padding — never add it again inside.**  
No `px-4 sm:px-6` inside a SectionWrapper child.

---

## Documentation System

**AI context modules (`ai-context/`, 6 files, ~56KB total):** Split from a former 50KB monolith at v3.4/v4.3. Each module < 10KB, optimized for AI API consumption.

**4W+H framework** applied to every component: Why / What / When / When-Not / How.

**Decision flowcharts** embedded in docs for: Button vs CTALink vs InlineLink · Card type selection · ScrollFade vs HorizontalScroll · Organism selection · Filter component selection.

**DESIGN_SYSTEM_UPDATES.md** traces v3.2 → v4.3 — read this before making structural changes to understand evolutionary constraints.

---

## Known Phase 1 Gaps (to fix in Phase 2+)

See [DESIGN_SYSTEM_EVOLUTION.md](DESIGN_SYSTEM_EVOLUTION.md) for prioritized roadmap.

Summary:
- No a11y doc (WCAG AA stated but not verified)
- No `prefers-reduced-motion` audit across DS
- No Storybook / isolated component testing
- No W3C DTCG tokens.json / no Style Dictionary pipeline
- No breakpoint system documentation
- No motion spec / motion rules doc
- No form system (inputs, selects, validation states, error patterns)
- No dark mode spec for editorial surfaces (separate from cinematic dark ken-v1)
- No design contribution guide
- No automated token validation in CI
- `text-card-micro` (10px) anti-pattern in codebase
- Inline hex colors in older components (scan with `validate-tokens.cjs`)
- `ReportGridCard` deprecated but still in codebase
- Dashboard: deep-link URL params silently broken (props mismatch bug)
- Dashboard: no lint / tsconfig / test scripts
- Dashboard: mock data in `components/data.ts` instead of `lib/mock-data.ts`

---

## Relationship to ken-v1

`ken-v1` (casestudy-templates/ken-v1/) is a production-grade Next.js 15 build. It uses the **Cinematic Dark** variant of the same brand fundamentals:

| | ken-v1 (cinematic dark) | DS-v26 / Dashboard (editorial light) |
|---|---|---|
| Background | `#0a0a0c` | `#f5f2f1` |
| Text | `#FAFAFA` | `#000000` |
| Tokens file | `src/app/globals.css` | `src/styles/theme.css` |
| Motion | GSAP + Framer Motion + Lenis | Framer Motion (`motion/react` v12 in dashboard) |
| Components | Standalone (not yet consuming DS-v26 as package) | DS-v26 IS the component library |

Ken-v1 will eventually consume DS-v26 components. Currently it has parallel implementations. Gap matrix: see [DESIGN_SYSTEM_EVOLUTION.md](DESIGN_SYSTEM_EVOLUTION.md).
