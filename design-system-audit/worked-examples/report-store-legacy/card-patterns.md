# Card Patterns — Every card variant used across the listing surface

> WWWWH per card variant. Citations `file:line` against `projects/report-store-legacy/src/app/components/` unless noted.

The Report Store ships **four ReportCard variants** under one dispatcher (`ReportCard.tsx:554-583`) plus several adjacent card molecules used elsewhere in the experience. The listing itself uses two of the four variants (grid / list) directly; the other two (compact / featured) live in home-mode sections but are catalogued here because the new DS should host all four under one anatomy.

---

## A. ReportCard — Grid variant

**What.** Vertical card: 16:9 cover image (with gradient overlay + top-left badge) → industry/subcat eyebrow → 2-line title → meta row (projection · region) → date footer line. `ReportCard.tsx:163-252` (`GridCard`).

**Why.** Grid is the **scan-mode** variant. Image gives instant industry visual recall; metadata is compressed to a 4-line content block. Optimised for sm:2col, xl:3col layouts on the listing.

**Where.** Default variant in `ReportCard`. Mounted by `App.tsx:188` with `variant={listingViewMode}` when user has grid view selected. Also reused by `FeaturedResearch.tsx`, `RecommendedForYou.tsx`, `IndustryReportSection.tsx` (home sections).

**When.** Whenever the listing viewMode is grid (default initial: list, but user can toggle). On home, used wherever a grid of cards appears.

**How.**
- Outer: `<Card as="article" hover>` from `Card.tsx` — provides shadow + radius + hover lift.
- Image zone: `aspect-[16/9]`, `<RevealImage>` for progressive load, gradient overlay `from-black/40 via-transparent to-transparent` to guarantee badge legibility. `:183-190`.
- Badge: top-left, theme-mapped (`Hot` / `Featured` → brand red, else neutral). Heavily-styled image badge with `backdrop-filter: blur(12px)` and inline `--badge-bg` overrides (`:114-153`). This badge style is reused across all variants.
- Content: `p-4` flex-col with mb-2.5 between rows. Title `--text-nav` (15-16px), `line-clamp-2`, hover-darkens from `text-black/85` → `text-black`.
- Meta row variant A: `<CardMetaRow projection={projection} region={region} variant="A">` — green TrendingUp + projection · MapPin + region. Variant B drops projection and shows region + date inline.
- Date below meta: small `--text-2xs`, `text-black/40`, Calendar icon. Only renders when `metaVariant === "A"` AND `showMeta`.
- ViewButton / save are intentionally omitted in this variant (caller passes `showSave={false}`, but ViewButton is hardcoded off here — design decision: the entire card is clickable).

Anatomy lock-down: industry eyebrow → title → meta → date footer. **This is the canonical Ken card anatomy** and the new DS must enforce it. See `pattern-lessons.md` Replicate #1.

---

## B. ReportCard — List variant

**What.** Horizontal card: 2:3 portrait thumbnail (left, edge-to-edge column) → content column (eyebrow / title / meta row) → right column (date + "View Report" button). `ReportCard.tsx:257-377` (`ListCard`).

**Why.** List is **compare-mode**. Same metadata visible without scrolling, dense vertical packing (5-6 cards per viewport vs. 6-9 grid). The portrait thumb (vs. landscape) is intentional — it suggests "report cover" / dossier metaphor, distinct from grid's hero-image-of-the-topic feel.

**Where.** Default for the listing (`App.tsx:39` — `useState<ViewMode>("list")`). Mounted by `App.tsx:188` when `listingViewMode === "list"`.

**When.** When user has list view selected. Initial default on first render.

**How.**
- 3 columns: image · content · meta+action. Image is `w-16 sm:w-20`, `self-stretch`, edge-to-edge. Content is `flex-1 min-w-0` with py-2.5 px-3 sm:px-4. Right column is `hidden sm:flex` (mobile drops it and inlines below).
- Image: same `<RevealImage>` + `img-zoom` hover.
- Eyebrow: text-only `<IndustryBadge>` (uppercase, --text-2xs, letter-spacing 0.06em). No region in eyebrow per DS anatomy (`:299` comment).
- Title: `--text-nav`, `line-clamp-2`, `leading-snug`. Same hover-darken.
- Right column desktop: date row top + "View Report" `Button variant="secondary" size="xs" showArrow` bottom. `:322-345`.
- Right column mobile (below sm): badge + date stacked above a small "View" button. Different visual hierarchy — the mobile-only inline-action pattern is **not used elsewhere** and is a candidate for normalisation in the new DS.
- `onClick` on the outer `<Card>` opens the report. The View button is wrapped with `e.stopPropagation()` to allow distinct handling, but in this implementation both call `onView` — so the wrapper is essentially dead code (`:338, :367`). Cleanup candidate.

---

## C. ReportCard — Compact variant

**What.** Single-row item: rank pill (1-3 black filled, 4+ warm-300 background) → 12×18 thumb → title + industry badge → desktop-only inline meta (region + projection) → trailing chevron. `ReportCard.tsx:382-465` (`CompactCard`).

**Why.** Used in **ranked rails** ("Top Downloads", "Most Read This Week") where space is tight and rank is the value. The numbered medal style for top-3 mimics Spotify top-50, Apple Books bestsellers — proven affordance for "this is curated, not arbitrary".

**Where.** Not in the listing. Used by `TopDownloads.tsx` (home section). Catalogued here because Competition-Benchmarking likely needs a "top vendors" / "highest score" ranked rail.

**When.** When the consumer passes `variant="compact"` AND `rank={1..n}` props.

**How.**
- Rank: 8×8 square (not pill — square is more "trophy" feel), top-3 fill `var(--text-primary)` + white text, else `var(--warm-300)` + black/50 text. `:397-409`. Tabular-nums for visual alignment.
- Thumb: 12×18 (2:3 portrait), `border` + `var(--rc-radius-image)`. Smaller than list variant.
- Content: `truncate` title (1 line — not 2), then industry badge below.
- Meta desktop: region + optional projection in single row, hidden below sm.
- Trailing chevron: `ArrowRight` text-black/30 → text-black on hover. Affordance "this navigates".
- Whole row is clickable; no separate CTA button (compact philosophy — minimal chrome).

---

## D. ReportCard — Featured variant

**What.** Full-bleed hero card: background image fills the entire card; absolutely-positioned overlay with top-left badges (`Crown` + Featured + status badge), top-right region, bottom content (industry + projection badges, title, "Read Report" CTA). `ReportCard.tsx:470-549` (`FeaturedCard`).

**Why.** Editorial spotlight — the one or two reports the team most wants surfaced. Image-led, dark-overlay, single big card. Visual hierarchy says "stop scrolling and look at this".

**Where.** Not in the listing. Used by `FeaturedResearch.tsx` (home section, single card or 1-up). Catalogued here because the industry-hero banner (`ListingContextBanner.tsx`) borrows visual DNA from this variant.

**When.** Caller passes `variant="featured"`. Typically rendered as a single large card spanning full content width.

**How.**
- Container: `<article>` (not `<Card>` — bypasses the DS Card wrapper to avoid double-radius), 10px radius, `overflow-hidden`.
- Background: `<ImageWithFallback>` absolutely positioned + `bg-gradient-to-t from-black/95 via-black/40 to-black/5` overlay for legibility.
- Top badges (left): Crown icon + "Featured" badge + status badge (e.g. "Hot"). Both use brand-red / neutral image-badge styling.
- Top right: region label, white/60, MapPin icon. No interaction.
- Bottom: industry pill + projection pill (TrendingUp success-green variant) → title (`text-white`, `font-sans`, `--text-base`, `leading-snug`, max-w-lg, 2-3 lines) → "Read Report" `Button variant="secondary" background="dark"`.
- No date, no pages, no tables/figures shown — featured trades metadata for editorial weight.
- `onClick` wraps the card; CTA stops propagation but routes to same handler.

---

## E. ReportGridCard — Alternate clean grid card (molecule)

**What.** Same anatomy as `ReportCard.GridCard` but **without** the image-badge overlay, the "view button", or the multi-variant dispatcher. `molecules/ReportGridCard.tsx:44-106`.

**Why.** This molecule is the **DS-spec reference shape** — the clean version the team built when isolating the canonical anatomy. `ReportCard.GridCard` is the production-y version that adds badges and showSave / showProjection toggles on top.

**Where.** Used by some home-section grids (`RecommendedForYou`, `IndustryReportSection`) where the consumer is the in-house team showing a curated rail vs. the full filtered list.

**When.** Wherever a grid of reports renders that doesn't need badges or toggleable zones.

**How.** Composes `<ImageWithFallback>` + `<IndustryBadge>` + `<CardMetaRow>` + `<CardFooterRow>`. Subtle bottom gradient on image for depth. Two meta variants (A: projection+region with date in footer; B: region+date combined). Cleaner code (~100 lines vs `ReportCard.tsx`'s 583) but **less feature-complete** — no badges, no save, no view button, no featured variant.

The fact that **two grid implementations exist** (`ReportCard.GridCard` and `ReportGridCard`) is a code smell. The new DS must consolidate to one `<ReportCard>` molecule with **opt-in slots** rather than two implementations diverging. See `pattern-lessons.md` Reject #2.

---

## F. StatCard — Stat / KPI card (molecule)

**What.** Vertical card: category badge (top-left) + icon (top-right) → big value (serif, light, 24-30px) → label → growth pill (TrendingUp + CAGR + metric label) → 2-line description → footer with "View Reports" CTA. `molecules/StatCard.tsx:27-119`.

**Why.** Surfaces a single market indicator: "Healthcare CAGR 6.8%, growing on aging-population tailwind". Used in "Trending Statistics" home rail. **High-relevance for benchmarking** because the competition-benchmarking surface will likely have stat-tile rails: market size, growth rate, vendor count, etc.

**Where.** Not in the listing. Used by `TrendingStatistics.tsx` (home section).

**When.** In rail layouts surfacing numeric insights tied to a category.

**How.**
- Outer `<Card hover padding="sm">`.
- Top row: small category Badge (`theme="coral"`) + 32×32 icon-tile (purple-tinted square).
- Value: `font-serif`, `font-weight-light`, `--text-xl`, tabular-nums, tracking-tight.
- Label: `--text-nav`, text-black/60, hover-darkens.
- Growth row: green-tinted inline pill `bg rgba(22,163,74,0.08)`, TrendingUp icon, growth value, tooltip-explained "CAGR" + metric text after.
- Description: line-clamp-2, --text-xs, leading-relaxed.
- Footer CTA: bordered-top divider + secondary button with arrow.

Anatomy is the canonical "stat card" shape Ken uses across multiple surfaces (Healthcare deep-dive, segment overviews). Strong replicate.

---

## G. DataHighlightCard — Insight tile (molecule)

**What.** Smaller, denser stat card: time + icon (top) → value (serif) → 2-line title → growth pill → source + arrow (footer). `molecules/DataHighlightCard.tsx:24-95`.

**Why.** "Daily Data Highlights" — bite-sized insights surfaced as time-stamped tiles ("2h ago: $4.2B mobile-payments market grew 18%"). Editorial chrome closer to a news ticker than a card grid.

**Where.** Not in the listing. Used by `DailyDataHighlights.tsx`.

**When.** Time-series of editor-curated insights.

**How.**
- Tighter than StatCard: `padding: 14px` custom (not the DS sm token), no category badge, growth pill smaller.
- Footer is **source attribution + arrow**, not a button — clicking the whole card navigates.
- Tooltip wraps the growth pill (hover-explains).
- `--text-base` value (smaller than StatCard's `--text-xl`).

Same DNA as StatCard; should be expressed as **one card molecule with size + density props** in the new DS rather than two molecules.

---

## H. CategoryListCard — Industry directory card (molecule)

**What.** Rich card representing an industry as a top-level destination: icon tile + name + report count + 2-3 sub-category preview links + "Browse →" CTA. (File: `molecules/CategoryListCard.tsx` — not deep-read here but referenced from `IndustrySectorsGrid.tsx`.)

**Why.** Home-page "browse by industry" pattern — the bridge between home and listing mode. Clicking pushes industry into `useReportFilters` and switches to listing mode (`App.tsx:129`).

**Where.** Home only. Catalogued because Competition-Benchmarking likely has an analogous "browse by category / dimension" home pattern.

**When.** On home-mode renders inside `IndustrySectorsGrid`.

**How.** Composes IconBadge + IndustryBadge + count + Button. (See `molecules/CategoryListCard.tsx` for full implementation.)

---

## I. AnalystPickCardB — Editorial pick variant (molecule)

**What.** Magazine-style card variant used in "Analyst Picks" home section. Likely combines portrait image + analyst attribution + editorial quote + linked report.

**Where.** Home only. Suffix "B" implies an "A" variant existed somewhere — code smell, candidate for cleanup.

**Why catalogued.** If Competition-Benchmarking surfaces analyst commentary on vendors (e.g. "Aura's pick: best entrant 2026"), the DNA is here.

---

## J. SkeletonCard — Loading placeholder

Already covered in `listing-anatomy.md` §8. Two variants (grid / list) mirror ReportCard's grid + list. Tokens: shimmer animation class + border `rgba(0,0,0,0.06)` + `var(--rc-radius-card)`.

---

## Card meta atoms — shared building blocks

These atoms/molecules are **shared across all cards** above:

### IndustryBadge — `molecules/IndustryBadge.tsx:14-27`
Text-only uppercase eyebrow. `--text-2xs`, `text-black/40`, `letter-spacing: 0.06em`. **No box, no fill** — DS decision to keep eyebrows airy and let titles dominate visual weight.

### CardMetaRow — `molecules/CardMetaRow.tsx:33-90`
Inline meta row with two variants:
- A (default): projection (green TrendingUp) · region (gray MapPin)
- B (compact): region · date (no projection)

Used by every report card variant. Tokens: `--text-2xs`, icon colours from `iconColors.ts` palette.

### CardFooterRow — `molecules/CardFooterRow.tsx`
Pages + date in a divider-topped footer. Used by clean `ReportGridCard` (variant A only).

### Badge — `Badge.tsx`
The atom used for top-left image badges, featured pills, projection pills. Themes: brand / neutral / warm / success / coral. Modes: light / dark. Image-context override CSS vars are stacked on top in `ReportCard.tsx:113-153`.

---

## WWWWH summary table

| Card | What (anatomy in 5 words) | Why (1-line purpose) | Where (file) | When (use trigger) | How (composition) |
|---|---|---|---|---|---|
| **ReportCard.Grid** | image · eyebrow · title · meta · date | Scan mode for grid listing | `ReportCard.tsx:163-252` | Listing grid view + home featured rails | `<Card>` + RevealImage + Badge + IndustryBadge + CardMetaRow |
| **ReportCard.List** | thumb · title · meta + right-col action | Compare mode for list listing | `ReportCard.tsx:257-377` | Listing list view (default) | `<Card>` + RevealImage + IndustryBadge + CardMetaRow + Button |
| **ReportCard.Compact** | rank · thumb · title · inline-meta · chevron | Ranked rail row | `ReportCard.tsx:382-465` | TopDownloads-style rails | rank pill + ImageWithFallback + IndustryBadge + inline meta |
| **ReportCard.Featured** | full-bleed image + overlay content | Editorial spotlight hero | `ReportCard.tsx:470-549` | FeaturedResearch single-card | absolute-positioned overlay + Badge stack + Button |
| **ReportGridCard** | clean DS-spec grid | DS reference / curated rails | `molecules/ReportGridCard.tsx` | Home curated rails (no badges) | ImageWithFallback + IndustryBadge + CardMetaRow + CardFooterRow |
| **StatCard** | category badge · value · growth · CTA | Market indicator tile | `molecules/StatCard.tsx` | Trending Statistics rail | Badge + icon tile + serif value + green growth pill + Button |
| **DataHighlightCard** | time · value · growth · source-arrow | Bite-sized insight tile | `molecules/DataHighlightCard.tsx` | Daily Data Highlights | smaller density StatCard sibling |
| **CategoryListCard** | icon · name · subcats · count · browse | Industry directory hero | `molecules/CategoryListCard.tsx` | IndustrySectorsGrid home | IconBadge + count + subcat links + Button |
| **AnalystPickCardB** | editorial pick magazine card | Analyst commentary | `molecules/AnalystPickCardB.tsx` | AnalystPicks home rail | (not deep-read) |
| **SkeletonCard** | shimmer placeholder | Loading state during load-more | `molecules/SkeletonCard.tsx:14-85` | Inside CardListing during isLoadingMore | shimmer divs in card-shape |

---

## What benchmarking listing inherits

For the Competition-Benchmarking new build, the card-pattern inheritance map is:

| Benchmarking need | Inherit |
|---|---|
| Vendor card grid (browse) | ReportCard.Grid anatomy (image → eyebrow [vendor category] → title [vendor name] → meta [score · region] → footer [last-updated]) |
| Vendor card list (compare) | ReportCard.List with right-col swapped: score pill + "Compare" button instead of date + "View Report" |
| Top-ranked vendors rail | ReportCard.Compact with rank pill, ideal for "Top 10 in segment" sections |
| Featured vendor spotlight | ReportCard.Featured for "Aura's Pick" or paid promotions |
| Benchmark stat tiles (e.g. category market size) | StatCard reused as-is |
| Benchmark daily insights ticker | DataHighlightCard reused as-is |
| Category browse home | CategoryListCard reused with "industry" → "benchmark category" relabel |
| Loading skeletons | SkeletonCard grid + list as-is |

**Net: 8 of the 10 card archetypes carry forward.** The two that don't (`AnalystPickCardB`, `CategoryListCard` analyst variant) are editorial-narrative cards specific to research-content domain; benchmarking has its own analogous patterns (e.g. "Aura's verdict card") that need fresh design.
