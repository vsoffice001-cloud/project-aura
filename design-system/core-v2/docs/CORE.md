# Design System core-v2 · CORE Rules & AI/Dev Checklist

**Module:** `design-system/core-v2/docs/CORE.md`
**Version:** v0.1.0 · core-v2
**Date:** 2026-05-14
**Ports:** OG `Design_system_vs_26 (og and final)/ai-context/CORE.md` v4.3 (2026-03-18) · adapted for the new stack.
**Next read:** [`QUICK_START.md`](./QUICK_START.md) (page-build workflow + 1-min onboarding).

---

## CRITICAL — READ THIS FIRST

**This file is the SINGLE SOURCE OF TRUTH for AI assistants and developers working in `design-system/core-v2/`.**

When any team member (human or agent) asks you to build a page, component, or feature:

1. Read this `CORE.md` for the rules + 27-point checklist.
2. Read [`QUICK_START.md`](./QUICK_START.md) for the page-build workflow.
3. Read [`ANTI_PATTERNS.md`](./ANTI_PATTERNS.md) for the 14-category DON'T list before composing.
4. Read [`COMPONENT_REFERENCE.md`](./COMPONENT_REFERENCE.md) for the API surface and decision trees.
5. Apply ALL rules automatically. Use exact tokens. Do not invent.

> *"This module system is the SINGLE SOURCE OF TRUTH for AI assistants building pages with our design system."* — OG `ai-context/CORE.md:12` (verbatim · still true · scope expanded to humans because the new stack is Next 15 + RSC and the failure modes are now framework-level too).

---

## Stack callout — core-v2 is NOT OG

The OG DS was a **Vite + React 18 SPA** with zero `'use client'` directives, dual `theme.css` + `tokens.ts` token sources, and a 7-tab `DesignSystemDashboard.tsx` as self-rendering documentation. core-v2 is a deliberate re-port for a different stack.

| Concern | OG `Design_system_vs_26` | core-v2 |
|---|---|---|
| Framework | Vite 6.3 + React 18.3 SPA | **TypeScript library** consumed by **Next 15/16 App Router + React 19** |
| Rendering | Client-only · everything is a client component | **RSC by default** · interactive atoms marked `'use client'` |
| Styling | Tailwind v4 `@theme` directive · CSS-first config | **Tailwind v4** (same) + **CSS variables consumed via `var(--name)`** |
| Tokens | Dual: `theme.css` (841 lines) + `tokens.ts` (manual sync) | **Single source:** `@kenresearch/tokens` workspace → **Style Dictionary v4 (DTCG JSON)** → emitted `tokens.css` |
| UI primitives | `src/app/components/ui/` (46 shadcn, inline) | `@kenresearch/design-system/ui` (46 shadcn, first-class subpath export) |
| Animation | Framer Motion 12 (motion package) | **Framer Motion 12 ONLY** (GSAP + Lenis removed 2026-05-08 per dev-team parity) |
| Documentation | 7-tab dashboard + 6 `ai-context/*.md` modules + 56KB 4WH doc | **`docs/*.md`** in this folder · `playground/` stubbed but not maintained · consumer apps are live reference |
| Data | Mock data hardcoded inline in organisms | **Adapter pattern** (Phase 3, 2026-05-13) — organisms take data via props; consumer owns mock data |

**Why this matters:** if you treat core-v2 like OG, you will (a) forget `'use client'` and crash the Next build, (b) hardcode hex instead of using tokens, (c) re-implement atoms inline instead of importing, or (d) break the adapter contract by importing consumer data into the library. All four are P0 anti-patterns.

---

## Design System Overview (WHY · WHAT · WHEN · WHERE · HOW)

### WHY
*"Creates consistency, speeds development, ensures quality, enables team scalability, single source of truth."* (OG `ai-context/CORE.md:24-25` verbatim.) Beyond that: solves **CTA drift** (every team was hand-rolling buttons; brand-locked shimmer kept being lost), **typography chaos** (enforces Major Third 1.25× scale w/ 9 named tokens), and **AI agent ambiguity** (the 4W+H + WHEN-NOT pointers let agents pattern-match intent, not just artifact).

### WHAT
*"Minimalist editorial design system with black/white alternating sections, Major Third typography (1.25 ratio), Ken Bold Red (#b01f24) for CTAs only."* (OG `ai-context/CORE.md:28` verbatim.) Surfaces two variants: **editorial-light** (default · warm `#f5f2f1` bg · black text) and **cinematic-dark** (opt-in via `data-variant="cinematic"` · `#0a0a0c` bg · `#FAFAFA` text). Both share Ken red `#b01f24` for CTAs only.

### WHEN
Use core-v2 for **ALL Ken Research consumer surfaces** — case-study templates · Report Store home/listing/PDP · surveys · landing pages · marketing. The four current consumers (`V0_lite_report` · `V0.2_report` · `report-store` · `reports-pdp-v2`) all consume it via `workspace:*`.

### WHEN NOT
- Dashboard / admin SaaS UI (DS is editorial · no DataTable beyond Highcharts presets)
- Pre-React-19 consumers (peer dependency)
- Surfaces that need i18n/RTL beyond what Tailwind utilities already give
- Anything outside Ken Research brand surfaces (the 92-5-3 rule + Ken red are brand-locked)

### WHERE
- **DS source:** `/Users/vishalchauchan/Downloads/Anti-folder01/design-system/core-v2/src/`
- **Tokens source:** `/Users/vishalchauchan/Downloads/Anti-folder01/design-system/tokens/` (Style Dictionary)
- **Tokens build:** `/Users/vishalchauchan/Downloads/Anti-folder01/design-system/tokens/build/tokens.css`
- **OG reference (read-only):** `/Users/vishalchauchan/Downloads/Anti-folder01/Design_system_vs_26 (og and final)/`
- **Workspace context:** `/Users/vishalchauchan/Downloads/Anti-folder01/CLAUDE.md` + `Quick_start_guide.md`

### HOW
Import from `@kenresearch/design-system/{atoms,molecules,organisms,hooks,ui,patterns,types,charts}`. Import styles in order: `base.css` → `utilities.css` → variant CSS (`editorial-light.css` default · `cinematic-dark.css` opt-in). Compose pages from recipes (`/design-system/recipes/*.md`). Never re-implement atoms inline.

---

## 27-point pre-flight checklist (port + adapt from OG `CORE.md:114-137`)

Before generating ANY code, verify each item. Fail any one = stop and fix before continuing.

### Stack + framework (NEW · core-v2 specific)
- [ ] **1.** Every atom/molecule/organism file that uses React hooks, browser APIs, event handlers, refs, or Framer Motion has `'use client';` as line 1. OG had **zero** of these (Vite SPA); core-v2 requires them on every interactive component. **Skipping = Next 15 build error.**
- [ ] **2.** No component imports consumer-app data, mock fixtures, or page-specific state. Data flows in via props (adapter pattern, Phase 3 · `HANDOVER.md:74-86`). **Breaking the adapter contract = library coupling regression.**
- [ ] **3.** Tokens are consumed via `var(--name)` in inline `style={{}}` or via Tailwind arbitrary `[var(--name)]` ONLY when no token-aware utility exists. NEVER hardcode hex or px outside of `clamp()` ranges (port of OG `theme.css:171-172`: *"Every fontSize in the codebase MUST map to one of these tokens. No hardcoded pixel values allowed outside of clamp() ranges."*).
- [ ] **4.** `tokens.css` is generated by Style Dictionary from `design-system/tokens/` JSON. **Never hand-edit `design-system/tokens/build/tokens.css`** — it gets regenerated.
- [ ] **5.** Token overrides for a variant (e.g. cinematic-dark) live in `core-v2/src/styles/cinematic-dark.css` inside a **bare `:root[data-variant="cinematic"] {}`** block — not inside `@layer tokens`. Style Dictionary emits tokens.css unlayered; overrides must match cascade or the variant will silently lose.
- [ ] **6.** Tailwind v4 sees DS classnames via the `@source` directive in the consumer's `globals.css` (Tailwind v4's automatic node_modules scan does NOT cover linked workspace packages). Verify `@source "../../design-system/core-v2/src/**/*.{ts,tsx}";` is present. **Skipping = atoms render unstyled.**

### Imports + components (port of OG `CORE.md:118-132`)
- [ ] **7.** Read the relevant `docs/*.md` module(s) for the surface being built (case-study → `RECIPES.md`; listing → `COMPONENT_REFERENCE.md` decision tree).
- [ ] **8.** All atoms imported from `@kenresearch/design-system/atoms` — never re-implemented inline.
- [ ] **9.** Using correct component for the job: **Button** (action) vs **CTALink** (nav w/ arrow) vs **InlineLink** / **TextLink** (in-body) vs **FilterChip** (selected-state). When in doubt → `COMPONENT_REFERENCE.md` decision tree L20-107.
- [ ] **10.** Using correct card: **ResourceCard** (7 variants for editorial cards) vs **ReportCard** / **ReportGridCard** vs **StatCard** vs **DataHighlightCard** (data viz) vs **AnalystPickCardB** (Phase 3 adapter). See COMPONENT_REFERENCE.md flowchart.
- [ ] **11.** Correct Button `size`: **md is default (48px)**, NOT lg. `xs` (28px) ONLY for card footers and table actions. (OG rule `CORE.md:122-123`.)
- [ ] **12.** `showArrow={true}` ONLY for urgency / forms / conversion moments — NOT every button (OG `CORE.md:124`).
- [ ] **13.** Button uses **`ariaLabel`** (camelCase, the core-v2 prop) — NOT raw `aria-label` HTML attr — and **only** when `iconOnly`. (Adapted from OG `CORE.md:135`.)
- [ ] **14.** Shimmer animation NOT disabled on brand/primary variants (core brand identity per OG `CORE.md:125`). Shimmer is opt-out only when `prefers-reduced-motion`.

### Tokens + scale (port of OG `CORE.md:125-130`)
- [ ] **15.** Typography: **Noto Serif** for headings/display (`--font-serif`), **DM Sans** for body/UI (`--font-sans`). Never mix.
- [ ] **16.** Font sizes via CSS variables `--typography-size-{xs,sm,md,2xl,...}` (renamed from OG `--text-*`). NEVER use Tailwind utility classes like `text-2xl` directly — they bypass the Major Third scale.
- [ ] **17.** Section headings use `--typography-size-2xl` (39px). h1 hero only uses `--typography-size-3xl+`. (OG inline rationale at `theme.css:127`: *"UPDATED: January 2025 — Section headings changed from --text-3xl to --text-2xl"* because 48.8px competed with hero.)
- [ ] **18.** Body text uses `--typography-size-sm` (16px) (OG `CORE.md:169`).
- [ ] **19.** Spacing from the Style Dictionary scale `--spacing-{1,2,3,4,6,8,12,16,20,24}` (numeric, base-4). No arbitrary `[24px]` Tailwind class unless it maps 1:1 to a token. (OG used t-shirt sizing too — core-v2 standardised on numeric per industry-research alignment with Polaris/ADS.)
- [ ] **20.** Border-radius via `--radius-{button,card,...}` semantic aliases (the `--rc-` prefix anomaly from OG has been cleaned up).

### Color + brand (port of OG `CORE.md:120-121, 142-145`)
- [ ] **21.** **`--brand-red` (#b01f24) ONLY for CTAs.** This is the 5% in the 92-5-3 constitution (OG `ai-context/COLORS.md:11-19`: *"92% foundation, 5% brand, 3% accent. Brand: Ken Bold Red #b01f24 — CTAs ONLY."*). Never use for icons, headings, body text, or decorative bg.
- [ ] **22.** Badges use the **`theme` prop** for color (not inline styles or hex). Icons use **`iconColors.content` (Periwinkle `#806ce0`)** for feature/metric/phase content, **`iconColors.utility` (Gray `#737373`)** for navigation/action/state. (OG `iconColors.ts:1-19` verbatim: *"Every Lucide icon must use one of these two colors — no exceptions."*)

### A11y + motion (port of OG `CORE.md:134-136`)
- [ ] **23.** Touch targets ≥ **44×44 px** on mobile for all interactive elements (WCAG 2.5.5). Button `xs` is exempt because card-footer context provides external touch area.
- [ ] **24.** `prefers-reduced-motion` respected on every animation. Use Framer `useReducedMotion()` in JS or `motion-reduce:` Tailwind utility in CSS. NEVER ship an animation that runs unconditionally.
- [ ] **25.** `:focus-visible` rings on every interactive element. Card a11y fix from core-v2: when Card has `onClick`, it MUST also have `role="button"` + `tabIndex={0}` + `onKeyDown` for Enter/Space. (OG Card had this as a documented bug; core-v2 Card.tsx:91-103 fixed it. Don't regress.)

### Composition (NEW · learned from worked-examples)
- [ ] **26.** No `bg-[#hex]` Tailwind arbitraries · no raw `<button>` elements · no `<a>` without `<InlineLink>`/`<CTALink>`/`<TextLink>` wrapper. (Adapted from `worked-examples/v0-lite-report-legacy/secondary-button-issue.md` Fix 1-2 and OG `CORE.md:160-161`.)
- [ ] **27.** Section bg alternation follows the recipe (`design-system/recipes/<surface>.md` L50). Case-study: BLACK → WHITE → WARM strict; report-store-listing: BLACK → WHITE → NEUTRAL-50. Lint via `pnpm lint:recipes` (`README.md:71`).

---

## 21 DON'Ts (port of OG `CORE.md:142-163` + 7 core-v2-specific)

### Port from OG (1-14 verbatim from `CORE.md:142-163`)
1. **DON'T** use `--brand-red` for anything except CTA buttons. (5% rule.)
2. **DON'T** use `size="lg"` as default (use `size="md"`).
3. **DON'T** add `showArrow={true}` to every button (only urgency / forms / conversion).
4. **DON'T** use `--typography-size-3xl` for section headings (only hero h1; OG `--text-3xl` → core-v2 `--typography-size-3xl`).
5. **DON'T** use hardcoded colors instead of tokens.
6. **DON'T** use arbitrary spacing — stick to the Style Dictionary scale.
7. **DON'T** use Tailwind utility `text-2xl` / `font-medium` classes that bypass tokens (use CSS variables via inline style or `[var(--name)]` arbitrary).
8. **DON'T** disable shimmer animation on brand/primary variants — it's brand-locked.
9. **DON'T** use Serif font for body text, buttons, or labels (Sans only).
10. **DON'T** use Sans font for hero headings or section titles (Serif only).
11. **DON'T** put "View Report" buttons inside grid cards (removed in v4.0 OG audit — `CORE.md:153`).
12. **DON'T** put divider lines inside grid cards (removed in v4.0 audit).
13. **DON'T** mix `HorizontalScroll` and `ScrollFade` — different use cases (carousel vs pill overflow). See COMPONENT_REFERENCE flowchart.
14. **DON'T** use `ArrowRight` / `ChevronRight` / static `<ArrowUpRight>` inside Button or CTALink — ALWAYS use the `showArrow` prop which renders the brand-locked animated `ArrowUpRight`.

### Core-v2-specific additions (15-21)
15. **DON'T** use `bg-[#hex]` or `text-[#hex]` Tailwind arbitraries anywhere. Use `style={{ background: 'var(--token)' }}` or `[var(--token)]` arbitrary. The lint rule (`README.md:70`) is *"no inline color/size, no `[#xxx]/[Npx]` arbitraries"*.
16. **DON'T** use raw `<button>` HTML — always `<Button>`. Skipping = lose shimmer, brand sizing, focus-ring, touch-target floor.
17. **DON'T** hand-edit `design-system/tokens/build/tokens.css`. Edit JSON sources in `design-system/tokens/`, run the Style Dictionary build. The CSS file regenerates.
18. **DON'T** break the adapter pattern. Organisms in `/organisms` must NOT import consumer mock data, fixtures, or page-state hooks. Consumer owns data; DS owns rendering + the type contract. (See HANDOVER.md:74-86.)
19. **DON'T** wrap variant overrides in `@layer tokens { ... }` or `@layer base { ... }` — Style Dictionary emits unlayered tokens.css, so layered overrides lose the cascade silently. Use bare `:root[data-variant="cinematic"] { --token: value; }`.
20. **DON'T** use `variant="secondary"` on light-bg surfaces until the contrast bug is fixed. Current secondary border `--warm-500` (#eae5e3) has only **1.13:1** contrast against `#ffffff` — fails WCAG 3:1 minimum for non-text UI. Use `variant="ghost"` (or `outline` once we ship the collapse) instead. See `design-system-audit/worked-examples/v0-lite-report-legacy/secondary-button-issue.md`.
21. **DON'T** create a separate `tailwind.config.js` in a consumer to redefine DS tokens. Tailwind v4 reads tokens via the `@theme` directive in `tokens.css`. Consumers consume; they do not redefine.

---

## 19 DOs (port of OG `CORE.md:165-184` + 6 core-v2-specific)

### Port from OG (1-13 verbatim from `CORE.md:165-184`)
1. **DO** use `variant="brand"` ONLY for conversion CTAs (Book a call · Download report · Talk to analyst). Max 1-2 per screen.
2. **DO** use `size="md"` as default (48px height).
3. **DO** use `size="xs"` for card footer CTAs (28px height) — context-only.
4. **DO** use `--typography-size-sm` (16px) for ALL body text.
5. **DO** use `--typography-size-2xl` (39px) for ALL section headings.
6. **DO** use color tokens from `tokens.css` exclusively.
7. **DO** use the spacing scale via `var(--spacing-N)` or matching Tailwind classes.
8. **DO** use CSS variables for font sizes (not Tailwind `text-*` utilities, which bypass the scale).
9. **DO** let shimmer animation run on brand/primary — it's the signature interaction.
10. **DO** use Badge `theme` prop for colors (not inline styles).
11. **DO** use `<Container>` for width constraints — never `max-w-*` Tailwind inline.
12. **DO** wrap each page section in `<FadeInSection>` for scroll reveals (or use `useInView` + Framer if more control needed).
13. **DO** use `<SkeletonCard>` for loading states · `<EmptyState>` for zero results · `<HorizontalScroll>` for carousels · `<ScrollFade>` for pill overflow.

### Core-v2-specific additions (14-19)
14. **DO** add `'use client';` as line 1 on every atom/molecule/organism that uses hooks, refs, browser APIs, event handlers, or Framer Motion. **Required** for Next 15 App Router.
15. **DO** add `@source "../path/to/design-system/core-v2/src/**/*.{ts,tsx}";` to the consumer's Tailwind entry CSS. Tailwind v4 does NOT auto-scan workspace-linked node_modules.
16. **DO** use **`ariaLabel`** (camelCase prop) on `<Button iconOnly>` and `<CTALink>` — the core-v2 atoms surface accessible labels as React props, not raw HTML attrs.
17. **DO** use `@apply` inside `@layer components { ... }` blocks correctly — `@apply` outside a layer (or inside the wrong layer) silently loses specificity vs Tailwind's own utility layer. Verify your generated CSS class order if a utility doesn't seem to apply.
18. **DO** consume the 23 first-class DS hooks from `@kenresearch/design-system/hooks` — `useScrollAnimation`, `useActiveSection`, `useReducedMotion`, `useFocusTrap`, `useMagneticEffect`, etc. Don't re-implement; the DS surface is now richer than OG's inline hooks.
19. **DO** use the `data-variant="cinematic"` ancestor pattern for dark-surface sections — NOT the legacy `background="dark"` prop on individual atoms. (See `worked-examples/v0-lite-report-legacy/secondary-button-issue.md` Fix 4: *"Use CSS custom properties on a `data-variant-section='cinematic'` or `data-theme='dark'` ancestor."*)

---

## Component Inventory · core-v2 v0.1.0 (replaces OG v4.3 inventory at `CORE.md:75-110`)

Sourced from `HANDOVER.md:59-72` + `src/atoms/index.ts` + `src/molecules/index.ts` + `src/organisms/index.ts` etc.

### Atoms — 42 (`src/atoms/`)
AnimatedArrow · AnimatedArrowQuickRef · Avatar · Badge · Button · CTALink · Card · CategoryListItem · CollapsibleSection · ContactModal · Container · Divider · DropdownChevron · FadeInSection · FilterCheckbox · FilterCheckboxItem · FilterChip · FilterIndustryItem · FilterSearchInput · FilterSectionHeader · HamburgerIcon · IconBadge · ImageWithFallback · InlineLink · Label · LogoButton · MenuItem · NextSectionCTA · ResourceCard · ScrollProgress · ScrollToTop · SectionHeading · SectionLabel · SectionWrapper · SkipLink · SpacingHelpers · StatusDot · SubtleVariantSwitcher · TextLink · Tooltip · ViewToggle · iconColors.ts · industryIconMap.ts.

**Promoted to atoms** vs OG (where they were molecules / organisms): `ContactModal`, `ResourceCard`, `ViewToggle`, `SectionLabel`. **New net additions:** `Avatar`, `Divider`, `DropdownChevron`, `HamburgerIcon`, `LogoButton`, `MenuItem`, `SkipLink`, `StatusDot`, `TextLink`.

### Molecules — 26 (`src/molecules/`)
ActiveFilterChipBar · AnalystPickCardB · BackToTop · CardFooterRow · CardMetaRow · CardReveal · CategoryListCard · CompletionBadge · DataHighlightCard · EmptyState · FilterAccordion · HorizontalScroll · IndustryBadge · LoadMoreSentinel · MobileFilterSheet · QuestionPreview · ReportCard · ReportGridCard · ResponseChart · RevealImage · ScrollFade · SidebarPanel · SkeletonCard · StatCard · SurveyCard · SurveySkeleton + `navbar/` sub-folder.

Parity with OG's 26 molecules. Same caveats re: WWWWH JSDoc depth lost (re-injection planned via per-atom JSDoc expansion).

### Organisms — 38-44 (`src/organisms/`)
**Cross-pillar (Case-study):** HeroSection · ClientContextSection · ChallengesSection · EngagementObjectivesSection · MethodologySection · ImpactSection · ValuePillarsSection · TestimonialSection · ResourcesSection · FinalCTASection · CaseStudyNavbar · ReadingProgressBar · StickyCTA.

**Report Store (adapter-pattern, props-driven):** ReportStoreHero · FeaturedResearch · ListingToolbar · CardListing · FiltersPanel · IndustrySidebar · IndustryFocusBanner · DailyDataHighlights · AnalystPicks · IndustrySectorsGrid · KeyMarketIndicators · RecommendedForYou · CustomResearchCTA · TrendingTopics · TopDownloads · RecentlyViewed · UpcomingReports · ResearchMethodology · NewsletterSignup · IndustrySpotlight · ComparisonTable · ReportPreview · TestimonialsRS · QuickAccessBar.

(OG `CORE.md:95-102` lists the corresponding case-study + RS organisms; core-v2 promoted case-study organisms into formal DS exports in Phase 2, 2026-05-13.)

### Patterns — 4 (`src/patterns/`)
`DarkGradientMesh` · `SectionBg` (+ 2 more — see `COMPONENT_REFERENCE.md`). Used for cinematic-dark surfaces and section bg composition.

### Hooks — 23 (`src/hooks/`)
useShimmer · useActiveSection · useScrollDirection · useScrollAnimation · useReadingProgress · useSectionProgress · useHeroVisibility · useCounter · useAnimatedCounter · useMagneticEffect · useResponsiveGutter · useProgressiveLoad · useCrossfade · useMountTransition · useDebounce · useFocusTrap · useKeyboardNavigation · useNavDropdown · useMobileMenu · useAuthPopover · useVariant · `useReducedMotion` (Framer re-export) + 1 more.

(`useReportFilters` is NOT shipped from DS — depends on consumer mock data shape. DS ships the `ReportFilters` type contract only. HANDOVER.md:114.)

### shadcn UI — 46 (`src/ui/`)
46 primitives at the `/ui` subpath export (Dialog · Popover · Sheet · Command · Combobox · DropdownMenu · Tabs · Toggle · ToggleGroup · ScrollArea · Resizable · Drawer · Toast (sonner) · Form · etc.).

### Types — 13 (`src/types/`)
`ReportItem · IndustryData · ReportFilters · AnalystPick · ResourceItem · TestimonialItem · ImpactStat · MethodologyStep · Challenge · ValuePillar · ClientContext · EngagementObjective · NavLink`. These are the **type contracts** that the adapter-pattern organisms expect.

### Charts — theme + 5 presets (`src/charts/`)
`kenChartTheme` (Highcharts theme using DS color tokens) + 5 chart preset configurations (line · column · area · donut · stacked-bar).

**~168 components total = 100% OG `Design_system_vs_26` Figma export coverage** (HANDOVER.md:72).

---

## Stack-specific rules · core-v2 gotchas

### Tailwind v4 + node_modules scan gap
Tailwind v4's automatic content scanner does NOT recurse into workspace-linked packages (`@kenresearch/design-system` is symlinked via pnpm). Consumer must explicitly opt in:

```css
/* projects/<name>/app/globals.css */
@import "tailwindcss";
@source "../../design-system/core-v2/src/**/*.{ts,tsx}";
@source "../../design-system/tokens/build/tokens.css";
```

**Symptom of skipping:** atoms render with zero Tailwind classes; the page looks like raw HTML. Fix: add the `@source` directive.

### `@layer tokens` cascade trap
Style Dictionary v4 emits `tokens.css` **unlayered** (just `:root { --token: value; }` at the root). If you write a variant override inside `@layer tokens { ... }`, it goes into the `tokens` cascade layer — which is LOWER priority than the unlayered base. Your override loses silently.

**Correct:**
```css
/* core-v2/src/styles/cinematic-dark.css */
:root[data-variant="cinematic"] {
  --surface-text-strong: #FAFAFA;
  --surface-bg-base: #0a0a0c;
}
```

**Wrong:**
```css
@layer tokens {
  :root[data-variant="cinematic"] { /* This is in layer "tokens" · base unlayered wins */ }
}
```

### `@apply` inside the wrong layer
`@apply` inside a `@layer utilities { ... }` block applies utility classes at the utilities-layer specificity — fine. `@apply` outside any layer applies at unlayered specificity — usually fine but can produce surprising results when interacting with Tailwind's own internal layers. Default rule: keep `@apply` inside `@layer components { ... }`.

### Button: collapse `secondary` + `ghost` → outline variant (P0 fix · `secondary-button-issue.md`)
Currently `variant="secondary"` on light bg has 1.13:1 border contrast — fails WCAG. Until the collapse ships: **use `variant="ghost"` on both light and dark surfaces** as the documented workaround. After the fix lands, `variant="secondary"` will be visually identical to current `ghost`, with no API break for consumers.

### Brand red `#b01f24` = CTA-only (5% rule)
The 92-5-3 constitution (OG `COLORS.md:11-19` verbatim): *"92% foundation, 5% brand, 3% accent. Brand: Ken Bold Red #b01f24 — CTAs ONLY."* This is the load-bearing constraint for the "Stripe-quality / authority-first editorial" feel. Violating it (red headlines, red icons, red bg) drains the CTA of meaning — scarcity = power.

### Editorial-light is DEFAULT · cinematic-dark is a data-attribute variant
```tsx
// app/layout.tsx (Next 15 RSC pattern · HANDOVER.md:58-63)
import { cookies } from 'next/headers';
const variant = cookies().get('ds-variant')?.value ?? 'editorial-light';
return <html data-variant={variant}>...</html>;
```

Per-section cinematic embedding (legacy OG pattern, still valid): wrap section in `data-variant-section="cinematic"` and the bg + text tokens auto-invert via CSS variable scoping. Used on V0_lite_report HeroSection + ResourcesSection (always cinematic regardless of page variant).

---

## 3-Tier Token Pyramid (aspirational · Sprint 2 target)

Industry-research synthesis (Material 3 · Carbon · Polaris · ADS) converges on a **3-tier naming** strategy. core-v2 partially implements this; full pyramid is a Sprint 2 deliverable.

```
Tier 1 · PRIMITIVE     (raw values · color ramps · pixel scales · base units)
  --color-ramp-red-500: #b01f24;
  --color-ramp-warm-300: #f5f2f1;
  --typography-size-2xl: 2.441rem;
  --spacing-4: 16px;

Tier 2 · SEMANTIC      (intent · re-skinnable · theme-aware)
  --surface-bg-base: var(--color-ramp-warm-300);      /* light variant */
  --surface-text-strong: var(--color-foundation-black);
  --surface-text-muted: rgba(0,0,0,0.40);
  --brand-cta-bg: var(--color-ramp-red-500);

Tier 3 · COMPONENT     (atom-scoped · derived from semantic)
  --button-height-md: 48px;
  --button-px-md: var(--spacing-7);
  --card-padding-md: var(--spacing-4);        /* P0 fix: must be 16px, currently 24px */
  --radius-card: 10px;
```

**Why 3 tiers:** primitive layer freezes raw brand decisions (red is #b01f24, period). Semantic layer enables variant + theme + re-skin without touching atom code. Component layer keeps atom files clean — Button reads `--button-height-md`, doesn't recompute the math from primitives.

**Current state:** core-v2 has Tier 1 + most of Tier 3. Tier 2 (semantic) is partial — `--surface-*` and `--brand-cta-*` exist but most atoms reach for Tier 1 directly. Sprint 2 will land the full Tier 2 layer and refactor atoms to consume semantic-only.

---

## Quality Metrics scorecard (port of OG `CORE.md:188-200` · adapted)

AI-generated code and human PRs target these scores per surface:

| Dimension | Target | Measure |
|---|---|---|
| **Token discipline** | 100% (zero hardcoded values) | `pnpm lint` — fails on `bg-[#hex]`, raw `text-[16px]`, etc. |
| **Component reuse** | ≥ 90% atoms imported (not re-implemented) | Manual audit during craft-pass + `pnpm lint` checks for forbidden raw `<button>` / `<a>` |
| **Color compliance** | 100% — `--brand-red` for CTAs only · 92-5-3 holds | Visual review against the recipe + axe checks for contrast |
| **Typography compliance** | 100% — Major Third scale only · Noto Serif headings / DM Sans body | `pnpm lint` (token-only font sizes) + visual check |
| **Accessibility** | **WCAG AA** baseline (HANDOVER.md:118) · AAA aspirational where feasible | `pnpm test` (axe via Playwright) + manual keyboard run-through |
| **Performance** | 60fps animations · Lighthouse ≥ 90 perf on consumer apps (DS itself N/A) | Lighthouse CI per consumer (`webapp-testing` skill) |
| **Motion discipline** | `prefers-reduced-motion` honored everywhere · no infinite loops · no auto-playing video w/o user gesture | Code review + `motion-reduce:` utility presence |
| **Documentation** | 4W+H framework applied on new atoms + 9-step page-build process completed | `aura-craft` skill at step 4.5 of `chains/page-build.md` |
| **Mobile** | 44×44 px touch targets · responsive padding via `Container` · breakpoints honored | Manual test + axe target-size check |

---

## Decision tree shortcuts (full versions in QUICK_START.md + COMPONENT_REFERENCE.md)

- **"Build a page from intent"** → use `/page <recipe>` slash command · workflow at [`QUICK_START.md`](./QUICK_START.md)
- **"Pick a CTA"** → Button (action) · CTALink (nav w/ arrow) · InlineLink/TextLink (in-body) · FilterChip (selected-state) · COMPONENT_REFERENCE.md L20-107
- **"Pick a card"** → ResourceCard (7 editorial variants) · ReportCard (PDP listing) · StatCard (single number) · DataHighlightCard (mini-viz) · AnalystPickCardB (analyst pick adapter)
- **"Pick a color"** → 92-5-3 first: foundation? → warm-300/black/white token · brand action? → `--brand-red` · data/accent? → Periwinkle `#806ce0` · semantic state? → `--color-state-{success,error,warning}` (NOT brand red)
- **"Pick a font size"** → Major Third scale · `--typography-size-2xl` for section h2 · `--typography-size-sm` for body · `--typography-size-3xl+` for hero h1
- **"Pick a section bg"** → recipe alternation (case-study: BLACK→WHITE→WARM · listing: BLACK→WHITE→NEUTRAL-50) · NEVER improvise

---

## READING ORDER for new agents and devs

Onboard in this order. Total time: ~15 min for full mental model.

1. **[`CORE.md`](./CORE.md)** (this file) — rules · 27-point checklist · 21 DON'Ts · 19 DOs · inventory · stack gotchas · quality metrics
2. **[`QUICK_START.md`](./QUICK_START.md)** — page-build workflow · 9-step process w/ 2 hard gates + craft-pass · 1-min agent onboarding
3. **[`ANTI_PATTERNS.md`](./ANTI_PATTERNS.md)** — 14 categories of forbidden patterns w/ "use X instead" pointers
4. **[`COMPONENT_REFERENCE.md`](./COMPONENT_REFERENCE.md)** — full API surface · decision trees · prop tables
5. **[`PATTERNS.md`](./PATTERNS.md)** — section composition · dark gradient mesh · fade mask · 92-5-3 hierarchy · a11y contrast pairings
6. **[`RECIPES.md`](./RECIPES.md)** → links to `/design-system/recipes/*.md` (canonical per-surface recipes)
7. **`/design-system/tokens/build/tokens.css`** — the emitted token surface (read-only · regenerate via Style Dictionary)
8. **Cross-references when stuck:** `design-system-audit/` (OG vs core-v2 gap analysis + worked-examples), workspace `CLAUDE.md` (operating rules), `MEMORY.md` (Aura standing rules), `Quick_start_guide.md` (brand tokens).

---

**v0.1.0 · 2026-05-14 · ported from OG v4.3 (2026-03-18) · adapted for Next 15/16 + React 19 + Tailwind v4 + RSC + Style Dictionary v4 + shadcn. Audit source-of-truth: `design-system-audit/gap-analysis/og-vs-core-v2.md` · worked-examples flagged: `v0-lite-report-legacy/secondary-button-issue.md`.**
