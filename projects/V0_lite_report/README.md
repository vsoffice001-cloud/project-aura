# V0 Lite Report — Next.js 15 Port

Next.js 15 App Router port of the V0 Lite Report (previously `V0_lite_report-legacy/`, Vite SPA). Editorial-light variant default. Cinematic-dark via `ds-variant` cookie.

## Setup

```bash
# From workspace root
pnpm install

# Run dev server
cd projects/V0_lite_report
pnpm dev   # http://localhost:3000
```

## Port plan

Full audit + recommended component order in:
`docs/aura-sprint-2026-05-07-port/A1-V0_lite_report-audit.md`

## Design system

Atoms, molecules, patterns, and styles from:
```ts
import { Button } from '@kenresearch/design-system/atoms';
import '@kenresearch/design-system/styles/editorial-light.css';
```

Source: `design-system/core-v2/`
Docs: `design-system/core-v2/docs/COMPONENT_REFERENCE.md`

## Variant switching

Default = `editorial-light`. Set cookie `ds-variant=cinematic-dark` to opt in. Layout reads cookie server-side and sets `data-variant` on `<html>`.

## Scripts

| Command | What |
|---|---|
| `pnpm dev` | Next.js dev with Turbopack |
| `pnpm build` | Production build |
| `pnpm typecheck` | TS strict check |
| `pnpm lint` | ESLint |
| `pnpm lint:fix` | ESLint autofix |
| `pnpm format` | Prettier write |
| `pnpm test` | Playwright + axe |

## Mock data

Centralized: `src/lib/mock-data.ts`
All fields marked `// TODO: replace w/ real API (Django /api/reports/<slug>)`.

## Stack

- Next.js 15 App Router + React 19
- Tailwind v4 + postcss
- GSAP (`@gsap/react`) + Framer Motion + Lenis
- Highcharts (custom-skinned to DS tokens)
- lucide-react (icons only)
- @faker-js/faker + MSW (mock data)
- pnpm@10.33.0 + Node >=20
