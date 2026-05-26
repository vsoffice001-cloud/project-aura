# AI-CONSUMPTION-PROTOCOL · canonical "how AI consumes DS"
​​​‍​‌‍‌​‌‍​‍​‌​​‍​‌​​​‍​​‌‍‌​‍‌‍‌​​‍‍‌​‌‍‍‌​‍‌‍‌​‍‍‍‌​‍‌‍‌​​​​‍​‍​‍​‌‌​​‍​​​​‍​​‍‍‌​‌‍‍‌​‌​​‍​‌‍‌​‌​​‍​‌‌‍‌​‌‌​​‍​​‌‍‌​
**Date:** 2026-05-20
**Status:** AUTHORITATIVE · single source of truth for AI session boot · component picking · token usage
**Audience:** All AI sessions (Aura · subagents · external collaborators)
**Replaces:** scattered read-first ordering across 16 docs · single entry point
**Master rules:** (1) 4WH per decision · (2) TodoWrite decompose + gate

---

## 0 · QUICK START · session boot in 5 steps

```
1. Read CLAUDE.md (root · auto-loaded)
2. Read MEMORY.md (auto-loaded · ~/.claude/projects/.../memory/MEMORY.md)
3. Read THIS doc (AI-CONSUMPTION-PROTOCOL.md)
4. Classify task → route via CANONICAL-WORKFLOW.md scenarios
5. Execute · gate per master rule 2
```

**That's it.** Everything else loads on-demand from §1 tier map.

---

## 1 · Tier map · canonical paths · WHEN to load each

| Layer | Path | Load WHEN |
|---|---|---|
| Foundation (Tier 0) | `core-v2/styles/base.css` | Token decision · color · spacing · radius · motion |
| Atoms (Tier 1) | `core-v2/src/atoms/` + `<Name>.md` sidecar | Picking atom (Button · Badge · etc) |
| Molecules (Tier 2) | `core-v2/src/molecules/` + sidecars | Picking molecule (LabelHeadingPair · ChartCard · etc) |
| Organisms (Tier 3) | `core-v2/src/organisms/` + sidecars | Picking organism (Navbar · Footer · ScopeOfReport · etc) |
| Templates (Tier 4) | `core-v2/src/templates/` + sidecars | Section composition (ChapterSectionTemplate · etc) |
| Page recipes (Tier 5) | `design-system/recipes/` | Whole-page composition (v1-product-page.md · case-study.md · etc) |
| Hooks | `core-v2/src/hooks/` | Behavior (useScrollSpy · useReducedMotion · useDeferredRender) |

**Deep reference docs (load only when picking · NOT every session):**
- `core-v2/docs/CANONICAL-SOURCE-MAP.md` · which legacy file owns canonical pattern per component
- `core-v2/docs/TOKEN-GAP-REPORT.md` · 23 port refactor rules · token collisions
- `core-v2/docs/SPACING-COMPOSITION-LAYOUT-CANON.md` · composition recipes + spacing rules
- `core-v2/docs/GAPS.md` · DO NOT INVENT list (live-updated)
- `core-v2/docs/AI-PICKER-GUIDE.md` · decision tree (20 task→component mappings)
- `core-v2/docs/ANTI_PATTERNS.md` · 40+ rules
- `core-v2/docs/MASTER-PLAN.md` · Stage 3 plan (historical)
- `core-v2/docs/PORT-PLAN.md` · batched port roadmap (historical)
- `core-v2/docs/DS-AUDIT-2026-05-20.md` · plan-vs-delivery (historical)

---

## 2 · 5-step picker (every component decision)

```
STEP 1 · CLASSIFY task
  → atom / molecule / organism / template / page-recipe

STEP 2 · CHECK GAPS.md
  → listed MISSING? YES → port from CANONICAL-SOURCE-MAP first · do NOT invent
  → NO → continue

STEP 3 · CHECK core-v2/src/<tier>/index.ts
  → exported? YES → read sidecar `<Name>.md` · use per WHEN
  → NO → ADD to GAPS.md + port first

STEP 4 · CHECK SPACING-COMPOSITION-LAYOUT-CANON
  → apply spacing tokens · composition recipe · layout pattern for context

STEP 5 · CHECK ANTI-PATTERNS.md
  → verify no violation (brand-red discipline · wrong-token · gradient ban · etc)
```

**Anti-invention enforcement:** if any step fails · STOP · escalate · do NOT invent substitute.

---

## 3 · Token-first rule + port refactor rules (legacy → core-v2)

**Strategy:** core-v2 values WIN · legacy ports refactor to new names/values.

**Per-legacy port table (apply rule when porting legacy snippet):**

| Legacy V0.2 token | core-v2 mapping | Why |
|---|---|---|
| `--text-sm` (13px) | `--text-xs` (12.8px) OR `--text-13` | V0.2 13px ≠ core-v2 16px |
| `--text-base` (14px) | `--text-nav` / `--text-compact` (14px) | V0.2 14px ≠ core-v2 20px |
| `--text-lg` (18px) | `--text-md` (18px · new alias) | V0.2 18px ≠ core-v2 25px |
| `--text-xl` (20px) | `--text-base` (20px) | matches |
| `--text-2xl` (24px) | `--text-24` OR `--text-lg` (25px) | V0.2 24 ≠ core-v2 39 |
| `--text-3xl` (30px) | `--text-30` OR `--text-2xl` (39px) | V0.2 30 ≠ core-v2 49 |
| `--text-4xl` (32px) | `--text-32` OR `--text-2xl` (39px) | V0.2 32 ≠ core-v2 61 |
| `--radius-sm` (V0.2 2.5px) | `--radius-2xs` | V0.2 2.5 ≠ core-v2 10 |
| `--radius-md` (V0.2 10px) | `--radius-sm` (10px) | V0.2 10 ≠ core-v2 15 |
| `--radius-lg` (V0.2 16px) | `--radius-md` (15px) | closest |
| `--purple-500 #7f5fe3` | keep name · accept core-v2 `#9488ec` | hex shift OK |
| `--green-600 #16a34a` | keep name · accept core-v2 `#059669` | hex shift OK · AA contrast verified |
| `--red-600 #dc2626` (status) | REPLACE w/ `--rose-600` | avoid brand-red collision |
| `#171717` / `#737373` / `#525252` etc | `var(--black-900/-500/-600)` | tokenize hardcodes |
| `bg-warm-200` undefined Tailwind | `bg-[var(--warm-200)]` | V0.2 broken class |
| `leading-tight 1.25` (V0.2) | `leading-[1.25]` inline | `--leading-snug` is 1.3 in core-v2 (rule 22a) |
| `tracking-tight -0.025em` | `--tracking-display-tight` (-0.02em) | closest |
| V0.2 gradient buttons | `<Button variant="primary">` · DROP gradient | report-store canon |
| V0.2 FloatingCTA bottom-rising | DROP entirely | user explicit reject |

**Full 23-rule table:** `core-v2/docs/TOKEN-GAP-REPORT.md` §4.

---

## 4 · Composition rules (spacing · layout · cards · type pairing)

**Section composition default (ChapterSectionTemplate):**

```
SectionWrapper (bg=white|warm · spacing=lg · maxWidth=content)
  ↓
LabelHeadingPair (eyebrow + h2 + lede · mb-10 md:mb-12)
  ↓
content slot
  ↓ (optional)
CTA row (mt-8 md:mt-10)
```

**Spacing canon (most-used 12 values):**

```
Section padding:       py-12 md:py-20    (--section-py-lg)
Container max:         max-w-[1200px]    (--container-page)
Inner content max:     max-w-[1000px]    (--container-content)
Page horizontal pad:   px-4 sm:px-6 md:px-8
Section header bottom: mb-10 md:mb-12    (--section-header-mb)
Card padding:          p-4                (--card-padding-md)
Card grid gap:         gap-6              (default 3-col grid)
Stack tight:           space-y-2 (8px)
Stack default:         space-y-4 (16px)
Stack section block:   space-y-6 (24px)
Sticky TOC top:        top-[88px]
Bg alternation:        white / warm-300 OR white / black-50
```

**Bg alternation rhythm (DEFAULT):**
- Section 1: white
- Section 2: `var(--warm-300)` OR `var(--black-50)`
- Section 3: white
- (alternate)

**Z-ladder:**
- base 1 / dropdown 10 / sticky 100 / navbar 1000 / floating 1500 / modal-backdrop 9990 / modal 9999 / tooltip 10000

**Type pairing (most-used 5):**
- Eyebrow → Heading: `text-xs uppercase tracking-[var(--tracking-label-x-wide)]` → `font-serif font-light text-2xl leading-[1.1]`
- Heading → Lede: `font-serif font-light text-2xl` → `text-sm text-secondary leading-relaxed max-w-prose`
- Stat label-value: `text-xs text-secondary tracking-wide` over `font-serif font-light text-xl tabular-nums`
- CTA + Arrow: `font-medium text-nav tracking-[var(--tracking-button)]` + AnimatedArrow
- Card title + meta: `font-medium text-base leading-snug` → `text-xs text-secondary`

**Full library:** `core-v2/docs/SPACING-COMPOSITION-LAYOUT-CANON.md` §2.

---

## 5 · GAPS · DO NOT INVENT list (auto-synced from GAPS.md)

When porting · AI MUST check GAPS.md for current MISSING list. If component listed missing:
1. STOP — do NOT invent flat substitute
2. Port from `CANONICAL-SOURCE-MAP.md` (per-component canonical legacy source)
3. Mark GAPS.md entry `✅ PORTED YYYY-MM-DD` when done

**Categories of "DO NOT INVENT":**
- DO NOT use raw `<button>` w/ brand-red bg → use `<Button variant="primary">`
- DO NOT use raw `<div>` w/ border + rounded → use `<Card>`
- DO NOT use raw `<h2>` w/ font-serif manual → use `<SectionHeading level={2}>`
- DO NOT invent a substitute when DS organism missing (e.g., flat dl instead of ScopeOfReport)
- DO NOT rationalize regression in JSDoc ("NO cards" · "lean fork" · etc)

---

## 6 · ANTI-PATTERNS (40+ rules · top 15)

Live full list at `core-v2/docs/ANTI_PATTERNS.md`.

**Top 15 most-common violations:**

1. **No JSDoc rationalization phrases** ("NO cards" · "lean PDP-specific fork" · "stripped down")
2. **No invention when DS organism missing** · port first
3. **No re-implementing organism inline in section file** (consumer = thin wrapper)
4. **No legacy token names without verification** (V0.2 `--text-sm` ≠ core-v2 `--text-sm`)
5. **No `--radius-md` for 10px** · core-v2 `--radius-md = 15px` · use `--radius-sm` for 10px
6. **No `--radius-sm` for 2.5px** · use `--radius-2xs`
7. **No undefined Tailwind classes** (`bg-warm-200` doesn't exist · use `bg-[var(--warm-200)]`)
8. **No brand-red on neutral UI states** (TOC dot · FAQ chevron · scope bullet · etc · brand-red = CTA only)
9. **No body text smaller than 16px** (`--text-sm`)
10. **No `py-24 lg:py-32` for section padding** (V0.2 too tall · cap at `--section-py-xl` 64/96)
11. **No hardcoded horizontal padding** (`px-[84.375px]` V0.2 · use `px-4 sm:px-6 md:px-8`)
12. **No inline `style={{...}}` for tokens** · use Tailwind classes
13. **No rAF animation without `useReducedMotion()` guard**
14. **No Highcharts `accessibility.enabled: false`**
15. **No V0.2 buttons / V0_lite gradient buttons / FloatingCTA bottom-rising banner** (all outdated)

**Plus rule 38a · write sidecar `.md` IMMEDIATELY after .tsx (Write tool blocks late-batch .md writes)**
**Plus rule 38b · grep existing core-v2 BEFORE writing NEW file (duplicates caught after-the-fact 2× during Stage 3)**

**R1.2 exception (rule 19a)** · brand-red gradient bg ALLOWED only on dedicated CTA section organisms (e.g., ReportFinalCTASection) · approved list maintained in ANTI-PATTERNS.

---

## 7 · Master rules · 4WH + TodoWrite

**Rule 1 · 4WH discipline**
Every component/decision answers:
- WHAT · what does it do (1 sentence)
- WHY · why is it correct for this context
- WHEN · is this the right time to use it
- WHERE · which surface / section / page
- HOW · what props · what tokens · what a11y · what motion

If any answer is "I don't know" · STOP · escalate.

**Rule 2 · TodoWrite decomposition + gates**
- Any task >3 steps → TodoWrite plan first
- One `in_progress` at a time
- Mark complete IMMEDIATELY after finishing
- Gate between major sub-tasks (await user OR auto-mode default)

---

## 8 · Scenario routing (see CANONICAL-WORKFLOW.md)

| Scenario | Path |
|---|---|
| A · Build a Ken Research page | 9-step process · 2 hard gates · CANONICAL-WORKFLOW.md §A |
| B · Build a single component | 5-step picker · port-or-compose · §B |
| C · Fix a bug | Lite · diagnose → fix → verify · §C |
| D · Refactor / multi-file change | TodoWrite plan · agent if >15 files · §D |
| E · Quick answer / status | Ultra terse · 1-line · §E |
| F · Audit / pre-handover | 13-point checklist · aura-qa · §F |

Full workflow: `workflows/CANONICAL-WORKFLOW.md` (built in Phase 4).

---

## 9 · Quick-reference card (laminated)

```
┌──────────────────────────────────────────────────────────────┐
│  AI SESSION BOOT · 5 STEPS                                   │
│  1 · Read CLAUDE.md (auto)                                   │
│  2 · Read MEMORY.md (auto)                                   │
│  3 · Read AI-CONSUMPTION-PROTOCOL.md (this doc)              │
│  4 · Classify task → CANONICAL-WORKFLOW.md scenarios         │
│  5 · Execute w/ 4WH + TodoWrite gates                        │
│                                                              │
│  COMPONENT PICKING · 5 STEPS                                 │
│  1 · CLASSIFY (atom/molecule/organism/template/recipe)       │
│  2 · GAPS.md · listed missing? port FIRST                    │
│  3 · core-v2/src/<tier>/index.ts · exported?                 │
│  4 · SPACING-COMPOSITION-LAYOUT-CANON · spacing/comp/layout  │
│  5 · ANTI-PATTERNS.md · verify no violation                  │
│                                                              │
│  TOKEN PORT (legacy → core-v2)                               │
│  V0.2 --text-sm (13)  → --text-xs (12.8)                     │
│  V0.2 --text-base (14)→ --text-nav (14)                      │
│  V0.2 --text-lg (18)  → --text-md (18)                       │
│  V0.2 --radius-md(10) → --radius-sm (10)                     │
│  V0.2 hex hardcoded   → var(--black-X / --warm-X / etc)      │
│                                                              │
│  ALWAYS                                                      │
│  · Token-driven · ZERO hardcoded hex/px                      │
│  · Framer Motion ONLY · useReducedMotion() guard             │
│  · brand-red = CTA only · NEVER neutral states               │
│  · Body text ≥16px (--text-sm)                               │
│  · Sidecar .md IMMEDIATELY after .tsx                        │
│  · Grep existing BEFORE NEW file (no duplicates)             │
│  · 4WH per component · TodoWrite gates                       │
│                                                              │
│  NEVER                                                       │
│  · JSDoc rationalization phrases ("NO X" · "lean fork")      │
│  · Invent substitute when DS missing                         │
│  · Re-implement organism inline in section                   │
│  · Use V0.2 buttons / V0_lite gradient / FloatingCTA         │
│  · Highcharts accessibility.enabled: false                   │
│  · Inline style={{}} for tokens                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 10 · Done when

- [ ] User approves this doc
- [ ] CLAUDE.md (root) updated to reference this doc as entry point (Phase 6)
- [ ] Next AI session reads this · classifies task · routes via CANONICAL-WORKFLOW
- [ ] Deep reference docs (CANONICAL-SOURCE-MAP · TOKEN-GAP-REPORT etc) load on-demand only

---

**END · AI-CONSUMPTION-PROTOCOL.md**
**Next:** CANONICAL-WORKFLOW.md (Phase 4)
