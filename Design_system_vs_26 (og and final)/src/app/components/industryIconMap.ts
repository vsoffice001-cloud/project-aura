/**
 * industryIconMap — Utility (DS v4.3)
 *
 * WHAT: Maps industry label strings to Lucide icon component names.
 * WHY:  Centralises the industry → icon relationship so organisms
 *       (IndustrySectorsGrid, ReportStoreHero, BrowseGrid) render
 *       consistent icons per industry without each duplicating a mapping.
 * WHEN: Any component that renders an icon per industry.
 * HOW:  Import the map and look up by industry label string.
 *
 * ICON COLORS: Use iconColors.content (#806ce0) for content icons,
 *              iconColors.utility (#737373) for UI/nav icons.
 *              See iconColors.ts for the canonical system.
 */
import {
  Cpu,
  Stethoscope,
  Zap,
  Landmark,
  Car,
  Plane,
  ShoppingCart,
  Wheat,
  Shield,
  Gem,
  GraduationCap,
  UtensilsCrossed,
  Factory,
  Film,
  FlaskConical,
  Building2,
  Truck,
  type LucideIcon,
} from 'lucide-react';

/**
 * Maps display-level industry names to Lucide icon components.
 *
 * Covers both short names (Home page sectors) and long names
 * (Listing page FULL_INDUSTRIES labels) via aliases at the bottom.
 */
export const industryIconMap: Record<string, LucideIcon> = {
  // ── Primary (short names from SECTORS) ──
  'Technology': Cpu,
  'Healthcare': Stethoscope,
  'Energy': Zap,
  'Financial Services': Landmark,
  'Automotive': Car,
  'Aerospace': Plane,
  'Logistics': Truck,
  'Agriculture': Wheat,
  'Cybersecurity': Shield,
  'Materials': Gem,

  // ── Extended (from FULL_INDUSTRIES labels) ──
  'Technology & Telecom': Cpu,
  'Healthcare & Life Sciences': Stethoscope,
  'Energy & Utilities': Zap,
  'Banking & Financial Services': Landmark,
  'Automotive & Transportation': Car,
  'Defense & Security': Shield,
  'Consumer & Retail': ShoppingCart,
  'Education & Training': GraduationCap,
  'Food & Beverage': UtensilsCrossed,
  'Manufacturing': Factory,
  'Media & Entertainment': Film,
  'Mining & Chemicals': FlaskConical,
  'Public Sector': Building2,
};

/**
 * Safe getter — returns a fallback icon (Cpu) if no mapping exists.
 */
export function getIndustryIcon(industry: string): LucideIcon {
  return industryIconMap[industry] || Cpu;
}