# ReadingProgressBar · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/ReadingProgressBar.tsx` (24 lines)

---

## 1. WHAT

Case-study-specific scroll progress bar. 3px-tall fixed top bar that shows brand-red fill as the user scrolls through the body content range (`client-context` section → `final-cta` section). HIDES while the hero is visible (fades opacity to 0) and FADES IN once hero scrolls out. Composes two hooks: `useSectionProgress` + `useHeroVisibility`.

## 2. WHY

No explicit JSDoc on this file. Inferred from `ScrollProgress.tsx:7-9` cross-reference:

> "This is the GENERIC version — works on any page based on total document scroll. For the case-study-specific version that uses useSectionProgress + useHeroVisibility, see ReadingProgressBar.tsx."

- Case-study pages start with full-bleed hero — generic ScrollProgress would clutter the cinematic intro
- Hides during hero (`useHeroVisibility`) → reveals only when reader is in body content
- Scopes to a section range (`useSectionProgress('client-context', 'final-cta')`) → progress reflects "how far through the reading" not "how far through the page"
- z-40 (NOT z-9999 like ScrollProgress) — sits below sticky navbar (`Navbar` uses z-50) by design
- Track + fill structure (vs single bar in ScrollProgress) — track shows full path, fill shows progress

## 3. WHEN to use ✅

- Case-study pages with hero → body → CTA structure
- Long editorial content with explicit start + end section anchors
- Pages where engagement signal scoped to body-text reading (not page total)
- Reports with dedicated start/end sections

## 4. WHEN NOT to use ❌

- Listing pages → use `<ScrollProgress>` (generic, total-page)
- Single-section pages (no body-text range to scope to)
- Pages without `id="client-context"` AND `id="final-cta"` anchors → hooks return wrong progress
- Modal scroll → hooks listen to window scroll
- Embedded widgets

## 5. WHERE used

- `PatternsContent.tsx:181` — pattern catalog usage
- **Honest gap:** No production case-study consumer grep'd, but the entire component exists specifically for the case-study template (per the cross-reference in `ScrollProgress.tsx:7-9`).

## 6. HOW to implement

```tsx
// Case-study page structure
export default function CaseStudyPage() {
  return (
    <>
      <Navbar />
      <ReadingProgressBar />
      <HeroSection />
      <section id="client-context">...</section>
      <section id="challenges">...</section>
      <section id="methodology">...</section>
      <section id="impact">...</section>
      <section id="final-cta">...</section>
    </>
  );
}
```

Section ids `client-context` + `final-cta` are HARD-CODED in the hook call. Consumer cannot override. (`ReadingProgressBar.tsx:5`)

## 7. Properties

None. (`ReadingProgressBar.tsx:4`)

Zero-prop API by design — case-study-specific. Section anchors are conventional, not configurable.

## 8. States

- **Hero visible:** opacity 0, bar present but invisible (`ReadingProgressBar.tsx:10-12`)
- **Hero scrolled past:** opacity 1, bar fades in over 300ms (`ReadingProgressBar.tsx:10`)
- **Within body range:** Fill width tracks `useSectionProgress` 0-100% (`ReadingProgressBar.tsx:5, 20`)
- **Past `final-cta`:** Fill remains at 100% (clamped by hook)

## 9. Variants

None.

## 10. Sizes

Fixed `h-[3px]`. Not configurable. (`ReadingProgressBar.tsx:10`)

## 11. Tokens used

- `--brand-red` — fill color (`ReadingProgressBar.tsx:20`)
- Tailwind utilities: `fixed top-0 left-0 right-0 h-[3px] z-40`, `bg-black/5` (track), `transition-opacity duration-300`
- Track color `bg-black/5` — hard-coded Tailwind utility (not token)

## 12. A11y rules

- **Gap:** No `role="progressbar"`, no `aria-valuenow`/`aria-valuemin`/`aria-valuemax`. AT users get nothing.
- Visually decorative
- Hides during hero — visual progressive disclosure but AT can't perceive this distinction
- `transition-opacity` may not respect `prefers-reduced-motion` (Tailwind default — verify)

## 13. Motion rules

- Opacity transition: `transition-opacity duration-300` for show/hide on hero visibility (`ReadingProgressBar.tsx:10`)
- Fill width: `transition-all duration-150 ease-out` (`ReadingProgressBar.tsx:19`)
- Two-track layered structure: track (`bg-black/5`) + fill (`bg-brand-red`) with `absolute inset-0` (`ReadingProgressBar.tsx:15-21`)
- **Reduced-motion:** delegated to hooks + CSS — not explicitly handled here

## 14. Anti-patterns ❌

- Never use without `id="client-context"` AND `id="final-cta"` anchors — hooks fail
- Never use with `<ScrollProgress>` simultaneously — overlap, double-bars
- Never override z-40 — must sit below sticky navbar (z-50) and above content
- Never modify the hard-coded section ids without updating consumer pages — coupling
- Never use on listing pages — generic `<ScrollProgress>` is for that case
- Never expect AT user to perceive the visibility toggle — visual-only enhancement

## 15. REUSABILITY SCORE

**2/5 ⭐⭐** — Case-study-specific. Zero-prop API + hard-coded section ids = single-template fit. Useful within scope, narrow outside it.

## 16. Linked components

- **Parent:** case-study page template
- **Sibling atoms:** `<ScrollProgress>` (generic version), `<Navbar>` (z-50 above this), `<ScrollToTop>` (different surface)
- **Hooks involved:** `useSectionProgress('client-context', 'final-cta')`, `useHeroVisibility()` — both from `@/app/hooks/`

## 17. Reasons + Decisions log

- **Why hide during hero (`ReadingProgressBar.tsx:10-12`):** Hero is full-bleed cinematic — progress bar would compete with the visual story. Reveals once user "starts reading". Premium feel.
- **Why scoped to `client-context → final-cta` not full page (`ReadingProgressBar.tsx:5`):** Hero + nav + footer are scaffolding; "reading" is body content only. Progress should represent reading completion, not page completion.
- **Why z-40 not z-50 (`ReadingProgressBar.tsx:10`):** Sticky navbar uses z-50. ReadingProgressBar sits BELOW navbar so the navbar covers the progress bar when sticky-active. ScrollProgress uses z-9999 (top of everything) for different intent — generic visibility over all chrome.
- **Why two-layer (track + fill) (`ReadingProgressBar.tsx:14-21`):** Track shows full path (the journey), fill shows progress (where you are). More informational than single-bar fill. Visually: black/5 track is barely-visible until fill grows in front of it.
- **Why `transition-opacity duration-300` (`ReadingProgressBar.tsx:10`):** Smooth show/hide as hero scrolls in/out. 300ms = "intentional fade", not abrupt.
- **Why fill `transition-all duration-150` (`ReadingProgressBar.tsx:19`):** Same calibration as `<ScrollProgress>` — 150ms = "smooth but responsive" for progress updates.
- **Why hard-coded section ids (`ReadingProgressBar.tsx:5`):** Case-study template recipe is canonical. Configurability would invite drift across pages. Trade-off: zero flexibility for non-case-study contexts.
- **Why zero props:** Zero-config drop-in. Discoverability low (caller must know conventions) but consistency high.
- **Why no JSDoc (smell):** Should have inline doc explaining the section-id coupling and hero-hide behavior. Currently relies on cross-reference from ScrollProgress.tsx.
- **Missing a11y (gap):** Should add `role="progressbar"` + `aria-valuenow={progress}` etc. — same gap as ScrollProgress.
- **Tight coupling to hooks (`ReadingProgressBar.tsx:1-2`):** Imports `useSectionProgress` + `useHeroVisibility` directly. Hooks live at `@/app/hooks/`. Atom is not portable to a project that doesn't have these hooks. Smell: should accept progress + visible as props for portability.
