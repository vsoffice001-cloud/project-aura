/**
 * CompanyTrigger — Secondary bar dropdown trigger for "Company"
 *
 * WHY:   The Company trigger was ~20 lines of inline JSX inside SecondaryBar,
 *        mixing button markup, chevron, keyboard handler, and the dropdown
 *        panel. Extracting it decouples SecondaryBar from CompanyDropdown
 *        and makes the trigger pattern reusable for other secondary-bar items.
 * WHAT:  A helper-text-sized button with DropdownChevron (10px), hover
 *        color transition (grey→red), WCAG focus ring, and the dropdown
 *        panel rendered absolutely below.
 * WHEN:  Visible on desktop secondary bar, hidden on mobile.
 * WHERE: SecondaryBar organism (left side, after utility links).
 * HOW:   <CompanyTrigger isOpen={active === 'company'}
 *          onMouseEnter={() => enter('company')}
 *          onKeyDown={(e) => keyDown(e, 'company')}
 *          dropdown={<CompanyDropdown isOpen={active === 'company'} />} />
 *
 * Props:
 *   label        — Trigger text (default: "Company")
 *   isOpen       — Controls chevron rotation + ARIA state
 *   onMouseEnter — Hover intent handler
 *   onKeyDown    — Keyboard handler (Enter/Space/Escape)
 *   dropdown     — The dropdown panel to render (injectable)
 */

import { ReactNode } from 'react';
import { DropdownChevron } from '../atoms/DropdownChevron';

interface CompanyTriggerProps {
  label?: string;
  isOpen: boolean;
  onMouseEnter: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  dropdown: ReactNode;
}

export function CompanyTrigger({
  label = 'Company',
  isOpen,
  onMouseEnter,
  onKeyDown,
  dropdown,
}: CompanyTriggerProps) {
  return (
    <div className="relative" onMouseEnter={onMouseEnter}>
      <button
        type="button"
        className="
          flex items-center gap-1
          font-nav font-normal
          text-[#656565] hover:text-[#b01f24]
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-[rgba(20,16,22,0.5)] focus-visible:ring-offset-2
          rounded-[3px] transition-colors
        "
        style={{
          fontSize: 'var(--nav-helper-text)',
          lineHeight: 'var(--nav-lh-helper)',
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onKeyDown={onKeyDown}
      >
        {label}
        <DropdownChevron isOpen={isOpen} size={10} />
      </button>
      {dropdown}
    </div>
  );
}
