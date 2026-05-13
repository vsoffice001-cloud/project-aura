'use client';

/**
 * InlineCTA2 — Row 21 — Recipe report-detail.md line 62
 * bg: white · spacing: sm · motion: Framer fade-up
 * Sample + Customization CTA pair (NOT Analyst — that's InlineCTA1).
 * Labels: "Download Sample Report" / "Request Customization" (recipe-locked PRD §45)
 */

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionWrapper } from '@kenresearch/design-system/atoms';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';
import { useAnalytics } from '@/hooks/useAnalytics';

interface Props {
  reportSlug: string;
}

export function InlineCTA2({ reportSlug }: Props) {
  const prefersReduced = useReducedMotion();
  const { openForm } = useLeadFormModal();
  const dispatch = useAnalytics();

  const handleSample = () => {
    dispatch('sample_cta_click', {
      section_name: 'InlineCTA2',
      cta_location: 'mid_page',
    });
    openForm('sample', {
      reportSlug,
      sectionName: 'InlineCTA2',
      ctaLocation: 'mid_page',
    });
  };

  const handleCustomization = () => {
    dispatch('customization_cta_click', {
      section_name: 'InlineCTA2',
      cta_location: 'mid_page',
    });
    openForm('customization', {
      reportSlug,
      sectionName: 'InlineCTA2',
      ctaLocation: 'mid_page',
    });
  };

  return (
    <SectionWrapper
      background="white"
      spacing="sm"
      maxWidth="wide"
      id="sec-inline-cta-2"
    >
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        style={{
          borderRadius: 'var(--radius-card)',
          border: '1px solid var(--border-soft)',
          background: 'var(--color-ramp-warm-50)',
          padding: 'var(--space-8)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Copy */}
          <div style={{ maxWidth: '44ch' }}>
            <p
              style={{
                fontFamily: 'var(--typography-family-display)',
                fontSize: 'var(--typography-size-lg)',
                fontWeight: 600,
                color: 'var(--surface-text)',
                lineHeight: 1.3,
                marginBottom: 'var(--space-2)',
              }}
            >
              Need this tailored to your scope?
            </p>
            <p
              style={{
                fontSize: 'var(--typography-size-sm)',
                color: 'var(--surface-text-muted)',
                lineHeight: 1.6,
              }}
            >
              Adapt the geography, product mix, or competitive set. Custom
              delivery within 5 working days.
            </p>
          </div>

          {/* CTA pair */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Primary — brand red */}
            <button
              type="button"
              onClick={handleSample}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-3) var(--space-6)',
                borderRadius: 'var(--radius-button)',
                border: 'none',
                background: 'var(--color-brand-red)',
                cursor: 'pointer',
                fontSize: 'var(--typography-size-sm)',
                fontWeight: 500,
                color: '#ffffff',
                minHeight: '44px',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  'var(--color-brand-red-dark, #8a1519)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-brand-red)';
              }}
            >
              Download Sample Report
              <ArrowUpRight size={15} aria-hidden="true" />
            </button>

            {/* Secondary — outline */}
            <button
              type="button"
              onClick={handleCustomization}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-3) var(--space-6)',
                borderRadius: 'var(--radius-button)',
                border: '1px solid var(--color-ramp-warm-400)',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: 'var(--typography-size-sm)',
                fontWeight: 500,
                color: 'var(--surface-text)',
                minHeight: '44px',
                transition: 'border-color 0.2s ease, background-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  'var(--color-ramp-warm-600)';
                e.currentTarget.style.backgroundColor =
                  'var(--color-ramp-warm-50)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  'var(--color-ramp-warm-400)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Request Customization
              <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
