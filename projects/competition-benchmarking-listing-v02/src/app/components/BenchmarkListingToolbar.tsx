/**
 * BenchmarkListingToolbar — Organism
 * competition-benchmarking-listing-v01
 *
 * Horizontal toolbar: result count + active filter chips + sort dropdown + ViewToggle.
 * Sort default: "Latest first". All labels sentence case.
 */

import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { ViewToggle } from './ViewToggle';
import type { ViewMode } from './ViewToggle';
import { SORT_OPTIONS, type SortOption } from '../../lib/mock-data';

interface Chip {
  label: string;
  onRemove: () => void;
}

interface BenchmarkListingToolbarProps {
  resultCount: number;
  activeChips: Chip[];
  sort: SortOption;
  onSortChange: (v: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (m: ViewMode) => void;
  activeFilterCount: number;
  onOpenMobileFilters: () => void;
  onClearAll: () => void;
}

export function BenchmarkListingToolbar({
  resultCount,
  activeChips,
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
  activeFilterCount,
  onOpenMobileFilters,
  onClearAll,
}: BenchmarkListingToolbarProps) {
  return (
    <div className="flex flex-col gap-3 mb-5">
      {/* Row 1: count + controls */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Result count */}
        <p role="status" aria-live="polite" aria-atomic="true" style={{ fontSize: 'var(--text-nav)', color: 'var(--ink-subtle)' }}>
          <span className="tabular-nums" style={{ color: 'var(--ink-strong)' }}>{resultCount}</span>{' '}
          {resultCount === 1 ? 'report' : 'reports'}
        </p>

        {/* Controls right */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* Mobile filter trigger */}
          <button
            className="lg:hidden inline-flex items-center justify-center relative min-h-[44px] min-w-[44px] p-2 transition-colors"
            style={{ borderRadius: 'var(--radius-element)', border: '1px solid var(--hairline)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--surface-tint-soft)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            onClick={onOpenMobileFilters}
            aria-label="Open filter panel"
          >
            <SlidersHorizontal className="h-4 w-4" style={{ color: 'var(--ink-subtle)' }} />
            {activeFilterCount > 0 && (
              <span
                className="absolute -top-1 -right-1 min-w-4 h-4 px-0.5 rounded-full flex items-center justify-center"
                style={{ fontSize: '9px', background: 'var(--text-primary)', color: 'var(--surface-white)' }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>

          <ViewToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />

          <div className="h-5 w-px hidden sm:block" style={{ background: 'var(--hairline)' }} />

          {/* Sort dropdown */}
          <div className="relative hidden sm:block">
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="appearance-none pl-3 pr-8 py-1.5 cursor-pointer transition-colors"
              style={{
                fontSize: 'var(--text-xs)',
                border: '1px solid var(--hairline)',
                borderRadius: 'var(--radius-element)',
                background: 'var(--surface-white)',
                color: 'var(--ink-body)',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink-body)'; }}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none" style={{ color: 'var(--ink-subtle)' }} />
          </div>
        </div>
      </div>

      {/* Active filter chips moved to BenchmarkActiveFilters component (RS ListingContextBanner Zone B clone), rendered below this toolbar in App.tsx */}
    </div>
  );
}
