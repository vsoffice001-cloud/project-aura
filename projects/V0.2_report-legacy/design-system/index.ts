/**
 * Project KP 2.0 Product Design System
 * 
 * Central export file for all design tokens
 * Import from this file: import { colors, typography, spacing } from '@/design-system'
 */

export { colors, semanticColors, cssVariables, type ColorScale, type SemanticColors } from './colors';
export { typography, textStyles, typographyCSSVariables, type Typography, type TextStyles } from './typography';
export { 
  spacing, 
  semanticSpacing,
  layout,
  borderRadius, 
  shadows, 
  zIndex, 
  transitions,
  spacingCSSVariables,
  type Spacing,
  type SemanticSpacing,
  type BorderRadius,
  type Shadows,
  type ZIndex,
  type Transitions,
} from './spacing';

// Version
export const VERSION = '2.0.1';

// Quick reference object for common tokens
export const tokens = {
  // Most used colors
  colors: {
    brandRed: '#b01f24',
    black: '#000000',
    white: '#ffffff',
    gray: '#525252',
    warm: '#f5f2f1',
    periwinkle: '#a7abf0',
  },
  
  // Most used spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  
  // Layout & Container
  layout: {
    contentMaxWidth: '1440px',
    paddingInline: 'clamp(16px, 20%, 160px)',
  },
  
  // Most used typography
  typography: {
    displayFont: "'Noto Serif', Georgia, serif",
    bodyFont: "'DM Sans', sans-serif",
    baseSize: '16px',
  },
  
  // Most used effects
  effects: {
    radiusStandard: '5px',       // Ken standard for buttons/inputs
    radiusCard: '10px',          // Cards
    shadowCard: '0 4px 12px rgba(0,0,0,0.12)',
    transition: '300ms cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;