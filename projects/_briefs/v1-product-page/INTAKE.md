# INTAKE · V1 Product Page Rebuild (v0.2)

## Project header

| Field | Value |
|---|---|
| Project name | V1 Product Page Rebuild (v0.2) |
| Status | **planning** (Phase 0 · pre-build) |
| Owner | design@kenresearch.com (Aura) |
| Date initiated | 2026-05-15 |
| Variant default | editorial-light (per PRD V2 §8) |
| Master example | Australia Cold Chain Market (2022-2027) |
| Source canon | `PRD-V2.1-australia-coldchain.md` + `PRD-V2-design-direction.md` (this folder) |
| Design direction | V01 Lovable-style container/card · text-led · research-credible · 9.5/10 cinematic finish |

## Prior version

- **Path:** `projects/reports-pdp-v2/`
- **Status:** DISCARDED as design reference (bad design — explicit per user)
- **Reuse:** code patterns / Next.js + Tailwind v4 + DS core-v2 wiring only — NOT visual / IA / motion
- **Action:** copy-only of useful primitives; new folder for v0.2

## Design intent (locked from PRD)

- Editorial-light primary (white / off-white `#f5f2f1` · black text)
- Charcoal / navy text accents
- Ken Red `#b01f24` reserved for CTAs only
- Low-radius cards (4-8px scale)
- Thin borders (1px · subtle)
- Soft shadows (token-driven · DS core-v2 shadow scale)
- Noto Serif display · DM Sans body
- 16px base · Major Third 1.25× scale
- Framer Motion only · reduced-motion mandatory
- NO GSAP · NO Lenis (parity w/ dev-team per `feedback_ds_port_workflow.md`)

## Stack (locked)

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router · RSC) |
| Runtime | React 19 |
| Styling | Tailwind v4 (`@source` directive scanning DS core-v2 source per `feedback_tailwind_v4_ds_source_scan.md`) |
| Design system | `design-system/core-v2/` (active post-Sprint 2026-05-07) |
| Tokens | `design-system/tokens/build/tokens.css` (canonical · unlayered `:root` per `feedback_css_layer_cascade_trap.md`) |
| Motion | Framer Motion |
| Charts | `@ken-research/charts` (storybook: https://ken-charts.netlify.app) |
| CMS | Django modular page builder (backend team owns deploy) |
| Mock data | `src/lib/mock-data.ts` w/ `// TODO: replace w/ real API` markers (per CLAUDE.md case-study architecture) |

## Chart library

- **Name:** `@ken-research/charts`
- **Storybook:** https://ken-charts.netlify.app
- **Integration question:** real npm package OR local wrapper component? (see Open Q4 below)
- **Mandate:** all 7 chart modules in the PDP use this library — no Recharts/Nivo/D3 ad-hoc fork.

## CMS contract

- **Backend:** Django modular page builder
- **Consumption pattern:** each module = self-describing JSON block w/ `{ type · access · data · order }`
- **This iteration question:** mock CMS contract OR connect to real Django endpoint? (see Open Q3 below)

## Access logic

- **Pattern:** freemium info-wall — free preview content + gated deep analysis
- **Per-card / per-chart / per-tab `access` field:** `free | gated | sample`
- **This iteration question:** mock access logic OR real CMS-driven contract? (see Open Q3 below)

## Mock data strategy

- **Default:** centralize in `src/lib/mock-data.ts`
- **Marker convention:** `// TODO: replace w/ real API` on every mock block
- **Source:** `AUSTRALIA-COLDCHAIN-DATA.md` (this folder) is the source-of-truth for mock values

## Open intake questions (await user decision before COMPOSE step)

1. **Project folder name?**
   - Proposed: `projects/v1-product-page-v02/` OR `projects/reports-pdp-v02/` OR `projects/product-page-australia-coldchain-v01/`
   - Decision: ☐ pending
2. **Variant scope:**
   - Option A: light-only this iteration
   - Option B: hybrid (editorial-light primary + cinematic-dark per-section activator demo)
   - Decision: ☐ pending
3. **CMS / access logic this iteration:**
   - Option A: mock CMS contract in `src/lib/mock-cms.ts` w/ TODO markers
   - Option B: connect to real Django endpoint (requires backend team coordination)
   - Decision: ☐ pending
4. **Chart library integration:**
   - Option A: install real `@ken-research/charts` npm package
   - Option B: build local wrapper components consuming the storybook API surface
   - Decision: ☐ pending
5. **Data fidelity:**
   - Option A: real Ken report data (requires data team coord + license check)
   - Option B: mock data sourced from `AUSTRALIA-COLDCHAIN-DATA.md` w/ TODO markers (Aura-default per scope rule)
   - Decision: ☐ pending

## Out-of-scope (per `feedback_aura_scope_no_seo_marketing.md`)

- SEO meta enrichment
- Structured data (JSON-LD schema.org)
- GTM / GA / analytics wiring
- Lighthouse SEO chasing
- Backend deploy / Nginx / AWS config

## Routing (per ROUTING.md page-build workflow)

- 9-step process (was 8, became 9 on 2026-05-12 w/ craft-pass)
- Step 1: INTAKE ← **WE ARE HERE**
- Step 2: RESEARCH ← **DONE in parallel · see RESEARCH.md**
- Step 3: PROPOSE + BLOCK (hard gate)
- Step 4: COMPOSE
- Step 4.5: CRAFT-PASS via `aura-craft` (hard gate)
- Step 5: SHOW FIRST CUT (hard gate)
- Step 6: PROPOSE QA
- Step 7: EXECUTE QA via `aura-qa`
- Step 8: EXIT

## Phase 0 deliverables (this batch)

- `PRD-V2.1-australia-coldchain.md` ✓ (skeleton + master-example data)
- `PRD-V2-design-direction.md` ✓ (skeleton)
- `INTAKE.md` ✓ (this file)
- `RESEARCH.md` ✓ (8-section web research)
- `AUSTRALIA-COLDCHAIN-DATA.md` ✓ (mock-data source-of-truth)

## Next action (user decision required)

User answers Open Qs 1-5 → proceed to Phase 1 Step 3 PROPOSE + BLOCK.
