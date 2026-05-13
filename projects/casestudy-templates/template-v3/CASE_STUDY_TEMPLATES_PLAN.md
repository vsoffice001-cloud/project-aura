# Case Study Templates — Build Plan

**Status:** Draft for approval
**Date:** 2026-04-22
**Owner:** Design System vs 26
**Scope:** Five swappable full-page case study templates (A–E), a page-level variant switcher, and the shared atom foundation they all consume.

---

## 1. Why

### Why new templates at all
The current case study page ("Evaluating India's Transformer Bushing Market for IPO Readiness — ₹110 Cr") uses one minimalist editorial shell. That shell tells one kind of story well — authoritative, static, print-like. It underperforms when the case study's strength is:

- **Quantitative** (market sizing, trajectories) — prose buries the data.
- **Procedural** (multi-year journeys, phased mandates) — a single scroll column flattens time.
- **Metric-heavy** (CFO/buy-side readers) — they read dashboards, not essays.
- **Archival** (citable reports) — web pages don't give the artifact weight a PDF does.
- **Flagship** (brand moments) — understated editorial undersells marquee wins.

One shell for five story types is the problem.

### Why swappable (not a single replacement)
- **Content dictates form.** The same firm ships deals that are best told five different ways.
- **No regret.** A replacement forces a decision today; a switcher lets content teams pick per case study.
- **Comparative judgment.** A variant switcher lets us preview identical content through five shells side-by-side and learn empirically which template wins for which story archetype.
- **Future-proof.** Adding a sixth template later is a new variant, not a redesign.

### Why these five (A Tombstone Editorial, B Scrollytelling, C Chaptered Longform, D Deal Dashboard, E Cinematic)
They span the space of IB/advisory story archetypes with minimal overlap:

| Template | Story archetype | Reader |
|---|---|---|
| A | "This deal closed, and it mattered" | General / press |
| B | "The market's numbers are the thesis" | Analyst |
| C | "This is a citable sector POV" | Research / media |
| D | "Here are the metrics — read fast" | CFO / buy-side |
| E | "Flagship brand moment" | Everyone, but especially prospects |

Any fewer and we'd leave an archetype uncovered. Any more and we'd overlap.

### Why this build order (A → C → D → B → E)
Risk-ascending. A exercises every shared atom at lowest motion complexity — shipping A validates the atom API. C stresses the footnote system. D introduces dark-mode token flip and sparklines in isolation. B introduces scroll infrastructure once atoms are stable. E is highest-risk (horizontal scroll-jack + kinetic hero) and reuses B's proven scroll hook.

---

## 2. What

### What we are building
1. **Foundation atom set** (built first, before any template):
   - `KPITile` — variants: editorial / mono-tabular / inline-exhibit / inverted
   - `PullQuote` — variants: warm / step / hanging-serif / card / card-back
   - `TombstoneCard` — variants: hero / header / minimal
   - `SectorChip` — outline / filled
   - `Footnote` + `FootnoteMarker` with page-level numbering context
2. **Template token bridge** — `data-template="a|b|c|d|e"` wrapper selector that scopes each template's tokens so atoms auto-reskin.
3. **Five template shells** — `CaseStudyTemplateA.tsx` … `CaseStudyTemplateE.tsx`, each consuming identical content props.
4. **VariantSwitcher dock** — floating bottom-center component, URL-param driven, preview-route gated.
5. **One scroll primitive** — `useScrollSteps` hook (Scrollama + Framer Motion) used by B and E only.

### What we are NOT building (guardrails)
- No global palette changes. New accents (#F7F4EE, #5B6770, #2B3A67, #C9A96A, #1F2A44) live only under `--tmpl-{x}-*` scoped tokens.
- No changes to existing `ResourceCard`, `Badge`, `Container`, `useResponsiveGutter`. We consume them; we don't edit them.
- No changes to `src/styles/theme.css` core tokens unless explicitly approved.
- No new files in `src/imports/` or `src/app/components/ui/`.
- No GitHub push of `App.tsx` (per `GITHUB_PUSH_GUIDE.md`).

### What "done" looks like
- Loading the case study page with `?v=a` through `?v=e` renders five visually distinct, fully-responsive, WCAG-AAA-compliant shells with identical content.
- VariantSwitcher persists choice via URL + localStorage.
- All five templates respect `prefers-reduced-motion`.
- Zero changes to global tokens; all five templates' deltas are auditable in one grep for `--tmpl-`.

---

## 3. When

### Phasing

**Phase 0 — Approval (blocking).** This plan.
**Phase 1 — Foundation.** Shared atoms + `data-template` bridge + VariantSwitcher dock. Nothing visual yet per template, but the scaffolding renders and switches.
**Phase 2 — Template A (Tombstone Editorial).** First visible template. Validates atom API.
**Phase 3 — Template C (Chaptered Longform).** Validates footnote system + reading rail.
**Phase 4 — Template D (Deal Dashboard).** Validates dark-mode token flip + sparklines.
**Phase 5 — Template B (Scrollytelling).** Introduces `useScrollSteps` scroll primitive.
**Phase 6 — Template E (Cinematic).** Reuses B's scroll primitive; adds horizontal pin + kinetic hero.
**Phase 7 — Audit + docs.** Accessibility sweep, reduced-motion parity, `.md` update, GitHub push per `GITHUB_PUSH_GUIDE.md` atomic order.

Each phase ends with a user-visible preview and an explicit checkpoint before the next phase starts. No phase is merged without approval.

### When each template gets picked (authoring guidance)
| If the case study's strength is… | Pick |
|---|---|
| A closed mandate's authority | A |
| Market-sizing / trajectory data | B |
| A citable sector report | C |
| Metrics a CFO will scan | D |
| A multi-year journey or flagship | E |

---

## 4. Where

### Where files live
```
src/
  app/
    components/
      case-study/
        atoms/
          KPITile.tsx
          PullQuote.tsx
          TombstoneCard.tsx
          SectorChip.tsx
          Footnote.tsx
          FootnoteMarker.tsx
          FootnoteContext.tsx
        templates/
          CaseStudyTemplateA.tsx
          CaseStudyTemplateB.tsx
          CaseStudyTemplateC.tsx
          CaseStudyTemplateD.tsx
          CaseStudyTemplateE.tsx
        switcher/
          VariantSwitcher.tsx
          useTemplateVariant.ts
        hooks/
          useScrollSteps.ts        // Phase 5+
        CaseStudyShell.tsx          // routes content → active template
  styles/
    templates/
      template-a.css
      template-b.css
      template-c.css
      template-d.css
      template-e.css
```

### Where tokens live
- **Global tokens** (`theme.css`): untouched.
- **Template tokens** (`src/styles/templates/template-{x}.css`): scoped under `[data-template="{x}"]`. Each file is self-contained and only loaded when the template mounts.
- **Atom tokens** (in each atom file or `atoms.css`): variant-driven, consume template tokens via CSS custom property fallback chains: `color: var(--kpi-numeral-color, var(--ink));` — template overrides flow down via `data-template` scoping.

### Where the switcher renders
- Mounted in `CaseStudyShell.tsx`, visible only when `process.env.NEXT_PUBLIC_PREVIEW === "1"` or the route segment contains `/preview`.
- `position: fixed`, bottom-center, `z-index: 100`.

### Where push to GitHub
- Per `GITHUB_PUSH_GUIDE.md`: atoms → templates → switcher → shell → styles. Never push `App.tsx`, `src/imports/`, or `src/app/components/ui/`.

---

## 5. How

### How the variant switcher works
- **Source of truth:** URL param `?v=a|b|c|d|e`.
- **Fallback order on mount:** URL → `localStorage["cs-template"]` → default `"a"`.
- **Change handler:** update URL (pushState, no reload), mirror to localStorage, toggle `data-template` attribute on shell root.
- **Keyboard:** ArrowLeft/ArrowRight cycle, digits 1–5 jump, Escape collapses dock to a small handle.
- **A11y:** `role="radiogroup"`, each pill `role="radio"` with `aria-checked`.
- **Reduced-motion / print:** collapses to native `<select>`; `@media print { display: none }`.
- **Gating:** hidden on production canonical URLs. Only renders under preview conditions.

### How templates stay visually distinct without touching global tokens
- Each template's CSS file defines only tokens under `[data-template="x"] { --tmpl-x-*: ...; }`.
- Atoms read tokens via fallback chains: `var(--tmpl-a-kpi-numeral, var(--ink))`. Without the template wrapper, atoms fall back to global defaults.
- Switching templates = swapping one attribute on the shell root. No re-mount, no prop drilling, no theme provider.

### How scrollytelling (Template B) works
- **Library:** Scrollama for step detection (IntersectionObserver wrapper, ~3KB).
- **Motion:** Framer Motion `useScroll` + `useTransform` for intra-step easing.
- **Chart:** Recharts, re-renders on interpolated state (0→1 per step).
- **Perf:** `dvh` units, `transform`-only animations, `will-change: transform` on pinned canvas.
- **Reduced-motion fallback:** static small-multiples (5 charts stacked), rendered under `@media (prefers-reduced-motion: reduce)` or when viewport height < 600px.

### How horizontal scroll-jack (Template E) works
- **Decision rule:** only activates if phases ≤ 6, viewport ≥ 1024px wide, `prefers-reduced-motion: no-preference`. Else falls back to vertical timeline.
- **Mechanism:** Scrollama pins a section for `400dvh`; vertical scroll progress drives horizontal `translateX` on the timeline strip.
- **A11y:** DOM order is natural (vertical); visual order uses transform. Keyboard tab through phase cards follows DOM order. Each card is a focusable region.
- **Release:** pin releases at 100% progress; page continues vertically.

### How we verify each template
Before any phase is declared done:
1. **Content parity** — identical content props render in the template without loss.
2. **Responsive** — desktop (≥1024), tablet (≥640), mobile (<640) all behave.
3. **A11y** — axe-core clean, keyboard-only navigable, `prefers-reduced-motion` honored.
4. **Contrast** — WCAG AAA maintained for all text/background pairs.
5. **Tokens** — `grep "--tmpl-"` confirms no leakage outside template CSS files.
6. **Switcher** — cycling through all 5 leaves no visual artifacts or console errors.

### How we sequence the first two phases concretely
**Phase 1 (Foundation) deliverables:**
- `CaseStudyShell.tsx` with `data-template` attribute wiring
- `useTemplateVariant.ts` hook (URL + localStorage)
- `VariantSwitcher.tsx` dock
- `KPITile`, `PullQuote`, `TombstoneCard`, `SectorChip`, `Footnote` atoms (with variant slots but only "default" styling)
- Empty template files (A–E) that just render the content verbatim, so the switcher proves end-to-end
- No visual uniqueness yet — this phase de-risks plumbing

**Phase 2 (Template A) deliverables:**
- `template-a.css` tokens
- `CaseStudyTemplateA.tsx` full shell: sticky deal-summary sidebar, oversized red numeral hero, serif display, warm off-white quote blocks, editorial section rhythm
- Atom variants activated: `KPITile editorial`, `PullQuote warm`, `TombstoneCard hero`
- Responsive + reduced-motion verified
- Checkpoint demo before Phase 3

---

## 6. Open questions (need user decision before Phase 1)

1. **Preview gating.** Confirm preview-route / env-var approach vs. always-visible during development.
2. **Font families.** Templates A and C call for a serif display (Source Serif / Georgia fallback). Is a new font acceptable, or should we reuse only what's in `fonts.css` today?
3. **Recharts.** Not yet in `package.json`. Approval to install when Phase 5 (Template B) begins?
4. **Scrollama.** Same — approval to install at Phase 5?
5. **Content schema.** Do all five templates receive the same `CaseStudyContent` prop shape, or do some templates accept optional extras (e.g., D's sparkline data)?

---

## 7. Success criteria (the plan worked if…)

- A reader loading the case study under `?v=a` vs `?v=e` perceives two clearly different experiences but reads identical facts.
- A content author can ship a new case study and pick a template in one line (`<CaseStudyShell variant="b" content={...} />`).
- No global token was modified; all deltas live under `--tmpl-*` selectors.
- All five templates pass WCAG AAA and `prefers-reduced-motion` audits.
- Build order held: A shipped before B, proving the foundation de-risked the scroll work.

---

## 8. Approval checklist

- [ ] Why / what / when / where / how reviewed and accepted
- [ ] Build order confirmed (A → C → D → B → E)
- [ ] Open questions answered
- [ ] Phase 1 scope approved to begin
