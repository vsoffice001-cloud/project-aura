import { Linkedin, Twitter, Youtube, FileText } from 'lucide-react';

const industries = [
  'Healthcare & Life Sciences',
  'Technology & IT',
  'Financial Services',
  'Energy & Utilities',
  'Consumer Goods',
];

const services = [
  'Syndicated Research',
  'Custom Research',
  'Consulting Services',
  'Data Analytics',
  'Competitive Intelligence',
];

const company = ['About Us', 'Our Team', 'Careers', 'Contact', 'Press & Media'];

const legal = ['Privacy Policy', 'Terms of Service', 'Cookie Policy'];

const socials: Array<{ icon: typeof Linkedin; label: string }> = [
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Twitter,  label: 'Twitter' },
  { icon: Youtube,  label: 'YouTube' },
];

interface NavColumnProps {
  heading: string;
  items: string[];
}

function NavColumn({ heading, items }: NavColumnProps) {
  return (
    <div>
      <h4 className="text-[1rem] font-medium text-[var(--surface-text)] mb-4">{heading}</h4>
      <ul className="space-y-2 text-[var(--typography-size-compact)] text-[var(--surface-text-muted)]">
        {items.map((item) => (
          <li key={item}>
            <a href="#" className="hover:text-[var(--surface-text)] transition-colors">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Footer — 4-column site footer w/ company info + nav columns + legal row.
 * Ported from V0_lite_report-legacy/src/app/components/Footer.tsx.
 * Tokens-only — no hardcoded hex.
 */
export function Footer() {
  return (
    <footer className="border-t border-[var(--border-default)] bg-[var(--color-foundation-white)] py-8 sm:py-12">
      <div className="container max-w-[var(--container-page)] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand block */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-button)] bg-[var(--color-foundation-black)]">
                <FileText className="h-5 w-5 text-[var(--color-foundation-white)]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[var(--typography-size-base)] font-medium text-[var(--surface-text)]">
                  Ken Research
                </span>
                <span className="text-[var(--typography-size-2xs)] text-[var(--surface-text-subtle)]">
                  Market Intelligence
                </span>
              </div>
            </div>
            <p className="text-[var(--typography-size-compact)] text-[var(--surface-text-muted)] leading-relaxed mb-4">
              Leading provider of market research and business intelligence solutions.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  className="rounded-[var(--radius-button)] bg-[var(--color-ramp-black-100)] p-2 text-[var(--surface-text-muted)] hover:text-[var(--surface-text)] hover:bg-[var(--color-ramp-black-200)] transition-colors border-0 cursor-pointer"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          <NavColumn heading="Industries" items={industries} />
          <NavColumn heading="Services"   items={services} />
          <NavColumn heading="Company"    items={company} />
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[var(--border-default)] flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-[var(--typography-size-compact)] text-[var(--surface-text-muted)]">
            © 2024 Ken Research. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[var(--typography-size-compact)] text-[var(--surface-text-muted)]">
            {legal.map((item) => (
              <a key={item} href="#" className="hover:text-[var(--surface-text)] transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
