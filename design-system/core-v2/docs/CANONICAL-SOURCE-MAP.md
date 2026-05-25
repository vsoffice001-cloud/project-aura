# CANONICAL-SOURCE-MAP · per-component canonical legacy source

**Date:** 2026-05-19
**Owner:** Aura (Opus main)
**Status:** AUTHORITATIVE · feeds PORT-PLAN + AI-PICKER-GUIDE
**Master rules applied:** 4WH per row · TodoWrite gate-bound
**Depends on:** TOKEN-GAP-REPORT.md (token decisions locked first)

---

## 0 · WHY

Three legacy pages stack as heritage layers. Each upgrades the prior for SOME components only.

- **V0.2-for-ds** · oldest · dense-data organisms only canonical
- **V0_lite_report** · mid-tier · text-pairing + section recipes + a11y canonical · buttons outdated
- **report-store-legacy** · newest · primitives + listing + cards canonical

→ Per primitive · pick the freshest source · NOT page-blanket.

---

## 1 · Tier 1 · Atoms canonical source

| Atom | Canonical source | File:line | WHY canonical | Port path |
|---|---|---|---|---|
| **Button (all sizes + variants)** | report-store-legacy | `src/.../Button.tsx:36-315` | 4 var × 5 sizes (xs/sm/md/lg/xl) · token-driven · shimmer + ripple + showArrow + loading + focus ring · `xs` 28px = small button canon | `core-v2/src/atoms/Button.tsx` (REWRITE) |
| **AnimatedArrow** | report-store-legacy | `src/.../AnimatedArrow.tsx:13-61` | Diagonal hover-shift · two stacked ArrowUpRight · 300ms `cubic-bezier(0.4,0,0.2,1)` · token-driven | `core-v2/src/atoms/AnimatedArrow.tsx` (verify · likely already ported · audit-confirm) |
| **CTALink** (text + arrow + underline) | report-store-legacy | `src/.../CTALink.tsx` | Tier-2 link · composes AnimatedArrow · brand-red underline on hover | `core-v2/src/atoms/CTALink.tsx` |
| **InlineLink** (tier-3 text-only link) | report-store-legacy | `src/.../InlineLink.tsx` | border-b + brand-red on hover · simplest text link | `core-v2/src/atoms/InlineLink.tsx` (likely already ported) |
| **Badge** | V0_lite + report-store hybrid | V0_lite `src/design-system/.../Badge.tsx` + report-store IndustryBadge | V0_lite has 11 themes · per-size tracking · report-store has IndustryBadge eyebrow pattern · merge | `core-v2/src/atoms/Badge.tsx` (verify · already exists · enhance) |
| **SectionLabel** (eyebrow) | V0_lite | `src/app/components/...` referenced by audit | `tracking-[0.2em]` uppercase · brand-red default · accent-dark variant for cinematic | `core-v2/src/atoms/SectionLabel.tsx` (already exists · verify tracking tokens) |
| **SectionHeading** | V0_lite + V0.2 hybrid | V0_lite `SectionHeading.tsx` + V0.2 `SectionHeader.tsx` | V0_lite uses serif + font-light 300 + tight leading · V0.2 SectionHeader = chapter+title+heading+subtitle combo (4-prop atom) | `core-v2/src/atoms/SectionHeading.tsx` (exists · verify weight 300 + tracking-display-tight applied) |
| **SectionHeader (4-prop combo)** | V0.2-for-ds | `src/app/components/SectionHeader.tsx` | Single atom packaging chapter+title+heading+subtitle · NOT IN core-v2 | **NEW · ADD `core-v2/src/atoms/SectionHeader.tsx`** |
| **OverheadText** | V0.2-for-ds | `src/app/components/ui/overhead-text.tsx` | Brand-red uppercase eyebrow · `tracking-widest 0.1em` · CHAPTER N - LABEL pattern | **NEW · ADD `core-v2/src/atoms/OverheadText.tsx`** |
| **BodyText** | V0.2-for-ds | `src/app/components/ui/body-text.tsx` | Paragraph wrapper w/ spacing variants · `spacing="first"` for after-heading | **NEW · ADD `core-v2/src/atoms/BodyText.tsx`** |
| **Card (base)** | report-store-legacy | `src/.../Card.tsx` | 10px radius · rest+hover shadow · -2px lift · 0.4s cubic-bezier(0.16,1,0.3,1) · token-driven dimensions | `core-v2/src/atoms/Card.tsx` (REVIEW + align tokens) |
| **Container** | report-store-legacy | `src/.../Container.tsx` | `maxWidth="page"` 75rem · padding-* responsive | `core-v2/src/atoms/Container.tsx` (likely exists) |
| **SectionWrapper** | V0_lite | `src/.../SectionWrapper.tsx` | sm/md/lg/xl spacing scale · bg variants white/warm/black | `core-v2/src/atoms/SectionWrapper.tsx` (exists · verify) |
| **InlineStats** | V0_lite | `src/app/components/KeyStats.tsx:96` pattern | size-12 icon-box → tabular-nums value → utility-icon label · 3-col grid `gap-8 sm:gap-12 md:gap-16` | **NEW · ADD `core-v2/src/atoms/InlineStats.tsx`** |
| **StatPair** (label+value) | V0_lite | `src/.../KeyStats.tsx` | flex-col · label-on-top OR label-below · `tabular-nums` value | **NEW · ADD `core-v2/src/atoms/StatPair.tsx`** |
| **StatBadge** | V0_lite | `src/.../ReportHighlights.tsx:65` | `px-2.5 py-1` mini-badge for trends/changes | **NEW · ADD `core-v2/src/atoms/StatBadge.tsx`** |
| **IconBox** | V0_lite | `src/.../KeyStats.tsx` | `size-11/12` square w/ icon · bg-tinted-of-color | **NEW · ADD `core-v2/src/atoms/IconBox.tsx`** |
| **FilterChip** | report-store-legacy | `src/.../FilterChip.tsx` | pill · min-h-40px · check icon when active · brand-red active state | `core-v2/src/atoms/FilterChip.tsx` (exists · audit-confirm vs source) |
| **FilterCheckbox** | report-store-legacy | `src/.../FilterCheckbox.tsx` | custom 16×16 · inset shadow · brand-red left-border when checked | **NEW · ADD if missing** |
| **CTABackground / HeroBackground** | report-store-legacy | already in core-v2 | confirm canonical | verify |
| **Divider** | V0.2 + report-store both | various | `border-t border-[var(--black-200)]` standard | `core-v2/src/atoms/Divider.tsx` (exists) |
| **SkipLink** | V0_lite + report-store | various | accessibility · landmark target | `core-v2/src/atoms/SkipLink.tsx` (exists) |
| **ScrollProgress** | V0_lite | `src/.../ScrollProgress.tsx` | Top fixed bar fills width by scroll % | `core-v2/src/atoms/ScrollProgress.tsx` (exists) |
| **ScrollToTop** | V0_lite | `src/.../ScrollToTop.tsx` | FAB · returns to top | `core-v2/src/atoms/ScrollToTop.tsx` (exists) |
| **LogoButton** | report-store-legacy | `Header.tsx` logo region | SVG logo · brand-red accent | `core-v2/src/atoms/LogoButton.tsx` (exists · likely needs SVG vs span fix) |
| **HamburgerIcon** | report-store-legacy | `Header.tsx` mobile | 3-line · animates to X on open | `core-v2/src/atoms/HamburgerIcon.tsx` (exists) |
| **MenuItem** | report-store-legacy | nav dropdown items | label + optional icon + chevron | `core-v2/src/atoms/MenuItem.tsx` (exists) |
| **AnswerBlock** | V0_lite FAQ | `FAQSection.tsx:127` | bordered accordion expanded panel | `core-v2/src/atoms/AnswerBlock.tsx` (verify) |
| **CategoryListItem** | report-store-legacy | `CategoryListItem.tsx` | row · label + arrow · hover-shift translate-x | `core-v2/src/atoms/CategoryListItem.tsx` (exists) |
| **NextSectionCTA** | report-store-legacy | n/a in audit · custom | bottom-of-section arrow-down CTA | verify exists |
| **CodeBlockWithCopy** | (out of scope · skip) | n/a | n/a | n/a |
| **TableOfContents (flat list atom)** | V0_lite + V0.2 hybrid | both | nested ol w/ progress indicators | `core-v2/src/atoms/TableOfContents.tsx` (exists) |

**Atoms to ADD:** SectionHeader · OverheadText · BodyText · InlineStats · StatPair · StatBadge · IconBox · (verify FilterCheckbox) · (verify NextSectionCTA) — **7+ new**

---

## 2 · Tier 2 · Molecules canonical source

| Molecule | Canonical source | File:line | WHY canonical | Port path |
|---|---|---|---|---|
| **LabelHeadingPair** | V0_lite | recurring 10 places | SectionLabel + serif-h2 + lede max-w-50rem | **NEW · ADD `core-v2/src/molecules/LabelHeadingPair.tsx`** |
| **StatPairRow** (3-col stat strip) | V0_lite | `KeyStats.tsx` | 3 IconBox+value+label in `gap-3 sm:gap-6 pt-6 sm:pt-8` grid | **NEW · ADD `core-v2/src/molecules/StatPairRow.tsx`** |
| **CTARowResponsive** | V0_lite Hero | `HeroSection.tsx:285-345` | 3-tier visibility responsive CTA pair (`<sm` / `sm:flex md:hidden` / `md:flex`) | **NEW · ADD `core-v2/src/molecules/CTARowResponsive.tsx`** |
| **CardMetaRow** | report-store-legacy | `ReportCard.tsx` | meta-data row · published date · pages · price · icon-text pairs | `core-v2/src/molecules/CardMetaRow.tsx` (likely exists in store · port) |
| **Breadcrumb** | V0_lite | `Breadcrumb.tsx` | flex flex-wrap · chevron sep · aria-current=page · last-item hasDropdown variant | **NEW · ADD `core-v2/src/molecules/Breadcrumb.tsx`** |
| **AccordionItem** (custom bordered) | V0_lite FAQ | `FAQSection.tsx:81-127` | bordered card per item · 10px radius · hover border-darker · animate-in panel | **NEW · ADD `core-v2/src/molecules/AccordionItem.tsx`** |
| **AccordionShadcn (style-overridden)** | V0.2 | `FAQSection.tsx` | shadcn Accordion w/ rounded-[10px] white card-per-item on `--black-50` bg + dot-pattern | **decision: prefer V0_lite custom AccordionItem · drop V0.2 shadcn variant** |
| **FAQContactCTA** | V0_lite | `FAQSection.tsx:127-139` | "Still have questions?" card after FAQ list · gradient bg · CTALink | **NEW · ADD `core-v2/src/molecules/FAQContactCTA.tsx`** |
| **StepperHorizontal** | V0_lite Methodology | `ChapterMethodology.tsx:86` | `flex gap-1 sm:gap-2 sm:justify-center overflow-x-auto` · active=bg-black-text-white · inactive=bg-white-border-warm-500-hover-coral-50 · chevron sep | **NEW · ADD `core-v2/src/molecules/StepperHorizontal.tsx`** |
| **WindowControls** | V0_lite preview-card | `HeroSection.tsx` preview area | 3-dot mac controls + label | **NEW · ADD `core-v2/src/molecules/WindowControls.tsx`** |
| **PaywallOverlay** | V0_lite + V0.2 | preview cards + table rows | `blur-sm pointer-events-none` siblings + absolute centered PREMIUM Badge / Button overlay | **NEW · ADD `core-v2/src/molecules/PaywallOverlay.tsx`** |
| **DropdownPanel (mega-menu)** | report-store-legacy | `Header.tsx` Industries dropdown | blur-trap dropdown w/ 2-col grid of MenuItems · chevron caret · keyboard nav | **NEW · ADD `core-v2/src/molecules/DropdownPanel.tsx`** |
| **CmdKSearchTrigger** | report-store-legacy | `Header.tsx` search button | search icon + placeholder + kbd hint (⌘K) · opens command menu | **NEW · ADD `core-v2/src/molecules/CmdKSearchTrigger.tsx`** |
| **MobileMenu** | report-store-legacy | `Header.tsx` mobile | full-screen slide-down · stacked links · Sign In · brand Button bottom | **NEW · ADD `core-v2/src/molecules/MobileMenu.tsx`** |
| **MobileFilterBar** | report-store-legacy | `MobileFilterBar.tsx:21-23` | fixed bottom pill · env(safe-area-inset) · filter count badge | **NEW · ADD `core-v2/src/molecules/MobileFilterBar.tsx`** |
| **MobileFilterSheet** | report-store-legacy | `MobileFilterSheet.tsx` | full-screen Sheet w/ filter UI for mobile | **NEW · ADD `core-v2/src/molecules/MobileFilterSheet.tsx`** |
| **TrustBar** | report-store-legacy | `Footer.tsx:42` | ISO/Award icons + 5 client logo pills · h-strip | **NEW · ADD `core-v2/src/molecules/TrustBar.tsx`** |
| **MetadataStrip** | V0_lite | `HeroSection.tsx` below-CTA metadata strip (Author / Pages / Published / Code / Base Year) | 5-col label-value strip · `gap-8` · `divide-x` | **NEW · ADD `core-v2/src/molecules/MetadataStrip.tsx`** |
| **ChartTitleHeader** | V0.2 | `chart-title-header.tsx` | chart-block header w/ title + subtitle + optional info-icon | **NEW · ADD `core-v2/src/molecules/ChartTitleHeader.tsx`** |
| **PreviewCard (paywall)** | V0_lite | `HeroSection.tsx` right preview | rounded-[10px] card · window controls · chapter-label+title pair · mini chart · blurred PREMIUM overlay | **NEW · ADD `core-v2/src/molecules/PreviewCard.tsx`** |
| **AudioPlayerCompact** | V0.2 | `AudioPlayer.tsx` | audio scrubber + play/pause + speed · compact | **decision: optional · defer to batch 3 if needed** |

**Molecules to ADD:** ~20+ new

---

## 3 · Tier 3 · Organisms canonical source (CRITICAL · 13 MISSING from core-v2)

| Organism | Canonical source | File:line | WHY canonical | Port path |
|---|---|---|---|---|
| **HeroSection (cinematic dark)** | V0_lite + V0.2 hybrid | V0_lite `HeroSection.tsx` (hero shell · CTA layout · 3-stat row) + V0.2 `HeroSection.tsx` (video bg · floating orbs · glass card pattern · grid 5-col 3/2) | V0_lite has clean CTA + 3-stat strip · V0.2 has cinematic chrome | **NEW · MERGE → `core-v2/src/organisms/HeroSection.tsx`** (use V0_lite layout · V0.2 cinematic chrome · NO V0.2 buttons · USE report-store Buttons) |
| **Navbar full (utility + main + dropdowns + cmd-K + mobile)** | report-store-legacy | `Header.tsx:30-195` | utility-bar (h-8 black) + glass-header (h-56 + blur(12) sat(1.4)) + Industries dropdown + cmd-K + Sign In + brand Demo + hamburger | **NEW · ADD `core-v2/src/organisms/Navbar.tsx`** |
| **Footer** | report-store-legacy | `Footer.tsx:42-204` | dark bg-black · trust bar + 5-col grid + bottom bar w/ social SVGs | **NEW · ADD `core-v2/src/organisms/Footer.tsx`** |
| **TableOfContentsSidebar (sticky)** | V0.2 | `TableOfContentsSidebar.tsx:8` + audit | sticky top-[72px] · 255px expanded · `-right-4` collapse half-outside circle · scroll-spy via `useScrollSpy(sectionIds, 200)` · neutral filled circles · Check icon completed | **NEW · ADD `core-v2/src/organisms/TableOfContentsSidebar.tsx`** |
| **ScopeOfReport (MindMap embed + modal)** | V0.2 | `ScopeOfReport.tsx:281-303` | 600px-tall card embedding MindMap preview + hover overlay → opens MindMapModal | **NEW · ADD `core-v2/src/organisms/ScopeOfReport.tsx`** |
| **MindMap (interactive D3)** | V0.2 | `MindMap.tsx:1-386` | D3 hierarchy · zoom/pan · color-coded levels · interactionMode prop (preview vs full) | **NEW · ADD `core-v2/src/organisms/MindMap.tsx`** · ensure d3 v7 compat (Next 16 + React 19) |
| **MindMapModal** | V0.2 | `MindMapModal.tsx` | full-screen modal wrapping MindMap w/ search bar | **NEW · ADD `core-v2/src/organisms/MindMapModal.tsx`** |
| **TaxonomyTree** | V0.2 | shares MindMap engine OR variant | same MindMap component repurposed | **share MindMap** · separate organism for entry/usage docs |
| **KeyStatsStrip** | V0_lite | `KeyStats.tsx:132-156` | section gradient bg + container max-w-1200 + grid 1/3 col × IconBox+tabular-value+label · IntersectionObserver counter | **NEW · ADD `core-v2/src/organisms/KeyStatsStrip.tsx`** |
| **ChapterMethodology / ResearchMethodology** | V0_lite | `ChapterMethodology.tsx` | stepper horizontal + 3-col MethodologyCard grid w/ active=elevated dual-shadow | **NEW · ADD `core-v2/src/organisms/ResearchMethodology.tsx`** |
| **SampleReportPreview** | V0_lite | `SampleReportPreview.tsx` | sidebar 3-state + main `max-w-1200` py-8-16 × multi-chapter preview · divider `my-8-12 border-t black/5` between chapters + Mobile floating TOC | **NEW · ADD `core-v2/src/organisms/SampleReportPreview.tsx`** |
| **FAQSection (canonical · bordered cards + contact CTA)** | V0_lite | `FAQSection.tsx:81-139` | individually bordered cards `border border-black/10 rounded-[10px]` · hover state · ChevronDown w/ `iconColors.utility` · **bottom "Still have questions?" CTA card** · analytics `trackFAQExpand` | **NEW · ADD `core-v2/src/organisms/FAQSection.tsx`** (REPLACE current if any) |
| **RegionalComparison** | V0.2 | `RegionalComparison.tsx:121-127` | 2-col `lg:grid-cols-2 gap-6 lg:gap-8` · TextCard w/ Chart OR Table · paywall variant (blur-sm pointer-events-none + absolute centered Button) | **NEW · ADD `core-v2/src/organisms/RegionalComparison.tsx`** |
| **SegmentationSection (7-card 2/3/2 staggered)** | V0.2 | `SegmentationSection.tsx:63` | 3-row staggered grid · row1 `lg:grid-cols-2` · row2 `md:grid-cols-2 lg:grid-cols-3` · row3 `md:grid-cols-2` · footer gradient takeaways card | **NEW · ADD `core-v2/src/organisms/SegmentationSection.tsx`** |
| **GrowthDriversChallenges (3-col IconCard nested)** | V0.2 | `GrowthDrivers:14-22` | 3-col `md:grid-cols-2 xl:grid-cols-3 gap-6` · IconCard per column (Growth Drivers · Challenges · Opportunities) · nested topic h4 + p + ul bullets | **NEW · ADD `core-v2/src/organisms/GrowthDriversChallenges.tsx`** |
| **MarketDataTable** | V0.2 | `MarketDataTable.tsx:204` | sortable `<table>` · sticky caption · `<th onClick>` clickable + CaretUpDown · rows colored by period · cell w/ inline progress bar `bg-[var(--purple-500)]` + side label | **NEW · ADD `core-v2/src/organisms/MarketDataTable.tsx`** · FIX `<th>` keyboard focusable on port |
| **CompetitiveLandscape** | V0.2 | `CompetitiveLandscape.tsx` | competitor card grid · tier-grouped rows · logos | **NEW · ADD `core-v2/src/organisms/CompetitiveLandscape.tsx`** |
| **TargetAudience** | V0.2 | `TargetAudience:62` | py-24 lg:py-32 · multi-card audience grid · aside p-8 callout | **NEW · ADD `core-v2/src/organisms/TargetAudience.tsx`** |
| **MarketAnalysis** | V0.2 | `MarketAnalysis.tsx` | Highcharts series + analyst insight · paywall row variant | **NEW · ADD `core-v2/src/organisms/MarketAnalysis.tsx`** |
| **MarketOverview** | V0.2 | `MarketOverview.tsx:18-30` | py-24 lg:py-32 · 2-col w/ stats + chart | **NEW · ADD `core-v2/src/organisms/MarketOverview.tsx`** · FIX `--content-max-width` ref |
| **RelatedReports** | report-store-legacy | `RecommendedForYou` / `AnalystPicks` / `FeaturedResearch` | section-heading + view-all CTALink + horizontal card row (HorizontalScroll + ReportCard grid/compact variants) | **NEW · ADD `core-v2/src/organisms/RelatedReports.tsx`** |
| **ReportCardListing** | report-store-legacy | `CardListing.tsx` | wraps each in CardReveal staggered IntersectionObserver · grid sm:cols-2 xl:cols-3 gap-6 · LoadMoreSentinel | **NEW · ADD `core-v2/src/organisms/ReportCardListing.tsx`** |
| **FiltersPanel (desktop sidebar)** | report-store-legacy | `FiltersPanel.tsx:109-216` | aside w-56 sticky top-20 · Card header + 4 accordion CheckboxFilterSection + black Request Custom Research CTA | **NEW · ADD `core-v2/src/organisms/FiltersPanel.tsx`** |
| **ReportStoreHero (search hero)** | report-store-legacy | `ReportStoreHero.tsx:222-307` | flex search-input w/ rc-radius-card · Search icon + divider + category dropdown + brand-red submit w/ ArrowUpRight | **NEW · ADD `core-v2/src/organisms/ReportStoreHero.tsx`** |
| **ListingToolbar** | report-store-legacy | `ListingToolbar.tsx:73-169` | back arrow + count + view toggle + sort select + mobile filter trigger pill | **NEW · ADD `core-v2/src/organisms/ListingToolbar.tsx`** |
| **ReportCard (4 variants · Grid/List/Compact/Featured)** | report-store-legacy | `ReportCard.tsx:202-487` | Grid 16:9+p-4+meta · List 2:3 portrait+3-col · Compact ranked+thumb+always-arrow · Featured full-bleed+multi-badge+dark-bg | **NEW · ADD `core-v2/src/organisms/ReportCard.tsx`** w/ 4 variants |
| **CTASection / FinalCTABlock** | V0_lite | `CTASection.tsx:20-115` | py-12 md:py-16 · orbs bg · centered eyebrow + serif h2 3-step + lede max-w-2xl + single brand CTA | **NEW · ADD `core-v2/src/organisms/FinalCTASection.tsx`** |
| **FloatingCTA (bottom-rising banner)** | 🔴 V0.2 SKIP (user direction) | n/a | user explicit reject | **DO NOT PORT** |
| **AssociationStrip (trust strip)** | V0_lite | `src/.../` · TrustStrip-ish | logo pills · trust badges | **NEW · ADD `core-v2/src/organisms/AssociationStrip.tsx`** |

**Organisms to ADD:** ~25+ new

---

## 4 · Tier 4 · Section templates canonical source

Tier 4 = locked section recipes packaging organism + spacing + composition. Per audit Section 8.

| Template | Canonical source | Composition | Port path |
|---|---|---|---|
| **ChapterSectionTemplate** | V0.2 | `<section py-24 bg-...><Container><div mb-16>OverheadText + SectionHeader + BodyText + (divider + stats)<children />` | **NEW · ADD `core-v2/src/templates/ChapterSectionTemplate.tsx`** |
| **HeroCinematicTemplate** | V0_lite + V0.2 | grid 5-col 3/2 · left badges+h1+lede+CTA+audio · right glass card OR PreviewCard · video/orbs bg | **NEW · ADD `core-v2/src/templates/HeroCinematicTemplate.tsx`** |
| **HeroEditorialTemplate** | V0_lite | bg-orbs section → breadcrumb → 2-col grid w/ left content + right preview-card | **NEW · ADD `core-v2/src/templates/HeroEditorialTemplate.tsx`** |
| **PDPLayoutTemplate (TOC + content)** | V0.2 | sticky Header → sidebar TOC + main column → FloatingCTA (skip per user) → FinalCTA → Footer | **NEW · ADD `core-v2/src/templates/PDPLayoutTemplate.tsx`** |
| **ListingPageTemplate** | report-store-legacy | Container → flex gap-10 → sidebar (FiltersPanel) + main (Hero + Toolbar + ReportCardListing + LoadMore) | **NEW · ADD `core-v2/src/templates/ListingPageTemplate.tsx`** |
| **DataChartTemplate** (chart + table + paywall) | V0.2 | 2-col grid · TextCard chart + TextCard table · optional paywall blur+button overlay | **NEW · ADD `core-v2/src/templates/DataChartTemplate.tsx`** |
| **MultiCardGridTemplate** (Segmentation 2/3/2) | V0.2 | 3-row staggered grid recipe | **NEW · ADD `core-v2/src/templates/MultiCardGridTemplate.tsx`** |
| **AccordionListTemplate (FAQ)** | V0_lite | bordered AccordionItem list + bottom FAQContactCTA | **NEW · ADD `core-v2/src/templates/AccordionListTemplate.tsx`** |
| **StepperPlusGridTemplate (Methodology)** | V0_lite | StepperHorizontal active state + 3-col MethodologyCard grid | **NEW · ADD `core-v2/src/templates/StepperPlusGridTemplate.tsx`** |

**Templates to ADD:** ~9 new (entire Tier 4 is greenfield)

---

## 5 · Tier 5 · Page recipes canonical source

| Recipe | Canonical source | Composition | Path |
|---|---|---|---|
| **V1-product-page** (report PDP) | combined V0_lite chrome + V0.2 organisms + report-store buttons | PDPLayoutTemplate(SideTOC + 22 chapter sections + FinalCTA) | `design-system/recipes/v1-product-page.md` |
| **report-store-listing** | report-store-legacy | ListingPageTemplate | `design-system/recipes/report-store-listing.md` (exists) |
| **case-study** | (existing) | CaseStudyLayoutTemplate | `design-system/recipes/case-study.md` (exists) |
| **about-page** | webpages-ken/ken-research-about | (static · out-of-DS) | n/a |

---

## 6 · Per-component cards · 5W1H (apply during port · sidecar `.md` per atom)

When porting any component to `core-v2/src/<tier>/<Name>.tsx` · also write `<Name>.md` sidecar with this structure:

```md
# <Name>

**Tier:** atom/molecule/organism/template
**Canonical source:** projects/<path>/<file>:<line-range>
**Ported:** YYYY-MM-DD by <agent>
**Status:** ready / draft / experimental

## WHAT
1-sentence + visual ascii / textual.

## WHY
Why this exists. Problem solved. UX rationale (cite UX law if applicable).

## WHEN
Use cases (specific contexts where this is correct).

## WHEN NOT
Anti-patterns / wrong contexts.

## WHERE
Surface(s) it appears in. Page contexts. Section types.

## HOW
- API (props w/ JSDoc)
- Token usage (which tokens · why each)
- A11y (focus · keyboard · aria · landmark · touch target)
- Motion (transitions · reduced-motion handling)
- Responsive (breakpoints · collapse behavior)
- Code example
```

→ See AI-PICKER-GUIDE.md for example-driven WWWWH used by AI to pick components.

---

## 7 · "DO NOT INVENT" rule

For any component listed in §1-4 with status NEW · AI must NOT invent a substitute. If component is missing from core-v2 at port-time:
1. STOP
2. Port the component per CANONICAL-SOURCE-MAP first
3. Then consume

→ Enforced via ANTI-PATTERNS.md (Stage 2.6) · referenced in AI-PICKER-GUIDE.md (Stage 2.5).

---

## 8 · Summary

| Tier | Existing in core-v2 | NEW to ADD | Total |
|---|---|---|---|
| Atoms | ~35 (per existing index) | 7+ | 42 |
| Molecules | ~10 | 20+ | 30 |
| Organisms | ~5 | 25+ | 30 |
| Templates | 0 | 9 | 9 |
| Page recipes | 2 (case-study · report-store-listing) | 1 (v1-product-page) | 3 |

**Total port work: ~62+ new components** across 5 tiers.

---

## 9 · 4WH on this doc itself

**WHAT** · per-component canonical source map · which legacy file owns canonical pattern for each Tier 1-5 component
**WHY** · close "DS missing organism" gap that drove v0.3 invention regression · stop AI from picking wrong source
**WHEN** · referenced during every port task in Stage 3 · referenced by AI-PICKER-GUIDE for component selection
**WHERE** · `core-v2/docs/CANONICAL-SOURCE-MAP.md`
**HOW** · port refactor rules from TOKEN-GAP-REPORT §4 applied per row · sidecar `.md` per component written at port-time · AI-PICKER-GUIDE links here for selection

---

## 10 · Done when

- [ ] User approves this doc
- [ ] PORT-PLAN.md uses this as source for batch ordering
- [ ] AI-PICKER-GUIDE.md references rows by component name
- [ ] Each port creates sidecar `.md` matching §6 template

---

## 11 · Charts decision (added 2026-05-19 · updated post-research)

**Decision:** Charts (rendering) = `@ken-research/charts` npm package · NOT ported from V0.2.

**Audit of `@ken-research/charts` v0.1.5:** ships 9 charts (Line · Bar · Column · Area · Pie · StackedBar · MultiSeriesLine · MultiAxisLine · HistoricalProjectedArea). **Does NOT ship Map.** Uses Highcharts v11.4.6 + highcharts-react-official v3.2.1 as runtime deps.

**Map decision · `react-simple-maps` (MIT)** · NOT Highmaps:
- License-clean (MIT vs Highmaps commercial · avoids procurement gate)
- ~35kB gz + ~12kB d3-geo peer
- Pure-React declarative composition · works natively w/ Framer Motion
- TopoJSON / GeoJSON data via free Natural Earth + maps from @highcharts/map-collection (data is CC-licensed even when Highmaps lib isn't)
- Fallback to Highmaps if Ken Research procurement confirms Highmaps covered under existing Highcharts license · revisit at any time

**ViewToggle decision · underline-active tab strip:**
- ARIA · `role="tablist"` + `role="tab"` + `aria-selected` + `aria-controls`
- Visual · matches editorial style · Stripe/FT/Bloomberg precedent
- Motion · Framer `AnimatePresence mode="wait"` crossfade 150ms · `useReducedMotion()` guard
- Persistence · URL `?view=map|table` via `useSearchParams`

**Implication:**
- V0.2 `ui/chart.tsx` primitive · DROPPED · do not port · use `@ken-research/charts` npm pkg
- v0.3 `MapFallback` · DELETED · `MapChart` organism built fresh (Batch 3.3) w/ react-simple-maps
- v0.3 `DatasetPreviewTable` · DELETED · re-ported from V0.2 canonical via `Table` primitive (Batch 3.2a-redo)
- `RegionalComparison` organism (Batch 3.3) · composes `MapChart` (left) + `Table` (right) w/ `<ViewToggle>` mobile



| Concern | Source |
|---|---|
| Chart rendering (Pie · Bar · StackedBar · Line · Donut) | `@ken-research/charts` npm pkg |
| Map chart | `@ken-research/charts` if available · else `RegionalComparison` organism (chart + table side-by-side) |
| Chart wrapper card (header + slot + insight + source + paywall) | `ChartCard` molecule (already in core-v2) |
| Chart title header (title + subtitle + info icon) | `ChartTitleHeader` molecule (Batch 3.1c) |
| Data table primitive | `Table` atom (V0.2 source · Batch 3.2a-redo) |
| Progress bar | `ProgressBar` atom (V0.2 source · Batch 3.2a-redo) |
| Dataset preview (under chart) | `DatasetPreviewTable` molecule (V0.2 source · Batch 3.2a-redo) |
| Sortable data table organism | `MarketDataTable` organism (V0.2 source · Batch 3.3) |

**Implication:**
- V0.2 `ui/chart.tsx` primitive · DROPPED · do not port · use npm pkg
- v0.3 `MapFallback` · DELETED · NOT in V0.2 either · `RegionalComparison` covers regional data
- v0.3 `DatasetPreviewTable` · DELETED · re-ported from V0.2 canonical via `Table` primitive

---

**END · CANONICAL-SOURCE-MAP.md**
**Next doc:** SPACING-COMPOSITION-LAYOUT-CANON.md (Stage 2.2)
