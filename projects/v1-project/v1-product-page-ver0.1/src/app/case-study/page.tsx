'use client';

/**
 * /case-study — Case Study Reference Page (Wave 4 PDP Organism Composition Proof)
 *
 * WHY:
 * - Proves that DS Wave 4 organisms compose correctly together: case-study IA +
 *   LongFormReader + FAQSection flow is validated end-to-end before tech handover.
 * - Demonstrates propification works: fictional "Acme Logistics" client (NOT Yash)
 *   proves that ClientContextSection / TestimonialSection accept arbitrary data.
 * - Validates bg-alternation recipe conformance (black → white → warm → white → black
 *   → white → white → black → white → black) per case-study.md hard gate.
 * - Target line count ~200 vs /sample 1284: proves organism composition ROI.
 *
 * WHAT:
 * - 13-organism composition (CaseStudyNavbar · HeroSection · ClientContextSection ·
 *   ChallengesSection · EngagementObjectivesSection · MethodologySection ·
 *   ImpactSection · TestimonialSection · ResourcesSection · FAQSection ·
 *   FinalCTASection · DummyHeader · DummyFooter) on editorial-light variant.
 * - All mock data co-located in this file with TODO replace markers.
 * - No raw HTML elements — DS atoms only per case-study recipe Cat 13.8 rule.
 *
 * WHEN:
 * - Development / design review / QA gate for Wave 4 organism set.
 * - Reference page for tech team handover: proves composition pattern.
 *
 * WHERE:
 * - /case-study route in projects/reports-pdp-v2 (Next 15 + React 19).
 * - Companion to /sample (report PDP) and /reports/* (live PDP routes).
 *
 * HOW:
 * - Organisms imported from @kenresearch/design-system/organisms barrel.
 * - Mock data defined below with // TODO: replace w/ real API markers.
 * - Section IDs match CaseStudyNavbar ribbon scroll-spy coupling contract.
 * - 'use client' required: CaseStudyNavbar + FAQSection carry internal state.
 *
 * @recipe design-system/recipes/case-study.md (editorial-light variant · DEFAULT)
 * @bgAlternation black→white→warm→white→black→white→white(border-t)→black→white→black
 * @organisms 13 Wave 4 DS organisms
 */

// ── Types (local re-export to avoid deep import) ──────────────────────────────
type ContentBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

// ── DS Imports ────────────────────────────────────────────────────────────────
import {
  DummyHeader,
  DummyFooter,
  CaseStudyNavbar,
  HeroSection,
  ClientContextSection,
  ChallengesSection,
  EngagementObjectivesSection,
  MethodologySection,
  ImpactSection,
  TestimonialSection,
  ResourcesSection,
  FAQSection,
  FinalCTASection,
  ReadingProgressBar,
  StickyCTA,
} from '@kenresearch/design-system/organisms';
import type { FAQItem } from '@kenresearch/design-system/organisms';

// ── Mock data — TODO: replace w/ real API ─────────────────────────────────────

// TODO: replace w/ real API — GET /api/case-studies/acme-logistics-supply-chain
const MOCK_CLIENT: {
  companyName: string;
  industry: string;
  logoFallback: string;
  eyebrow: string;
  ctaLabel: string;
  ctaHref: string;
  contentBlocks: ContentBlock[];
} = {
  companyName: 'Acme Logistics Ltd.',
  industry: 'Supply Chain & Third-Party Logistics',
  logoFallback: 'A',
  eyebrow: 'Client Context',
  ctaLabel: 'View Full Client Profile',
  ctaHref: '#',
  contentBlocks: [
    {
      type: 'heading',
      text: 'A pan-India third-party logistics operator managing end-to-end supply chain for fast-moving consumer goods, pharmaceuticals, and industrial components.',
    },
    {
      type: 'paragraph',
      text: 'Operating 48 distribution centres across 22 states, Acme Logistics serves 340+ enterprise clients with a combined fleet of 1,200 vehicles. Despite scale, operational inefficiencies and fragmented visibility tools had stalled margin expansion for three consecutive years.',
    },
    {
      type: 'list',
      items: [
        'Warehousing & Cold Chain Management',
        'Last-Mile Delivery Orchestration',
        'Real-Time Fleet Visibility',
        'Customs Clearance & Cross-Border Logistics',
        'Returns & Reverse Logistics',
      ],
    },
  ],
};

// TODO: replace w/ real API — GET /api/case-studies/acme-logistics-supply-chain/challenges
const MOCK_CHALLENGES = [
  {
    number: '01',
    title: 'Fragmented Visibility',
    questions: [
      'What percentage of shipments had real-time GPS tracking vs manual check-ins?',
      'How many systems did operations staff switch between to monitor a single shipment?',
    ],
  },
  {
    number: '02',
    title: 'Margin Erosion',
    questions: [
      'Which route clusters were driving the highest cost-per-delivery outliers?',
      'What was the fuel wastage rate across non-optimised long-haul corridors?',
    ],
  },
  {
    number: '03',
    title: 'Client Retention Risk',
    questions: [
      'Which enterprise accounts had flagged SLA breach risk in the last 2 quarters?',
      'How did Acme\'s on-time delivery rate compare to tier-1 competitor benchmarks?',
    ],
  },
  {
    number: '04',
    title: 'Technology Gap',
    questions: [
      'What share of routing decisions were still manual or spreadsheet-driven?',
      'What was the integration backlog between the TMS and warehouse management systems?',
    ],
  },
];

// TODO: replace w/ real API — GET /api/case-studies/acme-logistics-supply-chain/objectives
const MOCK_OBJECTIVES = [
  {
    number: '01',
    title: 'Competitive Benchmarking',
    description: 'Map Acme\'s operational KPIs against the top 8 Indian 3PL operators — SLA adherence, cost-per-km, fleet utilisation, and OTIF rates — to identify addressable performance gaps.',
  },
  {
    number: '02',
    title: 'Route Optimisation Opportunity Sizing',
    description: 'Quantify savings potential from AI-assisted dynamic routing across the 12 highest-volume corridors, segmented by cargo type and delivery window.',
  },
  {
    number: '03',
    title: 'Technology Vendor Landscape',
    description: 'Profile 14 TMS/WMS vendors with fit scoring against Acme\'s integration constraints, budget envelope, and 18-month deployment timeline.',
  },
  {
    number: '04',
    title: 'Client Retention Playbook',
    description: 'Identify at-risk enterprise accounts using SLA breach frequency data and design a proactive service recovery framework with measurable re-engagement triggers.',
  },
  {
    number: '05',
    title: 'Growth Market Prioritisation',
    description: 'Rank 9 under-penetrated geography clusters by logistics demand CAGR, competitive white space, and Acme\'s existing network proximity advantage.',
  },
];

// TODO: replace w/ real API — GET /api/case-studies/acme-logistics-supply-chain/methodology
const MOCK_STEPS = [
  {
    number: '01',
    title: 'Diagnostic Immersion',
    description: '4-week onsite operational audit across 6 distribution centres. 34 structured interviews with operations leads, fleet managers, and key account teams. Baseline KPI capture across 18 operational metrics.',
  },
  {
    number: '02',
    title: 'Competitive Intelligence Sweep',
    description: 'Primary research: 22 expert calls with logistics industry practitioners and procurement heads at FMCG/pharma shippers. Secondary: regulatory filings, tender databases, and industry association benchmarks.',
  },
  {
    number: '03',
    title: 'Technology Vendor Assessment',
    description: 'Structured RFI process with 14 TMS/WMS vendors. Fit-gap matrix scored across 26 criteria: integration depth, mobile-first UX, AI routing capability, support SLAs, and total cost of ownership.',
  },
  {
    number: '04',
    title: 'Opportunity Modelling',
    description: 'Route-level P&L modelling for the 12 prioritised corridors. Scenario analysis: baseline vs partial optimisation vs full AI-routing adoption. Sensitivity tested across fuel price and volume assumptions.',
  },
  {
    number: '05',
    title: 'Playbook Synthesis',
    description: 'Consolidated findings into a 3-horizon action roadmap: quick-wins (0-3 months) · structural fixes (3-12 months) · transformation bets (12-24 months). Validated with Acme C-suite in 2 working sessions.',
  },
  {
    number: '06',
    title: 'Handover & Activation Support',
    description: 'Delivered board-ready deck, vendor shortlist with negotiation guides, and a KPI tracking dashboard template. 90-day post-delivery check-in to measure adoption and course-correct priorities.',
  },
];

// TODO: replace w/ real API — GET /api/case-studies/acme-logistics-supply-chain/impact
const MOCK_METRICS = [
  {
    value: '23%',
    label: 'Reduction in Cost-per-Delivery',
    description: 'Achieved across the 12 prioritised corridors within 9 months of AI-routing adoption — exceeding the modelled 18% base case by 5 percentage points.',
  },
  {
    value: '₹14.2 Cr',
    label: 'Annualised Savings Unlocked',
    description: 'Fuel optimisation, route consolidation, and fleet right-sizing combined. Excludes ₹3.1 Cr secondary savings from reduced detention charges at pharma client sites.',
  },
  {
    value: '94.7%',
    label: 'On-Time In-Full Rate',
    description: 'Up from 81.3% pre-engagement — repositioning Acme within top-quartile of Indian 3PL benchmarks and directly preventing churn of 3 at-risk enterprise accounts.',
  },
  {
    value: '18 months',
    label: 'Full Transformation Timeline',
    description: 'From diagnostic kickoff to all-corridor AI-routing live, on schedule and within the ₹4.8 Cr technology investment envelope recommended by Ken Research.',
  },
];

// TODO: replace w/ real API — GET /api/case-studies/acme-logistics-supply-chain/testimonial
const MOCK_TESTIMONIAL = {
  eyebrow: 'Client Endorsement',
  quote: '"The Ken Research team did not just hand us a report — they helped us see our own operations through a competitor\'s lens. The route optimisation model alone paid for the engagement in the first quarter of implementation."',
  attribution: 'Chief Operating Officer, Acme Logistics Ltd.',
  rating: 4.9,
  starCount: 5,
};

// TODO: replace w/ real API — GET /api/case-studies/acme-logistics-supply-chain/faqs
const MOCK_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How long does a supply chain diagnostic engagement typically take?',
    answer: 'A standard diagnostic immersion runs 4-6 weeks for a multi-site operator of Acme\'s scale. This includes onsite observation, structured interviews, KPI baseline capture, and a preliminary findings read-out. Full engagement (diagnostic through playbook delivery) averaged 18 weeks in 2024.',
  },
  {
    id: 'faq-2',
    question: 'What data does Ken Research need from the client to begin?',
    answer: 'We typically start with 12-18 months of shipment-level delivery performance data (OTD, OTIF, damage rate), basic fleet utilisation logs, and 3 years of P&L at the business-unit level. We supplement with primary research and do not require clients to pre-clean data — our team handles normalisation.',
  },
  {
    id: 'faq-3',
    question: 'How do you ensure confidentiality of sensitive operational data?',
    answer: 'All client data is governed by a bilateral NDA signed before engagement kickoff. Data is stored in an isolated, client-named workspace with role-based access controls. Raw datasets are destroyed 90 days post-delivery. We do not aggregate client data into benchmarks without explicit written consent.',
  },
  {
    id: 'faq-4',
    question: 'Can Ken Research support vendor negotiation after the technology assessment?',
    answer: 'Yes. Our vendor assessment deliverable includes a negotiation guide with recommended commercial terms, typical discount ranges, and must-have contractual clauses for each shortlisted vendor. We can also participate in vendor presentations as an independent advisor — scope is agreed at the start of Phase 3.',
  },
  {
    id: 'faq-5',
    question: 'Do you provide post-delivery support if priorities shift mid-implementation?',
    answer: 'Our standard engagement includes a 90-day post-delivery check-in. For clients who require ongoing advisory — quarterly market updates, competitor monitoring, or implementation governance support — we offer a Research-as-a-Service retainer that can be activated within 2 weeks of the base engagement close.',
  },
  {
    id: 'faq-6',
    question: 'Is this type of engagement available for mid-size 3PL operators, or only large enterprises?',
    answer: 'The engagement model scales. For operators with 5-20 distribution centres, we offer a condensed 8-week variant with 2 onsite sites instead of 6, a lighter primary research sweep (10-14 calls), and a focused 2-horizon roadmap. Pricing is adjusted proportionally. Minimum engagement size: ₹18 Lakh.',
  },
  {
    id: 'faq-7',
    question: 'How does Ken Research benchmark against international 3PL operators?',
    answer: 'We maintain a proprietary benchmarking database covering 180+ 3PL operators across India, UAE, Singapore, and key Southeast Asian markets — updated quarterly. For cross-border benchmarks, we partner with regional research affiliates and leverage IATA, World Bank logistics performance indices, and trade body reports.',
  },
  {
    id: 'faq-8',
    question: 'What is the typical investment range for an engagement like Acme\'s?',
    answer: 'A full-scope engagement (diagnostic through playbook + 90-day support) for an operator of 40-60 DC scale typically ranges ₹35-65 Lakh depending on primary research depth, number of vendor assessments, and C-suite working session frequency. We provide a fixed-fee proposal after a no-cost scoping call.',
  },
];

// ── Page Component ────────────────────────────────────────────────────────────

export default function CaseStudyPage() {
  return (
    <>
      {/* DummyHeader — tech team replaces with TopNavigation post-handover */}
      <DummyHeader />

      {/* CaseStudyNavbar — scroll-spy ribbon · owns section tracking state */}
      <CaseStudyNavbar />

      {/* ReadingProgressBar — pinned to top · CSS fixed · no layout shift */}
      <ReadingProgressBar />

      <main id="main-content">

        {/* § 1 — Hero · bg: black cinematic ─────────────────────────────── */}
        {/* HeroSection now propified · pass Acme meta · backward-compat default = Yash */}
        <section id="hero">
          <HeroSection
            eyebrow="Case Study"
            title="Mapping Pan-India 3PL Capacity Optimization for ₹240Cr TAM Expansion"
            meta={[
              { label: 'Client', value: MOCK_CLIENT.companyName },
              { label: 'Industry', value: MOCK_CLIENT.industry },
              { label: 'Geography', value: 'India · Tier-1 + Tier-2 cities' },
              { label: 'Engagement Owner', value: 'VP – Supply Chain Strategy' },
            ]}
          />
        </section>

        {/* § 2 — Client Context · bg: white ──────────────────────────────── */}
        <section id="client-context">
          <ClientContextSection
            logoFallback={MOCK_CLIENT.logoFallback}
            companyName={MOCK_CLIENT.companyName}
            industry={MOCK_CLIENT.industry}
            eyebrow={MOCK_CLIENT.eyebrow}
            contentBlocks={MOCK_CLIENT.contentBlocks}
            ctaLabel={MOCK_CLIENT.ctaLabel}
            ctaHref={MOCK_CLIENT.ctaHref}
          />
        </section>

        {/* § 3 — Challenges · bg: warm-300 ───────────────────────────────── */}
        {/* ChallengesSection owns its own warm surface internally */}
        <section id="challenges">
          <ChallengesSection challenges={MOCK_CHALLENGES} />
        </section>

        {/* § 4 — Engagement Objectives · bg: white ───────────────────────── */}
        {/* EngagementObjectivesSection owns its own white surface internally */}
        <section id="engagement">
          <EngagementObjectivesSection objectives={MOCK_OBJECTIVES} />
        </section>

        {/* § 5 — Methodology · bg: warm (RS-canonical default) · use background="white|black" if recipe demands · prop now available */}
        <section id="methodology">
          <MethodologySection steps={MOCK_STEPS} background="warm" />
        </section>

        {/* § 6 — Impact · bg: white ───────────────────────────────────────── */}
        {/* ImpactSection auto-detects metric-with-description from descriptions */}
        <section id="impact">
          <ImpactSection metrics={MOCK_METRICS} />
        </section>

        {/* § 7 — Testimonial · bg: white (border-t) ──────────────────────── */}
        {/* TestimonialSection renders its own border-t internally */}
        <section id="testimonial">
          <TestimonialSection
            eyebrow={MOCK_TESTIMONIAL.eyebrow}
            quote={MOCK_TESTIMONIAL.quote}
            attribution={MOCK_TESTIMONIAL.attribution}
            rating={MOCK_TESTIMONIAL.rating}
            starCount={MOCK_TESTIMONIAL.starCount}
          />
        </section>

        {/* § 8 — Resources · bg: black gradient mesh ──────────────────────── */}
        {/* ResourcesSection dark mode owns its own multi-layer dark gradient */}
        <section id="resources">
          <ResourcesSection mode="dark" cardStyle="bordered" />
        </section>

        {/* § 9 — FAQ · bg: white ──────────────────────────────────────────── */}
        <section
          id="faq"
          style={{ background: 'var(--color-foundation-white)' }}
        >
          <FAQSection
            faqs={MOCK_FAQS}
            defaultOpenId="faq-1"
            label="CASE STUDY — FAQ"
            heading="Common Questions About This Engagement"
            description="Everything you need to know about how Ken Research approached Acme Logistics' supply chain transformation."
            contactHref="/contact"
            contactLabel="Discuss a Similar Engagement"
          />
        </section>

        {/* § 10 — Final CTA · bg: black (recipe close) · variant prop now exposed */}
        <section id="final-cta">
          <FinalCTASection
            background="black"
            eyebrow="Final Conversion"
            title="Ready to optimize your 3PL capacity?"
            subtitle="Partner with our supply-chain analysts to map your network · uncover capacity gaps · build a data-grounded expansion plan."
            primaryLabel="Get Customized Report"
            secondaryLabel="Book Discovery Call"
          />
        </section>

      </main>

      {/* StickyCTA — persistent bottom bar · hidden at hero + footer */}
      <StickyCTA />

      {/* DummyFooter — tech team replaces with real Footer post-handover */}
      <DummyFooter />
    </>
  );
}
