import { ReactNode, useState, useRef } from 'react';
import { Loader2, ArrowUpRight, Download } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'brand';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  iconOnly?: boolean;
  loading?: boolean;
  disabled?: boolean;
  ripple?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  animatedArrow?: boolean; // Enable diagonal arrow animation
  animatedDownload?: boolean; // Enable download icon animation
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
  size = 'lg',
  fullWidth = false,
  icon,
  iconPosition = 'right',
  iconOnly = false,
  loading = false,
  disabled = false,
  ripple = true,
  onClick,
  className = '',
  type = 'button',
  ariaLabel,
  animatedArrow = false,
  animatedDownload = false,
}: ButtonProps) {
  const [ripples, setRipples] = useState<RippleType[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Determine icon size based on button size
  const iconSize = size === 'sm' ? 14 : size === 'md' ? 16 : size === 'lg' ? 18 : 20;

  // Handle ripple effect
  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!ripple || disabled || loading) return;

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple: RippleType = {
      x,
      y,
      size,
      key: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.key !== newRipple.key));
    }, 600);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(event);
    if (onClick && !disabled && !loading) {
      onClick();
    }
  };

  // Base styles - always applied
  const baseStyles = 'group relative flex items-center justify-center gap-2.5 font-medium tracking-[0.0875px] transition-all duration-300 rounded-[5px] overflow-hidden';
  
  // Size variants using CSS custom properties
  const sizeStyles = {
    sm: iconOnly 
      ? 'w-[var(--button-height-sm)] h-[var(--button-height-sm)] p-0' 
      : 'px-[var(--button-px-sm)] h-[var(--button-height-sm)] min-w-[var(--button-min-width-sm)]',
    md: iconOnly 
      ? 'w-[var(--button-height-md)] h-[var(--button-height-md)] p-0' 
      : 'px-[var(--button-px-md)] h-[var(--button-height-md)] min-w-[var(--button-min-width-md)]',
    lg: iconOnly 
      ? 'w-[var(--button-height-lg)] h-[var(--button-height-lg)] p-0' 
      : 'px-[var(--button-px-lg)] h-[var(--button-height-lg)] min-w-[var(--button-min-width-lg)]',
    xl: iconOnly 
      ? 'w-[var(--button-height-xl)] h-[var(--button-height-xl)] p-0' 
      : 'px-[var(--button-px-xl)] h-[var(--button-height-xl)]',
  };
  
  const fontSizeStyles = {
    sm: { fontSize: 'var(--button-font-sm)' },
    md: { fontSize: 'var(--button-font-md)' },
    lg: { fontSize: 'var(--button-font-md)' },
    xl: { fontSize: 'var(--button-font-lg)' },
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'text-white disabled:opacity-50',
    secondary: 'bg-white text-black border border-black/20 hover:border-black/40 hover:bg-black/[0.02] active:bg-black/[0.04] disabled:border-black/10 disabled:text-black/40',
    ghost: 'bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5 active:bg-white/10 disabled:border-white/10 disabled:text-white/40',
    brand: 'text-white disabled:opacity-50',
  };

  // Primary variant needs special background handling with dark-to-grey gradient
  const primaryBgStyle = variant === 'primary' ? {
    ...fontSizeStyles[size],
    backgroundImage: 'linear-gradient(90deg, #0a0a0a, #6a6a6a)',
    backgroundSize: '200% 200%',
    backgroundPosition: isHovering ? '100% 50%' : '0% 50%',
    transition: 'background-position 0.3s ease, box-shadow 0.3s ease',
    boxShadow: isHovering ? '0 4px 12px rgba(0, 0, 0, 0.25)' : '0 2px 8px rgba(0, 0, 0, 0.15)'
  } : {};

  // Brand variant needs special background handling with gradient
  const brandBgStyle = variant === 'brand' ? { 
    ...fontSizeStyles[size],
    backgroundImage: 'linear-gradient(90deg, var(--red-700), var(--red-500))',
    backgroundSize: '200% 200%',
    backgroundPosition: isHovering ? '100% 50%' : '0% 50%',
    transition: 'background-position 0.3s ease, transform 0.2s ease',
    boxShadow: isHovering ? '0 12px 32px rgba(176, 31, 36, 0.25)' : '0 4px 16px rgba(176, 31, 36, 0.15)'
  } : {};

  // For secondary and ghost, include fontSize in the inline style to avoid conflicts
  const secondaryGhostStyle = (variant === 'secondary' || variant === 'ghost') ? fontSizeStyles[size] : {};

  // Combine gradient styles
  const inlineStyle = variant === 'primary' ? primaryBgStyle : variant === 'brand' ? brandBgStyle : secondaryGhostStyle;
  
  // Width styles
  const widthStyles = fullWidth ? 'w-full' : iconOnly ? '' : 'w-full sm:w-auto';
  
  // Disabled/Loading styles
  const stateStyles = (disabled || loading) ? 'cursor-not-allowed' : 'cursor-pointer';
  
  // Combine all styles
  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyles} ${stateStyles} ${className}`;
  
  // Spinner component
  const Spinner = () => (
    <Loader2 
      className="animate-spin" 
      style={{ 
        width: size === 'sm' ? '14px' : size === 'md' ? '16px' : '18px',
        height: size === 'sm' ? '14px' : size === 'md' ? '16px' : '18px',
      }} 
    />
  );

  return (
    <button 
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={combinedStyles}
      style={inlineStyle}
      aria-label={ariaLabel || (iconOnly ? 'Button' : undefined)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.key}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: variant === 'primary' || variant === 'brand' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)',
            animation: 'ripple 600ms ease-out',
          }}
        />
      ))}

      {/* Loading State - Left Icon Position */}
      {loading && iconPosition === 'left' && <Spinner />}
      
      {/* Left Icon */}
      {!loading && icon && iconPosition === 'left' && !animatedArrow && !animatedDownload && (
        <span className="inline-flex shrink-0">
          {icon}
        </span>
      )}
      
      {/* Animated Arrow - Left */}
      {!loading && animatedArrow && iconPosition === 'left' && (
        <span className="relative inline-flex shrink-0 w-[18px] h-[18px] overflow-hidden">
          <ArrowUpRight 
            size={iconSize}
            strokeWidth={2}
            className="absolute inset-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-0"
          />
          <ArrowUpRight 
            size={iconSize}
            strokeWidth={2}
            className="absolute inset-0 transition-all duration-300 ease-out -translate-x-1 translate-y-1 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
          />
        </span>
      )}

      {/* Animated Download - Left */}
      {!loading && animatedDownload && iconPosition === 'left' && (
        <span className="relative inline-flex shrink-0 overflow-hidden">
          <Download 
            size={iconSize}
            strokeWidth={2}
            className="transition-all duration-300 ease-out group-hover:translate-y-0.5 group-hover:animate-download-bounce"
          />
        </span>
      )}
      
      {/* Text Content */}
      {!iconOnly && (
        <span 
          className={loading ? 'opacity-70' : ''}
        >
          {children}
        </span>
      )}
      
      {/* Icon Only */}
      {iconOnly && !loading && icon && (
        <span className="inline-flex shrink-0">
          {icon}
        </span>
      )}
      
      {/* Loading State - Icon Only */}
      {iconOnly && loading && <Spinner />}
      
      {/* Right Icon */}
      {!loading && icon && iconPosition === 'right' && !iconOnly && !animatedArrow && !animatedDownload && (
        <span className="inline-flex shrink-0">
          {icon}
        </span>
      )}

      {/* Animated Arrow - Right */}
      {!loading && animatedArrow && iconPosition === 'right' && !iconOnly && (
        <span className="relative inline-flex shrink-0 w-[18px] h-[18px] overflow-hidden">
          <ArrowUpRight 
            size={iconSize}
            strokeWidth={2}
            className="absolute inset-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-0"
          />
          <ArrowUpRight 
            size={iconSize}
            strokeWidth={2}
            className="absolute inset-0 transition-all duration-300 ease-out -translate-x-1 translate-y-1 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
          />
        </span>
      )}

      {/* Animated Download - Right */}
      {!loading && animatedDownload && iconPosition === 'right' && !iconOnly && (
        <span className="relative inline-flex shrink-0 overflow-hidden">
          <Download 
            size={iconSize}
            strokeWidth={2}
            className="transition-all duration-300 ease-out group-hover:translate-y-0.5 group-hover:animate-download-bounce"
          />
        </span>
      )}
      
      {/* Loading State - Right Icon Position */}
      {loading && iconPosition === 'right' && !iconOnly && <Spinner />}
    </button>
  );
}