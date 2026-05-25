# PORT-PLAN · batched roadmap for Stage 3 execution

**Date:** 2026-05-19
**Owner:** Aura (Opus main · Sonnet aura-builder for execution)
**Status:** AUTHORITATIVE · executes Stage 3 of MASTER-PLAN.md
**Depends on:** TOKEN-GAP-REPORT · CANONICAL-SOURCE-MAP · SPACING-COMPOSITION-LAYOUT-CANON · GAPS · AI-PICKER-GUIDE · ANTI-PATTERNS
**Master rules applied:** 4WH per batch · TodoWrite gate-bound · gate after every batch

---

## 0 · Strategy

Three batches · gated after each · v0.3 visual check between.

| Batch | Focus | Components | Days |
|---|---|---|---|
| **3.0** | Token foundation | 50+ new tokens · 3 alias tokens · base.css extension | 0.5 |
| **3.1** | Primitives (atoms + small molecules) | Button system · Arrow system · type atoms · stat atoms · pair molecules | 1.5 |
| **3.2** | Layout + dense-data organisms | TOCSidebar · ScopeOfReport · MindMap · KeyStatsStrip · ResearchMethodology · FAQSection · SampleReportPreview | 2.5 |
| **3.3** | Specialty + listing organisms | RegionalComparison · SegmentationSection · GrowthDriversChallenges · MarketDataTable · CompetitiveLandscape · TargetAudience · MarketAnalysis · MarketOverview · Hero · Navbar · Footer · RelatedReports · ReportCardListing · FiltersPanel · ReportStoreHero · ListingToolbar · ReportCard · FinalCTASection · AssociationStrip | 3 |

**Total: ~7.5 days serial · agents run sub-tasks parallel where safe.**

---

## 1 · Batch 3.0 · TOKEN FOUNDATION (first action · 0.5 day)

### 1.1 Scope
Append 50+ tokens from TOKEN-GAP-REPORT.md §3 to `core-v2/src/styles/base.css :root`. No overrides · pure additions.

### 1.2 4WH

**WHAT** · Add 50+ CSS vars + 3 legacy aliases + new motion suite + glass suite + tracking/leading suite + pattern tokens
**WHY** · Unblock all batches 3.1-3.3 · prevent silent visual drift on port
**WHEN** · Before any component port · ZERO exceptions
**WHERE** · `core-v2/src/styles/base.css :root` (append after line ~390 · current end of foundation block)
**HOW** · `Edit` tool · append block-by-block per TOKEN-GAP-REPORT §3 · run `pnpm tsc --noEmit` after to verify · visual smoke test on v0.3 (no regression · additions only)

### 1.3 Steps

1. Backup `base.css` → `.bak` (Bash · `cp`)
2. Append 18 token blocks from TOKEN-GAP-REPORT §3 to `:root`
3. Run `pnpm tsc --noEmit` in v0.3 project · expect green
4. Start v0.3 dev server · visual smoke test · expect identical (additions only)
5. Update `core-v2/docs/FOUNDATIONS.md` · new "Added 2026-05-19" section
6. Log entry in `docs/CHANGELOG.md` (workspace · Aura-infra category)
7. Commit (user explicit OK required before any commit)

### 1.4 Definition of done

- [ ] base.css has new tokens block (verifiable by `grep "Added 2026-05-19" base.css`)
- [ ] `pnpm tsc --noEmit` exits 0
- [ ] v0.3 dev server renders identical (visual diff < 1%)
- [ ] FOUNDATIONS.md updated
- [ ] CHANGELOG logged
- [ ] User approval to proceed to 3.1

---

## 2 · Batch 3.1 · PRIMITIVES (1.5 days)

### 2.1 Scope

Atoms + small molecules required by 3.2 and 3.3.

| Order | Component | Tier | Source | New/Update |
|---|---|---|---|---|
| 1 | `Button.tsx` | atom | report-store | UPDATE (rewrite · token-driven · 4 var × 5 size · showArrow · loading · ripple · shimmer) |
| 2 | `AnimatedArrow.tsx` | atom | report-store | VERIFY · likely exists · audit-match against canonical |
| 3 | `CTALink.tsx` | atom | report-store | VERIFY · update if needed |
| 4 | `InlineLink.tsx` | atom | report-store | VERIFY |
| 5 | `IconButton.tsx` | atom | report-store | VERIFY · ensure aria-label required |
| 6 | `FilterChip.tsx` | atom | report-store | VERIFY |
| 7 | `FilterCheckbox.tsx` | atom | report-store | NEW · likely missing |
| 8 | `LogoButton.tsx` | atom | report-store | UPDATE · use SVG logo not span |
| 9 | `HamburgerIcon.tsx` | atom | report-store | VERIFY |
| 10 | `MenuItem.tsx` | atom | report-store | VERIFY |
| 11 | `SectionHeader.tsx` | atom | V0.2 | **NEW** · 4-prop combo (chapter+title+heading+subtitle) |
| 12 | `OverheadText.tsx` | atom | V0.2 | **NEW** · brand-red uppercase chapter eyebrow |
| 13 | `BodyText.tsx` | atom | V0.2 | **NEW** · paragraph wrapper · `spacing="first"` variant |
| 14 | `StatPair.tsx` | atom | V0_lite | **NEW** · label-value pair · vertical/horizontal · tabular-nums |
| 15 | `StatBadge.tsx` | atom | V0_lite | **NEW** · mini trend badge |
| 16 | `IconBox.tsx` | atom | V0_lite | **NEW** · size-11/12 square w/ icon · tinted-bg |
| 17 | `InlineStats.tsx` | atom | V0_lite | **NEW** · single inline stat unit |
| 18 | `NextSectionCTA.tsx` | atom | report-store | VERIFY |
| 19 | `LabelHeadingPair.tsx` | molecule | V0_lite | **NEW** · SectionLabel + serif-h2 + lede combo |
| 20 | `StatPairRow.tsx` | molecule | V0_lite | **NEW** · 3-col stat strip |
| 21 | `CardMetaRow.tsx` | molecule | report-store | NEW · meta-data row (date · pages · price) |
| 22 | `Breadcrumb.tsx` | molecule | V0_lite | **NEW** · flex flex-wrap · chevron sep · last-item dropdown |
| 23 | `AccordionItem.tsx` | molecule | V0_lite | **NEW** · bordered per-item card · animate-in panel |
| 24 | `WindowControls.tsx` | molecule | V0_lite | **NEW** · 3-dot mac controls |
| 25 | `MetadataStrip.tsx` | molecule | V0_lite | **NEW** · 5-col Hero metadata |
| 26 | `ChartTitleHeader.tsx` | molecule | V0.2 | **NEW** |
| 27 | `CTARowResponsive.tsx` | molecule | V0_lite | **NEW** · 3-tier responsive CTA pair |

### 2.2 4WH

**WHAT** · 27 primitives (atoms + molecules) · the building blocks 3.2 + 3.3 organisms depend on
**WHY** · Cannot port organisms without their primitives · token-grounded · canonical-source-driven · WWWWH-documented
**WHEN** · After Batch 3.0 token foundation complete · before any organism port
**WHERE** · `core-v2/src/atoms/` + `core-v2/src/molecules/` · each w/ `<Name>.tsx` + sidecar `<Name>.md`
**HOW** · 1 Sonnet aura-builder agent spawned per 6-9 atoms · serial batches · each port:
  1. Read CANONICAL-SOURCE-MAP row for component
  2. Read source file at canonical path
  3. Apply TOKEN-GAP-REPORT §4 port refactor rules (text-sm collision · radius collision · purple hex · hardcode → var)
  4. Apply SPACING-COMPOSITION-LAYOUT-CANON for spacing/composition
  5. Apply ANTI-PATTERNS rules
  6. Write `core-v2/src/<tier>/<Name>.tsx` w/ WWWWH JSDoc
  7. Write `core-v2/src/<tier>/<Name>.md` sidecar
  8. Update `core-v2/src/<tier>/index.ts` export
  9. Mark GAPS.md entry ✅ PORTED `2026-05-19`
  10. Verify TypeScript build green

### 2.3 Gate G3a (after Batch 3.1)

- [ ] All 27 primitives ported + sidecar `.md` written
- [ ] `core-v2/src/<tier>/index.ts` exports updated
- [ ] `pnpm tsc --noEmit` exits 0
- [ ] GAPS.md updated · 27 entries ✅ PORTED
- [ ] Visual smoke test · primitives render correctly in isolated test page
- [ ] User approval to proceed to 3.2

---

## 3 · Batch 3.2 · LAYOUT + DENSE-DATA ORGANISMS (2.5 days)

### 3.1 Scope

Organisms needed for V1 Product Page (PDP) section delivery.

| Order | Component | Tier | Source | Dependencies (must be ported first) |
|---|---|---|---|---|
| 1 | `TableOfContentsSidebar.tsx` | organism | V0.2 | Container · sticky pattern · scroll-spy hook |
| 2 | `KeyStatsStrip.tsx` | organism | V0_lite | StatPairRow · IntersectionObserver |
| 3 | `ScopeOfReport.tsx` | organism | V0.2 | MindMap + MindMapModal (next 2) |
| 4 | `MindMap.tsx` | organism | V0.2 | d3 v7 (verify Next 16 + React 19 compat) |
| 5 | `MindMapModal.tsx` | organism | V0.2 | MindMap |
| 6 | `TaxonomyTree.tsx` | organism | V0.2 | MindMap (variant) |
| 7 | `ResearchMethodology.tsx` | organism | V0_lite | StepperHorizontal molecule (new) + MethodologyCard molecule (new) |
| 8 | `StepperHorizontal.tsx` | molecule | V0_lite | (port within batch 3.2) |
| 9 | `MethodologyCard.tsx` | molecule | V0_lite | Card |
| 10 | `FAQSection.tsx` | organism | V0_lite | AccordionItem · FAQContactCTA |
| 11 | `FAQContactCTA.tsx` | molecule | V0_lite | (port within batch 3.2) |
| 12 | `SampleReportPreview.tsx` | organism | V0_lite | Container · SideTOC composed |
| 13 | `DatasetPreviewTable.tsx` | molecule | V0.2 | flat data table for chart cards |
| 14 | `MapFallback.tsx` | molecule | V0.2 | (in v1 project for now · port from there) |

### 3.2 4WH

**WHAT** · 14 organisms + 3 supporting molecules · scope + TOC + stats + methodology + FAQ + sample preview · the "report PDP chapter delivery" set
**WHY** · v0.3 currently invents 13 of these · this batch closes the largest gap · enables Stage 4 v0.3 swap to start
**WHEN** · After Batch 3.1 gate G3a passes · before specialty organisms
**WHERE** · `core-v2/src/organisms/` (+ supporting molecules)
**HOW** · 1 Sonnet aura-builder per 3-4 organisms · serial · each port follows 10-step process from §2.2 above · MindMap d3 dependency installed at project root if missing

### 3.3 Special considerations this batch

- **MindMap d3 compat** · audit d3 v7+ vs Next 16 + React 19 · likely fine but verify; install `d3` if not in `core-v2/package.json` peerDeps
- **TableOfContentsSidebar scroll-spy** · port `useScrollSpy` hook from V0.2 OR reuse existing core-v2 hook if available
- **SampleReportPreview** · contains nested chapter-divider logic · ensure `border-t border-black/5` divider canon preserved
- **FAQSection** · port V0_lite bordered cards + "Still have questions?" contact CTA · NOT V0.2 shadcn variant

### 3.4 Gate G3b (after Batch 3.2)

- [ ] All 17 components ported + sidecar `.md`
- [ ] GAPS.md updated · 17 entries ✅ PORTED
- [ ] `pnpm tsc --noEmit` exits 0
- [ ] Visual test page renders TOCSidebar + ScopeOfReport + MindMap + FAQ + KeyStats + Methodology + SamplePreview in isolation correctly
- [ ] MindMap interactive (zoom/pan/click) works in Next 16 React 19 env
- [ ] FAQ accordion animates cleanly · reduced-motion respected
- [ ] User approval to proceed to 3.3

---

## 4 · Batch 3.3 · SPECIALTY + LISTING ORGANISMS (3 days)

### 4.1 Scope

| Order | Component | Tier | Source |
|---|---|---|---|
| 1 | `HeroSection.tsx` (cinematic dark · report PDP variant) | organism | V0_lite + V0.2 hybrid |
| 2 | `Navbar.tsx` (full · utility + main + dropdowns + cmd-K + mobile) | organism | report-store |
| 3 | `Footer.tsx` (dark + trust bar + 5-col grid) | organism | report-store |
| 4 | `DropdownPanel.tsx` (mega-menu) | molecule | report-store |
| 5 | `CmdKSearchTrigger.tsx` | molecule | report-store |
| 6 | `MobileMenu.tsx` | molecule | report-store |
| 7 | `TrustBar.tsx` | molecule | report-store |
| 8 | `PreviewCard.tsx` (paywall preview · Hero right rail) | molecule | V0_lite |
| 9 | `PaywallOverlay.tsx` | molecule | V0_lite + V0.2 |
| 10 | `RegionalComparison.tsx` | organism | V0.2 |
| 11 | `SegmentationSection.tsx` | organism | V0.2 |
| 12 | `GrowthDriversChallenges.tsx` | organism | V0.2 |
| 13 | `MarketDataTable.tsx` | organism | V0.2 (FIX keyboard sortable) |
| 14 | `CompetitiveLandscape.tsx` | organism | V0.2 |
| 15 | `TargetAudience.tsx` | organism | V0.2 |
| 16 | `MarketAnalysis.tsx` | organism | V0.2 (FIX Highcharts a11y) |
| 17 | `MarketOverview.tsx` | organism | V0.2 (FIX --content-max-width ref) |
| 18 | `RelatedReports.tsx` | organism | report-store |
| 19 | `ReportCardListing.tsx` | organism | report-store |
| 20 | `FiltersPanel.tsx` | organism | report-store |
| 21 | `MobileFilterBar.tsx` | molecule | report-store |
| 22 | `MobileFilterSheet.tsx` | molecule | report-store |
| 23 | `ReportStoreHero.tsx` | organism | report-store |
| 24 | `ListingToolbar.tsx` | organism | report-store |
| 25 | `ReportCard.tsx` (4 variants Grid/List/Compact/Featured) | organism | report-store |
| 26 | `FinalCTASection.tsx` | organism | V0_lite |
| 27 | `AssociationStrip.tsx` | organism | V0_lite TrustStrip |
| 28 | Tier 4 templates (9 files) | templates | composed of above | NEW tier |
| 29 | `recipes/v1-product-page.md` | recipe | composed | NEW |

### 4.2 4WH

**WHAT** · 27 specialty/listing organisms + supporting molecules + 9 templates + 1 page recipe · brings DS to "all V1 PDP needs" coverage
**WHY** · Completes the ports needed for Stage 4 v0.3 consumer swap · enables future report-store-listing port + case-study refresh
**WHEN** · After Batch 3.2 gate G3b passes
**WHERE** · `core-v2/src/organisms/` + `core-v2/src/molecules/` + NEW `core-v2/src/templates/` + `design-system/recipes/`
**HOW** · 2-3 Sonnet aura-builder agents parallel where dependencies allow · serial for shared dependencies · each port follows 10-step process · template creation references CANONICAL-SOURCE-MAP + SPACING-COMPOSITION-LAYOUT-CANON

### 4.3 Special considerations this batch

- **HeroSection hybrid** · V0_lite layout (clean breadcrumb + grid 5/3-2 + CTA + MetadataStrip) + V0.2 cinematic chrome (video bg + orbs + glass card OR PreviewCard right) · NO V0.2 buttons · USE report-store Button · Framer `useReducedMotion()` MANDATORY for orbs
- **Navbar dependency tree** · DropdownPanel + CmdKSearchTrigger + MobileMenu first
- **MarketDataTable a11y fix** · sortable `<th>` needs `role="button"` + `tabIndex={0}` + Enter/Space handler · log fix in CHANGELOG
- **Highcharts a11y enable** · MarketAnalysis · RegionalComparison · MarketDataTable (if charts) all set `accessibility.enabled: true` + add `point.description`
- **MarketOverview `--content-max-width` fix** · alias added in Batch 3.0 · works after
- **Templates (Tier 4)** · 9 files compose ported organisms · locked-layout recipes · each w/ WWWWH sidecar
- **page recipe `v1-product-page.md`** · documents which templates · which order · bg alternation · spacing rhythm · ties all batches together

### 4.4 Gate G3c (after Batch 3.3)

- [ ] All 27+9+1 = 37 deliverables ported + sidecars
- [ ] GAPS.md fully ✅ PORTED · zero MISSING entries (or moved to OUT OF SCOPE)
- [ ] `pnpm tsc --noEmit` exits 0
- [ ] Visual test page renders all organisms in isolation correctly
- [ ] Navbar interactive · dropdowns open · cmd-K opens · mobile menu opens
- [ ] HeroSection cinematic renders · orbs respect reduced-motion
- [ ] FiltersPanel + ReportCardListing render listing context correctly
- [ ] User approval to proceed to Stage 4 (v0.3 swap)

---

## 5 · Per-component port checklist (apply for every port)

```
[ ] 1. Read CANONICAL-SOURCE-MAP row for component
[ ] 2. Read source file at canonical path · understand intent
[ ] 3. Apply TOKEN-GAP-REPORT §4 port refactor rules (token collision fixes)
[ ] 4. Apply SPACING-COMPOSITION-LAYOUT-CANON for spacing/composition tokens
[ ] 5. Apply ANTI-PATTERNS rules (no invention · no JSDoc rationalization · brand-red discipline)
[ ] 6. Write `core-v2/src/<tier>/<Name>.tsx`:
       - WWWWH JSDoc header (WHAT/WHY/WHEN/WHEN NOT/WHERE/HOW)
       - TS props interface w/ JSDoc per prop
       - All foundation tokens (zero hardcoded)
       - A11y (focus-visible · aria · keyboard · 44px touch)
       - Framer useReducedMotion() if motion
       - 'use client' if interactive
[ ] 7. Write `core-v2/src/<tier>/<Name>.md` sidecar (per CANONICAL-SOURCE-MAP §6 template)
[ ] 8. Update `core-v2/src/<tier>/index.ts` export
[ ] 9. Mark GAPS.md entry ✅ PORTED `YYYY-MM-DD`
[ ] 10. Run `pnpm tsc --noEmit` · verify green
[ ] 11. Run on v0.3 (or isolated test page) · visual smoke check
[ ] 12. Log entry in CHANGELOG
```

---

## 6 · Risk register

| Risk | Mitigation |
|---|---|
| MindMap d3 v7 incompat w/ React 19 | Test in isolated sandbox before porting · fall back to D3 v6 if needed |
| Highcharts a11y breaks visual | Test enabling vs disabling · only enable on chart organisms |
| Token alias collision breaks existing code | Aliases are READ-ONLY · canonical token unchanged · safe addition |
| Glass tokens visual regression | Apply only to cinematic-dark surface · whitelist via RULES.md |
| Navbar mega-menu z-index conflict | Use `--z-navbar 1000` · all dropdowns below at `--z-dropdown 10` · test stacking |
| Sonnet aura-builder over-runs scope | Strict 27-component batch caps · gate between batches |
| User changes verdicts mid-batch | Stop · update CANONICAL-SOURCE-MAP · resume |
| Port refactor introduces type errors | `pnpm tsc --noEmit` after every batch · fix before next |

---

## 7 · Tools + agents

| Stage | Agent | Model |
|---|---|---|
| 3.0 token foundation | aura-mech OR aura-builder | Haiku / Sonnet |
| 3.1 primitives | aura-builder | Sonnet |
| 3.2 layout + dense-data | aura-builder | Sonnet |
| 3.3 specialty + listing | aura-builder × 2-3 parallel | Sonnet |
| Gate checks (visual smoke) | aura-qa | Sonnet |
| Final QA gate | aura-qa | Sonnet |
| Synthesis · arbitration | main thread | Opus |

---

## 8 · 4WH on this doc itself

**WHAT** · Batched port roadmap for ~62+ component port · 3 batches + 1 prep + 1 swap + 1 QA = 6 phases
**WHY** · Stage 3 execution plan · resolves DS organism gap that drove v0.3 regression
**WHEN** · After Stage 2 docs approved (Gate G2) · before any port action
**WHERE** · `core-v2/docs/PORT-PLAN.md`
**HOW** · 5 batches w/ gates · each batch has 4WH + scope + special considerations + DoD · per-component checklist applied universally · risk register monitored

---

## 9 · Done when

- [ ] User approves this doc
- [ ] G2 gate passes (all 7 synthesis docs approved)
- [ ] Stage 3.0 token foundation completes + G3a-prep gate
- [ ] Stage 3.1 primitives ported + G3a passes
- [ ] Stage 3.2 layout + dense-data ported + G3b passes
- [ ] Stage 3.3 specialty + listing + templates + recipe ported + G3c passes
- [ ] All GAPS.md entries ✅ PORTED or OUT OF SCOPE
- [ ] Stage 4 (v0.3 swap) ready to begin

---

**END · PORT-PLAN.md**
**Next stage:** GATE G2 · user review of all 7 synthesis docs
