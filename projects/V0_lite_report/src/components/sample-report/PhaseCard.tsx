'use client';

import { ChevronDown } from 'lucide-react';
import type { ExtendedPhase } from '@/lib/mock-data';

interface PhaseCardProps {
  phase: ExtendedPhase;
  sections: ExtendedPhase['sections'];
  expandedSections: Set<string>;
  onToggleSection: (sectionKey: string) => void;
  isOpen: boolean;
  onTogglePhase: () => void;
}

/**
 * PhaseCard — accordion-style phase card for ChapterExtendedTOC.
 * Phase header + collapsible chapter list w/ expandable subsections.
 *
 * @port V0_lite_report-legacy/src/app/components/sample-report/PhaseCard.tsx
 */
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
      className="rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--color-foundation-white)]
        shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5
        transition-all duration-500 overflow-hidden"
    >
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
        className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-[var(--border-soft)] cursor-pointer select-none"
        style={{
          background: 'linear-gradient(to right, rgba(195,198,249,0.12), rgba(195,198,249,0.04))',
        }}
      >
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--color-accent-purple)]/10 flex items-center justify-center shadow-inner flex-shrink-0">
              <PhaseIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[var(--color-accent-purple)]" strokeWidth={2} />
            </div>
            <div>
              <span className="text-[var(--color-accent-purple)] text-[0.563rem] font-semibold uppercase tracking-[0.15em] block">
                {phase.label}
              </span>
              <span className="text-[var(--surface-text)] text-[var(--typography-size-sm)] font-medium">
                {phase.title}
              </span>
            </div>
          </h3>
          <div className="text-right flex-shrink-0">
            <p className="text-[var(--typography-size-lg)] font-semibold text-[var(--color-accent-purple)] leading-none">
              {phase.chapters}
            </p>
            <p className="text-[0.563rem] text-[var(--surface-text-muted)] mt-1 uppercase tracking-[0.1em]">
              Chapters
            </p>
          </div>
        </div>
        <p className="text-[var(--typography-size-xs)] text-[var(--surface-text-muted)] mt-2 sm:mt-3 leading-[1.6]">
          {phase.description}
        </p>
      </div>

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
              <div key={sectionKey} className="border-b border-[var(--border-default)] last:border-0">
                <button
                  type="button"
                  className="w-full flex items-center gap-2 py-3 px-1 text-left hover:bg-[var(--tint-soft)] transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (section.expandable) onToggleSection(sectionKey);
                  }}
                >
                  {section.expandable ? (
                    <ChevronDown
                      className={`h-4 w-4 text-[var(--surface-text-muted)] transition-transform duration-300 flex-shrink-0 ${
                        isExpanded ? 'rotate-0' : '-rotate-90'
                      }`}
                    />
                  ) : (
                    <span className="w-4 flex-shrink-0" />
                  )}
                  <span className="text-[14px] w-6 text-[var(--surface-text-muted)] tabular-nums tracking-wider">
                    {section.number}
                  </span>
                  <span className="flex-1 text-[14px] text-[var(--surface-text)] hover:font-semibold transition-all">
                    {section.title}
                  </span>
                </button>

                {section.expandable && isExpanded && section.subsections && (
                  <div className="ml-6 pl-3 border-l-2 border-[var(--color-accent-purple)]/20 mb-2 space-y-0">
                    {section.subsections.map((sub) => (
                      <div
                        key={sub.number}
                        className="flex items-center py-2 px-3 cursor-pointer hover:bg-[var(--tint-soft)] rounded-[var(--radius-image)] transition-colors"
                      >
                        <span className="text-[0.563rem] text-[var(--surface-text-subtle)] min-w-[2.5rem] flex-shrink-0 tabular-nums tracking-wider">
                          {sub.number}
                        </span>
                        <span className="text-[var(--typography-size-xs)] leading-[1.5] flex-1 text-[var(--surface-text-muted)]">
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
            <div className="px-3 py-8 text-center text-[var(--typography-size-xs)] text-[var(--surface-text-subtle)]">
              No chapters match your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
