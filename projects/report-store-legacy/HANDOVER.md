# HANDOVER — report-store-v07

**For:** Tech team
**From:** Design team (Aura-assisted)
**Date:** 2026-04-30
**Version:** v0.7

## TL;DR

Report Store UI — single-page Vite + React 19 app covering the full Ken Research report browsing experience: hero search, sidebar filters, card listing, analyst picks, region globe, testimonials, and supporting sections. Tech team needs to wire real API endpoints (see Mock data section), rename the package, move peer deps, and run a11y + perf gates before shipping.

## Run locally

```bash
pnpm install
pnpm dev   # → http://localhost:5173
```

## Build

```bash
pnpm build
# No pnpm start in this project — serve dist/ with any static host
```

## Stack

- **Framework:** Vite 6.3.5 + React 19 (via workspace node_modules)
- **React:** 19 (workspace) — declared as optional peer dep, see Known Issues
- **Tailwind:** v4.1.12 (`@tailwindcss/vite` plugin)
- **Animation:** `motion` v12.23.24 (motion.dev v12 API — NOT `framer-motion`). No GSAP or Lenis in this project.
- **UI primitives:** Radix UI (full set) + shadcn/ui components in `src/app/components/ui/`
- **State / filtering:** Custom hooks — `useReportFilters`, `useProgressiveLoad`, `useCrossfade`, `useMountTransition`
- **3D:** `@react-three/fiber`, `@react-three/drei`, `cobe`, `three-globe` (Globe section)
- **Other:** `recharts`, `react-dnd`, `react-responsive-masonry`, `react-router` (installed but not used for routing — SPA), `react-slick`, `embla-carousel-react`, MUI (icons + material), `date-fns`, `sonner`

## Route map

This is a single-route SPA. No react-router routes in use.

| Route | View | Purpose | Mobile? |
|---|---|---|---|
| `/` | Report Store Home | Hero + sidebar + featured + industry sections | ✓ |
| `/` (listing mode) | Report Listing | Triggered by sidebar/search filter — same URL, `viewMode` state | ✓ |

## Components

Located: `src/app/components/`

**Atoms:**
| Component | File | Notes |
|---|---|---|
| Badge | `Badge.tsx` | Brand-token badge variants |
| Button | `Button.tsx` | Ken DS button (red primary CTA) |
| CTALink | `CTALink.tsx` | Inline CTA anchor |
| Container | `Container.tsx` | Responsive max-width wrapper |
| FilterCheckbox | `FilterCheckbox.tsx` | Accessible filter checkbox |
| FilterChip | `FilterChip.tsx` | Dismissible filter chip |
| FilterSearchInput | `FilterSearchInput.tsx` | Search within filter panels |
| ViewToggle | `ViewToggle.tsx` | Grid/List toggle |
| IconBadge | `IconBadge.tsx` | Icon + label badge |
| SectionHeading | `SectionHeading.tsx` | Uniform section heading |
| SectionWrapper | `SectionWrapper.tsx` | Full-width section bg wrapper |
| FadeInSection | `FadeInSection.tsx` | IntersectionObserver reveal wrapper |
| Card | `Card.tsx` | Base card surface |

**Molecules** (`src/app/components/molecules/`):
| Component | File | Notes |
|---|---|---|
| ReportGridCard | `ReportGridCard.tsx` | Grid-view report card |
| SkeletonCard | `SkeletonCard.tsx` | Loading skeleton |
| DataHighlightCard | `DataHighlightCard.tsx` | Stat highlight tile |
| StatCard | `StatCard.tsx` | Key stat display |
| FilterAccordion | `FilterAccordion.tsx` | Collapsible filter group |
| EmptyState | `EmptyState.tsx` | No-results state |
| LoadMoreSentinel | `LoadMoreSentinel.tsx` | IntersectionObserver load-more |
| BackToTop | `BackToTop.tsx` | Floating scroll-to-top |
| HorizontalScroll | `HorizontalScroll.tsx` | Touch scroll container |
| CategoryListCard | `CategoryListCard.tsx` | Category tile |
| CardReveal | `CardReveal.tsx` | CSS card entrance |
| ScrollFade | `ScrollFade.tsx` | Scroll-linked fade |
| SidebarPanel | `SidebarPanel.tsx` | Filter sidebar shell |
| IndustryBadge | `IndustryBadge.tsx` | Industry color badge |
| ActiveFilterChip | `ActiveFilterChip.tsx` | Active filter dismissible chip |
| RevealImage | `RevealImage.tsx` | Blur-to-sharp image reveal |
| AnalystPickCardB | `AnalystPickCardB.tsx` | Analyst pick card variant B |

**Organisms:**
| Component | File | Notes |
|---|---|---|
| ReportCard | `ReportCard.tsx` | Main report card (list + grid variants) |
| ReportStoreHero | `ReportStoreHero.tsx` | Full-width hero with search |
| FeaturedResearch | `FeaturedResearch.tsx` | Featured report carousel |
| IndustrySectorsGrid | `IndustrySectorsGrid.tsx` | Industry grid tiles |
| IndustryReportSection | `IndustryReportSection.tsx` | Tabbed industry reports |
| IndustrySidebar | `IndustrySidebar.tsx` | Left filter sidebar |
| FiltersPanel | `FiltersPanel.tsx` | Sidebar filter logic panel |
| ListingContextBanner | `ListingContextBanner.tsx` | Active filter context bar |
| ListingToolbar | `ListingToolbar.tsx` | Sort/view/back toolbar |
| CardListing | `CardListing.tsx` | Report card list/grid container |
| MobileFilterSheet | `MobileFilterSheet.tsx` | Bottom sheet filter panel (mobile) |
| MobileFilterBar | `MobileFilterBar.tsx` | Sticky filter trigger (mobile) |
| CustomResearchCTA | `CustomResearchCTA.tsx` | Full-width custom research CTA |
| RecommendedForYou | `RecommendedForYou.tsx` | Personalized report reel |
| AnalystPicks | `AnalystPicks.tsx` | Analyst-curated picks section |
| TrendingStatistics | `TrendingStatistics.tsx` | Market stats section |
| DailyDataHighlights | `DailyDataHighlights.tsx` | Daily data highlights |
| QuickAccess | `QuickAccess.tsx` | Quick-access report tiles |
| TopDownloads | `TopDownloads.tsx` | **Not wired in App.tsx** — available |
| TrendingTopics | `TrendingTopics.tsx` | Trending topic chips |
| ExploreByRegion | `ExploreByRegion.tsx` | Globe + region filter |
| Testimonials | `Testimonials.tsx` | Client testimonials with marquee logos |
| UpcomingReports | `UpcomingReports.tsx` | Upcoming report teasers |
| NewsletterSignup | `NewsletterSignup.tsx` | **Not wired in App.tsx** — available |
| Header | `Header.tsx` | Global sticky nav |
| Footer | `Footer.tsx` | Site footer |

**Template:**
| Component | File | Notes |
|---|---|---|
| ReportStorePage | `ReportStorePage.tsx` | **Not wired in App.tsx** — page template shell, available for future routing |

**Hooks** (`src/app/components/hooks/`):
| Hook | File | Purpose |
|---|---|---|
| useReportFilters | `useReportFilters.ts` | All filter state + derived filtered reports |
| useProgressiveLoad | `useProgressiveLoad.ts` | Infinite scroll / load-more logic |
| useCrossfade | `useCrossfade.ts` | Opacity crossfade on filter change |
| useMountTransition | `useMountTransition.ts` | CSS transition for banner mount/unmount |

## Mock data

- **Source:** `src/app/components/data.ts` — 14 industries + 45+ report fixtures (Unsplash images, realistic titles, projections, dates, pages/tables/figures counts)
- **Gateway:** `src/lib/mock-data.ts` — re-exports `industries` and `reports` with `// TODO: replace w/ real API` markers
- **Replace strategy:**
  - `industries` → `fetch('/api/industries')` returning `{ name, count, subcategories, tags, image }[]`
  - `reports` → `fetch('/api/reports?industry=X&region=Y&q=Z&sort=S')` returning paginated report objects
  - Entry point: `src/app/components/hooks/useReportFilters.ts` — swap the import from `../data` to your API client

## Env vars

No env vars required for design-phase. No `.env.example` needed.

For production integration:
| Var | Purpose | Required? | Example |
|---|---|---|---|
| `VITE_API_BASE_URL` | Backend API base URL | yes | `http://localhost:8000` |
| `VITE_CDN_URL` | Report image CDN | no | `https://cdn.kenresearch.com` |

## Known issues / won't-fix

- **Optional peer deps (react/react-dom 18.3.1):** `package.json` declares them under `peerDependencies` with `optional: true` instead of regular `dependencies`. Move to `dependencies` on tech intake.
- **Package name `@figma/my-make-file`:** Figma Make scaffold default. Rename to `@kenresearch/report-store` before publishing or CI integration.
- **`motion` v12 (not `framer-motion`):** Package is `motion@12.23.24`. No `framer-motion` imports. If monorepo already has `framer-motion`, check for version conflicts.
- **`react-router` installed but unused:** `react-router@7.13.0` in deps; no `<Route>` or `createBrowserRouter` in source. Safe to remove or wire up for true routing.
- **`TopDownloads`, `NewsletterSignup`, `ReportStorePage`:** Built and exported but not wired in `App.tsx`. Integrate as needed.
- **`figma:asset/` scheme in `vite.config.ts`:** Custom resolver maps `figma:asset/` imports to `src/assets/`. Used in `Testimonials.tsx` for trust logos. Resolver must stay in `vite.config.ts` or asset imports need refactoring.
- **Unsplash images (report covers + industry images):** Development URLs. Replace with Ken Research CDN assets in production.
- **`alert()` in `App.tsx`:** `handleViewReport` calls `alert()` as placeholder for report detail navigation. Replace with router push to `/reports/:id`.

## A11y baseline

- WCAG target: AA
- Tested via: not yet run
- Last scan: not run — pending
- Reduced-motion: CSS animations (`theme.css`) respect `prefers-reduced-motion: reduce`. JS-driven motion via `motion` v12 — component-level audit pending.
- Focus indicator: `theme.css` — `focus-visible` ring uses `--brand-red` for light surfaces, white for dark surfaces.

## Perf baseline

- Lighthouse: not yet run
- Bundle size: not measured — heavy deps (`@react-three/fiber`, `three`, MUI) may need code-splitting

## Visual baseline

- Screenshots: not yet captured — pending `gstack` run

## Brand tokens

- Source: `src/styles/theme.css` — full Ken Bold DS v3.2 token set
- Variant: **Editorial light** (`--background: #ffffff`, warm palette, `--brand-red: #b01f24`)
- Quick ref: workspace `Quick_start_guide.md`
- Note: This is the **light** variant. `ken-v1` (case study) uses the dark cinematic variant. They share the same token names but different default values.

## Animation rules

- `motion` v12 (motion.dev) for component motion — state transitions, reveals, gestures
- No GSAP or Lenis in this project (not wired)
- `prefers-reduced-motion`: CSS animations disabled via `theme.css`; JS motion components should check `useReducedMotion()` from `motion/react`

## Tech-team integration checklist

- [ ] Match Node version (`engines.node ≥20`)
- [ ] Match pnpm version (`packageManager: pnpm@10.33.0`)
- [ ] Move `react`/`react-dom` from `peerDependencies` to `dependencies`
- [ ] Rename package from `@figma/my-make-file` → `@kenresearch/report-store`
- [ ] Replace mock data imports (search `// TODO: replace w/` in `src/lib/mock-data.ts`)
- [ ] Replace `alert()` in `App.tsx` `handleViewReport` with real router navigation
- [ ] Wire `react-router` routes or remove unused dep
- [ ] Replace Unsplash image URLs with CDN assets
- [ ] Set `VITE_API_BASE_URL` env var for API calls
- [ ] Integrate `TopDownloads` / `NewsletterSignup` / `ReportStorePage` if needed
- [ ] Run a11y axe scan: target 0 critical violations
- [ ] Run Lighthouse mobile: target Perf ≥85, A11y ≥95, Best Practices ≥95
- [ ] Wire analytics (GTM, GA, Clarity, Leadfeeder, Contentsquare per prod)
- [ ] Audit `motion` v12 components for `useReducedMotion` compliance

## Contact

Design lead: design@kenresearch.com (Aura-assisted)
