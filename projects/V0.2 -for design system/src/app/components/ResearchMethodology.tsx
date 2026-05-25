import { useState } from 'react';
import { Search, CircleCheckBig, FileCheck, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { MethodologyCard } from '@/app/components/ui/methodology-card';

// Research Methodology Component
export function ResearchMethodology() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { id: 0, label: 'Approach', number: 1 },
    { id: 1, label: 'Data Collection', number: 2 },
    { id: 2, label: 'Validation', number: 3 },
  ];

  const methodologies = [
    {
      icon: Search,
      title: 'Desk Research',
      description: 'Comprehensive secondary research from authoritative sources.',
      items: [
        'Market reports from agricultural associations',
        'Government publications on policies',
        'Trade statistics and import/export data',
        'Company annual reports analysis',
      ],
    },
    {
      icon: CircleCheckBig,
      title: 'Primary Research',
      description: 'Direct engagement with industry participants.',
      items: [
        'Interviews with local farmers',
        'Surveys with wholesalers and retailers',
        'Field visits to markets',
        'Expert interviews with consultants',
      ],
    },
    {
      icon: FileCheck,
      title: 'Validation',
      description: 'Multi-source verification for accuracy.',
      items: [
        'Cross-validation through multiple sources',
        'Triangulation of market trends',
        'Expert panel discussions',
        'Statistical modeling validation',
      ],
    },
  ];

  return (
    <section id="methodology" className="py-24 lg:py-32 bg-white relative overflow-hidden">
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
          <div className="mb-4">
            <span className="text-[var(--brand-red)] font-bold tracking-widest uppercase text-sm">
              CHAPTER 11 - Our Approach
            </span>
          </div>
          <h2 className="font-display text-4xl tracking-tight mb-6 text-foreground">
            Research Methodology
          </h2>
          <p className="text-base leading-relaxed max-w-3xl text-[var(--black-500)]">
            Our multi-layered approach combines rigorous desk research with primary data collection and expert validation to ensure accuracy and reliability.
          </p>
        </div>

        {/* Step Navigation */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <Button
                  variant={activeStep === step.id ? 'ctaBlack' : 'outline'}
                  size="default"
                  onClick={() => setActiveStep(step.id)}
                  className={`gap-2 ${
                    activeStep === step.id 
                      ? 'hover:!bg-foreground' 
                      : '!text-foreground !border-foreground hover:!bg-[var(--black-50)] hover:!text-foreground'
                  }`}
                >
                  <span
                    className={`size-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      activeStep === step.id ? 'bg-white/20' : 'bg-[var(--black-200)]'
                    }`}
                  >
                    {step.number}
                  </span>
                  <span className="hidden sm:inline">{step.label}</span>
                </Button>
                {index < steps.length - 1 && (
                  <ChevronRight className="h-5 w-5 text-[var(--black-300)] mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Methodology Cards */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-5">
          {methodologies.map((methodology, index) => (
            <MethodologyCard
              key={index}
              icon={methodology.icon}
              title={methodology.title}
              description={methodology.description}
              items={methodology.items}
              isActive={activeStep === index}
              onClick={() => setActiveStep(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}