import { ReactNode } from 'react';
import { CTALink } from './CTALink';

/**
 * SectionHeading — Ken Bold DS v3.4
 *
 * Clean section header with generous whitespace and editorial feel.
 * Supports semantic heading levels (h1/h2/h3) via `level` prop.
 */

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  label?: string;
  action?: { text: string; onClick?: () => void };
  spacing?: 'default' | 'compact';
  align?: 'left' | 'center';
  maxWidth?: 'xl' | 'lg' | 'none';
  /** Semantic heading level: 1 = h1 (hero only), 2 = h2 (default), 3 = h3 (subsection) */
  level?: 1 | 2 | 3;
  children?: ReactNode;
  endSlot?: ReactNode;
  labelEndSlot?: ReactNode;
  labelPulse?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  label,
  action,
  spacing = 'default',
  align = 'left',
  maxWidth = 'none',
  level = 2,
  endSlot,
  labelEndSlot,
  labelPulse,
}: SectionHeadingProps) {
  const spacingClass = spacing === 'compact' ? 'mb-8 md:mb-10' : 'mb-10 md:mb-12';
  const isCenter = align === 'center';
  const widthClass =
    isCenter ? 'max-w-lg' : maxWidth === 'xl' ? 'max-w-xl' : maxWidth === 'lg' ? 'max-w-lg' : '';

  return (
    <div className={`${spacingClass} ${isCenter ? 'text-center' : ''}`}>
      {(label || labelEndSlot) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <p
              className="tracking-[0.15em] uppercase flex items-center gap-2"
              style={{ fontSize: 'var(--text-2xs)', color: 'rgba(0,0,0,0.35)' }}
            >
              {labelPulse && (
                <span
                  className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
                  style={{ background: 'var(--green-500)' }}
                />
              )}
              {label}
            </p>
          )}
          {labelEndSlot && (
            <div className="hidden md:flex">
              {labelEndSlot}
            </div>
          )}
        </div>
      )}
      <div
        className={`flex items-end ${
          isCenter ? 'justify-center' : 'justify-between'
        } gap-6`}
      >
        <div className={widthClass}>
          {(() => {
            const headingStyle = {
              fontFamily: 'var(--font-serif)',
              fontWeight: 'var(--font-weight-normal)' as any,
              fontSize: 'clamp(1.375rem, 3vw, 1.875rem)',
              color: 'rgba(0,0,0,0.88)',
            };
            const headingClass = "leading-[1.1] tracking-[-0.01em]";
            
            if (level === 1) return (
              <h1 className={headingClass} style={headingStyle}>{title}</h1>
            );
            if (level === 3) return (
              <h3 className={headingClass} style={headingStyle}>{title}</h3>
            );
            return (
              <h2 className={headingClass} style={headingStyle}>{title}</h2>
            );
          })()}
          {subtitle && (
            <p
              className={`mt-2 leading-relaxed ${isCenter ? 'mx-auto' : ''}`}
              style={{ fontSize: 'var(--text-nav)', color: 'rgba(0,0,0,0.4)' }}
            >
              {subtitle}
            </p>
          )}
        </div>
        {(action || endSlot) && (
          <div className="flex items-center gap-3 flex-shrink-0">
            {endSlot && (
              <div className="hidden sm:flex">
                {endSlot}
              </div>
            )}
            {action && (
              <div className="flex">
                <CTALink size="md" onClick={action.onClick}>
                  {action.text}
                </CTALink>
              </div>
            )}
          </div>
        )}
      </div>

      {/* labelEndSlot — show below heading on mobile, inline on md+ */}
      {labelEndSlot && (
        <div className="flex md:hidden mt-3">
          {labelEndSlot}
        </div>
      )}
    </div>
  );
}