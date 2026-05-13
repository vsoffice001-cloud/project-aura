/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚠️ DEPRECATED - SECTION LABEL COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * @deprecated This component is deprecated. Use the unified Badge system instead.
 * 
 * Migration:
 * ```tsx
 * // OLD (deprecated)
 * import { SectionLabel } from '@/app/components/badges';
 * 
 * // NEW (recommended)
 * import { SectionLabel } from '@/app/components/Badge';
 * ```
 * 
 * The new Badge system provides:
 * ✅ Unified API for all badge variants
 * ✅ Better TypeScript support
 * ✅ More flexible theming options
 * ✅ Consistent design tokens
 * 
 * Documentation: /src/app/components/BADGE_SYSTEM.md
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * ORIGINAL DOCUMENTATION (For reference only)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * A minimalist label component for section headers in editorial layouts.
 * Uses uppercase typography, generous letter-spacing, and semantic color tokens
 * to create clear visual hierarchy without overwhelming content.
 * 
 * Part of the editorial design system for case studies, blogs, and long-form
 * content following Major Third (1.25) typographic scale.
 * 
 * ───────────────────────────────────────────────────────────────────────────
 * 📚 DOCUMENTATION INDEX
 * ───────────────────────────────────────────────────────────────────────────
 * 1. WHY - Purpose & Design Rationale
 * 2. WHAT - Component Anatomy & Structure
 * 3. WHEN - Usage Guidelines & Scenarios
 * 4. WHERE - Placement & Spacing Rules
 * 5. HOW - Implementation & Code Examples
 * 
 * ───────────────────────────────────────────────────────────────────────────
 * 🎯 WHY (PURPOSE & DESIGN RATIONALE)
 * ───────────────────────────────────────────────────────────────────────────
 * 
 * PRIMARY OBJECTIVES:
 * • Content Organization: Creates clear section boundaries in long-form content
 * • Visual Hierarchy: Establishes parent-child relationship with headings
 * • Scanability: Uppercase + letter-spacing makes labels highly scannable
 * • Editorial Polish: Adds professional, magazine-style aesthetic
 * 
 * DESIGN PHILOSOPHY:
 * • Minimalist Approach: Small, understated labels that don't compete with headings
 * • Semantic Pairing: Always paired with h2/h3 headings (never standalone)
 * • Consistent Spacing: Uses design tokens for predictable vertical rhythm
 * • Accessible: WCAG AAA compliant color contrast (60% black = 8.9:1 on white)
 * 
 * TYPOGRAPHIC HIERARCHY:
 * 
 * SECTION LABEL (11px, uppercase, 60% opacity)
 * ↓
 * Section Heading (20-36px, sentence case, 100% opacity)
 * ↓
 * Body Text (15px, normal case, 70% opacity)
 * 
 * USER BENEFITS:
 * • Quick Navigation: Users can skim labels to find sections fast
 * • Context Awareness: Labels provide meta-information about content type
 * • Professional Credibility: Editorial styling signals quality content
 * 
 * ───────────────────────────────────────────────────────────────────────────
 * 🏗️ WHAT (COMPONENT ANATOMY)
 * ───────────────────────────────────────────────────────────────────────────
 * 
 * STRUCTURE:
 * 
 * ┌─────────────────────────────────────┐
 * │  SECTION LABEL (11px, uppercase)    │ ← Small, subtle, high letter-spacing
 * │  12px vertical spacing              │
 * │  Section Heading (20-36px)          │ ← Large, bold, attention-grabbing
 * └─────────────────────────────────────┘
 * 
 * KEY PROPERTIES:
 * 
 * Typography:
 * • Font Size: var(--text-xs) = 10-11px
 * • Font Weight: 400 (Normal) - intentionally light
 * • Text Transform: Uppercase
 * • Letter Spacing: 1.8px (16.4% of font size)
 * • Line Height: 1.6 (provides breathing room)
 * 
 * Color Tokens (Semantic):
 * • Light Background: var(--label-on-white) = rgba(0,0,0,0.6) - 60% black
 * • Dark Background: var(--label-on-black) = rgba(255,255,255,0.7) - 70% white
 * • Contrast Ratio: 8.9:1 (WCAG AAA for small text)
 * 
 * Spacing:
 * • Margin Bottom: var(--pair-label-heading) = 12px
 * • Section Top Margin: var(--spacing-section) = 64-80px
 * 
 * ───────────────────────────────────────────────────────────────────────────
 * ⏰ WHEN (USAGE GUIDELINES)
 * ───────────────────────────────────────────────────────────────────────────
 * 
 * ✅ USE WHEN:
 * 
 * 1. Section Headers:
 *    CHALLENGES
 *    Key Engagement Obstacles
 * 
 * 2. Content Categories:
 *    CASE STUDY
 *    Evaluating India's Transformer Market...
 * 
 * 3. Metadata Labels:
 *    PUBLISHED
 *    January 15, 2024
 * 
 * 4. Page Sections:
 *    • Client Context
 *    • Engagement Objectives
 *    • Methodology
 *    • Impact & Results
 * 
 * ❌ AVOID WHEN:
 * 
 * 1. Standalone Text: Never use without a paired heading below
 * 2. Body Content: Don't use mid-paragraph or within text blocks
 * 3. Interactive Elements: Use buttons/links, not labels
 * 4. Dynamic Data: Not for user-generated or changing content
 * 5. Lists: Don't label every list item (use ObjectivePill instead)
 * 
 * LABEL TEXT GUIDELINES:
 * • Keep it short: 1-3 words maximum
 * • Use present tense: "Challenges" not "Challenged"
 * • Avoid articles: "Engagement Objectives" not "The Objectives"
 * • Be descriptive: "Key Findings" not "Section 2"
 * 
 * ───────────────────────────────────────────────────────────────────────────
 * 📍 WHERE (PLACEMENT & SPACING)
 * ───────────────────────────────────────────────────────────────────────────
 * 
 * VERTICAL SPACING SYSTEM:
 * 
 * ┌─────────────────────────────────────┐
 * │ Previous Section Content            │
 * │                                     │
 * ├─────────────────────────────────────┤ ← 64-80px gap (section break)
 * │ SECTION LABEL                       │
 * ├─────────────────────────────────────┤ ← 12px gap (tight pairing)
 * │ Section Heading                     │
 * ├─────────────────────────────────────┤ ← 16-24px gap (heading-body)
 * │ Body content starts here...        │
 * └─────────────────────────────────────┘
 * 
 * SPACING TOKENS (from design system):
 * 
 * • var(--pair-label-heading): 12px
 *   Purpose: Tight coupling between label and heading
 *   Ratio: 1:1 with font size (creates visual bond)
 * 
 * • var(--spacing-section): 64px mobile, 80px desktop
 *   Purpose: Clear separation between major sections
 *   Ratio: Major Third scale (1.25x from 48px base)
 * 
 * • var(--spacing-heading-body): 16-24px
 *   Purpose: Breathing room after headings
 *   Ratio: 1.5x - 2x heading font size
 * 
 * HORIZONTAL PLACEMENT:
 * • Max Width: 1000px (design system content width)
 * • Padding: 16px mobile, 32px desktop
 * • Alignment: Left-aligned with heading and body
 * • Never centered (breaks editorial flow)
 * 
 * ───────────────────────────────────────────────────────────────────────────
 * 🛠️ HOW (IMPLEMENTATION)
 * ───────────────────────────────────────────────────────────────────────────
 */

import { CSSProperties, ReactNode } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES & INTERFACES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * SectionLabel Component Props
 */
export interface SectionLabelProps {
  /** Label text (1-3 words recommended) */
  children: ReactNode;
  
  /** Visual theme variant */
  variant?: 'light' | 'dark';
  
  /** HTML tag to use (default: span) */
  as?: 'span' | 'p' | 'div';
  
  /** Additional CSS classes */
  className?: string;
  
  /** Custom inline styles (override tokens) */
  style?: CSSProperties;
  
  /** Accessibility label override */
  ariaLabel?: string;
}

/**
 * SectionLabelWithHeading Props
 * Combines label + heading in one component with proper spacing
 */
export interface SectionLabelWithHeadingProps {
  /** Label text (e.g., "CHALLENGES") */
  label: string;
  
  /** Heading text */
  heading: ReactNode;
  
  /** Heading level (h1-h6) */
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  
  /** Visual theme variant */
  variant?: 'light' | 'dark';
  
  /** Additional description/subtitle */
  description?: ReactNode;
  
  /** Container CSS classes */
  className?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * COLOR TOKENS (Semantic)
 * 
 * These use CSS custom properties from /src/styles/theme.css
 * Ensures consistent contrast ratios across the design system.
 */
const COLOR_TOKENS = {
  light: {
    color: 'var(--label-on-white)', // rgba(0,0,0,0.6) - 60% black
    contrastRatio: '8.9:1',         // WCAG AAA compliant
  },
  dark: {
    color: 'var(--label-on-black)', // rgba(255,255,255,0.7) - 70% white
    contrastRatio: '12.6:1',        // WCAG AAA compliant
  },
} as const;

/**
 * TYPOGRAPHY TOKENS
 * 
 * Based on Major Third scale (1.25 ratio)
 * Base size: 16px → 12.8px → 10.24px (rounded to 11px)
 */
const TYPOGRAPHY = {
  fontSize: 'var(--text-xs)',         // 10-11px
  fontWeight: 400,                    // Normal (intentionally light)
  textTransform: 'uppercase' as const,
  letterSpacing: '1.8px',             // 16.4% of 11px = enhanced scanability
  lineHeight: '1.6',                  // Generous vertical space
} as const;

/**
 * SPACING TOKENS
 * 
 * Follows 4px grid system with semantic naming
 */
const SPACING = {
  labelToHeading: 'var(--pair-label-heading)', // 12px - tight pairing
  sectionTop: 'var(--spacing-section)',        // 64-80px - section breaks
  headingToBody: 'var(--spacing-heading-body)', // 16-24px - breathing room
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * SectionLabel Component
 * 
 * USAGE EXAMPLES:
 * 
 * Basic:
 * <SectionLabel>Challenges</SectionLabel>
 * 
 * Dark Theme:
 * <SectionLabel variant="dark">Case Study</SectionLabel>
 * 
 * Custom Tag:
 * <SectionLabel as="p">Engagement Objectives</SectionLabel>
 * 
 * With Heading (Manual):
 * <div>
 *   <SectionLabel>Methodology</SectionLabel>
 *   <h2>Our Research Approach</h2>
 * </div>
 */
export function SectionLabel({
  children,
  variant = 'light',
  as: Component = 'span',
  className = '',
  style = {},
  ariaLabel,
}: SectionLabelProps) {
  const colorToken = COLOR_TOKENS[variant];
  
  const baseStyles: CSSProperties = {
    display: 'block',
    fontSize: TYPOGRAPHY.fontSize,
    fontWeight: TYPOGRAPHY.fontWeight,
    textTransform: TYPOGRAPHY.textTransform,
    letterSpacing: TYPOGRAPHY.letterSpacing,
    lineHeight: TYPOGRAPHY.lineHeight,
    color: colorToken.color,
    marginBottom: SPACING.labelToHeading,
    ...style, // Allow overrides
  };
  
  return (
    <Component
      className={`section-label ${className}`}
      style={baseStyles}
      aria-label={ariaLabel}
    >
      {children}
    </Component>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// COMBINED LABEL + HEADING COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * SectionLabelWithHeading
 * 
 * Pre-built component that combines label + heading with correct spacing.
 * Handles responsive typography and optional descriptions.
 * 
 * USAGE:
 * <SectionLabelWithHeading 
 *   label="Challenges"
 *   heading="Key Engagement Obstacles"
 *   headingLevel="h2"
 *   description="Identifying risks in India's transformer bushing market"
 * />
 * 
 * OUTPUT:
 * CHALLENGES
 * Key Engagement Obstacles
 * Identifying risks in India's transformer bushing market
 */
export function SectionLabelWithHeading({
  label,
  heading,
  headingLevel: HeadingTag = 'h2',
  variant = 'light',
  description,
  className = '',
}: SectionLabelWithHeadingProps) {
  return (
    <div className={`section-label-group ${className}`}>
      {/* Section Label */}
      <SectionLabel variant={variant}>
        {label}
      </SectionLabel>
      
      {/* Section Heading */}
      <HeadingTag
        className="section-heading"
        style={{
          fontSize: HeadingTag === 'h2' ? 'var(--text-2xl)' : 'var(--text-xl)',
          fontWeight: 500,
          color: variant === 'light' ? 'var(--black-900)' : 'var(--white-100)',
          lineHeight: 1.3,
          letterSpacing: '-0.02em',
          marginBottom: description ? SPACING.headingToBody : 0,
        }}
      >
        {heading}
      </HeadingTag>
      
      {/* Optional Description */}
      {description && (
        <p
          className="section-description"
          style={{
            fontSize: 'var(--text-sm)',
            color: variant === 'light' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)',
            lineHeight: 1.7,
            marginTop: '0',
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SPECIALIZED VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * CaseStudyBadge
 * 
 * Specialized section label for case study pages.
 * Follows same styling but with semantic naming.
 * 
 * USAGE:
 * <CaseStudyBadge />
 * Output: "CASE STUDY"
 */
export function CaseStudyBadge({
  variant = 'light',
  className = '',
}: {
  variant?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <SectionLabel variant={variant} className={className}>
      Case Study
    </SectionLabel>
  );
}

/**
 * PublicationDateLabel
 * 
 * Metadata label for articles and blog posts.
 * 
 * USAGE:
 * <PublicationDateLabel date="January 15, 2024" />
 */
export function PublicationDateLabel({
  date,
  variant = 'light',
  className = '',
}: {
  date: string;
  variant?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <div className={`publication-date-label ${className}`}>
      <SectionLabel variant={variant} as="p">
        Published
      </SectionLabel>
      <time
        style={{
          display: 'block',
          fontSize: 'var(--text-sm)',
          color: variant === 'light' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
          fontWeight: 500,
        }}
      >
        {date}
      </time>
    </div>
  );
}

/**
 * CategoryLabel
 * 
 * Content categorization label (e.g., "Strategy", "Research", "Analysis").
 * 
 * USAGE:
 * <CategoryLabel>Strategy</CategoryLabel>
 */
export function CategoryLabel({
  children,
  variant = 'light',
  className = '',
}: {
  children: ReactNode;
  variant?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <div
      className={`category-label ${className}`}
      style={{
        display: 'inline-block',
        padding: '6px 12px',
        borderRadius: '5px',
        backgroundColor: variant === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.1)',
        border: `1px solid ${variant === 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.2)'}`,
      }}
    >
      <span
        style={{
          fontSize: TYPOGRAPHY.fontSize,
          fontWeight: 500,
          textTransform: TYPOGRAPHY.textTransform,
          letterSpacing: TYPOGRAPHY.letterSpacing,
          color: variant === 'light' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.8)',
        }}
      >
        {children}
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT DESIGN TOKENS (For Design System Documentation)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Export tokens for Figma, Storybook, or design system docs
 */
export const SECTION_LABEL_TOKENS = {
  colors: COLOR_TOKENS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// USAGE DOCUMENTATION (EXAMPLES FOR DESIGN SYSTEM)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * COMPLETE SECTION PATTERN
 * 
 * This is the recommended pattern for case study sections:
 * 
 * <section className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8">
 *   <SectionLabelWithHeading
 *     label="Challenges"
 *     heading="Key Engagement Obstacles"
 *     headingLevel="h2"
 *     description="Identifying critical risks in the transformer bushing market"
 *   />
 *   
 *   <div className="mt-8">
 *     {/* Section content here *\/}
 *   </div>
 * </section>
 * 
 * ───────────────────────────────────────────────────────────────────────────
 * MANUAL APPROACH (More Control)
 * ───────────────────────────────────────────────────────────────────────────
 * 
 * <section className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8">
 *   <div>
 *     <SectionLabel>Engagement Objectives</SectionLabel>
 *     
 *     <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 500 }}>
 *       Strategic Consulting Goals
 *     </h2>
 *     
 *     <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(0,0,0,0.7)' }}>
 *       Actionable insights for IPO readiness and market positioning
 *     </p>
 *   </div>
 * </section>
 * 
 * ───────────────────────────────────────────────────────────────────────────
 * RESPONSIVE BEHAVIOR
 * ───────────────────────────────────────────────────────────────────────────
 * 
 * Labels automatically adapt to screen size via CSS custom properties:
 * 
 * • Mobile (<768px):
 *   - Font size: 10px
 *   - Letter spacing: 1.6px
 *   - Margin bottom: 10px
 * 
 * • Desktop (≥768px):
 *   - Font size: 11px
 *   - Letter spacing: 1.8px
 *   - Margin bottom: 12px
 * 
 * No media queries needed - design tokens handle responsiveness.
 */