'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Section type: Inline CTA
 * Lead element: CTA cluster (2 Buttons — brand primary + secondary · 44px touch targets)
 * Support: headline (text-base font-display font-light · warm left side) + body (text-compact · muted)
 * Type rhythm: xl/—/sm/— (inline CTA type · headline xl · no subheadings · body sm · no captions needed)
 *   DECISION: headline at text-base (not xl) as DS font-display font-light achieves visual separation without scale bump
 * Motion event: static — whileInView fade-up 400ms (1 event) · inline CTAs are low-priority motion context
 *   — useReducedMotion: initial:{} → no animation · renders at final state
 * Depth: warm bg accent (SectionWrapper background="warm" · no card shadow · strip-style · CTA buttons provide own depth)
 * Mobile override: flex-col → md:flex-row · CTA pair wraps (flex-wrap) · full-width buttons on narrow viewports
 */

/**
 * InlineCTA1 — Sample + Analyst CTA pair (PRD §45)
 *
 * Variant: editorial-light
 * Background: warm · spacing: sm (LOCK 3)
 *
 * No pricing. CTAs = Download Sample / Talk to Analyst only.
 */

import { motion, useReducedMotion } from 'framer-motion';
import {
  SectionWrapper,
  Button,
} from '@kenresearch/design-system/atoms';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';

export interface InlineCTA1Props {
  headline?: string;
  body?: string;
  reportSlug?: string;
}

export function InlineCTA1({
  headline = 'Want the full sizing breakdown?',
  body = 'Sample includes regional split, pallet analysis, and the 2027 forecast model.',
  reportSlug = '',
}: InlineCTA1Props) {
  const { openForm } = useLeadFormModal();
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionWrapper background="warm" spacing="sm" id="inline-cta-1">
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-5"
      >
        {/* Copy */}
        <div className="flex flex-col gap-1.5 max-w-prose">
          <p
            className="text-base font-display font-light leading-snug"
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
                ctaLocation: 'inline-cta-1',
                sectionName: 'inline-cta-1',
              })
            }
          >
            Download Sample Report
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() =>
              openForm('analyst-call', {
                reportSlug,
                ctaLocation: 'inline-cta-1',
                sectionName: 'inline-cta-1',
              })
            }
          >
            Talk to Analyst
          </Button>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
