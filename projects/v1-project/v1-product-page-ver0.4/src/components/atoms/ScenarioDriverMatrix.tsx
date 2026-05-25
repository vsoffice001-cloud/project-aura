'use client';

/**
 * ScenarioDriverMatrix · 3-col grid · Bear / Base / Bull scenario drivers.
 *
 * @what  3-column grid (Bear · Base · Bull) × N rows (drivers). Each cell
 *        contains a qualitative direction chip with arrow indicator
 *        (↑↑ · ↑ · → · ↓ · ↓↓). Colors: Bear = perano-800 tint ·
 *        Base = periwinkle-500 tint · Bull = purple-500 tint.
 *        Refs canonical (merged-report scenario matrix · McKinsey scenario
 *        driver cross-reference).
 *
 * @why   §16 Future Outlook requires stakeholders to understand WHAT drives
 *        each scenario differently. Structured matrix lets analysts compare
 *        Bear/Base/Bull driver assumptions in a single glance. Qualitative
 *        chip format keeps it scannable · avoids false numeric precision.
 *
 * @when  §16 Future Outlook · below KenScenarioFanChart · above gated cards.
 *
 * @how   ```tsx
 *        <ScenarioDriverMatrix
 *          drivers={SCENARIO_DRIVERS}
 *        />
 *        ```
 *
 * @relatedDoc projects/v1-product-page-ver0.4/docs/CHARTS-TABLES-PATTERNS.md §6
 * @relatedDoc projects/v1-product-page-ver0.4/docs/COLOR-USAGE-GUIDE.md §3.2
 */

export type Direction = '↑↑' | '↑' | '→' | '↓' | '↓↓';

export interface ScenarioCell {
  /** Qualitative label · max 6 words */
  label: string;
  /** Direction arrow · magnitude of impact */
  direction: Direction;
}

export interface ScenarioDriver {
  /** Driver category name · e.g. "Macro" */
  category: string;
  /** Optional descriptor · 1 line · ink-subtle */
  descriptor?: string;
  /** Bear scenario cell */
  bear: ScenarioCell;
  /** Base scenario cell */
  base: ScenarioCell;
  /** Bull scenario cell */
  bull: ScenarioCell;
}

export interface ScenarioDriverMatrixProps {
  /** Driver rows */
  drivers: ScenarioDriver[];
  /** Optional className passthrough */
  className?: string;
}

const SCENARIO_HEADERS: { key: 'bear' | 'base' | 'bull'; label: string; cagr: string; bgHeader: string; textHeader: string }[] = [
  { key: 'bear', label: 'Bear',  cagr: '7.1% CAGR',  bgHeader: 'rgba(134,179,229,0.18)', textHeader: '#2a4e78' },
  { key: 'base', label: 'Base',  cagr: '10.3% CAGR', bgHeader: 'rgba(148,136,236,0.18)', textHeader: '#3c2ea6' },
  { key: 'bull', label: 'Bull',  cagr: '13.8% CAGR', bgHeader: 'rgba(112,117,200,0.22)', textHeader: '#2a2c7a' },
];

const DIRECTION_COLOR: Record<Direction, { bg: string; text: string }> = {
  '↑↑': { bg: 'rgba(112,117,200,0.20)', text: '#2a2c7a' },
  '↑':  { bg: 'rgba(148,136,236,0.15)', text: '#3c2ea6' },
  '→':  { bg: 'rgba(0,0,0,0.05)',       text: 'rgba(0,0,0,0.6)' },
  '↓':  { bg: 'rgba(134,179,229,0.18)', text: '#2a4e78' },
  '↓↓': { bg: 'rgba(134,179,229,0.28)', text: '#1a3a5e' },
};

function DirectionChip({ cell }: { cell: ScenarioCell }) {
  const colors = DIRECTION_COLOR[cell.direction];
  return (
    <div
      className="flex flex-col gap-1 rounded-[4px] px-2.5 py-2 h-full"
      style={{ background: colors.bg }}
    >
      <p
        className="font-body"
        style={{
          fontSize: '18px',
          lineHeight: 1,
          color: colors.text,
          fontWeight: 500,
        }}
        aria-label={`Direction: ${cell.direction}`}
      >
        {cell.direction}
      </p>
      <p
        className="font-body text-[var(--semantic-ink-body)]"
        style={{ fontSize: '11.5px', lineHeight: 1.4 }}
      >
        {cell.label}
      </p>
    </div>
  );
}

export function ScenarioDriverMatrix({
  drivers,
  className,
}: ScenarioDriverMatrixProps) {
  return (
    <div className={['w-full overflow-x-auto', className ?? ''].join(' ')}>
      <div className="min-w-[480px]">
        {/* Column headers */}
        <div className="grid grid-cols-[140px_1fr_1fr_1fr] gap-2 mb-2">
          {/* Driver label col header */}
          <div
            className="font-body uppercase tracking-[0.1em] text-[var(--semantic-ink-subtle)] py-2 px-1"
            style={{ fontSize: '10px', fontWeight: 600 }}
          >
            Driver
          </div>

          {SCENARIO_HEADERS.map((sc) => (
            <div
              key={sc.key}
              className="rounded-[4px] px-3 py-2 text-center"
              style={{ background: sc.bgHeader }}
            >
              <p
                className="font-body font-semibold uppercase tracking-[0.1em]"
                style={{ fontSize: '11px', color: sc.textHeader }}
              >
                {sc.label}
              </p>
              <p
                className="font-body font-medium tabular-nums"
                style={{ fontSize: '11px', color: sc.textHeader, opacity: 0.8 }}
              >
                {sc.cagr}
              </p>
            </div>
          ))}
        </div>

        {/* Driver rows */}
        <div className="space-y-1.5">
          {drivers.map((driver) => (
            <div
              key={driver.category}
              className="grid grid-cols-[140px_1fr_1fr_1fr] gap-2 items-stretch"
            >
              {/* Category label */}
              <div className="flex flex-col justify-center py-2 pr-2">
                <p
                  className="font-body font-medium text-[var(--semantic-ink-strong)]"
                  style={{ fontSize: '12.5px', lineHeight: 1.25 }}
                >
                  {driver.category}
                </p>
                {driver.descriptor && (
                  <p
                    className="font-body italic text-[var(--semantic-ink-subtle)] mt-0.5"
                    style={{ fontSize: '10px', lineHeight: 1.3 }}
                  >
                    {driver.descriptor}
                  </p>
                )}
              </div>

              {/* Scenario cells */}
              {SCENARIO_HEADERS.map((sc) => (
                <DirectionChip key={sc.key} cell={driver[sc.key]} />
              ))}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p
          className="font-body italic text-[var(--semantic-ink-subtle)] mt-4"
          style={{ fontSize: '10.5px' }}
        >
          Direction arrows indicate scenario-relative driver force: ↑↑ strong upside · ↑ moderate upside · → neutral · ↓ moderate headwind · ↓↓ strong headwind. All assessments per Ken analyst judgment.
        </p>
      </div>
    </div>
  );
}
