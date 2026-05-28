'use client';

/**
 * ScopeAndCoverageSection — v0.4 §02 Scope & Coverage
 *
 * @what  Editorial section · 5 chip-card groups (Segments · Geography · Period · Deliverables · Customization).
 *        Maps to CMS Report core flat field shape: `scope_segments[] · geography[] · period · deliverables[]`.
 *        Buyer-scan pattern: "am I getting what I need before I buy?"
 *
 * @why   Distinct from §06 Taxonomy (tree/MindMap · matches CMS Taxonomy object hierarchy data shape).
 *        PRD V2.1 §8.4: Scope & Coverage = market coverage · geography · period · segment coverage ·
 *        competitor coverage · methodology coverage · deliverables · customization options.
 *        Content team enters scope as <select multiple> + checkboxes → flat chip arrays.
 *
 * @when  v0.4 PDP body §02. Below Executive Summary.
 *
 * @how   DS atoms: SectionLabel (eyebrow) · Badge (chip tags · rounded neutral bordered).
 *        Raw h2 + grid of card-groups w/ DS tokens. NO MindMap (that's §06 Taxonomy job).
 */

import { SectionLabel, Badge } from '@kenresearch/design-system/atoms';

interface ScopeGroup {
  id: string;
  label: string;
  chips: string[];
}

const SCOPE_GROUPS: ScopeGroup[] = [
  {
    id: 'segments',
    label: 'Segments covered',
    chips: [
      'Cold Storage',
      'Cold Transport',
      'By End-User',
      'By Temperature',
      'By Region',
      'By Reefer Truck Type',
      'By Transport Mode',
      'Domestic vs Intl',
    ],
  },
  {
    id: 'geography',
    label: 'Geography',
    chips: ['Australia', 'Sydney', 'Melbourne', 'Brisbane', 'Other regions'],
  },
  {
    id: 'period',
    label: 'Period',
    chips: ['Historical 2017–2022', 'Forecast 2022–2027', 'Base year 2024'],
  },
  {
    id: 'deliverables',
    label: 'Deliverables',
    chips: [
      '90-page PDF report',
      'Excel datasets',
      '30-day analyst support',
      'Email queries',
    ],
  },
  {
    id: 'customization',
    label: 'Customization',
    chips: [
      'Available on request',
      'Custom segments',
      'Additional regions',
      'Vendor benchmarks',
    ],
  },
];

export function ScopeAndCoverageSection() {
  return (
    <section
      id="scope"
      aria-labelledby="scope-heading"
      className="px-4 sm:px-6 lg:px-12 max-w-[1100px] mx-auto w-full scroll-mt-[120px]"
    >
      {/* Eyebrow · DS SectionLabel · accent brand-red */}
      <div className="inline-flex mb-3">
        <SectionLabel background="light" variant="accent">
          Section 02 · Scope & Coverage
        </SectionLabel>
      </div>

      {/* H2 · serif light */}
      <h2
        id="scope-heading"
        className="font-display font-light text-[clamp(28px,3vw,39px)] leading-[1.15] tracking-[-0.015em] text-[var(--semantic-ink-strong)] mb-3"
      >
        What this report covers
      </h2>

      {/* Lede */}
      <p className="font-body text-[16px] leading-[1.6] text-[var(--semantic-ink-body)] max-w-[60ch] mb-10">
        Quick scan of the segments, geographies, period, deliverables, and customization included.
        Drill into any dimension for the full segment intelligence below.
      </p>

      {/* 5 chip-card groups · responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {SCOPE_GROUPS.map((g) => (
          <div
            key={g.id}
            className="rounded-[var(--radius-sm,10px)] border border-[var(--black-100)] bg-[var(--color-foundation-white)] p-5"
          >
            <p
              className="uppercase tracking-[0.12em] text-[var(--semantic-ink-muted)] mb-3"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600 }}
            >
              {g.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {g.chips.map((c) => (
                <Badge key={c} variant="rounded" size="sm" theme="neutral" bordered>
                  {c}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
