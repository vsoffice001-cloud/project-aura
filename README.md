# Ken Research — Design + Frontend Workspace

**Owner:** Ken Research design team (Aura-assisted)
**Status:** 2026-05-13 · DS Port Phase 1-3 complete · 2 projects ready-for-tech
**Workspace type:** pnpm monorepo · Node 20.20.1 · pnpm 10.33.0

This workspace is the **design + frontend development environment** for Ken Research. Tech-team takes over deployment · backend (Django CMS) · CI/CD · npm publish.

## Quick start

```bash
# 1. Install workspace
pnpm install

# 2. Run design system tokens build
./run.sh tokens

# 3. Run a consumer app
./run.sh frontend                              # default consumer (V0_lite_report)
pnpm --filter @kenresearch/v0-lite-report dev  # explicit · port 3000
pnpm --filter reports-pdp-v2 dev               # report PDP · port 3000

# 4. Verify DS health
pnpm --filter @kenresearch/design-system verify
```

## Workspace map

```
Anti-folder01/
├── design-system/                  ← CANONICAL DS HOME
│   ├── core-v2/                    ← v2 active · @kenresearch/design-system · ready-for-tech
│   │   ├── src/{atoms,molecules,organisms,hooks,ui,types,patterns,charts}/
│   │   ├── docs/COMPONENT_REFERENCE.md   ← SINGLE AI lookup doc (decision tree)
│   │   ├── STATUS.md · HANDOVER.md · README.md
│   │   └── dist/                   ← built · regenerable via `pnpm build`
│   ├── tokens/                     ← Style Dictionary v4 DTCG · canonical brand tokens
│   ├── recipes/                    ← page-build specs (case-study · report-store-listing)
│   ├── DESIGN.md                   ← brand vocab + craft + adapter + a11y rules
│   ├── ANTI_PATTERNS.md            ← 14 categories of "never do this"
│   ├── COMPONENT_REFERENCE.md      ← redirect to core-v2/docs/COMPONENT_REFERENCE.md
│   └── 4WH_AUDIT.md                ← pointer to inline JSDoc
│
├── projects/                       ← consumer apps (Next 15 · React 19 · Tailwind v4)
│   ├── reports-pdp-v2/             ← ready-for-tech · PRD-driven · Lighthouse mobile 91/100/100/100
│   ├── V0_lite_report/             ← cleanup · 179kB build · 13 sections wired
│   ├── V0.2_report/                ← scaffold · cinematic-dark hero planned
│   ├── report-store/               ← scaffold · listing page planned
│   ├── competition-benchmarking-listing-v01/v02/  ← exploration / handed-over
│   ├── ken-research-backend/       ← Django · tech-team owns (in-scope for local edits per 2026-04-30 flip)
│   └── *-legacy/                   ← read-only archives · DO NOT EDIT
│
├── skills/                         ← Aura skills (8 active · 72 archived)
│   ├── aura-craft/                 ← craft-pass · 6 principles + 16 hard-bans
│   ├── aura-design/                ← Ken design decisions
│   ├── page/                       ← /page <recipe> page-build slash command
│   └── ...
│
├── workflows/                      ← agent templates + ROUTING.md
│   ├── agents/{aura-builder,aura-qa,aura-mech}.md
│   └── ROUTING.md                  ← 11 named workflows incl. pre-handover
│
├── docs/                           ← workspace meta-docs
│   ├── CHANGELOG.md                ← Aura-infra log
│   ├── DECISIONS.md · LEARNINGS.md ← ADR + post-mortems
│   ├── API_CONTRACT.md             ← Django endpoint spec (consumed by tech-team)
│   └── WORKSPACE-MAP.md            ← detailed file tree
│
├── scripts/                        ← workspace utilities
│   └── verify.sh                   ← F1+F2 prevention gates (pnpm verify in each project)
│
├── HANDOVER_DELIVERY.md            ← SINGLE ENTRY DOC FOR TECH-TEAM
├── HANDOVER_TRACKER.md             ← per-project handover status table
├── CLAUDE.md                       ← Aura agent operating rules (AI-targeted)
├── Quick_start_guide.md            ← brand tokens quick-ref
└── pnpm-workspace.yaml             ← workspace package manifest
```

## Tech stack

| Layer | Tech | Status |
|---|---|---|
| **L1 Frontend** | Next.js 15/16 · React 19 · Tailwind v4 · shadcn/ui · DS · Framer Motion 12 | ✅ Built · 2 projects ship-ready |
| **L2 Backend** | Django + DRF + Channels · Postgres + Mongo + Redis · Celery | ⚠️ Tech-team owns · API spec in `docs/API_CONTRACT.md` |
| **L3 AI/RAG** | FastAPI + vector DB · n8n | ⚠️ Design as-if · tech builds |
| **Deploy** | AWS + Nginx | ⚠️ Tech-team ops |

## For tech-team

Single entry doc → [HANDOVER_DELIVERY.md](HANDOVER_DELIVERY.md).

Quick reference:
1. DS package · `design-system/core-v2/` · ready-for-tech · 168 components
2. Sample consumer · `projects/reports-pdp-v2/` · ready-for-tech · Next 16 · 30 modules · 5 access tiers
3. API spec · `docs/API_CONTRACT.md` · for Django implementation
4. Pre-handover gate · `HANDOVER_TRACKER.md` § 13-point gate

## For design-team

Single entry doc → [CLAUDE.md](CLAUDE.md) (Aura operating rules).

Quick reference:
1. Brand tokens · [Quick_start_guide.md](Quick_start_guide.md)
2. Component lookup · [design-system/core-v2/docs/COMPONENT_REFERENCE.md](design-system/core-v2/docs/COMPONENT_REFERENCE.md)
3. Anti-patterns · [design-system/ANTI_PATTERNS.md](design-system/ANTI_PATTERNS.md)
4. Workflows · [workflows/ROUTING.md](workflows/ROUTING.md)

## Commands

| Command | Purpose |
|---|---|
| `pnpm install` | Install workspace |
| `./run.sh tokens` | Build design tokens (Style Dictionary) |
| `./run.sh design` | Run DS playground |
| `./run.sh frontend` | Run default consumer |
| `./run.sh backend` | Run Django dev server |
| `pnpm --filter <pkg> dev` | Run specific consumer |
| `pnpm --filter <pkg> verify` | Run F1+F2 prevention gates + typecheck |
| `pnpm --filter <pkg> build` | Production build |
| `pnpm --filter <pkg> test` | Playwright + axe tests |

## Contact

Design lead: design@kenresearch.com (Aura-assisted)
