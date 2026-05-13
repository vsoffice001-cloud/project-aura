'use client';

/**
 * IndustryAnalysisModule — Row 16 — Recipe report-detail.md line 57
 * bg: warm-300 · spacing: lg · motion: Framer fade-up
 * Header-only strip. Rows 17-23 render as SIBLINGS below (not children).
 */

import { motion, useReducedMotion } from 'framer-motion';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
} from '@kenresearch/design-system/atoms';

export function IndustryAnalysisModule() {
  const prefersReduced = useReducedMotion();

  return (
    <SectionWrapper
      background="warm"
      spacing="lg"
      maxWidth="wide"
      id="sec-industry-analysis"
    >
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="inline-flex mb-3">
          <SectionLabel background="light" variant="default">
            INDUSTRY ANALYSIS
          </SectionLabel>
        </div>
        <SectionHeading level={2} align="left">
          Industry Analysis
        </SectionHeading>
        <p
          style={{
            fontSize: 'var(--typography-size-sm)',
            color: 'var(--surface-text-muted)',
            marginTop: 'var(--space-3)',
            maxWidth: '60ch',
            lineHeight: 1.65,
          }}
        >
          SWOT position, growth drivers, value chain structure, challenges, and
          recent trends shaping the Australia cold chain market through 2027.
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
