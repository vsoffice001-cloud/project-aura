# report-store-legacy — Overview

> Worked example #2 · source-of-truth audit for the **listing / store** pattern that will inform Ken Research's **Competition-Benchmarking listing**.
>
> Read-only source: `/Users/vishalchauchan/Downloads/Anti-folder01/projects/report-store-legacy/src/`
> Status: legacy (DS v3.2 / v4.1 / v4.2 ad-mix), Figma Make export, not on tech roadmap. Treat as **archaeology + pattern library**, not a port target.

---

## 1. What this project IS

`report-store-legacy` is the **Vite + React 18 SPA** that prototypes Ken's public Report Store — a browsable, filterable catalogue of ~1M market research reports across 14 industries. It is the **most mature listing surface in the workspace**: it ships the full home → listing dual-mode flow, a 4-section filter sidebar with industry tree, a unified active-filter banner, infinite-scroll progressive loading, mobile filter sheet, and four card variants (grid / list / compact / featured).

It is **not** the production Report Store. Production is Next.js 14, served from `kenresearch.com/report-store`. This is the **design source-of-truth** the team iterated on before tech port. The companion notes (`HANDOVER.md` · `STATUS.md` · `MIGRATION_LOG.md`) record what passed pre-handover review and what was deferred.

It IS:
- The reference for **filter-system UX** (sidebar tree + accordion + chips + cross-industry rules).
- The reference for **card anatomy** (eyebrow → title → meta row → footer).
- The reference for **listing toolbar + context banner pairing** (sort + view-toggle + chip rail).
- The reference for **mobile pattern parity** (sheet + sticky pill bar + bottom safe area).
- The reference for **progressive load UX** (sentinel + skeleton + progress bar + completion line).

It is NOT:
- A clean DS consumer (mixes inline styles + v3.2 tokens + custom CSS — pre-`core-v2` migration era).
- A11y-audited (axe pass not in `HANDOVER.md` exit checklist).
- A multi-route app (single-page SPA with `viewMode === "home" | "listing"` toggle, not React Router).
- The Competition-Benchmarking target (that surface is a different domain — vendor/competitor cards, not reports — but inherits this pattern shape).

---

## 2. Tech stack

| Layer | Choice | File / Evidence |
|---|---|---|
| Bundler | Vite 6.3.5 | `package.json:76` |
| Framework | React 18.3.1 (peer) | `package.json:79` |
| Styling | Tailwind v4 via `@tailwindcss/vite` | `package.json:73` |
| Component primitives | Radix UI (accordion, checkbox, dropdown, select, sheet, etc.) + shadcn-flavoured wrappers in `src/app/components/ui/` | `package.json:16-41` |
| Icons | `lucide-react` 0.487.0 | `package.json:52` |
| Animation | `motion` v12 (Framer Motion's new package name) | `package.json:53` |
| Globe / 3D | `@react-three/fiber` + `cobe` + `three-globe` (for `ExploreByRegion` home section, not listing) | `package.json:42-44, 48, 67-68` |
| Toasts | `sonner` 2.0.3 | `package.json:65` |
| Carousel | `embla-carousel-react` 8.6.0 (used in horizontal-scroll rails, not listing grid) | `package.json:50` |
| Forms | `react-hook-form` 7.55.0 (present but listing flow uses native React state) | `package.json:58` |
| Package manager | pnpm 10.33.0 (NOT npm — breaks lockfile) | `package.json:99` |
| Node | ≥20 | `package.json:96` |

Boot command (only if needed):

```bash
cd projects/report-store-legacy && pnpm install --ignore-workspace && pnpm dev --port 3025
```

`--ignore-workspace` is required because pnpm otherwise resolves the workspace root and the project pulls deps it doesn't share. Default Vite port is 5173; user note specifies 3025 to avoid clashes with the active design-system core-v2 dev server.

---

## 3. File structure (annotated)

```
report-store-legacy/
├── src/
│   ├── main.tsx                                 ← React 18 root mount
│   ├── app/
│   │   ├── App.tsx                              ← root SPA: dual-mode home/listing, all org wiring (332 lines)
│   │   ├── components/
│   │   │   ├── data.ts                          ← fixture: industries + reports + subcategoryTagMap (mock dataset)
│   │   │   ├── iconColors.ts                    ← semantic icon palette (utility / content / brand / success)
│   │   │   ├── industryIconMap.ts               ← per-industry Lucide icon assignments
│   │   │   ├── index.ts                         ← barrel export
│   │   │   ├── hooks/
│   │   │   │   ├── useReportFilters.ts          ★ filter+sort+search+pagination state (466 lines, the brain)
│   │   │   │   ├── useProgressiveLoad.ts        ★ infinite scroll via IntersectionObserver
│   │   │   │   ├── useCrossfade.ts              ← opacity tween on filter-fingerprint change
│   │   │   │   ├── useMountTransition.ts        ← enter/exit transition helper for banner
│   │   │   │   └── index.ts
│   │   │   ├── molecules/
│   │   │   │   ├── FilterAccordion.tsx          ★ unified collapsible (sidebar + sheet variants)
│   │   │   │   ├── SidebarPanel.tsx             ★ container: sticky + scrollable + header/footer zones
│   │   │   │   ├── EmptyState.tsx               ← empty state w/ icon + message + CTA
│   │   │   │   ├── SkeletonCard.tsx             ← shimmer for grid + list variants
│   │   │   │   ├── LoadMoreSentinel.tsx         ★ infinite-scroll progress indicator
│   │   │   │   ├── ActiveFilterChip.tsx         ← removable pill (color-coded by type)
│   │   │   │   ├── ReportGridCard.tsx           ← clean DS-spec grid card (alt to ReportCard)
│   │   │   │   ├── IndustryBadge.tsx            ← text-only eyebrow label
│   │   │   │   ├── CardMetaRow.tsx              ← projection + region OR region + date
│   │   │   │   ├── CardFooterRow.tsx            ← pages + date row
│   │   │   │   ├── CategoryListCard.tsx         ← rich industry card for category grid
│   │   │   │   ├── DataHighlightCard.tsx        ← value + label + growth (home: Daily Highlights)
│   │   │   │   ├── StatCard.tsx                 ← key indicator (home: Trending Statistics)
│   │   │   │   ├── AnalystPickCardB.tsx         ← editorial pick variant
│   │   │   │   ├── CardReveal.tsx               ← stagger-on-mount wrapper
│   │   │   │   ├── RevealImage.tsx              ← progressive image load
│   │   │   │   ├── HorizontalScroll.tsx         ← edge-fade scrollable rail
│   │   │   │   ├── BackToTop.tsx                ← floating back-to-top button
│   │   │   │   ├── ScrollFade.tsx               ← scroll-driven fade wrapper
│   │   │   │   ├── SidebarPanel.tsx             (duplicate listing above — single file)
│   │   │   │   └── index.ts                     ← barrel
│   │   │   ├── ui/                              ← shadcn primitives (accordion, button, checkbox, etc., 47 files)
│   │   │   ├── figma/
│   │   │   │   └── ImageWithFallback.tsx        ← Figma Make image helper
│   │   │   ├── ─── ORGANISMS ───
│   │   │   ├── Header.tsx
│   │   │   ├── ReportStoreHero.tsx              ← search hero w/ category selector + popular tags
│   │   │   ├── IndustrySidebar.tsx              ★ desktop filter panel (676 lines, the listing brain UI)
│   │   │   ├── ListingToolbar.tsx               ★ back + count + view-toggle + sort + mobile-filter
│   │   │   ├── ListingContextBanner.tsx         ★ unified industry hero + filter chips strip
│   │   │   ├── CardListing.tsx                  ★ grid/list dispatcher w/ skeleton + empty state
│   │   │   ├── ReportCard.tsx                   ★ 4-variant card (grid / list / compact / featured)
│   │   │   ├── MobileFilterSheet.tsx            ★ mobile slide-from-right filter drawer w/ focus trap
│   │   │   ├── MobileFilterBar.tsx              ← sticky bottom floating pill (mobile only)
│   │   │   ├── ViewToggle.tsx                   ← list/grid pill toggle
│   │   │   ├── FilterChip.tsx                   ← toggle chip atom (mobile sheet)
│   │   │   ├── FilterCheckbox.tsx               ← custom checkbox atom (sidebar)
│   │   │   ├── FilterSearchInput.tsx            ← compact search-within-filters atom
│   │   │   ├── Footer.tsx, Header.tsx
│   │   │   ├── ── home-only sections (not listing) ──
│   │   │   ├── FeaturedResearch, IndustrySectorsGrid, IndustryReportSection,
│   │   │   ├── AnalystPicks, TrendingStatistics, DailyDataHighlights, QuickAccess,
│   │   │   ├── TrendingTopics, ExploreByRegion, Testimonials, UpcomingReports,
│   │   │   ├── RecommendedForYou, CustomResearchCTA, Globe
│   │   │   ├── ── primitives ──
│   │   │   ├── Card, Badge, Button, Container, SectionWrapper, SectionHeading,
│   │   │   ├── FadeInSection, Tooltip, IconBadge, CTALink, InlineLink, AnimatedArrow
│   │   ├── lib/
│   │   │   ├── mock-data.ts                     ← gateway file w/ TODO markers for real API
│   │   │   └── utils.ts                         ← cn() helper
│   │   ├── styles/
│   │   │   ├── index.css                        ← entry CSS
│   │   │   ├── theme.css                        ← Ken Bold DS v3.2 tokens (editorial-light)
│   │   │   ├── fonts.css                        ← DM Sans + Noto Serif imports
│   │   │   └── tailwind.css                     ← Tailwind v4 base
│   │   ├── assets/                              ← trust logo PNGs (8 client logos)
│   │   └── imports/                             ← geo JSON for Globe (afghanistan-angola)
├── guidelines/                                  ← inline DS notes
├── HANDOVER.md, STATUS.md, MIGRATION_LOG.md, ATTRIBUTIONS.md, FOLDER_CONTEXT.md
├── package.json, pnpm-lock.yaml, vite.config.ts, postcss.config.mjs, index.html
```

★ = files mapped in depth in `listing-anatomy.md` · `card-patterns.md` · `filter-system.md`.

**File count for listing flow alone:** 1 root SPA · 1 mega-hook · 1 progressive-load hook · 1 banner + 1 toolbar + 1 listing-dispatcher + 1 card-dispatcher (4 internal variants) + 1 sidebar (676 lines) + 1 mobile sheet + 1 mobile bar + 4 filter atoms (chip / checkbox / search-input / accordion) + 4 molecules (sidebar-panel / skeleton / empty-state / load-more-sentinel) = **~14 components touching the listing**. ReportCard alone hosts 4 variants — so the surface is closer to **18 distinct render shapes**.

---

## 4. Domain model (data.ts)

The fixture defines three shapes the listing depends on:

| Type | Fields | Notes |
|---|---|---|
| `Industry` | `name · count · subcategories[] · tags[] · icon?` | 14 industries · each has sub-cats (e.g. Healthcare → Pharmaceuticals, Medical Devices…) · tags scoped per industry |
| `Report` | `id · title · industry · subcat · region · date · pages · tables · figures · downloads · projection · formats[] · badge · image` | the listing's row shape; `projection` is e.g. `"CAGR 6.8%"` for the green-tinted growth pill |
| `subcategoryTagMap` | `{ [subcat]: tag[] }` | reverse-index: lets filter system match by tag without joining tables |

Listing filtering happens 100% in-memory via `useReportFilters.ts:309-395` — no debouncing, no virtualization. At ~50 reports in fixture this is fine; at 1M it requires a real API + server-side filter.

---

## 5. Notable build / behavior facts

1. **Single React tree, no router.** `viewMode === "home" | "listing"` toggle in `useReportFilters.ts:66` swaps which children render inside the same `<Container>`. URL never changes — `MIGRATION_LOG.md` flags this as a tech-debt for the Next port (must adopt `searchParams`-driven state).
2. **Sticky sidebar = position: sticky** at `top: 72px` (header height), `maxHeight: calc(100vh - 88px)`, scroll inside the panel. No JS scroll-lock. `SidebarPanel.tsx:53,73-74`.
3. **Progressive load is fake-async.** `useProgressiveLoad.ts:60-63` does `setTimeout(..., 350ms)` to simulate latency so the skeleton UX is visible. Real API replaces this with the actual fetch.
4. **Crossfade hooks fingerprint filter combo.** `App.tsx:53` builds a string `${count}-${industry}-${query}-${sort}-${view}`; `useCrossfade` runs a 200ms opacity tween whenever the fingerprint changes. Cheap visual confirmation that the result set updated.
5. **Cross-industry consistency rules.** `useReportFilters.ts:8-13` (header comment) + `:128-186` enforce: (a) picking a sub-category whose parent industry differs from the selected one auto-switches industry; (b) deselecting industry clears tags; (c) toast confirms the switch via `sonner`. **This is the cleverest filter-logic piece** and a strong replicate candidate.
6. **Mobile filter bar uses safe-area-inset-bottom.** `MobileFilterBar.tsx:23` — `paddingBottom: max(1rem, env(safe-area-inset-bottom, 1rem))`. iOS notch-safe.
7. **Focus trap in mobile sheet** is hand-rolled in `MobileFilterSheet.tsx:123-164` — no Radix Dialog used here (likely Figma Make export limitation). Replicating in DS should use Radix Dialog instead.
8. **Inline styles dominate.** Most spacing / colour / border decisions are inline `style={{ background: "rgba(0,0,0,0.04)" }}` rather than Tailwind classes or tokens. This is the **single biggest reject** for any new DS port — see `pattern-lessons.md` Section 3.
9. **GSAP / Lenis absent.** Even though `motion` is installed, listing-mode animation is hand-rolled CSS `@keyframes fadeUp` + inline transition strings. Aligns with workspace's 2026-05-08 "Framer-only" rule.

---

## 6. Files NOT relevant to the listing audit

The home-mode sections (`FeaturedResearch`, `IndustryReportSection`, `AnalystPicks`, `TrendingStatistics`, `DailyDataHighlights`, `QuickAccess`, `TrendingTopics`, `ExploreByRegion`, `Testimonials`, `UpcomingReports`, `RecommendedForYou`, `CustomResearchCTA`, `Globe`) render only when `viewMode === "home"` (`App.tsx:216-282`). They are valuable as **home-page patterns** but **not part of the listing audit** unless we explicitly want to cross-reference their card variants (which `card-patterns.md` does, briefly).

The `assets/` folder holds 8 client logo PNGs used in `Testimonials`. No listing dependency.

The `imports/` folder holds geo JSON for the 3D Globe component. No listing dependency.

---

## 7. What we'll use this audit for

This project is the **most evolved listing UX in the workspace**. The Competition-Benchmarking surface (sibling worked-example in `design-system-audit/worked-examples/competition-benchmarking/`) will be a different domain (vendors / competitors / benchmark dimensions) but will need the **same shape**:

- Persistent filter rail · result count + sort · removable chip strip · paginated/progressive card grid · view toggle · empty state.

The next four docs of this audit (`listing-anatomy.md` · `card-patterns.md` · `filter-system.md` · `pattern-lessons.md`) deconstruct exactly how this project does each, where the cost lives, and what gets carried forward vs. dropped vs. reshaped.
