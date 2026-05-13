# Migration from v1 → v2

Populated as atoms are promoted in Phase C/D. See `B-DS-FORENSIC-v1-and-heal-plan.md` §9 for full migration discipline.

---

## Breaking changes (summary)

- **No `v1-compat.css`** — hard cut. Token namespace renames are breaking.
- **`react-router-dom` removed** — v2 is a library, not a SPA. No router dep.
- **`recharts` removed** — migrated to `highcharts` + `highcharts-react-official`.
- **Phosphor icons removed** — Lucide only. Rewrite 2 Phosphor sites.
- **`peerDependencies` required** — react/react-dom are required peers, not optional.
- **Subpath exports** — import from `@kenresearch/design-system/atoms` not root.

---

## Atom migration table

| Atom name | v1 path | v2 path | Breaking? | Migration note |
|---|---|---|---|---|
| (Phase C) | `design-system/core/src/app/components/` | `@kenresearch/design-system/atoms` | — | — |

## Molecule migration table

| Molecule name | v1 path | v2 path | Breaking? | Migration note |
|---|---|---|---|---|
| (Phase C) | `design-system/core/src/app/components/molecules/` | `@kenresearch/design-system/molecules` | — | — |

## Organism migration table

| Organism name | v1 path | v2 path | Breaking? | Migration note |
|---|---|---|---|---|
| (Phase D) | `design-system/core/src/app/components/organisms/` | `@kenresearch/design-system/organisms` | — | — |

## Token renames

| v1 token | v2 token | Notes |
|---|---|---|
| `--brand-red` | `--color-brand-red` | Namespace aligned to DTCG |
| (Step 2 populates full table) | — | — |
