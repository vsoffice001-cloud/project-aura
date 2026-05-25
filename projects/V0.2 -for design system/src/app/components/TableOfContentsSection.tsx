import { useState, useRef, useEffect } from 'react';
import { BookOpen, Layers, Building2, ChartColumn, Search, Download, FileText, Target, ClipboardList, ChevronDown, ChevronsUpDown, ChevronsDownUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { StatBadge } from '@/app/components/ui/stat-badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';

interface Chapter {
  id: string;
  number: string;
  title: string;
  page?: number;
  subsections?: Array<{ number: string; title: string; page?: number }>;
}

interface TOCChapterListProps {
  chapters: Chapter[];
  expandedChapters: Set<string>;
  onToggleChapter: (id: string) => void;
}

function TOCChapterList({ chapters, expandedChapters, onToggleChapter }: TOCChapterListProps) {
  return (
    <>
      {chapters.map((chapter) => (
        <div key={chapter.id} className="border-b border-[var(--black-200)] last:border-0">
          <button
            onClick={() => chapter.subsections && onToggleChapter(chapter.id)}
            className="w-full flex items-center gap-3 py-3 px-2 text-left hover:bg-[var(--black-50)]/50 transition-colors"
          >
            {chapter.subsections ? (
              <ChevronDown
                className={`h-4 w-4 text-[var(--black-500)] transition-transform ${ 
                  expandedChapters.has(chapter.id) ? 'rotate-0' : '-rotate-90'
                }`}
              />
            ) : (
              <span className="w-4"></span>
            )}
            <span className="text-xs w-8 text-[var(--black-500)] tabular-nums">{chapter.number}</span>
            <span className="flex-1 text-sm text-foreground hover:font-bold transition-all">
              {chapter.title}
            </span>
          </button>
          {chapter.subsections && expandedChapters.has(chapter.id) && (
            <div className="relative pl-11 pb-2">
              {/* Vertical connecting line - purple style */}
              <div className="absolute left-[26px] top-0 bottom-2 w-[2px] bg-purple-200"></div>
              {chapter.subsections.map((sub, idx) => (
                <div
                  key={idx}
                  className="relative flex items-center gap-2 py-2 px-2 text-sm hover:bg-[var(--black-50)]/30 transition-colors"
                >
                  <span className="text-xs w-8 text-[var(--black-500)] tabular-nums">{sub.number}</span>
                  <span className="flex-1 text-[var(--black-500)] hover:text-foreground hover:font-bold transition-all">{sub.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export function TableOfContentsSection() {
  const [tocSearchQuery, setTocSearchQuery] = useState('');
  const [tocPhaseFilter, setTocPhaseFilter] = useState<'all' | 'assessment' | 'strategy' | 'survey'>('all');
  const [hasThirdCard, setHasThirdCard] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [activePhase, setActivePhase] = useState<1 | 2 | 3 | null>(null);
  const [expandedCard, setExpandedCard] = useState<1 | 2 | 3 | null>(null);

  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);

  const phase1Chapters: Chapter[] = [
    { id: 'ch1', number: '1', title: 'Executive Summary and Approach' },
    { id: 'ch2', number: '2', title: 'Qatar Fresh Herbs Market Overview', subsections: [
      { number: '2.1', title: 'Key Insights and Strategic Recommendations' },
      { number: '2.2', title: 'Qatar Fresh Herbs Market Overview' },
      { number: '2.3', title: 'Definition and Scope' },
      { number: '2.4', title: 'Evolution of Market Ecosystem' },
      { number: '2.5', title: 'Timeline of Key Regulatory Milestones' },
      { number: '2.6', title: 'Value Chain & Stakeholder Mapping' },
      { number: '2.7', title: 'Business Cycle Analysis' },
      { number: '2.8', title: 'Policy & Incentive Landscape' }
    ]},
    { id: 'ch3', number: '3', title: 'Qatar Fresh Herbs Market Analysis', subsections: [
      { number: '3.1', title: 'Growth Drivers' },
      { number: '3.2', title: 'Market Challenges' },
      { number: '3.3', title: 'Market Opportunities' },
      { number: '3.4', title: 'Market Trends' },
      { number: '3.5', title: 'Government Regulation' }
    ]},
    { id: 'ch4', number: '4', title: 'SWOT Analysis' },
    { id: 'ch5', number: '5', title: 'Stakeholder Analysis' },
    { id: 'ch6', number: '6', title: 'Porter\'s Five Forces Analysis' },
    { id: 'ch7', number: '7', title: 'Qatar Fresh Herbs Market Size, 2019-2024', subsections: [
      { number: '7.1', title: 'By Value' },
      { number: '7.2', title: 'By Volume' },
      { number: '7.3', title: 'By Average Selling Price' }
    ]},
    { id: 'ch8', number: '8', title: 'Qatar Fresh Herbs Market Segmentation', subsections: [
      { number: '8.1', title: 'By Type' },
      { number: '8.2', title: 'By End-User' },
      { number: '8.3', title: 'By Distribution Channel' },
      { number: '8.4', title: 'By Packaging Type' },
      { number: '8.5', title: 'By Geographic Distribution' },
      { number: '8.6', title: 'By Organic vs Conventional' },
      { number: '8.7', title: 'By Price Range' }
    ]},
    { id: 'ch9', number: '9', title: 'Qatar Fresh Herbs Market Competitive Analysis', subsections: [
      { number: '9.1', title: 'Market Share of Key Players' },
      { number: '9.2', title: 'Cross Comparison of Key Players' },
      { number: '9.3', title: 'SWOT Analysis of Top Players' },
      { number: '9.4', title: 'Pricing Analysis' },
      { number: '9.5', title: 'Detailed Profile of Major Companies' }
    ]},
    { id: 'ch10', number: '10', title: 'Qatar Fresh Herbs Market End-User Analysis', subsections: [
      { number: '10.1', title: 'Procurement Behavior of Key Ministries' },
      { number: '10.2', title: 'Corporate Spend on Infrastructure & Energy' },
      { number: '10.3', title: 'Pain Point Analysis by End-User Category' },
      { number: '10.4', title: 'User Readiness for Adoption' },
      { number: '10.5', title: 'Post-Deployment ROI and Use Case Expansion' }
    ]},
    { id: 'ch11', number: '11', title: 'Qatar Fresh Herbs Market Future Size, 2025-2030', subsections: [
      { number: '11.1', title: 'By Value' },
      { number: '11.2', title: 'By Volume' },
      { number: '11.3', title: 'By Average Selling Price' }
    ]}
  ];

  const phase2Chapters: Chapter[] = [
    { id: 'ch12', number: '1', title: 'Whitespace Analysis + Business Model Canvas', subsections: [
      { number: '1.1', title: 'Market Gaps Identification' },
      { number: '1.2', title: 'Business Model Development' }
    ]},
    { id: 'ch13', number: '2', title: 'Marketing and Positioning Recommendations', subsections: [
      { number: '2.1', title: 'Branding Strategies' },
      { number: '2.2', title: 'Product USPs' }
    ]},
    { id: 'ch14', number: '3', title: 'Distribution Plan', subsections: [
      { number: '3.1', title: 'Urban Retail vs Rural NGO Tie-ups' }
    ]},
    { id: 'ch15', number: '4', title: 'Channel & Pricing Gaps', subsections: [
      { number: '4.1', title: 'Underserved Routes' },
      { number: '4.2', title: 'Pricing Bands' }
    ]},
    { id: 'ch16', number: '5', title: 'Unmet Demand & Latent Needs', subsections: [
      { number: '5.1', title: 'Category Gaps' },
      { number: '5.2', title: 'Consumer Segments' }
    ]},
    { id: 'ch17', number: '6', title: 'Customer Relationship', subsections: [
      { number: '6.1', title: 'Loyalty Programs' },
      { number: '6.2', title: 'After-sales Service' }
    ]},
    { id: 'ch18', number: '7', title: 'Value Proposition', subsections: [
      { number: '7.1', title: 'Sustainability' },
      { number: '7.2', title: 'Integrated Supply Chains' }
    ]},
    { id: 'ch19', number: '8', title: 'Key Activities', subsections: [
      { number: '8.1', title: 'Regulatory Compliance' },
      { number: '8.2', title: 'Branding' },
      { number: '8.3', title: 'Distribution Setup' }
    ]},
    { id: 'ch20', number: '9', title: 'Entry Strategy Evaluation', subsections: [
      { number: '9.1', title: 'Domestic Market Entry Strategy' },
      { number: '9.2', title: 'Export Entry Strategy' }
    ]},
    { id: 'ch21', number: '10', title: 'Entry Mode Assessment', subsections: [
      { number: '10.1', title: 'JV' },
      { number: '10.2', title: 'Greenfield' },
      { number: '10.3', title: 'M&A' },
      { number: '10.4', title: 'Distributor Model' }
    ]},
    { id: 'ch22', number: '11', title: 'Capital and Timeline Estimation', subsections: [
      { number: '11.1', title: 'Capital Requirements' },
      { number: '11.2', title: 'Timelines' }
    ]},
    { id: 'ch23', number: '12', title: 'Control vs Risk Trade-Off', subsections: [
      { number: '12.1', title: 'Ownership vs Partnerships' }
    ]},
    { id: 'ch24', number: '13', title: 'Profitability Outlook', subsections: [
      { number: '13.1', title: 'Breakeven Analysis' },
      { number: '13.2', title: 'Long-term Sustainability' }
    ]},
    { id: 'ch25', number: '14', title: 'Potential Partner List', subsections: [
      { number: '14.1', title: 'Distributors' },
      { number: '14.2', title: 'JVs' },
      { number: '14.3', title: 'Acquisition Targets' }
    ]},
    { id: 'ch26', number: '15', title: 'Execution Roadmap', subsections: [
      { number: '15.1', title: 'Phased Plan for Market Entry' },
      { number: '15.2', title: 'Key Activities and Milestones' }
    ]}
  ];

  const phase3Chapters: Chapter[] = [
    { id: 'ch27', number: '27', title: 'Survey Methodology', page: 99 },
    { id: 'ch28', number: '28', title: 'Consumer Demographics', page: 101 },
    { id: 'ch29', number: '29', title: 'Purchase Preferences', page: 103 },
    { id: 'ch30', number: '30', title: 'Brand Awareness', page: 105 },
    { id: 'ch31', number: '31', title: 'Price Sensitivity', page: 107 },
    { id: 'ch32', number: '32', title: 'Quality Perceptions', page: 109 },
    { id: 'ch33', number: '33', title: 'Survey Insights Summary', page: 111 }
  ];

  // Accordion behavior - only for 3 phases mode
  const handleCardClick = (phaseNumber: 1 | 2 | 3) => {
    // Only apply accordion logic when in 3-phases mode
    if (hasThirdCard) {
      // Toggle: if clicking the same card, collapse it; otherwise expand the new one
      setExpandedCard(expandedCard === phaseNumber ? null : phaseNumber);
    } else {
      // In 2-phases mode, cards are always expanded (no accordion behavior)
      // Do nothing
    }
  };

  // In 2-phases mode, both cards should be expanded by default
  useEffect(() => {
    if (!hasThirdCard) {
      // 2 phases mode - no accordion, cards show content by default
      setExpandedCard(null); // We'll handle this differently in the JSX
    } else {
      // 3 phases mode - start with first card expanded
      setExpandedCard(1);
    }
  }, [hasThirdCard]);

  const toggleChapter = (id: string) => {
    setExpandedChapters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filterChapters = (chapters: Chapter[]) => {
    if (!tocSearchQuery) return chapters;
    return chapters.filter((chapter) =>
      chapter.title.toLowerCase().includes(tocSearchQuery.toLowerCase())
    );
  };

  const allChaptersExpanded = expandedChapters.size === [...phase1Chapters, ...phase2Chapters, ...phase3Chapters].filter(ch => ch.subsections).length;

  const expandAllChapters = () => {
    const allIds = [...phase1Chapters, ...phase2Chapters, ...phase3Chapters]
      .filter(ch => ch.subsections)
      .map(ch => ch.id);
    setExpandedChapters(new Set(allIds));
  };

  const collapseAllChapters = () => {
    setExpandedChapters(new Set());
  };

  return (
    <section id="table-of-contents" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Dot pattern background */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 'var(--pattern-opacity)',
          backgroundImage: `radial-gradient(circle at var(--pattern-dot-position) var(--pattern-dot-position), hsl(var(--foreground)) var(--pattern-dot-size), transparent 0)`,
          backgroundSize: `var(--pattern-grid-size) var(--pattern-grid-size)`
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-[84.375px] lg:px-[112.5px] relative">
        {/* Section Header */}
        <div className="mb-16">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-[var(--brand-red)] font-bold text-sm tracking-widest uppercase">
              CHAPTER 9 - TABLE OF CONTENTS
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-6 text-foreground">
            Qatar Fresh Herbs Market
            <span className="block text-foreground">Report Structure</span>
          </h2>
          <p className="text-base leading-relaxed max-w-3xl text-[var(--black-600)]">
            Comprehensive coverage across two strategic phases: Market Assessment and Go-To-Market Strategy, providing complete insights from market analysis to execution roadmap.
          </p>
        </div>

        {/* Report Stats */}
        <div className="flex flex-wrap gap-3 mb-8">
          <StatBadge icon={BookOpen} value="82" label="Pages" />
          <StatBadge icon={Layers} value="26" label="Chapters" />
          <StatBadge icon={Building2} value="15" label="Companies Profiled" />
          <StatBadge icon={ChartColumn} value="7" label="Segmentation Types" />
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 print:hidden">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--black-500)]" />
            <input
              className="flex h-10 w-full rounded-md border px-3 py-2 text-base text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[var(--black-500)] transition-colors hover:border-[var(--black-400)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--black-400)] focus-visible:ring-offset-2 focus-visible:border-[var(--black-500)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 bg-white border-[var(--black-200)]"
              placeholder="Search chapters..."
              value={tocSearchQuery}
              onChange={(e) => setTocSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant={tocPhaseFilter === 'all' ? 'ctaBlack' : 'secondary'}
              size="sm"
              onClick={() => setTocPhaseFilter('all')}
            >
              All Phases
            </Button>
            <Button
              variant={tocPhaseFilter === 'assessment' ? 'ctaBlack' : 'secondary'}
              size="sm"
              onClick={() => setTocPhaseFilter('assessment')}
            >
              Assessment
            </Button>
            <Button
              variant={tocPhaseFilter === 'strategy' ? 'ctaBlack' : 'secondary'}
              size="sm"
              onClick={() => setTocPhaseFilter('strategy')}
            >
              Strategy
            </Button>
            <Button
              variant={tocPhaseFilter === 'survey' ? 'ctaBlack' : 'secondary'}
              size="sm"
              onClick={() => setTocPhaseFilter('survey')}
            >
              Survey
            </Button>
            <div className="w-px bg-[var(--black-200)] mx-2 hidden sm:block"></div>
            <Button
              variant="ghost"
              size="sm"
              onClick={allChaptersExpanded ? collapseAllChapters : expandAllChapters}
            >
              {allChaptersExpanded ? <ChevronsDownUp className="h-4 w-4 text-[var(--black-600)]" /> : <ChevronsUpDown className="h-4 w-4 text-[var(--black-600)]" />}
              <span className="hidden sm:inline ml-2">{allChaptersExpanded ? 'Collapse All' : 'Expand All'}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              title="Print / Export"
              onClick={() => window.print()}
            >
              <Download className="h-4 w-4 text-[var(--black-600)]" />
              <span className="hidden sm:inline ml-2">Print / Export</span>
            </Button>
          </div>
        </div>

        {/* Two-Column Layout for Phases */}
        <div className={`grid gap-8 ${
          tocPhaseFilter === 'all' 
            ? (hasThirdCard ? 'grid-cols-1' : 'lg:grid-cols-2')
            : 'grid-cols-1'
        }`}>
          {/* Phase 1: Market Assessment */}
          {(tocPhaseFilter === 'all' || tocPhaseFilter === 'assessment') && (
            <div ref={phase1Ref} data-phase="phase1" className="group">
              <Card className={`bg-white border transition-all duration-500 rounded-[var(--radius-md)] overflow-hidden ${
                hasThirdCard 
                  ? (expandedCard === 1 
                      ? 'border-[var(--purple-300)]' 
                      : 'border-[var(--black-100)] hover:border-[var(--purple-200)] hover:shadow-xl cursor-pointer')
                  : 'border-[var(--black-100)]'
              }`}>
                <CardHeader 
                  className={`border-b border-[var(--black-100)] bg-gradient-to-r from-[var(--purple-200)]/30 to-[var(--purple-200)]/10 pb-4 ${hasThirdCard ? 'cursor-pointer' : ''}`}
                  onClick={() => hasThirdCard && handleCardClick(1)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold leading-none tracking-tight flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[var(--purple-200)]/20 flex items-center justify-center shadow-inner">
                        <FileText className="h-6 w-6 text-[var(--purple-500)]" />
                      </div>
                      <div>
                        <span className="text-[var(--purple-500)] text-xs font-bold uppercase tracking-wider block">Phase 1</span>
                        <span className="text-foreground text-lg">Market Assessment Phase</span>
                      </div>
                    </h3>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[var(--purple-500)]">11</p>
                      <p className="text-xs text-[var(--black-600)]">Chapters</p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--black-600)] mt-3">
                    Comprehensive market overview, analysis, segmentation, competitive landscape, and end-user analysis
                  </p>
                </CardHeader>
                <div 
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    (expandedCard === 1 || !hasThirdCard) 
                      ? 'max-h-[700px] opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <CardContent className="p-0">
                    <div className="max-h-[650px] overflow-y-auto p-4 space-y-0.5 print:max-h-none print:overflow-visible">
                      <TOCChapterList
                        chapters={filterChapters(phase1Chapters)}
                        expandedChapters={expandedChapters}
                        onToggleChapter={toggleChapter}
                      />
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          )}

          {/* Phase 2: Go-To-Market Strategy */}
          {(tocPhaseFilter === 'all' || tocPhaseFilter === 'strategy') && (
            <div ref={phase2Ref} data-phase="phase2" className="group">
              <Card className={`bg-white border transition-all duration-500 rounded-[var(--radius-md)] overflow-hidden ${
                hasThirdCard 
                  ? (expandedCard === 2 
                      ? 'border-[var(--purple-300)]' 
                      : 'border-[var(--black-100)] hover:border-[var(--purple-200)] hover:shadow-xl cursor-pointer')
                  : 'border-[var(--black-100)]'
              }`}>
                <CardHeader 
                  className={`border-b border-[var(--black-100)] bg-gradient-to-r from-[var(--purple-200)]/30 to-[var(--purple-200)]/10 pb-4 ${hasThirdCard ? 'cursor-pointer' : ''}`}
                  onClick={() => hasThirdCard && handleCardClick(2)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold leading-none tracking-tight flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[var(--purple-200)]/20 flex items-center justify-center shadow-inner">
                        <Target className="h-6 w-6 text-[var(--purple-500)]" />
                      </div>
                      <div>
                        <span className="text-[var(--purple-500)] text-xs font-bold uppercase tracking-wider block">Phase 2</span>
                        <span className="text-foreground text-lg">Go-To-Market Strategy Phase</span>
                      </div>
                    </h3>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[var(--purple-500)]">15</p>
                      <p className="text-xs text-[var(--black-600)]">Chapters</p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--black-600)] mt-3">
                    Entry strategy evaluation, execution roadmap, partner recommendations, and profitability outlook
                  </p>
                </CardHeader>
                <div 
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    (expandedCard === 2 || !hasThirdCard) 
                      ? 'max-h-[700px] opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <CardContent className="p-0">
                    <div className="max-h-[650px] overflow-y-auto p-4 space-y-0.5 print:max-h-none print:overflow-visible">
                      <TOCChapterList
                        chapters={filterChapters(phase2Chapters)}
                        expandedChapters={expandedChapters}
                        onToggleChapter={toggleChapter}
                      />
                      
                      {/* Footer items */}
                      <div className="mt-6 pt-4 border-t border-[var(--black-100)]">
                        <div className="flex items-center gap-2 py-2 px-2 text-sm text-[var(--black-600)]">
                          <span className="w-3.5"></span>
                          <span className="text-xs w-8"></span>
                          <span>Disclaimer</span>
                        </div>
                        <div className="flex items-center gap-2 py-2 px-2 text-sm text-[var(--black-600)]">
                          <span className="w-3.5"></span>
                          <span className="text-xs w-8"></span>
                          <span>Contact Us</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          )}

          {/* Phase 3: Survey */}
          {hasThirdCard && (tocPhaseFilter === 'all' || tocPhaseFilter === 'survey') && (
            <div ref={phase3Ref} data-phase="phase3" className="group">
              <Card className={`bg-white border transition-all duration-500 rounded-[var(--radius-md)] overflow-hidden cursor-pointer ${
                expandedCard === 3 
                  ? 'border-[var(--purple-300)]' 
                  : 'border-[var(--black-100)] hover:border-[var(--purple-200)] hover:shadow-xl'
              }`}>
                <CardHeader 
                  className="border-b border-[var(--black-100)] bg-gradient-to-r from-[var(--purple-200)]/30 to-[var(--purple-200)]/10 pb-4 cursor-pointer"
                  onClick={() => handleCardClick(3)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold leading-none tracking-tight flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[var(--purple-200)]/20 flex items-center justify-center shadow-inner">
                        <ClipboardList className="h-6 w-6 text-[var(--purple-500)]" />
                      </div>
                      <div>
                        <span className="text-[var(--purple-500)] text-xs font-bold uppercase tracking-wider block">Phase 3</span>
                        <span className="text-foreground text-lg">Survey Phase</span>
                      </div>
                    </h3>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[var(--purple-500)]">7</p>
                      <p className="text-xs text-[var(--black-600)]">Chapters</p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--black-600)] mt-3">
                    Consumer insights, preferences, and behavioral analysis through comprehensive survey research
                  </p>
                </CardHeader>
                <div 
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    expandedCard === 3 
                      ? 'max-h-[700px] opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <CardContent className="p-0">
                    <div className="max-h-[650px] overflow-y-auto p-4 space-y-0.5 print:max-h-none print:overflow-visible">
                      <TOCChapterList
                        chapters={filterChapters(phase3Chapters)}
                        expandedChapters={expandedChapters}
                        onToggleChapter={toggleChapter}
                      />
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Complete Report Coverage Summary */}
        <div className="mt-8 p-6 rounded-[var(--radius-md)] gradient-card-purple transition-shadow duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Complete Report Coverage</h3>
              <p className="text-sm text-[var(--black-600)]">201+ detailed sections covering every aspect of the Qatar Fresh Herbs Market</p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">143</p>
                <p className="text-sm text-[var(--black-600)]">Assessment Sections</p>
              </div>
              <div className="w-px bg-[var(--black-200)]"></div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">58</p>
                <p className="text-sm text-[var(--black-600)]">Strategy Sections</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}