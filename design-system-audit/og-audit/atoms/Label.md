# Label · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/Label.tsx` (215 lines)

---

## 1. WHAT

Semantic `<label>` form atom — pairs with form inputs via `htmlFor`. 3 variants (default / secondary / required), required-asterisk indicator (brand red), optional helper text below. Form-only scope as of v3.0 — section header variant was REMOVED and migrated to `<Badge variant="minimal">` / `SectionLabel` wrapper.

## 2. WHY

OG JSDoc verbatim (`Label.tsx:1-43`):

> "LABEL COMPONENT - Design System v3.0 (Form-Only)"
> "Semantic <label> component exclusively for form inputs."
> "IMPORTANT SCOPE CHANGE (v3.0): The \"section\" variant has been REMOVED. Section headers now live in Badge.tsx as SectionLabel wrapper. This eliminates the overlap where two components (Label and Badge) served the same purpose."
> "WHY THIS EXISTS: Provide clear, accessible context for form inputs. Establish consistent form label hierarchy. Improve accessibility with semantic <label> + htmlFor association. Support required field indicators and helper text."

- Refactor decision recorded: Label is now form-only; section labels live in Badge → eliminates 2-component overlap
- `htmlFor` association = WCAG-compliant form labelling
- Required asterisk in brand red — universally read indicator
- Helper text below label = inline guidance (e.g., "3-20 characters") — better than placeholder which disappears on focus
- 3 variants cover field-importance gradient: default → secondary → required

## 3. WHEN to use ✅

- Every form input — text field, email, password, textarea, select, radio group
- Required field marker (asterisk via `required` prop)
- Optional field with subdued styling (`variant="secondary"`)
- Form with inline guidance via `helperText`

## 4. WHEN NOT to use ❌

- Section header / eyebrow → use `<SectionLabel>` from Badge (explicit migration per JSDoc `Label.tsx:175-178`)
- Inline form error message → use a dedicated `<FormError>` (red text, error-icon)
- Inline tooltip on a label → wrap label in `<Tooltip>` (different responsibility)
- Decorative pill / status → use `<Badge>`
- Header text that's also a button trigger → use `<button>` + heading semantic

## 5. WHERE used

- `Label.tsx:134, 138, 142, 151, 157` — self-doc usage examples
- **Honest gap:** No production form consumer grep'd directly. May be under-used because of the v3.0 scope reduction.

## 6. HOW to implement

```tsx
// Standard form label
<Label htmlFor="email">Email Address</Label>
<input id="email" type="email" className="..." />

// Required field
<Label htmlFor="password" required>Password</Label>
<input id="password" type="password" />

// With helper text
<Label 
  htmlFor="username" 
  required
  helperText="Choose a unique username (3-20 characters)"
>
  Username
</Label>
<input id="username" type="text" />

// Secondary (optional field)
<Label htmlFor="bio" variant="secondary">Bio (Optional)</Label>
<textarea id="bio" />

// Required variant (alternative to required prop)
<Label htmlFor="phone" variant="required">Phone Number</Label>
<input id="phone" type="tel" />
```

## 7. Properties

| Prop | Type | Default | Why exists |
|---|---|---|---|
| `children` | `ReactNode` | required | Label text |
| `htmlFor` | `string` | — | Associates label with input id — a11y requirement (`Label.tsx:48`) |
| `variant` | `'default' \| 'secondary' \| 'required'` | `'default'` | 3-tier emphasis: default (full black) / secondary (70% opacity, font-normal) / required (default + asterisk) (`Label.tsx:45, 61-70`) |
| `required` | `boolean` | `false` | Renders brand-red asterisk. Same effect as `variant="required"`. Both work — pick one. (`Label.tsx:53`) |
| `helperText` | `string` | — | Optional descriptive text below label (`Label.tsx:55, 101-105`) |
| `className` | `string` | `''` | Escape hatch on the wrapping `<div>` |

## 8. States

Static atom — no state. The associated input owns interactive state.

## 9. Variants

1. **`default`** — `text-black font-medium` (`Label.tsx:63`). Standard form label.
2. **`secondary`** — `text-black/70 font-normal` (`Label.tsx:66`). Less emphasis, optional fields.
3. **`required`** — `text-black font-medium` + auto-asterisk (`Label.tsx:69`). Same visual as default + asterisk indicator.

## 10. Sizes

Single fixed size: `var(--text-sm)` (16px) for label, `text-xs` (12.8px) for helper text. (`Label.tsx:92, 102`)

## 11. Tokens used

- `--text-sm` — label font (`Label.tsx:92`)
- `--brand-red` — required asterisk color (`Label.tsx:96`)
- Tailwind utilities for opacity (`text-black/70`, `text-black/60`)
- `mb-1.5`, `mb-2`, `mt-1` — spacing utilities (not tokenized)

## 12. A11y rules

- Renders semantic `<label htmlFor={id}>` ✓ — programmatic association with input
- Required asterisk has `aria-label="required"` ✓ (`Label.tsx:96`)
- `select-none` on label — prevents text selection on rapid form clicks (`Label.tsx:88`)
- Helper text is a `<p>` (not `<small>`) — screen readers announce as paragraph
- **Gap:** Helper text not linked via `aria-describedby` to the input (consumer must add manually). Should be auto-applied if Label took the input as a child or had an `inputId` prop.
- Screen reader announcement: "Email Address, required, edit text" — verified in JSDoc (`Label.tsx:170`)

## 13. Motion rules

Static — no transitions.

## 14. Anti-patterns ❌

- Never use as section header — explicit migration per JSDoc to `<SectionLabel>` from Badge
- Never omit `htmlFor` if associated with an input — a11y fail
- Never use both `variant="required"` AND `required={true}` — redundant
- Never put helper text in placeholder — placeholder disappears on focus, breaks guidance
- Never assume helper text is linked to input — wire `aria-describedby` manually
- Never style asterisk a non-brand-red color — universal "required" cue convention

## 15. REUSABILITY SCORE

**3/5 ⭐⭐⭐** — Critical for forms, but Ken's product surface light on forms (more editorial than transactional). Scope-reduced in v3.0 — lower reach than Badge.

## 16. Linked components

- **Parent:** any `<form>` / `<fieldset>` / form section
- **Sibling atoms:** `<Badge>` / `<SectionLabel>` (former section-label use; explicit migration path), `shadcn/ui Input` / `Textarea` (the inputs Label associates with)
- **Hooks involved:** none

## 17. Reasons + Decisions log

- **v3.0 scope reduction (`Label.tsx:9-17`):** "The 'section' variant has been REMOVED. Section headers now live in Badge.tsx as SectionLabel wrapper. This eliminates the overlap where two components (Label and Badge) served the same purpose." Documented refactor decision. Migration path explicit.
- **Why `<div>` wraps `<label>` (`Label.tsx:84`):** Container for label + helper text + bottom margin. Trade-off: extra DOM node. Alternative: render `<label>` + `<p>` siblings (would need consumer to provide outer container).
- **Why `mb-2` outer + `mb-1.5` inner (`Label.tsx:84, 87`):** Vertical rhythm — label-to-input gap (6px / mb-1.5) is tighter than form-field gap (8px / mb-2). Calibrated.
- **Why brand red asterisk (`Label.tsx:96`):** Universal "required" convention. Brand red leverages the 5% tier for a critical UX cue.
- **Why `aria-label="required"` on asterisk span (`Label.tsx:96`):** Screen reader can't infer asterisk meaning from glyph alone. Explicit label.
- **Why `select-none` on label (`Label.tsx:88`):** Prevent double-click-selecting label text when user is rapidly clicking through form. Subtle UX detail.
- **Why `font-medium` default and `font-normal` secondary (`Label.tsx:63, 66`):** Weight steps reinforce hierarchy. Default = "this matters". Secondary = "this is optional".
- **Why `var(--text-sm)` 16px (`Label.tsx:92`):** Form labels should be readable at body-text size, not micro-text. 16px = baseline body, prevents iOS auto-zoom on focus.
- **Why `required` AND `variant="required"` both work (`Label.tsx:53, 81`):** Backward-compat — older code may use `variant`, newer code uses `required` prop. Both paths supported. Smell: minor API redundancy.
- **Why `text-xs` helper text not `text-sm` (`Label.tsx:102`):** Helper text is secondary information — smaller size visually demotes it relative to label and input.
- **Helper text not wired via `aria-describedby` (gap):** Should auto-link. Currently consumer responsibility. Inconsistent with other a11y-conscious atoms.
