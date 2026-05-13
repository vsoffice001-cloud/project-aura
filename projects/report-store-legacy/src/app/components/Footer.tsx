import { Mail, Phone, MapPin, Shield, Award } from "lucide-react";
import { iconColors } from "./iconColors";
import { Container } from "./Container";
import { InlineLink } from "./InlineLink";

const industryLinks = [
  "Healthcare",
  "Technology & Telecom",
  "Banking & Financial Services",
  "Energy & Utilities",
  "Consumer & Retail",
  "Manufacturing",
];

const serviceLinks = [
  "Market Research Reports",
  "Custom Research",
  "Consulting Services",
  "Survey Solutions",
  "Procurement Research",
];

const companyLinks = [
  "About Us",
  "Careers",
  "Press Releases",
  "Blog",
  "Contact Us",
];

const clientLogos = [
  "Fortune 500",
  "McKinsey",
  "Deloitte",
  "BCG",
  "KPMG",
  "Reliance",
  "ADNOC",
  "Tata Group",
];

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      {/* Client trust bar */}
      <div className="border-b border-white/10">
        <Container maxWidth="page" className="py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white/40">
                <Shield className="h-4 w-4" color={iconColors.utility} />
                <span style={{ fontSize: 'var(--text-xs)' }}>ISO 27001 Certified</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2 text-white/40">
                <Award className="h-4 w-4" color={iconColors.utility} />
                <span style={{ fontSize: 'var(--text-xs)' }}>Top 10 Global Research Firm</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/40 flex-wrap justify-center" style={{ fontSize: 'var(--text-xs)' }}>
              <span>Trusted by:</span>
              {clientLogos.slice(0, 5).map((logo) => (
                <span key={logo} className="px-2 py-0.5 bg-white/[0.06] text-white/50" style={{ borderRadius: 'var(--radius-element)' }}>{logo}</span>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <Container maxWidth="page" className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 flex items-center justify-center" style={{ background: 'var(--brand-red)', borderRadius: 'var(--radius-element)' }}>
                <span className="text-white" style={{ fontSize: 'var(--text-sm)' }}>K</span>
              </div>
              <div>
                <span className="text-white tracking-tight block leading-tight" style={{ fontSize: 'var(--text-nav)' }}>
                  Ken Research
                </span>
                <span className="text-white/40 tracking-[0.12em] uppercase leading-tight" style={{ fontSize: '9px' }}>
                  Market Intelligence
                </span>
              </div>
            </div>
            <p className="text-white/50 leading-relaxed mb-6 max-w-sm" style={{ fontSize: 'var(--text-nav)' }}>
              Enterprise-grade market intelligence platform. We deliver
              actionable insights across 14 industry verticals to help you make
              informed strategic decisions.
            </p>
            <div className="space-y-2.5">
              <a
                href="mailto:info@kenresearch.com"
                className="flex items-center gap-2.5 text-white/50 hover:text-white transition-colors"
                style={{ fontSize: 'var(--text-nav)' }}
              >
                <Mail className="h-4 w-4 flex-shrink-0" color={iconColors.utility} />
                info@kenresearch.com
              </a>
              <a
                href="tel:+919015006060"
                className="flex items-center gap-2.5 text-white/50 hover:text-white transition-colors"
                style={{ fontSize: 'var(--text-nav)' }}
              >
                <Phone className="h-4 w-4 flex-shrink-0" color={iconColors.utility} />
                +91 9015 006 060
              </a>
              <div className="flex items-start gap-2.5 text-white/50" style={{ fontSize: 'var(--text-nav)' }}>
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" color={iconColors.utility} />
                <span>Gurgaon, Haryana, India</span>
              </div>
            </div>
          </div>

          {/* Industries */}
          <div>
            <h4 className="tracking-[0.15em] uppercase text-white mb-4" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-heading)' }}>
              Industries
            </h4>
            <ul className="space-y-0.5">
              {industryLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/50 hover:text-white transition-colors block py-1.5"
                    style={{ fontSize: 'var(--text-nav)' }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="tracking-[0.15em] uppercase text-white mb-4" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-heading)' }}>
              Services
            </h4>
            <ul className="space-y-0.5">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/50 hover:text-white transition-colors block py-1.5"
                    style={{ fontSize: 'var(--text-nav)' }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="tracking-[0.15em] uppercase text-white mb-4" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-heading)' }}>
              Company
            </h4>
            <ul className="space-y-0.5">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/50 hover:text-white transition-colors block py-1.5"
                    style={{ fontSize: 'var(--text-nav)' }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container maxWidth="page" className="py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40" style={{ fontSize: 'var(--text-xs)' }}>
            &copy; 2026 Ken Research Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <InlineLink href="#" onDark>Privacy Policy</InlineLink>
            <InlineLink href="#" onDark>Terms of Service</InlineLink>
            <div className="flex items-center gap-3">
              <a href="#" className="text-white/40 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}