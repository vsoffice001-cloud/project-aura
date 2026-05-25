# Decision Record · DS Path Forward

**Date:** 2026-05-14
**Initiated by:** user pause on DS dev after 5 rounds of legacy-parity drift on reports-pdp-v2
**Audit scope:** 114 MD files · 4 days research time (~20 effective hours via 14 parallel agents)
**Coverage:** OG DS (24 atoms · 21 molecules · 12 organisms · 6 token domains · 6 supporting layers) + 5 worked-examples + 10 industry DSs + gap analysis

---

## WHAT — the decision

**Fix `design-system/core-v2/` by porting OG intent + industry discipline layers · NOT restart from OG · NOT scrap to Vite legacy.**

Path: **2-week sprint · ports the missing intent layer · keeps the irreversible architectural wins · ships a new DS that combines OG brand + industry rigor + Next 15 production target.**

---

## WHY — reasoning

### Three options considered

**Option A — Fix core-v2 by porting OG intent** (CHOSEN)
- Keep: Next 15 + RSC + Tailwind v4 + Style Dictionary v4 + adapter pattern + 23 hooks + 46 shadcn primitives + workspace package boundary
- Port: OG `ai-context/CORE.md` · `QUICK_START_PROMPT.md` · WWWWH inline JSDoc depth · decision-tree pickers · WCAG citations · industry 3-tier token model
- Effort: 127-181 hours · 4 working weeks for full close-out · 7 days for P0+P1
- Risk: LOW — additive work · core-v2 architecture already correct

**Option B — Drop core-v2 · restart from OG · Next-port from scratch**
- Pro: OG patterns work first-try
- Con: Re-do `'use client'` RSC compat (1-2 weeks · already done in core-v2)
- Con: Re-do Style Dictionary v4 DTCG pipeline (3-5 days · done)
- Con: Re-do adapter pattern decoupling (1 week · done)
- Con: Re-do 23 hooks (3-5 days · done)
- Con: Re-do shadcn integration (2-3 days · done)
- Total restart cost: **5-7 weeks** vs Option A's 2 weeks
- Verdict: REJECTED · sunk-cost fallacy aside · core-v2 has done irreversible architectural work · restart wastes that

**Option C — Hybrid · port OG docs INTO core-v2 + port V0.2-pasted docs**
- Same as Option A · plus port V0.2's 98 sidecar MDs (filter to top 25)
- Adds: WWWWH framework refinement · 10 Commandments · REUSABILITY SCORE pattern · tri-modal hover language · canonical Footer
- Effort: +1 week beyond Option A
- Verdict: **MERGED INTO Option A as P1 items** · not a separate option

### Why Option A wins

1. **Core-v2's architecture is correct and irreversible.** 8 hidden strengths can't be regressed (RSC compat · token-only · adapter pattern · 23 hooks · 46 shadcn · DTCG · ANTI_PATTERNS consolidation · workspace boundary).
2. **The intent transfer gap is fixable in 2 weeks.** Audit identified exactly what's missing — port `ai-context/CORE.md` (2h) · `QUICK_START_PROMPT.md` (2h) · expand JSDoc HOW blocks (6-8h) · add organism 4WH inline (4h) · add decision tables (1h) = 15-17 hours of doc work closes 80% of the gap.
3. **Two production-blocking bugs in OG don't get re-imported.** V0-lite-legacy secondary button contrast 1.13:1 + Card padding regression are documented · fix on port · not perpetuated.
4. **Industry discipline adds 3-tier token model + lifecycle badges + WCAG citations + anatomy diagrams** without architectural disruption.
5. **No restart risk.** No lost work. No new tech-stack adoption decisions.

---

## WHEN ✅ to apply this decision

- Starting next sprint (2026-05-15)
- Any future DS work in `design-system/core-v2/`
- Any new page build (reports-pdp-v2 v2 · case-study v2 · landing pages)
- Future consumer projects (after handover · tech team continues this pattern)

## WHEN NOT ❌ to revisit

- If OG DS pattern reveals as broken at runtime in another consumer (revisit at that consumer's build)
- If industry DS introduces a paradigm shift (e.g. Material 4 / Carbon 12 / Lightning 3) — quarterly review
- If Next 15+ deprecates RSC or Tailwind v5 drops `@theme` — revisit token strategy

---

## WHERE this decision affects

| Area | Effect |
|---|---|
| `design-system/core-v2/` | All Sprint 1 P0/P1 work lands here |
| `design-system/core-v2/docs/` | Port 5 OG docs + V0.2 doc method · ~10 new files |
| `design-system/core-v2/src/atoms/` | JSDoc expansion · Button secondary fix · Card padding fix · shadow token correction |
| `design-system/core-v2/src/organisms/` | Add 4WH inline JSDoc (currently zero) |
| `design-system/tokens/` | 3-tier restructure (primitive → semantic → component) · paired role tokens · lifecycle badges |
| `projects/reports-pdp-v2/` | Frozen at current state · re-evaluate after DS Sprint 1 · likely needs to consume updated atoms |
| Consumer projects (future) | Will adopt new doc-method-first pattern |

## WHERE this decision DOES NOT affect

- `Design_system_vs_26 (og and final)/` — READ-ONLY forever
- `projects/V0_lite_report-legacy/` (`:3020`) — READ-ONLY reference
- `projects/V0.2 -for design system/` (`:3030`) — READ-ONLY reference
- `projects/topnav-v32/` (`:3005`) — canonical Header source · only modify if user explicitly asks
- `projects/report-store-legacy/` — READ-ONLY reference
- `projects/competition-benchmarking-listing-v01/`+`v02/` — READ-ONLY reference

---

## HOW — execution sequence

### Pre-flight (1 day) · BEFORE any code
- [ ] User reviews + approves this decision record
- [ ] User reviews `gap-analysis/prioritized-actions.md`
- [ ] User picks subset of P0+P1 items to commit to (or commits to all 33 items)
- [ ] Aura saves decision as standing rule in memory

### Sprint 1 · Week 1 (P0 · ~12-16h) — UNBLOCK
1. Port OG `ai-context/CORE.md` → `core-v2/docs/CORE.md` (2h · HIGH impact)
2. Port OG `QUICK_START_PROMPT.md` → `core-v2/docs/QUICK_START.md` (2h · HIGH)
3. Fix Button secondary variant contrast 1.13:1 → outline variant (collapse `secondary` + `ghost` · `border: 1.5px solid currentColor` · 21:1) (30m · HIGH)
4. Fix Card padding spec drift (Card.tsx:37-39 16px → 24px) (30m · HIGH)
5. Restore missing shadow tokens · multi-stop full box-shadow syntax (1h · HIGH)
6. Restore micro typography tokens (`--text-card-micro` · `--text-compact` · `--text-nav`) (2h · MED)
7. Add organism 4WH inline JSDoc — TopNavigation · ProductHero · HeroSection · CaseStudyNavbar · FinalCTASection (4h · HIGH)
8. Add per-component decision tables (Badge theme-selection · Button size-selection · Card density · Section bg alternation) (1h · HIGH)

### Sprint 1 · Week 2 (P1 · ~35-45h) — DISCIPLINE
9. 3-tier token restructure (primitive → semantic → component) (1d · HIGH)
10. Paired role tokens (`on-{role}` pattern · Material Design adoption) (1d · MED)
11. Component lifecycle stages (alpha/beta/stable/deprecated) inline JSDoc frontmatter (4h · MED)
12. WCAG status badges per component (Primer pattern) (4h · MED)
13. 4-class icon role taxonomy from V0-lite-legacy (`iconColors.ts` semantic split) (4h · MED)
14. Atom JSDoc 4WH expansion · all 42 atoms (8h · MED)
15. Build `voice.md` from inferred OG patterns + canonical CTA library (4h · MED)
16. Port V0.2's 10 Commandments + REUSABILITY SCORE pattern + tri-modal hover language (4h · HIGH)
17. Add WCAG citations to every a11y rule in component docs (4h · MED)
18. Build dummy Header atom in core-v2 matching topnav-v32 visual API (1d · HIGH)
19. Build dummy Footer atom in core-v2 matching V0.2-for-design-system visual API (1d · HIGH)
20. Build sample page composing all 14 sections (V0.2 PDP recipe) using core-v2 atoms (1d · HIGH)

### Sprint 2 · Week 3-4 (P2 · ~80-120h) — POLISH
- Anatomy diagrams for top 10 atoms (Material/Spectrum pattern)
- Decision-tree pages (Polaris pattern) for: which Card · which Button · which Badge · which Layout
- Density vocabulary (compact / comfortable / spacious) like Polaris
- Surface-layer model (3-layer system for cinematic-dark)
- BigNumber atom (stat-display primitive)
- DataTable molecule (table-display primitive)
- Storybook stories for top 20 atoms
- Audit + cleanup `_safelist.generated.css`
- Migrate OG-compat aliases in variant CSS to canonical token names

### Sprint 3 · Page rebuild · Week 5+ (optional)
- Rebuild reports-pdp-v2 using updated DS · prove no 5-round legacy diff needed
- Build next consumer page (case-study v2 · landing · etc.) using new DS as ground truth

---

## HOW — measurement

Sprint 1 success criteria:
- [ ] Page build trial: build any single new page using ONLY new DS + new docs + dummy Header/Footer
- [ ] Test: ≤2 rounds of QA fixes (vs current 5 rounds)
- [ ] Test: 0 contrast violations (axe critical/serious = 0)
- [ ] Test: 0 console errors
- [ ] User audit: review build · confirm visual fidelity matches legacy

If success criteria met → migrate strategy is validated · move to Sprint 2.
If failed → return to gap analysis · identify new gap · iterate.

---

## Reasons + Decisions log

### Why fix core-v2 not restart?
- 5-7 weeks restart cost vs 2 weeks fix cost (audit-verified in `prioritized-actions.md`)
- Architectural wins are irreversible work (RSC · adapter pattern · DTCG · 23 hooks)
- Restart wastes Sprint 2026-05-07 + Sprint 2026-05-13 work · violates sunk-cost-but-already-paid principle

### Why not Option C as separate path?
- V0.2's 98 sidecar MDs are ~30 redundant · ~25 canonical · porting just the canonical 25 is part of P1 anyway
- Option C and Option A merge into the same execution path · keeping them distinct adds confusion not value

### Why P0/P1/P2 ordering?
- P0 = anything that blocks "build a new page first-try without 5 rounds of fixes"
- P1 = anything that raises new DS to industry-discipline level (3-tier tokens · lifecycle · a11y citations)
- P2 = anything that's polish · nice-to-have · or builds on P0+P1

### Why specifically port OG's `CORE.md` + `QUICK_START_PROMPT.md`?
- Audit identified these as the missing entry-point docs
- OG had 27-point pre-flight checklist (CORE.md) that core-v2 lacks
- OG had 178-line single-paste playbook (QUICK_START_PROMPT.md) that core-v2 lacks
- These are the docs agents READ FIRST · without them · agents wander

### Why dummy Header + Footer atoms?
- User explicit instruction (saved as memory `project_dummy_header_footer_sources.md`)
- Tech team will replace internals post-handover · designer just needs visual fidelity
- Reduces page-build friction · every new page starts with proven Header/Footer

### Why 2-week sprint not longer?
- P0+P1 = 7 working days (47-61h)
- 2 weeks gives buffer for unforeseen + user review cycles
- After 2 weeks · trial-build new page · measure success criteria · decide next sprint

### Why NOT touch OG / V0.2-pasted / topnav-v32 / V0-lite-legacy / report-store-legacy?
- User explicit: read-only references
- Saved memory: `project_dummy_header_footer_sources.md`
- Modifying breaks the ground-truth comparison
- Any "fix" to legacy = fix-once-perpetuate-twice problem

---

## REUSABILITY SCORE

⭐⭐⭐⭐⭐ — This decision record is the SINGLE entry point for "what do we do with new DS?" question. Will be referenced for entire Sprint 1 + 2 + 3.

## Linked concepts
- `00_README.md` — audit overview
- `01_methodology.md` — WWWWH framework
- `og-audit/00_overview.md` — OG ground truth
- `gap-analysis/og-vs-core-v2.md` — what was lost in port
- `gap-analysis/og-vs-industry.md` — what to learn from big tech
- `gap-analysis/prioritized-actions.md` — 45-item decision matrix
- `worked-examples/v02-for-design-system/pattern-lessons.md` — V0.2 REPLICATE/REJECT/MODIFY
- `worked-examples/v0-lite-report-legacy/secondary-button-issue.md` — button regression to fix
- Memory: `feedback_aura_master_rules.md` · `project_dummy_header_footer_sources.md` · `feedback_tailwind_v4_ds_source_scan.md` · `feedback_css_layer_cascade_trap.md`

---

## What user must do next

1. **Read `gap-analysis/prioritized-actions.md`** (45-item decision matrix)
2. **Read `gap-analysis/og-vs-core-v2.md`** (what was lost · root cause of intent transfer gap)
3. **Read `gap-analysis/og-vs-industry.md`** (what industry has that OG doesn't)
4. **Review this decision record** · approve OR reject OR modify Option A
5. **If approved · confirm:** "proceed Sprint 1 Week 1 (P0 items 1-8)"

Aura is on HOLD until user confirms.
