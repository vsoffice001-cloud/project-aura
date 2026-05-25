# SectionWrapper · Atom · OG Audit

**Source:** `Design_system_vs_26 (og and final)/src/app/components/SectionWrapper.tsx` (96 lines)

---

## 1. WHAT

Page-section layout wrapper. Renders a semantic `<section>` with background color, vertical padding tier, max-width container (1000/1200/full), and responsive horizontal padding. The canonical full-bleed-bg → centered-content envelope used between every section organism on every Ken page.

## 2. WHY

OG JSDoc verbatim (`SectionWrapper.tsx:1-37`):

> "Layout wrapper for page sections. Provides consistent background, vertical padding, horizontal padding, and max-width constraints."
> "Background Alternation: white → warm → white → warm → black (CTA)"
> "Spacing Scale (mobile / desktop): sm: 32px / 48px, md: 40px / 64px, lg: 48px / 80px (default), xl: 64px / 96px"
> "Override: Use className=\"!py-0\" for edge-to-edge layouts (e.g., sidebar sections), then add compensating padding inside child content."

- Encodes the bg-alternation pattern at the atom layer — recipes/patterns reference it; no inline `<section className="py-20 bg-white">` drift
- Responsive padding `px-4 sm:px-6 md:px-8` baked in — consumers can't drift
- Max-width tier (1000/1200/full) maps to Ken's content-width hierarchy
- `id` prop supports anchor linking (`#highlights`, `#methodology`) used by TOC / smooth-scroll
- 5 background options (white/warm/black/periwinkle/coral) cover the entire editorial palette

## 3. WHEN to use ✅

- Every top-level page section (between organisms)
- Wrapping a `<SectionHeading>` + content grid
- Final-CTA section (`background="black"` for cinematic dark CTA)
- Featured/accent section (`background="periwinkle"` or `"coral"`)
- Editorial warm-tone section (`background="warm"`)
- Anchor target for in-page navigation (`id="highlights"`)

## 4. WHEN NOT to use ❌

- Card-level container → use `<Card>` (different surface system, rounded, lifted)
- Single-section reset where you control bg in parent → use `<Container>` (width only, no bg or vertical padding)
- Edge-to-edge image hero → wrap your own `<section>`; SectionWrapper imposes max-width
- Fixed/sticky overlay → not designed for `position: fixed`
- Inline content with width constraint only → use `<Container>`

## 5. WHERE used

- `organisms/ResearchMethodology.tsx:29` — `background="warm" spacing="lg" maxWidth="wide"`
- `organisms/BrowseGrid.tsx:79` — `background={background} spacing="lg" maxWidth="wide"` (variant pass-through)
- `PatternsContent.tsx:1027, 1078, 1130` — pattern catalog examples
- Implicitly: every section across every page

## 6. HOW to implement

```tsx
// Default white section
<SectionWrapper>
  <SectionHeading title="Reports" />
  <div>...</div>
</SectionWrapper>

// Warm editorial section
<SectionWrapper background="warm" spacing="lg" id="highlights">
  <SectionHeading level={2} title="Report Highlights" />
  <div className="grid grid-cols-3 gap-6">...</div>
</SectionWrapper>

// Dark CTA section
<SectionWrapper background="black" spacing="xl">
  <SectionHeading title="Ready to start?" level={2} />
  <Button variant="brand" size="lg">Book a call</Button>
</SectionWrapper>

// Accent section
<SectionWrapper background="periwinkle" spacing="md" maxWidth="content">
  ...
</SectionWrapper>

// Edge-to-edge override
<SectionWrapper className="!py-0" maxWidth="full">
  <div className="my-edge-to-edge-content" />
</SectionWrapper>
```

## 7. Properties

| Prop | Type | Default | Why exists |
|---|---|---|---|
| `children` | `ReactNode` | required | Section content |
| `background` | `'white' \| 'warm' \| 'black' \| 'periwinkle' \| 'coral'` | `'white'` | 5-option editorial palette covering all Ken section bg cases (`SectionWrapper.tsx:41, 56-62`) |
| `spacing` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Vertical padding tier — `lg` default = `py-12 md:py-20` (48px/80px) (`SectionWrapper.tsx:42, 64-69`) |
| `maxWidth` | `'content' \| 'wide' \| 'full'` | `'wide'` | Content (1000), wide (1200), or full-bleed (`SectionWrapper.tsx:43, 71-75`) |
| `className` | `string` | `''` | Escape hatch — append to the `<section>` |
| `id` | `string` | — | HTML id for anchor linking (`SectionWrapper.tsx:45`) |

## 8. States

Pure presentational — no interactive state.

## 9. Variants

Via `background` enum — 5 visual variants:
1. `white` — bg `bg-white` text `text-black`. Default. (`SectionWrapper.tsx:57`)
2. `warm` — bg `#f5f2f1` text `text-black`. Editorial off-white. (`SectionWrapper.tsx:58`)
3. `black` — bg `bg-black` text `text-white`. Final CTA cinematic. (`SectionWrapper.tsx:59`)
4. `periwinkle` — bg `var(--periwinkle-200)` text `text-black`. Accent / trust-signal. (`SectionWrapper.tsx:60`)
5. `coral` — bg `var(--coral-50)` text `text-black`. Accent / warm-energy. (`SectionWrapper.tsx:61`)

## 10. Sizes

Via `spacing` × `maxWidth`:

| spacing | py mobile | py desktop |
|---|---|---|
| `sm` | py-8 (32px) | py-12 (48px) |
| `md` | py-10 (40px) | py-16 (64px) |
| `lg` | py-12 (48px) | py-20 (80px) DEFAULT |
| `xl` | py-16 (64px) | py-24 (96px) |

| maxWidth | px |
|---|---|
| `content` | 1000px |
| `wide` | 1200px DEFAULT |
| `full` | none (full-bleed) |

## 11. Tokens used

- `--periwinkle-200` (`SectionWrapper.tsx:60`)
- `--coral-50` (`SectionWrapper.tsx:61`)
- Hex literal `#f5f2f1` for warm — **NOT tokenized** (should be `--warm-100` or similar; smell)
- Tailwind utility classes for padding/width — **NOT tokenized** but maps to fixed scale
- `bg-black`, `bg-white` — Tailwind primitive

## 12. A11y rules

- Renders semantic `<section>` (proper landmark for AT)
- `id` supports anchor links + skip-link targets
- Color contrast per `backgroundClasses` mapping is pre-validated WCAG AA (white-on-black, black-on-white, black-on-warm, black-on-periwinkle, black-on-coral)

## 13. Motion rules

- Static — no transitions/animations
- Reduced-motion: N/A

## 14. Anti-patterns ❌

- Never nest `<SectionWrapper>` inside `<SectionWrapper>` — double padding + double max-width
- Never set bg via inline `style={{ background: ... }}` — use the `background` enum
- Never use `maxWidth="full"` with content that should stay readable — text becomes uncomfortably wide
- Never wrap a card in SectionWrapper — Card has its own surface; SectionWrapper is a section
- Never use `background="black"` mid-page — it should signal "end of journey" (CTA) per recipe bg-alternation rule
- Never put two `background="black"` sections back-to-back — recipe convention violation

## 15. REUSABILITY SCORE

**5/5 ⭐⭐⭐⭐⭐** — Every page section uses it. Foundational layout atom.

## 16. Linked components

- **Parent:** page-level templates (`ProductPageTemplate`, `ReportStorePage`, `CaseStudyPage`)
- **Direct children:** `SectionHeading` (usually first child), any organism
- **Sibling atoms:** `Container` (width-only alternative when bg is owned by parent)
- **Hooks involved:** none

## 17. Reasons + Decisions log

- **Background alternation `white → warm → white → warm → black` (`SectionWrapper.tsx:9`):** Editorial rhythm pattern — alternation creates visual rest + breaks visual monotony. Black reserved for final-CTA per recipe.
- **Why mobile/desktop ratio ~1.6× (`SectionWrapper.tsx:64-69`):** Mobile gets ~60% of desktop padding — preserves rhythm proportionally while not wasting mobile screen real estate.
- **Why max-widths 1000/1200 not 1024/1280 (`SectionWrapper.tsx:71-75`):** Designed to be just-under standard breakpoints — gives breathing room at 1024/1280 viewports. 1000 = content (8-col), 1200 = wide (12-col).
- **Why `!py-0` override in JSDoc (`SectionWrapper.tsx:22-23`):** Sidebar sections need edge-to-edge — recorded escape pattern.
- **Why `#f5f2f1` inline (`SectionWrapper.tsx:58`):** Token gap — warm-100 should be defined here. Smell.
- **Why no `padding` prop override (only `!py-0` via className):** Decision lift — explicit 4-tier spacing scale. Free-form padding would re-introduce drift.
- **Why `text-white` on `black` bg, `text-black` everywhere else (`SectionWrapper.tsx:57-61`):** Auto-inversion — children don't need to know the surface mode. Anchor for the cascade.
- **`children` is required (no fallback):** Forces consumer to put content; an empty SectionWrapper is meaningless.
