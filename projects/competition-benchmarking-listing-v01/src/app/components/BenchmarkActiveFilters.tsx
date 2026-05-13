/**
 * BenchmarkActiveFilters — Active filter chips strip
 * competition-benchmarking-listing-v01
 *
 * Mirrors RS-v07 `ListingContextBanner` Zone B (active-filter chips strip) verbatim.
 * Renders ABOVE the card listing whenever any filter is active.
 * Color-coded chips per filter type. Each chip has TYPE label + VALUE + ✕ removal button.
 *
 * RS canonical:
 *   - Container: light grey bg (rgba(0,0,0,0.015) or 0.02), 1px border, 10px radius
 *   - "N filter(s)" label uppercase tracking-[0.06em] muted
 *   - Vertical separator (1px × 16px)
 *   - Chips inline-wrapping, each: TYPE pill (small uppercase) + value + ✕ button (4×4 round)
 *   - Right side: Clear all button (only when >1 active)
 *
 * Empty state: render nothing.
 */

import { X } from 'lucide-react';

export type FilterChipType = 'search' | 'industry' | 'tag' | 'region' | 'country' | 'size' | 'methodology' | 'year';

export interface FilterChipData {
  type: FilterChipType;
  label: string;
  value: string;
  onRemove: () => void;
}

const chipStyles: Record<FilterChipType, { bg: string; border: string }> = {
  search:      { bg: 'rgba(0,0,0,0.04)',          border: 'rgba(0,0,0,0.10)' },
  industry:    { bg: 'rgba(176,31,36,0.06)',      border: 'rgba(176,31,36,0.16)' },   // brand red — primary dimension
  tag:         { bg: 'rgba(16,185,129,0.06)',     border: 'rgba(16,185,129,0.14)' },   // emerald
  region:      { bg: 'rgba(134,179,229,0.06)',    border: 'rgba(134,179,229,0.14)' },  // blue
  country:     { bg: 'rgba(245,158,11,0.06)',     border: 'rgba(245,158,11,0.14)' },   // amber
  size:        { bg: 'rgba(128,108,224,0.06)',    border: 'rgba(128,108,224,0.14)' },  // purple
  methodology: { bg: 'rgba(99,102,241,0.06)',     border: 'rgba(99,102,241,0.14)' },   // indigo
  year:        { bg: 'rgba(0,0,0,0.04)',          border: 'rgba(0,0,0,0.10)' },        // neutral
};

const chipLabels: Record<FilterChipType, string> = {
  search: 'Search',
  industry: 'Industry',
  tag: 'Tag',
  region: 'Region',
  country: 'Country',
  size: 'Set Size',
  methodology: 'Methodology',
  year: 'Year',
};

function FilterChip({ chip }: { chip: FilterChipData }) {
  const style = chipStyles[chip.type];
  return (
    <span
      className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 transition-all"
      style={{
        fontSize: 'var(--text-2xs)',
        background: style.bg,
        border: `1px solid ${style.border}`,
        borderRadius: 'var(--radius-element)',
        color: 'rgba(0,0,0,0.7)',
      }}
    >
      <span
        className="uppercase tracking-[0.05em] flex-shrink-0"
        style={{ fontSize: 'var(--badge-xs-font, 10px)', color: 'rgba(0,0,0,0.3)' }}
      >
        {chipLabels[chip.type]}
      </span>
      <span className="truncate" style={{ maxWidth: '180px' }}>
        {chip.label}
      </span>
      <button
        className="flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-full transition-all ml-0.5"
        style={{ background: 'rgba(0,0,0,0.06)' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.15)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.06)'; }}
        onClick={(e) => {
          e.stopPropagation();
          chip.onRemove();
        }}
        aria-label={`Remove ${chipLabels[chip.type]}: ${chip.label}`}
      >
        <X className="h-2.5 w-2.5" color="rgba(0,0,0,0.45)" />
      </button>
    </span>
  );
}

export interface BenchmarkActiveFiltersProps {
  industries: string[];
  tags: string[];
  regions: string[];
  countries: string[];
  competitorSetSizes: string[];
  methodologies: string[];
  years: string[];
  searchQuery: string;
  /** Display-label translator for methodology keys (e.g. mystery-shopping → Mystery shopping) */
  methodologyLabels?: Record<string, string>;
  onRemoveIndustry: (v: string) => void;
  onRemoveTag: (v: string) => void;
  onRemoveRegion: (v: string) => void;
  onRemoveCountry: (v: string) => void;
  onRemoveSize: (v: string) => void;
  onRemoveMethodology: (v: string) => void;
  onRemoveYear: (v: string) => void;
  onRemoveSearch: () => void;
  onClearAll: () => void;
}

export function BenchmarkActiveFilters({
  industries,
  tags,
  regions,
  countries,
  competitorSetSizes,
  methodologies,
  years,
  searchQuery,
  methodologyLabels = {},
  onRemoveIndustry,
  onRemoveTag,
  onRemoveRegion,
  onRemoveCountry,
  onRemoveSize,
  onRemoveMethodology,
  onRemoveYear,
  onRemoveSearch,
  onClearAll,
}: BenchmarkActiveFiltersProps) {
  const chips: FilterChipData[] = [];

  if (searchQuery) {
    chips.push({ type: 'search', label: `"${searchQuery}"`, value: searchQuery, onRemove: onRemoveSearch });
  }
  industries.forEach((v) => chips.push({ type: 'industry', label: v, value: v, onRemove: () => onRemoveIndustry(v) }));
  tags.forEach((v) => chips.push({ type: 'tag', label: v, value: v, onRemove: () => onRemoveTag(v) }));
  regions.forEach((v) => chips.push({ type: 'region', label: v, value: v, onRemove: () => onRemoveRegion(v) }));
  countries.forEach((v) => chips.push({ type: 'country', label: v, value: v, onRemove: () => onRemoveCountry(v) }));
  competitorSetSizes.forEach((v) => chips.push({ type: 'size', label: v, value: v, onRemove: () => onRemoveSize(v) }));
  methodologies.forEach((v) => chips.push({ type: 'methodology', label: methodologyLabels[v] ?? v, value: v, onRemove: () => onRemoveMethodology(v) }));
  years.forEach((v) => chips.push({ type: 'year', label: v, value: v, onRemove: () => onRemoveYear(v) }));

  // Empty state — render nothing
  if (chips.length === 0) return null;

  return (
    <div
      className="flex items-center gap-2 px-5 py-3 flex-wrap mb-4"
      style={{
        background: 'rgba(0,0,0,0.015)',
        border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: '10px',
      }}
      role="status"
      aria-live="polite"
      aria-label={`${chips.length} active filter${chips.length > 1 ? 's' : ''}`}
    >
      {/* Filter count label */}
      <span
        className="uppercase tracking-[0.06em] flex-shrink-0"
        style={{ fontSize: 'var(--badge-xs-font, 10px)', color: 'rgba(0,0,0,0.3)' }}
      >
        {chips.length} filter{chips.length > 1 ? 's' : ''}
      </span>
      <div className="w-px h-4 flex-shrink-0" style={{ background: 'rgba(0,0,0,0.08)' }} />

      {/* Chips */}
      {chips.map((chip, i) => (
        <FilterChip key={`${chip.type}-${chip.value}-${i}`} chip={chip} />
      ))}

      {/* Clear all */}
      {chips.length > 1 && (
        <>
          <div className="flex-1" />
          <button
            className="flex items-center gap-1 flex-shrink-0 transition-colors"
            style={{ fontSize: 'var(--text-2xs)', color: 'rgba(0,0,0,0.3)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(0,0,0,0.7)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(0,0,0,0.3)'; }}
            onClick={onClearAll}
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        </>
      )}
    </div>
  );
}
