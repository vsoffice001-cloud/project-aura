'use client';

/**
 * /sample — Sample Report PDP Page
 *
 * WHY: Proves the DS Doc-first methodology works end-to-end. Composes 14 sections
 *      using core-v2 organisms + new DummyHeader/DummyFooter atoms. No real data.
 *      Tech team replaces mock data + console.log placeholders post-handover.
 *
 * WHAT: 14-section Report PDP (V0.2 recipe canonical order) + Header + Footer.
 *       Alternating white/warm-grey bg per recipe (odd=white · even=grey-50 · §14=red gradient).
 *       Each section: 3-element chapter intro (SectionLabel · SectionHeading · body paragraph).
 *
 * WHEN: Development/demo only. Replace with real report slug route (/reports/[slug]).
 *
 * WHERE: /sample route in reports-pdp-v2 Next.js app.
 *
 * HOW: Mock data inline — marked // TODO: replace w/ real API.
 *
 * @see design-system-audit/worked-examples/v02-for-design-system/report-pdp-anatomy.md
 */

// ── Mock data (TODO: replace w/ real API) ─────────────────────────────────
// TODO: replace w/ real API — /api/reports/[slug] (Django DRF)
const MOCK_REPORT = {
  title: 'Sample Market Outlook 2024–2030',
  subtitle: 'Comprehensive analysis of production, demand, pricing dynamics, and competitive landscape across key regions.',
  market: 'Sample Agri-Tech Market',
  region: 'Asia-Pacific & MENA',
  baseYear: 2024,
  forecastYear: 2030,
  pages: 180,
  stats: [
    { value: '$3.8B',  label: 'Market size 2024' },
    { value: '9.2%',  label: 'CAGR 2024–2030' },
    { value: '22',    label: 'Key players tracked' },
    { value: '180+',  label: 'Pages of analysis' },
  ],
};

// TODO: replace w/ real API — /api/segments
const MOCK_SEGMENTS = [
  { title: 'By Product Type', description: 'Conventional · Organic · Hybrid varieties across 6 sub-categories.' },
  { title: 'By End-Use',      description: 'Food Processing · Retail · HoReCa · Export & Re-export.' },
  { title: 'By Region',       description: 'India · UAE · Qatar · Indonesia · Saudi Arabia · Rest of MENA.' },
  { title: 'By Channel',      description: 'Direct Farm · Wholesale · Modern Trade · E-commerce.' },
  { title: 'By Pack Size',    description: 'Bulk (>5 kg) · Retail (<5 kg) · Premium packaged.' },
  { title: 'By Customer Segment', description: 'Enterprise Procurement · SME Buyers · Individual Consumers.' },
  { title: 'By Price Tier',   description: 'Economy · Standard · Premium · Ultra-Premium.' },
];

// TODO: replace w/ real API — /api/reports/[slug]/competitors
const MOCK_COMPETITORS = [
  { name: 'AlphaGrow Corp',   share: '18%', hq: 'Singapore' },
  { name: 'BetaFarms Ltd',    share: '14%', hq: 'India' },
  { name: 'GammaTech Agri',   share: '11%', hq: 'UAE' },
  { name: 'DeltaGreen Inc',   share: '9%',  hq: 'Saudi Arabia' },
  { name: 'EpsilonHarvest',   share: '7%',  hq: 'Indonesia' },
];

// TODO: replace w/ real API — /api/reports/[slug]/faqs
const MOCK_FAQS = [
  { id: 'faq-1', question: 'What is the base year for this report?',           answer: 'The base year for data is 2024, with historical data from 2019–2023 and forecasts through 2030.' },
  { id: 'faq-2', question: 'Which regions are covered?',                        answer: 'Asia-Pacific (India, Indonesia, Vietnam, Thailand) and MENA (UAE, Saudi Arabia, Qatar, Oman) are primary regions.' },
  { id: 'faq-3', question: 'Can I get a custom segment analysis?',              answer: 'Yes. Contact our analyst team for bespoke segmentation and primary research overlays.' },
  { id: 'faq-4', question: 'Is the data sourced from primary research?',        answer: 'Our methodology combines primary interviews (40+ stakeholders per report) with secondary source triangulation.' },
  { id: 'faq-5', question: 'How is this report delivered?',                     answer: 'PDF + Excel data appendix within 24 hours of purchase. Editable PowerPoint available on request.' },
  { id: 'faq-6', question: 'What analyst support is included?',                 answer: '30-minute free analyst briefing within 6 months of purchase. Additional hours billed separately.' },
];

// TODO: replace w/ real API — /api/reports/related?reportId=...
const MOCK_RELATED = [
  { id: 'rel-1', title: 'MENA Fresh Produce Market 2024–2030',      price: '$3,200', cagr: '8.4%',  image: 'https://picsum.photos/seed/rel1/640/360', industry: 'Agriculture', region: 'MENA',         date: 'Apr 2024', projection: '8.4% CAGR' },
  { id: 'rel-2', title: 'Asia-Pacific Organic Food Market Report',  price: '$2,900', cagr: '11.2%', image: 'https://picsum.photos/seed/rel2/640/360', industry: 'Food & Bev',  region: 'Asia-Pacific', date: 'Mar 2024', projection: '11.2% CAGR' },
  { id: 'rel-3', title: 'GCC Food Safety Regulatory Landscape',     price: '$2,500', cagr: 'N/A',   image: 'https://picsum.photos/seed/rel3/640/360', industry: 'Regulatory',  region: 'GCC',          date: 'Feb 2024', projection: undefined },
];

// TODO: replace w/ real API — /api/reports/[slug]/methodology
const MOCK_METHODOLOGY_STEPS = [
  { number: '01', title: 'Secondary Research',   description: 'Aggregation of 200+ industry publications, trade databases, regulatory filings, and company annual reports.' },
  { number: '02', title: 'Primary Interviews',   description: '40+ structured interviews with producers, distributors, buyers, and regulatory experts across key markets.' },
  { number: '03', title: 'Data Triangulation',   description: 'Cross-validation of primary and secondary data via proprietary triangulation model with confidence intervals.' },
  { number: '04', title: 'Peer Review & QA',     description: 'Two-stage internal review by senior analysts and external advisory panel before publication.' },
];

// TODO: replace w/ real API — /api/reports/[slug]/toc
const MOCK_TOC = [
  'Market Overview', 'Scope of Report', 'Market Analysis', 'Market Data Table',
  'Segmentation', 'Regional Comparison', 'Growth Drivers & Challenges',
  'Competitive Landscape', 'Table of Contents', 'Target Audience',
  'Research Methodology', 'FAQ', 'Related Reports',
];

// ── Page component ────────────────────────────────────────────────────────
import { DummyHeader, DummyFooter, FAQSection, MethodologySection } from '@kenresearch/design-system/organisms';
import { SectionWrapper, SectionHeading, SectionLabel, Button, HeroBackground, CTABackground } from '@kenresearch/design-system/atoms';
import { StatCard, ReportCard } from '@kenresearch/design-system/molecules';
import { FileText } from 'lucide-react';

export default function SamplePDPPage() {
  return (
    <>
      <DummyHeader />

      <main id="main-content">

        {/* ── §1 — Hero (cinematic dark · H1 · split layout) ────────────────
            bg: cinematic-dark (breaks white/warm alternation at top — intentional)
        ──────────────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="hero-heading"
          className="relative overflow-hidden"
          style={{
            padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 5rem)',
          }}
        >
          {/* Canonical hero bg composition · multi-blob glow stack · variant=darkPremium (cinematic) */}
          <HeroBackground variant="darkPremium" className="absolute inset-0" />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--container-page)', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start' }}>
              {/* Left narrative + stats */}
              <div style={{ flex: '1 1 520px', minWidth: 0 }}>
                <div className="mb-4">
                  <SectionLabel background="dark" variant="accent" pulse>
                    Report Available — {MOCK_REPORT.region} {MOCK_REPORT.baseYear}–{MOCK_REPORT.forecastYear}
                  </SectionLabel>
                </div>
                {/* H1: tracking-[-0.02em] per COMPOSITION_GRAMMAR §7 Hero title spec */}
                <h1
                  id="hero-heading"
                  className="tracking-[-0.02em] font-light mb-6"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.75rem, 4vw, var(--typography-size-3xl))',
                    lineHeight: 1.1,
                    color: 'var(--variant-cinematic-text-primary)',
                  }}
                >
                  {MOCK_REPORT.title}
                </h1>
                <p
                  className="leading-relaxed mb-8"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--typography-size-sm)',
                    color: 'rgba(250,250,250,0.70)',
                    maxWidth: 'var(--container-prose)',
                  }}
                >
                  {MOCK_REPORT.subtitle}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }} className="mb-10">
                  <Button
                    variant="brand"
                    size="lg"
                    animatedArrow
                    onClick={() => console.log('// TODO: tech team wires Get Full Access')}
                  >
                    Get Full Access
                  </Button>
                  <Button
                    variant="ghost"
                    background="dark"
                    size="lg"
                    icon={<FileText size={16} />}
                    onClick={() => console.log('// TODO: tech team wires Request Custom Report')}
                  >
                    Request Custom Report
                  </Button>
                </div>

                {/* StatCard grid — moved here · 3-col layout */}
                <div className="grid grid-cols-3 gap-4 sm:gap-6">
                  {MOCK_REPORT.stats.map((stat, idx) => (
                    <StatCard
                      key={stat.label}
                      value={stat.value}
                      label={stat.label}
                      color="var(--color-accent-purple)"
                      surface="dark"
                      delay={idx * 0.1}
                      animate={true}
                    />
                  ))}
                </div>
                <div
                  style={{
                    marginTop: 'var(--space-xl)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--typography-size-xs)',
                    color: 'rgba(250,250,250,0.40)',
                  }}
                >
                  Published Q2 2024 · Updated monthly
                </div>
              </div>
            </div>
          </div>

          {/* Scroll-down indicator */}
          <a
            href="#chapter-1"
            aria-label="Scroll to first chapter"
            className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/60 hover:text-white transition-colors motion-safe:animate-bounce"
          >
            <span className="text-[var(--typography-size-2xs)] uppercase tracking-[0.2em]">Scroll</span>
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none" aria-hidden="true">
              <rect x="0.5" y="0.5" width="11" height="19" rx="5.5" stroke="currentColor"/>
              <circle cx="6" cy="6" r="2" fill="currentColor"/>
            </svg>
          </a>
        </section>

        {/* ── §1 (continuation) — Market Overview · bg white ────────────────── */}
        <SectionWrapper background="white" spacing="lg" maxWidth="content" id="market-overview">
          <div className="mb-10">
            <SectionLabel variant="accent">CHAPTER 1 — MARKET OVERVIEW</SectionLabel>
            <SectionHeading
              level={2}
              title="Market overview & outlook"
              subtitle={`${MOCK_REPORT.market} — ${MOCK_REPORT.baseYear} baseline to ${MOCK_REPORT.forecastYear} forecast`}
            />
          </div>
          <p
            className="leading-relaxed"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--typography-size-sm)',
              color: 'rgba(0,0,0,0.70)',
              maxWidth: 'var(--container-prose)',
            }}
          >
            The {MOCK_REPORT.market} reached a valuation of $3.8B in {MOCK_REPORT.baseYear},
            driven by rising demand from food processing, e-commerce channels, and premium retail.
            This section covers historical growth (2019–2023), current market structure, and
            our base-case forecast trajectory through {MOCK_REPORT.forecastYear}.
          </p>
          <div
            className="mt-10 grid gap-4"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}
          >
            {['2019: $2.1B', '2021: $2.7B', '2023: $3.2B', '2024E: $3.8B', '2027F: $5.1B', '2030F: $6.5B'].map(item => (
              <div
                key={item}
                className="rounded-[var(--radius-card)] shadow-[var(--shadow-sm)]"
                style={{
                  padding: 'var(--space-lg)',
                  background: 'var(--color-ramp-warm-200)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--typography-size-sm)',
                  fontWeight: 600,
                  color: 'var(--color-foundation-black)',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* ── §2 — Scope of Report · bg white ───────────────────────────────── */}
        <SectionWrapper background="white" spacing="lg" maxWidth="content" id="scope">
          <div className="mb-10">
            <SectionLabel variant="accent">CHAPTER 2 — SCOPE OF REPORT</SectionLabel>
            <SectionHeading
              level={2}
              title="What this report covers"
              subtitle="Comprehensive boundaries across products, geographies, and channels"
            />
          </div>
          <p
            className="leading-relaxed"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--typography-size-sm)',
              color: 'rgba(0,0,0,0.70)',
              maxWidth: 'var(--container-prose)',
            }}
          >
            The scope of this study encompasses market analysis at the country and regional
            cluster level, covering 14 markets across {MOCK_REPORT.region}. All segments
            listed in Chapter 5 are included with quantitative sizing and qualitative commentary.
          </p>
          <div
            className="mt-10 grid gap-4"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
          >
            {['Product scope', 'Geographic coverage', 'Channel coverage', 'Customer segments', 'Time horizon', 'Exclusions'].map(item => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-[var(--radius-card)] shadow-[var(--shadow-sm)]"
                style={{
                  padding: 'var(--space-lg)',
                  background: 'var(--color-foundation-white)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--typography-size-sm)',
                  color: 'var(--color-foundation-black)',
                }}
              >
                <span
                  className="shrink-0 rounded-full"
                  style={{
                    width: '8px',
                    height: '8px',
                    background: 'var(--color-brand-red)',
                  }}
                  aria-hidden="true"
                />
                {item}
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* ── §3 — Market Analysis · bg white ──────────────────────────────── */}
        <SectionWrapper background="white" spacing="lg" maxWidth="content" id="market-analysis">
          <div className="mb-10">
            <SectionLabel variant="accent">CHAPTER 3 — MARKET ANALYSIS</SectionLabel>
            <SectionHeading
              level={2}
              title="Market analysis & key data"
              subtitle="CAGR, value chain, demand drivers, and price trends 2019–2030"
            />
          </div>
          <p
            className="leading-relaxed"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--typography-size-sm)',
              color: 'rgba(0,0,0,0.70)',
              maxWidth: 'var(--container-prose)',
            }}
          >
            This chapter provides the core quantitative backbone of the report: market size
            by value and volume, growth rate decomposition, price trend analysis, and
            value-chain economics from farm gate to end consumer.
          </p>
          <div
            aria-label="Chart placeholder — replace with Highcharts component"
            className="mt-10 flex items-center justify-center rounded-[var(--radius-card)]"
            style={{
              height: '280px',
              background: 'var(--color-ramp-warm-200)',
              boxShadow: 'var(--shadow-card-hover-soft)',
              border: '1px solid var(--color-ramp-warm-500)',
            }}
          >
            <p
              className="uppercase tracking-[0.2em]"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--typography-size-xs)',
                color: 'var(--color-foundation-black-500)',
              }}
            >
              {/* TODO: replace w/ Highcharts market-size bar chart */}
              Chart · Market Size 2019–2030 · placeholder
            </p>
          </div>
        </SectionWrapper>

        {/* ── §4 — Market Data Table · bg white ─────────────────────────────── */}
        <SectionWrapper background="white" spacing="lg" maxWidth="content" id="data-table">
          <div className="mb-10">
            <SectionLabel variant="accent">CHAPTER 4 — MARKET DATA</SectionLabel>
            <SectionHeading
              level={2}
              title="Market data table"
              subtitle="Region × year matrix — value ($B) and volume (000 MT)"
            />
          </div>
          <p
            className="leading-relaxed"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--typography-size-sm)',
              color: 'rgba(0,0,0,0.70)',
              maxWidth: 'var(--container-prose)',
            }}
          >
            The table below presents annual market size estimates by region for the full
            forecast period. All values in USD billion unless noted. Sortable by column.
          </p>
          <div className="mt-10 overflow-x-auto">
            <table
              className="w-full border-collapse"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--typography-size-sm)',
              }}
              aria-label="Market data table by region and year"
            >
              <thead>
                <tr style={{ background: 'var(--color-ramp-warm-500)' }}>
                  {['Region', '2022A', '2023A', '2024E', '2026F', '2028F', '2030F'].map(h => (
                    <th
                      key={h}
                      scope="col"
                      className="uppercase tracking-[0.1em]"
                      style={{
                        padding: '12px 16px',
                        textAlign: h === 'Region' ? 'left' : 'right',
                        fontWeight: 600,
                        fontSize: 'var(--typography-size-xs)',
                        color: 'var(--color-foundation-black)',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['India',       '0.82', '0.98', '1.20', '1.60', '2.10', '2.75'],
                  ['UAE',         '0.41', '0.50', '0.62', '0.85', '1.10', '1.44'],
                  ['Saudi Arabia','0.38', '0.44', '0.55', '0.73', '0.96', '1.26'],
                  ['Indonesia',   '0.30', '0.36', '0.44', '0.59', '0.77', '1.01'],
                  ['Qatar',       '0.18', '0.21', '0.26', '0.35', '0.46', '0.60'],
                  ['Rest of MENA','0.53', '0.63', '0.73', '0.98', '1.29', '1.44'],
                ].map((row, idx) => (
                  <tr
                    key={row[0]}
                    style={{ background: idx % 2 === 0 ? 'var(--color-foundation-white)' : 'rgba(0,0,0,0.02)' }}
                  >
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        style={{
                          padding: '11px 16px',
                          textAlign: ci === 0 ? 'left' : 'right',
                          fontWeight: ci === 0 ? 500 : 400,
                          color: 'var(--color-foundation-black)',
                          borderBottom: '1px solid var(--color-ramp-warm-500)',
                        }}
                      >
                        {ci === 0 ? cell : `$${cell}B`}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionWrapper>

        {/* ── §5 — Segmentation · bg white ─────────────────────────────────── */}
        <SectionWrapper background="white" spacing="lg" maxWidth="content" id="segmentation">
          <div className="mb-10">
            <SectionLabel variant="accent">CHAPTER 5 — SEGMENTATION</SectionLabel>
            <SectionHeading
              level={2}
              title="Market cuts by 7 dimensions"
              subtitle="Type · End-use · Region · Channel · Pack-size · Customer segment · Price tier"
            />
          </div>
          <p
            className="leading-relaxed"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--typography-size-sm)',
              color: 'rgba(0,0,0,0.70)',
              maxWidth: 'var(--container-prose)',
            }}
          >
            Each segmentation dimension is sized independently with cross-dimensional
            scenario overlays available in the Excel appendix.
          </p>
          <div
            className="mt-10 grid gap-6"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
          >
            {MOCK_SEGMENTS.map(seg => (
              <article
                key={seg.title}
                className="rounded-[var(--radius-card)] shadow-[var(--shadow-sm)] transition-[box-shadow,transform] duration-[var(--motion-duration-fast)]"
                style={{
                  padding: 'var(--space-xl)',
                  background: 'var(--color-ramp-warm-200)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card-hover)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)';
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--typography-size-base)',
                    fontWeight: 600,
                    color: 'var(--color-foundation-black)',
                    marginBottom: 'var(--space-sm)',
                  }}
                >
                  {seg.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--typography-size-sm)',
                    color: 'rgba(0,0,0,0.60)',
                  }}
                >
                  {seg.description}
                </p>
              </article>
            ))}
          </div>
        </SectionWrapper>

        {/* ── §6 — Regional Comparison · bg white ───────────────────────────── */}
        <SectionWrapper background="white" spacing="lg" maxWidth="content" id="regional-comparison">
          <div className="mb-10">
            <SectionLabel variant="accent">CHAPTER 6 — REGIONAL COMPARISON</SectionLabel>
            <SectionHeading
              level={2}
              title="Regional comparison"
              subtitle="Price, volume, and CAGR side-by-side across 6 markets"
            />
          </div>
          <p
            className="leading-relaxed"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--typography-size-sm)',
              color: 'rgba(0,0,0,0.70)',
              maxWidth: 'var(--container-prose)',
            }}
          >
            Compare key performance metrics across markets to identify fastest-growth
            opportunity zones and pricing power differentials by region.
          </p>
          <div className="mt-10 flex flex-col gap-2">
            {[
              { region: 'India',        cagr: '12.4%', avgPrice: '$14/kg', maturity: 'Growing' },
              { region: 'UAE',          cagr: '9.8%',  avgPrice: '$22/kg', maturity: 'Mature' },
              { region: 'Saudi Arabia', cagr: '10.2%', avgPrice: '$19/kg', maturity: 'Growing' },
              { region: 'Indonesia',    cagr: '14.1%', avgPrice: '$11/kg', maturity: 'Emerging' },
              { region: 'Qatar',        cagr: '8.9%',  avgPrice: '$28/kg', maturity: 'Mature' },
              { region: 'Rest of MENA', cagr: '9.3%',  avgPrice: '$17/kg', maturity: 'Mixed' },
            ].map((row, idx) => (
              <div
                key={row.region}
                className="grid rounded-[var(--radius-sm)] border border-transparent transition-[border-color] duration-[var(--motion-duration-fast)]"
                style={{
                  gridTemplateColumns: '2fr 1fr 1fr 1fr',
                  gap: 'var(--space-md)',
                  padding: 'var(--space-md) var(--space-lg)',
                  background: idx % 2 === 0 ? 'var(--color-foundation-white)' : 'rgba(0,0,0,0.02)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-ramp-warm-500)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; }}
              >
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--typography-size-sm)', fontWeight: 500, color: 'var(--color-foundation-black)' }}>{row.region}</span>
                <span className="text-right tabular-nums" style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--typography-size-sm)', color: 'var(--color-semantic-success-600)' }}>{row.cagr}</span>
                <span className="text-right" style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--typography-size-sm)', color: 'rgba(0,0,0,0.60)' }}>{row.avgPrice}</span>
                <span className="text-right uppercase self-center tracking-[0.1em]" style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--typography-size-xs)', color: 'rgba(0,0,0,0.50)' }}>{row.maturity}</span>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* ── §7 — Growth Drivers & Challenges (SWOT) · bg white ───────────── */}
        <SectionWrapper background="white" spacing="lg" maxWidth="content" id="growth-drivers">
          <div className="mb-10">
            <SectionLabel variant="accent">CHAPTER 7 — STRATEGIC ANALYSIS</SectionLabel>
            <SectionHeading
              level={2}
              title="Growth drivers & challenges"
              subtitle="SWOT-style strategic map across 4 dimensions"
            />
          </div>
          <p
            className="leading-relaxed"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--typography-size-sm)',
              color: 'rgba(0,0,0,0.70)',
              maxWidth: 'var(--container-prose)',
            }}
          >
            Understand the macro forces shaping market outcomes. Use this section
            to calibrate go-to-market assumptions and risk-weight your investment thesis.
          </p>
          <div
            className="mt-10 grid gap-4"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
          >
            {/* CRITICAL: SWOT uses SEMANTIC colors · NOT brand red */}
            {[
              {
                label: 'DRIVERS',
                color: 'var(--green-700)', /* semantic success · WCAG-safe on warm bg */
                items: ['Rising disposable income in GCC', 'E-commerce channel growth 28% YoY', 'Cold-chain infrastructure investment', 'Premiumisation trend in urban markets'],
              },
              {
                label: 'CHALLENGES',
                color: 'var(--error-text)', /* semantic error · NOT --brand-red (R1.2) */
                items: ['Price volatility from climate events', 'Regulatory fragmentation across GCC', 'Import dependency (60–80% in MENA)', 'Limited local certification infrastructure'],
              },
              {
                label: 'OPPORTUNITIES',
                color: 'var(--green-700)', /* semantic success · WCAG-safe body text */
                items: ['Vision 2030 food security mandates', 'Greenhouse tech adoption dropping costs', 'B2B procurement digitization', 'Export potential to EU and Asia'],
              },
              {
                label: 'THREATS',
                color: 'var(--warning-text)', /* semantic warning · WCAG-safe on warm bg */
                items: ['USD exchange rate pressure', 'Competition from low-cost ASEAN suppliers', 'Water scarcity policy tightening', 'Carbon border adjustment mechanisms'],
              },
            ].map(quadrant => (
              <div
                key={quadrant.label}
                className="rounded-[var(--radius-card)]"
                style={{
                  padding: 'var(--space-xl)',
                  borderTop: `3px solid ${quadrant.color}`,
                  background: 'var(--color-ramp-warm-200)',
                }}
              >
                <h3
                  className="uppercase tracking-[0.2em]"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--typography-size-xs)',
                    fontWeight: 600,
                    color: quadrant.color,
                    marginBottom: 'var(--space-md)',
                  }}
                >
                  {quadrant.label}
                </h3>
                <ul className="flex flex-col gap-2" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {quadrant.items.map(item => (
                    <li
                      key={item}
                      className="relative pl-4 leading-relaxed"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--typography-size-sm)',
                        color: 'rgba(0,0,0,0.70)',
                      }}
                    >
                      <span aria-hidden="true" className="absolute left-0" style={{ color: quadrant.color }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* ── §8 — Competitive Landscape · bg warm ─────────────────────────── */}
        <SectionWrapper background="warm" spacing="lg" maxWidth="content" id="competitive-landscape">
          <div className="mb-10">
            <SectionLabel variant="accent">CHAPTER 8 — COMPETITIVE LANDSCAPE</SectionLabel>
            <SectionHeading
              level={2}
              title="Competitive landscape"
              subtitle="Top 5 players by revenue share — comparative profiling across 8 dimensions"
            />
          </div>
          <p
            className="leading-relaxed"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--typography-size-sm)',
              color: 'rgba(0,0,0,0.70)',
              maxWidth: 'var(--container-prose)',
            }}
          >
            Market structure is moderately concentrated. The top 5 players account for
            59% of total market value. Remaining 41% is fragmented across 200+ regional producers.
          </p>
          <div className="mt-10 flex flex-col gap-2">
            {MOCK_COMPETITORS.map(c => (
              <div
                key={c.name}
                className="flex items-center justify-between rounded-[var(--radius-card)] border border-transparent transition-[border-color] duration-[var(--motion-duration-fast)] shadow-[var(--shadow-sm)]"
                style={{
                  padding: 'var(--space-md) var(--space-lg)',
                  background: 'var(--color-foundation-white)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-ramp-warm-500)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--typography-size-sm)', fontWeight: 500, color: 'var(--color-foundation-black)' }}>{c.name}</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--typography-size-xs)', color: 'rgba(0,0,0,0.50)', marginTop: '2px' }}>HQ: {c.hq}</div>
                </div>
                <div
                  className="tabular-nums"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--typography-size-base)',
                    fontWeight: 600,
                    color: 'var(--color-accent-purple-600)',
                  }}
                >
                  {c.share}
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* ── §9 — Inline Table of Contents · bg white ─────────────────────── */}
        <SectionWrapper background="white" spacing="lg" maxWidth="content" id="toc">
          <div className="mb-10">
            <SectionLabel variant="accent">CHAPTER 9 — NAVIGATION</SectionLabel>
            <SectionHeading
              level={2}
              title="Full table of contents"
              subtitle="Jump directly to any chapter — all 180+ pages indexed"
            />
          </div>
          <p
            className="leading-relaxed"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--typography-size-sm)',
              color: 'rgba(0,0,0,0.70)',
              maxWidth: 'var(--container-prose)',
            }}
          >
            This inline table of contents mirrors the sidebar navigation. Use it
            to navigate to any section, or download the full PDF for offline reading.
          </p>
          <nav
            aria-label="Inline table of contents"
            className="mt-10"
          >
            <ol
              className="grid gap-2"
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              }}
            >
              {MOCK_TOC.map((item, idx) => (
                <li key={item}>
                  {/* TOC anchors are card-style grid items — raw <a> is semantically correct.
                      InlineLink atom is wrong fit here (paragraph-flow underlined-link). DS
                      lacks a <TocItem> molecule; if needed → promote pattern later. P1-C
                      finding 2026-05-14 verification. */}
                  <a
                    href={`#${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    onClick={e => { e.preventDefault(); console.log('// TODO: tech team wires TOC anchor', item); }}
                    className="flex items-center gap-2 rounded-[var(--radius-sm)] no-underline transition-[box-shadow] hover:shadow-[var(--shadow-card-hover-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(20,16,22,0.5)]"
                    style={{
                      padding: 'var(--space-md)',
                      background: 'var(--color-ramp-warm-200)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--typography-size-sm)',
                      color: 'var(--color-foundation-black)',
                    }}
                  >
                    <span
                      className="tabular-nums"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--typography-size-xs)',
                        fontWeight: 600,
                        color: 'var(--color-brand-red)',
                        minWidth: '20px',
                      }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {item}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </SectionWrapper>

        {/* ── §10 — Target Audience · bg white ──────────────────────────────── */}
        <SectionWrapper background="white" spacing="lg" maxWidth="content" id="target-audience">
          <div className="mb-10">
            <SectionLabel variant="accent">CHAPTER 10 — TARGET AUDIENCE</SectionLabel>
            <SectionHeading
              level={2}
              title="Who should read this report"
              subtitle="8 stakeholder profiles — decision-makers across the value chain"
            />
          </div>
          <p
            className="leading-relaxed"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--typography-size-sm)',
              color: 'rgba(0,0,0,0.70)',
              maxWidth: 'var(--container-prose)',
            }}
          >
            This research is designed for procurement leads, investment analysts, and
            strategy teams evaluating market entry or expansion across these functions:
          </p>
          <ul
            className="mt-10 grid gap-4"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {[
              { role: 'Investment Analysts',  desc: 'PE/VC and public-market analysts benchmarking competitive entry.' },
              { role: 'Strategy Consultants', desc: 'Teams advising on market entry, M&A, and competitive positioning.' },
              { role: 'Procurement Heads',    desc: 'Enterprise buyers evaluating supplier landscape and pricing.' },
              { role: 'Export Managers',      desc: 'Trade teams assessing destination market opportunity and tariff exposure.' },
              { role: 'Regulatory Affairs',   desc: 'Teams navigating GCC and APAC food-safety compliance landscapes.' },
              { role: 'Brand Managers',       desc: 'Consumer goods teams assessing premium product opportunity sizing.' },
              { role: 'Venture Builders',     desc: 'Agri-tech founders benchmarking against incumbent operators.' },
              { role: 'Government Agencies',  desc: 'Trade and agricultural ministries sizing import dependency and local production gaps.' },
            ].map(s => (
              <li
                key={s.role}
                className="rounded-[var(--radius-card)] shadow-[var(--shadow-sm)]"
                style={{
                  padding: 'var(--space-lg)',
                  background: 'var(--color-foundation-white)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--typography-size-sm)',
                    fontWeight: 600,
                    color: 'var(--color-foundation-black)',
                    marginBottom: 'var(--space-xs)',
                  }}
                >
                  {s.role}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--typography-size-compact)',
                    color: 'rgba(0,0,0,0.60)',
                  }}
                >
                  {s.desc}
                </p>
              </li>
            ))}
          </ul>
        </SectionWrapper>

        {/* ── §11 — Research Methodology · bg warm — uses MethodologySection organism ── */}
        {/* SectionLabel + SectionHeading wrapper dropped — MethodologySection owns its header.
            Pass steps mapped from MOCK_METHODOLOGY_STEPS (number/title/description shape matches). */}
        <MethodologySection
          eyebrow="CHAPTER 11 — METHODOLOGY"
          heading="Research Methodology"
          description="Four-stage process combining secondary aggregation, primary interviews, data triangulation, and peer review to deliver defensible market estimates."
          steps={MOCK_METHODOLOGY_STEPS}
          background="warm"
        />

        {/* ── §12 — FAQ · bg white — uses FAQSection organism ──────────────── */}
        {/* FAQSection owns its section label + heading — wrapper SectionLabel+SectionHeading dropped.
            MOCK_FAQS already has {id, question, answer} shape — rename q→question, a→answer done above. */}
        <FAQSection
          faqs={MOCK_FAQS}
          label="CHAPTER 12 — FAQ"
          heading="Frequently asked questions"
          description="Pre-empting the most common analyst and procurement queries. If your question isn't answered below, contact our analyst team for a complimentary 15-minute orientation call."
          contactHref="/contact"
          contactLabel="Contact Research Team"
          defaultOpenId="faq-1"
        />

        {/* ── §13 — Related Reports · bg white — ReportCard grid ───────────── */}
        <SectionWrapper background="white" spacing="lg" maxWidth="content" id="related-reports">
          <div className="mb-10">
            <SectionLabel variant="accent">CHAPTER 13 — RELATED RESEARCH</SectionLabel>
            <SectionHeading
              level={2}
              title="Related reports you may need"
              subtitle="Complement this analysis with adjacent market coverage"
            />
          </div>
          <p
            className="leading-relaxed"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--typography-size-sm)',
              color: 'rgba(0,0,0,0.70)',
              maxWidth: 'var(--container-prose)',
            }}
          >
            Purchase multiple reports and bundle at a 20% discount.
            Contact our team for enterprise licensing options.
          </p>
          {/* ReportCard grid — 3-col per brief. variant="grid" renders 16:9 image-top canonical card. */}
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_RELATED.map(r => (
              <ReportCard
                key={r.id}
                id={r.id}
                image={r.image}
                title={r.title}
                industry={r.industry}
                region={r.region}
                date={r.date}
                projection={r.projection ?? null}
                variant="grid"
                onClick={(id) => console.log('// TODO: tech team wires View Report', id)}
              />
            ))}
          </div>
        </SectionWrapper>

        {/* ── §14 — Final CTA · canonical CTA bg composition (4-blob coral/orange-accent/perano stack + noise · per V0_lite CTASection) */}
        <section
          role="region"
          aria-label="Final call to action — get full report access"
          className="relative overflow-hidden"
          style={{
            padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem)',
          }}
        >
          <CTABackground variant="dark" className="absolute inset-0" />
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              maxWidth: 'var(--container-narrow)',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <div className="mb-3 inline-flex justify-center">
              <SectionLabel background="dark" variant="accent">
                CHAPTER 14 — FINAL CONVERSION
              </SectionLabel>
            </div>
            {/* H2: tracking-[-0.02em] per brief §14 + COMPOSITION_GRAMMAR §7 · 12px gap to subtitle via mb-3 */}
            <h2
              className="tracking-[-0.02em] font-light mb-3"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.75rem, 5vw, var(--typography-size-3xl))',
                color: 'var(--white)',
                lineHeight: 1.15,
              }}
            >
              Ready to unlock the full report?
            </h2>
            <p
              className="leading-relaxed"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--typography-size-base)',
                color: 'rgba(255,255,255,0.85)',
                maxWidth: 'var(--container-prose)',
                margin: '0 auto var(--space-3xl)',
              }}
            >
              Get instant access to {MOCK_REPORT.pages}+ pages of analysis, interactive data tables,
              and a complimentary 30-minute analyst briefing.
            </p>
            {/* Brand-red CTA on black bg · OG CTABanner pattern · R1.2 brand-red on BUTTONS only.
                primary = `variant="brand"` (brand-red bg) · secondary = `variant="ghost" background="dark"` outline. */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="brand"
                size="lg"
                animatedArrow
                onClick={() => console.log('// TODO: tech team wires Get Full Access (final CTA)')}
              >
                Get Full Access
              </Button>
              <Button
                variant="ghost"
                background="dark"
                size="lg"
                onClick={() => console.log('// TODO: tech team wires Talk to Analyst (final CTA)')}
              >
                Talk to Analyst
              </Button>
            </div>
          </div>
        </section>

      </main>

      <DummyFooter />
    </>
  );
}
