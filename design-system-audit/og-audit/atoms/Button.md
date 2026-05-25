# Button · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/Button.tsx` (302 lines)

---

## 1. WHAT

Primary CTA atom — a `<button>` wrapper with 4 variants, 5 sizes, 2 surface modes (light/dark), shimmer sweep on hover, Material-style ripple on click, optional animated arrow, loading spinner, and icon-only mode. The single source of clickable affordance for explicit user actions across every Ken surface.

## 2. WHY

- **Conversion CTAs need consistent affordance** across every Ken page — random inline `<button>`s drift in size/color/motion
- **Brand-locked shimmer is signature** — the gradient sweep on hover is part of Ken's premium feel (`Button.tsx:200-228`)
- **Touch-target floor baked in** via `--button-height-{size}` tokens — consumers can't accidentally ship a 24px tap target
- **Dark-surface inversion automated** via `background="dark"` prop — ghost/secondary auto-flip text + border (`Button.tsx:147-152`)
- **Reduced-motion respected** via `motion-reduce:transition-none` on every shimmer layer (`Button.tsx:200, 210, 221`)

## 3. WHEN to use ✅

- Form submit / save / publish action
- Conversion CTA — "Book a call", "Download Sample Report", "Talk to Analyst"
- Modal confirmation / dismiss
- Hero CTA pair (primary + secondary)
- Navbar top-right brand CTA (`Navbar.tsx:352`, `:458`)
- Inline action inside a section: `ResourcesSection.tsx:460`
- Loading-state-required actions (submit pending, async fetch)

## 4. WHEN NOT to use ❌

- Inline navigation link → use `<CTALink>` (text+arrow w/o button affordance)
- Inside-paragraph cross-reference → use `<InlineLink>` (red underline, no shape)
- Scroll-to-next-section affordance → use `<NextSectionCTA>` (chevron-down pattern)
- Filter toggle / selected-state → use `<FilterCheckbox>` or `<FilterChip>`
- Decorative pill / status indicator → use `<Badge>` (no click affordance)
- Icon-only inside a `<Card>` w/o ariaLabel → fix the missing label OR use `Card`'s built-in interactive prop

## 5. WHERE used

- `Navbar.tsx:352` — desktop "Book a call" brand CTA top-right
- `Navbar.tsx:458` — mobile sheet primary CTA
- `ResourcesSection.tsx:460` — secondary CTA inside Resources organism
- `NavigationDocumentation.tsx:313` — docs demo
- Plus 20+ usages across `*Documentation.tsx`, `*Showcase.tsx` (catalog surfaces)

## 6. HOW to implement

```tsx
// Default primary
<Button variant="primary" size="md" onClick={handleSubmit}>
  Download Report
</Button>

// Brand red — conversion-only, max 1-2 per screen
<Button variant="brand" size="lg" showArrow>
  Book a discovery call
</Button>

// Ghost on dark surface
<Button variant="ghost" background="dark" size="md">
  Request Customization
</Button>

// Loading
<Button variant="primary" size="md" loading>
  Submitting...
</Button>

// Icon-only (ariaLabel mandatory)
<Button variant="ghost" size="sm" iconOnly ariaLabel="Close modal" icon={<X />} />

// Full-width mobile pattern
<Button variant="primary" size="lg" fullWidth>
  Continue
</Button>
```

## 7. Properties

| Prop | Type | Default | Why exists |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'brand'` | `'primary'` | 4 variants cover 95% of CTA needs. `brand` is conversion-only tier. (`Button.tsx:5`) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 5 sizes mapped to density tiers. `xs` only for card-footer/table-action context (touch-target exemption). (`Button.tsx:6, 59`) |
| `background` | `'light' \| 'dark'` | `'light'` | Auto-inverts ghost/secondary text+border on dark surfaces — consumer can't forget. (`Button.tsx:7, 147-152`) |
| `fullWidth` | `boolean` | `false` | Mobile-first pattern: `w-full sm:w-auto` default, `fullWidth` forces always-full. (`Button.tsx:181`) |
| `icon` | `ReactNode` | — | Lucide icon cloned with auto-sized stroke. (`Button.tsx:185-194`) |
| `iconPosition` | `'left' \| 'right'` | `'right'` | Right-default reflects arrow-after-text convention. (`Button.tsx:43`) |
| `iconOnly` | `boolean` | `false` | Square aspect (width = height). Requires ariaLabel. (`Button.tsx:97-102`) |
| `loading` | `boolean` | `false` | Spinner replaces icon, disables click. (`Button.tsx:257-261`) |
| `disabled` | `boolean` | `false` | 50% opacity, `cursor-not-allowed`. |
| `ripple` | `boolean` | `true` | Material ripple on click. Disable in dense lists for perf. (`Button.tsx:74-87`) |
| `shimmerDuration` | `number` | `700` | Override the 700ms sweep. Tested vs 500ms (jarring) and 1000ms (sluggish). (`Button.tsx:48`) |
| `showArrow` | `boolean` | `false` | Replaces `icon` with `<AnimatedArrow>` that animates with button hover. (`Button.tsx:263-297`) |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Prevent accidental form submit. (`Button.tsx:52`) |
| `ariaLabel` | `string` | — | Mandatory for `iconOnly`. Auto-falls-back to `children` if string. (`Button.tsx:240`) |

## 8. States

- **Default:** gradient bg (primary/brand) or border-only (ghost/secondary), shadow per variant
- **Hover:** shimmer sweep (`translate-x` 0 → -1/2 over 700ms), `boxShadow` deepens (`Button.tsx:160, 166`)
- **Active (click):** ripple expands from cursor point, 600ms ease-out, contained to bounds (`Button.tsx:78-86`)
- **Focus-visible:** 2px black ring with 2px offset via inline `ring-2 ring-black ring-offset-2 focus-visible:opacity-100` (`Button.tsx:299`)
- **Disabled:** opacity 50%, `cursor-not-allowed`, no shimmer/ripple
- **Loading:** spinner (Loader2, animate-spin), click suppressed, text dimmed (`Button.tsx:257-261`)

## 9. Variants

1. **`primary`** — black-grey gradient `linear-gradient(90deg, #141016, #656565, #141016)`. Default for most CTAs. (`Button.tsx:159`)
2. **`brand`** — red gradient `linear-gradient(90deg, #b01f24, #eb484e, #b01f24)`. Conversion moments only (Book call, Buy). Heavier shadow `0 12px 32px rgba(176, 31, 36, 0.25)`. (`Button.tsx:165-166`)
3. **`secondary`** — white bg + thin black border. Neutral / secondary CTAs. On hover, border + text shift to brand red `var(--brand-red)`. (`Button.tsx:148, 172-174`)
4. **`ghost`** — transparent bg, text + border only. Auto-inverts to white on `background="dark"`. (`Button.tsx:150-152`)

## 10. Sizes

| Size | Icon px | Gap | Use for |
|---|---|---|---|
| `xs` | 14 | gap-1 | Card footer / table action only (touch-target exempt — external touch area provided by parent). 7×7 (28×28px) iconOnly. (`Button.tsx:59, 62, 97`) |
| `sm` | 16 | gap-1.5 | Navbar, compact density |
| `md` | 18 | gap-2 | DEFAULT — most CTAs |
| `lg` | 20 | gap-2.5 | Hero, pricing, standout |
| `xl` | 24 | gap-3 | Editorial hero, landing-page-only |

Heights are token-driven: `var(--button-height-{sm,md,lg,xl})`. xs is hard-coded `h-7 min-w-[56px]`. (`Button.tsx:97`)

## 11. Tokens used

- `--button-height-sm/md/lg/xl` — height per size tier
- `--button-px-sm/md/lg/xl` — horizontal padding
- `--button-min-width-sm/md/lg` — minimum width floor
- `--radius-element` (fallback `5px`) — border radius across all sizes (`Button.tsx:105, 110, 117, 124, 130`)
- `--text-xs`, `--text-nav`, `--text-sm` — font size per `xs`/`sm`/`md` (`Button.tsx:136-138`)
- `--brand-red` — secondary hover text + border, focus ring inspiration
- Inline gradients (not tokenized): `#141016 → #656565` (primary), `#b01f24 → #eb484e` (brand)
- Inline shadows (not tokenized): `0 2px 8px rgba(0,0,0,0.15)` default → `0 4px 12px rgba(0,0,0,0.25)` hover

## 12. A11y rules

- Keyboard reachable (Tab/Shift+Tab); Enter + Space trigger click natively (`<button>`)
- `aria-label` auto-set to children if string; mandatory override for `iconOnly` (`Button.tsx:240`)
- `disabled` HTML attr set when `disabled || loading` (`Button.tsx:237`)
- Focus ring: 2px black inside, 2px offset — non-removable, never `outline:none`
- Touch target ≥44×44px enforced via tokens for `sm` and up; `xs` exempt (card-footer context)
- Contrast: primary/brand white-on-dark gradient ≥ 4.5:1 verified; ghost on light bg requires container contrast check (anti-pattern flagged below)

## 13. Motion rules

- **Shimmer sweep:** 700ms ease-out, `translate-x-0` → `-translate-x-1/2`. `motion-reduce:transition-none` (`Button.tsx:200, 210, 221`)
- **Ripple:** 600ms ease-out forwards, contained to bounds, ~Material default (`Button.tsx:84, 250`)
- **Hover bg-shift / border-shift:** 300ms ease-out (`Button.tsx:175`)
- **All transitions:** `transition-all duration-300` baseline (`Button.tsx:94`)
- **Reduced-motion:** every shimmer layer carries `motion-reduce:transition-none`. Static state used.

## 14. Anti-patterns ❌

- Never use raw `<button>` HTML — loses shimmer + sizing + brand
- Never override bg via `className` — `variant="ghost" className="bg-red-500"` defeats the variant system
- Never use `brand` variant for >2 CTAs per screen — it loses signal
- Never use `ghost` on light surface w/o testing contrast — text becomes near-invisible (border-only)
- Never use `xs` outside card-footer / table-action — touch-target failure
- Never set `disabled` AND `loading` at the same time externally — `loading` already disables internally (`Button.tsx:237`)
- Never wrap a `<Button>` in an `<a>` — invalid HTML, focus/keyboard breaks

## 15. REUSABILITY SCORE

**5/5 ⭐⭐⭐⭐⭐** — Mandatory CTA atom. Used on every page type (case-study, PDP, listing, landing, docs). Foundation of the entire interaction layer.

## 16. Linked components

- **Parent organisms:** `Navbar`, `ResourcesSection`, `FinalCTASection`, `StickyCTA`, `ProductHero`, `CustomResearchCTA`, `NewsletterSignup`
- **Sibling atoms:** `CTALink` (text+arrow nav link), `InlineLink` (paragraph link), `NextSectionCTA` (scroll-to-next), `Badge` (no-click pill)
- **Children atoms:** `AnimatedArrow` (when `showArrow`)
- **Hooks involved:** internal `useState` for ripples + hover; no shared hook. (Note: `CTALink` uses `useShimmer` — `Button` does not, it tracks its own `isHovering`)

## 17. Reasons + Decisions log

- **Primary gradient `#141016 → #656565 → #141016` (verbatim `Button.tsx:159`):** Black-to-grey-to-black diagonal sweep creates depth without losing the "black button" identity.
- **Brand gradient `#b01f24 → #eb484e → #b01f24` (`Button.tsx:165`):** Same pattern with brand red. Heavier shadow tinted with the brand color: `rgba(176, 31, 36, 0.25)`.
- **Shimmer duration default 700ms (`Button.tsx:48`):** Tested values. 500ms reads as jarring; 1000ms reads as sluggish. 700ms = "premium" perceived.
- **`width: w-full sm:w-auto` default (`Button.tsx:181`):** Mobile-first. Buttons span full-width on mobile (better thumb target), auto-width on tablet+.
- **Focus ring via opacity-0 + `focus-visible:opacity-100` (`Button.tsx:299`):** Avoids native outline jank; gives full control over ring style + radius.
- **Inline gradient + shadow (NOT tokenized):** Decision lift — gradients/shadows stayed inline rather than moving to tokens because they are tightly variant-coupled and rarely reused outside `<Button>`. Migration to tokens would need composition tokens (`--composition-gradient-button-primary` etc.).
- **`xs` exempt from `min-width` token (`Button.tsx:97`):** Hard-coded `min-w-[56px]` because xs has no `--button-min-width-xs` token in OG. Smell: incomplete token coverage.
- **`secondary` hover transitions colors over 300ms (`Button.tsx:175`):** Hand-built JS-driven hover (vs CSS hover) because the color shift to brand-red on hover needs `isHovering` state for predictable behavior with focus + keyboard interaction.
- **No `xxs` size:** Implicit in size enum — would become indistinguishable from `<TextLink>`/`<InlineLink>` text emphasis.
