import { useState } from 'react';
import svgPaths from '@/imports/svg-fodxwe3cpi';
import { useScrollDirection } from '@/app/hooks/useScrollDirection';
import { useHeroVisibility } from '@/app/hooks/useHeroVisibility';
import { useActiveSection } from '@/app/hooks/useActiveSection';
import { Button } from '@/app/components/Button';
import { MegaMenu } from '@/app/components/MegaMenu';
import { Container } from './Container';
import { ChevronDown } from 'lucide-react';

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenContact?: () => void;
}

export function Navbar({ onOpenSearch = () => {}, onOpenContact = () => {} }: NavbarProps = {}) {
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showServicesMega, setShowServicesMega] = useState(false);
  const [showIndustriesMega, setShowIndustriesMega] = useState(false);
  const scrollDirection = useScrollDirection();
  const isHeroVisible = useHeroVisibility();
  const activeSection = useActiveSection();
  
  // Determine if navbar should hide
  const shouldHide = !isHeroVisible && scrollDirection === 'down';

  const sections = [
    { id: 'client-context', label: 'Context' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'engagement', label: 'Objectives' },
    { id: 'methodology', label: 'Approach' },
    { id: 'impact', label: 'Impact' },
    { id: 'testimonial', label: 'Testimonial' },
    { id: 'resources', label: 'Resources' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        shouldHide ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Skip to Content Link - WCAG 2.4.1 */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-black"
      >
        Skip to main content
      </a>

      <div className="flex flex-col w-full shadow-[0px_8px_12px_-4px_rgba(128,108,224,0.15)]">
        
        {/* ============================================
            SECONDARY MENU - Dark Bar 
            Only visible when at Hero section
            ============================================ */}
        {isHeroVisible && (
          <div className="bg-[#141016] h-[40px] relative shrink-0 w-full z-[2] hidden md:block">{/* Changed from lg:block to md:block */}
            {/* Content Container with max-width */}
            <div className="max-w-[1200px] mx-auto h-full relative" style={{ maxWidth: 'var(--container-nav)' }}>
              {/* Left Side - Latest Reports */}
              <div 
                className="absolute left-4 sm:left-6 md:left-8 lg:left-[40px] flex gap-[8px] items-center max-w-[50%]"
                style={{ top: 'calc(50% + 0.1px)', transform: 'translateY(-50%)' }}
              >
                <div className="font-['DM_Sans',sans-serif] font-medium text-[12px] text-white tracking-[0.24px] leading-[14.4px] whitespace-nowrap">
                  Latest reports:
                </div>
                <div className="font-['DM_Sans',sans-serif] font-normal text-[12px] text-white/80 leading-[14.4px] truncate">
                  India Makhana Market Outlook to 2030
                </div>
                <div className="hidden xl:flex items-center gap-[2px] px-[6px] py-[2px] rounded-[5px] hover:bg-white/10 transition-colors cursor-pointer">
                  <span className="font-['DM_Sans',sans-serif] font-normal text-[12px] text-[#f7f7f7] leading-[16.8px] whitespace-nowrap">
                    CTA here
                  </span>
                  <div className="w-[13px] h-[13px] relative shrink-0">
                    <svg className="absolute inset-0" fill="none" viewBox="0 0 12 12">
                      <path d="M3 9L9 3M9 3H4.125M9 3V7.875" stroke="#F7F7F7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right Side - Procurement, Company, Login */}
              <div 
                className="absolute right-4 sm:right-6 md:right-8 lg:right-[49.71px] flex gap-[12px] items-center"
                style={{ bottom: '17.5%', top: '17.5%' }}
              >
                {/* Procurement */}
                <a 
                  href="#" 
                  className="font-['DM_Sans',sans-serif] font-normal text-[12px] text-white leading-[26px] hover:text-white/80 transition-colors whitespace-nowrap hidden xl:block h-[26px] flex items-center px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                >
                  Procurement
                </a>

                {/* Company Dropdown */}
                <div 
                  className="relative h-[26px] w-[78px] hidden xl:block"
                  onMouseEnter={() => setShowCompanyDropdown(true)}
                  onMouseLeave={() => setShowCompanyDropdown(false)}
                >
                  <button className="font-['DM_Sans',sans-serif] font-normal text-[12px] text-white leading-[26px] hover:text-white/80 transition-colors whitespace-nowrap h-full w-full flex items-center justify-center rounded-[5px]">
                    Company
                  </button>

                  {/* Dropdown Menu */}
                  <div 
                    className={`absolute bg-black flex flex-col items-start px-[24px] py-[12px] rounded-[8px] top-[26px] left-1/2 -translate-x-1/2 w-[158px] transition-all duration-200 ${
                      showCompanyDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <a href="#" className="font-['DM_Sans',sans-serif] font-normal text-[12px] text-white hover:text-white/80 h-[26px] flex items-center w-full transition-colors whitespace-nowrap">
                      Our Story
                    </a>
                    <a href="#" className="font-['DM_Sans',sans-serif] font-normal text-[12px] text-white hover:text-white/80 h-[26px] flex items-center w-full transition-colors whitespace-nowrap">
                      Our Experts
                    </a>
                    <a href="#" className="font-['DM_Sans',sans-serif] font-normal text-[12px] text-white hover:text-white/80 h-[26px] flex items-center w-full transition-colors whitespace-nowrap">
                      Careers
                    </a>
                    <a href="#" className="font-['DM_Sans',sans-serif] font-normal text-[12px] text-white hover:text-white/80 h-[26px] flex items-center w-full transition-colors whitespace-nowrap">
                      Contact Us
                    </a>
                  </div>
                </div>

                {/* Login */}
                <a 
                  href="#" 
                  className="flex gap-[4px] items-center hover:opacity-80 transition-opacity"
                >
                  <div className="w-[14px] h-[14px] relative shrink-0">
                    <svg className="absolute inset-0" fill="none" viewBox="0 0 14 14">
                      <path d={svgPaths.p2119a80} stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                      <path d={svgPaths.pfd41100} stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                      <path d={svgPaths.p9c2c600} stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-['DM_Sans',sans-serif] font-normal text-[12px] text-white leading-[26px] whitespace-nowrap">
                    Log in
                  </span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ============================================
            MAIN NAVIGATION - White Bar (All Devices)
            ============================================ */}
        <div className="backdrop-blur-[4px] bg-white min-h-[56px] sm:h-[60px] relative shrink-0 w-full z-[1]">
          {/* Content Container with max-width */}
          <div className="mx-auto h-full relative" style={{ maxWidth: 'var(--container-nav)' }}>
            
            {/* Logo Container - Position changes based on hero visibility */}
            <div 
              className={`absolute flex gap-[6px] items-center z-10 transition-all duration-300 ${
                isHeroVisible 
                  ? 'left-4 sm:left-6 md:left-8 lg:left-[48px]' 
                  : 'left-4 sm:left-6 md:left-8 lg:left-[76px]'
              }`}
              style={{ bottom: '33.33%', top: '33.33%' }}
            >
              {/* Logo Icon */}
              <div className="h-[18px] sm:h-[20px] w-[13.5px] sm:w-[15px] relative shrink-0">
                <svg className="absolute inset-0" fill="none" viewBox="0 0 14.819 20">
                  <path d={svgPaths.p2fe9b640} fill="black" />
                  <path d={svgPaths.p6164f00} fill="#D72B31" />
                </svg>
              </div>
              {/* Logo Text */}
              <div className="h-[10px] sm:h-[11px] w-[120px] sm:w-[137px] overflow-clip shrink-0">
                <svg className="block w-full h-full" fill="none" viewBox="0 0 137 10.6122">
                  <path d={svgPaths.p1b7f80} fill="black" />
                  <path d={svgPaths.pae3d200} fill="black" />
                </svg>
              </div>
            </div>

            {/* ============================================
                DESKTOP NAVIGATION - Different layouts per state
                ============================================ */}
            {isHeroVisible ? (
              // STATE 1: At Hero - Services, Industries, Resources, Small Search (93px)
              // Using EXACT Figma inset positioning
              <div className="absolute flex gap-[24px] items-center justify-center hidden lg:flex" style={{ inset: '21.82% 32.67% 19.85% 32.74%' }}>
                {/* Services */}
                <button 
                  className="flex gap-[4px] items-center justify-center rounded-[5px] hover:opacity-70 transition-opacity group"
                  onMouseEnter={() => setShowServicesMega(true)}
                  onMouseLeave={() => setShowServicesMega(false)}
                >
                  <span className="font-['DM_Sans',sans-serif] font-bold text-[14px] text-[#141016] leading-[22px] whitespace-nowrap">
                    Services
                  </span>
                  <div className="w-[12px] h-[12px] relative shrink-0">
                    <svg className="absolute inset-0 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 12 12">
                      <path d="M9.75 4.5L6 8.25L2.25 4.5" stroke="#141016" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>

                {/* Industries */}
                <button 
                  className="flex gap-[4px] items-center justify-center rounded-[5px] hover:opacity-70 transition-opacity group"
                  onMouseEnter={() => setShowIndustriesMega(true)}
                  onMouseLeave={() => setShowIndustriesMega(false)}
                >
                  <span className="font-['DM_Sans',sans-serif] font-bold text-[14px] text-[#141016] leading-[22px] whitespace-nowrap">
                    Industries
                  </span>
                  <div className="w-[12px] h-[12px] relative shrink-0">
                    <svg className="absolute inset-0 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 12 12">
                      <path d="M9.75 4.5L6 8.25L2.25 4.5" stroke="#141016" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>

                {/* Resources */}
                <button className="flex gap-[4px] items-center justify-center rounded-[5px] hover:opacity-70 transition-opacity group">
                  <span className="font-['DM_Sans',sans-serif] font-bold text-[14px] text-[#141016] leading-[22px] whitespace-nowrap">
                    Resources
                  </span>
                  <div className="w-[12px] h-[12px] relative shrink-0">
                    <svg className="absolute inset-0 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 12 12">
                      <path d="M9.75 4.5L6 8.25L2.25 4.5" stroke="#141016" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>

                {/* Search Bar - Small (93px) */}
                <div className="h-[35px] flex items-center justify-center">
                  <button 
                    onClick={onOpenSearch}
                    className="bg-[#f5f5fd] h-[30px] flex items-center gap-2 rounded-[99px] shadow-[6.98px_-1.02px_14px_-4px_rgba(128,108,224,0.3)] relative overflow-hidden group hover:shadow-lg transition-all w-[93px]"
                  >
                    {/* Oval Gradient Effect */}
                    <div 
                      className="absolute blur-[4px] h-[31px] w-[65px] pointer-events-none"
                      style={{
                        left: '-22.77px',
                        top: '3.68px',
                        backgroundImage: "radial-gradient(ellipse 32.5px 15.5px at center, rgba(128,108,224,1) 0%, rgba(128,108,224,0) 100%)"
                      }}
                    />
                    {/* Search Content */}
                    <div className="absolute inset-[2px] bg-[#fcfcfc] flex items-center justify-between px-[8px] rounded-[99px]">
                      <span className="font-['DM_Sans',sans-serif] font-normal text-[14px] text-[#141016] leading-[22px]">
                        Search
                      </span>
                      <div className="w-[16px] h-[16px] relative shrink-0">
                        <svg className="absolute inset-0" fill="none" viewBox="0 0 16 16">
                          <path d={svgPaths.p888ea00} stroke="#141016" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M10.531 10.531L13.996 13.996" stroke="#141016" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              // STATE 2: After Scroll - Services, Industries, Wide Search (175px) - NO Resources!
              <div className="absolute flex gap-[24px] items-center justify-center hidden lg:flex" style={{ bottom: '20.83%', right: '139.73px', top: '20.83%' }}>
                {/* Services */}
                <button 
                  className="flex gap-[4px] items-center justify-center rounded-[5px] hover:opacity-70 transition-opacity group"
                  onMouseEnter={() => setShowServicesMega(true)}
                  onMouseLeave={() => setShowServicesMega(false)}
                >
                  <span className="font-['DM_Sans',sans-serif] font-bold text-[14px] text-[#141016] leading-[22px] whitespace-nowrap">
                    Services
                  </span>
                  <div className="w-[12px] h-[12px] relative shrink-0">
                    <svg className="absolute inset-0 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 12 12">
                      <path d="M9.75 4.5L6 8.25L2.25 4.5" stroke="#141016" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>

                {/* Industries */}
                <button 
                  className="flex gap-[4px] items-center justify-center rounded-[5px] hover:opacity-70 transition-opacity group"
                  onMouseEnter={() => setShowIndustriesMega(true)}
                  onMouseLeave={() => setShowIndustriesMega(false)}
                >
                  <span className="font-['DM_Sans',sans-serif] font-bold text-[14px] text-[#141016] leading-[22px] whitespace-nowrap">
                    Industries
                  </span>
                  <div className="w-[12px] h-[12px] relative shrink-0">
                    <svg className="absolute inset-0 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 12 12">
                      <path d="M9.75 4.5L6 8.25L2.25 4.5" stroke="#141016" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>

                {/* Search Bar - Wide (175px) */}
                <div className="h-[35px] flex items-center justify-center">
                  <button 
                    onClick={onOpenSearch}
                    className="bg-[#f5f5fd] h-[30px] flex items-center gap-2 rounded-[99px] shadow-[0.16px_-7.84px_14px_-4px_rgba(128,108,224,0.3)] relative overflow-hidden group hover:shadow-lg transition-all w-[175px]"
                  >
                    {/* Oval Gradient Effect - Wider */}
                    <div 
                      className="absolute blur-[4px] h-[31px] w-[145.56px] pointer-events-none"
                      style={{
                        left: '13.23px',
                        top: '23.58px',
                        backgroundImage: "radial-gradient(ellipse 72.78px 15.5px at center, rgba(128,108,224,1) 0%, rgba(128,108,224,0) 100%)"
                      }}
                    />
                    {/* Search Content */}
                    <div className="absolute inset-[2px] bg-[#fcfcfc] flex items-center justify-between px-[8px] rounded-[99px]">
                      <span className="font-['DM_Sans',sans-serif] font-normal text-[14px] text-[#141016] leading-[22px]">
                        Search
                      </span>
                      <div className="w-[16px] h-[16px] relative shrink-0">
                        <svg className="absolute inset-0" fill="none" viewBox="0 0 16 16">
                          <path d={svgPaths.p888ea00} stroke="#141016" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M10.531 10.531L13.996 13.996" stroke="#141016" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* ============================================
                RIGHT SIDE ACTIONS - State-dependent positioning
                ============================================ */}
            
            {/* Hamburger Menu - Only when NOT at hero */}
            {!isHeroVisible && (
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="absolute left-4 sm:left-6 md:left-8 lg:left-[40px] hidden lg:flex items-center justify-center px-[6px] py-[8px] rounded-[3px] border border-[rgba(20,16,22,0.1)] hover:bg-black/5 transition-colors bg-white"
                style={{ bottom: '28.33%', top: '28.33%' }}
                aria-label={showMobileMenu ? "Close menu" : "Open menu"}
              >
                <div className="h-[10px] w-[14px] relative">
                  <div className="absolute bg-[#141016] h-[2px] left-0 right-0 rounded-[5px] top-0" />
                  <div className="absolute bg-[#141016] h-[2px] left-0 right-0 rounded-[5px] top-[4px]" />
                  <div className="absolute bg-[#141016] h-[2px] left-0 right-0 rounded-[5px] top-[8px]" />
                </div>
              </button>
            )}

            {/* Login - Only when NOT at hero (black text) */}
            {!isHeroVisible && (
              <a 
                href="#" 
                className="absolute right-4 sm:right-6 md:right-8 lg:right-[47.71px] hidden lg:flex gap-[4px] items-center hover:opacity-70 transition-opacity"
                style={{ bottom: '28.33%', top: '28.33%' }}
              >
                <div className="w-[14px] h-[14px] relative shrink-0">
                  <svg className="absolute inset-0" fill="none" viewBox="0 0 14 14">
                    <path d={svgPaths.p2119a80} stroke="#141016" strokeLinecap="round" strokeLinejoin="round" />
                    <path d={svgPaths.pfd41100} stroke="#141016" strokeLinecap="round" strokeLinejoin="round" />
                    <path d={svgPaths.p9c2c600} stroke="#141016" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="font-['DM_Sans',sans-serif] font-normal text-[12px] text-[#141016] leading-[26px] whitespace-nowrap">
                  Log in
                </span>
              </a>
            )}

            {/* Schedule Demo Button - Only when AT hero */}
            {isHeroVisible && (
              <div 
                className="absolute right-4 sm:right-6 md:right-8 lg:right-[47.84px] hidden sm:flex items-center"
                style={{ bottom: '21%', top: '21%' }}
              >
                <Button
                  variant="brand"
                  size="sm"
                  className="font-['DM_Sans',sans-serif] font-bold text-[14px] leading-[16.8px] whitespace-nowrap"
                  animatedArrow
                  onClick={onOpenContact}
                >
                  Schedule a Demo
                </Button>
              </div>
            )}

            {/* Mobile Menu Button - Always visible below lg */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden absolute right-4 sm:right-6 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-[3px] border border-black/10 hover:bg-black/5 transition-colors"
              style={{ bottom: '28.33%', top: '28.33%' }}
              aria-label={showMobileMenu ? "Close menu" : "Open menu"}
            >
              <div className="h-[10px] w-[14px] relative">
                <div className="absolute bg-[#141016] h-[2px] left-0 right-0 rounded-[5px] top-0" />
                <div className="absolute bg-[#141016] h-[2px] left-0 right-0 rounded-[5px] top-[4px]" />
                <div className="absolute bg-[#141016] h-[2px] left-0 right-0 rounded-[5px] top-[8px]" />
              </div>
            </button>
          </div>
        </div>

        {/* ============================================
            MOBILE MENU DROPDOWN (Below lg screens)
            ============================================ */}
        {showMobileMenu && (
          <div className="lg:hidden bg-white border-t border-black/10 shadow-xl animate-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col p-4 sm:p-6 space-y-1 max-h-[calc(100vh-60px)] overflow-y-auto">
              
              {/* Main Navigation Links */}
              <div className="space-y-1 pb-4 border-b border-black/10">
                <button className="font-['DM_Sans',sans-serif] font-bold text-[14px] sm:text-[15px] text-[#141016] leading-[22px] py-3 px-2 hover:bg-black/5 rounded-[5px] transition-colors flex items-center justify-between group w-full text-left">
                  Services
                  <ChevronDown className="w-4 h-4 text-black/40 group-hover:translate-y-0.5 transition-transform" />
                </button>
                <button className="font-['DM_Sans',sans-serif] font-bold text-[14px] sm:text-[15px] text-[#141016] leading-[22px] py-3 px-2 hover:bg-black/5 rounded-[5px] transition-colors flex items-center justify-between group w-full text-left">
                  Industries
                  <ChevronDown className="w-4 h-4 text-black/40 group-hover:translate-y-0.5 transition-transform" />
                </button>
                <button className="font-['DM_Sans',sans-serif] font-bold text-[14px] sm:text-[15px] text-[#141016] leading-[22px] py-3 px-2 hover:bg-black/5 rounded-[5px] transition-colors flex items-center justify-between group w-full text-left">
                  Resources
                  <ChevronDown className="w-4 h-4 text-black/40 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>

              {/* Company Submenu */}
              <div className="space-y-1 py-4 border-b border-black/10">
                <div className="font-['DM_Sans',sans-serif] font-medium text-[11px] text-black/40 uppercase tracking-wider px-2 mb-2">
                  Company
                </div>
                <a href="#" className="font-['DM_Sans',sans-serif] font-normal text-[14px] text-[#141016] leading-[26px] py-2.5 px-2 hover:bg-black/5 rounded-[5px] transition-colors block">
                  Our Story
                </a>
                <a href="#" className="font-['DM_Sans',sans-serif] font-normal text-[14px] text-[#141016] leading-[26px] py-2.5 px-2 hover:bg-black/5 rounded-[5px] transition-colors block">
                  Our Experts
                </a>
                <a href="#" className="font-['DM_Sans',sans-serif] font-normal text-[14px] text-[#141016] leading-[26px] py-2.5 px-2 hover:bg-black/5 rounded-[5px] transition-colors block">
                  Careers
                </a>
                <a href="#" className="font-['DM_Sans',sans-serif] font-normal text-[14px] text-[#141016] leading-[26px] py-2.5 px-2 hover:bg-black/5 rounded-[5px] transition-colors block">
                  Contact Us
                </a>
              </div>

              {/* Additional Links - Only when hero visible (secondary nav items) */}
              {isHeroVisible && (
                <div className="space-y-1 py-4 border-b border-black/10 xl:hidden">
                  <a href="#" className="font-['DM_Sans',sans-serif] font-normal text-[14px] text-[#141016] leading-[26px] py-2.5 px-2 hover:bg-black/5 rounded-[5px] transition-colors block">
                    Procurement
                  </a>
                  <a href="#" className="font-['DM_Sans',sans-serif] font-normal text-[14px] text-[#141016] leading-[26px] py-2.5 px-2 hover:bg-black/5 rounded-[5px] transition-colors flex items-center gap-2">
                    <div className="w-[14px] h-[14px] relative shrink-0">
                      <svg className="absolute inset-0" fill="none" viewBox="0 0 14 14">
                        <path d={svgPaths.p2119a80} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                        <path d={svgPaths.pfd41100} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                        <path d={svgPaths.p9c2c600} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    Log in
                  </a>
                </div>
              )}

              {/* Login when hero NOT visible */}
              {!isHeroVisible && (
                <div className="space-y-1 py-4 border-b border-black/10 xl:hidden">
                  <a href="#" className="font-['DM_Sans',sans-serif] font-normal text-[14px] text-[#141016] leading-[26px] py-2.5 px-2 hover:bg-black/5 rounded-[5px] transition-colors flex items-center gap-2">
                    <div className="w-[14px] h-[14px] relative shrink-0">
                      <svg className="absolute inset-0" fill="none" viewBox="0 0 14 14">
                        <path d={svgPaths.p2119a80} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                        <path d={svgPaths.pfd41100} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                        <path d={svgPaths.p9c2c600} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    Log in
                  </a>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="pt-4 space-y-3">
                {/* Schedule Demo - Always in mobile menu */}
                <Button 
                  variant="brand" 
                  size="md" 
                  fullWidth={true}
                  className="font-['DM_Sans',sans-serif] font-bold"
                  animatedArrow
                  onClick={onOpenContact}
                >
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================
            SECTION NAVIGATION - Only visible when NOT at hero
            Appears below navbar, moves with it
            ============================================ */}
        {!isHeroVisible && (
          <div className="bg-white/95 backdrop-blur-sm border-t border-black/5 hidden md:block">
            <Container width="nav">
              <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`px-4 py-2 rounded-[5px] font-medium whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
                      activeSection === section.id
                        ? 'bg-black text-white'
                        : 'text-black/60 hover:text-black hover:bg-black/5'
                    }`}
                    style={{ fontSize: 'var(--text-xs)' }}
                    aria-current={activeSection === section.id ? 'page' : undefined}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </Container>
          </div>
        )}

        {/* ============================================
            MEGA MENUS - Services & Industries
            Appear below main navigation on hover
            ============================================ */}
        <MegaMenu 
          type="services" 
          isVisible={showServicesMega} 
          onClose={() => setShowServicesMega(false)} 
        />
        <MegaMenu 
          type="industries" 
          isVisible={showIndustriesMega} 
          onClose={() => setShowIndustriesMega(false)} 
        />
      </div>
    </div>
  );
}