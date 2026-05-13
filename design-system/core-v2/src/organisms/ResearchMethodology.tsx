/**
 * ResearchMethodology — Organism (DS v4.3)
 *
 * WHAT: Research methodology overview section (trust-building).
 * WHY:  Establishes credibility by showing the research process steps.
 * WHEN: Report Store home page, typically near the bottom before CTA.
 * HOW:  SectionWrapper(warm) + numbered methodology steps.
 *
 * COLOR SYSTEM: Pure monochromatic black/opacity. Step numbers use content icon color.
 */
import { SectionWrapper } from '../atoms/SectionWrapper';
import { SectionHeading } from '../atoms/SectionHeading';
import { iconColors } from '../atoms/iconColors';
import {
  Search, Database, BarChart3, FileCheck, Shield,
} from 'lucide-react';
import { IconBadge } from '../atoms/IconBadge';

const STEPS = [
  { icon: Search, title: 'Primary Research', description: 'In-depth interviews with 200+ industry executives, C-suite leaders, and domain experts per report.' },
  { icon: Database, title: 'Data Collection', description: 'Proprietary datasets from 50+ verified sources including regulatory filings, patent databases, and trade data.' },
  { icon: BarChart3, title: 'Quantitative Modeling', description: 'Bottom-up market sizing with Monte Carlo simulations and scenario analysis for forecast ranges.' },
  { icon: FileCheck, title: 'Peer Review', description: 'Every report undergoes dual-analyst review, editorial QA, and external expert validation.' },
  { icon: Shield, title: 'Quality Assurance', description: 'Continuous data validation against published benchmarks with quarterly forecast accuracy audits.' },
];

export function ResearchMethodology() {
  return (
    <SectionWrapper background="warm" spacing="lg" maxWidth="wide">
      <div className="max-w-[1000px] mx-auto">
        <SectionHeading
          label="Our Approach"
          title="Research Methodology"
          subtitle="How we deliver accurate, actionable market intelligence"
        />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {STEPS.map((step, idx) => (
            <div key={idx} className="flex flex-col items-start gap-3">
              {/* Step number + icon */}
              <div className="flex items-center gap-2.5">
                <span
                  className="tabular-nums"
                  style={{
                    fontSize: 'var(--text-lg)',
                    color: iconColors.content,
                    opacity: 0.4,
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <IconBadge icon={step.icon} size="sm" />
              </div>

              {/* Title */}
              <h4 style={{ fontSize: 'var(--text-sm)', color: 'rgba(0,0,0,0.85)' }}>
                {step.title}
              </h4>

              {/* Description */}
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.45)', lineHeight: 1.5 }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}