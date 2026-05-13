'use client';

import {
  useState,
  useRef,
  cloneElement,
  isValidElement,
  type ReactNode,
  type MouseEvent,
  type ReactElement,
} from 'react';
import { Loader2 } from 'lucide-react';
import { AnimatedArrow } from './AnimatedArrow';
import { cn } from '../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'brand';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonBackground = 'light' | 'dark';
export type ButtonIconPosition = 'left' | 'right';

export interface ButtonProps {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  background?: ButtonBackground;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: ButtonIconPosition;
  iconOnly?: boolean;
  loading?: boolean;
  disabled?: boolean;
  ripple?: boolean;
  shimmerDuration?: number;
  animatedArrow?: boolean;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

interface RippleType {
  x: number;
  y: number;
  size: number;
  key: number;
}

const iconSizeMap: Record<ButtonSize, number> = { xs: 14, sm: 16, md: 18, lg: 20, xl: 24 };
const gapMap: Record<ButtonSize, string> = {
  xs: 'gap-1',
  sm: 'gap-1.5',
  md: 'gap-2',
  lg: 'gap-2.5',
  xl: 'gap-3',
};

const sizeStyles = (size: ButtonSize, iconOnly: boolean): string => {
  /* xs uses literal classes (no DS token for 28px button — added 2026-05-13 Cat 5.2 anti-pattern: xs reserved for card footer CTAs only) */
  if (size === 'xs') {
    if (iconOnly) return 'w-7 h-7 p-0';
    return 'px-2.5 h-7 min-w-[60px]';
  }
  const base = `h-[var(--button-height-${size})]`;
  if (iconOnly) return `w-[var(--button-height-${size})] ${base} p-0`;
  return `px-[var(--button-px-${size})] ${base} min-w-[var(--button-min-width-${size})]`;
};

const fontStyle = (size: ButtonSize): { fontSize: string } => {
  if (size === 'xs') return { fontSize: 'var(--typography-size-xs, 0.8rem)' };
  if (size === 'sm') return { fontSize: 'var(--button-font-sm)' };
  if (size === 'xl') return { fontSize: 'var(--button-font-lg)' };
  return { fontSize: 'var(--button-font-md)' };
};

/**
 * Button — primary CTA atom w/ shimmer + ripple + animated arrow + multi-variant.
 *
 * WHY: Conversion CTAs need consistent affordance · brand-locked shimmer
 *      is Ken signature interaction · respects reduced-motion at DS layer.
 * WHAT: 4 variants (primary · brand · secondary · ghost) × 5 sizes (xs · sm · md · lg · xl) ·
 *      always-on shimmer · opt-in AnimatedArrow · Material ripple · loading/disabled states.
 *      Variants token-driven via `--composition-gradient-brand-*-shimmer`.
 * WHEN: Primary actions · submit forms · CTAs · conversion moments.
 *      `brand` for max 1-2 per screen · `md` default · `sm` for nav · `xs` card-footer only.
 * WHEN NOT: Inline text links (use `InlineLink`) · exploratory nav (use `CTALink`) ·
 *      decorative red NEVER (Cat 2.1 anti-pattern).
 * HOW: Token-only · shimmer ALWAYS on (DO NOT disable · brand signature) · AnimatedArrow
 *      OPT-IN via `animatedArrow={true}` for urgency · ripple toggle via `ripple={false}`.
 *
 * @promotedFrom V0_lite_report (was 386-LOC w/ hardcoded hex; ported to token-only)
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  background = 'light',
  fullWidth = false,
  icon,
  iconPosition = 'right',
  iconOnly = false,
  loading = false,
  disabled = false,
  ripple = true,
  shimmerDuration = 700,
  animatedArrow = false,
  onClick,
  className,
  type = 'button',
  ariaLabel,
}: ButtonProps) {
  const [ripples, setRipples] = useState<RippleType[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const iconSize = iconSizeMap[size];

  const arrowColor: 'white' | 'black' =
    variant === 'primary' || variant === 'brand'
      ? 'white'
      : background === 'dark'
        ? 'white'
        : 'black';

  const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
    if (!ripple || disabled || loading) return;
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const rippleSize = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - rippleSize / 2;
    const y = event.clientY - rect.top - rippleSize / 2;
    const newRipple: RippleType = { x, y, size: rippleSize, key: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.key !== newRipple.key));
    }, 600);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    createRipple(event);
    if (onClick && !disabled && !loading) onClick(event);
  };

  const variantClass = (() => {
    if (variant === 'primary' || variant === 'brand') {
      return 'text-[var(--color-foundation-white)] disabled:opacity-50';
    }
    if (variant === 'secondary') {
      if (background === 'dark') {
        return 'bg-white/10 text-[var(--color-foundation-white)] border border-white/30 hover:border-white hover:bg-white/[0.15] active:bg-white/20 disabled:border-white/10 disabled:text-white/40';
      }
      return 'bg-[var(--color-foundation-white)] text-[var(--color-foundation-black)] border border-[var(--color-ramp-warm-500)] hover:border-[var(--color-foundation-black)] hover:bg-[var(--color-ramp-coral-50)] active:bg-[var(--color-ramp-coral-100)] disabled:border-[var(--color-ramp-warm-300)] disabled:text-black/40';
    }
    if (variant === 'ghost') {
      if (background === 'dark') {
        return 'bg-transparent text-[var(--color-foundation-white)] border border-white/20 hover:border-white/40 hover:bg-white/5 active:bg-white/10 disabled:border-white/10 disabled:text-white/40';
      }
      return 'bg-transparent text-[var(--color-foundation-black)] border border-black/20 hover:border-black/40 hover:bg-black/5 active:bg-black/10 disabled:border-black/10 disabled:text-black/40';
    }
    return '';
  })();

  const variantInlineStyle = (() => {
    const fs = fontStyle(size);
    if (variant === 'primary') {
      return {
        ...fs,
        backgroundImage: 'var(--composition-gradient-brand-dark-shimmer)',
        boxShadow: isHovering ? '0 4px 12px rgba(0,0,0,0.25)' : '0 2px 8px rgba(0,0,0,0.15)',
      };
    }
    if (variant === 'brand') {
      return {
        ...fs,
        backgroundImage: 'var(--composition-gradient-brand-red-shimmer)',
        boxShadow: isHovering
          ? '0 12px 32px rgba(176,31,36,0.25)'
          : '0 4px 16px rgba(176,31,36,0.15)',
      };
    }
    return fs;
  })();

  const shimmerLayer = (() => {
    if (variant === 'brand') {
      return 'bg-[image:var(--composition-gradient-brand-red-shimmer)]';
    }
    if (variant === 'primary') {
      return 'bg-[image:var(--composition-gradient-brand-dark-shimmer)]';
    }
    if (variant === 'ghost') {
      return background === 'dark'
        ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
        : 'bg-gradient-to-r from-transparent via-black/20 to-transparent';
    }
    return '';
  })();

  const Spinner = () => (
    <Loader2 size={iconSize} strokeWidth={2.5} className="animate-spin flex-shrink-0" />
  );

  const IconWrapper = ({ children: iconChildren }: { children: ReactNode }) => {
    if (isValidElement(iconChildren)) {
      return cloneElement(iconChildren as ReactElement<{ size?: number; strokeWidth?: number; className?: string }>, {
        size: iconSize,
        strokeWidth: 2,
        className: 'flex-shrink-0',
      });
    }
    return <span className="inline-flex items-center flex-shrink-0">{iconChildren}</span>;
  };

  const renderIcon = () =>
    animatedArrow ? (
      <AnimatedArrow size={iconSize} color={arrowColor} isHovered={isHovering} />
    ) : (
      <IconWrapper>{icon}</IconWrapper>
    );

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={cn(
        'group relative inline-flex items-center justify-center font-medium tracking-[0.0875px]',
        'transition-all duration-300 rounded-[var(--radius-button)] overflow-hidden whitespace-nowrap',
        gapMap[size],
        sizeStyles(size, iconOnly),
        variantClass,
        fullWidth ? 'w-full' : iconOnly ? '' : 'w-full sm:w-auto',
        disabled || loading ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
      style={variantInlineStyle}
      aria-label={ariaLabel || (iconOnly ? 'Button' : undefined)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {shimmerLayer && (
        <div
          className={cn(
            'absolute inset-0 w-[200%] transition-transform ease-out pointer-events-none',
            'motion-reduce:transition-none motion-reduce:transform-none',
            shimmerLayer,
            isHovering ? '-translate-x-1/2' : 'translate-x-0',
          )}
          style={{ transitionDuration: `${shimmerDuration}ms` }}
        />
      )}

      {variant === 'secondary' && (
        <div
          className={cn(
            'absolute inset-0 w-[200%] pointer-events-none transition-transform ease-out',
            'motion-reduce:transition-none',
            isHovering ? '-translate-x-1/2' : 'translate-x-0',
          )}
          style={{
            transitionDuration: `${shimmerDuration}ms`,
            backgroundImage: `linear-gradient(to right, transparent, ${
              background === 'dark' ? 'rgba(255,255,255,0.15)' : 'var(--color-ramp-coral-50)'
            }, transparent)`,
          }}
        />
      )}

      {ripples.map((r) => (
        <span
          key={r.key}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
            backgroundColor:
              variant === 'primary' || variant === 'brand'
                ? 'rgba(255,255,255,0.30)'
                : 'rgba(0,0,0,0.10)',
            animation: 'ripple 600ms ease-out',
          }}
        />
      ))}

      {loading && iconPosition === 'left' && !iconOnly && (
        <span className="relative z-10"><Spinner /></span>
      )}
      {!loading && (icon || animatedArrow) && iconPosition === 'left' && !iconOnly && (
        <span className="relative z-10 overflow-visible">{renderIcon()}</span>
      )}

      {!iconOnly && (
        <span className={cn('relative z-10 inline-flex items-center', loading && 'opacity-70')}>
          {children}
        </span>
      )}

      {iconOnly && !loading && (icon || animatedArrow) && (
        <span className="relative z-10 overflow-visible">{renderIcon()}</span>
      )}
      {iconOnly && loading && <span className="relative z-10"><Spinner /></span>}

      {!loading && (icon || animatedArrow) && iconPosition === 'right' && !iconOnly && (
        <span className="relative z-10 overflow-visible">{renderIcon()}</span>
      )}
      {loading && iconPosition === 'right' && !iconOnly && (
        <span className="relative z-10"><Spinner /></span>
      )}
    </button>
  );
}
