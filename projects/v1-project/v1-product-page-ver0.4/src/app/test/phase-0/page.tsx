'use client';

/**
 * Phase 0 · Foundation Test Page
 *
 * @what  Wires the 4 Phase 0 components verified in v0.4 plan:
 *        - AnswerBlock atom (inline · card · schemaOnly)
 *        - ChartCard molecule (public · metered · lead-gated · paid)
 *        - Skeleton ui primitive (loading state)
 *        - PDPLayoutTemplate (reused via default rendering — wrapper test in Phase 1)
 * @why   Verify DS wires correctly in v0.4 project before building chrome layers.
 * @when  Phase 0 of v0.4 master plan. Gate before Phase 1 chrome (Hero · Header · TOC).
 */

import { AnswerBlock } from '@kenresearch/design-system/atoms';
import { ChartCard } from '@kenresearch/design-system/molecules';
import { Skeleton } from '@kenresearch/design-system/ui/skeleton';

const ANSWERS = [
  {
    question: 'What is the size of the Australia Cold Chain market?',
    answer: 'AUD 6,547.8 Mn in 2022, projected to reach AUD 10,705 Mn by 2027 at a 10.03% CAGR.',
  },
  {
    question: 'What is the forecast CAGR?',
    answer: '10.03% during 2022–2027, driven by pharmaceutical cold-chain demand and e-grocery acceleration.',
  },
  {
    question: 'Which segments are covered?',
    answer:
      'Cold Storage, Cold Transport, By End-User, By Temperature Range, By Region, By Reefer Truck Type, By Transport Mode, By Domestic/International.',
  },
];

const MOCK_CHART = (
  <div
    style={{
      height: '200px',
      width: '100%',
      borderRadius: 'var(--radius-sm, 4px)',
      background:
        'linear-gradient(135deg, rgba(176,31,36,0.12) 0%, rgba(176,31,36,0.04) 60%, rgba(176,31,36,0.02) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      color: 'var(--semantic-ink-muted)',
    }}
  >
    Chart placeholder · @ken-research/charts mounts here
  </div>
);

const MOCK_DATASET = (
  <table
    style={{
      width: '100%',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      borderCollapse: 'collapse',
    }}
  >
    <thead>
      <tr style={{ borderBottom: '1px solid var(--border-soft)' }}>
        <th style={{ textAlign: 'left', padding: '8px 4px' }}>Year</th>
        <th style={{ textAlign: 'right', padding: '8px 4px' }}>Market Size (AUD Mn)</th>
        <th style={{ textAlign: 'right', padding: '8px 4px' }}>Growth %</th>
      </tr>
    </thead>
    <tbody>
      {[
        ['2017', '4,231.1', '—'],
        ['2018', '4,640.7', '9.7%'],
        ['2019', '5,123.7', '10.4%'],
      ].map(([y, v, g]) => (
        <tr key={y} style={{ borderBottom: '1px solid var(--border-soft)' }}>
          <td style={{ padding: '8px 4px' }}>{y}</td>
          <td style={{ padding: '8px 4px', textAlign: 'right' }}>{v}</td>
          <td style={{ padding: '8px 4px', textAlign: 'right' }}>{g}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default function Phase0TestPage() {
  return (
    <main
      id="main"
      style={{
        background: 'var(--bg-cream)',
        minHeight: '100vh',
        padding: '64px 24px',
      }}
    >
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        {/* Header */}
        <header style={{ marginBottom: '48px' }}>
          <p
            className="uppercase"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.18em',
              color: 'var(--semantic-ink-subtle)',
              marginBottom: '8px',
            }}
          >
            v0.4 · Phase 0 · Foundation
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 300,
              fontSize: 'var(--text-3xl)',
              lineHeight: 'var(--leading-tight)',
              color: 'var(--semantic-ink-strong)',
              marginBottom: '12px',
            }}
          >
            Phase 0 components · DS wire test
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-relaxed)',
              color: 'var(--semantic-ink-body)',
            }}
          >
            AnswerBlock atom · ChartCard molecule · Skeleton primitive. Verifies DS wires correctly before Phase 1 chrome.
          </p>
        </header>

        {/* AnswerBlock · inline */}
        <section style={{ marginBottom: '64px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 300,
              fontSize: 'var(--text-2xl)',
              color: 'var(--semantic-ink-strong)',
              marginBottom: '8px',
            }}
          >
            AnswerBlock · inline variant
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'var(--semantic-ink-muted)',
              marginBottom: '24px',
            }}
          >
            Semantic dl/dt/dd + FAQPage microdata. Per PRD §12.2 · 10 mandatory Q&A blocks per PDP.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {ANSWERS.map((a) => (
              <AnswerBlock key={a.question} question={a.question} answer={a.answer} />
            ))}
          </div>
        </section>

        {/* AnswerBlock · card */}
        <section style={{ marginBottom: '64px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 300,
              fontSize: 'var(--text-2xl)',
              color: 'var(--semantic-ink-strong)',
              marginBottom: '8px',
            }}
          >
            AnswerBlock · card variant
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'var(--semantic-ink-muted)',
              marginBottom: '24px',
            }}
          >
            Card-wrapped variant for FAQ sections w/ visual containment.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {ANSWERS.slice(0, 2).map((a) => (
              <AnswerBlock
                key={a.question}
                question={a.question}
                answer={a.answer}
                variant="card"
              />
            ))}
          </div>
        </section>

        {/* ChartCard · public */}
        <section style={{ marginBottom: '64px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 300,
              fontSize: 'var(--text-2xl)',
              color: 'var(--semantic-ink-strong)',
              marginBottom: '8px',
            }}
          >
            ChartCard · public access
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'var(--semantic-ink-muted)',
              marginBottom: '24px',
            }}
          >
            8-element PRD §9.1 anatomy · eyebrow + title + insight + body + dataset + source + CTAs.
          </p>
          <ChartCard
            eyebrow="MARKET SIZE"
            title="Australia Cold Chain Logistics Market Size, 2017–2022"
            insight="Market grew at 9.1% CAGR with 2019 peak driven by e-grocery shift."
            source="Ken Research Analysis · 30+ CATI interviews"
            methodologyHref="#methodology"
            accessLevel="public"
            datasetPreview={MOCK_DATASET}
            primaryCta={{ label: 'Download Sample Report', onClick: () => {} }}
            secondaryCta={{ label: 'Talk to Analyst', onClick: () => {} }}
          >
            {MOCK_CHART}
          </ChartCard>
        </section>

        {/* ChartCard · metered */}
        <section style={{ marginBottom: '64px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 300,
              fontSize: 'var(--text-2xl)',
              color: 'var(--semantic-ink-strong)',
              marginBottom: '8px',
            }}
          >
            ChartCard · metered access
          </h2>
          <ChartCard
            eyebrow="SUBMARKET"
            title="Cold Storage Submarket · 2017–2022"
            insight="Cold Storage segment reached AUD 2,647.8 Mn in 2022 at 9.7% CAGR."
            source="Ken Research Primary Analysis"
            accessLevel="metered"
            meterUsed={3}
            meterTotal={10}
          >
            {MOCK_CHART}
          </ChartCard>
        </section>

        {/* ChartCard · lead-gated */}
        <section style={{ marginBottom: '64px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 300,
              fontSize: 'var(--text-2xl)',
              color: 'var(--semantic-ink-strong)',
              marginBottom: '8px',
            }}
          >
            ChartCard · lead-gated (paywall overlay)
          </h2>
          <ChartCard
            eyebrow="FORECAST"
            title="Future Market Size · 2022–2027F"
            insight="Forecast reaches AUD 10,705 Mn by 2027 · assumption table below requires unlock."
            source="Ken Research Forecast Model"
            accessLevel="lead"
          >
            {MOCK_CHART}
          </ChartCard>
        </section>

        {/* Skeleton */}
        <section style={{ marginBottom: '64px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 300,
              fontSize: 'var(--text-2xl)',
              color: 'var(--semantic-ink-strong)',
              marginBottom: '8px',
            }}
          >
            Skeleton · loading state
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'var(--semantic-ink-muted)',
              marginBottom: '24px',
            }}
          >
            Used in PDPLayoutV04 `loading` prop. Mirrors PDP chrome + section blocks.
          </p>
          <div
            style={{
              padding: '24px',
              background: 'var(--color-foundation-white)',
              border: '1px solid var(--border-soft)',
              borderRadius: 'var(--radius-card, 8px)',
            }}
          >
            <Skeleton style={{ height: '32px', width: '60%', marginBottom: '16px' }} />
            <Skeleton style={{ height: '16px', width: '85%', marginBottom: '8px' }} />
            <Skeleton style={{ height: '16px', width: '70%', marginBottom: '24px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <Skeleton style={{ height: '80px' }} />
              <Skeleton style={{ height: '80px' }} />
              <Skeleton style={{ height: '80px' }} />
            </div>
          </div>
        </section>

        {/* Footer note */}
        <footer
          style={{
            padding: '24px 0',
            borderTop: '1px solid var(--border-soft)',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            color: 'var(--semantic-ink-subtle)',
          }}
        >
          Phase 0 gate · approve before Phase 1 (Hero · TopNav · StickyPDPNav · SideTOC · BottomCTABar · ReadingProgressBar).
        </footer>
      </div>
    </main>
  );
}
