'use client';

/**
 * ProcessFlowDiagram · horizontal 4-step research process flow · §19 Methodology.
 *
 * @what  Horizontal 4-step flow diagram · each step = periwinkle/perano fill icon +
 *        step number + step name + 2-3 bullet points · arrows between steps ·
 *        mobile: vertical stack · desktop: horizontal 4-col flex.
 *        Steps: Define scope · Collect data · Triangulate & model · Validate & publish.
 *
 * @why   Methodology sections in Gartner / Forrester / Ken Research use process flow
 *        diagrams to establish research credibility and transparency. Visual flow
 *        (left-to-right) communicates sequential rigor · numbered steps signal
 *        structured process · bullet specifics show depth without walls of prose.
 *
 * @when  §19 Methodology · above MethodologyPillar · between MetricStrip and pillar grid.
 *
 * @how   ```tsx
 *        <ProcessFlowDiagram />
 *        ```
 *
 * Color scheme: step fills use periwinkle/perano palette (KEN_CHART_COLORS) ·
 * dark enough for 4.5:1 contrast on white bg per a11y.
 * Arrows: inline SVG · simple → chevron · muted ink.
 *
 * @relatedDoc projects/v1-product-page-ver0.4/docs/TABS-SWITCHERS-INFO-COMPOSITION.md §4
 * @relatedDoc projects/v1-product-page-ver0.4/docs/COLOR-USAGE-GUIDE.md §3.2
 */

// ─────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────

interface FlowStep {
  number: string;
  name: string;
  bullets: string[];
  color: string;
  bgColor: string;
}

const FLOW_STEPS: FlowStep[] = [
  {
    number: '01',
    name: 'Define scope',
    bullets: [
      'Market boundaries set w/ client',
      'Geography: Australia all states',
      'Segments: Storage + Transport',
    ],
    color: '#7075c8',          // periwinkle-800
    bgColor: 'rgba(112, 117, 200, 0.10)',
  },
  {
    number: '02',
    name: 'Collect data',
    bullets: [
      '240+ CATI/CAPI primary interviews',
      'ABS · RBA · ASX secondary data',
      '18-month rolling data window',
    ],
    color: '#9488ec',          // purple-500
    bgColor: 'rgba(148, 136, 236, 0.10)',
  },
  {
    number: '03',
    name: 'Triangulate & model',
    bullets: [
      'Cross-validate primary vs secondary',
      'Regression on 18 macro variables',
      'Monte Carlo scenario overlay',
    ],
    color: '#86b3e5',          // perano-800 (slightly darker for contrast)
    bgColor: 'rgba(134, 179, 229, 0.12)',
  },
  {
    number: '04',
    name: 'Validate & publish',
    bullets: [
      '3 rounds: analyst · peer · client',
      'Expert panel sign-off (5 SMEs)',
      'Every number citable to source',
    ],
    color: '#5a5fa0',          // periwinkle-900
    bgColor: 'rgba(90, 95, 160, 0.08)',
  },
];

// ─────────────────────────────────────────────────────────────────
// StepCard · single flow step
// ─────────────────────────────────────────────────────────────────

function StepCard({ step }: { step: FlowStep }) {
  return (
    <article
      className="flex-1 min-w-0 rounded-[var(--radius-sm,10px)] p-4"
      style={{ background: step.bgColor, border: `1px solid ${step.color}22` }}
      aria-label={`Step ${step.number}: ${step.name}`}
    >
      {/* Step number badge */}
      <div
        className="inline-flex items-center justify-center w-7 h-7 rounded-full mb-3"
        style={{ background: step.color }}
        aria-hidden="true"
      >
        <span
          className="font-body text-white"
          style={{ fontSize: '11px', fontWeight: 700 }}
        >
          {step.number}
        </span>
      </div>

      {/* Step name */}
      <p
        className="font-body font-semibold text-[var(--semantic-ink-strong)] mb-2 leading-snug"
        style={{ fontSize: '13px' }}
      >
        {step.name}
      </p>

      {/* Bullets */}
      <ul className="space-y-1.5">
        {step.bullets.map((b, i) => (
          <li
            key={i}
            className="flex items-start gap-1.5 font-body text-[var(--semantic-ink-body)]"
            style={{ fontSize: '11.5px', lineHeight: 1.45 }}
          >
            <span
              aria-hidden="true"
              className="inline-block flex-none rounded-full mt-[5px]"
              style={{ width: '4px', height: '4px', background: step.color }}
            />
            {b}
          </li>
        ))}
      </ul>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────
// Arrow · muted chevron between steps
// ─────────────────────────────────────────────────────────────────

function Arrow({ vertical = false }: { vertical?: boolean }) {
  return (
    <div
      className={vertical ? 'flex justify-center py-1' : 'flex items-center flex-none px-0.5'}
      aria-hidden="true"
    >
      <svg
        width={vertical ? 16 : 20}
        height={vertical ? 20 : 16}
        viewBox="0 0 20 20"
        fill="none"
        style={{ transform: vertical ? 'rotate(90deg)' : undefined }}
      >
        <path
          d="M4 10h12M12 5l5 5-5 5"
          stroke="rgba(0,0,0,0.3)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────

export interface ProcessFlowDiagramProps {
  /** Optional className passthrough */
  className?: string;
}

export function ProcessFlowDiagram({ className }: ProcessFlowDiagramProps) {
  return (
    <div
      className={className}
      role="region"
      aria-label="Research process flow · 4 steps"
    >
      {/* Desktop: horizontal flex · Mobile: vertical stack */}
      <div className="hidden md:flex items-stretch gap-2">
        {FLOW_STEPS.map((step, i) => (
          <div key={step.number} className="flex items-stretch flex-1 min-w-0">
            <StepCard step={step} />
            {i < FLOW_STEPS.length - 1 && (
              <Arrow />
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical stack */}
      <div className="flex md:hidden flex-col gap-1">
        {FLOW_STEPS.map((step, i) => (
          <div key={step.number}>
            <StepCard step={step} />
            {i < FLOW_STEPS.length - 1 && <Arrow vertical />}
          </div>
        ))}
      </div>
    </div>
  );
}
