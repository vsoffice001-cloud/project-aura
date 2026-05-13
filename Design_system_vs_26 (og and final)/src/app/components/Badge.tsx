/**
 * ═════════════════════════════════════════════════════════════════════════
 * BADGE COMPONENT SYSTEM
 * ═════════════════════════════════════════════════════════════════════════
 * 
 * Unified badge system for the editorial design system.
 * 
 * ARCHITECTURE (CSS Custom Property Driven):
 * • Sizes & shapes: Defined in theme.css (--badge-xs/sm/md/lg-*, --badge-radius-*)
 * • Colors: THEME_COLORS JS object selects values per theme/mode props,
 *   then sets them as inline CSS custom properties (--badge-bg, --badge-text, etc.)
 * • CSS rules in theme.css consume all --badge-* properties for base + hover + shimmer
 * 
 * WHY THIS PATTERN:
 * CSS owns property application + transitions + hover states.
 * JS owns theme selection logic (11 themes × 2 modes = 22 combos).
 * No 22-selector CSS explosion. No inline style specificity fights.
 * 
 * ─────────────────────────────────────────────────────────────────────────
 * 🎯 QUICK REFERENCE
 * ─────────────────────────────────────────────────────────────────────────
 * 
 * Section Headers:
 * <Badge variant="minimal" size="sm" theme="neutral">Challenges</Badge>
 * 
 * Step Numbers:
 * <Badge variant="pill" size="sm" theme="warm" bordered shimmer>Step 1</Badge>
 * 
 * Objectives:
 * <Badge variant="pill" size="sm" theme="neutral" bordered interactive>
 *   Objective 1
 * </Badge>
 * 
 * Status Indicators:
 * <Badge variant="rounded" size="sm" theme="success" bordered>Completed</Badge>
 *
 * With Icon (ALWAYS horizontal — never stack icon above text):
 * <Badge variant="rounded" size="md" theme="warm" bordered icon={<Award size={14} />}>Expert Pick</Badge>
 *
 * ICON RULE: Icons in badges are ALWAYS laid out horizontally (inline-flex row)
 * to the left of the text. Never stacked vertically. Icon sizes auto-match
 * the badge size: xs=10px, sm=12px, md=14px, lg=16px.
 */

import { CSSProperties, ReactNode } from 'react';

// ═════════════════════════════════════════════════════════════════════════
// 1. TYPES & INTERFACES
// ═════════════════════════════════════════════════════════════════════════

export type BadgeVariant = 
  | 'minimal'   // No background, no border (section labels)
  | 'rounded'   // 5px radius, optional background (category tags)
  | 'pill';     // Fully rounded, usually bordered (step numbers, objectives)

export type BadgeSize = 
  | 'xs'  // 9-10px - info card labels
  | 'sm'  // 11px - section labels, pills
  | 'md'  // 13px - emphasized badges
  | 'lg'; // 15px - large interactive badges

export type BadgeTheme = 
  | 'neutral'     // Black/white based (default)
  | 'warm'        // Warm editorial colors
  | 'brand'       // Brand Red (#b01f24)
  | 'coral'       // Coral/Terracotta
  | 'purple'      // Purple - Premium, Innovation
  | 'periwinkle'  // Periwinkle - Trust, Reliability
  | 'success'     // Green for positive states
  | 'warning'     // Amber for caution
  | 'error'       // Red for negative states
  | 'info'        // Blue/Perano for informational
  | 'muted';      // Deliberately subdued

export type BadgeMode = 'light' | 'dark';

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  theme?: BadgeTheme;
  mode?: BadgeMode;
  bordered?: boolean;
  shimmer?: boolean;
  interactive?: boolean;
  uppercase?: boolean;
  letterSpacing?: string;
  /** Font weight: 400 (body), 500 (default pill/rounded), 600 (section labels) */
  fontWeight?: 400 | 500 | 600;
  /** Icon element rendered to the left of text. Always horizontal, never stacked. Size auto-matched to badge size. */
  icon?: ReactNode;
  as?: 'span' | 'div' | 'p';
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
  onClick?: () => void;
}

// ═════════════════════════════════════════════════════════════════════════
// 2. DESIGN TOKENS
// ═════════════════════════════════════════════════════════════════════════

/**
 * SIZE CSS VARIABLE MAP
 * References --badge-* tokens defined in theme.css
 */
const SIZE_CSS_VARS = {
  xs: {
    fontSize: 'var(--badge-xs-font)',
    padding: 'var(--badge-xs-py) var(--badge-xs-px)',
    letterSpacing: 'var(--badge-xs-tracking)',
    iconSize: 10,
  },
  sm: {
    fontSize: 'var(--badge-sm-font)',
    padding: 'var(--badge-sm-py) var(--badge-sm-px)',
    letterSpacing: 'var(--badge-sm-tracking)',
    iconSize: 12,
  },
  md: {
    fontSize: 'var(--badge-md-font)',
    padding: 'var(--badge-md-py) var(--badge-md-px)',
    letterSpacing: 'var(--badge-md-tracking)',
    iconSize: 14,
  },
  lg: {
    fontSize: 'var(--badge-lg-font)',
    padding: 'var(--badge-lg-py) var(--badge-lg-px)',
    letterSpacing: 'var(--badge-lg-tracking)',
    iconSize: 16,
  },
} as const;

/**
 * VARIANT CSS VARIABLE MAP
 * References --badge-radius-* tokens defined in theme.css
 */
const VARIANT_CSS_VARS = {
  minimal: {
    borderRadius: 'var(--badge-radius-minimal)',
    padding: '0px',
  },
  rounded: {
    borderRadius: 'var(--badge-radius-rounded)',
    padding: 'inherit',
  },
  pill: {
    borderRadius: 'var(--badge-radius-pill)',
    padding: 'inherit',
  },
} as const;

/**
 * THEME COLOR TOKENS
 * 
 * JS selects the correct color set based on theme + mode props.
 * Values are set as CSS custom properties on the badge element.
 * CSS rules in theme.css consume them for base + hover + shimmer.
 * 
 * All WCAG contrast ratios documented per theme.
 */
const THEME_COLORS = {
  neutral: {
    light: {
      background: 'rgba(0, 0, 0, 0.04)',
      border: 'rgba(0, 0, 0, 0.15)',
      text: 'rgba(0, 0, 0, 0.6)',
      textMinimal: 'rgba(0, 0, 0, 0.6)',
      hoverBackground: 'rgba(0, 0, 0, 0.08)',
      hoverBorder: 'rgba(0, 0, 0, 0.25)',
      shimmer: 'rgba(255, 255, 255, 0.75)',
    },
    dark: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.25)',
      text: 'rgba(255, 255, 255, 0.9)',
      textMinimal: 'rgba(255, 255, 255, 0.7)',
      hoverBackground: 'rgba(255, 255, 255, 0.15)',
      hoverBorder: 'rgba(255, 255, 255, 0.35)',
      shimmer: 'rgba(255, 255, 255, 0.4)',
    },
  },
  warm: {
    light: {
      background: 'var(--warm-50)',
      border: 'var(--warm-700)',
      text: 'var(--warm-900)',
      textMinimal: 'var(--warm-800)',
      hoverBackground: 'var(--warm-100)',
      hoverBorder: 'var(--warm-800)',
      shimmer: 'rgba(168, 150, 142, 0.12)',
    },
    dark: {
      background: 'var(--warm-900)',
      border: 'var(--warm-700)',
      text: 'var(--warm-50)',
      textMinimal: 'var(--warm-100)',
      hoverBackground: 'var(--warm-800)',
      hoverBorder: 'var(--warm-600)',
      shimmer: 'rgba(255, 255, 255, 0.3)',
    },
  },
  brand: {
    light: {
      background: 'rgba(176, 31, 36, 0.06)',
      border: 'var(--brand-red)',
      text: 'var(--brand-red)',
      textMinimal: 'var(--brand-red)',
      hoverBackground: 'rgba(176, 31, 36, 0.12)',
      hoverBorder: 'var(--brand-red)',
      shimmer: 'rgba(255, 255, 255, 0.5)',
    },
    dark: {
      background: 'rgba(176, 31, 36, 0.2)',
      border: 'rgba(176, 31, 36, 0.6)',
      text: 'rgba(255, 200, 200, 0.95)',
      textMinimal: 'rgba(255, 200, 200, 0.85)',
      hoverBackground: 'rgba(176, 31, 36, 0.3)',
      hoverBorder: 'rgba(176, 31, 36, 0.8)',
      shimmer: 'rgba(255, 220, 220, 0.4)',
    },
  },
  coral: {
    light: {
      background: 'rgba(234, 122, 95, 0.08)',
      border: 'rgba(234, 122, 95, 0.4)',
      text: 'var(--coral-900)',
      textMinimal: 'var(--coral-800)',
      hoverBackground: 'rgba(234, 122, 95, 0.12)',
      hoverBorder: 'rgba(234, 122, 95, 0.6)',
      shimmer: 'rgba(255, 255, 255, 0.6)',
    },
    dark: {
      background: 'rgba(234, 122, 95, 0.15)',
      border: 'rgba(234, 122, 95, 0.5)',
      text: 'rgba(255, 235, 228, 0.95)',
      textMinimal: 'rgba(255, 235, 228, 0.85)',
      hoverBackground: 'rgba(234, 122, 95, 0.22)',
      hoverBorder: 'rgba(234, 122, 95, 0.7)',
      shimmer: 'rgba(255, 245, 241, 0.4)',
    },
  },
  purple: {
    light: {
      background: 'rgba(128, 108, 224, 0.08)',
      border: 'rgba(128, 108, 224, 0.4)',
      text: 'var(--purple-900)',
      textMinimal: 'var(--purple-800)',
      hoverBackground: 'rgba(128, 108, 224, 0.12)',
      hoverBorder: 'rgba(128, 108, 224, 0.6)',
      shimmer: 'rgba(255, 255, 255, 0.6)',
    },
    dark: {
      background: 'rgba(128, 108, 224, 0.15)',
      border: 'rgba(128, 108, 224, 0.5)',
      text: 'rgba(239, 237, 253, 0.95)',
      textMinimal: 'rgba(239, 237, 253, 0.85)',
      hoverBackground: 'rgba(128, 108, 224, 0.22)',
      hoverBorder: 'rgba(128, 108, 224, 0.7)',
      shimmer: 'rgba(223, 220, 251, 0.4)',
    },
  },
  periwinkle: {
    light: {
      background: 'rgba(195, 198, 249, 0.12)',
      border: 'rgba(195, 198, 249, 0.5)',
      text: 'var(--periwinkle-900)',
      textMinimal: 'var(--periwinkle-800)',
      hoverBackground: 'rgba(195, 198, 249, 0.18)',
      hoverBorder: 'rgba(195, 198, 249, 0.7)',
      shimmer: 'rgba(255, 255, 255, 0.6)',
    },
    dark: {
      background: 'rgba(195, 198, 249, 0.15)',
      border: 'rgba(195, 198, 249, 0.5)',
      text: 'rgba(245, 246, 253, 0.95)',
      textMinimal: 'rgba(245, 246, 253, 0.85)',
      hoverBackground: 'rgba(195, 198, 249, 0.22)',
      hoverBorder: 'rgba(195, 198, 249, 0.7)',
      shimmer: 'rgba(235, 237, 251, 0.4)',
    },
  },
  success: {
    light: {
      background: 'rgba(34, 197, 94, 0.08)',
      border: 'rgba(34, 197, 94, 0.4)',
      text: 'rgba(21, 128, 61, 1)',
      textMinimal: 'rgba(21, 128, 61, 0.9)',
      hoverBackground: 'rgba(34, 197, 94, 0.12)',
      hoverBorder: 'rgba(34, 197, 94, 0.6)',
      shimmer: 'rgba(255, 255, 255, 0.6)',
    },
    dark: {
      background: 'rgba(34, 197, 94, 0.15)',
      border: 'rgba(34, 197, 94, 0.5)',
      text: 'rgba(187, 247, 208, 1)',
      textMinimal: 'rgba(187, 247, 208, 0.85)',
      hoverBackground: 'rgba(34, 197, 94, 0.22)',
      hoverBorder: 'rgba(34, 197, 94, 0.7)',
      shimmer: 'rgba(220, 255, 230, 0.4)',
    },
  },
  warning: {
    light: {
      background: 'rgba(245, 158, 11, 0.08)',
      border: 'rgba(245, 158, 11, 0.4)',
      text: 'rgba(146, 64, 14, 1)',
      textMinimal: 'rgba(146, 64, 14, 0.9)',
      hoverBackground: 'rgba(245, 158, 11, 0.12)',
      hoverBorder: 'rgba(245, 158, 11, 0.6)',
      shimmer: 'rgba(255, 255, 255, 0.6)',
    },
    dark: {
      background: 'rgba(245, 158, 11, 0.15)',
      border: 'rgba(245, 158, 11, 0.5)',
      text: 'rgba(254, 243, 199, 1)',
      textMinimal: 'rgba(254, 243, 199, 0.85)',
      hoverBackground: 'rgba(245, 158, 11, 0.22)',
      hoverBorder: 'rgba(245, 158, 11, 0.7)',
      shimmer: 'rgba(255, 250, 230, 0.4)',
    },
  },
  error: {
    light: {
      background: 'rgba(239, 68, 68, 0.08)',
      border: 'rgba(239, 68, 68, 0.4)',
      text: 'rgba(153, 27, 27, 1)',
      textMinimal: 'rgba(153, 27, 27, 0.9)',
      hoverBackground: 'rgba(239, 68, 68, 0.12)',
      hoverBorder: 'rgba(239, 68, 68, 0.6)',
      shimmer: 'rgba(255, 255, 255, 0.6)',
    },
    dark: {
      background: 'rgba(239, 68, 68, 0.15)',
      border: 'rgba(239, 68, 68, 0.5)',
      text: 'rgba(254, 202, 202, 1)',
      textMinimal: 'rgba(254, 202, 202, 0.85)',
      hoverBackground: 'rgba(239, 68, 68, 0.22)',
      hoverBorder: 'rgba(239, 68, 68, 0.7)',
      shimmer: 'rgba(255, 230, 230, 0.4)',
    },
  },
  info: {
    light: {
      background: 'rgba(34, 139, 230, 0.08)',
      border: 'rgba(34, 139, 230, 0.4)',
      text: 'rgba(34, 139, 230, 1)',
      textMinimal: 'rgba(34, 139, 230, 0.9)',
      hoverBackground: 'rgba(34, 139, 230, 0.12)',
      hoverBorder: 'rgba(34, 139, 230, 0.6)',
      shimmer: 'rgba(255, 255, 255, 0.6)',
    },
    dark: {
      background: 'rgba(34, 139, 230, 0.15)',
      border: 'rgba(34, 139, 230, 0.5)',
      text: 'rgba(200, 220, 255, 0.95)',
      textMinimal: 'rgba(200, 220, 255, 0.85)',
      hoverBackground: 'rgba(34, 139, 230, 0.22)',
      hoverBorder: 'rgba(34, 139, 230, 0.7)',
      shimmer: 'rgba(200, 220, 255, 0.4)',
    },
  },
  muted: {
    light: {
      background: 'rgba(0, 0, 0, 0.02)',
      border: 'rgba(0, 0, 0, 0.08)',
      text: 'rgba(0, 0, 0, 0.35)',
      textMinimal: 'rgba(0, 0, 0, 0.35)',
      hoverBackground: 'rgba(0, 0, 0, 0.04)',
      hoverBorder: 'rgba(0, 0, 0, 0.12)',
      shimmer: 'rgba(255, 255, 255, 0.5)',
    },
    dark: {
      background: 'rgba(255, 255, 255, 0.04)',
      border: 'rgba(255, 255, 255, 0.12)',
      text: 'rgba(255, 255, 255, 0.5)',
      textMinimal: 'rgba(255, 255, 255, 0.4)',
      hoverBackground: 'rgba(255, 255, 255, 0.08)',
      hoverBorder: 'rgba(255, 255, 255, 0.18)',
      shimmer: 'rgba(255, 255, 255, 0.25)',
    },
  },
} as const;

// ═════════════════════════════════════════════════════════════════════════
// 3. MAIN COMPONENT
// ═════════════════════════════════════════════════════════════════════════

export function Badge({
  children,
  variant = 'minimal',
  size = 'sm',
  theme = 'neutral',
  mode = 'light',
  bordered = false,
  shimmer = false,
  interactive = false,
  uppercase = true,
  letterSpacing,
  fontWeight,
  icon,
  as: Component = 'span',
  className = '',
  style = {},
  ariaLabel,
  onClick,
}: BadgeProps) {
  // Get design tokens
  const sizeVars = SIZE_CSS_VARS[size];
  const variantVars = VARIANT_CSS_VARS[variant];
  const colorTokens = (THEME_COLORS[theme] || THEME_COLORS.neutral)[mode];
  
  const isMinimal = variant === 'minimal';
  const textColor = isMinimal ? colorTokens.textMinimal : colorTokens.text;
  
  // Padding: minimal has none, others use size-based CSS vars
  const padding = isMinimal ? variantVars.padding : sizeVars.padding;
  
  // Build styles — ALL visual properties via CSS custom properties
  // CSS rules in theme.css consume these for base + hover + shimmer
  const badgeStyles: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    position: 'relative',
    
    // Typography (from CSS custom properties in theme.css)
    fontSize: sizeVars.fontSize,
    fontWeight: fontWeight || (isMinimal ? 400 : 500),
    textTransform: uppercase ? 'uppercase' : 'none',
    letterSpacing: letterSpacing || sizeVars.letterSpacing,
    lineHeight: isMinimal ? '1.6' : '1',
    
    // Shape (from CSS custom properties in theme.css)
    borderRadius: variantVars.borderRadius,
    padding: padding,
    
    // Color CSS custom properties — consumed by .badge rules in theme.css
    '--badge-text': textColor,
    '--badge-bg': isMinimal ? 'transparent' : colorTokens.background,
    '--badge-border': bordered ? colorTokens.border : 'transparent',
    '--badge-border-width': bordered ? '1px' : '0px',
    '--badge-hover-bg': colorTokens.hoverBackground,
    '--badge-hover-border': colorTokens.hoverBorder,
    '--badge-shimmer': colorTokens.shimmer,
    
    // Layout
    overflow: shimmer ? 'hidden' : 'visible',
    
    // Interaction
    cursor: interactive || onClick ? 'pointer' : 'default',
    transition: `background-color var(--badge-transition-duration, 300ms) ease-out, border-color var(--badge-transition-duration, 300ms) ease-out, transform var(--badge-transition-duration, 300ms) ease-out`,
    
    // User overrides (must be last to allow prop-level customization)
    ...style,
  } as CSSProperties;
  
  const interactiveClass = interactive ? 'badge-interactive' : '';
  const modeClass = `badge-${mode}`;
  
  return (
    <Component
      className={`badge badge-${variant} badge-${size} badge-${theme} ${modeClass} ${interactiveClass} ${className}`}
      style={badgeStyles}
      aria-label={ariaLabel}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Shimmer Overlay — gradient handled by CSS via var(--badge-shimmer) */}
      {shimmer && (
        <div className="badge-shimmer" />
      )}
      
      {/* Content — ALWAYS horizontal (inline-flex row). Icons must never stack vertically. */}
      <span className="relative z-10" style={{ display: 'inline-flex', flexDirection: 'row', alignItems: 'center', gap: icon ? '4px' : '0' }}>
        {icon && (
          <span
            className="badge-icon"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              width: sizeVars.iconSize,
              height: sizeVars.iconSize,
              lineHeight: 0,
            }}
          >
            {icon}
          </span>
        )}
        {children}
      </span>
    </Component>
  );
}

// ═════════════════════════════════════════════════════════════════════════
// 4. CONVENIENCE WRAPPERS
// ═════════════════════════════════════════════════════════════════════════

export function SectionLabel({ 
  children, 
  theme = 'neutral',
  mode = 'light',
  fontWeight = 600,
  className = '',
  style = {},
}: { 
  children: ReactNode; 
  theme?: BadgeTheme;
  mode?: BadgeMode;
  fontWeight?: 400 | 500 | 600;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Badge 
      variant="minimal" 
      size="sm" 
      theme={theme}
      mode={mode}
      fontWeight={fontWeight}
      className={className}
      style={{ marginBottom: '12px', ...style }}
    >
      {children}
    </Badge>
  );
}

export function StepPill({ 
  stepNumber,
  active = false,
  mode = 'light',
  className = '',
}: { 
  stepNumber: number;
  active?: boolean;
  mode?: BadgeMode;
  className?: string;
}) {
  return (
    <Badge 
      variant="pill" 
      size="sm" 
      theme="warm" 
      mode={mode}
      bordered
      shimmer
      className={`step-pill ${active ? 'step-active' : ''} ${className}`}
    >
      Step {stepNumber}
    </Badge>
  );
}

export function ObjectivePill({ 
  objectiveNumber,
  interactive = false,
  mode = 'light',
  className = '',
  onClick,
}: { 
  objectiveNumber: number;
  interactive?: boolean;
  mode?: BadgeMode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Badge 
      variant="pill" 
      size="sm" 
      theme="neutral" 
      mode={mode}
      bordered
      shimmer={interactive}
      interactive={interactive}
      onClick={onClick}
      className={`objective-pill ${className}`}
    >
      Objective {objectiveNumber}
    </Badge>
  );
}

export function ObjectivePillInteractive({ 
  number,
  label = 'Objective',
  mode = 'light',
  className = '',
}: { 
  number: string | number;
  label?: string;
  mode?: BadgeMode;
  className?: string;
}) {
  return (
    <Badge 
      variant="pill" 
      size="md"
      theme="neutral" 
      mode={mode}
      bordered
      shimmer
      className={`objective-pill objective-pill-interactive ${className}`}
      ariaLabel={`${label} number ${number}`}
    >
      {label} {number}
    </Badge>
  );
}

export function InfoCardLabel({ 
  children,
  mode = 'light',
  className = '',
}: { 
  children: ReactNode;
  mode?: BadgeMode;
  className?: string;
}) {
  return (
    <Badge 
      variant="minimal" 
      size="xs" 
      theme="neutral" 
      mode={mode}
      className={className}
      style={{ marginBottom: 'clamp(6px, 0.6vw, 8px)', opacity: 0.7 }}
    >
      {children}
    </Badge>
  );
}

export function CategoryBadge({ 
  children,
  theme = 'neutral',
  mode = 'light',
  icon,
  className = '',
}: { 
  children: ReactNode;
  theme?: BadgeTheme;
  mode?: BadgeMode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <Badge 
      variant="rounded" 
      size="sm" 
      theme={theme}
      mode={mode}
      bordered
      icon={icon}
      className={`category-badge ${className}`}
    >
      {children}
    </Badge>
  );
}

export function StatusBadge({ 
  children,
  status = 'success',
  mode = 'light',
  icon,
  className = '',
}: { 
  children: ReactNode;
  status?: 'success' | 'warning' | 'error';
  mode?: BadgeMode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <Badge 
      variant="rounded" 
      size="sm" 
      theme={status}
      mode={mode}
      bordered
      icon={icon}
      className={`status-badge status-${status} ${className}`}
    >
      {children}
    </Badge>
  );
}

export function InfoBadge({ 
  children,
  variant = 'rounded',
  mode = 'light',
  icon,
  className = '',
}: { 
  children: ReactNode;
  variant?: BadgeVariant;
  mode?: BadgeMode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <Badge 
      variant={variant} 
      size="sm" 
      theme="info"
      mode={mode}
      bordered
      icon={icon}
      className={`info-badge ${className}`}
    >
      {children}
    </Badge>
  );
}

export function MutedBadge({ 
  children,
  variant = 'rounded',
  mode = 'light',
  icon,
  className = '',
}: { 
  children: ReactNode;
  variant?: BadgeVariant;
  mode?: BadgeMode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <Badge 
      variant={variant} 
      size="sm" 
      theme="muted"
      mode={mode}
      bordered
      icon={icon}
      className={`muted-badge ${className}`}
      style={{ opacity: 0.7 }}
    >
      {children}
    </Badge>
  );
}

export function ClickableBadge({ 
  children,
  onClick,
  theme = 'neutral',
  variant = 'pill',
  mode = 'light',
  icon,
  className = '',
}: { 
  children: ReactNode;
  onClick: () => void;
  theme?: BadgeTheme;
  variant?: BadgeVariant;
  mode?: BadgeMode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <Badge 
      variant={variant} 
      size="sm" 
      theme={theme}
      mode={mode}
      bordered
      interactive
      shimmer
      onClick={onClick}
      icon={icon}
      className={`clickable-badge ${className}`}
    >
      {children}
    </Badge>
  );
}

// ═════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═════════════════════════════════════════════════════════════════════════

export default Badge;

export const BADGE_TOKENS = {
  sizeVars: SIZE_CSS_VARS,
  variantVars: VARIANT_CSS_VARS,
  themes: THEME_COLORS,
} as const;