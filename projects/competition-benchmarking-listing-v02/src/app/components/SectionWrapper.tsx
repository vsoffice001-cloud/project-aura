/**
 * SectionWrapper — Ken Bold DS v3.2 Organism
 *
 * Enforces canonical section spacing and background alternation.
 * Clean section transitions — no visible borders between sections.
 *
 * Background pattern:
 *   BLACK (Hero) → WHITE → NEUTRAL-50 → WHITE → NEUTRAL-50 → ... → BLACK (CTA/Footer)
 */

import { ReactNode } from 'react';

export type SectionBg = 'white' | 'neutral50' | 'black' | 'transparent';

interface SectionWrapperProps {
  children: ReactNode;
  bg?: SectionBg;
  className?: string;
  /** Use compact padding for special sections */
  compact?: boolean;
  /** Disable default padding entirely */
  noPadding?: boolean;
  /** HTML id for anchor linking */
  id?: string;
}

const bgStyles: Record<SectionBg, { background: string }> = {
  white: {
    background: '#ffffff',
  },
  neutral50: {
    background: 'var(--warm-200)',
  },
  black: {
    background: '#000000',
  },
  transparent: {
    background: 'transparent',
  },
};

export function SectionWrapper({
  children,
  bg = 'white',
  className = '',
  compact = false,
  noPadding = false,
  id,
}: SectionWrapperProps) {
  const paddingClass = noPadding
    ? ''
    : compact
      ? 'py-8 sm:py-10 md:py-12'
      : 'py-12 sm:py-16 md:py-20';

  const styles = bgStyles[bg];

  return (
    <section
      id={id}
      className={`${paddingClass} ${className}`}
      style={{
        background: styles.background,
      }}
    >
      {children}
    </section>
  );
}