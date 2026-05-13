/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚠️ DEPRECATED - INFO CARD LABEL COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * @deprecated This component is deprecated. Use the unified Badge system instead.
 * 
 * Migration:
 * ```tsx
 * // OLD (deprecated)
 * import { InfoCardLabel } from '@/app/components/badges';
 * <InfoCardLabel variant="neutral-light">Client</InfoCardLabel>
 * 
 * // NEW (recommended)
 * import { InfoCardLabel } from '@/app/components/Badge';
 * <InfoCardLabel>Client</InfoCardLabel>
 * ```
 * 
 * The new Badge system provides:
 * ✅ Simplified API (no complex variant system)
 * ✅ Consistent with other badge components
 * ✅ Better theme support (light/dark mode)
 * ✅ Design token based
 * 
 * Documentation: /src/app/components/BADGE_SYSTEM.md
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * ORIGINAL DOCUMENTATION (For reference only)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Compact label component for metadata cards (hero info cards, stat cards,
 * feature cards). Uses ultra-small typography with high letter-spacing for
 * maximum information density while maintaining readability.
 * 
 * Used in frosted glass cards overlaid on images and solid background cards
 * in mobile layouts.
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
 * • Information Hierarchy: Distinguishes metadata labels from primary values
 * • Space Efficiency: Maximizes content density in compact card layouts
 * • Visual Consistency: Standardizes label treatment across card components
 * • Readability: Ultra-high letter-spacing compensates for tiny font size
 * 
 * DESIGN PHILOSOPHY:
 * • Micro Typography: Intentionally small (9-10px) to not compete with values
 * • High Contrast Spacing: 1.2px letter-spacing (12-13% of font size)
 * • Uppercase Treatment: Ensures legibility at small sizes
 * • Opacity Control: 70% opacity creates subtle hierarchy without blur
 * 
 * USE CASE HIERARCHY:
 * 
 * INFO CARD LABEL (9-10px, uppercase, 70% opacity) ← "CLIENT"
 * ↓
 * Card Value (12-14px, medium weight, 100% opacity) ← "Yash Highvoltage"
 * 
 * CONTRAST WITH OTHER LABELS:
 * • SectionLabel (11px): Page-level sections, higher hierarchy
 * • ObjectivePill (11px): Sequential indicators, bordered badges
 * • InfoCardLabel (9-10px): Metadata within cards, lowest hierarchy
 * 
 * ───────────────────────────────────────────────────────────────────────────
 * 🏗️ WHAT (COMPONENT ANATOMY)
 * ───────────────────────────────────────────────────────────────────────────
 * 
 * STRUCTURE (Within Card Context):
 * 
 * ┌──────────────────────────────────┐
 * │  CLIENT                          │ ← InfoCardLabel (9px, uppercase)
 * │  6-8px vertical spacing          │
 * │  Yash Highvoltage Insulators     │ ← Value text (12-14px, medium)
 * └──────────────────────────────────┘
 * 
 * KEY PROPERTIES:
 * 
 * Typography:
 * • Font Size: clamp(9px, 0.8vw, 10px) - responsive scaling
 * • Font Weight: 500 (Medium) - slightly heavier for legibility
 * • Text Transform: Uppercase
 * • Letter Spacing: 1.2px (12% of font size)
 * • Line Height: 1 (tight, single-line labels)
 * 
 * Color (Context-Dependent):
 * • Light Cards: rgba(0,0,0,0.7) - 70% black
 * • Dark Cards: rgba(255,255,255,0.7) - 70% white
 * • Frosted Glass: Inherits from parent card theme
 * 
 * Spacing:
 * • Margin Bottom: clamp(6px, 0.6vw, 8px) - pairs with value
 * • Padding: None (text only, no container)
 * 
 * RESPONSIVE BEHAVIOR:
 * • Mobile (<768px): 9px font, 6px margin
 * • Desktop (≥768px): 10px font, 8px margin
 * • Uses clamp() for fluid scaling
 * 
 * ───────────────────────────────────────────────────────────────────────────
 * ⏰ WHEN (USAGE GUIDELINES)
 * ───────────────────────────────────────────────────────────────────────────
 * 
 * ✅ USE WHEN:
 * 
 * 1. Hero Info Cards:
 *    CLIENT
 *    Yash Highvoltage Insulators
 *    
 *    ENGAGEMENT OWNER
 *    Director – Strategy
 * 
 * 2. Stat Cards:
 *    TOTAL ADDRESSABLE MARKET
 *    ₹110 Cr
 *    
 *    MARKET SHARE TARGET
 *    15%
 * 
 * 3. Feature Cards:
 *    CAPABILITY
 *    Vertical Integration
 *    
 *    CERTIFICATION
 *    ISO 9001:2015
 * 
 * 4. Metadata Displays:
 *    LOCATION
 *    Mumbai, India
 *    
 *    INDUSTRY
 *    Power Transmission
 * 
 * ❌ AVOID WHEN:
 * 
 * 1. Page-Level Sections: Use SectionLabel instead (11px, more prominent)
 * 2. Sequential Items: Use ObjectivePill for numbered lists
 * 3. Interactive Elements: Don't use for buttons or clickable labels
 * 4. Long Text: Designed for 1-3 word labels only
 * 5. Body Content: Never within paragraphs
 * 
 * TEXT GUIDELINES:
 * • Keep ultra-short: 1-2 words ideal, 3 words maximum
 * • Descriptive: "Client" not "Name", "Geography" not "Place"
 * • Consistent casing: Always uppercase (enforced by CSS)
 * • Avoid punctuation: No colons or periods
 * 
 * ───────────────────────────────────────────────────────────────────────────
 * 📍 WHERE (PLACEMENT & CONTEXT)
 * ───────────────────────────────────────────────────────────────────────────
 * 
 * CARD LAYOUT PATTERN:
 * 
 * ┌──────────────────────────────────────┐
 * │ Card Container (padding: 12-16px)    │
 * │  ┌────────────────────────────────┐  │
 * │  │ INFO CARD LABEL                │  │ ← Always top of card
 * │  │ 6-8px gap                      │  │
 * │  │ Value Text                     │  │ ← Primary content
 * │  └────────────────────────────────┘  │
 * └──────────────────────────────────────┘
 * 
 * SPACING WITHIN CARDS:
 * 
 * Desktop Info Cards (Frosted Glass):
 * • Card Padding: clamp(12px, 1.2vw, 16px)
 * • Label Margin Bottom: clamp(6px, 0.6vw, 8px)
 * • Card Gap: 12-16px between cards
 * 
 * Mobile Info Cards (Solid):
 * • Card Padding: clamp(12px, 3vw, 16px)
 * • Label Margin Bottom: clamp(6px, 1.5vw, 8px)
 * • Card Gap: 12-16px between cards
 * 
 * ALIGNMENT:
 * • Always left-aligned within card
 * • Never centered (breaks information hierarchy)
 * • No indentation from card edge
 * 
 * GRID USAGE:
 * 
 * Hero Section (Desktop):
 * grid-cols-4 gap-3 lg:gap-4
 * [CLIENT] [ENGAGEMENT] [GEOGRAPHY] [INDUSTRY]
 * 
 * Hero Section (Mobile):
 * grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4
 * [CLIENT]      [ENGAGEMENT]
 * [GEOGRAPHY]   [INDUSTRY]
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
 * InfoCardLabel Component Props
 */
export interface InfoCardLabelProps {
  /** Label text (1-3 words recommended) */
  children: ReactNode;
  
  /** Color variant based on card background */
  variant?: 'light' | 'dark';
  
  /** Device context (affects sizing) */
  context?: 'mobile' | 'desktop';
  
  /** Custom color override */
  color?: string;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Custom inline styles */
  style?: CSSProperties;
}

/**
 * InfoCard Component Props
 * Complete card with label + value pair
 */
export interface InfoCardProps {
  /** Label text (e.g., "CLIENT") */
  label: string;
  
  /** Value text (e.g., "Yash Highvoltage Insulators") */
  value: ReactNode;
  
  /** Visual theme variant */
  variant?: 'light' | 'dark';
  
  /** Card style type */
  cardType?: 'solid' | 'frosted-glass';
  
  /** Device context */
  context?: 'mobile' | 'desktop';
  
  /** Additional CSS classes for card container */
  className?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * TYPOGRAPHY TOKENS
 * 
 * Ultra-small sizing with responsive scaling for different contexts
 */
const TYPOGRAPHY = {
  // Desktop context (used in hero frosted glass cards)
  desktop: {
    fontSize: 'clamp(9px, 0.8vw, 10px)',
    marginBottom: 'clamp(6px, 0.6vw, 8px)',
  },
  // Mobile context (used in mobile solid cards)
  mobile: {
    fontSize: 'clamp(9px, 2vw, 10px)',
    marginBottom: 'clamp(6px, 1.5vw, 8px)',
  },
  // Shared properties
  shared: {
    fontWeight: 500,
    textTransform: 'uppercase' as const,
    letterSpacing: '1.2px',
    lineHeight: 1,
  },
} as const;

/**
 * COLOR TOKENS
 * 
 * 70% opacity provides subtle hierarchy without washing out
 */
const COLORS = {
  light: 'rgba(0, 0, 0, 0.7)',     // 70% black - for light backgrounds
  dark: 'rgba(255, 255, 255, 0.7)', // 70% white - for dark backgrounds
} as const;

/**
 * CARD TOKENS (For InfoCard component)
 */
const CARD_STYLES = {
  solid: {
    light: {
      background: 'rgba(255, 255, 255, 1)',      // Solid white
      border: 'rgba(0, 0, 0, 0.12)',             // 12% black border
      labelColor: 'rgba(0, 0, 0, 0.7)',          // 70% black label
      valueColor: 'rgba(0, 0, 0, 1)',            // 100% black value
    },
    dark: {
      background: 'rgba(26, 26, 26, 1)',         // Solid dark gray
      border: 'rgba(255, 255, 255, 0.15)',       // 15% white border
      labelColor: 'rgba(255, 255, 255, 0.7)',    // 70% white label
      valueColor: 'rgba(255, 255, 255, 1)',      // 100% white value
    },
  },
  frostedGlass: {
    light: {
      background: 'rgba(255, 255, 255, 0.9)',    // 90% white + blur
      border: 'rgba(0, 0, 0, 0.12)',             // 12% black border
      labelColor: 'rgba(0, 0, 0, 0.7)',          // 70% black label
      valueColor: 'rgba(0, 0, 0, 1)',            // 100% black value
      backdropBlur: '50px',                      // Heavy blur effect
    },
    dark: {
      background: 'rgba(26, 26, 26, 0.9)',       // 90% dark + blur
      border: 'rgba(255, 255, 255, 0.15)',       // 15% white border
      labelColor: 'rgba(255, 255, 255, 0.7)',    // 70% white label
      valueColor: 'rgba(255, 255, 255, 1)',      // 100% white value
      backdropBlur: '50px',                      // Heavy blur effect
    },
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * InfoCardLabel Component
 * 
 * USAGE EXAMPLES:
 * 
 * Basic:
 * <InfoCardLabel>Client</InfoCardLabel>
 * 
 * Dark Theme:
 * <InfoCardLabel variant="dark">Engagement Owner</InfoCardLabel>
 * 
 * Desktop Context:
 * <InfoCardLabel context="desktop">Geography</InfoCardLabel>
 * 
 * Custom Color:
 * <InfoCardLabel color="var(--brand-red)">Featured</InfoCardLabel>
 */
export function InfoCardLabel({
  children,
  variant = 'light',
  context = 'desktop',
  color,
  className = '',
  style = {},
}: InfoCardLabelProps) {
  const typography = context === 'desktop' ? TYPOGRAPHY.desktop : TYPOGRAPHY.mobile;
  const baseColor = color || COLORS[variant];
  
  const labelStyles: CSSProperties = {
    fontSize: typography.fontSize,
    fontWeight: TYPOGRAPHY.shared.fontWeight,
    textTransform: TYPOGRAPHY.shared.textTransform,
    letterSpacing: TYPOGRAPHY.shared.letterSpacing,
    lineHeight: TYPOGRAPHY.shared.lineHeight,
    color: baseColor,
    marginBottom: typography.marginBottom,
    display: 'block',
    ...style,
  };
  
  return (
    <p
      className={`info-card-label ${className}`}
      style={labelStyles}
    >
      {children}
    </p>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPLETE INFO CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * InfoCard Component
 * 
 * Pre-built card with label + value pair, handles all styling.
 * 
 * USAGE:
 * <InfoCard
 *   label="Client"
 *   value="Yash Highvoltage Insulators"
 *   variant="light"
 *   cardType="frosted-glass"
 *   context="desktop"
 * />
 */
export function InfoCard({
  label,
  value,
  variant = 'light',
  cardType = 'solid',
  context = 'desktop',
  className = '',
}: InfoCardProps) {
  const theme = CARD_STYLES[cardType][variant];
  const isFrostedGlass = cardType === 'frosted-glass';
  
  // Responsive padding based on context
  const padding = context === 'desktop' 
    ? 'clamp(12px, 1.2vw, 16px)' 
    : 'clamp(12px, 3vw, 16px)';
  
  // Value font size based on context
  const valueFontSize = context === 'desktop'
    ? 'clamp(12px, 1.1vw, 14px)'
    : 'clamp(13px, 3.5vw, 15px)';
  
  return (
    <div
      className={`info-card ${className}`}
      style={{
        position: 'relative',
        borderRadius: '5px',
        padding: padding,
        border: `1px solid ${theme.border}`,
        overflow: isFrostedGlass ? 'hidden' : 'visible',
        backgroundColor: isFrostedGlass ? 'transparent' : theme.background,
        boxShadow: isFrostedGlass 
          ? '0 10px 30px rgba(0, 0, 0, 0.15)' 
          : '0 1px 3px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Frosted Glass Backdrop Layer */}
      {isFrostedGlass && 'backdropBlur' in theme && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backdropFilter: `blur(${theme.backdropBlur})`,
            WebkitBackdropFilter: `blur(${theme.backdropBlur})`,
            background: theme.background,
            zIndex: 0,
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Content Layer */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Label */}
        <InfoCardLabel
          variant={variant}
          context={context}
          color={theme.labelColor}
          style={{ marginBottom: context === 'desktop' ? 'clamp(6px, 0.6vw, 8px)' : 'clamp(6px, 1.5vw, 8px)' }}
        >
          {label}
        </InfoCardLabel>
        
        {/* Value */}
        <p
          className="info-card-value"
          style={{
            fontSize: valueFontSize,
            fontWeight: 600,
            lineHeight: context === 'desktop' ? 1.25 : 1.3,
            color: theme.valueColor,
            letterSpacing: '-0.01em',
            margin: 0,
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SPECIALIZED VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * HeroInfoCardGrid
 * 
 * Pre-configured grid layout for hero section info cards.
 * Handles responsive behavior automatically.
 * 
 * USAGE:
 * <HeroInfoCardGrid variant="light">
 *   <InfoCard label="Client" value="Yash Highvoltage" />
 *   <InfoCard label="Geography" value="India" />
 *   <InfoCard label="Industry" value="Power Transmission" />
 * </HeroInfoCardGrid>
 */
export function HeroInfoCardGrid({
  children,
  variant = 'light',
  context = 'desktop',
  className = '',
}: {
  children: ReactNode;
  variant?: 'light' | 'dark';
  context?: 'mobile' | 'desktop';
  className?: string;
}) {
  const gridClass = context === 'desktop'
    ? 'hidden md:grid grid-cols-4 gap-3 lg:gap-4'
    : 'grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:hidden';
  
  return (
    <div className={`hero-info-card-grid ${gridClass} ${className}`}>
      {children}
    </div>
  );
}

/**
 * StatCard
 * 
 * Specialized info card for statistics/metrics.
 * Emphasizes the value with larger typography.
 * 
 * USAGE:
 * <StatCard
 *   label="Total Addressable Market"
 *   value="₹110 Cr"
 *   variant="light"
 * />
 */
export function StatCard({
  label,
  value,
  description,
  variant = 'light',
  className = '',
}: {
  label: string;
  value: string | number;
  description?: string;
  variant?: 'light' | 'dark';
  className?: string;
}) {
  const theme = CARD_STYLES.solid[variant];
  
  return (
    <div
      className={`stat-card ${className}`}
      style={{
        padding: 'clamp(20px, 4vw, 32px)',
        borderRadius: '10px',
        backgroundColor: theme.background,
        border: `1px solid ${theme.border}`,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Label */}
      <InfoCardLabel variant={variant} context="desktop">
        {label}
      </InfoCardLabel>
      
      {/* Value */}
      <p
        style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 600,
          color: theme.valueColor,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          marginBottom: description ? '12px' : 0,
        }}
      >
        {value}
      </p>
      
      {/* Optional Description */}
      {description && (
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: variant === 'light' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Export tokens for design system documentation
 */
export const INFO_CARD_LABEL_TOKENS = {
  typography: TYPOGRAPHY,
  colors: COLORS,
  cardStyles: CARD_STYLES,
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// USAGE DOCUMENTATION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * HERO SECTION PATTERN (Desktop - Frosted Glass)
 * 
 * <div className="relative">
 *   <img src={heroImage} alt="..." />
 *   
 *   <div className="absolute bottom-6 left-6 right-6 grid grid-cols-4 gap-4">
 *     <InfoCard
 *       label="Client"
 *       value="Yash Highvoltage Insulators"
 *       variant="light"
 *       cardType="frosted-glass"
 *       context="desktop"
 *     />
 *     <InfoCard
 *       label="Engagement Owner"
 *       value="Director – Strategy"
 *       variant="light"
 *       cardType="frosted-glass"
 *       context="desktop"
 *     />
 *     // ... more cards
 *   </div>
 * </div>
 * 
 * ───────────────────────────────────────────────────────────────────────────
 * HERO SECTION PATTERN (Mobile - Solid)
 * ───────────────────────────────────────────────────────────────────────────
 * 
 * <div className="md:hidden mb-6">
 *   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 *     <InfoCard
 *       label="Client"
 *       value="Yash Highvoltage Insulators"
 *       variant="light"
 *       cardType="solid"
 *       context="mobile"
 *     />
 *     // ... more cards
 *   </div>
 * </div>
 * 
 * <img src={heroImage} alt="..." className="rounded-[2.5px]" />
 * 
 * ───────────────────────────────────────────────────────────────────────────
 * METRICS SECTION PATTERN
 * ───────────────────────────────────────────────────────────────────────────
 * 
 * <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
 *   <StatCard
 *     label="Total Addressable Market"
 *     value="₹110 Cr"
 *     description="Transformer bushing market size in India"
 *     variant="light"
 *   />
 *   // ... more stat cards
 * </div>
 */