# AI-PICKER-GUIDE · how AI picks the right component

**Date:** 2026-05-19
**Owner:** Aura (Opus main)
**Status:** AUTHORITATIVE · AI must follow this guide before any component selection
**Audience:** Future AI sessions (Aura · subagents · external collaborators)
**Depends on:** TOKEN-GAP-REPORT · CANONICAL-SOURCE-MAP · SPACING-COMPOSITION-LAYOUT-CANON · GAPS
**Master rules applied:** 4WH · TodoWrite gate-bound

---

## 0 · The picking problem (why this guide exists)

You (AI) have been asked to render a section. You can:
1. Find an existing DS component that fits → import it
2. Compose existing atoms into a custom layout → ok if no organism exists AND port is impractical
3. **Invent a flat substitute and rationalize in JSDoc** ← THIS IS THE BUG · NEVER DO

**Rule:** if a canonical legacy pattern exists but is missing in core-v2 → port it BEFORE consuming · do NOT invent.

This guide tells you HOW to decide.

---

## 1 · The 5-step picker (run this every time)

```
STEP 1 · CLASSIFY the task
  → Identify component type: atom · molecule · organism · template · page-recipe

STEP 2 · CHECK GAPS.md
  → Is the component listed as MISSING?
    YES → STOP. Read CANONICAL-SOURCE-MAP. Port the component. Then return to STEP 4.
    NO  → continue STEP 3

STEP 3 · CHECK core-v2/src/<tier>/index.ts
  → Is the component exported?
    YES → READ its .md sidecar (`<Name>.md`). Use it per WHEN section.
    NO  → It's a hidden gap. ADD to GAPS.md. STOP. Port. Return to STEP 4.

STEP 4 · CHECK SPACING-COMPOSITION-LAYOUT-CANON.md
  → Apply correct spacing tokens · composition recipe · layout rule for the context

STEP 5 · CHECK ANTI-PATTERNS.md
  → Verify you're not violating a rule (brand-red on neutral · wrong-token · gradient ban · etc)
```

---

## 2 · Decision tree (TASK → COMPONENT)

### 2.1 "I need a section header"

| Need | Use | Why |
|---|---|---|
| Just eyebrow text | `<SectionLabel>` atom | Single-purpose eyebrow |
| Just h2 heading | `<SectionHeading level={2}>` atom | Single-purpose heading |
| Full combo: eyebrow + h2 + lede | `<SectionHeader chapter="3" title="Title" heading="2" subtitle="Lede">` molecule (V0.2 canon) | Saves 3 imports + locks composition |
| Within a chapter section template | `<ChapterSectionTemplate>` template wraps SectionHeader | Highest abstraction |

### 2.2 "I need a button"

| Need | Use | Why |
|---|---|---|
| Primary CTA | `<Button variant="primary" size="md">` | Default solid brand-red |
| Secondary action | `<Button variant="secondary" size="md">` | Outline · brand-red border |
| Ghost / tertiary | `<Button variant="ghost" size="md">` | No border · text-only |
| Small inline (card action) | `<Button variant="primary" size="xs">` | 28px tall · for card CTAs (per report-store canon) |
| Compact / dense card | `<Button size="sm">` | 40px |
| Hero / landing | `<Button size="lg" showArrow>` | 56px · w/ AnimatedArrow |
| With diagonal arrow | `<Button showArrow>` | Composes AnimatedArrow |
| Inline text link tier-2 (text + arrow + underline) | `<CTALink>` molecule | Not a button · a styled link |
| Inline text link tier-3 (plain underline) | `<InlineLink>` atom | Lightest link |
| Icon-only button | `<IconButton aria-label="...">` atom | a11y required |

**NEVER:**
- Use gradient button (V0_lite + V0.2 outdated)
- Use raw `<button>` HTML element when DS Button atom exists
- Apply `bg-[#b01f24]` directly · use `<Button variant="primary">`

### 2.3 "I need an arrow"

| Need | Use | Why |
|---|---|---|
| CTA button arrow (right-up shift on hover) | `<AnimatedArrow>` (composed via `<Button showArrow>`) | Canonical hover-shift pattern |
| Inline link arrow | `<CTALink>` composes `<AnimatedArrow>` | Tier-2 link |
| Pagination prev/next | `<PaginationArrow direction="prev">` (if exists · else port) | Directional · brand-red on hover |
| Breadcrumb chevron sep | `<ChevronRightIcon>` from icon set | Static separator |
| Dropdown caret | `<ChevronDownIcon>` from icon set | Rotates 180 on open · `--duration-fast` |
| Accordion expand | `<ChevronDownIcon>` rotated on open | use `iconColors.utility` not brand-red |
| External-link icon | `<ExternalLinkIcon>` from icon set | small inline |
| Scroll-down indicator | `<ScrollIndicator>` (hero bottom) | animated bouncing chevron |

### 2.4 "I need a card"

| Need | Use | Why |
|---|---|---|
| Base flat card | `<Card padding="md" shadow="sm" radius="md">` | Default · 16px padding |
| Compact dense card (4+ in grid) | `<Card padding="sm">` | 12px padding |
| Spacious feature card | `<Card padding="lg" shadow="md">` | 24px padding · slightly elevated |
| Methodology / chapter callout | `<Card padding="xl" shadow="md" hover="lift">` | 32px · lifts on hover |
| Stat card w/ icon | `<StatCard icon value label>` (port from V0.2) | locked composition |
| Methodology card | `<MethodologyCard step active onClick>` | active=elevated state |
| Segmentation card | `<SegmentationCard>` | progress bar variant |
| Analysis card (chart inside) | `<AnalysisCard>` | chart + analyst insight + source |
| Stakeholder card | `<StakeholderCard>` | photo + role + bio |
| Timeline card | `<TimelineCard>` | timeline marker variant |
| Icon card (large icon + content) | `<IconCard icon title>` w/ children for body | recurring V0.2 pattern |
| Text card (header + content split) | `<TextCard>` | header w/ chart-or-text below |
| Report listing card · grid | `<ReportCard variant="grid">` | 16:9 image + meta + CTA |
| Report listing card · list | `<ReportCard variant="list">` | 2:3 portrait + 3-col layout |
| Report listing card · compact | `<ReportCard variant="compact">` | ranked thumbnail + arrow |
| Report listing card · featured | `<ReportCard variant="featured">` | full-bleed hero |

**NEVER:**
- Use raw `<div className="border rounded-[10px] p-4">` when `<Card>` exists
- Strip card chrome that legacy has (e.g., MindMap wrapper card)

### 2.5 "I need a navbar / header"

| Need | Use | Why |
|---|---|---|
| Full Ken Research navbar | `<Navbar>` organism (report-store canon) | utility-bar + main-bar + dropdowns + cmd-K + mobile |
| Stripped-down PDP navbar | NEVER · use full `<Navbar>` · do NOT invent "lean fork" | User direction: do not invent |
| Skip-link | `<SkipLink target="main">` atom | a11y required on every page |
| Mobile menu | `<MobileMenu>` molecule | composed by Navbar |

### 2.6 "I need a footer"

| Need | Use | Why |
|---|---|---|
| Full Ken Research footer | `<Footer>` organism (report-store canon) | dark bg · trust bar + 5-col grid + social |
| Custom footer | NEVER on Ken pages · use canonical | Brand consistency |

### 2.7 "I need a TOC (table of contents)"

| Need | Use | Why |
|---|---|---|
| Sticky sidebar TOC (long-form PDP) | `<TableOfContentsSidebar items activeId>` organism (V0.2 canon) | sticky · scroll-spy · collapse |
| Flat TOC list (in-section) | `<TableOfContents>` atom | simple ol of section titles |
| Mobile floating TOC | composed inside `<SampleReportPreview>` | floating button → bottom-sheet |

### 2.8 "I need an accordion / FAQ"

| Need | Use | Why |
|---|---|---|
| FAQ section (full) | `<FAQSection items>` organism (V0_lite canon) | bordered cards + "Still have questions?" CTA |
| Individual accordion item (custom bordered) | `<AccordionItem>` molecule | reusable in non-FAQ contexts |
| Generic shadcn accordion | `<Accordion>` from shadcn/ui | only when V0.2-style needed (rare) |
| Filter accordion (sidebar) | `<CheckboxFilterSection>` molecule | composed by `<FiltersPanel>` |

### 2.9 "I need stats / metrics display"

| Need | Use | Why |
|---|---|---|
| Hero stat strip (3-col big) | `<KeyStatsStrip stats>` organism | section · gradient bg · counter |
| Inline stat row (in-content) | `<StatPairRow stats>` molecule | flex row · gap-3 sm:gap-6 |
| Single stat pair | `<StatPair label value icon>` atom | horizontal or vertical |
| Stat w/ trend badge | `<StatPair>` + `<StatBadge variant="trend">` | composed |
| Stat card variant (grid context) | `<StatCard>` molecule | enclosed in card chrome |
| StatCardGroup (V0.2 4-variant pattern) | `<StatCardGroup stats>` molecule | 4 layout variants |

### 2.10 "I need a chart"

| Need | Use | Why |
|---|---|---|
| Bar / Line / Pie chart | `@ken-research/charts` package | NOT in core-v2 · separate package |
| Donut chart | `<PieChart donut>` from @ken-research/charts | |
| Stacked bar | `<StackedBarChart>` from @ken-research/charts | |
| Map fallback (table substitute) | `<MapFallback regions>` molecule (in v1 project for now · port to charts pkg later) | KEN-CHARTS-PLAN §B gap |
| Chart wrapper card | `<ChartCard>` molecule from `@kenresearch/design-system/molecules` | composes ChartTitleHeader + ChartBody + insight + source + paywall |
| Mini chart (preview card) | bg-white/5 rounded inline w/ static svg | no DS atom · inline |

**Highcharts a11y rule:** ALWAYS set `accessibility.enabled: true` + add `point.description`.

### 2.11 "I need filters / search / listing"

| Need | Use | Why |
|---|---|---|
| Filter sidebar (desktop) | `<FiltersPanel>` organism | sticky top-20 · accordion sections · request-custom CTA |
| Filter chips row | `<FilterChipRow>` molecule (composed of `<FilterChip>`) | brand-red active |
| Single filter chip | `<FilterChip active onClick>` atom | pill · min-h-40 · check icon when active |
| Filter checkbox | `<FilterCheckbox checked onChange>` atom | custom 16×16 · inset shadow |
| Mobile filter bar | `<MobileFilterBar count onClick>` molecule | fixed bottom pill |
| Mobile filter sheet | `<MobileFilterSheet open onClose>` molecule | full-screen sheet |
| Listing toolbar | `<ListingToolbar count viewMode sort>` organism | back + count + view toggle + sort |
| Card grid listing | `<ReportCardListing items viewMode>` organism | grid sm:cols-2 xl:cols-3 + loadmore |
| Search hero (store) | `<ReportStoreHero>` organism | search input + category dropdown + brand-red submit |
| Cmd-K search trigger | `<CmdKSearchTrigger>` molecule (in Navbar) | opens command menu |

### 2.12 "I need a hero"

| Need | Use | Why |
|---|---|---|
| Cinematic dark report hero | `<HeroSection variant="cinematic">` organism (V0_lite + V0.2 hybrid) | video bg + orbs + glass card |
| Editorial light hero | `<HeroSection variant="editorial">` organism (V0_lite) | clean grid · breadcrumb + content |
| Search hero (store) | `<ReportStoreHero>` (separate organism) | for /report-store listing page |
| Case-study hero | `<CaseStudyHero>` (existing in core-v2 · NOT this work) | for case-study pages |

### 2.13 "I need MindMap / Taxonomy / Scope"

| Need | Use | Why |
|---|---|---|
| Scope of Report section | `<ScopeOfReport data>` organism | MindMap preview embed + modal |
| Taxonomy tree | `<TaxonomyTree data>` organism (shares MindMap engine) | nested concept tree |
| MindMap modal-only (custom context) | `<MindMapModal data>` organism | full-screen viewer |
| Raw MindMap engine | `<MindMap interactionMode="preview">` organism | direct D3 access |

**NEVER:** invent a flat dl-list substitute when ScopeOfReport organism missing · PORT first.

### 2.14 "I need a CTA section"

| Need | Use | Why |
|---|---|---|
| Final page CTA section (centered) | `<FinalCTASection eyebrow heading lede ctaLabel>` organism (V0_lite canon) | py-12 md:py-16 · orbs bg · serif h2 |
| Inline CTA row in card | `<CTARowResponsive primary secondary>` molecule | responsive 3-tier visibility |
| Bottom-rising banner | 🔴 DO NOT USE · user explicit reject | n/a |

### 2.15 "I need related reports"

| Need | Use | Why |
|---|---|---|
| Related reports rail | `<RelatedReports section="recommended">` organism | section-heading + view-all + horizontal card row |
| Card horizontal scroll | composed via `<HorizontalScroll>` + `<ReportCard variant="compact">` | inside RelatedReports |

### 2.16 "I need methodology / step process"

| Need | Use | Why |
|---|---|---|
| Research methodology section | `<ResearchMethodology steps>` organism | stepper + 3-col MethodologyCard grid |
| Just the stepper | `<StepperHorizontal steps activeId onSelect>` molecule | reusable |
| Methodology card alone | `<MethodologyCard step active onClick>` molecule | grid item |

### 2.17 "I need a data table"

| Need | Use | Why |
|---|---|---|
| Sortable data table w/ paywall | `<MarketDataTable rows columns sort>` organism | sortable + sticky caption + progress bar cell + paywall variant |
| Generic table | `<DatasetPreviewTable>` molecule | flat preview |
| Comparison table (regional) | `<RegionalComparison>` organism | 2-col chart+table |

### 2.18 "I need a sample report preview"

Use `<SampleReportPreview chapters>` organism (V0_lite canon). NO substitutes.

### 2.19 "I need section composition"

Default chapter section template:

```tsx
<ChapterSectionTemplate
  chapter="3"
  title="Country & Infrastructure Context"
  heading="2"
  lede="Optional lede paragraph"
  background="white" // or "warm" or "black-50"
  spacing="lg"
  id="country-context"
>
  {/* organism · cards · chart */}
</ChapterSectionTemplate>
```

Alternates: HeroCinematicTemplate · HeroEditorialTemplate · DataChartTemplate · MultiCardGridTemplate · AccordionListTemplate · StepperPlusGridTemplate · ListingPageTemplate.

### 2.20 "I need a page layout"

| Need | Template |
|---|---|
| Report PDP | `<PDPLayoutTemplate navbar toc sections finalCTA footer>` |
| Report store listing | `<ListingPageTemplate hero filters listing>` |
| Single-column landing | `<SingleColumnLayout>` |
| Case-study | (existing case-study templates) |

---

## 3 · Token picker (which token when)

### 3.1 Type size picker

| Visual size | Use cases | Token |
|---|---|---|
| Micro 11px | Badge xs · avatar initial · card micro-label | `--text-2xs` |
| 13px nav helper | Breadcrumb · sub-nav · methodology meta | `--text-nav-helper` (NEW) |
| 12.8px small | Eyebrow label · stat-label · footer body | `--text-xs` |
| 14px nav | Nav links · filter titles · compact card body | `--text-nav` / `--text-compact` |
| 16px body DEFAULT | Body paragraph · FAQ answer · card body | `--text-sm` |
| 18px sub-body | Card title (3-card grid) · slightly larger body | `--text-md` (NEW) |
| 20px body large | Lede paragraph · card title (2-card grid) | `--text-base` |
| 25px card title | Card title (1-2 card grid) | `--text-lg` |
| 31px subsection h3 | h3 / subheading | `--text-xl` |
| 39px section h2 | Section heading · SectionHeading level=2 | `--text-2xl` |
| 49px hero h1 | Hero h1 · FinalCTA h2 | `--text-3xl` |
| 61px display | Extra-large hero · numeric stat highlight | `--text-4xl` |
| 76px massive | Rare · future use | `--text-5xl` |

### 3.2 Color picker

| Use case | Token |
|---|---|
| Heading text | `--black-900` (= `--text-primary`) |
| Body text | `--black-700` (= `--text-secondary` rgba 0.6) |
| Muted / meta text | `--black-500` |
| Disabled / placeholder | `--black-400` |
| Border default | `--black-200` |
| Border subtle | `--black-100` |
| Surface white | `--white` |
| Surface neutral | `--black-50` (= `--neutral-50`) |
| Surface warm | `--warm-300` |
| CTA / brand action | `--brand-red` |
| Brand hover | `--brand-red-hover` |
| Brand active | `--brand-red-active` |
| Data viz primary | `--purple-600` |
| Data viz secondary | `--purple-500` |
| Premium / accent | `--purple-300` (on dark bg) |
| Trust / safe | `--periwinkle-500` |
| Data sections | `--perano-500` |
| Energy / warmth | `--coral-500` |
| Success / positive | `--green-600` (dark bg) / `--green-700` (light bg body) |
| Warning / pending | `--amber-400` |
| Form error / risk (NOT brand) | `--rose-600` |
| Dark bg cinematic | `--bg-cinematic` |
| Glass surface (dark bg only) | `--glass-bg` (+ border / glow / text) |

### 3.3 Radius picker

| Use case | Token |
|---|---|
| Sharp | `--radius-0` |
| Logo / icon detail | `--radius-2xs` (2.5px) |
| Button · input · tag · badge | `--radius-xs` (5px) (= `--radius-element`) |
| Card (default) | `--radius-sm` (10px) (= `--rc-radius-card`) |
| Feature card · modal · large button | `--radius-md` (15px) |
| Hero card · large container | `--radius-lg` (20px) |
| Pill · avatar | `--radius-full` (9999) |

### 3.4 Shadow picker

| Use case | Token |
|---|---|
| Card rest (subtle) | `--shadow-card-rest` |
| Card hover (lift) | `--shadow-card-hover` |
| Card active (depressed-ish) | `--shadow-card-active` |
| Brand button rest (red glow) | `--shadow-brand-button` |
| Brand button hover | `--shadow-brand-button-hover` |
| Search hero (dramatic) | `--shadow-search-hero` |
| Glass-header (light surface) | (use `--glass-header-bg` + `--glass-header-blur`) |
| Accent purple glow (mindmap hover) | `--shadow-accent-md` |

### 3.5 Easing + duration picker

| Use case | Easing | Duration |
|---|---|---|
| Default entrance | `--ease-smooth` | `--duration-medium` 500ms |
| Arrow hover-shift | `--ease-arrow` | `--duration-normal` 300ms |
| Card lift hover | `--ease-card-lift` | 400ms (or `--duration-medium`) |
| Button shimmer | `--ease-arrow` | `--duration-shimmer` 700ms |
| Button ripple | `--ease-arrow` | `--duration-slow` 600ms |
| Quick state toggle (focus · tab) | `--ease-arrow` | `--duration-fast` 200ms |
| Tooltip · dropdown | `--ease-smooth` | `--duration-instant` 150ms |
| Page transition / video fade | `--ease-smooth` | `--duration-slowest` 1000ms |

---

## 4 · "WHEN TO USE THIS" cheat-sheet (top 10 most-asked)

1. **"I need to render the report scope section"** → `<ScopeOfReport data={scope}>` organism · NOT a flat dl
2. **"I need the page navbar"** → `<Navbar>` organism · NOT a custom `<header>` with 4 links
3. **"I need a button"** → `<Button variant size showArrow>` · NEVER raw `<button>` w/ brand-red bg
4. **"I need a small CTA on a card"** → `<Button size="xs" variant="primary">` · 28px tall
5. **"I need a stat strip"** → `<KeyStatsStrip stats>` organism for hero stats · `<StatPairRow>` molecule for in-content
6. **"I need the FAQ"** → `<FAQSection items>` organism · bordered cards + contact CTA · NOT borderless rows
7. **"I need a chart card"** → `<ChartCard>` molecule from `@kenresearch/design-system/molecules`
8. **"I need a section header"** → `<SectionHeader chapter title heading subtitle>` molecule · saves 3 imports
9. **"I need a sticky TOC"** → `<TableOfContentsSidebar>` organism · NEVER invent
10. **"I need a related-reports rail"** → `<RelatedReports>` organism · `<ReportCard variant="compact">` inside

---

## 5 · Decision pseudocode (executable mental model)

```python
def pick_component(task):
    component_type = classify(task)  # atom · molecule · organism · template · page

    # STEP 1: check GAPS.md
    if is_missing(component_type, GAPS):
        STOP()
        port_first(CANONICAL_SOURCE_MAP[component_type])
        return consume_after_port()

    # STEP 2: check core-v2 export
    if not is_exported(component_type, 'core-v2'):
        add_to_gaps(component_type)
        STOP()
        port_first()
        return consume_after_port()

    # STEP 3: read sidecar .md
    spec = read_md_sidecar(component_type)

    # STEP 4: apply spacing/composition/layout canon
    spacing = SPACING_LAYOUT_CANON[spec.context]

    # STEP 5: check anti-patterns
    if violates(ANTI_PATTERNS):
        adjust()

    # STEP 6: assemble
    return jsx_from_spec(spec, spacing)
```

---

## 6 · 4WH self-check (apply per component selection)

Before importing or composing, answer:
- **WHAT** · what does this component do (1 sentence)
- **WHY** · why is it correct for this context
- **WHEN** · is this the right time to use it (vs alternative)
- **WHERE** · which surface / section / page · is the context valid
- **HOW** · what props · what tokens · what a11y · what motion

If any answer is "I don't know" or "I'm guessing" → STOP. Read the component's sidecar `.md` OR escalate to user.

---

## 7 · ANTI-INVENTION enforcement

If you find yourself writing:
- `<div className="border rounded-[10px] p-4">...</div>` instead of `<Card>` → STOP
- `<button className="bg-[#b01f24]...">` instead of `<Button variant="primary">` → STOP
- A flat `<ul>` for taxonomy when MindMap missing → STOP · port MindMap
- JSDoc `@what NO cards · lean fork · stripped-down version` → STOP · this is rationalization

→ If component is missing, ADD to GAPS.md + port per CANONICAL-SOURCE-MAP · NEVER invent flat substitute.

---

## 8 · Quick-reference card (laminated · always-load)

```
┌────────────────────────────────────────────────────────────────┐
│  PICK A COMPONENT — 5 STEPS                                   │
│  1 · CLASSIFY     · atom / molecule / organism / template     │
│  2 · GAPS.md      · is it missing? → PORT FIRST               │
│  3 · core-v2      · check src/<tier>/index.ts                 │
│  4 · CANON        · spacing + composition + layout           │
│  5 · ANTI-PATTERNS · verify no violation                       │
│                                                                │
│  TOKEN: base.css :root · 200+ tokens · all WWWWH'd            │
│  SOURCE: CANONICAL-SOURCE-MAP.md per component                 │
│  WHEN: AI-PICKER-GUIDE.md per task type                        │
│  RULES: SPACING-COMPOSITION-LAYOUT-CANON.md                    │
│  NEVER: GAPS.md + ANTI-PATTERNS.md                             │
└────────────────────────────────────────────────────────────────┘
```

---

## 9 · Done when

- [ ] User approves this doc
- [ ] Referenced from `core-v2/docs/QUICK_START.md` and root `CLAUDE.md`
- [ ] Every Stage 3 port creates `<Name>.md` sidecar matching template
- [ ] At Stage 4 v0.3 swap · AI consults this guide per section

---

**END · AI-PICKER-GUIDE.md**
**Next doc:** ANTI-PATTERNS.md update (Stage 2.6)
