/**
 * ChapterExtendedTOC — Chapter 9: Extended Report Structure
 *
 * Features: 2-phase/3-phase variant system with floating pill-style switcher,
 * search input, filter pill scroll system (fade edges + flanking arrow buttons),
 * phase cards with expandable chapters, and footer stats.
 *
 * Extracted from the monolith as part of Tier 4 decomposition.
 * All data sourced from sample-report/data.ts.
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Search,
  ChevronRight,
  ChevronLeft,
  Building2,
  Layers,
  ChartColumn,
  Maximize2,
  Minimize2,
  Printer,
} from 'lucide-react';
import { SectionLabel } from '@/design-system/components/SectionLabel';
import { iconColors } from '@/design-system/iconColors';
import { PhaseCard } from './PhaseCard';
import {
  extendedTocPhases2,
  extendedTocPhases3,
  extendedTocStats2,
  extendedTocStats3,
  extendedFooterSummary2,
  extendedFooterSummary3,
  extendedFilters,
  type TocVariant,
  type ExtendedPhase,
  type ExtendedStats,
  type FooterSummary,
  type FilterOption,
} from './data';

export function ChapterExtendedTOC() {
  const [variant, setVariant] = useState<TocVariant>('3-phase');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [openPhaseId, setOpenPhaseId] = useState<number | null>(1);

  const phases: ExtendedPhase[] = variant === '2-phase' ? extendedTocPhases2 : extendedTocPhases3;
  const stats: ExtendedStats = variant === '2-phase' ? extendedTocStats2 : extendedTocStats3;
  const footerSummary: FooterSummary = variant === '2-phase' ? extendedFooterSummary2 : extendedFooterSummary3;

  // Dynamic description based on variant
  const description = variant === '3-phase'
    ? 'Comprehensive coverage across three strategic phases: Market Foundation, Competitive Intelligence, and Go-To-Market Strategy \u2014 delivering end-to-end insights from technology analysis to commercialization.'
    : 'Comprehensive coverage across two strategic phases: Market Assessment and Go-To-Market Strategy \u2014 delivering end-to-end insights from technology analysis to commercialization.';

  // Filter phases based on active filter
  const filteredPhases = phases.filter((phase) => {
    if (activeFilter === 'all') return true;
    const phaseId = `phase${phase.id}`;
    return activeFilter === phaseId;
  });

  // Filter sections based on search query
  const getFilteredSections = (phase: ExtendedPhase) => {
    if (!searchQuery.trim()) return phase.sections;
    const q = searchQuery.toLowerCase();
    return phase.sections.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.number.toLowerCase().includes(q) ||
        s.subsections?.some((sub) => sub.title.toLowerCase().includes(q))
    );
  };

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionKey)) next.delete(sectionKey);
      else next.add(sectionKey);
      return next;
    });
  };

  // Expand/Collapse All
  const allExpandableKeys = phases.flatMap((phase) =>
    phase.sections
      .filter((s) => s.expandable)
      .map((s) => `${phase.id}-${s.number}`)
  );
  const allExpanded = allExpandableKeys.length > 0 && allExpandableKeys.every((k) => expandedSections.has(k));

  const toggleExpandAll = () => {
    if (allExpanded) {
      setExpandedSections(new Set());
    } else {
      setExpandedSections(new Set(allExpandableKeys));
    }
  };

  return (
    <div id="chapter-9-extended" className="mb-12 scroll-mt-16">
      {/* Chapter Label + Variant Switcher (same row) */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative">
        <SectionLabel background="light" variant="accent">
          CHAPTER 9 - TABLE OF CONTENTS
        </SectionLabel>

        {/* Variant Switcher */}
        <div className="sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 z-10 flex items-center gap-1 p-1 bg-white border border-[var(--black-200)] rounded-[5px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] self-start sm:self-auto">
          <button
            onClick={() => { setVariant('2-phase'); setActiveFilter('all'); }}
            className={`px-3 py-1.5 text-[0.8rem] rounded-[2.5px] transition-all duration-200 whitespace-nowrap cursor-pointer ${
              variant === '2-phase'
                ? 'bg-black text-white'
                : 'text-[var(--black-500)] hover:text-black'
            }`}
          >
            2 Phases
          </button>
          <button
            onClick={() => { setVariant('3-phase'); setActiveFilter('all'); }}
            className={`px-3 py-1.5 text-[0.8rem] rounded-[2.5px] transition-all duration-200 whitespace-nowrap cursor-pointer ${
              variant === '3-phase'
                ? 'bg-black text-white'
                : 'text-[var(--black-500)] hover:text-black'
            }`}
          >
            3 Phases
          </button>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-[1.953rem] sm:text-[2.441rem] font-light font-serif text-black leading-[1.25] mb-4">
        AI in Healthcare Report Structure
      </h2>

      {/* Description */}
      <p className="text-[1rem] text-[var(--black-500)] leading-[1.7] max-w-[50rem] mb-8">
        {description}
      </p>

      {/* Inline Stats Row */}
      <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-3 sm:gap-8 mb-8">
        <InlineStat icon={Layers} value={stats.chapters} label="Chapters" />
        <InlineStat icon={Building2} value={stats.companies} label="Companies Profiled" />
        <InlineStat icon={ChartColumn} value={stats.segmentations} label="Segmentation Types" />
      </div>

      {/* Search + Filter Row + Utility Buttons */}
      <div className="flex flex-col gap-3 sm:gap-4 mb-6">
        {/* Row 1: Search + Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
          {/* Search */}
          <div className="relative w-full sm:max-w-[22rem]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--black-400)]"
            />
            <input
              type="text"
              placeholder="Search chapters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 text-[0.8rem] border border-black/10 rounded-[5px]
                bg-white text-black placeholder:text-[var(--black-400)]
                hover:border-black/20 focus:border-[var(--purple-600)] focus:outline-none
                focus:ring-3 focus:ring-[var(--purple-600)]/10 transition-all duration-200"
            />
          </div>

          {/* Filter Pills with Scroll */}
          <FilterPillScroll
            filters={variant === '3-phase' ? extendedFilters : extendedFilters.slice(0, 3)}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Row 2: Expand All + Print (desktop only) */}
        <div className="hidden sm:flex gap-4 shrink-0">
          <button
            onClick={toggleExpandAll}
            className="flex items-center gap-2 px-3 py-2 text-[0.8rem] text-[var(--black-500)] hover:text-black transition-colors cursor-pointer"
          >
            {allExpanded ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
            {allExpanded ? 'Collapse All' : 'Expand All'}
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-3 py-2 text-[0.8rem] text-[var(--black-500)] hover:text-black transition-colors cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            Print / Export
          </button>
        </div>
      </div>

      {/* Phase Cards — responsive grid: columns match card count */}
      <div className={`grid gap-8 ${variant === '2-phase' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        {filteredPhases.map((phase) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            sections={getFilteredSections(phase)}
            expandedSections={expandedSections}
            onToggleSection={toggleSection}
            isOpen={variant === '2-phase' ? true : openPhaseId === phase.id}
            onTogglePhase={() => {
              if (variant === '3-phase') {
                setOpenPhaseId((prev) => (prev === phase.id ? null : phase.id));
              }
            }}
          />
        ))}
      </div>

      {/* Footer Summary */}
      <div
        className="mt-8 sm:mt-12 p-4 sm:p-6 md:p-10 rounded-[10px] border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-8"
        style={{
          background: 'linear-gradient(to bottom right, rgba(245, 246, 253, 0.5), rgba(250, 250, 250, 0.3))',
          borderColor: 'rgba(235, 237, 251, 0.5)',
        }}
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-sans font-medium text-[1.25rem] text-black mb-2">
            {footerSummary.title}
          </h3>
          <p className="font-sans text-[0.8rem] text-[var(--black-500)]">
            {footerSummary.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-10">
          {footerSummary.sections.map((item) => (
            <div key={item.label} className="text-center">
              <span className="block font-serif font-light tabular-nums text-[1.953rem] sm:text-[2.441rem] md:text-[3.052rem] text-black leading-none">
                {item.value}
              </span>
              <span className="block font-sans text-[0.8rem] text-[var(--black-500)] mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Inline Stat ────────────────────────────────────────

interface InlineStatProps {
  icon: typeof Layers;
  value: number;
  label: string;
}

function InlineStat({ icon: Icon, value, label }: InlineStatProps) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" strokeWidth={2} color={iconColors.content} />
      <span className="text-[0.8rem] sm:text-[1rem] font-semibold text-black">{value}</span>
      <span className="text-[0.8rem] text-[var(--black-500)]">{label}</span>
    </div>
  );
}

// ── Filter Pill Scroll ─────────────────────────────────

interface FilterPillScrollProps {
  filters: FilterOption[];
  activeFilter: string;
  onFilterChange: (id: string) => void;
}

function FilterPillScroll({ filters, activeFilter, onFilterChange }: FilterPillScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 4);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [filters, checkScroll]);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (el) el.scrollBy({ left: dir === 'left' ? -120 : 120, behavior: 'smooth' });
  };

  return (
    <div className="relative flex items-center flex-1 min-w-0 gap-1.5">
      {/* Left Arrow */}
      {showLeft && (
        <button
          onClick={() => scroll('left')}
          className="flex-shrink-0 size-8 rounded-full border border-[var(--black-200)] bg-white flex items-center justify-center hover:bg-[var(--black-50)] transition-colors cursor-pointer"
          aria-label="Scroll filters left"
        >
          <ChevronLeft className="h-3.5 w-3.5" color={iconColors.utility} />
        </button>
      )}

      {/* Scrollable Pills */}
      <div className="relative flex-1 min-w-0 overflow-hidden">
        {/* Fade edges */}
        {showLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        )}
        {showRight && (
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        )}

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`h-10 px-5 text-[0.8rem] rounded-[5px] transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeFilter === filter.id
                  ? 'bg-black text-white font-medium'
                  : 'bg-white text-black border border-[var(--warm-500)] hover:border-black hover:bg-[var(--coral-50)] active:bg-[var(--coral-100)]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      {showRight && (
        <button
          onClick={() => scroll('right')}
          className="flex-shrink-0 size-8 rounded-full border border-[var(--black-200)] bg-white flex items-center justify-center hover:bg-[var(--black-50)] transition-colors cursor-pointer"
          aria-label="Scroll filters right"
        >
          <ChevronRight className="h-3.5 w-3.5" color={iconColors.utility} />
        </button>
      )}
    </div>
  );
}