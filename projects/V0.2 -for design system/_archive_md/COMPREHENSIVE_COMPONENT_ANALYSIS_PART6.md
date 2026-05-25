# 🎯 COMPREHENSIVE DESIGN SYSTEM COMPONENT ANALYSIS - PART 6

**Continuation of Parts 1-5C**  
**Focus:** Section-Level Patterns & Composite Components

---

# 23. 📐 SECTION-LEVEL PATTERNS - COMPLETE ANALYSIS

## **23.1 TargetAudience Section**

### **WHAT**
A full-section component displaying target stakeholders for the report using StakeholderCards in a 2-column grid, alongside a "What You'll Gain" benefits card with page count and CTA.

### **WHY**
- Identifies report audience clearly
- Shows value proposition
- Uses centralized icon system
- Provides immediate conversion opportunity
- Establishes credibility (page count)

### **WHEN TO USE**
✅ Report landing pages  
✅ Product/service audience pages  
✅ Stakeholder identification sections  
✅ "Who This Is For" sections  

❌ DON'T use for:
- Generic about pages
- Feature descriptions
- Technical documentation

### **WHERE USED**
- Chapter 10 - Key Stakeholders
- Report landing pages
- Service offering pages

---

### **HOW IT WORKS**

#### **Component Architecture**
```
TargetAudience Section
├─ Background: Grey-50 + Dot pattern
├─ Section Header (RED overhead + title + description)
├─ Grid Layout (3-column)
│   ├─ Left (2 columns): 2x4 StakeholderCard grid
│   └─ Right (1 column): Benefits Card
│       ├─ Benefits list (checkmarks)
│       ├─ Stat (82+ pages)
│       └─ CTA Button
└─ Standard padding (px-[84.375px] lg:px-[112.5px])
```

---

### **BACKGROUND PATTERN**

```tsx
<div
  className="absolute inset-0"
  style={{
    opacity: 'var(--pattern-opacity)',
    backgroundImage: `radial-gradient(circle at var(--pattern-dot-position) var(--pattern-dot-position), hsl(var(--foreground)) var(--pattern-dot-size), transparent 0)`,
    backgroundSize: `var(--pattern-grid-size) var(--pattern-grid-size)`
  }}
/>
```

**CSS Variables (from theme.css):**
```css
--pattern-opacity: 0.05;
--pattern-dot-position: 1px;
--pattern-dot-size: 1px;
--pattern-grid-size: 20px;
```

**Visual Effect:**
- Subtle dot matrix background
- 20px grid spacing
- 5% opacity
- Black dots on grey background
- Adds texture without distraction

**WHY DOT PATTERN:**
- Professional polish
- Distinguishes from plain grey sections
- Subtle visual interest
- Design system consistency
- Modern aesthetic

---

### **STAKEHOLDER DATA STRUCTURE**

```typescript
const stakeholders = [
  {
    title: 'Investors & VCs',
    description: 'Market entry opportunities and ROI analysis',
    icon: getStakeholderIconByIndex(0),  // Centralized icon system
  },
  // ... 8 total stakeholders
];
```

**Stakeholder List:**
1. Investors & VCs
2. Food Service Providers
3. Government Bodies
4. Exporters & Importers
5. Industry Associations
6. Manufacturers
7. Financial Institutions
8. Distributors & Retailers

**Icon System:**
- Icons retrieved via `getStakeholderIconByIndex()`
- Centralized in `/constants/stakeholder-icons`
- Phosphor icon library
- Consistent visual language

---

### **LAYOUT SYSTEM**

```tsx
<div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
  {/* Left: 2/3 width */}
  <div className="lg:col-span-2">
    <div className="grid sm:grid-cols-2 gap-4">
      {stakeholders.map(...)}  {/* 2-column grid of StakeholderCards */}
    </div>
  </div>
  
  {/* Right: 1/3 width */}
  <div>
    {/* Benefits Card */}
  </div>
</div>
```

**Responsive Behavior:**

| Breakpoint | Layout | Stakeholder Grid | Benefits Card |
|------------|--------|------------------|---------------|
| **Mobile** | Stacked | 1 column | Below, full-width |
| **Tablet (sm:)** | Stacked | 2 columns | Below, full-width |
| **Desktop (lg:)** | Side-by-side | 2 columns | Right sidebar |

**Gap System:**
- Outer grid gap: 32px (md), 48px (lg)
- Inner stakeholder gap: 16px
- Generous spacing = breathing room

---

### **BENEFITS CARD**

#### **Structure**
```tsx
<Card className="bg-white border border-[var(--black-200)] h-full rounded-[10px] hover:border-[var(--black-400)]">
  <CardContent className="p-8">
    {/* Header: Icon + Title */}
    <div className="flex items-center gap-2 mb-6">
      <Sparkles className="size-5 text-[var(--purple-500)]" />
      <h3>What You'll Gain</h3>
    </div>
    
    {/* Benefits List */}
    <ul className="space-y-4">
      {benefits.map((benefit) => (
        <li className="flex items-start gap-3">
          <CircleCheckBig className="size-5 shrink-0 text-[var(--purple-500)]" />
          <span>{benefit}</span>
        </li>
      ))}
    </ul>
    
    {/* Footer: Stat + CTA */}
    <div className="mt-8 pt-6 border-t border-[var(--black-100)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl font-bold">82+</p>
          <p className="text-sm text-[var(--black-500)]">Pages of insights</p>
        </div>
        <Button variant="secondary">Talk to an Expert</Button>
      </div>
    </div>
  </CardContent>
</Card>
```

---

#### **Benefits List**

```typescript
const benefits = [
  'Strategic market entry guidance',
  'Competitive intelligence insights',
  'Investment opportunity identification',
  'Regulatory landscape understanding',
  'Consumer trend analysis',
  'Growth projection data',
];
```

**Visual Pattern:**
- **Icon:** Purple checkmark (CircleCheckBig)
- **Layout:** Icon left, text right
- **Gap:** 12px between items
- **Icon:** Non-shrinking (stays aligned)
- **Text:** Foreground color (black)

**WHY PURPLE ICONS:**
- Benefits = informational value
- Purple = data/information theme
- Consistent with system
- Not red (red = action/CTA)

---

#### **Footer Section**

**Stat Display:**
```tsx
<p className="text-xl font-bold text-foreground">82+</p>
<p className="text-sm text-[var(--black-500)]">Pages of insights</p>
```

**Layout:**
- Stat left, button right
- Border-top separator (grey-100)
- Generous padding (mt-8 pt-6)
- Space-between alignment

**WHY SHOW PAGE COUNT:**
- Establishes credibility
- Shows comprehensive analysis
- Tangible value indicator
- Professional standard
- Builds confidence

---

### **HOVER STATES**

#### **Benefits Card Hover**
```tsx
className="hover:border-[var(--black-400)] transition-colors duration-300"
```

- Border darkens from grey-200 → grey-400
- 300ms smooth transition
- Subtle interaction feedback
- No shadow (keeps focus on stakeholders)

#### **StakeholderCard Hover**
- No hover effect documented
- Static display
- Focus on content, not interaction

---

### **TYPOGRAPHY SYSTEM**

| Element | Size | Weight | Color | Font |
|---------|------|--------|-------|------|
| **Overhead text** | 13px | 700 (bold) | RED | DM Sans |
| **Section heading** | 48px (text-4xl) | 400 | Black | Noto Serif |
| **Section description** | 16px (text-base) | 400 | Grey-500 | DM Sans |
| **Benefits card title** | 20px (text-xl) | 700 (bold) | Black | DM Sans |
| **Benefits list item** | Default (16px) | 400 | Black | DM Sans |
| **Stat value** | 20px (text-xl) | 700 (bold) | Black | DM Sans |
| **Stat label** | 14px (text-sm) | 400 | Grey-500 | DM Sans |

---

### **COLOR STRATEGY**

```tsx
// Background
className="bg-[var(--black-50)]"  // Light grey

// Overhead text
className="text-[var(--brand-red)]"  // RED (#b01f24)

// Icons (Sparkles, Checkmarks)
className="text-[var(--purple-500)]"  // Purple (#7f5fe3)

// Card border (default)
className="border-[var(--black-200)]"  // Grey-200

// Card border (hover)
className="hover:border-[var(--black-400)]"  // Grey-400
```

**WHY THIS PALETTE:**
- Grey background = neutral canvas
- RED = chapter identification (brand)
- Purple = informational content (data theme)
- Grey borders = subtle separation
- Black text = readability

---

### **STAKEHOLDER ICON SYSTEM**

```typescript
import { getStakeholderIconByIndex } from '@/app/constants/stakeholder-icons';
```

**How It Works:**
- Central registry of Phosphor icons
- Indexed access (0-7)
- Consistent icon choices across pages
- Maintainable (change once, updates everywhere)
- Type-safe

**Why Centralized:**
- ✅ DRY principle
- ✅ Consistent icon selection
- ✅ Easy global updates
- ✅ No magic icon imports scattered
- ✅ Single source of truth

---

## **23.2 SegmentationSection Component**

### **WHAT**
A comprehensive market segmentation analysis section displaying 7 segmentation dimensions using SegmentationCards, with inline stats, key takeaways card, and commercial insights.

### **WHY**
- Visualizes market structure
- Data-rich presentation
- Multiple analysis dimensions
- Professional data display
- Purple-themed (data/information)

### **WHEN TO USE**
✅ Market segmentation chapters  
✅ Market breakdown sections  
✅ Multi-dimensional data displays  
✅ Category analysis  

❌ DON'T use for:
- Simple lists
- Single-dimension data
- Non-segmented content

### **WHERE USED**
- Chapter 5 - Industrial Analysis
- Market segmentation pages
- Category breakdown sections

---

### **HOW IT WORKS**

#### **Component Architecture**
```
SegmentationSection
├─ Section Header (overhead + title + description)
├─ Inline Stats (3 stats with dividers)
├─ Segmentation Cards (7 total)
│   ├─ Row 1: 2 columns (Product Type, End-User)
│   ├─ Row 2: 3 columns (Distribution, Packaging, Geographic)
│   └─ Row 3: 2 columns (Organic vs Conv., Price Range)
└─ Key Takeaways Card
    ├─ Gradient background
    ├─ Summary text
    └─ 2 insight cards
```

---

### **DATA STRUCTURE**

```typescript
interface SegmentationItem {
  name: string;
  share: number;
  cagr?: string;
  description?: string;
}

const herbTypeData: SegmentationItem[] = [
  { name: 'Mint', share: 25, cagr: '7.2%' },
  { name: 'Parsley', share: 20, cagr: '5.5%' },
  // ...
];
```

**7 Segmentation Dimensions:**
1. **Product Type** (7 herb varieties)
2. **End-User** (5 customer types)
3. **Distribution Channel** (5 channels)
4. **Packaging Type** (4 types)
5. **Geographic Distribution** (4 regions)
6. **Organic vs Conventional** (2 categories)
7. **Price Range** (4 tiers)

---

### **INLINE STATS**

```tsx
<div className="grid grid-cols-2 md:flex md:items-baseline gap-6 md:gap-10 lg:gap-14 pt-10 mt-10 border-t border-[var(--black-200)]">
  <StatCard value="7" label="Segments Analyzed" showDivider />
  <StatCard value="78%" label="Urban Concentration" showDivider />
  <StatCard value="+15%" label="Online Channel CAGR" />
</div>
```

**Features:**
- Desktop: Horizontal with dividers
- Mobile: 2-column grid (no dividers)
- Top border separator
- Generous margins (pt-10 mt-10)

**Stats Shown:**
- **7:** Number of analysis dimensions
- **78%:** Doha urban concentration
- **+15%:** Online channel growth rate

---

### **SEGMENTATION CARDS LAYOUT**

#### **Row 1: 2-Column Grid**
```tsx
<div className="grid lg:grid-cols-2 gap-6 mb-6">
  <SegmentationCard
    icon={getSegmentationIconByIndex(0)}
    title="Product Type"
    description="Mint and Parsley dominate..."
    items={herbTypeData}
  />
  <SegmentationCard
    icon={getSegmentationIconByIndex(1)}
    title="End-User"
    description="Retail consumers lead..."
    items={endUserData}
  />
</div>
```

**Why 2 Columns:**
- Most important dimensions (Product, Customer)
- More visual space
- Detailed item lists (7 and 5 items)
- Emphasis through size

---

#### **Row 2: 3-Column Grid**
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
  <SegmentationCard icon={...} title="Distribution Channel" items={...} />
  <SegmentationCard icon={...} title="Packaging Type" items={...} />
  <SegmentationCard icon={...} title="Geographic Distribution" items={...} />
</div>
```

**Why 3 Columns:**
- Moderate importance
- Fewer items per card (4-5 items)
- Efficient use of space
- Visual hierarchy

**Responsive:**
- Mobile: 1 column
- Tablet (md:): 2 columns
- Desktop (lg:): 3 columns

---

#### **Row 3: 2-Column Grid**
```tsx
<div className="grid md:grid-cols-2 gap-6">
  <SegmentationCard icon={...} title="Organic vs Conventional" items={...} />
  <SegmentationCard icon={...} title="Price Range" items={...} />
</div>
```

**Why 2 Columns:**
- Binary/simple classifications
- Final dimensions (less primary)
- Visual balance with Row 1
- Clean section closure

---

### **SEGMENTATION ICON SYSTEM**

```typescript
import { getSegmentationIconByIndex } from '@/app/constants/segmentation-icons';
```

**Icons (0-6):**
- 0: Product Type (ChartPie)
- 1: End-User (Users)
- 2: Distribution (Store)
- 3: Packaging (Package)
- 4: Geographic (MapPin)
- 5: Organic (Leaf)
- 6: Price (DollarSign)

**Centralized Benefits:**
- Consistent icon choices
- Easy maintenance
- Type-safe
- No scattered imports

---

### **KEY TAKEAWAYS CARD**

```tsx
<Card 
  className="mt-12 rounded-[var(--radius-md)]" 
  style={{ 
    background: 'linear-gradient(135deg, rgba(243, 244, 255, 0.5), rgba(250, 250, 250, 0.3))',
    borderColor: 'rgba(226, 228, 253, 0.5)',
    borderWidth: '1px'
  }}
>
```

**Styling:**
- **Background:** Purple-tinted gradient (subtle)
- **Border:** Very light purple (semi-transparent)
- **Margin-top:** 48px (mt-12)
- **Radius:** 10px (var(--radius-md))

**WHY PURPLE GRADIENT:**
- Segmentation = data analysis
- Purple = data/information theme
- Subtle, not overwhelming
- Distinguishes from white cards
- Premium appearance

---

#### **Takeaways Structure**
```tsx
<CardContent className="p-4">
  {/* Header */}
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
    <div>
      <h3>Key Segmentation Takeaways</h3>
      <p>Online retail and organic herbs represent...</p>
    </div>
  </div>
  
  {/* Insights Grid */}
  <div className="grid md:grid-cols-2 gap-6">
    <div className="p-4 bg-white border rounded-[var(--radius-md)]">
      <h4>Commercial Sector Demand</h4>
      <p>The commercial segment shows strong demand...</p>
    </div>
    <div className="p-4 bg-white border rounded-[var(--radius-md)]">
      <h4>Distribution Channel Dynamics</h4>
      <p>Distribution through supermarkets...</p>
    </div>
  </div>
</CardContent>
```

**Layout:**
- **Header:** Summary statement
- **Grid:** 2 columns (responsive)
- **Cards:** White bg, grey border, rounded
- **Padding:** 16px cards, 16px outer

**Content Strategy:**
- Summary of key findings
- Actionable insights
- Business implications
- Pattern identification

---

### **VISUAL HIERARCHY**

**Priority 1 (Largest):**
- Product Type, End-User (2-col, Row 1)

**Priority 2 (Medium):**
- Distribution, Packaging, Geographic (3-col, Row 2)

**Priority 3 (Standard):**
- Organic, Price Range (2-col, Row 3)

**Priority 4 (Summary):**
- Key Takeaways Card (full-width, gradient)

---

### **COLOR SYSTEM**

```tsx
// Section background
className="bg-white"  // No grey, white background

// SegmentationCards
// - Background: White
// - Border: Grey-200
// - Hover: Purple shadow (var(--shadow-brand-purple))

// Icon backgrounds (in cards)
className="bg-[var(--purple-100)]"  // Light purple

// Progress bars (in cards)
className="bg-[var(--purple-300)]"  // Medium purple

// Takeaways card
background: 'linear-gradient(135deg, rgba(243, 244, 255, 0.5), ...)'
```

**WHY WHITE BACKGROUND:**
- Alternating section pattern (odd=white, even=grey)
- Clean, professional
- Purple cards stand out
- Good contrast

---

## **23.3 CompetitiveLandscape Section**

### **WHAT**
A comprehensive competitive analysis section with market share pie chart, top players list, dynamics visualization, sortable company table with blur/CTA overlay, comparison parameter grid, and analysis cards.

### **WHY**
- Multi-dimensional competitive view
- Interactive data tables
- Visual data encoding (charts, progress bars)
- Conversion-focused (unlock CTA)
- Professional competitive intelligence

### **WHEN TO USE**
✅ Competitive landscape chapters  
✅ Market player analysis  
✅ Company profiling sections  
✅ Competitive intelligence pages  

❌ DON'T use for:
- Simple competitor lists
- Non-competitive content
- Feature comparisons (use different pattern)

### **WHERE USED**
- Chapter 8 - Competitive Landscape
- Market player sections
- Competitive analysis pages

---

### **HOW IT WORKS**

#### **Component Architecture**
```
CompetitiveLandscape Section
├─ Section Header (RED overhead + title + description)
├─ Inline Stats (3 stats)
├─ Three Cards Grid
│   ├─ Market Share Distribution (Pie chart)
│   ├─ Top 5 Players (Ranked list with blur)
│   └─ Market Dynamics (Progress bars)
├─ Companies Table (Sortable, blurred with CTA overlay)
├─ Cross Comparison Parameters (10 numbered cards)
└─ Analysis Included Grid (5 analysis cards)
```

---

### **MARKET SHARE PIE CHART**

#### **Highcharts Configuration**
```typescript
const marketShareOptions = {
  chart: {
    type: 'pie',
    backgroundColor: 'transparent',
    height: 200,
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      innerSize: '50%',  // Donut chart
      dataLabels: { enabled: false },
      showInLegend: false,
      borderWidth: 2,
      borderColor: '#ffffff',
    },
  },
  series: [{
    name: 'Market Share',
    colorByPoint: true,
    data: [
      { name: 'Qatar Green Farms', y: 12, color: '#b8aeef' },  // Purple 300
      { name: 'Al Waha Farms', y: 10, color: '#9b80eb' },      // Purple 400
      { name: 'Fresh Herbs Qatar', y: 8, color: '#7f5fe3' },   // Purple 500 (BASE)
      { name: 'Qatar Organic Farms', y: 8, color: '#6d52d9' }, // Purple 600
      { name: 'Gulf Herbs Co.', y: 7, color: '#5b43b8' },      // Purple 700
      { name: 'Others', y: 55, color: '#e5e5e5' },             // Grey-200
    ],
  }],
};
```

**Visual Features:**
- **Type:** Donut chart (innerSize: 50%)
- **Colors:** Purple scale (lighter to darker)
- **Others:** Grey (de-emphasized)
- **Border:** White, 2px (separation)
- **Height:** 200px (compact)
- **Background:** Transparent

**WHY PURPLE SCALE:**
- Market share = data/information
- Purple = data theme (consistent)
- Gradient shows hierarchy
- Grey "Others" = remainder

**Color Progression:**
- **Largest share:** Lightest purple (300)
- **Medium shares:** Mid-range purples (400, 500, 600)
- **Smaller share:** Darkest purple (700)
- **Others:** Grey (neutral)

---

#### **Custom Legend**
```tsx
<div className="grid grid-cols-2 gap-2 mt-4">
  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#b8aeef' }} />
    <span className="text-xs truncate text-[#737373]">Qatar Green Farms</span>
  </div>
  {/* ... more legend items */}
</div>
```

**Why Custom Legend:**
- Highcharts legend too large
- Better control over layout
- 2-column grid (space-efficient)
- Truncate long names
- Smaller text (12px)

---

### **TOP 5 PLAYERS CARD**

```tsx
<div className="space-y-3">
  {companies.slice(0, 5).map((company, index) => (
    <div key={index} className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-lg flex items-center justify-center bg-[#eff1fe]">
          <span className="text-sm font-bold text-[#171717]">{index + 1}</span>
        </div>
        <span className="text-sm text-[#171717]">{company.company}</span>
      </div>
      <span className="text-sm font-bold text-[#171717] blur-sm select-none">{company.share}%</span>
    </div>
  ))}
</div>
```

**Features:**
- **Rank badges:** Purple-tinted background, numbered
- **Company names:** Black, clear
- **Market share:** **BLURRED** (blur-sm)
- **Combined share:** Shown at bottom (also blurred)

**WHY BLUR SHARE:**
- Teaser content (competitive intelligence)
- Encourages report purchase
- Shows structure without revealing data
- Conversion optimization

**Badge Styling:**
- Size: 40px square
- Background: Purple-100 (#eff1fe)
- Text: Black, bold, centered
- Border radius: 8px (rounded-lg)

---

### **MARKET DYNAMICS CARD**

```tsx
<div className="space-y-4">
  <div className="space-y-1.5">
    <div className="flex items-center justify-between">
      <span className="text-sm text-[#171717]">Local Players</span>
      <span className="text-sm font-bold text-[#171717]">70%</span>
    </div>
    <div className="w-full h-2 rounded-full overflow-hidden relative bg-[#f5f5f5]">
      <div
        className="h-full rounded-full transition-all duration-700 ease-out bg-[#9d9aef]"
        style={{ width: '70%' }}
      />
    </div>
  </div>
  
  {/* Regional/Int'l: 30% */}
  
  <div className="pt-3 border-t border-[#e5e5e5]">
    <p className="text-xs text-[#737373]">
      <strong className="text-[#171717]">8 new entrants</strong> in the past 5 years...
    </p>
  </div>
</div>
```

**Progress Bars:**
- **Color:** Purple (#9d9aef) - lighter than primary
- **Height:** 8px (h-2)
- **Animation:** 700ms ease-out
- **Background:** Grey-100 (#f5f5f5)

**Data Shown:**
- Local players: 70%
- Regional/International: 30%
- Insight: 8 new entrants (5 years)

**WHY THIS DATA:**
- Shows market structure
- Local vs international balance
- Market attractiveness (new entrants)
- Growth indicators

---

### **COMPANIES TABLE**

#### **Sortable Headers**
```tsx
<th 
  scope="col"
  className="px-6 py-3 font-normal cursor-pointer hover:bg-[#fafafa]/80 transition-colors select-none"
  onClick={() => handleSort('company')}
>
  <div className="flex items-center">
    Company
    <ArrowUpDown className="h-4 w-4 ml-1 opacity-50" style={{ color: '#7f5fe3' }} />
  </div>
</th>
```

**Sort Icons:**
- Icon: `ArrowUpDown` (Lucide)
- Color: **Purple** (#7f5fe3)
- Opacity: 50% (subtle)
- Position: Right of text

**Columns:**
1. **Company** - Name (sortable)
2. **Share** - Market share % (sortable, BLURRED)
3. **Est.** - Established year (sortable, BLURRED)
4. **Type** - Local/Regional/Government (sortable, BLURRED)
5. **Focus Area** - Business focus (BLURRED)

---

#### **Blur + CTA Overlay**
```tsx
{/* Table content blurred */}
<td className="px-6 py-4 blur-sm select-none">
  {company.share}%
</td>

{/* Overlay CTA */}
<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
  <div className="pointer-events-auto">
    <Button variant="cta" size="default">
      Unlock Company Profiles
    </Button>
  </div>
</div>
```

**Overlay Strategy:**
- **Position:** Absolute, covers entire table
- **Blur:** Applied to sensitive columns
- **Select-none:** Prevents copying
- **Pointer-events-none:** Container doesn't block table
- **Pointer-events-auto:** Button is clickable
- **CTA:** Centered, prominent

**WHY THIS PATTERN:**
- Teases content structure
- Shows data exists (not just hiding)
- Encourages conversion
- Professional gating
- Better than complete hiding

---

#### **Company Row Design**
```tsx
<tr className="hover:bg-[#fafafa]/50 transition-colors bg-white">
  <th scope="row" className="px-6 py-4 text-[#171717] whitespace-nowrap">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#eff1fe]">
        <Building2 className="h-4 w-4" style={{ color: '#7f5fe3' }} />
      </div>
      <span>{company.company}</span>
    </div>
  </th>
  {/* ... more cells */}
</tr>
```

**Features:**
- Company icon: Purple building icon
- Icon background: Purple-100 (#eff1fe)
- Row hover: Light grey (50% opacity)
- Border-bottom: All rows except last

---

### **CROSS COMPARISON PARAMETERS**

```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
  <ComparisonParameterCard
    number={1}
    title="Revenue Growth Rate"
    description="Year-over-year revenue growth trajectory"
  />
  {/* ... 10 total parameters */}
</div>
```

**10 Parameters:**
1. Revenue Growth Rate
2. Market Penetration Rate
3. Customer Retention Rate
4. Product Diversification
5. Supply Chain Efficiency
6. Brand Recognition
7. Pricing Strategy
8. Distribution Network
9. Technology Adoption
10. Quality Certifications

**Grid Layout:**
- **Mobile:** 1 column
- **Tablet (md:):** 2 columns
- **Desktop (lg:):** 3 columns
- **Gap:** 16px

**Visual:**
- Numbered badges (purple background)
- Consistent height cards
- Professional framework
- Analysis depth indication

---

### **ANALYSIS INCLUDED SECTION**

```tsx
<div 
  className="p-4 rounded-[10px]"
  style={{ 
    background: 'linear-gradient(135deg, rgba(243, 244, 255, 0.5), rgba(250, 250, 250, 0.3))',
    borderColor: 'rgba(226, 228, 253, 0.5)',
  }}
>
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
    <AnalysisCard
      icon={<PieChart className="size-5" />}
      title="Market Share Analysis"
      description="Detailed breakdown of market share..."
    />
    {/* 5 total analysis types */}
  </div>
</div>
```

**5 Analysis Types:**
1. **Market Share Analysis** (PieChart icon)
2. **Cross Comparison Matrix** (Grid3x3 icon)
3. **SWOT Analysis** (Shield icon)
4. **Pricing Strategy** (DollarSign icon)
5. **Company Profiles** (FileText icon)

**Container:**
- **Background:** Purple-tinted gradient (same as takeaways)
- **Border:** Semi-transparent purple
- **Padding:** 16px
- **Radius:** 10px

**WHY GRADIENT BOX:**
- Highlights value proposition
- Purple = data/analysis theme
- Premium appearance
- Groups related content

---

### **COLOR STRATEGY**

```tsx
// Background
className="bg-[var(--black-50)]"  // Grey (alternating pattern)

// Charts & visualizations
color: '#b8aeef' to '#5b43b8'  // Purple scale (300-700)

// Sort icons
style={{ color: '#7f5fe3' }}  // Purple-500

// Progress bars
className="bg-[#9d9aef]"  // Light purple

// Icon backgrounds
className="bg-[#eff1fe]"  // Purple-100

// "Others" in pie chart
color: '#e5e5e5'  // Grey-200
```

**Consistent Purple Theme:**
- Data = purple
- All visualizations use purple
- Scale indicates magnitude
- Grey for "Others" (neutral)

---

**[PART 6 CONTINUES... GrowthDriversChallenges next]**

Should I continue with GrowthDriversChallenges and any remaining sections? 🚀
