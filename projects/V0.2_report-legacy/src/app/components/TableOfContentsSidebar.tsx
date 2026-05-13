import { List, ChevronLeft, Check } from 'lucide-react';
import { useState } from 'react';
import { useScrollSpy } from '@/app/hooks/useScrollSpy';

export function TableOfContentsSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const sections = [
    { number: '1', title: 'Market Overview', time: '5m', id: 'market-overview' },
    { number: '2', title: 'Scope of Report', time: '4m', id: 'scope-of-report' },
    { number: '3', title: 'Market Size & Growth', time: '6m', id: 'market-analysis' },
    { number: '4', title: 'Market Data', time: '5m', id: 'market-data' },
    { number: '5', title: 'Segmentation', time: '7m', id: 'segmentation' },
    { number: '6', title: 'Regional Comparison', time: '4m', id: 'regional' },
    { number: '7', title: 'Growth Drivers & Challenges', time: '5m', id: 'drivers' },
    { number: '8', title: 'Competitive Landscape', time: '6m', id: 'key-players' },
    { number: '9', title: 'Target Audience', time: '4m', id: 'target-audience' },
    { number: '10', title: 'Research Methodology', time: '5m', id: 'methodology' },
    { number: '11', title: 'FAQ', time: '3m', id: 'faq-overview' },
  ];

  const sectionIds = sections.map(s => s.id);
  const activeSection = useScrollSpy(sectionIds, 200);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Account for fixed header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Calculate progress based on active section
  const calculateProgress = () => {
    const activeIndex = sections.findIndex(s => s.id === activeSection);
    if (activeIndex === -1) return 0;
    return ((activeIndex + 1) / sections.length) * 100;
  };

  // Determine section status
  const getSectionStatus = (sectionId: string) => {
    const activeIndex = sections.findIndex(s => s.id === activeSection);
    const currentIndex = sections.findIndex(s => s.id === sectionId);
    
    if (currentIndex < activeIndex) return 'completed';
    if (currentIndex === activeIndex) return 'active';
    return 'upcoming';
  };

  return (
    <>
      {/* Mobile TOC Button */}
      <button
        className="fixed bottom-24 left-4 z-50 lg:hidden rounded-full w-12 h-12 p-0 shadow-lg bg-[#171717] hover:bg-[#171717]/90 text-white inline-flex items-center justify-center gap-2 hover:shadow-md transition-all duration-200"
      >
        <List className="h-5 w-5" />
      </button>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block flex-shrink-0 sticky top-[72px] h-[calc(100vh-72px)] self-start transition-all duration-300 z-40 ${
          isOpen ? 'w-[255px]' : 'w-20'
        }`}
      >
        <div className="bg-white/80 backdrop-blur-xl border border-[#e5e5e5]/50 rounded-none h-full py-4 relative shadow-lg shadow-[#e5e5e5]/10">
          {/* Collapse Button - Positioned at 20% from bottom, half inside and half outside */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute bottom-[20%] -right-4 h-8 w-8 p-0 bg-white hover:bg-[#f5f5f5] rounded-full inline-flex items-center justify-center gap-2 transition-all duration-200 z-[100] shadow-md border border-[#e5e5e5]"
          >
            <ChevronLeft
              className={`h-4 w-4 transition-transform ${isOpen ? '' : 'rotate-180'}`}
            />
          </button>

          {isOpen ? (
            <>
              {/* Header */}
              <div className="flex items-center gap-2 px-4 pb-3 pt-[20px] mb-2 border-b border-[#f5f5f5]">
                <span className="text-sm font-bold text-[#171717] uppercase tracking-wider">
                  Table of Content
                </span>
                <span className="ml-auto text-xs text-[#737373] bg-[#f5f5f5] px-2 py-0.5 rounded-full">
                  56m
                </span>
              </div>

              {/* Navigation */}
              <nav className="space-y-0.5 px-2 overflow-y-auto max-h-[calc(100%-3rem)]">
                {sections.map((section) => {
                  const status = getSectionStatus(section.id);
                  const isCompleted = status === 'completed';
                  const isActive = status === 'active';
                  const isUpcoming = status === 'upcoming';

                  return (
                    <button
                      key={section.number}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-[2.5px] text-sm flex items-center gap-2 group transition-all duration-200 ${
                        isActive
                          ? 'bg-[#f5f5f5] text-[#171717] font-bold'
                          : isCompleted
                          ? 'text-[#171717]/70 hover:bg-[#fafafa] hover:text-[#171717]'
                          : 'text-[#737373]/50 hover:bg-[#fafafa] hover:text-[#171717]'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                        isActive
                          ? 'bg-[#171717] text-white'
                          : isCompleted
                          ? 'bg-[#171717] text-white'
                          : 'bg-[#f5f5f5] text-[#737373]/50'
                      }`}>
                        {isCompleted ? (
                          <Check className="w-3 h-3" strokeWidth={3} />
                        ) : (
                          <span className="text-xs">{section.number}</span>
                        )}
                      </div>
                      <span className="truncate flex-1">{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </>
          ) : (
            // Collapsed state - show only numbers
            <nav className="flex flex-col items-center gap-3 px-2 pt-4 overflow-y-auto max-h-[calc(100%-5rem)]">
              {sections.map((section) => {
                const status = getSectionStatus(section.id);
                const isCompleted = status === 'completed';
                const isActive = status === 'active';

                return (
                  <button
                    key={section.number}
                    onClick={() => scrollToSection(section.id)}
                    className="group transition-all duration-200"
                    title={section.title}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isActive
                        ? 'bg-[#171717] text-white'
                        : isCompleted
                        ? 'bg-[#171717] text-white'
                        : 'bg-[#f5f5f5] text-[#737373]/50 group-hover:bg-[#e5e5e5]'
                    }`}>
                      {isCompleted ? (
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      ) : (
                        <span className="text-xs">{section.number}</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </aside>
    </>
  );
}