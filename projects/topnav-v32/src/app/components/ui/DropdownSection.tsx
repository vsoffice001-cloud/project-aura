/**
 * DropdownSection Component
 * 
 * A wrapper component for dropdown sections with header and items.
 * Provides consistent spacing and layout structure.
 * Supports optional icons for visual categorization.
 * 
 * @component
 * @example
 * ```tsx
 * <DropdownSection title="Product Resources" icon={<LightbulbIcon />}>
 *   <DropdownItem icon={<FileCheck />} label="Case Studies" href="..." />
 *   <DropdownItem icon={<FileText />} label="Articles" href="..." />
 * </DropdownSection>
 * 
 * <DropdownSection title="Survey" ctaText="Explore" ctaHref="/survey">
 *   <ServiceCard title="..." />
 * </DropdownSection>
 * ```
 * 
 * Features:
 * - Uses SectionHeader component for consistency
 * - Optional icon before title
 * - Flexible gap configuration
 * - Optional CTA link in header
 * - Flex column layout
 * - Better spacing between header and items
 * 
 * Design Specifications:
 * - Default gap: gap-[12px] between header and items (improved hierarchy)
 * - Uses SectionHeader component (11px uppercase text, #999999)
 * - Icon size: 16px (when provided)
 * - Flex column layout
 */

import { SectionHeader } from './SectionHeader';

interface DropdownSectionProps {
  /** Section title (will be uppercase) */
  title: string;
  /** Optional icon element to display before title */
  icon?: React.ReactNode;
  /** Optional CTA text */
  ctaText?: string;
  /** Optional CTA link */
  ctaHref?: string;
  /** Children items */
  children: React.ReactNode;
  /** Gap between items */
  gap?: string;
  /** Custom flex value for width control */
  flex?: string;
  /** Additional CSS classes */
  className?: string;
}

export function DropdownSection({
  title,
  icon,
  ctaText,
  ctaHref,
  children,
  gap = 'gap-[var(--nav-item-gap)]',
  flex,
  className = '',
}: DropdownSectionProps) {
  const flexClass = flex ? `flex-[${flex}]` : '';
  
  return (
    <div className={`flex flex-col ${flexClass} ${className}`}>
      <SectionHeader 
        title={title}
        icon={icon}
        ctaText={ctaText}
        ctaHref={ctaHref}
        className="mb-[12px]"
      />
      <div className={`flex flex-col ${gap}`}>
        {children}
      </div>
    </div>
  );
}