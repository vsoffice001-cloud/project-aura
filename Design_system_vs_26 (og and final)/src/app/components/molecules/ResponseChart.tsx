/**
 * ResponseChart — Molecule (Surveys pillar)
 *
 * Lightweight bar chart for survey response distribution.
 * Pure CSS — no chart library dependency. Uses DS tokens.
 *
 * Two modes:
 * - horizontal (default): horizontal bars with labels left, values right
 * - donut: simple donut/ring chart (for overall completion)
 */
import { Card } from '@/app/components/Card';

interface ResponseBarData {
  label: string;
  value: number;
  color?: string;
}

interface ResponseChartProps {
  title?: string;
  data: ResponseBarData[];
  mode?: 'horizontal' | 'donut';
  total?: number;
  className?: string;
}

const DEFAULT_COLORS = [
  '#806ce0',          // periwinkle (content)
  'var(--green-700, #15803d)',
  'var(--coral-500, #b01f24)',
  '#eab308',          // amber
  '#0ea5e9',          // sky
  'rgba(0,0,0,0.25)', // neutral
];

export function ResponseChart({ title, data, mode = 'horizontal', total, className }: ResponseChartProps) {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  const computedTotal = total ?? data.reduce((sum, d) => sum + d.value, 0);

  if (mode === 'donut') {
    // Simple donut for overall completion
    const completedPct = computedTotal > 0 && data.length > 0
      ? Math.round((data[0].value / computedTotal) * 100)
      : 0;

    return (
      <Card padding="md" className={`flex flex-col items-center ${className ?? ''}`}>
        {title && (
          <p className="text-black/60 mb-4 self-start" style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}>{title}</p>
        )}
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle
              cx="18" cy="18" r="15.9"
              fill="none"
              stroke="rgba(0,0,0,0.06)"
              strokeWidth="3"
            />
            <circle
              cx="18" cy="18" r="15.9"
              fill="none"
              stroke={data[0]?.color ?? '#806ce0'}
              strokeWidth="3"
              strokeDasharray={`${completedPct} ${100 - completedPct}`}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-black tabular-nums" style={{ fontSize: 'var(--text-base)', fontFamily: 'var(--font-serif)', fontWeight: 'var(--font-weight-light)' as any }}>
              {completedPct}%
            </span>
          </div>
        </div>
        {data.length > 1 && (
          <div className="flex flex-wrap gap-3 mt-4 justify-center">
            {data.map((d, i) => (
              <div key={i} className="flex items-center gap-1.5" style={{ fontSize: 'var(--text-xs)' }}>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] }} />
                <span className="text-black/50">{d.label}</span>
                <span className="text-black/30 tabular-nums">{d.value}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    );
  }

  // ─── Horizontal Bar Chart ─────────────────────
  return (
    <Card padding="md" className={className}>
      {title && (
        <p className="text-black/60 mb-4" style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}>{title}</p>
      )}
      <div className="space-y-3">
        {data.map((d, i) => {
          const pct = Math.round((d.value / maxValue) * 100);
          const barColor = d.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
          return (
            <div key={i}>
              <div className="flex items-center justify-between mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                <span className="text-black/60 truncate mr-2">{d.label}</span>
                <span className="text-black/40 tabular-nums flex-shrink-0">{d.value}</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.04)' }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, background: barColor }}
                />
              </div>
            </div>
          );
        })}
      </div>
      {computedTotal > 0 && (
        <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid var(--black-200)', fontSize: 'var(--text-xs)' }}>
          <span className="text-black/35">Total</span>
          <span className="text-black/50 tabular-nums">{computedTotal}</span>
        </div>
      )}
    </Card>
  );
}