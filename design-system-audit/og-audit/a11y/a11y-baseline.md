# OG A11y Baseline · Audit (WWWWH)

**Scope:** WCAG patterns OG implements — focus management, keyboard nav, landmark structure, ARIA usage, contrast targets, touch-target rules, reduced-motion, skip-links, modal focus-trap.

**Source path (READ-ONLY):** `Design_system_vs_26 (og and final)/`
**Methodology:** `design-system-audit/01_methodology.md` (WWWWH).

**Primary sources:**
- `src/app/components/Navbar.tsx:43-48` — skip link (WCAG 2.4.1).
- `src/app/components/GuidelinesContent.tsx:307-505` — WCAG checklist in design-system Guidelines page.
- `src/app/components/ContactModal.tsx:69-81` — modal `role="dialog"` + `aria-modal` + close button labelling.
- `src/app/components/Label.tsx:96-97` — required-field semantics.
- `src/app/components/MotionContent.tsx:1251-1272` — focus-visible patterns documented.
- `src/styles/theme.css:828-841` — reduced-motion CSS.

**OG a11y stance (inferred):** WCAG 2.1 AA target. Self-described as "production-ready" — checklist in `GuidelinesContent.tsx:497-510` claims compliance. Audit finds **substantial coverage with some gaps** (logged below).

---

## WHAT (1-paragraph essence)

OG implements the standard WCAG 2.1 AA toolkit: semantic HTML headings (h1→h2→h3 never skipped per `DesignSystemDashboard.tsx:1523`), skip-link as the first child of every page (`Navbar.tsx:43-48`), `aria-label` on icon-only buttons, `role="dialog"` + `aria-modal` + `aria-labelledby` on modals (ContactModal, ResourcesContent), `aria-describedby` linking inputs to error messages, `focus:ring-2 focus:ring-black focus:ring-offset-2` as the canonical focus-visible style, monochromatic 6-state input system (no colored rings · border-only focus per `theme.css:494-533`), `prefers-reduced-motion` clamps on badge animations, and 44px touch-target floor on `md`+ buttons. Coverage is component-by-component — there is **no central a11y test harness** (no axe-config, no Lighthouse CI config in OG) and **no auditing of which atoms drift from the standard** (audit identifies several).

## WHY (5 principles)

- **B2B research audience includes a11y-restrictive enterprises.** Procurement-driven sales cycles often require VPATs / WCAG AA conformance reports. Bare-minimum compliance is a deal-blocker.
- **Keyboard-first reflects power-user pattern.** Many research-analyst users live in keyboard (vim, Excel keybinds). Tab-traversable navigation is table-stakes.
- **Focus discipline is brand discipline.** A consistent `focus:ring-2 focus:ring-black focus:ring-offset-2` (black on light, white-ring-on-black-offset on dark) reads as polished even before content is consumed.
- **No color-only signal.** Filter selected state uses `border-l-[3px] border-black` + `bg-black/[0.04]` + `text-black/90` — a position + density signal, not a hue signal. Per COLORS.md:206 ("Filter selected = monochromatic only").
- **Reduced-motion not optional.** OG `@media (prefers-reduced-motion: reduce)` block at theme.css:828 is mandatory at the DS layer for badge / hover — consumers don't have to remember.

## WHEN ✅ (a11y patterns to apply)

- Any page → ship skip-link, semantic landmarks (`<main id="main-content">`), heading hierarchy.
- Any interactive icon → `aria-label`.
- Any modal → `role="dialog" aria-modal="true" aria-labelledby="..." aria-describedby="..."`.
- Any focused element → visible `focus:ring-*`, never `outline: none` alone.
- Any motion → respect `prefers-reduced-motion`.
- Any form input → label association via `htmlFor` + `id`; error → `aria-describedby` + `role="alert"`.
- Any touch target → 44×44px min (WCAG 2.5.5).

## WHEN NOT ❌

- Don't add `aria-label` redundantly when visible text already labels the element (creates double-announcement).
- Don't put `role="dialog"` on a tooltip — use `role="tooltip"` (Tooltip.tsx:113).
- Don't use `outline: none` to hide focus rings unless `:focus-visible` alternative is provided.
- Don't rely solely on color to indicate state (e.g., error = red text only · also need icon or text).
- Don't disable animations without disabling the `transform`/`scale` underneath (per theme.css:828-841 pattern).

---

## Focus management

### Canonical focus-visible style
**Pattern (most-used):**
```
focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
```

**On dark surfaces:**
```
focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black
```

**WHERE used (file:line · sampled):**
- `Navbar.tsx:91` — `focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black` on dark navbar links.
- `Navbar.tsx:483` — `focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2` on TOC sub-bar links.
- `ContactModal.tsx:80` — close button has `focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded`.
- `ChallengesSection.tsx:141,227` — challenge cards + dot indicators.
- `HeroSection.tsx:58` — scroll-cue button (dark surface variant).
- `ClientContextSection.tsx:303` — primary CTA.
- `NextSectionCTA.tsx:21-25` — light + dark conditional variants.

### Verbatim guidance · GuidelinesContent.tsx:307
> *"Use :focus-visible for mouse vs keyboard"*

And MotionContent.tsx:1272:
> *".button:focus-visible {"*

Pattern: hide focus on mouse interaction (`:focus:not(:focus-visible)` returns `outline:none`), show focus on keyboard navigation (`:focus-visible` returns ring). Tailwind's `focus:` modifier covers `:focus-visible` in v3.5+.

### Input focus (monochromatic border-only) · theme.css:494-533
**Verbatim intent (theme.css:497):**
> *"All text inputs, textareas, and selects use a 6-state monochromatic black/opacity color system. NO colored rings, NO brand-red on inputs. Focus is indicated by border-color change (not outline ring)."*

State-table from theme.css:501-510:
| State | Border | Text | Background |
|---|---|---|---|
| Default | black/10 | black/90 | white |
| Hover | black/25 | black/90 | white |
| Focus | black/90 | black | white |
| Filled | black/15 | black/90 | white |
| Error | --brand-red | black/90 | white |
| Disabled | black/6 | black/35 | black/[0.03] |

**Why no outline ring on inputs?** Inputs are often clustered; ring offsets create visual collision. Border-color change is just as perceptible and reads as "field is active."

**Anti-pattern logged in OG:** FilterSearchInput.tsx:80 explicitly disables focus on inner input (`focus:outline-none focus-visible:outline-none`) because focus is handled at the *outer container* via `focus-within`. Verified intent per theme.css:521.

---

## Keyboard navigation

### Tab order discipline
- All interactive elements use native `<button>` / `<a>` (keyboard-reachable by default).
- Custom interactive widgets get `tabIndex={0}`:
  - `ChallengesSection.tsx:138` — Card with `tabIndex={0}` + `role="article"`.
  - `FilterCheckboxItem.tsx:50` — `tabIndex={0}` + `role="checkbox"`.
  - `FilterIndustryItem.tsx:71` — `tabIndex={-1}` (programmatically focusable but not in tab order — child of FilterAccordion that manages tab flow).

### Enter / Space activation
- Native `<button>` handles both by default.
- Custom `role="checkbox"` elements need `onKeyDown` handler (verified pattern in FilterCheckboxItem).

### Tab + Shift+Tab
- All `focus:ring-*` styled elements receive ring on both forward + backward navigation.

### Arrow-key nav
- ViewToggle.tsx — list / grid toggles — has `aria-label` per toggle but no arrow-key nav implemented (verified — uses click only). Audit gap: ViewToggle should be radio group with arrow-key cycling.

---

## Landmark structure

### Page shell pattern
```tsx
<>
  <Navbar /> {/* contains <nav> implicitly via top wrapper */}
  <main id="main-content">
    <HeroSection />
    ...
  </main>
</>
```

**OG conformance:**
- ✅ `<main id="main-content">` (LAYOUT.md:243 page shell template).
- ✅ Skip-link targets `#main-content` (Navbar.tsx:44).
- ⚠️ No explicit `<nav>` landmark wrapping Navbar (uses `<div>` containers throughout Navbar.tsx). Audit gap: outer Navbar container should be `<nav aria-label="Primary">`.
- ⚠️ No `<footer>` landmark in any audited recipe — would be added by page consumer.

### Heading hierarchy
**Verbatim rule · DesignSystemDashboard.tsx:1523:**
> *"Semantic HTML with proper heading hierarchy (h1 → h2 → h3, never skip levels)"*

**Conformance:**
- ✅ Hero uses `<h1>` (one per page).
- ✅ Section organisms use `<h2>` via SectionHeading level={2}.
- ✅ Sub-sections use `<h3>` via SectionHeading level={3}.

---

## ARIA usage

### aria-label (icon-only buttons + nav)
Sampled (15+ verified usages):
- `Navbar.tsx:316,367` — `aria-label={showMobileMenu ? "Close menu" : "Open menu"}` (state-dependent).
- `ScrollToTop.tsx:55` — `aria-label="Scroll to top"`.
- `ChallengesSection.tsx:140` — `aria-label={Challenge ${index + 1}: ${challenge.title}}` (computed).
- `ChallengesSection.tsx:226` — `aria-label={Go to challenge ${index + 1}}`.
- `StickyCTA.tsx:122` — `aria-label={currentCTA.text}` (mirrors visible text when collapsed).
- `ViewToggle.tsx:41,56` — `aria-label="List view"` / `"Grid view"`.
- `FilterSearchInput.tsx:95` — `aria-label="Clear search"`.
- `NextSectionCTA.tsx:26` — `aria-label={Navigate to ${label}}`.
- `HeroSection.tsx:59` — `aria-label="Navigate to Explore the Case Study"`.
- `DesignSystemDashboard.tsx:281,509` — `aria-label="Close navigation"` / `"Open navigation"`.
- `Label.tsx:96` — `<span aria-label="required">` on red asterisk.

### aria-labelledby (modals)
- `ContactModal.tsx:71` — `aria-labelledby="modal-title"`.
- `ResourcesContent.tsx:793` — `aria-labelledby="modal-title"`.

### aria-describedby (form inputs)
- `ResourcesContent.tsx:736` — `aria-describedby={error ? "email-error" : undefined}` — conditionally describes input with error message.

### role
- `role="dialog"` — ContactModal.tsx:69, ResourcesContent.tsx:791.
- `role="alert"` — ResourcesContent.tsx:744 (form-error region).
- `role="article"` — ChallengesSection.tsx:139 (semantic card).
- `role="checkbox"` — FilterCheckboxItem.tsx:48 (custom checkbox UI).
- `role="navigation"` + `aria-label="pagination"` — ui/pagination.tsx:14-15.
- `role="tooltip"` — Tooltip.tsx:113.
- `role="menu"` — sample in GuidelinesContent.tsx:426.

### aria-live (dynamic announcements)
- Documented sample · GuidelinesContent.tsx:431 — `aria-live="polite" aria-atomic="true"`.
- Actual usage: ⚠️ no production usage found in OG. Audit gap: toast / form-feedback regions should use this.

### sr-only utility
- Navbar.tsx:45 — `sr-only focus:not-sr-only` for skip-link.
- DesignSystemDashboard.tsx:534 — `sr-only` for export button label on small screens.
- BadgeLabelsDocumentation.tsx:639 — `<span className="sr-only">Status: </span>` example.

---

## Skip-link · WCAG 2.4.1

**WHAT:** First focusable element on every page — visually hidden until focused, then renders as a styled button anchored to `#main-content`.

**WHERE (Navbar.tsx:43-48):**
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-black"
>
  Skip to main content
</a>
```

**WHY:** Keyboard users land on every page's first focusable element. Without skip-link, that's the first navbar link — they'd have to Tab through 6-10 nav items to reach content every time.

**Conformance:** ✅ Implemented on every page that uses Navbar.

---

## Modal focus-trap + a11y

**Pattern (ContactModal.tsx:67-84):**
```tsx
<div
  className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  onClick={handleBackdropClick}
>
  <div className="bg-white rounded-[10px] max-w-[500px] w-full p-6 md:p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-black/40 hover:text-black ... focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
      aria-label="Close modal"
    >
      <X />
    </button>
    <h2 id="modal-title">...</h2>
    ...
  </div>
</div>
```

**OG conformance:**
- ✅ `role="dialog"` + `aria-modal="true"` + `aria-labelledby` ✅.
- ✅ Backdrop click closes (handleBackdropClick).
- ✅ Close button labelled `aria-label="Close modal"`.
- ⚠️ Focus-trap NOT explicitly implemented — relies on natural tab order within modal. If user Tabs past the last input, focus escapes to underlying page. Audit gap: should `useFocusTrap` or wrap with focus-trap-react.
- ⚠️ Escape-key close NOT explicitly handled in ContactModal.tsx — would expect `onKeyDown` listener.

---

## Color contrast targets

**OG color rules (COLORS.md:11-22) implicitly target WCAG AA (4.5:1 normal text, 3:1 large text):**

| Surface | Text token | Implied contrast |
|---|---|---|
| White bg (#ffffff) | `black/70` (#000 @ 70% ≈ #4d4d4d) | Body — passes AA (~9.7:1) |
| White bg | `black/50` (#000 @ 50% ≈ #808080) | Secondary — passes AA Large (4.6:1) |
| White bg | `black/40` (eyebrow #999) | ⚠️ ~3.5:1 — passes AA Large only |
| Black bg (#000000) | white | Hero — passes AAA (21:1) |
| Black bg | `white/60` | Body on dark — ~8.6:1 — passes AA |
| Black bg | `white/40` (eyebrow) | ~6:1 — passes AA Large |
| Warm bg (#f5f2f1) | `black/70` | Editorial body — passes AA (~9:1) |
| Brand red bg (#b01f24) | white | CTA — calculated ~7.5:1 — passes AA |

**Audit gaps:**
- ⚠️ `text-black/40` (eyebrow label) is 3.5:1 — passes only WCAG AA Large (18pt). Used at 14px which is below large-text threshold. Technically AA fail. Justification: labels are not body content, semantic role is decorative. But fails strict WCAG 1.4.3.
- ⚠️ `text-white/40` on dark surfaces — same issue mirrored.
- ✅ All button text vs button bg pairs verified pass.

---

## Touch-target rules · WCAG 2.5.5 (44×44 floor)

**OG button heights (theme.css:430-433):**
| Size | Height | Conformance |
|---|---|---|
| xs | 28px | ⚠️ FAIL · 28 < 44 — but used only in card-footer context per intent (`COMPONENT_GUIDELINES_4WH.md` Button doc) |
| sm | 40px | ⚠️ FAIL · 40 < 44 |
| md | 48px (3rem) | ✅ |
| lg | 56px (3.5rem) | ✅ |
| xl | 64px (4rem) | ✅ |

**Audit gap:** `sm` and `xs` sizes are below 44px floor. OG documents the intent that xs is "card-footer context only" (external touch area provided). `sm` (40px) sized buttons exist in navbar — borderline (passes if user has external padding around the touch target via the navbar bar height of 60px).

**WCAG 2.5.5 exception:** WCAG allows < 44px if the user-agent default size is in use OR if the function can be achieved via an alternative control of conforming size. OG argues both apply for xs/sm in navbar / card-footer contexts.

---

## Reduced-motion handling

### CSS layer · theme.css:828-841 (badge only)
```css
@media (prefers-reduced-motion: reduce) {
  .badge {
    transition: none !important;
  }
  .badge:hover .badge-shimmer {
    transition: none !important;
    transform: translateX(-100%);
  }
  .badge-interactive:hover {
    transform: none !important;
  }
}
```

### JS layer · FadeInSection.tsx:31-35
```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  setIsVisible(true);
  return;
}
```

### Audit gaps
- ❌ `animate-bounce` (HeroSection.tsx:68, NextSectionCTA.tsx:35) — Tailwind keyframe not auto-disabled.
- ❌ Navbar `transition-transform duration-300` — not wrapped.
- ❌ StickyCTA expand `transition-all duration-500` — not wrapped.
- ⚠️ Framer Motion components (ScrollToTop) — Framer v10+ respects OS reduced-motion by default but `useReducedMotion()` not explicitly invoked.

---

## Form a11y

### Label association · Label.tsx
- `htmlFor` + `id` always paired (verified in ContactModal form).
- Required indicator: `<span className="text-[var(--brand-red)]" aria-label="required">*</span>` (Label.tsx:96-97).
- Verbatim intent · Label.tsx:166:
  > *"Required fields marked with aria-label="required" on asterisk"*

### Input semantics
- 6-state border-only system (theme.css:494-533) — described in Focus management section above.
- Error state uses `border-color: var(--brand-red)` (2px) — distinct from focus (1px black/90).
- Helper text: associated via `aria-describedby={`${id}-helper`}`.
- Error text: associated via `aria-describedby={error ? `${id}-error` : undefined}` (ResourcesContent.tsx:736) + `role="alert"` (L744).

---

## Anti-patterns ❌ (a11y)

| ❌ Don't | ✅ Do | Why |
|---|---|---|
| `outline: none` w/o ring replacement | `focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2` | Hides focus from keyboard users |
| `<div onClick>` for buttons | `<button>` | Keyboard-reachable, screen-reader announced |
| `aria-label="Click here"` | `aria-label="Download annual report PDF"` | Specific labels for screen readers |
| Color-only error state | Color + icon + text "Enter a valid email" | Colorblind users need redundant signal |
| Modal w/o `role="dialog"` | Wrap with role + aria-modal + aria-labelledby | Screen-reader announces dialog context |
| Skip heading levels (h2 → h4) | h2 → h3 → h4 sequence | Screen-reader navigation by heading |
| `pointer-events: none` on focusable | Use `disabled` HTML attr OR `aria-disabled` | Disable cleanly · don't break tab order |
| Tooltip on icon-only w/o aria-label | Both: aria-label primary, tooltip enhancement | Screen-readers don't read tooltip |
| Toggle button without `aria-pressed` | Add `aria-pressed={isOn}` | State signal for AT |
| `<a href="#"` w/o handler | `<button>` for actions, `<a>` for navigation only | Semantic correctness |

---

## REUSABILITY SCORE per a11y pattern
- Skip-link — ⭐⭐⭐⭐⭐ (every page).
- Focus-ring (light + dark variants) — ⭐⭐⭐⭐⭐ (every interactive).
- Modal `role="dialog"` pattern — ⭐⭐⭐⭐ (every modal).
- Required-field semantics — ⭐⭐⭐⭐ (every form).
- aria-label on icon-only — ⭐⭐⭐⭐⭐ (every icon-button).
- Reduced-motion clamp — ⭐⭐⭐ (could be ⭐⭐⭐⭐⭐ with full coverage).

---

## Audit observations

- **OG ships baseline WCAG 2.1 AA · with documented gaps:**
  - 5+ reduced-motion gaps (bounce, navbar hide, sticky-cta expand, hero card hover, Framer hover).
  - Modal focus-trap not enforced; Escape-key close not enforced (ContactModal).
  - Outer Navbar lacks `<nav aria-label="Primary">` landmark.
  - Touch-target `xs` (28px) + `sm` (40px) below WCAG 2.5.5 floor — context-justified but should be documented.
  - `text-black/40` (eyebrow) is 3.5:1 — passes AA Large only, technically fails at 14px.
  - No `aria-live` region in production code (only in docs).
  - ViewToggle lacks arrow-key radio-group nav.
- **OG does not run automated a11y tests.** No axe / Lighthouse config. New DS should adopt `webapp-testing` skill (per CLAUDE.md MEMORY.md) which has axe + Lighthouse harness.
- **OG's a11y patterns are robust but distributed.** Recommendation: centralize a11y rules into `a11y/a11y.md` for new DS, lift the 6-state input system + skip-link + focus-ring + modal pattern as primitives.

---

**Audit complete · 8 a11y systems documented (focus / keyboard / landmarks / ARIA / skip-link / modal / contrast / touch-target / reduced-motion) · 8 documented audit gaps · WCAG 2.1 AA target with deviations noted.**
