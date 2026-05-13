/**
 * mock-data.ts — Nav structural data (single source of truth)
 *
 * All nav link labels, hrefs, and copy live here.
 * Auth state is in-memory prototype (AuthContext.tsx) — no persistent backend.
 *
 * TODO: replace w/ real API or CMS
 * - Nav links → could come from a CMS or static config JSON served by Next.js
 * - Industries list → /api/industries (Django backend)
 * - Report types/counts (e.g. "10 Lac+ Reports") → /api/stats or hardcoded in CMS
 *
 * Replace strategy:
 *   getIndustriesNav()  → fetch('/api/industries')
 *   getConsultingNav()  → fetch('/api/nav/consulting')
 *   getReportsNav()     → fetch('/api/nav/reports')
 *   getInsightsNav()    → fetch('/api/nav/insights')
 *   getSurveysNav()     → fetch('/api/nav/surveys')
 */

// ─── PRIMARY NAV ITEMS ───────────────────────────────────────────────────────
// TODO: replace w/ CMS-driven nav config

export const PRIMARY_NAV_ITEMS = [
  { id: 'reports', label: 'Reports' },
  { id: 'industries', label: 'Industries' },
  { id: 'survey', label: 'Surveys' },
  { id: 'consulting', label: 'Consulting' },
  { id: 'insights', label: 'Insights' },
] as const;

// ─── SECONDARY BAR LINKS ─────────────────────────────────────────────────────
// TODO: replace w/ CMS-driven nav config

export const SECONDARY_NAV_LINKS = [
  { label: 'Procurement Intelligence', href: '/procurement' },
  { label: 'Expert Panel', href: '/expert-panel' },
] as const;

// ─── REPORTS DROPDOWN ────────────────────────────────────────────────────────
// TODO: replace w/ /api/nav/reports

export const REPORTS_BROWSE_LINKS = [
  { label: 'Browse All Reports', href: '/reports' },
  { label: 'By Industry', href: '/reports/by-industry' },
  { label: 'By Region', href: '/reports/by-region' },
  { label: 'Latest Reports', href: '/reports/latest' },
  { label: 'Syndicated Reports', href: '/reports/syndicated' },
  { label: 'Custom Research', href: '/reports/custom' },
  { label: 'Country Level Reports', href: '/reports/country-level' },
] as const;

export const REPORTS_TYPE_LINKS = [
  { label: 'Industry Reports', href: '/reports/industry' },
  { label: 'Global Reports', href: '/reports/global' },
  { label: 'Regional Reports', href: '/reports/regional' },
  { label: 'Competition Benchmarking', href: '/benchmarking' },
] as const;

export const REPORTS_BENCHMARKING_LINKS = [
  { label: 'By Industry', href: '/benchmarking/industry' },
  { label: 'By Region', href: '/benchmarking/region' },
  { label: 'Our Methodology', href: '/benchmarking/methodology' },
] as const;

export const REPORTS_CTA_LINKS = [
  { label: 'Request On Demand', href: '/custom-research' },
  { label: 'Talk to Analyst', href: '/talk-to-analyst' },
] as const;

// ─── CONSULTING DROPDOWN ─────────────────────────────────────────────────────
// TODO: replace w/ /api/nav/consulting

export const CONSULTING_CAPABILITIES = [
  { id: 'strategy-consulting', label: 'Strategy Consulting' },
  { id: 'deals-ipo-advisory', label: 'Deals & IPO Advisory' },
] as const;

export const CONSULTING_SERVICES: Record<string, { title: string; services: { name: string; url: string }[] }> = {
  'strategy-consulting': {
    title: 'Strategy Consulting',
    services: [
      { name: 'Market Entry', url: '/consulting/strategy/market-entry' },
      { name: 'Market Penetration', url: '/consulting/strategy/market-penetration' },
      { name: 'Product Strategy', url: '/consulting/strategy/product-strategy' },
      { name: 'Startup Acceleration Strategy', url: '/consulting/strategy/startup-acceleration' },
    ],
  },
  'deals-ipo-advisory': {
    title: 'Deals & IPO Advisory',
    services: [
      { name: 'IPO Advisory', url: '/consulting/deals/ipo-advisory' },
      { name: 'Deal Sourcing', url: '/consulting/deals/deal-sourcing' },
      { name: 'Due Diligence', url: '/consulting/deals/due-diligence' },
      { name: 'Investor Relations', url: '/consulting/deals/investor-relations' },
    ],
  },
};

export const CONSULTING_PUBLICATIONS = [
  { label: 'Client Impact', href: '/publications/client-impact' },
  { label: 'Deal Spotlight', href: '/publications/deal-spotlight' },
  { label: 'Articles', href: '/publications/articles' },
  { label: 'Perspective', href: '/publications/perspective' },
] as const;

// ─── INDUSTRIES DATA ─────────────────────────────────────────────────────────
// Full list in src/data/industries.tsx (lucide icons require TSX — kept there)
// TODO: replace w/ /api/industries (returns id, label, segments, popularTopics)

export const INDUSTRIES_QUICK_ACCESS = [
  { href: '/industries/reports', title: 'Industry Reports' },
  { href: '/industries/benchmarking', title: 'Benchmarking' },
  { href: '/industries/insights', title: 'Insights' },
] as const;

// ─── AUTH STATE ──────────────────────────────────────────────────────────────
// Prototype: in-memory only (AuthContext.tsx)
// TODO: replace w/ NextAuth / Django session API
// - isAuthenticated → session cookie / JWT
// - UserProfile → GET /api/users/me
// - login/logout → POST /api/auth/login, /api/auth/logout (or NextAuth handlers)

export const AUTH_MOCK_NOTE = 'In-memory prototype. No persistence. See src/app/context/AuthContext.tsx';
