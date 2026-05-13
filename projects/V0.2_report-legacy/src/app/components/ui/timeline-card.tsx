import { cn } from '@/app/components/ui/utils';

/**
 * KP 2.0 Design System - Timeline Card Component
 * 
 * Simple centered card for displaying timeline/period information.
 * Features gray background with hover effect.
 * 
 * @example
 * ```tsx
 * <TimelineCard 
 *   label="Base Year"
 *   value="2024"
 * />
 * ```
 */

export interface TimelineCardProps {
  /**
   * Label text (e.g., "Base Year", "Historical Period")
   */
  label: string;
  
  /**
   * Value to display (e.g., "2024", "2019-2024", "4.6%")
   */
  value: string | number;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function TimelineCard({ label, value, className }: TimelineCardProps) {
  return (
    <div className={cn(
      'rounded-[10px] border border-[#f5f5f5] bg-[#fafafa] hover:bg-[#f5f5f5] transition-colors duration-300',
      className
    )}>
      <div className="p-4 text-center">
        <p className="text-[14px] mb-1 text-[#737373]">
          {label}
        </p>
        <p className="text-[26px] font-bold text-[#171717]">
          {value}
        </p>
      </div>
    </div>
  );
}
