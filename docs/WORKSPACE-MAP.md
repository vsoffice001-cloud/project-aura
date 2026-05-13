---
title: Workspace Map — Ken Research / Aura
generated: 2026-05-08 · last updated 2026-05-13 (DS Port Phase 1-3 + Path A+C)
status: post-handover-prep snapshot
sprint-source: docs/aura-sprint-2026-05-07-port/
---

# Workspace Map (post-DS-Port Phase 1-3 · 2026-05-13)

Snapshot taken after handover-prep work complete. Companions: [SPRINT-LEARNINGS-2026-05-08.md](./SPRINT-LEARNINGS-2026-05-08.md) · [SYSTEM-ARCHITECTURE.md](./SYSTEM-ARCHITECTURE.md) (full system map incl. sync flow + storage zones).

**Update note 2026-05-13:** DS core-v2 now `ready-for-tech` w/ 168 components (100% OG coverage) · reports-pdp-v2 also `ready-for-tech`. New top-level files: `README.md` · `HANDOVER_DELIVERY.md` · `docs/API_CONTRACT.md` · `scripts/verify.sh`.

Use this as the **single-screen orientation** for any new task — paths · status · canonical sources · what consumes what · what's frozen.

---

## 1. Top-level layout

```
Anti-folder01/
├── design-system/                 ← canonical DS home
│   ├── tokens/                    ← Style Dictionary v4 (DTCG)  [active]
│   ├── core/                      ← v1, frozen-readonly post-sprint  (still on disk)
│   ├── core-v2/                   ← v2 fork — active DS  [Phase B3]
│   ├── dashboard/                 ← Figma Make duplicate, slated for delete after v1 cutover
│   ├── catalogs/                  ← canonical Ken data (industries/regions/countries)
│   ├── recipes/                   ← page-build specs (case-study, report-store-listing)
│   ├── motion/, voice/, ANTI_PATTERNS.md, COMPONENT_REFERENCE.md, 4WH_AUDIT.md
│
├── projects/                      ← consumer surfaces
│   ├── V0_lite_report/            ← Next 15 — FULL PORT  [active, builds 179kB]
│   ├── V0_lite_report-legacy/     ← Vite/Figma Make  [frozen-readonly]
│   ├── report-store/              ← Next 15 — foundation only  [active, builds 159kB]
│   ├── report-store-legacy/       ← Vite  [frozen-readonly]
│   ├── V0.2_report/               ← Next 15 — foundation only  [active, builds 159kB]
│   ├── V0.2_report-legacy/        ← Vite  [frozen-readonly]
│   ├── topnav-v32/                ← navbar canonical source (extracted to core-v2)
│   ├── report-store-v07/          ← legacy listing reference (mirror source per recipes)
│   ├── casestudy-templates/       ← template-v3, template-v28 (reference only)
│   ├── competition-benchmarking-listing-v01, v02/  ← listing build refs
│   ├── reports-pdp-v1/            ← PDP build ref
│   ├── webpages-ken/              ← static HTML brand pages
│   └── ken-research-backend/      ← Django local-edit OK (no remote push)
│
├── docs/                          ← Aura-infra logs (this file lives here)
├── workflows/, skills/, templates/, .claude/, references/, strategy/, scripts/
└── HANDOVER_TRACKER.md, CLAUDE.md, run.sh
```

---

## 2. pnpm workspace state

`pnpm-workspace.yaml` active packages (4):

| Package | Path | Status | Notes |
|---|---|---|---|
| `@kenresearch/tokens` | `design-system/tokens/` | active | Style Dictionary v4 build outputs `build/tokens.{css,js,d.ts,scss,flat.json}` |
| `@kenresearch/design-system` | `design-system/core-v2/` | active | exports map → `./src/*/index.ts` (TS source via Next `transpilePackages`) |
| (project) | `projects/V0_lite_report/` | active | full port |
| (project) | `projects/report-store/` | active | foundation only |
| (project) | `projects/V0.2_report/` | active | foundation only |

Excluded (commented in `pnpm-workspace.yaml`): `core/`, `dashboard/`, `*-legacy/`, `_ds-verify/`.

Run cmds: `./run.sh tokens|design|backend` · per-project `cd projects/<name> && pnpm dev|build`.

---

## 3. Design system — `core-v2/` inventory

Promoted from V0_lite_report + topnav-v32 during Phase B3/C/D.

### Hooks (9)
`useDebounce` · `useFocusTrap` · `useKeyboardNavigation` · `useShimmer` · `useNavDropdown` · `useMobileMenu` · `useAuthPopover` · `useVariant` · `useAnimatedCounter`

### Atoms (20)
`Button` · `CTALink` · `Card` · `Badge` · `InlineLink` · `SectionHeading` · `SectionLabel` · `SectionWrapper` · `AnimatedArrow` · `ScrollProgress` · `ScrollToTop` · `TextLink` · `StatusDot` · `Divider` · `SkipLink` · `LogoButton` · `DropdownChevron` · `HamburgerIcon` · `Avatar` · `MenuItem`

### Molecules (5)
`NavDropdownTrigger` · `SearchBar` · `AuthButtons` · `CompanyTrigger` · `StatCard`

### Organisms (8)
`TopNavigation` (drop-in navbar) · `PrimaryNav` · `SecondaryBar` · `DesktopNavItems` · `MobileControls` · `TabletControls` · `AuthPopover` · `popover-icons`

### Patterns (4 stubs)
`DarkGradientMesh` · `SectionBg` · `CarouselFadeMask` · `NavbarGlassHover`

### Charts
Highcharts theme + 5 presets (area / line / pie / bar / column) consuming DS color tokens via `readToken()` runtime CSS-var resolver. `mergePreset(theme, preset, overrides)`.

### Styles
`base/` (reset) · `layers.css` (cascade `@layer reset, base, tokens, composition, atoms, components, recipe-overrides`) · `utilities.css` · `editorial-light.css` · `cinematic-dark.css` (incl. `[data-variant-section="cinematic"]` activator).

### Docs (DS-internal)
`PATTERNS.md` (3-layer architecture) · `ANTI_PATTERNS.md` (Cat 14 added) · `MIGRATION_FROM_V1.md` · `COMPONENT_REFERENCE.md` · `RECIPES.md` · `CHANGES.md`

### Token coverage added in sprint
`composition.{cinematicMesh, brandRedShimmer, navbarGlow, carouselMask, blur}` · `chart.palette.{1..8}` · `motion.{duration, easing, stagger}` · `shadow.{sm..xl, premium, insetSoft}` · `spacing.{0..24}` (4px base) · `button.{minWidth, height, px, font}` · `zIndex.{...}` · `semantic.section-bg.{primary, accent, contrast, mesh}` · `semantic.status.{success, warning, error, info}` · `typography.size.{navHelper, navPrimary}` · `lineHeight.nav*`. Backup: `tokens.json.v0.1.0.bak`.

---

## 4. Consumer projects — port state

### V0_lite_report — FULL PORT
- Stack: Next 15 + React 19 + Tailwind v4 + shadcn/ui
- Build: 179 kB First Load JS, 5 prerendered pages, clean
- Composition: 13 sections in `app/page.tsx` — `HeroSection` (cinematic-dark) + `KeyStats` + `ReportHighlights` + `SampleReportPreview` w/ `SidebarTOC` + 4 chapters + `MobileTOC` + `PhaseCard` + `SlideshowSection` + `FAQSection` + `CTASection` + `Footer` + `ScrollProgress` + `ScrollToTop` + `AnalyticsDashboard` stub
- Variant wiring: `data-variant` cookie + RSC layout, `<NavbarShell>` thin wrapper around DS `TopNavigation`
- Mock data: `src/lib/mock-data.ts` re-exports from `mock/{sample-report, chart, hero-themes, breadcrumb, report-meta, slideshow}.ts` — 1086 LOC carry-over
- Pre-handover gate items deferred: a11y axe pass, Lighthouse CWV, visual baseline, real Logo asset, useAnalytics tracker (229 LOC stub), real slide assets

### report-store — FOUNDATION
- Stack: same + `three` + `three-globe`
- Build: 159 kB, clean
- Mock data: `src/lib/mock-data.ts` w/ 10 verbatim exports from legacy `data.ts` (413 LOC)
- DEFERRED (consumer-driven): 110+ files — Hero+3D globe SSR-wrap, IndustrySidebar (675 LOC), ReportCard (583 LOC), `useReportFilters` (465 LOC URL-state), MobileFilterSheet, ExploreByRegion, FeaturedResearch, AnalystPicks (per A2 audit §10)

### V0.2_report — FOUNDATION
- Stack: same + `d3` + `@types/d3` (mindmap kept per ADR 2026-05-08)
- Build: 159 kB, clean
- Mock data gateway only: `reportMeta` (Qatar Fresh Herbs verbatim — $150 Mn 2024 → $213 Mn 2030, 6.0% CAGR, 82 pages, code KRAD3953)
- DEFERRED: heavy rewrite — 13-section IA per A3 audit §13, cinematic-dark hero (per ADR), d3 mindmap visual redesign, full content carry-over. Estimate 9-13 days.

### Frozen legacy folders (3)
`V0_lite_report-legacy/` · `report-store-legacy/` · `V0.2_report-legacy/` — each w/ `LEGACY-READONLY.md` marker. Source for verbatim mock-data carry-over only. **Never edit.**

---

## 5. Recipe / pattern flow (who consumes what)

```
design-system/tokens/  ─→  core-v2/styles/{layers,utilities,editorial-light,cinematic-dark}.css
                       └→  core-v2/charts/highchartsTheme.ts (readToken runtime)

core-v2/atoms  ─consumed by─→  core-v2/{molecules, organisms, patterns}
                                      │
                                      ├─→  V0_lite_report/components/sections/*
                                      ├─→  report-store/  (planned, deferred)
                                      └─→  V0.2_report/   (planned, deferred)

core-v2/organisms/navbar/TopNavigation
   └─wrapped by─→  projects/<each>/components/NavbarShell.tsx  (render-prop slots: logo, ctaButton, companyDropdown, mobileMenu)

design-system/recipes/case-study.md
   └─authority for─→  any future case-study build (organism names + bg alternation HARD GATE + variant DEFAULT editorial-light)

design-system/recipes/report-store-listing.md
   └─authority for─→  report-store + listing rebuilds (source-truth file = report-store-v07 IndustrySidebar / ReportCard)
```

---

## 6. Variant system

Two surface palettes, same brand:

| Variant | Activation | Surfaces |
|---|---|---|
| `editorial-light` | `<html data-variant="editorial-light">` cookie + RSC layout | DEFAULT for case-study + listings |
| `cinematic-dark` | `<html data-variant="cinematic-dark">` OR `<section data-variant-section="cinematic">` (works inside light pages) | V0.2 hero, ResourcesSection always, immersive surfaces |

Activator pattern in `cinematic-dark.css` lets a single section opt-in to cinematic mesh + dark tokens within an editorial-light page (no per-page variant DSL needed).

---

## 7. Audits + sprint artifacts

```
docs/aura-sprint-2026-05-07-port/
├── A1-V0_lite_report-audit.md
├── A2-report-store-audit.md
├── A3-V0.2_report-audit.md
├── A-synthesis-cross-project.md
├── B-DS-FORENSIC-v1-and-heal-plan.md          (786 LOC v1 deep-dive)
├── B2-DS-patterns-backgrounds-deep-map.md     (cinematic mesh + section alternation)
└── RESUME-NOTE.md                              (CLOSED)
```

---

## 8. Active ADRs touching this snapshot (from DECISIONS.md)

1. **DS heal Option B** — fork `core-v2/`, freeze `core/` legacy
2. **Charts: Highcharts standard** — DS theme + 5 presets, runtime CSS-var resolver
3. **V0.2 mindmap: keep d3** — visual redesign only
4. **V0.2 hero: cinematic-dark** — per KSA Coldchain reference
5. **Navbar source: topnav-v32** — promoted to core-v2, NOT legacy project Header
6. **Color tokens only** — all hex/rgba replaced w/ canonical CSS vars
7. **`.js` suffix drop** — workspace TS source via Next `transpilePackages`, extensionless imports
8. **Phase D + E scaffold-only** — foundation delivered, detailed sections deferred consumer-driven

Full text: [DECISIONS.md](./DECISIONS.md) `## Active`.

---

## 9. Quick locator (where do I find…?)

| Looking for | Path |
|---|---|
| Canonical color token | `design-system/tokens/tokens.json` (`color.*`) → built to `build/tokens.css` |
| DS atom (post-sprint) | `design-system/core-v2/src/atoms/<Name>.tsx` |
| DS pattern composition | `design-system/core-v2/src/patterns/<Name>.tsx` |
| Recipe rules | `design-system/recipes/<surface>.md` |
| Anti-pattern catalog | `design-system/ANTI_PATTERNS.md` (Cat 1-14) |
| Component cross-ref | `design-system/COMPONENT_REFERENCE.md` |
| Ken canonical data | `design-system/catalogs/ken-research.ts` |
| Mock data (per project) | `projects/<name>/src/lib/mock-data.ts` (gateway) → `mock/*.ts` (raw) |
| Navbar canonical | `design-system/core-v2/src/organisms/navbar/` (source: topnav-v32) |
| Sprint audits | `docs/aura-sprint-2026-05-07-port/` |
| Project status | `HANDOVER_TRACKER.md` |
| Aura-infra log | `docs/CHANGELOG.md` |
| Why we chose X | `docs/DECISIONS.md` |
| What we learned | `docs/LEARNINGS.md` + `docs/SPRINT-LEARNINGS-2026-05-08.md` |

---

## 10. Frozen / out-of-scope

- `design-system/core/` — v1, kept on disk for archaeology, **read-only**
- `design-system/dashboard/` — Figma Make duplicate, slated for delete after v1 cutover
- `projects/*-legacy/` — three legacy folders, `LEGACY-READONLY.md` markers, source for verbatim carry-over only
- `projects/casestudy-templates/`, `topnav-v32/`, `report-store-v07/`, `webpages-ken/` — reference projects, not active build targets
- `projects/ken-research-backend/` — Django, local-edit OK per scope flip 2026-04-30, no remote push
- AWS / Nginx / n8n / prod deploy — out of scope, never touch
