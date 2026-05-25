# AnimatedArrow · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/AnimatedArrow.tsx` (141 lines)

---

## 1. WHAT

A 2-layer Lucide `ArrowUpRight` (↗ 45° up-right) icon that swaps the visible arrow diagonally on hover. Arrow 1 exits top-right; Arrow 2 enters from bottom-left. Used as the canonical directional indicator inside Button, CTALink, and bespoke "go-there" patterns.

## 2. WHY

OG JSDoc verbatim (`AnimatedArrow.tsx:1-27`):

> "Simple 2-arrow replacement animation for 45-degree arrows (ArrowUpRight). On hover, the 2nd arrow smoothly replaces the 1st arrow."
> "Arrow 1: Visible by default → On hover: exits top-right (translate 20px diagonal)"
> "Arrow 2: Hidden bottom-left (translate -20px diagonal) → On hover: enters to center"
> "Both arrows use opacity + transform for smooth transition."

- Visualizes the "directional / outbound" semantic — link points up-right to a new place
- Two-arrow swap is more delightful + recognizable than a single-arrow translate (which loops/jitters in some browsers)
- `isHovered` prop allows PARENT to control the trigger (so Button + CTALink can sync arrow with their own hover state)
- Falls back to internal hover state when no parent control given — works standalone too
- Lightweight: pure CSS transform/opacity, no JS animation framework

## 3. WHEN to use ✅

- Inside `<Button showArrow>` (`Button.tsx:266, 282, 292`)
- Inside `<CTALink>` (`CTALink.tsx:101`)
- Decorative directional indicator next to a "View →" or "Read more →" link
- Inside a hover-card's outbound-link affordance
- After "Continue" text in a multi-step flow CTA
- Bespoke pattern: any "go-somewhere" semantic where the standard atoms don't fit

## 4. WHEN NOT to use ❌

- Plain leftwards/rightwards/downwards arrow → use Lucide `<ArrowLeft>` / `<ArrowRight>` / `<ChevronDown>` directly
- Static icon next to text → use Lucide directly (no animation cost)
- Inside a button that already animates background — visually noisy (use one OR the other)
- Reduced-motion-critical contexts → AnimatedArrow does NOT check `prefers-reduced-motion` (gap)
- Loading/spinner indication → use `<Loader2 className="animate-spin" />`

## 5. WHERE used

- `Button.tsx:266, 282, 292` — three render points based on `iconPosition` × `iconOnly`
- `CTALink.tsx:101` — every CTALink renders this
- `ClientContextSection.tsx:307` — standalone inline use, `size={16} color="white"` on dark bg
- `LinksDocumentation.tsx:348` — docs usage example

## 6. HOW to implement

```tsx
// Standalone, internal hover
<AnimatedArrow />

// Custom size + color
<AnimatedArrow size={24} color="#b01f24" />

// Parent-controlled hover (typical pattern in Button/CTALink)
const [hover, setHover] = useState(false);
<a onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
  Read more
  <AnimatedArrow isHovered={hover} />
</a>

// Inside a button
<button className="flex items-center gap-2">
  Learn More
  <AnimatedArrow size={18} />
</button>

// Slow animation
<AnimatedArrow size={20} duration={500} />

// Inherit parent color
<div className="text-blue-600">
  <AnimatedArrow color="currentColor" />
</div>
```

## 7. Properties

| Prop | Type | Default | Why exists |
|---|---|---|---|
| `size` | `number` | `20` | Icon pixel size; matches text baseline at most use cases (`AnimatedArrow.tsx:42`) |
| `color` | `string` | `'currentColor'` | Inherits parent color by default — frictionless integration (`AnimatedArrow.tsx:43`) |
| `strokeWidth` | `number` | `2` | Lucide standard; bump to 2.5 for "bold" emphasis (`AnimatedArrow.tsx:44`) |
| `duration` | `number` | `300` (ms) | Transition speed. Tested vs Button's 700ms — arrow needs faster because translation distance is shorter (`AnimatedArrow.tsx:45`) |
| `className` | `string` | `''` | Escape hatch on the container `<span>` (`AnimatedArrow.tsx:46`) |
| `isHovered` | `boolean` | `false` | Parent-controlled hover state — TAKES PRECEDENCE over internal state via OR: `shouldAnimate = isHovered || internalHovered` (`AnimatedArrow.tsx:47, 52`) |

## 8. States

- **Default (`shouldAnimate=false`):** Arrow 1 opacity 1 at `translate(0,0)`; Arrow 2 opacity 0 at `translate(-20px, 20px)` (`AnimatedArrow.tsx:69-79`)
- **Hover (`shouldAnimate=true`):** Arrow 1 opacity 0 at `translate(20px, -20px)`; Arrow 2 opacity 1 at `translate(0,0)` (`AnimatedArrow.tsx:69-79`)
- **No focus / active / disabled** — Decorative atom, not a focusable element

## 9. Variants

No formal variants — color & size cover variation.

## 10. Sizes

Free-form numeric `size` prop. Conventional usage:
- 14-16px inline with body text
- 18-20px inline with `<Button size="md">`
- 20-24px inline with `<Button size="lg">`

## 11. Tokens used

None — accepts raw color string. Caller passes brand color via inline literal (e.g., `Button.tsx:64-72`) or via `currentColor` for inherit.

## 12. A11y rules

- Decorative — should be wrapped in a parent with the actual semantic label
- Lucide icons rendered are not auto-labelled — parent provides the text
- No ARIA props exposed
- **Gap:** does not auto-add `aria-hidden="true"` to make AT skip the duplicated SVG layer

## 13. Motion rules

- Two CSS transitions: `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)` + `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)` (Material standard easing) (`AnimatedArrow.tsx:67, 76`)
- Default 300ms — fast enough to feel responsive, slow enough to read the swap
- **Reduced-motion: NOT respected** — no `prefers-reduced-motion` check. **Honest gap.** Translation persists; users sensitive to motion get the animation regardless.

## 14. Anti-patterns ❌

- Never use as the only semantic for a link — must have accompanying text label
- Never set `isHovered={true}` permanently — defeats the animation; use a static `<ArrowUpRight>` instead
- Never use without parent providing color context if `color="currentColor"` AND parent has no color set
- Never wrap inside an icon-only `<Button>` (use `<Button showArrow iconOnly>`; the integration already handles it)
- Never animate at >500ms — feels sluggish (user will see lingering arrow ghost)

## 15. REUSABILITY SCORE

**4/5 ⭐⭐⭐⭐** — Foundational icon-atom for Button + CTALink. Less direct standalone use (most consumption is through Button/CTALink), but every directional CTA flows through it.

## 16. Linked components

- **Parent atoms:** `Button` (3 render sites), `CTALink` (always renders one), `ClientContextSection` (organism)
- **Sibling atoms:** none — unique role
- **Children:** Lucide `<ArrowUpRight>` (twice)
- **Hooks involved:** none (internal `useState`)

## 17. Reasons + Decisions log

- **Why TWO ArrowUpRight icons not one (`AnimatedArrow.tsx:25-26, 90-101`):** Single-icon translate creates a "ghost lingering" feel as opacity fades while position moves. Two-icon swap mimics a "fresh arrow arriving" which reads as forward motion not jitter.
- **Why diagonal `translate(20, -20)` and `translate(-20, 20)` (`AnimatedArrow.tsx:70, 79`):** 45° matches the icon's own 45° trajectory (ArrowUpRight points top-right). Movement direction matches arrow direction = visual coherence.
- **Why 20px exactly:** Enough to feel the slide; small enough to stay inside parent gap without overflow. Tied to default `size={20}` — moves one full icon-width.
- **Why `cubic-bezier(0.4, 0, 0.2, 1)` (`AnimatedArrow.tsx:67, 76`):** Material Design standard ease-out. Smoother than CSS `ease-out`. Matches Button's ripple ease.
- **Why 300ms default:** Quicker than Button's 700ms shimmer because translation distance is short — perceived speed should match perceived weight.
- **Why `isHovered` prop AND internal state (`AnimatedArrow.tsx:49, 52`):** Allows standalone use AND parent-controlled use. The OR makes both work: standalone uses internal; parent passes `true` to override.
- **Why `color="currentColor"` default:** Frictionless — drop in any text color context and it inherits. Power-users override.
- **Why `flexShrink: 0` (`AnimatedArrow.tsx:62`):** Prevents arrow squashing in tight flex layouts where space gets compressed.
- **No `prefers-reduced-motion` (gap):** Honest gap. Should add `if (prefersReducedMotion) return <ArrowUpRight size={size} color={color} />` early return.
