# reports-pdp-v2

Ken Research Reports Product Detail Page — **v2 PRD-driven rebuild**. Next.js 16 + React 19.

**Source of truth:** `Ken_Research_V1_Product_Page_Rebuild_PRD.pdf` (54 sections · 19 pages). Sample report: Australia Cold Chain Market 2022-2027.

## Status

`ready-for-tech` (Phase 4 complete · 5 routes · TS exit 0 · Lighthouse a11y ≥95). See [STATUS.md](STATUS.md) · [HANDOVER.md](HANDOVER.md).

## Run locally

```bash
pnpm install           # from workspace root preferred
pnpm dev               # → http://localhost:3000
```

Sample route: <http://localhost:3000/reports/australia-cold-chain-market-2022-2027>

## Build

```bash
pnpm build
pnpm start             # production preview
```

Last clean build: 1816ms · 6 pages prerendered · Next 16.2.4 Turbopack.

## Test + QA

```bash
pnpm exec playwright test                    # full QA suite (axe + visual)
pnpm exec playwright test --headed           # visible browser
pnpm exec playwright test --ui               # Playwright UI mode
```

Tests: `tests/qa-full.spec.ts`. Screenshots write to `qa-screenshots/v2b-final/`.

Last axe scan (2026-05-11): **0 critical · 0 serious** (desktop + mobile).
Last Lighthouse desktop (2026-05-11): **98 perf · 96 a11y · 100 BP · 100 SEO**.
Mobile Lighthouse pending prod-build run (Next 16 dev Lantern trace bug).

## Stack

- **Framework:** Next.js 16.2.4 (Turbopack) · React 19.2.4
- **Tailwind:** v4
- **DS:** `@kenresearch/design-system@workspace:*` + `@kenresearch/tokens@workspace:*`
- **Charts:** `@ken-research/charts@0.1.5` (Highcharts engine · dynamic-import ssr:false)
- **Forms:** react-hook-form + zod
- **Animation:** Framer Motion 12 only (no GSAP · no Lenis · dev-team parity)
- **Validation:** axe-playwright + Lighthouse CI

## Routes

| Route | Page | Purpose |
|---|---|---|
| `/` | Landing | Entry point |
| `/sample` | Report PDP | 14 sections · cinematic hero + 12 chapters + final CTA |
| `/case-study` | Acme Logistics | 10-section case-study recipe |
| `/report-store-listing` | RS listing | 11 sections · sidebar filter + grid |
| `/reports/[slug]` | Dynamic PDP | Template wired · empty data · tech fills backend |

## Architecture

- **30 modules** rendered conditionally per access tier (Public · Metered · Lead-Gated · Login-Gated · Paid)
- **4-tab hero cockpit:** Market Size · Forecast · Segmentation · Competitors
- **8-zone Chart Card:** Header · Title · Insight · Controls · Viz · Dataset Preview · Source · Access State · CTA
- **4 lead forms** + `LeadFormModalProvider` (mock console.log only · real `/api/leads` TODO)
- **9 JSON-LD types** via `SchemaInjector` + inline FAQPage
- **21 analytics events** via `AnalyticsProvider`

53 components in `src/components/`. Mock data in `src/lib/mock-data.ts` (AU_COLD_CHAIN + GCC_PHARMA).

## Reference docs (project-local)

- [MOCK_DATA.md](MOCK_DATA.md) — mock data shape + access tier matrix
- [SCHEMA.md](SCHEMA.md) — JSON-LD schema design per module
- [VARIANTS.md](VARIANTS.md) — access tier variants + paywall states
- [RESEARCH.md](RESEARCH.md) — user research notes
- [RESEARCH_DOSSIER.md](RESEARCH_DOSSIER.md) — competitive analysis dossier

## Versioning

- This = v2. Predecessor: `projects/reports-pdp-v1/` DELETED 2026-05-11. Recoverable from git.
- Next iteration → copy folder to `reports-pdp-v3/`. NEVER edit this folder post-handover.

## Contact

Design lead: design@kenresearch.com (Aura-assisted)
