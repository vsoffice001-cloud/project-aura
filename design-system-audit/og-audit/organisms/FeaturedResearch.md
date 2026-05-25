# FeaturedResearch — Organism Audit (OG · Wrapper)

**Source:** `Design_system_vs_26 (og and final)/src/app/components/organisms/FeaturedResearch.tsx` (30 LOC)
**Reuse tier:** ⭐⭐⭐⭐☆ (4/5) — pillar-specific carousel wrapper
**Status:** Thin wrapper · second model of the adapter pattern (alongside ReportStoreHero)

---

## 1. WHAT

Featured research reports carousel for the Report Store home page. Per OG JSDoc (L1–9): *"WHAT: Featured research reports carousel for the Report Store home page. WHY: Wraps FeaturedCarousel with RS-specific content and data. WHEN: Section 2 of ReportStorePage (Home mode). HOW: Renders FeaturedCarousel with FEATURED_REPORTS from data.ts, each item rendered via ReportCard layout='grid'."*

---

## 2. WHY

- FeaturedCarousel is generic + slot-based · the Report Store needs **specific** featured-reports data + ReportCard rendering
- Encapsulates the iteration + card wrapping (`flex-shrink-0` + `width:300px`) so RSPage stays declarative
- Co-locates "what gets featured in RS" config (`FEATURED_REPORTS`) with its rendering
- Mirrors the `ReportStoreHero` wrapper pattern · consistent adapter style across pillars

---

## 3. WHEN to use ✅

- Section 2 of Report Store HOME page (`ReportStorePage.tsx:90`)
- Standalone "latest research" surface (e.g. embed widget)

---

## 4. WHEN NOT to use ❌

- LISTING mode → no featured-research section
- Surveys / Datasets pillars → use their own wrapper (`FeaturedSurveys`, etc.)
- Curated-by-analyst surface → use `AnalystPicks` organism instead
- Industry-specific featured → use `IndustryFeatured` (n/a · gap)

---

## 5. WHERE used (consumer file:line)

- `Design_system_vs_26.../src/app/components/ReportStorePage.tsx:90` — Section 3 of HOME mode
- `Design_system_vs_26.../src/app/components/organisms/index.ts:31` — barrel export
- `projects/report-store-legacy/src/app/components/FeaturedResearch.tsx` — port
- `projects/competition-benchmarking-listing-v02/src/app/components/FeaturedResearch.tsx` — port

---

## 6. HOW to implement

```tsx
import { FeaturedResearch } from '@/app/components/organisms';

// Zero-config · pulls FEATURED_REPORTS from data.ts
<FeaturedResearch />
```

Body (L14–28):

```tsx
export function FeaturedResearch() {
  return (
    <FeaturedCarousel
      label="Featured"
      title="Latest Research"
      subtitle="Our most recent publications across key growth sectors"
      ctaText="View all reports"
    >
      {FEATURED_REPORTS.map((report) => (
        <div key={report.id} className="flex-shrink-0" style={{ width: '300px' }}>
          <ReportCard {...report} layout="grid" />
        </div>
      ))}
    </FeaturedCarousel>
  );
}
```

---

## 7. Composition tree

```
FeaturedResearch
└─ FeaturedCarousel (label · title · subtitle · ctaText)
   └─ FEATURED_REPORTS.map → wrapper div (flex-shrink-0 · w-300px) → ReportCard layout="grid"
```

**Imports:** `FeaturedCarousel` · `ReportCard` · `FEATURED_REPORTS` (data.ts)

---

## 8. Properties · WHY each exists

**OG: zero props.** All content hard-coded in component body + data.ts.

Hard-coded values:
- label="Featured" (L17)
- title="Latest Research" (L18)
- subtitle="Our most recent publications across key growth sectors" (L19)
- ctaText="View all reports" (L20)
- card width="300px" (L23)
- card layout="grid" (L24)

---

## 9. Data contract

```ts
// data.ts canonical source
export const FEATURED_REPORTS: ReportItem[] = [...];

// Wrapper has no props
export function FeaturedResearch(): JSX.Element;
```

`ReportItem` shape (from `data.ts`) likely contains:
```ts
export interface ReportItem {
  id: string;
  image: string;
  title: string;
  industry: string;
  subcat?: string;
  projection?: string;
  region: string;
  date: string;
  description?: string;
}
```

---

## 10. States

- **Default:** rendered carousel · 5–10 cards typical
- **Empty (FEATURED_REPORTS=[]):** ❌ inherits FeaturedCarousel bug (no empty-state · renders empty scroll container)
- **Loading:** ❌ no loading prop · async data isn't handled

---

## 11. Variants

**OG: single variant.** No overrides.

Possible future variants:
- `<FeaturedResearch limit={3}>` — show only top 3
- `<FeaturedResearch filter="india">` — region-filtered

---

## 12. Responsive behavior

Inherited from FeaturedCarousel + HorizontalScroll. Card width fixed at 300px regardless of breakpoint (could be `w-[280px] md:w-[300px]`).

---

## 13. Tokens used

Inherited from FeaturedCarousel. ⚠️ Hard-coded `width: '300px'` (L23) — should be `var(--card-width-featured)`.

---

## 14. A11y rules

Inherited from FeaturedCarousel + ReportCard. Each card via `report.id` key — proper React key discipline.

---

## 15. Motion rules

Inherited.

---

## 16. Anti-patterns ❌

- ❌ Hard-coded copy in component body (not in `data.ts` like ReportStoreHero) — inconsistent: hero copy goes to data.ts (HERO_CONFIG), featured copy goes inline. Should be FEATURED_RESEARCH_CONFIG.
- ❌ Hard-coded card width `300px` — should be tokenized + breakpoint-responsive
- ❌ Wrapping div for `flex-shrink-0 + width` is the leaky abstraction from FeaturedCarousel (consumer responsibility)
- ❌ No loading / empty / error state handling
- ❌ Inherits FeaturedCarousel's dead `itemWidth` prop · empty-state bug

---

## 17. REUSABILITY SCORE

**4/5 ⭐⭐⭐⭐☆** — pillar-specific wrapper · single-use. Pattern is sound · but inconsistency w/ ReportStoreHero (config-in-data.ts vs config-inline) is a smell.

---

## 18. Linked components

- **Composes:** `FeaturedCarousel`
- **Renders:** `ReportCard` (molecule)
- **Reads config from:** `data.ts` → `FEATURED_REPORTS`
- **Sibling wrappers:** `ReportStoreHero` · `CustomResearchCTA` · `AnalystPicks` · `RecommendedForYou` · `TopDownloads` · `RecentlyViewed` · `UpcomingReports`
- **Parent consumer:** `ReportStorePage` Section 3 (HOME MODE)

---

## 19. Composition rule (in a page recipe)

**ReportStorePage HOME MODE (L83–112):**

```
Section 1: ReportStoreHero          ← black
Section 2: QuickAccessBar           ← white subtle
Section 3: FeaturedResearch         ← THIS · white
Section 4: KeyMarketIndicators      ← warm
...
```

**Before:** QuickAccessBar (white subtle)
**After:** KeyMarketIndicators (warm)
**Bg-alternation:** FeaturedResearch is white (inherits FeaturedCarousel default) · sits between two non-dark surfaces — OK rhythm: subtle-white → white → warm.

---

## 20. Reasons + Decisions log

- **Why copy hard-coded not in `data.ts`?** Inconsistency w/ ReportStoreHero. Likely organic drift — `data.ts` got too big. Recommend: introduce `FEATURED_RESEARCH_CONFIG` constant alongside HERO_CONFIG and `CTA_CONFIG` for consistency.
- **Why ReportCard layout="grid" not "list"?** Featured carousel = grid-mode visual · matches the curated-spotlight tone.
- **Why width 300px?** Per OG worked example tested in Figma — 300px is the sweet spot for ReportCard in carousel context (image + title + meta + tags w/o cramping). Could be tokenized.
- **Why `flex-shrink-0`?** HorizontalScroll relies on fixed-width children. Without flex-shrink-0, cards collapse on narrow viewports.
- **Why ctaText="View all reports" not href?** Link target undefined yet · placeholder. Real navigation route in future iteration.
- **Why no per-card lazy-loading?** Carousel shows initial cards only · OS-level intersection observers handle off-screen lazy-load on `<img>` tags within ReportCard.
- **Why `FEATURED_REPORTS.map` not slice?** Demo data is already curated to ~6 items · no client-side cap needed. In production w/ real API, would slice or paginate.

---

**Audit conclusion:** Functional wrapper · cosmetic inconsistencies w/ sibling ReportStoreHero. Port to core-v2 w/ 3 fixes: (1) extract copy to `FEATURED_RESEARCH_CONFIG` in data.ts · (2) tokenize card width · (3) add empty/loading state pass-through. Estimated effort: 1 hour.
