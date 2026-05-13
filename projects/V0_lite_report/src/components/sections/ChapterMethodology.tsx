'use client';

import { useState } from 'react';
import { Search, ChevronRight, CircleCheckBig, FileCheck, type LucideIcon } from 'lucide-react';
import { SectionLabel } from '@kenresearch/design-system/atoms';

interface MethodologyStep {
  id: number;
  tabLabel: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  bullets: string[];
}

const methodologySteps: MethodologyStep[] = [
  {
    id: 1,
    tabLabel: 'Approach',
    icon: Search,
    title: 'Desk Research',
    subtitle: 'Comprehensive secondary research from authoritative sources.',
    bullets: [
      'Market reports from healthcare & AI associations',
      'Government publications on FDA, EMA, NMPA policies',
      'Clinical trial databases and patent filings',
      'Company annual reports and investor presentations',
    ],
  },
  {
    id: 2,
    tabLabel: 'Data Collection',
    icon: CircleCheckBig,
    title: 'Primary Research',
    subtitle: 'Direct engagement with industry participants.',
    bullets: [
      'Interviews with hospital CIOs and AI researchers',
      'Surveys with pharmaceutical and biotech executives',
      'Field visits to healthcare AI deployment sites',
      'Expert interviews with regulatory specialists',
    ],
  },
  {
    id: 3,
    tabLabel: 'Validation',
    icon: FileCheck,
    title: 'Validation',
    subtitle: 'Multi-source verification for accuracy.',
    bullets: [
      'Cross-validation through 500+ independent sources',
      'Triangulation of market size and growth trends',
      'Expert panel discussions and peer review',
      'Statistical modeling and econometric validation',
    ],
  },
];

/**
 * ChapterMethodology — Chapter 11 research methodology stepper + 3-card grid.
 * @port V0_lite_report-legacy/src/app/components/ChapterMethodology.tsx
 */
export function ChapterMethodology() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div id="chapter-11-methodology" className="mb-12 scroll-mt-16">
      <div className="mb-4">
        <SectionLabel background="light" variant="accent">
          CHAPTER 11 - OUR APPROACH
        </SectionLabel>
      </div>

      <h2 className="text-[var(--typography-size-xl)] sm:text-[var(--typography-size-2xl)] font-light font-[var(--typography-family-display)] text-[var(--surface-text)] leading-[1.25] mb-4">
        Research Methodology
      </h2>
      <p className="text-[var(--typography-size-sm)] text-[var(--surface-text-muted)] leading-[1.7] max-w-[50rem] mb-10">
        Our multi-layered approach combines rigorous desk research with primary data collection and expert validation to ensure accuracy and reliability.
      </p>

      {/* Stepper tabs */}
      <div className="mb-10">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center" style={{ scrollbarWidth: 'none' }}>
          {methodologySteps.map((step, idx) => {
            const isActive = activeStep === step.id;
            return (
              <div key={step.id} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setActiveStep(step.id)}
                  className={`
                    inline-flex items-center justify-center gap-2 h-12 rounded-[var(--radius-card)] px-4 sm:px-6
                    text-[var(--typography-size-compact)] font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-[var(--color-foundation-black)] text-[var(--color-foundation-white)] hover:bg-[var(--color-ramp-black-900)]'
                      : 'bg-[var(--color-foundation-white)] text-[var(--surface-text)] border border-[var(--color-ramp-warm-500)] hover:border-[var(--color-foundation-black)] hover:bg-[var(--color-ramp-coral-50)] active:bg-[var(--color-ramp-coral-100)]'
                    }
                  `}
                >
                  <span
                    className={`
                      size-6 rounded-full flex items-center justify-center text-[var(--typography-size-2xs)] font-semibold flex-shrink-0
                      ${isActive
                        ? 'bg-white/20 text-[var(--color-foundation-white)]'
                        : 'bg-[var(--color-ramp-black-100)] text-[var(--surface-text-muted)]'
                      }
                    `}
                  >
                    {step.id}
                  </span>
                  <span className="hidden sm:inline">{step.tabLabel}</span>
                </button>
                {idx < methodologySteps.length - 1 && (
                  <ChevronRight className="h-5 w-5 text-[var(--color-ramp-black-300)] mx-1 sm:mx-2 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3-Column Card Grid */}
      <div className="grid gap-4 lg:gap-5 md:grid-cols-3">
        {methodologySteps.map((step) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;
          return (
            <div
              key={step.id}
              role="button"
              tabIndex={0}
              onClick={() => setActiveStep(step.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveStep(step.id);
                }
              }}
              className={`
                group rounded-[var(--radius-card)]
                transition-all duration-300 cursor-pointer h-full
                ${isActive ? 'shadow-[var(--shadow-md)]' : 'shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]'}
                border border-[var(--border-default)]
              `}
              style={{ background: 'linear-gradient(135deg, #f3f4ff80, #fafafa4d)' }}
            >
              <div className="px-3 py-4 sm:px-4 sm:py-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-10 rounded-[var(--radius-card)] flex items-center justify-center flex-shrink-0 bg-[var(--color-accent-purple)]/10">
                    <Icon className="h-4 w-4 text-[var(--color-accent-purple)]" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-[var(--typography-family-body)] font-medium text-[var(--typography-size-sm)] text-[var(--surface-text)] leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-[var(--typography-size-compact)] text-[var(--surface-text-muted)] leading-snug mt-0.5">
                      {step.subtitle}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {step.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-[var(--typography-size-compact)] text-[var(--surface-text-muted)] group-hover:text-[var(--surface-text)] transition-colors duration-200"
                    >
                      <ChevronRight className="h-3.5 w-3.5 mt-[3px] flex-shrink-0 text-[var(--color-accent-purple)]" strokeWidth={2} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
