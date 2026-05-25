/**
 * Reusable Table of Contents Component
 * 
 * A fully-featured, responsive TOC with scroll tracking, progress indication,
 * and smooth navigation. Can be used in any project with minimal configuration.
 * 
 * @example
 * ```tsx
 * const sections = [
 *   { number: '1', title: 'Introduction', time: '5m', id: 'intro' },
 *   { number: '2', title: 'Features', time: '10m', id: 'features' },
 * ];
 * 
 * <TableOfContents sections={sections} />
 * ```
 */

import { List, ChevronLeft, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from './utils';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface TOCSection {
  /** Display number (e.g., "1", "2", "3") */
  number: string;
  /** Section title */
  title: string;
  /** Reading time estimate (e.g., "5m", "10min") */
  time: string;
  /** DOM element ID for scrolling - must match section id in your HTML */
  id: string;
}

export interface TableOfContentsProps {
  /** Array of sections to display in TOC */
  sections: TOCSection[];
  /** Initial collapsed state (default: false - expanded) */
  initialCollapsed?: boolean;
  /** Offset from top when calculating active section (default: 200) */
  scrollOffset?: number;
  /** Offset when scrolling to section (default: 120) */
  scrollToOffset?: number;
  /** Show mobile button (default: true) */
  showMobileButton?: boolean;
  /** Custom className for the aside container */
  className?: string;
  /** Sticky top position in pixels (default: 72) */
  stickyTop?: number;
  /** Custom colors */
  colors?: {
    activeBg?: string;
    activeText?: string;
    completedText?: string;
    upcomingText?: string;
    badgeActive?: string;
    badgeUpcoming?: string;
    hoverBg?: string;
  };
}

export type SectionStatus = 'completed' | 'active' | 'upcoming';

// ============================================================================
// CUSTOM HOOK: useScrollSpy
// ============================================================================

function useScrollSpy(sectionIds: string[], offset: number = 200): string {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // Find the current section (loop in reverse to get the topmost visible section)
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function TableOfContents({
  sections,
  initialCollapsed = false,
  scrollOffset = 200,
  scrollToOffset = 120,
  showMobileButton = true,
  className,
  stickyTop = 72,
  colors = {},
}: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(!initialCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Default colors with overrides
  const colorTheme = {
    activeBg: colors.activeBg || '#f5f5f5',
    activeText: colors.activeText || '#171717',
    completedText: colors.completedText || '#171717',
    upcomingText: colors.upcomingText || '#737373',
    badgeActive: colors.badgeActive || '#171717',
    badgeUpcoming: colors.badgeUpcoming || '#f5f5f5',
    hoverBg: colors.hoverBg || '#fafafa',
  };

  const sectionIds = sections.map(s => s.id);
  const activeSection = useScrollSpy(sectionIds, scrollOffset);

  // Calculate total time
  const totalTime = sections.reduce((acc, section) => {
    const minutes = parseInt(section.time);
    return acc + (isNaN(minutes) ? 0 : minutes);
  }, 0);

  // Scroll to section with smooth behavior
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.offsetTop - scrollToOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      // Close mobile drawer if open
      setMobileOpen(false);
    }
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    const activeIndex = sections.findIndex(s => s.id === activeSection);
    if (activeIndex === -1) return 0;
    return ((activeIndex + 1) / sections.length) * 100;
  };

  // Determine section status
  const getSectionStatus = (sectionId: string): SectionStatus => {
    const activeIndex = sections.findIndex(s => s.id === activeSection);
    const currentIndex = sections.findIndex(s => s.id === sectionId);
    
    if (currentIndex < activeIndex) return 'completed';
    if (currentIndex === activeIndex) return 'active';
    return 'upcoming';
  };

  // Section item component
  const SectionItem = ({ section, compact = false }: { section: TOCSection; compact?: boolean }) => {
    const status = getSectionStatus(section.id);
    const isCompleted = status === 'completed';
    const isActive = status === 'active';
    const isUpcoming = status === 'upcoming';

    if (compact) {
      return (
        <button
          onClick={() => scrollToSection(section.id)}
          className="group transition-all duration-200"
          title={section.title}
          aria-label={`${section.title} - ${section.time}`}
        >
          <div
            className={cn(
              'w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200',
              isActive && 'text-white',
              isCompleted && 'text-white',
              isUpcoming && 'text-[#737373]/50 group-hover:bg-[#e5e5e5]'
            )}
            style={{
              backgroundColor: isActive || isCompleted ? colorTheme.badgeActive : colorTheme.badgeUpcoming
            }}
          >
            {isCompleted ? (
              <Check className="w-3.5 h-3.5" strokeWidth={3} />
            ) : (
              <span className="text-xs">{section.number}</span>
            )}
          </div>
        </button>
      );
    }

    return (
      <button
        onClick={() => scrollToSection(section.id)}
        className={cn(
          'w-full text-left px-3 py-2 rounded-[2.5px] text-sm flex items-center gap-2 group transition-all duration-200',
          isActive && 'font-bold',
          !isActive && isCompleted && `hover:text-[${colorTheme.activeText}]`,
          !isActive && isUpcoming && `hover:text-[${colorTheme.activeText}]`
        )}
        style={{
          backgroundColor: isActive ? colorTheme.activeBg : 'transparent',
          color: isActive ? colorTheme.activeText : isCompleted ? `${colorTheme.completedText}B3` : `${colorTheme.upcomingText}80`
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = colorTheme.hoverBg;
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
        aria-current={isActive ? 'page' : undefined}
      >
        <div
          className={cn(
            'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200',
            (isActive || isCompleted) && 'text-white'
          )}
          style={{
            backgroundColor: isActive || isCompleted ? colorTheme.badgeActive : colorTheme.badgeUpcoming,
            color: isActive || isCompleted ? 'white' : `${colorTheme.upcomingText}80`
          }}
        >
          {isCompleted ? (
            <Check className="w-3 h-3" strokeWidth={3} />
          ) : (
            <span className="text-xs">{section.number}</span>
          )}
        </div>
        <span className="truncate flex-1">{section.title}</span>
      </button>
    );
  };

  return (
    <>
      {/* Mobile TOC Button */}
      {showMobileButton && (
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="fixed bottom-24 left-4 z-50 lg:hidden rounded-full w-12 h-12 p-0 shadow-lg bg-[#171717] hover:bg-[#171717]/90 text-white inline-flex items-center justify-center gap-2 hover:shadow-md transition-all duration-200"
          aria-label="Open table of contents"
        >
          <List className="h-5 w-5" />
        </button>
      )}

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="bg-white h-full w-[280px] max-w-[80vw] shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#f5f5f5]">
                <span className="text-sm font-bold text-[#171717] uppercase tracking-wider">
                  Table of Content
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-[#737373] hover:text-[#171717]"
                  aria-label="Close table of contents"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </div>
              <nav className="space-y-0.5" aria-label="Table of contents">
                {sections.map((section) => (
                  <SectionItem key={section.id} section={section} />
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:block flex-shrink-0 sticky self-start transition-all duration-300 z-40 h-[calc(100vh-72px)]',
          isOpen ? 'w-[255px]' : 'w-20',
          className
        )}
        style={{ top: `${stickyTop}px` }}
        aria-label="Table of contents"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-[#e5e5e5]/50 rounded-none h-full py-4 relative shadow-lg shadow-[#e5e5e5]/10">
          {/* Collapse/Expand Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute bottom-[20%] -right-4 h-8 w-8 p-0 bg-white hover:bg-[#f5f5f5] rounded-full inline-flex items-center justify-center gap-2 transition-all duration-200 z-[100] shadow-md border border-[#e5e5e5]"
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-expanded={isOpen}
          >
            <ChevronLeft
              className={cn(
                'h-4 w-4 transition-transform',
                !isOpen && 'rotate-180'
              )}
            />
          </button>

          {isOpen ? (
            <>
              {/* Expanded State - Header */}
              <div className="flex items-center gap-2 px-4 pb-3 pt-[20px] mb-2 border-b border-[#f5f5f5]">
                <span className="text-sm font-bold text-[#171717] uppercase tracking-wider">
                  Table of Content
                </span>
                {totalTime > 0 && (
                  <span className="ml-auto text-xs text-[#737373] bg-[#f5f5f5] px-2 py-0.5 rounded-full">
                    {totalTime}m
                  </span>
                )}
              </div>

              {/* Expanded State - Navigation */}
              <nav className="space-y-0.5 px-2 overflow-y-auto max-h-[calc(100%-3rem)]">
                {sections.map((section) => (
                  <SectionItem key={section.id} section={section} />
                ))}
              </nav>
            </>
          ) : (
            // Collapsed State - Numbers Only
            <nav className="flex flex-col items-center gap-3 px-2 pt-4 overflow-y-auto max-h-[calc(100%-5rem)]">
              {sections.map((section) => (
                <SectionItem key={section.id} section={section} compact />
              ))}
            </nav>
          )}

          {/* Optional: Progress Bar at Bottom */}
          {isOpen && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#f5f5f5]">
              <div
                className="h-full bg-[#171717] transition-all duration-300"
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export default TableOfContents;

/**
 * USAGE EXAMPLE:
 * 
 * import { TableOfContents } from '@/components/ui/table-of-contents';
 * 
 * const sections = [
 *   { number: '1', title: 'Introduction', time: '5m', id: 'intro' },
 *   { number: '2', title: 'Getting Started', time: '10m', id: 'getting-started' },
 *   { number: '3', title: 'Features', time: '15m', id: 'features' },
 *   { number: '4', title: 'API Reference', time: '20m', id: 'api' },
 * ];
 * 
 * function MyPage() {
 *   return (
 *     <div className="flex">
 *       <TableOfContents 
 *         sections={sections}
 *         initialCollapsed={false}
 *         scrollOffset={200}
 *         scrollToOffset={120}
 *       />
 *       
 *       <main className="flex-1 min-w-0">
 *         <section id="intro">Introduction content</section>
 *         <section id="getting-started">Getting started content</section>
 *         <section id="features">Features content</section>
 *         <section id="api">API reference content</section>
 *       </main>
 *     </div>
 *   );
 * }
 */
