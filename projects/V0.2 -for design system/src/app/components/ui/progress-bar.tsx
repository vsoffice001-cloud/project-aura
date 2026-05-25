import { cn } from '@/app/components/ui/utils';

/**
 * KP 2.0 Design System - Progress Bar Component
 * 
 * Reusable animated progress bar with purple styling.
 * Used across multiple sections for displaying percentages and metrics.
 * 
 * Features:
 * - Smooth animation
 * - Purple 300 fill color
 * - Customizable height
 * - Optional label display
 * 
 * @example
 * ```tsx
 * <ProgressBar value={75} label="75%" />
 * ```
 * 
 * @example Inline with text
 * ```tsx
 * <ProgressBar value={organicShare} max={50} showLabel={false} />
 * <span className="ml-2">{organicShare}%</span>
 * ```
 */

export interface ProgressBarProps {
  /**
   * Current value
   */
  value: number;
  
  /**
   * Maximum value (for percentage calculation)
   * @default 100
   */
  max?: number;
  
  /**
   * Show label inside/beside bar
   * @default false
   */
  showLabel?: boolean;
  
  /**
   * Custom label (overrides default percentage)
   */
  label?: string;
  
  /**
   * Bar height variant
   * @default 'default'
   */
  size?: 'sm' | 'default' | 'lg';
  
  /**
   * Bar color
   * @default 'var(--purple-300)'
   */
  color?: string;
  
  /**
   * Background color
   * @default 'var(--black-100)'
   */
  backgroundColor?: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Disable animation
   * @default false
   */
  noAnimation?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  label,
  size = 'default',
  color = 'var(--purple-300)',
  backgroundColor = 'var(--black-100)',
  className,
  noAnimation = false,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const displayLabel = label || `${Math.round(percentage)}%`;
  
  const sizeClasses = {
    sm: 'h-1.5',
    default: 'h-2',
    lg: 'h-3',
  };
  
  return (
    <div className={cn('w-full', className)}>
      <div 
        className={cn(
          'w-full rounded-full overflow-hidden',
          sizeClasses[size]
        )}
        style={{ backgroundColor }}
      >
        <div
          className={cn(
            'h-full rounded-full',
            !noAnimation && 'transition-all duration-700 ease-out'
          )}
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-xs text-[var(--black-600)] text-right">
          {displayLabel}
        </div>
      )}
    </div>
  );
}
