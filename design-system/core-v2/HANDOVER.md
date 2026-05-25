# HANDOVER — @kenresearch/design-system v2 (core-v2)

**For:** Tech team
**From:** Design team (Aura-assisted)
**Date:** 2026-05-15
**Version:** v0.1.0 (workspace) · pre-npm-publish

## TL;DR

Workspace-published TS library shipping atoms · molecules · organisms · hooks · shadcn UI · types · patterns for Ken Research consumer apps. Tech intake: keep current build (`pnpm build` clean), wire ESLint (lint script aspirational), optionally add Storybook stories. Consumers already wired via `workspace:*` — no breaking changes expected.

**2026-05-15 additions:** 153 `data-component` attributes added across all atoms/molecules/organisms (QA discoverability · grep-able in DOM). Foundation lock complete: 6 categories (colors · typography · spacing · elevation · radius · layout) + extras (motion · z-index · tracking · leading · status · opacity · border-opacity · icon-colors · breakpoints · containers · section-bg) — all in `src/styles/base.css` unlayered `:root` (~500 tokens). `--color-neutral-500` bumped to `#6b6b6b` for WCAG AA. `MethodologySection` eyebrow prop-lifted (hardcoded string removed). COMPOSITION_GRAMMAR.md added as third canonical doc.

## Run locally (workspace context)

```bash
# From workspace root (Anti-folder01/):
pnpm install               # installs workspace · links @kenresearch/design-system
pnpm --filter @kenresearch/design-system typecheck
pnpm --filter @kenresearch/design-system build
```

DS itself has no `dev` server — consume via one of the 4 consumer apps:

```bash
pnpm --filter @kenresearch/v0-lite-report dev     # port 3000
pnpm --filter @kenresearch/v0.2-report dev        # port 3001 (configure)
pnpm --filter @kenresearch/report-store dev       # port 3002 (configure)
pnpm --filter @kenresearch/reports-pdp-v2 dev     # port 3000
```

## Stack

- **Framework:** TypeScript library (no runtime framework dep)
- **React:** ^19 (peer dependency)
- **Tailwind:** v4 (peer · consumers own postcss)
- **Animation:** Framer Motion ^12 (no GSAP · no Lenis — both removed 2026-05-08 per dev-team parity)
- **UI primitives:** Radix UI (24 packages) · shadcn/ui ported `src/ui/` (46 primitives) · cmdk · vaul · sonner · embla-carousel-react · recharts · highcharts · react-day-picker · react-hook-form · react-resizable-panels · react-responsive-masonry · next-themes · input-otp · lucide-react
- **Tokens:** `@kenresearch/tokens` (workspace) — Style Dictionary v4 DTCG → tokens.css
- **Charts:** Highcharts via `highcharts-react-official` (theme + 5 presets in `src/charts/`)

## Public API (subpath exports)

```ts
import { Button, Card, Badge, getIndustryIcon } from '@kenresearch/design-system/atoms';
import { ReportCard, StatCard, DataHighlightCard } from '@kenresearch/design-system/molecules';
import { AnalystPicks, FiltersPanel, CaseStudyNavbar } from '@kenresearch/design-system/organisms';
import { Dialog, Popover, Sheet } from '@kenresearch/design-system/ui';
import { useScrollAnimation, useActiveSection, useReducedMotion } from '@kenresearch/design-system/hooks';
import type { ReportItem, IndustryData, ReportFilters } from '@kenresearch/design-system/types';
import { DarkGradientMesh } from '@kenresearch/design-system/patterns';
import { kenChartTheme } from '@kenresearch/design-system/charts';

// Styles
import '@kenresearch/design-system/styles/base.css';
import '@kenresearch/design-system/styles/utilities.css';
import '@kenresearch/design-system/styles/editorial-light.css';   // default
import '@kenresearch/design-system/styles/cinematic-dark.css';    // opt-in
```

## Layer inventory (post Phase 1-3 · 2026-05-13)

| Layer | Count | Export path |
|---|---|---|
| Atoms | ~20 | `/atoms` |
| Molecules | ~30 | `/molecules` |
| Organisms | ~50 | `/organisms` |
| Hooks | 23 | `/hooks` |
| Shadcn UI | 46 | `/ui` |
| Types | 13 | `/types` |
| Patterns | 4 | `/patterns` |
| Charts | theme + 5 presets | `/charts` |

**153 `data-component` attributes** added 2026-05-15 across all layers (QA discoverability · `document.querySelectorAll('[data-component]')` for DOM audit).

**Tokens:** ~500 in `src/styles/base.css` unlayered `:root` · OG short names canonical · matches 2514 OG-token refs across codebase. Foundation lock complete 2026-05-15.

## Adapter pattern (Phase 3 organisms)

Organisms that render mock data take it via props · consumer owns data:

```tsx
import { AnalystPicks, FiltersPanel } from '@kenresearch/design-system/organisms';
import { ANALYST_PICKS, FULL_REGIONS, PUBLISH_YEARS } from '@/app/components/data';
import { useReportFilters } from '@/app/hooks/useReportFilters';

const filters = useReportFilters();
<AnalystPicks picks={ANALYST_PICKS} />
<FiltersPanel filters={filters} regions={FULL_REGIONS} publishYears={PUBLISH_YEARS} />
```

`useReportFilters` is NOT shipped from DS — depends on consumer data shape. DS exports the `ReportFilters` type contract.

## Workspace consumers (current)

| Consumer | Status | DS usage |
|---|---|---|
| `projects/V0_lite_report` | cleanup | Heavy — atoms · molecules · hooks · types |
| `projects/V0.2_report` | scaffold | Atoms only (sections deferred) |
| `projects/report-store` | scaffold | Atoms only (sections deferred) |
| `projects/reports-pdp-v2` | cleanup | Heavy — atoms · molecules · charts |

## Tokens

- Source: `@kenresearch/tokens` workspace package → `design-system/tokens/build/tokens.css`
- Imported by: `design-system/core-v2/src/styles/base.css`
- Brand surfaces:
  - **Editorial-light** (default): `#f5f2f1` bg · `#000` text · Ken red `#b01f24` CTAs
  - **Cinematic-dark** (opt-in via `data-variant="cinematic"`): `#0a0a0c` bg · `#FAFAFA` text · same Ken red
- Quick ref: `Quick_start_guide.md` at workspace root

## Known issues / won't-fix

- **`pnpm lint` script broken** — references `eslint src/` but no ESLint installed in core-v2. Tech: wire workspace-shared ESLint OR remove from `package.json` scripts.
- **No Storybook stories shipped** for the 28 organisms added in Phase 2-3 (HeroSection · ChallengesSection · MethodologySection · ImpactSection · ResourcesSection · ClientContextSection · EngagementObjectivesSection · TestimonialSection · ValuePillarsSection · FinalCTASection · CaseStudyNavbar · ReadingProgressBar · StickyCTA · AnalystPicks · CardListing · CustomResearchCTA · DailyDataHighlights · FeaturedResearch · FiltersPanel · IndustrySectorsGrid · IndustrySidebar · IndustrySpotlight · KeyMarketIndicators · ListingToolbar · RecentlyViewed · RecommendedForYou · ReportPreview · ReportStoreHero). Defer · use consumer apps as live reference.
- **`FigmaButtonComparison.tsx`** stays in `src/atoms/_consumer-coupled/` excluded from build · doc-only Figma comparison · safe to delete if obsolete.
- **`playground/`** Vite SPA scaffolded but not actively maintained. Consumer apps are canonical live reference.
- **`useReportFilters` hook** lives in consumers (not DS) — depends on consumer mock data. DS ships the `ReportFilters` type shape only.
- **`StatCard` count-up opt-in** — currently default-on via `animate` prop · motion design call to default-off deferred to tech iteration.
- **Organism eyebrow strings** — `MethodologySection` prop-lifted 2026-05-15 (eyebrow no longer hardcoded). Other organisms may still have hardcoded eyebrow strings — audit on next iteration, not blocking.

## A11y baseline

- WCAG: AA target
- Per-consumer scans · DS itself has no page to scan
- `reports-pdp-v2` axe 2026-05-11: 0 critical · 0 serious (desktop + mobile)
- `prefers-reduced-motion` honored via Framer `useReducedMotion()` + CSS `motion-reduce:` utilities; `useScrollAnimation` + `useMagneticEffect` no-op when reduce-motion active

## Perf baseline

- Library only · no Lighthouse score applicable to DS itself
- Build output: `dist/` declaration-only (`emitDeclarationOnly: true`) · consumers transpile TS source via Next 15 `transpilePackages: ['@kenresearch/design-system']`
- Pre-npm-publish path: flip `package.json` exports map from `./src/*.ts` → `./dist/*.js` (note in `_exports_note` field)

## Brand tokens

- Source: `@kenresearch/tokens` workspace package
- Canonical CSS: `design-system/tokens/build/tokens.css`
- Foundation imports auto-loaded via `core-v2/src/styles/base.css`

## Animation rules

- **Framer Motion ONLY** for state · component · scroll-driven motion (GSAP + Lenis removed 2026-05-08 — dev-team parity)
- **Scroll-driven:** Framer `useScroll` + `useTransform` for parallax/scrub · `useInView` for entrance triggers · `useScrollAnimation` hook for visibility flags
- **Smooth page scroll:** native CSS `html { scroll-behavior: smooth }` in `core-v2/styles/base.css`
- **Reduced motion:** MANDATORY via Framer `useReducedMotion()` or CSS `@media (prefers-reduced-motion: reduce)` global opt-out
- **Magnetic interactions:** `useMagneticEffect` for premium CTAs only (1-2 per page max)

## Tech-team integration checklist

- [ ] Match Node version (`.nvmrc` → 20.20.1)
- [ ] Match pnpm version (`packageManager: pnpm@10.33.0`)
- [ ] Install ESLint workspace config OR remove broken `lint` script
- [ ] Optional: add Storybook stories for 28 Phase 2-3 organisms (defer · consumer apps are live reference)
- [ ] Optional: add Vitest/Jest harness · DS has zero unit tests today (intentional — visual + consumer integration testing prioritized)
- [ ] Pre-npm-publish: flip `package.json` exports map to `dist/` paths · bump version · `pnpm publish --access public` (currently `private: false` already)
- [ ] Verify consumer `transpilePackages: ['@kenresearch/design-system']` is set in each app's `next.config.ts`

## Canonical docs (MANDATORY READ before any DS work)

| Doc | Path | Purpose |
|---|---|---|
| FOUNDATIONS.md | `design-system/core-v2/docs/FOUNDATIONS.md` | ~500 tokens · 30 sections · ALL token names |
| RULES.md | `design-system/core-v2/docs/RULES.md` | 90 hard rules · 10 sections · WWWWH per rule |
| COMPOSITION_GRAMMAR.md | `design-system/core-v2/docs/COMPOSITION_GRAMMAR.md` | Use-case grammar · MANDATORY before organism changes |

## Cross-references

- Full state: `docs/CHANGELOG.md` 2026-05-15 entries (batches 1-8 + Phase 1-4)
- Aura memory: `feedback_ds_port_workflow.md` (port methodology + adapter pattern + final state table)
- Port playbook: `skills/aura-craft/reference/DS_PORT_WORKFLOW.md` (canonical · hook lift + adapter pattern sections)
- Component reference: `design-system/COMPONENT_REFERENCE.md`
- 4WH audit: `design-system/4WH_AUDIT.md`
- README: `design-system/core-v2/README.md` (incl. adapter pattern code examples)

## Contact

Design lead: design@kenresearch.com (Aura-assisted)
