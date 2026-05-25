# FeaturedCarousel — Organism Audit (OG)

**Source:** `Design_system_vs_26 (og and final)/src/app/components/organisms/FeaturedCarousel.tsx` (66 LOC)
**Reuse tier:** ⭐⭐⭐⭐⭐ (5/5) — slot-based horizontal-scroll carousel · cross-pillar
**Status:** Lean · model slot-based organism · port-ready

---

## 1. WHAT

Reusable "featured items" section with SectionHeading + `HorizontalScroll` carousel. Accepts ANY card as children, so both pillars can use it with their own card components. Per OG JSDoc (L1–8): *"Structure: SectionWrapper(white) → SectionHeading(label+title+subtitle+endSlot) → HorizontalScroll → children"*

---

## 2. WHY

- Catalog pages need a "featured" / "spotlight" / "editor's picks" surface above the full browse grid — discovery via curation, not search
- Horizontal scroll = mobile-native pattern + saves vertical real-estate · shows 1-3 cards w/ implicit "more on the right" affordance
- Card-agnostic via `children` slot = Report Store can pass ReportCard, Surveys can pass SurveyCard, Industries can pass CategoryCard — single organism, many pillars
- `endSlot` on SectionHeading = right-aligned CTA-link ("View all") inline with section header — gives users an immediate "show all" escape
- White surface = editorial-light section · bg-alternation contrast vs preceding dark Hero

---

## 3. WHEN to use ✅

- Section 2 of any Product page (after Hero, before Stats/Browse)
- "Featured" / "Latest" / "Editor's picks" / "Most downloaded" patterns
- When card-count is 6–12 (more than visible viewport but not full catalog)
- When horizontal-scroll affordance is preferable to a grid (mobile)
- Section 3 alternate (after stats) for secondary curation block

---

## 4. WHEN NOT to use ❌

- Full catalog → use `BrowseGrid` (grid/list w/ pagination + view toggle)
- Single hero item → use bespoke spotlight w/ image
- 3-or-fewer items → use simple grid (carousel feels like overkill)
- Cards w/ heavy hover interaction (popover · drawer-open) — horizontal-scroll fights pointer interaction · use grid
- Content needs sorting/filtering → use `BrowseGrid` + toolbar

---

## 5. WHERE used (consumer file:line)

- `Design_system_vs_26.../src/app/components/organisms/ProductPageTemplate.tsx:72` — Zone 2 (Featured)
- `Design_system_vs_26.../src/app/components/organisms/FeaturedResearch.tsx:14–28` — RS wrapper
- `projects/report-store-legacy/src/app/components/FeaturedResearch.tsx` — port
- `projects/competition-benchmarking-listing-v02/src/app/components/FeaturedResearch.tsx` — port

---

## 6. HOW to implement

```tsx
import { FeaturedCarousel } from '@/app/components/organisms';
import { ReportCard } from '@/app/components/molecules/ReportCard';
import { FEATURED_REPORTS } from '@/app/components/data';

// Report Store usage
<FeaturedCarousel
  label="Featured"
  title="Latest Research"
  subtitle="Our most recent publications across key growth sectors"
  ctaText="View all reports"
>
  {FEATURED_REPORTS.map((r) => (
    <div key={r.id} className="flex-shrink-0" style={{ width: 300 }}>
      <ReportCard {...r} layout="grid" />
    </div>
  ))}
</FeaturedCarousel>

// Surveys usage (same shape · different card)
<FeaturedCarousel
  label="Recent surveys"
  title="Trending consumer research"
  background="warm"
  ctaText="View all surveys"
>
  {surveys.map(s => (
    <div key={s.id} className="flex-shrink-0" style={{ width: 320 }}>
      <SurveyCard {...s} />
    </div>
  ))}
</FeaturedCarousel>

// No CTA-link variant
<FeaturedCarousel
  label="Highlights"
  title="Editor's picks this week"
  ctaText=""
>
  {picks.map(p => <SpotlightCard key={p.id} {...p} />)}
</FeaturedCarousel>
```

---

## 7. Composition tree

```
FeaturedCarousel
└─ SectionWrapper (background={background} · spacing="lg" · maxWidth="wide")  (L44)
   └─ inner wrapper (max-w-1000px · mx-auto · px-4/6/8)  (L45)
      ├─ SectionHeading
      │  ├─ label · title · subtitle
      │  └─ endSlot: <CTALink href="#">{ctaText}</CTALink>  (L50–55 · conditional on ctaText)
      └─ HorizontalScroll (mt-8)  (L58–61)
         └─ {children}  ← cards (consumer-provided)
```

**Atoms used:** `SectionWrapper` · `SectionHeading` · `CTALink`
**Molecules used:** `HorizontalScroll` (from `@/app/components/molecules`)
**No state · no hooks**

---

## 8. Properties · WHY each exists

| Prop | Type | Default | Why |
|---|---|---|---|
| label | string (required) | — | Kicker — section identity (Featured / Latest / Spotlight) |
| title | string (required) | — | H2 — the curation framing |
| subtitle | string? | — | Optional context |
| ctaText | string? | 'View all' | Right-aligned CTA-link label · empty string disables |
| background | 'white' \| 'warm' \| 'black' | 'white' | Surface variant for bg-alternation |
| itemWidth | number? | — | Declared in interface (L27) but **not used** in component body — dead prop or future hook |
| children | ReactNode (required) | — | Card components (consumer-provided) |
| className | string? | — | Outer wrapper override |

**Note:** `itemWidth` prop exists in interface (L27) but is never destructured at L34–42 — looks like an intended-but-unimplemented feature. Per OG pattern at FeaturedResearch.tsx:23 (`style={{ width: '300px' }}`), consumer controls width inline on wrapping div.

---

## 9. Data contract

```ts
export interface FeaturedCarouselProps {
  label: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  background?: 'white' | 'warm' | 'black';
  itemWidth?: number;            // declared but unused (see above)
  children: ReactNode;
  className?: string;
}
```

**Adapter pattern (FeaturedResearch.tsx:14–28):**

```ts
export function FeaturedResearch() {
  return (
    <FeaturedCarousel label="Featured" title="Latest Research" subtitle="..." ctaText="View all reports">
      {FEATURED_REPORTS.map(r => (
        <div key={r.id} className="flex-shrink-0" style={{ width: '300px' }}>
          <ReportCard {...r} layout="grid" />
        </div>
      ))}
    </FeaturedCarousel>
  );
}
```

Consumer responsibility:
1. Provide cards via children
2. Wrap each card in `flex-shrink-0` div w/ explicit width (HorizontalScroll relies on fixed-width children)
3. Provide data array · iterate · map

DS owns: section structure · header · horizontal scroll mechanics · CTA-link placement.

---

## 10. States

- **Default:** rendered carousel w/ children visible · scroll snaps
- **Children empty:** ❌ no empty state · renders empty scroll container
- **Loading:** ❌ no loading prop — consumer wraps externally w/ SkeletonCards inside
- **Scrolling:** HorizontalScroll molecule handles scroll snap + scroll-shadow indicators (deferred to molecule audit)
- **No CTA:** if `ctaText=''` → endSlot is undefined · SectionHeading hides right-aligned link

---

## 11. Variants

By `background`:
- white (default · editorial-light)
- warm (editorial-warm beige)
- black (cinematic-dark · rare for featured-carousel)

Card-agnostic — any card variant works as children:
- ReportCard layout="grid"
- ReportCard layout="list" (less common in carousel)
- SurveyCard
- IndustryCard / CategoryCard
- SpotlightCard / BlogCard

---

## 12. Responsive behavior

- Padding scales `px-4 sm:px-6 md:px-8` (L45)
- Max-width 1000px inner content
- HorizontalScroll handles touch scroll on mobile · mouse scroll w/ scroll-snap on desktop
- Card width determined by consumer (no responsive-card-width built in)

**Gap:** No built-in responsive card sizing — consumer must declare width per breakpoint inline. Common pattern: `w-[280px] md:w-[300px] lg:w-[320px]`.

---

## 13. Tokens used

✅ Mostly through SectionWrapper + SectionHeading + CTALink (delegated tokenization)
⚠️ `mt-8` raw Tailwind — should be `--space-section-header-to-content`
⚠️ Card widths NOT tokenized — leaks to consumer (per FeaturedResearch.tsx:23 hard `300px`)

---

## 14. A11y rules

✅ SectionHeading produces semantic H2
✅ CTALink (when present) is a real `<a>` w/ accessible text
✅ HorizontalScroll molecule provides keyboard scroll (Left/Right arrows · per molecule audit)
✅ Scroll container is `<div>` w/ overflow — adequate for cards

❌ No `aria-label` on scroll container (e.g. `aria-label="Featured reports carousel"`)
❌ No `aria-roledescription="carousel"` (could improve SR experience)
❌ Cards in carousel don't have `aria-setsize` / `aria-posinset` semantic

---

## 15. Motion rules

- Scroll snap via HorizontalScroll molecule (CSS `scroll-snap-type`)
- No section-level entrance animation
- Card hover interactions: per-card (ReportCard etc.)
- **Reduced-motion:** scroll-snap is native CSS · respects `prefers-reduced-motion` at OS level (no JS scroll animation)

---

## 16. Anti-patterns ❌

- ❌ `itemWidth` prop declared but unused (dead code in interface · L27)
- ❌ No empty-state when children=[] · renders nothing useful
- ❌ Consumer pattern requires wrapping each card in `flex-shrink-0` div w/ inline width — leaky abstraction
- ❌ `ctaText` default of `'View all'` — magic string · should be config (i18n risk)
- ❌ `href="#"` hard-coded on CTALink (L52) — anchor goes nowhere · should be a prop (`ctaHref?: string`)
- ❌ No `onClick` on CTA-link · only href · breaks if consumer needs JS handler

---

## 17. REUSABILITY SCORE

**5/5 ⭐⭐⭐⭐⭐** — true cross-pillar carousel · card-agnostic · used by both Featured and Recommended sections. Drops to 4/5 in practice due to: dead `itemWidth` prop, hard `href="#"`, leaky width-on-wrapper pattern.

---

## 18. Linked components

- **Parent template:** `ProductPageTemplate` (Zone 2)
- **Wrappers:** `FeaturedResearch` · `RecommendedForYou` · `TopDownloads` · `RecentlyViewed` · `UpcomingReports` (all in organisms/) — all use FeaturedCarousel
- **Sibling alternative:** `BrowseGrid` (when full-grid + view-toggle needed)
- **Atoms:** `SectionWrapper` · `SectionHeading` · `CTALink`
- **Molecule:** `HorizontalScroll`
- **Consumer cards:** `ReportCard` · `SurveyCard` · `AnalystPickCardB`

---

## 19. Composition rule (in a page recipe)

**ProductPageTemplate order:**

```
Zone 1: ProductHero       (black)
Zone 2: FeaturedCarousel  (white · default)  ← bg-flip from hero
Zone 3: StatsRow          (warm typical)
Zone 5: BrowseGrid        (white)
Zone 8: CTABanner         (black)
```

**Before:** ProductHero (black) — white surface = strong bg-alternation
**After:** StatsRow (warm) or BrowseGrid (white) — if multiple FeaturedCarousels stack, alternate white/warm.
**Bg-alternation:** must not be same as preceding section.

---

## 20. Reasons + Decisions log

- **Why slot-based for cards?** OG JSDoc L4–6: *"so both pillars can use it with their own card components"* — explicit DRY decision avoiding per-pillar carousel forks.
- **Why HorizontalScroll not grid?** Mobile-first thinking · grid on mobile = stacks vertically · loses "curated" feel · horizontal-scroll preserves intent across breakpoints.
- **Why endSlot CTA-link not below grid?** Eye-level — user sees "View all" inline with header, decides before/after engaging carousel. Reduces "did I miss more?" anxiety.
- **Why white default not warm?** Per bg-alternation rule from black-hero · white is the strongest visual reset · warm is for "reading" sections.
- **Why `maxWidth="wide"` w/ inner 1000px?** Consistent w/ ProductHero, CTABanner — section pattern · readability cap.
- **Why allow background=black?** Rare but valid (cinematic featured-spotlight) · per project_kenresearch_brief experimental "premium tier" pattern.
- **Why optional subtitle?** Featured carousel is often self-explanatory by label+title · subtitle is enhancement.
- **Why no built-in pagination dots?** Horizontal-scroll affordance > dots (mobile-native). Dots add visual clutter. If pagination needed → use BrowseGrid.
- **Why `ctaText='View all'` default?** Most common label in OG worked-examples · convention prevails. Empty-string opt-out lets consumer disable.

---

**Audit conclusion:** Lean and well-shaped. Port to core-v2 w/ 4 fixes: (1) implement or remove `itemWidth` prop · (2) add `ctaHref` and `onCtaClick` props · (3) add empty-state · (4) add `aria-label` for scroll container. Estimated effort: 2 hours.
