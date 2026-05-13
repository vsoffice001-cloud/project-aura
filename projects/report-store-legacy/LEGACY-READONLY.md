# LEGACY-READONLY — report-store-v07 (Vite/Figma Make export)

**Date frozen:** 2026-05-08
**Reason:** Replaced by `projects/report-store/` (Next.js 15 port).
**DO NOT EDIT.** Read-only reference for visual truth + content carry-over.

## Carry-over scope (per `docs/aura-sprint-2026-05-07-port/A2-report-store-audit.md`)

**Visual reference (second-best ref per user):**
- Atomic-design hierarchy (atoms / molecules / organisms / templates)
- 4WH JSDoc culture
- IndustrySidebar (675 LOC sticky filter sidebar)
- ReportCard (583 LOC list+grid variants)
- 3D globe pattern (`ui/globe.tsx` 330 LOC three.js + three-globe — wrap dynamic({ssr:false}))
- ReportStoreHero (372 LOC hero w/ embedded 3D globe)

**Content carry-over (verbatim):**
- `src/app/components/data.ts` (413 LOC, 10 exports: industries, reports, subcategoryTagMap, trendingTopics, regions, stats, dailyHighlights, analystPicks, bundles, upcomingReports)
- `src/lib/mock-data.ts` (existing partial gateway — extend to full 10 exports)
- `src/imports/afghanistan-angola-geo-2.json` (417KB GeoJSON — move to `public/geo/`)
- 10 PNG trust logos in `src/assets/`

**Discard:**
- vite.config.ts (figmaAssetResolver), index.html, main.tsx
- 24 declared `@radix-ui/*` w/ no src imports (keep only those used by retained shadcn primitives)
- @mui/material + @emotion (declared, ZERO imports)
- @react-three/fiber + @react-three/drei + cobe (declared, ZERO imports — keep only direct three + three-globe)
- react-router@7 (declared, ZERO imports — Next App Router replaces)
- motion@12 (declared, ZERO imports per HANDOVER claim — replace w/ framer-motion at consumer)
- 47 ui/ shadcn primitives — most unused (audit on port; DS atoms cover most)
- Top-level `Globe.tsx` (421 LOC — DEAD CODE, never imported)
- `FiltersPanel`, `TopDownloads`, `NewsletterSignup`, `ReportStorePage` (barrel-exported, unwired in App.tsx)
- `_dev-notes/` (4 audit MDs + 2 draft TSX + 2 HTML drafts + 1 CSV — already excluded from src)
- All `figma:asset/*` import scheme (10 sites in Testimonials.tsx)
- All inline `style={{}}` color/size + hardcoded hex literals (token migration on port)

## Lineage

- Source: report-store-v07 (Figma Make export, `@figma/my-make-file` package name)
- Target: `projects/report-store/` (Next.js 15 + React 19 + Tailwind v4 + shadcn/ui + DS workspace `@kenresearch/design-system`)
- Audit: `docs/aura-sprint-2026-05-07-port/A2-report-store-audit.md`
- Sprint: `docs/aura-sprint-2026-05-07-port/RESUME-NOTE.md`
