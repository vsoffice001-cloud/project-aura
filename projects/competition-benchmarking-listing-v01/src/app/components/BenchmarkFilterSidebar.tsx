/**
 * BenchmarkFilterSidebar — Organism
 * competition-benchmarking-listing-v01
 *
 * 1:1 mirror of RS-v07 `IndustrySidebar.tsx` pattern (the actual production sidebar).
 * Composes SidebarPanel + FilterAccordion + FilterCheckbox + FilterSearchInput.
 *
 * RS canonical (source-of-truth: report-store-v07/IndustrySidebar.tsx):
 *   - SidebarPanel w/ header + footer slots, scrollable body
 *   - Header: p-4 w/ icon-box (w-7 h-7) + "Filters" tracking-[0.1em] uppercase text-2xs rgba(0,0,0,0.5) + count badge + "Clear all" w/ X icon
 *   - Footer: p-3 text-center "X+ benchmarks available" text-2xs rgba(0,0,0,0.35) w/ tabular-nums in 0.55
 *   - Body: search input (px-3 py-2.5 border-bottom) → FilterAccordion sections w/ FilterCheckbox rows
 *   - Sections: scrollable maxHeight 240-300px, "No matches found" empty state
 *   - Search auto-opens matching sections
 *
 * Benchmark sections: Report Type · Industry · Tags · Region · Country · Competitor Set · Methodology · Year
 */

import { useState, useMemo, useRef } from 'react';
import { Layers, MapPin, Globe, Tag, Calendar, Users, Wrench, FileBarChart, SlidersHorizontal, X } from 'lucide-react';
import { iconColors } from './iconColors';
import { FilterCheckbox } from './FilterCheckbox';
import { FilterSearchInput } from './FilterSearchInput';
import { FilterAccordion } from './molecules/FilterAccordion';
import { SidebarPanel } from './molecules/SidebarPanel';
import {
  INDUSTRIES,
  REGIONS,
  COUNTRIES,
  TAGS,
  COMPETITOR_SET_SIZES,
  METHODOLOGY_LABELS,
  BENCHMARK_REPORTS,
} from '../../lib/mock-data';

interface BenchmarkFilterSidebarProps {
  industries: string[];
  regions: string[];
  countries: string[];
  tags: string[];
  competitorSetSizes: string[];
  methodologies: string[];
  years: string[];
  allYears: string[];
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
  onClearAll: () => void;
  /** Ref to header (for sticky-bar intersection observer) */
  headerRef?: React.RefObject<HTMLDivElement | null>;
}

type SectionKey = 'reportType' | 'industry' | 'tags' | 'region' | 'country' | 'size' | 'methodology' | 'year';

const REPORT_TYPES = [
  { name: 'Competition Benchmarking', count: BENCHMARK_REPORTS.length, locked: true },
  { name: 'Market Sizing', count: 0 },
  { name: 'Forecasting', count: 0 },
  { name: 'Strategy Advisory', count: 0 },
  { name: 'Voice of Customer', count: 0 },
];

export function BenchmarkFilterSidebar({
  industries,
  regions,
  countries,
  tags,
  competitorSetSizes,
  methodologies,
  years,
  allYears,
  facetCounts,
  activeFilterCount,
  onToggleIndustry,
  onToggleRegion,
  onToggleCountry,
  onToggleTag,
  onToggleSize,
  onToggleMethodology,
  onToggleYear,
  onClearAll,
  headerRef,
}: BenchmarkFilterSidebarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [openSections, setOpenSections] = useState<Set<SectionKey>>(
    new Set(['reportType', 'industry'])
  );

  const q = searchQuery.toLowerCase().trim();

  // Derived: searchable sets
  const filteredIndustries = useMemo(() =>
    q ? INDUSTRIES.filter((i) => i.toLowerCase().includes(q)) : [...INDUSTRIES]
  , [q]);
  const filteredTags = useMemo(() =>
    q ? TAGS.filter((t) => t.toLowerCase().includes(q)) : [...TAGS]
  , [q]);
  const filteredRegions = useMemo(() =>
    q ? REGIONS.filter((r) => r.toLowerCase().includes(q)) : [...REGIONS]
  , [q]);
  const filteredCountries = useMemo(() =>
    q ? COUNTRIES.filter((c) => c.toLowerCase().includes(q)) : [...COUNTRIES]
  , [q]);
  const filteredSizes = useMemo(() =>
    q ? COMPETITOR_SET_SIZES.filter((s) => s.toLowerCase().includes(q)) : [...COMPETITOR_SET_SIZES]
  , [q]);
  const filteredMethodologies = useMemo(() => {
    const entries = Object.entries(METHODOLOGY_LABELS);
    return q ? entries.filter(([, label]) => label.toLowerCase().includes(q)) : entries;
  }, [q]);
  const filteredYears = useMemo(() =>
    q ? allYears.filter((y) => y.includes(q)) : allYears
  , [q, allYears]);
  const filteredReportTypes = useMemo(() =>
    q ? REPORT_TYPES.filter((rt) => rt.name.toLowerCase().includes(q)) : REPORT_TYPES
  , [q]);

  // Auto-open matching sections during search
  const searchMatchSections = useMemo(() => {
    if (!q) return null;
    const matches = new Set<SectionKey>();
    if (filteredReportTypes.length > 0) matches.add('reportType');
    if (filteredIndustries.length > 0) matches.add('industry');
    if (filteredTags.length > 0) matches.add('tags');
    if (filteredRegions.length > 0) matches.add('region');
    if (filteredCountries.length > 0) matches.add('country');
    if (filteredSizes.length > 0) matches.add('size');
    if (filteredMethodologies.length > 0) matches.add('methodology');
    if (filteredYears.length > 0) matches.add('year');
    return matches;
  }, [q, filteredReportTypes, filteredIndustries, filteredTags, filteredRegions, filteredCountries, filteredSizes, filteredMethodologies, filteredYears]);

  const isSectionOpen = (key: SectionKey) => {
    if (searchMatchSections) return searchMatchSections.has(key);
    return openSections.has(key);
  };

  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <SidebarPanel
      scrollRef={scrollRef}
      header={
        <div ref={headerRef} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 bg-white flex items-center justify-center"
                style={{
                  borderRadius: 'var(--radius-element)',
                  border: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" color={iconColors.utility} />
              </div>
              <h3
                className="tracking-[0.1em] uppercase"
                style={{
                  fontSize: 'var(--text-2xs)',
                  color: 'rgba(0,0,0,0.5)',
                  fontWeight: 'var(--font-weight-heading)',
                }}
              >
                Filters
              </h3>
              {activeFilterCount > 0 && (
                <span
                  className="min-w-5 h-5 px-1.5 rounded-full bg-black text-white flex items-center justify-center"
                  style={{ fontSize: 'var(--badge-xs-font, 10px)' }}
                >
                  {activeFilterCount}
                </span>
              )}
            </div>
            {activeFilterCount > 0 && (
              <button
                className="flex items-center gap-1 transition-colors"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(0,0,0,0.4)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(0,0,0,0.8)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(0,0,0,0.4)'; }}
                onClick={onClearAll}
              >
                <X className="h-3 w-3" />
                Clear all
              </button>
            )}
          </div>
        </div>
      }
      footer={
        <div className="p-3">
          <p
            className="text-center"
            style={{ fontSize: 'var(--text-2xs)', color: 'rgba(0,0,0,0.35)' }}
          >
            <span className="tabular-nums" style={{ color: 'rgba(0,0,0,0.55)' }}>
              {BENCHMARK_REPORTS.length.toLocaleString()}+
            </span>{' '}
            benchmarks available
          </p>
        </div>
      }
    >
      {/* ── Search ── */}
      <div
        className="px-3 py-2.5 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}
      >
        <FilterSearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search filters..."
        />
      </div>

      {/* ── 1. Report Type ── */}
      <FilterAccordion
        variant="sidebar"
        icon={<FileBarChart className="h-3 w-3" color={iconColors.utility} />}
        label="Report Type"
        isOpen={isSectionOpen('reportType')}
        onToggle={() => toggleSection('reportType')}
        count={1}
      >
        {filteredReportTypes.map((rt) => (
          <FilterCheckbox
            key={rt.name}
            label={rt.name}
            checked={rt.name === 'Competition Benchmarking'}
            onToggle={() => { /* locked — listing surface = competition-benchmarking */ }}
            count={rt.count}
          />
        ))}
        {filteredReportTypes.length === 0 && (
          <p className="px-4 py-3 text-center" style={{ fontSize: 'var(--text-2xs)', color: 'rgba(0,0,0,0.3)' }}>
            No matches found
          </p>
        )}
      </FilterAccordion>

      {/* ── 2. Industry ── */}
      <FilterAccordion
        variant="sidebar"
        icon={<Layers className="h-3 w-3" color={iconColors.utility} />}
        label="Industry"
        isOpen={isSectionOpen('industry')}
        onToggle={() => toggleSection('industry')}
        count={industries.length}
      >
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {filteredIndustries.map((ind) => (
            <FilterCheckbox
              key={ind}
              label={ind}
              checked={industries.includes(ind)}
              onToggle={() => onToggleIndustry(ind)}
              count={facetCounts.industryCounts[ind] ?? 0}
            />
          ))}
          {filteredIndustries.length === 0 && (
            <p className="px-4 py-3 text-center" style={{ fontSize: 'var(--text-2xs)', color: 'rgba(0,0,0,0.3)' }}>
              No matches found
            </p>
          )}
        </div>
      </FilterAccordion>

      {/* ── 3. Tags ── */}
      <FilterAccordion
        variant="sidebar"
        icon={<Tag className="h-3 w-3" color={iconColors.utility} />}
        label="Tags"
        isOpen={isSectionOpen('tags')}
        onToggle={() => toggleSection('tags')}
        count={tags.length}
      >
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {filteredTags.map((tag) => (
            <FilterCheckbox
              key={tag}
              label={tag}
              checked={tags.includes(tag)}
              onToggle={() => onToggleTag(tag)}
              count={facetCounts.tagCounts[tag] ?? 0}
            />
          ))}
          {filteredTags.length === 0 && (
            <p className="px-4 py-3 text-center" style={{ fontSize: 'var(--text-2xs)', color: 'rgba(0,0,0,0.3)' }}>
              No matches found
            </p>
          )}
        </div>
      </FilterAccordion>

      {/* ── 4. Region ── */}
      <FilterAccordion
        variant="sidebar"
        icon={<MapPin className="h-3 w-3" color={iconColors.utility} />}
        label="Region"
        isOpen={isSectionOpen('region')}
        onToggle={() => toggleSection('region')}
        count={regions.length}
      >
        <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
          {filteredRegions.map((reg) => (
            <FilterCheckbox
              key={reg}
              label={reg}
              checked={regions.includes(reg)}
              onToggle={() => onToggleRegion(reg)}
              count={facetCounts.regionCounts[reg] ?? 0}
            />
          ))}
          {filteredRegions.length === 0 && (
            <p className="px-4 py-3 text-center" style={{ fontSize: 'var(--text-2xs)', color: 'rgba(0,0,0,0.3)' }}>
              No matches found
            </p>
          )}
        </div>
      </FilterAccordion>

      {/* ── 5. Country ── */}
      <FilterAccordion
        variant="sidebar"
        icon={<Globe className="h-3 w-3" color={iconColors.utility} />}
        label="Country"
        isOpen={isSectionOpen('country')}
        onToggle={() => toggleSection('country')}
        count={countries.length}
      >
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {filteredCountries.map((c) => (
            <FilterCheckbox
              key={c}
              label={c}
              checked={countries.includes(c)}
              onToggle={() => onToggleCountry(c)}
              count={facetCounts.countryCounts[c] ?? 0}
            />
          ))}
          {filteredCountries.length === 0 && (
            <p className="px-4 py-3 text-center" style={{ fontSize: 'var(--text-2xs)', color: 'rgba(0,0,0,0.3)' }}>
              No matches found
            </p>
          )}
        </div>
      </FilterAccordion>

      {/* ── 4. Competitor Set Size ── */}
      <FilterAccordion
        variant="sidebar"
        icon={<Users className="h-3 w-3" color={iconColors.utility} />}
        label="Competitor Set Size"
        isOpen={isSectionOpen('size')}
        onToggle={() => toggleSection('size')}
        count={competitorSetSizes.length}
      >
        {filteredSizes.map((sz) => (
          <FilterCheckbox
            key={sz}
            label={sz}
            checked={competitorSetSizes.includes(sz)}
            onToggle={() => onToggleSize(sz)}
            count={facetCounts.sizeCounts[sz] ?? 0}
          />
        ))}
        {filteredSizes.length === 0 && (
          <p className="px-4 py-3 text-center" style={{ fontSize: 'var(--text-2xs)', color: 'rgba(0,0,0,0.3)' }}>
            No matches found
          </p>
        )}
      </FilterAccordion>

      {/* ── 5. Methodology ── */}
      <FilterAccordion
        variant="sidebar"
        icon={<Wrench className="h-3 w-3" color={iconColors.utility} />}
        label="Methodology"
        isOpen={isSectionOpen('methodology')}
        onToggle={() => toggleSection('methodology')}
        count={methodologies.length}
      >
        {filteredMethodologies.map(([key, label]) => (
          <FilterCheckbox
            key={key}
            label={label}
            checked={methodologies.includes(key)}
            onToggle={() => onToggleMethodology(key)}
            count={facetCounts.methodologyCounts[key] ?? 0}
          />
        ))}
        {filteredMethodologies.length === 0 && (
          <p className="px-4 py-3 text-center" style={{ fontSize: 'var(--text-2xs)', color: 'rgba(0,0,0,0.3)' }}>
            No matches found
          </p>
        )}
      </FilterAccordion>

      {/* ── 6. Publish Year ── */}
      <FilterAccordion
        variant="sidebar"
        icon={<Calendar className="h-3 w-3" color={iconColors.utility} />}
        label="Publish Year"
        isOpen={isSectionOpen('year')}
        onToggle={() => toggleSection('year')}
        count={years.length}
      >
        {filteredYears.map((yr) => (
          <FilterCheckbox
            key={yr}
            label={yr}
            checked={years.includes(yr)}
            onToggle={() => onToggleYear(yr)}
            count={facetCounts.yearCounts[yr] ?? 0}
          />
        ))}
        {filteredYears.length === 0 && (
          <p className="px-4 py-3 text-center" style={{ fontSize: 'var(--text-2xs)', color: 'rgba(0,0,0,0.3)' }}>
            No matches found
          </p>
        )}
      </FilterAccordion>
    </SidebarPanel>
  );
}
