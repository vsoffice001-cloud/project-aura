import { useState, useEffect } from 'react';
import { Calendar, MessageSquare, TrendingUp } from 'lucide-react';
import { useActiveSection } from '@/app/hooks/useActiveSection';

interface CTAConfig {
  text: string;
  icon: React.ReactNode;
  description?: string;
}

const sectionCTAs: Record<string, CTAConfig> = {
  'client-context': {
    text: 'Discuss Your Challenges',
    icon: <MessageSquare className="w-4 h-4" />,
    description: 'Get expert insights'
  },
  'challenges': {
    text: 'Talk to an Expert',
    icon: <MessageSquare className="w-4 h-4" />,
    description: 'We can help solve this'
  },
  'engagement': {
    text: 'Book a Consultation',
    icon: <Calendar className="w-4 h-4" />,
    description: 'Free 30-min strategy call'
  },
  'methodology': {
    text: 'Schedule a Demo',
    icon: <Calendar className="w-4 h-4" />,
    description: 'See our process in action'
  },
  'impact': {
    text: 'See Results for Your Business',
    icon: <TrendingUp className="w-4 h-4" />,
    description: 'Custom impact analysis'
  },
  'testimonial': {
    text: 'Talk to an Expert',
    icon: <MessageSquare className="w-4 h-4" />,
    description: 'Start your success story'
  },
  'resources': {
    text: 'Schedule a Demo',
    icon: <Calendar className="w-4 h-4" />,
    description: 'See how we can help'
  }
};

// Sections where we should hide the CTA (they have their own CTAs)
const hiddenSections = ['hero', 'final-cta'];

export function StickyCTA() {
  const activeSection = useActiveSection();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Determine if CTA should be visible
  useEffect(() => {
    const shouldShow = activeSection && !hiddenSections.includes(activeSection);
    setIsVisible(!!shouldShow);
  }, [activeSection]);

  // Get current CTA configuration
  const currentCTA = activeSection && sectionCTAs[activeSection] 
    ? sectionCTAs[activeSection] 
    : sectionCTAs['client-context']; // fallback

  const handleClick = () => {
    // Handle CTA click - for now just log, you can add modal or redirect
    console.log('CTA clicked:', currentCTA.text);
    // TODO: Add your scheduling/booking logic here
  };

  const handleMouseEnter = () => {
    setIsExpanded(true);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
    setIsHovering(false);
  };

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block fixed bottom-8 right-8 z-40">
      <div 
        className={`group transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Tooltip Description - Appears on hover */}
        <div 
          className={`absolute bottom-full right-0 mb-3 transition-all duration-300 ${
            isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <div className="bg-black text-white px-4 py-2 rounded-[5px] whitespace-nowrap shadow-xl text-sm">
            {currentCTA.description}
            <div className="absolute top-full right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black" />
          </div>
        </div>

        {/* Main CTA Button */}
        <button
          onClick={handleClick}
          className="text-white transition-all duration-300 rounded-[10px] flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden group"
          style={{ 
            padding: isExpanded ? '14px 24px 14px 20px' : '14px 20px',
            width: isExpanded ? 'auto' : '56px',
            minHeight: '56px',
            background: 'linear-gradient(135deg, var(--red-700), var(--red-500))',
            backgroundSize: '200% 200%',
            backgroundPosition: isHovering ? '100% 50%' : '0% 50%',
            boxShadow: isHovering ? '0 12px 32px rgba(176, 31, 36, 0.35)' : '0 8px 24px rgba(176, 31, 36, 0.2)',
            focusRingColor: 'var(--red-600)'
          }}
          aria-label={currentCTA.text}
        >
          {/* Icon Container */}
          <div className="shrink-0 flex items-center justify-center">
            {currentCTA.icon}
          </div>

          {/* Text - Slides in on hover */}
          <div 
            className={`whitespace-nowrap font-medium text-sm transition-all duration-300 ${
              isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 w-0'
            }`}
            style={{ 
              overflow: isExpanded ? 'visible' : 'hidden'
            }}
          >
            {currentCTA.text}
          </div>

          {/* Pulse Animation - When collapsed */}
          {!isExpanded && (
            <div className="absolute inset-0 rounded-[10px] animate-pulse-ring pointer-events-none" />
          )}
        </button>
      </div>
    </div>
  );
}