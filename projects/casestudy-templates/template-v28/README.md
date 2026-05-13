# template-v28

> Vite + React 18 case study template (YASH transformer bushing / IPO readiness). Figma Make origin. Exploration reference — not a primary deliverable.

## Stack

- Vite 6.3.5 + React 18.3.1
- Tailwind v4 (CSS-first, via `@tailwindcss/vite`)
- `motion` v12.23.24 (Framer Motion rebranded package)
- Radix UI (full suite) + MUI v7
- pnpm 10

## Prerequisites

- Node >=20 (no `.nvmrc` — set manually)
- pnpm >=10 (see `packageManager` in `package.json`)

## Quick start

```bash
pnpm install
pnpm dev
```

Open http://localhost:5178.

## Scripts

| Script | What |
|---|---|
| `pnpm dev` | dev server |
| `pnpm build` | production build |

No lint or test scripts defined.

## Project layout

```
src/
  app/
    App.tsx         # entry, inline mock data
    components/     # 22 section + UI components
    hooks/          # 9 custom hooks
  imports/          # Figma Make SVG assets
  styles/           # global CSS, tokens, animations
```

## Brand tokens

Not aligned to Ken Research `globals.css @theme {}`. Uses own `src/styles/theme.css` tokens. See workspace `Quick_start_guide.md` for canonical Ken tokens.

## Handover

See `HANDOVER.md` for tech-team integration notes.
See `STATUS.md` for current handover state (`exploring`).

## Notes

- Package name `@figma/my-make-file` is a Figma Make artifact — rename before any real handover.
- `_dev-notes/` contains stale internal docs and `App.backup.tsx` from prior cleanup.
- `vite.config.ts` includes `figmaAssetResolver` plugin for Figma Make asset paths (`figma:asset/`).

## License

Private — internal Ken Research design project.
