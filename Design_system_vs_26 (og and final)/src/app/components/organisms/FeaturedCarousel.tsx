/**
 * FeaturedCarousel — Organism (cross-pillar)
 *
 * Reusable "featured items" section with SectionHeading + HorizontalScroll carousel.
 * Accepts any card as children, so both pillars can use it with their own card components.
 *
 * Structure: SectionWrapper(white) → SectionHeading(label+title+subtitle+endSlot) → HorizontalScroll → children
 */
import type { ReactNode } from 'react';
import { SectionWrapper } from '@/app/components/SectionWrapper';
import { SectionHeading } from '@/app/components/SectionHeading';
import { CTALink } from '@/app/components/CTALink';
import { HorizontalScroll } from '@/app/components/molecules';

export interface FeaturedCarouselProps {
  /** SectionHeading label */
  label: string;
  /** SectionHeading title */
  title: string;
  /** SectionHeading subtitle */
  subtitle?: string;
  /** CTA link text (rendered in endSlot) */
  ctaText?: string;
  /** Background color variant */
  background?: 'white' | 'warm' | 'black';
  /** Width of each carousel item */
  itemWidth?: number;
  /** Carousel items — each should be a card component */
  children: ReactNode;
  /** className for outer wrapper */
  className?: string;
}

export function FeaturedCarousel({
  label,
  title,
  subtitle,
  ctaText = 'View all',
  background = 'white',
  children,
  className,
}: FeaturedCarouselProps) {
  return (
    <SectionWrapper background={background} spacing="lg" maxWidth="wide" className={className}>
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeading
          label={label}
          title={title}
          subtitle={subtitle}
          endSlot={
            ctaText ? (
              <CTALink href="#">
                {ctaText}
              </CTALink>
            ) : undefined
          }
        />
        <div className="mt-8">
          <HorizontalScroll>
            {children}
          </HorizontalScroll>
        </div>
      </div>
    </SectionWrapper>
  );
}