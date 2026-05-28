'use client';

/**
 * ExecutiveSummarySection — v0.4 §3.5 Executive Summary
 *
 * @what  Editorial 2-col section · LEFT prose (200-word boardroom summary + 3 takeaways) ·
 *        RIGHT sidekick AnswerBlock + 4 use-case Badge tags.
 *        Section eyebrow + serif H2 trio (V0_lite canonical L20-28 pattern).
 *
 * @why   Per V04 master plan §3.5 + PRD V2.1 §8.3: boardroom summary · max 200 words ·
 *        top 3-5 takeaways · use-case chips · sidekick Q&A for AI-extractable answer block.
 *        Editorial reading pattern · NO stat cards (hero owns stat moment · drop V0_lite §34-53 pattern here).
 *
 * @when  v0.4 PDP body section §01 (after KeyStats dropped). Below hero · inside 2-col body.
 *
 * @how   DS atoms: SectionLabel (eyebrow · brand-red) · AnswerBlock (sidekick · card variant) ·
 *        Badge (use-case tags · rounded variant · neutral theme).
 *        Raw h2 + p + ul with DS font tokens · no DS heading atom covers hero/section range.
 *
 *        Grid · 1-col mobile · lg:grid-cols-5 (3:2 split · 60/40 prose:sidekick).
 *        Container width matches sentinel sections (max-w-[880px] · centered).
 */

import { SectionLabel, AnswerBlock, Badge } from '@kenresearch/design-system/atoms';

const TAKEAWAYS = [
  'Cold Transport leads market value share (60%) but Cold Storage shows faster expansion in pharma + e-grocery segments.',
  'Sydney + Melbourne concentrate 62.5% regional demand · Brisbane growing fastest at +14% YoY.',
  'Automation + temperature-IoT investment shifts unit economics — Newcold Melbourne 30% cost advantage signals industry inflection.',
];

const USE_CASES = [
  'Market entry',
  'Benchmarking',
  'Investment screening',
  'Expansion planning',
];

export function ExecutiveSummarySection() {
  return (
    <section
      id="executive-summary"
      aria-labelledby="executive-summary-heading"
      className="px-4 sm:px-6 lg:px-12 max-w-[1100px] mx-auto w-full scroll-mt-[120px]"
    >
      {/* Eyebrow · DS SectionLabel · accent → brand-red */}
      <div className="inline-flex mb-3">
        <SectionLabel background="light" variant="accent">
          Section 01 · Executive Summary
        </SectionLabel>
      </div>

      {/* H2 · serif light */}
      <h2
        id="executive-summary-heading"
        className="font-display font-light text-[clamp(28px,3vw,39px)] leading-[1.15] tracking-[-0.015em] text-[var(--semantic-ink-strong)] mb-8 max-w-[24ch]"
      >
        Why Australia&apos;s cold chain matters
      </h2>

      {/* 2-col grid · 3:2 split · stacks mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* LEFT · prose + takeaways · spans 3 cols */}
        <div className="lg:col-span-3 space-y-6">
          <p className="font-body text-[16px] leading-[1.7] text-[var(--semantic-ink-body)]">
            Australia&apos;s cold chain market reached <strong className="text-[var(--semantic-ink-strong)] font-medium">AUD 6,547.8 Mn in 2022</strong> and is
            projected to grow at <strong className="text-[var(--semantic-ink-strong)] font-medium">10.03% CAGR</strong> to AUD 10,705 Mn by 2027 — driven by
            surging pharmaceutical compliance demand, e-grocery acceleration, and accelerating 3PL consolidation.
          </p>
          <p className="font-body text-[16px] leading-[1.7] text-[var(--semantic-ink-body)]">
            The market sits at the intersection of food-security mandates (HACCP, Biosecurity Act) and digital-distribution shifts, with{' '}
            <strong className="text-[var(--semantic-ink-strong)] font-medium">Cold Storage (AUD 2,647.8 Mn · 9.7% CAGR)</strong> and{' '}
            <strong className="text-[var(--semantic-ink-strong)] font-medium">Cold Transport (AUD 3,900 Mn · 8.8% CAGR)</strong> sub-segments showing differential
            growth trajectories. Over 200 cold-chain operators serve a fragmented landscape where global 3PLs (Lineage · Americold · NewCold) are
            building scale while domestic specialists retain regional niches.
          </p>

          {/* Top 3 takeaways */}
          <div className="pt-2">
            <p
              className="uppercase tracking-[0.12em] text-[var(--semantic-ink-muted)] mb-3"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600 }}
            >
              Top takeaways
            </p>
            <ul className="space-y-3" role="list">
              {TAKEAWAYS.map((t, i) => (
                <li key={i} className="flex gap-3 font-body text-[15px] leading-[1.6] text-[var(--semantic-ink-body)]">
                  <span
                    aria-hidden="true"
                    className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full bg-[var(--color-brand-red)]"
                  />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT · sidekick AnswerBlock + use-case chips · spans 2 cols */}
        <aside className="lg:col-span-2 space-y-4" aria-label="Who should buy">
          <AnswerBlock
            variant="card"
            question="Who should buy this report?"
            answer="Logistics operators · 3PL strategy teams · pharma cold-chain leaders · F&B distribution heads · M&A diligence teams entering Australia."
          />
          <div>
            <p
              className="uppercase tracking-[0.12em] text-[var(--semantic-ink-muted)] mb-3"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600 }}
            >
              Use cases
            </p>
            <div className="flex flex-wrap gap-2">
              {USE_CASES.map((u) => (
                <Badge key={u} variant="rounded" size="sm" theme="neutral" bordered>
                  {u}
                </Badge>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
