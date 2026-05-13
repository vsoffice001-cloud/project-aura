# template-v3

> Vite + React case-study layout exploration — 5 variants (A–E), switchable at runtime. Reference/exploration only; not a primary deliverable.

## Stack

- Vite 6 + React 18
- Tailwind v4
- Radix UI + MUI icons + shadcn-style primitives
- `motion` v12 (Framer Motion tree-shaking export)

## Prerequisites

- Node >=20 (see `engines` in `package.json`)
- pnpm >=10 (see `packageManager` in `package.json`)

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

## Project layout

```
src/
  app/
    App.tsx           # entry — mounts active variant
    components/       # UI components + 5 template variants
    data/             # inline mock content
    hooks/            # custom hooks
  assets/             # static assets
  styles/             # global CSS
_dev-notes/           # stale backups + old handover docs (not shipped)
```

## Brand tokens

No Ken v26 tokens wired. Uses `default_shadcn_theme.css`. See workspace `Quick_start_guide.md` for production tokens.

## Handover

See `HANDOVER.md` for tech-team integration notes.
See `STATUS.md` for current handover state (`exploring`).

## License

Private — internal Ken Research design project.