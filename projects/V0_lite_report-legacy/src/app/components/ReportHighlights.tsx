import { TrendingUp, Globe, Building2, Lightbulb, Target, Zap } from 'lucide-react';
import { SectionLabel } from '@/design-system/components/SectionLabel';
import { SectionHeading } from '@/design-system/components/SectionHeading';
import { iconColors } from '@/design-system/iconColors';
import { motion } from 'motion/react';

const highlights = [
  {
    icon: TrendingUp,
    title: 'Rapid Market Growth',
    description:
      'The AI healthcare market is projected to grow from $45.2B in 2024 to $188.4B by 2030, representing a 32.5% CAGR.',
    badge: '+316%',
    badgeLabel: 'Growth',
  },
  {
    icon: Globe,
    title: 'Regional Insights',
    description:
      'North America leads with 45.2% market share, followed by Europe (28.3%) and Asia-Pacific (19.8%) as the fastest-growing region at 38.5% CAGR.',
    badge: '50+',
    badgeLabel: 'Countries',
  },
  {
    icon: Building2,
    title: 'Competitive Analysis',
    description:
      'Top players include IBM Watson Health, Google Health, Microsoft Healthcare, NVIDIA Clara, and Philips HealthSuite with detailed strategic profiles.',
    badge: '200+',
    badgeLabel: 'Companies',
  },
  {
    icon: Lightbulb,
    title: 'Technology Trends',
    description:
      'Machine learning diagnostics (34%), NLP for EHR (22%), computer vision in radiology (18%), and generative AI (15%) lead innovation.',
    badge: '15+',
    badgeLabel: 'Tech Areas',
  },
  {
    icon: Target,
    title: 'Application Segments',
    description:
      'Drug discovery leads at 40.3% ($18.2B), diagnostics 27.6% ($12.5B), precision medicine 18.5% ($8.4B), and clinical trials 8.2% ($3.7B).',
    badge: '6',
    badgeLabel: 'Segments',
  },
  {
    icon: Zap,
    title: 'Growth Drivers',
    description:
      'Rising healthcare costs ($4.1T globally), aging populations (1.5B over 60), shortage of 18M professionals, and precision medicine demand.',
    badge: '12',
    badgeLabel: 'Drivers',
  },
];

function HighlightCard({ highlight, index }: { highlight: typeof highlights[number]; index: number }) {
  const Icon = highlight.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group bg-white rounded-[10px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300"
    >
      {/* Top row: icon box + stat badge */}
      <div className="flex items-start justify-between mb-5">
        <div
          className="size-11 rounded-[10px] flex items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.05)] bg-content-icon/10"
        >
          <Icon className="h-5 w-5" strokeWidth={2} color={iconColors.content} />
        </div>
        <span
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[5px] text-[0.8rem] leading-[1.5]"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          }}
        >
          <span className="font-medium text-black">{highlight.badge}</span>
          <span className="text-[var(--black-500)]">{highlight.badgeLabel}</span>
        </span>
      </div>

      {/* Title */}
      <h4 className="font-sans font-medium text-[1.25rem] text-black leading-[1.4] mb-2">
        {highlight.title}
      </h4>

      {/* Description */}
      <p className="text-[0.8rem] text-utility-icon leading-[1.5]">
        {highlight.description}
      </p>
    </motion.div>
  );
}

export function ReportHighlights() {
  return (
    <section className="relative py-12 md:py-20 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gray-50"></div>

      <div className="container relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl text-left mb-10">
          <div className="inline-flex mb-3">
            <SectionLabel background="light" variant="accent">
              KEY INSIGHTS
            </SectionLabel>
          </div>
          <SectionHeading level={2} align="left">
            What's Included
          </SectionHeading>
          <p className="text-[1rem] text-utility-icon mt-3 leading-[1.6]">
            Discover the key findings and insights from our comprehensive market analysis
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((highlight, index) => (
            <HighlightCard key={highlight.title} highlight={highlight} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}