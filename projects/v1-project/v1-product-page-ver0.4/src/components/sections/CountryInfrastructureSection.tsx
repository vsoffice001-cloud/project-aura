'use client';

/**
 * CountryInfrastructureSection — v0.4 §03 Country & Infrastructure
 *
 * @what  Country macro context section · 6 indicator cards w/ value + period + relevance note.
 *        Single-tab variant (Infrastructure tab DEFERRED · live page has zero infra data).
 *
 * @why   Per V04 master plan §3.7 + PRD §8.5 · Country & Infrastructure is ADDED module.
 *        Live Australia Cold Chain page renders macro stats (GDP · Population · Inflation ·
 *        Imports · Trade partners · Ag GDP) but NO infrastructure data (roads/ports/rail/air).
 *        v0.4 ships Country tab w/ live-verified audit values; Infrastructure deferred to
 *        content team supply.
 *
 * @when  v0.4 PDP body §03. Below Scope & Coverage.
 *
 * @how   DS atoms: SectionLabel (eyebrow) · Badge (period chip) · raw card grid w/ DS tokens.
 *        Each card: indicator name (label) · large serif value · period · italic relevance note.
 *
 * Data source: SECTION-AUDIT-LIVE-2026-05-20.md · live Australia page actual macro values.
 */

import { SectionLabel } from '@kenresearch/design-system/atoms';

interface IndicatorCard {
  id: string;
  label: string;
  value: string;
  period: string;
  relevance: string;
}

const INDICATORS: IndicatorCard[] = [
  {
    id: 'population',
    label: 'Population',
    value: '25.9 M',
    period: '2022',
    relevance: 'Domestic consumption base for cold-chain-dependent food + pharma demand.',
  },
  {
    id: 'gdp',
    label: 'GDP',
    value: 'USD 1,450 Bn',
    period: '2022',
    relevance: 'Grew from USD 1,428.5 Bn in 2017 — diversified industrial base supports complex logistics.',
  },
  {
    id: 'inflation',
    label: 'Inflation',
    value: '2.9 %',
    period: '2021',
    relevance: 'Stable price environment — input-cost predictability for cold-chain operators.',
  },
  {
    id: 'imports',
    label: 'Imports CAGR',
    value: '5.8 %',
    period: '2017–2022',
    relevance: 'Top partners China 19.4% · USA · Japan — perishable cross-border flows lift reefer demand.',
  },
  {
    id: 'ag-gdp',
    label: 'Agricultural GDP',
    value: 'USD 68.9 Bn',
    period: '2022',
    relevance: '3.2% of total GDP — F&B export economy drives cold-storage + reefer transport investment.',
  },
  {
    id: 'meat-consumption',
    label: 'Meat consumption',
    value: '89.6 kg',
    period: 'per capita / yr',
    relevance: 'Pork 28.1 kg/cap · high refrigerated retail throughput supports cold-storage utilization.',
  },
];

export function CountryInfrastructureSection() {
  return (
    <section
      id="country-infra"
      aria-labelledby="country-infra-heading"
      className="px-4 sm:px-6 lg:px-12 max-w-[1100px] mx-auto w-full scroll-mt-[120px]"
    >
      {/* Eyebrow · DS SectionLabel · brand-red accent */}
      <div className="inline-flex mb-3">
        <SectionLabel background="light" variant="accent">
          Section 03 · Country Context
        </SectionLabel>
      </div>

      {/* H2 · serif light */}
      <h2
        id="country-infra-heading"
        className="font-display font-light text-[clamp(28px,3vw,39px)] leading-[1.15] tracking-[-0.015em] text-[var(--semantic-ink-strong)] mb-3"
      >
        Why Australia matters
      </h2>

      {/* Lede */}
      <p className="font-body text-[16px] leading-[1.6] text-[var(--semantic-ink-body)] max-w-[60ch] mb-10">
        Macro indicators that anchor cold-chain demand — population, trade flow,
        and food-economy depth all shape segment growth.
      </p>

      {/* Indicator card grid · responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {INDICATORS.map((ind) => (
          <article
            key={ind.id}
            className="rounded-[var(--radius-sm,10px)] border border-[var(--black-100)] bg-[var(--color-foundation-white)] p-5 flex flex-col gap-2"
            aria-labelledby={`${ind.id}-label`}
          >
            <p
              id={`${ind.id}-label`}
              className="uppercase tracking-[0.12em] text-[var(--semantic-ink-muted)]"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600 }}
            >
              {ind.label}
            </p>
            <p
              className="font-display font-light tracking-[-0.01em] text-[var(--semantic-ink-strong)]"
              style={{ fontSize: 'clamp(22px, 2vw, 28px)', lineHeight: 1.2 }}
            >
              {ind.value}
            </p>
            <p className="font-body text-[12px] text-[var(--semantic-ink-muted)]">
              {ind.period}
            </p>
            <p className="font-body text-[14px] leading-[1.55] text-[var(--semantic-ink-body)] italic mt-1">
              {ind.relevance}
            </p>
          </article>
        ))}
      </div>

      {/* Infrastructure DEFERRED notice */}
      <p className="font-body text-[12px] text-[var(--semantic-ink-muted)] italic mt-6">
        Infrastructure context (roads · ports · rail · air) pending content-team data fill.
      </p>
    </section>
  );
}
