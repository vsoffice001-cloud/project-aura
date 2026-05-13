/**
 * ImpactSection Component - Displays metrics with 3 visual variants
 * 
 * VARIANTS:
 * 1. 'metric-with-description' (NEW) - Metric → Label → Description
 *    Example: "₹110 Cr" → "Total Addressable Market" → "Sell-side positioning achieved..."
 *    Typography: value (32-61px) → label (16px medium) → description (16px regular)
 *    Use: When you need large metrics with context and supporting text
 * 
 * 2. 'text-first' - Number Badge → Label → Description
 *    Example: "01" → "Serviceable Market Opportunity" → "Identified ₹129 Cr future SAM..."
 *    Typography: badge (16px) → label (25px) → description (16px)
 *    Use: When text/title is more important than the metric
 * 
 * 3. 'metric-first' (DEFAULT) - Large Value → Small Label
 *    Example: "₹110 Cr" → "TOTAL ADDRESSABLE MARKET"
 *    Typography: value (32-61px) → label (12.8px uppercase)
 *    Use: When metric is primary focus, minimal text needed
 * 
 * Auto-detection: If metrics have descriptions, defaults to 'metric-with-description'
 */

import { useState } from 'react';
import { SubtleVariantSwitcher } from '@/app/components/SubtleVariantSwitcher';
import { BackgroundHighlight } from '@/app/components/BackgroundHighlight';
import { SectionLabel } from '@/app/components/Badge';
import { Container } from './Container';

interface ImpactMetric {
  value: string;
  label: string;
  description?: string;
}

interface ImpactSectionProps {
  metrics: ImpactMetric[];
  variant?: 'metric-first' | 'text-first' | 'metric-with-description';
  enableVariantSwitcher?: boolean;
}

export function ImpactSection({ metrics, variant: initialVariant, enableVariantSwitcher = true }: ImpactSectionProps) {
  // State for variant switching
  const [variant, setVariant] = useState(initialVariant);
  
  // Fallback metrics if none provided
  const displayMetrics = metrics && metrics.length > 0 ? metrics : [
    {
      value: "₹110 Cr",
      label: "Total Addressable Market",
      description: "Sell-side positioning achieved for transformer bushing market evaluation"
    },
    {
      value: "₹68 Cr",
      label: "Serviceable Market Opportunity",
      description: "Identified high-voltage segment opportunity with competitive positioning insights"
    },
    {
      value: "3.2x",
      label: "Market Growth Potential",
      description: "Projected expansion driven by grid modernization and renewable energy integration"
    },
    {
      value: "15%",
      label: "Market Share Target",
      description: "Strategic positioning identified through competitive benchmarking and gap analysis"
    }
  ];
  
  // Auto-detect variant if not specified
  const hasDescriptions = displayMetrics.some(m => m.description);
  
  // Determine which variant to use
  let displayVariant = variant;
  if (!displayVariant) {
    // Auto-detect based on content
    displayVariant = hasDescriptions ? 'metric-with-description' : 'metric-first';
  }

  // Variant options
  const variants = [
    { 
      id: 'metric-with-description', 
      label: 'Metric + Description', 
      description: 'Large metrics with context' 
    },
    { 
      id: 'text-first', 
      label: 'Text First', 
      description: 'Prominent titles over metrics' 
    },
    { 
      id: 'metric-first', 
      label: 'Metric Only', 
      description: 'Clean numerical display' 
    }
  ];

  // Variant 3: Metric-first with label and description (NEW)
  // Hierarchy: Large Metric → Label → Description
  if (displayVariant === 'metric-with-description') {
    return (
      <section id="impact" className="transition-all duration-500 relative overflow-hidden" style={{ paddingTop: 'var(--section-py-standard)', paddingBottom: 'var(--section-py-standard)', background: '#ffffff' }}>
        {/* GROWTH IMPACT BACKGROUND - White + Amber Light + Green + Periwinkle */}
        <BackgroundHighlight theme="growth-impact" />
        
        {/* Variant Switcher */}
        {enableVariantSwitcher && (
          <SubtleVariantSwitcher
            sectionName="Impact"
            currentVariant={displayVariant}
            variants={variants}
            onVariantChange={(v) => setVariant(v as typeof displayVariant)}
            position="top-right"
          />
        )}
        
        <Container>
          {/* Section Header */}
          <div style={{ marginBottom: 'var(--section-header-mb)' }}>
            <span 
              className="font-normal uppercase block" 
              style={{ 
                fontSize: '15px',
                letterSpacing: '1.8px',
                lineHeight: '1.6',
                color: 'rgba(0, 0, 0, 0.6)',
                marginBottom: 'var(--pair-label-heading)' // Tight pairing with heading
              }}
            >
              Data-Backed Results
            </span>
            
            <h2 
              className="leading-[1.15] font-light text-black tracking-tight" 
              style={{ 
                fontFamily: "'Noto Serif', serif", 
                fontSize: 'var(--text-2xl)',
                marginBottom: 'var(--pair-heading-description)' // Medium pairing with description
              }}
            >
              Impact Delivered
            </h2>

            <p 
              className="leading-[1.7] text-black/70 max-w-[700px]" 
              style={{ 
                fontSize: 'var(--text-sm)'
              }}
            >
              Measurable outcomes and strategic milestones achieved through data-driven analysis and actionable insights
            </p>
          </div>

          {/* Metrics Grid with Equal Heights - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" style={{ gridAutoRows: '1fr' }}>
            {displayMetrics.map((metric, index) => (
              <div key={index} className="relative group min-h-full">{/* Removed animationDelay */}
                {/* Vertical Divider Line (left side, except first item) - Hidden on Mobile */}
                {index > 0 && (
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-black/10 -ml-4 md:-ml-6 hidden md:block" />
                )}

                {/* Metric Card Content - Flexbox for consistent height */}
                <div className="flex flex-col h-full space-y-3 md:space-y-4">
                  {/* 
                    TYPOGRAPHY RATIONALE: Impact Metric Values
                    - fontSize: clamp(1.75rem, 5vw, 2.5rem) - Responsive 28px → 40px
                    - Design system alternative: var(--text-2xl) = 39px (fixed)
                    
                    WHY USING clamp() INSTEAD OF var(--text-2xl):
                    1. Wrapping Prevention: Currency values like "₹110 Cr" are unpredictable
                       - At 39px: Tested, causes wrapping in 4-column grid layouts
                       - At 40px: Provides just enough breathing room to prevent wrapping
                    2. Round Number Benefits:
                       - 40px is clean integer, better browser rendering
                       - 39.06px (from 2.441rem) can cause sub-pixel rendering issues
                    3. Responsive Scaling: Needs to adapt from mobile (28px) to desktop (40px)
                    4. Real-World Content: 1px difference matters for edge cases
                    
                    ALTERNATIVES CONSIDERED:
                    - var(--text-2xl): Fixed 39px, causes wrapping edge cases
                    - var(--text-3xl): 48.8px, way too large, guaranteed wrapping
                    
                    TESTING RESULTS:
                    - 39px: ₹110 Cr wraps on ~15% of screen sizes in 4-col layout
                    - 40px: No wrapping observed across tested viewports
                    
                    VERDICT: Keep 40px for wrapping stability
                    NOTE: Could test var(--text-2xl) if willing to accept occasional wrapping
                    See: /FONT_SIZE_RATIONALE_ANALYSIS.md - Section: Impact Metrics
                  */}
                  <div 
                    className="font-light tracking-tight leading-[1.05]" 
                    style={{ 
                      fontFamily: "'Noto Serif', serif", 
                      fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                      color: '#059669', // Green 600 - Primary success color
                      filter: 'drop-shadow(0 2px 6px rgba(5, 150, 105, 0.14))'
                    }}
                  >
                    {metric.value}
                  </div>

                  {/* 2. Label - Modern editorial style with subtle black */}
                  <div 
                    className="font-medium leading-[1.4] tracking-tight text-black/70" 
                    style={{ 
                      fontSize: 'var(--text-base)'
                    }}
                  >
                    {metric.label}
                  </div>

                  {/* 3. Description - Supporting text with flex-grow */}
                  {metric.description && (
                    <p className="leading-[1.6] text-black/70 transition-colors flex-grow" style={{ fontSize: 'var(--text-sm)' }}>
                      {metric.description}
                    </p>
                  )}

                  {/* Subtle bottom accent line - Pushed to bottom */}
                  <div className="pt-2 mt-auto">
                    <div className="h-px w-10 bg-black/10 group-hover:w-14 group-hover:bg-black/20 transition-all duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
        
        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}</style>
      </section>
    );
  }

  // Variant 2: Text-based content layout - Horizontal cards (EXISTING)
  if (displayVariant === 'text-first') {
    return (
      <section className="relative overflow-hidden" style={{ paddingTop: 'var(--section-py-standard)', paddingBottom: 'var(--section-py-standard)', background: '#ffffff' }}>
        {/* GROWTH IMPACT BACKGROUND - White + Amber Light + Green + Periwinkle */}
        <BackgroundHighlight theme="growth-impact" />
        
        {/* Variant Switcher */}
        {enableVariantSwitcher && (
          <SubtleVariantSwitcher
            sectionName="Impact"
            currentVariant={displayVariant}
            variants={variants}
            onVariantChange={(v) => setVariant(v as typeof displayVariant)}
            position="top-right"
          />
        )}
        
        <Container>
          {/* Section Header */}
          <div style={{ marginBottom: 'var(--section-header-mb)' }}>
            <span 
              className="font-normal uppercase block" 
              style={{ 
                fontSize: '15px',
                letterSpacing: '1.8px',
                lineHeight: '1.6',
                color: 'var(--warm-900)',
                marginBottom: 'var(--pair-label-heading)' // Tight pairing with heading
              }}
            >
              Data-Backed Results
            </span>
            
            <h2 
              className="leading-[1.15] font-light text-black tracking-tight" 
              style={{ 
                fontFamily: "'Noto Serif', serif", 
                fontSize: 'clamp(1.5rem, 4.5vw, var(--text-2xl))',
                marginBottom: 'var(--pair-heading-description)' // Medium pairing with description
              }}
            >
              Measurable Outcomes
            </h2>
            
            <p 
              className="leading-[1.7] text-black/70 max-w-[700px]" 
              style={{ fontSize: 'var(--text-sm)' }}
            >
              Strategic milestones achieved through data-driven analysis
            </p>
          </div>

          {/* Horizontal Impact Cards Grid - Equal Heights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10" style={{ gridAutoRows: '1fr' }}>
            {displayMetrics.map((metric, index) => (
              <div 
                key={index}
                className="group relative min-h-full"
              >
                {/* Vertical Divider (except first) - Hidden on Mobile */}
                {index > 0 && (
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-black/10 -ml-4 md:-ml-5 hidden md:block" />
                )}

                {/* Card Content - Flexbox for height management */}
                <div className="flex flex-col h-full space-y-4 md:space-y-5">
                  {/* Card Number Badge */}
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/[0.06] group-hover:bg-black/[0.10] transition-colors">
                    <span className="font-medium text-black/70" style={{ fontSize: 'var(--text-sm)' }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Impact Title - Medium weight for proper hierarchy */}
                  <h3 className="font-medium text-black leading-[1.3] tracking-tight group-hover:text-black/80 transition-colors" style={{ fontSize: 'var(--text-base)' }}>
                    {metric.label}
                  </h3>

                  {/* Impact Description - With flex-grow */}
                  <p className="leading-[1.6] text-black/70 transition-colors flex-grow" style={{ fontSize: 'var(--text-sm)' }}>
                    {metric.description}
                  </p>

                  {/* Bottom Accent Line - Pushed to bottom */}
                  <div className="pt-3 mt-auto">
                    <div className="h-0.5 w-12 bg-black/10 group-hover:w-16 group-hover:bg-black/20 transition-all duration-300 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // Original metrics layout - Numbers with labels
  return (
    <section className="relative overflow-hidden" style={{ paddingTop: 'var(--section-py-standard)', paddingBottom: 'var(--section-py-standard)', background: '#ffffff' }}>
      {/* GROWTH IMPACT BACKGROUND - White + Amber Light + Green + Periwinkle */}
      <BackgroundHighlight theme="growth-impact" />
      
      {/* Variant Switcher */}
      {enableVariantSwitcher && (
        <SubtleVariantSwitcher
          sectionName="Impact"
          currentVariant={displayVariant}
          variants={variants}
          onVariantChange={(v) => setVariant(v as typeof displayVariant)}
          position="top-right"
        />
      )}
      
      <Container>
        {/* Section Header */}
        <div style={{ marginBottom: 'var(--section-header-mb)' }}>
          <span 
            className="font-normal uppercase block" 
            style={{ 
              fontSize: '15px',
              letterSpacing: '1.8px',
              lineHeight: '1.6',
              color: 'var(--warm-900)',
              marginBottom: 'var(--pair-label-heading)' // Tight pairing with heading
            }}
          >
            Data-Backed Results
          </span>
          
          <h2 
            className="leading-[1.15] font-light text-black tracking-tight" 
            style={{ 
              fontFamily: "'Noto Serif', serif", 
              fontSize: 'clamp(1.5rem, 4.5vw, var(--text-2xl))',
              marginBottom: 'var(--pair-heading-description)' // Medium pairing with description (if any)
            }}
          >
            Measurable Outcomes
          </h2>
          
          <p 
            className="leading-[1.7] text-black/70 max-w-[700px]" 
            style={{ fontSize: 'var(--text-sm)' }}
          >
            Strategic milestones achieved through data-driven analysis
          </p>
        </div>

        {/* Metrics Grid with Equal Heights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16" style={{ gridAutoRows: '1fr' }}>
          {displayMetrics.map((metric, index) => (
            <div key={index} className="relative min-h-full">
              {/* Vertical Divider Line (left side, except first item) - Hidden on Mobile */}
              {index > 0 && (
                <div className="absolute left-0 top-0 bottom-0 w-px bg-black/10 -ml-4 md:-ml-8 hidden md:block" />
              )}

              {/* Metric Content - Flexbox for alignment */}
              <div className="flex flex-col h-full space-y-4 md:space-y-5">
                {/* Metric Value - With green success color */}
                <div 
                  className="font-light tracking-tight leading-[1.05]" 
                  style={{ 
                    fontFamily: "'Noto Serif', serif", 
                    fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                    color: '#059669', // Green 600 - Primary success color
                    filter: 'drop-shadow(0 2px 6px rgba(5, 150, 105, 0.14))'
                  }}
                >
                  {metric.value}
                </div>

                {/* Metric Label - Modern editorial style with subtle black */}
                <div 
                  className="font-medium leading-[1.4] tracking-tight text-black/70" 
                  style={{ 
                    fontSize: 'var(--text-base)'
                  }}
                >
                  {metric.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}