import { useState } from "react";
import {
  Search,
  ChevronDown,
  Menu,
  X,
  Phone,
} from "lucide-react";
import { iconColors } from "./iconColors";
import { Button } from "./Button";
import { Container } from "./Container";

const navLinks = [
  { label: "Report Store", href: "/", active: true },
  { label: "Insights", href: "/insights", active: false },
  { label: "Survey", href: "/survey", active: false },
  { label: "Consulting", href: "/consulting", active: false },
];

const industryDropdownItems = [
  "Healthcare",
  "Technology & Telecom",
  "Banking & Financial Services",
  "Energy & Utilities",
  "Consumer & Retail",
  "Manufacturing",
  "Automotive & Transportation",
];

export function Header() {
  const [industryOpen, setIndustryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden lg:block bg-black text-white/40">
        <Container maxWidth="page" className="flex items-center justify-between h-8">
          <div className="flex items-center gap-4" style={{ fontSize: 'var(--text-2xs)' }}>
            <span>Trusted by 50,000+ professionals worldwide</span>
          </div>
          <div className="flex items-center gap-4" style={{ fontSize: 'var(--text-2xs)' }}>
            <a href="tel:+919015006060" className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone className="h-3 w-3" color="rgba(255,255,255,0.4)" />
              +91 9015 006 060
            </a>
            <span className="text-white/20">|</span>
            <a href="mailto:info@kenresearch.com" className="hover:text-white transition-colors">
              info@kenresearch.com
            </a>
          </div>
        </Container>
      </div>

      <header className="sticky top-0 z-50 w-full glass-header" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <Container maxWidth="page" className="flex h-[56px] items-center justify-between">
          {/* Logo */}
          <a className="flex items-center gap-2.5" href="/">
            <div className="w-8 h-8 flex items-center justify-center" style={{ background: 'var(--brand-red)', borderRadius: 'var(--radius-element)' }}>
              <span className="text-white" style={{ fontSize: 'var(--text-sm)' }}>K</span>
            </div>
            <div className="flex flex-col">
              <span className="text-black tracking-tight leading-tight" style={{ fontSize: 'var(--text-nav)' }}>
                Ken Research
              </span>
              <span className="text-black/40 tracking-[0.12em] uppercase leading-tight" style={{ fontSize: '9px' }}>
                Market Intelligence
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                className={`transition-colors relative px-3.5 py-2 rounded-md ${
                  link.active
                    ? "text-black"
                    : "text-black/60 hover:text-black"
                }`}
                href={link.href}
                style={{ fontSize: 'var(--text-nav)' }}
              >
                {link.label}
                {link.active && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-black rounded-full" />
                )}
              </a>
            ))}

            {/* Industries Dropdown */}
            <div
              className="relative"
              onBlur={(e) => {
                // Close only if focus leaves the entire dropdown container
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setIndustryOpen(false);
                }
              }}
            >
              <button
                className="flex items-center gap-1 transition-colors px-3.5 py-2 rounded-md text-black/60 hover:text-black"
                onClick={() => setIndustryOpen(!industryOpen)}
                style={{ fontSize: 'var(--text-nav)' }}
              >
                Industries
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${industryOpen ? "rotate-180" : ""}`}
                  color={iconColors.utility}
                />
              </button>
              {industryOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg py-1.5 z-50" style={{ border: '1px solid var(--warm-500)', borderRadius: 'var(--rc-radius-card)' }}>
                  {industryDropdownItems.map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="block px-4 py-2.5 text-black/60 hover:text-black hover:bg-black/[0.03] transition-colors"
                      style={{ fontSize: 'var(--text-nav)' }}
                      tabIndex={0}
                      onClick={() => setIndustryOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="items-center gap-2 whitespace-nowrap rounded-md transition-colors hover:bg-black/[0.03] h-8 px-3 hidden lg:flex text-black/50 hover:text-black" style={{ fontSize: 'var(--text-nav)' }}>
              <Search className="h-3.5 w-3.5" color={iconColors.utility} />
              <kbd className="pointer-events-none ml-0.5 hidden h-5 select-none items-center gap-1 rounded px-1.5 font-mono opacity-80 sm:flex" style={{ border: '1px solid var(--warm-500)', background: 'var(--warm-300)', fontSize: 'var(--text-2xs)' }}>
                <span style={{ fontSize: 'var(--text-xs)' }}>&#8984;</span>K
              </kbd>
            </button>
            <div className="hidden sm:block h-5 w-px" style={{ background: 'var(--warm-500)' }} />
            <button className="items-center whitespace-nowrap rounded-md transition-colors h-8 px-3 hidden sm:flex text-black/60 hover:text-black" style={{ fontSize: 'var(--text-nav)' }}>
              Sign In
            </button>
            <Button variant="brand" size="sm" className="hidden md:inline-flex">
              Request a Demo
            </Button>
            {/* Mobile hamburger toggle */}
            <button
              className="lg:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-md transition-colors hover:bg-black/[0.03]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" color={iconColors.utility} />
              ) : (
                <Menu className="h-5 w-5" color={iconColors.utility} />
              )}
            </button>
          </div>
        </Container>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white" style={{ borderTop: '1px solid var(--warm-500)' }}>
            <Container maxWidth="page" className="py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`py-2.5 px-3 rounded-md transition-colors ${
                    link.active
                      ? "text-black bg-[var(--warm-300)]"
                      : "text-black/60 hover:text-black hover:bg-black/[0.03]"
                  }`}
                  style={{ fontSize: 'var(--text-nav)' }}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 pt-3 flex flex-col gap-1" style={{ borderTop: '1px solid var(--warm-500)' }}>
                <button className="py-2.5 px-3 text-left text-black/60 hover:text-black rounded-md hover:bg-black/[0.03]" style={{ fontSize: 'var(--text-nav)' }}>
                  Sign In
                </button>
                <Button variant="brand" size="md" fullWidth>
                  Request a Demo
                </Button>
              </div>
            </Container>
          </div>
        )}
      </header>
    </>
  );
}