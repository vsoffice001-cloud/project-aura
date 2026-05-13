/**
 * BenchmarkMethodologyPreview — Organism
 * competition-benchmarking-listing-v01
 *
 * "How we benchmark" 3-step process preview.
 * bg: white (per caller in App.tsx). Container: content (1000).
 * DS tokens only — no hardcoded hex/px.
 */

import { Target, Search, BarChart3 } from 'lucide-react';
import { CTALink } from './CTALink';

const STEPS = [
  {
    number: '01',
    icon: Target,
    title: 'Frame',
    description: 'Define the competitor set, evaluation criteria, and output format with your strategy team.',
  },
  {
    number: '02',
    icon: Search,
    title: 'Source',
    description: 'Mystery shopping, expert interviews, and structured public data collection across all competitors.',
  },
  {
    number: '03',
    icon: BarChart3,
    title: 'Synthesize',
    description: 'Pattern extraction, indexed scoring, and board-ready synthesis with slide-ready deliverables.',
  },
] as const;

export function BenchmarkMethodologyPreview() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 400,
            color: 'var(--text-primary)',
            lineHeight: 1.2,
            marginBottom: 'var(--space-3)',
          }}
        >
          How we benchmark
        </h2>
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: 'var(--container-prose)',
          }}
        >
          Three steps from competitor frame to board-ready output
        </p>
      </div>

      {/* 3-col grid */}
      <div className="grid gap-8 md:grid-cols-3" style={{ marginBottom: 'var(--space-8)' }}>
        {STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.number} className="flex flex-col gap-4">
              {/* Step number */}
              <span
                className="uppercase tracking-widest"
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--label-on-white)',
                  letterSpacing: '0.12em',
                  fontWeight: 500,
                }}
              >
                {step.number}
              </span>

              {/* Icon */}
              <div
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  border: '1px solid var(--hairline-soft)',
                  borderRadius: 'var(--radius-element)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--warm-100)',
                }}
              >
                <Icon className="h-4 w-4" style={{ color: 'var(--brand-red)' }} />
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  lineHeight: 1.2,
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                {step.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <CTALink href="/research/competition-benchmarking/methodology">
        View full methodology
      </CTALink>
    </div>
  );
}
