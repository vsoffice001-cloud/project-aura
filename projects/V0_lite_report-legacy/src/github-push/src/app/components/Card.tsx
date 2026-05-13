import { ReactNode } from 'react';

/**
 * Card Component
 * 
 * Generic content container with consistent border-radius, shadow,
 * padding, and optional hover lift. Used for any bounded content
 * block within a section.
 * 
 * Border Radius: always 10px (large tier — cards/containers)
 * Variants: white (default), warm (#f5f2f1), outlined (transparent)
 * Shadow: 3 levels (sm, md, lg) or none
 * 
 * @param children - Card content
 * @param variant - Background: 'white' | 'warm' | 'outlined'
 * @param padding - Internal spacing: 'sm' (16px) | 'md' (24px) | 'lg' (32px)
 * @param shadow - Elevation: 'none' | 'sm' | 'md' | 'lg'
 * @param hover - Enable lift animation on hover
 * @param className - Additional CSS classes
 * 
 * @example
 * ```tsx
 * <Card variant="white" padding="lg" shadow="sm" hover>
 *   <h3>Feature Title</h3>
 *   <p>Description text...</p>
 * </Card>
 * ```
 */

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'white' | 'warm' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  shadow?: 'sm' | 'md' | 'lg' | 'none';
}

export function Card({ 
  children, 
  className = '', 
  variant = 'white',
  padding = 'md',
  hover = false,
  shadow = 'md'
}: CardProps) {
  const variantClasses = {
    white: 'bg-white border border-[#e5e5e5]',
    warm: 'bg-[#f5f2f1] border border-[#eae5e3]',
    outlined: 'bg-transparent border border-[#e5e5e5]',
  };

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-[0_1px_2px_rgba(0,0,0,0.05)]',
    md: 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]',
    lg: 'shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]',
  };

  const hoverClass = hover 
    ? 'transition-all duration-300 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.15)] hover:-translate-y-0.5' 
    : '';

  return (
    <div 
      className={`
        rounded-[10px] 
        ${variantClasses[variant]} 
        ${paddingClasses[padding]} 
        ${shadowClasses[shadow]}
        ${hoverClass}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
