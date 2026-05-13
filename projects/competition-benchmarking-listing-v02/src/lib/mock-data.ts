/**
 * Competition Benchmarking Listing — Mock Data
 *
 * TODO: replace w/ real API — GET /api/benchmarks?filters=...
 * Shape contract: BenchmarkReport interface below.
 * All 24 entries carry reportType = 'competition-benchmarking'.
 */

export interface BenchmarkReport {
  id: string;
  title: string;
  industry: string;
  region: string;
  /** Country derived from title content; sub-region filter dimension */
  country?: string;
  /** Trending topic tags — cross-cutting filter (independent of industry) */
  tags?: string[];
  competitorSetSize: '3-5' | '5-10' | '10+';
  publishedDate: string; // ISO yyyy-mm-dd
  pages: number;
  methodology: ('mystery-shopping' | 'expert-interview' | 'public-data' | 'hybrid')[];
  thumbnailUrl: string;
  description: string;
  slug: string;
  isFeatured?: boolean;
  reportType: 'competition-benchmarking';
}

// TODO: replace w/ real API — GET /api/benchmarks?filters=industry,region,methodology,competitorSetSize,year
export const BENCHMARK_REPORTS: BenchmarkReport[] = [
  {
    id: 'cbr-001',
    title: 'India D2C Skincare — Top 10 Brand Benchmarking Q1 2026',
    industry: 'Consumer & Retail',
    region: 'India & South Asia',
    competitorSetSize: '10+',
    publishedDate: '2026-03-15',
    pages: 148,
    methodology: ['mystery-shopping', 'public-data'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80',
    description: 'Comprehensive positioning, pricing, and distribution benchmarking of the top 10 D2C skincare brands in India, covering Minimalist, Plum, and eight other key players across digital and offline channels.',
    slug: 'india-d2c-skincare-top10-benchmarking-q1-2026',
    isFeatured: true,
    reportType: 'competition-benchmarking',
  },
  {
    id: 'cbr-002',
    title: 'GCC Private Healthcare Providers — Competitive Positioning Report 2025',
    industry: 'Healthcare',
    region: 'GCC & Middle East',
    competitorSetSize: '5-10',
    publishedDate: '2025-11-20',
    pages: 182,
    methodology: ['expert-interview', 'public-data'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80',
    description: 'Strategic benchmarking of eight leading private hospital chains across the GCC, covering patient experience, digital health adoption, and pricing structures.',
    slug: 'gcc-private-healthcare-competitive-positioning-2025',
    reportType: 'competition-benchmarking',
  },
  {
    id: 'cbr-003',
    title: 'India Passenger EV Market — Top 5 OEM Benchmarking H2 2025',
    industry: 'Automotive & Transportation',
    region: 'India & South Asia',
    competitorSetSize: '3-5',
    publishedDate: '2025-10-08',
    pages: 124,
    methodology: ['hybrid'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80',
    description: 'Detailed benchmarking of Tata Motors, MG, Hyundai, BYD, and Mahindra in India EV passenger segment, covering range, charging ecosystem, after-sales, and brand perception.',
    slug: 'india-passenger-ev-oem-benchmarking-h2-2025',
    reportType: 'competition-benchmarking',
  },
  {
    id: 'cbr-004',
    title: 'SEA Digital Banking — Challenger vs Incumbent Benchmark 2025',
    industry: 'Banking & Financial Services',
    region: 'Southeast Asia',
    competitorSetSize: '10+',
    publishedDate: '2025-09-01',
    pages: 210,
    methodology: ['mystery-shopping', 'expert-interview'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80',
    description: 'Rigorous benchmarking of digital-first banks versus legacy incumbents across six SEA markets — onboarding UX, product breadth, fee transparency, and NPS.',
    slug: 'sea-digital-banking-challenger-incumbent-benchmark-2025',
    reportType: 'competition-benchmarking',
  },
  {
    id: 'cbr-005',
    title: 'India Quick Commerce — Top 6 Platform Benchmarking Q3 2025',
    industry: 'Consumer & Retail',
    region: 'India & South Asia',
    competitorSetSize: '5-10',
    publishedDate: '2025-08-14',
    pages: 96,
    methodology: ['mystery-shopping', 'public-data'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&q=80',
    description: 'Delivery time, assortment depth, pricing accuracy, and dark store density benchmarking across Blinkit, Zepto, Swiggy Instamart, BigBasket, Dunzo, and BBnow.',
    slug: 'india-quick-commerce-platform-benchmarking-q3-2025',
    reportType: 'competition-benchmarking',
  },
  {
    id: 'cbr-006',
    title: 'EU SaaS CRM Market — Competitive Intelligence Report 2025',
    industry: 'Technology & Telecom',
    region: 'Europe',
    competitorSetSize: '10+',
    publishedDate: '2025-07-28',
    pages: 164,
    methodology: ['public-data', 'expert-interview'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    description: 'In-depth feature-by-feature, pricing, and market share benchmarking of the top CRM vendors in Europe, with focus on Salesforce, HubSpot, Pipedrive, Zoho, and SAP.',
    slug: 'eu-saas-crm-competitive-intelligence-2025',
    reportType: 'competition-benchmarking',
  },
  {
    id: 'cbr-007',
    title: 'Africa Mobile Money — Top Operator Benchmarking Report 2025',
    industry: 'Banking & Financial Services',
    region: 'Africa',
    competitorSetSize: '5-10',
    publishedDate: '2025-06-10',
    pages: 138,
    methodology: ['hybrid'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?w=600&q=80',
    description: 'Revenue, subscriber base, ARPU, and product roadmap benchmarking of M-Pesa, Airtel Money, MTN MoMo, and four other leading mobile money operators across Sub-Saharan Africa.',
    slug: 'africa-mobile-money-operator-benchmarking-2025',
    reportType: 'competition-benchmarking',
  },
  {
    id: 'cbr-008',
    title: 'India EdTech — K-12 Segment Top 8 Brand Competitive Analysis 2025',
    industry: 'Education & Training',
    region: 'India & South Asia',
    competitorSetSize: '5-10',
    publishedDate: '2025-05-22',
    pages: 112,
    methodology: ['mystery-shopping', 'expert-interview'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
    description: "Benchmarking of BYJU's, Vedantu, Unacademy, PW, Classplus, and three others on content quality, pricing, teacher credentialing, and outcome metrics for K-12 learners.",
    slug: 'india-edtech-k12-brand-competitive-analysis-2025',
    reportType: 'competition-benchmarking',
  },
  {
    id: 'cbr-009',
    title: 'NA Cloud Hyperscaler — Enterprise Positioning Benchmark 2025',
    industry: 'Technology & Telecom',
    region: 'Americas',
    competitorSetSize: '3-5',
    publishedDate: '2025-04-30',
    pages: 190,
    methodology: ['public-data', 'expert-interview'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
    description: 'Enterprise positioning, pricing architecture, and ecosystem partner benchmarking of AWS, Azure, Google Cloud, and Oracle Cloud for large enterprise buyers in North America.',
    slug: 'na-cloud-hyperscaler-enterprise-benchmark-2025',
    reportType: 'competition-benchmarking',
  },
  {
    id: 'cbr-010',
    title: 'GCC Logistics — Last-Mile Delivery Providers Benchmark H1 2025',
    industry: 'Manufacturing',
    region: 'GCC & Middle East',
    competitorSetSize: '5-10',
    publishedDate: '2025-03-17',
    pages: 104,
    methodology: ['mystery-shopping', 'hybrid'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1565891741441-64926e441838?w=600&q=80',
    description: 'Delivery SLA compliance, cost-per-parcel, tracking accuracy, and reverse logistics benchmarking for seven major last-mile providers operating across the GCC.',
    slug: 'gcc-logistics-last-mile-benchmark-h1-2025',
    reportType: 'competition-benchmarking',
  },
  {
    id: 'cbr-011',
    title: 'India Real Estate — PropTech Platform Competitive Report 2025',
    industry: 'Public Sector',
    region: 'India & South Asia',
    competitorSetSize: '5-10',
    publishedDate: '2025-02-05',
    pages: 88,
    methodology: ['public-data', 'mystery-shopping'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
    description: 'Listing quality, agent experience, mortgage tie-ups, and monetization benchmarking of 99acres, MagicBricks, NoBroker, Housing.com, Squareyards, and PropTiger.',
    slug: 'india-realEstate-proptech-competitive-2025',
    reportType: 'competition-benchmarking',
  },
  {
    id: 'cbr-012',
    title: 'EU Streaming — SVOD Platform Benchmarking Q4 2024',
    industry: 'Media & Entertainment',
    region: 'Europe',
    competitorSetSize: '5-10',
    publishedDate: '2024-12-18',
    pages: 146,
    methodology: ['public-data', 'expert-interview'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&q=80',
    description: 'Subscriber growth, content library depth, localization investment, and churn benchmarking of Netflix, Disney+, Prime Video, Apple TV+, Max, and Paramount+ in Europe.',
    slug: 'eu-streaming-svod-benchmarking-q4-2024',
    reportType: 'competition-benchmarking',
  },
  {
    id: 'cbr-013',
    title: 'India Telecom — 5G Rollout & Enterprise Services Benchmark 2024',
    industry: 'Technology & Telecom',
    region: 'India & South Asia',
    competitorSetSize: '3-5',
    publishedDate: '2024-11-25',
    pages: 132,
    methodology: ['hybrid', 'expert-interview'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1583508805133-8fd03e064e08?w=600&q=80',
    description: 'Network coverage, 5G speed, B2B enterprise bundle, and spectrum efficiency benchmarking of Jio, Airtel, BSNL, and Vi across top 50 Indian cities.',
    slug: 'india-telecom-5g-enterprise-benchmark-2024',
    reportType: 'competition-benchmarking',
  },
  {
    id: 'cbr-014',
    title: 'LatAm E-commerce — Top Platform Competitive Landscape 2024',
    industry: 'Consumer & Retail',
    region: 'Americas',
    competitorSetSize: '5-10',
    publishedDate: '2024-10-14',
    pages: 118,
    methodology: ['public-data', 'mystery-shopping'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&q=80',
    description: 'GMV, seller base, logistics infrastructure, and payment ecosystem benchmarking of MercadoLibre, Amazon LatAm, Shopee, Falabella, Rappi, and Americanas.',
    slug: 'latam-ecommerce-platform-competitive-2024',
    reportType: 'competition-benchmarking',
  },
  {
    id: 'cbr-015',
    title: 'SEA Renewable Energy — Solar Developers Benchmark 2024',
    industry: 'Energy & Utilities',
    region: 'Southeast Asia',
    competitorSetSize: '5-10',
    publishedDate: '2024-09-02',
    pages: 156,
    methodology: ['expert-interview', 'public-data'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
    description: 'Installed capacity, project pipeline, tariff competitiveness, and financing strategy benchmarking of the top solar developers in Southeast Asia.',
    slug: 'sea-renewable-solar-developers-benchmark-2024',
    reportType: 'competition-benchmarking',
  },
  {
    id: 'cbr-016',
    title: 'India FMCG — Premium Personal Care Segment Benchmarking 2024',
    industry: 'Consumer & Retail',
    region: 'India & South Asia',
    competitorSetSize: '10+',
    publishedDate: '2024-08-19',
    pages: 172,
    methodology: ['mystery-shopping', 'hybrid'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80',
    description: 'Distribution reach, shelf placement, in-store activation, and digital spend benchmarking across 12 premium personal care brands competing in urban India.',
    slug: 'india-fmcg-premium-personal-care-benchmark-2024',
    reportType: 'competition-benchmarking',
  },
  {
    id: 'cbr-017',
    title: 'NA Insurance — Digital-First Insurtech Benchmark Report 2024',
    industry: 'Banking & Financial Services',
    region: 'Americas',
    competitorSetSize: '10+',
    publishedDate: '2024-07-10',
    pages: 194,
    methodology: ['public-data', 'mystery-shopping', 'expert-interview'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
    description: 'Underwriting speed, claim settlement NPS, pricing algorithm transparency, and distribution model benchmarking across 11 leading insurtech players in North America.',
    slug: 'na-insurance-insurtech-benchmark-2024',
    reportType: 'competition-benchmarking',
  },
  {
    id: 'cbr-018',
    title: 'GCC Hospitality — Luxury Hotel Chain Benchmarking 2024',
    industry: 'Consumer & Retail',
    region: 'GCC & Middle East',
    competitorSetSize: '5-10',
    publishedDate: '2024-06-25',
    pages: 108,
    methodology: ['mystery-shopping', 'expert-interview'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
    description: 'Guest experience, loyalty program value, F&B quality, and digital concierge benchmarking of the top luxury hotel chains operating in Saudi Arabia and UAE.',
    slug: 'gcc-hospitality-luxury-hotel-benchmarking-2024',
    reportType: 'competition-benchmarking',
  },
  {
    id: 'cbr-019',
    title: 'India Logistics — B2B Express Freight Carriers Benchmark 2024',
    industry: 'Manufacturing',
    region: 'India & South Asia',
    competitorSetSize: '5-10',
    publishedDate: '2024-05-13',
    pages: 120,
    methodology: ['hybrid'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80',
    description: 'Transit time reliability, damage rate, invoicing accuracy, and network density benchmarking across Blue Dart, Delhivery, DTDC, Ecom Express, Xpressbees, and Shadowfax.',
    slug: 'india-logistics-b2b-express-freight-benchmark-2024',
    reportType: 'competition-benchmarking',
  },
  {
    id: 'cbr-020',
    title: 'Africa Agritech — Input Suppliers Competitive Analysis 2024',
    industry: 'Education & Training',
    region: 'Africa',
    competitorSetSize: '5-10',
    publishedDate: '2024-04-07',
    pages: 94,
    methodology: ['expert-interview', 'public-data'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&q=80',
    description: 'Product availability, credit access, last-mile delivery, and digital advisory benchmarking across agritech input suppliers serving smallholder farmers in East and West Africa.',
    slug: 'africa-agritech-input-suppliers-analysis-2024',
    reportType: 'competition-benchmarking',
  },
  {
    id: 'cbr-021',
    title: 'EU Automotive — EV Charging Infrastructure Operators Benchmark 2024',
    industry: 'Automotive & Transportation',
    region: 'Europe',
    competitorSetSize: '5-10',
    publishedDate: '2024-03-21',
    pages: 160,
    methodology: ['mystery-shopping', 'public-data'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    description: 'Charging network density, session reliability, pricing transparency, and interoperability benchmarking of Ionity, Shell Recharge, Fastned, Allego, and ChargePoint in Europe.',
    slug: 'eu-automotive-ev-charging-infrastructure-benchmark-2024',
    reportType: 'competition-benchmarking',
  },
  {
    id: 'cbr-022',
    title: 'India Healthcare — Diagnostic Chain Benchmarking Report 2024',
    industry: 'Healthcare',
    region: 'India & South Asia',
    competitorSetSize: '5-10',
    publishedDate: '2024-02-14',
    pages: 136,
    methodology: ['mystery-shopping', 'expert-interview'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80',
    description: 'TAT for reports, sample collection experience, digital report delivery, pricing, and geographic reach benchmarking of Dr. Lal PathLabs, Thyrocare, Metropolis, SRL, and CORE Diagnostics.',
    slug: 'india-healthcare-diagnostic-chain-benchmark-2024',
    reportType: 'competition-benchmarking',
  },
  {
    id: 'cbr-023',
    title: 'SEA Ride-Hailing — Super App Competitive Positioning 2023',
    industry: 'Technology & Telecom',
    region: 'Southeast Asia',
    competitorSetSize: '3-5',
    publishedDate: '2023-11-30',
    pages: 142,
    methodology: ['mystery-shopping', 'public-data'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    description: 'Driver supply economics, pricing algorithms, loyalty program depth, and fintech integration benchmarking of Grab, Gojek, Shopee, and Sea Group across SEA.',
    slug: 'sea-ride-hailing-super-app-positioning-2023',
    reportType: 'competition-benchmarking',
  },
  {
    id: 'cbr-024',
    title: 'India Real Estate — Affordable Housing Developers Benchmark 2023',
    industry: 'Public Sector',
    region: 'India & South Asia',
    competitorSetSize: '10+',
    publishedDate: '2023-10-18',
    pages: 102,
    methodology: ['expert-interview', 'hybrid'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
    description: 'RERA compliance score, construction quality index, handover timelines, and buyer financing support benchmarking across 10+ affordable housing developers in Tier 1 and 2 India cities.',
    slug: 'india-realEstate-affordable-housing-benchmark-2023',
    reportType: 'competition-benchmarking',
  },
];

// Derived filter options
// TODO: replace w/ real API — GET /api/benchmarks/facets

/**
 * Ken Research industry catalog — sourced from report-store-v07/data.ts
 * 14 industries. Full names (display + selection key are identical).
 */
export const INDUSTRIES = [
  'Healthcare',
  'Technology & Telecom',
  'Banking & Financial Services',
  'Energy & Utilities',
  'Consumer & Retail',
  'Manufacturing',
  'Automotive & Transportation',
  'Food & Beverage',
  'Education & Training',
  'Defense & Security',
  'Agriculture',
  'Media & Entertainment',
  'Mining & Chemicals',
  'Public Sector',
] as const;

/**
 * Ken Research region groupings — sourced from report-store-v07/data.ts geographyData.
 * 6 regions w/ countries per region.
 */
export const REGIONS = [
  'GCC & Middle East',
  'India & South Asia',
  'Southeast Asia',
  'Europe',
  'Americas',
  'Africa',
] as const;

/**
 * Ken country catalog (per region). Sidebar surfaces all countries flat;
 * region+country are independent filters (selecting both narrows further).
 */
export const COUNTRIES_BY_REGION: Record<string, string[]> = {
  'GCC & Middle East': ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait'],
  'India & South Asia': ['India', 'Bangladesh', 'Sri Lanka'],
  'Southeast Asia': ['Singapore', 'Indonesia', 'Malaysia', 'Thailand'],
  'Europe': ['UK', 'Germany', 'France', 'Netherlands'],
  'Americas': ['USA', 'Canada', 'Brazil', 'Mexico'],
  'Africa': ['Nigeria', 'South Africa', 'Kenya', 'Egypt'],
};

export const COUNTRIES = Object.values(COUNTRIES_BY_REGION).flat();

/**
 * Ken trending tag catalog — sourced from report-store-v07/data.ts trendingTopics.
 * Used as cross-cutting tag filter (independent of industry).
 */
export const TAGS = [
  'Artificial Intelligence',
  'Electric Vehicles',
  'Quick Commerce',
  'Green Hydrogen',
  'Digital Payments',
  'Telemedicine',
  'Cloud Computing',
  'Cybersecurity',
  'Renewable Energy',
  'Supply Chain Tech',
] as const;

export const COMPETITOR_SET_SIZES = ['3-5', '5-10', '10+'] as const;

export const METHODOLOGY_LABELS: Record<string, string> = {
  'mystery-shopping': 'Mystery shopping',
  'expert-interview': 'Expert interview',
  'public-data': 'Public data scrape',
  'hybrid': 'Hybrid',
};

export type PageRange = 'under100' | '100to200' | '200to400' | '400plus';

export const PAGE_RANGES: { value: PageRange; label: string; min: number; max: number }[] = [
  { value: 'under100', label: 'Under 100 pages', min: 0, max: 99 },
  { value: '100to200', label: '100–200 pages', min: 100, max: 200 },
  { value: '200to400', label: '201–400 pages', min: 201, max: 400 },
  { value: '400plus', label: '400+ pages', min: 401, max: Number.MAX_SAFE_INTEGER },
];

export function pagesToRange(pages: number): PageRange {
  if (pages < 100) return 'under100';
  if (pages <= 200) return '100to200';
  if (pages <= 400) return '200to400';
  return '400plus';
}

export const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'industry-az', label: 'Industry A-Z' },
  { value: 'most-pages', label: 'Most pages' },
  { value: 'trending', label: 'Trending' },
] as const;

export type SortOption = typeof SORT_OPTIONS[number]['value'];

/**
 * Derive country from report title + region. Mock-only — real API would have country field.
 * Returns first matching country mention in title; falls back to first country of region.
 */
export function deriveCountry(r: BenchmarkReport): string {
  if (r.country) return r.country;
  const t = r.title.toLowerCase();
  for (const c of COUNTRIES) {
    if (t.includes(c.toLowerCase())) return c;
  }
  // Map title prefix shorthands → country
  if (t.startsWith('india')) return 'India';
  if (t.startsWith('gcc')) return 'UAE';
  if (t.startsWith('sea ')) return 'Singapore';
  if (t.startsWith('eu ')) return 'Germany';
  if (t.startsWith('na ')) return 'USA';
  if (t.startsWith('africa ')) return 'Nigeria';
  // Fallback: first country in region
  return COUNTRIES_BY_REGION[r.region]?.[0] ?? '';
}

/**
 * Derive tags from report title + industry mapping. Mock-only — real API would have tags field.
 */
export function deriveTags(r: BenchmarkReport): string[] {
  if (r.tags && r.tags.length) return r.tags;
  const t = r.title.toLowerCase();
  const matched: string[] = [];
  for (const tag of TAGS) {
    if (t.includes(tag.toLowerCase())) matched.push(tag);
  }
  // Heuristic mappings by content hint
  if (/\bev\b|electric vehicle/.test(t) && !matched.includes('Electric Vehicles')) matched.push('Electric Vehicles');
  if (/quick commerce|q-?commerce/.test(t) && !matched.includes('Quick Commerce')) matched.push('Quick Commerce');
  if (/cloud|hyperscaler|aws|azure/.test(t) && !matched.includes('Cloud Computing')) matched.push('Cloud Computing');
  if (/\bai\b|artificial intelligence/.test(t) && !matched.includes('Artificial Intelligence')) matched.push('Artificial Intelligence');
  if (/digital banking|payments|mobile money/.test(t) && !matched.includes('Digital Payments')) matched.push('Digital Payments');
  if (/solar|renewable|hydrogen/.test(t) && !matched.includes('Renewable Energy')) matched.push('Renewable Energy');
  return matched;
}

/**
 * Derive live facet counts for each filter dimension.
 * Each dimension is counted against all OTHER active filters (exclude itself).
 */
export function computeFacetCounts(
  allReports: BenchmarkReport[],
  filters: {
    industries: string[];
    regions: string[];
    countries: string[];
    tags: string[];
    competitorSetSizes: string[];
    methodologies: string[];
    years: string[];
    pageRanges: string[];
  }
) {
  const matchExcept = (r: BenchmarkReport, except: 'industry' | 'region' | 'country' | 'tag' | 'competitorSetSize' | 'methodology' | 'year' | 'pageRange') => {
    if (except !== 'industry' && filters.industries.length > 0 && !filters.industries.includes(r.industry)) return false;
    if (except !== 'region' && filters.regions.length > 0 && !filters.regions.includes(r.region)) return false;
    if (except !== 'country' && filters.countries.length > 0 && !filters.countries.includes(deriveCountry(r))) return false;
    if (except !== 'tag' && filters.tags.length > 0 && !filters.tags.some((t) => deriveTags(r).includes(t))) return false;
    if (except !== 'competitorSetSize' && filters.competitorSetSizes.length > 0 && !filters.competitorSetSizes.includes(r.competitorSetSize)) return false;
    if (except !== 'methodology' && filters.methodologies.length > 0 && !filters.methodologies.some((m) => r.methodology.includes(m as BenchmarkReport['methodology'][number]))) return false;
    if (except !== 'year' && filters.years.length > 0 && !filters.years.includes(r.publishedDate.slice(0, 4))) return false;
    if (except !== 'pageRange' && filters.pageRanges.length > 0 && !filters.pageRanges.includes(pagesToRange(r.pages))) return false;
    return true;
  };

  const industryCounts: Record<string, number> = {};
  for (const ind of INDUSTRIES) {
    industryCounts[ind] = allReports.filter((r) => r.industry === ind && matchExcept(r, 'industry')).length;
  }

  const regionCounts: Record<string, number> = {};
  for (const reg of REGIONS) {
    regionCounts[reg] = allReports.filter((r) => r.region === reg && matchExcept(r, 'region')).length;
  }

  const countryCounts: Record<string, number> = {};
  for (const c of COUNTRIES) {
    countryCounts[c] = allReports.filter((r) => deriveCountry(r) === c && matchExcept(r, 'country')).length;
  }

  const tagCounts: Record<string, number> = {};
  for (const tag of TAGS) {
    tagCounts[tag] = allReports.filter((r) => deriveTags(r).includes(tag) && matchExcept(r, 'tag')).length;
  }

  const sizeCounts: Record<string, number> = {};
  for (const sz of COMPETITOR_SET_SIZES) {
    sizeCounts[sz] = allReports.filter((r) => r.competitorSetSize === sz && matchExcept(r, 'competitorSetSize')).length;
  }

  const methodologyCounts: Record<string, number> = {};
  for (const method of Object.keys(METHODOLOGY_LABELS)) {
    methodologyCounts[method] = allReports.filter((r) => r.methodology.includes(method as BenchmarkReport['methodology'][number]) && matchExcept(r, 'methodology')).length;
  }

  const yearCounts: Record<string, number> = {};
  const allYears = [...new Set(allReports.map((r) => r.publishedDate.slice(0, 4)))].sort((a, b) => b.localeCompare(a));
  for (const yr of allYears) {
    yearCounts[yr] = allReports.filter((r) => r.publishedDate.startsWith(yr) && matchExcept(r, 'year')).length;
  }

  const pageRangeCounts: Record<string, number> = {};
  for (const pr of PAGE_RANGES) {
    pageRangeCounts[pr.value] = allReports.filter((r) => pagesToRange(r.pages) === pr.value && matchExcept(r, 'pageRange')).length;
  }

  return { industryCounts, regionCounts, countryCounts, tagCounts, sizeCounts, methodologyCounts, yearCounts, pageRangeCounts, allYears };
}
