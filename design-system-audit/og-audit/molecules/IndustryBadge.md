# IndustryBadge — Molecule Audit (OG DS)

> **Source:** `Design_system_vs_26 (og and final)/src/app/components/molecules/IndustryBadge.tsx:14-27`
> **OG comment (line 1-6):** *"IndustryBadge — Atom-level wrapper. Text-only industry/subcategory label used across all card and listing layouts. No chip, no background — just text."*

> **Classification note:** OG comment calls this an **atom-level wrapper** but ships it from the `molecules/` folder. Single span; could legitimately be an atom.

---

## 1. WHAT
A single-line, text-only, uppercase, lightly-spaced label for industry/subcategory metadata on cards. No background, no border, no icon — purely typographic. Truncates with ellipsis on overflow.

## 2. WHY
- **Visual rhythm:** uppercase + `letterSpacing: 0.06em` + `var(--text-xs)` creates a recognizable "category" tone that recurs across every card type.
- **Single point of change:** every card type sources industry/subcategory styling from here — change one prop, all cards adapt.
- **No background = stays editorial:** "chip-style" badges feel UI-heavy; this stays in editorial text territory.
- **`block truncate`** — prevents long industry names from breaking card layouts.

## 3. WHEN to use ✅
- Industry / subcategory label above card titles · `ReportCard.tsx:84, 164` · `AnalystPickCardB.tsx:60`
- Category eyebrow above any title-bearing block (cards, list rows, hero overlays)
- Any text label that should read as "metadata category" — uppercased, tracked, muted

## 4. WHEN NOT to use ❌
- Status indicator (active/closed/draft) → use `CompletionBadge` or `Badge` atom
- Pill-style category chip with background → use `Badge variant="pill"`
- Inline-with-body category mention → use plain `<span>`
- Heading text — semantic h1-h6 not a span
- Multi-line label — `truncate` cuts to one line

## 5. WHERE used (file:line)
- `components/molecules/ReportCard.tsx:84, 164` — both layouts
- `components/molecules/AnalystPickCardB.tsx:60` — embedded mini-card

> Likely consumed many other places — file appears only as molecule import in grep.

## 6. HOW to implement

```tsx
import { IndustryBadge } from '@/app/components/molecules/IndustryBadge';

<IndustryBadge>Healthcare</IndustryBadge>
<IndustryBadge>Financial Services</IndustryBadge>
<IndustryBadge className="mt-2">Energy &amp; Utilities</IndustryBadge>
```

## 7. Composition tree
- Single `<span>` with inline style — no nested elements.

**Atoms consumed:** none.
**Hooks:** none.

## 8. Properties

| Prop | Type | Default | WHY |
|---|---|---|---|
| `children` | ReactNode | — (required) | Label text (typically string but accepts node for icon-prefixed variants) |
| `className?` | string | — | Pass-through; appends to default class string |

## 9. Data contract

```ts
interface IndustryBadgeProps {
  children: ReactNode;
  className?: string;
}
```

**Where data comes from:** report/asset `industry` or `subcat` field (free-text from CMS or fixed enum).

## 10. States
None. Static display.

## 11. Variants
None.

## 12. Responsive behavior
- `block` width fills parent
- `truncate` (ellipsis on overflow) prevents wrap on narrow cards
- No breakpoint adjustments

## 13. Tokens used
- `var(--text-xs)` font size
- Inline `rgba(0,0,0,0.4)` color
- `letterSpacing: 0.06em` (tighter than section labels' 0.1em — intentional)

## 14. A11y rules
- Plain text, readable by screen readers
- `uppercase` is CSS text-transform → screen readers read the underlying mixed-case if any (depends on engine)
- **Gap:** no semantic association with the title below (could use `aria-describedby` to bind category → title relationship)

## 15. Motion rules
None.

## 16. Anti-patterns ❌
- Don't pass long multi-line strings — `truncate` cuts at one line silently.
- Don't use for status/state — wrong semantic; use `Badge` or `CompletionBadge`.
- Don't override `text-transform: uppercase` — molecule's identity is uppercase tracked.
- Don't nest IndustryBadge inside IndustryBadge.
- Don't pass interactive children (buttons/links) — wraps in `<span>`, not interactive.
- Don't override `letterSpacing` via className — inline style wins; would need to fork.

## 17. REUSABILITY SCORE
**5/5 ⭐⭐⭐⭐⭐** — Used by every card type. Foundation primitive of card metadata rhythm.

## 18. Linked components
- **Parent molecules:** `ReportCard`, `AnalystPickCardB`, any future card with category eyebrow
- **Sibling concept:** `Badge` (atom; pill/chip with bg) vs `IndustryBadge` (text-only)
- **Pairs with:** `CardMetaRow`, `CardFooterRow` — together they form the card metadata vocabulary

## 19. Reasons + Decisions log
- **Why "atom-level wrapper" but in molecules folder?** OG comment classifies it as atom-level intent; lives in molecules likely for taxonomy convenience (industry-specific naming). Could move to `atoms/` with a rename — cosmetic.
- **Why `letterSpacing: 0.06em` not `0.1em` like section headings?** Inline body-level labels feel cramped at 0.1em; 0.06em loosens but doesn't spread. Section headings are bigger visual zones — they handle 0.1em.
- **Why `rgba(0,0,0,0.4)` not `text-black/40` Tailwind?** OG inline-rgba philosophy. Direct value, no Tailwind dependency.
- **Why `block` not `inline-block`?** Allows pinning above title with margin; truncate works on block better than inline-block in flex contexts.
- **Why `var(--text-xs)` not `--text-card-micro`?** `--text-xs` is body-text-small (12.8px), micro is 10px. Industry label sits at body scale, not "micro footnote".
- **Why no built-in margin (only via className)?** Spacing is composition-level concern; molecule doesn't dictate.
- **Why default text color via inline opacity not a token?** `--color-text-muted` doesn't exist as a token yet — opportunity for token introduction.
- **Why `truncate` instead of `line-clamp-1`?** Truncate is the correct CSS for single-line ellipsis (text-overflow). line-clamp is for multi-line.
- **Why no icon support?** Would compete with `CardMetaRow`'s job. Strict purity: text-only category.
- **Why not just a Tailwind utility class set?** A named component captures the intent (`<IndustryBadge>` reads as semantic). Class strings are stylistic; component name is semantic.
