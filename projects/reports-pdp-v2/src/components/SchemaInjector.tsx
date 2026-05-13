import type { SchemaMeta, FAQEntry } from '@/types/schema';

interface SchemaInjectorProps {
  schemaMeta: SchemaMeta;
  /** Pass report.faq to build FAQPage mainEntity filtered to schemaEnabled entries */
  faq?: FAQEntry[];
}

/**
 * Server component — NEVER add 'use client'.
 * Renders JSON-LD structured data into page <head> via individual <script> blocks.
 * Separate blocks: Organization, WebPage, BreadcrumbList, Product, CreativeWork,
 * Dataset (optional), FAQPage (with schemaEnabled filter), PaywalledElement(s).
 * PRD §44 compliance.
 */
export function SchemaInjector({ schemaMeta, faq }: SchemaInjectorProps) {
  // Merge schemaEnabled FAQ entries into faqPage.mainEntity if faq[] provided
  const faqPage =
    faq && faq.length > 0
      ? {
          ...schemaMeta.faqPage,
          mainEntity: faq
            .filter((f) => f.schemaEnabled)
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
        }
      : schemaMeta.faqPage;

  // Build ordered block list — dataset optional
  const blocks: { id: string; data: unknown }[] = [
    { id: 'organization', data: schemaMeta.organization },
    { id: 'webpage', data: schemaMeta.webPage },
    { id: 'breadcrumb', data: schemaMeta.breadcrumbList },
    { id: 'product', data: schemaMeta.product },
    { id: 'creativework', data: schemaMeta.creativeWork },
    ...(schemaMeta.dataset ? [{ id: 'dataset', data: schemaMeta.dataset }] : []),
    { id: 'faqpage', data: faqPage },
    // Paywalled element markers (schema.org §isAccessibleForFree)
    ...(schemaMeta.paywalledElements ?? []).map((el, i) => ({
      id: `paywall-${i}`,
      data: {
        '@context': 'https://schema.org',
        '@type': 'WebPageElement',
        isAccessibleForFree: false,
        cssSelector: el.cssSelector,
      },
    })),
  ];

  return (
    <>
      {blocks.map((block) => {
        let json: string;
        try {
          json = JSON.stringify(block.data);
        } catch {
          return null;
        }
        return (
          <script
            key={`schema-${block.id}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: json }}
          />
        );
      })}
    </>
  );
}
