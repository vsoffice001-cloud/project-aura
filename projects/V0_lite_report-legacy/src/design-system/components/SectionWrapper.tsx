import { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  background?: 'white' | 'warm' | 'black' | 'periwinkle' | 'coral';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: 'content' | 'wide' | 'full';
  className?: string;
  id?: string;
}

/**
 * Reusable Section Wrapper Component
 * Provides consistent padding, spacing, and max-width
 * Follows 92% foundation color usage (black/white/warm)
 * 
 * Spacing scale (responsive: mobile / desktop):
 * - sm: 32px / 48px
 * - md: 40px / 64px
 * - lg: 48px / 80px
 * - xl: 64px / 96px
 *
 * Override pattern:
 * Some sections need to suppress wrapper padding for edge-to-edge layout
 * (e.g. SampleReportPreview uses `!py-0` so the sidebar's vertical
 * border-r runs the full section height without padding gaps). In these
 * cases the section's internal content area must add its own compensating
 * padding (e.g. `py-10 sm:py-12 md:py-16`).
 */
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
    sm: 'py-8 md:py-12',    // 32px / 48px
    md: 'py-10 md:py-16',   // 40px / 64px
    lg: 'py-12 md:py-20',   // 48px / 80px
    xl: 'py-16 md:py-24',   // 64px / 96px
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