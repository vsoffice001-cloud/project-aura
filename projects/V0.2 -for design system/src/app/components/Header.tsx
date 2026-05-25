import { Search, ChevronDown, ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import darkLogo from 'figma:asset/d4072235e919a1404fae37108047a74300375eb4.png';

export function Header() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isOnLightBackground, setIsOnLightBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      
      setScrollProgress(scrolled);

      // Detect if navbar is over light background
      // Hero section height is approximately 60vh, after that we have light sections
      const heroHeight = window.innerHeight * 0.6; // 60vh
      const isOverLightBg = winScroll > heroHeight - 100; // Start transition 100px before
      setIsOnLightBackground(isOverLightBg);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const industries = [
    { name: 'Agriculture and Animal Care', href: '#' },
    { name: 'Automotive, Transportation and Warehousing', href: '#' },
    { name: 'Banking Financial Services and Insurance', href: '#' },
    { name: 'Consumer Products and Retail', href: '#' },
    { name: 'Defense and Security', href: '#' },
    { name: 'Education and Recruitment', href: '#' },
    { name: 'Energy and Utilities', href: '#' },
    { name: 'Food, Beverage and Tobacco', href: '#' },
    { name: 'Healthcare', href: '#' },
    { name: 'Manufacturing and Construction', href: '#' },
    { name: 'Media and Entertainment', href: '#' },
    { name: 'Metal, Mining and Chemicals', href: '#' },
    { name: 'Public Sector and Administration', href: '#' },
    { name: 'Technology and Telecom', href: '#' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main Navigation Bar */}
      <div className={`w-full h-[56px] flex items-center px-[20px] gap-[20px] transition-all duration-300 ${
        isOnLightBackground 
          ? 'bg-white shadow-sm' 
          : 'bg-black/40 backdrop-blur-lg backdrop-saturate-150'
      }`}>
        {/* Logo */}
        <div className="py-2">
          <a href="/">
            <img
              src={isOnLightBackground 
                ? darkLogo
                : "https://kenresearch.s3.ap-south-1.amazonaws.com/next_assets/public/whiteLogo.png"
              }
              alt="Ken Research Logo"
              className="h-[32px] w-[180px] z-10 object-contain shrink-0 transition-all duration-300"
              loading="eager"
              style={{ objectPosition: 'left center' }}
            />
          </a>
        </div>

        {/* Navigation Menu */}
        <div className="w-max flex items-center h-full gap-[20px] pl-[20px]">
          {/* Report Store Dropdown */}
          <div
            className={`relative h-full gap-1 text-sm text-nowrap flex items-center cursor-pointer transition-colors duration-300 ${
              isOnLightBackground ? 'text-black' : 'text-white'
            }`}
            onMouseEnter={() => setOpenDropdown('reportStore')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <a href="#">Report store</a>
            <ChevronDown className="text-base" />
            
            {/* Dropdown Menu */}
            <div
              className={`absolute top-[56px] left-5 bg-white shadow-2xl border-t border-[#EFEFEF] transition-all duration-150 ease-out overflow-hidden ${
                openDropdown === 'reportStore' ? 'h-auto w-[700px] p-2' : 'h-0 w-0'
              }`}
            >
              <p className="text-[12px] font-bold text-[#656565] tracking-[1.62px] mb-2">INDUSTRIES</p>
              <div className="grid grid-cols-2 gap-6 px-4">
                <nav className="relative overflow-hidden">
                  {industries.slice(0, 7).map((industry, idx) => (
                    <div
                      key={idx}
                      className="relative flex flex-row gap-[20px] items-center transition-all duration-300 ease-out group"
                    >
                      <div className="w-[1px] h-[40px] bg-[#EFEFEF]"></div>
                      <a
                        className="text-black text-sm h-max tracking-[0.62px] hover:font-bold transition-all duration-300 ease-out pl-[1px]"
                        href={industry.href}
                      >
                        {industry.name}
                      </a>
                    </div>
                  ))}
                </nav>
                <nav className="relative overflow-hidden">
                  {industries.slice(7).map((industry, idx) => (
                    <div
                      key={idx}
                      className="relative flex flex-row gap-[20px] items-center transition-all duration-300 ease-out group"
                    >
                      <div className="w-[1px] h-[40px] bg-[#EFEFEF]"></div>
                      <a
                        className="text-black text-sm h-max tracking-[0.62px] hover:font-bold transition-all duration-300 ease-out pl-[1px]"
                        href={industry.href}
                      >
                        {industry.name}
                      </a>
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Insights Dropdown */}
          <div
            className={`relative h-full gap-1 text-sm text-nowrap flex items-center cursor-pointer transition-colors duration-300 ${
              isOnLightBackground ? 'text-black' : 'text-white'
            }`}
            onMouseEnter={() => setOpenDropdown('insights')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            Insights
            <ChevronDown className="text-base" />
            
            <div
              className={`absolute top-[56px] left-0 bg-white shadow-xl border-t border-[#EFEFEF] transition-all duration-150 ease-out overflow-hidden ${
                openDropdown === 'insights' ? 'h-auto w-auto p-2' : 'h-0 w-0'
              }`}
            >
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <p className="text-[12px] font-bold text-[#656565] tracking-[1.62px] mb-2">DISCOVER</p>
                  <nav className="relative overflow-hidden py-[1px] space-y-1">
                    {['Blogs', 'Articles', 'POV', 'Case Studies'].map((item) => (
                      <div key={item} className="relative flex flex-row gap-[20px] items-center group">
                        <div className="w-[1px] h-[30px] bg-[#EFEFEF]"></div>
                        <a className="text-black text-sm tracking-[0.62px] hover:font-bold transition-all" href="#">
                          {item}
                        </a>
                      </div>
                    ))}
                  </nav>
                </div>
                <div>
                  <p className="text-[12px] font-bold text-[#656565] tracking-[1.62px] mb-2">COMPANY</p>
                  <nav className="relative overflow-hidden py-[1px] space-y-1">
                    {['Careers', 'Contact Us'].map((item) => (
                      <div key={item} className="relative flex flex-row gap-[20px] items-center group">
                        <div className="w-[1px] h-[30px] bg-[#EFEFEF]"></div>
                        <a className="text-black text-sm tracking-[0.62px] hover:font-bold transition-all" href="#">
                          {item}
                        </a>
                      </div>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* Survey Dropdown */}
          <div
            className={`relative h-full gap-1 text-sm text-nowrap flex items-center cursor-pointer transition-colors duration-300 ${
              isOnLightBackground ? 'text-black' : 'text-white'
            }`}
            onMouseEnter={() => setOpenDropdown('survey')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <a href="#">Survey</a>
            <ChevronDown className="text-base" />
            
            <div
              className={`absolute top-[56px] left-0 bg-white shadow-xl border-t border-[#EFEFEF] transition-all duration-150 ease-out overflow-hidden ${
                openDropdown === 'survey' ? 'h-auto w-auto p-2' : 'h-0 w-0'
              }`}
            >
              <div className="gap-10">
                <div>
                  <p className="text-[12px] font-bold text-[#656565] tracking-[1.62px] mb-2">SURVEY</p>
                  <nav className="relative overflow-hidden py-[1px] space-y-1">
                    {[
                      'Brand Perception Survey',
                      'CNDP Survey',
                      'Employee Engagement Survey',
                      "Dealer's Voice Survey",
                      'Customer Satisfaction Survey',
                    ].map((item) => (
                      <div key={item} className="relative flex flex-row gap-[20px] items-center group">
                        <div className="w-[1px] h-[30px] bg-[#EFEFEF]"></div>
                        <a className="text-black text-sm tracking-[0.62px] hover:font-bold transition-all whitespace-nowrap" href="#">
                          {item}
                        </a>
                      </div>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* Consulting Dropdown */}
          <div
            className={`relative h-full gap-1 text-sm text-nowrap flex items-center cursor-pointer transition-colors duration-300 ${
              isOnLightBackground ? 'text-black' : 'text-white'
            }`}
            onMouseEnter={() => setOpenDropdown('consulting')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <a href="#">Consulting</a>
            <ChevronDown className="text-base" />
            
            <div
              className={`absolute top-[56px] left-0 bg-white shadow-xl border-t border-[#EFEFEF] transition-all duration-150 ease-out overflow-hidden ${
                openDropdown === 'consulting' ? 'h-auto w-auto p-2' : 'h-0 w-0'
              }`}
            >
              <div className="gap-10">
                <div>
                  <p className="text-[12px] font-bold text-[#656565] tracking-[1.62px] mb-2">CONSULTING</p>
                  <nav className="relative overflow-hidden py-[1px] space-y-1">
                    {['Strategy Consulting', 'Deals & IPO Consulting'].map((item) => (
                      <div key={item} className="relative flex flex-row gap-[20px] items-center group">
                        <div className="w-[1px] h-[30px] bg-[#EFEFEF]"></div>
                        <a className="text-black text-sm tracking-[0.62px] hover:font-bold transition-all whitespace-nowrap" href="#">
                          {item}
                        </a>
                      </div>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="relative flex flex-1 justify-end">
          {/* Search Bar */}
          <div className="flex h-[40px] my-auto rounded-[4px] px-[16px] py-[8px] items-center justify-between bg-[#FFFFFF1A] cursor-pointer max-w-[470px]">
            <Search className="text-[#D72B31] text-xl" />
          </div>
        </div>

        {/* Divider */}
        <div className="h-[30px] w-[1px] bg-white opacity-20 rounded-[99px]"></div>

        {/* CTA Button */}
        <a
          className="py-2 rounded-sm bg-[#B01F24] hover:bg-white flex px-3 items-center border border-[#B01F24] justify-center text-white text-sm font-bold gap-2 hover:text-[#B01F24] transition-all duration-300"
          href="#"
        >
          Book discovery call
          <ArrowUpRight className="text-xl transition-all duration-75" />
        </a>
      </div>

      {/* Breadcrumb with Progress Bar */}
      <div className="hidden lg:block bg-[#fafafa]/80 backdrop-blur-sm border-b border-[#e5e5e5]/30 relative pl-0 ml-[-160px] mt-[0px] mr-[0px] mb-[0px]">
        <div className="container py-2.5 pl-0">
          <nav className="flex items-center gap-2 text-xs text-[#737373]">
            <a href="#" className="hover:text-[#171717] transition-colors">
              Home
            </a>
            <span className="text-[#737373]">/</span>
            <a href="#" className="hover:text-[#171717] transition-colors">
              Agriculture and Animal Care
            </a>
            <span className="text-[#737373]">/</span>
            <span className="text-[#171717]">Qatar Fresh Herbs Market</span>
          </nav>
        </div>
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#e5e5e5]/30">
          <div
            className="h-full bg-[#b01f24] transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </header>
  );
}
