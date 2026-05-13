/**
 * FeaturedReportCard Component
 * 
 * A promotional card for featured reports/resources in the resources dropdown.
 * Uses tooltip approach for handling long titles - truncates with ellipsis and shows full title on hover.
 * 
 * @component
 * @example
 * ```tsx
 * <FeaturedReportCard 
 *   resourceType="White Paper"
 *   title="2024 Global Market Outlook"
 *   description="Key trends shaping industries worldwide"
 * />
 * ```
 * 
 * Features:
 * - Resource type badge (Blog, White Paper, Case Study, etc.) with shimmer effect
 * - Light background (#fcfcfc) with subtle border and shadow
 * - Truncated title with tooltip on hover for long titles
 * - Heading, description, and gradient CTA
 * - Matches design system styling
 * 
 * Design Specifications:
 * - Background: #fcfcfc
 * - Border: 0.5px rgba(20,16,22,0.1)
 * - Shadow: 0px 1px 16px 0px rgba(128,108,224,0.2)
 * - Padding: 24px
 * - Gap: 8px between elements
 * - Badge: 10px DM Sans, light purple gradient with shimmer (featured) or neutral grey (default)
 * - Title: 16px DM Sans Medium, black, line-height 24px
 * - Description: 12px DM Sans Regular, black, line-height 18px
 * - CTA: Gradient link (red)
 */

import { GradientCTA } from './GradientCTA';
import { Badge } from './ui/Badge';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface FeaturedReportCardProps {
  /** Type of resource (Blog, White Paper, Case Study, etc.) */
  resourceType?: string;
  /** Title of the featured resource */
  title?: string;
  /** Short description */
  description?: string;
  /** CTA text */
  ctaText?: string;
  /** Link URL */
  href?: string;
}

export function FeaturedReportCard({
  resourceType = 'White Paper',
  title = '2024 Global Market Outlook',
  description = 'Key trends shaping industries worldwide',
  ctaText = 'Read more',
  href = '/resources/2024-global-market-entry'
}: FeaturedReportCardProps) {
  // Determine if this badge should use featured/latest variant with shimmer (LATEST or CASE STUDY)
  const isFeaturedBadge = resourceType.toUpperCase() === 'LATEST' || resourceType.toUpperCase() === 'CASE STUDY';
  
  return (
    <div className="bg-[#fcfcfc] relative rounded-[15px] shrink-0 w-full">
      {/* Border and Shadow Overlay */}
      <div 
        aria-hidden="true" 
        className="absolute border-[0.5px] border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[15px] shadow-[0px_1px_16px_0px_rgba(128,108,224,0.2)]" 
      />
      
      {/* Content - Keep original padding */}
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[24px] relative w-full">
        
        {/* Badge */}
        <div className="mb-[2px]">
          <Badge variant={isFeaturedBadge ? 'latest' : 'neutral'}>{resourceType}</Badge>
        </div>

        {/* Title with Tooltip - Truncated with Ellipsis */}
        <div className="flex flex-col items-start relative shrink-0 w-full">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-start relative shrink-0 w-full cursor-help">
                <div 
                  className="flex flex-col font-nav font-medium justify-center leading-[0] relative shrink-0 text-black w-full"
                  style={{ 
                    fontSize: 'var(--nav-featured-title)',
                    lineHeight: 'var(--nav-lh-featured)',
                    fontVariationSettings: "'opsz' 14" 
                  }}
                >
                  <p className="truncate w-full" style={{ lineHeight: 'var(--nav-lh-featured)' }}>{title}</p>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent 
              side="top" 
              className="max-w-[300px] bg-black text-white font-nav px-[12px] py-[8px] rounded-[8px] shadow-lg"
              style={{ fontSize: 'var(--nav-menu-item)', lineHeight: 'var(--nav-lh-menu)' }}
            >
              {title}
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Description */}
        <div className="flex flex-col items-start relative shrink-0 w-full">
          <div 
            className="flex flex-col font-nav font-normal justify-center leading-[0] relative shrink-0 text-black w-full"
            style={{ 
              fontSize: 'var(--nav-featured-desc)',
              lineHeight: 'var(--nav-lh-menu)',
              fontVariationSettings: "'opsz' 9" 
            }}
          >
            <p className="whitespace-pre-wrap" style={{ lineHeight: 'var(--nav-lh-menu)' }}>{description}</p>
          </div>
        </div>

        {/* CTA */}
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