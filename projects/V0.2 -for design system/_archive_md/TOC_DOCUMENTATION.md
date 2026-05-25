# Table of Contents (TOC) Component Documentation

## Overview

The **Table of Contents (TOC)** is a sticky sidebar navigation component that provides:
- Real-time scroll tracking with active section highlighting
- Progress indication through section completion states
- Smooth scroll navigation to sections
- Collapsible/expandable states
- Mobile and desktop responsive design
- Time estimates for each section

---

## Component Architecture

### Main Components

1. **TableOfContentsSidebar** (`/src/app/components/TableOfContentsSidebar.tsx`)
   - Main TOC component with UI and navigation logic
   
2. **useScrollSpy Hook** (`/src/app/hooks/useScrollSpy.tsx`)
   - Custom React hook for detecting active section based on scroll position

---

## How It Works

### 1. Scroll Tracking (useScrollSpy)

**Mechanism:**
```
User scrolls → Window scroll event fires → Calculate scroll position with offset
→ Loop through section IDs (reverse order) → Find which section is in viewport
→ Update active section state → Trigger re-render with new active state
```

**Algorithm:**
- Loops through sections from bottom to top
- Checks if `scrollPosition >= sectionTop`
- First match becomes the active section
- Updates state only when section changes (optimization)

### 2. Section Status System

**Three States:**
1. **Completed** 🟢 - User has scrolled past this section
2. **Active** 🔵 - Currently viewing this section
3. **Upcoming** ⚪ - Not yet reached

**Status Calculation:**
```typescript
const getSectionStatus = (sectionId: string) => {
  const activeIndex = sections.findIndex(s => s.id === activeSection);
  const currentIndex = sections.findIndex(s => s.id === sectionId);
  
  if (currentIndex < activeIndex) return 'completed';
  if (currentIndex === activeIndex) return 'active';
  return 'upcoming';
};
```

### 3. Progress Calculation

**Formula:**
```
Progress % = ((Active Section Index + 1) / Total Sections) × 100
```

Example: If user is on section 3 of 11 sections:
```
Progress = (3 / 11) × 100 = 27.27%
```

### 4. Smooth Scroll Navigation

**Process:**
```
User clicks section → Get element by ID → Calculate offset position
→ Use window.scrollTo() with smooth behavior → Browser animates scroll
```

**Offset Calculation:**
```typescript
const offset = 120; // Account for fixed header height
const elementPosition = element.offsetTop - offset;
window.scrollTo({
  top: elementPosition,
  behavior: 'smooth'
});
```

---

## State Management

### Component States

| State | Type | Initial Value | Purpose |
|-------|------|---------------|---------|
| `isOpen` | boolean | `true` | Controls sidebar expanded/collapsed state |
| `activeSection` | string | `''` | ID of currently active section (from useScrollSpy) |

### Section Data Structure

```typescript
interface Section {
  number: string;      // Display number (e.g., "1", "2", "3")
  title: string;       // Section title
  time: string;        // Reading time estimate (e.g., "5m")
  id: string;          // DOM element ID for scrolling
}
```

**Example:**
```typescript
{
  number: '1',
  title: 'Market Overview',
  time: '5m',
  id: 'market-overview'
}
```

---

## Styling System

### Desktop Sidebar (lg:block)

**Container:**
- Position: `sticky top-[72px]` (below header)
- Height: `calc(100vh - 72px)` (full viewport minus header)
- Width: `255px` (expanded) or `80px` (collapsed)
- Background: `bg-white/80 backdrop-blur-xl` (glassmorphism)
- Border: `border border-[#e5e5e5]/50`
- Shadow: `shadow-lg shadow-[#e5e5e5]/10`

**Expanded State Features:**
- Header with "Table of Content" title
- Total reading time badge (56m)
- Full section titles visible
- Icons: Check mark (completed) or number badge

**Collapsed State Features:**
- Only numbered badges visible
- Vertical centered layout
- Title shown on hover (tooltip)
- More compact spacing

### Section Item Styling

**Active Section:**
- Background: `#f5f5f5`
- Text: `#171717` (bold)
- Badge: Black background with white icon/text
- Effect: Most prominent

**Completed Section:**
- Background: Transparent (hover: `#fafafa`)
- Text: `#171717/70` (semi-transparent)
- Badge: Black background with white checkmark
- Effect: Visible but secondary

**Upcoming Section:**
- Background: Transparent (hover: `#fafafa`)
- Text: `#737373/50` (faded)
- Badge: `#f5f5f5` background with faded number
- Effect: Least prominent

### Mobile TOC Button (lg:hidden)

- Position: `fixed bottom-24 left-4`
- Size: `48px × 48px` circular button
- Background: `#171717` (dark)
- Icon: List icon from Lucide
- Z-index: `50` (high priority)

---

## Visual Design

### Color Palette

| Element | Color Value | Usage |
|---------|-------------|-------|
| Primary Text | `#171717` | Active titles, bold text |
| Secondary Text | `#737373` | Time badges, upcoming items |
| Background Active | `#f5f5f5` | Active item highlight |
| Background Hover | `#fafafa` | Hover state |
| Badge Active/Complete | `#171717` | Active/completed badges |
| Badge Upcoming | `#f5f5f5` | Upcoming section badges |
| Border | `#e5e5e5` | Dividers and borders |

### Typography

- **Header Title:** Font size `sm`, bold, uppercase, wide tracking
- **Section Titles:** Font size `sm`, truncate overflow
- **Time Badge:** Font size `xs`, in grey pill
- **Section Numbers:** Font size `xs` in circular badges

### Spacing & Layout

- **Padding:** `px-2` to `px-4` depending on context
- **Gap:** `gap-2` between elements
- **Border Radius:** `rounded-[2.5px]` for items, `rounded-full` for badges
- **Transition:** `duration-200` to `duration-300` for smooth animations

---

## Icons & Visual Indicators

### Icon Library: Lucide React

**Icons Used:**
1. **List** - Mobile TOC button
2. **ChevronLeft** - Collapse/expand toggle (rotates 180° when collapsed)
3. **Check** - Completed section indicator

### Badge System

**Completed Sections:**
```
Black circle → White checkmark → Bold stroke (3px)
```

**Active Section (Not Completed):**
```
Black circle → White number → Standard weight
```

**Upcoming Sections:**
```
Light grey circle → Grey number → Faded appearance
```

---

## Responsive Behavior

### Desktop (lg and above)

- **Visible:** Full sticky sidebar on left side
- **Width:** 255px (expanded) or 80px (collapsed)
- **Position:** Sticky, follows scroll
- **Layout:** Part of flex container with main content

### Mobile (below lg)

- **Hidden:** Desktop sidebar is `hidden lg:block`
- **Replacement:** Floating circular button (currently non-functional)
- **Position:** Fixed bottom-left corner
- **Future Enhancement:** Should open modal/drawer with TOC

---

## Integration Guide

### Step 1: HTML Structure Requirements

Your page sections MUST have matching IDs:

```html
<section id="market-overview">
  <!-- Content -->
</section>

<section id="scope-of-report">
  <!-- Content -->
</section>

<section id="market-analysis">
  <!-- Content -->
</section>
```

### Step 2: Define Section Configuration

```typescript
const sections = [
  { number: '1', title: 'Market Overview', time: '5m', id: 'market-overview' },
  { number: '2', title: 'Scope of Report', time: '4m', id: 'scope-of-report' },
  { number: '3', title: 'Market Size & Growth', time: '6m', id: 'market-analysis' },
  // ... more sections
];
```

### Step 3: Add TOC to Layout

```tsx
<div className="flex">
  <TableOfContentsSidebar />
  
  <main className="flex-1 pb-16 min-w-0">
    {/* Your page sections */}
  </main>
</div>
```

### Step 4: Configure Header Offset

Adjust the offset based on your fixed header height:

```typescript
// In useScrollSpy hook
const offset = 200; // Header height + desired margin

// In scrollToSection function
const offset = 120; // Adjust to match your header
```

---

## Customization Options

### 1. Change Colors

**Active State:**
```typescript
className={`${isActive ? 'bg-[YOUR-COLOR] text-[YOUR-TEXT-COLOR] font-bold' : '...'}`}
```

**Badge Colors:**
```typescript
className={`${isActive ? 'bg-[YOUR-BADGE-BG] text-[YOUR-BADGE-TEXT]' : '...'}`}
```

### 2. Adjust Width

```typescript
// Expanded width
className={`${isOpen ? 'w-[300px]' : 'w-20'}`}

// Collapsed width
className={`${isOpen ? 'w-[255px]' : 'w-16'}`}
```

### 3. Modify Scroll Offset

```typescript
// More space from top
const activeSection = useScrollSpy(sectionIds, 300);

// Less space from top
const activeSection = useScrollSpy(sectionIds, 100);
```

### 4. Change Animations

```typescript
// Slower transitions
className="transition-all duration-500"

// Faster transitions
className="transition-all duration-100"
```

### 5. Custom Time Calculation

```typescript
const totalTime = sections.reduce((acc, section) => {
  const minutes = parseInt(section.time);
  return acc + minutes;
}, 0);
```

---

## Advanced Features

### 1. Keyboard Navigation (Future Enhancement)

```typescript
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      // Navigate to next section
    }
    if (e.key === 'ArrowUp') {
      // Navigate to previous section
    }
  };
  
  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);
```

### 2. Local Storage Persistence

```typescript
// Save collapsed state
useEffect(() => {
  localStorage.setItem('toc-collapsed', JSON.stringify(!isOpen));
}, [isOpen]);

// Restore on load
const [isOpen, setIsOpen] = useState(() => {
  const saved = localStorage.getItem('toc-collapsed');
  return saved ? !JSON.parse(saved) : true;
});
```

### 3. Mobile Drawer Implementation

```typescript
const [mobileOpen, setMobileOpen] = useState(false);

// Mobile button
<button onClick={() => setMobileOpen(true)}>
  <List className="h-5 w-5" />
</button>

// Drawer/Modal
{mobileOpen && (
  <div className="fixed inset-0 z-50 lg:hidden">
    {/* Overlay + Drawer content */}
  </div>
)}
```

### 4. Progress Bar

```typescript
<div className="h-1 bg-gray-200 w-full">
  <div 
    className="h-full bg-[#171717] transition-all duration-300"
    style={{ width: `${calculateProgress()}%` }}
  />
</div>
```

---

## Performance Optimizations

### 1. Scroll Event Throttling

The `useScrollSpy` hook uses passive event listeners:

```typescript
window.addEventListener('scroll', handleScroll, { passive: true });
```

**Benefits:**
- Prevents scroll blocking
- Improves scroll performance
- No need for manual throttling

### 2. Efficient Status Calculation

Status is calculated on-demand, not stored:

```typescript
// ✅ Good: Calculate when needed
const status = getSectionStatus(section.id);

// ❌ Bad: Store in state (unnecessary re-renders)
const [statuses, setStatuses] = useState({});
```

### 3. Conditional Rendering

Collapsed state uses different JSX to avoid hidden content:

```typescript
{isOpen ? (
  <ExpandedContent />
) : (
  <CollapsedContent />
)}
```

---

## Accessibility

### Current Features

- **Semantic HTML:** `<nav>`, `<aside>`, proper button elements
- **Keyboard Navigation:** All buttons are focusable
- **Visual Feedback:** Clear hover and active states
- **Screen Readers:** Descriptive text on all interactive elements

### Recommended Enhancements

```typescript
// 1. ARIA Labels
<nav aria-label="Table of contents">
  {/* sections */}
</nav>

// 2. Current Page Indicator
<button aria-current={isActive ? 'page' : undefined}>
  {section.title}
</button>

// 3. Collapse Button Label
<button 
  aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
  aria-expanded={isOpen}
>
  <ChevronLeft />
</button>

// 4. Section Progress
<span className="sr-only">
  Section {activeIndex + 1} of {sections.length}
</span>
```

---

## Common Issues & Solutions

### Issue 1: Sections Not Highlighting

**Problem:** Active section doesn't update when scrolling

**Solutions:**
1. Check section IDs match exactly
2. Verify sections are in DOM when component mounts
3. Adjust offset value in useScrollSpy
4. Check for CSS that might affect offsetTop calculation

```typescript
// Debug: Log section positions
sections.forEach(section => {
  const el = document.getElementById(section.id);
  console.log(section.id, el?.offsetTop);
});
```

### Issue 2: Smooth Scroll Not Working

**Problem:** Clicking sections jumps instead of smooth scrolling

**Solutions:**
1. Check browser support for smooth scroll
2. Add polyfill for older browsers
3. Verify no CSS `scroll-behavior` conflicts

```typescript
// Fallback for browsers without smooth scroll
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({ top: element.offsetTop - 120, behavior: 'smooth' });
    } else {
      // Polyfill or instant scroll
      window.scrollTo(0, element.offsetTop - 120);
    }
  }
};
```

### Issue 3: TOC Overlapping Content

**Problem:** Sidebar covers main content on certain screen sizes

**Solutions:**
1. Adjust breakpoints in responsive classes
2. Add proper flex layout to parent
3. Set min-width on main content

```tsx
<div className="flex">
  <TableOfContentsSidebar />
  <main className="flex-1 min-w-0 pb-16">
    {/* min-w-0 allows flex item to shrink */}
  </main>
</div>
```

### Issue 4: Wrong Section Active on Page Load

**Problem:** First section not highlighted on initial page load

**Solutions:**
1. Ensure useScrollSpy runs initial check
2. Add default active section
3. Trigger scroll event after mount

```typescript
useEffect(() => {
  handleScroll(); // Initial check
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, [sectionIds, offset]);
```

---

## Browser Compatibility

### Supported Browsers

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Features Requiring Polyfills

1. **Smooth Scroll:** `scroll-behavior` CSS property
2. **Backdrop Filter:** Glassmorphism effect (use fallback)
3. **Intersection Observer:** Alternative to scroll events (optional)

---

## File Dependencies

### Required Files

```
/src/app/components/TableOfContentsSidebar.tsx  (Main component)
/src/app/hooks/useScrollSpy.tsx                 (Scroll tracking hook)
```

### External Dependencies

```json
{
  "react": "^18.x",
  "lucide-react": "^0.x"
}
```

### Tailwind CSS Required

- Custom colors must be defined
- Responsive breakpoints must be configured
- Backdrop filter plugin (for glassmorphism)

---

## Testing Recommendations

### Unit Tests

```typescript
describe('TableOfContentsSidebar', () => {
  it('should render all sections', () => {});
  it('should toggle collapsed state', () => {});
  it('should highlight active section', () => {});
  it('should scroll to section on click', () => {});
});

describe('useScrollSpy', () => {
  it('should return empty string initially', () => {});
  it('should update active section on scroll', () => {});
  it('should handle missing sections', () => {});
});
```

### Manual Testing Checklist

- [ ] Scroll through all sections - active state updates correctly
- [ ] Click each TOC item - smooth scroll to section
- [ ] Toggle collapse/expand - animation smooth, icons rotate
- [ ] Resize browser - responsive behavior correct
- [ ] Reload page - initial state correct
- [ ] Test on mobile - button visible, desktop TOC hidden
- [ ] Check hover states - all interactive elements respond
- [ ] Keyboard navigation - can tab through all items
- [ ] Test with different section counts - layout adapts

---

## Future Enhancements

### Priority 1: Mobile Drawer

- Add slide-out drawer for mobile
- Touch gestures for open/close
- Overlay with backdrop

### Priority 2: Search Functionality

- Add search input in TOC header
- Filter sections by keyword
- Highlight matching text

### Priority 3: Section Bookmarking

- Allow users to bookmark sections
- Visual indicator for bookmarks
- Quick jump to bookmarked items

### Priority 4: Reading Time Tracking

- Track actual time spent in each section
- Update estimates based on user data
- Show completion percentage

### Priority 5: Print Optimization

- Hide TOC in print view or
- Convert to static list of links
- Adjust styling for print media

---

## Related Documentation

- [Project Documentation](./PROJECT_DOCUMENTATION.md) - Full project overview
- [Design System](./DESIGN_SYSTEM_DOCUMENTATION.md) - Color, typography, spacing
- [Component Guide](./COMPONENT_MAP.md) - All components in project

---

## Credits

**Built with:**
- React 18
- TypeScript
- Tailwind CSS
- Lucide React Icons

**Design Pattern:**
- Sticky navigation with scroll spy
- Progressive disclosure (collapse/expand)
- Visual progress indicators

---

**Last Updated:** February 11, 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
