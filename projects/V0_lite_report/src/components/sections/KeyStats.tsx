'use client';

import { useRef, useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Globe, type LucideIcon } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const regionPresets: Record<string, { count: string; label: string }> = {
  global:               { count: '50+',  label: 'Countries Covered' },
  'north-america':      { count: '3',    label: 'Countries — North America' },
  europe:               { count: '15+',  label: 'Countries — Europe' },
  'asia-pacific':       { count: '12+',  label: 'Countries — Asia-Pacific' },
  'latin-america':      { count: '8+',   label: 'Countries — Latin America' },
  'middle-east-africa': { count: '10+',  label: 'Countries — MEA' },
};

interface KeyStatsProps {
  region?: string;
  countriesCount?: string;
  coverageLabel?: string;
}

function useAnimatedCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    let start: number;
    let raf: number;
    const animate = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * target));
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, duration]);

  return { count, ref };
}

interface StatItemProps {
  icon: LucideIcon;
  rawValue: number;
  formattedPrefix: string;
  formattedSuffix: string;
  label: string;
  delay: number;
}

function StatItem({ icon: Icon, rawValue, formattedPrefix, formattedSuffix, label, delay }: StatItemProps) {
  const { count, ref } = useAnimatedCounter(rawValue);

  const displayValue = (() => {
    if (formattedSuffix === 'B') return `${formattedPrefix}${(count / 10).toFixed(1)}B`;
    if (formattedSuffix === '%') return `${count / 10}${count % 10 === 0 ? '.0' : ''}%`;
    return `${count}${formattedSuffix}`;
  })();

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-start gap-2"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="size-12 rounded-[var(--radius-card)] flex items-center justify-center bg-[var(--color-accent-purple)]/10">
        <Icon className="h-5 w-5 text-[var(--color-accent-purple)]" strokeWidth={1.8} />
      </div>
      <div className="font-[var(--typography-family-body)] font-semibold text-[var(--typography-size-xl)] leading-[1.2] text-[var(--surface-text)] tabular-nums tracking-tight">
        {displayValue}
      </div>
      <p className="font-[var(--typography-family-body)] text-[var(--typography-size-sm)] leading-[1.5] text-[var(--surface-text-muted)]">
        {label}
      </p>
    </motion.div>
  );
}

/**
 * KeyStats — 3-stat horizontal strip (Market Size + CAGR + Countries Covered).
 * Counter animations trigger on scroll-in via Framer `useInView`.
 * `region` prop varies the third stat.
 *
 * @port V0_lite_report-legacy/src/app/components/KeyStats.tsx
 */
export function KeyStats({ region = 'global', countriesCount, coverageLabel }: KeyStatsProps) {
  const preset = regionPresets[region] ?? regionPresets.global;
  const finalCount = countriesCount ?? preset.count;
  const finalLabel = coverageLabel ?? preset.label;

  const numericCount = parseInt(finalCount.replace(/[^0-9]/g, ''), 10) || 50;
  const hasSuffix = finalCount.includes('+');

  return (
    <section
      className="relative py-10 md:py-14"
      style={{
        background: 'linear-gradient(180deg, rgba(250,251,254,0.6) 0%, rgba(235,237,251,0.45) 100%)',
      }}
    >
      <div className="container max-w-[var(--container-page)] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
          <StatItem icon={BarChart3}  rawValue={450}          formattedPrefix="$" formattedSuffix="B"             label="Market Size 2024" delay={0.1} />
          <StatItem icon={TrendingUp} rawValue={320}          formattedPrefix=""  formattedSuffix="%"             label="CAGR 2024–2030"   delay={0.2} />
          <StatItem icon={Globe}      rawValue={numericCount} formattedPrefix=""  formattedSuffix={hasSuffix ? '+' : ''} label={finalLabel}      delay={0.3} />
        </div>
      </div>
    </section>
  );
}
