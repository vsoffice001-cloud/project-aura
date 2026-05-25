# ProductPageTemplate — Organism Audit (OG · Template-tier)

**Source:** `Design_system_vs_26 (og and final)/src/app/components/organisms/ProductPageTemplate.tsx` (94 LOC)
**Reuse tier:** ⭐⭐⭐⭐⭐ (5/5) — **template-tier composition · meta-organism**
**Status:** Lean · declarative · cross-pillar page-template · port-ready

---

## 1. WHAT

Declarative page template for Product pages (Report Store · Surveys). Accepts configuration objects for each section zone and renders the full organism stack with optional bespoke sections injected between fixed zones. (ProductPageTemplate.tsx:1–28 JSDoc verbatim.)

This is **NOT a section organism** — it's a *template-tier* meta-organism that composes other organisms into a complete page body. Lives in organisms/ but functions as a recipe-in-code.

---

## 2. WHY

- Product pages (Report Store · Surveys · future Industries-as-product · Datasets) share an identical section sequence: Hero → Featured → Stats → Browse → CTA
- Without this template each pillar would fork the page composition → 4+ near-identical 200-line files · drift inevitable
- Declarative config-objects-per-zone API = consumer expresses *intent* (what content), template handles *composition* (which organism, what order, what surface)
- Slot insertion points (`afterStats`, `afterBrowse`, `beforeCta`) = bespoke sections can be injected at canonical insertion points without forking the template
- Bg-alternation rhythm guaranteed by template — consumer can't accidentally place two black surfaces in a row

---

## 3. WHEN to use ✅

- Building any Product page (Report Store · Surveys · Datasets · etc.)
- "Catalog discovery" page pattern (Hero → Featured → Browse → CTA)
- When pillar adheres to canonical 5-zone sequence
- When bespoke sections fit in `afterStats` / `afterBrowse` / `beforeCta` slots
- Rapid pillar prototyping — fill in config-objects, ship

---

## 4. WHEN NOT to use ❌

- Case-study pages → use case-study recipe (HeroSection + ClientContext + Challenges + ... + FinalCTASection) · different organism set
- Listing pages w/ filters → use Listing variant of `ReportStorePage` (see ReportStorePage.tsx:119–180 LISTING MODE · sidebar + toolbar + CardListing pattern)
- PDP / report detail pages → use bespoke PDP layout (not yet built · see `projects/reports-pdp-v2/`)
- Marketing landing pages w/ scroll-narrative → use narrative-led composition
- When zone sequence differs significantly from Hero/Featured/Stats/Browse/CTA → fork or use raw organisms

---

## 5. WHERE used (consumer file:line)

- Direct consumers in OG: declared as the composition pattern but `ReportStorePage.tsx:80–113` (HOME MODE) hand-rolls the sequence instead of calling ProductPageTemplate. **Gap:** template defined but not yet adopted internally · awaits next pillar (Surveys).
- Intended use: future Surveys page · future Datasets page · any new Product pillar
- Pattern reference: Surveys Demo Content templates in `worked-examples/v02-for-design-system/`

---

## 6. HOW to implement

```tsx
import { ProductPageTemplate } from '@/app/components/organisms';
import { ReportCard } from '@/app/components/molecules/ReportCard';

<ProductPageTemplate
  hero={{
    label: 'Report Store',
    title: '2,400+ research reports',
    subtitle: 'Industry sizing · forecasts · competitive intel.',
    searchPlaceholder: 'Search reports...',
    badges: ['India', 'BFSI', 'Healthcare'],
  }}
  featured={{
    label: 'Featured',
    title: 'Latest research',
    subtitle: 'Our most recent publications',
    ctaText: 'View all reports',
    children: FEATURED_REPORTS.map(r => (
      <div key={r.id} className="flex-shrink-0" style={{ width: 300 }}>
        <ReportCard {...r} layout="grid" />
      </div>
    )),
  }}
  stats={{
    label: 'By the numbers',
    title: 'Coverage at a glance',
    stats: [...statsData],
    columns: 4,
  }}
  browse={{
    label: 'Browse',
    title: 'All reports',
    items: allReports,
    renderCard: (r, mode) => <ReportCard {...r} layout={mode} />,
    countLabel: 'reports',
  }}
  cta={{
    label: 'Get started',
    title: 'Talk to an analyst',
    primaryText: 'Book a call',
    primaryShowArrow: true,
    secondaryText: 'Browse more',
    onPrimaryClick: () => openBookingModal(),
  }}
  afterStats={<KeyMarketIndicators />}
  beforeCta={<ResearchMethodology />}
/>
```

---

## 7. Composition tree

```
ProductPageTemplate (React.Fragment)
├─ Zone 1: ProductHero {...hero}              (always)
├─ Zone 2: FeaturedCarousel {...featured}     (always)
├─ Zone 3: StatsRow {...stats}                (optional · only if stats prop provided)
├─ Zone 4: {afterStats}                       (slot · bespoke)
├─ Zone 5: BrowseGrid {...browse}             (always)
├─ Zone 6: {afterBrowse}                      (slot · bespoke)
├─ Zone 7: {beforeCta}                        (slot · bespoke)
└─ Zone 8: CTABanner {...cta}                 (always)
```

**Note:** Numbers in JSDoc (L13–22) list 7 zones but code shows 8 (slot beforeCta is added — likely later addition · doc lag).

**Composed organisms (all from `./` siblings):**
`ProductHero` · `FeaturedCarousel` · `StatsRow` · `BrowseGrid` · `CTABanner`

**No atoms · no molecules · pure organism composer.**

---

## 8. Properties · WHY each exists

| Prop | Type | Default | Why |
|---|---|---|---|
| hero | ProductHeroProps (required) | — | Zone 1 config — every Product page has a hero |
| featured | FeaturedCarouselProps (required) | — | Zone 2 config — every Product page has featured |
| stats | StatsRowProps? | — | Zone 3 config — optional (some pillars skip stats) |
| browse | BrowseGridProps<any> (required) | — | Zone 5 config — the catalog itself |
| cta | CTABannerProps (required) | — | Zone 8 — every Product page has a final CTA |
| afterStats | ReactNode? | — | Slot between Stats and Browse (e.g. AnalystPicks · KMI) |
| afterBrowse | ReactNode? | — | Slot between Browse and CTA (e.g. Methodology · Testimonials) |
| beforeCta | ReactNode? | — | Slot immediately before CTA (e.g. final trust block) |

**Note:** `browse: BrowseGridProps<any>` uses `any` for the generic T — **type-safety loss**. Should be `<T>` generic at template level too: `ProductPageTemplate<T>` with `browse: BrowseGridProps<T>`.

---

## 9. Data contract

```ts
export interface ProductPageTemplateProps {
  hero: ProductHeroProps;
  featured: FeaturedCarouselProps;
  stats?: StatsRowProps;
  browse: BrowseGridProps<any>;   // ⚠️ any — should be generic
  cta: CTABannerProps;
  afterStats?: ReactNode;
  afterBrowse?: ReactNode;
  beforeCta?: ReactNode;
}
```

Consumer responsibility: provide config objects per zone · DS handles ordering · spacing · bg-alternation · composition.

**Adapter / wrapper pattern:** consumer can build a pillar-specific page like:

```tsx
export function SurveysPage() {
  return (
    <ProductPageTemplate
      hero={SURVEYS_HERO_CONFIG}
      featured={SURVEYS_FEATURED_CONFIG}
      stats={SURVEYS_STATS}
      browse={{
        ...SURVEYS_BROWSE_CONFIG,
        items: surveys,
        renderCard: (s, m) => <SurveyCard {...s} layout={m} />,
      }}
      cta={SURVEYS_CTA_CONFIG}
    />
  );
}
```

---

## 10. States

ProductPageTemplate is a pure composer · no state of its own. State distributes:
- Browse loading/empty/view-mode → BrowseGrid (controlled or uncontrolled)
- View-mode → BrowseGrid
- CTA disabled/loading → not exposed (each Button handles independently)

---

## 11. Variants

**Implicit variants by which slots/zones are used:**
1. **Minimal:** hero + featured + browse + cta (no stats · no slots)
2. **Standard:** + stats (Zone 3)
3. **Trust-heavy:** + afterStats=`<ResearchMethodology>` · beforeCta=`<TestimonialsRS>`
4. **Listing-precursor:** standard + afterBrowse=`<RecommendedForYou>`

**Pillar variants** (via wrapper components):
- `ReportStoreHomePage` (HOME MODE)
- `SurveysHomePage` (future)
- `DatasetsHomePage` (future)

---

## 12. Responsive behavior

ProductPageTemplate itself is a Fragment — no layout. All responsive behavior delegated to:
- ProductHero (responsive padding · clamp h1)
- FeaturedCarousel (HorizontalScroll · mobile-native)
- StatsRow (responsive grid cols)
- BrowseGrid (responsive grid · view-toggle)
- CTABanner (button row · ⚠️ doesn't stack on mobile · see CTABanner audit)

---

## 13. Tokens used

None directly. All tokenization deferred to composed organisms · which themselves delegate further to SectionWrapper / SectionHeading / atoms.

---

## 14. A11y rules

✅ Fragment composition — no extra DOM wrapping · no landmark conflicts
✅ Each Zone produces its own `<section>` via SectionWrapper

❌ No `<main>` landmark wrapping the template (parent layout must provide)
❌ No skip-link to BrowseGrid (the typical "skip to main content" target)
❌ Aria-labelledby per section not enforced

**Consumer responsibility:** wrap `<ProductPageTemplate>` in `<main id="main-content">` and provide skip-link via Navbar.

---

## 15. Motion rules

None at template layer. Each composed organism may have its own motion (per their audits).

---

## 16. Anti-patterns ❌

- ❌ `browse: BrowseGridProps<any>` — loses generic typing · should be `ProductPageTemplate<T>` w/ `browse: BrowseGridProps<T>`
- ❌ Comment JSDoc lists 7 zones (L13–22) but code has 8 (L65–93) — doc drift
- ❌ Zone numbers in JSDoc don't match code (Zone 4 in JSDoc = "afterStats" but Zone 4 in code is also `afterStats` ✓ · Zone 8 in JSDoc = CTA · code Zone 8 = CTA ✓ — actually consistent but confusingly skips Zone 7 between · L86–87 shows "Zone 6: After-Browse · Zone 7: Before-CTA · Zone 8: CTA")
- ❌ Not actually adopted by `ReportStorePage.tsx` HOME MODE — RSPage hand-rolls the composition instead of using this template (L83–112) · likely because RSPage needs richer mid-zones than the 3 slots allow
- ❌ No way to disable/reorder fixed zones (Hero / Featured / Browse / CTA) — if Surveys wants Featured at Zone 5 instead of Zone 2, must fork
- ❌ Hero & CTA always present — no `null` allowance for pages w/o them

---

## 17. REUSABILITY SCORE

**5/5 ⭐⭐⭐⭐⭐** in design intent · **3/5 in adoption** — defined but not yet adopted by the only existing consumer (RSPage). Will rise to 5/5 once Surveys pillar ships and adopts it.

---

## 18. Linked components

- **Composed organisms:** `ProductHero` · `FeaturedCarousel` · `StatsRow` · `BrowseGrid` · `CTABanner`
- **Slot candidates:** any organism — typical: `KeyMarketIndicators` · `RecommendedForYou` · `DailyDataHighlights` · `AnalystPicks` · `IndustrySectorsGrid` · `ResearchMethodology` · `ComparisonTable` · `TestimonialsRS`
- **Alternate template:** Case-study recipe (HeroSection + ChallengesSection + EngagementObjectives + ... + FinalCTASection)
- **Should-link:** `<main>` wrapper (consumer · layout layer)

---

## 19. Composition rule (in a page recipe)

**Fixed sequence (per template body L65–93):**

```
1. ProductHero        (black)
2. FeaturedCarousel   (white default)
3. StatsRow           (warm default · optional)
4. afterStats slot    (any organism)
5. BrowseGrid         (white default)
6. afterBrowse slot   (any organism)
7. beforeCta slot     (any organism)
8. CTABanner          (black default)
```

**Bg-alternation rhythm (per default backgrounds):**
`black → white → warm → ?(slot) → white → ?(slot) → ?(slot) → black`

Slot fillers should respect alternation — e.g. if afterStats=`<AnalystPicks bg="warm">` and Stats=warm, bg-alternation fails. Currently no validation — consumer must self-police.

**Before template:** `<Navbar />` (fixed top, outside main)
**After template:** Footer (n/a in OG · gap)

---

## 20. Reasons + Decisions log

- **Why declarative config-object API vs JSX composition?** Config-object = type-safe per-zone validation · template handles the JSX composition. JSX composition (passing organisms as children) loses type-coupling between zone position and config shape.
- **Why 3 slot positions (afterStats · afterBrowse · beforeCta)?** Most-common bespoke insertions in OG worked examples: trust block (afterStats) · related content (afterBrowse) · final disclaimer/methodology (beforeCta). Three slots covers ~95% of needs.
- **Why no slot before Hero or after CTA?** Hero=top, CTA=bottom — anything before Hero is Navbar's job, anything after CTA is Footer's job. Hard boundary.
- **Why Stats optional but Hero/Featured/Browse/CTA required?** Stats is the only zone some pillars genuinely skip (e.g. Surveys may not have a stats narrative). Hero/Featured/Browse/CTA are universal.
- **Why Fragment not div wrapper?** Each Zone's SectionWrapper provides its own `<section>` element · adding a parent div would create a unnecessary DOM node + a wrap-context that could trap overflow / break sticky positioning.
- **Why `browse: BrowseGridProps<any>`?** Likely TS-friction shortcut — making the template generic over T cascades to every consumer call. **Engineering debt: should be `ProductPageTemplate<T>` with proper generic plumbing.**
- **Why not adopted yet by `ReportStorePage`?** RSPage HOME MODE has 10 sections (per `ReportStorePage.tsx:13–22`), not 5+3-slots — needs `QuickAccessBar` · `KeyMarketIndicators` · `DailyDataHighlights` · `IndustrySectorsGrid` etc., which exceeds template slot budget. Indicates the template's slot model is too rigid for the actual richest consumer.
- **Why beforeCta separate from afterBrowse?** Subtle semantic — beforeCta is "the last narrative beat before conversion" (typically trust/testimonial) · afterBrowse is "post-browse, pre-conversion" filler. Two different intents · two slots.

---

**Audit conclusion:** Strong design intent · weak adoption. Either (a) extend slot model to 5+ slots and adopt across RSPage / Surveys / etc., OR (b) deprecate and let pillar pages hand-roll w/ explicit organisms + a recipe documentation guide. Recommend (a). Also: fix `any` → generic `<T>`. Estimated effort: 4 hours for generic + slot extension.
