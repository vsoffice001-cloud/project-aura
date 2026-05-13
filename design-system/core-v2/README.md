# @kenresearch/design-system v2

Ken Research Design System — typed atoms, recipe-driven, token-only. Editorial-light default + cinematic-dark variant.

**Status:** v0.1.0 — populated. Full OG `Design_system_vs_26` coverage complete (Phase 1-3 ports · 2026-05-13). ~168 components across atoms · molecules · organisms · hooks · shadcn ui · types.

**Layer counts:**
- 23 hooks (motion · scroll · filters · counters)
- 42 atoms (Button · Card · Container · FadeInSection · industryIconMap etc.)
- 26 molecules (ReportCard · DataHighlightCard · FilterAccordion etc.)
- 38 organisms (HeroSection · CaseStudyNavbar · FiltersPanel · IndustrySectorsGrid · adapter-pattern organisms · navbar variants)
- 46 shadcn UI primitives
- 13 public types (`ReportItem · IndustryData · ReportFilters · AnalystPick · ...`)

## Install (workspace consumer)

```jsonc
// projects/<name>/package.json
"dependencies": {
  "@kenresearch/design-system": "workspace:*",
  "@kenresearch/tokens": "workspace:*"
}
```

## Import

```ts
import { Button, Card, Badge, getIndustryIcon } from '@kenresearch/design-system/atoms';
import { ReportCard, StatCardGroup } from '@kenresearch/design-system/molecules';
import { AnalystPicks, FiltersPanel, CaseStudyNavbar } from '@kenresearch/design-system/organisms';
import { DarkGradientMesh, SectionBg } from '@kenresearch/design-system/patterns';
import { useScrollAnimation, useActiveSection } from '@kenresearch/design-system/hooks';
import type { ReportItem, IndustryData, ReportFilters } from '@kenresearch/design-system/types';
import '@kenresearch/design-system/styles/base.css';
import '@kenresearch/design-system/styles/utilities.css';
import '@kenresearch/design-system/styles/editorial-light.css';
```

## Adapter pattern (data-driven organisms)

Organisms that previously hardcoded mock data now take data via props:

```tsx
import { AnalystPicks, FiltersPanel } from '@kenresearch/design-system/organisms';
import { ANALYST_PICKS, FULL_REGIONS, PUBLISH_YEARS } from '@/app/components/data';
import { useReportFilters } from '@/app/hooks/useReportFilters';

// Consumer owns data + state hook · DS owns rendering + types
const filters = useReportFilters();
<AnalystPicks picks={ANALYST_PICKS} />
<FiltersPanel filters={filters} regions={FULL_REGIONS} publishYears={PUBLISH_YEARS} />
```

## Variant switching

Default = `editorial-light`. Opt-in to cinematic-dark via cookie + RSC read:

```tsx
// app/layout.tsx
import { cookies } from 'next/headers';
const variant = cookies().get('ds-variant')?.value ?? 'editorial-light';
return <html data-variant={variant}>...</html>;
```

## Develop

- `pnpm playground` — Vite SPA at port 5174 for live atom development
- `pnpm storybook` — Storybook 8 stories (added per atom in Phase C)
- `pnpm typecheck` — TS strict
- `pnpm lint` — ESLint + custom rules (no inline color/size, no `[#xxx]/[Npx]` arbitraries, atom-promotion JSDoc enforced)
- `pnpm lint:recipes` — section bg alternation enforcement per recipe L50

## Docs

- `docs/COMPONENT_REFERENCE.md` — atom/molecule/organism API surface
- `docs/MIGRATION_FROM_V1.md` — v1 → v2 atom mapping table
- `docs/ANTI_PATTERNS.md` — 14 categories incl. Gradients (Cat 14, NEW vs v1)
- `docs/PATTERNS.md` — section alternation per pillar, dark gradient mesh, fade mask, glass overlay, 92-5-3 hierarchy, fallbacks, a11y contrast
- `docs/RECIPES.md` — pointer to `/design-system/recipes/*.md`
- `CHANGES.md` — what's new + breaking vs v1

## Lineage

- v1 = `design-system/core-legacy-v1/` (frozen read-only after cutover, sprint 2026-05-07)
- v1 dashboard = `design-system/dashboard/` (will merge `DashboardLayout` + `ui/` shadcn into v2 atoms then delete)

## Tech

Vite for dev/playground only. Components ship framework-agnostic via TS subpath exports. Consumers: Next.js 15 App Router + React 19. Charts: Highcharts 11 custom-skinned to DS color tokens only.
