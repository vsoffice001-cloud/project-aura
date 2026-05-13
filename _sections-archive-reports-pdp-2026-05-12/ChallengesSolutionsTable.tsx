'use client';

/**
 * ChallengesSolutionsTable — Row 20 — Recipe report-detail.md line 61
 * bg: warm-300 · spacing: lg · motion: Framer stagger 60ms
 * Paired rows: Challenge (Card white) + ArrowRight + Solution (Card warm).
 * Urgency badge: danger-outlined for high, warning for medium, neutral for low.
 * NEVER filled red for urgency — Cat 2 #1.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Card,
  Badge,
} from '@kenresearch/design-system/atoms';
import type { IssueTableModule } from '@/types/schema';

interface Props {
  pairs: IssueTableModule | null;
}

type Urgency = 'low' | 'medium' | 'high';

function urgencyTheme(urgency: Urgency | undefined): 'neutral' | 'warning' | 'error' {
  if (urgency === 'high') return 'error';
  if (urgency === 'medium') return 'warning';
  return 'neutral';
}

function urgencyLabel(urgency: Urgency | undefined): string {
  if (urgency === 'high') return 'High urgency';
  if (urgency === 'medium') return 'Medium urgency';
  return 'Low urgency';
}

interface PairRowProps {
  row: IssueTableModule['rows'][number];
  index: number;
  prefersReduced: boolean | null;
}

function PairRow({ row, index, prefersReduced }: PairRowProps) {
  const severity = row.severity as Urgency | undefined;
  const urgency = row.urgency as Urgency | undefined;
  const effectiveUrgency = urgency ?? severity;

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.4,
        ease: 'easeOut',
        delay: prefersReduced ? 0 : Math.min(index, 7) * 0.06,
      }}
    >
      {/* Desktop: 2-col grid pair */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
        {/* Challenge card */}
        <Card variant="white" padding="md" className="flex flex-col gap-3">
          <div className="inline-flex">
            <SectionLabel background="light" variant="default">
              CHALLENGE
            </SectionLabel>
          </div>
          <h3
            style={{
              fontFamily: 'var(--typography-family-display)',
              fontSize: 'var(--typography-size-base)',
              fontWeight: 600,
              color: 'var(--surface-text)',
              lineHeight: 1.3,
            }}
          >
            {row.problem}
          </h3>
          {row.whyItMatters && (
            <p
              style={{
                fontSize: 'var(--typography-size-sm)',
                color: 'var(--surface-text-muted)',
                lineHeight: 1.6,
              }}
            >
              {row.whyItMatters}
            </p>
          )}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border-soft)]">
            <Badge
              theme={urgencyTheme(effectiveUrgency)}
              size="sm"
            >
              {urgencyLabel(effectiveUrgency)}
            </Badge>
            {row.relatedSegment && (
              <Badge theme="neutral" size="sm">
                {row.relatedSegment}
              </Badge>
            )}
          </div>
        </Card>

        {/* Arrow connector */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 'var(--space-6)',
            color: 'var(--surface-text-muted)',
          }}
          aria-hidden="true"
        >
          <ArrowRight size={18} />
        </div>

        {/* Solution card */}
        <Card variant="warm" padding="md" className="flex flex-col gap-3">
          <div className="inline-flex">
            <SectionLabel background="light" variant="default">
              SOLUTION
            </SectionLabel>
          </div>
          <h3
            style={{
              fontFamily: 'var(--typography-family-display)',
              fontSize: 'var(--typography-size-base)',
              fontWeight: 600,
              color: 'var(--surface-text)',
              lineHeight: 1.3,
            }}
          >
            Solution
          </h3>
          <p
            style={{
              fontSize: 'var(--typography-size-sm)',
              color: 'var(--surface-text-muted)',
              lineHeight: 1.6,
            }}
          >
            {row.solution}
          </p>
          {row.impact && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border-soft)]">
              <Badge theme="purple" size="sm">
                {row.impact}
              </Badge>
            </div>
          )}
        </Card>
      </div>

      {/* Mobile: stacked single column */}
      <div className="flex flex-col gap-3 md:hidden">
        <Card variant="white" padding="md" className="flex flex-col gap-3">
          <div className="inline-flex">
            <SectionLabel background="light" variant="default">
              CHALLENGE
            </SectionLabel>
          </div>
          <h3
            style={{
              fontFamily: 'var(--typography-family-display)',
              fontSize: 'var(--typography-size-base)',
              fontWeight: 600,
              color: 'var(--surface-text)',
              lineHeight: 1.3,
            }}
          >
            {row.problem}
          </h3>
          {row.whyItMatters && (
            <p
              style={{
                fontSize: 'var(--typography-size-sm)',
                color: 'var(--surface-text-muted)',
                lineHeight: 1.6,
              }}
            >
              {row.whyItMatters}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            <Badge
              theme={urgencyTheme(effectiveUrgency)}
              size="sm"
            >
              {urgencyLabel(effectiveUrgency)}
            </Badge>
          </div>
        </Card>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            color: 'var(--surface-text-muted)',
            transform: 'rotate(90deg)',
          }}
          aria-hidden="true"
        >
          <ArrowRight size={16} />
        </div>
        <Card variant="warm" padding="md" className="flex flex-col gap-3">
          <div className="inline-flex">
            <SectionLabel background="light" variant="default">
              SOLUTION
            </SectionLabel>
          </div>
          <p
            style={{
              fontSize: 'var(--typography-size-sm)',
              color: 'var(--surface-text-muted)',
              lineHeight: 1.6,
            }}
          >
            {row.solution}
          </p>
          {row.impact && (
            <Badge theme="purple" size="sm">
              {row.impact}
            </Badge>
          )}
        </Card>
      </div>
    </motion.div>
  );
}

export function ChallengesSolutionsTable({ pairs }: Props) {
  const prefersReduced = useReducedMotion();

  if (!pairs || pairs.rows.length === 0) return null;

  return (
    <SectionWrapper
      background="warm"
      spacing="lg"
      maxWidth="wide"
      id="sec-challenges-solutions"
    >
      {/* Header */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="inline-flex mb-3">
          <SectionLabel background="light" variant="default">
            CHALLENGES &amp; SOLUTIONS
          </SectionLabel>
        </div>
        <SectionHeading level={2} align="left">
          {pairs.heading}
        </SectionHeading>
        <p
          style={{
            fontSize: 'var(--typography-size-sm)',
            color: 'var(--surface-text-muted)',
            marginTop: 'var(--space-3)',
            maxWidth: '58ch',
            lineHeight: 1.6,
          }}
        >
          Each structural challenge paired with the operational or strategic
          response being adopted across the market.
        </p>
      </motion.div>

      {/* Paired rows */}
      <div className="flex flex-col gap-6 mt-8">
        {pairs.rows.map((row, index) => (
          <PairRow
            key={row.id}
            row={row}
            index={index}
            prefersReduced={prefersReduced}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
