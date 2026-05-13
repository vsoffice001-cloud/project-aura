# report-store

Ken Research report store — Next.js 15 port of `report-store-legacy/` (Vite/Figma Make export).

## Setup

```bash
pnpm install
pnpm dev   # Next 15 dev server (Turbopack)
pnpm build # production build
pnpm typecheck
pnpm lint
```

## Stack

- Next.js 15 + React 19 + Tailwind v4 + shadcn/ui
- DS via `@kenresearch/design-system` workspace pkg (atoms/molecules/organisms/patterns/hooks/charts)
- GSAP + Framer Motion + Lenis
- Highcharts standard (custom-skinned via DS theme)
- three + three-globe (3D globe wrapped in `dynamic({ssr:false})`)
- pnpm@10.33.0 + Node ≥20 + alias `@/* → src/*`

## DS imports

```ts
import { Button, Card, ReportCard } from '@kenresearch/design-system/atoms';
import { TopNavigation } from '@kenresearch/design-system/organisms';
import '@kenresearch/design-system/styles/base.css';
```

## Variant

Default editorial-light. cinematic-dark via cookie + RSC read in layout.tsx.

## Lineage

- Legacy: `projects/report-store-legacy/` (read-only)
- Audit: `docs/aura-sprint-2026-05-07-port/A2-report-store-audit.md`
- Sprint: `docs/aura-sprint-2026-05-07-port/RESUME-NOTE.md`
