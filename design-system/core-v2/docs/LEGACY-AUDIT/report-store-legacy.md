# Report Store Legacy — DS Audit (13 dim)

**Summary:** Vite/React store w/ Ken Bold DS v4.2 in-place. Buttons (5 variants × 5 sizes · shimmer · ripple · animated arrow) + arrow system (CTALink/InlineLink/AnimatedArrow/hover-shift chevrons) + card variants (grid/list/compact/featured) + navbar (utility bar + main + dropdowns + mobile) + filters (sidebar + chip + checkbox + mobile sheet + sticky bar) = **CANONICAL for ALL button/arrow/card/listing patterns**. Token vocabulary fully aligned w/ core-v2 (`--text-*`, `--warm-*`, `--button-*`, `--rc-radius-card`).

---

## 1. Section Inventory

Page composed in `ReportStorePage.tsx` (`src/app/components/ReportStorePage.tsx:73`). Two view modes: `home` + `listing` toggled by `useReportFilters` hook.

| Section | File | Verdict | Why |
|---|---|---|---|
| Header (utility bar + main + dropdowns + mobile) | `Header.tsx:30` | KEEP CANONICAL | Richest navbar — utility strip (h-8 black) + sticky glass-header + Industries dropdown + cmd-K search + mobile hamburger |
| ReportStoreHero (search + globe + stats) | `ReportStoreHero.tsx:17` | KEEP | Search bar w/ category dropdown + popular searches + 3D globe |
| IndustrySidebar (sticky 256w) | `IndustrySidebar.tsx` | KEEP CANONICAL | Industry list + sub-category drill + tag/region/year accordions |
| FeaturedResearch · RecommendedForYou · IndustrySectorsGrid | home sections | KEEP | Cross-sell rails |
| ListingToolbar (back + count + view + sort + mobile filter) | `ListingToolbar.tsx:57` | KEEP CANONICAL | Listing controls |
| ListingContextBanner (active chips + clear) | `ListingContextBanner.tsx` | KEEP | Filter summary |
| CardListing (grid/list dispatch + stagger + skeleton + empty) | `CardListing.tsx:59` | KEEP CANONICAL | Domain-agnostic listing |
| IndustryReportSection · AnalystPicks · TrendingStatistics · DailyDataHighlights · QuickAccess · TrendingTopics · ExploreByRegion · Testimonials · UpcomingReports · CustomResearchCTA | home full-width | KEEP (rails) | Cross-sell |
| MobileFilterSheet + MobileFilterBar | sheet + sticky pill | KEEP CANONICAL | Mobile filter pattern |
| Footer (trust bar + 4-col + bottom) | `Footer.tsx:42` | KEEP CANONICAL | Dark footer w/ certifications + client logos |

---

## 2. Button Inventory — CANONICAL

**Single component:** `Button.tsx:36-315`. 4 variants × 5 sizes × 2 backgrounds = matrix.

**Variants:** `primary` (gradient #141016->#656565->#141016 shimmer) · `secondary` (white bg, brand-red on hover) · `ghost` (transparent + border) · `brand` (gradient #b01f24->#eb484e->#b01f24).

**Sizes (token-driven, `Button.tsx:104-133`):**
- `xs`: h-7 (28px) · min-w-56px · px-12px · font `--text-2xs` (12px) · icon 14px · gap-1
- `sm`: h `--button-height-sm` (40px) · px `--button-px-sm` (20px) · min-w `--button-min-width-sm` (80px) · font `--text-nav` (14px) · icon 16px · gap-1.5
- `md`: h `--button-height-md` (48px) · px `--button-px-md` (28px) · min-w 112px · font `--text-sm` (16px) · icon 18px · gap-2
- `lg`: h `--button-height-lg` (56px) · px `--button-px-lg` (36px) · min-w 144px · font 1.125rem · icon 20px · gap-2.5
- `xl`: h `--button-height-xl` (64px) · px `--button-px-xl` (40px) · font 1.25rem · icon 24px · gap-3

**Universal:** `borderRadius: var(--radius-element)` (5px) · tracking 0.0875px · `transition-all duration-300` · whitespace-nowrap · `w-full sm:w-auto` (responsive).

**States:**
- Default — variant gradient or border
- Hover — shimmer slides `-translate-x-1/2` over `shimmerDuration` (700ms default); primary boxShadow `0 4px 12px rgba(0,0,0,0.25)`; brand boxShadow `0 12px 32px rgba(176,31,36,0.25)`; secondary light -> color: brand-red + border: brand-red + boxShadow `0 4px 16px rgba(176,31,36,0.12)`
- Focus-visible — `ring-2 ring-black ring-offset-2` (Button.tsx:312)
- Active — secondary dark: `bg-white/[0.2]`; ghost dark: `bg-white/10`
- Disabled — `opacity-50` (primary/brand) · `cursor-not-allowed` · loading variant: `Loader2` spin (Button.tsx:267)
- Ripple — white/30 circle at click point, animates `ripple` keyframe 600ms (theme.css:681-690)

**Arrow integration:** `showArrow` prop -> embeds `<AnimatedArrow size={iconSize} color={getArrowColor()} isHovered={isHovering}/>` (Button.tsx:275-307). Color logic L64-72.

**Icon support:** `icon` ReactNode, `iconPosition='left'|'right'`, `iconOnly` (square sizing — w=h=button-height per size).

**Special use of `xs`:** ReportCard ListCard "View Report" -> `<Button variant="secondary" size="xs" showArrow>` (ReportCard.tsx:339); FeaturedCard -> `<Button variant="secondary" size="xs" background="dark" showArrow>` (ReportCard.tsx:537).

---

## 3. Arrow + Directional UX Inventory — CANONICAL

**`AnimatedArrow.tsx:13-61` — diagonal hover-shift atom.** Two stacked `<ArrowUpRight>` icons. Default state: arrow1 visible (translate(0,0)), arrow2 hidden (translate(-20px, 20px)). On hover: arrow1 exits (translate(20px, -20px) + opacity 0), arrow2 enters (translate(0,0) + opacity 1). Timing `300ms cubic-bezier(0.4, 0, 0.2, 1)` (configurable via `duration` prop). strokeWidth default 2.

**Used in:** Button (`showArrow`), CTALink, hero search submit button (`ReportStoreHero.tsx:305`).

**CTA arrow (button-internal):** AnimatedArrow inside Button — sized to match `iconSizeMap` (Button.tsx:59); colored by variant (white on primary/brand · dynamic on secondary · etc.).

**Link arrow (inline w/ text) — CTALink `CTALink.tsx:27-100`:** Tier 2 of link hierarchy. `<span>` text w/ underline transition + `<AnimatedArrow>`. Sizes sm (font `--text-xs`, arrow 14px, gap-1.5) · md (`--text-nav`, 16px, gap-2) · lg (`--text-sm`, 18px, gap-2.5). Light mode: text rgba(0,0,0,0.6) -> brand-red on hover; underline rgba(176,31,36,0.3). Dark mode: rgba(255,255,255,0.7) -> white. Duration 250ms.

**Animated hover-shift (horizontal translate-x):**
- `ListingToolbar.tsx:83` — `<ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />` (back button)
- `CategoryListItem.tsx:124-127` — `<ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"/>` (list-row reveal-on-hover)
- `TrendingTopics.tsx:46` — same pattern w/ trailing arrow
- `ReportCard.tsx:462` (compact variant) — `<ArrowRight className="h-4 w-4 text-black/30 group-hover:text-black transition-colors"/>` (always visible, color shift)

**External-link icon:** None explicit — `ArrowUpRight` is the universal "go" icon (lucide-react).

**Pagination prev/next:** No pagination component — infinite-scroll via `LoadMoreSentinel` molecule + `useProgressiveLoad` hook (Card grid stagger 50ms · max 8 items staggered).

**Breadcrumb chevron:** `ListingContextBanner.tsx:286` — `<ChevronRight className="h-3 w-3 opacity-40"/>` (industry -> sub-category breadcrumb).

**Scroll-down indicator:** None (hero has no scroll cue).

**Accordion expand chevron:** `FiltersPanel.tsx:88-90` — `ChevronDown` / `ChevronUp` swap (h-3.5 w-3.5, `iconColors.utility`); `IndustrySidebar.tsx:452-458` same.

**Dropdown chevron:**
- Header industries: `Header.tsx:108-111` — `<ChevronDown className="h-3 w-3 transition-transform" + rotate-180 when open>`
- Hero category: `ReportStoreHero.tsx:262-265` — same pattern (h-3.5 w-3.5)
- Sort select: `ListingToolbar.tsx:165` — absolute-positioned `ChevronDown h-3.5 w-3.5`

**Sort indicator:** Native `<select>` w/ overlaid chevron (`ListingToolbar.tsx:151-166`).

**Tokens:** stroke-width 2 default; sizes h-3 (12px, badges/utility), h-3.5 (14px, dropdown/sort), h-4 (16px, primary navigation arrows). Colors via `iconColors.utility` (rgba(0,0,0,0.4-0.5) on white surfaces).

---

## 4. Type Pairing Inventory

- **Heading + subtitle** (`SectionHeading.tsx:85-99`) — serif `clamp(1.375rem, 3vw, 1.875rem)` color rgba(0,0,0,0.88) + `--text-nav` (14px) rgba(0,0,0,0.4) · `mt-2` gap.
- **Eyebrow label + heading** — `--text-2xs` (12px) tracking-[0.15em] uppercase rgba(0,0,0,0.35) · `mb-2`.
- **Card title + meta** (`ReportCard.tsx:217-247`) — `--text-nav` (14px) leading-snug line-clamp-2 + `--text-2xs` (12px) rgba(0,0,0,0.4) · `mb-2.5`.
- **Industry badge + region/projection** (CardMetaRow molecule, variant A/B).
- **Logo block** (`Header.tsx:62-69`) — `--text-nav` "Ken Research" + 9px tracking-[0.12em] uppercase "Market Intelligence" rgba(0,0,0,0.4).
- **Filter title + count** (`FiltersPanel.tsx:86,141-146`) — `--text-xs` uppercase tracking-wide var(--black-600) + `--text-xs` tabular-nums rgba(0,0,0,0.4).
- **Footer heading + link** (`Footer.tsx:118-131`) — `--text-xs` tracking-[0.15em] uppercase white + `--text-nav` rgba(255,255,255,0.5).
- **Stats value + label** — hero stats display (large numeric + caption).

---

## 5. Type Scale + Weight + Tracking + Leading

`theme.css:13-24` — Major Third 1.25x scale (matches DS Quick_start_guide). Token names:
- `--text-2xs: 0.75rem` (12px)
- `--text-xs: 0.8rem` (12.8px)
- `--text-compact: 0.875rem`, `--text-nav: 0.875rem` (14px — most-used UI size)
- `--text-sm: 1rem` (16px base)
- `--text-base: 1.25rem` (20px)
- `--text-lg: 1.563rem` (25px)
- `--text-xl: 1.953rem` (31.25px)
- `--text-2xl: 2.441rem` (39px)
- `--text-3xl: 3.052rem`, `--text-4xl: 3.815rem`, `--text-5xl: 4.768rem`

**Weights:** `--font-weight-light: 300` · `--font-weight-normal: 400` · `--font-weight-medium: 500` · `--font-weight-heading: 600`.

**Tracking inline patterns:** `tracking-tight` (logo); `tracking-[0.0875px]` (buttons); `tracking-[0.12em]` (sub-logo); `tracking-[0.15em]` (footer/section labels); `tracking-wide` (filter titles); `tracking-[-0.01em]` (section headings).

**Leading:** mostly `leading-snug` (cards) · `leading-tight` (logo) · `leading-relaxed` (body) · `leading-[1.1]` (display).

**Fonts:** `--font-sans: 'DM Sans'` · `--font-serif: 'Noto Serif'` · `--font-mono: 'SF Mono'`. h1/h2 use heading weight 600 in @layer base; section heading override uses serif + light weight + tight leading + slight negative tracking (`SectionHeading.tsx:78-83`).

---

## 6. Color / Palette Usage

**Brand:** `--brand-red: #b01f24` · hover `#8f181d` · active `#771419`. Used ONLY on CTAs + active accents (active-nav underline, brand button bg, focus ring, hero submit, mobile filter count badge).

**Warm editorial palette:** `--warm-50..900` (#fefdfd -> #a6968e). `--warm-300` (#f5f2f1) = primary editorial bg. `--warm-500` (#eae5e3) = standard border. Heavy use in inputs, dividers, badge backgrounds, accordions.

**Black tints:** `--black-50..900` (#fafafa -> #171717). Used for: filter panel header bg (`--black-50`), filter category title text (`--black-600`).

**Semantic text:**
- `--text-primary: #000` · `--text-secondary: rgba(0,0,0,0.60)`
- Heavy use of rgba(0,0,0,X) opacity layering: 0.85 (titles), 0.6/0.7 (body), 0.5 (secondary), 0.4 (muted), 0.35 (placeholder), 0.06-0.08 (borders), 0.03 (hover bg).

**Dark surface text (footer/utility bar):** rgba(255,255,255,X) — 0.9 (titles), 0.5 (body), 0.4 (caption), 0.06-0.10 (borders).

**Status:** `--green-600: #059669` (positive projections w/ TrendingUp icon · ReportCard.tsx:453) · amber 50-900 · rose 50-900.

**Accent ramps:** purple-50..900 · periwinkle-50..900 · coral-50..900 (#fffbf9..#a23f2d) · perano-50..900 (light blue). Coral arcs in hero globe.

**Bg compositions:** `--bg-composition-warm-editorial: linear-gradient(180deg, #faf9f8 0%, #f5f2f1 40%, #faf9f8 100%)`. Glass-header: `rgba(255,255,255,0.82)` + `backdrop-filter: blur(12px) saturate(1.4)` (theme.css:707-711).

---

## 7. Spacing Inventory

**Tokens (`theme.css:64-78`):** `--space-1..24` (4-96px on 4px step). Responsive padding: `--padding-mobile: 16px` · tablet: 24px · desktop: 32px.

**Section vertical:** `--section-py-standard: 3.5rem` (56px); page-level main padding `py-10 lg:py-12` (40/48px) at `ReportStorePage.tsx:143`.

**Section header bottom margin:** `--section-header-mb: 2.5rem` (40px); SectionHeading uses `mb-10 md:mb-12` (40/48px) default · `mb-8 md:mb-10` compact (`SectionHeading.tsx:40`).

**Container widths:** `--container-page: 75rem` (1200px) · `--container-content: 62.5rem` · `--container-narrow: 56.25rem` · `--container-prose: 43.75rem` · `--container-compact: 37.5rem`.

**Card internal padding (ReportCard):**
- Grid variant: `p-4` (16px) on Zone 2 content (ReportCard.tsx:202)
- List variant: `py-2.5 px-3 sm:px-4` (10/12-16) on content col (ReportCard.tsx:290)
- Compact: `p-4` (ReportCard.tsx:392)
- Featured: `p-7` (28px) (ReportCard.tsx:487)

**Listing gap:** grid `gap-6` (24px); list `flex-col gap-3` (12px) (CardListing.tsx:72-73).

**Filter chip gap:** `gap-1.5` (6px); inter-row `space-y-0.5` (FiltersPanel.tsx:109).

**Navbar height:** main bar `h-[56px]` (Header.tsx:56); utility bar `h-8` (32px).

**Footer padding:** trust bar `py-6`; main `py-12`; bottom bar `py-4` (Footer.tsx:47/70/180).

**Search bar internal:** `px-5 py-3.5` (20/14px) on hero search; sidebar search `pl-7 pr-3 py-1.5` (FiltersPanel.tsx:102).

**ResourceCard tokens:** `--rc-content-px: 1rem` · `--rc-content-pt: 1rem` · `--rc-content-pb: 1.25rem` · `--rc-image-mb: 1rem` · `--rc-meta-mb: 0.75rem` · `--rc-title-mb: 0.5rem` · `--rc-aspect-ratio: 4/3`.

---

## 8. Composition Recipes

**Listing card grid:** `<CardListing items renderCard={r => <ReportCard variant="grid" report={r}/>} viewMode keyExtractor crossfadeStyle isLoadingMore skeletonCount emptyMessage onEmptyAction>` — wraps each in `<CardReveal delay={idx<8 ? idx*50 : 0}>`; grid `sm:grid-cols-2 xl:grid-cols-3 gap-6`; appends `<LoadMoreSentinel>`.

**Filter sidebar (desktop):** `<aside className="w-56 flex-shrink-0 hidden xl:block">` + `<div className="sticky top-20">` + `<Card>` w/ header strip + accordion `<CheckboxFilterSection>` x 4 + below: black bg "Request Custom Research" CTA (FiltersPanel.tsx:167-216).

**Search bar (hero):** `<div className="flex items-stretch bg-white" radius=rc-radius-card shadow=0 20px 60px rgba(0,0,0,0.3)>` + Search icon input + divider + category dropdown button + brand-red submit button w/ `<ArrowUpRight>` (ReportStoreHero.tsx:222-307).

**Navbar full:** `<>` utility bar (h-8 black) + `<header sticky top-0 glass-header h-[56px]>` w/ logo + nav links (active = bottom underline `bg-black rounded-full`) + Industries dropdown + cmd-K search button + Sign In + brand Demo button + mobile hamburger. Mobile menu: `border-top` + stacked links + Sign In + full-width brand Button.

**Footer:** dark `bg-black border-t border-white/10` + trust bar (`Shield`+`Award` icons + 5 client pills) + 5-col grid (Brand 2col + Industries + Services + Company) + bottom bar (copyright + Privacy/Terms InlineLinks + LinkedIn/Twitter svgs) — Footer.tsx:42-204.

**Related reports rail:** RecommendedForYou + AnalystPicks + FeaturedResearch — `<SectionHeading title action={{text:'View all', onClick}}>` + horizontal card row (uses `HorizontalScroll` molecule + ReportCard grid/compact variants).

**Breadcrumb (filter chips):** ListingContextBanner — pills w/ `<X>` close button + clear-all CTALink.

**Sort/Filter controls:** ListingToolbar — back arrow + count + view toggle + sort select + mobile filter trigger pill (ListingToolbar.tsx:73-169).

---

## 9. Layout Patterns

**Page-level:** `<Container maxWidth="page">` (75rem) wraps content. Listing area: `flex gap-0 lg:gap-10 py-10 lg:py-12` w/ sidebar (224px hidden below xl) + `flex-1 min-w-0` content (ReportStorePage.tsx:141-145). `scrollMarginTop: 72px` for sticky-header anchor.

**Sticky filters:** sidebar uses `<div className="sticky top-20">` (FiltersPanel.tsx:168). Header `sticky top-0 z-50`.

**Responsive collapse:** sidebar `hidden xl:block`; mobile gets `MobileFilterSheet` (full-screen Sheet) + `MobileFilterBar` (fixed bottom pill).

**Listing grid:** `grid sm:grid-cols-2 xl:grid-cols-3 gap-6` (3 cols only at >=xl); list mode `flex flex-col gap-3` (rows).

**Card aspect:** grid `aspect-[16/9]` image · list `w-16 sm:w-20` portrait image edge-to-edge · compact `w-12 aspect-[2/3]` thumbnail · featured full-bleed w/ overlay.

**Mobile filter bar:** `fixed bottom-0 left-0 right-0 z-40 lg:hidden` + `paddingBottom: max(1rem, env(safe-area-inset-bottom, 1rem))` (MobileFilterBar.tsx:21-23) — iOS-safe.

---

## 10. Token Gap Report

Comparing legacy `theme.css` vs `core-v2/src/styles/base.css`:

| Token | Legacy | core-v2 | Status |
|---|---|---|---|
| `--brand-red` `#b01f24` | yes | yes | OK |
| `--warm-50..900` | yes | yes (identical hex) | OK |
| `--black-50..900` | yes | yes | OK |
| `--red-50..900` | yes | yes | OK |
| `--button-height-sm/md/lg/xl` | rem-based | px-based (40/48/56/64) | OK values match |
| `--button-px-sm/md/lg/xl` | 1.25/1.75/2.25/2.5rem | 20/28/32/40px | WARN `lg` differs (legacy 36px vs core-v2 32px) |
| `--button-min-width-sm` | 80px | 96px | WARN differs |
| `--rc-radius-card` 10px | yes | yes | OK |
| `--radius-element` 5px | yes | yes | OK |
| `--text-2xs..5xl` (Major Third) | yes | yes | OK |
| `--text-nav: 14px` | yes | yes | OK |
| `--container-page: 75rem` | yes | yes | OK |
| `--space-1..24` | yes | yes + extras (`--space-5`, `--space-10`, `--space-3xl`+) | OK |
| `--green-600: #059669` | yes | yes (note: core-v2 flags 3.77:1 on white) | WARN contrast note |
| `--rc-radius-image` 2.5px | yes | likely yes | OK |
| `--rc-*` ResourceCard tokens (~30) | yes | partial | WARN verify port |
| `--badge-xs/sm/md/lg-*` size system | yes | likely partial | WARN verify port |
| `--bg-composition-warm-editorial` | yes | check | WARN |
| `--padding-mobile/tablet/desktop` | yes | check | WARN |
| `--coral/purple/periwinkle/perano-50..900` | yes | check (core-v2 has coral references) | WARN |
| `--label-on-black/white` | yes | verify | WARN |

**Hardcoded values to migrate to tokens:** `boxShadow: 0 1px 3px rgba(0,0,0,0.04)...` (Card.tsx:51-61) · gradient strings in Button (#141016, #656565, #eb484e literals at Button.tsx:159-166) · `9px` font sizes (logo sub-text, badge xs) — should be `--text-3xs` token.

---

## 11. Motion Patterns

**Hover:**
- Button shimmer slide — `transition-transform 700ms ease-out` translate-x 0 -> -1/2 (Button.tsx:201-232)
- Button ripple — `keyframe ripple 600ms ease-out` scale(0)->scale(4) opacity 0.4->0 (theme.css:681)
- AnimatedArrow — diagonal exit/enter 300ms `cubic-bezier(0.4, 0, 0.2, 1)` (AnimatedArrow.tsx:37)
- Card lift — `translateY(-2px)` + shadow intensify `0.4s cubic-bezier(0.16, 1, 0.3, 1)` (Card.tsx:108-122)
- Image zoom — `.img-zoom` scale(1.05) `500ms cubic-bezier(0.16, 1, 0.3, 1)` (theme.css:630-636)
- Hover-shift arrows — `group-hover:translate-x-0.5 transition-all` (CategoryListItem, TrendingTopics)
- Chevron rotate — `rotate-180 transition-transform` (dropdowns)
- ArrowLeft slide-out — `group-hover:-translate-x-0.5 transition-transform` (ListingToolbar back)

**Entrance:**
- `@keyframes fadeUp` — opacity 0->1 + translateY(10px->0) (theme.css:669)
- `CardReveal` molecule — intersection-observer-driven `.card-reveal.is-visible` opacity+translateY 0.45s cubic-bezier(0.16, 1, 0.3, 1) (theme.css:714-724)
- Card grid stagger — `idx * 50ms` up to 8 items (CardListing.tsx:20-21)
- Skeleton stagger — `i * 60ms`
- `FadeInSection` wraps home sections (delay 100/150ms variants)

**Scroll:** No GSAP/Lenis. Native CSS scroll. `useMountTransition` hook for banner enter/exit. `useCrossfade` for filter changes (opacity dip).

**Dropdown:** Plain show/hide on `onBlur` outside; no Framer.

**Modal/sheet:** MobileFilterSheet uses shadcn `<Sheet>` (Radix slide-in).

**Toast:** `sonner.tsx` UI component installed; no active toasts seen.

**Reduced motion:** `@media (prefers-reduced-motion: reduce)` overrides — img-zoom off (theme.css:637), card-reveal instant, skeleton-shimmer static, glass-header backdrop-filter disabled (`bg: rgba(255,255,255,0.96)`), badge-shimmer + badge-interactive transforms off. Button shimmer uses `motion-reduce:transition-none` Tailwind. Comprehensive.

---

## 12. A11y Patterns

**Focus-visible:** global `:focus-visible { outline: 2px solid var(--brand-red); outline-offset: 2px }` (theme.css:600-603). `:focus:not(:focus-visible) { outline: none }` for mouse clicks. Dark bg variant: `[data-dark] :focus-visible, .bg-black :focus-visible { outline-color: white }` (theme.css:611-614). Button has manual ring (Button.tsx:312).

**Keyboard:**
- CategoryListItem — `role="button" tabIndex={0}` + Enter/Space handler (CategoryListItem.tsx:71-76)
- FilterCheckbox — `role="checkbox" aria-checked tabIndex` + Enter/Space (FilterCheckbox.tsx:39-75)
- Dropdown blur trap — `onBlur(e) { if (!e.currentTarget.contains(e.relatedTarget)) close() }` pattern (Header.tsx:95-101)

**ARIA:**
- Button — `aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}` (Button.tsx:245)
- Hamburger — `aria-label`+`aria-expanded` (Header.tsx:151-152)
- MobileFilterBar — `aria-label={hasFilters ? "Open filters, N active" : "Open filters"}` (MobileFilterBar.tsx:38)
- CategoryListItem — composite `aria-label={meta ? label + ", " + meta : label}` (CategoryListItem.tsx:78)
- View toggle — separate `aria-label="List view"/"Grid view"` per button

**Landmarks:** `<header>` · `<main className="flex-1">` · `<aside>` (sidebar) · `<footer>` · `<article>` (cards) — semantic.

**Skip link:** None detected.

**Touch:** mobile hamburger `min-w-[44px] min-h-[44px]` (Header.tsx:149); FilterChip `min-h-[40px]` w/ note "44px touch target on mobile" (FilterChip.tsx:36); ListingToolbar back+mobile-filter `min-h-[44px] min-w-[44px]` (ListingToolbar.tsx:77,120); ViewToggle `w-9 h-9 sm:w-7 sm:h-7` (mobile 36 -> desktop 28).

---

## 13. Cards + Listing Patterns — CANONICAL

**Base Card atom** (`Card.tsx:90-147`): radius `--rc-radius-card` (10px) · shadow rest `0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)` · shadow hover `0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)` · border rest `1px solid rgba(0,0,0,0.06)` -> hover `0.10` · hover transform `translateY(-2px)` · transition `0.4s cubic-bezier(0.16, 1, 0.3, 1)`. Variants: `white` | `warm` (`--warm-200`) | `outlined`. Paddings: none|sm(16)|md(20)|lg(24). Shadow presets: none|sm|md(default)|lg.

**ReportCard variants (`ReportCard.tsx:163-583`):**

**GridCard** (L163):
- `<Card as="article" hover>` w/ `cursor-pointer flex flex-col`
- Zone 1: `aspect-[16/9]` image w/ `RevealImage img-zoom`, gradient overlay `from-black/40 via-transparent`, badge top-left (rounded xs, getImageBadgeStyle: `backdrop-blur(12px)` + brand/neutral/warm/success bg overrides at 45-65% opacity)
- Zone 2: `p-4 flex flex-col flex-1` — Eyebrow (`IndustryBadge`) mb-2.5 · Title (`text-black/85 leading-snug line-clamp-2 mb-2.5 group-hover:text-black`) at `--text-nav` · `CardMetaRow` (projection · region) · optional Date row w/ `Calendar h-3 w-3` at `--text-2xs` rgba(0,0,0,0.4)
- File:line ReportCard.tsx:175-252

**ListCard** (L257):
- `<Card as="article" hover flex>` — horizontal
- Col 1: `w-16 sm:w-20 flex-shrink-0 self-stretch` portrait image edge-to-edge
- Col 2: `flex-1 min-w-0 py-2.5 px-3 sm:px-4` — eyebrow mb-1.5 · title mb-1.5 · CardMetaRow
- Col 3 (desktop): `hidden sm:flex flex-col items-end pr-3 sm:pr-4` — date + `<Button variant="secondary" size="xs" showArrow>View Report</Button>`
- Mobile alt col: badge + date + size="xs" View button w/ text "View"
- File:line ReportCard.tsx:269-376

**CompactCard** (L382):
- `flex items-center gap-4 p-4 hover:bg-black/[0.03] cursor-pointer group`
- Rank badge `w-8 h-8` rounded `--radius-element`; rank<=3 `bg: var(--text-primary)` white text · else `bg: var(--warm-300)` rgba(0,0,0,0.5)
- Thumbnail `w-12 aspect-[2/3] border var(--warm-500)` rounded `--rc-radius-image`
- Trailing always-visible `<ArrowRight h-4 w-4 text-black/30 group-hover:text-black>`
- File:line ReportCard.tsx:391-465

**FeaturedCard** (L470):
- `<article relative overflow-hidden rounded-rc-radius-card cursor-pointer>`
- Full-bleed `ImageWithFallback img-zoom`
- Gradient `from-black/95 via-black/40 to-black/5`
- Top-left badges: brand "Featured" w/ `<Crown h-3 w-3>` + neutral hot/featured badges (dark mode + image-badge overrides)
- Top-right: `<MapPin>` + region rgba(255,255,255,0.6) at `--text-xs`
- Bottom: industry + success projection badges + serif `--text-base` title + `<Button variant="secondary" size="xs" background="dark" showArrow>Read Report</Button>`
- File:line ReportCard.tsx:475-549

**RecommendedForYou / FeaturedResearch / IndustryReportSection cards:** consume ReportCard via render-prop; horizontal rail layouts via `HorizontalScroll` molecule.

**Search-result card variant:** same ReportCard `grid|list` in listing mode.

**Category card:** `CategoryListCard` molecule (briefly seen in molecules/) — used for IndustrySectorsGrid (industry tiles w/ icon + count + hover arrow).

**Hover state universal:** card lift -2px + shadow intensify + border darken + (optional) image zoom + (optional) title color shift from rgba(0,0,0,0.85)->1.0 + arrow reveal/shift. Click target = entire card via `onClick` at Card level; nested buttons use `e.stopPropagation()`.

---

**End of report.**
