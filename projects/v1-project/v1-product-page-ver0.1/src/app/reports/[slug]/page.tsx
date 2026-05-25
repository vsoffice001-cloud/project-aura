import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { REPORT_REGISTRY } from '@/lib/mock-data';
import { SchemaInjector } from '@/components/SchemaInjector';
import { AnalyticsProvider } from '@/components/AnalyticsProvider';
import { LeadFormModalProvider } from '@/components/LeadFormModalProvider';
import { ReportDetailPage } from '@/components/ReportDetailPage';

// TODO: replace w/ real API — GET /api/reports/:slug
interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ variant?: string }>;
}

export async function generateStaticParams() {
  return Object.keys(REPORT_REGISTRY).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const report = REPORT_REGISTRY[slug];

  if (!report) {
    return { title: 'Report Not Found · Ken Research' };
  }

  // PRD §42 title patterns
  const forecastEndYear = report.forecast_period.split('-')[1] ?? '';
  const title = `${report.region} ${report.market_name} Outlook ${report.base_year}-${forecastEndYear} | Ken Research`;
  const description = `Explore ${report.region} ${report.market_name} size, CAGR, segmentation, growth drivers, competitor landscape and ${forecastEndYear} outlook. Download sample report by Ken Research.`;

  const canonical = `https://www.kenresearch.com/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonical,
      siteName: 'Ken Research',
      // heroImage not in schema v2 — placeholder for when PRD §44 adds it
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ReportPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { variant: variantOverride } = await searchParams;

  // TODO: replace w/ real API — GET /api/reports/:slug
  const report = REPORT_REGISTRY[slug];

  if (!report) {
    notFound();
  }

  // Variant selection deferred to Phase D. Editorial-A always for now.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _effectiveVariant = variantOverride ?? report.meta.variant;

  return (
    <>
      {/* Server-rendered schema.org JSON-LD blocks — faq filters to schemaEnabled entries */}
      <SchemaInjector schemaMeta={report.schemaMeta} faq={report.faq} />
      {/* Client analytics context — product_page_view + scroll_depth auto-fire */}
      <AnalyticsProvider context={report.analyticsContext}>
        {/* LeadFormModalProvider inside AnalyticsProvider so forms can fire analytics events */}
        <LeadFormModalProvider>
          <ReportDetailPage report={report} />
        </LeadFormModalProvider>
      </AnalyticsProvider>
    </>
  );
}
