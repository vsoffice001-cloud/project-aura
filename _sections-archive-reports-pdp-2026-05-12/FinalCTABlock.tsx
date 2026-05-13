'use client';

/**
 * FinalCTABlock — Row 33 — Recipe report-detail.md line 74
 * bg: black (cinematic-dark) · spacing: xl · motion: Framer fade-up
 * Centered · Big h2 Noto Serif white · Primary: Get Report Access · Secondary: Talk to Analyst
 * Trust micro-strip · White text on #0a0a0c
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Award, BookOpen, Building2 } from 'lucide-react';
import {
  SectionWrapper,
  Button,
} from '@kenresearch/design-system/atoms';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';
import { useAnalytics } from '@/hooks/useAnalytics';

interface Props {
  reportSlug: string;
}

const TRUST_ITEMS = [
  { icon: Building2, label: 'Trusted by Fortune 500' },
  { icon: BookOpen, label: '1M+ reports published' },
  { icon: Award, label: '14 industries covered' },
];

export function FinalCTABlock({ reportSlug }: Props) {
  const prefersReduced = useReducedMotion();
  const { openForm } = useLeadFormModal();
  const dispatch = useAnalytics();

  const handleGetAccess = () => {
    dispatch('sample_cta_click', {
      section_name: 'FinalCTABlock',
      cta_location: 'final-cta',
    });
    openForm('sample', { reportSlug, sectionName: 'FinalCTA' });
  };

  const handleAnalystCall = () => {
    dispatch('analyst_cta_click', {
      section_name: 'FinalCTABlock',
      cta_location: 'final-cta',
    });
    openForm('analyst-call', { reportSlug, sectionName: 'FinalCTA' });
  };

  return (
    <SectionWrapper background="black" spacing="xl" id="sec-final-cta">
      <div className="flex flex-col items-center text-center gap-8 max-w-2xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-[var(--typography-family-display)] font-semibold leading-tight"
          style={{
            fontSize: 'var(--typography-size-3xl)',
            color: 'var(--color-foundation-white)',
          }}
        >
          Ready to unlock the full report?
        </motion.h2>

        {/* Intro paragraph */}
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="leading-relaxed"
          style={{
            fontSize: 'var(--typography-size-lg)',
            color: 'rgba(250, 250, 250, 0.65)',
            maxWidth: '54ch',
          }}
        >
          Access the complete market sizing, segmentation, competitive analysis, and 2027 forecast for the Australia Cold Chain Market.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
        >
          <Button
            variant="brand"
            size="lg"
            onClick={handleGetAccess}
          animatedArrow
          >
            Get Report Access
          </Button>
          <Button
            variant="ghost"
            size="lg"
            background="dark"
            onClick={handleAnalystCall}
          >
            Talk to Analyst
          </Button>
        </motion.div>

        {/* Trust micro-strip */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 pt-4"
          style={{ borderTop: '1px solid rgba(250, 250, 250, 0.12)', width: '100%' }}
        >
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon
                size={16}
                aria-hidden="true"
                style={{ color: 'rgba(250, 250, 250, 0.4)' }}
              />
              <span
                className="text-sm"
                style={{ color: 'rgba(250, 250, 250, 0.55)' }}
              >
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
