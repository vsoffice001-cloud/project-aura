# 🎯 DESIGN SYSTEM MASTER INDEX & QUICK REFERENCE

**Version:** 3.0.0  
**Date:** February 12, 2026  
**Purpose:** Complete quick reference for the KP 2.0 Product Design System

---

## 📑 TABLE OF CONTENTS

1. [Component Decision Trees](#component-decision-trees)
2. [Color Decision Matrix](#color-decision-matrix)
3. [Quick Reference Tables](#quick-reference-tables)
4. [Common Patterns Library](#common-patterns-library)
5. [Real-World Examples](#real-world-examples)
6. [Design System Checklist](#design-system-checklist)

---

# 1. 🌳 COMPONENT DECISION TREES

## **"What component should I use?"**

### **DECISION TREE: Displaying Numbers/Metrics**

```
Do you need to display a number or metric?
│
├─ YES
│  │
│  ├─ Is it part of a list of metrics? (3+)
│  │  │
│  │  ├─ YES
│  │  │  │
│  │  │  ├─ Need icon + label + value?
│  │  │  │  └─ Use: **StatCard** (icon-top variant)
│  │  │  │     Grid: md:grid-cols-3 lg:grid-cols-4
│  │  │  │
│  │  │  └─ Just number + label (no icon)?
│  │  │     └─ Use: **StatCard** (centered variant)
│  │  │        OR **InlineStats** component
│  │  │
│  │  └─ NO (single metric)
│  │     │
│  │     ├─ Need detailed context?
│  │     │  └─ Use: **StatCard** (icon-left variant)
│  │     │
│  │     ├─ Hero/prominent display?
│  │     │  └─ Use: **NumberWidget** (large size)
│  │     │
│  │     └─ Inline with text?
│  │        └─ Use: **Bold span** in body text
│  │
│  └─ Is it a percentage/progress?
│     │
│     ├─ Linear progress?
│     │  └─ Use: **ProgressBar** component
│     │
│     ├─ Circular loading?
│     │  └─ Use: **Spinner** component
│     │
│     └─ Small inline badge?
│        └─ Use: **Badge** component with number
│
└─ NO
   └─ See other decision trees below
```

---

### **DECISION TREE: Displaying Features/Information**

```
Do you need to show features or information blocks?
│
├─ YES
│  │
│  ├─ Is it a list of features? (3+)
│  │  │
│  │  ├─ YES
│  │  │  │
│  │  │  ├─ Need icon + title + description?
│  │  │  │  └─ Use: **IconCard**
│  │  │  │     Grid: md:grid-cols-2 lg:grid-cols-3
│  │  │  │
│  │  │  ├─ Need numbered steps/analysis?
│  │  │  │  └─ Use: **AnalysisCard**
│  │  │  │
│  │  │  └─ Methodology/process steps?
│  │  │     └─ Use: **MethodologyCard**
│  │  │        Grid: md:grid-cols-3
│  │  │
│  │  └─ NO (single feature)
│  │     └─ Use: Simple **div** with icon + text
│  │        OR **IconCard** if emphasis needed
│  │
│  └─ Is it FAQ content?
│     └─ Use: **Accordion** component
│        (FAQ pattern with collapsible items)
│
└─ NO
   └─ See other decision trees
```

---

### **DECISION TREE: Call-to-Action Elements**

```
Do you need a call-to-action?
│
├─ YES
│  │
│  ├─ What priority level?
│  │  │
│  │  ├─ PRIMARY (high conversion priority)
│  │  │  │
│  │  │  ├─ Standard button?
│  │  │  │  └─ Use: **Button variant="cta"**
│  │  │  │     Red gradient, white text
│  │  │  │
│  │  │  ├─ Large section/card?
│  │  │  │  └─ Use: **FinalCTA** pattern
│  │  │  │     Full-width red card with buttons
│  │  │  │
│  │  │  └─ Floating/sticky?
│  │  │     └─ Use: **FloatingCTA** component
│  │  │
│  │  ├─ SECONDARY (supporting action)
│  │  │  └─ Use: **Button variant="outline"**
│  │  │     White bg, grey border
│  │  │     Hover: Red text
│  │  │
│  │  ├─ TERTIARY (minimal)
│  │  │  └─ Use: **Button variant="ghost"**
│  │  │     Transparent, hover: grey bg
│  │  │
│  │  └─ LINK (text only)
│  │     └─ Use: **<a>** tag
│  │        Default: Grey, Hover: Red
│  │
│  └─ Does it need special state?
│     │
│     ├─ Loading state needed?
│     │  └─ Add: disabled + spinner
│     │
│     ├─ Success feedback?
│     │  └─ Change icon + text temporarily
│     │
│     └─ Disabled state?
│        └─ Add: disabled prop
│
└─ NO
   └─ See other decision trees
```

---

### **DECISION TREE: Choosing Colors**

```
What color should this element be?
│
├─ Is it a BRAND/ACTION element?
│  │
│  ├─ YES → Use RED (#b01f24)
│  │  │
│  │  └─ Examples:
│  │     - Chapter headers
│  │     - Primary CTA buttons
│  │     - CTA section backgrounds
│  │     - Link hover states
│  │     - Focus rings
│  │     - Scroll progress bar
│  │
│  └─ NO
│     │
│     ├─ Is it DATA/INFORMATION?
│     │  │
│     │  ├─ YES → Use PURPLE (#7f5fe3)
│     │  │  │
│     │  │  └─ Examples:
│     │  │     - Chart colors
│     │  │     - Stat numbers
│     │  │     - Informational icons
│     │  │     - Icon backgrounds (#eff1fe)
│     │  │     - Data badges
│     │  │     - Progress bars
│     │  │     - TOC links (active)
│     │  │
│     │  └─ NO
│     │     │
│     │     ├─ Is it TEXT content?
│     │     │  │
│     │     │  ├─ Primary text → GREY-700 (#171717)
│     │     │  ├─ Secondary text → GREY-500 (#737373)
│     │     │  ├─ Tertiary text → GREY-550 (#525252)
│     │     │  └─ Disabled text → GREY-400 (#a3a3a3)
│     │     │
│     │     ├─ Is it a BORDER/DIVIDER?
│     │     │  │
│     │     │  ├─ Primary border → GREY-200 (#e5e5e5)
│     │     │  ├─ Secondary border → GREY-300 (#d4d4d4)
│     │     │  └─ Hover border → GREY-400
│     │     │
│     │     ├─ Is it a BACKGROUND?
│     │     │  │
│     │     │  ├─ Odd sections → WHITE (#ffffff)
│     │     │  ├─ Even sections → GREY-50 (#fafafa)
│     │     │  ├─ Card backgrounds → WHITE
│     │     │  └─ Hover backgrounds → GREY-50
│     │     │
│     │     └─ Is it SEMANTIC?
│     │        │
│     │        ├─ Success → GREEN-600 (#16a34a)
│     │        ├─ Error → RED-600 (#dc2626)
│     │        ├─ Warning → AMBER-400 (#fbbf24)
│     │        └─ Info → BLUE-600 (#2563eb)
```

---

# 2. 🎨 COLOR DECISION MATRIX

## **Quick Color Reference by Element Type**

| Element Type | Color | Token | Hex | Why |
|--------------|-------|-------|-----|-----|
| **PRIMARY CTA BUTTON** | Red | `--brand-red-500` | `#b01f24` | Action/conversion |
| **PRIMARY CTA HOVER** | Darker Red | `--brand-red-600` | `#8f181d` | Interactive feedback |
| **CHAPTER HEADER** | Red | `--brand-red-500` | `#b01f24` | Brand identity |
| **CHART PRIMARY COLOR** | Purple | `--data-purple-500` | `#7f5fe3` | Data visualization |
| **STAT NUMBERS** | Purple | `--data-purple-500` | `#7f5fe3` | Informational data |
| **ICON (informational)** | Purple | `--data-purple-500` | `#7f5fe3` | Info, not action |
| **ICON BACKGROUND** | Light Purple | `--data-purple-100` | `#eff1fe` | Subtle emphasis |
| **ICON (in CTA button)** | White | `--white` | `#ffffff` | Contrast on red |
| **HEADING TEXT** | Black | `--grey-700` | `#171717` | Primary text |
| **BODY TEXT** | Grey | `--grey-500` | `#737373` | Secondary text |
| **CARD BORDER** | Light Grey | `--grey-200` | `#e5e5e5` | Subtle separation |
| **CARD BORDER (hover)** | Mid Grey | `--grey-300` | `#d4d4d4` | Interactive feedback |
| **EVEN SECTION BG** | Light Grey | `--grey-50` | `#fafafa` | Alternating pattern |
| **ODD SECTION BG** | White | `--white` | `#ffffff` | Alternating pattern |
| **LINK (default)** | Black | `--grey-700` | `#171717` | Standard text |
| **LINK (hover)** | Red | `--brand-red-500` | `#b01f24` | Action indicator |
| **TOC LINK (active)** | Purple | `--data-purple-500` | `#7f5fe3` | Navigation, not action |
| **FOCUS RING** | Red | `--brand-red-500` | `#b01f24` | Accessibility |
| **SHADOW (card hover)** | Purple-tinted | rgba(127,95,227,0.1) | - | Data element |
| **SHADOW (CTA card)** | Red-tinted | rgba(176,31,36,0.3) | - | Action element |
| **SUCCESS STATE** | Green | `--green-600` | `#16a34a` | Positive feedback |
| **ERROR STATE** | Red | `--red-600` | `#dc2626` | Alert/danger |
| **WARNING STATE** | Amber | `--amber-400` | `#fbbf24` | Caution |
| **INFO STATE** | Blue | `--blue-600` | `#2563eb` | Information |

---

# 3. 📊 QUICK REFERENCE TABLES

## **Component Properties Quick Reference**

### **StatCard Variants**

| Variant | Layout | Use Case | Icon BG | Hover Shadow |
|---------|--------|----------|---------|--------------|
| **icon-left** | Horizontal | Default, detailed stats | ✅ Yes | ✅ Yes |
| **icon-top** | Vertical centered | Grid layouts, featured | ✅ Yes | ✅ Yes |
| **inline** | Compact horizontal | Stat rows, dense layouts | ❌ No | ❌ No |
| **centered** | Simple centered | Minimal displays | ❌ No | ❌ No |

---

### **Button Variants**

| Variant | Background | Text | Border | Use Case |
|---------|------------|------|--------|----------|
| **cta** | Red gradient | White | None | Primary action |
| **outline** | White | Black→Red(hover) | Grey→Darker(hover) | Secondary action |
| **ctaBlack** | Black | White | None | Active methodology step |
| **ghost** | Transparent | Grey | None | Minimal interaction |
| **link** | None | Red underline | None | Text link |

---

### **Typography Scale**

| Element | Size | Weight | Font | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| **h1** (page title) | 56px | 400 | Noto Serif | 1.25 | Grey-700 |
| **h2** (section) | 48px | 400 | Noto Serif | 1.25 | Grey-700 |
| **h3** (subsection) | 25-32px | 400 | DM Sans | 1.375 | Grey-700 |
| **h4** (card title) | 18-24px | 600 | DM Sans | 1.5 | Grey-700 |
| **Chapter Header** | 13px | 700 | DM Sans | - | RED |
| **Body Text** | 14px | 400 | DM Sans | 1.625 | Grey-500 |
| **Stat Number** | 26-40px | 700 | DM Sans | 1.0 | PURPLE |
| **Small Text** | 13px | 400 | DM Sans | 1.5 | Grey-550 |

---

### **Grid Patterns**

| Grid Type | Mobile | Tablet | Desktop | Gap | Use Case |
|-----------|--------|--------|---------|-----|----------|
| **2-Column** | 1 col | 2 cols | 2 cols | 24px | TOC, comparisons |
| **3-Column** | 1 col | 2 cols | 3 cols | 24px | Features, methodology |
| **4-Column** | 1 col | 2 cols | 4 cols | 24px | Stats, metrics |
| **Auto-Fit** | Dynamic | Dynamic | Dynamic | 24px | Variable content |

---

### **Spacing Scale**

| Token | Pixels | Common Usage |
|-------|--------|--------------|
| `space-2` | 8px | Tight lists, micro spacing |
| `space-3` | 12px | Standard lists |
| `space-4` | 16px | Card padding, small gaps |
| **`space-6`** | **24px** | **Default grid gap** ✅ |
| `space-8` | 32px | Large padding |
| `space-12` | 48px | Large margins |
| `space-16` | 64px | Section internal gaps |
| **`space-24`** | **96px** | **Section Y padding (mobile)** ✅ |
| **`space-32`** | **128px** | **Section Y padding (desktop)** ✅ |

---

### **Shadow Scale**

| Shadow Type | Value | Use Case |
|-------------|-------|----------|
| **None** | `none` | Default state |
| **sm** | `0 1px 3px rgba(0,0,0,0.1)` | Subtle elevation |
| **md** | `0 4px 6px rgba(0,0,0,0.1)` | Standard cards |
| **lg** | `0 10px 15px rgba(0,0,0,0.1)` | Elevated elements |
| **Purple (brand)** | `0 10px 15px rgba(127,95,227,0.1)` | Card hover (info) |
| **Red (brand)** | `0 10px 15px rgba(176,31,36,0.1)` | CTA hover (action) |

---

# 4. 📚 COMMON PATTERNS LIBRARY

## **Pattern 1: Section Structure (Standard)**

```tsx
<section className="py-24 lg:py-32 bg-white relative overflow-hidden">
  {/* Optional: Dot pattern background */}
  <div
    className="absolute inset-0"
    style={{
      opacity: 'var(--pattern-opacity)',
      backgroundImage: `radial-gradient(circle at var(--pattern-dot-position) var(--pattern-dot-position), hsl(var(--foreground)) var(--pattern-dot-size), transparent 0)`,
      backgroundSize: `var(--pattern-grid-size) var(--pattern-grid-size)`
    }}
  />
  
  <div className="max-w-7xl mx-auto px-[84.375px] lg:px-[112.5px] relative">
    {/* Section Header */}
    <div className="mb-16">
      <div className="mb-4">
        <span className="text-[var(--brand-red)] font-bold tracking-widest uppercase text-sm">
          CHAPTER 8 - Title
        </span>
      </div>
      <h2 className="font-display text-4xl tracking-tight mb-6 text-foreground">
        Section Heading
      </h2>
      <p className="text-base leading-relaxed max-w-3xl text-[var(--black-500)]">
        Description text...
      </p>
    </div>
    
    {/* Section Content */}
    <div className="grid md:grid-cols-3 gap-6">
      {/* Cards or content */}
    </div>
  </div>
</section>
```

**CHECKLIST:**
- [ ] Alternating background (white/grey-50)
- [ ] Standard padding: `py-24 lg:py-32`
- [ ] Horizontal padding: `px-[84.375px] lg:px-[112.5px]`
- [ ] Max width: `max-w-7xl`
- [ ] Chapter header in RED
- [ ] Section heading in Noto Serif
- [ ] Description max-width: `max-w-3xl`
- [ ] Header margin: `mb-16`

---

## **Pattern 2: Feature Grid (3 Columns)**

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {features.map((feature, index) => (
    <IconCard
      key={index}
      icon={<feature.icon className="h-6 w-6" />}
      title={feature.title}
      description={feature.description}
    />
  ))}
</div>
```

**USE WHEN:**
- 3+ feature items
- Icon + title + description
- Need hover states
- Professional layout

---

## **Pattern 3: Stats Grid (4 Columns)**

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {stats.map((stat, index) => (
    <StatCard
      key={index}
      variant="icon-top"
      icon={<stat.icon className="h-5 w-5" />}
      label={stat.label}
      value={stat.value}
      subtitle={stat.subtitle}
    />
  ))}
</div>
```

**USE WHEN:**
- Multiple metrics (4+)
- Need visual icons
- Prominent display
- Dashboard-style

---

## **Pattern 4: FAQ Accordion**

```tsx
<Accordion type="single" collapsible className="space-y-4">
  {faqs.map((faq, index) => (
    <AccordionItem
      key={index}
      value={`item-${index + 1}`}
      className="bg-white border border-[var(--black-100)] rounded-[10px] px-6 hover:border-[var(--black-300)] transition-all duration-300 !border-b-[1px]"
    >
      <AccordionTrigger className="text-base text-foreground font-bold text-left hover:no-underline py-5">
        {faq.question}
      </AccordionTrigger>
      <AccordionContent className="text-sm leading-relaxed pb-5 text-[var(--black-500)]">
        {faq.answer}
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
```

**USE WHEN:**
- FAQ content
- Long lists of Q&A
- Optional details
- Space conservation

---

## **Pattern 5: Primary CTA Section**

```tsx
<section className="py-24 lg:py-32 bg-white relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-[67.5px] lg:px-[90px] relative">
    <Card className="relative bg-gradient-to-r from-[var(--brand-red-active)] via-[var(--brand-red)] to-[var(--red-500)] p-6 rounded-[var(--radius-md)] shadow-[0_20px_25px_-5px_rgba(176,31,36,0.3)] hover:shadow-[0_25px_35px_-5px_rgba(176,31,36,0.4)] hover:-translate-y-2 transition-all duration-500">
      
      {/* Decorative shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 w-12 h-12 border-2 border-white rounded-full"></div>
        <div className="absolute top-14 right-8 w-8 h-8 border border-white rounded-lg rotate-45"></div>
      </div>
      
      <CardContent className="p-0 relative z-10">
        <h2 className="mt-2 text-[24px] leading-tight tracking-tight text-white">
          Compelling CTA Headline
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed text-white/90">
          Description explaining value proposition...
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Button variant="cta" size="lg" className="bg-white text-[var(--brand-red)] hover:bg-white/95">
            Primary Action
          </Button>
          <Button variant="outline" size="lg" className="border-2 border-white text-white hover:text-white bg-white/20 hover:bg-transparent">
            Secondary Action
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</section>
```

**USE WHEN:**
- Final conversion moment
- High-priority CTA
- End of long content
- Need maximum impact

---

## **Pattern 6: Methodology/Process Steps**

```tsx
{/* Step Navigation */}
<div className="flex items-center justify-center gap-2 mb-16">
  {steps.map((step, index) => (
    <div key={step.id} className="flex items-center">
      <Button
        variant={activeStep === step.id ? 'ctaBlack' : 'outline'}
        onClick={() => setActiveStep(step.id)}
      >
        <span className="size-6 rounded-full flex items-center justify-center text-xs font-bold">
          {step.number}
        </span>
        <span className="hidden sm:inline">{step.label}</span>
      </Button>
      {index < steps.length - 1 && (
        <ChevronRight className="h-5 w-5 text-[var(--black-300)] mx-2" />
      )}
    </div>
  ))}
</div>

{/* Methodology Cards */}
<div className="grid md:grid-cols-3 gap-4 lg:gap-5">
  {methodologies.map((methodology, index) => (
    <MethodologyCard
      key={index}
      icon={methodology.icon}
      title={methodology.title}
      description={methodology.description}
      items={methodology.items}
      isActive={activeStep === index}
      onClick={() => setActiveStep(index)}
    />
  ))}
</div>
```

**USE WHEN:**
- Research methodology
- Process explanation
- Step-by-step guide
- Interactive navigation

---

# 5. 💼 REAL-WORLD EXAMPLES

## **Example 1: Market Overview Section**

```tsx
<section className="py-24 lg:py-32 bg-white">
  <div className="max-w-7xl mx-auto px-[84.375px] lg:px-[112.5px]">
    {/* Header */}
    <div className="mb-16">
      <div className="mb-4">
        <span className="text-[var(--brand-red)] font-bold tracking-widest uppercase text-sm">
          CHAPTER 2 - MARKET OVERVIEW
        </span>
      </div>
      <h2 className="font-display text-4xl tracking-tight mb-6">
        Qatar Fresh Herbs Market Analysis
      </h2>
      <p className="text-base leading-relaxed max-w-3xl text-[var(--black-500)]">
        Comprehensive analysis of market size, growth drivers, and regional dynamics 
        shaping the Qatar fresh herbs industry.
      </p>
    </div>
    
    {/* Key Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <StatCard
        variant="icon-top"
        icon={<DollarSign className="h-5 w-5" />}
        label="Market Size"
        value="$150M"
        subtitle="2024 Estimate"
      />
      <StatCard
        variant="icon-top"
        icon={<TrendingUp className="h-5 w-5" />}
        label="CAGR"
        value="8.5%"
        subtitle="2025-2030"
      />
      <StatCard
        variant="icon-top"
        icon={<Users className="h-5 w-5" />}
        label="Key Players"
        value="25+"
        subtitle="Active Companies"
      />
      <StatCard
        variant="icon-top"
        icon={<MapPin className="h-5 w-5" />}
        label="Main Market"
        value="Doha"
        subtitle="75% Share"
      />
    </div>
    
    {/* Content paragraphs */}
    <div className="prose max-w-none">
      <p className="text-base leading-relaxed text-[var(--black-500)]">
        The Qatar fresh herbs market has demonstrated <span className="font-bold text-[var(--grey-700)]">consistent growth</span> 
        over the past five years, driven by increasing health consciousness among residents and the 
        expansion of the food services sector...
      </p>
    </div>
  </div>
</section>
```

---

## **Example 2: Regional Comparison (Features Grid)**

```tsx
<section className="py-24 lg:py-32 bg-[var(--black-50)]">
  <div className="max-w-7xl mx-auto px-[84.375px] lg:px-[112.5px]">
    {/* Header */}
    <div className="mb-16">
      <div className="mb-4">
        <span className="text-[var(--brand-red)] font-bold tracking-widest uppercase text-sm">
          CHAPTER 5 - REGIONAL ANALYSIS
        </span>
      </div>
      <h2 className="font-display text-4xl tracking-tight mb-6">
        Regional Market Breakdown
      </h2>
      <p className="text-base leading-relaxed max-w-3xl text-[var(--black-500)]">
        Analysis of consumption patterns, growth trends, and market dynamics across 
        Qatar's major urban centers.
      </p>
    </div>
    
    {/* Regions Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <IconCard
        icon={<MapPin className="h-6 w-6" />}
        title="Doha (Capital)"
      >
        <div className="space-y-4">
          <p className="text-base text-[var(--black-500)]">
            Dominates with <span className="font-bold text-[var(--grey-700)]">75% market share</span>, 
            driven by high population density and concentration of restaurants.
          </p>
          <ul className="space-y-2 list-disc pl-5 text-sm text-[var(--black-500)]">
            <li>1,500+ restaurants and hotels</li>
            <li>Growing organic produce demand</li>
            <li>Premium market segment presence</li>
          </ul>
        </div>
      </IconCard>
      
      <IconCard
        icon={<Building2 className="h-6 w-6" />}
        title="Al Rayyan"
      >
        <div className="space-y-4">
          <p className="text-base text-[var(--black-500)]">
            Secondary market with <span className="font-bold text-[var(--grey-700)]">15% share</span>, 
            showing rapid growth due to residential expansion.
          </p>
          <ul className="space-y-2 list-disc pl-5 text-sm text-[var(--black-500)]">
            <li>Growing suburban population</li>
            <li>Emerging retail presence</li>
            <li>Family-oriented consumption</li>
          </ul>
        </div>
      </IconCard>
      
      <IconCard
        icon={<Home className="h-6 w-6" />}
        title="Al Wakrah"
      >
        <div className="space-y-4">
          <p className="text-base text-[var(--black-500)]">
            Emerging market with <span className="font-bold text-[var(--grey-700)]">10% share</span>, 
            driven by new residential developments.
          </p>
          <ul className="space-y-2 list-disc pl-5 text-sm text-[var(--black-500)]">
            <li>New infrastructure projects</li>
            <li>Growing retail infrastructure</li>
            <li>Local production initiatives</li>
          </ul>
        </div>
      </IconCard>
    </div>
  </div>
</section>
```

---

## **Example 3: Complete CTA Section**

```tsx
<section className="py-24 lg:py-32 bg-white relative overflow-hidden">
  {/* Dot pattern background */}
  <div
    className="absolute inset-0"
    style={{
      opacity: 'var(--pattern-opacity)',
      backgroundImage: `radial-gradient(circle at var(--pattern-dot-position) var(--pattern-dot-position), hsl(var(--foreground)) var(--pattern-dot-size), transparent 0)`,
      backgroundSize: `var(--pattern-grid-size) var(--pattern-grid-size)`
    }}
  />
  
  <div className="max-w-7xl mx-auto px-[67.5px] lg:px-[90px] relative">
    <Card className="relative bg-gradient-to-r from-[var(--brand-red-active)] via-[var(--brand-red)] to-[var(--red-500)] hover:bg-gradient-to-br border-0 p-6 rounded-[var(--radius-md)] overflow-hidden shadow-[0_20px_25px_-5px_rgba(176,31,36,0.3),0_8px_10px_-6px_rgba(176,31,36,0.2)] transition-all duration-500 hover:shadow-[0_25px_35px_-5px_rgba(176,31,36,0.4),0_12px_15px_-6px_rgba(176,31,36,0.3)] hover:-translate-y-2">
      
      {/* Decorative geometric shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 w-12 h-12 border-2 border-white rounded-full"></div>
        <div className="absolute top-14 right-8 w-8 h-8 border border-white rounded-lg rotate-45"></div>
        <div className="absolute bottom-8 left-12 w-6 h-6 border border-white rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-3 h-3 border border-white rounded-full"></div>
      </div>
      
      <CardContent className="p-0 relative z-10">
        <h2 className="mt-2 text-[24px] leading-tight tracking-tight text-white">
          Ready to unlock complete market insights?
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed text-white/90">
          Get access to the full report with detailed segmentation, competitive analysis, 
          and growth forecasts—plus a complimentary analyst consultation to discuss your 
          market entry strategy.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mt-6">
          <Button 
            variant="cta" 
            size="lg" 
            className="bg-white text-[var(--brand-red)] hover:bg-white/95 hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            <Download className="h-5 w-5" />
            Download Full Report
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-white text-white hover:text-white bg-white/20 hover:bg-transparent backdrop-blur-sm hover:scale-[1.02] transition-all shadow-[0_0_0_1px_rgba(255,255,255,0.5)]"
          >
            <Calendar className="h-5 w-5" />
            Schedule Consultation
          </Button>
        </div>
        
        {/* Trust indicators */}
        <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/20">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-white" />
            <span className="text-sm text-white/90">500+ Market Reports</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-white" />
            <span className="text-sm text-white/90">Trusted by 200+ Enterprises</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</section>
```

---

**[CONTINUED IN NEXT FILE - PART 4]**

This is getting comprehensive! Should I continue with:
- Design System Checklist
- Migration Guide
- Component Testing Guide
- Accessibility Guide
- Performance Best Practices

Let me know if you want me to continue! 🚀
