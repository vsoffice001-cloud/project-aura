# Phase A1 Audit — V0_lite_report_ver_7.05

**Date:** 2026-05-07
**Auditor:** Plan agent (Sonnet)
**Source:** `projects/V0_lite_report_ver_7.05/`
**Target stack:** Next.js 15 + React 19 + Tailwind v4 + shadcn/ui + DS workspace + GSAP/Framer/Lenis + faker + MSW
**User-rated quality:** Best ref (good DS usage, visuals = source of truth)

---

## Verdict
Genuinely clean codebase. No commented-out junk, no dead lines, no FIXME markers. Junk is at the *file/folder* level, not line level.

## Quick stats
- 98 .tsx, 19 .ts, 39 .md, 4 .css, 7 png assets
- No tsconfig.json, no .gitignore, no lockfile
- Vite SPA, NO router (single-page App.tsx renders all sections stacked)

## Dependency triage

### KEEP
- `lucide-react` (50+ imports, primary icon lib)
- `motion@12.23.24` (used as `motion/react` — official rename of framer-motion; rename imports to `framer-motion` per workspace standard)
- `recharts` (only inside `ui/chart.tsx` — likely droppable, verify)
- `tailwindcss@4.1.12` + `class-variance-authority` + `clsx` + `tailwind-merge` + `tw-animate-css`

### DROP (declared, ZERO app imports)
- `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`
- `@popperjs/core`, `react-popper`
- `react-dnd`, `react-dnd-html5-backend`
- `react-slick`, `react-day-picker`, `input-otp`, `vaul`, `cmdk`
- `embla-carousel-react`, `react-resizable-panels`, `react-responsive-masonry`
- `react-hook-form`, `date-fns`, `next-themes`, `sonner`
- `@phosphor-icons/react` (only `LockKey` in 3 files → swap to lucide `Lock`)

### REPLACE
- `vite` + `@vitejs/plugin-react` + `@tailwindcss/vite` → `next@15` + `@tailwindcss/postcss`
- `motion` → `framer-motion@^12`
- local `src/design-system/*` → `@kr/design-system` (pnpm workspace alias)
- React 18 → React 19
- Vite `@/` alias → Next tsconfig paths

### ADD (target stack req)
- `gsap`, `lenis`, `framer-motion`, `@faker-js/faker`, `msw`

## Dead folders/files (delete on port)
1. `src/github-push/` (10 files — push-staging artifacts)
2. `src/imports/` (Figma-Make raw exports — `V0Lite.tsx`, `LogoContainer.tsx`, `svg-qv2lxgwcuk.ts`)
3. **Duplicate atoms** in `src/app/components/`:
   - `InlineLink.tsx`, `ScrollProgress.tsx`, `ScrollToTop.tsx` (DS versions canonical)
4. `src/app/components/figma/ImageWithFallback.tsx` → `next/image`
5. **Entire `src/app/components/ui/` (47 shadcn mirrors)** — DS replaces
6. **36 markdown progress files** at root — keep only:
   - README.md (sanitize)
   - DESIGN_SYSTEM_VS26_IMPLEMENTATION.md
   - LABEL-BADGE-USAGE-GUIDE.md
   - SECTION_LABEL_COMPONENT_GUIDE.md
   - HERO_SECTION_DESIGN_SYSTEM_GUIDE.md
   - VARIABLE_FONTS_IMPLEMENTATION_GUIDE.md
   Move to `docs/`, delete the 30+ phase reports.

## Components by complexity
- **Trivial:** 6 hooks, all `*Dropdown.tsx`, MobileMenu/MobileTOC, ChapterMarketOverview, TrackedButton, data files
- **Moderate:** CTASection, FAQSection, ReportHighlights, KeyStats, Footer, Breadcrumb, ChapterMethodology, FloatingVariantSwitcher, CTALink, SidebarTOC, ChapterExecutiveSummary, PhaseCard, SampleReportPreview
- **Complex:** App.tsx → layout+page, NewHeader (extract Logo from imports/), HeroSection (729 LoC), SlideshowSection (480 LoC), ChapterExtendedTOC (365 LoC), AnalyticsDashboard
- **Rewrite:** ImageWithFallback (→ next/image), all ui/ shadcn mirrors (→ DS), imports/V0Lite.tsx (untouched Make output)

## Mock data
- Sources: `sample-report/data.ts` (452 lines), `Breadcrumb.healthcareBreadcrumbData`, `chartData.ts`, `heroThemes.ts`, inline literals
- Already strong types: `TOCItem`, `ExtendedPhase`, `ExtendedSection`, `FooterSummary`
- Target: `src/lib/mock-data.ts` w/ `// TODO: replace w/ real API (Django /api/reports/<slug>)` markers

## DS LEARNINGS (candidates for promotion to canonical DS)
1. **Token gaps:**
   - Full warm/periwinkle/perano scales (50–900) — verify presence in `design-system/core/`
   - `gradients.brandRed` TS export
   - `iconColors.ts` mapping + `getIconColor()` helper
   - `chartColors.ts` palette
   - `--text-nav` (14px), `--text-navHelper` (13px) — non-Major-Third nav UI sizes
2. **Hooks to promote:**
   - `useAnimatedCounter` (in HeroSection.tsx)
   - `useShimmer`, `useFocusTrap`, `useKeyboardNavigation` (verify if absent in DS)
3. **Molecules to promote:**
   - `StatCard` (HeroSection)
   - `PhaseCard` (sample-report)
   - `FAQItem` (Accordion variant)
   - `NavDropdown` (consolidate 6 *Dropdown components)
   - `ChapterShell` (sample-report decomposition pattern)
4. **Patterns to document:**
   - Variant DSL via `heroThemes.ts` (named visual presets consumed by component prop)
   - 92-5-3 color hierarchy + `validateColorHierarchy()` runtime checker
   - Atom-promotion track marker (`// Atoms — Promoted from app-level`)

## Open decisions (require human input — defer to next phase)
1. `motion` package vs `framer-motion` — workspace says framer-motion. Confirm rename direction.
2. `AnalyticsDashboard` (Ctrl+Shift+A panel) — keep dev-gated or drop?
3. `AllColorsPaletteContent.tsx` — palette preview. Move to DS docs, ship as `/design-tokens` route, or drop?
4. `chart.tsx` + recharts — confirm zero app uses, drop both?
5. `--text-nav` / `--text-navHelper` — DS scale extension or component-local?
6. Hash-anchor TOC links — `<a href="#id">` vs `<Link href="/#id">`?
7. PNG assets in `src/assets/` (Vite `figma:asset/`) — copy to `public/` or relative imports from `src/`?

## Recommended port order
1. Scaffold Next 15 + tsconfig paths + DS workspace dep
2. Port `theme.css` → `globals.css` (verify Tailwind v4 layer order)
3. Mock data consolidation
4. Atom parity audit (DS vs local) — log gaps before any code
5. Hooks
6. Trivial shells (Footer, CTASection, FAQ, Highlights, KeyStats, ChapterMarketOverview)
7. NewHeader + Logo extraction + NavDropdown consolidation
8. Sample-report subtree
9. HeroSection (split into Hero + StatCard + useAnimatedCounter)
10. SlideshowSection
11. AnalyticsDashboard (decision-gated)
12. Visual diff vs legacy

## Critical files
- `src/app/App.tsx`
- `src/styles/theme.css`
- `src/design-system/tokens.ts`
- `src/app/components/HeroSection.tsx`
- `src/app/components/sample-report/data.ts`
