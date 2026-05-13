import { ReactNode } from 'react';

/**
 * SectionWrapper Component
 * 
 * Layout wrapper for page sections. Provides consistent background,
 * vertical padding, horizontal padding, and max-width constraints.
 * 
 * Background Alternation: white → warm → white → warm → black (CTA)
 * 
 * Spacing Scale (mobile / desktop):
 * - sm: 32px / 48px
 * - md: 40px / 64px
 * - lg: 48px / 80px (default)
 * - xl: 64px / 96px
 * 
 * Max-width: content (1000px) | wide (1200px, default) | full
 * Responsive padding: px-4 → sm:px-6 → md:px-8
 * 
 * Override: Use className="!py-0" for edge-to-edge layouts (e.g., sidebar
 * sections), then add compensating padding inside child content.
 * 
 * @param children - Section content
 * @param background - Section background color
 * @param spacing - Vertical padding tier
 * @param maxWidth - Content width constraint
 * @param className - Additional CSS classes on the <section>
 * @param id - HTML id for anchor linking
 * 
 * @example
 * ```tsx
 * <SectionWrapper background="warm" spacing="lg" id="highlights">
 *   <SectionHeading level={2}>Report Highlights</SectionHeading>
 *   <div className="grid grid-cols-3 gap-6">...</div>
 * </SectionWrapper>
 * ```
 */

interface SectionWrapperProps {
  children: ReactNode;
  background?: 'white' | 'warm' | 'black' | 'periwinkle' | 'coral';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: 'content' | 'wide' | 'full';
  className?: string;
  id?: string;
}

export function SectionWrapper({ 
  children, 
  background = 'white',
  spacing = 'lg',
  maxWidth = 'wide',
  className = '',
  id
}: SectionWrapperProps) {
  const backgroundClasses = {
    white: 'bg-white text-black',
    warm: 'bg-[#f5f2f1] text-black',
    black: 'bg-black text-white',
    periwinkle: 'bg-[var(--periwinkle-200)] text-black',
    coral: 'bg-[var(--coral-50)] text-black',
  };

  const spacingClasses = {
    sm: 'py-8 md:py-12',
    md: 'py-10 md:py-16',
    lg: 'py-12 md:py-20',
    xl: 'py-16 md:py-24',
  };

  const maxWidthClasses = {
    content: 'max-w-[1000px]',
    wide: 'max-w-[1200px]',
    full: 'max-w-full',
  };

  return (
    <section 
      id={id}
      className={`
        ${backgroundClasses[background]} 
        ${spacingClasses[spacing]}
        ${className}
      `}
    >
      <div className={`
        ${maxWidthClasses[maxWidth]} 
        mx-auto 
        px-4 sm:px-6 md:px-8
      `}>
        {children}
      </div>
    </section>
  );
}
