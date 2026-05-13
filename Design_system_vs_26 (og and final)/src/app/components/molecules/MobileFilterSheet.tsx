/**
 * MobileFilterSheet — Molecule (DS v4.3)
 *
 * WHAT: Bottom-slide sheet overlay for mobile filter access (< lg breakpoints).
 * WHY:  Desktop sidebar is hidden below lg — mobile users need filter access.
 *       Sheet pattern matches mobile-first UX (Fitts's Law: thumb-reachable,
 *       Miller's Law: progressive disclosure of filter options).
 * WHEN: Triggered by the SlidersHorizontal button visible at `lg:hidden`.
 * HOW:  Fixed overlay with backdrop + bottom-sliding panel containing
 *       the same `sidebarContent` JSX shared with the desktop SidebarPanel.
 *
 * ANATOMY:
 *   [backdrop]
 *     [sheet panel]
 *       [drag handle bar]
 *       [header: "Filters" + count badge + close button]
 *       [scrollable body: children (sidebarContent)]
 *       [footer: "Show N results" button + "Clear all"]
 *
 * INTERACTION STATES:
 *   Closed  → Not rendered (portal unmounted)
 *   Opening → backdrop fades in, sheet slides up from bottom
 *   Open    → Full interaction, scroll within body
 *   Closing → Reverse animation, then unmount
 *
 * COLOR SYSTEM: All colors via inline style rgba(). No Tailwind color classes.
 * RADIUS: Top corners → 10px (DS container radius).
 * MAX HEIGHT: 85vh (leaves status bar visible on mobile).
 * FONT TOKENS: Header → var(--text-xs), Footer → var(--text-xs)
 */
import { ReactNode, useEffect, useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { Badge } from '@/app/components/Badge';

interface MobileFilterSheetProps {
  /** Whether the sheet is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Number of active filter dimensions */
  activeCount?: number;
  /** Number of filtered results to show in footer CTA */
  resultCount?: number;
  /** Clear all filters handler */
  onClearAll?: () => void;
  /** Filter content (same JSX as desktop sidebar) */
  children: ReactNode;
}

export function MobileFilterSheet({
  isOpen,
  onClose,
  activeCount = 0,
  resultCount = 0,
  onClearAll,
  children,
}: MobileFilterSheetProps) {
  const [closeHovered, setCloseHovered] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);

  // Lock body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0,0,0,0.4)',
          animation: 'fadeIn 200ms ease-out',
        }}
        onClick={onClose}
      />

      {/* Sheet Panel */}
      <div
        className="absolute bottom-0 left-0 right-0 flex flex-col"
        style={{
          maxHeight: '85vh',
          borderRadius: '10px 10px 0 0',
          backgroundColor: 'rgba(255,255,255,1)',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.12), 0 -1px 4px rgba(0,0,0,0.06)',
          animation: 'slideUp 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div
            className="w-10 h-1 rounded-full"
            style={{ backgroundColor: 'rgba(0,0,0,0.12)' }}
          />
        </div>

        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            borderBottomColor: 'rgba(0,0,0,0.06)',
          }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 flex items-center justify-center"
              style={{
                borderRadius: 'var(--radius-element)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(0,0,0,0.08)',
                backgroundColor: 'rgba(255,255,255,1)',
              }}
            >
              <SlidersHorizontal size={14} style={{ color: 'rgba(0,0,0,0.45)' }} />
            </div>
            <h3
              className="uppercase tracking-[0.1em]"
              style={{
                fontSize: 'var(--text-xs)',
                color: 'rgba(0,0,0,0.5)',
              }}
            >
              Filters
            </h3>
            {activeCount > 0 && (
              <Badge variant="pill" size="xs" theme="neutral" mode="dark">
                {activeCount}
              </Badge>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center transition-colors"
            style={{
              borderRadius: 'var(--radius-element)',
              backgroundColor: closeHovered ? 'rgba(0,0,0,0.04)' : 'rgba(0,0,0,0)',
            }}
            onMouseEnter={() => setCloseHovered(true)}
            onMouseLeave={() => setCloseHovered(false)}
            aria-label="Close filters"
          >
            <X size={16} style={{ color: 'rgba(0,0,0,0.5)' }} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {children}
        </div>

        {/* Footer */}
        <div
          className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
          style={{
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
            borderTopColor: 'rgba(0,0,0,0.06)',
            backgroundColor: 'var(--black-50, rgba(250,250,250,1))',
          }}
        >
          {activeCount > 0 && onClearAll && (
            <button
              onClick={() => { onClearAll(); onClose(); }}
              className="flex items-center gap-1 transition-colors cursor-pointer"
              style={{ fontSize: 'var(--text-xs)', color: 'rgba(0,0,0,0.4)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(0,0,0,0.6)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(0,0,0,0.4)'; }}
            >
              <X size={12} />
              Clear all
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-auto flex-shrink-0 px-5 py-2.5 transition-all cursor-pointer"
            style={{
              borderRadius: 'var(--radius-element)',
              fontSize: 'var(--text-xs)',
              backgroundColor: ctaHovered ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,1)',
              color: 'rgba(255,255,255,1)',
            }}
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
          >
            Show {resultCount.toLocaleString()} report{resultCount !== 1 ? 's' : ''}
          </button>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
