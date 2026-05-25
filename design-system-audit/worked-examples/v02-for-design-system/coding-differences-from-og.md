# Coding Differences · V0.2 vs OG · vs Aura Production Target

**WHAT** — What the user meant by "coding practice may differ" · 23 concrete deviations between V0.2 implementation and Aura production target (Next 15/RSC + Tailwind v4 + Lucide-only + Style Dictionary v4 tokens + Framer Motion + pnpm + tests).

**WHY this matters** — V0.2's CONTENT/DESIGN is reference-grade. V0.2's CODE is Vite-SPA prototype style · NOT production-ready. Port the patterns · rewrite the implementation.

**WHEN to reference ✅**
- Before copying ANY V0.2 component file directly into new DS
- During code review of new DS port work
- When onboarding contributors who think V0.2 code is canon

**WHEN NOT ❌**
- Don't use this doc as anti-V0.2 polemic · the design IS gold · only the code differs
- Don't apply these to OG · OG has its own deviation patterns (see `og-audit/00_overview.md`)

**WHERE applied** — V0.2 src/ tree · noted file:line per deviation.

**HOW to use this doc** — Each deviation is a checklist item for the port process. Run through during transfer of any V0.2 component into new DS.

---

## 23 deviations · do NOT copy code-wise

### 1. Tailwind v4 inline arbitrary values everywhere
**Where:** `Footer.tsx:95-260` · `HeroSection.tsx:92` · most components
**What:** `bg-[var(--brand-red-500)]` · `text-[#BDBDBD]` · `px-[84.375px]` · `text-[40px]`
**Problem:** Tokens ARE defined in `src/styles/theme.css:13-80` but ~60% of code inlines hex instead of using vars.
**Aura target:** Use `@theme` block to generate Tailwind utilities (`bg-brand-red-500` · `text-grey-500` · `px-section`).
**Action on port:** Find/replace every inline hex with token utility · ban via lint.

### 2. Dual icon libraries (Phosphor + Lucide)
**Where:** `package.json:14-15` · `constants/stakeholder-icons.tsx` · `constants/segmentation-icons.tsx`
**What:** `@phosphor-icons/react` for data icons · `lucide-react` for UI icons. Documented in `MASTER_COMPONENT_INDEX.md:122-145`.
**Problem:** Phosphor adds ~80KB · 2 mental models · maintenance burden.
**Aura target:** Lucide-only.
**Action on port:** Map Phosphor icons → Lucide equivalents · update icon registries · strip `@phosphor-icons/react` dep.

### 3. MUI dependency
**Where:** `package.json:18-19`
**What:** `@mui/material@7.3.5` + `@mui/icons-material` present · barely referenced.
**Problem:** Dead-weight dep · ~200KB · conflicts w/ Tailwind philosophy.
**Action on port:** Strip both `@mui/*` packages.

### 4. No Next.js · no SSR
**Where:** `vite.config.ts` · `package.json:6-9` (only `build` + `dev` scripts) · `App.tsx:48-161` hand-rolled pathname router
**What:** Vite SPA · client-only · custom pathname switch.
**Aura target:** Next 14/15 App Router · RSC + `'use client'` boundaries.
**Action on port:** Re-code every page as RSC · client-only components opt-in via `'use client'`.

### 5. No tests · no lint · no CI
**Where:** `package.json:6-9`
**What:** Only `build` and `dev` scripts. Zero test/lint config files.
**Aura target:** pnpm `lint` · `format` · `test` (Playwright + axe).
**Action on port:** Add ESLint config · Playwright suite · axe-playwright · Husky pre-commit.

### 6. Package metadata residue
**Where:** `package.json:2`
**What:** Package name `@figma/my-make-file` (Figma Make scaffold residue).
**Action on port:** Rename to `@kenresearch/<project-name>`.

### 7. No `engines.node` or `packageManager` field
**Where:** `package.json`
**What:** No pinned Node version · no pnpm version pin.
**Aura standard:** `engines.node >=20` · `packageManager: pnpm@10.33.0`.
**Action on port:** Add both fields · match workspace `.nvmrc`.

### 8. Hard-coded hex in Footer
**Where:** `Footer.tsx:95-260`
**What:** `#141016` · `#BDBDBD` · `#989898` · `#7C7C7C` · `#757575` · `#FFFFFF1A` · `#B01F24` · `#8A191D` · `#6400E4` direct.
**Action on port:** Map every hex → token (`--grey-800` · `--grey-400` · `--brand-red-500` etc.) and reference via Tailwind utility.

### 9. Magic-number padding
**Where:** `px-[84.375px] lg:px-[112.5px]` recurs ~14× across sections
**What:** Likely derived from 12-col grid math at 1200px container (84.375 = 1200/14.22 · 112.5 = 1200/10.67) but undocumented.
**Action on port:** Codify as `--section-px-base: 5.273rem` (84.375px) · `--section-px-lg: 7.031rem` (112.5px) OR replace w/ Tailwind step (`px-20 lg:px-28`).

### 10. Pexels.com video hotlink
**Where:** `HeroSection.tsx:64`
**What:** Hero bg video URL = `https://videos.pexels.com/...`. Third-party hot-link · no fallback · no license tracking.
**Action on port:** Self-host as `/public/assets/hero-bg.mp4` · check Pexels license · add poster fallback.

### 11. Google Fonts hotlink
**Where:** `src/styles/fonts.css` (likely imports from `fonts.googleapis.com`)
**Action on port:** Self-host DM Sans + Noto Serif via `next/font` (Next-port) · improves LCP + privacy.

### 12. Orphan file at repo root
**Where:** `SIMPLE_TOC_TEMPLATE.tsx` (1.4KB · loose · never imported)
**Action on port:** Delete.

### 13. Hard-coded copyright year
**Where:** `Footer.tsx:259`
**What:** `© 2026` literal.
**Action on port:** `© {new Date().getFullYear()}` · auto-rolls every year.

### 14. Newsletter form has no submit handler
**Where:** `Footer.tsx:212-227`
**What:** `useState` for email · no `<form onSubmit>` · button does nothing.
**Action on port:** Wire to backend POST endpoint OR fire `console.log` placeholder w/ `// TODO: tech team wires` comment.

### 15. Dormant purple bar in Footer
**Where:** `Footer.tsx:133-136`
**What:** `#6400E4` opacity:0 bar · no JS driver · vestigial active-link indicator from OG.
**Action on port:** Delete.

### 16. PlayerVariantSwitcher debug widget
**Where:** `App.tsx:193` · `PlayerVariantSwitcher.tsx`
**What:** Debug widget for swapping `AudioPlayer` variants.
**Action on port:** Delete (or gate behind `import.meta.env.DEV`).

### 17. Inline radial-gradient styles
**Where:** `MarketOverview.tsx:21-28` · `FinalCTA.tsx:8-15`
**What:** `style={{ backgroundImage: 'radial-gradient(...)' }}` repeated inline.
**Action on port:** Move to `.dot-pattern` CSS utility class · reference once.

### 18. requestAnimationFrame instead of Framer Motion
**Where:** `HeroSection.tsx:22-43`
**What:** Hero orbs animated via raw RAF loop.
**Problem:** No `useReducedMotion()` compliance · doesn't respect `prefers-reduced-motion`.
**Action on port:** Replace w/ `motion.div` + `useMotionValue` + spring animation · honors reduced motion.

### 19. Audio player provider wrapping whole app
**Where:** `App.tsx:48` (`<AudioPlayerProvider>` wraps everything)
**What:** Context provider for audio-player feature.
**Question on port:** Is audio player in scope for Aura production? If not · strip.

### 20. Mobile footer accordion missing a11y attrs
**Where:** `Footer.tsx:101-110`
**What:** Mobile accordion has no `aria-expanded` · no `aria-controls`.
**Action on port:** Add ARIA attrs OR replace w/ Radix Accordion (Lightning + Polaris industry-research recommends Radix for this exact case).

### 21. Untokenized letter-spacing values
**Where:** Footer typography
**What:** `tracking-[0.62px]` · `tracking-[0.60px]` recur as pseudo-tokens.
**Action on port:** Codify as `--tracking-footer-meta: 0.0388em` OR remove (often unnecessary at body sizes).

### 22. Redundant audit MD files
**Where:** V0.2 root · 98 MDs total
**What:** 4 near-duplicate audit docs (`DESIGN-SYSTEM-AUDIT-REPORT.md` · `DESIGN_SYSTEM_AUDIT.md` · `DESIGN_SYSTEM_AUDIT_REPORT.md` · `REAL_DESIGN_SYSTEM_AUDIT.md`) + ~25 phase-progress reports.
**Action on port:** Consolidate to ~25 canonical docs · archive rest in `_archive/`.

### 23. d3 type-defs in `dependencies` not `devDependencies`
**Where:** `package.json` (likely · verify)
**What:** `@types/d3` in `dependencies`.
**Action on port:** Move to `devDependencies` · prevents runtime download.

---

## Summary table · disposition per deviation

| # | Deviation | Disposition |
|---|---|---|
| 1 | Inline Tailwind hex | Replace w/ tokens · lint-enforced |
| 2 | Phosphor dual | Lucide-only on port |
| 3 | MUI | Strip |
| 4 | Vite SPA | Port to Next 14 RSC |
| 5 | No tests/lint/CI | Add full pnpm scripts + harness |
| 6 | `@figma/my-make-file` name | Rename `@kenresearch/<project>` |
| 7 | No engines | Add `engines.node + packageManager` |
| 8 | Hex in Footer | Token-replace |
| 9 | Magic padding | Codify OR Tailwind step |
| 10 | Pexels video | Self-host |
| 11 | Google Fonts | Self-host via next/font |
| 12 | Orphan TOC template | Delete |
| 13 | Hard-coded year | `new Date()` |
| 14 | Newsletter no-op | Wire OR placeholder |
| 15 | Dormant purple bar | Delete |
| 16 | PlayerVariantSwitcher | Delete or DEV-gate |
| 17 | Inline gradients | CSS utility class |
| 18 | RAF animations | Framer Motion w/ reduced-motion |
| 19 | AudioPlayerProvider | Strip if out-of-scope |
| 20 | Missing ARIA on mobile accordion | Radix Accordion |
| 21 | Untokenized tracking | Codify or drop |
| 22 | Redundant MDs | Consolidate ~25 |
| 23 | d3 types in deps | Move to devDeps |

---

## REUSABILITY SCORE

⭐⭐ — This doc is V0.2-specific · won't be reused beyond port. But CRITICAL for one-time port to prevent dragging anti-patterns into new DS.

## Linked concepts
- `00_overview.md` — V0.2 identity + stack
- `report-pdp-anatomy.md` — design patterns to keep
- `documentation-method.md` — doc framework to keep
- `pattern-lessons.md` — REPLICATE / REJECT / MODIFY synthesis
- `og-audit/00_overview.md` — comparison · OG also has deviations · this is V0.2-specific
- `industry-research/shadcn-ui.md` — what Aura production should resemble code-wise
- `industry-research/lightning.md` — a11y standards V0.2 should meet
