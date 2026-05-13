# DS Port Workflow — OG → core-v2

**Source of truth (NEVER modify):** `Design_system_vs_26 (og and final)/src/app/components/`
**Target (modify only · workspace package):** `design-system/core-v2/src/`
**Date drafted:** 2026-05-12 after CSS audit revealed core-v2 = stripped subset of OG

---

## Lessons learned (mistakes to AVOID this time)

### What went wrong in prior workflow

1. **Mass-stripped DS without inventory** — core-v2 ported only ~30 components from OG's ~157. Decision unclear. No log of "kept X · skipped Y · why."
2. **Builder spawned w/o full DS inventory access** — aura-builder saw only core-v2 atoms · had no knowledge OG had Container · FadeInSection · Tooltip · IconBadge · ViewToggle · ScrollFade · HorizontalScroll · CardReveal · 30+ more.
3. **Sections built inline chrome** because DS atoms missing — `<div className="rounded-lg border shadow-sm p-6">` instead of `<Card variant padding>`.
4. **Hard-ban greps insufficient** — only catch `<button>` raw · NOT "you should have used Card atom." Pre-validation missing.

### What to do RIGHT this time

1. **Inventory FIRST** — diff OG vs core-v2 · log gap explicitly
2. **NEVER delete OG** — read-only reference forever
3. **Port atom-by-atom · token-translate · NOT copy-paste**:
   - Replace `var(--color-primary)` (OG token) → `var(--color-foundation-*)` (core-v2 token) IF different
   - Replace OG path aliases → core-v2 paths
   - Replace OG-specific imports (e.g., `from '@/lib/utils'`) → core-v2 equivalents
4. **Update barrel exports** (`atoms/index.ts` etc.) after each port batch
5. **Pre-build gate in aura-builder**: MUST `cat design-system/core-v2/src/atoms/index.ts` before composing · know what atoms exist
6. **Post-build gate**: utilization rate ≥80% (sections using DS atoms vs inline chrome)

---

## Port priority (by frequency-of-use in canonical recipes)

### Tier 1 · HIGHEST priority (used by ≥3 consumer projects)

| OG file | Target | Why |
|---|---|---|
| `Container.tsx` | `core-v2/src/atoms/Container.tsx` | Every section needs width constraint · 100% recipes |
| `FadeInSection.tsx` | `core-v2/src/atoms/FadeInSection.tsx` | Every scroll-driven section · IntersectionObserver wrapper |
| `Tooltip.tsx` | `core-v2/src/atoms/Tooltip.tsx` | Portal-based · used by ViewToggle · ChartCard · IconBadge |
| `IconBadge.tsx` | `core-v2/src/atoms/IconBadge.tsx` | Icon+bg container · used in feature grids · stat cards |
| `Label.tsx` | `core-v2/src/atoms/Label.tsx` | Form labels · accessibility critical |

### Tier 2 · HIGH priority (used by ≥2 consumer projects)

| OG file | Target | Why |
|---|---|---|
| `CollapsibleSection.tsx` | `core-v2/src/atoms/CollapsibleSection.tsx` | Generic accordion · used by FAQ · TOC |
| `ViewToggle.tsx` | `core-v2/src/atoms/ViewToggle.tsx` | Grid/list switch · used in listings |
| `NextSectionCTA.tsx` | `core-v2/src/atoms/NextSectionCTA.tsx` | Section-end CTA · used in long pages |
| `ReadingProgressBar.tsx` | `core-v2/src/atoms/ReadingProgressBar.tsx` | Already exists in v2 sections inline · should be DS atom |
| `StickyCTA.tsx` | `core-v2/src/atoms/StickyCTA.tsx` | Same · should be DS atom |
| `SubtleVariantSwitcher.tsx` | `core-v2/src/atoms/SubtleVariantSwitcher.tsx` | Cinematic vs editorial toggle |

### Tier 3 · Molecules (composed of atoms)

| OG file | Target |
|---|---|
| `CardReveal.tsx` | `core-v2/src/molecules/CardReveal.tsx` |
| `HorizontalScroll.tsx` | `core-v2/src/molecules/HorizontalScroll.tsx` |
| `ScrollFade.tsx` | `core-v2/src/molecules/ScrollFade.tsx` |
| `ReportCard.tsx` | `core-v2/src/molecules/ReportCard.tsx` |
| `ReportGridCard.tsx` | `core-v2/src/molecules/ReportGridCard.tsx` |
| `ResourceCard.tsx` | `core-v2/src/molecules/ResourceCard.tsx` |
| `DataHighlightCard.tsx` | `core-v2/src/molecules/DataHighlightCard.tsx` |
| `EmptyState.tsx` | `core-v2/src/molecules/EmptyState.tsx` |
| `SkeletonCard.tsx` | `core-v2/src/molecules/SkeletonCard.tsx` |
| `AnalystPickCardB.tsx` | `core-v2/src/molecules/AnalystPickCardB.tsx` |
| `BackToTop.tsx` | `core-v2/src/molecules/BackToTop.tsx` |
| `CategoryListCard.tsx` | `core-v2/src/molecules/CategoryListCard.tsx` |
| Filter molecules (5) | `core-v2/src/molecules/filters/*` |

### Tier 4 · shadcn/ui primitives (port `ui/` folder · 47 files)

Wholesale port (keep file structure) into `core-v2/src/ui/`. Re-export via `@kenresearch/design-system/ui` subpath.

Files: accordion · alert-dialog · alert · aspect-ratio · avatar · badge · breadcrumb · button · calendar · card · carousel · chart · checkbox · collapsible · command · context-menu · dialog · drawer · dropdown-menu · form · hover-card · input-otp · input · label · menubar · navigation-menu · pagination · popover · progress · radio-group · resizable · scroll-area · select · separator · sheet · sidebar · skeleton · slider · sonner · switch · table · tabs · textarea · toggle-group · toggle · tooltip · use-mobile · utils

### Tier 5 · OG organisms (Report Store / Case Study sections)

Already have similar in `core-v2/src/organisms/navbar/` · port remaining 30 organisms only if `projects/*` consumers explicitly need them. Defer unless triggered.

### Tier 6 · OG foundations + figma + links subdirs

`foundations/` = token visualization components (color swatches · type scale · spacing scale) → NOT needed in consumer DS package. Keep in OG only.
`figma/ImageWithFallback.tsx` → port to `core-v2/src/atoms/ImageWithFallback.tsx` (useful).
`links/README.md` → docs only.

---

## Port mechanics (per atom)

For each atom file:

1. **Read OG file** in full
2. **Check OG imports**:
   - `from "./Tooltip"` → check if Tooltip already in core-v2 atoms · adjust path
   - `from "@radix-ui/..."` → check core-v2 package.json has dep · add if missing
   - `from "@/lib/utils"` (cn helper) → core-v2 has `src/lib/cn.ts` OR `src/lib/index.ts` · adjust
3. **Check OG tokens used**:
   - `var(--container-content)` → check editorial-light.css/cinematic-dark.css exposes it · add if missing
   - `var(--color-primary)` → may need to map to `var(--color-foundation-black)` or `var(--surface-text)`
   - `var(--font-serif)` → likely needs map to `var(--typography-family-display)`
4. **Write to core-v2** w/ adjusted imports/tokens
5. **Add export** to `core-v2/src/atoms/index.ts` (or molecules/organisms barrel)
6. **Smoke-test** by importing in a consumer (e.g., reports-pdp-v2 section)
7. **Log to CHANGELOG** (one line per port batch)

---

## Tokens compatibility check

OG tokens (from `theme.css`):
- `--font-sans` · `--font-serif` · `--font-mono`
- `--container-page/content/narrow/prose/compact`
- `--padding-mobile/tablet/desktop`
- `--section-py-mobile/tablet/desktop/standard`
- `--section-header-mb` · `--pair-label-heading` · `--pair-heading-description`

core-v2 tokens (from `editorial-light.css` + DTCG `tokens.css`):
- `--typography-family-display/body/mono`
- `--surface-bg/text/text-muted/text-subtle`
- `--color-foundation-*` · `--color-brand-red` · `--color-accent-*`
- `--variant-editorial-*`

**Compatibility layer needed** — create `core-v2/src/styles/og-bridge.css`:
- Maps OG token names → core-v2 token names where they diverge
- Imported by `base.css` so OG-ported components Just Work without per-file token replacement

OR (cleaner) — port theme.css OG tokens (`--container-*`, `--padding-*`) directly into `core-v2/src/styles/editorial-light.css` as additions. NO bridge file.

**Decision: option 2 · add OG tokens to editorial-light.css.** Simpler · single source of truth.

---

## Verification per batch

After each port batch (3-5 atoms):

```bash
# 1. TypeScript compiles in core-v2
cd design-system/core-v2 && pnpm typecheck

# 2. Lint clean
pnpm lint

# 3. Barrel exports updated
grep -c "export " src/atoms/index.ts  # should grow

# 4. No new core-v2 → consumer breaks
cd /Users/vishalchauchan/Downloads/Anti-folder01/projects/reports-pdp-v2
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/reports/australia-cold-chain-market-2022-2027  # 200
```

If any step fails · roll back batch · diagnose · don't proceed.

---

## Anti-patterns

- **NEVER modify `Design_system_vs_26 (og and final)/`** — read-only forever
- **NEVER copy-paste OG file verbatim** — must token-translate + adjust imports
- **NEVER skip barrel export update** — consumers won't find new atoms
- **NEVER port more than 5 atoms per batch** — verify each batch before continuing
- **NEVER add a new atom without DocBlock JSDoc 4WH header** (OG pattern · maintain consistency)
- **NEVER port OG file w/o checking core-v2 already has equivalent named differently** (avoid duplicates)

---

## Data-coupled organism ports — adapter pattern (Phase 3 · 2026-05-13)

When OG organism imports consumer-level data (`@/app/components/data`) or consumer state hooks (`useReportFilters`), DO NOT port the data — port the SHAPE.

**Steps:**
1. Extract types from OG `data.ts` (and any consumer-state hooks) → `core-v2/src/types/index.ts`. This becomes the DS public type registry.
2. Generalize data-coupled type refs (e.g. `typeof FULL_INDUSTRIES` → `IndustryData[]`) so consumer hook implementation stays opaque to DS.
3. Replace `import { ANALYST_PICKS } from '@/app/components/data'` w/ `picks: AnalystPick[]` prop · take data via props.
4. Add sensible default copy via destructure defaults (`label = 'Expert Insights'`) so thin-wrapper organisms remain composable.
5. Lift static lookup tables (industryIconMap) to atoms — they're utility · NOT data.
6. Export prop interfaces from barrel (`export { AnalystPicks, type AnalystPicksProps } from './AnalystPicks'`).

**Example:**

```tsx
// WRONG — consumer-coupled (OG style):
import { ANALYST_PICKS } from '@/app/components/data';
export function AnalystPicks() { return <>{ANALYST_PICKS.map(...)}</> }

// RIGHT — adapter (DS Phase 3 style):
import type { AnalystPick } from '../types';
export interface AnalystPicksProps {
  picks: AnalystPick[];
  label?: string;
  title?: string;
}
export function AnalystPicks({ picks, label = 'Expert Insights', title = 'Analyst Picks' }: AnalystPicksProps) {
  return <>{picks.map(...)}</>
}
```

**Consumer call site (unchanged conceptually):**

```tsx
// Before (importing local copy):
import { AnalystPicks } from '@/app/components/AnalystPicks';
<AnalystPicks />

// After (importing DS · passing data):
import { AnalystPicks } from '@kenresearch/design-system/organisms';
import { ANALYST_PICKS } from '@/app/components/data';
<AnalystPicks picks={ANALYST_PICKS} />
```

## Hook lift workflow (Phase 1 · 2026-05-13)

When deferred component requires a hook that's not in core-v2:
1. Read OG hook (typically `Design_system_vs_26/src/app/hooks/use*.ts`)
2. Port verbatim to `core-v2/src/hooks/use*.ts` · add `'use client'` directive · preserve JSDoc 4WH
3. Generic param the ref type if useful: `useScrollAnimation<T extends HTMLElement = HTMLDivElement>(...)`
4. Update `src/hooks/index.ts` barrel · export hook + types
5. Typecheck gate before consuming the hook in any organism

## Workflow lock

This file is the canonical DS port playbook. aura-craft + aura-builder both read this before any DS-touching task.

Cross-reference: `feedback_ds_port_workflow.md` memory · `docs/CHANGELOG.md` entries 2026-05-12 · 2026-05-13 batches 1-8 · 2026-05-13 Phase 1-3.
