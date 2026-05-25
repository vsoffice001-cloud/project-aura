# 🎯 COMPREHENSIVE DESIGN SYSTEM COMPONENT ANALYSIS - PART 5

**Continuation of Parts 1-4B**  
**Focus:** Page-Level Components, Complex Interactive Components

---

# 22. 🏠 PAGE-LEVEL COMPONENTS - COMPLETE ANALYSIS

## **22.1 HeroSection Component**

### **WHAT**
A full-width hero section with animated video background, glass-morphism report details card, floating orbs, scroll indicator, and primary CTAs. First visual element users see.

### **WHY**
- Captures attention immediately
- Establishes professional credibility
- Displays key report information
- Provides immediate action options
- Sets visual tone for entire page

### **WHEN TO USE**
✅ Top of landing pages  
✅ Product/report pages  
✅ Marketing pages  
✅ High-conversion pages  

❌ DON'T use for:
- Internal pages
- Documentation
- Data-heavy pages
- Simple content pages

### **WHERE USED**
- Report landing pages (primary use)
- Product showcase pages
- Marketing campaign pages

---

### **HOW IT WORKS**

#### **Key Technologies:**
- Video background (autoplay, loop, muted)
- CSS animations (floating orbs, scroll indicator)
- requestAnimationFrame for smooth animations
- Glass-morphism effects (backdrop-blur)
- Responsive grid layout

---

### **STRUCTURE BREAKDOWN**

#### **Layer 1: Video Background**
```tsx
<video autoPlay loop muted playsInline>
  <source src="..." type="video/mp4" />
</video>
```

**Features:**
- Fades in after 500ms (opacity 0 → 1)
- Covers entire section
- Object-fit: cover
- Transitions smoothly (1000ms duration)

---

#### **Layer 2: Gradient Overlays (3 layers)**
```tsx
// Dark overlay (main)
<div className="bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

// Side overlay
<div className="bg-gradient-to-r from-black/50 via-transparent to-black/30" />

// Grid pattern
<div style={{
  backgroundImage: 'linear-gradient(...)',
  backgroundSize: '50px 50px',
  opacity: 0.03
}} />
```

**WHY 3 LAYERS:**
- Ensures text readability
- Creates depth
- Subtle texture (grid)
- Professional appearance

---

#### **Layer 3: Floating Orbs (Animated)**
```tsx
<div ref={orb1Ref} className="absolute top-1/4 -left-32 w-96 h-96 bg-white/10 rounded-full blur-[128px]" />
<div ref={orb2Ref} className="absolute bottom-1/4 -right-32 w-80 h-80 bg-white/10 rounded-full blur-[100px]" />
```

**Animation:**
```typescript
// Sine wave movement (30px amplitude)
orb1.style.transform = `translateX(${Math.sin(frame) * 30}px)`;
orb2.style.transform = `translateX(${Math.cos(frame) * 30}px)`;
```

**EFFECT:**
- Subtle ambient movement
- Adds dynamism
- Professional polish
- Performance-optimized (requestAnimationFrame)

---

#### **Layer 4: Content Grid**
```tsx
<div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
  {/* Left: 3 columns */}
  <div className="lg:col-span-3">
    {/* Title, description, CTAs */}
  </div>
  
  {/* Right: 2 columns */}
  <div className="lg:col-span-2">
    {/* Glass card */}
  </div>
</div>
```

**Responsive:**
- Mobile: Stacked (1 column)
- Desktop: 60/40 split (3:2 ratio)

---

### **LEFT CONTENT SECTION**

#### **Badges**
```tsx
<div className="inline-flex items-center rounded-[5px] border text-xs font-bold bg-white/10 text-white/90 border-white/20 px-4 py-1.5 backdrop-blur-md hover:bg-white/20">
  <Globe className="h-3.5 w-3.5 mr-2" />
  Middle East
</div>
```

**Features:**
- Glass-morphism effect (backdrop-blur)
- Semi-transparent background
- Hover lightens background
- Icon + text combination

---

#### **Heading**
```tsx
<h1 className="font-display text-4xl text-white leading-[1.1] tracking-tight">
  Qatar Fresh
  <span className="block text-white/90">Herbs Market</span>
</h1>
```

**Typography:**
- Font: Noto Serif (display font)
- Size: 48px (text-4xl)
- Color: White
- Line-height: 1.1 (very tight)
- Second line: 90% opacity (subtle hierarchy)

---

#### **CTA Buttons**
```tsx
<div className="flex flex-col sm:flex-row gap-4">
  <Button variant="cta">
    Download sample report
    <Download className="h-5 w-5" />
  </Button>
  <Button variant="secondary" className="bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
    Connect with Consultant
    <ArrowRight className="h-5 w-5" />
  </Button>
</div>
```

**Button Colors:**
- Primary: Red gradient (brand CTA)
- Secondary: Glass-morphism (white/5 bg, white text)
- Both stack on mobile, horizontal on desktop

---

### **RIGHT GLASS CARD SECTION**

#### **Glass-Morphism Card**
```tsx
<div className="bg-[var(--glass-bg)] backdrop-blur-xl rounded-lg border border-[var(--glass-border)] p-8 lg:p-10 shadow-2xl relative overflow-hidden">
```

**Glass Variables** (from theme.css):
```css
--glass-bg: rgba(255, 255, 255, 0.05);
--glass-border: rgba(255, 255, 255, 0.1);
--glass-text: rgba(255, 255, 255, 0.95);
--glass-text-muted: rgba(255, 255, 255, 0.6);
--glass-accent: rgba(255, 255, 255, 0.2);
--glass-glow: rgba(255, 255, 255, 0.1);
```

**Features:**
- Backdrop blur (xl = 24px)
- Semi-transparent white background
- Inner glow orbs (decorative)
- Frosted glass effect

---

#### **Report Details Grid**
```tsx
<div className="grid grid-cols-2 gap-8">
  {/* Base Year */}
  <div className="space-y-2">
    <div className="flex items-center gap-2 text-[var(--glass-text-muted)] text-xs uppercase tracking-wider">
      <Calendar className="h-4 w-4" />
      <span>Base Year</span>
    </div>
    <p className="text-2xl font-normal text-[var(--glass-text)]">2024</p>
  </div>
  
  {/* Repeat for Pages, Region, Author */}
</div>
```

**Grid Layout:**
- 2 columns
- 8px gap between items
- Icon + label + value pattern
- Label: uppercase, muted, small (12px)
- Value: large (24px or 16px)

---

#### **Product Code (Separated)**
```tsx
<div className="pt-6 border-t border-[var(--glass-border)]">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 text-[var(--glass-text-muted)]">
      <Hash className="h-4 w-4" />
      <span>Product Code</span>
    </div>
    <span className="text-[var(--glass-text)] text-base tracking-wider">
      KRAD3953
    </span>
  </div>
</div>
```

**WHY SEPARATED:**
- Product code is less important than other details
- Border creates visual separation
- Horizontal layout (label left, value right)

---

### **SCROLL INDICATOR**

```tsx
<div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2">
  <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
    <div className="w-1 h-2 bg-white/40 rounded-full"></div>
  </div>
</div>
```

**Animation:**
```typescript
// Subtle bounce (3px amplitude)
scrollIndicator.style.transform = `translateY(${Math.sin(frame * 2) * 3}px)`;
```

**Visual:**
- Mouse-shaped container
- Animated dot inside
- Gentle bounce motion
- Indicates scrollable content

---

### **TYPOGRAPHY SYSTEM (Hero)**

| Element | Size | Weight | Color | Font |
|---------|------|--------|-------|------|
| **Heading** | 48px (text-4xl) | 400 | White | Noto Serif |
| **Subheading** | 18px | 300 (light) | White/60 | DM Sans |
| **Description** | 18px | 300 (light) | White/70 | DM Sans |
| **Badge text** | 12px (text-xs) | 700 (bold) | White/90 | DM Sans |
| **Card heading** | 20px (text-xl) | 400 | White/95 | DM Sans |
| **Card label** | 12px (text-xs) | 400 | White/60 | DM Sans |
| **Card value** | 24-16px | 400 | White/95 | DM Sans |

---

### **RESPONSIVE BEHAVIOR**

#### **Mobile (<1024px)**
- Single column stack
- Content full-width
- Card below content
- Smaller padding
- Badges stack vertically
- Buttons stack vertically

#### **Desktop (≥1024px)**
- 3:2 grid (60/40 split)
- Side-by-side layout
- Larger spacing
- Horizontal badge row
- Horizontal button row

---

### **ANIMATION PERFORMANCE**

#### **requestAnimationFrame Pattern**
```typescript
useEffect(() => {
  let frame = 0;
  const animate = () => {
    frame += 0.01;
    // Update transforms
    requestAnimationFrame(animate);
  };
  const animationFrame = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(animationFrame);
}, []);
```

**WHY:**
- 60fps smooth animation
- Browser-optimized
- Auto-pauses when tab inactive
- Proper cleanup (no memory leaks)

---

### **VIDEO OPTIMIZATION**

#### **Video Settings**
```tsx
<video
  autoPlay      // Starts immediately
  loop          // Infinite loop
  muted         // Required for autoplay
  playsInline   // iOS compatibility
  style={{ opacity: 0 }}  // Fade in after load
>
```

#### **Fade-In Delay**
```typescript
setTimeout(() => {
  if (videoRef.current) {
    videoRef.current.style.opacity = '1';
  }
}, 500);
```

**WHY 500ms DELAY:**
- Prevents flash of unstyled content
- Gives gradients time to render
- Smoother perceived loading

---

### **FALLBACK GRADIENT**

```tsx
<div className="absolute inset-0 bg-gradient-to-br from-[#171717] via-[#262626] to-black -z-10" />
```

**PURPOSE:**
- Shows if video fails to load
- Instant background (no loading delay)
- Maintains design aesthetic
- Graceful degradation

---

### **HEIGHT SYSTEM**

```tsx
className="min-h-[55vh] lg:min-h-[60vh]"
```

- Mobile: 55% viewport height
- Desktop: 60% viewport height
- Flexible (can grow if content needs more space)
- Ensures prominence without overwhelming

---

### **GLASS BUTTON (Inside Card)**

```tsx
<Button variant="glass" className="w-full">
  View Full Report Details
  <ArrowRight className="h-4 w-4" />
</Button>
```

**Glass Variant:**
- Background: white/10 with backdrop-blur
- Border: white/20
- Text: white/90
- Hover: white/20 background
- Maintains glass aesthetic

---

## **22.2 Header Component**

### **WHAT**
A sticky navigation header with dropdown menus, scroll progress bar, breadcrumbs, dynamic background (black → white based on scroll), and logo switching.

### **WHY**
- Always-accessible navigation
- Shows user's scroll progress
- Adapts to background color
- Professional mega-menu dropdowns
- Clear site hierarchy (breadcrumbs)

### **WHEN TO USE**
✅ All pages (site-wide)  
✅ Sticky/fixed positioning  
✅ Multi-section pages  

❌ DON'T use for:
- Print layouts
- PDF exports
- Embedded widgets

---

### **HOW IT WORKS**

#### **Dynamic Background System**
```typescript
const [isOnLightBackground, setIsOnLightBackground] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    const heroHeight = window.innerHeight * 0.6; // 60vh
    const winScroll = document.documentElement.scrollTop;
    const isOverLightBg = winScroll > heroHeight - 100;
    setIsOnLightBackground(isOverLightBg);
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

**LOGIC:**
- Hero section = dark background (black video)
- After hero = light sections (white/grey)
- Header adapts colors when scrolling past hero
- 100px transition buffer for smoothness

---

### **VISUAL STATES**

#### **Dark Mode (Over Hero)**
```tsx
className={isOnLightBackground 
  ? 'bg-white shadow-sm'
  : 'bg-black/40 backdrop-blur-lg backdrop-saturate-150'
}
```

**Appearance:**
- Background: Black with 40% opacity + blur
- Text: White
- Logo: White version
- Translucent glass effect
- No shadow

#### **Light Mode (Over Content)**
```tsx
className={isOnLightBackground 
  ? 'bg-white shadow-sm'
  : 'bg-black/40 backdrop-blur-lg'
}
```

**Appearance:**
- Background: Solid white
- Text: Black
- Logo: Dark version
- Subtle shadow (sm)
- Opaque

---

### **LOGO SWITCHING**

```tsx
<img
  src={isOnLightBackground 
    ? darkLogo
    : "https://.../whiteLogo.png"
  }
  alt="Ken Research Logo"
  className="h-[32px] w-[180px] transition-all duration-300"
/>
```

**Smart Loading:**
- `darkLogo` imported as figma asset
- `whiteLogo` from CDN URL
- Smooth 300ms transition
- `object-contain` + `object-position: left center`

---

### **MEGA-MENU DROPDOWN SYSTEM**

#### **State Management**
```typescript
const [openDropdown, setOpenDropdown] = useState<string | null>(null);

<div
  onMouseEnter={() => setOpenDropdown('reportStore')}
  onMouseLeave={() => setOpenDropdown(null)}
>
```

**Pattern:**
- Hover to open (mouseEnter)
- Leave to close (mouseLeave)
- Only one open at a time
- Smooth expand/collapse

---

#### **Dropdown Structure**
```tsx
<div className={`absolute top-[56px] left-5 bg-white shadow-2xl border-t transition-all ${ 
  openDropdown === 'reportStore' ? 'h-auto w-[700px] p-2' : 'h-0 w-0'
}`}>
  {/* Dropdown content */}
</div>
```

**Animation:**
- Height: 0 → auto
- Width: 0 → 700px
- Padding: 0 → 8px
- Duration: 150ms (fast)
- Ease-out timing

---

#### **Industry List (2-Column Grid)**
```tsx
<div className="grid grid-cols-2 gap-6">
  <nav>
    {industries.slice(0, 7).map(industry => (
      <div className="flex gap-[20px] items-center">
        <div className="w-[1px] h-[40px] bg-[#EFEFEF]" />
        <a className="text-sm hover:font-bold">{industry.name}</a>
      </div>
    ))}
  </nav>
  <nav>
    {industries.slice(7).map(...)}  {/* Second column */}
  </nav>
</div>
```

**Visual Pattern:**
- Vertical line dividers (1px grey)
- 40px line height per item
- Text transitions to bold on hover
- 2-column balanced layout

---

### **SEARCH BAR**

```tsx
<div className="flex h-[40px] rounded-[4px] px-[16px] py-[8px] bg-[#FFFFFF1A] cursor-pointer">
  <Search className="text-[#D72B31] text-xl" />
</div>
```

**Features:**
- Icon-only (no input visible initially)
- Semi-transparent white background
- RED search icon (brand color)
- Click to expand (implied interaction)

**WHY RED ICON:**
- Search = action
- RED = brand action color
- Draws attention
- Consistent with system

---

### **CTA BUTTON (Right Side)**

```tsx
<a className="py-2 rounded-sm bg-[#B01F24] hover:bg-white flex px-3 items-center border border-[#B01F24] text-white hover:text-[#B01F24]">
  Book discovery call
  <ArrowUpRight className="text-xl" />
</a>
```

**Hover Effect:**
- Background: RED → White
- Text: White → RED
- Border: RED (stays same)
- Creates "inverse" effect

---

### **SCROLL PROGRESS BAR**

```tsx
<div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#e5e5e5]/30">
  <div
    className="h-full bg-[#b01f24] transition-all duration-150"
    style={{ width: `${scrollProgress}%` }}
  />
</div>
```

**Calculation:**
```typescript
const winScroll = document.documentElement.scrollTop;
const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
const scrolled = (winScroll / height) * 100;
setScrollProgress(scrolled);
```

**Visual:**
- 2px height
- Grey background (30% opacity)
- RED fill bar
- Smooth transition (150ms)
- 0-100% width

**WHY RED:**
- Progress = action/movement
- RED = brand action color
- Visible but subtle
- Motivates scrolling

---

### **BREADCRUMBS**

```tsx
<div className="bg-[#fafafa]/80 backdrop-blur-sm border-b">
  <nav className="flex items-center gap-2 text-xs text-[#737373]">
    <a href="#">Home</a>
    <span>/</span>
    <a href="#">Agriculture and Animal Care</a>
    <span>/</span>
    <span className="text-[#171717]">Qatar Fresh Herbs Market</span>
  </nav>
</div>
```

**Styling:**
- Background: Grey-50 with 80% opacity + blur
- Border-bottom: Grey-200
- Text: Grey-500 (links), Black (current)
- Hover: Darkens to Black
- Hidden on mobile (`hidden lg:block`)

**WHY HIDDEN ON MOBILE:**
- Saves vertical space
- Navigation more important
- Less critical on small screens

---

### **HEIGHT & Z-INDEX**

```tsx
<header className="sticky top-0 z-50">
  <div className="h-[56px]">  {/* Main nav */}
  <div>  {/* Breadcrumbs */}
</header>
```

**Values:**
- Header: `z-50` (above content, below modals)
- Main nav: 56px fixed height
- Breadcrumbs: Auto height (hidden mobile)
- Sticky: `top-0` (sticks to top edge)

---

### **DROPDOWN HOVER PATTERNS**

#### **Menu Item Hover**
```tsx
<a className="text-sm tracking-[0.62px] hover:font-bold transition-all">
  Agriculture and Animal Care
</a>
```

**Effect:**
- Font-weight: 400 → 700
- No color change
- Subtle layout shift
- Indicates interactivity

#### **Divider Lines**
```tsx
<div className="w-[1px] h-[40px] bg-[#EFEFEF]" />
```

**Purpose:**
- Visual rhythm
- Separates items
- Professional appearance
- Consistent spacing (40px height)

---

### **RESPONSIVE BEHAVIOR**

#### **Desktop (Default)**
- Full navigation visible
- Dropdowns on hover
- Horizontal layout
- Breadcrumbs visible
- Logo 180px width

#### **Mobile/Tablet Considerations**
- Header height stays 56px
- Some navigation items may need hamburger menu
- Breadcrumbs hidden
- CTA button may shrink or hide
- Search bar iconified

---

## **22.3 Footer Component**

### **WHAT**
A comprehensive dark footer with collapsible navigation sections (mobile), office locations, newsletter signup, large "Ken" watermark, and social proof.

### **WHY**
- Complete site navigation backup
- Contact information visible
- Newsletter capture
- Legal links accessible
- Brand reinforcement (watermark)

### **WHEN TO USE**
✅ All pages (site-wide)  
✅ Bottom of page  
✅ Final navigation option  

---

### **HOW IT WORKS**

#### **Structure (4 Main Sections)**
1. **Navigation columns** (4 columns, collapsible on mobile)
2. **Office locations** (4 global offices)
3. **Ken watermark + Newsletter** (split layout)
4. **Bottom legal links + copyright**

---

### **BACKGROUND & COLOR SCHEME**

```tsx
className="bg-[#141016] pt-[77px] pb-10"
```

**Color Palette:**
- Background: `#141016` (very dark grey, custom)
- Headings: `#BDBDBD` (light grey)
- Links: `#FFFFFF` (white, 40% opacity default, 100% hover)
- Dividers: `#757575` (10% opacity)

**WHY DARK:**
- Footer = low-priority content
- Contrasts with light page
- Professional aesthetic
- Reduces eye strain at page bottom

---

### **NAVIGATION SECTIONS (Collapsible)**

#### **State Management**
```typescript
const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

const toggleSection = (section: string) => {
  setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
};
```

#### **Mobile Accordion Pattern**
```tsx
<h2
  onClick={() => toggleSection(section.title)}
  className="cursor-pointer flex items-center justify-between"
>
  {section.title}
  <ChevronDown className={`transition-transform sm:hidden ${
    openSections[section.title] ? 'rotate-180' : 'rotate-0'
  }`} />
</h2>

<nav className={`transition-all duration-500 sm:block ${
  openSections[section.title] ? 'max-h-[500px]' : 'max-h-0 sm:max-h-none'
}`}>
  {/* Links */}
</nav>
```

**Features:**
- Click heading to toggle (mobile only)
- Chevron rotates 180° when open
- Max-height animation (500ms duration)
- Desktop: always expanded (`sm:block`)

---

### **NAVIGATION LINK PATTERN**

```tsx
<div className="flex flex-row gap-[20px] items-center navItem opacity-40 hover:opacity-100">
  <div className="w-[1px] h-[30px] bg-[#757575] opacity-10" />
  <a className="text-[#FFFFFF] text-sm" href={link.href}>
    {link.text}
  </a>
</div>
```

**Visual Design:**
- Vertical divider line (1px, grey, very subtle)
- Link opacity: 40% default, 100% hover
- 30px height per item
- 20px gap between divider and text

**Hover Indicator (Hidden by Default)**
```tsx
<div className="absolute left-0 top-[-36px] w-[1px] h-[25px] bg-[#6400E4] transition-transform" style={{ opacity: 0 }} />
```

**PURPOSE:**
- Purple line would slide to hovered item
- Currently hidden (opacity: 0)
- Future enhancement possibility

---

### **OFFICE LOCATIONS**

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
  {offices.map((office) => (
    <div className="opacity-40 hover:opacity-100">
      <h2 className="font-bold text-[#BDBDBD] text-[10px] uppercase">
        {office.title}
      </h2>
      {office.mapUrl ? (
        <a href={office.mapUrl} target="_blank" className="text-[14px] text-[#FFFFFF]">
          {office.address}
        </a>
      ) : (
        <p className="text-[14px] text-[#FFFFFF]">
          {office.address}
        </p>
      )}
    </div>
  ))}
</div>
```

**Features:**
- 4-column grid (desktop), 2-column (tablet), 1-column (mobile)
- Country name: Bold, uppercase, 10px, light grey
- Address: White, 14px, line-height 24px
- Clickable if Google Maps URL provided
- Opacity hover effect (40% → 100%)

**Offices:**
- India (Gurgaon)
- UAE (Dubai)
- Indonesia (Tangerang)
- Qatar (Doha)

---

### **KEN WATERMARK**

```tsx
<div className="h-[270px] w-3/5 relative overflow-hidden">
  <p className="absolute top-[-140px] left-0 text-[356px] tracking-[-0.02em] text-white">
    Ken
  </p>
</div>
```

**Visual Effect:**
- Massive 356px font size
- Positioned with negative top (-140px)
- Partially clipped (overflow-hidden)
- Creates dramatic brand presence
- Mobile: 124px font size, no clipping

**WHY SO LARGE:**
- Brand reinforcement
- Visual interest
- Premium aesthetic
- Memorable footer

---

### **NEWSLETTER SECTION**

```tsx
<div className="flex flex-col gap-2">
  <p className="text-white flex items-center gap-2">
    <Mail className="text-[#757575]" size={16} />
    <span>For Queries:</span>
    <a href="mailto:support@kenresearch.com">support@kenresearch.com</a>
  </p>
  <p className="text-[12px] text-[#7C7C7C]">
    Subscribe to our Newsletter
  </p>
  <p className="text-[16px] text-white">
    Never Miss out on an update from us
  </p>
</div>

<div className="flex gap-4">
  <input
    className="w-[421px] h-[48px] rounded-sm bg-[#FFFFFF1A] pl-4 py-2 text-white border-none outline-none placeholder:text-white/50"
    placeholder="Enter your email address"
  />
  <button className="h-[44px] px-[16px] gap-2 rounded-md bg-[#B01F24] text-white hover:bg-[#8A191D]">
    Subscribe
    <ArrowUpRight size={18} />
  </button>
</div>
```

**Input Styling:**
- Background: White with 10% opacity
- Text: White
- Placeholder: White with 50% opacity
- No border/outline
- 48px height

**Button Styling:**
- Background: RED (#B01F24)
- Hover: Darker RED (#8A191D)
- Icon: ArrowUpRight (indicates action)
- 44px height (slightly less than input for visual balance)

---

### **BOTTOM SECTION**

#### **Divider**
```tsx
<div className="w-full h-[2px] bg-white mt-[100px]" />
```

**Purpose:**
- Clear visual separation
- 100px margin-top (generous spacing)
- 2px thick (substantial)
- White (high contrast)

#### **Legal Links + Copyright**
```tsx
<div className="flex items-center justify-between">
  <div className="flex gap-[60px]">
    <a className="text-[12px] text-[#989898] hover:text-white">
      Terms & Conditions
    </a>
    <a className="text-[12px] text-[#989898] hover:text-white">
      Privacy Policy
    </a>
    <a className="text-[12px] text-[#989898] hover:text-white">
      Cookie Policy
    </a>
  </div>
  <p className="text-[12px] text-[#989898]">
    © Copyright 2026, Ken Research Pvt. Ltd. All rights reserved.
  </p>
</div>
```

**Styling:**
- Text: 12px
- Color: Light grey (#989898)
- Hover: White
- 60px gap between links
- Copyright right-aligned

---

### **TYPOGRAPHY (Footer)**

| Element | Size | Weight | Color | Purpose |
|---------|------|--------|-------|---------|
| **Section heading** | 12px | 700 (bold) | #BDBDBD | Navigation categories |
| **Link** | 14px | 400 | White (40% opacity) | Navigation links |
| **Office name** | 10px | 700 (bold) | #BDBDBD | Country labels |
| **Office address** | 14px | 400 | White | Contact info |
| **Newsletter heading** | 16px | 400 | White | Call to action |
| **Newsletter subtitle** | 12px | 400 | #7C7C7C | Supporting text |
| **Legal links** | 12px | 400 | #989898 | Footer links |
| **Watermark** | 356px | 400 | White | Brand element |

---

### **RESPONSIVE PATTERNS**

#### **Desktop (lg:)**
- 4-column navigation
- 4-column offices
- Watermark + newsletter side-by-side
- Legal links horizontal

#### **Tablet (md:)**
- 2-column navigation
- 2-column offices
- Watermark + newsletter stacked
- Legal links may wrap

#### **Mobile (<sm:)**
- 1-column navigation (collapsible)
- 1-column offices
- Watermark + newsletter stacked
- Legal links stacked vertically
- Smaller watermark font (124px)

---

### **ACCESSIBILITY**

#### **Keyboard Navigation**
- All links focusable
- Accordion headings keyboard-activatable
- Form inputs accessible
- Skip link compatibility

#### **Screen Readers**
- Semantic nav elements
- Proper heading hierarchy
- Alt text on icons (via aria-labels)
- Form labels (placeholder as label)

---

**[PART 5 CONTINUED...]**

Should I continue with FloatingCTA, MindMap, DataTable, and InlineStats? This is getting very comprehensive! 🚀
