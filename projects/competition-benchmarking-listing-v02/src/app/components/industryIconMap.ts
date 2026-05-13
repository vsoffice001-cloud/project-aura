/**
 * Industry Icon Map — Domain-specific config
 * Ken Bold DS v4.2
 *
 * Maps industry names to Lucide icon components.
 * Shared across any organism that needs industry-specific icons:
 *   - IndustrySectorsGrid (home page)
 *   - IndustryReportSection (listing mode)
 *   - Header dropdown (navigation)
 *
 * When adding a new industry:
 *   1. Add the icon import from lucide-react
 *   2. Add the mapping entry below
 *   3. Ensure the industry name matches the `data.ts` industries array
 */
import {
  Stethoscope,
  Cpu,
  Landmark,
  Zap,
  ShoppingCart,
  Factory,
  Car,
  UtensilsCrossed,
  GraduationCap,
  Shield,
  Wheat,
  Film,
  FlaskConical,
  Building2,
} from "lucide-react";
import type { ElementType } from "react";

export const industryIconMap: Record<string, ElementType> = {
  Healthcare: Stethoscope,
  "Technology & Telecom": Cpu,
  "Banking & Financial Services": Landmark,
  "Energy & Utilities": Zap,
  "Consumer & Retail": ShoppingCart,
  Manufacturing: Factory,
  "Automotive & Transportation": Car,
  "Food & Beverage": UtensilsCrossed,
  "Education & Training": GraduationCap,
  "Defense & Security": Shield,
  Agriculture: Wheat,
  "Media & Entertainment": Film,
  "Mining & Chemicals": FlaskConical,
  "Public Sector": Building2,
};

/** Get icon for an industry name, returns undefined if not found */
export function getIndustryIcon(name: string): ElementType | undefined {
  return industryIconMap[name];
}
