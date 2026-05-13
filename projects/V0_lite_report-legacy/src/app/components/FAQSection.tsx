import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SectionWrapper } from '@/design-system/components/SectionWrapper';
import { SectionLabel } from '@/design-system/components/SectionLabel';
import { SectionHeading } from '@/design-system/components/SectionHeading';
import { useAnalytics } from '../hooks/useAnalytics';
import { iconColors } from '@/design-system/iconColors';
import { CTALink } from './CTALink';

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
    question: 'Do you offer refunds if the report doesn\'t meet expectations?',
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

export function FAQSection() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);
  const { trackFAQExpand } = useAnalytics();

  const toggleFaq = (id: number) => {
    const faq = faqs.find(f => f.id === id);
    const isOpening = openFaqId !== id;
    
    setOpenFaqId(openFaqId === id ? null : id);
    
    // Track FAQ expansion (only when opening)
    if (isOpening && faq) {
      trackFAQExpand(faq.question, faq.id, 'FAQ Section');
    }
  };

  return (
    <SectionWrapper background="white" spacing="lg" maxWidth="wide">
      <div className="max-w-3xl mb-12">
        <div className="inline-flex mb-3">
          <SectionLabel background="light" variant="accent">
            FREQUENTLY ASKED
          </SectionLabel>
        </div>
        <SectionHeading level={2} align="left">
          Frequently Asked Questions
        </SectionHeading>
        <p className="text-[1rem] text-[var(--black-500)] mt-4 leading-relaxed">
          Everything you need to know about our market research reports
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => {
          const isOpen = openFaqId === faq.id;
          return (
            <div
              key={faq.id}
              className="border border-black/10 rounded-[10px] overflow-hidden 
                hover:border-black/25 transition-colors duration-200"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                id={`faq-question-${faq.id}`}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left 
                  hover:bg-black/[0.02] transition-colors duration-200 group"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="text-[1rem] font-medium text-black pr-4 leading-relaxed">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  color={iconColors.utility}
                  strokeWidth={2}
                />
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${faq.id}`}
                  className="px-4 sm:px-6 pb-4 sm:pb-5 text-[1rem] text-[var(--black-500)] leading-relaxed 
                    pt-4 animate-in fade-in slide-in-from-top-2 duration-300"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact CTA */}
      <div className="mt-10 sm:mt-12 text-left p-5 sm:p-8 rounded-[10px] bg-black/[0.02] border border-black/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-[1rem] text-black mb-2">
            Still have questions?
          </p>
          <p className="text-[0.875rem] text-[var(--black-500)]">
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