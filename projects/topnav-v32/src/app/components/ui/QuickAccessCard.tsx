/**
 * QuickAccessCard Component
 * 
 * A reusable card component for quick access links with icon, title, description,
 * and animated chevron arrow. Used in dropdown menus for featured/quick access sections.
 * 
 * @component
 * @example
 * ```tsx
 * <QuickAccessCard
 *   icon={<FileText className="size-[18px]" strokeWidth={1.5} />}
 *   title="Industry Reports"
 *   description="Browse all reports"
 *   href="/reports/industry"
 * />
 * ```
 * 
 * Features:
 * - Icon container with border
 * - Title and description layout
 * - Right chevron arrow that slides on hover
 * - Purple shadow hover effect
 * - Consistent spacing and typography
 * 
 * Design Specifications:
 * - Background: #fcfcfc → white (hover)
 * - Border: rgba(20,16,22,0.1)
 * - Shadow (hover): shadow-[0px_2px_12px_0px_rgba(128,108,224,0.15)] - Medium shadow for card components
 * - Icon container: 36x36px, white bg, rounded 8px
 * - Title: 14px DM Sans Medium, black
 * - Description: 12px DM Sans Regular, grey
 * - Arrow: 14px chevron, grey → black (hover)
 * - Arrow animation: Translate right 2px
 * - Transition: 200ms
 */

import { ReactNode } from 'react';

interface QuickAccessCardProps {
  /** Icon element to display (e.g., Lucide icon) */
  icon: ReactNode;
  /** Card title text */
  title: string;
  /** Card description text */
  description: string;
  /** Link URL */
  href: string;
  /** Additional CSS classes */
  className?: string;
}

export function QuickAccessCard({
  icon,
  title,
  description,
  href,
  className = '',
}: QuickAccessCardProps) {
  return (
    <a
      href={href}
      className={`group relative flex items-start gap-[12px] p-[14px] bg-[#fcfcfc] rounded-[10px] border border-[rgba(20,16,22,0.1)] hover:bg-white hover:shadow-[0px_2px_12px_0px_rgba(128,108,224,0.15)] transition-all duration-200 ${className}`}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(128,108,224,0.02)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[10px]" />
      
      {/* Icon Container */}
      <div className="relative z-10 flex-shrink-0 size-[36px] flex items-center justify-center rounded-[8px] bg-white border border-[rgba(20,16,22,0.1)]">
        {icon}
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 min-w-0">
        <h4 
          className="font-nav text-[14px] leading-[16.8px] font-medium text-[#141016] mb-[2px]"
          style={{ fontVariationSettings: "'opsz' 9" }}
        >
          {title}
        </h4>
        <p 
          className="font-nav text-[12px] leading-[14.4px] font-normal text-[#656565]"
          style={{ fontVariationSettings: "'opsz' 9" }}
        >
          {description}
        </p>
      </div>

      {/* Chevron Arrow */}
      <svg
        className="relative z-10 flex-shrink-0 size-[14px] text-[#656565] group-hover:translate-x-[2px] group-hover:text-[#141016] transition-all duration-200 mt-[2px]"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          d="M5 11L9 7L5 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}