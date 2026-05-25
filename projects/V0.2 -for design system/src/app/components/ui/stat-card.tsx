import { ReactNode } from 'react';
import { cn } from '@/app/components/ui/utils';

/**
 * KP 2.0 Design System - StatCard Component
 * 
 * A reusable component for displaying statistics with icons, labels, values, and optional subtitles.
 * Fully compliant with KP 2.0 design tokens.
 * 
 * @example
 * ```tsx
 * <StatCard
 *   variant="icon-left"
 *   icon={<TrendUp className="size-5" weight="regular" />}
 *   label="Market Value"
 *   value="$150 Mn"
 *   subtitle="2024 Estimate"
 * />
 * ```
 */

export interface StatCardProps {
  /**
   * Layout variant for the stat card
   * - icon-left: Icon on left, content on right (default)
   * - icon-top: Icon on top, content below (centered)
   * - inline: Compact inline layout with optional divider
   * - centered: All content centered
   */
  variant?: 'icon-left' | 'icon-top' | 'inline' | 'centered';
  
  /**
   * Icon element (Phosphor Icons recommended)
   */
  icon?: ReactNode;
  
  /**
   * Background color for icon container
   * @default 'periwinkle-50' (#eff1fe)
   */
  iconBg?: 'periwinkle-50' | 'periwinkle-100' | 'grayscale-50' | 'white';
  
  /**
   * Icon color (use Phosphor icon className)
   * @default 'periwinkle-600' (#6D52D9)
   */
  iconColor?: string;
  
  /**
   * Stat label text
   */
  label: string;
  
  /**
   * Main value to display
   */
  value: string | number;
  
  /**
   * Optional subtitle/description
   */
  subtitle?: string;
  
  /**
   * Show divider on right side (for inline variant)
   */
  showDivider?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Size variant for value text
   * @default 'default' (18px)
   */
  valueSize?: 'sm' | 'default' | 'lg' | 'xl';
  
  /**
   * Enable hover shadow effect
   * @default true for icon-left, false for inline
   */
  showHoverShadow?: boolean;
  
  /**
   * Container background
   * @default 'white' for icon-left/icon-top, transparent for inline
   */
  containerBg?: 'white' | 'transparent';
  
  /**
   * Show border
   * @default true for icon-left/icon-top
   */
  showBorder?: boolean;
}

export function StatCard({
  variant = 'icon-left',
  icon,
  iconBg = 'periwinkle-50',
  iconColor = 'text-[#6D52D9]',
  label,
  value,
  subtitle,
  showDivider = false,
  className,
  valueSize = 'default',
  showHoverShadow,
  containerBg,
  showBorder,
}: StatCardProps) {
  // Default values based on variant
  const defaultHoverShadow = variant === 'icon-left' || variant === 'icon-top';
  const defaultContainerBg = variant === 'inline' || variant === 'centered' ? 'transparent' : 'white';
  const defaultShowBorder = variant === 'icon-left' || variant === 'icon-top';
  
  const hover = showHoverShadow ?? defaultHoverShadow;
  const bg = containerBg ?? defaultContainerBg;
  const border = showBorder ?? defaultShowBorder;

  // Icon background colors (KP 2.0 compliant)
  const iconBgColors = {
    'periwinkle-50': 'bg-[#eff1fe]', // KP 2.0 Periwinkle 50
    'periwinkle-100': 'bg-[#e2e4fd]', // KP 2.0 Periwinkle 100
    'grayscale-50': 'bg-[#fafafa]', // KP 2.0 Grayscale 50
    'white': 'bg-white',
  };

  // Value size classes
  const valueSizeClasses = {
    'sm': 'text-[16px]',
    'default': 'text-[18px]',
    'lg': 'text-[22px]',
    'xl': 'text-[26px]',
  };

  // Base container classes
  const baseContainerClasses = cn(
    bg === 'white' && 'bg-white',
    border && 'border border-[#f5f5f5]',
    variant === 'icon-left' && 'p-4 rounded-[10px]',
    variant === 'icon-top' && 'p-6 rounded-[10px] text-center',
    hover && 'hover:shadow-[0_10px_15px_-3px_rgba(109,82,217,0.1),0_4px_6px_-4px_rgba(109,82,217,0.08)] transition-shadow duration-300',
  );

  // Icon-left variant (default - horizontal layout)
  if (variant === 'icon-left') {
    return (
      <div className={cn(baseContainerClasses, 'flex items-start gap-3 bg-warm-200', className)}>
        {icon && (
          <div className={cn(
            'size-10 rounded-lg flex items-center justify-center shrink-0',
            iconBgColors[iconBg]
          )}>
            <span className={iconColor}>{icon}</span>
          </div>
        )}
        <div className="flex flex-col">
          <p className="text-[14px] text-[#737373]">{label}</p>
          <p className={cn(valueSizeClasses[valueSize], 'font-bold text-[#171717]')}>
            {value}
          </p>
          {subtitle && (
            <p className="text-[13px] text-[#737373]">{subtitle}</p>
          )}
        </div>
      </div>
    );
  }

  // Icon-top variant (vertical layout, centered)
  if (variant === 'icon-top') {
    return (
      <div className={cn(baseContainerClasses, 'flex flex-col items-center', className)}>
        {icon && (
          <div className={cn(
            'size-12 rounded-lg flex items-center justify-center mb-3',
            iconBgColors[iconBg]
          )}>
            <span className={iconColor}>{icon}</span>
          </div>
        )}
        <p className="text-[14px] text-[#737373] mb-2">{label}</p>
        <p className={cn(valueSizeClasses[valueSize], 'font-bold text-[#171717]')}>
          {value}
        </p>
        {subtitle && (
          <p className="text-[13px] text-[#737373] mt-1">{subtitle}</p>
        )}
      </div>
    );
  }

  // Inline variant (compact, for stat grids)
  if (variant === 'inline') {
    return (
      <div className={cn('flex items-baseline gap-10 lg:gap-14', className)}>
        <div className="flex flex-col">
          <p className={cn(valueSizeClasses[valueSize], 'font-bold text-[#171717] tracking-tight')}>
            {value}
          </p>
          <p className="text-sm mt-1.5 text-[#737373]">{label}</p>
          {subtitle && (
            <p className="text-[13px] text-[#737373] mt-0.5">{subtitle}</p>
          )}
        </div>
        {showDivider && (
          <div className="w-px h-8 bg-[#d4d4d4] self-center"></div>
        )}
      </div>
    );
  }

  // Centered variant (simple centered layout)
  if (variant === 'centered') {
    return (
      <div className={cn('text-center', className)}>
        {icon && (
          <div className={cn(
            'size-12 rounded-lg flex items-center justify-center mx-auto mb-3',
            iconBgColors[iconBg]
          )}>
            <span className={iconColor}>{icon}</span>
          </div>
        )}
        <p className="text-[14px] mb-1 text-[#737373]">{label}</p>
        <p className={cn(valueSizeClasses[valueSize], 'font-bold text-[#171717]')}>
          {value}
        </p>
        {subtitle && (
          <p className="text-[13px] text-[#737373] mt-1">{subtitle}</p>
        )}
      </div>
    );
  }

  return null;
}