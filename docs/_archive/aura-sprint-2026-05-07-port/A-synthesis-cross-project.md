# Phase A Synthesis — Cross-Project Audit Findings

**Date:** 2026-05-07
**Source:** A1-V0_lite + A2-report-store + A3-V0.2 audits
**Purpose:** Consolidate learnings before DS audit + heal (Phase B)

---

## Cross-cut deviation matrix

| Pattern | V0_lite | report-store | V0.2 |
|---|---|---|---|
| MUI/Emotion declared, 0 imports | ✓ | ✓ | ✓ |
| @phosphor + lucide both declared | ✓ (Phosphor 3 uses, drop) | — (lucide only) | ✓ (Phosphor 50 + lucide 38, consolidate) |
| react-router declared, 0 imports | n/a | ✓ | n/a (DIY pathname) |
| `motion@12` aliased framer | ✓ used | ✓ declared 0-uses | ✓ declared 0-uses |
| Figma Make pkg name `@figma/my-make-file` | ✓ | ✓ | ✓ |
| `figma:asset/` import resolver | ✓ | ✓ | ✓ |
| Local DS folder count | 1 | 1 | **4 parallel** |
| 3D libs declared | — | drei+fiber+cobe (0 uses, drop) | — |
| Multiple chart libs | — | recharts only | d3 + Highcharts + recharts (3) |
| DS atoms hardcode hex | minor | possible (Badge 703 LOC) | **219 hex literals** |
| Off-scale `[Npx]`/`[Ntext]` | minor | minor | **150 sites** |
| `peerDeps optional:true` for react | ✓ | ✓ | ✓ |
| Stale audit MDs at root | 36 | 0 (clean) | **50+** |
| 47-file shadcn `ui/` mirror | unused | used | partial |
| Mock data centralization | hardcoded | partial gateway | hardcoded inline |

## Universal Figma Make export signatures (all 3)
- `package.json` name = `@figma/my-make-file`
- `react/react-dom` as `peerDependencies` w/ `optional:true`
- `vite.config.ts` w/ `figmaAssetResolver()` plugin
- `figma:asset/<hash>.png` import scheme
- `src/main.tsx` + `index.html` Vite SPA entry
- 24 `@radix-ui/*` packages (full shadcn primitive set, mostly unused)
- `tw-animate-css` declared

## Universal junk patterns (all 3)
- `@mui/material` + `@mui/icons-material` + `@emotion/*` declared, ZERO imports
- Multiple shadcn primitive .tsx files unused (input-otp, drawer, sonner, calendar, command, etc.)
- 30-50+ phase-progress audit MDs at project root
- Hardcoded React 18 peer

## Project-specific severity

### V0_lite_report (cleanest)
- Genuinely tidy — no commented-out junk, no FIXMEs, well-typed
- Junk at file/folder level only
- Strong DS discipline (atoms promoted via marker comment)

### report-store (strong, complex)
- 110+ component files w/ atomic-design hierarchy
- 4WH JSDoc culture preserved
- Mock-data gateway already started (incomplete)
- 3D globe SSR risk on port
- App.tsx state→URL routing migration

### V0.2 (heavy rewrite, ~70-80% throwaway)
- 4 overlapping DS sources in single project
- 370+ DS deviation sites
- Off-brand purple palette saturating product
- DM Sans-as-display override fights brand voice
- Mandatory off-scale padding baked in tokens
- 13-section IA + Qatar Fresh Herbs content salvageable; visuals discarded

---

## DS LEARNINGS — Consolidated

### POSITIVE (promote to canonical DS)

**Token gaps (verify in `design-system/core/`):**
- Full warm scale 50-900
- Periwinkle scale 50-900
- Perano scale 50-900
- Purple scale 50-900 (if chart palette expanded)
- `gradients.brandRed` TS export
- `iconColors.ts` mapping + `getIconColor()` helper
- `chartColors.ts` palette
- `--rc-*` ResourceCard token family (light + dark + badge overlay)
- `--bg-composition-warm-editorial` gradient
- `--container-*` width tokens (page/content/narrow/prose/compact)
- `--text-nav` (14px), `--text-navHelper` (13px)
- `--button-min-width-{sm,md,lg}`

**Atoms:**
- FadeInSection (IntersectionObserver wrapper)
- BackToTop (floating button)
- LoadMoreSentinel
- RevealImage (blur-to-sharp)
- IconBadge
- IndustryBadge
- ActiveFilterChip
- OverheadText (chapter "CHAPTER X — Name")
- BodyText (with editorial defaults)
- ChartTitleHeader
- KenToaster (brand wrapper for sonner)

**Molecules:**
- StatCard + StatCardGroup
- TextCard
- TimelineCard
- AnalysisCard
- SegmentationCard
- StakeholderCard
- MethodologyCard
- ComparisonParameterCard
- PhaseCard
- FAQItem (Accordion variant)
- NavDropdown (consolidated mega-menu)
- HorizontalScroll
- EmptyState (brand wrapper)
- SkeletonCard (ReportCard-shape)

**Hooks:**
- useAnimatedCounter
- useShimmer
- useFocusTrap
- useKeyboardNavigation
- useProgressiveLoad
- useCrossfade
- useMountTransition
- useScrollSpy

**Patterns to document:**
- Scroll-spy sticky TOC w/ collapse-to-icons mode
- Sidebar status states (completed check / active filled / upcoming dimmed)
- Chapter overhead-text "CHAPTER X — Name"
- Mega-menu industries split column dropdown
- TOC time-estimates per chapter
- Sortable company table
- Floating CTA post-hero scroll trigger
- Final CTA gradient banner before footer
- ChapterShell decomposition (sample-report split: data.ts zero-React + 5 component files)
- Hero theme variant DSL (heroThemes.ts named visual presets via component prop)
- 92-5-3 color hierarchy + `validateColorHierarchy()` runtime checker
- Atom-promotion track marker (`// Atoms — Promoted from app-level`)
- Listing kit: ListingToolbar + ListingContextBanner + CardListing + MobileFilterSheet + MobileFilterBar + useReportFilters reference

### NEGATIVE (DS must enforce/protect against)

1. **TS-typed prop API for atoms** — no string color/size args; force token enums
2. **Lint rule against inline `style={{}}` color/size** props
3. **Lint rule against `[#xxx]` and `[Npx]` arbitrary** in className
4. **Document Noto Serif display invariant** (no DM Sans-as-display override)
5. **Document Lenis-first** (drop `html { scroll-behavior: smooth }`)
6. **Document body type rules** (no double opacity + secondary color)
7. **Editorial-light section bg alternation enforcement** (recipe lint or visual gate)
8. **Single canonical DS source** — kill local DS copies on every consumer
9. **No "mandatory" off-scale spacing** in token files
10. **Define chart palette** to fill purple-vacuum
11. **Variant gate check** — explicit cinematic-dark requires recipe override comment, otherwise editorial-light default

---

## DS-heal action items (Phase B input)

1. Audit `design-system/core/` against the POSITIVE list — log gaps
2. Audit `design-system/dashboard/` for portability + corruption
3. Decide on pnpm workspace exposure approach
4. Heal: add missing atoms/molecules/hooks per gap analysis
5. Heal: add chart palette tokens (Ken-aligned warm + red accent + neutrals)
6. Heal: TS-typed atom APIs (where currently string-arg)
7. Document anti-patterns from NEGATIVE list in DS
8. Verify DS components are framework-agnostic React (no Vite-only imports)
9. Test workspace import in throwaway Next.js consumer

---

## Port phasing (locked)

```
PHASE B — DS audit + heal (now)
PHASE C — Port V0_lite_report (best ref, establishes pattern) → DS update
PHASE D — Port report-store (second ref, complex) → DS update
PHASE E — Port V0.2_report (heavy rewrite, structure-only carry-over)
PHASE F — Final log
```

## Universal port checklist (apply per project)

1. Rename source folder → `<name>-legacy/` (read-only after this)
2. Scaffold new `<name>/` w/ Next 15 + React 19 + Tailwind v4 + shadcn + DS workspace + GSAP/Framer/Lenis + faker + MSW
3. Strip all Figma Make signatures: pkg name, peerDeps optional, vite.config, figma:asset/, main.tsx+index.html
4. Drop universal junk: MUI/Emotion, declared-not-imported deps, stale audit MDs, unused shadcn primitives
5. Consolidate: icons → lucide only, charts → one lib (Recharts default for editorial-light), motion → framer-motion (rename from `motion`)
6. Centralize mock data → `src/lib/mock-data.ts` w/ TODO markers
7. Wire MSW for API mocks
8. Token migration: theme.css → `src/app/globals.css` referencing canonical DS tokens
9. Use `next/font` for Noto Serif + DM Sans (drop `fonts.css` Google import)
10. Replace `figma:asset/` imports w/ standard imports + `public/`
11. Replace `<img>` w/ `next/image`
12. State→URL where router state present
13. Wrap SSR-unsafe components (3D, window-refs) in `dynamic({ssr:false})`
14. STATUS.md + HANDOVER.md + README.md from templates/
15. Lint/format/build/Playwright/axe/Lighthouse gate
16. HANDOVER_TRACKER.md update
