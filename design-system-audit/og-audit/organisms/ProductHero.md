# ProductHero — Organism Audit (OG)

**Source:** `Design_system_vs_26 (og and final)/src/app/components/organisms/ProductHero.tsx` (104 LOC)
**Reuse tier:** ⭐⭐⭐⭐⭐ (5/5) — cross-pillar template hero
**Status:** Well-shaped organism · slot-based · documented intent · model for how organisms SHOULD be built

---

## 1. WHAT

Reusable hero template for Product pages (Report Store · Surveys). Black-surface section w/ SectionHeading + optional search input + optional badge row + slot for extra content. Slot-based design lets each pillar inject its own content while sharing the same structural pattern. (ProductHero.tsx:1–11 JSDoc)

---

## 2. WHY

- Per OG JSDoc verbatim (L8–10): *"Reusable hero template for Product pages... Uses a slot-based design so each pillar can inject its own content while sharing the same structural pattern. Per dev plan: 'Hero sections use a reusable template pattern rather than per-pillar organisms.'"*
- Prevents per-pillar hero forks (Report Store hero vs Surveys hero vs Industries hero) — single template w/ data swap
- Black surface = brand cinematic impression layer (per design-system/DESIGN.md variant rules · cinematic-dark applies to landing/product hero contexts)
- Search-as-hero pattern = primary discovery affordance for catalogs · placing it at hero peak ≈ removes 1 scroll cost
- Badge row beneath search = quick context (industries · regions · date ranges) without committing user to filter yet — reduces choice paralysis

---

## 3. WHEN to use ✅

- Top of any Product catalog page (Report Store · Surveys · future Industries-as-product · future Datasets)
- Pages where discovery (search-first) > navigation
- Landing surfaces where black-surface cinematic-dark variant is appropriate
- When pillar-specific copy + badges differ but structure is identical

---

## 4. WHEN NOT to use ❌

- Case-study hero → use `HeroSection.tsx` (editorial label + 4-card meta grid + scroll-cue · different IA)
- PDP / detail page hero → use bespoke detail hero (image left + meta right · not search-led)
- Marketing landing pages w/ scroll-narrative → use `HeroSection` style
- Mobile-first lead capture → use `LeadFormHero` (n/a in OG · gap)
- Light-surface editorial hero → ProductHero is black-only · use editorial variant in `core-v2/templates/`

---

## 5. WHERE used (consumer file:line)

- `Design_system_vs_26.../src/app/components/organisms/ReportStoreHero.tsx:12–22` — direct wrapper using HERO_CONFIG from data.ts
- `Design_system_vs_26.../src/app/components/organisms/ProductPageTemplate.tsx:69` — Zone 1 of the template
- `projects/report-store-legacy/src/app/components/ReportStoreHero.tsx` — port
- `projects/competition-benchmarking-listing-v02/src/app/components/` — port

---

## 6. HOW to implement

```tsx
import { ProductHero } from '@/app/components/organisms';

// Minimal
<ProductHero
  label="Report Store"
  title="2,400+ research reports across emerging markets"
  subtitle="Industry sizing · competitive intel · forecast models."
/>

// Full w/ search, badges, custom slot
<ProductHero
  label="Report Store"
  title="2,400+ research reports across emerging markets"
  subtitle="Industry sizing · competitive intel · forecast models — published weekly."
  searchPlaceholder="Search reports, industries, projections..."
  showSearch
  badges={['India', 'BFSI', 'Healthcare', '2024 publications']}
>
  <div className="text-white/60 text-xs">↳ 18 new this week</div>
</ProductHero>

// Without search (curated landing)
<ProductHero
  label="Featured Pillar"
  title="Healthcare Intelligence"
  subtitle="500+ reports across pharma, devices, providers."
  showSearch={false}
  badges={['Pharma', 'MedDev', 'Hospitals']}
/>
```

---

## 7. Composition tree

```
ProductHero
└─ SectionWrapper (background="black" · spacing="xl" · maxWidth="wide")  (L51)
   └─ inner wrapper (max-w-1000px · mx-auto · px-4/6/8)  (L52)
      ├─ SectionHeading (label · title · subtitle · level=1 · align=left · labelPulse)  (L53–60)
      ├─ Search box (conditional · L62–88)
      │  ├─ <Search> icon (lucide-react · 18px · 40% white)
      │  └─ <input type="text"> w/ focused-state border + bg
      ├─ Badge row (conditional · L90–98)
      │  └─ <Badge variant="rounded" size="sm" theme="neutral" bordered> per item
      └─ {children} (L100)
```

**Atoms:** `SectionWrapper` · `SectionHeading` · `Badge` · `<Search>` icon · raw `<input>`
**Molecules:** none
**Hooks:** `useState` (search-focused boolean only · L48)

---

## 8. Properties · WHY each exists

| Prop | Type | Default | Why this exists |
|---|---|---|---|
| label | string (required) | — | SectionHeading kicker (e.g. "Report Store") — anchors the section identity |
| title | string (required) | — | H1 — the page promise · brand-locked sizing via SectionHeading level=1 |
| subtitle | string (required) | — | Body copy beneath title · explains scope |
| searchPlaceholder | string | 'Search...' | Pillar-specific search hint |
| showSearch | boolean | true | Toggle search off for curated/non-search pages |
| badges | string[] | [] | Filter chips beneath search — context without commitment |
| children | ReactNode | — | Slot for pillar-specific extras (highlight stat · alert banner · etc.) |
| className | string | — | Outer wrapper override (rarely needed) |

**Note:** No `background` prop · always black (intentional · cinematic-dark only). Adding light variant = future work.

---

## 9. Data contract

```ts
export interface ProductHeroProps {
  label: string;
  title: string;
  subtitle: string;
  searchPlaceholder?: string;
  showSearch?: boolean;
  badges?: string[];
  children?: ReactNode;
  className?: string;
}
```

**Adapter pattern (per OG `ReportStoreHero.tsx`):**

```ts
// data.ts
export const HERO_CONFIG = {
  label: 'Report Store',
  title: '2,400+ research reports...',
  subtitle: '...',
  searchPlaceholder: 'Search reports...',
  badges: ['Asia', 'BFSI', 'Healthcare', 'Energy'],
} as const;

// ReportStoreHero.tsx
export function ReportStoreHero() {
  return <ProductHero {...HERO_CONFIG} badges={[...HERO_CONFIG.badges]} />;
}
```

Consumer responsibility: provide content config (label/title/subtitle/badges). DS owns layout, surface, typography, search-input behavior.

---

## 10. States

- **Default:** rendered black section · search input bg 6%-white · border 10%-white
- **Search focused:** bg → 12%-white · border → 25%-white · 200ms transition (L65–71)
- **Search blur:** reverts
- **No search (`showSearch={false}`):** badges + children sit directly under SectionHeading
- **No badges:** badge row not rendered
- **Loading:** ❌ no built-in loading state — consumer must wrap externally
- **Error:** ❌ none
- **Empty:** ❌ none (always has content via required props)

---

## 11. Variants

**OG: one surface variant only — black.** No light alternative.

Implicit "config variants" via children:
- **Search-led:** showSearch=true · used for browse-driven pages
- **Curated:** showSearch=false · used for landing-pillar pages
- **Stat-augmented:** children = `<StatHighlight>` block (custom)

Gaps:
- ❌ Light-surface variant (cinematic-dark only)
- ❌ Imagery-backdrop variant (no `backgroundImage` prop)
- ❌ Video-loop variant
- ❌ Search-with-suggestions wired in (input is dumb)

---

## 12. Responsive behavior

- **`<sm`:** stack · padding `px-4` · search full-width · badges wrap (`flex-wrap`)
- **`sm`–`md`:** padding `px-6` · same layout
- **`md`+:** padding `px-8` · max-width 1000px (`max-w-[1000px]`) · centered
- **SectionWrapper handles vertical rhythm** (spacing="xl" → typically py-24+)

No breakpoint-specific search-input width changes — input is always `flex-1` (L77).

---

## 13. Tokens used

✅ Well-tokenized:
- `--text-xs` (L79) — input font size
- SectionWrapper background="black" → maps to `--bg-pure-black` (#0a0a0c) inside DS
- SectionWrapper spacing="xl" → maps to `--spacing-section-xl` token

⚠️ Inline rgba (not tokens):
- `rgba(255,255,255,0.06)` / `0.12` / `0.10` / `0.25` / `0.40` / `0.80` — search bg · border · text · icon (L67, 70, 73, 80)
- `rgba(0,0,0,0)` — explicit transparent background on input (L81)

**Should-be tokens:** `--surface-dark-input-bg` · `--surface-dark-input-border` · `--surface-dark-input-text` etc.

Radius: `rounded-[5px]` (L65) — should be `--radius-element` (per pattern used elsewhere · e.g. ListingToolbar.tsx:72)

---

## 14. A11y rules

✅ Heading hierarchy: SectionHeading level=1 → produces `<h1>` (mandatory for hero · only one per page)
✅ Search input is a real `<input type="text">` — keyboard accessible (L74)
✅ Badges are real `<Badge>` atoms — semantically labeled
✅ Section landmark inherited from SectionWrapper

❌ Search input has no `<label>` (sr-only or visible) — fails WCAG 1.3.1 / 4.1.2 (form input must have programmatic label)
❌ No `placeholder` is not a label — the `aria-label` should be set explicitly
❌ Focus-visible indicator: input has `outline-none` (L77) without replacement focus ring — fails WCAG 2.4.7
❌ Badge row has no group label (e.g. `aria-label="Suggested filters"`)

---

## 15. Motion rules

- Search focused → bg + border 200ms transition (`transition-all` · L65)
- Badges + content do not animate · static
- No entrance animation (relies on SectionWrapper or parent FadeInSection)
- **Reduced-motion:** ❌ no explicit handling — but only transition is bg color, low vestibular risk

---

## 16. Anti-patterns ❌

- ❌ Bare `<input>` instead of DS `<TextField>` / `<SearchInput>` atom (atoms missing in OG · gap)
- ❌ Inline rgba for surface tokens (should be CSS vars)
- ❌ No `onSearch` callback — input is decoration, not functional (search routing handled where?)
- ❌ Hard-coded `Search reports, industries, projections...` placeholder text in L76 ignores the `searchPlaceholder` prop received in L42 — **actual bug**
- ❌ No empty-state when badges=[] vs no-badges-prop distinguished
- ❌ Search input value not state-tracked — uncontrolled, no debounce, no submit

---

## 17. REUSABILITY SCORE

**5/5 ⭐⭐⭐⭐⭐** — true cross-pillar template. Slot-based. Documented intent. Used by ProductPageTemplate as Zone 1. Wrapper organisms (ReportStoreHero) prove the pattern works. Only friction: search input is decorative not functional + light-variant gap.

---

## 18. Linked components

- **Parent template:** `ProductPageTemplate.tsx` (Zone 1)
- **Wrapper organisms (consumers):** `ReportStoreHero.tsx` · future `SurveysHero` · future `IndustriesHero`
- **Sibling organisms (often follow ProductHero):** `FeaturedCarousel` (Zone 2) · `StatsRow` (Zone 3)
- **Atoms used:** `SectionWrapper` · `SectionHeading` · `Badge`
- **Icon:** `lucide-react/Search`
- **Hooks:** `useState` (built-in only)

---

## 19. Composition rule (in a page recipe)

**Order in ProductPageTemplate (L65–93):**

```
Zone 1: ProductHero          ← ALWAYS first
Zone 2: FeaturedCarousel
Zone 3: StatsRow (optional)
Zone 4: afterStats slot
Zone 5: BrowseGrid
Zone 6: afterBrowse slot
Zone 7: beforeCta slot
Zone 8: CTABanner            ← ALWAYS last
```

**Before:** Navbar (fixed · outside scroll container)
**After:** FeaturedCarousel (white surface · alternation rule per design-system recipe — black hero → white featured)

**Bg-alternation pairing:** ProductHero (black) must be followed by white or warm to avoid two-consecutive-dark surfaces (per design-system DESIGN.md bg-alternation rule).

---

## 20. Reasons + Decisions log

- **Why slot-based not per-pillar?** OG JSDoc L8–10 verbatim: *"Per dev plan: Hero sections use a reusable template pattern rather than per-pillar organisms."* — explicit anti-fork decision.
- **Why black-only surface?** Per design-system variant matrix: Product hero = cinematic-dark to anchor brand impression at first-viewport. Editorial-light reserved for case studies + listings.
- **Why max-w-1000px not container-page?** Hero content readability cap · per OG editorial recipe (case-study uses same 1000px container) · maintains line-length 65-75ch.
- **Why labelPulse on SectionHeading?** Per OG SectionHeading default — kicker label gets subtle pulse anim (1.5s loop) to draw eye to category. Brand-locked motion.
- **Why level=1 SectionHeading?** Hero = H1 mandatory (one per page · top of doc outline · WCAG 1.3.1).
- **Why uncontrolled input?** Decorative placeholder — actual search opens a modal in a future iteration (not yet built). OG ships with the styling target without behavior. **Gap to close.**
- **Why bordered + theme="neutral" badges?** Visible on dark surface · neutral theme avoids competing w/ brand red CTAs · bordered = the dark-surface badge pattern (DESIGN.md badges-on-dark).
- **Why useState locally for searchFocused?** No external observer needs the value · localizes UI state · 1-prop component.
- **Why `mt-8`, `mt-6` spacing?** Vertical rhythm steps — 8 between primary blocks, 6 between secondary. Should be tokens (`--space-block-primary`, `--space-block-secondary`).

---

**Audit conclusion:** Model organism. The OG-best example of slot-based composition w/ explicit intent JSDoc. Two real bugs to fix before porting (1: placeholder text override at L76; 2: input label gap). After fixes, port to core-v2 verbatim w/ token swap for inline rgba values.
