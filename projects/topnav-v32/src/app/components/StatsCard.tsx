/**
 * StatsCard Component
 * 
 * A promotional stats card for displaying key metrics (like "10 Lac+ Reports").
 * Similar structure to FeaturedReportCard but with a light purple background.
 * 
 * @component
 * @example
 * ```tsx
 * <StatsCard 
 *   title="10 Lac+ Reports"
 *   description="Access comprehensive market research across 14+ industries worldwide"
 *   ctaText="Explore all reports"
 *   href="/reports/all"
 * />
 * ```
 * 
 * Features:
 * - Light purple background with subtle gradient
 * - Featured card title size for stats (16px from design system)
 * - Description text uses design system tokens (13px)
 * - Red gradient CTA link (13px from design system)
 * - Matches design system styling
 * 
 * Design Specifications:
 * - Background: Light purple gradient
 * - Border: Subtle purple border
 * - Padding: 24px
 * - Gap: 12px between elements
 * - Title: var(--nav-featured-title) = 16px, DM Sans Bold
 * - Description: var(--nav-featured-desc) = 13px, DM Sans Regular
 * - CTA: var(--nav-cta-text) = 13px, Gradient link
 */

import { GradientCTA } from './GradientCTA';

interface StatsCardProps {
  /** Main title/statistic */
  title?: string;
  /** Description text */
  description?: string;
  /** CTA text */
  ctaText?: string;
  /** Link URL */
  href?: string;
}

export function StatsCard({
  title = '10 Lac+ Reports',
  description = 'Access comprehensive market research across 14+ industries worldwide',
  ctaText = 'Explore all reports',
  href = '/reports/all'
}: StatsCardProps) {
  return (
    <div 
      className="relative rounded-[16px] w-full"
      style={{
        background: 'linear-gradient(135deg, rgba(245, 243, 255, 0.6) 0%, rgba(255, 255, 255, 0.95) 100%)',
      }}
    >
      {/* Border Overlay */}
      <div 
        aria-hidden="true" 
        className="absolute border border-[rgba(128,108,224,0.12)] inset-0 pointer-events-none rounded-[16px]" 
      />
      
      {/* Content */}
      <div className="flex flex-col gap-[12px] items-start p-[24px] relative w-full">
        
        {/* Title - FIXED: Using design system token */}
        <h3 
          className="font-nav font-bold text-[#141016] w-full"
          style={{ 
            fontSize: 'var(--nav-featured-title)',      /* 16px from design system */
            lineHeight: 'var(--nav-lh-featured)',        /* 1.375 = 22px at 16px */
            fontVariationSettings: "'opsz' 9" 
          }}
        >
          {title}
        </h3>

        {/* Description - FIXED: Using design system token */}
        <p 
          className="font-nav font-normal text-[#656565] w-full"
          style={{ 
            fontSize: 'var(--nav-featured-desc)',        /* 13px from design system */
            lineHeight: 'var(--nav-lh-menu)',            /* 1.38 = 18px at 13px */
            fontVariationSettings: "'opsz' 9" 
          }}
        >
          {description}
        </p>

        {/* CTA - Already using design system through GradientCTA */}
        <div className="flex flex-col items-start relative shrink-0">
          <GradientCTA 
            text={ctaText} 
            href={href}
            className="font-medium"
          />
        </div>
      </div>
    </div>
  );
}