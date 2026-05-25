# CodeBlockWithCopy · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/CodeBlockWithCopy.tsx` (103 lines)

Exported as both `CodeBlock` (primary) and `CodeBlockWithCopy` (alias). (`CodeBlockWithCopy.tsx:102`)

---

## 1. WHAT

Read-only code display with header (language label or custom title), one-click copy-to-clipboard button (success state "Copied!" for 2s), optional collapsible body, and optional line numbers. Mono-font, black/5 bg, rounded 5px. Docs-surface utility.

## 2. WHY

OG JSDoc (`CodeBlockWithCopy.tsx:1-5`): "Displays code with syntax highlighting and copy-to-clipboard functionality"

- Docs pages need a consistent "code sample" affordance — without this, every doc page reinvents copy-button UX
- Copy success state ("Check + Copied!" for 2s) provides confirmation — critical UX for clipboard ops where there's no visible system feedback
- Collapsible variant for long snippets keeps the page scannable
- Note: "syntax highlighting" mentioned in JSDoc but NOT implemented — just `font-mono` text. **Honest gap.**

## 3. WHEN to use ✅

- Documentation page code samples
- Pattern catalog "how to implement" sections
- Resource cards linking to code repos
- Onboarding docs with copy-paste setup commands
- API reference snippets

## 4. WHEN NOT to use ❌

- Production app UI (this is for docs/catalogs)
- Editable code editor → use Monaco or CodeMirror
- Inline `<code>` within a paragraph → use plain `<code>` with token styling
- Terminal output / log dump → use plain `<pre>` (no copy semantics needed for transient data)
- True syntax-highlighted snippets — needs an actual highlighter (Prism, Shiki, etc.)

## 5. WHERE used

- `NavigationDocumentation.tsx:369, 537`
- `ResourcesContent.tsx:198, 307, 321, 333`
- All inside docs surfaces

## 6. HOW to implement

```tsx
// Basic
<CodeBlock code={`<Button>Click me</Button>`} language="tsx" />

// With line numbers
<CodeBlock
  code={`function example() {\n  return true;\n}`}
  language="typescript"
  showLineNumbers
/>

// Collapsible (start collapsed)
<CodeBlock
  code={veryLongCode}
  language="tsx"
  collapsible
  defaultCollapsed
  title="Full example"
/>

// Custom title (overrides language label)
<CodeBlock
  code="npm install motion"
  language="javascript"
  title="Install"
/>
```

## 7. Properties

| Prop | Type | Default | Why exists |
|---|---|---|---|
| `code` | `string` | required | Source string — preserves newlines via `\n` (`CodeBlockWithCopy.tsx:11`) |
| `language` | `'tsx' \| 'css' \| 'typescript' \| 'javascript'` | `'tsx'` | Displayed in header; would drive syntax highlighter if implemented. (`CodeBlockWithCopy.tsx:12`) |
| `showLineNumbers` | `boolean` | `false` | Renders code as `<table>` w/ line-number column (`CodeBlockWithCopy.tsx:13, 78-90`) |
| `collapsible` | `boolean` | `false` | Adds ▼/▶ toggle button (`CodeBlockWithCopy.tsx:14, 43-50`) |
| `defaultCollapsed` | `boolean` | `false` | Initial state when collapsible |
| `title` | `string` | — | Overrides language label in header (`CodeBlockWithCopy.tsx:53`) |

## 8. States

- **Default:** Expanded, "Copy" button shows `Copy` icon + text
- **After copy click:** 2s window showing `Check` icon + "Copied!" — `setTimeout(() => setCopied(false), 2000)` (`CodeBlockWithCopy.tsx:31-34`)
- **Collapsed (only if `collapsible`):** `<pre>` block hidden; chevron ▶ shown (`CodeBlockWithCopy.tsx:74`)
- **Expanded:** chevron ▼ shown

## 9. Variants

No formal variant prop. Visual variation via `showLineNumbers` + `collapsible` toggles.

## 10. Sizes

Single fixed style. Header text `text-xs`, code `text-xs`.

## 11. Tokens used

- None — fully Tailwind utility-driven: `bg-black/5`, `text-black/80`, `border-black/10`, etc.
- `rounded-[5px]` — matches DS `--radius-element` (5px) but hard-coded, not via var
- `font-mono` — Tailwind default (Menlo / Monaco / Consolas / etc.)

## 12. A11y rules

- Copy button is a real `<button>` — keyboard reachable
- **Gap:** Copy button has no `aria-label` (label is by text content "Copy" / "Copied!")
- **Gap:** `aria-live="polite"` on the Copy button text would announce the state change to AT
- **Gap:** No `role="region"` on outer container
- Collapsible toggle is a `<button>` but uses text triangles ▼/▶ — needs `aria-expanded` + `aria-controls`
- `<table>` for line numbers — semantically odd; line numbers aren't tabular data. Could be a `<ol>` for AT clarity.

## 13. Motion rules

- `transition-all` on copy button hover bg (`CodeBlockWithCopy.tsx:57`)
- No animations on collapse/expand — instant (a smooth height-transition would be better; gap)
- Reduced-motion: not respected

## 14. Anti-patterns ❌

- Never use for editable code — read-only by design
- Never use for sensitive data (the clipboard.writeText() exposes content)
- Never assume syntax highlighting — implementation is plain mono (gap)
- Never wrap inside another collapsible — chevron conflicts
- Never use as inline element — block-level only
- Never set `language` to a value not in the union — will fall through with no error but unsupported

## 15. REUSABILITY SCORE

**3/5 ⭐⭐⭐** — Specialized for docs context. Useful within that scope, but never appears in production app surfaces.

## 16. Linked components

- **Parent:** `NavigationDocumentation`, `ResourcesContent`, any `*Documentation.tsx` page
- **Sibling atoms:** none — unique role
- **Hooks involved:** none — internal `useState` + `navigator.clipboard`

## 17. Reasons + Decisions log

- **Why two exports `CodeBlock` AND `CodeBlockWithCopy` (`CodeBlockWithCopy.tsx:102`):** Backward-compat alias. Filename uses long form for discoverability; primary use of short form. Smell — single canonical export better.
- **Why 2s timeout for "Copied!" feedback (`CodeBlockWithCopy.tsx:33`):** Industry-standard duration (GitHub, MDN, Stack Overflow all use ~1.5-2s). Long enough to read, short enough to not block re-copy.
- **Why `<table>` for line numbers not `<ol>` (`CodeBlockWithCopy.tsx:79-90`):** Convenience for aligned columns — but ARIA-wise an `<ol>` would be more semantic. Trade-off chosen for layout simplicity.
- **Why `text-xs` not `text-sm` (`CodeBlockWithCopy.tsx:51, 77`):** Code densities benefit from smaller, monospace text — fits more on screen, established convention in docs.
- **Why `bg-black/5` not `bg-warm-50` (`CodeBlockWithCopy.tsx:39`):** Cool-tone-neutral for code (separates from editorial-warm body content). Subtle differentiation.
- **Why `language` UNION with only 4 options (`CodeBlockWithCopy.tsx:12`):** Limits to languages actually used in Ken's docs. Open to extension but explicit floor for now.
- **JSDoc mentions "syntax highlighting" but not implemented (`CodeBlockWithCopy.tsx:4`):** Aspirational. Smell — JSDoc misleading. Either remove the claim or add Prism/Shiki.
- **Why `▼` / `▶` text triangles for collapse (`CodeBlockWithCopy.tsx:47`):** Lightweight — no Lucide icon dependency for this one micro-affordance. Gap: should use Lucide `<ChevronDown>`/`<ChevronRight>` for visual consistency with rest of DS.
- **Why no syntax highlighting yet (gap):** Adding Prism/Shiki adds ~50KB. Decision: defer to v2.
