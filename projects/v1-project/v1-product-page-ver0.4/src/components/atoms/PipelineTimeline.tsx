'use client';

/**
 * PipelineTimeline · horizontal Gantt-style regulatory timeline · refs canonical.
 *
 * @what  Each row = one regulation/standard. Each col = one year (2022–2027).
 *        Colored phase bars span across year columns. Phase color encodes status:
 *        Active · Update Pending · Proposed · Enforced. Year headers at top.
 *        Refs canonical pattern (merged-report project timeline · McKinsey
 *        regulatory roadmap).
 *
 * @why   §15 Regulatory Landscape requires timeline-style visualization to show
 *        when each regulation became active, when updates are pending, and when
 *        enforcement kicks in. Gantt format is the standard regulatory view across
 *        McKinsey/Gartner/PwC research deliverables.
 *
 * @when  §15 Regulatory Landscape. Single timeline covering 2022–2027.
 *
 * @how   ```tsx
 *        <PipelineTimeline
 *          years={['2022', '2023', '2024', '2025', '2026F', '2027F']}
 *          items={TIMELINE_ITEMS}
 *        />
 *        ```
 *
 * Phase color encoding (per Ken DS data-viz palette · refs §3.2):
 *   Active       → periwinkle-500  #c3c6f9
 *   Update Pending → perano-800   #86b3e5
 *   Proposed     → purple-300     #c8c5f8 (lighter purple)
 *   Enforced     → purple-600     #6b5ce7 (darker purple)
 *
 * @relatedDoc projects/v1-product-page-ver0.4/docs/CHARTS-TABLES-PATTERNS.md §5
 * @relatedDoc projects/v1-product-page-ver0.4/docs/COLOR-USAGE-GUIDE.md §3.2
 */

export type PhaseStatus = 'Active' | 'Update Pending' | 'Proposed' | 'Enforced';

export interface TimelinePhase {
  /** Status label */
  status: PhaseStatus;
  /**
   * Start column index (0-based, relative to years array).
   * The bar spans from startCol to endCol inclusive.
   */
  startCol: number;
  /** End column index (inclusive) */
  endCol: number;
  /** Optional short tag displayed inside bar (e.g. "Consultation") */
  tag?: string;
}

export interface TimelineItem {
  /** Regulation / standard name */
  label: string;
  /** Optional short descriptor below label */
  descriptor?: string;
  /** Governing body abbreviation · shown inline */
  body: string;
  /** One or more phase spans · can have multiple statuses (e.g. Active then Update Pending) */
  phases: TimelinePhase[];
}

export interface PipelineTimelineProps {
  /** Year labels for column headers */
  years: string[];
  /** Regulatory items · one per row */
  items: TimelineItem[];
  /** Optional className passthrough */
  className?: string;
}

const PHASE_STYLE: Record<PhaseStatus, { bg: string; text: string; border: string }> = {
  'Active':          { bg: 'rgba(195,198,249,0.55)', text: '#3a3d8a', border: '#c3c6f9' },
  'Update Pending':  { bg: 'rgba(134,179,229,0.55)', text: '#2a4e78', border: '#86b3e5' },
  'Proposed':        { bg: 'rgba(200,197,248,0.40)', text: '#5a579a', border: '#c8c5f8' },
  'Enforced':        { bg: 'rgba(107,92,231,0.22)', text: '#3d2d9a', border: '#9488ec' },
};

const PHASE_DOT: Record<PhaseStatus, string> = {
  'Active':         '#9488ec',
  'Update Pending': '#86b3e5',
  'Proposed':       '#c3c6f9',
  'Enforced':       '#7075c8',
};

export function PipelineTimeline({
  years,
  items,
  className,
}: PipelineTimelineProps) {
  const colCount = years.length;

  return (
    <div className={['w-full overflow-x-auto', className ?? ''].join(' ')}>
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-4">
        {(Object.entries(PHASE_DOT) as [PhaseStatus, string][]).map(([status, color]) => (
          <span key={status} className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block w-2.5 h-2.5 rounded-[2px]"
              style={{ background: PHASE_STYLE[status].bg, border: `1.5px solid ${PHASE_STYLE[status].border}` }}
            />
            <span
              className="font-body text-[var(--semantic-ink-muted)]"
              style={{ fontSize: '11px' }}
            >
              {status}
            </span>
          </span>
        ))}
      </div>

      {/* Grid */}
      <div className="min-w-[560px]">
        {/* Year headers */}
        <div
          className="grid mb-2"
          style={{
            gridTemplateColumns: `180px repeat(${colCount}, minmax(0, 1fr))`,
          }}
        >
          <div /> {/* Row label spacer */}
          {years.map((yr) => (
            <div
              key={yr}
              className="text-center font-body uppercase tracking-[0.1em] text-[var(--semantic-ink-subtle)]"
              style={{ fontSize: '10px', fontWeight: 600 }}
            >
              {yr}
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="space-y-1.5">
          {items.map((item) => (
            <div
              key={item.label}
              className="grid items-center"
              style={{
                gridTemplateColumns: `180px repeat(${colCount}, minmax(0, 1fr))`,
                minHeight: '40px',
              }}
            >
              {/* Row label */}
              <div className="pr-3 min-w-0">
                <p
                  className="font-body font-medium text-[var(--semantic-ink-strong)] truncate"
                  style={{ fontSize: '12px', lineHeight: 1.25 }}
                >
                  {item.label}
                </p>
                {item.descriptor && (
                  <p
                    className="font-body text-[var(--semantic-ink-subtle)] italic truncate"
                    style={{ fontSize: '10px', lineHeight: 1.25 }}
                  >
                    {item.descriptor}
                  </p>
                )}
                <p
                  className="font-body uppercase tracking-[0.1em] text-[var(--semantic-ink-subtle)] mt-0.5"
                  style={{ fontSize: '9.5px', fontWeight: 600 }}
                >
                  {item.body}
                </p>
              </div>

              {/* Timeline cells · subgrid spanning all year cols */}
              <div
                className="relative col-span-full"
                style={{
                  gridColumn: `2 / span ${colCount}`,
                  display: 'grid',
                  gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
                  gap: '2px',
                  height: '32px',
                }}
              >
                {/* Background track */}
                <div
                  className="absolute inset-y-0 rounded-[3px]"
                  style={{
                    left: 0,
                    right: 0,
                    background: 'rgba(0,0,0,0.03)',
                  }}
                  aria-hidden="true"
                />

                {/* Phase bars */}
                {item.phases.map((phase, pi) => {
                  const style = PHASE_STYLE[phase.status];
                  const spanCount = phase.endCol - phase.startCol + 1;
                  return (
                    <div
                      key={pi}
                      className="flex items-center justify-center rounded-[3px] px-1.5 z-10 relative overflow-hidden"
                      style={{
                        gridColumn: `${phase.startCol + 1} / span ${spanCount}`,
                        background: style.bg,
                        border: `1px solid ${style.border}`,
                        height: '28px',
                        alignSelf: 'center',
                      }}
                      title={phase.status}
                      aria-label={`${item.label} · ${phase.status} · ${years[phase.startCol]}${spanCount > 1 ? `–${years[phase.endCol]}` : ''}`}
                    >
                      <span
                        className="font-body truncate"
                        style={{
                          fontSize: '10px',
                          fontWeight: 600,
                          color: style.text,
                          letterSpacing: '0.04em',
                        }}
                      >
                        {phase.tag ?? phase.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* F = forecast note */}
      <p
        className="font-body italic text-[var(--semantic-ink-subtle)] mt-3"
        style={{ fontSize: '10.5px' }}
      >
        F = forecast / projected timeline · subject to legislative process. 2026F–2027F phases based on Ken regulatory tracking + public consultation timetables.
      </p>
    </div>
  );
}
