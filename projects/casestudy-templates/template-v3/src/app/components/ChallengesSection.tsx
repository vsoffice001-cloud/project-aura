import { useScrollAnimation } from '@/app/hooks/useScrollAnimation';
import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionLabel } from '@/app/components/Badge';
import { Container } from './Container';

/**
 * CHALLENGES SECTION - CONTENT-AWARE CAROUSEL NAVIGATION SYSTEM
 * ============================================================
 * 
 * DESIGN PHILOSOPHY:
 * - Smart scrollability detection: Only shows navigation when content actually overflows
 * - Page-based indicators: Represents scroll positions, not individual cards
 * - Responsive behavior: Adapts to viewport changes dynamically
 * - Accessibility: Keyboard navigation, ARIA labels, focus management
 * 
 * KEY FEATURES:
 * 1. Dynamic card sizing based on count (1-2-3-4+ cards have different layouts)
 * 2. Scroll page calculation: scrollPages = totalCards - visibleCards + 1
 * 3. Modern pill-style active indicators (32px wide) vs dot indicators (8px)
 * 4. Arrow buttons appear/disappear based on scroll position
 * 5. Horizontal alignment fix: Fixed min-height for card titles (2.5em)
 * 
 * LEARNINGS & FIXES:
 * - Initially used stale state in activePageIndex calculation → Fixed by inline calculation
 * - Timing issues with DOM rendering → Added dual timeout approach (150ms + 500ms)
 * - Indicator count confusion → Changed from card-based to page-based representation
 * - Title alignment issues → Added fixed min-height to accommodate 2-line titles
 * 
 * See: /CAROUSEL_NAVIGATION_IMPLEMENTATION.md for full documentation
 */

interface Challenge {
  number: string;
  title: string;
  questions: string[];
}

interface ChallengesSectionProps {
  challenges: Challenge[];
}

export function ChallengesSection({ challenges }: ChallengesSectionProps) {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // State management
  const [activeCardIndex, setActiveCardIndex] = useState(0); // Current card index in viewport
  const [canScrollLeft, setCanScrollLeft] = useState(false); // Left arrow button state
  const [canScrollRight, setCanScrollRight] = useState(true); // Right arrow button state
  const [isScrollable, setIsScrollable] = useState(false); // Whether content overflows container
  const [scrollPages, setScrollPages] = useState(0); // Number of scroll positions (not card count!)
  const [activePageIndex, setActivePageIndex] = useState(0); // Current page index for pill indicators
  
  /**
   * SCROLL PAGE CALCULATION ALGORITHM
   * ==================================
   * Formula: scrollPages = totalCards - visibleCards + 1
   * 
   * Examples:
   * - 4 cards, 3 visible: 4 - 3 + 1 = 2 pages (view cards 1-3, then 2-4)
   * - 5 cards, 3 visible: 5 - 3 + 1 = 3 pages
   * - 3 cards, 3 visible: 0 pages (all fit, no navigation needed)
   * - Mobile (1 visible): 4 - 1 + 1 = 4 pages (each card = 1 page)
   * 
   * Precision checks:
   * 1. Calculates how many FULL cards fit (Math.floor)
   * 2. Verifies actual content width > container width
   * 3. Returns 0 if content fits completely
   */
  const calculateScrollPages = () => {
    const container = scrollContainerRef.current;
    if (!container || challenges.length === 0) return 0;
    
    const containerWidth = container.clientWidth;
    const firstCard = container.firstElementChild as HTMLElement;
    if (!firstCard) return 0;
    
    const cardWidth = firstCard.clientWidth;
    const gap = 24; // gap-6 = 24px
    
    // How many FULL cards fit in the viewport?
    const visibleCards = Math.floor((containerWidth + gap) / (cardWidth + gap));
    
    // If all cards fit completely, no pagination needed
    if (visibleCards >= challenges.length) {
      return 0;
    }
    
    // Check if content is actually scrollable (more precise check)
    const totalContentWidth = (cardWidth * challenges.length) + (gap * (challenges.length - 1));
    const actuallyScrollable = totalContentWidth > containerWidth;
    
    if (!actuallyScrollable) {
      return 0;
    }
    
    // Number of scroll pages = total cards - visible cards + 1
    // Example: 4 total cards, 3 visible = 4 - 3 + 1 = 2 pages (view 1-3, then 2-4)
    const pages = challenges.length - visibleCards + 1;
    return Math.max(pages, 0);
  };
  
  // Check if content is actually scrollable
  const checkScrollable = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollable = container.scrollWidth > container.clientWidth;
    setIsScrollable(scrollable);
  };
  
  // Update scroll button states
  const updateScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };
  
  // Keyboard navigation for horizontal scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const cardWidth = container.firstElementChild?.clientWidth || 0;
      const gap = 24; // gap-6 = 24px
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        container.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        container.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
      }
    };
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('keydown', handleKeyDown);
      return () => container.removeEventListener('keydown', handleKeyDown);
    }
  }, []);
  
  // Track scroll position for dot navigation and arrow buttons
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.firstElementChild?.clientWidth || 0;
      const gap = 24;
      const currentIndex = Math.round(scrollLeft / (cardWidth + gap));
      setActiveCardIndex(currentIndex);
      
      // Calculate scroll pages inline to ensure accuracy
      const currentScrollPages = calculateScrollPages();
      
      // Calculate which "page" we're on
      setActivePageIndex(Math.min(currentIndex, Math.max(0, currentScrollPages - 1)));
      
      updateScrollButtons();
    };

    container.addEventListener('scroll', handleScroll);
    
    // Initial setup
    const pages = calculateScrollPages();
    setScrollPages(pages);
    setActivePageIndex(0); // Start at first page
    updateScrollButtons();
    checkScrollable();
    
    return () => container.removeEventListener('scroll', handleScroll);
  }, [challenges.length]);
  
  // Detect scrollability on window resize
  useEffect(() => {
    const handleResize = () => {
      checkScrollable();
      updateScrollButtons();
      // Recalculate scroll pages on resize
      const pages = calculateScrollPages();
      setScrollPages(pages);
    };
    
    window.addEventListener('resize', handleResize);
    
    // More robust initialization with multiple checks
    const timeoutId1 = setTimeout(() => {
      checkScrollable();
      updateScrollButtons();
      const pages = calculateScrollPages();
      setScrollPages(pages);
    }, 150);
    
    // Secondary check for slower renders
    const timeoutId2 = setTimeout(() => {
      checkScrollable();
      updateScrollButtons();
      const pages = calculateScrollPages();
      setScrollPages(pages);
    }, 500);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
    };
  }, [challenges.length]);
  
  // Scroll to specific card
  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.firstElementChild?.clientWidth || 0;
    const gap = 24;
    container.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth'
    });
  };
  
  // Navigate to previous/next card
  const navigatePrev = () => {
    const newIndex = Math.max(0, activeCardIndex - 1);
    scrollToCard(newIndex);
  };

  const navigateNext = () => {
    const newIndex = Math.min(challenges.length - 1, activeCardIndex + 1);
    scrollToCard(newIndex);
  };
  
  // Dynamic card width calculation
  const cardCount = challenges.length;
  let cardWidthClass = 'w-[85vw] sm:w-[380px]'; // Default for mobile
  let desktopCardWidth = 'lg:w-[380px]'; // Default
  
  // Desktop logic: Calculate based on number of cards
  if (cardCount <= 2) {
    // For 1-2 cards: Make them larger
    desktopCardWidth = cardCount === 1 ? 'lg:w-[600px]' : 'lg:w-[450px]';
  } else if (cardCount === 3) {
    // For exactly 3 cards: Fill width evenly (1000px - gaps) / 3 = ~317px each
    desktopCardWidth = 'lg:w-[calc((1000px-48px)/3)]';
  } else {
    // For 4+ cards: Show 3 full cards + peek of 4th (1000px - gaps) / 3.25 = ~293px each
    desktopCardWidth = 'lg:w-[calc((1000px-48px)/3.25)]';
  }
  
  cardWidthClass = `w-[85vw] sm:w-[380px] ${desktopCardWidth}`;

  return (
    <section id="challenges" className="overflow-x-clip" style={{ background: '#f5f2f1', paddingTop: 'var(--section-py-standard)', paddingBottom: 'var(--section-py-standard)' }}>
      <Container>
        {/* Header */}
        <div style={{ marginBottom: 'var(--section-header-mb)' }}>
          <SectionLabel>Challenges</SectionLabel>
          
          <h2 
            className="leading-[1.15] font-light text-black tracking-tight" 
            style={{ 
              fontFamily: "'Noto Serif', serif", 
              fontSize: 'clamp(1.5rem, 4.5vw, var(--text-2xl))',
              marginBottom: 'var(--pair-heading-content)' // Medium pairing - has scroll hint, then cards
            }}
          >
            Key Problem Statements
          </h2>
          
          {/* Scroll Hint - Hidden on Mobile and when 4 or fewer cards on desktop */}
          <p className={`text-black/50 items-center gap-2 ${cardCount <= 4 ? 'hidden' : 'hidden sm:flex lg:flex'}`} style={{ fontSize: 'var(--text-xs)' }}>
            <span>Use arrow keys or scroll to explore</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </p>
        </div>
      </Container>

      {/* Horizontal Scroll Container */}
      <div className="relative">
        {/* Arrow Navigation Buttons - Only visible when scrollable */}
        {cardCount > 1 && isScrollable && (
          <>
            {/* Left Arrow Button */}
            <button
              onClick={navigatePrev}
              disabled={!canScrollLeft}
              aria-label="Previous challenge"
              className={`hidden sm:flex absolute top-1/2 -translate-y-1/2 z-20 items-center justify-center w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
                canScrollLeft 
                  ? 'opacity-100 shadow-sm cursor-pointer' 
                  : 'opacity-0 pointer-events-none'
              }`}
              style={{ 
                left: cardCount >= 4 ? '1.5rem' : 'max(1rem, calc((100vw - 1000px) / 2 - 3rem))',
                borderColor: 'rgba(0, 0, 0, 0.1)',
                boxShadow: canScrollLeft ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
                color: 'rgba(0, 0, 0, 0.7)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000000';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = '#000000';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.color = 'rgba(0, 0, 0, 0.7)';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
              }}
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2} />
            </button>

            {/* Right Arrow Button */}
            <button
              onClick={navigateNext}
              disabled={!canScrollRight}
              aria-label="Next challenge"
              className={`hidden sm:flex absolute top-1/2 -translate-y-1/2 z-20 items-center justify-center w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
                canScrollRight 
                  ? 'opacity-100 shadow-sm cursor-pointer' 
                  : 'opacity-0 pointer-events-none'
              }`}
              style={{ 
                right: cardCount >= 4 ? '1.5rem' : 'max(1rem, calc((100vw - 1000px) / 2 - 3rem))',
                borderColor: 'rgba(0, 0, 0, 0.1)',
                boxShadow: canScrollRight ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
                color: 'rgba(0, 0, 0, 0.7)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000000';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = '#000000';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.color = 'rgba(0, 0, 0, 0.7)';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
              }}
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2} />
            </button>
          </>
        )}
        
        {/* Fade Gradient - Left - Hidden on Mobile and when all cards fit */}
        <div className={`absolute left-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none ${cardCount <= 4 ? 'lg:hidden' : ''}`} style={{ background: 'linear-gradient(to right, #f5f2f1, transparent)' }} />
        
        {/* Fade Gradient - Right - Hidden on Mobile and when all cards fit */}
        <div className={`absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none ${cardCount <= 4 ? 'lg:hidden' : ''}`} style={{ background: 'linear-gradient(to left, #f5f2f1, transparent)' }} />

        {/* Scrollable Cards Container */}
        <div 
          className={`flex gap-4 md:gap-6 overflow-x-auto py-2 scroll-smooth scrollbar-hide snap-x snap-mandatory ${cardCount === 3 ? 'px-4 sm:px-6 md:px-8 lg:justify-center lg:overflow-x-visible' : cardCount >= 4 ? 'lg:overflow-x-auto' : 'px-4 sm:px-6 md:px-8 lg:justify-center lg:overflow-x-visible'}`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            paddingLeft: cardCount >= 4 ? 'max(1rem, calc((100vw - 1000px) / 2 + 2rem))' : undefined,
            paddingRight: cardCount >= 4 ? 'max(1rem, calc((100vw - 1000px) / 2 + 2rem))' : undefined,
            overflowY: 'visible'
          }}
          ref={scrollContainerRef}
        >
          {challenges.map((challenge, index) => (
            <div 
              key={index} 
              tabIndex={0}
              role="article"
              aria-label={`Challenge ${index + 1}: ${challenge.title}`}
              className={`flex-shrink-0 ${cardWidthClass} bg-white border rounded-[5px] p-5 md:p-6 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-300 group snap-center`}
              style={{ 
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.04)',
                borderColor: 'rgba(0, 0, 0, 0.08)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.06)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Card Header: Number only */}
              <div className="mb-5 md:mb-6">
                <div 
                  className="font-light transition-colors tracking-tight leading-none" 
                  style={{ 
                    fontFamily: "'Noto Serif', serif", 
                    fontSize: cardCount >= 4 ? 'var(--text-3xl)' : 'var(--text-4xl)',
                    color: 'var(--text-decorative)' // 15% opacity - semantic token
                  }}
                >
                  {challenge.number}
                </div>
              </div>
              
              {/* Card Title */}
              <h3 
                className="font-medium text-black leading-[1.25] tracking-tight mb-5 md:mb-6" 
                style={{ 
                  fontSize: cardCount >= 4 ? 'var(--text-base)' : 'var(--text-lg)',
                  minHeight: cardCount >= 4 ? '2.5em' : '2.5em' // Accommodates 2 lines at 1.25 line-height
                }}
              >
                {challenge.title}
              </h3>
              
              {/* Questions List */}
              <div className="space-y-3 md:space-y-4 border-t pt-5 md:pt-6" style={{ borderColor: 'var(--bg-warm-500)' }}>
                {challenge.questions.map((question, qIndex) => (
                  <div key={qIndex} className="flex items-start gap-3">
                    {/* Standardized arrow pointer - 14px, optimal for questions */}
                    <span 
                      className="text-black/40 flex-shrink-0"
                      style={{ 
                        fontSize: '14px',
                        lineHeight: '1.6',
                        paddingTop: '0.15em'
                      }}
                    >
                      →
                    </span>
                    
                    {/* 
                      TYPOGRAPHY RATIONALE: Dynamic Question Sizing
                      - fontSize: 0.875rem (14px) for 4+ cards | var(--text-sm) (16px) for <4 cards
                      
                      WHY DYNAMIC SIZING:
                      1. Content-Aware Typography: Adapts to content density
                      2. Density Management:
                         - 4+ cards: Horizontal space is tight in 4-column grid
                         - <4 cards: Spacious layout allows larger, more comfortable text
                      3. Readability Balance:
                         - 14px (0.875rem): Minimum readable size for body text
                         - 16px (var(--text-sm)): Standard comfortable reading size
                      4. User Testing Result: 16px questions felt cramped in 4-card layouts
                      
                      DESIGN PATTERN:
                      This is "adaptive typography" - sizing based on layout density
                      Similar to responsive typography, but based on content count
                      
                      ALTERNATIVE CONSIDERED:
                      - Always use var(--text-sm): Makes 4+ card layouts feel dense
                      - Always use 0.875rem: Unnecessarily small for spacious 2-3 card layouts
                      
                      VERDICT: Keep dynamic sizing - it's a smart responsive feature
                      NOTE: Could create var(--text-compact) = 0.875rem in design system
                      See: /FONT_SIZE_RATIONALE_ANALYSIS.md - Section: Challenges
                    */}
                    <p className="leading-[1.5] text-black/70 group-hover:text-black/80 transition-colors" style={{ fontSize: cardCount >= 4 ? 'var(--text-compact)' : 'var(--text-sm)' }}>
                      {question}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator Dots - Represents Scroll Pages, Not Individual Cards */}
      {scrollPages > 0 && (
        <Container className={`mt-6 md:mt-8 justify-center gap-2 ${
          // Mobile: Always show when scrollable (single card view needs position feedback)
          // Desktop/Tablet: Only show if content is scrollable
          isScrollable ? 'flex' : 'flex sm:hidden'
        }`}>
          {Array.from({ length: scrollPages }).map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => scrollToCard(pageIndex)}
              aria-label={`Go to page ${pageIndex + 1}`}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                activePageIndex === pageIndex 
                  ? 'w-8 focus:ring-warm-800' // Active: warm pill (elongated)
                  : 'w-2 focus:ring-warm-600' // Inactive: warm small dot
              }`}
              style={{
                backgroundColor: activePageIndex === pageIndex 
                  ? 'var(--warm-800)' // Active: Dark warm (#b7a9a3) - prominent
                  : 'var(--warm-500)' // Inactive: Medium warm (#eae5e3) - subtle
              }}
              onMouseEnter={(e) => {
                if (activePageIndex !== pageIndex) {
                  e.currentTarget.style.backgroundColor = 'var(--warm-600)'; // Hover: Slightly darker
                }
              }}
              onMouseLeave={(e) => {
                if (activePageIndex !== pageIndex) {
                  e.currentTarget.style.backgroundColor = 'var(--warm-500)';
                }
              }}
            />
          ))}
        </Container>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}