import { ReactNode, useState, useRef, cloneElement, isValidElement } from 'react';
import { Loader2 } from 'lucide-react';
import { AnimatedArrow } from '@/app/components/AnimatedArrow';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'brand';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonBackground = 'light' | 'dark';

interface ButtonProps {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  background?: ButtonBackground;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  iconOnly?: boolean;
  loading?: boolean;
  disabled?: boolean;
  ripple?: boolean;
  shimmerDuration?: number;
  showArrow?: boolean;
  onClick?: () => void;
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
  showArrow = false,
  onClick,
  className = '',
  type = 'button',
  ariaLabel,
}: ButtonProps) {
  const [ripples, setRipples] = useState<RippleType[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const iconSizeMap = { xs: 14, sm: 16, md: 18, lg: 20, xl: 24 };
  const iconSize = iconSizeMap[size];

  const gapMap = { xs: 'gap-1', sm: 'gap-1.5', md: 'gap-2', lg: 'gap-2.5', xl: 'gap-3' };

  const getArrowColor = () => {
    if (variant === 'primary' || variant === 'brand') return 'white';
    if (variant === 'secondary') {
      if (background === 'dark') return 'white';
      return isHovering ? 'var(--brand-red)' : 'rgba(0,0,0,0.7)';
    }
    if (variant === 'ghost') return background === 'dark' ? 'white' : 'black';
    return 'black';
  };

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(event);
    if (onClick && !disabled && !loading) onClick();
  };

  const baseStyles = `group relative inline-flex items-center justify-center ${gapMap[size]} tracking-[0.0875px] transition-all duration-300 overflow-hidden whitespace-nowrap`;

  const sizeStyles = {
    xs: iconOnly ? 'w-7 h-7 p-0' : 'h-7 min-w-[56px]',
    sm: iconOnly ? 'p-0' : '',
    md: iconOnly ? 'p-0' : '',
    lg: iconOnly ? 'p-0' : '',
    xl: iconOnly ? 'p-0' : '',
  };

  const sizeInlineStyles: Record<ButtonSize, React.CSSProperties> = {
    xs: { borderRadius: 'var(--radius-element, 5px)', ...(iconOnly ? {} : { paddingInline: '0.75rem' }) },
    sm: {
      height: 'var(--button-height-sm)',
      paddingInline: iconOnly ? '0' : 'var(--button-px-sm)',
      minWidth: iconOnly ? 'var(--button-height-sm)' : 'var(--button-min-width-sm)',
      borderRadius: 'var(--radius-element, 5px)',
      ...(iconOnly ? { width: 'var(--button-height-sm)' } : {}),
    },
    md: {
      height: 'var(--button-height-md)',
      paddingInline: iconOnly ? '0' : 'var(--button-px-md)',
      minWidth: iconOnly ? 'var(--button-height-md)' : 'var(--button-min-width-md)',
      borderRadius: 'var(--radius-element, 5px)',
      ...(iconOnly ? { width: 'var(--button-height-md)' } : {}),
    },
    lg: {
      height: 'var(--button-height-lg)',
      paddingInline: iconOnly ? '0' : 'var(--button-px-lg)',
      minWidth: iconOnly ? 'var(--button-height-lg)' : 'var(--button-min-width-lg)',
      borderRadius: 'var(--radius-element, 5px)',
      ...(iconOnly ? { width: 'var(--button-height-lg)' } : {}),
    },
    xl: {
      height: 'var(--button-height-xl)',
      paddingInline: iconOnly ? '0' : 'var(--button-px-xl)',
      borderRadius: 'var(--radius-element, 5px)',
      ...(iconOnly ? { width: 'var(--button-height-xl)' } : {}),
    },
  };

  const fontSizeStyles = {
    xs: { fontSize: 'var(--text-xs)' },
    sm: { fontSize: 'var(--text-nav)' },
    md: { fontSize: 'var(--text-sm)' },
    lg: { fontSize: '1.125rem' },
    xl: { fontSize: '1.25rem' },
  };

  const getVariantStyles = () => {
    if (variant === 'primary') return 'text-white disabled:opacity-50';
    if (variant === 'brand') return 'text-white disabled:opacity-50';
    if (variant === 'secondary') {
      if (background === 'dark') return 'bg-white/10 text-white border border-white/30 hover:border-white hover:bg-white/[0.15] active:bg-white/[0.2] disabled:border-white/10 disabled:text-white/40';
      return 'bg-white border disabled:text-black/40';
    }
    if (variant === 'ghost') {
      if (background === 'dark') return 'bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5 active:bg-white/10 disabled:border-white/10 disabled:text-white/40';
      return 'bg-transparent text-black border border-black/20 hover:border-black/40 hover:bg-black/5 active:bg-black/10 disabled:border-black/10 disabled:text-black/40';
    }
    return '';
  };

  const primaryBgStyle = variant === 'primary' ? {
    ...fontSizeStyles[size],
    backgroundImage: 'linear-gradient(90deg, #141016, #656565, #141016)',
    boxShadow: isHovering ? '0 4px 12px rgba(0, 0, 0, 0.25)' : '0 2px 8px rgba(0, 0, 0, 0.15)'
  } : {};

  const brandBgStyle = variant === 'brand' ? {
    ...fontSizeStyles[size],
    backgroundImage: 'linear-gradient(90deg, #b01f24, #eb484e, #b01f24)',
    boxShadow: isHovering ? '0 12px 32px rgba(176, 31, 36, 0.25)' : '0 4px 16px rgba(176, 31, 36, 0.15)'
  } : {};

  const secondaryGhostStyle = (variant === 'secondary' || variant === 'ghost') ? {
    ...fontSizeStyles[size],
    ...(variant === 'secondary' && background !== 'dark' ? {
      color: isHovering ? 'var(--brand-red)' : 'rgba(0,0,0,0.7)',
      borderColor: isHovering ? 'var(--brand-red)' : 'rgba(0,0,0,0.12)',
      boxShadow: isHovering ? '0 4px 16px rgba(176, 31, 36, 0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
      transition: 'color 300ms ease-out, border-color 300ms ease-out, box-shadow 300ms ease-out',
    } : {}),
  } : {};

  const inlineStyle = variant === 'primary' ? primaryBgStyle : variant === 'brand' ? brandBgStyle : secondaryGhostStyle;

  const widthStyles = fullWidth ? 'w-full' : iconOnly ? '' : 'w-full sm:w-auto';
  const stateStyles = (disabled || loading) ? 'cursor-not-allowed' : 'cursor-pointer';
  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${getVariantStyles()} ${widthStyles} ${stateStyles} ${className}`;

  const IconWrapper = ({ children: iconChild }: { children: ReactNode }) => {
    if (isValidElement(iconChild)) {
      return cloneElement(iconChild as React.ReactElement<any>, {
        size: iconSize,
        strokeWidth: 2,
        className: 'flex-shrink-0'
      });
    }
    return <span className="inline-flex items-center flex-shrink-0">{iconChild}</span>;
  };

  const shimmerEl = (
    <>
      {(variant === 'primary' || variant === 'brand') && (
        <div
          className={`absolute inset-0 w-[200%] bg-gradient-to-r pointer-events-none transition-transform ease-out motion-reduce:transition-none ${
            variant === 'brand'
              ? 'from-[#b01f24] via-[#eb484e] to-[#b01f24]'
              : 'from-[#141016] via-[#656565] to-[#141016]'
          } ${isHovering ? '-translate-x-1/2' : 'translate-x-0'}`}
          style={{ transitionDuration: `${shimmerDuration}ms` }}
        />
      )}
      {variant === 'secondary' && (
        <div
          className={`absolute inset-0 w-[200%] pointer-events-none transition-transform ease-out motion-reduce:transition-none ${isHovering ? '-translate-x-1/2' : 'translate-x-0'}`}
          style={{
            transitionDuration: `${shimmerDuration}ms`,
            backgroundImage: isHovering
              ? 'linear-gradient(to right, transparent, rgba(176, 31, 36, 0.08), transparent)'
              : `linear-gradient(to right, transparent, ${background === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.8)'}, transparent)`
          }}
        />
      )}
      {variant === 'ghost' && (
        <div
          className={`absolute inset-0 w-[200%] pointer-events-none transition-transform ease-out motion-reduce:transition-none ${
            background === 'dark'
              ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
              : 'bg-gradient-to-r from-transparent via-black/10 to-transparent'
          } ${isHovering ? '-translate-x-1/2' : 'translate-x-0'}`}
          style={{ transitionDuration: `${shimmerDuration}ms` }}
        />
      )}
    </>
  );

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={combinedStyles}
      style={{ ...inlineStyle, ...sizeInlineStyles[size] }}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {ripples.map((r) => (
        <span
          key={r.key}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            left: r.x, top: r.y, width: r.size, height: r.size,
            animation: 'ripple 600ms ease-out forwards',
          }}
        />
      ))}

      {shimmerEl}

      {loading && (
        <span className="relative z-10">
          <Loader2 size={iconSize} strokeWidth={2.5} className="animate-spin flex-shrink-0" />
        </span>
      )}

      {!loading && (icon || showArrow) && iconPosition === 'left' && (
        <span className="relative z-10 flex items-center">
          {showArrow ? (
            <AnimatedArrow size={iconSize} color={getArrowColor()} isHovered={isHovering} />
          ) : (
            <IconWrapper>{icon}</IconWrapper>
          )}
        </span>
      )}

      {!iconOnly && children && (
        <span className="relative z-10 inline-flex items-center whitespace-nowrap">
          {children}
        </span>
      )}

      {iconOnly && !loading && (icon || showArrow) && (
        <span className="relative z-10 flex items-center justify-center">
          {showArrow ? (
            <AnimatedArrow size={iconSize} color={getArrowColor()} isHovered={isHovering} />
          ) : (
            <IconWrapper>{icon}</IconWrapper>
          )}
        </span>
      )}

      {!loading && (icon || showArrow) && iconPosition === 'right' && !iconOnly && (
        <span className="relative z-10 flex items-center">
          {showArrow ? (
            <AnimatedArrow size={iconSize} color={getArrowColor()} isHovered={isHovering} />
          ) : (
            <IconWrapper>{icon}</IconWrapper>
          )}
        </span>
      )}

      <span className="absolute inset-0 ring-2 ring-black ring-offset-2 opacity-0 focus-visible:opacity-100 pointer-events-none" style={{ borderRadius: 'var(--radius-element, 5px)' }} />
    </button>
  );
}