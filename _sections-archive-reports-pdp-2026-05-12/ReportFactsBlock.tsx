/**
 * ReportFactsBlock — Row 32 — Recipe report-detail.md line 73
 * bg: warm-300 · spacing: md · RSC-compatible (NO 'use client')
 * GEO/AI extraction — 9 answer blocks + Report Facts w/ schema.org microdata
 * Static render priority: NO flashy effects
 */

import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
} from '@kenresearch/design-system/atoms';
import type { ReportFacts, AnswerBlocks } from '@/types/schema';

interface Props {
  facts: ReportFacts;
  answers: AnswerBlocks;
}

interface AnswerBlockItem {
  key: keyof AnswerBlocks;
  question: string;
}

const ANSWER_BLOCKS: AnswerBlockItem[] = [
  { key: 'marketSize', question: 'How large is this market?' },
  { key: 'forecastValue', question: 'What is the forecast market size?' },
  { key: 'cagr', question: 'What is the CAGR for this market?' },
  { key: 'segmentsCovered', question: 'What segments are covered in this report?' },
  { key: 'companiesCovered', question: 'Which companies are covered in this report?' },
  { key: 'growthDrivers', question: 'What are the key growth drivers?' },
  { key: 'keyChallenges', question: 'What are the key challenges in this market?' },
  { key: 'reportIncludes', question: 'What does this report include?' },
  { key: 'methodologyUsed', question: 'What research methodology was used?' },
];

export function ReportFactsBlock({ facts, answers }: Props) {
  return (
    <SectionWrapper background="warm" spacing="md" id="sec-report-facts">
      <SectionLabel>Report Facts</SectionLabel>
      <SectionHeading level={2} className="mt-2 mb-8">
        Market Data Summary
      </SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Section 1 — Report Facts (schema.org Dataset microdata) */}
        <div
          className="rounded-lg border p-6"
          style={{ borderColor: 'var(--border-default)', background: 'var(--color-foundation-white)' }}
          itemScope
          itemType="https://schema.org/Dataset"
        >
          <h3
            className="font-[var(--typography-family-display)] font-semibold mb-5"
            style={{ fontSize: 'var(--typography-size-lg)', color: 'var(--color-foundation-black)' }}
          >
            Report Facts
          </h3>
          <dl className="flex flex-col gap-4">
            <div className="flex flex-col gap-0.5">
              <dt
                className="text-xs uppercase tracking-wider font-medium"
                style={{ color: 'var(--color-neutral-500, #6b7280)' }}
              >
                Market
              </dt>
              <dd
                className="font-medium"
                style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--color-foundation-black)' }}
                itemProp="name"
              >
                {facts.market}
              </dd>
            </div>

            <div className="flex flex-col gap-0.5">
              <dt
                className="text-xs uppercase tracking-wider font-medium"
                style={{ color: 'var(--color-neutral-500, #6b7280)' }}
              >
                Market Size
              </dt>
              <dd
                className="font-medium tabular-nums"
                style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--color-foundation-black)' }}
                itemProp="variableMeasured"
              >
                {facts.marketSize}
              </dd>
            </div>

            <div className="flex flex-col gap-0.5">
              <dt
                className="text-xs uppercase tracking-wider font-medium"
                style={{ color: 'var(--color-neutral-500, #6b7280)' }}
              >
                Forecast
              </dt>
              <dd
                className="font-medium tabular-nums"
                style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--color-foundation-black)' }}
                itemProp="description"
              >
                {facts.forecast}
              </dd>
            </div>

            <div className="flex flex-col gap-0.5">
              <dt
                className="text-xs uppercase tracking-wider font-medium"
                style={{ color: 'var(--color-neutral-500, #6b7280)' }}
              >
                CAGR
              </dt>
              <dd
                className="font-medium tabular-nums"
                style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--color-foundation-black)' }}
              >
                {facts.cagr}
              </dd>
            </div>

            <div className="flex flex-col gap-0.5">
              <dt
                className="text-xs uppercase tracking-wider font-medium"
                style={{ color: 'var(--color-neutral-500, #6b7280)' }}
              >
                Key Segments
              </dt>
              <dd
                style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--color-foundation-black)' }}
                itemProp="keywords"
              >
                {facts.segments.join(' · ')}
              </dd>
            </div>

            <div className="flex flex-col gap-0.5">
              <dt
                className="text-xs uppercase tracking-wider font-medium"
                style={{ color: 'var(--color-neutral-500, #6b7280)' }}
              >
                Report Type
              </dt>
              <dd
                style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--color-foundation-black)' }}
                itemProp="measurementTechnique"
              >
                {facts.reportType}
              </dd>
            </div>
          </dl>
        </div>

        {/* Section 2 — 9 Answer Blocks (Q&A for AI/GEO search extraction) */}
        <div
          className="rounded-lg border p-6"
          style={{ borderColor: 'var(--border-default)', background: 'var(--color-foundation-white)' }}
        >
          <h3
            className="font-[var(--typography-family-display)] font-semibold mb-5"
            style={{ fontSize: 'var(--typography-size-lg)', color: 'var(--color-foundation-black)' }}
          >
            Quick Answers
          </h3>

          <div className="flex flex-col gap-5">
            {ANSWER_BLOCKS.map((block) => (
              <div
                key={block.key}
                itemScope
                itemType="https://schema.org/Question"
              >
                <h4
                  className="font-medium mb-1"
                  style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--color-foundation-black)' }}
                  itemProp="name"
                >
                  {block.question}
                </h4>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p
                    style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--color-neutral-600, #4b5563)', lineHeight: '1.6' }}
                    itemProp="text"
                  >
                    {answers[block.key]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
