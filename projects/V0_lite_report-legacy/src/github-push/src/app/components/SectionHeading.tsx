import { ReactNode } from 'react';

/**
 * SectionHeading Component
 * 
 * Reusable heading molecule with optional eyebrow text.
 * Enforces Major Third (1.25) typography scale and serif/sans rules.
 * 
 * Typography Scale:
 * - H1: 2.441rem → 3.052rem (Hero only — one per page)
 * - H2: 1.953rem → 2.441rem (Section headings)
 * - H3: 1.563rem → 1.953rem (Subsection headings)
 * 
 * Font Rule: Serif (light) at 1.953rem+; sans (medium) below.
 * H3 switches from sans on mobile to serif on sm+ breakpoint.
 * 
 * @param level - Heading level (1, 2, or 3)
 * @param children - Heading text content
 * @param eyebrow - Optional small text above the heading
 * @param align - Text alignment: 'left' | 'center' | 'right'
 * @param className - Additional CSS classes
 * 
 * @example
 * ```tsx
 * <SectionHeading level={2} eyebrow="MARKET INSIGHTS" align="center">
 *   AI in Healthcare: A $45B Opportunity
 * </SectionHeading>
 * ```
 */

interface SectionHeadingProps {
  level?: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  align?: 'left' | 'center' | 'right';
}

export function SectionHeading({ 
  level = 2, 
  children, 
  className = '', 
  eyebrow,
  align = 'center' 
}: SectionHeadingProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const sizeClasses = {
    1: 'text-[2.441rem] sm:text-[3.052rem] leading-tight',
    2: 'text-[1.953rem] sm:text-[2.441rem] leading-tight',
    3: 'text-[1.563rem] sm:text-[1.953rem] leading-tight',
  };

  const fontClasses = {
    1: 'font-serif font-light',
    2: 'font-serif font-light',
    3: 'font-sans font-medium sm:font-serif sm:font-light',
  };

  return (
    <div className={`${alignClasses[align]} ${className}`}>
      {eyebrow && (
        <p className="text-[0.8rem] uppercase tracking-wider mb-3 text-[#737373] font-sans">
          {eyebrow}
        </p>
      )}
      <HeadingTag className={`${fontClasses[level]} ${sizeClasses[level]}`}>
        {children}
      </HeadingTag>
    </div>
  );
}
