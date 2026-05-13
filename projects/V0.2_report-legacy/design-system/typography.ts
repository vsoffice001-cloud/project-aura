/**
 * Project K 2.0 Product Design System - Typography Tokens
 * 
 * Major Third Type Scale (1.25 ratio) with massive editorial-style headings,
 * generous line-height, and intentional hierarchy for exceptional readability.
 */

// ============================================
// TYPOGRAPHY PHILOSOPHY & PRINCIPLES
// ============================================

/**
 * Major Third Scale Philosophy:
 * 
 * Uses a 1.25 ratio between each size step, creating harmonious proportions
 * inspired by musical intervals. Starting from 16px base, each step multiplies
 * by 1.25, resulting in naturally balanced sizes with clear visual hierarchy.
 * 
 * Core Principles:
 * - Massive Headings: 48px minimum for H1 hero sections
 * - Generous Whitespace: Line-height 1.6 for body, 1.2 for headings
 * - Two Weights Only: Bold (700) and Regular (400) - no semi-bold, no light
 * - Opacity for Hierarchy: 100% primary, 70% body, 60% captions, 40% metadata
 */

// ============================================
// FONT FAMILIES
// ============================================

/**
 * IMPORTANT TYPOGRAPHY RULE:
 * 
 * - **Noto Serif**: ONLY for section titles/headings (semantic H1-H6 that introduce sections)
 * - **DM Sans**: For EVERYTHING ELSE including:
 *   - Hero display text
 *   - Body text and paragraphs
 *   - UI elements (buttons, labels, inputs)
 *   - Navigation and menus
 *   - All other text content
 * 
 * Example:
 * - Hero "Qatar Fresh Herbs Market" (large display) → DM Sans
 * - Section heading "Qatar Fresh Herbs Market Overview" → Noto Serif
 * - Body text paragraphs → DM Sans
 */
export const fontFamily = {
  display: "'Noto Serif', Georgia, serif",  // ONLY for section headings (H1-H6)
  body: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",  // Everything else
  mono: "'Fira Code', 'Courier New', monospace",  // Code only
} as const;

// ============================================
// TYPE SCALE - MAJOR THIRD (1.25 RATIO)
// ============================================

/**
 * 10-step scale from 12px to 76px based on 1.25 ratio multiplication
 * Each step multiplies by 1.25 for mathematical harmony
 */
export const fontSize = {
  xs: '12px',      // 0.75rem - Metadata, timestamps, legal copy
  sm: '14px',      // 0.875rem - Captions, labels, secondary info
  base: '16px',    // 1rem - Standard body text (foundation)
  lg: '20px',      // 1.25rem - Large body text, emphasis
  xl: '25px',      // 1.5625rem - Card headings (4+ cards)
  '2xl': '31px',   // 1.953rem - Subsections H3
  '3xl': '39px',   // 2.441rem - Main sections H2
  '4xl': '48px',   // 3rem - Hero H1 only ⭐
  '5xl': '61px',   // 3.815rem - Large hero (rare use)
  '6xl': '76px',   // 4.768rem - Massive impact (rare use)
} as const;

// ============================================
// FONT WEIGHTS - TWO WEIGHTS ONLY
// ============================================

/**
 * The Two-Weight Philosophy:
 * 
 * Limiting to two weights forces intentional hierarchy. Instead of reaching
 * for "semi-bold" to create subtle emphasis, we use size, color opacity, and
 * spacing to communicate importance. This constraint makes designs stronger.
 */
export const fontWeight = {
  regular: 400,  // Body text, paragraphs, captions, labels, UI text
  bold: 700,     // All headings, button labels, emphasized text, data labels
} as const;

// ============================================
// LINE HEIGHT SYSTEM
// ============================================

/**
 * Generous line-heights ensure exceptional readability across all text sizes
 */
export const lineHeight = {
  // Headings
  tight: '1.2',      // H1, H2 (48px, 39px)
  snug: '1.3',       // H3 (31px)
  normal: '1.4',     // H4 (25px)
  
  // Body Text
  relaxed: '1.5',    // Small text (14px)
  comfortable: '1.6', // Standard body (16px, 20px) ⭐
} as const;

// ============================================
// LETTER SPACING
// ============================================
export const letterSpacing = {
  tight: '-0.02em',    // Large headings
  normal: '0',         // Body text, UI
  wide: '0.02em',      // Small caps, labels
} as const;

// ============================================
// TEXT OPACITY HIERARCHY
// ============================================

/**
 * Opacity system for creating hierarchy without changing font weight
 */
export const textOpacity = {
  primary: '100%',     // Primary headings, important text
  body: '70%',         // Standard body text
  caption: '60%',      // Captions, labels, secondary info
  metadata: '40%',     // Timestamps, metadata, legal copy
} as const;

// ============================================
// TYPOGRAPHY SCALE WITH USAGE GUIDE
// ============================================

/**
 * Complete scale reference with intended usage
 */
export const typographyScale = {
  '6xl': {
    size: fontSize['6xl'],
    lineHeight: lineHeight.tight,
    weight: fontWeight.bold,
    usage: 'Massive impact headlines (rare use)',
    example: 'Massive Impact',
  },
  '5xl': {
    size: fontSize['5xl'],
    lineHeight: lineHeight.tight,
    weight: fontWeight.bold,
    usage: 'Large hero headlines (rare use)',
    example: 'Large Hero',
  },
  '4xl': {
    size: fontSize['4xl'],
    lineHeight: lineHeight.tight,
    weight: fontWeight.bold,
    usage: 'Hero H1 only - One per page maximum',
    example: 'Hero Section Title',
  },
  '3xl': {
    size: fontSize['3xl'],
    lineHeight: lineHeight.tight,
    weight: fontWeight.bold,
    usage: 'Main sections H2 - Major section dividers',
    example: 'Section Heading',
  },
  '2xl': {
    size: fontSize['2xl'],
    lineHeight: lineHeight.snug,
    weight: fontWeight.bold,
    usage: 'Subsections H3 - Subsection headers',
    example: 'Subsection Title',
  },
  xl: {
    size: fontSize.xl,
    lineHeight: lineHeight.normal,
    weight: fontWeight.bold,
    usage: 'Card headings H4 - Large card titles (2-3 cards)',
    example: 'Card Heading',
  },
  lg: {
    size: fontSize.lg,
    lineHeight: lineHeight.comfortable,
    weight: fontWeight.regular,
    usage: 'Large body text - Emphasis, intro paragraphs',
    example: 'Large body text for emphasis',
  },
  base: {
    size: fontSize.base,
    lineHeight: lineHeight.comfortable,
    weight: fontWeight.regular,
    usage: 'Standard body text - Default for most content',
    example: 'Standard body text with generous line-height',
  },
  sm: {
    size: fontSize.sm,
    lineHeight: lineHeight.relaxed,
    weight: fontWeight.regular,
    usage: 'Smaller text - Captions, labels, secondary info',
    example: 'Caption or label text',
  },
  xs: {
    size: fontSize.xs,
    lineHeight: lineHeight.relaxed,
    weight: fontWeight.regular,
    usage: 'Tiny text - Metadata, timestamps, legal copy',
    example: 'Metadata, timestamps',
  },
} as const;

// ============================================
// HIERARCHY GUIDELINES
// ============================================

/**
 * Detailed hierarchy specifications for each heading level
 */
export const hierarchyGuidelines = {
  hero: {
    fontSize: fontSize['4xl'],      // 48px
    fontWeight: fontWeight.bold,    // 700
    lineHeight: lineHeight.tight,   // 1.2
    fontFamily: fontFamily.display, // Noto Serif
    usage: 'Hero sections only - Large landing page heroes, special displays. Use sparingly.',
    opacity: textOpacity.primary,   // 100%
  },
  h1: {
    fontSize: fontSize['3xl'],      // 39px
    fontWeight: fontWeight.bold,    // 700
    lineHeight: lineHeight.tight,   // 1.2
    fontFamily: fontFamily.display, // Noto Serif
    usage: 'Page titles - Main page headline. One per page maximum.',
    opacity: textOpacity.primary,   // 100%
  },
  h2: {
    fontSize: fontSize['2xl'],      // 31px
    fontWeight: fontWeight.bold,    // 700
    lineHeight: lineHeight.snug,    // 1.3
    fontFamily: fontFamily.display, // Noto Serif
    usage: 'Section headings - Major section dividers. Use to break up long content.',
    opacity: textOpacity.primary,   // 100%
  },
  h3: {
    fontSize: fontSize.xl,          // 25px
    fontWeight: fontWeight.bold,    // 700
    lineHeight: lineHeight.normal,  // 1.4
    fontFamily: fontFamily.display, // Noto Serif
    usage: 'Subsection titles - Subsection headers within major sections.',
    opacity: textOpacity.primary,   // 100%
  },
  h4: {
    fontSize: fontSize.lg,          // 20px
    fontWeight: fontWeight.bold,    // 700
    lineHeight: lineHeight.normal,  // 1.4
    fontFamily: fontFamily.display, // Noto Serif
    usage: 'Card headings - Card titles, modal headers, prominent labels.',
    opacity: textOpacity.primary,   // 100%
  },
  h5: {
    fontSize: fontSize.base,        // 16px
    fontWeight: fontWeight.bold,    // 700
    lineHeight: lineHeight.normal,  // 1.4
    fontFamily: fontFamily.display, // Noto Serif
    usage: 'Small headings - Minor section headers.',
    opacity: textOpacity.primary,   // 100%
  },
  h6: {
    fontSize: fontSize.sm,          // 14px
    fontWeight: fontWeight.bold,    // 700
    lineHeight: lineHeight.normal,  // 1.4
    fontFamily: fontFamily.display, // Noto Serif
    usage: 'Smallest headings - Inline section headers.',
    opacity: textOpacity.primary,   // 100%
  },
  bodyLarge: {
    fontSize: fontSize.lg,             // 20px
    fontWeight: fontWeight.regular,    // 400
    lineHeight: lineHeight.comfortable, // 1.6
    fontFamily: fontFamily.body,       // DM Sans
    usage: 'Emphasized body text - Intro paragraphs, callouts.',
    opacity: textOpacity.primary,      // 100%
  },
  bodyDefault: {
    fontSize: fontSize.base,           // 16px
    fontWeight: fontWeight.regular,    // 400
    lineHeight: lineHeight.comfortable, // 1.6
    fontFamily: fontFamily.body,       // DM Sans
    usage: 'Standard body text - Default for most content. Optimized for readability.',
    opacity: textOpacity.body,         // 70%
  },
  bodySm: {
    fontSize: fontSize.sm,             // 14px
    fontWeight: fontWeight.regular,    // 400
    lineHeight: lineHeight.relaxed,    // 1.5
    fontFamily: fontFamily.body,       // DM Sans
    usage: 'Small text - Captions, labels, secondary information.',
    opacity: textOpacity.caption,      // 60%
  },
  bodyXs: {
    fontSize: fontSize.xs,             // 12px
    fontWeight: fontWeight.regular,    // 400
    lineHeight: lineHeight.relaxed,    // 1.5
    fontFamily: fontFamily.body,       // DM Sans
    usage: 'Tiny text - Metadata, timestamps, legal copy.',
    opacity: textOpacity.metadata,     // 40%
  },
} as const;

// ============================================
// TEXT STYLE PRESETS (READY TO USE)
// ============================================

export const textStyles = {
  // Hero
  hero: {
    fontSize: fontSize['4xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    fontFamily: fontFamily.display,
    letterSpacing: letterSpacing.tight,
  },
  
  // Headings
  h1: {
    fontSize: fontSize['4xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    fontFamily: fontFamily.display,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    fontFamily: fontFamily.display,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.snug,
    fontFamily: fontFamily.display,
    letterSpacing: letterSpacing.normal,
  },
  h4: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.normal,
    fontFamily: fontFamily.display,
    letterSpacing: letterSpacing.normal,
  },
  h5: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.normal,
    fontFamily: fontFamily.display,
    letterSpacing: letterSpacing.normal,
  },
  h6: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.normal,
    fontFamily: fontFamily.display,
    letterSpacing: letterSpacing.normal,
  },

  // Body Text
  bodyXl: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.comfortable,
    fontFamily: fontFamily.body,
    letterSpacing: letterSpacing.normal,
  },
  body: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.comfortable,
    fontFamily: fontFamily.body,
    letterSpacing: letterSpacing.normal,
  },
  bodySm: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.relaxed,
    fontFamily: fontFamily.body,
    letterSpacing: letterSpacing.normal,
  },
  bodyXs: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.relaxed,
    fontFamily: fontFamily.body,
    letterSpacing: letterSpacing.normal,
  },

  // Special
  caption: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.relaxed,
    fontFamily: fontFamily.body,
    letterSpacing: letterSpacing.wide,
  },
  metadata: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.relaxed,
    fontFamily: fontFamily.body,
    letterSpacing: letterSpacing.normal,
  },
  code: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.comfortable,
    fontFamily: fontFamily.mono,
    letterSpacing: letterSpacing.normal,
  },
} as const;

// ============================================
// SIZE SELECTION DECISION TREE
// ============================================

/**
 * Decision framework for choosing the right typography size
 * 
 * Step 1: Identify Content Type
 * - Hero heading? Section title? Body text? Label? Metadata?
 * 
 * Step 2: Check Hierarchy Level
 * - Most important? Second level? Supporting info?
 * 
 * Step 3: Match to Scale
 * - Hero = 48px (4xl)
 * - Section = 39px (3xl)
 * - Body = 16px (base)
 * - Caption = 14px (sm)
 * - Metadata = 12px (xs)
 * 
 * Step 4: Apply Weight + Opacity
 * - Bold for headings (font-bold)
 * - Regular for body
 * - Then use opacity (text-black/70) for further hierarchy
 */

export const decisionTree = {
  heroSection: {
    mainHeadline: { size: fontSize['4xl'], weight: fontWeight.bold, opacity: textOpacity.primary },
    subheadline: { size: fontSize.lg, weight: fontWeight.regular, opacity: textOpacity.body },
  },
  blogPost: {
    articleTitle: { size: fontSize['3xl'], weight: fontWeight.bold, opacity: textOpacity.primary },
    body: { size: fontSize.base, weight: fontWeight.regular, opacity: textOpacity.body },
    metadata: { size: fontSize.xs, weight: fontWeight.regular, opacity: textOpacity.metadata },
  },
  dashboard: {
    pageTitle: { size: fontSize['3xl'], weight: fontWeight.bold, opacity: textOpacity.primary },
    cardTitle: { size: fontSize.xl, weight: fontWeight.bold, opacity: textOpacity.primary },
    metrics: { size: fontSize['2xl'], weight: fontWeight.bold, opacity: textOpacity.primary },
    labels: { size: fontSize.sm, weight: fontWeight.regular, opacity: textOpacity.caption },
  },
} as const;

// ============================================
// CSS VARIABLE NAMES (for reference)
// ============================================
export const typographyCSSVariables = {
  // Font Families
  fontDisplay: '--font-display',
  fontBody: '--font-body',
  fontMono: '--font-mono',
  
  // Font Sizes (Major Third Scale)
  textXs: '--text-xs',
  textSm: '--text-sm',
  textBase: '--text-base',
  textLg: '--text-lg',
  textXl: '--text-xl',
  text2xl: '--text-2xl',
  text3xl: '--text-3xl',
  text4xl: '--text-4xl',
  text5xl: '--text-5xl',
  text6xl: '--text-6xl',
  
  // Font Weights
  fontRegular: '--font-regular',
  fontBold: '--font-bold',
  
  // Line Heights
  leadingTight: '--leading-tight',
  leadingSnug: '--leading-snug',
  leadingNormal: '--leading-normal',
  leadingRelaxed: '--leading-relaxed',
  leadingComfortable: '--leading-comfortable',
} as const;

// ============================================
// BEST PRACTICES
// ============================================

/**
 * DO:
 * ✓ Use exact scale values (48px, 39px, 31px, etc.) - never estimate
 * ✓ Apply font-bold to all headings and important labels
 * ✓ Use opacity (text-black/70, text-black/60) to create hierarchy
 * ✓ Maintain 1.6 line-height for body text
 * ✓ Limit to one H1 per page (48px hero heading)
 * ✓ Use 16px (base) as default for all body text
 * 
 * DON'T:
 * ✗ Use arbitrary font sizes (50px, 35px, 18px) outside the scale
 * ✗ Use semi-bold, medium, light, or other intermediate weights
 * ✗ Set body text smaller than 16px - hurts readability
 * ✗ Use tight line-heights (1.0-1.2) for body text
 * ✗ Have multiple 48px headings competing for attention
 * ✗ Mix Tailwind text utilities (text-2xl) with pixel values
 */

// ============================================
// QUICK REFERENCE SUMMARY
// ============================================

export const quickReference = {
  ratio: '1.25 (Major Third)',
  weights: 'Bold (700) and Regular (400) only',
  bodyLineHeight: '1.6',
  headingLineHeight: '1.2',
  
  hierarchy: {
    hero: '48px Bold, 1.2 leading',
    section: '39px Bold, 1.2 leading',
    subsection: '31px Bold, 1.3 leading',
    card: '25px Bold, 1.4 leading',
    bodyLarge: '20px Regular, 1.6 leading',
    bodyDefault: '16px Regular, 1.6 leading',
  },
} as const;

// ============================================
// TYPE EXPORTS
// ============================================
export type FontFamily = typeof fontFamily;
export type FontSize = typeof fontSize;
export type FontWeight = typeof fontWeight;
export type LineHeight = typeof lineHeight;
export type TextOpacity = typeof textOpacity;
export type TextStyles = typeof textStyles;
export type HierarchyGuidelines = typeof hierarchyGuidelines;