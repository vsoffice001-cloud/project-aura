/**
 * PhaseCard — Individual phase card for Extended TOC
 *
 * Accordion-style card: clicking the header toggles the chapter list.
 * Cards use black-palette borders (border-[var(--black-200)]) with subtle
 * shadow elevation — no purple borders. Hover lifts with deeper shadow.
 * Smooth max-height + opacity transition for the content area.
 * Chapter list rows are 14px; chevron arrows only appear on expandable rows.
 *
 * Extracted from ChapterExtendedTOC for component decomposition.
 */

import { ChevronDown, ChevronRight } from 'lucide-react';
import { iconColors } from '@/design-system/iconColors';
import type { ExtendedPhase } from './data';

interface PhaseCardProps {
  phase: ExtendedPhase;
  sections: ExtendedPhase['sections'];
  expandedSections: Set<string>;
  onToggleSection: (sectionKey: string) => void;
  isOpen: boolean;
  onTogglePhase: () => void;
}

export function PhaseCard({
  phase,
  sections,
  expandedSections,
  onToggleSection,
  isOpen,
  onTogglePhase,
}: PhaseCardProps) {
  const PhaseIcon = phase.icon;

  return (
    <div
      className={`rounded-[10px] border border-[var(--black-200)] bg-white
        shadow-[0_1px_2px_rgba(0,0,0,0.05)]
        hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] hover:-translate-y-0.5
        transition-all duration-500 overflow-hidden`}
    >
      {/* Phase Header — clickable to toggle */}
      <div
        role="button"
        tabIndex={0}
        onClick={onTogglePhase}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onTogglePhase();
          }
        }}
        className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-[var(--black-100)] cursor-pointer select-none"
        style={{
          background:
            'linear-gradient(to right, rgba(195, 198, 249, 0.12), rgba(195, 198, 249, 0.04))',
        }}
      >
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Phase Icon */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-content-icon/10 flex items-center justify-center shadow-inner flex-shrink-0">
              <PhaseIcon
                className="h-5 w-5 sm:h-6 sm:w-6"
                strokeWidth={2}
                color={iconColors.content}
              />
            </div>
            <div>
              <span className="text-content-icon text-[0.563rem] font-semibold uppercase tracking-[0.15em] block">
                {phase.label}
              </span>
              <span className="text-foreground text-[1rem] font-medium">
                {phase.title}
              </span>
            </div>
          </h3>
          {/* Chapter Count */}
          <div className="text-right flex-shrink-0">
            <p className="text-[1.563rem] font-semibold text-content-icon leading-none">
              {phase.chapters}
            </p>
            <p className="text-[0.563rem] text-[var(--black-600)] mt-1 uppercase tracking-[0.1em]">
              Chapters
            </p>
          </div>
        </div>
        <p className="text-[0.8rem] text-[var(--black-600)] mt-2 sm:mt-3 leading-[1.6]">
          {phase.description}
        </p>
      </div>

      {/* Collapsible Content Area */}
      <div
        className="transition-all duration-500 ease-in-out overflow-hidden"
        style={{
          maxHeight: isOpen ? '700px' : '0px',
          opacity: isOpen ? 1 : 0,
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="max-h-[650px] overflow-y-auto p-3 sm:p-4 space-y-0.5">
          {sections.map((section) => {
            const sectionKey = `${phase.id}-${section.number}`;
            const isExpanded = expandedSections.has(sectionKey);

            return (
              <div
                key={sectionKey}
                className="border-b border-[var(--black-200)] last:border-0"
              >
                {/* Section Row */}
                <button
                  className="w-full flex items-center gap-2 py-3 px-1 text-left hover:bg-[var(--black-50)]/50 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (section.expandable) onToggleSection(sectionKey);
                  }}
                >
                  {/* Expand chevron */}
                  {section.expandable ? (
                    <ChevronDown
                      className={`h-4 w-4 text-[var(--black-500)] transition-transform duration-300 flex-shrink-0 ${
                        isExpanded ? 'rotate-0' : '-rotate-90'
                      }`}
                    />
                  ) : (
                    <span className="w-4 flex-shrink-0" />
                  )}
                  <span className="text-[14px] w-6 text-[var(--black-500)] tabular-nums tracking-wider">
                    {section.number}
                  </span>
                  <span className="flex-1 text-[14px] text-foreground hover:font-semibold transition-all">
                    {section.title}
                  </span>
                </button>

                {/* Subsections (expanded) */}
                {section.expandable && isExpanded && section.subsections && (
                  <div className="ml-6 pl-3 border-l-2 border-content-icon/20 mb-2 space-y-0">
                    {section.subsections.map((sub) => (
                      <div
                        key={sub.number}
                        className="flex items-center py-2 px-3 cursor-pointer hover:bg-black/[0.02] rounded-[2.5px] transition-colors"
                      >
                        <span className="text-[0.563rem] text-[var(--black-400)] min-w-[2.5rem] flex-shrink-0 tabular-nums tracking-wider">
                          {sub.number}
                        </span>
                        <span className="text-[0.8rem] leading-[1.5] flex-1 text-[var(--black-500)]">
                          {sub.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {sections.length === 0 && (
            <div className="px-3 py-8 text-center text-[0.8rem] text-[var(--black-400)]">
              No chapters match your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}