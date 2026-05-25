import { cn } from '@/app/components/ui/utils';

/**
 * KP 2.0 Design System - Section Header Component
 * 
 * H2 heading component for section titles.
 * Uses Noto Serif Regular (400) from design system defaults.
 * 
 * @example
 * ```tsx
 * <SectionHeader>Qatar Fresh Herbs Market Overview</SectionHeader>
 * ```
 */

export interface SectionHeaderProps {
  /**
   * Heading text content
   */
  children: React.ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Heading level (defaults to h2)
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function SectionHeader({ 
  children, 
  className,
  as: Component = 'h2'
}: SectionHeaderProps) {
  return (
    <Component className={cn(
      'font-display mt-2 text-3xl leading-tight tracking-tight text-[#171717]',
      className
    )}>
      {children}
    </Component>
  );
}
