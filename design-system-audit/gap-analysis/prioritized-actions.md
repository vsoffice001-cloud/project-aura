# Prioritized Actions · Closing the OG / industry / core-v2 Gap

**Date:** 2026-05-14
**Pair w/:** [`og-vs-core-v2.md`](./og-vs-core-v2.md) · [`og-vs-industry.md`](./og-vs-industry.md)
**Audience:** design@kenresearch.com (Aura) · tech-team intake post-handover

---

## Reading guide

- **P0** = must do BEFORE any new page build (block-list)
- **P1** = should do in next 2 weeks (Sprint 1)
- **P2** = nice-to-have / future (Sprint 2+)

Each item: source · layer · effort (h/d/w) · impact · linked finding.

Effort scale:
- **30m–2h** = single-file edit · low risk
- **half-day (4h)** = multi-file refactor · medium risk
- **1 day (8h)** = cross-cutting · token + atom + doc
- **2-3 days** = restructure (layer change, schema migration)
- **1 week** = major addition (data-table primitive, density system)

---

## Decision matrix (45 actions)

| # | Action | Source | Layer | Effort | Impact | Priority |
|---|---|---|---|---|---|---|
| 1 | Fix Button `secondary` variant — 1.13:1 contrast WCAG fail on light bg (collapse to outline variant w/ ≥3:1 currentColor border) | worked-examples/v0-lite-legacy | atom | 1h | HIGH | **P0** |
| 2 | Fix Card padding spec drift — `padding="md"` is 24px in core-v2 vs 16px in OG (regression) | core-v2 vs OG | atom | 30m | HIGH | **P0** |
| 3 | Restore Card hover easing — replace `transition-all duration-300` w/ `cubic-bezier(0.16,1,0.3,1)` 400ms tokens | core-v2 vs OG | token + atom | 1h | HIGH | **P0** |
| 4 | Restore `--shadow-xl` + `--shadow-2xl` neutral tokens (modal/drawer/overlay) | core-v2 vs OG | token | 30m | HIGH | **P0** |
| 5 | Port OG `ai-context/CORE.md` (92-5-3 constitution) to `core-v2/docs/CORE.md` verbatim | OG | doc | 2h | HIGH | **P0** |
| 6 | Port OG `ai-context/COLORS.md` (color discipline rules) to `core-v2/docs/COLORS.md` | OG | doc | 2h | HIGH | **P0** |
| 7 | Port OG `ai-context/TYPOGRAPHY.md` (MT scale + pairing rules) to `core-v2/docs/TYPOGRAPHY.md` | OG | doc | 1h | HIGH | **P0** |
| 8 | Port OG `ai-context/COMPONENTS.md` (Button vs CTALink vs InlineLink decision tree · showArrow rules) to `core-v2/docs/COMPONENTS.md` | OG | doc | 2h | HIGH | **P0** |
| 9 | Port OG `QUICK_START_PROMPT.md` (agent onboarding) to `core-v2/docs/QUICK_START.md` | OG | doc | 1h | HIGH | **P0** |
| 10 | Restore `--text-card-micro` (10px) + `--text-compact` + `--text-nav` semantic tokens · verify in tokens.css | OG | token | 1h | MEDIUM-HIGH | **P0** |
| 11 | Audit + document any LOST token (black-tint ladder · label-on-{black,white} · text-primary/secondary) | OG | token | 2h | MEDIUM | **P0** |
| 12 | Fix Card padding regression in every Card consumer (ReportCard, StatCard, EmptyState, SkeletonCard, etc.) — verify 16px renders | core-v2 | molecules | 2h | HIGH | **P0** |
| 13 | Fix `iconColors.ts` 4-class extension (`content / utility / state / brand`) | industry (Carbon) | atom util | 1h | MEDIUM | **P1** |
| 14 | Add `'use client'` audit pass — verify every interactive atom has directive · update HANDOVER.md table | core-v2 | atoms | 2h | HIGH | **P1** |
| 15 | Refactor Button to remove `background` prop coupling — use `data-variant-section` CSS-property scoping | worked-examples/v0-lite-legacy J2 | atom + tokens | 4h | MEDIUM | **P1** |
| 16 | Lift Button brand-button shadow `rgba(176,31,36,0.25)` to `--shadow-brand-button-hover` token | OG + core-v2 | token + atom | 30m | LOW-MEDIUM | **P1** |
| 17 | Remove Button coral-50 shimmer on light secondary (invisible-by-construction · dead code) | worked-examples/v0-lite-legacy J3 | atom | 30m | LOW | **P1** |
| 18 | Verify + fix CTALink `onClick` destructured into `<a>` (OG bug) | core-v2 | atom | 30m | LOW-MEDIUM | **P1** |
| 19 | Verify + fix InlineLink `#b01f24` literal → `var(--brand-red)` | core-v2 | atom | 15m | LOW | **P1** |
| 20 | Add `prefers-reduced-motion` to AnimatedArrow + Card hover + Navbar transitions | OG audit gap | atoms | 2h | MEDIUM | **P1** |
| 21 | Add `aria-hidden="true"` to AnimatedArrow decorative SVG layers | OG audit gap | atom | 15m | LOW-MEDIUM | **P1** |
| 22 | Add `role="progressbar"` + `aria-valuenow` to ReadingProgressBar + ScrollProgress | OG audit gap | atoms | 30m | MEDIUM | **P1** |
| 23 | Verify ContactModal uses `useFocusTrap` hook (was OG defect) | OG audit gap + core-v2 hook | atom | 1h | HIGH | **P1** |
| 24 | Add focus-visible ring to FilterChip X button | OG audit gap | atom | 15m | LOW | **P1** |
| 25 | Restore Badge convenience wrappers (StepPill, ObjectivePill, etc.) — 6-8 wrappers per OG | core-v2 vs OG | atom | half-day | MEDIUM | **P1** |
| 26 | Expand atom JSDoc 4WH blocks to 22+ lines (WHY · WHAT · WHEN · WHEN NOT · HOW · decisions log) per OG depth | OG vs core-v2 | docs (inline) | 2 days | HIGH | **P1** |
| 27 | Port OG `LAYOUT.md` to `core-v2/docs/LAYOUT.md` (recipe sequences · bg alternation · container hierarchy) | OG | doc | 2h | MEDIUM | **P1** |
| 28 | Restructure tokens to 3-tier (ref → sys → comp) per Material 3 / Spectrum / Atlassian | industry | tokens | 2 days | HIGH | **P1** |
| 29 | Add paired role tokens (`--color-on-primary`, `--color-on-surface-cinematic`, `--color-on-surface-editorial`, `--color-on-warm`, `--color-on-brand-red`) | industry (Material 3, Spectrum) | tokens | 1 day | HIGH | **P1** |
| 30 | Ship `voice.md` from synthesized voice-brand.md (canonical CTA library + headline patterns + microcopy + anti-patterns) | OG audit synthesis + Polaris | doc | 1 day | MEDIUM-HIGH | **P1** |
| 31 | Add status badges (alpha/beta/stable/deprecated) to every WWWWH atom doc front-matter + COMPONENT_REFERENCE.md table | industry (Atlassian, Primer) | docs | 4h | MEDIUM | **P1** |
| 32 | Add WCAG-SC citation per atom (2.1.1, 2.4.7, 2.5.5, 1.4.3, etc.) | industry (Lightning SLDS) | docs | 1 day | MEDIUM | **P1** |
| 33 | Wire `webapp-testing` skill into core-v2 build (axe + Lighthouse + Playwright) | workspace already installed (CLAUDE.md) | infra | half-day | HIGH | **P1** |
| 34 | Audit + dedupe shadcn primitives — remove unused (per shadcn-ui.md L976) | industry (shadcn) | infra | 4h | MEDIUM | **P1** |
| 35 | Add anatomy diagrams + token-name labels to each atom WWWWH doc (start w/ Button + Card + Badge + SectionHeading) | industry (Spectrum, Material 3) | docs | 1 week | HIGH | **P2** |
| 36 | Add decision-tree pages (`cta-picker.md` · `card-vs-section-wrapper.md` · `badge-vs-chip.md`) under `core-v2/docs/decisions/` | industry (Spectrum, Atlassian) | docs | 2 days | MEDIUM | **P2** |
| 37 | Add `data-density="compact|regular|spacious"` ancestor system + token swap | industry (Carbon, Spectrum) | tokens + atoms | 1 week | MEDIUM | **P2** |
| 38 | Add surface-layer model (`--surface-1` through `--surface-4`) for cinematic-dark | industry (Material 3) | tokens | 2 days | MEDIUM | **P2** |
| 39 | Consolidate StatCard + DataHighlightCard into shared `BigNumber` atom/molecule | industry (Spectrum) | molecules | 4h | LOW-MEDIUM | **P2** |
| 40 | Plan + ship DataTable molecule with state hooks (sort/filter/select/pagination) per SLDS depth | industry (SLDS, Carbon, Polaris) | molecule + hooks | 1 week+ | LOW (until analyst dashboard ships) | **P2** |
| 41 | Add mobile-behavior subsection to WWWWH methodology + retrofit existing atom docs | industry (Polaris) | methodology + docs | 2 days | MEDIUM | **P2** |
| 42 | Template `docs/RFC-template.md` + use for next major DS change | industry (Atlassian, Carbon) | infra | 2h | LOW | **P2** |
| 43 | Plan per-component CHANGELOG (defer until atoms split into packages) | industry (Atlassian, Polaris) | infra | n/a | LOW | **P2** |
| 44 | Build/maintain Storybook stories for 28 Phase 2-3 organisms (deferred per HANDOVER.md L111) | core-v2 known issue | docs | 1 week | MEDIUM | **P2** |
| 45 | Refactor Button to absorb V0-lite-legacy J9 — responsive size API `<Button size={{ base:'sm', sm:'md', md:'lg' }} />` (replaces triple-render) | worked-examples/v0-lite-legacy M (modify) | atom | 4h | LOW | **P2** |

---

## Bucketed action lists

### P0 — must do BEFORE any new page build (block-list)

**11 items · estimated 12-16 hours · one focused day**

1. **Fix Button `secondary` variant contrast (#1)** — 1h
2. **Fix Card padding spec drift (#2 + #12)** — 2.5h (atom + consumer audit)
3. **Restore Card hover easing (#3)** — 1h
4. **Restore `--shadow-xl` + `--shadow-2xl` (#4)** — 30m
5. **Port `ai-context/CORE.md` → core-v2 (#5)** — 2h
6. **Port `ai-context/COLORS.md` → core-v2 (#6)** — 2h
7. **Port `ai-context/TYPOGRAPHY.md` → core-v2 (#7)** — 1h
8. **Port `ai-context/COMPONENTS.md` decision tree (#8)** — 2h
9. **Port `QUICK_START_PROMPT.md` → core-v2 (#9)** — 1h
10. **Restore `--text-card-micro`/`-compact`/`-nav` (#10)** — 1h
11. **Audit + document any other lost token (#11)** — 2h

**Why these block new page builds:**
- Items 1 + 2 = visual + a11y regressions that ship to every consumer page. Building new pages compounds the regression.
- Items 5-9 = without OG ai-context docs, no agent can produce on-brand work first-try. Every page-build will drift.
- Items 3, 4, 10, 11 = token-level gaps that surface at the molecule/organism layer; faster to fix at source.

**Suggested sequence within P0:**
- Day 1 Morning: items 1-4 (visual fixes · low-risk atom edits)
- Day 1 Afternoon: items 5-9 (doc ports · cut-and-paste-then-refactor)
- Day 1 Evening: items 10-11 (token audit)

---

### P1 — Sprint 1 (next 2 weeks · ~40 hours · 5 working days)

**22 items · 35-45 hours**

Group by theme for parallelization:

**A · Atom-level a11y + token cleanup (10h):**
- #13 4-class iconColors
- #14 use-client audit
- #15 Button background prop refactor (half-day)
- #16 brand-button shadow → token
- #17 remove dead coral-50 shimmer
- #18 CTALink onClick fix
- #19 InlineLink hex→token
- #20 reduced-motion across atoms
- #21 AnimatedArrow aria-hidden
- #22 ReadingProgressBar/ScrollProgress a11y
- #23 ContactModal focus-trap verify
- #24 FilterChip focus-ring

**B · Token architecture upgrade (3 days):**
- #28 3-tier token restructure (2 days)
- #29 paired role tokens (1 day)

**C · Documentation depth restoration (3 days):**
- #25 Badge convenience wrappers (half-day)
- #26 expand atom JSDoc 4WH (2 days · highest impact)
- #27 port LAYOUT.md (2h)
- #30 ship voice.md (1 day)
- #31 component lifecycle badges (4h)
- #32 WCAG SC citations (1 day)

**D · Infra (1 day):**
- #33 wire webapp-testing CI (half-day)
- #34 shadcn dedupe (half-day)

**Critical path for P1:**
- #28 + #29 (token refactor) MUST come before #15 (Button bg refactor) — Button consumes the new tokens.
- #26 (JSDoc 4WH expansion) is highest-impact long-running task; start day 1, run in parallel.
- #33 (CI) unblocks all future testing; do early.

---

### P2 — Sprint 2+ (nice-to-have / future · variable timing)

**11 items · 4-6 weeks aggregate**

Strategic adoption — none of these block production:

- #35 Anatomy diagrams (1 week · highest learning value)
- #36 Decision-tree pages (2 days)
- #37 Density vocabulary (1 week · trigger when analyst dashboard scopes)
- #38 Surface-layer model (2 days · trigger when cinematic-dark elevations drift)
- #39 BigNumber atom (4h)
- #40 DataTable molecule (1+ week · defer until consumer needs)
- #41 Mobile-behavior subsection (2 days)
- #42 RFC template (2h)
- #43 Per-component CHANGELOG (defer)
- #44 Storybook stories (1 week · low marginal value vs live consumer apps)
- #45 Responsive size API (4h)

---

## Total effort estimate

| Bucket | Hours | Days | Weeks (5 hr/day if FT) |
|---|---|---|---|
| **P0 — block-list** | 12-16h | 1.5-2 days | 0.4 wk |
| **P1 — Sprint 1** | 35-45h | 4.5-5.5 days | 1.2 wk |
| **P2 — Sprint 2+** | 80-120h | 10-15 days | 2-3 wk |
| **Grand total** | **127-181h** | **16-22 days** | **3.5-4.5 wk** |

If executed by Aura main thread (Opus reasoning + Sonnet build delegates per workspace routing), full close-out is **~4 working weeks**. If only P0+P1 (which is what closes most page-build risk), **~7 working days**.

---

## Recommended sequencing

### Week 1 · P0 close-out + start P1 token work

**Day 1 (P0):** All 11 P0 items · ~12-16h · ONE FOCUSED DAY.

**Day 2-3 (P1 token):**
- #28 token 3-tier restructure
- #29 paired role tokens
- #33 wire webapp-testing CI (parallel)

**Day 4-5 (P1 atoms · parallel w/ ongoing #26):**
- #13-24 atom-level a11y + cleanup
- #25 Badge convenience wrappers
- #34 shadcn dedupe
- BEGIN #26 atom JSDoc expansion

### Week 2 · P1 docs + finish atoms

**Day 6-7:**
- #26 continue JSDoc expansion (cross-cutting · 2 days)
- #27 port LAYOUT.md
- #30 ship voice.md

**Day 8-9:**
- #15 Button background refactor (depends on #28 + #29 done)
- #31 lifecycle badges
- #32 WCAG SC citations

**Day 10:** P1 verification pass — run CI · check all consumers · close known issues in HANDOVER.md.

### Week 3-4 · P2 strategic adoptions

- #35 anatomy diagrams (week 3)
- #36 decision-tree pages (week 4)
- #37-45 as needed, in priority order

---

## Decision tree: "Fix new DS by porting OG intent" vs "Drop new DS · use OG w/ Next port"

### Argument FOR "drop new DS · just port OG to Next 15"

**Pros:**
- OG is 5/5 design intent. core-v2 already lost 60-70% of intent in the port. Restarting from OG seems efficient.
- OG has 165 files of working code with full WWWWH rationale baked in. Less to re-write.
- No risk of compounding port defects (Card padding drift, Button secondary contrast bug, dropped tokens).
- Eliminates `core-v2/` as an audit-gap surface entirely.

**Cons:**
- OG is Vite/React 18 with **zero `'use client'` directives**. Every atom needs to be re-marked. Effort = ~2 weeks across 165 files.
- OG has dual tokens.ts + theme.css that drift. Must collapse to Style Dictionary v4 anyway.
- OG ships 76 flat-folder components — must restructure into atoms/molecules/organisms anyway. Time = ~1 week.
- OG uses `figma:asset/` imports + `@mui/material` + `@phosphor-icons/react` dead deps. Must clean. ~1 week.
- OG has 46 shadcn UI primitives that are partially unused. Dedupe pass. ~half-week.
- OG has Card a11y bug, ContactModal focus-trap missing, AnimatedArrow reduced-motion gap. Need to fix anyway. ~1 day.
- OG has Button secondary 1.13:1 contrast bug — same fix needed regardless of source.
- core-v2's Phase 3 adapter pattern (Report Store organisms props-driven) is NEW WORK that OG lacks. Would have to re-do.
- core-v2's 23 hooks (8 new vs OG's 15) are NEW WORK. Re-do.
- core-v2's Card a11y fix is a NEW IMPROVEMENT. Re-do.

**Total restart cost:** ~5-7 weeks of port + cleanup + new-work re-doing.

### Argument FOR "fix new DS by porting OG intent"

**Pros:**
- core-v2 already done all the structure work (atoms/molecules/organisms split · `'use client'` · DTCG tokens · Style Dictionary · adapter pattern · 23-hook DS surface · 46 shadcn integration · Anti-patterns consolidation).
- Most of OG's lost intent can be RESTORED by porting docs + restoring tokens. ~3 days.
- Most of OG's design bugs (Card a11y, Button bg coupling) are FIXED in core-v2 or can be FIXED w/ atom-level edits. ~1-2 days.
- Card padding regression + Button secondary bug are 2-hour fixes.
- Documentation gaps fill with cut-paste from OG `ai-context/*.md`. ~1 day.
- No restructuring penalty — keep core-v2's folder hierarchy.
- Industry-research adoptions (3-tier tokens, paired roles, density, etc.) drop in incrementally.

**Total fix cost:** P0 (1-2 days) + P1 (1 week) + P2 (2-3 weeks · optional) = **2 weeks gets you 90% of the way.**

**Cons:**
- Some core-v2 ports may have hidden defects beyond the audited atoms (Button + Card + a couple others). Need ongoing verification.
- Documentation depth restoration is human-write-heavy (atom JSDoc expansion = 2 days).

**Total fix cost vs restart cost:** Fix is ~3-4× faster · ~80% of value · zero restart-risk.

### WINNER: Fix new DS by porting OG intent

**Reasoning:**

1. **Sunk-cost is not a fallacy here — it's leveraged value.** core-v2 has done the irreversible architectural work (3-tier folder split · DTCG · RSC compat · adapter pattern · 23 hooks · shadcn integration). Re-porting OG would require re-doing all of that ~5-7 weeks of work that's already done. Net cost = 5-7 weeks vs 2 weeks.

2. **OG itself has known defects (Card a11y, Button secondary contrast, brand-button shadow inline, ContactModal focus-trap missing).** Re-porting OG would just re-introduce these defects. core-v2 has fixed some of them. Net safety > restart.

3. **Documentation depth is fixable in core-v2 at ~3 days cost.** Just cut-paste OG ai-context/*.md verbatim into core-v2/docs/. The hard work was OG's authoring, not the location.

4. **Industry-adoption layer (3-tier tokens, paired roles, density, anatomy diagrams) was always going to be NEW work post-port.** It's not lost by keeping core-v2. Same effort either path.

5. **core-v2 ships RSC-safe atoms w/ adapter pattern — this is industry-state-of-the-art (Atlassian, Carbon, Material 3 all converging on similar shape).** Throwing this away to restart Vite/React 18 + manual port = move backward.

6. **The audit project (this folder) RESTORES the lost rationale.** Path forward = port `og-audit/*.md` + `worked-examples/*.md` + `industry-research/*.md` synthesis into `core-v2/docs/`. Approx 1-day mechanical paste-and-edit pass.

**Final recommendation:** **Fix new DS · port OG intent verbatim into `core-v2/docs/`.** Execute P0 list immediately (1-2 days). Run P1 over Sprint 1 (1 week). Defer P2 strategic adoptions per consumer-driven priority.

---

## Bonus · Sequencing reasons + cross-cuts

### Why P0 is gated as a block-list

Every P0 item is either:
- A **visible visual regression** that ships to consumers when they build new pages (Button #1, Card #2-3, Card consumers #12).
- A **design discipline gap** that means agents/designers can't produce on-brand work first-try (#5-9 ai-context docs).
- A **token-level loss** that compounds at higher layers (#4, #10, #11).

Building a new page with P0 unresolved means re-fixing it across N files when the bug surfaces. Build cost expands. P0 fixes once, at the source.

### Why P1 trio (#28 + #29 + #26) is the long pole

- **#28 (3-tier tokens)** is 2 days. Without it, every paired-role addition (#29) is band-aid. Without paired roles, every Button/Card token rebinding (~#15) is partial.
- **#26 (atom JSDoc expansion)** is 2 days but is the FOUNDATIONAL DOCUMENTATION upgrade. Every other doc-task references atom JSDoc.

Run #28 + #29 + #26 in parallel from Sprint 1 day 1.

### Why P2 anatomy diagrams (#35) take a full week

Each atom needs:
- Visual diagram (Mermaid or SVG)
- Part labels (every visual region)
- Token-name binding for each part
- "Anatomy → Token map" sub-table

Per atom = 30-45 min. With 41 atoms = ~25-30 hours. Add 12 molecules (key ones) = ~10 hours. Total ~35-40 hours = 1 week.

Highest payoff if done after #28 + #29 (tokens stable) so the binding labels don't churn.

---

## REUSABILITY SCORE

**This decision matrix:** ★★★★★ (5/5) — directly actionable, cited, effort-quantified, sequenced. Pair with the two sibling docs in this folder + ROADMAP.md (suggested next addition) for full project plan.

**Recommended next step:** convert P0 + P1 into a workspace `docs/SPRINT_2026-05-15.md` plan + open issues against `core-v2/` for each.

---

## LINKED concepts

- **og-vs-core-v2.md** (sibling) — full per-token, per-atom delta list that justifies each action
- **og-vs-industry.md** (sibling) — industry-pattern adoption priorities (Sections 4, 6)
- **og-audit/** — source of truth for OG intent (all 70+ docs cited in actions)
- **industry-research/** — source of truth for industry patterns (10 DSs cited in actions)
- **worked-examples/** — source of truth for known consumer defects (secondary button, V0.2 deviations)
- **HANDOVER.md** (core-v2) — known-issues list (L108-114) overlaps w/ #14, #33, #44
- **CLAUDE.md** + memories `feedback_ds_port_workflow.md` · `feedback_aura_master_rules.md` · `feedback_a11y_patterns.md` · `feedback_craft_skills.md` — workspace context for routing each action to appropriate agent tier
- **skills/aura-craft/SKILL.md** — craft-pass gate at step 4.5 of page-build · enforces design quality
- **`webapp-testing` skill** (already installed) — wire per action #33
- **Style Dictionary v4 DTCG** — already in `@kenresearch/tokens` · supports 3-tier restructure (action #28)
