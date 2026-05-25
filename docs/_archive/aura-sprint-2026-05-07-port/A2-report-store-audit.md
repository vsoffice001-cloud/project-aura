# Phase A2 Audit — report-store-v07

**Date:** 2026-05-07
**Auditor:** Plan agent (Sonnet)
**Source:** `projects/report-store-v07/`
**Target stack:** Next.js 15 + React 19 + Tailwind v4 + shadcn/ui + DS workspace + GSAP/Framer/Lenis + faker + MSW
**User-rated quality:** Second-best ref (good DS usage, visuals = source of truth)

---

## Verdict
Strong atomic-design discipline + 4WH JSDoc culture. Larger surface than V0_lite (110+ components, 14-facet filter hook, 3D globe). Two genuine complexity bumps: 3D globe SSR + App.tsx state-to-routing migration. Most of 110 files = mechanical port.

## Quick stats
- 110 component .tsx/.ts files (44 organisms + 19 molecules + 47 ui shadcn primitives)
- 5 hooks (`useReportFilters` 465 LOC = state hub)
- `theme.css` 764 LOC — Ken Bold DS v3.2 token set
- `data.ts` 413 LOC, 10 named exports
- 3D globe via three + three-globe + GeoJSON 417KB
- pnpm-lock present, engines set, .nvmrc present (already pnpm-discipline)

## Dependency triage

### KEEP
- `@radix-ui/*` full set (shadcn primitives)
- `class-variance-authority`, `clsx`, `tailwind-merge`
- `lucide-react`, `tailwindcss@4.1.12`, `tw-animate-css`
- `cmdk`, `vaul`, `input-otp`, `embla-carousel-react`, `react-hook-form`, `react-day-picker`, `recharts`, `sonner`, `react-resizable-panels`, `next-themes`, `date-fns`
- `three@0.183.2`, `three-globe@2.45.0` (used by `ui/globe.tsx`)

### DROP (declared, ZERO src imports)
- `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`
- `@popperjs/core`, `react-popper`
- `react-router@7.13.0` (HANDOVER claims usage, src has none)
- `react-dnd`, `react-dnd-html5-backend`, `react-slick`, `react-responsive-masonry`
- `motion@12.23.24` (HANDOVER claims usage, zero src imports)
- `@react-three/fiber@10.0.0-alpha.2`, `@react-three/drei@^9.122.0`, `cobe@^0.6.5` (3D unused — only direct three.js used)

### REPLACE
- vite + plugin-react + @tailwindcss/vite → next@15 + @tailwindcss/postcss
- `figmaAssetResolver` Vite plugin → standard imports + `public/`
- `main.tsx` + `index.html` → `app/layout.tsx` + `app/page.tsx`
- React 18 peerDeps optional:true → React 19 dependencies
- pkg name `@figma/my-make-file` → `@kenresearch/report-store`

### ADD
- `next@15`, `react@19`, `@tailwindcss/postcss@4.1`
- `gsap`, `framer-motion`, `lenis`
- `@faker-js/faker`, `msw`
- `@kenresearch/design-system` workspace dep
- `eslint-config-next`, `prettier`, `@playwright/test`

## Page/route map (router-less SPA → App Router)

Despite `react-router@7` in deps: **zero usage**. App.tsx single-page SPA toggling layout via `viewMode` state inside `useReportFilters`.

```
Target:
src/app/
  layout.tsx                 # Header + Footer + Toaster + globals + fonts
  page.tsx                   # home view ('use client' for filters)
  reports/
    page.tsx                 # ?industry=&q=&region=&sort= — listing
    [id]/page.tsx            # report detail (placeholder; current alert())
  loading.tsx, not-found.tsx
```

State→URL migration: `useReportFilters` to `useSearchParams + useRouter`. `alert()` → `router.push()`.

## Dead code (delete on port)
1. **`src/app/components/Globe.tsx` (421 LOC)** — never imported. `ui/globe.tsx` 3D globe is the used one.
2. **`FiltersPanel.tsx`, `TopDownloads.tsx`, `NewsletterSignup.tsx`, `ReportStorePage.tsx`** — barrel-exported, unwired in App.tsx
3. `src/docs/` empty
4. `_dev-notes/` (4 audit MDs + 2 draft TSX + 2 HTML drafts + 1 CSV) — KEEP outside `src/`, optionally archive to `docs/legacy-audit/` or drop
5. `index.html`, `vite.config.ts`, `postcss.config.mjs` (Vite-only)
6. `pnpm-lock.yaml`, `node_modules/`, `.DS_Store`

## Code-level junk
- `App.tsx:61` — `alert(\`Navigate to /reports/${id}\`)` → `router.push()`
- `App.tsx:319-326` — inline Toaster style → DS `<KenToaster/>` wrapper
- `Testimonials.tsx:17-26` — 10 `from 'figma:asset/<hash>.png'` imports → `@/assets/...` or `public/logos/`
- `vite.config.ts:23-24` — Figma Make "do not remove" comment (delete entirely)
- `package.json` peerDeps `optional:true` for react/react-dom (move to dependencies)
- 40+ Unsplash URLs in `data.ts` — flag for tech CDN strategy

## Component complexity
- **Trivial (mechanical):** 47 ui/ shadcn primitives, hooks (3 of 5), small atoms/molecules, layout, fonts
- **Moderate:** atoms (Badge 703, Button 315, Card 149) — diff vs DS first; molecules (19); standalone organisms (Header, Footer, FeaturedResearch, AnalystPicks, Testimonials, etc.)
- **Complex:** App.tsx split + URL state, IndustrySidebar 675, ReportCard 583 (list+grid switch), MobileFilterSheet 410, ListingContextBanner 351, IndustryReportSection 303, ReportStoreHero 372 (3D lazy load), useReportFilters 465 (URL-state refactor), `ui/globe.tsx` 330 (SSR-unsafe)
- **Rewrite/skip:** Globe.tsx top-level (delete), FiltersPanel/TopDownloads/NewsletterSignup/ReportStorePage (delete or defer)

## Mock data
- Source: `src/app/components/data.ts` (413 LOC, 10 exports)
- Existing gateway: `src/lib/mock-data.ts` (only 2 of 10 routed) — gap to close
- Components bypass gateway, import from `./data` directly (e.g., `useReportFilters`, `ExploreByRegion`)
- Recommended target: full gateway w/ types, faker for filler arrays, MSW handlers for `/api/industries`, `/api/reports`, `/api/trending`, etc.

## DS LEARNINGS (candidates for canonical DS)
1. **`--rc-*` ResourceCard token family** (light + dark + badge overlay) — distinctive, rich
2. **`--bg-composition-warm-editorial`** gradient — editorial-light specific
3. **`--container-*`** width tokens (page/content/narrow/prose/compact)
4. **`--button-min-width-{sm,md,lg}`** — verify presence
5. **Atoms:** `FadeInSection`, `BackToTop`, `LoadMoreSentinel`, `RevealImage`, `IconBadge`, `IndustryBadge`, `ActiveFilterChip`
6. **Molecules:** `HorizontalScroll`, `EmptyState` (brand wrapper), `SkeletonCard` (ReportCard-shape)
7. **Hooks:** `useProgressiveLoad`, `useCrossfade`, `useMountTransition`
8. **Filter kit pattern:** `ListingToolbar` + `ListingContextBanner` + `CardListing` + `MobileFilterSheet` + `MobileFilterBar` + `useReportFilters` reference
9. **`iconColors.ts` + `industryIconMap.ts`** token-side data — promote pattern
10. **`Toaster` brand wrapper** — promote inline style block to DS

## Risks
- **3D globe SSR breakage** — three.js direct imports (window/document refs) must wrap in `dynamic({ssr:false})`
- **GeoJSON bundle bloat** — 417KB import → move to `public/geo/` + `fetch()` in useEffect
- **`@react-three/fiber@10-alpha + React 19** — alpha pinned, drop entirely (unused)
- **`useReportFilters` URL-state refactor** — 14 facets, derived `filteredReports`; subtle regression risk
- **Badge 703 + ReportCard 583** — large variant switches; budget 2-3h each for DS diff
- **`tw-animate-css`** — verify workspace canon; alt = tailwindcss-animate
- **Editorial-light variant default** — `theme.css` has dark-mode tokens (`--rc-dark-*`); ensure no accidental dark activation
- **40+ Unsplash URLs** — Lighthouse flags external; `next/image remotePatterns` interim

## Open decisions (defer to next phase)
1. `motion@12` vs framer-motion — workspace says framer; rename direction confirmed
2. `_dev-notes/` — archive to `docs/legacy-audit/` or drop?
3. Mobile 3D globe perf — keep dead `Globe.tsx` (canvas) as 2D fallback or pure delete?
4. shadcn `tw-animate-css` vs `tailwindcss-animate` — workspace standard?
5. `_dev-notes` HTML drafts (`industry-reports.html` 74KB, `trusted-leaders.html`) — reference value or drop?

## Recommended port order
1. Scaffold Next 15 + tsconfig + DS workspace dep
2. Tokens + globals.css from theme.css; next/font for DM Sans + Noto Serif
3. `src/lib/` utils + full mock-data gateway w/ types
4. shadcn ui/ 47 primitives w/ 'use client' marks
5. DS atom reconciliation (Badge/Button/Card/Container diff)
6. Atoms + small molecules (no data dep)
7. Hooks (`useReportFilters` URL-state refactor)
8. Standalone organisms (Header, Footer, FeaturedResearch, etc.)
9. Listing-mode organisms (ListingToolbar, ContextBanner, CardListing, ReportCard)
10. Sidebar + mobile filter kit (IndustrySidebar, MobileFilterSheet, MobileFilterBar)
11. 3D globe (move GeoJSON to public/, dynamic ssr:false)
12. Hero (ReportStoreHero, dynamic globe import)
13. ExploreByRegion
14. App.tsx split → layout + page + reports route
15. MSW handlers
16. Asset migration (PNG → public/, Unsplash → remotePatterns or local)
17. Animations (gsap/framer/lenis migration of CSS animations + transitions)
18. Cleanup pass (delete Globe.tsx, decide unwired components, alert→router, add Suspense, loading/not-found)
19. Lint/type/build/a11y/Lighthouse gates
20. HANDOVER_TRACKER + rename original to legacy

## Critical files
- `src/app/App.tsx`
- `src/app/components/hooks/useReportFilters.ts`
- `src/app/components/data.ts`
- `src/app/components/ui/globe.tsx`
- `src/styles/theme.css`
- `HANDOVER.md` (carry to legacy archive)
