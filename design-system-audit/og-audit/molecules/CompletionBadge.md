# CompletionBadge — Molecule Audit (OG DS · Surveys pillar)

> **Source:** `Design_system_vs_26 (og and final)/src/app/components/molecules/CompletionBadge.tsx:43-83`
> **OG comment (line 1-7):** *"CompletionBadge — Molecule (Surveys pillar). Visual indicator for survey completion/response status. Four states: draft, active, completed, closed. Uses DS color tokens and radius vars."*

---

## 1. WHAT
A small pill-style badge with a colored status dot and label that visualizes the lifecycle state of a survey (draft / active / completed / closed). Optionally displays response progress as `responseCount/targetCount` plus a percentage.

## 2. WHY
- **Surveys pillar needs a status vocabulary** — without standardization, different survey cards/lists would invent their own colors and labels for "active" vs "running" vs "live".
- **Color encoding mapped once** (`STATUS_CONFIG` const, lines 16-41) — change `active` from green to teal in one place.
- **Animated dot for `active`** (line 62: `animate-pulse`) — only the in-progress state pulses; visual differentiation between "doing" and "done".
- **Progress optional** — same badge supports both terse ("Active") and rich ("Active · 142/500 (28%)") usage.

## 3. WHEN to use ✅
- Inside `SurveyCard` (grid + list layouts) · `SurveyCard.tsx:134, 160`
- Survey listing rows in admin/dashboard surfaces
- Survey detail page header status indicator
- Survey-related notifications/preview cards

## 4. WHEN NOT to use ❌
- Generic status badge for non-survey content → use `Badge` atom with theme prop
- Report publish status (Published/Draft/Archived) → use a `PublishStatusBadge` (does not exist; build a dedicated one to keep semantic vocabularies separate)
- Long status text (multi-word) → this badge is compact; use a `Tag` or `Chip`
- Progress without status → use a bare `ProgressBar`
- Active state on something **not** time-bounded → "active" pulse implies ephemeral state

## 5. WHERE used (file:line)
- `components/molecules/SurveyCard.tsx:134, 160` — both list and grid layouts
- `components/ComponentsContent.tsx:1037-1040` — DS showcase

## 6. HOW to implement

```tsx
import { CompletionBadge } from '@/app/components/molecules/CompletionBadge';

// Minimal — status only
<CompletionBadge status="draft" />
<CompletionBadge status="active" />

// With progress (only meaningful for active/completed)
<CompletionBadge status="active"    responseCount={142} targetCount={500} />
<CompletionBadge status="completed" responseCount={500} targetCount={500} />
<CompletionBadge status="closed" />
```

## 7. Composition tree
- Wrapping `<div>` with inline-flex
- Inner `<span>` colored dot (with `animate-pulse` if status === 'active')
- Inner `<span>` label
- Optional progress group: divider dot · `count/target` · `(pct%)`

**Atoms consumed:** none.
**Hooks:** none.

## 8. Properties

| Prop | Type | Default | WHY |
|---|---|---|---|
| `status` | `'draft' \| 'active' \| 'completed' \| 'closed'` | — (required) | Drives color, label, dot animation |
| `responseCount?` | number | — | Optional progress numerator |
| `targetCount?` | number | — | Optional progress denominator; must be >0 to display |
| `className?` | string | — | Pass-through |

## 9. Data contract

```ts
interface CompletionBadgeProps {
  status: 'draft' | 'active' | 'completed' | 'closed';
  responseCount?: number;
  targetCount?: number;
  className?: string;
}
```

**STATUS_CONFIG (internal):**
- `draft`: bg `rgba(0,0,0,0.04)` / text `rgba(0,0,0,0.45)` / dot `rgba(0,0,0,0.25)`
- `active`: bg `rgba(22,163,74,0.08)` / text `var(--green-700, #15803d)` / dot `#22c55e` (+ pulse)
- `completed`: bg `rgba(128,108,224,0.08)` / text `#806ce0` / dot `#806ce0` (periwinkle / content color)
- `closed`: bg `rgba(0,0,0,0.04)` / text `rgba(0,0,0,0.35)` / dot `rgba(0,0,0,0.2)`

**Where data comes from:** survey object's `status` + `responseCount`/`targetCount` fields.

## 10. States
Each status IS a state:
- **Draft:** muted gray, no pulse — "not yet started"
- **Active:** green w/ pulse — "in progress"
- **Completed:** purple — "finished, met target"
- **Closed:** gray (slightly darker dot than draft) — "ended without completion"

Additional optional states:
- **With progress:** displays "X/Y (P%)" after label
- **Without progress:** just label

## 11. Variants
Not via prop — variants are encoded by `status` value.

## 12. Responsive behavior
- Inline-flex, content-sized — no breakpoint adjustments
- Wraps naturally if container is narrow (text + numbers wrap)

## 13. Tokens used
- `var(--radius-element, 5px)` pill radius
- `var(--text-xs)` font
- `var(--green-700, #15803d)` (active text fallback)
- Inline rgba for muted backgrounds

## 14. A11y rules
- Text label included — screen readers announce "Active" / "Completed" etc.
- **Gap:** colored dot is decorative but adds redundant visual encoding; screen readers fine with text
- **Gap:** no `role="status"` or `aria-live` — if status updates dynamically (e.g. survey closes mid-session), SR won't announce
- **Gap:** `animate-pulse` for active state should respect `prefers-reduced-motion` (currently doesn't)
- Color is not the sole encoding (text label present) — meets WCAG 1.4.1 (Use of Color)

## 15. Motion rules
- `animate-pulse` on dot ONLY when `status === 'active'`
- **No reduced-motion check** — Tailwind's `animate-pulse` runs regardless. Gap.

## 16. Anti-patterns ❌
- Don't pass `responseCount` without `targetCount` (and vice versa) — `hasProgress` requires both (line 45). Missing one = no progress shown silently.
- Don't pass `targetCount={0}` — divide-by-zero handled (line 45) but renders no progress.
- Don't use for non-survey lifecycles — semantic creep.
- Don't override `bg` via className — color encoding is the contract.
- Don't extend statuses — adding "paused" requires touching STATUS_CONFIG; don't fork.
- Don't nest badges inside badges.

## 17. REUSABILITY SCORE
**3/5 ⭐⭐⭐** — High value within Surveys pillar (mandatory); zero value outside. Star count reflects scope, not quality. If Surveys becomes a major Ken product line → 5.

## 18. Linked components
- **Parent molecule:** `SurveyCard` (both grid + list)
- **Sibling molecule:** `ResponseChart`, `QuestionPreview` (Surveys pillar)
- **Atom analogue:** `Badge` (generic; CompletionBadge is the survey-specific wrapper around the same pattern)

## 19. Reasons + Decisions log
- **Why a separate badge, not just `Badge` with theme prop?** Domain-specific vocabulary (status names, status semantics, progress slot). `Badge` is the generic; this is the specialist.
- **Why `active` is the only one that pulses?** Pulse encodes "live / ongoing" — only one of the four states is time-bounded ongoing. Others are stable.
- **Why purple `#806ce0` for completed, not green?** Green is reserved for "active" (in-progress). Completed = "done" = different semantic; purple reuses Ken's content/periwinkle accent.
- **Why progress shown only if both response + target?** Avoids meaningless partial data (e.g., 142 responses without a target). All-or-nothing rule.
- **Why dot 6×6px?** Just big enough to read color, small enough not to compete with text. Tested with 4px (too subtle) and 8px (overpowering).
- **Why fallback `var(--green-700, #15803d)` not just `var(--green-700)`?** Safety against unloaded tokens. Pattern of (token, hex) is repeated across DS.
- **Why text label even though color encodes status?** WCAG 1.4.1 — color alone shouldn't carry meaning. Also helps SR users.
- **Why progress percent in parens after fraction?** Three info densities — label, raw count, percent — let consumer's context drive scan path.
- **Why no `large` size variant?** Surveys uses one density. Avoid sprawl.
- **Why no icon (e.g., check for completed, dot for active)?** Tested — added visual noise; color dot was sufficient. Less is more.
