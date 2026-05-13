/**
 * IndustrySidebar — Organism (DS v4.3 · Phase 3 adapter)
 *
 * WHAT: Desktop filter sidebar wrapping SidebarPanel (card variant) + FiltersPanel.
 * WHY:  Composes the sidebar container with header · footer · filter content.
 * WHEN: Left column of the Report Store listing layout (hidden < lg).
 * HOW:  Accepts `filters` state · `regions` · `publishYears` · `catalogTotal` via props.
 *
 * @promotedFrom Design_system_vs_26 OG (DS Port Phase 3, 2026-05-13)
 */
import { SlidersHorizontal, X } from 'lucide-react';
import { Badge } from '../atoms/Badge';
import { SidebarPanel } from '../molecules/SidebarPanel';
import { FiltersPanel } from './FiltersPanel';
import type { ReportFilters, RegionData } from '../types';

export interface IndustrySidebarProps {
  filters: ReportFilters;
  regions: RegionData[];
  publishYears: string[];
  /** Total catalog size shown in footer (e.g. 50000) */
  catalogTotal: number;
}

export function IndustrySidebar({ filters, regions, publishYears, catalogTotal }: IndustrySidebarProps) {
  const { activeFilterCount, clearAllFilters } = filters;

  return (
    <SidebarPanel
      visible={true}
      variant="card"
      width="15rem"
      stickyTop={24}
      header={
        <div className="p-4" style={{ backgroundColor: 'rgba(250,250,250,1)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 flex items-center justify-center"
                style={{
                  borderRadius: 'var(--radius-element)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(0,0,0,0.08)',
                  backgroundColor: 'rgba(255,255,255,1)',
                }}
              >
                <SlidersHorizontal size={14} style={{ color: 'rgba(0,0,0,0.45)' }} />
              </div>
              <h3
                className="uppercase tracking-[0.1em]"
                style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.5)' }}
              >
                Filters
              </h3>
              {activeFilterCount > 0 && (
                <Badge variant="pill" size="xs" theme="neutral" mode="dark">
                  {activeFilterCount}
                </Badge>
              )}
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 transition-colors cursor-pointer"
                style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}
              >
                <X size={12} />
                Clear all
              </button>
            )}
          </div>
        </div>
      }
      footer={
        <div className="p-3">
          <p className="text-center" style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.35)' }}>
            <span className="tabular-nums" style={{ color: 'rgba(0,0,0,0.55)' }}>
              {catalogTotal.toLocaleString()}+
            </span>{' '}
            reports available
          </p>
        </div>
      }
    >
      <FiltersPanel filters={filters} regions={regions} publishYears={publishYears} />
    </SidebarPanel>
  );
}
