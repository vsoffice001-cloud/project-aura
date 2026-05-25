# 🎨 Phosphor Icons Migration Guide - KP 2.0 Design System

**Status:** ✅ Phosphor Icons Installed (`@phosphor-icons/react@2.1.10`)  
**Date:** January 23, 2026  
**Purpose:** Replace all Lucide React icons with Phosphor Icons for KP 2.0 compliance

---

## ✅ **Installation Complete**

```bash
pnpm add @phosphor-icons/react
```

Package installed: `@phosphor-icons/react@2.1.10`

---

## 📋 **Complete Icon Mapping - Lucide → Phosphor**

### **Navigation & UI Icons**

| Lucide Icon | Phosphor Icon | Notes |
|------------|---------------|-------|
| `ChevronDown` | `CaretDown` | Use for dropdowns |
| `ChevronLeft` | `CaretLeft` | Use for back/collapse |
| `ChevronRight` | `CaretRight` | Use for next/expand |
| `ChevronUp` | `CaretUp` | Use for collapse/scroll up |
| `ChevronsUpDown` | `CaretUpDown` | Use for sorting |
| `ChevronsDownUp` | `CaretDownUp` | Alternative sorting |
| `ArrowUpRight` | `ArrowUpRight` | External links |
| `ArrowRight` | `ArrowRight` | Forward navigation |
| `ArrowDown` | `ArrowDown` | Download/expand |
| `ArrowUpDown` | `ArrowsDownUp` | Sorting toggle |

### **Content & Document Icons**

| Lucide Icon | Phosphor Icon | Notes |
|------------|---------------|-------|
| `FileText` | `FileText` | Documents |
| `File` | `File` | Generic files |
| `Download` | `DownloadSimple` | Downloads |
| `BookOpen` | `BookOpen` | Table of contents |
| `Layers` | `Stack` | Layered content |
| `Search` | `MagnifyingGlass` | Search functionality |
| `Copy` | `Copy` | Copy to clipboard |
| `Check` | `Check` | Checkmarks |
| `CircleCheckBig` | `CheckCircle` | Success states |
| `FileCheck` | `FileCheck` | Completed files |

### **Business & Analytics Icons**

| Lucide Icon | Phosphor Icon | Notes |
|------------|---------------|-------|
| `TrendingUp` | `TrendUp` | Growth/positive trends |
| `TrendingDown` | `TrendDown` | Decline/negative trends |
| `BarChart3` | `ChartBar` | Bar charts |
| `ChartColumn` | `ChartBar` | Column charts |
| `LineChart` | `ChartLine` | Line graphs |
| `PieChart` | `ChartPie` | Pie charts |
| `Target` | `Target` | Goals/objectives |
| `DollarSign` | `CurrencyDollar` | Financial data |
| `Award` | `Trophy` | Awards/achievements |
| `BadgeCheck` | `SealCheck` | Verified/certified |

### **Location & Places Icons**

| Lucide Icon | Phosphor Icon | Notes |
|------------|---------------|-------|
| `Globe` | `Globe` | Global/regions |
| `MapPin` | `MapPin` | Locations |
| `Building2` | `Buildings` | Multiple buildings |
| `Building` | `Building` | Single building |
| `Factory` | `Factory` | Manufacturing |
| `Landmark` | `Bank` | Institutions |
| `Ship` | `Boat` | Shipping/maritime |
| `Truck` | `Truck` | Logistics |

### **People & Organizations Icons**

| Lucide Icon | Phosphor Icon | Notes |
|------------|---------------|-------|
| `User` | `User` | Single user |
| `Users` | `Users` | Multiple users |
| `Network` | `Graph` | Networks/connections |
| `Shield` | `Shield` | Security/protection |

### **Nature & Food Icons**

| Lucide Icon | Phosphor Icon | Notes |
|------------|---------------|-------|
| `Leaf` | `Leaf` | Nature/organic |
| `Utensils` | `ForkKnife` | Food service |
| `ShoppingCart` | `ShoppingCart` | E-commerce |

### **UI Elements & Feedback Icons**

| Lucide Icon | Phosphor Icon | Notes |
|------------|---------------|-------|
| `Sparkles` | `Sparkle` | Highlights/new |
| `Star` | `Star` | Ratings/favorites |
| `Calendar` | `Calendar` | Dates/events |
| `Hash` | `Hash` | Tags/IDs |
| `Mail` | `EnvelopeSimple` | Email |
| `List` | `List` | Lists/menus |
| `Grid3x3` | `GridFour` | Grid views |
| `Lightbulb` | `Lightbulb` | Ideas/tips |
| `TriangleAlert` | `WarningCircle` | Warnings |
| `Cpu` | `Cpu` | Technology |
| `ExternalLink` | `ArrowSquareOut` | External links |
| `ClipboardList` | `ClipboardText` | Checklists |
| `Palette` | `Palette` | Design/colors |
| `Type` | `TextAa` | Typography |
| `Ruler` | `Ruler` | Measurements |
| `Layout` | `Layout` | Layouts |
| `Code` | `Code` | Code snippets |

---

## 🔧 **Migration Pattern**

### **Before (Lucide React)**

```tsx
import { TrendingUp, MapPin, Leaf, Building2 } from 'lucide-react';

<TrendingUp className="size-5 text-[#6D52D9]" />
<MapPin className="size-5 text-[#6D52D9]" />
<Leaf className="size-5 text-[#6D52D9]" />
<Building2 className="size-5 text-[#6D52D9]" />
```

### **After (Phosphor Icons)**

```tsx
import { TrendUp, MapPin, Leaf, Buildings } from '@phosphor-icons/react';

<TrendUp className="size-5 text-[#6D52D9]" />
<MapPin className="size-5 text-[#6D52D9]" />
<Leaf className="size-5 text-[#6D52D9]" />
<Buildings className="size-5 text-[#6D52D9]" />
```

---

## 📁 **Files Requiring Migration**

### ✅ **Completed**
1. ✅ `/src/app/components/MarketOverview.tsx` - DONE

### ⏳ **Pending Migration** (16 files)

| File | Icons Used | Priority |
|------|-----------|----------|
| `/src/app/components/Header.tsx` | Search, ChevronDown, ArrowUpRight | 🔴 High |
| `/src/app/components/HeroSection.tsx` | Sparkles, Globe, Calendar, FileText, User, Hash, Download, ArrowRight | 🔴 High |
| `/src/app/components/Footer.tsx` | ChevronDown, Mail, ArrowUpRight | 🔴 High |
| `/src/app/components/CompetitiveLandscape.tsx` | Building2, TrendingUp, Target, Users, ChartColumn, Award, CircleCheckBig, ArrowUpDown, ArrowDown, PieChart, Grid3x3, Shield, DollarSign, FileText, Truck, Star, Network, Cpu, BadgeCheck | 🟡 Medium |
| `/src/app/components/TableOfContentsSection.tsx` | BookOpen, Layers, Building2, ChartColumn, Search, Download, FileText, Target, ClipboardList, ChevronDown, ChevronsUpDown, ChevronsDownUp, ChevronRight | 🟡 Medium |
| `/src/app/components/ScopeOfReport.tsx` | TrendingUp, MapPin, Layers, Users, Building2, LineChart | 🟡 Medium |
| `/src/app/components/SegmentationSection.tsx` | Package, Leaf, Users, Building2, ChartColumn, Target, TrendingUp, DollarSign, ArrowUpRight | 🟡 Medium |
| `/src/app/components/TargetAudience.tsx` | TrendingUp, Utensils, Building2, Ship, Network, Factory, Landmark, ShoppingCart, Sparkles, CircleCheckBig | 🟡 Medium |
| `/src/app/components/GrowthDriversChallenges.tsx` | TrendingUp, TriangleAlert, Lightbulb, CircleCheckBig | 🟢 Low |
| `/src/app/components/MarketAnalysis.tsx` | TrendingUp, ArrowRight, Download | 🟢 Low |
| `/src/app/components/MarketDataTable.tsx` | ArrowUpDown, ArrowRight | 🟢 Low |
| `/src/app/components/RegionalComparison.tsx` | BarChart3, Globe, TrendingUp | 🟢 Low |
| `/src/app/components/RelatedReports.tsx` | Globe, Leaf, FileText, Search | 🟢 Low |
| `/src/app/components/ResearchMethodology.tsx` | Search, CircleCheckBig, FileCheck, ChevronRight | 🟢 Low |
| `/src/app/components/TableOfContentsSidebar.tsx` | List, ChevronLeft, Check | 🟢 Low |
| `/src/app/pages/DesignSystem.tsx` | Copy, Check, Palette, Type, Ruler, Layout, Code, Download, ExternalLink | 🟢 Low |
| `/src/app/pages/DesignSystemPage.tsx` | Copy, Check, Palette, Type, Ruler, Code, ArrowLeft, Download | 🟢 Low |

---

## 🎯 **Weight System**

Phosphor Icons support multiple weights. For KP 2.0, use:

- **Regular (default):** Standard icons
- **Bold:** For emphasis (buttons, headers)
- **Light:** For subtle UI elements (rarely used)
- **Thin:** Avoid (not part of KP 2.0)
- **Fill:** For solid icons (badges, active states)
- **Duotone:** For special highlighting (optional)

### **Weight Examples**

```tsx
import { TrendingUp } from '@phosphor-icons/react';

{/* Regular (default) */}
<TrendingUp className="size-5" />

{/* Bold */}
<TrendingUp className="size-5" weight="bold" />

{/* Fill */}
<TrendingUp className="size-5" weight="fill" />

{/* Duotone */}
<TrendingUp className="size-5" weight="duotone" />
```

---

## 📦 **KP 2.0 Recommended Weights by Context**

| Context | Weight | Example |
|---------|--------|---------|
| **Primary Buttons** | `bold` | CTA buttons |
| **Body Content** | `regular` | Default icons in text |
| **Navigation** | `regular` | Menu items |
| **Active States** | `fill` | Selected items |
| **Badges** | `fill` | Status indicators |
| **Headers** | `bold` | Section headers |
| **Highlights** | `duotone` | Featured content |

---

## 🚀 **Quick Migration Script**

For automated migration, use this find-and-replace pattern:

```bash
# 1. Replace import statement
Find:    from 'lucide-react'
Replace: from '@phosphor-icons/react'

# 2. Icon-specific replacements
Building2 → Buildings
ChevronDown → CaretDown
ChevronLeft → CaretLeft
ChevronRight → CaretRight
ChevronUp → CaretUp
TriangleAlert → WarningCircle
Mail → EnvelopeSimple
Search → MagnifyingGlass
CircleCheckBig → CheckCircle
Download → DownloadSimple
BarChart3 → ChartBar
ChartColumn → ChartBar
TrendingUp → TrendUp
```

---

## ✅ **Post-Migration Checklist**

- [ ] All `lucide-react` imports replaced with `@phosphor-icons/react`
- [ ] Icon name mappings applied (Building2 → Buildings, etc.)
- [ ] Size classes preserved (`size-5`, `size-4`, etc.)
- [ ] Color classes preserved (`text-[#6D52D9]`, etc.)
- [ ] Weight attributes added where needed (`weight="bold"`, etc.)
- [ ] Test all components visually
- [ ] Remove `lucide-react` from package.json (after full migration)

---

## 🎨 **KP 2.0 Design System Integration**

### **Approved Icon Sizes**

```css
.icon-xs   { width: 16px; height: 16px; } /* size-4 */
.icon-sm   { width: 20px; height: 20px; } /* size-5 */
.icon-md   { width: 24px; height: 24px; } /* size-6 */
.icon-lg   { width: 32px; height: 32px; } /* size-8 */
.icon-xl   { width: 40px; height: 40px; } /* size-10 */
```

### **Approved Icon Colors**

```tsx
// Primary - Periwinkle
className="text-[#6D52D9]"  // Periwinkle 600 (most common)
className="text-[#9d9aef]"  // Periwinkle 400
className="text-[#e2e4fd]"  // Periwinkle 100 (backgrounds)

// Secondary - Ken Bold Red
className="text-[#b01f24]"  // Bold Red 600

// Neutral - Grayscale
className="text-[#171717]"  // Black (Foundation)
className="text-[#404040]"  // Grayscale 700
className="text-[#525252]"  // Grayscale 600
className="text-[#737373]"  // Grayscale 500
```

---

## 📚 **Resources**

- **Phosphor Icons Website:** https://phosphoricons.com/
- **React Documentation:** https://github.com/phosphor-icons/react
- **Icon Search:** https://phosphoricons.com/ (browse all 9,072 icons)
- **KP 2.0 Design System:** `/KP-2.0-DESIGN-SYSTEM.md`

---

## ⚡ **Next Steps**

1. ✅ Phosphor Icons installed and ready
2. ✅ MarketOverview.tsx migrated (example)
3. ⏳ Migrate remaining 16 files using the mapping guide above
4. ⏳ Test all components
5. ⏳ Remove `lucide-react` dependency
6. ⏳ Update KP 2.0 Design System documentation

---

**Migration Progress:** **1/17 files complete (5.9%)**  
**Estimated Time Remaining:** ~2-3 hours for full migration

---

**Last Updated:** January 23, 2026  
**Maintained by:** KP 2.0 Design System Team