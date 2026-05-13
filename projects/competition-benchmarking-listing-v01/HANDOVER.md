# HANDOVER — competition-benchmarking-listing-v01

**For:** Tech team
**From:** Design team (Aura-assisted, aura-builder Sonnet)
**Date:** 2026-05-06
**Version:** v0.1

## TL;DR

Competition Benchmarking listing page — Vite + React SPA. Fully wired filter system (industry/region/competitor-set/methodology/year), URL sync, infinite scroll, mobile filter sheet, and editorial-light brand tokens. Tech team needs to wire real API, add ESLint/tsconfig, move peer deps, and run a11y/perf gates.

## Run locally

```bash
cd projects/competition-benchmarking-listing-v01
pnpm install
pnpm dev   # → http://localhost:5175 (or next free port)
```

## Build

```bash
pnpm build
# Serve dist/ with any static host or vite preview
```

## Stack

- **Framework:** Vite 6.3.5 + React 19 (via peerDependencies)
- **Tailwind:** v4.1.12 (`@tailwindcss/vite` plugin)
- **Animation:** GSAP 3.x (hero fade-up + ScrollTrigger ready) + CSS card-reveal class (IntersectionObserver, no JS lib)
- **UI primitives:** Radix UI + DS atoms/molecules from `src/app/components/`
- **State / filtering:** `useBenchmarkFilters` custom hook (URL-synced, debounced)
- **Infinite scroll:** `useProgressiveLoad` hook (IntersectionObserver sentinel)
- **Other:** `sonner` (toasts), `lucide-react` (icons)

## Route map

Single-route SPA. No react-router in use (installed but unused).

| Route | View | Purpose |
|---|---|---|
| `/` | Competition Benchmarking Listing | Full page — hero + sidebar + cards + tail sections |

## Filter URL contract

Filters are synced to URL query params (debounced 300ms):

| Param | Type | Example |
|---|---|---|
| `type` | always `competition-benchmarking` | `?type=competition-benchmarking` |
| `industry` | multi-value | `&industry=Healthcare&industry=FMCG` |
| `region` | multi-value | `&region=India&region=GCC` |
| `size` | multi-value `3-5\|5-10\|10+` | `&size=5-10` |
| `method` | multi-value | `&method=mystery-shopping&method=hybrid` |
| `year` | multi-value | `&year=2025&year=2026` |
| `sort` | `latest\|oldest\|industry-az\|most-pages\|trending` | `&sort=latest` |
| `q` | string | `&q=skincare` |

## Mock data

- **Location:** `src/lib/mock-data.ts`
- **Marker:** every export has `// TODO: replace w/ real API — GET /api/benchmarks?filters=...`
- **Shape:** `BenchmarkReport` interface (exported) — id, title, industry, region, competitorSetSize, publishedDate, pages, methodology[], thumbnailUrl, description, slug, isFeatured?, reportType

**Replace strategy:**
1. Swap `BENCHMARK_REPORTS` import in `useBenchmarkFilters.ts` with API call
2. Replace `computeFacetCounts()` with API-provided facets endpoint
3. Remove `src/lib/mock-data.ts` mock data — keep interface + constants

## Component map

**Page-specific** (`src/app/components/`):
| File | Purpose |
|---|---|
| `BenchmarkHeroBanner.tsx` | Black hero, GSAP fade-up, stats row, CTAs |
| `BenchmarkFilterSidebar.tsx` | Desktop 280px sticky sidebar with accordion filters |
| `BenchmarkListingToolbar.tsx` | Result count + active chips + sort + ViewToggle |
| `BenchmarkCard.tsx` | Card component (featured + standard variants) |
| `BenchmarkMobileFilterSheet.tsx` | Mobile slide-from-right filter sheet (focus trap) |
| `ActiveFilterStickyBar.tsx` | Desktop sticky condensed filter chip row |
| `BenchmarkTrendingTopics.tsx` | Tail section: trending topic pills |
| `BenchmarkTestimonials.tsx` | Tail section: 3-col buyer quotes |
| `BenchmarkCustomResearchCTA.tsx` | Tail section: black bg custom research CTA |

**Hooks** (`src/app/components/hooks/`):
| File | Purpose |
|---|---|
| `useBenchmarkFilters.ts` | All filter + sort + search + URL-sync state |
| `useProgressiveLoad.ts` | Infinite scroll / load-more |
| `useCrossfade.ts` | Opacity crossfade on filter change |

**DS primitives reused** (do not re-implement):
`SectionWrapper`, `Container`, `Header`, `Footer`, `Button`, `FilterAccordion`, `FilterChip`, `FilterSearchInput`, `SidebarPanel`, `CardReveal`, `EmptyState`, `LoadMoreSentinel`, `BackToTop`, `MobileFilterBar`, `ViewToggle`

## Known issues / won't-fix

- **No ESLint config:** Add on intake.
- **No tsconfig:** Add strict tsconfig on intake.
- **Optional peer deps:** Move react/react-dom to dependencies.
- **Package name `competition-benchmarking-listing-v01`:** Rename to org-scoped name on intake.
- **`/research/competition-benchmarking/methodology` + `/contact`:** Placeholder hrefs — wire to real pages.
- **Unsplash images:** Replace with CDN on production.
- **`react-router` installed but unused:** Remove or wire up.

## Env vars

No env vars required for design-phase.

For production:
| Var | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Backend API base `http://localhost:8000` |
| `VITE_CDN_URL` | Report image CDN |

## A11y baseline

- WCAG target: AA
- Focus indicator: `theme.css` — `focus-visible` brand-red ring on light, white ring on dark
- Reduced-motion: GSAP `matchMedia` + CSS `card-reveal` class both respect `prefers-reduced-motion: reduce`
- Mobile touch targets: min 44px on all interactive elements
- Axe scan: not yet run

## Tech-team integration checklist

- [ ] Match Node ≥20 + pnpm ≥10
- [ ] Move react/react-dom to dependencies
- [ ] Rename package
- [ ] Replace mock data in `src/lib/mock-data.ts` (search `// TODO: replace w/`)
- [ ] Wire `/api/benchmarks` endpoint to `useBenchmarkFilters.ts`
- [ ] Wire `/api/benchmarks/facets` for live counts
- [ ] Replace Unsplash URLs with CDN
- [ ] Wire placeholder hrefs
- [ ] Add ESLint + tsconfig strict
- [ ] Run axe scan: 0 critical
- [ ] Run Lighthouse mobile: ≥85 perf / ≥95 a11y / ≥95 best-practices
- [ ] Wire analytics (GTM, Contentsquare, Leadfeeder)

## Contact

Design lead: design@kenresearch.com (Aura-assisted)
