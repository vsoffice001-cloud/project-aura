'use client';

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
  type LucideIcon,
} from 'lucide-react';
import { SectionLabel } from '@kenresearch/design-system/atoms';
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
} from '@/lib/mock-data';
import { PhaseCard } from './PhaseCard';

interface InlineStatProps {
  icon: LucideIcon;
  value: number;
  label: string;
}

function InlineStat({ icon: Icon, value, label }: InlineStatProps) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-[var(--color-accent-purple)]" strokeWidth={2} />
      <span className="text-[var(--typography-size-xs)] sm:text-[var(--typography-size-sm)] font-semibold text-[var(--surface-text)]">{value}</span>
      <span className="text-[var(--typography-size-xs)] text-[var(--surface-text-muted)]">{label}</span>
    </div>
  );
}

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
      {showLeft && (
        <button
          type="button"
          onClick={() => scroll('left')}
          className="flex-shrink-0 size-8 rounded-full border border-[var(--border-default)] bg-[var(--color-foundation-white)] flex items-center justify-center hover:bg-[var(--tint-soft)] transition-colors cursor-pointer"
          aria-label="Scroll filters left"
        >
          <ChevronLeft className="h-3.5 w-3.5 text-[var(--surface-text-muted)]" />
        </button>
      )}

      <div className="relative flex-1 min-w-0 overflow-hidden">
        {showLeft && <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[var(--color-foundation-white)] to-transparent z-10 pointer-events-none" />}
        {showRight && <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[var(--color-foundation-white)] to-transparent z-10 pointer-events-none" />}

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => onFilterChange(filter.id)}
              className={`h-10 px-5 text-[var(--typography-size-xs)] rounded-[var(--radius-button)] transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeFilter === filter.id
                  ? 'bg-[var(--color-foundation-black)] text-[var(--color-foundation-white)] font-medium'
                  : 'bg-[var(--color-foundation-white)] text-[var(--surface-text)] border border-[var(--color-ramp-warm-500)] hover:border-[var(--color-foundation-black)] hover:bg-[var(--color-ramp-coral-50)] active:bg-[var(--color-ramp-coral-100)]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {showRight && (
        <button
          type="button"
          onClick={() => scroll('right')}
          className="flex-shrink-0 size-8 rounded-full border border-[var(--border-default)] bg-[var(--color-foundation-white)] flex items-center justify-center hover:bg-[var(--tint-soft)] transition-colors cursor-pointer"
          aria-label="Scroll filters right"
        >
          <ChevronRight className="h-3.5 w-3.5 text-[var(--surface-text-muted)]" />
        </button>
      )}
    </div>
  );
}

/**
 * ChapterExtendedTOC — Chapter 9: 2-phase / 3-phase report structure variant switcher
 * w/ search + filter pills + expandable phase cards + footer stats.
 *
 * @port V0_lite_report-legacy/src/app/components/sample-report/ChapterExtendedTOC.tsx
 */
export function ChapterExtendedTOC() {
  const [variant, setVariant] = useState<TocVariant>('3-phase');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [openPhaseId, setOpenPhaseId] = useState<number | null>(1);

  const phases: ExtendedPhase[] = variant === '2-phase' ? extendedTocPhases2 : extendedTocPhases3;
  const stats: ExtendedStats = variant === '2-phase' ? extendedTocStats2 : extendedTocStats3;
  const footerSummary: FooterSummary = variant === '2-phase' ? extendedFooterSummary2 : extendedFooterSummary3;

  const description =
    variant === '3-phase'
      ? 'Comprehensive coverage across three strategic phases: Market Foundation, Competitive Intelligence, and Go-To-Market Strategy — delivering end-to-end insights from technology analysis to commercialization.'
      : 'Comprehensive coverage across two strategic phases: Market Assessment and Go-To-Market Strategy — delivering end-to-end insights from technology analysis to commercialization.';

  const filteredPhases = phases.filter((phase) => {
    if (activeFilter === 'all') return true;
    return activeFilter === `phase${phase.id}`;
  });

  const getFilteredSections = (phase: ExtendedPhase) => {
    if (!searchQuery.trim()) return phase.sections;
    const q = searchQuery.toLowerCase();
    return phase.sections.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.number.toLowerCase().includes(q) ||
        s.subsections?.some((sub) => sub.title.toLowerCase().includes(q)),
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

  const allExpandableKeys = phases.flatMap((phase) =>
    phase.sections.filter((s) => s.expandable).map((s) => `${phase.id}-${s.number}`),
  );
  const allExpanded = allExpandableKeys.length > 0 && allExpandableKeys.every((k) => expandedSections.has(k));

  const toggleExpandAll = () => {
    if (allExpanded) setExpandedSections(new Set());
    else setExpandedSections(new Set(allExpandableKeys));
  };

  return (
    <div id="chapter-9-extended" className="mb-12 scroll-mt-16">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative">
        <SectionLabel background="light" variant="accent">CHAPTER 9 - TABLE OF CONTENTS</SectionLabel>

        <div className="sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 z-10 flex items-center gap-1 p-1 bg-[var(--color-foundation-white)] border border-[var(--border-default)] rounded-[var(--radius-button)] shadow-[var(--shadow-md)] self-start sm:self-auto">
          <button
            type="button"
            onClick={() => { setVariant('2-phase'); setActiveFilter('all'); }}
            className={`px-3 py-1.5 text-[var(--typography-size-xs)] rounded-[var(--radius-image)] transition-all duration-200 whitespace-nowrap cursor-pointer ${
              variant === '2-phase'
                ? 'bg-[var(--color-foundation-black)] text-[var(--color-foundation-white)]'
                : 'text-[var(--surface-text-muted)] hover:text-[var(--surface-text)]'
            }`}
          >
            2 Phases
          </button>
          <button
            type="button"
            onClick={() => { setVariant('3-phase'); setActiveFilter('all'); }}
            className={`px-3 py-1.5 text-[var(--typography-size-xs)] rounded-[var(--radius-image)] transition-all duration-200 whitespace-nowrap cursor-pointer ${
              variant === '3-phase'
                ? 'bg-[var(--color-foundation-black)] text-[var(--color-foundation-white)]'
                : 'text-[var(--surface-text-muted)] hover:text-[var(--surface-text)]'
            }`}
          >
            3 Phases
          </button>
        </div>
      </div>

      <h2 className="text-[var(--typography-size-xl)] sm:text-[var(--typography-size-2xl)] font-light font-[var(--typography-family-display)] text-[var(--surface-text)] leading-[1.25] mb-4">
        AI in Healthcare Report Structure
      </h2>
      <p className="text-[var(--typography-size-sm)] text-[var(--surface-text-muted)] leading-[1.7] max-w-[50rem] mb-8">
        {description}
      </p>

      <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-3 sm:gap-8 mb-8">
        <InlineStat icon={Layers}      value={stats.chapters}       label="Chapters" />
        <InlineStat icon={Building2}   value={stats.companies}      label="Companies Profiled" />
        <InlineStat icon={ChartColumn} value={stats.segmentations}  label="Segmentation Types" />
      </div>

      <div className="flex flex-col gap-3 sm:gap-4 mb-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <div className="relative w-full sm:max-w-[22rem]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--surface-text-subtle)]" />
            <input
              type="text"
              placeholder="Search chapters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 text-[var(--typography-size-xs)] border border-[var(--border-soft)] rounded-[var(--radius-button)]
                bg-[var(--color-foundation-white)] text-[var(--surface-text)] placeholder:text-[var(--surface-text-subtle)]
                hover:border-[var(--border-default)] focus:border-[var(--color-accent-purple)] focus:outline-none
                focus:ring-3 focus:ring-[var(--color-accent-purple)]/10 transition-all duration-200"
            />
          </div>
          <FilterPillScroll
            filters={variant === '3-phase' ? extendedFilters : extendedFilters.slice(0, 3)}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        <div className="hidden sm:flex gap-4 shrink-0">
          <button
            type="button"
            onClick={toggleExpandAll}
            className="flex items-center gap-2 px-3 py-2 text-[var(--typography-size-xs)] text-[var(--surface-text-muted)] hover:text-[var(--surface-text)] transition-colors cursor-pointer"
          >
            {allExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            {allExpanded ? 'Collapse All' : 'Expand All'}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 px-3 py-2 text-[var(--typography-size-xs)] text-[var(--surface-text-muted)] hover:text-[var(--surface-text)] transition-colors cursor-pointer"
          >
            <Printer className="h-4 w-4" /> Print / Export
          </button>
        </div>
      </div>

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

      <div
        className="mt-8 sm:mt-12 p-4 sm:p-6 md:p-10 rounded-[var(--radius-card)] border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-8"
        style={{
          background: 'linear-gradient(to bottom right, rgba(245,246,253,0.5), rgba(250,250,250,0.3))',
          borderColor: 'rgba(235,237,251,0.5)',
        }}
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-[var(--typography-family-body)] font-medium text-[var(--typography-size-base)] text-[var(--surface-text)] mb-2">
            {footerSummary.title}
          </h3>
          <p className="font-[var(--typography-family-body)] text-[var(--typography-size-xs)] text-[var(--surface-text-muted)]">
            {footerSummary.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-10">
          {footerSummary.sections.map((item) => (
            <div key={item.label} className="text-center">
              <span className="block font-[var(--typography-family-display)] font-light tabular-nums text-[var(--typography-size-xl)] sm:text-[var(--typography-size-2xl)] md:text-[var(--typography-size-3xl)] text-[var(--surface-text)] leading-none">
                {item.value}
              </span>
              <span className="block font-[var(--typography-family-body)] text-[var(--typography-size-xs)] text-[var(--surface-text-muted)] mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
