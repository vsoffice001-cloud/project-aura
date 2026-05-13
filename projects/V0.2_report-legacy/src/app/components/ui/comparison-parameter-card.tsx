import { ReactNode } from 'react';
import { cn } from '@/app/components/ui/utils';

/**
 * KP 2.0 Design System - Comparison Parameter Card Component
 * 
 * Used in CompetitiveLandscape for displaying cross-comparison parameters
 * such as Revenue Growth Rate, Market Penetration, Customer Retention, etc.
 * 
 * Features:
 * - Purple icon background
 * - Parameter title
 * - Parameter description
 * - Hover border effect
 * 
 * @example
 * ```tsx
 * <ComparisonParameterCard
 *   icon={<TrendingUp className="size-5" />}
 *   title="Revenue Growth Rate"
 *   description="Year-over-year revenue increase across competitive landscape"
 * />
 * ```
 */

export interface ComparisonParameterCardProps {
  /**
   * Icon element (Lucide icon) - optional
   */
  icon?: ReactNode;
  
  /**
   * Number badge (alternative to icon) - optional
   */
  number?: number;
  
  /**
   * Parameter title
   */
  title: string;
  
  /**
   * Parameter description
   */
  description: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function ComparisonParameterCard({
  icon,
  number,
  title,
  description,
  className,
}: ComparisonParameterCardProps) {
  return (
    <div 
      className={cn(
        'h-full p-4 bg-white border border-[var(--black-200)] rounded-[var(--radius-md)]',
        'hover:border-[var(--black-300)] transition-colors duration-300',
        className
      )}
    >
      {/* Icon or Number Badge */}
      <div className="size-10 mb-4 rounded-lg flex items-center justify-center bg-[var(--purple-100)]">
        {number !== undefined ? (
          <span className="text-base font-bold text-[var(--purple-500)]">
            {number}
          </span>
        ) : (
          <div className="text-[var(--purple-500)]">
            {icon}
          </div>
        )}
      </div>
      
      {/* Title */}
      <h4 className="text-sm font-bold text-[var(--black-900)] mb-2">
        {title}
      </h4>
      
      {/* Description */}
      <p className="text-xs leading-relaxed text-[var(--black-500)]">
        {description}
      </p>
    </div>
  );
}