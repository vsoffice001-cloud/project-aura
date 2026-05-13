interface InsightsDropdownProps {
  isOpen: boolean;
}

export function InsightsDropdown({ isOpen }: InsightsDropdownProps) {
  if (!isOpen) return null;
  
  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 z-40">
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-4">Articles</h3>
            <ul className="space-y-2">
              <li><a href="#blog" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Blog</a></li>
              <li><a href="#case-studies" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Case Studies</a></li>
              <li><a href="#whitepapers" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Whitepapers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#webinars" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Webinars</a></li>
              <li><a href="#podcasts" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Podcasts</a></li>
              <li><a href="#videos" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Videos</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-4">Trends</h3>
            <ul className="space-y-2">
              <li><a href="#market-trends" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Market Trends</a></li>
              <li><a href="#industry-outlook" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Industry Outlook</a></li>
              <li><a href="#forecasts" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Forecasts</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}