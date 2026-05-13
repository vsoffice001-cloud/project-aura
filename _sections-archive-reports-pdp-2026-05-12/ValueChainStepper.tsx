'use client';

/**
 * ValueChainStepper — Row 19 — Recipe report-detail.md line 60
 * bg: white · spacing: lg · motion: Framer reveal nodes left-to-right (60ms stagger desktop)
 * Desktop: horizontal flow. Mobile: vertical <ol> w/ StatusDot atoms.
 * Below: locked margin/opportunity analysis panel.
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
import { AccessLevelGate } from '@/components/AccessLevelGate';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';
import { useAnalytics } from '@/hooks/useAnalytics';
import type { FlowModule } from '@/types/schema';

interface Props {
  stages: FlowModule | null;
  reportSlug: string;
}

const LEAD_GATED_ACCESS = {
  level: 'lead-gated' as const,
  ctaTrigger: 'sample' as const,
  paywallSelector: '.kr-paywall-value-chain',
  schemaIsAccessibleForFree: false,
};

export function ValueChainStepper({ stages, reportSlug }: Props) {
  const prefersReduced = useReducedMotion();
  const { openForm } = useLeadFormModal();
  const dispatch = useAnalytics();

  if (!stages || stages.steps.length === 0) return null;

  const handleUnlock = () => {
    dispatch('lead_wall_triggered', {
      section_name: 'ValueChainStepper',
      access_level: 'lead-gated',
    });
    openForm('sample', { reportSlug, sectionName: 'ValueChainStepper' });
  };

  return (
    <SectionWrapper
      background="white"
      spacing="lg"
      maxWidth="wide"
      id="sec-value-chain"
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
            VALUE CHAIN
          </SectionLabel>
        </div>
        <SectionHeading level={2} align="left">
          {stages.heading}
        </SectionHeading>
        {stages.subheading && (
          <p
            style={{
              fontSize: 'var(--typography-size-sm)',
              color: 'var(--surface-text-muted)',
              marginTop: 'var(--space-3)',
              lineHeight: 1.6,
            }}
          >
            {stages.subheading}
          </p>
        )}
      </motion.div>

      {/* Desktop horizontal flow */}
      <div className="hidden md:flex items-start gap-0 mt-10 overflow-x-auto">
        {stages.steps.map((step, index) => {
          const isLast = index === stages.steps.length - 1;
          return (
            <div key={step.id} className="flex items-start flex-shrink-0">
              {/* Step node */}
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.4,
                  ease: 'easeOut',
                  delay: prefersReduced ? 0 : Math.min(index, 7) * 0.06,
                }}
                style={{ minWidth: '160px', maxWidth: '200px' }}
              >
                <Card variant="white" padding="md" className="flex flex-col gap-2">
                  <div
                    style={{
                      fontSize: 'var(--typography-size-compact)',
                      fontWeight: 700,
                      color: 'var(--surface-text-muted)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--typography-family-display)',
                      fontSize: 'var(--typography-size-sm)',
                      fontWeight: 600,
                      color: 'var(--surface-text)',
                      lineHeight: 1.3,
                    }}
                  >
                    {step.label}
                  </h3>
                  {step.body && (
                    <p
                      style={{
                        fontSize: 'var(--typography-size-compact)',
                        color: 'var(--surface-text-muted)',
                        lineHeight: 1.5,
                      }}
                    >
                      {step.body}
                    </p>
                  )}
                  {step.metric && (
                    <Badge theme="neutral" size="sm">
                      {step.metric.label}: {step.metric.value}
                    </Badge>
                  )}
                </Card>
              </motion.div>

              {/* Arrow connector */}
              {!isLast && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 var(--space-2)',
                    paddingTop: '28px',
                    flexShrink: 0,
                    color: 'var(--surface-text-muted)',
                  }}
                  aria-hidden="true"
                >
                  <ArrowRight size={16} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile vertical stepper */}
      <ol
        className="flex flex-col gap-4 mt-8 md:hidden"
        aria-label="Value chain steps"
      >
        {stages.steps.map((step, index) => (
          <motion.li
            key={step.id}
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.35,
              ease: 'easeOut',
              delay: prefersReduced ? 0 : Math.min(index, 7) * 0.06,
            }}
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                flexShrink: 0,
                paddingTop: '2px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'var(--color-ramp-warm-300)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--typography-size-compact)',
                fontWeight: 700,
                color: 'var(--surface-text-muted)',
              }}
              aria-hidden="true"
            >
              {index + 1}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              <h3
                style={{
                  fontFamily: 'var(--typography-family-display)',
                  fontSize: 'var(--typography-size-sm)',
                  fontWeight: 600,
                  color: 'var(--surface-text)',
                  lineHeight: 1.3,
                }}
              >
                {step.label}
              </h3>
              {step.body && (
                <p
                  style={{
                    fontSize: 'var(--typography-size-compact)',
                    color: 'var(--surface-text-muted)',
                    lineHeight: 1.5,
                  }}
                >
                  {step.body}
                </p>
              )}
              {step.metric && (
                <Badge theme="neutral" size="sm">
                  {step.metric.label}: {step.metric.value}
                </Badge>
              )}
            </div>
          </motion.li>
        ))}
      </ol>

      {/* Locked margin/opportunity analysis panel */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45, ease: 'easeOut', delay: prefersReduced ? 0 : 0.2 }}
        style={{ marginTop: 'var(--space-8)' }}
      >
        <AccessLevelGate
          access={LEAD_GATED_ACCESS}
          moduleId="value-chain-margin"
          sectionName="ValueChainStepper"
          fallback={
            <div
              style={{
                borderRadius: 'var(--radius-card)',
                border: '1px solid var(--color-ramp-warm-300)',
                background: 'var(--color-ramp-warm-50)',
                padding: 'var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
              }}
            >
              <div className="flex items-center gap-2">
                <SectionLabel background="light" variant="default">
                  MARGIN &amp; OPPORTUNITY ANALYSIS
                </SectionLabel>
                <Badge theme="neutral" size="sm">
                  Lead-gated
                </Badge>
              </div>
              <p
                style={{
                  fontSize: 'var(--typography-size-sm)',
                  color: 'var(--surface-text-muted)',
                  lineHeight: 1.6,
                  maxWidth: '52ch',
                }}
              >
                Gross margin bands per value-chain stage, margin-compression
                drivers, and white-space opportunity areas. Available on form
                submission.
              </p>
              <button
                type="button"
                onClick={handleUnlock}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-3) var(--space-5)',
                  borderRadius: 'var(--radius-button)',
                  border: 'none',
                  background: 'var(--color-brand-red)',
                  color: '#ffffff',
                  fontSize: 'var(--typography-size-sm)',
                  fontWeight: 500,
                  cursor: 'pointer',
                  minHeight: '44px',
                  alignSelf: 'flex-start',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    'var(--color-brand-red-dark, #8a1519)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    'var(--color-brand-red)';
                }}
              >
                Unlock margin analysis
              </button>
            </div>
          }
        >
          {/* Unlocked state — full margin content */}
          <div
            style={{
              borderRadius: 'var(--radius-card)',
              border: '1px solid var(--border-soft)',
              padding: 'var(--space-6)',
            }}
          >
            <SectionLabel background="light" variant="default">
              MARGIN &amp; OPPORTUNITY ANALYSIS
            </SectionLabel>
            <p
              style={{
                fontSize: 'var(--typography-size-sm)',
                color: 'var(--surface-text-muted)',
                marginTop: 'var(--space-3)',
                lineHeight: 1.6,
              }}
            >
              Full margin-band data is available after form submission.
            </p>
          </div>
        </AccessLevelGate>
      </motion.div>
    </SectionWrapper>
  );
}
