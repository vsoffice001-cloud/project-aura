import { useState, useEffect, useRef } from 'react';
import { BackgroundHighlight } from './BackgroundHighlight';
import { Container } from './Container';
import { ObjectivePillInteractive, SectionLabel } from '@/app/components/Badge';

interface Objective {
  number: string;
  title: string;
  description: string;
}

interface EngagementObjectivesSectionProps {
  objectives: Objective[];
}

export function EngagementObjectivesSection({
  objectives
}: EngagementObjectivesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const objectiveRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = objectiveRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: '-20% 0px -20% 0px'
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (observer && objectiveRefs.current[index]) {
          observer.unobserve(objectiveRefs.current[index]!);
        }
      });
    };
  }, [objectives]);

  return (
    <section id="engagement" className="relative" style={{ paddingTop: 'var(--section-py-standard)', paddingBottom: 'var(--section-py-standard)', background: '#ffffff', overflow: 'clip' }}>
      {/* PREMIUM OBJECTIVES BACKGROUND - Subtle Amber + Light Red + Periwinkle + White */}
      <BackgroundHighlight theme="objectives-premium" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] lg:items-start" style={{ gap: 'var(--content-gap)', columnGap: 'var(--content-gap-md)' }}>
          {/* Left Column - Section Header (Sticky on Desktop) */}
          <div 
            className="lg:sticky"
            style={{
              top: '104px', // 60px navbar + 44px section nav
              alignSelf: 'flex-start'
            }}
          >
            {/* Category Label */}
            <SectionLabel>Engagement Value Pillars</SectionLabel>

            {/* Section Title */}
            <h2 
              className="leading-[1.15] font-light text-black tracking-tight" 
              style={{ 
                fontFamily: "'Noto Serif', serif", 
                fontSize: 'var(--text-2xl)',
                marginBottom: 'var(--pair-heading-description)'
              }}
            >
              Engagement Objectives
            </h2>
            
            {/* Section Description */}
            <p 
              className="leading-[1.7] text-black/70" 
              style={{ 
                fontSize: 'var(--text-sm)'
              }}
            >
              Strategic consulting objectives designed to provide actionable insights and sustainable competitive advantages
            </p>

            {/* Scroll Navigation Indicators */}
            <div className="mt-6 md:mt-8 flex flex-row gap-2 items-center w-[55%]">
              {objectives.map((_, index) => (
                <div 
                  key={index}
                  className="transition-all duration-300"
                  style={{
                    height: '2px',
                    flex: activeIndex === index ? '3' : '1',
                    backgroundColor: activeIndex === index ? 'rgba(0, 0, 0, 0.65)' : 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '2px',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Objectives Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--content-gap)', rowGap: 'var(--content-gap-md)' }}>
            {objectives.map((objective, index) => (
              <div 
                key={index}
                ref={(el) => (objectiveRefs.current[index] = el)}
                className="group"
              >
                {/* Objective Badge with Shimmer Effect */}
                <div className="mb-6">
                  <ObjectivePillInteractive
                    number={objective.number}
                    label="Objective"
                  />
                </div>

                {/* Objective Title */}
                <h3 className="font-medium text-black leading-[1.3] tracking-tight mb-4 group-hover:text-black/80 transition-colors" style={{ fontSize: 'var(--text-lg)' }}>
                  {objective.title}
                </h3>

                {/* Objective Description */}
                <p className="leading-[1.7] text-black/70 transition-colors" style={{ fontSize: 'var(--text-sm)' }}>
                  {objective.description}
                </p>

                {/* Divider (except for last item) */}
                {index < objectives.length - 1 && (
                  <div className="mt-12 h-px w-full bg-black/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}