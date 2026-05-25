# Secondary Button Issue · V0_lite_report-legacy

> User note verbatim: *"very good project · proper reasons of everything · BUT **secondary button is WRONG**."*

This doc forensically inspects every `variant="secondary"` usage in the project, isolates what's structurally off, and prescribes what the new DS must do differently.

---

## What the secondary button looks like in code

Definition: `src/design-system/Button.tsx:200-204`:

```tsx
if (variant === 'secondary') {
  if (background === 'dark') {
    return 'bg-white/10 text-white border border-white/30 hover:border-white hover:bg-white/[0.15] active:bg-white/[0.2] disabled:border-white/10 disabled:text-white/40';
  }
  return 'bg-white text-black border border-[var(--warm-500)] hover:border-black hover:bg-[var(--coral-50)] active:bg-[var(--coral-100)] disabled:border-[var(--warm-300)] disabled:text-black/40';
}
```

So the secondary on **light** background is:
- `bg: #ffffff` (white — same as page bg in 4 of 6 sections)
- `text: #000000` (black)
- `border: var(--warm-500) = #eae5e3` (a *very* faint warm-grey, ~7% darker than warm-300 bg, ~9% darker than pure white)
- hover: border → black, bg → `coral-50` (#fffbf9 — *almost* white with faintest warm shift)
- active: `coral-100` (#fff5f1)

Plus a special shimmer (`Button.tsx:298-307`) — a coral-50 gradient sweep on hover.

---

## All call-sites — inventory

Three places where `variant="secondary"` actually renders to the user:

### Site 1 — Hero, MOBILE block (`HeroSection.tsx:294-302`)
```tsx
<Button
  variant="secondary"
  size="sm"
  background={heroThemes[selectedVariant].buttonBackground as "light" | "dark"}
  icon={<FileText />}
  className="font-sans font-medium w-full"
>
  Request Custom Report
</Button>
```
Visible on viewports `<640px` only. Sits beneath the primary `Button variant="brand"`.

### Site 2 — Hero, TABLET block (`HeroSection.tsx:315-323`)
Same shape as mobile but with `size="md"`. Visible `sm ≤ vw < md` only.

### Site 3 — Hero, DESKTOP block (`HeroSection.tsx:336-345`)
```tsx
<Button
  variant={isDark ? "ghost" : "secondary"}
  size="lg"
  background={heroThemes[selectedVariant].buttonBackground as "light" | "dark"}
  icon={<FileText />}
  className="font-sans font-medium"
>
  Request Custom Report
</Button>
```
**Key observation:** on desktop *and only on desktop*, the variant is conditional — `ghost` on dark, `secondary` on light. The author noticed secondary doesn't work on dark and substituted `ghost`. **That same substitution does NOT happen for the mobile/tablet blocks**, where dark-mode users get the actual broken-on-dark `variant="secondary"`.

### Site 4 — Dev-only (not user-visible)
`src/app/components/AnalyticsDashboard.tsx:239` uses `variant="secondary"` inside the Ctrl+Shift+A hidden devtool. Out of scope for the bug — but it does suggest the secondary was *typed by the original author as a generic "non-primary" choice*, not a real visual decision.

---

## What is wrong (5 problems)

### Problem 1: insufficient contrast — border vs page background

`--warm-500 = #eae5e3` against `#ffffff` body bg has luminance contrast ratio ≈ **1.13:1**.

WCAG 2.2 minimum for non-text UI components (button borders, the only thing that delineates this button from page): **3:1**. The secondary button on light is effectively a **borderless rectangle** because the border can't be perceived more than 30cm from the screen.

For comparison, the same secondary's `disabled` state uses `--warm-300 = #f5f2f1` (even fainter). The disabled and enabled states are visually almost identical — a usability red flag.

### Problem 2: bg-white-on-bg-white invisibility

The Hero section's light variant background is `bg-gradient-to-br from-white via-white to-periwinkle-50` (`heroThemes.ts:95`). The secondary button is `bg-white`. On the upper-left portion of the hero (where the buttons live), the page bg is **pure white** — the secondary button has **only the 1.13:1 border** to delineate it from the page. The fill provides zero edge.

Compare to ghost (`Button.tsx:206-210`): `bg-transparent text-black border border-black/20`. The black/20 border is ratio ≈ **4.6:1** against white — actually perceivable.

**The fix the author already discovered:** on desktop dark, ghost is used. **But on light, ghost would be the right choice too** — and it isn't applied.

### Problem 3: ranking against the primary CTA is too weak

A "secondary CTA" should be **clearly subordinate** to the primary but **clearly affording action**. The Ken brand-CTA is a heavy red gradient w/ shimmer + animated arrow + drop shadow — it dominates. Next to it, the secondary is a near-invisible white-on-white box.

This is **wrong direction by magnitude**: the secondary needs to read as ~60-70% of the primary's visual weight (typical pair). Here it reads as ~10-15%. The user's eye treats it as a non-interactive caption.

### Problem 4: hover state regresses, doesn't progress

Resting border: `--warm-500` (1.13:1). Hover border: `black` (21:1). The transition is **+1900% contrast in one frame**. This is the visual equivalent of a button that doesn't exist until you mouse-over it — discoverability is a hover-discoverability problem, not a design feature.

Hover bg `coral-50` (#fffbf9) is **still invisible against white** (1.01:1). The fill change is mathematically a no-op for visual users.

### Problem 5: dark variant works structurally, but is *also* visually weak

Dark: `bg-white/10 text-white border border-white/30`. White/30 against a dark gradient bg gives ratio ≈ 2.5-3.5:1 depending on the gradient stop — borderline. White/10 fill adds a faint chip of visibility, but on the rich-gradient dark variants (`darkEmber` has 4-5 stacked coral/amber glows behind it) the fill mixes weirdly with the warm overlays.

This is *why* the author swapped to `ghost` on desktop dark — `bg-transparent` + `border-white/20` reads cleaner against the busy hero gradient. But the swap is only at one breakpoint.

---

## What variant choice was *meant*

Reading the hero comment context (`HeroSection.tsx:277-345`), the intent for "Request Custom Report" is clearly:

- Conversion-relevant, **not** the primary action.
- Should pair visually with the primary brand CTA at roughly equal size.
- Lives both on light and dark hero backgrounds.

The closest analog in shadcn-land is `variant="outline"` — a *strong* border (current text color at full opacity, not 7% warm-grey), transparent fill, sometimes with a subtle hover bg.

The codebase actually defines this as `variant="ghost"`, which works correctly. So **the issue is variant selection, not variant definition** — `variant="secondary"` *as coded* is the wrong variant for this use-case, but `variant="ghost"` (the very next variant defined, three lines down) would have worked.

---

## What the new DS must fix

### Fix 1: kill the warm-grey "soft border" pattern for actionable secondary

The current secondary's border `var(--warm-500)` is a **decorative border** (like a card edge), not an **action affordance border**. The new DS must:

- Use a border colour with ≥ 3:1 contrast against *every* legal page background (white, warm-300 `#f5f2f1`, dark `#0a0a0c`).
- Recommended: secondary uses `border: 1.5px solid currentColor` at 100% opacity (so on light: solid black; on dark: solid white). This is the "outline" pattern.

### Fix 2: collapse `secondary` + `ghost` into ONE outline variant

In the legacy DS, `secondary` (white-bg, faint warm border) and `ghost` (transparent, black/20 border) overlap conceptually but split arbitrarily. The new DS should pick **one** outline-style and remove the other. The author already showed which works — `ghost` is the survivor.

Naming suggestion: keep `secondary` as the public-facing variant name (consumers expect it), but **make its computed styles equivalent to current `ghost`**: transparent fill, strong border, no shimmer.

### Fix 3: remove the coral-50 shimmer on secondary

`Button.tsx:299-307` adds a coral-50 shimmer to secondary on hover. On a button whose fill is already coral-50 on hover, the shimmer is invisible. On dark, the shimmer is `rgba(255,255,255,0.15)` — that's the only place it does any work. Remove from light entirely; keep only on dark if desired (but truthfully, dark uses ghost on desktop and could drop secondary's shimmer entirely too).

### Fix 4: make `background="dark"|"light"` automatic via CSS

The current API forces every consumer to pass `background={heroThemes[selectedVariant].buttonBackground}` (`HeroSection.tsx:297, 318, 339`). This is brittle — three different theme objects all happen to expose `buttonBackground` because Button needs it. The new DS should:

- Use CSS custom properties on a `data-variant-section="cinematic"` or `data-theme="dark"` ancestor, and have Button styles read those properties.
- Remove the `background` prop from public Button API. Consumers stop having to know about their parent surface.

### Fix 5: enforce 3:1 contrast at the type level

Storybook/visual-regression test: render each variant on each legal background (`white`, `warm-300`, `cinematic-dark`) and snapshot the contrast ratio against page bg. Fail CI if < 3:1.

### Fix 6: rename "secondary" if its job is unchanged

`secondary` historically means a *second-tier* button — the same visual language as primary but lower-priority. In Ken's vocabulary, primary = brand-red gradient. A "secondary" same-language version would be... another gradient? A black-fill solid? Probably not what's wanted.

What's actually wanted is `outline` — and Ken should just call it that. The new DS naming should be: `primary` (brand red) / `outline` (transparent + strong border) / `ghost` (text + bg hover, no border) / `link` (text-only). No "secondary" — the term hides the actual visual intent.

---

## Summary one-liner

The legacy `variant="secondary"` on light backgrounds is a **near-invisible white-on-white rectangle** because the border colour (`--warm-500 = #eae5e3`) has only **1.13:1 contrast** against the white body — well below the WCAG 3:1 minimum for non-text UI. The author tacitly admitted the defect by swapping to `variant="ghost"` on the *desktop dark* call only (`HeroSection.tsx:337`), leaving mobile/tablet/light callers still broken.

**The new DS should:** collapse `secondary` + `ghost` into a single outline variant with a high-contrast border (≥3:1 against every legal bg), drop the `background` prop in favour of context-aware CSS variables, remove the coral shimmer, and consider renaming to `outline` to make the visual intent literal.
