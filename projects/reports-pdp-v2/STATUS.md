# STATUS — reports-pdp-v2

**Status:** `ready-for-tech` (v2a build + docs complete · v2b polish queue handed to tech as non-blocking follow-up)
**Owner (current):** design (handing) → tech-team
**Last review:** 2026-05-13
**Reviewer:** Aura

## Current state
V2 = **PRD-driven rebuild** of Reports Product Page. Replaces v1 (frozen archive) per workspace versioning rule. Source of truth: `Ken_Research_V1_Product_Page_Rebuild_PRD.pdf` (54 sections, 19 pages). Sample report: Australia Cold Chain Market 2022-2027.

**v1 vs v2 deltas:**
- Charts: Recharts → `@ken-research/charts@0.1.5` (Highcharts engine, 9 components per Storybook)
- Hero: split layout → 4-tab cockpit (Market Size / Forecast / Segmentation / Competitors)
- Access tiers: binary `gated` → 5 levels (Public / Metered / Lead-Gated / Login-Gated / Paid)
- Add: ReportIntelligenceSnapshot, KeyStatsStrip, ExecutiveSummary, ReportScope, ReportFactsBlock, StickyNavBar, DatasetPreviewDrawer, InfoWallOverlay, PaywallOverlay, 4 LeadForms, SchemaInjector (8 JSON-LD types), AnalyticsProvider (19 events)
- Chart Card: 3-zone → 8-zone (Header / Title / Insight / Controls / Viz / Dataset Preview / Source / Access State / CTA)
- Animation: Drop GSAP + Lenis (per CLAUDE.md L153 dev-team parity). Framer Motion only.
- CMS: Frontend mock matches Django CMS data model §39. Tech-team builds Django after handover.

**Stage:** v2a build complete (Phase 1B + 2A + 2B + 3A + 3B). Production build green (1816ms, 6 pages prerendered). QA pass: axe 0 critical/0 serious (desktop + mobile), Lighthouse desktop 98/96/100/100. 11 inline a11y fixes + 2 Aura decisions applied. Mobile Lighthouse Perf score N/A (Next 16 dev Lantern trace bug, not real regression).

**Reuse from v1:** ~70% (14 KEEP organisms, 9 REFACTOR, 1 REWRITE) per audit `qa-screenshots/v1a-final/` baseline + builder reports.

## Pre-handover gate (mark as you pass each)
- [x] `pnpm install` from clean clone boots
- [x] Lint clean (pnpm lint zero violations)
- [x] Build succeeds (pnpm build 1816ms, 6 pages)
- [x] Mock data extracted to `src/lib/mock-data.ts` (AU_COLD_CHAIN + GCC_PHARMA, ReportDetailV2 shape)
- [x] TS strict mode on
- [x] A11y axe scan: 0 critical / 0 serious (desktop + mobile) + **Lighthouse mobile A11y 100/100** (2026-05-13 v2b run)
- [x] Lighthouse mobile prod-build (2026-05-13): **Perf 91 · A11y 100 · BP 100 · SEO 100**. FCP 1.1s · LCP 3.5s · CLS 0 · TBT 40ms · TTI 3.5s · SI 1.1s. Report: `qa-screenshots/v2b-final/lighthouse/mobile-final.report.html`
- [x] `prefers-reduced-motion` honored (8 motion components + CSS global fallback)
- [x] `README.md` complete (added 2026-05-13)
- [x] `HANDOVER.md` complete (added 2026-05-13 · incl. Django CMS pointer + v2b queue)
- [x] Visual baseline screenshots captured (`qa-screenshots/v2b-final/` · v1a + v2a baselines retained)
- [ ] Conventional commits in git log — deferred (current session in single conversation · tech can commit on intake)

**v2b closed (2026-05-13):**
- ✅ Modal form a11y deep test — `tests/modal-a11y.spec.ts` · 7/7 pass (focus trap · ESC · backdrop · close-X · aria-modal · aria-labelledby · focus-into-modal · focus-restored-to-trigger)
- ✅ Lighthouse mobile prod-build run — 91 / **100** / 100 / 100
- ✅ A11y fixes inline applied (6 files): role="img" on logo placeholders (EcosystemTierGrid · CompetitorLandscapeModule · CompetitorComparisonTable · ValueChainStepper); conditional aria-controls on closed accordions (TaxonomyTree); dl/Badge sibling refactor (ChallengesSolutionsTable · RegulatoryCardStack); skip-link main-content alias (ReportDetailPage)

**v2b open items (defer to tech-team · non-blocking):**
- Dual-section DOM cleanup (layout wraps + organisms self-wrap = redundant `<section>` per module)
- `--variant-editorial-text-tertiary` token registration in tokens.css
- StickyCTA → lead form wiring (currently fires analytics only)
- Real `/api/leads` Next Route Handler (mock-only via `console.log` in `forms/shared.tsx`)
- Mobile bottom-sheet variant for DatasetPreviewDrawer (currently right-slide on all viewports)
- MultiAxisLineChart axis-assignment metadata in schema for `combo` chartType (currently degrades to ColumnChart)
- Navbar link touch-target sizes (Lighthouse flagged `/procurement` `/expert-panel` < 24px · cosmetic non-blocker)

## Open issues (won't fix in design phase)
- Django CMS backend implementation (handed to tech via §39 data model spec)
- Real `@ken-research/charts` integration may need legal review for Highcharts license
- BubbleChart / Heatmap / MapChart deferred (not needed for AU Cold Chain payload)

## Versioning notes
- This is version `2`. Predecessor: `projects/reports-pdp-v1/` (frozen 2026-05-06 — DO NOT EDIT, archive only).
- Next iteration → copy to `reports-pdp-v3/`, do not edit this folder after handover.
