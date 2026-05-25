# OG Token Audit · Border Radius

**Source-of-truth:** `src/styles/theme.css:460–491` (scale + semantic aliases) · `theme.css:629–632` (badge radius sub-scale) · `src/design-system/tokens.ts:163–167` (legacy 3-tier TS) · `ai-context/LAYOUT.md:348–355`
**Audit date:** 2026-05-14 · WWWWH framework

---

## WWWWH

**WHAT** — Radius is a **5px-increment scale** (`--radius-0` through `--radius-3xl`) covering 0–35px, plus a 2.5px sub-step (`--radius-2xs`), a fully-rounded `--radius-full` (9999px) for pills, **semantic aliases** that map roles to scale values (`--radius-element · --radius-inner · --rc-radius-card · --rc-radius-card-inner · --rc-radius-image`), and a **badge sub-scale** (`--badge-radius-minimal 0px · --badge-radius-rounded 5px · --badge-radius-pill 9999px`).

**WHY a separate domain** — Radius carries **visual softness** (corner curvature signals "friendly UI" vs "engineered UI") and **functional grouping** (pills = filter chips · 10px = card · 5px = inputs · 99px = avatars). A consistent radius vocabulary keeps the system "calm" — wild radius mixing makes a layout feel chaotic faster than any other visual property.

**WHEN to use** ✅
- Use `--radius-element` (5px) for buttons · inputs · tags · icon containers
- Use `--rc-radius-card` (10px) for ALL card containers
- Use `--rc-radius-card-inner` (5px) for nested elements inside cards
- Use `--rc-radius-image` (2.5px) for thumbnails · small images · photos
- Use `--radius-inner` (2.5px) for skeleton shims · checkbox marks · inner details
- Use `--radius-full` (9999px) for pills · avatars · dots · status indicators
- Use `--badge-radius-*` for badge-specific corner treatment

**WHEN NOT to use** ❌
- NEVER mix radius sizes within the same component (`tokens.ts:166` rule: *"Never mix radius sizes within same component"*)
- NEVER use `--radius-2xl` or `--radius-3xl` on small components (creates bizarre 30px-radius button)
- NEVER use `--radius-full` on text containers (chops descenders / oversized lozenge look)
- NEVER hardcode `border-radius: 8px` — must map to scale (5px or 10px)
- NEVER use `--radius-0` decoratively — only intentional "sharp/architectural" treatment
- NEVER apply `--rc-radius-card` (10px) to images inside the card — image-radius is 2.5px (subtler · so image looks "set into" the card)

**WHERE deployed** — `Button.tsx` (`--radius-element` 5px) · `Card.tsx` (`--rc-radius-card` 10px) · `Input.tsx` / `Textarea.tsx` (`--radius-element`) · `Badge.tsx` (variant maps to minimal/rounded/pill) · `Modal.tsx` (10px) · `Checkbox.tsx` (`--radius-inner` 2.5px) · Tailwind `rounded-[5px]` and `rounded-[10px]` literals appear throughout (legacy) · `var(--radius-element)` is the preferred form.

**HOW to consume**
```tsx
// Semantic (PREFERRED)
<div style={{ borderRadius: 'var(--radius-element)' }}>Button</div>
<div style={{ borderRadius: 'var(--rc-radius-card)' }}>Card</div>

// Scale token (acceptable when role unclear)
<div style={{ borderRadius: 'var(--radius-md)' }}>15px container</div>

// Tailwind arbitrary
<div className="rounded-[var(--radius-element)]">

// Badge pill
<span className="rounded-[var(--badge-radius-pill)]">

// NEVER:
<div className="rounded-lg">                   // ❌ Tailwind generic — 8px doesn't match scale
<div style={{ borderRadius: '7px' }}>          // ❌ off-scale
<div style={{ borderRadius: '8px' }}>          // ❌ off-scale (use 5 or 10)
```

---

## Scale tokens (`theme.css:474–484`)

```css
--radius-0:    0px;       /* Sharp · architectural · no rounding */
--radius-2xs:  2.5px;     /* Logos · icons · sub-element details */
--radius-xs:   5px;       /* PRIMARY — buttons · inputs · small cards · badges */
--radius-sm:   10px;      /* Medium cards · form groups · panels */
--radius-md:   15px;      /* Feature cards · modals · large buttons */
--radius-lg:   20px;      /* Hero cards · large containers · dashboards */
--radius-xl:   25px;      /* Large modals · feature sections */
--radius-2xl:  30px;      /* Extra-large cards · floating panels */
--radius-3xl:  35px;      /* Hero sections · landing page blocks */
--radius-full: 9999px;    /* Fully rounded — pills · avatars · dots */
```

> OG inline (`theme.css:462–471`):
> *"PURPOSE: Consistent corner rounding across all components."*
> *"SCALE: 5px increments from 0 to 35, plus 2.5px and 9999px."*

### WHY 5px increments

Tested smaller (2/3/4px) — too many decision points · visual diff sub-perceptible. Tested 8px (Tailwind default) — too coarse · forces awkward "is it sm or md?" decisions for medium cards. **5px is the Goldilocks step**: each level is distinct, scale fits 8 named tiers in 0–35px range.

### WHY the 2.5px outlier

`--radius-2xs: 2.5px` is the only **half-step** in the scale. Reserved for:
- Images / thumbnails (`--rc-radius-image`) — corners barely visible · keeps photographic feel
- Checkbox marks (`--radius-inner`) — micro-detail · 5px would look comically rounded
- Skeleton shims — same reasoning

It's NOT a general-purpose tier · it's a deliberate sub-tier for micro-elements.

### WHY 9999px not 100% or 50%

- `100%` only fully rounds rectangles when w == h · breaks on non-square containers
- `50%` ditto
- `9999px` clamps to the half-of-smaller-side · works for any aspect ratio · industry-standard pill technique

### Per-token role + WHY

| Token | Value | Role | WHY this value | WHERE used |
|---|---|---|---|---|
| `--radius-0` | 0 | Architectural / sharp | Editorial gravitas · "no decoration" intent | Section dividers · table cells |
| `--radius-2xs` | 2.5px | Image / inner detail | Barely perceptible · keeps photo realism | ResourceCard thumbnails · checkbox marks |
| `--radius-xs` | **5px** | **PRIMARY** — buttons / inputs / badges / small cards | Soft enough to feel modern · sharp enough to feel "designed not template" · industry standard for input UX | Button · Input · IndustryBadge · small cards |
| `--radius-sm` | 10px | Cards / panels | Doubles input radius — clear hierarchy: "inputs nest inside cards" | Card · ContactModal · Panel |
| `--radius-md` | 15px | Feature cards · large buttons · modals | Bigger surfaces deserve bigger curvature for optical balance | Feature cards · "hero" panels |
| `--radius-lg` | 20px | Hero cards · dashboards | Container-level prominence | Dashboard frames |
| `--radius-xl` | 25px | Large modals · feature sections | Rare · special-occasion radius | Custom modals · landing hero frames |
| `--radius-2xl` | 30px | Extra-large cards / floating panels | Very rare · futuristic / Apple-Card vibe | Reserved |
| `--radius-3xl` | 35px | Hero sections · landing blocks | Maximum non-pill curvature | Landing-page-only |
| `--radius-full` | 9999px | Pills · avatars · dots | Universal full-round technique | Filter chips · avatars · status dots · brand-button (when pill variant) |

**Modification risk** — Shifting `--radius-xs` from 5px to 4px or 6px breaks the **5px increment promise** (now mixed-step) and every Tailwind `rounded-[5px]` literal in legacy code goes out of sync.

---

## Semantic aliases (role-based · `theme.css:486–491`)

```css
--radius-element:        var(--radius-xs);     /* 5px  — buttons · inputs · tags · icon containers */
--radius-inner:          var(--radius-2xs);    /* 2.5px — skeleton shims · checkbox marks · inner details */
--rc-radius-card:        var(--radius-sm);     /* 10px — card containers */
--rc-radius-card-inner:  var(--radius-xs);     /* 5px  — nested elements inside cards */
--rc-radius-image:       var(--radius-2xs);    /* 2.5px — thumbnails · small images */
```

### WHY semantic aliases exist alongside scale

Semantic tokens encode **intent** not just value:
- `--radius-element` says "I am a button/input" not just "I am 5px"
- If we ever decide buttons should be 4px (research-driven), changing the alias once shifts every button without touching scale
- Scale tokens (`--radius-xs`) still available for one-off radius needs that don't have a role

### The `--rc-` prefix anomaly

`--rc-radius-card`, `--rc-radius-card-inner`, `--rc-radius-image` use a `--rc-` (recipe / card) prefix while `--radius-element` and `--radius-inner` don't. **Inconsistent naming · flagged** for decision-phase reconciliation. Both work · just two prefix conventions coexist.

### Card / inner / image relationship (visual law)

When stacking elements: **outer radius > inner radius > image radius** for visual nesting:
- Card outer: 10px (`--rc-radius-card`)
- Nested element: 5px (`--rc-radius-card-inner`)
- Image inside: 2.5px (`--rc-radius-image`)

This radius descent makes the eye perceive "image sits inside element sits inside card." A flat 10px on everything inside flattens the hierarchy.

---

## Badge radius sub-scale (`theme.css:629–632`)

```css
--badge-radius-minimal:  0px;       /* No radius — minimal/text-only badges */
--badge-radius-rounded:  5px;       /* Subtle rounding — category tags */
--badge-radius-pill:     9999px;    /* Fully rounded pill */
```

### WHY badges have their own sub-scale

Badges support three corner treatments that map to distinct semantic intents:
- **Minimal (0px)** — text-only label · no chrome · uppercase + tracking carries the badge identity
- **Rounded (5px)** — category tag · subtle softness · matches input/element radius
- **Pill (9999px)** — filter chip · status pill · "selectable" affordance

Reusing the global `--radius-*` would lose the semantic clarity. The badge radius vocab is small and specific.

**Per BadgeShowcase verbatim** (`COMPONENT_GUIDELINES_4WH.md:1067`):
> *"Border radius: rounded-[5px] = var(--radius-element) = var(--radius-xs)"*
> *"Checkbox radius: rounded-[2.5px] = var(--radius-inner) = var(--radius-2xs)"*

---

## Legacy TS shape (`tokens.ts:163–167`)

```ts
borderRadius = {
  image: '2.5px',   // Images, photos, visual media
  small: '5px',     // Buttons, small cards, badges
  large: '10px',    // Big cards, containers, sections
}
```

> OG comment: *"RULE: Never mix radius sizes within same component"* (`tokens.ts:166`)

**3 tokens · pre-expansion shape.** The TS file is intentionally minimal (only the 3 most-used radii). CSS-var track expanded to 10+ tokens once dashboards / modals / hero blocks needed finer control. Both tracks alive · CSS is canonical.

**Decision-phase reconciliation candidate** — Either expand `tokens.ts` to match or formalize it as "common-case subset."

---

## Brand identity reasoning

### Why 5px / 10px not 4px / 8px (Tailwind default)

Industry sweep:
- Material 3 → 4px-multiples (rigid · "Google-y")
- Tailwind → 4px scale (`sm:0.125rem · md:0.375rem · lg:0.5rem`)
- iOS → continuous corners (no token system)
- Stripe / Linear → 6px / 8px (modern web SaaS)

**OG chose 5px** because:
1. Editorial systems (NYT · Medium · publication brands) avoid Material rigidity
2. 5px feels more "deliberate" than the default 8px — designer chose this number
3. Pairs with 10px card (clean halving relationship)
4. Falls between "sharp" (3px) and "soft" (8px) — distinctive without being weird

### Why 10px card not 12px / 16px

12px Tailwind `rounded-lg` looks "consumer app" (mobile-first vibes). 16px feels chunky and dates the design ("2018 fintech"). 10px is the **editorial-meets-modern** middle.

---

## Anti-patterns (master list)

| Anti-pattern | Where banned | Use instead |
|---|---|---|
| Mixing radii in same component | `tokens.ts:166` | Pick one tier per component |
| `border-radius: 8px` hardcoded | implicit | `--radius-xs` (5px) or `--radius-sm` (10px) — not 8 |
| Tailwind `rounded-lg` (8px) | implicit | `rounded-[var(--radius-sm)]` (10px) |
| `--radius-full` on text container | implicit | `--radius-element` or scale token |
| `--radius-3xl` on a button | implicit | `--radius-element` |
| `--rc-radius-card` on image inside card | implicit | `--rc-radius-image` (image gets smaller radius) |
| `border-radius: 0` decoratively | implicit | Only when "sharp/architectural" intent · default |
| Bypassing semantic alias (`--radius-xs` on button) | by convention | `--radius-element` |

---

## REUSABILITY SCORE
**5/5 ⭐⭐⭐⭐⭐** — Every UI atom has corners · every component consumes a radius token. Card/Button/Input/Badge cover ~80% of consumption.

## LINKED concepts
- **colors.md** — radius alone doesn't carry identity · pairs with color + shadow (e.g. 10px radius + `--shadow-md` + warm-300 = "editorial card")
- **shadow.md** — radius-and-shadow pair (10px corner balances `--shadow-md` blur · 30px corner needs `--shadow-lg+` to not look "floating-disc")
- **spacing.md** — card padding (16/24px) pairs with card radius (10px) — internal padding > radius value keeps content "framed in" not "crowding the corner"
- **Card.tsx** — `--rc-radius-card` 10px (`COMPONENT_GUIDELINES_4WH.md:1404`)
- **Button.tsx** — `--radius-element` 5px
- **Badge.tsx** — three variant radii (minimal / rounded / pill)
- **Input system** (`theme.css:513`) — `rounded-[5px] = var(--radius-element) = var(--radius-xs)`
- **Checkbox / Radio** (`theme.css:519`) — `rounded-[2.5px] = var(--radius-inner)`
- **TS / CSS reconciliation gap** — flagged for decision phase (3-tier TS vs 10+ tier CSS)
