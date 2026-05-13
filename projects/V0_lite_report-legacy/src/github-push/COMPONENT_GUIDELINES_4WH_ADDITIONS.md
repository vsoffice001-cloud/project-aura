<!-- 
  ADDITIONS TO: COMPONENT_GUIDELINES_4WH.md
  Append these sections after the existing "ANIMATION COMPONENTS" section,
  before the "DECISION FLOWCHARTS" section.
-->

---

## 🎨 ICON COLOR SYSTEM

### WHY
Without a classification system, developers make ad-hoc icon color decisions. A TrendingUp icon might be black in one place and purple in another. The icon color system enforces one rule: "Does this icon represent CONTENT or a UI CONTROL?"

### WHAT
Two semantic constants: `iconColors.content` (#806ce0 periwinkle) for content/feature icons, `iconColors.utility` (#737373 gray) for navigation/control icons.

### WHEN
✅ Use for EVERY Lucide icon placement — no exceptions
✅ Use `iconColors.content` for feature icons (Sparkles, TrendingUp, Target)
✅ Use `iconColors.utility` for control icons (ChevronDown, X, Search, Filter)
✅ Use `iconColors.content` for ChevronRight when used as a decorative bullet pointer

### WHEN NOT
❌ Don't use purple (#806ce0) as solid backgrounds, full-opacity text, or borders
❌ Don't use arbitrary icon colors — always reference iconColors
❌ Don't use brand red for icons (reserved for CTAs only)

### HOW
```tsx
import { iconColors } from '@/app/components/iconColors';

// Content icon (feature/data)
<BarChart3 color={iconColors.content} size={20} />

// Utility icon (navigation/control)
<ChevronDown color={iconColors.utility} size={20} />

// Icon container with 10% opacity background
<div style={{ background: 'rgba(128, 108, 224, 0.1)' }}>
  <Target color={iconColors.content} size={24} />
</div>
```

---

## 📐 SECTIONHEADING COMPONENT

### WHY
Section headings need consistent font sizes, font families, line heights, and responsive scaling. Without SectionHeading, every section hand-codes these values differently.

### WHAT
A heading molecule that pairs an optional eyebrow label with a semantically correct heading tag (h1/h2/h3). Enforces Major Third scale and the serif/sans font rule.

### WHEN
✅ Use for every section title on a page
✅ Use `level={1}` for hero headline ONLY (one per page)
✅ Use `level={2}` for major section headings (multiple per page)
✅ Use `level={3}` for subsection headings within a section
✅ Use `eyebrow` prop for category labels above headings

### WHEN NOT
❌ Don't use `level={1}` for anything other than the hero
❌ Don't use for inline text emphasis (use `<strong>`)
❌ Don't use for badge/label text (use Badge or SectionLabel)
❌ Don't use for navigation items

### HOW
```tsx
import { SectionHeading } from '@/app/components/SectionHeading';

// Section heading with eyebrow
<SectionHeading level={2} eyebrow="MARKET INSIGHTS" align="center">
  AI in Healthcare: A $45B Opportunity
</SectionHeading>

// Left-aligned subsection
<SectionHeading level={3} align="left">
  Regional Analysis
</SectionHeading>

// Hero (once per page)
<SectionHeading level={1} eyebrow="GLOBAL AI MARKET 2024">
  The Definitive Healthcare AI Report
</SectionHeading>
```

**Props:**
- `level`: 1 | 2 | 3 (default: 2)
- `children`: heading text
- `eyebrow`: optional small text above heading
- `align`: 'left' | 'center' | 'right' (default: 'center')
- `className`: additional CSS classes

---

## 📦 CARD COMPONENT

### WHY
Content blocks need consistent border-radius, shadow, padding, and hover behavior. Without Card, every content box is hand-coded with inconsistent styling.

### WHAT
A generic content container with built-in variant, padding, shadow, and hover systems. Always uses 10px border-radius (large tier).

### WHEN
✅ Use for grouped information in grids (features, FAQs, metrics)
✅ Use `variant="white"` on warm/colored section backgrounds
✅ Use `variant="warm"` on white section backgrounds
✅ Use `hover` prop for interactive card grids
✅ Use `shadow="sm"` for subtle cards, `shadow="lg"` for featured cards

### WHEN NOT
❌ Don't use for full-width page sections (use SectionWrapper)
❌ Don't use for inline elements (use Badge or SectionLabel)
❌ Don't mix border-radius — Card always uses 10px
❌ Don't exceed 6 cards per row without adjusting the grid

### HOW
```tsx
import { Card } from '@/app/components/Card';

// Standard feature card
<Card variant="white" padding="md" shadow="sm" hover>
  <h3 className="text-base font-semibold mb-3">Feature Title</h3>
  <p className="text-sm text-black/70">Description...</p>
</Card>

// Warm background card (for white sections)
<Card variant="warm" padding="lg" shadow="none">
  <p className="text-sm">Testimonial text...</p>
</Card>

// Outlined card
<Card variant="outlined" padding="sm">
  <p className="text-sm">Compact content</p>
</Card>
```

**Props:**
- `variant`: 'white' | 'warm' | 'outlined' (default: 'white')
- `padding`: 'sm' (16px) | 'md' (24px) | 'lg' (32px) (default: 'md')
- `shadow`: 'none' | 'sm' | 'md' | 'lg' (default: 'md')
- `hover`: boolean (default: false)
- `className`: additional CSS classes

---

## 📐 SECTIONWRAPPER COMPONENT

### WHY
Page sections need consistent background alternation, vertical rhythm, horizontal gutters, and max-width constraints. Without SectionWrapper, every section has different padding, widths, and spacing.

### WHAT
A layout wrapper that wraps content in a `<section>` with background color, vertical padding, horizontal padding, and max-width. Defines the repeating page skeleton.

### WHEN
✅ Use for EVERY top-level section on a page
✅ Alternate backgrounds: white → warm → white → warm → black (CTA)
✅ Use `spacing="lg"` for most sections (default)
✅ Use `maxWidth="content"` (1000px) for pure reading sections
✅ Use `maxWidth="wide"` (1200px) for sections with grids/sidebars (default)
✅ Use `id` prop for anchor link navigation

### WHEN NOT
❌ Don't use for inner card containers (use Card)
❌ Don't use for inline content blocks
❌ Don't use for fixed/sticky elements (they have their own positioning)
❌ Don't skip background alternation (breaks visual rhythm)

### HOW
```tsx
import { SectionWrapper } from '@/app/components/SectionWrapper';
import { SectionHeading } from '@/app/components/SectionHeading';

// Standard section
<SectionWrapper background="warm" spacing="lg" id="highlights">
  <SectionHeading level={2} eyebrow="KEY FINDINGS">
    Report Highlights
  </SectionHeading>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Cards */}
  </div>
</SectionWrapper>

// Edge-to-edge section (sidebar layout)
<SectionWrapper className="!py-0" background="white">
  <div className="flex">
    <aside className="border-r py-10">sidebar</aside>
    <main className="py-10 px-6">content</main>
  </div>
</SectionWrapper>
```

**Props:**
- `background`: 'white' | 'warm' | 'black' | 'periwinkle' | 'coral' (default: 'white')
- `spacing`: 'sm' | 'md' | 'lg' | 'xl' (default: 'lg')
- `maxWidth`: 'content' (1000px) | 'wide' (1200px) | 'full' (default: 'wide')
- `className`: additional CSS classes on the `<section>`
- `id`: HTML id for anchor linking

---

## ⬆️ SCROLLTOTOP COMPONENT

### WHY
Long-form content pages can exceed 10,000px. Without a scroll-to-top button, users must manually scroll back, creating friction and increasing bounce rate.

### WHAT
A circular floating action button fixed to the bottom-right. Appears after 400px of scroll, uses Motion for enter/exit animations.

### WHEN
✅ Use on any page where content exceeds ~2 viewport heights
✅ Use on report landing pages, case studies, long documentation
✅ Place once at the page layout level (self-positions via CSS fixed)

### WHEN NOT
❌ Don't use on short pages that don't scroll
❌ Don't use on pages with sticky sidebar navigation
❌ Don't change the color — black is correct (92% utility tier)

### HOW
```tsx
import { ScrollToTop } from '@/app/components/ScrollToTop';

export default function App() {
  return (
    <>
      <main>...</main>
      <ScrollToTop />
    </>
  );
}
```

No props required.

---

## 📊 SCROLLPROGRESS COMPONENT (Generic)

### WHY
Long-form content users need a visual signal of scroll depth. The progress bar subtly encourages continued scrolling toward conversion CTAs at the page bottom.

### WHAT
A 3px bar fixed to the top of the viewport. Fills left-to-right based on total document scroll. Uses brand red.

**Note:** `ReadingProgressBar.tsx` is the case-study-specific version (uses `useSectionProgress` + `useHeroVisibility`). `ScrollProgress.tsx` is the generic version for any page.

### WHEN
✅ Use on report landing pages, case studies, long documentation
✅ Use when you want generic scroll-based progress (not section-specific)
✅ Place once before any other content (self-positions via CSS fixed)

### WHEN NOT
❌ Don't use on short pages
❌ Don't use on dashboards with fixed-height panels
❌ Don't use alongside ReadingProgressBar (pick one)

### HOW
```tsx
import { ScrollProgress } from '@/app/components/ScrollProgress';

export default function App() {
  return (
    <>
      <ScrollProgress />
      <header>...</header>
      <main>...</main>
    </>
  );
}
```

No props required.

---

<!-- 
  Also add to the DECISION FLOWCHARTS section:
-->

### "Which Layout Component Should I Use?"

```
Am I wrapping a full page section?
├─ YES → Use <SectionWrapper>
└─ NO ↓

Am I wrapping content in a bounded box?
├─ YES → Use <Card>
└─ NO ↓

Am I creating a section title?
├─ YES → Use <SectionHeading>
└─ NO → Use plain HTML elements
```

### "Which Scroll Component Should I Use?"

```
Do I need a scroll-to-top button?
├─ YES → Use <ScrollToTop>
└─ NO ↓

Do I need a generic scroll progress bar?
├─ YES → Use <ScrollProgress>
└─ NO ↓

Do I need section-specific reading progress?
├─ YES → Use <ReadingProgressBar>
└─ NO → Neither needed
```
