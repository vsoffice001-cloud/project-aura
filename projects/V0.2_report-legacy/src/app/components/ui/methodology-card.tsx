import { ReactNode } from 'react';
import { cn } from '@/app/components/ui/utils';
import { LucideIcon } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';

/**
 * KP 2.0 Design System - Methodology Card Component
 * 
 * Used in ResearchMethodology section for displaying research approaches
 * (Desk Research, Primary Research, Validation).
 * 
 * Features:
 * - Purple icon background
 * - Title and description
 * - List of methodology items with chevron icons
 * - Active state styling
 * - Gradient background effect
 * 
 * @example
 * ```tsx
 * <MethodologyCard
 *   icon={Search}
 *   title="Desk Research"
 *   description="Comprehensive secondary research from authoritative sources."
 *   items={[
 *     'Market reports from agricultural associations',
 *     'Government publications on policies'
 *   ]}
 *   isActive={true}
 *   onClick={() => setActiveStep(0)}
 * />
 * ```
 */

export interface MethodologyCardProps {
  /**
   * Lucide icon component
   */
  icon: LucideIcon;
  
  /**
   * Methodology title
   */
  title: string;
  
  /**
   * Methodology description
   */
  description: string;
  
  /**
   * List of methodology items
   */
  items: string[];
  
  /**
   * Active state
   * @default false
   */
  isActive?: boolean;
  
  /**
   * Click handler
   */
  onClick?: () => void;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function MethodologyCard({
  icon: Icon,
  title,
  description,
  items,
  isActive = false,
  onClick,
  className,
}: MethodologyCardProps) {
  return (
    <Card
      className={cn(
        'h-full rounded-lg transition-all duration-300 cursor-pointer group gradient-card-purple',
        isActive
          ? 'shadow-sm hover:shadow-md ring-2 ring-foreground ring-offset-2'
          : 'shadow-sm hover:shadow-md',
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="size-11 rounded-xl bg-[var(--purple-100)] flex items-center justify-center shrink-0">
            <Icon className="size-5 text-[var(--purple-500)]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">
              {title}
            </h3>
            <p className="text-sm text-[var(--black-500)]">
              {description}
            </p>
          </div>
        </div>
        
        {/* Items List */}
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li 
              key={index} 
              className="flex items-start gap-3 text-sm text-[var(--black-500)] group-hover:text-foreground transition-colors"
            >
              <ChevronRight className="h-4 w-4 mt-0.5 shrink-0 text-[var(--purple-500)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}