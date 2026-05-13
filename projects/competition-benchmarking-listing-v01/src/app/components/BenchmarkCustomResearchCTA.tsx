/**
 * BenchmarkCustomResearchCTA — Tail section organism
 * competition-benchmarking-listing-v01
 *
 * 2-col layout: left = eyebrow + h2 + dek + 2 CTAs (left-aligned)
 * Right = "What you get" 3-row vertical list.
 * bg: var(--black-900). Container: content (1000).
 * DS tokens only — no hardcoded hex/px.
 */

import { Users, Wrench, FileText, Headphones } from 'lucide-react';
import { Container } from './Container';
import { Button } from './Button';

const DELIVERABLES = [
  {
    icon: Users,
    label: 'Custom competitor set (3–15)',
  },
  {
    icon: Wrench,
    label: 'Methodology choice (mystery shop / interview / hybrid)',
  },
  {
    icon: FileText,
    label: 'Board-ready slide deck + raw data',
  },
] as const;

export function BenchmarkCustomResearchCTA() {
  return (
    <section style={{ background: 'var(--black-900)' }}>
      <Container maxWidth="content">
        <div
          className="py-16 md:py-20 grid gap-12 lg:grid-cols-[1.2fr_1fr] items-start"
        >
          {/* Left column */}
          <div>
            {/* Eyebrow pill */}
            <div
              className="inline-flex items-center gap-2 mb-6"
              style={{
                border: '1px solid var(--hairline-on-dark-soft)',
                borderRadius: 'var(--radius-element)',
                padding: '0.35rem 0.875rem',
              }}
            >
              <span
                className="uppercase tracking-widest"
                style={{ fontSize: 'var(--text-xs)', color: 'var(--label-on-black)', letterSpacing: '0.1em' }}
              >
                Custom Research
              </span>
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 400,
                fontSize: 'clamp(1.5rem, 3.5vw, var(--text-2xl))',
                color: 'var(--black-50)',
                lineHeight: 1.2,
                marginBottom: 'var(--space-4)',
                textAlign: 'left',
              }}
            >
              Need bespoke benchmarking? Our analysts deliver in 2–4 weeks.
            </h2>

            {/* Dek */}
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--ink-on-dark-muted)',
                lineHeight: 1.65,
                marginBottom: 'var(--space-8)',
                maxWidth: 'var(--container-prose)',
              }}
            >
              Our team of 200+ expert analysts can scope, design, and deliver a custom competitor benchmarking study tailored to your specific market, competitor set, and evaluation criteria.
            </p>

            {/* CTAs left-aligned */}
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="brand" size="md" background="dark" icon={<Headphones />} iconPosition="left">
                Request custom benchmarking
              </Button>
              <a
                href="/contact"
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--ink-on-dark-subtle)',
                  textDecoration: 'underline',
                  textDecorationColor: 'var(--ink-on-dark-whisper)',
                  textUnderlineOffset: '3px',
                  transition: 'color 200ms ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  minHeight: '44px',
                  padding: '0 0.25rem',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink-on-dark-body)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink-on-dark-subtle)'; }}
              >
                Talk to an analyst
              </a>
            </div>
          </div>

          {/* Right column — What you get */}
          <div>
            <h3
              className="uppercase tracking-widest mb-6"
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--label-on-black)',
                letterSpacing: '0.1em',
                fontWeight: 500,
              }}
            >
              What you get
            </h3>

            <div className="flex flex-col gap-4">
              {DELIVERABLES.map((d) => {
                const Icon = d.icon;
                return (
                  <div key={d.label} className="flex items-center gap-3">
                    <div
                      style={{
                        width: '2rem',
                        height: '2rem',
                        border: '1px solid var(--hairline-on-dark-soft)',
                        borderRadius: 'var(--radius-element)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        background: 'var(--hairline-on-dark-faint)',
                      }}
                    >
                      <Icon className="h-3.5 w-3.5" style={{ color: 'var(--ink-on-dark-subtle)' }} />
                    </div>
                    <span
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--ink-on-dark-muted)',
                        lineHeight: 1.45,
                      }}
                    >
                      {d.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
