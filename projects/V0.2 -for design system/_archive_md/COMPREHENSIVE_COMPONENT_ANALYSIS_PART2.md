# 🎯 COMPREHENSIVE DESIGN SYSTEM COMPONENT ANALYSIS - PART 2

**Continuation of Part 1**  
**Focus:** Hover States, CTA States, Typography, Gradients, Grids

---

# 7. 🖱️ HOVER STATES - COMPLETE ANALYSIS

## **7.1 Card Hover States**

### **IconCard & StatCard**

#### **Default → Hover Transition**
```tsx
className="hover:shadow-[0_10px_15px_-3px_rgba(127,95,227,0.1),0_4px_6px_-4px_rgba(127,95,227,0.08)] transition-shadow duration-300"
```

**WHAT CHANGES:**
- ✅ Shadow appears (purple-tinted)
- ❌ Background stays same
- ❌ Border stays same
- ❌ Content stays same

**WHY PURPLE SHADOW:**
- Cards contain informational content
- Purple = data/information color
- Consistent with content purpose

**TIMING:**
- Duration: `300ms`
- Easing: Default ease
- Property: `shadow` only

---

### **InlineStats Cards**

#### **Default → Hover**
```tsx
// Default
className="bg-[#fafafa] border border-[#f5f5f5]"

// Hover
className="hover:bg-[#f5f5f5] transition-colors duration-300"
```

**WHAT CHANGES:**
- ✅ Background darkens slightly (grey-50 → grey-100)
- ❌ No shadow
- ❌ Border stays same

**WHY:**
- Subtle feedback
- Maintains minimalist aesthetic
- No distraction from data

---

### **MethodologyCard**

#### **Default**
```tsx
className="bg-white border border-[var(--black-200)] rounded-[var(--radius-md)]"
```

#### **Hover**
```tsx
className="hover:shadow-[var(--shadow-brand-purple)] transition-all duration-300"
```

#### **Active State** (when clicked)
```tsx
className={isActive ? 'border-[var(--purple-500)] border-2' : 'border-[var(--black-200)]'}
```

**WHAT CHANGES:**
- Default: Light grey border, no shadow
- Hover: Purple shadow appears
- Active: Purple border (2px), no shadow change

---

## **7.2 Button Hover States**

### **Primary CTA (Red Button)**

#### **Default → Hover**
```tsx
// Default
className="bg-[var(--brand-red-500)] text-white"

// Hover
className="hover:bg-[var(--brand-red-600)] transition-colors duration-200"
```

**COLOR VALUES:**
- Default: `#b01f24` (brand-red-500)
- Hover: `#8f181d` (brand-red-600)
- Change: ~12% darker

**ADDITIONAL EFFECTS:**
```tsx
// Can also include scale
className="hover:scale-[1.02] transition-all duration-200"

// Or shadow
className="hover:shadow-lg"
```

---

### **Outline Button**

#### **Default → Hover**
```tsx
// Default
className="border border-[var(--black-200)] bg-white text-foreground"

// Hover  
className="hover:bg-[var(--black-50)] hover:text-[var(--brand-red)] hover:border-[var(--black-300)]"
```

**WHAT CHANGES:**
- Border: Grey-200 → Grey-300 (slightly darker)
- Background: White → Grey-50 (subtle fill)
- Text: Black → RED (brand color emphasis)
- Icon color: Inherits text color (also turns RED)

**WHY RED TEXT ON HOVER:**
- Signals interactivity
- Brand presence
- Call to action feedback

---

### **CTA Black Button**

#### **Default → Hover**
```tsx
// Default
className="bg-[var(--black)] text-white"

// Hover
className="hover:bg-[var(--black-900)]"
```

**USAGE:**
- Methodology section step buttons
- When active: stays black with forced hover
- When inactive: outline style

---

### **Ghost Button**

#### **Default → Hover**
```tsx
// Default
className="bg-transparent"

// Hover
className="hover:bg-[var(--black-50)] hover:text-foreground"
```

**USAGE:**
- Subtle actions
- Navigation items
- Secondary interactions

---

## **7.3 Link Hover States**

### **Text Links**

#### **Default → Hover**
```tsx
// Default
className="text-[var(--grey-700)]"

// Hover
className="hover:text-[var(--brand-red)] transition-colors duration-200"
```

**WHY RED:**
- Action indicator
- Brand presence
- Universal link convention

---

### **TOC Sidebar Links**

#### **Inactive Default**
```tsx
className="text-[var(--grey-500)] pl-3"
```

#### **Inactive Hover**
```tsx
className="hover:text-[var(--purple-500)] transition-colors"
```

#### **Active State**
```tsx
className="text-[var(--purple-500)] font-semibold border-l-2 border-[var(--purple-500)] pl-3"
```

**WHY PURPLE:**
- Navigation is informational
- Matches TOC chapter numbers (purple)
- Not an action (not red)

---

### **Table Row Hover**

#### **Default → Hover**
```tsx
// Default
className="border-b border-[var(--grey-200)]"

// Hover
className="hover:bg-[var(--grey-50)] transition-colors duration-200"
```

**NO SHADOW** - just background change
**WHY:** Subtle, doesn't compete with data

---

## **7.4 Accordion Hover**

### **FAQSection AccordionItem**

#### **Default → Hover**
```tsx
// Default
className="border border-[var(--black-100)]"

// Hover  
className="hover:border-[var(--black-300)] transition-all duration-300"
```

**WHAT CHANGES:**
- Border color darkens
- No shadow
- No background change

**TRIGGER HOVER:**
```tsx
className="hover:no-underline"  // Prevents default underline
```

---

## **7.5 Input Hover & Focus**

### **Default State**
```tsx
className="border border-[var(--grey-200)] bg-white"
```

### **Hover State**
```tsx
className="hover:border-[var(--grey-400)]"
```

### **Focus State** (Most Important)
```tsx
className="focus:ring-[var(--brand-red-500)] focus:ring-2 focus:border-[var(--brand-red-500)]"
```

**WHY RED FOCUS:**
- Brand consistency
- Accessibility standard
- Action indicator (user is interacting)

---

# 8. 📋 DEFAULT STATES - COMPLETE ANALYSIS

## **8.1 Button Default States**

### **Primary CTA**
```tsx
<Button variant="cta">
  Download Report
</Button>
```

**PROPERTIES:**
- Background: Red gradient `from-[var(--brand-red)] to-[var(--red-500)]`
- Text: White
- Shadow: Red-tinted `var(--shadow-brand-red)`
- Border: None (0)
- Padding: `h-12 px-6`
- Radius: `rounded-md`
- Font: `font-medium text-sm`

---

### **Outline Button**
```tsx
<Button variant="outline">
  Learn More
</Button>
```

**PROPERTIES:**
- Background: White
- Text: Grey-700 (primary text)
- Border: Grey-200 (1px)
- Padding: `h-12 px-6`
- Radius: `rounded-md`

---

### **Disabled State** (All Buttons)
```tsx
<Button disabled>
  Unavailable
</Button>
```

**PROPERTIES:**
- Opacity: `50%`
- Pointer events: `none`
- Cursor: Not allowed (automatic)
- All colors maintained but faded

---

## **8.2 Card Default States**

### **StatCard (icon-left variant)**
```tsx
<StatCard
  variant="icon-left"
  icon={<Icon />}
  label="Label"
  value="Value"
/>
```

**DEFAULT APPEARANCE:**
- Background: White
- Border: Light grey (#f5f5f5), 1px
- Padding: `p-4`
- Radius: `rounded-[10px]`
- Icon background: Light purple (#eff1fe)
- Icon color: Purple (#6D52D9)
- Value color: Black (#171717), bold
- Label color: Grey (#737373)
- Shadow: None

---

### **IconCard**
```tsx
<IconCard
  icon={<Icon />}
  title="Title"
  description="Description"
/>
```

**DEFAULT APPEARANCE:**
- Background: White
- Border: Grey-200, 1px
- Padding: `p-4`
- Radius: `rounded-[var(--radius-md)]` (10px)
- Icon background: Purple-100 (#eff1fe)
- Icon color: Purple-500 (#7f5fe3)
- Icon size: 40px container (w-10 h-10)
- Title: Black (#171717), font-weight 400
- Description: Grey (#737373)
- Shadow: None

---

## **8.3 Input Default States**

### **Text Input**
```tsx
<input className="..." />
```

**DEFAULT APPEARANCE:**
- Background: White
- Border: Grey-200, 1px
- Text: Grey-700 (primary text)
- Placeholder: Grey-400
- Padding: Standard input padding
- Radius: `rounded-md`
- Height: `h-10` or `h-12`

---

## **8.4 Section Default States**

### **Odd Sections (1, 3, 5...)**
- Background: White (`#ffffff`)
- Padding: `py-24 lg:py-32 px-[84.375px] lg:px-[112.5px]`

### **Even Sections (2, 4, 6...)**
- Background: Grey-50 (`#fafafa`)
- Padding: Same as odd

### **CTA Section (Special)**
- Background: Red gradient
- Padding: Same structure
- Text: White/inverse colors

---

# 9. 🎯 CTA STATES - COMPLETE ANALYSIS

## **9.1 Primary CTA States**

### **State 1: Default (Idle)**
```tsx
<Button 
  variant="cta"
  className="bg-gradient-to-br from-[var(--brand-red)] to-[var(--red-500)] text-white shadow-[var(--shadow-brand-red)]"
>
  <Download className="h-5 w-5" />
  Download Report
</Button>
```

**VISUAL:**
- Red gradient background
- White text
- Red-tinted shadow
- Icon: white, 20px

---

### **State 2: Hover**
```tsx
className="hover:shadow-[var(--shadow-brand-red-hover)] hover:scale-[1.02] transition-all"
```

**VISUAL CHANGES:**
- Shadow intensifies (more pronounced red tint)
- Slight scale up (2%)
- No color change
- Duration: 200ms

---

### **State 3: Active (Click/Press)**
```tsx
className="active:scale-[0.98] active:shadow-inner"
```

**VISUAL:**
- Scale down (pressed effect)
- Inner shadow
- Very brief (automatic browser timing)

---

### **State 4: Focus (Keyboard)**
```tsx
className="focus-visible:ring-[var(--brand-red-500)] focus-visible:ring-3"
```

**VISUAL:**
- Red focus ring (3px)
- 20% opacity
- Accessibility indicator

---

### **State 5: Loading**
```tsx
<Button variant="cta" disabled>
  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
  Downloading...
</Button>
```

**VISUAL:**
- Spinner replaces icon
- Text changes
- Button disabled (50% opacity)
- Pointer events disabled

---

### **State 6: Success (After Action)**
```tsx
<Button variant="cta">
  <CheckCircle className="h-5 w-5" />
  Downloaded!
</Button>
```

**VISUAL:**
- Icon changes to checkmark
- Text confirms action
- Could show green variant (optional)
- Brief display (2-3 seconds)
- Then returns to default or hides

---

### **State 7: Disabled**
```tsx
<Button variant="cta" disabled>
  <Download className="h-5 w-5" />
  Download Report
</Button>
```

**VISUAL:**
- Opacity: 50%
- Cursor: not-allowed
- No hover effects
- No click events

---

## **9.2 Secondary CTA States** (Outline)

### **Default**
```tsx
<Button variant="outline">
  Learn More
</Button>
```

**VISUAL:**
- White background
- Grey border
- Black text

---

### **Hover**
```tsx
className="hover:bg-[var(--black-50)] hover:text-[var(--brand-red)] hover:border-[var(--black-300)]"
```

**VISUAL CHANGES:**
- Background: White → Grey-50
- Text: Black → RED
- Border: Grey-200 → Grey-300
- Icon color: Inherits text (RED)

---

### **Other States**
- **Active:** Scale down
- **Focus:** Red focus ring
- **Loading:** Spinner + disabled
- **Disabled:** 50% opacity

---

## **9.3 CTA Section Card States**

### **Default**
```tsx
className="shadow-[0_20px_25px_-5px_rgba(176,31,36,0.3),0_8px_10px_-6px_rgba(176,31,36,0.2)]"
```

**VISUAL:**
- Red gradient background
- Strong red shadow
- White text
- Decorative shapes (10% opacity)

---

### **Hover**
```tsx
className="hover:shadow-[0_25px_35px_-5px_rgba(176,31,36,0.4),0_12px_15px_-6px_rgba(176,31,36,0.3)] hover:-translate-y-2 transition-all duration-500"
```

**VISUAL CHANGES:**
- Shadow intensifies (stronger red)
- Card lifts up (-8px translateY)
- Smooth 500ms transition
- Creates dramatic elevation effect

---

## **9.4 Floating CTA States**

*(If FloatingCTA component exists)*

### **Default (Hidden)**
- Opacity: 0
- Transform: translateY(20px)
- Pointer events: none

### **Visible (On Scroll)**
- Opacity: 1
- Transform: translateY(0)
- Transition: 300ms ease-out

### **Hover**
- Scale: 1.05
- Shadow: Enhanced

---

# 10. 📝 TYPOGRAPHY SYSTEM - COMPLETE ANALYSIS

## **10.1 Font Families**

### **Primary: DM Sans** (Body & Most Headings)
```css
--font-sans: 'DM Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
```

**USAGE:**
- ✅ All body text
- ✅ UI elements
- ✅ h3, h4, h5, h6
- ✅ Buttons
- ✅ Labels
- ✅ Captions

**WHY:**
- Modern, clean
- Excellent readability
- Professional
- Great for UI

---

### **Display: Noto Serif** (Top-Level Only)
```css
--font-display: 'Noto Serif', Georgia, Cambria, 'Times New Roman', Times, serif;
```

**USAGE:**
- ✅ h1 only (page titles)
- ✅ h2 only (section headings)
- ❌ NOT for body text
- ❌ NOT for UI elements

**WHY:**
- Editorial feel
- Sophistication
- Hierarchy distinction
- Professional reports

**CLASS:**
```tsx
<h1 className="font-display text-[48px]">
<h2 className="font-display text-4xl">
```

---

### **Monospace** (Rare)
```css
--font-mono: Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
```

**USAGE:**
- Code snippets
- Technical data
- Rarely used in this system

---

## **10.2 Font Size Scale**

### **Complete Scale (from theme.css)**

| Token | Pixels | Rem | Usage |
|-------|--------|-----|-------|
| `--text-3xs` | 10px | 0.625rem | Micro labels |
| `--text-2xs` | 11px | 0.6875rem | Tiny text |
| `--text-xs` | 12px | 0.75rem | Small labels |
| `--text-sm` | 13px | 0.8125rem | **Chapter headers** |
| `--text-base` | **14px** | 0.875rem | **Body text** (MAIN) |
| `--text-md` | 16px | 1rem | Larger body |
| `--text-lg` | 18px | 1.125rem | StatCard values |
| `--text-xl` | 20px | 1.25rem | h5 |
| `--text-2xl` | 24px | 1.5rem | h4 |
| `--text-3xl` | 30px | 1.875rem | Subheadings |
| `--text-4xl` | **32px** | 2rem | **h3** |
| `--text-5xl` | 36px | 2.25rem | Large headings |
| `--text-display-sm` | 40px | 2.5rem | Small display |
| `--text-display` | **48px** | 3rem | **h2** |
| `--text-display-lg` | **56px** | 3.5rem | **h1** |
| `--text-display-xl` | 64px | 4rem | Hero titles |

---

## **10.3 Typography Usage Map**

### **Chapter Headers**
```tsx
<span className="text-[13px] font-bold uppercase tracking-widest text-[var(--brand-red)]">
  CHAPTER 8 - Competitive Landscape
</span>
```
- **Size:** 13px (text-sm)
- **Weight:** Bold (700)
- **Transform:** Uppercase
- **Tracking:** Widest (0.1em)
- **Color:** RED
- **Font:** DM Sans

---

### **H1 - Page Title**
```tsx
<h1 className="font-display text-[48px] leading-tight text-[var(--grey-700)]">
  Market Analysis Report
</h1>
```
- **Size:** 48px (text-display)
- **Weight:** 400 (regular)
- **Line-height:** 1.25 (tight)
- **Color:** Grey-700
- **Font:** Noto Serif
- **Tracking:** -0.02em (tight)

---

### **H2 - Section Heading**
```tsx
<h2 className="font-display text-4xl tracking-tight text-foreground">
  Research Methodology
</h2>
```
- **Size:** 36-40px (text-4xl or text-display)
- **Weight:** 400
- **Line-height:** 1.25 (tight)
- **Color:** Grey-700
- **Font:** Noto Serif

---

### **H3 - Subsection**
```tsx
<h3 className="text-[25px] font-normal text-[var(--grey-700)]">
  Regional Breakdown
</h3>
```
- **Size:** 25px (custom, between text-xl and text-2xl)
- **Weight:** 400 (normal)
- **Color:** Grey-700
- **Font:** DM Sans

---

### **H4 - Card Titles**
```tsx
<h4 className="text-lg font-semibold text-[var(--grey-700)]">
  Growth Drivers
</h4>
```
- **Size:** 18px (text-lg)
- **Weight:** 600 (semibold)
- **Color:** Grey-700
- **Font:** DM Sans

---

### **Body Text (Default)**
```tsx
<p className="text-base leading-relaxed text-[var(--grey-500)]">
  Market analysis shows...
</p>
```
- **Size:** 14px (text-base) - **MOST COMMON**
- **Weight:** 400
- **Line-height:** 1.625 (relaxed)
- **Color:** Grey-500
- **Font:** DM Sans

---

### **Secondary Text / Labels**
```tsx
<span className="text-[14px] text-[var(--grey-500)]">
  Market Size
</span>
```
- **Size:** 14px
- **Weight:** 400
- **Color:** Grey-500
- **Font:** DM Sans

---

### **Captions / Metadata**
```tsx
<span className="text-[13px] text-[var(--grey-550)]">
  * Data as of 2024
</span>
```
- **Size:** 13px (text-sm)
- **Weight:** 400
- **Color:** Grey-550 (slightly darker than secondary)
- **Font:** DM Sans

---

### **Stat Numbers**
```tsx
<div className="text-[40px] font-bold text-[var(--data-purple-500)]">
  $2.4B
</div>
```
- **Size:** 26-40px (depending on context)
- **Weight:** Bold (700)
- **Color:** PURPLE (data color)
- **Font:** DM Sans

---

## **10.4 Font Weight Scale**

| Token | Value | Usage |
|-------|-------|-------|
| `--font-regular` | 400 | Body text, headings (default) |
| `--font-medium` | 500 | Emphasis, slightly bold |
| `--font-semibold` | 600 | Card titles, h4 |
| `--font-bold` | 700 | Chapter headers, stat numbers |
| `--font-extrabold` | 800 | Rare, hero numbers |

---

## **10.5 Line Height Scale**

| Token | Value | Usage |
|-------|-------|-------|
| `--leading-none` | 1.0 | Very tight, numbers |
| `--leading-tight` | 1.25 | Headings (h1, h2) |
| `--leading-snug` | 1.375 | h3 |
| `--leading-normal` | 1.5 | h4, h5, h6 |
| `--leading-comfortable` | 1.6 | Body text |
| `--leading-relaxed` | 1.625 | Descriptions |
| `--leading-loose` | 2.0 | Rare, spacious |

---

## **10.6 Letter Spacing (Tracking)**

| Token | Value | Usage |
|-------|-------|-------|
| `--tracking-tighter` | -0.05em | Hero titles (rare) |
| `--tracking-tight` | -0.025em | Headings (h1, h2) |
| `--tracking-normal` | 0 | Body text (default) |
| `--tracking-wide` | 0.025em | Slight emphasis |
| `--tracking-wider` | 0.05em | Buttons |
| `--tracking-widest` | **0.1em** | **Chapter headers** |

---

# 11. 🌈 GRADIENTS - COMPLETE ANALYSIS

## **11.1 Gradient Usage Map**

### **WHERE Gradients Are Used:**

1. **Primary CTA Buttons**
2. **CTA Section Backgrounds**
3. **IconCard Backgrounds (subtle)**

**NOWHERE ELSE** - Keep it minimal!

---

## **11.2 Button Gradient**

### **Primary CTA Button**
```tsx
className="bg-gradient-to-br from-[var(--brand-red)] to-[var(--red-500)]"
```

**DETAILS:**
- **Direction:** `to-br` (bottom-right diagonal)
- **Start:** `#b01f24` (brand-red-500)
- **End:** `#ef4444` (red-500, brighter)
- **Effect:** Subtle depth, modern look
- **Why:** More visual interest than flat red

**ALTERNATIVE (if not using gradient):**
```tsx
className="bg-[var(--brand-red-500)]"  // Flat red
```

---

## **11.3 CTA Section Gradient**

### **FinalCTA Card Background**
```tsx
className="bg-gradient-to-r from-[var(--brand-red-active)] via-[var(--brand-red)] to-[var(--red-500)]"
```

**DETAILS:**
- **Direction:** `to-r` (left to right)
- **Start:** `#771419` (brand-red-700, darker)
- **Middle:** `#b01f24` (brand-red-500, base)
- **End:** `#ef4444` (red-500, brighter)
- **Effect:** Dramatic, attention-grabbing
- **Why:** Maximum impact for final conversion

**HOVER:**
```tsx
className="hover:bg-gradient-to-br"  // Changes direction on hover
```

---

## **11.4 Subtle Card Gradient**

### **IconCard Background (Optional)**
```css
.gradient-card-purple {
  background: linear-gradient(135deg, rgba(243, 244, 255, 0.5), rgba(250, 250, 250, 0.3));
  border: 1px solid rgba(226, 228, 253, 0.5);
}
```

**DETAILS:**
- **Direction:** 135deg (diagonal)
- **Start:** Light purple with 50% opacity
- **End:** Grey with 30% opacity
- **Effect:** Very subtle, barely noticeable
- **Why:** Adds slight depth without distraction

**USAGE:** Rare, optional enhancement

---

## **11.5 Gradient Rules**

### **DO:**
✅ Use red gradients for CTAs  
✅ Keep gradients subtle  
✅ Use same color family (red to red)  
✅ Maintain readability  

### **DON'T:**
❌ Mix red and purple in gradients  
❌ Use on informational cards  
❌ Over-gradient the page  
❌ Use bright, loud gradients  
❌ Gradient text (bad for accessibility)  

---

# 12. 📐 GRIDS - COMPLETE ANALYSIS

## **12.1 Grid System Overview**

### **Base Grid Pattern**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-{X} gap-{Y}">
```

**BREAKPOINTS:**
- `grid-cols-1`: Mobile (default)
- `md:grid-cols-2`: Tablet (768px+)
- `lg:grid-cols-{X}`: Desktop (1024px+)

---

## **12.2 Common Grid Layouts**

### **2-Column Grid** (50/50 split)
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* 2 items */}
</div>
```

**USAGE:**
- TOC chapters (2 columns)
- Feature comparisons
- Balanced content layouts

**RESPONSIVE:**
- Mobile: 1 column (stack)
- Desktop: 2 columns

---

### **3-Column Grid** (33/33/33 split)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 3+ items */}
</div>
```

**USAGE:**
- IconCards (features)
- MethodologyCards
- Service offerings
- Feature grids

**RESPONSIVE:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

**EXAMPLES:**
- ResearchMethodology (3 cards)
- GrowthDriversChallenges (3 cards)
- IconCard grids

---

### **4-Column Grid** (25/25/25/25 split)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* 4+ items */}
</div>
```

**USAGE:**
- StatCards (metrics)
- Small widgets
- Icon grids
- Number displays

**RESPONSIVE:**
- Mobile: 1 column
- Tablet: 2 columns (2x2)
- Desktop: 4 columns

**EXAMPLE:**
- InlineStats (4 stat cards)
- Key metrics sections

---

### **Auto-Fit Grid** (Dynamic)
```tsx
<div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
  {/* Responsive auto-layout */}
</div>
```

**USAGE:**
- Variable content counts
- Flexible layouts
- Card galleries

**HOW IT WORKS:**
- Auto-fits as many columns as possible
- Minimum 280px per column
- Fills available space

---

## **12.3 Gap Patterns**

### **Gap Scale**

| Class | Pixels | Usage |
|-------|--------|-------|
| `gap-2` | 8px | Tight grids |
| `gap-3` | 12px | Compact |
| `gap-4` | 16px | Standard |
| `gap-5` | 20px | Comfortable |
| `gap-6` | **24px** | **Default** (MOST USED) |
| `gap-8` | 32px | Spacious |
| `gap-10` | 40px | Very spacious |

---

### **Most Common: gap-6** (24px)
```tsx
<div className="grid ... gap-6">
```

**WHY:**
- Balanced spacing
- Not too tight, not too loose
- Works with cards
- Professional appearance

---

### **Alternative: gap-4 or gap-5**
```tsx
<div className="grid md:grid-cols-3 gap-4 lg:gap-5">
```

**USAGE:**
- MethodologyCards
- Tighter layouts
- More content density

---

## **12.4 Grid Responsive Examples**

### **Example 1: TOC Section**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {chapters.map((chapter) => (
    <div className="border rounded-[10px] p-6">
      {/* Chapter content */}
    </div>
  ))}
</div>
```

**BREAKPOINTS:**
- `< 768px`: 1 column
- `≥ 768px`: 2 columns

---

### **Example 2: Features Grid**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {features.map((feature) => (
    <IconCard {...feature} />
  ))}
</div>
```

**BREAKPOINTS:**
- `< 768px`: 1 column
- `768px - 1023px`: 2 columns
- `≥ 1024px`: 3 columns

---

### **Example 3: Stats Grid**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {stats.map((stat) => (
    <StatCard variant="icon-top" {...stat} />
  ))}
</div>
```

**BREAKPOINTS:**
- `< 768px`: 1 column
- `768px - 1023px`: 2 columns (2x2)
- `≥ 1024px`: 4 columns (1x4)

---

## **12.5 Grid Alignment**

### **Vertical Alignment**
```tsx
// Top align (default)
<div className="grid ... items-start">

// Center align
<div className="grid ... items-center">

// Stretch (fill height)
<div className="grid ... items-stretch">
```

### **Horizontal Alignment**
```tsx
// Start (default)
<div className="grid ... justify-items-start">

// Center
<div className="grid ... justify-items-center">

// End
<div className="grid ... justify-items-end">
```

---

## **12.6 Grid Best Practices**

### **DO:**
✅ Use gap-6 as default  
✅ Start with 1 column for mobile  
✅ Use md: for tablet breakpoint  
✅ Use lg: for desktop breakpoint  
✅ Keep card sizes consistent  
✅ Use items-stretch for equal heights  

### **DON'T:**
❌ Too many breakpoints (keep it simple)  
❌ Gaps too small (< 16px)  
❌ Gaps too large (> 32px usually)  
❌ Too many columns on mobile  
❌ Unequal column widths (use flexbox instead)  

---

**[PART 2 COMPLETE]**

**NEXT: PART 3** will cover:
- 13. Methodology Section Patterns
- 14. FAQ Section Patterns
- 15. Banners & Alerts
- 16. Widgets (Number Highlights, Progress)
- 17. Spacing System
- 18. Reusable Component Extraction

**Shall I continue with Part 3?** 🚀
