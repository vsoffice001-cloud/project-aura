import { useScrollAnimation } from '@/app/hooks/useScrollAnimation';
import { useRef, useEffect, useState } from 'react';
import { SectionLabel, StepPill } from '@/app/components/Badge';
import { Container } from './Container';

interface MethodologyStep {
  number: string;
  title: string;
  description: string;
}

interface MethodologySectionProps {
  steps: MethodologyStep[];
}

export function MethodologySection({ steps }: MethodologySectionProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [timelineFillHeight, setTimelineFillHeight] = useState(0); // Now in PIXELS, not percentage
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]); // NEW: Track dot positions

  // Track scroll position and update active step
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight * 0.5; // Center of viewport
      
      let newActiveIndex = 0;
      let targetFillHeight = 0;

      // Find which step is currently in the center of viewport
      stepRefs.current.forEach((stepRef, index) => {
        if (!stepRef) return;

        const rect = stepRef.getBoundingClientRect();
        const stepCenter = rect.top + (rect.height / 2);

        // If step center is above viewport center, it's the active one
        if (stepCenter < viewportCenter) {
          newActiveIndex = index;
        }
      });

      // Calculate fill height based on active step
      // Fill should reach the center of the active step's dot
      if (dotRefs.current[newActiveIndex] && timelineRef.current) {
        const timelineRect = timelineRef.current.getBoundingClientRect();
        const dotRect = dotRefs.current[newActiveIndex]!.getBoundingClientRect();
        
        // Calculate the distance from timeline top to dot center
        const dotCenterY = dotRect.top + (dotRect.height / 2);
        const timelineTopY = timelineRect.top;
        const fillHeightInPixels = Math.max(0, dotCenterY - timelineTopY);
        
        targetFillHeight = fillHeightInPixels;
      }

      // Update state
      setActiveStepIndex(newActiveIndex);
      setTimelineFillHeight(targetFillHeight);
    };

    // Run on mount and scroll
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [steps.length]);

  return (
    <section id="methodology" className="py-10 sm:py-12 md:py-16" style={{ background: '#f9f7f6' }}>
      <Container>
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <SectionLabel>Our Methodology</SectionLabel>
          
          <h2 
            className="leading-[1.15] font-light text-black tracking-tight" 
            style={{ 
              fontFamily: "'Noto Serif', serif", 
              fontSize: 'clamp(1.5rem, 4.5vw, var(--text-2xl))',
              marginBottom: 'var(--pair-heading-description)' // Medium pairing with description
            }}
          >
            Consulting Approach & Initiatives
          </h2>

          <p 
            className="leading-[1.7] text-black/70" 
            style={{ 
              fontSize: 'var(--text-sm)',
              maxWidth: 'var(--text-measure-narrow)'
            }}
          >
            A systematic, research-driven approach designed to deliver actionable insights and sustainable outcomes
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative" ref={timelineRef}>
          {/* Timeline Vertical Line (Base) - Positioned on the left - Hidden on Mobile */}
          <div className="absolute left-0 top-0 bottom-0 w-px hidden md:block" style={{ left: '28px', background: 'var(--bg-warm-600)' }} />

          {/* Timeline Vertical Line (Fill) - Progressive Fill with Gradient Fade Endpoint
              - Fills progressively as you scroll through each step
              - Smooth interpolation within each step (not just jumps)
              - Gradient fade at top endpoint (liquid fill effect)
              - 1000ms cubic-bezier for buttery smooth transitions
              - GPU accelerated for 60fps performance */}
          <div 
            className="absolute left-0 top-0 w-px hidden md:block" 
            style={{ 
              left: '28px', 
              background: 'linear-gradient(to top, #000 0%, #000 96%, transparent 100%)',
              height: `${timelineFillHeight}px`,
              zIndex: 1,
              transition: 'height 1000ms cubic-bezier(0.4, 0.0, 0.2, 1)',
              transform: 'translateZ(0)', // GPU acceleration
              willChange: 'height' // Optimize for height animation
            }} 
          />

          {/* Timeline Steps */}
          <div className="space-y-0">
            {steps.map((step, index) => {
              // Determine node state
              const isPast = index < activeStepIndex;
              const isCurrent = index === activeStepIndex;
              const isFuture = index > activeStepIndex;

              return (
                <div 
                  key={index} 
                  className="relative pb-8 md:pb-10 last:pb-0"
                  ref={(el) => (stepRefs.current[index] = el)}
                >
                  {/* Step Node Container */}
                  <div className="flex items-start gap-4 md:gap-8">
                    {/* Left Side - Step Number Node - Hidden on Mobile */}
                    <div className="relative flex-shrink-0 hidden md:block" style={{ width: '56px', height: '40px' }}>
                      {/* Thick Border Circle with State-Based Styling & Pulsing Border
                          - Past: Filled with warm color, thick warm border
                          - Current: Solid black center, thick black border with pulsing effect
                          - Future: Hollow (white center), thick gray border
                          - Centered on timeline (left: 8px to center on 28px timeline)
                          - Aligned with chip badge (top: 28px = card padding 24px + chip center 4px) */}
                      <div 
                        className="rounded-full flex items-center justify-center relative z-10 transition-all duration-300"
                        style={{
                          width: '28px',
                          height: '28px',
                          position: 'absolute',
                          left: '14px', // Centers 28px circle on vertical timeline at 28px (28 - 14 = 14px from left)
                          top: '28px', // Aligns with chip center
                          border: isCurrent ? '4px solid #000' : isPast ? '3px solid var(--warm-800)' : '3px solid rgba(0, 0, 0, 0.2)',
                          backgroundColor: isCurrent ? '#000' : isPast ? 'var(--warm-700)' : '#fff',
                          animation: isCurrent ? 'pulse-border 2.5s ease-in-out infinite' : 'none',
                          // Ensure solid background (no transparency)
                          backgroundClip: 'padding-box',
                          isolation: 'isolate'
                        }}
                        ref={(el) => (dotRefs.current[index] = el)}
                      >
                      </div>

                      {/* Subtle glow effect removed - pulsing border provides the effect */}
                    </div>

                    {/* Right Side - Step Content Card */}
                    <div className="flex-1 pt-0 md:pt-1">
                      {/* Card Container with Hover Elevation & Premium Shadow
                          - Card hover: elevates with custom shadow + pill shimmer
                          - Custom shadow system: subtle default, elevated on hover
                          - Pill shimmer: 75% white opacity (bright, for warm background visibility)
                          - Transform: slight translateY for lift effect */}
                      <div 
                        className="methodology-card group relative bg-white border rounded-[5px] p-5 md:p-6 transition-all duration-300 cursor-pointer overflow-hidden" 
                        style={{ 
                          borderColor: 'var(--bg-warm-500)', 
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.04)'
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
                        {/* Step Label with Shimmer Effect - Warm Color System
                            - Now visible on ALL screens (desktop/tablet/mobile)
                            - Provides step context since circles now use minimalist dots
                            - Shimmer on card hover for premium interaction */}
                        <div className="mb-3">
                          <StepPill stepNumber={index + 1} />
                        </div>

                        {/* Step Title */}
                        <h3 className="font-medium text-black leading-[1.3] tracking-tight mb-3 transition-colors" style={{ fontSize: 'var(--text-xl)' }}>
                          {step.title}
                        </h3>

                        {/* Step Description */}
                        <p className="leading-[1.7] text-black/70 transition-colors" style={{ fontSize: 'var(--text-sm)' }}>
                          {step.description}
                        </p>

                        {/* Subtle Gradient Fade - Only on non-final cards */}
                        {index < steps.length - 1 && (
                          <div 
                            className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
                            style={{ 
                              background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.015) 100%)'
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Dotted Connector Line Between Steps (visible between nodes) - Hidden on Mobile */}
                  {index < steps.length - 1 && (
                    <div 
                      className="absolute left-0 w-px hidden md:block" 
                      style={{ 
                        left: '28px',
                        top: '56px',
                        height: 'calc(100% - 56px)',
                        background: 'linear-gradient(to bottom, var(--bg-warm-700) 0%, var(--bg-warm-600) 50%, transparent 100%)'
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}