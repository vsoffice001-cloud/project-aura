import { StatCard } from '@/app/components/ui/stat-card';

/**
 * KP 2.0 Design System - StatCardGroup Component
 * 
 * Displays a group of StatCard components with responsive layout:
 * - Desktop: Horizontal inline layout with dividers
 * - Mobile: 2-column grid layout
 * 
 * @example
 * ```tsx
 * <StatCardGroup
 *   stats={[
 *     { value: "8.5%", label: "GCC Market Share" },
 *     { value: "6.0%", label: "Qatar CAGR" },
 *     { value: "4th", label: "Regional Ranking" }
 *   ]}
 * />
 * ```
 */

export interface StatCardGroupItem {
  /**
   * Main value to display (e.g., "8.5%", "$150M", "4th")
   */
  value: string;
  
  /**
   * Descriptive label for the stat
   */
  label: string;
}

export interface StatCardGroupProps {
  /**
   * Array of stat items to display
   */
  stats: StatCardGroupItem[];
  
  /**
   * Additional CSS classes for the container
   */
  className?: string;
}

export function StatCardGroup({ stats, className = '' }: StatCardGroupProps) {
  return (
    <>
      {/* Desktop Stats - Inline with dividers */}
      <div className={`hidden md:flex items-baseline gap-8 ${className}`}>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            variant="inline"
            value={stat.value}
            label={stat.label}
            valueSize="xl"
            showDivider={index < stats.length - 1}
          />
        ))}
      </div>

      {/* Mobile Stats - 2-column grid */}
      <div className={`grid grid-cols-2 gap-x-8 gap-y-6 md:hidden ${className}`}>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            variant="centered"
            value={stat.value}
            label={stat.label}
            valueSize="lg"
          />
        ))}
      </div>
    </>
  );
}
