import { ReactNode } from 'react';
import { cn } from '@/app/components/ui/utils';

/**
 * KP 2.0 Design System - Icon Card Component
 * 
 * Versatile card component with icon, title, and content.
 * Used across RegionalComparison, GrowthDriversChallenges, and other sections.
 * 
 * Features:
 * - Purple icon background circle
 * - Title and description
 * - Hover shadow effect
 * - Flexible content area
 * - Follows KP 2.0 h3 heading standards (25px, font-weight 400)
 * 
 * @example
 * ```tsx
 * <IconCard
 *   icon={<ChartBar weight="regular" className="size-5" />}
 *   title="Market Position"
 *   description="Qatar ranks 4th among GCC countries..."
 * />
 * ```
 * 
 * @example With custom content
 * ```tsx
 * <IconCard
 *   icon={<TrendingUp className="size-5" />}
 *   title="Growth Drivers"
 * >
 *   <div className="space-y-6">
 *     <div>
 *       <h4>Increasing Health Consciousness</h4>
 *       <p>The growing awareness...</p>
 *       <ul>
 *         <li>65% of consumers...</li>
 *       </ul>
 *     </div>
 *   </div>
 * </IconCard>
 * ```
 */

export interface IconCardProps {
  /** Icon element (from @phosphor-icons/react or similar) */
  icon: ReactNode;
  /** Card title */
  title: string;
  /** Optional description text */
  description?: string;
  /** Optional custom content to replace description */
  children?: ReactNode;
  /** Icon size variant */
  iconSize?: 'sm' | 'md' | 'lg';
  /** Background color for icon container */
  iconBgColor?: string;
  /** Icon color */
  iconColor?: string;
  /** Whether to show background behind icon */
  showIconBg?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function IconCard({
  icon,
  title,
  description,
  children,
  iconSize = 'md',
  className,
  iconBgColor = 'var(--purple-100)',
  iconColor = 'var(--purple-500)',
  showIconBg = true,
}: IconCardProps) {
  const iconSizeClasses = {
    sm: 'size-8',
    md: 'size-10',
    lg: 'size-12',
  };
  
  return (
    <div 
      className={cn(
        'h-full p-4 bg-white border rounded-[var(--radius-md)]',
        'hover:shadow-[var(--shadow-brand-purple)] transition-shadow duration-300',
        className
      )}
      style={{ borderColor: 'var(--black-200)' }}
    >
      {/* Icon */}
      <div 
        className={cn(
          'mb-4 rounded-lg flex items-center justify-center',
          iconSizeClasses[iconSize]
        )}
        style={{ backgroundColor: showIconBg ? iconBgColor : 'transparent' }}
      >
        <div style={{ color: iconColor }}>
          {icon}
        </div>
      </div>
      
      {/* Title */}
      <h3 className="mb-3">
        {title}
      </h3>
      
      {/* Content */}
      {children ? (
        children
      ) : description ? (
        <p 
          className="leading-relaxed" 
          style={{ fontSize: '16px', color: 'var(--black-500)' }}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}