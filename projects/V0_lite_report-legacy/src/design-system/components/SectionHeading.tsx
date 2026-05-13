import { ReactNode } from 'react';

interface SectionHeadingProps {
  level?: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  align?: 'left' | 'center' | 'right';
}

/**
 * Reusable Section Heading Component
 * Follows design system typography scale
 * 
 * - H1: text-3xl (48.8px) - Hero only
 * - H2: text-[2.25rem] (36px) - Section headings (standardized)
 * - H3: text-xl (31.25px) - Subsection headings
 */
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
    1: 'text-[2.441rem] sm:text-[3.052rem] leading-tight',  // text-3xl - Hero only
    2: 'text-[1.953rem] sm:text-[2.441rem] leading-tight',  // text-2xl - Major Third scale (39px)
    3: 'text-[1.563rem] sm:text-[1.953rem] leading-tight',  // text-xl - Subsection headings
  };

  // font-serif only at XL (1.953rem) and above; font-sans below
  const fontClasses = {
    1: 'font-serif font-light',        // Always ≥ XL → serif
    2: 'font-serif font-light',        // Always ≥ XL → serif
    3: 'font-sans font-medium sm:font-serif sm:font-light', // LG on mobile → sans; XL on sm+ → serif
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