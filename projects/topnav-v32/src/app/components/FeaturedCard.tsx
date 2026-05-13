/**
 * FeaturedCard Component
 * 
 * A card component for highlighting featured content with a badge label.
 * Used in Resources dropdown and other promotional sections.
 * 
 * Design System:
 * - Typography: DM Sans ('opsz' 9 for body, 14 for labels)
 * - Colors: Very light purple badge with shimmer effect, neutral text
 * - Spacing: 16px internal padding, 12px gaps
 * - Radius: 12px (--radius-lg)
 * - Background: Light gray (#F7F7F7)
 */

import { GradientCTA } from './GradientCTA';

interface FeaturedCardProps {
  /** Badge text (e.g., "LATEST", "NEW", "TRENDING") */
  badge?: string;
  /** Main title of the featured content */
  title: string;
  /** Supporting description text */
  description: string;
  /** Link to the full content */
  href: string;
  /** CTA text (default: "Read more") */
  ctaText?: string;
}

export function FeaturedCard({
  badge,
  title,
  description,
  href,
  ctaText = 'Read more'
}: FeaturedCardProps) {
  return (
    <div 
      className="bg-[#f7f7f7] rounded-[12px] p-[16px] flex flex-col gap-[12px] transition-all duration-300 hover:bg-[#f0f0f0]"
    >
      {/* Badge with Shimmer Effect (if provided) */}
      {badge && (
        <div className="flex">
          <div 
            className="bg-gradient-to-b from-[#faf8ff] to-[#f2efff] px-[8px] py-[4px] rounded-[6px] relative overflow-hidden"
          >
            {/* Shimmer overlay */}
            <div 
              className="absolute inset-0 animate-shimmer"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 20%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.4) 80%, transparent 100%)',
              }}
            />
            
            {/* Badge text */}
            <span 
              className="text-[10px] leading-[12px] font-bold uppercase tracking-wider text-[#4a3a8e] relative z-10"
              style={{ 
                fontVariationSettings: "'opsz' 14"
              }}
            >
              {badge}
            </span>
          </div>
        </div>
      )}

      {/* Title */}
      <h3 
        className="text-[18px] leading-[21.6px] font-bold text-[#141016]"
        style={{ fontVariationSettings: "'opsz' 9" }}
      >
        {title}
      </h3>

      {/* Description */}
      <p 
        className="text-[12px] leading-[14.4px] font-normal text-[#656565]"
        style={{ fontVariationSettings: "'opsz' 9" }}
      >
        {description}
      </p>

      {/* CTA */}
      <div className="mt-[4px]">
        <GradientCTA text={ctaText} href={href} />
      </div>
    </div>
  );
}