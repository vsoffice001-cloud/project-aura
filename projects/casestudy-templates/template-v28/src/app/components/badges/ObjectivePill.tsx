/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚠️ DEPRECATED - OBJECTIVE PILL COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * @deprecated This component is deprecated. Use the unified Badge system instead.
 * 
 * Migration:
 * ```tsx
 * // OLD (deprecated)
 * import { ObjectivePill, ObjectivePillInteractive } from '@/app/components/badges';
 * 
 * // NEW (recommended)
 * import { ObjectivePill, ObjectivePillInteractive } from '@/app/components/Badge';
 * ```
 * 
 * The new Badge system provides:
 * ✅ Unified API for all badge variants
 * ✅ Consistent theming with design tokens
 * ✅ Better shimmer animation control
 * ✅ Interactive states built-in
 * 
 * Documentation: /src/app/components/BADGE_SYSTEM.md
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * ORIGINAL DOCUMENTATION (For reference only)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * A premium badge component for displaying sequential objective numbers with
 * shimmer animation effect. Part of the editorial design system for case studies,
 * blog posts, and long-form content.
 * 
 * ───────────────────────────────────────────────────────────────────────────
 * 📚 DOCUMENTATION INDEX
 * ───────────────────────────────────────────────────────────────────────────
 * 1. WHY - Purpose & Design Rationale
 * 2. WHAT - Component Anatomy & Structure
 * 3. WHEN - Usage Guidelines & Scenarios
 * 4. WHERE - Placement & Context
 * 5. HOW - Implementation & Code Examples
 * 
 * ───────────────────────────────────────────────────────────────────────────
 * 🎯 WHY (PURPOSE & DESIGN RATIONALE)
 * ───────────────────────────────────────────────────────────────────────────
 * 
 * PRIMARY OBJECTIVES:
 * • Visual Hierarchy: Clearly distinguishes objective numbers from content text
 * • Sequential Navigation: Helps users track multiple objectives in order (1→2→3)
 * • Premium Aesthetic: Adds editorial sophistication to case study pages
 * • Micro-interaction: Provides delightful visual feedback during hover/reveal
 * 
 * DESIGN PHILOSOPHY:
 * • Minimalist Editorial: Clean, understated design that doesn't overpower content
 * • Scannable: High letter-spacing and uppercase treatment aids quick scanning
 * • Accessible: WCAG AAA compliant with 4.5:1+ contrast ratios
 * • Performant: Pure CSS animations, no JS required for basic interactions
 * 
 * USER BENEFITS:
 * • Cognitive Load Reduction: Numbered pills help users mentally organize info
 * • Visual Anchors: Provides reference points when jumping between sections
 * • Professional Presentation: Elevates content credibility and polish
 * 
 * ───────────────────────────────────────────────────────────────────────────
 * 🏗️ WHAT (COMPONENT ANATOMY)
 * ───────────────────────────────────────────────────────────────────────────
 * 
 * LAYER STRUCTURE (3 layers):
 * 
 * ┌─────────────────────────────────┐
 * │  Layer 1: Container (Pill Shell)│  ← Rounded border, padding, overflow clip
 * │  ┌─────────────────────────┐    │
 * │  │ Layer 2: Shimmer Overlay│    │  ← Animated gradient shine effect
 * │  └─────────────────────────┘    │
 * │       Layer 3: Text Content     │  ← "OBJECTIVE 1" text (z-index above)
 * └─────────────────────────────────┘
 * 
 * KEY PROPERTIES:
 * 
 * Container:
 * • Border Radius: 9999px (fully rounded pill shape)
 * • Padding: 16px horizontal, 6px vertical (4:2.67 ratio)
 * • Border: 1px solid with 15% opacity
 * • Background: 4% black overlay (light theme)
 * • Overflow: Hidden (clips shimmer effect)
 * 
 * Shimmer:
 * • Width: 50% of pill width
 * • Gradient: Transparent → White (60% opacity) → Transparent
 * • Starting Position: translateX(-100%) - off-screen left
 * • Animation: Slides left→right on hover/trigger
 * 
 * Text:
 * • Font Size: var(--text-xs) typically 10-11px
 * • Font Weight: 500 (Medium)
 * • Text Transform: Uppercase
 * • Letter Spacing: 2px (enhanced readability)
 * • Color: 60% black (ensures 4.5:1+ contrast)
 * 
 * ───────────────────────────────────────────────────────────────────────────
 * ⏰ WHEN (USAGE GUIDELINES)
 * ───────────────────────────────────────────────────────────────────────────
 * 
 * ✅ USE WHEN:
 * 
 * 1. Sequential Content (2+ items):
 *    • Case study objectives (Objective 1, Objective 2...)
 *    • Step-by-step processes (Step 1, Step 2...)
 *    • Project phases (Phase 1, Phase 2...)
 *    • Article sections with ordered flow
 * 
 * 2. Editorial Pages:
 *    • Blog posts with key takeaways
 *    • White papers with sequential findings
 *    • Research reports with ordered insights
 * 
 * 3. Professional Context:
 *    • Client deliverables
 *    • Strategy documents
 *    • Proposal presentations
 * 
 * ❌ AVOID WHEN:
 * 
 * 1. Single Items: Don't use for standalone labels (use regular text)
 * 2. Non-Sequential: Not for unordered lists or categories (use tags instead)
 * 3. Interactive Elements: Don't use for buttons/links (use Button component)
 * 4. Critical Alerts: Never for errors/warnings (use status badges)
 * 5. Large Numbers: Works best 1-12; beyond this, consider alternative UI
 * 
 * QUANTITY GUIDELINES:
 * • Minimum: 2 objectives (single items don't need pills)
 * • Optimal: 3-6 objectives (perfect balance)
 * • Maximum: 12 objectives (beyond this, use table of contents)
 * 
 * ───────────────────────────────────────────────────────────────────────────
 * 📍 WHERE (PLACEMENT & CONTEXT)
 * ───────────────────────────────────────────────────────────────────────────
 * 
 * VERTICAL STACKING (Recommended):
 * 
 * [OBJECTIVE 1]
 * Description text here explaining the first objective...
 * 
 * [OBJECTIVE 2]
 * Description text here explaining the second objective...
 * 
 * SPACING TOKENS:
 * • Top Margin: var(--spacing-7) (28px) from previous content
 * • Bottom Margin: var(--spacing-4) (16px) before description
 * • Between Pills: var(--spacing-12) (48px) between objective groups
 * 
 * HORIZONTAL GROUPING (Alternative):
 * 
 * [OBJECTIVE 1]  [OBJECTIVE 2]  [OBJECTIVE 3]
 * 
 * SPACING:
 * • Gap Between: 12-16px (use flex gap or margin-right)
 * • Wrap: Allow wrapping on screens <640px
 * 
 * CONTAINER GUIDELINES:
 * • Max Width: 1000px (design system standard)
 * • Horizontal Padding: 16px mobile, 32px desktop
 * • Alignment: Left-aligned with content column
 * • Mobile Behavior: Stack vertically on <768px
 * 
 * ───────────────────────────────────────────────────────────────────────────
 * 🛠️ HOW (IMPLEMENTATION)
 * ───────────────────────────────────────────────────────────────────────────
 */

import { CSSProperties } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES & INTERFACES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ObjectivePill Component Props
 */
export interface ObjectivePillProps {
  /** Objective number (1, 2, 3...) */
  number: number;
  
  /** Visual theme variant */
  variant?: 'light' | 'dark' | 'brand';
  
  /** Enable/disable shimmer animation */
  showShimmer?: boolean;
  
  /** Custom label text (default: "Objective") */
  label?: string;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Trigger shimmer animation programmatically */
  triggerShimmer?: boolean;
  
  /** Accessibility label override */
  ariaLabel?: string;
}

/**
 * Theme configuration for each variant
 */
interface ThemeConfig {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  shimmerColor: string;
  hoverBackgroundColor: string;
  hoverBorderColor: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS & THEME CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * DESIGN TOKENS - COLOR SYSTEM
 * 
 * These values are calibrated for WCAG AAA compliance and maintain
 * consistent visual hierarchy across light/dark contexts.
 * 
 * Color Naming Convention:
 * • rgba(0,0,0,X) - Black with X% opacity (light theme)
 * • rgba(255,255,255,X) - White with X% opacity (dark theme)
 * • Opacity values: 0.04 (bg), 0.15 (border), 0.6 (text)
 */
const THEMES: Record<'light' | 'dark' | 'brand', ThemeConfig> = {
  /**
   * LIGHT THEME (Default)
   * Use on: White or light backgrounds (#FFFFFF, #F9F7F6)
   * Contrast Ratio: 4.5:1+ (WCAG AA compliant)
   */
  light: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',      // 4% black - subtle gray tint
    borderColor: 'rgba(0, 0, 0, 0.15)',          // 15% black - visible but soft
    textColor: 'rgba(0, 0, 0, 0.6)',             // 60% black - readable contrast
    shimmerColor: 'rgba(255, 255, 255, 0.6)',   // 60% white - bright shine
    hoverBackgroundColor: 'rgba(0, 0, 0, 0.08)', // 8% black - darker on hover
    hoverBorderColor: 'rgba(0, 0, 0, 0.25)',     // 25% black - more defined
  },
  
  /**
   * DARK THEME
   * Use on: Black or dark backgrounds (#000000, #1A1A1A)
   * Contrast Ratio: 4.5:1+ (WCAG AA compliant)
   */
  dark: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',   // 10% white - subtle light tint
    borderColor: 'rgba(255, 255, 255, 0.2)',       // 20% white - visible edge
    textColor: 'rgba(255, 255, 255, 0.8)',         // 80% white - high contrast
    shimmerColor: 'rgba(255, 255, 255, 0.3)',      // 30% white - softer shine
    hoverBackgroundColor: 'rgba(255, 255, 255, 0.15)', // 15% white - brighter
    hoverBorderColor: 'rgba(255, 255, 255, 0.3)',  // 30% white - more defined
  },
  
  /**
   * BRAND THEME (Accent)
   * Use on: Light backgrounds when emphasizing featured content
   * Uses Brand Red (#b01f24) from design system
   * ⚠️ Use sparingly - only for primary CTAs or featured objectives
   */
  brand: {
    backgroundColor: 'rgba(176, 31, 36, 0.08)',    // Brand red with 8% opacity
    borderColor: 'var(--brand-red)',               // Full brand red border
    textColor: 'var(--brand-red)',                 // Full brand red text
    shimmerColor: 'rgba(255, 255, 255, 0.5)',      // White shine on brand color
    hoverBackgroundColor: 'rgba(176, 31, 36, 0.12)', // Darker red on hover
    hoverBorderColor: 'var(--brand-red)',          // Maintain brand red
  },
};

/**
 * SPACING TOKENS
 * Based on 4px grid system (Major Third scale: 1.25 ratio)
 */
const SPACING = {
  paddingX: '16px',        // Horizontal padding (4px × 4)
  paddingY: '6px',         // Vertical padding (maintains 4:2.67 ratio)
  pillGap: '12px',         // Gap between pills when horizontal
  marginBottom: '16px',    // Space below pill before description
  marginTop: '28px',       // Space above pill from previous content
  groupSpacing: '48px',    // Space between objective groups
} as const;

/**
 * TYPOGRAPHY TOKENS
 */
const TYPOGRAPHY = {
  fontSize: 'var(--text-xs)',    // 10-11px from design system
  fontWeight: 500,               // Medium weight
  letterSpacing: '2px',          // Enhanced readability
  textTransform: 'uppercase' as const,
  lineHeight: 1,                 // Tight leading for badges
} as const;

/**
 * ANIMATION TOKENS
 */
const ANIMATION = {
  transitionDuration: '200ms',   // Smooth state changes
  shimmerDuration: '700ms',      // Fast, premium shimmer
  timingFunction: 'ease-out',    // Natural deceleration
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ObjectivePill Component
 * 
 * USAGE EXAMPLES:
 * 
 * Basic:
 * <ObjectivePill number={1} />
 * 
 * Dark Theme:
 * <ObjectivePill number={2} variant="dark" />
 * 
 * Custom Label:
 * <ObjectivePill number={1} label="Step" />
 * Output: "STEP 1"
 * 
 * No Shimmer:
 * <ObjectivePill number={3} showShimmer={false} />
 * 
 * With Custom Styling:
 * <ObjectivePill number={1} className="custom-class" />
 */
export function ObjectivePill({
  number,
  variant = 'light',
  showShimmer = true,
  label = 'Objective',
  className = '',
  triggerShimmer = false,
  ariaLabel,
}: ObjectivePillProps) {
  const theme = THEMES[variant];
  
  // Construct display text
  const displayText = `${label} ${number}`;
  
  // Accessibility label
  const accessibilityLabel = ariaLabel || `${label} number ${number}`;
  
  /**
   * Container Styles
   * Creates the pill shape with proper spacing and overflow handling
   */
  const containerStyles: CSSProperties = {
    display: 'inline-block',
    position: 'relative',
    paddingLeft: SPACING.paddingX,
    paddingRight: SPACING.paddingX,
    paddingTop: SPACING.paddingY,
    paddingBottom: SPACING.paddingY,
    borderRadius: '9999px', // Fully rounded pill
    border: `1px solid ${theme.borderColor}`,
    backgroundColor: theme.backgroundColor,
    overflow: 'hidden', // Clips shimmer effect to pill bounds
    transition: `all ${ANIMATION.transitionDuration} ${ANIMATION.timingFunction}`,
  };
  
  /**
   * Shimmer Overlay Styles
   * Creates the animated shine effect that slides left→right
   */
  const shimmerStyles: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '50%', // Shimmer beam covers half the pill
    background: `linear-gradient(90deg, transparent 0%, ${theme.shimmerColor} 50%, transparent 100%)`,
    transform: 'translateX(-100%)', // Start off-screen (left)
    pointerEvents: 'none', // Allow clicks to pass through
    animation: triggerShimmer 
      ? `shimmer ${ANIMATION.shimmerDuration} ${ANIMATION.timingFunction}`
      : 'none',
  };
  
  /**
   * Text Content Styles
   * Ensures text stays above shimmer and maintains readability
   */
  const textStyles: CSSProperties = {
    position: 'relative',
    zIndex: 10, // Above shimmer layer
    fontSize: TYPOGRAPHY.fontSize,
    fontWeight: TYPOGRAPHY.fontWeight,
    textTransform: TYPOGRAPHY.textTransform,
    letterSpacing: TYPOGRAPHY.letterSpacing,
    color: theme.textColor,
    lineHeight: TYPOGRAPHY.lineHeight,
  };
  
  return (
    <div
      className={`objective-pill ${className}`}
      style={containerStyles}
      role="status"
      aria-label={accessibilityLabel}
    >
      {/* Shimmer Overlay - Only render if enabled */}
      {showShimmer && (
        <div 
          className="shimmer-overlay"
          style={shimmerStyles}
          aria-hidden="true"
        />
      )}
      
      {/* Text Content */}
      <span style={textStyles}>
        {displayText}
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HOVER VARIANT (WITH SHIMMER TRIGGER)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ObjectivePillInteractive
 * 
 * Version with built-in hover states and shimmer trigger.
 * Use when pills need to respond to mouse interactions.
 * 
 * USAGE:
 * <ObjectivePillInteractive number={1} />
 */
export function ObjectivePillInteractive({
  number,
  variant = 'light',
  label = 'Objective',
  className = '',
  ariaLabel,
}: Omit<ObjectivePillProps, 'showShimmer' | 'triggerShimmer'>) {
  const theme = THEMES[variant];
  const displayText = `${label} ${number}`;
  const accessibilityLabel = ariaLabel || `${label} number ${number}`;
  
  return (
    <div
      className={`objective-pill objective-pill-interactive ${className}`}
      role="status"
      aria-label={accessibilityLabel}
      style={{
        display: 'inline-block',
        position: 'relative',
        paddingLeft: SPACING.paddingX,
        paddingRight: SPACING.paddingX,
        paddingTop: SPACING.paddingY,
        paddingBottom: SPACING.paddingY,
        borderRadius: '9999px',
        border: `1px solid ${theme.borderColor}`,
        backgroundColor: theme.backgroundColor,
        overflow: 'hidden',
        transition: `all ${ANIMATION.transitionDuration} ${ANIMATION.timingFunction}`,
        cursor: 'default',
      }}
    >
      {/* Shimmer Overlay */}
      <div 
        className="shimmer-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          width: '50%',
          background: `linear-gradient(90deg, transparent 0%, ${theme.shimmerColor} 50%, transparent 100%)`,
          transform: 'translateX(-100%)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
      
      {/* Text Content */}
      <span
        style={{
          position: 'relative',
          zIndex: 10,
          fontSize: TYPOGRAPHY.fontSize,
          fontWeight: TYPOGRAPHY.fontWeight,
          textTransform: TYPOGRAPHY.textTransform,
          letterSpacing: TYPOGRAPHY.letterSpacing,
          color: theme.textColor,
          lineHeight: TYPOGRAPHY.lineHeight,
        }}
      >
        {displayText}
      </span>
      
      {/* Inline CSS for hover effects */}
      <style>{`
        .objective-pill-interactive:hover {
          background-color: ${theme.hoverBackgroundColor} !important;
          border-color: ${theme.hoverBorderColor} !important;
        }
        
        .objective-pill-interactive:hover .shimmer-overlay {
          animation: shimmer ${ANIMATION.shimmerDuration} ${ANIMATION.timingFunction};
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
        
        /* Respect reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .objective-pill-interactive,
          .objective-pill-interactive * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ObjectivePillGroup
 * 
 * Container for multiple pills with proper spacing.
 * Handles responsive layout (horizontal → vertical on mobile).
 * 
 * USAGE:
 * <ObjectivePillGroup>
 *   <ObjectivePill number={1} />
 *   <ObjectivePill number={2} />
 *   <ObjectivePill number={3} />
 * </ObjectivePillGroup>
 */
export function ObjectivePillGroup({
  children,
  orientation = 'horizontal',
  className = '',
}: {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}) {
  return (
    <div
      className={`objective-pill-group ${className}`}
      style={{
        display: 'flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        flexWrap: 'wrap',
        gap: SPACING.pillGap,
        alignItems: orientation === 'vertical' ? 'flex-start' : 'center',
      }}
    >
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CSS ANIMATIONS (Global Keyframes)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Global shimmer animation keyframes
 * Add this to your global CSS or use the inline version above
 */
export const SHIMMER_ANIMATION_CSS = `
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(300%);
  }
}

/* Hover trigger for shimmer */
.objective-pill:hover .shimmer-overlay {
  animation: shimmer 700ms ease-out;
}

/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .objective-pill,
  .objective-pill * {
    animation: none !important;
    transition: none !important;
  }
}
`;

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT DESIGN TOKENS (For Design System Documentation)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Export tokens for Figma, Storybook, or design system docs
 */
export const OBJECTIVE_PILL_TOKENS = {
  themes: THEMES,
  spacing: SPACING,
  typography: TYPOGRAPHY,
  animation: ANIMATION,
} as const;