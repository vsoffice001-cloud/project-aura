# Phase 1: Discovery & Analysis Report

## 🎨 Color System Audit

### Current State
The project uses a **mix of CSS variables and hardcoded hex values**, creating inconsistency and maintenance challenges.

---

## Color Inventory

### 1. **PRIMARY COLORS** (Purple Palette)

| Color | Hex Value | CSS Variable | Usage | Frequency |
|-------|-----------|--------------|-------|-----------|
| Purple 500 | `#7f5fe3` | ❌ None | Interactive elements, charts, primary actions | **Very High** |
| Purple 600 | `#6b46d9` | ❌ None | Hover states | Medium |
| Purple 700 | `#5a38c7` | ❌ None | Active states | Low |
| Purple Light | `#b8aeef` | ❌ None | Chart colors, backgrounds | Medium |
| Purple Mid | `#9b80eb` | ❌ None | Chart colors | Medium |
| Purple Dark | `#6d52d9` | ❌ None | Chart colors | Medium |
| Purple Lighter | `#9d9aef` | ❌ None | Progress bars | Low |

**Issues:**
- No CSS variables defined for purple shades
- Hardcoded throughout components
- Inconsistent shade usage

---

### 2. **SEMANTIC COLORS**

| Color | Hex Value | CSS Variable | Usage | Frequency |
|-------|-----------|--------------|-------|-----------|
| Brand Red | `#b01f24` | `var(--brand-red)` | Chapter overhead text | High |
| Red 600 | ❓ | `var(--red-600)` | Warnings, challenges | Medium |
| Green 600 | ❓ | `var(--green-600)` | Growth, positive trends | Medium |
| Amber 400 | ❓ | `var(--amber-400)` | Opportunities | Medium |

**Status:** ✅ Partially using CSS variables  
**Issues:** Not all semantic colors have variables

---

### 3. **NEUTRAL COLORS** (Black/Grey Palette)

| Color | Hex Value | CSS Variable | Usage | Frequency |
|-------|-----------|--------------|-------|-----------|
| Black 700 | `#171717` | ❌ None | Primary text, headings | **Very High** |
| Black 600 | `#404040` | ❌ None | Secondary text | Medium |
| Black 500 | `#737373` | `var(--black-500)` | Tertiary text, labels | **Very High** |
| Black 400 | `#525252` | ❌ None | Muted text | Low |
| Black 200 | `#d4d4d4` | `var(--black-200)` | Borders, dividers | Medium |
| Black 100 | `#e5e5e5` | `var(--black-100)` | Light borders | **Very High** |
| Black 50 | `#fafafa` | `var(--black-50)` | Light backgrounds | **Very High** |
| Black 25 | `#f5f5f5` | ❌ None | Very light backgrounds | **Very High** |
| Dark Background | `#141016` | ❌ None | Footer background | Low |

**Issues:**
- Mix of hardcoded and CSS variables
- Missing variables for most used colors (#171717, #f5f5f5)
- Inconsistent naming

---

### 4. **UI ELEMENT COLORS**

| Element | Color | Type | Usage |
|---------|-------|------|-------|
| Background Primary | `#ffffff` (white) | Hardcoded | Section backgrounds |
| Background Secondary | `#fafafa` | Mixed | Alternating sections |
| Background Tertiary | `#f5f5f5` | Hardcoded | Cards, badges |
| Border Primary | `#e5e5e5` | Hardcoded | Most borders |
| Border Secondary | `#d4d4d4` | Hardcoded | Dividers |
| Text Primary | `#171717` | Hardcoded | Main text |
| Text Secondary | `#737373` | Mixed | Supporting text |
| Text Tertiary | `#525252` | Hardcoded | Muted text |

---

### 5. **SPECIAL PURPOSE COLORS**

| Purpose | Color | Usage |
|---------|-------|-------|
| Loading Spinner | `#7f5fe3` | Spinner border |
| Hover Shadow | `rgba(127,95,227,0.1)` | Card hover effects |
| Focus Ring | Purple | Focus states (need to define) |
| Selection | Purple | Text selection (need to define) |

---

## Typography System Audit

### Font Families

| Font | Usage | CSS Variable | Status |
|------|-------|--------------|--------|
| **DM Sans** | Body text, UI elements | ❌ None | Needs variable |
| **Noto Serif** | Display headings (h2) | `font-display` | ✅ Defined in theme |

---

### Font Sizes (Discovered)

| Size | Px Value | Usage | Frequency |
|------|----------|-------|-----------|
| Display | `48px` | Section headings (h2) | High |
| XL | `32-36px` | Stats, large numbers | Medium |
| LG | `24px` | Sub-headings | Medium |
| Base | `16px` | Body text | **Very High** |
| SM | `14px` | Supporting text | High |
| XS | `13px` | Labels, overhead text | Medium |
| 2XS | `12px` | Tiny labels | Low |
| 3XS | `10px` | Footer text | Low |

**Issues:**
- No font-size scale defined
- Many hardcoded pixel values
- Need rem-based system

---

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Bold | `700` | Headings, emphasis |
| Normal | `400` | Body text |
| Semi-bold | `600` | (Not currently used but should be) |

---

### Line Heights

| Height | Usage | Status |
|--------|-------|--------|
| `tight` | Headings | ✅ Using Tailwind |
| `relaxed` | Body text | ✅ Using Tailwind |
| `24px` | Specific cases | ❌ Hardcoded |

---

## Spacing System Audit

### Common Spacing Values

| Value | Px | Usage | Frequency |
|-------|-------|-------|-----------|
| 1 | 4px | Tiny gaps | Low |
| 1.5 | 6px | Small gaps | Medium |
| 2 | 8px | Small spacing | High |
| 3 | 12px | Medium spacing | Medium |
| 4 | 16px | Standard spacing | **Very High** |
| 6 | 24px | Large spacing | High |
| 8 | 32px | Section spacing | High |
| 10 | 40px | Large gaps | Medium |
| 16 | 64px | Section margins | Medium |
| 24 | 96px | Section padding (py) | High |
| 32 | 128px | Large section padding | Medium |

### Special Spacing

| Purpose | Value | Usage |
|---------|-------|-------|
| Section Padding H | `84.375px`, `112.5px` | Horizontal section padding |
| Container Max Width | `1200px`, `7xl` | Content containers |
| Section Padding V | `96px`, `128px` | Vertical section spacing |

---

## Border Radius Audit

### Discovered Values

| Value | Px | Usage | Frequency |
|-------|-----|-------|-----------|
| SM | `2.5px` | Buttons, small elements | Low |
| MD | `10px` | Cards, most elements | **Very High** |
| LG | `16px` | Large cards | Low |
| Full | `9999px` / `full` | Circular badges, pills | High |

**Issues:**
- Using CSS variables (`var(--radius-*)`) in some places
- Hardcoded `rounded-[10px]` everywhere
- Should consolidate to variables

---

## Shadow System Audit

### Discovered Shadows

| Name | Value | Usage |
|------|-------|-------|
| Card Hover | `0_10px_15px_-3px_rgba(127,95,227,0.1), 0_4px_6px_-4px_rgba(127,95,227,0.08)` | Card hover effects |
| Default | Tailwind defaults | Various elements |
| 2XL | `shadow-2xl` | Floating CTA |

**Issues:**
- Long, hardcoded shadow values
- Purple-tinted shadows need to be extracted
- Should define shadow scale

---

## Icon Usage Audit

### Icon Library
- **Lucide React** - Used throughout

### Common Icons

| Icon | Usage | Frequency |
|------|-------|-----------|
| TrendingUp | Growth indicators | High |
| TriangleAlert | Warnings, challenges | Medium |
| Lightbulb | Opportunities | Medium |
| MapPin | Locations | Medium |
| Building2 | Companies | Medium |
| Leaf | Agriculture, organic | Medium |
| Check | Completed items | High |
| ChevronLeft/Right | Navigation | High |
| List | TOC button | Low |

---

## Component Patterns Audit

### Repeating Patterns Found

#### 1. **Stat Display Pattern**
```tsx
<div>
  <p className="text-2xl lg:text-3xl font-bold text-[#171717]">
    {value}
  </p>
  <p className="text-sm mt-1.5 text-[#737373]">
    {label}
  </p>
</div>
```
**Found in:** CompetitiveLandscape, MarketOverview, etc.  
**Frequency:** Very High  
**Needs:** StatCard component

#### 2. **Vertical Divider Pattern**
```tsx
<div className="w-px h-8 bg-[#d4d4d4] self-center"></div>
```
**Found in:** Multiple sections  
**Frequency:** High  
**Needs:** Divider component

#### 3. **Section Header Pattern**
```tsx
<div className="mb-4">
  <span className="text-[#b01f24] font-bold tracking-widest uppercase" style={{ fontSize: '13px' }}>
    CHAPTER [N] - [Title]
  </span>
</div>
<h2 className="font-display text-[48px] tracking-tight text-[#171717]">
  {title}
</h2>
<p className="text-[16px] leading-relaxed max-w-3xl text-[#737373]">
  {description}
</p>
```
**Found in:** Every section  
**Frequency:** Very High  
**Status:** ✅ Partially exists (SectionHeader, OverheadText)

#### 4. **Card Pattern**
```tsx
<div className="bg-white border border-[#e5e5e5] rounded-[10px] hover:shadow-[...] transition-shadow duration-300">
  {content}
</div>
```
**Found in:** Everywhere  
**Frequency:** **Extremely High**  
**Needs:** Card component with variants

#### 5. **Badge/Pill Pattern**
```tsx
<span className="px-2.5 py-1 rounded-full text-xs bg-[#f5f5f5] text-[#525252]">
  {text}
</span>
```
**Found in:** Tables, cards  
**Frequency:** High  
**Needs:** Badge component

#### 6. **Icon Container Pattern**
```tsx
<div className="size-10 rounded-lg flex items-center justify-center bg-[#eff1fe]">
  <Icon className="h-4 w-4" style={{ color: '#7f5fe3' }} />
</div>
```
**Found in:** Cards, lists  
**Frequency:** High  
**Needs:** IconWrapper component

---

## Layout Patterns Audit

### 1. **Section Container Pattern**
```tsx
<section id="..." className="py-24 lg:py-32 bg-[...]">
  <div className="max-w-7xl mx-auto px-[84.375px] lg:px-[112.5px]">
    {content}
  </div>
</section>
```
**Frequency:** Every section  
**Needs:** Section component

### 2. **Two-Column Grid**
```tsx
<div className="grid md:grid-cols-2 gap-6">
  {items}
</div>
```
**Frequency:** High

### 3. **Three-Column Grid**
```tsx
<div className="grid lg:grid-cols-3 gap-6">
  {items}
</div>
```
**Frequency:** High

---

## Pain Points Identified

### High Priority Issues

1. **Color Inconsistency** 🔴
   - `#171717` hardcoded 50+ times
   - `#7f5fe3` hardcoded 40+ times
   - `#737373` hardcoded 40+ times
   - `#e5e5e5` hardcoded 60+ times
   - `#f5f5f5` hardcoded 30+ times

2. **Typography Hardcoding** 🔴
   - `text-[16px]` hardcoded everywhere
   - `text-[48px]` for all headings
   - `text-[13px]` for overhead text
   - No font-size scale

3. **Border Radius Inconsistency** 🟡
   - `rounded-[10px]` hardcoded everywhere
   - Should use CSS variable

4. **Component Duplication** 🔴
   - Stat display pattern repeated 20+ times
   - Card pattern repeated 30+ times
   - Section header pattern repeated 10+ times

5. **No Design Token System** 🔴
   - Everything hardcoded
   - Difficult to maintain
   - Theme changes would require global find/replace

---

## Recommendations

### Immediate Actions (Phase 2)

1. **Extract all colors to design tokens**
   - Create comprehensive color palette
   - Define CSS variables
   - Create TypeScript token file

2. **Create typography scale**
   - Define font-size scale (rem-based)
   - Define line-height scale
   - Create typography utility classes

3. **Extract spacing system**
   - Document current spacing
   - Create spacing scale
   - Define container widths

4. **Define shadow system**
   - Extract shadow values
   - Create shadow scale
   - Document usage

### Next Phase Actions (Phase 3)

1. **Create atomic components**
   - Button (3 variants)
   - Badge (3 variants)
   - StatCard
   - IconWrapper
   - Divider

2. **Create composite components**
   - Card (5 variants)
   - SectionHeader (enhanced)
   - DataTable (enhanced)

### Long-term Actions (Phase 4-6)

1. **Create layout components**
2. **Document patterns**
3. **Migration guide**
4. **Best practices guide**

---

## Metrics

### Code Analysis

| Metric | Count | Status |
|--------|-------|--------|
| Hardcoded colors | 200+ | 🔴 Critical |
| Hardcoded spacing | 150+ | 🔴 Critical |
| Hardcoded typography | 100+ | 🔴 Critical |
| Repeated patterns | 50+ | 🔴 Critical |
| Existing components | 25+ | 🟢 Good |
| CSS variables used | ~10 | 🟡 Needs expansion |

### Reusability Score
**Current:** 30% (Only a few reusable components)  
**Target:** 80% (Most UI elements as components)  
**Improvement Needed:** +50%

---

## Next Steps

**Ready for Phase 2:** Design System Foundation

**Tasks:**
1. Create `/src/design-system/tokens/` directory
2. Extract all colors to tokens
3. Extract typography to tokens
4. Extract spacing to tokens
5. Update `theme.css` with complete token system
6. Create TypeScript token exports

**Estimated Time:** 1.5 hours  
**Priority:** 🔴 Critical  
**Complexity:** Medium  

---

**Analysis Complete** ✅  
**Date:** February 11, 2026  
**Next Phase:** Design System Foundation
