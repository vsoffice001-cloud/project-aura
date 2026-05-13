/**
 * BenchmarkTrendingTopics — Tail section organism
 * competition-benchmarking-listing-v01
 * bg: warm-300 per bg alternation spec.
 */

import { TrendingUp } from 'lucide-react';

const TOPICS = [
  'EV Market Share', 'D2C Brand Wars', 'Insurtech Disruption', 'Super App Rivalry',
  'Digital Banking NPS', 'Last-Mile Logistics', 'Solar Developers', 'EdTech Outcomes',
  'Luxury Hospitality', 'PropTech Platforms', 'SVOD Churn', 'CRM Pricing Wars',
];

export function BenchmarkTrendingTopics() {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-6">
        <TrendingUp className="h-5 w-5" style={{ color: 'var(--brand-red)' }} />
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-xl)',
            fontWeight: 400,
            color: 'var(--text-primary)',
          }}
        >
          Trending benchmarking topics
        </h2>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {TOPICS.map((topic) => (
          <button
            key={topic}
            className="transition-all group"
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--ink-muted)',
              border: '1px solid var(--hairline)',
              borderRadius: 'var(--radius-element)',
              padding: '0.45rem 1rem',
              background: 'var(--warm-100)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--ink-whisper)';
              el.style.background = 'var(--surface-white)';
              el.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--hairline)';
              el.style.background = 'var(--warm-100)';
              el.style.color = 'var(--ink-muted)';
            }}
            aria-label={`Browse ${topic} reports`}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}
