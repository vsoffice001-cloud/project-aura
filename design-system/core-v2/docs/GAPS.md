# GAPS · DO NOT INVENT · explicit missing-component list

**Date:** 2026-05-19
**Owner:** Aura (Opus main)
**Status:** AUTHORITATIVE · loaded by AI on every session via CLAUDE.md or AI-PICKER-GUIDE
**Depends on:** TOKEN-GAP-REPORT.md · CANONICAL-SOURCE-MAP.md
**Master rules applied:** 4WH · TodoWrite gate-bound

---

## 0 · WHY this doc exists

Root cause of v0.3 regression (proven by audit):
**AI hits gap → invents flat substitute → rationalizes in JSDoc.**

Examples from v0.3:
- `ReportScopeSection.tsx:4` "Coverage list · 2-col bullet grid · **NO cards**" — invented because ScopeOfReport organism missing
- `TaxonomySection.tsx:4` "Tree-style parent → children list · **NO cards** · indentation + chevrons" — invented because TaxonomyTree organism missing
- `ReportNavbar.tsx:9` "DummyHeader carries 72px primary + 40px utility bar — **more chrome than a focused PDP needs**" — invented because Navbar organism missing
- `HeroSection.tsx:16` "**White bg only — no dark top bar**" — invented because cinematic HeroSection organism missing

**This doc lists everything AI MUST PORT instead of invent.**

---

## 1 · How to use this doc

**Before any component task:**
1. Check this doc · is the component listed as MISSING?
2. If YES → STOP. Port the component per CANONICAL-SOURCE-MAP first. THEN consume.
3. If NO → Check `core-v2/src/atoms|molecules|organisms/index.ts` exports. If present → use.

**NEVER:**
- Invent a flat substitute when component is missing
- Rationalize regression in JSDoc (`NO cards`, `lean fork`, etc.)
- Re-implement an organism inline in a section file

**ALWAYS:**
- Port the canonical pattern first
- Add WWWWH sidecar `.md` per ported component
- Mark this doc entry as ✅ PORTED w/ date

---

## 2 · Missing ATOMS

| Atom | Canonical source | Status | Notes |
|---|---|---|---|
| SectionHeader (4-prop combo: chapter+title+heading+subtitle) | V0.2-for-ds `src/app/components/SectionHeader.tsx` | ✅ PORTED 2026-05-19 | Batch 3.1b · aura-builder · `core-v2/src/atoms/SectionHeader.tsx` |
| OverheadText | V0.2-for-ds `src/app/components/ui/overhead-text.tsx` | ✅ PORTED 2026-05-19 | Batch 3.1b · aura-builder · `core-v2/src/atoms/OverheadText.tsx` |
| BodyText | V0.2-for-ds `src/app/components/ui/body-text.tsx` | ✅ PORTED 2026-05-19 | Batch 3.1b · aura-builder · `core-v2/src/atoms/BodyText.tsx` |
| InlineStats | V0_lite `KeyStats.tsx:96` pattern | ✅ PORTED 2026-05-19 | Batch 3.1b · aura-builder · `core-v2/src/atoms/InlineStats.tsx` |
| StatPair | V0_lite `KeyStats.tsx` | ✅ PORTED 2026-05-19 | Batch 3.1b · aura-builder · `core-v2/src/atoms/StatPair.tsx` |
| StatBadge | V0_lite `ReportHighlights.tsx:65` | ✅ PORTED 2026-05-19 | Batch 3.1b · aura-builder · `core-v2/src/atoms/StatBadge.tsx` |
| IconBox | V0_lite `KeyStats.tsx` | ✅ PORTED 2026-05-19 | Batch 3.1b · aura-builder · `core-v2/src/atoms/IconBox.tsx` |
| FilterCheckbox | report-store-legacy `FilterCheckbox.tsx` | ✅ PORTED 2026-05-19 | REWRITTEN Batch 3.1a — canonical 16×16 custom checkbox box with inset shadow + Check icon |
| NextSectionCTA | report-store-legacy | ✅ VERIFIED 2026-05-19 | Batch 3.1b · exists at `core-v2/src/atoms/NextSectionCTA.tsx` · solid canonical impl |

**Batch 3.1a (2026-05-19) verified/ported atoms:**
- Button.tsx: ✅ VERIFIED + font token bug fixed (fontStyle lg/xl mapping)
- AnimatedArrow.tsx: ✅ VERIFIED + duration prop added for CTALink parity
- CTALink.tsx: ✅ VERIFIED (uses --typography-size-* which exist in tokens.css)
- InlineLink.tsx: ✅ VERIFIED (deliberate improvement: always-visible underline)
- FilterChip.tsx: ✅ REWRITTEN — canonical toggle chip (was dismiss chip)
- FilterCheckbox.tsx: ✅ REWRITTEN — canonical 16×16 custom box
- LogoButton.tsx: ✅ VERIFIED + focus ring updated to brand-red
- HamburgerIcon.tsx: ✅ VERIFIED
- MenuItem.tsx: ✅ VERIFIED (more advanced than canonical — adds danger/iconBg/subtitle)
- IconButton.tsx: N/A — not in canonical source map · Button iconOnly=true covers this pattern

**Batch 3.1b (2026-05-19) ported atoms:**
- SectionHeader.tsx: ✅ PORTED — 4-prop combo (chapter + title + heading + subtitle)
- OverheadText.tsx: ✅ PORTED — brand-red uppercase chapter eyebrow
- BodyText.tsx: ✅ PORTED — paragraph wrapper w/ first/follow spacing variants
- StatPair.tsx: ✅ PORTED — label-value pair · 3 orientation variants · dl/dt/dd semantic
- StatBadge.tsx: ✅ PORTED — mini trend/change/neutral/emphasis pill badge
- IconBox.tsx: ✅ PORTED — tinted icon container · 6 colour variants · sm/md sizes
- InlineStats.tsx: ✅ PORTED — composes IconBox + StatPair · vertical/horizontal layouts
- NextSectionCTA.tsx: ✅ VERIFIED — already existed · canonical impl confirmed

**0 remaining atoms in this batch:**

---

## 3 · Missing MOLECULES

| Molecule | Canonical source | Status | Notes |
|---|---|---|---|
| LabelHeadingPair | V0_lite recurring 10 places | ✅ PORTED 2026-05-19 | Batch 3.1c · aura-builder · `core-v2/src/molecules/LabelHeadingPair.tsx` |
| StatPairRow | V0_lite `KeyStats.tsx` | ✅ PORTED 2026-05-19 | Batch 3.1c · aura-builder · `core-v2/src/molecules/StatPairRow.tsx` |
| CTARowResponsive | V0_lite `HeroSection.tsx:285-345` | ✅ PORTED 2026-05-19 | Batch 3.1c · aura-builder · `core-v2/src/molecules/CTARowResponsive.tsx` |
| Breadcrumb | V0_lite `Breadcrumb.tsx` | ✅ PORTED 2026-05-19 | Batch 3.1c · aura-builder · `core-v2/src/molecules/Breadcrumb.tsx` · BreadcrumbNavItem (renamed to avoid MegaBreadcrumb collision) |
| AccordionItem (custom bordered) | V0_lite `FAQSection.tsx:81-127` | ✅ PORTED 2026-05-19 | Batch 3.1c · aura-builder · `core-v2/src/molecules/AccordionItem.tsx` |
| FAQContactCTA | V0_lite `FAQSection.tsx:127-139` | ✅ PORTED 2026-05-19 | Batch 3.2a · aura-builder · `core-v2/src/molecules/FAQContactCTA.tsx` |
| StepperHorizontal | V0_lite `ChapterMethodology.tsx:86` | ✅ PORTED 2026-05-19 | Batch 3.2a · aura-builder · `core-v2/src/molecules/StepperHorizontal.tsx` |
| WindowControls | V0_lite preview-card | ✅ PORTED 2026-05-19 | Batch 3.1c · aura-builder · `core-v2/src/molecules/WindowControls.tsx` |
| PaywallOverlay | V0_lite + V0.2 | ✅ PORTED 2026-05-19 | Batch 3.3b · aura-builder · `core-v2/src/molecules/PaywallOverlay.tsx` · blur + Badge + Button overlay |
| DropdownPanel (mega-menu) | report-store-legacy `Header.tsx` Industries dropdown | ✅ PORTED 2026-05-19 | Batch 3.3b · aura-builder · `core-v2/src/molecules/DropdownPanel.tsx` · 2-col grid · ESC/outside-click · Framer AnimatePresence |
| CmdKSearchTrigger | report-store-legacy `Header.tsx` search | ✅ PORTED 2026-05-19 | Batch 3.3b · aura-builder · `core-v2/src/molecules/CmdKSearchTrigger.tsx` · trigger only · aria-keyshortcuts |
| MobileMenu | report-store-legacy `Header.tsx` mobile | ✅ PORTED 2026-05-19 | Batch 3.3b · aura-builder · `core-v2/src/molecules/MobileMenu.tsx` · slide-down · backdrop · focus-trap · body scroll lock |
| MobileFilterBar | report-store-legacy `MobileFilterBar.tsx` | ✅ PORTED 2026-05-19 · Batch 3.3d | `core-v2/src/molecules/MobileFilterBar.tsx` · frosted-glass pill · z-1500 · env(safe-area-inset-bottom) · aria-label w/ count · aria-haspopup=dialog |
| MobileFilterSheet | report-store-legacy `MobileFilterSheet.tsx` | ✅ PORTED 2026-05-19 · Batch 3.3b | Canonical children-slot version in `core-v2/src/molecules/MobileFilterSheet.tsx` · bottom-sheet slide-up · drag handle · focus-trap · ESC close · backdrop click · body scroll lock |
| TrustBar | report-store-legacy `Footer.tsx:42` | ✅ PORTED 2026-05-19 | Batch 3.3b · aura-builder · `core-v2/src/molecules/TrustBar.tsx` · ISO/Award + logo pills · horizontal scroll mobile · onDark support |
| MetadataStrip | V0_lite Hero below-CTA | ✅ PORTED 2026-05-19 | Batch 3.1c · aura-builder · `core-v2/src/molecules/MetadataStrip.tsx` |
| ChartTitleHeader | V0.2 `chart-title-header.tsx` | ✅ PORTED 2026-05-19 | Batch 3.1c · aura-builder · `core-v2/src/molecules/ChartTitleHeader.tsx` |
| PreviewCard (paywall) | V0_lite `HeroSection.tsx` right side | ✅ PORTED 2026-05-19 | Batch 3.3b · aura-builder · `core-v2/src/molecules/PreviewCard.tsx` · rounded-[10px] · WindowControls · mini chart · PaywallOverlay |

**Batch 3.2a (2026-05-19) ported molecules:**
- StepperHorizontal.tsx: ✅ PORTED — horizontal stepper · active=bg-black · chevron sep · mobile scroll
- FAQContactCTA.tsx: ✅ PORTED — "Still have questions?" gradient card · composes CTALink
- MethodologyCard.tsx: ✅ PORTED — 3-col grid card · active dual-shadow · icon-box + bullets
- DatasetPreviewTable.tsx: ✅ PORTED — access-aware table · anonymous/lead/paid tiers · ghost row + unlock CTA (v0.3 DELETED · re-ported from V0.2 MarketDataTable preview pattern)
- MapFallback.tsx: 🔴 REMOVED (was v0.3-sourced · v0.3 REJECTED) · RegionalComparison organism (Batch 3.3) replaces it — NOT IN V0.2

**Batch 3.2a-REDO (2026-05-19) atoms + molecules · V0.2 canonical (v0.3-sourced DELETED):**
- ProgressBar.tsx: ✅ PORTED 2026-05-19 · V0.2 canonical · `core-v2/src/atoms/ProgressBar.tsx`
- Table.tsx (7 exports): ✅ PORTED 2026-05-19 · V0.2 canonical · `core-v2/src/atoms/Table.tsx`
- DatasetPreviewTable.tsx: ✅ RE-PORTED 2026-05-19 · V0.2 MarketDataTable preview pattern (no direct file in V0.2 · grep confirmed · built from canonical pattern)
- TextCard.tsx: ✅ PORTED 2026-05-19 · V0.2 canonical · `core-v2/src/molecules/TextCard.tsx`
- IconCard.tsx: ✅ PORTED 2026-05-19 · V0.2 canonical · `core-v2/src/molecules/IconCard.tsx`
- AnalysisCard.tsx: ✅ PORTED 2026-05-19 · V0.2 canonical · `core-v2/src/molecules/AnalysisCard.tsx`
- SegmentationCard.tsx: ✅ PORTED 2026-05-19 · V0.2 canonical · `core-v2/src/molecules/SegmentationCard.tsx`
- StakeholderCard.tsx: ✅ PORTED 2026-05-19 · V0.2 canonical · `core-v2/src/molecules/StakeholderCard.tsx`
- TimelineCard.tsx: ✅ PORTED 2026-05-19 · V0.2 canonical · `core-v2/src/molecules/TimelineCard.tsx`
- StatCardGroup.tsx: ✅ PORTED 2026-05-19 · V0.2 canonical · `core-v2/src/molecules/StatCardGroup.tsx`
  NOTE: V0.2 StatCard API incompatible with core-v2 StatCard (cinema variant) · StatCardGroup self-contained · no cross-dependency
- ComparisonParameterCard.tsx: ✅ PORTED 2026-05-19 · V0.2 canonical · `core-v2/src/molecules/ComparisonParameterCard.tsx`
- MapFallback: ❌ N/A — NOT in V0.2 · RegionalComparison organism (Batch 3.3) replaces this pattern

**9 molecules ported in Batch 3.1c. 5 ported in Batch 3.2a. 9 ported in Batch 3.2a-REDO. 1 ported in Batch 3.3a. 6 ported in Batch 3.3b. 2 ported in Batch 3.3d (MobileFilterBar · CheckboxFilterSection). 0 remaining molecules.**

**Batch 3.3a (2026-05-19) NEW molecules (research-driven · not in original GAPS list):**
- TabStrip.tsx: ✅ PORTED — tablist tab-strip pattern (text labels · animated underline · Arrow/Home/End nav · AnimatePresence panels). NOTE: renamed from ViewToggle to avoid collision with ViewToggle ATOM (icon grid/list switch). Consumed by RegionalComparison organism.

**Batch 3.3b (2026-05-19) CHROME molecules (ported):**
- DropdownPanel.tsx: ✅ PORTED — 2-col grid mega-menu · glass bg · ESC/outside-click close · Framer AnimatePresence · focus-blur trap
- CmdKSearchTrigger.tsx: ✅ PORTED — trigger-only · Search + placeholder + ⌘K kbd · aria-keyshortcuts
- MobileMenu.tsx: ✅ PORTED — slide-down overlay · backdrop · body scroll lock · stacked nav + Sign In + Demo CTA · focus-first on open
- TrustBar.tsx: ✅ PORTED — ISO + Award badges + logo pills · horizontal scroll mobile · onDark prop
- PreviewCard.tsx: ✅ PORTED — 10px-radius glass card · WindowControls · chapter/title · mini bar chart · PaywallOverlay lower region
- PaywallOverlay.tsx: ✅ PORTED — blur wrapper + absolute PREMIUM Badge + CTA · reusable · `surface` prop

**Batch 3.3d (2026-05-19) LISTING molecules (report-store-legacy canonical):**
- MobileFilterBar.tsx: ✅ PORTED — frosted-glass pill · z-1500 · env(safe-area-inset-bottom) · aria-haspopup=dialog · active-count badge w/ brand-red
- CheckboxFilterSection.tsx: ✅ PORTED — accordion section for FiltersPanel · title + active-count badge + search + checkbox list + show-more · native checkbox a11y

---

## 4 · Missing ORGANISMS (CRITICAL · DO NOT INVENT)

| Organism | Canonical source | Status | Notes |
|---|---|---|---|
| **ReportHeroSection (cinematic dark report PDP)** | V0_lite + V0.2 hybrid | ✅ PORTED 2026-05-19 | Batch 3.3b · aura-builder · `core-v2/src/organisms/ReportHeroSection.tsx` · 5-col 3/2 grid · video bg · Framer orbs · PreviewCard right · MetadataStrip below CTA · `data-variant-section="cinematic"` |
| **Navbar full** | report-store-legacy `Header.tsx:30-195` | ✅ PORTED 2026-05-19 | Batch 3.3b · aura-builder · `core-v2/src/organisms/Navbar.tsx` · utility bar + glass-header + DropdownPanel + CmdKSearchTrigger + Sign In + Demo CTA + HamburgerIcon + MobileMenu |
| **Footer** | report-store-legacy `Footer.tsx:42-204` | ✅ PORTED 2026-05-19 | Batch 3.3b · aura-builder · `core-v2/src/organisms/Footer.tsx` · dark bg-black · TrustBar top · 5-col grid · bottom bar w/ social SVGs · dynamic copyright |
| **TableOfContentsSidebar** | V0.2 `TableOfContentsSidebar.tsx` | ✅ PORTED 2026-05-19 | Batch 3.2b · aura-builder · `core-v2/src/organisms/TableOfContentsSidebar.tsx` · useScrollSpy hook ported · expanded 255px / collapsed 80px / mobile floating button |
| **ScopeOfReport** | V0.2 `ScopeOfReport.tsx:281-303` | ✅ PORTED 2026-05-19 · V0.2 canonical | Batch 3.2c · aura-builder · `core-v2/src/organisms/ScopeOfReport.tsx` · 600px MindMap preview + hover overlay + MindMapModal |
| **MindMap (interactive D3)** | V0.2 `MindMap.tsx:1-386` | ✅ PORTED 2026-05-19 · V0.2 canonical | Batch 3.2c · aura-builder · `core-v2/src/organisms/MindMap.tsx` · d3-hierarchy+zoom+transition · interactionMode prop · reduced-motion |
| **MindMapModal** | V0.2 `MindMapModal.tsx` | ✅ PORTED 2026-05-19 · V0.2 canonical | Batch 3.2c · aura-builder · `core-v2/src/organisms/MindMapModal.tsx` · focus-trap + ESC + AnimatePresence + openerRef focus-return |
| **TaxonomyTree** | V0.2 (shares MindMap engine · MindMapDemo.tsx) | ✅ PORTED 2026-05-19 · V0.2 canonical | Batch 3.2c · aura-builder · `core-v2/src/organisms/TaxonomyTree.tsx` · preview+inline variants · bgVariant prop |
| **KeyStatsStrip** | V0_lite `KeyStats.tsx:132-156` | ✅ PORTED 2026-05-19 | Batch 3.2b · aura-builder · `core-v2/src/organisms/KeyStatsStrip.tsx` · useAnimatedCounter hook · --bg-section-stats-tinted gradient bg · 3-col grid |
| **ResearchMethodology** | V0_lite `ChapterMethodology.tsx` | ✅ PORTED 2026-05-19 | Batch 3.2b · aura-builder · `core-v2/src/organisms/ResearchMethodology.tsx` · REWROTE simplified placeholder · composes StepperHorizontal + MethodologyCard |
| **SampleReportPreview** | V0_lite `SampleReportPreview.tsx` | ✅ PORTED 2026-05-19 | Batch 3.2b · aura-builder · `core-v2/src/organisms/SampleReportPreview.tsx` · 3-state sidebar (open/compressed/minimal) · IntersectionObserver chapter tracking · mobile floating CTA |
| **FAQSection (canonical · bordered cards + contact CTA)** | V0_lite `FAQSection.tsx:81-139` | ✅ PORTED earlier (Batch 3.2 pre) | existing core-v2 FAQSection reviewed vs canonical — solid · no regression needed |
| **RegionalComparison** | V0.2 `RegionalComparison.tsx` | ✅ PORTED 2026-05-19 · V0.2 enhanced | Batch 3.3a · aura-builder · `core-v2/src/organisms/RegionalComparison.tsx` · MapChart left + DatasetPreviewTable right · TabStrip mobile toggle · paywall via accessTier · SectionWrapper + LabelHeadingPair |
| **MapChart** | NEW research-driven (react-simple-maps MIT) | ✅ PORTED 2026-05-19 · NEW component | Batch 3.3a · aura-builder · `core-v2/src/organisms/MapChart.tsx` · choropleth SVG · purple-100→purple-600 ramp · tooltip · legend · keyboard nav · screen-reader SVG title+desc |
| **SegmentationSection** | V0.2 `SegmentationSection.tsx:63` | ✅ PORTED 2026-05-19 · Batch 3.3c · aura-builder | `core-v2/src/organisms/SegmentationSection.tsx` · 7-card 2/3/2 staggered grid · gradient takeaways footer · LabelHeadingPair header |
| **GrowthDriversChallenges** | V0.2 `GrowthDrivers:14-22` | ✅ PORTED 2026-05-19 · Batch 3.3c · aura-builder | `core-v2/src/organisms/GrowthDriversChallenges.tsx` · 3-col IconCard nested topics · --rose-600 for challenges (not brand-red) |
| **MarketDataTable** | V0.2 `MarketDataTable.tsx:204` | ✅ PORTED 2026-05-19 · Batch 3.3c · aura-builder | `core-v2/src/organisms/MarketDataTable.tsx` · sortable table · keyboard-accessible headers (WAI-ARIA 28) · ProgressBar cell · period coloring · paywall |
| **CompetitiveLandscape** | V0.2 `CompetitiveLandscape.tsx` | ✅ PORTED 2026-05-19 · Batch 3.3c · aura-builder | `core-v2/src/organisms/CompetitiveLandscape.tsx` · 3-card summary + sortable table (paywall) + comparison params + analysis inclusions |
| **TargetAudience** | V0.2 `TargetAudience:62` | ✅ PORTED 2026-05-19 · Batch 3.3c · aura-builder | `core-v2/src/organisms/TargetAudience.tsx` · StakeholderCard grid + aside callout · dot-pattern bg |
| **MarketAnalysis** | V0.2 `MarketAnalysis.tsx` | ✅ PORTED 2026-05-19 · Batch 3.3c · aura-builder | `core-v2/src/organisms/MarketAnalysis.tsx` · chart slot pattern · ChartBlock sub-component · caller injects charts from @ken-research/charts · a11y.enabled enforced |
| **MarketOverview** | V0.2 `MarketOverview.tsx` | ✅ PORTED 2026-05-19 · Batch 3.3c · aura-builder | `core-v2/src/organisms/MarketOverview.tsx` · OverheadText+SectionHeader+BodyText+StatTiles+TextCard+TimelineCards · --content-max-width alias confirmed |
| **RelatedReports** | report-store-legacy | ✅ PORTED 2026-05-19 · Batch 3.3d | `core-v2/src/organisms/RelatedReports.tsx` · LabelHeadingPair + CTALink + HorizontalScroll + ReportCardOrganism compact |
| **ReportCardListing** | report-store-legacy `CardListing.tsx` | ✅ PORTED 2026-05-19 · Batch 3.3d | `core-v2/src/organisms/ReportCardListing.tsx` · CardReveal stagger idx×50ms capped at 8 · grid sm:cols-2 xl:cols-3 · EmptyState · SkeletonCard · LoadMoreSentinel slot |
| **FiltersPanel** | report-store-legacy `FiltersPanel.tsx` | ✅ EXISTS + CANONICAL · DS v4.4 | `core-v2/src/organisms/FiltersPanel.tsx` · v4.4 is MORE advanced (search auto-expand · show-all · scroll-to-active-sub) · legacy pattern extracted as CheckboxFilterSection molecule (Batch 3.3d) |
| **ReportStoreHero (search hero)** | report-store-legacy | ✅ EXISTS · wrapped version | `core-v2/src/organisms/ReportStoreHero.tsx` · wraps ProductHero · canonical search-form hero deferred (globe dep w/ 3D lib not in DS scope) |
| **ListingToolbar** | report-store-legacy `ListingToolbar.tsx` | ✅ EXISTS · DS v4.2 | `core-v2/src/organisms/ListingToolbar.tsx` · canonical props API parity confirmed |
| **ReportCard (4 variants: Grid/List/Compact/Featured)** | report-store-legacy `ReportCard.tsx` | ✅ PORTED 2026-05-19 · Batch 3.3d | `core-v2/src/organisms/ReportCardOrganism.tsx` · all 4 variants · image badge override pattern · Card atom chrome preserved · animatedArrow aligned to DS Button API |
| **FinalCTASection** | V0_lite `CTASection.tsx:20-115` | ✅ ENHANCED 2026-05-19 | Batch 3.2b · aura-builder · `core-v2/src/organisms/FinalCTASection.tsx` · added `showOrbs` prop + `singleCTA` prop for report PDP single-CTA mode · orbs guarded by `useReducedMotion()` |
| **AssociationStrip** | V0_lite TrustStrip pattern · report-store-legacy Footer trust bar | ✅ PORTED 2026-05-19 | Batch 3.2b · aura-builder · `core-v2/src/organisms/AssociationStrip.tsx` · certifications left + logo pills right · divide pattern |

**~0 listing organisms remaining. Templates still greenfield (Tier 4).**

| **ReportFinalCTASection (report PDP email-capture CTA)** | V0_lite `CTASection.tsx` + report-pdp-anatomy.md L144–150 | ✅ NEW 2026-05-20 | Stage 4d · aura-builder · `core-v2/src/organisms/ReportFinalCTASection.tsx` · red-gradient + cinematic-dark + white variants · inline email capture · ghost-dark button on dark surfaces · Framer orbs + useReducedMotion |

**Batch 3.3d (2026-05-19) LISTING organisms (report-store-legacy canonical):**
- ReportCardOrganism.tsx: ✅ PORTED — 4-variant organism (grid/list/compact/featured) · image badge CSS-var override pattern · Card chrome preserved · animatedArrow API aligned
- ReportCardListing.tsx: ✅ PORTED — generic render-prop listing grid/list · CardReveal stagger · SkeletonCard · EmptyState · LoadMoreSentinel slot
- RelatedReports.tsx: ✅ PORTED — horizontal-scroll related-reports · LabelHeadingPair + CTALink header + HorizontalScroll + ReportCardOrganism

---

## 5 · Missing TEMPLATES (Tier 4 · entire tier greenfield)

| Template | Canonical source | Status |
|---|---|---|
| ChapterSectionTemplate | V0.2 | ✅ PORTED 2026-05-19 · Batch 3.3e · greenfield template · `core-v2/src/templates/ChapterSectionTemplate.tsx` |
| HeroCinematicTemplate | V0_lite + V0.2 hybrid | ✅ PORTED 2026-05-19 · Batch 3.3e · greenfield template · `core-v2/src/templates/HeroCinematicTemplate.tsx` |
| HeroEditorialTemplate | V0_lite | ✅ PORTED 2026-05-19 · Batch 3.3e · greenfield template · `core-v2/src/templates/HeroEditorialTemplate.tsx` |
| PDPLayoutTemplate | V0.2 + V0_lite | ✅ PORTED 2026-05-19 · Batch 3.3e · greenfield template · `core-v2/src/templates/PDPLayoutTemplate.tsx` |
| ListingPageTemplate | report-store-legacy | ✅ PORTED 2026-05-19 · Batch 3.3e · greenfield template · `core-v2/src/templates/ListingPageTemplate.tsx` |
| DataChartTemplate | V0.2 | ✅ PORTED 2026-05-19 · Batch 3.3e · greenfield template · `core-v2/src/templates/DataChartTemplate.tsx` |
| MultiCardGridTemplate | V0.2 Segmentation | ✅ PORTED 2026-05-19 · Batch 3.3e · greenfield template · `core-v2/src/templates/MultiCardGridTemplate.tsx` |
| AccordionListTemplate | V0_lite FAQ | ✅ PORTED 2026-05-19 · Batch 3.3e · greenfield template · `core-v2/src/templates/AccordionListTemplate.tsx` |
| StepperPlusGridTemplate | V0_lite Methodology | ✅ PORTED 2026-05-19 · Batch 3.3e · greenfield template · `core-v2/src/templates/StepperPlusGridTemplate.tsx` |

**9 templates ported. Tier 4 complete.**

---

## 6 · Missing TOKENS (see TOKEN-GAP-REPORT.md §3 for full list)

Summary:
- Type: `--text-md` `--text-13` `--text-24` `--text-30` `--text-32` `--text-nav-helper`
- Weights: `--font-weight-light` `--font-weight-semibold` `--font-weight-bold`
- Tracking: `--tracking-display-tight` `--tracking-button` `--tracking-label-tight/wide/x-wide` `--tracking-nav/nav-loose`
- Leading: `--leading-snug` `--leading-stat-label`
- Color: `--black-25`
- Glass: 7 tokens for cinematic surfaces
- Shadows: 6 new (card-rest · card-hover · card-active · brand-button · brand-button-hover · search-hero)
- Spacing: `--space-14` `--space-20`
- Motion: 3 ease + 7 duration tokens
- Bg: `--bg-section-stats-tinted` `--bg-card-methodology` `--bg-card-takeaways`
- Patterns: 4 dot-pattern tokens
- Legacy aliases: `--warmBg` `--warmBorder` `--content-max-width`

**~50 tokens to ADD.**

---

## 7 · Broken refs in V0.2 (fix on port)

| Broken ref | Fix |
|---|---|
| `bg-warm-200` undefined Tailwind class (V0.2 `stat-card.tsx:151`) | `bg-[var(--warm-200)]` (token exists) |
| `var(--content-max-width)` undefined (V0.2 `MarketOverview.tsx:30`) | Alias added in TOKEN-GAP-REPORT · works after alias add |
| Hero rAF orbs · no `useReducedMotion()` guard (V0.2 `HeroSection.tsx:21-43`) | Add Framer `useReducedMotion()` guard · skip rAF when reduced |
| Highcharts `accessibility.enabled: false` (V0.2 every chart) | Set `true` + add `point.description` for screen readers |
| Sortable `<th onClick>` not keyboard-focusable (V0.2 MarketDataTable) | Add `role="button"` + `tabIndex={0}` + Enter/Space keyboard handler |
| Skip-link target missing (report-store) | Add `<main id="main">` landmark + ensure SkipLink targets it |

---

## 8 · OUT OF SCOPE (DO NOT PORT)

| Item | Source | Why |
|---|---|---|
| FloatingCTA (bottom-rising banner) | V0.2 | User explicit reject 2026-05-19 |
| Gradient buttons (V0_lite + V0.2 CVA `cta` variant) | V0_lite + V0.2 | Violates R1.2 brand-red gradient ban · user explicit reject |
| Bottom-up rising banner UI | V0.2 | User explicit reject |
| All V0.2 buttons | V0.2 | User explicit reject (use report-store buttons) |
| All V0.2 CTAs in FinalCTA / FloatingCTA / Hero | V0.2 | User explicit reject |
| V0_lite gradient/shimmer Button as canonical | V0_lite | User said V0_lite buttons outdated · use report-store |
| V0.2 sortable table button-styling | V0.2 | Use report-store sort-control pattern |
| `py-24 lg:py-32` section padding | V0.2 | Rejected · core-v2 caps at 64/96 |
| `px-[84.375px]` horizontal padding | V0.2 | Rejected · use standard `px-4 sm:px-6 md:px-8` |
| 9px font sizes (V0_lite logo sub-text · Badge xs) | V0_lite | TOO SMALL · use `--text-2xs 0.6875rem` (11px) instead |

---

## 9 · 4WH per gap (spot-check 3)

**Gap: ScopeOfReport organism**
- WHAT · Interactive 600px-tall card embedding MindMap preview · hover overlay opens MindMapModal
- WHY · Report scope = hierarchical concept tree · visual interaction > flat list · supports "Click to Explore"
- WHEN · Report PDP §2 Scope of Report · ANY page describing nested coverage
- WHERE · `core-v2/src/organisms/ScopeOfReport.tsx`
- HOW · Compose MindMap (preview mode) + hover gradient overlay + open-modal click handler + MindMapModal

**Gap: Navbar full**
- WHAT · Two-tier navbar w/ utility-bar (h-8 black w/ Procurement/Expert/Company/SignIn/SignUp) + glass-header (h-56 w/ Logo + 5 nav dropdowns + cmd-K + Sign In + Demo CTA + mobile hamburger)
- WHY · Brand chrome on every page · drives 60% of conversions per analytics (assume) · standardizes nav surface across DS
- WHEN · Every page · all surfaces · ALWAYS rendered (NOT optional)
- WHERE · `core-v2/src/organisms/Navbar.tsx` + 3 molecule deps (DropdownPanel · CmdKSearchTrigger · MobileMenu)
- HOW · Sticky top z-1000 · glass-header bg `--glass-header-bg` + blur `--glass-header-blur` · brand-red Demo CTA · keyboard nav · skip-link target

**Gap: Glass tokens (7 tokens)**
- WHAT · 7 CSS vars for semi-transparent white on dark surface (Hero glass card + cinematic-dark variant)
- WHY · Hero glass card requires consistent rgba surface treatment · without tokens · each consumer hardcodes (drift)
- WHEN · ANY `cinematic-dark` surface containing glass card · NEVER on light surface
- WHERE · `core-v2/src/styles/base.css :root` (added Stage 3.1) · consumed by HeroSection + GlassCard atom
- HOW · 7 tokens: `--glass-bg/border/glow/accent/text/muted-text/hover` · scoped via RULES.md "glass only on cinematic"

---

## 10 · Update protocol

This doc is LIVE during port phase. Per component:
1. Port complete → mark entry ✅ PORTED `YYYY-MM-DD`
2. New gap discovered → ADD entry w/ source + status
3. After all batches → all entries should be ✅ PORTED OR moved to "OUT OF SCOPE"

---

## 11 · Done when

- [ ] User approves this doc
- [ ] AI-PICKER-GUIDE.md (Stage 2.5) cites this doc as primary "check before invent" reference
- [ ] CLAUDE.md or workspace memory references this doc path
- [ ] Stage 3 ports check off entries here as they ship

---

**END · GAPS.md**
**Next doc:** AI-PICKER-GUIDE.md (Stage 2.5)
