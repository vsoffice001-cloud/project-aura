import { ReactNode, useState } from 'react';

/**
 * Badge Component - Design System VS 26
 * Updated from GitHub repo: vsoffice001-cloud/Design-System-vs-26
 *
 * 3 Variants: minimal, rounded, pill
 * 4 Sizes (reduced heights): xs (18px), sm (23px), md (29px), lg (35px)
 * 9 Themes: neutral, warm, brand, success, warning, error, info, muted, purple
 *
 * Features:
 * - Shimmer animation (warm-tinted for warm theme)
 * - Bordered option
 * - Interactive hover states
 * - Flexbox centering with 6px icon gap
 *
 * Common Patterns:
 * - Section eyebrows: minimal + sm + neutral
 * - Step indicators: pill + sm + warm + bordered + shimmer
 * - Objectives: pill + sm + neutral + bordered + interactive
 * - Info labels: minimal + xs + neutral
 * - Status badges: rounded + sm + semantic theme + bordered
 * - Premium content: pill + md + purple + bordered
 *
 * HARDCODED HEX NOTE:
 * This file is the ONLY intentional exception to the "no hardcoded hex
 * in .tsx files" rule. Badge is a design-system atom that defines its
 * own internal theme color configs (themeColors map). These hex values
 * are the source of truth for badge theming and are not duplicated
 * elsewhere. All other .tsx files must use CSS variables or tokens.
 */

type BadgeVariant = 'minimal' | 'rounded' | 'pill';
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';
type BadgeTheme =
  | 'neutral'
  | 'warm'
  | 'brand'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'muted'
  | 'purple';

interface BadgeProps {
  children: ReactNode;
  /** Visual shape: minimal (text only), rounded (5px radius), pill (fully rounded) */
  variant?: BadgeVariant;
  /** Size with reduced heights for sleeker appearance */
  size?: BadgeSize;
  /** Color theme */
  theme?: BadgeTheme;
  /** Show border */
  bordered?: boolean;
  /** Enable shimmer animation on hover (brand signature) */
  shimmer?: boolean;
  /** Enable continuous shimmer animation with pause (no hover required) */
  autoShimmer?: boolean;
  /** Enable interactive hover effects */
  interactive?: boolean;
  /** Optional icon element (placed before text) */
  icon?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Optional inline styles (e.g. gradient backgrounds) */
  style?: React.CSSProperties;
}

// --- Theme color maps ---

const themeColors: Record<
  BadgeTheme,
  {
    text: string;
    bg: string;
    border: string;
    hoverBg: string;
    hoverBorder: string;
    shimmerColor: string;
  }
> = {
  neutral: {
    text: 'text-[#404040]',
    bg: 'bg-[#fcfbfa]',
    border: 'border-[#e5e5e5]',
    hoverBg: 'hover:bg-[#f5f2f1]',
    hoverBorder: 'hover:border-[#d4d4d4]',
    shimmerColor: 'rgba(255,255,255,0.18)',
  },
  warm: {
    text: 'text-[#a6968e]',
    bg: 'bg-[#faf9f8]',
    border: 'border-[#eae5e3]',
    hoverBg: 'hover:bg-[#f5f2f1]',
    hoverBorder: 'hover:border-[#d9d1ce]',
    shimmerColor: 'rgba(168,150,142,0.12)', // warm-tinted shimmer
  },
  brand: {
    text: 'text-white',
    bg: 'bg-[#b01f24]',
    border: 'border-[#b01f24]',
    hoverBg: 'hover:bg-[#8f181d]',
    hoverBorder: 'hover:border-[#8f181d]',
    shimmerColor: 'rgba(255,255,255,0.22)',
  },
  success: {
    text: 'text-[#166534]',
    bg: 'bg-[#f0fdf4]',
    border: 'border-[#bbf7d0]',
    hoverBg: 'hover:bg-[#dcfce7]',
    hoverBorder: 'hover:border-[#86efac]',
    shimmerColor: 'rgba(255,255,255,0.15)',
  },
  warning: {
    text: 'text-[#92400e]',
    bg: 'bg-[#fffbeb]',
    border: 'border-[#fde68a]',
    hoverBg: 'hover:bg-[#fef3c7]',
    hoverBorder: 'hover:border-[#fcd34d]',
    shimmerColor: 'rgba(255,255,255,0.15)',
  },
  error: {
    text: 'text-[#991b1b]',
    bg: 'bg-[#fef2f2]',
    border: 'border-[#fecaca]',
    hoverBg: 'hover:bg-[#fee2e2]',
    hoverBorder: 'hover:border-[#fca5a5]',
    shimmerColor: 'rgba(255,255,255,0.15)',
  },
  info: {
    text: 'text-[#1e40af]',
    bg: 'bg-[#eff6ff]',
    border: 'border-[#bfdbfe]',
    hoverBg: 'hover:bg-[#dbeafe]',
    hoverBorder: 'hover:border-[#93c5fd]',
    shimmerColor: 'rgba(255,255,255,0.15)',
  },
  muted: {
    text: 'text-[var(--black-400)]',
    bg: 'bg-[var(--black-50)]',
    border: 'border-[var(--black-200)]',
    hoverBg: 'hover:bg-[var(--black-100)]',
    hoverBorder: 'hover:border-[var(--black-300)]',
    shimmerColor: 'rgba(255,255,255,0.10)',
  },
  purple: {
    text: 'text-content-icon',
    bg: 'bg-[var(--purple-50)]',
    border: 'border-[var(--purple-200)]',
    hoverBg: 'hover:bg-[#eeecfd]',
    hoverBorder: 'hover:border-[var(--purple-300)]',
    shimmerColor: 'rgba(128,108,224,0.12)',
  },
};

// --- Size maps (reduced heights for sleeker look) ---

const sizeClasses: Record<BadgeSize, string> = {
  xs: 'text-[0.563rem] tracking-[0.15em]', // ~9px, 18px height
  sm: 'text-[0.688rem] tracking-[0.12em]', // 11px, 23px height
  md: 'text-[0.813rem] tracking-[0.08em]', // 13px, 29px height
  lg: 'text-[0.938rem] tracking-[0.05em]', // 15px, 35px height
};

const sizePadding: Record<BadgeSize, { minimal: string; rounded: string; pill: string }> = {
  xs: { minimal: 'py-0', rounded: 'px-2 py-0.5', pill: 'px-2.5 py-0.5' },
  sm: { minimal: 'py-0', rounded: 'px-2.5 py-1', pill: 'px-3 py-1' },
  md: { minimal: 'py-0', rounded: 'px-3 py-1.5', pill: 'px-4 py-1.5' },
  lg: { minimal: 'py-0', rounded: 'px-4 py-2', pill: 'px-5 py-2' },
};

// --- Variant shape ---

const variantShape: Record<BadgeVariant, string> = {
  minimal: '', // no background, no border, no radius
  rounded: 'rounded-[5px]',
  pill: 'rounded-full',
};

export function Badge({
  children,
  variant = 'rounded',
  size = 'sm',
  theme = 'neutral',
  bordered = false,
  shimmer = false,
  autoShimmer = false,
  interactive = false,
  icon,
  className = '',
  style,
}: BadgeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const colors = themeColors[theme];

  // Build class list
  const isMinimal = variant === 'minimal';

  // Background: only for rounded/pill
  const bgClass = isMinimal ? 'bg-transparent' : colors.bg;

  // Border: only when bordered is true and not minimal
  const borderClass =
    bordered && !isMinimal ? `border ${colors.border}` : isMinimal ? '' : '';

  // Hover
  const hoverClass = interactive
    ? `${isMinimal ? '' : colors.hoverBg} ${bordered && !isMinimal ? colors.hoverBorder : ''} cursor-pointer`
    : '';

  // Shape
  const shapeClass = variantShape[variant];

  // Size
  const sizeClass = sizeClasses[size];
  const paddingClass = sizePadding[size][variant];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        font-semibold
        uppercase
        transition-all duration-200 ease-in-out
        cursor-default
        relative overflow-hidden
        ${bgClass}
        ${borderClass}
        ${hoverClass}
        ${shapeClass}
        ${sizeClass}
        ${paddingClass}
        ${colors.text}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={style}
    >
      {/* Shimmer overlay */}
      {shimmer && (
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isHovered
              ? `linear-gradient(90deg, transparent 0%, ${colors.shimmerColor} 50%, transparent 100%)`
              : 'none',
            transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
            transition: isHovered
              ? 'transform 700ms ease-out'
              : 'none', // instant reset on unhover
          }}
        />
      )}

      {/* Auto Shimmer overlay */}
      {autoShimmer && (
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)`,
            animation: 'badge-auto-shimmer 4.5s ease-in-out infinite',
          }}
        />
      )}

      {/* Icon */}
      {icon && (
        <span className="inline-flex items-center shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5">
          {icon}
        </span>
      )}

      {/* Text */}
      <span className="relative z-[1]">{children}</span>
    </span>
  );
}

export type { BadgeVariant, BadgeSize, BadgeTheme, BadgeProps };