/**
 * Chart Color Constants - Design System VS 26
 * 
 * Centralized chart colors for data visualization components.
 * Maps design system tokens to chart-specific color usage.
 */

import { colors } from './tokens';

/**
 * Chart Colors mapped to design system tokens
 */
export const chartColors = {
  // Primary data visualization colors
  perano: colors.accent.perano500,        // #dfeafa - Light data visualization
  periwinkle: colors.accent.periwinkle500, // #c3c6f9 - Trust/reliability
  purple: colors.accent.purple600,        // #806ce0 - Premium/emphasis
  
  // Foundation colors
  warm: colors.warm.warm300,              // #f5f2f1 - Warm backgrounds
  warmAccent: colors.warm.warm600,        // #d9d1ce - Warm accents
  
  // Neutral colors
  gray50: colors.black.black50,           // #fafafa
  gray100: colors.black.black100,         // #f5f5f5
  gray200: colors.black.black200,         // #e5e5e5
  gray300: colors.black.black300,         // #d4d4d4
  gray400: colors.black.black400,         // #a3a3a3
  gray500: colors.black.black500,         // #737373
  
  // Chart backgrounds
  white: colors.black.white,              // #ffffff
  
  // Stroke colors
  strokeLight: colors.black.black200,     // #e5e5e5 - Grid lines
  strokeMedium: colors.black.black400,    // #a3a3a3 - Axes
  strokeDark: colors.black.black500,      // #737373 - Text
  
  // Special accent
  blue: '#6b94c0', // Data stroke color (custom for charts)
} as const;

/**
 * Segmentation data colors - maintains design system hierarchy
 */
export const segmentationColors = {
  drugDiscovery: chartColors.perano,      // Largest segment - light
  diagnostics: chartColors.periwinkle,    // Major segment - trust
  precisionMedicine: chartColors.purple,  // Premium segment - emphasis
  clinicalTrials: chartColors.warm,       // Foundation segment
  patientMonitoring: chartColors.warmAccent, // Accent segment
  others: chartColors.gray200,            // Minor segment
} as const;

/**
 * Tooltip style configuration
 */
export const tooltipStyle = {
  background: chartColors.white,
  border: `1px solid ${chartColors.gray200}`,
  borderRadius: '5px',
  fontSize: '14px',
} as const;

/**
 * Axis style configuration
 */
export const axisStyle = {
  tick: {
    fontSize: 12,
    fill: chartColors.strokeDark,
  },
  stroke: chartColors.strokeMedium,
} as const;

/**
 * Grid style configuration
 */
export const gridStyle = {
  strokeDasharray: '3 3',
  stroke: chartColors.strokeLight,
} as const;
