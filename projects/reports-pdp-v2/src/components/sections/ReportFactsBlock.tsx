'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Lead: "Quick Answers" heading (SectionHeading level={2} text-2xl · frames this as structured AI/SEO extraction target — editorial heading not display)
 * Type rhythm: 2xl/base/base/xs — SectionHeading = text-2xl · <dt> = text-base font-medium · <dd> = text-base · "Who should buy?" items = text-compact · source = text-xs
 * Motion: STATIC — LCP-critical AI/SEO content must render without delay · zero Framer animation on this section
 *   — no useReducedMotion needed (static throughout)
 * Depth: warm accent — SectionWrapper background="warm" · dl blocks have subtle left-border accent (3px solid --color-accent-purple for research pillar visual cue)
 * Mobile: dl term/definition pairs stack naturally · warm bg makes section scannable · stack column default
 */

/**
 * ReportFactsBlock — GEO/AI EXTRACTION block (recipe row 32 · PRD §43)
 *
 * Variant: editorial-light
 * Background: warm · spacing: md (LOCK 3)
 *
 * MISSION-CRITICAL for AI/SEO ranking.
 * VISIBLE HTML TEXT — never images, never gated, never hidden.
 * AI search engines read this. Mobile + desktop both render full content.
 *
 * Renders:
 * 1. 9 answer blocks as <dl> (definition list) with <dt>/<dd>
 * 2. Report Facts summary plain text block
 * 3. "Who should buy?" block
 *
 * A11y: semantic <dl> · <dt> · <dd> · heading hierarchy.
 * Static — no motion needed (spec says "static" for this module).
 */

import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Card,
  Divider,
} from '@kenresearch/design-system/atoms';
import type { ReportFacts, AnswerBlocks } from '@/types/schema';

export interface ReportFactsBlockProps {
  facts: ReportFacts;
  answers: AnswerBlocks;
}

const ANSWER_QUESTIONS: Array<{ question: string; key: keyof AnswerBlocks }> = [
  { question: 'What is the market size?', key: 'marketSize' },
  { question: 'What is the forecast value?', key: 'forecastValue' },
  { question: 'What is the CAGR?', key: 'cagr' },
  { question: 'Which segments are covered?', key: 'segmentsCovered' },
  { question: 'Which companies are covered?', key: 'companiesCovered' },
  { question: 'What are the growth drivers?', key: 'growthDrivers' },
  { question: 'What are the key challenges?', key: 'keyChallenges' },
  { question: 'What does the report include?', key: 'reportIncludes' },
  { question: 'What methodology was used?', key: 'methodologyUsed' },
];

export function ReportFactsBlock({ facts, answers }: ReportFactsBlockProps) {
  return (
    <SectionWrapper background="warm" spacing="md" id="report-facts">
      <div className="flex flex-col gap-10">

        {/* Heading */}
        <div>
          <SectionLabel>REPORT FACTS</SectionLabel>
          <SectionHeading level={2} align="left">
            Quick Answers
          </SectionHeading>
          <p className="mt-2 text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
            Key facts about this market report — structured for AI search engines and human readers alike.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Report Facts summary — plain text */}
          <Card padding="md">
            <div className="flex flex-col gap-4">
              <h3
                className="text-base font-display font-medium"
                style={{ color: 'var(--color-foundation-black)' }}
              >
                Report Facts
              </h3>
              <Divider />
              <dl className="flex flex-col gap-3">
                <div className="flex flex-col gap-0.5">
                  <dt className="text-compact font-display font-medium" style={{ color: 'var(--surface-text-muted)' }}>
                    Market
                  </dt>
                  <dd className="text-compact font-body" style={{ color: 'var(--color-foundation-black)' }}>
                    {facts.market}
                  </dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-compact font-display font-medium" style={{ color: 'var(--surface-text-muted)' }}>
                    Market Size
                  </dt>
                  <dd className="text-compact font-body" style={{ color: 'var(--color-foundation-black)' }}>
                    {facts.marketSize}
                  </dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-compact font-display font-medium" style={{ color: 'var(--surface-text-muted)' }}>
                    Forecast
                  </dt>
                  <dd className="text-compact font-body" style={{ color: 'var(--color-foundation-black)' }}>
                    {facts.forecast}
                  </dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-compact font-display font-medium" style={{ color: 'var(--surface-text-muted)' }}>
                    CAGR
                  </dt>
                  <dd className="text-compact font-body" style={{ color: 'var(--color-foundation-black)' }}>
                    {facts.cagr}
                  </dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-compact font-display font-medium" style={{ color: 'var(--surface-text-muted)' }}>
                    Segments
                  </dt>
                  <dd className="text-compact font-body" style={{ color: 'var(--color-foundation-black)' }}>
                    {facts.segments.join(', ')}
                  </dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-compact font-display font-medium" style={{ color: 'var(--surface-text-muted)' }}>
                    Report Type
                  </dt>
                  <dd className="text-compact font-body" style={{ color: 'var(--color-foundation-black)' }}>
                    {facts.reportType}
                  </dd>
                </div>
              </dl>
            </div>
          </Card>

          {/* Who should buy this report */}
          <Card padding="md">
            <div className="flex flex-col gap-4">
              <h3
                className="text-base font-display font-medium"
                style={{ color: 'var(--color-foundation-black)' }}
              >
                Who Should Buy This Report?
              </h3>
              <Divider />
              <p className="text-compact font-body leading-relaxed" style={{ color: 'var(--color-foundation-black)' }}>
                {answers.whoShouldBuy}
              </p>
            </div>
          </Card>

        </div>

        {/* 9 Q&A answer blocks */}
        <div>
          <h3
            className="text-base font-display font-medium mb-5"
            style={{ color: 'var(--color-foundation-black)' }}
          >
            Detailed Answers
          </h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ANSWER_QUESTIONS.map(({ question, key }) => (
              <div
                key={key}
                className="flex flex-col gap-1.5 p-4 rounded-[var(--radius-md)]"
                style={{
                  backgroundColor: 'var(--color-foundation-white)',
                  border: '1px solid var(--border-soft)',
                }}
              >
                <dt
                  className="text-compact font-display font-medium leading-snug"
                  style={{ color: 'var(--color-foundation-black)' }}
                >
                  {question}
                </dt>
                <dd
                  className="text-compact font-body leading-relaxed"
                  style={{ color: 'var(--surface-text-muted)' }}
                >
                  {answers[key]}
                </dd>
              </div>
            ))}
          </dl>
        </div>

      </div>
    </SectionWrapper>
  );
}
