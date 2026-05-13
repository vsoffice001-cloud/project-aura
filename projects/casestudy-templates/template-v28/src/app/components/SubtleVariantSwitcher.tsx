import { useState } from 'react';
import { Settings2, ChevronDown, ChevronUp } from 'lucide-react';

interface Variant {
  id: string;
  label: string;
  description?: string;
}

interface SubtleVariantSwitcherProps {
  sectionName: string;
  currentVariant: string;
  variants: Variant[];
  onVariantChange: (variantId: string) => void;
  position?: 'top-right' | 'bottom-right' | 'bottom-center';
  theme?: 'light' | 'dark'; // Auto-detect theme based on current variant
}

/**
 * SubtleVariantSwitcher Component
 * 
 * Hidden developer tool for variant preview.
 * Appears as a small floating button, expands on click.
 * 
 * Features:
 * - Minimal, non-intrusive design
 * - Floating position (configurable)
 * - Expands/collapses on click
 * - Clean dropdown UI
 * - Professional developer aesthetic
 * - Theme-aware (adapts to light/dark backgrounds)
 */
export function SubtleVariantSwitcher({
  sectionName,
  currentVariant,
  variants,
  onVariantChange,
  position = 'top-right',
  theme
}: SubtleVariantSwitcherProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const currentVariantObj = variants.find(v => v.id === currentVariant);

  // Auto-detect theme if not provided
  const isDark = theme === 'dark' || currentVariant === 'dark';

  const positionClasses = position === 'top-right' 
    ? 'top-4 right-4' 
    : position === 'bottom-right'
      ? 'bottom-4 right-4'
      : 'bottom-4 left-1/2 transform -translate-x-1/2';

  // Theme-aware colors
  const buttonBg = isDark ? 'bg-white/10 hover:bg-white/15' : 'bg-black/5 hover:bg-black/10';
  const buttonBorder = isDark ? 'border-white/20' : 'border-black/10';
  const iconColor = isDark ? 'text-white/50 group-hover:text-white/70' : 'text-black/30 group-hover:text-black/50';
  const textColor = isDark ? 'text-white/60 group-hover:text-white/80' : 'text-black/40 group-hover:text-black/60';

  return (
    <div className={`absolute ${positionClasses} z-20`}>
      {/* Collapsed State - Small Button */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className={`flex items-center gap-2 px-3 py-2 ${buttonBg} border ${buttonBorder} rounded-[5px] transition-all duration-200 group`}
          title={`Switch ${sectionName} variant`}
        >
          <Settings2 className={`w-3.5 h-3.5 ${iconColor} transition-colors`} strokeWidth={2} />
          <span className={`${textColor} transition-colors`} style={{ fontSize: '11px', fontWeight: 500 }}>
            {currentVariantObj?.label}
          </span>
          <ChevronDown className={`w-3 h-3 ${iconColor} transition-colors`} strokeWidth={2} />
        </button>
      )}

      {/* Expanded State - Dropdown */}
      {isExpanded && (
        <div className="bg-white border border-black/10 rounded-[5px] shadow-lg overflow-hidden min-w-[220px]">
          {/* Header */}
          <div className="px-3 py-2 bg-black/[0.02] border-b border-black/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings2 className="w-3.5 h-3.5 text-black/40" strokeWidth={2} />
              <span className="text-black/60" style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.3px' }}>
                {sectionName}
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-black/30 hover:text-black/60 transition-colors"
            >
              <ChevronUp className="w-3 h-3" strokeWidth={2} />
            </button>
          </div>

          {/* Variant Options */}
          <div className="py-1">
            {variants.map((variant) => {
              const isActive = variant.id === currentVariant;
              
              return (
                <button
                  key={variant.id}
                  onClick={() => {
                    onVariantChange(variant.id);
                    setIsExpanded(false);
                  }}
                  className={`w-full text-left px-3 py-2 transition-all duration-150 ${
                    isActive 
                      ? 'bg-black/[0.04] text-black/90' 
                      : 'hover:bg-black/[0.02] text-black/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {/* Active indicator */}
                    <div className={`w-1 h-1 rounded-full transition-all duration-200 ${
                      isActive ? 'bg-red-600' : 'bg-transparent'
                    }`} />
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span 
                          style={{ fontSize: '12px', fontWeight: isActive ? 500 : 400 }}
                          className="transition-all duration-150"
                        >
                          {variant.label}
                        </span>
                      </div>
                      
                      {variant.description && (
                        <div 
                          className="text-black/40 mt-0.5" 
                          style={{ fontSize: '10px', lineHeight: '1.3' }}
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

          {/* Footer hint */}
          <div className="px-3 py-1.5 bg-black/[0.01] border-t border-black/5">
            <span className="text-black/30" style={{ fontSize: '9px', letterSpacing: '0.2px' }}>
              Development preview only
            </span>
          </div>
        </div>
      )}
    </div>
  );
}