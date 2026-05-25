# Polish Sprint 4 · v0.4 PDP · 2026-05-22 (night)

> **Owner:** Aura
> **Trigger:** User reset on tabs · table sweep · sample-report restoration
> **Authority:** report-store-legacy canonical patterns (binding · single source of truth)

---

## A · 3 misses to fix

### A1 · Tabs · WRONG PATTERN both sprints

Sprint 2 = underline brand-red. Sprint 3 = underline ink-strong. **BOTH WRONG.**

Report-store canonical = **pill-style 2-tier:**

**Tier 1 (primary tabs · main content nav):** report-store IndustryReportSection lines 71-101
- Rounded (radius-element 5px) · border 1px warm-500 inactive · border black active
- Active bg: black · text: white · border: black
- Inactive bg: transparent · text: ink-strong · border: warm-500 · hover: border darkens
- Padding: ~px-4 py-2.5 · min-h ~40px
- Font: 14px DM Sans 500 · count `(N)` inline 60% opacity smaller (text-xs)
- Scrollable horizontal w/ fade-edge on overflow

**Tier 2 (sub-pills · filter chips):** lines 108-143
- Same rounded · same active state
- Smaller: px-2.5 py-1.5 · 11px DM Sans · count inline

**Tier 3 (variant switcher · "Metrics/Compact" group):** lines 149-180
- Tinted bg group container · radius outer + inner segments
- Active = white bg + shadow · inactive = text-faded
- For data-variant toggles (e.g. ExtendedTOC 2-phase/3-phase) — ALREADY USED CORRECTLY in §20

### A2 · Tables · not full sweep

Sprint 3 §C plan defined 5 variants · only migrated §08 modal table. Other tables (EndUser 2 tables · MarketSize main table · PropertyTable · OpportunityRankingTable · any raw `<table>`) not all swept. PropertyTable + OpportunityRankingTable have CUSTOM chrome but should align border tokens / fonts to TableShell visual rhythm.

### A3 · §22 Sample Report Preview dropped

User said earlier: "report preview section (same as v0-lite section · difference is just we change the language)". I DROPPED §22 entirely Sprint 2 thinking it was over-port chrome. Wrong — user wants the v0-lite sample report VIEWER (sidebar + 4 chapter mocks + mobile TOC) RESTORED at §22 · just w/ updated language and content for Australia Cold Chain. The "drop" was an over-correction.

---

## B · Plan

### S1 · Build canonical TabsPills atom (Tier 1 + Tier 2)

`src/components/atoms/TabsPills.tsx`:

```tsx
'use client';

import { useState, type ReactNode } from 'react';

export interface TabItem {
  value: string;
  label: string;
  count?: number | string;
}

export interface TabsPillsProps {
  items: TabItem[];
  value: string;
  onValueChange: (v: string) => void;
  /** 'primary' (Tier 1 · main tabs · ~14px) | 'subtle' (Tier 2 · sub-pills · ~11px) */
  size?: 'primary' | 'subtle';
  className?: string;
  ariaLabel?: string;
}

const SIZE_MAP = {
  primary: {
    padding: 'px-4 py-2.5',
    minHeight: 'min-h-[40px]',
    fontSize: '13.5px',
    fontWeight: 500,
    countSize: '11.5px',
    gap: 'gap-2',
  },
  subtle: {
    padding: 'px-2.5 py-1.5',
    minHeight: 'min-h-[30px]',
    fontSize: '11.5px',
    fontWeight: 500,
    countSize: '10.5px',
    gap: 'gap-1.5',
  },
};

export function TabsPills({ items, value, onValueChange, size = 'primary', className, ariaLabel }: TabsPillsProps) {
  const s = SIZE_MAP[size];

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={['flex flex-wrap items-center', s.gap, className ?? ''].join(' ')}
    >
      {items.map((item) => {
        const active = value === item.value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onValueChange(item.value)}
            className={[
              s.padding,
              s.minHeight,
              'rounded-[var(--radius-element,5px)] border transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5',
              active
                ? 'bg-black text-white border-black'
                : 'bg-transparent text-[var(--semantic-ink-strong)] border-[var(--warm-500,#e8e4e0)] hover:border-[rgba(0,0,0,0.3)]',
            ].join(' ')}
            style={{
              fontSize: s.fontSize,
              fontWeight: s.fontWeight,
              fontFamily: 'var(--font-body), DM Sans, sans-serif',
            }}
          >
            <span>{item.label}</span>
            {item.count !== undefined && (
              <span
                style={{
                  fontSize: s.countSize,
                  opacity: active ? 0.7 : 0.55,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                ({item.count})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
```

### S2 · Convert ALL section Radix Tabs → TabsPills

Replace Radix `Tabs/TabsList/TabsTrigger/TabsContent` w/ TabsPills + manual content switch via state · OR wrap Radix Tabs but restyle TabsTrigger to pill chrome.

**Decision:** wrap Radix Tabs (a11y · keyboard nav built-in) · restyle TabsTrigger to use pill chrome via className.

Canonical TabsTrigger className across PDP:
```
inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[40px] rounded-[5px] border transition-all whitespace-nowrap cursor-pointer
text-[13.5px] font-medium
bg-transparent text-[var(--semantic-ink-strong)] border-[var(--warm-500,#e8e4e0)] hover:border-[rgba(0,0,0,0.3)]
data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-black
```

TabsList className:
```
flex flex-wrap gap-2 mb-6
```

NO underline · NO border-bottom. Full pill.

Touch sections:
- EcosystemSection
- IndustryAnalysisSection
- MethodologySection
- SubmarketsSection
- SegmentationSection
- EndUserSection
- MarketOverviewGenesisSection
- RegulatoryLandscapeSection
- MacroeconomicSection

### S3 · Restore §22 Sample Report Preview

Re-create the v0-lite sample-report viewer:
- Sidebar TOC (3-state: open/compressed/minimal) · already deleted Sprint 2 · RECREATE
- 4 chapter mocks (Executive Summary · Market Overview · Extended TOC · Methodology) · already deleted · RECREATE
- Mobile TOC bottom-sheet · RECREATE

**BUT** per user constraint: "difference is just we change the language" → use Australia Cold Chain content (already done · was in deleted files). User wants the SAME visual as v0-lite · only content swap.

Restore from v0-lite source path:
`projects/V0_lite_report-legacy/src/app/components/SampleReportPreview.tsx`
`projects/V0_lite_report-legacy/src/app/components/sample-report/SidebarTOC.tsx`
`projects/V0_lite_report-legacy/src/app/components/sample-report/ChapterExecutiveSummary.tsx`
`projects/V0_lite_report-legacy/src/app/components/sample-report/ChapterMarketOverview.tsx`
`projects/V0_lite_report-legacy/src/app/components/sample-report/ChapterMethodology.tsx`
`projects/V0_lite_report-legacy/src/app/components/mobile/MobileTOC.tsx`

Port w/ Australia Cold Chain content (sample copy I had in earlier sprints).

Place §22 in PDP_SECTIONS array between §21 FAQ and §22-Related (renumber: Sample → §22 · Related → §23 · CTA → §24 · back to 24 sections).

**Layout:** §22 Sample Preview should be FULL-WIDTH below body container (escape SideTOCV04 chrome · like Related + CTA do · per Sprint 2 A10 decision). So:
```
<main>
  <Hero />
  <2-col body>§01-§21</2-col body>
  <SampleReportPreviewSection />  // full-width · §22
  <RelatedReportsSection />        // full-width · §23
  <GetFullAccessSection />          // full-width · §24
</main>
```

### S4 · Tables · sweep + lock canonical

Audit all `<table>` AND custom table-like components:
- Migrate any remaining raw `<table>` → TableShell
- PropertyTable · align border tokens + font sizes to TableShell rhythm
- OpportunityRankingTable · same
- §08 main historical+forecast inline table (NOT modal · the one in chart area) · migrate or align

Define + export canonical table chrome tokens from TableShell internals:
- header border: top + bottom 1px `--black-200`
- row border: bottom 1px `--black-100`
- header pad: 14px 16px
- row pad: 14px 16px
- header font: 11px DM Sans 500 uppercase tracking 0.08em ink-strong
- body font: 13.5px DM Sans 400 ink-body (first col 500 ink-strong · italic col italic ink-muted SAME 13.5px)
- hover row: `var(--black-50)`
- tabular-nums on numeric cols

### S5 · Lint + build + QA

---

## C · Discipline

1. Pill tabs ONLY (rounded · border · black-bg active) for content tabs
2. Variant switchers (2-phase/3-phase · Metrics/Compact) use Tier 3 tinted-group pattern · separate from content tabs
3. ALL tables use TableShell OR align to its tokens
4. §22 Sample Preview = v0-lite chrome verbatim · content = Australia Cold Chain
5. §22 + §23 + §24 = full-width post-body (no SideTOC chrome)

---

## D · Execution order

1. Build TabsPills atom (or canonical className constant)
2. Sweep 9 sections · Radix TabsTrigger → pill className
3. Restore §22 sample-report files (6 files) + §22 section + wire into page.tsx · update PDP_SECTIONS
4. Sweep remaining tables · align to TableShell tokens
5. Lint + build + QA
