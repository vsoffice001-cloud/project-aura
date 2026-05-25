# Source Provenance · v0.4 PDP Contract

**Status:** active · canonical pattern for ALL data blocks on `v1-product-page-ver0.4`
**Owner (design):** Aura · `design@kenresearch.com`
**Owner (when tech inherits):** assigned per HANDOVER_TRACKER
**Last updated:** 2026-05-21

---

## Why this exists

Every chart, stat, annotation, and forecast on a Ken Research PDP makes a factual claim. Repeating "Ken Research Analysis" as the source on every block is wallpaper — readers stop reading it, search engines stop crediting it, and stakeholders cannot tell which numbers are Ken's unique IP vs which are public secondary references blended into the analysis.

This contract gives every numeric block a **typed, tier-classified citation chain** instead of a free-text source line. Same pattern across every section, same TS shape, same render component.

## The 3-tier model

| Tier | When to use | Visual treatment | Premium signal |
|---|---|---|---|
| **primary** | Numbers Ken's analyst team gathered directly — CATI interviews, expert calls, NDA-bound operator surveys, field work. | Brand-red dot. | **HIGH** — this is the unique-to-Ken IP. Sells the report. |
| **secondary** | Verifiable 3rd-party publication — ABS, World Bank, IBISWorld, ASX filings, trade-body directories, government compliance docs. | Steel-blue dot. | LOW — competitors can find these too. Citing them builds credibility, not differentiation. |
| **derived** | Output of Ken's forecast model or analyst classification — CAGRs, interpolated years, phase labels, scenario splits. | Amber dot. | MEDIUM — model methodology is Ken's IP, but stop short of being raw new data. |

Every chart should pull from **at least one primary citation + at least one secondary citation**. Pure-secondary charts read as "you could have looked this up yourself." Pure-primary charts lack triangulation. Blended is the trust signal.

## TypeScript contract

```ts
// src/lib/types/sources.ts
export type SourceTier = 'primary' | 'secondary' | 'derived';

export interface SourceCitation {
  id: string;
  tier: SourceTier;
  org: string;
  title?: string;
  year: number;
  period?: string;
  url?: string;
  internalNote?: string;
  derivedFrom?: string[];
}
```

## Lookup pattern · `SOURCES_REGISTRY`

All citations live in **one file**: `src/lib/sources.ts`. Sections reference by string id, never inline. Reasons:

1. CMS swap when backend is wired — replace the mock registry with API fetch, types stay stable.
2. Single edit point when source changes (e.g. ABS publishes 2024 edition).
3. Cross-section reuse — `abs-warehousing-2023` is cited by §03, §08, §09. Edit once, propagate everywhere.
4. Audit table — running `grep getSources src/` lists every section + every source claim it makes.

### Naming convention

```
<org-lowercase>-<short-title>-<year>
```

Examples:
- `abs-warehousing-2023`
- `lineage-investor-day-2024`
- `ken-primary-coldchain-2024`
- `ken-forecast-coldchain-2025`
- `ken-cagr-historical-2024`

## How to use in a section

```tsx
import { SourceCluster } from '@/components/atoms/SourceCluster';
import { getSources } from '@/lib/sources';

<SourceCluster
  citations={getSources([
    'ken-primary-coldchain-2024',
    'abs-warehousing-2023',
    'lineage-investor-day-2024',
    'ken-forecast-coldchain-2025',
  ])}
  methodologyHref="#methodology"
/>
```

The component renders:
- 3 tier-count pills at the top ("2 primary · 1 secondary · 1 derived")
- A bulleted list with one tier-colored dot per citation, formatted line, external link icon when URL present, and internal note in italic
- A "Full methodology · §19 →" link at the bottom

## Where to render

| Surface | Render SourceCluster? | Why |
|---|---|---|
| Below every `<ColumnChart>`, `<HistoricalProjectedAreaChart>`, `<MultiAxisLineChart>` | **YES** | Charts make the strongest numeric claims. |
| Below `MilestoneRow`, `StatCard`, `SegmentSplitBar` | **YES** | Standalone stat callouts need attribution. |
| Inside `DialogContent` footer (chart dataset modal) | **YES** | Drill-down view needs deeper citation set. |
| Below `AnnotationCards` | **NO** unless drivers cite specific sources | Drivers usually summarize narrative — sources belong on the parent chart. |
| Below `AnswerBlock` (FAQ Q&A) | **NO** | AEO answers should stay tight; source lives one click into the methodology section. |
| Country/region metadata (e.g. population, GDP) | **NO** | Wikipedia-tier facts; sourcing reads as filler. |
| Hero · `ReportHeroV04` | **NO** | Hero is positioning, not data attribution. |
| Footer · macro stats on Country Infrastructure | **YES, batched** | Show one cluster covering all macro stats above it, not one per stat. |

## Per-section source plan (Australia Cold Chain example)

| Section | Citations to use | Tier blend |
|---|---|---|
| §03 Country Infrastructure | ABS Cat. macro · World Bank · ACCC · Ken Primary | 1 primary + 3 secondary |
| §04 Market Overview | Ken Primary + ABS + RWTA directory | 1 primary + 2 secondary |
| §07 Ecosystem (per tier card) | Ken Primary consolidation + Lineage IR + Americold 10-K + NewCold disclosure | 1 primary + 3 secondary |
| **§08 Market Size & Growth** | **Ken Primary coldchain + ABS warehousing + Lineage IR + Americold 10-K + Ken Forecast Model + Ken Interpolation** | **1 primary + 3 secondary + 2 derived** |
| §09 Submarkets | Ken Primary segment + ABS freight + IBISWorld I5301 + Ken Forecast segment | 1 primary + 2 secondary + 1 derived |
| §11 Industry Analysis | MLA + Dairy Australia + Coles FY25 + Woolworths FY24 + Ken Primary | 1 primary + 4 secondary |
| §12 End-User Deep Dives | Ken Primary pharma + TGA cold-chain + Coles + Woolworths | 1 primary + 3 secondary |
| §14 Competitor Landscape | Ken Primary consolidation + Lineage IR + Americold 10-K + NewCold | 1 primary + 3 secondary |
| §15 Regulatory | TGA + AFCC + ACCC | 0 primary + 3 secondary (regulatory is inherently 2°) |
| §16 Future Outlook | Ken Forecast + Ken Primary + Linfox media + Coles + Woolworths | 1 primary + 3 secondary + 1 derived |
| §22 Methodology | Ken Primary methodology spec | 1 primary |

## Adding a new source

1. Open `src/lib/sources.ts`.
2. Pick the right tier per the table above. **When in doubt, push to secondary.** Primary should mean "Ken did the fieldwork" — nothing else.
3. Use the naming convention.
4. Provide `internalNote` — this is shown in italic under the citation and is the methodological context (e.g. "30+ CATI interviews · Tier-1 + Tier-2 operators · NDA").
5. For tier='derived', set `derivedFrom` to the array of base citation ids the model consumed. This is the audit trail.

## What NOT to do

- ❌ Inline `<p>Source: Ken Research</p>` strings anywhere in a section.
- ❌ Tier='primary' for anything that wasn't Ken's own field work. (Reading a public PDF and quoting it is secondary.)
- ❌ Skip the methodology link — `methodologyHref="#methodology"` is the trust escape hatch.
- ❌ Cite the same source 4× in one section. Use SourceCluster once below the dominant chart and reference downstream blocks without re-citing if they sit within a viewport.
- ❌ Hide citations behind tooltips. They render visible by default. The hover/title only adds tier description.

## Premium gating × sourcing

Public-tier blocks show the citation cluster as-is. Lead-gated and paid-tier blocks should additionally show:

> Full citations · sample sizes · raw transcripts available on report unlock.

This sentence is what converts the citation list into a sales hook. It tells the reader Ken has more proof than the cluster shows, and the cluster is the teaser.

## Open questions (for tech handover)

1. CMS schema for `SourceCitation` — directly mirror the TS interface, or denormalize per chart?
2. Internationalization — citations in EN now; will Spanish/Portuguese editions need parallel registries?
3. Linkrot policy — if `url` 404s, do we hide the link icon at render time or accept stale links?
4. Lead-gate meter — should clicking a citation link count toward the metered unlock budget? Recommend NO (citations are sales tools, not gated content).

## Related

- `src/lib/types/sources.ts` — TypeScript contract
- `src/lib/sources.ts` — citation registry (mock until backend wired)
- `src/components/atoms/SourceCluster.tsx` — render component
- Workspace docs · `design-system/core-v2/docs/AI-CONSUMPTION-PROTOCOL.md` — when to promote SourceCluster to DS proper (anti-bloat: at 2nd consumer)
