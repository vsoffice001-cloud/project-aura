/**
 * CTABanner — Organism (cross-pillar)
 *
 * Reusable bottom CTA section for Product pages.
 * Centered layout with SectionHeading + primary/secondary button pair.
 *
 * Structure: SectionWrapper(black) → SectionHeading(center) → Button row
 */
import type { ReactNode } from 'react';
import { SectionWrapper } from '@/app/components/SectionWrapper';
import { SectionHeading } from '@/app/components/SectionHeading';
import { Button } from '@/app/components/Button';

export interface CTABannerProps {
  /** SectionHeading label */
  label: string;
  /** SectionHeading title */
  title: string;
  /** SectionHeading subtitle */
  subtitle?: string;
  /** Primary CTA button text */
  primaryText: string;
  /** Primary CTA button icon */
  primaryIcon?: ReactNode;
  /** Whether primary button shows animated arrow */
  primaryShowArrow?: boolean;
  /** Secondary CTA button text */
  secondaryText?: string;
  /** Background color variant */
  background?: 'black' | 'white' | 'warm';
  /** Callback when primary button is clicked */
  onPrimaryClick?: () => void;
  /** Callback when secondary button is clicked */
  onSecondaryClick?: () => void;
  /** Optional extra content rendered below buttons */
  children?: ReactNode;
  /** className for outer wrapper */
  className?: string;
}

export function CTABanner({
  label,
  title,
  subtitle,
  primaryText,
  primaryIcon,
  primaryShowArrow = false,
  secondaryText,
  background = 'black',
  onPrimaryClick,
  onSecondaryClick,
  children,
  className,
}: CTABannerProps) {
  return (
    <SectionWrapper background={background} spacing="lg" maxWidth="wide" className={className}>
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8 text-center">
        <SectionHeading
          label={label}
          title={title}
          subtitle={subtitle}
          align="center"
          level={2}
        />
        <div className="mt-8 flex justify-center gap-4">
          <Button variant="primary" size="lg" icon={primaryIcon} showArrow={primaryShowArrow} onClick={onPrimaryClick}>
            {primaryText}
          </Button>
          {secondaryText && (
            <Button variant="secondary" size="lg" onClick={onSecondaryClick}>
              {secondaryText}
            </Button>
          )}
        </div>
        {children && <div className="mt-6">{children}</div>}
      </div>
    </SectionWrapper>
  );
}