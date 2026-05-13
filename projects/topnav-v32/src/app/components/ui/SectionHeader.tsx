/**
 * SectionHeader Component
 * 
 * A consistent header for content sections with optional CTA link.
 * Used to divide content areas with clear labels and actions.
 * Supports optional icons for visual categorization.
 * 
 * @component
 * @example
 * ```tsx
 * <SectionHeader title="Consulting Services" />
 * <SectionHeader 
 *   title="Survey" 
 *   icon={<LightbulbIcon />}
 *   ctaText="Explore Survey" 
 *   ctaHref="#survey" 
 * />
 * ```
 * 
 * Features:
 * - Uppercase label styling
 * - Optional icon before title
 * - Optional gradient CTA link on right
 * - Flex layout with space-between
 * - Consistent typography from design system
 * - Proper icon optical alignment
 * 
 * Design Specifications (Updated - Option 1):
 * - Title: 11px DM Sans Semibold (600), #999999, uppercase
 * - Line height: 14px (1.27 at 11px)
 * - Letter spacing: 0.08em (increased for readability)
 * - Icon: 16px, same color as title (#999999)
 * - Gap: 6px between icon and title
 * - Layout: Flexbox with justify-between
 * - Margin bottom: 12px (default, can be overridden)
 * - Icon alignment: Optical adjustment with translate-y-[1px]
 * 
 * Hierarchy:
 * - Section headers: Smaller (11px), lighter (#999), non-interactive labels
 * - Menu items: Larger (13px), darker (#656565 → #141016), interactive
 */

import { GradientCTA } from '../GradientCTA';

interface SectionHeaderProps {
  /** The section title text (will be displayed in uppercase) */
  title: string;
  /** Optional icon element to display before title */
  icon?: React.ReactNode;
  /** Optional CTA link text */
  ctaText?: string;
  /** Optional CTA link href */
  ctaHref?: string;
  /** Custom CSS classes */
  className?: string;
}

export function SectionHeader({ 
  title,
  icon,
  ctaText, 
  ctaHref = '#',
  className = 'mb-[12px]'
}: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-[6px]">
        {icon && (
          <div className="text-[#999999] flex items-center translate-y-[1px]">
            {icon}
          </div>
        )}
        <h3 
          className="font-nav uppercase"
          style={{ 
            fontSize: 'var(--nav-section-header)',
            lineHeight: 'var(--nav-lh-header)',
            letterSpacing: 'var(--nav-ls-normal)',
            fontVariationSettings: "'opsz' 14",
            fontWeight: 600,
            color: '#999999'
          }}
        >
          {title}
        </h3>
      </div>
      {ctaText && (
        <GradientCTA href={ctaHref} text={ctaText} />
      )}
    </div>
  );
}