# Ken Research Design System — Evolution Roadmap

**Companion to:** [KENRESEARCH_DESIGN_SYSTEM_PHASE1.md](KENRESEARCH_DESIGN_SYSTEM_PHASE1.md)  
**Status:** Active · Updated 2026-04-30  
**Owner:** design@kenresearch.com + Aura

---

## What This Doc Is

Phase 1 of the Ken Research Design System is functional but partially industry-aligned. This document audits the gaps against industry practices and provides a prioritized evolution roadmap.

**Guiding principle:** Evolve toward best practices without breaking the non-obvious rules Phase 1 established. See Phase 1 doc for those rules.

---

## Industry Practice Gap Audit

### P0 — Correctness Gaps (phase 1 has bugs or missing critical pieces)

| # | Gap | Impact | DS-v26 | Dashboard |
|---|---|---|---|---|
| P0.1 | No a11y audit run. WCAG AA claimed but not verified. | Ships inaccessible components | ✗ | ✗ |
| P0.2 | No `prefers-reduced-motion` audit. Animations may harm vestibular users. | Legal/WCAG violation risk | ✗ | ✗ |
| P0.3 | Dashboard deep-link URL params silently broken. `DashboardLayout` passes `urlTab/urlSubTab` props but `DesignSystemDashboard` accepts no props. Back/forward and direct URLs don't restore active tab. | Functional bug in documentation surface | — | ✗ |
| P0.4 | `text-card-micro` (10px) used for main text items in some older components. Below minimum readable size. | Readability + a11y violation | ✗ | — |
| P0.5 | Inline hex color strings in some older components (`#b01f24`, `#806ce0` hardcoded). Breaks theming. | Token system integrity | ✗ | ✗ |
| P0.6 | `react-slick` in Dashboard dependencies but CSS not imported. Likely breaks carousels. | Visual regression | — | ✗ |
| P0.7 | `figma:asset/` URL scheme in dashboard `vite.config.ts` — Figma Make artifact. Must be removed after confirming no live imports remain. | Build hygiene | — | ✗ |

### P1 — Structural Gaps (would be caught in a design system maturity audit)

| # | Gap | Impact |
|---|---|---|
| P1.1 | No W3C DTCG `tokens.json`. Token source is TypeScript + CSS only. | Cannot feed Figma Variables, Style Dictionary, or cross-platform token consumers |
| P1.2 | No Style Dictionary / token pipeline. No automated multi-format output. | Manual sync between Figma, CSS, and TS tokens — drift accumulates |
| P1.3 | No Storybook / isolated component testing environment. | Cannot demo components in isolation; tech team can't verify states without app context |
| P1.4 | No breakpoint system documentation. | Every developer invents breakpoints; inconsistent responsive behaviour |
| P1.5 | No motion specification doc. | GSAP vs Framer vs CSS unclear; easing/duration values inconsistent across components |
| P1.6 | No form system. Input, select, checkbox, radio, textarea, validation states, error patterns, success states. | Must build from scratch per surface — inconsistent UX |
| P1.7 | No dark mode spec for editorial surfaces (distinct from cinematic dark ken-v1). | Two-surface brand has no documented editorial → dark swap rules |
| P1.8 | No contribution guide for design or engineering. | DS grows chaotically; component submissions with no review process |
| P1.9 | No CI token validation. `validate-tokens.cjs` exists but not wired to CI. | Hardcoded values slip in undetected |
| P1.10 | Dashboard `package.json` name is `@figma/my-make-file` (Figma Make default). | Breaks monorepo integration or npm publish |
| P1.11 | Dashboard has no `tsconfig.json`. Vite infers defaults. No `strict: true`. | Type errors not caught; tech team must create on intake |
| P1.12 | Dashboard has no lint / format / test scripts in `package.json`. | 13-point gate lint check always open; tech can't maintain quality on intake |

### P2 — Maturity Gaps (post-Phase 1, Phase 3+ territory)

| # | Gap |
|---|---|
| P2.1 | No design tokens versioning / changelog (semver for tokens) |
| P2.2 | No published npm package for DS components (internal registry or workspace) |
| P2.3 | No visual regression testing (Chromatic, Percy, or similar) |
| P2.4 | No interactive documentation with live prop controls (Storybook Args, Ladle) |
| P2.5 | No multi-brand theming infrastructure (future: white-label research portals) |
| P2.6 | No icon system specification (size grid, stroke weight, export conventions) |
| P2.7 | No data visualization design language (chart colors, axis styles, grid rules) |
| P2.8 | No component migration guides between versions |
| P2.9 | `ReportGridCard` deprecated but still in codebase — needs removal after migration audit |
| P2.10 | Mock data (`data.ts`) in `src/app/components/` instead of `src/lib/mock-data.ts` — 15+ import paths to update |

---

## Phase 2 Priorities

### Immediate (next sprint)

**Fix P0 bugs first:**

1. **P0.1 + P0.2** — Run axe-playwright across DS-v26 and Dashboard. Audit each animated component for `prefers-reduced-motion` guard. Fix violations.

2. **P0.3** — Dashboard deep-link fix:
   ```tsx
   // DesignSystemDashboard.tsx — add props interface
   interface DesignSystemDashboardProps {
     urlTab?: string;
     urlSubTab?: string;
   }
   // sync internal activeTab state from urlTab on mount + prop change
   ```

3. **P0.4** — Scan for `text-card-micro` used on main text items. Replace with `--text-xs`.

4. **P0.5** — Run `validate-tokens.cjs` on both projects. Replace hardcoded hex with token vars.

5. **P0.6** — Check Dashboard for `react-slick` usage. If unused, remove dependency. If used, add CSS imports.

6. **P0.7** — Audit Dashboard for `figma:asset/` imports. If none found in `src/`, remove resolver from `vite.config.ts`.

### Short-term (Phase 2)

**Structural foundations:**

7. **P1.4 — Breakpoint doc.** Define and document the 4 breakpoints used across DS components:
   ```
   sm: 640px  (mobile landscape / small tablet)
   md: 768px  (tablet)
   lg: 1024px (desktop)
   xl: 1280px (wide desktop)
   ```
   Audit all responsive classes. Document in Guidelines tab.

8. **P1.5 — Motion spec.** Define and document:
   - When to use Framer Motion vs CSS transitions
   - Standard easing tokens (`--ease-out-expo`, `--ease-spring`, etc.)
   - Duration scale (100ms / 200ms / 300ms / 500ms / 800ms)
   - Scroll animation rules (threshold, stagger, offset)
   - Always-on vs interaction-triggered vs scroll-triggered categories

9. **P1.6 — Form system.** Design and build:
   - Text input (rest / focus / error / disabled / read-only)
   - Textarea
   - Select / dropdown
   - Checkbox (with FilterCheckbox as reference)
   - Radio
   - Form layout (label above, helper text below, error below)
   - Validation states

10. **P1.1 + P1.2 — Token pipeline (lightweight).** 
    - Author a `tokens.json` from `theme.css` (W3C DTCG format — primitives + semantic layers)
    - Wire Style Dictionary to output CSS custom properties + TS constants
    - Retire manual sync between `theme.css` and `tokens.ts`
    - Add `pnpm build:tokens` script

11. **P1.9 — CI token validation.**
    - Wire `validate-tokens.cjs` to `pnpm lint` in both DS projects
    - Fails if any `#[0-9a-fA-F]{3,6}` outside `tokens.json` found in src/

12. **P1.3 — Storybook (or Ladle).**
    - Ladle preferred (faster, Vite-native, zero config)
    - Stories for all 35 atoms at minimum
    - Molecules + organisms deferred to Phase 3

13. **P1.7 — Dark mode spec for editorial.**
    - Editorial light → editorial dark mapping rules
    - Which surfaces use it, when
    - Token override strategy (CSS custom property override in `[data-theme="dark"]`)

14. **P1.8 — Contribution guide.**
    - Component naming conventions
    - Required: 4W+H doc, Storybook story, a11y check, reduced-motion guard
    - Token-first rule (no hardcoded values)
    - Review process (design review + code review)

### Medium-term (Phase 3)

15. **P1.11 + P1.12 — Dashboard dev tooling.** Add `tsconfig.json` (strict), ESLint + Prettier config, test scripts. Pre-condition for tech team intake.

16. **P1.10 — Fix `package.json` name.** Rename from `@figma/my-make-file` to `@kenresearch/design-system-dashboard`.

17. **P0.3 + deep-link verification** — After props fix, verify all 50+ routes deep-linkable.

18. **P2.10 — Mock data move.** Migrate `data.ts` from `src/app/components/` to `src/lib/mock-data.ts`. Update 15+ import paths. Only worth doing after other P0/P1 fixes.

19. **P2.9 — Remove `ReportGridCard`.** Audit all usages → migrate to `ReportCard layout="grid"` → delete deprecated component.

---

## ken-v1 ↔ DS-v26 Convergence Roadmap

`ken-v1` currently has parallel implementations of components that exist in DS-v26. Eventually ken-v1 should consume DS-v26 components as a package.

**Gap matrix (current state):**

| Component | DS-v26 has | ken-v1 has | Action |
|---|---|---|---|
| Button | ✓ full system | Inline button styles | Phase 3: consume DS Button |
| Card | ✓ v4.0 3-variant | Inline card | Phase 3: consume DS Card |
| SectionHeading | ✓ v4.0 prop-API | Inline heading pattern | Phase 3: consume DS SectionHeading |
| Badge | ✓ 11 themes | Simple badge | Phase 3: consume DS Badge |
| MetricStat / StatCard | ✓ StatCard molecule | MetricStat inline | Phase 3: align API then consume |
| HeroSection | ✓ case study organism | ken-v1 own HeroSection | Different surface — parallel OK |
| ReportCard | ✓ canonical | N/A | Report Store surface only |
| Navbar | ✓ DS Navbar | ken-v1 own nav | Different variant — parallel OK |

**Package strategy (Phase 3):**
1. Publish DS-v26 components as internal npm package (`@kenresearch/ui`)
2. ken-v1 adds it as a dependency
3. Migrate components one at a time (Button first — highest reuse)
4. Cinematic dark variant tokens injected via CSS custom property override at ken-v1 root

---

## Tracking

Use DECISIONS.md for any decision that forks from this roadmap.  
Use LEARNINGS.md for any finding from implementation (what worked, what didn't).  
Update this file when a phase is completed or priorities shift.

**Phase 1 complete:** 2026-04-30  
**Phase 2 start:** TBD  
**Phase 3 start:** TBD (after Phase 2 P0s + structural foundations)
