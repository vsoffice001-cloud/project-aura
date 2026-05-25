# 00 — Overview · Competition Benchmarking Listing (v01 + v02)

**Audit date:** 2026-05-13
**Auditor:** Aura (worked-example pass for DS audit)
**Scope:** `projects/competition-benchmarking-listing-v01/` + `projects/competition-benchmarking-listing-v02/`
**Read-only.** No source files modified.

---

## TL;DR — what these two folders are

Two design-phase Vite + React SPAs of the same page: a faceted listing for Ken
Research **Competition Benchmarking** reports. v01 is the **live exploration
playground**; v02 is the **frozen handover snapshot** of v01. Their `src/` trees
are **byte-identical** — verified by MD5-of-MD5s
(`69187a8750c67fd5b21034b3f2e4fb6c` on both sides). Only the *metadata*, *docs*,
and *package.json* differ.

So this audit is really a single-codebase audit with two metadata wrappers, not
two product iterations. The interesting evolution lives one step further up the
tree: **`projects/report-store-legacy/`** (the parent the entire DS pattern is
derived from).

---

## What each version represents

### v01 — `competition-benchmarking-listing-v01/`
- **Status (per `STATUS.md` L3):** `exploring` — open for further iteration.
- **Reviewer:** "Aura (aura-builder Sonnet)" (STATUS L6).
- **Owner:** design.
- **Carries:** `ATTRIBUTIONS.md` · `FOLDER_CONTEXT.md` · `MIGRATION_LOG.md` ·
  `guidelines/` (the migration archaeology — kept because v01 is still mutable).
- **Last reviewed:** 2026-05-06.
- **Hero variant set:** A (editorial split + ticker), B (image split), C (data-viz
  node graph), D (slim featured-card · DEFAULT). All four are in the same
  `BenchmarkHeroBanner.tsx` file (795 LOC), gated behind a `SubtleVariantSwitcher`
  that only renders when `import.meta.env.DEV` is true. v01 retains every variant
  for the design team to keep exploring.
- **HANDOVER stance (L10):** "Tech team needs to wire real API, add ESLint/tsconfig,
  move peer deps, and run a11y/perf gates." Aware of gaps; not yet sealed.

### v02 — `competition-benchmarking-listing-v02/`
- **Status (per `STATUS.md` L3):** `ready-for-tech` — handover-frozen.
- **Reviewer:** "Aura" (STATUS L6 — no agent qualifier — implies main thread sign-off).
- **Owner:** design (Aura) → handing to tech-team.
- **Carries:** trimmed metadata only. Migration archaeology (`MIGRATION_LOG.md`,
  `FOLDER_CONTEXT.md`, `ATTRIBUTIONS.md`, `guidelines/`) **deliberately omitted** —
  per workspace handover-discipline rule (project is now read-only for design,
  no further migrations expected here).
- **Last reviewed:** 2026-05-07 (one day after v01 last-review).
- **Adds:** `.gitignore` (was missing in v01); `preview` script in
  `package.json` (`"preview": "vite preview"` — verified by direct diff).
- **HANDOVER stance:** "All design decisions locked; no UI iterations needed before
  tech intake." Sealed.

### The functional gap is zero
A `diff -rq` across the two `src/` trees returns no entries. Same 68 components,
same 5 hooks, same mock data file, same App.tsx (293 lines, identical
byte-for-byte). The "evolution from v01 to v02" is purely **handover-readiness
metadata**, not a UI/UX revision.

This matters for the DS audit: anything we learn from one folder generalises 1:1
to the other. Treat them as a single artifact unless metadata flow is the question.

---

## Tech stack (both versions)

| Layer | Tech | Notes |
|---|---|---|
| Build | Vite 6.3.5 | No `tsconfig.json` (Vite transpile-only) |
| Framework | React 18.3.1 in v02 / "React 19 peerDep" line in v01 HANDOVER L29 (peerDeps quirk inherited from Figma-Make) | `package.json` shows React under `peerDependencies` with `optional: true` — Vite resolves it. Tech team to move to `dependencies` on intake. |
| Styling | Tailwind v4.1.12 (`@tailwindcss/vite`) | All custom values come through CSS variables in `src/styles/theme.css` |
| Animation | GSAP 3.15 (hero fade-up) + Motion (Framer successor, component motion) + native CSS keyframes (node-pulse) | `prefers-reduced-motion` honored via `gsap.matchMedia` + CSS `@media` queries |
| Layout | `react-responsive-masonry@2.7` for grid masonry | v01 STATUS L34 flagged it as "not installed" but it IS in `package.json` and IS used in `App.tsx` L189. STATUS comment is stale. |
| UI primitives | Radix UI (accordion, dialog, popover, tooltip) | Wrapped by the project-local DS atom copies (`FilterAccordion`, `FilterCheckbox`, etc.) |
| State | Custom hook `useBenchmarkFilters` (235 LOC) | All filter state + URL sync + debounce + facet counts in one place |
| Icons | `lucide-react@0.487` | |
| Toasts | `sonner@2.0` | Mounted at App root |
| Mock data | `src/lib/mock-data.ts` (586 LOC) | 24 `BenchmarkReport` seed entries + 6 catalog exports |

### Inherited dead weight (both versions)
HANDOVER v02 L127 calls out unused deps inherited from the RS-v07 template:
`@react-three/drei`, `@react-three/fiber`, `three`, `three-globe`, `cobe`,
`recharts`, `embla-carousel-react`, `react-slick`, `react-dnd`, `@mui/material`.
None used on the listing. Tree-shake to zero at prod build but bloat
`node_modules`. Cleanup candidate.

---

## Evolution from `report-store-legacy` (the parent template)

The competition-benchmarking project is a **specialisation fork** of
`projects/report-store-legacy/` (the original Ken DS-26 migration target). The
fork was *not* a copy-paste-everywhere — it was a **selective-port + rename**:

1. **Kept verbatim** (same file, same source-of-truth): `Header`, `Footer`,
   `Container`, `SectionWrapper`, `Card`, `Badge`, `Button`, `CTALink`,
   `FilterCheckbox`, `FilterSearchInput`, `FilterChip`, `MobileFilterBar`,
   `ViewToggle`, `BackToTop`, `LoadMoreSentinel`, `EmptyState`, `CardReveal`,
   `iconColors`, `industryIconMap`. ~36 atoms copied across.
2. **Renamed-and-specialised** organisms:
   `IndustrySidebar.tsx` (RS, 675 LOC) → `BenchmarkFilterSidebar.tsx` (447 LOC).
   `ReportCard.tsx` (RS, 583 LOC) → `BenchmarkCard.tsx` (242 LOC) +
   `BenchmarkListCard.tsx`.
   `ListingContextBanner.tsx` (513 LOC — kept w/ same filename, but Zone-B chips
   extracted to a new file `BenchmarkActiveFilters.tsx` 193 LOC).
   `CustomResearchCTA.tsx` (RS, 57 LOC) → `BenchmarkCustomResearchCTA.tsx` (163 LOC).
3. **Added net-new organisms** for the benchmark use case:
   `BenchmarkHeroBanner.tsx` (795 LOC, 4 hero variants) ·
   `BenchmarkStatsStrip.tsx` ·
   `BenchmarkMethodologyPreview.tsx` ·
   `BenchmarkTrendingTopics.tsx` ·
   `BenchmarkListingToolbar.tsx` ·
   `BenchmarkMobileFilterSheet.tsx` ·
   `BenchmarkActiveFilters.tsx` ·
   `ActiveFilterStickyBar.tsx` ·
   `ResourceCard.tsx` ·
   `SubtleVariantSwitcher.tsx`.
4. **Replaced**: `useReportFilters.ts` (RS) → `useBenchmarkFilters.ts` (235 LOC,
   adds 3 dimensions: tag, country, methodology) — *both files coexist in the
   benchmark src/* (compare `src/app/components/hooks/` listing). The old one
   is dead-weight retention from the copy step.

Component file count delta (verified by `diff` of `ls src/app/components/`
listings): RS legacy = 53 components in `app/components/`; CB v01/v02 = 68
components. Net +15 from forking.

---

## The "v01 → v02" delta (the only real differences)

`diff -rq projects/competition-benchmarking-listing-v01/ projects/competition-benchmarking-listing-v02/` (excluding node_modules):

| File | Status | Note |
|---|---|---|
| `src/**/*` | byte-identical | Same MD5-of-MD5s on both sides |
| `.gitignore` | v02 only | New in v02 |
| `ATTRIBUTIONS.md` | v01 only | Dropped |
| `FOLDER_CONTEXT.md` | v01 only | Dropped |
| `MIGRATION_LOG.md` | v01 only | Dropped (160 LOC, full Phase 0–4 trace from the original DS-26 migration session) |
| `guidelines/` | v01 only | Dropped |
| `HANDOVER.md` | both differ | v02 rewritten — leads with section list + URL contract; v01 leads w/ tech-team to-do list |
| `README.md` | both differ | v02 framed as "handover-ready snapshot"; v01 framed as design-exploration |
| `STATUS.md` | both differ | Status flips `exploring` → `ready-for-tech` |
| `package.json` | both differ | (a) name bump `…-v01` → `…-v02` (b) v02 adds `"preview": "vite preview"` script |

**Behavioural delta = zero.** Documentation/governance delta = high.

---

## How this folder pair fits the workspace discipline

Per workspace `CLAUDE.md` handover rule: "`handed-over` projects = read-only
for design. New iteration = copy folder to `<name>-v<n+1>/`. Never edit handed
folder."

v02 was created on 2026-05-07 by copying v01 (state at 2026-05-06) and stripping
exploration-time metadata. This is the canonical workspace pattern in motion —
**v01 stays mutable for further design iteration; v02 stays frozen for tech
intake**. If a v03 is needed, the rule says: copy v02 → v03, do not edit v02.

The "two folders, identical src/" pattern is a feature, not redundancy.

---

## What this audit will conclude (preview)

The competition-benchmarking listing is a **strong replication candidate** for
the new DS — it demonstrates a clean fork of the report-store pattern, and the
hero-variant-rotation, color-coded chip strip, masonry variant-rotation card,
and faceted-sidebar architecture are reusable. But three of its design choices
are **anti-patterns**: hardcoded hex inside RGBA literals (color tokens that
escaped the token build), dead deps from the RS-v07 import, and a redundant
fallback set of hooks (`useReportFilters.ts` lives next to `useBenchmarkFilters.ts`).
See `pattern-lessons.md`.

---

## Sources cited in this overview
- `projects/competition-benchmarking-listing-v01/STATUS.md:3,6`
- `projects/competition-benchmarking-listing-v02/STATUS.md:3,6,10`
- `projects/competition-benchmarking-listing-v01/HANDOVER.md:10,29,127`
- `projects/competition-benchmarking-listing-v02/HANDOVER.md:9,127`
- `projects/competition-benchmarking-listing-v01/src/app/App.tsx:1-46` (section order)
- `projects/competition-benchmarking-listing-v01/src/app/components/BenchmarkHeroBanner.tsx:42-47` (variant set)
- `projects/competition-benchmarking-listing-v01/src/app/components/BenchmarkFilterSidebar.tsx:5-17` (RS-mirror provenance)
- `projects/competition-benchmarking-listing-v01/src/app/components/BenchmarkCard.tsx:5-22` (variant rotation provenance)
- `projects/competition-benchmarking-listing-v01/src/lib/mock-data.ts:9-27` (BenchmarkReport shape)
- `projects/report-store-legacy/src/app/components/IndustrySidebar.tsx` (675 LOC parent of BenchmarkFilterSidebar)
- `projects/report-store-legacy/src/app/components/ReportCard.tsx` (583 LOC parent of BenchmarkCard)

**Word count:** ~1,250.
