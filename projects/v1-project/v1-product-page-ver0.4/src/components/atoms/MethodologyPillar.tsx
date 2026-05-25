'use client';

/**
 * MethodologyPillar · 3-col grid of methodology pillars · §19 Methodology.
 *
 * @what  3-column grid · each pillar = icon + pillar name + description + 3-4
 *        specific data points (e.g. "240+ executive interviews") · periwinkle
 *        icon fills · no card chrome · whitespace-separated only.
 *        Pillars: Primary research · Secondary research · Quantitative modeling.
 *
 * @why   Methodology trust-building follows a 3-pillar structure standard in
 *        IBISWorld / Gartner / Ken Research: show the INPUT (primary field work) ·
 *        the VALIDATION (secondary datasets) · the OUTPUT METHOD (modeling).
 *        3-col grid reads as "rigorous triangulation" visually.
 *
 * @when  §19 Methodology · after ProcessFlowDiagram · above DonutChart sample composition.
 *
 * @how   ```tsx
 *        <MethodologyPillar />
 *        ```
 *
 * Uses periwinkle/perano icon fills per COLOR-USAGE-GUIDE §3.2.
 * No card chrome — whitespace rhythm per ref pattern (merged-report).
 * 3-col md · 1-col mobile.
 *
 * @relatedDoc projects/v1-product-page-ver0.4/docs/REF-PATTERNS-ADOPTION.md §7
 * @relatedDoc projects/v1-product-page-ver0.4/docs/FONT-PAIRING-GUIDE.md §3
 */

// ─────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────

interface PillarData {
  id: string;
  icon: string;      // emoji or unicode symbol (no external dep)
  name: string;
  description: string;
  specifics: string[];
  color: string;
  bgColor: string;
}

const PILLARS: PillarData[] = [
  {
    id: 'primary',
    icon: '◎',
    name: 'Primary research',
    description:
      'Direct field interviews with industry participants across the full cold-chain value chain — operators, end-users, logistics providers, pharma distributors.',
    specifics: [
      '240+ executive interviews (CATI + CAPI)',
      'C-suite · Ops · Supply chain · Consultants',
      'Coverage: all Australian states + NT',
      'NDA-protected · pricing + capacity disclosed',
    ],
    color: '#7075c8',
    bgColor: 'rgba(112, 117, 200, 0.08)',
  },
  {
    id: 'secondary',
    icon: '◈',
    name: 'Secondary research',
    description:
      'Government statistics, ASX filings, trade body publications, and international benchmarks cross-validated against primary findings.',
    specifics: [
      'ABS Cat. 8731 Warehousing Census',
      'RBA + Oxford Economics macro data',
      'Lineage · Americold · NewCold ASX filings',
      '18-month rolling data window',
    ],
    color: '#9488ec',
    bgColor: 'rgba(148, 136, 236, 0.08)',
  },
  {
    id: 'modeling',
    icon: '◇',
    name: 'Quantitative modeling',
    description:
      'Regression-based demand modeling with Monte Carlo uncertainty overlay. All forecast numbers derive from auditable model — no black-box assumptions.',
    specifics: [
      'Regression on 18 macro + sector variables',
      'Monte Carlo scenario fan (Bear/Base/Bull)',
      '3-round analyst + peer + client validation',
      'CAGR anchored to PRD-verified data points',
    ],
    color: '#5a5fa0',
    bgColor: 'rgba(90, 95, 160, 0.06)',
  },
];

// ─────────────────────────────────────────────────────────────────
// PillarCard · single pillar
// ─────────────────────────────────────────────────────────────────

function PillarCard({ pillar }: { pillar: PillarData }) {
  return (
    <article
      className="min-w-0"
      aria-labelledby={`methodology-pillar-${pillar.id}`}
    >
      {/* Icon circle */}
      <div
        className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-4"
        style={{ background: pillar.bgColor, border: `1.5px solid ${pillar.color}44` }}
        aria-hidden="true"
      >
        <span style={{ fontSize: '16px', color: pillar.color, lineHeight: 1 }}>
          {pillar.icon}
        </span>
      </div>

      {/* Pillar name */}
      <h3
        id={`methodology-pillar-${pillar.id}`}
        className="font-body font-semibold text-[var(--semantic-ink-strong)] mb-2"
        style={{ fontSize: '14px', letterSpacing: '-0.005em' }}
      >
        {pillar.name}
      </h3>

      {/* Description */}
      <p
        className="font-body text-[var(--semantic-ink-body)] mb-3"
        style={{ fontSize: '13px', lineHeight: 1.6 }}
      >
        {pillar.description}
      </p>

      {/* Specifics */}
      <ul className="space-y-1.5" aria-label={`${pillar.name} specifics`}>
        {pillar.specifics.map((s, i) => (
          <li
            key={i}
            className="flex items-start gap-2 font-body text-[var(--semantic-ink-body)]"
            style={{ fontSize: '12px', lineHeight: 1.5 }}
          >
            <span
              aria-hidden="true"
              className="inline-block flex-none rounded-full mt-[6px]"
              style={{ width: '4px', height: '4px', background: pillar.color }}
            />
            {s}
          </li>
        ))}
      </ul>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────

export interface MethodologyPillarProps {
  /** Optional className passthrough */
  className?: string;
}

export function MethodologyPillar({ className }: MethodologyPillarProps) {
  return (
    <div
      className={[
        'grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6',
        className ?? '',
      ].join(' ')}
      role="region"
      aria-label="Methodology pillars · 3 research approaches"
    >
      {PILLARS.map((pillar, i) => (
        <div key={pillar.id}>
          {i > 0 && (
            <div
              className="hidden md:block absolute"
              aria-hidden="true"
            />
          )}
          <PillarCard pillar={pillar} />
        </div>
      ))}
    </div>
  );
}
