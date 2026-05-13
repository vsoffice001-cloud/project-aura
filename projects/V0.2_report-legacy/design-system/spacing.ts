/**
 * Project KP 2.0 Product Design System - Spacing Tokens
 * 
 * Consistent spacing scale for layouts, components, and content
 */

export const spacing = {
  // ============================================
  // BASE SPACING SCALE (px)
  // ============================================
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
  36: '144px',
  40: '160px',
  44: '176px',
  48: '192px',
  52: '208px',
  56: '224px',
  60: '240px',
  64: '256px',
  72: '288px',
  80: '320px',
  96: '384px',
} as const;

// ============================================
// SEMANTIC SPACING TOKENS
// ============================================
export const semanticSpacing = {
  // Component Spacing
  component: {
    xxs: spacing[1],    // 4px
    xs: spacing[2],     // 8px
    sm: spacing[3],     // 12px
    md: spacing[4],     // 16px
    lg: spacing[6],     // 24px
    xl: spacing[8],     // 32px
    xxl: spacing[12],   // 48px
  },

  // Layout Spacing
  layout: {
    xs: spacing[4],     // 16px
    sm: spacing[6],     // 24px
    md: spacing[8],     // 32px
    lg: spacing[12],    // 48px
    xl: spacing[16],    // 64px
    xxl: spacing[24],   // 96px
    xxxl: spacing[32],  // 128px
  },

  // Container Padding
  container: {
    mobile: spacing[4],   // 16px
    tablet: spacing[8],   // 32px
    desktop: spacing[12], // 48px
    wide: spacing[16],    // 64px
  },

  // Section Spacing
  section: {
    xs: spacing[8],     // 32px
    sm: spacing[12],    // 48px
    md: spacing[16],    // 64px
    lg: spacing[24],    // 96px
    xl: spacing[32],    // 128px
  },

  // Content Spacing
  content: {
    paragraph: spacing[6],  // 24px - between paragraphs
    heading: spacing[4],    // 16px - heading to content
    list: spacing[2],       // 8px - list items
    card: spacing[4],       // 16px - card padding
  },
} as const;

// ============================================
// LAYOUT & CONTAINER – Proportional padding
// ============================================
export const layout = {
  // Core content area constraints
  content: {
    maxWidth: '1440px',   // Prevents ultra-wide text lines on 4K+
    minWidth: '320px',    // Mobile safety
  },

  // Side padding – proportional to viewport width
  padding: {
    side: '20%',          // Left & right = 20% each → 40% total padding
    sideMin: '16px',      // Never smaller than mobile comfort
    sideMax: '160px',     // Cap extreme padding on ultra-wide
  },

  // Final computed padding (recommended usage)
  // Use: `padding-inline: ${layout.paddingInline}`
  paddingInline: 'clamp(16px, 20%, 160px)',
} as const;

// ============================================
// BORDER RADIUS – Intent-driven scale
// ============================================
export const borderRadius = {
  none: '0px',
  xs: '2.5px',    // Exceptional: tiny tags, badges, micro-buttons
  sm: '5px',      // Tight: form inputs, chips, toggles (Ken Research standard)
  md: '10px',     // Standard: cards, panels, tables
  lg: '15px',     // Dialogs, modals, drawers, large surfaces
  xl: '20px',     // Marketing hero containers, large banners
  full: '9999px', // Pills, avatars, circular buttons
} as const;

// ============================================
// ELEVATION / SHADOW LEVELS – Semantic depth
// ============================================
export const shadows = {
  flat: 'none',
  xs: '0 1px 2px rgba(0, 0, 0, 0.08)',
  sm: '0 1px 2px rgba(0, 0, 0, 0.08)',      // Subtle lift, e.g. cards on hover
  md: '0 4px 12px rgba(0, 0, 0, 0.12)',     // Standard card, popover
  lg: '0 12px 28px rgba(0, 0, 0, 0.18)',    // Modal, dialog, dropdown menu
  xl: '0 20px 40px rgba(0, 0, 0, 0.22)',    // Deep overlays, floating panels
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  
  // Brand-specific shadows for colored accents
  brand: {
    red: '0 10px 15px -3px rgba(176, 31, 36, 0.1), 0 4px 6px -4px rgba(176, 31, 36, 0.1)',
    redHover: '0 20px 25px -5px rgba(176, 31, 36, 0.15), 0 8px 10px -6px rgba(176, 31, 36, 0.1)',
    periwinkle: '0 10px 15px -3px rgba(167, 171, 240, 0.1), 0 4px 6px -4px rgba(167, 171, 240, 0.1)',
  },
} as const;

// ============================================
// Z-INDEX SCALE
// ============================================
export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  toast: 1700,
} as const;

// ============================================
// TRANSITIONS & TIMING – Feel tuning
// ============================================
export const transitions = {
  duration: {
    xxs: '150ms',   // Very quick micro-interactions
    xs: '200ms',
    sm: '300ms',    // Default hover/click feedback
    md: '400ms',
    lg: '500ms',
    xl: '600ms',    // Page transitions, drawer open
    xxl: '700ms',
    xxxl: '800ms',
    max: '900ms',   // Slow reveals, loading emphasis
  },
  timing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',      // Recommended for most exits
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
} as const;

// ============================================
// CSS VARIABLE NAMES (for reference)
// ============================================
export const spacingCSSVariables = {
  // Container
  containerMobile: '--container-mobile',
  containerTablet: '--container-tablet',
  containerDesktop: '--container-desktop',
  containerWide: '--container-wide',
  
  // Section
  sectionXs: '--section-xs',
  sectionSm: '--section-sm',
  sectionMd: '--section-md',
  sectionLg: '--section-lg',
  sectionXl: '--section-xl',
  
  // Content
  paragraphGap: '--paragraph-gap',
  headingGap: '--heading-gap',
  cardPadding: '--card-padding',
  
  // Border Radius
  radiusSm: '--radius-sm',
  radiusBase: '--radius-base',
  radiusMd: '--radius-md',
  radiusLg: '--radius-lg',
  radiusFull: '--radius-full',
} as const;

// ============================================
// TYPE EXPORTS
// ============================================
export type Spacing = typeof spacing;
export type SemanticSpacing = typeof semanticSpacing;
export type BorderRadius = typeof borderRadius;
export type Shadows = typeof shadows;
export type ZIndex = typeof zIndex;
export type Transitions = typeof transitions;