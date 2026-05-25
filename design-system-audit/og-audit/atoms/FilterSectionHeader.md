# FilterSectionHeader · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/FilterSectionHeader.tsx` (118 lines)

---

## 1. WHAT

Collapsible section header for sidebar filter groups. Composes `[icon-in-bordered-box] [UPPERCASE LABEL] [active-count Badge] [optional trailing] [chevron]`. Renders a full-width button that toggles the parent's filter group open/closed.

## 2. WHY

OG JSDoc verbatim (`FilterSectionHeader.tsx:1-21`):

> "FilterSectionHeader — Atom (DS v4.3)"
> "WHAT: Collapsible section header for sidebar filter groups."
> "WHY: Extracted from 4x duplicate inline patterns in ReportStoreListingDemoContent. Industries, Tags, Regions, Publish Year all share the same header anatomy: icon-in-bordered-box + uppercase label + optional count badge + chevron toggle."
> "WHEN: Inside SidebarPanel filter sections."
> "HOW: Renders a full-width button with the reference's exact layout: [icon-box] [LABEL] [badge?] [lock?] [chevron]"
> "INTERACTION STATES: Default → bg rgba(0,0,0,0.016), label color 0.45. Active → bg rgba(0,0,0,0.024), label color 0.7, icon-box border darkens. Disabled → opacity 0.55, cursor not-allowed. Open → chevron rotated 90deg. Closed → chevron at 0deg"

- Replaces 4x duplicate inline patterns (Industries, Tags, Regions, Publish Year) — DRY
- "Active" visual when `activeCount > 0` — user sees "this group has selections" at a glance
- Composes `<Badge>` for the count (`FilterSectionHeader.tsx:101`) — DS coherence
- Chevron rotation (not swap) keeps animation simple
- `trailing` slot for Lock icon ("Tags requires industry first" pattern)

## 3. WHEN to use ✅

- Filter group header in sidebar (Industries, Regions, Years, Tags)
- Settings group header in profile pages
- Collapsible "advanced filters" section
- Sidebar collapsible group with selection count badge

## 4. WHEN NOT to use ❌

- Page-level section header → use `<SectionHeading>` (different scale, has subtitle/action slots)
- Inline collapse w/ subtitle → use `<CollapsibleSection>` (different visual treatment, body included)
- Tab nav → use `shadcn/ui Tabs`
- Non-collapsible header → use `<SectionHeading level={3}>`
- Form fieldset header → use `<legend>` for a11y

## 5. WHERE used

- `FiltersDocumentation.tsx:621-664, 1298` — docs catalog
- **Honest gap:** No production consumer grep'd directly. Lives inside FilterAccordion / SidebarPanel composition.

## 6. HOW to implement

```tsx
import { Layers, MapPin, Calendar, Tag, Lock } from 'lucide-react';

const [open, setOpen] = useState(true);

// Standard
<FilterSectionHeader
  icon={<Layers size={12} />}
  label="Industries"
  activeCount={1}
  isOpen={open}
  onToggle={() => setOpen(!open)}
/>

// With active count badge
<FilterSectionHeader
  icon={<MapPin size={12} />}
  label="Regions"
  activeCount={3}
  isOpen={open}
  onToggle={() => setOpen(!open)}
/>

// Disabled (Tags before industry selected)
<FilterSectionHeader
  icon={<Tag size={12} />}
  label="Tags"
  disabled
  trailing={<Lock size={10} className="text-black/30" />}
/>

// No chevron (always-on)
<FilterSectionHeader
  icon={<Calendar size={12} />}
  label="Publish Year"
  showChevron={false}
/>
```

## 7. Properties

| Prop | Type | Default | Why exists |
|---|---|---|---|
| `icon` | `ReactNode` | required | Already-sized Lucide icon (caller sizes; atom doesn't auto-size) (`FilterSectionHeader.tsx:28`) |
| `label` | `string` | required | Section label (rendered uppercase) |
| `activeCount` | `number` | `0` | Number of active selections — renders a `<Badge variant="pill" size="xs" theme="neutral" mode="dark">` (`FilterSectionHeader.tsx:31`) |
| `isOpen` | `boolean` | `false` | Drives chevron rotation 0° → 90° (`FilterSectionHeader.tsx:33`) |
| `onToggle` | `() => void` | — | If omitted, header becomes non-interactive |
| `active` | `boolean` | `false` | Forces "active" styling even without count (e.g., search-within-this-group active) (`FilterSectionHeader.tsx:37`) |
| `disabled` | `boolean` | `false` | 0.55 opacity, cursor-not-allowed (`FilterSectionHeader.tsx:39`) |
| `trailing` | `ReactNode` | — | Optional inline element before chevron (Lock icon, etc.) (`FilterSectionHeader.tsx:41`) |
| `showChevron` | `boolean` | `true` | Hide for always-on sections |

## 8. States

- **Default:** bg `rgba(0,0,0,0.016)`, label `rgba(0,0,0,0.45)`, icon-box bg white + border `rgba(0,0,0,0.08)` (`FilterSectionHeader.tsx:64-65, 78-79, 89`)
- **Active (`activeCount > 0` OR `active`):** bg `rgba(0,0,0,0.024)`, label `rgba(0,0,0,0.7)`, icon-box bg `rgba(0,0,0,0.04)` + border `rgba(0,0,0,0.2)` (`FilterSectionHeader.tsx:64-65, 78-79, 89`)
- **Open:** chevron rotated 90° (`FilterSectionHeader.tsx:109`)
- **Closed:** chevron 0°
- **Disabled:** opacity 0.55, cursor-not-allowed (`FilterSectionHeader.tsx:66-67`)

## 9. Variants

None — `active` boolean and `disabled` boolean are the visual variants.

## 10. Sizes

Single fixed size: container `px-4 py-3`, icon-box `w-6 h-6`, chevron `w-5 h-5` with `<ChevronRight size={12}>`, label `var(--text-xs)`. (`FilterSectionHeader.tsx:63, 73, 89, 108, 112`)

## 11. Tokens used

- `--text-xs` — label font (`FilterSectionHeader.tsx:89`)
- `--radius-element` (5px) — icon-box rounding (`FilterSectionHeader.tsx:75`)
- All other colors raw rgba (per monochromatic discipline)
- Composes `<Badge variant="pill" size="xs" theme="neutral" mode="dark">` — which uses its own token tree

## 12. A11y rules

- Real `<button>` — keyboard reachable
- **Gap:** No `aria-expanded={isOpen}` — AT users can't tell the section is collapsible/state
- **Gap:** No `aria-controls` linking to filter body
- **Gap:** No `aria-disabled` (relies on HTML `disabled`)
- Disabled state uses real HTML `disabled` ✓ (`FilterSectionHeader.tsx:69`)

## 13. Motion rules

- `transition-all duration-150` on container (`FilterSectionHeader.tsx:63`)
- Icon-box `transition-all` (`FilterSectionHeader.tsx:74`)
- Label `transition-colors` (`FilterSectionHeader.tsx:87`)
- Chevron `transition-transform` (`FilterSectionHeader.tsx:108`)
- Reduced-motion: not explicitly respected

## 14. Anti-patterns ❌

- Never use as a section page header (different scale) — use `<SectionHeading>`
- Never put more than ~3 trailing elements (icon-box + badge + trailing + chevron is already busy)
- Never use without a parent that manages `isOpen` state — atom is dumb
- Never use `activeCount` for hot stuff (e.g., > 99) — Badge size xs can't fit "100+" cleanly
- Never override `<Badge>` styling via className — defeats composability

## 15. REUSABILITY SCORE

**4/5 ⭐⭐⭐⭐** — Tight purpose, well-encapsulated. 4 use cases (Industries, Regions, Tags, Years) at minimum.

## 16. Linked components

- **Parent:** `FilterAccordion` molecule, `SidebarPanel` organism
- **Direct child atoms:** `<Badge>` (active-count badge)
- **Sibling atoms:** `<FilterCheckbox>` / `<FilterCheckboxItem>` (filter rows inside the section)
- **Children:** Lucide `<ChevronRight>` + caller-provided icon
- **Hooks involved:** none

## 17. Reasons + Decisions log

- **Why icon-in-bordered-box not bare icon (`FilterSectionHeader.tsx:71-83`):** Bordered box gives the icon "presence" — sidebar filter groups need visual anchor. Bare icons feel weightless next to uppercase label.
- **Why icon-box border darkens when active (`FilterSectionHeader.tsx:78`):** Reinforces "active" state on the icon-box too — not just text. Multi-element active-state visual coherence.
- **Why chevron rotation 0° → 90° (`FilterSectionHeader.tsx:109`):** `<ChevronRight>` rotates to point down when open — universal collapsed/expanded convention. Less code than swap with `<ChevronDown>`.
- **Why uppercase + tracking-[0.08em] (`FilterSectionHeader.tsx:87-93`):** Editorial trade-magazine eyebrow convention — same as `<SectionHeading>` label slot. Visual hierarchy: section header is "label-class".
- **Why Badge theme="neutral" mode="dark" (`FilterSectionHeader.tsx:101`):** Black pill with white text — high contrast in sidebar context. Mode="dark" inverts the palette.
- **Why activeCount default 0 (`FilterSectionHeader.tsx:31`):** Safe default; `if (activeCount > 0)` conditional render of badge.
- **Why `active` AND `activeCount` both possible (`FilterSectionHeader.tsx:58`):** `isActive = active || activeCount > 0` — either programmatic override OR count-derived. Flexibility for edge cases.
- **Why disabled state is opacity not color shift (`FilterSectionHeader.tsx:66`):** Opacity is universally readable as "inert". Color shift would need per-state palette duplication.
- **Why `trailing` slot (`FilterSectionHeader.tsx:97`):** Lock icon, info tooltip, dot indicator — extension point without bloating prop surface.
- **Why `icon` is already-sized ReactNode not LucideIcon (`FilterSectionHeader.tsx:28`):** Consumer passes `<Layers size={12} />` — gives caller control over icon size/stroke. Trade-off: caller must remember to size; atom is less foolproof. Smell — could be tighter API.
- **Missing `aria-expanded` (gap):** Should add `aria-expanded={isOpen}` on the button. Standard accordion-header a11y attribute.
