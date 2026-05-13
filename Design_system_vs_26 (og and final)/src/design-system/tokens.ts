/**
 * Design System Tokens
 * 
 * All design tokens as TypeScript constants for type-safe usage across the application.
 * Based on the 92-5-3 color hierarchy and Major Third (1.25) typography scale.
 * 
 * @see /DESIGN_TOKENS.md for complete documentation
 */

// ============================================
// COLOR TOKENS
// ============================================

/**
 * Primary Color Palette (92% Usage)
 * Foundation colors for the entire design system
 */
export const colors = {
  // Black & White
  black: '#000000',
  white: '#ffffff',
  
  // Warm Off-White System
  warmBg: '#f5f2f1',
  warmBorder: '#eae5e3',
  
  // Brand Red (5% Usage - CTAs Only)
  brand: {
    red500: '#c62d31',  // Gradient end
    red600: '#b01f24',  // Brand primary, gradient start
    red700: '#8f181d',  // Hover state
    red800: '#771419',  // Active state
    red900: '#5f1014',  // Deep emphasis
  },
  
  // Accent Colors (3% Usage - Shadows & Highlights Only)
  accent: {
    purple600: '#806ce0',
    periwinkle500: '#c3c6f9',
    perano500: '#dfeafa',
    warm600: '#d9d1ce',
  },
} as const;

/**
 * Gradient Definitions
 */
export const gradients = {
  primary: 'linear-gradient(90deg, #0a0a0a, #6a6a6a)',
  brandRed: 'linear-gradient(90deg, #b01f24, #c62d31)',
} as const;

// ============================================
// TYPOGRAPHY TOKENS
// ============================================

/**
 * Typography Scale - Major Third (1.25 Ratio)
 * Base size: 16px (1rem)
 */
export const typography = {
  // Font Sizes (in rem)
  size: {
    '5xl': '4.769rem',   // 76.3px
    '4xl': '3.815rem',   // 61px
    '3xl': '3.052rem',   // 48.8px - Hero H1 only
    '2xl': '2.441rem',   // 39px - Section H2
    'xl': '1.953rem',    // 31.25px - Subsection H3
    'lg': '1.563rem',    // 25px - Card titles (2-3 cards)
    'base': '1.25rem',   // 20px - Large body, card titles (4+)
    'sm': '1rem',        // 16px - Standard body
    'xs': '0.8rem',      // 12.8px - Labels, metadata
  },
  
  // Font Sizes (in pixels for reference)
  sizePx: {
    '5xl': 76.3,
    '4xl': 61,
    '3xl': 48.8,
    '2xl': 39,
    'xl': 31.25,
    'lg': 25,
    'base': 20,
    'sm': 16,
    'xs': 12.8,
  },
  
  // Line Heights
  lineHeight: {
    '5xl': 1.1,
    '4xl': 1.1,
    '3xl': 1.2,
    '2xl': 1.3,
    'xl': 1.4,
    'lg': 1.5,
    'base': 1.6,
    'sm': 1.6,
    'xs': 1.5,
  },
  
  // Font Families
  fontFamily: {
    sans: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    mono: "'Courier New', Courier, monospace",
  },
  
  // Font Weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

// ============================================
// SPACING TOKENS
// ============================================

/**
 * Spacing Scale (4px base unit)
 */
export const spacing = {
  // In rem
  rem: {
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
  },
  
  // In pixels
  px: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
  },
} as const;

// ============================================
// BORDER RADIUS TOKENS
// ============================================

/**
 * Border Radius System (3 tiers)
 * RULE: Never mix radius sizes within same component
 */
export const borderRadius = {
  image: '2.5px',   // Images, photos, visual media
  small: '5px',     // Buttons, small cards, badges
  large: '10px',    // Big cards, containers, sections
} as const;

// ============================================
// SHADOW TOKENS
// ============================================

/**
 * Shadow System (3 levels)
 */
export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  
  // Special: Brand Button Shadow
  brandButton: {
    default: '0 8px 24px rgba(176, 31, 36, 0.15)',
    hover: '0 12px 32px rgba(176, 31, 36, 0.25)',
  },
  
  // Accent Shadow Tints (6-8% opacity)
  accent: {
    purple: '0 8px 24px rgba(128, 108, 224, 0.06)',
    warm: '0 4px 12px rgba(217, 209, 206, 0.08)',
  },
} as const;

// ============================================
// ANIMATION TOKENS
// ============================================

/**
 * Easing Functions
 */
export const easing = {
  smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.2, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
} as const;

/**
 * Duration Tokens
 */
export const duration = {
  instant: '150ms',
  fast: '300ms',
  normal: '600ms',
  slow: '900ms',
} as const;

// ============================================
// BREAKPOINT TOKENS
// ============================================

/**
 * Responsive Breakpoints
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================
// LAYOUT TOKENS
// ============================================

/**
 * Layout Constraints
 */
export const layout = {
  maxWidth: {
    content: '1000px',
    wide: '1200px',
  },
  
  containerPadding: {
    mobile: '1rem',    // px-4
    tablet: '1.5rem',  // sm:px-6
    desktop: '2rem',   // md:px-8
  },
} as const;

// ============================================
// OPACITY TOKENS
// ============================================

/**
 * Opacity Scale
 */
export const opacity = {
  // Text Opacity
  secondary: 0.7,   // 70% - Secondary text
  tertiary: 0.6,    // 60% - Tertiary text
  disabled: 0.4,    // 40% - Disabled state
  subtle: 0.1,      // 10% - Very subtle backgrounds
  
  // Border Opacity
  border: {
    light: 0.1,      // 10% - Light borders
    standard: 0.2,   // 20% - Standard borders
  },
  
  // Accent Shadow Opacity
  accentShadow: 0.06,  // 6% - Accent color shadows
} as const;

// ============================================
// Z-INDEX TOKENS
// ============================================

/**
 * Z-Index Scale
 */
export const zIndex = {
  base: 1,
  dropdown: 10,
  sticky: 100,
  navbar: 1000,
  modalBackdrop: 9000,
  modal: 9999,
  tooltip: 10000,
} as const;

// ============================================
// DESIGN SYSTEM METADATA
// ============================================

/**
 * Design System Metadata
 */
export const designSystem = {
  version: '1.0.0',
  name: 'Premium Editorial Design System',
  colorHierarchy: {
    foundation: '92%',  // Black/White/Warm
    brandRed: '5%',     // CTAs only
    accents: '3%',      // Shadows & highlights
  },
  typographyScale: 'Major Third (1.25)',
  baseSize: '16px',
} as const;

// ============================================
// UTILITY TYPES
// ============================================

/**
 * Type utilities for type-safe token usage
 */
export type Color = typeof colors[keyof typeof colors];
export type BrandColor = typeof colors.brand[keyof typeof colors.brand];
export type AccentColor = typeof colors.accent[keyof typeof colors.accent];
export type TypographySize = keyof typeof typography.size;
export type SpacingValue = keyof typeof spacing.rem;
export type BorderRadiusValue = typeof borderRadius[keyof typeof borderRadius];
export type ShadowValue = typeof shadows[keyof typeof shadows];
export type EasingValue = typeof easing[keyof typeof easing];
export type DurationValue = typeof duration[keyof typeof duration];
export type BreakpointValue = typeof breakpoints[keyof typeof breakpoints];
