import { useState, useEffect } from 'react';
import { Calendar, MessageSquare, TrendingUp } from 'lucide-react';
import { useActiveSection } from '@/app/hooks/useActiveSection';

/**
 * STICKY CTA (FAB) COMPONENT
 * ============================
 * Enhanced Floating Action Button with best-practice UX patterns
 * 
 * FEATURES:
 * - Entry animation with 2s delay
 * - Periodic nudge animation (every 12s, max 3 times)
 * - Context-aware messaging based on active section
 * - Smooth hover expansion (icon → icon + text)
 * - Enhanced size (64px) and visibility
 * - Stronger shadows with brand color tints
 * - Pulse ring effect for attention
 * - WCAG AAA compliant accessibility
 * 
 * DOCUMENTATION: See /FAB_CTA_BEST_PRACTICES.md
 */

interface CTAConfig {
  text: string;
  icon: React.ReactNode;
  description?: string;
}

interface StickyCTAProps {
  onOpenContact: () => void;
}

const sectionCTAs: Record<string, CTAConfig> = {
  'client-context': {
    text: 'Discuss Your Challenges',
    icon: <MessageSquare className="w-5 h-5" />,
    description: 'Get expert insights'
  },
  'challenges': {
    text: 'Talk to an Expert',
    icon: <MessageSquare className="w-5 h-5" />,
    description: 'We can help solve this'
  },
  'engagement': {
    text: 'Book a Consultation',
    icon: <Calendar className="w-5 h-5" />,
    description: 'Free 30-min strategy call'
  },
  'methodology': {
    text: 'Schedule a Demo',
    icon: <Calendar className="w-5 h-5" />,
    description: 'See our process in action'
  },
  'impact': {
    text: 'See Results for Your Business',
    icon: <TrendingUp className="w-5 h-5" />,
    description: 'Custom impact analysis'
  },
  'testimonial': {
    text: 'Talk to an Expert',
    icon: <MessageSquare className="w-5 h-5" />,
    description: 'Start your success story'
  },
  'resources': {
    text: 'Schedule a Demo',
    icon: <Calendar className="w-5 h-5" />,
    description: 'See how we can help'
  }
};

// Sections where we should hide the CTA (they have their own CTAs)
const hiddenSections = ['hero', 'final-cta'];

export function StickyCTA({ onOpenContact }: StickyCTAProps) {
  const activeSection = useActiveSection();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // Entry animation control
  const [hasEntryAnimated, setHasEntryAnimated] = useState(false);
  const [showEntryAnimation, setShowEntryAnimation] = useState(false);
  
  // Nudge animation control
  const [showNudge, setShowNudge] = useState(false);
  const [nudgeCount, setNudgeCount] = useState(0);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());

  // Debug: Log active section changes
  useEffect(() => {
    console.log('📍 StickyCTA - Active section:', activeSection);
  }, [activeSection]);

  // Determine if CTA should be visible
  useEffect(() => {
    const shouldShow = activeSection && !hiddenSections.includes(activeSection);
    console.log('👁️ StickyCTA visibility:', shouldShow, '(section:', activeSection, ')');
    setIsVisible(!!shouldShow);
    
    // Reset nudge count when section changes
    if (shouldShow) {
      setNudgeCount(0);
      setLastInteractionTime(Date.now());
    }
  }, [activeSection]);

  // Entry animation - triggers 2s after becoming visible
  useEffect(() => {
    if (isVisible && !hasEntryAnimated) {
      const timer = setTimeout(() => {
        setShowEntryAnimation(true);
        setHasEntryAnimated(true);
        
        // Remove animation class after it completes
        setTimeout(() => {
          setShowEntryAnimation(false);
        }, 700);
      }, 2000); // 2s delay for entry
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, hasEntryAnimated]);

  // Periodic nudge animation - every 12s, max 3 times, stops on interaction
  useEffect(() => {
    if (!isVisible || isHovering || nudgeCount >= 3 || !hasEntryAnimated) return;
    
    const timeSinceInteraction = Date.now() - lastInteractionTime;
    const initialDelay = Math.max(0, 12000 - timeSinceInteraction);
    
    const startNudging = setTimeout(() => {
      const nudgeInterval = setInterval(() => {
        if (nudgeCount >= 3) {
          clearInterval(nudgeInterval);
          return;
        }
        
        setShowNudge(true);
        setNudgeCount(prev => prev + 1);
        
        // Stop nudge animation after 1s
        setTimeout(() => {
          setShowNudge(false);
        }, 1000);
      }, 12000); // Every 12 seconds
      
      return () => clearInterval(nudgeInterval);
    }, initialDelay);
    
    return () => clearTimeout(startNudging);
  }, [isVisible, isHovering, nudgeCount, hasEntryAnimated, lastInteractionTime]);

  // Reset interaction tracking on hover/click
  const handleInteraction = () => {
    setLastInteractionTime(Date.now());
    setNudgeCount(3); // Stop nudging after interaction
  };

  // Get current CTA configuration
  const currentCTA = activeSection && sectionCTAs[activeSection] 
    ? sectionCTAs[activeSection] 
    : sectionCTAs['client-context']; // fallback

  // Debug: Log current CTA
  useEffect(() => {
    console.log('🎯 Current CTA text:', currentCTA.text, '| Active section:', activeSection);
  }, [activeSection, currentCTA.text]);

  const handleClick = () => {
    setIsPressed(true);
    handleInteraction();
    
    setTimeout(() => {
      setIsPressed(false);
      onOpenContact();
    }, 150);
  };

  const handleMouseEnter = () => {
    setIsExpanded(true);
    setIsHovering(true);
    handleInteraction();
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
    setIsHovering(false);
  };

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block fixed bottom-8 right-8 lg:bottom-10 lg:right-10 z-40">
      <div 
        className={`group transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        } ${showEntryAnimation ? 'animate-fab-enter' : ''} ${
          showNudge ? 'animate-fab-bounce' : ''
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Tooltip Description - Appears on hover */}
        <div 
          className={`absolute bottom-full right-0 mb-4 transition-all duration-300 ${
            isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <div 
            className="text-white px-4 py-2.5 rounded-[5px] whitespace-nowrap shadow-xl text-sm font-medium"
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'
            }}
          >
            {currentCTA.description}
            <div 
              className="absolute top-full right-6 w-0 h-0" 
              style={{
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid #1a1a1a'
              }}
            />
          </div>
        </div>

        {/* Main CTA Button Container */}
        <div className="relative">
          {/* Pulse Ring - Multiple layers for depth */}
          {!isExpanded && (
            <>
              <div 
                className="absolute inset-0 rounded-[10px] animate-fab-pulse-ring pointer-events-none"
                style={{
                  background: 'rgba(176, 31, 36, 0.3)',
                  animationDelay: '0s'
                }}
              />
              <div 
                className="absolute inset-0 rounded-[10px] animate-fab-pulse-ring pointer-events-none"
                style={{
                  background: 'rgba(176, 31, 36, 0.2)',
                  animationDelay: '0.5s'
                }}
              />
            </>
          )}

          {/* Main Button */}
          <button
            onClick={handleClick}
            className="relative text-white transition-all duration-300 rounded-[10px] flex items-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden"
            style={{ 
              padding: isExpanded ? '0 24px 0 20px' : '0',
              width: isExpanded ? 'auto' : '64px',
              height: '64px',
              justifyContent: isExpanded ? 'flex-start' : 'center',
              gap: isExpanded ? '12px' : '0',
              background: 'linear-gradient(135deg, var(--red-700) 0%, var(--red-600) 50%, var(--red-500) 100%)',
              backgroundSize: '200% 200%',
              backgroundPosition: isHovering ? '100% 50%' : '0% 50%',
              boxShadow: isPressed 
                ? '0 4px 12px rgba(176, 31, 36, 0.25), 0 2px 6px rgba(176, 31, 36, 0.15)' 
                : isHovering 
                  ? '0 12px 36px rgba(176, 31, 36, 0.35), 0 6px 16px rgba(176, 31, 36, 0.2)' 
                  : '0 8px 24px rgba(176, 31, 36, 0.25), 0 4px 12px rgba(176, 31, 36, 0.15)',
              transform: isPressed 
                ? 'scale(0.96)' 
                : isHovering 
                  ? 'scale(1.05)' 
                  : 'scale(1)',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              color: '#ffffff' // Force white text color
            }}
            aria-label={currentCTA.text}
            aria-expanded={isExpanded}
          >
            {/* Gradient Overlay for hover shine */}
            <div 
              className="absolute inset-0 opacity-0 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
                backgroundSize: '200% 200%',
                backgroundPosition: isHovering ? '100% 50%' : '0% 50%',
                opacity: isHovering && !isPressed ? 1 : 0
              }}
            />

            {/* Icon Container - Always centered in its space */}
            <div className="relative shrink-0 flex items-center justify-center w-5 h-5" style={{ color: '#ffffff' }}>
              {currentCTA.icon}
            </div>

            {/* Text - Slides in on hover/expansion */}
            <div 
              className={`relative whitespace-nowrap font-medium text-sm transition-all duration-300 ${
                isExpanded ? 'opacity-100 translate-x-0 w-auto' : 'opacity-0 translate-x-[-8px] w-0'
              }`}
              style={{ 
                overflow: 'hidden',
                transitionProperty: 'opacity, transform, width',
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                color: '#ffffff' // Force white text color
              }}
            >
              {currentCTA.text}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}