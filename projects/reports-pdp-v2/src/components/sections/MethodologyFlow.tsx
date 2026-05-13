'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Lead: stage number badge (text-2xl font-display font-bold · large circled step badge is primary visual anchor · stage name h3 follows)
 * Type rhythm: 2xl/base/sm/xs — stage number badge = text-2xl · stage name = text-base font-display · stage summary = text-sm · lock note = text-xs micro
 * Motion: progressive reveal 300ms stagger — stages appear left-to-right (desktop) / top-to-bottom (mobile) via Framer whileInView stagger 300ms/stage · connector lines draw after stage appears
 *   — useReducedMotion disables stagger; all stages render at final state simultaneously
 * Depth: borders + dots — connector dots between stages (4px circle · border-solid) · stage cards border-subtle · no shadow (process flow = flat hierarchy = borders only)
 * Mobile: vertical stepper ol/li · connector line = left border on li · horizontal flow desktop only · stack column default
 */

/**
 * MethodologyFlow — 6-step research methodology (recipe row 28)
 *
 * Variant: editorial-light
 * Background: warm · spacing: lg (LOCK 3)
 *
 * 6 stages: Secondary Research · Primary Research · Data Triangulation
 *           Sanity Checking · Forecast Modeling · Analyst Validation
 *
 * Desktop: horizontal flex flow with connector arrows between stages
 * Mobile: vertical stepper <ol>/<li> with vertical connector line
 *
 * Public: stage name + summary paragraph
 * Lead-gated: sample size (visual indicator only, no price)
 * Paid: model assumptions (visual indicator only)
 *
 * A11y: <ol> stepper · <li> items · heading hierarchy
 * Framer fade-up · useReducedMotion guard
 */

import { motion, useReducedMotion } from 'framer-motion';

import { Lock } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as unknown as [number, number, number, number];
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Button,
  Badge,
} from '@kenresearch/design-system/atoms';
import type { Methodology } from '@/types/schema';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';

export interface MethodologyFlowProps {
  methodology: Methodology;
  reportSlug?: string;
}

// 6 canonical methodology stages (spec-locked labels and descriptions)
const METHODOLOGY_STAGES = [
  {
    id: 'secondary-research',
    number: 1,
    name: 'Secondary Research',
    description:
      'Desk research across company reports, industry journals, government databases (Dept. of Agriculture, NMIS, World Bank, IMF), trade association data, and market databases.',
    accessTier: 'public' as const,
  },
  {
    id: 'primary-research',
    number: 2,
    name: 'Primary Research',
    description:
      'CATI interviews with industry executives, directors, and business development heads at cold chain operators across Australia. Structured interview guides capturing pallet counts, occupancy, pricing, and strategic outlook.',
    accessTier: 'lead-gated' as const,
    gatedNote: 'Sample size details gated',
  },
  {
    id: 'triangulation',
    number: 3,
    name: 'Data Triangulation',
    description:
      'Cross-validation of primary findings against secondary sources — NMIS warehouse counts, company-level revenue proxies, and segment-level bottom-up aggregations.',
    accessTier: 'public' as const,
  },
  {
    id: 'sanity-checking',
    number: 4,
    name: 'Sanity Checking',
    description:
      'Desk research validates pallet and warehouse counts. Financial parameters cross-checked against captive and non-captive operator data. Industry expert panel review.',
    accessTier: 'public' as const,
  },
  {
    id: 'forecast-modeling',
    number: 5,
    name: 'Forecast Modeling',
    description:
      'Bottom-up market model incorporating macro indicators (GDP growth, trade volumes, inflation), segment-level CAGR drivers, and scenario analysis for the 2022-2027 period.',
    accessTier: 'paid' as const,
    gatedNote: 'Model assumptions gated',
  },
  {
    id: 'analyst-validation',
    number: 6,
    name: 'Analyst Validation',
    description:
      'Final review by senior analyst with APAC logistics expertise. QA against prior-year datasets and industry expert feedback loops.',
    accessTier: 'public' as const,
  },
] as const;

interface StageCardProps {
  stage: typeof METHODOLOGY_STAGES[number];
  index: number;
  shouldReduceMotion: boolean;
  isLast: boolean;
}

function StageCard({ stage, index, shouldReduceMotion, isLast }: StageCardProps) {
  const isGated = stage.accessTier === 'lead-gated' || stage.accessTier === 'paid';

  return (
    <li className="relative flex-1">
      {/* Desktop connector arrow */}
      {!isLast && (
        <div
          className="hidden lg:flex absolute top-6 right-0 translate-x-1/2 z-10 items-center"
          aria-hidden="true"
        >
          <div
            style={{
              width: '24px',
              height: '2px',
              backgroundColor: 'var(--border-soft)',
            }}
          />
          <span style={{ color: 'var(--surface-text-muted)', fontSize: '10px', marginLeft: '-2px' }}>▶</span>
        </div>
      )}

      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.4, ease: EASE, delay: shouldReduceMotion ? 0 : index * 0.07 }}
        className="flex flex-col gap-3 h-full"
      >
        {/* Mobile: vertical stepper connector */}
        <div className="lg:hidden flex items-start gap-4">
          <div className="flex flex-col items-center">
            {/* Step badge */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{
                backgroundColor: 'var(--color-brand)',
                color: 'var(--color-text-inverse)',
              }}
              aria-hidden="true"
            >
              <span className="text-compact font-display font-medium">{stage.number}</span>
            </div>
            {/* Vertical line */}
            {!isLast && (
              <div
                style={{
                  width: '1px',
                  flexGrow: 1,
                  minHeight: '32px',
                  backgroundColor: 'var(--border-soft)',
                  margin: '4px 0',
                }}
                aria-hidden="true"
              />
            )}
          </div>

          {/* Mobile card content */}
          <div className="flex flex-col gap-2 pb-6 flex-1">
            <div className="flex items-start gap-2 flex-wrap">
              <h3
                className="text-base font-display font-medium leading-snug"
                style={{ color: 'var(--color-foundation-black)' }}
              >
                {stage.name}
              </h3>
              {isGated && (
                <Badge theme="muted" variant="minimal">
                  <Lock size={10} className="mr-0.5" aria-hidden="true" />
                  {stage.accessTier === 'lead-gated' ? 'Lead-gated' : 'Full report'}
                </Badge>
              )}
            </div>
            <p className="text-compact font-body leading-relaxed" style={{ color: 'var(--surface-text-muted)' }}>
              {stage.description}
            </p>
            {isGated && stage.gatedNote && (
              <p className="text-compact font-body" style={{ color: 'var(--surface-text-muted)', fontStyle: 'italic' }}>
                {stage.gatedNote}
              </p>
            )}
          </div>
        </div>

        {/* Desktop card */}
        <div className="hidden lg:flex flex-col gap-3 p-4 rounded-[var(--radius-md)] h-full"
          style={{
            backgroundColor: 'var(--color-foundation-white)',
            border: '1px solid var(--border-soft)',
          }}
        >
          {/* Step badge */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{
              backgroundColor: 'var(--color-brand)',
              color: 'var(--color-text-inverse)',
            }}
            aria-hidden="true"
          >
            <span className="text-compact font-display font-medium">{stage.number}</span>
          </div>

          <h3
            className="text-compact font-display font-medium leading-snug"
            style={{ color: 'var(--color-foundation-black)' }}
          >
            {stage.name}
          </h3>

          <p
            className="text-compact font-body leading-relaxed flex-1"
            style={{ color: 'var(--surface-text-muted)', fontSize: '12px' }}
          >
            {stage.description}
          </p>

          {isGated && (
            <div
              className="flex items-center gap-1.5 mt-auto"
              style={{ color: 'var(--surface-text-muted)' }}
            >
              <Lock size={11} aria-hidden="true" />
              <span style={{ fontSize: '11px', fontStyle: 'italic' }}>
                {stage.gatedNote}
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </li>
  );
}

export function MethodologyFlow({ methodology, reportSlug = '' }: MethodologyFlowProps) {
  const { openForm } = useLeadFormModal();
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <SectionWrapper background="warm" spacing="lg" id="methodology">
      <div className="flex flex-col gap-10">

        {/* Heading */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <SectionLabel>Research Process</SectionLabel>
          <SectionHeading level={2} align="left">
            Research Methodology
          </SectionHeading>
          <p className="mt-2 text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
            {methodology.approach}
          </p>
        </motion.div>

        {/* Desktop: horizontal flow */}
        <ol
          className="hidden lg:flex gap-4 items-stretch"
          aria-label="6-step research methodology flow"
        >
          {METHODOLOGY_STAGES.map((stage, idx) => (
            <StageCard
              key={stage.id}
              stage={stage}
              index={idx}
              shouldReduceMotion={shouldReduceMotion}
              isLast={idx === METHODOLOGY_STAGES.length - 1}
            />
          ))}
        </ol>

        {/* Mobile: vertical stepper */}
        <ol
          className="lg:hidden flex flex-col"
          aria-label="6-step research methodology flow"
        >
          {METHODOLOGY_STAGES.map((stage, idx) => (
            <StageCard
              key={stage.id}
              stage={stage}
              index={idx}
              shouldReduceMotion={shouldReduceMotion}
              isLast={idx === METHODOLOGY_STAGES.length - 1}
            />
          ))}
        </ol>

        {/* Data collection meta */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.35, ease: EASE }}
          className="flex flex-col sm:flex-row gap-6 p-5 rounded-[var(--radius-md)]"
          style={{
            backgroundColor: 'var(--color-foundation-white)',
            border: '1px solid var(--border-soft)',
          }}
        >
          <div className="flex flex-col gap-1">
            <span className="text-compact font-display font-medium" style={{ color: 'var(--surface-text-muted)' }}>
              Data collection period
            </span>
            <span className="text-compact font-body" style={{ color: 'var(--color-foundation-black)' }}>
              {methodology.dataCollectionPeriod}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-compact font-display font-medium" style={{ color: 'var(--surface-text-muted)' }}>
              Geographies covered
            </span>
            <span className="text-compact font-body" style={{ color: 'var(--color-foundation-black)' }}>
              {methodology.geographies.join(' · ')}
            </span>
          </div>
          {methodology.sampleSize && (
            <div className="flex flex-col gap-1">
              <span className="text-compact font-display font-medium" style={{ color: 'var(--surface-text-muted)' }}>
                Sample size
              </span>
              <span className="text-compact font-body" style={{ color: 'var(--color-foundation-black)' }}>
                {methodology.sampleSize}+ interviews
              </span>
            </div>
          )}
        </motion.div>

        {/* CTA */}
        <div className="flex justify-center">
          <Button
            variant="brand"
            size="md"
            onClick={() =>
              openForm('sample', {
                reportSlug,
                ctaLocation: 'methodology-flow',
                sectionName: 'methodology',
              })
            }
          >
            Download Sample Report
          </Button>
        </div>

      </div>
    </SectionWrapper>
  );
}
