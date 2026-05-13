import { ReactNode } from 'react';
import { cn } from '@/app/components/ui/utils';

/**
 * KP 2.0 Design System - Body Text Component
 * 
 * Standardized paragraph component with consistent typography and spacing.
 * Uses DM Sans font family and design system text color tokens.
 * 
 * @example
 * ```tsx
 * <BodyText spacing="first">
 *   The Qatar Fresh Herbs Market is valued at $150 million...
 * </BodyText>
 * <BodyText>
 *   Doha is the dominant city in the market...
 * </BodyText>
 * ```
 */

export interface BodyTextProps {
  /**
   * Text content to display
   */
  children: ReactNode;
  
  /**
   * Spacing variant - 'first' for first paragraph (mt-6), 'default' for others (mt-4)
   * @default 'default'
   */
  spacing?: 'first' | 'default';
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function BodyText({ 
  children, 
  className,
  spacing = 'default'
}: BodyTextProps) {
  return (
    <p className={cn(
      'text-base leading-relaxed text-black-500',
      spacing === 'first' ? 'mt-6' : 'mt-4',
      className
    )}>
      {children}
    </p>
  );
}
