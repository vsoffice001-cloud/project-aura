# 🎯 COMPREHENSIVE DESIGN SYSTEM COMPONENT ANALYSIS - PART 5C

**Continuation of Part 5B**  
**Focus:** Data Table & Inline Stats Components

---

## **22.6 MarketDataTable Component**

### **WHAT**
A sophisticated, sortable data table displaying historical and forecast market data with visual enhancements (progress bars, badges, hover states), purple-themed interactions, and supporting analysis cards.

### **WHY**
- Professional data presentation
- Interactive sorting capability
- Visual data encoding (progress bars)
- Contextual color coding (historical vs forecast)
- Comprehensive market analysis

### **WHEN TO USE**
✅ Year-by-year market data  
✅ Historical + forecast datasets  
✅ Comparative metrics  
✅ Financial/growth data  
✅ Multi-dimensional datasets  

❌ DON'T use for:
- Simple lists (use cards)
- <5 data points (overkill)
- Mobile-first content (table limitations)
- Non-tabular data

### **WHERE USED**
- Market breakdown sections
- Data analysis pages
- Historical performance displays
- Forecast presentations

---

### **HOW IT WORKS**

#### **Component Structure**
```
MarketDataTable (Section Wrapper)
  └─ MarketPerformanceTable (Table Component)
      ├─ Table Header (Sortable columns)
      ├─ Table Body (Data rows)
      └─ Table Caption (Description)
  └─ Supporting TextCards (3 cards grid)
```

---

### **DATA MODEL**

```typescript
interface MarketData {
  year: number;
  marketSize: number;
  yoyGrowth: number | null;  // null for base year
  domestic: number;
  imports: number;
  organicShare: number;
  period: 'Historical' | 'Forecast';
}

const marketData: MarketData[] = [
  { year: 2019, marketSize: 120, yoyGrowth: null, domestic: 18, imports: 82, organicShare: 8, period: 'Historical' },
  { year: 2020, marketSize: 125, yoyGrowth: 4.2, domestic: 19, imports: 81, organicShare: 10, period: 'Historical' },
  // ... 2021-2023 (Historical)
  { year: 2024, marketSize: 150, yoyGrowth: 3.4, domestic: 26, imports: 74, organicShare: 18, period: 'Historical' },
  { year: 2025, marketSize: 158, yoyGrowth: 5.3, domestic: 28, imports: 72, organicShare: 21, period: 'Forecast' },
  // ... 2026-2030 (Forecast)
];
```

**Columns:**
- **Year:** Timeline
- **Market Size:** Dollar value in millions
- **YoY Growth:** Percentage growth rate
- **Domestic:** Percentage domestic production
- **Imports:** Percentage imported
- **Organic Share:** Percentage organic products
- **Period:** Historical or Forecast label

---

### **SORTING SYSTEM**

#### **State Management**
```typescript
type SortKey = keyof MarketData;
type SortDirection = 'asc' | 'desc' | null;

const [sortKey, setSortKey] = useState<SortKey | null>(null);
const [sortDirection, setSortDirection] = useState<SortDirection>(null);
```

#### **3-State Sorting Logic**
```typescript
const handleSort = (key: SortKey) => {
  if (sortKey === key) {
    if (sortDirection === 'asc') {
      setSortDirection('desc');        // 1st click: Ascending
    } else if (sortDirection === 'desc') {
      setSortDirection(null);          // 2nd click: Descending
      setSortKey(null);                 // 3rd click: Reset to default
    } else {
      setSortDirection('asc');
    }
  } else {
    setSortKey(key);
    setSortDirection('asc');            // New column: Start with ascending
  }
};
```

**Cycle:**
```
Default (no sort) → Ascending → Descending → Default
```

**WHY 3-STATE:**
- User can return to original order
- More control than binary sort
- Common UX pattern
- Allows chronological view

---

#### **Sorting Implementation**
```typescript
const sortedData = [...marketData].sort((a, b) => {
  if (!sortKey || !sortDirection) return 0;  // No sort: maintain original order

  const aValue = a[sortKey];
  const bValue = b[sortKey];

  // Handle null values (YoY Growth for base year)
  if (aValue === null) return 1;   // nulls to bottom
  if (bValue === null) return -1;

  if (sortDirection === 'asc') {
    return aValue > bValue ? 1 : -1;
  } else {
    return aValue < bValue ? 1 : -1;
  }
});
```

**Null Handling:**
- Null values always sort to bottom
- Prevents comparison errors
- Consistent behavior

---

### **TABLE VISUAL DESIGN**

#### **Container**
```tsx
<div className="relative overflow-x-auto bg-white border border-[var(--black-200)] rounded-[var(--radius-md)] hover:shadow-[var(--shadow-brand-purple)] transition-shadow duration-300">
```

**Features:**
- Background: White
- Border: Grey-200 (standard)
- Border radius: 10px (var(--radius-md))
- Hover: **Purple-tinted shadow** (data theme!)
- Overflow-x: Auto (horizontal scroll on mobile)

**WHY PURPLE SHADOW:**
- Table contains data/information
- Purple = data/information color
- Consistent with SegmentationCard, TextCard
- Not red (red = brand/action)

---

#### **Table Caption**
```tsx
<caption className="p-5 text-lg text-left text-[var(--black-900)]">
  Market Performance Data
  <p className="mt-1.5 text-sm font-normal text-[var(--black-500)]">
    Click column headers to sort • Historical data (2019-2024) • Projected data (2025-2030)
  </p>
</caption>
```

**Purpose:**
- Table title (semantic HTML)
- Usage instructions
- Data context
- Accessibility aid

---

### **TABLE HEADER**

```tsx
<thead className="text-sm text-[var(--black-500)] bg-[var(--black-50)] border-b border-t border-[var(--black-200)]">
  <tr>
    <th
      className="px-6 py-3 font-normal cursor-pointer hover:bg-[var(--black-50)]/80 transition-colors select-none"
      onClick={() => handleSort('year')}
    >
      <div className="flex items-center">
        Year
        <CaretUpDown weight="regular" className="h-4 w-4 ml-1 opacity-50 text-[var(--purple-500)]" />
      </div>
    </th>
    {/* More columns... */}
  </tr>
</thead>
```

**Styling:**
- Background: Light grey (#fafafa)
- Border: Top and bottom
- Text: Grey-500 (not black, less prominent)
- Font-weight: **Normal** (400, not bold)
- Padding: 6px vertical, 24px horizontal

**Interactive Headers:**
- Cursor: Pointer (indicates clickable)
- Hover: Slightly darker background
- User-select: None (prevents text selection during clicks)

**Sort Icon:**
- Icon: `CaretUpDown` from Phosphor
- Color: **Purple** (#7f5fe3)
- Opacity: 50% (subtle)
- Position: Right of text (ml-1)

**WHY PURPLE ICON:**
- Data interaction = purple theme
- Consistent with system
- Differentiates from red (action)

---

### **TABLE ROWS**

#### **Row Styling**
```tsx
<tr className={`hover:bg-[var(--black-50)]/50 transition-colors ${
  index < sortedData.length - 1 ? 'border-b border-[var(--black-200)]' : ''
} ${row.period === 'Forecast' ? 'bg-[var(--black-50)]' : 'bg-white'}`}>
```

**Background Logic:**
- **Historical rows:** White background
- **Forecast rows:** Light grey background (#fafafa)
- **Hover:** All rows darken slightly (50% opacity grey)
- **Last row:** No bottom border

**WHY DIFFERENT BACKGROUNDS:**
- Visual separation of historical vs forecast
- Easy scanning
- Color-coded periods
- No additional column needed

---

### **CELL TYPES & FORMATTING**

#### **1. Year (Header Cell)**
```tsx
<th scope="row" className="px-6 py-4 text-[var(--black-900)] whitespace-nowrap">
  {row.year}
</th>
```
- Semantic: `<th>` with `scope="row"`
- Color: Black (emphasis)
- No-wrap: Prevents year breaking

#### **2. Market Size**
```tsx
<td className="px-6 py-4 text-[var(--black-900)]">
  ${row.marketSize} Mn
</td>
```
- Color: Black (emphasis)
- Format: `$XXX Mn`
- Currency symbol included

#### **3. YoY Growth (Conditional Formatting)**
```tsx
<td className="px-6 py-4">
  {row.yoyGrowth === null ? (
    <span className="text-[var(--black-500)]">Base Year</span>
  ) : row.yoyGrowth >= 5 ? (
    <span className="text-[var(--black-900)]">+{row.yoyGrowth}%</span>
  ) : (
    <span className="text-[var(--black-500)]">+{row.yoyGrowth}%</span>
  )}
</td>
```

**Logic:**
- **null:** Display "Base Year" (grey)
- **≥5%:** Black (high growth emphasis)
- **<5%:** Grey (moderate growth)
- Always show + sign

**WHY 5% THRESHOLD:**
- Distinguishes strong vs moderate growth
- Draws eye to high-performing years
- Context-specific to market analysis

#### **4. Domestic & Imports**
```tsx
<td className="px-6 py-4 text-[var(--black-500)]">{row.domestic}%</td>
<td className="px-6 py-4 text-[var(--black-500)]">{row.imports}%</td>
```
- Color: Grey (supporting data)
- Format: `XX%`

#### **5. Organic Share (Progress Bar)**
```tsx
<td className="px-6 py-4">
  <div className="flex items-center gap-3">
    <div className="flex-1 max-w-[120px]">
      <div className="w-full bg-[var(--black-200)] rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300 bg-[var(--purple-500)]"
          style={{ width: `${(row.organicShare / 50) * 100}%` }}
        />
      </div>
    </div>
    <span className="text-[var(--black-500)] text-sm min-w-[2.5rem]">{row.organicShare}%</span>
  </div>
</td>
```

**Progress Bar Features:**
- Track: Grey-200 (#e5e5e5)
- Fill: **Purple-500** (#7f5fe3)
- Height: 6px (h-1.5)
- Max width: 120px
- Rounded: Full pill shape
- Animation: 300ms transition

**Scale Logic:**
```typescript
width: (row.organicShare / 50) * 100%
```
- Scales to 50% max (not 100%)
- 36% shows as ~72% bar width
- Better visual proportion
- Prevents tiny bars at low values

**WHY PURPLE BAR:**
- Organic share = data metric
- Purple = data/information theme
- Consistent with system
- Differentiates from red (action)

**Layout:**
- Progress bar: flex-1 (takes available space)
- Percentage label: min-width 2.5rem (consistent alignment)
- Gap: 12px between bar and label

#### **6. Period Badge**
```tsx
<td className="px-6 py-4">
  <span className={`px-2.5 py-1 rounded-full text-xs ${
    row.period === 'Historical'
      ? 'bg-[var(--black-100)] text-[var(--black-600)]'
      : 'bg-[var(--green-100)] text-[var(--green-700)]'
  }`}>
    {row.period}
  </span>
</td>
```

**Badge Styles:**

| Period | Background | Text | Purpose |
|--------|------------|------|---------|
| **Historical** | Grey-100 (#f5f5f5) | Grey-600 (#525252) | Neutral, factual |
| **Forecast** | Green-100 (light) | Green-700 (dark) | Future, growth |

**WHY GREEN FOR FORECAST:**
- Green = future, growth, positive
- Differentiates from historical
- Common financial convention
- Not purple (would conflict with data theme)
- Not red (would imply negative/warning)

---

### **RESPONSIVE TABLE**

```tsx
<div className="relative overflow-x-auto">
  <table className="w-full">
```

**Mobile Behavior:**
- Horizontal scroll enabled
- Table maintains structure
- Sticky first column (potential enhancement)
- Minimum column widths prevent crushing

**Potential Enhancement:**
```css
th:first-child,
td:first-child {
  position: sticky;
  left: 0;
  background: inherit;
  z-index: 1;
}
```

---

### **SUPPORTING TEXT CARDS**

```tsx
<div className="grid md:grid-cols-3 gap-6 mt-8">
  <TextCard 
    title="Domestic Production Trend"
    paragraphs={[
      "Local production is expected to increase from 18% in 2019 to 44% by 2030..."
    ]}
  />
  <TextCard 
    title="Import Dependency Reduction"
    paragraphs={[...]}
  />
  <TextCard 
    title="Organic Market Expansion"
    paragraphs={[...]}
  />
</div>
```

**Purpose:**
- Provides context for table data
- Key insights highlighted
- Narrative explanation
- 3-column grid (responsive)

**Content Strategy:**
- Each card analyzes one data dimension
- Quantitative insights (144% increase, etc.)
- Forward-looking statements
- Ties data to strategy

---

### **ACCESSIBILITY**

#### **Semantic HTML**
```tsx
<table>
  <caption>Market Performance Data</caption>
  <thead>
    <tr>
      <th scope="col">Year</th>
      <th scope="col">Market Size ($ Mn)</th>
      ...
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">2024</th>
      <td>$150 Mn</td>
      ...
    </tr>
  </tbody>
</table>
```

**Features:**
- Proper table structure
- Caption for context
- `scope` attributes
- Row headers (`<th scope="row">`)

#### **Keyboard Navigation**
- Headers are clickable (keyboard accessible)
- Tab through sortable columns
- Enter/Space to sort
- Standard table navigation (arrow keys in some browsers)

#### **Screen Readers**
- Table caption announces context
- Column headers identified
- Row headers identified
- Sorted state could be announced (enhancement)

**Potential Enhancement:**
```tsx
<th
  aria-sort={sortKey === 'year' 
    ? sortDirection === 'asc' ? 'ascending' : 'descending'
    : 'none'
  }
>
```

---

### **PERFORMANCE CONSIDERATIONS**

#### **Efficient Sorting**
```typescript
const sortedData = [...marketData].sort((a, b) => {
  // O(n log n) complexity
  // Only 12 items, very fast
});
```

#### **Transition Optimization**
```css
transition-all duration-300  /* Progress bar animation */
transition-colors            /* Row hover */
```
- CSS transitions (hardware-accelerated)
- No JavaScript animations
- 60fps performance

#### **Re-render Optimization**
- Only table body re-renders on sort
- Header stable
- React efficiently diffs rows

---

## **22.7 InlineStats Component**

### **WHAT**
A responsive stats display component with two distinct layouts: horizontal cards on desktop, vertical 2-column grid on mobile. Similar to TimelineCard but for inline display.

### **WHY**
- Responsive by default
- No manual layout switching needed
- Consistent stat presentation
- Space-efficient
- Professional appearance

### **WHEN TO USE**
✅ 2-4 key stats inline with content  
✅ Need responsive behavior  
✅ Timeline/period information  
✅ Quick facts sections  

❌ DON'T use for:
- Single stat (use TimelineCard)
- 5+ stats (use StatCardGroup)
- Complex metrics (use StatCard with icons)

### **WHERE USED**
- Inline with section content
- Quick facts rows
- Summary information
- Timeline displays

---

### **HOW IT WORKS**

#### **Data Structure**
```typescript
interface InlineStatsProps {
  stats: Array<{
    value: string;
    label: string;
  }>;
}
```

**Example:**
```tsx
<InlineStats
  stats={[
    { value: "2024", label: "Base Year" },
    { value: "2019-2024", label: "Historical Period" },
    { value: "2025-2030", label: "Forecast Period" },
    { value: "4.6%", label: "CAGR" }
  ]}
/>
```

---

### **DESKTOP LAYOUT (≥768px)**

```tsx
<div className="hidden md:flex items-center gap-4 lg:gap-6">
  {stats.map((stat, index) => (
    <div key={index} className="rounded-[10px] border border-[#f5f5f5] bg-[#fafafa] hover:bg-[#f5f5f5] transition-colors duration-300">
      <div className="p-4 text-center">
        <p className="text-[14px] mb-1 text-[#737373]">{stat.label}</p>
        <p className="text-[26px] font-bold text-[#171717]">{stat.value}</p>
      </div>
    </div>
  ))}
</div>
```

**Appearance:**
- Layout: Horizontal flex row
- Gap: 16px (md), 24px (lg)
- Cards: Individual rounded containers
- Background: Grey-50 (#fafafa)
- Hover: Slightly darker grey

**Card Styling:**
- Border radius: 10px
- Border: Very light grey
- Padding: 16px
- Text: Centered
- Label above value

**IDENTICAL TO TimelineCard:**
- Same visual design
- Same color scheme
- Same hover effect
- Reusable pattern

---

### **MOBILE LAYOUT (<768px)**

```tsx
<div className="grid grid-cols-2 gap-x-8 gap-y-6 md:hidden">
  {stats.map((stat, index) => (
    <div key={index}>
      <p className="text-2xl font-bold tracking-tight text-[#171717]">{stat.value}</p>
      <p className="text-[14px] mt-1 text-[#737373]">
        {stat.label}
      </p>
    </div>
  ))}
</div>
```

**Appearance:**
- Layout: 2-column grid
- Gap: 32px horizontal, 24px vertical
- No cards: Raw text (saves space)
- Value above label (inverted from desktop)

**Styling:**
- Value: 24px (text-2xl), bold, black
- Label: 14px, grey, normal weight
- Tight tracking on value
- 4px gap between value and label

---

### **COMPARISON: Desktop vs Mobile**

| Feature | Desktop | Mobile |
|---------|---------|--------|
| **Layout** | Horizontal flex | 2-column grid |
| **Container** | Individual cards | No cards |
| **Background** | Grey (#fafafa) | Transparent |
| **Border** | Yes | No |
| **Padding** | 16px per card | None |
| **Value size** | 26px | 24px |
| **Hover** | Yes (darker bg) | No |
| **Order** | Label → Value | Value → Label |

**WHY DIFFERENT:**
- **Desktop:** More space, cards add polish
- **Mobile:** Limited space, minimize chrome
- **Mobile inversion:** Value more prominent (scannability)
- **Grid:** Better space utilization than stacked cards

---

### **RESPONSIVE BREAKPOINT**

```tsx
className="hidden md:flex"  // Show ≥768px
className="md:hidden"       // Show <768px
```

**Breakpoint:** 768px (Tailwind's `md`)

**Why 768px:**
- Common tablet breakpoint
- Matches industry standards
- Space for horizontal cards
- Clean switch point

---

### **USAGE PATTERNS**

#### **Timeline Information**
```tsx
<InlineStats
  stats={[
    { value: "2024", label: "Base Year" },
    { value: "2019-2024", label: "Historical" },
    { value: "2025-2030", label: "Forecast" }
  ]}
/>
```

#### **Key Metrics**
```tsx
<InlineStats
  stats={[
    { value: "$150M", label: "Market Size" },
    { value: "8.5%", label: "CAGR" },
    { value: "75%", label: "Doha Share" }
  ]}
/>
```

---

### **COMPARISON: InlineStats vs StatCardGroup**

| Feature | InlineStats | StatCardGroup |
|---------|-------------|---------------|
| **Desktop layout** | Horizontal cards | Horizontal inline |
| **Mobile layout** | 2-col grid (no cards) | 2-col grid (StatCards) |
| **Desktop dividers** | No | Yes |
| **Icon support** | No | Yes (in StatCard) |
| **Background** | Grey cards | White/transparent |
| **Use case** | Timeline/facts | Data metrics |
| **Complexity** | Simple | More complex |

**WHEN TO USE WHICH:**

**InlineStats:**
- ✅ Timeline/period info
- ✅ Simple facts
- ✅ Embedded in content
- ✅ Minimal design needed

**StatCardGroup:**
- ✅ Data metrics/KPIs
- ✅ Need icons
- ✅ Need dividers
- ✅ Primary stats display

---

### **TYPOGRAPHY**

#### **Desktop**
| Element | Size | Weight | Color |
|---------|------|--------|-------|
| **Label** | 14px | 400 | Grey-500 (#737373) |
| **Value** | 26px | 700 (bold) | Black (#171717) |

#### **Mobile**
| Element | Size | Weight | Color |
|---------|------|--------|-------|
| **Value** | 24px (text-2xl) | 700 (bold) | Black (#171717) |
| **Label** | 14px | 400 | Grey-500 (#737373) |

**Note:** Mobile value slightly smaller (24px vs 26px) due to space constraints

---

### **COLOR SCHEME**

```tsx
// Desktop card background
className="bg-[#fafafa]"           // Grey-50
className="hover:bg-[#f5f5f5]"    // Grey-100 (hover)

// Border
className="border-[#f5f5f5]"      // Very light grey

// Text colors
className="text-[#737373]"        // Label (grey-500)
className="text-[#171717]"        // Value (black)
```

**WHY GREY BACKGROUND:**
- Timeline info = factual (not data metrics)
- Softer than white
- Consistent with TimelineCard
- Differentiates from data cards (purple theme)

---

### **ACCESSIBILITY**

#### **Semantic Structure**
```tsx
<div>
  <p>{stat.label}</p>    {/* Label */}
  <p>{stat.value}</p>     {/* Value */}
</div>
```

**Enhancement Opportunity:**
```tsx
<div role="group" aria-label={stat.label}>
  <p id={`label-${index}`}>{stat.label}</p>
  <p aria-labelledby={`label-${index}`}>{stat.value}</p>
</div>
```

#### **Visual Accessibility**
- High contrast (black on light grey)
- Large value text (26px/24px)
- Clear label-value relationship
- Good spacing

---

### **PERFORMANCE**

#### **Efficient Rendering**
- Simple map operation
- No state management
- No complex calculations
- Pure presentational component

#### **CSS Transitions**
```css
transition-colors duration-300  /* Desktop card hover */
```
- Single property transition
- Hardware-accelerated
- 60fps performance

---

# 📊 PART 5 COMPLETE SUMMARY

## **Page-Level Components Analyzed:**

### **Part 5 (22.1-22.3):**
1. ✅ **HeroSection** - Video background, glass card, CTAs, animations
2. ✅ **Header** - Sticky nav, dropdowns, scroll progress, logo switching
3. ✅ **Footer** - Dark footer, collapsible nav, newsletter, watermark

### **Part 5B (22.4-22.5):**
4. ✅ **FloatingCTA** - Sticky bottom banner with smart visibility
5. ✅ **MindMap** - D3.js interactive tree with zoom, collapse, search

### **Part 5C (22.6-22.7):**
6. ✅ **MarketDataTable** - Sortable table with progress bars, badges
7. ✅ **InlineStats** - Responsive stat display (cards/grid)

---

## **TOTAL COMPONENTS DOCUMENTED (All Parts):**

**Parts 1-3:** 18 components  
**Part 4A:** 5 specialized cards  
**Part 4B:** 4 stat/text components  
**Part 5 (A/B/C):** 7 page-level components  

**GRAND TOTAL: 34 COMPONENT TYPES FULLY DOCUMENTED!** 🎉

---

## **NEXT: PART 6?**

Should cover:
- Section-level patterns (TargetAudience, SegmentationSection, CompetitiveLandscape)
- Icon system utilities (segmentation-icons, stakeholder-icons)
- Remaining specialized sections

**Ready to continue to Part 6? 🚀**
