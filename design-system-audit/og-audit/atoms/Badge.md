# Badge · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/Badge.tsx` (798 lines — largest atom in DS)

---

## 1. WHAT

Unified labelling pill atom — section labels, step numbers, category tags, status indicators, ALL roll up to one `<Badge>` with 3 variants × 4 sizes × 11 themes × 2 modes × bordered/shimmer/interactive toggles. Exports 9 named convenience wrappers (`SectionLabel`, `StepPill`, `ObjectivePill`, `ObjectivePillInteractive`, `InfoCardLabel`, `CategoryBadge`, `StatusBadge`, `InfoBadge`, `MutedBadge`, `ClickableBadge`).

## 2. WHY

OG JSDoc verbatim (`Badge.tsx:1-43`):

> "Unified badge system for the editorial design system."
> "ARCHITECTURE (CSS Custom Property Driven):"
> "  Sizes & shapes: Defined in theme.css (--badge-xs/sm/md/lg-*, --badge-radius-*)"
> "  Colors: THEME_COLORS JS object selects values per theme/mode props, then sets them as inline CSS custom properties (--badge-bg, --badge-text, etc.)"
> "  CSS rules in theme.css consume all --badge-* properties for base + hover + shimmer"
> "WHY THIS PATTERN: CSS owns property application + transitions + hover states. JS owns theme selection logic (11 themes × 2 modes = 22 combos). No 22-selector CSS explosion. No inline style specificity fights."
> "ICON RULE: Icons in badges are ALWAYS laid out horizontally (inline-flex row) to the left of the text. Never stacked vertically."

- Replaces what would've been 22 hard-coded color combos × 3 variants × 4 sizes = 264 inline cases
- CSS custom property bridge keeps hover/transition logic in CSS while letting JS pick the palette
- Convenience wrappers (`SectionLabel`, `StepPill`, etc.) prevent designers from re-discovering "what props go with what variant"
- Replaces the old `Label.tsx variant="section"` overlap — section labels now live in Badge (`Label.tsx:14`)
- ARIA + `role`/`tabIndex` auto-applied when `onClick` (`Badge.tsx:468-469`)

## 3. WHEN to use ✅

- Section labels above headings: `<SectionLabel theme="brand">KEY INSIGHTS</SectionLabel>`
- Step pills in process flows: `<StepPill stepNumber={2} />`
- Objective markers: `<ObjectivePill objectiveNumber={1} />`
- Category tags on report cards (`CategoryBadge`)
- Status indicators on listings: `<StatusBadge status="success">Completed</StatusBadge>`
- Info-card labels above stat numbers
- Filter section header counts (used inside `FilterSectionHeader.tsx:101`)
- Active-filter representation when paired with remove → actually `<FilterChip>` is the better fit (see WHEN NOT)

## 4. WHEN NOT to use ❌

- Action button → use `<Button>` (badges aren't conversion-grade affordances even with `interactive`)
- Form field label → use `<Label>` (`htmlFor` + semantic `<label>`)
- Dismissible filter pill with X → use `<FilterChip>` (has the remove handler + category prefix pattern)
- Decorative icon-only → use `<IconBadge>` (centered icon container)
- Inline paragraph emphasis → use `<InlineLink>` or just bold/italic
- Free-form notification banner → use `shadcn/ui Alert`

## 5. WHERE used

- `BadgeLabelsDocumentation.tsx:222-238` — catalog showcase across all variants × themes
- `FilterSectionHeader.tsx:101` — `<Badge variant="pill" size="xs" theme="neutral" mode="dark">` for active-count
- Indirectly EVERYWHERE via convenience wrappers across `MethodologySection`, `EngagementObjectivesSection`, `ChallengesSection`, etc.
- **Inferred:** highest cross-surface reuse of any atom besides Button

## 6. HOW to implement

```tsx
// Section label (most common — every section uses one)
<SectionLabel theme="brand">KEY INSIGHTS</SectionLabel>

// Step pill
<StepPill stepNumber={1} active />

// Objective pill (interactive)
<ObjectivePillInteractive number={3} label="Objective" />

// Status badge with icon
<StatusBadge status="success" icon={<Check size={14} />}>
  Completed
</StatusBadge>

// Manual full-control Badge
<Badge 
  variant="rounded" 
  size="md" 
  theme="warm" 
  mode="light"
  bordered 
  shimmer
  icon={<Award size={14} />}
>
  Expert Pick
</Badge>

// Dark-mode pill
<Badge variant="pill" size="sm" theme="brand" mode="dark" bordered>
  Featured
</Badge>

// Clickable (becomes button-role)
<ClickableBadge onClick={handleFilter} theme="periwinkle">
  Add filter
</ClickableBadge>
```

## 7. Properties

| Prop | Type | Default | Why exists |
|---|---|---|---|
| `variant` | `'minimal' \| 'rounded' \| 'pill'` | `'minimal'` | 3-shape system: no-bg label / 5px-radius tag / fully-pill (`Badge.tsx:51-54`) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | 9-15px font range mapped to density tiers (`Badge.tsx:56-60`) |
| `theme` | 11 options (see Variants) | `'neutral'` | Selects color palette × mode pair (`Badge.tsx:62-73`) |
| `mode` | `'light' \| 'dark'` | `'light'` | Surface-aware palette flip — bg/text auto-invert (`Badge.tsx:75`) |
| `bordered` | `boolean` | `false` | Opt-in border (some variants like rounded look best bordered, minimal looks best bare) (`Badge.tsx:83`) |
| `shimmer` | `boolean` | `false` | Adds gradient shimmer overlay (CSS-driven via `--badge-shimmer` token + `.badge-shimmer` class) (`Badge.tsx:84, 472-474`) |
| `interactive` | `boolean` | `false` | Adds `cursor:pointer` + `.badge-interactive` class for hover lift (`Badge.tsx:85, 459`) |
| `uppercase` | `boolean` | `true` | Default ON because most badge use-cases (labels, status) are uppercase (`Badge.tsx:86`) |
| `letterSpacing` | `string` | — | Override `--badge-{size}-tracking` (`Badge.tsx:87`) |
| `fontWeight` | `400 \| 500 \| 600` | `500` (pill/rounded), `400` (minimal) | Section labels usually 600 (`Badge.tsx:88-89`) |
| `icon` | `ReactNode` | — | "ALWAYS horizontal — never stacked." Auto-sized to badge size (10/12/14/16px) (`Badge.tsx:90-91, 478-493`) |
| `as` | `'span' \| 'div' \| 'p'` | `'span'` | Semantic flex (`Badge.tsx:92`) |
| `ariaLabel` | `string` | — | (`Badge.tsx:95`) |
| `onClick` | `() => void` | — | Auto-adds `role="button"` + `tabIndex={0}` (`Badge.tsx:468-469`) |

## 8. States

- **Default:** bg + text + optional border per theme/mode/bordered
- **Hover (CSS-driven via `.badge-interactive`):** `--badge-hover-bg`, `--badge-hover-border` consumed by theme.css rules
- **Shimmer (overlay):** absolutely-positioned gradient div, animation handled by CSS keyframes referencing `--badge-shimmer` (`Badge.tsx:472-474`)
- **Focus-visible (when `onClick`):** relies on browser default — **gap, no custom ring**
- **Disabled:** no explicit prop — consumer applies via `style.opacity`

## 9. Variants

1. **`minimal`** — No bg, no border. Section labels, in-line text emphasis. Default `lineHeight: 1.6`, `fontWeight: 400`. (`Badge.tsx:139-142, 433`)
2. **`rounded`** — 5px radius (matches button), optional bg + border. Category tags, status indicators. (`Badge.tsx:143-146`)
3. **`pill`** — Fully rounded. Step numbers, objectives, interactive badges. (`Badge.tsx:147-150`)

11 themes: `neutral` (default black/white), `warm` (editorial warm tones), `brand` (Ken red), `coral`, `purple` (premium/innovation), `periwinkle` (trust/reliability), `success` (green), `warning` (amber), `error` (red), `info` (blue/perano), `muted` (deliberately subdued). All with light + dark mode palettes (22 total color sets). WCAG contrast documented per theme inline. (`Badge.tsx:162-383`)

## 10. Sizes

| Size | Font | Icon px | Use for |
|---|---|---|---|
| `xs` | `var(--badge-xs-font)` 9-10px | 10 | InfoCardLabel above stats |
| `sm` | `var(--badge-sm-font)` 11px | 12 | DEFAULT — section labels, pills, step numbers |
| `md` | `var(--badge-md-font)` 13px | 14 | Emphasized badges, ObjectivePillInteractive |
| `lg` | `var(--badge-lg-font)` 15px | 16 | Large interactive badges, hero ribbons |

## 11. Tokens used

- `--badge-xs-font`, `--badge-sm-font`, `--badge-md-font`, `--badge-lg-font`
- `--badge-xs-py/px`, `-sm-py/px`, `-md-py/px`, `-lg-py/px`
- `--badge-xs-tracking`, `-sm-tracking`, etc.
- `--badge-radius-minimal`, `--badge-radius-rounded`, `--badge-radius-pill`
- `--badge-text`, `--badge-bg`, `--badge-border`, `--badge-border-width`, `--badge-hover-bg`, `--badge-hover-border`, `--badge-shimmer` (set inline by JS, consumed by CSS in theme.css)
- `--badge-transition-duration` (fallback 300ms)
- `--warm-50/100/700/800/900`, `--brand-red`, `--coral-{50-900}`, `--purple-{50-900}`, `--periwinkle-{50-900}` — theme palettes
- Raw rgba for `success`/`warning`/`error`/`info` themes — NOT tokenized (smell)

## 12. A11y rules

- `ariaLabel` prop available (`Badge.tsx:466`)
- When `onClick`, auto-applies `role="button"` + `tabIndex={0}` (`Badge.tsx:468-469`)
- **No `onKeyDown` handler** — Space/Enter don't trigger click. **Bug.** Should add.
- **No focus-visible ring** — browser default only
- WCAG contrast documented inline in `THEME_COLORS` palette structure but not enforced — relies on theme picker (designer responsibility)
- Touch target: badges < 44px by default (xs is 9-10px font). When `interactive` + `onClick`, consumer must ensure hit area enlargement via padding or wrapping

## 13. Motion rules

- Transition: `background-color`, `border-color`, `transform` over `var(--badge-transition-duration, 300ms)` ease-out (`Badge.tsx:453`)
- Shimmer: CSS keyframe via `.badge-shimmer` class, gradient consumes `--badge-shimmer` color from theme palette (`Badge.tsx:472-474`)
- **Reduced-motion:** delegated to CSS in theme.css — **assumed handled**, not visible in this file (honest gap, needs theme.css verification)

## 14. Anti-patterns ❌

- Never stack icon above text — JSDoc rule: "ALWAYS horizontal" (`Badge.tsx:38, 42`)
- Never use `<Badge onClick>` without keyboard handling — current implementation gives `role="button"` but NOT keyboard activation (bug)
- Never use `theme="brand"` for >5% of badges — devalues brand red (5% tier rule)
- Never use `minimal` + `bordered` — visual contradiction (minimal means bare)
- Never use `theme="error"` for status that isn't actually a destructive/failure state — undermines color semantics
- Never use `<Badge>` where `<FilterChip>` (dismissible) or `<Label>` (form) belong — overlap creates misuse
- Never put long text in `xs` size — readable floor is ~11px (use `sm`)

## 15. REUSABILITY SCORE

**5/5 ⭐⭐⭐⭐⭐** — Absolutely foundational. 9 convenience wrappers cover the canonical use cases. The CSS-var-driven architecture is the most thoughtful in the DS.

## 16. Linked components

- **Parent organisms:** every section using `SectionLabel` (effectively all) — `MethodologySection`, `ChallengesSection`, `EngagementObjectivesSection`, `ImpactSection`, etc.
- **Direct atom consumers:** `FilterSectionHeader.tsx:101` (active-count badge)
- **Sibling atoms:** `Label` (form labels — explicit migration note at `Label.tsx:175-178`), `IconBadge` (icon-container atom, different responsibility), `FilterChip` (dismissible variant)
- **Children:** none (leaf atom)
- **Hooks involved:** none

## 17. Reasons + Decisions log

- **CSS-var bridge architecture (`Badge.tsx:1-19`):** Explicit decision. JS picks colors; CSS owns transitions + hover. Prevents 22-selector explosion AND inline-style specificity fights.
- **Why default `uppercase: true` (`Badge.tsx:86`):** Most badge use-cases (section labels, status, step pills) are uppercase. Better to flip off than to forget to flip on.
- **Why `minimal` default lineHeight 1.6, others 1 (`Badge.tsx:433`):** `minimal` is paragraph-context-friendly (inline with text); other variants are pill-shaped (height-constrained, lineHeight 1 = vertically centered).
- **Why icon size auto-matched per badge size (`Badge.tsx:112, 117, 122, 127`):** Designer can't accidentally insert oversized icon. xs=10, sm=12, md=14, lg=16.
- **Why 11 themes (`Badge.tsx:62-73`):** Empirical — every Ken surface needs at least: neutral (default), brand (Ken red), warm (editorial), success/warning/error (status), info (informational), muted (deemphasis). Coral/purple/periwinkle added for premium accent moments.
- **Why convenience wrappers (`Badge.tsx:504-786`):** `SectionLabel`, `StepPill`, etc. — prevent the "what props go with what use case" trap. Single import, single use.
- **`textMinimal` vs `text` per theme (`Badge.tsx:167, 172` etc.):** Minimal variant uses a slightly lighter text (e.g., `rgba(0,0,0,0.6)` vs `0.7`) because there's no bg/border, so the text needs less contrast for the visual weight to read right.
- **Why dark-mode brand-red text is `rgba(255, 200, 200, 0.95)` not pure red (`Badge.tsx:216`):** Pure brand red on dark bg fails contrast. Salmon-tint preserves brand recognition while passing WCAG AA.
- **Why `--badge-shimmer` consumed by CSS not JS (`Badge.tsx:446, 472-474`):** Keyframe animations need static CSS to be GPU-accelerated. JS only sets the color value.
- **Why `onClick` adds `role="button"` not just relies on default `<span>` (`Badge.tsx:468-469`):** Without it, screen readers announce "text" not "button" — discoverability fail. (Note: keyboard handler still missing — bug.)
- **Migration note from Label (`Label.tsx:14-17`):** "Section variant has been REMOVED. Section headers now live in Badge.tsx as SectionLabel wrapper. This eliminates the overlap where two components (Label and Badge) served the same purpose." Recorded refactor decision.
