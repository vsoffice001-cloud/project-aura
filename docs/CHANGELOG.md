# Aura Infra Changelog

Append-only log of changes to Aura's own configuration: `CLAUDE.md`, `workflows/`, agents, memories, hooks, settings.

**Not** for project code changes — those live in git history. **Not** for design decisions — those happen in chat. **Only** Aura-meta changes that affect how Aura behaves next session.

## 2026-05-25 · Chart Library Promote Sprint · A.1 + A.2 + A.3
**What:**
- NEW `design-system/core-v2/src/charts/` library · 14 files (theme + primitives + 7 charts + 2 tables + barrel)
  - `theme/tokens.ts` (9 token exports · KEN_CHART_SERIES · KEN_INK · KEN_TOOLTIP · KEN_TABLE · KEN_CHART_MOTION etc)
  - `theme/highcharts-base.ts` (`buildKenChartBase()` · ref-aligned tooltip white + periwinkle border)
  - `primitives/ChartReveal.tsx` (motion wrapper · fadeInUp 0.6s ease-out · viewport-triggered)
  - `primitives/TableShell.tsx` (density · sticky · header wash · alternateRows · `TableDensityContext`)
  - `primitives/ChartFigure.tsx` (ported · wrapper)
  - 7 charts promoted: KenBarChart · KenBubbleChart · KenColumnChart · KenDonutChart · KenDualColumnChart · KenMultiLineChart · KenScenarioFanChart (all wrap `<ChartReveal>`)
  - 2 tables promoted: PropertyTable · RankingTable (use `<TableShell>`)
  - `index.ts` barrel · all exports
- Legacy `highchartsTheme.ts` marked `@deprecated`
- v0.4 PDP: 11 section files import-swapped to `@kenresearch/design-system/charts` · 11 project-local files DELETED
- NEW `projects/charts-showcase/` standalone Next 15 project · port 3070 · DS chart sandbox · 7 charts + 2 tables + 3 primitives demoed
- `pnpm-workspace.yaml` · added `projects/charts-showcase`
- DELETED `projects/v1-project/v1-product-page-ver0.{1,2,3}` (~1 GB freed · superseded by v0.4)
- `HANDOVER_TRACKER.md` · marked v0.1-v0.3 deleted · added v0.4 polish-active + charts-showcase
- Docs created (CONFIDENTIAL · gitignored): `REF-DEEP-MINE-2026-05-25.md` · `REF-PORT-PLAN-2026-05-25.md` · `CURRENT-STATE-CHARTS-TABLES-2026-05-25.md` · `CHART-LIBRARY-PLAN-2026-05-25.md`

**Why:** Charts/tables were project-local in v0.4 · not reusable. Refs deep-mine surfaced 10 actionable deltas (tooltip · grid · header wash · row density · entrance motion · button hover). Library promotion + 6 critical bug fixes shipped in one coordinated sprint. v0.1-v0.3 dead weight (superseded by v0.4). Charts-showcase enables DS chart preview without polluting v0.4.

**Reversal:**
- DS chart library · `rm -rf design-system/core-v2/src/charts/{theme,primitives,charts,tables}/` · revert barrel `index.ts` · revert v0.4 section import swaps via git
- charts-showcase · `rm -rf projects/charts-showcase/` · revert pnpm-workspace.yaml
- v0.1-v0.3 · recoverable from git history (state at commit `5cec9db`)

**6 critical bug fixes (locked):**
1. §14 KenBubbleChart "Linfox​Linfox" duplicate label → drop textOutline · position above bubble (verticalAlign:top · y:-8 · allowOverlap:true)
2. §16 KenScenarioFanChart white spline invisible → base scenario `KEN_CHART_SERIES.primary` · fan `KEN_CHART_SERIES.light` 0.18 opacity
3. Grid stroke verified · was Highcharts xAxis baseline (`#e5e5e5` by design) · yAxis grid periwinkle hairline already correct
4. §10 SubmarketsSection single-series → KenDualColumnChart · 2 series (Cold Storage + Cold Transport · PRD anchors + CAGR)
5. §17 OpportunitiesSection split-table → single `<RankingTable>` w/ gatedContent slot · single-table · 40px standard density · header opacity 0.45→0.60 (WCAG)
6. §14 CompetitorLandscapeSection PropertyTable 72px → density="comfortable" (45px per `KEN_TABLE_DENSITY`)

**DS gaps still open (next sprint):**
- `--table-header-wash` · `--table-alt-row-wash` · `--table-row-divider` · add to `base.css` as CSS custom properties (TableShell currently uses Tailwind arbitrary values w/ comments citing ref)
- Phase 2 work pending: SegmentedSwitcher · sticky table opt-in defaults · stat-strip ChartReveal apply · skeleton states · new viz (KenTreemap · KenHeatmap · KenKeywordScatter · KenGanttTimeline)

**Locked rules (new):**
- Chart wrappers MUST use `<ChartReveal>` (fadeInUp 0.6s ease-out · viewport-triggered · useReducedMotion respected)
- Tables MUST use `<TableShell>` base · density-prop discipline
- All chart consumers import from `@kenresearch/design-system/charts` · NEVER project-local
- Token rename map: `KEN_CHART_COLORS` (legacy) → `KEN_CHART_SERIES_ARRAY` (array) + `KEN_CHART_SERIES` (object) · `KEN_INK_*` flat → `KEN_INK.{strong/body/muted/subtle/faint}` · `KEN_FONT_*` → `KEN_CHART_FONT.{sans/serif}`
- Tooltip white + periwinkle border `rgb(228,226,240)` (NOT dark overlay any longer · ref-aligned)

**Live URLs:**
- v0.4 PDP: http://localhost:3040/test/phase-2
- charts-showcase: http://localhost:3070/

## 2026-05-22 · V0.4 PDP Sprint · §22 slideshow + UX audit Phase A
**What:**
- `memory/project_v04_pdp_sprint_2026-05-22.md` created · full sprint state
- `MEMORY.md` · new ★★ pointer entry at top
- `projects/v1-project/v1-product-page-ver0.4/docs/UX_AUDIT_2026-05-22.md` · 367 LOC audit doc
- `projects/v1-project/v1-product-page-ver0.4/qa-screenshots/audit-2026-05-22/` · 29 screenshots

**Why:** Sprint closeout · §22 slideshow port + §24 FinalCTABanner DS refactor + UX/UI audit + 5 P0 fixes complete · user holds Phase B/C polish to pivot to charts/tables next sprint.

**Reversal:** Delete memory file + revert MEMORY.md line · audit doc + screenshots are sprint artifacts, leave for charts-sprint reference.

**Locked rules (new):**
- Eyebrow rule · §01-§21 (inside SideTOC) keep "Section NN · TITLE" · §22-§24 (outside SideTOC) drop number
- Nav+Button pattern · `<Link><Button>...</Button></Link>` (DS Button has no href/asChild)
- SectionWrapper bug · gradient overlay children fill inner content div ONLY · not section padding · use raw `<section>` for full-bleed gradient sections

**DS gaps surfaced (backlog):**
- `--semantic-ink-on-dark-strong/body/muted/faint` text-opacity tokens missing
- `--color-surface-cinematic-start/mid/end` gradient anchor tokens missing
- Button `href`/`asChild` prop absent (Link-wrap workaround documented)

## 2026-05-20 · WORKFLOW-RESET execution (6 phases)
- **Phase 1** · DS plan-vs-delivery audit · 11 match · 2 minor drift · 0 gap · `core-v2/docs/DS-AUDIT-2026-05-20.md`
- **Phase 2** · Doc inventory + prune
  - B1 · 11 .DS_Store + graphify-out/ + qa-screenshots/ deleted (96.7 MB freed)
  - B2 · 3 sprint docs + aura-sprint-2026-05-07-port/ + CLAUDE.original.md → `docs/_archive/` and `_archive/`
  - B3 · 95 V0.2 agent-artifact .md → `projects/V0.2 -for design system/_archive_md/`
  - B3 · 33 V0_lite agent-artifact .md → `projects/V0_lite_report-legacy/_archive_md/`
  - Essentials kept (README · ATTRIBUTIONS · LEGACY-READONLY) · ALL code untouched
  - Design_system_vs_26 KEPT per user direction
- **Phase 3** · `core-v2/docs/AI-CONSUMPTION-PROTOCOL.md` written · single source of truth for AI session boot + 5-step picker + token rules + composition + GAPS + anti-patterns + scenarios
- **Phase 4** · `workflows/CANONICAL-WORKFLOW.md` written · 6 scenarios (A-F) · agent routing · trace markers · token-efficiency rules · `workflows/ROUTING.md` → `workflows/_archive/ROUTING.md.deprecated-2026-05-20`
- **Phase 5** · `core-v2/docs/SKILL-AUDIT-2026-05-20.md` written · 11 KEEP · 1 ARCHIVE (skill-creator) · SKILL_ROUTING.md updated · SKILL_ROUTING.original.md archived
- **Phase 6** · `CLAUDE.md` (root) updated · 3 references swapped (ROUTING.md → CANONICAL-WORKFLOW.md + AI-CONSUMPTION-PROTOCOL.md) · MEMORY.md prepended w/ new canonical workflow entry · `feedback_canonical_workflow_reset.md` memory created
- Verification · TSC green both sides · HTTP 200 · zero functional regression

Entry format:

```
## YYYY-MM-DD — short title
**What:** files added/changed/removed
**Why:** one-line reason
**Reversal:** how to undo
```

Newest entries on top.

---

## 2026-05-20 — P5 handover finalization · v1-product-page-ver0.3 · DS contrast fix

**What:** 4-task finalization pass (aura-builder · Sonnet).
- T1 Docs scaffolded: `README.md` + `HANDOVER.md` + `STATUS.md` created at `projects/v1-project/v1-product-page-ver0.3/` from workspace templates. Status: `ready-for-tech (caveats)`.
- T2 DS contrast fix: `design-system/core-v2/src/organisms/TableOfContentsSidebar.tsx` — 4 occurrences of `--black-500` (4.34:1 · WCAG AA fail at 12px) swapped to `--black-600` (7:1 · WCAG AA pass). Affected: totalTime badge text + section numbers (expanded + collapsed states) + inactive section title text.
- T3 HANDOVER_TRACKER.md: v0.3 entry updated from `cleanup` → `ready-for-tech (caveats)`. 3 DS escalations noted.
- T4 TSC verified: DS core-v2 `pnpm tsc --noEmit` green · v0.3 consumer `pnpm tsc --noEmit` green. HTTP 200 at localhost:3002.

**Why:** Pre-handover gate blocked on missing docs + contrast violation. All consumer-side blockers now resolved. DS escalations (definition-list · nested-interactive · target-size) are open DS-team items — not consumer regressions.
**Reversal:** Delete the 3 docs; revert `TableOfContentsSidebar.tsx` L247/L320/L339/L405 from `--black-600` back to `--black-500`; revert HANDOVER_TRACKER row.

---

## 2026-05-19 — P3 polish sweep · v1-product-page-ver0.3

**What:** 5-task polish pass on v1-product-page-ver0.3 (aura-builder · Sonnet).
- T1 BG alternation: 4 sections patched (TaxonomySection warm, SubmarketIntelligence warm, IndustrySection warm, TableOfContentsSection warm) — breaks 5 consecutive white pairs from P2 audit
- T2 Intersect-gate: `useDeferredRender` hook created at `src/hooks/useDeferredRender.ts`; applied to MarketSizeSection + SubmarketIntelligence chart areas (defers Highcharts mount until 200px pre-viewport)
- T3 15px sweep: 9 occurrences of `text-[0.9375rem]` → `text-[1rem]` in 6 files (CountryInfraSection, TableOfContentsSection, DefinitionsSection, IndustrySection, DSGapSection, OpportunitiesSection)
- T4 Hex sweep: ~35 bare hex instances tokenized across 8 files (`#171717`→`var(--black-900)` etc). Flagged semantic colors (#15803d, #e11d48, SWOT viz colors) for Aura design call. Brand-red on non-CTA contexts flagged with TODO markers.
- T5 GenesisTimeline: 15 inline style blocks → Tailwind classes; year labels `color: var(--color-brand-red)` → `text-[var(--black-700)]` (neutral editorial). Removed `<style>` tag, using `hidden md:block` responsive classes.

**Why:** Pre-handover P3 gate. Resolves P2 audit findings before pre-handover checklist.
**Reversal:** Git revert the 12 files touched.
**Gate:** TSC green · HTTP 200 · lint config missing pre-P3 (not introduced).

---

## 2026-05-20 — P2 visual diff fixes · 6 color swaps (ordinals + excluded-scope labels)

**What:** 6 mechanical color fixes in v1-product-page-ver0.3 section components. TableOfContentsSection:70, ExecutiveSummary:79, IndustrySection:55, OpportunitiesSection:70 — ordinal numbers `text-[#b01f24]` → `text-[#171717]` (neutral black). DefinitionsSection:53,59 — "Excluded from scope" label + icon `text-[#b01f24]` → `text-[#e11d48]` (rose-600, semantic risk state per DS anti-patterns).

**Why:** Brand-red (#b01f24) reserved for CTAs only. Ordinals are semantic neutral counters (not CTAs); excluded scope is semantic negative/risk (use rose-600, not brand). Resolves visual diff drift vs DS ANTI_PATTERNS.md rule §2.4 (brand-red scope).

**Reversal:** Revert 6 edits · restore `#b01f24` in both contexts. TSC will remain green.

---

## 2026-05-19 — P1 Highcharts LCP perf fix · useDeferredRender hook + 3 hero lazy gates

**What:** DS core-v2 new hook `useDeferredRender.ts` + sidecar `.md` + `hooks/index.ts` export. Consumer `v1-product-page-ver0.3` patches to `HeroChartCard.tsx`, `HeroCockpit.tsx`, `HeroRightRail.tsx` — all 3 chart renders now lazy-gated via `requestIdleCallback` (strategy: 'idle'). Skeleton placeholders with exact final dimensions (150px / 140px / 160px) prevent CLS. `useReducedMotion` gates skeleton pulse. TSC green both sides. HTTP 200 confirmed.

**Why:** LCP 5.0s blocked at Lighthouse Perf 71. Highcharts 117KB eval (3.7s) ran before h1+CTA paint. rIC gate defers eval until after LCP — target improvement 5.0s → 2.5-3.0s.

**Reversal:** Remove `useDeferredRender` import + hook call from 3 hero files. Restore original dynamic import `loading` props. Delete `hooks/useDeferredRender.ts` + `.md` + remove export from `hooks/index.ts`.

---

## 2026-05-20 — P0 a11y fixes · 5 serious axe violations resolved in DS organisms/molecules

**What:** DS source fixes (aura-builder Sonnet). Fixes 5 serious axe violations identified in Stage 5 QA of v1-product-page-ver0.3. All fixes at DS source level — every consumer benefits.

**Fixes applied:**
1. `ScopeOfReport.tsx` — removed `role="button"` from `motion.div` wrapping interactive MindMap. Replaced with semantic `<button>` around the card inner div. MindMap canvas marked `aria-hidden="true"` in preview mode — D3 node role=button elements no longer exposed to AT (nested-interactive axe rule resolved).
2. `MegaBreadcrumb.tsx` — changed inactive crumb color from `--semantic-ink-subtle` (#737373, 4.48:1 fails AA) to `--black-600` (#525252, 7:1). Same fix on DropdownColumn header + item colors. Also fixed undefined `--semantic-ink-muted` token → `--black-600` (color-contrast axe rule resolved).
3. `MetadataStrip.tsx` — collapsed double-nested `<div>` inside `<dl>` to single `<div>` per `<dt>/<dd>` pair (definition-list / dlitem axe rules resolved).
4. `ChartCard.tsx` — already had `role="img"` + `aria-label={title}` on chart wrapper div (svg-img-alt already resolved — no change needed).
5. Heading order fixes — `StakeholderCard.tsx` h4→h3, `ReportCard.tsx` all 3 h4→h3 (compact/list/grid card titles), `Footer.tsx` FooterLinkColumn h4→h3.

**Why:** Unblock Lighthouse Accessibility score from 86 to ≥95. TSC green both DS + consumer. HTTP 200 localhost:3002 confirmed.

**Reversal:** git revert affected files. Specific: StakeholderCard/ReportCard h3→h4 if any nested section adds h3 level above cards. MegaBreadcrumb token rollback: `--black-600` → `--semantic-ink-subtle` (degrades contrast).

---

## 2026-05-19 — Batch 3.3e · TIER 4 TEMPLATES · 9 greenfield composition shells + 1 page recipe

**What:** DS Port Batch 3.3e (aura-builder Sonnet). Creates entire Tier 4 templates directory. 9 new template files + 9 sidecar `.md` files + `templates/index.ts` + root `index.ts` re-export + `design-system/recipes/v1-product-page.md`. GAPS.md §5 all 9 entries marked ✅. `pnpm tsc --noEmit` passes clean.

**Templates created (9 · greenfield · `core-v2/src/templates/`):**
- `ChapterSectionTemplate.tsx` + `.md` — default chapter section recipe (SectionWrapper + LabelHeadingPair + content slot + optional CTA)
- `HeroCinematicTemplate.tsx` + `.md` — cinematic-dark hero (5-col 3/2 grid · Breadcrumb · orbs · MetadataStrip · PreviewCard right)
- `HeroEditorialTemplate.tsx` + `.md` — editorial-light hero (1-col OR 2-col with rightSlot)
- `PDPLayoutTemplate.tsx` + `.md` — full PDP page shell (Navbar + SkipLink + TOC sidebar + main + FinalCTA + Footer)
- `ListingPageTemplate.tsx` + `.md` — report store listing shell (Navbar + Hero + FiltersPanel + ListingToolbar + CardListing + MobileFilterBar + Footer)
- `DataChartTemplate.tsx` + `.md` — 2-col chart + table grid (ChartCard pair)
- `MultiCardGridTemplate.tsx` + `.md` — 2/3/2 staggered segmentation grid + optional takeaways
- `AccordionListTemplate.tsx` + `.md` — FAQ/definitions list (AccordionItem + FAQContactCTA + optional JSON-LD)
- `StepperPlusGridTemplate.tsx` + `.md` — methodology stepper + 3-col MethodologyCard grid (activeStep synced)

**Page recipe created (1):**
- `design-system/recipes/v1-product-page.md` — 30-section report PDP recipe · bg alternation · spacing · Z-ladder · A11y · template usage map

**Index updated:** `templates/index.ts` (new) · `src/index.ts` (re-export added)
**GAPS.md:** §5 all 9 template entries marked ✅ PORTED 2026-05-19

**Reversal:** delete `core-v2/src/templates/` directory · remove `export * from './templates/index'` from `src/index.ts`

---

## 2026-05-19 — Batch 3.3d · LISTING surface · 2 molecules + 3 organisms (report-store-legacy canonical)

**What:** DS Port Batch 3.3d (aura-builder Sonnet). Final listing surface batch. 2 new molecules + 3 new organisms. Completes the report-store surface. `GAPS.md` all listing entries marked ✅.

**Molecules ported (2 NEW):**
- `MobileFilterBar.tsx` + `MobileFilterBar.md` — frosted-glass fixed-bottom pill · z-1500 · env(safe-area-inset-bottom) · aria-haspopup=dialog · active-count badge (brand-red) · lg:hidden
- `CheckboxFilterSection.tsx` + `CheckboxFilterSection.md` — accordion filter section for FiltersPanel · title + active-count badge + optional search input + checkbox list + show-more threshold · native `<input type="checkbox" sr-only>` a11y

**Organisms ported (3 NEW):**
- `ReportCardOrganism.tsx` + sidecar — 4-variant organism (grid/list/compact/featured) from report-store-legacy canonical `ReportCard.tsx:1-583`. Image badge CSS-var override pattern. Card atom chrome preserved. `animatedArrow` aligned to DS Button API (legacy used `showArrow`).
- `ReportCardListing.tsx` + sidecar — generic render-prop listing grid/list. CardReveal stagger idx×50ms capped at 8. EmptyState w/ action Button. SkeletonCard loading. LoadMoreSentinel children slot. Bottom spacer for MobileFilterBar.
- `RelatedReports.tsx` + sidecar — horizontal-scroll related-reports row. LabelHeadingPair + CTALink header. HorizontalScroll + snap-scroll. ReportCardOrganism compact variant default.

**Organism status (existing — confirmed canonical, no port needed):**
- `FiltersPanel.tsx` DS v4.4 — MORE advanced than legacy (search auto-expand · show-all · scroll-to-active-sub). CheckboxFilterSection molecule extracted from legacy pattern.
- `ListingToolbar.tsx` DS v4.2 — canonical API parity confirmed.
- `ReportStoreHero.tsx` — wraps ProductHero; full-globe version deferred (3D lib not in DS scope).

**Index updated:** `molecules/index.ts` + `organisms/index.ts`
**GAPS.md:** all listing molecule + organism entries marked ✅

**Why:** Complete the report-store listing surface organisms. After this batch, all GAPS.md listing entries are ✅. Templates (Tier 4) remain greenfield.

**Reversal:** Remove Batch 3.3d exports from `molecules/index.ts` + `organisms/index.ts`. Delete files: `MobileFilterBar.tsx`, `CheckboxFilterSection.tsx`, `ReportCardOrganism.tsx`, `ReportCardListing.tsx`, `RelatedReports.tsx` + sidecars.

---

## 2026-05-19 — Batch 3.3c · DATA organisms · 7 V0.2 canonical ports (SegmentationSection · GrowthDriversChallenges · MarketDataTable · CompetitiveLandscape · TargetAudience · MarketAnalysis · MarketOverview)

**What:** DS Port Batch 3.3c (aura-builder Sonnet). 7 new DATA organisms — the analytical core of the V0.2 report PDP. 7 `.tsx` files + 7 `.md` sidecar docs + `organisms/index.ts` updated + `GAPS.md` 7 entries marked ✅ PORTED.

**Organisms ported (7 NEW):**
- `SegmentationSection.tsx` — 7-card 2/3/2 staggered grid + gradient takeaways footer card (`--bg-card-takeaways`). `SegmentationCard` molecule ×7. Dot-pattern bg.
- `GrowthDriversChallenges.tsx` — 3-col `IconCard` grid. Challenge color `--rose-600` (NOT `--red-600` — ANTI-PATTERNS rule 19). Nested topic h4+p+ul per card. Stats strip (desktop flex / mobile 2-col).
- `MarketDataTable.tsx` — Generic `MarketDataTable<T>`. Keyboard-accessible sort (`<button>` inside `<th>`, `aria-sort`, Enter/Space). Paywall blur overlay. ProgressBar column slot. `useReducedMotion()` guard. WAI-ARIA 28 fix.
- `CompetitiveLandscape.tsx` — 3-card summary row (chart slot + top players + dynamics bars). Sortable companies table with keyboard-accessible headers + paywall. `ComparisonParameterCard` grid. `AnalysisCard` gradient footer.
- `TargetAudience.tsx` — `StakeholderCard` ×N + `aside` callout (`p-8` padding). Benefit checklist `<ul aria-label>`. 3-col lg layout (`col-span-2` + `col-span-1`). Full-width fallback.
- `MarketAnalysis.tsx` — Chart-slot organism (`ChartSlotItem` = title + chart ReactNode). Main full-width + optional 2-col sub-charts. Callers MUST set `accessibility.enabled: true` (documented in JSDoc — organism cannot enforce on ReactNode).
- `MarketOverview.tsx` — `OverheadText` + `SectionHeader title={}` + `BodyText` paragraphs + 4-col stat grid (StatTile sub-component) + `TextCard` future outlook + `TimelineCard` timeline periods. `--content-max-width` aliased to `--container-page` per TOKEN-GAP-REPORT §2.18.

**Fixes applied across all 7:**
- `Container` API: `maxWidth="page"` (NOT `variant="page"` — atom has no variant prop)
- `SectionHeader` API: `title={heading}` (NOT children — discovered by reading atom source)
- Section padding: `py-12 md:py-20` (NOT V0.2 `py-24 lg:py-32` — SPACING-CANON §1.1)
- Zero hardcoded hex/px — all via `var(--token-name)` or Tailwind token classes

**Why:** Complete the DATA organism tier for V0.2 report PDP. These 7 organisms cover the analytical chapters (market overview · segmentation · growth drivers · market size data · competitive landscape · target audience · market analysis charts). Unblocks V0.2 report PDP page assembly.

**Reversal:** Delete 7 `.tsx` + 7 `.md` files from `core-v2/src/organisms/`, revert `organisms/index.ts` Batch 3.3c section, revert 7 GAPS.md entries to `🔴 MISSING`.

---

## 2026-05-19 — Batch 3.3b · CHROME organisms · Navbar + Footer + ReportHeroSection + 6 supporting molecules

**What:** DS Port Batch 3.3b (aura-builder Sonnet). 9 new components — most user-visible chrome layer.

**Molecules ported (6 NEW):**
- `DropdownPanel.tsx` — Industries mega-menu panel. 2-col grid. Glass bg (`--glass-header-bg`). Framer AnimatePresence enter/exit. ESC + outside-click + blur-trap close. Focus returned to trigger on ESC.
- `CmdKSearchTrigger.tsx` — Search trigger only (not the menu). `aria-keyshortcuts="Meta+k"`. Shows Search icon + placeholder + `<kbd>⌘K</kbd>` hint. Consumer wires command palette.
- `MobileMenu.tsx` — Full-screen slide-down mobile nav. Backdrop + panel. Body scroll lock while open. Focus-first on open. ESC + backdrop click close. Contains stacked nav links + Sign In + brand Demo CTA Button.
- `TrustBar.tsx` — ISO 27001 + Award badge + client logo pills strip. Horizontal scroll on mobile. `onDark` surface prop.
- `PreviewCard.tsx` — Report preview glass card (10px radius). WindowControls molecule top. Chapter/title pair. Mini bar chart (decorative). PaywallOverlay on lower section. `whileHover` scale + shadow. `surface` dark/light prop.
- `PaywallOverlay.tsx` — Blur wrapper + absolute overlay w/ PREMIUM Badge + CTA Button. `blurPx` + `surface` + `showCTA` props. `role="status"` on overlay.

**Organisms ported (3 NEW):**
- `Navbar.tsx` — Full Ken Research navigation. Utility bar (h-8 black lg+) + glass header (h-56px sticky). Composes: DropdownPanel, CmdKSearchTrigger, MobileMenu, Button, HamburgerIcon. Active nav underline = neutral black (NOT brand-red — ANTI-PATTERNS rule 19). Demo CTA only red element.
- `Footer.tsx` — Dark bg-black footer. TrustBar top. 5-col grid (Brand 2-col + Industries + Services + Company). Bottom bar: dynamic copyright + Privacy/Terms links + LinkedIn/Twitter inline SVGs. Composes: TrustBar, Container.
- `ReportHeroSection.tsx` — Cinematic-dark report PDP hero. 5-col 3/2 grid. Optional video bg + gradient overlays + grid texture + 2 Framer floating orbs (reduced-motion guarded). Left: Breadcrumb + badges + SectionLabel + h1 + description + CTARowResponsive + MetadataStrip. Right (lg+): PreviewCard. Scroll-down indicator. `data-variant-section="cinematic"`.

**Index exports updated:**
- `core-v2/src/molecules/index.ts` — 6 new exports added
- `core-v2/src/organisms/index.ts` — 3 new exports added

**GAPS.md updated:** 6 molecule entries + 3 organism entries marked ✅ PORTED 2026-05-19

**TSC:** green (0 errors)

**Reversal:** delete the 9 .tsx files + remove their exports from index.ts files

---

## 2026-05-19 — Batch 3.3a · Map UI story · TabStrip molecule + MapChart organism + RegionalComparison organism

**What:** DS Port Batch 3.3a (aura-builder Sonnet). 3 new components: TabStrip molecule (tablist pattern), MapChart organism (choropleth via react-simple-maps), RegionalComparison organism (V0.2 port + enhanced). Deps installed: `react-simple-maps@^3.0.0` + `topojson-client@^3.1.0` + types.

**Dependencies added to core-v2:**
- `react-simple-maps@^3.0.0` — MIT · choropleth SVG map. Peer warning: declares `react@^16-18` · works fine with React 19. Monitor for v4.
- `topojson-client@^3.1.0` — MIT · TopoJSON feature parsing.
- `@types/react-simple-maps@^3.0.6` + `@types/topojson-client@^3.1.5` (devDeps)

**Molecule ported (NEW):**
- `TabStrip.tsx` — Accessible tablist tab-strip. `role="tablist"`. `role="tab"` per option. `aria-selected` + `aria-controls` wiring (scoped by `useId()` per instance). Framer Motion `layoutId` animated underline (unique per instance). Arrow/Home/End keyboard nav. `TabStripPanel` companion: `role="tabpanel"` + AnimatePresence crossfade 150ms. `useReducedMotion()` skips animation. Size `sm`/`md`. RENAMED from ViewToggle to avoid collision with existing ViewToggle ATOM (icon grid/list switch).

**Organisms ported (NEW + V0.2 port):**
- `MapChart.tsx` — Choropleth SVG map via `react-simple-maps`. Color ramp: linear interpolation across brand purple-100→purple-600 (6-step hex fallbacks for SVG). Tooltip (fixed position, Card-styled). Legend (5-step gradient strip). Hover highlight (fill darken + 2px stroke). Keyboard: interactive regions `role="button" tabindex="0"` · Enter/Space fires `onRegionClick`. Screen reader: SVG `<title>`+`<desc>` + per-region `aria-label`. `useReducedMotion()` disables fill transition. 3 color ramp options: purple/periwinkle/coral. 3 projections: geoMercator/geoEqualEarth/geoNaturalEarth1.
- `RegionalComparison.tsx` — V0.2 port + enhanced. Desktop 2-col: MapChart (left ChartCard) + DatasetPreviewTable (right ChartCard). Mobile single-col: TabStrip switch. LabelHeadingPair header. SectionWrapper container. Paywall via `accessTier` prop delegated to DatasetPreviewTable. Replaces V0.2 Highcharts bar + inline Table blur pattern.

**V0.2 changes on port:**
- Highcharts bar chart → MapChart choropleth
- Inline Table+blur → DatasetPreviewTable molecule (access-tier aware)
- Always-2-col layout → responsive with TabStrip mobile toggle
- Hardcoded `px-[84.375px]` + `text-[48px]` → SectionWrapper + LabelHeadingPair tokens
- paywall=true → accessTier prop

**GAPS.md updated:** RegionalComparison ✅ PORTED · MapChart ✅ PORTED (NEW — not in original GAPS list) · TabStrip ✅ PORTED (NEW — not in original GAPS list).

**TSC:** green.

**Files touched:**
- `design-system/core-v2/package.json` (UPDATED — 4 new deps)
- `design-system/core-v2/src/molecules/TabStrip.tsx` (NEW)
- `design-system/core-v2/src/molecules/TabStrip.md` (NEW)
- `design-system/core-v2/src/molecules/index.ts` (UPDATED — TabStrip export)
- `design-system/core-v2/src/organisms/MapChart.tsx` (NEW)
- `design-system/core-v2/src/organisms/MapChart.md` (NEW)
- `design-system/core-v2/src/organisms/RegionalComparison.tsx` (NEW)
- `design-system/core-v2/src/organisms/RegionalComparison.md` (NEW)
- `design-system/core-v2/src/organisms/index.ts` (UPDATED — MapChart + RegionalComparison exports)
- `design-system/core-v2/docs/GAPS.md` (UPDATED — 3 entries marked ✅ PORTED)

**Reversal:** `pnpm remove react-simple-maps topojson-client @types/react-simple-maps @types/topojson-client` · delete 8 new files · revert index.ts exports.

---

## 2026-05-19 — Batch 3.2c organisms · 4 D3 organisms ported · MindMap engine + Scope + Taxonomy

**What:** DS Port Batch 3.2c (aura-builder Sonnet). 4 organisms from brief. D3 mind map engine used by Scope + Taxonomy chapters. Fixes highest-visibility v0.3 regressions (invented flat lists for both sections).

**D3 dependencies added:**
- `d3-hierarchy@^3` · `d3-zoom@^3` · `d3-selection@^3` · `d3-transition@^3` · `d3-ease@^3` + matching `@types/*` — installed via `pnpm add` in `core-v2/`

**Organisms ported (NEW):**
- `MindMap.tsx` — D3 hierarchy tree. Collapsible nodes. 800ms easeCubicInOut transitions. `interactionMode='full'|'preview'`. Node pill + badge + bezier links. `useReducedMotion()` → DURATION=0. `role="img"` + per-node `role="button" tabindex="0"`. V0.2 MindMap.tsx:1-386 canonical.
- `MindMapModal.tsx` — Fixed 95vw×90vh modal. Search bar + close button. Focus-trap (Tab cycles). ESC + backdrop close. Body scroll locked. `openerRef` focus-return. AnimatePresence fade+slide. `useReducedMotion()` instant. V0.2 MindMapModal.tsx canonical.
- `ScopeOfReport.tsx` — Chapter 2 section. OverheadText + LabelHeadingPair header. 600px MindMap preview card. Hover overlay (gradient + Maximize2 icon, Framer whileHover). Opens MindMapModal on click/Enter. Dot pattern bg optional. V0.2 ScopeOfReport.tsx:240-313 canonical.
- `TaxonomyTree.tsx` — Chapter taxonomy section sharing MindMap engine. Two variants: `preview` (card+modal) | `inline` (full 700px canvas + search bar + hint text). `bgVariant` white/warm/subtle. V0.2 MindMapDemo.tsx canonical.

**Anti-regression locked:** Both ScopeOfReport + TaxonomyTree explicitly block the v0.3 flat-list regression in JSDoc (WHEN NOT rules) and GAPS.md entries updated to ✅ PORTED.

**Files touched:**
- `design-system/core-v2/src/organisms/MindMap.tsx` (NEW)
- `design-system/core-v2/src/organisms/MindMap.md` (NEW)
- `design-system/core-v2/src/organisms/MindMapModal.tsx` (NEW)
- `design-system/core-v2/src/organisms/MindMapModal.md` (NEW)
- `design-system/core-v2/src/organisms/ScopeOfReport.tsx` (NEW)
- `design-system/core-v2/src/organisms/ScopeOfReport.md` (NEW)
- `design-system/core-v2/src/organisms/TaxonomyTree.tsx` (NEW)
- `design-system/core-v2/src/organisms/TaxonomyTree.md` (NEW)
- `design-system/core-v2/src/organisms/index.ts` (UPDATED — 4 new exports)
- `design-system/core-v2/docs/GAPS.md` (UPDATED — 4 entries ✅ PORTED)
- `design-system/core-v2/package.json` (UPDATED — d3 deps added)

**Why:** V0.3 regressions ScopeOfReport→flat-list + TaxonomyTree→indented-list confirmed in GAPS.md. These are the highest-visibility missing organisms in the report PDP. Ported from V0.2 canonical (D3 engine is library-agnostic — no React 19 compat issues).

**Reversal:** `git rm` the 8 new files + revert organisms/index.ts last-block + revert package.json d3 deps + revert GAPS.md 4 entries.

---

## 2026-05-19 — Batch 3.2b organisms · 5 new organisms ported + 1 enhanced + 1 rewrote + 1 hook ported

**What:** DS Port Batch 3.2b (aura-builder Sonnet). 7 organisms from brief (TableOfContentsSidebar · KeyStatsStrip · ResearchMethodology · FAQSection · SampleReportPreview · AssociationStrip · FinalCTASection). Plus useScrollSpy hook.

**Organisms ported (NEW/UPDATED):**
- `TableOfContentsSidebar.tsx` — Sticky sidebar TOC. expanded 255px / collapsed 80px / mobile floating button. useScrollSpy hook drives active state. Neutral black circles (not brand-red per Anti-pattern §9). -right-4 collapse button. V0.2 canonical.
- `KeyStatsStrip.tsx` — 3-col stat strip. --bg-section-stats-tinted gradient bg. useAnimatedCounter per stat cell. StatItem wraps icon-box + tabular-nums value + label. V0_lite KeyStats.tsx canonical.
- `ResearchMethodology.tsx` — REWROTE simplified placeholder. Composes StepperHorizontal + MethodologyCard. Full section header. Active step drives card elevation. V0_lite ChapterMethodology.tsx canonical.
- `SampleReportPreview.tsx` — NEW. 3-state sidebar (open 280px / compressed 200px / minimal 60px). IntersectionObserver chapter tracking. Locked items show LockKeyhole. Chapter dividers border-t black/5. Mobile floating Contents button. V0_lite SampleReportPreview.tsx canonical.
- `AssociationStrip.tsx` — NEW. Trust strip: certifications left + logo pills right. report-store-legacy Footer trust bar canonical.
- `FinalCTASection.tsx` — ENHANCED. Added `showOrbs` prop (report PDP orbs bg, useReducedMotion guarded) + `singleCTA` prop (hides secondary button for single-CTA report PDP mode). Backward compat preserved.
- `FAQSection.tsx` — reviewed vs V0_lite canonical. Existing core-v2 version solid — no regression.

**Hooks ported (NEW):**
- `useScrollSpy.ts` — IntersectionObserver-based scroll-spy. Returns active section ID from array. rootMarginTop controls trigger zone. V0.2 canonical.

**Files touched:**
- `design-system/core-v2/src/organisms/TableOfContentsSidebar.tsx` (NEW)
- `design-system/core-v2/src/organisms/TableOfContentsSidebar.md` (NEW)
- `design-system/core-v2/src/organisms/KeyStatsStrip.tsx` (NEW)
- `design-system/core-v2/src/organisms/KeyStatsStrip.md` (NEW)
- `design-system/core-v2/src/organisms/ResearchMethodology.tsx` (REWRITE)
- `design-system/core-v2/src/organisms/ResearchMethodology.md` (NEW)
- `design-system/core-v2/src/organisms/SampleReportPreview.tsx` (NEW)
- `design-system/core-v2/src/organisms/SampleReportPreview.md` (NEW)
- `design-system/core-v2/src/organisms/AssociationStrip.tsx` (NEW)
- `design-system/core-v2/src/organisms/AssociationStrip.md` (NEW)
- `design-system/core-v2/src/organisms/FinalCTASection.tsx` (ENHANCED — showOrbs + singleCTA props)
- `design-system/core-v2/src/organisms/index.ts` (UPDATED — 4 new exports)
- `design-system/core-v2/src/hooks/useScrollSpy.ts` (NEW)
- `design-system/core-v2/src/hooks/useScrollSpy.md` (NEW)
- `design-system/core-v2/src/hooks/index.ts` (UPDATED — useScrollSpy export)
- `design-system/core-v2/docs/GAPS.md` (UPDATED — 6 organisms + 1 hook marked ✅ PORTED)

**Why:** Batch 3.2b — 7 layout + dense-data organisms needed for V1 product page PDP build.
**Reversal:** delete organism files + revert index.ts + revert GAPS.md entries.

---

## 2026-05-19 — Batch 3.2a molecules · 5 supporting molecules ported (stepper + FAQ-CTA + methodology-card + dataset-table + map-fallback)

**What:** DS Port Batch 3.2a (aura-builder Sonnet). 5 supporting molecules required by Batch 3.2 organisms.
All ported from canonical V0_lite_report-legacy + v1-product-page-ver0.3 sources.

**Molecules ported (NEW):**
- `StepperHorizontal.tsx` — Horizontal step-picker bar. Controlled via activeId+onStepChange. Active=bg-black-900+white, inactive=white+warm-500-border+coral-hover. ChevronRight separators. Mobile: hidden-scrollbar horizontal scroll with step-number badge only. sm+: justify-center with labels. Canonical: V0_lite ChapterMethodology.tsx:86-123.
- `FAQContactCTA.tsx` — "Still have questions?" card after FAQ list. Flex-col mobile, flex-row sm+. Gradient bg via --bg-card-takeaways token. Composes CTALink atom. Canonical: V0_lite FAQSection.tsx:127-139.
- `MethodologyCard.tsx` — Single card in 3-col ResearchMethodology grid. Icon-box + title + subtitle + ChevronRight-bullet list. Active=--shadow-card-active dual elevation. Gradient bg via --bg-card-methodology token. role=button + keyboard handler. Canonical: V0_lite ChapterMethodology.tsx:127-191.
- `DatasetPreviewTable.tsx` — Access-aware <table> molecule. publicRows/leadUnlockedRows/paid tiers. Ghost blurred row + "Unlock Full Dataset" CTA when rows hidden. Desktop table + mobile card-per-row fallback. Token-mapped from v0.3: --semantic-ink-* → black/--black-500, --border-soft (same name in editorial-light.css). Canonical: v1-product-page-ver0.3 charts/DatasetPreviewTable.tsx.
- `MapFallback.tsx` — Region share table with inline horizontal bar visualization. Replaces geo MapChart until @ken-research/charts ships it. Sorted desc by share. Highlight region = brand-red row + ★ Top badge. Bar: --purple-400 fill, --brand-red highlight. Migration TODO comment. Canonical: v1-product-page-ver0.3 charts/MapFallback.tsx.

**Files touched:**
- `design-system/core-v2/src/molecules/StepperHorizontal.tsx` (NEW)
- `design-system/core-v2/src/molecules/StepperHorizontal.md` (NEW)
- `design-system/core-v2/src/molecules/FAQContactCTA.tsx` (NEW)
- `design-system/core-v2/src/molecules/FAQContactCTA.md` (NEW)
- `design-system/core-v2/src/molecules/MethodologyCard.tsx` (NEW)
- `design-system/core-v2/src/molecules/MethodologyCard.md` (NEW)
- `design-system/core-v2/src/molecules/DatasetPreviewTable.tsx` (NEW)
- `design-system/core-v2/src/molecules/DatasetPreviewTable.md` (NEW)
- `design-system/core-v2/src/molecules/MapFallback.tsx` (NEW)
- `design-system/core-v2/src/molecules/MapFallback.md` (NEW)
- `design-system/core-v2/src/molecules/index.ts` (UPDATED — 5 new exports)
- `design-system/core-v2/docs/GAPS.md` (UPDATED — 2 entries ✅ PORTED + 3 new ported entries)

**Why:** Batch 3.2 organisms (ResearchMethodology, FAQSection, etc.) require these molecules pre-ported. Anti-pattern Cat 13.8 — never re-implement atoms inline in organism.
**Reversal:** Delete the 5 new .tsx + .md files · revert index.ts to pre-Batch-3.2a · revert GAPS.md entries.

---

## 2026-05-19 — Batch 3.1c molecules · 9 molecules ported (heading + stat + CTA + breadcrumb + accordion + controls + metadata + chart)

**What:** DS Port Batch 3.1c (aura-builder Sonnet). Last sub-batch of Stage 3.1 primitives.
All 9 molecules ported from V0_lite_report-legacy + V0.2-for-ds canonical sources.

**Molecules ported (NEW):**
- `LabelHeadingPair.tsx` — SectionLabel + SectionHeading + optional BodyText. Canonical section-header block used 10+ times in V0_lite. Enforces `--pair-label-heading` + `--pair-heading-description` spacing.
- `StatPairRow.tsx` — 3-col stat strip (`grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8`). Composes 3× InlineStats atoms. Canonical from V0_lite HeroSection:349-379.
- `CTARowResponsive.tsx` — 3-tier responsive CTA pair. Mobile stacked + tablet row + desktop lg row. Composes 2× Button atoms. Canonical from V0_lite HeroSection:285-345.
- `Breadcrumb.tsx` — Accessible nav breadcrumb with dropdown panel. Framer AnimatePresence panel + `useReducedMotion`. ARIA complete (aria-current=page · aria-expanded · aria-haspopup). NOTE: type renamed `BreadcrumbNavItem` (was `BreadcrumbItem`) to avoid collision with `MegaBreadcrumb` organism export.
- `AccordionItem.tsx` — Single bordered FAQ card. Per-item chrome `border border-black/10 rounded-[--radius-sm]`. Framer height animation. Controlled + uncontrolled modes. Canonical from V0_lite FAQSection:81-127.
- `WindowControls.tsx` — macOS 3-dot chrome row + label. `aria-hidden` decorative. light/dark color scheme. Canonical from V0_lite HeroSection:462-477.
- `MetadataStrip.tsx` — 5-col label-value `<dl>/<dt>/<dd>` strip with `divide-x` separators. 2-col mobile grid. `--text-xs` labels (uppercase) + `--text-nav` values. Canonical from V0_lite HeroSection below-CTA.
- `ChartTitleHeader.tsx` — Chart block header: title + optional subtitle + optional legend dots + optional info icon. Token-decoupled port of V0.2 `chart-title-header.tsx`.

**Sidecars written (NEW · `.md` per molecule):**
- `LabelHeadingPair.md` · `StatPairRow.md` · `CTARowResponsive.md` · `Breadcrumb.md`
- `AccordionItem.md` · `WindowControls.md` · `MetadataStrip.md` · `ChartTitleHeader.md`

**index.ts:** 8 new exports added.
**GAPS.md §3:** 8 molecule rows marked ✅ PORTED 2026-05-19.

**TSC:** `pnpm tsc --noEmit` — green (0 errors).

**Why:** Batch 3.1c per PORT-PLAN.md. Closes Stage 3.1 primitives. Unlocks organism ports (HeroSection, FAQSection, KeyStatsStrip, ResearchMethodology) in Stage 3.2.

**Reversal:** Delete `core-v2/src/molecules/LabelHeadingPair.tsx|StatPairRow.tsx|CTARowResponsive.tsx|Breadcrumb.tsx|AccordionItem.tsx|WindowControls.tsx|MetadataStrip.tsx|ChartTitleHeader.tsx` and their `.md` sidecars. Remove Batch 3.1c block from `molecules/index.ts`. Re-mark GAPS.md entries 🔴 MISSING.

---

## 2026-05-19 — Batch 3.1b atoms · 7 NEW atoms ported (Type + Stat) + NextSectionCTA verified

**What:** DS Port Batch 3.1b (aura-builder Sonnet). Type atoms from V0.2-for-ds · Stat atoms from V0_lite canonical.

**Atoms ported (NEW):**
- `SectionHeader.tsx` — 4-prop combo (chapter + title + heading + subtitle). Locks eyebrow→h2→lede spacing sequence. Token refactor: V0.2 `text-3xl` → `--text-30` · `text-sm` (13px) → `--text-xs` · `leading-tight` → `leading-[1.25]` per rule 22a · `--radius-md(10px)` → `--radius-sm` · `mb-16` → `--section-header-mb`.
- `OverheadText.tsx` — brand-red uppercase eyebrow span. Inline-flex, gap-2 for optional icon sibling. Token: `--text-xs` + `--font-weight-bold` + `--tracking-label-wide`.
- `BodyText.tsx` — paragraph wrapper. `spacing="first"` (mt-6 via --space-6) / `"follow"` (mt-4 via --space-4). Token refactor: V0.2 `text-base (14px)` → `--text-sm (16px)` · `text-black-500` → `var(--black-500)`.
- `StatPair.tsx` — label-value pair. 3 orientations: vertical / vertical-label-first / horizontal. Semantic `<dl><dt><dd>`. tabular-nums value.
- `StatBadge.tsx` — mini trend/change/neutral/emphasis pill badge. 4 variants with tinted bg. Token: `--text-xs` + `--radius-xs` + `--space-1`. Note: V0.2 canonical stat-badge uses `--radius-md(10px)` → refactored to `--radius-xs(5px)` per token gap report.
- `IconBox.tsx` — tinted icon container. 6 colour palettes. sm=44px / md=48px. Radius: `--radius-sm(10px)`. Token refactor: V0.2 `--radius-md` → `--radius-sm`.
- `InlineStats.tsx` — composes IconBox + StatPair. vertical (default) / horizontal. Canonical KeyStats StatItem pattern (L69-118).

**Atoms verified:**
- `NextSectionCTA.tsx` — ✅ exists. Solid impl. No changes.

**Sidecars written:** SectionHeader.md · OverheadText.md · BodyText.md · StatPair.md · StatBadge.md · IconBox.md · InlineStats.md

**index.ts:** 7 new exports added.

**GAPS.md:** 7 MISSING → ✅ PORTED · 1 ⚠️ verify → ✅ VERIFIED.

**Quality gate:** `pnpm tsc --noEmit` — run after log entry.

**Why:** Batch 3.1b per PORT-PLAN.md. Type + Stat atoms unlock StatPairRow molecule (Batch 3.1c) and SectionHeader composite used in 20+ chapter sections.

**Reversal:** Remove 7 new atom files + sidecar .md files. Revert index.ts exports. Revert GAPS.md entries.

---

## 2026-05-19 — Batch 3.1a atoms · 10 atoms verified/ported from report-store-legacy

**What:** DS Port Batch 3.1a (aura-builder Sonnet). Canonical source: report-store-legacy. Atoms audited against source, fixed, and sidecars written.

**Atoms touched:**
- `Button.tsx` — fixed `fontStyle()` bug: `lg` was getting `--button-font-md`; `xs` used non-standard token. Now all 5 sizes correctly mapped.
- `AnimatedArrow.tsx` — added `duration` prop for CTALink's 250ms use case. Previously hardcoded 300ms.
- `CTALink.tsx` — VERIFIED. `--typography-size-*` tokens confirmed in `tokens.css`. No change.
- `InlineLink.tsx` — VERIFIED. Always-visible underline is deliberate improvement over canonical.
- `FilterChip.tsx` — REWRITTEN. Previous core-v2 = dismiss chip (display-only, X button). Canonical = toggle chip (active/inactive, Check icon, 44px). Consumers updated.
- `FilterCheckbox.tsx` — REWRITTEN. Previous core-v2 = plain button. Canonical = custom 16×16 checkbox box with inset shadow + Check icon. FilterAccordion consumer updated.
- `LogoButton.tsx` — focus ring updated from hardcoded black to `--color-brand-red` token.
- `HamburgerIcon.tsx` — VERIFIED. No changes.
- `MenuItem.tsx` — VERIFIED. More advanced than canonical (adds danger/iconBg/subtitle).
- `IconButton.tsx` — N/A. Not in canonical source map. `Button iconOnly=true` covers this.

**Sidecars written:** Button.md · AnimatedArrow.md · CTALink.md · InlineLink.md · FilterChip.md · FilterCheckbox.md · LogoButton.md · HamburgerIcon.md · MenuItem.md

**Consumers fixed:** `molecules/ActiveFilterChip.tsx` (removed FilterChip dep, inlined DismissChip), `molecules/FilterAccordion.tsx` (selected→checked, onClick→onToggle)

**Quality gate:** `pnpm tsc --noEmit` green · no TS errors.

**Why:** Batch 3.1a per PORT-PLAN.md. Canonical-first: read source before writing. Closed FilterChip + FilterCheckbox API drift that would have caused silent visual regression in listing pages.

**Reversal:** `git revert` commits for this batch. Consumer molecules would need to revert to old FilterChip/FilterCheckbox APIs.

---

## 2026-05-19 — Batch 3.0 token foundation · 18 blocks → base.css

**What:** Appended ~47 new CSS custom properties to `design-system/core-v2/src/styles/base.css` `:root` block (unlayered · cascade-safe). Backup at `base.css.bak`. `FOUNDATIONS.md` updated with block inventory + conflict notes.

**Blocks added:**
- Legacy compat aliases (`--warmBg` · `--warmBorder` · `--content-max-width`)
- Type tokens (`--text-nav-helper/md/13/24/30/32`)
- Weight tokens (`--font-weight-light/semibold/bold`)
- Tracking tokens (`--tracking-display-tight` · `--tracking-button` · `--tracking-label-tight/wide/x-wide` · `--tracking-nav` · `--tracking-nav-loose`)
- Leading tokens (`--leading-stat-label`)
- Color (`--black-25`)
- Glass suite (9 tokens: `--glass-bg/border/glow/accent/text/text-muted/hover` + header variants)
- Shadows (5 tokens: `--shadow-card-rest/active` · `--shadow-brand-button/-hover` · `--shadow-search-hero`)
- Spacing (`--space-14` · `--space-20`)
- Motion easing (`--ease-smooth/arrow/card-lift`) + duration (`--duration-medium/shimmer`)
- BG compositions (`--bg-section-stats-tinted` · `--bg-card-methodology` · `--bg-card-takeaways`)
- Pattern tokens (`--pattern-opacity/grid-size/dot-size/dot-position`)

**Conflicts resolved:** `--leading-snug` (pre-existing 1.3 kept · TOKEN-GAP-REPORT wanted 1.25 → flag for Aura review) · `--shadow-card-hover` (pre-existing kept) · `--duration-instant/fast/normal/slow/slowest` (pre-existing kept · only gap tokens added).

**Why:** Stage 3.1 of PORT-PLAN.md — token foundation precedes any component port. All 3 legacy projects (V0_lite · V0.2 · report-store) reference these tokens during port.

**Reversal:** `cp base.css.bak base.css` — removes all 18 blocks cleanly.

**Verification:** `pnpm tsc --noEmit` clean · v0.3 dev server HTTP 200 · no visual regression (pure additions).

---

## 2026-05-13 — Final handover-readiness sprint · 16-step plan execution

**4WH-validated plan (per AURA master rules)** · executed in single session post-audit.

**Step 1 · Token aliases** — Added 30 OG-compat CSS variable aliases to `editorial-light.css` + `cinematic-dark.css`. Resolved 14 broken runtime references (`--bg-warm` · `--text-2xl` etc.) in ported Phase 2 organisms.

**Step 3 · JSDoc 4WH backfill** — Added formal WHY/WHAT/WHEN/WHEN-NOT/HOW headers to 15 priority files (Button · Card · Badge · CTALink · ContactModal · TextLink · SectionHeading · SectionWrapper · HeroSection · CTABanner · ProductHero · FeaturedCarousel · StatsRow · BrowseGrid · CaseStudyNavbar). Upgrades existing docblocks to canonical 4WH structure.

**Step 4 · Populated `core-v2/docs/COMPONENT_REFERENCE.md`** — Replaced 45-LOC stub w/ ~600-LOC decision-tree doc · intent → component → import → key props for all 168 components · per layer · adapter pattern guide. SINGLE AI lookup doc.

**Step 5 · Workspace `COMPONENT_REFERENCE.md`** → 13-line redirect to core-v2 canonical. Killed 98 stale OG-style `@/app/components/X` paths that previously misled AI.

**Step 6 · DESIGN.md** — Added Adapter pattern section + 4 A11y rules (aria-prohibited-attr · aria-valid-attr-value · definition-list · skip-link). Documents NEW capabilities.

**Step 7 · `4WH_AUDIT.md`** → 50-line stub pointing to inline JSDoc + coverage table. Killed references to dead OG docs.

**Step 8 · `pnpm verify` script** — `scripts/verify.sh` w/ 6 gates: raw `<button>` · `[#hex]` arbitrary · `[Npx]` arbitrary · hardcoded hex · `max-w-[` arbitrary · typecheck. Wired to all 5 projects (core-v2 zero-tolerance · 4 consumers warning-mode). F1+F2 prevention automated.

**Step 9 · `git init` + initial commit** — `.gitignore` updated (Lighthouse intermediate reports excluded). Commit `5cec9db` · 2461 files · 486,834 insertions.

**Step 10 · Workspace root `README.md`** — Top-level intro · project map · run commands · stack table · for-tech and for-design entry doc pointers.

**Step 11 · `reports-pdp-v2/.env.example`** — Template for NEXT_PUBLIC_API_URL · NEXTAUTH_* · NEXT_PUBLIC_GTM_ID · NEXT_PUBLIC_GA_ID · NEXT_PUBLIC_LEADS_API_URL · HIGHCHARTS_LICENSE.

**Step 12 · `HANDOVER_DELIVERY.md` + `docs/API_CONTRACT.md`** — Single tech-team entry doc (shipping list · roadmap · 18-step intake checklist · evidence package). Django endpoint spec (12 endpoints · response shapes mirror `src/lib/mock-data.ts` + `@kenresearch/design-system/types`).

**Step 12.5 · Extended `workflows/ROUTING.md` `pre-handover` workflow** — Added 3 sub-steps (11 HANDOVER_DELIVERY update · 12 API_CONTRACT revision · 13 git commit handoff).

**M1 · Commented-code audit** — reports-pdp-v2 avg 16 commented lines/file (high · for future cleanup) · V0_lite_report avg 4/file (healthy).

**M2 · `docs/WORKSPACE-MAP.md`** — Header updated to 2026-05-13 reflecting Phase 1-3 + handover-readiness state.

**M6 · `qa-screenshots/README.md`** — Visual baseline regeneration + diff workflow guide for tech-team.

**Files created (10):** `scripts/verify.sh` · `README.md` · `HANDOVER_DELIVERY.md` · `docs/API_CONTRACT.md` · `projects/reports-pdp-v2/.env.example` · `projects/reports-pdp-v2/qa-screenshots/README.md` · `~/.claude/.../memory/feedback_aura_master_rules.md` (earlier this session) · `.git/` · 15 .tsx files updated w/ JSDoc

**Files edited (12):** `core-v2/src/styles/editorial-light.css` + `cinematic-dark.css` · `core-v2/docs/COMPONENT_REFERENCE.md` · `design-system/COMPONENT_REFERENCE.md` · `design-system/DESIGN.md` · `design-system/4WH_AUDIT.md` · 5 `package.json` (core-v2 + 4 consumers) · `workflows/ROUTING.md` · `docs/WORKSPACE-MAP.md` · `HANDOVER_TRACKER.md` previously · MEMORY.md

**Outcome:**
- ✅ DS renders correctly (broken vars fixed)
- ✅ AI picks correctly (decision-tree doc · correct paths)
- ✅ AI drill-down works (15 priority files have inline 4WH · rest via decision tree)
- ✅ F1+F2 v1 product page failures PREVENTED at build (`pnpm verify`)
- ✅ Tech can clone+install+run+understand in 30 min (git · README · HANDOVER_DELIVERY)
- ✅ Django team has API spec (`docs/API_CONTRACT.md`)
- ✅ No stale/lying docs (4WH_AUDIT trimmed · COMPONENT_REFERENCE redirected · all paths correct)
- ✅ 2 projects formally `ready-for-tech` w/ proper delivery package

**Outstanding (deferred to future sprints):**
- DS verify gates flag 44 raw `<button>` + 31 `[#hex]` + 312 `[Npx]` in OG-ported organisms (pre-existing · catalogged for future cleanup sprint)
- V0_lite_report · V0.2_report · report-store · topnav-v32 cleanups → ready-for-tech
- ESLint workspace config (tech-team owns)
- Storybook (deferred · decision-tree replaces)
- CI/CD setup (tech ops)

**Reversal:** `git reset --hard HEAD~1` (initial commit · full reset possible). Or per-file `git diff HEAD -- <path>`.

---

## 2026-05-13 — Path A + C · DS core-v2 ready-for-tech · reports-pdp-v2 v2b complete

**Path A — DS core-v2 → ready-for-tech**
- Added `tsconfig.build.json` excludes for `_consumer-coupled/` subdirs · `pnpm build` clean (dist generated w/ .d.ts + .d.ts.map for all subpath exports)
- Created `design-system/core-v2/STATUS.md` + `HANDOVER.md` (library-variant gate · adapter pattern · 100% OG coverage · open issues: ESLint setup · Storybook deferred · FigmaButtonComparison doc-only)
- `HANDOVER_TRACKER.md` core-v2 row: `active` → `ready-for-tech`

**Path B — SKIPPED**
- Audit revealed report-store + V0.2_report are scaffold-only (NavbarShell + Logo only · no organisms imported from local). V0_lite_report sections are PDP-style, distinct from Phase 1-3 DS case-study organisms. No consumer migration needed.

**Path C — reports-pdp-v2 v2b polish complete**
- New `tests/modal-a11y.spec.ts` · 7/7 pass · validates LeadFormModalProvider (role=dialog · aria-modal · aria-labelledby · focus-into-modal · ESC closes + restores · Tab+Shift+Tab trap · backdrop click · close-X)
- Lighthouse mobile prod-build (Next 16.2.4 prod · localhost:3100): **Perf 91 · A11y 100 · BP 100 · SEO 100** (FCP 1.1s · LCP 3.5s · CLS 0 · TBT 40ms · TTI 3.5s · SI 1.1s)
- 6 a11y fixes inline applied:
  - `EcosystemTierGrid.tsx` · `CompetitorLandscapeModule.tsx` · `CompetitorComparisonTable.tsx` · `ValueChainStepper.tsx` — added `role="img"` to logo placeholder divs/spans w/ `aria-label`
  - `TaxonomyTree.tsx` — `aria-controls` conditional on `open` state (was firing aria-controls to non-existent target when closed)
  - `ChallengesSolutionsTable.tsx` · `RegulatoryCardStack.tsx` — metadata `<div>` w/ Badges moved OUTSIDE `<dl>` (axe `definition-list` rule)
  - `ReportDetailPage.tsx` — added `<span id="main-content">` alias for TopNavigation's built-in SkipLink (default href=`#main-content`)
- Added `reports-pdp-v2/README.md` + `HANDOVER.md` (PRD · stack · routes · 30 modules · 5 access tiers · mock data · v2b polish queue handed to tech)
- `HANDOVER_TRACKER.md` reports-pdp-v2 row: `cleanup` → `ready-for-tech`

**Reversal:** `git diff HEAD design-system/core-v2 projects/reports-pdp-v2 HANDOVER_TRACKER.md docs/CHANGELOG.md` then revert specific hunks.

---

## 2026-05-13 — DS port Phase 1-3 · 11 hooks + 13 atoms→organisms + 15 organism adapters · 136 → 168 components (100% OG)

**Continuation of 2026-05-13 batches 1-8. User said "go with your recommendations" · executed Phase 1-3 plan sequentially.**

**Phase 1: Hook lift (OG → core-v2/src/hooks/)**
- 11 hooks ported: `useActiveSection` · `useScrollDirection` · `useHeroVisibility` · `useSectionProgress` · `useScrollAnimation` · `useResponsiveGutter` · `useReadingProgress` · `useMagneticEffect` · `useCrossfade` · `useMountTransition` · `useProgressiveLoad` · `useCounter`
- All `'use client'` directives added · JSDoc 4WH preserved · types exported alongside hooks
- Hooks barrel `src/hooks/index.ts` updated
- Typecheck gate: clean

**Phase 2: 13 deferred atoms → organisms (post hook-lift)**
- Files moved `src/atoms/_consumer-coupled/` → `src/organisms/`: HeroSection · ChallengesSection · MethodologySection · ImpactSection · ResourcesSection · ClientContextSection · EngagementObjectivesSection · TestimonialSection · ValuePillarsSection · FinalCTASection · ReadingProgressBar · StickyCTA
- `Navbar.tsx` → `CaseStudyNavbar.tsx` (renamed to avoid collision w/ existing `organisms/navbar/` modular nav from topnav-v32)
- Bulk sed: `@/app/hooks/` → `../hooks/` · `@/imports/` → `../assets/figma/` · molecule paths fixed
- Figma SVG paths: created `src/assets/figma/` w/ `svg-oz6ytj1r6m.ts` + `svg-fodxwe3cpi.ts` (used by FinalCTASection · CaseStudyNavbar)
- Dep added: `react-responsive-masonry@^2.1.7` (ResourcesSection)
- Fix-ups: removed unused destructured hooks · unused lucide imports · fixed `MethodologySection` ref-callback to use block body (TS strict ref-typing) · removed invalid `focusRingColor` CSSProperty (StickyCTA) · `showArrow` → `animatedArrow` (Button prop name)
- `FigmaButtonComparison.tsx` stays in `src/atoms/_consumer-coupled/` — doc-page demo only · figma SVG imports · not a runtime atom
- Typecheck gate: clean (DS + all 4 consumers)

**Phase 3: 15 deferred organisms · adapter pattern (data injection via props)**
- Files moved `src/organisms/_consumer-coupled/` → `src/organisms/`: AnalystPicks · CardListing · CustomResearchCTA · DailyDataHighlights · FeaturedResearch · FiltersPanel · IndustrySectorsGrid · IndustrySidebar · IndustrySpotlight · KeyMarketIndicators · ListingToolbar · RecentlyViewed · RecommendedForYou · ReportPreview · ReportStoreHero
- **NET NEW:** `src/types/index.ts` — public type registry: ReportItem · IndustryData · RegionData · StatData · DataHighlight · AnalystPick · SectorItem · SortKey · SortOption · ActiveChip · ReportFilters · CTAConfig · HeroConfig (lifted from OG `data.ts` + `useReportFilters` · data-coupled refs removed)
- **Package exports:** added `"./types": "./src/types/index.ts"` · root barrel re-exports types
- **Adapter pattern applied:** each organism that previously imported `@/app/components/data` now takes `data` props (e.g. `<AnalystPicks picks={ANALYST_PICKS} />` · `<DailyDataHighlights highlights={DATA_HIGHLIGHTS} />` · `<FiltersPanel filters={filters} regions={FULL_REGIONS} publishYears={PUBLISH_YEARS} />`)
- Thin-wrapper organisms (CustomResearchCTA · KeyMarketIndicators · ReportStoreHero) now have sensible default copy via props · still composable
- Side-port: `src/atoms/industryIconMap.ts` (industry→Lucide icon map · used by IndustrySectorsGrid · safe `getIndustryIcon()` getter w/ Cpu fallback)
- All organism props typed via exported `interface XxxProps`
- Typecheck gate: clean (DS + all 4 consumers · localhost reports-pdp-v2 → 200 in 156ms)

**Final core-v2 state (after Phase 1-3 + earlier batches 1-8):**
| Layer | Count | Notes |
|---|---|---|
| Hooks | 23 | 12 prior + 11 new (Phase 1) |
| Atoms | 42 | 41 prior + industryIconMap; FigmaButtonComparison deferred (doc-only) |
| Molecules | 26 | Unchanged |
| Organisms | 38 | 23 prior + 13 promoted from atoms (Phase 2) + 15 adapter-ported (Phase 3) — less 1 ReportCard moved to molecules previously |
| Shadcn UI | 46 | Unchanged |
| Types | 13 public | NEW public layer |
| **Total** | **~168 components** | OG coverage complete except FigmaButtonComparison demo file |

**Breaking change risk:** None observed. Consumers (`report-store` · `V0.2_report` · `V0_lite_report` · `reports-pdp-v2`) had been importing DS via local copies, not the deferred organisms · all 4 typecheck clean post-port.

**Reversal:** `git checkout HEAD -- design-system/core-v2/src/{hooks,atoms,organisms,types,assets}` then revert package.json + tsconfig changes. Note: docs · memory · this CHANGELOG entry would need separate revert.

---

## 2026-05-13 — DS port batch 5-8 · expand atoms + 30 organisms + 9 more atoms · ~100 → ~136 components

**Continuation of 2026-05-13 batch 1-4. User said "proceed" · executed full sprint.**

**Batch 5: Expand atom APIs (gating Batch 6 molecules)**
- `Card` — added `padding="none"` · `onClick` · `style` · `as` · `aria-label` · `role="button"` + `tabIndex` + Enter/Space key handlers when clickable
- `Button` — added `size="xs"` (28px height · card footer CTAs)
- `Badge` — added themes `coral` · `periwinkle` · added `mode: 'light'|'dark'` prop
- `SectionHeading` — added `label` · `title` · `subtitle` · `action` · `endSlot` · `labelPulse` props (OG compat · `eyebrow` + `children` still work for backward compat)
- `StatCard` — `icon` made OPTIONAL

**Batch 6: Re-port 11 deferred molecules**
- ReportCard · ReportGridCard · AnalystPickCardB · CategoryListCard · DataHighlightCard · SurveyCard · SurveySkeleton · ResponseChart · QuestionPreview · FilterAccordion · MobileFilterSheet
- Side-port: CategoryListItem + FilterCheckbox atoms
- Bulk sed: `showArrow` → `animatedArrow` (Button prop name) · AnimatedArrow color = enum (`'white'|'black'|'brand'`)

**Batch 7: Port 30 OG organisms**
- 15 self-contained organisms ported to `core-v2/src/organisms/`: BrowseGrid · CTABanner · ComparisonTable · FeaturedCarousel · IndustryFocusBanner · NewsletterSignup · ProductHero · ProductPageTemplate · QuickAccessBar · ResearchMethodology · StatsRow · TestimonialsRS · TopDownloads · TrendingTopics · UpcomingReports
- 15 deferred to `core-v2/src/organisms/_consumer-coupled/` (excluded from build): AnalystPicks · CardListing · DailyDataHighlights · CustomResearchCTA · FeaturedResearch · IndustrySectorsGrid · KeyMarketIndicators · FiltersPanel · ListingToolbar · IndustrySidebar · ReportPreview · IndustrySpotlight · ReportStoreHero · RecentlyViewed · RecommendedForYou
- Deferred reason: depend on `@/app/components/data` · `@/app/hooks/useReportFilters` · `@/app/components/industryIconMap` — consumer-level not DS-level

**Batch 8: Port 9 more atoms · defer 14 consumer-coupled**
- 9 ported: ContactModal · ResourceCard · FilterCheckboxItem · FilterIndustryItem · FilterSearchInput · FilterSectionHeader · AnimatedArrowQuickRef · SpacingHelpers (multi-export)
- 14 deferred to `core-v2/src/atoms/_consumer-coupled/`: ChallengesSection · ClientContextSection · EngagementObjectivesSection · FigmaButtonComparison · FinalCTASection · HeroSection · ImpactSection · MethodologySection · Navbar · ReadingProgressBar · ResourcesSection · StickyCTA · TestimonialSection · ValuePillarsSection
- Deferred reason: use OG-specific hooks (useScrollAnimation · useHeroVisibility · useScrollDirection · useActiveSection · useSectionProgress · useResponsiveGutter) + figma SVG imports from `@/imports/*`

**Tsconfig:** added `src/organisms/_consumer-coupled` + `src/atoms/_consumer-coupled` to `exclude`. Files still copied locally for reference · just not part of typecheck/build.

**Final core-v2 state (after batches 1-8):**
| Layer | Count | OG total | Coverage |
|---|---|---|---|
| Atoms | **41** (14 deferred) | ~50 | 82% |
| Molecules | **26** | 27 | 96% |
| Organisms | **23** (15 deferred · incl 8 navbar) | 30 | 77% |
| shadcn ui/ | **46** | 47 | 98% |
| **Total** | **136** | **157** | **87%** |

**Verification:**
- core-v2 `pnpm typecheck` clean
- All 4 consumers (V0_lite_report · V0.2_report · report-store · reports-pdp-v2) TS clean
- reports-pdp-v2 localhost `http://localhost:3000/reports/australia-cold-chain-market-2022-2027` returns 200

**Locked memory + workflow updates:**
- `feedback_ds_port_workflow.md` — port mechanics · bulk sed · skip-and-defer rule
- `feedback_craft_skills.md` — aura-craft skill suite
- `feedback_page_build_process.md` — 9-step process
- `skills/aura-craft/reference/DS_PORT_WORKFLOW.md` — canonical port playbook

**Next sprint scope:**
- Port deferred 29 consumer-coupled files to project-level (consumer projects build their own data adapters · then import organisms back)
- OR build DS-layer mock data + hooks if consumer projects share enough patterns
- Decide: lift `useActiveSection` · `useScrollDirection` · `useHeroVisibility` from consumer to DS hooks (they're generic utility hooks · not consumer-specific)

---

## 2026-05-13 — DS port batch 1-4 · OG `Design_system_vs_26` → core-v2 · 34 → ~100 components

**Why:** User flagged 2026-05-12 that core-v2 was stripped subset of OG Figma DS (`Design_system_vs_26 (og and final)/`). Multiple consumer projects' UI differed because v2 builder only had 20 atoms · OG has 50+ · 47 shadcn ui primitives missing entirely.

**Method (locked in `feedback_ds_port_workflow.md` memory + `skills/aura-craft/reference/DS_PORT_WORKFLOW.md`):**
1. Installed Anthropic `frontend-design` skill (verified MIT · 0 alerts · `npx skills add`)
2. Port mechanics: read OG · preserve JSDoc 4WH DocBlock · token-translate · adjust import paths · write to core-v2 · update barrel · `pnpm typecheck` after each batch
3. Bulk-copy + sed approach for pure files (motion molecules · shadcn primitives)
4. Skip-and-defer rule for molecules needing DS API expansion

**Changes:**

1. **Batch 1 Tier 1 atoms (5 + iconColors helper)** — Container · FadeInSection · Tooltip · IconBadge · Label
2. **Batch 2 Tier 2 atoms (4)** — CollapsibleSection · ViewToggle · NextSectionCTA · SubtleVariantSwitcher
3. **Batch 3 molecules (13 + 2 atom side-ports)** — CardReveal · HorizontalScroll · ScrollFade · RevealImage · BackToTop · EmptyState · SkeletonCard · CardMetaRow · CardFooterRow · IndustryBadge · LoadMoreSentinel · ActiveFilterChipBar · CompletionBadge · SidebarPanel · plus side-port atoms FilterChip + ImageWithFallback
4. **Batch 4 shadcn ui/ (46 primitives)** — wholesale copy of OG `ui/` folder. accordion · alert · alert-dialog · aspect-ratio · avatar · badge · breadcrumb · button · calendar · card · carousel · chart · checkbox · collapsible · command · context-menu · dialog · drawer · dropdown-menu · form · hover-card · input · input-otp · label · menubar · navigation-menu · pagination · popover · progress · radio-group · resizable · scroll-area · select · separator · sheet · sidebar · skeleton · slider · sonner · switch · table · tabs · textarea · toggle · toggle-group · tooltip
5. **`@kenresearch/design-system` deps added** (17 packages):
   - 16 radix-ui: alert-dialog · aspect-ratio · avatar · collapsible · context-menu · dropdown-menu · hover-card · label · menubar · navigation-menu · progress · radio-group · slider · switch · toggle · toggle-group
   - External: cmdk · vaul · input-otp · react-day-picker · react-resizable-panels · sonner · embla-carousel-react · recharts · next-themes · react-hook-form
6. **Tokens added** to `editorial-light.css` — `--container-page/content/narrow/prose/compact` width hierarchy (matches OG `theme.css` values)
7. **Barrel exports updated** — `atoms/index.ts` adds 14 named exports + types · `molecules/index.ts` adds 14 exports · new `ui/index.ts` (46 re-exports) · `package.json` adds `"./ui"` + `"./ui/*"` subpath exports
8. **Workflow doc written** — `skills/aura-craft/reference/DS_PORT_WORKFLOW.md` (port mechanics · tier list · anti-patterns · token compat plan)
9. **Memory written** — `feedback_ds_port_workflow.md` indexed in MEMORY.md
10. **OG folder reserved** — `/Design_system_vs_26 (og and final)/` read-only forever · NEVER modify · NEVER delete (user explicit ask)

**Deferred (11 molecules · need DS API expansion):**
AnalystPickCardB · CategoryListCard · DataHighlightCard · FilterAccordion · MobileFilterSheet · ReportCard · ReportGridCard · ResponseChart · SurveyCard · SurveySkeleton · QuestionPreview

Root cause: OG uses `<Card onClick>` · `<Card style>` · `<Button size="xs">` · `<Badge theme="coral">` · `<Badge mode="...">` — core-v2 atom APIs don't have these props. Next sprint: expand atom APIs · then port deferred molecules.

**Verification:**
- core-v2 `pnpm typecheck` clean
- All 4 consumer projects typecheck clean (V0_lite_report · V0.2_report · report-store · reports-pdp-v2)
- reports-pdp-v2 localhost `http://localhost:3000/reports/australia-cold-chain-market-2022-2027` returns 200

**Final state:** 31 atoms + 15 molecules + 8 organisms + 46 ui primitives = **100 components** (was 34). Closer to OG's 157 · still gap of 57 (30 OG organisms + 11 deferred molecules + 16 misc).

---

## 2026-05-12 — Craft-pass step added (page-build 8 → 9 steps) + aura-craft skill + DESIGN.md + 4 external skills installed

**Why:** reports-pdp-v2 build same day passed all 5 hard-ban greps + DS atom compliance + a11y + TypeScript clean, but user flagged page lacked craft layer ("did you do UI/UX development or just structure?"). Gap = aura-builder + aura-qa both audit structure · neither audits craft. New gate needed between COMPOSE and SHOW FIRST CUT.

**Changes:**

1. **New workspace skill** — `skills/aura-craft/SKILL.md`. Step 4.5 craft-pass. 6 craft principles + 7 hard-bans (on top of builder's 5). Trigger phrases · invocation patterns · craft-pass workflow.

2. **New design vocab** — `design-system/DESIGN.md` (awesome-claude-design DESIGN.md format). Brand voice · visual personality · tokens · patterns · variant rules · section-type defaults table · 92-5-3 color hierarchy · cinematic-vs-editorial decision rule · decisions log.

3. **3 external reference repos cloned** (MIT-licensed · 2MB total · read-only reference · NOT global plugins):
   - `skills/_external/ui-ux-pro-max-skill/` (NextLevelBuilder · 161 reasoning rules · color/font/UX CSVs)
   - `skills/_external/interface-design/` (Dammyjay93 · craft principles · system.md persistence concept)
   - `skills/_external/awesome-claude-design/` (VoltAgent · DESIGN.md format spec)

4. **Anthropic webapp-testing skill installed** — `npx skills add https://github.com/anthropics/skills --skill webapp-testing`. Symlinked Claude Code at `.agents/skills/webapp-testing/`. Playwright + axe + Lighthouse harness wired by Anthropic.

5. **Page-build chain updated** — `skills/aura-design/chains/page-build.md` 8 steps → 9 steps. Step 4.5 CRAFT-PASS inserted between COMPOSE and SHOW FIRST CUT. Skip rule = explicit "skip craft-pass" user opt-out only.

6. **Aura-builder template updated** — `workflows/agents/aura-builder.md` appended CRAFT MODE section · invoked when brief contains "CRAFT MODE" / "craft-pass" · reads aura-craft SKILL.md + DESIGN.md first.

7. **CLAUDE.md updated** — page-build canonical line (8 → 9 steps) · skill-routing table adds aura-craft row · "8 workspace + 4 external = 12 active" budget.

8. **SKILL_ROUTING.md updated** — aura-craft trigger row · 2026-05-12 additions section.

9. **Memory written** — `~/.claude/projects/.../memory/feedback_craft_skills.md` · indexed in MEMORY.md as 2nd entry (after page-build process).

10. **LEARNINGS + DECISIONS log entries** — see same-day entries.

**Active skill count:** 10 → 12 (+aura-craft workspace · +webapp-testing Anthropic).
**Disk:** +2MB external reference repos + ~50KB new workspace files.
**Net process change:** +1 mandatory step in page-build (craft-pass).

**Validation:** Will execute craft-pass on reports-pdp-v2 (37 organisms · same day) as first real-world test. If craft-pass produces visible UI/UX uplift on localhost, skill suite proven. If not, iterate.

---

## 2026-05-12 — Page-build process formalized (8 steps · 2 HARD user-blocking gates) + workspace prune

**What:**
- **`skills/aura-design/SKILL.md`** — replaced "Recipe router (10-step)" section w/ "Page-build process — 8 steps (CANONICAL)". 8 steps: INTAKE · RESEARCH (write RESEARCH.md) · PROPOSE+BLOCK · COMPOSE · SHOW FIRST CUT · PROPOSE QA · EXECUTE QA · EXIT. Two HARD gates user must approve: step 3 + step 5.
- **`skills/aura-design/chains/page-build.md`** — full rewrite. 200+ LOC canonical chain. Step-by-step spec w/ user-facing BLOCK formats · spawn patterns · anti-patterns · cross-refs.
- **`workflows/agents/aura-builder.md`** — Recipe-driven rules section rewritten. 12 hard rules (was 7). Added: DS atom compliance HARD GATE (rule 6) · spacing system enforcement (rule 7) · grid system enforcement (rule 8) · type system enforcement (rule 9) · color discipline (rule 10) · motion enforcement (rule 11). Added self-grep block builder runs BEFORE reporting done (raw button · max-w arbitrary · hardcoded hex · arbitrary text classes).
- **`workflows/agents/aura-qa.md`** — Recipe-conformance gate extended. Added 7 sub-checks (C1-C7): raw `<button>` grep · `max-w-[` grep · `bg-[#` grep · `text-[` grep · hardcoded hex grep · arbitrary section padding grep · token usage ratio. Same gates builder self-runs · QA double-checks.
- **`workflows/ROUTING.md`** — page-build workflow entry replaced. 8-step table w/ Gate column (step 3 + 5 = HARD). Why-this-works section · anti-patterns chain-level · incident references.
- **`CLAUDE.md`** — added page-build canonical pointer to global header section (auto-loaded every session).
- **Memory: `~/.claude/projects/.../memory/feedback_page_build_process.md`** — NEW. Full process + apply rules + anti-patterns. Indexed in MEMORY.md (top pointer).
- **Workspace prune:** deleted `design-system/recipes/_archive/` (28KB · already-collapsed PDP recipe variants) + `projects/topnav-v32/_dev-notes/` (1.1MB · cleanup status) + `projects/report-store-legacy/_dev-notes/` (380KB · frozen-readonly) + `projects/competition-benchmarking-listing-v01/_dev-notes/` (380KB · exploration leftovers). Kept active project _dev-notes. Total reclaim ~2MB.
- **`docs/LEARNINGS.md`** — 3 new Active entries dated 2026-05-12 (process formalized · DS atom compliance HARD GATE · canonical consumer reference reads mandatory).

**Why:** User correction after reports-pdp-v2 build: built 34 bespoke 600-LOC organisms w/ raw `<button>` + arbitrary spacing + arbitrary Tailwind classes BEFORE showing first cut. Skipped PROPOSE+BLOCK and SHOW FIRST CUT gates. ~10000 LOC rework cost. Root cause: skill chain existed (`chains/page-build.md`) but enforcement was soft. Now HARD. Visible across all AI agents · all team members reading workspace.

**Reversal:** revert via git diff (all single-commit changes to 6 files + 1 new memory). Memory deletion = `rm ~/.claude/projects/.../memory/feedback_page_build_process.md` + remove MEMORY.md row. Skill chain restoration = read git history (chains/page-build.md prior version).

---

## 2026-05-11 — reports-pdp-v2 v2a build complete (PRD-driven 5-phase rebuild)
**What:**
- **Phase 1B (foundation):** `AccessLevelGate.tsx` (5-tier auth gate w/ tier-numeric mapping) · `AnalyticsProvider.tsx` (Context + `useAnalyticsPush` + 21 typed events + auto `product_page_view` + scroll-depth 25/50/75/100) · `SchemaInjector.tsx` (server-component, 8+ JSON-LD blocks) · route wiring in `src/app/reports/[slug]/page.tsx` (generateMetadata + generateStaticParams + OG + Twitter card).
- **Schema patches:** `HeroCockpit.heroImageUrl?: string` added · `AnalyticsContext.{reportSlug, reportId, accessTier}` added · `AnalyticsEventType` union extended w/ `section_view` + `use_case_filter` (now 21 events).
- **Phase 2A (hero + nav):** `HeroCockpitOrganism.tsx` (4-tab cockpit w/ AnimatePresence layoutId underline · base-ui Tabs · breadcrumb · proof bullets · CTAs w/ analytics · trust strip · metadata) · `StickyNavBar.tsx` (sticky-top scroll-driven show/hide via `useMotionValueEvent` · jump-links w/ `section_nav_click` · mobile overflow menu · backdrop blur). Dead-code delete: legacy `ReportPDPHero.tsx`.
- **Phase 2B (research modules):** `ReportIntelligenceSnapshot.tsx` (6-card grid PRD §10) · `KeyStatsStrip.tsx` (count-up animated, reduced-motion safe) · `ExecutiveSummaryModule.tsx` (2-col w/ contextual CTA) · `ReportScopeModule.tsx` (responsive tabs/accordion) · `ReportFactsBlock.tsx` (RSC-compatible, schema.org/Dataset microdata for GEO/AI extraction). Bg alternation rhythm wired in `EditorialALayout.tsx`.
- **Phase 3A (chart layer):** `ChartCardOrganism.tsx` (8-zone wrapper · 9 `@ken-research/charts` Highcharts components mapped via dynamic import ssr:false · opacity-only Framer entrance per Recharts -1/-1 LEARNING · filter chips w/ `chart_filter_change` analytics) · `DatasetPreviewDrawer.tsx` (slide-in drawer, focus trap, ESC, restore focus, table preview, `dataset_unlock_click`) · `InfoWallOverlay.tsx` (`bg-white/85 backdrop-blur` lead-gated/metered overlay) · `PaywallOverlay.tsx` (`bg-neutral-900/95` paid overlay, no numeric pricing per CLAUDE.md rule).
- **Phase 3B (forms + cross-sell):** `LeadFormModalProvider.tsx` (global modal manager · `openForm(type, context)` Context API · focus trap · ESC · backdrop) · 4 forms (`SampleLeadForm` · `DatasetUnlockLeadForm` · `AnalystCallLeadForm` · `CustomizationLeadForm`) + `shared.tsx` (FormInput/Textarea/Select/SubmitButton/LegalText/FormSuccess primitives) · `TableOfContentsOrganism.tsx` (gated chapter list w/ `<details>/<summary>` zero-JS) · `FAQOrganism.tsx` (accordion + inline schema.org/FAQPage JSON-LD for crawler proximity) · `RelatedReportsOrganism.tsx` (scroll-snap carousel). Wired ALL CTA open-points: Hero · StickyNav · ExecutiveSummary · ChartCard zone8 · InfoWall · Paywall · DatasetDrawer · TOC "Preview Full TOC". Dead-code delete: orphan `ReportFAQ.tsx` + `RecommendedForYou.tsx`.
- **QA pass (aura-qa Sonnet):** axe 0 critical / 0 serious (desktop + mobile 375px) · Lighthouse desktop **98 perf / 96 a11y / 100 BP / 100 SEO** · 4 screenshots saved to `qa-screenshots/v2a-final/` · 11 inline fixes applied (color-contrast on 7 organisms · SVG aria-label fix · scrollable-region focusable fix · FAQ definition-list semantic fix · mock-data title double-prefix bug fix).
- **Aura decisions on QA findings:** Limitations bg → white (breaks facts/limitations same-bg) · ReportIntelligenceSnapshot h3 eyebrow `text-xs` → `text-sm` (preserves hierarchy + improves AT reading) · Modal form a11y deep-test deferred to v2b (portal needs headed browser) · `--variant-editorial-text-tertiary` token registration deferred to next DS sweep (AA-safe fallback `#6b6b6b` shipped inline) · Dual-section DOM cleanup deferred to v2b architectural pass.
- **STATUS.md** → `cleanup` (was `exploring`), 8 of 12 pre-handover gate items passed, 4 open (Lighthouse mobile-prod-build run, README, HANDOVER doc, conventional commits).
- **HANDOVER_TRACKER.md** updated (v2 now `cleanup`, previously `exploring`).
- **LEARNINGS.md** added 4 entries dated 2026-05-11: phase-split keeps Sonnet under 32K cap · CSS `var()` fallback must be AA-safe · Highcharts SVG empty `aria-label` axe rule · undeclared `var(--variant-editorial-text-tertiary)` token gap.

**Final build:** Next 16.2.4 Turbopack · 1816ms compile · TS clean · ESLint clean · 6 prerendered pages · framer-motion only (NO GSAP/Lenis).

**Why:** PRD-driven rebuild of Reports PDP per `Ken_Research_V1_Product_Page_Rebuild_PRD.pdf` (54 sections). V1 frozen as archive. V2a = full build phase complete · v2b reserved for polish/architecture cleanup pre-handover.

**Reversal:** revert via git diff. Full git history of build phases preserves intermediate state. Phase 1B foundation files (AccessLevelGate, AnalyticsProvider, SchemaInjector, LeadFormModalProvider) are isolated enough to delete independently if needed.

## 2026-05-08 — Token efficiency hardening — 6 read-side rules baked into agent + workflow + memory layer
**What:**
- **New memory file** `~/.claude/projects/.../memory/feedback_token_efficiency.md` — 6 enforced rules (graphify mandatory at >50 files / >100k tokens · slice big files via `Read(offset, limit)` · parallel independent tool calls · scoped grep · memory-then-verify · skip TodoWrite for <3 step tasks) w/ trace markers + per-task self-check + anti-pattern table.
- **MEMORY.md index** — added pointer entry for new memory file.
- **CLAUDE.md** — replaced 1-line "Token rules" w/ 6-bullet token discipline section + trace marker examples · cross-link to memory.
- **`.claude/agents/aura-builder.md` + `workflows/agents/aura-builder.md` (dual-path)** — replaced single `graphify threshold` line w/ 6-rule token discipline section.
- **`.claude/agents/aura-qa.md` + `workflows/agents/aura-qa.md` (dual-path)** — same 6-rule discipline (compact form for QA scope).
- **`workflows/ROUTING.md`** — replaced single `graphify rule` line w/ 6-rule token discipline section · expanded trace markers section to include `→ Read: <path>:N-M (slice)` · `→ Step N · K parallel calls` · `→ Scan: memory <file> (no re-read)` markers per rule.
**Why:** User direction "work on Real Token Win Opportunities." Caveman = ~25% output compression. Read-side discipline = 5-10× wins per task. Bottleneck is file reads + tool calls + redundant scans, not output prose. Rules bake into per-task discipline via trace markers + agent template instruction · become enforced, not aspirational.
**Reversal:** revert via git diff. Memory file deletion = `rm ~/.claude/projects/.../memory/feedback_token_efficiency.md` + remove MEMORY.md row. CLAUDE.md + ROUTING.md + agent templates restore via git.

## 2026-05-08 — Stack lock-in: Framer Motion ONLY · GSAP + Lenis REMOVED · skill count 7→6
**What:**
- **Removed `gsap` + `@gsap/react` + `lenis`** from `package.json` of all 3 active projects (V0_lite_report · report-store · V0.2_report). `pnpm install` confirms `-3` packages cleared.
- **Deleted 3 `lenis-provider.tsx` files** (one per project · client component wrapping Lenis init).
- **Stripped `LenisProvider` import + `<LenisProvider>` wrapper** from 3 `app/layout.tsx` files.
- **Added native CSS smooth scroll** to `design-system/core-v2/src/styles/base.css`: `html { scroll-behavior: smooth }` + `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto } }` global.
- **Deleted `skills/gsap-scrolltrigger/`** workspace skill (GSAP no longer in stack). Active workspace skills: 7 → 6 (`aura-design` · `ken-research` · `page` · `frontend-design` · `webapp-testing` · `skill-creator`).
- **Rewrote `skills/aura-design/decisions/motion-router.md`** as Framer-only decision tree (state via `motion.*`+`AnimatePresence`, scroll-driven via `useScroll`+`useTransform`+`useInView`, smooth scroll = native CSS, banned patterns updated).
- **Updated motion sections in 4 surface files** (01-discovery · 02-report-store · 04-dashboards · 05-engagement) to Framer-only language. Removed "no Framer + GSAP same property" rules (single lib, rule moot).
- **Updated `chains/page-build.md`, `decisions/surface-picker.md`, `anti-patterns.md`** to drop GSAP/Lenis refs.
- **Synced agent templates** (`.claude/agents/{aura-builder,aura-mech,aura-qa}.md` + `workflows/agents/*` dual-path) — animation stack note + "stack-aware" exclusion lists updated.
- **Updated `CLAUDE.md` + `Quick_start_guide.md` + `workflows/ROUTING.md` + `skills/SKILL_ROUTING.md` + `skills/INDEX_BY_CATEGORY.md`** — animation rows + skill table + workflow library + decision tree now Framer-only.
- **Verified clean builds:** V0_lite_report 179kB · report-store 159kB · V0.2_report 159kB First Load JS (same as pre-removal — confirms GSAP/Lenis weren't load-bearing in actual code).
**Why:** User direction "do not downgrade Next/React/Tailwind, use latest framer motion, do not use gsap, lenis. use highcharts and customise. no need for GTM + Clarity + Crazy Egg." Wappalyzer scan of kenresearch.com confirmed dev-team prod uses Framer + Tailwind + shadcn/Radix + Lucide + NextAuth + Three.js 183 — NO GSAP, NO Lenis. Framer Motion handles all motion needs (state · scroll-driven · parallax · timeline · entrance). Native CSS handles smooth scroll. Removing 2 libs = smaller bundle + zero handover friction at merge time.
**Reversal:** restore via `pnpm add gsap @gsap/react lenis` per project + `git revert` for layout/CSS edits + `git checkout HEAD~ skills/gsap-scrolltrigger/` for skill restore. Per ADR `2026-05-08 Stack lock-in: Framer Motion ONLY` reversal trigger.

## 2026-05-08 — Deleted skills/_archive/ + 5 stray root files (~840 MB recovered)
**What:**
- Deleted `skills/_archive/` (73 dirs · 838 MB) after 6 weeks zero-use post-prune. Full list of 73 archived skill names captured in `docs/DECISIONS.md` 2026-05-08 ADR before delete.
- Deleted 5 stray root files: `--help-desktop.png` · `--help-mobile.png` · `--help-tablet.png` (1.6 MB Playwright screenshot leak from 2026-04-30 aura-qa run) + 2 empty dirs `dirs created/` + `echo/` (accidental Bash mkdir from typo).
- Updated `skills/INDEX_BY_CATEGORY.md` + `skills/SKILL_ROUTING.md` "Archived" sections — point at ADR for recovery list, drop references to `_archive/` folder.
**Why:** User direction "delete unnecessary skills." Archive sat untouched 6+ weeks. Recovery path = fresh install via `npx skills add <repo>` if any archived skill ever proves load-bearing (most are public). DECISIONS ADR captures full alphabetical list (73 names) so recovery doesn't depend on git archaeology.
**Reversal:** `npx skills add <repo>` per skill needed — see `docs/DECISIONS.md` 2026-05-08 "Delete `skills/_archive/`" entry for full list.

## 2026-05-08 — Sync system + architecture map shipped
**What:**
- **Memory writes:** `project_tightening_sprint_2026-05-08.md` (full sprint state · skills + workflows + decisions · resume pointers) + `feedback_cross_session_sync.md` (standing rule for cross-chat sync — sources of truth per concern · boot sequence · write discipline · failure modes). MEMORY.md index updated w/ both entries.
- **Architecture map:** `docs/SYSTEM-ARCHITECTURE.md` (700+ LOC) — 10 sections covering: macro 3-zone view (workspace / user-home / Anthropic cloud) · workspace tree · user-home persistent layer · cross-session sync flow diagram · operating model w/ skill+agent matrix · workflow execution flow (page-build example) · trace marker convention · system-level anti-patterns · recovery+audit · quick reference where-everything-lives table.
- **Sync system status:** confirmed already-shipped (per ADR 2026-05-07 "Aura cross-session activity log" option C log-only). 1027 entries in `~/.claude/aura/activity.jsonl`. PreToolUse + Stop hooks wired. NO auto-inject (memory-poisoning prevention). Cross-chat sync = file-system-mediated, not real-time push.
**Why:** User direction "save learnings and knowledge and we should have a system so everything is in sync if other agents or chats are open they should also be in sync · then draw a map for me what is where and how our system architecture works and how my files are stored." Memory writes capture sprint state + sync discipline. Architecture map = visual reference for where files live + how multiple chats stay coherent.
**Reversal:** `rm docs/SYSTEM-ARCHITECTURE.md memory/project_tightening_sprint_2026-05-08.md memory/feedback_cross_session_sync.md`. MEMORY.md index reverts via git diff.

## 2026-05-08 — `aura-design` Phase 2 COMPLETE — 12 files shipped
**What:** Finished Phase 2 of `skills/aura-design/` (locked at ADR 2026-04-30 since Phase 1).
- **Surfaces (4 new):** `surfaces/01-discovery.md` (homepage / sector landing — NYT × Linear × Stripe playbook), `02-report-store.md` (listing + detail + checkout — Stripe × Notion × Figma Community playbook), `04-dashboards.md` (Hex × Mode × Stripe Sigma × Coinbase Prime command-center playbook), `05-engagement.md` (client portal — Linear × Vercel × Stripe customer-portal patterns)
- **Decision-trees (5 new):** `decisions/chart-picker.md` (data-shape → Highcharts preset · banned types · color rules), `decisions/motion-router.md` (Framer / GSAP / Lenis / CSS routing · reduced-motion · perf budget), `decisions/brand-variant.md` (cinematic-dark vs editorial-light per surface · activator pattern · recipe LOCK), `decisions/surface-picker.md` (5-surface ID + recipe routing + skill chain), `decisions/density-picker.md` (marketing / reading / working / data-grid profiles + Tailwind v4 typography no-op LEARNING applied)
- **Brand-variant guides (2 new):** `variants/cinematic-dark.md` (5-overlay mesh signature · token swap table · brand-red treatment · component-on-dark adjustments), `variants/editorial-light.md` (warm off-white `#f5f2f1` rationale · drop-cap pattern · section alternation HARD GATE)
- **Workflow chains (1 new):** `chains/page-build.md` (6-step Aura Opus → aura-builder → aura-qa flow w/ trace markers · forcing functions · spawn pattern reference)
- **SKILL.md:** "Phase 1 status" line replaced w/ "Phase 2 COMPLETE 2026-05-08" + cross-link table (14 files total).
**Why:** User direction "proceed systematically and according to the plan" after Track 1+3+3b+4+2 done. Phase 2 = Aura's Ken-specific design knowledge layer — encodes 5 surfaces × 2 variants × decision-trees × workflow chain. Replaces ad-hoc Ken-design judgment w/ structured second-brain.
**Reversal:** `rm -rf skills/aura-design/{surfaces/01,02,04,05}-*.md skills/aura-design/{decisions,variants,chains}/`. SKILL.md status line revert via git diff.

## 2026-05-08 — Aura tightening sprint EXEC: Tracks 1+3+3b+4+2 complete (skills 79→7+3, workflows 11→9, paths refreshed core/→core-v2)
**What:**
- **Track 1 — Doc sanity sweep:** Updated stale `design-system/core/` v1 references → `design-system/core-v2/` across 8 docs (`CLAUDE.md` 4 sites · `Quick_start_guide.md` rewritten · `FOLDER_CONTEXT.md` rewritten · `skills/aura-design/SKILL.md` 2 sites · `.claude/agents/aura-builder.md` + `workflows/agents/aura-builder.md` dual-path · `HANDOVER_TRACKER.md` legacy DS rows). Skill counts refreshed everywhere.
- **Track 3 — Skill prune:** 79 workspace skills → 7 active. Archived 72 to `skills/_archive/` w/ README.md restoration path. Active set: `aura-design` · `ken-research` · `page` · `frontend-design` · `gsap-scrolltrigger` · `webapp-testing` · `skill-creator`.
- **Track 3b — Workflow narrow:** 11 workflows → 9. Folded `refactor` + `content-update` into `bug-fix`. Folded `a11y-perf-audit` into `pre-handover`. Kept `motion-pass` standalone, kept `component-build` standalone (DS evolution path), kept `impeccable-polish` (un-gated). Updated classifier table + per-workflow skill refs in `workflows/ROUTING.md`.
- **Track 4 — Agent template sync:** `aura-builder` + `aura-qa` (both `.claude/agents/` + `workflows/agents/` dual-path) updated. Stale `gstack` skill refs replaced w/ Playwright-native commands. `design-system-v26`/`design-system-dashboard` → `core-v2`. Stack note adds explicit Framer + GSAP + Lenis.
- **Track 2 — Skill index rewrite:** `skills/INDEX_BY_CATEGORY.md` rewritten as single what/where/why/when/how table covering 7 workspace + 3 external = 10 active skills. `skills/SKILL_ROUTING.md` slimmed to active-set trigger table + decision tree + token rules. CLAUDE.md skill-routing table cut to 11 rows.
**Why:** User direction "use selective skills + selective agents + selective workflows that are necessary, build/design/clean old code/convert to new tech stack." Per `docs/PLAN-2026-05-08-aura-tightening.md` Tracks 1-4 + 2.
**Reversal:** restore archived skills via `mv skills/_archive/<name> skills/<name>`. Per-doc edits visible in git diff (no separate backup needed).

## 2026-05-08 — `impeccable` reinstalled fresh from `pbakaus/impeccable` GitHub
**What:** Ran `npx -y skills add pbakaus/impeccable -g -y`. Skill installed to `~/.agents/skills/impeccable/` (canonical) w/ symlink at `~/.claude/skills/impeccable`. Recon found prior install missing despite ADR 2026-04-30 claim — never reinstalled or uninstalled at unknown point. Verified: SKILL.md (14 KB) · 36 reference docs · 21+ scripts (live-server, browser-session, modern-screenshot, csp-detect, design-parser) · 23 subcommands per `command-metadata.json` (craft/teach/document/extract/live/adapt/animate/audit/bolder/clarify/colorize/critique/delight/distill/harden/layout/onboard/optimize/overdrive/polish/quieter/shape/typeset) · Allowed-tool `Bash(npx impeccable *)`. Risk scores at install (LOWER than ADR claimed): Snyk -- · Socket 1 alert · Gen --. License: Apache 2.0 (based on Anthropic frontend-design skill).
**Why:** User instruction "install via this repo fully https://github.com/pbakaus/impeccable.git" after recon found install missing.
**Reversal:** `npx skills remove impeccable -g` or `rm -rf ~/.agents/skills/impeccable ~/.claude/skills/impeccable`.

## 2026-05-08 — `impeccable` un-gated (full use approved); graphify + caveman confirmed always-on
**What:**
- `skills/SKILL_ROUTING.md` — replaced "gated usage (Snyk Med, Gen High risk)" block w/ "full usage" subcommand routing table. Dropped confirm-per-change rule, dropped Bash-preview rule. Kept localhost-only for live-inject + frontend-projects-only scope.
- `workflows/ROUTING.md` — `impeccable-polish` workflow simplified 5 steps → 4 steps, removed "(gated, opt-in)" qualifier, removed risk-flag preamble line, removed per-step "wait for user OK" gates. Classifier table row de-gated.
- `CLAUDE.md` — skill table row "(gated, opt-in only)" → "un-gated 2026-05-08, full usage."
- `docs/DECISIONS.md` — new ADR "`impeccable` un-gated, full-use approved" added top of Active. Old ADR 2026-04-30 "Installed `impeccable` skill (gated)" marked superseded.
- `graphify` + `caveman` — already always-on per CLAUDE.md graphify-rule + caveman-hook config. No changes needed; confirmed full use.
**Why:** User instruction "impeccable skill is a good skill install it fully and remove gated rules use it fully, use graphify fully and use caveman fully." Prior gate created friction → never invoked in 6 weeks despite recurring polish need.
**Reversal:** restore prior ADR active status, restore SKILL_ROUTING gated block, restore ROUTING.md 5-step workflow w/ confirm-per-change. Backup not needed — git diff covers if rollback needed.

---

## 2026-05-08 — Aura tightening plan REVISED — aggressive prune (79 → 6 skills, 11 → 5+2 workflows)
**What:** Revised `docs/PLAN-2026-05-08-aura-tightening.md` per user direction "5-6 skills only, workflows useful for Ken Research only." Final 6 skills: `aura-design` · `ken-research` · `page` · `webapp-testing` · `gsap-scrolltrigger` · `skill-creator`. Final 5 workflows: `page-build` · `design-exploration` · `design-review` · `bug-fix` · `pre-handover` (+ `quick-answer` + `infra-change` special). Method: keep skill ONLY if (a) covers Ken-task category no other skill covers AND (b) Aura cannot replicate natively w/ Read/Edit/Write/Bash + memory + workflow templates. Each kept skill earns slot via deep domain knowledge or reusable assets (token catalogs, anti-pattern lists, eval suites, test harnesses). 71 skills move to `_archive/`, 2 deleted (`ken-research-workspace` empty + `impeccable` if uninstall confirmed). 6 workflows merged/dropped: `component-build`+`motion-pass` → `page-build`, `a11y-perf-audit` → `pre-handover`, `refactor`+`content-update` → `bug-fix`, `impeccable-polish` dropped.

## 2026-05-08 — Aura tightening sprint plan drafted (5 tracks)
**What:** `docs/PLAN-2026-05-08-aura-tightening.md` — master plan covering (1) doc sanity sweep [stale `core/` paths post-sprint], (2) USE_GUIDE indexes for skills + workflows w/ what/where/why/when/how columns, (3) skill prune 79 → 25 selective, (4) workflow narrow 11 → 8, (5) finish aura-design Phase 2 (12 deferred files). Recon found skill-in-progress = `aura-design` Phase 2; 8 docs w/ stale `design-system/core/` v1 path refs; FOLDER_CONTEXT skill count out of date (77→79); duplicate skill entries; empty `ken-research-workspace/` scaffold. Plan has 5 open questions blocking execution + checkable subtasks per track.
**Why:** User asked Aura to (a) find skill-in-progress, (b) update all docs/files w/ what/where/why/when/how mapping, (c) reduce skills not in use, (d) narrow to selective agents+workflows for build/design pages/planning/research. Master plan = single trackable artifact w/ checkboxes; survives session compaction.
**Reversal:** `rm docs/PLAN-2026-05-08-aura-tightening.md`. No code changes yet — execution gated on user approval of 5 open questions.

---

## 2026-05-08 — Sprint 2026-05-07 post-close: workspace map + consolidated learnings shipped
**What:**
- Added `docs/WORKSPACE-MAP.md` — single-screen topology snapshot (10 sections: top layout · pnpm workspace state · DS core-v2 inventory · per-project port state · recipe/pattern flow · variant system · sprint artifacts · active ADRs · quick locator · frozen/out-of-scope).
- Added `docs/SPRINT-LEARNINGS-2026-05-08.md` — 9-section consolidation of 11 sprint LEARNINGS grouped by theme (DS architecture · workspace mechanics · component-port mechanics · subagent ops · sprint mgmt · recipe-conformance · cross-cutting forcing functions · deferred carry-over · pointers).
**Why:** Post-sprint orientation — make state legible to next-sprint Aura w/o re-scanning 200 LOC of LEARNINGS + 250 LOC DECISIONS. Both docs cross-link back to authoritative LEARNINGS / DECISIONS / HANDOVER_TRACKER entries (single source of truth preserved, indexed for fast retrieval).
**Reversal:** `rm docs/WORKSPACE-MAP.md docs/SPRINT-LEARNINGS-2026-05-08.md`. Authoritative source remains LEARNINGS.md + DECISIONS.md + per-project audit files.

---

## 2026-05-08 — Sprint 2026-05-07 COMPLETE: 3 Vite/Figma-Make projects ported to Next 15 + DS heal Option B
**What:** Sprint summary across all 6 phases (A-F).
- **Phase A — Audits:** 3 projects audited (V0_lite_report, report-store, V0.2_report) + cross-project synthesis. POSITIVE list (30+ atoms/molecules/hooks/patterns to promote) + NEGATIVE list (11 anti-patterns DS must enforce). Sprint folder `docs/aura-sprint-2026-05-07-port/` w/ A1+A2+A3+A-synthesis docs.
- **Phase B — DS heal foundation:** B-DS-FORENSIC-v1-and-heal-plan.md (786 LOC, 22 forensic findings, 15-step plan) + B2-DS-patterns-backgrounds-deep-map.md (cinematic gradient mesh + section alternation HARD GATE + 92-5-3 hierarchy + utility classes). Option B chosen (fork v2 over heal-in-place) per 1207 inline-style sites + 436 hex literals + token namespace drift in v1.
- **Phase B3 — DS heal execution Steps 1-4:** `design-system/core-v2/` scaffolded (atoms+molecules+organisms+patterns+hooks+charts+lib+styles+playground+.storybook+docs+scripts). pnpm workspace at root. `tokens.json` extended w/ composition (cinematic mesh + brand red CTA + navbar glow + carousel masks + blur scale), chart palette (8-color), motion (duration/easing/stagger), shadow, spacing 4px-base 0..24, button (minWidth+height+px+font), z-index, semantic.section-bg, semantic.status, typography.size.navHelper+navPrimary + lineHeight.nav*. Editorial-light + cinematic-dark variant CSS w/ `[data-variant-section="cinematic"]` mesh activator. Highcharts theme + 5 presets (area/line/pie/bar/column) DS-token-only via runtime `readToken()` + `mergePreset()`. PATTERNS.md (300+ LOC) + ANTI_PATTERNS Cat 14 (Gradients) + lint stub.
- **Phase C — V0_lite_report port COMPLETE:** Renamed legacy + scaffolded Next 15 + 9 hooks + 20 atoms + 5 molecules + 8 organisms promoted to DS core-v2. 13 page sections wired in V0_lite_report (HeroSection cinematic-dark per KSA Coldchain ref + KeyStats + ReportHighlights + SampleReportPreview w/ SidebarTOC + 4 chapters + MobileTOC + PhaseCard + SlideshowSection + FAQSection + CTASection + Footer + NavbarShell + Logo + AnalyticsDashboard stub). Mock data 1086 LOC verbatim from legacy w/ TODO markers. `pnpm build` clean (179kB First Load JS, 5 prerendered pages).
- **Phase D — report-store foundation:** Renamed legacy + scaffolded Next 15. Mock-data gateway w/ 10 exports verbatim from legacy data.ts (413 LOC). NavbarShell + Logo wired. Build clean (159kB First Load JS). 110+ detailed section ports deferred consumer-driven per A2 audit.
- **Phase E — V0.2_report foundation:** Renamed legacy w/ STRUCTURE-only carry-over scope. Scaffolded Next 15. reportMeta (Qatar Fresh Herbs) verbatim. NavbarShell + Logo wired. Build clean (159kB First Load JS). Heavy rewrite per A3 audit deferred consumer-driven (estimate 9-13 working days). Cinematic-dark hero per KSA Coldchain ref. d3 mindmap kept per user.
- **Phase F — final logs:**
  - `HANDOVER_TRACKER.md` — 6 new entries (3 legacy `frozen-readonly` + 3 ports `cleanup`/`scaffold`)
  - `docs/DECISIONS.md` — 7 ADR entries (heal Option B, Highcharts standard, mindmap keep, V0.2 cinematic hero, navbar source topnav-v32, color-tokens-only rule, `.js` suffix rule, scaffold-only foundation Phase D+E)
  - `docs/LEARNINGS.md` — multiple Active entries throughout sprint
  - `docs/aura-sprint-2026-05-07-port/` — full audit + heal-plan + patterns + sprint trail
  - Memory pointers updated

**Workspace state at sprint close:**
- 4 active workspace packages: `design-system/tokens` + `design-system/core-v2` + 3 project consumers
- 3 legacy folders frozen read-only: `V0_lite_report-legacy`, `report-store-legacy`, `V0.2_report-legacy`
- v1 DS at `design-system/core/` + `design-system/dashboard/` UNTOUCHED (cutover deferred per Phase B3 step 14)
- All 3 consumers `pnpm typecheck` + `pnpm lint` + `pnpm build` clean

**Why:** Deliver 3 Vite/Figma-Make ports at our Next 15 + DS workspace + Tailwind v4 stack. DS healed via Option B fork (v1 too cluttered to heal-in-place). Foundation locked across all 3 ports — V0_lite_report fully ported (consumer-ready for QA gate); report-store + V0.2_report scaffolded for consumer-driven section ports.

**Reversal:** All entries reversible per individual entries (see prior CHANGELOG). Manual rollback: `mv V0_lite_report-legacy V0_lite_report_ver_7.05 && mv report-store-legacy report-store-v07 && mv V0.2_report-legacy V0.2_report_handover_file && rm -rf projects/{V0_lite_report,report-store,V0.2_report} design-system/core-v2`, revert pnpm-workspace.yaml + tokens.json (backup at `tokens.json.v0.1.0.bak`) + DECISIONS+LEARNINGS+HANDOVER_TRACKER entries.

---

## 2026-05-08 — Phase D foundation: report-store scaffolded + mock-data + NavbarShell wired
**What:**
- **Renamed** `projects/report-store-v07/` → `projects/report-store-legacy/` w/ `LEGACY-READONLY.md` marker.
- **Scaffold** `projects/report-store/` Next 15 (15 files): package.json (Next 15 + React 19 + Tailwind v4 + DS workspace + GSAP/Framer/Lenis/highcharts + three+three-globe + faker+MSW), tsconfig, next.config.ts (transpilePackages), postcss.config.mjs, .gitignore, .eslintrc.json, README.md, src/app/{layout.tsx (cookie-read variant + Lenis + NavbarShell), page.tsx (placeholder), globals.css (DS imports), lenis-provider.tsx}, src/lib/{mock-data.ts gateway, mock/data.ts}, src/components/{Logo.tsx, NavbarShell.tsx}, public/geo/.
- **pnpm-workspace.yaml** enables `projects/report-store`. `pnpm install` clean (existing core-v2 + tokens reused).
- **mock-data gateway**: 10 exports re-routed from legacy `data.ts` (413 LOC verbatim copied to `src/lib/mock/data.ts`): industries, reports, subcategoryTagMap, trendingTopics, regions, stats, dailyHighlights, analystPicks, bundles, upcomingReports.
- **Navbar reuse**: NavbarShell wraps DS `<TopNavigation>` (same pattern as V0_lite_report). Logo placeholder + Ken-red CTA injected via render-prop slots.
- `pnpm typecheck` + `pnpm lint` + `pnpm build` clean. 3.35 kB `/` page, 159 kB First Load JS, 4 static pages prerendered. Single Tailwind layer-order warning (cosmetic, same as V0_lite_report).

**DEFERRED — Phase D detailed section ports:** Hero w/ 3D globe (SSR-wrap via dynamic({ssr:false}), GeoJSON 417KB to public/geo/), FeaturedResearch, AnalystPicks, ExploreByRegion, IndustrySectorsGrid, IndustrySidebar (675 LOC), MobileFilterSheet (410 LOC), ReportCard (583 LOC list+grid), ListingToolbar+ListingContextBanner+CardListing kit, useReportFilters (465 LOC URL-state migration via useSearchParams+useRouter), Testimonials (10 figma:asset → public/), 47 ui/ shadcn primitives audit. 110+ component files = consumer-driven follow-up work, not blocker for sprint.

**Why:** Foundation locked = consumer can pick up section-by-section per audit `A2-report-store-audit.md` order. DS atoms/molecules/organisms ready for direct consumption. Atom layer (DS) = single source. Section composition = consumer.

**Reversal:** `mv projects/report-store-legacy projects/report-store-v07 && rm -rf projects/report-store && rm -rf node_modules/.pnpm/...report-store...`, revert pnpm-workspace.yaml + this CHANGELOG entry.

---

## 2026-05-08 — Phase C step 8 + COMPLETE: Next build clean, .js suffix bug fixed, Phase C closed
**What:**
- **`.js` suffix fix:** Next webpack (`transpilePackages` mode) couldn't resolve `from './Foo.js'` imports. TS bundler resolution accepted them. Stripped 82 sites in DS + 5 in consumer mock-data via sed regex. TS still clean.
- **Production build smoke clean:** `pnpm build` in V0_lite_report. 23.9 kB `/` page, 179 kB First Load JS, 5 static pages prerendered. Single Tailwind warning (`@layer` ordered before `@import tailwindcss` — cosmetic).
- **Phase C COMPLETE.** V0_lite_report Vite→Next port end-to-end:
  - 9 hooks · 20 atoms · 5 molecules · 8 organisms · 4 pattern stubs · Highcharts theme + 5 presets in `core-v2/`
  - 13 page sections wired in V0_lite_report (Hero/KeyStats/ReportHighlights/SampleReportPreview w/ SidebarTOC+4 chapters+MobileTOC+PhaseCard / Slideshow/FAQ/CTA/Footer/Navbar+Logo/AnalyticsDashboard)
  - Tokens canonical: composition/chart/motion/shadow/spacing/button/z-index/section-bg-semantic/status-semantic/nav-typography. All DTCG-compliant.
  - Variant CSS editorial-light + cinematic-dark via `@layer composition` + `[data-variant-section="cinematic"]` mesh activator.
  - Mock data centralized w/ `// TODO: replace w/ real API` markers (1086 LOC verbatim from legacy).
- `pnpm typecheck` + `pnpm lint` + `pnpm build` clean across DS + consumer.

**Why:** Phase C closes V0_lite_report. Foundation locked for Phase D (report-store) + Phase E (V0.2_report). All atoms/molecules/organisms reusable across 3 ports.

**Reversal:** Manual via prior CHANGELOG entries.

---

## 2026-05-08 — Phase C step 7: MobileTOC + SlideshowSection + AnalyticsDashboard wired (last 3 sections)
**What:** Closes Phase C V0_lite_report content layer.
- **MobileTOC** ported to `projects/V0_lite_report/src/components/sample-report/MobileTOC.tsx`. Floating bottom-bar (chapter pill) + bottom-sheet drag handle + chapter list w/ state icons + paywall CTA. `lg:hidden` (paired w/ desktop SidebarTOC). Phosphor `LockKey` → Lucide `Lock`. `motion/react` → `framer-motion`. Wired into `SampleReportPreview` (renders inside SectionWrapper, visible only when `#report` in viewport).
- **SlideshowSection** built minimum-viable at `projects/V0_lite_report/src/components/sections/SlideshowSection.tsx`. 12 placeholder slides (gradient backgrounds via `slides` mock) w/ 16:9 aspect + active slide hero + prev/next chevrons + thumbnail strip (auto-centers active) + paywall lock after slide 6. 480-LOC legacy variant DSL (light/dark + FloatingVariantSwitcher + 40 figma:asset imports + analytics tracking) deferred. `slides` mock + `SlideMeta` type at `src/lib/mock/slideshow.ts` (12 titles × 6-color palette).
- **AnalyticsDashboard stub** at `projects/V0_lite_report/src/components/AnalyticsDashboard.tsx`. Ctrl+Shift+A toggle + focus trap + Escape close (consumes `useFocusTrap` + `useKeyboardNavigation` from DS hooks). 246-LOC legacy w/ live metrics tracker deferred — `useAnalytics` 229-LOC localStorage tracker is post-handover work. Stub renders modal w/ TODO note. Per user decision: KEEP, no dev gate.
- **page.tsx** composes full sequence: ScrollProgress → HeroSection → KeyStats → ReportHighlights → SampleReportPreview → SlideshowSection → FAQSection → CTASection → Footer → ScrollToTop → AnalyticsDashboard.
- `pnpm typecheck` + `pnpm lint` clean.

**Why:** Closes V0_lite_report content layer. All 13 page sections + dev tools accounted for. Slideshow + Analytics deliberately scoped down (real assets/tracker = post-handover). Visual diff vs legacy + dev server smoke = step 8.

**Reversal:** `rm projects/V0_lite_report/src/components/{sections/SlideshowSection.tsx,AnalyticsDashboard.tsx,sample-report/MobileTOC.tsx}`, revert `lib/mock/slideshow.ts` + mock-data.ts + sample-report/SampleReportPreview.tsx + sections/index.ts + sample-report/index.ts + page.tsx.

---

## 2026-05-08 — Phase C step 6: useAnimatedCounter + StatCard promoted to DS; HeroSection (cinematic-dark) wired
**What:**
- **`useAnimatedCounter` hook** promoted to `core-v2/src/hooks/useAnimatedCounter.ts`. Inlined twice in legacy (HeroSection + KeyStats); now shared. Framer `useInView` w/ `amount: 0.5, once: true`. Eased via easeOutCubic. JSDoc `@promotedFrom V0_lite_report`.
- **`StatCard` molecule** promoted to `core-v2/src/molecules/StatCard.tsx`. Props: `icon` (LucideIcon), `value` string, `label`, optional `color`/`delay`/`animate`. `animate=true` → count-up via useAnimatedCounter. Format detection: `B`/`%`/`+`/integer suffix. Hover glow + scale via Framer Motion. Token-driven default color (`var(--color-accent-purple)`).
- **`reportMeta` mock data** at `projects/V0_lite_report/src/lib/mock/report-meta.ts` — drives Hero glass card + sub. Fields: region, monthLabel, title, yearsRange, bodyDescription, baseYear, pages, regionLong, author, productCode, ctaPrimary/Secondary labels. Re-exported from `mock-data.ts` gateway.
- **`HeroSection`** at `projects/V0_lite_report/src/components/sections/HeroSection.tsx`. Cinematic-dark per KSA Coldchain reference image + live ref `kenresearch.com/ksa-coldchain-test-market`:
  - 2-col grid (`lg:grid-cols-2`)
  - Left: top-badges (Globe + Calendar pills, glass border), serif title (3.75rem md), year range muted, body description, primary `<Button variant="brand" icon={<Download/>}>Download sample report</Button>` + ghost dark `<Button variant="ghost" background="dark" icon={<ArrowRight/>}>Connect with Consultant</Button>`, scroll cue (animated MousePointer2 bounce)
  - Right: glass card (`bg-white/[0.03] backdrop-blur-md`) — "Report Details" h2 + 4-cell DetailRow grid (Base Year/Pages/Region/Author w/ Calendar/FileText/Globe/Users icons) + divider + Product Code mono-font row + ghost "View Full Report Details" button
  - `data-section="hero"` + `data-variant-section="cinematic"` attributes activate cinematic mesh CSS layer (per `editorial-light.css` exception rule — ResourcesSection/hero always cinematic even in editorial-light pages)
  - 729-LOC legacy variant DSL (4 hero variants: darkPremium/light/warmEditorial/darkEmber + FloatingVariantSwitcher dev tool + Breadcrumb + chart preview) deferred — pragmatic minimal port matches user's KSA Coldchain visual contract.
- **page.tsx wired**: dropped placeholder hero, imports `<HeroSection/>` + composes at top.
- `pnpm typecheck` clean both DS + V0_lite_report. `pnpm lint` clean.

**Why:** Hero = report's premium first impression. KSA Coldchain reference image locked the visual contract. Legacy 729 LOC variant DSL + FloatingVariantSwitcher were dev/iterative tools, not production. Minimal injection-friendly port aligns w/ DS injection pattern (`StatCard` molecule reusable, `useAnimatedCounter` shared between Hero + KeyStats + future stat tiles).

**Reversal:** `rm projects/V0_lite_report/src/components/sections/HeroSection.tsx`, revert page.tsx + sections/index.ts, `rm projects/V0_lite_report/src/lib/mock/report-meta.ts` + revert mock-data.ts, `rm design-system/core-v2/src/{molecules/StatCard.tsx,hooks/useAnimatedCounter.ts}`, revert hooks + molecules barrels.

---

## 2026-05-08 — Phase C step 5: sample-report subtree ported (6 files) + wired into page.tsx
**What:**
- 6 sample-report components ported to `projects/V0_lite_report/src/components/sample-report/`:
  - `PhaseCard` — accordion phase card w/ collapsible chapter list + expandable subsections
  - `ChapterExecutiveSummary` — Ch1 intro + 3 StatCard grid (TrendingUp/PieChart/Building2) + See-more/less expand
  - `ChapterMarketOverview` — Ch2 paywall (3 fade paragraphs + Lock + Unlock CTA). Phosphor LockKey → Lucide Lock.
  - `ChapterExtendedTOC` — Ch9 2-phase/3-phase switcher + search + filter pill scroll w/ fade edges + InlineStat + footer summary
  - `SidebarTOC` — sticky 3-state nav (open 280px → compressed 200px → minimal 60px) w/ chapter state icons (Check/Number/Lock)
  - `SampleReportPreview` — orchestrator: IntersectionObserver scroll-spy + click-scroll sync + Sidebar + 4 chapters (ES/MO/ETOC/Methodology)
- All hex → tokens. `iconColors.content/utility` legacy → `var(--color-accent-purple)` / `var(--surface-text-muted)`. Custom `text-content-icon`/`text-foreground` → token-based. Strict TS `isAccessible` coercion (`!!()`).
- `page.tsx`: standalone `<ChapterMethodology/>` replaced w/ `<SampleReportPreview/>` (Methodology consumed inside).
- Barrel at `sample-report/index.ts`. `pnpm typecheck` + `pnpm lint` clean.

**Why:** Sample-report = central content surface for V0_lite_report. 1086 LOC bulk of body. Project-specific composites (not DS atoms). HeroSection + Slideshow + AnalyticsDashboard + MobileTOC remain.

**Reversal:** `rm -rf projects/V0_lite_report/src/components/sample-report/`, revert `page.tsx`.

---

## 2026-05-08 — Phase C step 4d-e: navbar organisms ported + <TopNavigation> wired into V0_lite_report
**What:** Closes Phase C step 4 navbar work.
- **8 navbar organisms** ported to `core-v2/src/organisms/navbar/`:
  - `popover-icons.tsx` (6 SVG icons: Person, Bookmark, Settings, Logout, SignIn, SignUp — `currentColor` inheritance)
  - `AuthPopover.tsx` (220px floating card, spring scale+fade animation, authenticated/unauthenticated state branches w/ MenuItem rows + Divider separators)
  - `DesktopNavItems.tsx` (5 NavDropdownTrigger + SearchBar + injected ctaButton, `hidden lg:flex`)
  - `MobileControls.tsx` (Avatar + Hamburger + AuthPopover, `<768px`, 44px tap targets)
  - `TabletControls.tsx` (SearchBar + ctaButton + Avatar + Hamburger, `768-1023px`)
  - `SecondaryBar.tsx` (40px utility bar: Procurement / Expert Panel / Company trigger / AuthButtons | name+Avatar+popover, `hidden md:block`)
  - `PrimaryNav.tsx` (composes Logo + Mobile/Tablet/Desktop controls in container)
  - `TopNavigation.tsx` (drop-in: SkipLink + ARIA live + SecondaryBar + sticky PrimaryNav + backdrop blur on mega-menu open + mega menu panels + mobile menu slot. Owns useNavDropdown/useAuthPopover/useMobileMenu state.)
- All hex literals → tokens. `motion/react` → `framer-motion`. Container hardcoded `1200px` → `var(--container-page)`. Hidden `bg-[#fafafa]` etc → `var(--color-ramp-black-50)` and `var(--border-soft)`.
- Organisms barrel updated.
- **V0_lite_report layout wiring** (step 4e):
  - `src/components/Logo.tsx` — placeholder Ken Research wordmark (8×8 black square + serif text). Replaceable.
  - `src/components/NavbarShell.tsx` — `'use client'` consumer wrapper around `<TopNavigation>`. Wires `logo={<Logo/>}`, `ctaButton={<Button variant="brand" size="sm"> Book discovery call </Button>}`, `onNavigate` (window.location stub for now), `onSignOut` (no-op stub). Defers `companyDropdown`/`mobileMenu` render-props (mega-menu data not built — Phase E adds).
  - `src/app/layout.tsx` updated: imports `NavbarShell`, renders `<NavbarShell/>` + `<main id="main-content">{children}</main>` inside Lenis provider.
- `pnpm typecheck` clean. `pnpm lint` zero warnings.

**Why:** topnav-v32's `<TopNavigation>` ships as drop-in component w/ render-prop slots — V0_lite_report consumes via `NavbarShell` thin client wrapper that supplies project-specific Logo + CTA + (future) company/mobile menus. DS bundle stays pure (no consumer-specific deps); consumer assembles. Replaces planned legacy V0_lite Header port (was 442 LOC monolith).

**Reversal:** `rm -rf design-system/core-v2/src/organisms/navbar/{AuthPopover,DesktopNavItems,MobileControls,TabletControls,SecondaryBar,PrimaryNav,TopNavigation,popover-icons}.tsx`, revert organisms barrel additions, `rm -rf projects/V0_lite_report/src/components/{Logo,NavbarShell}.tsx`, restore `projects/V0_lite_report/src/app/layout.tsx` to pre-step-4e state (no NavbarShell import, body just `<LenisProvider>{children}</LenisProvider>`).

---

## 2026-05-08 — Phase C step 4a-c: navbar foundation promoted from topnav-v32 → core-v2 (atoms + molecules + hooks)
**What:** Per user directive ("real navbar is in @projects/topnav-v32, not legacy V0_lite Header"), promoted topnav-v32 navbar foundation to core-v2:
- **Nav typography tokens** added to `tokens.json`: `typography.size.navPrimary` (14px alias of nav), `typography.lineHeight.{navHelper,navPrimary}` (1.4). Style Dictionary rebuild verified.
- **9 navbar atoms** ported to `core-v2/src/atoms/`:
  - DS primitives: `TextLink` (sm/md, link or button), `StatusDot` (4-corner positions), `Divider` (horizontal/vertical, subtle/strong), `SkipLink` (WCAG 2.1 A), `Avatar` (initials/icon, sm/md, forwardRef + StatusDot), `MenuItem` (icon+label+subtitle, danger, iconBg)
  - Navbar-specific: `LogoButton` (hover scale), `DropdownChevron` (10/12px, 180° rotate), `HamburgerIcon` (3-line→X)
- **4 navbar molecules** ported to `core-v2/src/molecules/navbar/`:
  - `NavDropdownTrigger` — 60px label+chevron+gradient underline (black→grey→red, scale-x 0→1)
  - `SearchBar` — 120×35 pill w/ purple beam orbit (SVG radial blur 4px). Lucide Search icon (replaced Phosphor MagnifyingGlass).
  - `AuthButtons` — Sign-in (text link) + Sign-up (outlined button) pair
  - `CompanyTrigger` — chevron(10px) trigger w/ injectable dropdown render-prop
- **3 navbar hooks** ported to `core-v2/src/hooks/`:
  - `useNavDropdown` — activeDropdown + 100ms debounce + keyboard nav + touch detect + ARIA announcements
  - `useMobileMenu` — body scroll lock w/ SSR-safe guard
  - `useAuthPopover` — 3-ref outside-click dismissal
- **`organisms/navbar/types.ts`** — `NavUser`, `AuthPopoverConfig`, `NavItemConfig`, `MegaMenuEntry`. Re-exported from organisms barrel.
- All hex literals → canonical tokens. All `var(--nav-*)` inline styles → Tailwind arbitraries (`text-[var(--typography-size-nav-helper)]`). Phosphor → Lucide. `'use client'` on all interactive.
- 22 new files. `pnpm typecheck` clean.

**Why:** topnav-v32 = canonical navbar source per user. Already atomic-design + injectable-slot. Promotes navbar consumability across V0_lite_report, report-store, V0.2_report. Phase C step 4d (organisms — TopNavigation/PrimaryNav/SecondaryBar/AuthPopover/DesktopNavItems/MobileControls/TabletControls) deferred to next turn (file cap discipline).

**Reversal:** `rm -rf design-system/core-v2/src/{atoms/{TextLink,StatusDot,Divider,SkipLink,LogoButton,DropdownChevron,HamburgerIcon,Avatar,MenuItem}.tsx,molecules/navbar,organisms/navbar,hooks/{useNavDropdown,useMobileMenu,useAuthPopover}.ts}`, revert barrels + tokens.json `navPrimary`+lineHeight additions + rebuild SD.

---

## 2026-05-08 — Phase C step 3: 6 V0_lite section components ported + CTALink atom + DS subpath exports fix
**What:** V0_lite_report Vite→Next port — section layer (steps 3a-c).
- **CTALink atom** (140 LOC v1 → token-only port) added to `core-v2/src/atoms/CTALink.tsx`. Variants: default (black) + brand (red). Sizes: sm/md/lg. Uses `useShimmer` hook + `AnimatedArrow` atom internally. Token-driven gradients (`from-[var(--color-brand-red)] via-[var(--color-ramp-red-500)] to-[var(--color-brand-red)]`). Atoms barrel updated.
- **DS subpath exports rewired** (`core-v2/package.json`): `./atoms`, `./molecules`, etc. now point to `./src/<dir>/index.ts` instead of `./dist/...`. Reason: workspace consumers (Next 15) consume TS source via `transpilePackages: ['@kenresearch/design-system']` — no build step required for dev/typecheck. Note added in package.json: pre-publish (npm), switch back to dist/* paths after `pnpm build`.
- **6 section components** ported to `projects/V0_lite_report/src/components/sections/`:
  - `Footer.tsx` — 4-col footer w/ NavColumn helper, `--border-default`/`--surface-text-*` tokens. Lucide socials.
  - `CTASection.tsx` — final-page conversion banner. Editorial-light only (legacy dual variant via FloatingVariantSwitcher dev tool stripped — cinematic variant is now root-level cookie). Decorative blur composition uses `--color-ramp-{coral,perano,warm}-*` tokens.
  - `FAQSection.tsx` — accordion FAQ + contact CTA. `useState` + ChevronDown rotation + `<CTALink>` import. `useAnalytics` tracking deferred to Phase C step 7.
  - `ReportHighlights.tsx` — 6-card grid w/ Framer Motion staggered reveal. `--color-accent-purple` icon boxes, `--shadow-{sm,lg}` tokens, badge w/ `--tint-default`.
  - `KeyStats.tsx` — 3-stat horizontal strip w/ `useAnimatedCounter` (Framer `useInView` triggered). Region-presets dict for dynamic country count.
  - `ChapterMethodology.tsx` — Chapter 11 stepper tabs + 3-card grid. `'use client'` w/ activeStep state. Tokens-only (no `iconColors.content` legacy refs).
- **Sections barrel** at `src/components/sections/index.ts`.
- **page.tsx composed** w/ ScrollProgress + placeholder hero + KeyStats + ReportHighlights + ChapterMethodology + FAQSection + CTASection + Footer + ScrollToTop. Smoke composition test.
- `pnpm typecheck` clean. `pnpm lint` clean (zero warnings).

**Why:** Section layer = direct consumer of atoms ported in step 2b. Validates DS atom APIs work in real consumer composition. 6 sections account for ~7/13 page sections in V0_lite (remaining: Header/Hero/Slideshow/AnalyticsDashboard/sample-report subtree).

**Reversal:** `rm -rf projects/V0_lite_report/src/components/sections/`, `rm design-system/core-v2/src/atoms/CTALink.tsx`, revert atoms barrel + page.tsx + DS package.json exports back to `dist/*` paths. Memory + RESUME-NOTE preserved.

---

## 2026-05-08 — Phase C step 2a-c: 4 hooks + 10 atoms + mock-data gateway ported to core-v2 + V0_lite_report
**What:** V0_lite_report Vite→Next port — atom + data layer.
- **Hooks** (4 promoted from V0_lite_report → `core-v2/src/hooks/`): `useDebounce`, `useFocusTrap`, `useKeyboardNavigation`, `useShimmer`. All `'use client'` + `@promotedFrom V0_lite_report` JSDoc.
- **Atoms** (10 promoted → `core-v2/src/atoms/`): `Button` (386 LOC v1 → token-only port; drops inline `linear-gradient(90deg, #b01f24, #eb484e, #b01f24)` → `var(--composition-gradient-brand-red-shimmer)`), `Card`, `Badge` (280 LOC v1, 9 themes), `InlineLink`, `SectionHeading`, `SectionLabel` (227 LOC v1, text + pill variants), `SectionWrapper` (alternation bg + `data-section-bg` + cinematic mesh activator), `AnimatedArrow` (2-arrow replacement, motion-reduce respect), `ScrollProgress`, `ScrollToTop`. All token-only via canonical CSS vars (no hex literals, no `style={{ color }}` for static values). All typed enum APIs (`variant`/`size`/`tone`/`background`).
- **Tokens.json extended** (Phase C side-effect): `semantic.status.{success,warning,error,info}` group (Badge needs) + `button.{px.{sm,md,lg,xl},font.{sm,md,lg}}` scale. Style Dictionary rebuild verified — all new vars emit to `tokens.css`.
- **Mock-data gateway** (`projects/V0_lite_report/src/lib/`): `mock-data.ts` aggregates `mock/{sample-report.ts,chart.ts,hero-themes.ts,breadcrumb.ts}` w/ `// TODO: replace w/ real API` markers. Sample-report (452 LOC) + chartData (13 LOC) + heroThemes (263 LOC) copied verbatim. Breadcrumb extracted from legacy `Breadcrumb.tsx` (only `healthcareBreadcrumbData` data, not component). Removed legacy `colors` import from hero-themes (was unused).
- `pnpm typecheck` clean on both `core-v2` + `V0_lite_report` consumer.

**Why:** Atoms = foundation for the 12+ section components remaining in Phase C (Header, Footer, CTA, FAQ, Highlights, KeyStats, Methodology, Hero, SidebarTOC, Slideshow, AnalyticsDashboard, sample-report subtree). Token-only port ensures the 1207 inline-style sites + 436 hex literals + 850 `[#xxx]/[Npx]` arbitraries from v1 don't reappear in v2. Co-development w/ Phase C real-consumer drives correct atom prioritization (we built only what V0_lite needs, not speculative atoms).

**Reversal:** `rm -rf design-system/core-v2/src/atoms/{Button,Card,Badge,InlineLink,SectionHeading,SectionLabel,SectionWrapper,AnimatedArrow,ScrollProgress,ScrollToTop}.tsx`, revert atoms barrel + hooks barrel changes, revert `tokens.json` `semantic.status` + `button.{px,font}` additions + rebuild SD, `rm -rf projects/V0_lite_report/src/lib/mock/`. Memory pointer + RESUME-NOTE entry preserved.

---

## 2026-05-08 — DS heal Phase B3 Steps 1-4 executed (core-v2 scaffold + tokens + variants + Highcharts)
**What:** Sprint 2026-05-07 Phase B3 first half complete.
- **pnpm workspace** at `/Users/vishalchauchan/Downloads/Anti-folder01/pnpm-workspace.yaml` (packages: `design-system/tokens`, `design-system/core-v2`)
- **`design-system/core-v2/`** scaffolded clean (Option B per `docs/aura-sprint-2026-05-07-port/B-DS-FORENSIC-v1-and-heal-plan.md`): atoms/molecules/organisms/patterns/hooks/charts/lib + playground/.storybook/docs/scripts/styles. `package.json` w/ subpath exports, peerDeps `react@^19`, `sideEffects:['*.css']`, no Figma Make signatures, no MUI/Emotion, only used Radix primitives, lucide-only, framer-motion (renamed from `motion@12`), highcharts standard, no recharts. v1 `core/` untouched until cutover (step 14).
- **`pnpm install`** clean (5.9s). `pnpm typecheck` clean.
- **`tokens.json`** extended (step 2): `composition` group (cinematic mesh 5-overlay + editorial warm-vignette + brand red CTA + navbar hover-glow + carousel masks + blur scale), `chart` (8-color palette + axis/gridline/tooltip), `motion` (duration/easing/stagger), `shadow` (sm/md/lg/xl/premium/inset-soft), `spacing` 4px-base 0..24, `button` (minWidth + height), `z-index` scale, `semantic.section-bg.{primary,accent,contrast,mesh}`, `typography.size.navHelper` (13px gap closed). Style Dictionary build verified. Backup at `tokens.json.v0.1.0.bak`.
- **Variant CSS** (step 3): `base.css` drops `scroll-behavior:smooth` (Lenis-first) + reduced-motion guard. `editorial-light.css` w/ surface + section-bg system + ResourcesSection cinematic exception via `[data-variant-section="cinematic"]`. `cinematic-dark.css` w/ dark ramp + activates cinematic mesh on hero/resources via `@layer composition` ::before/::after overlays. `useVariant` hook (cookie + RSC, net new in v2).
- **Highcharts** (step 4): `charts/highchartsTheme.ts` w/ runtime `readToken()` resolving CSS custom props. Eager `kenHighchartsTheme` + `buildKenHighchartsTheme()` post-paint reader + `mergePreset()` deep-merger. 5 presets: `area` (areaspline 0.18 fillOpacity), `line` (spline), `pie` (donut 60% innerSize), `bar` (horizontal), `column` (vertical). Token-only — zero hex literals.
- **Docs** (step 1.5): `core-v2/README.md`, `CHANGES.md`, `docs/PATTERNS.md` (300+ LOC), `docs/ANTI_PATTERNS.md` extended w/ Category 14 (Gradients & Backgrounds, 11 rules). `scripts/lint-section-alternation.mjs` stub.

Sprint folder: `docs/aura-sprint-2026-05-07-port/` w/ A1/A2/A3 audits + A-synthesis + B-forensic + B2-patterns deep-map + RESUME-NOTE.

**Why:** 3 Vite/Figma-Make project ports (V0_lite_report, report-store, V0.2_report) need a clean DS to consume. v1 forensic found 1207 inline `style={{}}` + 436 hex literals + 850 `[Npx]/[#xxx]` + zero `'use client'` + duplicate hook dirs + token namespace drift + Figma Make signatures — not portable as-is. Option B fork chosen. Steps 1-4 = foundations; Steps 5-9 (atoms/molecules/organisms/hooks/patterns) co-develop w/ Phase C V0_lite port; Steps 10-15 (lint, docs, exports, verify, cutover, regression) before Phase D.

**Reversal:** `rm -rf design-system/core-v2/`, `rm pnpm-workspace.yaml`, `mv design-system/tokens/tokens.json.v0.1.0.bak design-system/tokens/tokens.json && cd design-system/tokens && pnpm build`, revert this CHANGELOG entry + delete `docs/aura-sprint-2026-05-07-port/`. v1 `core/` + `dashboard/` untouched.

---

## 2026-05-07 — DS infra batch from competition-benchmarking-listing-v01 learnings
**What:**
- `design-system/recipes/report-store-listing.md` — added `**Source-of-truth files**` block (sidebar = `IndustrySidebar.tsx`, NOT `FiltersPanel.tsx`)
- `design-system/recipes/case-study.md` — added source-of-truth pointer to hard gates
- `design-system/tokens/tokens.json` + `build/tokens.css` — new `semantic` group (ink · ink-on-dark · hairline · hairline-on-dark · surface-tint · surface · scrim · brand-red-alpha) → 35 new `--semantic-*` tokens
- `design-system/core/src/app/components/SectionWrapper.tsx` — `bg="warm-darker"` (warm-400) option added
- `design-system/core/src/app/components/ResourceCard.tsx` — `metaSlot?: ReactNode` prop added
- `design-system/core/src/app/components/molecules/SidebarPanel.tsx` — `style?: CSSProperties` prop added
- `design-system/core/src/app/components/ImageOverlayBadge.tsx` — NEW canonical atom for image-overlay glass badges (WCAG AAA, themes: brand · neutral · success · warm)
- `design-system/catalogs/ken-research.ts` + `README.md` — NEW canonical Ken catalogs (industries · regions · countries · trending tags · methodologies · competitor-set sizes)
- `skills/aura-design/SKILL.md` — appended "Source-mirror checklist" 8-step section (pre-build, during, post)
- `docs/DECISIONS.md` — entry for the batch
- `projects/competition-benchmarking-listing-v02/` — handover snapshot of v01 (separate handover folder, not part of DS pass)

**Why:** Building competition-benchmarking-listing-v01 surfaced 8 systemic DS gaps across 4+ user-correction rounds. Batched fixes at DS layer so next consumer page inherits.

**Reversal:** revert listed files; `tokens.css` will rebuild from previous `tokens.json` on `pnpm build`. New atom + catalogs are additive — deletion non-breaking since consumer pages use project-local copies.

---

## 2026-05-06 — reports-pdp-v1 V1A audit + rebuild + polish (axe 0/0/0)

**What:**
- aura-qa audit caught 3 root-cause bugs + 9 P1 + 18 polish + 4 a11y violations. Screenshots: `projects/reports-pdp-v1/qa-screenshots/v1a-pre-rebuild/`.
- Builder rebuilt: registered Tailwind v4 `@theme` typography tokens (12 text-* + 5 font-weight + 3 font-family); swept 191× `text-[var()]` / `font-[var()]` arbitrary classes across 25 files; removed `y:20` from `FadeInSection` so Recharts measures real dimensions; moved `<ReportPDPHero>` inside `<main>` so TOC offset applies.
- Polish pass: SWOT border-accent quadrants, ValueChainStepper GSAP SVG arrows, CompetitorTimeline tooltips, hero AreaChart w/ ReferenceLine forecast boundary, ChartCard skeleton shimmers + highlight callout, MatrixTable sticky-col shadow + row hover + tabular-nums, EcosystemTierGrid logo cells w/ hover lift, module separators, base-ui Tooltip integration. 28 missing eyebrow labels added across mock data.
- Final state: `qa-screenshots/v1a-final/` (4 screenshots). axe CRITICAL 0 / SERIOUS 0 / MODERATE 0. Lint clean. TS clean. Brand button white on #b01f24 contrast 5.9:1.

**Why:** First V1A build shipped lint-clean but visually broken — flat typography (Tailwind v4 silent no-op), 16 blank charts (Recharts -1/-1 dims inside Framer transform), hero occluded by TOC overlay. User flagged "looks broken." Audit-rebuild-polish cycle delivered axe-clean polished V1A.

**LEARNINGS logged (3):**
- Tailwind v4 `text-[var()]` / `font-[var()]` silent no-op — register via `@theme` or use inline `style`. Affects every Aura build using DS tokens.
- Recharts ResponsiveContainer -1/-1 inside Framer `motion.div` w/ transform — use `initial={{ opacity: 0 }}` only, no y translate.
- Fixed-overlay sidebars: hero + page content must live INSIDE `<main>` w/ offset class, not as siblings.

**Reversal:** delete `projects/reports-pdp-v1/`, drop `design-system/recipes/report-detail-heavy.md`, drop tracker row, drop CHANGELOG entries.

---

## 2026-05-06 — reports-pdp-v1 V1A shipped + recipe extension

**What:**
- New recipe: `design-system/recipes/report-detail-heavy.md` — extends `report-detail.md` for content-heavy reports (30-50+ blocks). Locks 30 organism names + recipe-driven sequencing per ken-v2 forensic lesson.
- `projects/reports-pdp-v1/SCHEMA.md` — full TS discriminated union for module taxonomy (15 module types + auxiliary).
- `projects/reports-pdp-v1/VARIANTS.md` — 3 variant briefs (V1A long-scroll editorial, V1B sectioned dashboard, V1C cinematic dark chapter navigator).
- `projects/reports-pdp-v1/MOCK_DATA.md` — Australia Cold Chain (heavy, 30 modules) + GCC Pharma (light, 12 modules) payloads.
- V1A built via aura-builder Sonnet: Next.js 16 + React 19 + Tailwind v4 + shadcn + Framer + GSAP + Lenis + recharts. 25 organisms, lint 0/0, TS clean, dev server :3000 returns 200.

**Why:** Existing `report-detail.md` recipe is light (7 sections, ~180pg pharma example), insufficient for heavy reports like Australia Cold Chain (43 source blocks). V1 establishes schema-driven PDP that scales 12-50+ modules. Live Ken Research PDP is "2014 SEO template" tier — no price (good, kept), no sticky CTA, dead TOC, generic prose. V1 lifts this to premium 9.5/10 finish.

**Decisions Aura made (per user delegation):**
- No price language anywhere (`pricing`, `cost`, `$`, `quote`, `range`, etc. forbidden). Conversion via "Download Sample" + "Talk to Analyst" + "Custom This Report".
- Build order: V1A → V1B → V1C. V1A is closest to existing recipe, validates schema first.
- Stub second light report (GCC Pharma) to validate scalability rules.

**Reversal:** delete `projects/reports-pdp-v1/`, remove `design-system/recipes/report-detail-heavy.md`, drop tracker row, drop CHANGELOG entries.

**Next:** Spawn V1B builder (sectioned dashboard) once user confirms V1A visual.

---

## 2026-05-06 — reports-pdp-v1 project init

**What:**
- Created `projects/reports-pdp-v1/` w/ `STATUS.md` (status: `exploring`).
- Added row to `HANDOVER_TRACKER.md` (V1 Reports PDP redesign — core revenue surface, 1M+ reports, schema-driven, 3 variants, sample: Australia Cold Chain).
- Source ref: live page https://www.kenresearch.com/australia-cold-chain-markets + attached 57pg sample report doc.

**Why:** New project = Reports product page redesign. Critical conversion surface. Needs schema-driven scalability (any of 1M+ reports renders cleanly). Research phase first (live audit + content schema + reusable patterns) before any pixels.

**Reversal:** delete `projects/reports-pdp-v1/`, remove tracker row, drop this CHANGELOG entry.

---

## 2026-05-05 — ken-v2 DELETED + DS-bypass forensic + 6-layer forcing-function fix

**What:**
- **Deleted:** `projects/casestudy-templates/ken-v2/` (788MB, 28,943 files), `casestudy-templates/.gstack/` cache (52K), `casestudy-templates/.DS_Store`. Dev server :3001 killed pre-delete. `template-v3` + `template-v28` preserved.
- **4WH forensic** of why DS not followed (full analysis in this entry):
  - **WHAT:** ken-v2 violated recipe variant DEFAULT (built cinematic-dark, recipe says editorial-light), bg alternation rule (recipe says alternate, ken-v2 all dark), organism filenames LOCK (recipe specified `HeroSection`/`ChallengesSection`/`MethodologySection`/etc., builder wrote `Hero`/`Chapter1-5`/`ClosingScene`), DS-component imports (zero — every atom re-implemented inline), 35+ hardcoded `rgba()` literals, 25+ hardcoded px.
  - **WHY:** (1) Recipe was documentation, not enforceable. (2) `/page` workflow had propose step but no blocking confirm. (3) `aura-builder.md` L21 hardcoded "PRIMARY = ken-v1 cinematic-dark" — Sonnet defaulted to that. (4) `aura-design/SKILL.md` L80 reinforced same. (5) `aura-qa.md` had no recipe-conformance gate — passed builds where every section had wrong name + bg, judging only a11y/perf/DOM-presence. (6) Sonnet bias toward novel composition vs mechanical recipe-following. (7) DS components live in `design-system/core/` Vite + editorial-light theming — incompatible drop-in for Next.js + cinematic-dark consumer surface, so re-implementation was path of least resistance.
  - **WHEN:** Drift began at builder-spawn step. recipe was READ but never ENFORCED. aura-qa final gate accepted bad-architecture build because gates were a11y/perf/DOM-only.
  - **WHERE:** 6 docs needed forcing functions. See "Forcing functions applied" below.
  - **HOW prevent:** 6-layer fix below. Plus future Phase 2: cinematic-dark theme variant of DS-core OR portable DS package importable into Next.js consumers.

**Active config scrubbed (aura-mech Haiku, 10 files, 16 edits):**
- `CLAUDE.md` — brand tokens table, foundations ref, workspace map, run-commands table, case-study guidance section rewritten to recipe-driven
- `run.sh` — `frontend` case = error stub pointing to `/page` workflow + help text
- `HANDOVER_TRACKER.md` — ken-v1 row → deleted-2026-05-05
- `projects/FOLDER_CONTEXT.md` — casestudy-templates intro
- `workflows/agents/aura-builder.md` + `.claude/agents/aura-builder.md` — `<consumer-surface>` placeholder, no PRIMARY hardcode
- `workflows/agents/aura-qa.md` + `.claude/agents/aura-qa.md` — `<consumer-surface>` placeholder
- `skills/aura-design/SKILL.md` — removed "ken v1 design" trigger, table cell w/ no active surface, foundations ref
- `Quick_start_guide.md` — removed ken-v1 row, foundations guidance updated

**Forcing functions applied (Phase 3):**
1. **`recipes/case-study.md`** top — added 5-point HARD GATES block (variant DEFAULT enforced, organism names LOCKED, bg alternation NOT optional, DS components MUST import, no "done" until aura-qa conformance gate). Variant line emphasized as `editorial-light (DEFAULT)`. Bg alternation block expanded w/ explicit cinematic-dark sequence (deep/darker/surface).
2. **`ANTI_PATTERNS.md`** Cat 13 — 3 new rules: 13.9 (never improvise organism names against existing recipe), 13.10 (never skip recipe variant DEFAULT), 13.11 (never declare done w/o aura-qa recipe-conformance gate).
3. **`.claude/agents/aura-qa.md`** + **`workflows/agents/aura-qa.md`** — new "Recipe-conformance gate (HARD GATE — runs FIRST)" 7-step block: read recipe → list actual files → compare names exactly → verify variant → verify bg alternation → verify DS imports → post-scroll screenshot. Failures = STOP, return P0, do not run other passes.
4. **`.claude/agents/aura-builder.md`** + **`workflows/agents/aura-builder.md`** — new "Recipe-driven build rules (HARD)" 7-point block enforcing 3 LOCKs: Variant LOCK, Organism filenames LOCK, Bg alternation LOCK. Plus DS-import + tokens-only + no-done-without-conformance-gate.
5. **`skills/page/SKILL.md`** — Step 4 propose now includes 3 LOCKs explicit. New Step 4.5 "Blocking confirm (HARD GATE)" — user must confirm before builder spawn. Step 5 build brief now embeds the 3 LOCKs as explicit instructions to builder. Step 7 QA brief now mandates conformance gate FIRST + post-scroll screenshot.
6. **`skills/aura-design/SKILL.md`** Recipe router — flow expanded from 8 steps to 10, adding LOCKs extraction step + blocking confirm + recipe-conformance-gate-first QA + no-done-until-conformance. Plus a "why this flow exists" backreference to ken-v2 incident.

**Logged:**
- `docs/LEARNINGS.md` Active section — 2026-05-05 entry "DS recipe bypassed end-to-end on ken-v2 case study" w/ propagation map.

**Why:** User: "delete ken-v2 + ken-v1, dont want to build the same bad design again." Forensic-first not delete-first because deletion erases the evidence of WHY violation happened. Without the WHY, next case-study build repeats the same Sonnet drift patterns.

**Reversal:** restore from any backup since ken-v2 was 788MB; revert all 6 forcing-function patches per file (recipe HARD GATES block, ANTI_PATTERNS Cat 13.9-11, aura-qa recipe-conformance gate, aura-builder 7-point block, page SKILL Step 4.5 + LOCK embeds, aura-design 10-step flow); restore ken-v1 references in 10 active config files (no easy revert — was 16 distinct edits per aura-mech report); remove LEARNINGS 2026-05-05 entry; remove this CHANGELOG entry.

## 2026-05-05 — ken-v2 Path C: DS-compliance refactor + Lenis tune + drift fix

**What:**
- **CSS foundation** (`projects/casestudy-templates/ken-v2/src/app/globals.css`): added RGB-channel tokens (`--text-primary-rgb`, `--text-secondary-rgb`, `--text-muted-rgb`, `--accent-primary-rgb`, `--accent-secondary-rgb`, `--bg-deep-rgb`, `--bg-darker-rgb`, `--bg-surface-rgb`); added space scale `--space-1` through `--space-24` (rem-based, base-4); added pixel-fixed semantics: `--hairline 1px`, `--line-decorative 2px`, `--touch-target 44px`, `--blur-bloom-soft 180px`, `--blur-bloom-strong 200px`. Restored Lenis CSS hooks (`html.lenis`, `.lenis.lenis-smooth`, `.lenis.lenis-stopped`).
- **Lenis re-tuned** (`src/hooks/useScrollInit.ts`): `duration 0.9` (was 0.6 too floaty, 0 broke smoothness), `easing` exponential drag, `wheelMultiplier 1.0` (was 1.4 over-shoot, 0 native), `touchMultiplier 2.0`. Reduced-motion path: skip Lenis init, ScrollTrigger still cleanup.
- **DS-compliance refactor across 12 components** (delegated to aura-builder Sonnet): all `rgba(250,250,250,X)` → `rgba(var(--text-primary-rgb), X)`; all `rgba(176,31,36,X)` → `rgba(var(--accent-primary-rgb), X)`; hardcoded px (`1px` `2px` `44px` `48px` `180px` `200px`) → semantic tokens; bg alternation per recipe via `section-bg-deep` / `section-bg-darker` / `section-bg-surface` classes (Hero/Ch2/ValuePillars=deep, ClientContext/Ch3/Ch5=darker, Ch1/Ch4/ClosingScene=surface); inline `backgroundColor: var(--bg-deep)` removed from sections, applied via class.
- **Counter trigger** (Chapter1Challenge.tsx, Chapter4Impact.tsx): `top 75%` → `top 80%` per recipe motion spec L67.
- **CLAUDE.md drift fix**: `ken-v1` → `ken-v2` (6 refs); port `3000` → `3001`; skill count `78` → `79`; added `tokens` row to run-commands table.
- **run.sh**: `ken-v1` → `ken-v2` (3 refs), port label `3000` → `3001`.
- **Cache wedge bug**: Next 15.5 dev server wedges layout.css to 404 after extended uptime + HMR. Fix: kill PID + `rm -rf .next` + restart. Recurring — log as known issue.

**Why:** User audit "not following our design system guardrails — page looks end to end for all devices, follow our design system." Path C chosen: keep cinematic-dark variant, fix token + inline-style violations across 12 components, alternate bg per recipe within dark variant, re-tune Lenis to recipe-compliant speed, verify desktop+tablet+mobile. CLAUDE.md drift was 5 days old (ken-v1 deleted/renamed to ken-v2 during sprint 2026-05-01 but doc never updated).

**Verified:** Desktop 1440×900 ✓ (all 13 sections, bg alternation visible, counters fire 34%/27%/12%/60K+, cinematic flourishes intact), Tablet 768×1024 ✓ (reflow clean, 2x2 stat grid), Mobile 390×844 ✓ (single column, layout intact). Tokens load: `--bg-deep #0a0a0c`, `--accent-primary #b01f24`, `--text-primary-rgb 250, 250, 250`. Build clean, lint zero.

**Reversal:** revert globals.css `:root` additions (RGB + space tokens block); restore `useScrollInit.ts` to lenis-removed version (commit `d1b2e3` if tagged, else manual revert); aura-builder pass = 12-file mass-edit, revert per file via git or restore from `.next/cache` snapshot if available; counter triggers `top 80%` → `top 75%` in Chapter1+Chapter4; CLAUDE.md `ken-v2` → `ken-v1` mass-replace; run.sh same revert; remove tokens row from run-commands table; remove this CHANGELOG entry.


**What:** ~7 hr sprint evolving Ken Research DS from Phase 1 → Phase 1.5 — Aura-ready, multi-platform, scaffolded for prompt-to-page.

**New top-level: `design-system/`** (was `projects/design-system-*/`):
- `design-system/core/` (was DS-v26)
- `design-system/dashboard/` (was DS-Dashboard, Figma Make divergences stripped)
- `design-system/tokens/` — NEW: W3C DTCG canonical source + Style Dictionary v4 build pipeline (CSS, JS, TS, SCSS, iOS Swift, Android XML, Figma-importable JSON). 131 tokens validated.
- `design-system/voice/` — NEW: 4 pillar voice rulebooks (consulting / research / surveys / foundations) + README index
- `design-system/motion/MOTION_SPEC.md` — NEW: 6 easings, 5 durations, 10 section→motion patterns, library boundaries, reduced-motion contract
- `design-system/recipes/` — NEW: 10 page recipes (case-study, service-overview, methodology, RS home/listing/detail, sector landing, survey listing/detail, DS doc page) + README
- `design-system/ANTI_PATTERNS.md` — NEW: 13 categories, ~120 rules consolidated from all sources
- `design-system/4WH_AUDIT.md` — NEW: gap report (22 complete / 3 partial / 9 missing atoms)
- `design-system/COMPONENT_REFERENCE.md` — NEW: Aura's quick-lookup card mapping intent → component → import → key props

**DS-Dashboard cleanup (A3):**
- Quarantined 29 dead Figma files → `_dev-notes/figma-imports/`
- Removed `figmaAssetResolver` from vite.config.ts
- Renamed `package.json` `name`: `@figma/my-make-file` → `@kenresearch/ds-dashboard`
- Added `tsconfig.json` + `tsconfig.node.json` (strict mode)
- Build clean (1725 modules, 1.67s)

**Aura skill updates (B2 + C1):**
- `skills/aura-design/SKILL.md` — added recipe router section + 16 page-build triggers + anchor docs section pointing to design-system/* canonical files
- `skills/page/SKILL.md` — NEW: `/page <recipe>` slash command. Round-trip: intent → recipe read → compose → build (aura-builder) → verify (aura-qa) → report
- `skills/SKILL_ROUTING.md` — added `page` skill row

**Workspace updates:**
- `run.sh` — added `dashboard` + `tokens` commands, fixed npm → pnpm (was wrong pkg manager)
- `CLAUDE.md` — workspace map updated to show `design-system/` as top-level sibling of `projects/`; run-commands table split DS core + DS dashboard
- 14 path references updated across run.sh, Quick_start_guide.md, CLAUDE.md, scripts/, skills/aura-design/, 8 strategy/*.md docs (all `projects/design-system-*/` → `design-system/*/`)

**Why:** Vishal building Project Aura — design-team workflow where prompt + intent → Ken-correct page. Required: (1) single source of token truth, (2) explicit pillar voice rules, (3) motion spec instead of folk knowledge, (4) page recipes encoding existing DS patterns, (5) anti-patterns master, (6) intent → recipe router in aura-design skill, (7) round-trip slash command. Phase 1 DS was functional but not Aura-parseable. Sprint converted scattered tribal knowledge into machine-readable canonical docs without changing token values or breaking shipped components.

**Reversal:** `mv design-system/core projects/design-system-v26 && mv design-system/dashboard projects/design-system-dashboard && rm -rf design-system/{tokens,voice,motion,recipes,ANTI_PATTERNS.md,4WH_AUDIT.md,COMPONENT_REFERENCE.md}`; revert path edits across 14 files; remove recipe router section from aura-design SKILL.md; delete `skills/page/`; revert run.sh + CLAUDE.md edits. Documented step-by-step in `docs/AURA_SPRINT_2026-05-01.md`.

## 2026-05-01 — ken-v1 UI corrections (8 fixes) + DS-v26/Dashboard body bg fix
**What:**
- ken-v1 `src/app/globals.css` — `.text-gradient` rewritten: was fading to `rgba(255,255,255,0.3)` (near-invisible on dark bg), now `linear-gradient(135deg, #fff 0%, #e8e8e8 40%, var(--color-accent-primary) 100%)` — brand-correct, visible end-to-end.
- ken-v1 `src/components/Hero.tsx` — italic subtitle reduced `text-2xl md:text-4xl` → `text-lg md:text-2xl` (better hierarchy vs massive hero h1); removed `md:ml-24` indent on "Redefined." line.
- ken-v1 `src/components/Chapter4Impact.tsx` — "Impact." span gradient `from-white/90 to-white/30` → `from-white to-[var(--color-accent-primary)]` (was fading to invisible on near-black bg); label `text-xl md:text-2xl` → `text-lg md:text-xl lg:text-2xl` (was clipping "EFFICIENCY GAIN" at tablet); grid `md:gap-16` → `md:gap-8 lg:gap-16`.
- ken-v1 `src/components/SiteNav.tsx` — "Case Study" pill shadow `var(--shadow-accent-teal)` (cyan on red border) → `0_0_20px_rgba(176,31,36,0.15)` (Ken red glow matches red border).
- ken-v1 `src/components/Chapter5Voice.tsx` — quote mark `text-[15rem]` → `text-[8rem] sm:text-[12rem] md:text-[20rem]` w/ responsive top positioning (was overflowing on mobile).
- ken-v1 `src/components/ClosingScene.tsx` — CTA hover text `group-hover:text-white` was on same element as `group` (no-op); wrapped in `<div className="group">` so group-hover cascades to child Framer button.
- ken-v1 `next.config.ts` — `allowedDevOrigins: ["localhost"]` moved from inside `experimental` to root level (Next.js 15 schema; was hard-blocking `pnpm build`).
- DS-v26 `src/styles/theme.css` — body `@apply bg-white` → `background-color: var(--bg-warm)` (`#f5f2f1`).
- DS-Dashboard `src/styles/theme.css` — added `body { background-color: var(--bg-warm); }` to `@layer base` (was missing).
**Why:** `docs/VISUAL_GAP_MATRIX.md` audit found 6 P0 + 4 brand consistency issues across 3 surfaces. All addressable as locked-scope frontend fixes. next.config.ts schema fix was bonus catch — was hard-blocking `pnpm build` (silent in dev).
**Reversal:** revert each file edit; restore old `.text-gradient`; nest `allowedDevOrigins` back under `experimental`; revert DS-v26 body to `@apply bg-white text-black`; remove body rule from DS-Dashboard `@layer base`.

## 2026-05-01 — CLAUDE.md: ken-v1 architecture notes + test:ui script
**What:** `CLAUDE.md` — added `## ken-v1 architecture notes` (chapter pattern, mock-data location, scroll-init hook, font CDN constraint); added `test:ui` to Lint/Format/Build/Test line
**Why:** /init audit surfaced non-obvious patterns future builder agents would re-derive or break
**Reversal:** revert those two blocks in `CLAUDE.md`

## 2026-04-30 — graphify wired into routing: SKILL_ROUTING.md + ROUTING.md + agent templates
**What:**
- `skills/SKILL_ROUTING.md` Reasoning/build table: added `graphify` row — trigger = >50 files / >100k tokens, action = build graph then query, never read naively.
- `workflows/ROUTING.md` model-ladder section: added `graphify rule` block — threshold definition (>50 files or >100k tokens estimated), mandatory path, skill pointer.
- `workflows/agents/aura-builder.md` + `.claude/agents/aura-builder.md` (both paths): added graphify threshold line under Stack rules.
- `workflows/agents/aura-qa.md` + `.claude/agents/aura-qa.md` (both paths): added graphify threshold line under scope/tools.
**Why:** graphify was installed + documented in CLAUDE.md Token tools section but missing from SKILL_ROUTING.md (no trigger row), ROUTING.md (no rule), and agent templates (agents had no signal to use it). Agents would read 50+ files naively every large-repo task — wasting ~100k tokens per run that graphify compresses to ~1.5k.
**Reversal:** Remove graphify row from SKILL_ROUTING.md Reasoning table. Remove graphify rule block from ROUTING.md. Remove graphify threshold line from both aura-builder.md copies + both aura-qa.md copies.

## 2026-04-30 — Task 2: Ken Research DS Phase 1 knowledge docs written
**What:**
- `docs/KENRESEARCH_DESIGN_SYSTEM_PHASE1.md` created — comprehensive Phase 1 knowledge doc: identity (4W+H), brand fundamentals (92-5-3 hierarchy, Major Third scale), two-project architecture (DS-v26 canonical + DS-Dashboard Figma Make), full component inventory (35 atoms / 26 molecules / 40 organisms / templates, 101 total), token architecture, 14 non-obvious rules to preserve, known Phase 1 gaps, ken-v1 ↔ DS-v26 gap matrix
- `docs/DESIGN_SYSTEM_EVOLUTION.md` created — industry-practice gap audit + prioritized P0/P1/P2 evolution roadmap: 7 P0 correctness bugs, 12 P1 structural gaps, 10 P2 maturity items; Phase 2 priorities (immediate fixes + short-term structural work); ken-v1 ↔ DS-v26 convergence plan
- `memory/project_design_system_phase1.md` created — memory pointer for future sessions
- `memory/MEMORY.md` updated — pointer added
**Why:** User asked Aura to "save this in the knowledge doc for kenresearch folders design system v26 and design system dashboard is my design system for kenresearch created specifically, this is the design system first phase so there may be not fully cleaned coded but you will understand with the written docs and guides and md files that why, what, when, where and how, but somethings are not yet exactly correct according to industry practices so we need to correct and upgrade and evolve the design system also after analysing it fully." Synthesis based on: DS-v26 25-file read (prior session) + DS-Dashboard 20-file read (this session) via Sonnet subagent.
**Reversal:** Delete `docs/KENRESEARCH_DESIGN_SYSTEM_PHASE1.md`, `docs/DESIGN_SYSTEM_EVOLUTION.md`, `memory/project_design_system_phase1.md`. Remove last line from MEMORY.md.

## 2026-04-30 — `/init` audit pass 3: 6 drift fixes in CLAUDE.md
**What:**
- `CLAUDE.md` L86: `workflows/` map agents list `(aura-builder, aura-qa)` → `(aura-builder, aura-qa, aura-mech)` — `aura-mech` Haiku template was missing.
- `CLAUDE.md` L168: workflow count `10` → `11`; `pre-handover` added to named workflow list — existed in ROUTING.md but not reflected in CLAUDE.md pointer.
- `CLAUDE.md` L170: "Custom Sonnet templates" heading + list now includes `aura-mech (Haiku)` — was missing from dual-path sync note.
- `CLAUDE.md` skill routing table: added `impeccable` row (gated, opt-in only) — `impeccable` was in `SKILL_ROUTING.md` but not surfaced in CLAUDE.md quick-ref table.
- `CLAUDE.md` per-scenario behavior table: added `pre-handover` row — workflow exists, scenario was unroutable from this table.
**Why:** `/init` invoked for 3rd time. Audit found 6 items where CLAUDE.md diverged from ground truth (ROUTING.md, SKILL_ROUTING.md, workflows/agents/). Each gap would cause silent mis-routing (wrong agent, wrong model, missing workflow trigger) in a new session cold-loading only CLAUDE.md.
**Reversal:** Revert each CLAUDE.md edit: strip `aura-mech` from L86 agents list; revert count 11→10 + remove `pre-handover` from workflow list; revert Custom templates heading + `aura-mech` entry; remove `impeccable` row from skill table; remove `pre-handover` row from per-scenario table.

## 2026-04-30 — Installed `impeccable` skill → moved to workspace `skills/impeccable/` (gated, opt-in)
**What:**
- Cloned `pbakaus/impeccable` v3.0.5 → `~/.claude/skills/impeccable/` + `~/.agents/skills/impeccable/` (manual clone, interactive CLI prompt blocked stdin).
- User requested move to workspace: copied `~/.claude/skills/impeccable/` → `skills/impeccable/` (workspace now sources impeccable; home copies remain for fallback but unused). Skill count: 77 → 78 in `CLAUDE.md` L85.
- `skills/SKILL_ROUTING.md`: added `impeccable` row in Design/UI table + "gated usage" block (allow-list, never-list, mitigation: confirm-before-mutate, prefer aura-design for Ken-grounded work).
- `workflows/ROUTING.md`: added `impeccable-polish` workflow (5 steps, confirm-before-mutate, brand-divergence revert) + classifier row mapping `/impeccable …` triggers.
- `docs/DECISIONS.md`: ADR entry capturing risk scores (Snyk Med · Gen High · Socket 0), dual-install rationale, reversal trigger.
- Patched `~/.claude/hooks/caveman-statusline.sh`: bare `[CAVEMAN]` → always show mode suffix `[CAVEMAN:FULL|LITE|ULTRA|…]` (was hiding mode when active mode = `full`).
**Why:** User asked to install + regulate. Workspace placement = version-controlled, checked in, pins impeccable release in git history. Wide-capability skill (file edit, browser inject, screenshots) needs explicit gate so it doesn't replace `aura-design` discipline or auto-mutate without confirm.
**Reversal:** `rm -rf skills/impeccable/`; revert `CLAUDE.md` L85 skill count 78 → 77; revert `SKILL_ROUTING.md` impeccable rows; revert `workflows/ROUTING.md` `impeccable-polish` workflow + classifier row; revert DECISIONS entry; revert statusline `if [ -z "$MODE" ]` back to `if [ -z "$MODE" ] || [ "$MODE" = "full" ]`.

## 2026-04-30 — `/init` re-audit pass 2: drift fix 76→77 skills + backend req path
**What:** Skill count 76 → 77 in 3 files: `CLAUDE.md` L85 workspace map, `Quick_start_guide.md` L59 AI Skill Routing, `FOLDER_CONTEXT.md` L7 (also added missing `workflows/`, `docs/`, `templates/`, `references/`, `strategy/`, `.claude/agents/` rows). Fixed `CLAUDE.md` L182 backend run-command note: `requirements.txt at repo root` → `requirements.txt + venv at projects/ken-research-backend/` (file actually only exists inside backend folder, not repo root).
**Why:** `/init` invoked. Audit found skill count drift (actual `ls -d skills/*/` = 77, all 3 docs said 76 — `aura-design` skill added since last drift fix). Backend path drift would have led future Claude to `cat requirements.txt` at root, get ENOENT, waste a turn. FOLDER_CONTEXT.md missed every infra folder added 2026-04-29/30 (workflows, docs, templates, references, strategy, .claude/agents).
**Reversal:** Revert skill count 77 → 76 in 3 files. Revert backend path note to `requirements.txt at repo root, venv at projects/ken-research-backend/venv`. Revert FOLDER_CONTEXT.md to original 3-folder list.

## 2026-04-30 — Model routing recalibrated + `aura-mech` Haiku template added
**What:**
- Rewrote `feedback_model_routing.md` (memory): binary Haiku eligibility → fine-grained 5-tier use-case map (L0-L4) w/ explicit triggers, hard-never lines, decision tree, boundary rules (Haiku ≤3 files, Sonnet ≤15), spawn patterns for all 5 invocations.
- Created `aura-mech.md` (Haiku, locked-scope mechanical) at both `.claude/agents/aura-mech.md` + `workflows/agents/aura-mech.md` (dual-path synced). Includes boundary check (refuse + escalate if scope unclear or stack-touching), mandatory return format (no "Patterns I noticed" — that's Sonnet/Opus territory).
- Patched `aura-builder.md` + `aura-qa.md` (both dual-path synced): added "Boundary check" section requiring refuse + escalate to Haiku (mechanical) or Opus (judgment) before accepting work outside their scope.
- Patched `workflows/ROUTING.md`: model-ladder table 3-tier → 5-tier (Haiku/Sonnet/Opus/Explore/Plan) w/ subagent column + decision tree. Updated per-workflow Agent columns for `pre-handover`, `content-update`, `refactor`, `bug-fix`, `quick-answer` to reflect L0/L1/L2 mix per step. Rewrote agent spawn pattern section w/ 5 concrete invocation examples.
- Patched `CLAUDE.md` model-routing section: 3-tier text → 5-tier table + decision tree summary + boundary rules. Pointer to ROUTING.md + memory for full map.
- DECISIONS entry logged w/ rejected alternatives + reversal triggers.
**Why:** User asked: "haiku is light, sonnet medium, opus higher level — re-calibrate task process and workflows according to use-cases." Prior binary Haiku eligibility missed many workflow steps where Haiku is safe (template-fill, log-append, package.json field bumps, lint runs, file moves). Fine-grained map captures real cost/quality optimum.
**Reversal:** Restore previous `feedback_model_routing.md` body (Opus/Sonnet binary). Delete `aura-mech.md` from both paths. Revert "Boundary check" sections from `aura-builder.md` + `aura-qa.md`. Restore prior 3-tier model-ladder table in ROUTING.md + per-workflow Agent columns. Revert CLAUDE.md model-routing section to 3-tier text. Revert DECISIONS entry.

## 2026-04-30 — `aura-design` skill installed (Phase 1) + `expert-ui-ux-designer` deprecated
**What:**
- **Created `skills/aura-design/`** w/ Phase 1 files: `SKILL.md` (180 lines — entry, strategic wedge, 5-surface taxonomy, 2 brand variants, decision-engine routing, inline rules for type/density/motion/color, build-handoff template), `surfaces/03-report-viewer.md` (250 lines — full playbook: IA, type system, charts, reading ergonomics, theme toggle, mobile-specific, a11y, anti-patterns, perf budgets, build-brief template), `anti-patterns.md` (~150 lines — Tier A moves we beat, hard-gated claims, forbidden words, color/motion/IA/form/empty-state anti-patterns, build-time anti-patterns), `voice.md` (~150 lines — Ken voice rules, headline yes/no, CTAs, microcopy, citation format, pricing copy, status copy, pushback patterns).
- **Deprecated `skills/expert-ui-ux-designer/SKILL.md`**: backed up as `SKILL.original.md` (71 lines preserved). New SKILL.md = pointer/migration map to `aura-design` w/ reversal command.
- **Updated routing/index files**: `CLAUDE.md` skill-routing table (Ken design → aura-design, generic UX laws → ui-ux-pro-max, generic non-Ken persona → expert-ui-ux-designer deprecated). `SKILL_ROUTING.md` table (added aura-design row). `INDEX_BY_CATEGORY.md` Design category (aura-design ★ first, expert-ui-ux-designer flagged deprecated, quick-pick split Ken vs generic). `FOLDER_CONTEXT.md` skill count 76→77, Design category 12→13, aura-design entry added, expert deprecation noted.
- **Deferred to Phase 2**: surfaces/ 01-discovery, 02-report-store, 04-dashboards, 05-engagement; decisions/ chart-picker, motion-router, nav-patterns, density-ladder, empty-states; brand/ cinematic-dark, editorial-light, pairing-rules; workflows/ critique-pipeline, build-handoff; refs/ second-brain-index.

**Why:** User asked: upgrade `expert-ui-ux-designer` into Ken-specific design second brain — webpages, dashboards, flows, UX, UI. Generic skill had zero Ken awareness. 3 parallel Sonnet research agents cross-validated strategic wedge, 5 surfaces, 2 brand variants, Tier A anti-patterns. Phase 1 ships skeleton + most-leverage detail (Report Viewer = "where Ken earns the price" per strategy audit; anti-patterns + voice = highest-density don'ts). User to validate Phase 1 pattern before Phase 2 bulk-fill.

**Reversal:**
```
rm -rf /Users/vishalchauchan/Downloads/Anti-folder01/skills/aura-design
mv /Users/vishalchauchan/Downloads/Anti-folder01/skills/expert-ui-ux-designer/SKILL.original.md /Users/vishalchauchan/Downloads/Anti-folder01/skills/expert-ui-ux-designer/SKILL.md
```
Then revert: CLAUDE.md skill-routing table (3 rows → 1), SKILL_ROUTING.md (remove aura-design row), INDEX_BY_CATEGORY.md (revert Design category to 12 + remove ★), FOLDER_CONTEXT.md (count 77→76, category 13→12, remove aura-design entry, restore expert-ui-ux-designer original description), DECISIONS entry status archive.

## 2026-04-30 — Per-project cleanup arc complete (Phases 1-3) + ken-v1 first to `ready-for-tech`
**What:**
- **Phase 1 (DS-v26 cleanup, Sonnet)** — STATUS+HANDOVER+README written, 5 dev/test components + 3 stale docs moved to `_dev-notes/`, `src/lib/mock-data.ts` gateway created, build clean (HTTP 200), barrel export pruned, HANDOVER_TRACKER row updated. Pattern surfaced: TECHNICAL_HANDOVER.md self-flagged stale (rewritten), `@figma/my-make-file` package name common across Figma Make exports, `motion` v12 vs `framer-motion` import distinction.
- **Phase 2 (ken-v1 cleanup, Sonnet)** — STATUS+HANDOVER+README written, redundant `globals.css` import removed in `page.tsx` (was double-imported via layout.tsx), mock data already extracted to `src/lib/mock-data.ts` w/ TODO markers, lint+build clean. Open Qs flagged: skip-link missing, reduced-motion not guarded.
- **Phase 3a parallel (3 Sonnets)** — design-system-dashboard, report-store-v07, topnav-v32 cleanups: each got STATUS+HANDOVER+README, dead code → `_dev-notes/`, mock-data gateway, HANDOVER_TRACKER updated. report-store-v07 archived 13 files (8 audit MDs + 4 draft imports + 1 CSV). topnav-v32 archived 4 dead components + 50-file `imports-FIGMA-EXPORTS/` Figma export folder. Patterns: `alert()` placeholder navigation, `react-router@7` unused, `figma:asset/` Vite resolver load-bearing in some.
- **Phase 3b parallel (2 Sonnets)** — template-v3 + template-v28 (both `exploring` status): light pass, STATUS+HANDOVER+README scaffolded, `_dev-notes/` w/ stale TECHNICAL_HANDOVER + `App.backup.tsx` + 8 misc Figma Make docs.
- **Phase 3c (Aura main)** — `webpages-ken/ken-research-about` (static HTML) — STATUS+HANDOVER+README written directly (no agent — 4 files only). Flagged custom cursor + WebGL canvas + 2MB PNG photos + reduced-motion gap for tech.
- **Phase 6a (motion+a11y, Sonnet)** — ken-v1: skip-link added to `layout.tsx` (focus-visible, `bg-accent-primary`); 5 GSAP useGSAP callers wrapped in `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`; 3 Framer components use `useReducedMotion()` (Hero, Chapter5Voice, ClosingScene); Chapter4 counter has explicit reduce-branch fallback. All gestures (`whileHover`/`whileTap`) on CTA gated. Lint+strict-TS build clean.
- **Phase 6b (final QA gate, Sonnet)** — ken-v1 13-point pre-handover gate: PASSED. Lighthouse mobile 86 perf / 95 a11y / 96 BP / 100 SEO. axe 0 critical. Visual baseline ×5 viewports captured (`tests/visual-baseline.spec.ts`, screenshots in `visual-baseline/`). Render-blocking Google Fonts CSS `@import` migrated to `<link rel="preconnect">` + `<link rel="stylesheet">` in `layout.tsx` (perf 80→86). Footer "Related Intelligence" + nav links contrast bumped (`text-muted` → `text-secondary`, ratio 3.66→5.8). Status `cleanup` → `ready-for-tech`.
- **Phase 6c (3 design-call fixes)** — Brand-red 9-10px eyebrow labels (`Chapter1Challenge.tsx:10` ChapterLabel, `Chapter4Impact.tsx:59` Chapter 04 marker, `ClosingScene.tsx:66` `{item.tag}`) + footer wordmark (`ClosingScene.tsx:82`) marked `aria-hidden="true"` (decorative-by-design, screen readers skip). Footer legal nav: 9px → 11px text-size + `px-2 py-2` (touch target ≥44px) + wrapped in `<nav aria-label="Legal">`. Lint clean, build clean (195 KB first-load JS).
- **Out-of-band edits absorbed** — User/linter edits to CLAUDE.md (added `references/` row, INDEX_BY_CATEGORY mention, but L84 backend "READ-ONLY" stale wording reverted scope flip — re-fixed) and HANDOVER_TRACKER (linter rewrite of design-system-dashboard row). All preserved/reconciled.
**Result:**
- 7 frontend projects + 1 static page now have STATUS.md + HANDOVER.md + README.md.
- 4 projects in `cleanup` status (DS-v26, DSDash, RS-v07, topnav-v32).
- 3 in `exploring` (template-v3, template-v28, ken-research-about) — light pass complete.
- **1 in `ready-for-tech`: ken-v1** (gate passed, ready for tech intake).
- Backend `local-dev` (tech owns).
- All 9 projects logged in `HANDOVER_TRACKER.md`.
**Why:** Per design→tech handover discipline (Phase 0+5). User said "no skips, execute" so full cleanup arc ran in 5 Sonnet builders + 1 Sonnet QA + Aura main for static page + design calls.
**Reversal:** Per-project: restore each project's pre-cleanup state from git. ken-v1 status revert: edit STATUS.md to `cleanup`, remove gate-pass marks, revert HANDOVER_TRACKER row. Restore `_dev-notes/` files to source dirs. Revert CHANGELOG entry.

## 2026-04-30 — Reference library cloned + skill index by category
**What:** (1) Cloned `VoltAgent/awesome-design-md` (MIT, 408KB shallow) → `references/design-systems/` — 59 design system READMEs (Linear, Stripe, Vercel, Figma, Apple, etc.). NOT installed as skill (not a skill — markdown collection). (2) Created `skills/INDEX_BY_CATEGORY.md` — virtual category nav, no folder moves (Claude Code skill loader expects flat `skills/<name>/`). (3) Synced `skills/FOLDER_CONTEXT.md`: count 74→76, added Ken Research category (1 skill), added empty/scaffolding category (`ken-research-workspace`), added external reference library pointer. (4) Patched CLAUDE.md workspace map: skills row updated to mention INDEX_BY_CATEGORY, added `references/` row.
**Why:** User asked install awesome-design-md as skill (it's not a skill, can't be) + restructure skills folder. Honest path: clone as reference lib for design exploration; virtual nav for skills (not physical move) — protects skill loader contract, zero regression risk. Tasks split + Haiku/Sonnet routed where mechanical (clone, count sync) per token-economy rule.
**Reversal:** `rm -rf references/design-systems skills/INDEX_BY_CATEGORY.md`. Revert FOLDER_CONTEXT.md (74 count, no ken-research/empty/external sections). Revert CLAUDE.md workspace-map skills row + remove references/ row.

## 2026-04-30 — Phase 0 baseline + Path A handover infra installed
**What:**
- **Phase 0 baseline** — converted all 7 frontend projects from npm → pnpm (deleted 7 `node_modules` + 7 `package-lock.json`, ran `pnpm install` per project). Disk: 3.5GB → 1.5GB content-addressed store (hardlinks). Added `.nvmrc` (`20.20.1`) at workspace root + per project. Added `engines: {node: ">=20", pnpm: ">=10"}` + `packageManager: "pnpm@10.33.0"` to every `package.json` via jq. Generated backend `requirements.txt` (Django 4.2.30, DRF 3.16.1, etc.). Installed `@playwright/test` + `@axe-core/playwright` in ken-v1, downloaded chromium, wrote `playwright.config.ts` + `tests/smoke.spec.ts` (home loads + axe scan). Added `pnpm test` / `test:ui` / `test:headed` scripts. Ran `skills/gstack/setup` (gstack ready, browse binary built). Smoke-validated all 3 servers: ken-v1 :3000 HTTP 200 (Next.js 15.5.15, ready 1.4s), DS-v26 :5173 HTTP 200 (Vite 6.3.5, ready 1.1s), Django :8000 `/api/health/` HTTP 200.
- **Workspace handover infra** — created `HANDOVER_TRACKER.md` (root, 9-project status table + 13-point pre-handover gate + versioning rule). Created `templates/` dir w/ `STATUS.md.template`, `HANDOVER.md.template`, `README.md.template`. Patched `CLAUDE.md`: rewrote brand-tokens section (TWO variants — cinematic dark for ken-v1, editorial light for DS-v26 + case-study editorials), added "Handover discipline" section pointing to TRACKER + templates + gate + versioning rule, added `templates/`, `HANDOVER_TRACKER.md`, `.nvmrc` to workspace map, switched all run-cmds from `npm` to `pnpm`, removed "READ-ONLY" from backend row.
- **Agents updated** (dual-path synced) — `aura-builder.md` + `aura-qa.md` in both `.claude/agents/` and `workflows/agents/`. Builder: scope flipped (frontend-only → local full-stack), pkg manager pnpm, handover-aware section, two brand-token variants. QA: pkg manager pnpm, pre-handover gate (13 points), `@axe-core/playwright` listed.
- **ROUTING.md** — added `pre-handover` workflow (9 steps, mixes Opus + Sonnet builder + Sonnet QA, mandatory CHANGELOG on status flip). Added `pre-handover` row to task classifier.
- **Memory** — added `feedback_handover_discipline.md` (rule + 13-point gate ref + versioning rule + anti-patterns). Updated `MEMORY.md` index.
- **DECISIONS** — logged "Path A + pnpm + handover discipline + stay-modern" entry w/ rejected alternatives + reversal triggers.
**Why:** User clarified workflow: design team builds prototypes → tech team integrates. Local hygiene = handover artifact quality. Tech adapts to our versions (per user). Per-project handover when complete; new iteration = new version folder. Free preview deploys deferred until needed.
**Reversal:** Restore old `package-lock.json` files (no longer in git, would need re-`npm install`). Strip `engines` + `packageManager` fields. Delete `pnpm-lock.yaml` files. Delete `HANDOVER_TRACKER.md` + `templates/`. Revert CLAUDE.md sections (brand-tokens single-variant, no Handover discipline, npm cmds back). Revert agent templates to frontend-only scope. Remove `pre-handover` workflow + classifier row. Delete `feedback_handover_discipline.md` + MEMORY.md line. Delete DECISIONS Path-A entry.

## 2026-04-30 — Scope flip: local full-stack OK + DS/Next smoke audit
**What:** Flipped scope memory `feedback_scope_frontend_only.md` from frontend-only → local full-stack (frontend + backend + DS local edits/runs allowed). Remote push, deploy, prod URLs still blocked w/o explicit user OK each time. CLAUDE.md L26-27 Scope block rewritten to match (4 bullets: local OK / no remote push / no prod / out-of-scope infra). MEMORY.md index line updated. Smoke audit passed: design-system-v26 Vite v6.3.5 boots clean on `:5173` (HTTP 200, 630B, 20ms) — title "Ken Research Design System". ken-v1 Next.js 15.5.15 boots clean on `:3000` (HTTP 200, 48.5KB, 2.9s first compile, 265ms warm) — title "Case Study | Workforce Transformation - Ken Research". Zero compile errors. Both processes running in background (PIDs 55727 DS, 55789 ken-v1).
**Why:** User explicit scope expansion: "you can edit files locally and create them locally, run it locally only no push to any github repo until I say so." Existing rule blocked legitimate local full-stack iteration. Risk model: localhost-only + no-remote-push gate keeps blast radius zero.
**Reversal:** Restore `feedback_scope_frontend_only.md` to frontend-only version (git/backup). Revert CLAUDE.md Scope block to original 4-bullet "Frontend only" version. Revert MEMORY.md scope line. Kill bg servers: `kill 55727 55789`.

## 2026-04-30 — `/init` re-audit: drift fixes + native agents path + trace markers in CLAUDE.md
**What:** Fixed 3 drifts: (1) bg-deep color in `Quick_start_guide.md` `#030304` → `#0a0a0c` (truth = `globals.css` `--color-bg-deep`). (2) Skill count `74` → `76` in `CLAUDE.md` workspace map, `Quick_start_guide.md`, `FOLDER_CONTEXT.md` (actual `ls -d skills/*/` = 76). (3) `MEMORY.md` output-style line still said "caveman-lite default" — flipped to "FULL default (set 2026-04-29)" matching DECISIONS supersede. Added to CLAUDE.md: `workflows/`, `docs/`, `.claude/agents/`, `FOLDER_CONTEXT.md` rows in workspace map; dual-path agent invocation note (CLI native vs Antigravity template paste) on Workflows section; trace-marker name list inline (`Route · Scan · Step · Spawn · Return · Log · Check · Exit`) under Visible trace bullet w/ pointer to ROUTING.md full spec. CLAUDE.md 167 → 170 lines (within 250 budget).
**Why:** Audit found drift between source-of-truth files (`globals.css`, actual skill dir count, DECISIONS supersede) and dependent docs. Native agents install (CHANGELOG 2026-04-29) was logged but never surfaced in CLAUDE.md — CLI users had no breadcrumb. Trace markers referenced by name only ("see feedback_visible_trace.md") — no inline anchor for scanning.
**Reversal:** Revert `Quick_start_guide.md` bg color to `#030304`. Revert skill counts 76 → 74 in 3 files. Restore MEMORY.md output-style line to "caveman-lite default". Remove `workflows/`, `docs/`, `.claude/agents/`, `FOLDER_CONTEXT.md` rows from workspace map. Revert dual-path sentence on Custom Sonnet templates line. Revert Visible trace bullet to original (no marker list).

## 2026-04-30 — `/init` audit: surfaced run commands + caveman/graphify status to CLAUDE.md
**What:** Added `/init`-required header (`# CLAUDE.md` + standard guidance line). Updated output style section to reflect caveman default = `full` (was `lite`). Added "Token tools installed" block (caveman + graphify w/ paths + trigger). Added "Run commands" table (ken-v1, design system, backend READ-ONLY, other Vite projects). Added "No test script" note to ken-v1 ref. CLAUDE.md 151 → 167 lines (within 250 budget).
**Why:** `/init` invoked. Existing CLAUDE.md strong but missed: (1) caveman mode flip to full, (2) graphify install + trigger, (3) other projects' run commands, (4) test-script absence (prevents future Claude fabricating `npm test`).
**Reversal:** Remove `# CLAUDE.md` header. Revert "caveman-FULL default" → "caveman-lite default". Remove "Token tools installed" block. Replace "Run commands" table w/ original single ken-v1 line. Remove "No test script" note.

## 2026-04-29 — graphify installed (Claude Code + Antigravity) + caveman flipped to full
**What:** Installed `uv` (no sudo, `~/.local/bin/uv`). Installed Python 3.12.13 via uv. Installed `graphifyy` PyPI package via `uv tool install` (isolated at `~/.local/share/uv/tools/graphifyy`, all 25 tree-sitter parsers + faster-whisper bundled). Ran `graphify install` for Claude Code (`~/.claude/skills/graphify/SKILL.md` + `~/.claude/CLAUDE.md` directive) and `graphify install --platform antigravity` (`~/.agents/skills/graphify/SKILL.md`). Switched caveman default from `lite` → `full` via `~/.config/caveman/config.json`. PATH `$HOME/.local/bin` already in `~/.zshrc` line 1 (uv installer added it). DECISIONS updated: new entry, old caveman-lite entry marked archived/superseded.
**Why:** User asked for both. graphify gives 71.5× token reduction on large-repo queries via cached knowledge graph. Caveman full = max output compression, user accepted readability trade for design discussion.
**Reversal:** `uv tool uninstall graphifyy` (removes graphify); `rm -rf ~/.claude/skills/graphify ~/.agents/skills/graphify` (removes skills); edit `~/.config/caveman/config.json` set `"defaultMode": "lite"` (revert caveman); restore archived DECISION entry status to active. Python 3.12 stays available for other tools.

## 2026-04-29 — Visible trace + model-switch enforcement
**What:** Added `feedback_visible_trace.md` memory (7 trace markers + 3-layer model-switch enforcement format). Patched `feedback_auto_routing.md` (route + step + spawn + return markers), `feedback_learning_loop.md` (scan + log + exit markers), `feedback_anti_bloat.md` (check marker on edits). Added `Model used:` field to native + template agent self-check sections. Added Trace markers section to `workflows/ROUTING.md`. Added 1-line pointer to `CLAUDE.md`. Updated MEMORY.md index.
**Why:** User raised real validation concern: "we have to build and let chat say these info, then only I'll know things are working." Memory rules said "do these things" but didn't enforce visible output. Now every action emits `→` marker user can scan. Model-switch enforced via L1 (announced) vs L3 (agent-reported) comparison.
**Reversal:** Delete `feedback_visible_trace.md` + MEMORY.md line. Revert trace-marker additions in 3 patched memories. Remove `Model used:` field from 4 agent files. Remove Trace markers section from ROUTING.md. Remove visible trace pointer from CLAUDE.md.

## 2026-04-29 — Audit: documented dual-path + sync rule
**What:** Added DECISIONS entry "Dual-path: native + workflow templates coexist" (supplements original markdown-templates decision, doesn't supersede). Added "Sync rule — dual-path agent files" section to `feedback_anti_bloat.md` distinguishing substantive content (must sync) from intentional surface differences (frontmatter, task-injection mechanic).
**Why:** Audit found 2 missing pieces: (1) DECISIONS log didn't reflect post-rename native install, (2) no rule prevented silent drift between template + native agent files.
**Reversal:** Delete the new DECISIONS entry. Delete "Sync rule" section from `feedback_anti_bloat.md`.

## 2026-04-29 — Native `.claude/agents/` install for aura-builder + aura-qa
**What:** Created `~/Downloads/Anti-folder01/.claude/agents/aura-builder.md` and `aura-qa.md` with proper Claude Code subagent frontmatter (`name`, `description`, `model: sonnet`) + body copied from `workflows/agents/*.md` templates. Templates in `workflows/agents/` left intact (still referenced by ROUTING.md + CLAUDE.md spawn-pattern docs).
**Why:** Lets Claude Code CLI invoke `subagent_type: "aura-builder"` / `"aura-qa"` directly from inside Anti-folder01, removing the paste-template-into-prompt step. Antigravity IDE still doesn't read `.claude/agents/` (per DECISION 2026-04-29) — Markdown templates remain primary path for that runtime. Project-scoped install (no global pollution).
**Reversal:** `rm -rf /Users/vishalchauchan/Downloads/Anti-folder01/.claude/agents`. Workflow templates in `workflows/agents/` are unchanged so spawn-by-paste path survives.

## 2026-04-29 — Rename Atlas → Aura (Auto UI Rendering Agent)
**What:** Mass rename across CLAUDE.md, workflows/ROUTING.md, both agent templates, docs/DECISIONS.md, docs/LEARNINGS.md, docs/CHANGELOG.md (this file), 9 memory files. Renamed files: `workflows/agents/atlas-builder.md` → `aura-builder.md`, `atlas-qa.md` → `aura-qa.md`. Deferred-agent names also renamed (`aura-motion`, `aura-critic`). `CLAUDE.original.md` left as historical backup (not renamed).
**Why:** User requested rename. Aura = Auto UI Rendering Agent.
**Reversal:** Mass replace Aura → Atlas across same files. Rename agent files back. Restore `atlas-motion`/`atlas-critic` in DECISIONS.

## 2026-04-29 — Risk management: anti-bloat + learning loop installed
**What:** Added `docs/DECISIONS.md` (seeded w/ 7 entries from existing context) + `docs/LEARNINGS.md` (empty active scaffold). Added 2 memories: `feedback_anti_bloat.md` (size budgets, self-check protocol, supersedes, prune cadence, deferred trigger conditions for hooks/audit), `feedback_learning_loop.md` (3 write signals, 2 forcing functions, propagation rule, version-tagging). Patched `aura-builder.md` + `aura-qa.md` w/ mandatory structured return format + Known patterns sections. Patched `CLAUDE.md` w/ Learning loop + Anti-bloat pointers. Updated MEMORY.md index.
**Why:** User raised real risk-management concerns: advisory budgets, fuzzy acceptance signal, one-way subagent flow, empty period, model staleness, silent drift. CEO-framework review trimmed plan from 65 min to 40 min by deferring 5 items w/ explicit trigger conditions.
**Reversal:** `rm /Users/vishalchauchan/Downloads/Anti-folder01/docs/DECISIONS.md /Users/vishalchauchan/Downloads/Anti-folder01/docs/LEARNINGS.md`. Revert aura-builder/aura-qa "Mandatory return format" + "Known patterns" sections. Delete `feedback_anti_bloat.md` + `feedback_learning_loop.md` + their MEMORY.md lines. Revert CLAUDE.md Learning loop + Anti-bloat blocks.

## 2026-04-29 — Haiku tier added to ROUTING + CLAUDE.md
**What:** Added Haiku to model ladder in `workflows/ROUTING.md`. Updated 4 workflows w/ Haiku eligibility: `content-update` (default for step 1), `quick-answer` (file lookup/rename), `refactor` (step 2 if scope tight), `bug-fix` (step 2 if Opus gave precise diff). Patched `CLAUDE.md` model-routing section to 3-tier ladder. **Never** Haiku on shadcn/GSAP/Framer/Tailwind v4 builds.
**Why:** Cheapest model that won't fail. Mechanical text/data swaps and lookups don't need Sonnet — Haiku saves ~3× cost at same quality on those specific tasks.
**Reversal:** Edit ROUTING.md model-ladder section to remove Haiku row + revert per-workflow Agent columns. Edit CLAUDE.md model-routing section to 2-tier.

## 2026-04-29 — Aura auto-routing infra installed
**What:** added `workflows/ROUTING.md` (task classifier + 10 workflow library), `workflows/agents/aura-builder.md` + `aura-qa.md` (Sonnet spawn templates), `docs/CHANGELOG.md` (this file), `feedback_auto_routing.md` memory. Trimmed `feedback_scenario_routing.md` to pointer. Patched `CLAUDE.md` to point at ROUTING.md.
**Why:** user wants auto skill+agent+workflow picking per task. Cuts re-briefing tokens, makes routing consistent across sessions.
**Reversal:** `rm -rf workflows/ docs/`, `mv CLAUDE.original.md CLAUDE.md`, restore `feedback_scenario_routing.md` from git/original content, delete `feedback_auto_routing.md`, remove their lines from `MEMORY.md`.

## 2026-04-29 — Caveman skill installed + CLAUDE.md compressed
**What:** caveman hooks at `~/.claude/hooks/`, default mode `lite` via `~/.config/caveman/config.json`. Compressed `CLAUDE.md` (20% byte cut, backup as `CLAUDE.original.md`) and `skills/SKILL_ROUTING.md` (50% byte cut, backup as `.original.md`). Added 3 memory files: `feedback_output_style.md`, `feedback_scenario_routing.md`, `project_caveman_setup.md`.
**Why:** cut recurring input tokens (CLAUDE.md loads every turn) + reduce output filler.
**Reversal:** `bash <(curl -s https://raw.githubusercontent.com/JuliusBrussee/caveman/main/hooks/uninstall.sh)`, restore both `.original.md` files, delete the 3 memories + `~/.config/caveman/config.json`.
