# HANDOVER — competition-benchmarking-listing-v02

**For:** Tech team
**From:** Design team (Aura-assisted)
**Date:** 2026-05-07
**Version:** v02 (handover-ready snapshot of v01 design exploration)

## TL;DR
Ken Research Competition Benchmarking listing page. Built as Vite + React + TS app, mirrors `report-store-v07/IndustrySidebar` + `ReportCard` patterns 1:1 for design-system parity. Tech team to wire real API + add lint/test infrastructure. All design decisions locked; no UI iterations needed before tech intake.

## Run locally
```bash
pnpm install
pnpm dev   # → Vite picks first free port from 5173+
```

## Build
```bash
pnpm build           # → dist/
pnpm preview         # production preview
```

## Stack
- **Framework:** Vite 6.3.5 + React 18.3.1 (TS via Vite transform — no `tsconfig.json` yet, see Open Issues)
- **Tailwind:** v4.1.12
- **Animation:** GSAP 3.15 (hero fade-up, carousel) + Motion (Framer successor) for component motion
- **UI primitives:** Radix UI (accordion / dialog / popover / tooltip / etc), copies of Ken DS atoms in `src/app/components/`
- **Layout:** `react-responsive-masonry@2.7` for grid masonry rhythm
- **Other:** `lucide-react@0.487`, `sonner@2.0` (toast), `class-variance-authority`, `tailwind-merge`

## Route map
Single-page demo (no routing yet — wire to React Router or Next.js App Router on intake).

| Route (target) | Page | Purpose | Mobile? |
|---|---|---|---|
| `/research/competition-benchmarking` | This page | Browse + filter all Competition Benchmarking reports | ✓ |
| `/research/competition-benchmarking/[slug]` | Report PDP (out of scope) | Card click destinations — slugs already wired in mock-data | ✓ |
| `/research/competition-benchmarking/methodology` | Methodology disclosure | Linked from hero "How we benchmark" + tail CTA | ✓ |

## Page sections (top-to-bottom)
1. `Header` — top nav (white)
2. `BenchmarkHeroBanner` — black, 4 variants (D = default slim, A/B/C alt designs in DEV mode only). 50vh cap on D, 85svh on A/B/C
3. `BenchmarkContextBanner` — warm-300 strip w/ breadcrumb + jump links + result count + clear-all
4. `BenchmarkStatsStrip` — warm-400 strip w/ "240+ benchmarks · 18 industries · 35 regions"
5. `<main>` listing body — white
   - `BenchmarkFilterSidebar` (left, hidden < xl)
   - `BenchmarkListingToolbar` (top of right column)
   - `BenchmarkActiveFilters` (chips strip, only when filters active)
   - Card grid OR list view (toggle in toolbar)
   - `LoadMoreSentinel` (infinite-scroll trigger)
6. `BenchmarkTrendingTopics` — warm-300, tag pill row
7. `BenchmarkMethodologyPreview` — white, 3-step methodology
8. `BenchmarkCustomResearchCTA` — black, 2-col left-aligned CTA
9. `Footer` — black

Mobile filter sheet: `BenchmarkMobileFilterSheet` (bottom-up dialog, < xl).
Sticky CTA on mobile: `MobileFilterBar` (fixed bottom-right, opens filter sheet).

## Components (page-specific)
Located: `src/app/components/`

| Component | File | Status | Notes |
|---|---|---|---|
| `BenchmarkHeroBanner` | `BenchmarkHeroBanner.tsx` | done | 4 variants (D default). DEV-only `SubtleVariantSwitcher` top-right. GSAP fade-up on mount. |
| `FeaturedReportCarousel` | `BenchmarkHeroBanner.tsx` | done | 4-report cycle, 6s auto, pause on hover, dot indicators |
| `BenchmarkFilterSidebar` | `BenchmarkFilterSidebar.tsx` | done | RS IndustrySidebar pattern — 7 sections (Report Type · Industry · Tags · Region · Country · Set Size · Methodology · Year). FilterCheckbox + FilterAccordion + FilterSearchInput |
| `BenchmarkActiveFilters` | `BenchmarkActiveFilters.tsx` | done | RS ListingContextBanner Zone-B clone. Color-coded chips (industry · tag · region · country · size · methodology · year). Clear-all visible when ≥2 active |
| `BenchmarkContextBanner` | `ListingContextBanner.tsx` (named export) | done | Breadcrumb + jump links (#filter-industry / -region / -methodology) + count + clear-all |
| `BenchmarkStatsStrip` | `BenchmarkStatsStrip.tsx` | done | Warm-400 stats bar |
| `BenchmarkListingToolbar` | `BenchmarkListingToolbar.tsx` | done | Result count + sort dropdown + ViewToggle (grid / list) + mobile filter trigger |
| `BenchmarkCard` | `BenchmarkCard.tsx` | done | Grid-mode masonry card. ResourceCard variant rotation (slot 0 = full-featured, slot 1+ rotates 6 variants) → drives masonry rhythm. RS GridCard chrome (typography/colors). Featured/Latest glassmorphism overlay badges (WCAG AAA contrast). |
| `BenchmarkListCard` | `BenchmarkListCard.tsx` | done | List-mode card. RS ListCard 1:1 (3-col: thumb / content / right-actions w/ View Report) |
| `BenchmarkMobileFilterSheet` | `BenchmarkMobileFilterSheet.tsx` | done | Bottom-up dialog w/ all filters (mirrors sidebar) |
| `BenchmarkTrendingTopics` | `BenchmarkTrendingTopics.tsx` | done | Tag pill row, hover→white surface |
| `BenchmarkMethodologyPreview` | `BenchmarkMethodologyPreview.tsx` | done | 3-step layout (Frame · Source · Synthesize) |
| `BenchmarkCustomResearchCTA` | `BenchmarkCustomResearchCTA.tsx` | done | 2-col left-aligned (eyebrow + h2 + dek + 2 CTAs / "What you get" 3-row list) |
| `useBenchmarkFilters` | `hooks/useBenchmarkFilters.ts` | done | Filter+sort+search+URL-sync state machine. 7 toggle dimensions. 300ms debounced URL push. |
| `useProgressiveLoad` | `hooks/useProgressiveLoad.ts` | done | Infinite-scroll w/ IntersectionObserver. 12 initial + 12 per load. |
| `useCrossfade` | `hooks/useCrossfade.ts` | done | 200ms opacity dip on filterHash change |

## DS atoms in this project
Copies of Ken DS components live in `src/app/components/` (not imported from external package — embedded copies for design isolation, RS-v07 follows same pattern). Tech team can extract to a shared package during DS consolidation.

Notable copies: `Button`, `CTALink`, `Badge`, `Card`, `Container`, `SectionWrapper`, `IndustryBadge`, `FilterCheckbox`, `FilterAccordion`, `FilterSearchInput`, `SidebarPanel`, `ResourceCard`, `ViewToggle`, `LoadMoreSentinel`, `BackToTop`, `EmptyState`, `CardReveal`, `RevealImage`, `iconColors`, `MobileFilterBar`.

## Mock data
- **Location:** `src/lib/mock-data.ts`
- **Seed:** 24 `BenchmarkReport` entries
- **Catalogs:**
  - `INDUSTRIES` — 14 Ken industries (sourced verbatim from `report-store-v07/data.ts`)
  - `REGIONS` — 6 Ken region groupings (GCC & Middle East · India & South Asia · Southeast Asia · Europe · Americas · Africa)
  - `COUNTRIES_BY_REGION` + `COUNTRIES` — 23 countries flat list
  - `TAGS` — 10 Ken trending topics
  - `COMPETITOR_SET_SIZES` — 3-5 / 5-10 / 10+
  - `METHODOLOGY_LABELS` — 4 keys (mystery-shopping / expert-interview / public-data / hybrid)
  - `SORT_OPTIONS` — 5 (latest / oldest / industry-az / most-pages / trending)
- **Markers:** every catalog + report set has `// TODO: replace w/ real API` comment
- **Replace strategy:** swap `BENCHMARK_REPORTS` constant w/ `useQuery(['benchmarks', filters], () => fetch('/api/benchmarks?...'))`. `computeFacetCounts()` should move server-side (currently O(reports × filters) client-side).
- **`deriveCountry()` + `deriveTags()`:** mock-only heuristic extractors over title strings. Real API should provide `country` + `tags` fields directly on `BenchmarkReport`.

## Filter URL contract
| Param | Multi? | Example | Maps to |
|---|---|---|---|
| `industry` | yes | `?industry=Healthcare&industry=FMCG` | `BenchmarkReport.industry` |
| `tag` | yes | `?tag=Electric+Vehicles` | `deriveTags(r)` (real API: `tags[]`) |
| `region` | yes | `?region=India+%26+South+Asia` | `BenchmarkReport.region` |
| `country` | yes | `?country=India` | `deriveCountry(r)` (real API: `country`) |
| `size` | yes | `?size=10%2B` | `competitorSetSize` |
| `method` | yes | `?method=mystery-shopping` | `methodology[]` |
| `year` | yes | `?year=2025` | `publishedDate.slice(0,4)` |
| `sort` | no | `?sort=latest` (default omitted) | sort comparator |
| `q` | no | `?q=skincare` | full-text on title + industry + region + description |

URL push is debounced 300ms via `replaceState` (no history entries per filter change).

## Env vars
None currently consumed. Frontend is mock-only.

When wiring real API, add `.env.example`:
| Var | Purpose | Required? | Example |
|---|---|---|---|
| `VITE_API_URL` | Backend base | yes | `http://localhost:8000` |

## Known issues / won't-fix in design
- **No `tsconfig.json` + lint script:** project ships TS via Vite transform only. Tech to add strict TS config + ESLint + prettier on intake.
- **No test setup:** Playwright + axe + visual regression suites pending tech intake.
- **Deps inherited from RS-v07 template:** `react-three/drei`, `@react-three/fiber`, `three`, `three-globe`, `cobe`, `recharts`, `embla-carousel-react`, `react-slick`, `react-dnd`, `@mui/material` — none used by this listing. Tree-shake to zero in prod build (verified). Tech may prune in cleanup pass.
- **`react@18.3.1` peerDeps quirk:** package.json lists React under `peerDependencies` (Figma-Make import legacy). Vite resolves it correctly, but tech should move to `dependencies` for clarity.
- **`SubtleVariantSwitcher` shows in DEV only:** `import.meta.env.DEV` gate. Verify prod build hides via `pnpm build && pnpm preview`.
- **DS-shared atoms hex anti-pattern:** Button / CTALink / Card / iconColors carry hardcoded hex (inherited). Workspace `docs/LEARNINGS.md` tracks this as systemic DS gap.

## A11y baseline
- WCAG: AA target (manual QA verified)
- Reduced-motion: GSAP `matchMedia('(prefers-reduced-motion: reduce)')` + CSS `@media (prefers-reduced-motion: reduce)` on hover transitions + carousel pauses
- Keyboard nav: filter accordion/checkbox + ViewToggle + sort dropdown + chips remove + cards (links)
- ARIA: `role="status"` on toolbar count, `role="tablist"+tab"` on hero carousel dots, `role="dialog" aria-modal` on mobile sheet, `aria-label` on icon-only buttons
- Touch targets: 44×44px on mobile filter trigger, mobile sheet close, BackToTop. ViewToggle is 36×36 — defer 44px bump to tech intake.
- Focus rings: theme.css `:focus-visible` outline brand-red (verified)

## Perf baseline
- Build: `pnpm build` 1.31s
- Bundle: 457KB JS (130KB gzip), 134KB CSS (22KB gzip)
- Lighthouse: not run in CI (manual smoke-test passes for desktop). Tech to wire CI Lighthouse.

## Visual baseline
- Screenshots: not committed. Use `pnpm dev` + manual screenshot at 390 / 768 / 1440. Or wire `gstack` per workspace pattern.

## Brand tokens
See `src/styles/theme.css` for full palette. Editorial-light variant. Ken-red `#b01f24` is brand accent — CTAs ONLY. Warm palette (warm-100 → warm-900) for surfaces, neutral palette (`black-50` → `black-900`) for text scale.

## Versioning
- v01 (sibling folder) = design-exploration playground; further iterations happen there
- v02 (this folder) = handover snapshot — tech-team owns post-intake; do NOT edit after handover
- Future iterations: copy v02 → v03 (or work from v01 → v03), never modify v02
