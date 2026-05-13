import { ReactNode } from 'react';
import { cn } from '@/app/components/ui/utils';
import { Icon as PhosphorIcon } from '@phosphor-icons/react';

/**
 * KP 2.0 Design System - Stakeholder Card Component
 * 
 * Used in TargetAudience section for displaying stakeholder information
 * such as Investors, Food Service Providers, Government Bodies, etc.
 * 
 * Features:
 * - Purple icon background (rounded-xl)
 * - Stakeholder title
 * - Stakeholder description
 * - Hover effect
 * 
 * @example
 * ```tsx
 * <StakeholderCard
 *   icon={Users}
 *   title="Investors & VCs"
 *   description="Market entry opportunities and ROI analysis"
 * />
 * ```
 */

export interface StakeholderCardProps {
  /**
   * Phosphor icon component
   */
  icon: PhosphorIcon;
  
  /**
   * Stakeholder title
   */
  title: string;
  
  /**
   * Stakeholder description
   */
  description: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function StakeholderCard({
  icon: Icon,
  title,
  description,
  className,
}: StakeholderCardProps) {
  return (
    <div
      className={cn(
        'group flex items-start gap-4 p-5 bg-white border border-[var(--black-100)] rounded-[10px]',
        'transition-all duration-300',
        className
      )}
    >
      {/* Icon */}
      <div className="size-11 rounded-xl bg-[var(--purple-100)] flex items-center justify-center shrink-0">
        <Icon size={20} weight="regular" className="text-[var(--purple-500)]" />
      </div>
      
      {/* Content */}
      <div className="flex-1">
        <h4 className="text-base font-bold text-foreground mb-1">
          {title}
        </h4>
        <p className="text-sm leading-relaxed text-[var(--black-500)]">
          {description}
        </p>
      </div>
    </div>
  );
}