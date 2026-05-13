import { ReactNode } from 'react';
import { cn } from '@/app/components/ui/utils';

/**
 * KP 2.0 Design System - Text Card Component
 * 
 * Card component for displaying text content with optional icon, bottom statistics grid.
 * Ideal for outlook sections, summaries, or text-heavy content blocks.
 * 
 * ⚠️ DESIGN SYSTEM RULE: This component ALWAYS uses DM Sans font family.
 * Noto Serif is reserved ONLY for h1-h6 headings. All text in this component
 * (title, paragraphs, stats) uses DM Sans.
 * 
 * VARIANTS:
 * - Without Icon: Standard text card with title and content
 * - With Icon: Includes icon container with periwinkle background
 * 
 * @example Without Icon
 * ```tsx
 * <TextCard 
 *   title="Future Outlook"
 *   paragraphs={[
 *     "The future of the Qatar fresh herbs market...",
 *     "Advancements in agricultural technology..."
 *   ]}
 *   stats={[
 *     { value: "6.0%", label: "Forecast CAGR", isPrimary: true },
 *     { value: "$213 Mn", label: "2030 Projection" }
 *   ]}
 * />
 * ```
 * 
 * @example With Icon
 * ```tsx
 * <TextCard 
 *   icon={<TrendUp weight="regular" className="h-5 w-5 text-[var(--purple-500)]" />}
 *   title="Historical Performance"
 *   paragraphs={["The market demonstrated steady growth..."]}
 * />
 * ```
 */

export interface TextCardStat {
  /**
   * Stat value (e.g., "6.0%", "$213 Mn")
   */
  value: string | number;
  
  /**
   * Stat label (e.g., "Forecast CAGR")
   */
  label: string;
  
  /**
   * Use primary color (periwinkle) for value
   * @default false
   */
  isPrimary?: boolean;
}

export interface TextCardProps {
  /**
   * Card title
   */
  title: string;
  
  /**
   * Array of paragraph texts
   */
  paragraphs: string[];
  
  /**
   * Optional icon element to display before title
   * When provided, icon will be rendered in a periwinkle background container
   */
  icon?: ReactNode;
  
  /**
   * Optional statistics to display at bottom
   */
  stats?: TextCardStat[];
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Custom content to render instead of paragraphs
   */
  children?: ReactNode;
}

export function TextCard({ 
  title, 
  paragraphs, 
  icon,
  stats, 
  className,
  children 
}: TextCardProps) {
  return (
    <div className={cn(
      'border border-[var(--black-200)] bg-white rounded-[var(--radius-md)] hover:shadow-[var(--shadow-brand-periwinkle)] transition-all duration-300',
      className
    )}>
      {/* Card Header */}
      <div className="px-6 pt-6 pb-4">
        {icon && (
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center bg-[var(--purple-100)]">
              {icon}
            </div>
          </div>
        )}
        
        <h3>
          {title}
        </h3>
      </div>

      {/* Card Content */}
      <div className="px-6 pb-6">
        {children ? (
          children
        ) : (
          paragraphs.map((paragraph, index) => (
            <p 
              key={index} 
              className={cn(
                'text-base leading-relaxed text-[var(--black-600)]',
                index < paragraphs.length - 1 && 'mb-4',
                index === paragraphs.length - 1 && stats && 'mb-6'
              )}
            >
              {paragraph}
            </p>
          ))
        )}

        {/* Statistics Grid */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-[var(--black-200)]">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className={cn(
                  'text-[26px] font-bold',
                  stat.isPrimary ? 'text-[var(--purple-500)]' : 'text-[var(--black-900)]'
                )}>
                  {stat.value}
                </p>
                <p className="text-[14px] text-[var(--black-600)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}