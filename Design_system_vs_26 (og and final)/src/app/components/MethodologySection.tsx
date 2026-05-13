import { useScrollAnimation } from '@/app/hooks/useScrollAnimation';
import { useRef, useEffect, useState } from 'react';

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
  const [timelineFillHeight, setTimelineFillHeight] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Track scroll position and update active step
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((stepRef, index) => {
      if (!stepRef) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveStepIndex(index);
              
              // Calculate timeline fill percentage
              const fillPercentage = ((index + 1) / steps.length) * 100;
              setTimelineFillHeight(fillPercentage);
            }
          });
        },
        {
          threshold: 0.5, // Trigger when 50% of step is visible
          rootMargin: '-20% 0px -50% 0px', // Offset for better UX
        }
      );

      observer.observe(stepRef);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [steps.length]);

  return (
    <section className="py-12 sm:py-16 md:py-20" style={{ background: 'var(--bg-warm)' }}>
      <div className="max-w-[var(--container-content)] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <span className="font-medium text-black/40 uppercase tracking-[3px] mb-6 md:mb-8 block" style={{ fontSize: 'var(--text-nav)' }}>
            Our Methodology
          </span>
          
          <h2 className="leading-[1.15] font-light text-black tracking-tight mb-4 md:mb-6" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 4.5vw, var(--text-2xl))' }}>
            Consulting Approach & Initiatives
          </h2>

          <p className="leading-[1.7] text-black/70 max-w-[var(--container-compact)]" style={{ fontSize: 'var(--text-sm)' }}>
            A systematic, research-driven approach designed to deliver actionable insights and sustainable outcomes
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative" ref={timelineRef}>
          {/* Timeline Vertical Line (Base) - Positioned on the left - Hidden on Mobile */}
          <div className="absolute left-0 top-0 bottom-0 w-px hidden md:block" style={{ left: '28px', background: 'var(--bg-warm-600)' }} />

          {/* Timeline Vertical Line (Fill) - Animates on scroll - Hidden on Mobile */}
          <div 
            className="absolute left-0 top-0 w-px hidden md:block transition-all duration-700 ease-out" 
            style={{ 
              left: '28px', 
              background: 'rgba(0,0,0,1)',
              height: `${timelineFillHeight}%`,
              zIndex: 1
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
                  className="relative pb-12 md:pb-16 last:pb-0"
                  ref={(el) => (stepRefs.current[index] = el)}
                >
                  {/* Step Node Container */}
                  <div className="flex items-start gap-4 md:gap-8">
                    {/* Left Side - Step Number Node - Hidden on Mobile */}
                    <div className="relative flex-shrink-0 hidden md:block">
                      {/* Circular Node with State-Based Styling + Pulse Animation */}
                      <div 
                        className={`w-12 md:w-14 h-12 md:h-14 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 ${
                          isCurrent 
                            ? 'bg-black border-2 border-black shadow-lg animate-pulse-subtle' 
                            : isPast 
                              ? 'border-2' 
                              : 'bg-white border-2'
                        }`}
                        style={{ 
                          borderColor: isCurrent ? '#000' : 'var(--bg-warm-700)',
                          backgroundColor: isPast ? 'var(--bg-warm)' : undefined,
                          animation: isCurrent ? 'pulse-subtle 2.5s ease-in-out infinite' : 'none'
                        }}
                      >
                        <span 
                          className={`font-medium transition-colors ${
                            isCurrent ? 'text-white' : isPast ? 'text-black/30' : 'text-black'
                          }`}
                          style={{ fontSize: 'var(--text-base)' }}
                        >
                          {step.number}
                        </span>
                      </div>

                      {/* Subtle glow effect - Enhanced for current step */}
                      {isCurrent && (
                        <div className="absolute inset-0 w-12 md:w-14 h-12 md:h-14 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.08) 0%, transparent 70%)' }} />
                      )}
                    </div>

                    {/* Right Side - Step Content Card */}
                    <div className="flex-1 group pt-0 md:pt-1">
                      {/* Card Container with Gradient Fade */}
                      <div 
                        className="relative bg-white border p-6 md:p-8 transition-all duration-300 cursor-pointer overflow-hidden" 
                        style={{ 
                          borderColor: 'var(--bg-warm-500)', 
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                          borderRadius: 'var(--radius-element)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 8px 20px rgba(223, 234, 250, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04)';
                        }}
                      >
                        {/* Step Label */}
                        <div className="mb-4">
                          <span className="inline-block px-3 py-1 rounded-full border bg-black/[0.02] text-black/50 uppercase tracking-[2px] font-medium" style={{ fontSize: 'var(--text-xs)', borderColor: 'var(--bg-warm-500)' }}>
                            Step {index + 1} of {steps.length}
                          </span>
                        </div>

                        {/* Step Title */}
                        <h3 className="font-medium text-black leading-[1.3] tracking-tight mb-4 transition-colors" style={{ fontSize: 'var(--text-xl)' }}>
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
      </div>
    </section>
  );
}