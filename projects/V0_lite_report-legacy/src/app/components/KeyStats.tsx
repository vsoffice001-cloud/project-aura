/**
 * KeyStats — Horizontal stat strip with 3 key metrics
 *
 * Displays Market Size, CAGR, and Countries Covered in a
 * clean row with periwinkle-tinted icon boxes. The third
 * stat is dynamic: it accepts a region prop to show region-
 * specific country coverage (e.g. "North America", "Europe").
 *
 * Design tokens:
 *   - Icon boxes: bg-content-icon/10 (purple-600 at 10%)
 *   - Icon stroke: iconColors.content (#806ce0)
 *   - Background: periwinkle-50 tint (via inline RGBA)
 *   - Border radius: 10px (large) for container, 10px for icon boxes
 *   - Typography: 1.953rem (xl) for stat values, 1rem (sm) for labels
 *
 * @example
 * <KeyStats />
 * <KeyStats region="North America" countriesCount="3" />
 * <KeyStats region="Asia-Pacific" countriesCount="25+" />
 */
import { BarChart3, TrendingUp, Globe } from 'lucide-react';
import { iconColors } from '@/design-system/iconColors';
import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

/** Region presets with country counts */
const regionPresets: Record<string, { count: string; label: string }> = {
  global: { count: '50+', label: 'Countries Covered' },
  'north-america': { count: '3', label: 'Countries — North America' },
  europe: { count: '15+', label: 'Countries — Europe' },
  'asia-pacific': { count: '12+', label: 'Countries — Asia-Pacific' },
  'latin-america': { count: '8+', label: 'Countries — Latin America' },
  'middle-east-africa': { count: '10+', label: 'Countries — MEA' },
};

interface KeyStatsProps {
  /** Region key for dynamic country coverage. Defaults to "global". */
  region?: string;
  /** Override the country count (e.g. "25+"). Uses preset if omitted. */
  countriesCount?: string;
  /** Override the coverage label (e.g. "Regions — APAC"). Uses preset if omitted. */
  coverageLabel?: string;
}

/* Animated counter hook */
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

function StatItem({
  icon: Icon,
  rawValue,
  formattedPrefix,
  formattedSuffix,
  label,
  delay,
}: {
  icon: typeof BarChart3;
  rawValue: number;
  formattedPrefix: string;
  formattedSuffix: string;
  label: string;
  delay: number;
}) {
  const { count, ref } = useAnimatedCounter(rawValue);

  /* Format the animated count to match the display pattern */
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
      {/* Icon box */}
      <div
        className="size-12 rounded-[10px] flex items-center justify-center bg-content-icon/10"
      >
        <Icon className="h-5 w-5" strokeWidth={1.8} color={iconColors.content} />
      </div>

      {/* Value */}
      <div className="font-sans font-semibold text-[1.953rem] leading-[1.2] text-black font-tabular-nums tracking-tight">
        {displayValue}
      </div>

      {/* Label */}
      <p className="font-sans text-[1rem] leading-[1.5] text-utility-icon">
        {label}
      </p>
    </motion.div>
  );
}

export function KeyStats({ region = 'global', countriesCount, coverageLabel }: KeyStatsProps) {
  const preset = regionPresets[region] ?? regionPresets.global;
  const finalCount = countriesCount ?? preset.count;
  const finalLabel = coverageLabel ?? preset.label;

  /* Parse the count string for animation */
  const numericCount = parseInt(finalCount.replace(/[^0-9]/g, ''), 10) || 50;
  const hasSuffix = finalCount.includes('+');

  return (
    <section
      className="relative py-10 md:py-14"
      style={{
        background: 'linear-gradient(180deg, rgba(250, 251, 254, 0.6) 0%, rgba(235, 237, 251, 0.45) 100%)',
      }}
    >
      <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
          {/* Market Size */}
          <StatItem
            icon={BarChart3}
            rawValue={450}
            formattedPrefix="$"
            formattedSuffix="B"
            label="Market Size 2024"
            delay={0.1}
          />

          {/* CAGR */}
          <StatItem
            icon={TrendingUp}
            rawValue={320}
            formattedPrefix=""
            formattedSuffix="%"
            label="CAGR 2024–2030"
            delay={0.2}
          />

          {/* Countries Covered — dynamic */}
          <StatItem
            icon={Globe}
            rawValue={numericCount}
            formattedPrefix=""
            formattedSuffix={hasSuffix ? '+' : ''}
            label={finalLabel}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
