# 🎯 COMPREHENSIVE DESIGN SYSTEM COMPONENT ANALYSIS - PART 5B

**Continuation of Part 5**  
**Focus:** Complex Interactive Components (FloatingCTA, MindMap, DataTable, InlineStats)

---

## **22.4 FloatingCTA Component**

### **WHAT**
A sticky bottom banner that slides up when user scrolls past hero section and hides when final CTA section is visible. Contains report interest message and two CTA buttons.

### **WHY**
- Maintains CTA visibility while scrolling
- Non-intrusive (hides at hero and final CTA)
- Increases conversion opportunities
- Reminds users of available actions
- Professional sticky behavior

### **WHEN TO USE**
✅ Long-form content pages  
✅ Product/report pages  
✅ High-conversion pages  
✅ Multi-section landing pages  

❌ DON'T use for:
- Short pages
- Checkout/forms (distracting)
- Documentation
- Already CTA-heavy pages

### **WHERE USED**
- Report landing pages (primary)
- Product showcase pages
- Multi-section marketing pages

---

### **HOW IT WORKS**

#### **Visibility Logic**
```typescript
useEffect(() => {
  const handleScroll = () => {
    const heroSection = document.querySelector('section');
    const finalCTASection = document.getElementById('final-cta');
    
    if (heroSection && finalCTASection) {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      const finalCTATop = finalCTASection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      // Show CTA when hero is scrolled past AND final CTA not in viewport yet
      const showCTA = heroBottom < 0 && finalCTATop > windowHeight;
      setIsVisible(showCTA);
    }
  };
  
  // ... scroll listener with throttling
}, []);
```

**3-STATE SYSTEM:**

| Scroll Position | Visible? | Reason |
|----------------|----------|---------|
| **At hero section** | ❌ Hidden | Hero has primary CTAs |
| **Middle content** | ✅ Visible | Keep CTAs accessible |
| **At final CTA** | ❌ Hidden | Final CTA section handles it |

**WHY THIS LOGIC:**
- Avoid CTA duplication at hero
- Provide persistent access during scroll
- Don't compete with final CTA
- Clean visual experience

---

### **PERFORMANCE OPTIMIZATION**

#### **Throttled Scroll Listener**
```typescript
let ticking = false;
const scrollListener = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
};

window.addEventListener('scroll', scrollListener, { passive: true });
```

**Features:**
- requestAnimationFrame throttling
- Prevents excessive calculations
- `passive: true` for better scroll performance
- Boolean flag prevents queue buildup

**WHY THROTTLE:**
- Scroll events fire rapidly (100s per second)
- DOM queries are expensive
- 60fps target requires optimization
- Battery savings on mobile

---

### **SLIDE-UP ANIMATION**

```tsx
<div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
}`}>
```

**Animation Properties:**
- Transform: `translateY(100%)` → `translateY(0)`
- Opacity: 0 → 1
- Duration: 500ms (smooth, not too fast)
- Easing: ease-in-out (natural motion)
- Z-index: 50 (above content, below modals)

**WHY COMBINED TRANSFORM + OPACITY:**
- Transform alone = visible during slide
- Opacity + transform = smooth fade-slide
- Professional appearance
- Perceived performance boost

---

### **VISUAL DESIGN**

#### **Container**
```tsx
<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#f5f5f5] shadow-2xl">
  <div className="w-[85%] py-4 mx-auto">
    {/* Content */}
  </div>
</div>
```

**Styling:**
- Position: Fixed bottom
- Width: Full viewport
- Inner content: 85% width (centered)
- Background: White
- Border-top: Light grey
- Shadow: 2xl (prominent, lifts from page)

**WHY 85% WIDTH:**
- Breathing room on sides
- Matches content width patterns
- Not too narrow, not full-bleed
- Professional spacing

---

#### **Content Layout**
```tsx
<div className="flex items-center justify-between gap-6">
  {/* Left: Text content (flex-1) */}
  <div className="flex-1">
    <p className="text-sm leading-relaxed text-[#171717]">
      <span className="font-bold">Interested in this report?</span>
      <br />
      Get expert insights tailored to your business needs...
    </p>
  </div>
  
  {/* Right: Buttons (flex-shrink-0) */}
  <div className="flex items-center gap-3 flex-shrink-0">
    <Button variant="secondary">Connect with Consultant</Button>
    <Button variant="cta">Download sample report</Button>
  </div>
</div>
```

**Layout Strategy:**
- Left text: `flex-1` (takes available space)
- Right buttons: `flex-shrink-0` (never shrinks)
- Gap: 24px between sections
- Buttons gap: 12px between each

---

### **TYPOGRAPHY**

```tsx
<span className="font-bold">Interested in this report?</span>
<br />
Get expert insights tailored to your business needs and unlock strategic opportunities in the Qatar Fresh Herbs Market.
```

**Styling:**
- Size: 14px (text-sm)
- Line-height: 1.625 (leading-relaxed)
- Color: Black (#171717)
- First line: Bold
- Second line: Normal weight
- Line break creates emphasis hierarchy

---

### **BUTTON VARIANTS**

#### **Secondary Button**
```tsx
<Button 
  variant="secondary"
  size="default"
  className="text-[#404040]"
>
  Connect with Consultant
</Button>
```

**Appearance:**
- Background: White
- Border: Grey
- Text: Dark grey (#404040)
- Hover: Darkens slightly

#### **CTA Button**
```tsx
<Button 
  variant="cta"
  size="default"
>
  Download sample report
</Button>
```

**Appearance:**
- Background: RED gradient (#b01f24)
- Text: White
- Hover: Darker gradient
- Primary action emphasis

**BUTTON ORDER:**
- Secondary left (lower priority)
- CTA right (primary action)
- Standard UX pattern

---

### **Z-INDEX HIERARCHY**

```tsx
z-50  // FloatingCTA
z-50  // Header (same level, but header above due to DOM order)
z-40  // Other sticky elements
z-30  // Content overlays
```

**WHY z-50:**
- Above all content
- Same as header (coexist peacefully)
- Below modals (z-60+)
- Professional stacking

---

### **RESPONSIVE BEHAVIOR**

#### **Desktop (Current Implementation)**
- Horizontal layout
- Text left, buttons right
- Full 85% width
- Generous spacing

#### **Mobile Considerations (Future Enhancement)**
```tsx
// Recommended mobile improvement:
<div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
  <div className="flex-1">
    <p className="text-sm md:text-sm">{/* Text */}</p>
  </div>
  <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2 md:gap-3">
    {/* Buttons stack on mobile */}
  </div>
</div>
```

**Mobile Strategy:**
- Stack vertically
- Buttons full-width
- Smaller text
- Reduced padding

---

### **ACCESSIBILITY**

#### **Keyboard Navigation**
- All buttons keyboard-accessible
- Focus visible on tab
- Enter/Space to activate
- Escape to dismiss (potential enhancement)

#### **Screen Readers**
- Semantic HTML structure
- Button labels descriptive
- ARIA landmarks considered
- Announcement when appears (potential enhancement)

#### **Motion Sensitivity**
```css
@media (prefers-reduced-motion: reduce) {
  .floating-cta {
    transition: none;
  }
}
```

**Future Enhancement:**
- Respect user motion preferences
- Instant show/hide instead of slide
- Accessibility best practice

---

### **EDGE CASES HANDLED**

#### **Missing Sections**
```typescript
if (heroSection && finalCTASection) {
  // Only proceed if both sections exist
}
```

**Safety:**
- Checks DOM elements exist
- Prevents errors if structure changes
- Graceful degradation

#### **Rapid Scrolling**
- Throttled listener prevents performance issues
- State updates batched by React
- Smooth even with fast scroll

#### **Page Resize**
- Percentage-based width (85%)
- Flex layout adapts
- No fixed pixel widths

---

### **COMPARISON: FloatingCTA vs Hero CTAs**

| Feature | FloatingCTA | Hero CTAs |
|---------|-------------|-----------|
| **Position** | Fixed bottom | Static in hero |
| **Visibility** | Conditional (scroll-based) | Always visible in hero |
| **Background** | White | Glass/transparent |
| **Text** | Short reminder | Full description |
| **Height** | Compact (~80px) | Part of large hero |
| **Purpose** | Persistent reminder | Primary introduction |
| **Animation** | Slide up/down | Fade in on load |

---

### **USAGE BEST PRACTICES**

#### **✅ DO:**
- Use on long pages (5+ sections)
- Ensure `#final-cta` ID exists
- Keep text concise (2 lines max)
- Test scroll performance
- Provide both primary and secondary CTAs

#### **❌ DON'T:**
- Use on short pages (<3 sections)
- Forget final CTA section
- Make text too long
- Add too many buttons (max 2)
- Stack with other sticky banners

---

### **CONVERSION OPTIMIZATION**

#### **Why This Pattern Works:**
1. **Non-intrusive:** Hides when not needed
2. **Persistent:** Available during content consumption
3. **Dual options:** Serves different user intents
4. **Professional:** Smooth animations, clean design
5. **Strategic:** Appears after hero engagement

#### **A/B Testing Opportunities:**
- Text variations
- Button order
- Show/hide timing
- Background color
- Icon additions

---

## **22.5 MindMap Component**

### **WHAT**
An interactive, zoomable, collapsible tree visualization built with D3.js. Displays hierarchical data (Table of Contents) with exclusive sibling expansion, smart spacing, animated transitions, and search highlighting.

### **WHY**
- Visualizes complex hierarchies
- Interactive exploration (click to expand)
- Better than nested lists for large structures
- Professional data visualization
- Engaging user experience

### **WHEN TO USE**
✅ Table of Contents (100+ items)  
✅ Organizational charts  
✅ Category hierarchies  
✅ Decision trees  
✅ Knowledge maps  

❌ DON'T use for:
- Simple lists (3-10 items)
- Linear content
- Mobile-first experiences (complex interaction)
- Print layouts

### **WHERE USED**
- TOC section (primary use)
- Modal TOC view
- Documentation navigation
- Content exploration

---

### **HOW IT WORKS**

#### **Core Technologies**
- **D3.js** - Data visualization library
- **React** - Component framework
- **TypeScript** - Type safety
- **SVG** - Scalable graphics
- **requestAnimationFrame** - Smooth animations

---

### **DATA STRUCTURE**

```typescript
interface MindMapNode {
  name: string;
  children?: MindMapNode[];
}

// Example:
const data: MindMapNode = {
  name: "Qatar Fresh Herbs Market",
  children: [
    {
      name: "Executive Summary",
      children: [
        { name: "Market Overview" },
        { name: "Key Findings" },
        { name: "Methodology" }
      ]
    },
    {
      name: "Market Analysis",
      children: [...]
    }
  ]
};
```

**Hierarchy:**
- **Level 0:** Root (Report title)
- **Level 1:** Chapters
- **Level 2:** Sections
- **Level 3+:** Subsections

---

### **INITIALIZATION & COLLAPSE**

```typescript
useEffect(() => {
  const root = d3.hierarchy(data) as HierarchyNode;
  root.x0 = 0;
  root.y0 = 0;

  // Collapse all nodes except root on start
  function collapse(d: HierarchyNode) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = undefined;
    }
  }

  if (root.children) {
    root.children.forEach(collapse);
  }

  rootRef.current = root;
}, [data]);
```

**LOGIC:**
- Convert data to D3 hierarchy
- Store children in `_children` (hidden)
- Set `children` to undefined (collapsed)
- Root stays expanded (shows Level 1)

**WHY START COLLAPSED:**
- Prevents overwhelming view
- Focuses on top-level structure
- User explores progressively
- Better performance (fewer nodes rendered)

---

### **INTERACTION MODES**

```typescript
interactionMode?: 'full' | 'preview';
```

| Mode | Pan/Zoom | Click | Auto-Focus | Use Case |
|------|----------|-------|------------|----------|
| **'full'** | ✅ Yes | ✅ Expand/collapse | ✅ Yes | Main TOC section |
| **'preview'** | ❌ No | ✅ Expand/collapse | ❌ No | Modal preview |

**'full' Mode:**
- Drag to pan
- Scroll to zoom
- Click nodes to expand
- Auto-centers clicked node

**'preview' Mode:**
- Fixed position (centered)
- Click to expand only
- No pan/zoom distraction
- Simpler interaction

---

### **SPACING SYSTEM**

#### **Vertical Spacing (Between Nodes)**
```typescript
const treeLayout = d3.tree<MindMapNode>().nodeSize([66, 360]);
```

- **66px** vertical gap (10% increase from default 60px)
- Ensures readability
- Prevents overlap

#### **Horizontal Spacing (Depth Levels)**
```typescript
nodes.forEach((d) => { 
  if (d.depth === 0) {
    d.y = 0;              // Root
  } else if (d.depth === 1) {
    d.y = 360;            // Level 1
  } else if (d.depth === 2) {
    d.y = 720;            // Level 2
  } else {
    d.y = 720 + (d.depth - 2) * 360 + 60;  // Level 3+ (extra 60px gap)
  }
});
```

**Spacing Breakdown:**

| Level | Distance from Root | Gap from Previous | Reasoning |
|-------|-------------------|-------------------|-----------|
| **0 (Root)** | 0px | - | Starting point |
| **1 (Chapters)** | 360px | 360px | Standard chapter spacing |
| **2 (Sections)** | 720px | 360px | Consistent spacing |
| **3 (Subsections)** | 1140px | 420px | **Extra 60px** for clarity |
| **4+** | 360px increments + 60px | 360px | Maintains pattern |

**WHY EXTRA GAP AT LEVEL 3:**
- Visual separation from parent levels
- Indicates deeper hierarchy
- Prevents crowding at deeper levels
- Improved readability

---

### **NODE VISUAL DESIGN**

#### **Pill Shape (KP 2.0)**
```typescript
nodeEnter.append('rect')
  .attr('class', 'pill shadow-md')
  .attr('rx', 10)  // Border radius
  .attr('ry', 10)
  .attr('y', -18)  // Centered (36px height)
  .attr('x', -16)  // Left padding
  .attr('height', 36)
  .style("fill", "#ffffff")
  .style("stroke", "#e5e5e5");
```

**Dimensions:**
- Height: **36px** (KP 2.0 standard)
- Border radius: **10px** (var(--radius-md))
- Padding: 16px left + 16px right
- Dynamic width based on text length

#### **Width Calculation**
```typescript
.attr('width', (d) => {
  const count = getChildCount(d);
  const badgeWidth = count > 0 ? 35 : 0;
  const gapBetweenTextAndBadge = count > 0 ? 8 : 0;
  return d.data.name.length * 7.5 + 32 + gapBetweenTextAndBadge + badgeWidth;
})
```

**Formula:**
```
Width = (text_length × 7.5px) + 32px padding + 8px gap + badge_width
```

**Example:**
- Text: "Executive Summary" (17 chars)
- Calculation: `17 × 7.5 + 32 + 8 + 35 = 202.5px`

---

### **COLOR STATES**

#### **Node Background Fill**
```typescript
.style("fill", (d) => {
  if (d.depth === 0) return "#171717";  // Root: Black
  const isMatch = searchTerm && d.data.name.toLowerCase().includes(searchTerm);
  if (isMatch) return "#f5f5f5";  // Search match: Light grey
  return "#ffffff";  // Default: White
})
```

| State | Background | Border | Text | Use Case |
|-------|------------|--------|------|----------|
| **Root** | Black (#171717) | Black | White | Root node emphasis |
| **Expanded** | White | Dark grey (#525252) | Black | Has visible children |
| **Collapsed** | White | Light grey (#e5e5e5) | Black | Has hidden children |
| **Active/Clicked** | White | Black (2px) | Black | Recently clicked |
| **Search Match** | Light grey (#f5f5f5) | Black | Black | Search highlight |

---

### **BADGE SYSTEM (Child Count)**

```typescript
const badge = nodeEnter.append('g')
  .attr('class', 'badge-group')
  .style('display', (d) => getChildCount(d) > 0 ? 'block' : 'none');

badge.append('rect')
  .attr('class', 'badge-bg')
  .attr('rx', 10)
  .attr('ry', 10)
  .attr('height', 20)
  .attr('y', -10);

badge.append('text')
  .attr('class', 'badge-text')
  .attr('dy', '4')
  .attr('text-anchor', 'middle')
  .style('font-size', '10px')
  .style('font-weight', '700');
```

**Appearance:**
- Position: Right side of node text
- Height: 20px
- Border radius: 10px (pill shape)
- Font: 10px, bold
- Shows number of children (e.g., "5")

**Color States:**

| Node State | Badge Background | Badge Text |
|-----------|-----------------|------------|
| **Root** | White/20% opacity | White |
| **Active** | Black (#171717) | White |
| **Default** | Light grey (#f5f5f5) | Grey (#737373) |

**WHY SHOW COUNT:**
- Indicates expandability
- Sets user expectations
- Shows hierarchy depth
- Professional UX pattern

---

### **CLICK BEHAVIOR - EXCLUSIVE EXPANSION**

```typescript
.on('click', (event, d) => {
  // Exclusive expansion logic: collapse siblings
  if (d.parent) {
    d.parent.children?.forEach(sibling => {
      if (sibling !== d && sibling.children) {
        sibling._children = sibling.children;
        sibling.children = undefined;
      }
    });
  }

  // Root logic: Only expand, never collapse
  if (d.depth === 0) {
    if (d._children) {
      d.children = d._children;
      d._children = undefined;
    }
  } else {
    // Toggle expand/collapse for non-root
    if (d.children) {
      d._children = d.children;
      d.children = undefined;
    } else if (d._children) {
      d.children = d._children;
      d._children = undefined;
    }
  }
  
  update(d);
  focusNode(d);
});
```

**BEHAVIOR:**

1. **Collapse Siblings:** When expanding a node, collapse all its siblings
2. **Root Protection:** Root never collapses (always shows Level 1)
3. **Toggle:** Non-root nodes toggle between expanded/collapsed
4. **Focus:** Auto-center on clicked node (full mode only)

**WHY EXCLUSIVE EXPANSION:**
- Prevents overwhelming view
- Maintains clean hierarchy
- Focuses attention on one branch
- Reduces visual clutter
- Better performance (fewer rendered nodes)

**EXAMPLE:**
```
Before Click:
Root
├─ Chapter 1 [EXPANDED]
│  ├─ Section 1.1
│  └─ Section 1.2
├─ Chapter 2 [COLLAPSED]
└─ Chapter 3 [COLLAPSED]

User clicks "Chapter 2":

After Click:
Root
├─ Chapter 1 [COLLAPSED]  ← Automatically collapsed
├─ Chapter 2 [EXPANDED]   ← Now expanded
│  ├─ Section 2.1
│  └─ Section 2.2
└─ Chapter 3 [COLLAPSED]
```

---

### **FOCUS & ZOOM ANIMATION**

```typescript
function focusNode(d: HierarchyNode) {
  if (!zoomRef.current || interactionMode !== 'full') return;
  
  const targetScale = d.depth === 0 ? 0.7 : 0.85;
  const targetX = fullWidth / 4;
  const targetY = fullHeight / 2;

  svg.transition()
    .duration(800)
    .ease(d3.easeCubicInOut)
    .call(
      zoomRef.current.transform,
      d3.zoomIdentity
        .translate(targetX, targetY)
        .scale(targetScale)
        .translate(-d.y, -d.x)
    );
}
```

**ANIMATION:**
- Duration: **800ms** (smooth, not rushed)
- Easing: **cubic-in-out** (natural acceleration/deceleration)
- Target scale: **0.7** (root) or **0.85** (others)
- Centers clicked node at 25% from left edge

**WHY THIS SCALE:**
- 0.7 for root: Shows entire top level
- 0.85 for others: Closer view for details
- Leaves room for expansion to right

---

### **LINK/CONNECTION CURVES**

```typescript
function diagonal(s: {x, y, data}, d: {x, y}) {
  const startXOffset = /* calculate right edge of source node */;
  
  const sx = s.y + startXOffset;  // Start: right edge of parent
  const sy = s.x;
  
  const tx = d.y - 16;  // End: left edge of child (16px padding)
  const ty = d.x;
  
  const midX = (sx + tx) / 2;
  
  return `M ${sx},${sy}
          C ${midX},${sy}
            ${midX},${ty}
            ${tx},${ty}`;
}
```

**BEZIER CURVE:**
- Start: Right edge of parent node
- End: Left edge of child node (minus padding)
- Control points: Horizontal midpoint
- Creates smooth S-curve

**Visual:**
```
Parent ───────╮
              │  ← Smooth curve
              │
              ╰─── Child
```

**Styling:**
```typescript
.attr("fill", "none")
.attr("stroke", "#d4d4d4")  // var(--black-300)
.attr("stroke-width", "2");
```

---

### **SEARCH HIGHLIGHTING**

```typescript
const isMatch = searchTerm && d.data.name.toLowerCase().includes(searchTerm.toLowerCase());

if (isMatch) return "#f5f5f5";  // Background
if (isMatch) return "#171717";  // Border
```

**Search Effect:**
- Background changes to light grey
- Border becomes black
- Text becomes black (high contrast)
- Node stands out visually

**HOW IT WORKS:**
- Parent component passes `searchTerm` prop
- MindMap filters nodes on each render
- Matching nodes get special styling
- Case-insensitive matching

---

### **ANIMATION TRANSITIONS**

#### **Node Entrance**
```typescript
const nodeEnter = node.enter().append('g')
  .attr('transform', () => `translate(${source.y0},${source.x0})`)  // Start at parent
  .transition()
  .duration(800)
  .attr("transform", (d) => `translate(${d.y},${d.x})`);  // Move to position
```

#### **Node Update**
```typescript
nodeUpdate.transition()
  .duration(800)
  .ease(d3.easeCubicInOut)
  .attr("transform", (d) => `translate(${d.y},${d.x})`);
```

#### **Node Exit**
```typescript
const nodeExit = node.exit().transition()
  .duration(800)
  .attr("transform", () => `translate(${source.y},${source.x})`)  // Move to parent
  .remove();
```

**PATTERN:**
- **Entrance:** Animate from parent position
- **Update:** Smoothly reposition
- **Exit:** Animate back to parent, then remove
- **Duration:** Consistent 800ms
- **Easing:** Cubic-in-out for natural motion

---

### **ZOOM & PAN CONTROLS**

```typescript
const zoom = d3.zoom<SVGSVGElement, unknown>()
  .scaleExtent([0.1, 4])  // Min 10%, Max 400%
  .on("zoom", (event) => {
    g.attr("transform", event.transform);
  });

if (interactionMode === 'full') {
  svg.call(zoom);
}
```

**Controls:**
- **Mouse wheel:** Zoom in/out
- **Drag:** Pan around
- **Pinch:** Zoom on touch devices
- **Scale limits:** 0.1x to 4x

**Initial Position:**
```typescript
const initialTransform = interactionMode === 'preview'
  ? d3.zoomIdentity.translate(width / 2 - 300, height / 2).scale(0.85)
  : d3.zoomIdentity.translate(width / 5, height / 2).scale(0.8);
```

- **Full mode:** 20% from left, 80% scale
- **Preview mode:** Centered, 85% scale

---

### **PERFORMANCE OPTIMIZATIONS**

#### **1. requestAnimationFrame for Animations**
- Syncs with browser repaint
- 60fps target
- Automatic throttling

#### **2. Efficient ID Generation**
```typescript
const getId = (d: any): string => {
  let id = d.data.name;
  let curr = d;
  while (curr.parent) {
    curr = curr.parent;
    id = `${curr.data.name} > ${id}`;
  }
  return id;
};
```
- Unique IDs based on tree path
- Enables D3's efficient diffing
- Smooth updates

#### **3. Passive Scroll Listeners**
```typescript
{ passive: true }
```
- Improves scroll performance
- Non-blocking event handlers

#### **4. Collapsed by Default**
- Fewer DOM nodes initially
- Faster initial render
- Progressive disclosure

---

### **TYPOGRAPHY (MindMap)**

| Element | Size | Weight | Color | Use |
|---------|------|--------|-------|-----|
| **Node label** | 13px | 400/500 | Black | Default text |
| **Root label** | 13px | 600 (semi-bold) | White | Root emphasis |
| **Active label** | 13px | 600 (semi-bold) | Black | Clicked node |
| **Badge text** | 10px | 700 (bold) | White/Grey | Child count |

---

### **ACCESSIBILITY CONSIDERATIONS**

#### **Current Limitations:**
- ❌ Keyboard navigation not implemented
- ❌ Screen reader support limited
- ❌ Focus management missing

#### **Potential Enhancements:**
```typescript
// Keyboard navigation
.attr('tabindex', 0)
.on('keydown', (event, d) => {
  if (event.key === 'Enter' || event.key === ' ') {
    // Trigger click behavior
  }
});

// ARIA labels
.attr('role', 'treeitem')
.attr('aria-expanded', d => d.children ? 'true' : 'false')
.attr('aria-label', d => `${d.data.name}, ${getChildCount(d)} children`);
```

---

**[PART 5B CONTINUED - MarketDataTable next...]**

Should I continue with MarketDataTable and InlineStats components? 🚀
