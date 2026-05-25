# OG Design System — Deep Audit · 00_overview.md

**Audit target:** `/Users/vishalchauchan/Downloads/Anti-folder01/Design_system_vs_26 (og and final)/`
**Methodology:** WWWWH framework per `design-system-audit/01_methodology.md`
**Read-only.** All claims cited `file:line`. Inline rationale quoted verbatim.
**OG version at audit:** v4.3 · dated 2026-03-18 (per `DESIGN_SYSTEM_AI_CONTEXT.md:3-4`).

---

## 1. WHAT

OG (`Design_system_vs_26`) is a **Vite + React 18 + Tailwind v4 design system** for Ken Research that ships ~165 source files across 5 layers (tokens · atoms · molecules · organisms · templates) and a **self-documenting 7-tab dashboard** (`DesignSystemDashboard.tsx:84-91`) as the single source of truth for both developers and AI assistants building Ken pages.

> *"Minimalist editorial design system with black/white alternating sections, Major Third typography (1.25 ratio), Ken Bold Red (#b01f24) for CTAs only."* — `ai-context/CORE.md:28`

---

## 2. WHY

- **Consistency · speed · quality · scalability · single source of truth** (`ai-context/CORE.md:24-25` verbatim).
- Solves **CTA drift** across Ken surfaces — every team was hand-rolling buttons; brand-locked shimmer was lost (`COMPONENT_GUIDELINES_4WH.md:13-15`).
- Solves **typography chaos** by enforcing Major Third 1.25× scale w/ 9 named tokens — *"Every fontSize in the codebase MUST map to one of these tokens. No hardcoded pixel values allowed outside of clamp() ranges."* (`src/styles/theme.css:171-172`).
- Solves **AI agent ambiguity** — the 4W+H docs + 7-tab dashboard let agents pattern-match the *intent* (when/when-not), not just the artifact.
- Shipped because Figma Make output was producing inconsistent React across iterations — OG locks brand DNA at the token + atom layer so consumers can't drift (`package.json:2` `"@figma/my-make-file"` confirms Figma Make origin).

---

## 3. WHEN TO USE THIS DS ✅ · WHEN NOT ❌

### ✅ Use OG when
- Building any Ken-branded surface that consumes the **case-study template** (10 numbered sections, black→white→warm alternating bg).
- Building any **report-store** surface (24 RS organisms ready: hero · filters · grids · methodology · CTA).
- Building **survey** surfaces (3 demos + 7 survey-specific molecules).
- You need **editorial-light DEFAULT** w/ optional cinematic-dark via section variant.
- You're an AI agent — OG is explicitly designed for AI-driven page assembly (`QUICK_START_PROMPT.md:9` `"PASTE THIS INTO FIGMA MAKE"`).

### ❌ Do NOT use OG when
- Building **dashboard/admin SaaS UI** — OG is editorial/marketing-focused. No data-tables · no complex form workflows · no charting beyond `ResponseChart` CSS-only bar/donut.
- Building **Next.js App Router** projects — OG is Vite/React 18, **no `'use client'` directives at all** (grep: 0 matches in `src/`). RSC compatibility was a deliberate non-goal.
- Needing **i18n / RTL / dark-mode toggle** beyond per-section `mode="dark"` prop.
- Needing **server-side rendering** — Vite SPA only.
- Needing **3D · WebGL · video-heavy hero** — OG motion is scroll-fade + shimmer + arrow-animate. No GSAP · no Lenis · no Three.js.

---

## 4. WHERE DEPLOYED

Per `ai-context/CORE.md:37-38`:
- **Repo:** `vsoffice001-cloud/Design-System-vs-26` (GitHub)
- **Live URL:** the **DesignSystemDashboard itself** is the deployed surface (Figma Make hosted preview). Not deployed to `kenresearch.com` production.
- **Consumer projects (downstream, in this workspace):**
  - `projects/casestudy-templates/template-v3/`, `template-v28/` — Vite refs that consume OG patterns
  - `projects/report-store-v07/` — RS consumer
  - `projects/topnav-v32/` — nav consumer
  - `design-system/core-v2/` — partial port to Next 15 + RSC (incomplete · see `feedback_ds_port_workflow.md`)
- **Figma source of truth:** `https://www.figma.com/design/ZXU4pnaL4AXFH6UXbftbBC/Design-system-vs-26` (`README.md:4`).

OG itself is read-only / "frozen reference" per workspace `CLAUDE.md` (it lives outside `design-system/` proper, in a parenthesized "og and final" folder).

---

## 5. HOW IT'S STRUCTURED — Tree + Counts

```
Design_system_vs_26 (og and final)/
├── DESIGN_SYSTEM_AI_CONTEXT.md (3 KB · index)          ◀ AI ENTRY POINT
├── COMPONENT_GUIDELINES_4WH.md (56 KB · 22+ entries)   ◀ CASE-STUDY 4WH
├── REPORT_STORE_COMPONENTS_4WH.md                      ◀ RS 4WH
├── QUICK_START_PROMPT.md (179 lines)                   ◀ AGENT ONBOARD
├── PROJECT_STRUCTURE.md · design-system-checklist.md   (165-file map)
├── DESIGN_SYSTEM_UPDATES.md · GITHUB_PUSH_GUIDE.md
├── ai-context/  CORE · TYPOGRAPHY · COLORS · COMPONENTS · LAYOUT · PROMPTS  ◀ 6 MODULAR DOCS
├── guidelines/  · package.json · vite.config.ts · index.html
└── src/
    ├── styles/        5 files · ~1300 LOC · ★ theme.css = 841 lines · canonical vars
    ├── design-system/ 8 files · tokens.ts (329 lines · TS mirror) + viewers
    ├── assets/ · imports/pasted_text/
    └── app/
        ├── hooks/    15 custom hooks
        └── components/
            ├── (root) 76 .tsx  ◀ FLAT: ~40 atoms + 10 case-study organisms + 16 dashboard/docs + 3 data
            ├── molecules/      26 .tsx
            ├── organisms/      30 .tsx   (24 RS + 6 cross-pillar)
            ├── foundations/     6 .tsx
            ├── ui/             46 .tsx   (shadcn primitives · Figma Make only)
            └── figma/           1 .tsx   (ImageWithFallback protected)
```

**Layer totals (verified via `ls | wc -l`):** 5 CSS · 8 TS-token · 15 hooks · ~40 atoms · 26 molecules · 30 organisms · 10 case-study organisms (flat) · 46 shadcn · 6 foundations · 16 dashboard/docs. **~165 source files total** per `design-system-checklist.md:1-9`.

---

## 6. TECH STACK (per `package.json`)

| Dep | Why chosen |
|---|---|
| **react 18.3.1** (peer) · **vite 6.3.5** · **@vitejs/plugin-react 4.7** | Stable React 18 · pre-RSC · fast HMR · zero-config for Figma Make export |
| **tailwindcss 4.1.12** + **@tailwindcss/vite** | v4 `@theme` directive enables CSS-first config (no `tailwind.config.js`) |
| **motion 12.23.24** (Framer) | All animation · scroll-driven via `useScroll`/`useInView` |
| **class-variance-authority 0.7.1** + **clsx 2.1** + **tailwind-merge 3.2** | Variant→className mapping (Button · Badge) |
| **lucide-react 0.487** | **Sole icon library** · 97 import sites · grep verified |
| **@radix-ui/\* (28 primitives)** | Headless accessible primitives under `ui/` shadcn |
| **@mui/material + @emotion 7.3.5** | *Present but unused* — Figma Make import artifact (dead weight) |
| **embla · react-slick · recharts · cmdk · react-hook-form · react-day-picker · input-otp · vaul · sonner · react-router 7 · react-dnd · react-responsive-masonry · next-themes · tw-animate-css · date-fns** | shadcn add-ons + helpers for carousels · forms · toast · masonry |

> **NOT present:** GSAP · Lenis · Three.js · Storybook · Vitest/Jest · Playwright · ESLint/Prettier config · Next.js. OG is **dashboard-as-playground SPA**, not a packaged library.

---

## 7. ARCHITECTURE DECISIONS LOG (with cited rationale)

### 7.1 — Flat `components/` (76 files) vs nested
**Evidence:** `PROJECT_STRUCTURE.md:30-120` · `ls components/` confirms 76 flat .tsx alongside `molecules/`, `organisms/`, `ui/`, `foundations/`. **Inferred (OG never states directly):** flat = import-path stability (`@/app/components/Button` and `…/HeroSection` both at depth 3). Molecules + RS organisms got own folders past comfortable-flat threshold. **Honest gap:** OG doesn't explain why case-study organisms (`HeroSection`…) stay flat while RS organisms get nested. Likely historical — case-study shipped v1, RS shipped v3.

### 7.2 — Dual TS + CSS tokens
**Evidence:** `tokens.ts:1-8` header: *"All design tokens as TypeScript constants for type-safe usage across the application. Based on the 92-5-3 color hierarchy and Major Third (1.25) typography scale."* **Why dual:** CSS vars consumed at runtime (`var(--text-2xl)` in JSX style). TS constants enable type-safe lookups (`colors.brand.red600`) + EXAMPLES showcase. Manual sync only — known weakness.

### 7.3 — Tailwind v4
**Evidence:** `package.json:69`. **Why v4:** `@theme` directive → CSS-first config. Entire token system lives in `theme.css` w/o `tailwind.config.js`. Tokens are the source of truth, not framework config.

### 7.4 — No Storybook
**Evidence:** zero Storybook deps. Showcase via `DesignSystemDashboard.tsx` (7 tabs · live). **Rationale (`CORE.md:40`):** *"Import components from `/src/app/components/`, use CSS variables from `theme.css`, follow Atomic Design methodology."* Dashboard IS showcase → Storybook redundant. Figma Make doesn't bundle Storybook → keeps export portable.

### 7.5 — Dashboard-as-playground
**Evidence:** `DesignSystemDashboard.tsx:78-91` header lists the 7 tabs verbatim: *"1. Overview 2. Foundations 3. Components 4. Patterns 5. Motion 6. Guidelines 7. Resources"*. Type at line 94: `TabId = 'overview' | 'foundations' | 'components' | 'patterns' | 'motion' | 'guidelines' | 'resources'`. The 4 page-demo surfaces (lines 188-194): `report-store-pages` · `report-store-demo` · `surveys-pages` · `surveys-demo` · `surveys-listing` (+ case-study via `PageLayoutsContent`). **Why:** single artifact = docs + visual ref + live behavior. Zero docs-drift because docs ARE code. Figma Make renders self-contained preview.

### 7.6 — NO `'use client'` anywhere
**Evidence:** `grep -rln "use client" src/` = 0 matches. **Rationale:** Vite SPA → everything is client-side → directives inert. **Biggest blocker to direct Next 15 App Router port** (per `feedback_ds_port_workflow.md`); reason `core-v2/` ported layer exists.

### 7.7 — Major Third 1.25× typography
**Evidence:** `theme.css:114-129`: *"Creates harmonious visual hierarchy through mathematical progression. RATIO: Each size is 1.25× the previous size (Major Third musical interval). BASE: 16px (1rem)."* **Why 1.25 vs 1.2 / 1.333:** enough contrast for editorial feel without becoming shouty — Bringhurst-school. 9 named tokens span 10px→76.3px (`theme.css:131-139`). **Inline update (line 127):** *"UPDATED: January 2025 - Section headings changed from --text-3xl to --text-2xl"* — h2 downsized 48.8→39px because 48.8 competed w/ hero h1.

### 7.8 — 92-5-3 color rule
**Evidence:** `ai-context/COLORS.md:11-19`: *"The single most important color rule: 92% foundation, 5% brand, 3% accent. Brand: Ken Bold Red #b01f24 — CTAs ONLY. Accent: Purple/Periwinkle/Coral/Perano — data viz, badges, card differentiation."* **Why 92-5-3:** authority-first editorial surfaces want overwhelming neutral foundation. 5% red ceiling makes every CTA feel like a decision moment (scarcity = power). 3% accent reserves color for true differentiation. Load-bearing constraint for Stripe-quality feel.

### 7.9 — Single icon library (Lucide), NOT dual
**Evidence:** `package.json:48` + grep: 97 Lucide imports · **0 Phosphor**. **The audit-spec dual-library question doesn't apply to OG.** OG uses Lucide everywhere and instead classifies icons by **semantic color** via `iconColors.ts:1-19`: *"Every Lucide icon must use one of these two colors — no exceptions. Content (#806ce0 Periwinkle): feature/metric/phase/content. Utility (#737373 Gray): navigation/action/UI/state."* **Gap recorded:** dual Phosphor+Lucide pattern likely belongs to V0.2 spec — flag for gap analysis.

---

## 8. COVERAGE MAP

**Covers ✅:** Case-study (10 numbered sections · strict black→white→warm bg-alt) · Report Store home + listing (`ReportStorePage.tsx` dual-mode · 24 RS organisms) · Surveys home + listing + demo (3 demo files · 7 survey molecules) · DS documentation (the dashboard itself · 7 tabs · 28+ sub-tabs) · Custom-research CTA. Sections: editorial section pattern via `SectionHeading` v4.0 + `SectionWrapper` (no double-padding) · card grids · pill carousels (`HorizontalScroll` vs `ScrollFade` flowchart) · 6-atom + 4-molecule filter system + `MobileFilterSheet` · reading-progress + sticky-CTA case-study chrome · IO scroll-reveal (`FadeInSection` + `CardReveal`) · 11-theme Badge w/ light/dark auto-invert · 7-variant `ResourceCard` · form modals (react-hook-form) · sonner toast.

**Intentionally NOT covered ❌:** Data dashboards (no DataTable · Recharts present-unused) · auth flows · admin CRUD · email templates · PDF gen · i18n / RTL · multi-tenant theming · global dark-mode toggle (per-section `mode="dark"` only) · mobile app shell · 3D/WebGL hero.

---

## 9. SELF-DOCUMENTATION STRATEGY

OG documents itself via **4 concentric layers**:

1. **Entry — `DESIGN_SYSTEM_AI_CONTEXT.md`** (3 KB index) routes to:
2. **Modular AI docs `ai-context/*.md`** — 6 modules each ≤15 KB so AI context doesn't OOM. Reading order: CORE → TYPOGRAPHY → COLORS → COMPONENTS → LAYOUT → PROMPTS (`CORE.md:46-72`).
3. **Deep 4W+H refs** — `COMPONENT_GUIDELINES_4WH.md` (56 KB) · `REPORT_STORE_COMPONENTS_4WH.md` · `FILTER_SEARCH_SYSTEM_4WH.md`. Each component: WHY · WHAT · WHEN ✅ · WHEN NOT ❌ · HOW + props.
4. **Live dashboard** — `DesignSystemDashboard.tsx` renders every atom + token viewer + page demo. Visual = code = docs.

**Supporting:** `QUICK_START_PROMPT.md` (copy-paste agent onboard <1 min) · `PROMPTS.md` (12 specialized prompts) · `design-system-checklist.md` (canonical file map) · `DESIGN_SYSTEM_UPDATES.md` (changelog).

**Key innovation:** every `theme.css` token has **inline rationale comments** (e.g. typography ratio `:114-129` · container width `:46-78` · `--text-card-micro` table `:165-185`). The CSS file IS a 4W+H doc — agents read tokens and learn intent simultaneously.

---

## 10. STRENGTHS (5 things OG does excellently)

1. **Documentation density per token.** `theme.css` reads like a typography textbook — every variable carries Baymard-cited rationale (`theme.css:58-76`). Agents and humans both onboard fast.
2. **Strict 92-5-3 + Major Third constraints make drift architecturally hard.** A designer literally cannot mis-size an h2 because `--text-2xl` is the only legal size for it (`ai-context/CORE.md:128-135`).
3. **Self-rendering documentation.** Dashboard is the docs — no "demo-vs-prod" drift possible.
4. **AI-first authoring.** OG was built knowing Figma Make + Claude would author downstream pages — every 4W+H entry includes WHEN NOT and decision flowcharts to prevent agent mis-use.
5. **Cinematic finish on a budget.** Shimmer · arrow-animate · scroll-fade · staggered reveals — all done via Framer Motion + Tailwind, no GSAP/Lenis bloat. Performant + portable.

---

## 11. WEAKNESSES (3 things even OG could improve)

1. **No `'use client'` directives → not Next.js App Router portable.** Forces a separate `core-v2/` port effort. A modern DS should ship dual-runtime (RSC-safe by default · client-marked where needed).
2. **Dual token sources (`theme.css` + `tokens.ts`) drift over time.** No build-step keeps them in sync — manual reconciliation only. Style Dictionary or similar DTCG pipeline would solve this.
3. **No automated tests.** Zero Playwright · zero Vitest · zero axe runs in CI. Visual QA is human-only via the dashboard. For a DS this large, snapshot + a11y tests would be table-stakes.

Plus honorable mentions: flat folder makes searching painful at >100 files · MUI deps are dead weight from Figma Make import · `react-dnd` and `react-slick` look unused but ship in the bundle.

---

## 12. REUSABILITY SCORE — OG as a whole

**★★★★☆ — 4 / 5**

**Justification:**
- **+1** Token system + 4W+H docs are best-in-class for AI-driven authoring · directly re-usable verbatim.
- **+1** ~100 atoms/molecules/organisms cover Ken's needs end-to-end · highest-reuse atoms (Button · Badge · SectionHeading · SectionWrapper · Card) score 5/5 individually.
- **+1** Editorial DNA (typography ratio · 92-5-3 · bg alternation · shimmer) ports cleanly to any new framework.
- **+1** Dashboard-as-playground pattern is genuinely innovative · transferable to other DSs.
- **−1** Vite/React 18 / no-`'use client'` stack ties OG to its era · forcing port work for every modern consumer.

**Verdict:** OG is a **5/5 design system intent** + **3.5/5 deliverable artifact** in a 2026 stack — averaged to 4. It's the **canonical source of brand truth** for Ken Research and every downstream port (core-v2 · ken-research-v0.2 · etc.) should treat OG documentation as the constitution and OG component code as the reference implementation.

---

**Audit complete.** Next files in this audit: per-atom WWWWH docs · per-molecule docs · top-15 organism docs · 6 token-domain docs (per `01_methodology.md:213-222` completion criteria).
