# competition-benchmarking-listing-v02

> Ken Research Competition Benchmarking listing page — editorial-light variant. Browse, filter, and discover competitive benchmarking reports across 14 Ken industries, 6 regions, 23 countries, and 10 trending tags.

Handover-ready snapshot of `competition-benchmarking-listing-v01/`. Status: `ready-for-tech`.

## Stack
- Vite 6.3.5 + React 18.3.1 + TypeScript (Vite transform, no `tsconfig.json` yet)
- Tailwind v4.1.12
- DS atoms: copies of Ken DS components (Button, Card, Badge, FilterCheckbox, FilterAccordion, FilterSearchInput, SidebarPanel, ResourceCard, etc) sourced from `report-store-v07/`
- Animation: GSAP 3.15 + Motion 12.23 (Framer Motion successor) — used per concern, never both on same property
- Layout: react-responsive-masonry 2.7

## Prerequisites
- Node ≥20 (see `.nvmrc` → 20.20.1)
- pnpm ≥10 (see `packageManager` in `package.json` → 10.33.0)

## Quick start
```bash
pnpm install
pnpm dev
```

Open the URL Vite prints (typically http://localhost:5173, falls forward when occupied).

## Scripts
| Script | What |
|---|---|
| `pnpm dev` | Vite dev server |
| `pnpm build` | production build → `dist/` |
| `pnpm preview` | preview the production build locally |

Lint + typecheck + test scripts pending tech-team setup (see `STATUS.md` open issues).

## Project layout
```
src/
  main.tsx               # entry
  app/
    App.tsx              # page composition (sections 1–8)
    components/          # all UI components (60+ files)
      Benchmark*.tsx     # page-specific organisms (Hero, Sidebar, Cards, Toolbar, etc.)
      molecules/         # shared molecules (CardReveal, FilterAccordion, SidebarPanel, etc.)
      hooks/             # useBenchmarkFilters, useProgressiveLoad, useCrossfade
    hooks/               # generic shared hooks (responsive gutter)
  lib/
    mock-data.ts         # 24 seed reports + filter catalogs + facet computation
  styles/                # global CSS, tokens (theme.css)
  imports/, assets/      # static
```

## Brand tokens
- Editorial-light variant: warm-300 bg, ink-on-light text scale, Ken-red CTA only
- Tokens defined in `src/styles/theme.css` and consumed via `var(--*)`
- Workspace reference: `Quick_start_guide.md` (root) + `Anti-folder01/design-system/`

## Filter URL contract
```
?industry=Healthcare&industry=FMCG
&tag=Electric+Vehicles
&region=India+%26+South+Asia
&country=India
&size=10%2B
&method=mystery-shopping
&year=2025
&sort=latest
&q=skincare
```
Debounced 300ms via `useBenchmarkFilters`. Backend should accept these params verbatim when wiring real API.

## Handover
- See [`HANDOVER.md`](HANDOVER.md) for full tech intake notes (route map, components, mock data pointers, env vars, known issues).
- See [`STATUS.md`](STATUS.md) for current handover state + pre-handover gate progress.

## License
Private — internal Ken Research design project.
