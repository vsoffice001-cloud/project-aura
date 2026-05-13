# HANDOVER — reports-pdp-v2

**For:** Tech team
**From:** Design team (Aura-assisted)
**Date:** 2026-05-13
**Version:** v2.0 (post v2a build · v2b polish queue)

## TL;DR

Next 16 PRD-driven rebuild of Ken Research Reports PDP. 30 modules · 5 access tiers · 53 components · production build clean (1816ms · 6 prerendered pages) · axe 0 critical/0 serious · Lighthouse desktop 98/96/100/100. Tech needs to wire Django CMS backend per §39 data model spec · real `/api/leads` Route Handler · v2b polish queue (modal a11y headed test · dual-section DOM cleanup · token registration · mobile Lighthouse prod-build).

## Run locally

```bash
pnpm install
pnpm dev   # → http://localhost:3000
```

## Build

```bash
pnpm build
pnpm start  # production preview
```

## Stack

- **Framework:** Next.js 16.2.4 (Turbopack)
- **React:** 19.2.4
- **Tailwind:** v4
- **Animation:** Framer Motion 12 ONLY (GSAP + Lenis removed 2026-05-08 · dev-team parity)
- **UI primitives:** `@kenresearch/design-system` workspace package (atoms · molecules · organisms · hooks · shadcn UI · types)
- **Charts:** `@ken-research/charts@0.1.5` (Highcharts engine · dynamic-import ssr:false)
- **Forms:** react-hook-form ^7.75 + zod ^4
- **Tokens:** `@kenresearch/tokens` workspace package

## Route map

| Route | Page | Purpose | Mobile? |
|---|---|---|---|
| `/` | Home | Redirects to sample report | ✓ |
| `/reports/[slug]` | Report PDP | Dynamic report detail page | ✓ |

Mock slugs: `australia-cold-chain-market-2022-2027` · `gcc-pharmaceutical-market-2024-2030`.

## Components (top-level · 53 total)

| Component | File | Status | Notes |
|---|---|---|---|
| ReportDetailPage | `src/components/ReportDetailPage.tsx` | done | Orchestrator · renders 30 modules conditionally per access tier |
| AnalyticsProvider | `src/components/AnalyticsProvider.tsx` | done | 21 events · mock-only (`console.log`) · tech wires real GTM/GA |
| SchemaInjector | `src/components/SchemaInjector.tsx` | done | 9 JSON-LD types + inline FAQPage |

Full list: `src/components/`. Sub-organisms in `src/components/{hero,chart,forms,modules,overlays,nav}/`.

## Modules (30 total · per PRD)

Hero: Hero4TabCockpit · ReportIntelligenceSnapshot · KeyStatsStrip
Body: ExecutiveSummary · ReportScope · ReportFactsBlock · MarketAtAGlance · Segmentation · CompetitiveLandscape · Forecast · ChartCard ×8 zones · DatasetPreviewDrawer · InfoWallOverlay · PaywallOverlay
Forms: LeadForm (×4) · LeadFormModalProvider
Nav: StickyNavBar · TOC · RelatedReports
Schema: SchemaInjector
Analytics: AnalyticsProvider

## Access tier matrix (5 levels)

| Tier | Visible | Locked | Trigger |
|---|---|---|---|
| Public | All metadata + first chart | Charts 2-8 · dataset previews · forecasts | Anonymous user |
| Metered | First 3 charts + first dataset | Rest behind InfoWallOverlay | Anonymous · until quota |
| Lead-Gated | All charts (no dataset) | Dataset previews behind LeadForm | Quota exceeded · pre-login |
| Login-Gated | All charts + dataset previews | Full datasets · downloads | Logged in · no subscription |
| Paid | Everything | None | Active subscription |

Tier resolution in `src/lib/access-tier.ts` (mock · tech wires to real auth state).

## Mock data

- Location: `src/lib/mock-data.ts`
- Reports: `AU_COLD_CHAIN` (Australia Cold Chain Market 2022-2027) · `GCC_PHARMA` (GCC Pharma 2024-2030)
- Shape: `ReportDetailV2` (see `MOCK_DATA.md` for full spec)
- Replace strategy: tech builds Django CMS per §39 data model · `getReport(slug)` → `fetch('/api/reports/' + slug)`

## Env vars

| Var | Purpose | Required? | Example |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | Django CMS base | yes (post-handover) | `http://localhost:8000` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics | optional | `G-XXXXXXX` |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager | optional | `GTM-XXXXXXX` |

`.env.example` to be added by tech with final var list.

## v2b polish queue (open · won't-fix in design phase)

These are deliberate deferrals · NOT blockers for tech intake:

- **Modal form a11y deep test** — focus trap + ESC + aria-live needs headed-browser Playwright session
- **Dual-section DOM cleanup** — layout wraps + organisms self-wrap = redundant `<section>` per module · merge during refactor pass
- **`--variant-editorial-text-tertiary` token registration** in `tokens.css` (currently inline color)
- **StickyCTA → lead form wiring** — currently fires analytics event only · wire to `LeadFormModalProvider.open()`
- **Real `/api/leads` Next Route Handler** — currently mock console.log in `src/components/forms/shared.tsx`
- **Mobile bottom-sheet variant for DatasetPreviewDrawer** — currently right-slide on all viewports
- **MultiAxisLineChart axis-assignment metadata** in schema for `combo` chartType (currently degrades to ColumnChart)
- **Mobile Lighthouse prod-build** — N/A in Next 16 dev (Lantern trace bug · not real regression)

## Known issues / won't-fix (handed to tech)

- **Django CMS backend** implementation — design ships frontend mock matching §39 data model · tech builds the backend
- **Real `@ken-research/charts` integration** may need legal review for Highcharts license · check before npm publish
- **BubbleChart · Heatmap · MapChart deferred** — not needed for AU Cold Chain payload · add when needed

## A11y baseline

- WCAG: AA target
- Tested via: `pnpm exec playwright test` (axe-playwright + custom probes)
- Last scan: **2026-05-11** — 0 critical · 0 serious (desktop + mobile)
- Reduced-motion: honored (8 motion components + global CSS fallback in `globals.css`)

## Perf baseline

- **Lighthouse desktop (2026-05-11):** Perf 98 · A11y 96 · BP 100 · SEO 100
- **Lighthouse mobile:** pending prod-build run (Next 16 dev Lantern bug)
- **Build:** 1816ms · 6 pages prerendered · Next 16.2.4 Turbopack
- **First Load JS:** baseline 159kB (workspace standard)
- **LCP/INP/CLS:** TBD post-mobile-Lighthouse

## Visual baseline

- Screenshots: `qa-screenshots/v2b-final/`
- Comparison sets: `qa-screenshots/v1a-final/` (v1 baseline) · `v2a-final/` (v2 post-build) · `v2b-final/` (current)

## Brand tokens

- Source: `@kenresearch/tokens` workspace package
- Surface: editorial-light default (warm off-white `#f5f2f1` · black text · Ken red `#b01f24` CTAs)
- Quick ref: `Quick_start_guide.md` at workspace root

## Animation rules

- **Framer Motion ONLY** (no GSAP · no Lenis · dev-team parity 2026-05-08)
- **Scroll-driven:** Framer `useScroll` + `useTransform` for parallax · `useInView` for entrance triggers
- **Smooth page scroll:** native CSS `html { scroll-behavior: smooth }` via DS `base.css`
- **Reduced motion:** MANDATORY via `useReducedMotion()` or CSS `@media (prefers-reduced-motion: reduce)`

## Tech-team integration checklist

- [ ] Match Node version (`.nvmrc` → 20.20.1)
- [ ] Match pnpm version (`packageManager: pnpm@10.33.0`)
- [ ] Wire Django CMS per §39 data model spec (mock-to-real: `src/lib/mock-data.ts` → `/api/reports/[slug]`)
- [ ] Replace `console.log` in `forms/shared.tsx` w/ real `/api/leads` Route Handler
- [ ] Replace mock `console.log` in `AnalyticsProvider` w/ real GTM/GA wiring
- [ ] Wire NextAuth for Login-Gated + Paid tier resolution
- [ ] Wire access tier resolution in `src/lib/access-tier.ts` to real subscription state
- [ ] Re-run a11y + perf gates against your CI
- [ ] Run mobile Lighthouse against prod-build (`pnpm build && pnpm start` then Lighthouse mobile)
- [ ] Address v2b polish queue items (above · low-risk follow-up · non-blocking)
- [ ] Legal review for `@ken-research/charts` (Highcharts) license before npm publish

## Contact

Design lead: design@kenresearch.com (Aura-assisted)
