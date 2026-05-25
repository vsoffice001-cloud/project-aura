# 00 — Overview: `V0.2 -for design system/`

**Source:** `/Users/vishalchauchan/Downloads/Anti-folder01/projects/V0.2 -for design system/`
**Live URL:** `http://localhost:3030/`
**Status (per user):** canonical Footer source · best report PDP example for design content · "coding practice may differ" (treat code as reference, not gold)

---

## 1. WHAT this project IS

A Vite + React 18 single-page application that ships a **fully composed report PDP** (Product Detail Page) for a fictional "Qatar Fresh Herbs Market" research report. The page exists as a working **reference implementation** of the KP 2.0 Design System v3.0.0 (Feb 12, 2026), with a heavy sidecar of 98 root-level Markdown files that explain *every design decision* using a structured **WHAT / WHY / WHEN / WHERE / HOW** (WWWWH) framework.

It is the artifact a designer pointed at and said: *"That is what a report page should feel like, and that is how documentation should explain why."*

The application has 6 routes via a pathname switch in `src/app/App.tsx:48-161`:

| Route | What it shows | Purpose |
|---|---|---|
| `/` (default) | Full Qatar Fresh Herbs report PDP — Header + Hero + 13 content sections + Footer | **Canonical report PDP** |
| `/design-system` | Token + component gallery | DS reference |
| `/mind-map-demo` | Standalone mind-map for ScopeOfReport | Component sandbox |
| `/stakeholder-icons` | Icon library page (Phosphor stakeholders) | Icon catalog |
| `/segmentation-icons` | Icon library page (segmentation set) | Icon catalog |
| `/charts-showcase` | Highcharts + Recharts showcase | Chart catalog |

The root `/` route is the focus of this audit — it is the report PDP.

---

## 2. Tech stack (exact, from `package.json`)

```
Build:        Vite 6.3.5 + @vitejs/plugin-react 4.7.0
React:        18.3.1
Styling:      Tailwind v4.1.12 (@tailwindcss/vite plugin) + tw-animate-css 1.3.8
Tokens:       CSS custom properties in src/styles/theme.css (NOT Style Dictionary)
UI primitives: shadcn/ui pattern on top of 26 Radix UI primitives
                (@radix-ui/react-accordion, dialog, dropdown-menu, navigation-menu, …)
Icons:        DUAL — @phosphor-icons/react 2.1.10  (data, informational)
                     lucide-react 0.487.0             (actions, UI chrome)
Charts:       highcharts 12.5.0 + highcharts-react-official 3.2.3
              recharts 2.15.2
              d3 7.9.0 (custom mind-map)
Forms/UX:     react-hook-form 7.55.0 · cmdk 1.1.1 · sonner 2.0.3 · vaul 1.1.2
Carousel:     embla-carousel-react 8.6.0 · react-slick 0.31.0
Motion:       motion 12.23.24 (Framer Motion v12 package)
Misc:         @mui/material 7.3.5 + @mui/icons-material (carried but minimal use)
              react-dnd 16.0.1, react-resizable-panels 2.1.7, react-day-picker 8.10.1
Utils:        clsx 2.1.1 + tailwind-merge 3.2.0 + class-variance-authority 0.7.1
Package mgr:  pnpm (pnpm-lock.yaml present, no package-lock.json)
```

**Notable absences vs Aura production target:** no Next.js, no NextAuth, no SSR, no Tailwind config file (Tailwind v4 reads tokens directly from CSS via `@theme`), no Storybook, no test runner, no lint config in repo root.

**Build commands** (from `package.json:6-9`): `pnpm dev` (Vite dev server) · `pnpm build` (Vite production build). No lint/format scripts. No tests.

---

## 3. File structure

```
projects/V0.2 -for design system/
├── 98 root-level Markdown documentation files   ← the sidecar that makes this canonical
├── index.html                                    (Vite entry)
├── main.tsx                                      (mounts <App />)
├── package.json                                  (deps above)
├── pnpm-lock.yaml                                (175 KB — full dep graph locked)
├── postcss.config.mjs
├── vite.config.ts
├── README.md                                     (intentionally near-empty, 320 bytes)
├── SIMPLE_TOC_TEMPLATE.tsx                       (loose .tsx stub at root — see §6)
├── guidelines/
│   └── Guidelines.md
└── src/
    ├── app/
    │   ├── App.tsx                               (router via pathname switch, 197 lines)
    │   ├── components/
    │   │   ├── Header.tsx
    │   │   ├── HeroSection.tsx                   (cinematic-dark, video bg + orbs)
    │   │   ├── MarketOverview.tsx                (Chapter 1 — stats + timeline)
    │   │   ├── ScopeOfReport.tsx                 (Chapter 2 — mind-map)
    │   │   ├── MarketAnalysis.tsx                (Chapter 3 — charts)
    │   │   ├── MarketDataTable.tsx               (Chapter 4 — data table)
    │   │   ├── SegmentationSection.tsx           (Chapter 5 — 7 segmentation cuts)
    │   │   ├── RegionalComparison.tsx            (Chapter 6 — regional cards + stats)
    │   │   ├── GrowthDriversChallenges.tsx       (Chapter 7 — SWOT-style 3-col)
    │   │   ├── CompetitiveLandscape.tsx          (Chapter 8 — competitor cards)
    │   │   ├── TableOfContentsSection.tsx        (Chapter 9 — inline TOC)
    │   │   ├── TargetAudience.tsx                (Chapter 10 — stakeholder cards)
    │   │   ├── ResearchMethodology.tsx           (Chapter 11 — methodology cards)
    │   │   ├── FAQSection.tsx                    (Chapter 12 — Radix accordion)
    │   │   ├── RelatedReports.tsx                (Chapter 13 — listing cards)
    │   │   ├── FinalCTA.tsx                      (red gradient CTA panel)
    │   │   ├── Footer.tsx                        ★ CANONICAL FOOTER ★
    │   │   ├── FloatingCTA.tsx                   (sticky bottom CTA)
    │   │   ├── TableOfContentsSidebar.tsx        (left sticky scroll-spy nav)
    │   │   ├── SectionHeader.tsx                 (page-level, deprecated wrapper)
    │   │   ├── InlineStats.tsx
    │   │   ├── MindMap.tsx / MindMapModal.tsx    (d3 force graph)
    │   │   ├── AudioPlayer.tsx                   (provider + variant switcher)
    │   │   ├── figma/                            (Figma-Make scaffolding, light)
    │   │   └── ui/                               (shadcn primitives: button, card,
    │   │                                          accordion, tabs, dialog, …)
    │   ├── constants/
    │   │   ├── stakeholder-icons.tsx             (Phosphor icon registry, indexed)
    │   │   └── segmentation-icons.tsx            (Phosphor icon registry, indexed)
    │   ├── examples/                             (component usage examples)
    │   ├── hooks/
    │   │   └── useScrollSpy.tsx                  (TOC active-section logic)
    │   └── pages/                                (6 secondary routes)
    │       ├── DesignSystem.tsx
    │       ├── MarketInsightsExamplePage.tsx     ← reference template (per START_HERE.md:279)
    │       ├── ChartsShowcasePage.tsx
    │       ├── MindMapDemo.tsx
    │       ├── SegmentationIconsPage.tsx
    │       └── StakeholderIconsPage.tsx
    ├── assets/
    ├── main.tsx
    ├── styles/
    │   ├── theme.css                             (★ token source of truth)
    │   ├── tailwind.css                          (Tailwind v4 directives + @theme)
    │   ├── components.css
    │   ├── fonts.css                             (DM Sans + Noto Serif imports)
    │   └── index.css
    └── types/
```

The **report PDP is mounted at `src/app/App.tsx:164-196`** — note the order of section imports, which IS the canonical report-PDP section order.

---

## 4. The 98 sidecar Markdown docs

`ls *.md | wc -l` → **98 files at the project root.** This is the load-bearing differentiator. The codebase is not the design system; the *documentation around it* is.

Three broad families (rough classification by filename prefix):

### a. The "Comprehensive Component Analysis" series (10 files, ~227 KB)

```
COMPREHENSIVE_COMPONENT_ANALYSIS_PART1.md   (Foundation: cards, colors, icons, shadows)
COMPREHENSIVE_COMPONENT_ANALYSIS_PART2.md   (ListingCard, TOC, hover states, CTAs)
COMPREHENSIVE_COMPONENT_ANALYSIS_PART3.md   (Typography, gradients, grids, FAQ, banners)
COMPREHENSIVE_COMPONENT_ANALYSIS_PART4.md   (ComparisonParameterCard, SegmentationCard,
                                              StakeholderCard, TimelineCard, TextCard)
COMPREHENSIVE_COMPONENT_ANALYSIS_PART4B.md  (StatBadge, StatCardGroup, OverheadText, BodyText)
COMPREHENSIVE_COMPONENT_ANALYSIS_PART5.md   (HeroSection, Header, Footer, FloatingCTA,
                                              MindMap, MarketDataTable, InlineStats)
COMPREHENSIVE_COMPONENT_ANALYSIS_PART5B.md
COMPREHENSIVE_COMPONENT_ANALYSIS_PART5C.md
COMPREHENSIVE_COMPONENT_ANALYSIS_PART6.md   (TargetAudience, Segmentation, Competitive,
                                              Growth)
COMPREHENSIVE_COMPONENT_ANALYSIS_PART6B.md
COMPREHENSIVE_COMPONENT_ANALYSIS_PART7.md   (Stakeholder icon system, Segmentation icon
                                              system, MarketOverview, ScopeOfReport)
```

Every component is documented to the same WWWWH template:
- **WHAT** — one-sentence definition.
- **WHY** — 3-5 bulleted business justifications.
- **WHEN TO USE** — `✅ DO` / `❌ DON'T` lists.
- **WHERE USED** — list of sections in this codebase.
- **HOW TO IMPLEMENT** — code snippets per variant, with "Use When:" sub-rationale.
- **PROPERTIES** — props table (name · type · default · purpose).
- **STATES** — Default / Hover / Focus / Disabled rules.
- **COLOR RULES** — explicit token + hex per token usage.
- **REUSABILITY SCORE** — ⭐⭐⭐⭐⭐ out of 5, with bulleted rationale.

This template recurs ~60 times across the series — it is the strongest pattern in the project. See `documentation-method.md` (file 04) for the full extraction.

### b. The "Master / Quick / Start" series (entry-points)

```
START_HERE.md                  10.9 KB  · onboarding · decision tree · checklist
QUICK_REFERENCE.md             7.9 KB   · one-page cheat sheet (color, padding, fonts)
QUICK_START_GUIDE.md           9.3 KB   · how to scaffold a new section
MASTER_COMPONENT_INDEX.md      14.1 KB  · ★ the 10 Commandments + component matrix
MASTER_DESIGN_SYSTEM_SUMMARY.md 24.5 KB
DESIGN_SYSTEM_MASTER_PLAN.md   10.4 KB  · the 6-phase rollout plan
DESIGN_SYSTEM_MASTER_INDEX.md  26.9 KB
MIGRATION_GUIDE.md             23.2 KB  · how to refactor existing pages into KP 2.0
TOC_DOCUMENTATION.md           16.8 KB  · deep dive on the sticky TOC sidebar
README_DESIGN_SYSTEM_COMPLETE.md 15.8 KB
```

### c. The "Audit / Phase / Fix / Status" series (~75 files)

Phase-completion reports, color-system-fix logs, audit scorecards, cleanup summaries, compliance audits, blitz-mode progress updates. These are *process artifacts* — they show **how the design system was built, audited, and remediated over time**, not how to use it.

They are valuable as evidence (proving the system was actually audited end-to-end) but most are not reading-order documentation. Top ones worth keeping:
- `PROJECT-KP-2.0-COMPREHENSIVE-AUDIT-REPORT.md` (37.8 KB · the full audit)
- `DESIGN-SYSTEM-AUDIT-SCORECARD.md`
- `DESIGN-SYSTEM-COMPLIANCE-AUDIT.md`
- `KP-2.0-COMPLIANCE-AUDIT-FULL.md`
- `COMPONENT-SCORECARD.md`

---

## 5. WHY user considers this the BEST report PDP example

Synthesized from chat + observable structure:

1. **Section completeness.** The `App.tsx:164-188` section order covers the full report-PDP narrative arc in one page: Hero → Overview (stats + outlook) → Scope (mind-map) → Analysis (charts) → Data table → Segmentation (7 cuts) → Regional → SWOT → Competitive → TOC → Audience → Methodology → FAQ → Related → CTA → Footer. No other workspace project does all of this in a single demo route.

2. **Two-color semantic discipline.** Every other Ken project uses red as the sole accent. V0.2 is the only one that bakes in the **🔴 Brand RED (#b01f24) for action vs 🟣 Data PURPLE (#7f5fe3) for information** rule and applies it across 60+ components — and *documents* the rule in 6+ places (`QUICK_REFERENCE.md:9-14`, `MASTER_COMPONENT_INDEX.md:67-77`, `START_HERE.md:140-164`, etc.). This is the most rigorous color-semantic decision in the workspace.

3. **WWWWH documentation discipline.** Every component has the same 9-section template (WHAT/WHY/WHEN/WHERE/HOW/PROPERTIES/STATES/COLOR RULES/REUSABILITY SCORE). No other Ken project documents to that depth. This is what the user flagged as "captures reasons better."

4. **Canonical Footer.** `src/app/components/Footer.tsx` (265 lines) — see `footer-anatomy.md`. It is the most complete Ken footer in the workspace: 4 nav columns, 4 office addresses w/ Google Maps links, newsletter capture, oversized "Ken" wordmark watermark, divider, tri-column legal links + copyright. Other projects have partial versions.

5. **Sticky scroll-spy TOC sidebar.** `TableOfContentsSidebar.tsx` + `hooks/useScrollSpy.tsx` — 3-state (completed/active/upcoming) progress system documented in `TOC_DOCUMENTATION.md`. Only project that ships this pattern with full docs.

6. **The 10 Commandments.** `MASTER_COMPONENT_INDEX.md:287-338` codifies the system as 10 hard rules: padding, color semantics, font usage, alternating backgrounds, icon sources, shadow hierarchy, hover timing, grid responsive, composition, a11y. Treated as the constitution.

7. **REUSABILITY SCORE.** Every component is rated 1-5 stars with rationale. Allows triaging: which components are repository-grade vs page-specific. No other Ken project does this.

---

## 6. Caveats — what NOT to take from this project

- **Coding practice differs from OG / production target.** Per user note: "coding practice may differ." Specifically:
  - Heavy use of inline Tailwind v4 arbitrary values `bg-[var(--brand-red-500)]`, `px-[84.375px]`, `text-[40px]` everywhere — not token-utility-class. See `coding-differences-from-og.md`.
  - Dual icon library (Phosphor + Lucide) — Aura production target is Lucide only.
  - MUI is in `package.json` but barely used — dead-ish dependency.
  - No Next.js, no SSR.
  - No tests, no lint config, no CI.
  - `SIMPLE_TOC_TEMPLATE.tsx` is a loose orphan .tsx at the repo root — not imported by App.
  - 98 root MDs is a documentation success **and** a maintenance liability (lots of overlap, ~12 "design-system-audit" files that say similar things).

- **`/page` route is a fictional Qatar Fresh Herbs market** — not real Ken data. Mock content only. Numbers are illustrative.

- **The `MarketInsightsExamplePage.tsx`** (referenced by `START_HERE.md:279`) is the canonical scaffold, but the user's BEST PDP example is the main `/` route, not the example page.

---

## 7. How to use this audit

The other 5 files in this folder build on this overview:

- `footer-anatomy.md` — deep dive on `Footer.tsx`, region-by-region.
- `report-pdp-anatomy.md` — section-by-section walkthrough of the `/` route.
- `documentation-method.md` — extracts the WWWWH framework + 10 Commandments + REUSABILITY SCORE pattern from the top 10 root MDs.
- `coding-differences-from-og.md` — flags what NOT to copy code-wise.
- `pattern-lessons.md` — synthesis: replicate / reject / modify.

When pulling patterns from V0.2 into `design-system/core-v2/`, **read documentation-method.md first** (the docs are the actual product), then `pattern-lessons.md` to decide what to port.
