interface SurveyDropdownProps {
  isOpen: boolean;
}

export function SurveyDropdown({ isOpen }: SurveyDropdownProps) {
  if (!isOpen) return null;
  
  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 z-40">
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-4">Market Surveys</h3>
            <ul className="space-y-2">
              <li><a href="#customer-satisfaction" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Customer Satisfaction</a></li>
              <li><a href="#brand-perception" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Brand Perception</a></li>
              <li><a href="#market-sizing" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Market Sizing</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-4">Custom Surveys</h3>
            <ul className="space-y-2">
              <li><a href="#b2b" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">B2B Surveys</a></li>
              <li><a href="#b2c" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">B2C Surveys</a></li>
              <li><a href="#employee" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Employee Surveys</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-4">Data Collection</h3>
            <ul className="space-y-2">
              <li><a href="#online" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Online Surveys</a></li>
              <li><a href="#phone" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Phone Interviews</a></li>
              <li><a href="#focus-groups" className="text-sm text-gray-600 hover:text-[var(--brand-red)]">Focus Groups</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
