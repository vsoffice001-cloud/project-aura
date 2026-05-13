interface IndustriesDropdownProps {
  isOpen: boolean;
}

export function IndustriesDropdown({ isOpen }: IndustriesDropdownProps) {
  if (!isOpen) return null;
  
  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 z-40">
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="grid grid-cols-4 gap-6">
          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-4">Technology</h3>
            <ul className="space-y-2">
              <li><a href="#ai" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Artificial Intelligence</a></li>
              <li><a href="#cloud" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Cloud Computing</a></li>
              <li><a href="#iot" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">IoT</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-4">Healthcare</h3>
            <ul className="space-y-2">
              <li><a href="#pharma" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Pharmaceuticals</a></li>
              <li><a href="#biotech" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Biotechnology</a></li>
              <li><a href="#medical-devices" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Medical Devices</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-4">Energy</h3>
            <ul className="space-y-2">
              <li><a href="#renewable" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Renewable Energy</a></li>
              <li><a href="#oil-gas" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Oil & Gas</a></li>
              <li><a href="#utilities" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Utilities</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-4">Finance</h3>
            <ul className="space-y-2">
              <li><a href="#banking" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Banking</a></li>
              <li><a href="#insurance" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Insurance</a></li>
              <li><a href="#fintech" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">FinTech</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
