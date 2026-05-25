'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Lead: display headline (SectionHeading level={2} center · --color-text-inverse on black bg)
 * Type rhythm: display/xl/base/— — SectionHeading = display scale · body promise = text-base · trust stat values = text-2xl · trust labels = text-compact
 * Motion: full-bleed entrance 800ms — whileInView stagger (eyebrow 0ms · headline 60ms · CTAs 120ms · divider 180ms · trust strip 220ms) · ease-out cubic
 *   — useReducedMotion disables all delays; content renders at final state
 * Depth: cinematic shadow — black surface · trust strip no card shadow (flat on black) · divider = rgba(255,255,255,0.1)
 * Mobile: stack column · CTAs full-width flex-col · trust strip single-col then 3-col sm · default
 */

/**
 * FinalCTABlock — dark conversion section (recipe row 33)
 *
 * Variant: editorial-light
 * Background: black · spacing: xl (LOCK 3)
 * NO pricing · NO "Buy Now" · NO currency.
 * CTAs: Download Sample Report / Talk to Analyst / Request Customization
 * Trust strip: 3 stat tiles (no prices).
 *
 * A11y: dark bg — CSS custom property for primary text (WCAG AA).
 * Framer fade-up · useReducedMotion guard.
 */

import { motion, useReducedMotion } from 'framer-motion';

import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Button,
} from '@kenresearch/design-system/atoms';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';

const TRUST_STATS = [
  { value: '500+', label: 'Enterprise clients trust Ken Research' },
  { value: '1M+', label: 'Market reports across 200+ industries' },
  { value: 'ISO', label: 'Certified research methodology' },
] as const;

const EASE = [0.16, 1, 0.3, 1] as unknown as [number, number, number, number];

export interface FinalCTABlockProps {
  reportSlug?: string;
}

export function FinalCTABlock({ reportSlug = '' }: FinalCTABlockProps) {
  const { openForm } = useLeadFormModal();
  const shouldReduceMotion = useReducedMotion() ?? false;

  const fadeUp = (delay: number) => ({
    initial: shouldReduceMotion ? {} : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.5, ease: EASE, delay: shouldReduceMotion ? 0 : delay },
  });

  return (
    <SectionWrapper background="black" spacing="xl" id="final-cta">
      <div className="flex flex-col items-center text-center gap-10">

        {/* Eyebrow */}
        <motion.div {...fadeUp(0)}>
          {/* SectionLabel.background="dark" renders on black correctly */}
          <SectionLabel background="dark">Get Report Access</SectionLabel>
        </motion.div>

        {/* Headline */}
        <motion.div {...fadeUp(0.06)} className="flex flex-col gap-4 max-w-3xl">
          {/* SectionHeading doesn't accept style prop — wrap in div for color override */}
          <div style={{ color: 'var(--color-text-inverse)' }}>
            <SectionHeading level={2} align="center">
              Get Access to the Full Australia Cold Chain Market Report
            </SectionHeading>
          </div>
          <p
            className="text-base font-body leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            Comprehensive market analysis · dataset access · analyst support
          </p>
        </motion.div>

        {/* CTA grid */}
        <motion.div
          {...fadeUp(0.12)}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center flex-wrap"
        >
          <Button
            variant="brand"
            size="lg"
            animatedArrow
            onClick={() =>
              openForm('sample', {
                reportSlug,
                ctaLocation: 'final-cta-block',
                sectionName: 'final-cta',
              })
            }
            ariaLabel="Download sample report — opens lead form"
          >
            Download Sample Report
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() =>
              openForm('analyst-call', {
                reportSlug,
                ctaLocation: 'final-cta-block',
                sectionName: 'final-cta',
              })
            }
          >
            Talk to Analyst
          </Button>
          <Button
            variant="ghost"
            size="lg"
            background="dark"
            onClick={() =>
              openForm('customization', {
                reportSlug,
                ctaLocation: 'final-cta-block',
                sectionName: 'final-cta',
              })
            }
          >
            Request Customization
          </Button>
        </motion.div>

        {/* Divider */}
        <motion.div
          {...fadeUp(0.18)}
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(255,255,255,0.1)',
          }}
          aria-hidden="true"
        />

        {/* Trust strip */}
        <motion.div
          {...fadeUp(0.22)}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-2xl"
          aria-label="Trust indicators"
        >
          {TRUST_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              {/* text-3xl per CRAFT brief: cinematic black surface · trust stat values deserve strong presence · text-2xl was builder default */}
              <span
                className="text-3xl font-display font-medium tabular-nums"
                style={{ color: 'var(--color-text-inverse)' }}
              >
                {stat.value}
              </span>
              <span
                className="text-compact font-body text-center leading-snug"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
