# IconBadge · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/IconBadge.tsx` (67 lines)

---

## 1. WHAT

Small icon container with background tint and rounded shape. Renders a fixed-size box (24/28/32/40px) with a Lucide icon centered inside. Background defaults to ~10% opacity of the icon color (auto-derived via hex+`1a` suffix).

## 2. WHY

OG JSDoc verbatim (`IconBadge.tsx:1-15`):

> "IconBadge — Atom (DS v4.3)"
> "WHAT: Small icon container with background tint and rounded shape."
> "WHY: Reusable decorative icon holder for section headers, list items, and card accents. Prevents each component from hand-coding the same 7-line icon wrapper pattern."
> "WHEN: SectionHeading icon slots, CategoryListItem leading icon, IndustrySectorsGrid sector icons, sidebar filter section headers."
> "HOW: Renders a fixed-size container with a Lucide icon centered inside. Size, color, and background are configurable via props."
> "COLOR SYSTEM: Background uses rgba() opacity tint of the icon color. Defaults to content icon color (#806ce0 at 10% bg)."

- Prevents the 7-line "container + center + icon" wrapper from being inlined 50× across the DS
- Auto-bg derivation: `color="#b01f24"` → bg `rgba(176,31,36,0.1)` — saves caller from passing both
- 4 size presets cover xs (24px) → lg (40px) common cases
- Composes the existing `iconColors` palette from `@/app/components/iconColors`

## 3. WHEN to use ✅

- Leading icon inside `<CategoryListItem>` (`CategoryListItem.tsx:53`)
- Methodology step icons in `ResearchMethodology` (`organisms/ResearchMethodology.tsx:51`)
- Stat icons inside `IndustrySpotlight` (`organisms/IndustrySpotlight.tsx:52`)
- Format-type indicator in `ReportPreview` (`organisms/ReportPreview.tsx:111`)
- Section-header companion icon
- Sidebar filter section icon — via FilterSectionHeader's `icon` prop (consumer composes directly, not through IconBadge — see anti-patterns)

## 4. WHEN NOT to use ❌

- Status pill / label → use `<Badge>` (text + icon together)
- Standalone Lucide icon w/o background → use Lucide directly
- Pure button affordance → use `<Button iconOnly>` (has hit area, click semantics)
- Decorative chip → use `<Badge variant="rounded" icon={...}>` (background + icon + text)
- Avatar / profile image → use `shadcn/ui Avatar`

## 5. WHERE used

- `CategoryListItem.tsx:53` — leading icon (size="xs")
- `organisms/ResearchMethodology.tsx:51` — step icons (size="sm")
- `organisms/IndustrySpotlight.tsx:52` — stat icons (size="sm")
- `organisms/ReportPreview.tsx:111` — format icon (size="xs", BookOpen)
- 5+ usages — well-distributed

## 6. HOW to implement

```tsx
import { TrendingUp, BookOpen, Award } from 'lucide-react';

// Default color (content tier ~purple)
<IconBadge icon={TrendingUp} size="sm" />

// Custom color (10% bg auto-derived)
<IconBadge icon={Award} size="md" color="#b01f24" />

// Custom bg override
<IconBadge
  icon={BookOpen}
  size="lg"
  color="rgba(0,0,0,0.7)"
  bgColor="rgba(0,0,0,0.08)"
/>

// Inside CategoryListItem (matched sizing)
<IconBadge icon={industry.icon} size="xs" color={active ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.35)'} />
```

## 7. Properties

| Prop | Type | Default | Why exists |
|---|---|---|---|
| `icon` | `LucideIcon` | required | Lucide icon **component** (not element) — atom sizes it (`IconBadge.tsx:22`) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | 24/28/32/40px container with 12/14/16/20px icon (`IconBadge.tsx:34-39`) |
| `color` | `string` | `iconColors.content` (~`#806ce0`) | Icon stroke color (`IconBadge.tsx:25, 44`) |
| `bgColor` | `string` | auto = `color + '1a'` (~10% opacity hex) | Container bg — derived from color if omitted (`IconBadge.tsx:51`) |
| `className` | `string` | `''` | Escape hatch |

## 8. States

Static atom — no state. Hover / focus / etc. owned by parent (which is interactive).

## 9. Variants

None — only `size` × `color` × `bgColor` permutations.

## 10. Sizes

| `size` | Container | Icon |
|---|---|---|
| `xs` | 24×24 | 12px |
| `sm` | 28×28 | 14px DEFAULT |
| `md` | 32×32 | 16px |
| `lg` | 40×40 | 20px |

(All from `IconBadge.tsx:34-39`.)

## 11. Tokens used

- `--radius-inner` (fallback 6px) — container rounding (`IconBadge.tsx:59`)
- `iconColors.content` from `@/app/components/iconColors` — default icon color
- No font tokens (icon-only atom)

## 12. A11y rules

- Decorative — wrapping context provides the semantic label
- No ARIA props exposed
- **Gap:** Doesn't add `aria-hidden="true"` automatically — AT may double-announce icon + text label
- Icon stroke color is configurable; consumer must verify contrast against bg

## 13. Motion rules

Static — no transitions. Parent's hover state can change props (e.g., `color`/`bgColor`) for hover-driven changes, but IconBadge itself doesn't animate.

## 14. Anti-patterns ❌

- Never use as a click target — no hit area expansion, no click semantics
- Never override `borderRadius` — DS rule `--radius-inner` per atom
- Never pass icon as element (`<TrendingUp />`) — pass as component (`TrendingUp`). Atom calls `<Icon size={...} />` internally
- Never use without parent context that explains the icon — purely decorative
- Never use inside `FilterSectionHeader` via this atom — that atom already builds its own icon-in-bordered-box (different visual)
- Never use auto-bg with already-rgba `color` — the `color + '1a'` trick assumes hex format. With rgba, you get garbage strings

## 15. REUSABILITY SCORE

**4/5 ⭐⭐⭐⭐** — Well-distributed across atoms + organisms. Tight purpose.

## 16. Linked components

- **Parent atoms:** `<CategoryListItem>` (leading icon slot)
- **Parent organisms:** `ResearchMethodology`, `IndustrySpotlight`, `ReportPreview`
- **Sibling atoms:** `<Badge>` (text + icon together), Lucide icons directly (no bg)
- **Hooks involved:** none
- **Children:** Lucide icon component (instance created internally)

## 17. Reasons + Decisions log

- **Why `LucideIcon` component (not element) (`IconBadge.tsx:22`):** Atom needs to control icon `size` — easier with component reference. `<Icon size={16} />` vs cloning element with new props.
- **Why 4-tier size system (24/28/32/40) (`IconBadge.tsx:34-39`):** Common density needs. Smaller than 24 = use Lucide directly. Larger than 40 = different atom (avatar, illustration).
- **Why container:icon ratio ~2:1 (`IconBadge.tsx:34-39`):** xs (24/12 = 2:1), sm (28/14 = 2:1), md (32/16 = 2:1), lg (40/20 = 2:1). Constant proportion = visually consistent across sizes.
- **Why auto-bg via `color + '1a'` (`IconBadge.tsx:51`):** Hex `1a` = ~10% alpha. Saves caller from passing both. Trade-off: only works with hex format colors (rgba inputs break the suffix concatenation — smell).
- **Why default color `iconColors.content` (`IconBadge.tsx:44`):** Generic decorative-icon purple. Distinct from brand red (5% tier) and pure black.
- **Why `--radius-inner` fallback 6px (`IconBadge.tsx:59`):** If token undefined, sensible fallback. Defensive.
- **Why `flex-shrink: 0` (`IconBadge.tsx:55`):** Inside flex parents (e.g., CategoryListItem), prevents squashing.
- **Why no padding inside container:** Icon is centered via `flex items-center justify-center` — size diff between container and icon IS the padding. Implicit.
- **`color + '1a'` only works with hex (smell):** Should fork to safer hex-parsing OR require `bgColor` explicitly for rgba inputs. Bug-prone.
- **No `aria-hidden` (gap):** Should auto-add `aria-hidden="true"` since icon is decorative — prevents AT double-read.
