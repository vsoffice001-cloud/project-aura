/**
 * ServiceCard Component
 * 
 * A reusable card component for displaying service offerings in the navigation mega menu.
 * 
 * @component
 * @example
 * ```tsx
 * <ServiceCard
 *   title="Strategic Consulting"
 *   description="Build self-optimizing campaigns from a single prompt."
 *   badge="Popular"
 * />
 * ```
 * 
 * Features:
 * - Default state: Transparent background, minimal design
 * - Hover state: White background with border and shadow (smooth transition)
 * - Optional badge chip (e.g., "Popular", "New")
 * - Fixed width (250px) with proper spacing
 * - Gradient CTA link with animated arrows
 * 
 * Design Specifications:
 * - Padding: 24px
 * - Border radius: 15px
 * - Title: 20px DM Sans Medium, black, line-height 28px
 * - Description: 12px DM Sans Regular, #656565, line-height 18px
 * - CTA: Gradient link with arrow animation
 * - Badge: Gradient background (#f5f5fd to rgba(163,154,235,0.2)), 10px text
 * - Hover: white bg, 0.5px border rgba(20,16,22,0.1), shadow 0px 1px 30px -5px rgba(128,108,224,0.2)
 */

import { GradientCTA } from './GradientCTA';
import { Badge } from './ui/Badge';

interface ServiceCardProps {
  /** The main title/heading of the service card */
  title: string;
  /** Brief description of the service */
  description: string;
  /** Optional badge text to display in top-right corner (e.g., "Popular", "New") */
  badge?: string;
}

export function ServiceCard({ title, description, badge }: ServiceCardProps) {
  return (
    <div className="relative rounded-[15px] shrink-0 w-[250px] group/card">
      {/* Card Container - background appears on hover */}
      <div className="relative rounded-[15px] group-hover/card:bg-white transition-colors duration-300">
        {/* Content wrapper with overflow control */}
        <div className="overflow-hidden rounded-[inherit] size-full">
          {/* Main Content */}
          <div className="flex flex-col items-start p-[24px] relative w-full">
            {/* Title, Description, CTA Container */}
            <div className="flex flex-col gap-[8px] h-[146px] items-start overflow-hidden relative shrink-0 w-full">
              {/* Title & Description Section */}
              <div className="flex flex-col gap-[8px] h-[120px] items-start overflow-hidden relative shrink-0 w-full">
                {/* Title */}
                <div className="flex flex-col items-start relative shrink-0 w-full">
                  <div 
                    className="flex flex-col font-nav font-medium justify-center leading-[28px] relative shrink-0 text-[20px] text-black w-full whitespace-pre-wrap"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    <p className="mb-0">{title}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col items-start relative shrink-0 w-full">
                  <div 
                    className="flex flex-col font-nav font-normal justify-center leading-[18px] relative shrink-0 text-[#656565] text-[12px] w-full whitespace-pre-wrap"
                    style={{ fontVariationSettings: "'opsz' 9" }}
                  >
                    <p className="mb-0">{description}</p>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col items-start relative shrink-0">
                <div className="flex flex-col items-start relative shrink-0 w-full">
                  <GradientCTA href="#" text="Explore More" />
                </div>
              </div>
            </div>

            {/* Badge - Top Right (absolute positioned) */}
            {badge && (
              <div className="absolute flex flex-col items-start right-[7.62px] top-[8px]">
                <Badge>{badge}</Badge>
              </div>
            )}
          </div>
        </div>

        {/* Border and Shadow Overlay - appears on hover */}
        <div 
          aria-hidden="true" 
          className="absolute border-[0.5px] border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[15px] shadow-[0px_1px_30px_-5px_rgba(128,108,224,0.2)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
        />
      </div>
    </div>
  );
}