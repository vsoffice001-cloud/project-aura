/**
 * SubtleVariantSwitcher — Atom (designer tool)
 *
 * WHY: Design exploration needs an unobtrusive way to toggle between
 *      visual variants of a section without disrupting page layout.
 *      Designer/developer tool — NOT end-user facing.
 * WHAT: Small floating control at section corner showing current variant.
 *       Expands on hover w/ variant descriptions.
 * WHEN: Sections w/ multiple visual modes (card styles · hero variants).
 *       Design-review sessions for quick A/B comparison.
 * WHEN NOT: Production end-user builds · single-variant sections ·
 *           inside scroll-locked containers.
 *
 * HOW:
 * ```tsx
 * <section className="relative">
 *   <SubtleVariantSwitcher
 *     sectionName="Hero"
 *     currentVariant={variant}
 *     variants={[
 *       { id: 'a', label: 'Editorial', description: 'Light surface' },
 *       { id: 'b', label: 'Cinematic', description: 'Dark hero' },
 *     ]}
 *     onVariantChange={setVariant}
 *     position="top-right"
 *   />
 *   {variant === 'a' ? <HeroA /> : <HeroB />}
 * </section>
 * ```
 *
 * @promotedFrom Design_system_vs_26/src/app/components/SubtleVariantSwitcher.tsx
 * @portedDate 2026-05-12 — DS Port Batch 2 · Tier 2
 */
'use client';

import { useState } from 'react';
import { Settings } from 'lucide-react';

export interface VariantOption {
  id: string;
  label: string;
  description?: string;
}

export interface SubtleVariantSwitcherProps {
  /** Section name for the label */
  sectionName: string;
  /** Currently active variant ID */
  currentVariant: string;
  /** Array of variant options */
  variants: VariantOption[];
  /** Callback when variant changes */
  onVariantChange: (variantId: string) => void;
  /** Position relative to the section */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  /** Color theme */
  theme?: 'light' | 'dark';
}

export function SubtleVariantSwitcher({
  sectionName,
  currentVariant,
  variants,
  onVariantChange,
  position = 'top-right',
  theme = 'light',
}: SubtleVariantSwitcherProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isDark = theme === 'dark';

  const positionClasses: Record<string, string> = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  const currentLabel =
    variants.find((v) => v.id === currentVariant)?.label || currentVariant;

  return (
    <div
      className={`absolute z-20 ${positionClasses[position]}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div
        className={`
          inline-flex items-center gap-2 px-3 py-1.5 rounded-full
          text-xs font-medium cursor-pointer select-none
          transition-all duration-200
          ${
            isDark
              ? 'bg-white/10 text-white/60 hover:bg-white/15 hover:text-white/80 border border-white/10'
              : 'bg-black/5 text-black/50 hover:bg-black/8 hover:text-black/70 border border-black/10'
          }
        `}
      >
        <Settings className="w-3 h-3" strokeWidth={2} />
        <span>
          {sectionName}: {currentLabel}
        </span>
      </div>

      {isExpanded && (
        <div
          className={`
            absolute mt-2 rounded-[5px] overflow-hidden shadow-lg min-w-[200px]
            ${position.includes('right') ? 'right-0' : 'left-0'}
            ${
              isDark
                ? 'bg-black/90 border border-white/15 backdrop-blur-md'
                : 'bg-white border border-black/10 backdrop-blur-md'
            }
          `}
        >
          <div
            className={`px-3 py-2 text-xs font-medium uppercase tracking-wider border-b ${
              isDark
                ? 'text-white/40 border-white/10'
                : 'text-black/40 border-black/10'
            }`}
          >
            Variants
          </div>
          {variants.map((variant) => {
            const isActive = variant.id === currentVariant;
            return (
              <button
                key={variant.id}
                type="button"
                onClick={() => onVariantChange(variant.id)}
                className={`
                  w-full px-3 py-2.5 text-left text-sm transition-colors
                  ${
                    isActive
                      ? isDark
                        ? 'bg-white/15 text-white'
                        : 'bg-black/8 text-black'
                      : isDark
                      ? 'text-white/70 hover:bg-white/10 hover:text-white'
                      : 'text-black/60 hover:bg-black/5 hover:text-black'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0`}
                    style={{
                      backgroundColor: isActive
                        ? 'var(--color-brand-red, #b01f24)'
                        : isDark
                        ? 'rgba(255,255,255,0.2)'
                        : 'rgba(0,0,0,0.15)',
                    }}
                  />
                  <div>
                    <div className="font-medium">{variant.label}</div>
                    {variant.description && (
                      <div
                        className={`text-xs mt-0.5 ${
                          isDark ? 'text-white/40' : 'text-black/40'
                        }`}
                      >
                        {variant.description}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
