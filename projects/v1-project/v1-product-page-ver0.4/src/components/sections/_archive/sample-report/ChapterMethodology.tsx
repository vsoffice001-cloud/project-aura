'use client';

/**
 * ChapterMethodology — Chapter 11: Research Methodology
 *
 * @what  Horizontal stepper tabs + 3-column card grid.
 *        activeStep state controls card elevation via shadow.
 *        3 steps: Desk Research · Primary Research · Validation.
 *
 * @why   Port from V0_lite_report-legacy ChapterMethodology.tsx.
 *        Content adapted to Australia Cold Chain methodology.
 *        ChevronRight icons = decorative bullet pointers (content purple).
 *        Cards do NOT expand — shadow shift is the only state change.
 *
 * @when  §22 SamplePreviewSection · Chapter 11 · fourth unlocked chapter
 *
 * Adapts: @/design-system/SectionLabel → inline label · @/design-system/iconColors → inline hex
 */

import { useState } from 'react';
import { Search, ChevronRight, CircleCheckBig, FileCheck } from 'lucide-react';

const CONTENT_COLOR = '#806ce0';

const methodologySteps = [
  {
    id: 1,
    tabLabel: 'Approach',
    icon: Search,
    title: 'Desk Research',
    subtitle: 'Comprehensive secondary research from authoritative Australian sources.',
    bullets: [
      'ABS, RBA, DAFF, FSANZ, TGA regulatory publications',
      'RWTA and AFCC industry association reports',
      'Company annual reports: Lineage · Americold · Linfox · Toll',
      'Global cold-chain benchmarks (GCCA, World Bank cold chain index)',
    ],
  },
  {
    id: 2,
    tabLabel: 'Data Collection',
    icon: CircleCheckBig,
    title: 'Primary Research',
    subtitle: 'Direct engagement with Australian cold-chain participants.',
    bullets: [
      '240+ executive interviews across operators, 3PLs, and end-users',
      'Surveys with cold-storage and transport procurement heads',
      'Field visits to cold-chain hubs in Sydney, Melbourne, Brisbane, Perth',
      'Expert interviews with regulatory and compliance specialists',
    ],
  },
  {
    id: 3,
    tabLabel: 'Validation',
    icon: FileCheck,
    title: 'Validation',
    subtitle: 'Multi-source verification for accuracy and confidence.',
    bullets: [
      'Triangulation across 500+ independent data points',
      'Regression modelling on 18 demand-supply variables',
      'Expert panel review by senior cold-chain logistics professionals',
      'Statistical cross-check vs Oxford Economics and World Bank datasets',
    ],
  },
];

export function ChapterMethodology() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div id="chapter-11-methodology" className="mb-12 scroll-mt-16">
      {/* Chapter Label */}
      <div className="mb-4">
        <span
          className="inline-flex items-center rounded-[var(--radius-xs,5px)] border border-[var(--black-100,#f5f5f5)] px-2.5 py-1 font-body uppercase tracking-[0.08em] text-[var(--semantic-ink-subtle,#a3a3a3)]"
          style={{ fontSize: '10.5px', fontWeight: 600 }}
        >
          Chapter 11 · Research Methodology
        </span>
      </div>

      <h2 className="text-[1.953rem] sm:text-[2.441rem] font-light font-serif text-black leading-[1.25] mb-4">
        Research Methodology
      </h2>
      <p className="text-[1rem] text-[var(--black-500,#a3a3a3)] leading-[1.7] max-w-[50rem] mb-10">
        Our multi-layered approach combines rigorous desk research with primary data collection
        across 240+ executive interviews and expert validation to ensure accuracy and
        reliability across all 8 Australian states and territories.
      </p>

      {/* Step Tabs */}
      <div className="mb-10">
        <div
          className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center"
          style={{ scrollbarWidth: 'none' }}
        >
          {methodologySteps.map((step, idx) => (
            <div key={step.id} className="flex items-center">
              <button
                type="button"
                onClick={() => setActiveStep(step.id)}
                className={`
                  inline-flex items-center justify-center gap-2 h-12 rounded-[10px] px-4 sm:px-6
                  text-[0.875rem] font-medium transition-all duration-200
                  ${
                    activeStep === step.id
                      ? 'bg-black text-white'
                      : 'bg-white text-black border border-[var(--warm-500,#e8e4e0)] hover:border-black'
                  }
                `}
              >
                <span
                  className={`
                    size-6 rounded-full flex items-center justify-center text-[0.75rem] font-semibold flex-shrink-0
                    ${
                      activeStep === step.id
                        ? 'bg-white/20 text-white'
                        : 'bg-[var(--black-100,#f5f5f5)] text-[var(--black-500,#a3a3a3)]'
                    }
                  `}
                >
                  {step.id}
                </span>
                <span className="hidden sm:inline">{step.tabLabel}</span>
              </button>

              {idx < methodologySteps.length - 1 && (
                <ChevronRight className="h-5 w-5 text-[var(--black-300,#d4d4d4)] mx-1 sm:mx-2 flex-shrink-0" />
              )}
            </div>
          ))}
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
              onClick={() => setActiveStep(step.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveStep(step.id); }}
              className={`
                group rounded-[10px]
                transition-all duration-300 cursor-pointer h-full
                ${isActive
                  ? 'shadow-[0_4px_16px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]'
                  : 'shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]'
                }
                border border-[var(--black-200,#e5e5e5)]
              `}
              style={{ background: 'linear-gradient(135deg, #f3f4ff80, #fafafa4d)' }}
            >
              <div className="px-3 py-4 sm:px-4 sm:py-5">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="size-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(128, 108, 224, 0.1)' }}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} color={CONTENT_COLOR} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-body font-medium text-[1rem] text-black leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-[0.813rem] text-[var(--black-500,#a3a3a3)] leading-snug mt-0.5">
                      {step.subtitle}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {step.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-2 text-[0.813rem] text-[var(--black-500,#a3a3a3)] group-hover:text-black transition-colors duration-200"
                    >
                      <ChevronRight
                        className="h-3.5 w-3.5 mt-[3px] flex-shrink-0"
                        strokeWidth={2}
                        color={CONTENT_COLOR}
                      />
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
