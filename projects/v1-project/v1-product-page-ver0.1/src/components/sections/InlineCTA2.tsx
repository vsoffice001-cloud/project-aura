'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Lead: CTA cluster (Button variant="brand" + Button variant="secondary" · no headline needed — conversion intent assumed at this scroll depth)
 * Type rhythm: xl/—/sm/— — headline (if present) = text-xl · CTA labels = text-sm (Button default) · no body copy · no micro
 * Motion: subtle fade-up 400ms (whileInView · once · y 10→0 · opacity 0→1) — within motion budget · not decorative · draws attention to CTA at read depth
 *   DECISION: keeping entrance (builder's choice) · justified because strip is conversion surface not research content · motion signals "action opportunity"
 *   — useReducedMotion: skips initial/animate (content renders at final state)
 * Depth: white accent — SectionWrapper background="white" · no card chrome · accent strip uses border-top color token for visual separation from warm neighbors
 * Mobile: CTAs stack vertically (flex-col) · full-width buttons · stack column default
 */

/**
 * InlineCTA2 — Sample + Customization CTA pair (recipe row 22)
 *
 * Variant: editorial-light
 * Background: white · spacing: sm (LOCK 3)
 * STANDALONE section — has own SectionWrapper
 *
 * No pricing. CTAs = Download Sample / Request Customization only.
 * useReducedMotion mandatory
 */

import { motion, useReducedMotion } from 'framer-motion';
import {
  SectionWrapper,
  Button,
} from '@kenresearch/design-system/atoms';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';

export interface InlineCTA2Props {
  headline?: string;
  body?: string;
  reportSlug?: string;
}

export function InlineCTA2({
  headline = 'Need this analysis tailored to your operation?',
  body = 'Customise geography, product mix, competitive scope, or forecast period to match your business context.',
  reportSlug = '',
}: InlineCTA2Props) {
  const { openForm } = useLeadFormModal();
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionWrapper background="white" spacing="sm" id="inline-cta-2">
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-5"
      >
        {/* Copy */}
        <div className="flex flex-col gap-1.5 max-w-prose">
          {/* text-xl per CRAFT brief: InlineCTA headline scale · builder default was text-base (too small for CTA lead) */}
          <p
            className="text-xl font-display font-light leading-snug"
            style={{ color: 'var(--color-foundation-black)' }}
          >
            {headline}
          </p>
          {body && (
            <p
              className="text-compact font-body leading-relaxed"
              style={{ color: 'var(--surface-text-muted)' }}
            >
              {body}
            </p>
          )}
        </div>

        {/* CTA pair */}
        <div className="flex gap-3 shrink-0 flex-wrap">
          <Button
            variant="brand"
            size="md"
            onClick={() =>
              openForm('sample', {
                reportSlug,
                ctaLocation: 'inline-cta-2',
                sectionName: 'inline-cta-2',
              })
            }
          >
            Download Sample Report
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() =>
              openForm('customization', {
                reportSlug,
                ctaLocation: 'inline-cta-2',
                sectionName: 'inline-cta-2',
              })
            }
          >
            Request Customization
          </Button>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
