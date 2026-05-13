/**
 * Design System Tokens — JS Mirror of theme.css
 *
 * Single source of truth: /src/styles/theme.css (CSS custom properties)
 * This file: JS mirror for programmatic access (charts, canvas, runtime logic).
 *
 * SYNC RULE: Every value here MUST match a --var in theme.css.
 *            If you change one, change the other.
 *
 * Sections match theme.css ordering exactly.
 *
 * @example
 * ```tsx
 * import { colors, spacing, typography } from '../../design-system/tokens';
 *
 * // Use in dynamic styles, canvas, or runtime calculations
 * ctx.fillStyle = colors.brand.red;
 * const navHeight = dimensions.nav.primaryHeight; // 60
 * ```
 */

// ─── FONT SCALE SYSTEM ──────────────────────────────────────────────────────
// Major Third (1.250) — matches --font-scale-* in theme.css

export const fontScale = {
  xs: '10px',     // --font-scale-xs
  sm: '12px',     // --font-scale-sm
  base: '13px',   // --font-scale-base
  md: '16px',     // --font-scale-md (1rem)
  lg: '20px',     // --font-scale-lg
  xl: '25px',     // --font-scale-xl
  '2xl': '31px',  // --font-scale-2xl
} as const;

// ─── COLOR PALETTE ───────────────────────────────────────────────────────────
// Matches --color-* in theme.css

export const colors = {
  /** Brand palette */
  brand: {
    red: '#b01f24',       // --color-red — links, hover, CTAs
    purple: '#806ce0',    // --color-purple — accents, glows
  },

  /** Text hierarchy */
  text: {
    primary: '#141016',   // --color-primary-black
    secondary: '#656565', // --color-secondary-grey
    tertiary: '#999999',  // --color-light-grey — section headers
    white: '#ffffff',     // --color-white
  },

  /** Backgrounds */
  bg: {
    white: '#ffffff',     // --color-white
    light: '#fcfcfc',     // --color-bg-light
    grey: '#f7f7f7',      // --color-bg-grey
  },

  /** Borders */
  border: {
    default: 'rgba(20,16,22,0.1)',  // --border (Tailwind --color-border)
    divider: '#e6e6e6',             // --color-border-grey
  },

  /** Gradients (CSS strings) */
  gradients: {
    brandCta: 'linear-gradient(90deg, #b01f24, #eb484e, #b01f24)',
    primaryButton: 'linear-gradient(90deg, #141016, #656565, #141016)',
  },
} as const;

// ─── TYPOGRAPHY ──────────────────────────────────────────────────────────────

export const typography = {
  fontFamily: "'DM Sans', sans-serif",

  /** Navigation-specific semantic sizes (from --nav-* vars) */
  nav: {
    primaryText: '14px',      // --nav-primary-text (WCAG exception)
    menuItem: '13px',         // --nav-menu-item
    sectionHeader: '11px',    // --nav-section-header
    featuredTitle: '16px',    // --nav-featured-title
    featuredDesc: '13px',     // --nav-featured-desc
    ctaText: '13px',          // --nav-cta-text
    metadata: '10px',         // --nav-metadata
    helperText: '12px',       // --nav-helper-text
  },

  /** Line heights (from --nav-lh-* vars) */
  lineHeight: {
    primary: 1.43,       // --nav-lh-primary (20px at 14px)
    menu: 1.38,          // --nav-lh-menu (18px at 13px)
    header: 1.27,        // --nav-lh-header (14px at 11px)
    featured: 1.375,     // --nav-lh-featured (22px at 16px)
    metadata: 1.2,       // --nav-lh-metadata (12px at 10px)
    helper: 1.33,        // --nav-lh-helper (16px at 12px)
  },

  /** Letter spacing */
  letterSpacing: {
    tight: '0',          // --nav-ls-tight
    normal: '0.08em',    // --nav-ls-normal (section headers)
    wide: '0.1em',       // --nav-ls-wide (metadata/tags)
  },

  /** Font weights */
  weight: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
} as const;

// ─── SPACING (8px base grid) ────────────────────────────────────────────────
// Matches --spacing-* in theme.css

export const spacing = {
  1: 4,    // --spacing-1
  2: 8,    // --spacing-2
  3: 12,   // --spacing-3
  4: 16,   // --spacing-4
  5: 20,   // --spacing-5
  6: 24,   // --spacing-6
  8: 32,   // --spacing-8
  10: 40,  // --spacing-10
  12: 48,  // --spacing-12
  16: 64,  // --spacing-16

  /** Navigation-specific spacing */
  nav: {
    columnGap: 24,    // --nav-column-gap
    itemGap: 8,       // --nav-item-gap
    sectionGap: 14,   // --nav-section-gap
    itemPaddingX: 10, // --nav-item-padding-x
    itemPaddingY: 6,  // --nav-item-padding-y
  },
} as const;

// ─── BORDER RADIUS ───────────────────────────────────────────────────────────
// Matches --radius-* in theme.css

export const borderRadius = {
  '2xs': 2.5,   // --radius-2xs
  xs: 5,        // --radius-xs — buttons, inputs, nav items
  sm: 10,       // --radius-sm — cards, dropdowns
  md: 15,       // --radius-md — featured cards
  lg: 20,       // --radius-lg — hero images
  xl: 25,       // --radius-xl — prominent containers
  '2xl': 30,    // --radius-2xl — massive sections
  full: 9999,   // --radius-full — pills, avatars
} as const;

// ─── SHADOWS ─────────────────────────────────────────────────────────────────
// Matches --shadow-* in theme.css

export const shadows = {
  xs: '0px 1px 2px 0px rgba(20, 16, 22, 0.05)',
  sm: '0px 2px 4px 0px rgba(20, 16, 22, 0.08)',
  md: '0px 2px 8px 0px rgba(128, 108, 224, 0.12)',     // purple tint
  lg: '0px 4px 16px 0px rgba(20, 16, 22, 0.12)',
  xl: '0px 8px 32px 0px rgba(20, 16, 22, 0.16)',       // popovers, dropdowns
  glowPurple: '0px 1px 30px -5px rgba(128, 108, 224, 0.2)',
  glowRed: '0px 2px 12px 0px rgba(176, 31, 36, 0.15)',
} as const;

// ─── TRANSITIONS ─────────────────────────────────────────────────────────────
// Matches --transition-* in theme.css

export const transitions = {
  fast: '150ms ease-in-out',    // --transition-fast
  base: '200ms ease-in-out',    // --transition-base
  slow: '300ms ease-in-out',    // --transition-slow
  slower: '400ms ease-in-out',  // --transition-slower
} as const;

// ─── Z-INDEX (Navbar Stack) ─────────────────────────────────────────────────
// ACTUAL values used in navbar components (NOT theme.css --z-* scale)
// theme.css defines --z-dropdown:1000, --z-sticky:1020, etc.
// but the navbar uses a compact 45-101 stack for internal layering.
// These are the REAL values in the codebase.

export const zIndex = {
  /** theme.css semantic scale (for non-navbar usage) */
  semantic: {
    dropdown: 1000,  // --z-dropdown
    sticky: 1020,    // --z-sticky
    modal: 1040,     // --z-modal
    popover: 1060,   // --z-popover
    tooltip: 1080,   // --z-tooltip
  },

  /** Navbar-specific stack (compact range 45-101) */
  nav: {
    backdrop: 45,       // mega menu backdrop overlay
    primaryNav: 50,     // sticky <nav> bar
    secondaryBar: 60,   // above primary (scrolls away)
    authBackdrop: 98,   // auth popover dismiss layer
    authPopover: 99,    // auth popover card
    skipLink: 100,      // skip-to-content (on focus)
    mobileOverlay: 100, // mobile menu backdrop
    mobilePanel: 101,   // mobile menu panel
  },
} as const;

// ─── LAYOUT DIMENSIONS ──────────────────────────────────────────────────────

export const dimensions = {
  /** Container max-widths */
  container: {
    content: 1200,     // Main content container (matches nav max-width)
    wide: 1440,        // Wide layouts (e.g. nav-container utility)
  },

  /** Navigation heights */
  nav: {
    secondaryHeight: 40,  // SecondaryBar (desktop only, non-sticky)
    primaryHeight: 60,    // PrimaryNav (sticky)
    totalInitial: 100,    // 40 + 60 before scroll
    totalScrolled: 60,    // Only primary remains after scroll
  },

  /** Logo sizes — height-driven (from --logo-height-*) */
  logo: {
    xs: 16,  // --logo-height-xs — favicon, breadcrumbs, inline
    sm: 20,  // --logo-height-sm — navbar, sidebar
    md: 24,  // --logo-height-md — sticky headers, email
    lg: 32,  // --logo-height-lg — footer, about page
    xl: 48,  // --logo-height-xl — hero, splash, marketing
  },

  /** Button heights (from --button-height-*) */
  button: {
    sm: 32,  // --button-height-sm
    md: 40,  // --button-height-md
    lg: 48,  // --button-height-lg
    xl: 56,  // --button-height-xl
  },
} as const;

// ─── BREAKPOINTS ─────────────────────────────────────────────────────────────

export const breakpoints = {
  mobile: 375,     // Design spec mobile
  tablet: 768,     // md: breakpoint
  desktopNav: 1024, // lg: breakpoint — navbar switches to desktop layout
  desktop: 1200,   // Design spec desktop / container max-width
} as const;

// ─── VERSION ─────────────────────────────────────────────────────────────────

export const DESIGN_SYSTEM_VERSION = '2.0.0';

// ─── TYPE EXPORTS ────────────────────────────────────────────────────────────

export type ColorTokens = typeof colors;
export type TypographyTokens = typeof typography;
export type SpacingTokens = typeof spacing;
export type BorderRadiusTokens = typeof borderRadius;
export type ShadowTokens = typeof shadows;
export type TransitionTokens = typeof transitions;
export type ZIndexTokens = typeof zIndex;
export type DimensionTokens = typeof dimensions;
export type BreakpointTokens = typeof breakpoints;