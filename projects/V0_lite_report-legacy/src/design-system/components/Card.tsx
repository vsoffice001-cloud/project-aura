import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'white' | 'warm' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  shadow?: 'sm' | 'md' | 'lg' | 'none';
}

/**
 * Reusable Card Component
 * Follows design system border radius and spacing
 * 
 * Border Radius: 10px (large) for big cards
 * Shadow System: 3 levels
 */
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
    sm: 'p-4',    // 16px
    md: 'p-6',    // 24px
    lg: 'p-8',    // 32px
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-[0_1px_2px_rgba(0,0,0,0.05)]',
    md: 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]',
    lg: 'shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]',
  };

  const hoverClass = hover ? 'transition-all duration-300 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.15)] hover:-translate-y-0.5' : '';

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
