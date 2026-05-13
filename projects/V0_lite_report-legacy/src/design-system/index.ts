/**
 * Design System Barrel Export
 * 
 * Central export point for all design system utilities and components.
 * Import from here for convenient access to all design system features.
 * 
 * 92-5-3 Color Hierarchy & Element Classification:
 *   - 92% Foundation (black/white/warm): ALL structural, utility, and
 *     navigation elements (buttons like ScrollToTop, pagination, breadcrumbs)
 *   - 5% Brand Red (#b01f24): Conversion CTAs ONLY ("Download", "Get Started")
 *   - 3% Accent Purple (#806ce0): Content/feature icon strokes and
 *     low-opacity fills/shadows ONLY. Never as solid backgrounds.
 *   - Exception: Badge.tsx defines its own internal theme color configs
 *     with hardcoded hex values (the only intentional exception).
 * 
 * @example
 * ```tsx
 * import { colors, typography, Button, Badge } from '@/design-system';
 * ```
 */

// ============================================
// TOKENS
// ============================================

export {
  // Color Tokens
  colors,
  gradients,
  
  // Typography Tokens
  typography,
  
  // Spacing Tokens
  spacing,
  
  // Border Radius Tokens
  borderRadius,
  
  // Shadow Tokens
  shadows,
  
  // Animation Tokens
  easing,
  duration,
  
  // Breakpoint Tokens
  breakpoints,
  
  // Layout Tokens
  layout,
  
  // Opacity Tokens
  opacity,
  
  // Z-Index Tokens
  zIndex,
  
  // Design System Metadata
  designSystem,
  
  // TypeScript Types
  type Color,
  type BrandColor,
  type AccentColor,
  type TypographySize,
  type SpacingValue,
  type BorderRadiusValue,
  type ShadowValue,
  type EasingValue,
  type DurationValue,
  type BreakpointValue,
} from './tokens';

// ============================================
// COMPONENTS
// ============================================

export {
  Button,
  type ButtonVariant,
  type ButtonSize,
  type ButtonBackground,
} from './Button';

export { Badge } from './components/Badge';
export { SectionLabel } from './components/SectionLabel';
export { Card } from './components/Card';
export { SectionHeading } from './components/SectionHeading';
export { SectionWrapper } from './components/SectionWrapper';
export { AnimatedArrow, type AnimatedArrowProps } from './components/AnimatedArrow';

// Atoms — Promoted from app-level
export { InlineLink } from './components/InlineLink';
export { ScrollProgress } from './components/ScrollProgress';
export { ScrollToTop } from './components/ScrollToTop';

// ============================================
// ICON SYSTEM
// ============================================

export {
  iconColors,
  getIconColor,
  type IconColorType,
} from './iconColors';

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get CSS custom property value
 */
export function getCSSVariable(variable: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
}

/**
 * Set CSS custom property value
 */
export function setCSSVariable(variable: string, value: string): void {
  if (typeof window === 'undefined') return;
  document.documentElement.style.setProperty(variable, value);
}

/**
 * Convert rem to px (based on 16px base)
 */
export function remToPx(rem: string): number {
  return parseFloat(rem) * 16;
}

/**
 * Convert px to rem (based on 16px base)
 */
export function pxToRem(px: number): string {
  return `${px / 16}rem`;
}

/**
 * Get responsive breakpoint value
 */
export function getBreakpoint(breakpoint: keyof typeof breakpoints): number {
  return parseInt(breakpoints[breakpoint]);
}

/**
 * Check if current viewport matches breakpoint
 */
export function matchesBreakpoint(breakpoint: keyof typeof breakpoints): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(`(min-width: ${breakpoints[breakpoint]})`).matches;
}

/**
 * Apply design token to element style
 */
export function applyToken(element: HTMLElement, property: string, value: string): void {
  element.style.setProperty(property, value);
}

/**
 * Get spacing value in pixels
 */
export function getSpacingPx(scale: keyof typeof spacing.px): number {
  return spacing.px[scale];
}

/**
 * Get spacing value in rem
 */
export function getSpacingRem(scale: keyof typeof spacing.rem): string {
  return spacing.rem[scale];
}

/**
 * Validate color hierarchy compliance (92-5-3 rule)
 */
export function validateColorHierarchy(config: {
  foundationColors: number;
  brandRedUsage: number;
  accentUsage: number;
}): {
  valid: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];
  const total = config.foundationColors + config.brandRedUsage + config.accentUsage;
  
  const foundationPercent = (config.foundationColors / total) * 100;
  const brandPercent = (config.brandRedUsage / total) * 100;
  const accentPercent = (config.accentUsage / total) * 100;
  
  if (foundationPercent < 85) {
    warnings.push('Foundation colors should comprise ~92% of your design');
  }
  
  if (brandPercent > 10) {
    warnings.push('Brand red should be used sparingly (~5% max) - only for major CTAs');
  }
  
  if (accentPercent > 8) {
    warnings.push('Accent colors should be minimal (~3% max) - only for shadows/highlights');
  }
  
  return {
    valid: warnings.length === 0,
    warnings,
  };
}