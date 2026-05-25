# ✅ DESIGN SYSTEM IMPLEMENTATION CHECKLIST

**Version:** 3.0.0  
**Date:** February 12, 2026  
**Purpose:** Complete checklist for building pages with the KP 2.0 Design System

---

## 📋 TABLE OF CONTENTS

1. [Pre-Build Checklist](#1-pre-build-checklist)
2. [Component Selection Checklist](#2-component-selection-checklist)
3. [Color Usage Checklist](#3-color-usage-checklist)
4. [Typography Checklist](#4-typography-checklist)
5. [Layout & Spacing Checklist](#5-layout--spacing-checklist)
6. [Accessibility Checklist](#6-accessibility-checklist)
7. [Performance Checklist](#7-performance-checklist)
8. [Quality Assurance Checklist](#8-quality-assurance-checklist)

---

# 1. 🎯 PRE-BUILD CHECKLIST

## **Before You Start Building**

### **Content Planning**
- [ ] Define all sections needed for the page
- [ ] Identify primary vs secondary content
- [ ] Determine CTA placement and priority
- [ ] List all metrics/statistics to display
- [ ] Outline feature/benefit items
- [ ] Plan FAQ or expandable content
- [ ] Map content hierarchy

### **Component Requirements**
- [ ] List all component types needed
- [ ] Verify components exist in design system
- [ ] Identify any custom component needs
- [ ] Plan interactive elements (accordions, tabs, etc)
- [ ] Determine card variants needed
- [ ] Identify icon requirements

### **Design Tokens Review**
- [ ] Review color tokens available
- [ ] Understand RED vs PURPLE usage
- [ ] Review typography scale
- [ ] Check spacing system
- [ ] Review shadow tokens
- [ ] Verify border radius values

---

# 2. 🧩 COMPONENT SELECTION CHECKLIST

## **Choosing the Right Component**

### **For Displaying Numbers/Metrics**
- [ ] **StatCard (icon-top)** - Grid of 4+ metrics with icons?
- [ ] **StatCard (icon-left)** - Detailed single metric with context?
- [ ] **StatCard (inline)** - Compact stat row without cards?
- [ ] **NumberWidget** - Large prominent number display?
- [ ] **Badge** - Small inline metric indicator?

### **For Displaying Features/Info**
- [ ] **IconCard** - Features with icon + title + description?
- [ ] **MethodologyCard** - Process steps with bullet points?
- [ ] **AnalysisCard** - Numbered analysis points?
- [ ] **Simple div** - Basic content without special treatment?

### **For Call-to-Actions**
- [ ] **Button (cta)** - Primary conversion action?
- [ ] **Button (outline)** - Secondary supporting action?
- [ ] **Button (ghost)** - Minimal tertiary action?
- [ ] **FinalCTA section** - Large end-of-page conversion?
- [ ] **Text link** - Simple navigation link?

### **For Lists & Content**
- [ ] **Accordion** - FAQ or collapsible content?
- [ ] **Checkmark list** - Feature/benefit list?
- [ ] **Bullet list** - Simple enumeration?
- [ ] **Numbered list** - Sequential steps?
- [ ] **Icon list** - Items with icons + descriptions?

### **For Layout**
- [ ] **Section wrapper** - Standard section structure?
- [ ] **Grid (2-col)** - Balanced two-column layout?
- [ ] **Grid (3-col)** - Feature grid with 3 items?
- [ ] **Grid (4-col)** - Stat grid with 4+ items?
- [ ] **Flex layout** - Custom flexible arrangement?

---

# 3. 🎨 COLOR USAGE CHECKLIST

## **Color Decision Verification**

### **RED Usage** (Brand/Action)
- [ ] Chapter headers use `text-[var(--brand-red)]`
- [ ] Primary CTA buttons use `bg-[var(--brand-red)]`
- [ ] CTA section backgrounds use red gradient
- [ ] Link hover states change to red
- [ ] Focus rings are red
- [ ] Scroll progress bar is red
- [ ] **RED is NEVER used for:** charts, data, icons (use purple)

### **PURPLE Usage** (Data/Information)
- [ ] Chart colors use `var(--data-purple-500)`
- [ ] Stat numbers use purple
- [ ] Informational icons use purple
- [ ] Icon backgrounds use `var(--data-purple-100)` (light purple)
- [ ] Progress bars use purple
- [ ] TOC active links use purple
- [ ] Data badges use purple
- [ ] **PURPLE is NEVER used for:** CTAs, chapter headers (use red)

### **GREY Usage** (Content)
- [ ] Primary text (headings) uses `var(--grey-700)` (#171717)
- [ ] Secondary text (body) uses `var(--grey-500)` (#737373)
- [ ] Tertiary text uses `var(--grey-550)`
- [ ] Primary borders use `var(--grey-200)` (#e5e5e5)
- [ ] Hover borders use `var(--grey-300)`
- [ ] Even section backgrounds use `var(--grey-50)` (#fafafa)
- [ ] Odd section backgrounds use white

### **Semantic Colors**
- [ ] Success indicators use green (#16a34a)
- [ ] Error states use red (#dc2626)
- [ ] Warning states use amber (#fbbf24)
- [ ] Info messages use blue (#2563eb)

### **Background Alternation**
- [ ] Section 1 (hero) → White
- [ ] Section 2 → Grey-50
- [ ] Section 3 → White
- [ ] Section 4 → Grey-50
- [ ] Pattern continues...
- [ ] CTA section can break pattern (red background)

---

# 4. 📝 TYPOGRAPHY CHECKLIST

## **Font & Text Styling**

### **Font Family**
- [ ] Body text uses DM Sans
- [ ] UI elements use DM Sans
- [ ] h3, h4, h5, h6 use DM Sans
- [ ] **h1 and h2 ONLY** use Noto Serif (display font)
- [ ] Buttons use DM Sans
- [ ] All other text uses DM Sans

### **Chapter Headers**
- [ ] Size: 13px (text-sm)
- [ ] Weight: Bold (700)
- [ ] Transform: Uppercase
- [ ] Tracking: Widest (0.1em)
- [ ] Color: RED (`var(--brand-red)`)
- [ ] Format: "CHAPTER X - Title"

### **Section Headings (h2)**
- [ ] Size: 48px (text-display) or 36-40px (text-4xl)
- [ ] Font: Noto Serif (font-display)
- [ ] Weight: 400 (normal)
- [ ] Color: Grey-700
- [ ] Line-height: Tight (1.25)
- [ ] Tracking: Tight (-0.02em)

### **Subsection Headings (h3)**
- [ ] Size: 25-32px
- [ ] Font: DM Sans
- [ ] Weight: 400 (normal)
- [ ] Color: Grey-700

### **Card Titles (h4)**
- [ ] Size: 18-24px
- [ ] Weight: Semibold (600) or Bold (700)
- [ ] Font: DM Sans
- [ ] Color: Grey-700

### **Body Text**
- [ ] Size: 14px (text-base) - **STANDARD**
- [ ] Weight: 400 (normal)
- [ ] Color: Grey-500 (#737373)
- [ ] Line-height: Relaxed (1.625)
- [ ] Font: DM Sans

### **Stat Numbers**
- [ ] Size: 26-40px (depending on prominence)
- [ ] Weight: Bold (700)
- [ ] Color: PURPLE (`var(--data-purple-500)`)
- [ ] Font: DM Sans

---

# 5. 📐 LAYOUT & SPACING CHECKLIST

## **Section Structure**

### **Standard Section**
- [ ] Vertical padding: `py-24 lg:py-32` (96px mobile, 128px desktop)
- [ ] Horizontal padding: `px-[84.375px] lg:px-[112.5px]`
- [ ] Max-width container: `max-w-7xl mx-auto`
- [ ] Background: Alternating white/grey-50
- [ ] Relative positioning if using background patterns

### **Section Header Spacing**
- [ ] Chapter label margin-bottom: `mb-4` (16px)
- [ ] Section heading margin-bottom: `mb-6` (24px)
- [ ] Description max-width: `max-w-3xl`
- [ ] Entire header margin-bottom: `mb-16` (64px)

### **Grid Layouts**
- [ ] Default gap: `gap-6` (24px)
- [ ] Mobile: `grid-cols-1`
- [ ] Tablet: `md:grid-cols-2` (2 columns)
- [ ] Desktop: `lg:grid-cols-{3 or 4}` based on content
- [ ] Equal height cards: `items-stretch`

### **Card Internal Spacing**
- [ ] StatCard padding: `p-4` (16px)
- [ ] IconCard padding: `p-4` (16px)
- [ ] MethodologyCard padding: `p-8` (32px)
- [ ] Icon container size: `w-10 h-10` (40px) or `w-12 h-12` (48px)
- [ ] Icon margin-bottom: `mb-4` (16px)
- [ ] Title margin-bottom: `mb-2` or `mb-3`

### **List Spacing**
- [ ] Tight lists: `space-y-2` (8px)
- [ ] Standard lists: `space-y-3` (12px)
- [ ] Comfortable lists: `space-y-4` (16px)
- [ ] Spacious lists: `space-y-6` (24px)

---

# 6. ♿ ACCESSIBILITY CHECKLIST

## **WCAG 2.1 AA Compliance**

### **Color Contrast**
- [ ] Text on white: Grey-700 (#171717) - 14.6:1 ✅
- [ ] Secondary text: Grey-500 (#737373) - 4.6:1 ✅
- [ ] Red on white: #b01f24 - 6.8:1 ✅
- [ ] Purple on white: #7f5fe3 - 4.5:1 ✅
- [ ] White on red button: 8.2:1 ✅
- [ ] All custom colors verified with contrast checker

### **Keyboard Navigation**
- [ ] All interactive elements keyboard accessible
- [ ] Tab order is logical
- [ ] Focus states visible (red ring)
- [ ] Skip links provided for long pages
- [ ] Accordion items keyboard operable
- [ ] Buttons focusable and activatable

### **Focus Indicators**
- [ ] Focus ring: `focus-visible:ring-[var(--brand-red)] focus-visible:ring-3`
- [ ] 3px red ring with 20% opacity
- [ ] Visible on all interactive elements
- [ ] Not hidden by overflow

### **ARIA Labels & Semantics**
- [ ] Headings in proper hierarchy (h1 → h2 → h3)
- [ ] Buttons have descriptive labels
- [ ] Icons have aria-labels if no text
- [ ] Forms have proper labels
- [ ] Landmark roles used (header, nav, main, footer)
- [ ] Accordion uses Radix UI (built-in ARIA)

### **Screen Reader Support**
- [ ] All images have alt text
- [ ] Decorative images have `alt=""`
- [ ] Icon-only buttons have aria-labels
- [ ] Status messages announced with aria-live
- [ ] Heading structure is logical
- [ ] Links describe destination

### **Motion & Animation**
- [ ] Respects prefers-reduced-motion
- [ ] Animations can be disabled
- [ ] No auto-playing content
- [ ] Transitions are smooth but not jarring

---

# 7. ⚡ PERFORMANCE CHECKLIST

## **Optimization Best Practices**

### **Images**
- [ ] All images optimized (WebP format preferred)
- [ ] Appropriate image sizes for breakpoints
- [ ] Lazy loading enabled
- [ ] Alt text provided
- [ ] Using ImageWithFallback component
- [ ] Icons use SVG (not images)

### **Icons**
- [ ] Using Lucide React (tree-shakeable)
- [ ] Only importing needed icons
- [ ] Icon sizes appropriate (h-4, h-5, h-6)
- [ ] SVG icons inline (not separate files)

### **Fonts**
- [ ] DM Sans loaded from fonts.css
- [ ] Noto Serif loaded from fonts.css
- [ ] Font display: swap
- [ ] Only loading needed font weights
- [ ] Preload critical fonts

### **CSS & Styling**
- [ ] Using Tailwind CSS v4
- [ ] No inline styles unless dynamic
- [ ] Design tokens from theme.css
- [ ] Purge unused CSS in production
- [ ] CSS variables for theming

### **JavaScript**
- [ ] Components code-split
- [ ] Lazy load below-fold content
- [ ] Minimal bundle size
- [ ] Tree-shaking enabled
- [ ] No unused imports

### **Rendering**
- [ ] Critical CSS inlined
- [ ] Above-fold content prioritized
- [ ] Smooth scroll behavior
- [ ] No layout shifts (CLS optimized)
- [ ] Properly sized containers

---

# 8. ✅ QUALITY ASSURANCE CHECKLIST

## **Pre-Launch Verification**

### **Visual QA**
- [ ] All sections aligned properly
- [ ] Consistent spacing throughout
- [ ] Colors match design system exactly
- [ ] Fonts are correct (DM Sans vs Noto Serif)
- [ ] No visual glitches or overflow
- [ ] Cards have equal heights in grids
- [ ] Borders consistent (1px, grey-200)
- [ ] Shadows appear on hover
- [ ] Background alternation correct (white/grey)

### **Responsive Testing**
- [ ] **Mobile (< 768px):** 
  - [ ] 1 column layouts work
  - [ ] Padding: 84.375px horizontal
  - [ ] Text readable
  - [ ] Buttons stack vertically
  - [ ] No horizontal scroll
  
- [ ] **Tablet (768px - 1023px):**
  - [ ] 2 column grids work
  - [ ] Navigation accessible
  - [ ] Content balanced
  
- [ ] **Desktop (≥ 1024px):**
  - [ ] 3-4 column grids work
  - [ ] Padding: 112.5px horizontal
  - [ ] TOC sidebar visible
  - [ ] Max-width enforced

### **Interactive Elements**
- [ ] All buttons clickable
- [ ] Hover states work
- [ ] Active states work
- [ ] Focus states visible
- [ ] Links navigate correctly
- [ ] Accordions expand/collapse
- [ ] Modals open/close
- [ ] Forms validate

### **Content Verification**
- [ ] All text proofread
- [ ] Chapter numbers sequential
- [ ] No placeholder text (Lorem ipsum)
- [ ] All data accurate
- [ ] Currency uses "$" not "USD"
- [ ] Numbers formatted consistently
- [ ] Dates formatted correctly

### **Cross-Browser Testing**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### **Performance Metrics**
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] No console errors
- [ ] No console warnings

---

# 9. 📝 COMPONENT USAGE CHECKLIST

## **Component-Specific Guidelines**

### **StatCard Usage**
- [ ] Variant chosen appropriately
- [ ] Icon size consistent (h-5 w-5)
- [ ] Icon color is purple (`var(--data-purple-500)`)
- [ ] Icon background is light purple (`var(--data-purple-100)`)
- [ ] Value color is purple (data)
- [ ] Label color is grey-500
- [ ] Hover shadow is purple-tinted
- [ ] Grid gap is 24px

### **IconCard Usage**
- [ ] Icon size is h-6 w-6
- [ ] Icon color is purple
- [ ] Icon background is light purple
- [ ] Title is h3 or h4
- [ ] Description is grey-500
- [ ] Border is grey-200
- [ ] Hover shadow is purple-tinted
- [ ] Card has rounded-[10px]

### **Button Usage**
- [ ] Primary CTA uses `variant="cta"`
- [ ] Secondary uses `variant="outline"`
- [ ] Size appropriate (default or lg)
- [ ] Icon included if beneficial
- [ ] Icon size is h-5 w-5
- [ ] Disabled state handled
- [ ] Loading state if async
- [ ] Focus ring visible

### **Accordion Usage**
- [ ] Type is "single" or "multiple"
- [ ] Collapsible prop if needed
- [ ] Items have unique values
- [ ] Question is bold
- [ ] Answer is grey-500
- [ ] Border is grey-100
- [ ] Hover border is grey-300
- [ ] Spacing between items: space-y-4

---

# 10. 🔍 FINAL CHECKLIST BEFORE LAUNCH

## **Critical Checks**

### **Design System Compliance**
- [ ] All components from design system
- [ ] No custom colors outside tokens
- [ ] Typography follows standards
- [ ] Spacing uses system scale
- [ ] Borders use correct colors/widths
- [ ] Shadows use brand tokens

### **Brand Consistency**
- [ ] RED used only for brand/action
- [ ] PURPLE used for data/info
- [ ] GREY for content/structure
- [ ] Chapter headers in red uppercase
- [ ] h1/h2 use Noto Serif
- [ ] Everything else uses DM Sans

### **User Experience**
- [ ] Page loads quickly
- [ ] Content is scannable
- [ ] CTAs are prominent
- [ ] Navigation is clear
- [ ] Forms are simple
- [ ] Feedback is immediate

### **Technical Quality**
- [ ] No console errors
- [ ] No broken links
- [ ] No missing images
- [ ] No layout shifts
- [ ] Proper meta tags
- [ ] Analytics tracking

### **Documentation**
- [ ] Component usage documented
- [ ] Props explained
- [ ] Examples provided
- [ ] Edge cases handled
- [ ] Known issues noted

---

# 📊 CHECKLIST SUMMARY

## **Quick Status Overview**

| Category | Items | Priority |
|----------|-------|----------|
| **Pre-Build** | 15 items | 🔴 Critical |
| **Component Selection** | 20 items | 🔴 Critical |
| **Color Usage** | 30 items | 🔴 Critical |
| **Typography** | 25 items | 🟡 High |
| **Layout & Spacing** | 20 items | 🟡 High |
| **Accessibility** | 30 items | 🔴 Critical |
| **Performance** | 20 items | 🟡 High |
| **Quality Assurance** | 35 items | 🔴 Critical |
| **Component Usage** | 30 items | 🟡 High |
| **Final Checks** | 25 items | 🔴 Critical |

**TOTAL:** 250+ verification points

---

## **Priority Legend**

🔴 **Critical:** Must be checked before launch  
🟡 **High:** Should be checked, minor issues acceptable  
🟢 **Medium:** Nice to have, can be improved post-launch

---

## **Usage Instructions**

1. **Before Starting:** Complete Pre-Build Checklist
2. **During Development:** Check Component Selection & Color Usage
3. **After Styling:** Verify Typography & Layout
4. **Before Testing:** Complete Accessibility & Performance
5. **Final Review:** Run through Quality Assurance & Final Checklist

---

## **Checklist Tools**

### **Recommended Tools:**
- [ ] [WebAIM Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ ] [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [ ] [axe DevTools](https://www.deque.com/axe/devtools/)
- [ ] [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [ ] [Responsively App](https://responsively.app/)

---

**🎉 When all checklists are complete, your page is ready for production!**
