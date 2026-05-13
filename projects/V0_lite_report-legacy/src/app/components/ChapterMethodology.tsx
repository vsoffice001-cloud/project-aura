import { useState } from 'react';
import { Search, ChevronRight, CircleCheckBig, FileCheck } from 'lucide-react';
import { SectionLabel } from '@/design-system/components/SectionLabel';
import { iconColors } from '@/design-system/iconColors';

/**
 * ChapterMethodology — Chapter 11: Research Methodology
 *
 * Layout: Horizontal stepper tabs + 3-column card grid.
 * The `activeStep` state controls which card gets elevated shadow,
 * toggled by clicking either the stepper tabs or the cards themselves.
 *
 * Design decisions (confirmed post-audit — no changes needed):
 *   - ChevronRight icons in bullet lists are DECORATIVE POINTERS (visual
 *     bullet markers), NOT disclosure/expand arrows. They use
 *     `iconColors.content` (#806ce0) because they represent content structure.
 *   - `group-hover:text-black` on bullet items is INTENTIONAL: hovering the
 *     card highlights all bullet text simultaneously to signal the card as
 *     a unified interactive unit.
 *   - Cards do NOT expand/collapse — the shadow depth change via `activeStep`
 *     is the only visual state shift.
 */
const methodologySteps = [
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

export function ChapterMethodology() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div id="chapter-11-methodology" className="mb-12 scroll-mt-16">
      <div className="mb-4">
        <SectionLabel background="light" variant="accent">
          CHAPTER 11 - OUR APPROACH
        </SectionLabel>
      </div>

      <h2 className="text-[1.953rem] sm:text-[2.441rem] font-light font-serif text-black leading-[1.25] mb-4">
        Research Methodology
      </h2>
      <p className="text-[1rem] text-[var(--black-500)] leading-[1.7] max-w-[50rem] mb-10">
        Our multi-layered approach combines rigorous desk research with
        primary data collection and expert validation to ensure accuracy and
        reliability.
      </p>

      {/* Step Tabs — horizontal stepper */}
      <div className="mb-10">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center" style={{ scrollbarWidth: 'none' }}>
          {methodologySteps.map((step, idx) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => setActiveStep(step.id)}
                className={`
                  inline-flex items-center justify-center gap-2 h-12 rounded-[10px] px-4 sm:px-6
                  text-[0.875rem] font-medium transition-all duration-200
                  ${
                    activeStep === step.id
                      ? 'bg-black text-white hover:bg-[var(--black-900)]'
                      : 'bg-white text-black border border-[var(--warm-500)] hover:border-black hover:bg-[var(--coral-50)] active:bg-[var(--coral-100)]'
                  }
                `}
              >
                <span
                  className={`
                    size-6 rounded-full flex items-center justify-center text-[0.75rem] font-semibold flex-shrink-0
                    ${
                      activeStep === step.id
                        ? 'bg-white/20 text-white'
                        : 'bg-[var(--black-100)] text-[var(--black-500)]'
                    }
                  `}
                >
                  {step.id}
                </span>
                <span className="hidden sm:inline">{step.tabLabel}</span>
              </button>

              {idx < methodologySteps.length - 1 && (
                <ChevronRight className="h-5 w-5 text-[var(--black-300)] mx-1 sm:mx-2 flex-shrink-0" />
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
              className={`
                group rounded-[10px]
                transition-all duration-300 cursor-pointer h-full
                ${isActive
                  ? 'shadow-[0_4px_16px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]'
                  : 'shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]'
                }
                border border-[var(--black-200)]
              `}
              style={{
                background: 'linear-gradient(135deg, #f3f4ff80, #fafafa4d)',
              }}
            >
              <div className="px-3 py-4 sm:px-4 sm:py-5">
                {/* Icon + Title row */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="size-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(128, 108, 224, 0.1)' }}
                  >
                    <Icon
                      className="h-4 w-4"
                      strokeWidth={2}
                      color={iconColors.content}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-sans font-medium text-[1rem] text-black leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-[0.813rem] text-[var(--black-500)] leading-snug mt-0.5">
                      {step.subtitle}
                    </p>
                  </div>
                </div>

                {/* Bullet list */}
                <ul className="space-y-2">
                  {step.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-2 text-[0.813rem] text-[var(--black-500)] group-hover:text-black transition-colors duration-200"
                    >
                      <ChevronRight
                        className="h-3.5 w-3.5 mt-[3px] flex-shrink-0"
                        strokeWidth={2}
                        color={iconColors.content}
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