# Recipe — DS Documentation Page

**Pillar:** foundations  
**Variant:** editorial-light (default for DS-core dashboard and DS-dashboard)  
**Voice:** [voice/foundations.md](../voice/foundations.md)  
**Motion:** [motion/MOTION_SPEC.md](../motion/MOTION_SPEC.md)  
**Anti-patterns:** Categories 1, 2, 3, 4, 5, 7, 12 from [ANTI_PATTERNS.md](../ANTI_PATTERNS.md)

---

## Intent

Provide a structured documentation page for a single design system component, token group, or pattern within DS-core or DS-dashboard. Reader is a designer, engineer, or AI agent building with the design system. Page must be task-oriented: quickly answer "what is this", "when to use it", and "how to implement it" without prose narrative.

---

## When to use this recipe

- Component documentation pages within DS-core dashboard
- Token documentation pages (color, typography, spacing, motion)
- Pattern documentation (section assembly, card composition, filter system)
- 4W+H reference pages for individual components

## When NOT to use

- Customer-facing product pages of any pillar (use the relevant pillar recipe)
- AI-context modules (`ai-context/CORE.md`, etc.) — those are plain markdown, not page recipes
- Error pages or empty states (inherit the relevant pillar voice)

---

## Section sequence

| # | Component | Purpose | Background | Spacing | Motion |
|---|---|---|---|---|---|
| 1 | `DesignSystemSidebar` (left rail) | Component/section navigation for the DS dashboard | white | — | static — CSS position sticky |
| 2 | `SectionHeading` | Component name + category eyebrow | white | lg | static |
| 3 | `CodeBlockWithCopy` | Import path, basic usage example, prop type signature | white | md | static |
| 4 | Component Preview (live render) | `SubtleVariantSwitcher` + rendered component at all key variants | warm-300 | lg | static — variant switch is CSS, no motion |
| 5 | 4W+H Tables | WHY / WHAT / WHEN / WHEN NOT / HOW — markdown tables, not prose | white | xl | static |
| 6 | `CodeBlockWithCopy` (additional) | Extended examples: all variants, edge cases, do/don't side-by-side | white | lg | static |
| 7 | `CollapsibleSection` blocks | Anti-patterns, migration notes, related components — collapsed by default | warm-300 | md | CSS expand/collapse `--duration-base` |

**Layout:** Two-column. `DesignSystemSidebar` (~240px, sticky) on left. Main content area (flex-1) on right. No `SectionWrapper` wrapping the entire two-column layout — the DS dashboard handles its own shell.

**No scroll animations.** Documentation pages are reference surfaces — entrance animations add latency without value. All content is static. The `CollapsibleSection` toggle uses CSS `--duration-base` only.

---

## Voice highlights

- `SectionHeading` title: Exact component name in PascalCase. Example: *"`ReportCard`"* / *"`SectionHeading`"*.
- Eyebrow label: Component category. *"MOLECULE"* / *"ORGANISM"* / *"ATOM — LAYOUT"*.
- 4W+H section headers: Use exact labels — *"WHY"* / *"WHAT"* / *"WHEN"* / *"WHEN NOT"* / *"HOW"*.
- Rule statements in HOW: Imperative. *"Use `variant="brand"` for conversion CTAs only."* — never *"We recommend using..."*.
- Never use marketing language. *"powerful"*, *"elegant"*, *"amazing"* — forbidden. See `ANTI_PATTERNS.md` Category 7, rule 12.
- Anti-patterns format: Exact `[BUILT]` / `[DEPRECATED]` / `[PENDING]` status tags in tables.

---

## Motion highlights

- No entrance animations on documentation pages.
- `SubtleVariantSwitcher`: CSS-only transition between variants. `--duration-base` (300ms) on opacity. No GSAP, no Framer.
- `CollapsibleSection`: CSS expand/collapse on height. `--duration-base` (300ms). `--ease-out`.
- Reduced-motion contract: CSS animations already honored by DS `theme.css` global rule. No additional implementation needed.

---

## Mock data shape

```ts
// Documentation pages reference live components — no mock data required.
// If a component requires props to render, use minimal realistic values:

export const DOC_PAGE_PROPS_EXAMPLE: {
  componentName: string;
  category: "atom" | "molecule" | "organism" | "template";
  importPath: string;
  status: "built" | "deprecated" | "pending";
  version: string;
} = {
  componentName: "ReportCard",
  category: "molecule",
  importPath: "@/app/components/molecules/ReportCard",
  status: "built",
  version: "4.0",
};

// For live preview, pass representative realistic props — not lorem ipsum:
export const PREVIEW_REPORT_CARD_PROPS = {
  id: "preview-001",
  title: "India Pharmaceutical Market Outlook 2026",
  industry: "Healthcare",
  pages: 180,
  publishedDate: "Q1 2026",
  region: "India",
  slug: "india-pharma-outlook-2026",
  layout: "grid" as const,
};
```

---

## Component composition (skeleton)

```tsx
{/* DS Dashboard shell handles overall layout — this is the main content column only */}
<main className="flex-1 overflow-y-auto">
  <Container variant="content">

    {/* Section 1: Heading */}
    <SectionHeading
      label="MOLECULE"
      title="`ReportCard`"
      subtitle="Grid and list layout card for report listings. Canonical card for all report display contexts."
    />

    {/* Section 2: Import + basic usage */}
    <CodeBlockWithCopy
      language="tsx"
      label="Import"
      code={`import { ReportCard } from "@/app/components/molecules/ReportCard";`}
    />
    <CodeBlockWithCopy
      language="tsx"
      label="Basic usage"
      code={`<ReportCard\n  id="r001"\n  title="India Pharmaceutical Market Outlook 2026"\n  industry="Healthcare"\n  pages={180}\n  publishedDate="Q1 2026"\n  region="India"\n  slug="india-pharma-2026"\n  layout="grid"\n/>`}
    />

    {/* Section 3: Live component preview */}
    <SectionWrapper background="warm-300" spacing="lg">
      <SubtleVariantSwitcher variants={["grid", "list"]}>
        {(activeVariant) => (
          <ReportCard {...PREVIEW_REPORT_CARD_PROPS} layout={activeVariant} />
        )}
      </SubtleVariantSwitcher>
    </SectionWrapper>

    {/* Section 4: 4W+H tables — rendered from markdown or structured data */}
    <section aria-label="4W+H reference">
      <h2>WHY</h2>
      {/* prose or table */}
      <h2>WHAT</h2>
      {/* prop table */}
      <h2>WHEN</h2>
      {/* use-case table */}
      <h2>WHEN NOT</h2>
      {/* anti-use-case table */}
      <h2>HOW</h2>
      <CodeBlockWithCopy language="tsx" label="Grid mode" code="..." />
      <CodeBlockWithCopy language="tsx" label="List mode" code="..." />
    </section>

    {/* Section 5: Collapsible supplements */}
    <SectionWrapper background="warm-300" spacing="md">
      <CollapsibleSection title="Anti-patterns">
        {/* anti-pattern table for this component */}
      </CollapsibleSection>
      <CollapsibleSection title="Migration from deprecated components">
        {/* ReportGridCard → ReportCard migration note */}
      </CollapsibleSection>
      <CollapsibleSection title="Related components">
        {/* links to SkeletonCard, EmptyState, CardReveal */}
      </CollapsibleSection>
    </SectionWrapper>

  </Container>
</main>
```

**`DesignSystemSidebar`** is rendered by the DS Dashboard shell — not composed here. This recipe covers only the main content column.

---

## A11y gates

- WCAG AA contrast — all body text, table text, code block text on editorial-light and warm-300 backgrounds
- Keyboard nav fully traversable — `CollapsibleSection` trigger keyboard-operable, `SubtleVariantSwitcher` keyboard-accessible
- ARIA landmarks — `<main>`, `aria-label` on 4W+H section
- `prefers-reduced-motion` respected — CSS expand/collapse animations already disabled by DS global rule
- 44px touch targets — `CollapsibleSection` expand trigger
- Focus rings visible on all interactive elements
- Code blocks: `<pre><code>` semantics, not `<div>` wrapping

## Perf gates

- LCP < 2.5s — documentation pages are lightweight, no image-heavy sections
- INP < 200ms — `CollapsibleSection` expand must not reflow page scroll position
- CLS < 0.1 — `CollapsibleSection` expand must not shift content below it abruptly; use `height` transition, not `display` toggle
- No GSAP loaded on documentation pages — unnecessary weight
- `CodeBlockWithCopy` syntax highlighting: lazy-load Prism or similar if not already in DS bundle

## Visual baseline

- Desktop 1440×900 screenshot — verify two-column layout, sidebar visible, 4W+H tables readable
- Tablet 768×1024 screenshot — sidebar may collapse to icon-only or drawer
- Mobile 390×844 screenshot — single column, sidebar accessible via drawer
- Compare against baseline on regression
