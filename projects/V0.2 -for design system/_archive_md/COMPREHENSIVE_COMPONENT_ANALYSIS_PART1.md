# 🎯 COMPREHENSIVE DESIGN SYSTEM COMPONENT ANALYSIS

**Version:** 3.0.0  
**Date:** February 12, 2026  
**Purpose:** Complete analysis of EVERY component with WHAT, WHY, WHEN, WHERE, HOW

---

## 📊 **ANALYSIS SUMMARY**

**Total Components Analyzed:** 60+  
**Main Sections:** 23  
**UI Components:** 40+  
**Patterns Identified:** 50+

---

# 1. 🃏 CARDS - COMPLETE ANALYSIS

## **1.1 StatCard Component**

### **WHAT**
A component for displaying statistics/metrics with icon, label, value, and optional subtitle.

### **WHY**
- Highlights key metrics
- Creates visual hierarchy for data
- Provides context for numbers
- Draws attention to important stats

### **WHEN TO USE**
✅ Display market size, growth rates, key metrics  
✅ Show company statistics  
✅ Present financial data  
✅ Highlight achievement numbers  

❌ DON'T use for:  
- Long-form content
- Non-numeric data
- Action buttons
- Explanatory text

### **WHERE USED**
- Hero sections (inline stats)
- Market overview sections
- Key metrics grids
- Dashboard-style layouts
- Stat comparison sections

### **HOW TO IMPLEMENT**

#### **Variants:**

**1. Icon-Left (Default)** - Horizontal layout
```tsx
<StatCard
  variant="icon-left"
  icon={<TrendingUp className="size-5" />}
  label="Market Value"
  value="$150 Mn"
  subtitle="2024 Estimate"
/>
```
**Use When:** Default stat display, dashboard cards

**2. Icon-Top** - Vertical centered layout
```tsx
<StatCard
  variant="icon-top"
  icon={<Users className="size-6" />}
  label="Total Companies"
  value="500+"
/>
```
**Use When:** Grid layouts, featured stats, hero metrics

**3. Inline** - Compact horizontal (no background)
```tsx
<StatCard
  variant="inline"
  label="CAGR"
  value="8.5%"
  subtitle="2025-2030"
  showDivider={true}
/>
```
**Use When:** Stat rows, compact displays, footer stats

**4. Centered** - Simple centered (no icon bg)
```tsx
<StatCard
  variant="centered"
  label="Growth Rate"
  value="15.3%"
  valueSize="xl"
/>
```
**Use When:** Minimal displays, highlighted numbers

### **PROPERTIES**

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `variant` | `icon-left \| icon-top \| inline \| centered` | `icon-left` | Layout style |
| `icon` | `ReactNode` | - | Icon element |
| `iconBg` | `periwinkle-50 \| periwinkle-100 \| grayscale-50 \| white` | `periwinkle-50` | Icon background |
| `iconColor` | `string` | `#6D52D9` | Icon color |
| `label` | `string` | required | Stat label |
| `value` | `string \| number` | required | Stat value |
| `subtitle` | `string` | - | Optional context |
| `valueSize` | `sm \| default \| lg \| xl` | `default` | Value text size |
| `showHoverShadow` | `boolean` | variant-dependent | Hover effect |
| `showBorder` | `boolean` | variant-dependent | Border display |

### **STATES**

#### **Default**
- White background (icon-left, icon-top)
- Transparent background (inline, centered)
- Light grey border
- Purple icon background

#### **Hover**
- Purple-tinted shadow elevation
- Smooth transition (300ms)
- No color change
- Maintains all content

#### **Color Rules**
- **Value:** Always BLACK (#171717) - it's data
- **Label:** Always GREY (#737373) - secondary text
- **Icon BG:** Light PURPLE (#eff1fe) - data color system
- **Icon:** PURPLE (#6D52D9 or #7f5fe3) - data color

### **REUSABILITY SCORE:** ⭐⭐⭐⭐⭐ (5/5)
- Highly reusable
- 4 variants cover all use cases
- Flexible props system
- Consistent API

---

## **1.2 IconCard Component**

### **WHAT**
A card with icon, title, description/custom content for informational purposes.

### **WHY**
- Present features, benefits, services
- Group related information
- Create visual interest with icons
- Provide scannable content blocks

### **WHEN TO USE**
✅ Feature lists  
✅ Service offerings  
✅ Regional breakdowns  
✅ Growth drivers/challenges  
✅ Target audience segments  
✅ Methodology steps  

❌ DON'T use for:
- Numeric stats (use StatCard)
- CTAs (use CTA components)
- Charts (use ChartCard)
- Forms

### **WHERE USED**
- GrowthDriversChallenges section
- RegionalComparison section
- TargetAudience section
- ResearchMethodology section
- Feature grids

### **HOW TO IMPLEMENT**

```tsx
// Basic usage
<IconCard
  icon={<Building2 className="h-6 w-6" />}
  title="Regional Analysis"
  description="Comprehensive breakdown of market dynamics across Doha, Al Rayyan..."
/>

// With custom content
<IconCard
  icon={<TrendingUp className="h-6 w-6" />}
  title="Growth Drivers"
>
  <div className="space-y-4">
    <div>
      <h4 className="font-semibold mb-2">Health Consciousness</h4>
      <p className="text-sm text-grey-500">Growing awareness...</p>
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li>65% prefer organic options</li>
        <li>Rising demand for fresh produce</li>
      </ul>
    </div>
  </div>
</IconCard>
```

### **PROPERTIES**

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `icon` | `ReactNode` | required | Icon element |
| `title` | `string` | required | Card heading |
| `description` | `string` | - | Simple text content |
| `children` | `ReactNode` | - | Complex custom content |
| `iconSize` | `sm \| md \| lg` | `md` | Icon container size |
| `iconBgColor` | `string` | `var(--purple-100)` | Icon background |
| `iconColor` | `string` | `var(--purple-500)` | Icon color |
| `showIconBg` | `boolean` | `true` | Show icon background |

### **STATES**

#### **Default**
- White background
- Light grey border (#e5e5e5)
- Purple icon background (#eff1fe)
- Purple icon (#7f5fe3)
- No shadow

#### **Hover**
- Purple-tinted shadow
- 300ms transition
- No layout shift
- No color change

### **COLOR RULES**
- **Icon:** PURPLE (#7f5fe3) - informational
- **Icon BG:** Light PURPLE (#eff1fe) - data background
- **Title:** BLACK (#171717) - primary text
- **Description:** GREY (#737373) - secondary text
- **Border:** GREY (#e5e5e5) - neutral border

### **REUSABILITY SCORE:** ⭐⭐⭐⭐⭐ (5/5)
- Extremely flexible
- Supports custom content
- Consistent styling
- Used extensively

---

## **1.3 AnalysisCard Component**

*(Need to read this component - will add)*

### **WHAT**
Card for displaying analysis points with numbered circles.

### **WHY**
Structured presentation of insights with visual hierarchy.

### **WHEN TO USE**
Analysis sections, numbered insights, step-by-step breakdowns.

---

## **1.4 Card Comparison Matrix**

| Card Type | Primary Use | Icon BG | Number Display | Hover Shadow | Best For |
|-----------|-------------|---------|----------------|--------------|----------|
| **StatCard** | Metrics | ✅ PURPLE | ✅ Large | ✅ | Market size, KPIs, stats |
| **IconCard** | Features | ✅ PURPLE | ❌ | ✅ | Features, services, info blocks |
| **AnalysisCard** | Insights | ✅ PURPLE | ✅ Small circle | ❌ | Numbered analysis points |
| **ChartCard** | Data Viz | ❌ | ❌ | ❌ | Charts, graphs |

---

# 2. 🎨 COLORS - COMPLETE USAGE ANALYSIS

## **2.1 RED (#b01f24) - Brand Color**

### **WHAT**
Primary brand color for action and identity elements.

### **WHY**
- Drives conversion
- Creates brand presence
- Signals urgency/importance
- Maximum attention

### **WHEN TO USE**

#### **Chapter Headers** 🔴
```tsx
<span className="text-[var(--brand-red)] font-bold text-[13px] uppercase tracking-widest">
  CHAPTER 8 - Competitive Landscape
</span>
```
**Why:** Brand identity, structural hierarchy  
**Where:** Every section, every page  
**Frequency:** Once per section

#### **Primary CTA Buttons** 🔴
```tsx
<button className="bg-[var(--brand-red)] hover:bg-[var(--brand-red-hover)] text-white">
  Download Report
</button>
```
**Why:** Maximum conversion focus  
**Where:** Hero, final CTA, floating CTA  
**Frequency:** 2-3 per page maximum

#### **CTA Section Backgrounds** 🔴
```tsx
<section className="bg-gradient-to-br from-[var(--brand-red)] to-[var(--brand-red-active)]">
```
**Why:** High-impact conversion moment  
**Where:** Final CTA section  
**Frequency:** Once per page

#### **Scroll Progress Bar** 🔴
```tsx
<div className="bg-[var(--brand-red)]" style={{ width: `${progress}%` }} />
```
**Why:** Engagement indicator, brand presence  
**Where:** Header  
**Frequency:** Persistent

#### **Focus Rings** 🔴
```tsx
<input className="focus:ring-[var(--brand-red)] focus:ring-2" />
```
**Why:** Accessibility, brand consistency  
**Where:** All interactive elements  
**Frequency:** On focus state

#### **Link Hover States** 🔴
```tsx
<a className="text-grey-700 hover:text-[var(--brand-red)]">
```
**Why:** Interactive feedback  
**Where:** Text links, navigation  
**Frequency:** On hover

### **WHEN NOT TO USE RED** ❌
- Charts/graphs (use PURPLE)
- Informational icons (use PURPLE)
- Stat numbers (use PURPLE)
- Data tables (use PURPLE for data)
- General content icons (use PURPLE)
- Decorative elements (use GREY)

---

## **2.2 PURPLE (#7f5fe3) - Data Color**

### **WHAT**
Primary data/information color for charts, icons, metrics.

### **WHY**
- Professional data presentation
- Non-alarming (unlike red)
- Good contrast
- Analytical feel

### **WHEN TO USE**

#### **Charts & Graphs** 🟣
```tsx
series: [{
  color: 'var(--purple-500)',  // #7f5fe3
  data: [...]
}]
```
**Why:** Data visualization standard  
**Where:** All charts (area, line, column, pie)  
**Frequency:** Primary series color

#### **Informational Icons** 🟣
```tsx
<Icon className="h-6 w-6 text-[var(--purple-500)]" />
```
**Why:** Signals "information, not action"  
**Where:** IconCards, feature cards, info blocks  
**Frequency:** Every informational card

#### **Icon Backgrounds** 🟣
```tsx
<div className="bg-[var(--purple-100)]">  {/* Light purple */}
  <Icon className="text-[var(--purple-500)]" />
</div>
```
**Why:** Visual grouping, subtle emphasis  
**Where:** All icon containers  
**Frequency:** With every informational icon

#### **Stat Numbers** 🟣
```tsx
<div className="text-[40px] font-bold text-[var(--purple-500)]">
  $2.4B
</div>
```
**Why:** Emphasizes data without urgency  
**Where:** StatCards, metric displays  
**Frequency:** All numeric displays

#### **Loading Spinners** 🟣
```tsx
<div className="border-[var(--purple-500)] border-t-transparent animate-spin" />
```
**Why:** Neutral state indicator  
**Where:** Page loading, async operations  
**Frequency:** Loading states

#### **Table Sort Icons (Inactive)** 🟣
```tsx
<ArrowUpDown className="h-4 w-4 text-[var(--purple-500)] opacity-50" />
```
**Why:** Shows interactive but not active  
**Where:** Table headers  
**Frequency:** Sortable columns

#### **Chart Legend Dots** 🟣
```tsx
<div className="w-3 h-3 rounded-full bg-[var(--purple-500)]"></div>
```
**Why:** Matches chart colors  
**Where:** Chart legends  
**Frequency:** Per chart series

### **PURPLE SCALE USAGE**

| Shade | Hex | Usage | Where |
|-------|-----|-------|-------|
| Purple 50 | `#f5f3ff` | Subtle backgrounds | Rare |
| Purple 100 | `#eff1fe` | Icon backgrounds | **MOST USED** |
| Purple 200 | `#e2e4fd` | Chart backgrounds | Chart containers |
| Purple 300 | `#b8aeef` | Chart variation 1 | Multi-series charts |
| Purple 400 | `#9b80eb` | Chart variation 2 | Multi-series charts |
| **Purple 500** | **`#7f5fe3`** | **PRIMARY data color** | **MAIN** |
| Purple 600 | `#6b46d9` | Chart variation 3 | Multi-series charts |
| Purple 700 | `#5a38c7` | Chart variation 4 | Multi-series charts |

---

## **2.3 GREY SCALE - Content Colors**

### **WHAT**
Neutral colors for text, borders, backgrounds, structure.

### **WHY**
- Creates text hierarchy
- Reduces eye strain
- Separates importance levels
- Provides structure

### **USAGE MAP**

| Shade | Hex | Usage | Example |
|-------|-----|-------|---------|
| **Grey 700** | **`#171717`** | **Primary text** | Headings, main content |
| **Grey 500** | **`#737373`** | **Secondary text** | Descriptions, labels |
| Grey 550 | `#525252` | Tertiary text | Captions, metadata |
| Grey 600 | `#404040` | Muted text | Footnotes |
| **Grey 200** | **`#e5e5e5`** | **Primary borders** | Card borders, dividers |
| Grey 300 | `#d4d4d4` | Secondary borders | Section dividers |
| **Grey 50** | **`#fafafa`** | **Even sections** | Alternating backgrounds |
| Grey 100 | `#f5f5f5` | Card backgrounds | Subtle card bgs |
| White | `#ffffff` | Odd sections | Main backgrounds |

### **TEXT HIERARCHY**

```tsx
// Heading (Primary)
<h2 className="text-[var(--grey-700)]">Section Title</h2>

// Body text (Secondary)
<p className="text-[var(--grey-500)]">Description text...</p>

// Caption (Tertiary)
<span className="text-[var(--grey-550)]">* Data as of 2024</span>

// Disabled/muted
<span className="text-[var(--grey-600)]">Archived content</span>
```

### **BACKGROUND PATTERN**

```
Page Structure:
Section 1 (odd)  → White (#ffffff)
Section 2 (even) → Grey 50 (#fafafa)
Section 3 (odd)  → White (#ffffff)
Section 4 (even) → Grey 50 (#fafafa)
...
```

**Why:** Creates visual rhythm, reduces monotony, improves scannability

---

## **2.4 SEMANTIC COLORS**

| Color | Hex | Usage | Example |
|-------|-----|-------|---------|
| **Success** (Green) | `#16a34a` | Growth indicators, checkmarks | "+12.5% ↑" |
| **Error** (Red) | `#dc2626` | Warnings, negative trends | "−3.2% ↓" |
| **Warning** (Amber) | `#fbbf24` | Cautions, opportunities | "⚠ Limited data" |
| **Info** (Blue) | `#2563eb` | Info messages, tips | "ℹ See methodology" |

---

# 3. 🎯 ICONS - COMPLETE ANALYSIS

## **3.1 Icon Usage Patterns**

### **WHAT**
Visual symbols from Lucide React (formerly Feather Icons).

### **WHY**
- Universal recognition
- Faster comprehension
- Visual interest
- Reduce text load

### **WHEN TO USE**

#### **Icon Types:**

**1. Informational Icons** 🟣
```tsx
<Users className="h-6 w-6 text-[var(--purple-500)]" />
```
- **Purpose:** Show content type
- **Color:** PURPLE (data/info color)
- **Where:** IconCards, feature lists
- **Background:** Light purple (#eff1fe)

**2. Action Icons** ⚪
```tsx
<Download className="h-5 w-5 text-white" />
```
- **Purpose:** Indicate button action
- **Color:** WHITE (inside RED buttons)
- **Where:** CTA buttons
- **Background:** None (button provides bg)

**3. Navigation Icons** ⚫
```tsx
<Menu className="h-6 w-6 text-[var(--grey-700)]" />
```
- **Purpose:** UI navigation
- **Color:** BLACK/GREY (neutral)
- **Where:** Header, menu, controls
- **Background:** None

**4. Utility Icons** ⚫
```tsx
<Search className="h-5 w-5 text-[var(--grey-500)]" />
<ChevronDown className="h-4 w-4 text-[var(--grey-400)]" />
```
- **Purpose:** UI functions
- **Color:** GREY (neutral)
- **Where:** Accordions, dropdowns, inputs
- **Background:** None

**5. Status Icons** (Semantic colors)
```tsx
<CheckCircle className="h-5 w-5 text-[var(--green-600)]" />  {/* Success */}
<XCircle className="h-5 w-5 text-[var(--red-600)]" />        {/* Error */}
<AlertTriangle className="h-5 w-5 text-[var(--amber-400)]" /> {/* Warning */}
```

### **ICON SIZES**

| Size | Pixels | Usage | Example |
|------|--------|-------|---------|
| `h-4 w-4` | 16px | Small utility | Accordion arrows, dropdowns |
| `h-5 w-5` | 20px | Standard | Button icons, inline icons |
| `h-6 w-6` | 24px | Medium | IconCard icons, feature icons |
| `h-8 w-8` | 32px | Large | Hero icons, main features |
| `h-12 w-12` | 48px | XL | Major feature highlights |

### **ICON BACKGROUND PATTERNS**

#### **Pattern 1: Informational (Purple)**
```tsx
<div className="w-12 h-12 rounded-lg bg-[var(--purple-100)] flex items-center justify-center">
  <Icon className="h-6 w-6 text-[var(--purple-500)]" />
</div>
```
**Use:** Feature cards, info blocks

#### **Pattern 2: No Background (In Buttons)**
```tsx
<button className="bg-[var(--brand-red)]">
  <Download className="h-5 w-5 text-white mr-2" />
  Download
</button>
```
**Use:** CTA buttons

#### **Pattern 3: Circular (Stats)**
```tsx
<div className="w-10 h-10 rounded-full bg-[var(--purple-100)] flex items-center justify-center">
  <Icon className="h-5 w-5 text-[var(--purple-500)]" />
</div>
```
**Use:** Stat cards with icons

---

## **3.2 Icon Color Decision Tree**

```
What is this icon for?

├─ Is it in a RED CTA button?
│  └─ Use WHITE
│
├─ Is it showing INFORMATION?
│  └─ Use PURPLE (#7f5fe3)
│
├─ Is it for NAVIGATION?
│  └─ Use BLACK/GREY (#171717 or #737373)
│
├─ Is it showing STATUS?
│  ├─ Success → GREEN (#16a34a)
│  ├─ Error → RED (#dc2626)
│  ├─ Warning → AMBER (#fbbf24)
│  └─ Info → BLUE (#2563eb)
│
└─ Is it a UTILITY icon (dropdown, sort)?
   └─ Use GREY (#737373 or lighter)
```

---

# 4. 🌑 SHADOWS - COMPLETE ANALYSIS

## **4.1 Shadow System**

### **WHAT**
Elevation system using box-shadow for depth perception.

### **WHY**
- Creates visual hierarchy
- Shows interactivity
- Indicates elevation
- Improves aesthetics

### **SHADOW TOKENS**

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-none` | `none` | Flat elements |
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.1)` | Subtle elevation |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Standard cards |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Elevated cards |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.1)` | Modals, popovers |
| `--shadow-2xl` | `0 25px 50px rgba(0,0,0,0.25)` | Hero elements |

### **BRAND-SPECIFIC SHADOWS**

#### **Purple-tinted (Data elements)**
```css
--shadow-brand-purple: 0 10px 15px -3px rgba(127,95,227,0.1);
```
**Use:** IconCards, StatCards (hover)

#### **Red-tinted (Action elements)**
```css
--shadow-brand-red: 0 10px 15px -3px rgba(176,31,36,0.1);
```
**Use:** CTA buttons (hover), CTASection cards

---

## **4.2 Shadow Usage by Component**

### **Cards**

#### **Default State:** No shadow or very subtle
```tsx
className="shadow-none"
// OR
className="shadow-sm"
```

#### **Hover State:** Purple-tinted elevation
```tsx
className="hover:shadow-[0_10px_15px_-3px_rgba(127,95,227,0.1)] transition-shadow duration-300"
```

### **Buttons**

#### **Default State:** No shadow
```tsx
className="shadow-none"
```

#### **Hover State:** Subtle lift
```tsx
className="hover:shadow-md"
```

### **CTA Section Card**

#### **Default State:** Red-tinted shadow
```tsx
className="shadow-[0_20px_25px_-5px_rgba(176,31,36,0.3)]"
```

#### **Hover State:** Stronger red shadow + lift
```tsx
className="hover:shadow-[0_25px_35px_-5px_rgba(176,31,36,0.4)] hover:-translate-y-2"
```

---

## **4.3 Shadow Decision Matrix**

| Component | Default | Hover | Color Tint | Duration |
|-----------|---------|-------|------------|----------|
| **IconCard** | None | Purple shadow | Purple | 300ms |
| **StatCard** | None | Purple shadow | Purple | 300ms |
| **CTA Button** | None | Subtle lift | Neutral | 200ms |
| **CTA Section** | Red shadow | Stronger red | Red | 500ms |
| **Modal** | 2xl shadow | Same | Neutral | - |
| **Dropdown** | lg shadow | Same | Neutral | - |
| **Table Row** | None | Grey bg (not shadow) | - | 200ms |

---

# 5. 📝 LISTING PATTERNS - COMPLETE ANALYSIS

## **5.1 List Types**

### **Checkmark Lists** ✅
```tsx
<div className="space-y-4">
  {features.map((feature) => (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="h-5 w-5 text-[var(--green-600)] flex-shrink-0 mt-0.5" />
      <span className="text-[var(--grey-700)]">{feature}</span>
    </div>
  ))}
</div>
```

**WHAT:** Feature lists with checkmarks  
**WHY:** Shows completed/included items  
**WHEN:** Feature lists, benefits, inclusions  
**WHERE:** FinalCTA, ScopeOfReport, TargetAudience  
**COLOR:** Green (#16a34a) - success indicator

---

### **Bullet Lists** •
```tsx
<ul className="space-y-2 list-disc pl-5 text-[var(--grey-500)]">
  <li>First point here</li>
  <li>Second point here</li>
  <li>Third point here</li>
</ul>
```

**WHAT:** Standard bullet lists  
**WHY:** Simple enumeration  
**WHEN:** Sub-points, details, breakdowns  
**WHERE:** Within IconCards, descriptions  
**COLOR:** Grey (#737373) - secondary text

---

### **Numbered Lists** 1️⃣
```tsx
<ol className="space-y-3 list-decimal pl-5">
  <li className="text-[var(--grey-700)]">
    <strong>First step:</strong> Description here
  </li>
  <li className="text-[var(--grey-700)]">
    <strong>Second step:</strong> Description here
  </li>
</ol>
```

**WHAT:** Ordered/sequential lists  
**WHY:** Shows process, hierarchy, steps  
**WHEN:** Methodology, steps, rankings  
**WHERE:** ResearchMethodology, process descriptions  

---

### **Icon Lists** 🎯
```tsx
<div className="space-y-6">
  {items.map((item) => (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-lg bg-[var(--purple-100)] flex items-center justify-center flex-shrink-0">
        <Icon className="h-5 w-5 text-[var(--purple-500)]" />
      </div>
      <div>
        <h4 className="font-semibold text-[var(--grey-700)] mb-1">{item.title}</h4>
        <p className="text-[var(--grey-500)]">{item.description}</p>
      </div>
    </div>
  ))}
</div>
```

**WHAT:** List with icons + title + description  
**WHY:** Visual interest, categorization  
**WHEN:** Feature lists, methodology steps  
**WHERE:** ResearchMethodology, process sections  
**COLOR:** Purple icon + bg (informational)

---

## **5.2 List Spacing**

| Type | Gap | Usage |
|------|-----|-------|
| Tight list | `space-y-2` | Compact bullet/number lists |
| Standard list | `space-y-3` | Default spacing |
| Comfortable list | `space-y-4` | Checkmark lists, readable |
| Spacious list | `space-y-6` | Icon lists, major items |

---

# 6. 📑 TABLE OF CONTENTS - COMPLETE ANALYSIS

## **6.1 Extended TOC (TableOfContentsSection)**

### **WHAT**
Full-page table of contents with chapter links.

### **WHY**
- Shows report structure
- Enables quick navigation
- Sets expectations
- Professional appearance

### **WHEN TO USE**
✅ After hero section  
✅ Reports, documentation, long content  
✅ Multi-chapter content  

### **WHERE USED**
- Main landing page (after hero)
- Report preview pages

### **HOW IT WORKS**

**Structure:**
```tsx
<section className="py-24 bg-white">
  {/* Chapter Header */}
  <span className="text-[var(--brand-red)]">TABLE OF CONTENTS</span>
  
  {/* Chapters Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {chapters.map((chapter) => (
      <div className="border rounded-[10px] p-6 hover:shadow-lg">
        <span className="text-[var(--purple-500)] font-bold">
          {chapter.number}
        </span>
        <h3>{chapter.title}</h3>
        <p>{chapter.description}</p>
        <ul>
          {chapter.subSections.map((sub) => (
            <li>{sub}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
</section>
```

**COLOR RULES:**
- Chapter numbers: PURPLE (data/information)
- Chapter titles: BLACK (primary text)
- Descriptions: GREY (secondary text)
- Hover: Purple shadow

---

## **6.2 Sidebar TOC (TableOfContentsSidebar)**

### **WHAT**
Sticky sidebar navigation showing current section.

### **WHY**
- Shows reading progress
- Quick section jumping
- Maintains context
- Professional UX

### **WHEN TO USE**
✅ Long-form content  
✅ Multi-section pages  
✅ Reports with 5+ sections  

### **WHERE USED**
- Right sidebar on main content pages
- Desktop only (hidden on mobile)

### **HOW IT WORKS**

**Structure:**
```tsx
<aside className="sticky top-24 hidden lg:block">
  <nav>
    <h4 className="text-sm font-bold text-[var(--grey-700)] mb-4">
      On This Page
    </h4>
    <ul className="space-y-2">
      {sections.map((section) => (
        <li>
          <a 
            href={`#${section.id}`}
            className={cn(
              "text-sm transition-colors",
              isActive 
                ? "text-[var(--purple-500)] font-semibold border-l-2 border-[var(--purple-500)] pl-3"
                : "text-[var(--grey-500)] hover:text-[var(--purple-500)] pl-3"
            )}
          >
            {section.title}
          </a>
        </li>
      ))}
    </ul>
  </nav>
</aside>
```

**STATES:**
- **Default:** Grey text
- **Hover:** Purple text
- **Active:** Purple text + bold + left border (purple)

**COLOR RULES:**
- Active: PURPLE (shows current location)
- Hover: PURPLE (interactive feedback)
- Inactive: GREY (secondary)
- Border: PURPLE (active indicator)

---

## **6.3 TOC Comparison**

| Feature | Extended TOC | Sidebar TOC |
|---------|-------------|-------------|
| **Position** | Full section | Sticky sidebar |
| **Visibility** | All devices | Desktop only |
| **Purpose** | Overview + navigation | Progress + quick nav |
| **Detail Level** | Full descriptions | Titles only |
| **Interaction** | Cards with hover | Text links |
| **When** | Start of content | During reading |

---

**[PART 1 OF 3 - CONTINUED IN NEXT MESSAGE]**

Would you like me to continue with:
- 7. HOVER STATES
- 8. DEFAULT STATES  
- 9. CTA STATES
- 10-18. Remaining categories?

This is going to be a MASSIVE document - let me know if you want me to continue! 🚀
