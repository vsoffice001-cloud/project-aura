# Handover Tracker

Single source of truth for design→tech handover status across all projects.

**How to read:** find your project, check status. **How to update:** edit row when status changes; log change in `docs/CHANGELOG.md` if material.

**Status values:**
- `exploring` — design exploration / experimentation, not stable
- `cleanup` — design fixed, code cleanup in progress
- `ready-for-tech` — passes pre-handover gate (Aura-QA verified), waiting tech intake
- `handed-over` — tech team owns it, design archived this version, new versions go to `<name>-v<n+1>/`

## Projects

| Project | Type | Status | Last review | Owner | Notes |
|---|---|---|---|---|---|
| `casestudy-templates/ken-v1` | Next.js 15 | `deleted-2026-05-05` | — | — | Archived. Replaced by recipe-driven approach (design-system/recipes/case-study.md). Reference copy for future case-study builds available in git history. |
| `casestudy-templates/template-v3` | Vite/React | `exploring` | 2026-04-30 | design | Phase 3 light cleanup complete (exploration status; full cleanup deferred until status flips). |
| `casestudy-templates/template-v28` | Vite/React | `exploring` | 2026-04-30 | design | Phase 3 light cleanup complete (exploration status; full cleanup deferred until status flips). |
| `design-system/core-v2` | Next 15 + RSC | `ready-for-tech` | 2026-05-13 | design (handing) → tech-team | **Ready for tech intake 2026-05-13.** 100% OG `Design_system_vs_26` coverage (DS Port Phase 1-3 complete). 23 hooks · 42 atoms · 26 molecules · 38 organisms · 46 shadcn ui · 13 public types · 4 patterns · Highcharts theme + 5 presets. Typecheck + build clean (`dist/` generated). STATUS.md + HANDOVER.md present. Adapter pattern for data-coupled organisms. Open for tech: ESLint setup (lint script aspirational · not installed) · Storybook stories deferred · `FigmaButtonComparison` doc-only · `playground/` not maintained. Pre-npm-publish: flip exports map to `dist/` paths per `_exports_note`. |
| `design-system/core` | Vite/React | `deleted-2026-05-11` | 2026-05-11 | — | v1 legacy DELETED 2026-05-11 post cleanup audit. Forensic at `docs/aura-sprint-2026-05-07-port/B-DS-FORENSIC-v1-and-heal-plan.md`. core-v2 retains comment-only "Source:" annotations referencing old paths (no runtime imports). Recoverable from git history if archaeology ever needed. |
| `design-system/dashboard` | Vite/React | `deleted-2026-05-11` | 2026-05-11 | — | Figma Make duplicate DELETED 2026-05-11. Functionally subsumed by core-v2. No active refs. |
| `report-store-legacy` | Vite/React | `frozen-readonly` | 2026-05-08 | — | Sprint 2026-05-07 Phase D legacy. Renamed from `report-store-v07`. Reference for Next.js port at `projects/report-store/`. LEGACY-READONLY.md present. DO NOT EDIT. |
| `report-store` | Next.js 15 | `scaffold` | 2026-05-08 | design | Sprint 2026-05-07 Phase D foundation. Next 15 + DS workspace scaffolded; mock-data gateway (10 exports verbatim from legacy data.ts 413 LOC) + NavbarShell wired; build clean (159kB First Load JS). Detailed section ports (110+ files: Hero+3D globe, IndustrySidebar 675 LOC, ReportCard 583 LOC, useReportFilters URL-state migration, MobileFilterSheet, etc.) deferred to consumer-driven follow-up per `A2-report-store-audit.md`. |
| `V0_lite_report-legacy` | Vite/React | `frozen-readonly` | 2026-05-08 | — | Sprint 2026-05-07 Phase C legacy. Renamed from `V0_lite_report_ver_7.05`. LEGACY-READONLY.md present. DO NOT EDIT. |
| `V0_lite_report` | Next.js 15 | `cleanup` | 2026-05-08 | design | Sprint 2026-05-07 Phase C COMPLETE (8 steps). Full port: 9 hooks + 20 atoms + 5 molecules + 8 organisms promoted to DS core-v2; 13 page sections wired (Hero cinematic-dark + KeyStats + ReportHighlights + SampleReportPreview w/ SidebarTOC + 4 chapters + MobileTOC + PhaseCard + Slideshow + FAQ + CTA + Footer + Navbar + AnalyticsDashboard stub). Production build clean (179kB First Load JS, 5 prerendered pages). Pre-handover gate items pending: a11y axe, Lighthouse, visual baseline, real Logo asset, useAnalytics tracker (229 LOC stub), real slide assets. |
| `V0.2_report-legacy` | Vite/React | `frozen-readonly` | 2026-05-08 | — | Sprint 2026-05-07 Phase E legacy. Renamed from `V0.2_report_handover_file`. LEGACY-READONLY.md w/ STRUCTURE-only carry-over scope (~70-80% throwaway). DO NOT EDIT. |
| `V0.2_report` | Next.js 15 | `scaffold` | 2026-05-08 | design | Sprint 2026-05-07 Phase E foundation. Next 15 + DS workspace scaffolded; reportMeta (Qatar Fresh Herbs verbatim) + NavbarShell wired; build clean (159kB First Load JS). Heavy rewrite per `A3-V0.2_report-audit.md` — 13-section IA + content carry-over structure-only. Cinematic-dark hero per KSA Coldchain ref. d3 mindmap kept (per user). Detailed section ports deferred consumer-driven (estimate 9-13 working days per audit). |
| `topnav-v32` | Vite/React | `cleanup` | 2026-04-30 | design | Phase 3 cleanup complete. A11y/perf/visual baseline pending. |
| `webpages-ken/ken-research-about` | Static HTML | `exploring` | 2026-04-30 | design | About page mock. Phase 3 light cleanup complete (STATUS+HANDOVER+README). Custom cursor/WebGL/reduced-motion flagged for tech. |
| `ken-research-backend` | Django | `local-dev` | 2026-04-30 | tech-team | We use locally; tech owns code |
| `reports-pdp-v1` | Next.js 16 | `deleted-2026-05-11` | 2026-05-11 | — | DELETED 2026-05-11. V1 Reports PDP archived since 2026-05-06 PRD drop. Replaced by reports-pdp-v2. Recoverable from git history. |
| `reports-pdp-v2` | Next.js 16 | `ready-for-tech` | 2026-05-13 | design (handing) → tech-team | **Ready for tech intake 2026-05-13.** PRD-driven rebuild of Reports PDP. v2a+v2b complete: 30 modules · 5 access tiers · 4-tab hero cockpit · 8-zone Chart Card · `@ken-research/charts` (Highcharts) · 4 lead forms + LeadFormModalProvider · schema.org JSON-LD ×9 · 21 analytics events. Build clean (Next 16.2.4 Turbopack). Lighthouse desktop 98/96/100/100 · **mobile prod 91/100/100/100** (2026-05-13). axe 0 critical/0 serious. Modal a11y test 7/7 pass (`tests/modal-a11y.spec.ts`). README.md + HANDOVER.md present. Open for tech: Django CMS impl (§39 spec) · real `/api/leads` route · navbar touch-target sizing · dual-section DOM cleanup · token registration. |
| `competition-benchmarking-listing-v01` | Vite/React | `exploring` | 2026-05-07 | design | Design-exploration playground for Competition Benchmarking listing. Source for v02 handover snapshot. Continues to host further iterations + variant exploration. |
| `competition-benchmarking-listing-v02` | Vite/React | `ready-for-tech` | 2026-05-07 | design (handing) → tech-team | **Handover-ready snapshot** of v01. Hero 4 variants (D=slim default; A/B/C alt in DEV-only via SubtleVariantSwitcher). Sidebar = RS IndustrySidebar pattern w/ 7 dimensions (Report Type · Industry · Tags · Region · Country · Set Size · Methodology · Year) on Ken's full catalogs (14 industries, 6 regions, 23 countries, 10 trending tags). Featured hero carousel (4 reports, 6s auto-cycle, pause on hover). Active-filter chips strip (RS Zone B clone, color-coded). Masonry grid + RS-canonical card chrome + glassmorphism Featured/Latest badges (WCAG AAA). RS ListCard 1:1 for list view. Warm-palette stats strip after ContextBanner. Mock data only — `src/lib/mock-data.ts`. Build clean (1.31s, 130KB gzip JS). Open: tsconfig+eslint+test setup deferred to tech intake. See STATUS.md + HANDOVER.md inside folder. |

## Pre-handover gate

A project goes `cleanup` → `ready-for-tech` only after Aura-QA verifies all of:

1. ✅ `pnpm install` from clean clone → boots cleanly
2. ✅ Lint clean (`pnpm lint`)
3. ✅ Build succeeds (`pnpm build`)
4. ✅ Mock data isolated to `src/lib/mock-data.ts` w/ `// TODO: replace w/ real API` markers
5. ✅ TypeScript strict mode on (or documented exception)
6. ✅ A11y axe-playwright: zero `critical` violations
7. ✅ Lighthouse mobile: Perf ≥85, A11y ≥95, Best Practices ≥95
8. ✅ `prefers-reduced-motion` honored everywhere
9. ✅ `README.md` (run/build/deps/version requirements)
10. ✅ `HANDOVER.md` (route map, components, mock data pointers, known issues, env vars)
11. ✅ `STATUS.md` set to `ready-for-tech`
12. ✅ Visual QA baseline screenshots captured (gstack)
13. ✅ Conventional commits in git log

## Versioning rule (per project)

When a `handed-over` project needs design iteration:
1. **Copy** the entire folder to `<name>-v<n+1>/` (new sibling).
2. **Never** edit the handed-over folder — tech owns it.
3. Update root `Quick_start_guide.md` workspace table to point at new version.
4. Old version's `STATUS.md` stays `handed-over`. New version starts `exploring`.

Why: tech merges main; design iterates on a copy; we don't conflict on the same tree.
