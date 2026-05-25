# 00 — Overview · V0_lite_report-legacy

> WWWWH: **what** this project is, **where** it lives, **who** built it, **why** it exists as a worked example, **how** it is structured.

---

## What this project IS

`projects/V0_lite_report-legacy/` is a **report-detail landing page** for one syndicated Ken Research market-intelligence report: *"Global AI in Healthcare Market Analysis 2024"*. It is the marketing surface a prospect sees after clicking through from a SERP or report-store listing — the page whose job is to convert *interest in the topic* into a *download-sample* or *request-custom-report* action.

It is **not** a viewer (no PDF reader, no logged-in dashboard). It is **not** a listing (no filtering across multiple reports). It is a single-report **persuasion page** that mixes: hero claim → preview-card "see the goods" → animated chapter walkthrough → slideshow proof → highlight grid → FAQ → final CTA.

Origin lineage is recorded verbatim in `LEGACY-READONLY.md:30-33`:
- Source: `V0_lite_report_ver_7.05` (Figma Make export, package name was `@figma/my-make-file` — see `package.json:2`)
- Frozen: 2026-05-08
- Replaced by: `projects/V0_lite_report/` (Next.js 15 port)
- Audit: `docs/aura-sprint-2026-05-07-port/A1-V0_lite_report-audit.md`

The "legacy" suffix is meaningful — the user explicitly retained this folder as a **visual-truth reference** during the Next.js port. `LEGACY-READONLY.md:9-13` lists exactly which patterns survive the port: `HeroSection layout + animated counters + StatCard composition`, `SlideshowSection light/dark variant choreography`, `ChapterExtendedTOC phase-filter UX`, `ScrollProgress + ScrollToTop atoms`.

---

## Tech stack

| Layer | Choice | Source-of-truth |
|---|---|---|
| Build | Vite 6.3.5 | `package.json:71` |
| UI | React 18.3.1 + Tailwind v4 (12 + 4.1) | `package.json:67-73` |
| Animation | `motion` v12 (Framer Motion successor) | `package.json:50` — used everywhere via `import { motion } from "motion/react"` |
| Primitives | full Radix-UI suite (24 packages), shadcn/ui mirrors at `src/app/components/ui/` | `package.json:17-42` |
| Icons | lucide-react + `@phosphor-icons/react` | `package.json:14,49` (Phosphor only for `LockKey` in `ChapterMarketOverview.tsx:12`) |
| Typography | Noto Serif (display) + DM Sans (body) — Major Third 1.25 scale, 16px base | `src/styles/theme.css:11-19`, `src/styles/fonts.css` |
| Tokens | TS object (`src/design-system/tokens.ts`) **and** CSS custom-property mirror (`src/styles/theme.css:1-200`) — dual-source by design |

No pnpm workspace, no DS package — the design system **lives inside this project** at `src/design-system/`. This is the Figma-Make starting shape; the workspace-level DS at `design-system/core-v2/` is the *port* destination.

---

## File structure

```
src/
├── main.tsx                          ← Vite entry, imports App
├── app/
│   ├── App.tsx                       ← Root composition, page-flow comment block
│   ├── components/                   ← 26 page-section + atom files
│   │   ├── HeroSection.tsx           ← 730 lines, includes inline StatCard + ChartBar
│   │   ├── SampleReportPreview.tsx   ← Orchestrator only (Tier-4 decomposed)
│   │   ├── SlideshowSection.tsx      ← Unified light/dark deck carousel
│   │   ├── ReportHighlights.tsx      ← 6-card highlight grid
│   │   ├── FAQSection.tsx            ← 6-Q accordion
│   │   ├── CTASection.tsx            ← Final conversion
│   │   ├── Footer.tsx                ← 4-col site footer
│   │   ├── NewHeader.tsx             ← Top nav w/ 6 dropdowns
│   │   ├── sample-report/            ← Chapter sub-components (post-decomp)
│   │   │   ├── data.ts               ← All static content (TOC, phases, filters)
│   │   │   ├── SidebarTOC.tsx        ← 3-state side TOC
│   │   │   ├── ChapterExecutiveSummary.tsx
│   │   │   ├── ChapterMarketOverview.tsx  ← Paywall chapter
│   │   │   ├── ChapterExtendedTOC.tsx ← 2-phase/3-phase variant
│   │   │   └── PhaseCard.tsx
│   │   ├── mobile/                   ← MobileMenu + MobileTOC
│   │   ├── ui/                       ← 47 shadcn mirrors (47 files)
│   │   └── figma/                    ← ImageWithFallback (legacy)
│   └── hooks/                        ← useAnalytics, useShimmer, useFocusTrap, etc.
├── design-system/                    ← The IN-PROJECT DS (this is the reference shape)
│   ├── Button.tsx                    ← 387 lines, the variant under scrutiny
│   ├── tokens.ts                     ← Typed token object
│   ├── chartColors.ts, iconColors.ts
│   └── components/                   ← Card, ScrollToTop, ScrollProgress, InlineLink, SectionLabel, SectionHeading, SectionWrapper, AnimatedArrow, Badge
├── styles/                           ← theme.css (tokens), tailwind.css, fonts.css
├── imports/                          ← Figma-Make raw exports (LogoContainer, V0Lite, svg paths) — kept as-is per legacy contract
└── github-push/                      ← Push-staging duplicates (per LEGACY-READONLY.md:22 → DISCARD)
```

Root-level: **35 markdown audit/phase/fix docs** (e.g. `PHASE_2_COMPLETE.md`, `BUTTON_ANIMATION_FIX.md`, `HERO_SECTION_DESIGN_SYSTEM_GUIDE.md`, `TYPOGRAPHY_CHANGES_NEEDED.md`). These are the *worked-evidence trail* — every visual decision has a paired writeup. That alone is unusual for a Figma-Make export and is half the reason the user calls this "very good."

---

## Why the user considers it a good reference

User note verbatim: *"very good project · proper reasons of everything · BUT secondary button is WRONG."*

Five observable reasons this project earns the "proper reasons" reputation:

### 1. Comments document **decisions**, not behaviour

The 92-5-3 color hierarchy (92% foundation black/white/warm, 5% brand red CTAs, 3% accent purple) is not just declared in `tokens.ts:307-329` — it is *cited at the call site* whenever there's any chance of confusion. Examples:

- `App.tsx:9-13` — explains why ScrollProgress uses brand red ("persistent visual indicator … soft conversion signal") and ScrollToTop does *not* ("navigation aid, not a CTA")
- `ChapterExecutiveSummary.tsx:6-8` — stat-card purple icons stay "within the 3% accent tier boundary"
- `ChapterMarketOverview.tsx:5-9` — paywall lock icon (3%) vs Unlock CTA (5% brand red) decision spelled out
- `ChapterMethodology.tsx:14-22` — ChevronRight icons are "DECORATIVE POINTERS … NOT disclosure/expand arrows"
- `iconColors.ts:7-44` — full prose on which icons are content (#806ce0) vs utility (#737373) with ✅/❌ permitted/prohibited list

### 2. Design tokens have **two synchronised sources**

`src/design-system/tokens.ts` is a typed TS object (autocomplete + type-safety). `src/styles/theme.css` is the CSS-custom-property mirror used by Tailwind v4. Same scale, same hex values, same naming — but each serves a different consumer. This dual-source pattern is the Figma-Make seed that workspace `design-system/tokens/` (Style Dictionary v4 / DTCG) later supersedes.

### 3. Strict typography scale — Major Third

`theme.css:10-19` and `tokens.ts:62-90` declare exactly nine sizes (`xs 0.8rem` → `5xl 4.768rem`). `SectionHeading.tsx:34-45` documents which H-level uses which scale step *and* when serif vs sans applies. `font-serif font-light` is the editorial elegance signature for H1/H2; H3 switches sans-on-mobile / serif-on-sm+ — a deliberate responsive type-shift.

### 4. Tier-4 component decomposition is explicit

`SampleReportPreview.tsx:6-14` lists exactly which sub-components exist post-decomposition. Comment block at `:18-25` explains the `!py-0` SectionWrapper override and the compensating internal padding — i.e. **non-obvious CSS overrides are justified in prose, not left as mystery**.

### 5. Mobile-first responsive is enforced as code-shape, not media-queries

`HeroSection.tsx:284-345` shows the rare pattern of *three separate JSX blocks* for mobile / tablet / desktop CTA rows (each `<sm`, `sm:flex md:hidden`, `hidden md:flex`) — buttons get different sizes (`sm/md/lg`) per breakpoint, not just different widths. Heavy-handed, but it gives perfect control and is **commented as intentional**.

---

## How it relates to the new DS work

This project is the **OG visual truth** for the report-detail surface. The workspace audit at `design-system-audit/og-audit/` examines it as one of several legacy projects; this worked-example doc set lifts the *most defensible* patterns and the *one explicit defect* (secondary button — see `secondary-button-issue.md`) so the new `design-system/core-v2/` Button component can replicate strengths and avoid the visual-weakness trap.

Key reference files in this directory:
- `page-anatomy.md` — section-by-section visual walkthrough
- `reasoning-log.md` — verbatim WHY-quotes (the gold)
- `secondary-button-issue.md` — the user-flagged defect
- `pattern-lessons.md` — REPLICATE / REJECT / MODIFY recommendations

Live URL during port: `http://localhost:3020/` (Vite dev server).
