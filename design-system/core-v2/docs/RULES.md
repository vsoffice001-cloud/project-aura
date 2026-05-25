# RULES.md · OG Design System Rules · Canonical

> **Companion docs (READ ALL THREE before any DS work):**
> - `FOUNDATIONS.md` · TOKENS (vocabulary · what colors/sizes/spacing exist)
> - `RULES.md` (this doc) · HARD RULES (grammar · what's allowed)
> - **`COMPOSITION_GRAMMAR.md`** · USE-CASE GRAMMAR (which atom for what · when horizontal vs vertical · per-section taxonomy · 11 card types · 9 section-label variants · decision trees) — **MANDATORY READ for any page build**

**Source · `Design_system_vs_26 (og and final)/` v4.3 · 2026-03-18 · 841-line theme.css + 6 ai-context modules + COMPONENT_GUIDELINES_4WH.md**

Every rule below carries: **WHY** (rationale) · **WHAT** (mechanic) · **WHEN** (apply) · **WHEN NOT** (skip) · **WHERE** (locus).

Read this BEFORE building any page · component · section. Pair w/ `FOUNDATIONS.md` (token values).

---

## §1 · Core Identity Rules

### R1.1 · 92-5-3 Color Hierarchy (THE single most important rule)
- **WHY** · color restraint enforces editorial minimalism · prevents brand red dilution · achieves WCAG AAA on all surfaces
- **WHAT** · 92% foundation (black/white/warm) · 5% brand red CTAs ONLY · 3% accent (purple/periwinkle/coral/perano)
- **WHEN** · every page · every component · every section
- **WHEN NOT** · never deviate · only exception is data-viz charts (semantic colors)
- **WHERE** · governs every fill/text/border/shadow decision

### R1.2 · Brand Red is for CTAs ONLY
- **WHY** · 5% rule · conversion intent reserved · saturated red dilutes if used decoratively
- **WHAT** · `--brand-red #b01f24` · button `variant="brand"` only
- **WHEN** · primary CTAs · form submits · max 1-2 per screen
- **WHEN NOT** · NEVER for borders · icons · section bgs · decoration · body text · headings · hover states (use red-700 hover · red-800 active)
- **WHERE** · Button atom · CTABanner organism · FinalCTA section

### R1.3 · Major Third Typography (1.25× ratio)
- **WHY** · mathematical progression · harmonious hierarchy · clear size distinction without arbitrary jumps · 1.25× ratio derives from musical Major Third interval — proven visually pleasing
- **WHAT** · base 16px · scale 12.8/16/20/25/31.25/39/48.8/61/76.3 — every step a 1.25× multiplication of prior
- **WHEN** · all text on every surface · H1 hero = 3xl (48.8px) clamp-responsive · H2 section = step-pattern xl→2xl (31.25→39px) · H3 = lg→xl (25→31.25px) · body = sm (16px) · meta/eyebrow = xs (12.8px)
- **WHEN NOT** · only deviate for spatial constraints (use --text-compact 14 · --text-nav 14 · --text-2xs 11 · --text-card-micro 10) · NEVER use clamp w/ random values · NEVER use Tailwind text-{N}xl arbitrary classes
- **RESPONSIVE** · use step-pattern (`text-[1.953rem] sm:text-[2.441rem]`) for H2/H3 — predictable line-breaks · use `clamp()` ONLY for H1 hero where px-precision overflow matters (`clamp(2.25rem, 5.5vw, var(--text-3xl))`)
- **WHERE** · all headings · body · labels · buttons · SectionHeading atom enforces correct sizes per `level` prop

### R1.4 · Two-Font Pairing (Serif + Sans)
- **WHY** · editorial contrast · NYT/Medium/Stripe pattern · Serif = authority + display register · Sans = readability + utility register · pairing is editorial-vs-utility (not size-vs-size)
- **WHAT** · `Noto Serif` for display/headings · `DM Sans` for body/UI/buttons/nav/labels/meta
- **SERIF zones (display register)** · H1 hero (300 light · tracking -0.02em · leading 1.2) · H2 section (300 light · tracking -0.02em) · H3 subsection (300 light · tracking -0.01em · leading 1.3) · editorial display numerals (hero stats · 300 light · tight) · testimonial quote body (the ONE body-serif exception · 300 light · relaxed leading)
- **SANS zones (utility register)** · H4 card titles (500 medium · 20px) · body paragraph (400 regular · leading 1.6-1.7) · subtitle/lede (400 regular · relaxed) · button primary (700 bold) · button secondary (500 medium) · eyebrow (600 semibold · uppercase · tracking 0.2em) · meta/caption (400 · 12.8px) · table cells (400 + `tabular-nums` for numerics) · table headers (600 · tracking 0.05em) · data-table numerals (600 + `tabular-nums`)
- **PAIRING patterns** · (1) Sans eyebrow → Serif H2 → Sans body — universal section-header trio · (2) Serif H2 (light 300) + Sans subtitle (regular 400) — editorial heading + lede · (3) Serif H1 (light) + Sans body lede + Sans bold CTA — hero composition
- **WHEN NOT** · NEVER serif for body/buttons/nav/labels (testimonial quote is the ONE allowed exception · documented) · NEVER sans for hero H1 / section H2 / H3 · NEVER use serif for data-table numerals (use sans + tabular-nums for column alignment)
- **WHERE** · SectionHeading atom + all editorial sections + Button atom (sans bold) + SectionLabel atom (sans semibold uppercase)
- **REASONING** · serif loses clarity below 25px in dense UI — H4 (20px) drops to sans · serif at H3+ (>=25px) reads as display · light weight (300) on serif H1/H2 prevents bulk at 48.8px+ · negative tracking corrects optical loosening at display sizes

### R1.5 · Section Background Discipline (white-dominant · highlights sparingly)
- **WHY** · professional B2B aesthetic NOT child's-play · mechanical white-warm-white-warm or white-black-white-black alternation looks amateur · warm + black carry SEMANTIC weight, not rhythmic weight · canon confirmed audit 2026-05-15 vs V0_lite-legacy + report-store-legacy
- **WHAT** · `white` = DEFAULT for 70-80% of sections · `warm` (#f5f2f1 / warm-300) = SUBTLE HIGHLIGHT (max 1-2× per page · marks editorial moments) · `black` (#0a0a0c) = IMPORTANT HIGHLIGHT / DRAMA (max 1-2× per page · stats moment · cinematic close) · `hero-blob` + `cta-blob` = compositional bookends at top + bottom
- **WARM semantic** · use for: Challenges (tension in narrative arc) · Methodology (process tone apart from neutral content) · AnalystPicks / Testimonials (curation / social proof) · 1× sparingly placed break in long product/listing pages
- **BLACK semantic** · use for: case-study Hero (recipe-mandated) · Impact stats section (drama moment) · Resources (always cinematic per DS rule) · Final CTA (conversion close)
- **WHEN NOT** · NEVER mechanical alternation (white·warm·white·warm·white·warm = drift) · NEVER warm 3+ times per page · NEVER use warm/black as rhythm filler · NEVER use brand-red as section bg (R1.2 violation)
- **HOW to decide** · ask "does this section earn highlight?" — if it's just content flow, use white · if it carries semantic weight (curation, social proof, process, tension, drama, conversion), only THEN warm or black
- **WHERE** · SectionWrapper atom `bg` prop · HeroBackground / CTABackground composition atoms
- **CANON REFERENCE** · `projects/V0_lite_report-legacy/` + `projects/report-store-legacy/` — both pages use white 8-12× · warm 1-2× · black 1-2× · NEVER alternation pattern

---

## §2 · Section Patterns

### R2.1 · Case Study Recipe (canon · highlights NOT alternation)
```
 1. Hero                       → BLACK (recipe-mandated cinematic open · drama moment)
 2. Client Context             → WHITE (long-form intro · readability primary)
 3. Challenges                 → WARM  (tension in narrative arc · subtle highlight)
 4. Engagement Objectives      → WHITE (default · long-form content)
 5. Methodology                → WARM  (process-tone apart from neutral · OR white if Impact takes black)
 6. Impact                     → BLACK (stats drama · the page's "moment")  ← UPDATED per canon
 7. Testimonial                → WHITE (border-t separator · social proof)
 8. Resources                  → BLACK (always cinematic per DS rule · gradient mesh)
 9. FAQ                        → WHITE (scannable Q&A · default)
10. Final CTA                  → BLACK (cinematic close · conversion drama)
```
Sequence breakdown: 5× white · 2× warm · 3× black · NEVER mechanical alternation. Warm + black each carry semantic weight per R1.5.

### R2.2 · Report Store / Listing Recipe (canon · white-dominant)
```
 1. ReportStoreHero            → HERO-BLOB (composition · multi-layer glow)
 2. FeaturedResearch           → WHITE
 3. RecommendedForYou          → WHITE
 4. IndustrySectorsGrid        → WHITE
 5. IndustryReportSection      → WARM   (1× break in long page · subtle highlight)
 6. AnalystPicks               → WARM   (curation moment · OR move to white if IndustryReportSection takes warm)
 7. TrendingStatistics         → WHITE
 8. DailyDataHighlights        → WHITE
 9. QuickAccess                → WHITE
10. TrendingTopics             → WHITE
11. ExploreByRegion            → WHITE
12. Testimonials               → WARM   (social proof break)
13. UpcomingReports            → WHITE
14. CustomResearchCTA          → CTA-BLOB / BLACK (conversion close)
```
Sequence breakdown: 10× white · 2-3× warm · 1× black + 1× blob bookends. Confirms canon: white DOMINATES.

### R2.5 · Report PDP / Chapter Pages — WHITE-DOMINANT
```
 1. Hero                       → HERO-BLOB (composition)
 2-12. Chapter sections (Market Overview · Scope · Segmentation · Regional Compare · Growth Drivers · Competitive · TOC · Target Audience · Methodology · etc.)
                               → WHITE default · pick 1-2 chapters to flip WARM only if semantically warranted
                                 (canonical highlights: Methodology + Competitive Landscape OR Methodology + Growth Drivers)
13. Key Insights / Impact      → BLACK (1× drama moment · optional)
14. FAQ                        → WHITE (default Q&A)
15. Related Reports            → WHITE
16. Final CTA                  → CTA-BLOB / BLACK
```
**Anti-pattern:** sample/page.tsx PRE-FIX had 6× warm in 12 chapters (white-warm-white-warm). Canon = 10-11× white + 1-2× warm strategically placed at chapter boundaries that carry weight.

### R2.3 · SectionWrapper Discipline
- **R2.3.1** · Every section that has a background MUST use `<SectionWrapper>` · NEVER manual `<section className="py-20 bg-warm">`
- **R2.3.2** · NEVER add `px-4 sm:px-6 md:px-8` to SectionWrapper children · double-padding bug
- **R2.3.3** · Spacing tiers: `sm` (32/48) · `md` (40/64) · `lg` (48/80 · DEFAULT) · `xl` (64/96)
- **R2.3.4** · maxWidth: `content` (1000px) · `wide` (1200px · DEFAULT) · `full` (no constraint)

### R2.4 · Section Type Recipes
| Section Type | Components | Background |
|---|---|---|
| Hero | `<SectionHeading level={1}>` · dual CTAs | Black |
| Content + Cards | `<SectionHeading>` · `<Card>` grid OR `BrowseGrid` | White / Warm |
| Methodology | StepPill badges · sequential steps · connecting lines | Warm |
| Metrics | `StatsRow` OR `StatCard` molecules | White / Warm |
| Testimonial | Serif quote · attribution · `Container width="narrow"` | White (border-t) |
| Resources | `ResourceCard` (7 variants) · Masonry grid · `useResponsiveGutter` | Black (gradient mesh) |
| Final CTA | `CTABanner` OR Brand Button · `Container width="narrow"` | White or Black |
| Listing | `ListingToolbar` + `FiltersPanel` + `CardListing` | White |
| Carousel | `FeaturedCarousel` organism OR `HorizontalScroll` molecule | White |

---

## §3 · Layout Rules

### R3.1 · Container Width System
- **WHY** · readability (Baymard 50-75 chars/line) · wider = lose focus · narrower = cramped
- **WHAT** · 5 widths: page(1200) · content(1000) · narrow(900) · prose(700) · compact(600)
- **WHEN** · use `--container-page` for shells/navbars · `--container-content` for sections · `--container-prose` for body text · `--container-narrow` for CTAs/testimonials · `--container-compact` for descriptions
- **WHEN NOT** · NEVER body text > 700px · NEVER `--container-page` for content sections · NEVER hardcode `max-w-[1200px]` (use token)
- **WHERE** · Container atom · SectionWrapper maxWidth prop

### R3.2 · Responsive Padding (Mobile-First)
- **WHY** · scales w/ viewport · maintains breathing room on mobile · editorial white space on desktop
- **WHAT** · 16px mobile (px-4) → 24px tablet (sm:px-6) → 32px desktop (md:px-8)
- **WHEN** · every section · every container w/ width constraint
- **WHEN NOT** · full-bleed heroes w/ custom bg
- **WHERE** · SectionWrapper handles automatically · manual sections use `className="px-4 sm:px-6 md:px-8"`

### R3.3 · Mobile-First Stacking
- **WHY** · 60%+ traffic mobile · core experience must work on constrained devices first
- **WHAT** · 0-639 = 1 column · 640-767 = 1-2 cols · 768-1023 = 2-3 cols · 1024+ = 3-4 cols · 1280+ = 4-6 cols
- **WHEN** · all grid layouts
- **WHEN NOT** · single-element heroes · sticky sidebars
- **WHERE** · grid components · card listings

### R3.4 · UX Laws Applied (mobile-first)
- **Fitts's Law** · touch targets min 44×44px · 8px+ spacing between interactives
- **Miller's Law** · 5-9 visible chunks max · progressive disclosure on mobile
- **Hick's Law** · fewer choices = faster decisions · hamburger on mobile · 1 CTA per screen
- **Proximity** · related items grouped tightly · gaps signal relationships
- **Jakob's Law** · match Apple/Google/Stripe mental model (subtle → darken on hover → near-black on focus)
- **Weber's Law (JND)** · state transitions cross ~30% threshold (default 10% → hover 25% = 150% increase)
- **Gestalt Similarity** · identical default styling so brain groups elements as one type

### R3.5 · Spacing Scale Discipline
- **WHY** · 4px base unit · predictable · removes arbitrary decision-making · 4px grid harmonizes with 16px body type rhythm (4 = 1/4em · 8 = 1/2em · 16 = 1em · 24 = 1.5em)
- **WHAT** · `--space-2xs/xs/sm/md/lg/xl/2xl/3xl/4xl/5xl` (4/8/12/16/24/32/48/64/96/128) · intentional gaps at 5/7/9/10/11 (no token) to discourage off-rhythm values
- **WHEN** · `--space-12` (48px) between sections · `--space-6` (24px) within sections · `--space-4` (16px) between elements
- **WHEN NOT** · NEVER arbitrary values (5px · 13px · 27px etc) · NEVER Tailwind class that breaks scale · NEVER use raw `style={{margin: '20px'}}` — always token
- **WHERE** · gaps · padding · margin · everywhere

### R3.7 · Section-Internal Rhythm (canonical pairings · 12px / 12px / 40px)
- **WHY** · tight pairings signal semantic relationship · larger gaps declare section structure · consistency across sections = predictable reading rhythm · `--pair-*` tokens make rhythm tokenizable not hard-coded
- **WHAT** · 3-gap system inside section headers:
  | Gap | Token | Class | Use |
  |---|---|---|---|
  | Eyebrow → H2 | `--pair-label-heading` (12px) | `mb-3` | Tight = semantic pair |
  | H2 → subtitle | `--pair-heading-description` (12px / 16px) | `mt-3` / `mt-4` | Matches eyebrow→H2 rhythm |
  | (Eyebrow+H2+subtitle) → content | `--section-header-mb` (40px) | `mb-10` | Larger gap declares "header ends here" |
- **VERTICAL stack defaults** · `space-y-6` (24px) for hero left-rail stacks · `space-y-4` (16px) for tight content stacks · `gap-4 sm:gap-6` (16→24px) for card grids · `gap-8 sm:gap-12 md:gap-16` (32→64px) for stat columns + key-numbers (editorial breathing)
- **SECTION py** · `py-12 sm:py-16 md:py-20` standard (3-step ramp · mobile/tablet/desktop) · `py-8 sm:py-10 md:py-12` compact (stat strips · pull-quotes)
- **CONTAINER px** · `px-4 sm:px-6 md:px-8` (16/24/32) tokenized via `--padding-mobile/tablet/desktop` · single source of truth
- **WHEN NOT** · NEVER hard-code `mb-2` or `mb-5` for header-internal gaps (use the 3 canonical values) · NEVER skip the 40px header→content gap (creates visual chaos)
- **WHERE** · SectionHeading atom enforces `mb-3` + `mt-3/4` automatically · manual sections must follow the same rhythm

### R3.8 · Button Padding Canon (verbatim from V0_lite + RS-legacy)
- **WHY** · button geometry tokens are IDENTICAL in both legacy projects = strongest possible canon · matches WCAG 44px tap-target minimum · 4pt grid alignment
- **WHAT** ·
  | Size | Height | Px | Font | Min-width |
  |---|---|---|---|---|
  | xs | 28px | 16 | 12.8px | 80px |
  | sm | 40px | 20 | 14px | 80px |
  | md (default) | 48px | 28 | 16px | 112px |
  | lg | 56px | 36 | 18px | 144px |
  | xl | 64px | 40 | 18px | 160px |
- **REASONING** · md 48px = mobile-tap-safe (44px WCAG cleared) · px 28 generous = CTA importance · min-width prevents wobble on short labels ("OK", "Buy") · md is DEFAULT (R4.1.2)
- **WHERE** · Button atom · CTABanner · CTALink (inherits via atom)

### R3.6 · Border Radius Decision Table
| Element | Radius | Token |
|---|---|---|
| Images | 2.5px | `--radius-2xs` / `--rc-radius-image` |
| Buttons · small cards · badges | 5px | `--radius-xs` / `--radius-element` |
| Large cards · modals · panels | 10px | `--radius-sm` / `--rc-radius-card` |
| Feature cards · large buttons | 15px | `--radius-md` |
| Hero cards · containers | 20px | `--radius-lg` |
| Large modals | 25px | `--radius-xl` |
| Extra-large cards | 30px | `--radius-2xl` |
| Hero sections · landing blocks | 35px | `--radius-3xl` |
| Pills · avatars · dots | 9999px | `--radius-full` |
- **WHEN NOT** · NEVER arbitrary px values (6/8/12 etc) · stick to 5px-increment scale

---

## §4 · Component Rules

### R4.1 · Button System
- **R4.1.1 · Variants** · `primary` (black) · `brand` (red CTA) · `secondary` (two-state neutral→red) · `ghost` (transparent)
- **R4.1.2 · Default size = `md` (42px)** · NOT `lg`
- **R4.1.3 · `lg` reserved for homepage heroes only**
- **R4.1.4 · `xs` (28px) for card footer CTAs ONLY**
- **R4.1.5 · `sm` (36px) for navbar CTAs · TOC Unlock**
- **R4.1.6 · Shimmer animation ALWAYS active** · NEVER disable · brand signature
- **R4.1.7 · `showArrow` ONLY for urgency CTAs** ("Schedule Demo" · "Get Started") · NEVER for "Learn More" / "View Details"
- **R4.1.8 · Arrow MUST be `ArrowUpRight` 45°** · NEVER `ArrowRight` or `ChevronRight`
- **R4.1.9 · NEVER embed static `<ArrowUpRight>` in Button/CTALink** · use `showArrow` prop
- **R4.1.10 · Brand button max 1-2 per screen**
- **R4.1.11 · Secondary variant evolution** · V0_lite had warm/coral hover · UPDATED in RS-legacy to brand-red 2-state (color+border+shadow transition) · brand-red on hover surfaces emphasis · canonical · saved in OG ai-context/COMPONENTS.md L18

#### Button usage matrix · variant × size × placement (canonical · per RS-legacy)

| Placement | variant | size | background | showArrow | Example |
|---|---|---|---|---|---|
| Hero CTA primary (case-study · PDP) | `brand` | `lg` or `xl` | light | yes | "Get Full Access" |
| Hero CTA secondary | `ghost` | `lg` | dark (cinematic hero) | no | "Download Sample" |
| Navbar CTA | `brand` | `sm` | light | no | "Request a Demo" |
| FilterPanel · MobileSheet apply | `brand` | `sm` `fullWidth` | light | no | "Show Results" |
| Card footer CTA (ReportCard · ResourceCard) | `secondary` | `xs` | light | yes | "View Report" |
| Related report card CTA | `secondary` | `xs` | light | yes | "View Report" |
| Section-level CTA (ExploreByRegion · CTABanner mid-page) | `ghost` or `brand` | `lg` | light | conditional | "Explore region" |
| Final CTA section primary (on black bg via CTABackground) | `brand` | `lg` or `xl` | light | yes | "Get Full Access" |
| Final CTA section secondary | `ghost` | `lg` | dark | no | "Talk to Analyst" |
| Hero stat panel CTA · stat-block CTA on dark | `primary` | `md` | dark | no | "View Methodology" (black gradient on dark) |
| White-card primary CTA · pricing tier | `primary` | `md` | light | yes | "Choose Plan" (black gradient on white card) |

**WHY primary vs brand:**
- `primary` (black gradient `linear-gradient(90deg, #141016, #656565, #141016)`) · neutral premium emphasis · USE when red would clash w/ surrounding red badge/icon · OR on pricing cards where red feels aggressive
- `brand` (red gradient `linear-gradient(90deg, #b01f24, #eb484e, #b01f24)`) · primary conversion · MAX 1-2 per screen
- `secondary` (white bg + brand-red 2-state) · supporting CTA · invites click without dominating
- `ghost` (transparent + outline) · low-pri actions · "View" "Learn More" · pairs w/ brand button as second option

#### R4.1.12 · Gradients · Shimmer · Arrow colors per variant (RS-legacy canonical)

| Variant | bg | Background gradient | Shimmer (rest → hover) | Text color | Arrow color | boxShadow rest | boxShadow hover |
|---|---|---|---|---|---|---|---|
| `primary` | light/dark | `linear-gradient(90deg, #141016, #656565, #141016)` | `from-[#141016] via-[#656565] to-[#141016]` always | white | white | `0 2px 8px rgba(0,0,0,0.15)` | `0 4px 12px rgba(0,0,0,0.25)` |
| `brand` | light/dark | `linear-gradient(90deg, #b01f24, #eb484e, #b01f24)` | `from-[#b01f24] via-[#eb484e] to-[#b01f24]` always | white | white | `0 4px 16px rgba(176,31,36,0.15)` | `0 12px 32px rgba(176,31,36,0.25)` |
| `secondary` | light | white bg · black/12 border rest | `rgba(255,255,255,0.80)` rest → `rgba(176,31,36,0.08)` hover (red glow) | `rgba(0,0,0,0.7)` → `var(--brand-red)` hover | `black` → `brand` hover | `0 2px 8px rgba(0,0,0,0.04)` | `0 4px 16px rgba(176,31,36,0.12)` |
| `secondary` | dark | white/5 bg · white/40 border | `rgba(255,255,255,0.15)` static | white | white | (subtle) | (subtle) |
| `ghost` | light | transparent · black/30 border | `via-black/10` always | black | black | none | none |
| `ghost` | dark | transparent · white/30 border | `via-white/20` always | white | white | none | none |

#### R4.1.13 · Text-only buttons (CTALink + InlineLink)

**Underline rule (corrected 2026-05-15):** Underline is **ONLY for `<InlineLink>` (paragraph-embedded links)** · NEVER on `<CTALink>` (standalone text+arrow CTAs). Inline links sit inside body copy and need underline to be discoverable as links · CTALinks are standalone elements with animated arrow as the affordance · no underline needed.

| Atom | When | Default state | Hover state | Underline |
|---|---|---|---|---|
| `<CTALink>` light | "View All" · "Explore" · "See More" · text + animated arrow · medium emphasis (standalone) | text `rgba(0,0,0,0.6)` · arrow `black` | text `var(--brand-red)` · arrow `brand` | **NONE** |
| `<CTALink onDark>` | Same on dark surface | text `rgba(255,255,255,0.7)` · arrow `white` | text `white` · arrow `white` | **NONE** |
| `<CTALink variant="brand">` | Always-red text + arrow (rare · use sparingly) | text + arrow `var(--brand-red)` | same | **NONE** |
| `<InlineLink>` light | Inside paragraph copy · `<p>...<InlineLink>...</InlineLink>...</p>` | text `text-black/60` · underline `border-black/15` | text `var(--brand-red)` · underline `rgba(176,31,36,0.4)` | **ALWAYS present** |
| `<InlineLink onDark>` | Same on dark surface | text `text-white/70` · underline `border-white/20` | text `text-white` · underline `border-white/50` | **ALWAYS present** |

**Arrow direction:** ALWAYS `ArrowUpRight` (↗ · 45°) · NEVER `ArrowRight` or `ChevronRight` (R4.1.8 hard rule). Set via `showArrow` prop on Button · auto-rendered by CTALink.

#### R4.1.14 · Placement → variant decision

| Where the button sits | Use |
|---|---|
| **On dark cinematic hero section** (primary CTA) | `<Button variant="brand" size="lg" showArrow>` |
| **On dark cinematic hero** (secondary CTA · pairs w/ brand) | `<Button variant="ghost" background="dark" size="lg">` |
| **On white card · pricing/premium tier** (where brand-red competes w/ surrounding red badges) | `<Button variant="primary" size="md">` (black gradient · neutral premium) |
| **Inside ReportCard / ResourceCard footer** (item-level CTA · small card) | `<Button variant="secondary" size="xs" animatedArrow>` |
| **Inside StatCard footer / sidebar** (text-only direction) | `<CTALink size="sm">` |
| **Inside section header** (View all · See more pattern · text-only) | `<CTALink size="md">` |
| **Inside body paragraph** (cross-reference link) | `<InlineLink href="...">` |
| **On warm-bg section** (mid-page CTA · editorial) | `<Button variant="brand" size="md">` w/ surrounding ghost/secondary supporting |
| **Inside Filter panel** (apply · fullWidth) | `<Button variant="brand" size="sm" fullWidth>` |
| **Final CTA section** (conversion · pairs primary + alt) | `<Button variant="brand" size="lg" showArrow>` + `<Button variant="ghost" background="dark" size="lg">` |
| **Mobile bottom-sheet apply button** | `<Button variant="brand" size="sm" fullWidth>` |
| **Navbar primary CTA** | `<Button variant="brand" size="sm">` (no fullWidth · auto sm) |

### R4.2 · Link Decision Tree
```
Primary action (form submit · main CTA)?
 → YES: <Button>
 → NO: Text + arrow CTA ("Learn More →")?
       → YES: <CTALink>
       → NO: Within paragraph text?
             → YES: <InlineLink>
             → NO: <CTALink> or <Button>
```
- **R4.2.1** · NEVER use `Button` for exploratory links (use `CTALink`)
- **R4.2.2** · NEVER use `CTALink` for primary conversions (use `Button`)
- **R4.2.3** · NEVER use `InlineLink` standalone (use `CTALink`)

### R4.3 · Card System
- **R4.3.1 · Card hover lift** · `translateY(-2px)` + shadow intensify · NO color change · NO border change
- **R4.3.2 · Card border** · `rgba(0,0,0,0.06)` rest → `rgba(0,0,0,0.10)` hover
- **R4.3.3 · Card radius** · `--rc-radius-card` (10px) · NEVER override
- **R4.3.4 · Card transition** · 0.4s cubic-bezier(0.16, 1, 0.3, 1)
- **R4.3.5 · Card title size** · `--text-base` (20px) when 4+ cards · `--text-lg` (25px) when 2-3 cards
- **R4.3.6 · Card body size** · `--text-compact` (14px) when 4+ cards · `--text-sm` (16px) otherwise
- **R4.3.7 · Max 6 cards per row** · without grid adjustment
- **R4.3.8 · NEVER mix card title sizes within same section**
- **R4.3.9 · NEVER put "View Report" buttons inside grid cards** (removed v4.0 audit)
- **R4.3.10 · NEVER put divider lines inside grid cards** (removed v4.0 audit)

### R4.4 · ReportCard vs StatCard vs ResourceCard decision
```
Survey card? → SurveyCard
Report data? → ReportCard (layout="grid" or layout="list")
KPI/metric? → StatCard
Daily data point (time + trend + source)? → DataHighlightCard
Analyst recommendation? → AnalystPickCardB
Blog/resource? → ResourceCard (7 variants)
General content container? → Card (base atom)
Category browse? → CategoryListCard
```

### R4.5 · ResourceCard Variant Rules
- **R4.5.1** · 7 variants · `standard` · `full-featured` · `minimal` · `category-featured` · `clean` · `featured-focus` · `latest`
- **R4.5.2** · `full-featured` = primary/hero card · MAX 1 per grid
- **R4.5.3** · `clean` for text-heavy content w/o image
- **R4.5.4** · MAX 4 variant types per grid (more = visual chaos)
- **R4.5.5** · Mix 3-4 variants for visual rhythm
- **R4.5.6** · Always inside Masonry grid context · never standalone

### R4.6 · Badge System
- **R4.6.1 · 11 themes** · `neutral` · `warm` · `brand` · `coral` · `purple` · `periwinkle` · `success` · `warning` · `error` · `info` · `muted`
- **R4.6.2 · 3 variants** · `minimal` (no bg/border) · `rounded` (5px) · `pill` (9999px)
- **R4.6.3 · 4 sizes** · `xs` (9px) · `sm` (11px) · `md` (13px) · `lg` (15px)
- **R4.6.4 · Themes via prop ONLY** · NEVER inline color styles
- **R4.6.5 · Convenience wrappers** · `SectionLabel` · `StepPill` · `StatusBadge` · `InfoBadge` · `MutedBadge`
- **R4.6.6 · Section label** · always uppercase · tracking-wider · text-xs

### R4.7 · Navbar Rules
- **R4.7.1 · Two states** · expanded (page top) · compact (scrolled)
- **R4.7.2 · Black bg + white text** · NEVER transparent
- **R4.7.3 · Max 5-6 nav links**
- **R4.7.4 · CTA `size="sm"` only** · NEVER lg in navbar
- **R4.7.5 · `--text-nav` (14px) for links** · NOT `--text-xs`
- **R4.7.6 · 72px primary height** + 40px secondary utility bar

### R4.8 · SectionHeading Discipline (v4.0 prop-based)
```tsx
// CORRECT (v4.0):
<SectionHeading level={2} label="X" title="Title" subtitle="..." />

// WRONG (v3.4 deprecated):
<SectionHeading level={2} eyebrow="X">Title</SectionHeading>
```
- **R4.8.1** · `level={1}` ONLY in hero · NEVER repeat
- **R4.8.2** · `level={2}` default for sections
- **R4.8.3** · `label` prop = eyebrow (uppercase tracking-wider)
- **R4.8.4** · `action={{text,href}}` = right-aligned CTALink
- **R4.8.5** · `endSlot` for ViewToggle/Badge next to heading
- **R4.8.6** · `labelPulse` for live/new indicators
- **R4.8.7 · NEVER nest SectionHeading inside SectionHeading**

### R4.9 · Filter System (v4.2 · 6 atoms + 4 molecules)
- **R4.9.1 · Monochromatic only** · pure black/opacity · NO purple · NO brand-red on filter controls
- **R4.9.2 · Selected state** · `border-l-[3px] border-black` + `bg-black/[0.04]` + `text-black/90`
- **R4.9.3 · FilterCheckbox label** · `--text-xs` (12.8px) · count `--text-card-micro` (10px)
- **R4.9.4 · FilterChip text** · `--text-card-micro` (10px)
- **R4.9.5 · FilterAccordion heading** · `--text-card-micro` + uppercase + tracking-[0.1em]
- **R4.9.6 · SidebarPanel width** · 14rem (224px) · borders rgba(0,0,0,0.06)
- **R4.9.7 · Disabled = opacity-40 + cursor-not-allowed**

### R4.10 · Unified Input System (v4.2 · 6-state monochromatic)
| State | Border | Text | Placeholder | Background |
|---|---|---|---|---|
| Default | `black/10` | `black/90` | `black/30` | `white` |
| Hover | `black/25` | `black/90` | `black/30` | `white` |
| Focus | `black/90` | `black` | `black/30` | `white` |
| Filled | `black/15` | `black/90` | — | `white` |
| Error | `--brand-red` 2px | `black/90` | `black/30` | `white` |
| Disabled | `black/6` | `black/35` | `black/20` | `black/[0.03]` |

- **R4.10.1 · Border-color change is the focus indicator** · NOT outline ring (already have border)
- **R4.10.2 · Radius** · `rounded-[5px]` = `--radius-element`
- **R4.10.3 · Checkbox radius** · `rounded-[2.5px]` = `--radius-inner`
- **R4.10.4 · Standard padding** · `px-4 py-3` (Fitts 44px touch target)
- **R4.10.5 · Compact padding** · `px-3 py-2` (sidebar/toolbar)
- **R4.10.6 · Standard font** · `--text-sm` (16px) · Compact `--text-xs` (12.8px)
- **R4.10.7 · Transition** · `transition-colors duration-150`
- **R4.10.8 · CSS safety net** · `input:focus-visible { outline: none }` global

---

## §5 · Token Discipline

### R5.1 · Never Hardcode
- **WHY** · breaks theming · loses tracking · hex colors lose semantic meaning
- **WHAT** · ALL colors/sizes/spacing reference tokens
- **WHEN** · always
- **WHEN NOT** · never (only DTCG primitive source files)
- **WHERE** · every CSS/JSX/inline-style value

### R5.2 · Inline Style Rules
- **R5.2.1 · NEVER hex in inline styles** · `style={{color: '#b01f24'}}` is WRONG · use `var(--brand-red)` or `rgba()`
- **R5.2.2 · NEVER CSS shorthand for border/background** in inline styles · use longhand properties
- **R5.2.3** · `style={{color: 'rgba(0,0,0,0.7)'}}` or `style={{color: 'var(--brand-red)'}}` only

### R5.3 · Icon Color Tokens (4-class taxonomy)
- **Content** · `--icon-content` = `--purple-600` · semantic data · charts
- **Utility** · `--icon-utility` = `--black-500` · nav chrome · arrows · meta
- **Brand** · `--icon-brand` = `--brand-red` · CTAs only (5% rule)
- **Decorative** · accent color tokens · sparing

### R5.4 · Spacing Tokens · OG canonical
- `--space-*` named scale CSS vars · `style={{padding: 'var(--space-xl)'}}`
- Tailwind utility classes · `className="p-8"`
- BOTH work · pick by context

---

## §6 · Motion Rules

### R6.1 · Reduced Motion Always Respected
- **WHY** · WCAG 2.3.3 · vestibular accessibility · user preference
- **WHAT** · `useReducedMotion()` Framer hook · `@media (prefers-reduced-motion: reduce)` CSS
- **WHEN** · every animation · every transition
- **WHEN NOT** · never skip
- **WHERE** · base.css enforces global override + every motion component

### R6.2 · Animation Stack
- **Framer Motion ONLY** · state · component · gestures · layout
- **Scroll-driven** · `useScroll` + `useTransform` + `useInView`
- **Smooth page scroll** · native CSS `scroll-behavior: smooth` (NOT Lenis)
- **NEVER** · GSAP · Lenis (removed 2026-05-08)

### R6.3 · Shimmer Discipline
- **R6.3.1** · ALL buttons have shimmer · always-active · 700ms duration
- **R6.3.2** · NEVER disable shimmer · brand signature
- **R6.3.3** · Shimmer gradient left-to-right · `--badge-shimmer` var consumed by CSS

### R6.4 · Arrow Animation Discipline
- **R6.4.1** · `showArrow` prop ONLY · NEVER embed static arrow
- **R6.4.2** · ArrowUpRight 45° ONLY · NEVER ArrowRight/ChevronRight
- **R6.4.3** · Arrow on urgency CTAs · NEVER on "Learn More"

### R6.5 · Performance
- **R6.5.1** · 60fps minimum on all animations
- **R6.5.2** · NEVER animate box-shadow (paint cost) · use opacity transition on pseudo-element
- **R6.5.3** · NEVER mix CardReveal w/ FadeInSection (double animation)

---

## §7 · Accessibility Rules

### R7.1 · WCAG AAA Color Contrast
- **WHY** · accessibility · enterprise client requirements · WCAG AAA 7:1 ratio
- **WHAT** · all text 7:1+ contrast · all interactive elements 4.5:1+
- **WHEN** · always
- **WHERE** · all text · all buttons · all links

### R7.2 · Focus Visible Required
- **R7.2.1** · NEVER disable `:focus-visible` rings on buttons/links/inputs
- **R7.2.2** · Buttons/links · brand-red ring at 2px offset (base.css global)
- **R7.2.3** · Inputs · border-color change only (avoid double-frame)

### R7.3 · Touch Targets 44px Minimum
- **R7.3.1** · Fitts's Law · all interactive elements 44×44px+
- **R7.3.2** · Mobile especially · generous tap spacing 8px+

### R7.4 · Skip Link Required
- **R7.4.1** · Every page has SkipLink atom at top · → #main-content
- **R7.4.2** · WCAG 2.4.1

### R7.5 · ARIA Discipline
- **R7.5.1** · Proper aria-label on icon-only buttons
- **R7.5.2** · aria-expanded synced w/ details open state
- **R7.5.3** · aria-controls for collapsible regions
- **R7.5.4** · aria-current="page" on active nav item
- **R7.5.5** · NEVER aria-prohibited-attr · NEVER aria-valid-attr-value violation

### R7.6 · Semantic HTML
- **R7.6.1** · `<main id="main-content">` · NOT div
- **R7.6.2** · `<nav aria-label="...">` for nav regions
- **R7.6.3** · `<section>` for content sections (use SectionWrapper)
- **R7.6.4** · `<article>` for self-contained content
- **R7.6.5** · h1 → h2 → h3 hierarchy · no skipping levels

---

## §8 · Anti-Patterns (DO NOT)

### §8.1 · Color
1. Hex in inline styles (use `var()` or `rgba()`)
2. Hardcoded `#b01f24` (use `var(--brand-red)`)
3. Brand red on decoration · icons · borders · bg sections
4. Purple/periwinkle/coral as section backgrounds
5. Accent colors for text · text uses black tints only
6. Gray (use black tints)
7. Tailwind random colors (`text-gray-600` · `bg-blue-100`)

### §8.2 · Typography
1. Hardcoded font-sizes (use scale tokens)
2. Tailwind text utility classes (`text-2xl`) · use CSS vars
3. `--text-3xl` outside of hero h1
4. Serif on body/buttons/labels/nav
5. Sans on hero/section titles
6. Mix serif weights (300 + 500) on same heading
7. 3rd custom typeface
8. `--text-card-micro` for main text (only counts/numbers)

### §8.3 · Spacing
1. Arbitrary spacing (off-scale values)
2. Tailwind spacing that breaks scale
3. `px-4 sm:px-6 md:px-8` inside SectionWrapper (double-padding)

### §8.4 · Components
1. `lg` button size as default (use `md`)
2. `showArrow` on every button (only urgency)
3. ArrowRight/ChevronRight (use ArrowUpRight via showArrow)
4. Static `<ArrowUpRight>` inside Button (use showArrow prop)
5. Disable shimmer animation
6. "View Report" inside grid cards (v4.0 audit removed)
7. Divider lines inside grid cards (v4.0 audit removed)
8. Mix HorizontalScroll + ScrollFade (different use cases)
9. Nest CardReveal inside FadeInSection (double animation)
10. BackToTop + ScrollToTop together (pick one)
11. Multiple brand buttons in same section
12. Raw `<button>` w/ inline styles (use `<Button>`)

### §8.5 · Layout
1. `max-w-[1200px]` hardcoded (use `--container-page`)
2. `max-w-6xl` (use container tokens)
3. Body text wider than 700px
4. Container nested in Container
5. SectionWrapper nested in SectionWrapper
6. Hand-coded section heading combos (use SectionHeading atom)

### §8.6 · Architecture
1. `@layer tokens { :root {} }` for token overrides (use unlayered)
2. Redeclare `--font-serif`/`--font-sans` outside base.css (kills Next/font binding)
3. Tailwind v4 + node_modules scan gap · use `@source` directive
4. Page authors writing fictional token names (read FOUNDATIONS.md first)
5. CSS shorthand for `border`/`background` in inline styles

---

## §9 · Component Inventory (OG v4.3 · 165 files · 11 groups)

### Atoms · Core (18)
Button · CTALink · InlineLink · AnimatedArrow · Badge (+ SectionLabel · StepPill · StatusBadge · InfoBadge · MutedBadge · ClickableBadge · IconBadge · CategoryBadge · ObjectivePill · ObjectivePillInteractive · InfoCardLabel) · Label · Card · Tooltip · ViewToggle · FadeInSection · FilterCheckbox · FilterChip · FilterSearchInput · FilterSectionHeader · FilterCheckboxItem · FilterIndustryItem · CategoryListItem

### Atoms · Layout & Utility (14)
Container · SectionHeading · SectionWrapper · Navbar · CodeBlockWithCopy · CollapsibleSection · ReadingProgressBar · ScrollProgress · ScrollToTop · SpacingHelpers · VariantSwitcher · SubtleVariantSwitcher · TableOfContents · NextSectionCTA

### Atoms · Overlays (2)
ContactModal · StickyCTA

### Molecules (26 in `/molecules/`)
IndustryBadge · CardMetaRow · CardFooterRow · ReportCard · HorizontalScroll · ScrollFade · AnalystPickCardB · StatCard · DataHighlightCard · EmptyState · BackToTop · SkeletonCard · CardReveal · RevealImage · CompletionBadge · SurveyCard · ResponseChart · QuestionPreview · SurveySkeleton · FilterAccordion · SidebarPanel · ActiveFilterChipBar · MobileFilterSheet · CategoryListCard · LoadMoreSentinel

### Molecules · Resource (1 in root)
ResourceCard (7 variants · `standard` · `full-featured` · `minimal` · `category-featured` · `clean` · `featured-focus` · `latest`)

### Organisms · Cross-Pillar (6 in `/organisms/`)
ProductHero · FeaturedCarousel · StatsRow · BrowseGrid · CTABanner · ProductPageTemplate

### Organisms · Report Store (24 in `/organisms/`)
ReportStoreHero · FeaturedResearch · ListingToolbar · CardListing · FiltersPanel · IndustrySidebar · IndustryFocusBanner · DailyDataHighlights · AnalystPicks · IndustrySectorsGrid · KeyMarketIndicators · RecommendedForYou · CustomResearchCTA · TrendingTopics · TopDownloads · RecentlyViewed · UpcomingReports · ResearchMethodology · NewsletterSignup · IndustrySpotlight · ComparisonTable · ReportPreview · TestimonialsRS · QuickAccessBar

### Organisms · Case Study (10 in root)
HeroSection · ClientContextSection · ChallengesSection · EngagementObjectivesSection · MethodologySection · ImpactSection · ValuePillarsSection · TestimonialSection · ResourcesSection · FinalCTASection

### Custom Hooks (14)
useShimmer · useActiveSection · useScrollDirection · useScrollAnimation · useReadingProgress · useSectionProgress · useHeroVisibility · useCounter · useMagneticEffect · useResponsiveGutter · useReportFilters · useProgressiveLoad · useCrossfade · useMountTransition

---

## §10 · Quality Metrics (target for every page/component)

- **Token Usage** · 100% (zero hardcoded values)
- **Component Reuse** · 90%+ (import from library · don't hand-code atoms)
- **Color Compliance** · 100% (brand red CTAs only · 92-5-3 ratio)
- **Typography Compliance** · 100% (Major Third scale only)
- **Accessibility** · WCAG AAA (7:1+ contrast · 44px touch · skip link · focus-visible · semantic HTML · reduced-motion)
- **Performance** · 60fps animations
- **Documentation** · 4WH framework applied (WHY · WHAT · WHEN · WHEN NOT · HOW)
- **Mobile** · 44px touch targets · responsive padding · mobile-first stacking
- **Motion** · `useReducedMotion()` honored · no GSAP · no Lenis

---

**End of RULES.md · v4.3 source · 10 sections · ~90 explicit rules · pair w/ FOUNDATIONS.md for token values**
