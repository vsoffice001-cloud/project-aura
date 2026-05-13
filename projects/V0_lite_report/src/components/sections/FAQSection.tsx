'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CTALink, SectionHeading, SectionLabel, SectionWrapper } from '@kenresearch/design-system/atoms';

const faqs = [
  {
    id: 1,
    question: 'What format do I receive the report in?',
    answer:
      'You receive the complete report in three formats: PDF for reading and sharing, Excel spreadsheets with all data tables and statistics, and PowerPoint slides ready for presentations. All formats are fully editable and can be customized to your needs.',
  },
  {
    id: 2,
    question: 'How recent is the data in the report?',
    answer:
      'All our reports use the most current data available, with 2024 as the base year. Historical data typically covers 2019-2024, while forecasts extend through 2030. Data is sourced from primary research, industry databases, company financial reports, and regulatory filings.',
  },
  {
    id: 3,
    question: 'Can I request custom analysis or additional data?',
    answer:
      'Yes, we offer tailored research services for specific market segments, geographic regions, or competitive analysis. Custom research can include additional company profiles, deeper segmentation, or focus on particular aspects of the market relevant to your business needs.',
  },
  {
    id: 4,
    question: "What's the difference between the sample and full report?",
    answer:
      'The sample report (25 pages) provides an overview of the structure, methodology, and key findings to help you evaluate quality. The full report (165+ pages) includes complete analysis, all data tables, detailed segmentation, comprehensive company profiles, and full datasets in Excel format.',
  },
  {
    id: 5,
    question: "Do you offer refunds if the report doesn't meet expectations?",
    answer:
      'Yes, we offer a 14-day money-back guarantee. If the report does not meet your requirements or expectations, you can request a full refund within 14 days of purchase. We also provide pre-purchase consultations to ensure the report matches your needs.',
  },
  {
    id: 6,
    question: 'How quickly can I access the report after purchase?',
    answer:
      'The report is available for immediate download after purchase. You will receive an email with download links for all formats (PDF, Excel, PowerPoint) within minutes. For custom research requests, the timeline depends on scope and complexity, typically 2-4 weeks.',
  },
];

/**
 * FAQSection — accordion-style FAQ w/ contact CTA.
 *
 * @port V0_lite_report-legacy/src/app/components/FAQSection.tsx
 * Note: legacy `useAnalytics` tracking deferred to Phase C step 7 (consumer-side analytics).
 */
export function FAQSection() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <SectionWrapper background="white" spacing="lg" maxWidth="wide" id="faq">
      <div className="max-w-3xl mb-12">
        <div className="inline-flex mb-3">
          <SectionLabel background="light" variant="accent">
            FREQUENTLY ASKED
          </SectionLabel>
        </div>
        <SectionHeading level={2} align="left">
          Frequently Asked Questions
        </SectionHeading>
        <p className="text-[var(--typography-size-sm)] text-[var(--surface-text-muted)] mt-4 leading-relaxed">
          Everything you need to know about our market research reports
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => {
          const isOpen = openFaqId === faq.id;
          return (
            <div
              key={faq.id}
              className="border border-[var(--border-soft)] rounded-[var(--radius-card)] overflow-hidden hover:border-[var(--border-strong)] transition-colors duration-200"
            >
              <button
                type="button"
                onClick={() => toggleFaq(faq.id)}
                id={`faq-question-${faq.id}`}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left hover:bg-[var(--tint-soft)] transition-colors duration-200"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="text-[var(--typography-size-sm)] font-medium text-[var(--surface-text)] pr-4 leading-relaxed">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 text-[var(--surface-text-muted)] ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  strokeWidth={2}
                />
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${faq.id}`}
                  className="px-4 sm:px-6 pb-4 sm:pb-5 text-[var(--typography-size-sm)] text-[var(--surface-text-muted)] leading-relaxed pt-4"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10 sm:mt-12 text-left p-5 sm:p-8 rounded-[var(--radius-card)] bg-[var(--tint-soft)] border border-[var(--border-soft)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-[var(--typography-size-sm)] text-[var(--surface-text)] mb-2">
            Still have questions?
          </p>
          <p className="text-[var(--typography-size-compact)] text-[var(--surface-text-muted)]">
            Our research team is here to help you find the right solution
          </p>
        </div>
        <CTALink href="/contact" variant="brand" size="md" className="flex-shrink-0">
          Contact Research Team
        </CTALink>
      </div>
    </SectionWrapper>
  );
}
