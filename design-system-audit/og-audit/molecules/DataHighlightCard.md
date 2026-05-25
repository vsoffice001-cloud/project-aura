# DataHighlightCard — Molecule Audit (OG DS)

> **Source:** `Design_system_vs_26 (og and final)/src/app/components/molecules/DataHighlightCard.tsx:24-62`
> **OG comment (line 1-3):** *"DataHighlightCard — Molecule. DS-compliant card for Daily Data Highlights section."*

---

## 1. WHAT
A compact card showing a single data point: a large serif numerical value, a short title, a green growth chip with `TrendingUp` icon, a source/citation, a time/freshness label, and an animated arrow on hover. Built for "Daily Data Highlights" — a fast-scan strip of fresh market data points.

## 2. WHY
- **Daily-freshness UI affordance** — Ken differentiates by surfacing live data, not just deep reports. This card signals "this is new, this is live".
- **Editorial serif on the value** — distinguishes hero number visually from supporting text (font-family: var(--font-serif), font-weight: light). Looks like print headline.
- **Animated arrow** (`AnimatedArrow` atom, line 57) wired to `isHovered` state — directional cue without committing to a full Button.
- **One-line growth chip** — green pill with `TrendingUp` icon — instantly readable "this is up".

## 3. WHEN to use ✅
- Daily Data Highlights organism (carousels of fresh data) · `DailyDataHighlights.tsx:26`
- Showcase home-page strip of "X data points refreshed today"
- Industry briefing modules surfacing fresh stats
- Inside `HorizontalScroll` to show 6-10 highlights at a glance

## 4. WHEN NOT to use ❌
- Statistical cards with **multiple** metrics → use `StatCard` (has more slots)
- Reports/articles → use `ReportCard`
- Decorative number callout in body copy → just use a styled `<span>` + token
- Static (non-fresh) data → defeats the "highlight" semantic; use `StatCard`
- Cards needing primary CTA button → use `StatCard` (has button slot)

## 5. WHERE used (file:line)
- `components/organisms/DailyDataHighlights.tsx:26` — primary consumer
- `components/ComponentsContent.tsx:915` — DS showcase

## 6. HOW to implement

```tsx
import { DataHighlightCard } from '@/app/components/molecules/DataHighlightCard';

<DataHighlightCard
  value="$847B"
  title="Global EV market size by 2030"
  source="IEA · Q1 2025"
  growth="+14.2% CAGR"
  time="2h ago"
  onClick={() => openSource('https://...')}
/>
```

## 7. Composition tree
- Outer `<div>` (only purpose: hover-state listener to drive AnimatedArrow)
- `Card` (atom) — `hover`, `padding=14px` (inline override)
  - **Top row:** time label + icon (default Zap or custom)
  - **Value** — serif large number
  - **Title** — short descriptor
  - **Growth chip** — green pill (`TrendingUp` + growth text) wrapped in `Tooltip`
  - **Footer row** — source + `AnimatedArrow`

**Atoms consumed:** `Card`, `Tooltip`, `AnimatedArrow`.
**Icons:** `Zap` (default) or custom via `icon` prop, `TrendingUp` (growth).
**Util:** `iconColors`.

## 8. Properties

| Prop | Type | Default | WHY |
|---|---|---|---|
| `value` | string | — (required) | Hero number (pre-formatted) |
| `title` | string | — (required) | One-line descriptor |
| `source` | string | — (required) | Attribution line |
| `growth` | string | — (required) | Growth chip text (e.g. "+14.2%") |
| `time` | string | — (required) | Freshness label (e.g. "2h ago") |
| `icon?` | ReactNode | `<Zap/>` | Top-right icon; default Zap = "fresh / live" |
| `className?` | string | — | Pass-through |
| `onClick?` | `()=>void` | — | Card click handler |

## 9. Data contract

```ts
interface DataHighlightCardProps {
  value: string;
  title: string;
  source: string;
  growth: string;
  time: string;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}
```

**Where data comes from:** real-time data feed → consumer's parent state → mapped to highlight objects.

## 10. States
- **Default:** static.
- **Hover** (tracked via `useState isHovered`): Card hover effect (atom-level) + `AnimatedArrow` plays.
- **Click:** fires `onClick`.
- **No loading state** — caller responsible (consider `SkeletonCard` while fetching).

## 11. Variants
None.

## 12. Responsive behavior
- Card fills its container width (often inside `HorizontalScroll` with fixed item width).
- `line-clamp-1`/`line-clamp-2` not used on title; relies on short title strings.
- No breakpoint logic.

## 13. Tokens used
- `var(--font-serif)` value
- `var(--font-weight-light)` value
- `var(--text-base)` value · `var(--text-xs)` time/title/growth/source
- `var(--radius-element, 5px)` growth chip
- `var(--green-700, #15803d)` growth text · `rgba(22,163,74,0.08)` growth bg
- `var(--black-200)` footer divider
- `iconColors.content` Zap icon

## 14. A11y rules
- Card-level `onClick` requires Card atom to handle keyboard activation (verify).
- `Tooltip` provides "Growth rate" explanation accessibly.
- **Gap:** time label ("2h ago") not in `<time>` element; not machine-readable.
- **Gap:** value is plain text; for screen readers "$847B" → "dollar 847 B" — fine but no aria-label clarifying "847 billion dollars".
- Source line is text only — no link affordance (intentional; source is attribution, not click target).

## 15. Motion rules
- `AnimatedArrow` plays on hover only (`isHovered` state).
- Card hover handled by Card atom.
- Growth chip transition on color hover via `transition-colors`.
- No reduced-motion explicit check at molecule level.

## 16. Anti-patterns ❌
- Don't pass long titles (>2 lines) — no line-clamp; layout breaks.
- Don't pass numeric `value` — must be pre-formatted string.
- Don't omit `growth` — green chip is the visual anchor; without it card feels empty.
- Don't replace `Zap` icon with red/coral icons — Zap signals freshness (yellow energy); changing breaks semantic.
- Don't nest inside another Card.
- Don't wire arrow to fire `onClick` separately — single click target is the whole card.

## 17. REUSABILITY SCORE
**3/5 ⭐⭐⭐** — Very useful within "fresh data" UI; little use outside. Star count reflects scope. Similar to `StatCard` but more compact and freshness-emphasized — keep both, they serve different rhythms.

## 18. Linked components
- **Parent organism:** `DailyDataHighlights`
- **Cousin molecule:** `StatCard` (richer; for KPIs not freshness)
- **Child atoms:** `Card`, `Tooltip`, `AnimatedArrow`
- **Icons:** lucide TrendingUp + Zap (default)

## 19. Reasons + Decisions log
- **Why serif on the value?** Editorial signal — serif numerals = print/data-feature feel. Sans body keeps supporting text functional.
- **Why `padding: 14px` inline override vs Card's `padding="sm"`?** Tested — 14px sits between sm (12) and md (16); precise designer choice for this card's density.
- **Why default icon is `Zap`?** Symbolizes "fresh / live / lightning"; pairs with the Daily Data freshness narrative.
- **Why growth chip in green even when growth could be negative?** Current contract assumes positive growth strings; would need a variant for declines. Limitation acknowledged.
- **Why `AnimatedArrow` not a `Button`?** Card is the click target; arrow is decoration cuing direction. Adding a Button would create nested click targets.
- **Why outer `<div>` wrapper just for hover state?** Hovered state tracked outside Card to drive `AnimatedArrow` prop. Card atom doesn't expose hover state.
- **Why `time` at top-left rather than bottom?** Time = "when published" = the freshness eyebrow. Reading order: when → what → why-good → where-from.
- **Why no `loading` skeleton built-in?** Card-level skeleton handled at organism (`SkeletonCard` parallel). Keeps molecule pure.
- **Why no fallback for missing `growth`?** If a highlight has no growth metric, this isn't the right card; use `StatCard` or plain quote.
- **Why CAGR-implying growth text without explicit unit?** Tooltip says "Growth rate" — generic; consumer writes "+14% CAGR" explicitly in the string if needed.
