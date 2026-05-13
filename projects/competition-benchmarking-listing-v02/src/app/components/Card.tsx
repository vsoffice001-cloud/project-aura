/**
 * Card — Ken Bold DS v3.4
 *
 * Reusable content container that encodes the approved card pattern:
 * white bg, subtle border, box-shadow, hover lift + shadow intensify.
 *
 * Extracted from 9+ inline implementations (ResourceCard GridCard/ListCard,
 * AnalystPickCardB, ReportGridCard, StatCard, DataHighlightCard, etc.)
 * to eliminate DRY violations and centralize card styling.
 *
 * VISUAL OUTPUT: Identical to the previously inline pattern — zero visual regression.
 *
 * DS compliance:
 * - Border radius: var(--rc-radius-card) = 10px
 * - Shadow rest: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)
 * - Shadow hover: 0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)
 * - Lift: translateY(-2px) on hover
 * - Border: 1px solid rgba(0,0,0,0.06), darkens to 0.10 on hover
 * - Transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1)
 */

import { type MouseEvent, CSSProperties, ReactNode, useRef } from 'react';

export type CardVariant = 'white' | 'warm' | 'outlined';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardShadow = 'none' | 'sm' | 'md' | 'lg';

interface CardProps {
  children: ReactNode;
  /** Background style: white (default), warm (#f9f7f6), or outlined (transparent + border) */
  variant?: CardVariant;
  /** Internal padding: none, sm (16px), md (20px), lg (24px) */
  padding?: CardPadding;
  /** Shadow depth: none, sm (subtle), md (standard — default), lg (elevated) */
  shadow?: CardShadow;
  /** Enable hover lift + shadow intensification */
  hover?: boolean;
  /** HTML tag to render */
  as?: 'div' | 'article' | 'section';
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  /** Click handler (makes card cursor-pointer) */
  onClick?: (e: MouseEvent) => void;
}

/* ── Shadow Presets ── */
const SHADOW_MAP: Record<CardShadow, string> = {
  none: 'none',
  sm: '0 1px 2px rgba(0,0,0,0.03)',
  md: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
  lg: '0 4px 12px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.03)',
};

const SHADOW_HOVER_MAP: Record<CardShadow, string> = {
  none: 'none',
  sm: '0 4px 12px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.03)',
  md: '0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
  lg: '0 12px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.05)',
};

/* ── Padding Presets ── */
const PADDING_MAP: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

/* ── Background Presets ── */
const BG_MAP: Record<CardVariant, CSSProperties> = {
  white: { background: '#fff' },
  warm: { background: 'var(--warm-200)' },
  outlined: { background: 'transparent' },
};

const BORDER_MAP: Record<CardVariant, string> = {
  white: '1px solid rgba(0,0,0,0.06)',
  warm: '1px solid rgba(0,0,0,0.05)',
  outlined: '1px solid rgba(0,0,0,0.10)',
};

const BORDER_HOVER_MAP: Record<CardVariant, string> = {
  white: '1px solid rgba(0,0,0,0.10)',
  warm: '1px solid rgba(0,0,0,0.08)',
  outlined: '1px solid rgba(0,0,0,0.16)',
};

export function Card({
  children,
  variant = 'white',
  padding = 'none',
  shadow = 'md',
  hover = false,
  as: Component = 'div',
  className = '',
  style = {},
  onClick,
}: CardProps) {
  const elRef = useRef<HTMLElement>(null);

  const cardStyle: CSSProperties = {
    ...BG_MAP[variant],
    border: BORDER_MAP[variant],
    borderRadius: 'var(--rc-radius-card)',
    boxShadow: SHADOW_MAP[shadow],
    transition: hover
      ? 'box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease'
      : undefined,
    cursor: onClick ? 'pointer' : undefined,
    ...style,
  };

  const handleMouseEnter = hover
    ? () => {
        const el = elRef.current;
        if (!el) return;
        el.style.boxShadow = SHADOW_HOVER_MAP[shadow];
        el.style.transform = 'translateY(-2px)';
        el.style.borderColor = BORDER_HOVER_MAP[variant].split('solid ')[1];
      }
    : undefined;

  const handleMouseLeave = hover
    ? () => {
        const el = elRef.current;
        if (!el) return;
        el.style.boxShadow = SHADOW_MAP[shadow];
        el.style.transform = 'translateY(0)';
        el.style.borderColor = BORDER_MAP[variant].split('solid ')[1];
      }
    : undefined;

  return (
    <Component
      ref={elRef as any}
      className={`${PADDING_MAP[padding]} ${className}`}
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Component>
  );
}

export default Card;