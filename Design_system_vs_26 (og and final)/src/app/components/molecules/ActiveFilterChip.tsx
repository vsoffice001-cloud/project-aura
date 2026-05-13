/**
 * ActiveFilterChipBar — Molecule (DS v4.3)
 *
 * WHAT: Bar of active filter chips with count label and "Clear all" action.
 * WHY:  Extracted the active-filter-pills bar from listing pages into a composable
 *        molecule. Renders only when filters are active.
 * WHEN: Below the listing header toolbar, above the card grid.
 * HOW:  Maps a list of active filters to FilterChip atoms + a clear-all button.
 *
 * INTERACTION STATES:
 *   Empty         → Returns null (no DOM rendered)
 *   With filters  → Renders "X FILTERS" count + chips + clear button
 *   Clear all btn → color rgba(0,0,0,0.4) → hover rgba(0,0,0,0.8) → active scale(0.95)
 *
 * COLOR SYSTEM: All colors via inline style rgba(). No Tailwind color classes.
 * FONT TOKENS:
 *   "X FILTERS" label → var(--text-card-micro) 10px + uppercase + tracking-[0.1em]
 *   "Clear all" link   → var(--text-xs) 12.8px
 */
import { X } from 'lucide-react';
import { FilterChip } from '@/app/components/FilterChip';

interface ActiveFilter {
  label: string;
  category?: string;
  onRemove: () => void;
}

interface ActiveFilterChipBarProps {
  filters: ActiveFilter[];
  onClearAll?: () => void;
}

export function ActiveFilterChipBar({ filters, onClearAll }: ActiveFilterChipBarProps) {
  if (filters.length === 0) return null;

  return (
    <div
      className="flex items-center gap-2 mt-3 pt-3 flex-wrap"
      style={{
        borderTopWidth: '1px',
        borderTopStyle: 'solid',
        borderTopColor: 'rgba(0,0,0,0.06)',
      }}
    >
      <span
        className="uppercase tracking-[0.1em] tabular-nums mr-1"
        style={{
          fontSize: 'var(--text-card-micro)',
          color: 'rgba(0,0,0,0.35)',
        }}
      >
        {filters.length} {filters.length === 1 ? 'FILTER' : 'FILTERS'}
      </span>
      {filters.map((f) => (
        <FilterChip key={`${f.category || ''}-${f.label}`} label={f.label} category={f.category} onRemove={f.onRemove} />
      ))}
      {onClearAll && (
        <button
          onClick={onClearAll}
          className="flex items-center gap-1 transition-colors ml-auto cursor-pointer active:scale-[0.95]"
          style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(0,0,0,0.8)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(0,0,0,0.4)'; }}
        >
          <X className="h-3 w-3" />
          Clear all
        </button>
      )}
    </div>
  );
}
