/**
 * SurveysDemoContent — Interactive Surveys Home Page Demo
 *
 * Full 6-section Product page using real Surveys molecules + organisms with mock data.
 * Sections 1, 2, 4, 6 now use Product Page Organisms (ProductHero, FeaturedCarousel,
 * BrowseGrid, CTABanner). Sections 3, 5 remain bespoke (domain-specific).
 */
import { useState } from 'react';
import { RefreshCw, ClipboardList, BarChart3 } from 'lucide-react';
import { SectionWrapper } from '@/app/components/SectionWrapper';
import { SectionHeading } from '@/app/components/SectionHeading';
import { Button } from '@/app/components/Button';
import { CTALink } from '@/app/components/CTALink';
import type { ViewMode } from '@/app/components/ViewToggle';
import {
  SurveyCard,
  CompletionBadge,
  StatCard,
  ResponseChart,
  QuestionPreview,
} from '@/app/components/molecules';
import {
  ProductHero,
  FeaturedCarousel,
  BrowseGrid,
  CTABanner,
} from '@/app/components/organisms';

// ─── Mock Data ─────────────────────────────────────────────

const featuredSurveys = [
  {
    id: 'fs-1',
    title: 'Enterprise AI Adoption & Readiness Assessment',
    description: 'Comprehensive evaluation of AI adoption maturity across Fortune 500 organizations, covering strategy, talent, infrastructure, and governance.',
    category: 'Technology',
    questionCount: 28,
    responseCount: 612,
    targetCount: 800,
    status: 'active' as const,
    date: 'Mar 2026',
    estimatedTime: '10 min',
  },
  {
    id: 'fs-2',
    title: 'Consumer Healthcare Preferences: Post-Pandemic Trends',
    description: 'Tracking shifts in healthcare consumer behavior including telehealth adoption, preventive care spending, and provider trust.',
    category: 'Healthcare',
    questionCount: 22,
    responseCount: 1450,
    targetCount: 1500,
    status: 'active' as const,
    date: 'Mar 2026',
    estimatedTime: '7 min',
  },
  {
    id: 'fs-3',
    title: 'Clean Energy Workforce Development Survey',
    description: 'Assessing skills gaps, training needs, and talent pipeline challenges in the renewable energy sector.',
    category: 'Energy',
    questionCount: 18,
    responseCount: 320,
    targetCount: 500,
    status: 'active' as const,
    date: 'Feb 2026',
    estimatedTime: '6 min',
  },
  {
    id: 'fs-4',
    title: 'Supply Chain Resilience: Lessons from 2025',
    description: 'Evaluating supply chain risk management practices and near-shoring decisions across manufacturing sectors.',
    category: 'Logistics',
    questionCount: 15,
    responseCount: 890,
    targetCount: 1000,
    status: 'active' as const,
    date: 'Feb 2026',
    estimatedTime: '5 min',
  },
];

const popularSurveys = [
  {
    id: 'ps-1',
    title: 'SaaS Pricing Sensitivity Analysis',
    description: 'Understanding willingness to pay across segments for B2B software products with usage-based vs subscription models.',
    category: 'Product',
    questionCount: 20,
    responseCount: 2100,
    targetCount: 2000,
    status: 'completed' as const,
    date: 'Jan 2026',
    estimatedTime: '8 min',
  },
  {
    id: 'ps-2',
    title: 'Remote Work Productivity & Wellbeing Index',
    description: 'Annual benchmark study measuring employee productivity, engagement, and mental health in distributed work environments.',
    category: 'Workplace',
    questionCount: 35,
    responseCount: 3200,
    targetCount: 3000,
    status: 'completed' as const,
    date: 'Dec 2025',
    estimatedTime: '12 min',
  },
  {
    id: 'ps-3',
    title: 'FinTech User Experience Benchmark',
    description: 'Comparative UX evaluation of digital banking apps, neobanks, and embedded finance solutions.',
    category: 'Financial Services',
    questionCount: 24,
    responseCount: 456,
    targetCount: 750,
    status: 'active' as const,
    date: 'Mar 2026',
    estimatedTime: '9 min',
  },
  {
    id: 'ps-4',
    title: 'Cybersecurity Awareness: Employee Risk Assessment',
    description: 'Measuring security awareness maturity and identifying training gaps across enterprise organizations.',
    category: 'Cybersecurity',
    questionCount: 16,
    responseCount: 0,
    targetCount: 400,
    status: 'draft' as const,
    date: 'Apr 2026',
    estimatedTime: '5 min',
  },
  {
    id: 'ps-5',
    title: 'Sustainable Packaging Consumer Preferences',
    description: 'Exploring consumer attitudes toward eco-friendly packaging, willingness to pay premiums, and brand perception impact.',
    category: 'Sustainability',
    questionCount: 14,
    responseCount: 1800,
    targetCount: 1800,
    status: 'closed' as const,
    date: 'Nov 2025',
    estimatedTime: '4 min',
  },
  {
    id: 'ps-6',
    title: 'Autonomous Vehicle Trust & Adoption Intent',
    description: 'Gauging public sentiment, safety perceptions, and purchase intent for Level 3-5 autonomous vehicles.',
    category: 'Automotive',
    questionCount: 19,
    responseCount: 670,
    targetCount: 1000,
    status: 'active' as const,
    date: 'Feb 2026',
    estimatedTime: '7 min',
  },
];

const topicStats = [
  { category: 'Surveys', value: '340+', label: 'Active Surveys', description: 'Currently fielded surveys across all industry verticals and research topics', growth: '34%', metric: 'YoY growth' },
  { category: 'Responses', value: '2.4M', label: 'Total Responses', description: 'Cumulative survey responses collected across all published surveys in 2025-2026', growth: '52%', metric: 'vs prior year' },
  { category: 'Completion', value: '78%', label: 'Avg. Completion Rate', description: 'Average survey completion rate across all active surveys, up from 64% last year', growth: '+14pp', metric: 'vs 2025 avg' },
  { category: 'Insights', value: '1,200+', label: 'Published Insights', description: 'Research insights derived from survey data, published as standalone reports or data points', growth: '41%', metric: 'YoY growth' },
];

const recentResults = [
  {
    title: 'AI Tool Adoption by Department',
    data: [
      { label: 'Engineering', value: 89 },
      { label: 'Marketing', value: 72 },
      { label: 'Sales', value: 58 },
      { label: 'Finance', value: 41 },
      { label: 'HR', value: 34 },
    ],
  },
  {
    title: 'Preferred Learning Format',
    data: [
      { label: 'On-demand video', value: 312 },
      { label: 'Live workshop', value: 245 },
      { label: 'Written guide', value: 198 },
      { label: 'Peer coaching', value: 87 },
    ],
  },
];

const sampleQuestions = [
  { number: 1, question: 'How satisfied are you with our platform\'s data visualization capabilities?', type: 'rating' as const, required: true },
  { number: 2, question: 'Which of the following features do you use regularly?', type: 'checkbox' as const, options: ['Dashboard Builder', 'Report Generator', 'API Access', 'Custom Alerts', 'Data Export'], required: true },
  { number: 3, question: 'What is your organization\'s primary industry?', type: 'multiple-choice' as const, options: ['Technology', 'Healthcare', 'Financial Services', 'Manufacturing', 'Other'] },
  { number: 4, question: 'Please describe the biggest challenge you face with market research data.', type: 'text' as const },
];

const topics = [
  { name: 'Technology & AI', count: 87, status: 'active' as const },
  { name: 'Healthcare', count: 64, status: 'active' as const },
  { name: 'Financial Services', count: 52, status: 'active' as const },
  { name: 'Sustainability', count: 41, status: 'completed' as const },
  { name: 'Workplace', count: 38, status: 'active' as const },
  { name: 'Consumer Behavior', count: 35, status: 'active' as const },
  { name: 'Automotive', count: 28, status: 'draft' as const },
  { name: 'Cybersecurity', count: 24, status: 'active' as const },
];

// ─── Demo Component ─────────────────────────────────────────

export function SurveysDemoContent() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [loading, setLoading] = useState(false);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Demo Header */}
      <div className="border border-black/10 rounded-[5px] p-8 bg-[#fafaf9]">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-normal">Surveys Home — Live Demo</h1>
          <span className="px-2 py-0.5 text-[10px] font-medium bg-[#806ce0]/10 text-[#806ce0] rounded">Interactive</span>
          <span className="px-2 py-0.5 text-[10px] font-medium bg-green-100 text-green-700 rounded">Organisms</span>
        </div>
        <p className="text-sm text-black/70 mb-4">
          Full 6-section Product page — Sections 1, 2, 4, 6 now use Product Page Organisms
          (ProductHero, FeaturedCarousel, BrowseGrid, CTABanner). Sections 3, 5 remain bespoke.
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" size="sm" icon={<RefreshCw size={14} />} onClick={simulateLoading}>
            Simulate Loading
          </Button>
          <div className="flex items-center gap-2 text-xs text-black/40">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            {loading ? 'Loading...' : 'Ready'}
          </div>
        </div>
      </div>

      {/* Page Preview Container */}
      <div className="border border-black/10 rounded-[5px] overflow-hidden shadow-sm">

        {/* ══════════════════════════════════════════════
            SECTION 1: HERO (BLACK) — ProductHero organism
            ══════════════════════════════════════════════ */}
        <ProductHero
          label="Surveys"
          title="Primary Research, On Demand"
          subtitle="Access 340+ active surveys spanning 8 research topics. Contribute insights, explore results, and benchmark against peers."
          searchPlaceholder="Search surveys by topic, industry, or keyword..."
          badges={['340+ Surveys', '2.4M Responses', '78% Completion Rate', '8 Topics']}
        />

        {/* ══════════════════════════════════════════════
            SECTION 2: FEATURED SURVEYS (WHITE) — FeaturedCarousel organism
            ══════════════════════════════════════════════ */}
        <FeaturedCarousel
          label="Featured"
          title="Active Surveys"
          subtitle="Currently fielded — contribute your insights to shape our latest research"
          ctaText="View all surveys"
        >
          {featuredSurveys.map((survey) => (
            <div key={survey.id} className="flex-shrink-0" style={{ width: '300px' }}>
              <SurveyCard {...survey} layout="grid" />
            </div>
          ))}
        </FeaturedCarousel>

        {/* ══════════════════════════════════════════════
            SECTION 3: TOPIC OVERVIEW (WARM) — bespoke (StatCard icons + topic badges)
            ══════════════════════════════════════════════ */}
        <SectionWrapper background="warm" spacing="lg" maxWidth="wide">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8">
            <SectionHeading
              label="Survey Intelligence"
              title="Topic Overview"
              subtitle="Key metrics across our primary research program"
            />
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {topicStats.map((stat, idx) => (
                <StatCard key={idx} {...stat} icon={idx === 0 ? <ClipboardList size={16} color="#806ce0" /> : idx === 1 ? <BarChart3 size={16} color="#806ce0" /> : undefined} />
              ))}
            </div>

            {/* Topic Badges Grid */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-black/60 mb-4">Browse by Topic</h3>
              <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <button
                    key={topic.name}
                    className="group flex items-center gap-2 px-3 py-2 rounded-[5px] border border-black/6 hover:border-black/15 hover:bg-white/60 transition-all cursor-pointer bg-white/40"
                  >
                    <CompletionBadge status={topic.status} />
                    <span className="text-sm text-black/70 group-hover:text-black transition-colors">{topic.name}</span>
                    <span className="text-xs text-black/30 font-mono">{topic.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* ══════════════════════════════════════════════
            SECTION 4: POPULAR SURVEYS (WHITE) — BrowseGrid organism
            ══════════════════════════════════════════════ */}
        <BrowseGrid
          label="Popular"
          title="Trending Surveys"
          subtitle="Most participated surveys across all topics"
          items={popularSurveys}
          viewMode={viewMode}
          onViewModeChange={(mode) => { setViewMode(mode); simulateLoading(); }}
          loading={loading}
          countLabel="surveys"
          renderCard={(s, vm) => <SurveyCard key={s.id} {...s} layout={vm} />}
        />

        {/* ══════════════════════════════════════════════
            SECTION 5: RECENT RESULTS (WHITE + border) — bespoke
            ══════════════════════════════════════════════ */}
        <SectionWrapper background="white" spacing="lg" maxWidth="wide" className="border-t border-black/6">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8">
            <SectionHeading
              label="Results"
              title="Recent Survey Results"
              subtitle="Latest findings from completed surveys"
              endSlot={<CTALink href="#">View all results</CTALink>}
            />

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentResults.map((chart, idx) => (
                <ResponseChart key={idx} title={chart.title} data={chart.data} />
              ))}
            </div>

            {/* Donut summaries */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <ResponseChart
                title="AI Adoption Survey"
                mode="donut"
                data={[
                  { label: 'Complete', value: 612 },
                  { label: 'Remaining', value: 188, color: 'rgba(0,0,0,0.08)' },
                ]}
                total={800}
              />
              <ResponseChart
                title="Healthcare Prefs"
                mode="donut"
                data={[
                  { label: 'Complete', value: 1450 },
                  { label: 'Remaining', value: 50, color: 'rgba(0,0,0,0.08)' },
                ]}
                total={1500}
              />
              <ResponseChart
                title="Clean Energy Survey"
                mode="donut"
                data={[
                  { label: 'Complete', value: 320 },
                  { label: 'Remaining', value: 180, color: 'rgba(0,0,0,0.08)' },
                ]}
                total={500}
              />
              <ResponseChart
                title="Supply Chain"
                mode="donut"
                data={[
                  { label: 'Complete', value: 890 },
                  { label: 'Remaining', value: 110, color: 'rgba(0,0,0,0.08)' },
                ]}
                total={1000}
              />
            </div>

            {/* Question Preview Sample */}
            <div className="mt-10">
              <h3 className="text-sm font-medium text-black/60 mb-4">Sample Questions — Enterprise AI Survey</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sampleQuestions.map((q) => (
                  <QuestionPreview key={q.number} {...q} />
                ))}
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* ══════════════════════════════════════════════
            SECTION 6: CTA (BLACK) — CTABanner organism
            ══════════════════════════════════════════════ */}
        <CTABanner
          label="Participate"
          title="Shape the Research"
          subtitle="Your insights drive better market intelligence. Join thousands of professionals contributing to our primary research program."
          primaryText="Take a Survey"
          primaryIcon={<ClipboardList size={18} />}
          secondaryText="Browse Results"
        />
      </div>

      {/* Section Map Legend */}
      <div className="border border-black/8 rounded-[5px] p-6 bg-[#fafaf9]">
        <h3 className="text-sm font-medium mb-4">Section Map — 6 Sections (4 Organisms + 2 Bespoke)</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { num: 1, name: 'Hero', bg: 'bg-black', text: 'text-white', molecules: 'ProductHero organism' },
            { num: 2, name: 'Featured', bg: 'bg-white border border-black/10', text: 'text-black', molecules: 'FeaturedCarousel organism' },
            { num: 3, name: 'Topics', bg: 'bg-[#f5f2f1]', text: 'text-black', molecules: 'StatCard + CompletionBadge' },
            { num: 4, name: 'Popular', bg: 'bg-white border border-[#806ce0]/20', text: 'text-black', molecules: 'BrowseGrid organism' },
            { num: 5, name: 'Results', bg: 'bg-white border border-black/10', text: 'text-black', molecules: 'ResponseChart, QuestionPreview' },
            { num: 6, name: 'CTA', bg: 'bg-black', text: 'text-white', molecules: 'CTABanner organism' },
          ].map((s) => (
            <div key={s.num} className={`rounded-[5px] p-3 ${s.bg} ${s.text}`}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="font-mono text-[10px] opacity-50">{s.num}</span>
                <span className="text-xs font-medium">{s.name}</span>
              </div>
              <p className="text-[10px] opacity-50">{s.molecules}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}