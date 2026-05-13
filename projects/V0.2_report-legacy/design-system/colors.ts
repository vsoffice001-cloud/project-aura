/**
 * Project K 2.0 Product Design System - Color Tokens
 * 
 * Complete color palette for Ken Research applications
 * All colors are available as TypeScript exports and CSS variables
 */

export const colors = {
  // ============================================
  // FOUNDATION COLORS
  // ============================================
  foundation: {
    black: '#000000',  // Pure black - Primary text, hero backgrounds
    white: '#ffffff',  // Pure white - Primary backgrounds
  },

  // ============================================
  // GRAYSCALE (Black Tints 50-900)
  // ============================================
  grayscale: {
    50: '#fafafa',   // Near white - Very subtle backgrounds
    100: '#f5f5f5',  // Lightest gray - Card backgrounds
    200: '#e5e5e5',  // Very light gray - Borders, dividers
    300: '#d4d4d4',  // Light gray - Disabled states
    400: '#a3a3a3',  // Medium gray - Placeholder text
    500: '#737373',  // Gray - Secondary text
    600: '#525252',  // Dark gray - Body text alternative
    700: '#404040',  // Darker gray - Headings alternative
    800: '#262626',  // Very dark - Strong text
    900: '#171717',  // Almost black - Deep backgrounds
  },

  // ============================================
  // WARM OFF-WHITE SCALE (50-900)
  // ============================================
  warm: {
    50: '#fefdfd',   // Barely there - Subtle overlays
    100: '#fcfbfa',  // Very subtle - Hover backgrounds
    200: '#f9f7f6',  // Soft - Card backgrounds
    300: '#f5f2f1',  // BASE - Current section backgrounds
    400: '#f0ebe9',  // Medium - Alternative backgrounds
    500: '#eae5e3',  // Borders - Current usage
    600: '#d9d1ce',  // Timeline base - Current usage
    700: '#c8bcb8',  // Timeline nodes - Current usage
    800: '#b7a9a3',  // Dark warm - Text on light warm
    900: '#a6968e',  // Darkest warm - Strong accents
  },

  // ============================================
  // KEN BOLD RED - PRIMARY BRAND COLOR
  // ============================================
  brand: {
    red: '#b01f24',       // PRIMARY BRAND - Red 600
    redHover: '#8f181d',  // Red 700 - Hover state
    redActive: '#771419', // Red 800 - Active state
  },

  // Complete Red Scale (50-900)
  red: {
    50: '#fef2f2',   // Lightest - Subtle backgrounds
    100: '#fee2e2',  // Very light - Notice backgrounds
    200: '#fecaca',  // Light - Disabled states
    300: '#fca5a7',  // Medium light - Borders
    400: '#f87176',  // Medium - Icons, secondary
    500: '#dc3238',  // Standard - Links, active
    600: '#b01f24',  // PRIMARY BRAND - CTAs ⭐
    700: '#8f181d',  // Hover - Button hover
    800: '#771419',  // Active - Button pressed
    900: '#5f1014',  // Darkest - Text, shadows
  },

  // ============================================
  // PERIWINKLE - TRUST, RELIABILITY, SOFT ACCENTS
  // ============================================
  periwinkle: {
    50: '#fafbfe',   // Lightest - Subtle backgrounds
    100: '#f5f6fd',  // Very light - Hover backgrounds
    200: '#ebedfb',  // Light - Borders
    300: '#dfe1f9',  // Medium light - Disabled states
    400: '#d3d5f9',  // Medium - Icons background
    500: '#c3c6f9',  // Standard - Accents
    600: '#a7abf0',  // BASE - Primary periwinkle ⭐
    700: '#8b90e0',  // Hover - Interactive states
    800: '#7075c8',  // Active - Pressed states
    900: '#5a5fa0',  // Darkest - Text on light
  },

  // ============================================
  // UTILITY COLORS
  // ============================================
  
  // Success / Positive Metrics
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',  // BASE
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  // Error / Warning / Validation
  rose: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',  // BASE
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
  },

  // Warning / Highlights
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',  // BASE
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
} as const;

// ============================================
// SEMANTIC COLOR TOKENS
// ============================================
export const semanticColors = {
  // Text
  text: {
    primary: colors.foundation.black,
    secondary: colors.grayscale[600],
    tertiary: colors.grayscale[500],
    muted: colors.grayscale[400],
    disabled: colors.grayscale[300],
    inverse: colors.foundation.white,
  },

  // Backgrounds
  background: {
    primary: colors.foundation.white,
    secondary: colors.grayscale[50],
    tertiary: colors.grayscale[100],
    warm: colors.warm[300],
    warmLight: colors.warm[200],
    dark: colors.foundation.black,
  },

  // Borders
  border: {
    default: colors.grayscale[200],
    light: colors.grayscale[100],
    medium: colors.grayscale[300],
    dark: colors.grayscale[400],
    warm: colors.warm[500],
  },

  // Brand
  brand: {
    primary: colors.brand.red,
    primaryHover: colors.brand.redHover,
    primaryActive: colors.brand.redActive,
    accent: colors.periwinkle[600],
  },

  // Feedback
  feedback: {
    success: colors.green[600],
    successBg: colors.green[50],
    error: colors.rose[600],
    errorBg: colors.rose[50],
    warning: colors.amber[600],
    warningBg: colors.amber[50],
    info: colors.periwinkle[600],
    infoBg: colors.periwinkle[50],
  },
} as const;

// ============================================
// CSS VARIABLE NAMES (for reference)
// ============================================
export const cssVariables = {
  // Foundation
  black: '--black',
  white: '--white',
  
  // Grayscale
  grayscale50: '--black-50',
  grayscale100: '--black-100',
  grayscale200: '--black-200',
  grayscale300: '--black-300',
  grayscale400: '--black-400',
  grayscale500: '--black-500',
  grayscale600: '--black-600',
  grayscale700: '--black-700',
  grayscale800: '--black-800',
  grayscale900: '--black-900',
  
  // Warm
  warm50: '--warm-50',
  warm100: '--warm-100',
  warm200: '--warm-200',
  warm300: '--warm-300',
  warm400: '--warm-400',
  warm500: '--warm-500',
  warm600: '--warm-600',
  warm700: '--warm-700',
  warm800: '--warm-800',
  warm900: '--warm-900',
  
  // Brand Red
  brandRed: '--brand-red',
  brandRedHover: '--brand-red-hover',
  brandRedActive: '--brand-red-active',
  
  // Red Scale
  red50: '--red-50',
  red100: '--red-100',
  red200: '--red-200',
  red300: '--red-300',
  red400: '--red-400',
  red500: '--red-500',
  red600: '--red-600',
  red700: '--red-700',
  red800: '--red-800',
  red900: '--red-900',
  
  // Periwinkle
  periwinkle50: '--periwinkle-50',
  periwinkle100: '--periwinkle-100',
  periwinkle200: '--periwinkle-200',
  periwinkle300: '--periwinkle-300',
  periwinkle400: '--periwinkle-400',
  periwinkle500: '--periwinkle-500',
  periwinkle600: '--periwinkle-600',
  periwinkle700: '--periwinkle-700',
  periwinkle800: '--periwinkle-800',
  periwinkle900: '--periwinkle-900',
} as const;

// ============================================
// TYPE EXPORTS
// ============================================
export type ColorScale = typeof colors;
export type SemanticColors = typeof semanticColors;
