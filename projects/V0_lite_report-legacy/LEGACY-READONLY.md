# LEGACY-READONLY — V0_lite_report (Vite/Figma Make export)

**Date frozen:** 2026-05-08
**Reason:** Replaced by `projects/V0_lite_report/` (Next.js 15 port).
**DO NOT EDIT.** Read-only reference for visual truth + content carry-over during port.

## Carry-over scope (per `docs/aura-sprint-2026-05-07-port/A1-V0_lite_report-audit.md`)

**Visual reference (best ref per user):**
- HeroSection layout + animated counters + StatCard composition
- SlideshowSection light/dark variant choreography
- ChapterExtendedTOC phase-filter UX
- ScrollProgress + ScrollToTop atoms (already DS-promoted)

**Content carry-over (verbatim):**
- `src/app/components/sample-report/data.ts` — TOC items, ExtendedPhases, FilterOptions, FooterSummary
- `src/app/components/Breadcrumb.tsx` — `healthcareBreadcrumbData`
- `src/app/components/chartData.ts`
- `src/app/components/heroThemes.ts` — light/dark visual presets

**Discard:**
- `src/github-push/` (push-staging artifacts)
- `src/imports/V0Lite.tsx` (Figma Make raw export, untouched)
- `src/app/components/figma/ImageWithFallback.tsx` (replaced w/ next/image)
- 30+ phase-progress .md files at root (kept only DS_VS26_IMPLEMENTATION + LABEL-BADGE-USAGE-GUIDE + SECTION_LABEL_COMPONENT_GUIDE + HERO_SECTION_DESIGN_SYSTEM_GUIDE + VARIABLE_FONTS_IMPLEMENTATION_GUIDE)
- `src/app/components/InlineLink.tsx`, `ScrollProgress.tsx`, `ScrollToTop.tsx` (duplicate atoms, DS-promoted)
- All 47 `src/app/components/ui/` shadcn mirrors (DS replaces)

## Lineage

- Source: V0_lite_report_ver_7.05 (Figma Make export, `@figma/my-make-file` package name)
- Target: `projects/V0_lite_report/` (Next.js 15 + React 19 + Tailwind v4 + shadcn/ui + DS workspace `@kenresearch/design-system`)
- Audit: `docs/aura-sprint-2026-05-07-port/A1-V0_lite_report-audit.md`
- Sprint: `docs/aura-sprint-2026-05-07-port/RESUME-NOTE.md`
