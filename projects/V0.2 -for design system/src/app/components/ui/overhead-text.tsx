import { cn } from '@/app/components/ui/utils';

/**
 * KP 2.0 Design System - Overhead Text Component
 * 
 * Small uppercase label that appears above section headers.
 * Typically used for chapter/category indicators.
 * 
 * @example
 * ```tsx
 * <OverheadText>CHAPTER 1 - INDUSTRY ANALYSIS</OverheadText>
 * ```
 */

export interface OverheadTextProps {
  /**
   * Text content to display
   */
  children: React.ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function OverheadText({ children, className }: OverheadTextProps) {
  return (
    <span className={cn(
      'text-[var(--brand-red)] inline-flex items-center gap-2 text-sm uppercase tracking-widest font-bold',
      className
    )}>
      {children}
    </span>
  );
}
