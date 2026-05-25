# Page Anatomy · V0_lite_report-legacy

> Section-by-section walkthrough of the page rendered at `http://localhost:3020/`. Per section: WWWWH, DS atoms used, composition, what is special. Page order is locked in `src/app/App.tsx:34-72`.

Page flow per `App.tsx:8`: *Hero → SampleReportPreview → Slideshow → ReportHighlights → FAQ → CTASection*. Plus persistent: `<ScrollProgress/>` (top), `<NewHeader/>` (top, sticky), `<ScrollToTop/>` (bottom-right FAB), `<AnalyticsDashboard/>` (hidden, Ctrl+Shift+A).

---

## 0. Persistent shell

### ScrollProgress (top bar)
- **What:** Brand-red horizontal bar tracking scroll depth, 0–100% width.
- **Where:** Top of viewport, full-width, fixed.
- **Why brand red:** `App.tsx:9-12` — *"brand red is appropriate here — it's a persistent visual indicator drawing attention to engagement depth, effectively serving as a soft conversion signal."* Engagement = conversion proxy.
- **DS atom:** `src/design-system/components/ScrollProgress.tsx`.

### ScrollToTop (FAB)
- **What:** Round black icon button, bottom-right, appears after scroll.
- **Why black not brand red:** `App.tsx:13-14` — *"Black utility FAB (92% foundation tier — NOT purple/red, because it's a navigation aid, not a CTA or decorative accent)."* Strict 92% classification.

### NewHeader (`NewHeader.tsx:46-80`)
- **What:** Two-tier header — secondary utility bar (40px, `bg-[var(--black-50)]`, links: Procurement, Expert Panel, Company dropdown) then primary nav with 5 dropdowns (Industries, Consulting, Survey, Insights, Reports).
- **Skip link:** `NewHeader.tsx:49-54` — `sr-only focus:not-sr-only` pattern, the only a11y compliance gesture visible at top of file.

---

## 1. HeroSection (`HeroSection.tsx`)

### WWWWH
- **What:** Two-column hero on desktop — left: breadcrumb + label + serif H1 + body + 2 CTAs + 3 animated stat cards; right: floating "preview card" mocking a chapter excerpt with paywall.
- **Where:** First in `<main>`, container `max-w-[1200px]`, min-height `50vh / 60vh / auto` per breakpoint (`:181`).
- **Why two-column:** Show the product (preview card on right) **adjacent** to the pitch (left), not below. Eliminates a scroll requirement for the proof-of-deliverable.
- **Why 4 hero theme variants:** `heroThemes.ts:49` defines `darkPremium / light / warmEditorial / darkEmber`. Only `light` + `darkEmber` are wired through the `FloatingVariantSwitcher` (`HeroSection.tsx:184-187`). The other two are *configured-but-hidden* — a deliberate A/B-test scaffold.

### DS atoms used
- `Button` (variants: `brand`, `secondary`, `ghost` — see secondary-button-issue.md)
- `Badge` (variant `pill`, theme-driven via `heroThemes[variant].badgeTheme`)
- `SectionLabel` (text style w/ `pulse` dot for "New Report Available")
- `Breadcrumb` w/ `healthcareBreadcrumbData`
- `FloatingVariantSwitcher` (utility for theme cycling, dev-affordance)
- Inline atoms: `useAnimatedCounter` hook (`:14-43`), `StatCard` component (`:46-119`), `ChartBar` component (`:122-170`)

### Composition
- **Background layering:** `heroThemes[selectedVariant].glows` is an array of up to 5 absolutely-positioned blurred orbs, each conditionally `motion.div` (if `animation` defined) or static `div`. Decision logic at `:200-216`. Makes themes reusable across surfaces.
- **CTAs:** Three separate JSX blocks for mobile / tablet / desktop sizes (`:285-345`). On desktop dark variants, the secondary CTA flips to `variant="ghost"` (`:337`) — this is the "smart fix" that papers over the secondary-on-dark visual weakness.
- **Stats:** `StatCard` (`:46-119`) — IntersectionObserver-triggered count-up using `useAnimatedCounter` w/ `easeOutCubic` (`:30`). Hover state lifts y by 4px and scales 1.05.
- **Preview card:** `:382-577`. Glass-morphism (`backdrop-blur-sm` + `bg-white/80`), 10px border radius, theme-driven decorative blurs (`cardDecorBlur1/2`). Click expands to full modal (`:616-727`) with chart, stats, and paywall-locked content blurred underneath an "Unlock Full Report" brand CTA.

### What's special
- The **animated counter** is genuinely impressive — 2-second `easeOutCubic` (`:25-31`), pausing until `useInView` fires with `amount: 0.5`. The format function (`:70-77`) handles `$45.2B`, `32.5%`, `50+` differently. No external library.
- The **chart bars** (`:122-170`) animate from `height: 0` to full on mount, then hover scales the bar by +10% with a tooltip pop. Pure Framer Motion + state.
- The **scroll-down indicator** (`:582-612`) — a "mouse" SVG built from two `motion.div`s with looping y-translate. Looks expensive, costs ~20 lines of code.

---

## 2. SampleReportPreview — Chapters with Side TOC (`SampleReportPreview.tsx`)

### WWWWH
- **What:** A two-pane mini-app: persistent sidebar TOC on the left, four chapter sections on the right (Executive Summary → Market Overview paywall → Extended TOC → Methodology).
- **Where:** Section 2 of the page, edge-to-edge layout (overrides `SectionWrapper` padding with `!px-0 !py-0`).
- **Who orchestrates:** `SampleReportPreview.tsx:37-128` — pure layout + scroll-tracking; chapter content lives in `sample-report/Chapter*.tsx` files (Tier-4 decomposition per `:6-14`).
- **Why edge-to-edge:** `:18-22` — *"SectionWrapper uses `!py-0` override so the sidebar's vertical border-r runs full edge-to-edge (no padding gap at top/bottom). Main content compensates with internal py-10 sm:py-12 md:py-16."*
- **How active chapter is tracked:** `IntersectionObserver` w/ `rootMargin: '-20% 0px -60% 0px'` (`:43-67`) — the active chapter is whichever section occupies the band 20–40% from the top of the viewport. Clicks bypass this with an `isScrollingRef` guard (`:70-79`) to avoid jitter during programmatic scrolls.

### Sub-sections

#### 2a. ChapterExecutiveSummary
- **DS atoms:** `SectionLabel` (variant `accent`), inline `StatCard` w/ `iconColors.content`.
- **Composition:** Eyebrow `CHAPTER 1 - EXECUTIVE SUMMARY` → serif `font-light` H1 (39px → 48.8px) → body w/ "See more" expand button (truncates to `line-clamp-2`) → 3 stat cards.
- **What's special:** The "See more / See less" is a *button*, not a link or accordion. Comment-implied reason: it's not navigating, just expanding inline content. Icon container at `bg-content-icon/10` keeps purple at 10% opacity (`ChapterExecutiveSummary.tsx:70`).

#### 2b. ChapterMarketOverview — the **paywall**
- **DS atoms:** `SectionLabel` accent, `Button` variant brand, `LockKey` from Phosphor.
- **Composition:** 3 paragraphs with **progressive opacity** (`opacity-100 / 60 / 30` at `ChapterMarketOverview.tsx:35,43,51`) creating a faded-text effect, then an absolutely-positioned gradient overlay `from-white via-white/95 to-transparent` (`:62`) blending the bottom into white with a paywall stack on top (lock icon → caption → brand CTA).
- **Why this paywall is good:** The text *fades into the paywall* — the user gets a literal demonstration that "more is hidden behind this." Stronger than a hard cut.

#### 2c. ChapterExtendedTOC
- **WWWWH:** A 2-phase / 3-phase variant TOC w/ search input, filter pills (scroll-snapping w/ flanking arrow buttons + fade edges), expandable phase cards.
- **What's special:** The **variant switcher** (`ChapterExtendedTOC.tsx:111-120`) toggles the *content structure* (different phases, different filter pills, different footer summary). This is a content-architecture experiment baked into the UI — the user can preview how Ken structures their reports differently for different audience asks.

#### 2d. ChapterMethodology
- **DS atoms:** `SectionLabel` accent, `iconColors.content` for step icons, custom button-styled tab stepper.
- **Composition:** Horizontal stepper tabs (active → `bg-black text-white`, inactive → `bg-white border-[var(--warm-500)]` — `ChapterMethodology.tsx:97-99`) → 3-column card grid below.
- **Notable:** Comment block `:14-22` defends ChevronRight as "decorative pointers" *not* expand arrows. Specifically defends `group-hover:text-black` on bullet lists — the card is one unified hover target.

### Sidebar TOC (`SidebarTOC.tsx`)
- **3-state cycle:** `open` (default, 320px) → `compressed` (rail w/ icons only) → `minimal` (collapsed handle). Cycled by clicking the toggle. Stored at parent (`SampleReportPreview.tsx:38`).
- **Why 3 states:** Lets the reader sacrifice nav real-estate for body width without losing the chapter-jump affordance entirely.

---

## 3. SlideshowSection (`SlideshowSection.tsx`)

### WWWWH
- **What:** Carousel of 40 deck-slide previews — center slide full-size, neighbours scaled to `peekScale` (0.75–0.85), thumbnails strip below.
- **Where:** Light/dark variant toggleable. Light variant uses `SectionWrapper background="white"`; dark variant uses `background="black"` + 4-layer custom background (rich gradient → amber light-source → warm ember counterweight → coral hint).
- **Why light AND dark in one section:** Provides a *visual context test* for the deck imagery — same slides, two ambiences. Marketing utility, but also genuine craft.
- **How responsive:** `:97-116` defines 5 breakpoint clauses — slide width steps 260 → 340 → 440 → 520 → 620 px. Locked 16:9. Gap and peek-scale step with it.

### Composition highlights
- **Auto-advance:** 4.5s interval (`:129-133`). Pauses are implicit — no user-pause UI.
- **Touch swipe:** `:149-164` — `>50px` delta to trigger advance. Touch end resets.
- **Keyboard:** ←/→ arrows mapped globally (`:135-143`).
- **Bottom CTA:** `Download Sample Deck` — `Button variant="brand"` w/ `Download` icon left, `background={isDark ? 'dark' : 'light'}`.

### What's special
- The **thumbnail auto-centre** logic (`:118-127`) — calculates the scroll offset so the active thumbnail sits centred regardless of which of the 40 you're on. Small UX detail, big polish gain.

---

## 4. ReportHighlights (`ReportHighlights.tsx`)

### WWWWH
- **What:** 6-card insight grid — each card has icon-box (top-left) + badge stat (top-right) + title + 2-line description.
- **Where:** Section 4. `bg-gray-50` body, max-w 1200, 3-col on lg, 2-col on md, 1-col mobile.
- **Why this section exists:** Skimmable executive-style summary for users not reading chapter content. 6 cards = "Rapid Market Growth", "Regional Insights", "Competitive Analysis", "Technology Trends", "Application Segments", "Growth Drivers".

### DS atoms
- `SectionLabel` accent (`KEY INSIGHTS`)
- `SectionHeading` level 2 (`What's Included`)
- `iconColors.content` for the lucide icons in card-icon boxes

### Composition
- Cards (`HighlightCard:58-95`): `rounded-[10px]`, `shadow-[0_1px_3px_rgba(0,0,0,0.04)]` resting, hover lifts `-translate-y-0.5` + heavier shadow.
- Icon box: `size-11 rounded-[10px] bg-content-icon/10` — the same 10%-opacity pattern as ChapterExecutiveSummary's stat cards.
- Stat badge: tiny inline pill, `rgba(0,0,0,0.04)` bg, no border, displays `316%` + `Growth` style stats.

### What's special
- The **stat badge is the hook** — it's a numerical "win" the user sees before reading the body text. Anchors attention in the upper-right corner of each card (Z-pattern compliant).

---

## 5. FAQSection (`FAQSection.tsx`)

### WWWWH
- **What:** 6-question accordion, first item open by default, chevron rotates 180° on open.
- **Where:** Section 5. `SectionWrapper background="white" spacing="lg" maxWidth="wide"`.
- **Why "Still have questions?" sub-card:** `:127-139` — after the accordion, a left-aligned card asks if the reader is still stuck and offers a `CTALink variant="brand"` to "Contact Research Team". The accordion handles common cases; the card catches everyone else.

### Composition
- Each FAQ is a `<button>` with `aria-expanded` and `aria-controls` correctly wired (`:95-96`).
- Open state adds `aria-labelledby` linking the answer region back (`:114`).
- `useAnalytics` hook fires `trackFAQExpand` on open (`:60-62`). The whole app is instrumented.

### What's special
- The bottom contact CTA card (`:127-139`) is the **single-page "escape hatch"** — every section has an exit-to-purchase or exit-to-talk-to-human path. No dead-ends.

---

## 6. CTASection (`CTASection.tsx`)

### WWWWH
- **What:** Centred hero-style final CTA. Single `TrackedButton variant="brand"` w/ animated arrow. Dual-variant (dark default / light toggle).
- **Where:** Section 6, last before footer.
- **Why dark default:** Brand-red CTA on a deep, glowing-coral-gradient dark background = maximum chromatic punch (`:21-22`). The light variant *mirrors the composition 1:1* (`:50-82`) — same blob positions, replaced with warm-coral-perano hues. Comment `:50` is explicit: *"Light variant backgrounds — mirrors dark composition 1:1."*

### What's special
- **Composition mirroring.** This is the most impressive single technique on the page: the **same shape** (4 radial blobs at the same coordinates with the same sizes/blurs) gets *re-tonalised* for light mode. Both feel cinematic for different reasons, but they share DNA.
- 5 layered gradients/blobs + a noise SVG-encoded directly in the className (`:39-42`) + a radial vignette + a top edge glow line. ~50 lines just for the background.

---

## 7. Footer (`Footer.tsx`)

### WWWWH
- **What:** Traditional 4-col footer — company logo block + Industries + Services + Company link lists. Bottom row: copyright + Privacy/Terms/Cookie links.
- **Where:** Section 7. `border-t border-[var(--black-200)] bg-white py-8 sm:py-12`.
- **Why this minimal:** This is a **leaf page** — the user already got the report-specific CTAs. The footer's job is legal compliance + escape-to-other-categories. No newsletter signup, no live-chat widget — Ken's lead-capture happens via the CTAs above.

### DS atoms
- Lucide social icons (`Linkedin`, `Twitter`, `Youtube`, `FileText` for the logo mark).
- No `<Button>` use here — social buttons are inline-styled `<button>` (`:23-44`) because they're navigation, not actions. Reuses the same `rounded-[5px] bg-[var(--black-100)] p-2` pattern 3×.

### What's special
- Honest hierarchy: H4 (`text-[1rem] font-medium`) column titles, `text-[var(--black-500)]` link text, hover transitions to full `text-black`. No animation budget — just legibility.

---

## Cross-section observations

- **Container width discipline:** Every section uses `max-w-[1200px]` except `SectionWrapper maxWidth="content"` (1000px) for FAQ ChapterMethodology cards. Two widths, consistently chosen.
- **Spacing rhythm:** `SectionWrapper spacing` enum (sm/md/lg/xl → 32/40/48/64 mobile, 48/64/80/96 desktop — `SectionWrapper.tsx:46-51`) drives all vertical breathing.
- **Background alternation:** white (Hero region) → white (Report) → variable (Slideshow) → gray-50 (Highlights) → white (FAQ) → dark/light (CTA) → white (Footer). The slideshow + final CTA are the two *cinematic* surfaces; everything else is editorial-light.
- **Every interactive surface tracked:** `useAnalytics` is wired into FAQ open, CTA click (`TrackedButton`), and slide view. Nothing is anonymous.
