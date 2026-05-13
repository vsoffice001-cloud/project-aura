/**
 * NavDropdownTrigger — Label + Chevron + hover underline for main nav items
 *
 * WHY:   Each of the 5 primary nav items (Reports, Industries, Surveys,
 *        Consulting, Insights) has identical trigger markup: label text,
 *        animated chevron, gradient underline on hover. ~15 lines each × 5 = 75 lines.
 * WHAT:  A button with DM Sans 14px text, a DropdownChevron atom, and a
 *        gradient underline (black→grey→red) that scales from 0→1 on hover.
 *        Wrapped in a 60px-tall flex container for vertical centering.
 * WHEN:  Use for any main-nav-level dropdown trigger.
 * WHERE: DesktopNavItems organism (the row of 5 triggers).
 * HOW:   <NavDropdownTrigger label="Reports" isOpen={activeDropdown === 'reports'}
 *          onMouseEnter={() => handleMouseEnter('reports')}
 *          onKeyDown={(e) => handleKeyDown(e, 'reports')} />
 *
 * Props:
 *   label         — Display text (e.g., "Reports")
 *   isOpen        — Chevron rotation + ARIA state
 *   onMouseEnter  — Hover intent handler
 *   onKeyDown     — Keyboard handler (Enter/Space/Escape)
 *   className?    — Override/extend
 */

import { DropdownChevron } from '../atoms/DropdownChevron';

interface NavDropdownTriggerProps {
  label: string;
  isOpen: boolean;
  onMouseEnter: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  className?: string;
}

export function NavDropdownTrigger({
  label,
  isOpen,
  onMouseEnter,
  onKeyDown,
  className = '',
}: NavDropdownTriggerProps) {
  return (
    <div
      className={`relative h-[60px] flex items-center group ${className}`}
      onMouseEnter={onMouseEnter}
    >
      <button
        type="button"
        onKeyDown={onKeyDown}
        className="
          relative flex items-center gap-1
          font-nav font-normal
          text-[#141016] hover:text-[#b01f24]
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-[rgba(20,16,22,0.5)] focus-visible:ring-offset-2
          transition-colors rounded-[5px] py-1 pb-2
        "
        style={{
          fontSize: 'var(--nav-primary-text)',
          lineHeight: 'var(--nav-lh-primary)',
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`${label} menu`}
      >
        {label}
        <DropdownChevron isOpen={isOpen} size={12} />

        {/* Gradient underline — scales from 0 to 1 on group hover */}
        <div
          className="
            absolute bottom-0 left-0 right-0
            h-[2px] rounded-full
            bg-gradient-to-r from-[#141016] via-[#656565] to-[#b01f24]
            transition-all duration-300 origin-left
            scale-x-0 group-hover:scale-x-100
          "
        />
      </button>
    </div>
  );
}