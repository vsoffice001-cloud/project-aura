interface VariantOption {
  value: string;
  label: string;
  description?: string;
}

interface VariantSwitcherProps {
  options: VariantOption[];
  activeVariant: string;
  onChange: (variant: string) => void;
}

export function VariantSwitcher({ options, activeVariant, onChange }: VariantSwitcherProps) {
  return (
    <div className="bg-white border-t border-b border-black/10 py-8 md:py-10">
      <div className="max-w-[var(--container-content)] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Label */}
          <div className="space-y-2">
            <span 
              className="font-medium text-black/40 uppercase tracking-[2px] block" 
              style={{ fontSize: 'var(--text-xs)' }}
            >
              Component Variant
            </span>
            <p 
              className="text-black/70 leading-[1.6]" 
              style={{ fontSize: 'var(--text-sm)' }}
            >
              Toggle between different visual layouts
            </p>
          </div>

          {/* Segmented Control */}
          <div className="inline-flex bg-black/[0.04] p-1 rounded-[10px] border border-black/10">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => onChange(option.value)}
                className={`
                  px-4 md:px-6 py-2.5 md:py-3 rounded-[5px] font-medium tracking-wide transition-all duration-300
                  ${activeVariant === option.value 
                    ? 'bg-white text-black shadow-sm border border-black/10' 
                    : 'text-black/50 hover:text-black/70 hover:bg-white/50'
                  }
                `}
                style={{ fontSize: 'var(--text-xs)' }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Variant Description */}
        {options.find(opt => opt.value === activeVariant)?.description && (
          <div className="mt-6 pt-6 border-t border-black/[0.06]">
            <p 
              className="text-black/50 italic max-w-2xl" 
              style={{ fontSize: 'var(--text-sm)' }}
            >
              {options.find(opt => opt.value === activeVariant)?.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}