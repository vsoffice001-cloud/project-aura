# CTALink · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/CTALink.tsx` (111 lines)

---

## 1. WHAT

Unified-hover text+arrow link. Hovering text OR arrow triggers BOTH animations together (gradient text + `AnimatedArrow` slide). For high-urgency CTAs where a full button feels too heavy but a plain underline link feels too soft.

## 2. WHY

OG JSDoc verbatim (`CTALink.tsx:5-15`):

> "A unified hover zone link with text + animated arrow for high-urgency CTAs. When hovering anywhere on the component, both the text gradient and arrow animate together."
> "Use for forms, redirects, or high-priority actions."
> "Part of VS Design System's urgency signaling patterns."

- Bridges the gap between full `<Button>` and inline `<InlineLink>` — text affordance with arrow urgency
- Unified hover zone fixes the "arrow lags behind text" UX bug where text + arrow had independent hover states
- 2 variants (default black, brand red) keep the API tight
- Built on shared `useShimmer` hook — consistent timing with InlineLink (`CTALink.tsx:62`)
- Always paired with `<AnimatedArrow>` to enforce "directional" semantic — link goes somewhere

## 3. WHEN to use ✅

- Inline urgency CTA inside narrative section ("Get Started Now →")
- Form-completion redirect ("Continue to checkout →")
- Cross-section "Read more →" pattern in `SectionHeading` action slot (`SectionHeading.tsx:114`)
- Resource card CTA ("Read AI Context →") — `ResourcesContent.tsx:540`
- Quick-reference jump link ("See the full guide →")

## 4. WHEN NOT to use ❌

- Form submit / explicit user action → use `<Button>` (real button affordance + ripple feedback)
- In-paragraph cross-reference text → use `<InlineLink>` (red underline, no arrow, no urgency)
- Internal anchor scroll → use `<NextSectionCTA>` (chevron-down pattern with bounce)
- Decorative label or status → use `<Badge>` (no link semantics)
- Plain navigation w/o urgency signaling → use plain `<a>` styled with link tokens (CTALink implies action)

## 5. WHERE used

- `ResourcesContent.tsx:519` — "Quick Start Prompt" link
- `ResourcesContent.tsx:540` — "AI Context" link (variant=brand)
- `ResourcesContent.tsx:561` — "Component Guidelines" link
- `ResourcesContent.tsx:582` — "View Repo" link
- `SectionHeading.tsx:114` — embedded as the action-slot CTA (so EVERY section using `action` prop renders a CTALink)

## 6. HOW to implement

```tsx
// Default (black text, brand-red arrow not applied — default arrow color #141016)
<CTALink href="/learn-more">
  Learn More
</CTALink>

// High-urgency brand variant
<CTALink href="/contact" variant="brand" size="lg">
  Get Started Now
</CTALink>

// Without arrow (rare)
<CTALink href="/docs" showArrow={false}>
  Read the docs
</CTALink>

// As SectionHeading action slot
<SectionHeading 
  title="Featured Research" 
  action={{ text: "View all", href: "/research" }} 
/>
```

## 7. Properties

| Prop | Type | Default | Why exists |
|---|---|---|---|
| `children` | `ReactNode` | — | Link text |
| `href` | `string` | required | Destination URL — `<a>` semantic |
| `variant` | `'default' \| 'brand'` | `'default'` | 2-variant API: neutral vs brand-red urgency (`CTALink.tsx:39`) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Maps to Tailwind `text-sm/base/lg` (`CTALink.tsx:65-69`) |
| `showArrow` | `boolean` | `true` | Default-on because directional semantic is core to CTALink. Off = becomes a styled text link. |
| `arrowSize` | `number` | `20` | Pixel size of the arrow — override when matching surrounding line-height |
| `className` | `string` | `''` | Escape hatch |
| `onClick` | `() => void` | — | Defined in interface but NOT destructured into the JSX — see Decisions log |

## 8. States

- **Default:** solid color text (`text-black` or `text-[#b01f24]`), arrow at rest position (`CTALink.tsx:77-82, 84`)
- **Hover:** text becomes gradient (`bg-clip-text text-transparent` with `linear-gradient(to right, #141016, #656565, #141016)` or red equivalent). Arrow slides diagonally (handled by `AnimatedArrow` via `isHovered` prop) (`CTALink.tsx:73-82, 104`)
- **No active / focus / disabled:** Not styled — relies on default `<a>` browser styles. **Honest gap.**

## 9. Variants

1. **`default`** — Black text → gradient `#141016 → #656565` on hover. Arrow color `#141016`.
2. **`brand`** — Brand red `#b01f24` text → gradient `#b01f24 → #eb484e` on hover. Arrow color `#b01f24`.

## 10. Sizes

| Size | Tailwind | Use for |
|---|---|---|
| `sm` | `text-sm` | Compact rows, footers, dense lists |
| `md` | `text-base` | DEFAULT — section action slots |
| `lg` | `text-lg` | Hero CTAs, prominent inline urgency |

## 11. Tokens used

- None directly — uses Tailwind text sizes + hardcoded brand colors `#b01f24`, `#eb484e`, `#141016`, `#656565`
- `tracking-[0.0875px]` — inline literal, NOT tokenized (smell: should be `var(--tracking-button)`)
- Animation duration `300` via `useShimmer(300)` (`CTALink.tsx:62`)

## 12. A11y rules

- Renders semantic `<a href>` — keyboard navigation native
- Default browser focus ring shown — **no custom focus-visible style** (gap vs Button which has 2px black ring)
- Arrow is decorative — not announced separately; text content is the only label
- `aria-label` NOT exposed as a prop — text content must be sufficient (no icon-only mode)
- **Gap:** no `aria-current` for self-referential links

## 13. Motion rules

- **Text gradient transition:** 300ms (`CTALink.tsx:89, 94`) — `transition-all duration-300`
- **Arrow slide:** delegated to `<AnimatedArrow>` (300ms diagonal slide, `translate(-20px,20px) → 0`) (`AnimatedArrow.tsx:64-80`)
- **Unified trigger:** parent `<a>` `onMouseEnter`/`onMouseLeave` sets `isHovering` via `useShimmer` hook, passed to `AnimatedArrow.isHovered` (`CTALink.tsx:90-91, 104`)
- **Reduced-motion:** **not explicitly handled** — `AnimatedArrow` does NOT check `prefers-reduced-motion`. **Honest gap.**

## 14. Anti-patterns ❌

- Never wrap a `<button>` action inside `<CTALink>` — invalid HTML (`<a>` containing `<button>`). Use `<Button>` directly.
- Never use without `href` — `onClick`-only flows belong on `<Button>` (also: `onClick` prop is in interface but is NOT wired into the `<a>`, see Decisions)
- Never use `variant="brand"` for low-urgency text links — devalues brand red (5% rule)
- Never disable the arrow (`showArrow={false}`) and use as nav — at that point you have a styled text link, prefer `<InlineLink>` or raw `<a>`
- Never use as primary form CTA — visually less prominent than `<Button>`, users miss it

## 15. REUSABILITY SCORE

**4/5 ⭐⭐⭐⭐** — Used wherever `SectionHeading` has an action (very common), plus inline narrative. Slightly less universal than Button because urgency-context-specific.

## 16. Linked components

- **Parent organisms:** any section using `SectionHeading` with `action` prop (transitively): `ResearchMethodology`, `BrowseGrid`, `UpcomingReports`, etc.
- **Direct consumer atoms:** `SectionHeading` (`SectionHeading.tsx:114` always renders CTALink for action)
- **Children atoms:** `AnimatedArrow`
- **Sibling atoms:** `Button` (button affordance), `InlineLink` (paragraph link), `NextSectionCTA` (scroll trigger)
- **Hooks involved:** `useShimmer(300)` (`CTALink.tsx:62`) — shared with `InlineLink`

## 17. Reasons + Decisions log

- **Why unified hover (`CTALink.tsx:7-9` verbatim):** "When hovering anywhere on the component, both the text gradient and arrow animate together." Prevents the disjointed feel of separate text and arrow hover states.
- **Why 300ms duration (`CTALink.tsx:62`):** Faster than Button's 700ms shimmer because the gradient is text-only and shorter sweep distance — perceived speed matches the lighter visual weight.
- **Why `bg-clip-text text-transparent` gradient (`CTALink.tsx:75, 80`):** Reuses the Button gradient palette but applies it to the text instead of the bg. Maintains brand cohesion between Button and CTALink.
- **Why `tracking-[0.0875px]` (`CTALink.tsx:89`):** Lifted from Button — same letter-spacing micro-adjustment for "premium feel" at smaller text sizes. Should be tokenized as `var(--tracking-cta)`.
- **`onClick` defined in interface but NOT destructured (`CTALink.tsx:50, 53-61`):** Likely an oversight — the prop is declared but the JSX `<a>` only consumes `href`. Consumers passing `onClick` get no behavior. **BUG / gap to flag.**
- **Why default arrow size 20 (`CTALink.tsx:59`):** Matches `md` text baseline alignment — visually balanced with `text-base` (16px). Override needed only when surrounding type scale differs.
- **Why only 2 variants (default + brand):** Decision lift — avoids the "I need a gray CTALink" trap. If you need gray, you don't need a CTALink, you need an `<InlineLink>` or styled `<a>`.
- **No focus-visible ring (gap):** Relies on browser default. Should be added — Button's `ring-2 ring-black` pattern would be consistent.
