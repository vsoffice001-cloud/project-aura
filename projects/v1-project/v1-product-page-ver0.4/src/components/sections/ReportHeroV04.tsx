'use client';

/**
 * ReportHeroV04 — v0.4 report PDP hero (V0_lite canonical structure)
 *
 * @what  Mirrors V0_lite HeroSection.tsx L218-380 canonical pattern:
 *        Breadcrumb (mb-6 sm:mb-8) → 2-col grid (lg:grid-cols-2 · gap-12) →
 *        LEFT col space-y-6 (SectionLabel → H1 → Promise → CTAs → StatPairRow) →
 *        RIGHT col intentionally empty (per user brief · no preview card).
 * @why   Prior versions deviated from V0_lite · added MetadataStrip (wrong DS choice per
 *        its WHEN-NOT rule "no stat values") · forced 72vh stretch · zero animation.
 *        User 2026-05-20: "phle dekhle krna kya h thik se" → match canonical first.
 * @when  v0.4 chrome L2 below DummyHeaderV04.
 * @how   DS canonical · Framer Motion entrance · content-sized · no forced stretch.
 *        Breadcrumb (DS) · SectionLabel (DS) · CTARowResponsive (DS) · StatPairRow (DS) ·
 *        raw h1+p w/ Tailwind tokens (no DS atom matches hero size range).
 */

import { Fragment } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { BarChart3, TrendingUp, Globe } from 'lucide-react';
import { SectionLabel } from '@kenresearch/design-system/atoms';
import { CTARowResponsive } from '@kenresearch/design-system/molecules';
import { StatPairRow } from '@kenresearch/design-system/molecules';
import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@kenresearch/design-system/ui/breadcrumb';

export interface ReportHeroV04Props {
  eyebrow: string;
  title: string;
  promise: string;
  stats: [
    { icon: typeof BarChart3; value: string; label: string },
    { icon: typeof BarChart3; value: string; label: string },
    { icon: typeof BarChart3; value: string; label: string },
  ];
  primaryCTA?: { label: string; onClick?: () => void };
  secondaryCTA?: { label: string; onClick?: () => void };
  imageSrc?: string;
  imageAlt?: string;
}

const DEFAULT_BREADCRUMB_LEVELS = [
  { label: 'Home', href: '/' },
  { label: 'Reports', href: '/reports' },
  { label: 'Logistics', href: '/reports/logistics' },
  { label: 'Australia Cold Chain', href: '#' },
];

export function ReportHeroV04({
  eyebrow,
  title,
  promise,
  stats,
  primaryCTA = { label: 'Download Sample' },
  secondaryCTA = { label: 'Talk to Analyst' },
  imageSrc = '/hero-image.png',
  imageAlt = '',
}: ReportHeroV04Props) {
  const reduceMotion = useReducedMotion();
  const fade = (delay = 0) =>
    reduceMotion
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay },
        };

  return (
    <section
      aria-label="Report hero"
      data-component="ReportHeroV04"
      className="relative w-full overflow-hidden"
    >
      {/* ─── Background image ──────────────────────────────────── */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_right]"
        />
      </div>

      {/* ─── Overlay gradient ─────────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 hero-overlay" />

      <style>{`
        .hero-overlay {
          background: linear-gradient(180deg,
            rgba(10,10,12,0.70) 0%,
            rgba(10,10,12,0.58) 100%);
        }
        @media (min-width: 640px) {
          .hero-overlay {
            background: linear-gradient(90deg,
              rgba(10,10,12,0.80) 0%,
              rgba(10,10,12,0.55) 50%,
              rgba(10,10,12,0.20) 100%);
          }
        }
        @media (min-width: 1024px) {
          .hero-overlay {
            background: linear-gradient(90deg,
              rgba(10,10,12,0.82) 0%,
              rgba(10,10,12,0.55) 45%,
              rgba(10,10,12,0.10) 75%,
              rgba(10,10,12,0.02) 100%);
          }
        }
        /* StatPair dark-mode override (DS GAP · StatPair atom lacks mode="dark") */
        .hero-stats-dark [data-component="StatPair"] dd {
          color: #ffffff !important;
        }
        .hero-stats-dark [data-component="StatPair"] dt {
          color: rgba(255,255,255,0.65) !important;
        }
        /* Mobile · StatPairRow grid-cols-3 is too tight at <sm · stack vertically */
        @media (max-width: 639px) {
          .hero-stats-dark [data-component="StatPairRow"] {
            grid-template-columns: 1fr !important;
            row-gap: 1rem;
          }
        }
        /* Full-viewport hero · minus header height per breakpoint */
        [data-component="ReportHeroV04"] > .relative.mx-auto {
          min-height: calc(100dvh - 60px); /* mobile · primary bar only */
        }
        @media (min-width: 1024px) {
          [data-component="ReportHeroV04"] > .relative.mx-auto {
            min-height: calc(100dvh - 108px); /* lg · utility 38 + primary 70 */
          }
        }
      `}</style>

      {/* ─── Content layer · full-viewport hero (vh - header) ── */}
      <div
        className="relative mx-auto max-w-[var(--container-page,1240px)] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 flex flex-col justify-center"
        style={{
          minHeight: 'calc(100dvh - 60px)',
        }}
      >
        {/* 2-col grid · lg:grid-cols-2 · gap-12 (V0_lite L233) */}
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* LEFT column · space-y-6 vertical rhythm (V0_lite L235) */}
          <div className="space-y-6 max-w-[640px]">
            {/* Breadcrumb · shadcn ui primitives · simple chain · NO dropdowns · dark hero · last crumb coral (accent) */}
            <motion.div {...fade(0)}>
              <BreadcrumbRoot>
                <BreadcrumbList className="text-white/60 gap-1.5 sm:gap-2 text-[12px] sm:text-[13px] font-body">
                  {DEFAULT_BREADCRUMB_LEVELS.map((b, i) => {
                    const last = i === DEFAULT_BREADCRUMB_LEVELS.length - 1;
                    return (
                      <Fragment key={b.label}>
                        <BreadcrumbItem>
                          {last ? (
                            <BreadcrumbPage className="text-white font-medium">
                              {b.label}
                            </BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink
                              href={b.href}
                              className="text-white/60 hover:text-white/90 transition-colors"
                            >
                              {b.label}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {!last && (
                          <BreadcrumbSeparator className="text-white/30 [&>svg]:size-3" />
                        )}
                      </Fragment>
                    );
                  })}
                </BreadcrumbList>
              </BreadcrumbRoot>
            </motion.div>
            {/* Eyebrow · DS SectionLabel · accent → coral on dark */}
            <motion.div className="inline-flex" {...fade(0.1)}>
              <SectionLabel style="text" background="dark" variant="accent">
                {eyebrow}
              </SectionLabel>
            </motion.div>

            {/* H1 · raw h1 · DS font tokens · clamp size · V0_lite L256 pattern */}
            <motion.h1
              className="font-display font-light text-white tracking-[-0.02em] leading-[1.1] text-[clamp(28px,4vw,52px)]"
              {...fade(0.2)}
            >
              {title}
            </motion.h1>

            {/* Promise · raw p · 16px body (DS rule min text-sm = 16px) */}
            <motion.p
              className="font-body font-normal text-white/[0.78] leading-relaxed max-w-lg text-[16px]"
              {...fade(0.3)}
            >
              {promise}
            </motion.p>

            {/* CTAs · DS molecule · responsive sizing · dark · pt-2 spacing (V0_lite L279) */}
            <motion.div className="pt-2" {...fade(0.4)}>
              <CTARowResponsive
                background="dark"
                primary={{
                  label: primaryCTA.label,
                  onClick: primaryCTA.onClick,
                  animatedArrow: true,
                }}
                secondary={{
                  label: secondaryCTA.label,
                  onClick: secondaryCTA.onClick,
                }}
              />
            </motion.div>

            {/* StatPairRow · DS molecule · 3 stats grid · pt-6 sm:pt-8 (V0_lite L349)
                NOTE: StatPair atom lacks mode="dark" prop (DS gap) ·
                wrap in CSS override to flip --black-900/--black-500 → white tones */}
            <motion.div className="hero-stats-dark" {...fade(0.5)}>
              <StatPairRow stats={stats} />
            </motion.div>
          </div>

          {/* RIGHT col · intentional empty · image breathes through (user brief) */}
          <div aria-hidden="true" className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
