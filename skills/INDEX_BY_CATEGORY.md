# Skill Index — Active Set (post-prune 2026-05-08)

Single index for all active skills. What · Where · Why · When · How. Replaces split between `INDEX_BY_CATEGORY` + `SKILL_ROUTING` for active set.

**Active workspace (6):** `aura-design` · `ken-research` · `page` · `frontend-design` · `webapp-testing` · `skill-creator`. (`gsap-scrolltrigger` deleted 2026-05-08 — GSAP removed from stack for dev-team parity, Framer Motion handles all motion.)
**External (3, at `~/.claude/skills/` symlinked to `~/.agents/skills/`):** `graphify` · `caveman` · `impeccable`.

**Archived → DELETED 2026-05-08:** 73 skills removed from disk after 6 weeks of zero use. Recovery via fresh install (`npx skills add <repo>`) — full list captured in `docs/DECISIONS.md` 2026-05-08 ADR.

**Pair with:** `SKILL_ROUTING.md` (trigger phrase table) · `../workflows/ROUTING.md` (workflow → skill map) · `../CLAUDE.md` skill-routing table.

---

## Active workspace skills (7)

### 1. `aura-design` ★
| | |
|---|---|
| **What** | Ken Research design second-brain — 5 surfaces × 2 brand variants + anti-patterns + voice + recipe router |
| **Where** | `skills/aura-design/SKILL.md` + `surfaces/` + `anti-patterns.md` + `voice.md` |
| **Why** | Encodes ALL Ken-specific design judgment in one place. Recommendations are Ken-grounded w/ anti-pattern flags. NOT a generic UX skill |
| **When** | Any design decision · critique · build for Ken surfaces (Discovery / Report Store / Report Viewer / Dashboards / Engagement) or any `projects/*`. Recipe routing for `/page` builds. Triggers: "design X for Ken" · "critique this page" · "premium cinematic finish" · "is this on-brand" · "Aura design" |
| **How** | Auto-loads on Ken-design intent. Read `SKILL.md` → match surface → read matching `surfaces/<id>-<name>.md` (Phase 2 incomplete: only `03-report-viewer.md` exists). Cross-ref `anti-patterns.md` + `voice.md` |

### 2. `ken-research`
| | |
|---|---|
| **What** | Knowledge + strategy skill anchored in `strategy/` folder — competitive playbook, claim-guard, wedge protection |
| **Where** | `skills/ken-research/SKILL.md` + `references/` + `evals/` (iteration-1 benchmark 22/24 hard assertions) |
| **Why** | Encodes "verified > vibes" voice + sourcing discipline. Eval-tested for claim-guard + wedge protection on competitor-related questions |
| **When** | Anything about Ken company · competitors (IMARC/Mordor/Statista/CB Insights/Tracxn/Crunchbase/Grand View/MarketsandMarkets/Frost & Sullivan/Gartner/Forrester) · strategic wedge · positioning · claims · offices · "verified vs unverified" marketing language. Trigger proactively whenever conversation touches firm, strategy folder, or wedge-dependent design decisions |
| **How** | Auto-loads on Ken-/competitor-related intent. Reads `strategy/` files before substantive answers. Voice: Atlas (strategy partner, lead with point, cite sources inline) |

### 3. `page`
| | |
|---|---|
| **What** | Recipe-driven page builder — `/page <intent> [--variant=Y]` slash command |
| **Where** | `skills/page/SKILL.md` |
| **Why** | Round-trip page build = recipe load → DS compose → aura-builder → aura-qa. Replaces ad-hoc page builds. Wires DS recipes + agents in one user-invocable command |
| **When** | User types `/page <intent>` (e.g. `/page case-study`, `/page report-store-listing`) · "build me a [page-type] page" matching a recipe in `design-system/recipes/` |
| **How** | `/page <recipe-name> [--pillar=X] [--variant=Y] [--target=<project-path>]`. Reads matching recipe → composes → spawns aura-builder for code → aura-qa for verification |

### 4. `frontend-design`
| | |
|---|---|
| **What** | Production HTML/CSS/JSX patterns + idioms |
| **Where** | `skills/frontend-design/SKILL.md` |
| **Why** | Code-side companion to `aura-design` (decision side). Aura-builder uses it as reference when writing component/page code |
| **When** | Component/page build · refactor · code-level pattern decisions (semantic HTML, CSS arch, JSX composition) |
| **How** | Auto-loads inside `page-build` + `component-build` workflows step 3 (build phase). Sonnet `aura-builder` agent reads it during code generation |

### 5. `webapp-testing`
| | |
|---|---|
| **What** | Playwright local test harness + axe-playwright + Lighthouse via DevTools |
| **Where** | `skills/webapp-testing/SKILL.md` |
| **Why** | Real test harness — Aura cannot replace w/ judgment. Used by aura-qa agent for a11y / perf / visual / cross-device |
| **When** | Pre-handover gate (a11y axe pass, Lighthouse mobile, visual baseline) · any QA step in `bug-fix` / `motion-pass` / `component-build` workflows |
| **How** | Auto-loads inside aura-qa agent. Commands: `pnpm test` (Playwright + axe), Lighthouse via Bash + Chrome DevTools |

### 6. `skill-creator`
| | |
|---|---|
| **What** | Meta-skill for creating, improving, and evaluating other skills |
| **Where** | `skills/skill-creator/SKILL.md` |
| **Why** | Self-tooling. High-leverage when needed — used to author aura-design Phase 2 + future `framer-motion` skill |
| **When** | Need to build a new Ken-specific skill · evaluate existing skill quality · improve trigger phrases / examples / anti-patterns within a skill |
| **How** | Manual invoke. Reads target skill dir, proposes structure, writes `SKILL.md` + companion files. Run eval suite to validate trigger coverage |

---

## External skills (3) — installed at `~/.claude/skills/`

### 7. `graphify` (always-on for big repos)
| | |
|---|---|
| **What** | Build knowledge graph of arbitrary repo → query via CLI |
| **Where** | `~/.claude/skills/graphify/SKILL.md` + `~/.local/bin/graphify` binary |
| **Why** | Large-repo context queries. Scanning 100+ files naively burns tokens. Graph build once, then targeted queries |
| **When** | Repo >50 files OR query needs cross-file synthesis OR estimated >100k tokens to read naively. **Mandatory** at >100k tokens per CLAUDE.md graphify-rule |
| **How** | `graphify build <path>` → outputs `<path>/graphify-out/graph.json`. Then `graphify query "..."` for natural-language lookups |

### 8. `caveman` (always-on, output compression)
| | |
|---|---|
| **What** | Output-style hooks that drop articles/filler/pleasantries/hedging |
| **Where** | `~/.claude/skills/caveman/` + hooks at `~/.claude/hooks/` + config at `~/.config/caveman/config.json` |
| **Why** | Token economy. User preference (set 2026-04-29 default = full mode). Code/commits/security still write normal |
| **When** | Always-on by default. Levels: `lite` · `full` (current default) · `ultra`. Toggle: `/caveman lite\|full\|ultra`. Off: "stop caveman" / "normal mode" |
| **How** | Hook auto-applies to assistant text. No manual invoke. Auto-clarity drops mode for security warnings, irreversible action confirmations, multi-step sequences where fragment order risks misread |

### 9. `impeccable` (un-gated 2026-05-08)
| | |
|---|---|
| **What** | Frontend polish/critique/audit/animate/colorize/typeset/layout/live skill — 23 subcommands, 36 reference docs |
| **Where** | `~/.agents/skills/impeccable/` (canonical) + `~/.claude/skills/impeccable/` (symlink) |
| **Why** | Surgical polish surface — single-subcommand invocation w/ deep heuristics (visual hierarchy, IA, cognitive load, anti-pattern detection). Lower friction than building polish logic ad-hoc |
| **When** | Any frontend polish/critique/audit task on `projects/*`. Common subcommands: `polish`, `craft`, `audit`, `critique`, `animate`, `colorize`, `typeset`, `live` (browser HMR variant exploration). Localhost only for live-inject |
| **How** | `npx impeccable <subcmd> <target>`. Recommended first run per project: `/impeccable teach` → generates `PRODUCT.md` + `DESIGN.md` other subcommands consume. Wraps via `impeccable-polish` workflow when needed |

---

## Skill → workflow → agent map

| Workflow | Primary skills | Agent |
|---|---|---|
| `page-build` | `aura-design` · `page` · `frontend-design` · `webapp-testing` · optional `impeccable` (motion = Framer Motion docs ad-hoc) | `aura-builder` (build) · `aura-qa` (validate) |
| `component-build` | `aura-design` · `frontend-design` · `webapp-testing` | `aura-builder` · `aura-qa` |
| `design-exploration` | `aura-design` · `ken-research` (if competitor refs) | none (Opus main) · `Explore` for refs |
| `design-review` | `aura-design` · optional `impeccable critique` | none (Opus main) |
| `motion-pass` | `aura-design` (`decisions/motion-router.md`) · Framer Motion docs ad-hoc | `aura-builder` |
| `bug-fix` | none default · `webapp-testing` for verify | `aura-mech` (locked-scope) · `aura-builder` (stack-aware) · `aura-qa` (verify) |
| `pre-handover` | `aura-design` (recipe-conformance) · `webapp-testing` · `frontend-design` (cleanup) · optional `impeccable audit/critique` | `aura-builder` · `aura-qa` · `aura-mech` |
| `quick-answer` | none | none / `Explore` / `aura-mech` |
| `infra-change` | none | none (Opus main, no delegation) |
| `impeccable-polish` | `impeccable` · `aura-design` (brand cross-check) | none / `aura-builder` per scope |

---

## Restoration (post-delete 2026-05-08)

Archived skills no longer on disk. To restore any:
1. `npx skills add <repo>` (most are public — see `docs/DECISIONS.md` 2026-05-08 ADR for original sources)
2. Add row to active set above
3. Update `SKILL_ROUTING.md` + `CLAUDE.md` skill table

## External reference library
[`references/design-systems/`](../references/design-systems/) — 59 documented design systems (Linear, Stripe, Vercel, Figma, etc.) for inspiration. **Not a skill** — browse via filesystem when relevant.
