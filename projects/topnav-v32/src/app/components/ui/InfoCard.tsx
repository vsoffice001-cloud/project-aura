/**
 * InfoCard Component
 * 
 * A unified card component for all content cards across the navigation system.
 * Replaces ServiceCard, QuizCard, ConnectCard, POV's Card, and Case Studies Card.
 * 
 * @component
 * @example
 * ```tsx
 * // Service variant (for ServiceCard)
 * <InfoCard
 *   variant="service"
 *   title="Strategic Consulting"
 *   description="Build self-optimizing campaigns from a single prompt."
 *   ctaText="Explore More"
 *   badge="Popular"
 * />
 * 
 * // Promo variant (for QuizCard, POV's)
 * <InfoCard
 *   variant="promo"
 *   title="Take a quiz"
 *   description="Lets start with the topics you are looking for."
 *   ctaText="Start now"
 *   ctaHref="#quiz"
 * />
 * 
 * // Simple variant (for Case Studies)
 * <InfoCard
 *   variant="simple"
 *   title="Case Studies"
 *   description="See how brands like yours solve real challenges."
 *   ctaText="Explore Partner Stories"
 *   ctaHref="/case-studies"
 * />
 * 
 * // With custom children (for ConnectCard)
 * <InfoCard
 *   variant="promo"
 *   title="Lets Connect and Build"
 *   description="Get daily Dose of Pure Insights."
 *   background="light-gray"
 * >
 *   <Input type="email" placeholder="Enter your Email" />
 *   <GradientButton>Connect now</GradientButton>
 * </InfoCard>
 * ```
 * 
 * Features:
 * - 3 variants: service, promo, simple
 * - Flexible background options
 * - Optional hover states
 * - Badge support
 * - Custom children support
 * - Uses GradientCTA internally
 * - Consistent spacing and typography
 * 
 * Design Specifications:
 * - Border radius: rounded-[15px]
 * - Padding: p-[24px]
 * - Border: 0.5px rgba(20,16,22,0.1)
 * - Gap: gap-[8px] or gap-[16px]
 * - Title: 16-20px DM Sans Medium
 * - Description: 12px DM Sans Regular
 * - CTA: GradientCTA component
 */

import { GradientCTA } from '../GradientCTA';
import { Badge } from './Badge';

type InfoCardVariant = 'service' | 'promo' | 'simple';
type BackgroundColor = 'white' | 'light-gray' | 'lighter-gray' | 'transparent';
type TitleSize = 'sm' | 'md' | 'lg';  // 16px, 18px, 20px

interface InfoCardProps {
  // Content
  /** Card title/heading */
  title: string;
  /** Card description text */
  description: string;
  /** Optional CTA text */
  ctaText?: string;
  /** Optional CTA href */
  ctaHref?: string;
  /** Optional badge text (top-right) */
  badge?: string;
  /** Custom children for forms or additional content */
  children?: React.ReactNode;
  
  // Variant & Styling
  /** Variant determines default styling */
  variant?: InfoCardVariant;
  /** Background color */
  background?: BackgroundColor;
  /** Custom width (default varies by variant) */
  width?: string;
  
  // States & Effects
  /** Whether to show hover state (bg change) */
  hasHoverState?: boolean;
  /** Whether to show shadow on hover */
  hasHoverShadow?: boolean;
  /** Whether to show border */
  hasBorder?: boolean;
  /** Whether to show shadow (always) */
  hasShadow?: boolean;
  
  // Typography
  /** Title font size */
  titleSize?: TitleSize;
  /** Custom description width */
  descriptionWidth?: string;
  /** Gap between elements */
  gap?: 'sm' | 'md';  // 8px or 16px
  
  // Additional
  /** Additional CSS classes */
  className?: string;
  /** Make card clickable */
  onClick?: () => void;
}

export function InfoCard({
  title,
  description,
  ctaText,
  ctaHref = '#',
  badge,
  children,
  variant = 'promo',
  background = getDefaultBackground(variant),
  width = getDefaultWidth(variant),
  hasHoverState = variant === 'service',
  hasHoverShadow = variant === 'promo',
  hasBorder = variant !== 'simple',
  hasShadow = variant === 'promo',
  titleSize = getTitleSize(variant),
  descriptionWidth,
  gap = variant === 'service' ? 'sm' : 'md',
  className = '',
  onClick,
}: InfoCardProps) {
  
  // Determine classes
  const widthClass = width === 'full' ? 'w-full' : width === '250px' ? 'w-[250px]' : width === '209px' ? 'w-[209px]' : 'w-full';
  const bgClass = getBackgroundClass(background, hasHoverState);
  const gapClass = gap === 'sm' ? 'gap-[8px]' : 'gap-[16px]';
  const titleClass = getTitleClass(titleSize);
  const descWidthClass = descriptionWidth === '161px' ? 'w-[161px]' : 'w-full';
  
  // Wrapper for hover effect (service variant)
  const hoverWrapperClass = hasHoverState ? 'group/card' : '';
  const hoverShadowClass = hasHoverShadow ? 'cursor-pointer group' : '';
  
  return (
    <div 
      className={`relative rounded-[15px] shrink-0 ${widthClass} ${hoverWrapperClass} ${hoverShadowClass} ${className}`}
      onClick={onClick}
    >
      {/* Card Container */}
      <div className={`relative rounded-[15px] ${bgClass} transition-all duration-300 ${hasHoverShadow ? 'group-hover:shadow-[0px_1px_16px_0px_rgba(128,108,224,0.2)]' : ''}`}>
        
        {/* Border Overlay */}
        {hasBorder && (
          <div 
            aria-hidden="true" 
            className={`absolute border-[0.5px] border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[15px] ${hasShadow ? 'shadow-[0px_1px_16px_0px_rgba(128,108,224,0.2)]' : ''} ${hasHoverState ? 'shadow-[0px_1px_30px_-5px_rgba(128,108,224,0.2)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300' : ''}`}
          />
        )}
        
        {/* Content */}
        <div className={`relative overflow-hidden rounded-[inherit] size-full`}>
          <div className={`flex flex-col items-start p-[24px] relative w-full ${gapClass}`}>
            {/* Title */}
            <div className="flex flex-col items-start relative shrink-0 w-full">
              <div 
                className={`${titleClass}`}
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                {title}
              </div>
            </div>

            {/* Description */}
            <div className={`flex flex-col items-start relative shrink-0 ${descWidthClass}`}>
              <div 
                className="flex flex-col font-nav font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-black w-full"
                style={{ fontVariationSettings: "'opsz' 9" }}
              >
                <p className="leading-[18px] whitespace-pre-wrap">{description}</p>
              </div>
            </div>

            {/* Children (for custom content like forms) */}
            {children}

            {/* CTA (if provided and no children) */}
            {ctaText && !children && (
              <div className="flex flex-col items-start relative shrink-0">
                <GradientCTA text={ctaText} href={ctaHref} />
              </div>
            )}

            {/* Badge (absolute positioned top-right) */}
            {badge && (
              <div className="absolute flex flex-col items-start right-[7.62px] top-[8px]">
                <Badge>{badge}</Badge>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions

function getDefaultBackground(variant: InfoCardVariant): BackgroundColor {
  switch (variant) {
    case 'service':
      return 'transparent';
    case 'promo':
      return 'lighter-gray';
    case 'simple':
      return 'transparent';
    default:
      return 'transparent';
  }
}

function getDefaultWidth(variant: InfoCardVariant): string {
  switch (variant) {
    case 'service':
      return '250px';
    case 'promo':
      return 'full';
    case 'simple':
      return 'full';
    default:
      return 'full';
  }
}

function getTitleSize(variant: InfoCardVariant): TitleSize {
  switch (variant) {
    case 'service':
      return 'lg';  // 20px
    case 'promo':
      return 'md';  // 16px
    case 'simple':
      return 'md';  // 16px
    default:
      return 'md';
  }
}

function getBackgroundClass(background: BackgroundColor, hasHoverState: boolean): string {
  const bgMap = {
    'white': 'bg-white',
    'light-gray': 'bg-[#f7f7f7]',
    'lighter-gray': 'bg-[#fcfcfc]',
    'transparent': '',
  };
  
  const bgClass = bgMap[background];
  
  // Service variant hover: transparent → white OR lighter-gray → white
  if (hasHoverState) {
    if (background === 'transparent') {
      return 'group-hover/card:bg-white transition-colors duration-300';
    } else if (background === 'lighter-gray') {
      return 'bg-[#fcfcfc] group-hover/card:bg-white transition-colors duration-300';
    }
  }
  
  return bgClass;
}

function getTitleClass(size: TitleSize): string {
  const sizeMap = {
    'sm': 'text-[16px] leading-[24px]',
    'md': 'text-[16px] leading-[24px]',
    'lg': 'text-[20px] leading-[28px]',
  };
  
  return `flex flex-col font-nav font-medium justify-center leading-[0] relative shrink-0 text-black ${sizeMap[size]} whitespace-pre-wrap`;
}