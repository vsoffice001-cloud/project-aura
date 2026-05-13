'use client';

/**
 * ReportFAQ — Row 30 — Recipe report-detail.md line 71
 * bg: warm-300 · spacing: lg · motion: native <details>/<summary> (zero-JS expandable)
 * 10 FAQ categories · each expand fires faq_expand analytics
 * Inline FAQPage JSON-LD below (schema.org proximity — intentional duplicate of SchemaInjector)
 */

import { useRef } from 'react';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Badge,
} from '@kenresearch/design-system/atoms';
import { useAnalytics } from '@/hooks/useAnalytics';
import type { FAQEntry } from '@/types/schema';

const CATEGORY_LABELS: Record<FAQEntry['category'], string> = {
  'market-size': 'Market Size',
  forecast: 'Forecast',
  cagr: 'CAGR',
  segments: 'Segments',
  competitors: 'Competitors',
  coverage: 'Coverage',
  methodology: 'Methodology',
  customization: 'Customization',
  delivery: 'Delivery',
  purchase: 'Purchase',
};

interface Props {
  entries: FAQEntry[];
}

interface FaqItemProps {
  entry: FAQEntry;
  onExpand: (entryId: string) => void;
}

function FaqItem({ entry, onExpand }: FaqItemProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const handleToggle = () => {
    // Fire analytics only on open (not on close)
    if (detailsRef.current?.open) {
      onExpand(entry.id);
    }
  };

  return (
    <details
      ref={detailsRef}
      onToggle={handleToggle}
      className="group border-b"
      style={{ borderColor: 'var(--border-default)' }}
    >
      <summary
        className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none select-none"
        style={{ color: 'var(--color-foundation-black)' }}
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span className="shrink-0 mt-0.5">
            <Badge theme="neutral">{CATEGORY_LABELS[entry.category]}</Badge>
          </span>
          <span
            className="font-[var(--typography-family-display)] font-medium leading-snug"
            style={{ fontSize: 'var(--typography-size-base)', color: 'var(--color-foundation-black)' }}
          >
            {entry.question}
          </span>
        </div>

        {/* Expand/collapse indicator */}
        <span
          className="shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-sm font-bold transition-transform duration-200 group-open:rotate-45"
          style={{
            borderColor: 'var(--border-default)',
            color: 'var(--color-neutral-500, #6b7280)',
          }}
          aria-hidden="true"
        >
          +
        </span>
      </summary>

      <div className="pb-5 pl-0">
        <p
          className="leading-relaxed"
          style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--color-neutral-700, #374151)', maxWidth: '72ch' }}
        >
          {entry.answer}
        </p>
      </div>
    </details>
  );
}

export function ReportFAQ({ entries }: Props) {
  const dispatch = useAnalytics();

  if (!entries || entries.length === 0) return null;

  const sorted = [...entries].sort((a, b) => a.displayOrder - b.displayOrder);
  const schemaEntries = sorted.filter((e) => e.schemaEnabled);

  const handleExpand = (entryId: string) => {
    dispatch('faq_expand', {
      section_name: 'ReportFAQ',
      chart_id: entryId,
    });
  };

  // Build FAQPage JSON-LD
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: schemaEntries.map((e) => ({
      '@type': 'Question',
      name: e.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: e.answer,
      },
    })),
  };

  return (
    <SectionWrapper background="warm" spacing="lg" id="sec-faq">
      <SectionLabel>FAQs</SectionLabel>
      <SectionHeading level={2} className="mt-2 mb-8">
        Frequently Asked Questions
      </SectionHeading>

      <div
        className="rounded-lg overflow-hidden border"
        style={{ borderColor: 'var(--border-default)', background: 'var(--color-foundation-white)' }}
      >
        <div className="px-6">
          {sorted.map((entry) => (
            <FaqItem
              key={entry.id}
              entry={entry}
              onExpand={handleExpand}
            />
          ))}
        </div>
      </div>

      {/* Inline FAQPage JSON-LD — schema.org proximity for AI/GEO extraction */}
      {/* Intentional duplicate of SchemaInjector per recipe line 73 guidance */}
      {schemaEntries.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </SectionWrapper>
  );
}
