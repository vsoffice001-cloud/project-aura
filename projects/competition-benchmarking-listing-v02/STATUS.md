# STATUS — competition-benchmarking-listing-v02

**Status:** `ready-for-tech`
**Owner (current):** design (Aura) → handing to tech-team
**Last review:** 2026-05-07
**Reviewer:** Aura

## Current state

Listing page for Ken Research Competition Benchmarking reports. Editorial-light variant. Mirrors RS-v07 IndustrySidebar + ReportCard patterns 1:1 for design-system sync. Hero ships with 4 variants (D = canonical slim default, A/B/C alt designs visible only in dev mode via SubtleVariantSwitcher). Sidebar has 7 filter dimensions w/ faceted live counts on Ken's full industry/region/country catalogs + trending tags. Active-filter chips strip surfaces above grid w/ color coding. Masonry grid uses ResourceCard variant rotation (full-featured · standard · minimal · category-featured · clean · latest · featured-focus) for visual rhythm. List-mode card mirrors RS ListCard exact. Tail: Trending Topics → Methodology Preview → Custom Research CTA → Footer.

## Pre-handover gate (mark as you pass each)
- [x] `pnpm install` from clean clone boots — verified on `competition-benchmarking-listing-v02/`
- [x] Build succeeds (`pnpm build`) — 1.31s, 457KB JS / 130KB gzip / 134KB CSS
- [ ] Lint clean — no lint script wired (defer to tech team for ESLint setup)
- [x] Mock data extracted to `src/lib/mock-data.ts` w/ `// TODO: replace w/ real API` markers
- [ ] TS strict mode on — no `tsconfig.json` (project inherits Vite + React JSX defaults; TS strict + tsconfig setup deferred to tech team per Figma-Make import normalization rule)
- [ ] A11y axe scan: 0 critical violations — manual QA pass complete (RS-pattern atoms inherit DS a11y); axe-playwright not wired
- [ ] Lighthouse mobile ≥85 perf / ≥95 a11y / ≥95 best-practices — not run in CI (manual smoke-test passed)
- [x] `prefers-reduced-motion` honored — GSAP matchMedia + CSS @media in BenchmarkCard hover transitions + carousel pause-on-hover
- [x] `README.md` complete
- [x] `HANDOVER.md` complete
- [ ] Visual baseline (gstack screenshots) captured — pending tech-team intake
- [ ] Conventional commits in git log — folder-level (no separate git history yet; lives inside workspace monorepo)

## Open issues (won't fix in design phase — defer to tech)
- **No `tsconfig.json` + lint script:** project ships as `.tsx` w/ Vite TS transform. Tech team to add `tsconfig.json` (strict mode), `eslint.config.js`, and `pnpm lint` script for CI conformance.
- **No Playwright + axe-core test setup:** add `pnpm test` w/ axe + visual regression suite during tech intake.
- **`SubtleVariantSwitcher` is DEV-only:** `import.meta.env.DEV` gates visibility. Tech to confirm prod build hides it (verified locally).
- **Mock data only:** all data in `src/lib/mock-data.ts`. 24 seed reports. `deriveCountry()` + `deriveTags()` are heuristic extractors over title strings — replace w/ real API fields.
- **Filter URL contract:** `?industry=...&tag=...&region=...&country=...&size=...&method=...&year=...&sort=latest&q=...` — debounced 300ms via `useBenchmarkFilters` hook. Backend should accept these query params verbatim.
- **DS-shared atoms hex anti-pattern:** `Button.tsx` / `CTALink.tsx` / `Card.tsx` / `iconColors.ts` carry hardcoded hex (inherited from DS). Out-of-scope for this build per anti-bloat rule. Tracked in workspace `docs/LEARNINGS.md`.
- **Globe / three.js in bundle:** present in node_modules (inherited from RS-v07 template) but not used on this listing. Tree-shakes to zero in prod build (verified). Tech may remove deps in cleanup pass.
- **No `.env.example`:** no env vars currently consumed (frontend mock-only). Add when wiring real API.

## Versioning notes
- This is version `v02`. Previous: `competition-benchmarking-listing-v01/` (design-exploration, kept for further iteration).
- Next iteration → copy this folder to `competition-benchmarking-listing-v03/`. Do not edit this folder after handover.

## Live demo
Local dev: `pnpm dev` (port auto-assigned 5173+ by Vite — last seen on :5180 during design phase).
