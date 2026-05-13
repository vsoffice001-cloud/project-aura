/**
 * ActiveFilterStickyBar — Molecule
 * competition-benchmarking-listing-v01
 *
 * Condensed filter chip row, sticky at top of main column.
 * Desktop only (hidden below lg). Appears when sidebar header scrolls past viewport top.
 * Pure CSS transform transition — no JS animation lib (per spec step 9).
 */

interface Chip {
  label: string;
  onRemove: () => void;
}

interface ActiveFilterStickyBarProps {
  chips: Chip[];
  visible: boolean;
  onClearAll: () => void;
}

export function ActiveFilterStickyBar({ chips, visible, onClearAll }: ActiveFilterStickyBarProps) {
  if (chips.length === 0) return null;

  return (
    <div
      className="hidden lg:flex sticky z-10 flex-wrap items-center gap-1.5 py-2 px-3 mb-4"
      style={{
        top: '72px',
        background: 'var(--surface-white-glass)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--hairline-faint)',
        borderRadius: 'var(--radius-element)',
        transform: visible ? 'translateY(0)' : 'translateY(-8px)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'transform 200ms ease, opacity 200ms ease',
      }}
    >
      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-subtle)', marginRight: 'var(--space-1)' }}>
        Active:
      </span>
      {chips.map((chip) => (
        <button
          key={chip.label}
          onClick={chip.onRemove}
          className="inline-flex items-center gap-1 transition-all group"
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--ink-muted)',
            border: '1px solid var(--hairline)',
            borderRadius: 'var(--radius-inner)',
            padding: '0.15rem 0.5rem',
            background: 'var(--warm-200)',
          }}
          aria-label={`Remove filter: ${chip.label} (sticky bar)`}
        >
          {chip.label}
          <span style={{ color: 'var(--ink-faint)' }} className="transition-colors group-hover:opacity-100" aria-hidden="true">×</span>
        </button>
      ))}
      {chips.length > 1 && (
        <button
          onClick={onClearAll}
          className="transition-colors hover:text-black"
          style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-faint)', padding: '0.15rem 0.4rem' }}
        >
          Clear all
        </button>
      )}
    </div>
  );
}
