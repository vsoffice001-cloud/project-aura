'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Lead: stage badge (text-xl font-display font-bold · numbered circle badge is primary anchor · stage name h3 follows)
 * Type rhythm: xl/base/sm/xs — stage name = text-xl · body = text-base · gated callout = text-sm · lock note = text-xs
 * Motion: progressive reveal 300ms stagger — stages appear left-to-right (desktop) / top-to-bottom (mobile) via Framer whileInView stagger (each stage +300ms delay)
 *   connector line between stages draws after preceding stage animates (CSS transition from opacity 0 → 1)
 *   — useReducedMotion: all stages at final state simultaneously · no stagger
 * Depth: borders + dots — connector dots between stages (5px circle · brand-red) · stage card has border-subtle · no shadow (process flow = flat)
 * Mobile: vertical stepper ol/li with left connector line · stage circle left-aligned · body right of circle · stack column default
 */

/**
 * ValueChainStepper — Horizontal flow desktop / vertical stepper mobile (recipe row 20)
 *
 * Variant: editorial-light
 * Background: white (NESTED — NO SectionWrapper · parent IndustryAnalysisModule handles bg)
 * Cat 4.5: no nested SectionWrapper
 *
 * Public: stage labels + body always visible
 * Locked: margin/opportunity callouts (lead-gated teaser)
 *
 * Mobile: vertical stepper <ol> with connector lines
 * Desktop: horizontal flex with arrow connectors
 *
 * A11y: <ol> <li> semantic order · Framer reveal nodes left-to-right
 * useReducedMotion mandatory
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Lock } from 'lucide-react';
import {
  SectionHeading,
  SectionLabel,
  Badge,
  Card,
} from '@kenresearch/design-system/atoms';
import type { FlowModule } from '@/types/schema';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ValueChainStepperProps {
  stages: FlowModule;
}

// ─── Step node ───────────────────────────────────────────────────────────────

interface StepNodeProps {
  stepNumber: number;
  label: string;
  body?: string;
  metric?: { label: string; value: string };
  annotation?: string;
  isLast: boolean;
  delayIndex: number;
  shouldReduceMotion: boolean;
}

function StepNode({
  stepNumber,
  label,
  body,
  metric,
  annotation,
  isLast,
  delayIndex,
  shouldReduceMotion,
}: StepNodeProps) {
  return (
    <motion.li
      initial={shouldReduceMotion ? {} : { opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        delay: shouldReduceMotion ? 0 : delayIndex * 0.1,
      }}
      className="relative flex md:flex-col items-start md:items-stretch gap-4 md:gap-0 flex-1"
    >
      {/* Mobile layout: vertical stepper */}
      <div className="flex md:hidden flex-col items-center gap-0 shrink-0">
        {/* Step circle */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold font-display shrink-0"
          style={{
            backgroundColor: 'var(--color-brand-primary)',
            color: 'var(--color-foundation-white)',
          }}
          aria-hidden="true"
        >
          {stepNumber}
        </div>
        {/* Connector line */}
        {!isLast && (
          <div
            className="w-px flex-1 min-h-[2rem] mt-1"
            style={{ backgroundColor: 'var(--border-default)' }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Step content */}
      <div className="flex flex-col gap-2 pb-8 md:pb-0 flex-1">
        {/* Desktop step number */}
        <div className="hidden md:flex items-center gap-2 mb-3">
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold font-display shrink-0"
            style={{
              backgroundColor: 'var(--color-brand-primary)',
              color: 'var(--color-foundation-white)',
            }}
            aria-hidden="true"
          >
            {stepNumber}
          </span>
          {/* Arrow connector (desktop) — except last */}
          {!isLast && (
            <div className="flex-1 flex items-center" aria-hidden="true">
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: 'var(--border-default)' }}
              />
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="-ml-px">
                <path
                  d="M1 1l6 3-6 3"
                  stroke="var(--border-default)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>

        <Card padding="sm" className="flex flex-col gap-3 h-full">
          <h3 className="text-base font-display font-medium" style={{ color: 'var(--color-foundation-black)' }}>
            {label}
          </h3>
          {body && (
            <p className="text-compact font-body leading-relaxed" style={{ color: 'var(--surface-text-muted)' }}>
              {body}
            </p>
          )}

          {/* Margin callout — always visible (public per brief) */}
          {metric && (
            <div
              className="flex items-center gap-2 pt-2"
              style={{ borderTop: '1px solid var(--border-soft)' }}
            >
              <span className="text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
                {metric.label}:
              </span>
              <Badge theme="neutral" variant="rounded">{metric.value}</Badge>
            </div>
          )}

          {/* Annotation */}
          {annotation && (
            <p
              className="text-compact font-body italic"
              style={{ color: 'var(--surface-text-muted)' }}
            >
              {annotation}
            </p>
          )}
        </Card>
      </div>
    </motion.li>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function ValueChainStepper({ stages }: ValueChainStepperProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  if (!stages.steps || stages.steps.length === 0) return null;

  // Build annotation map: stepId → annotation text (for annotation between steps)
  const annotationMap: Record<string, string> = {};
  if (stages.annotations) {
    for (const ann of stages.annotations) {
      // Attach annotation to the first step in the pair
      annotationMap[ann.betweenStepIds[0]] = ann.text;
    }
  }

  return (
    <div
      id="value-chain"
      className="py-10 md:py-14"
      style={{ backgroundColor: 'var(--color-foundation-white)' }}
      data-industry-child="value-chain"
    >
      <div className="flex flex-col gap-6">
        {/* Sub-heading */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <SectionLabel>Value Chain</SectionLabel>
            <SectionHeading level={3} align="left">
              {stages.heading ?? 'Cold Chain Value Chain'}
            </SectionHeading>
            {stages.subheading && (
              <p className="mt-1 text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
                {stages.subheading}
              </p>
            )}
          </div>

          {/* Locked deep analysis indicator */}
          <div
            className="flex items-center gap-1.5 text-compact font-body"
            style={{ color: 'var(--surface-text-muted)' }}
            aria-label="Deep margin analysis — sign in to unlock"
          >
            <Lock size={13} aria-hidden="true" />
            <span>Deep analysis locked</span>
          </div>
        </div>

        {/* Stepper — mobile vertical / desktop horizontal */}
        <ol
          className="flex flex-col md:flex-row gap-0 md:gap-4 lg:gap-6"
          aria-label="Cold chain value chain stages"
        >
          {stages.steps.map((step, idx) => (
            <StepNode
              key={step.id}
              stepNumber={idx + 1}
              label={step.label}
              body={step.body}
              metric={step.metric}
              annotation={annotationMap[step.id]}
              isLast={idx === stages.steps.length - 1}
              delayIndex={idx}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </ol>

        {/* Locked deep analysis teaser */}
        <div
          className="rounded-[var(--radius-card)] p-4 flex items-center gap-3"
          style={{
            backgroundColor: 'var(--color-ramp-warm-100)',
            border: '1px dashed var(--border-default)',
          }}
          aria-label="Locked — sign in to unlock full margin and opportunity analysis"
        >
          <Lock size={16} style={{ color: 'var(--surface-text-muted)' }} aria-hidden="true" />
          <p className="text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
            <span role="img" aria-label="Locked — sign in to unlock">Full margin breakdown, per-stage opportunity analysis, and benchmark comparisons</span>
            {' — '}
            <span className="font-medium" style={{ color: 'var(--color-brand-primary)' }}>sign in to unlock</span>
          </p>
        </div>
      </div>
    </div>
  );
}
