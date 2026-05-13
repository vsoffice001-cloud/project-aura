interface CompanyDropdownProps {
  isOpen: boolean;
}

export function CompanyDropdown({ isOpen }: CompanyDropdownProps) {
  if (!isOpen) return null;
  
  return (
    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-[10px] shadow-lg border border-gray-100 py-2 z-50">
      <a href="#about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--brand-red)] transition-colors">
        About Us
      </a>
      <a href="#team" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--brand-red)] transition-colors">
        Our Team
      </a>
      <a href="#careers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--brand-red)] transition-colors">
        Careers
      </a>
      <a href="#contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--brand-red)] transition-colors">
        Contact
      </a>
    </div>
  );
}