# KP 2.0 Design System - Component Specifications

## Component Inventory

### Core UI Components

#### 1. Button Component (`/ui/button.tsx`)

**Variants:**
- `default` - Standard primary button
- `cta` - Call-to-action with brand red gradient
- `outline` - Bordered button with hover effects
- `secondary` - Transparent with border
- `ghost` - No border, subtle hover
- `link` - Text link with underline
- `glass` - Glassmorphic style for hero overlays
- `ctaBlack` - Black solid CTA variant

**Sizes:**
- `sm` - Small (h: 8, px: 3)
- `default` - Standard (h: 12, px: 6)
- `lg` - Large (h: 12, px: 6)
- `icon` - Square icon button (9x9)

**Props:**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "cta" | "outline" | "secondary" | "ghost" | "link" | "glass" | "ctaBlack";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean; // Renders as child component using Radix Slot
}
```

**Design Tokens:**
- Border Radius: `rounded-md` (default), `rounded-[var(--radius-sm)]` (secondary/ctaBlack)
- Transitions: `transition-all`
- Focus Ring: `focus-visible:ring-[3px]`
- Hover Shadow: Brand-specific shadows for CTA variant

**Usage Examples:**
```tsx
<Button variant="cta" size="lg">Download Report</Button>
<Button variant="outline">Learn More</Button>
<Button variant="ghost" size="icon"><Icon /></Button>
```

---

#### 2. Card Component (`/ui/card.tsx`)

**Sub-components:**
- `Card` - Main container
- `CardHeader` - Header section with grid layout
- `CardTitle` - Heading (h3)
- `CardDescription` - Subtitle/description
- `CardContent` - Main content area
- `CardFooter` - Footer section
- `CardAction` - Action buttons in header

**Design Tokens:**
- Background: `bg-white`
- Border: `border border-[var(--color-border-default)]`
- Border Radius: `rounded-[var(--radius-md)]` (10px)
- Shadow: `shadow-[var(--elevation-sm)]` → `hover:shadow-[var(--elevation-md)]`
- Transition: `transition-shadow duration-[var(--duration-sm)]`

**Props:**
```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
```

**Layout:**
- Header: Grid with auto rows, supports action buttons
- Content: `px-6` with conditional `pb-6` on last child
- Footer: Flex layout with `px-6 pb-6`

**Usage Examples:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Market Overview</CardTitle>
    <CardDescription>Key insights and trends</CardDescription>
    <CardAction>
      <Button variant="ghost" size="icon">...</Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    <p>Content goes here...</p>
  </CardContent>
  <CardFooter>
    <Button>View Details</Button>
  </CardFooter>
</Card>
```

---

#### 3. Badge Component (`/ui/badge.tsx`)

**Variants:**
- `default` - Primary background
- `secondary` - Secondary background
- `destructive` - Error/warning style
- `outline` - Bordered style

**Design Tokens:**
- Border Radius: `rounded-md`
- Padding: `px-2 py-0.5`
- Font Size: `text-xs`
- Font Weight: `font-medium`

**Props:**
```typescript
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
  asChild?: boolean;
}
```

**Usage Examples:**
```tsx
<Badge>New</Badge>
<Badge variant="secondary">Updated</Badge>
<Badge variant="destructive">Error</Badge>
```

---

### Custom Components

#### 4. SectionHeader Component (`/components/SectionHeader.tsx`)

**Purpose:** Standardized section headers with chapter numbering system

**Props:**
```typescript
interface SectionHeaderProps {
  chapter?: string;          // "CHAPTER 3"
  title: string;             // "Market Analysis"
  heading?: ReactNode;       // Custom heading element
  subtitle?: string;         // Subtitle text (supports \n for line breaks)
  description?: string;      // Description paragraph
}
```

**Design Specifications:**
- Chapter/Title: `text-sm font-bold tracking-widest uppercase text-[var(--brand-red)]`
- Heading: `text-3xl tracking-tight text-black-900`
- Description: `text-base leading-relaxed max-w-3xl mt-4 text-black-500`
- Bottom Margin: `mb-16`

**Format Rules:**
- Chapter format: "CHAPTER [NUMBER]"
- Display format: "CHAPTER [NUMBER]: [Title]"
- NO DASHES between chapter and title

**Usage Example:**
```tsx
<SectionHeader
  chapter="CHAPTER 5"
  title="Competitive Landscape"
  subtitle="Market Leaders and Key Players\nComprehensive Analysis"
  description="The Qatar Fresh Herbs Market is characterized by a dynamic mix of regional and international players..."
/>
```

---

#### 5. FinalCTA Component (`/components/FinalCTA.tsx`)

**Purpose:** Gradient CTA banner with lift animation and dual buttons

**Design Features:**
1. **Gradient Animation**
   - Base: `bg-gradient-to-r` (horizontal left to right)
   - Hover: `bg-gradient-to-br` (diagonal bottom-right)
   - Colors: `from-[var(--brand-red-active)] via-[var(--brand-red)] to-[var(--red-500)]`

2. **Lift Effect**
   - Transform: `hover:-translate-y-2` (8px lift)
   - Shadow Base: `shadow-[0_20px_25px_-5px_rgba(176,31,36,0.3),0_8px_10px_-6px_rgba(176,31,36,0.2)]`
   - Shadow Hover: `shadow-[0_25px_35px_-5px_rgba(176,31,36,0.4),0_12px_15px_-6px_rgba(176,31,36,0.3)]`
   - Transition: `transition-all duration-500`

3. **Decorative Elements**
   - Geometric shapes (circles, squares) at 10% opacity
   - White borders on shapes
   - Positioned absolutely within card

4. **Button Styling**
   - Primary: White background with red text
   - Secondary: Outlined with glassmorphic fill
     - Border: `border-2 border-white`
     - Background: `bg-white/20` → `hover:bg-transparent`
     - Text: Always white (`text-white hover:text-white`)
     - Backdrop blur for depth

**Layout:**
- Section padding: `px-[67.5px] lg:px-[90px]`
- Card padding: `p-6`
- Content spacing: `mt-6` for buttons

**Usage:**
```tsx
<FinalCTA />
```

---

## Design Token Reference

### Color Tokens
```css
/* Brand Colors */
--brand-red: #b01f24;
--brand-red-hover: #8f181d;
--brand-red-active: #771419;

/* Purple Scale (Charts/Interactive) */
--purple-500: #7f5fe3;  /* BASE */
--purple-600: #6d52d9;

/* Grayscale */
--black-50: #fafafa;
--black-100: #f5f5f5;
--black-200: #e5e5e5;
--black-300: #d4d4d4;
--black-500: #737373;
--black-600: #525252;
--black-900: #171717;
```

### Typography Tokens
```css
/* Font Sizes */
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 20px;
--text-xl: 25px;
--text-2xl: 31px;
--text-3xl: 39px;
--text-4xl: 48px;

/* Line Heights */
--leading-tight: 1.2;
--leading-snug: 1.3;
--leading-normal: 1.4;
--leading-relaxed: 1.5;
--leading-comfortable: 1.6;
```

### Spacing Tokens
```css
/* Base Scale */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
```

### Border Radius Tokens
```css
--radius-xs: 2.5px;
--radius-sm: 5px;
--radius-md: 10px;  /* Standard for cards */
--radius-lg: 15px;
--radius-xl: 20px;
--radius-full: 9999px;
```

### Shadow Tokens
```css
--elevation-xs: 0 1px 2px rgba(0,0,0,0.08);
--elevation-sm: 0 1px 2px rgba(0,0,0,0.08);
--elevation-md: 0 4px 12px rgba(0,0,0,0.12);
--elevation-lg: 0 12px 28px rgba(0,0,0,0.18);
--elevation-xl: 0 20px 40px rgba(0,0,0,0.22);

/* Brand Shadows */
--shadow-brand-red: 0 10px 15px -3px rgba(176, 31, 36, 0.1), 0 4px 6px -4px rgba(176, 31, 36, 0.1);
--shadow-brand-red-hover: 0 20px 25px -5px rgba(176, 31, 36, 0.15), 0 8px 10px -6px rgba(176, 31, 36, 0.1);
```

---

## Component States

### Button States
1. **Default**: Base appearance
2. **Hover**: Color shift, shadow increase (CTA), scale (some variants)
3. **Active**: Pressed state with color darkening
4. **Focus**: Ring outline (`ring-[3px]`)
5. **Disabled**: `opacity-50 pointer-events-none`

### Card States
1. **Default**: Base shadow (`elevation-sm`)
2. **Hover**: Enhanced shadow (`elevation-md`)

### Interactive Element States
- **Focus Ring**: 3px width, brand color or appropriate semantic color
- **Hover Scale**: `hover:scale-[1.02]` for buttons in special contexts
- **Transitions**: Default `300ms` for most interactions

---

## Accessibility Features

### Keyboard Navigation
- All buttons support keyboard focus
- Focus rings meet WCAG contrast requirements
- Tab order follows logical flow

### ARIA Attributes
- Semantic HTML elements used throughout
- `data-slot` attributes for component identification
- Screen reader text where needed

### Color Contrast
- Text on white: Minimum AA rating (4.5:1)
- Interactive elements: Clear hover/focus states
- Brand red on white: AAA compliant

---

## Responsive Behavior

### Breakpoints
- Mobile: < 1024px
- Desktop: ≥ 1024px (lg breakpoint)

### Layout Adjustments
- Section padding: `px-[84.375px]` → `lg:px-[112.5px]`
- Vertical spacing: `py-24` → `lg:py-32`
- Grid columns: Responsive with `lg:` prefix

---

## Animation Guidelines

### Durations
- Quick feedback: 150-300ms
- Standard transitions: 300-500ms
- Complex animations: 500-800ms

### Easing
- Exit animations: `cubic-bezier(0.16, 1, 0.3, 1)`
- Entry/exit: `cubic-bezier(0.4, 0, 0.2, 1)`

### Transform Properties
- Translate: Lift effects, slide transitions
- Scale: Subtle emphasis (1.02 max)
- Rotate: Decorative elements only

---

## Best Practices

### Component Composition
1. Use semantic HTML elements
2. Compose components with clear prop interfaces
3. Support `className` for customization
4. Use `asChild` pattern for flexible rendering

### Styling Approach
1. Tailwind CSS v4 classes preferred
2. CSS custom properties for tokens
3. Inline styles for dynamic values only
4. Class merging with `cn()` utility

### Performance
1. Minimize re-renders with proper memoization
2. Use CSS transitions over JS animations
3. Optimize shadow usage (avoid nested shadows)
4. Lazy load heavy components when possible
