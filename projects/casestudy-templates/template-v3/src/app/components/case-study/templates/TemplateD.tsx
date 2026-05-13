import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '@/app/components/Navbar';
import { caseStudyContent as c } from '@/app/data/caseStudyContent';
import { useCountUp } from '../hooks/useCountUp';

const SPARK = [
  [2, 4, 3, 6, 8, 7, 10, 12, 15, 18],
  [1, 2, 4, 5, 7, 9, 10, 13, 16, 20],
  [10, 9, 8, 7, 8, 9, 11, 14, 16, 19],
  [3, 5, 6, 8, 10, 12, 13, 15, 17, 20],
  [8, 9, 10, 12, 14, 15, 16, 18, 20, 22],
  [5, 6, 7, 8, 9, 10, 12, 14, 15, 17],
];

const KPIS = [
  { label: 'TAM', value: 110, prefix: '₹', suffix: ' Cr', delta: '+12%', spark: SPARK[0] },
  { label: 'SAM', value: 68, prefix: '₹', suffix: ' Cr', delta: '+8%', spark: SPARK[1] },
  { label: 'Growth Multiple', value: 3.2, decimals: 1, suffix: '×', delta: '+0.4×', spark: SPARK[2] },
  { label: 'Client Share Target', value: 15, suffix: '%', delta: '+5pp', spark: SPARK[3] },
  { label: 'IPO Readiness', value: 82, suffix: ' / 100', delta: '+18', spark: SPARK[4] },
  { label: 'Sector PE (avg)', value: 28.4, decimals: 1, suffix: '×', delta: '+2.1×', spark: SPARK[5] },
];

type Tab = 'overview' | 'market' | 'process';

export function TemplateD() {
  const [dark, setDark] = useState(true);
  const [tab, setTab] = useState<Tab>('overview');

  const bg = dark ? '#0E1013' : '#fafafa';
  const fg = dark ? '#f5f5f5' : '#0a0a0a';
  const surface = dark ? '#1A1D22' : '#fff';
  const border = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)';
  const muted = dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.6)';

  return (
    <div data-template="d" style={{ background: bg, color: fg, minHeight: '100dvh', fontFamily: 'DM Sans, sans-serif', transition: 'background 260ms ease, color 260ms ease' }}>
      <Navbar />

      <section style={{ padding: '120px 32px 32px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, marginBottom: '12px' }}>
              Deal · {c.year}
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', margin: 0, fontWeight: 500, letterSpacing: '-0.01em' }}>{c.title}</h1>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: muted, padding: '6px 12px', border: `1px solid ${border}`, borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <kbd style={{ fontSize: '10px', padding: '2px 6px', background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', borderRadius: '2px' }}>⌘K</kbd>
              <span>Jump</span>
            </div>
            <span style={{ padding: '6px 14px', background: '#C9A96A', color: '#0E1013', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '2px', fontWeight: 500 }}>
              {c.status}
            </span>
            <button
              onClick={() => setDark(!dark)}
              style={{ padding: '8px 14px', background: 'transparent', border: `1px solid ${border}`, color: fg, borderRadius: '999px', fontSize: '12px', cursor: 'pointer', letterSpacing: '0.08em' }}
            >
              {dark ? '☾ DARK' : '☀ LIGHT'}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', borderBottom: `1px solid ${border}` }}>
          {(['overview', 'market', 'process'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '12px 20px',
                background: 'transparent',
                border: 'none',
                color: tab === t ? fg : muted,
                borderBottom: `2px solid ${tab === t ? '#b01f24' : 'transparent'}`,
                cursor: 'pointer',
                fontSize: '13px',
                letterSpacing: '0.06em',
                textTransform: 'capitalize',
                fontWeight: 500,
                transition: 'color 180ms, border-color 180ms',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {tab === 'overview' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                {KPIS.map((kpi, i) => (
                  <KPICard key={i} kpi={kpi} dark={dark} surface={surface} border={border} muted={muted} />
                ))}
              </div>
            )}
            {tab === 'market' && (
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: '12px', padding: '32px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: muted, marginBottom: '16px' }}>Thesis</div>
                <p style={{ fontSize: '20px', lineHeight: 1.6, margin: '0 0 32px', maxWidth: '72ch' }}>{c.thesis}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                  {c.impact.map((m) => (
                    <div key={m.label} style={{ padding: '20px', border: `1px solid ${border}`, borderRadius: '8px' }}>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '28px', color: '#b01f24', marginBottom: '8px' }}>{m.value}</div>
                      <div style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: muted, marginBottom: '6px' }}>{m.label}</div>
                      <div style={{ fontSize: '13px', color: muted, lineHeight: 1.5 }}>{m.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab === 'process' && (
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: muted, marginBottom: '20px' }}>Process Timeline</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', gap: '12px', overflowX: 'auto' }}>
                  {c.phases.map((p, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      style={{ flex: 1, minWidth: '160px', position: 'relative', paddingTop: '24px' }}
                    >
                      <div style={{ position: 'absolute', top: '6px', left: 0, right: 0, height: '2px', background: border }} />
                      <div style={{ position: 'absolute', top: '0', left: '0', width: '14px', height: '14px', borderRadius: '50%', background: '#b01f24', border: `2px solid ${bg}` }} />
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', color: muted, marginBottom: '6px' }}>{p.label}</div>
                      <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>{p.title}</div>
                      <div style={{ fontSize: '12px', color: muted, lineHeight: 1.5 }}>{p.description}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <section style={{ padding: '32px 32px 120px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: `1px solid ${border}`, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: muted }}>
            Findings · Methodology
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: muted }}>
                <th style={{ padding: '12px 24px' }}>Step</th>
                <th style={{ padding: '12px 24px' }}>Title</th>
                <th style={{ padding: '12px 24px' }}>Outcome</th>
              </tr>
            </thead>
            <tbody>
              {c.methodology.map((m) => (
                <tr key={m.number} style={{ borderTop: `1px solid ${border}` }}>
                  <td style={{ padding: '16px 24px', fontFamily: 'JetBrains Mono, monospace', color: '#b01f24' }}>{m.number}</td>
                  <td style={{ padding: '16px 24px', fontWeight: 500 }}>{m.title}</td>
                  <td style={{ padding: '16px 24px', color: muted, fontSize: '14px' }}>{m.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function KPICard({ kpi, dark, surface, border, muted }: any) {
  const { ref, value } = useCountUp(kpi.value, { decimals: kpi.decimals ?? 0 });
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  return (
    <div ref={ref as any} style={{ padding: '20px', background: surface, border: `1px solid ${border}`, borderRadius: '12px', position: 'relative', overflow: 'hidden', transition: 'transform 220ms' }}>
      <div style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: muted, marginBottom: '10px' }}>{kpi.label}</div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums', fontSize: '28px', letterSpacing: '-0.02em', marginBottom: '6px' }}>
        {kpi.prefix ?? ''}{value.toFixed(kpi.decimals ?? 0)}{kpi.suffix ?? ''}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#b01f24', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px' }}>▲ {kpi.delta}</span>
        <InteractiveSparkline data={kpi.spark} dark={dark} onHover={setHoverIdx} hoverIdx={hoverIdx} />
      </div>
      {hoverIdx !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ position: 'absolute', top: '14px', right: '14px', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#b01f24' }}
        >
          t{hoverIdx}: {kpi.spark[hoverIdx]}
        </motion.div>
      )}
    </div>
  );
}

function InteractiveSparkline({ data, onHover, hoverIdx }: { data: number[]; dark: boolean; onHover: (i: number | null) => void; hoverIdx: number | null }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 84;
  const h = 26;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - ((v - min) / range) * h,
  ]);
  return (
    <svg
      width={w}
      height={h}
      onMouseLeave={() => onHover(null)}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const i = Math.round((x / rect.width) * (data.length - 1));
        onHover(Math.max(0, Math.min(data.length - 1, i)));
      }}
      style={{ cursor: 'crosshair' }}
    >
      <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke="#b01f24" strokeWidth="1.5" />
      {hoverIdx !== null && (
        <circle cx={pts[hoverIdx][0]} cy={pts[hoverIdx][1]} r="3" fill="#b01f24" />
      )}
    </svg>
  );
}
