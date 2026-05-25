# Card · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/Card.tsx` (132 lines)

---

## 1. WHAT

Generic content container that encodes Ken's approved card pattern: white/warm/outlined background, subtle border, layered box-shadow, hover lift `translateY(-2px)` with shadow intensify and border darken. Header JSDoc names this "Ken Bold DS v4.0".

## 2. WHY

OG JSDoc verbatim (`Card.tsx:1-14`):

> "Reusable content container that encodes the approved card pattern: white bg, subtle border, box-shadow, hover lift + shadow intensify."
> "DS compliance: Border radius: var(--rc-radius-card) = 10px"
> "Shadow rest: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"
> "Shadow hover: 0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)"
> "Lift: translateY(-2px) on hover"
> "Border: 1px solid rgba(0,0,0,0.06), darkens to 0.10 on hover"
> "Transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1)"

- Prevents the "every card looks slightly different" drift by encoding pad/shadow/border in one atom
- Imperative `onMouseEnter`/`onMouseLeave` (not CSS) handlers — gives consumers explicit hover toggling per instance (`Card.tsx:98-116`)
- 3 variants × 4 padding × 4 shadow × hover on/off = composable without exploding the API
- Semantic-element-flexibility via `as` prop (`div | article | section`) — supports a11y intent
- 10px radius (`--rc-radius-card`) larger than 5px buttons → cards feel like surfaces, buttons feel like controls

## 3. WHEN to use ✅

- Report listing card (composed with `ReportCard` molecule)
- Stat highlight card on a dashboard
- Methodology step card in `MethodologySection`
- Resource link card
- Pricing tier container
- Empty-state container (`EmptyState` molecule wraps Card)

## 4. WHEN NOT to use ❌

- Full-width section background → use `<SectionWrapper>` (handles bg alternation + padding)
- Inline pill / status → use `<Badge>` (different shape system, no shadow)
- Modal / dialog surface → use `shadcn/ui Dialog` (focus trap + portal)
- Hero panel → don't wrap a hero in a Card; hero is a `<SectionWrapper>` with `level=1` heading
- Form fieldset → use semantic `<fieldset>` with custom styling; Card lacks form a11y semantics

## 5. WHERE used

- `ResourcesContent.tsx:340` — `<Card>` wrapping docs callout
- Plus dozens of indirect usages via `ReportCard`, `StatCard`, `DataHighlightCard`, `EmptyState`, `SkeletonCard` molecules (which all compose on top of `Card`'s shadow/border pattern, sometimes inlined rather than importing — drift to flag)
- **Honest gap:** `Card` is less explicitly imported than expected; many molecules re-implement the pattern inline rather than wrap `<Card>`. Smell flagged in 4WH_AUDIT.

## 6. HOW to implement

```tsx
// Default no-padding container — children handle their own pad
<Card>
  <img src="cover.jpg" />
  <div className="p-5">Title</div>
</Card>

// With hover lift (typical interactive card)
<Card padding="md" shadow="md" hover onClick={navigate}>
  <h3>Click me</h3>
</Card>

// Warm variant (off-white)
<Card variant="warm" padding="lg" shadow="sm">
  <p>Editorial callout</p>
</Card>

// Outlined (transparent bg, just border)
<Card variant="outlined" padding="md">
  <p>Reads as bordered region without surface elevation</p>
</Card>

// Semantic <article>
<Card as="article" variant="white" hover>
  <h2>Report title</h2>
</Card>
```

## 7. Properties

| Prop | Type | Default | Why exists |
|---|---|---|---|
| `variant` | `'white' \| 'warm' \| 'outlined'` | `'white'` | Surface tone — white for content, warm for editorial, outlined for transparent-bg sections (`Card.tsx:18, 55-65`) |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'none'` | `none` default forces consumer to make padding decision explicit — avoids surprise padding eating layout (`Card.tsx:19, 48-53`) |
| `shadow` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 4-tier elevation: sm (subtle), md (default rest), lg (emphasized). Each has rest + hover variant. (`Card.tsx:20, 34-46`) |
| `hover` | `boolean` | `false` | Opt-in lift + shadow intensify + border darken. Default off because static cards shouldn't suggest interactivity. (`Card.tsx:27`) |
| `as` | `'div' \| 'article' \| 'section'` | `'div'` | Semantic element override for a11y intent (`Card.tsx:28`) |
| `onClick` | `(e) => void` | — | Optional — sets `cursor: pointer` automatically (`Card.tsx:94`) |
| `className` | `string` | `''` | Escape hatch (combined with `PADDING_MAP[padding]`) |
| `style` | `CSSProperties` | `{}` | Inline override — spread LAST (`Card.tsx:95`) so consumer wins |

## 8. States

- **Default:** bg per variant, border `1px solid rgba(0,0,0,0.06)` (white), shadow per `shadow` prop, `borderRadius: var(--rc-radius-card)` (`Card.tsx:86-96`)
- **Hover (only if `hover={true}`):** `translateY(-2px)`, `boxShadow` → `SHADOW_HOVER_MAP[shadow]`, `borderColor` → `BORDER_HOVER_MAP[variant]`. 400ms cubic-bezier(0.16, 1, 0.3, 1) (`Card.tsx:91-93, 98-116`)
- **No active / focus / disabled states** — Card is presentational; if you need a button, wrap children in `<Button>` or use `Card`'s `onClick` (which only sets cursor, no keyboard handling — see anti-patterns)

## 9. Variants

1. **`white`** — Solid white bg `rgba(255,255,255,1)`, border `rgba(0,0,0,0.06)` → hover `0.10`. Default for most content. (`Card.tsx:56, 62, 68`)
2. **`warm`** — Warm-200 bg `var(--warm-200)`, border `rgba(0,0,0,0.05)` → hover `0.08`. Editorial / featured / "soft surface" feel. (`Card.tsx:57, 63, 69`)
3. **`outlined`** — Transparent bg, border `rgba(0,0,0,0.10)` → hover `0.16`. Use on already-colored sections where a filled card would clash. (`Card.tsx:58, 64, 70`)

## 10. Sizes

Card has no `size` enum — instead it composes via `padding` × `shadow`:

| Padding | Pixels | Use for |
|---|---|---|
| `none` | 0 | DEFAULT — children control pad (e.g., card with hero image edge-to-edge) |
| `sm` | 16px (`p-4`) | Dense list cards |
| `md` | 20px (`p-5`) | Standard report card |
| `lg` | 24px (`p-6`) | Editorial / featured |

| Shadow | Rest | Hover |
|---|---|---|
| `none` | `none` | `none` |
| `sm` | `0 1px 2px rgba(0,0,0,0.03)` | `0 4px 12px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.03)` |
| `md` | `0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)` | `0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)` |
| `lg` | `0 4px 12px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.03)` | `0 12px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.05)` |

## 11. Tokens used

- `--rc-radius-card` — 10px card radius (`Card.tsx:89`)
- `--warm-200` — warm variant bg (`Card.tsx:57`)
- All shadows + borders are RAW rgba — **NOT tokenized**. Smell: shadow tokens not used. (`Card.tsx:34-46`)

## 12. A11y rules

- `as` prop allows `article`/`section` for semantic intent — use `article` for self-contained content like report cards
- `onClick` sets cursor pointer but **does NOT add `role="button"`, `tabIndex`, or keyboard handlers** — clicking via Card.onClick is not keyboard-accessible. **BUG to flag.** Wrap with real `<button>` or `<a>` if interactive.
- No `aria-label` prop exposed
- Hover lift is `translateY(-2px)` — does not respect `prefers-reduced-motion` (no `motion-reduce` class). **Gap.**

## 13. Motion rules

- Transition `box-shadow + transform + border-color` over `0.4s cubic-bezier(0.16, 1, 0.3, 1)` — the DS easing (`Card.tsx:91-93`)
- Lift: `translateY(0)` ↔ `translateY(-2px)` (`Card.tsx:104, 113`)
- **Reduced-motion: NOT respected** — imperative DOM mutation bypasses CSS media queries. **Honest gap.**

## 14. Anti-patterns ❌

- Never use `onClick` and expect keyboard accessibility — Card doesn't add `tabIndex`/role/keydown. Wrap interactive Card in a real `<button>` or `<a>` instead. (`Card.tsx:94`)
- Never override `borderRadius` via `style` — breaks the DS 10px card-radius rule
- Never nest Cards (visual confusion — multiple elevations stacking)
- Never use `shadow="lg"` for static (non-hover) cards — implies importance hierarchy
- Never use `variant="warm"` on a `warm` `<SectionWrapper>` — same tone collides, no surface separation
- Never use `padding="none"` and expect children to inherit padding — children pad themselves explicitly

## 15. REUSABILITY SCORE

**4/5 ⭐⭐⭐⭐** — High intent but mid actual reuse because many molecules re-implement the pattern inline rather than wrap `<Card>` (drift). Should be 5/5 in target state.

## 16. Linked components

- **Parent organisms:** any section displaying lists of items — `BrowseGrid`, `FeaturedResearch`, `AnalystPicks`, `TrendingTopics`, etc.
- **Molecules that compose / should compose on Card:** `ReportCard`, `ReportGridCard`, `StatCard`, `DataHighlightCard`, `CategoryListCard`, `AnalystPickCardB`, `SkeletonCard`, `EmptyState`
- **Sibling atoms:** `SectionWrapper` (full-bleed section vs contained card), `Badge` (pill, not surface), `Container` (just width, no surface)
- **Hooks involved:** none — internal `useRef` only for imperative hover mutation (`Card.tsx:84`)

## 17. Reasons + Decisions log

- **Why 10px radius (`Card.tsx:89` + JSDoc L7):** Distinguishes cards (10px = surface) from buttons (5px = control). Major Third visual hierarchy.
- **Why dual-layer shadow rest (`Card.tsx:37`):** `0 1px 3px ... + 0 1px 2px ...` — two layers create more realistic light falloff than a single shadow.
- **Why `translateY(-2px)` exactly (`Card.tsx:104`):** Lifted from DS v4.0. 2px = perceptible but not jarring. 1px feels weak, 4px feels jumpy.
- **Why `cubic-bezier(0.16, 1, 0.3, 1)` (`Card.tsx:92`):** Standard "ease-out-expo-soft" — fast start, very slow finish = "settled" feeling on hover.
- **Why imperative `onMouseEnter`/`onMouseLeave` instead of CSS `:hover` (`Card.tsx:98-116`):** Allows `hover` prop to be opt-in — CSS `:hover` would always fire. Trade-off: bypasses `prefers-reduced-motion` (gap).
- **Why `padding="none"` default (`Card.tsx:77`):** Consumer must make a deliberate padding choice. Prevents the "Card swallowed my spacing" surprise.
- **Why `style` spread LAST (`Card.tsx:95`):** Consumer overrides win — explicit decision recorded in code structure.
- **Inline rgba border colors (NOT tokenized) (`Card.tsx:62-71`):** Decision deferred — borders are tightly variant-coupled, would need composition tokens. Smell flagged.
- **`onClick` without keyboard a11y (`Card.tsx:94, 123`):** Likely an oversight. Should add `tabIndex={onClick ? 0 : undefined}`, `role="button"`, `onKeyDown` for Space/Enter. **Bug to fix in next iteration.**
