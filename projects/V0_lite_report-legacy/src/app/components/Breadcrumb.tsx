import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { colors, borderRadius, zIndex } from '../../design-system/tokens';

// ============================================
// BREADCRUMB DATA STRUCTURE
// ============================================

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbLevel {
  label: string;
  href: string;
  /** Column header shown in the dropdown (e.g. "Search category") */
  dropdownLabel?: string;
  /** Sibling items at this level */
  siblings?: BreadcrumbItem[];
  /** Next-level items shown in the right column */
  children?: {
    dropdownLabel: string;
    items: BreadcrumbItem[];
  };
}

interface BreadcrumbProps {
  levels: BreadcrumbLevel[];
  /** Theme: adapts text color for dark or light hero backgrounds */
  colorScheme?: 'light' | 'dark';
}

// ============================================
// MOCK DATA — Healthcare market research
// ============================================

export const healthcareBreadcrumbData: BreadcrumbLevel[] = [
  {
    label: 'Home',
    href: '#',
  },
  {
    label: 'Healthcare',
    href: '#',
    dropdownLabel: 'Search category',
    siblings: [
      { label: 'Food, Beverage and Tobacco', href: '#' },
      { label: 'Public Sector and Administration', href: '#' },
      { label: 'Defense and Security', href: '#' },
      { label: 'Healthcare', href: '#', active: true },
      { label: 'Banking Financial Services and Insurance', href: '#' },
      { label: 'Media and Entertainment', href: '#' },
      { label: 'Information Technology', href: '#' },
    ],
    children: {
      dropdownLabel: 'Search subcategory',
      items: [
        { label: 'AI in Healthcare', href: '#', active: true },
        { label: 'Medical Devices', href: '#' },
        { label: 'Pharmaceuticals', href: '#' },
        { label: 'Digital Health', href: '#' },
        { label: 'Diagnostics', href: '#' },
        { label: 'Telehealth', href: '#' },
        { label: 'Clinical Trials', href: '#' },
      ],
    },
  },
  {
    label: 'AI in Healthcare',
    href: '#',
    dropdownLabel: 'Search subcategory',
    siblings: [
      { label: 'AI in Healthcare', href: '#', active: true },
      { label: 'Medical Devices', href: '#' },
      { label: 'Pharmaceuticals', href: '#' },
      { label: 'Digital Health', href: '#' },
      { label: 'Diagnostics', href: '#' },
      { label: 'Telehealth', href: '#' },
      { label: 'Clinical Trials', href: '#' },
    ],
    children: {
      dropdownLabel: 'Search tag',
      items: [
        { label: 'Market Analysis', href: '#', active: true },
        { label: 'Competitive Landscape', href: '#' },
        { label: 'Drug Discovery AI', href: '#' },
        { label: 'Medical Imaging AI', href: '#' },
        { label: 'NLP in Healthcare', href: '#' },
        { label: 'Predictive Analytics', href: '#' },
        { label: 'Robot-Assisted Surgery', href: '#' },
      ],
    },
  },
  {
    label: 'Market Analysis',
    href: '#',
    dropdownLabel: 'Search tag',
    siblings: [
      { label: 'Market Analysis', href: '#', active: true },
      { label: 'Competitive Landscape', href: '#' },
      { label: 'Drug Discovery AI', href: '#' },
      { label: 'Medical Imaging AI', href: '#' },
      { label: 'NLP in Healthcare', href: '#' },
      { label: 'Predictive Analytics', href: '#' },
      { label: 'Robot-Assisted Surgery', href: '#' },
    ],
  },
];

// ============================================
// DROPDOWN COLUMN (internal)
// ============================================

function DropdownColumn({
  label,
  items,
  onClose,
}: {
  label: string;
  items: BreadcrumbItem[];
  onClose: () => void;
}) {
  return (
    <div className="flex-1 py-4 px-5">
      <div
        className="font-sans text-[13px] tracking-[0.2px] pb-2 mb-2 border-b"
        style={{ color: 'var(--black-400)', borderColor: 'var(--black-200)' }}
      >
        {label}
      </div>
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className={`block px-3 py-2 font-sans text-[14px] transition-colors duration-150 ${
                item.active
                  ? 'font-medium'
                  : 'text-black/60 hover:text-black/90 hover:bg-black/3'
              }`}
              style={{
                borderRadius: borderRadius.small,
                ...(item.active
                  ? {
                      color: colors.brand.red600,
                      backgroundColor: 'rgba(176, 31, 36, 0.06)',
                    }
                  : undefined),
              }}
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================
// DROPDOWN PANEL (internal)
// ============================================

function BreadcrumbDropdown({
  level,
  onClose,
}: {
  level: BreadcrumbLevel;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const hasTwoColumns = !!level.children;

  return (
    <motion.div
      ref={panelRef}
      className="absolute left-0 top-full mt-2 bg-white overflow-hidden"
      style={{
        zIndex: zIndex.dropdown,
        borderRadius: borderRadius.large,
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        border: '1px solid var(--black-200)',
        minWidth: hasTwoColumns ? '520px' : '260px',
        maxWidth: 'calc(100vw - 2rem)',
      }}
      initial={{ opacity: 0, y: -4, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.98 }}
      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`flex ${hasTwoColumns ? 'flex-col sm:flex-row' : ''}`}>
        {level.siblings && (
          <div
            className={hasTwoColumns
              ? 'flex-1 border-b sm:border-b-0 sm:border-r'
              : 'flex-1'
            }
            style={{ borderColor: 'var(--black-200)' }}
          >
            <DropdownColumn
              label={level.dropdownLabel || 'Browse'}
              items={level.siblings}
              onClose={onClose}
            />
          </div>
        )}

        {level.children && (
          <DropdownColumn
            label={level.children.dropdownLabel}
            items={level.children.items}
            onClose={onClose}
          />
        )}
      </div>
    </motion.div>
  );
}

// ============================================
// BREADCRUMB COMPONENT
// ============================================

export function Breadcrumb({ levels, colorScheme = 'dark' }: BreadcrumbProps) {
  const [openDropdownIdx, setOpenDropdownIdx] = useState<number | null>(null);

  const isDark = colorScheme === 'dark';

  const closeDropdown = useCallback(() => setOpenDropdownIdx(null), []);

  return (
    <nav aria-label="Breadcrumb" className="relative">
      <ol className="flex items-center flex-wrap gap-y-1">
        {levels.map((level, idx) => {
          const isLast = idx === levels.length - 1;
          const hasDropdown = !!level.siblings || !!level.children;
          const isOpen = openDropdownIdx === idx;

          return (
            <li key={level.label} className="flex items-center relative">
              {idx > 0 && (
                <ChevronRight
                  className={`mx-1.5 sm:mx-2 h-3 w-3 shrink-0 ${
                    isDark ? 'text-white/40' : 'text-black/30'
                  }`}
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              )}

              {idx === 0 ? (
                <a
                  href={level.href}
                  className={`font-sans text-[13px] sm:text-[14px] tracking-[0.2px] transition-colors duration-200 ${
                    isDark
                      ? 'text-white/70 hover:text-white'
                      : 'text-black/50 hover:text-black/80'
                  }`}
                >
                  {level.label}
                </a>
              ) : (
                <span className="relative inline-flex items-center">
                  <a
                    href={level.href}
                    className={`font-sans text-[13px] sm:text-[14px] tracking-[0.2px] transition-colors duration-200 ${
                      isLast
                        ? isDark
                          ? 'text-white font-medium'
                          : 'text-black/80 font-medium'
                        : isDark
                          ? 'text-white/70 hover:text-white'
                          : 'text-black/50 hover:text-black/80'
                    }`}
                    {...(isLast ? { 'aria-current': 'page' as const } : {})}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {level.label}
                  </a>

                  {isLast && hasDropdown && (
                    <button
                      onClick={() =>
                        setOpenDropdownIdx(isOpen ? null : idx)
                      }
                      className={`ml-1.5 p-1 transition-colors duration-150 ${
                        isDark
                          ? 'hover:bg-white/10'
                          : 'hover:bg-black/5'
                      } ${isOpen ? (isDark ? 'bg-white/10' : 'bg-black/5') : ''}`}
                      style={{ borderRadius: borderRadius.small }}
                      aria-label={`Browse ${level.label} options`}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                    >
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        className={`shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-90' : ''
                        }`}
                        aria-hidden="true"
                      >
                        <path
                          d="M2 1L6 4L2 7"
                          fill={colors.brand.red600}
                        />
                      </svg>
                    </button>
                  )}

                  <AnimatePresence>
                    {isOpen && (
                      <BreadcrumbDropdown
                        level={level}
                        onClose={closeDropdown}
                      />
                    )}
                  </AnimatePresence>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
