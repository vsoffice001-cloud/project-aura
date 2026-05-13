interface ReportsDropdownProps {
  isOpen: boolean;
}

export function ReportsDropdown({ isOpen }: ReportsDropdownProps) {
  if (!isOpen) return null;
  
  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 z-40">
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-4">By Industry</h3>
            <ul className="space-y-2">
              <li><a href="#healthcare" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Healthcare</a></li>
              <li><a href="#technology" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Technology</a></li>
              <li><a href="#energy" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Energy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-4">By Type</h3>
            <ul className="space-y-2">
              <li><a href="#market-research" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Market Research</a></li>
              <li><a href="#industry-analysis" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Industry Analysis</a></li>
              <li><a href="#company-profiles" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Company Profiles</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-4">Featured</h3>
            <ul className="space-y-2">
              <li><a href="#latest" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Latest Reports</a></li>
              <li><a href="#trending" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Trending</a></li>
              <li><a href="#bestsellers" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Best Sellers</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}