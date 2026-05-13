import { useState } from 'react';
import { ChevronDown, Mail, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const navigationSections = [
    {
      title: 'About Ken Research',
      links: [
        { text: 'Home', href: '/' },
        { text: 'About Us', href: '/about-us' },
        { text: 'Services', href: '/services' },
        { text: 'Categories', href: '/categories' },
        { text: 'News', href: '/news' },
        { text: 'Careers', href: '/careers' },
        { text: 'Contact Us', href: '/contact-us' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Blogs', href: '/blog' },
        { text: 'Industry Reports', href: '/industry-reports' },
        { text: 'Company Research Reports', href: '/company-research-report' },
        { text: 'Country Research Reports', href: '/country-reports' },
        { text: 'Bundle Reports', href: '/bundle-products' },
        { text: 'Dossier 360', href: '/dossier360' },
        { text: 'Go To Market Strategy', href: '/marketing-strategy' },
        { text: 'Paid Press Release', href: '/paid-press-release' },
      ],
    },
    {
      title: 'Expertise & Services',
      links: [
        { text: 'Industry Speaks', href: '/industry-speak' },
        { text: 'Terms & Conditions', href: '/terms-and-conditions#termsAndCondition' },
        { text: 'Privacy Policy', href: '/terms-and-conditions#privacyPolicy' },
        { text: 'Disclaimer', href: '/disclaimer' },
        { text: "FAQ's", href: '/terms-and-conditions#faqs' },
        { text: 'Site Map', href: '/sitemap' },
        { text: 'Design System', href: '/design-system' },
        { text: 'Stakeholder Icons', href: '/stakeholder-icons' },
        { text: 'Segmentation Icons', href: '/segmentation-icons' },
        { text: 'Charts Showcase', href: '/charts-showcase' },
        { text: 'IT Support', href: 'https://forms.office.com/pages/responsepage.aspx?id=9JnITJIKcEmR-hiEXezdZJURM4Fx-vRJglRe5yShhp1UQjkzSzNGNk1HNzJDN0I5MEhKSkhOWjlXTy4u&route=shorturl' },
        { text: 'Website Issue', href: 'https://forms.office.com/Pages/ResponsePage.aspx?id=9JnITJIKcEmR-hiEXezdZJURM4Fx-vRJglRe5yShhp1UOEw4NjVPQzZIT0RPUzlFN0hJM1UwREk4Ui4u' },
      ],
    },
    {
      title: 'How We Are Different?',
      links: [
        { text: 'Ken Research Vs. BCC Research', href: '/ken-research-vs-bcc-research' },
        { text: 'Ken Research Vs. Euromonitor Int.', href: '/ken-research-vs-euromonitor' },
        { text: 'Ken Research Vs. Nielsen', href: '/ken-research-vs-nielsen-surveys' },
        { text: 'Ken Research Vs. Marketsand Markets', href: '/ken-research-vs-marketsandmarkets' },
        { text: 'Ken Research Vs. McKinsey', href: '/ken-research-vs-mckinsey' },
        { text: 'Ken Research Vs. Mordor', href: '/ken-research-vs-mordor-intelligence' },
        { text: 'Ken Research Vs. S&P Global', href: '/ken-research-vs-sp-global' },
        { text: 'Ken Research Vs. Grand View Research', href: '/ken-research-vs-grand-view-research' },
        { text: 'Ken Research Vs. Frost & Sullivan', href: '/ken-research-vs-frost-and-sullivan' },
      ],
    },
  ];

  const offices = [
    {
      title: 'India',
      address: 'Unit 14, Tower B3, Spaze I Tech Business Park, Sohna Road, sector 49 Gurgaon, Haryana - 122001, India',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=ken%20research%2CUnit%2014%2C%20Tower%20B3%2C%20Spaze%20I%20Tech%20Business%20Park%2C%20Sohna%20Road%2C%20sector%2049%20Gurgaon%2C%20Haryana%20-%20122001%2C%20India',
    },
    {
      title: 'UAE',
      address: '105, Al Jaz1b, Street no 2 the Greens Dubai United Arab Emirates',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=ken%20research%2C105%2C%20Al%20Jaz1b%2C%20Street%20no%202%20the%20Greens%20Dubai%20United%20Arab%20Emirates',
    },
    {
      title: 'Indonesia',
      address: 'The Icon BSD City, Jl. Verdant View IIIA No.15, Tangerang Regency, Province Banten-15345, Indonesia',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=ken%20research%2CThe%20Icon%20BSD%20City%2C%20Jl.%20Verdant%20View%20IIIA%20No.15%2C%20Tangerang%20Regency%2C%20Province%20Banten-15345%2C%20Indonesia',
    },
    {
      title: 'QATAR',
      address: 'Office no. 9, Building no. 171, Zone no. 42, Street no. 230, Al-Rehab Complex, C-Ring road Doha, Qatar - PO Box no. 30867, QATAR',
      mapUrl: null,
    },
  ];

  return (
    <footer className="bg-[#141016] pt-[77px] overflow-hidden pb-10">
      <div className="max-w-[1200px] w-full mx-auto px-2 max-md:px-4 container">
        {/* Navigation Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-start justify-between gap-5 max-md:gap-7">
          {navigationSections.map((section) => (
            <div key={section.title} className="w-max max-md:w-full">
              <h2
                className="font-bold mb-4 max-md:mb-0 w-max max-md:w-full uppercase tracking-wider text-[#BDBDBD] text-[12px] flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection(section.title)}
              >
                {section.title}
                <ChevronDown
                  className={`transition-transform sm:hidden ${
                    openSections[section.title] ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </h2>
              <nav
                className={`relative overflow-hidden transition-all duration-500 ease-out sm:block ${
                  openSections[section.title] ? 'max-h-[500px]' : 'max-h-0 sm:max-h-none'
                }`}
              >
                {section.links.map((link, index) => (
                  <div
                    key={index}
                    className={`flex flex-row gap-[20px] items-center navItem opacity-40 hover:opacity-100 transition-all duration-300 ease-out ${
                      index === 0 ? 'max-md:mt-2' : ''
                    }`}
                  >
                    <div className="w-[1px] h-[30px] bg-[#757575] opacity-10"></div>
                    <a
                      className="text-[#FFFFFF] text-sm h-max tracking-[0.62px]"
                      href={link.href}
                    >
                      {link.text}
                    </a>
                  </div>
                ))}
                <div
                  className="absolute left-0 top-[-36px] w-[1px] h-[25px] bg-[#6400E4] transition-transform duration-300 ease-out z-[2]"
                  style={{ transform: 'translateY(0px)', opacity: 0 }}
                ></div>
              </nav>
            </div>
          ))}
        </div>

        {/* Company Overview */}
        <div className="flex flex-col mt-5 max-md:mt-7">
          <h2
            className="font-bold mb-4 w-max uppercase tracking-wider text-[#BDBDBD] text-[12px]"
          >
            Company Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 font-body">
            {offices.map((office) => (
              <div key={office.title} className="flex flex-col opacity-40 hover:opacity-100">
                <h2
                  className="font-bold mb-2 w-max uppercase tracking-wider text-[#BDBDBD] text-[10px] no-underline hover:no-underline"
                >
                  {office.title}
                </h2>
                {office.mapUrl ? (
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] m-0 leading-[24px] tracking-[.1px] text-[#FFFFFF] no-underline hover:no-underline"
                  >
                    {office.address}
                  </a>
                ) : (
                  <p className="text-[14px] m-0 leading-[24px] tracking-[.1px] text-[#FFFFFF]">
                    {office.address}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Ken Watermark and Newsletter */}
        <div className="w-full flex items-end pt-12 max-md:flex-col max-md:gap-8">
          <div className="h-[270px] max-md:h-max w-3/5 max-md:w-full relative overflow-hidden">
            <p
              className="absolute max-md:hidden overflow-hidden top-[-140px] left-0 text-[356px] tracking-[-0.02em] text-white p-0 m-0"
            >
              Ken
            </p>
            <p
              className="md:hidden overflow-hidden text-[124px] text-white p-0 m-0"
            >
              Ken
            </p>
          </div>
          <div className="relative w-2/5 max-md:w-full flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <p className="m-0 p-0 mb-3 text-white flex items-center gap-2 leading-[24px] tracking-[0.62px]">
                <Mail className="text-[#757575]" size={16} />
                <span>For Queries:</span>
                <a href="mailto:support@kenresearch.com" className="hover:underline">
                  support@kenresearch.com
                </a>
              </p>
              <p
                className="m-0 p-0 text-[12px] tracking-[0.62px] text-[#7C7C7C]"
              >
                Subscribe to our Newsletter
              </p>
              <p
                className="m-0 p-0 text-[16px] tracking-[0.62px] text-white"
              >
                Never Miss out on an update from us
              </p>
            </div>
            <div className="flex gap-4 items-center max-md:flex-col max-md:items-start">
              <div className="bg-[#FFFFFF1A] w-[421px] max-md:w-full h-[48px] rounded-sm">
                <input
                  type="text"
                  className="pl-4 py-2 text-white w-full h-full bg-transparent border-none outline-none placeholder:text-white/50"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                className="w-max flex items-center justify-center h-[44px] px-[16px] gap-2 rounded-md bg-[#B01F24] text-[14px] leading-[16px] text-white cursor-pointer border border-[#B01F24] border-solid hover:border-[#8A191D] hover:bg-[#8A191D] transition-colors"
                style={{ letterSpacing: '0.60px' }}
              >
                Subscribe
                <ArrowUpRight className="text-lg" size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[2px] bg-white mt-[100px]"></div>

        {/* Bottom Links */}
        <div className="w-full flex items-center justify-between mt-[40px] max-md:gap-4 max-md:flex-col max-md:items-start max-md:justify-start">
          <div className="flex gap-[60px] max-md:flex-col max-md:gap-4">
            <a
              className="text-[12px] m-0 p-0 text-[#989898] tracking-[1px] hover:text-white transition-colors"
              href="/terms-and-conditions#termsAndCondition"
            >
              Terms & Conditions
            </a>
            <a
              className="text-[12px] m-0 p-0 text-[#989898] tracking-[1px] hover:text-white transition-colors"
              href="/terms-and-conditions#privacyPolicy"
            >
              Privacy Policy
            </a>
            <a
              className="text-[12px] m-0 p-0 text-[#989898] tracking-[1px] hover:text-white transition-colors"
              href="/cookie-policy"
            >
              Cookie Policy
            </a>
          </div>
          <p
            className="text-[12px] m-0 p-0 text-[#989898] tracking-[1px]"
          >
            © Copyright 2026, Ken Research Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}