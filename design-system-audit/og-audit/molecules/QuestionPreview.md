# QuestionPreview — Molecule Audit (OG DS · Surveys pillar)

> **Source:** `Design_system_vs_26 (og and final)/src/app/components/molecules/QuestionPreview.tsx:39-295`
> **OG comment (line 1-12):** *"QuestionPreview — Molecule (Surveys pillar). Interactive preview card showing a single survey question with its type, options (if applicable), and required indicator. Used in survey detail pages and survey builder previews. All inputs are fully interactive: selectable radios, toggleable checkboxes, typeable text, clickable rating stars, editable number, selectable dropdown. Uses DS composites: Card, Badge."*

---

## 1. WHAT
An interactive preview card for a single survey question. Six question types supported: `multiple-choice` (radio), `checkbox` (multi), `text` (textarea), `rating` (1-5 stars), `number` (numeric input), `dropdown` (single-select list). All inputs fully working with internal state — the preview is a real micro-form, not just a visual.

## 2. WHY
- **Survey builders need true interaction preview** — static screenshots don't convey what respondents will experience. This molecule simulates the real form interaction so builders can validate question design.
- **Six types in one component** — single import for any question type. Caller passes `type` + `options`; molecule routes to the right UI.
- **Internal state per type** — each question type owns its preview state (no callbacks for state needed; previews are isolated).
- **Required indicator** as red asterisk (line 84) — universal pattern for required form fields.
- **Periwinkle accent `#806ce0`** for selected/active states — consistent with Surveys-pillar color theme (matches `CompletionBadge` "completed" + question number tag).

## 3. WHEN to use ✅
- Survey detail page showing all questions · `SurveysDemoContent.tsx:382`
- Survey builder preview pane
- Documentation/showcase of question types · `ComponentsContent.tsx:1241-1254`

## 4. WHEN NOT to use ❌
- **Production form** where responses are captured → use real form atoms wired to backend (this is preview-only)
- Static read-only display → use a simpler text rendering
- Generic Q&A FAQ block → use a `<details>` or `FaqItem` pattern, not survey UI
- Embedded inside another card → already a `Card`; double-wrapping breaks hover affordance
- Multi-question stepper → use this as building block, not as the stepper itself

## 5. WHERE used (file:line)
- `components/SurveysDemoContent.tsx:382` — survey detail showcase
- `components/ComponentsContent.tsx:1241-1254` — DS showcase

## 6. HOW to implement

```tsx
import { QuestionPreview } from '@/app/components/molecules/QuestionPreview';

<QuestionPreview
  number={1}
  question="Which best describes your role?"
  type="multiple-choice"
  required
  options={['Founder/CEO', 'Product Manager', 'Designer', 'Engineer', 'Other']}
/>

<QuestionPreview
  number={2}
  question="Rate the importance of these features"
  type="rating"
/>

<QuestionPreview
  number={3}
  question="Share your top frustration with the current tool"
  type="text"
/>

<QuestionPreview
  number={4}
  question="How many seats does your team need?"
  type="number"
/>
```

## 7. Composition tree
- `Card` (atom) `padding="sm"`
  - Header: numbered tag chip (periwinkle) + question text (+ required `*`)
  - Type badge row: type icon + type label
  - Type-specific body:
    - multiple-choice: radio buttons (custom-styled `<button>` rows)
    - checkbox: checkbox buttons (`Check` icon on checked)
    - dropdown: numbered list w/ check icon on selected
    - text: `<textarea>`
    - rating: 5 `<button>` stars with hover state
    - number: `<input type="number">`

**Atoms consumed:** `Card`.
**Util:** `iconColors`.
**Icons:** `CircleDot`, `CheckSquare`, `AlignLeft`, `Star`, `Hash`, `ChevronDown`, `Check`.
**Hooks:** `useState` × 7 (one per input state).

## 8. Properties

| Prop | Type | Default | WHY |
|---|---|---|---|
| `number` | number | — (required) | Question position (1-based) |
| `question` | string | — (required) | Question text |
| `type` | `QuestionType` | — (required) | Determines input UI |
| `options?` | `string[]` | — | Required for MC, checkbox, dropdown |
| `required?` | boolean | — | Shows red `*` |
| `className?` | string | — | Pass-through |

`QuestionType = 'multiple-choice' | 'checkbox' | 'text' | 'rating' | 'number' | 'dropdown'`

## 9. Data contract

```ts
export type QuestionType = 'multiple-choice' | 'checkbox' | 'text' | 'rating' | 'number' | 'dropdown';

export interface QuestionPreviewProps {
  number: number;
  question: string;
  type: QuestionType;
  options?: string[];
  required?: boolean;
  className?: string;
}
```

**Where data comes from:** survey definition (JSON/CMS) describing questions.

## 10. States
Per-type interactive states (all internal to molecule):
- **multiple-choice:** `selectedRadio: number | null` — only one selectable
- **checkbox:** `checkedItems: Set<number>` — multi-select
- **text:** `textValue: string` — typing live changes border/bg color (purple when typed)
- **rating:** `rating: number, hoverRating: number` — click to set, hover preview
- **number:** `numberValue: string` — typing changes border/bg color
- **dropdown:** `selectedDropdown: number | null` — single-select with check mark

Common state pattern: muted gray when inactive → periwinkle `#806ce0` accent when active/selected/typed.

## 11. Variants
Six — driven by `type` prop. No prop-level "variant"; `type` IS the variant.

## 12. Responsive behavior
- Card fills parent width.
- Number input has min 80px / max 120px.
- Textarea `w-[calc(100%-1.75rem)]` (accounts for left indent).
- No breakpoint adjustments — survey questions sized for any container.

## 13. Tokens used
- `var(--text-xs)` · `var(--text-sm)` body
- `var(--radius-inner, 2.5px)` checkbox radius
- Periwinkle `#806ce0` repeated inline (could be `--surveys-accent` token)
- `iconColors.utility` type-icon color
- Brand red `rgba(176, 31, 36, 1)` required asterisk

## 14. A11y rules
- Required asterisk has `aria-label="required"` (line 84) ✅
- Star buttons have descriptive `aria-label` (line 240: "X star/stars") ✅
- Real `<button>` / `<input>` / `<textarea>` elements (keyboard reachable) ✅
- **Gap:** radio group should be `role="radiogroup"` with each item `role="radio"`; currently uses plain buttons
- **Gap:** checkbox group should use `role="group"` + checkbox role per item
- **Gap:** no `<label>` association — question text is `<p>` not `<label htmlFor>`
- **Gap:** no `aria-describedby` linking question → input
- Number input lacks `aria-label`

## 15. Motion rules
- `transition-colors` on input border/bg color changes
- `transition-transform` on stars (`hover:scale-110`)
- No reduced-motion guard

## 16. Anti-patterns ❌
- Don't use this for production data capture — internal state isn't lifted; responses lost on unmount.
- Don't pass `options` for `text` / `rating` / `number` types — ignored.
- Don't omit `options` for `multiple-choice` / `checkbox` / `dropdown` — body renders empty.
- Don't pass long `question` strings expecting truncation — none applied.
- Don't reuse the same `number` across siblings — used in numbered badge; UX confusion (not a key collision per se).
- Don't fork by adding a 7th type without touching `TYPE_CONFIG` map.
- Don't nest QuestionPreview inside QuestionPreview.

## 17. REUSABILITY SCORE
**3/5 ⭐⭐⭐** — High value inside Surveys pillar; zero outside. Same logic as `CompletionBadge` — scope-bound. If Surveys becomes a major Ken pillar → 5.

## 18. Linked components
- **Parent organisms:** survey detail pages, survey builders
- **Sibling molecules:** `CompletionBadge`, `ResponseChart`, `SurveyCard`, `SurveySkeleton`
- **Child atom:** `Card`
- **Util:** `iconColors`

## 19. Reasons + Decisions log
- **Why fully interactive vs static visual?** Survey builders need confidence that the question works for respondents; static = guesswork.
- **Why six types in one molecule, not one-per-type?** Single import; routing via `type` prop. Tradeoff: large file (295 lines). Could split if it grows.
- **Why internal state, not controlled?** Preview is preview — not capturing responses. Lifting state to consumer would be ceremony without benefit.
- **Why periwinkle `#806ce0`?** Surveys-pillar accent (also used in `CompletionBadge` completed state). Differentiates Surveys UI from Reports' coral/red.
- **Why numbered badge is purple/periwinkle pill?** Visual rhyme with the Surveys pillar; question number = "Survey-specific UI element".
- **Why required is red `*` not green or color-coded "required" label?** Convention — red asterisk is web-standard required indicator (forms, surveys, sign-ups).
- **Why icons inside type badge?** Visual chunking — type label + icon together creates "tag-pattern" the eye scans quickly.
- **Why rating goes 1-5 not 1-10?** Industry-standard for satisfaction scales (NPS is separate). 5 = manageable visual count.
- **Why hoverRating distinct from rating state?** Live preview of "what if I click here" before click. Mirrors iOS rating UI.
- **Why text input changes color when typed?** Affordance feedback — user knows their input registered. Empty → muted gray; typed → purple accent.
- **Why no submit button?** It's a preview, not a form. Submit lives at survey level.
- **Why brand-red asterisk inline `rgba(176,31,36,1)`?** Required = critical → brand red = critical/CTA red. Should be `var(--coral-500)` token (not used here — gap).
