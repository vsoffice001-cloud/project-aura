---
name: aura-craft
description: Ken Research craft layer. Synthesizes design intelligence (ui-ux-pro-max reasoning rules) + system memory (interface-design pattern persistence) + DESIGN.md vocabulary (awesome-claude-design). Invoked between COMPOSE (step 4) and SHOW FIRST CUT (step 5) in the canonical 8-step page-build process. Forces a craft-pass before any structural build ships.
version: 1.0.0
date: 2026-05-12
status: active
---
​​​‍​‌‍‌​‌‍​‍​‌​​‍​‌​​​‍​​‌‍‌​‍‌‍‌​​‍‍‌​‌‍‍‌​‍‌‍‌​‍‍‍‌​‍‌‍‌​​​​‍​‍​‍​‌‌​​‍​​​​‍​​‍‍‌​‌‍‍‌​‌​​‍​‌‍‌​‌​​‍​‌‌‍‌​‌‌​​‍​​‌‍‌​
# aura-craft — Ken Research Craft Skill

**Purpose:** Bridge between DS-atom-compliant scaffold (what aura-builder produces) and 9.5/10 cinematic finish (what Ken Research ships).

**Birth reason:** Build of reports-pdp-v2 on 2026-05-12 passed all 5 hard-ban greps + DS atom compliance + a11y semantics, but page lacked craft layer (no visual hierarchy tuning per section · no cinematic moments · no motion choreography · no editorial typography rhythm). Aura-builder + aura-qa caught nothing because they audit *structure*, not *craft*.

---

## Where this skill lives in 8-step process

```
1. INTAKE
2. RESEARCH (writes RESEARCH.md)
3. PROPOSE+BLOCK (3 LOCKS · DS atoms · spacing · grid · anti-patterns)
4. COMPOSE (aura-builder · DS-atom compliance · hard-ban greps = 0)
4.5 → CRAFT-PASS ← (this skill · injected 2026-05-12)
5. SHOW FIRST CUT (localhost URL · HARD GATE · user reviews)
6. PROPOSE QA
7. EXECUTE QA
8. EXIT
```

**Trigger phrases:** `craft-pass <project>` · `polish <surface>` · `cinematic finish <page>` · explicit step 4.5 entry from page-build chain.

---

## Knowledge sources synthesized

This skill compresses lessons from 3 open-source skill repos + Anthropic's webapp-testing skill:

| Source | License | What we kept | What we discarded |
|---|---|---|---|
| **[ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)** | MIT | Reasoning rules per product category · color palette logic w/ WCAG 3:1 adjustments · chart-type decision tree · UX guidelines (smooth-scroll · sticky-nav · animation duration · reduced-motion) | 67-style catalog (too generic) · 161 palettes (we have Ken brand tokens) · CLI installer · plugin marketplace registration |
| **[awesome-claude-design](https://github.com/VoltAgent/awesome-claude-design)** | MIT | DESIGN.md format · "token + rule + rationale in same file" principle · brand-vocabulary-as-source-of-truth pattern | 68 example design systems (Cursor, Vercel, Linear, etc. — not Ken) |
| **[interface-design](https://github.com/Dammyjay93/interface-design)** | MIT | System.md persistence · craft principles (depth/surfaces/spacing/borders) · pre-component design statement · pattern memory across sessions · interface-not-marketing distinction | Auto-load every-session behavior (we have CLAUDE.md auto-load) · borders-only depth dogma (Ken has multiple depth strategies) |
| **[anthropic/skills · webapp-testing](https://github.com/anthropics/skills)** | MIT (Anthropic) | Playwright + axe + Lighthouse harness wiring · accessibility regression patterns | (installed verbatim at `.agents/skills/webapp-testing/` — symlinked Claude Code) |

---

## The 7 craft principles (Ken Research version)

### 1. Visual hierarchy per section — not page-default

Every section gets explicit hierarchy decision before code:
- **Lead element** (what eye hits first · 1 per section)
- **Support elements** (2-4 max · clear visual weight reduction)
- **Body** (text · data · cards)
- **Micro** (captions · meta · timestamps)

NOT "all sections use SectionHeading + body text default". DECIDE per section.

### 2. Type rhythm tuned per content density

| Section type | Headline | Sub | Body | Caption |
|---|---|---|---|---|
| Hero | `--text-display` (~58px) | `--text-xl` 0.7 opacity | `--text-base` | `--text-xs` ALL CAPS |
| Content-dense (Definitions · Macro · Methodology) | `--text-2xl` | `--text-lg` | `--text-base` | `--text-xs` |
| Stat-dense (KeyStats · Forecast · Snapshot) | `--text-3xl` tabular-num | `--text-sm` | `--text-base` | `--text-card-micro` |
| Chart sections | `--text-2xl` | `--text-base` italic insight | `--text-sm` | `--text-xs` source |
| Final CTA | `--text-display` | `--text-xl` | `--text-base` | — |

DEFAULT scale = drift. EVERY section overrides intentionally.

### 3. Cinematic moments (Ken voice · research pillar)

Research pillar = analyst-led · evidence-first · structured. Cinematic moments DO NOT mean SaaS-glitz. They mean:

- **Hero scroll-into-view:** title fades up 24px · cockpit cards stagger 60ms · trust strip last (300ms delay)
- **Stat reveal:** `useAnimatedCounter` on numbers · 1.2s ease-out · only ONCE per scroll
- **Chart entrance:** Highcharts native entrance · disabled under reduced-motion · 800ms total
- **Section transitions:** none between sections (would distract from research reading). EXCEPT FinalCTA = full-bleed entrance.
- **Tabs:** content panel cross-fade 200ms · NEVER slide (jarring on long pages)
- **Drawer:** spring entrance (`useSpring` w/ stiffness 280, damping 30) · respect reduced-motion → instant render

### 4. Depth strategy (Ken Research = "subtle-shadows" per ifd taxonomy)

Cards use:
- `box-shadow: 0 1px 2px rgba(0,0,0,0.04)` default
- `0 4px 12px rgba(0,0,0,0.06)` on hover
- `0 8px 24px rgba(0,0,0,0.10)` on active drag (HorizontalScroll cards)
- `border: 1px solid var(--color-border-subtle)` always present (Cat 4 anti-pattern: never adjacent w/o border or shadow)

NEVER:
- Borders-only (too sterile for research-product-page · works for admin dashboards only)
- Layered-shadows (too SaaS-bro for research voice)
- Glassmorphism (anti-Ken — Cat 2.6 in ANTI_PATTERNS.md)

### 5. Motion budget per page

Total animation events visible per scroll = **max 3 simultaneous**, **max 8 across full page lifecycle**.

Page-build motion budget:
- Hero entrance (1 animation event · stagger counted as 1)
- Stat-strip count-up (1 event · all counters within strip = 1)
- Chart hydration entrance (1 event per chart · max 3 charts visible at once = 3)
- Reading progress bar (continuous · counts as 0)
- Sticky CTA section-aware swap (slot change · not animation · 0)
- Section reveals: NONE (would compete w/ research reading)

If a section needs motion to communicate (e.g., ValueChainStepper progressive reveal of stages), that's content-motion, allowed. Decorative motion = banned.

`useReducedMotion()` MUST disable ALL counters · chart entrances · spring drawers · stagger sequences. Static fallback renders content at final state instantly.

### 6. Adapter principle — data via props · not DS-internal (added Phase 3 2026-05-13)

DS organisms NEVER import consumer mock data. Pattern:

```tsx
// WRONG (consumer-coupled):
import { ANALYST_PICKS } from '@/app/components/data';
export function AnalystPicks() { return <>{ANALYST_PICKS.map(...)}</> }

// RIGHT (adapter):
import type { AnalystPick } from '../types';
export interface AnalystPicksProps { picks: AnalystPick[]; label?: string; }
export function AnalystPicks({ picks, label = 'Expert Insights' }: AnalystPicksProps) {
  return <>{picks.map(...)}</>
}
```

Static lookup tables (industry→icon map · region→flag map) lift to atoms · not data. Consumer state hooks (`useReportFilters`) stay in consumer · DS exports the TYPE shape only.

### 7. Section-by-section craft brief (before code)

aura-builder's old behavior: "render section X w/ DS atoms".
aura-craft mandate: "render section X w/:
- Lead element = [decision]
- Support = [decision]
- Type rhythm = [scale]
- Motion event = [yes/no · description]
- Depth = [shadow level]
- Mobile-first override = [if different from desktop]"

Decisions stated INLINE in section file as `// CRAFT:` comments OR exported `CRAFT` const at top. Aura-qa step 7 reads these to verify intent vs render.

---

## Invocation

### Manual
```
/aura-craft <project> [--section <name>]
```

Examples:
- `/aura-craft reports-pdp-v2` — full-page craft pass (37 sections)
- `/aura-craft reports-pdp-v2 --section ReportPDPHero` — single section
- `/aura-craft reports-pdp-v2 --critique` — read-only critique (no code edits)

### Auto (from 8-step process)
After aura-builder reports Wave N done · before announcing SHOW FIRST CUT to user · this skill auto-runs craft-pass on Wave N organisms.

If aura-craft finds issues, aura-builder is re-spawned w/ craft-pass deltas embedded in brief. Loop until aura-craft reports clean.

---

## Craft-pass workflow

1. **READ** target section file(s) · understand current render
2. **READ** RESEARCH.md from project root · understand intent
3. **CONSULT** ui-ux-pro-max reasoning rules at `skills/_external/ui-ux-pro-max-skill/` (NOT cloned · ref only) for:
   - Product category: "Market Intelligence Report PDP" → closest match = "B2B Service" + "Analytics Dashboard" hybrid
   - UI styles: Trust & Authority + Minimalism + Data-Dense
   - Color mood: Professional + Editorial · Ken Red CTA-only · accent purple/coral measured
   - Motion: Section transitions + Feature reveals · NOT scroll-triggered animations + parallax (PRD says no)
4. **APPLY** 6 craft principles section-by-section
5. **DECIDE** craft moves per section · log as `// CRAFT:` comments
6. **EDIT** files w/ craft updates (type scale · spacing · motion · depth · hierarchy)
7. **VERIFY** dev server still 200 · greps still 0
8. **REPORT** craft moves applied · sections touched · before/after diff summary

---

## DESIGN.md for Ken Research

This skill references `DESIGN.md` at `design-system/DESIGN.md` (created by this skill if absent). That file = Ken's brand vocabulary in DESIGN.md format (per awesome-claude-design pattern). Source of truth for craft decisions.

Init w/:
```bash
/aura-craft init-design-md
```

Creates `design-system/DESIGN.md` w/ Ken tokens + voice + cinematic-vs-editorial variant rationale + 6 craft principles + section-type defaults.

---

## Hard-ban additions (on top of aura-builder's 5)

aura-builder bans:
1. `<button` raw
2. `max-w-[` arbitrary
3. `text-[` arbitrary
4. `bg-[` arbitrary
5. `#[hex]` hardcoded

aura-craft additional bans:

6. **Section files w/o `// CRAFT:` decision comment OR exported `CRAFT` const** → fail (proves no craft decision made · pattern of just-using-defaults)
7. **More than 3 simultaneous motion events visible at scroll position** → fail (motion budget breach)
8. **Animation duration outside 150-400ms range** for micro-interactions → fail (PRD UX-guidelines L9 reference)
9. **Cards w/o depth (no border AND no shadow)** → fail (Cat 4 anti-pattern reference)
10. **Headline/body using same type token** → fail (visual hierarchy missing)
11. **Section using DS default type scale w/o intentional override comment** → fail (proves no per-section rhythm decision)
12. **`prefers-reduced-motion` query missing from any animated component** → fail (a11y · ui-ux-pro-max ux-guidelines L9)

**A11y-pattern bans (added 2026-05-13 · from reports-pdp-v2 v2b Lighthouse audit):**

13. **`aria-label` on `<div>` or `<span>` w/o `role` attribute** → fail (axe `aria-prohibited-attr`). Use `role="img"` for icon-only decorative containers · `role="button"` + `tabIndex={0}` for clickable.
14. **`aria-controls` pointing to target that doesn't exist in DOM** → fail (axe `aria-valid-attr-value`). When toggle is closed and content is conditionally rendered, conditionally set `aria-controls` only when target exists: `{...(open ? { 'aria-controls': id } : {})}`.
15. **`<dl>` containing sibling `<div>` w/ non-`<dt>/<dd>` content (e.g. metadata Badge row)** → fail (axe `definition-list`). Move siblings OUTSIDE the `<dl>`.
16. **SkipLink default `href="#main-content"` w/o matching element id in DOM** → fail (axe `skip-link`). Add aliased target: `<span id="main-content" aria-hidden="true" />` near `<main>` OR pass explicit `targetId` prop.

---

## Tools used

- Read existing section files
- Edit (NOT Write — preserve aura-builder's structural compliance)
- Bash for grep/curl smoke checks
- Reference (read-only) skills/_external/ui-ux-pro-max-skill/src/ui-ux-pro-max/data/*.csv
- Reference (read-only) design-system/DESIGN.md
- Cross-check against design-system/ANTI_PATTERNS.md categories 1-14

NEVER modifies `design-system/core-v2/*` · same rule as aura-builder.

---

## When NOT to invoke aura-craft

- Bug fixes (aura-mech or direct edit)
- DS atom additions (aura-design + builder)
- Token decisions (Aura main · Opus)
- Backend / non-frontend work
- ad-hoc polish where user explicitly says "no craft pass"

---

## Cross-references

- 8-step process w/ new step 4.5: `skills/aura-design/chains/page-build.md`
- Page-build memory enforcement: `feedback_page_build_process.md`
- Anti-patterns: `design-system/ANTI_PATTERNS.md` Cat 1-14
- Ken brand: `Quick_start_guide.md` + `design-system/DESIGN.md`
- aura-builder hard gates: `workflows/agents/aura-builder.md`
- aura-qa gates: `workflows/agents/aura-qa.md`
- External skills reference: `skills/_external/ui-ux-pro-max-skill/` · `skills/_external/interface-design/` · `skills/_external/awesome-claude-design/`
- Anthropic webapp-testing skill: `.agents/skills/webapp-testing/` (installed via `npx skills add` 2026-05-12)
