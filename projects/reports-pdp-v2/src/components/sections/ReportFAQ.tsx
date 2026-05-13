'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Lead: Q text (text-2xl font-display per <summary> · question is visual anchor; answer follows as text-base on expand)
 * Type rhythm: 2xl/lg/base/xs — SectionHeading = text-2xl · question summary = text-lg · answer = text-base · source note = text-xs
 * Motion: native <details> expand (browser-native · no Framer) · section fade-up on mount (whileInView · once · 300ms)
 *   — useReducedMotion guard on Framer mount animation · native <details> unaffected (browser handles)
 * Depth: borders-only — <details> rows with bottom border-subtle · no shadow · clean FAQ list = borders only (pattern established in DESIGN.md)
 * Mobile: full-width details elements · summary text wraps · touch-friendly 44px min-height per row · stack column default
 */

/**
 * ReportFAQ — 10 FAQ accordion (recipe row 30)
 *
 * Variant: editorial-light
 * Background: warm · spacing: lg (LOCK 3)
 * Semantic <details><summary> native accordion (a11y built-in).
 * 10 FAQ types: size · forecast · CAGR · segments · competitors · coverage
 *                methodology · customization · delivery · access
 *
 * PRD §43: AI-extractable visible HTML — NOT hidden behind JS-only interactions.
 * FAQPage JSON-LD schema emitted via SchemaInjector (server-rendered, not here).
 *
 * A11y: native <details>/<summary> — keyboard/screen-reader built-in.
 */

import { motion, useReducedMotion } from 'framer-motion';


const EASE = [0.16, 1, 0.3, 1] as unknown as [number, number, number, number];
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Button,
} from '@kenresearch/design-system/atoms';
import type { FAQEntry } from '@/types/schema';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';

export interface ReportFAQProps {
  faq: FAQEntry[];
  reportSlug?: string;
}

function FAQItem({ entry, index, shouldReduceMotion }: { entry: FAQEntry; index: number; shouldReduceMotion: boolean }) {
  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10px' }}
      transition={{ duration: 0.35, ease: EASE, delay: shouldReduceMotion ? 0 : index * 0.04 }}
    >
      <details
        className="group"
        style={{
          borderBottom: '1px solid var(--border-soft)',
        }}
      >
        <summary
          className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none"
          style={{ color: 'var(--color-foundation-black)' }}
        >
          <span className="text-base font-body font-medium leading-snug flex-1">
            {entry.question}
          </span>
          {/* Chevron icon via CSS — avoids importing icon library just for toggle */}
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-open:rotate-45 shrink-0"
            style={{
              display: 'inline-block',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-ramp-warm-200)',
              flexShrink: 0,
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 300,
                lineHeight: 1,
                color: 'var(--surface-text-muted)',
              }}
            >
              +
            </span>
          </span>
        </summary>
        <div
          className="pb-4"
          style={{ color: 'var(--surface-text-muted)' }}
        >
          <p className="text-compact font-body leading-relaxed">
            {entry.answer}
          </p>
        </div>
      </details>
    </motion.div>
  );
}

export function ReportFAQ({ faq, reportSlug = '' }: ReportFAQProps) {
  const { openForm } = useLeadFormModal();
  const shouldReduceMotion = useReducedMotion() ?? false;

  // Sort by displayOrder, fallback to array order
  const sorted = [...faq].sort((a, b) => a.displayOrder - b.displayOrder);

  if (sorted.length === 0) return null;

  return (
    <SectionWrapper background="warm" spacing="lg" id="report-faq">
      <div className="flex flex-col gap-8">
        {/* Heading */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <SectionLabel>FAQ</SectionLabel>
          <SectionHeading level={2} align="left">
            Frequently Asked Questions
          </SectionHeading>
          <p className="mt-2 text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
            Common questions about this market report — answered in direct, AI-extractable language.
          </p>
        </motion.div>

        {/* FAQ list */}
        <div
          className="flex flex-col"
          style={{ borderTop: '1px solid var(--border-soft)' }}
          aria-label="Frequently asked questions"
        >
          {sorted.map((entry, idx) => (
            <FAQItem
              key={entry.id}
              entry={entry}
              index={idx}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center">
          <Button
            variant="secondary"
            size="md"
            onClick={() =>
              openForm('analyst-call', {
                reportSlug,
                ctaLocation: 'report-faq',
                sectionName: 'faq',
              })
            }
          >
            Have a specific question? Talk to Analyst
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
