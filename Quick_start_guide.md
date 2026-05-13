# Quick Start Guide — Ken Research Workspace

## Design System Reference (Ken Research)

**Active DS**: `design-system/core-v2/` (Sprint 2026-05-07 fork — Next 15 + RSC compat + token-only)
**Legacy v1**: `design-system/core/` (frozen read-only, archaeology only)
**Tokens (canonical)**: `design-system/tokens/` (Style Dictionary v4 DTCG)
**Topology snapshot**: [docs/WORKSPACE-MAP.md](docs/WORKSPACE-MAP.md)

---

## Brand Tokens (Ken Research Standards)

**Typography** (Major Third 1.25× scale):
- Labels: 12.8px (`--text-xs`)
- Body: 16px (`--text-sm`) ← 90% of text
- Section h2: 39px (`--text-2xl`)
- Hero h1: 48.8px (`--text-3xl`)
- TOC/Nav: 14px (`--text-nav`)
- **Font Display/Heading**: Noto Serif
- **Font Body**: DM Sans

**Colors** (canonical CSS vars in `design-system/tokens/build/tokens.css`):
- Background dark: `#0a0a0c` (cinematic — `--color-bg-deep`)
- Background light: `#f5f2f1` (editorial warm off-white)
- Accent Primary: `#b01f24` (Ken Brand Red) — CTAs ONLY
- Accent Secondary: `#806ce0` (Purple)
- Text on dark: `#FAFAFA`  ·  Text on light: `#000000`

**Variants:** cinematic-dark · editorial-light. Activator `[data-variant-section="cinematic"]` lets a single section opt-in to cinematic mesh inside an editorial-light page.

---

## Workspace Structure

Active workspace packages (`pnpm-workspace.yaml`, post-Sprint 2026-05-07):

| Package | Path | Status |
|---|---|---|
| `@kenresearch/tokens` | `design-system/tokens/` | active |
| `@kenresearch/design-system` | `design-system/core-v2/` | active |
| (project) | `projects/V0_lite_report/` | full port (Next 15) |
| (project) | `projects/report-store/` | foundation only |
| (project) | `projects/V0.2_report/` | foundation only |

Reference / legacy projects (not active):

| Project | Type | Location |
|---|---|---|
| Case Study — Template v3 | Vite/React | `projects/casestudy-templates/template-v3/` |
| Case Study — Template v28 | Vite/React | `projects/casestudy-templates/template-v28/` |
| Ken Research About | Static HTML | `projects/webpages-ken/ken-research-about/` |
| Ken Research Backend | Django/Python | `projects/ken-research-backend/` (local edit OK, no remote push) |
| Report Store v07 | Vite/React (legacy listing reference) | `projects/report-store-v07/` |
| Top Nav v32 | Vite/React (navbar canonical source) | `projects/topnav-v32/` |
| Frozen legacy | various | `projects/*-legacy/` (3 folders, read-only) |

Full topology: [docs/WORKSPACE-MAP.md](docs/WORKSPACE-MAP.md).

---

## 🚀 One-Click Run

Root runner script:
- **Frontend**: `./run.sh frontend`
- **Backend**: `./run.sh backend`
- **Design System**: `./run.sh design`
- **Tokens build**: `./run.sh tokens`

Per-project: `cd projects/<name> && pnpm dev|build`.

---

## AI Skill Routing

Skills directory: **post-prune target = 8 workspace + 3 external** (full prune in flight per `docs/PLAN-2026-05-08-aura-tightening.md`). Authoritative routing table: `skills/SKILL_ROUTING.md`. Per-skill what/where/why/when/how: `skills/INDEX_BY_CATEGORY.md`.

| Task | Skill to Load |
|---|---|
| Ken design decisions (any surface, any project) | `aura-design` |
| Strategy / wedge / competitive research | `ken-research` |
| Build a Ken page from intent | `/page <intent>` |
| Production HTML/CSS/JSX | `frontend-design` |
| Animation (state/component + scroll-driven) | Framer Motion ONLY (`useScroll` + `useTransform` + `useInView` + `useReducedMotion`) — GSAP/Lenis REMOVED 2026-05-08 dev-team parity |
| Smooth page scroll | native CSS `scroll-behavior: smooth` (DS `core-v2/styles/base.css`) |
| Test/QA a page | `webapp-testing` |
| Polish/critique/audit | `impeccable` (un-gated 2026-05-08, frontend `projects/*` only) |
| Large-repo intel | `graphify` (always-on for >50 files / >100k tokens) |
| Build new skill | `skill-creator` |

---

## Development Rule

When building any Ken page or component, import via `design-system/core-v2/` — never re-implement atoms inline (anti-pattern Cat 13.8). Token-only — no hex literals (anti-pattern Cat 1.1). Variant DEFAULT = editorial-light unless user explicit override or recipe override at top.

Quality target: **9.5/10** (Premium Cinematic Finish).
