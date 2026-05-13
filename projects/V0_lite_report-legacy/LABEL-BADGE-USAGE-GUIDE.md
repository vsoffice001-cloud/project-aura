# Label & Badge Usage Guide - Design System VS 26

## Component Overview

### 1. **Label Component** (`/design-system/components/Label.tsx`)
**Purpose**: Section identifiers, step indicators, and category labels with uppercase text and wide letter spacing for editorial hierarchy.

**Features**:
- ✅ Subtle background + border (default state)
- ✅ Prominent background + border on hover (warm palette)
- ✅ Smooth transitions (200ms ease-in-out)
- ✅ Case study style interaction

**Variants**:
- `variant="filled"` → Solid background with subtle border (VARIANT 1)
- `variant="outlined"` → Border only, transparent background

**Colors**: `default`, `purple`, `periwinkle`, `perano`, `warm`, `brand`, `dark`

**Sizes**: `sm`, `md`, `lg`

**Hover Behavior**: All variants transition from subtle warm backgrounds to prominent warm tones on hover.

---

### 2. **Badge Component** (`/design-system/components/Badge.tsx`)
**Purpose**: Status indicators and feature badges with subtle filled backgrounds (VARIANT 2).

**Features**:
- ✅ Subtle background + border (default state)
- ✅ Prominent background + border on hover (warm palette)
- ✅ Smooth transitions (200ms ease-in-out)
- ✅ Case study style interaction

**Variants**: 
- Always filled style with light backgrounds
- `variant="purple"` → Light purple background (#f7f6fe) with purple text (#806ce0)
- `variant="periwinkle"` → Light periwinkle background with blue text
- `variant="perano"` → Light perano background with data blue text
- `variant="brand"` → Ken Bold Red background with white text
- `variant="default"` → Neutral gray

**Sizes**: `sm`, `md`

**Hover Behavior**: Transitions to warm palette backgrounds (warm-100 → warm-300) with enhanced borders.

---

### 3. **SectionLabel Component** (`/design-system/components/SectionLabel.tsx`)
**Purpose**: Plain text or pill-style section labels with optional shimmer animations.

**Styles**:
- `style="text"` → Plain uppercase text with optional icon/pulse
- `style="pill"` → Outlined pill with shimmer effect

---

## Section-by-Section Analysis

### 🎯 **1. Hero Section** (`/src/app/components/HeroSection.tsx`)

#### Current Usage:
```tsx
// Status indicator
<SectionLabel background="dark" pulse>
  New Report Available
</SectionLabel>

// Premium content overlays (2 locations)
<Badge variant="purple" size="md">
  PREMIUM CONTENT
</Badge>
```

#### ✅ **Recommendation - KEEP AS IS**

**Why:**
- ✅ **SectionLabel** for "New Report Available" - Correct! Plain text style with pulse animation on dark background
- ✅ **Badge variant="purple"** for "PREMIUM CONTENT" - Correct! This is the filled style (Variant 2) that provides visual emphasis over blurred content

---

### 📄 **2. Sample Report Preview** (`/src/app/components/SampleReportPreview.tsx`)

#### Current Usage:
```tsx
// Section identifier
<Badge variant="purple" size="md" className="gap-2">
  📄 Interactive Preview
</Badge>

// Chapter labels (inline text)
<p className="text-[0.688rem] font-semibold tracking-[0.2em] uppercase text-[#b01f24] mb-4">
  CHAPTER 1 - INDUSTRY ANALYSIS
</p>
```

#### 🔄 **Recommendation - UPDATE**

**Change to:**
```tsx
// Keep Badge for section identifier ✅
<Badge variant="purple" size="md" className="gap-2">
  📄 Interactive Preview
</Badge>

// Replace chapter labels with Label component
<Label variant="filled" color="brand" size="md">
  CHAPTER 1 - INDUSTRY ANALYSIS
</Label>
```

**Why:**
- Badge for top section identifier → Correct, provides visual emphasis
- Chapter labels should use Label component → Standardizes section hierarchy, provides proper design system styling

---

### 🎨 **3. Extended TOC** (`/src/app/components/ExtendedTOC.tsx`)

#### Expected Usage (Need to verify):
```tsx
// Chapter numbers/identifiers
<Label variant="outlined" color="purple" size="sm" rounded="pill">
  01
</Label>

// or for chapter headings
<Label variant="filled" color="purple" size="md">
  CHAPTER 1
</Label>
```

**Why:**
- Label with outlined variant → Clean pill-style chapter numbers
- Label with filled variant → Emphasized chapter headings

---

### 🖼️ **4. Slideshow Section** (`/src/app/components/SlideshowSection.tsx`)

#### Expected Usage:
```tsx
// Slide indicators
<Label variant="filled" color="purple" size="sm">
  SLIDE 1 OF 10
</Label>

// or Badge for emphasis
<Badge variant="purple" size="sm">
  📊 Visual Preview
</Badge>
```

**Why:**
- Label for slide numbers → Consistent with step indicators
- Badge for section emphasis → Matches other section identifiers

---

### 💡 **5. Report Highlights** (`/src/app/components/ReportHighlights.tsx`)

#### Current Usage:
```tsx
// Section identifier
<Badge variant="purple" size="md" className="gap-2">
  <span className="h-2 w-2 rounded-full bg-[#806ce0] animate-pulse"></span>
  Key Insights
</Badge>

// Metric badges (inline)
<div className="text-center">
  <div className="text-[1.25rem] font-bold text-[#806ce0]">
    {highlight.badge}
  </div>
  <div className="text-[0.75rem] text-[#737373]">
    {highlight.badgeLabel}
  </div>
</div>
```

#### 🔄 **Recommendation - PARTIAL UPDATE**

**Change to:**
```tsx
// Keep Badge for section identifier ✅
<Badge variant="purple" size="md" className="gap-2">
  <span className="h-2 w-2 rounded-full bg-[#806ce0] animate-pulse"></span>
  Key Insights
</Badge>

// Consider Label for metric labels (optional enhancement)
<div className="text-center">
  <div className="text-[1.25rem] font-bold text-[#806ce0]">
    {highlight.badge}
  </div>
  <Label variant="filled" color="default" size="sm">
    {highlight.badgeLabel}
  </Label>
</div>
```

**Why:**
- Badge for section identifier → Correct, visual emphasis
- Current metric display → Works well, but Label could provide consistency
- **Decision: Optional** - current implementation is acceptable

---

### 🔬 **6. Research Methodology** (`/src/app/components/ResearchMethodology.tsx`)

#### Current Usage:
```tsx
// Section identifier
<Badge variant="periwinkle" size="md" className="gap-2">
  <Shield className="h-4 w-4" />
  Research Excellence
</Badge>

// Step indicators
<Badge variant="periwinkle" size="sm">
  {step.step}
</Badge>
```

#### 🔄 **Recommendation - UPDATE STEP INDICATORS**

**Change to:**
```tsx
// Keep Badge for section identifier ✅
<Badge variant="periwinkle" size="md" className="gap-2">
  <Shield className="h-4 w-4" />
  Research Excellence
</Badge>

// Replace step indicators with Label
<Label variant="filled" color="periwinkle" size="sm" rounded="pill">
  {step.step}
</Label>
```

**Why:**
- Badge for section identifier → Correct, trust indicator
- Label for step indicators → More appropriate for sequential identifiers, pill shape provides clean look

---

### ❓ **7. FAQ Section** (`/src/app/components/FAQSection.tsx`)

#### Expected Usage:
```tsx
// Section identifier
<Badge variant="purple" size="md">
  💬 Frequently Asked
</Badge>

// or if using chapter/section pattern
<Label variant="filled" color="purple" size="md">
  FAQ
</Label>
```

**Why:**
- Badge for visual emphasis with emoji → More friendly
- Label for formal section header → More professional

---

### 🎪 **8. Banner Section** (`/src/app/components/BannerSection.tsx`)

#### Expected Usage:
```tsx
// Urgency indicator
<Badge variant="brand" size="md">
  🔥 Limited Time Offer
</Badge>

// or status label
<Label variant="filled" color="brand" size="md">
  SPECIAL OFFER
</Label>
```

**Why:**
- Badge with brand color → High visual impact for urgency
- Label → Professional, clean look for standard CTAs

---

### 📞 **9. CTA Section** (`/src/app/components/CTASection.tsx`)

#### Expected Usage:
```tsx
// Action label
<Badge variant="brand" size="md">
  🎯 Get Started Today
</Badge>
```

**Why:**
- Badge with brand color → Strong visual call-to-action

---

## Decision Matrix

| Component Type | Use Label | Use Badge | Rationale |
|----------------|-----------|-----------|-----------|
| **Section Headers** | ❌ | ✅ Badge | Visual emphasis, introduces sections |
| **Chapter Identifiers** | ✅ Label filled | ❌ | Editorial hierarchy, sequential content |
| **Step Indicators** | ✅ Label pill | ❌ | Sequential numbering, clean pills |
| **Premium Content Overlay** | ❌ | ✅ Badge | Status indicator, high visibility |
| **Status Messages** | ❌ | ✅ Badge | Live states, notifications |
| **Category Tags** | ✅ Label | ✅ Badge | Either works - use Badge for emphasis |
| **Data Labels** | ✅ Label | ❌ | Structured data, table headers |
| **Metric Labels** | ✅ Label | ❌ | Statistical data, chart labels |

---

## Implementation Priority

### 🔴 **High Priority - Update Now**
1. **Sample Report Preview** - Replace chapter label text with `<Label>` component
2. **Research Methodology** - Replace step Badge with `<Label rounded="pill">`

### 🟡 **Medium Priority - Consider Later**
3. **Extended TOC** - Verify and standardize chapter identifiers
4. **Slideshow Section** - Add proper Label/Badge for slide indicators

### 🟢 **Low Priority - Optional Enhancement**
5. **Report Highlights** - Consider Label for metric labels (current is fine)
6. **FAQ Section** - Standardize section identifier

---

## Quick Reference

### When to Use Label (Variant 1)
```tsx
// Filled variant - solid background
<Label variant="filled" color="purple" size="md">
  CHAPTER 1
</Label>

// Outlined variant - border only
<Label variant="outlined" color="purple" size="sm" rounded="pill">
  STEP 1
</Label>
```

**Use for:**
- Chapter numbers/titles
- Step indicators
- Sequential identifiers
- Data labels
- Category tags (formal)

---

### When to Use Badge (Variant 2)
```tsx
// Always filled style with light backgrounds
<Badge variant="purple" size="md">
  PREMIUM CONTENT
</Badge>

<Badge variant="periwinkle" size="md" className="gap-2">
  <Icon /> Trust Indicator
</Badge>
```

**Use for:**
- Section identifiers (top of sections)
- Status indicators
- Premium/locked content
- Notifications with icons
- Visual emphasis areas

---

## Design System Color Hierarchy (92-5-3 Rule)

- **92%** Foundation → Black/White backgrounds, text
- **5%** Supporting → Warm tones, subtle backgrounds
- **3%** Accent → Purple, Periwinkle, Perano, Brand Red

**Label/Badge Usage:**
- Use `color="purple"` for premium features (3% accent)
- Use `color="periwinkle"` for trust indicators (3% accent)
- Use `color="perano"` for data sections (3% accent)
- Use `color="brand"` sparingly for critical CTAs (3% accent)
- Use `color="default"` for most labels (92% foundation)

---

## Summary

✅ **Current Hero Section** - Already correct!
- Badge for "PREMIUM CONTENT" ✓
- SectionLabel for "New Report Available" ✓

🔄 **Need Updates:**
1. Sample Report Preview → Use Label for chapter headings
2. Research Methodology → Use Label (pill) for step indicators

📋 **Keep Monitoring:**
- Extended TOC chapter identifiers
- Slideshow slide indicators
- FAQ section headers