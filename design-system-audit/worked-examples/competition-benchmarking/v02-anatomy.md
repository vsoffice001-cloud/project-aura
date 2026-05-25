# v02 — Anatomy · Section-by-section WWWWH (and what changed vs v01)

**Source:** `projects/competition-benchmarking-listing-v02/src/app/App.tsx`
**Page-section contract:** `App.tsx:5-14` — identical to v01 line-for-line.

---

## The headline finding

**v02 page = v01 page.** Verified two independent ways:

1. `diff -rq` of the two `src/` trees (run during this audit) returns no entries.
2. MD5 hash of the concatenated MD5s of every file in `src/`:
   `69187a8750c67fd5b21034b3f2e4fb6c` on both v01 and v02.

So this anatomy is **not** a re-walk of section behaviour (see `v01-anatomy.md`
for that — it applies verbatim). This document instead answers:

- **What did the v02 metadata snapshot freeze about the page state at handover?**
- **Why was v02 created at all if the page didn't change?**
- **What are the genuine deltas, file by file, and the rationale per delta?**

---

## Section-by-section render order in v02

Identical to v01 in every respect. For ergonomic reference:

| # | Section | Surface | File invoked at | What renders |
|---|---|---|---|---|
| 1 | `Header` | white | `App.tsx:99` | Global top nav |
| 2 | `BenchmarkHeroBanner` | black | `App.tsx:102` | 4-variant hero, D = default slim 50vh + featured carousel |
| 3 | `BenchmarkContextBanner` | warm-300 | `App.tsx:105-109` | breadcrumb + count + clear-all |
| 4 | `BenchmarkStatsStrip` | warm-400 | `App.tsx:112` | 240+ benchmarks · 18 industries · 35 regions |
| 5 | 2-col body | white | `App.tsx:116-223` | sidebar + toolbar + chips + masonry grid / list / sentinel |
| 6 | `BenchmarkTrendingTopics` | warm-300 | `App.tsx:226-230` | tag pill row |
| 7 | `BenchmarkMethodologyPreview` | white compact | `App.tsx:233-237` | 3-step "How we benchmark" |
| 8 | `BenchmarkCustomResearchCTA` | black | `App.tsx:240` | custom research conversion handoff |
| 9 | `Footer` | black | `App.tsx:243` | Global footer |

Persistent overlays (mobile filter sheet, mobile filter bar, back-to-top,
sonner toaster) all mounted at App-root level, also identical.

For the *why · where · when · how* of each region, see `v01-anatomy.md`.

---

## The real v01 → v02 delta · file by file

### Files added in v02

| File | Why |
|---|---|
| `.gitignore` (74 bytes) | v01 had none. v02 adds standard Vite + Node ignores. Implication: v01 was Figma-Make-imported and never properly git-initialised; v02 is "git-clean" so tech team can `git init` cleanly. Small thing but signals "ready-for-checkout" hygiene. |
| `package.json` field `"preview": "vite preview"` | Lets tech team run a production-build preview locally (`pnpm build && pnpm preview`) — required to verify `import.meta.env.DEV` gating of `SubtleVariantSwitcher`, which is called out in v02 HANDOVER L129 as a verify-in-prod step. |

### Files removed in v02

| File | Why removed |
|---|---|
| `MIGRATION_LOG.md` (10.4 KB · 160 lines) | Logs the Phase 0–4 migration trace from the original DS-26 import. v02 is downstream of that migration — log is provenance, not future-of-record. Workspace `feedback_anti_bloat.md` rule: archaeology stays with the exploration folder. |
| `FOLDER_CONTEXT.md` | One-paragraph "what is this folder" preamble useful during exploration; redundant once `STATUS.md` + `HANDOVER.md` are authoritative. |
| `ATTRIBUTIONS.md` | Image credit / library attribution scratchpad. Not part of the handover contract. |
| `guidelines/` (directory) | Project-local UX guidelines from the Figma-Make import. v02 defers to workspace-level `design-system/` instead. |

### Files renamed/repurposed (none) and rewritten (3)

- **`HANDOVER.md`** — rewritten. v01 version (141 lines) leads with **what tech
  must do** (tech-team intake checklist, known issues, perf gates). v02 version
  (155 lines) leads with **what the page is** (URL contract, section list,
  component map, mock data shape) and pushes the to-do list to "Known issues".
  Reframe: v01 says "here's a build that needs work"; v02 says "here's a build
  ready for intake — and by the way, here are caveats".
- **`README.md`** — rewritten with v02 framing as "handover-ready snapshot".
- **`STATUS.md`** — flipped from `exploring` to `ready-for-tech`. The gate
  checklist in `STATUS.md` is mostly *the same boxes* in both versions but v02
  explicitly confirms some that v01 left implicit (build succeeds, mock-data
  extracted, reduced-motion honored).

### `package.json` diff (verified)

```
2c2
<   "name": "competition-benchmarking-listing-v01",
---
>   "name": "competition-benchmarking-listing-v02",
8c8,9
<     "dev": "vite"
---
>     "dev": "vite",
>     "preview": "vite preview"
```

Two changes only. Package rename + preview script. No deps changed, no engines
changed, no scripts removed.

---

## Why v02 exists if the page is unchanged

Per workspace `CLAUDE.md` (handover discipline section) and
`feedback_handover_discipline.md` memory: **once a project is `ready-for-tech`,
the folder becomes read-only for design.** Any further design iteration must
happen in a new `<name>-v<n+1>/` folder. The pattern protects tech-team intake
from mid-handover edits.

So the v02 folder isn't "v02 the iteration" — it's "v02 the **frozen snapshot**".
The two-folder split is deliberate:

- **v01 stays mutable** so the design team (Aura main thread) can keep
  iterating — they have all the migration archaeology and can rerun the
  exploration process.
- **v02 is sealed** — tech team checks out v02, ignores v01, owns the codebase
  from intake forward.

If/when design needs to revise (say after a tech-team review pass), the rule is:
**copy v02 → v03**, do not touch v02. v01 may also continue evolving in parallel
as a design playground.

This is verified by the timeline: v01 last reviewed 2026-05-06, v02 last
reviewed 2026-05-07 (one day later — the copy-and-strip date).

---

## What changed vs v01 — and **why**, per change

| Delta | Why |
|---|---|
| Folder renamed `-v01` → `-v02` | Workspace versioning rule: handover snapshots get monotonic version suffix, never overwrite previous. |
| `package.json` name bump | Match folder. Avoids accidental shadowing if both are linked into a monorepo workspace at once. |
| `package.json` adds `preview` script | Required to QA the `import.meta.env.DEV` gate on `SubtleVariantSwitcher` — without it tech team can't easily verify the variant switcher hides in prod. HANDOVER v02 L129 calls this out explicitly. |
| Adds `.gitignore` | Lets tech team `git init` cleanly on intake without staging `node_modules/` + `dist/`. v01 didn't need this — it lived inside the workspace monorepo. |
| Drops `MIGRATION_LOG.md` + `FOLDER_CONTEXT.md` + `ATTRIBUTIONS.md` + `guidelines/` | Anti-bloat rule. Handover contract should be **three docs** (`STATUS.md` · `HANDOVER.md` · `README.md`), per workspace `templates/`. Migration archaeology is exploration-folder concern. |
| Rewrites HANDOVER.md to lead with "what this is" not "what to fix" | Tone shift from design-perspective ("here are the gaps") to tech-perspective ("here is the contract; deviations noted"). |
| Rewrites README.md with handover framing | Same reframe. |
| Flips STATUS from `exploring` to `ready-for-tech` | The actual gate flip. |

### What was deliberately **not** changed

- **Hero variants A/B/C still present in code.** A pure-handover snapshot might
  delete the unused variants. v02 keeps them, gated behind
  `import.meta.env.DEV`. Rationale (inferred from HANDOVER v02 L64): the design
  team wants tech team to be able to preview alts for different scenarios after
  intake. Variants are a feature, not dead code.
- **Inherited unused deps not pruned.** `react-three`, `cobe`, `recharts`,
  `mui/material` etc. all still in `package.json`. HANDOVER v02 L127
  acknowledges and defers: "Tree-shake to zero in prod build (verified). Tech
  may prune in cleanup pass." This is a **conscious anti-bloat deferral** — the
  design team isn't qualified to assess transitive dep risk; tech team owns
  cleanup.
- **No `tsconfig.json` added.** STATUS v02 L17 + HANDOVER v02 L125 both flag this
  as deferred. Same logic — tech team owns CI/lint/strict-TS conformance.
- **No axe / Playwright wired.** STATUS v02 L18 — deferred to tech. Manual QA
  pass done.
- **DS-shared atoms still carry hardcoded hex.** STATUS v02 L32 + HANDOVER v02
  L130 flag this as a workspace-wide DS gap, tracked in
  `docs/LEARNINGS.md`. Out-of-scope for this build per anti-bloat rule.
- **`useReportFilters.ts` still alongside `useBenchmarkFilters.ts`.** Both files
  still present in `src/app/components/hooks/`. v02 doesn't prune the unused
  parent hook. Likely an oversight rather than a decision — `BenchmarkFilterSidebar`
  and the page App.tsx exclusively import `useBenchmarkFilters`.

---

## What this delta tells us about the DS process

1. **Handover is a doc operation, not a code operation.** Healthy DS forks
   shouldn't have a v01 → v02 code delta if v01 is sound. v02 here is
   *exclusively* documentation reframing + 3 metadata file ops.
2. **Three-doc handover contract is enforced.** STATUS · HANDOVER · README =
   the canon trio. Workspace `templates/` ships these.
3. **`exploring` → `ready-for-tech` is a status flip backed by a checklist.**
   STATUS v02 L13-25 walks the 13-point pre-handover gate. Some boxes ticked
   (build, mock-data, README/HANDOVER, reduced-motion); some explicitly
   deferred (lint, strict TS, axe, Lighthouse, gstack visuals, conventional
   commits). The flip is not "all green" — it's "all explicit". This is the
   right model.
4. **Anti-bloat enforced via subtraction.** v02 removes 4 docs + 1 dir that v01
   carried. Demonstrates the workspace `feedback_anti_bloat.md` rule in
   practice.
5. **The `SubtleVariantSwitcher` dev-only gate is the only behavioural-ish
   surface change indicator.** Adding `pnpm preview` to v02's package.json
   exists to let tech-team verify it actually hides in prod. Small but
   thoughtful.

---

## Sources cited
- `projects/competition-benchmarking-listing-v01/package.json:2,8`
- `projects/competition-benchmarking-listing-v02/package.json:2,8-9`
- `projects/competition-benchmarking-listing-v01/STATUS.md:3,14-28`
- `projects/competition-benchmarking-listing-v02/STATUS.md:3,12-25,27-34`
- `projects/competition-benchmarking-listing-v02/HANDOVER.md:9,64,125,127,129-130`
- `projects/competition-benchmarking-listing-v01/MIGRATION_LOG.md` (entirety — removed in v02)
- `projects/competition-benchmarking-listing-v02/src/app/App.tsx:5-14` (section contract)
- workspace `CLAUDE.md` (handover-discipline section) + `feedback_handover_discipline.md`
- MD5 verification (audit-run): `69187a8750c67fd5b21034b3f2e4fb6c` on both v01 + v02 src/

**Word count:** ~1,330.
