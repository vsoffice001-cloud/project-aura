import { ReactNode } from 'react';
import { cn } from '@/app/components/ui/utils';

/**
 * KP 2.0 Design System - Analysis Card Component
 * 
 * Used in CompetitiveLandscape for numbered analysis points.
 * 
 * Features:
 * - Numbered badge or icon with purple styling
 * - Title and description
 * - Hover border effect
 * 
 * @example
 * ```tsx
 * <AnalysisCard
 *   number="01"
 *   title="Fragmented Market"
 *   description="Top 5 players hold only 45% market share, indicating..."
 * />
 * ```
 */

export interface AnalysisCardProps {
  /**
   * Analysis number (formatted, e.g., "01", "02") - optional if icon provided
   */
  number?: string;
  
  /**
   * Icon element (Lucide icon) - optional alternative to number
   */
  icon?: ReactNode;
  
  /**
   * Analysis title
   */
  title: string;
  
  /**
   * Analysis description
   */
  description: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function AnalysisCard({
  number,
  icon,
  title,
  description,
  className,
}: AnalysisCardProps) {
  return (
    <div 
      className={cn(
        'bg-white border border-[#e5e5e5] rounded-[10px] p-4',
        'hover:border-purple-300 transition-colors',
        className
      )}
    >
      {/* Number Badge or Icon */}
      <div 
        className="size-10 rounded-lg flex items-center justify-center shrink-0 mb-3" 
        style={{ backgroundColor: '#f4f2fc' }}
      >
        {icon ? (
          <div className="text-[var(--purple-500)]">
            {icon}
          </div>
        ) : (
          <span className="text-sm font-bold" style={{ color: '#7f5fe3' }}>
            {number}
          </span>
        )}
      </div>
      
      {/* Title */}
      <h4 className="text-[14px] font-bold text-[#171717] mb-2">
        {title}
      </h4>
      
      {/* Description */}
      <p className="text-[12px] leading-relaxed text-[#737373]">
        {description}
      </p>
    </div>
  );
}