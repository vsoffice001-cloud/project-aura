import { Users } from '@phosphor-icons/react';
import { Sparkles, CircleCheckBig } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { StakeholderCard } from '@/app/components/ui/stakeholder-card';
import { getStakeholderIconByIndex } from '@/app/constants/stakeholder-icons';

export function TargetAudience() {
  const stakeholders = [
    {
      title: 'Investors & VCs',
      description: 'Market entry opportunities and ROI analysis',
      icon: getStakeholderIconByIndex(0),
    },
    {
      title: 'Food Service Providers',
      description: 'Restaurants, hotels, and catering',
      icon: getStakeholderIconByIndex(1),
    },
    {
      title: 'Government Bodies',
      description: 'Regulatory and policy stakeholders',
      icon: getStakeholderIconByIndex(2),
    },
    {
      title: 'Exporters & Importers',
      description: 'Trade and logistics companies',
      icon: getStakeholderIconByIndex(3),
    },
    {
      title: 'Industry Associations',
      description: 'Agricultural associations',
      icon: getStakeholderIconByIndex(4),
    },
    {
      title: 'Manufacturers',
      description: 'Farms and processing units',
      icon: getStakeholderIconByIndex(5),
    },
    {
      title: 'Financial Institutions',
      description: 'Banks and investment funds',
      icon: getStakeholderIconByIndex(6),
    },
    {
      title: 'Distributors & Retailers',
      description: 'Supermarkets and online platforms',
      icon: getStakeholderIconByIndex(7),
    },
  ];

  const benefits = [
    'Strategic market entry guidance',
    'Competitive intelligence insights',
    'Investment opportunity identification',
    'Regulatory landscape understanding',
    'Consumer trend analysis',
    'Growth projection data',
  ];

  return (
    <section id="target-audience" className="py-24 lg:py-32 bg-[var(--black-50)] relative overflow-hidden">
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
              CHAPTER 10 - Key Stakeholders
            </span>
          </div>
          <h2 className="font-display text-4xl tracking-tight mb-6 text-foreground">
            Who This Report Is For
          </h2>
          <p className="text-base leading-relaxed max-w-3xl text-[var(--black-500)]">
            Designed for diverse stakeholders across the fresh herbs value chain seeking actionable market intelligence and strategic insights.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left side: Stakeholder Cards (2 columns) */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4">
              {stakeholders.map((stakeholder, index) => (
                <StakeholderCard
                  key={index}
                  icon={stakeholder.icon}
                  title={stakeholder.title}
                  description={stakeholder.description}
                />
              ))}
            </div>
          </div>

          {/* Right side: What You'll Gain Card */}
          <div>
            <Card className="bg-white border border-[var(--black-200)] h-full rounded-[10px] hover:border-[var(--black-400)] transition-colors duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="size-5 text-[var(--purple-500)]" />
                  <h3 className="text-xl font-bold text-foreground">
                    What You'll Gain
                  </h3>
                </div>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CircleCheckBig 
                        className="size-5 shrink-0 mt-0.5 text-[var(--purple-500)]" 
                      />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-[var(--black-100)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-bold text-foreground">82+</p>
                      <p className="text-sm text-[var(--black-500)]">Pages of insights</p>
                    </div>
                    <Button variant="secondary" size="default">
                      Talk to an Expert
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}