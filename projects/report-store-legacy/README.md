# report-store-v07

> Ken Research Report Store UI — editorial light variant. Browse, filter, and discover market research reports across 14 industries.

## Stack

- Vite 6.3.5 + React 19
- Tailwind v4 (`@tailwindcss/vite`)
- `motion` v12 (motion.dev)
- Radix UI + shadcn/ui components
- `@react-three/fiber` + `cobe` + `three-globe` (Globe region explorer)

## Prerequisites

- Node ≥20 (see `engines` in `package.json`)
- pnpm ≥10 (see `packageManager` in `package.json`)

## Quick start

```bash
pnpm install
pnpm dev
```

Open http://localhost:5173.

## Scripts

| Script | What |
|---|---|
| `pnpm dev` | dev server |
| `pnpm build` | production build |

No `lint`, `test`, or `format` scripts are defined in this project.

## Project layout

```
src/
  app/
    App.tsx              # root component — full report store SPA
    components/          # atoms, molecules, organisms, hooks, ui
      data.ts            # fixture/mock data (industries + reports)
      hooks/             # useReportFilters, useProgressiveLoad, useCrossfade, useMountTransition
      molecules/         # molecule-level components
      ui/                # shadcn/ui primitives
      figma/             # ImageWithFallback helper
  lib/
    mock-data.ts         # mock data gateway (TODO markers for API replacement)
    utils.ts             # cn() utility
  styles/
    index.css            # entry CSS (imports theme + fonts + tailwind)
    theme.css            # Ken Bold DS v3.2 tokens (editorial light variant)
    fonts.css            # DM Sans + Noto Serif
    tailwind.css         # Tailwind v4 base
  assets/                # trust logo PNGs (Figma Make assets)
  imports/               # geo JSON for Globe (afghanistan-angola-geo-2.json)
_dev-notes/              # internal audit docs, orphaned drafts — not for tech team
```

## Brand tokens

Source: `src/styles/theme.css` — Ken Bold DS v3.2, editorial light variant.
Quick ref: workspace `Quick_start_guide.md`.

## Handover

See `HANDOVER.md` for tech-team integration notes.
See `STATUS.md` for current handover state.

## License

Private — internal Ken Research design project.
