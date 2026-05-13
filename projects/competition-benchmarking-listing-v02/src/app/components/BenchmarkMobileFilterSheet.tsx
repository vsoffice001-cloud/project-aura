/**
 * BenchmarkMobileFilterSheet — Organism
 * competition-benchmarking-listing-v01
 *
 * Slide-from-right mobile filter sheet for <lg breakpoint.
 * Focus trap + body scroll lock + Escape to close.
 * Faceted counts shown on each FilterChip.
 */

import { useEffect, useRef, useState } from 'react';
import { X, ArrowUpDown, Layers, MapPin, Globe, Tag, Users, Wrench, Calendar } from 'lucide-react';
import { Button } from './Button';
import { FilterChip } from './FilterChip';
import { FilterAccordion } from './molecules/FilterAccordion';
import {
  INDUSTRIES,
  REGIONS,
  COUNTRIES,
  TAGS,
  COMPETITOR_SET_SIZES,
  METHODOLOGY_LABELS,
  SORT_OPTIONS,
  type SortOption,
} from '../../lib/mock-data';
import { iconColors } from './iconColors';

interface BenchmarkMobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  industries: string[];
  regions: string[];
  countries: string[];
  tags: string[];
  competitorSetSizes: string[];
  methodologies: string[];
  years: string[];
  allYears: string[];
  sort: SortOption;
  facetCounts: {
    industryCounts: Record<string, number>;
    regionCounts: Record<string, number>;
    countryCounts: Record<string, number>;
    tagCounts: Record<string, number>;
    sizeCounts: Record<string, number>;
    methodologyCounts: Record<string, number>;
    yearCounts: Record<string, number>;
  };
  activeFilterCount: number;
  onToggleIndustry: (v: string) => void;
  onToggleRegion: (v: string) => void;
  onToggleCountry: (v: string) => void;
  onToggleTag: (v: string) => void;
  onToggleSize: (v: string) => void;
  onToggleMethodology: (v: string) => void;
  onToggleYear: (v: string) => void;
  onSortChange: (v: SortOption) => void;
  onClearAll: () => void;
}

export function BenchmarkMobileFilterSheet({
  isOpen,
  onClose,
  industries,
  regions,
  countries,
  tags,
  competitorSetSizes,
  methodologies,
  years,
  allYears,
  sort,
  facetCounts,
  activeFilterCount,
  onToggleIndustry,
  onToggleRegion,
  onToggleCountry,
  onToggleTag,
  onToggleSize,
  onToggleMethodology,
  onToggleYear,
  onSortChange,
  onClearAll,
}: BenchmarkMobileFilterSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    sort: true, industry: true, tags: false, region: false, country: false, size: false, methodology: false, year: false,
  });

  const toggle = (key: string) => setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    const sheet = sheetRef.current;
    if (!sheet) return;
    const firstBtn = sheet.querySelector<HTMLElement>('[aria-label="Close filters"]');
    firstBtn?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      if (e.key !== 'Tab') return;
      const focusable = sheet.querySelectorAll<HTMLElement>('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none', transition: 'opacity 0.25s ease' }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background: 'var(--scrim)' }} onClick={onClose} />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        className="absolute right-0 top-0 bottom-0 w-full max-w-[380px] flex flex-col bg-white shadow-2xl"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--hairline-faint)' }}>
          <div className="flex items-center gap-2.5">
            <span style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-primary)' }}>Filters & Sort</span>
            {activeFilterCount > 0 && (
              <span className="flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full" style={{ fontSize: '10px', background: 'var(--text-primary)', color: 'var(--surface-white)' }}>
                {activeFilterCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {activeFilterCount > 0 && (
              <button className="px-3 py-2 transition-colors" style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-subtle)' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink-subtle)'; }} onClick={onClearAll}>
                Clear all
              </button>
            )}
            <button
              aria-label="Close filters"
              onClick={onClose}
              className="p-2 hover:bg-black/[0.03] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              style={{ borderRadius: 'var(--radius-element)' }}
            >
              <X className="h-5 w-5" color={iconColors.utility} />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* Sort */}
          <FilterAccordion variant="sheet" label="Sort by" isOpen={openSections.sort} onToggle={() => toggle('sort')} icon={<ArrowUpDown className="h-3.5 w-3.5" color={iconColors.utility} />}>
            {SORT_OPTIONS.map((opt) => (
              <FilterChip key={opt.value} label={opt.label} active={sort === opt.value} onToggle={() => onSortChange(opt.value)} />
            ))}
          </FilterAccordion>

          {/* Industry */}
          <FilterAccordion variant="sheet" label="Industry" isOpen={openSections.industry} onToggle={() => toggle('industry')} count={industries.length} icon={<Layers className="h-3.5 w-3.5" color={iconColors.utility} />}>
            {INDUSTRIES.map((ind) => (
              <FilterChip key={ind} label={ind} active={industries.includes(ind)} onToggle={() => onToggleIndustry(ind)} count={facetCounts.industryCounts[ind] ?? 0} />
            ))}
          </FilterAccordion>

          {/* Tags */}
          <FilterAccordion variant="sheet" label="Tags" isOpen={openSections.tags} onToggle={() => toggle('tags')} count={tags.length} icon={<Tag className="h-3.5 w-3.5" color={iconColors.utility} />}>
            {TAGS.map((tag) => (
              <FilterChip key={tag} label={tag} active={tags.includes(tag)} onToggle={() => onToggleTag(tag)} count={facetCounts.tagCounts[tag] ?? 0} />
            ))}
          </FilterAccordion>

          {/* Region */}
          <FilterAccordion variant="sheet" label="Region" isOpen={openSections.region} onToggle={() => toggle('region')} count={regions.length} icon={<MapPin className="h-3.5 w-3.5" color={iconColors.utility} />}>
            {REGIONS.map((reg) => (
              <FilterChip key={reg} label={reg} active={regions.includes(reg)} onToggle={() => onToggleRegion(reg)} count={facetCounts.regionCounts[reg] ?? 0} />
            ))}
          </FilterAccordion>

          {/* Country */}
          <FilterAccordion variant="sheet" label="Country" isOpen={openSections.country} onToggle={() => toggle('country')} count={countries.length} icon={<Globe className="h-3.5 w-3.5" color={iconColors.utility} />}>
            {COUNTRIES.map((c) => (
              <FilterChip key={c} label={c} active={countries.includes(c)} onToggle={() => onToggleCountry(c)} count={facetCounts.countryCounts[c] ?? 0} />
            ))}
          </FilterAccordion>

          {/* Competitor set size */}
          <FilterAccordion variant="sheet" label="Competitor set size" isOpen={openSections.size} onToggle={() => toggle('size')} count={competitorSetSizes.length} icon={<Users className="h-3.5 w-3.5" color={iconColors.utility} />}>
            {COMPETITOR_SET_SIZES.map((sz) => (
              <FilterChip key={sz} label={`${sz} competitors`} active={competitorSetSizes.includes(sz)} onToggle={() => onToggleSize(sz)} count={facetCounts.sizeCounts[sz] ?? 0} />
            ))}
          </FilterAccordion>

          {/* Methodology */}
          <FilterAccordion variant="sheet" label="Methodology" isOpen={openSections.methodology} onToggle={() => toggle('methodology')} count={methodologies.length} icon={<Wrench className="h-3.5 w-3.5" color={iconColors.utility} />}>
            {Object.entries(METHODOLOGY_LABELS).map(([key, label]) => (
              <FilterChip key={key} label={label} active={methodologies.includes(key)} onToggle={() => onToggleMethodology(key)} count={facetCounts.methodologyCounts[key] ?? 0} />
            ))}
          </FilterAccordion>

          {/* Published year */}
          <FilterAccordion variant="sheet" label="Published year" isOpen={openSections.year} onToggle={() => toggle('year')} count={years.length} icon={<Calendar className="h-3.5 w-3.5" color={iconColors.utility} />}>
            {allYears.map((yr) => (
              <FilterChip key={yr} label={yr} active={years.includes(yr)} onToggle={() => onToggleYear(yr)} count={facetCounts.yearCounts[yr] ?? 0} />
            ))}
          </FilterAccordion>

          <div style={{ height: 'var(--space-4)' }} />
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-4 py-3" style={{ borderTop: '1px solid var(--hairline-faint)' }}>
          <Button variant="brand" size="sm" fullWidth onClick={onClose}>
            Show results
          </Button>
        </div>
      </div>
    </div>
  );
}
