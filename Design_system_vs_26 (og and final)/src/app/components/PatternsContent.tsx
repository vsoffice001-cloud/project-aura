/**
 * PATTERNS CONTENT
 * Design patterns for layouts, content organization, and backgrounds
 */

export function PageLayoutsContent() {
  return (
    <div className="space-y-12">
      <div className="border border-black/10 rounded-[10px] p-8 bg-[#fafaf9]">
        <h1 className="text-3xl font-normal mb-3">Page Layouts — Display Pages (Case Study)</h1>
        <p className="text-lg text-black/70 mb-4">
          Display pages follow a fixed 10-section editorial sequence alternating Black → White → Warm backgrounds.
          This pattern is used by the <strong>Consulting pillar</strong> for case study showcases.
          For Product page patterns (Report Store), see the <strong>Report Store Pages</strong> sub-tab.
        </p>
        <div className="flex gap-2">
          <span className="px-2 py-0.5 text-[10px] font-medium bg-black/5 rounded-[5px]">Display Pages</span>
          <span className="px-2 py-0.5 text-[10px] font-medium bg-black/5 rounded-[5px]">Consulting Pillar</span>
          <span className="px-2 py-0.5 text-[10px] font-medium bg-black/5 rounded-[5px]">10-Section Fixed</span>
        </div>
      </div>

      {/* 10-Section Sequence Visual */}
      <section>
        <h2 className="text-2xl font-normal mb-6">10-Section Canonical Sequence</h2>
        <div className="space-y-1">
          {[
            { num: 1, name: 'HeroSection', bg: '#000000', text: 'white', label: 'BLACK', note: 'Maximum contrast, editorial drama' },
            { num: 2, name: 'ClientContextSection', bg: '#ffffff', text: 'black', label: 'WHITE', note: 'Clean, readable' },
            { num: 3, name: 'ChallengesSection', bg: '#f5f2f1', text: 'black', label: 'WARM', note: 'Visual break, warmth' },
            { num: 4, name: 'EngagementObjectives', bg: '#ffffff', text: 'black', label: 'WHITE', note: 'Clean' },
            { num: 5, name: 'MethodologySection', bg: '#f5f2f1', text: 'black', label: 'WARM', note: 'Visual break' },
            { num: 6, name: 'ImpactSection', bg: '#ffffff', text: 'black', label: 'WHITE', note: 'Clean' },
            { num: 7, name: 'ValuePillarsSection', bg: '#ffffff', text: 'black', label: 'WHITE + border-t', note: 'Clean (border-t separator)' },
            { num: 8, name: 'TestimonialSection', bg: '#ffffff', text: 'black', label: 'WHITE + border-t', note: 'Clean (border-t separator)' },
            { num: 9, name: 'ResourcesSection', bg: '#0a0a0a', text: 'white', label: 'BLACK (gradient mesh)', note: 'Dark drama, card contrast' },
            { num: 10, name: 'FinalCTASection', bg: '#ffffff', text: 'black', label: 'WHITE + border-t', note: 'Clean (border-t separator)' },
          ].map((section) => (
            <div
              key={section.num}
              className="flex items-center rounded-[5px] overflow-hidden border border-black/8"
              style={{ background: section.bg }}
            >
              <div className="w-10 h-14 flex items-center justify-center flex-shrink-0 bg-black/10">
                <span className="font-mono text-xs" style={{ color: section.text === 'white' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)' }}>
                  {section.num}
                </span>
              </div>
              <div className="flex-1 px-4 py-3 flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold" style={{ color: section.text }}>
                    {section.name}
                  </span>
                  <span className="text-xs ml-3" style={{ color: section.text === 'white' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}>
                    {section.note}
                  </span>
                </div>
                <code className="text-xs font-mono px-2 py-0.5 rounded-[5px]" style={{
                  background: section.text === 'white' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  color: section.text === 'white' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)',
                }}>
                  {section.label}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Type Recipes */}
      <section>
        <h2 className="text-2xl font-normal mb-6">Section Type Recipes</h2>
        <p className="text-sm text-black/60 mb-6">Component-level recipes for building each section type.</p>
        <div className="border border-black/8 rounded-[10px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-black/15 bg-black/[0.02]">
                  <th className="text-left p-3 text-xs font-bold">Type</th>
                  <th className="text-left p-3 text-xs font-bold">Key Components</th>
                  <th className="text-left p-3 text-xs font-bold">Background</th>
                  <th className="text-left p-3 text-xs font-bold">Container</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: 'Hero', components: 'SectionHeading level={1}, dual CTAs (brand + ghost)', bg: 'Black', container: 'content (1000px)' },
                  { type: 'Content + Cards', components: 'SectionLabel, h2, Card in grid', bg: 'White or Warm', container: 'content (1000px)' },
                  { type: 'Methodology', components: 'StepPill badges, sequential steps, connecting lines', bg: 'Warm', container: 'content (1000px)' },
                  { type: 'Metrics', components: 'useCounter hook, big display numbers (Serif), stat cards', bg: 'White', container: 'content (1000px)' },
                  { type: 'Testimonial', components: 'Serif quote italic, attribution, border-t', bg: 'White (border-t)', container: 'narrow (900px)' },
                  { type: 'Resources', components: 'ResourceCard (7 variants), Masonry grid', bg: 'Black (gradient)', container: 'content (1000px)' },
                  { type: 'Final CTA', components: 'Brand button, urgency language, showArrow', bg: 'White (border-t)', container: 'narrow (900px)' },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-black/8 last:border-0">
                    <td className="p-3 text-sm font-semibold">{row.type}</td>
                    <td className="p-3 text-sm text-black/70">{row.components}</td>
                    <td className="p-3">
                      <span className={`text-xs px-2 py-0.5 rounded-[5px] ${
                        row.bg.includes('Black') ? 'bg-black text-white' : 
                        row.bg.includes('Warm') ? 'bg-[#f5f2f1] text-black/70 border border-black/10' : 
                        'bg-white text-black/70 border border-black/10'
                      }`}>{row.bg}</span>
                    </td>
                    <td className="p-3"><code className="text-xs font-mono text-black/60">{row.container}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section Templates */}
      <section>
        <h2 className="text-2xl font-normal mb-6">Section Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-black/8 rounded-[10px] overflow-hidden">
            <div className="bg-black/[0.02] px-4 py-2 border-b border-black/8">
              <span className="text-xs font-semibold">Black Section</span>
            </div>
            <pre className="p-4 text-xs font-mono text-black/70 overflow-x-auto">
{`<section className="bg-black
  text-white py-24">
  <Container width="content">
    {/* Hero, Resources */}
  </Container>
</section>`}
            </pre>
          </div>
          <div className="border border-black/8 rounded-[10px] overflow-hidden">
            <div className="bg-black/[0.02] px-4 py-2 border-b border-black/8">
              <span className="text-xs font-semibold">White Section</span>
            </div>
            <pre className="p-4 text-xs font-mono text-black/70 overflow-x-auto">
{`<section className="bg-white
  py-12 sm:py-16 md:py-20">
  <Container width="content">
    {/* Standard content */}
  </Container>
</section>`}
            </pre>
          </div>
          <div className="border border-black/8 rounded-[10px] overflow-hidden">
            <div className="bg-black/[0.02] px-4 py-2 border-b border-black/8">
              <span className="text-xs font-semibold">Warm Section</span>
            </div>
            <pre className="p-4 text-xs font-mono text-black/70 overflow-x-auto">
{`<section style={{
  background: 'var(--warm-300)'
}} className="py-12 sm:py-16
  md:py-20">
  <Container width="content">
    {/* Challenges, Method */}
  </Container>
</section>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Page Shell Template */}
      <section>
        <h2 className="text-2xl font-normal mb-6">Page Shell Template</h2>
        <p className="text-sm text-black/60 mb-4">Every page wraps sections with these utility components.</p>
        <div className="border border-black/8 rounded-[10px] overflow-hidden">
          <div className="bg-black/[0.02] px-4 py-2 border-b border-black/8">
            <span className="text-xs font-mono text-black/60">tsx</span>
          </div>
          <pre className="p-4 overflow-x-auto bg-black/[0.02]">
            <code className="text-xs font-mono text-black/80">{`import { Navbar } from '@/app/components/Navbar';
import { ReadingProgressBar } from '@/app/components/ReadingProgressBar';
import { ScrollToTop } from '@/app/components/ScrollToTop';
import { StickyCTA } from '@/app/components/StickyCTA';
import { ContactModal } from '@/app/components/ContactModal';

export default function ReportPage() {
  const [showContact, setShowContact] = useState(false);
  return (
    <>
      <ReadingProgressBar />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <ClientContextSection />
        <ChallengesSection />
        {/* ... remaining sections ... */}
        <FinalCTASection />
      </main>
      <ScrollToTop />
      <StickyCTA />
      <ContactModal isOpen={showContact}
        onClose={() => setShowContact(false)} />
    </>
  );
}`}</code>
          </pre>
        </div>
      </section>

      {/* Component Selection Table */}
      <section>
        <h2 className="text-2xl font-normal mb-6">Component Selection Reference</h2>
        <div className="border border-black/8 rounded-[10px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-black/15 bg-black/[0.02]">
                  <th className="text-left p-3 text-xs font-bold">Need</th>
                  <th className="text-left p-3 text-xs font-bold">Component</th>
                  <th className="text-left p-3 text-xs font-bold">Import</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { need: 'Section wrapper', component: 'SectionWrapper', path: '@/app/components/SectionWrapper' },
                  { need: 'Heading with eyebrow', component: 'SectionHeading', path: '@/app/components/SectionHeading' },
                  { need: 'Width constraint', component: 'Container', path: '@/app/components/Container' },
                  { need: 'Content card', component: 'Card', path: '@/app/components/Card' },
                  { need: 'Resource card', component: 'ResourceCard', path: '@/app/components/ResourceCard' },
                  { need: 'CTA button', component: 'Button', path: '@/app/components/Button' },
                  { need: 'Exploratory link', component: 'CTALink', path: '@/app/components/CTALink' },
                  { need: 'Inline link', component: 'InlineLink', path: '@/app/components/InlineLink' },
                  { need: 'Section label', component: 'SectionLabel', path: '@/app/components/Badge' },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-black/8 last:border-0">
                    <td className="p-3 text-sm">{row.need}</td>
                    <td className="p-3 text-sm font-semibold font-mono">{row.component}</td>
                    <td className="p-3"><code className="text-xs font-mono bg-black/5 px-2 py-1 rounded-[5px]">{row.path}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ReportStorePagesContent() {
  return (
    <div className="space-y-12">
      <div className="border border-black/10 rounded-[10px] p-8 bg-[#fafaf9]">
        <h1 className="text-3xl font-normal mb-3">Report Store Pages — Product Pages (Research)</h1>
        <p className="text-lg text-black/70 mb-4">
          Product pages use <strong>flexible, data-driven</strong> section compositions powered by the
          <code className="font-mono text-sm bg-black/5 px-1 rounded-[5px] mx-1">SectionHeading</code> component
          and Report Store molecules. Two modes: <strong>Home</strong> (showcase) and <strong>Listing</strong> (browse/filter).
        </p>
        <div className="flex gap-2">
          <span className="px-2 py-0.5 text-[10px] font-medium bg-[#806ce0]/10 text-[#806ce0] rounded-[5px]">Product Pages</span>
          <span className="px-2 py-0.5 text-[10px] font-medium bg-[#806ce0]/10 text-[#806ce0] rounded-[5px]">Research Pillar</span>
          <span className="px-2 py-0.5 text-[10px] font-medium bg-[#806ce0]/10 text-[#806ce0] rounded-[5px]">Dual-Mode</span>
        </div>
      </div>

      {/* Home Page Sequence */}
      <section>
        <h2 className="text-2xl font-normal mb-2">Home Page — Section Sequence (v4.3)</h2>
        <p className="text-sm text-black/60 mb-6">
          The Report Store homepage is now composed entirely from self-contained organisms.
          Each organism encapsulates its own data, layout, and interactions — no inline prop wiring needed.
          <strong className="ml-1">See the RS Organisms sub-tab for live previews of every component.</strong>
        </p>
        <div className="space-y-1">
          {[
            { num: 1, name: 'ReportStoreHero', bg: '#000000', text: 'white', label: 'BLACK', note: 'Search bar + featured badge + category quick-links', molecule: 'Organism' },
            { num: 2, name: 'QuickAccessBar', bg: '#fafafa', text: 'black', label: 'SUBTLE', note: 'Horizontal action bar: New, Trending, Formats, Regions', molecule: 'Organism' },
            { num: 3, name: 'FeaturedResearch', bg: '#ffffff', text: 'black', label: 'WHITE', note: 'HorizontalScroll + ReportCard featured row', molecule: 'Organism' },
            { num: 4, name: 'KeyMarketIndicators', bg: '#f5f2f1', text: 'black', label: 'WARM', note: 'StatsRow wrapper — 4 market stat cards', molecule: 'Organism → StatsRow' },
            { num: 5, name: 'RecommendedForYou', bg: '#ffffff', text: 'black', label: 'WHITE', note: 'BrowseGrid wrapper — ViewToggle + ReportCard triad', molecule: 'Organism → BrowseGrid' },
            { num: 6, name: 'DailyDataHighlights', bg: '#ffffff', text: 'black', label: 'WHITE + border', note: 'DataHighlightCard grid (4 cards)', molecule: 'Organism' },
            { num: 7, name: 'AnalystPicks', bg: '#f5f2f1', text: 'black', label: 'WARM', note: 'AnalystPickCardB grid (3 expert picks)', molecule: 'Organism' },
            { num: 8, name: 'IndustrySectorsGrid', bg: '#ffffff', text: 'black', label: 'WHITE', note: 'Industry sector cards with icons + report counts', molecule: 'Organism' },
            { num: 9, name: 'ResearchMethodology', bg: '#f5f2f1', text: 'black', label: 'WARM', note: '5-step methodology process (trust-building)', molecule: 'Organism' },
            { num: 10, name: 'CustomResearchCTA', bg: '#000000', text: 'white', label: 'BLACK', note: 'CTABanner wrapper — dual CTA buttons', molecule: 'Organism → CTABanner' },
          ].map((section) => (
            <div
              key={section.num}
              className="flex items-center rounded-[5px] overflow-hidden border border-black/8"
              style={{ background: section.bg }}
            >
              <div className="w-10 h-14 flex items-center justify-center flex-shrink-0 bg-black/10">
                <span className="font-mono text-xs" style={{ color: section.text === 'white' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)' }}>
                  {section.num}
                </span>
              </div>
              <div className="flex-1 px-4 py-3 flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold" style={{ color: section.text }}>
                    {section.name}
                  </span>
                  <span className="text-xs ml-3" style={{ color: section.text === 'white' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}>
                    {section.note}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] px-1.5 py-0.5 rounded-[5px]" style={{
                    background: 'rgba(128, 108, 224, 0.08)',
                    color: '#806ce0',
                  }}>
                    {section.molecule}
                  </span>
                  <code className="text-xs font-mono px-2 py-0.5 rounded-[5px]" style={{
                    background: section.text === 'white' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                    color: section.text === 'white' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)',
                  }}>
                    {section.label}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Listing Page Layout */}
      <section>
        <h2 className="text-2xl font-normal mb-2">Listing Page — Layout Pattern</h2>
        <p className="text-sm text-black/60 mb-6">
          The listing page is a browse/filter experience. Simpler than the home page —
          context banner at top, then a filters + card grid composition.
        </p>

        <div className="border border-black/8 rounded-[10px] overflow-hidden">
          {/* Context Banner */}
          <div className="bg-black p-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-white/40">SECTION 1</span>
                <h4 className="text-white text-sm font-medium mt-1">Context Banner</h4>
                <p className="text-xs text-white/50">Industry/category title + breadcrumbs + result count</p>
              </div>
              <code className="text-xs font-mono text-white/40 bg-white/10 px-2 py-0.5 rounded-[5px]">BLACK</code>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono text-black/40">SECTION 2</span>
                <h4 className="text-sm font-medium mt-1">Filters + Card Grid</h4>
              </div>
              <code className="text-xs font-mono text-black/40 bg-black/5 px-2 py-0.5 rounded-[5px]">WHITE</code>
            </div>

            <div className="flex gap-4">
              {/* Sidebar Filters */}
              <div className="w-48 flex-shrink-0 border border-dashed border-black/15 rounded-[5px] p-3 bg-black/[0.02]">
                <p className="text-xs font-medium text-black/50 mb-3">Filters Panel</p>
                <div className="space-y-2">
                  {['Industry', 'Region', 'Date Range', 'Report Type'].map((f) => (
                    <div key={f} className="text-[10px] px-2 py-1.5 bg-white border border-black/8 rounded-[5px]">
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Grid */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-black/40">Showing 24 of 156 reports</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-1.5 py-0.5 bg-[#806ce0]/10 text-[#806ce0] rounded-[5px]">ViewToggle</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-black/5 rounded-[5px]">Sort: Newest</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="border border-black/8 rounded-[5px] p-2 bg-black/[0.02]">
                      <div className="h-10 bg-black/5 rounded-[2.5px] mb-1.5" />
                      <div className="h-2 bg-black/10 rounded-[2.5px] w-3/4 mb-1" />
                      <div className="h-2 bg-black/5 rounded-[2.5px] w-1/2" />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-3">
                  <span className="text-[10px] text-black/30 border border-black/10 px-3 py-1 rounded-[5px]">Pagination</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Recipe Table */}
      <section>
        <h2 className="text-2xl font-normal mb-6">Organism Architecture (v4.3)</h2>
        <p className="text-sm text-black/60 mb-6">
          Each section is now a self-contained organism. Cross-pillar organisms (StatsRow, BrowseGrid, CTABanner)
          are wrapped by RS-specific organisms that inject the correct data and configuration.
        </p>
        <div className="border border-black/8 rounded-[10px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-black/15 bg-black/[0.02]">
                  <th className="text-left p-3 text-xs font-bold">Organism</th>
                  <th className="text-left p-3 text-xs font-bold">Wraps</th>
                  <th className="text-left p-3 text-xs font-bold">Key Molecules</th>
                  <th className="text-left p-3 text-xs font-bold">Background</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { section: 'ReportStoreHero', wraps: 'Bespoke', molecules: 'Search bar, Badge, CategoryListItem', bg: 'Black' },
                  { section: 'QuickAccessBar', wraps: 'Bespoke', molecules: 'IconBadge', bg: 'Subtle' },
                  { section: 'FeaturedResearch', wraps: 'Bespoke', molecules: 'HorizontalScroll, ReportCard', bg: 'White' },
                  { section: 'KeyMarketIndicators', wraps: 'StatsRow', molecules: 'StatCard (4)', bg: 'Warm' },
                  { section: 'RecommendedForYou', wraps: 'BrowseGrid', molecules: 'ReportCard, ViewToggle, SkeletonCard', bg: 'White' },
                  { section: 'DailyDataHighlights', wraps: 'Bespoke', molecules: 'DataHighlightCard (4)', bg: 'White' },
                  { section: 'AnalystPicks', wraps: 'Bespoke', molecules: 'AnalystPickCardB (3)', bg: 'Warm' },
                  { section: 'IndustrySectorsGrid', wraps: 'Bespoke', molecules: 'IconBadge, Card', bg: 'White' },
                  { section: 'ResearchMethodology', wraps: 'Bespoke', molecules: 'IconBadge (5 steps)', bg: 'Warm' },
                  { section: 'CustomResearchCTA', wraps: 'CTABanner', molecules: 'Button (brand)', bg: 'Black' },
                  { section: 'CardListing', wraps: 'Bespoke', molecules: 'ReportCard, SkeletonCard, EmptyState', bg: 'White' },
                  { section: 'IndustrySidebar', wraps: 'SidebarPanel', molecules: 'FilterIndustryItem', bg: 'White' },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-black/8 last:border-0">
                    <td className="p-3 text-sm font-semibold font-mono">{row.section}</td>
                    <td className="p-3">
                      <span className={`text-xs px-2 py-0.5 rounded-[5px] ${
                        row.wraps === 'Bespoke' ? 'bg-black/5 text-black/50' : 'bg-[#806ce0]/10 text-[#806ce0]'
                      }`}>{row.wraps}</span>
                    </td>
                    <td className="p-3 text-xs text-black/60">{row.molecules}</td>
                    <td className="p-3">
                      <span className={`text-xs px-2 py-0.5 rounded-[5px] ${
                        row.bg.includes('Black') ? 'bg-black text-white' :
                        row.bg.includes('Warm') ? 'bg-[#f5f2f1] text-black/70 border border-black/10' :
                        'bg-white text-black/70 border border-black/10'
                      }`}>{row.bg}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Component Triad Pattern */}
      <section>
        <h2 className="text-2xl font-normal mb-2">Component Triad Pattern</h2>
        <p className="text-sm text-black/60 mb-6">
          The signature v4.1 composition pattern. Three components share a single <code className="font-mono text-xs bg-black/5 px-1 rounded-[5px]">viewMode</code> state.
        </p>

        <div className="border border-black/8 rounded-[5px] p-6 bg-[#fafaf9]">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-black/20 rounded-[5px] flex items-center justify-center mb-2 bg-white">
                <span className="text-xs font-mono text-black/50">VT</span>
              </div>
              <p className="text-xs font-medium">ViewToggle</p>
              <p className="text-[10px] text-black/40">Source of truth</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-px bg-black/20" />
              <span className="text-[10px] text-black/30">viewMode</span>
              <div className="w-12 h-px bg-black/20" />
            </div>
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-[#806ce0]/30 rounded-[5px] flex items-center justify-center mb-2 bg-[#806ce0]/[0.03]">
                <span className="text-xs font-mono" style={{ color: '#806ce0' }}>RC</span>
              </div>
              <p className="text-xs font-medium">ReportCard</p>
              <p className="text-[10px] text-black/40">layout={'{viewMode}'}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-px bg-black/20" />
              <span className="text-[10px] text-black/30">mirrors</span>
              <div className="w-12 h-px bg-black/20" />
            </div>
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-black/10 rounded-[5px] flex items-center justify-center mb-2 bg-white">
                <span className="text-xs font-mono text-black/30">SK</span>
              </div>
              <p className="text-xs font-medium">SkeletonCard</p>
              <p className="text-[10px] text-black/40">variant={'{viewMode}'}</p>
            </div>
          </div>

          <div className="border border-black/8 rounded-[10px] overflow-hidden bg-white">
            <div className="bg-black/5 px-4 py-2 border-b border-black/8">
              <span className="text-xs font-mono text-black/60">tsx</span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-xs font-mono text-black/80">{`// Component Triad — shared viewMode state
const [viewMode, setViewMode] = useState<ViewMode>('grid');
const [loading, setLoading] = useState(false);

return (
  <>
    {/* 1. ViewToggle — source of truth */}
    <ViewToggle
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      count={reports.length}
    />

    {/* 2. ReportCard or 3. SkeletonCard — layout mirrors viewMode */}
    <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex flex-col gap-3'}>
      {loading
        ? Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} variant={viewMode} />
          ))
        : reports.map((r) => (
            <ReportCard key={r.id} {...r} layout={viewMode} />
          ))
      }
    </div>
  </>
);`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Hero Template Pattern */}
      <section>
        <h2 className="text-2xl font-normal mb-2">Hero Template Pattern</h2>
        <p className="text-sm text-black/60 mb-6">
          Heroes use a reusable template pattern — same structure, different content per pillar.
          Not a per-pillar organism. Configure via props, not subclassing.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="border border-black/8 rounded-[5px] p-5">
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-black" />
              Case Study Hero (Display)
            </h4>
            <ul className="space-y-1.5 text-xs text-black/60">
              <li>&bull; Full-bleed black background</li>
              <li>&bull; Bespoke h1 with inline subtitle</li>
              <li>&bull; Client logo + project date</li>
              <li>&bull; Dual CTA: brand + ghost</li>
              <li>&bull; ReadingProgressBar integration</li>
              <li>&bull; No search, no filters</li>
            </ul>
          </div>
          <div className="border border-[#806ce0]/20 rounded-[5px] p-5 bg-[#806ce0]/[0.02]">
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: '#806ce0' }} />
              Report Store Hero (Product)
            </h4>
            <ul className="space-y-1.5 text-xs text-black/60">
              <li>&bull; Full-bleed black background</li>
              <li>&bull; SectionHeading with eyebrow label</li>
              <li>&bull; Search bar with industry filter</li>
              <li>&bull; Featured badge / trending count</li>
              <li>&bull; Single CTA: "Browse All Reports"</li>
              <li>&bull; Category quick-links row</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 p-4 bg-black/[0.02] border border-black/8 rounded-[5px]">
          <p className="text-xs text-black/50">
            <strong>Key insight:</strong> Both heroes share: black background, Container width="content", 
            py-24 padding, Serif display title, CTA row. The difference is content slots, not component structure.
            A single <code className="font-mono bg-black/5 px-1 rounded-[5px]">HeroTemplate</code> component 
            will accept slot props for left/right content areas, search bar, and badge overlay.
          </p>
        </div>
      </section>

      {/* Component Selection Table */}
      <section>
        <h2 className="text-2xl font-normal mb-6">Component Selection Reference (v4.3)</h2>
        <div className="border border-black/8 rounded-[10px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-black/15 bg-black/[0.02]">
                  <th className="text-left p-3 text-xs font-bold">Need</th>
                  <th className="text-left p-3 text-xs font-bold">Component</th>
                  <th className="text-left p-3 text-xs font-bold">Level</th>
                  <th className="text-left p-3 text-xs font-bold">Import</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { need: 'Icon in tinted container', component: 'IconBadge', level: 'Atom', path: '@/app/components/IconBadge' },
                  { need: 'Category row with count', component: 'CategoryListItem', level: 'Atom', path: '@/app/components/CategoryListItem' },
                  { need: 'Category navigation card', component: 'CategoryListCard', level: 'Molecule', path: '@/app/components/molecules' },
                  { need: 'Infinite scroll trigger', component: 'LoadMoreSentinel', level: 'Molecule', path: '@/app/components/molecules' },
                  { need: 'Report card (grid/list)', component: 'ReportCard', level: 'Molecule', path: '@/app/components/molecules' },
                  { need: 'Market indicator card', component: 'StatCard', level: 'Molecule', path: '@/app/components/molecules' },
                  { need: 'Daily data point card', component: 'DataHighlightCard', level: 'Molecule', path: '@/app/components/molecules' },
                  { need: 'Expert pick card', component: 'AnalystPickCardB', level: 'Molecule', path: '@/app/components/molecules' },
                  { need: 'Loading placeholder', component: 'SkeletonCard', level: 'Molecule', path: '@/app/components/molecules' },
                  { need: 'Zero-result state', component: 'EmptyState', level: 'Molecule', path: '@/app/components/molecules' },
                  { need: 'RS hero section', component: 'ReportStoreHero', level: 'Organism', path: '@/app/components/organisms' },
                  { need: 'Featured scroll row', component: 'FeaturedResearch', level: 'Organism', path: '@/app/components/organisms' },
                  { need: 'Market stats row', component: 'KeyMarketIndicators', level: 'Organism', path: '@/app/components/organisms' },
                  { need: 'Recommended grid', component: 'RecommendedForYou', level: 'Organism', path: '@/app/components/organisms' },
                  { need: 'Quick action bar', component: 'QuickAccessBar', level: 'Organism', path: '@/app/components/organisms' },
                  { need: 'CTA bottom section', component: 'CustomResearchCTA', level: 'Organism', path: '@/app/components/organisms' },
                  { need: 'Listing toolbar', component: 'ListingToolbar', level: 'Organism', path: '@/app/components/organisms' },
                  { need: 'Card grid + pagination', component: 'CardListing', level: 'Organism', path: '@/app/components/organisms' },
                  { need: 'Sidebar with filters', component: 'IndustrySidebar', level: 'Organism', path: '@/app/components/organisms' },
                  { need: 'Filter state management', component: 'useReportFilters', level: 'Hook', path: '@/app/hooks' },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-black/8 last:border-0">
                    <td className="p-3 text-sm">{row.need}</td>
                    <td className="p-3 text-sm font-semibold font-mono">{row.component}</td>
                    <td className="p-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-[5px] ${
                        row.level === 'Atom' ? 'bg-amber-100 text-amber-700' :
                        row.level === 'Molecule' ? 'bg-pink-100 text-pink-700' :
                        row.level === 'Organism' ? 'bg-[#806ce0]/10 text-[#806ce0]' :
                        'bg-blue-100 text-blue-700'
                      }`}>{row.level}</span>
                    </td>
                    <td className="p-3"><code className="text-xs font-mono bg-black/5 px-2 py-1 rounded-[5px]">{row.path}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Page Shell Template */}
      <section>
        <h2 className="text-2xl font-normal mb-6">Page Shell Template (v4.3 — Organism Composition)</h2>
        <p className="text-sm text-black/60 mb-4">
          v4.3 organisms are self-contained — no prop wiring needed at the template level.
          Just compose them in sequence. The template only manages <code className="font-mono text-xs bg-black/5 px-1 rounded-[5px]">mode</code> switching.
        </p>
        <div className="border border-black/8 rounded-[10px] overflow-hidden">
          <div className="bg-black/[0.02] px-4 py-2 border-b border-black/8">
            <span className="text-xs font-mono text-black/60">ReportStorePage.tsx (v4.3)</span>
          </div>
          <pre className="p-4 overflow-x-auto bg-black/[0.02]">
            <code className="text-xs font-mono text-black/80">{`import {
  ReportStoreHero, QuickAccessBar, FeaturedResearch,
  KeyMarketIndicators, RecommendedForYou,
  DailyDataHighlights, AnalystPicks,
  IndustrySectorsGrid, ResearchMethodology,
  CustomResearchCTA,
  // Listing organisms:
  ListingToolbar, CardListing, IndustrySidebar, FiltersPanel,
} from '@/app/components/organisms';

// HOME MODE — all organisms self-contained:
<ReportStoreHero />
<QuickAccessBar onActionClick={() => setMode('listing')} />
<FeaturedResearch />
<KeyMarketIndicators />      {/* wraps StatsRow */}
<RecommendedForYou />         {/* wraps BrowseGrid */}
<DailyDataHighlights />
<AnalystPicks />
<IndustrySectorsGrid onSectorClick={() => setMode('listing')} />
<ResearchMethodology />
<CustomResearchCTA />         {/* wraps CTABanner */}

// LISTING MODE — sidebar + toolbar + card grid:
<IndustrySidebar filters={filters} />
<ListingToolbar resultCount={filters.filtered.length} ... />
<CardListing items={filters.paginated} viewMode={viewMode} ... />`}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}

export function SurveysPagesContent() {
  return (
    <div className="space-y-12">
      <div className="border border-black/10 rounded-[10px] p-8 bg-[#fafaf9]">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-normal">Surveys Pages — Product Pages (Surveys)</h1>
          <span className="px-2 py-0.5 text-[10px] font-medium bg-[#806ce0]/10 text-[#806ce0] rounded-[5px]">Molecules Built</span>
        </div>
        <p className="text-lg text-black/70 mb-4">
          The Surveys pillar follows the same <strong>Product page</strong> pattern as Research — dual-mode 
          (home + listing), SectionHeading-driven, with ViewToggle + card compositions. Survey-specific 
          molecules are planned but not yet built.
        </p>
        <div className="flex gap-2">
          <span className="px-2 py-0.5 text-[10px] font-medium bg-[#806ce0]/10 text-[#806ce0] rounded-[5px]">Product Pages</span>
          <span className="px-2 py-0.5 text-[10px] font-medium bg-[#806ce0]/10 text-[#806ce0] rounded-[5px]">Surveys Pillar</span>
          <span className="px-2 py-0.5 text-[10px] font-medium bg-amber-100 text-amber-700 rounded-[5px]">Planned</span>
        </div>
      </div>

      {/* What We Know */}
      <section>
        <h2 className="text-2xl font-normal mb-6">What We Know</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="border border-black/8 rounded-[5px] p-6">
            <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Confirmed — Shared with Research
            </h3>
            <ul className="space-y-2 text-xs text-black/60">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span>Product page type — SectionHeading-driven, not bespoke</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span>Dual-mode pages — home (showcase) + listing (browse/filter)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span>ViewToggle + SkeletonCard + EmptyState pattern</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span>HorizontalScroll for featured items</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span>Same Container widths, spacing tokens, typography scale</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span>Glass header + Footer + BackToTop shell</span>
              </li>
            </ul>
          </div>
          <div className="border border-green-200 rounded-[5px] p-6 bg-green-50/50">
            <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Built — Survey-Specific (v4.2)
            </h3>
            <ul className="space-y-2 text-xs text-black/60">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span><strong>SurveyCard</strong> — grid+list dual layout, CompletionBadge, response progress bar, category badge</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span><strong>ResponseChart</strong> — CSS-only horizontal bar + donut chart modes, no library dependency</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span><strong>QuestionPreview</strong> — 6 question types with rendered input previews (radio, checkbox, text, rating, number, dropdown)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span><strong>CompletionBadge</strong> — 4 lifecycle states (draft/active/completed/closed) with optional progress counter</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span><strong>SurveySkeleton</strong> — shimmer loading matching SurveyCard grid+list structure</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projected Home Page Sequence */}
      <section>
        <h2 className="text-2xl font-normal mb-2">Projected Home Page Sequence</h2>
        <p className="text-sm text-black/60 mb-6">
          Based on the Report Store pattern. Section names and count may change as the pillar matures.
        </p>
        <div className="space-y-1">
          {[
            { num: 1, name: 'Hero', bg: '#000000', text: 'white', label: 'BLACK', note: 'SectionHeading + search + featured survey badge', status: 'shared' },
            { num: 2, name: 'Featured Surveys', bg: '#ffffff', text: 'black', label: 'WHITE', note: 'SectionHeading + HorizontalScroll + SurveyCard', status: 'built' },
            { num: 3, name: 'Topic Overview', bg: '#f5f2f1', text: 'black', label: 'WARM', note: 'SectionHeading + topic badges + StatCard', status: 'shared' },
            { num: 4, name: 'Popular Surveys', bg: '#ffffff', text: 'black', label: 'WHITE', note: 'SectionHeading + ViewToggle + SurveyCard triad', status: 'built' },
            { num: 5, name: 'Recent Results', bg: '#ffffff', text: 'black', label: 'WHITE + border-t', note: 'SectionHeading + ResponseChart summaries', status: 'built' },
            { num: 6, name: 'CTA', bg: '#ffffff', text: 'black', label: 'WHITE + border-t', note: 'SectionHeading + dual CTA buttons', status: 'shared' },
          ].map((section) => (
            <div
              key={section.num}
              className="flex items-center rounded-[5px] overflow-hidden border border-black/8"
              style={{ background: section.bg }}
            >
              <div className="w-10 h-14 flex items-center justify-center flex-shrink-0 bg-black/10">
                <span className="font-mono text-xs" style={{ color: section.text === 'white' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)' }}>
                  {section.num}
                </span>
              </div>
              <div className="flex-1 px-4 py-3 flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold" style={{ color: section.text }}>
                    {section.name}
                  </span>
                  <span className="text-xs ml-3" style={{ color: section.text === 'white' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}>
                    {section.note}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-[5px] ${
                    section.status === 'shared' 
                      ? 'bg-green-100 text-green-700' 
                      : section.status === 'built'
                      ? 'bg-[#806ce0]/10 text-[#806ce0]'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {section.status === 'shared' ? 'Reuse' : section.status === 'built' ? 'Built v4.2' : 'New molecule'}
                  </span>
                  <code className="text-xs font-mono px-2 py-0.5 rounded-[5px]" style={{
                    background: section.text === 'white' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                    color: section.text === 'white' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)',
                  }}>
                    {section.label}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reuse vs Build Analysis */}
      <section>
        <h2 className="text-2xl font-normal mb-6">Reuse vs Build Analysis</h2>
        <div className="border border-black/8 rounded-[10px] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-black/[0.03]">
                <th className="text-left p-4 font-medium text-black/60 text-xs">Component</th>
                <th className="text-left p-4 font-medium text-xs">Strategy</th>
                <th className="text-left p-4 font-medium text-xs">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/8">
              {[
                ['SectionHeading', 'Reuse as-is', 'Same prop interface, different content'],
                ['ViewToggle', 'Reuse as-is', 'Grid/list toggle works identically'],
                ['SkeletonCard', 'Extend', 'Add variant="survey" matching SurveyCard layout'],
                ['EmptyState', 'Reuse as-is', 'Survey-specific copy via props'],
                ['HorizontalScroll', 'Reuse as-is', 'Featured surveys carousel'],
                ['BackToTop', 'Reuse as-is', 'Utility component, no pillar logic'],
                ['StatCard', 'Reuse as-is', 'Topic stats (response count, avg completion)'],
                ['SurveyCard', 'Built v4.2', 'Grid+list layouts, CompletionBadge, response progress bar'],
                ['ResponseChart', 'Built v4.2', 'CSS-only horizontal bar + donut chart modes'],
                ['QuestionPreview', 'Built v4.2', '6 question types with rendered input previews'],
                ['CompletionBadge', 'Built v4.2', '4 lifecycle states with optional progress counter'],
              ].map(([component, strategy, notes], idx) => (
                <tr key={idx}>
                  <td className="p-4 font-mono text-sm font-medium">{component}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-0.5 rounded-[5px] ${
                      strategy === 'Reuse as-is' ? 'bg-green-100 text-green-700' :
                      strategy === 'Extend' ? 'bg-blue-100 text-blue-700' :
                      strategy?.startsWith('Built') ? 'bg-[#806ce0]/10 text-[#806ce0]' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {strategy}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-black/60">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Design Decisions */}
      <section>
        <h2 className="text-2xl font-normal mb-6">Key Design Decisions (Locked)</h2>
        <div className="space-y-3">
          {[
            { decision: 'Surveys use Product page pattern, not Display', reason: 'Data-driven content model — surveys are browsed/filtered like reports, not read like editorial case studies.' },
            { decision: 'SurveyCard will mirror ReportCard structure', reason: 'Consistent user mental model across Research + Surveys. Grid/list layout with ViewToggle.' },
            { decision: 'Survey-specific molecules live in /molecules/', reason: 'Maintains the hybrid architecture — all domain compositions in molecules barrel.' },
            { decision: 'Framework documented now, molecules built later', reason: 'Per DEVELOPMENT_PLAN_v1.md — foundational info first, implementation deferred to Phase 6+.' },
          ].map((item, idx) => (
            <div key={idx} className="border border-black/8 rounded-[5px] p-5">
              <h4 className="text-sm font-medium mb-1">{item.decision}</h4>
              <p className="text-xs text-black/50">{item.reason}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Next Steps */}
      <section className="border border-amber-200 rounded-[5px] p-6 bg-amber-50/30">
        <h2 className="text-lg font-normal mb-4">Next Steps for Surveys Pillar</h2>
        <div className="space-y-2">
          {[
            { step: 'Define SurveyCard props interface', phase: 'Phase 6', done: false },
            { step: 'Build SurveyCard molecule (grid + list variants)', phase: 'Phase 6', done: false },
            { step: 'Build SurveySkeleton extending SkeletonCard', phase: 'Phase 6', done: false },
            { step: 'Build ResponseChart mini-visualization', phase: 'Phase 7', done: false },
            { step: 'Build QuestionPreview + CompletionBadge', phase: 'Phase 7', done: false },
            { step: 'Create Survey Store home page organism', phase: 'Phase 7', done: false },
            { step: 'Create Survey Store listing page organism', phase: 'Phase 7', done: false },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-[2.5px] border flex items-center justify-center flex-shrink-0 ${
                item.done ? 'bg-green-500 border-green-500' : 'border-black/20'
              }`}>
                {item.done && <span className="text-white text-[10px]">&#10003;</span>}
              </div>
              <span className="text-sm text-black/70 flex-1">{item.step}</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-black/5 rounded-[5px] text-black/40">{item.phase}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function ContentPatternsContent() {
  return (
    <div className="space-y-12">
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-[10px] p-8">
        <h1 className="text-3xl font-normal mb-3">Content Patterns - Composition Patterns</h1>
        <p className="text-lg text-black/70 mb-4">
          Reusable content composition patterns for consistent information architecture.
        </p>
      </div>

      <section className="space-y-8">
        <div className="border border-black/8 rounded-[5px] p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">Feature Block Pattern</h2>
          <div className="border border-black/8 rounded-[5px] p-6 bg-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-[5px] flex items-center justify-center shrink-0">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Feature Title</h3>
                <p className="text-sm text-black/70">Description of the feature explaining its value proposition and key benefits to users.</p>
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-black/60 bg-amber-50 border border-amber-200 rounded-[5px] p-3">
            <strong>PATTERN:</strong> Icon + Title + Description (left-aligned, horizontal layout)
          </div>
        </div>

        <div className="border border-black/8 rounded-[5px] p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">Testimonial Pattern</h2>
          <div className="border border-black/8 rounded-[5px] p-6 bg-warm-50">
            <p className="text-lg italic mb-4" style={{fontFamily: 'var(--font-serif)'}}>
              "This design system transformed our workflow and enabled us to ship features 3x faster."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-black/10 rounded-full"></div>
              <div>
                <p className="font-semibold">Sarah Johnson</p>
                <p className="text-sm text-black/60">Product Designer, Acme Corp</p>
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-black/60 bg-blue-50 border border-blue-200 rounded-[5px] p-3">
            <strong>PATTERN:</strong> Quote (Noto Serif italic) + Avatar + Name + Title
          </div>
        </div>

        <div className="border border-black/8 rounded-[5px] p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">Stats Block Pattern</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border border-black/8 rounded-[5px] p-6 bg-white">
            <div className="text-center">
              <p className="text-4xl font-normal mb-2">50+</p>
              <p className="text-sm text-black/60">Components</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-normal mb-2">7</p>
              <p className="text-sm text-black/60">Categories</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-normal mb-2">100%</p>
              <p className="text-sm text-black/60">Accessible</p>
            </div>
          </div>
          <div className="mt-4 text-sm text-black/60 bg-green-50 border border-green-200 rounded-[5px] p-3">
            <strong>PATTERN:</strong> Large number + Small label (center-aligned, grid layout)
          </div>
        </div>
      </section>

      {/* Report Store Composition Patterns */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-normal mb-2">Report Store Composition Patterns</h2>
          <p className="text-sm text-black/60">Reusable section compositions for Product pages (Research + Surveys).</p>
        </div>

        {/* Card Grid Section Pattern */}
        <div className="border border-black/8 rounded-[5px] p-6 bg-white">
          <h2 className="text-xl font-semibold mb-2">Card Grid Section</h2>
          <p className="text-xs text-black/40 mb-4">Used in: Featured Reports, Recommended, Analyst Picks</p>
          <div className="border border-black/8 rounded-[10px] overflow-hidden bg-[#fafaf9]">
            <div className="px-5 pt-5 pb-3">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <div className="text-[10px] font-mono text-black/30 mb-1">SectionHeading</div>
                  <div className="h-3 w-36 bg-black/10 rounded-[2.5px]" />
                </div>
                <div className="text-[10px] font-mono text-black/30">endSlot (optional)</div>
              </div>
              <div className="h-2 w-56 bg-black/5 rounded-[2.5px] mt-1.5" />
            </div>
            <div className="px-5 pb-5">
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border border-black/8 rounded-[5px] p-3 bg-white">
                    <div className="h-16 bg-black/5 rounded-[2.5px] mb-2" />
                    <div className="h-2 bg-black/10 rounded-[2.5px] w-3/4 mb-1.5" />
                    <div className="h-2 bg-black/5 rounded-[2.5px] w-1/2 mb-2" />
                    <div className="flex gap-1">
                      <div className="h-1.5 w-8 bg-[#806ce0]/20 rounded-[2.5px]" />
                      <div className="h-1.5 w-6 bg-black/5 rounded-[2.5px]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-black/60 bg-[#806ce0]/5 border border-[#806ce0]/15 rounded-[5px] p-3">
            <strong>PATTERN:</strong> SectionHeading + responsive grid (3-col desktop, 2-col tablet, 1-col mobile) + ReportCard/SurveyCard
          </div>
          <div className="mt-2 border border-black/8 rounded-[10px] overflow-hidden">
            <div className="bg-black/[0.02] px-4 py-2 border-b border-black/8">
              <span className="text-xs font-mono text-black/60">tsx</span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-xs font-mono text-black/80">{`<SectionWrapper bg="white">
  <Container width="content">
    <SectionHeading
      label="Featured"
      title="Latest Reports"
      subtitle="Explore our most recent publications"
      endSlot={<CTALink href="/reports">View all</CTALink>}
    />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reports.map((r) => <ReportCard key={r.id} {...r} layout="grid" />)}
    </div>
  </Container>
</SectionWrapper>`}</code>
            </pre>
          </div>
        </div>

        {/* Carousel Section Pattern */}
        <div className="border border-black/8 rounded-[5px] p-6 bg-white">
          <h2 className="text-xl font-semibold mb-2">Carousel Section</h2>
          <p className="text-xs text-black/40 mb-4">Used in: Featured Reports (alt), Trending Stats</p>
          <div className="border border-black/8 rounded-[10px] overflow-hidden bg-[#fafaf9]">
            <div className="px-5 pt-5 pb-3">
              <div className="text-[10px] font-mono text-black/30 mb-1">SectionHeading</div>
              <div className="h-3 w-28 bg-black/10 rounded-[2.5px]" />
            </div>
            <div className="px-5 pb-5">
              <div className="flex items-center gap-2">
                <div className="text-[10px] text-black/20">&lt;</div>
                <div className="flex gap-3 flex-1 overflow-hidden">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border border-black/8 rounded-[5px] p-3 bg-white flex-shrink-0" style={{ width: '30%' }}>
                      <div className="h-12 bg-black/5 rounded-[2.5px] mb-2" />
                      <div className="h-2 bg-black/10 rounded-[2.5px] w-3/4 mb-1" />
                      <div className="h-2 bg-black/5 rounded-[2.5px] w-1/2" />
                    </div>
                  ))}
                </div>
                <div className="text-[10px] text-black/20">&gt;</div>
              </div>
              <div className="text-[10px] font-mono text-black/20 text-center mt-2">HorizontalScroll + ScrollFade</div>
            </div>
          </div>
          <div className="mt-4 text-sm text-black/60 bg-blue-50 border border-blue-200 rounded-[5px] p-3">
            <strong>PATTERN:</strong> SectionHeading + HorizontalScroll wrapper + ScrollFade edges + cards in flex row
          </div>
          <div className="mt-2 border border-black/8 rounded-[10px] overflow-hidden">
            <div className="bg-black/[0.02] px-4 py-2 border-b border-black/8">
              <span className="text-xs font-mono text-black/60">tsx</span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-xs font-mono text-black/80">{`<SectionWrapper bg="white">
  <Container width="content">
    <SectionHeading label="Trending" title="Market Stats" />
    <HorizontalScroll>
      {stats.map((s) => <StatCard key={s.id} {...s} />)}
    </HorizontalScroll>
  </Container>
</SectionWrapper>`}</code>
            </pre>
          </div>
        </div>

        {/* Triad Section Pattern */}
        <div className="border border-[#806ce0]/20 rounded-[5px] p-6 bg-[#806ce0]/[0.02]">
          <h2 className="text-xl font-semibold mb-2">Triad Section (ViewToggle + Cards + Skeleton)</h2>
          <p className="text-xs text-black/40 mb-4">Used in: Recommended, Browse Grid (listing page)</p>
          <div className="border border-black/8 rounded-[10px] overflow-hidden bg-[#fafaf9]">
            <div className="px-5 pt-5 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-black/30 mb-1">SectionHeading</div>
                  <div className="h-3 w-32 bg-black/10 rounded-[2.5px]" />
                </div>
                <div className="flex items-center gap-1 border border-black/10 rounded-full px-2 py-1">
                  <div className="w-5 h-4 bg-black/10 rounded-[2.5px] text-[8px] flex items-center justify-center text-black/30">grid</div>
                  <div className="w-5 h-4 bg-white rounded-[2.5px] text-[8px] flex items-center justify-center text-black/20">list</div>
                </div>
              </div>
            </div>
            <div className="px-5 pb-5">
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border border-[#806ce0]/15 rounded-[5px] p-3 bg-white">
                    <div className="h-14 bg-[#806ce0]/5 rounded-[2.5px] mb-2" />
                    <div className="h-2 bg-[#806ce0]/10 rounded-[2.5px] w-3/4 mb-1" />
                    <div className="h-2 bg-[#806ce0]/5 rounded-[2.5px] w-1/2" />
                  </div>
                ))}
              </div>
              <div className="text-[10px] font-mono text-[#806ce0]/40 text-center mt-2">
                ViewToggle controls layout, SkeletonCard mirrors layout during loading
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-black/60 bg-[#806ce0]/5 border border-[#806ce0]/15 rounded-[5px] p-3">
            <strong>TRIAD PATTERN:</strong> ViewToggle (state source) + ReportCard (layout={'{viewMode}'}) + SkeletonCard (variant={'{viewMode}'}) — all three share one viewMode state.
          </div>
          <div className="mt-2 border border-black/8 rounded-[10px] overflow-hidden">
            <div className="bg-black/[0.02] px-4 py-2 border-b border-black/8">
              <span className="text-xs font-mono text-black/60">tsx</span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-xs font-mono text-black/80">{`<SectionWrapper bg="white">
  <Container width="content">
    <div className="flex items-center justify-between mb-6">
      <SectionHeading label="Browse" title="Recommended" />
      <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} count={count} />
    </div>
    <div className={viewMode === 'grid'
      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
      : 'flex flex-col gap-4'
    }>
      {loading
        ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} variant={viewMode} />)
        : reports.map((r) => <ReportCard key={r.id} {...r} layout={viewMode} />)
      }
    </div>
  </Container>
</SectionWrapper>`}</code>
            </pre>
          </div>
        </div>

        {/* Organism Composition */}
        <div className="border border-black/8 rounded-[5px] p-6 bg-white">
          <h2 className="text-xl font-semibold mb-2">Organism Composition</h2>
          <p className="text-sm text-black/60 mb-6">
            Product page organisms compose SectionWrapper + SectionHeading + molecules into reusable section templates.
            Each organism is pillar-agnostic — swap the card component and data to use across Research or Surveys.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* ProductHero */}
            <div className="border border-black/8 rounded-[10px] overflow-hidden">
              <div className="bg-black text-white p-4">
                <div className="text-[8px] text-white/30 uppercase tracking-wider mb-1">SectionHeading</div>
                <div className="h-2 bg-white/20 rounded-[2.5px] w-1/4 mb-1" />
                <div className="h-3 bg-white/30 rounded-[2.5px] w-3/4 mb-1" />
                <div className="h-2 bg-white/10 rounded-[2.5px] w-full mb-3" />
                <div className="h-6 bg-white/5 rounded-[5px] border border-white/10 mb-2" />
                <div className="flex gap-1">
                  {[1,2,3].map(i => <div key={i} className="h-3 w-12 bg-white/10 rounded-full" />)}
                </div>
              </div>
              <div className="p-3 bg-[#fafaf9] text-center">
                <span className="text-xs font-medium">ProductHero</span>
              </div>
            </div>

            {/* FeaturedCarousel */}
            <div className="border border-black/8 rounded-[10px] overflow-hidden">
              <div className="bg-white p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="h-1.5 bg-black/10 rounded-[2.5px] w-10 mb-1" />
                    <div className="h-2.5 bg-black/15 rounded-[2.5px] w-20" />
                  </div>
                  <div className="h-2 bg-[#806ce0]/20 rounded-[2.5px] w-10" />
                </div>
                <div className="flex gap-2 overflow-hidden">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex-shrink-0 w-20 border border-black/6 rounded-[5px] p-1.5">
                      <div className="h-8 bg-black/5 rounded-[2.5px] mb-1" />
                      <div className="h-1.5 bg-black/8 rounded-[2.5px] w-3/4" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-[#fafaf9] text-center border-t border-black/6">
                <span className="text-xs font-medium">FeaturedCarousel</span>
              </div>
            </div>

            {/* StatsRow */}
            <div className="border border-black/8 rounded-[10px] overflow-hidden">
              <div className="bg-[#f5f2f1] p-4">
                <div className="mb-3">
                  <div className="h-1.5 bg-black/10 rounded-[2.5px] w-10 mb-1" />
                  <div className="h-2.5 bg-black/15 rounded-[2.5px] w-16" />
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="bg-white rounded-[5px] p-1.5 border border-black/6">
                      <div className="h-3 bg-black/10 rounded-[2.5px] w-1/2 mb-0.5" />
                      <div className="h-1.5 bg-black/5 rounded-[2.5px] w-3/4" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-[#fafaf9] text-center border-t border-black/6">
                <span className="text-xs font-medium">StatsRow</span>
              </div>
            </div>

            {/* CTABanner */}
            <div className="border border-black/8 rounded-[10px] overflow-hidden">
              <div className="bg-black text-white p-4 text-center">
                <div className="h-1.5 bg-white/15 rounded-[2.5px] w-10 mx-auto mb-1" />
                <div className="h-2.5 bg-white/25 rounded-[2.5px] w-24 mx-auto mb-1" />
                <div className="h-1.5 bg-white/10 rounded-[2.5px] w-32 mx-auto mb-3" />
                <div className="flex justify-center gap-2">
                  <div className="h-5 w-16 rounded-[5px]" style={{ background: 'var(--brand-red)' }} />
                  <div className="h-5 w-14 border border-white/20 rounded-[5px]" />
                </div>
              </div>
              <div className="p-3 bg-[#fafaf9] text-center border-t border-black/6">
                <span className="text-xs font-medium">CTABanner</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-black/60 bg-[#806ce0]/5 border border-[#806ce0]/15 rounded-[5px] p-3">
            <strong>COMPOSITION:</strong> Organisms compose atoms + molecules into section-level building blocks.
            A Product page is assembled by stacking organisms: ProductHero → FeaturedCarousel → StatsRow → [content sections] → CTABanner.
            Each organism handles its own SectionWrapper background, spacing, and max-width.
          </div>
        </div>

        {/* Listing Page Pattern */}
        <div className="border border-black/8 rounded-[5px] p-6 bg-white">
          <h2 className="text-xl font-semibold mb-2">Listing Page Pattern</h2>
          <p className="text-sm text-black/60 mb-6">
            Reusable structural pattern for browsing/filtering product catalogs. Both pillars share the same 4-zone layout
            with pillar-specific card components and filter dimensions swapped in.
          </p>
          <div className="border border-black/8 rounded-[10px] overflow-hidden">
            {/* Layout diagram */}
            <div className="p-5 bg-[#fafaf9]">
              <div className="border border-black/10 rounded-[10px] overflow-hidden bg-white">
                {/* Header zone */}
                <div className="border-b border-black/6 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-20 bg-black/10 rounded-[2.5px]" />
                    <div className="text-[8px] text-black/30">search + pills</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-12 bg-black/10 rounded-[2.5px] text-[8px] flex items-center justify-center text-black/20">sort</div>
                    <div className="h-3 w-12 bg-black/10 rounded-[2.5px] text-[8px] flex items-center justify-center text-black/20">filters</div>
                    <div className="h-3 w-14 bg-[#806ce0]/10 rounded-[2.5px] text-[8px] flex items-center justify-center text-[#806ce0]/40">toggle</div>
                  </div>
                </div>
                {/* Body */}
                <div className="flex">
                  {/* Sidebar */}
                  <div className="w-28 border-r border-black/6 p-3 space-y-2">
                    <div className="text-[7px] text-black/30 uppercase">Dimension 1</div>
                    {[1,2,3].map(i => <div key={i} className="h-2 bg-black/5 rounded-[2.5px]" />)}
                    <div className="text-[7px] text-black/30 uppercase mt-2">Dimension 2</div>
                    {[1,2].map(i => <div key={i} className="h-2 bg-black/5 rounded-[2.5px]" />)}
                  </div>
                  {/* Cards */}
                  <div className="flex-1 p-3">
                    <div className="grid grid-cols-3 gap-2">
                      {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="border border-[#806ce0]/10 rounded-[5px] p-2 bg-[#806ce0]/[0.02]">
                          <div className="h-6 bg-[#806ce0]/5 rounded-[2.5px] mb-1" />
                          <div className="h-1.5 bg-[#806ce0]/8 rounded-[2.5px] w-3/4 mb-0.5" />
                          <div className="h-1.5 bg-[#806ce0]/5 rounded-[2.5px] w-1/2" />
                        </div>
                      ))}
                    </div>
                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="h-1.5 w-16 bg-black/5 rounded-[2.5px]" />
                      <div className="flex gap-1">
                        {[1,2,3].map(i => (
                          <div key={i} className={`w-4 h-4 rounded-[2.5px] text-[7px] flex items-center justify-center ${i===1 ? 'bg-black text-white' : 'bg-black/5 text-black/30'}`}>{i}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-[10px] font-mono text-black/30 text-center mt-2">
                4-zone layout: Header → Sidebar + Card Grid + Pagination
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-black/60 bg-[#806ce0]/5 border border-[#806ce0]/15 rounded-[5px] p-3">
            <strong>LISTING PATTERN:</strong> Header (search + sort + filters toggle + ViewToggle) → Sidebar (N filter dimensions + stats) → Card grid/list (Card + Skeleton triad) → Pagination (prev/next + numbered + result range). Both Report Store and Surveys use this identical layout with swapped card components and filter dimensions.
          </div>
        </div>

        {/* Display vs Product Quick Reference */}
        <div className="border border-black/8 rounded-[5px] p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">Display vs Product: Pattern Quick Reference</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-black rounded-[5px] p-5">
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-black" />
                Display (Consulting)
              </h4>
              <div className="space-y-2 text-xs text-black/60">
                <div className="flex items-start gap-2">
                  <span className="text-black/30 mt-0.5 flex-shrink-0">Heading:</span>
                  <span>Bespoke inline h1-h3, hand-written per section</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-black/30 mt-0.5 flex-shrink-0">Cards:</span>
                  <span>ResourceCard (7 variants) in masonry/grid</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-black/30 mt-0.5 flex-shrink-0">Scroll:</span>
                  <span>ReadingProgressBar + StickyCTA + vertical flow</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-black/30 mt-0.5 flex-shrink-0">State:</span>
                  <span>Static content, no loading states</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-black/30 mt-0.5 flex-shrink-0">Sections:</span>
                  <span>Fixed 10 in B/W/Warm sequence</span>
                </div>
              </div>
            </div>
            <div className="border border-[#806ce0]/30 rounded-[5px] p-5 bg-[#806ce0]/[0.02]">
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: '#806ce0' }} />
                Product (Research / Surveys)
              </h4>
              <div className="space-y-2 text-xs text-black/60">
                <div className="flex items-start gap-2">
                  <span className="text-black/30 mt-0.5 flex-shrink-0">Heading:</span>
                  <span>SectionHeading component (label + title + subtitle + endSlot)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-black/30 mt-0.5 flex-shrink-0">Cards:</span>
                  <span>ReportCard/SurveyCard + StatCard + DataHighlightCard</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-black/30 mt-0.5 flex-shrink-0">Scroll:</span>
                  <span>HorizontalScroll + BackToTop + grid/list toggle</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-black/30 mt-0.5 flex-shrink-0">State:</span>
                  <span>SkeletonCard loading + EmptyState + ViewToggle</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-black/30 mt-0.5 flex-shrink-0">Sections:</span>
                  <span>Flexible, composable, dual-mode (home / listing)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function BackgroundsContent() {
  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-[10px] p-8">
        <h1 className="text-3xl font-normal mb-3">Background System - Sophisticated Gradient Compositions</h1>
        <p className="text-lg text-black/70 mb-4">
          Premium editorial backgrounds inspired by Apple, Stripe, and Linear - subtle gradients that create depth without overwhelming content.
        </p>
      </div>

      {/* Philosophy & Principles */}
      <section className="bg-blue-50 border border-blue-200 rounded-[10px] p-8">
        <h2 className="text-2xl font-semibold mb-4">🎨 Design Philosophy</h2>
        <div className="space-y-4 text-black/80">
          <p><strong>PRINCIPLE:</strong> Never hinder readability - always subtle, heavily blurred, low opacity</p>
          <p><strong>INSPIRATION:</strong> Apple keynotes, Linear storytelling, Stripe editorial sections, premium case study aesthetics</p>
          <div className="bg-white rounded-[5px] p-4 mt-4">
            <p className="text-sm font-semibold mb-2">Core Rules:</p>
            <ul className="space-y-1 text-sm">
              <li>✅ Use 2-8% opacity maximum for background blobs</li>
              <li>✅ Apply 60-150px blur for soft, diffused effect</li>
              <li>✅ Position strategically (corners, edges, center)</li>
              <li>✅ Always test with black text on top - must remain readable</li>
              <li>✅ Layer multiple gradients for depth</li>
              <li>✅ Use radial-gradient for natural light effects</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4W+H Framework */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-black/8 rounded-[5px] p-6 bg-white">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span className="text-2xl">❓</span> WHAT
          </h3>
          <p className="text-sm text-black/70">
            32+ pre-composed gradient backgrounds using our brand color palette (Warm, Red, Coral, Purple, Periwinkle, Perano) 
            with radial gradients at 2-8% opacity, 60-150px blur radius.
          </p>
        </div>

        <div className="border border-black/8 rounded-[5px] p-6 bg-white">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span className="text-2xl">❓</span> WHY
          </h3>
          <p className="text-sm text-black/70">
            Creates visual rhythm, section differentiation, and premium editorial feel without compromising readability. 
            Follows industry-leading design patterns from Apple, Stripe, and Linear.
          </p>
        </div>

        <div className="border border-black/8 rounded-[5px] p-6 bg-white">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span className="text-2xl">❓</span> WHEN
          </h3>
          <p className="text-sm text-black/70">
            Use gradient backgrounds for: Hero sections, feature blocks, section separation, storytelling moments, 
            premium content areas. Alternate between compositions to create visual rhythm across long pages.
          </p>
        </div>

        <div className="border border-black/8 rounded-[5px] p-6 bg-white">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span className="text-2xl">❌</span> WHEN NOT
          </h3>
          <p className="text-sm text-black/70">
            Avoid on: Text-heavy content blocks, data tables, forms requiring high contrast, 
            sections with complex visual elements, areas where maximum readability is critical.
          </p>
        </div>

        <div className="border border-black/8 rounded-[5px] p-6 bg-white md:col-span-2">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span className="text-2xl">⚙️</span> HOW
          </h3>
          <p className="text-sm text-black/70 mb-3">
            Use CSS variables for complete compositions or combine individual blob components:
          </p>
          <div className="bg-black/5 rounded-[5px] p-3 font-mono text-xs">
            <p>/* Apply complete composition: */</p>
            <p className="text-blue-600">background: var(--bg-composition-warm-editorial);</p>
            <p className="mt-2">/* Or layer individual blobs: */</p>
            <p className="text-blue-600">background: var(--bg-blob-coral-center), var(--bg-blob-warm-subtle-tl), #fffbf9;</p>
          </div>
        </div>
      </section>

      {/* Color Families */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Color Family Strategy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Warm Colors */}
          <div className="border border-black/8 rounded-[5px] p-6 bg-gradient-to-br from-amber-50 to-orange-50">
            <h3 className="font-semibold mb-3 text-amber-900">🔥 WARM PALETTE (Energy, Action)</h3>
            <ul className="space-y-2 text-sm text-amber-900">
              <li>• <strong>Red:</strong> Brand identity, urgency, action</li>
              <li>• <strong>Coral:</strong> Warmth, approachability, creativity</li>
              <li>• <strong>Warm:</strong> Editorial sophistication, premium</li>
            </ul>
            <div className="mt-4 text-xs bg-white/60 rounded-[5px] p-2">
              <strong>USE FOR:</strong> CTAs, hero sections, energy moments
            </div>
          </div>

          {/* Cool Colors */}
          <div className="border border-black/8 rounded-[5px] p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
            <h3 className="font-semibold mb-3 text-blue-900">❄️ COOL PALETTE (Trust, Calm)</h3>
            <ul className="space-y-2 text-sm text-blue-900">
              <li>• <strong>Purple:</strong> Premium, innovation, insights</li>
              <li>• <strong>Periwinkle:</strong> Trust, reliability, stability</li>
              <li>• <strong>Perano:</strong> Calm, professional, clarity</li>
            </ul>
            <div className="mt-4 text-xs bg-white/60 rounded-[5px] p-2">
              <strong>USE FOR:</strong> Data sections, methodology, trust-building
            </div>
          </div>
        </div>
      </section>

      {/* Light Background Compositions */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Light Background Compositions (White Base)</h2>
        <p className="text-sm text-black/60 mb-6">
          Subtle warm backgrounds for storytelling and editorial sections. Base color: #fffbf9 (warmest white)
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Composition Examples */}
          <BackgroundSwatch
            name="Dawn Rising"
            variable="--bg-composition-dawn-rising"
            description="Top-left sunrise - gentle beginning"
            gradient="radial-gradient(circle 900px at 8% 12%, rgba(255, 235, 228, 0.5) 0%, rgba(251, 184, 167, 0.04) 40%, transparent 70%), radial-gradient(circle 700px at 0% 0%, rgba(234, 122, 95, 0.04) 0%, transparent 60%), #fffbf9"
            usage="Section intros, narrative openings"
          />

          <BackgroundSwatch
            name="Center Focus"
            variable="--bg-composition-center-focus"
            description="Problems gathering at center with periwinkle contrast"
            gradient="radial-gradient(circle 1000px at 50% 50%, rgba(255, 235, 228, 0.55) 0%, rgba(251, 184, 167, 0.04) 50%, transparent 80%), radial-gradient(circle 800px at 50% 40%, rgba(195, 198, 249, 0.25) 0%, rgba(195, 198, 249, 0.08) 45%, transparent 75%), #fffbf9"
            usage="Challenges, problem statements"
          />

          <BackgroundSwatch
            name="Radiant Burst"
            variable="--bg-composition-radiant-burst"
            description="Success radiating from center"
            gradient="radial-gradient(circle 1100px at 50% 50%, rgba(255, 235, 228, 0.65) 0%, rgba(251, 184, 167, 0.06) 55%, transparent 85%), radial-gradient(circle 800px at 40% 40%, rgba(234, 122, 95, 0.05) 0%, transparent 75%), #fffbf9"
            usage="Impact sections, results, achievements"
          />

          <BackgroundSwatch
            name="Warm Editorial"
            variable="--bg-composition-warm-editorial"
            description="Default warm tint for subtle separation"
            gradient="radial-gradient(circle 600px at 100% 0%, rgba(249, 247, 246, 0.5) 0%, rgba(249, 247, 246, 0.2) 40%, transparent 70%), radial-gradient(circle 600px at 0% 100%, rgba(234, 229, 227, 0.5) 0%, rgba(234, 229, 227, 0.2) 40%, transparent 70%), #ffffff"
            usage="Standard content sections"
          />

          <BackgroundSwatch
            name="Foundation Build"
            variable="--bg-composition-foundation-build"
            description="Bottom-up structure with periwinkle corners"
            gradient="radial-gradient(circle 1000px at 50% 88%, rgba(255, 235, 228, 0.55) 0%, rgba(251, 184, 167, 0.04) 45%, transparent 75%), radial-gradient(circle 750px at 10% 10%, rgba(223, 234, 250, 0.35) 0%, rgba(195, 198, 249, 0.08) 40%, transparent 70%), #fffbf9"
            usage="Methodology, process sections"
          />

          <BackgroundSwatch
            name="Purple Innovation"
            variable="--bg-composition-purple-innovation"
            description="Premium features with purple accent"
            gradient="radial-gradient(circle 550px at 0% 0%, rgba(128, 108, 224, 0.05) 0%, rgba(128, 108, 224, 0.02) 40%, transparent 70%), radial-gradient(circle 750px at 50% 50%, rgba(128, 108, 224, 0.04) 0%, rgba(128, 108, 224, 0.02) 50%, transparent 80%), #fcfbfe"
            usage="Innovation, premium features"
          />
        </div>
      </section>

      {/* Dark Background Compositions */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Dark Background Compositions (Black Base)</h2>
        <p className="text-sm text-black/60 mb-6">
          Premium dark backgrounds with ember glow effects. Base color: #0a0a0a (slightly lighter than pure black)
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BackgroundSwatch
            name="Ember Rise"
            variable="--bg-composition-ember-rise"
            description="Bottom-left coral warmth, subtle premium feel"
            gradient="radial-gradient(circle 1100px at 15% 85%, rgba(251, 184, 167, 0.05) 0%, rgba(234, 122, 95, 0.03) 35%, transparent 70%), radial-gradient(circle 900px at 0% 100%, rgba(255, 235, 228, 0.04) 0%, transparent 60%), #0a0a0a"
            usage="Dark hero sections, premium blocks"
            dark
          />

          <BackgroundSwatch
            name="Red Accent Glow"
            variable="--bg-composition-red-accent-glow"
            description="Subtle red energy for CTAs"
            gradient="radial-gradient(circle 1200px at 50% 100%, rgba(220, 38, 38, 0.05) 0%, rgba(220, 38, 38, 0.02) 45%, transparent 80%), radial-gradient(circle 800px at 30% 85%, rgba(251, 184, 167, 0.03) 0%, transparent 65%), #0a0a0a"
            usage="Dark CTA sections, urgent moments"
            dark
          />

          <BackgroundSwatch
            name="Center Burst Dark"
            variable="--bg-composition-center-burst-dark"
            description="Radiant from center, hero spotlight"
            gradient="radial-gradient(circle 1300px at 50% 60%, rgba(251, 184, 167, 0.06) 0%, rgba(234, 122, 95, 0.03) 50%, transparent 85%), radial-gradient(circle 1000px at 50% 55%, rgba(220, 38, 38, 0.02) 0%, transparent 75%), #0a0a0a"
            usage="Dark hero sections with focus"
            dark
          />

          <BackgroundSwatch
            name="Dark Purple Premium"
            variable="--bg-composition-dark-purple-premium"
            description="Purple glow for premium dark sections"
            gradient="radial-gradient(circle 800px at 70% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 60%), #000000"
            usage="Premium features on dark"
            dark
          />

          <BackgroundSwatch
            name="Dual Warmth"
            variable="--bg-composition-dual-warmth"
            description="Coral left + Red right, balanced energy"
            gradient="radial-gradient(circle 1000px at 12% 80%, rgba(251, 184, 167, 0.05) 0%, rgba(234, 122, 95, 0.03) 40%, transparent 75%), radial-gradient(circle 950px at 88% 75%, rgba(220, 38, 38, 0.04) 0%, rgba(220, 38, 38, 0.02) 40%, transparent 70%), #0a0a0a"
            usage="Dark sections with energy balance"
            dark
          />

          <BackgroundSwatch
            name="Black Coral Whisper"
            variable="--bg-composition-black-coral-whisper"
            description="Minimal warmth, maximum sophistication"
            gradient="radial-gradient(circle 1400px at 50% 90%, rgba(255, 235, 228, 0.03) 0%, rgba(251, 184, 167, 0.02) 50%, transparent 85%), #000000"
            usage="Sophisticated dark sections, footer"
            dark
          />
        </div>
      </section>

      {/* Best Practices */}
      <section className="bg-green-50 border border-green-200 rounded-[10px] p-8">
        <h2 className="text-2xl font-semibold text-green-900 mb-4">✅ Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-green-900 mb-3">DO:</h3>
            <ul className="space-y-2 text-sm text-green-900">
              <li>✅ Test with actual content - ensure text remains readable</li>
              <li>✅ Use light backgrounds for text-heavy sections</li>
              <li>✅ Alternate compositions for visual rhythm</li>
              <li>✅ Combine warm + cool for contrast storytelling</li>
              <li>✅ Keep opacity 2-8% maximum</li>
              <li>✅ Use blur radius 60-150px for soft diffusion</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-900 mb-3">DON'T:</h3>
            <ul className="space-y-2 text-sm text-red-900">
              <li>❌ Exceed 8% opacity (overwhelms content)</li>
              <li>❌ Use on data tables or forms</li>
              <li>❌ Combine too many colors (3 max per composition)</li>
              <li>❌ Use saturated colors at full opacity</li>
              <li>❌ Skip readability testing</li>
              <li>❌ Use random colors outside brand palette</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="border border-black/8 rounded-[10px] p-8 bg-white">
        <h2 className="text-2xl font-semibold mb-4">🛠️ Implementation Guide</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Method 1: Use Pre-composed Backgrounds</h3>
            <div className="bg-black/5 rounded-[5px] p-4 font-mono text-sm">
              <p className="text-green-600">{'<section style={{ background: "var(--bg-composition-dawn-rising)" }}>'}</p>
              <p className="ml-4">  {'<div className="max-w-[1200px] mx-auto px-8 py-16">'}</p>
              <p className="ml-8">    Content here...</p>
              <p className="ml-4">  {'</div>'}</p>
              <p>{'</section>'}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Method 2: Layer Individual Blobs</h3>
            <div className="bg-black/5 rounded-[5px] p-4 font-mono text-sm">
              <p className="text-blue-600">{'background:'}</p>
              <p className="ml-4">  var(--bg-blob-coral-center),</p>
              <p className="ml-4">  var(--bg-blob-warm-subtle-tl),</p>
              <p className="ml-4">  var(--bg-blob-periwinkle-center),</p>
              <p className="ml-4">  #fffbf9;</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Method 3: Inline Gradient (Custom)</h3>
            <div className="bg-black/5 rounded-[5px] p-4 font-mono text-sm">
              <p className="text-purple-600">{'background:'}</p>
              <p className="ml-4">  {'radial-gradient(circle 800px at 50% 50%,'}</p>
              <p className="ml-4">    {'rgba(234, 122, 95, 0.05) 0%,'}</p>
              <p className="ml-4">    {'transparent 70%),'}</p>
              <p className="ml-4">  #ffffff;</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper Component for Background Swatches
function BackgroundSwatch({ 
  name, 
  variable, 
  description, 
  gradient, 
  usage,
  dark = false 
}: { 
  name: string; 
  variable: string; 
  description: string; 
  gradient: string; 
  usage: string;
  dark?: boolean;
}) {
  return (
    <div className="border border-black/8 rounded-[10px] overflow-hidden hover:shadow-lg transition-shadow">
      <div 
        className="h-32 flex items-center justify-center relative"
        style={{ background: gradient }}
      >
        <span className={`text-xs font-mono ${dark ? 'text-white/60' : 'text-black/40'}`}>
          {name}
        </span>
        {/* Test Text Overlay */}
        <div className={`absolute top-2 left-2 text-xs ${dark ? 'text-white' : 'text-black'}`}>
          Aa
        </div>
      </div>
      <div className="p-4 bg-white">
        <p className="text-sm font-semibold mb-1">{name}</p>
        <p className="text-xs text-black/60 mb-2">{description}</p>
        <code className="text-xs bg-black/5 px-2 py-1 rounded-[5px] block mb-2 font-mono break-all">
          {variable}
        </code>
        <div className="text-xs bg-blue-50 border border-blue-200 rounded-[5px] px-2 py-1">
          <strong>USE:</strong> {usage}
        </div>
      </div>
    </div>
  );
}