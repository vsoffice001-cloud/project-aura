/**
 * UI Components — Barrel Export
 *
 * This directory contains two categories of components:
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ MEGA MENU COMPONENTS (PascalCase)                                   │
 * │                                                                     │
 * │ Purpose-built for the Ken Research mega menu dropdown system.        │
 * │ These compose into the 6 dropdown panels (Reports, Industries,      │
 * │ Surveys, Consulting, Insights, Services/Resources).                 │
 * │                                                                     │
 * │ Layout & Structure:                                                 │
 * │   MegaMenuDropdown  — Animated dropdown container (slide + fade)    │
 * │   DropdownSection   — Column section with optional title/icon       │
 * │   DropdownItem      — Individual menu item (icon + label + desc)    │
 * │   SectionHeader     — Uppercase label with icon for section groups  │
 * │   FadeOverlay       — Bottom gradient fade for scrollable sections  │
 * │   VerticalDivider   — 1px vertical separator between columns        │
 * │                                                                     │
 * │ Navigation Items (specialized shapes per dropdown):                 │
 * │   BrowseNavItem     — "Browse all" link with arrow                  │
 * │   IndustryNavItem   — Industry tile with icon + count               │
 * │   SurveyNavItem     — Survey item with badge                        │
 * │   SubCategoryItem   — Nested category item                          │
 * │   SimpleLink        — Plain text link                               │
 * │                                                                     │
 * │ Interactive:                                                        │
 * │   BackButton        — "← Back" button for panel navigation          │
 * │   ExpandButton      — "Show more" / "Show less" toggle              │
 * │                                                                     │
 * │ Cards:                                                              │
 * │   QuickAccessCard   — Featured content card with image              │
 * │   InfoCard          — Informational card with CTA                   │
 * │   Badge             — Status/category tag pill                      │
 * │                                                                     │
 * │ Form:                                                               │
 * │   Input             — Styled text input (search bars, connect form) │
 * │   GradientButton    — Gradient CTA button (connect card)            │
 * │                                                                     │
 * │ Icons:                                                              │
 * │   SectionIcons      — LightbulbIcon, DocumentIcon, EyeIcon          │
 * │                                                                     │
 * ├──────────────────────────────────────────────────────────────────────┤
 * │ SHADCN/UI PRIMITIVES (lowercase)                                    │
 * │                                                                     │
 * │ Standard Radix-based primitives from shadcn/ui. Currently only      │
 * │ tooltip.tsx is actively imported. Others are available for future    │
 * │ use but not re-exported from this barrel to avoid unused imports.    │
 * │ Import them directly: import { X } from './ui/tooltip'              │
 * └──────────────────────────────────────────────────────────────────────┘
 */

// ─── LAYOUT & STRUCTURE ─────────────────────────────────────────────────────

export { MegaMenuDropdown } from './MegaMenuDropdown';
export { DropdownSection } from './DropdownSection';
export { DropdownItem } from './DropdownItem';
export { SectionHeader } from './SectionHeader';
export { FadeOverlay } from './FadeOverlay';
export { VerticalDivider } from './VerticalDivider';

// ─── NAVIGATION ITEMS ───────────────────────────────────────────────────────

export { BrowseNavItem } from './BrowseNavItem';
export { IndustryNavItem } from './IndustryNavItem';
export { SurveyNavItem } from './SurveyNavItem';
export { SubCategoryItem } from './SubCategoryItem';
export { SimpleLink } from './SimpleLink';

// ─── INTERACTIVE ─────────────────────────────────────────────────────────────

export { BackButton } from './BackButton';
export { ExpandButton } from './ExpandButton';

// ─── CARDS ───────────────────────────────────────────────────────────────────

export { QuickAccessCard } from './QuickAccessCard';
export { InfoCard } from './InfoCard';
export { Badge } from './Badge';

// ─── FORM ────────────────────────────────────────────────────────────────────

export { Input } from './Input';
export { GradientButton } from './GradientButton';

// ─── ICONS ───────────────────────────────────────────────────────────────────

export { LightbulbIcon, DocumentIcon, EyeIcon } from './SectionIcons';
