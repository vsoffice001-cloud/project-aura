# Skill Routing — Active Set (post-WORKFLOW-RESET 2026-05-20)

Read first before invoking any skill. Verbose copy archived: `_archive/SKILL_ROUTING.original.md.deprecated-2026-05-20`.

**Core rule:** load a SKILL.md only when task matches its trigger. Active set = **6 workspace + 4 external + 1 graphify + 1 caveman = 12 active** (2026-05-20 update: removed `skill-creator` · ARCHIVED). `_archive/` contains all superseded skills.

**Pair w/:** [INDEX_BY_CATEGORY.md](INDEX_BY_CATEGORY.md) (full what/where/why/when/how) · [../workflows/CANONICAL-WORKFLOW.md](../workflows/CANONICAL-WORKFLOW.md) (workflow → skill map · canonical 2026-05-20) · [../CLAUDE.md](../CLAUDE.md) skill-routing table · [../design-system/core-v2/docs/AI-CONSUMPTION-PROTOCOL.md](../design-system/core-v2/docs/AI-CONSUMPTION-PROTOCOL.md).

---

## Trigger → skill table

### Ken-design + research

| Trigger | Skill |
|---|---|
| Ken Research design (any surface, any project) · "design X for Ken" · "critique this page" · "premium cinematic finish" · "is this on-brand" | **`aura-design`** ★ |
| **Craft-pass** between COMPOSE (step 4) and SHOW FIRST CUT (step 5) · "polish this page" · "9.5/10 cinematic finish" · "section-by-section craft" · per-section design decisions (hierarchy/type/motion/depth) | **`aura-craft`** ★ (NEW 2026-05-12 · synthesizes ui-ux-pro-max + interface-design + awesome-claude-design) |
| Build Ken page from intent · `/page <recipe>` · "build me a [page-type] page" | **`page`** |
| Anything re Ken company / competitors (IMARC/Mordor/Statista/CB Insights/Tracxn/Crunchbase) / wedge / claims / positioning / strategy folder | **`ken-research`** |

### Build / code

| Trigger | Skill |
|---|---|
| Production HTML/CSS/JSX patterns | `frontend-design` |
| All motion (state · scroll-driven · parallax · timeline · entrance) | Framer Motion ONLY (`useScroll` · `useTransform` · `useInView` · `useReducedMotion` · `motion.*` · `AnimatePresence`) — no skill, read framer-motion docs ad-hoc. GSAP + Lenis REMOVED 2026-05-08. |

### QA

| Trigger | Skill |
|---|---|
| Local QA · Playwright · axe-playwright · Lighthouse · pre-handover gate | `webapp-testing` |

### Polish (un-gated)

| Trigger | Skill |
|---|---|
| Frontend polish/critique/audit · "polish this" · "/impeccable …" · subcommand intent | `impeccable` |

### Meta

| Trigger | Skill |
|---|---|
| Create/improve/eval a skill | `skill-creator` |
| Large-repo context query (>50 files / >100k tokens) | `graphify` (mandatory at >100k token threshold) |
| Output compression always-on | `caveman` (auto-applies via hooks) |

---

## `impeccable` — full usage (un-gated 2026-05-08)

External skill (`pbakaus/impeccable`). Installed at `~/.agents/skills/impeccable/` (canonical) + `~/.claude/skills/impeccable/` (symlink). 23 subcommands + 36 reference docs + scripts. Use freely on any in-scope frontend project.

**Subcommand routing:**
- **Polish surface** — `craft`, `shape`, `polish`, `delight`, `bolder`, `quieter`, `typeset`, `colorize`, `animate`, `layout`
- **Audit/critique** — `audit`, `critique`, `clarify`, `distill`, `optimize`, `teach`
- **Live iteration** — `live`, `overdrive` (browser HMR variant exploration, localhost only)
- **Doc gen** — `document`, `extract`, `onboard`, `harden`, `adapt`

**Recommended first run per project:** `/impeccable teach` — generates `PRODUCT.md` + `DESIGN.md` other subcommands consume.

**Scope limits:**
- Frontend `projects/*` only — never backend (`ken-research-backend/`), infra, prod URLs
- Live-inject: localhost only (no prod kenresearch.com)

**No confirm-per-change required.** Run subcommands directly. User can interrupt or revert via git.

---

## Decision tree

```
Ken design decision (color/layout/type/style/critique/recipe)?
  YES → aura-design (read SKILL.md first; surface + variant + recipe routing inside)

Ken page build w/ recipe?
  YES → /page <recipe> → page skill chains aura-design → frontend-design → aura-builder → aura-qa

Strategy / wedge / competitor question?
  YES → ken-research (reads strategy/ folder, voice = Atlas)

Animation?
  All motion (state · scroll · parallax · timeline) → Framer Motion · framer-motion docs ad-hoc · GSAP + Lenis REMOVED 2026-05-08

Polish / critique on shipped UI?
  YES → impeccable <subcmd> (un-gated, frontend projects/* only)

QA / test / Lighthouse?
  YES → webapp-testing (via aura-qa agent)

Large-repo cross-file question?
  YES → graphify build + query

Build new skill?
  YES → skill-creator

Else → write code/answer, no skill.
```

---

## Token rules

1. Pure code edit, no design call → NO skill load
2. Match-then-load — never load 2+ skills speculatively
3. `graphify` mandatory when reading would exceed 100k tokens (CLAUDE.md graphify-rule)
4. `caveman` always-on at hook level — no manual invoke
5. Layer when needed: e.g. animated Ken page → `aura-design` (decisions) → `page` (recipe) → Framer Motion (motion via docs ad-hoc). One per layer, never all-at-once.

---

## Active skill sizes (budget)

| Skill | Size | Note |
|---|---|---|
| `aura-design` (workspace) | ~12KB SKILL + surfaces | Read SKILL.md first, surface file second on demand |
| `ken-research` (workspace) | ~10KB SKILL | Reads `strategy/` files lazily |
| `page` (workspace) | ~6KB | Slash-command surface |
| `frontend-design` (workspace) | ~8KB | Code patterns reference |
| `webapp-testing` (workspace) | ~5KB | Playwright harness |
| `skill-creator` (workspace) | ~3KB | Meta tooling |
| `impeccable` (external) | 14KB SKILL + 36 ref docs | Subcommand-scoped, no full read needed |
| `graphify` (external) | small SKILL.md | CLI-driven |
| `caveman` (external) | hook-level | No SKILL read needed |

---

## Archived → DELETED (73 skills, 838 MB recovered)

Removed from disk 2026-05-08 after 6 weeks zero-use. Recovery via fresh install (`npx skills add <repo>`) — full list + ADR rationale at `docs/DECISIONS.md` 2026-05-08 entry.
