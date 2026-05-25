# SPACING · COMPOSITION · LAYOUT CANON

**Date:** 2026-05-19
**Owner:** Aura (Opus main)
**Status:** AUTHORITATIVE · feeds PORT-PLAN + AI-PICKER-GUIDE + ANTI-PATTERNS
**Depends on:** TOKEN-GAP-REPORT.md · CANONICAL-SOURCE-MAP.md
**Master rules applied:** 4WH per rule · TodoWrite gate-bound

---

## 0 · WHY

Audits found inconsistent spacing/composition/layout across 3 legacy pages. AI must know: WHEN to use which spacing token · WHEN to use which composition recipe · WHEN to use which layout pattern.

This doc encodes the cross-page CANON · per-page deviations folded into single source of truth.

---

## 1 · SPACING canon

### 1.1 Section vertical padding (inter-section)

| Use case | Token | px (mobile/desktop) | When |
|---|---|---|---|
| Compact section | `--section-py-sm` → `py-8 md:py-12` | 32 / 48 | Trust bar · breadcrumb · slim utility section |
| Standard section | `--section-py-md` → `py-10 md:py-16` | 40 / 64 | Most content sections |
| Tall section | `--section-py-lg` → `py-12 md:py-20` | 48 / 80 | Hero · chapter w/ ample air |
| Cinematic section | `--section-py-xl` → `py-16 md:py-24` | 64 / 96 | Hero (cinematic) · FinalCTA only |

**Canon source:** V0_lite SectionWrapper (`SectionWrapper.tsx:46-51`) · used universally.
**V0.2 deviation:** uses `py-24 lg:py-32` (96/128px) everywhere — REJECTED · too tall · core-v2 caps at xl=64/96.
**WHY:** taller padding makes content feel disconnected on long-scroll pages · 64/96 is enough cinematic without disconnection.

### 1.2 Horizontal page padding (container edge gutter)

| Token | Value | Breakpoint |
|---|---|---|
| `--padding-mobile` | `1rem` (16px) | < sm (mobile) |
| `--padding-tablet` | `1.5rem` (24px) | sm-md |
| `--padding-desktop` | `2rem` (32px) | md+ |

**Tailwind class:** `px-4 sm:px-6 md:px-8` (universal in V0_lite + report-store).
**V0.2 deviation:** `px-[84.375px] lg:px-[112.5px]` — REJECTED · odd hardcoded values · revert to standard.

### 1.3 Container max-widths

| Token | Value | Use case |
|---|---|---|
| `--container-compact` | `37.5rem` (600px) | Form column · single-card centered |
| `--container-prose` | `43.75rem` (700px) | Long-form text body · article lede |
| `--container-narrow` | `56.25rem` (900px) | Section content narrow |
| `--container-content` | `62.5rem` (1000px) | Default section content `maxWidth="content"` |
| `--container-page` | `75rem` (1200px) | Page chrome · navbar · footer · default page |
| `full` | `100%` | Edge-to-edge layouts (rare · cinematic Hero w/ embedded narrower text col) |

**Default:** `--container-page` (1200px) for page chrome · `--container-content` (1000px) for section content.

### 1.4 Section-internal vertical rhythm (intra-section spacing)

Order of elements inside a chapter section + spacing between:

```
SectionLabel (eyebrow)
    ↓ --pair-label-heading: 0.75rem (12px)  [V0_lite uses mb-2 = 8px · V0.2 mb-4 = 16px · CANON = 12px between]
SectionHeading (h2)
    ↓ --pair-heading-description: 1rem (16px)  [V0_lite mb-4 = 16px CANON]
BodyText / Lede (max-w-prose)
    ↓ --section-header-mb: 2.5rem (40px)  [V0_lite mb-10 = 40px CANON · V0.2 mb-16 = 64px REJECTED]
Section content (cards / charts / lists)
    ↓ --section-content-cta-gap: 2rem (32px)
Optional CTA row
```

**Canon source:** V0_lite consistent across Hero · KeyStats · Methodology · FAQ · CTA · Highlights.

### 1.5 Card internal padding

| Density | Token | Use case |
|---|---|---|
| Compact card | `--card-padding-sm` 0.75rem (12px) | Tight nested cards · sub-items |
| Default card | `--card-padding-md` 1rem (16px) | DEFAULT · stat cards · methodology cards · most cards |
| Spacious card | `--card-padding-lg` 1.5rem (24px) | Feature cards · text-card content |
| Generous card | `--card-padding-xl` 2rem (32px) | Hero glass card · methodology callout · Sample preview chapter |

**ADD missing:** `--card-padding-xl: 2rem` (audit shows `p-8` used in Methodology + Hero glass · not yet tokenized).

### 1.6 Stack spacing patterns

| Pattern | Tailwind | px | When |
|---|---|---|---|
| Hairline gap | `space-y-1` | 4px | List items tight |
| Tight pair | `space-y-2` | 8px | Stat label-value |
| Default | `space-y-3` | 12px | Content list items |
| Generous | `space-y-4` | 16px | FAQ items · paragraph stack |
| Card block | `space-y-6` | 24px | Methodology card section blocks |
| Section internal | `space-y-8` | 32px | Hero left-col block (eyebrow + h1 + lede + CTA) |
| Section header → content | `space-y-10` | 40px | post-section-header → cards |
| Cinematic | `space-y-12` | 48px | Hero left → right |

### 1.7 Grid gaps

| Pattern | Tailwind | px | When |
|---|---|---|---|
| Card grid tight | `gap-4` | 16px | Mobile card grid · methodology sub-grid |
| Default card grid | `gap-6` | 24px | DEFAULT · 3-col card grid (Highlights · Methodology · ReportCard listing · GrowthDrivers) |
| Wide card grid | `gap-8` | 32px | Desktop spacious card grid (KeyStats `gap-8 sm:gap-12 md:gap-16`) |
| Cinematic | `gap-10 lg:gap-12` | 40-48 | Hero 2-col grid · ListingPage sidebar+content |
| Stat divider | `gap-12 sm:gap-16` | 48-64 | KeyStats 3-col desktop |

**V0.2 standard:** `gap-6 lg:gap-8` (24/32) for card grids — adopted as DEFAULT.

### 1.8 Spacing pair tokens (semantic pairs)

These exist · canonicalize use:

| Token | Value | Use |
|---|---|---|
| `--pair-label-heading` | 0.75rem (12px) | Eyebrow label → h2 |
| `--pair-heading-description` | 1rem (16px) | h2 → lede paragraph |
| `--pair-section-content` | 1.5rem (24px) | Lede → content |
| `--pair-content-cta` | 2rem (32px) | Content → CTA row |
| `--section-header-mb` | 2.5rem (40px) | Bottom of section-header block (eyebrow+h2+lede) before content |

**Canon source:** V0_lite recipes (Section 8 of audit).

### 1.9 Stat row internal gaps

```
3-col stat strip:
  grid-cols-3 gap-3 sm:gap-6 (mobile 12 → desktop 24)

OR desktop large stats:
  grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16 (32 → 48 → 64)
```

**Canon:** V0_lite KeyStats uses larger spacing (32-64) — for hero-context stats. Hero in-card uses tighter (12-24).

### 1.10 Listing patterns (report-store canon)

| Pattern | Spacing | Source |
|---|---|---|
| Grid listing | `grid sm:grid-cols-2 xl:grid-cols-3 gap-6` | report-store CardListing |
| List view (rows) | `flex flex-col gap-3` | report-store list mode |
| Filter chip row | `gap-1.5` (6px) | report-store FiltersPanel |
| Filter category list items | `space-y-0.5` | report-store FiltersPanel |

### 1.11 Sticky offsets

| Element | Token | Value |
|---|---|---|
| Navbar (sticky top) | `--sticky-navbar-top` | 0 |
| Navbar height (offset for sticky elements below) | `--navbar-height` | 56px (report-store) OR 64px (V0_lite) — **CANON 64px** |
| TOC sidebar top | `--sticky-toc-top` | `var(--navbar-height) + 24px` = `calc(64px + 24px) = 88px` |
| Section anchor scroll-margin | `--scroll-margin-section` | `calc(var(--navbar-height) + 8px)` = `72px` |

### 1.12 Navbar + Footer specifics

| Element | Token | Value | Source |
|---|---|---|---|
| Utility bar height | `--utility-bar-h` | 32px (`h-8`) | report-store |
| Main nav height | `--main-nav-h` | 56px (report-store) OR 64px (V0_lite) — **CANON 64px** | both |
| Footer padding | `py-12` desktop · `py-8 sm:py-12` mobile-up | 48 / 32-48 | V0_lite |
| Footer trust bar | `py-6` | 24px | report-store |
| Footer bottom bar | `py-4` | 16px | report-store |
| Footer 5-col gap | `gap-8` | 32px | V0_lite |

---

## 2 · COMPOSITION canon

### 2.1 Section composition recipe (DEFAULT for any chapter section)

```
<SectionWrapper background spacing maxWidth id data-component>
  <Container maxWidth="content">
    {/* SECTION HEADER BLOCK · mb-10 md:mb-12 (40-48px) */}
    <div className="mb-10 md:mb-12">
      <SectionLabel variant="accent">CHAPTER N - LABEL</SectionLabel>      {/* mb 12 */}
      <SectionHeading level={2}>Title<span className="block">Wrap</span></SectionHeading>  {/* mb 16 */}
      <BodyText spacing="first" className="max-w-prose">Lede paragraph.</BodyText>          {/* mb 0 (parent mb handles) */}
    </div>

    {/* SECTION CONTENT BLOCK */}
    <div>
      {/* organism · cards · chart · etc */}
    </div>

    {/* OPTIONAL SECTION CTA */}
    {hasCta && (
      <div className="mt-8 md:mt-10">
        <CTALink href="/...">View More</CTALink>
      </div>
    )}
  </Container>
</SectionWrapper>
```

**Canon source:** V0_lite ChapterMethodology · CTASection · KeyStats · Highlights · FAQ.

### 2.2 Hero composition recipe (cinematic)

```
<SectionWrapper background="cinematic-dark" spacing="xl" maxWidth="page" data-component="HeroCinematic">
  <Container maxWidth="page">
    {/* Breadcrumb · mb-6 sm:mb-8 */}
    <Breadcrumb items={[...]} />

    {/* GRID 5-col · 3/2 split */}
    <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
      {/* LEFT · col-span-3 · space-y-6 */}
      <div className="lg:col-span-3 space-y-6">
        <SectionLabel variant="accent-dark">CHAPTER 0 · TITLE</SectionLabel>
        <h1 className="font-serif font-light text-[1.953rem] sm:text-[2.441rem] md:text-[3.052rem] leading-[1.1] tracking-[var(--tracking-display-tight)]">
          Headline w/ <span className="block">line break</span>
        </h1>
        <p className="text-base text-glass-text max-w-lg leading-relaxed">Lede paragraph.</p>
        <CTARowResponsive primary={...} secondary={...} />
        <MetadataStrip items={[{label, value}, ...]} />
      </div>

      {/* RIGHT · col-span-2 */}
      <div className="lg:col-span-2">
        <PreviewCard /> {/* OR GlassCard w/ data summary */}
      </div>
    </div>

    {/* SCROLL INDICATOR · bottom-6 center */}
    <ScrollIndicator />
  </Container>

  {/* CINEMATIC CHROME · floating orbs + grid pattern + video bg */}
  <HeroBackground />
</SectionWrapper>
```

**Canon source:** V0_lite + V0.2 hybrid (audit §8 #7 + §8 #1).

### 2.3 FAQ composition recipe

```
<SectionWrapper background="warm" spacing="lg" maxWidth="content" data-component="FAQ">
  <Container maxWidth="content">
    <div className="mb-10 md:mb-12">
      <SectionLabel>FREQUENTLY ASKED</SectionLabel>
      <SectionHeading level={2}>FAQs about this report</SectionHeading>
      <BodyText>Common questions and answers.</BodyText>
    </div>

    {/* LIST · space-y-4 */}
    <div className="space-y-4">
      {items.map(item => <AccordionItem key={item.q} {...item} />)}
    </div>

    {/* CONTACT CTA · mt-10 sm:mt-12 */}
    <FAQContactCTA className="mt-10 sm:mt-12" />
  </Container>
</SectionWrapper>
```

**Canon source:** V0_lite FAQSection (audit §8 #5).

### 2.4 Stats strip composition recipe

```
<SectionWrapper background="white" spacing="md" data-component="KeyStatsStrip">
  <Container maxWidth="page">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
      {stats.map(stat => (
        <StatPair
          key={stat.label}
          icon={<IconBox color={stat.color}>{stat.icon}</IconBox>}
          value={stat.value}     {/* text-[1.953rem] tabular-nums font-semibold */}
          label={stat.label}     {/* text-[1rem] text-utility-icon */}
          orientation="horizontal"
        />
      ))}
    </div>
  </Container>
</SectionWrapper>
```

**Canon source:** V0_lite KeyStats (audit §8 #2).

### 2.5 ChartCard composition recipe

```
<Card padding="lg" variant="white" data-component="ChartCard">
  <ChartTitleHeader title={...} subtitle={...} info={...} />
  <ChartBody />  {/* Highcharts · accessibility.enabled: true */}
  <ChartAnalystInsight>...</ChartAnalystInsight>
  <SourceLine source={...} lastUpdated={...} />
</Card>
```

### 2.6 PaywallCard composition recipe

```
<div className="relative">
  <div className="blur-sm pointer-events-none">
    {/* obscured content */}
  </div>
  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
    <Badge theme="brand">PREMIUM</Badge>
    <Button variant="primary" showArrow>Unlock</Button>
  </div>
</div>
```

### 2.7 Stepper + Card Grid composition recipe (Methodology)

```
<div data-component="ResearchMethodology">
  {/* STEPPER · top centered */}
  <StepperHorizontal
    steps={...}
    activeId={active}
    onSelect={setActive}
    className="mb-10 md:mb-12 sm:justify-center overflow-x-auto"
  />

  {/* CARD GRID · 3-col · active=elevated */}
  <div className="grid md:grid-cols-3 gap-4 lg:gap-5">
    {steps.map(step => (
      <MethodologyCard
        key={step.id}
        active={step.id === active}
        onClick={() => setActive(step.id)}
        {...step}
      />
    ))}
  </div>
</div>
```

### 2.8 Multi-card staggered grid (Segmentation 2/3/2)

```
<div className="space-y-6">
  {/* ROW 1 · 2-col */}
  <div className="grid lg:grid-cols-2 gap-6">
    {row1.map(c => <SegmentationCard key={c.id} {...c} />)}
  </div>
  {/* ROW 2 · 2-col tablet / 3-col desktop */}
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {row2.map(c => <SegmentationCard key={c.id} {...c} />)}
  </div>
  {/* ROW 3 · 2-col */}
  <div className="grid md:grid-cols-2 gap-6">
    {row3.map(c => <SegmentationCard key={c.id} {...c} />)}
  </div>
  {/* FOOTER · gradient takeaways card · 2-col sub-cards */}
  <TakeawaysCard items={takeaways} />
</div>
```

### 2.9 Breadcrumb composition recipe

```
<nav aria-label="Breadcrumb">
  <ol className="flex items-center flex-wrap gap-2 text-[var(--text-nav-helper)]">
    {items.map((item, idx) => (
      <li key={item.href} className="flex items-center gap-2">
        {idx > 0 && <ChevronRightIcon />}
        <a
          href={item.href}
          aria-current={idx === items.length - 1 ? 'page' : undefined}
          className={idx === items.length - 1 ? 'font-medium text-[var(--black-900)]' : 'text-[var(--black-500)] hover:text-[var(--brand-red)]'}
        >
          {item.label}
        </a>
        {item.hasDropdown && <BreadcrumbDropdownTrigger item={item} />}
      </li>
    ))}
  </ol>
</nav>
```

### 2.10 Listing page composition recipe (report-store)

```
<Container maxWidth="page" className="py-10 lg:py-12">
  <div className="flex gap-0 lg:gap-10">
    {/* SIDEBAR · 224px · hidden < xl */}
    <aside className="w-56 flex-shrink-0 hidden xl:block">
      <div className="sticky top-20">
        <FiltersPanel />
      </div>
    </aside>

    {/* CONTENT · flex-1 */}
    <div className="flex-1 min-w-0">
      <ListingToolbar />
      <ReportCardListing items={...} viewMode={viewMode} />
      <LoadMoreSentinel onLoadMore={...} />
    </div>
  </div>

  {/* MOBILE · filter bar fixed bottom */}
  <MobileFilterBar />
</Container>
```

### 2.11 Type pairing patterns (recurring)

| Pair | Tokens | Use |
|---|---|---|
| Eyebrow → Heading | `text-xs uppercase tracking-[var(--tracking-label-x-wide)]` → `font-serif font-light text-2xl leading-[1.1] tracking-[var(--tracking-display-tight)]` | Section header |
| Heading → Lede | `font-serif font-light text-2xl` → `text-sm text-secondary leading-relaxed max-w-prose` | Section intro |
| Stat label-value | `text-xs text-secondary tracking-wide` over `font-serif font-light text-xl tabular-nums leading-[1.2]` (vertical) OR `text-xs uppercase` under value | Stats |
| CTA + Arrow | `font-medium text-nav tracking-[var(--tracking-button)]` + AnimatedArrow | Buttons + links |
| Card title + meta | `font-medium text-base leading-snug` → `text-xs text-secondary` | Card head |
| Number + currency | `font-serif font-light text-2xl tabular-nums` + `text-xs text-secondary uppercase ml-1` | Price |
| Eyebrow + label inline | `text-xs uppercase tracking-widest text-brand-red font-semibold` + `text-sm text-black-900 font-medium` | Inline tags |
| Author + role | `font-medium text-sm text-black-900` over `text-xs text-secondary` | Testimonial |
| Industry badge + date | `text-xs uppercase text-secondary tracking-wide` + `text-xs text-tertiary` | Report meta |
| Heading + subheading line-break | `text-2xl` first line + `text-2xl block` second line (same size · just line-break) | Chapter title 2-line |

---

## 3 · LAYOUT canon

### 3.1 Page-level layouts

| Layout | Use case | Structure |
|---|---|---|
| **PDP-layout (TOC + content)** | Report PDP · long-form report | `<Navbar/> <SkipLink target="main"/> <aside sticky toc/> <main id="main">{sections}</main> <FinalCTA/> <Footer/>` |
| **Listing-layout (sidebar + content)** | report-store listing · search results | `<Navbar/> <Container><Hero/> <flex gap-10 [sidebar:Filters · main:Toolbar+Listing]/> </Container> <Footer/>` |
| **Single-column** | Static landing · about · FAQ-only | `<Navbar/> <Container maxWidth="content">{sections}</Container> <Footer/>` |
| **Cinematic Hero + content** | case-study · feature landing | `<Navbar/> <HeroCinematic full-bleed/> <Container>{sections}</Container> <Footer/>` |

### 3.2 Z-index ladder (locked)

| Layer | Token | Value | Element |
|---|---|---|---|
| base | `--z-base` | 1 | Default elements |
| dropdown | `--z-dropdown` | 10 | Select menus · dropdown panels |
| sticky | `--z-sticky` | 100 | Sticky TOC · sticky filters |
| navbar | `--z-navbar` | 1000 | Top navbar |
| floating-cta | `--z-floating` | 1500 | Bottom-fixed CTA / mobile filter bar |
| modal-backdrop | `--z-modal-backdrop` | 9990 | Modal overlay |
| modal | `--z-modal` | 9999 | Modal content |
| tooltip | `--z-tooltip` | 10000 | Tooltips on top |

**Canon source:** V0_lite `tokens.ts:288-296` · ADD any missing to base.css.

### 3.3 Breakpoint behavior

Tailwind defaults:
- sm: 640
- md: 768
- lg: 1024
- xl: 1280
- 2xl: 1536

**Layout collapse points:**
- 2-col Hero → single col @ < lg (1024)
- 3-col card grid → 2-col @ < lg · 1-col @ < md
- Listing sidebar → hidden @ < xl (1280) · MobileFilterSheet instead
- TOC sidebar → hidden @ < lg (1024) · burger menu OR floating TOC
- 5-col Footer → 2-col @ < md
- 5-col MetadataStrip → 2-col @ < sm

### 3.4 Sticky element layering

```
top: 0       → Navbar (z-1000)
top: 64px    → TOC sidebar (z-100) · sticky top-[calc(var(--navbar-height) + 24px)]
top: 0       → Section anchors w/ scroll-margin-top: 72px
fixed bottom → FloatingCTA OR MobileFilterBar (z-1500)
```

### 3.5 Background alternation rhythm (DEFAULT)

```
Section 1: white
Section 2: var(--warm-300) (#f5f2f1)   OR  var(--black-50) (#fafafa)
Section 3: white
Section 4: var(--warm-300)
...
```

**Canon source:** V0.2 (Section 9 of audit) — `white / --black-50` alternation.
**V0_lite uses:** white default + `--warm-300` accent (editorial bg composition).
**CANON DECISION:** use `white / --warm-300` alternation for editorial pages · `white / --black-50` for data-heavy pages · BOTH valid per page type.

Cinematic sections (`bg-black` or `--bg-cinematic`) used only:
- Hero (cinematic variant)
- FinalCTA (optional)
- Footer (always dark)

### 3.6 Pattern overlays

| Pattern | Use case | Spec |
|---|---|---|
| Dot-pattern | Section bg accent (rare) | `--pattern-opacity 0.05` · `--pattern-grid-size 20px` · `--pattern-dot-size 1px` |
| Grid-pattern | Cinematic Hero bg | `--pattern-opacity 0.03` · `--pattern-grid-size 40px` |
| Orbs | Cinematic Hero · CTA section accent | 2 floating blur orbs · rAF animation w/ reduced-motion guard |

**RULES:**
- Pattern bg only on `--warm-300` OR `--black-50` OR cinematic dark surfaces.
- Pattern overlay NEVER on white default surface (kills text legibility).

---

## 4 · 4WH applied per major rule (spot-check 5 examples)

**Rule: Section header bottom margin = 40-48px (`mb-10 md:mb-12`)**
- WHAT · Vertical air between section header block (eyebrow+h2+lede) and section content
- WHY · Separates intent declaration from content delivery · readability research shows 1.5-2× body line-height optimal here
- WHEN · Every chapter section · DEFAULT in `ChapterSectionTemplate`
- WHERE · Section-wrapper internal · post-`<div className="mb-10 md:mb-12">{header}</div>` block
- HOW · `mb-10 md:mb-12` Tailwind OR `style={{ marginBottom: 'var(--section-header-mb)' }}`

**Rule: Card padding default = 16px (`p-4`)**
- WHAT · Default internal padding of any Card variant
- WHY · 16px = body-line-height equivalent · balanced for icon-text content · not too tight, not too spacious
- WHEN · DEFAULT Card variant · IconCard · SegmentationCard · most card grids
- WHERE · `<Card padding="md">` (atom default)
- HOW · `var(--card-padding-md)` = `1rem` = `p-4`

**Rule: 3-col card grid gap default = 24px (`gap-6`)**
- WHAT · Horizontal + vertical gap between cards in 3-col grid
- WHY · 1.5× card padding (16 × 1.5 = 24) — gap > padding feels structured · gap < padding feels cramped
- WHEN · Any 3-col card grid · listing · related reports · highlights · methodology · growth drivers
- WHERE · Grid container: `grid md:grid-cols-3 gap-6`
- HOW · `gap-6` Tailwind (= 1.5rem = 24px)

**Rule: Sticky TOC top offset = 88px (`calc(64px + 24px)`)**
- WHAT · Distance from viewport top to top of sticky TOC sidebar
- WHY · Navbar = 64px tall · 24px breathing room above TOC = 88px total · gives navbar clear separation
- WHEN · Any sticky TOC sidebar
- WHERE · `<aside className="sticky top-[88px] z-100">`
- HOW · Inline `top-[88px]` OR CSS `top: var(--sticky-toc-top)` once token added

**Rule: Bg alternation rhythm = white / warm-300 (editorial) OR white / black-50 (data-heavy)**
- WHAT · Even sections use warm-300 OR black-50 · odd sections white · alternating
- WHY · Visual rhythm helps long-scroll readability · separates "chapters" without explicit dividers
- WHEN · Multi-section pages w/ 4+ sections (V1 PDP · case-study · about)
- WHERE · Per-section `SectionWrapper background="warm"` OR `="black-50"` (CANON)
- HOW · Alternate even-odd · keep brand-red sections RARE · cinematic only at start/end

---

## 5 · Anti-patterns (canon violations · DO NOT)

(Will be propagated to ANTI-PATTERNS.md Stage 2.6)

1. **DO NOT use `py-24 lg:py-32` (V0.2)** for inter-section padding · CAP at `--section-py-xl` (64/96)
2. **DO NOT use `px-[84.375px]`** hardcode · USE `px-4 sm:px-6 md:px-8` standard
3. **DO NOT use `text-base` for 14px** · USE `--text-nav` / `--text-compact` (both 14px exposed)
4. **DO NOT use `--radius-md` for 10px** · USE `--radius-sm` (core-v2 = 10px)
5. **DO NOT use `--radius-sm` for 2.5px** · USE `--radius-2xs`
6. **DO NOT use `--text-sm` for 13px** · USE `--text-xs` (12.8px) OR `--text-nav-helper` (13px)
7. **DO NOT skip reduced-motion guard** on any rAF animation (Hero orbs · scroll indicators)
8. **DO NOT skip `accessibility.enabled: true`** on Highcharts series
9. **DO NOT use brand-red on neutral states** (active TOC dot · FAQ chevron · scope bullet) · brand-red = CTA only
10. **DO NOT use 0.9375rem (15px) body** · USE `--text-sm` (1rem = 16px) as body default
11. **DO NOT use inline `style={{...}}` for tokens** · USE Tailwind classes that route through DS
12. **DO NOT strip card chrome** when legacy uses it · port card pattern from canonical source
13. **DO NOT rationalize regression in JSDoc** (`NO cards` · `lean PDP-specific fork` · `White bg only`) · these are invention markers · port the canonical instead
14. **DO NOT use V0.2 buttons or FloatingCTA bottom-rising banner** · use report-store buttons · drop bottom CTA
15. **DO NOT use V0_lite gradient/shimmer buttons** for new builds · use report-store solid buttons w/ optional shimmer

---

## 6 · Quick reference card (the 12 spacing/comp/layout values you need 90% of the time)

```
SPACING
  Section padding:       py-12 md:py-20      (--section-py-lg)
  Container max:         max-w-[1200px]      (--container-page)
  Inner content max:     max-w-[1000px]      (--container-content)
  Page horizontal pad:   px-4 sm:px-6 md:px-8
  Section header bottom: mb-10 md:mb-12      (--section-header-mb)
  Card padding:          p-4                  (--card-padding-md)
  Card grid gap:         gap-6                (default 3-col grid)
  Stack tight:           space-y-2 (8px)
  Stack default:         space-y-4 (16px)
  Stack section block:   space-y-6 (24px)

COMPOSITION
  Section header block: Label → Heading → Lede  (12 → 16 → mb-10)
  CTA pair: Primary + Secondary  (responsive 3-tier visibility)
  Stat strip: IconBox → Value (tabular-nums) → Label

LAYOUT
  Sticky TOC: top-[88px]
  Bg alternation: white / warm-300 (editorial) OR white / black-50 (data)
  Z-ladder: base 1 / dropdown 10 / sticky 100 / navbar 1000 / floating 1500 / modal-bd 9990 / modal 9999
```

---

## 7 · Done when

- [ ] User approves this doc
- [ ] Tokens for `--card-padding-xl` · `--pair-section-content` · `--pair-content-cta` added to base.css (if missing per audit)
- [ ] PORT-PLAN.md references compositions from §2
- [ ] AI-PICKER-GUIDE.md cites this doc for spacing/composition decisions
- [ ] ANTI-PATTERNS.md (Stage 2.6) imports §5 anti-patterns

---

**END · SPACING-COMPOSITION-LAYOUT-CANON.md**
**Next doc:** GAPS.md (Stage 2.4)
