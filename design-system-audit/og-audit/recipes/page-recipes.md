# OG Page Recipes · Audit (WWWWH)

**Scope:** Canonical page-build recipes documented in OG `ai-context/LAYOUT.md` + cross-referenced against actual organism implementations in `src/app/components/`.

**Source path (READ-ONLY):** `Design_system_vs_26 (og and final)/`
**Methodology:** `design-system-audit/01_methodology.md` (WWWWH).
**Primary authority:** `ai-context/LAYOUT.md:167-200` (section sequences) and `ai-context/LAYOUT.md:226-310` (page assembly guide).

**Status of recipes found in OG:**
- Case-study recipe → **explicit · L167-180 LAYOUT.md**.
- Report-store home (PDP-style landing) → **explicit · L182-194**.
- Report-store listing (search/filter) → **explicit but compressed · L196-200**.
- Standalone landing recipe → **inferred** — OG has no separate landing template; case-study + report-store-home cover the patterns. Documented as "synthesized" below with honest gap note.

---

## Recipe 1 · Case Study

### WHAT
Editorial long-form page for a single client engagement. 10 sections, BLACK→WHITE→WARM alternation, hero + closing CTA bookends, scroll-aware navigation + reading progress + sticky CTA. Page shell uses raw `<main>` + organism stack (no template wrapper — case studies are hand-composed because section copy is bespoke).

### WHY
- Editorial format — case studies sell consulting credibility, not products. Long-form serves the storytelling.
- Section sequence mirrors a *consulting engagement narrative*: who (Client) → what (Challenges) → how (Objectives + Methodology) → outcome (Impact + Pillars + Testimonial) → next-step (Resources + Final CTA).
- BLACK→WHITE alternation breaks the read into chapters without floating dividers (see `composition-patterns.md` Pattern 2 · SectionBg).
- BLACK→BLACK bookends (Hero + Resources) frame the page like a publication — the reader knows where they entered and where they're closing.

### WHEN ✅
- Single client engagement story.
- Outcome-rich case where Impact section has 4+ metrics.
- Customer journey >800px of content (anything shorter = use a Card or one-pager).
- Cross-industry storytelling where the methodology is the differentiator.

### WHEN NOT ❌
- Multi-client showcase → use a *Listing* recipe (Report Store listing).
- Pure product page → use *Report Store Home* (PDP) recipe.
- Short testimonial-only page → use `<TestimonialSection>` standalone on a landing page.
- Internal sales decks → use slides, not web.

### Section sequence (canonical · LAYOUT.md:167-180)

| # | Organism | Background | Component file |
|---|---|---|---|
| 1 | HeroSection | BLACK | `HeroSection.tsx` |
| 2 | ClientContextSection | WHITE | `ClientContextSection.tsx` |
| 3 | ChallengesSection | WARM `#f5f2f1` | `ChallengesSection.tsx` |
| 4 | EngagementObjectivesSection | WHITE | `EngagementObjectivesSection.tsx` |
| 5 | MethodologySection | WARM | `MethodologySection.tsx` |
| 6 | ImpactSection | WHITE | `ImpactSection.tsx` |
| 7 | ValuePillarsSection | WHITE (border-t) | `ValuePillarsSection.tsx` |
| 8 | TestimonialSection | WHITE (border-t) | `TestimonialSection.tsx` |
| 9 | ResourcesSection | BLACK (DarkGradientMesh) | `ResourcesSection.tsx` |
| 10 | FinalCTASection | WHITE (border-t) | `FinalCTASection.tsx` |

**Page chrome (always present):** `<ReadingProgressBar />` · `<Navbar />` · `<ScrollToTop />` · `<StickyCTA />` · `<ContactModal />`.

### Bg alternation rules
- Sections 6-8 are 3 WHITEs in a row — separated by `border-t border-black/10` (see Pattern 5 BorderTopSeparator in `composition-patterns.md`).
- Section 9 is BLACK with gradient mesh, *not* flat black — anchors closing drama.
- Section 10 returns to WHITE with `border-t` — preserves the closing-cadence without competing with section 9's drama.

### Max-width + padding rules
- Page shell: `--container-page` (1200px / 75rem) via Navbar.
- Hero content: `--container-content` (1000px / 62.5rem) — see `HeroSection.tsx:16`.
- Testimonial / FinalCTA: `--container-narrow` (900px / 56.25rem) — focused closing.
- Body prose blocks inside sections: `--container-prose` (700px / 43.75rem) — `FinalCTASection.tsx:19` uses this.
- Section padding tokens: `py-12 sm:py-16 md:py-20` (48px / 64px / 80px) — mobile-first per `theme.css:91-94`.
- Horizontal padding: `px-4 sm:px-6 md:px-8` (16 / 24 / 32 px) — handled by `SectionWrapper`.

### WHEN to use which container width
| Container | Token | Section types |
|---|---|---|
| 1200px | `--container-page` | Outer shell, navbar, full-bleed heroes |
| 1000px | `--container-content` | Standard sections (Objectives, Impact, Methodology, Challenges) |
| 900px | `--container-narrow` | Testimonial, FinalCTA — focused closing |
| 700px | `--container-prose` | Body prose blocks inside any section |
| 600px | `--container-compact` | Description blurbs, tight methodology text |

### HOW (worked code from LAYOUT.md:236-254)
```tsx
import { Navbar } from '@/app/components/Navbar';
import { ReadingProgressBar } from '@/app/components/ReadingProgressBar';
import { ScrollToTop } from '@/app/components/ScrollToTop';
import { StickyCTA } from '@/app/components/StickyCTA';
import { ContactModal } from '@/app/components/ContactModal';
import { HeroSection } from '@/app/components/HeroSection';
// ... import remaining 9 organisms

export default function CaseStudyPage() {
  const [showContact, setShowContact] = useState(false);
  return (
    <>
      <ReadingProgressBar />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <ClientContextSection />
        <ChallengesSection />
        <EngagementObjectivesSection />
        <MethodologySection />
        <ImpactSection />
        <ValuePillarsSection />
        <TestimonialSection />
        <ResourcesSection />
        <FinalCTASection />
      </main>
      <ScrollToTop />
      <StickyCTA />
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
    </>
  );
}
```

### Reasons + Decisions
- Why hand-compose instead of declarative template? Case-study copy is bespoke per engagement — a `<CaseStudyTemplate hero={...} challenges={...} />` API would mostly be passthrough of one-of-a-kind strings. Hand-composing is honest. Compare to `ProductPageTemplate` (report-store), which has reusable section structures.
- Why anchor IDs on sections (`#challenges`, `#impact`)? Drive the in-page TOC in `Navbar.tsx:19-27`. Also drive `useActiveSection` for sticky CTA contextual text (`StickyCTA.tsx:11-47` swaps CTA text by active section).
- Why BLACK→WHITE entry rather than WHITE→BLACK? Editorial publication convention. Newspapers / magazines open with masthead-on-dark. Reading begins on light. Stripe, NYT, Atlantic, Linear case studies all do this.

---

## Recipe 2 · Report Store Home (PDP-style Landing)

### WHAT
Product-pillar landing page introducing the Report Store product. 10 sections, BLACK→WHITE→WARM alternation, but with a NEUTRAL50 (`#fafafa`) quick-access bar between hero and first content. Available in both *declarative* (`ProductPageTemplate`) and *manual* composition modes.

### WHY
- Product landing — surfaces breadth of the catalogue (Featured / Trending / Industries / Methodology) so a visitor can sample without committing to a search.
- NEUTRAL50 quick-access bar at L2 = utility shelf (search / filters / quick links) without leaving the hero's gravity.
- `ProductPageTemplate` declarative API is feasible because section *structure* (hero w/ search, featured carousel, stats row, browse grid, CTA banner) is consistent across product pillars — only the content varies. Compare case-study which is bespoke per engagement.

### WHEN ✅
- Pillar landing pages (Report Store home, future Surveys home).
- Pages where users need to *browse before searching*.
- Cross-cutting indicators / stats that justify the product.
- Methodology surfacing for credibility (Why-Ken section pattern).

### WHEN NOT ❌
- Single-product detail page → not enough variety, use a card grid.
- Search-results listing → use *Report Store Listing* recipe (Recipe 3).
- Pure marketing landing with one offer → use `<CTABanner>` standalone.

### Section sequence (canonical · LAYOUT.md:182-194)

| # | Organism | Background |
|---|---|---|
| 1 | ReportStoreHero | BLACK |
| 2 | QuickAccessBar | NEUTRAL50 `#fafafa` |
| 3 | FeaturedResearch | WHITE |
| 4 | KeyMarketIndicators | WARM |
| 5 | RecommendedForYou | WHITE |
| 6 | DailyDataHighlights | WHITE (border-t) |
| 7 | AnalystPicks | WARM |
| 8 | IndustrySectorsGrid | WHITE |
| 9 | ResearchMethodology | WARM |
| 10 | CustomResearchCTA | BLACK |

### Bg alternation rules
- L2 NEUTRAL50 sits between L1 BLACK and L3 WHITE — a stepped tonal descent (#000 → #fafafa → #fff). Acts as a "shelf" surface for quick-access utilities.
- L5 / L6 (RecommendedForYou + DailyDataHighlights) are both WHITE — border-t separator on L6.
- L10 returns to BLACK — closes the page like case-study, but as a CTA (CustomResearchCTA), not a resources mural.

### Max-width + padding rules
- Same container scale as case-study.
- ReportStoreHero uses `--container-page` (full width hero w/ search bar).
- FeaturedResearch / RecommendedForYou use `--container-content` (card grids).
- ResearchMethodology uses `--container-narrow` (focused 5-step flow).
- CustomResearchCTA uses `--container-narrow`.

### HOW (declarative · LAYOUT.md:259-272)
```tsx
import { ProductPageTemplate } from '@/app/components/organisms';
import { FEATURED_REPORTS, STAT_DATA, ALL_REPORTS } from '@/app/components/data';

<ProductPageTemplate
  hero={{ label: 'Report Store', title: 'Research Hub', ... }}
  featured={{ label: 'Featured', title: 'Editor Picks', children: ... }}
  stats={{ label: 'Indicators', title: 'Key Metrics', stats: STAT_DATA }}
  browse={{ label: 'Browse', title: 'All Reports', items: ALL_REPORTS, renderCard: ... }}
  cta={{ label: 'Custom', title: 'Need Custom Research?', primaryText: 'Contact Us' }}
  afterStats={<DailyDataHighlights />}
  afterBrowse={<AnalystPicks />}
/>
```

### HOW (manual · LAYOUT.md:274-294)
```tsx
import {
  ReportStoreHero, QuickAccessBar, FeaturedResearch,
  KeyMarketIndicators, RecommendedForYou, DailyDataHighlights,
  AnalystPicks, IndustrySectorsGrid, ResearchMethodology,
  CustomResearchCTA,
} from '@/app/components/organisms';

<ReportStoreHero />
<QuickAccessBar />
<FeaturedResearch />
<KeyMarketIndicators />
<RecommendedForYou />
<DailyDataHighlights />
<AnalystPicks />
<IndustrySectorsGrid />
<ResearchMethodology />
<CustomResearchCTA />
```

### Reasons + Decisions
- Why ProductPageTemplate accepts `afterStats` and `afterBrowse` injection slots? L6 DailyDataHighlights and L7 AnalystPicks are *cross-section* — they don't fit the hero/featured/stats/browse/cta template but they're regular Report-Store-Home sections. Injection slots preserve declarative composition while allowing bespoke content.
- Why NEUTRAL50 not WARM at L2? WARM is reserved for "highlighted editorial content" semantically. The quick-access bar is utility chrome — needed a third light tone. NEUTRAL50 is intentionally narrow-purpose (`theme.css` and COLORS.md both treat it as a Report-Store-only token).
- Why BLACK closing? CustomResearchCTA is the conversion moment — drama against white sea.

---

## Recipe 3 · Report Store Listing (Filter + Card Grid)

### WHAT
Search/filter results page for the Report Store. Sidebar-layout: industry-focus banner header → toolbar (sort, search, view-toggle) → filters panel (left) + card listing (right). Two-column layout on desktop, drawer-based filters on mobile.

### WHY
- Listing pages need different rhythm than landing — *content density* over storytelling. Most visitors are sales-side researchers comparing 50+ reports.
- Sidebar filters keep facets discoverable without occupying scroll real estate.
- Toolbar persists at top of listing pane so sort/view-toggle is always reachable.

### WHEN ✅
- Filtered catalogue browse (Reports by industry, region, date).
- Search results from query.
- Industry-scoped landing (top of page shows industry context, body shows reports).

### WHEN NOT ❌
- Single industry highlight → use IndustrySpotlight organism on a landing recipe.
- Featured carousel only → use FeaturedCarousel inline on a landing.
- Discovery-mode browse → use Recipe 2 (Report Store Home) with category cards.

### Section sequence (canonical · LAYOUT.md:196-200)

| # | Organism | Notes |
|---|---|---|
| 1 | IndustryFocusBanner | Industry context header (if industry-scoped) |
| 2 | ListingToolbar | Sort dropdown, search input, ViewToggle |
| 3 | FiltersPanel (sidebar L) + CardListing (main R) | Two-column layout (sidebar 280-320px) |

### Bg alternation rules
- Single bg surface — WHITE throughout. No alternation. The *density* is the rhythm, not bg flips.
- Sidebar may have NEUTRAL50 or WARM background to differentiate from main listing pane (`--warm-200 #f9f7f6` is the standard "soft card background" per `theme.css:307`).

### Max-width + padding rules
- Page shell: `--container-page` (1200px).
- Sidebar: fixed `w-72` (288px) on `lg`, full-width drawer (`MobileFilterSheet`) on `< md`.
- Card listing pane: remainder of `--container-page` minus sidebar.
- Mobile: filters collapse to `MobileFilterSheet` full-screen overlay (see `molecules/MobileFilterSheet.tsx`).
- Standard section vertical padding: `py-8 sm:py-10 md:py-12` (slightly tighter than landings — listing is a working surface, not a reading surface).

### HOW
```tsx
<>
  <Navbar />
  <main>
    <IndustryFocusBanner industry="Healthcare" /> {/* optional */}
    <ListingToolbar />
    <div className="max-w-[var(--container-page)] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 px-4 sm:px-6 md:px-8">
      <aside className="hidden lg:block">
        <FiltersPanel />
      </aside>
      <section>
        <CardListing
          items={reports}
          loading={loading}
          emptyState={<EmptyState />}
        />
      </section>
    </div>
    {/* Mobile filters */}
    <MobileFilterSheet open={mobileFiltersOpen} onClose={...} />
  </main>
</>
```

### Reasons + Decisions
- Why sidebar-L instead of sidebar-R? Reading direction (LTR) — users scan filters first, then results. Right-sidebar makes the user backtrack visually.
- Why 280-288px sidebar? Long enough for filter labels (~22ch) + counts; short enough that 4-card-wide listing grid still fits at 1200px page-container.
- Why no DarkGradientMesh on listings? Listings are working surfaces — drama is distraction. Reserved for editorial/landing closes.
- Why ListingToolbar sticky? Allows sort/view-toggle access while scrolling deep into the result set. Implementation: `sticky top-[60px]` (matches Navbar height).

---

## Recipe 4 · Standalone Landing (synthesized · OG gap)

### WHAT
Marketing landing page introducing a single offer. **No explicit OG recipe exists for this** — OG's two landing-style recipes are Case-Study and Report-Store-Home. A pure "landing page" (e.g., webinar signup, gated report) is synthesized below from existing organisms.

### WHY
- Sometimes a single conversion goal doesn't need 10 sections — needs 3-5 punchy ones.
- The shape mirrors case-study but compressed: hero + single value section + social proof + final CTA.
- Reuses existing organisms — no new components needed.

### WHEN ✅ (audit synthesis · not OG-documented)
- Single-offer landing (Schedule a call, Download the report).
- Email-funnel landing pages.
- Event/webinar registration.
- Gated content download.

### WHEN NOT ❌
- Case-study narrative → use Recipe 1.
- Product showcase → use Recipe 2 (Report Store Home).
- Search/browse → use Recipe 3 (Listing).

### Section sequence (synthesized · 4-5 sections)

| # | Organism | Background | Source |
|---|---|---|---|
| 1 | HeroSection or ProductHero | BLACK | reuse |
| 2 | ChallengesSection or ValuePillarsSection | WARM | reuse |
| 3 | TestimonialSection | WHITE (border-t) | reuse |
| 4 | FinalCTASection | WHITE (border-t) | reuse |

**Optional L1.5:** ClientContextSection if there's a featured customer context to lead with.
**Optional L2.5:** ImpactSection if outcome-metrics drive conversion.

### Bg alternation rules
- BLACK→WARM→WHITE→WHITE — same alternation logic as case-study, just shorter.
- Border-t separator between back-to-back WHITEs.

### Max-width + padding rules
- Use `--container-narrow` (900px) throughout — single-offer pages benefit from focus.
- Standard padding scales.

### HOW (synthesized · audit-generated, no OG file exists)
```tsx
<>
  <Navbar />
  <main>
    <HeroSection />
    <ChallengesSection />          {/* OR ValuePillarsSection */}
    <TestimonialSection />          {/* social proof */}
    <FinalCTASection />             {/* conversion */}
  </main>
  <StickyCTA />
</>
```

### Reasons + Decisions · gap honestly noted
- **OG does not document this recipe.** This entry is *audit-synthesized* from the existing organism palette. Recommendation for the new DS: codify this as Recipe 4 explicitly in `LAYOUT.md`.
- Why not propose a brand-new `<LandingTemplate>`? Because the organisms already compose cleanly. New template adds maintenance without new capability. Compare `ProductPageTemplate` which justifies itself by handling cross-pillar variance.
- Why drop ResourcesSection? Landing pages don't have a research catalogue to surface. If they do, they're effectively case studies — use Recipe 1.

---

## Cross-recipe rules (all 4)

### Page chrome rule
Every recipe except Listing (Recipe 3) ships with:
- `<ReadingProgressBar />` (top, fixed)
- `<Navbar />` (top, sticky with hide-on-scroll)
- `<ScrollToTop />` (bottom-right, appears after 600px scroll)
- `<StickyCTA />` (bottom-right, contextual by active section)
- `<ContactModal />` (mounted in body, conditionally rendered)

Listings drop `StickyCTA` (filtering is the goal, not conversion mid-scroll) and drop `ReadingProgressBar` (no narrative progression to track).

### Section spacing rule
All recipes use the same vertical rhythm:
- Mobile (`< 640`): `py-12` (48px)
- Tablet (`640-1023`): `sm:py-16` (64px)
- Desktop (`≥ 1024`): `md:py-20` (80px)

Encoded in `theme.css:91-94`:
```css
--section-py-mobile: 3rem;     /* 48px */
--section-py-tablet: 4rem;     /* 64px */
--section-py-desktop: 5rem;    /* 80px */
```

### Container width selection rule
Use the *narrowest* container that fits the content. Default to `--container-content` (1000px). Step down to `--container-narrow` (900px) for focused content (CTAs, testimonials). Step down to `--container-prose` (700px) for paragraph blocks. Only use `--container-page` (1200px) for full-bleed heroes / navbars / page-shell.

### Border-radius rule (LAYOUT.md:348-354)
| Element | Radius | Token |
|---|---|---|
| Images | 2.5px | `--radius-image` |
| Buttons, small cards, badges | 5px | `--radius-button` |
| Large cards, modals | 10px | `--radius-card` |

### Anti-patterns ❌ (cross-recipe)
- Don't hardcode `max-w-[1200px]` — use `max-w-[var(--container-page)]` (LAYOUT.md:67).
- Don't add `px-4 sm:px-6 md:px-8` inside SectionWrapper children — already handled (LAYOUT.md:130 CRITICAL note).
- Don't double-wrap with nested SectionWrapper (double padding bug).
- Don't deviate from BLACK at case-study hero (anchors editorial entry).
- Don't deviate from BLACK at case-study resources (anchors editorial close).

---

**Audit complete · 3 explicit recipes (case-study, report-store-home, listing) + 1 synthesized recipe (landing) documented. Landing recipe formalization recommended for new DS.**
