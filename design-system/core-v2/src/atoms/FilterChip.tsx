/**
 * FilterChip — Atom (DS v4.3)
 *
 * WHAT: Dismissible pill showing an active filter value with optional category prefix.
 * WHY:  Extracted from inline active-filter pills for reuse across listing pages.
 * WHEN: In the active-filter bar above the card grid.
 * HOW:  Monochromatic black/opacity tint bg with X button to remove.
 *
 * INTERACTION STATES:
 *   Default     → bg rgba(0,0,0,0.06), color rgba(0,0,0,0.7)
 *   Hover (X)   → color rgba(0,0,0,0.5)
 *   Pressed (X) → scale(0.9) (active pseudo-class)
 *   Read-only   → onRemove omitted, no X button rendered
 *
 * COLOR SYSTEM: All colors via inline style rgba(). No Tailwind color classes.
 * FONT TOKENS: Label → var(--text-xs) 12.8px | Category prefix → var(--text-card-micro) 10px
 */
import { X } from 'lucide-react';

interface FilterChipProps {
  label: string;
  /** Optional uppercase category prefix (e.g. "SUB-INDUSTRY", "REGION", "YEAR") */
  category?: string;
  onRemove?: () => void;
}

export function FilterChip({ label, category, onRemove }: FilterChipProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1"
      style={{
        fontSize: 'var(--text-xs)',
        borderRadius: 'var(--radius-element)',
        backgroundColor: 'rgba(0,0,0,0.06)',
        color: 'rgba(0,0,0,0.7)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgba(0,0,0,0.08)',
      }}
    >
      {category && (
        <span
          className="uppercase tracking-[0.08em]"
          style={{
            fontSize: 'var(--text-card-micro)',
            color: 'rgba(0,0,0,0.35)',
          }}
        >
          {category}
        </span>
      )}
      <span style={{ color: 'rgba(0,0,0,0.7)' }}>{label}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="transition-colors cursor-pointer active:scale-[0.9] ml-0.5"
          style={{ color: 'rgba(0,0,0,0.3)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(0,0,0,0.5)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(0,0,0,0.3)'; }}
          aria-label={`Remove ${label} filter`}
        >
          <X size={11} />
        </button>
      )}
    </span>
  );
}
