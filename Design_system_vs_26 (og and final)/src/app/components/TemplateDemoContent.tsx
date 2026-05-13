/**
 * TemplateDemoContent — ProductPageTemplate declarative demo
 *
 * Shows how a hypothetical new pillar ("Training") can spin up a full
 * Product page in ~80 lines of config by using ProductPageTemplate.
 * Proves the template layer works end-to-end with zero custom layout code.
 */
import { useState } from 'react';
import { GraduationCap, RefreshCw, BookOpen, Users } from 'lucide-react';
import { SectionWrapper } from '@/app/components/SectionWrapper';
import { SectionHeading } from '@/app/components/SectionHeading';
import { Badge } from '@/app/components/Badge';
import { Button } from '@/app/components/Button';
import { CTALink } from '@/app/components/CTALink';
import type { ViewMode } from '@/app/components/ViewToggle';
import { ProductPageTemplate } from '@/app/components/organisms';

// ─── Minimal card for Training courses ──────────────────────

function CourseCard({ title, category, duration, enrolled, layout }: {
  id: string;
  title: string;
  category: string;
  duration: string;
  enrolled: number;
  layout: ViewMode;
}) {
  if (layout === 'list') {
    return (
      <div className="flex items-center gap-4 p-4 border border-black/8 rounded-[5px] hover:border-black/15 transition-all">
        <div className="w-10 h-10 rounded-[5px] bg-[#806ce0]/10 flex items-center justify-center flex-shrink-0">
          <BookOpen size={18} className="text-[#806ce0]" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium truncate">{title}</h4>
          <p className="text-xs text-black/50">{category}</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-black/40 flex-shrink-0">
          <span>{duration}</span>
          <span className="flex items-center gap-1"><Users size={12} /> {enrolled}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="border border-black/8 rounded-[5px] p-5 hover:border-black/15 hover:shadow-sm transition-all">
      <div className="w-10 h-10 rounded-[5px] bg-[#806ce0]/10 flex items-center justify-center mb-4">
        <BookOpen size={18} className="text-[#806ce0]" />
      </div>
      <span className="text-[10px] font-mono text-black/40 uppercase">{category}</span>
      <h4 className="text-sm font-medium mt-1 mb-2">{title}</h4>
      <div className="flex items-center gap-3 text-xs text-black/40">
        <span>{duration}</span>
        <span className="flex items-center gap-1"><Users size={12} /> {enrolled} enrolled</span>
      </div>
    </div>
  );
}

// ─── Mock Data ──────────────────────────────────────────────

const featuredCourses = [
  { id: 'fc-1', title: 'Advanced Market Research Methodologies', category: 'Research Methods', duration: '6 weeks', enrolled: 342 },
  { id: 'fc-2', title: 'Data Visualization for Business Intelligence', category: 'Data Skills', duration: '4 weeks', enrolled: 518 },
  { id: 'fc-3', title: 'Survey Design & Questionnaire Architecture', category: 'Survey Methods', duration: '3 weeks', enrolled: 267 },
  { id: 'fc-4', title: 'Strategic Consulting Frameworks', category: 'Consulting', duration: '8 weeks', enrolled: 189 },
];

const browseCourses = [
  { id: 'bc-1', title: 'Introduction to Quantitative Research', category: 'Research Methods', duration: '2 weeks', enrolled: 1240 },
  { id: 'bc-2', title: 'Industry Analysis: Technology Sector Deep Dive', category: 'Industry Knowledge', duration: '5 weeks', enrolled: 456 },
  { id: 'bc-3', title: 'Client Presentation & Storytelling', category: 'Soft Skills', duration: '3 weeks', enrolled: 892 },
  { id: 'bc-4', title: 'Statistical Analysis with R & Python', category: 'Data Skills', duration: '6 weeks', enrolled: 678 },
  { id: 'bc-5', title: 'Competitive Intelligence Gathering', category: 'Research Methods', duration: '4 weeks', enrolled: 345 },
  { id: 'bc-6', title: 'Report Writing for Market Research', category: 'Communication', duration: '2 weeks', enrolled: 567 },
];

const statsData = [
  { category: 'Courses', value: '120+', label: 'Available Courses', description: 'Self-paced and instructor-led courses across all competency areas', growth: '28%', metric: 'YoY growth' },
  { category: 'Learners', value: '8,400', label: 'Active Learners', description: 'Professionals currently enrolled in at least one training program', growth: '45%', metric: 'vs prior year' },
  { category: 'Completion', value: '91%', label: 'Completion Rate', description: 'Average course completion rate across all training programs', growth: '+8pp', metric: 'vs 2025' },
  { category: 'Certification', value: '2,100', label: 'Certifications Earned', description: 'Professional certifications awarded upon successful completion', growth: '62%', metric: 'YoY growth' },
];

// ─── Demo Component ─────────────────────────────────────────

export function TemplateDemoContent() {
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
          <h1 className="text-3xl font-normal">Template Demo — "Training" Pillar</h1>
          <span className="px-2 py-0.5 text-[10px] font-medium bg-[var(--brand-red)]/10 text-[var(--brand-red)] rounded">Template</span>
        </div>
        <p className="text-sm text-black/70 mb-4">
          A hypothetical new pillar assembled <strong>entirely via ProductPageTemplate</strong> — zero custom 
          layout code. All 5 organism zones + 1 bespoke slot rendered from config objects. This proves a new 
          Product page can be spun up in ~80 lines of configuration.
        </p>
        <div className="flex gap-3 mb-6">
          <Button variant="secondary" size="sm" icon={<RefreshCw size={14} />} onClick={simulateLoading}>
            Simulate Loading
          </Button>
          <div className="flex items-center gap-2 text-xs text-black/40">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            {loading ? 'Loading...' : 'Ready'}
          </div>
        </div>

        {/* Code comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-black/8 rounded-[5px] p-4">
            <h4 className="text-xs font-mono text-black/40 mb-2">MANUAL COMPOSITION (Report Store Demo)</h4>
            <p className="text-xs text-black/60">
              ~350 lines — imports each organism individually, wraps in SectionWrapper, manages layout manually, 
              handles all className strings and spacing.
            </p>
          </div>
          <div className="bg-black text-white rounded-[5px] p-4">
            <h4 className="text-xs font-mono text-white/40 mb-2">TEMPLATE COMPOSITION (This Demo)</h4>
            <p className="text-xs text-white/70">
              ~80 lines of config — passes objects to ProductPageTemplate, organisms render automatically, 
              bespoke content injected via slots. Same visual output.
            </p>
          </div>
        </div>
      </div>

      {/* Page Preview Container */}
      <div className="border border-black/10 rounded-[5px] overflow-hidden shadow-sm">
        <ProductPageTemplate
          hero={{
            label: 'Training',
            title: 'Professional Development Hub',
            subtitle: 'Access 120+ courses across research, consulting, and data skills. Earn certifications and advance your career.',
            searchPlaceholder: 'Search courses by topic, skill, or instructor...',
            badges: ['120+ Courses', '8,400 Learners', '91% Completion', '14 Tracks'],
          }}
          featured={{
            label: 'Featured',
            title: 'Popular Courses',
            subtitle: 'Most enrolled courses this quarter across all skill tracks',
            ctaText: 'View all courses',
            children: featuredCourses.map((course) => (
              <div key={course.id} className="flex-shrink-0" style={{ width: '300px' }}>
                <CourseCard {...course} layout="grid" />
              </div>
            )),
          }}
          stats={{
            label: 'Learning Analytics',
            title: 'Program Metrics',
            subtitle: 'Key performance indicators across our professional development program',
            stats: statsData,
            columns: 4,
          }}
          afterStats={
            /* Bespoke: Learning Tracks grid */
            <SectionWrapper background="white" spacing="lg" maxWidth="wide" className="border-t border-black/6">
              <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8">
                <SectionHeading
                  label="Tracks"
                  title="Learning Paths"
                  subtitle="Structured multi-course tracks for skill development"
                  endSlot={<CTALink href="#">View all tracks</CTALink>}
                />
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {[
                    { name: 'Research Methods', count: 18 },
                    { name: 'Data Skills', count: 24 },
                    { name: 'Consulting', count: 12 },
                    { name: 'Survey Design', count: 9 },
                    { name: 'Communication', count: 15 },
                    { name: 'Industry Knowledge', count: 22 },
                    { name: 'Leadership', count: 8 },
                    { name: 'Technology', count: 16 },
                  ].map((track) => (
                    <button
                      key={track.name}
                      className="group flex items-center gap-3 p-4 rounded-[5px] border border-black/6 hover:border-black/15 hover:bg-black/[0.02] transition-all cursor-pointer"
                    >
                      <GraduationCap size={16} className="text-[#806ce0] flex-shrink-0" />
                      <div className="text-left">
                        <span className="text-sm text-black/70 group-hover:text-black transition-colors block">{track.name}</span>
                        <span className="text-xs text-black/35 font-mono">{track.count} courses</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </SectionWrapper>
          }
          browse={{
            label: 'Browse',
            title: 'All Courses',
            subtitle: 'Explore our full course catalog',
            items: browseCourses,
            viewMode: viewMode,
            onViewModeChange: (mode: ViewMode) => { setViewMode(mode); simulateLoading(); },
            loading: loading,
            countLabel: 'courses',
            renderCard: (course: typeof browseCourses[0], vm: ViewMode) => (
              <CourseCard key={course.id} {...course} layout={vm} />
            ),
          }}
          cta={{
            label: 'Start Learning',
            title: 'Invest in Your Growth',
            subtitle: 'Join 8,400 professionals advancing their careers through structured learning paths.',
            primaryText: 'Enroll Now',
            primaryIcon: <GraduationCap size={18} />,
            secondaryText: 'Browse Catalog',
          }}
        />
      </div>

      {/* Zone Map */}
      <div className="border border-black/8 rounded-[5px] p-6 bg-[#fafaf9]">
        <h3 className="text-sm font-medium mb-4">ProductPageTemplate Zone Map — 6 Zones Rendered</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { num: 1, name: 'Hero', bg: 'bg-black', text: 'text-white', source: 'hero config' },
            { num: 2, name: 'Featured', bg: 'bg-white border border-black/10', text: 'text-black', source: 'featured config' },
            { num: 3, name: 'Stats', bg: 'bg-[#f5f2f1]', text: 'text-black', source: 'stats config' },
            { num: 4, name: 'Tracks', bg: 'bg-white border border-[#806ce0]/20', text: 'text-black', source: 'afterStats slot' },
            { num: 5, name: 'Browse', bg: 'bg-white border border-black/10', text: 'text-black', source: 'browse config' },
            { num: 6, name: 'CTA', bg: 'bg-black', text: 'text-white', source: 'cta config' },
          ].map((z) => (
            <div key={z.num} className={`rounded-[5px] p-3 ${z.bg} ${z.text}`}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="font-mono text-[10px] opacity-50">{z.num}</span>
                <span className="text-xs font-medium">{z.name}</span>
              </div>
              <p className="text-[10px] opacity-50">{z.source}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-white border border-black/8 rounded-[5px]">
          <p className="text-[11px] text-black/50">
            <strong className="text-black/70">5 zones from config objects</strong> (hero, featured, stats, browse, cta) + 
            <strong className="text-black/70"> 1 bespoke slot</strong> (afterStats → Learning Tracks). 
            Total custom layout code: <strong className="text-black/70">0 lines</strong>. 
            All layout, spacing, SectionWrapper, and SectionHeading handled by the template.
          </p>
        </div>
      </div>

      {/* Badge Comparison */}
      <div className="border border-black/8 rounded-[5px] p-6 bg-[#fafaf9]">
        <h3 className="text-sm font-medium mb-4">Template vs Manual — Side by Side</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-black/8 rounded-[5px] p-4">
            <h4 className="text-xs font-mono text-black/40 mb-2">MANUAL COMPOSITION (Report Store Demo)</h4>
            <p className="text-xs text-black/60">
              ~350 lines — imports each organism individually, wraps in SectionWrapper, manages layout manually, 
              handles all className strings and spacing.
            </p>
          </div>
          <div className="bg-black text-white rounded-[5px] p-4">
            <h4 className="text-xs font-mono text-white/40 mb-2">TEMPLATE COMPOSITION (This Demo)</h4>
            <p className="text-xs text-white/70">
              ~80 lines of config — passes objects to ProductPageTemplate, organisms render automatically, 
              bespoke content injected via slots. Same visual output.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}