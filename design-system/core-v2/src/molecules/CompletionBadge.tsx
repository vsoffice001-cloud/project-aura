/**
 * CompletionBadge — Molecule (Surveys pillar)
 *
 * Visual indicator for survey completion/response status.
 * Four states: draft, active, completed, closed.
 * Uses DS color tokens and radius vars.
 */

interface CompletionBadgeProps {
  status: 'draft' | 'active' | 'completed' | 'closed';
  responseCount?: number;
  targetCount?: number;
  className?: string;
}

const STATUS_CONFIG = {
  draft: {
    label: 'Draft',
    bg: 'rgba(0,0,0,0.04)',
    text: 'rgba(0,0,0,0.45)',
    dot: 'rgba(0,0,0,0.25)',
  },
  active: {
    label: 'Active',
    bg: 'rgba(22, 163, 74, 0.08)',
    text: 'var(--green-700, #15803d)',
    dot: '#22c55e',
  },
  completed: {
    label: 'Completed',
    bg: 'rgba(128, 108, 224, 0.08)',
    text: '#806ce0',
    dot: '#806ce0',
  },
  closed: {
    label: 'Closed',
    bg: 'rgba(0,0,0,0.04)',
    text: 'rgba(0,0,0,0.35)',
    dot: 'rgba(0,0,0,0.2)',
  },
};

export function CompletionBadge({ status, responseCount, targetCount, className }: CompletionBadgeProps) {
  const config = STATUS_CONFIG[status];
  const hasProgress = typeof responseCount === 'number' && typeof targetCount === 'number' && targetCount > 0;
  const progressPct = hasProgress ? Math.min(100, Math.round((responseCount! / targetCount!) * 100)) : null;

  return (
    <div
      className={`inline-flex items-center gap-1.5 ${className ?? ''}`}
      style={{
        padding: '3px 8px',
        borderRadius: 'var(--radius-element, 5px)',
        background: config.bg,
        fontSize: 'var(--text-xs)',
        fontWeight: 500,
        color: config.text,
      }}
    >
      {/* Status dot — pulses for active */}
      <span
        className={status === 'active' ? 'animate-pulse' : ''}
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: config.dot,
          flexShrink: 0,
        }}
      />
      <span>{config.label}</span>
      {hasProgress && (
        <>
          <span style={{ color: 'rgba(0,0,0,0.2)', margin: '0 1px' }}>·</span>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>
            {responseCount}/{targetCount}
          </span>
          <span style={{ color: 'rgba(0,0,0,0.25)' }}>({progressPct}%)</span>
        </>
      )}
    </div>
  );
}