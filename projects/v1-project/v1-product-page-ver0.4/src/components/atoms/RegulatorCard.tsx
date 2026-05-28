'use client';

/**
 * RegulatorCard · borderless regulator profile card · refs canonical.
 *
 * @what  4 cards in 2x2 grid (tablet) / 4-up (desktop). Each card:
 *        regulator name + scope + key standards list + last update.
 *        NO card border / NO shadow. Left accent line only (refs pattern).
 *        Mirrors merged-report regulator profile blocks.
 *
 * @why   §15 Regulatory Landscape requires visual differentiation of the
 *        4 governing bodies (FSANZ · TGA · DAFF · ACCC). Card format
 *        lets scanner identify scope + standards at a glance without
 *        reading full prose. Refs use borderless left-accent cards for
 *        entity profiles (not heavy-chrome cards).
 *
 * @when  §15 Regulatory Landscape · 4 up above PipelineTimeline.
 *
 * @how   ```tsx
 *        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
 *          {REGULATORS.map(r => <RegulatorCard key={r.name} {...r} />)}
 *        </div>
 *        ```
 *
 * @relatedDoc projects/v1-product-page-ver0.4/docs/REF-PATTERNS-ADOPTION.md §5
 */

export interface RegulatorCardProps {
  /** Regulator abbreviation · e.g. "FSANZ" */
  name: string;
  /** Full name */
  fullName: string;
  /** One-line scope descriptor · max 12 words */
  scope: string;
  /** 2-4 key standards or instruments governed by this regulator */
  standards: string[];
  /** Last update · e.g. "2024 Q1" */
  lastUpdate: string;
  /** Accent color · should vary per card · use periwinkle/perano/purple palette */
  accentColor?: string;
  /** Optional className passthrough */
  className?: string;
}

export function RegulatorCard({
  name,
  fullName,
  scope,
  standards,
  lastUpdate,
  accentColor = '#c3c6f9',
  className,
}: RegulatorCardProps) {
  return (
    <article
      className={[
        'border-l-[3px] pl-5 py-1',
        className ?? '',
      ].join(' ')}
      style={{ borderColor: accentColor }}
      aria-label={`Regulator: ${name} · ${scope}`}
    >
      {/* Name + full name */}
      <div className="mb-3">
        <p
          className="font-body font-semibold text-[var(--semantic-ink-strong)]"
          style={{ fontSize: '15px', lineHeight: 1.2, letterSpacing: '-0.01em' }}
        >
          {name}
        </p>
        <p
          className="font-body italic text-[var(--semantic-ink-muted)] mt-0.5"
          style={{ fontSize: '11px', lineHeight: 1.3 }}
        >
          {fullName}
        </p>
      </div>

      {/* Scope */}
      <p
        className="font-body text-[var(--semantic-ink-body)] mb-3"
        style={{ fontSize: '12.5px', lineHeight: 1.5 }}
      >
        {scope}
      </p>

      {/* Key standards */}
      <div className="mb-3">
        <p
          className="font-body uppercase tracking-[0.1em] text-[var(--semantic-ink-muted)] mb-1.5"
          style={{ fontSize: '9.5px', fontWeight: 600 }}
        >
          Key standards
        </p>
        <ul className="space-y-1">
          {standards.map((s, i) => (
            <li
              key={i}
              className="flex items-start gap-2 font-body text-[var(--semantic-ink-body)]"
              style={{ fontSize: '11.5px', lineHeight: 1.45 }}
            >
              <span
                aria-hidden="true"
                className="inline-block flex-none rounded-full mt-[6px]"
                style={{ width: '4px', height: '4px', background: accentColor }}
              />
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Last update */}
      <p
        className="font-body text-[var(--semantic-ink-muted)]"
        style={{ fontSize: '10.5px' }}
      >
        Last update:{' '}
        <span className="font-medium text-[var(--semantic-ink-muted)]">{lastUpdate}</span>
      </p>
    </article>
  );
}
