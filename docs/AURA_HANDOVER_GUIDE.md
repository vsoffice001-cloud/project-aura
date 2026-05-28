# Aura Handover Guide

Simple onboarding for new team members working with Aura.

---

## What is Aura

Designer-buddy AI for Ken Research frontend. Runs in Claude Code CLI. Brain = Opus 4.7 · spawns Sonnet/Haiku subagents for cheaper work. Built by Vishal Singh Chauhan on top of Claude.

---

## Day 1 · Setup

```
1. Clone workspace → cd Anti-folder01
2. nvm use              # Node 20.20.1
3. pnpm install
4. Open Claude Code → workspace auto-loads CLAUDE.md
5. Test run: ./run.sh design   # DS on :5173
```

---

## How Aura works · 60-second model

| Layer | Role |
|---|---|
| **Opus main** (Aura) | Brain · judgment · routing · design decisions |
| **Sonnet** (`aura-builder` / `aura-qa`) | Builds + validates 5-15 files |
| **Haiku** (`aura-mech`) | Mechanical edits ≤3 files |
| **Explore** | Read-only search |
| **Plan** | Research → plan only |

Every task → Aura scans memory + docs + refs → picks scenario (page-build · component · bug · refactor · quick · audit) → emits `→ Route:` marker → executes.

---

## Files you must know

| File | Purpose |
|---|---|
| `CLAUDE.md` | Auto-loaded every session · source of truth |
| `Quick_start_guide.md` | Brand tokens (Ken red · Noto Serif · DM Sans · variants) |
| `MEMORY.md` | Persistent memory · top entries auto-loaded |
| `workflows/CANONICAL-WORKFLOW.md` | 6 scenarios · routing rules |
| `design-system/core-v2/docs/AI-CONSUMPTION-PROTOCOL.md` | DS usage rules for AI |
| `skills/SKILL_ROUTING.md` | 12 active skills · when to use which |
| `HANDOVER_TRACKER.md` | Per-project status (exploring → handed-over) |
| `docs/LEARNINGS.md` + `docs/DECISIONS.md` | Running log |
| `docs/CHANGELOG.md` | Infra changes |

---

## How to talk to Aura

**Good prompt:**
- Goal + constraint + ref
- E.g. "Build product page hero · cinematic-dark · match attached screenshot · mock data fine"

**Bad prompt:**
- "Make it pretty" · "fix everything" · "do the thing"

**Tone:** caveman-full default. Say `stop caveman` or `normal mode` for full prose. `/caveman lite|full|ultra` switches level.

---

## Hard rules · DO NOT BREAK

1. **Localhost only** · no git push · no PR open · no deploy
2. **No prod touch** · never hit kenresearch.com · AWS · prod DB
3. **Tokens only** · zero hardcoded values · all from `core-v2/styles/base.css`
4. **DS atoms only** · never re-implement from `core-v2/`
5. **Framer Motion only** · no GSAP · no Lenis
6. **Reduced-motion mandatory** · `useReducedMotion()` everywhere
7. **9.5/10 cinematic bar** · no "internal-only" excuses
8. **Handed-over project = read-only** · new iteration = `<name>-v<n+1>/`

---

## 9-step page build (memorize)

INTAKE → RESEARCH → PROPOSE+BLOCK → COMPOSE → **CRAFT-PASS** → SHOW FIRST CUT → PROPOSE QA → EXECUTE QA → EXIT

Gates:
- Never spawn `aura-builder` without user OK
- Never auto-spawn `aura-qa`
- Always run `aura-craft` before SHOW FIRST CUT

---

## Pre-task scan (mandatory · every task)

Aura runs this before any code. Verify trace marker fires:

1. MEMORY.md top 8 ★
2. Project `docs/`
3. Refs already-mined (no re-fetch)
4. `skills/SKILL_ROUTING.md`
5. `grep` existing `core-v2/` code

Marker: `→ Pre-task scan: <files>`

---

## Trace markers · how to audit Aura

Every action emits `→` line. If missing · pipeline didn't fire · push back.

| Marker | Meaning |
|---|---|
| `→ Route: <scenario>` | Task classified |
| `→ Pre-task scan: <files>` | Scan ran |
| `→ Step N` | In-flight step |
| `→ Spawn: <agent>` | Subagent spawned |
| `→ Return: <agent>` | Subagent done |
| `→ Log: <file>` | Log entry written |
| `→ Check: <thing>` | Verification ran |
| `→ Exit: <task>` | Task done |

---

## Run commands

```bash
./run.sh design        # DS core-v2 :5173
./run.sh tokens        # Build Style Dictionary tokens
./run.sh backend       # Django :8000
cd projects/<name> && pnpm dev   # Consumer projects
```

---

## When projects move design → tech

1. Status in `HANDOVER_TRACKER.md` flips `cleanup → ready-for-tech`
2. 13-point pre-handover checklist passes (lint · build · a11y · perf · mock-data · docs)
3. `aura-qa` Sonnet verifies each
4. Tech owns post-handover · design folder freezes

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Aura skipping pre-task scan | Tell it: "re-run with pre-task scan" |
| Wrong subagent spawned | Check `workflows/CANONICAL-WORKFLOW.md` routing |
| DS class not compiling | Verify Tailwind `@source` path in consumer `globals.css` |
| Memory bloated | Check `MEMORY.md` size · entries should be 1 line <200 chars |
| Stale memory | Tell Aura "forget X" or update file directly |

---

## Where memory lives

`/Users/<user>/.claude/projects/-Users-<user>-Downloads-Anti-folder01/memory/`

User-scoped · per-workspace · persists across sessions. Edit directly or tell Aura to update.

---

## First-week checklist for new team member

- [ ] Read this guide
- [ ] Read `CLAUDE.md` + `Quick_start_guide.md`
- [ ] Boot Claude Code · verify Aura responds w/ trace markers
- [ ] Run `./run.sh design` · poke `core-v2/` showcase
- [ ] Read `HANDOVER_TRACKER.md` · see active projects
- [ ] Try small task: "Aura · find where KEN_CHART_SERIES is defined" (tests Explore agent)
- [ ] Try medium task: "Aura · fix typo in <file>" (tests Haiku mech)
- [ ] Read last 5 `docs/LEARNINGS.md` entries

---

_Last updated: 2026-05-27_
