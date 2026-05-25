# 🎯 COMPREHENSIVE DESIGN SYSTEM COMPONENT ANALYSIS - PART 4

**Continuation of Parts 1, 2, & 3**  
**Focus:** Specialized Card Types, Text Components, Stat Components

---

# 19. 🎴 SPECIALIZED CARD TYPES - COMPLETE ANALYSIS

## **19.1 ComparisonParameterCard Component**

### **WHAT**
A specialized card for displaying cross-comparison parameters in competitive landscape analysis. Shows either an icon OR a number badge with title and description.

### **WHY**
- Standardizes competitive parameter display
- Allows flexible icon OR number badge display
- Consistent visual language for comparisons
- Enables quick parameter identification

### **WHEN TO USE**
✅ Competitive landscape analysis  
✅ Cross-comparison parameters  
✅ Numbered parameter lists  
✅ Comparison frameworks  

❌ DON'T use for:
- General features (use IconCard)
- Statistics (use StatCard)
- Segmentation data (use SegmentationCard)

### **WHERE USED**
- CompetitiveLandscape section
- Parameter grids
- Comparison matrices

---

### **HOW IT WORKS**

#### **Basic Usage (with Icon)**
```tsx
<ComparisonParameterCard
  icon={<TrendingUp className="size-5" />}
  title="Revenue Growth Rate"
  description="Year-over-year revenue increase across competitive landscape"
/>
```

#### **Alternative Usage (with Number)**
```tsx
<ComparisonParameterCard
  number={1}
  title="Market Penetration"
  description="Percentage of target market captured by each competitor"
/>
```

---

### **PROPERTIES**

| Prop | Type | Required | Default | Purpose |
|------|------|----------|---------|---------|
| `icon` | `ReactNode` | No* | - | Lucide icon element |
| `number` | `number` | No* | - | Number badge (alternative to icon) |
| `title` | `string` | Yes | - | Parameter name |
| `description` | `string` | Yes | - | Parameter explanation |
| `className` | `string` | No | - | Additional CSS classes |

*Either `icon` OR `number` should be provided, not both.

---

### **VISUAL DESIGN**

#### **Structure**
```
┌─────────────────────────────┐
│ [Purple Box]                │  ← Icon or Number
│   📊 or 1                   │
│                             │
│ Revenue Growth Rate         │  ← Title (bold, small)
│                             │
│ Year-over-year revenue      │  ← Description (xs, grey)
│ increase across...          │
└─────────────────────────────┘
```

#### **Dimensions & Spacing**
- Card padding: `p-4` (16px)
- Icon/Number container: `size-10` (40px square)
- Icon/Number margin-bottom: `mb-4` (16px)
- Border radius: `var(--radius-md)` (10px)
- Border: 1px, grey-200
- Background: White

#### **Colors**
```tsx
// Icon/Number background
className="bg-[var(--purple-100)]"  // #eff1fe

// Icon/Number color
className="text-[var(--purple-500)]"  // #7f5fe3

// Border (default)
className="border-[var(--black-200)]"  // #e5e5e5

// Border (hover)
className="hover:border-[var(--black-300)]"  // #d4d4d4

// Title
className="text-[var(--black-900)]"  // #0a0a0a

// Description
className="text-[var(--black-500)]"  // #737373
```

---

### **STATES**

#### **Default State**
- Background: White
- Border: Light grey (grey-200)
- No shadow
- Static appearance

#### **Hover State**
```tsx
className="hover:border-[var(--black-300)] transition-colors duration-300"
```
- Border darkens to grey-300
- No shadow (unlike other cards)
- Subtle border transition (300ms)

**WHY NO SHADOW?**
- More subtle than other cards
- Focus on border change
- Comparison grid needs density
- Too many shadows = visual clutter

---

### **TYPOGRAPHY**

| Element | Size | Weight | Color | Font |
|---------|------|--------|-------|------|
| **Title** | 13px (text-sm) | 700 (bold) | Black-900 | DM Sans |
| **Description** | 12px (text-xs) | 400 | Black-500 | DM Sans |
| **Number Badge** | 16px (text-base) | 700 (bold) | Purple-500 | DM Sans |

---

### **USAGE PATTERNS**

#### **Grid Layout (Recommended)**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <ComparisonParameterCard
    icon={<TrendingUp className="size-5" />}
    title="Revenue Growth"
    description="YoY revenue increase"
  />
  <ComparisonParameterCard
    icon={<Target className="size-5" />}
    title="Market Penetration"
    description="Target market capture rate"
  />
  <ComparisonParameterCard
    icon={<Users className="size-5" />}
    title="Customer Retention"
    description="Annual retention rate"
  />
</div>
```

#### **Numbered List Pattern**
```tsx
{parameters.map((param, index) => (
  <ComparisonParameterCard
    key={index}
    number={index + 1}
    title={param.title}
    description={param.description}
  />
))}
```

---

### **ICON VS NUMBER DECISION**

| Use Icon When: | Use Number When: |
|----------------|------------------|
| ✅ Visual representation matters | ✅ Sequential order is important |
| ✅ Icons are recognizable | ✅ Numbered framework (e.g., 5 Forces) |
| ✅ Varied parameter types | ✅ Step-by-step analysis |
| ✅ Professional appearance | ✅ Prioritized list |

---

### **COMPARISON WITH OTHER CARDS**

| Feature | ComparisonParameterCard | IconCard | MethodologyCard |
|---------|-------------------------|----------|------------------|
| **Icon background** | Purple | Purple | Purple |
| **Hover effect** | Border change | Shadow | Shadow + ring |
| **Icon size** | 40px container | 40px container | 44px container |
| **Text size** | Smaller (sm/xs) | Standard (base) | Standard (base) |
| **Use case** | Comparisons | Features | Process steps |
| **Content** | Title + desc | Title + desc | Title + desc + bullets |

---

## **19.2 SegmentationCard Component**

### **WHAT**
A data-rich card component for displaying market segmentation information with animated progress bars, percentage shares, and optional CAGR indicators.

### **WHY**
- Visualizes market segmentation data
- Shows proportional relationships with progress bars
- Displays growth rates alongside shares
- Professional data presentation
- Animated interactions

### **WHEN TO USE**
✅ Market segmentation sections  
✅ Product type breakdowns  
✅ Customer type distribution  
✅ Distribution channels  
✅ Geographic distribution  
✅ Packaging types  
✅ Any % share data  

❌ DON'T use for:
- Simple stats (use StatCard)
- Features without data (use IconCard)
- Process steps (use MethodologyCard)

### **WHERE USED**
- SegmentationSection (primary use)
- Market breakdown sections
- Distribution analysis
- Product category analysis

---

### **HOW IT WORKS**

#### **Basic Usage**
```tsx
<SegmentationCard
  icon={ChartPie}
  title="Product Type"
  description="By Herb Varieties"
  items={[
    { name: 'Mint', share: 25, cagr: '7.2%' },
    { name: 'Parsley', share: 20, cagr: '5.5%' },
    { name: 'Basil', share: 18, cagr: '6.8%' },
    { name: 'Cilantro', share: 15, cagr: '4.9%' },
    { name: 'Others', share: 22, cagr: '5.1%' }
  ]}
/>
```

#### **With Item Descriptions**
```tsx
<SegmentationCard
  icon={Users}
  title="Customer Types"
  description="By Consumer Segment"
  items={[
    { 
      name: 'Retail Consumers', 
      share: 45, 
      cagr: '5.8%',
      description: 'Individual households and direct consumers'
    },
    { 
      name: 'Food Service', 
      share: 35, 
      cagr: '7.2%',
      description: 'Restaurants, hotels, and catering services'
    },
    { 
      name: 'Institutional', 
      share: 20, 
      cagr: '4.5%',
      description: 'Schools, hospitals, and government facilities'
    }
  ]}
/>
```

---

### **PROPERTIES**

| Prop | Type | Required | Default | Purpose |
|------|------|----------|---------|---------|
| `icon` | `PhosphorIcon` | Yes | - | Phosphor icon component |
| `title` | `string` | Yes | - | Segmentation category |
| `description` | `string` | No | - | Category subtitle |
| `items` | `SegmentationItem[]` | Yes | - | Array of segments |
| `maxPercentage` | `number` | No | 100 | Max value for progress bars |
| `className` | `string` | No | - | Additional CSS classes |

#### **SegmentationItem Interface**
```tsx
interface SegmentationItem {
  name: string;           // Segment name (e.g., "Mint", "Retail")
  share: number;          // Percentage share (0-100)
  cagr?: string;          // Optional CAGR (e.g., "7.2%")
  description?: string;   // Optional description
}
```

---

### **VISUAL DESIGN**

#### **Structure**
```
┌─────────────────────────────────────┐
│ [Purple Icon]                       │
│   📊                                │
│                                     │
│ Product Type                        │  ← Title (lg)
│ By Herb Varieties                   │  ← Description (sm, grey)
│                                     │
│ Mint (7.2%)            25%          │  ← Item name + CAGR, share %
│ ████████████░░░░░░░░░               │  ← Animated progress bar
│                                     │
│ Parsley (5.5%)         20%          │
│ ██████████░░░░░░░░░░░               │
│                                     │
│ Basil (6.8%)           18%          │
│ █████████░░░░░░░░░░░░               │
└─────────────────────────────────────┘
```

#### **Dimensions & Spacing**
- Card padding: `p-4` (16px)
- Icon container: `size-10` (40px square)
- Icon margin-bottom: `mb-4` (16px)
- Title margin-bottom: `mb-1` (4px)
- Description margin-bottom: `mb-4` (16px)
- Items container margin-top: `mt-6` (24px)
- Item spacing: `space-y-4` (16px between items)
- Progress bar height: `h-2` (8px)

---

### **COLORS**

```tsx
// Card
className="bg-white border border-[var(--black-200)]"
className="hover:shadow-[var(--shadow-brand-purple)]"  // Purple-tinted shadow

// Icon background
className="bg-[var(--purple-100)]"  // #eff1fe

// Icon color
className="text-[var(--purple-500)]"  // #7f5fe3

// Title
className="text-[var(--black-900)]"  // #0a0a0a

// Description
className="text-[var(--black-500)]"  // #737373

// Item name
className="text-[var(--black-900)]"

// CAGR (in parentheses)
className="text-[var(--black-500)]"

// Share percentage (bold)
className="text-[var(--black-900)]"

// Progress bar background
className="bg-[var(--black-100)]"  // #f5f5f5

// Progress bar fill
className="bg-[var(--purple-300)]"  // #b8aeef (lighter purple)
```

**WHY PURPLE-300 for progress bars?**
- Lighter shade = less aggressive
- Multiple bars need softer color
- Still clearly purple (data theme)
- Good contrast with background

---

### **STATES**

#### **Default State**
- Background: White
- Border: Grey-200
- No shadow
- Progress bars at 0% width (animates in)

#### **Hover State**
```tsx
className="hover:shadow-[var(--shadow-brand-purple)] transition-shadow duration-300"
```
- Purple-tinted shadow appears
- Border unchanged
- Card lifts visually

#### **Animation State**
```tsx
// Progress bars animate on load
style={{ width: `${(item.share / maxPercentage) * 100}%` }}
className="transition-all duration-700 ease-out"
```
- 700ms animation duration
- Ease-out timing
- Animates from 0% to target width
- Staggered effect as page loads

---

### **TYPOGRAPHY**

| Element | Size | Weight | Color | Font |
|---------|------|--------|-------|------|
| **Title** | 18px (text-lg) | 400 | Black-900 | DM Sans |
| **Description** | 14px (text-sm) | 400 | Black-500 | DM Sans |
| **Item name** | 14px (text-sm) | 400 | Black-900 | DM Sans |
| **CAGR** | 12px (text-xs) | 400 | Black-500 | DM Sans |
| **Item description** | 12px (text-xs) | 400 | Black-500 | DM Sans |
| **Share %** | 14px (text-sm) | 700 (bold) | Black-900 | DM Sans |

---

### **USAGE PATTERNS**

#### **Standard Segmentation Grid**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <SegmentationCard
    icon={ChartPie}
    title="Product Type"
    description="By Herb Varieties"
    items={herbTypes}
  />
  <SegmentationCard
    icon={Users}
    title="Customer Type"
    description="By Consumer Segment"
    items={customerTypes}
  />
  <SegmentationCard
    icon={Package}
    title="Packaging"
    description="By Package Type"
    items={packagingTypes}
  />
</div>
```

---

### **ADVANCED FEATURES**

#### **MaxPercentage Adjustment**
By default, progress bars scale to 100%. Use `maxPercentage` to adjust scale:

```tsx
// If your highest value is 45%, but you want bars to scale to 50% max:
<SegmentationCard
  maxPercentage={50}
  items={[
    { name: 'Category A', share: 45 },  // Will show as 90% width (45/50)
    { name: 'Category B', share: 30 },  // Will show as 60% width (30/50)
  ]}
/>
```

**WHY USE THIS?**
- Better visual proportion
- Prevents one item from dominating visually
- Useful when highest value is close to 100%

---

### **DATA FORMATTING BEST PRACTICES**

#### **✅ DO:**
```tsx
items={[
  { name: 'Mint', share: 25, cagr: '7.2%' },  // Consistent % format
  { name: 'Parsley', share: 20, cagr: '5.5%' }
]}
```

#### **❌ DON'T:**
```tsx
items={[
  { name: 'Mint', share: 25, cagr: '7.2' },  // Missing %
  { name: 'Parsley', share: 0.20, cagr: '5.5%' }  // Wrong format (decimal)
]}
```

---

## **19.3 StakeholderCard Component**

### **WHAT**
A horizontal card component for displaying stakeholder information in the Target Audience section. Features side-by-side icon and text layout.

### **WHY**
- Consistent stakeholder presentation
- Clear visual identity per stakeholder
- Professional, scannable layout
- Purple theme for informational content

### **WHEN TO USE**
✅ Target audience sections  
✅ Stakeholder lists  
✅ User persona displays  
✅ Audience segmentation  

❌ DON'T use for:
- Features (use IconCard)
- Statistics (use StatCard)
- Process steps (use MethodologyCard)

### **WHERE USED**
- TargetAudience section (primary use)
- Stakeholder overview
- Persona galleries

---

### **HOW IT WORKS**

```tsx
<StakeholderCard
  icon={UsersThree}
  title="Investors & VCs"
  description="Market entry opportunities and ROI analysis for investment decisions"
/>
```

---

### **PROPERTIES**

| Prop | Type | Required | Purpose |
|------|------|----------|---------|
| `icon` | `PhosphorIcon` | Yes | Phosphor icon component |
| `title` | `string` | Yes | Stakeholder name/title |
| `description` | `string` | Yes | Stakeholder description |
| `className` | `string` | No | Additional CSS classes |

---

### **VISUAL DESIGN**

#### **Structure (Horizontal Layout)**
```
┌────────────────────────────────────────┐
│  [Icon]  Investors & VCs               │  ← Icon left, title right
│    👥    Market entry opportunities    │  ← Description wraps
│          and ROI analysis for...       │
└────────────────────────────────────────┘
```

**KEY DIFFERENCE:** Horizontal layout (icon beside content) vs vertical (icon above content)

#### **Dimensions & Spacing**
- Card padding: `p-5` (20px) - **slightly more than other cards**
- Icon container: `size-11` (44px square) - **slightly larger**
- Icon-to-content gap: `gap-4` (16px)
- Icon border radius: `rounded-xl` (12px) - **more rounded**
- Card border radius: `rounded-[10px]` (10px)

**WHY LARGER?**
- Horizontal layout has more space
- Larger icon = better visual balance
- More premium feel for stakeholders

---

### **COLORS**

```tsx
// Card
className="bg-white border border-[var(--black-100)]"  // Lighter border

// Icon background
className="bg-[var(--purple-100)]"  // #eff1fe

// Icon color
className="text-[var(--purple-500)]"  // #7f5fe3

// Title
className="text-foreground"  // Black (#171717)

// Description
className="text-[var(--black-500)]"  // #737373
```

---

### **STATES**

#### **Default State**
- Background: White
- Border: Very light grey (black-100, lighter than usual)
- No shadow
- No hover effect documented

#### **Group State**
```tsx
className="group"  // Allows group-based styling
```
- Enables group-hover effects on children
- Currently not used, but prepared for future

---

### **TYPOGRAPHY**

| Element | Size | Weight | Color | Font |
|---------|------|--------|-------|------|
| **Title** | 16px (text-base) | 700 (bold) | Foreground | DM Sans |
| **Description** | 14px (text-sm) | 400 | Black-500 | DM Sans |

---

### **LAYOUT BEHAVIOR**

#### **Responsive Considerations**
```tsx
className="flex items-start gap-4"
```
- **`items-start`** - Aligns icon to top (important for multi-line descriptions)
- **`gap-4`** - 16px gap between icon and content
- **No responsive changes** - Always horizontal layout

#### **Content Flexibility**
```tsx
<div className="flex-1">  // Content takes remaining space
```
- Text can wrap naturally
- Icon stays fixed size
- Card height adjusts to content

---

### **USAGE PATTERNS**

#### **Standard Stakeholder Grid**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <StakeholderCard
    icon={UsersThree}
    title="Investors & VCs"
    description="Market entry opportunities and ROI analysis"
  />
  <StakeholderCard
    icon={ChefHat}
    title="Food Service Providers"
    description="Supply chain insights and procurement trends"
  />
  <StakeholderCard
    icon={Buildings}
    title="Government Bodies"
    description="Policy impacts and regulatory framework"
  />
  <StakeholderCard
    icon={Store}
    title="Retail Operators"
    description="Consumer behavior and demand forecasting"
  />
</div>
```

---

### **COMPARISON: StakeholderCard vs IconCard**

| Feature | StakeholderCard | IconCard |
|---------|-----------------|----------|
| **Layout** | Horizontal | Vertical |
| **Icon size** | 44px (larger) | 40px |
| **Icon shape** | rounded-xl (12px) | rounded-lg (8px) |
| **Border** | black-100 (lighter) | black-200 |
| **Padding** | p-5 (20px) | p-4 (16px) |
| **Hover** | None | Purple shadow |
| **Content** | Title + desc | Title + desc OR children |
| **Use case** | Stakeholders/personas | General features |

**WHY DIFFERENT?**
- Horizontal = better for scanning multiple stakeholders
- Larger icon = more prominence for personas
- Lighter border = softer appearance for audience section
- No hover = more static, informational feel

---

## **19.4 TimelineCard Component**

### **WHAT**
A simple, centered card for displaying timeline/period information with minimal styling. Shows a label and a large prominent value.

### **WHY**
- Quick timeline information display
- Minimal, clean design
- Consistent period formatting
- Easy scanning

### **WHEN TO USE**
✅ Base year displays  
✅ Historical periods  
✅ Forecast periods  
✅ CAGR timelines  
✅ Date ranges  

❌ DON'T use for:
- Complex statistics (use StatCard)
- Features (use IconCard)
- Detailed content (use other cards)

### **WHERE USED**
- Scope of Report section
- Timeline sections
- Period summaries

---

### **HOW IT WORKS**

```tsx
<TimelineCard 
  label="Base Year"
  value="2024"
/>

<TimelineCard
  label="Historical Period"
  value="2019-2024"
/>

<TimelineCard
  label="Forecast CAGR"
  value="4.6%"
/>
```

---

### **PROPERTIES**

| Prop | Type | Purpose |
|------|------|---------|
| `label` | `string` | Period label |
| `value` | `string \| number` | Year/period/rate value |
| `className` | `string` | Additional CSS classes |

---

### **VISUAL DESIGN**

#### **Structure**
```
┌──────────────────┐
│                  │
│   Base Year      │  ← Label (small, grey)
│                  │
│     2024         │  ← Value (large, bold)
│                  │
└──────────────────┘
```

#### **Dimensions & Spacing**
- Card padding: `p-4` (16px)
- Border radius: `rounded-[10px]` (10px)
- Text alignment: Center
- Label margin-bottom: `mb-1` (4px)

---

### **COLORS**

```tsx
// Card background (default)
className="bg-[#fafafa]"  // Grey-50

// Card background (hover)
className="hover:bg-[#f5f5f5]"  // Grey-100 (slightly darker)

// Border
className="border border-[#f5f5f5]"  // Very light

// Label
className="text-[#737373]"  // Grey-500

// Value
className="text-[#171717]"  // Black (grey-700)
```

**WHY GREY BACKGROUND?**
- Softer than white
- Less prominent than other cards
- Timeline info is supporting, not primary
- Subtle visual grouping

---

### **STATES**

#### **Default State**
- Background: Grey-50 (#fafafa)
- Border: Very light grey (#f5f5f5)
- No shadow

#### **Hover State**
```tsx
className="hover:bg-[#f5f5f5] transition-colors duration-300"
```
- Background darkens slightly to grey-100
- No shadow (unlike data cards)
- Subtle color transition (300ms)

**WHY NO PURPLE?**
- Timeline is factual, not data analysis
- Grey = neutral, informational
- Doesn't compete with data cards

---

### **TYPOGRAPHY**

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| **Label** | 14px (text-[14px]) | 400 | Grey-500 (#737373) |
| **Value** | 26px (text-[26px]) | 700 (bold) | Black (#171717) |

**VALUE COLOR NOTE:**
- **NOT PURPLE** - timeline values are not data metrics
- Black = neutral, factual information
- Distinguishes from analytical data

---

### **USAGE PATTERNS**

#### **Timeline Row**
```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  <TimelineCard label="Base Year" value="2024" />
  <TimelineCard label="Historical Period" value="2019-2024" />
  <TimelineCard label="Forecast Period" value="2025-2030" />
  <TimelineCard label="Forecast CAGR" value="4.6%" />
</div>
```

#### **Simple Timeline Section**
```tsx
<div className="flex gap-4 justify-center">
  <TimelineCard label="Start" value="2020" />
  <div className="flex items-center">→</div>
  <TimelineCard label="Current" value="2024" />
  <div className="flex items-center">→</div>
  <TimelineCard label="Forecast" value="2030" />
</div>
```

---

### **COMPARISON WITH StatCard**

| Feature | TimelineCard | StatCard |
|---------|--------------|----------|
| **Background** | Grey (#fafafa) | White |
| **Value color** | Black | Purple |
| **Value size** | 26px | 26-40px |
| **Has icon** | No | Yes/Optional |
| **Hover** | Darker grey | Shadow |
| **Purpose** | Timeline facts | Data metrics |
| **Layout** | Always centered | Multiple variants |

**WHEN TO USE WHICH?**

Use **TimelineCard** when:
- ✅ Displaying dates/years/periods
- ✅ Factual timeline information
- ✅ No data analysis needed
- ✅ Simple, minimal display

Use **StatCard** when:
- ✅ Displaying metrics/KPIs
- ✅ Data requires emphasis
- ✅ Need icon support
- ✅ Multiple variants needed

---

## **19.5 TextCard Component**

### **WHAT**
A versatile card component for text-heavy content with optional icon, paragraphs, and bottom statistics grid. Ideal for outlook sections, summaries, and detailed explanations.

### **WHY**
- Supports long-form content
- Optional icon for categorization
- Built-in stats grid at bottom
- Consistent text formatting
- Purple theme for data/info

### **WHEN TO USE**
✅ Future outlook sections  
✅ Historical summaries  
✅ Detailed analysis blocks  
✅ Text-heavy content with stats  
✅ Multi-paragraph content  

❌ DON'T use for:
- Simple features (use IconCard)
- Stats only (use StatCard)
- Lists (use MethodologyCard)

### **WHERE USED**
- Market outlook sections
- Historical analysis
- Detailed content blocks
- Summary sections

---

### **HOW IT WORKS**

#### **Basic Usage (No Icon)**
```tsx
<TextCard 
  title="Future Outlook"
  paragraphs={[
    "The future of the Qatar fresh herbs market looks promising with continued urbanization...",
    "Advancements in agricultural technology and growing health consciousness..."
  ]}
  stats={[
    { value: "6.0%", label: "Forecast CAGR", isPrimary: true },
    { value: "$213 Mn", label: "2030 Projection" }
  ]}
/>
```

#### **With Icon**
```tsx
<TextCard 
  icon={<TrendUp weight="regular" className="h-5 w-5 text-[var(--purple-500)]" />}
  title="Historical Performance"
  paragraphs={[
    "The market demonstrated steady growth over 2019-2024..."
  ]}
/>
```

#### **With Custom Content**
```tsx
<TextCard title="Market Analysis">
  <ul className="list-disc pl-5 space-y-2">
    <li>Strong demand from retail sector</li>
    <li>Growing organic produce market</li>
    <li>Increasing import volumes</li>
  </ul>
</TextCard>
```

---

### **PROPERTIES**

| Prop | Type | Required | Default | Purpose |
|------|------|----------|---------|---------|
| `title` | `string` | Yes | - | Card heading |
| `paragraphs` | `string[]` | Yes* | - | Array of paragraph texts |
| `icon` | `ReactNode` | No | - | Optional icon element |
| `stats` | `TextCardStat[]` | No | - | Bottom statistics grid |
| `children` | `ReactNode` | No | - | Custom content (overrides paragraphs) |
| `className` | `string` | No | - | Additional CSS classes |

*Required unless `children` is provided

#### **TextCardStat Interface**
```tsx
interface TextCardStat {
  value: string | number;   // Stat value (e.g., "6.0%")
  label: string;            // Stat label (e.g., "Forecast CAGR")
  isPrimary?: boolean;      // Use purple color for value
}
```

---

### **VISUAL DESIGN**

#### **Structure**
```
┌─────────────────────────────────────┐
│ [Icon] Future Outlook               │  ← Optional icon + title
│────────────────────────────────────│
│                                     │
│ The future of the Qatar fresh      │  ← Paragraph 1
│ herbs market looks promising...     │
│                                     │
│ Advancements in agricultural       │  ← Paragraph 2
│ technology and growing health...    │
│                                     │
├─────────────────────────────────────┤  ← Divider
│       6.0%              $213 Mn     │  ← Stats grid
│  Forecast CAGR    2030 Projection  │
└─────────────────────────────────────┘
```

#### **Dimensions & Spacing**
- Horizontal padding: `px-6` (24px)
- Header padding: `pt-6 pb-4` (24px top, 16px bottom)
- Content padding: `pb-6` (24px bottom)
- Icon container: `w-10 h-10` (40px square)
- Icon-to-title gap: `gap-3` (12px)
- Icon margin-bottom: `mb-3` (12px)
- Paragraph spacing: `mb-4` between paragraphs
- Stats margin-top: `mt-8` (32px)
- Stats padding-top: `pt-8` (32px)
- Stats gap: `gap-4` (16px)

---

### **COLORS**

```tsx
// Card
className="border border-[var(--black-200)] bg-white"
className="hover:shadow-[var(--shadow-brand-periwinkle)]"  // Purple shadow

// Icon background
className="bg-[var(--purple-100)]"  // #eff1fe

// Title
// Uses default h3 styling (black)

// Paragraphs
className="text-[var(--black-600)]"  // Slightly darker grey

// Stats divider
className="border-t border-[var(--black-200)]"

// Stat value (primary)
className="text-[var(--purple-500)]"  // Purple for data

// Stat value (non-primary)
className="text-[var(--black-900)]"  // Black

// Stat label
className="text-[var(--black-600)]"
```

---

### **TYPOGRAPHY**

| Element | Size | Weight | Color | Font |
|---------|------|--------|-------|------|
| **Title (h3)** | Default h3 | 400 | Black | DM Sans |
| **Paragraphs** | 16px (text-base) | 400 | Black-600 | DM Sans |
| **Stat value** | 26px (text-[26px]) | 700 (bold) | Purple/Black | DM Sans |
| **Stat label** | 14px (text-[14px]) | 400 | Black-600 | DM Sans |

**TYPOGRAPHY NOTE:**
Per design system rules, this component **ALWAYS** uses DM Sans, including title. Noto Serif is reserved ONLY for h1-h6 when used as section headings, not within components.

---

### **STATES**

#### **Default State**
- Background: White
- Border: Grey-200
- No shadow

#### **Hover State**
```tsx
className="hover:shadow-[var(--shadow-brand-periwinkle)] transition-all duration-300"
```
- Purple-tinted shadow appears
- 300ms transition
- Card lifts visually

---

### **USAGE PATTERNS**

#### **Outlook Section**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <TextCard
    icon={<TrendingUp className="h-5 w-5 text-[var(--purple-500)]" />}
    title="Future Outlook"
    paragraphs={[
      "The Qatar fresh herbs market is poised for sustained growth...",
      "Key growth drivers include health consciousness and urbanization..."
    ]}
    stats={[
      { value: "6.0%", label: "Forecast CAGR (2025-2030)", isPrimary: true },
      { value: "$213M", label: "Projected Market Size 2030", isPrimary: false }
    ]}
  />
  
  <TextCard
    icon={<ClockCounterClockwise className="h-5 w-5 text-[var(--purple-500)]" />}
    title="Historical Performance"
    paragraphs={[
      "The market demonstrated steady growth from 2019-2024...",
      "COVID-19 impact was minimal due to essential nature..."
    ]}
    stats={[
      { value: "4.2%", label: "Historical CAGR (2019-2024)", isPrimary: true },
      { value: "$150M", label: "Current Market Size 2024", isPrimary: false }
    ]}
  />
</div>
```

---

### **STATS GRID FEATURE**

#### **Purpose**
- Shows key metrics related to content
- 2-column grid layout
- Top border separation
- Purple for primary stat

#### **When to Use `isPrimary`**
```tsx
stats={[
  { value: "6.0%", label: "CAGR", isPrimary: true },    // PRIMARY - purple
  { value: "$213M", label: "Market Size" }               // Secondary - black
]}
```

**PRIMARY (Purple) for:**
- ✅ CAGR values
- ✅ Growth rates
- ✅ Key performance metrics
- ✅ Most important number

**SECONDARY (Black) for:**
- ✅ Absolute values (dollars, counts)
- ✅ Supporting figures
- ✅ Secondary metrics

---

### **FLEXIBILITY: paragraphs vs children**

#### **Use `paragraphs` when:**
✅ Simple text content  
✅ Multiple paragraphs  
✅ Standard formatting  

#### **Use `children` when:**
✅ Custom HTML structure  
✅ Lists, tables, etc.  
✅ Complex formatting  
✅ Mixed content types  

```tsx
// paragraphs (simple)
<TextCard paragraphs={["Text 1", "Text 2"]} />

// children (custom)
<TextCard>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</TextCard>
```

---

**[PART 4 CONTINUED IN NEXT SECTION...]**

This is getting extensive! Should I continue with:
- Part 4B: StatBadge, StatCardGroup, OverheadText, BodyText
- Part 5: Page-level components (Hero, Header, Footer, etc.)
- Part 6: Section patterns?

Let me know! 🚀
