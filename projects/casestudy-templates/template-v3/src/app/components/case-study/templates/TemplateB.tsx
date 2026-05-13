import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Navbar } from '@/app/components/Navbar';
import { caseStudyContent as c } from '@/app/data/caseStudyContent';
import { useCountUp } from '../hooks/useCountUp';

const YEARS = ['2020', '2021', '2022', '2023', '2024', '2025', '2026'];

const STEP_DATA = [
  {
    title: 'India Power CapEx',
    kicker: 'Macro Tailwind',
    copy: 'Grid modernization and renewables integration drive utility CapEx to record highs. Transformer procurement — and by extension bushings — rides the wave.',
    annotation: 'CapEx +42% since 2020',
    series: [12, 18, 24, 32, 40, 48, 58],
    client: [4, 6, 8, 11, 14, 17, 20],
  },
  {
    title: 'Transformer → Bushing',
    kicker: 'Demand Compounding',
    copy: 'Each transformer carries multiple bushings; HV transformers carry more. Demand compounds as voltage class rises.',
    annotation: '~6 bushings per HV unit',
    series: [20, 28, 36, 45, 55, 66, 78],
    client: [6, 9, 13, 18, 24, 30, 38],
  },
  {
    title: 'Import Dependency',
    kicker: 'Supply Chain Risk',
    copy: 'Domestic capacity lags HV demand. Imports carry FX, lead-time, and certification risk — a wedge for domestic scale-ups.',
    annotation: '62% HV imports exposed',
    series: [30, 38, 44, 52, 60, 70, 82],
    client: [10, 14, 20, 28, 36, 46, 56],
  },
  {
    title: 'Client Trajectory',
    kicker: 'Inflection',
    copy: "Yash's share curve bends upward as HV capacity comes online and domestic substitution accelerates.",
    annotation: 'HV share: 4% → 11%',
    series: [40, 48, 56, 66, 76, 88, 95],
    client: [12, 18, 28, 42, 58, 72, 88],
  },
  {
    title: 'IPO Envelope',
    kicker: 'The Thesis',
    copy: '₹110 Cr TAM. ₹68 Cr SAM. A credible runway to 15% share — defensible to investors.',
    annotation: '₹110 Cr TAM · 15% target',
    series: [50, 58, 66, 76, 86, 94, 100],
    client: [18, 26, 38, 54, 72, 88, 100],
  },
];

function buildFrame(progress: number) {
  const scaled = progress * (STEP_DATA.length - 1);
  const idx = Math.min(STEP_DATA.length - 2, Math.floor(scaled));
  const t = Math.min(1, scaled - idx);
  const a = STEP_DATA[idx];
  const b = STEP_DATA[idx + 1] ?? a;
  return YEARS.map((year, i) => ({
    year,
    market: a.series[i] + (b.series[i] - a.series[i]) * t,
    client: a.client[i] + (b.client[i] - a.client[i]) * t,
  }));
}

export function TemplateB() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setProgress(v);
    const idx = Math.min(STEP_DATA.length - 1, Math.max(0, Math.round(v * (STEP_DATA.length - 1))));
    setActive(idx);
  });

  const data = buildFrame(progress);

  return (
    <div data-template="b" style={{ background: '#fff', color: '#0a0a0a', position: 'relative' }}>
      <Navbar />

      <section style={{ padding: '160px 32px 80px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ fontFamily: 'DM Sans', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b01f24', marginBottom: '24px' }}>
          Data Story · {c.sector}
        </div>
        <h1 style={{ fontFamily: 'Noto Serif, serif', fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.1, maxWidth: '18ch', margin: 0 }}>
          {c.thesis}
        </h1>
        <div style={{ marginTop: '48px', fontFamily: 'DM Sans', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)' }}>
          Scroll to unfold ↓
        </div>
      </section>

      <div ref={ref} style={{ position: 'relative', minHeight: `${STEP_DATA.length * 100}dvh` }}>
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100dvh',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            alignItems: 'center',
            gap: '48px',
            padding: '0 48px',
          }}
        >
          <PinnedChart data={data} annotation={STEP_DATA[active].annotation} />
          <StepCopy active={active} />
          <StepDots active={active} />
        </div>
      </div>

      <ReleaseKPIs />

      <CTABand />
    </div>
  );
}

function PinnedChart({ data, annotation }: { data: any[]; annotation: string }) {
  return (
    <div style={{ height: '72dvh', position: 'relative', paddingTop: '40px' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(0,0,0,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Index · 2026 = 100
      </div>
      <motion.div
        key={annotation}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ position: 'absolute', top: 0, right: 0, fontFamily: 'DM Sans', fontSize: '12px', color: '#b01f24', letterSpacing: '0.06em', padding: '4px 10px', border: '1px solid #b01f24', borderRadius: '999px' }}
      >
        {annotation}
      </motion.div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 24, right: 8, bottom: 32, left: 0 }}>
          <defs>
            <linearGradient id="marketFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5B6770" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#5B6770" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="clientFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b01f24" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#b01f24" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(0,0,0,0.05)" vertical={false} />
          <XAxis dataKey="year" tick={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fill: 'rgba(0,0,0,0.55)' }} tickLine={false} axisLine={{ stroke: 'rgba(0,0,0,0.1)' }} />
          <YAxis tick={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fill: 'rgba(0,0,0,0.55)' }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ background: '#0a0a0a', border: 'none', borderRadius: '4px', fontFamily: 'DM Sans', fontSize: '12px' }}
            labelStyle={{ color: 'rgba(255,255,255,0.7)' }}
            itemStyle={{ color: '#fff' }}
          />
          <Area type="monotone" dataKey="market" name="Market" stroke="#5B6770" strokeWidth={2} fill="url(#marketFill)" isAnimationActive={false} />
          <Area type="monotone" dataKey="client" name="Client" stroke="#b01f24" strokeWidth={2.5} fill="url(#clientFill)" isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
      <div style={{ position: 'absolute', bottom: '0', left: '0', display: 'flex', gap: '24px', fontFamily: 'DM Sans', fontSize: '12px', letterSpacing: '0.06em' }}>
        <Legend color="#5B6770" label="Market" />
        <Legend color="#b01f24" label="Client" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(0,0,0,0.7)' }}>
      <span style={{ width: '14px', height: '2px', background: color }} /> {label}
    </div>
  );
}

function StepCopy({ active }: { active: number }) {
  return (
    <div style={{ position: 'relative', height: '60dvh' }}>
      {STEP_DATA.map((step, i) => (
        <motion.div
          key={i}
          animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : 12 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            pointerEvents: i === active ? 'auto' : 'none',
          }}
        >
          <div style={{ fontFamily: 'DM Sans', fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#b01f24', marginBottom: '16px' }}>
            {step.kicker} · {String(i + 1).padStart(2, '0')} / {String(STEP_DATA.length).padStart(2, '0')}
          </div>
          <h2 style={{ fontFamily: 'Noto Serif, serif', fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.15, margin: '0 0 20px' }}>{step.title}</h2>
          <p style={{ fontFamily: 'DM Sans', fontSize: '18px', lineHeight: 1.6, color: 'rgba(0,0,0,0.7)', maxWidth: '44ch' }}>{step.copy}</p>
        </motion.div>
      ))}
    </div>
  );
}

function StepDots({ active }: { active: number }) {
  return (
    <div style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {STEP_DATA.map((_, i) => (
        <motion.div
          key={i}
          animate={{ scale: i === active ? 1 : 0.6, opacity: i === active ? 1 : 0.35 }}
          style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === active ? '#b01f24' : '#0a0a0a' }}
        />
      ))}
    </div>
  );
}

function ReleaseKPIs() {
  return (
    <section style={{ padding: '140px 32px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ fontFamily: 'DM Sans', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.6)', marginBottom: '40px' }}>
          Release · Impact KPIs
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          <AnimatedKPI value={110} label="₹ Cr TAM" description="Total addressable market for transformer bushings in India" />
          <AnimatedKPI value={68} label="₹ Cr SAM" description="Serviceable opportunity in high-voltage segment" />
          <AnimatedKPI value={3.2} decimals={1} suffix="×" label="Growth multiple" description="Projected 2026–2029 expansion" />
          <AnimatedKPI value={15} suffix="%" label="Share target" description="Strategic positioning by 2029" />
        </div>
      </div>
    </section>
  );
}

function AnimatedKPI({ value, label, description, suffix = '', decimals = 0 }: { value: number; label: string; description: string; suffix?: string; decimals?: number }) {
  const { ref, value: v } = useCountUp(value, { decimals });
  return (
    <div ref={ref as any} style={{ padding: '28px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '4px', background: '#fff' }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '44px', fontVariantNumeric: 'tabular-nums', color: '#b01f24', marginBottom: '12px', lineHeight: 1 }}>
        {v.toFixed(decimals)}{suffix}
      </div>
      <div style={{ fontFamily: 'DM Sans', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.7)', marginBottom: '8px' }}>{label}</div>
      <div style={{ fontFamily: 'DM Sans', fontSize: '13px', color: 'rgba(0,0,0,0.6)', lineHeight: 1.5 }}>{description}</div>
    </div>
  );
}

function CTABand() {
  return (
    <section style={{ padding: '120px 32px', background: '#0a0a0a', color: '#fff', textAlign: 'center' }}>
      <h3 style={{ fontFamily: 'Noto Serif, serif', fontSize: 'clamp(32px, 4vw, 48px)', margin: '0 auto 16px', maxWidth: '20ch' }}>
        Ready to model your own market?
      </h3>
      <button style={{ marginTop: '24px', padding: '16px 32px', background: '#b01f24', color: '#fff', border: 'none', borderRadius: '4px', fontFamily: 'DM Sans', fontSize: '15px', letterSpacing: '0.04em', cursor: 'pointer' }}>
        Start a conversation
      </button>
    </section>
  );
}
