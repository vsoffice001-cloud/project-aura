/**
 * Footer - Site-wide footer
 * Extracted from HomePage so it renders on all pages via NavLayout.
 * Uses DS Logo component for consistent branding.
 */

import { Logo } from '../../../design-system/components/Logo';

const FOOTER_SECTIONS = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Industry Reports', href: '#' },
      { label: 'Custom Research', href: '#' },
      { label: 'Consulting', href: '#' },
      { label: 'Surveys', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '#' },
      { label: 'Case Studies', href: '#' },
      { label: 'Whitepapers', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Disclaimer', href: '#' },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: 'Twitter', letter: 'T', href: '#' },
  { label: 'LinkedIn', letter: 'L', href: '#' },
  { label: 'Facebook', letter: 'F', href: '#' },
];

export function Footer() {
  return (
    <footer className="bg-[#fcfcfc] border-t border-[rgba(20,16,22,0.1)] py-12 font-nav">
      <div className="nav-container">
        {/* Logo + tagline */}
        <div className="mb-8">
          <Logo size="lg" />
          <p className="text-[13px] text-[#656565] mt-3 max-w-[320px]">
            Empowering businesses with actionable market intelligence and research insights.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-[14px] font-bold text-[#141016] mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-[#656565] hover:text-[#b01f24] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-[rgba(20,16,22,0.1)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-[#656565]">
            &copy; 2026 Ken Research. All rights reserved.
          </p>
          <div className="flex gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="size-8 rounded-full bg-white border border-[rgba(20,16,22,0.1)] flex items-center justify-center hover:border-[#806ce0] hover:bg-[#806ce0]/10 transition-all"
                aria-label={social.label}
              >
                <span className="text-[10px] text-[#656565]">
                  {social.letter}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}