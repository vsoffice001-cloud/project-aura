interface ConsultingDropdownProps {
  isOpen: boolean;
}

export function ConsultingDropdown({ isOpen }: ConsultingDropdownProps) {
  if (!isOpen) return null;
  
  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 z-40">
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-4">Strategy</h3>
            <ul className="space-y-2">
              <li><a href="#market-entry" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Market Entry</a></li>
              <li><a href="#growth-strategy" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Growth Strategy</a></li>
              <li><a href="#competitive-analysis" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Competitive Analysis</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-4">Operations</h3>
            <ul className="space-y-2">
              <li><a href="#process-optimization" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Process Optimization</a></li>
              <li><a href="#supply-chain" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Supply Chain</a></li>
              <li><a href="#digital-transformation" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Digital Transformation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-4">Custom Solutions</h3>
            <ul className="space-y-2">
              <li><a href="#custom-research" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Custom Research</a></li>
              <li><a href="#advisory" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Advisory Services</a></li>
              <li><a href="#data-analytics" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Data Analytics</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}