/**
 * FilterAccordion — Molecule (DS v4.3)
 *
 * WHAT: Collapsible filter section with heading + list of FilterCheckbox items.
 * WHY:  Unified the two duplicated FilterSection implementations (IndustrySidebar
 *        desktop vs MobileFilterSheet) with a single variant prop.
 * WHEN: Inside SidebarPanel for desktop, inside MobileFilterSheet for mobile.
 * HOW:  Renders a section heading + FilterCheckbox list. Supports "static" (always open)
 *        and "collapsible" variants.
 *
 * INTERACTION STATES (collapsible variant trigger):
 *   Default     → color rgba(0,0,0,0.5)
 *   Hover       → color rgba(0,0,0,0.7)
 *   Pressed     → scale(0.98) (active pseudo-class)
 *   Disabled    → opacity 0.4, cursor-not-allowed
 *   Open        → ChevronDown rotates 180deg
 *   Closed      → ChevronDown at 0deg
 *
 * COLOR SYSTEM: All colors via inline style rgba(). No Tailwind color classes.
 * FONT TOKENS: Section heading → var(--text-xs) 12.8px + uppercase + tracking-[0.1em]
 */
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FilterCheckbox } from '../atoms/FilterCheckbox';

type FilterAccordionVariant = 'static' | 'collapsible';

interface FilterOption {
  label: string;
  count?: number;
  disabled?: boolean;
}

interface FilterAccordionProps {
  title: string;
  options: FilterOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  variant?: FilterAccordionVariant;
  defaultOpen?: boolean;
  disabled?: boolean;
}

export function FilterAccordion({
  title,
  options,
  selectedValue,
  onSelect,
  variant = 'static',
  defaultOpen = true,
  disabled = false,
}: FilterAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [hovered, setHovered] = useState(false);

  const showContent = variant === 'static' || isOpen;

  return (
    <div style={{ opacity: disabled ? 0.4 : 1 }}>
      {variant === 'collapsible' ? (
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full flex items-center justify-between mb-3 ${
            disabled ? 'cursor-not-allowed' : 'cursor-pointer active:scale-[0.98]'
          }`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <h3
            className="uppercase transition-colors"
            style={{
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.1em',
              color: hovered && !disabled ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)',
            }}
          >
            {title}
          </h3>
          <ChevronDown
            size={12}
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
            style={{ color: 'rgba(0,0,0,0.3)' }}
          />
        </button>
      ) : (
        <h3
          className="uppercase mb-3"
          style={{
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.1em',
            color: 'rgba(0,0,0,0.5)',
          }}
        >
          {title}
        </h3>
      )}

      {showContent && (
        <div className="space-y-0">
          {options.map((opt) => (
            <FilterCheckbox
              key={opt.label}
              label={opt.label}
              count={opt.count}
              selected={selectedValue === opt.label}
              disabled={disabled || opt.disabled}
              onClick={() => onSelect(opt.label)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
