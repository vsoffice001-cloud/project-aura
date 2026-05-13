# Ken Research Catalogs

Canonical Ken-Research data catalogs (industries · regions · countries · trending tags · methodologies). One source of truth for consumer pages.

## Why this exists

Each consumer page (competition-benchmarking, surveys, sector-landing, etc) used to re-derive these catalogs in its own `mock-data.ts`. Drift = inevitable. This folder collapses them into a single canonical TS module.

## Files

| File | Contents |
|---|---|
| `ken-research.ts` | `INDUSTRIES`, `REGIONS`, `COUNTRIES_BY_REGION`, `COUNTRIES`, `TRENDING_TAGS`, `METHODOLOGY_LABELS`, `COMPETITOR_SET_SIZES` |

## Usage in a consumer page

If the consumer project shares the workspace alias path (`@/design-system/...`):

```ts
import { INDUSTRIES, REGIONS, COUNTRIES, TRENDING_TAGS } from '@/design-system/catalogs/ken-research';
```

If not (most current Vite project setups), **copy `ken-research.ts` into `<project>/src/lib/catalogs/ken-research.ts`** and re-import. Sync any updates from this canonical file via the CHANGELOG entry.

## Source of truth

Master copy lives here. Ultimate upstream is `projects/report-store-v07/src/app/components/data.ts` (`industries`, `regions`, `trendingTopics`). When RS-v07 catalogs update, propagate here + log to `docs/CHANGELOG.md`.

## Related docs

- `docs/LEARNINGS.md` 2026-05-06 entries (DS-sync hierarchy + DS gaps surfaced)
- `design-system/recipes/report-store-listing.md` — uses these catalogs in canonical sidebar
- `skills/aura-design/SKILL.md` "Source-mirror checklist"
