# @kenresearch/design-system — Changelog

## v0.1.0 — 2026-05-08 — Initial scaffold

### Added
- Clean v2 fork at `design-system/core-v2/` (Option B per `docs/aura-sprint-2026-05-07-port/B-DS-FORENSIC-v1-and-heal-plan.md`)
- pnpm workspace setup at workspace root: `pnpm-workspace.yaml`
- Subpath exports: `/atoms`, `/molecules`, `/organisms`, `/patterns`, `/hooks`, `/charts`, `/styles/{base,utilities,editorial-light,cinematic-dark}.css`
- React 19 peerDeps (no longer `optional:true`)
- `sideEffects: ['*.css']` for CSS-side preservation
- `tw-animate-css` removed; replaced with token-driven motion utilities (Phase C)
- `framer-motion@^12` (renamed from v1's bare `motion@12.23.24`)
- Highcharts standard chart engine (replaces v1's recharts)
- Lucide-only icon lib (drops Phosphor)
- Radix primitives only as needed (tooltip/dialog/checkbox/accordion/tabs/select/slot/separator/popover/scroll-area) — drops 15 unused Radix packages from v1
- `src/styles/utilities.css` — ported from `v1/modern-utilities.css` w/ JSDoc intent headers per utility class
- `src/patterns/` — DarkGradientMesh, SectionBg, CarouselFadeMask, NavbarGlassHover (stubs in v0.1.0, full impl Phase B3 step 9.5)
- `src/charts/` — Highcharts theme + 5 presets (area/line/pie/bar/column) DS-token-only
- Storybook 8 config skeleton

### Removed (vs v1)
- 24 `@radix-ui/*` packages declared but unused (kept only the 10 actually imported)
- `@mui/material@7.3.5` + `@mui/icons-material@7.3.5` (zero src imports, ~600MB bloat)
- `@emotion/react`, `@emotion/styled` (MUI peers)
- `@popperjs/core`, `react-popper` (zero imports)
- `react-day-picker`, `cmdk`, `vaul`, `input-otp`, `embla-carousel-react`, `react-resizable-panels`, `react-responsive-masonry`, `react-slick`, `react-dnd`, `react-dnd-html5-backend`, `next-themes`, `react-hook-form`, `date-fns`, `tw-animate-css`, `sonner` (drop or move to consumer scope), `recharts`
- `@phosphor-icons/react` (consolidate to lucide)
- `react-router-dom@7` (Vite-SPA-only, not for consumers; playground uses different routing)
- `motion@12` (renamed to `framer-motion@^12` per workspace standard)
- `figma:asset/*` virtual module declaration (Vite-only resolver — fails Next consumers)
- `vite-env.d.ts` figma decl (drops Figma Make export signature)
- `App.tsx` `react-router-dom` BrowserRouter playground (replaced by Storybook)
- 18 stale .md files at v1 root (FIGMA_MAKE_IMPORT_PROMPTS, GITHUB_PUSH_GUIDE, GITHUB_REPO_MANIFEST, QUICK_START_PROMPT, 14PX_DESIGN_SYSTEM_INTEGRATION, DESIGN_SYSTEM_UPDATES, design-system-checklist, etc.)
- 8 colocated .md files in v1 src/app/components/ (folded into atom JSDoc in Phase C)
- 4 AnimatedArrow files collapsed → 1 atom + JSDoc
- Duplicate hook directory (`src/app/components/hooks/` removed; canonical = `src/hooks/`)
- `peerDependencies` `optional:true` for react/react-dom (forced required)
- `--brand-red` parallel namespace (consumers use canonical `--color-brand-red` from `@kenresearch/tokens`)
- `src/design-system/tokens.ts` 330 LOC parallel TS literal (canonical via `@kenresearch/tokens`)

### Changed
- `name`: `@kenresearch/ds-core` → `@kenresearch/design-system`
- Component organization: flat `components/` (165 .tsx mixed) → `atoms/` + `molecules/` + `organisms/` + `patterns/` (separated)
- Token namespace: drops `--brand-red`, `--button-min-width-*`, etc. (in-app); single canonical via `@kenresearch/tokens` (`--color-brand-red`, etc.)
- All interactive atoms get `'use client'` directive (Next 15 RSC compatibility)
- `Badge.tsx` 753 LOC megacomponent (11 exports) split into: `Badge.tsx`, `SectionLabel.tsx`, `Pill.tsx`, `ChipBadge.tsx`
- `Navbar.tsx` 442 LOC monolith decomposed: `Navbar` (shell) + `NavDropdown` (molecule) + `MegaMenu` (organism)
- `Tooltip` reverts to `@radix-ui/react-tooltip` (v1 reimplemented, lost a11y baseline)
- `FilterCheckbox`, `FilterAccordion`, `ContactModal`, `MobileFilterSheet` similarly back to Radix primitives
- `ImageWithFallback` 13-LOC stub → real `next/image`-based component (Phase C)
- All `style={{}}` color/size sites → CSS classes consuming token vars (1207 inline styles eliminated)
- All `[#xxx]` and `[Npx]` Tailwind arbitraries → token classes (850 sites eliminated)
- All 436 hex literals → tokens
- `cn()` utility consolidated (clsx + tailwind-merge)

### Breaking changes vs v1
- HARD CUT: no `--brand-red` alias. Consumers must update to `--color-brand-red`.
- `@kenresearch/ds-core` package no longer exists. Update imports to `@kenresearch/design-system`.
- All atom imports route through subpath exports (`/atoms`, `/molecules`, etc.) — no root imports of leaf components.
- Atom prop APIs may have tightened (typed enums replace string args). See `MIGRATION_FROM_V1.md` table per atom.
- `Badge` exports split — `import { SectionLabel } from '...'` instead of `import { Badge as SectionLabel }`.

### Migration
- Per-atom mapping table in `docs/MIGRATION_FROM_V1.md`
- Forensic of v1 in `/docs/aura-sprint-2026-05-07-port/B-DS-FORENSIC-v1-and-heal-plan.md`
- Patterns/backgrounds deep-map in `/docs/aura-sprint-2026-05-07-port/B2-DS-patterns-backgrounds-deep-map.md`

### Out of scope (v0.1.0)
- Atom impls (Phase C, V0_lite_report port drives layer 5-9 co-development)
- Token foundation port (Phase B3 step 2 — extends tokens.json with composition group + missing scales)
- Variant CSS impls (Phase B3 step 3)
- Highcharts theme + presets (Phase B3 step 4)
- Anti-pattern lint rules (Phase B3 step 10 — built alongside atoms in Phase C)
- Stories (Phase C — one per atom)
- Verify Next 15 consumer (Phase B3 step 13)
- Cutover: rename v1 to `core-legacy-v1/` + delete `dashboard/` (Phase B3 step 14)
