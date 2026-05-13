# Surface 02 — Report Store

**Buyer's question:** "Can I find / evaluate / buy without filling a form?"
**North stars:** Stripe checkout × Linear product page × Notion template gallery × Figma Community · `references/design-systems/{stripe,linear}/`
**Brand variant:** Editorial light DEFAULT for listing + filters. Cinematic dark for hero band + featured-research carousel. Detail page = editorial light w/ optional cinematic-dark hero.

Report Store = where Ken **monetizes the work**. Tier A locks behind PDF-and-form purgatory. Ken wins by making the report **shoppable like Stripe Press**: sample-readable, citations-visible, price + add-to-cart on every card, no form interceptors before purchase.

---

## Information architecture

### 02a. Listing (`/reports`)

```
[Hero band — cinematic dark]
  H1: "Reports" (Noto Serif 48-56px)
  Sub: search-friendly tagline w/ live count ("Browse 1,247 verified reports across 14 industries")
  Search: large search input · auto-suggest fuzzy match across title + sector + tag (⌘K shortcut)
  Filter chips below search: "Healthcare (47)" "Q1 2026 (134)" etc — top 6 most-popular filters as chips

[Body — 3-zone layout, editorial light]
  Left rail (sticky):    IndustrySidebar from report-store-v07 canonical (RS source = canonical, per LEARNING 2026-05-06 DS-sync hierarchy)
                          7 dimensions: Report Type · Industry · Tags · Region · Country · Set Size · Methodology · Year
                          Active-filter chips strip top of right zone (RS Zone B clone, color-coded)
  Center grid:          ReportCard from RS canonical · masonry rhythm via react-responsive-masonry
                          Card chrome: cover thumbnail · eyebrow (sector) · title (Noto Serif) · 1-line abstract · meta (date · pp · cited X×) · price · [Quick view] [Add to cart]
                          Glassmorphism Featured + Latest badges (WCAG AAA contrast, image-overlay-badge atom)
  Right rail (optional):  Empty by default. On filter active OR card-quickview → context panel (preview/cite/share)

[Mobile FilterSheet]
  Hamburger filter button bottom-right (sticky) · opens MobileFilterSheet (RS canonical clone)
  All 7 dimensions accessible · "Apply (X)" sticky bottom CTA

[List/grid toggle]
  Top-right of grid · default = grid (masonry) · alt = list (RS ListCard canonical 1:1)

[Pagination + infinite-scroll hybrid]
  Default infinite-scroll w/ "Load more" CTA every 24 cards (avoids endless-scroll fatigue)
  URL state synced via useReportFilters hook (465 LOC URL-state, RS canonical) — shareable filtered URLs
```

### 02b. Detail (`/reports/[slug]`)

```
[Sticky top — minimal]
  Logo · Report breadcrumb · Sample read · Cite · Share · [Add to cart] (brand-red, sticky)

[Hero band — cinematic dark optional]
  Eyebrow: sector + sub-sector
  H1: report title (Noto Serif 48-56px, balance)
  Sub: 1-2 line abstract
  Meta: published 2026-04 · 82pp · 47 charts · 12 cited-by
  Authors: avatar group (3 visible · "+2 more" pop)
  CTAs: [Read full sample] (ghost) + [Add to cart $1,495] (brand-red)

[Body — 2-col, editorial light]
  Center (~720px):
    Executive summary (always free, full text — Stripe Press pattern · 4-6 paragraphs · drop cap)
    Table of contents (chapter list w/ section preview)
    Sample chapter (1 chapter free — chosen by editor)
    Methodology block (sample size · primary % · sources cited · QA process)
    Charts preview (5 charts w/ Statista flywheel — embed code · cite this · download CSV)
    Cited in (other reports + media — backlink wedge play per strategy)
    Author bios

  Right rail (sticky):
    Price + add-to-cart (sticky scroll)
    "Includes" checklist (PDF · CSV data · embed-quality charts · 30-day Q&A · author intro call)
    Citations counter ("Cited in 12 reports · 47 academic papers · 134 media mentions")
    Cite this report (APA/Harvard/Chicago/BibTeX — same UX as Viewer cite-block, surface 03)
    Related reports (3 cards · same sector OR same author)

[Sample reader band — full-width editorial]
  Sample chapter rendered using surface 03 (Report Viewer) patterns at 100% fidelity
  Floating "Buy full report" CTA appears after 30s reading or 60% scroll

[FAQ band — editorial light]
  6-10 Q&As · accordion · brand-red active-state border-left
  Common: refund policy · update cadence · custom research · enterprise license · data API · academic discount
```

### 02c. Cart + Checkout

```
[Cart drawer — slides from right]
  Line items · qty · price · subtotal · [Continue browsing] [Checkout]

[Checkout — Stripe-embed iframe NOT custom]
  3 steps: email · payment · confirm
  No phone number · no company-size dropdown · no "tell us about your project" qualifier
  Anti-pattern: anything more = friction. Stripe handles it. Ken just lists.

[Confirmation page]
  Receipt + download links + "you'll get an email" + [Read your report now] CTA
```

---

## Type system

| Element | Size | Font | Notes |
|---|---|---|---|
| Hero h1 | 48-56px desktop · 39px mobile | Noto Serif 700 | balance |
| Section h2 | 39px | Noto Serif 600 | |
| Card title | 19-21px | Noto Serif 500 | line-clamp 2 lines |
| Body | 16px (90%) | DM Sans 400 | line-height 1.5-1.6 |
| Card abstract | 14-15px | DM Sans 400 | line-clamp 3 lines |
| Card meta | 12.8px | DM Sans 400 | tabular-nums for "82pp · cited 12×" |
| Price | 21-24px | DM Sans 700 | tabular-nums (`$1,495` aligns column-wise across cards) |
| Filter label | 14px | DM Sans 500 | sidebar |
| Filter count | 12.8px | DM Sans 400 · `--color-text-muted` | "(47)" style |

---

## Card chrome (RS canonical 1:1 — verbatim mirror per LEARNING 2026-05-06)

**ReportCard structure:**
```
[Cover thumbnail · 4:3 ratio · object-cover]
  + Featured badge (top-left) — glassmorphism 65% bg + 12px blur (image-overlay-badge atom)
  + Latest badge (top-right) — same glassmorphism

[Body padding `--space-card-md`]
  Eyebrow: sector tag (small caps · `--color-brand-red` 5% accent)
  Title: Noto Serif 19-21px · line-clamp 2
  Abstract: DM Sans 14-15px · line-clamp 3 · `--color-text-muted`

[Footer row · justify-between]
  Meta cluster: "2026-04 · 82pp · cited 12×" · tabular-nums · `--color-text-subtle`
  Action cluster: [Quick view] (ghost) + [Add to cart $1,495] (brand-red)
```

**Hover state:** y: -2px · border `--color-brand-red` · 200ms.

**Anti-pattern:** never use `IMAGE_BADGE_OVERRIDES` ad-hoc per page (Cat 13.6 — re-implementing canonical atom). Always use `<ImageOverlayBadge>` from DS w/ theme prop (`brand` · `neutral` · `success` · `warm`).

---

## Filter sidebar (RS IndustrySidebar canonical)

7 dimensions, all from `design-system/catalogs/ken-research.ts`:

| Dimension | Source | UI |
|---|---|---|
| Report Type | catalog `REPORT_TYPES` | radio (single-select) |
| Industry | catalog `INDUSTRIES` (14) | checkbox accordion |
| Tags | catalog `TRENDING_TAGS` (10) | chip multi-select |
| Region | catalog `REGIONS` (6) | checkbox |
| Country | catalog `COUNTRIES_BY_REGION` (23) | dependent dropdown (filtered by Region selection) |
| Set Size | catalog `COMPETITOR_SET_SIZES` | range slider |
| Methodology | catalog `METHODOLOGY_LABELS` | checkbox |
| Year | derived from data | range slider 2018-2026 |

**Active filters → chip strip top of grid (RS Zone B clone) · color-coded per dimension · click chip = remove.**

**URL-state migration:** all filter state syncs via `useReportFilters` hook (465 LOC) → URL params → shareable filtered URLs. Per A2 audit §10 deferred to consumer port.

---

## Charts in detail page

Same rules as surface 03 (Report Viewer):
- Title + subtitle
- Source citation footer w/ date
- tabular-nums numeric labels
- 3 affordances visible w/o hover (Copy PNG · Download CSV · Cite this)
- Embed code 1-click (Statista flywheel)
- Dark-mode adaptive

**Sample band shows 5 charts.** Each = full DS Highcharts theme (preset per chart type — see `decisions/chart-picker.md`).

---

## Motion system

| Element | Library | Trigger | Pattern |
|---|---|---|---|
| Filter sidebar mobile slide-in | Framer | tap hamburger | x-slide 300ms · ease-out |
| Active filter chip fade-in | Framer `AnimatePresence` | filter applied | scale 0.9→1 · fade · 150ms |
| Card grid masonry layout | react-responsive-masonry | resize | smooth reflow · no jank |
| Card hover lift | Framer `whileHover` | hover | y: -2 · 200ms |
| Sample reader scroll-triggered "Buy" CTA | Framer `useScroll` + `useTransform` | 60% scroll OR 30s read | fade-up · `viewport={{ once: true }}` |
| Featured carousel auto-cycle | Framer | 6s interval · pause on hover | fade-cross-dissolve |
| Smooth page scroll | CSS `html { scroll-behavior: smooth }` | always | DS `core-v2/styles/base.css` · zero JS |

---

## Density rules

- **Card grid:** 3-col desktop · 2-col tablet · 1-col mobile · `--space-grid-gap` consistent
- **Sidebar width:** 224px desktop (RS canonical · NOT 280) · collapses below `lg` breakpoint
- **Section padding:** `--space-section-lg` between bands
- **Detail-page reading column:** 65-75ch line-length on body · 720px center column

---

## Anti-patterns (Report Store-specific)

1. **"Contact us for pricing"** — kills 80% of intent. Always show price. Ken Research isn't an enterprise-only sale. (Cat 13.3)
2. **PDF-only delivery on detail page** — Tier A signature. Web-rendered Viewer (surface 03) is the wedge. PDF = optional bonus, not the product.
3. **Form-gated samples** — sample chapter free, no email gate. Conversion delta = >40% per Stripe Press research.
4. **Auto-rotating featured carousel** — pauseable + 6s minimum. Auto-rotate <6s = Cat 13.4 (cognitive load violation).
5. **Filter sidebar w/ 15+ dimensions** — 7 is the max useful. Tracxn fail-pattern.
6. **Card grid w/ stock photos** — replace w/ real cover thumbnails generated from chart-still or executive-summary excerpt. Use `extract` impeccable subcommand to surface canonical thumbnails.
7. **Modal-trap newsletter on first visit** — disables back button · drives bounce. Footer signup only.
8. **CheckboxFilterSection w/o `key` ≠ `name` split** — when display label differs from filter value (e.g., "Methodology: Survey + Desk Research") use `{key, label, count}` shape per LEARNING 2026-05-06.

---

## DS components used

```ts
import {
  Button, CTALink, Card, Badge, SectionHeading, SectionLabel, SectionWrapper,
  ImageOverlayBadge,  // Featured/Latest glassmorphism
  ScrollProgress, ScrollToTop,
} from '@kenresearch/design-system/atoms';

import {
  StatCard, SearchBar,
  CheckboxFilterSection,  // 7-dimension sidebar (RS canonical)
  ReportCard,             // grid card (RS canonical)
  ReportListCard,         // list-mode (RS canonical)
} from '@kenresearch/design-system/molecules';

import {
  TopNavigation,
  IndustrySidebar,        // 675 LOC, deferred port from RS canonical (A2 audit §10)
  MobileFilterSheet,      // deferred port
  ExploreByRegion,        // deferred
  FeaturedResearch,       // hero carousel · 6s pause-on-hover
} from '@kenresearch/design-system/organisms';

import {
  CarouselFadeMask,       // Featured carousel edge fade
  SectionBg,
} from '@kenresearch/design-system/patterns';

import { useReportFilters } from '@kenresearch/design-system/hooks';  // URL-state migration
```

**Catalogs:**
```ts
import {
  INDUSTRIES, REGIONS, COUNTRIES_BY_REGION, COUNTRIES,
  TRENDING_TAGS, METHODOLOGY_LABELS, COMPETITOR_SET_SIZES, REPORT_TYPES,
} from '@kenresearch/design-system/catalogs/ken-research';
```

---

## Recipe pointer

Recipe at `design-system/recipes/report-store-listing.md`. Source-of-truth files header MUST cite:
- `projects/report-store-v07/src/.../IndustrySidebar.tsx` (canonical sidebar)
- `projects/report-store-v07/src/.../ReportCard.tsx` (canonical card)
- `projects/report-store-v07/src/.../useReportFilters.ts` (canonical URL-state)

When `/page report-store-listing` runs, use this surface file + recipe + source-mirror per LEARNING 2026-05-06 DS-sync hierarchy. Verbatim mirror first, extend after.

---

## Cross-surface citations

- Card chrome shared w/ surface 01 (Discovery featured-research band)
- Cite-block shared w/ surface 03 (Viewer)
- Sticky-CTA pattern shared w/ surface 04 (Dashboard top bar)
- Catalog (industries/regions/countries) shared w/ all 5 surfaces
