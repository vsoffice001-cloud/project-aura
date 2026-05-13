/**
 * Design System Barrel Export
 * 
 * Central export point for all design system utilities and components.
 * Import from here for convenient access to all design system features.
 * 
 * @example
 * ```tsx
 * import { colors, typography, ColorSwatch, TypeScale } from '@/design-system';
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
// COLOR COMPONENTS
// ============================================

export {
  ColorSwatch,
  ColorSwatchGrid,
  GradientSwatch,
  type ColorSwatchProps,
  type ColorSwatchGridProps,
  type GradientSwatchProps,
} from './ColorSwatch';

// ============================================
// TYPOGRAPHY COMPONENTS
// ============================================

export {
  TypeScale,
  TypeScaleItem,
  TypeScaleComparison,
  TypeHierarchyExample,
  type TypeScaleProps,
  type TypeScaleItemProps,
  type TypeScaleComparisonProps,
} from './TypeScale';

// ============================================
// SPACING COMPONENTS
// ============================================

export {
  SpacingScale,
  SpacingScaleItem,
  SpacingExample,
  SpacingComparison,
  SectionSpacingGuide,
  type SpacingScaleProps,
  type SpacingScaleItemProps,
  type SpacingExampleProps,
  type SpacingComparisonProps,
} from './SpacingScale';

// ============================================
// COMPONENT CARD / SHOWCASE UTILITIES
// ============================================

export {
  ComponentCard,
  ComponentGrid,
  ComponentSection,
  ComponentSubSection,
  CodeBlock,
  PropertyTable,
  DoAndDont,
  type ComponentCardProps,
  type ComponentGridProps,
  type ComponentSectionProps,
  type ComponentSubSectionProps,
  type CodeBlockProps,
  type PropertyTableProps,
  type PropertyRow,
  type DoAndDontProps,
} from './ComponentCard';

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
