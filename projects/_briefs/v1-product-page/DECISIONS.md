# v0.2 Build Decisions · Locked

**Date:** 2026-05-18
**Source:** User confirmation after Phase 1 (folder + Ken Charts research + premium variant research + mock data variants)

---

## D1 · Chart strategy

- **Install `@ken-research/charts@0.1.5`** in `v1-product-page-ver0.2`
- **Promote `ChartCard` wrapper to DS core-v2** as reusable molecule from day 1 (NOT project-local)
- **Learn Ken Charts API** · understand Highcharts patterns · then design new chart variants for the 6 MISSING types (Bubble · Heatmap · Map · Timeline · Value Chain · Data Table) so they slot into Ken Charts ecosystem when company adopts them
- ChartCard anatomy per PRD §20: Header + Title + Insight + Controls + Body + Dataset Preview + Source Note + Access State + CTA

## D2 · Hero · 2 cinematic variants

DROP earlier editorial-light recommendation. User wants BOTH variants premium-cinematic.

### D2.1 · Light cinematic hero
- White/off-white base · BUT with depth · subtle gradient · noise · light glow blobs · motion · premium type
- NOT flat editorial · NOT generic SaaS · NOT McKinsey article-flat
- Reference: Stripe Atlas · Linear pricing · Figma marketing (when they go cinematic)

### D2.2 · Dark cinematic hero
- Charcoal/near-black base · multi-blob glow · gradient mesh · noise · light effects
- Reference: Apple Vision Pro · Linear dark · Vercel · Stripe dark hero · Claude marketing

### D2.3 · Layout · BOTH variants
- **Left rail (60% width):**
  - Breadcrumb
  - Eyebrow (CHAPTER 1 — REPORT or industry tag · brand-red accent)
  - H1 serif light tracking-tight
  - Hero promise sentence
  - 3 trust bullets
  - Primary + secondary CTAs (row on desktop · stack mobile)
  - Trust strip (logos · stats · "trusted by")
- **Right rail (40% width):**
  - Slot for report cover image (if available)
  - Fallback hierarchy when no image:
    1. Mini chart preview (forecast/market-size · using Ken Charts AreaChart or HistoricalProjectedAreaChart)
    2. Key stat callout cards (3-card stack · primary + forecast + CAGR)
    3. Methodology snapshot (icon + step count + sample size)
    4. Report cover mockup w/ "Inside" peek badge (composed visual · NOT real cover)
  - NEVER show empty right rail · ALWAYS show something meaningful

## D3 · Token discipline

- **NO new token invention** during v0.2 build
- Use core-v2 tokens ONLY
- Adjust composition · gradients · opacity stops · NOT new hex values
- If a real gap surfaces · flag as TOKEN GAP in `_briefs/v1-product-page/TOKEN-GAPS.md` · resolve in separate DS PR · don't bypass
- Reference `core-v2/docs/FOUNDATIONS.md` (500+ tokens · 30 sections) BEFORE every var(--xxx) write

## D4 · Variant data switcher

UI tool for stakeholder demos.

- **Floating control** · bottom-right · pill button "Variant: MAX ▾"
- **4 scenarios:**
  - MAX · Australia Cold Chain 2022-2027 (all 30 sections populated)
  - MID · India Confectionery Market 2024-2029 (mid-tier · ~15 sections populated)
  - LOW · Vietnam EV Charging Outlook 2024-2027 (~8 sections populated)
  - EMPTY · edge cases · per-section empty handling demo
- **Persist via URL param** · `?variant=max | mid | low | empty`
- **DefaultsToMax** when no param
- **Visible toggle** · dev-mode only · hide in production (env flag)
- **Screenshots+share-links work** · param survives copy/paste

## D5 · Empty-state architecture

Lock as architecture rule:

- `shouldRenderSection(sectionData)` guard at section root
- `applyFallbacks(sectionData)` pattern for partial-data fallbacks (e.g. chart → stat block when no dataset)
- NEVER render empty cards · empty tabs · "data unavailable" placeholders
- Per PRD V2 §41 Dynamic Rendering Logic
- Per EMPTY-STATE-MATRIX.md

## Files to read before building any v0.2 section

1. `_briefs/v1-product-page/PRD-V2.1-australia-coldchain.md`
2. `_briefs/v1-product-page/PRD-V2-design-direction.md`
3. `_briefs/v1-product-page/DECISIONS.md` (this file)
4. `_briefs/v1-product-page/KEN-CHARTS-PLAN.md`
5. `_briefs/v1-product-page/PREMIUM-LIGHT-DARK-RESEARCH.md`
6. `_briefs/v1-product-page/EMPTY-STATE-MATRIX.md`
7. `_briefs/v1-product-page/AUSTRALIA-COLDCHAIN-DATA.md` (+ MOCK-DATA-MEDIUM + MOCK-DATA-LOW)
8. `design-system/core-v2/docs/FOUNDATIONS.md`
9. `design-system/core-v2/docs/RULES.md`
10. `design-system/core-v2/docs/COMPOSITION_GRAMMAR.md`
