'use client';

import { TrendingUp, Globe, Building2, Lightbulb, Target, Zap, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionHeading, SectionLabel } from '@kenresearch/design-system/atoms';

interface Highlight {
  icon: LucideIcon;
  title: string;
  description: string;
  badge: string;
  badgeLabel: string;
}

const highlights: Highlight[] = [
  {
    icon: TrendingUp,
    title: 'Rapid Market Growth',
    description: 'The AI healthcare market is projected to grow from $45.2B in 2024 to $188.4B by 2030, representing a 32.5% CAGR.',
    badge: '+316%',
    badgeLabel: 'Growth',
  },
  {
    icon: Globe,
    title: 'Regional Insights',
    description: 'North America leads with 45.2% market share, followed by Europe (28.3%) and Asia-Pacific (19.8%) as the fastest-growing region at 38.5% CAGR.',
    badge: '50+',
    badgeLabel: 'Countries',
  },
  {
    icon: Building2,
    title: 'Competitive Analysis',
    description: 'Top players include IBM Watson Health, Google Health, Microsoft Healthcare, NVIDIA Clara, and Philips HealthSuite with detailed strategic profiles.',
    badge: '200+',
    badgeLabel: 'Companies',
  },
  {
    icon: Lightbulb,
    title: 'Technology Trends',
    description: 'Machine learning diagnostics (34%), NLP for EHR (22%), computer vision in radiology (18%), and generative AI (15%) lead innovation.',
    badge: '15+',
    badgeLabel: 'Tech Areas',
  },
  {
    icon: Target,
    title: 'Application Segments',
    description: 'Drug discovery leads at 40.3% ($18.2B), diagnostics 27.6% ($12.5B), precision medicine 18.5% ($8.4B), and clinical trials 8.2% ($3.7B).',
    badge: '6',
    badgeLabel: 'Segments',
  },
  {
    icon: Zap,
    title: 'Growth Drivers',
    description: 'Rising healthcare costs ($4.1T globally), aging populations (1.5B over 60), shortage of 18M professionals, and precision medicine demand.',
    badge: '12',
    badgeLabel: 'Drivers',
  },
];

function HighlightCard({ highlight, index }: { highlight: Highlight; index: number }) {
  const Icon = highlight.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group bg-[var(--color-foundation-white)] rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-5">
        <div className="size-11 rounded-[var(--radius-card)] flex items-center justify-center shadow-[var(--shadow-sm)] bg-[var(--color-accent-purple)]/10">
          <Icon className="h-5 w-5 text-[var(--color-accent-purple)]" strokeWidth={2} />
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[var(--radius-button)] text-[var(--typography-size-xs)] leading-[1.5] bg-[var(--tint-default)]">
          <span className="font-medium text-[var(--surface-text)]">{highlight.badge}</span>
          <span className="text-[var(--surface-text-muted)]">{highlight.badgeLabel}</span>
        </span>
      </div>
      <h4 className="font-[var(--typography-family-body)] font-medium text-[var(--typography-size-base)] text-[var(--surface-text)] leading-[1.4] mb-2">
        {highlight.title}
      </h4>
      <p className="text-[var(--typography-size-xs)] text-[var(--surface-text-muted)] leading-[1.5]">
        {highlight.description}
      </p>
    </motion.div>
  );
}

/**
 * ReportHighlights — 6-card grid of key research insights.
 * @port V0_lite_report-legacy/src/app/components/ReportHighlights.tsx
 */
export function ReportHighlights() {
  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-[var(--color-ramp-black-50)]">
      <div className="container relative max-w-[var(--container-page)] mx-auto px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl text-left mb-10">
          <div className="inline-flex mb-3">
            <SectionLabel background="light" variant="accent">
              KEY INSIGHTS
            </SectionLabel>
          </div>
          <SectionHeading level={2} align="left">
            What&apos;s Included
          </SectionHeading>
          <p className="text-[var(--typography-size-sm)] text-[var(--surface-text-muted)] mt-3 leading-[1.6]">
            Discover the key findings and insights from our comprehensive market analysis
          </p>
        </div>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((highlight, index) => (
            <HighlightCard key={highlight.title} highlight={highlight} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
