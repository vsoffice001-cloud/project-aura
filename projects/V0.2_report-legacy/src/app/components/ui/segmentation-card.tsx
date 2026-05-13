import { ReactNode } from 'react';
import { cn } from '@/app/components/ui/utils';
import { Icon as PhosphorIcon } from '@phosphor-icons/react';

/**
 * KP 2.0 Design System - Segmentation Card Component
 * 
 * Reusable card component for displaying market segmentation data with:
 * - Icon with purple background
 * - Title and description
 * - List of items with percentage shares
 * - Animated progress bars
 * - Optional CAGR indicators
 * 
 * Used extensively in SegmentationSection for herb types, customer types,
 * distribution channels, packaging, geographic distribution, cultivation methods, etc.
 * 
 * @example
 * ```tsx
 * <SegmentationCard
 *   icon={ChartPie}
 *   title="Product Type"
 *   description="By Herb Varieties"
 *   items={[
 *     { name: 'Mint', share: 25, cagr: '7.2%' },
 *     { name: 'Parsley', share: 20, cagr: '5.5%' }
 *   ]}
 * />
 * ```
 */

export interface SegmentationItem {
  /**
   * Item name (e.g., "Mint", "Retail Consumers")
   */
  name: string;
  
  /**
   * Market share percentage (0-100)
   */
  share: number;
  
  /**
   * Optional CAGR growth rate (e.g., "7.2%")
   */
  cagr?: string;
  
  /**
   * Optional description text
   */
  description?: string;
}

export interface SegmentationCardProps {
  /**
   * Icon component (Phosphor icon)
   */
  icon: PhosphorIcon;
  
  /**
   * Card title
   */
  title: string;
  
  /**
   * Card description/subtitle
   */
  description?: string;
  
  /**
   * Array of segmentation items
   */
  items: SegmentationItem[];
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Maximum percentage for progress bar scale
   * @default 100
   */
  maxPercentage?: number;
}

export function SegmentationCard({
  icon: Icon,
  title,
  description,
  items,
  className,
  maxPercentage = 100,
}: SegmentationCardProps) {
  return (
    <div 
      className={cn(
        'h-full p-4 bg-white border border-[var(--black-200)] rounded-[var(--radius-md)]',
        'hover:shadow-[var(--shadow-brand-purple)] transition-shadow duration-300',
        className
      )}
    >
      {/* Card Header */}
      <div className="size-10 mb-4 rounded-lg flex items-center justify-center bg-[var(--purple-100)]">
        <Icon size={20} weight="regular" className="text-[var(--purple-500)]" />
      </div>
      
      {/* Title & Description */}
      <h3 className="text-lg text-[var(--black-900)] mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-[var(--black-500)] mb-4">
          {description}
        </p>
      )}
      
      {/* Segmentation Items */}
      <div className="space-y-4 mt-6">
        {items.map((item, index) => (
          <div key={index}>
            {/* Item Header */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[var(--black-900)]">
                    {item.name}
                  </span>
                  {item.cagr && (
                    <span className="text-xs text-[var(--black-500)]">
                      ({item.cagr})
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-xs text-[var(--black-500)] mt-0.5">
                    {item.description}
                  </p>
                )}
              </div>
              <span className="text-sm font-bold text-[var(--black-900)] ml-2">
                {item.share}%
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-[var(--black-100)] rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out bg-[var(--purple-300)]"
                style={{ width: `${(item.share / maxPercentage) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}