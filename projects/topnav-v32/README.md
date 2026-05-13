# topnav-v32

> Ken Research top navigation system — component project (not a standalone app)

This is a **component** in a host page. The Vite app exists only as a browser showcase. Tech team integration: drop `TopNavigation` into the target Next.js host app and adapt routing. See `HANDOVER.md` for full integration guide.

## Stack
- Vite 6 + React 18 + TypeScript
- Tailwind v4 (`@tailwindcss/vite`)
- `motion` v12 (`motion/react`) for animations
- Radix UI + shadcn/ui primitives
- `react-router` v7 (showcase routing only)

## Prerequisites
- Node ≥20 (see `engines` in `package.json`)
- pnpm ≥10 (see `packageManager` in `package.json`)

## Quick start
```bash
pnpm install
pnpm dev
```

Opens http://localhost:5174 (5173 may be occupied by another project).

## Scripts
| Script | What |
|---|---|
| `pnpm dev` | dev server (Vite) |
| `pnpm build` | production build |

No `pnpm lint`, `pnpm test`, or `pnpm format` scripts are defined.

## Project layout
```
src/
  app/
    components/
      navbar/        # Nav package: atoms, molecules, organisms, hooks, types
      mobile/        # Mobile push menu
      layout/        # NavLayout (showcase shell)
      auth/          # Auth flow (showcase only)
      ui/            # Mega menu UI primitives
    context/         # AuthContext (in-memory prototype)
    pages/           # HomePage (showcase only)
    routes.tsx       # Showcase routing
  data/
    industries.tsx   # 14 industry categories with segments + icons
  design-system/
    components/      # Button, Avatar, Logo, MenuItem, TextLink, etc.
    tokens.ts        # JS mirror of theme.css
  imports/           # Figma Make generated files (LogoContainer + SVGs)
  lib/
    mock-data.ts     # Nav structural data + TODO: replace markers
  styles/
    theme.css        # Design tokens (colors, spacing, typography, shadows)
    fonts.css        # DM Sans font imports
    tailwind.css     # Tailwind directives
    index.css        # Entry import
  utils/
    device-detection.ts  # Touch vs mouse detection
_dev-notes/          # Archived dead code (Figma exports, unused dropdowns)
```

## Brand tokens
Editorial light variant. Source: `src/styles/theme.css`.
See workspace `Quick_start_guide.md` for full token reference.

## Handover
See `HANDOVER.md` for tech-team integration notes, props API, and component inventory.
See `STATUS.md` for current handover gate status.

## License
Private — internal Ken Research design project.
