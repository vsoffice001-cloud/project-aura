'use client';

import { Globe, Calendar, FileText, Users, MousePointer2, Download, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@kenresearch/design-system/atoms';
import { reportMeta } from '@/lib/mock-data';

interface DetailRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

function DetailRow({ icon: Icon, label, value }: DetailRowProps) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="h-4 w-4 mt-0.5 flex-shrink-0 text-white/60" strokeWidth={1.6} />
      <div className="min-w-0">
        <p className="text-[0.625rem] uppercase tracking-[0.15em] text-white/50 font-medium leading-none">
          {label}
        </p>
        <p className="text-[var(--typography-size-base)] font-[var(--typography-family-display)] font-light text-white mt-2 truncate">
          {value}
        </p>
      </div>
    </div>
  );
}

/**
 * HeroSection — cinematic-dark report hero (KSA Coldchain reference pattern).
 *
 * Layout: 2-column grid (lg:grid-cols-2). Left: top-badges (region + month),
 * serif title, year range, body description, primary + ghost CTAs, scroll cue.
 * Right: glass card "Report Details" w/ 4-cell grid + Product Code + ghost CTA.
 *
 * Uses cinematic-dark surface tokens regardless of root variant — hero always dark.
 *
 * @port simplified replacement for V0_lite_report-legacy/src/app/components/HeroSection.tsx
 *       (729 LOC w/ variant DSL deferred). Reference: kenresearch.com/ksa-coldchain-test-market.
 */
export function HeroSection() {
  return (
    <header
      className="relative bg-[var(--variant-cinematic-bg-deep,#0a0a0c)] text-white overflow-hidden"
      data-section="hero"
      data-variant-section="cinematic"
    >
      <div className="relative z-[2] container max-w-[var(--container-page)] mx-auto px-4 sm:px-6 md:px-8 py-20 sm:py-28 md:py-32">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT — copy + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-6"
          >
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-[var(--typography-size-xs)] text-white/85 font-medium">
                <Globe className="h-3.5 w-3.5" strokeWidth={1.6} />
                {reportMeta.region}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-[var(--typography-size-xs)] text-white/85 font-medium">
                <Calendar className="h-3.5 w-3.5" strokeWidth={1.6} />
                {reportMeta.monthLabel}
              </span>
            </div>

            <h1 className="font-[var(--typography-family-display)] font-light text-[2.5rem] sm:text-[3rem] md:text-[3.75rem] leading-[1.05] tracking-tight">
              {reportMeta.title}
            </h1>

            <p className="text-[var(--typography-size-base)] text-white/55 font-light">
              {reportMeta.yearsRange}
            </p>

            <p className="text-[var(--typography-size-sm)] text-white/70 leading-relaxed max-w-[40rem]">
              {reportMeta.bodyDescription}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button variant="brand" size="lg" icon={<Download />} iconPosition="left">
                {reportMeta.ctaPrimaryLabel}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                background="dark"
                icon={<ArrowRight />}
                iconPosition="right"
              >
                {reportMeta.ctaSecondaryLabel}
              </Button>
            </div>
          </motion.div>

          {/* RIGHT — Report Details glass card */}
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="relative"
          >
            <div className="rounded-[var(--radius-card)] border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 sm:p-8 md:p-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-[var(--typography-family-display)] font-light text-[var(--typography-size-xl)] text-white">
                  Report Details
                </h2>
                <span className="block w-12 h-px bg-white/15" aria-hidden />
              </div>

              <dl className="grid grid-cols-2 gap-x-8 gap-y-6 mb-6">
                <DetailRow icon={Calendar} label="Base Year" value={reportMeta.baseYear} />
                <DetailRow icon={FileText} label="Pages" value={reportMeta.pages} />
                <DetailRow icon={Globe} label="Region" value={reportMeta.regionLong} />
                <DetailRow icon={Users} label="Author" value={reportMeta.author} />
              </dl>

              <div className="h-px bg-white/10 my-6" aria-hidden />

              <div className="flex items-center justify-between mb-6">
                <span className="text-[0.625rem] uppercase tracking-[0.15em] text-white/50 font-medium">
                  # Product Code
                </span>
                <span className="font-mono text-[var(--typography-size-compact)] text-white/85 tabular-nums">
                  {reportMeta.productCode}
                </span>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-[var(--radius-button)] border border-white/10 bg-white/[0.02] text-[var(--typography-size-compact)] text-white/85 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-200"
              >
                <span>View Full Report Details</span>
                <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
              </button>
            </div>
          </motion.aside>
        </div>

        {/* Scroll cue */}
        <div className="hidden md:flex justify-center mt-16">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-white/30"
            aria-hidden
          >
            <MousePointer2 className="h-5 w-5 -rotate-12" strokeWidth={1.5} />
          </motion.div>
        </div>
      </div>
    </header>
  );
}
