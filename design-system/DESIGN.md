# DESIGN.md — Ken Research

**Format:** [awesome-claude-design](https://github.com/VoltAgent/awesome-claude-design) DESIGN.md spec
**Purpose:** Token + rule + rationale in single file. Aura agents read this to make on-system decisions when hitting cases not covered elsewhere.
**Companion to:** `design-system/COMPONENT_REFERENCE.md` (what), `design-system/ANTI_PATTERNS.md` (never), `design-system/voice/*.md` (how)
**Source of truth for:** brand vocabulary · craft decisions · cinematic vs editorial variant rationale

---

## Brand

**Name:** Ken Research
**Category:** Market intelligence · syndicated research · custom research · consulting
**Audience:** B2B decision-makers · market entry teams · investment screening · strategy consultants
**Voice:** Analyst-led · evidence-first · structured exposition · trust-building · NOT marketing-glitz

**Why this design:** Research depth = product. Page must feel like *live preview of intelligence engine* (PRD §53), not CMS-generated brochure. Conversion driver = content depth + information density + trust signals · NOT pricing reveal.

---

## Visual personality

**Primary:** Sophistication & Trust (per [interface-design](https://github.com/Dammyjay93/interface-design) taxonomy)
**Secondary:** Data & Analysis (research pillar) · Precision & Density (analytics surfaces)
**NEVER:** Boldness & Clarity (loud) · Warmth & Approachability (too casual)

**Closest [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) product categories:**
- B2B Service (must-have: case studies · ROI messaging · case-credential surfaces)
- Analytics Dashboard (must-have: data-export · drill-down · filtering)
- AI/Chatbot Platform (for AI/RAG L3 surfaces only — neutral + measured AI purple #6366F1 if needed)

**NEVER align to:**
- E-commerce · E-commerce Luxury · Gaming · NFT/Web3 (too vibrant)
- Brutalism · Cyberpunk · Retro-Futurism (anti-research-pillar voice)
- AI-Native UI default purple/pink gradients (Ken has its own accent system)

---

## Foundation

**Surface:** warm (editorial-light variant) · cinematic dark on selected surfaces only
**Depth:** subtle-shadows (NOT borders-only · NOT layered)
**Spacing base:** 4px → 8px scale (`--space-1` through `--space-24`)
**Border-radius:** 4-8px sharp (cards) · 6-8px (inputs) · 16px+ (chart cards · feature cards)

---

## Tokens

### Color — editorial-light (DEFAULT)

```css
--color-bg-primary:        #f5f2f1;    /* warm off-white · ~92% surface */
--color-bg-secondary:      #ffffff;    /* white · alternation partner */
--color-bg-warm:           rgb(245 242 241);  /* SectionWrapper background="warm" */
--color-bg-black:          #0a0a0c;    /* FinalCTA · cinematic sections only */

--color-text-primary:      #000000;
--color-text-secondary:    rgba(0,0,0,0.65);
--color-text-tertiary:     rgba(0,0,0,0.45);
--color-text-inverse:      #FAFAFA;    /* on black bg */

--color-brand:             #b01f24;    /* Ken Red · CTA ONLY (5% budget) */
--color-brand-hover:       #931a1f;
--color-brand-fg:          #FFFFFF;

--color-accent-purple:     #6759a8;    /* research pillar · 3% budget */
--color-accent-coral:      #d27052;    /* consulting pillar · 3% budget */
--color-accent-periwinkle: #8e8acd;    /* surveys pillar · 3% budget */

--color-border-subtle:     rgba(0,0,0,0.08);
--color-border-strong:     rgba(0,0,0,0.16);
```

### Color — cinematic-dark (premium surfaces · hero blocks · resources)

```css
--color-bg-primary:        #0a0a0c;
--color-bg-secondary:      #14141a;
--color-text-primary:      #FAFAFA;
--color-text-secondary:    rgba(250,250,250,0.7);
--color-accent-teal:       #00e5ff;    /* cinematic only · NEVER editorial-light */
```

### Type

**Display (Serif):** Noto Serif
**Body (Sans):** DM Sans
**Mono:** JetBrains Mono (code/data blocks only)

**Scale (Major Third · 1.25×):**
```
--text-display:    58px / 1.05    (hero h1 only)
--text-3xl:        48.8px / 1.10  (page-level h1)
--text-2xl:        39px / 1.15    (section h2)
--text-xl:         31.2px / 1.20  (sub-section h3)
--text-lg:         25px / 1.30    (large body · lead)
--text-base:       20px / 1.50    (body)
--text-sm:         16px / 1.50    (small body · caption)
--text-xs:         13px / 1.50    (eyebrow · meta)
--text-card-micro: 10px / 1.40    (micro labels · counts)
```

**Tabular nums on:** numbers in stat cards · chart axes · forecast values · CAGR · prices.

### Spacing scale (4px base · ifd-compatible)

```
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px   (base unit · most common)
--space-5:  20px
--space-6:  24px   (card gap · grid gap)
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
--space-24: 96px
```

### Radius

```
--radius-sm:  4px    (inputs · badges · pills)
--radius-md:  8px    (cards · buttons)
--radius-lg:  12px   (modals · feature cards)
--radius-xl:  16px   (chart cards · hero cockpit)
--radius-2xl: 24px   (image cards · cinematic blocks)
```

### Shadows (subtle-shadows depth strategy)

```css
--shadow-card-default:  0 1px 2px rgba(0,0,0,0.04);
--shadow-card-hover:    0 4px 12px rgba(0,0,0,0.06);
--shadow-card-active:   0 8px 24px rgba(0,0,0,0.10);
--shadow-modal:         0 20px 60px rgba(0,0,0,0.15);
--shadow-cinematic:     0 12px 40px rgba(0,0,0,0.30);   /* dark surfaces only */
```

### Motion

```
--ease-out:        cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1);
--duration-fast:   150ms    (micro-interactions · hover)
--duration-base:   250ms    (state transitions)
--duration-slow:   400ms    (modal entrance · drawer)
--duration-cinematic: 800ms (hero entrance · big reveal)
```

**Animation duration rule** (from ui-ux-pro-max ux-guidelines L8):
- Micro-interactions: 150-300ms
- State transitions: 250ms ± 50
- Cinematic moments: max 800ms
- NEVER >1000ms for UI (anti-pattern · feels sluggish)

---

## 92-5-3 color hierarchy (Ken rule · ANTI_PATTERNS.md Cat 2.2)

- **92%** = foundation (black/white/warm)
- **5%** = brand (Ken Red · CTAs only)
- **3%** = accent (purple/coral/periwinkle per pillar)

If a page exceeds these ratios, audit. Burning brand red on decorative borders = Cat 2.1 violation.

---

## Patterns (decisions log)

### Button Primary
- Variant: `brand`
- Height: 42px (`size="md"` default)
- Padding: 12px 20px
- Radius: 8px
- Font: 14px / 500 / DM Sans
- Background: `--color-brand`
- Hover: shimmer effect (brand-locked · do NOT delete)
- Icon: `ArrowUpRight` only via `showArrow` prop (45° diagonal · Ken signature)
- **Usage:** Primary conversion CTAs (Download Sample · Talk to Analyst · Get Report Access)

### Button Secondary
- Variant: `secondary`
- Background: transparent
- Border: 1px solid `--color-border-strong`
- Text: `--color-text-primary`
- **Usage:** Secondary actions (Talk to Analyst · Request Customization · View Details)

### Card Default
- Border: 1px solid `--color-border-subtle`
- Padding: 24px (`padding="md"`)
- Radius: 12px (`--radius-lg`)
- Background: `--color-bg-secondary` (white)
- Shadow: `--shadow-card-default`
- Hover: `--shadow-card-hover` · transform: translateY(-2px) · 200ms
- **Usage:** Content containers · stat tiles · driver cards · trend cards

### Card Chart (8-zone)
- Wraps `<ChartCard>` always
- Radius: 16px (`--radius-xl`)
- Padding: 32px (`padding="lg"`)
- Shadow: `--shadow-card-default`
- Source note: 13px · `--color-text-tertiary` · bottom-aligned
- Access state: top-right corner · status dot + tier label
- **Usage:** MarketSizeChart · FutureOutlook · all interactive charts

### Section Standard
- Wraps `<SectionWrapper background="white|warm|black" spacing="sm|md|lg|xl">`
- `lg` = standard content (most common)
- `xl` = hero · FinalCTA only
- `sm` = inline CTA strips · breadcrumb
- Container width: `<Container variant="page">` for full-width · `narrow` for prose
- **NEVER:** inline `px-* py-*` for section padding · nested SectionWrappers · arbitrary `max-w-[1200px]`

---

## Cinematic-vs-editorial decision rule

**Default:** editorial-light for any page-build (case-study · report-PDP · listing · sector landing · service-overview).

**Cinematic-dark applies ONLY when:**
1. Recipe header `Variant: cinematic-dark` explicit
2. User explicit override w/ rationale ("hero cinematic for this premium surface")
3. Selected sections (e.g., ResourcesSection always-cinematic per pattern · FinalCTA black)
4. AI/RAG L3 surfaces (AI-Native UI category)

**NEVER auto-pick cinematic-dark for:**
- B2B Service surfaces (PRD §7 explicit "white/off-white")
- Analytics Dashboard light variants
- Research-pillar pages (default editorial-light)

---

## Voice rules (cross-ref voice/*.md)

- Research pillar: analyst-led · evidence-first · *"The market reached AUD 6,547.8 Mn in 2022"* (NOT *"transform your business with cold chain insights"*)
- Consulting pillar: case-narrative · outcome-focused · *"Reduced procurement cycle by 31% across 5 sites"*
- Surveys pillar: data-democratic · accessible · *"Sample size 1,200 · methodology described in section 6"*
- NEVER: marketing-glitz · superlatives · "industry-leading" "best-in-class" "world-class"
- ALWAYS spell first reference: *Compound Annual Growth Rate (CAGR)* · *Generative Engine Optimization (GEO)*

---

## Anti-patterns reference

Full catalog: [`ANTI_PATTERNS.md`](./ANTI_PATTERNS.md) Categories 1-14.

Headline anti-patterns enforced via grep gates in aura-builder:
- Cat 1.1 No hardcoded hex
- Cat 1.5 No arbitrary `text-[Npx]` (Tailwind v4 silent no-op)
- Cat 2.1 Ken Red CTA-only (no decorative)
- Cat 4.2 No double-padding (SectionWrapper handles)
- Cat 4.3 No `max-w-[1200px]` (use Container)
- Cat 4.5 No nested SectionWrappers
- Cat 5.4 No raw `<button>` (use DS Button)
- Cat 7 No GSAP/Lenis (Framer only since 2026-05-08)

aura-craft adds 7 more (see `skills/aura-craft/SKILL.md` hard-bans list).

---

## Decisions log

| Decision | Rationale | Date |
|---|---|---|
| Editorial-light = page-build DEFAULT | Most Ken surfaces · B2B research voice · PRD §7 explicit | 2026-04-29 |
| Subtle-shadows depth strategy | Research = trust + data · borders-only too sterile · layered too SaaS-bro | 2026-05-12 |
| Major Third 1.25× type scale | Maximum readability density · matches research-paper-feel | 2026-04 (Phase 1) |
| Noto Serif display + DM Sans body | Display-Sans pairing · editorial publication feel · pre-Phase 1 brand decision | 2026-04 |
| Ken Red CTA-only · 92-5-3 ratio | 5% brand · 3% accent · 92% foundation · prevents brand-color decoration drift | 2026-04 (Phase 1 brand audit) |
| Framer Motion only · drop GSAP + Lenis | Dev-team parity 2026-05-08 sprint | 2026-05-08 |
| Pricing OFF page · conversion via content depth | User direction 2026-05-12 · trust + intelligence proof drives leads | 2026-05-12 |
| aura-craft skill = step 4.5 in page-build | Reports-pdp-v2 build passed structural greps but lacked craft layer · gate gap | 2026-05-12 |

---

## Variant overrides

### V1 Cinematic Dark
- bg-primary: `#0a0a0c`
- accent-teal: `#00e5ff` (allowed cinematic-only)
- Type: same scale · weight increases (Noto Serif 700+ for display)
- Motion: longer durations (400-800ms) · spring physics on hero
- Depth: `--shadow-cinematic` only · no card-default shadow (lost in dark)

### V2 Editorial Light (DEFAULT)
- bg-primary: `#f5f2f1`
- accent-purple/coral/periwinkle per pillar
- Type: weight 400-600 · serif italic for emphasis only
- Motion: standard durations · subtle entrance only
- Depth: full subtle-shadows scale

### Pillar accent mapping (3% budget)

- **Research:** `--color-accent-purple` (#6759a8)
- **Consulting:** `--color-accent-coral` (#d27052)
- **Surveys:** `--color-accent-periwinkle` (#8e8acd)
- **Cross-pillar:** Use foundation only (no accent)

---

## Section-type defaults (aura-craft reference)

| Section type | Lead element | Motion | Depth | Type rhythm |
|---|---|---|---|---|
| Hero | H1 (display) | entrance stagger 60ms | `--shadow-cinematic` on cards | display/xl/base/xs |
| Stat strip | Big number | count-up on view (once) | `--shadow-card-default` | 3xl/sm/base/micro |
| Chart card | Chart viz | hydration fade 400ms | `--shadow-card-default` | 2xl/base italic/sm/xs |
| Executive summary | Insight quote | static · no motion | borders + subtle bg | 2xl/lg/base/xs |
| Definitions glossary | Term name | static | borders-only on cards | 2xl/base/sm/micro |
| Taxonomy tree | Parent category | expand/collapse spring | borders-only | 2xl/base/sm/xs |
| Methodology stepper | Stage number badge | progressive reveal | borders + step dots | 2xl/base/sm/xs |
| Final CTA | Display headline | full-bleed entrance | cinematic shadow | display/xl/base/— |
| FAQ accordion | Q text | native `<details>` | borders-only | 2xl/lg/base/xs |
| TOC | Chapter title | expand transitions | borders-only | 2xl/sm/base/micro |
| Footer | — | static | — | sm/xs/micro |

---

## Adapter pattern (DS Port Phase 3 · added 2026-05-13)

**Rule:** DS organisms that need data take it via PROPS · never import consumer mock data.

```tsx
// WRONG — consumer-coupled:
import { ANALYST_PICKS } from '@/app/components/data';
export function AnalystPicks() { return <>{ANALYST_PICKS.map(...)}</> }

// RIGHT — adapter:
import type { AnalystPick } from '../types';
export interface AnalystPicksProps { picks: AnalystPick[]; label?: string }
export function AnalystPicks({ picks, label = 'Expert Insights' }: AnalystPicksProps) {
  return <>{picks.map(...)}</>
}
```

**Why:** Data shape stays in consumer · DS components remain pure renderers · types are the contract.

**How to apply:**
1. Extract data type from OG to `core-v2/src/types/index.ts`
2. Replace data const imports w/ required props of same shape
3. Generalize hook-state types (e.g. `typeof FULL_INDUSTRIES` → `IndustryData[]`)
4. Add sensible default copy via prop defaults so thin wrappers stay composable
5. Lift static lookup tables (industryIconMap) to atoms — utility · not data
6. Consumer state hooks (useReportFilters) stay in consumer · DS exports TYPE shape only

**Affected organisms (15):** AnalystPicks · CardListing · CustomResearchCTA · DailyDataHighlights · FeaturedResearch · FiltersPanel · IndustrySectorsGrid · IndustrySidebar · IndustrySpotlight · KeyMarketIndicators · ListingToolbar · RecentlyViewed · RecommendedForYou · ReportPreview · ReportStoreHero.

Full pattern · code examples · cross-references: `core-v2/docs/COMPONENT_REFERENCE.md` § Adapter pattern.

---

## A11y patterns (Lighthouse-discovered · added 2026-05-13)

4 axe rules surfaced during reports-pdp-v2 v2b audit (A11y 87 → 100 after fixes). Apply preemptively to avoid Lighthouse score regression.

### Rule 1 · `aria-prohibited-attr`

**Never** put `aria-label` on `<div>`/`<span>` without `role` attribute.

```tsx
// WRONG:
<div aria-label="Locked indicator"><Lock /></div>

// RIGHT:
<div role="img" aria-label="Locked indicator"><Lock /></div>
// or
<button role="button" tabIndex={0} aria-label="..." onClick={...}>...</button>
```

### Rule 2 · `aria-valid-attr-value`

**Never** set `aria-controls="X"` when target `id="X"` doesn't exist in DOM (e.g. closed accordion w/ conditionally-rendered content).

```tsx
// WRONG:
<div aria-controls={`${id}-content`} aria-expanded={open}>

// RIGHT — conditional spread:
<div aria-expanded={open} {...(open ? { 'aria-controls': `${id}-content` } : {})}>
```

### Rule 3 · `definition-list`

**Never** put non-`<dt>`/`<dd>` sibling elements (Badge row · lock overlay) inside `<dl>`. Move siblings OUTSIDE.

```tsx
// WRONG:
<dl>
  <div><dt>X</dt><dd>Y</dd></div>
  <div className="metadata"><Badge /></div>  {/* invalid */}
</dl>

// RIGHT:
<>
  <dl><div><dt>X</dt><dd>Y</dd></div></dl>
  <div className="metadata"><Badge /></div>
</>
```

### Rule 4 · `skip-link`

DS `SkipLink` defaults `href="#main-content"`. Consumer must have matching element id in DOM.

```tsx
// Add alias span near <main>:
<span id="main-content" aria-hidden="true" />
<main id="pdp-main" tabIndex={-1}>...</main>
```

These 4 rules cost 13 Lighthouse a11y points. Mechanical fixes. Add to mental checklist + aura-craft hard-bans 13-16. Memory: `feedback_a11y_patterns.md`.

---

## How to use this file

**Read order for any new page build:**
1. **PRD / brief** (project intent)
2. **Recipe** at `design-system/recipes/<name>.md` (page-specific architecture)
3. **DESIGN.md** (this file · craft vocabulary)
4. **COMPONENT_REFERENCE.md** (DS atom catalog)
5. **ANTI_PATTERNS.md** (never-rules)
6. **voice/<pillar>.md** (copy voice)
7. **motion/MOTION_SPEC.md** (motion patterns)

DESIGN.md = bridge between brand brief and component file. NOT a substitute for either.

---

**Last updated:** 2026-05-13 (+ adapter pattern + 4 a11y rules)
**Next review:** every sprint exit · update Decisions log + Variant overrides as brand evolves
