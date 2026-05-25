# Qatar Fresh Herbs Market Research Landing Page

## Project Overview

A comprehensive market research report landing page built with React, TypeScript, and Tailwind CSS, showcasing the Qatar Fresh Herbs Market analysis with interactive data visualizations, detailed market segments, and industry insights.

**Live Routes:**
- `/` - Main landing page with all sections
- `/charts-showcase` - Dedicated page displaying all 8 visualizations

---

## Technology Stack

- **Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS v4
- **Routing:** React Router (Data Mode)
- **Charts:** Recharts library
- **Icons:** Lucide React
- **Build Tool:** Vite

---

## Design System: KP 2.0

### Color Palette

**Primary Colors:**
- Purple 500: `#7f5fe3` - Base color for interactive elements and charts
- Purple 600: `#6b46d9` - Hover states
- Purple 700: `#5a38c7` - Active states

**Semantic Colors:**
- Red 600: `var(--red-600)` - Warnings, challenges, alerts
- Green 600: `var(--green-600)` - Growth, positive trends
- Amber 400: `var(--amber-400)` - Opportunities, ideas

**Neutral Colors:**
- Black 50: `var(--black-50)` - Light grey backgrounds (even sections)
- Black 200: `var(--black-200)` - Borders
- Black 500: `var(--black-500)` - Secondary text
- Black 700: `#171717` - Primary text

**Accent Color:**
- Brand Red: `#b01f24` - Chapter overhead text

### Typography

**Primary Font:** DM Sans
- Used for all body text, descriptions, labels, and UI elements

**Display Font:** Noto Serif
- Used ONLY for top-level section headings (`<h2>` elements)
- Font size: 48px
- Tracking: tight

**Font Configuration:**
- Imported in `/src/styles/fonts.css`
- Theme configured in `/src/styles/theme.css`

### Spacing & Layout

**Section Padding:**
- Horizontal: `px-[84.375px] lg:px-[112.5px]` (25% increase from original)
- Vertical: `py-24 lg:py-32`

**Border Radius Standards:**
- Small: `var(--radius-sm)`
- Medium: `var(--radius-md)`
- Large: `var(--radius-lg)`

**Background Pattern:**
- **Odd sections:** White background (`bg-white`)
- **Even sections:** Grey background (`bg-[var(--black-50)]`)

---

## Page Sections

### 1. Hero Section
**Chapter:** HERO
**Background:** White
**Component:** `HeroSection.tsx`

**Features:**
- Large headline with market overview
- Key statistics display (3 metrics)
- CTA button: "Explore Full Report"
- Market size, CAGR, projection year

### 2. Market Overview
**Chapter:** CHAPTER 1 - Market Overview
**Background:** Grey `bg-[var(--black-50)]`
**Component:** `MarketOverview.tsx`

**Features:**
- Comprehensive market description
- 5 key statistics with visual separators
- Market dynamics overview
- Current market size and growth projections

### 3. Market Performance Data
**Chapter:** CHAPTER 2 - Market Performance Data
**Background:** White
**Component:** `MarketPerformanceData.tsx`

**Features:**
- Interactive data table with 2020-2030 projections
- Year-over-year growth percentages
- Market size in millions (QAR/USD)
- Sortable columns
- Purple-themed table design
- Hover effects on rows

### 4. Market Segmentation
**Chapter:** CHAPTER 3 - Market Segmentation
**Background:** Grey `bg-[var(--black-50)]`
**Component:** `MarketSegmentation.tsx`

**Sub-sections:**
1. **By Product Type**
   - 2 columns: Culinary Herbs (60%) & Medicinal Herbs (40%)
   - Donut chart visualization
   - Detailed descriptions and key varieties

2. **By End-User**
   - 3 columns: Retail (45%), HoReCa (35%), Industrial (20%)
   - Donut chart visualization
   - Market share percentages and insights

3. **GCC Market Size Comparison**
   - Horizontal bar chart comparing 6 GCC countries
   - 2024 market size data
   - Color-coded bars (purple base)

### 5. Regional Analysis
**Chapter:** CHAPTER 4 - Regional Analysis
**Background:** White
**Component:** `RegionalAnalysis.tsx`

**Features:**
- 3 region cards in grid layout
- Purple-themed IconCard components
- MapPin icons for each region
- Market share data and key characteristics
- Regions: Doha Metro (65%), Al Rayyan Region (20%), Northern Qatar (15%)

### 6. Competitive Landscape
**Chapter:** CHAPTER 5 - Competitive Landscape
**Background:** Grey `bg-[var(--black-50)]`
**Component:** `CompetitiveLandscape.tsx`

**Features:**
- 4 key player profiles in grid layout
- Company logos (placeholder)
- Market share percentages
- Strengths and strategic focus
- Companies: Agrico, Qatar Green Farms, Al Sulaiteen, Baladna

### 7. Key Trends
**Chapter:** CHAPTER 6 - Key Trends
**Background:** White
**Component:** `KeyTrends.tsx`

**Features:**
- 4 trend cards in 2x2 grid
- Purple-themed IconCard components
- Unique icons: Sprout, Shield, LineChart, Leaf
- Detailed trend descriptions
- Trends: Hydroponics, Food Security, E-commerce, Organic Demand

### 8. Growth Drivers, Challenges & Opportunities
**Chapter:** CHAPTER 7 - Growth Drivers, Challenges & Opportunities
**Background:** Grey `bg-[var(--black-50)]`
**Component:** `GrowthDriversChallenges.tsx`

**Features:**
- 3-column card layout (responsive)
- Color-coded semantic icons with NO backgrounds
- Multiple sub-sections per card with bullet points

**Card Styling:**
1. **Growth Drivers** 🟢
   - Icon: TrendingUp
   - Color: `var(--green-600)`
   - Main icon + 6 bullet points (all green arrows)
   - Sub-sections: Health Consciousness, Organic Demand, Government Support

2. **Market Challenges** 🔴
   - Icon: TriangleAlert
   - Color: `var(--red-600)`
   - Main icon + 6 bullet points (all red warning triangles)
   - Sub-sections: Climate Limitations, Import Dependency, Operational Costs

3. **Market Opportunities** 🟡
   - Icon: Lightbulb
   - Color: `var(--amber-400)`
   - Main icon + 6 bullet points (all amber lightbulbs)
   - Sub-sections: E-commerce Growth, Vertical Farming Expansion

### 9. Forecast & Outlook
**Chapter:** CHAPTER 8 - Forecast & Outlook
**Background:** White
**Component:** `ForecastOutlook.tsx`

**Features:**
- Line chart showing 2020-2030 market growth
- Purple gradient area fill
- Interactive tooltips
- Responsive chart sizing
- Key projections and outlook description

### 10. CTA (Call to Action)
**Chapter:** None
**Background:** Grey `bg-[var(--black-50)]`
**Component:** `CTASection.tsx`

**Features:**
- Centered layout with prominent headline
- Primary action button: "Request Full Report"
- Secondary action link: "View Sample Pages"
- Purple brand colors

---

## Charts & Visualizations

All charts built using **Recharts** library with consistent purple theming.

### Chart Components Location
`/src/app/components/charts/`

### Available Charts

1. **Line Chart** (`LineChart.tsx`)
   - Used in: Forecast & Outlook section
   - Features: Area gradient, grid, tooltips, responsive
   - Data: 2020-2030 market projections

2. **Bar Chart** (`BarChart.tsx`)
   - Used in: GCC Market Comparison
   - Features: Horizontal bars, custom labels, tooltips
   - Data: 6 GCC countries market size

3. **Donut Chart - Product Type** (`DonutChartProductType.tsx`)
   - Used in: Market Segmentation
   - Features: 2 segments, center label, legend
   - Data: Culinary Herbs (60%), Medicinal Herbs (40%)

4. **Donut Chart - End User** (`DonutChartEndUser.tsx`)
   - Used in: Market Segmentation
   - Features: 3 segments, center label, legend
   - Data: Retail (45%), HoReCa (35%), Industrial (20%)

5. **Market Performance Table** (`MarketPerformanceData.tsx`)
   - Interactive data table (not a chart but visualization)
   - 2020-2030 yearly data with growth percentages

### Charts Showcase Page
**Route:** `/charts-showcase`
**Component:** `ChartsShowcase.tsx`

**Features:**
- Displays all 8 visualizations on a single page
- Includes: 4 charts + Performance Data table + 2 segmentation sections + GCC comparison
- Overhead text: "CHAPTER 9 - Charts Showcase"
- Centered title: "All Visualizations"
- Grid layout with proper spacing

---

## Reusable UI Components

### 1. IconCard Component
**Location:** `/src/app/components/ui/icon-card.tsx`

**Props:**
- `icon` - React element (Lucide icon)
- `title` - Card heading
- `description` - Optional text content
- `children` - Optional custom content
- `iconColor` - Custom icon color (default: purple)
- `iconBgColor` - Custom background color (default: light purple)
- `showIconBg` - Boolean to show/hide icon background (default: true)
- `iconSize` - 'sm' | 'md' | 'lg' (default: 'md')
- `className` - Additional CSS classes

**Features:**
- Flexible content area (description OR children)
- Customizable icon styling
- Purple brand hover shadow
- Responsive design

**Usage Examples:**
```tsx
// With description
<IconCard
  icon={<MapPin />}
  title="Doha Metro"
  description="Central business district"
/>

// With custom content and no background
<IconCard
  icon={<TrendingUp />}
  title="Growth Drivers"
  iconColor="var(--green-600)"
  showIconBg={false}
>
  <div>Custom content here</div>
</IconCard>
```

### 2. OverheadText Component
**Location:** `/src/app/components/ui/overhead-text.tsx`

**Props:**
- `children` - Text content

**Features:**
- Brand red color (`#b01f24`)
- Bold, uppercase, tracking-widest
- Font size: 13px
- Consistent styling across all sections

**Format Convention:**
- Use: "CHAPTER [NUMBER] - [Section Name]"
- Example: "CHAPTER 1 - Market Overview"
- NO dashes between CHAPTER and number

### 3. Table of Contents Component
**Location:** `/src/app/components/ui/table-of-contents.tsx`

**Features:**
- Real-time scroll tracking with active section highlighting
- Progress indication through section completion states
- Smooth scroll navigation to sections
- Collapsible/expandable states (desktop)
- Mobile responsive with drawer
- Reading time estimates
- Glassmorphism design

**Props:**
- `sections` - Array of TOCSection objects (required)
- `initialCollapsed` - Boolean, start collapsed (default: false)
- `scrollOffset` - Number, active detection offset (default: 200)
- `scrollToOffset` - Number, scroll-to offset (default: 120)
- `showMobileButton` - Boolean, show mobile button (default: true)
- `className` - String, custom classes
- `stickyTop` - Number, sticky position in px (default: 72)
- `colors` - Object, custom color overrides

**Section Data Structure:**
```tsx
interface TOCSection {
  number: string;  // Display number (e.g., "1", "2")
  title: string;   // Section title
  time: string;    // Reading time (e.g., "5m")
  id: string;      // DOM element ID for scrolling
}
```

**Basic Usage:**
```tsx
import { TableOfContents } from '@/components/ui/table-of-contents';

const sections = [
  { number: '1', title: 'Market Overview', time: '5m', id: 'market-overview' },
  { number: '2', title: 'Market Data', time: '7m', id: 'market-data' },
];

<div className="flex">
  <TableOfContents sections={sections} />
  <main className="flex-1 min-w-0">
    <section id="market-overview">Content</section>
    <section id="market-data">Content</section>
  </main>
</div>
```

**Custom Colors Example:**
```tsx
<TableOfContents 
  sections={sections}
  colors={{
    activeBg: '#7f5fe3',
    activeText: '#ffffff',
    badgeActive: '#7f5fe3',
  }}
/>
```

**States:**
- **Completed** - User has scrolled past this section (checkmark icon)
- **Active** - Currently viewing this section (bold, highlighted)
- **Upcoming** - Not yet reached (faded appearance)

**Desktop Features:**
- Sticky positioning (follows scroll)
- Width: 255px (expanded) or 80px (collapsed)
- Glassmorphism background
- Progress bar at bottom (optional)
- Toggle button (half inside, half outside)

**Mobile Features:**
- Floating circular button (bottom-left)
- Slide-in drawer with sections
- Touch-friendly tap targets

**Documentation:**
- Full Documentation: `/TOC_DOCUMENTATION.md`
- Usage Guide: `/TOC_USAGE_GUIDE.md`

### 4. Utility Functions
**Location:** `/src/app/components/ui/utils.ts`

**Function:** `cn()`
- Merges Tailwind classes
- Handles conditional classes
- Based on clsx/classnames pattern

---

## Data & Content

### Currency Format
- Use **$** symbol (not "USD") throughout
- Example: "$145.3M" not "USD 145.3M"

### Chapter Numbering
All sections include chapter numbers in overhead text:
- CHAPTER 1 - Market Overview
- CHAPTER 2 - Market Performance Data
- CHAPTER 3 - Market Segmentation
- CHAPTER 4 - Regional Analysis
- CHAPTER 5 - Competitive Landscape
- CHAPTER 6 - Key Trends
- CHAPTER 7 - Growth Drivers, Challenges & Opportunities
- CHAPTER 8 - Forecast & Outlook
- CHAPTER 9 - Charts Showcase (showcase page only)

### Key Metrics Used
- Market Size 2024: $145.3M
- CAGR 2024-2030: 8.7%
- Market Size 2030: $242.8M
- Import Dependency: 78%
- Organic Growth: 15% annually
- Hydroponic Investment: QAR 500M

---

## File Structure

```
/src
├── /app
│   ├── App.tsx                          # Main app component
│   ├── routes.tsx                       # React Router configuration
│   │
│   ├── /components
│   │   ├── HeroSection.tsx              # Hero/Header
│   │   ├── MarketOverview.tsx           # Chapter 1
│   │   ├── MarketPerformanceData.tsx    # Chapter 2
│   │   ├── MarketSegmentation.tsx       # Chapter 3
│   │   ├── RegionalAnalysis.tsx         # Chapter 4
│   │   ├── CompetitiveLandscape.tsx     # Chapter 5
│   │   ├── KeyTrends.tsx                # Chapter 6
│   │   ├── GrowthDriversChallenges.tsx  # Chapter 7
│   │   ├── ForecastOutlook.tsx          # Chapter 8
│   │   ├── CTASection.tsx               # Call to action
│   │   ├── ChartsShowcase.tsx           # Charts showcase page
│   │   │
│   │   ├── /charts
│   │   │   ├── LineChart.tsx            # Forecast line chart
│   │   │   ├── BarChart.tsx             # GCC comparison bars
│   │   │   ├── DonutChartProductType.tsx
│   │   │   └── DonutChartEndUser.tsx
│   │   │
│   │   ├── /ui
│   │   │   ├── icon-card.tsx            # Reusable card component
│   │   │   ├── overhead-text.tsx        # Chapter labels
│   │   │   ├── table-of-contents.tsx    # Table of contents
│   │   │   └── utils.ts                 # Utility functions
│   │   │
│   │   └── /figma
│   │       └── ImageWithFallback.tsx    # Protected system file
│   │
│   └── /pages
│       └── ChartsShowcasePage.tsx       # Charts showcase route
│
├── /styles
│   ├── fonts.css                        # Font imports (DM Sans, Noto Serif)
│   ├── theme.css                        # Design tokens and CSS variables
│   └── globals.css                      # Global styles
│
└── /imports                             # Figma-imported assets (if any)
```

---

## Design Patterns & Conventions

### Section Structure Template
```tsx
<section id="section-name" className="py-24 lg:py-32 bg-[BACKGROUND]">
  <div className="max-w-7xl mx-auto px-[84.375px] lg:px-[112.5px]">
    <div className="mb-16">
      {/* Overhead Text */}
      <div className="mb-4">
        <span className="text-[#b01f24] font-bold tracking-widest uppercase" style={{ fontSize: '13px' }}>
          CHAPTER [N] - [Section Name]
        </span>
      </div>
      
      {/* Section Heading */}
      <h2 className="font-display text-[48px] tracking-tight text-[#171717]">
        [Section Title]
      </h2>
      
      {/* Description */}
      <p className="text-[16px] leading-relaxed max-w-3xl text-[#737373]" style={{ paddingTop: '10px' }}>
        [Section description]
      </p>
    </div>
    
    {/* Section Content */}
    <div className="[content-grid-or-layout]">
      {/* Cards, charts, or other content */}
    </div>
  </div>
</section>
```

### Icon Color Semantics
- **Green** (`var(--green-600)`) - Growth, positive trends, upward movement
- **Red** (`var(--red-600)`) - Challenges, warnings, risks, alerts
- **Amber** (`var(--amber-400)`) - Opportunities, ideas, innovation
- **Purple** (`#7f5fe3`) - Base/default for standard interactive elements

### Responsive Design
- Desktop-first approach with mobile breakpoints
- Grid layouts: `grid md:grid-cols-2 xl:grid-cols-3`
- Stats: Hide/show different layouts based on screen size
- Charts: Responsive width/height with aspect ratios

---

## Recent Updates

### January 2024 - Icon Color Treatment

**Updated Component:** `GrowthDriversChallenges.tsx`

**Changes:**
1. Enhanced `IconCard` component to support:
   - Custom icon colors via `iconColor` prop
   - Background control via `showIconBg` prop
   - Flexible styling options

2. Applied color-coded semantic styling:
   - **Growth Drivers:** Green TrendingUp icons (no background)
   - **Market Challenges:** Red TriangleAlert icons (no background)
   - **Market Opportunities:** Amber Lightbulb icons (no background)

3. Updated all bullet point icons to match parent card color:
   - Growth Drivers: 6 green arrow icons
   - Market Challenges: 6 red warning icons
   - Market Opportunities: 6 amber lightbulb icons

**Benefits:**
- Improved visual hierarchy and semantic meaning
- Better user comprehension through color coding
- Consistent icon treatment across entire card
- More modern, clean aesthetic without icon backgrounds

---

## Installation & Setup

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

---

## Package Dependencies

**Core:**
- react
- react-dom
- react-router

**UI & Styling:**
- tailwindcss
- lucide-react (icons)
- recharts (data visualization)

**Development:**
- typescript
- vite
- @types/react
- @types/react-dom

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Performance Optimizations

1. **Code Splitting:** React Router automatic code splitting
2. **Lazy Loading:** Route-based lazy loading
3. **Optimized Assets:** Vite build optimization
4. **Responsive Images:** ImageWithFallback component
5. **Minimal Dependencies:** Lightweight package selection

---

## Future Enhancements

### Potential Features:
- [ ] PDF export functionality
- [ ] Print-optimized styles
- [ ] Interactive filters for data tables
- [ ] Advanced chart interactions
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Animation on scroll effects
- [ ] Search functionality
- [ ] Bookmark/save sections

### Technical Improvements:
- [ ] Unit tests with Vitest
- [ ] E2E tests with Playwright
- [ ] Accessibility audit (WCAG 2.1)
- [ ] Performance monitoring
- [ ] SEO optimization
- [ ] Analytics integration

---

## Accessibility

### Current Features:
- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Color contrast compliance
- Responsive text sizing

### Best Practices:
- All icons have descriptive context
- Links have meaningful text
- Tables have proper headers
- Charts include text alternatives

---

## License

[Specify license here]

---

## Credits

**Design System:** KP 2.0 Product Design System
**Data Source:** Qatar Market Research (Sample Data)
**Built with:** React + TypeScript + Tailwind CSS + Recharts

---

## Contact & Support

[Add contact information]

---

**Last Updated:** February 11, 2026
**Version:** 1.0.0
**Status:** Production Ready ✅