/**
 * FilterCheckbox — Atom (DS v4.3)
 *
 * WHAT: Single filter option button with label + count.
 * WHY:  Extracted from IndustrySidebar to create a reusable, testable filter control.
 * WHEN: Inside FilterAccordion groups (Industry, Format, Region, Tags, Years).
 * HOW:  Monochromatic black/opacity color system. Selected state uses
 *        black left-border indicator + darkened text. No colour hue.
 *
 * INTERACTION STATES:
 *   Default     → color rgba(0,0,0,0.5), bg transparent
 *   Hover       → color rgba(0,0,0,0.85), bg rgba(0,0,0,0.02)
 *   Selected    → color rgba(0,0,0,0.9), bg rgba(0,0,0,0.04), borderLeft 3px black
 *   Disabled    → opacity 0.4, cursor-not-allowed, no hover
 *   Pressed     → scale(0.98) (active pseudo-class)
 *
 * COLOR SYSTEM: All colors via inline style rgba(). No Tailwind color classes.
 * FONT TOKENS: Label → var(--text-xs) 12.8px | Count → var(--text-card-micro) 10px
 */
import { useState } from 'react';

interface FilterCheckboxProps {
  label: string;
  count?: number;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function FilterCheckbox({ label, count, selected = false, disabled = false, onClick }: FilterCheckboxProps) {
  const [hovered, setHovered] = useState(false);

  const isHovered = hovered && !disabled && !selected;

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className="w-full flex items-center justify-between py-1.5 transition-all duration-100 active:scale-[0.98]"
      style={{
        fontSize: 'var(--text-xs)',
        paddingLeft: '0.625rem',
        paddingRight: '0.625rem',
        borderLeftWidth: '3px',
        borderLeftStyle: 'solid',
        borderLeftColor: selected ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0)',
        color: selected ? 'rgba(0,0,0,0.9)' : isHovered ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.5)',
        backgroundColor: selected ? 'rgba(0,0,0,0.04)' : isHovered ? 'rgba(0,0,0,0.02)' : 'rgba(0,0,0,0)',
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="truncate text-left">{label}</span>
      {count !== undefined && (
        <span
          className="tabular-nums flex-shrink-0"
          style={{
            fontSize: 'var(--text-card-micro)',
            color: selected ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.18)',
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}
