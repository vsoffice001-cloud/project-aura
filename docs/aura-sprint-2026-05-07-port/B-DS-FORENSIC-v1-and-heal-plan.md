**TWO hook directories**: `src/app/hooks/` (15 hooks) AND `src/app/components/hooks/` (5 hooks) — that's a duplicate hook source. Confirmed missing molecules: `TimelineCard`, `AnalysisCard`, `TextCard`, `PhaseCard`, `MethodologyCard`, `StakeholderCard`, `FAQItem`, `NavDropdown`, `ComparisonParameterCard`, `SegmentationCard`. I have enough. Now writing the report.

---

# Ken Research Design System — Forensic Audit + Heal Plan

**Date:** 2026-05-07
**Phase:** B (DS audit + heal, before three Next.js 15 ports)
**Verdict:** v1 viable as visual reference + atom-extraction source. Not portable as-is. Recommend approved Option B — fork to `design-system/core-v2/`, freeze v1 as `core-legacy-v1/`.

---

## 1. DS core inventory (`design-system/core/`)

### Directory tree (depth 3, excludes `node_modules`, `.git`, `dist`)

```
design-system/core/
├── _dev-notes/                           # 3 stale drafts (animation experiments)
├── ai-context/                           # 6 .md briefs (COLORS, COMPONENTS, TYPOGRAPHY, CORE, PROMPTS, LAYOUT)
├── src/
│   ├── app/
│   │   ├── App.tsx                       # uses react-router-dom (Vite SPA only)
│   │   ├── components/                   # 100 .tsx + 8 .md + 5 subdirs (mixed atom/mol/org)
│   │   │   ├── badges/                   # only index.ts (re-export)
│   │   │   ├── figma/ImageWithFallback.tsx
│   │   │   ├── foundations/              # 7 .tsx (token-doc surfaces)
│   │   │   ├── hooks/                    # 5 hooks — DUPLICATE LOCATION
│   │   │   ├── links/README.md
│   │   │   ├── molecules/                # 27 files (26 .tsx + index.ts)
│   │   │   └── organisms/                # 31 files (30 .tsx + index.ts)
│   │   └── hooks/                        # 15 hooks — primary location
│   ├── design-system/                    # 8 files (in-app token reference)
│   │   ├── tokens.ts                     # PARALLEL token source (drifts from canonical)
│   │   ├── ColorSwatch.tsx, ComponentCard.tsx, EXAMPLES.tsx, README.md, SpacingScale.tsx, TypeScale.tsx
│   ├── imports/                          # Figma Make export artefacts
│   ├── lib/mock-data.ts
│   ├── styles/                           # 6 CSS files (1043 LOC total; theme.css 751)
│   ├── main.tsx, vite-env.d.ts           # Vite signatures
├── 18 .md files at root                  # Phase / handover / GitHub-push docs
├── package.json (Vite 6.3.5, React 19.2.5, MUI 7.3.5, 24× Radix, lucide, motion, recharts, etc.)
├── pnpm-lock.yaml, vite.config.ts, postcss.config.mjs, tsconfig*.json, index.html
```

### Component count by file type

| Type | Count | Note |
|---|---:|---|
| `.tsx` (components) | **165** | 100 root + 27 molecules + 31 organisms + 7 foundations |
| `.ts` (hooks/data/utils) | ~28 | 15 + 5 hooks (split), data.ts, iconColors.ts, industryIconMap.ts, useReportFilters in 2 places |
| `.css` | 6 | theme.css (751 LOC) load-bearing; modern-utilities.css (80) + report-store-additions.css (171) |
| `.md` (in src/) | 8 | `LINK_SYSTEM_*`, `NAVBAR_*`, `BUTTON_SYSTEM`, `ARROW_*`, etc. — colocated docs |
| `.md` (at core/ root) | **18** | Almost all stale phase / handover docs |
| Figma SVG `.ts` | 2 | `src/imports/svg-*.ts` |

### All atom/molecule/organism filenames + 1-line purpose

**Atoms (root of `components/`, ~70+ used as atoms; partial list):**
- `Button.tsx` — 5 size × 4 variant button w/ ripple + shimmer (302 LOC, hex-literal soup inside `style={{}}`).
- `Badge.tsx` — 753 LOC megacomponent: Badge + SectionLabel + StepPill + ObjectivePill + InfoCardLabel + CategoryBadge + StatusBadge + InfoBadge + MutedBadge + ClickableBadge — 11 exports from one file.
- `Card.tsx` — 131 LOC, typed variants (good).
- `CTALink.tsx` (110 LOC) / `InlineLink.tsx` (85 LOC) — link tiers.
- `AnimatedArrow.tsx` + `AnimatedArrowQuickRef.tsx` + `ArrowAnimationTest.tsx` — three files for one atom; second is pure docs, third is dev test.
- `Tooltip.tsx`, `Label.tsx`, `Container.tsx`, `IconBadge.tsx`, `CategoryListItem.tsx` — clean atoms.
- `FadeInSection.tsx` — IntersectionObserver wrapper (POSITIVE list ✓).
- `ScrollProgress.tsx` / `ScrollToTop.tsx` / `ReadingProgressBar.tsx` — scroll atoms.
- `ViewToggle.tsx` — list/grid switcher.
- `FilterCheckbox.tsx`, `FilterChip.tsx`, `FilterSearchInput.tsx`, `FilterSectionHeader.tsx`, `FilterCheckboxItem.tsx`, `FilterIndustryItem.tsx`, `FilterAccordion.tsx`, `ActiveFilterChip.tsx` — filter system, 8 files.
- `SectionHeading.tsx`, `SectionWrapper.tsx`, `NextSectionCTA.tsx`, `CollapsibleSection.tsx`, `CodeBlockWithCopy.tsx`, `VariantSwitcher.tsx`, `SubtleVariantSwitcher.tsx` — layout/util atoms.
- `Navbar.tsx` (442 LOC) — top-nav organism mislabeled as atom.
- `StickyCTA.tsx`, `ContactModal.tsx`, `NewsletterSignup.tsx` — overlays/conversion.
- `ResourceCard.tsx`, `ReportCard.tsx`, `LinkSystemDemo.tsx` — mixed atom/molecule.
- `*Documentation.tsx` and `*Content.tsx` (foundations / components / patterns / motion / guidelines / resources / links / nav / filters / badges) — docs surfaces (~14 files), Vite-only, no role in consumer DS.
- `FigmaButtonComparison.tsx`, `ShimmerDemo.tsx`, `ArrowAnimationTest.tsx`, `BadgeShowcase.tsx`, `ButtonControlsGuide.tsx` — dev-time only.
- `DesignSystemDashboard.tsx`, `DesignSystemSidebar.tsx`, `TableOfContents.tsx` — DS docs shell.

**Molecules (`molecules/`, 26 .tsx):** `IndustryBadge`, `CardMetaRow`, `CardFooterRow`, `ReportCard`, `ReportGridCard` (deprecated alias), `HorizontalScroll`, `ScrollFade`, `AnalystPickCardB`, `StatCard`, `DataHighlightCard`, `EmptyState`, `BackToTop`, `SkeletonCard`, `CardReveal`, `RevealImage`, `CompletionBadge`, `SurveyCard`, `ResponseChart` (recharts), `QuestionPreview`, `SurveySkeleton`, `FilterAccordion`, `SidebarPanel`, `ActiveFilterChip`, `MobileFilterSheet`, `CategoryListCard`, `LoadMoreSentinel`.

**Organisms (`organisms/`, 30 .tsx):** `ProductHero`, `FeaturedCarousel`, `StatsRow`, `BrowseGrid`, `CTABanner`, `ProductPageTemplate`, `ReportStoreHero`, `FeaturedResearch`, `ListingToolbar`, `CardListing`, `FiltersPanel`, `IndustrySidebar`, `IndustryFocusBanner`, `DailyDataHighlights`, `AnalystPicks`, `IndustrySectorsGrid`, `KeyMarketIndicators`, `RecommendedForYou`, `CustomResearchCTA`, `TrendingTopics`, `TopDownloads`, `RecentlyViewed`, `UpcomingReports`, `ResearchMethodology`, `NewsletterSignup`, `IndustrySpotlight`, `ComparisonTable`, `ReportPreview`, `TestimonialsRS`, `QuickAccessBar`. (Plus 11 case-study organisms `HeroSection`/`ChallengesSection`/`EngagementObjectivesSection`/`MethodologySection`/`ImpactSection`/`ValuePillarsSection`/`TestimonialSection`/`ResourcesSection`/`FinalCTASection`/`ClientContextSection`/`HomeSectionsB`/`HomeSectionsC` flat in components root — `index.ts` confirms.)

### Hooks

**Primary (`src/app/hooks/`, 15):** `useActiveSection`, `useCounter`, `useCrossfade`, `useHeroVisibility`, `useMagneticEffect`, `useMountTransition`, `useProgressiveLoad`, `useReadingProgress`, `useReportFilters`, `useResponsiveGutter`, `useScrollAnimation`, `useScrollDirection`, `useSectionProgress`, `useShimmer`, `index.ts`.

**Duplicate (`src/app/components/hooks/`, 5):** `useCrossfade`, `useMountTransition`, `useProgressiveLoad`, `useReportFilters`, `index.ts`. Same names, parallel files — likely partial copy that drifted.

### Config

| File | Note |
|---|---|
| `vite.config.ts` | `@vitejs/plugin-react` + `@tailwindcss/vite`. Comment says both required by Make. |
| `tsconfig.json`, `tsconfig.node.json` | Vite default split. |
| `postcss.config.mjs` | Tailwind v4 (`@tailwindcss/vite`). |
| `package.json` | `name: @kenresearch/ds-core`, `private: true`, no `exports` map, no `peerDependencies` declared, react/react-dom under `dependencies`. **Cannot ship as workspace package.** |
| `index.html` | Vite SPA host. Not consumable from Next. |

### Storybook / playground

No Storybook. The "playground" is `src/app/App.tsx` + `DesignSystemDashboard.tsx` (a `react-router-dom` SPA with 4 routes: `/`, `/figma-comparison`, `/shimmer-demo`, `/arrow-animation-test`).

---

## 2. DS dashboard inventory (`design-system/dashboard/`)

### Directory tree

```
design-system/dashboard/
├── _dev-notes/figma-imports/
├── ai-context/
├── guidelines/Guidelines.md
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   ├── ui/                       # 47 shadcn primitives — present unlike core
│   │   │   ├── molecules/                # 26 .tsx (IDENTICAL filename set to core)
│   │   │   ├── organisms/                # 30 .tsx (IDENTICAL filename set to core)
│   │   │   ├── foundations/, figma/, links/  # mirrors core
│   │   │   └── DashboardLayout.tsx       # ONLY meaningful new file vs core
│   │   └── hooks/                        # IDENTICAL 14 hook filenames to core
│   ├── design-system/                    # 8 files mirror of core/src/design-system
│   ├── imports/                          # 2 figma SVG .ts (subset of core)
│   ├── styles/                           # 5 CSS — drops modern-utilities.css vs core
│   ├── assets/, main.tsx, vite-env.d.ts
├── 14 .md files at root                  # similar to core
├── package.json (almost identical, drops @phosphor + recharts; uses react-router not -dom)
```

### Counts

| Type | Count |
|---|---:|
| `.tsx` (components) | ~150 (core 165 minus a handful) |
| `.tsx` (`ui/` shadcn) | **47** — full primitive set |
| Hooks | 14 |
| MDs at root | 14 |

### Atoms / molecules / organisms / hooks

`diff -q` of the two `components/` trees reports identical filename sets for **every** molecule, every organism, and ~80% of root atoms. Almost all corresponding files differ by a few lines (chiefly token references, copy adjustments). Only meaningful unique additions: dashboard adds `DashboardLayout.tsx` and the full `ui/` shadcn primitive folder. Core has unique extras `CardListing.tsx`, `DesignSystemSidebar.tsx`, `FeaturedResearch.tsx`, `AnalystPicks.tsx`, `DailyDataHighlights.tsx`, `ExploreByRegion.tsx`, `FilterAccordion.tsx`, `FigmaButtonComparison.tsx`, `ArrowAnimationTest.tsx` (mostly demo / dev-only).

**Verdict:** dashboard is a near-duplicate fork of core. Same Figma Make export shape (`vite-env.d.ts` figma-asset declaration; one ResourcesSection.tsx with the same sentinel). Carries the same 24-Radix / MUI / Emotion dead-dep payload. **Knowledge dilution real:** maintaining two parallel atom/molecule sets that drift independently across every refactor is the single most expensive structural problem.

### Config

Same Vite stack as core. Adds `guidelines/Guidelines.md`. Drops `recharts` and `@phosphor-icons/react` in package.json (used 0 times in core, so noop).

### Storybook / playground

Same SPA-as-playground pattern. `App.tsx` mounts a router showing `DesignSystemDashboard`.

---

## 3. DS tokens inventory (`design-system/tokens/`)

### Files

```
tokens/
├── tokens.json                 # 251 LOC, DTCG canonical
├── config.js                   # Style Dictionary v4 ESM config
├── package.json                # name=@kenresearch/tokens, type=module, main=build/tokens.js
├── README.md
├── pnpm-lock.yaml
├── scripts/validate.mjs
└── build/                      # (Style Dictionary output — not a source)
    ├── tokens.css              # 170 LOC, generated CSS vars
    ├── tokens.js               # JS ES6 export
    ├── tokens.d.ts             # TS declarations
    ├── tokens.scss
    ├── tokens.flat.json
    ├── ios/, android/          # platform stubs
```

### DTCG compliance

**Yes (mostly).** 164 `$value` declarations, 164 `$type` declarations. `$schema` references `https://design-tokens.github.io/community-group/format/`. `$type` histogram: 128 color · 24 dimension · 5 fontWeight · 4 number · 3 fontFamily. **No nested `{group}.$value` wraps.** `$description` used widely.

### Categories present

| Category | Status | Note |
|---|---|---|
| **color.foundation** | ✓ | black + white. |
| **color.brand** | ✓ | red `#b01f24`. |
| **color.accent** | ✓ | purple, periwinkle, perano, warm, teal (cinematic-only). |
| **color.ramp** | ✓ | red 50–900, black 50–900, white 800–900 only, warm 50–900, purple 50–900, periwinkle 50–900, perano 50–900, coral 50–900. |
| **color.semantic** | ✓ | ink, ink-on-dark, hairline, hairline-on-dark, surface-tint, surface, scrim, brand-red-alpha 12/30/65/80. |
| **typography** | ✓ | family (display/body/mono), 12 sizes 2xs→5xl, 5 weights, 4 lineHeights. |
| **container** | ✓ | page/content/narrow/prose/compact (POSITIVE list ✓). |
| **padding** | ✓ | mobile/tablet/desktop only — **no full 4px-base spacing scale**. |
| **radius** | ✓ | image/button/card/pill (4 tiers — drift from in-app `image/small/large` 3-tier). |
| **shadow** | ✗ | absent in canonical; present only in `src/design-system/tokens.ts`. |
| **motion / duration / easing** | ✗ | absent in canonical; present only in `src/design-system/tokens.ts`. |
| **variant** | ✓ | cinematic-dark + editorial-light overlays declared. |
| **chart palette** | ✗ | absent — POSITIVE-list gap. |
| **iconColors / iconBadge** | ✗ | absent — atom carries its own map. |
| **rc-* (ResourceCard) tokens** | ✗ | not declared. |
| **bg-composition-warm-editorial gradient** | ✗ | absent. |
| **button-min-width-{sm,md,lg,xl}** | ✗ | absent in canonical (referenced by `Button.tsx` from `theme.css` only). |
| **text-nav (14px), text-navHelper (13px)** | partial | text-nav present; text-navHelper missing. |
| **z-index** | ✗ | only in in-app `tokens.ts`. |

### Build pipeline

`./run.sh tokens` → wraps `pnpm build` in `design-system/tokens/` → `style-dictionary build --config config.js` emits `build/tokens.css`, `tokens.js`, `tokens.d.ts`, `tokens.scss`, `tokens.flat.json`, plus iOS/Android. Pipeline works (build/ artefacts are recent and consistent with source).

### Naming convention

Mixed. Source uses semantic groups (`color.brand.red`, `semantic.ink.body`, `variant.editorial.bg.warm`). Style Dictionary auto-flattens into `--color-brand-red`, `--semantic-ink-body`, `--variant-editorial-bg-warm` etc. **Drift: in-app `theme.css` exposes a different namespace (`--brand-red`, `--text-2xs`, `--button-min-width-sm`)** that consumers actually depend on. Two parallel CSS variable namespaces is the single biggest portability blocker.

### Export formats present

CSS vars (`tokens.css`), JS ES6 + d.ts (`tokens.js`/`.d.ts`), SCSS, flat JSON, iOS Swift class, Android XML. **No semantic TS types** (e.g. `type BrandColor = ...`) emitted by SD format used. The richer TS types live in `core/src/design-system/tokens.ts` — a hand-maintained parallel file.

---

## 4. Forensic — WHAT IS BROKEN in v1

> WHEN annotations are marked "unknown" because both `core/` and `dashboard/` have private `.git` repos that this audit is read-only against; commit history not parsed.

### 4.1 Wrong tech stack mixing — `package.json` declares full Figma Make payload, almost none of it used

**WHAT:** `core/package.json` declares 24 `@radix-ui/*` packages, `@mui/material` 7.3.5, `@mui/icons-material` 7.3.5, `@emotion/react`, `@emotion/styled`, plus `react-day-picker`, `cmdk`, `vaul`, `input-otp`, `embla-carousel-react`, `react-popper`, `react-resizable-panels`, `react-responsive-masonry`, `react-slick`, `react-dnd`, `react-dnd-html5-backend`, `next-themes`, `tw-animate-css`, `react-hook-form`, `react-day-picker`, `date-fns`, `recharts`, `tailwind-merge`, `class-variance-authority`, `react-router-dom@7`, `@phosphor-icons/react`, `motion@12`, `sonner`, `@popperjs/core`.
**Verified usage in `core/src/`:** zero imports for `@radix-ui/*`, `@mui/*`, `@emotion/*`. Phosphor used 2 files. `react-router-dom` used 1 file (App.tsx, the playground only). Lucide imported in 69 files (real). All other deps either unused or used by 1–2 files.
**WHY:** Universal Figma Make export signature carried over verbatim. Same dead-dep pattern documented in cross-project synthesis (V0_lite, report-store, V0.2 all hit). DS source was never cleaned up.
**HOW:** Bloats install (~600+ MB `node_modules/.pnpm/` from this dep set). Confuses consumers about what's "the standard". Three-icon-libs and multi-Radix story repeats per Next port.
**WHEN:** unknown — Figma Make export root.
**WHERE:** `/Users/vishalchauchan/Downloads/Anti-folder01/design-system/core/package.json` lines 11-69. Same file `dashboard/package.json` lines 11-67.

### 4.2 `vite-env.d.ts` declares `figma:asset/*` virtual module — Vite-only

**WHAT:** Both `core/src/vite-env.d.ts` and `dashboard/src/vite-env.d.ts` declare the `figma:asset/*` module.
**WHY:** Required by Figma Make's local resolver. Standard Vite or Next has no equivalent.
**HOW:** Any consumer importing `Testimonials.tsx`, `HomeSectionsC.tsx`, or `dashboard/src/app/components/ResourcesSection.tsx` will fail to resolve `figma:asset/<hash>.png` import statements at build time.
**WHEN:** unknown — Figma Make export root.
**WHERE:**
- `core/src/app/components/Testimonials.tsx` lines 17-24 (8 trust-logo imports).
- `core/src/app/components/HomeSectionsC.tsx` (1 import).
- `core/src/app/components/ResourcesSection.tsx` (figma asset references).
- `core/src/vite-env.d.ts:3`, `dashboard/src/vite-env.d.ts:3`.

### 4.3 `App.tsx` uses `react-router-dom` BrowserRouter — incompatible with Next 15 file router

**WHAT:** `core/src/app/App.tsx:1` `import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';`
**WHY:** SPA playground. Not part of the DS surface, but it's the only thing that makes the package "an app" at all.
**HOW:** Cannot consume `App.tsx` from a Next 15 host; v2 must drop `App.tsx` entirely or move it under a `playground/` subpath that's excluded from the package `exports` map.
**WHEN:** unknown.
**WHERE:** `core/src/app/App.tsx`.

### 4.4 Token namespace drift — atoms reference `--brand-red`, canonical exports `--color-brand-red`

**WHAT:** `Button.tsx:68` uses `var(--brand-red)`. `theme.css:` defines `--brand-red`, `--brand-red-hover`, `--brand-red-active`. Style Dictionary `build/tokens.css` emits `--color-brand-red`, no plain `--brand-red`.
**WHY:** `theme.css` (751 LOC) was hand-authored before Style Dictionary was wired. SD build added but never reconciled with the in-app names. Atoms continued to consume the local namespace.
**HOW:** Any consumer who imports the canonical `tokens.css` but not `theme.css` will see Button render with the CSS-var fallback (`var(--brand-red, ???)`). Many `var()` calls don't even pass a fallback (e.g. `var(--button-height-md)` in Button.tsx:115). Result: silent zero-height button on Next ports unless `theme.css` is hand-copied.
**WHEN:** unknown.
**WHERE:**
- `core/src/styles/theme.css` (entire file vs `tokens/build/tokens.css`).
- `core/src/app/components/Button.tsx:68, 105-141, 172-174`.
- Any atom calling `var(--*)` without verifying canonical name.

### 4.5 Two parallel token sources — `tokens/tokens.json` (DTCG) and `core/src/design-system/tokens.ts` (TS literal)

**WHAT:** `core/src/design-system/tokens.ts` is a 330-LOC TS source with `colors`, `gradients`, `typography`, `spacing`, `borderRadius`, `shadows`, `easing`, `duration`, `breakpoints`, `layout`, `opacity`, `zIndex`, `designSystem` const exports plus utility types — none of which exist in `tokens/tokens.json`.
**WHY:** Canonical token source moved to DTCG-formatted `tokens/tokens.json` 2026-05-01 per CLAUDE.md, but the in-app TS source was never deleted or generated from canonical.
**HOW:** Drift is observable now: `5xl` value `4.769rem` (in-app) vs `4.768rem` (canonical) — values disagree by 0.001 rem. Border-radius scale disagrees: in-app `image/small/large` (3 tiers), canonical `image/button/card/pill` (4 tiers). Shadows / motion / breakpoints / z-index exist only in in-app and will silently disappear on tokens-only consumers.
**WHEN:** unknown — both predate 2026-05-01 reorganization.
**WHERE:** `core/src/design-system/tokens.ts` vs `design-system/tokens/tokens.json`.

### 4.6 Badge.tsx — 753 LOC megacomponent

**WHAT:** Single file exporting 11 components (`Badge`, `SectionLabel`, `StepPill`, `ObjectivePill`, `ObjectivePillInteractive`, `InfoCardLabel`, `CategoryBadge`, `StatusBadge`, `InfoBadge`, `MutedBadge`, `ClickableBadge`) plus `BADGE_TOKENS` constant.
**WHY:** Iterative additions over time, no extraction discipline.
**HOW:** Typecheck cost on every consumer build. Cannot tree-shake one variant. Cross-project synthesis flagged "Badge 703 LOC" as a hot spot — has since grown.
**WHEN:** unknown.
**WHERE:** `core/src/app/components/Badge.tsx`.

### 4.7 Inline `style={{}}` density — 1207 sites in `core/src/app/components/`

**WHAT:** `grep -rE 'style=\{\{' src/app/components/ | wc -l` → **1207**. Sample: `Button.tsx:159` `backgroundImage: 'linear-gradient(90deg, #141016, #656565, #141016)'`. `Button.tsx:165` `linear-gradient(90deg, #b01f24, #eb484e, #b01f24)`.
**WHY:** Figma Make export pattern + iterative shipping w/o lint enforcement.
**HOW:** Every inline-style site is an off-token risk. Atoms cannot enforce theme via CSS layer — can't be re-themed by cinematic-dark variant unless rewritten to consume CSS vars.
**WHEN:** unknown.
**WHERE:** spread across components dir; concentrated in Badge.tsx, Button.tsx, Navbar.tsx, hero/case-study sections.

### 4.8 Hex literals in atoms — 436 sites

**WHAT:** `#xxxxxx` literal count under `core/src/app/components/`: 436 raw matches (excluding pure comments). Navbar.tsx alone has 44.
**WHY:** Figma Make output preserves exact paint values. No lint rule against.
**HOW:** Cinematic-dark variant cannot override hex literals embedded in component bodies.
**WHEN:** unknown.
**WHERE:** Top concentrations: `Navbar.tsx` (44), `Button.tsx` (4), `Badge.tsx` (1), `Tooltip.tsx` (0), and ~390 spread across the remaining 95 component files.

### 4.9 Tailwind arbitrary `[Npx]` / `[#xxx]` — 850 sites

**WHAT:** `grep -rE '\[#[0-9a-fA-F]{3,8}\]|\[[0-9]+px\]'` → 850. Sample: `Button.tsx:97 'h-7 min-w-[56px]'`, `Button.tsx:202 'from-[#b01f24] via-[#eb484e]'`, `Button.tsx:200 'absolute inset-0 w-[200%]'`.
**WHY:** Figma Make output + ad-hoc stylistic adjustments.
**HOW:** Off-scale spacing breaks the 4px grid claim. Off-token color breaks the variant overlay.
**WHEN:** unknown.
**WHERE:** every atom + organism, varying density.

### 4.10 Zero `'use client'` markers — Next 15 RSC blocker

**WHAT:** `grep -rEl "'use client'" core/src/` → **0**.
**WHY:** Vite has no RSC concept; the directive is meaningless inside `core/`.
**HOW:** Once consumed from Next 15 App Router, every component using `useState`/`useRef`/`useEffect` (essentially every interactive atom — Button, Badge, Filter*, Card*, all hooks) needs `'use client'` at top of file or it fails server-render.
**WHEN:** n/a — never added because Vite-only.
**WHERE:** every interactive `.tsx` in `src/app/`.

### 4.11 Duplicate hook directories

**WHAT:** Hooks live in `src/app/hooks/` (15 hooks, the index references all) AND `src/app/components/hooks/` (5 hooks: `useCrossfade`, `useMountTransition`, `useProgressiveLoad`, `useReportFilters`, `index.ts`). Same file names, parallel locations.
**WHY:** Likely partial refactor where some atoms imported from `./hooks` (relative) and never updated to canonical path.
**HOW:** Drift risk. Tree-shaking ambiguity. Different bug fixes can land in only one copy.
**WHEN:** unknown.
**WHERE:** `core/src/app/hooks/` vs `core/src/app/components/hooks/`.

### 4.12 ImageWithFallback is a stub — silently skips fallback

**WHAT:** `core/src/app/components/figma/ImageWithFallback.tsx` is a 13-LOC pass-through `<img {...props} />`.
**WHY:** GitHub repo shim noted in file comment: "advanced fallback behavior" lives in Figma Make environment, GitHub copy is a no-op.
**HOW:** Any molecule (`ReportCard`, etc.) importing this expects fallback handling that isn't there. On broken-URL images we get the browser default broken-image icon, not the designed fallback.
**WHEN:** Captured by file comment — at GitHub-export time.
**WHERE:** `core/src/app/components/figma/ImageWithFallback.tsx`.

### 4.13 Three filenames for one atom (`AnimatedArrow`)

**WHAT:** `AnimatedArrow.tsx` (component), `AnimatedArrowQuickRef.tsx` (docs surface), `ArrowAnimationTest.tsx` (dev-only test). Plus `_dev-notes/AnimatedArrowDemo.tsx`. Plus `README_ANIMATED_ARROW.md` + `ARROW_ANIMATION_EXPLAINED.md` + `_dev-notes/ARROW_ANIMATION_BUG_FIX.md` + `_dev-notes/SHIMMER_ARROW_COMPATIBILITY_ANALYSIS.md`.
**WHY:** Iterative dev under Figma Make + later cleanup didn't collapse.
**HOW:** Confusion / 4× the maintenance.
**WHEN:** unknown.
**WHERE:** as above.

### 4.14 26 `.md` files inside `core/`

**WHAT:** 18 at root + 8 inside `src/app/components/`. Examples at root: `14PX_DESIGN_SYSTEM_INTEGRATION.md`, `BADGES_DOCUMENTATION.md`, `COMPONENT_GUIDELINES_4WH.md`, `DESIGN_SYSTEM_AI_CONTEXT.md`, `DESIGN_SYSTEM_UPDATES.md`, `FIGMA_MAKE_IMPORT_PROMPTS.md`, `FILTER_SEARCH_SYSTEM_4WH.md`, `GITHUB_PUSH_GUIDE.md`, `GITHUB_REPO_MANIFEST.md`, `HANDOVER.md`, `PROJECT_STRUCTURE.md`, `QUICK_START_PROMPT.md`, `RESOURCE_CARD_DOCUMENTATION.md`, `REPORT_STORE_COMPONENTS_4WH.md`, `STATUS.md`, `TECHNICAL_HANDOVER.md`, `design-system-checklist.md`, `4WH_AUDIT.md` (the last file at the design-system root, not core). Inside src: `LINK_SYSTEM_*` ×2, `NAVBAR_*` ×2, `BUTTON_SYSTEM.md`, `ARROW_*` ×2, `README_ANIMATED_ARROW.md`.
**WHY:** Phase / handover / Figma-import / GitHub-push docs accumulated, no doc-rot review.
**HOW:** Pollutes the package surface. Several are stale (Figma Make Import, GitHub Push) — not relevant once v2 is in pnpm workspace.
**WHEN:** unknown.
**WHERE:** `core/*.md`, `core/src/app/components/*.md`, plus `core/_dev-notes/`, `core/ai-context/`.
**Spec / live / stale split:**
- *Likely live:* `STATUS.md`, `HANDOVER.md`, `README.md`, `COMPONENT_GUIDELINES_4WH.md`, `BADGES_DOCUMENTATION.md`, `RESOURCE_CARD_DOCUMENTATION.md`, `BUTTON_SYSTEM.md`, `LINK_SYSTEM_DOCUMENTATION.md`, `NAVBAR_RESPONSIVE.md`, `NAVBAR_TWO_STATE_SYSTEM.md`.
- *Almost certainly stale:* `FIGMA_MAKE_IMPORT_PROMPTS.md`, `GITHUB_PUSH_GUIDE.md`, `GITHUB_REPO_MANIFEST.md`, `QUICK_START_PROMPT.md`, `14PX_DESIGN_SYSTEM_INTEGRATION.md`, `DESIGN_SYSTEM_UPDATES.md`, `design-system-checklist.md`, `_dev-notes/*`.
- *Mislabeled docs (live, but wrong location):* `ARROW_ANIMATION_EXPLAINED.md`, `LINK_SYSTEM_QUICK_REFERENCE.md`, `BUTTON_SYSTEM.md` (should be component JSDoc or sibling `.md` co-located with component), and `BADGES_DOCUMENTATION.md` (a 4WH spec; belongs with Badge atom).

### 4.15 `core/` and `dashboard/` are functionally duplicates

**WHAT:** `diff -q` shows identical filename sets across `components/`, `molecules/`, `organisms/`, `hooks/`, with the dashboard adding `ui/` shadcn primitives + `DashboardLayout.tsx`.
**WHY:** `dashboard/` was forked from `core/` for editorial-light dashboard styling; never re-merged.
**HOW:** Bug fix in `core/Badge.tsx` doesn't propagate to `dashboard/Badge.tsx` automatically. Two of every atom maintained, every drift compounding.
**WHEN:** unknown.
**WHERE:** entire trees of `core/src/app/components/` vs `dashboard/src/app/components/`.

### 4.16 Recharts dependency declared but molecules use it inconsistently

**WHAT:** `package.json` declares `recharts@2.15.2`. `ResponseChart.tsx` (molecule) is the only file likely using charts. CLAUDE.md states **Highcharts is the chart standard for Aura ports.**
**HOW:** v1 charts are recharts. v2 must add Highcharts theme + 5 chart presets per recipes. Recharts can stay or be dropped.
**WHEN:** existing.
**WHERE:** `core/src/app/components/molecules/ResponseChart.tsx`.

### 4.17 No `'exports'` map / no peerDependencies in package.json

**WHAT:** `core/package.json` has `private: true` and `react`/`react-dom` under `dependencies`. No `exports`, `main`, `module`, `types`, `peerDependencies`, `sideEffects`.
**HOW:** Cannot be consumed via `"@kenresearch/design-system": "workspace:*"`. Workspace install will pull in core's react@19 alongside the consumer's react@19, doubling React.
**WHEN:** unknown — never set up for distribution.
**WHERE:** `core/package.json`.

### 4.18 Missing `import 'highcharts'`-style chart strategy

**WHAT:** No chart palette tokens, no Highcharts theme module anywhere in `design-system/`. Recipes (`recipes/case-study.md`, `report-detail.md`) don't currently document chart implementation choices.
**WHY:** Decision made post-DS-build; never landed.
**HOW:** Each Next port will reinvent.
**WHERE:** missing.

### 4.19 Implicit weak typing on `cloneElement` cast

**WHAT:** `Button.tsx:187` `cloneElement(iconChild as React.ReactElement<any>, ...)`.
**WHY:** Easy escape hatch.
**HOW:** Hides icon-prop misuse from typecheck.
**WHERE:** `Button.tsx:187`. Likely repeats elsewhere.

### 4.20 String-arg APIs co-exist with typed APIs

**WHAT:** Button has typed `ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'brand'` (good). But `className?: string` accepts arbitrary tw classes (`from-[#b01f24]`, `bg-white/10`) with no rule against off-token. Many other atoms accept a free-form `className` and use it to pass `[Npx]` arbitraries.
**HOW:** Consumers can override with off-token at any callsite without lint complaint.
**WHERE:** every atom with `className?: string` prop.

### 4.21 Atoms that should use shadcn primitives but instead reimplement

**WHAT:** `Tooltip.tsx`, `FilterCheckbox.tsx`, `FilterAccordion.tsx`, `ContactModal.tsx`, `MobileFilterSheet.tsx` — none import `@radix-ui/*` despite Radix being declared. Each reimplements the primitive (often less-accessible).
**WHY:** Figma Make export carries the Radix decl but Make's compiled SVG output replaces actual primitives.
**HOW:** Loses Radix's a11y baseline (focus-trap, ESC, ARIA).
**WHERE:** atoms above.

---

## 5. Coverage gap analysis vs cross-project POSITIVE list

Per `A-synthesis-cross-project.md` — PRESENT / PARTIAL / ABSENT against `core/` v1.

### Tokens

| Item | Status | Path / note |
|---|---|---|
| Full warm scale 50–900 | **PRESENT** | `tokens/tokens.json` `color.ramp.warm`. |
| Periwinkle 50–900 | **PRESENT** | `color.ramp.periwinkle`. |
| Perano 50–900 | **PRESENT** | `color.ramp.perano`. |
| Purple 50–900 | **PRESENT** | `color.ramp.purple`. |
| `gradients.brandRed` TS export | **PARTIAL** | exists in `core/src/design-system/tokens.ts:50` but not in DTCG canonical. |
| `iconColors.ts` mapping | **PRESENT** (in atom layer) | `core/src/app/components/iconColors.ts` — but token-side has no source. |
| `chartColors.ts` palette | **ABSENT** | no chart palette in canonical or in-app. |
| `--rc-*` ResourceCard tokens (light/dark/badge) | **ABSENT** | not declared. |
| `--bg-composition-warm-editorial` gradient | **ABSENT** | not declared. |
| `--container-*` page/content/narrow/prose/compact | **PRESENT** | `tokens.json` `container.*`. |
| `--text-nav` 14px | **PRESENT** | `typography.size.nav`. |
| `--text-navHelper` 13px | **ABSENT** | missing tier. |
| `--button-min-width-{sm,md,lg}` | **ABSENT in canonical**, **PRESENT in `theme.css`** — drift. |

### Atoms

| Item | Status | Path |
|---|---|---|
| FadeInSection | **PRESENT** | `core/src/app/components/FadeInSection.tsx`. |
| BackToTop | **PRESENT** | `molecules/BackToTop.tsx` (lives in molecules). |
| LoadMoreSentinel | **PRESENT** | `molecules/LoadMoreSentinel.tsx`. |
| RevealImage | **PRESENT** | `molecules/RevealImage.tsx`. |
| IconBadge | **PRESENT** | `core/src/app/components/IconBadge.tsx`. |
| IndustryBadge | **PRESENT** | `molecules/IndustryBadge.tsx`. |
| ActiveFilterChip | **PRESENT** | `molecules/ActiveFilterChip.tsx`. |
| OverheadText (chapter overhead) | **ABSENT** | recipe references only. |
| BodyText (editorial body wrapper) | **ABSENT** | inline used everywhere. |
| ChartTitleHeader | **ABSENT**. |
| KenToaster (sonner brand wrapper) | **ABSENT** | sonner declared, no atom wrapper. |

### Molecules

| Item | Status | Path |
|---|---|---|
| StatCard + StatCardGroup | **PARTIAL** | `molecules/StatCard.tsx` exists; no `StatCardGroup`. |
| TextCard | **ABSENT**. |
| TimelineCard | **ABSENT**. |
| AnalysisCard | **ABSENT**. |
| SegmentationCard | **ABSENT**. |
| StakeholderCard | **ABSENT**. |
| MethodologyCard | **ABSENT** (organism MethodologySection exists). |
| ComparisonParameterCard | **ABSENT** (organism ComparisonTable exists). |
| PhaseCard | **ABSENT**. |
| FAQItem (Accordion variant) | **ABSENT** (`FilterAccordion` exists; no FAQ variant). |
| NavDropdown (mega-menu) | **ABSENT** (`Navbar.tsx` 442 LOC is monolithic). |
| HorizontalScroll | **PRESENT** | `molecules/HorizontalScroll.tsx`. |
| EmptyState (brand wrapper) | **PRESENT** | `molecules/EmptyState.tsx`. |
| SkeletonCard (ReportCard-shape) | **PRESENT** | `molecules/SkeletonCard.tsx`. |

### Hooks

| Item | Status | Path |
|---|---|---|
| useAnimatedCounter | **PARTIAL** | `useCounter.ts` exists; verify counter+animation combined. |
| useShimmer | **PRESENT** | `hooks/useShimmer.ts`. |
| useFocusTrap | **ABSENT**. |
| useKeyboardNavigation | **ABSENT**. |
| useProgressiveLoad | **PRESENT** | `hooks/useProgressiveLoad.ts`. |
| useCrossfade | **PRESENT** | `hooks/useCrossfade.ts`. |
| useMountTransition | **PRESENT** | `hooks/useMountTransition.ts`. |
| useScrollSpy | **PARTIAL** | `useActiveSection.ts` + `useSectionProgress.ts` overlap; consolidate. |
| (extras present) | useScrollAnimation, useScrollDirection, useReadingProgress, useHeroVisibility, useMagneticEffect, useResponsiveGutter, useReportFilters | promote. |

### Patterns to document

| Pattern | Status |
|---|---|
| Scroll-spy sticky TOC + collapse-to-icons | **ABSENT** — `TableOfContents.tsx` exists, no collapse mode. |
| Sidebar status states (completed/active/upcoming) | **PARTIAL** — `IndustrySidebar.tsx` exists. |
| Chapter overhead-text "CHAPTER X — Name" | **ABSENT** as atom. |
| Mega-menu industries split-column | **ABSENT** — Navbar monolithic. |
| TOC time-estimates per chapter | **ABSENT**. |
| Sortable company table | **PARTIAL** — `ComparisonTable.tsx` close. |
| Floating CTA post-hero scroll trigger | **PARTIAL** — `StickyCTA.tsx` exists. |
| Final CTA gradient banner | **PRESENT** — `FinalCTASection.tsx`. |
| ChapterShell decomposition (data.ts + 5 components) | **ABSENT**. |
| Hero theme variant DSL (`heroThemes.ts`) | **ABSENT**. |
| 92-5-3 hierarchy + `validateColorHierarchy()` runtime | **ABSENT** runtime; 92-5-3 documented in tokens.ts comments. |
| Atom-promotion track marker | **ABSENT** as convention. |
| Listing kit (ListingToolbar + ListingContextBanner + CardListing + MobileFilterSheet + MobileFilterBar + useReportFilters) | **PARTIAL** — `ListingToolbar`, `CardListing`, `MobileFilterSheet`, `useReportFilters` exist; `ListingContextBanner` and `MobileFilterBar` missing. |

---

## 6. Anti-pattern enforcement readiness

Per the 11 NEGATIVE items.

| # | Item | Implementation suggestion in v2 |
|---|---|---|
| 1 | TS-typed prop API (no string color/size args) | Atom-level `type FooSize = 'xs'\|'sm'\|...`; ban `style?: CSSProperties` on atoms; expose only `variant`/`size`/`tone` enums. ESLint `@typescript-eslint/no-restricted-types` to flag exported atoms with `string` color props. |
| 2 | Lint rule against inline `style={{}}` color/size | ESLint custom rule (or `eslint-plugin-react/no-unknown-property` extension) flagging `style={{ color, background, fontSize, padding, margin, width, height, borderColor, boxShadow }}`. Permit `style={{ transform, opacity, transitionDuration }}` (motion-only). |
| 3 | Lint against `[#xxx]` and `[Npx]` arbitrary tw | Stylelint or custom ESLint regex on JSX `className` prop matching `\[#[0-9a-fA-F]+\]` and `\[\d+(px|rem)\]`. Run on every commit via lefthook. |
| 4 | Document Noto Serif display invariant | `core-v2/docs/typography.md` + JSDoc tag on `BodyText`/`Heading` atoms (`@invariant Display family is Noto Serif. Do not override.`). Stylelint custom rule banning `font-family: ... DM Sans` on selectors targeting heading roles. |
| 5 | Document Lenis-first | `core-v2/docs/scroll.md` + lint rule against `html { scroll-behavior: smooth }` in CSS files (Stylelint `declaration-property-value-disallowed-list`). |
| 6 | Body type rules (no double opacity + secondary color) | `BodyText` atom owns this — accept `tone?: 'primary'|'secondary'|'muted'`, never accept opacity prop. ESLint custom rule on JSX flagging `BodyText` with both `color=` and `opacity=`. |
| 7 | Editorial-light section bg alternation | Recipe lint: scan organism rendering for `<SectionWrapper bg=...>` sequence and require alternation per recipe L50. Run as pre-handover gate (`pnpm lint:recipes`). |
| 8 | Single canonical DS source | Workspace rule: `pnpm-workspace.yaml` whitelists `design-system/core-v2/`. Lint each consumer for forbidden imports `from 'src/design-system/'` (must be `@kenresearch/design-system/...`). Husky pre-commit. |
| 9 | No "mandatory" off-scale spacing in token files | DTCG schema validator (`scripts/validate.mjs` extension) enforces `spacing.*` values must be multiples of `0.25rem` (4px). |
| 10 | Define chart palette | New token group `chart` with 8-color palette anchored to brand red + neutrals + 2 periwinkle/perano accents. Ship `core-v2/charts/highchartsTheme.ts` (DS-color-only). Document in `recipes/charts.md`. |
| 11 | Variant gate (cinematic-dark requires recipe override) | Recipe header check: top of organism file must contain `// recipe-variant: <editorial-light|cinematic-dark>`. ESLint custom rule. v2 default = editorial-light; cinematic-dark requires explicit `// @recipe-override cinematic-dark` comment. |

---

## 7. Heal plan — `design-system/core-v2/` clean rebuild

### Sequencing principles

- v1 (`design-system/core/`) preserved read-only; rename to `core-legacy-v1/` as final move at end of step 0.
- v2 built green — no Figma Make signatures, no MUI/Emotion/Radix dead deps.
- pnpm workspace exposes v2 + tokens; consumers import via `@kenresearch/design-system`.
- Vite kept for v2 dev/preview only; build output ships React components agnostically.

### Steps

**Step 0 — Pre-flight (S, no deps)**
Scope: read-only audit pass.
Deliverable: this report committed at `docs/aura-sprint-2026-05-07-port/B-DS-FORENSIC-v1.md` for reference.

**Step 1 — Scaffold `core-v2/` (S)**
Scope: directory skeleton + Vite config + package.json with `exports` map.
Deliverable:
```
core-v2/
├── src/
│   ├── atoms/, molecules/, organisms/, patterns/, hooks/, charts/, lib/
│   ├── styles/{base.css, layers.css, editorial-light.css, cinematic-dark.css}
│   └── index.ts                  # public surface
├── playground/                   # Vite SPA, NOT in package exports
├── package.json (peerDeps react^19, sideEffects ['*.css']) + tsconfig + vite.config.ts
```
Deps: Step 0.

**Step 2 — Token foundation (S)**
Scope: port `tokens/tokens.json` → fix gaps (text-navHelper, button-min-width-*, chart palette, motion, shadow, spacing scale 4-base, rc-*, bg-composition-warm-editorial). Re-build Style Dictionary. **Single namespace** — drop `--brand-red` (in-app) in favour of canonical `--color-brand-red`; provide deprecation alias for one cycle.
Deliverable: `tokens/tokens.json` updated + `tokens/build/*` regenerated.
Deps: Step 1.

**Step 3 — Variant scaffolding (M)**
Scope: CSS layer system (`@layer reset, base, tokens, atoms, components, recipe-overrides`). Two variant CSS files apply at body level via `data-variant="editorial-light"` (default) or `data-variant="cinematic-dark"`. No flicker — single CSS load.
Deliverable: `styles/layers.css`, `editorial-light.css`, `cinematic-dark.css`. Theme switcher hook `useVariant`.
Deps: Step 2.

**Step 4 — Highcharts theme + 5 presets (M)**
Scope: `charts/highchartsTheme.ts` (DS-color-only), `charts/presets/` with `area.ts`, `line.ts`, `pie.ts`, `bar.ts`, `column.ts`. Each preset reads `--chart-palette-*` CSS vars at runtime; falls back to JS imports for SSR.
Deliverable: 5 preset modules + `<KenChart>` thin wrapper.
Deps: Step 2.

**Step 5 — Atom layer (L)**
Scope: build all POSITIVE-list atoms with typed APIs, no hex/inline-style. Port v1 atoms — Badge.tsx (split into 4 files: Badge, SectionLabel, Pill, ChipBadge), Button (drop inline-style backgrounds, move to CSS file consuming tokens), CTALink, InlineLink, Card, Tooltip (back to Radix `@radix-ui/react-tooltip`), Container, IconBadge, IndustryBadge, ActiveFilterChip, FadeInSection, BackToTop, LoadMoreSentinel, RevealImage, ViewToggle, Filter* (8). Add new atoms: OverheadText, BodyText, ChartTitleHeader, KenToaster.
Each file gets `'use client'` at top.
Deliverable: 35–40 atom files + `atoms/index.ts` barrel.
Deps: Steps 2, 3.

**Step 6 — Molecule layer (L)**
Scope: port StatCard, EmptyState, SkeletonCard, HorizontalScroll, ReportCard, CardMetaRow, CardFooterRow, AnalystPickCardB, DataHighlightCard, CategoryListCard, MobileFilterSheet, FilterAccordion, SidebarPanel, SurveyCard, ResponseChart (rewrite on Highcharts), QuestionPreview, SurveySkeleton, CardReveal, ScrollFade, CompletionBadge. Add: TextCard, TimelineCard, AnalysisCard, SegmentationCard, StakeholderCard, MethodologyCard, ComparisonParameterCard, PhaseCard, FAQItem, StatCardGroup, ListingContextBanner, MobileFilterBar.
Deliverable: 30–35 molecules + `molecules/index.ts`.
Deps: Step 5.

**Step 7 — Organism layer (L)**
Scope: port the 30 organisms. Decompose Navbar (442 LOC) into Navbar shell + NavDropdown molecule + MegaMenu organism. Drop docs-only organisms (`*Documentation`, `*Content`) — those move to a separate `core-v2-playground/` workspace package.
Deliverable: ~25 organisms (consolidated) + `organisms/index.ts`.
Deps: Step 6.

**Step 8 — Hook layer (M)**
Scope: collapse the two hook directories. Port 15 from primary + add `useFocusTrap`, `useKeyboardNavigation`, `useScrollSpy` (consolidating `useActiveSection` + `useSectionProgress`), `useAnimatedCounter` (merging `useCounter` + animation).
Deliverable: 18-20 hooks in `hooks/` + `hooks/index.ts`.
Deps: Step 1.

**Step 9 — Pattern utilities (M)**
Scope: ScrollSpyTOC (with collapse-to-icons), FloatingCTA, BackToTop wrapper, hero-glass-card pattern, KenToaster wrapper, ChapterShell decomposition utility, heroThemes.ts DSL, validateColorHierarchy() runtime checker, atom-promotion marker comment convention.
Deliverable: `patterns/*` files + `patterns/index.ts`.
Deps: Steps 5, 6, 8.

**Step 10 — Anti-pattern enforcement (M)**
Scope: ESLint config + custom rules per Section 6. Stylelint config. Recipe-lint script. Husky pre-commit.
Deliverable: `core-v2/.eslintrc.cjs`, `.stylelintrc`, `scripts/lint-recipes.mjs`, `lefthook.yml`.
Deps: Steps 5, 6, 7.

**Step 11 — Documentation (S)**
Scope:
- `core-v2/COMPONENT_REFERENCE.md` (single source of truth, generated via `react-docgen` + manual edits).
- `core-v2/RECIPES.md` (links to existing `design-system/recipes/*.md`).
- `core-v2/MIGRATION_FROM_V1.md` (per-atom mapping table).
- `core-v2/ANTI_PATTERNS.md` (the 11 NEGATIVE items + enforcement).
- `core-v2/CHANGES.md` (vs v1 — breaking + new).
Move v1's 8 colocated `.md`s into JSDoc inside the matching atom file or delete if stale.
Deliverable: 5 docs at `core-v2/` root.
Deps: Steps 5–10.

**Step 12 — Workspace package.json `exports` (S)**
Scope: configure `core-v2/package.json` with subpath exports — `.`, `./atoms`, `./molecules`, `./organisms`, `./patterns`, `./hooks`, `./charts`, `./tokens`, `./styles/editorial-light.css`, `./styles/cinematic-dark.css`. `peerDependencies: { react: '^19', react-dom: '^19' }`. `sideEffects: ['*.css']`.
Deliverable: shippable `package.json`.
Deps: Step 11.

**Step 13 — Verification: throwaway Next 15 consumer (M)**
Scope: scaffold `projects/_ds-verify/` (Next 15 + React 19 + Tailwind v4). Import every atom + 1 molecule per category + 1 organism. Build + run Playwright smoke + `next build` clean. Confirm SSR-safe (no "useState in server component" errors), confirm Highcharts SSR-wrapped.
Deliverable: passing Next 15 consumer build + smoke screenshot.
Deps: Step 12.

**Step 14 — Cutover (S)**
Scope: rename `design-system/core/` → `design-system/core-legacy-v1/` (read-only). Move v1 archived docs (RECIPES, COMPONENT_REFERENCE) to `docs/legacy/` if not preserved in `core-legacy-v1/`. Delete `design-system/dashboard/` after extracting `DashboardLayout.tsx` + `ui/` shadcn into v2 (or note future need).
Deliverable: legacy frozen + `HANDOVER_TRACKER.md` updated.
Deps: Step 13.

**Step 15 — Tokens-build pipeline regression test (S)**
Scope: `pnpm -F @kenresearch/tokens build` smoke + diff against pre-cutover snapshot. Catch any unintended drift in semantic tokens / variant overlays.
Deliverable: green snapshot diff.
Deps: Step 2.

---

## 8. pnpm workspace setup plan

### `pnpm-workspace.yaml` location

`/Users/vishalchauchan/Downloads/Anti-folder01/pnpm-workspace.yaml`

```yaml
packages:
  - 'design-system/tokens'
  - 'design-system/core-v2'
  - 'projects/V0_lite_report'
  - 'projects/report-store'
  - 'projects/V0.2_report'
  # 'design-system/core-legacy-v1'  # explicitly excluded
  # 'design-system/dashboard'       # excluded after Step 14
  # 'projects/casestudy-templates/*'
  # 'projects/topnav-v32'
```

### DS v2 `package.json` shape

```jsonc
{
  "name": "@kenresearch/design-system",
  "version": "0.1.0",
  "private": false,
  "type": "module",
  "sideEffects": ["*.css", "**/*.css"],
  "exports": {
    ".":            { "types": "./dist/index.d.ts", "default": "./dist/index.js" },
    "./atoms":      { "types": "./dist/atoms/index.d.ts", "default": "./dist/atoms/index.js" },
    "./molecules":  { "types": "./dist/molecules/index.d.ts", "default": "./dist/molecules/index.js" },
    "./organisms":  { "types": "./dist/organisms/index.d.ts", "default": "./dist/organisms/index.js" },
    "./patterns":   { "types": "./dist/patterns/index.d.ts", "default": "./dist/patterns/index.js" },
    "./hooks":      { "types": "./dist/hooks/index.d.ts", "default": "./dist/hooks/index.js" },
    "./charts":     { "types": "./dist/charts/index.d.ts", "default": "./dist/charts/index.js" },
    "./tokens":     "@kenresearch/tokens",
    "./styles/editorial-light.css": "./dist/styles/editorial-light.css",
    "./styles/cinematic-dark.css":  "./dist/styles/cinematic-dark.css",
    "./styles/base.css":            "./dist/styles/base.css"
  },
  "peerDependencies": {
    "react":     "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "dependencies": {
    "@kenresearch/tokens": "workspace:*",
    "@radix-ui/react-tooltip":  "^1.1.8",
    "@radix-ui/react-dialog":   "^1.1.6",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-accordion":"^1.2.3",
    "@radix-ui/react-tabs":     "^1.1.3",
    "@radix-ui/react-select":   "^2.1.6",
    "lucide-react": "^0.487.0",
    "framer-motion": "^12",
    "highcharts": "^11",
    "highcharts-react-official": "^3",
    "sonner": "^2",
    "clsx": "^2",
    "tailwind-merge": "^3"
  }
}
```

### Consumer install

```jsonc
// projects/V0_lite_report/package.json
"dependencies": {
  "@kenresearch/design-system": "workspace:*",
  "@kenresearch/tokens": "workspace:*",
  "next": "^15",
  "react": "^19", "react-dom": "^19"
}
```

Import sites:
```ts
import { Button, Card, Badge } from '@kenresearch/design-system/atoms';
import { ReportCard, StatCardGroup } from '@kenresearch/design-system/molecules';
import '@kenresearch/design-system/styles/editorial-light.css';
import { tokens } from '@kenresearch/design-system/tokens';
```

---

## 9. v1 → v2 migration discipline

### v1 rename + freeze
- `design-system/core/` → `design-system/core-legacy-v1/` (after Step 14 cutover).
- File-system permissions: leave RW so git history works, but mark intent via top-level `LEGACY-READONLY.md`.
- Workspace excludes the path from `pnpm-workspace.yaml`.

### v1 archive — what survives

| File | Survives in v1 | Moved to | Deleted |
|---|---|---|---|
| `core/COMPONENT_REFERENCE.md` | ✓ archive | `docs/legacy/COMPONENT_REFERENCE-v1.md` | |
| `core/COMPONENT_GUIDELINES_4WH.md` | ✓ archive | `docs/legacy/` | |
| `core/BADGES_DOCUMENTATION.md` | folded into v2 atom JSDoc | | (after merge) |
| `core/RESOURCE_CARD_DOCUMENTATION.md` | folded into v2 atom JSDoc | | (after merge) |
| `core/BUTTON_SYSTEM.md` | folded into v2 Button JSDoc | | (after merge) |
| `core/LINK_SYSTEM_*.md` | folded into v2 CTALink/InlineLink JSDoc | | (after merge) |
| `core/NAVBAR_*.md` | folded into v2 Navbar JSDoc | | (after merge) |
| `core/4WH_AUDIT.md` | survives in legacy folder | | |
| `core/FIGMA_MAKE_IMPORT_PROMPTS.md` | | | **delete** |
| `core/GITHUB_PUSH_GUIDE.md` | | | **delete** |
| `core/GITHUB_REPO_MANIFEST.md` | | | **delete** |
| `core/QUICK_START_PROMPT.md` | | | **delete** |
| `core/14PX_DESIGN_SYSTEM_INTEGRATION.md` | | | **delete** |
| `core/DESIGN_SYSTEM_UPDATES.md` | | | **delete** |
| `core/design-system-checklist.md` | | | **delete** |
| `core/_dev-notes/*` | | | **delete** (3 files) |
| `core/ai-context/*` | rename to `core-v2/ai-context/` | preserve | |
| `core/HANDOVER.md`, `STATUS.md`, `README.md` | folded into v2 versions | | |
| `core/PROJECT_STRUCTURE.md` | replaced by v2 README | | **delete** |
| `core/TECHNICAL_HANDOVER.md` | replaced by v2 MIGRATION_FROM_V1 | | **delete** |
| `core/src/app/components/*.md` (8 files) | folded into v2 atom JSDoc | | (after merge) |
| design-system root `4WH_AUDIT.md`, `ANTI_PATTERNS.md`, `COMPONENT_REFERENCE.md` | survive at root, refresh references to v2 | | |

### Forensic doc location
`/Users/vishalchauchan/Downloads/Anti-folder01/docs/aura-sprint-2026-05-07-port/B-DS-FORENSIC-v1.md` — this report.

### v2 changes log
`/Users/vishalchauchan/Downloads/Anti-folder01/design-system/core-v2/CHANGES.md` — what's new + breaking vs v1 (token namespace renames, Badge split, Navbar decomposition, react-router removal, exports map, etc.).

---

## 10. Risks + open questions

### DS dashboard relationship
Dashboard duplicates ~80% of core. Decision needed: (a) merge `DashboardLayout.tsx` + `ui/` shadcn primitives into `core-v2/atoms/dashboard-layout/` and `core-v2/atoms/primitives/`, then delete `dashboard/`; or (b) keep `dashboard/` as a separate workspace package `@kenresearch/dashboard` consuming `core-v2`. **Recommendation: (a)** — single canonical source, shadcn primitives become `core-v2/atoms/primitives/` re-exports of the active Radix set.

### Storybook
**Recommendation: yes**. Storybook 8 consuming `core-v2` directly via the workspace; runs at `pnpm -F @kenresearch/design-system storybook`. Replaces the current `App.tsx`-as-playground pattern. Stories double as visual regression baselines (Chromatic later if needed).

### Tokens build pipeline regression risk
Low risk if Step 15 snapshot diff is enforced. Risk: any consumer depending on `--brand-red` (vs canonical `--color-brand-red`) breaks at v2 cutover. Mitigation: ship a 1-cycle compatibility CSS file `core-v2/styles/v1-compat.css` that aliases old names → canonical, opt-in.

### Cinematic-dark variant — flicker risk
CSS-layer overlay (`@layer recipe-overrides`) attaches to `data-variant="cinematic-dark"` on `<html>`. Set in root `<script>` before paint to avoid FOUC. **Open: Next 15 RSC server-set vs client-set strategy** — recommend persistent variant via cookie + read in RSC `<html data-variant={cookieVal}>`. Document in v2 docs.

### Highcharts theme bundling — per-instance vs global
Per-instance preferred (each `<KenChart>` applies its preset on construction). Global default avoided because two charts with different preset styles collide. **Open: SSR rendering** — Highcharts is browser-only; needs `dynamic({ ssr: false })` wrapper. v2 ships `<KenChart>` with that wrapper baked in for Next consumers; raw API exposed for non-Next consumers.

### Decomposition of Navbar (442 LOC)
Open: should `Navbar` stay one organism with internal sub-components, or hard-split into `Navbar` shell + `NavDropdown` molecule + `MegaMenu` organism? **Recommendation: hard-split** — matches the POSITIVE-list expectation of a `NavDropdown` molecule.

### Atom-promotion marker convention
Open: where does the marker live in v2 (top-of-file comment, JSDoc tag, decorator, separate `_atom-track.json`)? **Recommendation:** JSDoc `@promotedFrom <consumer-project>` tag on the atom export — machine-readable + lints.

### Recharts → Highcharts migration scope
`ResponseChart.tsx` is the one v1 file using recharts. Migration cost: small (one molecule, ~80 LOC equivalent rewrite). **Open: do consumers (Survey pages) accept Highcharts visual change?** — confirm with design before swap; otherwise keep recharts behind `<KenChart engine="recharts">` adapter.

### v2 React 19 RSC vs Vite playground
Vite SPA + Next 15 consumer share the same component code. Risk: `'use client'` directive is required in Next, ignored in Vite. Verified safe — Vite ignores the directive as a regular string statement. Lint rule: every interactive atom must start with `'use client'`. Atoms with no `useState`/`useEffect`/`useRef`/`useReducer`/`useContext` may omit it.

### Phosphor vs Lucide
v1 uses Lucide (69 files) and Phosphor (2 files). v2 standardize on Lucide; rewrite the 2 Phosphor sites. Consistent with cross-project synthesis "icons → lucide only".

### `peerDeps optional:true` for react
Cross-project synthesis NEGATIVE — never make react/react-dom optional peerDeps. v2 declares them as required `peerDependencies` only.

---

### Critical Files for Implementation

- /Users/vishalchauchan/Downloads/Anti-folder01/design-system/tokens/tokens.json
- /Users/vishalchauchan/Downloads/Anti-folder01/design-system/core/src/styles/theme.css
- /Users/vishalchauchan/Downloads/Anti-folder01/design-system/core/src/app/components/index.ts
- /Users/vishalchauchan/Downloads/Anti-folder01/design-system/core/src/app/components/Button.tsx
- /Users/vishalchauchan/Downloads/Anti-folder01/design-system/core/package.json