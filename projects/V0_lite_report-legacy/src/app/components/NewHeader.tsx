import { useState } from 'react';
import svgPaths from '../../imports/svg-qv2lxgwcuk';
import LogoContainer from '../../imports/LogoContainer';
import { MobileMenu } from './mobile/MobileMenu';
import { CompanyDropdown } from './CompanyDropdown';
import { ConsultingDropdown } from './ConsultingDropdown';
import { IndustriesDropdown } from './IndustriesDropdown';
import { InsightsDropdown } from './InsightsDropdown';
import { SurveyDropdown } from './SurveyDropdown';
import { ReportsDropdown } from './ReportsDropdown';

export function NewHeader() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMouseEnter = (menu: string) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, menu: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown(menu);
    } else if (e.key === 'Escape') {
      setActiveDropdown(null);
    }
  };

  return (
    <>
      {/* Skip Link */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Secondary Menu */}
      <div 
        className="bg-[var(--black-50)] border-b border-[rgba(0,0,0,0.05)] h-[40px] relative w-full z-[60] hidden md:block"
        onMouseLeave={handleMouseLeave}
      >
        <div className="nav-container h-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a 
              href="#procurement" 
              className="text-[13px] text-[var(--black-500)] hover:text-[var(--brand-red)] transition-colors"
            >
              Procurement
            </a>
            <a 
              href="#expert-panel" 
              className="text-[13px] text-[var(--black-500)] hover:text-[var(--brand-red)] transition-colors"
            >
              Expert Panel
            </a>
            
            {/* Company Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('company')}
            >
              <button 
                className="flex items-center gap-1 text-[13px] text-[var(--black-500)] hover:text-[var(--brand-red)] transition-colors"
                aria-expanded={activeDropdown === 'company'}
                onKeyDown={(e) => handleKeyDown(e, 'company')}
              >
                Company
                <svg 
                  className={`size-[10px] transition-transform duration-300 ${activeDropdown === 'company' ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 10 10"
                >
                  <path d="M8 3.5L5 6.5L2 3.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <CompanyDropdown isOpen={activeDropdown === 'company'} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="#signin" 
              className="flex items-center gap-1 text-[13px] text-[var(--black-500)] hover:text-[var(--brand-red)] transition-colors"
            >
              <svg className="size-[12px]" fill="none" viewBox="0 0 12 12" stroke="currentColor">
                <path d="M6.5 1.5H2.5C2.22386 1.5 2 1.72386 2 2V10C2 10.2761 2.22386 10.5 2.5 10.5H6.5M8 8.5L10.5 6M10.5 6L8 3.5M10.5 6H5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Sign in
            </a>
            <button 
              className="flex items-center gap-1.5 border border-[var(--warm-500)] bg-white px-3 py-1.5 rounded-[5px] text-[13px] font-medium text-black hover:border-black hover:bg-[var(--coral-50)] active:bg-[var(--coral-100)] transition-all"
            >
              <svg className="size-[12px]" fill="none" viewBox="0 0 12 12" stroke="currentColor">
                <path d="M6 5.5C6.82843 5.5 7.5 4.82843 7.5 4C7.5 3.17157 6.82843 2.5 6 2.5C5.17157 2.5 4.5 3.17157 4.5 4C4.5 4.82843 5.17157 5.5 6 5.5Z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 9.5C3 8.17 4.34 7 6 7C7.66 7 9 8.17 9 9.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div 
        className="sticky top-0 z-[50] w-full"
        onMouseLeave={handleMouseLeave}
      >
        {/* Backdrop */}
        {activeDropdown && activeDropdown !== 'company' && (
          <div
            className="fixed inset-0 bg-black/5 z-[45]"
            onClick={() => setActiveDropdown(null)}
          />
        )}

        <nav className="relative bg-white h-[60px] shadow-md z-[50]">
          <div className="nav-container h-full flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="h-[20px] w-[152px] flex items-center cursor-pointer bg-transparent border-0 p-0"
              aria-label="Go to top"
            >
              <LogoContainer />
            </button>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Mobile Search Button */}
              <button
                className="flex items-center justify-center p-2.5 rounded-lg hover:bg-gray-100"
                aria-label="Search"
              >
                <svg className="size-[18px]" fill="none" viewBox="0 0 16 16">
                  <circle cx="7" cy="7" r="5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10.531 10.531L13.996 13.996" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button 
                className="flex items-center justify-center p-2.5 rounded-lg hover:bg-gray-100"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <div className="w-[24px] flex flex-col gap-[5px]">
                  <div 
                    className={`h-[2.5px] bg-black rounded-full transition-all ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-[7.5px]' : ''
                    }`} 
                  />
                  <div 
                    className={`h-[2.5px] bg-black rounded-full transition-all ${
                      isMobileMenuOpen ? 'opacity-0' : ''
                    }`} 
                  />
                  <div 
                    className={`h-[2.5px] bg-black rounded-full transition-all ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-[7.5px]' : ''
                    }`} 
                  />
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {/* Reports */}
              <div 
                className="relative h-[60px] flex items-center group"
                onMouseEnter={() => handleMouseEnter('reports')}
              >
                <button 
                  className="flex items-center gap-1 text-[16px] text-black hover:text-[var(--brand-red)] transition-colors"
                  onKeyDown={(e) => handleKeyDown(e, 'reports')}
                >
                  Reports
                  <svg 
                    className={`size-[12px] transition-transform ${activeDropdown === 'reports' ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 12 12"
                  >
                    <path d="M9.75 4.5L6 8.25L2.25 4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Industries */}
              <div 
                className="relative h-[60px] flex items-center group"
                onMouseEnter={() => handleMouseEnter('industries')}
              >
                <button 
                  className="flex items-center gap-1 text-[16px] text-black hover:text-[var(--brand-red)] transition-colors"
                  onKeyDown={(e) => handleKeyDown(e, 'industries')}
                >
                  Industries
                  <svg 
                    className={`size-[12px] transition-transform ${activeDropdown === 'industries' ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 12 12"
                  >
                    <path d="M9.75 4.5L6 8.25L2.25 4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Surveys */}
              <div 
                className="relative h-[60px] flex items-center group"
                onMouseEnter={() => handleMouseEnter('survey')}
              >
                <button 
                  className="flex items-center gap-1 text-[16px] text-black hover:text-[var(--brand-red)] transition-colors"
                  onKeyDown={(e) => handleKeyDown(e, 'survey')}
                >
                  Surveys
                  <svg 
                    className={`size-[12px] transition-transform ${activeDropdown === 'survey' ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 12 12"
                  >
                    <path d="M9.75 4.5L6 8.25L2.25 4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Consulting */}
              <div 
                className="relative h-[60px] flex items-center group"
                onMouseEnter={() => handleMouseEnter('consulting')}
              >
                <button 
                  className="flex items-center gap-1 text-[16px] text-black hover:text-[var(--brand-red)] transition-colors"
                  onKeyDown={(e) => handleKeyDown(e, 'consulting')}
                >
                  Consulting
                  <svg 
                    className={`size-[12px] transition-transform ${activeDropdown === 'consulting' ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 12 12"
                  >
                    <path d="M9.75 4.5L6 8.25L2.25 4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Insights */}
              <div 
                className="relative h-[60px] flex items-center group"
                onMouseEnter={() => handleMouseEnter('insights')}
              >
                <button 
                  className="flex items-center gap-1 text-[16px] text-black hover:text-[var(--brand-red)] transition-colors"
                  onKeyDown={(e) => handleKeyDown(e, 'insights')}
                >
                  Insights
                  <svg 
                    className={`size-[12px] transition-transform ${activeDropdown === 'insights' ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 12 12"
                  >
                    <path d="M9.75 4.5L6 8.25L2.25 4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative h-[35px] w-[120px]">
                <div className="bg-[var(--black-100)] overflow-hidden relative rounded-full shadow-lg h-full">
                  <div className="absolute bg-[var(--black-50)] flex gap-3 inset-[2px] items-center px-3 rounded-full">
                    <input 
                      type="text" 
                      placeholder="Search"
                      className="bg-transparent text-[14px] text-black placeholder:text-[var(--black-400)] outline-none w-full"
                    />
                    <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
                      <path d={svgPaths.p888ea00} stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10.531 10.531L13.996 13.996" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              className="hidden md:block bg-gradient-to-r from-[var(--brand-red)] via-[var(--red-500)] to-[var(--brand-red)] px-4 py-2 rounded-md text-[16px] font-bold text-white hover:shadow-lg transition-shadow"
            >
              Book discovery call
            </button>
          </div>
        </nav>

        {/* Dropdowns */}
        <ConsultingDropdown isOpen={activeDropdown === 'consulting'} />
        <IndustriesDropdown isOpen={activeDropdown === 'industries'} />
        <InsightsDropdown isOpen={activeDropdown === 'insights'} />
        <SurveyDropdown isOpen={activeDropdown === 'survey'} />
        <ReportsDropdown isOpen={activeDropdown === 'reports'} />

        {/* Mobile Menu */}
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={closeMobileMenu}
        />
      </div>
    </>
  );
}